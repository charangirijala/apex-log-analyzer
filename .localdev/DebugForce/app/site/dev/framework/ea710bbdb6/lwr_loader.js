/**
* Copyright (c) 2021, salesforce.com, inc.
* All rights reserved.
* SPDX-License-Identifier: MIT
* For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
*/
/* LWR Legacy Module Loader Shim v0.13.10 */
(function () {
  'use strict';

  // Bootstrap / shim
  const BOOTSTRAP_PREFIX = 'lwr.bootstrap.';
  const BOOTSTRAP_ERROR = `${BOOTSTRAP_PREFIX}error`;

  var Phase = /*#__PURE__*/function (Phase) {
    Phase[Phase["Start"] = 0] = "Start";
    Phase[Phase["End"] = 1] = "End";
    return Phase;
  }(Phase || {});
  // Attach a custom dispatcher
  let customDispatcher;
  function attachDispatcher(dispatcher) {
    customDispatcher = dispatcher;
  }

  // Check if the Performance API is available
  // e.g. JSDom (used in Jest) doesn't implement these
  const perf = globalThis.performance;
  const isPerfSupported = typeof perf !== 'undefined' && typeof perf.mark === 'function' && typeof perf.clearMarks === 'function' && typeof perf.measure === 'function' && typeof perf.clearMeasures === 'function';
  function getMeasureName(id, specifier) {
    return specifier ? `${id}-${specifier}` : id;
  }
  function getMarkName(id, specifier, specifierIndex) {
    const measureName = getMeasureName(id, specifier);
    return specifier && specifierIndex ? `${measureName}_${specifierIndex}` : measureName;
  }
  function getDetail(specifier, metadata) {
    const detail = specifier || metadata ? {
      ...metadata
    } : null;
    if (detail && specifier) {
      detail['specifier'] = specifier;
    }
    return detail;
  }

  // For marking request metrics
  // Fallback to the Performance API if there is no custom dispatcher
  function logOperationStart({
    id,
    specifier,
    specifierIndex,
    metadata
  }) {
    if (customDispatcher) {
      customDispatcher({
        id,
        phase: Phase.Start,
        specifier,
        metadata
      });
      return;
    }
    if (isPerfSupported) {
      const markName = getMarkName(id, specifier, specifierIndex);
      const detail = getDetail(specifier, metadata);
      perf.mark(markName, {
        detail
      });
    }
  }

  // For measuring duration metrics
  // Fallback to the Performance API if there is no custom dispatcher
  /* istanbul ignore next */
  function logOperationEnd({
    id,
    specifier,
    specifierIndex,
    metadata
  }) {
    if (customDispatcher) {
      customDispatcher({
        id,
        phase: Phase.End,
        specifier,
        metadata
      });
    } else if (isPerfSupported) {
      const markName = getMarkName(id, specifier, specifierIndex);
      const measureName = getMeasureName(id, specifier);
      const detail = getDetail(specifier, metadata);
      perf.measure(measureName, {
        start: markName,
        detail
      });

      // Clear the created mark and measure to avoid filling the performance entry buffer
      // Even if they get deleted, existing PerformanceObservers preserve copies of the entries
      perf.clearMarks(markName);
      perf.clearMeasures(measureName);
    }
  }

  function createLoader(
      name,
      definition,
      config,
      externalModules,
  ) {
      if (!definition || typeof definition[2] !== 'function') {
          throw new Error(`Expected loader with specifier "${name}" to be a module`);
      }

      // Create a Loader instance
      const exports = {};
      definition[2].call(null, exports);
      const { Loader } = exports;
      if (!Loader) {
          throw new Error('Expected Loader class to be defined');
      }
      const loader = new Loader(config);

      // register externally loaded modules
      if (externalModules && externalModules.length) {
          loader.registerExternalModules(externalModules);
      }

      // Define the loader module with public API: { define, load, services }
      const exporter = (exports) => {
          Object.assign(exports, {
              define: loader.define.bind(loader),
              load: loader.load.bind(loader),
              services: loader.services,
              clearRegistry: loader.clearRegistry.bind(loader),
          });
          return;
      };
      loader.define(name, ['exports'], exporter, definition[3]);

      return loader;
  }

  const REQUIRED_MODULES_TIMEOUT = 60 * 1000; // 2m

  // Check for errors with autoBoot and customInit
  function validatePreInit(autoBoot, customInit) {
      // If autoBoot === false, there must be a customInit hook
      if (!autoBoot && !customInit) {
          throw new Error('The customInit hook is required when autoBoot is false');
      }
      // If autoBoot === true, there must NOT be a customInit hook
      if (autoBoot && customInit) {
          throw new Error('The customInit hook must not be defined when autoBoot is true');
      }
  }

  // Process the customInit hook
  function customInit(
      config,
      initializeApp,
      define,
      onBootstrapError,
  ) {
      // Validate config
      const { autoBoot, customInit } = config;
      validatePreInit(autoBoot, customInit);

      // Set up arguments and call the customInit hook, if available
      if (customInit) {
          const lwr = {
              initializeApp,
              define,
              onBootstrapError,
              attachDispatcher,
          };
          customInit(lwr, config);
      }
  }

  /* global document */



  /* eslint-disable lwr/no-unguarded-apis */
  const hasSetTimeout = typeof setTimeout === 'function';
  const hasConsole = typeof console !== 'undefined';
  /* eslint-enable lwr/no-unguarded-apis */

  class LoaderShim {
      
      
      
      
       __init() {this.defineCache = {};}
       __init2() {this.orderedDefs = [];}
      
       // eslint-disable-line no-undef, lwr/no-unguarded-apis

      constructor(global) {LoaderShim.prototype.__init.call(this);LoaderShim.prototype.__init2.call(this);
          // Start watchdog timer
          if (hasSetTimeout) {
              this.watchdogTimerId = this.startWatchdogTimer();
          }

          // Parse configuration
          this.global = global;
          this.config = global.LWR ;
          this.loaderModule = 'lwr/loaderLegacy/v/0_13_10';

          // Set up error handler
          this.errorHandler = this.config.onError ;

          // Set up the temporary LWR.define function and customInit hook
          const tempDefine = this.tempDefine.bind(this);
          global.LWR.define = tempDefine;
          this.bootReady = this.config.autoBoot;

          try {
              this.createProfilerModule(global.LWR.define);
              customInit(
                  Object.freeze(this.config),
                  this.postCustomInit.bind(this),
                  tempDefine,
                  (e) => {
                      // customInit handlers can overwrite
                      // the error handler with onBootstrapError
                      this.errorHandler = e;
                  },
              );
          } catch (e) {
              this.enterErrorState(e);
          }
      }

      // Return true if the app can be initialized
       canInit() {
          if (!this.config.requiredModules) {
              throw new Error('Unexpected missing requiredModules');
          }
          // Initialize the app if:
          //  - bootReady: autoBoot is on OR customInit has finished
          //  - all required modules are defined
          const allDefined = this.config.requiredModules.every((m) => this.orderedDefs.includes(m));
          return this.bootReady && allDefined;
      }

      /**
       * Create a temporary LWR.define() function which captures all
       * calls that occur BEFORE the full loader module is available
       *
       * Each call to LWR.define() is stored in 2 ways:
       *      - in a map as [moduleName, arguments] pairs
       *      - each moduleName is pushed onto an array, to preserve
       *          the order in which the modules were defined
       */
       tempDefine(...args) {
          // Cache the incoming module
          const moduleName = args[0];
          this.defineCache[moduleName] = args;
          this.orderedDefs.push(moduleName);
          if (this.canInit()) {
              if (hasSetTimeout) {
                  // requiredModules are defined, clear watchdog timer
                  // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                  clearTimeout(this.watchdogTimerId);
              }
              this.initApp();
          }
      }

      // Called by the customInit hook via lwr.initializeApp()
       postCustomInit() {
          this.bootReady = true;
          if (this.canInit()) {
              if (hasSetTimeout) {
                  // requiredModules are defined, clear watchdog timer
                  // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                  clearTimeout(this.watchdogTimerId);
              }
              this.initApp();
          }
      }

      // Create the loader and initialize the application
       initApp() {
          try {
              const loaderConfig = {
                  baseUrl: this.config.baseUrl,
                  profiler: { logOperationStart, logOperationEnd },
                  // TODO: can be removed following https://github.com/salesforce-experience-platform-emu/lwr/issues/1087
                  appMetadata: {
                      appId: this.config.appId,
                      bootstrapModule: this.config.bootstrapModule,
                      rootComponent: this.config.rootComponent,
                      rootComponents: this.config.rootComponents,
                  },
              };
              const loader = createLoader(
                  this.loaderModule,
                  this.defineCache[this.loaderModule],
                  loaderConfig,
                  this.config.preloadModules,
              );
              this.mountApp(loader);
          } catch (e) {
              this.enterErrorState(e);
          }
      }

       waitForDOMContentLoaded() {
          // eslint-disable-next-line lwr/no-unguarded-apis
          if (typeof document === undefined) {
              return Promise.resolve();
          }

          // Resolve if document is already "ready" https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
          // eslint-disable-next-line lwr/no-unguarded-apis
          if (document.readyState === 'interactive' || document.readyState === 'complete') {
              return Promise.resolve();
          }
          return new Promise((resolve) => {
              // eslint-disable-next-line lwr/no-unguarded-apis
              document.addEventListener('DOMContentLoaded', () => {
                  resolve();
              });
          });
      }

      // Create a module out of the profiler
      // Note: The profiler is also available as a module through lwc module resolution (see package.json)
       createProfilerModule(define) {
          const exporter = (exports) => {
              Object.assign(exports, { logOperationStart, logOperationEnd });
          };
          define('lwr/profiler/v/0_13_10', ['exports'], exporter, {});
      }

      // Set up the application globals, import map, root custom element...
       mountApp(loader) {
          const { bootstrapModule, rootComponent, importMappings, rootComponents, serverData, endpoints } =
              this.config;

          // Set global LWR.define to loader.define
          this.global.LWR = Object.freeze({
              define: loader.define.bind(loader),
              rootComponent,
              rootComponents,
              serverData: serverData || {},
              importMappings,
              endpoints,
              env: this.global.LWR.env,
          }) ;

          // Redefine all modules in the temporary cache
          this.orderedDefs.forEach((specifier) => {
              if (specifier !== this.loaderModule) {
                  loader.define(...this.defineCache[specifier]);
              }
          });

          // by default, app initialization is gated on waiting for document to be parsed (via DOMContentLoaded)
          const { disableInitDefer } = this.config;

          // Load the import mappings and application bootstrap module
          loader
              .registerImportMappings(importMappings)
              .then(() => {
                  if (!disableInitDefer) {
                      return this.waitForDOMContentLoaded();
                  }
              })
              .then(() => loader.load(bootstrapModule))
              .catch((reason) => {
                  this.enterErrorState(
                      new Error(
                          `Application ${rootComponent || bootstrapModule} could not be loaded: ${reason}`,
                      ),
                  );
              });
      }

      // Trigger bootstrap error state, and call error handler if registered
       enterErrorState(error) {
          logOperationStart({ id: BOOTSTRAP_ERROR });
          if (this.errorHandler) {
              this.errorHandler(error);
          } else {
              if (hasConsole) {
                  // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                  console.error(`An error occurred during LWR bootstrap. ${error.message}`, error.stack);
              }
          }
      }

      // eslint-disable-next-line no-undef, lwr/no-unguarded-apis
       startWatchdogTimer() {
          // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
          return setTimeout(() => {
              this.enterErrorState(new Error('Failed to load required modules - timed out'));
          }, REQUIRED_MODULES_TIMEOUT);
      }
  }

  // The loader module is ALWAYS required
  const GLOBAL = globalThis ;
  GLOBAL.LWR.requiredModules = GLOBAL.LWR.requiredModules || [];
  if (GLOBAL.LWR.requiredModules.indexOf('lwr/loaderLegacy/v/0_13_10') < 0) {
      GLOBAL.LWR.requiredModules.push('lwr/loaderLegacy/v/0_13_10');
  }
  new LoaderShim(GLOBAL);

})();

LWR.define('lwr/loaderLegacy/v/0_13_10', ['exports'], (function (exports) { 'use strict';

    const templateRegex = /\{([0-9]+)\}/g;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function templateString(template, args) {
        return template.replace(templateRegex, (_, index) => {
            return args[index];
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function generateErrorMessage(errorInfo, args) {
        const message = Array.isArray(args) ? templateString(errorInfo.message, args) : errorInfo.message;
        return `LWR${errorInfo.code}: ${message}`;
    }

    class LoaderError extends Error {
        constructor(errorInfo, errorArgs) {
            super();
            this.message = generateErrorMessage(errorInfo, errorArgs);
        }
    }

    function invariant(condition, errorInfo) {
        if (!condition) {
            throw new LoaderError(errorInfo);
        }
    }







    const MISSING_NAME = Object.freeze({
        code: 3000,
        message: 'A module name is required.',
        level: 0,
    });
    const FAIL_INSTANTIATE = Object.freeze({
        code: 3004,
        message: 'Failed to instantiate module: {0}',
        level: 0,
    });
    const NO_AMD_REQUIRE = Object.freeze({
        code: 3005,
        message: 'AMD require not supported.',
        level: 0,
    });
    const FAILED_DEP = Object.freeze({
        code: 3006,
        level: 0,
        message: 'Failed to load dependency: {0}',
    });
    const INVALID_DEPS = Object.freeze({
        code: 3007,
        message: 'Unexpected value received for dependencies argument; expected an array.',
        level: 0,
    });
    const FAIL_LOAD = Object.freeze({
        code: 3008,
        level: 0,
        message: 'Error loading {0}',
    });
    const UNRESOLVED = Object.freeze({
        code: 3009,
        level: 0,
        message: 'Unable to resolve bare specifier: {0}',
    });
    const NO_BASE_URL = Object.freeze({
        code: 3010,
        level: 0,
        message: 'baseUrl not set',
    });
    Object.freeze({
        code: 3011,
        level: 0,
        message: 'Cannot set a loader service multiple times',
    });
    const INVALID_HOOK = Object.freeze({
        code: 3012,
        level: 0,
        message: 'Invalid hook received',
    });
    const INVALID_LOADER_SERVICE_RESPONSE = Object.freeze({
        code: 3013,
        level: 0,
        message: 'Invalid response received from hook',
    });
    const MODULE_LOAD_TIMEOUT = Object.freeze({
        code: 3014,
        level: 0,
        message: 'Error loading {0} - timed out',
    });
    const HTTP_FAIL_LOAD = Object.freeze({
        code: 3015,
        level: 0,
        message: 'Error loading {0}, status code {1}',
    });
    const STALE_HOOK_ERROR = Object.freeze({
        code: 3016,
        level: 0,
        message: 'An error occurred handling module conflict',
    });
    const MODULE_ALREADY_LOADED = Object.freeze({
        code: 3017,
        level: 0,
        message: 'Marking module(s) as externally loaded, but they are already loaded: {0}',
    });
    const FAIL_HOOK_LOAD = Object.freeze({
        code: 3018,
        level: 0,
        message: 'Error loading "{0}" from hook',
    });
    const EXPORTER_ERROR = Object.freeze({
        code: 3021,
        level: 0,
        message: 'Error evaluating module "{0}", error was {1}',
    });

    /* importMap errors */
    const BAD_IMPORT_MAP = Object.freeze({
        code: 3011,
        level: 0,
        message: 'import map is not valid',
    });

    /* eslint-disable lwr/no-unguarded-apis */
    const hasDocument = typeof document !== 'undefined';

    const hasSetTimeout = typeof setTimeout === 'function';

    const hasConsole = typeof console !== 'undefined';

    const hasProcess = typeof process !== 'undefined';

    // eslint-disable-next-line no-undef
    const hasProcessEnv = hasProcess && process.env;

    function getBaseUrl() {
        let baseUrl = undefined;
        if (hasDocument) {
            // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
            const baseEl = document.querySelector('base[href]') ;
            baseUrl = baseEl && baseEl.href;
        }
        // eslint-disable-next-line lwr/no-unguarded-apis
        if (!baseUrl && typeof location !== 'undefined') {
            // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
            baseUrl = location.href.split('#')[0].split('?')[0];
            const lastSepIndex = baseUrl.lastIndexOf('/');
            if (lastSepIndex !== -1) {
                baseUrl = baseUrl.slice(0, lastSepIndex + 1);
            }
        }

        return baseUrl;
    }

    /**
     * Check if a string is a URL based on Common Internet Scheme Syntax
     * https://www.ietf.org/rfc/rfc1738.txt
     *
     * URL Format:
     *  <scheme>:<scheme-specific-part>
     * Common Internet Scheme Syntax:
     *  The scheme specific part starts with a double slash('//')
     *
     * A valid URL has a colon that is followed by a double slash.
     *
     * @param url - the url that is being checked
     * @returns boolean
     *
     * @example Valid URLs
     * 'https://salesforce.com'
     * 'http://localhost:3000'
     *
     * @example Invalid URLs
     * 'salesforce.com'
     * 'localhost:3000'
     * '@salesforce/label/type:namespace:name'
     */
    function isUrl(url) {
        return url.indexOf('://') !== -1;
    }

    // Borrowed and adapted from https://github.com/systemjs/systemjs/blob/master/src/common.js
    // Resolves the first path segment relative to the second/parent URL
    // eg: resolveIfNotPlainOrUrl('../test', 'http://www.site.com/one/two') => 'http://www.site.com/test'
    // eg: resolveIfNotPlainOrUrl('./x/y/z', 'https://my.com/segment')).toBe('https://my.com/x/y/z')
    function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
        const backslashRegEx = /\\/g;
        if (relUrl.indexOf('\\') !== -1) relUrl = relUrl.replace(backslashRegEx, '/');
        // protocol-relative
        if (relUrl[0] === '/' && relUrl[1] === '/') {
            return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
        }
        // relative-url
        else if (
            (relUrl[0] === '.' &&
                (relUrl[1] === '/' ||
                    (relUrl[1] === '.' && (relUrl[2] === '/' || (relUrl.length === 2 && (relUrl += '/')))) ||
                    (relUrl.length === 1 && (relUrl += '/')))) ||
            relUrl[0] === '/'
        ) {
            const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1);
            let pathname;
            if (parentUrl[parentProtocol.length + 1] === '/') {
                // resolving to a :// so we need to read out the auth and host
                if (parentProtocol !== 'file:') {
                    pathname = parentUrl.slice(parentProtocol.length + 2);
                    pathname = pathname.slice(pathname.indexOf('/') + 1);
                } else {
                    pathname = parentUrl.slice(8);
                }
            } else {
                // resolving to :/ so pathname is the /... part
                pathname = parentUrl.slice(
                    parentProtocol.length + (parentUrl[parentProtocol.length] === '/' ? 1 : 0),
                );
            }

            if (relUrl[0] === '/') return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;

            // join together and split for removal of .. and . segments
            // looping the string instead of anything fancy for perf reasons
            // '../../../../../z' resolved to 'x/y' is just 'z'
            const segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;

            const output = [];
            let segmentIndex = -1;
            for (let i = 0; i < segmented.length; i++) {
                // busy reading a segment - only terminate on '/'
                if (segmentIndex !== -1) {
                    if (segmented[i] === '/') {
                        output.push(segmented.slice(segmentIndex, i + 1));
                        segmentIndex = -1;
                    }
                }

                // new segment - check if it is relative
                else if (segmented[i] === '.') {
                    // ../ segment
                    if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
                        output.pop();
                        i += 2;
                    }
                    // ./ segment
                    else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
                        i += 1;
                    } else {
                        // the start of a new segment as below
                        segmentIndex = i;
                    }
                }
                // it is the start of a new segment
                else {
                    segmentIndex = i;
                }
            }
            // finish reading out the last segment
            if (segmentIndex !== -1) output.push(segmented.slice(segmentIndex));
            return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
        }
    }

    function resolveUrl(relUrl, parentUrl) {
        const resolvedUrl =
            resolveIfNotPlainOrUrl(relUrl, parentUrl) ||
            (isUrl(relUrl) ? relUrl : resolveIfNotPlainOrUrl('./' + relUrl, parentUrl));
        return resolvedUrl;
    }

    function createScript(url) {
        // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
        const script = document.createElement('script');
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = url;
        return script;
    }

    let lastWindowError$1, lastWindowErrorUrl;
    function loadModuleDef(url) {
        return new Promise(function (resolve, reject) {
            if (hasDocument) {
                /* eslint-disable lwr/no-unguarded-apis, no-undef */
                const script = createScript(url);
                script.addEventListener('error', () => {
                    reject(new LoaderError(FAIL_LOAD, [url]));
                });
                script.addEventListener('load', () => {
                    document.head.removeChild(script);
                    if (lastWindowErrorUrl === url) {
                        reject(lastWindowError$1);
                    } else {
                        resolve();
                    }
                });
                document.head.appendChild(script);
                /* eslint-enable lwr/no-unguarded-apis, no-undef */
            }
        });
    }

    if (hasDocument) {
        // When a script is executed, runtime errors are on the global/window scope which are NOT caught by the script's onerror handler.
        // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
        window.addEventListener('error', (evt) => {
            lastWindowErrorUrl = evt.filename;
            lastWindowError$1 = evt.error;
        });
    }

    const MODULE_LOAD_TIMEOUT_TIMER = 60 * 1000; // 1m

    /*!
     * Copyright (C) 2023 salesforce.com, inc.
     */
    // @ts-ignore: Prevent cannot find name 'trustedTypes' error.
    const SUPPORTS_TRUSTED_TYPES = typeof trustedTypes !== 'undefined';
    function createTrustedTypesPolicy(name, options) {
      // @ts-ignore: Prevent cannot find name 'trustedTypes' error.
      return trustedTypes.createPolicy(name, options);
    }
    function createFallbackPolicy(_name, options) {
      return options;
    }
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types
    const createPolicy = SUPPORTS_TRUSTED_TYPES ? createTrustedTypesPolicy : createFallbackPolicy;
    const policyOptions = {
      createHTML(value) {
        return value;
      },
      createScript(value) {
        return value;
      },
      createScriptURL(value) {
        return value;
      }
    };
    // Temporarily surround in try-catch until migration to AMD run.
    try {
      // istanbul ignore next: this creates a special policy described here https://developer.mozilla.org/en-US/docs/Web/API/TrustedTypePolicyFactory/createPolicy
      createPolicy('default', {
        createHTML(dirty) {
          // Treat null & undefined separately
          if (dirty === 'null' || dirty === 'undefined') {
            return dirty;
          }
          return dirty;
        },
        // Ignore typescript type validation for this policy.
        // Returning `undefined` from a TT policy blocks usages
        // of specific DOM sinks affected by this hook.
        // We want to block eval and inline scripts.
        // @ts-ignore
        createScript(dirty) {
          // Treat null & undefined separately
          if (dirty === 'null' || dirty === 'undefined') {
            return dirty;
          }
          // Block script evaluation
          return undefined;
        },
        createScriptURL(dirty) {
          // Treat null & undefined separately
          if (dirty === 'null' || dirty === 'undefined') {
            return dirty;
          }
          return dirty;
        }
      });
    } catch (_unused) {
      // swallow
    }
    const trusted = createPolicy('trusted', policyOptions);
    /*! version: 0.22.5 */

    /* global console,process */


    let lastWindowError;
    if (hasDocument) {
        globalThis.addEventListener('error', (evt) => {
            lastWindowError = evt.error;
        });
    }

    // eslint-disable-next-line lwr/no-unguarded-apis
    if (process.env.NODE_ENV !== 'production') {
        if (!hasSetTimeout && hasConsole) {
            // eslint-disable-next-line lwr/no-unguarded-apis
            console.warn('setTimeout API is not available, watchdog timer on load hook will not be set');
        }
    }

    function isCustomResponse(response) {
        return (
            Object.prototype.hasOwnProperty.call(response, 'data') &&
            !Object.prototype.hasOwnProperty.call(response, 'blob')
        );
    }
    function isFetchResponse(
        response,
    ) {
        // if it quacks like a duck...
        return typeof (response ).blob === 'function';
    }

    function isResponseAPromise(
        response



    ,
    ) {
        return !!(response && (response ).then);
    }

    async function evaluateLoadHookResponse(response, id) {
        return Promise.resolve().then(async () => {
            if (!response || !response.status) {
                throw new LoaderError(INVALID_LOADER_SERVICE_RESPONSE);
            }
            if (response.status !== 200) {
                throw new LoaderError(HTTP_FAIL_LOAD, [id, `${response.status}`]);
            }

            const isResponse = isFetchResponse(response);
            let code;
            if (isCustomResponse(response)) {
                code = response.data;
            } else if (isResponse) {
                // handle fetch response
                code = await (response ).text();
            } else {
                throw new LoaderError(INVALID_LOADER_SERVICE_RESPONSE);
            }

            if (!code) {
                throw new LoaderError(FAIL_LOAD, [id]);
            }

            code = `${code}\n//# sourceURL=${id}`; // append sourceURL for debugging
            try {
                // TODO eval source maps for debugging
                eval(trusted.createScript(code));
            } catch (e) {
                // eslint-disable-next-line lwr/no-unguarded-apis
                if (process.env.NODE_ENV !== 'production' && hasConsole) {
                    // eslint-disable-next-line lwr/no-unguarded-apis
                    console.error(e);
                }
                throw new LoaderError(FAIL_LOAD, [id]);
            }

            if (lastWindowError) {
                throw new LoaderError(FAIL_LOAD, [id]);
            }
            return true;
        });
    }

    async function evaluateLoadHook(
        id,
        hookPromise,
    ) {
        if (!hasSetTimeout) {
            return hookPromise;
        }
        return new Promise((resolve, reject) => {
            // wrap the hook in a watchdog timer
            // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
            const timer = setTimeout(() => {
                reject(new LoaderError(MODULE_LOAD_TIMEOUT, [id]));
            }, MODULE_LOAD_TIMEOUT_TIMER);
            hookPromise
                .then((response) => {
                    resolve(response);
                })
                .catch(() => {
                    reject(new LoaderError(FAIL_HOOK_LOAD, [id]));
                })
                .finally(() => {
                    // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                    clearTimeout(timer);
                });
        });
    }

    function reportError(error) {
        // TODO eventually this should be configurable instrumentation to send this somewhere
        // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
        if (hasConsole) console.error(error);
    }

    function evaluateHandleStaleModuleHooks(
        handleStaleModuleHooks,
        hookArgs,
    ) {
        const { name, oldHash, newHash } = hookArgs;
        // keep evaluating hooks if return value is null
        for (let i = 0; i < handleStaleModuleHooks.length; i++) {
            const hook = handleStaleModuleHooks[i];
            try {
                const hookResult = hook({ name, oldHash, newHash });
                if (hookResult !== null) {
                    break;
                }
            } catch (e) {
                reportError(new LoaderError(STALE_HOOK_ERROR));
            }
        }
    }

    // Bootstrap / shim

    // Loader: modules
    const LOADER_PREFIX = 'lwr.loader.';
    const MODULE_DEFINE = `${LOADER_PREFIX}module.define`;
    const MODULE_DYNAMIC_LOAD = `${LOADER_PREFIX}module.dynamicLoad`;
    const MODULE_FETCH = `${LOADER_PREFIX}module.fetch`;
    const MODULE_ERROR = `${LOADER_PREFIX}module.error`;

    /* global console,process */



















































    class ModuleRegistry {
        

        constructor(config) {ModuleRegistry.prototype.__init.call(this);ModuleRegistry.prototype.__init2.call(this);ModuleRegistry.prototype.__init3.call(this);
            this.baseUrl = config.baseUrl || '';
            this.profiler = config.profiler;
        }

        clearRegistry() {
            this.moduleRegistry = new Map();
        }

        async load(id, importer) {
            const metadata = importer ? { importer } : {};
            this.profiler.logOperationStart({
                id: MODULE_DYNAMIC_LOAD,
                specifier: id,
                metadata,
            });
            const resolvedId = await this.resolve(id, importer);
            const moduleRecord = await this.getModuleRecord(resolvedId, id);
            if (moduleRecord.evaluated) {
                return moduleRecord.module;
            } else {
                if (!moduleRecord.evaluationPromise) {
                    moduleRecord.evaluationPromise = this.topLevelEvaluation(moduleRecord);
                }
                return moduleRecord.evaluationPromise;
            }
        }

        async resolve(id, importer) {
            const parentUrl = this.baseUrl; // only support baseUrl for now

            let resolved;
            let aliasedId = id;
            const resolveHooks = this.resolveHook;
            let useImporter = true;
            if (resolveHooks) {
                for (let i = 0; i < resolveHooks.length; i++) {
                    const resolveHook = resolveHooks[i];
                    const response = resolveHook(aliasedId, { parentUrl });
                    let result;
                    if (response || response === null) {
                        // eslint-disable-next-line no-await-in-loop
                        result = isResponseAPromise(response) ? await response : response;
                    }
                    if (!this.isValidResolveResponse(result )) {
                        throw new LoaderError(INVALID_LOADER_SERVICE_RESPONSE);
                    }

                    // if result is not null, attempt resolution
                    if (result !== null) {
                        if (typeof result === 'string') {
                            if (resolveIfNotPlainOrUrl(result, parentUrl)) {
                                // string response can't be a URL
                                throw new LoaderError(INVALID_LOADER_SERVICE_RESPONSE);
                            }
                            aliasedId = result; // the next hook will receive the new id
                            continue;
                        }

                        resolved =
                            result && result.url && (resolveIfNotPlainOrUrl(result.url, parentUrl) || result.url);
                        if (!resolved) {
                            throw new LoaderError(INVALID_LOADER_SERVICE_RESPONSE);
                        }
                        // Don't process any more hooks if we have resolved
                        break;
                    }
                }

                if (aliasedId !== id) {
                    // resolved module id is the aliased module if it has already been defined
                    if (!resolved && this.namedDefineRegistry.has(aliasedId)) {
                        return aliasedId;
                    } else {
                        id = aliasedId;
                    }
                }
            }

            if (!resolved) {
                const resolvedOrPlain = resolveIfNotPlainOrUrl(id, parentUrl) || id;

                // if module registry already has named module the resolved id is the plain id
                if (this.moduleRegistry.has(resolvedOrPlain)) {
                    return resolvedOrPlain;
                }

                if (this.resolver) {
                    const importDefinition = this.resolver.resolve(resolvedOrPlain, parentUrl);
                    resolved = importDefinition && importDefinition.uri;
                    useImporter = importDefinition ? !!importDefinition.defaultUri : useImporter;

                    // resolve to the bare specifier if conditions are met
                    if (this.namedDefineRegistry.has(resolvedOrPlain)) {
                        const namedDefineRecord = this.namedDefineRegistry.get(
                            resolvedOrPlain,
                        ) ;
                        if (namedDefineRecord.external || namedDefineRecord.defined) {
                            const record = this.moduleRegistry.get(resolved );
                            if (!record || !this.aliases.has(resolvedOrPlain)) {
                                return resolvedOrPlain;
                            }
                        }
                    }
                } else {
                    resolved = resolvedOrPlain;
                }
            }
            if (!resolved || !isUrl(resolved)) {
                if (this.namedDefineRegistry.has(id)) {
                    return id;
                }

                throw new LoaderError(UNRESOLVED, [id]);
            }
            if (useImporter && importer && isUrl(resolved)) {
                resolved += `?importer=${encodeURIComponent(importer)}`;
            }
            return resolved;
        }

        has(id) {
            return this.moduleRegistry.has(id);
        }

        define(
            name,
            dependencies,
            exporter,
            signatures,
        ) {
            const mod = this.namedDefineRegistry.get(name);
            // Don't allow redefining a module.
            if (mod && mod.defined) {
                if (
                    hasProcessEnv &&
                    // eslint-disable-next-line lwr/no-unguarded-apis
                    process.env.NODE_ENV !== 'production' &&
                    // eslint-disable-next-line lwr/no-unguarded-apis
                    process.env.MRT_HMR !== 'true' &&
                    hasConsole
                ) {
                    // eslint-disable-next-line lwr/no-unguarded-apis
                    console.warn(`Module redefine attempted: ${name}`);
                }
                this.lastDefine = mod;
                return;
            }

            const moduleDef = {
                name,
                dependencies,
                exporter,
                signatures,
                defined: true,
            };
            if (mod && mod.external) {
                // if module is "external", resolve the external promise to notify any dependencies
                mod.external.resolveExternal(moduleDef);
            }

            this.profiler.logOperationStart({ id: MODULE_DEFINE, specifier: name });
            this.namedDefineRegistry.set(name, moduleDef);
            this.lastDefine = moduleDef;

            // Check signatures of dependencies against those in the namedDefineRegistry
            if (signatures.hashes) {
                Object.entries(signatures.hashes).forEach(([dep, sig]) => {
                    this.checkModuleSignature(dep, sig);
                });
            }
        }

        /**
         * Marks modules as "externally" loaded/provided, so that the loader does not attempt to fetch them.
         *
         * @param modules - list of module identifiers
         */
        registerExternalModules(modules) {
            modules.map((id) => {
                if (!this.namedDefineRegistry.has(id)) {
                    let resolveExternal;
                    let timer;
                    const moduleDefPromise = new Promise((resolve, reject) => {
                        resolveExternal = resolve;

                        // watch the external for timeout
                        // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                        timer = setTimeout(() => {
                            reject(new LoaderError(MODULE_LOAD_TIMEOUT, [id]));
                        }, MODULE_LOAD_TIMEOUT_TIMER) ;
                    }).finally(() => {
                        // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                        clearTimeout(timer);
                    });
                    const moduleDef = {
                        name: id,
                        defined: false,
                        external: {
                            resolveExternal,
                            moduleDefPromise,
                        },
                    };
                    this.namedDefineRegistry.set(id, moduleDef );
                    // eslint-disable-next-line lwr/no-unguarded-apis
                } else if (process.env.NODE_ENV !== 'production' && hasConsole) {
                    // eslint-disable-next-line lwr/no-unguarded-apis
                    console.warn(MODULE_ALREADY_LOADED.message, id);
                }
            });
        }

         checkModuleSignature(name, signature) {
            const moduleDef = this.namedDefineRegistry.get(name);
            if (!moduleDef) {
                // Placeholder module definition entry for saving known signature
                const modDef = {
                    name,
                    signatures: {
                        ownHash: signature,
                    },
                    defined: false,
                };
                this.namedDefineRegistry.set(name, modDef );
                return;
            }

            const currentSig = moduleDef.signatures ? moduleDef.signatures.ownHash : undefined;
            if (currentSig && signature !== currentSig) {
                const handleStaleModuleHooks = this.handleStaleModuleHook;
                if (handleStaleModuleHooks) {
                    evaluateHandleStaleModuleHooks(handleStaleModuleHooks, {
                        name,
                        oldHash: currentSig,
                        newHash: signature,
                    });
                } else {
                    // eslint-disable-next-line lwr/no-unguarded-apis
                    if (process.env.NODE_ENV !== 'production' && hasConsole) {
                        // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                        console.warn(
                            `stale module detected ${name}, current sig:${currentSig}, new sig:${signature}`,
                        );
                    }
                }
            }
        }

        
        setImportResolver(resolver) {
            this.resolver = resolver;
        }

        

        // A registry for named AMD defines containing the *metadata* of AMD module
         __init() {this.namedDefineRegistry = new Map();}

        // The evaluated module registry where the module identifier (name or URL?) is the key
         __init2() {this.moduleRegistry = new Map();}

        // Aliases of modules in the registry
        __init3() {this.aliases = new Map();}

        

        // Returns an existing module record by the resolvedId or aliased id
         getExistingModuleRecord(resolvedId, aliasId) {
            const moduleRecord = this.moduleRegistry.get(resolvedId);
            if (moduleRecord) {
                this.storeModuleAlias(aliasId, resolvedId);
                return moduleRecord;
            }

            // Check if this is a known alias
            if (resolvedId !== aliasId) {
                const alias = this.aliases.get(aliasId);
                if (alias) {
                    const aliasedModule = this.moduleRegistry.get(alias);
                    if (aliasedModule) {
                        return aliasedModule;
                    }
                }
            }
            return moduleRecord;
        }

         async getModuleRecord(resolvedId, id) {
            // Look for an existing record
            const existingRecord = this.getExistingModuleRecord(resolvedId, id);
            if (existingRecord) {
                // return existing
                return existingRecord;
            }

            // Create a new Module Record
            const instantiation = this.getModuleDef(resolvedId, id);
            const dependencyRecords = instantiation.then((moduleDef) => {
                const dependencies = (moduleDef && moduleDef.dependencies) || [];
                // get dep and filter out exports
                const filtered = dependencies
                    .map((dep) => {
                        if (dep === 'exports') {
                            return;
                        }
                        invariant(dep !== 'require', NO_AMD_REQUIRE);
                        return this.getModuleDependencyRecord.call(this, dep);
                    })
                    .filter((depRecord) => depRecord !== undefined) ;

                return Promise.all(filtered);
            });

            const newModuleRecord = {
                id: resolvedId,
                module: Object.create(null),
                dependencyRecords,
                instantiation,
                evaluated: false,
                evaluationPromise: null,
            };
            this.moduleRegistry.set(resolvedId, newModuleRecord);
            this.storeModuleAlias(id, resolvedId);

            // Wait for the dependencies to resolve the return the moduleRecord
            return dependencyRecords.then(() => newModuleRecord);
        }

         storeModuleAlias(aliasId, resolvedId) {
            if (aliasId !== resolvedId) {
                if (!this.aliases.has(aliasId)) {
                    this.aliases.set(aliasId, resolvedId);
                } else if (hasConsole) {
                    // Warn the user if they were not aliasing to the resolvedId
                    const currentResolvedId = this.aliases.get(aliasId);
                    if (currentResolvedId !== resolvedId) {
                        // eslint-disable-next-line lwr/no-unguarded-apis
                        if (process.env.NODE_ENV !== 'production' && hasConsole) {
                            // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                            console.warn(`Alias update attempt: ${aliasId}=>${currentResolvedId}, ${resolvedId}`);
                        }
                    }
                }
            }
        }

         async getModuleDependencyRecord(dependency) {
            const resolvedDepId = await this.resolve(dependency);
            return this.getModuleRecord(resolvedDepId, dependency);
        }

        // execute the "top-level code" (the code outside of functions) of a module
         async topLevelEvaluation(moduleRecord) {
            await this.instantiateAll(moduleRecord, {});
            return this.evaluateModule(moduleRecord, {});
        }

        // Returns a promise when a module and all of it's dependencies have finished instantiation
         async instantiateAll(
            moduleRecord,
            instantiatedMap,
        ) {
            if (!instantiatedMap[moduleRecord.id]) {
                instantiatedMap[moduleRecord.id] = true;
                const dependencyModuleRecords = await moduleRecord.dependencyRecords;
                if (dependencyModuleRecords) {
                    for (let i = 0; i < dependencyModuleRecords.length; i++) {
                        const depRecord = dependencyModuleRecords[i];
                        // eslint-disable-next-line no-await-in-loop
                        await this.instantiateAll(depRecord, instantiatedMap);
                    }
                }
            }
        }

         async evaluateModule(
            moduleRecord,
            evaluationMap,
        ) {
            const dependencyModuleRecords = await moduleRecord.dependencyRecords;
            if (dependencyModuleRecords.length > 0) {
                evaluationMap[moduleRecord.id] = true;
                // evaluate dependencies first
                await this.evaluateModuleDependencies(dependencyModuleRecords, evaluationMap);
            }

            const { exporter, dependencies } = await moduleRecord.instantiation;
            // The exports object automatically gets filled in by the exporter evaluation
            const exports = {};
            const depsMapped = dependencies
                ? await Promise.all(
                      dependencies.map(async (dep) => {
                          if (dep === 'exports') {
                              return exports;
                          }
                          const resolvedDepId = await this.resolve(dep);

                          const moduleRecord = this.moduleRegistry.get(resolvedDepId) ;
                          if (!moduleRecord) {
                              throw new LoaderError(FAILED_DEP, [resolvedDepId]);
                          }

                          const module = moduleRecord.module;

                          /**
                           * Circular dependencies are handled properly when named exports are used,
                           * however, for default exports there is a bug: https://github.com/rollup/rollup/issues/3384
                           *
                           * The workaround below applies for circular dependencies (!moduleRecord.evaluated)
                           */
                          if (!moduleRecord.evaluated) {
                              return this.getCircularDependencyWrapper(module);
                          }

                          if (module) {
                              return module.__defaultInterop ? module.default : module;
                          }

                          throw new LoaderError(FAILED_DEP, [resolvedDepId]);
                      }),
                  )
                : [];

            // W-10029836 - In the case where we could be instantiating multiple graphs at the same time lets make sure the module have not already been evaluated
            if (moduleRecord.evaluated) {
                return moduleRecord.module;
            }

            // evaluates the module function
            let moduleDefault;
            try {
                moduleDefault = exporter(...depsMapped);
            } catch (e) {
                throw new LoaderError(EXPORTER_ERROR, [moduleRecord.id, e.message || e]);
            }

            // value is returned from exporter, then we are not using named exports
            if (moduleDefault !== undefined) {
                moduleDefault = { default: moduleDefault };
                // __defaultInterop is ONLY used to support backwards compatibility
                // of importing default exports the "wrong" way (when not using named exports).
                // See https://github.com/salesforce-experience-platform-emu/lwr/pull/816
                Object.defineProperty(moduleDefault, '__defaultInterop', { value: true });
            }
            // if no return value, then we are using the exports object
            else {
                // handle only default export with Rollup forced named exports
                if (this.isNamedExportDefaultOnly(exports)) {
                    Object.defineProperty(exports, '__useDefault', { value: true });
                }
            }

            const moduleExports = moduleDefault || exports;

            // update the module record
            // copy over enumerable public methods to module
            for (const key in moduleExports) {
                Object.defineProperty(moduleRecord.module, key, {
                    enumerable: true,
                    set(value) {
                        moduleExports[key] = value;
                    },
                    get() {
                        return moduleExports[key];
                    },
                });
            }

            // copy non-enumerable to module
            if (moduleExports.__useDefault) {
                Object.defineProperty(moduleRecord.module, '__useDefault', { value: true });
            }
            if (moduleExports.__defaultInterop) {
                Object.defineProperty(moduleRecord.module, '__defaultInterop', { value: true });
            }
            if (moduleExports.__esModule) {
                Object.defineProperty(moduleRecord.module, '__esModule', { value: true });
            }

            moduleRecord.evaluated = true;
            Object.freeze(moduleRecord.module);
            return moduleRecord.module;
        }

        // Determines if named exports module has only default export
         isNamedExportDefaultOnly(exports) {
            return (
                exports !== undefined &&
                Object.getOwnPropertyNames(exports).length === 2 &&
                Object.prototype.hasOwnProperty.call(exports, 'default') &&
                Object.prototype.hasOwnProperty.call(exports, '__esModule')
            );
        }

        // Wrap the dependency in a function that can be called and detected by __circular__ property.
        // The LWC engine checks for __circular__ to detect circular dependencies.
         getCircularDependencyWrapper(module) {
            const tmp = () => {
                return module.__useDefault || module.__defaultInterop ? module.default : module;
            };
            tmp.__circular__ = true;
            return tmp;
        }

         async evaluateModuleDependencies(
            dependencyModuleRecords,
            evaluationMap,
        ) {
            for (let i = 0; i < dependencyModuleRecords.length; i++) {
                const depRecord = dependencyModuleRecords[i];
                if (!depRecord.evaluated && !evaluationMap[depRecord.id]) {
                    evaluationMap[depRecord.id] = true;
                    // eslint-disable-next-line no-await-in-loop
                    await this.evaluateModule(depRecord, evaluationMap);
                }
            }
        }

         async getModuleDef(resolvedId, originalId) {
            // reset lastDefine
            this.lastDefine = undefined;

            // the module name can be the resolved ID or the original ID if neither are URL's.
            const moduleName = !isUrl(resolvedId)
                ? resolvedId
                : originalId !== resolvedId
                  ? originalId
                  : undefined;
            let moduleDef = moduleName && this.namedDefineRegistry.get(moduleName);
            if (moduleDef && moduleDef.external) {
                return moduleDef.external.moduleDefPromise;
            }
            if (moduleDef && moduleDef.defined) {
                return moduleDef;
            }
            const parentUrl = this.baseUrl; // only support baseUrl for now
            const specifier = moduleName || originalId;
            this.profiler.logOperationStart({ id: MODULE_FETCH, specifier });
            return Promise.resolve()
                .then(async () => {
                    const loadHooks = this.loadHook;
                    if (loadHooks) {
                        for (let i = 0; i < loadHooks.length; i++) {
                            const loadHook = loadHooks[i];
                            const response = loadHook(resolvedId, parentUrl);
                            const result = (
                                isResponseAPromise(response)
                                    ? // eslint-disable-next-line no-await-in-loop
                                      await evaluateLoadHook(resolvedId, response)
                                    : response
                            ) ;
                            if (result === undefined) {
                                throw new LoaderError(INVALID_LOADER_SERVICE_RESPONSE);
                            }
                            if (result && result !== null) {
                                return evaluateLoadHookResponse(result, resolvedId);
                            }
                        }
                    }
                    return false;
                })
                .then((result) => {
                    if (result !== true && hasDocument) {
                        return loadModuleDef(resolvedId);
                    }
                })
                .then(() => {
                    // Attempt to retrieve the module definition by name first
                    moduleDef = moduleName && this.namedDefineRegistry.get(moduleName);

                    // Fallback to the last loader.define call
                    if (!moduleDef) {
                        moduleDef = this.lastDefine;
                    }

                    // This should not happen
                    if (!moduleDef) {
                        throw new LoaderError(FAIL_INSTANTIATE, [resolvedId]);
                    }

                    this.profiler.logOperationEnd({ id: MODULE_FETCH, specifier });
                    return moduleDef;
                })
                .catch((e) => {
                    // Create module error marks for all errors caused by the loader
                    // Note: these marks do not include errors caused by invalid server responses or loader hooks
                    if (!(e instanceof LoaderError)) {
                        this.profiler.logOperationStart({ id: MODULE_ERROR, specifier });
                    }

                    throw e;
                });
        }

        
        
        addLoaderPlugin(hooks) {
            if (typeof hooks !== 'object') {
                throw new LoaderError(INVALID_HOOK);
            }
            const { loadModule: loadHook, resolveModule: resolveHook } = hooks;

            if (resolveHook) {
                if (this.resolveHook) {
                    this.resolveHook.push(resolveHook);
                } else {
                    this.resolveHook = [resolveHook];
                }
            }
            if (loadHook) {
                if (this.loadHook) {
                    this.loadHook.push(loadHook);
                } else {
                    this.loadHook = [loadHook];
                }
            }
        }

        
        registerHandleStaleModuleHook(handleStaleModule) {
            if (this.handleStaleModuleHook) {
                this.handleStaleModuleHook.push(handleStaleModule);
            } else {
                this.handleStaleModuleHook = [handleStaleModule];
            }
        }

        isValidResolveResponse(res) {
            return (
                res === null || typeof res === 'string' || (res && typeof (res ).url === 'string')
            );
        }
    }

    // find the longest set of segments from path which are a key in matchObj
    // eg: getMatch('/a/b/c', { '/a/b': ..., '/a': ..., '/d/e/f': ...}) => '/a/b'
    function getMatch(path, matchObj) {
        if (matchObj[path]) {
            return path;
        }
        let sepIndex = path.length;
        do {
            const segment = path.slice(0, sepIndex + 1);
            if (segment in matchObj) {
                return segment;
            }
        } while (path.length > 1 && (sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1);
    }
    function targetWarning(match, target, msg) {
        if (hasConsole) {
            // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
            console.warn('Package target ' + msg + ", resolving target '" + target + "' for " + match);
        }
    }

    /**
     * Import map support for LWR based on the spec: https://github.com/WICG/import-maps
     *
     * This implementation is adapted from https://github.com/systemjs/systemjs/blob/master/src/features/import-map.js
     */

    // Spec based import map object https://github.com/WICG/import-maps




















    // Resolves an import map package entry
    function applyPackages(
        id,
        packages,
        defaultUri,
    ) {
        const pkgName = getMatch(id, packages);
        if (pkgName) {
            const pkg = packages[pkgName];
            if (pkg === null) {
                return;
            }
            if (id.length > pkgName.length && pkg[pkg.length - 1] !== '/') {
                targetWarning(pkgName, pkg, "should have a trailing '/'");
            } else {
                const isPackage =
                    id.length > pkgName.length &&
                    pkg[pkg.length - 1] === '/' &&
                    pkg.lastIndexOf(pkgName) === pkg.length - pkgName.length;
                if (isPackage) {
                    // Encode the specifier to create a well-formed LWR module URI
                    const uri = pkg.substring(0, pkg.lastIndexOf(pkgName)) + encodeURIComponent(id);
                    return { uri };
                }
                const uri = pkg + id.slice(pkgName.length);
                return { uri };
            }
        } else if (defaultUri) {
            // When a specifier's URI cannot be resolved via the imports, fallback to "default".
            //     -> https://rfcs.lwc.dev/rfcs/lwr/0000-import-metadata#json-schema
            // However, if `id` is already a fully resolved url,
            // we cannot prepend the defaultUri -> https://github.com/salesforce-experience-platform-emu/lwr/issues/378.
            // In this case we do not apply any package mappings and allow the caller (resolveImportMapEntry) to handle it.
            if (!isUrl(id)) {
                const uri = defaultUri + encodeURIComponent(id);
                return {
                    uri,
                    defaultUri: true,
                };
            }
        }
    }

    // Resolves an entry in the import map
    function resolveImportMapEntry(
        importMap,
        resolvedOrPlain,
        parentUrl,
    ) {
        if (!importMap.scopes) {
            importMap.scopes = {};
        }
        if (!importMap.imports) {
            importMap.imports = {};
        }
        const scopes = importMap.scopes;
        let scopeUrl = parentUrl && getMatch(parentUrl, scopes);
        while (scopeUrl) {
            const packageResolution = applyPackages(resolvedOrPlain, scopes[scopeUrl]);
            if (packageResolution) {
                return packageResolution;
            }
            scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf('/')), scopes);
        }
        return (
            applyPackages(resolvedOrPlain, importMap.imports, importMap.default) ||
            (isUrl(resolvedOrPlain) && { uri: resolvedOrPlain }) ||
            undefined
        );
    }

    // In place transformation of the ImportMap object
    function resolveAndComposePackages(
        packages,
        outPackages,
        baseUrl,
        parentMap,
        parentUrl,
    ) {
        for (const p in packages) {
            const resolvedLhs = resolveIfNotPlainOrUrl(p, baseUrl) || p;
            const rhs = packages[p];
            // package fallbacks not currently supported
            if (typeof rhs !== 'string') {
                continue;
            }
            const mapped = resolveImportMapEntry(
                parentMap,
                resolveIfNotPlainOrUrl(rhs, baseUrl) || rhs,
                parentUrl,
            );
            if (!mapped) {
                targetWarning(p, rhs, 'bare specifier did not resolve');
            } else {
                outPackages[resolvedLhs] = mapped.uri;
            }
        }
    }

    // Composes a single import map object given a child and parent import map
    function resolveAndComposeImportMap(
        json,
        baseUrl,
        parentMap = { imports: {}, scopes: {} },
    ) {
        const outMap = {
            imports: Object.assign({}, parentMap.imports),
            scopes: Object.assign({}, parentMap.scopes),
            default: json.default,
        };

        if (json.imports) {
            resolveAndComposePackages(json.imports, outMap.imports, baseUrl, parentMap);
        }

        if (json.scopes) {
            for (const s in json.scopes) {
                const resolvedScope = resolveUrl(s, baseUrl);
                resolveAndComposePackages(
                    json.scopes[s],
                    outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}),
                    baseUrl,
                    parentMap,
                    resolvedScope,
                );
            }
        }

        if (json.default) {
            outMap.default = resolveIfNotPlainOrUrl(json.default, baseUrl);
        }

        return outMap;
    }

    /* spec based import map resolver */
    class ImportMapResolver  {
        
        constructor(importMap) {
            this.importMap = importMap;
        }

        resolve(resolvedOrPlain, parentUrl) {
            return resolveImportMapEntry(this.importMap, resolvedOrPlain, parentUrl);
        }
    }

    /**
     * Import map support for LWR based on the spec: https://github.com/WICG/import-maps
     *
     * This implementation is adapted from https://github.com/systemjs/systemjs/blob/master/src/features/import-map.js
     */

    const IMPORTMAP_SCRIPT_TYPE = 'lwr-importmap';

    // iterates on the any <script type="${IMPORTMAP_SCRIPT_TYPE}", invoking the given callback for each
    function iterateDocumentImportMaps(
        callBack,
        extraSelector,
    ) {
        // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
        const nodeList = document.querySelectorAll(`script[type="${IMPORTMAP_SCRIPT_TYPE}"]` + extraSelector);
        const filtered = Array.from(nodeList).filter((node) => {
            if ((node ).src) {
                // eslint-disable-next-line lwr/no-unguarded-apis, no-undef
                if (hasConsole) console.warn('LWR does not support import maps from script src');
                return false;
            }
            return true;
        });

        Array.prototype.forEach.call(filtered, callBack);
    }

    // retrives the import map text from a <script type="${IMPORTMAP_SCRIPT_TYPE}"
    async function getImportMapFromScript(script) {
        return Promise.resolve(script.innerHTML);
    }

    // get importMap from <script type="lwr-importmap">
    async function evaluateImportMaps(baseUrl) {
        let importMap = { imports: {}, scopes: {} };
        let importMapPromise = Promise.resolve(importMap);
        if (hasDocument) {
            if (!baseUrl) {
                baseUrl = getBaseUrl();
            }
            if (!baseUrl) {
                throw new LoaderError(NO_BASE_URL);
            }

            iterateDocumentImportMaps((script) => {
                importMapPromise = importMapPromise
                    .then(() => {
                        return getImportMapFromScript(script);
                    })
                    .then((importMapTxt) => {
                        try {
                            return JSON.parse(importMapTxt);
                        } catch (e) {
                            throw new LoaderError(BAD_IMPORT_MAP);
                        }
                    })
                    .then((jsonImportMap) => {
                        importMap = resolveAndComposeImportMap(
                            jsonImportMap,
                            script.src || (baseUrl ),
                            importMap,
                        );
                        return importMap;
                    });
            }, '');
        }
        return importMapPromise;
    }

    function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


    /**
     * The LWR loader is inspired and borrows from the algorithms and native browser principles of https://github.com/systemjs/systemjs
     */
    class Loader {
        
        

        
        constructor(config) {
            const loaderConfig = config || {};
            let baseUrl = loaderConfig.baseUrl;
            let profiler = loaderConfig.profiler;
            if (baseUrl) {
                // add a trailing slash, if it does not exist
                baseUrl = baseUrl.replace(/\/?$/, '/');
            }
            if (!baseUrl) {
                baseUrl = getBaseUrl();
            }
            if (!baseUrl) {
                throw new LoaderError(NO_BASE_URL);
            }
            this.baseUrl = baseUrl;

            if (!profiler) {
                // default noop profiler
                profiler = {
                    logOperationStart: () => {
                        /* noop */
                    },
                    logOperationEnd: () => {
                        /* noop */
                    },
                };
            }

            this.registry = new ModuleRegistry({ baseUrl, profiler });

            // TODO: https://github.com/salesforce-experience-platform-emu/lwr/issues/1087
            this.services = Object.freeze({
                addLoaderPlugin: this.registry.addLoaderPlugin.bind(this.registry),
                handleStaleModule: this.registry.registerHandleStaleModuleHook.bind(this.registry),
                appMetadata: _optionalChain([config, 'optionalAccess', _ => _.appMetadata]) ,
            });
        }

        /**
         * Defines/registers a single named AMD module definition.
         *
         * @param {string} name The module name
         * @param {string[]} dependencies A list of module dependencies (module imports)
         * @param {Function} execute The function containing the module code. AKA exporter as it also returns the modules exports when executed
         * @param {ModuleDefinitionSignatures} signatures Object containing the module signature and the signatures of its dependencies
         * @return {void}
         */
        define(
            name,
            dependencies,
            execute,
            signatures,
        ) {
            invariant(typeof name === 'string', MISSING_NAME);
            let ctor = execute;
            let deps = dependencies;
            let sigs = signatures;

            // Convert no dependencies form `define('name', function(){}, {});` to: `define('name', [], function(){}, {})`
            if (typeof deps === 'function') {
                ctor = dependencies;
                deps = [];
                sigs = execute;
            }

            sigs = sigs || {};

            invariant(Array.isArray(deps), INVALID_DEPS);

            this.registry.define(name, deps, ctor , sigs );
        }

        /**
         * Retrieves/loads a module, returning it from the registry if it exists and fetching it if it doesn't.
         *
         * @param {string} id - A module identifier or URL
         * @param {string} importer - The versioned specifier of the module importer
         *                            Used when the ID is not versioned (eg: variable dynamic imports)
         * @return {Promise<Module>}
         */
        async load(id, importer) {
            return this.registry.load(id, importer);
        }

        clearRegistry() {
            this.registry.clearRegistry();
        }

        /**
         * Checks if a Module exists in the registry.  Note, returns false even if the ModuleDefinition exists but the Module has not been instantiated yet (executed).
         *
         * @param {string} id - A module identifier or URL
         * @return {boolean}
         */
        has(id) {
            return this.registry.has(id);
        }

        /**
         * Resolves the module identifier or URL.  Returns the module identifier if the moduleDefinition exists, or the full resolved URL if a URL is given.
         *
         * @param {string} id - A module identifier or URL
         * @param {string} importer - The versioned specifier of the module importer
         *                            Used when the ID is not versioned (eg: variable dynamic imports)
         * @return {string}
         */
        async resolve(id, importer) {
            return this.registry.resolve(id, importer);
        }

        
        async registerImportMappings(mappings) {
            let importMap;
            if (!mappings) {
                // If no mappings given, check for lwr-importmap on the document
                importMap = await evaluateImportMaps(this.baseUrl);
            } else {
                // merge the new mappings with the base import map - note this goes against
                // import maps spec if we do this after resolving any imports
                importMap = resolveAndComposeImportMap(mappings, this.baseUrl, this.parentImportMap);
            }
            this.parentImportMap = importMap;
            if (this.parentImportMap) {
                const importMapResolver = new ImportMapResolver(this.parentImportMap);
                this.registry.setImportResolver(importMapResolver);
            }
        }

        /**
         * Marks modules as "externally" loaded/provided (e.g. preloaded), so that the loader does not attempt to load them.
         *
         * @param modules - list of module identifiers
         */
        registerExternalModules(modules) {
            this.registry.registerExternalModules(modules);
        }
    }

    exports.Loader = Loader;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
