LWR.define('@view/checkPasswordResetEmail/labels', [], function() { return ["Logo","Now check your email","Back to login","Check the email account associated with your username for the link to reset your password. If you didn\u0027t get an email, check your Spam folder. Or contact your administrator."]; });
(function() { LWR.define('community_layout/sldsFlexibleLayout', ['exports', 'lwc'], (function (exports, lwc) {

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("." + token) : "";
      return ".content-container" + shadowSelector + " {display: flex;flex-direction: column;}";
      /*LWC compiler v7.1.5*/
    }
    stylesheet.$scoped$ = true;
    var _implicitScopedStylesheets = [stylesheet];

    const stc0 = {
      classMap: {
        "content-container": true
      },
      key: 0
    };
    const stc1 = {
      attrs: {
        "name": "content"
      },
      key: 1
    };
    const stc2 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {s: api_slot, h: api_element} = $api;
      return [api_element("div", stc0, [api_slot("content", stc1, stc2, $slotset)])];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = ["content"];
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-2b5a72ratvd";
    tmpl.legacyStylesheetToken = "community_layout-sldsFlexibleLayout_sldsFlexibleLayout";
    if (_implicitScopedStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    /**
     * This comment is important, if it doesn't exist the slot will not be accessible in the ModuleDef,
     * see https://gus.lightning.force.com/lightning/r/0D5B000000moNnZ/view
     * @slot content a place for the content
     */
    class SldsFlexibleColLayout extends lwc.LightningElement {
      /*LWC compiler v7.1.5*/
    }
    SldsFlexibleColLayout.renderMode = 'light';
    const __lwc_component_class_internal = lwc.registerComponent(SldsFlexibleColLayout, {
      tmpl: _tmpl,
      sel: "community_layout-slds-flexible-layout",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@salesforce/label/LwcComponent:dxp_content_layout:header.section_name_logo', ['@view/checkPasswordResetEmail/labels'], m => m[0]);
(function() { LWR.define('dxp_util/browserProperties', ['exports', 'lwc', '@salesforce/client/formFactor'], (function (exports, lwc, formFactor) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var formFactor__default = /*#__PURE__*/_interopDefaultCompat(formFactor);

    var _tmpl = void 0;

    /**
     * BrowserProperties
     *
     * Define browser related functionality.
     *
     */
    class BrowserProperties {
      static get screenViewport() {
        return {
          top: 0,
          left: 0,
          bottom: window.innerHeight,
          right: window.innerWidth
        };
      }
    }
    const __lwc_component_class_internal = lwc.registerComponent(BrowserProperties, {
      tmpl: _tmpl,
      sel: "dxp_util-browser-properties",
      apiVersion: 62
    });
    /**
     * Whether run on mobile device
     *
     * @returns {boolean} true if formFactor is Small
     */
    function isMobile() {
      return formFactor__default.default === "Small";
    }

    /**
     * Whether run on tablet device
     *
     * @returns {boolean} true if formFactor is Medium
     */
    function isTablet() {
      return formFactor__default.default === "Medium";
    }

    /**
     * Whether run on desktop device
     *
     * @returns {boolean} true if formFactor is Large
     */
    function isDesktop() {
      return formFactor__default.default === "Large";
    }

    exports.default = __lwc_component_class_internal;
    exports.isDesktop = isDesktop;
    exports.isMobile = isMobile;
    exports.isTablet = isTablet;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@salesforce/community/basePath', ['@app/basePath'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
(function() { LWR.define('experience/uri', ['exports'], (function (exports) {

  function encode(str) {
    return encodeURIComponent(str).replace(/[!'()~]/g, match => '%' + match.charCodeAt(0).toString(16).toUpperCase());
  }
  function composeQueryString(params) {
    const args = typeof params === 'object' && params != null ? params : {};
    if ('URLSearchParams' in globalThis) {
      return new URLSearchParams(args).toString();
    }
    return Object.keys(args).map(k => encode(k) + '=' + encode(args[k])).join('&');
  }

  function composeUri(uri, args) {
    const u = typeof uri === 'string' ? uri : '';
    const q = composeQueryString(args);
    if (q) {
      const ch = u.indexOf('?') !== -1 ? '&' : '?';
      return `${u}${ch}${q}`;
    }
    return u;
  }

  exports.composeQueryString = composeQueryString;
  exports.composeUri = composeUri;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/resourceResolver', ['exports', '@salesforce/community/basePath', 'experience/uri', '@app/imageOpt'], (function (exports, basePath, uri, imageOptimiserType) {

  function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

  var basePath__default = /*#__PURE__*/_interopDefaultCompat(basePath);
  var imageOptimiserType__default = /*#__PURE__*/_interopDefaultCompat(imageOptimiserType);

  const cloudflareTransformUrl = '/cdn-cgi/image/';

  const defaultCdnProvider = 'Cloudflare';
  const cmsResourceUrlPattern = /^\/cms\//;
  const staticImageResourcePattern = /^\/img\//;
  const staticCmsAssetPattern = /^\/?assets\//;
  const platformPath = '/sfsites/c';
  const dataResourcePattern = /^data:/;
  const isCloudflareEnabled = () => imageOptimiserType__default.default === defaultCdnProvider;
  function isCmsResource(url) {
    if (url && url.includes('/cms') && url.includes('/media')) {
      url = url.substring(url.indexOf('/cms'));
    }
    return cmsResourceUrlPattern.test(url);
  }
  function composeCloudflareUri(uri, resourceOptions) {
    let cdnOptions = ['fit=scale-down'];
    if (uri.includes(cloudflareTransformUrl)) {
      const endIndexOfCloudflareUrl = uri.indexOf('/', cloudflareTransformUrl.length);
      uri = uri.substring(endIndexOfCloudflareUrl);
    }
    uri = uri.startsWith('/') ? uri.substring(1) : uri;
    if (resourceOptions && !uri.toLowerCase().includes('.svg')) {
      const dimensionsOptions = Object.entries(resourceOptions).map(([key, value]) => {
        return `${key}=${value}`;
      });
      cdnOptions = [...cdnOptions, ...dimensionsOptions];
    }
    return `${cloudflareTransformUrl}${cdnOptions}/${uri}`;
  }
  function extendUrl(url, absoluteUrl, resourceOptions) {
    absoluteUrl = absoluteUrl || false;
    const normalizedCmsResourceOptions = Object.entries(resourceOptions || {}).reduce((result, [key, value]) => {
      value = Math.max(value, 100);
      result[key] = `${value}`;
      return result;
    }, Object.create(null));
    if (url && absoluteUrl && url.includes('/cms') && url.includes('/media')) {
      url = url.substring(url.indexOf('/cms'));
    }
    let extendedUrl = url;
    if (cmsResourceUrlPattern.test(url)) {
      extendedUrl = `${basePath__default.default}${platformPath}${url}`;
      if (!isCloudflareEnabled()) {
        return uri.composeUri(extendedUrl, normalizedCmsResourceOptions);
      }
    } else if (staticImageResourcePattern.test(url)) {
      extendedUrl = `${basePath__default.default}${platformPath}${url}`;
    } else if (staticCmsAssetPattern.test(url)) {
      extendedUrl = url.startsWith('/') ? `${basePath__default.default}${url}` : `${basePath__default.default}/${url}`;
    }
    return extendedUrl;
  }
  function resolve(url, absoluteUrl, resourceOptions) {
    if (!url || dataResourcePattern.test(url)) {
      return url;
    }
    const extendedUrl = extendUrl(url, absoluteUrl, resourceOptions);
    if (isCloudflareEnabled()) {
      return composeCloudflareUri(extendedUrl, resourceOptions);
    }
    return extendedUrl;
  }
  function resolveWithoutImageOpt(url, absoluteUrl, resourceOptions) {
    if (!url || dataResourcePattern.test(url)) {
      return url;
    }
    return extendUrl(url, absoluteUrl, resourceOptions);
  }

  exports.isCmsResource = isCmsResource;
  exports.resolve = resolve;
  exports.resolveWithoutImageOpt = resolveWithoutImageOpt;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_util/common', ['exports'], (function (exports) {

    /**
     * Creates a debounced function that delays invoking `func` until after
     * `delay` milliseconds have elapsed since the last time the debounced function was invoked.
     *
     * @function debounce
     * @param {Function} func - The function to debounce
     * @param {number} delay - The number of milliseconds to delay
     * @param {object} options - The options object
     * @param {boolean} options.leading - Specify invoking on the leading edge of the timeout
     * @returns {Function} - debounced function
     */
    function debounce(func, delay, options) {
      const _options = options || {};
      let invokeLeading = _options.leading;
      let timer;
      return function debounced() {
        const args = Array.prototype.slice.apply(arguments);
        if (invokeLeading) {
          func.apply(this, args);
          invokeLeading = false;
        }
        clearTimeout(timer);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        timer = setTimeout(function () {
          func.apply(this, args);
          invokeLeading = _options.leading; // reset for next debounce sequence
        }, delay);
      };
    }

    const KeyCodes = {
      tab: 9,
      backspace: 8,
      enter: 13,
      escape: 27,
      space: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46,
      shift: 16
    };

    /**
     * Functional Try/Catch handler
     *
     * @param {Function} tryFunc function may throw exception
     * @param {Function} catchFunc function to handle exception
     * @returns {object} result
     */
    function tryCatch(tryFunc, catchFunc) {
      return function fpTryCatch() {
        try {
          return tryFunc.apply(this, arguments);
        } catch (error) {
          return catchFunc?.apply(this, [error].concat(arguments));
        }
      };
    }

    /**
     * Safe parse a json string
     * JSON.parse => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
     *
     * @param {string} json The string to parse as JSON. See the JSON object for a description of JSON syntax.
     * @param {boolean} fallBackInput if fallBackInput is true, then return the input.
     * @param {Function} reviver If a function, this prescribes how the value originally produced by parsing is transformed, before being returned.
     * @returns {object} The Object, Array, string, number, boolean, or null value corresponding to the given JSON text.
     */
    function safeParseJson(json, reviver) {
      if (typeof json !== "string") {
        return json ?? {};
      }
      return tryCatch(JSON.parse, reviver)(json) ?? {};
    }

    /**
     * Stringify object and remove empty values
     *
     * @param {object} obj object to stringify
     * @returns {string} stringified object
     */
    function stringify(obj) {
      return JSON.stringify(obj, (key, value) => value ? value : undefined);
    }

    /**
     * Create a deep copy of an object or array (borrow from base components)
     *
     * @param {object|Array} obj - item to be copied
     * @returns {object|Array} copy of the item
     */
    function deepCopy(obj) {
      if (Object(obj) !== obj) {
        // primitives
        return obj;
      }
      if (obj instanceof Set) {
        return new Set(obj);
      }
      if (obj instanceof Date) {
        return new Date(obj);
      }
      if (typeof obj === "function") {
        return obj.bind({});
      }
      if (Array.isArray(obj)) {
        const obj2 = [];
        const len = obj.length;
        for (let i = 0; i < len; i++) {
          obj2.push(deepCopy(obj[i]));
        }
        return obj2;
      }
      const result = Object.create({});
      let keys = Object.keys(obj);
      if (obj instanceof Error) {
        // Error properties are non-enumerable
        keys = Object.getOwnPropertyNames(obj);
      }
      const len = keys.length;
      for (let i = 0; i < len; i++) {
        const key = keys[i];
        result[key] = deepCopy(obj[key]);
      }
      return result;
    }

    /**
     * Deep merge two objects
     *
     * e.g. deepMerge({a: {a: 1}}, {a: {b: 2}}
     * should return {a: {a: 1, b: 2}}
     *
     * Object.assign does not do deep merge
     * and returns {a: {b: 2}}
     *
     * We could have use lodash merge method but
     * security locker is not allowing it to be
     *
     * @param {object} target target object where merge needed
     * @param {object} sources objects that need to be merged
     * @returns {object} deep merged object
     */
    function deepMerge(target, ...sources) {
      if (!sources.length) {
        return target;
      }
      const source = sources.shift();
      if (isObject(target) && isObject(source)) {
        for (const key in source) {
          if (isObject(source[key])) {
            if (!target[key]) {
              Object.assign(target, {
                [key]: {}
              });
            }
            deepMerge(target[key], source[key]);
          } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
            target[key] = [...target[key], ...source[key]];
          } else {
            Object.assign(target, {
              [key]: source[key]
            });
          }
        }
      }
      return deepMerge(target, ...sources);
    }

    /**
     * Returns if passed value is an object or not
     *
     * @param {object} key
     * @returns true/false
     */
    function isObject(key) {
      return key && typeof key === "object" && !Array.isArray(key);
    }

    /**
     * Simple pipe functional operator
     *
     * @example
     *      pipe(f, g)(v) ===  g(f(v))
     *
     * @param  {...Function} functions functions to be connected
     * @returns {Function} piped function sequence
     */
    const pipe = (...functions) => value => {
      return functions.filter(func => typeof func === "function") // filter out non function
      .reduce((currentValue, currentFunction) => {
        return currentFunction(currentValue);
      }, value);
    };

    /**
     * Simple compose functional operator
     *
     * @example
     *      compose(f, g)(v) ===  f(g(v))
     *
     * @param  {...Function} functions functions to be connected
     * @returns {Function} composed function sequence
     */
    const compose = (...functions) => value => functions.filter(func => typeof func === "function") // filter out non function
    .reduceRight((currentValue, currentFunction) => currentFunction(currentValue), value);

    /**
     * Build forEach functional operator with given function for array
     *
     * @param {Function} action action to be executed in forEach
     * @returns {Function} forEach operator tied to given action
     */
    const forEach = action => items => items.forEach(action);

    /**
     * Build find functional operator with given function for array
     *
     * @param {Function} action action to be executed in find
     * @returns {Function} find operator tied to given action
     */
    const find = action => items => items.find(action);

    /**
     * Build filter functional operator with given function for array
     *
     * @param {Function} action action to be executed in filter
     * @returns {Function} filter operator tied to given action
     */
    const filter = action => items => items.filter(action);

    /**
     * Build map functional operator with given function for array
     *
     * @param {Function} action action to be executed in map
     * @returns {Function} map operator tied to given action
     */
    const map = action => items => items.map(action);

    /**
     * Build every functional operator with given function for array
     *
     * @param {Function} action action to be executed in map
     * @returns {Function} every operator tied to given action
     */
    const every = action => items => items.every(action);

    /**
     * Enumerate all keys of given object
     *
     * @param {Function} action action to be executed
     * @returns {Function} forEachKey operator tied to given action
     */
    const forEachKey = action => items => Object.keys(items).forEach(action);

    /**
     * Every key of given object
     *
     * @param {Function} action action to be executed
     * @returns {Function} everyKey operator tied to given action
     */
    const everyKey = action => items => compose(every(action), Object.keys)(items);

    /**
     * Merge two records and return the merged record with unique items
     *
     * @param {object[]} firstRecord First record
     * @param {object[]} secondRecord Second record
     * @param {string} identifier key based on which the records uniqueness is determined
     * @returns {object[]} Array of merged records
     */
    function mergeUniqueRecords(firstRecord, secondRecord, identifier) {
      const left = Array.isArray(firstRecord) ? firstRecord : [];
      const right = Array.isArray(secondRecord) ? secondRecord : [];
      const nonDups = right.filter(record => {
        const duplicateIndex = left.findIndex(item => item[identifier] === record[identifier]);
        if (duplicateIndex >= 0) {
          left[duplicateIndex] = record;
        }
        return duplicateIndex < 0;
      });
      return left.concat(nonDups);
    }

    /**
     * Takes a function with n arguments and transforms it into n functions that each take a single argument aka curried function.
     *
     * @param {Function} func with n arguments
     * @returns {Function}the result of applied function or a function that accepts remaining arguments
     */
    const curry = func => {
      return function curried(...args) {
        if (args.length >= func.length) {
          return func.apply(this, args);
        }
        return (...args2) => {
          return curried.apply(this, args.concat(args2));
        };
      };
    };

    /**
     * Check if given statement is a function
     *
     * @param {string} statement statement to be checked
     * @returns {boolean} whether given value is a function
     */
    function isFunction(statement) {
      return typeof statement === "function";
    }

    /**
     * Call statement if it is a function, or return the statement
     *
     * @param {Function|boolean} statement statement to be called
     * @returns {any} result of the statement
     */
    const callOrReturn = statement => {
      return isFunction(statement) ? statement() : statement;
    };

    /**
     * Execute then function or else function based on value of the condition
     *
     * @param {Function|boolean} fnCondition condition to be checked
     * @param {Function|any} fnThen then function to be executed
     * @param {Function|any} fnElse else function to be executed
     * @returns {any}
     */
    const ifElse = curry((fnCondition, fnThen, fnElse) => {
      return callOrReturn(fnCondition) ? callOrReturn(fnThen) : callOrReturn(fnElse);
    });

    /**
     * Execute given function if given statement is a function
     *
     * @param {Function|boolean} fnCondition condition to be checked
     * @param {Function|object} fnThen statement to be executed if condition is true
     * @returns {any} statement or function result
     */
    const ifVal = curry((fnCondition, fnThen) => {
      return ifElse(fnCondition, fnThen, null);
    });
    const apply$1 = value => func => func(value);

    /**
     * Execute functions return true if one of them is passed
     *
     * @param {...Function} funcs funcs to be applied
     * @returns {boolean} true one function is passed
     */
    const or = (...funcs) => value => funcs?.filter(isFunction).some(apply$1(value));

    /**
     * Execute functions return true if all are passed
     *
     * @param {Function[]} funcs funcs to be applied
     * @returns {boolean} true when all  are passed
     */
    const and = (...funcs) => value => funcs?.filter(isFunction).every(apply$1(value));

    /**
     * Detects the Data Type and returns if its Primitive Type or not
     * https://developer.mozilla.org/en-US/docs/Glossary/Primitive
     *
     * @param {*} data input Data
     * @returns {boolean} returns true if Primitive Data Type else false
     */
    function isPrimitive(data) {
      return data !== Object(data);
    }

    /**
     * Custom Typeof method to determine the data type of an array rather an object.
     *
     * @param {*} data input Data
     * @returns {string} the type of the data
     */
    function typeOf(data) {
      return Array.isArray(data) ? "array" : typeof data;
    }

    /**
     * Get value of given key from given object
     *
     * @param {object} obj object to be searched
     * @param {string} path path to be searched
     * @returns {any} value of given key
     */
    const get = curry((obj, path) => {
      if (empty(path)) {
        return obj;
      }
      const steps = path.split(".");
      let current = obj ?? {};
      let i = 0;
      for (i = 0; i < steps.length - 1; i++) {
        if (empty(current[steps[i]])) {
          return null;
        }
        current = current[steps[i]];
      }
      return current[steps[i]];
    });

    /**
     * Set value of given key in given object
     *
     * @param {object} obj object to be searched
     * @param {string} path path to be searched
     * @param {any} value value of given key
     */
    const set = curry((obj, path, value) => {
      if (empty(path)) {
        return;
      }
      const steps = path.split(".");
      let current = obj;
      let i = 0;
      for (i = 0; i < steps.length - 1; i++) {
        current[steps[i]] = current[steps[i]] || {};
        current = current[steps[i]];
      }
      current[steps[i]] = value;
    });

    /**
     * Set value of given key in src object to value of given key in dest object
     *
     * @param {object} src source object
     * @param {object} dest destination object
     * @param {string} srcKey source key
     * @param {string} destKey destination key
     */
    const mapping = curry((src, dest, srcKey, destKey) => {
      const value = get(src, srcKey);
      set(dest, destKey, value);
    });

    /**
     * Merge src object's path value to dest object's path value
     *
     * @param {object} src source object
     * @param {object} dest destination object
     * @param {object} mapper mapper of attribtues
     * @param {boolean}  reverseMapper whether to use value/key instead of key/value
     * @returns {object} updated dest object
     */
    function mapObject(src, dest, mapper, reverseMapper) {
      forEachKey(key => {
        if (reverseMapper) {
          mapping(src, dest, mapper[key], key);
        } else {
          mapping(src, dest, key, mapper[key]);
        }
      })(mapper ?? {});
      return dest;
    }

    /**
     * Invoke a method on given object
     *
     * @param  {...any} args arguments to be passed to the method
     * @returns {object} returned from method or null
     */
    function apply(...args) {
      const [obj, method, ...rest] = args;
      return obj?.[method]?.apply(obj, rest);
    }

    /**
     * Create index array from given count
     *
     * @param {number} count how many index
     * @returns {number[]} [1, 2, 3, ... count]
     */
    const toIndexes = count => [...Array(count).keys()];
    const notEmpty = value => !empty(value);

    /**
     * Check if given value is empty
     *  "", [], null, undefined, {} is treated as empty
     *
     * @param {any} value value to check
     * @returns {boolean} whether value is empty
     */
    function empty(value) {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      const type = typeof value;
      switch (type) {
        case "string":
          return value === "";
        case "boolean":
        case "number":
        case "function":
          return false;
        case "object":
          return Object.keys(value ?? {}).length === 0;
        default:
          return value == null;
      }
    }

    /**
     * Check if given property is defined in given object
     *
     * @param {object} object object to evaluate
     * @param {string} property property name
     * @returns {boolean} whether property is defined on object
     */
    function hasOwnProperty(object, property = "") {
      return Object.prototype.hasOwnProperty.call(object ?? {}, property);
    }
    const SFDC_DEFAULT = "__sfdc_default__";
    /**
     * Path given resolve, to avoid empty function
     *
     * @param {object} resolver give resolver
     * @returns {object} patched resolver
     */
    function patchResolver(resolver) {
      return {
        patchRecord: true,
        getter: (target, key) => () => get(target, key),
        ...resolver
      };
    }
    /**
     * Check if given field is spanning field
     *
     * @param {object} field field to check
     * @returns {boolean} true if field is spanning field
     */
    function isSpanningField(field) {
      return notEmpty(field?.value?.fields);
    }

    /**
     * Return field displayValue or value or field itself
     *
     * @param {object} field field to get value
     * @returns {any} field displayValue or value or field itself
     */
    function fieldToValue(field) {
      return field?.displayValue || field?.value || field;
    }

    /**
     * Return field value or empty string
     *
     * @param {object} field target field to get value
     * @param {any} value field's value
     * @returns {any} when field's displayValue and value are both null return empty string
     *                otherwise return value
     */
    function safeFieldValue(field, value) {
      if (isField(field)) {
        return value ?? "";
      }
      return value;
    }

    /**
     * Check if field has null value
     *
     * @param {object} propertyValue field value
     * @returns {boolean} whether it's a null value of field
     */
    function isField(propertyValue) {
      return typeof propertyValue === "object" && !Array.isArray(propertyValue) && hasOwnProperty(propertyValue, "value") && hasOwnProperty(propertyValue, "displayValue");
    }

    /**
     * Convert a plain object to getify
     *
     * @param {object} object to be getified
     * @param {object} resolver getter/setter resolver
     * @param {object} parent parent object to apply property
     * @returns {object} getified object
     */
    function getify(object, resolver, parent = {}) {
      if (empty(object) || isPrimitive(object) || isFunction(object)) {
        return object;
      }
      resolver = patchResolver(resolver);
      if (Array.isArray(object)) {
        return object.map(item => getify(item, resolver));
      }
      return Object.entries(object).reduce((initial, entry) => {
        const [key, value] = entry;
        const type = typeof value;
        if (isPrimitive(value)) {
          Object.defineProperty(initial, key, {
            get() {
              return resolver.getter(object, key)();
            },
            enumerable: true
          });
        } else if (Array.isArray(value)) {
          initial[key] = value.map(item => getify(item, resolver));
        } else if (isFunction(value)) {
          initial[key] = value;
        }
        // istanbul ignore else
        else if (type === "object") {
          const obj = {};
          if (resolver.patchRecord) {
            Object.defineProperties(obj, {
              [SFDC_DEFAULT]: {
                get() {
                  return safeFieldValue(value, resolver.getter(object, key)());
                },
                enumerable: true
              },
              _rawValue: {
                get() {
                  return resolver.getter(obj, "value")();
                },
                enumerable: true
              },
              _displayValue: {
                get() {
                  return resolver.getter(obj, "displayValue")();
                },
                enumerable: true
              }
            });
          }
          getify(value, resolver, obj);
          if (isSpanningField(obj)) {
            const fields = obj.value.fields;
            Object.entries(fields).forEach(field => {
              const [fieldName, fieldInfo] = field;

              // Don't override existing property
              if (!hasOwnProperty(obj, fieldName)) {
                Object.defineProperty(obj, fieldName, {
                  get() {
                    // if field is spanning field, return itself
                    if (isSpanningField(fieldInfo)) {
                      return fieldInfo;
                    }

                    // if field is not spanning field, return displayValue or value or itself
                    return fieldToValue(fieldInfo);
                  },
                  enumerable: true
                });
              }
            });
          }
          // Lock will block defineProperties from return value. Or it's proxied, can use defineProperties at all
          // But for argument locker didn't touch it, so we can still use defineProperties on it.
          initial[key] = obj;
        }
        return initial;
      }, parent);
    }

    /**
     * Returns the number in the range of the min and the max value
     * If the input value is less than min, returns the min
     * If the input value is greater than max, returns the max.
     *
     * @function range
     * @param {number} value - The input value to range
     * @param {number} min -  The minimum number
     * @param {number} max - The maximum number
     * @returns {number} - returns the number in the range
     */
    function range(value, min, max) {
      const number = Number.parseInt(value, 10);
      if (number < min) {
        return min;
      }
      if (number > max) {
        return max;
      }
      return number;
    }

    /**
     * Validates if the given value is a number
     * The function supports the validation of
     * decimal, binary and hexadecimal numbers
     *
     * @param {any} value The value to be validated
     * @returns {boolean} True if the value is a number, otherwise False
     */
    function isNumber(value) {
      return value !== "" && !isNaN(Number(value)) && /^-?[0-9a-fA-Fx.]*$/.exec(value);
    }

    const VALID_UNITS = ["%", "cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "rlh", "vw", "vh", "vmin", "vmax", "vb", "vi", "svw", "svh", "lvw", "lvh", "dvw", "dvh"];

    /**
     * The value and unit of a unit value [number][px|%|rem|...]
     * E.g.: { value: "100", unit: "px" }
     *
     * @typedef {object} UnitValue
     * @property {number} value - The unit value
     * @property {string} unit - The unit
     */

    /**
     * Parse the given size in its numeric and unit parts
     * Expected pattern [number][px|%|rem|...]
     *
     * @param {string} unitValue The size value to be parsed
     * @param {string[]} acceptedUnits The list of accepted units.
     * @returns {UnitValue} An object with the numeric value and unit
     */
    function parseUnit(unitValue, acceptedUnits = VALID_UNITS) {
      const parsedValues = /^([^a-z%]*)(.*)/.exec(unitValue);
      let value = parsedValues[1];
      let unit = parsedValues[2];
      if (!isNumber(value) || !acceptedUnits.includes(unit)) {
        value = "";
        unit = "";
      }
      return {
        value,
        unit
      };
    }

    const propertyNamesHash = properties => {
      return typeof properties === "object" ? properties : {};
    };
    const proto = {
      toString() {
        return Object.keys(this).map(key => {
          const [name, unit] = key.split(":");
          const parsedValue = parseUnit(this[key]);
          let value;
          if (notEmpty(parsedValue.unit)) {
            value = this[key];
          } else {
            value = notEmpty(this[key]) ? `${this[key]}${unit ?? ""}` : "initial";
          }
          return `${name}: ${value};`;
        }).join(" ");
      }
    };

    /**
     * A CSS Custom Property Utility
     *
     * @example
     *   const styles = propertySet({
     *       "--dxp-c-card-content-width:%": this.contentWidth,
     *       "--dxp-c-card-content-height:px": this.contentHeight,
     *   }).toString();
     *
     *   When value is undefined/null/“”, the property is ignored. Such as contentWidth is undefined
     *   contentHeight is 0.
     *      "--dxp-c-card-content-height: 0px"
     *
     *   When contentWidth is 100, contentHeight is 100
     *
     *      "--dxp-c-card-content-width: 100%;--dxp-c-card-content-height: 0px;"
     *
     * @param {object} config a plain configuration, use as shallow copy.
     * @returns {object} A PropertySet object
     */
    function propertySet(config) {
      return Object.assign(Object.create(proto), propertyNamesHash(config));
    }

    /**
     * Static Content for placeholder datauri
     */
    const PLACEHOLDER_DATA_URI = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwNiIgaGVpZ2h0PSI0NDEiIHZpZXdCb3g9IjAgMCAxNDA2IDQ0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgb3BhY2l0eT0iMC4yODMxNTgiIHk9IjAuMzMwMDc4IiB3aWR0aD0iMTQwNiIgaGVpZ2h0PSI0NDAiIGZpbGw9IiNGM0YzRjMiLz4KPHBhdGggZD0iTTY3OCAyNTJDNjcxLjkyIDI1MiA2NjcgMjQ3LjA4IDY2NyAyNDFWMTk5QzY2NyAxOTIuOTIgNjcxLjkyIDE4OCA2NzggMTg4SDcyOEM3MzQuMDggMTg4IDczOSAxOTIuOTIgNzM5IDE5OVYyNDFDNzM5IDI0Ny4wOCA3MzQuMDggMjUyIDcyOCAyNTJINjc4VjI1MlpNNjczIDIzMS43Nkw2ODEuODggMjI0LjhDNjgyLjU2IDIyNC4yOCA2ODMuMjggMjI0IDY4NC4wNCAyMjRDNjg0LjggMjI0IDY4NS41NiAyMjQuMjggNjg2LjIgMjI0LjhMNjk2LjY0IDIzMy4yNEw3MTQuMDggMjE4LjhDNzE0Ljc2IDIxOC4yNCA3MTUuNDggMjE4IDcxNi4yNCAyMThDNzE3IDIxOCA3MTcuNzYgMjE4LjI4IDcxOC40IDIxOC44TDczMyAyMzAuNDhWMTk5QzczMyAxOTYuMjQgNzMwLjc2IDE5NCA3MjggMTk0SDY3OEM2NzUuMjQgMTk0IDY3MyAxOTYuMjQgNjczIDE5OVYyMzEuNzZWMjMxLjc2Wk02OTUgMjIwQzY4OS40OCAyMjAgNjg1IDIxNS41MiA2ODUgMjEwQzY4NSAyMDQuNDggNjg5LjQ4IDIwMCA2OTUgMjAwQzcwMC41MiAyMDAgNzA1IDIwNC40OCA3MDUgMjEwQzcwNSAyMTUuNTIgNzAwLjUyIDIyMCA2OTUgMjIwWk02OTUgMjE0QzY5Ny4yIDIxNCA2OTkgMjEyLjIgNjk5IDIxMEM2OTkgMjA3LjggNjk3LjIgMjA2IDY5NSAyMDZDNjkyLjggMjA2IDY5MSAyMDcuOCA2OTEgMjEwQzY5MSAyMTIuMiA2OTIuOCAyMTQgNjk1IDIxNFpNNjc4IDI0Nkg3MjhDNzMwLjc2IDI0NiA3MzMgMjQzLjc2IDczMyAyNDFWMjM5LjY0QzczMyAyMzguNjggNzMyLjYgMjM3Ljg0IDczMS44NCAyMzcuMjRMNzE2LjI0IDIyNC43Nkw2OTguOCAyMzkuMjRDNjk4LjE2IDIzOS43NiA2OTcuNCAyNDAgNjk2LjY0IDI0MEM2OTUuODggMjQwIDY5NS4xNiAyMzkuOCA2OTQuNDggMjM5LjI0TDY4NC4wNCAyMzAuNzZMNjc0LjE2IDIzOC41MkM2NzMuNCAyMzkuMTIgNjczIDIzOS45NiA2NzMgMjQwLjkyVjI0MUM2NzMgMjQzLjc2IDY3NS4yNCAyNDYgNjc4IDI0NlYyNDZaIiBmaWxsPSIjQUJBQ0FEIi8+Cjwvc3ZnPg==";

    /**
     * Static Content for video placeholder datauri
     */
    const VIDEO_PLACEHOLDER_DATA_URI = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMxMiIgaGVpZ2h0PSI0NDAiIHZpZXdCb3g9IjAgMCAxMzEyIDQ0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgb3BhY2l0eT0iMC4yODMxNTgiIHdpZHRoPSIxMzEyIiBoZWlnaHQ9IjQ0MCIgZmlsbD0iI0YzRjNGMyIvPgo8cGF0aCBkPSJNNjM5LjA4IDE5MkM2NDAuNzYgMTkyIDY0Mi42OCAxOTIuNTYgNjQ0LjY4IDE5My42OEw2NzguNzYgMjEyLjg0QzY4Mi4yOCAyMTQuOCA2ODQgMjE3LjQgNjg0IDIyMEM2ODQgMjIyLjYgNjgyLjMyIDIyNS4xNiA2NzguNzYgMjI3LjE2TDY0NC42OCAyNDYuMzJDNjQyLjY4IDI0Ny40NCA2NDAuNzYgMjQ4IDYzOS4wOCAyNDhDNjM0Ljg4IDI0OCA2MzIgMjQ0LjY0IDYzMiAyMzguOTJWMjAxLjA4QzYzMiAxOTUuMzYgNjM0Ljg4IDE5MiA2MzkuMDggMTkyVjE5MloiIGZpbGw9IiNBQkFDQUQiLz4KPC9zdmc+";
    const LOGO_PLACEHOLDER_DATA_URI = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMTUwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iIzc3NzU3QSIvPgo8cGF0aCBkPSJNNjUuNTI4NyAzOS41VjEyLjAzMkg3MC40MDA3VjM1LjM4NEg4MS44MjQ3VjM5LjVINjUuNTI4N1pNOTQuMDk5NSA0MC4wMDRDOTIuMzkxNSA0MC4wMDQgOTAuNzk1NSAzOS41ODQgODkuMzExNSAzOC43NDRDODcuODI3NSAzNy44NzYgODYuNjIzNSAzNi42NDQgODUuNjk5NSAzNS4wNDhDODQuNzc1NSAzMy40MjQgODQuMzEzNSAzMS40NzggODQuMzEzNSAyOS4yMUM4NC4zMTM1IDI2LjkxNCA4NC43NzU1IDI0Ljk2OCA4NS42OTk1IDIzLjM3MkM4Ni42MjM1IDIxLjc0OCA4Ny44Mjc1IDIwLjUxNiA4OS4zMTE1IDE5LjY3NkM5MC43OTU1IDE4LjgwOCA5Mi4zOTE1IDE4LjM3NCA5NC4wOTk1IDE4LjM3NEM5NS44MzU1IDE4LjM3NCA5Ny40NDU1IDE4LjgwOCA5OC45Mjk1IDE5LjY3NkMxMDAuNDE0IDIwLjUxNiAxMDEuNjE4IDIxLjc0OCAxMDIuNTQyIDIzLjM3MkMxMDMuNDY2IDI0Ljk2OCAxMDMuOTI4IDI2LjkxNCAxMDMuOTI4IDI5LjIxQzEwMy45MjggMzEuNDc4IDEwMy40NjYgMzMuNDI0IDEwMi41NDIgMzUuMDQ4QzEwMS42MTggMzYuNjQ0IDEwMC40MTQgMzcuODc2IDk4LjkyOTUgMzguNzQ0Qzk3LjQ0NTUgMzkuNTg0IDk1LjgzNTUgNDAuMDA0IDk0LjA5OTUgNDAuMDA0Wk05NC4wOTk1IDM2LjA1NkM5NS42MTE1IDM2LjA1NiA5Ni44MDE1IDM1LjQyNiA5Ny42Njk1IDM0LjE2NkM5OC41Mzc1IDMyLjkwNiA5OC45NzE1IDMxLjI1NCA5OC45NzE1IDI5LjIxQzk4Ljk3MTUgMjcuMTM4IDk4LjUzNzUgMjUuNDcyIDk3LjY2OTUgMjQuMjEyQzk2LjgwMTUgMjIuOTUyIDk1LjYxMTUgMjIuMzIyIDk0LjA5OTUgMjIuMzIyQzkyLjU4NzUgMjIuMzIyIDkxLjM5NzUgMjIuOTUyIDkwLjUyOTUgMjQuMjEyQzg5LjY4OTUgMjUuNDcyIDg5LjI2OTUgMjcuMTM4IDg5LjI2OTUgMjkuMjFDODkuMjY5NSAzMS4yNTQgODkuNjg5NSAzMi45MDYgOTAuNTI5NSAzNC4xNjZDOTEuMzk3NSAzNS40MjYgOTIuNTg3NSAzNi4wNTYgOTQuMDk5NSAzNi4wNTZaTTExNS44OSA0OC42MTRDMTE0LjI2NiA0OC42MTQgMTEyLjc5NiA0OC40MTggMTExLjQ4IDQ4LjAyNkMxMTAuMTkyIDQ3LjYzNCAxMDkuMTcgNDcuMDMyIDEwOC40MTQgNDYuMjJDMTA3LjY4NiA0NS40MzYgMTA3LjMyMiA0NC40NDIgMTA3LjMyMiA0My4yMzhDMTA3LjMyMiA0MS41MyAxMDguMzAyIDQwLjA2IDExMC4yNjIgMzguODI4VjM4LjY2QzEwOS43MyAzOC4zMjQgMTA5LjI4MiAzNy44NzYgMTA4LjkxOCAzNy4zMTZDMTA4LjU4MiAzNi43NTYgMTA4LjQxNCAzNi4wNTYgMTA4LjQxNCAzNS4yMTZDMTA4LjQxNCAzNC40MDQgMTA4LjYzOCAzMy42NzYgMTA5LjA4NiAzMy4wMzJDMTA5LjU2MiAzMi4zNiAxMTAuMDk0IDMxLjgxNCAxMTAuNjgyIDMxLjM5NFYzMS4yMjZDMTA5Ljk4MiAzMC42OTQgMTA5LjM1MiAyOS45NTIgMTA4Ljc5MiAyOUMxMDguMjYgMjguMDQ4IDEwNy45OTQgMjYuOTcgMTA3Ljk5NCAyNS43NjZDMTA3Ljk5NCAyNC4xNyAxMDguMzcyIDIyLjgyNiAxMDkuMTI4IDIxLjczNEMxMDkuODg0IDIwLjY0MiAxMTAuODc4IDE5LjgxNiAxMTIuMTEgMTkuMjU2QzExMy4zNyAxOC42NjggMTE0LjcxNCAxOC4zNzQgMTE2LjE0MiAxOC4zNzRDMTE2LjcwMiAxOC4zNzQgMTE3LjIzNCAxOC40MyAxMTcuNzM4IDE4LjU0MkMxMTguMjcgMTguNjI2IDExOC43NDYgMTguNzM4IDExOS4xNjYgMTguODc4SDEyNi41NThWMjIuNDQ4SDEyMi43NzhDMTIzLjExNCAyMi44NCAxMjMuMzk0IDIzLjM0NCAxMjMuNjE4IDIzLjk2QzEyMy44NDIgMjQuNTQ4IDEyMy45NTQgMjUuMjA2IDEyMy45NTQgMjUuOTM0QzEyMy45NTQgMjcuNDQ2IDEyMy42MDQgMjguNzM0IDEyMi45MDQgMjkuNzk4QzEyMi4yMDQgMzAuODM0IDEyMS4yNjYgMzEuNjE4IDEyMC4wOSAzMi4xNUMxMTguOTE0IDMyLjY4MiAxMTcuNTk4IDMyLjk0OCAxMTYuMTQyIDMyLjk0OEMxMTUuNjk0IDMyLjk0OCAxMTUuMjMyIDMyLjkwNiAxMTQuNzU2IDMyLjgyMkMxMTQuMjggMzIuNzM4IDExMy44MDQgMzIuNTk4IDExMy4zMjggMzIuNDAyQzExMy4wMiAzMi42ODIgMTEyLjc2OCAzMi45NjIgMTEyLjU3MiAzMy4yNDJDMTEyLjQwNCAzMy41MjIgMTEyLjMyIDMzLjkgMTEyLjMyIDM0LjM3NkMxMTIuMzIgMzQuOTY0IDExMi41NTggMzUuNDI2IDExMy4wMzQgMzUuNzYyQzExMy41MzggMzYuMDk4IDExNC40MiAzNi4yNjYgMTE1LjY4IDM2LjI2NkgxMTkuMzM0QzEyMS44MjYgMzYuMjY2IDEyMy43MDIgMzYuNjcyIDEyNC45NjIgMzcuNDg0QzEyNi4yNSAzOC4yNjggMTI2Ljg5NCAzOS41NTYgMTI2Ljg5NCA0MS4zNDhDMTI2Ljg5NCA0Mi42OTIgMTI2LjQ0NiA0My45MSAxMjUuNTUgNDUuMDAyQzEyNC42NTQgNDYuMTIyIDEyMy4zOCA0Ny4wMDQgMTIxLjcyOCA0Ny42NDhDMTIwLjA3NiA0OC4yOTIgMTE4LjEzIDQ4LjYxNCAxMTUuODkgNDguNjE0Wk0xMTYuMTQyIDI5LjkyNEMxMTcuMTIyIDI5LjkyNCAxMTcuOTYyIDI5LjU2IDExOC42NjIgMjguODMyQzExOS4zNjIgMjguMTA0IDExOS43MTIgMjcuMDgyIDExOS43MTIgMjUuNzY2QzExOS43MTIgMjQuNDc4IDExOS4zNjIgMjMuNDg0IDExOC42NjIgMjIuNzg0QzExNy45OSAyMi4wNTYgMTE3LjE1IDIxLjY5MiAxMTYuMTQyIDIxLjY5MkMxMTUuMTM0IDIxLjY5MiAxMTQuMjggMjIuMDQyIDExMy41OCAyMi43NDJDMTEyLjg4IDIzLjQ0MiAxMTIuNTMgMjQuNDUgMTEyLjUzIDI1Ljc2NkMxMTIuNTMgMjcuMDgyIDExMi44OCAyOC4xMDQgMTEzLjU4IDI4LjgzMkMxMTQuMjggMjkuNTYgMTE1LjEzNCAyOS45MjQgMTE2LjE0MiAyOS45MjRaTTExNi42NDYgNDUuNDY0QzExOC4yOTggNDUuNDY0IDExOS42NDIgNDUuMTI4IDEyMC42NzggNDQuNDU2QzEyMS43MTQgNDMuNzg0IDEyMi4yMzIgNDMuMDE0IDEyMi4yMzIgNDIuMTQ2QzEyMi4yMzIgNDEuMzM0IDEyMS45MSA0MC43ODggMTIxLjI2NiA0MC41MDhDMTIwLjY1IDQwLjIyOCAxMTkuNzU0IDQwLjA4OCAxMTguNTc4IDQwLjA4OEgxMTUuNzY0QzExNC42NDQgNDAuMDg4IDExMy43MDYgMzkuOTkgMTEyLjk1IDM5Ljc5NEMxMTEuODg2IDQwLjYwNiAxMTEuMzU0IDQxLjUxNiAxMTEuMzU0IDQyLjUyNEMxMTEuMzU0IDQzLjQ0OCAxMTEuODMgNDQuMTYyIDExMi43ODIgNDQuNjY2QzExMy43MzQgNDUuMTk4IDExNS4wMjIgNDUuNDY0IDExNi42NDYgNDUuNDY0Wk0xMzguMzE0IDQwLjAwNEMxMzYuNjA2IDQwLjAwNCAxMzUuMDEgMzkuNTg0IDEzMy41MjYgMzguNzQ0QzEzMi4wNDIgMzcuODc2IDEzMC44MzggMzYuNjQ0IDEyOS45MTQgMzUuMDQ4QzEyOC45OSAzMy40MjQgMTI4LjUyOCAzMS40NzggMTI4LjUyOCAyOS4yMUMxMjguNTI4IDI2LjkxNCAxMjguOTkgMjQuOTY4IDEyOS45MTQgMjMuMzcyQzEzMC44MzggMjEuNzQ4IDEzMi4wNDIgMjAuNTE2IDEzMy41MjYgMTkuNjc2QzEzNS4wMSAxOC44MDggMTM2LjYwNiAxOC4zNzQgMTM4LjMxNCAxOC4zNzRDMTQwLjA1IDE4LjM3NCAxNDEuNjYgMTguODA4IDE0My4xNDQgMTkuNjc2QzE0NC42MjggMjAuNTE2IDE0NS44MzIgMjEuNzQ4IDE0Ni43NTYgMjMuMzcyQzE0Ny42OCAyNC45NjggMTQ4LjE0MiAyNi45MTQgMTQ4LjE0MiAyOS4yMUMxNDguMTQyIDMxLjQ3OCAxNDcuNjggMzMuNDI0IDE0Ni43NTYgMzUuMDQ4QzE0NS44MzIgMzYuNjQ0IDE0NC42MjggMzcuODc2IDE0My4xNDQgMzguNzQ0QzE0MS42NiAzOS41ODQgMTQwLjA1IDQwLjAwNCAxMzguMzE0IDQwLjAwNFpNMTM4LjMxNCAzNi4wNTZDMTM5LjgyNiAzNi4wNTYgMTQxLjAxNiAzNS40MjYgMTQxLjg4NCAzNC4xNjZDMTQyLjc1MiAzMi45MDYgMTQzLjE4NiAzMS4yNTQgMTQzLjE4NiAyOS4yMUMxNDMuMTg2IDI3LjEzOCAxNDIuNzUyIDI1LjQ3MiAxNDEuODg0IDI0LjIxMkMxNDEuMDE2IDIyLjk1MiAxMzkuODI2IDIyLjMyMiAxMzguMzE0IDIyLjMyMkMxMzYuODAyIDIyLjMyMiAxMzUuNjEyIDIyLjk1MiAxMzQuNzQ0IDI0LjIxMkMxMzMuOTA0IDI1LjQ3MiAxMzMuNDg0IDI3LjEzOCAxMzMuNDg0IDI5LjIxQzEzMy40ODQgMzEuMjU0IDEzMy45MDQgMzIuOTA2IDEzNC43NDQgMzQuMTY2QzEzNS42MTIgMzUuNDI2IDEzNi44MDIgMzYuMDU2IDEzOC4zMTQgMzYuMDU2WiIgZmlsbD0iIzcwNkU2QiIvPgo8L3N2Zz4K";

    /**
     * Whether uri has content.
     *
     * @param {string} uri uri to check
     * @returns {boolean} true if uri has content, instead of nullish or empty string
     */
    function hasUri(uri) {
      return uri && uri !== "";
    }

    /**
     * Transform uri to css url('uri')
     *
     * @example
     *      toCssUrl("https://example") => url('https://example')
     *
     * @param {string} uri source uri
     * @returns {string} css url string
     */
    function toCssUrl(uri) {
      return hasUri(uri) ? `url("${uri}")` : "";
    }

    /**
     * Normalize url, if url is empty, return fallback placeholder url
     *
     * @param {string} url image url
     * @returns {string} url value
     */
    function safeCssUrl(url) {
      return pipe(safeImageSrc, toCssUrl)(url);
    }

    /**
     * Return normalized image uri
     *
     * @param {string} uri image uri
     * @returns {string} if empty return default placeholder data uri.
     */
    function safeImageSrc(uri) {
      return hasUri(uri) ? uri : PLACEHOLDER_DATA_URI;
    }

    /**
     * Build a querySelectorAll functional operator with given selector
     *
     * @param {string} selector A css selector
     * @returns {Function} querySelectorAll operator tied to selector
     */
    const querySelectorAll = selector => element => Array.from(element?.querySelectorAll(selector));
    const focusableElementsSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

    /**
     * Returns the first focusable element inside the given element.
     * NOTE: Only works for elements that have open shadow root!
     *
     * @param {Element} element - element to search inside
     * @returns {Element|null}  - first focusable element inside the given element
     */
    const findFirstFocusable = element => {
      if (!element) {
        return null;
      }
      if (element.matches && element.matches(focusableElementsSelector)) {
        return element;
      }

      // eslint-disable-next-line @locker/locker/distorted-element-shadow-root-getter
      const shadowRoot = element.shadowRoot;
      if (shadowRoot) {
        // if element is in shadow dom
        return findFirstFocusable(shadowRoot);
      } else if (element.assignedElements) {
        // if the element is a slot with assigned elements
        for (const assignedElement of element.assignedElements()) {
          const focusableInAssigned = findFirstFocusable(assignedElement);
          if (focusableInAssigned) {
            return focusableInAssigned;
          }
        }
      } else {
        // if element is in light dom
        for (const child of element.children) {
          const focusableChild = findFirstFocusable(child);
          if (focusableChild) {
            return focusableChild;
          }
        }
      }
      return null;
    };

    /**
     * Split string into array of words and remove empty words
     *
     * @param {string} separator
     * @param {string} string
     * @returns
     */
    const split = curry((separator, string) => {
      return string?.toString().split(separator) ?? [];
    });

    /**
     * Capitalize given string, such as from hello to Hello
     *
     * @param {string} string String to be capitalized
     * @returns {string} capitalized string
     */
    function toCapitalized(string = "") {
      string = string?.toString();
      return isNonEmptyString(string) ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : "";
    }

    /**
     * Check if given value is a string
     *
     * @param {*} str value to be checked
     * @returns {boolean} flag indicating if the value is string type
     */
    function isString(str) {
      return typeof str === "string";
    }

    /**
     * Check if given string is non empty
     *
     * @param {string} str string to be checked
     * @returns {boolean} whether string is non empty
     */
    function isNonEmptyString(str) {
      return isString(str) && notEmpty(str);
    }

    /**
     * Split url into array of words and remove empty words
     *
     * @param {*} url url to be split
     * @returns {string[]} array of words
     */
    function splitUrl(url) {
      return compose(filter(item => item?.length > 0), split("/"))(url);
    }

    /**
     * Return a promise resolved when time is out.
     *
     * @param {number} interval timeout value
     * @returns {object} A promise
     */
    function timeout(interval = 0) {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(resolve, interval);
      });
    }

    /**
     * Return a promise resolved when requestAnimationFrame is called.
     *
     * @returns {object} A promise
     */
    function nextFrame() {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(resolve);
      });
    }

    const LARGE_FORMFACTOR = "l";
    const MEDIUM_FORMFACTOR = "m";
    const SMALL_FORMFACTOR = "s";
    const FORMFACTOR_ARRAY = [LARGE_FORMFACTOR, MEDIUM_FORMFACTOR, SMALL_FORMFACTOR];

    // Content position value to flexbox alignment property mapping
    const AlignmentMap = {
      top: "flex-start",
      left: "flex-start",
      bottom: "flex-end",
      right: "flex-end",
      center: "center"
    };

    /**
     * Create attributes for all the form factors to be fed to the propertySet
     *
     * @param {object} attributeMap
     * @param {string} keyPrefix
     * @param {object} attributeValues
     * @returns {object} { "key:unit" : "value" }
     * @example {name: "height", unit: "px"},'--dxp-c', {"--dxp-c-l-height": "10", "--dxp-c-m-height": "20", "--dxp-c-s-height": "30" } =>
     *  {"--dxp-c-l-height:px": "10", "--dxp-c-m-height:px": "20", "--dxp-c-s-height:px": "30" }
     */
    function prependFormFactor(attributeMap, keyPrefix, attributeValues) {
      const response = {};
      FORMFACTOR_ARRAY.forEach(formFactor => {
        attributeMap.forEach(prop => {
          const propKeyWithCustomTitle = `${keyPrefix}-${formFactor}-${prop.customTitle || prop.name}`;
          const propKey = `${keyPrefix}-${formFactor}-${prop.name}`;
          response[`${propKeyWithCustomTitle}:${prop.unit}`] = prop.name.match(/alignment/gi) && Object.keys(attributeValues).includes(propKey) ? AlignmentMap[attributeValues[propKey]] : attributeValues[propKey];
        });
      });
      return response;
    }

    /**
     * Convert `class` attribute value to a selector
     *
     * @param {string} classAttributeValue value passed in class attribute of the element
     * @returns {string} selector which could be passed to query selector to select that element
     */
    function convertClassAttributeToSelector(classAttributeValue) {
      return ifElse(!classAttributeValue || typeof classAttributeValue !== "string", null, () => `.${classAttributeValue.split(" ").join(".")}`);
    }

    /**
     * Split string into object of key value pairs
     * ex: "--dxp-c-l-width: 30; --dxp-c-l-height: 30;"
     * response : { --dxp-c-l-width: 30, --dxp-c-l-height: 30};
     * here attributeSeparator is ;, and keyValSeparator is :
     *
     * @param {string} attributeSeparator
     * @param {string} keyValSeparator
     * @param {string} string
     * @returns {object}
     */
    function splitStringToObj(attributeSeparator, keyValSeparator, string) {
      const response = {};
      if (!string || !attributeSeparator || !keyValSeparator) {
        return {};
      }
      const stringArray = string.split(attributeSeparator);
      stringArray.filter(keyValue => {
        const kvm = keyValue.match(new RegExp(keyValSeparator, "g")) || [];
        return keyValue && kvm.length === 1 && kvm[0] === keyValSeparator;
      }).forEach(keyValue => {
        const [key, value] = keyValue.split(keyValSeparator);
        response[key.trim()] = value.trim();
      });
      return response;
    }

    /**
     * Define the debounce timeout
     * Why choose 150ms for debounce delay, below link has some good explanation.
     * https://www.nngroup.com/articles/response-times-3-important-limits/
     * https://icons8.com/articles/ui-design-user-interface-illustrations/
     */
    const DEBOUNCE_TIMEOUT = 150;

    /**
     * Define a empty client rect.
     */
    const EMPTY_RECT = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };

    /**
     * Parses strings that use dynamic values
     * Strings should follow this format: "Hello {0}, welcome to {1}"
     * Use for interally supplied text and values only
     *
     * @param {string} text The string to be parsed
     * @param {...string} values the strings to be inserted
     * @returns {string} The original string with the values inserted
     */
    function formatString(text, ...values) {
      return values.reduce((t, value, index) => t?.replaceAll(`{${index}}`, value), text);
    }

    exports.AlignmentMap = AlignmentMap;
    exports.DEBOUNCE_TIMEOUT = DEBOUNCE_TIMEOUT;
    exports.EMPTY_RECT = EMPTY_RECT;
    exports.KeyCodes = KeyCodes;
    exports.LOGO_PLACEHOLDER_DATA_URI = LOGO_PLACEHOLDER_DATA_URI;
    exports.PLACEHOLDER_DATA_URI = PLACEHOLDER_DATA_URI;
    exports.SFDC_DEFAULT = SFDC_DEFAULT;
    exports.VIDEO_PLACEHOLDER_DATA_URI = VIDEO_PLACEHOLDER_DATA_URI;
    exports.and = and;
    exports.apply = apply;
    exports.compose = compose;
    exports.convertClassAttributeToSelector = convertClassAttributeToSelector;
    exports.curry = curry;
    exports.debounce = debounce;
    exports.deepCopy = deepCopy;
    exports.deepMerge = deepMerge;
    exports.empty = empty;
    exports.every = every;
    exports.everyKey = everyKey;
    exports.fieldToValue = fieldToValue;
    exports.filter = filter;
    exports.find = find;
    exports.findFirstFocusable = findFirstFocusable;
    exports.forEach = forEach;
    exports.forEachKey = forEachKey;
    exports.formatString = formatString;
    exports.get = get;
    exports.getify = getify;
    exports.hasOwnProperty = hasOwnProperty;
    exports.hasUri = hasUri;
    exports.ifElse = ifElse;
    exports.ifVal = ifVal;
    exports.isField = isField;
    exports.isFunction = isFunction;
    exports.isNonEmptyString = isNonEmptyString;
    exports.isNumber = isNumber;
    exports.isPrimitive = isPrimitive;
    exports.isString = isString;
    exports.map = map;
    exports.mapObject = mapObject;
    exports.mapping = mapping;
    exports.mergeUniqueRecords = mergeUniqueRecords;
    exports.nextFrame = nextFrame;
    exports.notEmpty = notEmpty;
    exports.or = or;
    exports.parseUnit = parseUnit;
    exports.pipe = pipe;
    exports.prependFormFactor = prependFormFactor;
    exports.propertySet = propertySet;
    exports.querySelectorAll = querySelectorAll;
    exports.range = range;
    exports.safeCssUrl = safeCssUrl;
    exports.safeFieldValue = safeFieldValue;
    exports.safeImageSrc = safeImageSrc;
    exports.safeParseJson = safeParseJson;
    exports.set = set;
    exports.split = split;
    exports.splitStringToObj = splitStringToObj;
    exports.splitUrl = splitUrl;
    exports.stringify = stringify;
    exports.timeout = timeout;
    exports.toCapitalized = toCapitalized;
    exports.toCssUrl = toCssUrl;
    exports.toIndexes = toIndexes;
    exports.tryCatch = tryCatch;
    exports.typeOf = typeOf;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/utilsInternal', ['exports'], (function (exports) {

  const objToString = Object.prototype.toString;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const funcToString = Function.prototype.toString;
  const objectCtorString = funcToString.call(Object);
  const isInteger = value => {
    return Number.isInteger ? Number.isInteger(value) : typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };
  function isFunction(val) {
    return typeof val === 'function';
  }
  function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
  }
  function isPromiseLike(val) {
    return isObjectLike(val) && typeof val.then === 'function';
  }
  function isObject(value) {
    return isFunction(value) || isObjectLike(value);
  }
  function getObjectTag(v) {
    return objToString.call(v);
  }
  function isObjectByTag(v) {
    return getObjectTag(v) === '[object Object]';
  }
  function isPlainObject(value) {
    if (!isObjectLike(value) || !isObjectByTag(value)) {
      return false;
    }
    const proto = Object.getPrototypeOf(Object(value));
    if (proto === null) {
      return true;
    }
    const ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return isFunction(ctor) && ctor instanceof ctor && funcToString.call(ctor) === objectCtorString;
  }
  function isNil(value) {
    return value == null;
  }
  function isBlank(value) {
    return isNil(value) || typeof value !== 'string' || value.trim().length === 0;
  }
  function empty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    const type = typeof value;
    switch (type) {
      case 'string':
        return value.toString() === '';
      case 'boolean':
      case 'number':
      case 'function':
        return false;
      case 'object':
        return Object.keys(value ?? {}).length === 0;
      default:
        return value == null;
    }
  }

  const rootRef$1 = '#REF:$';
  function defaultCompareFn(a, b) {
    return a.localeCompare(b);
  }
  function baseDeepSort(value, compareFn, stack, errors, path = rootRef$1) {
    if (!isObjectLike(value)) {
      return value;
    }
    const obj = value;
    if (stack.has(obj)) {
      return value;
    }
    stack.set(obj, path);
    if (Array.isArray(obj)) {
      return obj.map((item, idx) => {
        const childPath = `${path}[${String(idx)}]`;
        return baseDeepSort(item, compareFn, stack, errors, childPath);
      });
    }
    if (isPlainObject(value)) {
      return Object.keys(value).sort(compareFn).reduce((acc, key) => {
        const childPath = `${path}.${key}`;
        acc[key] = baseDeepSort(value[key], compareFn, stack, errors, childPath);
        return acc;
      }, {});
    }
    {
      const message = `unsupported type '${getObjectTag(obj)}' found at '${path}'`;
      errors.push(new Error(message));
    }
    return value;
  }
  function deepSort(value, comparator) {
    const stack = new WeakMap();
    const errors = [];
    const sortedValue = baseDeepSort(value, isFunction(comparator) ? comparator : defaultCompareFn, stack, errors);
    const result = Object.create(null);
    Object.defineProperty(result, 'value', {
      enumerable: true,
      value: sortedValue
    });
    Object.defineProperty(result, 'errors', {
      enumerable: true,
      value: errors
    });
    return result;
  }

  function baseDeepFreeze(value, errors = [], ref = '#REF:$') {
    if (isObjectLike(value) && !Object.isFrozen(value)) {
      const obj = value;
      if ((typeof window === 'undefined' || "development" !== 'production') && !isPlainObject(obj) && !Array.isArray(obj)) {
        const message = `unsupported type '${getObjectTag(obj)}' found at '${ref}'`;
        errors.push(new Error(message));
      }
      Object.freeze(obj);
      for (const key of Object.keys(obj)) {
        baseDeepFreeze(obj[key], errors, `${ref}.${key}`);
      }
    }
    const result = Object.create(null);
    Object.defineProperty(result, 'value', {
      enumerable: true,
      value
    });
    Object.defineProperty(result, 'errors', {
      enumerable: true,
      value: errors
    });
    return result;
  }
  function deepFreeze(value) {
    return baseDeepFreeze(value);
  }

  const cache = new WeakSet();
  function redefineProperty(target, key) {
    try {
      const value = Reflect.get(target, key);
      Reflect.defineProperty(target, key, {
        enumerable: true,
        get() {
          return typeof value === 'object' && value !== null ? readonly(value) : value;
        }
      });
    } catch {
      // Intentionally empty
    }
  }
  function readonly(target) {
    if (typeof target !== 'object' || target === null || cache.has(target)) {
      return target;
    }
    cache.add(target);
    if (Object.isFrozen(target)) {
      const shallowClone = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
      for (const [key, value] of Object.entries(target)) {
        Reflect.set(shallowClone, key, typeof value === 'object' && value !== null ? readonly(value) : value);
      }
      return Object.freeze(shallowClone);
    }
    for (const key of Object.keys(target)) {
      redefineProperty(target, key);
    }
    return Object.freeze(target);
  }

  function get(obj, path, defaultValue) {
    const travel = regexp => String.prototype.split.call(path, regexp).filter(Boolean).reduce((res, key) => res !== null && res !== undefined ? res[key] : res, obj);
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
  }

  function circularRefReplacer() {
    const errors = [];
    const pathsUndefined = [];
    const stack = new WeakMap();
    const rootRef = '#REF:$';
    const undefRef = '#REF:undefined';
    function replacer(key, value) {
      const keyString = String(key);
      const parentPath = stack.get(this);
      const path = parentPath ? parentPath + (Array.isArray(this) ? `[${keyString}]` : '.' + keyString) : Array.isArray(this) ? `[${keyString}]` : keyString;
      if (!isObjectLike(value) || value !== Object(value)) {
        if (typeof value === 'undefined') {
          pathsUndefined.push(path);
          return undefRef;
        }
        return value;
      }
      const obj = value;
      if (stack.has(obj)) {
        const ref = stack.get(obj);
        return ref ? `${rootRef}${ref[0] === '[' ? '' : '.'}${ref}` : rootRef;
      }
      {
        if (!isPlainObject(obj) && !Array.isArray(obj)) {
          const currentRef = path ? `${rootRef}${path[0] === '[' ? '' : '.'}${path}` : rootRef;
          const message = `unsupported type '${getObjectTag(obj)}' found at '${currentRef}'`;
          errors.push(new Error(message));
        }
      }
      stack.set(obj, path);
      return obj;
    }
    replacer.errors = () => errors;
    replacer.pathsUndefined = () => pathsUndefined;
    return replacer;
  }
  function circularRefReviver() {
    const circular = new Map();
    const rootRef = '#REF:$';
    const undefRef = '#REF:undefined';
    function decycle(cyclicRef, rootValue) {
      const matches = circular.get(cyclicRef);
      let ref = cyclicRef.substring(rootRef.length);
      ref.indexOf('.') === 0 && (ref = ref.substring(1));
      const cyclicValue = ref ? get(rootValue, ref) : rootValue;
      for (const match of matches) {
        match.value[match.key] = cyclicValue;
      }
      circular.delete(cyclicRef);
    }
    return function reviver(key, value) {
      if (typeof value === 'string' && value.indexOf(rootRef) === 0) {
        if (!circular.has(value)) {
          circular.set(value, []);
        }
        circular.get(value).push({
          value: this,
          key
        });
        return value;
      }
      if (!isObjectLike(value) || value !== Object(value)) {
        return typeof value === 'string' && value === undefRef ? undefined : value;
      }
      if (key === '') {
        const rootValue = this[''];
        for (const k of circular.keys()) {
          decycle(k, rootValue);
        }
      }
      return value;
    };
  }
  function deepClone(value) {
    const respond = (v, errors) => {
      const result = Object.create(null);
      Object.defineProperty(result, 'value', {
        enumerable: true,
        value: v
      });
      Object.defineProperty(result, 'errors', {
        enumerable: true,
        value: errors
      });
      return result;
    };
    if (!isObject(value)) {
      return respond(typeof value === 'symbol' ? Symbol.prototype.valueOf.call(value) : value, []);
    }
    const replacer = circularRefReplacer();
    const clone = JSON.parse(JSON.stringify(value, replacer), circularRefReviver());
    const pathsUndefined = replacer.pathsUndefined();
    for (const pathUndefined of pathsUndefined) {
      const tokens = pathUndefined.split('.');
      tokens.reduce((prev, curr) => {
        if (isPlainObject(prev)) {
          !Object.prototype.hasOwnProperty.call(prev, curr) && (prev[curr] = undefined);
          return prev[curr];
        }
        return undefined;
      }, clone);
    }
    return respond(clone, replacer.errors());
  }

  const rootRef = '#REF:$';
  function baseDeepEqual(a, b, stack, errors, path = rootRef) {
    if (a === b) {
      return true;
    }
    if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
      return a !== a && b !== b;
    }
    if (stack.has(a)) {
      return stack.get(a) === b;
    }
    stack.set(a, b);
    if (Array.isArray(a)) {
      const length = a.length;
      if (!Array.isArray(b) || length !== b.length) {
        return false;
      }
      for (let i = length; i-- !== 0;) {
        const childPath = `${path}[${String(i)}]`;
        if (!baseDeepEqual(a.at(i), b.at(i), stack, errors, childPath)) {
          return false;
        }
      }
      return true;
    } else if (isPlainObject(a)) {
      const keys = Reflect.ownKeys(a);
      const length = keys.length;
      if (!isPlainObject(b) || length !== Reflect.ownKeys(b).length) {
        return false;
      }
      for (let i = length; i-- !== 0;) {
        const key = keys.at(i);
        const childPath = `${path}.${String(key)}`;
        if (!Reflect.has(b, key) || !baseDeepEqual(Reflect.get(a, key), Reflect.get(b, key), stack, errors, childPath)) {
          return false;
        }
      }
      return true;
    }
    {
      const message = `unsupported type '${getObjectTag(a)}' found at '${path}'`;
      errors.push(new Error(message));
    }
    return false;
  }
  function deepEqual(value1, value2) {
    const stack = new WeakMap();
    const errors = [];
    const value = baseDeepEqual(value1, value2, stack, errors);
    const result = Object.create(null);
    Object.defineProperty(result, 'value', {
      enumerable: true,
      value
    });
    Object.defineProperty(result, 'errors', {
      enumerable: true,
      value: errors
    });
    return result;
  }

  function uuidv4Factory() {
    let lastId = 0;
    return () => {
      if (isFunction(crypto?.randomUUID)) {
        return crypto.randomUUID();
      } else if (isFunction(crypto?.getRandomValues)) {
        return [1e7, 1e3, 4e3, 8e3, 1e11].join('-').replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
      }
      return String(++lastId);
    };
  }
  const uuidv4 = uuidv4Factory();
  function uuidValidate(uuid) {
    return typeof uuid === 'string' && /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i.test(uuid);
  }

  const TIMEOUTS = new WeakMap();
  const TIMEOUTS_CHILDREN = new WeakMap();
  const QUEUE_TIMEOUT_EXTENSIONS = new WeakMap();
  function defer() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    return deferred;
  }
  function clearDebounceTimeout(promise) {
    if (TIMEOUTS.has(promise)) {
      clearTimeout(TIMEOUTS.get(promise));
      TIMEOUTS_CHILDREN.has(promise) && clearTimeout(TIMEOUTS_CHILDREN.get(promise));
      TIMEOUTS.delete(promise);
      TIMEOUTS_CHILDREN.delete(promise);
      QUEUE_TIMEOUT_EXTENSIONS.delete(promise);
      return true;
    }
    return false;
  }
  function extendDebouncedTimeout(promise, wait = 0) {
    if (TIMEOUTS.has(promise)) {
      QUEUE_TIMEOUT_EXTENSIONS.set(promise, wait);
      return true;
    }
    return false;
  }
  function debounce(fn, wait = 0) {
    let deferred;
    let timeoutId;
    let pendingArgs = [];
    function flush() {
      const {
        promise,
        resolve,
        reject
      } = deferred;
      if (QUEUE_TIMEOUT_EXTENSIONS.has(promise)) {
        const childTimeoutId = setTimeout(flush.bind(this), QUEUE_TIMEOUT_EXTENSIONS.get(promise));
        TIMEOUTS_CHILDREN.set(promise, childTimeoutId);
        QUEUE_TIMEOUT_EXTENSIONS.delete(promise);
        return;
      }
      const currentArgs = pendingArgs;
      timeoutId = undefined;
      pendingArgs = [];
      try {
        const result = fn.apply(this, currentArgs[currentArgs.length - 1]);
        Promise.resolve(result).then(resolve, reject).finally(() => {
          deferred = undefined;
          TIMEOUTS.delete(promise);
          TIMEOUTS_CHILDREN.delete(promise);
          QUEUE_TIMEOUT_EXTENSIONS.delete(promise);
        });
      } catch (e) {
        reject(e);
      }
    }
    function debounced(...args) {
      if (deferred) {
        clearDebounceTimeout(deferred.promise);
      } else {
        deferred = defer();
      }
      pendingArgs.push(args);
      timeoutId = setTimeout(flush.bind(this), wait);
      const {
        promise
      } = deferred;
      TIMEOUTS.set(promise, timeoutId);
      return promise;
    }
    return debounced;
  }

  const CONDITION = Symbol();
  const PROPERTY_CONTEXT_VALUE = 'value';
  const TRAPS_FORBIDDEN = ['connect', 'disconnect', 'update'];
  function extractCallback(data, property) {
    const value = Reflect.get(data, property);
    const d = {
      ...data
    };
    Reflect.deleteProperty(d, property);
    const cb = typeof value === 'function' || typeof value === 'undefined' ? value : () => Boolean(value);
    return [cb, d];
  }
  function createConditionalAdapter(superclass, trapsOrCallback, callback) {
    const argsLength = arguments.length;
    let effectiveTraps;
    let defaultCallback;
    if (argsLength > 2) {
      if (typeof trapsOrCallback !== 'undefined' && !Array.isArray(trapsOrCallback)) {
        throw new TypeError(`[utils] traps need to be an array; '${typeof trapsOrCallback}' given`);
      }
      if (typeof callback !== 'undefined' && !isFunction(callback)) {
        throw new TypeError(`[utils] callback needs to be a function; '${typeof callback}' given`);
      }
      effectiveTraps = trapsOrCallback;
      defaultCallback = callback;
    } else if (argsLength > 1) {
      const isArray = Array.isArray(trapsOrCallback);
      const isFunc = isFunction(trapsOrCallback);
      if (typeof trapsOrCallback !== 'undefined' && !isArray && !isFunc) {
        throw new TypeError(`[utils] second parameter either needs to define traps via an array, or a callback function; '${typeof trapsOrCallback}' given`);
      }
      effectiveTraps = isArray ? trapsOrCallback : undefined;
      defaultCallback = isFunc ? trapsOrCallback : undefined;
    }
    const callbackSymbol = Symbol();
    const executeCallbackSymbol = Symbol();
    class ConditionalAdapter extends superclass {
      [executeCallbackSymbol](trap) {
        const effectiveCallback = this[callbackSymbol].last ?? this[callbackSymbol].default;
        return effectiveCallback?.(trap, this) ?? true;
      }
      constructor(...args) {
        super(...args);
        this[callbackSymbol] = {
          default: defaultCallback,
          last: defaultCallback
        };
        const instance = this;
        const customTraps = new Set(Array.isArray(effectiveTraps) && effectiveTraps.length > 0 ? effectiveTraps.filter(trap => !TRAPS_FORBIDDEN.includes(trap)) : []);
        for (const trap of customTraps) {
          const originalMethod = Reflect.get(this, trap);
          if (isFunction(originalMethod)) {
            Reflect.defineProperty(this, trap, {
              enumerable: true,
              writable: false,
              configurable: false,
              value: function (..._args) {
                if (instance[executeCallbackSymbol](trap)) {
                  return originalMethod?.apply(this, _args);
                }
              }
            });
          }
        }
      }
      update(config, context) {
        let effectiveConfig;
        let effectiveContext;
        if (Reflect.has(config, CONDITION)) {
          const [cb, effectiveConf] = extractCallback(config, CONDITION);
          effectiveConfig = effectiveConf;
          effectiveContext = context;
          this[callbackSymbol].last = cb;
        } else if (context && Reflect.has(context, PROPERTY_CONTEXT_VALUE)) {
          const [cb, ctx] = extractCallback(context.value, CONDITION);
          effectiveContext = {
            ...context,
            value: ctx
          };
          effectiveConfig = config;
          this[callbackSymbol].last = cb;
        } else {
          this[callbackSymbol].last = undefined;
          effectiveConfig = config;
          effectiveContext = context;
        }
        if (!Array.isArray(effectiveTraps) || Array.isArray(effectiveTraps) && (effectiveTraps.length === 0 || effectiveTraps.includes('update'))) {
          if (this[executeCallbackSymbol]('update')) {
            super.update(effectiveConfig, effectiveContext);
          }
        } else {
          super.update(effectiveConfig, effectiveContext);
        }
      }
      /*LWC compiler v7.1.5*/
    }
    ConditionalAdapter.contextSchema = {
      value: 'required'
    };
    return ConditionalAdapter;
  }

  function baseConvert(digits, sourceBase, destinationBase) {
    let start = 0;
    const result = [];
    const digitsCopy = [...digits];
    while (true) {
      let carry = 0,
        done = true;
      for (let i = start; i < digitsCopy.length; i++) {
        const p = sourceBase * carry + digitsCopy[i];
        digitsCopy[i] = Math.floor(p / destinationBase);
        carry = p % destinationBase;
        if (done) {
          if (!digitsCopy[i]) {
            start = i;
          } else {
            done = false;
          }
        }
      }
      result.unshift(carry);
      if (done) {
        return result;
      }
    }
  }

  const CHAR_TO_VALUE = '0123456789abcdefghijklmnopqrstuvwxyz';
  const VALUE_TO_CHAR = [...CHAR_TO_VALUE].reduce((acc, value, index) => {
    acc[value] = index;
    return acc;
  }, {});
  function base36Encode(str) {
    if (!str) {
      return str;
    }
    return baseConvert(new TextEncoder().encode(str), 256, 36).map(digit => CHAR_TO_VALUE[digit]).join('');
  }
  function base36Decode(str) {
    if (!str) {
      return str;
    }
    const base36Digits = [...str].map(char => {
      const digit = VALUE_TO_CHAR[char];
      if (digit === undefined) {
        throw new TypeError(`Invalid base 36 digit: ${char}`);
      }
      return digit;
    });
    const base256Digits = baseConvert(base36Digits, 36, 256);
    return new TextDecoder().decode(new Uint8Array(base256Digits));
  }

  function getCookie(cookieName) {
    return globalThis.document?.cookie.split(';').map(s => s.trim().split('=')).filter(([name]) => name.startsWith(cookieName)).map(([, value]) => value)[0];
  }

  function dateAdd(date, duration) {
    if (date instanceof Date) {
      const newdate = new Date(date);
      typeof duration?.years === 'number' && newdate.setFullYear(newdate.getFullYear() + duration.years);
      typeof duration?.months === 'number' && newdate.setMonth(newdate.getMonth() + duration.months);
      typeof duration?.days === 'number' && newdate.setDate(newdate.getDate() + duration.days);
      return newdate;
    }
    return undefined;
  }
  function dateSubtract(date, duration) {
    if (date instanceof Date) {
      const newdate = new Date(date);
      typeof duration?.years === 'number' && newdate.setFullYear(newdate.getFullYear() - duration.years);
      typeof duration?.months === 'number' && newdate.setMonth(newdate.getMonth() - duration.months);
      typeof duration?.days === 'number' && newdate.setDate(newdate.getDate() - duration.days);
      return newdate;
    }
    return undefined;
  }

  exports.CONDITION = CONDITION;
  exports.base36Decode = base36Decode;
  exports.base36Encode = base36Encode;
  exports.baseConvert = baseConvert;
  exports.circularRefReplacer = circularRefReplacer;
  exports.circularRefReviver = circularRefReviver;
  exports.clearDebounceTimeout = clearDebounceTimeout;
  exports.createConditionalAdapter = createConditionalAdapter;
  exports.dateAdd = dateAdd;
  exports.dateSubtract = dateSubtract;
  exports.debounce = debounce;
  exports.deepClone = deepClone;
  exports.deepEqual = deepEqual;
  exports.deepFreeze = deepFreeze;
  exports.deepSort = deepSort;
  exports.empty = empty;
  exports.extendDebouncedTimeout = extendDebouncedTimeout;
  exports.get = get;
  exports.getCookie = getCookie;
  exports.getObjectTag = getObjectTag;
  exports.isBlank = isBlank;
  exports.isFunction = isFunction;
  exports.isInteger = isInteger;
  exports.isNil = isNil;
  exports.isObject = isObject;
  exports.isObjectLike = isObjectLike;
  exports.isPlainObject = isPlainObject;
  exports.isPromiseLike = isPromiseLike;
  exports.readonly = readonly;
  exports.uuidValidate = uuidValidate;
  exports.uuidv4 = uuidv4;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/util', ['exports', 'experience/utilsInternal'], (function (exports, utilsInternal) {



	Object.defineProperty(exports, 'CONDITION', {
		enumerable: true,
		get: function () { return utilsInternal.CONDITION; }
	});
	Object.defineProperty(exports, 'base36Decode', {
		enumerable: true,
		get: function () { return utilsInternal.base36Decode; }
	});
	Object.defineProperty(exports, 'base36Encode', {
		enumerable: true,
		get: function () { return utilsInternal.base36Encode; }
	});
	Object.defineProperty(exports, 'baseConvert', {
		enumerable: true,
		get: function () { return utilsInternal.baseConvert; }
	});
	Object.defineProperty(exports, 'circularRefReplacer', {
		enumerable: true,
		get: function () { return utilsInternal.circularRefReplacer; }
	});
	Object.defineProperty(exports, 'circularRefReviver', {
		enumerable: true,
		get: function () { return utilsInternal.circularRefReviver; }
	});
	Object.defineProperty(exports, 'clearDebounceTimeout', {
		enumerable: true,
		get: function () { return utilsInternal.clearDebounceTimeout; }
	});
	Object.defineProperty(exports, 'createConditionalAdapter', {
		enumerable: true,
		get: function () { return utilsInternal.createConditionalAdapter; }
	});
	Object.defineProperty(exports, 'debounce', {
		enumerable: true,
		get: function () { return utilsInternal.debounce; }
	});
	Object.defineProperty(exports, 'deepClone', {
		enumerable: true,
		get: function () { return utilsInternal.deepClone; }
	});
	Object.defineProperty(exports, 'deepEqual', {
		enumerable: true,
		get: function () { return utilsInternal.deepEqual; }
	});
	Object.defineProperty(exports, 'deepFreeze', {
		enumerable: true,
		get: function () { return utilsInternal.deepFreeze; }
	});
	Object.defineProperty(exports, 'deepSort', {
		enumerable: true,
		get: function () { return utilsInternal.deepSort; }
	});
	Object.defineProperty(exports, 'extendDebouncedTimeout', {
		enumerable: true,
		get: function () { return utilsInternal.extendDebouncedTimeout; }
	});
	Object.defineProperty(exports, 'get', {
		enumerable: true,
		get: function () { return utilsInternal.get; }
	});
	Object.defineProperty(exports, 'getObjectTag', {
		enumerable: true,
		get: function () { return utilsInternal.getObjectTag; }
	});
	Object.defineProperty(exports, 'isBlank', {
		enumerable: true,
		get: function () { return utilsInternal.isBlank; }
	});
	Object.defineProperty(exports, 'isFunction', {
		enumerable: true,
		get: function () { return utilsInternal.isFunction; }
	});
	Object.defineProperty(exports, 'isInteger', {
		enumerable: true,
		get: function () { return utilsInternal.isInteger; }
	});
	Object.defineProperty(exports, 'isNil', {
		enumerable: true,
		get: function () { return utilsInternal.isNil; }
	});
	Object.defineProperty(exports, 'isObject', {
		enumerable: true,
		get: function () { return utilsInternal.isObject; }
	});
	Object.defineProperty(exports, 'isObjectLike', {
		enumerable: true,
		get: function () { return utilsInternal.isObjectLike; }
	});
	Object.defineProperty(exports, 'isPlainObject', {
		enumerable: true,
		get: function () { return utilsInternal.isPlainObject; }
	});
	Object.defineProperty(exports, 'isPromiseLike', {
		enumerable: true,
		get: function () { return utilsInternal.isPromiseLike; }
	});
	Object.defineProperty(exports, 'uuidValidate', {
		enumerable: true,
		get: function () { return utilsInternal.uuidValidate; }
	});
	Object.defineProperty(exports, 'uuidv4', {
		enumerable: true,
		get: function () { return utilsInternal.uuidv4; }
	});

	Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_util/validator', ['exports'], (function (exports) {

    /**
     * This is a more strict validator which could be used to validate
     * if the input is a "resource" link like Image/Video.
     * An input is a valid URL if it matches ANY of these rules:
     * 1. Starts with "https://"
     * 2. Starts with "/" followed by at least one character
     *
     * @param {string} url the input url
     * @returns {boolean} whether the url is valid
     */
    function isValidURL(url) {
      const regex = /(^([hH][tT][tT][pP][sS]):\/\/.*)|(^\/.+)/;
      return regex.test(url);
    }

    /**
     * This validator is more relaxed and could be used for any validating any link.
     * Eg you could use this for validating button links
     * An input is a valid link if it matches ANY of these rules:
     * 1. Starts with "https://"
     * 2. Starts with "/"
     * 3. Starts with "#"
     *
     * @param {string} link the input link
     * @returns {boolean} whether the link is valid
     */
    function isValidLink(link) {
      const regex = /(^([hH][tT][tT][pP][sS]):\/\/.*)|(^\/.*)|(^[#].*)/;
      return regex.test(link);
    }

    /**
     * Determines if a url is relative or not
     *
     * @param {string} url the url to determine if it is relative or not
     * @returns {boolean} true if the url is relative; false otherwise
     */
    function isRelativeURL(url) {
      const regex = /^\/(?!\/)/;
      return regex.test(url);
    }

    /**
     * Check if given string is data uri prefixed.
     *
     * @param {string} url source url
     * @returns {boolean} whether url is data uir prefixed
     */
    function isDataUri(url) {
      return url?.startsWith("data:image");
    }

    /**
     * Check if given string is shortcut uri (mailto: or tel:)
     *
     * @param {string} uri source url
     * @returns {boolean} whether url is absolute
     * @example
     *      isShortcutUri('mailto:help@example.com'); // true
     *      isShortcutUri('tel://EXAMPLE.COM'); // true
     */
    function isShortcutUri(uri) {
      const regex = new RegExp("^(mailto|tel):", "i");
      return regex.test(uri);
    }

    exports.isDataUri = isDataUri;
    exports.isRelativeURL = isRelativeURL;
    exports.isShortcutUri = isShortcutUri;
    exports.isValidLink = isValidLink;
    exports.isValidURL = isValidURL;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_util/normalizer', ['exports'], (function (exports) {

    /**
     * A boolean normalization utility for attributes.
     *
     * @param {object} value - The value to normalize.
     * @returns {boolean} - The normalized value.
     */
    function normalizeBoolean(value) {
      return typeof value === "string" || !!value;
    }

    /**
     * A string normalization utility for attributes.
     *
     * @param {string} value - The value to normalize.
     * @param {object} config - The optional configuration object.
     * @param {string} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
     * @param {Array} [config.caseSensitive] - Whether it's caseSensitive comparing.
     * @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
     * @returns {string} - The normalized value.
     */
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = "",
        validValues,
        caseSensitive = false
      } = config;
      let normalized = typeof value === "string" && value.trim() || "";
      if (!caseSensitive) {
        normalized = normalized.toLowerCase();
      }
      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }
      return normalized;
    }

    /**
     * Normalize given string to size option
     *
     * @param {string} value string value
     * @returns {string} normalized size value
     */
    function normalizeSize(value) {
      return normalizeString(value, {
        fallbackValue: "small",
        validValues: ["small", "medium", "large"]
      });
    }

    /**
     * Normalize given string to alignment option
     *
     * @param {string} value string value
     * @returns {string} normalized alignment value
     */
    function normalizeAlignment(value) {
      return normalizeString(value, {
        fallbackValue: "left",
        validValues: ["left", "center", "right"]
      });
    }

    /**
     * Normalize given string to order (ltr or rtl)
     *
     * @param {string} value string value
     * @returns {string} normalized alignment value
     */
    function normalizeDirection(value) {
      return normalizeString(value, {
        fallbackValue: "left",
        validValues: ["left", "right"]
      });
    }
    const ACTION_TYPE = {
      SHOW_INLINE_MESSAGE: "inline",
      REDIRECT_TO_EXISTING_PAGE: "redirect"
    };

    /**
     * Normalize given string to action option
     *
     * @param {string} value string value
     * @returns {string} normalized action value
     */
    function normalizeAction(value) {
      return normalizeString(value, {
        caseSensitive: true,
        fallbackValue: ACTION_TYPE.SHOW_INLINE_MESSAGE,
        validValues: [ACTION_TYPE.SHOW_INLINE_MESSAGE, ACTION_TYPE.REDIRECT_TO_EXISTING_PAGE]
      });
    }

    const COLUMN_PORTION_MAP = Object.freeze({
      "50%": {
        left: 1,
        right: 1
      },
      "16.67%": {
        left: 1,
        right: 5
      },
      "33.33%": {
        left: 1,
        right: 2
      },
      "66.67%": {
        left: 2,
        right: 1
      }
    });
    const COLUMN_PORTION_OPTIONS = Object.keys(COLUMN_PORTION_MAP);
    const DEFAULT_COLUMN_PORTION = COLUMN_PORTION_OPTIONS[0];

    /**
     * Normalize portion options
     *
     * @param {string} value value to normalize
     * @returns {string} accepted value
     */
    function normalizePortion(value) {
      return normalizeString(value, {
        fallbackValue: DEFAULT_COLUMN_PORTION,
        validValues: COLUMN_PORTION_OPTIONS
      });
    }

    exports.ACTION_TYPE = ACTION_TYPE;
    exports.COLUMN_PORTION_MAP = COLUMN_PORTION_MAP;
    exports.COLUMN_PORTION_OPTIONS = COLUMN_PORTION_OPTIONS;
    exports.DEFAULT_COLUMN_PORTION = DEFAULT_COLUMN_PORTION;
    exports.normalizeAction = normalizeAction;
    exports.normalizeAlignment = normalizeAlignment;
    exports.normalizeBoolean = normalizeBoolean;
    exports.normalizeDirection = normalizeDirection;
    exports.normalizePortion = normalizePortion;
    exports.normalizeSize = normalizeSize;
    exports.normalizeString = normalizeString;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_util/linkInfo', ['exports', 'dxp_util/common', 'dxp_util/normalizer', 'dxp_util/validator'], (function (exports, common, normalizer, validator) {

    const LinkType = Object.freeze({
      WEB_PAGE: "standard__webPage",
      CMS_PAGE: "standard__managedContentPage",
      RECORD_PAGE: "standard__recordPage",
      NAMED_PAGE: "comm__namedPage",
      RELATION_PAGE: "standard__recordRelationshipPage",
      OBJECT_PAGE: "standard__objectPage",
      SEARCH_PAGE: "standard__search"
    });
    const Knowledge_OBJECT_PREFIX = "__kav";
    const NetworkDataCategory_OBJECT_API_NAME = "NetworkDataCategory";

    /**
     * Check if given value is a valid link
     *
     * @param {string} value uri to check
     * @returns {boolean} true if valid
     */
    const isValidURL = common.or(validator.isValidLink, validator.isShortcutUri);

    /**
     * A Validator Map Data Representation
     *
     * @typedef {object} PageReferenceValidatorMap
     *
     * @property {object} valid ke/value defintion, key is target attribute, value is a array of  validator functions
     */

    const PageReferenceValidatorMap = Object.freeze({
      [LinkType.NAMED_PAGE]: {
        valid: {
          "attributes.name": [common.notEmpty]
        }
      },
      [LinkType.OBJECT_PAGE]: {
        valid: {
          "attributes.objectApiName": [common.notEmpty],
          "state.filterName": [common.notEmpty]
        }
      },
      [LinkType.RECORD_PAGE]: {
        // Record Route only require objectApiName and recordId, recordName is optional
        valid: {
          "attributes.objectApiName": [common.notEmpty],
          "attributes.recordId": [common.notEmpty]
        },
        validKnowledge: {
          "attributes.objectApiName": [common.notEmpty],
          "attributes.urlName": [common.notEmpty]
        },
        validNetworkDataCategory: {
          "attributes.objectApiName": [common.notEmpty],
          "attributes.urlPath": [common.notEmpty]
        }
      },
      [LinkType.RELATION_PAGE]: {
        valid: {
          "attributes.objectApiName": [common.notEmpty],
          "attributes.recordId": [common.notEmpty],
          "attributes.relationshipApiName": [common.notEmpty]
        },
        validKnowledge: {
          "attributes.urlName": [common.notEmpty],
          "attributes.relationshipApiName": [common.notEmpty]
        }
      },
      [LinkType.CMS_PAGE]: {
        valid: {
          "attributes.contentTypeName": [common.notEmpty],
          "attributes.contentKey": [common.notEmpty]
        }
      },
      [LinkType.SEARCH_PAGE]: {},
      [LinkType.WEB_PAGE]: {
        valid: {
          "attributes.url": [isValidURL]
        }
      }
    });

    const DEFAULT_LINK_TYPE = LinkType.WEB_PAGE;

    /**
     * Fixed version for linkinfo
     */
    const VERSION_TAG = "linkInfo";

    /**
     * A Link Info representation
     *
     * @typedef {object} LinkInfo
     * @property {string} pageReference a standard page reference object
     *
     *      Refer to https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_page_reference_type
     *
     * @example
     *    {
     *        pageReference: {
     *          type: "standard_web_page"
     *          ...
     *        }
     *    }
     */

    /**
     * Versioned Link Info representation
     *
     * @typedef {object} VersionedLinkInfo
     * @property {LinkInfo} linkInfo link info
     */

    const DEFAULT_LINKINFO = {
      pageReference: {
        type: LinkType.WEB_PAGE
      }
    };

    /**
     * Convert to versioned link info
     *
     * @param {LinkInfo} linkInfo link info
     * @returns {VersionedLinkInfo} versioned link info
     */
    function toVersioned(linkInfo) {
      return {
        [VERSION_TAG]: linkInfo ?? {}
      };
    }

    /**
     * Convert url to LinkInfo
     *
     * @param {string} url url to be converted
     * @returns {LinkInfo} link info
     */
    function toLinkInfo(url) {
      return {
        pageReference: {
          type: LinkType.WEB_PAGE,
          attributes: {
            url
          }
        }
      };
    }

    /**
     * Normalize link info
     *
     * @param {LinkInfo} linkInfo link info
     * @returns {LinkInfo} normalized link info
     */
    function normalizeLinkInfo(linkInfo) {
      const normalizedLinkInfo = {
        ...DEFAULT_LINKINFO,
        ...linkInfo
      };
      return normalizedLinkInfo;
    }

    /**
     * Safely parse versioned link info to link info
     *
     * @param {string} data versioned link info json string
     * @returns {LinkInfo} link info
     */
    function safeToLinkInfo(data) {
      const versioned = common.safeParseJson(data);
      const linkInfo = versioned[VERSION_TAG] ?? versioned;
      return common.notEmpty(linkInfo) ? linkInfo : toLinkInfo(data);
    }
    /**
     * Parse json into link info
     *
     * @param {string} data json data string
     * @returns {LinkInfo} link info
     */
    function parseLinkInfo(data) {
      const linkInfo = safeToLinkInfo(data);
      return normalizeLinkInfo(linkInfo[VERSION_TAG] ?? linkInfo);
    }

    /**
     * Verifies if the given object belongs to Knowledge category or not
     *
     * @param {string} objectApiName objectApiName
     * @param {string} pageType record/object/related
     * @returns {boolean} returns true/false
     */
    function isKnowledgeObject(objectApiName, pageType) {
      if (objectApiName?.includes(Knowledge_OBJECT_PREFIX) && (pageType === LinkType.RECORD_PAGE || pageType === LinkType.RELATION_PAGE)) {
        return true;
      }
      return false;
    }

    /**
     * Verifies if the given object belongs to NetworkDataCategory category or not
     *
     * @param {string} objectApiName objectApiName
     * @param {string} pageType record/object/related
     * @returns {boolean} returns true/false
     */
    function isNetworkDataCategoryObject(objectApiName, pageType) {
      return objectApiName === NetworkDataCategory_OBJECT_API_NAME && pageType === LinkType.RECORD_PAGE;
    }

    const NavigationType = Object.freeze(Object.values(LinkType));
    const toPageReferenceMap = common.compose(normalized => PageReferenceValidatorMap[normalized], normalizePageReferenceType);

    /**
     * Check if given page reference is valid
     *
     * @param {object} pageReference page reference
     * @returns {boolean} true if contain valid url
     */
    function isValidPageReference(pageReference) {
      if (common.empty(pageReference)) {
        return false;
      }
      let validType;
      const objectApiName = pageReference.attributes?.objectApiName;
      const referenceMap = toPageReferenceMap(pageReference.type);

      // Fetch validator map per page reference type, default to web page
      // Also checks if knowledge based object then maps to a different validator.
      if (isKnowledgeObject(objectApiName, pageReference.type)) {
        validType = referenceMap?.validKnowledge;
      } else if (isNetworkDataCategoryObject(objectApiName, pageReference.type)) {
        validType = referenceMap?.validNetworkDataCategory;
      } else {
        validType = referenceMap.valid;
      }

      // Enumerate key from valid object, each key is a attribute path of the pageReference
      // value is a array of validator functions.
      // Return true if all validator functions are passed against the value of
      // the attribute path from pageReference
      const keyIsValidWhenValueIsValid = key => common.compose(common.and.apply(this, validType?.[key]), common.get(pageReference))(key);
      return common.everyKey(key => {
        return keyIsValidWhenValueIsValid(key);
      })(validType ?? {});
    }

    /**
     * Normalize page reference type
     *
     * @param {string} type page reference type
     * @returns {string} normalized type
     */
    function normalizePageReferenceType(type) {
      return normalizer.normalizeString(type, {
        fallbackValue: LinkType.WEB_PAGE,
        validValues: NavigationType,
        caseSensitive: true
      });
    }

    exports.DEFAULT_LINK_TYPE = DEFAULT_LINK_TYPE;
    exports.Knowledge_OBJECT_PREFIX = Knowledge_OBJECT_PREFIX;
    exports.LinkType = LinkType;
    exports.NavigationType = NavigationType;
    exports.NetworkDataCategory_OBJECT_API_NAME = NetworkDataCategory_OBJECT_API_NAME;
    exports.isKnowledgeObject = isKnowledgeObject;
    exports.isNetworkDataCategoryObject = isNetworkDataCategoryObject;
    exports.isValidPageReference = isValidPageReference;
    exports.normalizeLinkInfo = normalizeLinkInfo;
    exports.normalizePageReferenceType = normalizePageReferenceType;
    exports.parseLinkInfo = parseLinkInfo;
    exports.toLinkInfo = toLinkInfo;
    exports.toVersioned = toVersioned;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_base/baseNavigation', ['exports', 'lwc', 'lightning/navigation', 'dxp_util/common', 'dxp_util/linkInfo', 'dxp_util/validator'], (function (exports, lwc, navigation, common, linkInfo, validator) {

    var _tmpl = void 0;

    /**
     * Normalize given url
     *
     * @param {string} url url to be normalized
     * @param {string} fallback fallback url
     * @returns {string} normalized url
     */
    function normalizeLink(url, fallback) {
      return validator.isValidLink(url) ? url : fallback;
    }

    /**
     * Normalize given page reference with type
     *
     * @param {object} pageReference page reference
     * @param {string} type type to be normalized
     * @returns {object} normalized page reference
     */
    function normalizePageReference(pageReference, type) {
      return type !== pageReference?.type ? {
        ...pageReference,
        type
      } : pageReference;
    }

    /**
     * Open url if given url is shortcut url (mailto: or tel:)
     *
     * @param {string} url url to be opened
     * @returns {boolean} true if url is shortcut url
     */
    function openShortcutUri(url) {
      if (validator.isShortcutUri(url)) {
        window.open(url);
        return true;
      }
      return false;
    }

    const Uri = Symbol("uri");
    const Type = Symbol("type");
    const LinkInfo = Symbol("linkInfo");

    /**
     * Base Navigation Component that consume lightning/navigation
     *
     * @class BaseNavigation
     */
    class BaseNavigation extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this[Type] = linkInfo.LinkType.WEB_PAGE;
        this[Uri] = "";
        this._linkInfo = {};
        this.pendingPageReference = void 0;
        this.navContext = void 0;
        this._generatedUrl = void 0;
        this[LinkInfo] = linkInfo.toLinkInfo("");
      }
      /**
       * Type of navigation
       *
       *  @type {string}
       * @memberof BaseNavigation
       */
      get type() {
        return this[Type];
      }
      set type(value) {
        this[Type] = linkInfo.normalizePageReferenceType(value, {
          fallbackValue: linkInfo.DEFAULT_LINK_TYPE,
          validValues: linkInfo.NavigationType
        });
        this.synchronizeLinkInfoWithUrl();
      }

      /**
       * Navigation URI
       *
       * @type {string}
       * @memberof BaseNavigation
       */
      get uri() {
        return this[Uri];
      }
      set uri(value) {
        // Check if we can parse the uri to LinkInfo
        this[LinkInfo] = linkInfo.parseLinkInfo(value);
        // linkInfo has pageReference built-in
        this[Type] = this[LinkInfo]?.pageReference?.type;

        // Store original raw value
        this[Uri] = value;
        this.synchronizeLinkInfoWithUrl();
      }
      /**
       * Gets the navigation context.
       *
       * @param {object} context wired nav context
       */
      wireNavConext(context) {
        this.navContext = context;

        // Navigation maybe requested before the context is wired
        // Check if we need to navigate if a navigation is requested
        if (this.navContext && this.pendingPageReference) {
          // A navigation request is set, so perform the navigation
          const pageReference = this.pendingPageReference;
          this.pendingPageReference = null;
          this.navigateWithPageReference(pageReference);
        }
        this.synchronizeLinkInfoWithUrl();
      }

      /**
       * Navigate to internal uri
       *
       * @param {string} url url for navigation, if not provided, will fallback to this.uri
       */
      navigateTo(url) {
        const {
          pageReference
        } = url ? linkInfo.toLinkInfo(url) : this[LinkInfo];

        // If navigation context is not wired, set the navigation request
        if (!this.navContext) {
          this.pendingPageReference = pageReference;
          return;
        }
        this.navigateWithPageReference(pageReference);
      }

      /**
       * Navigate to pageReference
       *
       * @param {object} pageReference page reference
       */
      navigateWithPageReference(pageReference) {
        // If a link type is provided, override the type
        const newReference = normalizePageReference(pageReference, this[Type]);
        common.ifVal(linkInfo.isValidPageReference(newReference) && !openShortcutUri(newReference.attributes?.url), () => {
          navigation.navigate(this.navContext, newReference);
        });
      }

      /**
       * Synchronize linkInfo with generateUrl method
       */
      async synchronizeLinkInfoWithUrl() {
        const {
          attributes,
          type
        } = this[LinkInfo].pageReference;
        const route = attributes?.url ?? "";
        if (type === linkInfo.LinkType.WEB_PAGE && validator.isShortcutUri(route)) {
          // mailto: or tel: is not supported by generateUrl, can be used directly
          this._generatedUrl = route;
        } else if (this.navContext && linkInfo.isValidPageReference(this[LinkInfo]?.pageReference)) {
          // Generate a URL with given pageReference
          const url = await navigation.generateUrl(this.navContext, common.deepCopy(this[LinkInfo].pageReference));
          this._generatedUrl = normalizeLink(url, "");
        } else {
          this._generatedUrl = normalizeLink(route, "");
        }
      }
      /*LWC compiler v7.1.5*/
    }
    lwc.registerDecorators(BaseNavigation, {
      track: {
        _linkInfo: 1
      },
      wire: {
        wireNavConext: {
          adapter: navigation.NavigationContext,
          method: 1,
          config: function ($cmp) {
            return {};
          }
        }
      },
      fields: ["pendingPageReference", "navContext", "_generatedUrl"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(BaseNavigation, {
      tmpl: _tmpl,
      sel: "dxp_base-base-navigation",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('lwr/environment', ['exports'], (function (exports) {

	const environment = globalThis?.LWR?.env || {};
	const isServer = environment && (environment.SSR === 'true' || environment.SSR === true);
	// The baseBath from the config or set from the request (e.g. /shop)
	const basePath = environment && environment.basePath;
	// The locale set from the request or the defaultLocale from the config (e.g. en-US)
	const locale = environment && environment.locale;
	// Root base path for static assets (e.g. /shop/mobify/bundle/1234/site)
	const assetBasePath = environment && environment.assetBasePath;
	// Base path for UI routing (e.g. /shop/en-US)
	const uiBasePath = environment && environment.uiBasePath;

	exports.assetBasePath = assetBasePath;
	exports.basePath = basePath;
	exports.isServer = isServer;
	exports.locale = locale;
	exports.uiBasePath = uiBasePath;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/picture', ['exports', 'lwc', 'experience/resourceResolver'], (function (exports, lwc, resourceResolver) {

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("." + token) : "";
      var hostSelector = token ? ("." + token + "-host") : "";
      return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: contents;all: inherit;}picture" + shadowSelector + " {all: inherit;}img" + shadowSelector + " {max-height: inherit;width: inherit;object-fit: inherit;}";
      /*LWC compiler v7.1.5*/
    }
    stylesheet.$scoped$ = true;
    var _implicitScopedStylesheets = [stylesheet];

    const $fragment1 = lwc.parseFragment`<source${"a0:media"}${"a0:srcset"}${"a0:sizes"}${3}>`;
    const $fragment2 = lwc.parseFragment`<img${"a0:src"}${"a0:alt"}${"a0:loading"}${"a0:draggable"}${3}>`;
    const stc0 = {
      key: 0
    };
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {k: api_key, sp: api_static_part, st: api_static_fragment, i: api_iterator, f: api_flatten, h: api_element} = $api;
      return [api_element("picture", stc0, api_flatten([api_iterator($cmp.normalizedImages, function (image) {
        return api_static_fragment($fragment1, api_key(2, image.media), [api_static_part(0, {
          attrs: {
            "media": image.media,
            "srcset": image.srcSet,
            "sizes": image.sizes
          }
        }, null)]);
      }), api_static_fragment($fragment2, 4, [api_static_part(0, {
        attrs: {
          "src": $cmp.normalizedUrl,
          "alt": $cmp.alternativeText,
          "loading": $cmp.normalizedLoading,
          "draggable": $cmp.draggable
        }
      }, null)])]))];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-6d0jmdgc6e8";
    tmpl.legacyStylesheetToken = "experience-picture_picture";
    if (_implicitScopedStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    function hasMultipleImageUrls(imageUrls, key) {
      return Object.prototype.hasOwnProperty.call(imageUrls, key);
    }
    function getImageSizesFromCss(el, cssHookName) {
      const styles = el && getComputedStyle(el);
      const hook = cssHookName ?? '--dxp-c-image-width';
      const mobile = Number(styles?.getPropertyValue(`${hook}-mobile`));
      const tablet = Number(styles?.getPropertyValue(`${hook}-tablet`));
      const desktop = Number(styles?.getPropertyValue(`${hook}-desktop`));
      return {
        mobile: mobile && !Number.isNaN(mobile) ? mobile : 0,
        tablet: tablet && !Number.isNaN(tablet) ? tablet : 0,
        desktop: desktop && !Number.isNaN(desktop) ? desktop : 0
      };
    }
    function imageSizesDefined(imageSizes) {
      return imageSizes && Object.values(imageSizes).every(size => size && size !== 0);
    }
    function createImageDataMap(imageUrl, overrides, dpr = [1, 2]) {
      if (!imageUrl || !overrides || !imageSizesDefined(overrides)) {
        return [];
      }
      return Object.entries(overrides).reduce((acc, [key, imageSize]) => {
        const url = hasMultipleImageUrls(imageUrl, key) ? imageUrl[key] : imageUrl;
        acc.push({
          formFactor: key,
          srcSet: dpr.map(value => `${resourceResolver.resolve(url, true, {
        width: imageSize * value
      })} ${value}x`).join(', ')
        });
        return acc;
      }, []);
    }
    const MEDIA_QUERIES = {
      mobile: '(max-width: 47.9375em)',
      tablet: '(max-width: 64em)',
      desktop: '(min-width: 64.0625em)'
    };

    class Picture extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.alternativeText = void 0;
        this.loading = void 0;
        this.url = void 0;
        this.images = void 0;
        this.disableDrag = false;
      }
      get draggable() {
        return !this.disableDrag;
      }
      get normalizedImages() {
        return this.mapImageData(this.images || []);
      }
      get normalizedUrl() {
        return resourceResolver.resolve(this.url || '', true);
      }
      get normalizedLoading() {
        return this.loading ?? 'eager';
      }
      mapImageData(images) {
        return images.map(image => ({
          ...image,
          media: 'formFactor' in image ? MEDIA_QUERIES[image.formFactor] : image.media
        }));
      }
      /*LWC compiler v7.1.5*/
    }
    Picture.renderMode = 'light';
    lwc.registerDecorators(Picture, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        loading: {
          config: 0
        },
        url: {
          config: 0
        },
        images: {
          config: 0
        },
        disableDrag: {
          config: 0
        }
      }
    });
    const __lwc_component_class_internal = lwc.registerComponent(Picture, {
      tmpl: _tmpl,
      sel: "experience-picture",
      apiVersion: 62
    });

    exports.MEDIA_QUERIES = MEDIA_QUERIES;
    exports.createImageDataMap = createImageDataMap;
    exports.default = __lwc_component_class_internal;
    exports.getImageSizesFromCss = getImageSizesFromCss;
    exports.imageSizesDefined = imageSizesDefined;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_content_layout/siteLogo', ['exports', 'lwc', 'experience/picture', 'lwr/environment', 'dxp_base/baseNavigation', 'dxp_util/linkInfo', 'dxp_util/browserProperties', 'experience/util', '@salesforce/label/LwcComponent:dxp_content_layout:header.section_name_logo', 'experience/resourceResolver', 'dxp_util/common'], (function (exports, lwc, _experiencePicture, environment, BaseNavigation, linkInfo, browserProperties, util, ImageAlternativeText, resourceResolver, common) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var _experiencePicture__default = /*#__PURE__*/_interopDefaultCompat(_experiencePicture);
    var BaseNavigation__default = /*#__PURE__*/_interopDefaultCompat(BaseNavigation);
    var ImageAlternativeText__default = /*#__PURE__*/_interopDefaultCompat(ImageAlternativeText);

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("." + token) : "";
      return ".logo-anchor" + shadowSelector + " {display: flex;justify-content: var(--dxp-c-l-alignment, left);}.dxp-content-layout-site-logo" + shadowSelector + " {background-repeat: no-repeat;background-size: contain;width: calc((var(--dxp-c-l-logo-width, 100) * 1px));max-height: 75px;height: auto;max-width: 100%;background-position-y: var(--dxp-c-site-logo-background-position-y);}experience-picture" + shadowSelector + " {height: auto;object-fit: contain;}@media only screen and (min-width: 48em) and (max-width: 64em) {.logo-anchor" + shadowSelector + " {justify-content: var(--dxp-c-m-alignment, left);}.dxp-content-layout-site-logo" + shadowSelector + " {max-height: 45px;width: calc((var(--dxp-c-m-logo-width, 100) * 1px));}}@media only screen and (max-width: 47.9375em) {.logo-anchor" + shadowSelector + " {justify-content: var(--dxp-c-s-alignment, left);}.dxp-content-layout-site-logo" + shadowSelector + " {max-height: 25px;width: calc((var(--dxp-c-s-logo-width, 100) * 1px));}}";
      /*LWC compiler v7.1.5*/
    }
    stylesheet.$scoped$ = true;
    var _implicitScopedStylesheets = [stylesheet];

    const stc0 = {
      "logo-anchor": true
    };
    const stc1 = {
      "dxp-content-layout-site-logo": true
    };
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {b: api_bind, c: api_custom_element, h: api_element} = $api;
      const {_m0} = $ctx;
      return [api_element("a", {
        classMap: stc0,
        attrs: {
          "href": $cmp.url
        },
        key: 0,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.onClick))
        }
      }, [api_element("div", {
        classMap: stc1,
        attrs: {
          "role": "img",
          "aria-label": $cmp.resolvedAltText
        },
        ref: "logo",
        key: 1
      }, [api_custom_element("experience-picture", _experiencePicture__default.default, {
        props: {
          "alternativeText": "",
          "url": $cmp._resolvedImageUrl,
          "images": $cmp.image.images
        },
        key: 2
      })])])];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.renderMode = "light";
    tmpl.hasRefs = true;
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-440ckkrho00";
    tmpl.legacyStylesheetToken = "dxp_content_layout-siteLogo_siteLogo";
    if (_implicitScopedStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    /**
     * @typedef {object} ImageSizes
     * @property {number} mobile The image width on mobile phone devices
     * @property {number} tablet The image width on tablet devices
     * @property {number} desktop The image width on desktop-size devices
     */

    /**
     * @param {(HTMLElement | null)} el A container that holds the image element to extract the sizes from
     * @returns {ImageSizes} An object holding the image sizes for various screen sizes
     */
    function getImageSizes(el) {
      const styles = el && getComputedStyle(el);
      const mobile = Number(styles?.getPropertyValue(CSS_WIDTH_SMALL_VAR));
      const tablet = Number(styles?.getPropertyValue(CSS_WIDTH_MEDIUM_VAR));
      const desktop = Number(styles?.getPropertyValue(CSS_WIDTH_LARGE_VAR));
      return {
        mobile: mobile && !Number.isNaN(mobile) ? mobile : 0,
        tablet: tablet && !Number.isNaN(tablet) ? tablet : 0,
        desktop: desktop && !Number.isNaN(desktop) ? desktop : 0
      };
    }

    /**
     * @param {(HTMLElement | null)} el A container that holds the image element to extract the sizes from
     * @param {ImageSizes} imageSizes An object holding the image sizes for various screen sizes
     */
    function calculateImageSizes(el, imageSizes) {
      if (!_experiencePicture.imageSizesDefined(imageSizes)) {
        const sizes = getImageSizes(el);
        Object.assign(imageSizes, sizes);
      }
    }

    const CSS_LOGO_PATH_VAR = "--dxp-s-site-logo-path";
    const CSS_LOGO_URL_VAR = "--dxp-s-site-logo-url";
    const CSS_MOBILE_LOGO_URL_VAR = "--dxp-s-site-logo-mobile-url";
    const CSS_WIDTH_SMALL_VAR = "--dxp-c-s-logo-width";
    const CSS_WIDTH_MEDIUM_VAR = "--dxp-c-m-logo-width";
    const CSS_WIDTH_LARGE_VAR = "--dxp-c-l-logo-width";

    /**
     * @typedef {object} MouseEvent
     * @property {Function} preventDefault Prevents default event behavior
     */

    /**
     * @typedef {object} ImageInfo
     * @property {string} url The url of the image (external or internal)
     * @property {string} altText The alt text of the image
     */

    /**
     * Generic component for displaying a logo of a site.
     * Clicking on the logo navigates to the home page.
     */
    class SiteLogo extends BaseNavigation__default.default {
      /**
       * Serialized JSON of the image info.
       * `imageUrl` and `altText` properties take precedence over `imageInfo`.
       * This is for backwards compatibility.
       *
       * @type {ImageInfo}
       */
      get imageInfo() {
        return this._imageInfo;
      }
      set imageInfo(value) {
        this._imageInfo = value;
      }

      /**
       * Serialized JSON of the image info for mobile.
       * `imageUrl` and `altText` properties take precedence over `imageInfoMobile`.
       *   This is for backwards compatibility.
       *
       * @type {ImageInfo}
       */
      get imageInfoMobile() {
        return this._imageInfoMobile;
      }
      set imageInfoMobile(value) {
        this._imageInfoMobile = value;
      }

      /**
       * The url of the logo image.
       * If no url is provided the CSS variable `--dxp-s-side-logo-path`
       * will be used instead.
       * This takes priority over `imageInfo`.
       *
       * @type {string}
       */

      get resolvedAltText() {
        const imagInfoAltText = browserProperties.isMobile() ? this._imageInfoMobile?.AltText : this._imageInfo?.AltText;
        return this.altText || imagInfoAltText || ImageAlternativeText__default.default;
      }
      get url() {
        return this._generatedUrl;
      }
      get image() {
        const desktopImageUrl = this._resolvedImageUrl || this._getResolvedImageUrl();
        const imgUrl = {
          desktop: desktopImageUrl,
          tablet: desktopImageUrl,
          mobile: this._imageInfoMobile?.Url || desktopImageUrl
        };
        return {
          url: desktopImageUrl,
          images: _experiencePicture.createImageDataMap(imgUrl, this._imageSizes, [1, 2])
        };
      }
      constructor() {
        super();
        /**
         * A tuple representing image width and height.
         *
         * @typedef {number[]} Cache
         * @property {number} 0 - The width of the image.
         * @property {number} 1 - The height of the image.
         */
        /**
         * Cache for computing image ratios.
         *
         * @type {Map<string, Cache>}
         */
        this._imageDimensionCache = new Map();
        /**
         * @type {ImageInfo | undefined}
         */
        this._imageInfo = void 0;
        /**
         * @type {ImageInfo | undefined}
         */
        this._imageInfoMobile = void 0;
        this._imageSizes = {
          mobile: 0,
          tablet: 0,
          desktop: 0
        };
        /**
         * Site Logo info defined in Branding Set. TODO - This should replace CSS variable CSS_LOGO_PATH_VAR but currently there's a mismatch in the 2 URLs
         * as the page path is not appended to this URL unlike CSS_LOGO_PATH_VAR and logoInfo is wrapped in url() but CSS_LOGO_PATH_VAR is not,
         * e.g. logoInfo = url(/assets/images/logo-alpine-group.svg), CSS_LOGO_PATH_VAR = /b2blwr/assets/images/logo-alpine-group.svg
         * Adding the property here for future. Once there is parity between the URLs or somehow convert logoInfo to CSS_LOGO_PATH_VAR's format,
         * CSS_LOGO_PATH_VAR can be removed. TD - https://gus.lightning.force.com/lightning/r/ADM_Team_Dependency__c/a0nEE000000XlrNYAS/view
         *
         * @type {ImageInfo}
         */
        this.logoInfo = void 0;
        this.imageUrl = void 0;
        /**
         * The alt text of the logo image.
         * This takes priority over `imageInfo`.
         *
         * @type {string}
         */
        this.altText = void 0;
        /**
         * The width of the logo in pixels.
         *
         * @type {number}
         */
        this.logoWidth = void 0;
        /**
         * Whether to use the CSS variable --dxp-s-site-logo-url
         * for the background-image.
         *
         * @type {boolean}
         */
        this.useCssImageUrl = false;
        /**
         * Where the element is aligned in it's container. Possible values are:
         * - left
         * - right
         * - center
         *
         * @type {string}
         */
        this.alignment = void 0;
        /**
         * Whether the component is being rendered in design time or runtime. Used
         * to show placeholder site logo when no valid image URL is specified.
         *
         * @type {boolean}
         */
        this.isBuilderMode = false;
        /**
         * @private
         * @type {number}
         */
        this._imageHeight = void 0;
        /**
         * @private
         * @type {number}
         */
        this._imageWidth = void 0;
        /**
         * @private
         * @type {?string}
         */
        this._resolvedImageUrl = void 0;
        this.uri = JSON.stringify(SiteLogo.HOME_PAGE_REF);
      }
      renderedCallback() {
        /**
         * We have to calculate the image sizes after the component is rendered because the
         * image sizes are defined in CSS variables, and they are not available before.
         * This will add up 1 more render cycle, but will only be calculated once.
         * We should be careful with changing the behavior here.
         */
        calculateImageSizes(this.querySelector(".dxp-content-layout-site-logo"), this._imageSizes);
        this._resolvedImageUrl = this._getResolvedImageUrl();
      }

      /**
       * @param {MouseEvent} event The click event
       * @returns {void}
       */
      onClick(event) {
        event.preventDefault();
        this.navigateTo();
      }
      _getResolvedImageUrl() {
        let imageUrl = "";
        if (environment.isServer) {
          imageUrl = this.imageUrl || this._imageInfo?.Url;
          return resourceResolver.resolve(imageUrl, true);
        }
        if (this.useCssImageUrl) {
          imageUrl = this._getStyleProperty(CSS_LOGO_URL_VAR).replace(/url\("?([^")]+)"?\)/, "$1");
        } else {
          imageUrl = this.imageUrl || this._imageInfo?.Url || this._getStyleProperty(CSS_LOGO_PATH_VAR) || this._getPlaceholderImageUrl();
        }
        return resourceResolver.resolve(imageUrl, true);
      }
      _getPlaceholderImageUrl() {
        return this.isBuilderMode ? common.LOGO_PLACEHOLDER_DATA_URI : "";
      }
      _getStyleProperty(prop, customEl) {
        const element = customEl || this.querySelector(".dxp-content-layout-site-logo");
        if (element) {
          const styles = window.getComputedStyle(element);
          return styles.getPropertyValue(prop);
        }
        return "";
      }
      /*LWC compiler v7.1.5*/
    }
    /**
     * @static
     * @type {object}
     * @readonly
     */
    SiteLogo.HOME_PAGE_REF = util.deepFreeze({
      pageReference: {
        type: linkInfo.LinkType.NAMED_PAGE,
        attributes: {
          name: "Home"
        }
      }
    }).value;
    SiteLogo.renderMode = "light";
    lwc.registerDecorators(SiteLogo, {
      publicProps: {
        logoInfo: {
          config: 0
        },
        imageInfo: {
          config: 3
        },
        imageInfoMobile: {
          config: 3
        },
        imageUrl: {
          config: 0
        },
        altText: {
          config: 0
        },
        logoWidth: {
          config: 0
        },
        useCssImageUrl: {
          config: 0
        },
        alignment: {
          config: 0
        },
        isBuilderMode: {
          config: 0
        }
      },
      track: {
        _imageSizes: 1,
        _imageHeight: 1,
        _imageWidth: 1
      },
      fields: ["_imageDimensionCache", "_imageInfo", "_imageInfoMobile", "_resolvedImageUrl"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(SiteLogo, {
      tmpl: _tmpl,
      sel: "dxp_content_layout-site-logo",
      apiVersion: 62
    });

    exports.CSS_LOGO_PATH_VAR = CSS_LOGO_PATH_VAR;
    exports.CSS_LOGO_URL_VAR = CSS_LOGO_URL_VAR;
    exports.CSS_MOBILE_LOGO_URL_VAR = CSS_MOBILE_LOGO_URL_VAR;
    exports.CSS_WIDTH_LARGE_VAR = CSS_WIDTH_LARGE_VAR;
    exports.CSS_WIDTH_MEDIUM_VAR = CSS_WIDTH_MEDIUM_VAR;
    exports.CSS_WIDTH_SMALL_VAR = CSS_WIDTH_SMALL_VAR;
    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@salesforce/label/CheckEmailLWC.title', ['@view/checkPasswordResetEmail/labels'], m => m[1]);
LWR.define('@salesforce/label/CheckEmailLWC.backToLogin', ['@view/checkPasswordResetEmail/labels'], m => m[2]);
LWR.define('@salesforce/label/CheckEmailLWC.message', ['@view/checkPasswordResetEmail/labels'], m => m[3]);
(function() { LWR.define('lightning/shadowBaseClassPrivate', ['exports', 'lwc'], (function (exports, lwc) {

    const stc0 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      return stc0;
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-758d5qnnql0";
    tmpl.legacyStylesheetToken = "lightning-shadowBaseClassPrivate_shadowBaseClassPrivate";
    lwc.freezeTemplate(tmpl);

    class LightningShadowBaseClass extends lwc.LightningElement {
      connectedCallback() {
        if (!this.template.synthetic) {
          this.setAttribute('data-render-mode', 'shadow');
        }
      }
      /*LWC compiler v7.1.5*/
    }
    const __lwc_component_class_internal = lwc.registerComponent(LightningShadowBaseClass, {
      tmpl: _tmpl,
      sel: "lightning-shadow-base-class-private",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('lightning/sldsCommon', ['exports'], (function (exports) {

  function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
    var shadowSelector = token ? ("[" + token + "]") : "";
    var hostSelector = token ? ("[" + token + "-host]") : "";
    return ["*", shadowSelector, ",", shadowSelector, "::before,", shadowSelector, "::after {box-sizing: border-box;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) h1" + shadowSelector + ",:host([data-render-mode='shadow']) h2" + shadowSelector + ",:host([data-render-mode='shadow']) h3" + shadowSelector + ",:host([data-render-mode='shadow']) h4" + shadowSelector + ",:host([data-render-mode='shadow']) h5" + shadowSelector + ",:host([data-render-mode='shadow']) h6" : hostSelector + "[data-render-mode='shadow'] h1" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] h2" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] h3" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] h4" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] h5" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] h6")), shadowSelector, " {font-weight: var(--sds-s-heading-font-weight, inherit);margin-block-start: var(\n --sds-s-heading-spacing-block-start,\n var(--sds-s-heading-spacing-block)\n );margin-block-end: var(\n --sds-s-heading-spacing-block-end,\n var(--sds-s-heading-spacing-block)\n );font-size: 1em;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) a" : hostSelector + "[data-render-mode='shadow'] a")), shadowSelector, " {color: var(--slds-s-link-color);text-decoration: var(--_slds-g-font-decoration, none);transition: color 0.1s linear;background-color: transparent;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) a:active" + shadowSelector + ",:host([data-render-mode='shadow']) a:hover" : hostSelector + "[data-render-mode='shadow'] a:active" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] a:hover")), shadowSelector, " {outline: 0;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) a:hover" + shadowSelector + ",:host([data-render-mode='shadow']) a:focus" : hostSelector + "[data-render-mode='shadow'] a:hover" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] a:focus")), shadowSelector, " {text-decoration: var(--_slds-g-font-decoration-hover, underline);color: var(\n --slds-g-link-color-hover,\n var(--slds-g-color-brand-base-30, #014486)\n );}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) a:active" : hostSelector + "[data-render-mode='shadow'] a:active")), shadowSelector, " {color: var(\n --slds-g-link-color-active,\n var(--slds-g-color-brand-base-30, #014486)\n );}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) a:focus-visible" : hostSelector + "[data-render-mode='shadow'] a:focus-visible")), shadowSelector, " {outline-color: var(\n --_slds-g-color-outline,\n var(--slds-g-color-brand-base-50, #0176d3)\n );}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) a:focus" : hostSelector + "[data-render-mode='shadow'] a:focus")), shadowSelector, " {box-shadow: var(--_slds-g-shadow);border-color: var(--_slds-g-color-border);border-width: var(--_slds-g-sizing-border);border-style: var(--_slds-g-style-border);outline: var(--_slds-g-font-decoration-hover);}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) a" + shadowSelector + ",:host([data-render-mode='shadow']) button" : hostSelector + "[data-render-mode='shadow'] a" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] button")), shadowSelector, " {cursor: pointer;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) p" : hostSelector + "[data-render-mode='shadow'] p")), shadowSelector, " {margin-block-start: var(\n --sds-s-content-spacing-block-start,\n var(--sds-s-content-spacing-block, 0)\n );margin-block-end: var(\n --sds-s-content-spacing-block-end,\n var(--sds-s-content-spacing-block, 0)\n );margin-inline-start: 0;margin-inline-end: 0;padding-block-start: 0;padding-block-end: 0;padding-inline-start: 0;padding-inline-end: 0;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) ol" + shadowSelector + ",:host([data-render-mode='shadow']) ul" : hostSelector + "[data-render-mode='shadow'] ol" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] ul")), shadowSelector, " {list-style: none;padding: 0;margin-block-start: var(\n --sds-s-content-spacing-block-start,\n var(--sds-s-content-spacing-block)\n );margin-block-end: var(\n --sds-s-content-spacing-block-end,\n var(--sds-s-content-spacing-block)\n );}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) button" + shadowSelector + ",:host([data-render-mode='shadow']) [type='button']" + shadowSelector + ",:host([data-render-mode='shadow']) [type='reset']" + shadowSelector + ",:host([data-render-mode='shadow']) [type='submit']" : hostSelector + "[data-render-mode='shadow'] button" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] [type='button']" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] [type='reset']" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] [type='submit']")), shadowSelector, " {-webkit-appearance: button;appearance: button;cursor: pointer;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) [type='search']" : hostSelector + "[data-render-mode='shadow'] [type='search']")), shadowSelector, " {-webkit-appearance: textfield;outline-offset: -2px;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) [type='search']" + shadowSelector + "::-webkit-search-decoration,:host([data-render-mode='shadow']) [type='search']" + shadowSelector + "::-webkit-search-cancel-button,:host([data-render-mode='shadow']) [type='search']" + shadowSelector + "::-webkit-search-results-button,:host([data-render-mode='shadow']) [type='search']" : hostSelector + "[data-render-mode='shadow'] [type='search']" + shadowSelector + "::-webkit-search-decoration," + hostSelector + "[data-render-mode='shadow'] [type='search']" + shadowSelector + "::-webkit-search-cancel-button," + hostSelector + "[data-render-mode='shadow'] [type='search']" + shadowSelector + "::-webkit-search-results-button," + hostSelector + "[data-render-mode='shadow'] [type='search']")), shadowSelector, "::-webkit-search-results-decoration {display: none;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) select" : hostSelector + "[data-render-mode='shadow'] select")), shadowSelector, " {color: inherit;font: inherit;margin: 0;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) input:focus" + shadowSelector + ",:host([data-render-mode='shadow']) button:focus" + shadowSelector + ",:host([data-render-mode='shadow']) select:focus" + shadowSelector + ",:host([data-render-mode='shadow']) textarea:focus" : hostSelector + "[data-render-mode='shadow'] input:focus" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] button:focus" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] select:focus" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] textarea:focus")), shadowSelector, " {outline-offset: 0;}", shadowSelector, "::-moz-focus-inner {border-style: none;padding: 0;}", shadowSelector, "::-webkit-search-decoration {-webkit-appearance: none;}", shadowSelector, "::-webkit-file-upload-button {-webkit-appearance: button;font: inherit;}:-moz-focusring", shadowSelector, " {outline: 1px dotted ButtonText;}:-moz-ui-invalid", shadowSelector, " {box-shadow: none;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) code" + shadowSelector + ",:host([data-render-mode='shadow']) kbd" + shadowSelector + ",:host([data-render-mode='shadow']) samp" + shadowSelector + ",:host([data-render-mode='shadow']) pre" : hostSelector + "[data-render-mode='shadow'] code" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] kbd" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] samp" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] pre")), shadowSelector, " {font-family: var(\n --sds-g-font-family-monospace,\n Consolas,\n Menlo,\n Monaco,\n Courier,\n monospace,\n monospace\n );font-size: var(--sds-g-font-size-base, 0.875rem, 1rem);}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) img" + shadowSelector + ",:host([data-render-mode='shadow']) [type='image']" : hostSelector + "[data-render-mode='shadow'] img" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] [type='image']")), shadowSelector, " {max-width: 100%;height: auto;border: 0;vertical-align: middle;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) iframe" : hostSelector + "[data-render-mode='shadow'] iframe")), shadowSelector, " {border-style: none;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) svg:not([fill])" : hostSelector + "[data-render-mode='shadow'] svg:not([fill])")), shadowSelector, " {fill: currentColor;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) abbr[title]" : hostSelector + "[data-render-mode='shadow'] abbr[title]")), shadowSelector, " {text-decoration: none;cursor: help;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) table" : hostSelector + "[data-render-mode='shadow'] table")), shadowSelector, " {border-collapse: collapse;border-spacing: 0;border: 0;width: 100%;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) hr" : hostSelector + "[data-render-mode='shadow'] hr")), shadowSelector, " {display: block;margin: var(--sds-g-spacing-6, 2rem, 2rem) 0;border-top: var(--sds-g-sizing-border-1, 1px, 1px) solid\n var(--slds-g-color-border-base-1, #c9c9c9);height: var(--sds-g-sizing-border-1, 1px, 1px);clear: both;box-sizing: content-box;border: 0;padding: 0;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) abbr[title]" : hostSelector + "[data-render-mode='shadow'] abbr[title]")), shadowSelector, " {border-bottom: var(--sds-g-sizing-border-1, 1px, 1px) dotted;text-decoration: none;border: 0;cursor: help;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) caption" + shadowSelector + ",:host([data-render-mode='shadow']) th" + shadowSelector + ",:host([data-render-mode='shadow']) td" : hostSelector + "[data-render-mode='shadow'] caption" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] th" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] td")), shadowSelector, " {text-align: left;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) td" + shadowSelector + ",:host([data-render-mode='shadow']) th" : hostSelector + "[data-render-mode='shadow'] td" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] th")), shadowSelector, " {padding: 0;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) dl" : hostSelector + "[data-render-mode='shadow'] dl")), shadowSelector, " {margin: 0;padding: 0;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) dd" : hostSelector + "[data-render-mode='shadow'] dd")), shadowSelector, " {margin: 0;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) pre" : hostSelector + "[data-render-mode='shadow'] pre")), shadowSelector, " {overflow: auto;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) mark" : hostSelector + "[data-render-mode='shadow'] mark")), shadowSelector, " {background-color: #ff0;color: #000;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) small" : hostSelector + "[data-render-mode='shadow'] small")), shadowSelector, " {font-size: 80%;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) sub" + shadowSelector + ",:host([data-render-mode='shadow']) sup" : hostSelector + "[data-render-mode='shadow'] sub" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] sup")), shadowSelector, " {font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) sup" : hostSelector + "[data-render-mode='shadow'] sup")), shadowSelector, " {top: -0.5em;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) sub" : hostSelector + "[data-render-mode='shadow'] sub")), shadowSelector, " {bottom: -0.25em;}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) b" + shadowSelector + ",:host([data-render-mode='shadow']) strong" + shadowSelector + ",:host([data-render-mode='shadow']) dfn" : hostSelector + "[data-render-mode='shadow'] b" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] strong" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] dfn")), shadowSelector, " {font-weight: var(--sds-g-font-weight-7, 700, 700);}", ((useActualHostSelector ? ":host([data-render-mode='shadow']) b" + shadowSelector + ",:host([data-render-mode='shadow']) strong" : hostSelector + "[data-render-mode='shadow'] b" + shadowSelector + "," + hostSelector + "[data-render-mode='shadow'] strong")), shadowSelector, " {font-weight: var(--sds-g-font-weight-bold, bold, bold);}[data-f6-region].f6-highlight", shadowSelector, " {position: relative;}[data-f6-region].f6-highlight", shadowSelector, "::after {width: 100%;height: 100%;content: '';outline: rgb(94, 158, 214) 3px solid;outline-offset: -3px;position: absolute;top: 0;left: 0;z-index: 9999;}"].join('');
    /*LWC compiler v7.1.5*/
  }
  var sldsCommon = [stylesheet];

  exports.default = sldsCommon;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('lightning/sldsUtilsThemes', ['exports'], (function (exports) {

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("[" + token + "]") : "";
      var hostSelector = token ? ("[" + token + "-host]") : "";
      return ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_default" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_default" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_default" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_default")) + shadowSelector + " {background-color: var(--slds-g-color-neutral-base-100, #fff);color: var(--slds-g-color-neutral-base-10, #181818);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_shade" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_shade" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_shade" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_shade")) + shadowSelector + " {background-color: var(--slds-g-color-neutral-base-95, #f3f3f3);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_inverse" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_inverse" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_inverse" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_inverse")) + shadowSelector + " {color: var(--slds-g-color-neutral-base-100, #fff);background-color: var(--slds-g-color-brand-base-10, #001639);border-color: var(--slds-g-color-brand-base-10, #001639);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_alt-inverse" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_alt-inverse" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_alt-inverse" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_alt-inverse")) + shadowSelector + " {color: var(--slds-g-color-neutral-base-100, #fff);background-color: var(--slds-g-color-brand-base-20, #032d60);border-color: var(--slds-g-color-brand-base-20, #032d60);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_success" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_success" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_success" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_success")) + shadowSelector + " {color: var(--slds-g-color-neutral-base-100, #fff);background-color: var(--slds-g-color-success-base-50, #2e844a);--slds-g-link-color: var(--slds-g-color-neutral-base-100, #fff);--slds-g-link-color-active: var(--slds-g-color-neutral-100-opacity-50, rgb(255 255 255 / 50%));--slds-g-link-color-hover: var(--slds-g-color-neutral-base-100, #fff);--_slds-g-font-decoration: underline;--_slds-g-font-decoration-hover: none;}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_info" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_info" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_info" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_info")) + shadowSelector + " {color: var(--slds-g-color-neutral-base-100, #fff);background-color: var(--slds-g-color-neutral-base-50, #747474);--slds-g-link-color: var(--slds-g-color-neutral-base-100, #fff);--slds-g-link-color-active: var(--slds-g-color-neutral-100-opacity-50, rgb(255 255 255 / 50%));--slds-g-link-color-hover: var(--slds-g-color-neutral-base-100, #fff);--_slds-g-font-decoration: underline;--_slds-g-font-decoration-hover: none;}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_warning" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_warning" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_warning" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_warning")) + shadowSelector + " {background-color: var(--slds-g-color-warning-base-60, #fe9339);color: var(--slds-g-color-neutral-base-10, #181818);--slds-g-link-color: var(--slds-g-color-neutral-base-10, #181818);--slds-g-link-color-active: var(--slds-g-color-neutral-base-30, #514f4d);--slds-g-link-color-hover: var(--slds-g-color-neutral-base-10, #181818);--_slds-g-font-decoration: underline;--_slds-g-font-decoration-hover: none;--_slds-g-shadow: 0 0 3px var(--slds--g-color-neutral-base-30, #514f4d);--_slds-g-style-border: solid;--_slds-g-sizing-border: var(--sds-g-sizing-border-1);--_slds-g-color-border: var(--slds-g-color-neutral-base-30, #514f4d);--_slds-g-color-outline: transparent;}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_warning" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_warning")) + shadowSelector + " " + shadowSelector + "::part(button) {color: var(--slds-g-color-on-warning-1);text-decoration: underline;--slds-c-icon-color-foreground: var(--slds-g-color-on-warning-1);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_warning" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_warning")) + shadowSelector + " ::part(button):hover" + shadowSelector + " {color: color-mix(in oklab, currentColor, transparent 25%);--slds-c-icon-color-foreground: color-mix(in oklab, var(--slds-g-color-on-warning-1), transparent 25%);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_warning" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_warning")) + shadowSelector + " ::part(button):focus" + shadowSelector + " {color: var(--slds-g-color-neutral-base-30, #514f4d);box-shadow: 0 0 3px var(--slds-g-color-neutral-base-30, #514f4d);border: 1px solid var(--slds-g-color-neutral-base-30, #514f4d);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_warning" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_warning")) + shadowSelector + " ::part(button):active" + shadowSelector + " {color: var(--slds-g-color-neutral-base-50, #706e6b);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_warning" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_warning")) + shadowSelector + " " + shadowSelector + "::part(boundary) {--slds-c-icon-color-foreground: var(--slds-g-color-neutral-base-30, #514f4d);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_error" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_error" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_error" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_error")) + shadowSelector + " {color: var(--slds-g-color-neutral-base-100, #fff);background-color: var(--slds-g-color-error-base-40, #ea001e);--slds-g-link-color: var(--slds-g-color-neutral-base-100, #fff);--slds-g-link-color-active: var(--slds-g-color-neutral-100-opacity-50, rgb(255 255 255 / 50%));--slds-g-link-color-hover: var(--slds-g-color-neutral-base-100, #fff);--_slds-g-font-decoration: underline;--_slds-g-font-decoration-hover: none;}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_offline" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_offline" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_offline" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_offline")) + shadowSelector + " {color: var(--slds-g-color-neutral-base-100, #fff);background-color: var(--slds-g-color-neutral-base-30, #444);}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_alert-texture" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_alert-texture" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_alert-texture" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_alert-texture")) + shadowSelector + " {background-image: linear-gradient(45deg, rgb(0 0 0 / 2.5%) 25%, transparent 25%, transparent 50%, rgb(0 0 0 / 2.5%) 50%, rgb(0 0 0 / 2.5%) 75%, transparent 75%, transparent);background-size: 64px 64px;}" + ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"]) .slds-theme_inverse-text" + shadowSelector + ",:host([data-interactive-dialog]) .slds-theme_inverse-text" : hostSelector + "[data-render-mode=\"shadow\"] .slds-theme_inverse-text" + shadowSelector + "," + hostSelector + "[data-interactive-dialog] .slds-theme_inverse-text")) + shadowSelector + " {color: var(--slds-g-color-neutral-base-100, #fff);}";
      /*LWC compiler v7.1.5*/
    }
    var sldsUtilsThemes = [stylesheet];

    exports.default = sldsUtilsThemes;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@salesforce/i18n/locale', [], function() { return "en-US"; });
(function() { LWR.define('lightning/iso8601Utils', ['exports'], (function (exports) {

    // TODO: remove file when migrating off aura
    /*
     * Regex to test a string for an ISO8601 Date. The following formats are matched.
     *
     *  YYYY
     *  YYYY-MM
     *  YYYY-MM-DD
     *  YYYY-MM-DDThh:mmTZD
     *  YYYY-MM-DDThh:mm:ssTZD
     *  YYYY-MM-DDThh:mm:ss.STZD
     *
     *
     * @see: https://www.w3.org/TR/NOTE-datetime
     */
    const ISO8601_STRICT_PATTERN = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d[:]?\d\d)|Z)?)?)?)?$/i;

    /* Regex to test a string for an ISO8601 partial time or full time:
     * hh:mm
     * hh:mm:ss
     * hh:mm:ss.S
     * full time = partial time + TZD
     */
    const ISO8601_TIME_PATTERN = /^\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d[:]?\d\d)|Z)?$/i;
    const STANDARD_TIME_FORMAT = 'HH:mm:ss.SSS';
    const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
    const TIME_SEPARATOR = 'T';
    const TIMEZONE_INDICATOR = /(Z|([+-])(\d{2})[:]?(\d{2}))$/i;
    function isValidISODateTimeString(dateTimeString) {
      return isValidISO8601String(dateTimeString) && isValidDate(dateTimeString);
    }
    function isValidISOTimeString(timeString) {
      if (!isValidISO8601TimeString(timeString)) {
        return false;
      }
      const timeOnly = removeTimeZoneSuffix(timeString);
      return isValidDate(`2018-09-09T${timeOnly}Z`);
    }
    function removeTimeZoneSuffix(dateTimeString) {
      if (typeof dateTimeString === 'string') {
        return dateTimeString.split(TIMEZONE_INDICATOR)[0];
      }
      return dateTimeString;
    }

    /**
     * Ensures that any valid ISO string with a milliseconds
     * component has exactly three digits
     *
     * @param {any} dateTimeString
     * @returns {any}
     */
    function padMilliseconds(dateTimeString) {
      if (typeof dateTimeString === 'string' && (isValidDate(dateTimeString) || isValidISOTimeString(dateTimeString))) {
        const millisecondIndex = dateTimeString.indexOf('.');
        let timezoneIndex = dateTimeString.search(TIMEZONE_INDICATOR);
        if (timezoneIndex === -1) {
          timezoneIndex = dateTimeString.length;
        }
        // if milliseconds present, make sure exactly 3 digits present
        if (millisecondIndex !== -1) {
          const milliseconds = dateTimeString.substring(millisecondIndex + 1, timezoneIndex);
          let newMilliseconds = milliseconds;
          if (milliseconds.length > 3) {
            // if more than 3 digits, cut to three digits
            newMilliseconds = newMilliseconds.substring(0, 3);
          } else if (milliseconds.length < 3) {
            // if less than 3 digits, add zeros to make it 3 digits
            const extraZeros = '0'.repeat(3 - milliseconds.length);
            newMilliseconds = `${newMilliseconds}${extraZeros}`;
          }
          // replace old milliseconds with new 3 digit milliseconds
          const start = dateTimeString.substring(0, millisecondIndex);
          const end = dateTimeString.substring(timezoneIndex);
          return `${start}.${newMilliseconds}${end}`;
        }
      }
      return dateTimeString;
    }
    function isValidISO8601String(dateTimeString) {
      if (typeof dateTimeString !== 'string') {
        return false;
      }
      return ISO8601_STRICT_PATTERN.test(dateTimeString);
    }
    function isValidISO8601TimeString(timeString) {
      if (typeof timeString !== 'string') {
        return false;
      }
      return ISO8601_TIME_PATTERN.test(timeString);
    }
    function isValidDate(value) {
      // Date.parse returns NaN if the argument doesn't represent a valid date
      const timeStamp = Date.parse(value);
      return isFinite(timeStamp);
    }

    exports.STANDARD_DATE_FORMAT = STANDARD_DATE_FORMAT;
    exports.STANDARD_TIME_FORMAT = STANDARD_TIME_FORMAT;
    exports.TIME_SEPARATOR = TIME_SEPARATOR;
    exports.isValidISODateTimeString = isValidISODateTimeString;
    exports.isValidISOTimeString = isValidISOTimeString;
    exports.padMilliseconds = padMilliseconds;
    exports.removeTimeZoneSuffix = removeTimeZoneSuffix;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('lightning/utilsPrivate', ['exports', '@salesforce/client/formFactor', '@salesforce/i18n/locale', 'lightning/iso8601Utils', 'lwc'], (function (exports, formFactor, locale, iso8601Utils, lwc) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var formFactor__default = /*#__PURE__*/_interopDefaultCompat(formFactor);
    var locale__default = /*#__PURE__*/_interopDefaultCompat(locale);

    /**
     * Determine if environment is CSR or SSR
     */
    const isCSR = typeof window !== 'undefined';

    function assert(condition, message) {
      {
        if (!condition) {
          throw new Error(message);
        }
      }
    }

    /* All Valid Aria Attributes, in camel case
     * - it's better to start from camel-case
     *   because `aria-${_.kebabCase('describedBy')}` => 'aria-described-by' (NOT aria property)
     * - correct aria property: 'aria-describedby'
     *  https://www.w3.org/TR/wai-aria/
     */
    const ARIA_PROP_LIST = ['activeDescendant', 'atomic', 'autoComplete', 'busy', 'checked', 'colCount', 'colIndex', 'colSpan', 'controls', 'current', 'describedAt', 'describedBy', 'description', 'details', 'disabled', 'dropEffect', 'errorMessage', 'expanded', 'flowTo', 'grabbed', 'hasPopup', 'hidden', 'invalid', 'keyShortcuts', 'label', 'labelledBy', 'level', 'live', 'modal', 'multiLine', 'multiSelectable', 'orientation', 'owns', 'placeholder', 'posInSet', 'pressed', 'readOnly', 'relevant', 'required', 'roleDescription', 'rowCount', 'rowIndex', 'rowSpan', 'selected', 'setSize', 'sort', 'valueMax', 'valueMin', 'valueNow', 'valueText'];

    /**
     * Generate an ARIA lookup object when passing in a list of ARIA values
     * @param {Array} list A list of ARIA properties (array of strings)
     * @param {String} type A type which defaults to output ARIA properties as modified kebab-case, or camel-case
     * @example 'valueMax' string becomes: { VALUEMAX: 'aria-valuemax' }
     * @returns {Object} A lookup object for ARIA properties in (modified) kebab-case or camel-case
     */
    const getAriaLookup = (list, type = 'default') => {
      const length = list ? list.length : 0;
      if (length === 0) {
        throw new Error('List of aria properties is required');
      }
      const lookupObj = {};
      if (type === 'default') {
        for (let i = 0; i < length; i += 1) {
          const name = list[i];
          const nameUpperCase = name.toUpperCase();
          if (!lookupObj[nameUpperCase]) {
            lookupObj[nameUpperCase] = `aria-${name.toLowerCase()}`;
          }
        }
        return lookupObj;
      }
      for (let i = 0; i < length; i += 1) {
        const name = list[i];
        const ariaPropertyLowerCase = `aria-${name.toLowerCase()}`;
        if (!lookupObj[ariaPropertyLowerCase]) {
          const ariaPropertyCamelCase = `aria${name[0].toUpperCase()}${name.slice(1)}`;
          lookupObj[ariaPropertyLowerCase] = ariaPropertyCamelCase;
        }
      }
      return lookupObj;
    };

    /**
     * ARIA lookup, 'modified' kebab-case
     * Given an array of aria property strings in camel-case, produce a lookup object
     * NOTE: 'ariaDescribedBy' (camel-case ARIA property) in TRUE kebab-case would be:
     * - 'aria-described-by' (not valid ARIA)
     * - 'aria-describedby' (valid ARIA, or modified kebab-case)
     * Example: 'describedBy' -> { DESCRIBEDBY: 'aria-describedby' }
     */
    const ARIA = getAriaLookup(ARIA_PROP_LIST);

    /**
     * ARIA lookup, aria-property (key): 'ariaCamelCase' (value)
     * Example: 'valueMax' -> { 'aria-valuemax': 'ariaValueMax' }
     * Useful for converting from normal aria properties to aria camel cased values
     */
    const ARIA_TO_CAMEL = getAriaLookup(ARIA_PROP_LIST, 'cc');

    /**
     * Set either 'aria-describedby' or 'aria-description' value for accessibility
     * based on the presence of 'description' api value and support of the newer ARIA
     * 'aria-description'.  At launch, Firefox, Safari do not support it (and IE11 never will).
     * https://caniuse.com/mdn-api_element_ariadescription
     * @private
     * @returns {boolean} true indicates aria-description is supported; false, no support
     */
    // cached value, so check once and only once
    let ariaDescriptionSupported = null;
    function isAriaDescriptionSupported() {
      // return previously cached value, don't recheck
      if (ariaDescriptionSupported !== null) {
        return ariaDescriptionSupported;
      }
      // if not previously set, test for browser support
      const testVal = 'test ability to set';
      try {
        const span = document.createElement('span');
        span.ariaDescription = testVal;
        const ariaDescVal = span.getAttribute(ARIA.DESCRIPTION);
        ariaDescriptionSupported = testVal === ariaDescVal;
      } catch (e) {
        ariaDescriptionSupported = false;
      }
      return ariaDescriptionSupported;
    }
    function updateAriaInvalidOnElement(element, isInvalid) {
      if (isInvalid) {
        element.setAttribute('aria-invalid', true);
      } else {
        element.removeAttribute('aria-invalid');
      }
    }

    /**
     * If value is empty, then do no calculate aria-invalid. This is intentional for 240.
     * In the future, we may be removing emptiness this check.
     *
     * Then if isInvalid is truthy, return true else return undefined to remove
     * aria-invalid attribute.
     *
     * @param isInvalid
     * @param value
     * @returns {boolean|undefined}
     */
    function computeAriaInvalid(isInvalid, value, ariaInvalid) {
      if (typeof ariaInvalid !== 'undefined') {
        return ariaInvalid;
      }
      if (value === undefined || value === null || value === '') {
        /* To Preserve backward compatibility */
        return undefined;
      }
      return !!isInvalid || undefined;
    }

    /**
    An emitter implementation based on the Node.js EventEmitter API:
    https://nodejs.org/dist/latest-v6.x/docs/api/events.html#events_class_eventemitter
    **/
    class EventEmitter {
      constructor() {
        this.registry = {};
      }

      /**
      Registers a listener on the emitter
      @method EventEmitter#on
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/
      on(name, listener) {
        this.registry[name] = this.registry[name] || [];
        this.registry[name].push(listener);
        return this;
      }

      /**
      Registers a listener on the emitter that only executes once
      @method EventEmitter#once
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/
      once(name, listener) {
        const doOnce = function () {
          listener.apply(null, arguments);
          this.removeListener(name, doOnce);
        }.bind(this);
        this.on(name, doOnce);
        return this;
      }

      /**
      Synchronously calls each listener registered with the specified event
      @method EventEmitter#emit
      @param {String} name - The name of the event
      @return {Boolean} - Returns `true` if the event had listeners, `false` otherwise
      **/
      emit(name) {
        const listeners = this.registry[name];
        let count = 0;
        if (listeners) {
          const args = Array.prototype.slice.call(arguments, 1);
          for (let i = 0, {
              length
            } = listeners; i < length; i += 1) {
            count += 1;
            listeners[i].apply(null, args);
          }
        }
        return count > 0;
      }

      /**
      Removes the specified `listener` from the listener array for the event named `name`
      @method EventEmitter#removeListener
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/
      removeListener(name, listener) {
        const listeners = this.registry[name];
        if (listeners) {
          for (let i = 0, len = listeners.length; i < len; i += 1) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              return this;
            }
          }
        }
        return this;
      }
    }

    const NA_PHONE_NUMBER = '($1) $2-$3';
    const IS_TEN_DIGITS = /^\d{10}$/;
    const TEN_TO_NA = /(\d{3})(\d{3})(\d{4})/;
    const IS_ELEVEN_DIGITS = /^1\d{10}$/;
    const ELEVEN_TO_NA = /1(\d{3})(\d{3})(\d{4})$/;

    // The locale argument has been added for tests since there's currently no clean way of mocking the locale
    function toNorthAmericanPhoneNumber(value, userLocale) {
      if (!isNorthAmericanCountry(userLocale || locale__default.default)) {
        return value;
      }
      if (IS_TEN_DIGITS.test(value)) {
        return value.replace(TEN_TO_NA, NA_PHONE_NUMBER);
      } else if (IS_ELEVEN_DIGITS.test(value)) {
        return value.replace(ELEVEN_TO_NA, NA_PHONE_NUMBER);
      }
      return value || '';
    }
    function isNorthAmericanCountry(userLocale) {
      const localeCountry = getLocaleCountry(userLocale);
      if (localeCountry === 'US' || localeCountry === 'CA') {
        return true;
      }
      return false;
    }
    function getLocaleCountry(userLocale) {
      if (!userLocale) {
        // just adding a guard in case locale is undefined
        return null;
      }
      const [, country] = userLocale.split('-');
      return country;
    }

    const URL_CHECK_REGEX = /^(\/+|\.+|ftp|http(s?):\/\/)/i;
    const SSR_PROTOCOL = 'https:'; // For LWR (SSR), the protocol will always be HTTPS. See TD-0141280.

    function isAbsoluteUrl(url) {
      return URL_CHECK_REGEX.test(url);
    }
    function makeAbsoluteUrl(url) {
      const protocol = isCSR ? window.location.protocol : SSR_PROTOCOL;
      return isAbsoluteUrl(url) ? url : `${protocol}//${url}`;
    }

    // eslint-disable-next-line no-script-url
    const FALLBACK_URL = 'javascript:void(0)';
    const IS_SCRIPT_OR_DATA = /^(?:\w+script|data):/i;
    const IS_HTML_ENTITY = /&#(\w+)(^\w|;)?/g;
    const htmlCtrlEntityRegex = /&(newline|tab);/gi;
    const ctrlCharactersRegex =
    // eslint-disable-next-line no-control-regex
    /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
    function decodeHtmlCharacters(str) {
      return str.replace(IS_HTML_ENTITY, (match, dec) => {
        return String.fromCharCode(dec);
      });
    }
    /**
     * Mark sure to preventDefault, when sanitized url matches FALLBACK_URL
     * W-12029667 - Making FALLBACK_URL as '#' causes click action to fail on tests
     * */
    function sanitizeURL(url) {
      if (url) {
        // remove html entity characters from url
        const sanitizedUrl = decodeHtmlCharacters(url).replace(htmlCtrlEntityRegex, '').replace(ctrlCharactersRegex, '').trim();
        return sanitizedUrl.match(IS_SCRIPT_OR_DATA) ? FALLBACK_URL : url;
      }
      return FALLBACK_URL;
    }

    const urlRegexString = "((?:(?:https?|ftp):\\/\\/(?:[\\w\\-\\|=%~#\\/+*@\\.,;:\\?!']|&){0,2047}(?:[\\(\\)\\.\\w=\\/+#-]*)[^\\s()\\.<>,;\\[\\]`'\"])|(?:\\b(?:[a-z0-9](?:[-a-z0-9]{0,62}[a-z0-9])?\\.)+(?:AC|AD|AE|AERO|AF|AG|AI|AL|AM|AN|AO|AQ|AR|ARPA|AS|ASIA|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BIZ|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CAT|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|COM|COOP|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EDU|EE|EG|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GOV|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|INFO|INT|IO|IQ|IR|IS|IT|JE|JM|JO|JOBS|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MG|MH|MIL|MK|ML|MM|MN|MO|MOBI|MP|MQ|MR|MS|MT|MU|MUSEUM|MV|MW|MX|MY|MZ|NA|NAME|NC|NE|NET|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|ORG|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PRO|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TEL|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TP|TR|TRAVEL|TT|TV|TW|TZ|UA|UG|UK|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|XN--0ZWM56D|XN--11B5BS3A9AJ6G|XN--80AKHBYKNJ4F|XN--9T4B11YI5A|XN--DEBA0AD|XN--FIQS8S|XN--FIQZ9S|XN--G6W251D|XN--HGBK6AJ7F53BBA|XN--HLCJ6AYA9ESC7A|XN--J6W193G|XN--JXALPDLP|XN--KGBECHTV|XN--KPRW13D|XN--KPRY57D|XN--MGBAAM7A8H|XN--MGBERP4A5D4AR|XN--P1AI|XN--WGBH1C|XN--ZCKZAH|YE|YT|ZA|ZM|ZW)(?!@(?:[a-z0-9](?:[-a-z0-9]{0,62}[a-z0-9])?\\.)+(?:AC|AD|AE|AERO|AF|AG|AI|AL|AM|AN|AO|AQ|AR|ARPA|AS|ASIA|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BIZ|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CAT|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|COM|COOP|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EDU|EE|EG|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GOV|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|INFO|INT|IO|IQ|IR|IS|IT|JE|JM|JO|JOBS|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MG|MH|MIL|MK|ML|MM|MN|MO|MOBI|MP|MQ|MR|MS|MT|MU|MUSEUM|MV|MW|MX|MY|MZ|NA|NAME|NC|NE|NET|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|ORG|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PRO|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TEL|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TP|TR|TRAVEL|TT|TV|TW|TZ|UA|UG|UK|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|XN--0ZWM56D|XN--11B5BS3A9AJ6G|XN--80AKHBYKNJ4F|XN--9T4B11YI5A|XN--DEBA0AD|XN--FIQS8S|XN--FIQZ9S|XN--G6W251D|XN--HGBK6AJ7F53BBA|XN--HLCJ6AYA9ESC7A|XN--J6W193G|XN--JXALPDLP|XN--KGBECHTV|XN--KPRW13D|XN--KPRY57D|XN--MGBAAM7A8H|XN--MGBERP4A5D4AR|XN--P1AI|XN--WGBH1C|XN--ZCKZAH|YE|YT|ZA|ZM|ZW))(?:/[\\w\\-=?/.&;:%~,+@#*]{0,2048}(?:[\\w=/+#-]|\\([^\\s()]*\\)))?(?:$|(?=\\.$)|(?=\\.\\s)|(?=[^\\w\\.]))))";
    const emailRegexString = "([\\w-\\.\\+_']{1,64}@(?:[\\w-]){1,255}(?:\\.[\\w-]{1,255}){1,10})";
    const newLineRegexString = '(\r\n|\r|\n)';
    const tagRegexString = '(<a[\\s]+[^>]+[^/]>[\\s\\S]*?</a>|<a[\\s]+[^>]+/>|' + '<i?frame[\\s]+[^>]+[^/]>[\\s\\S]*?</i?frame>|<i?frame[\\s]+[^>]+/>|' + '<area[\\s]+[^>]+[^/]>[\\s\\S]*?</area>|<area[\\s]+[^>]+/>|' + '<link[\\s]+[^>]+[^/]>[\\s\\S]*?</link>|<link[\\s]+[^>]+/>|' + '<img[\\s]+[^>]+[^/]>[\\s\\S]*?</img>|<img[\\s]+[^>]+>|' + '<form[\\s]+[^>]+[^/]>[\\s\\S]*?</form>|<form[\\s]+[^>]+/>|' + '<body[\\s]+[^>]+[^/]>[\\s\\S]*?</body>|<body[\\s]+[^>]+/>|' + '<head[\\s]+[^>]+[^/]>[\\s\\S]*?</head>|<head[\\s]+[^>]+/>|' + '<input[\\s]+[^>]+[^/]>[\\s\\S]*?</input>|<input[\\s]+[^>]+/>|' + '<button[\\s]+[^>]+[^/]>[\\s\\S]*?</button>|<button[\\s]+[^>]+/>|' + '<blockquote[\\s]+[^>]+[^/]>[\\s\\S]*?</blockquote>|<blockquote[\\s]+[^>]+/>|' + '<q[\\s]+[^>]+[^/]>[\\s\\S]*?</q>|<q[\\s]+[^>]+/>|' + '<del[\\s]+[^>]+[^/]>[\\s\\S]*?</del>|<del[\\s]+[^>]+/>|' + '<ins[\\s]+[^>]+[^/]>[\\s\\S]*?</ins>|<ins[\\s]+[^>]+/>)';
    const createHttpHref = function (url) {
      return makeAbsoluteUrl(url);
    };
    const createEmailHref = function (email) {
      return `mailto:${email}`;
    };

    /**
     * Create a deep copy of an object or array
     * @param {object|array} obj - item to be copied
     * @returns {object|array} copy of the item
     */
    function deepCopy(obj) {
      if (Object(obj) !== obj) {
        // primitives
        return obj;
      }
      if (obj instanceof Set) {
        return new Set(obj);
      }
      if (obj instanceof Date) {
        return new Date(obj);
      }
      if (typeof obj === 'function') {
        return obj.bind({});
      }
      if (Array.isArray(obj)) {
        const obj2 = [];
        const len = obj.length;
        for (let i = 0; i < len; i++) {
          obj2.push(deepCopy(obj[i]));
        }
        return obj2;
      }
      const result = Object.create({});
      let keys = Object.keys(obj);
      if (obj instanceof Error) {
        // Error properties are non-enumerable
        keys = Object.getOwnPropertyNames(obj);
      }
      const len = keys.length;
      for (let i = 0; i < len; i++) {
        const key = keys[i];
        result[key] = deepCopy(obj[key]);
      }
      return result;
    }

    /**
     * Compare two arrays and return true if they are equal
     * @param {array} array1 - first array to compare
     * @param {array} array2 - second array to compare
     * @returns {boolean} if the arrays are identical
     */
    function arraysEqual(array1, array2) {
      // if either array is falsey, return false
      if (!array1 || !array2) {
        return false;
      }

      // if array lengths don't match, return false
      if (array1.length !== array2.length) {
        return false;
      }
      for (let index = 0; index < array1.length; index++) {
        // Check if we have nested arrays
        if (array1[index] instanceof Array && array2[index] instanceof Array) {
          // recurse into the nested arrays
          if (!arraysEqual(array1[index], array2[index])) {
            return false;
          }
        } else if (array1[index] !== array2[index]) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;
        }
      }
      return true;
    }
    const ArraySlice = Array.prototype.slice;

    /**
     * Utility function to generate an unique guid.
     * used on state objects to provide a performance aid when iterating
     * through the items and marking them for render
     * @returns {String} an unique string ID
     */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function classListMutation(classList, config) {
      const keys = Object.keys(config);
      for (let i = 0, {
          length
        } = keys[i]; i < length; i += 1) {
        const key = keys[i];
        if (typeof key === 'string' && key.length > 0) {
          if (config[key]) {
            classList.add(key);
          } else {
            classList.remove(key);
          }
        }
      }
    }

    function classSetToString(classes) {
      let string = '';
      const keys = Object.keys(classes);
      for (let i = 0, {
          length
        } = keys; i < length; i += 1) {
        const key = keys[i];
        if (classes[key]) {
          string += (string.length ? ' ' : '') + key;
        }
      }
      return string;
    }

    /**
     * This marks all siblings of the blocking elements and the siblings of all of its parents as inert by setting
     * 'aria-hidden' to 'true'.
     *
     * This assumes that the DOM is not being modified while the blocking element is showing, otherwise observers would
     * be needed.
     *
     * @param {Element} blockingElement The active element that will be be blocking the rest of the page.
     * @returns {Array} An array of {node, ariaHidden} objects, where node is the node that had its ariaHidden set
     * to 'true', and ariaHidden is the previous value of the 'aria-hidden' attribute. Use this to restore inertness.
     */
    function makeEverythingExceptElementInert(blockingElement) {
      const savedInertElements = [];
      let nonInertElement = blockingElement;
      let parent = nonInertElement.parentNode.host || nonInertElement.parentNode;
      while (parent != null) {
        if (parent.nodeType === Node.ELEMENT_NODE) {
          // Start with the first child, if the parent blockingElement has a shadow root then use the first child of that
          let child = parent.firstChild;
          if (child === null && parent.shadowRoot) {
            child = parent.shadowRoot.firstChild;
          }
          while (child !== null) {
            // Ignore the blocking elements and all its parents (nonInertElement).
            if (child.nodeType === Node.ELEMENT_NODE && child !== nonInertElement && child.localName !== 'head') {
              savedInertElements.push({
                node: child,
                ariaHidden: child.ariaHidden
              });
              child.ariaHidden = true;
            }
            child = child.nextSibling;
          }
          nonInertElement = parent;
          parent = parent.parentNode;
        } else if (parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          // It maybe a custom component, attempt to get the host
          parent = parent.host;
        } else {
          parent = parent.parentNode;
        }
      }
      return savedInertElements;
    }
    function restoreInertness(savedInertElements) {
      for (let i = 0, {
          length
        } = savedInertElements; i < length; i += 1) {
        const element = savedInertElements[i];
        const {
          node
        } = element;
        if (node) {
          node.ariaHidden = element.ariaHidden;
        }
      }
    }

    /**
     * Does the browser display animation.
     * Always returns false for IE11 due to performance.
     */
    function hasAnimation() {
      if (isCSR) {
        if (!window.matchMedia) {
          return true;
        }
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        return !(!mediaQuery || mediaQuery.matches);
      }
      return false;
    }

    /**
    A string normalization utility for attributes.
    @param {String} value - The value to normalize.
    @param {Object} config - The optional configuration object.
    @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
    @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
    @return {String} - The normalized value.
    **/
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = '',
        validValues,
        toLowerCase = true
      } = config;
      let normalized = typeof value === 'string' && value.trim() || '';
      normalized = toLowerCase ? normalized.toLowerCase() : normalized;
      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }
      return normalized;
    }

    /**
    A boolean normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/
    function normalizeBoolean(value) {
      return typeof value === 'string' || !!value;
    }
    const isNotNumber = value => {
      // Need to make sure it is a number than check isNaN
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#difference_between_number.isnan_and_global_isnan
      if (Number.isNaN(value) || value === null || value === undefined || value === '' || Array.isArray(value)) {
        return true;
      }
      // to eliminate non numeric string or other non numeric-typed objects
      const convertedNumber = Number(value);
      return Number.isNaN(convertedNumber);
    };

    /**
     * A number normalization utility for attributes.
     * @param {number} value - The value to normalize.
     * @param {object} config -  The optional configuration object.
     * @param {number} [config.minValue] - The optional min value to check against the given value.
     * @param {number} [config.maxValue] - The optional max value to check against the given value.
     * @param {number} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or outside of the min or max range
     * @return {number} - The normalized value
     */
    function normalizeNumber(value, config = {}) {
      const {
        fallbackValue,
        minValue,
        maxValue
      } = config;
      const returnValueIfInvalid = typeof fallbackValue === 'number' && fallbackValue || undefined;
      if (isNotNumber(value)) {
        return returnValueIfInvalid;
      }
      if (!isNotNumber(value) && value < minValue) {
        return returnValueIfInvalid;
      }
      if (!isNotNumber(value) && value > maxValue) {
        return returnValueIfInvalid;
      }
      // multiplying 1 is to make sure to convert from a numeric string to a number
      return value * 1;
    }
    function normalizeArray(value) {
      if (Array.isArray(value)) {
        return value;
      }
      return [];
    }

    /**
    A aria attribute normalization utility.
    @param {Any} value - A single aria value or an array of aria values
    @return {String} - A space separated list of aria values
    **/
    function normalizeAriaAttribute(value) {
      let arias = Array.isArray(value) ? value : [value];
      arias = arias.map(ariaValue => {
        if (typeof ariaValue === 'string') {
          return ariaValue.replace(/\s+/g, ' ').trim();
        }
        return '';
      }).filter(ariaValue => !!ariaValue);
      return arias.length > 0 ? arias.join(' ') : null;
    }

    const keyCodes = {
      tab: 9,
      backspace: 8,
      enter: 13,
      escape: 27,
      space: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46,
      shift: 16
    };

    // Acceptable values are defined here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    // remove this function when IE11 support is dropped
    function normalizeKeyValue(value) {
      switch (value) {
        case 'Spacebar':
          return ' ';
        case 'Esc':
          return 'Escape';
        case 'Del':
          return 'Delete';
        case 'Left':
          return 'ArrowLeft';
        case 'Right':
          return 'ArrowRight';
        case 'Down':
          return 'ArrowDown';
        case 'Up':
          return 'ArrowUp';
        default:
          return value;
      }
    }
    const buffer = {};
    function isShiftMetaOrControlKey(event) {
      return event.shiftKey || event.metaKey || event.ctrlKey;
    }

    /**
     * Runs an action and passes the string of buffered keys typed within a short time period.
     * Use for type-ahead like functionality in menus, lists, comboboxes, and similar components.
     *
     * @param {CustomEvent} event A keyboard event
     * @param {Function} action function to run, it's passed the buffered text
     */
    function runActionOnBufferedTypedCharacters(event, action) {
      const letter = event.key;
      if (letter && letter.length > 1) {
        // Not an individual character/letter, but rather a special code (like Shift, Backspace, etc.)
        return;
      }

      // If we were going to clear what keys were typed, don't yet.
      if (buffer._clearBufferId) {
        clearTimeout(buffer._clearBufferId);
      }
      buffer._keyBuffer = buffer._keyBuffer || [];
      buffer._keyBuffer.push(letter);
      const matchText = buffer._keyBuffer.join('').toLowerCase();
      action(matchText);

      // eslint-disable-next-line @lwc/lwc/no-async-operation
      buffer._clearBufferId = setTimeout(() => {
        buffer._keyBuffer = [];
      }, 700);
    }

    function raf(fn) {
      let ticking = false;
      return function (event) {
        if (!ticking) {
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          requestAnimationFrame(() => {
            fn.call(this, event);
            ticking = false;
          });
        }
        ticking = true;
      };
    }

    const isIE11 = isCSR && isIE11Test(navigator);
    const isChrome = isCSR && isChromeTest(navigator);
    const isSafari = isCSR && isSafariTest(navigator);

    // The following functions are for tests only
    function isIE11Test(navigator) {
      // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
      return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    }
    function isChromeTest(navigator) {
      // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }
    function isSafariTest(navigator) {
      // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    // hide panel on scroll
    const POSITION_CHANGE_THRESHOLD = 5;
    function observePosition(target, threshold = POSITION_CHANGE_THRESHOLD, originalRect, callback) {
      // retrieve current bounding client rect of target element
      const newBoundingRect = target.getBoundingClientRect();
      const newLeft = newBoundingRect.left;
      const newTop = newBoundingRect.top;

      // old bounding rect values
      const oldLeft = originalRect.left;
      const oldTop = originalRect.top;

      // if we have a position change (horizontal or vertical) equal or greater to the threshold then execute the callback
      const horizontalShiftDelta = Math.abs(newLeft - oldLeft);
      const verticalShiftDelta = Math.abs(newTop - oldTop);
      if (horizontalShiftDelta >= threshold || verticalShiftDelta >= threshold) {
        callback();
      }
    }

    const ALLOWED_DOMAINS = new Set(['www.youtube.com', 'www.youtube-nocookie.com', 'www.youtube.ca', 'www.youtube.jp', 'www.youtube.com.br', 'www.youtube.co.uk', 'www.youtube.nl', 'www.youtube.pl', 'www.youtube.es', 'www.youtube.ie', 'www.youtube.fr', 'player.vimeo.com', 'play.vidyard.com', 'players.brightcove.net', 'bcove.video', 'player.cloudinary.com', 'fast.wistia.net', 'i1.adis.ws', 's1.adis.ws', 'scormanywhere.secure.force.com', 'appiniummastertrial.secure.force.com', 'embed.app.guidde.com', 'cdnapisec.kaltura.com']);
    // In addition to:
    //   vimeo.com/showcase/*/embed
    //   *.my.site.com
    //   *.lightning.force.com
    //   *.my.salesforce-sites.com

    function hasOnlyAllowedVideoIframes(htmlString) {
      if (htmlString && htmlString.indexOf('<iframe') > -1) {
        const parsedHtml = new DOMParser().parseFromString(htmlString, 'text/html');
        const iframesList = Array.prototype.slice.call(parsedHtml.querySelectorAll('iframe'));
        return iframesList.length > 0 && !iframesList.some(iframe => !isUrlAllowed(iframe.src));
      }
      return false;
    }
    function isUrlAllowed(url) {
      const anchor = document.createElement('a');
      anchor.href = url;
      if (anchor.protocol !== 'https:') {
        return false;
      }
      if (anchor.hostname === 'vimeo.com') {
        const path = anchor.pathname;
        const regex = /^\/showcase\/\d+\/embed$/;
        return path.match(regex) !== null;
      }
      if (anchor.hostname === 'www.my.salesforce-sites.com') {
        return false;
      }
      if (anchor.hostname.match(/^[\w-]+\.my\.salesforce-sites\.com$/)) {
        return true;
      }
      if (anchor.hostname.match(/^[\w-]+\.sandbox\.my\.salesforce-sites\.com$/)) {
        return true;
      }
      if (anchor.hostname === 'www.lightning.force.com') {
        return false;
      }
      if (anchor.hostname.match(/^[\w-]+\.lightning\.force\.com$/)) {
        return true;
      }
      if (anchor.hostname.match(/^[\w-]+\.sandbox\.lightning\.force\.com$/)) {
        return true;
      }
      if (anchor.hostname === 'www.my.site.com') {
        return false;
      }
      if (anchor.hostname.match(/^[\w-]+\.my\.site\.com$/)) {
        return true;
      }
      if (anchor.hostname.match(/^[\w-]+\.sandbox\.my\.site\.com$/)) {
        return true;
      }
      return ALLOWED_DOMAINS.has(anchor.hostname);
    }

    /*
     * Regex was taken from aura lib and refactored
     */
    const linkRegex = new RegExp(`(${newLineRegexString})|${urlRegexString}|${emailRegexString}`, 'gi');
    const linkRegexNoNewLine = new RegExp(`${urlRegexString}|${emailRegexString}`, 'gi');
    const emailRegex = new RegExp(`^${emailRegexString}$`, 'gi');
    const newLineRegex = new RegExp(newLineRegexString, 'gi');
    function getTextPart(text) {
      return {
        isText: true,
        value: text
      };
    }
    function getUrlPart(url, index) {
      return {
        isLink: true,
        value: url,
        href: createHttpHref(url),
        key: `${url}-${index}`
      };
    }
    function getEmailPart(email, index) {
      return {
        isLink: true,
        value: email,
        href: createEmailHref(email),
        key: `${email}-${index}`
      };
    }
    function getNewlinePart(index) {
      return {
        isNewline: true,
        key: index
      };
    }
    function getLinkPart(link, index, ignoreNewLines) {
      if (!ignoreNewLines && link.match(newLineRegex)) {
        return getNewlinePart(index);
      } else if (link.match(emailRegex)) {
        return getEmailPart(link, index);
      }
      return getUrlPart(link, index);
    }

    /**
     * Parse text into parts of text, links, emails, new lines
     * @param text {string} Text to parse into linkified parts
     * @param ignoreNewLines {boolean} Boolean indicating whether to return new line parts or not
     * if true new lines are included in text/url/email parts otherwise they are returned in their
     * own parts by default
     * @returns {[]}
     */
    function parseToFormattedLinkifiedParts(text, ignoreNewLines = false) {
      const parts = [];
      const re = ignoreNewLines ? linkRegexNoNewLine : linkRegex;
      let match;
      let index = 0;
      while ((match = re.exec(text)) !== null) {
        let link = match[0];
        const endsWithQuote = link && link.endsWith('&quot');
        // If we found an email or url match, then create a text part for everything
        // up to the match and then create the part for the email or url
        if (match.index > 0) {
          parts.push(getTextPart(text.slice(0, match.index)));
        }
        if (endsWithQuote) {
          link = link.slice(0, link.lastIndexOf('&quot'));
        }
        parts.push(getLinkPart(link, index, ignoreNewLines));
        if (endsWithQuote) {
          parts.push(getTextPart('&quot'));
        }
        text = text.substring(re.lastIndex);
        re.lastIndex = 0;
        index = index + 1;
      }
      if (text != null && text !== '') {
        parts.push(getTextPart(text));
      }
      return parts;
    }

    /**
     * Parse text into parts of text and new lines
     * @param text {string} Text to parse into parts
     * @returns {[]}
     */
    function parseToFormattedParts(text) {
      return text.split(newLineRegex).map((part, index) => {
        return index % 2 === 0 ? getTextPart(part) : getNewlinePart(index);
      });
    }

    const VALID_PAGE_REFERENCE_PROPERTIES = new Set(['type', 'attributes', 'state']);
    function isValidPageReference(object) {
      return object && object.type && typeof object.type === 'string' && object.attributes && typeof object.attributes === 'object' && Object.keys(object).every(prop => VALID_PAGE_REFERENCE_PROPERTIES.has(prop));
    }

    /**
     * Verify if user is using MAC OS or not
     * @returns {boolean} - true if Mac OS
     */
    const isMacOSTest = ({
      userAgent
    }) => {
      return /(macintosh|macintel|macppc|mac68k|macos)/i.test(userAgent);
    };

    /**
     * Verify if user is using iOS or not
     * @returns {boolean} - true, if iOS
     */
    const isiOSTest = ({
      userAgent
    }) => {
      return /(iphone|ipad|ipod)/i.test(userAgent);
    };

    /**
     * Verify if user is using Windows OS or not
     * @returns {boolean} - true, if Windows OS
     */
    const isWindowsOSTest = ({
      userAgent
    }) => {
      return /(win32|win64|windows)/i.test(userAgent);
    };

    /**
     * Verify if user is using Android OS or not
     * @returns {boolean} - true, if Android OS
     */
    const isAndroidOSTest = ({
      userAgent
    }) => {
      return /android/i.test(userAgent);
    };
    const isMacOS = isCSR && isMacOSTest(navigator);
    const isWindowsOS = isCSR && isWindowsOSTest(navigator);
    const isiOS = isCSR && isiOSTest(navigator);
    const isAndroidOS = isCSR && isAndroidOSTest(navigator);

    /**
     * These are all values that can be set to "aria-level" attribute of h2 tag for the card's title.
     */
    const VALID_HEADING_LEVELS = ['1', '2', '3', '4', '5', '6'];
    function isHeadingLevelValid(level) {
      return (typeof level === 'string' || typeof level === 'number') && VALID_HEADING_LEVELS.includes(level.toString());
    }

    const MAX_LONGITUDE = 180.0;
    const MAX_LATITUDE = 90.0;

    /**
     * Determine if a value is a valid date.
     *
     * @param {any} value The value to validate.
     * @returns {boolean} Whether the provided value is a valid date or not.
     */
    function isValidDate(value) {
      if (value === null || value === undefined || value === '') {
        return false;
      }
      return isFinite(value) || iso8601Utils.isValidISODateTimeString(value);
    }

    /**
     * Determine if a value is a valid latitude.
     *
     * @param {any} value The value to validate.
     * @returns {boolean} Whether the provided value is a valid latitude or not.
     */
    function isValidLatitude(value) {
      return value !== null && value !== undefined && value !== '' && isFinite(value) && Math.abs(value) <= MAX_LATITUDE;
    }

    /**
     * Determine if a value is a valid longitude.
     *
     * @param {any} value The value to validate.
     * @returns {boolean} Whether the provided value is a valid longitude or not.
     */
    function isValidLongitude(value) {
      return value !== null && value !== undefined && value !== '' && isFinite(value) && Math.abs(value) <= MAX_LONGITUDE;
    }

    /**
     * Determine if a value is a valid phone value.
     *
     * @param {any} value The value to validate.
     * @returns {boolean} Whether the provided value is a valid phone value or not.
     */
    function isValidPhone(value) {
      return typeof value === 'string' && value !== '';
    }

    /**
     * Convert a LightningFormattedDate instance (or similar) to a dateTimeFormat
     * options object.
     *
     * @param {LightningFormattedDateLike} instance
     *      An instance of the LightningFormattedDate class,
     *      or config object matching the public API.
     * @returns {object} The dateTimeFormat options object.
     */
    function toDateTimeFormatOptions(instance) {
      const options = {
        weekday: instance.weekday,
        era: instance.era,
        year: instance.year,
        month: instance.month,
        day: instance.day,
        hour: instance.hour,
        hourCycle: undefined,
        hour12: undefined,
        minute: instance.minute,
        second: instance.second,
        timeZoneName: instance.timeZoneName,
        timeZone: instance.timeZone
      };
      const {
        hour12
      } = instance;
      // If hour12 is set, then we use it, otherwise locale defaults will be used
      if (instance._hour12Set) {
        // TODO: W-7787708: Remove hourCycle workaround below when possible.
        // W-7583911: Temporarily works around an hourCycle spec bug that only Chrome has
        // implemented causing the default hourCycle to be 'h24' rather than 'h23' when hour12 is
        // false in 12-hour locales. Chrome ends up displaying times like '24:45'. Spec bug fix PR:
        // https://github.com/tc39/ecma402/pull/436/files
        if (hour12 === false) {
          options.hourCycle = 'h23';
        } else {
          options.hour12 = hour12;
        }
      }
      return options;
    }

    /**
     * Convert a LightningFormattedDate instance (or similar) to a string.
     * Allows for formatting a date without the overhead of instantiating a whole
     * component.
     *
     * @param {LightningFormattedDateLike} instance
     *      An instance of the LightningFormattedDate class,
     *      or config object matching the public API.
     * @returns {string} The date as a string.
     */
    function toFormattedDate(instance, dateTimeFormat) {
      const {
        value
      } = instance;
      if (isValidDate(value)) {
        const formatted = dateTimeFormat(toDateTimeFormatOptions(instance)).format(value);
        if (formatted) {
          return formatted;
        }
      }
      // eslint-disable-line no-console
      console.warn(`<lightning-formatted-date-time> The value attribute accepts either a Date object, a timestamp, or a valid ISO8601 formatted string ` + `with timezone offset. but we are getting the ${typeof value} value "${value}" instead.`);
      return '';
    }

    /**
     * Convert a LightningFormattedLocation instance (or similar) to a string.
     * Allows for formatting a location without the overhead of instantiating a whole
     * component.
     *
     * @param {LightningFormattedLocationLike} instance
     *      An instance of the LightningFormattedLocation class,
     *      or config object matching the public API.
     * @returns {string} The latitude and longitude as a string.
     */
    function toFormattedLocation(instance) {
      const {
        latitude,
        longitude
      } = instance;
      if (isValidLatitude(latitude) && isValidLongitude(longitude)) {
        return `${latitude}, ${longitude}`;
      }
      // eslint-disable-next-line no-console
      console.warn(`<lightning-formatted-location> expects latitude in range [-90.0, 90.0], longitude in range [-180.0, 180.0].`);
      return '';
    }

    /**
     * Convert a LightningFormattedNumber instance (or similar) to a string.
     * Allows for formatting a number without the overhead of instantiating a whole
     * component.
     *
     * @param {LightningFormattedNumberLike} instance
     *      An instance of the LightningFormattedNumber class,
     *      or config object matching the public API.
     * @returns {string} The number as a string.
     */
    function toFormattedNumber(instance, numberFormat) {
      const {
        value
      } = instance;
      if (value !== null && value !== undefined && value !== '' && isFinite(value)) {
        const {
          formatStyle
        } = instance;
        const options = {
          style: formatStyle,
          currency: instance.currencyCode,
          currencyDisplay: instance.currencyDisplayAs,
          minimumIntegerDigits: instance.minimumIntegerDigits,
          minimumFractionDigits: instance.minimumFractionDigits,
          maximumFractionDigits: instance.maximumFractionDigits,
          minimumSignificantDigits: instance.minimumSignificantDigits,
          maximumSignificantDigits: instance.maximumSignificantDigits
        };
        const valueAsString = String(value);
        let valueToFormat = valueAsString;

        // percent-fixed just divides the value by 100
        // before passing to the library, this is to deal with the
        // fact that percentages in salesforce are 0-100, not 0-1
        if (formatStyle === 'percent-fixed') {
          options.style = 'percent';
          valueToFormat = parseFloat(value) / 100;

          // If the number contains fraction digits and is not in an exponent format
          if (valueAsString.indexOf('.') > 0 && valueAsString.indexOf('e') < 0) {
            // Depending on the input number, division by 100 may lead to rounding errors
            // (e.g 0.785 / 100 is 0.007850000000000001), so we need to round back
            // to the correct precision, that is - existing number of fractional digits
            // plus extra 2 for division by 100.
            valueToFormat = valueToFormat.toFixed(valueAsString.split('.')[1].length + 2);
          }
        }
        return numberFormat(options).format(valueToFormat);
      }
      return '';
    }

    const hexColorCodesRegExp = /^#[0-9abcdef]{6}$/i;

    /**
     * Determine if a value should ignore RTL text formatting.
     *
     * @param {any} value The value to check.
     * @returns {boolean} Whether the provided value should ignore RTL text formatting.
     */
    function isTextIgnoreRTL(value) {
      return typeof value === 'string' && value !== '' &&
      // Ignoring RTL for hex color codes
      hexColorCodesRegExp.test(value);
    }

    var _tmpl = void 0;

    class Observable {
      constructor() {
        this._observers = [];
      }
      subscribe(func) {
        const unsubscribe = fn => this._observers = this._observers.filter(observer => observer !== fn);
        this._observers.push(func);
        return () => unsubscribe(func);
      }
      notify(data) {
        this._observers.forEach(observer => observer(data));
      }
    }
    const __lwc_component_class_internal = lwc.registerComponent(Observable, {
      tmpl: _tmpl,
      sel: "lightning-utils-private",
      apiVersion: 62
    });

    const LIGHTNING_TAG_REGEXP = /^LIGHTNING/i;
    const LIGHTNING_DASH_NAME_REGEXP = /-\w/g;
    function dashWordCharReplacement(dashWordCharMatch) {
      return dashWordCharMatch[1].toUpperCase();
    }
    function synchronizeHTMLElementAttrs(element, attrs) {
      const attrNames = Object.keys(attrs);
      for (let i = 0, {
          length
        } = attrNames; i < length; i += 1) {
        const attrName = attrNames[i];
        const attrValue = attrs[attrName];
        if (attrValue) {
          element.setAttribute(attrName, attrValue);
        } else {
          element.removeAttribute(attrName);
        }
      }
    }
    function synchronizeLightningElementAttrs(element, attrs) {
      const attrNames = Object.keys(attrs);
      for (let i = 0, {
          length
        } = attrNames; i < length; i += 1) {
        const attrName = attrNames[i];
        const attrValue = attrs[attrName];
        const normalizedName = attrName.replace(LIGHTNING_DASH_NAME_REGEXP, dashWordCharReplacement);
        element[normalizedName] = attrValue || null;
      }
    }

    /**
     * @param {HTMLElement} element Element to act on
     * @param {Object} values values and attributes to set, if the value is
     *                        falsy it the attribute will be removed
     */
    function synchronizeAttrs(element, attrs) {
      if (element) {
        if (LIGHTNING_TAG_REGEXP.test(element.tagName)) {
          synchronizeLightningElementAttrs(element, attrs);
        } else {
          synchronizeHTMLElementAttrs(element, attrs);
        }
      }
    }

    /**
     * Update the element's attribute with given value.
     * If value is false, the attribute is removed from the element.
     *
     * @param {Object} element - Element
     * @param {string} attrName - Attribute name
     * @param {string|boolean} value - Attribute value
     */
    function reflectAttribute(element, attrName, value) {
      if (!element) {
        return;
      }
      if (typeof value === 'string') {
        element.setAttribute(attrName, value);
      } else if (value === true) {
        element.setAttribute(attrName, '');
      } else if (!value) {
        element.removeAttribute(attrName);
      } else {
        console.warn(`Invalid attribute value for "${attrName}": ${value}`);
      }
    }

    /**
     * Get the actual DOM id for an element
     * @param {HTMLElement|String} el The element to get the id for (string will just be returned)
     *
     * @returns {String} The DOM id or null
     */
    function getRealDOMId(el) {
      if (typeof el === 'string') {
        return el.length > 0 ? el : null;
      }
      return typeof el === 'object' && el !== null ? el.getAttribute('id') : null;
    }

    /**
     * Returns the active element traversing shadow roots
     * @returns {Element} Active Element inside shadow
     */
    function getShadowActiveElement() {
      let activeElement = document.activeElement;
      while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement;
      }
      return activeElement;
    }

    /**
     * Returns the active elements at each shadow root level
     * @returns {Array} Active Elements  at each shadow root level
     */
    function getShadowActiveElements() {
      let activeElement = document.activeElement;
      const shadowActiveElements = [];
      while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
        shadowActiveElements.push(activeElement);
        activeElement = activeElement.shadowRoot.activeElement;
      }
      if (activeElement) {
        shadowActiveElements.push(activeElement);
      }
      return shadowActiveElements;
    }
    function isRTL() {
      // document does not exist on server and MRT does not support RTL below the root component (https://gus.lightning.force.com/lightning/r/ADM_Epic__c/a3QEE000000KEOb2AO/view)
      return isCSR && document.dir === 'rtl';
    }
    function isUndefinedOrNull(value) {
      return value === null || value === undefined;
    }
    function isNotUndefinedOrNull(value) {
      return !isUndefinedOrNull(value);
    }
    const DEFAULT_MODAL_ZINDEX = 9000;
    const DEFAULT_ZINDEX_OFFSET = 100;
    const DEFAULT_ZINDEX_BASELINE = DEFAULT_MODAL_ZINDEX + DEFAULT_ZINDEX_OFFSET;
    /**
     * Returns the zIndex baseline from slds zIndex variable --lwc-zIndexModal.
     * @returns {Number} zIndex baseline
     */
    function getZIndexBaseline() {
      // When SLDS styles are present, typically on Core
      // this currently resolves to: '9000' (string)
      // If function is called in server context, use default as window and document are not available.
      const modalZindexValueLwc = isCSR ? (window.getComputedStyle(document.documentElement) || document.documentElement.style).getPropertyValue('--lwc-zIndexModal') : DEFAULT_MODAL_ZINDEX;
      const baseZindexModalLwc = parseInt(modalZindexValueLwc, 10);
      return isNaN(baseZindexModalLwc) ? DEFAULT_ZINDEX_BASELINE : baseZindexModalLwc + DEFAULT_ZINDEX_OFFSET;
    }
    function timeout(interval) {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(resolve, interval);
      });
    }
    function animationFrame() {
      return new Promise(resolve => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        window.requestAnimationFrame(resolve);
      });
    }

    /**
     *
     * Decorates an input element to fire an "input"
     * event when the value is directly set.
     *
     * @param {HTMLElement} element The element to decorate.
     *
     */
    function decorateInputForDragon(element) {
      const valuePropertyDescriptor = getInputValuePropertyDescriptor(element);
      Object.defineProperty(element, 'value', {
        set(value) {
          valuePropertyDescriptor.set.call(this, value);
          this.dispatchEvent(new CustomEvent('input'));
        },
        get: valuePropertyDescriptor.get,
        enumerable: true,
        configurable: true
      });
    }
    function getInputValuePropertyDescriptor(element) {
      return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value');
    }
    function setDecoratedDragonInputValueWithoutEvent(element, value) {
      const valuePropertyDescriptor = getInputValuePropertyDescriptor(element);
      return valuePropertyDescriptor.set.call(element, value);
    }

    /**
     * Escape HTML string
     * @param {String} html An html string
     * @returns {String} The escaped html string
     */
    function escapeHTML(html) {
      return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }
    const BUTTON_GROUP_ORDER = {
      FIRST: 'first',
      MIDDLE: 'middle',
      LAST: 'last',
      ONLY: 'only'
    };

    /**
     * returns the SLDS class for the given group order
     * @param groupOrder
     * @returns {string}
     */
    function buttonGroupOrderClass(groupOrder) {
      return {
        [BUTTON_GROUP_ORDER.FIRST]: 'slds-button_first',
        [BUTTON_GROUP_ORDER.MIDDLE]: 'slds-button_middle',
        [BUTTON_GROUP_ORDER.LAST]: 'slds-button_last',
        [BUTTON_GROUP_ORDER.ONLY]: 'single-button'
      }[groupOrder];
    }

    /**
     * Checks if the given lightning component is native
     * @param {Object} cmp LightningElement instance
     * @returns {Boolean} Whether the lightning component is native
     */
    function isNativeComponent(cmp) {
      return cmp?.template && !cmp.template.synthetic;
    }

    /**
     * Determine if event is of type FocusEvent (blur or focus). This is required
     * in some cases to prevent these events from bubbling to ensure parity between synthetic
     * and native shadow.
     *
     * 'focus' and 'blur' events that have been propagated manually via CustomEvents are not considered
     * FocusEvents.
     *
     * Corresponding LWC issue: https://github.com/salesforce/lwc/issues/1244
     * Corresponding LBC bug: @W-13236327
     *
     */
    function isBubblingFocusEvent(event) {
      const focusEvents = ['focus', 'blur'];
      return event instanceof FocusEvent && focusEvents.includes(event.type);
    }

    /**
     * Checks if a desktop browser is being used in the enviroment
     * @returns {Boolean} is a desktop browser being used
     */
    function isDesktopBrowser() {
      return formFactor__default.default === 'Large';
    }
    const {
      hasOwn: ObjectHasOwn
    } = Object;
    const {
      hasOwnProperty: ObjectProtoHasOwnProperty
    } = Object.prototype;

    /**
     * Determines if a given object has the specified key as a direct property.
     *
     * @param {Object} object The object to check
     * @param {string} key The property key
     * @returns {Boolean} Whether the given key is a direct property of the object.
     */
    const hasOwn = typeof ObjectHasOwn === 'function' ? ObjectHasOwn : function hasOwn(object, key) {
      return ObjectProtoHasOwnProperty.call(object, key);
    };

    /**
     * Determines if a given object has any direct properties.
     *
     * @param {Object} object The object to check
     * @returns {Boolean} Whether the object has direct properties.
     */
    function hasOwnProperties(object) {
      for (let key in object) {
        if (hasOwn(object, key)) {
          return true;
        }
      }
      return false;
    }

    exports.ARIA = ARIA;
    exports.ARIA_TO_CAMEL = ARIA_TO_CAMEL;
    exports.ArraySlice = ArraySlice;
    exports.BUTTON_GROUP_ORDER = BUTTON_GROUP_ORDER;
    exports.EventEmitter = EventEmitter;
    exports.FALLBACK_URL = FALLBACK_URL;
    exports.Observable = __lwc_component_class_internal;
    exports.VALID_HEADING_LEVELS = VALID_HEADING_LEVELS;
    exports.animationFrame = animationFrame;
    exports.arraysEqual = arraysEqual;
    exports.assert = assert;
    exports.buttonGroupOrderClass = buttonGroupOrderClass;
    exports.classListMutation = classListMutation;
    exports.classSetToString = classSetToString;
    exports.computeAriaInvalid = computeAriaInvalid;
    exports.createEmailHref = createEmailHref;
    exports.createHttpHref = createHttpHref;
    exports.decorateInputForDragon = decorateInputForDragon;
    exports.deepCopy = deepCopy;
    exports.emailRegexString = emailRegexString;
    exports.escapeHTML = escapeHTML;
    exports.getRealDOMId = getRealDOMId;
    exports.getShadowActiveElement = getShadowActiveElement;
    exports.getShadowActiveElements = getShadowActiveElements;
    exports.getZIndexBaseline = getZIndexBaseline;
    exports.guid = guid;
    exports.hasAnimation = hasAnimation;
    exports.hasOnlyAllowedVideoIframes = hasOnlyAllowedVideoIframes;
    exports.hasOwn = hasOwn;
    exports.hasOwnProperties = hasOwnProperties;
    exports.isAbsoluteUrl = isAbsoluteUrl;
    exports.isAndroidOS = isAndroidOS;
    exports.isAriaDescriptionSupported = isAriaDescriptionSupported;
    exports.isBubblingFocusEvent = isBubblingFocusEvent;
    exports.isCSR = isCSR;
    exports.isChrome = isChrome;
    exports.isDesktopBrowser = isDesktopBrowser;
    exports.isHeadingLevelValid = isHeadingLevelValid;
    exports.isIE11 = isIE11;
    exports.isMacOS = isMacOS;
    exports.isNativeComponent = isNativeComponent;
    exports.isNotUndefinedOrNull = isNotUndefinedOrNull;
    exports.isRTL = isRTL;
    exports.isSafari = isSafari;
    exports.isShiftMetaOrControlKey = isShiftMetaOrControlKey;
    exports.isTextIgnoreRTL = isTextIgnoreRTL;
    exports.isUndefinedOrNull = isUndefinedOrNull;
    exports.isValidDate = isValidDate;
    exports.isValidLatitude = isValidLatitude;
    exports.isValidLongitude = isValidLongitude;
    exports.isValidPageReference = isValidPageReference;
    exports.isValidPhone = isValidPhone;
    exports.isWindowsOS = isWindowsOS;
    exports.isiOS = isiOS;
    exports.keyCodes = keyCodes;
    exports.makeAbsoluteUrl = makeAbsoluteUrl;
    exports.makeEverythingExceptElementInert = makeEverythingExceptElementInert;
    exports.newLineRegexString = newLineRegexString;
    exports.normalizeAriaAttribute = normalizeAriaAttribute;
    exports.normalizeArray = normalizeArray;
    exports.normalizeBoolean = normalizeBoolean;
    exports.normalizeKeyValue = normalizeKeyValue;
    exports.normalizeNumber = normalizeNumber;
    exports.normalizeString = normalizeString;
    exports.observePosition = observePosition;
    exports.parseToFormattedLinkifiedParts = parseToFormattedLinkifiedParts;
    exports.parseToFormattedParts = parseToFormattedParts;
    exports.raf = raf;
    exports.reflectAttribute = reflectAttribute;
    exports.restoreInertness = restoreInertness;
    exports.runActionOnBufferedTypedCharacters = runActionOnBufferedTypedCharacters;
    exports.sanitizeURL = sanitizeURL;
    exports.setDecoratedDragonInputValueWithoutEvent = setDecoratedDragonInputValueWithoutEvent;
    exports.synchronizeAttrs = synchronizeAttrs;
    exports.tagRegexString = tagRegexString;
    exports.timeout = timeout;
    exports.toDateTimeFormatOptions = toDateTimeFormatOptions;
    exports.toFormattedDate = toFormattedDate;
    exports.toFormattedLocation = toFormattedLocation;
    exports.toFormattedNumber = toFormattedNumber;
    exports.toNorthAmericanPhoneNumber = toNorthAmericanPhoneNumber;
    exports.updateAriaInvalidOnElement = updateAriaInvalidOnElement;
    exports.urlRegexString = urlRegexString;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('lightning/routingService', ['exports', '@salesforce/client/formFactor', 'lightning/utilsPrivate'], (function (exports, formFactor, utilsPrivate) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var formFactor__default = /*#__PURE__*/_interopDefaultCompat(formFactor);

    const FORM_FACTOR_PHONE = 'Small';
    function shouldDispatchToApp(target, formFactor) {
      const isMobile = formFactor === FORM_FACTOR_PHONE;

      // No target is treated like it were '_self'
      return !target || target === '_self' ||
      // On mobile (hybrid), most resources should be kept inside the app, so we treat _blank as _self in a mobile hybrid app
      isMobile && target === '_blank' ||
      // When _top should be identical to _self.
      // This fixes a number of issues such as unnecessary page reloading in an SPA
      //      and communities URLs not getting handled in the community because
      //      the input URL doesn't have the communities prefix added on
      //      until _self is handled at runtime
      target === '_top' && window.top === window || target === '_parent' && window.parent === window;
    }

    const GET_LINK_INFO_EVENT = 'lightningroutingservicegetlinkinfo';
    const LINK_PROVIDERS = new WeakMap();
    const urlTypes = {
      standard: 'standard_webPage'
    };
    class LinkInfo {
      constructor(url, dispatcher) {
        this.url = url;
        this.dispatcher = dispatcher;
        Object.freeze(this);
      }
    }
    function hasLinkProvider(element) {
      let {
        parentNode
      } = element;
      while (parentNode) {
        if (LINK_PROVIDERS.has(parentNode)) {
          return true;
        }
        parentNode = parentNode.parentNode;
      }
      return false;
    }
    function isLinkProvider(element) {
      return LINK_PROVIDERS.has(element);
    }
    function registerLinkProvider(element, providerFn) {
      let listeners = LINK_PROVIDERS.get(element);
      if (listeners === undefined) {
        listeners = new Set();
        LINK_PROVIDERS.set(element, listeners);
      }
      listeners.add(providerFn);
      element.addEventListener(GET_LINK_INFO_EVENT, providerFn);
    }
    function unregisterLinkProvider(element, providerFn) {
      let listeners = LINK_PROVIDERS.get(element);
      if (listeners) {
        listeners.delete(providerFn);
        if (!listeners.size) {
          LINK_PROVIDERS.delete(element);
        }
      }
      element.removeEventListener(GET_LINK_INFO_EVENT, providerFn);
    }

    /*
     * Mock getLinkInfo
     *
     * @returns {Promise[LinkInfo]}
     */
    function getLinkInfo(element, stateRef) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line lightning-global/no-custom-event-identifier-arguments
        const getLinkInfoEvent = new CustomEvent(GET_LINK_INFO_EVENT, {
          detail: {
            stateRef,
            callback: (err, linkInfo) => {
              if (err) {
                reject(err);
              } else {
                resolve(linkInfo);
              }
            }
          },
          bubbles: true,
          composed: true,
          cancelable: true
        });
        element.dispatchEvent(getLinkInfoEvent);
      });
    }

    /**
     * Determines the route for the given url and updates the element
     * state with the correct url and dispatcher.
     *
     * @param {HTMLElement} element Element from which to dispatch the routing event
     * @param {Object} url Link to route, target Target of the link
     * @param {function} callback on the returned LinkInfo
     *
     * @returns {Promise} Promise[LinkInfo]
     */
    function updateRawLinkInfo(element, {
      url,
      target
    }) {
      if (url === null || url === undefined) {
        // eslint-disable-next-line no-console
        console.error('url must be specified');
      }
      if (utilsPrivate.isCSR && shouldDispatchToApp(target, formFactor__default.default)) {
        return getLinkInfo(element, {
          stateType: urlTypes.standard,
          attributes: {
            url,
            target
          }
        });
      }

      // Return a no-op dispatcher for targets that should be handled by the browser
      return new Promise(resolve => {
        resolve({
          url,
          dispatcher: () => {}
        });
      });
    }

    exports.LinkInfo = LinkInfo;
    exports.getLinkInfo = getLinkInfo;
    exports.hasLinkProvider = hasLinkProvider;
    exports.isLinkProvider = isLinkProvider;
    exports.registerLinkProvider = registerLinkProvider;
    exports.unregisterLinkProvider = unregisterLinkProvider;
    exports.updateRawLinkInfo = updateRawLinkInfo;
    exports.urlTypes = urlTypes;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('lightning/formattedRichText', ['exports', 'lwc', 'lightning/sldsCommon', 'lightning/sldsUtilsThemes', 'lightning/shadowBaseClassPrivate', 'lightning/purifyLib', 'lightning/routingService', 'lightning/utilsPrivate'], (function (exports, lwc, stylesheet0$1, stylesheet2, LightningShadowBaseClass, sanitizeHTML, routingService, utilsPrivate) {

  function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

  var stylesheet0__default = /*#__PURE__*/_interopDefaultCompat(stylesheet0$1);
  var stylesheet2__default = /*#__PURE__*/_interopDefaultCompat(stylesheet2);
  var LightningShadowBaseClass__default = /*#__PURE__*/_interopDefaultCompat(LightningShadowBaseClass);
  var sanitizeHTML__default = /*#__PURE__*/_interopDefaultCompat(sanitizeHTML);

  function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
    var shadowSelector = token ? ("[" + token + "]") : "";
    var hostSelector = token ? ("[" + token + "-host]") : "";
    return [((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) {" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] {")), "line-height: var(--slds-g-font-lineheight);overflow-wrap: break-word;word-wrap: break-word;hyphens: manual;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h1" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h1")), shadowSelector, " {font-size: var(--slds-g-font-scale-1);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h2" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h2")), shadowSelector, " {font-size: var(--slds-g-font-scale-neg-1);font-weight: var(--slds-g-font-weight-7);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h3" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h3")), shadowSelector, " {font-size: var(--slds-g-font-scale-neg-1);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h4" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h4")), shadowSelector, " {font-size: var(--slds-g-font-scale-neg-3);font-weight: var(--slds-g-font-weight-7);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h5" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h5")), shadowSelector, " {font-size: var(--slds-g-font-scale-neg-3);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h6" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h6")), shadowSelector, " {font-size: var(--slds-g-font-scale-neg-4);font-weight: var(--slds-g-font-weight-7);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h1" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h2" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h3" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h4" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h5" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) h6" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ul" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ol" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) dl" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) img" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h1" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h2" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h3" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h4" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h5" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] h6" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ul" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ol" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] dl" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] img")), shadowSelector, " {margin-block-end: var(--slds-g-spacing-3);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) blockquote" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] blockquote")), shadowSelector, " {margin: var(--slds-g-spacing-6) var(--slds-g-spacing-5);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ins" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ins")), shadowSelector, " {color: var(--slds-g-color-success-base-50, var(--slds-g-color-success-base-50));text-decoration: underline;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) del" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] del")), shadowSelector, " {color: var(--slds-g-color-error-base-30, var(--slds-g-color-error-base-50));text-decoration: line-through;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ul" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ul")), shadowSelector, " {margin-inline-start: var(--slds-g-spacing-5);list-style: disc;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ul" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ul")), shadowSelector, " ul", shadowSelector, " {list-style: circle;margin-block-end: 0;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ul" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ul")), shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " {list-style: square;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ul" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ul")), shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " {list-style: disc;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ul" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ul")), shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " {list-style: circle;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ul" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ul")), shadowSelector, " ol", shadowSelector, " {margin-inline-start: var(--slds-g-spacing-5);list-style: decimal;margin-block-end: 0;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ol" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ol")), shadowSelector, " {margin-inline-start: var(--slds-g-spacing-5);list-style: decimal;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ol" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ol")), shadowSelector, " ol", shadowSelector, " {list-style: lower-alpha;margin-block-end: 0;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ol" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ol")), shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " {list-style: lower-roman;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ol" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ol")), shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " {list-style: decimal;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ol" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ol")), shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " {list-style: lower-alpha;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) ol" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] ol")), shadowSelector, " ul", shadowSelector, " {margin-inline-start: var(--slds-g-spacing-5);list-style: disc;margin-block-end: 0;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) dd" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] dd")), shadowSelector, " {margin-inline-start: var(--slds-g-spacing-7);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) abbr[title]" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) acronym[title]" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] abbr[title]" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] acronym[title]")), shadowSelector, " {border-bottom: var(--slds-g-sizing-border-1) dotted;cursor: help;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) table" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] table")), shadowSelector, " {overflow-wrap: normal;word-wrap: normal;word-break: normal;width: auto;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) table" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] table")), shadowSelector, " caption", shadowSelector, " {text-align: center;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) th" + shadowSelector + ",:host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) td" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] th" + shadowSelector + "," + hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] td")), shadowSelector, " {padding: var(--slds-g-spacing-2);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .sans-serif" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .sans-serif")), shadowSelector, " {font-family: sans-serif;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .courier" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .courier")), shadowSelector, " {font-family: courier;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .verdana" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .verdana")), shadowSelector, " {font-family: verdana;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .tahoma" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .tahoma")), shadowSelector, " {font-family: tahoma;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .garamond" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .garamond")), shadowSelector, " {font-family: garamond;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .serif" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .serif")), shadowSelector, " {font-family: serif;}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-1:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-1:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: var(--slds-g-spacing-8);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-1.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-1.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: var(--slds-g-spacing-8);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-2:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-2:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 2);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-2.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-2.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 2);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-3:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-3:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 3);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-3.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-3.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 3);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-4:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-4:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 4);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-4.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-4.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 4);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-5:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-5:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 5);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-5.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-5.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 5);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-6:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-6:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 6);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-6.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-6.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 6);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-7:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-7:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 7);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-7.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-7.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 7);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-8:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-8:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 8);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-8.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-8.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 8);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-9:not(.ql-direction-rtl)" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-9:not(.ql-direction-rtl)")), shadowSelector, " {padding-inline-start: calc(var(--slds-g-spacing-8) * 9);}", ((useActualHostSelector ? ":host([data-render-mode=\"shadow\"].slds-rich-text-editor__output) .ql-indent-9.ql-direction-rtl.ql-align-right" : hostSelector + ".slds-rich-text-editor__output[data-render-mode=\"shadow\"] .ql-indent-9.ql-direction-rtl.ql-align-right")), shadowSelector, " {padding-inline-end: calc(var(--slds-g-spacing-8) * 9);}"].join('');
    /*LWC compiler v7.1.5*/
  }
  var stylesheet1 = [stylesheet];

  var stylesheet0 = [stylesheet0__default.default, stylesheet1, stylesheet2__default.default];

  var _implicitStylesheets = [stylesheet0];

  const $fragment1 = lwc.parseFragment`<span part="formatted-rich-text"${3}>${"t1"}</span>`;
  const stc0 = {
    "part": "formatted-rich-text"
  };
  const stc1 = {
    lwc: {
      dom: "manual"
    }
  };
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, fr: api_fragment, shc: api_sanitize_html_content, h: api_element} = $api;
    return [$cmp.rawTextIfSanitizerThrewError ? api_fragment(0, [api_static_fragment($fragment1, 2, [api_static_part(1, null, api_dynamic_text($cmp.rawTextIfSanitizerThrewError))])], 0) : api_fragment(0, [api_element("span", {
      attrs: stc0,
      props: {
        innerHTML: $ctx._rawHtml$0 !== ($ctx._rawHtml$0 = $cmp.richText) ? $ctx._sanitizedHtml$0 = api_sanitize_html_content($cmp.richText) : $ctx._sanitizedHtml$0
      },
      context: stc1,
      key: 3
    })], 0)];
    /*LWC compiler v7.1.5*/
  }
  var _tmpl = lwc.registerTemplate(tmpl);
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-4nfn2rc40ch";
  tmpl.legacyStylesheetToken = "lightning-formattedRichText_formattedRichText";
  if (_implicitStylesheets) {
    tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
  }
  lwc.freezeTemplate(tmpl);

  const tagsWhitelist = Object.freeze(['a', 'abbr', 'acronym', 'address', 'b', 'br', 'big', 'blockquote', 'caption', 'cite', 'code', 'col', 'colgroup', 'del', 'div', 'dl', 'dd', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'ins', 'kbd', 'li', 'ol', 'mark', 'p', 'param', 'pre', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'tt', 'u', 'ul', 'var', 'strike', 'font']);
  const attrWhitelist = Object.freeze(['accept', 'action', 'align', 'alt', 'autocomplete', 'background', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'coords', 'datetime', 'default', 'dir', 'disabled', 'download', 'enctype', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'ismap', 'label', 'lang', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'multiple', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'span', 'srclang', 'start', 'src', 'step', 'style', 'summary', 'tabindex', 'target', 'title', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'data-fileid']);
  const uriAllowList = Object.freeze(['ftp', 'ftps', 'http', 'https', 'mailto', 'tel', 'callto', 'cid', 'xmpp', 'ciscotel', 'navision']);
  const uriAllowListString = uriAllowList.join('|');
  // eslint-disable-next-line no-useless-escape
  const allowedUriRegString = `^(?:(?:${uriAllowListString}):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))`;
  const allowedUriRegEx = new RegExp(allowedUriRegString, 'i');
  const richTextConfig = Object.freeze({
    ALLOWED_TAGS: tagsWhitelist,
    ALLOWED_ATTR: attrWhitelist,
    ALLOWED_URI_REGEXP: allowedUriRegEx,
    ALLOW_UNKNOWN_PROTOCOLS: false
  });

  function linkTextNodes(container) {
    const urlRegex = new RegExp(`^${utilsPrivate.urlRegexString}/?$`, 'i');
    const emailRegex = new RegExp(`^${utilsPrivate.emailRegexString}$`, 'i');
    const toReplace = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const currentNode = walker.currentNode;
      const parent = walker.currentNode.parentNode;
      if (parent.nodeName === 'A') {
        // Do not add double a tags
        continue;
      }
      // &quot; = legacy supported edge case for docs
      // ; = urls cannot have semicolons
      // ["'] = common to quote links in docs
      const items = walker.currentNode.nodeValue.split(/(&quot;|;|["']?\s+["']?|["'])/g);
      const fragment = document.createDocumentFragment();
      let hasLink = false;
      items.forEach((text, i) => {
        if (i % 2 === 0) {
          if (text.match(urlRegex)) {
            const a = document.createElement('a');
            a.href = utilsPrivate.createHttpHref(text);
            a.target = '_blank';
            a.rel = 'noopener';
            a.appendChild(document.createTextNode(text));
            fragment.appendChild(a);
            hasLink = true;
          } else if (text.match(emailRegex)) {
            const a = document.createElement('a');
            a.href = utilsPrivate.createEmailHref(text);
            a.appendChild(document.createTextNode(text));
            fragment.appendChild(a);
            hasLink = true;
          } else if (text) {
            fragment.appendChild(document.createTextNode(text));
          }
        } else if (text) {
          fragment.appendChild(document.createTextNode(text));
        }
      });
      if (hasLink) {
        toReplace.push({
          parent,
          fragment,
          currentNode
        });
      }
    }
    toReplace.forEach(({
      parent,
      fragment,
      currentNode
    }) => {
      parent.replaceChild(fragment, currentNode);
    });
  }

  const linkRegex = new RegExp(`${utilsPrivate.tagRegexString}|${utilsPrivate.emailRegexString}|${utilsPrivate.urlRegexString}`, 'gi');
  const createHttpLink = function (match) {
    const href = utilsPrivate.createHttpHref(match);
    return `<a href="${href}" target="_blank" rel="noopener">${match}</a>`;
  };
  const createEmailLink = function (match) {
    const href = utilsPrivate.createEmailHref(match);
    return `<a href="${href}">${match}</a>`;
  };

  // SSR is not impacted by security vunerabilities and cannot use the DOM (see W-14765820)
  const linkTextNodesSSR = function (text) {
    if (typeof text !== 'string') {
      return '';
    }
    return text.replace(linkRegex, (match, tagMatch, emailMatch, hrefMatch) => {
      if (tagMatch) {
        return tagMatch;
      } else if (hrefMatch) {
        const endsWithQuote = hrefMatch.endsWith('&quot');
        let href = hrefMatch;
        if (endsWithQuote) {
          href = hrefMatch.slice(0, hrefMatch.lastIndexOf('&quot'));
        }
        return createHttpLink(href) + (endsWithQuote ? '&quot' : '');
      } else if (emailMatch) {
        return createEmailLink(emailMatch);
      }
      return match;
    });
  };

  // Overriding default sanitization hook to disable it.
  // Content is conditionally sanitized within the component
  // https://lwc.dev/guide/html_templates#override-the-sanitizehtmlcontent(content)-method
  // W-16437378 - Remove this section once setHooks has been removed globally
  try {
    lwc.setHooks({
      sanitizeHtmlContent(rawHTMLString) {
        return rawHTMLString;
      }
    });
  } catch (e) {
    // Do nothing because setHooks is getting
    // called at the app/framework level.
  }

  /**
   * Displays rich text that's formatted with allowed tags and attributes.
   * Other tags and attributes are removed and only their text content is displayed.
   */

  /**
   * W-15751242 resulted in major updates to formatted-rich-text depending on render mode.
   * If loaded in CSR, content gets sanitized. This is rendered as text.
   * If loaded in SSR, content does not get sanitized until it reaches the client.
   */
  class LightningFormattedRichText extends LightningShadowBaseClass__default.default {
    constructor(...args) {
      super(...args);
      this.rendered = false;
      this._value = '';
      this._disableLinkify = false;
      this.connected = false;
      this.richText = null;
      this.rawTextIfSanitizerThrewError = null;
      this.serverRenderedContent = null;
      this.linkingRequired = false;
    }
    /**
     * If present, the component does not create links in the rich text.
     * @type {boolean}
     * @default false
     */
    get disableLinkify() {
      return this._disableLinkify;
    }
    set disableLinkify(val) {
      this._disableLinkify = utilsPrivate.normalizeBoolean(val);
      this.renderRichText();
    }

    /**
     * Sets the rich text to display.
     * @type {string}
     *
     */
    get value() {
      return this._value;
    }
    set value(val) {
      this._value = val === undefined || val === null ? '' : String(val);
      this.renderRichText();
    }
    renderedCallback() {
      if (this.linkingRequired) {
        this.linkRichText();
      }
      if (!this.rendered) {
        this.rendered = true;
        this.renderRichText();
      }
    }
    connectedCallback() {
      super.connectedCallback();
      this.classList.add('slds-rich-text-editor__output');
      this.connected = true;

      // Checks if CSR currently & previously rendered in SSR.
      // This checks if markup already exists in the DOM.
      if (utilsPrivate.isCSR) {
        // eslint-disable-next-line @lwc/lwc/no-inner-html
        this.serverRenderedContent = this.container?.innerHTML;
        if (this.serverRenderedContent) {
          // Syncing server rendered DOM and client component state
          // ensures we render server side non-sanitized content, instead
          // of client side sanitized content, on first paint.
          this.richText = this.serverRenderedContent;
        }
      }
    }
    disconnectedCallback() {
      this.removeLinkClickListeners();
      this.connected = false;
    }
    sanitize(value) {
      if (!value) {
        return value;
      }
      let computedRichTextConfig = richTextConfig;
      if (utilsPrivate.hasOnlyAllowedVideoIframes(value)) {
        // richTextConfig is shared across all formatted-rich-text components;
        // so create and modify copy of richTextConfig to allow iframes for each component
        computedRichTextConfig = {
          ...richTextConfig,
          ALLOWED_TAGS: richTextConfig.ALLOWED_TAGS.concat(['iframe']),
          ALLOWED_ATTR: richTextConfig.ALLOWED_ATTR.concat(['allowfullscreen'])
        };
      }
      try {
        return sanitizeHTML__default.default(value, computedRichTextConfig);
      } catch {
        // If sanitize failed, throw the unsanitized value to be rendered as text
        throw new Error(`
                <lightning-formatted-rich-text> Exception caught when attempting to sanitize: ${value}`, {
          cause: {
            unsanitizedRawText: value
          }
        });
      }
    }
    handleClick(event) {
      const anchor = event.currentTarget;
      if (anchor === null) {
        return;
      }
      const target = anchor.target;
      const url = anchor.href;
      // Grab the link info onclick and dispatch
      routingService.updateRawLinkInfo(this, {
        url,
        target
      }).then(linkInfo => {
        anchor.href = linkInfo.url;
        linkInfo.dispatcher(event);
      });
    }
    renderRichText() {
      if (!utilsPrivate.isCSR) {
        // If SSR, do not sanitize the value on server, just link if required.
        this.richText = this.disableLinkify ? this.value : linkTextNodesSSR(this.value);
      }
      if (this.rendered) {
        try {
          // Sanitizer did not throw an error, so this value is cleared
          this.rawTextIfSanitizerThrewError = null;

          // Render richText if the value changes or if previously set in SSR
          this.richText = this.sanitize(this.value);

          // Linking needs to be added in a second tick as the DOM has not been updated yet
          this.linkingRequired = true;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(e.message);
          this.richText = null;

          // If sanitizer throws an error & the value was not sanitized,
          // render it as an unsanitized text value
          this.rawTextIfSanitizerThrewError = e.cause.unsanitizedRawText;
        }
      }
    }
    linkRichText() {
      if (!this.disableLinkify) {
        linkTextNodes(this.container);
      }
      this.links.forEach(link => {
        link.addEventListener('click', this.handleClick.bind(this));
      });
      this.linkingRequired = false;
    }
    removeLinkClickListeners() {
      this.links.forEach(link => {
        link.removeEventListener('click', this.handleClick.bind(this));
      });
    }
    get links() {
      return this.container ? [...this.container.querySelectorAll('a')] : [];
    }
    get container() {
      return this.template.querySelector('span');
    }
    /*LWC compiler v7.1.5*/
  }
  LightningFormattedRichText.validationOptOut = ['class'];
  lwc.registerDecorators(LightningFormattedRichText, {
    publicProps: {
      disableLinkify: {
        config: 3
      },
      value: {
        config: 3
      }
    },
    fields: ["rendered", "_value", "_disableLinkify", "connected", "richText", "rawTextIfSanitizerThrewError", "serverRenderedContent", "linkingRequired"]
  });
  const __lwc_component_class_internal = lwc.registerComponent(LightningFormattedRichText, {
    tmpl: _tmpl,
    sel: "lightning-formatted-rich-text",
    apiVersion: 62
  });

  exports.default = __lwc_component_class_internal;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('lightning/formattedText', ['exports', 'lwc', 'lightning/sldsCommon', 'lightning/shadowBaseClassPrivate', 'lightning/utilsPrivate'], (function (exports, lwc, stylesheet0$1, LightningShadowBaseClass, utilsPrivate) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var stylesheet0__default = /*#__PURE__*/_interopDefaultCompat(stylesheet0$1);
    var LightningShadowBaseClass__default = /*#__PURE__*/_interopDefaultCompat(LightningShadowBaseClass);

    var stylesheet0 = [stylesheet0__default.default];

    var _implicitStylesheets = [stylesheet0];

    const $fragment1 = lwc.parseFragment`<a target="_blank"${"a0:href"} rel="noopener"${3}>${"t1"}</a>`;
    const $fragment2 = lwc.parseFragment`<br${3}>`;
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {k: api_key, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, t: api_text, i: api_iterator} = $api;
      return api_iterator($cmp.formattedParts, function (part) {
        return [part.isLink ? api_static_fragment($fragment1, api_key(1, part.key), [api_static_part(0, {
          attrs: {
            "href": part.href
          }
        }, null), api_static_part(1, null, api_dynamic_text(part.value))]) : null, part.isText ? api_text(api_dynamic_text(part.value)) : null, part.isNewline ? api_static_fragment($fragment2, api_key(3, part.key)) : null];
      });
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-f6gbo863ml";
    tmpl.legacyStylesheetToken = "lightning-formattedText_formattedText";
    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    /**
     * Displays text, replaces newlines with line breaks, and linkifies if requested.
     */
    class FormattedText extends LightningShadowBaseClass__default.default {
      constructor(...args) {
        super(...args);
        /**
         * Sets the text to display.
         * @type {string}
         *
         */
        this.value = '';
        this._linkify = false;
      }
      /**
       * If present, URLs and email addresses are displayed in anchor tags.
       * They are displayed in plain text by default.
       * @type {boolean}
       * @default false
       */
      get linkify() {
        return this._linkify;
      }
      set linkify(value) {
        this._linkify = utilsPrivate.normalizeBoolean(value);
      }
      get formattedParts() {
        if (!this.value || typeof this.value !== 'string') {
          return [];
        }
        return this.linkify ? utilsPrivate.parseToFormattedLinkifiedParts(this.value) : utilsPrivate.parseToFormattedParts(this.value);
      }
      /*LWC compiler v7.1.5*/
    }
    lwc.registerDecorators(FormattedText, {
      publicProps: {
        value: {
          config: 0
        },
        linkify: {
          config: 3
        }
      },
      track: {
        _linkify: 1
      }
    });
    const __lwc_component_class_internal = lwc.registerComponent(FormattedText, {
      tmpl: _tmpl,
      sel: "lightning-formatted-text",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('force/ldsBindings', ['exports', 'lwc'], (function (exports, lwc) {

    // instrumentation keys to be imported by ldsInstrumentation
    const REFRESH_ADAPTER_EVENT = 'refresh-adapter-event';
    const ADAPTER_UNFULFILLED_ERROR = 'adapter-unfulfilled-error';
    const USERLAND_PROVISION_ERROR_MESSAGE = "LWC component's @wire target property or method threw an error during value provisioning. Original error:";
    const ADAPTER_SNAPSHOT_REJECTED_MESSAGE = 'Luvio wire adapter Promise<Snapshot> rejected. Original error:';
    const USERLAND_GRAPHQL_PARSER_ERROR_MESSAGE = 'Use `gql` parser to parse your "query" string';

    // map of emitted object -> [ adapter name, snapshot ]; snapshot is only undefined for the
    // initially-emitted { data: undefined, error: undefined } value
    const dataToTupleWeakMap = new WeakMap();
    var SnapshotState$1;
    (function (SnapshotState) {
      SnapshotState["Fulfilled"] = "Fulfilled";
      SnapshotState["Unfulfilled"] = "Unfulfilled";
      SnapshotState["Error"] = "Error";
      SnapshotState["Pending"] = "Pending";
      SnapshotState["Stale"] = "Stale";
    })(SnapshotState$1 || (SnapshotState$1 = {}));
    function isErrorSnapshot$1(snapshot) {
      return snapshot.state === SnapshotState$1.Error;
    }
    function isFulfilledSnapshot(snapshot) {
      return snapshot.state === SnapshotState$1.Fulfilled;
    }
    function isStaleSnapshot(snapshot) {
      return snapshot.state === SnapshotState$1.Stale;
    }
    function isUnfulfilledSnapshot(snapshot) {
      return snapshot.state === SnapshotState$1.Unfulfilled;
    }
    /**
     * Transform a Snapshot into a payload suitable for passing to a DataCallback.
     *
     * @param snapshot Snapshot
     */
    function snapshotToPayload$1(snapshot) {
      if (snapshot === undefined) {
        return {
          data: undefined,
          error: undefined
        };
      }
      if (isErrorSnapshot$1(snapshot)) {
        return {
          data: undefined,
          error: snapshot.error
        };
      }
      // fulfilled or stale
      return {
        data: snapshot.data,
        error: undefined
      };
    }
    function bindWireRefresh$1(luvio) {
      return function refresh(data) {
        return refreshData(data, dataToTupleWeakMap, luvio);
      };
    }
    function refreshData(data, dataToTuple, luvio) {
      const tuple = dataToTuple.get(lwc.unwrap(data));
      if (tuple === undefined) {
        {
          throw new Error('Refresh failed because resolved configuration is not available.');
        }
      }
      const [adapterName, snapshot] = tuple;
      luvio.instrument(() => {
        return {
          [REFRESH_ADAPTER_EVENT]: true,
          adapterName
        };
      });
      // snapshot is undefined when a caller refreshes the initial
      // { data: undefined, error: undefined } object that we emitted
      if (snapshot === undefined) {
        return Promise.resolve(undefined);
      }
      return luvio.refreshSnapshot(snapshot).then(refreshed => {
        if (isErrorSnapshot$1(refreshed)) {
          throw refreshed.error;
        }
        {
          if (isUnfulfilledSnapshot(refreshed)) {
            throw new Error('Refresh resulted in unfulfilled snapshot');
          }
        }
        return undefined;
      });
    }
    function isPromise$1(value) {
      // check for Thenable due to test frameworks using custom Promise impls
      return value.then !== undefined;
    }
    const {
      isArray
    } = Array;
    const {
      stringify
    } = JSON;

    /**
     * (Re)throws an error after adding a prefix to the message.
     *
     * @param error Error
     * @param messagePrefix prefix to add to error's message
     */
    function throwAnnotatedError(error, messagePrefix) {
      if (error instanceof Error) {
        error.message = `${messagePrefix}\n[${error.message}]`;
        throw error;
      }
      throw new Error(`${messagePrefix}\n[${stringify(error)}]`);
    }
    class Sanitizer {
      constructor(obj) {
        this.obj = obj;
        this.copy = {};
        this.currentPath = {
          key: '',
          value: obj,
          parent: null,
          data: this.copy
        };
      }
      sanitize() {
        const sanitizer = this;
        stringify(this.obj, function (key, value) {
          if (key === '') {
            return value;
          }
          const parent = this;
          if (parent !== sanitizer.currentPath.value) {
            sanitizer.exit(parent);
          }
          if (typeof value === 'object' && value !== null) {
            sanitizer.enter(key, value);
            return value;
          }
          sanitizer.currentPath.data[key] = value;
          return value;
        });
        return this.copy;
      }
      enter(key, value) {
        const {
          currentPath: parentPath
        } = this;
        const data = parentPath.data[key] = isArray(value) ? [] : {};
        this.currentPath = {
          key,
          value,
          parent: parentPath,
          data
        };
      }
      exit(parent) {
        while (this.currentPath.value !== parent) {
          this.currentPath = this.currentPath.parent || this.currentPath;
        }
      }
    }
    /**
     * Returns a sanitized version of an object by recursively unwrapping the Proxies.
     *
     * In order to keep luvio performance optimal on IE11, we need to make sure that luvio code gets
     * transformed by the es5-proxy-compat. At the same time we need to ensure that no ProxyCompat leaks
     * into the luvio engine code nor into the adapters. All the data coming from LWC-land need to be
     * sanitized first.
     */
    function sanitize(obj) {
      return new Sanitizer(obj).sanitize();
    }
    class LWCLuvioWireAdapter {
      /**
       * Constructs a new wire adapter instance for the given adapter.
       *
       * @param callback callback to be invoked with new values
       */
      constructor(adapter, name, luvio, callback, sourceContext) {
        // a component can be connected-disconnected-reconnected multiple times during its
        // life but we only want to keep subscriptions active while it is connected; the
        // connect/disconnect methods below keep this value updated to reflect the current
        // state
        this.connected = false;
        this.adapter = adapter;
        this.name = name;
        this.luvio = luvio;
        this.callback = callback;
        this.sourceContext = sourceContext;
        // initialize the wired property with a properly shaped object so cmps can use <template if:true={wiredProperty.data}>
        this.emit();
      }
      // WireAdapter interface methods
      /**
       * Called when the component associated with the wire adapter is connected.
       */
      connect() {
        this.connected = true;
        this.callAdapter(this.generateAdapterRequestContext());
      }
      /**
       * Called when the component associated with the wire adapter is disconnected.
       */
      disconnect() {
        this.unsubscribe();
        this.connected = false;
      }
      /**
       * Called when new or updated config is supplied to the wire adapter.
       *
       * @param config new config parameters for the wire adapter
       * @param _context not used
       */
      update(config, context) {
        this.unsubscribe();
        this.config = sanitize(config);
        this.callAdapter(this.generateAdapterRequestContext(context));
      }
      // private and protected utility methods
      /**
       * Accepts a WireContext and generates corresponding AdapterRequestContext
       */
      generateAdapterRequestContext(_context) {
        if (!this.sourceContext) {
          return {};
        }
        return {
          sourceContext: {
            ...this.sourceContext
          }
        };
      }
      /**
       * Calls the adapter if config has been set and the component is connected.
       */
      callAdapter(context) {
        if (!this.connected || this.config === undefined) {
          return;
        }
        const snapshotOrPromise = this.adapter(this.config, context);
        this.processAdapterResponse(snapshotOrPromise);
      }
      processAdapterResponse(snapshotOrPromise) {
        // insufficient config, wait for new config from component
        if (snapshotOrPromise === null) {
          return;
        }
        const configForSnapshot = this.config;
        const emitAndSubscribe = snapshot => {
          // adapters leveraging adapter context could asynchronously
          // return null (due to invalid config)
          if (snapshot === null) {
            return;
          }
          // We should never broadcast an unfulfilled snapshot to a component
          if (isUnfulfilledSnapshot(snapshot)) {
            {
              throw new Error(`Unfulfilled snapshot emitted to component from subscription, missingPaths: ${snapshot.missingPaths.keysAsArray()}`);
            }
          }
          // if config has changed before the snapshot arrives then ignore snapshot
          if (this.config !== configForSnapshot) {
            return;
          }
          // emit unless snapshot is pending
          if (isFulfilledSnapshot(snapshot) || isErrorSnapshot$1(snapshot) || isStaleSnapshot(snapshot)) {
            this.emit(snapshot);
          }
          // subscribe to the new snapshot
          this.subscribe(snapshot);
        };
        // Data resolved sync
        if (!isPromise$1(snapshotOrPromise)) {
          emitAndSubscribe(snapshotOrPromise);
        } else {
          // We want to let errors from this promise propagate to the app container,
          // which is why we do not have a reject handler here.
          // If an error is thrown here, it means that there was an error somewhere
          // inside an adapter which means that there was a mistake by the implementor.
          // Errors that come from the network should never hit this block because
          // they are treated like regular snapshots, not true error paths.
          snapshotOrPromise.then(emitAndSubscribe, error => throwAnnotatedError(error, ADAPTER_SNAPSHOT_REJECTED_MESSAGE));
        }
      }
      /**
       * Emits new values to the callback.
       *
       * @param snapshot Snapshot to be emitted, if omitted then undefineds will be emitted
       */
      emit(snapshot) {
        const payload = snapshotToPayload$1(snapshot);
        dataToTupleWeakMap.set(payload, [this.name, snapshot]);
        try {
          this.callback(payload);
        } catch (error) {
          if (error instanceof Error) {
            throwAnnotatedError(error, USERLAND_PROVISION_ERROR_MESSAGE);
          }
        }
      }
      /**
       * Subscribes this wire adapter to future changes to the specified snapshot. Any changes
       * to the snapshot will be automatically emitted to the component.
       *
       * @param snapshot Snapshot
       * @param subscriptionCallback callback
       */
      subscribe(snapshot) {
        // always clean up any old subscription that we might have
        this.unsubscribe();
        // but only subscribe if component is currently connected
        if (this.connected) {
          this.unsubscriber = this.luvio.storeSubscribe(snapshot, this.emit.bind(this));
        }
      }
      /**
       * Deletes this wire adapter's snapshot subscription (if any).
       */
      unsubscribe() {
        // clean up subscription
        if (this.unsubscriber !== undefined) {
          this.unsubscriber();
          this.unsubscriber = undefined;
        }
      }
    }
    /**
     * Wraps a luvio Adapter in a WireAdapterConstructor that conforms to https://rfcs.lwc.dev/rfcs/lwc/0000-wire-reform#wire-adapter-protocol.
     *
     * @param adapter Adapter
     * @param name name to assign to the generated constructor
     * @param luvio Luvio
     */
    function createWireAdapterConstructor$1(adapter, name, luvio) {
      const constructor = function (callback, sourceContext) {
        const delegate = new LWCLuvioWireAdapter(adapter, name, luvio, callback, sourceContext);
        this.connect = () => delegate.connect();
        this.disconnect = () => delegate.disconnect();
        this.update = (config, context) => delegate.update(config, context);
      };
      Object.defineProperty(constructor, 'name', {
        value: name
      });
      return constructor;
    }
    class LWCInfinteScrollingLuvioWireAdapter extends LWCLuvioWireAdapter {
      /**
       * Called when the component associated with the wire adapter is connected.
       */
      connect() {
        this.connectTimestamp = Date.now();
        super.connect();
      }
      /**
       * Called when the component associated with the wire adapter is disconnected.
       */
      disconnect() {
        this.connectTimestamp = undefined;
        super.disconnect();
      }
      /**
       * Called when new or updated config is supplied to the wire adapter.
       *
       * @param config new config parameters for the wire adapter
       * @param context context for the wire adapter
       */
      update(config, context) {
        if (this.connectTimestamp) {
          const adapterRequestContext = this.generateAdapterRequestContext(context);
          super.unsubscribe();
          this.config = sanitize(config);
          // this.callAdapterWithContext(mergedContext);
          super.callAdapter(adapterRequestContext);
        } else {
          super.update(config, context);
        }
      }
      generateAdapterRequestContext(context) {
        const baseContext = super.generateAdapterRequestContext(context);
        // this code-path is only called when the wire adapter is connected
        // and the connectTimestamp is set
        return {
          ...baseContext,
          cachePolicy: {
            type: 'valid-at',
            timestamp: this.connectTimestamp
          }
        };
      }
      subscribe(snapshot) {
        var _a;
        super.subscribe(snapshot);
        // if the snapshot is refreshed we should stop using data from before the refresh
        if (this.connected && ((_a = snapshot.refresh) === null || _a === void 0 ? void 0 : _a.resolve)) {
          const originalResolve = snapshot.refresh.resolve;
          snapshot.refresh.resolve = config => {
            this.connectTimestamp = Date.now();
            return originalResolve(config);
          };
        }
      }
      /*LWC compiler v7.1.5*/
    }
    function createInfiniteScrollingWireAdapterConstructor$1(adapter, name, luvio) {
      const constructor = function (callback, sourceContext) {
        const delegate = new LWCInfinteScrollingLuvioWireAdapter(adapter, name, luvio, callback, sourceContext);
        this.connect = () => delegate.connect();
        this.disconnect = () => delegate.disconnect();
        this.update = (config, context) => delegate.update(config, context);
      };
      Object.defineProperty(constructor, 'name', {
        value: name
      });
      return constructor;
    }
    function snapshotToPayload(snapshot) {
      const payload = {
        data: undefined,
        errors: undefined
      };
      if (snapshot === undefined) {
        return payload;
      }
      payload.data = extractSnapshotData(snapshot);
      // TODO handle batch error scenarios.
      if ('error' in snapshot && snapshot.error !== undefined) {
        if (Array.isArray(snapshot.error)) {
          payload.errors = snapshot.error;
        } else {
          payload.errors = [snapshot.error];
        }
      }
      return payload;
    }
    class LWCGraphQLLuvioWireAdapter extends LWCLuvioWireAdapter {
      constructor(adapter, name, luvio, astResolver, callback, sourceContext) {
        super(adapter, name, luvio, callback, sourceContext);
        this.astResolver = astResolver;
      }
      update(config, context) {
        this.unsubscribe();
        if (config.batchQuery) {
          this.config = {
            batchQuery: config.batchQuery.map(individualConfig => safeSanitizeGraphQLConfigObject(individualConfig))
          };
        } else {
          this.config = safeSanitizeGraphQLConfigObject(config);
        }
        this.callAdapter(super.generateAdapterRequestContext(context));
      }
      /**
       * Emits new values to the callback.
       *
       * @param snapshot Snapshot to be emitted, if omitted then undefineds will be emitted
       */
      emit(snapshot) {
        const payload = snapshotToPayload(snapshot);
        dataToTupleWeakMap.set(payload, [this.name, snapshot]);
        try {
          this.callback(payload);
        } catch (error) {
          if (error instanceof Error) {
            throwAnnotatedError(error, USERLAND_PROVISION_ERROR_MESSAGE);
          }
        }
      }
      /**
       * Coerce config before calling the adapter, preserve current behavior otherwise
       */
      callAdapter(context) {
        if (!this.connected || this.config === undefined) {
          return;
        }
        const config = this.config;
        if ('batchQuery' in config) {
          const batchConfig = {
            batchQuery: config.batchQuery.map(individualConfig => this.resolveQueryAst(individualConfig))
          };
          // If any of the configurations are invalid, we bail out of calling the adapter.
          if (batchConfig.batchQuery.some(val => val === undefined)) {
            return;
          }
          const snapshotOrPromise = this.adapter(batchConfig, context);
          this.processAdapterResponse(snapshotOrPromise);
        } else if ('query' in config) {
          const singleConfig = this.resolveQueryAst(config);
          if (singleConfig !== undefined) {
            const snapshotOrPromise = this.adapter(singleConfig, context);
            this.processAdapterResponse(snapshotOrPromise);
          }
        }
      }
      resolveQueryAst(config) {
        if (config.query === null) {
          return;
        }
        const ast = this.astResolver(config.query);
        if (ast === undefined && config.query !== undefined) {
          // this should only happen if the user didn't parse the query
          {
            throw new Error(USERLAND_GRAPHQL_PARSER_ERROR_MESSAGE);
          }
        }
        const resolvedAdapterConfig = {
          ...config,
          query: ast
        };
        return resolvedAdapterConfig;
      }
      /*LWC compiler v7.1.5*/
    }
    function extractSnapshotData(snapshot) {
      if ('data' in snapshot && snapshot.data !== undefined) {
        const isSingleGraphQLData = 'data' in snapshot.data && snapshot.data.data !== undefined;
        const isBatchGraphQLData = 'results' in snapshot.data && snapshot.data.results !== undefined;
        if (isSingleGraphQLData) return snapshot.data.data;
        if (isBatchGraphQLData) return snapshot.data;
      }
    }
    /**
     * Wraps a luvio Adapter in a WireAdapterConstructor that conforms to https://rfcs.lwc.dev/rfcs/lwc/0000-wire-reform#wire-adapter-protocol.
     *
     * @param adapter Adapter
     * @param name name to assign to the generated constructor
     * @param luvio Luvio
     */
    function createGraphQLWireAdapterConstructor$1(adapter, name, luvio, astResolver) {
      const constructor = function (callback, sourceContext) {
        const delegate = new LWCGraphQLLuvioWireAdapter(adapter, name, luvio, astResolver, callback, sourceContext);
        this.connect = () => delegate.connect();
        this.disconnect = () => delegate.disconnect();
        this.update = (config, context) => delegate.update(config, context);
      };
      Object.defineProperty(constructor, 'name', {
        value: name
      });
      return constructor;
    }
    function safeSanitizeGraphQLConfigObject(config) {
      // graphql query AST is passed by reference
      // sanitizing it makes a copy and we lose that reference
      // so we avoid sanitizing it
      return {
        ...sanitize(config),
        query: config.query
      };
    }

    // For use by callers within this module to instrument interesting things.
    let instrumentation = {
      refreshCalled: _fromSource => {},
      instrumentAdapter: (adapter, _metadata) => {
        return adapter;
      }
    };
    /**
     * Allows external modules (typically a runtime environment) to set
     * instrumentation hooks for this module. Note that the hooks are
     * incremental - hooks not suppiled in newInstrumentation will retain
     * their previous values. The default instrumentation hooks are no-ops.
     *
     * @param newInstrumentation instrumentation hooks to be overridden
     */
    function instrument(newInstrumentation) {
      instrumentation = Object.assign(instrumentation, newInstrumentation);
    }
    exports.refresh = void 0;
    function bindWireRefresh(luvio) {
      const wireRefresh = bindWireRefresh$1(luvio);
      exports.refresh = (data, apiFamily) => {
        instrumentation.refreshCalled(apiFamily);
        return wireRefresh(data);
      };
    }
    function createInstrumentedAdapter(adapter, metadata) {
      return instrumentation.instrumentAdapter(adapter, metadata);
    }
    function createLDSAdapter(luvio, name, factory) {
      return factory(luvio);
    }
    const {
      create,
      defineProperty,
      defineProperties
    } = Object;
    var SnapshotState;
    (function (SnapshotState) {
      SnapshotState["Fulfilled"] = "Fulfilled";
      SnapshotState["Unfulfilled"] = "Unfulfilled";
      SnapshotState["Error"] = "Error";
      SnapshotState["Pending"] = "Pending";
      SnapshotState["Stale"] = "Stale";
    })(SnapshotState || (SnapshotState = {}));
    function isErrorSnapshot(snapshot) {
      return snapshot.state === SnapshotState.Error;
    }
    function isPendingSnapshot(snapshot) {
      return snapshot.state === SnapshotState.Pending;
    }
    function isPromise(value) {
      // check for Thenable due to test frameworks using custom Promise impls
      return value !== null && value.then !== undefined;
    }
    function snapshotToTuple$1(snapshot) {
      if (isErrorSnapshot(snapshot)) {
        return {
          data: undefined,
          error: snapshot.error
        };
      }
      // We might still get pending snapshot here from invoke calls here
      return {
        data: snapshot.data,
        error: undefined
      };
    }
    function createInvalidConfigError$1() {
      return {
        data: undefined,
        error: {
          ok: false,
          status: 400,
          statusText: 'INVALID_CONFIG',
          body: undefined,
          headers: {},
          errorType: 'fetchResponse'
        }
      };
    }
    /**
     * Creates an imperative adapter
     *
     * @param luvio Luvio
     * @param adapter luvio adapter
     * @param metadata AdapterMetadata
     * @returns Imperative adapter object with invoke and subscribe functions
     */
    function createImperativeAdapter(luvio, adapter, metadata) {
      const {
        name
      } = metadata;
      const imperativeAdapterInvoke = (config, requestContext, callback) => {
        const snapshotOrPromise = adapter(config, requestContext);
        if (snapshotOrPromise === null) {
          callback(createInvalidConfigError$1());
          return;
        }
        if (!isPromise(snapshotOrPromise)) {
          callback(snapshotToTuple$1(snapshotOrPromise));
          return;
        }
        snapshotOrPromise.then(snapshot => {
          if (snapshot === null) {
            callback(createInvalidConfigError$1());
            return;
          }
          callback(snapshotToTuple$1(snapshot));
        }).finally(() => {
          luvio.storeCleanup();
        });
      };
      defineProperty(imperativeAdapterInvoke, 'name', {
        value: `${name}_invoke`
      });
      // Invokes the adapter and subscribes to the received snapshot
      // Returns an unsubscribe function to the consumer
      const imperativeAdapterSubscribe = (config, requestContext, callback) => {
        let subscriberCallback = callback;
        let unsub;
        const snapshotOrPromise = adapter(config, requestContext);
        if (snapshotOrPromise === null) {
          subscriberCallback(createInvalidConfigError$1());
          return () => {};
        }
        // Can rebuild lead to pending snapshots?
        const luvioStoreSubscribe = snapshot => {
          unsub = luvio.storeSubscribe(snapshot, snapshotFromRebuild => {
            if (subscriberCallback !== null && !isPendingSnapshot(snapshotFromRebuild)) {
              subscriberCallback(snapshotToTuple$1(snapshotFromRebuild));
            }
          });
        };
        if (!isPromise(snapshotOrPromise)) {
          // We don't want to return pending snapshots to user-land
          // Instead we just subscribe to it
          if (!isPendingSnapshot(snapshotOrPromise)) {
            subscriberCallback(snapshotToTuple$1(snapshotOrPromise));
          }
          luvioStoreSubscribe(snapshotOrPromise);
        } else {
          snapshotOrPromise.then(snapshot => {
            if (subscriberCallback !== null) {
              if (snapshot === null) {
                subscriberCallback(createInvalidConfigError$1());
                return;
              }
              // We don't want to return pending snapshots to user-land
              // Instead we just subscribe to it
              if (!isPendingSnapshot(snapshot)) {
                subscriberCallback(snapshotToTuple$1(snapshot));
              }
              luvioStoreSubscribe(snapshot);
            }
          });
        }
        return () => {
          if (subscriberCallback !== null && unsub !== undefined) {
            unsub();
          }
          subscriberCallback = null;
          unsub = undefined;
        };
      };
      defineProperty(imperativeAdapterSubscribe, 'name', {
        value: `${name}_subscribe`
      });
      return {
        invoke: imperativeAdapterInvoke,
        subscribe: imperativeAdapterSubscribe
      };
    }
    function snapshotToTuple(snapshot) {
      if (isErrorSnapshot(snapshot)) {
        if (snapshot.error.errorType === 'adapterError') {
          // GraphQL can return 200 with an errors array
          return {
            data: undefined,
            errors: snapshot.error.error
          };
        } else {
          // This is a network error or some other error - usually with a single error bubled up.
          return {
            data: undefined,
            errors: [snapshot.error]
          };
        }
      }
      // cast any PendingSnapshot to FulfilledSnapshot here,
      //  we shouldn't get anything pending at this point
      const payload = {};
      const dataSnapshot = snapshot;
      if ('data' in dataSnapshot.data && dataSnapshot.data.data !== undefined) {
        payload.data = dataSnapshot.data.data;
      }
      if (dataSnapshot.data.errors !== undefined) {
        payload.errors = dataSnapshot.data.errors;
      }
      return payload;
    }
    function createInvalidConfigError() {
      return {
        data: undefined,
        errors: [{
          ok: false,
          status: 400,
          statusText: 'INVALID_CONFIG',
          body: undefined,
          headers: {},
          errorType: 'fetchResponse'
        }]
      };
    }
    /**
     * Creates an imperative adapter
     *
     * @param luvio Luvio
     * @param adapter luvio adapter
     * @param metadata AdapterMetadata
     * @returns Imperative adapter object with invoke and subscribe functions
     */
    function createGraphQLImperativeAdapter(luvio, adapter, metadata, astResolver) {
      const {
        name
      } = metadata;
      const imperativeAdapterInvoke = (config, requestContext, callback) => {
        let coercedConfig = null;
        if ('batchQuery' in config) {
          coercedConfig = {
            batchQuery: config.batchQuery.map(individualConfig => ({
              ...individualConfig,
              query: astResolver(individualConfig.query)
            }))
          };
          // If any of the configurations are invalid, we bail out of calling the adapter.
          if (coercedConfig.batchQuery.some(individualConfig => individualConfig.query === undefined)) {
            callback(createInvalidConfigError());
            return;
          }
        } else if ('query' in config) {
          const ast = astResolver(config.query);
          if (ast === undefined) {
            callback(createInvalidConfigError());
            return;
          }
          coercedConfig = {
            ...config,
            query: ast
          };
        }
        const snapshotOrPromise = adapter(coercedConfig, requestContext);
        if (snapshotOrPromise === null) {
          callback(createInvalidConfigError());
          return;
        }
        if (!isPromise(snapshotOrPromise)) {
          callback(snapshotToTuple(snapshotOrPromise));
          return;
        }
        snapshotOrPromise.then(snapshot => {
          if (snapshot === null) {
            callback(createInvalidConfigError());
            return;
          }
          callback(snapshotToTuple(snapshot));
        });
      };
      defineProperty(imperativeAdapterInvoke, 'name', {
        value: `${name}_invoke`
      });
      // Invokes the adapter and subscribes to the received snapshot
      // Returns an unsubscribe function to the consumer
      const imperativeAdapterSubscribe = (config, requestContext, callback) => {
        let subscriberCallback = callback;
        let unsub;
        let coercedConfig = null;
        if ('batchQuery' in config) {
          coercedConfig = {
            batchQuery: config.batchQuery.map(individualConfig => ({
              ...individualConfig,
              query: astResolver(individualConfig.query)
            }))
          };
          // If any of the configurations are invalid, we bail out of calling the adapter.
          if (coercedConfig.batchQuery.some(individualConfig => individualConfig.query === undefined)) {
            callback(createInvalidConfigError());
            return () => {};
          }
        } else if ('query' in config) {
          const ast = astResolver(config.query);
          if (ast === undefined) {
            callback(createInvalidConfigError());
            return () => {};
          }
          coercedConfig = {
            ...config,
            query: ast
          };
        }
        const snapshotOrPromise = adapter(coercedConfig, requestContext);
        if (snapshotOrPromise === null) {
          subscriberCallback(createInvalidConfigError());
          return () => {};
        }
        // Can rebuild lead to pending snapshots?
        const luvioStoreSubscribe = snapshot => {
          unsub = luvio.storeSubscribe(snapshot, snapshotFromRebuild => {
            if (subscriberCallback !== null && !isPendingSnapshot(snapshotFromRebuild)) {
              subscriberCallback(snapshotToTuple(snapshotFromRebuild));
            }
          });
        };
        if (!isPromise(snapshotOrPromise)) {
          // We don't want to return pending snapshots to user-land
          // Instead we just subscribe to it
          if (!isPendingSnapshot(snapshotOrPromise)) {
            subscriberCallback(snapshotToTuple(snapshotOrPromise));
          }
          luvioStoreSubscribe(snapshotOrPromise);
        } else {
          snapshotOrPromise.then(snapshot => {
            if (subscriberCallback !== null) {
              if (snapshot === null) {
                subscriberCallback(createInvalidConfigError());
                return;
              }
              // TODO [W-11370904]: revisit this. Does GraphQL need to worry about pending?
              // We don't want to return pending snapshots to user-land
              // Instead we just subscribe to it
              if (!isPendingSnapshot(snapshot)) {
                subscriberCallback(snapshotToTuple(snapshot));
              }
              luvioStoreSubscribe(snapshot);
            }
          });
        }
        return () => {
          if (subscriberCallback !== null && unsub !== undefined) {
            unsub();
          }
          subscriberCallback = null;
          unsub = undefined;
        };
      };
      defineProperty(imperativeAdapterSubscribe, 'name', {
        value: `${name}_subscribe`
      });
      return {
        invoke: imperativeAdapterInvoke,
        subscribe: imperativeAdapterSubscribe
      };
    }
    function createWireAdapterConstructor(luvio, adapter, metadata) {
      const {
        apiFamily,
        name
      } = metadata;
      return createWireAdapterConstructor$1(adapter, `${apiFamily}.${name}`, luvio);
    }
    function createInfiniteScrollingWireAdapterConstructor(luvio, adapter, metadata) {
      const {
        apiFamily,
        name
      } = metadata;
      return createInfiniteScrollingWireAdapterConstructor$1(adapter, `${apiFamily}.${name}`, luvio);
    }
    function createGraphQLWireAdapterConstructor(luvio, adapter, metadata, astResolver) {
      const {
        apiFamily,
        name
      } = metadata;
      return createGraphQLWireAdapterConstructor$1(adapter, `${apiFamily}.${name}`, luvio, astResolver);
    }
    // version: 1.309.0-dev21-4baf03ecaf
    const __lwc_hmr_context = { moduleHash : '98b357084df1318c8344ddb799ce6fda' };
    if (lwc.hot) {
        lwc.hot.register('force/ldsBindings/ldsBindings.js', '98b357084df1318c8344ddb799ce6fda', {"name":"ldsBindings","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.ADAPTER_UNFULFILLED_ERROR = ADAPTER_UNFULFILLED_ERROR;
    exports.REFRESH_ADAPTER_EVENT = REFRESH_ADAPTER_EVENT;
    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.bindWireRefresh = bindWireRefresh;
    exports.createGraphQLImperativeAdapter = createGraphQLImperativeAdapter;
    exports.createGraphQLWireAdapterConstructor = createGraphQLWireAdapterConstructor;
    exports.createImperativeAdapter = createImperativeAdapter;
    exports.createInfiniteScrollingWireAdapterConstructor = createInfiniteScrollingWireAdapterConstructor;
    exports.createInstrumentedAdapter = createInstrumentedAdapter;
    exports.createLDSAdapter = createLDSAdapter;
    exports.createWireAdapterConstructor = createWireAdapterConstructor;
    exports.instrument = instrument;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('force/luvioEngine', ['exports', 'lwc'], (function (exports, lwc) {

    /**
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */

    /*
     *  ATTENTION!
     *  THIS IS A GENERATED FILE FROM https://github.com/salesforce-experience-platform-emu/lds-lightning-platform
     *  If you would like to contribute to LDS, please follow the steps outlined in the git repo.
     *  Any changes made to this file in p4 will be automatically overwritten.
     *  *******************************************************************************************
     */
    /* proxy-compat-disable */
    var SnapshotState;
    (function (SnapshotState) {
      SnapshotState["Fulfilled"] = "Fulfilled";
      SnapshotState["Unfulfilled"] = "Unfulfilled";
      SnapshotState["Error"] = "Error";
      SnapshotState["Pending"] = "Pending";
      SnapshotState["Stale"] = "Stale";
    })(SnapshotState || (SnapshotState = {}));
    const {
      create,
      entries,
      freeze,
      keys,
      values,
      assign
    } = Object;
    const {
      hasOwnProperty
    } = Object.prototype;
    const {
      isArray
    } = Array;
    const {
      push,
      indexOf,
      slice
    } = Array.prototype;
    const {
      parse,
      stringify
    } = JSON;
    const WeakSetCtor = WeakSet;
    const deeplyFrozen = new WeakSetCtor();
    // Allow custom environments to bypass deep freeze for performance reasons
    let bypassDeepFreeze = false;
    function setBypassDeepFreeze(value) {
      bypassDeepFreeze = value;
    }
    function deepFreeze(value) {
      // No need to freeze primitives or already frozen stuff
      if (bypassDeepFreeze || typeof value !== 'object' || value === null || deeplyFrozen.has(value)) {
        return;
      }
      deeplyFrozen.add(value);
      if (isArray(value)) {
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepFreeze(value[i]);
        }
      } else {
        const keys$1 = keys(value);
        for (let i = 0, len = keys$1.length; i < len; i += 1) {
          deepFreeze(value[keys$1[i]]);
        }
      }
      freeze(value);
    }
    function isErrorSnapshot(snapshot) {
      return snapshot.state === SnapshotState.Error;
    }
    function isFulfilledSnapshot(snapshot) {
      return snapshot.state === SnapshotState.Fulfilled;
    }
    function isStaleSnapshot(snapshot) {
      return snapshot.state === SnapshotState.Stale;
    }
    function isUnfulfilledSnapshot(snapshot) {
      return snapshot.state === SnapshotState.Unfulfilled;
    }
    function isPendingSnapshot(snapshot) {
      return snapshot.state === SnapshotState.Pending;
    }
    function createErrorSnapshot(error, refresh) {
      deepFreeze(error);
      const snap = {
        error,
        state: SnapshotState.Error,
        data: undefined,
        refresh
      };
      return snap;
    }
    function isPromise(value) {
      if (value === undefined) {
        return false;
      }
      // check for Thenable due to test frameworks using custom Promise impls
      return value.then !== undefined;
    }
    function isNonError(obj, isError) {
      return isError === false;
    }
    function cachePolicyImplWithEvents(cachePolicyImplementation, cachePolicyType, eventObservers) {
      return wrapFunctionInEvents(cachePolicyImplementation, eventObservers, {
        type: 'adapter-lookup-start',
        cachePolicy: cachePolicyType,
        timestamp: Date.now()
      }, (_result, wasError, _, startEvent) => {
        const timestamp = Date.now();
        return {
          type: 'adapter-lookup-end',
          hasError: wasError,
          timestamp,
          duration: timestamp - startEvent.timestamp
        };
      });
    }
    function buildCachedSnapshotWithEvents(buildCachedSnapshot, eventObservers) {
      return wrapFunctionInEvents(buildCachedSnapshot, eventObservers, {
        type: 'cache-lookup-start',
        timestamp: Date.now()
      }, (result, wasError, wasAsync, startEvent) => {
        const timestamp = Date.now();
        return {
          type: 'cache-lookup-end',
          hasError: wasError,
          wasResultAsync: wasAsync,
          snapshotState: result !== undefined && isNonError(result, wasError) ? result.state : undefined,
          timestamp,
          duration: timestamp - startEvent.timestamp
        };
      });
    }
    function buildNetworkSnapshotWithEvents(buildNetworkSnapshot, eventObservers) {
      return wrapFunctionInEvents(buildNetworkSnapshot, eventObservers, {
        type: 'network-lookup-start',
        timestamp: Date.now()
      }, (_result, wasError, _, startEvent) => {
        const timestamp = Date.now();
        return {
          type: 'network-lookup-end',
          hasError: wasError,
          timestamp,
          duration: timestamp - startEvent.timestamp
        };
      });
    }
    function emitLuvioStoreEvent(event, observers = []) {
      for (const observer of observers) {
        switch (event.type) {
          case 'cache-miss-out-of-ttl':
            if (observer.onCacheMissOutOfTtl) {
              observer.onCacheMissOutOfTtl(event);
            }
            break;
          case 'data-out-of-ttl-duration-update':
            if (observer.onDataOutOfTtlDurationUpdate) {
              observer.onDataOutOfTtlDurationUpdate(event);
            }
            break;
          case 'store-reset':
            if (observer.onStoreReset) {
              observer.onStoreReset(event);
            }
            break;
          case 'store-publish':
            if (observer.onStorePublish) {
              observer.onStorePublish(event);
            }
            break;
          case 'store-snapshot-emit':
          case 'store-snapshot-rebuild':
          case 'store-snapshot-refresh':
          case 'store-snapshot-subscribe':
          case 'store-snapshot-unsubscribe':
            if (observer.onStoreSnapshotEvent) {
              observer.onStoreSnapshotEvent(event);
            }
            break;
        }
      }
    }
    function emitAdapterEvent(event, observers = []) {
      for (const observer of observers) {
        switch (event.type) {
          case 'custom':
            if (observer.onCustomAdapterEvent) {
              observer.onCustomAdapterEvent(event);
            }
            break;
          case 'environment':
            if (observer.onEnvironmentEvent) {
              observer.onEnvironmentEvent(event);
            }
            break;
          default:
            if (observer.onAdapterEvent) {
              observer.onAdapterEvent(event);
            }
            break;
        }
      }
    }
    const createCustomAdapterEventEmitter = (namespace, observers = []) => eventData => {
      emitAdapterEvent({
        type: 'custom',
        namespace,
        timestamp: Date.now(),
        data: eventData
      }, observers);
    };
    function wrapFunctionInEvents(fn, eventObservers, startEvent, buildResultEvent) {
      return function (...args) {
        emitAdapterEvent(startEvent, eventObservers);
        try {
          const result = fn(...args);
          if (isPromise(result)) {
            return result.then(x => {
              //emit async end event
              emitAdapterEvent(buildResultEvent(x, false, true, startEvent), eventObservers);
              return x;
            }).catch(e => {
              // emit async error
              emitAdapterEvent(buildResultEvent(e, true, true, startEvent), eventObservers);
              throw e;
            });
          } else {
            // emit sync success
            emitAdapterEvent(buildResultEvent(result, false, false, startEvent), eventObservers);
            return result;
          }
        } catch (e) {
          // emit sync error
          emitAdapterEvent(buildResultEvent(e, true, false, startEvent), eventObservers);
          throw e;
        }
      };
    }
    const resolvedPromise = Promise.resolve();
    function throwNext(error) {
      setTimeout(() => {
        throw error;
      }, 0);
    }
    /**
     * An alternative to flushPromises based on Promise.
     */
    function resolveImmediate(callback) {
      resolvedPromise.then(callback).catch(throwNext);
    }
    const TRIM_DEBOUNCE_TIME_MS = 5000;
    function buildDefaultScheduler() {
      let timeSinceLastTrim = Date.now() - (TRIM_DEBOUNCE_TIME_MS + 1);
      const defaultScheduler = (task, done) => {
        const now = Date.now();
        if (timeSinceLastTrim + TRIM_DEBOUNCE_TIME_MS < now) {
          timeSinceLastTrim = now;
          resolveImmediate(task);
          return done();
        }
        done();
      };
      return defaultScheduler;
    }
    var StoreErrorStatus;
    (function (StoreErrorStatus) {
      StoreErrorStatus[StoreErrorStatus["RESOURCE_NOT_FOUND"] = 404] = "RESOURCE_NOT_FOUND";
    })(StoreErrorStatus || (StoreErrorStatus = {}));
    var StoreRecordType;
    (function (StoreRecordType) {
      StoreRecordType["Error"] = "error";
    })(StoreRecordType || (StoreRecordType = {}));
    var StoreLinkStateValues$1;
    (function (StoreLinkStateValues) {
      StoreLinkStateValues[StoreLinkStateValues["NotPresent"] = 0] = "NotPresent";
      StoreLinkStateValues[StoreLinkStateValues["RefNotPresent"] = 1] = "RefNotPresent";
      StoreLinkStateValues[StoreLinkStateValues["RefPresent"] = 2] = "RefPresent";
      StoreLinkStateValues[StoreLinkStateValues["Null"] = 3] = "Null";
      StoreLinkStateValues[StoreLinkStateValues["Missing"] = 4] = "Missing";
      StoreLinkStateValues[StoreLinkStateValues["Pending"] = 5] = "Pending";
    })(StoreLinkStateValues$1 || (StoreLinkStateValues$1 = {}));
    exports.StoreResolveResultState = void 0;
    (function (StoreResolveResultState) {
      StoreResolveResultState[StoreResolveResultState["Found"] = 0] = "Found";
      StoreResolveResultState[StoreResolveResultState["Error"] = 1] = "Error";
      StoreResolveResultState[StoreResolveResultState["Null"] = 2] = "Null";
      StoreResolveResultState[StoreResolveResultState["NotPresent"] = 3] = "NotPresent";
      StoreResolveResultState[StoreResolveResultState["Stale"] = 4] = "Stale";
    })(exports.StoreResolveResultState || (exports.StoreResolveResultState = {}));

    /**
     * A deterministic JSON stringify implementation. Heavily adapted from https://github.com/epoberezkin/fast-json-stable-stringify.
     * This is needed because insertion order for JSON.stringify(object) affects output:
     * JSON.stringify({a: 1, b: 2})
     *      "{"a":1,"b":2}"
     * JSON.stringify({b: 2, a: 1})
     *      "{"b":2,"a":1}"
     * @param data Data to be JSON-stringified.
     * @returns JSON.stringified value with consistent ordering of keys.
     */
    function stableJSONStringify(node) {
      // This is for Date values.
      if (node && node.toJSON && typeof node.toJSON === 'function') {
        // eslint-disable-next-line no-param-reassign
        node = node.toJSON();
      }
      if (node === undefined) {
        return;
      }
      if (typeof node === 'number') {
        return isFinite(node) ? '' + node : 'null';
      }
      if (typeof node !== 'object') {
        return stringify(node);
      }
      let i;
      let out;
      if (isArray(node)) {
        out = '[';
        for (i = 0; i < node.length; i++) {
          if (i) {
            out += ',';
          }
          out += stableJSONStringify(node[i]) || 'null';
        }
        return out + ']';
      }
      if (node === null) {
        return 'null';
      }
      const keys$1 = keys(node).sort();
      out = '';
      for (i = 0; i < keys$1.length; i++) {
        const key = keys$1[i];
        const value = stableJSONStringify(node[key]);
        if (!value) {
          continue;
        }
        if (out) {
          out += ',';
        }
        out += stringify(key) + ':' + value;
      }
      return '{' + out + '}';
    }
    function isStoreRecordError(storeRecord) {
      return storeRecord.__type === StoreRecordType.Error;
    }
    const structuredKeySerializationCache = new WeakMap();
    function serializeStructuredKey(key) {
      if (typeof key === 'string') {
        return key;
      }
      const cacheValue = structuredKeySerializationCache.get(key);
      if (cacheValue === undefined) {
        const value = stableJSONStringify(key);
        structuredKeySerializationCache.set(key, value);
        return value;
      }
      return cacheValue;
    }
    const undefinedKeyError$1 = 'Undefined value used in StoreKeyMap operation';
    class StoreKeyMap {
      constructor() {
        this.keyMap = new Map();
        this.valueMap = new Map();
      }
      clear() {
        this.valueMap.clear();
        this.keyMap.clear();
      }
      delete(key) {
        const stringifiedKey = serializeStructuredKey(key);
        if (stringifiedKey !== undefined) {
          this.keyMap.delete(stringifiedKey);
          return this.valueMap.delete(stringifiedKey);
        } else {
          throw new Error(`${undefinedKeyError$1}: delete`);
        }
      }
      entries() {
        const recordEntries = this.valueMap.entries();
        const keyRecordArray = [];
        for (const [stringifiedKey, value] of Array.from(recordEntries)) {
          const structuredKey = this.keyMap.get(stringifiedKey);
          if (structuredKey !== undefined) {
            keyRecordArray.push([structuredKey, value]);
          }
        }
        return keyRecordArray.values();
      }
      forEachKey(callbackFn, thisArg) {
        return this.keyMap.forEach(callbackFn, thisArg);
      }
      forEachValue(callbackFn, thisArg) {
        return this.valueMap.forEach(callbackFn, thisArg);
      }
      get(key) {
        const stringifiedKey = serializeStructuredKey(key);
        if (stringifiedKey !== undefined) {
          return this.valueMap.get(stringifiedKey);
        } else {
          throw new Error(`${undefinedKeyError$1}: get`);
        }
      }
      has(key) {
        const stringifiedKey = serializeStructuredKey(key);
        if (stringifiedKey !== undefined) {
          return this.valueMap.has(stringifiedKey);
        } else {
          throw new Error(`${undefinedKeyError$1}: has`);
        }
      }
      keys() {
        return this.keyMap.values();
      }
      keysAsArray() {
        return Array.from(this.keys());
      }
      keysAsStrings() {
        return this.keyMap.keys();
      }
      /**
       * Merges in the values of the passed-in StoreKeyMap. Overwrites existing values.
       * @param sourceSet - The StoreKeyMap to merge in.
       */
      merge(sourceMap) {
        sourceMap.keyMap.forEach((value, key) => {
          this.keyMap.set(key, value);
        });
        sourceMap.valueMap.forEach((value, key) => {
          this.valueMap.set(key, value);
        });
      }
      set(key, value) {
        const stringifiedKey = serializeStructuredKey(key);
        if (stringifiedKey !== undefined) {
          this.keyMap.set(stringifiedKey, key);
          return this.valueMap.set(stringifiedKey, value);
        } else {
          throw new Error(`${undefinedKeyError$1}: set`);
        }
      }
      size() {
        return this.valueMap.size;
      }
      values() {
        return this.valueMap.values();
      }
    }
    const undefinedKeyError = 'Undefined value used in StoreKeySet operation';
    class StoreKeySet {
      constructor() {
        this.set = new Set();
        this.valueMap = new Map();
      }
      add(key) {
        const stringifiedKey = serializeStructuredKey(key);
        if (stringifiedKey !== undefined) {
          this.set.add(stringifiedKey);
          this.valueMap.set(stringifiedKey, key);
        } else {
          throw new Error(`${undefinedKeyError}: add`);
        }
        return this;
      }
      clear() {
        this.set.clear();
        this.valueMap.clear();
      }
      delete(key) {
        const stringifiedKey = serializeStructuredKey(key);
        if (stringifiedKey !== undefined) {
          this.set.delete(stringifiedKey);
          return this.valueMap.delete(stringifiedKey);
        } else {
          throw new Error(`${undefinedKeyError}: delete`);
        }
      }
      entries() {
        return this.valueMap.entries();
      }
      forEach(callbackFn, thisArg) {
        return this.valueMap.forEach(callbackFn, thisArg);
      }
      has(key) {
        const stringifiedKey = serializeStructuredKey(key);
        if (stringifiedKey !== undefined) {
          return this.set.has(stringifiedKey);
        } else {
          throw new Error(`${undefinedKeyError}: has`);
        }
      }
      keys() {
        return this.valueMap.values();
      }
      keysAsArray() {
        return Array.from(this.keys());
      }
      keysAsStrings() {
        return this.set.keys();
      }
      /**
       * Merges in the values of the passed-in StoreKeySet. Overwrites existing values.
       * @param sourceSet - The StoreKeySet to merge in.
       */
      merge(sourceSet) {
        sourceSet.set.forEach(value => {
          this.set.add(value);
        });
        sourceSet.valueMap.forEach((value, key) => {
          this.valueMap.set(key, value);
        });
      }
      size() {
        return this.set.size;
      }
      values() {
        return this.valueMap.values();
      }
    }
    function defaultTrimPolicy(data, deallocateFn) {
      return new Promise(resolve => {
        let deallocatedCount = 0;
        const {
          pendingTrimKeys,
          retainedIds,
          metadata
        } = data;
        const now = Date.now();
        pendingTrimKeys.forEach(key => {
          const recordExpiration = metadata[key];
          if (retainedIds[key] !== undefined || recordExpiration === undefined || recordExpiration !== undefined && recordExpiration.expirationTimestamp >= now) {
            return;
          }
          deallocateFn(key);
          deallocatedCount++;
        });
        resolve({
          deallocatedCount
        });
      });
    }
    const Serialized_StringKey_Version = '1';
    function hasOverlappingIds$1(snapshot, visitedIds) {
      const {
        length: len
      } = visitedIds;
      const {
        seenRecords
      } = snapshot;
      for (let i = 0; i < len; i += 1) {
        const id = visitedIds[i];
        if (seenRecords.has(id) || id === snapshot.recordId) {
          return true;
        }
      }
      return false;
    }
    function isNonPendingSnapshotWithNoOverlappingIds$1(snapshot, visitedIds) {
      return isPendingSnapshot(snapshot) === false && hasOverlappingIds$1(snapshot, visitedIds) === false;
    }
    function isPendingSnapshotWithNoOverlappingIds$1(snapshot, visitedIds, refreshedIds) {
      // pending snapshot need to check both visited and refreshed IDs
      // because the top-level record might only be refreshed (if it was
      // already in the store after a TTL expired then storePublish won't
      // be called).  And it's not enough to just check refreshed because
      // some records don't have TTLs so refreshedIds would be empty.
      return isPendingSnapshot(snapshot) === true && hasOverlappingIds$1(snapshot, refreshedIds) === false && hasOverlappingIds$1(snapshot, visitedIds) === false;
    }
    function getMatchingIds$1(prefix, visitedIds) {
      const matchingIds = [];
      for (let i = 0, len = visitedIds.length; i < len; i++) {
        const visitedId = visitedIds[i];
        if (visitedId.indexOf(prefix) === 0) {
          push.call(matchingIds, visitedId);
        }
      }
      return matchingIds;
    }
    const OVERRIDE_TTL_KEY_SEPARATOR = '::';
    function getTTLOverrideKey(namespace, representationName) {
      return `${namespace}${OVERRIDE_TTL_KEY_SEPARATOR}${representationName}`;
    }
    function getTTLOverride$1(ttlOverrideKey, ttlOverrides, defaultTTLOverride) {
      const override = ttlOverrides[ttlOverrideKey];
      const ttlOverride = override === undefined ? defaultTTLOverride : override;
      return ttlOverride;
    }
    class StringKeyInMemoryStore {
      constructor(options = {}) {
        // public, in memory properties
        this.records = create(null);
        this.metadata = create(null);
        this.visitedIds = create(null);
        this.refreshedIds = create(null);
        this.redirectKeys = create(null);
        this.retainedIds = create(null);
        this.ttlOverrides = create(null);
        this.snapshotSubscriptions = [];
        this.trimTask = null;
        this.pendingTrimKeys = new Set();
        this.defaultTTLOverride = undefined;
        this.watchSubscriptions = [];
        this.eventObservers = [];
        // private/protected
        this.insertedIds = create(null);
        this.reverseRedirectKeys = create(null);
        this.currentSnapshotId = 0;
        this.scheduler = options.scheduler || buildDefaultScheduler();
        if (options.initialData) {
          this.deserialize(options.initialData, options.resetInitialDataTtls);
        }
        this.trimPolicy = options.customTrimPolicy || defaultTrimPolicy;
      }
      // interface methods
      readEntry(key) {
        return this.records[this.getCanonicalRecordId(key)];
      }
      getNumEntries() {
        return keys(this.records).length;
      }
      readMetadata(key) {
        return this.metadata[this.getCanonicalRecordId(key)];
      }
      readMetadataWhere(query) {
        const keys$1 = keys(this.metadata);
        const results = [];
        const hasNamespaceQuery = hasOwnProperty.call(query, 'namespace');
        const hasRepresentationNameQuery = hasOwnProperty.call(query, 'representationName');
        const hasTtlOverrideQuery = hasOwnProperty.call(query, 'ttlOverride');
        for (let i = 0, length = keys$1.length; i < length; i++) {
          const key = keys$1[i];
          const storeMetadata = this.metadata[key];
          if (hasNamespaceQuery && storeMetadata.namespace !== query.namespace) {
            continue;
          }
          if (hasRepresentationNameQuery && storeMetadata.representationName !== query.representationName) {
            continue;
          }
          if (hasTtlOverrideQuery) {
            const ttlOverride = this.ttlOverrides[getTTLOverrideKey(storeMetadata.namespace, storeMetadata.representationName)];
            if (ttlOverride !== query.ttlOverride) {
              continue;
            }
          }
          results.push({
            metadata: storeMetadata,
            key
          });
        }
        return results;
      }
      put(recordId, record) {
        const {
          records,
          insertedIds,
          pendingTrimKeys,
          retainedIds
        } = this;
        const canonicalKey = this.getCanonicalRecordId(recordId);
        if (hasOwnProperty.call(records, canonicalKey) === false) {
          insertedIds[canonicalKey] = true;
        }
        records[canonicalKey] = record;
        // if this id is not retained, add it to the pendingTrim collection.
        // this does not mean it will be trimmed right away, it still needs to be expired
        // and if this key is subsequently subscribed to it will be retained and no longer considered for
        // trim
        if (retainedIds[canonicalKey] === undefined) {
          pendingTrimKeys.add(canonicalKey);
        }
        {
          freeze(record);
        }
      }
      publish(recordId, record) {
        // make sure we publish to the canonical record id in case it's been redirected
        const canonicalKey = this.getCanonicalRecordId(recordId);
        this.put(canonicalKey, record);
        this.markVisited(canonicalKey);
        // TODO: Emit event for store publish once structured keys are used everywhere.
      }
      /**
       * Given a record id, this method returns the key where the corresponding data is actually stored.
       * It could be that this record id has been redirected, so this method will follow the redirects, if applicable,
       * and return the canonical key for the record
       * @param recordId The original location of the record
       * @returns The canonical key where the record is stored
       */
      getCanonicalRecordId(recordId) {
        let canonicalKey = recordId;
        const {
          redirectKeys
        } = this;
        while (redirectKeys[canonicalKey]) {
          canonicalKey = redirectKeys[canonicalKey];
        }
        return canonicalKey;
      }
      getRedirectLineage(key) {
        const {
          redirectKeys
        } = this;
        const lineage = [];
        if (redirectKeys[key] === undefined) {
          return [];
        }
        let canonicalKey = key;
        while (redirectKeys[canonicalKey] !== undefined) {
          push.call(lineage, canonicalKey);
          canonicalKey = redirectKeys[canonicalKey];
        }
        return lineage;
      }
      redirect(key, canonicalKey) {
        const {
          redirectKeys,
          reverseRedirectKeys
        } = this;
        if (key === canonicalKey) {
          throw new Error('cannot redirect a key to itself');
        }
        if (reverseRedirectKeys[canonicalKey] !== undefined && reverseRedirectKeys[canonicalKey] !== key) {
          throw new Error('cannot have multiple redirects keys point to the same canonical key');
        }
        if (redirectKeys[canonicalKey] !== undefined) {
          throw new Error('the canonical key must be terminal and cannot already be part of a redirect chain');
        }
        redirectKeys[key] = canonicalKey;
        reverseRedirectKeys[canonicalKey] = key;
        // evict key at original location as it now lives at the canonical key
        delete this.records[key];
        this.visitedIds[key] = true;
      }
      broadcast(rebuildSnapshot, snapshotAvailable) {
        // Note: we should always get the subscription references from this at the beginning
        // of the function, in case the reference changes (because of an unsubscribe)
        const {
          snapshotSubscriptions,
          watchSubscriptions,
          visitedIds,
          refreshedIds,
          insertedIds
        } = this;
        const allVisitedIds = keys(visitedIds);
        const allRefreshedIds = keys(refreshedIds);
        // Early exit if nothing has changed
        if (allVisitedIds.length === 0 && allRefreshedIds.length === 0) {
          return Promise.resolve();
        }
        // Process snapshot subscriptions
        const snapshotSubPromises = [];
        for (let i = 0, len = snapshotSubscriptions.length; i < len; i++) {
          const subscription = snapshotSubscriptions[i];
          const {
            snapshot
          } = subscription;
          // Don't re-emit the snapshot if there is no overlap between the visited keys and the
          // snapshot seen keys.
          if (isErrorSnapshot(snapshot) || isNonPendingSnapshotWithNoOverlappingIds$1(snapshot, allVisitedIds) || isPendingSnapshotWithNoOverlappingIds$1(snapshot, allVisitedIds, allRefreshedIds)) {
            continue;
          }
          snapshotSubPromises.push(new Promise(resolve => {
            rebuildSnapshot(snapshot, rebuiltSnapshot => {
              emitLuvioStoreEvent({
                type: 'store-snapshot-rebuild',
                timestamp: Date.now(),
                snapshot: rebuiltSnapshot,
                subscriptionId: subscription.id
              }, this.eventObservers);
              this.emitOrRefreshRebuiltSnapshot(rebuiltSnapshot, subscription, snapshotAvailable).then(() => resolve());
            });
          }));
        }
        // Process watch subscriptions
        for (let i = 0, len = watchSubscriptions.length; i < len; i++) {
          const {
            prefix,
            callback
          } = watchSubscriptions[i];
          const matchingIds = getMatchingIds$1(prefix, allVisitedIds);
          if (matchingIds.length > 0) {
            const watchCallbackEntries = [];
            for (let i = 0, len = matchingIds.length; i < len; i++) {
              const id = matchingIds[i];
              const inserted = insertedIds[id] || false;
              push.call(watchCallbackEntries, {
                id,
                inserted
              });
            }
            callback(watchCallbackEntries);
          }
        }
        this.visitedIds = create(null);
        this.refreshedIds = create(null);
        this.insertedIds = create(null);
        // the .then removes the return of an array of voids to a single void
        return Promise.all(snapshotSubPromises).then(() => {});
      }
      /**
       * Broadcasts an ErrorSnapshot to any Pending snapshots for the given
       * recordId.
       */
      broadcastNonCachedSnapshot(recordId, errorSnapshot) {
        // Note: we should always get the subscription references from this at the beginning
        // of the function, in case the reference changes (because of an unsubscribe)
        const {
          snapshotSubscriptions
        } = this;
        for (let i = 0, len = snapshotSubscriptions.length; i < len; i++) {
          const subscription = snapshotSubscriptions[i];
          const {
            snapshot,
            callback
          } = subscription;
          // if the subscriber is pending and its recordId matches then emit
          // the error to it
          if (isPendingSnapshot(snapshot) && snapshot.recordId === recordId) {
            subscription.snapshot = errorSnapshot;
            callback(errorSnapshot);
          }
        }
      }
      lookup(selector, createSnapshot, refresh, ttlStrategy) {
        return createSnapshot(selector, refresh, ttlStrategy);
      }
      subscribe(snapshot, callback) {
        const subscription = {
          id: this.currentSnapshotId++,
          snapshot,
          callback
        };
        emitLuvioStoreEvent({
          type: 'store-snapshot-subscribe',
          subscriptionId: subscription.id,
          snapshot,
          timestamp: Date.now()
        }, this.eventObservers);
        this.snapshotSubscriptions = [...this.snapshotSubscriptions, subscription];
        if (!isErrorSnapshot(snapshot)) {
          this.retainSnapshotIds(snapshot);
        }
        return () => {
          const {
            snapshotSubscriptions
          } = this;
          const index = indexOf.call(snapshotSubscriptions, subscription);
          // only attempt to slice if the subscription is in the list (in case someone
          // calls unsubscribe multiple times)
          if (index > -1) {
            this.snapshotSubscriptions = [...slice.call(snapshotSubscriptions, 0, index), ...slice.call(snapshotSubscriptions, index + 1)];
            {
              this.snapshotSubscriptions = freeze(this.snapshotSubscriptions);
            }
            // need to re-gather snapshot associated Ids to capture latest refs
            const {
              snapshot,
              id: uuid
            } = subscription;
            emitLuvioStoreEvent({
              type: 'store-snapshot-unsubscribe',
              subscriptionId: uuid,
              snapshot,
              timestamp: Date.now()
            }, this.eventObservers);
            if (!isErrorSnapshot(snapshot)) {
              this.releaseSnapshotIds(snapshot);
            }
          }
        };
      }
      updateAvailable(keys) {
        // Note: we should always get the subscription references from this at the beginning
        // of the function, in case the reference changes (because of an unsubscribe)
        const {
          snapshotSubscriptions
        } = this;
        // read metadata for each key, and mark as expired
        this.expirePossibleStaleRecords(keys);
        // Process snapshot subscriptions
        const pendingPromises = [];
        for (let i = 0, len = snapshotSubscriptions.length; i < len; i++) {
          const subscription = snapshotSubscriptions[i];
          const {
            snapshot,
            id
          } = subscription;
          if (isErrorSnapshot(snapshot)) {
            // TODO: If we want to support refreshing Error Snapshots, we will need
            // to update the ErrorSnapshot interface to include the recordId, or
            // resolve the snapshot through its refresh.config property
            continue;
          }
          if (!hasOverlappingIds$1(snapshot, keys)) {
            continue;
          }
          pendingPromises.push(this.refreshSnapshot(snapshot, id, 'update-available'));
        }
        // resolves after all snapshots refresh resolve
        // for now catch in case of reject and resolve
        return Promise.all(pendingPromises).then(_promises => undefined).catch(_err => Promise.resolve(undefined));
      }
      retain(keys) {
        const keysLength = keys.length;
        for (let i = 0; i < keysLength; i++) {
          const key = keys[i];
          this.increaseRetentionCount(key);
        }
        return () => {
          this.release(keys);
        };
      }
      watch(prefix, callback) {
        const subscription = {
          prefix,
          callback
        };
        this.watchSubscriptions = [...this.watchSubscriptions, subscription];
        return () => {
          const {
            watchSubscriptions
          } = this;
          const index = indexOf.call(watchSubscriptions, subscription);
          this.watchSubscriptions = [...slice.call(watchSubscriptions, 0, index), ...slice.call(watchSubscriptions, index + 1)];
          {
            this.watchSubscriptions = freeze(this.watchSubscriptions);
          }
        };
      }
      /**
       * Evicts data at the canonical key location and marks any redirects (if applicable)
       * to the key as visited
       * @param key key to evict
       */
      evict(key) {
        // find and evict the canonical key
        const canonicalKey = this.getCanonicalRecordId(key);
        delete this.records[canonicalKey];
        this.markVisited(canonicalKey);
      }
      cleanup() {
        this.scheduleTrim();
      }
      /**
       * Deallocates data at the canonical key location for in-memory (L1) cache
       * @param key key to deallocate
       */
      dealloc(key) {
        // find and deallocate the canonical key
        const canonicalKey = this.getCanonicalRecordId(key);
        delete this.records[canonicalKey];
      }
      keyExistsInStore(key) {
        return this.records[key] !== undefined;
      }
      publishMetadata(key, storeMetadata) {
        this.putMetadata(key, storeMetadata, true);
        const canonicalKey = this.getCanonicalRecordId(key);
        this.markRefreshed(canonicalKey);
      }
      putMetadata(key, storeMetadata, adjustTTLOverride) {
        const {
          namespace,
          representationName,
          ingestionTimestamp
        } = storeMetadata;
        const ttlOverrideKey = getTTLOverrideKey(namespace, representationName);
        const ttlOverride = getTTLOverride$1(ttlOverrideKey, this.ttlOverrides, this.defaultTTLOverride);
        const canonicalKey = this.getCanonicalRecordId(key);
        if (ttlOverride !== undefined && adjustTTLOverride === true) {
          const newExpiration = ingestionTimestamp + ttlOverride;
          // Create a new StoreMetadata object and publish the new object to storeMetadata.
          const metaDataOverride = {
            ...storeMetadata,
            expirationTimestamp: newExpiration
          };
          this.metadata[canonicalKey] = metaDataOverride;
        } else {
          // If it does not exist, publish the user passed StoreMetadata into the storeMetadata map.
          this.metadata[canonicalKey] = storeMetadata;
        }
      }
      expirePossibleStaleRecords(keys) {
        const expirationTimestamp = Date.now() - 1;
        for (let i = 0, len = keys.length; i < len; i++) {
          const key = keys[i];
          const metadata = this.readMetadata(key);
          if (metadata !== undefined) {
            this.publishMetadata(key, {
              ...metadata,
              expirationTimestamp
            });
          }
        }
      }
      setTTLOverride(namespace, representationName, ttl) {
        this.ttlOverrides[getTTLOverrideKey(namespace, representationName)] = ttl;
      }
      getTTLOverride(namespace, representationName) {
        return this.ttlOverrides[getTTLOverrideKey(namespace, representationName)];
      }
      getTTLOverrides() {
        return this.ttlOverrides;
      }
      setDefaultTTLOverride(ttl) {
        this.defaultTTLOverride = ttl;
      }
      getDefaultTTLOverride() {
        return this.defaultTTLOverride;
      }
      reset() {
        this.records = create(null);
        this.snapshotSubscriptions = [];
        this.watchSubscriptions = [];
        this.visitedIds = create(null);
        this.refreshedIds = create(null);
        this.insertedIds = create(null);
        this.redirectKeys = create(null);
        this.reverseRedirectKeys = create(null);
        this.retainedIds = create(null);
        this.ttlOverrides = create(null);
        this.trimTask = null;
        this.metadata = create(null);
        this.defaultTTLOverride = undefined;
        emitLuvioStoreEvent({
          type: 'store-reset',
          timestamp: Date.now()
        }, this.eventObservers);
      }
      addStoreEventObserver(storeEventObserver) {
        this.eventObservers.push(storeEventObserver);
        return () => {
          const {
            eventObservers
          } = this;
          const index = this.eventObservers.indexOf(storeEventObserver);
          if (index > -1) {
            this.eventObservers = [...slice.call(eventObservers, 0, index), ...slice.call(eventObservers, index + 1)];
          }
        };
      }
      // public in memory methods
      scheduleTrim() {
        if (this.trimTask === null) {
          this.trimTask = () => {
            const {
              metadata,
              pendingTrimKeys,
              retainedIds,
              records: storeRecords,
              dealloc
            } = this;
            return this.trimPolicy({
              metadata,
              pendingTrimKeys,
              retainedIds,
              storeRecords
            }, dealloc.bind(this)).then(result => {
              this.pendingTrimKeys.clear();
              const {
                trimKeysSkipped
              } = result;
              if (trimKeysSkipped !== undefined) {
                this.pendingTrimKeys = trimKeysSkipped;
              }
              return result;
            });
          };
          this.scheduler(this.trimTask, () => {
            this.trimTask = null;
          });
        }
      }
      buildIngestionStagingStore() {
        const stagingStore = new StringKeyInMemoryStore();
        const upstreamStore = this;
        const originalReadEntry = stagingStore.readEntry.bind(stagingStore);
        const originalReadMetadata = stagingStore.readMetadata.bind(stagingStore);
        const originalEvict = stagingStore.evict.bind(stagingStore);
        // the staging store will read from the upstream store if it doesn't have the data
        // this is because some adapters will only do partial ingests if they determine data
        // is already in L1 prior to ingestion
        stagingStore.readEntry = key => {
          const entry = originalReadEntry(key);
          if (entry === undefined) {
            return upstreamStore.readEntry(key);
          }
          return entry;
        };
        stagingStore.readMetadata = key => {
          const metadata = originalReadMetadata(key);
          if (!metadata) {
            return upstreamStore.readMetadata(key);
          }
          return metadata;
        };
        stagingStore.evict = key => {
          originalEvict(key);
          upstreamStore.evict(key);
        };
        stagingStore.ttlOverrides = upstreamStore.ttlOverrides;
        stagingStore.defaultTTLOverride = upstreamStore.defaultTTLOverride;
        stagingStore.redirectKeys = upstreamStore.redirectKeys;
        stagingStore.reverseRedirectKeys = upstreamStore.reverseRedirectKeys;
        return stagingStore;
      }
      // private/protected methodss
      /**
       * Updates a subscription with a new snapshot and performs retention book-keeping
       * on the existing and new snapshot.
       */
      updateSubscriptionSnapshot(subscription, newSnapshot) {
        const {
          snapshot: oldSnapshot
        } = subscription;
        if (oldSnapshot === newSnapshot) {
          return;
        }
        subscription.snapshot = newSnapshot;
        if (!isErrorSnapshot(newSnapshot)) {
          this.retainSnapshotIds(newSnapshot);
        }
        if (!isErrorSnapshot(oldSnapshot)) {
          this.releaseSnapshotIds(oldSnapshot);
        }
      }
      refreshSnapshot(snapshot, subscriptionId, reason) {
        const {
          refresh
        } = snapshot;
        if (refresh !== undefined) {
          emitLuvioStoreEvent({
            type: 'store-snapshot-refresh',
            subscriptionId,
            reason,
            snapshot,
            timestamp: Date.now()
          }, this.eventObservers);
          return refresh.resolve(refresh.config);
        }
        return Promise.resolve(undefined);
      }
      instrumentIngestedNewData(snapshot, rebuiltSnapshot) {
        const recordId = rebuiltSnapshot.recordId;
        {
          if (typeof recordId !== 'string') {
            throw new Error(`Received invalid snapshot.recordId value: ${snapshot.recordId}`);
          }
        }
        const recordMetadata = this.metadata[recordId];
        // Non-batch scenario
        if (recordMetadata) {
          emitLuvioStoreEvent({
            type: 'cache-miss-out-of-ttl',
            oldSnapshot: snapshot,
            newSnapshot: rebuiltSnapshot,
            recordId,
            recordMetadata,
            timestamp: Date.now()
          }, this.eventObservers);
        } else {
          rebuiltSnapshot.seenRecords.keysAsArray().forEach(seenRecordId => {
            const seenRecordMetadata = this.metadata[seenRecordId];
            if (seenRecordMetadata) {
              emitLuvioStoreEvent({
                type: 'cache-miss-out-of-ttl',
                oldSnapshot: snapshot,
                newSnapshot: rebuiltSnapshot,
                recordId: seenRecordId,
                recordMetadata: seenRecordMetadata,
                timestamp: Date.now()
              }, this.eventObservers);
            }
          });
        }
      }
      emitOrRefreshRebuiltSnapshot(rebuiltSnapshot, subscription, snapshotAvailable) {
        const {
          snapshot,
          callback,
          id: subscriptionId
        } = subscription;
        // if the rebuilt snapshot is pending then continue on, broadcast will get
        // called again once the pending snapshot is resolved
        if (isPendingSnapshot(rebuiltSnapshot)) {
          if (isPendingSnapshot(snapshot)) {
            this.updateSubscriptionSnapshot(subscription, rebuiltSnapshot);
          }
          return Promise.resolve();
        }
        this.updateSubscriptionSnapshot(subscription, rebuiltSnapshot);
        if (snapshotAvailable(rebuiltSnapshot)) {
          // TODO [W-10186366]: revisit if we want to handle errors thrown in user-land callback
          if (rebuiltSnapshot !== snapshot) {
            emitLuvioStoreEvent({
              type: 'store-snapshot-emit',
              snapshot: rebuiltSnapshot,
              timestamp: Date.now(),
              subscriptionId
            }, this.eventObservers);
            callback(rebuiltSnapshot);
          }
          this.instrumentIngestedNewDataOnFulfilledSnapshots(snapshot, rebuiltSnapshot);
        } else if (isUnfulfilledSnapshot(rebuiltSnapshot)) {
          return this.refreshSnapshot(rebuiltSnapshot, subscriptionId, 'rebuild-unfulfilled').then();
        }
        return Promise.resolve();
      }
      instrumentIngestedNewDataOnFulfilledSnapshots(snapshot, rebuiltSnapshot) {
        if (isFulfilledSnapshot(snapshot) && isFulfilledSnapshot(rebuiltSnapshot)) {
          this.instrumentIngestedNewData(snapshot, rebuiltSnapshot);
        }
      }
      retainSnapshotIds(snapshot) {
        const recordId = snapshot.recordId;
        {
          if (typeof recordId !== 'string') {
            throw new Error(`Received invalid snapshot.recordId value: ${snapshot.recordId}`);
          }
        }
        const {
          seenRecords
        } = snapshot;
        const snapshotRetainedIds = seenRecords === undefined ? [recordId] : [recordId, ...Array.from(seenRecords.keysAsStrings())];
        this.retain(snapshotRetainedIds);
      }
      releaseSnapshotIds(snapshot) {
        const recordId = snapshot.recordId;
        {
          if (typeof recordId !== 'string') {
            throw new Error(`Received invalid snapshot.recordId value: ${snapshot.recordId}`);
          }
        }
        const {
          seenRecords
        } = snapshot;
        const snapshotReleaseIds = seenRecords === undefined ? [recordId] : [recordId, ...Array.from(seenRecords.keysAsStrings())];
        this.release(snapshotReleaseIds);
      }
      increaseRetentionCount(key) {
        const count = this.retainedIds[key];
        this.retainedIds[key] = count === undefined ? 1 : count + 1;
        // do not consider this key for trim while retained
        this.pendingTrimKeys.delete(key);
      }
      decreaseRetentionCount(key) {
        const count = this.retainedIds[key];
        if (count === 1) {
          // consider this key for trimming when ref count goes to zero
          this.pendingTrimKeys.add(key);
          return delete this.retainedIds[key];
        } else if (count === undefined) {
          return false;
        } else {
          this.retainedIds[key] = count - 1;
        }
        return false;
      }
      release(keys) {
        const keysLength = keys.length;
        let shouldScheduleTrim = false;
        for (let i = 0; i < keysLength; i++) {
          const key = keys[i];
          const result = this.decreaseRetentionCount(key);
          if (result === true) {
            shouldScheduleTrim = true;
          }
        }
        // only schedule trim if an entry is removed from retention map
        if (shouldScheduleTrim === true) {
          // schedule trim for next tick
          this.scheduleTrim();
        }
      }
      markVisited(canonicalKey) {
        const {
          visitedIds,
          reverseRedirectKeys
        } = this;
        visitedIds[canonicalKey] = true;
        // mark all redirects leading up to the canonical key as visited so
        // affected snapshots are updated
        let redirectKey = reverseRedirectKeys[canonicalKey];
        while (redirectKey !== undefined) {
          visitedIds[redirectKey] = true;
          redirectKey = reverseRedirectKeys[redirectKey];
        }
      }
      markRefreshed(canonicalKey) {
        const {
          refreshedIds,
          reverseRedirectKeys
        } = this;
        refreshedIds[canonicalKey] = true;
        // mark all redirects leading up to the canonical key as refreshed so
        // affected snapshots are updated
        let redirectKey = reverseRedirectKeys[canonicalKey];
        while (redirectKey !== undefined) {
          refreshedIds[redirectKey] = true;
          redirectKey = reverseRedirectKeys[redirectKey];
        }
      }
      serialize() {
        return {
          luvioStoreData: {
            data: this.records,
            metadata: this.metadata,
            version: Serialized_StringKey_Version
          }
        };
      }
      deserialize(storeData, resetInitialDataTtls) {
        const luvioStoreData = storeData.luvioStoreData;
        if (Serialized_StringKey_Version === luvioStoreData.version) {
          this.records = luvioStoreData.data;
          this.metadata = this.calculateAndSetNewTTLs(luvioStoreData.metadata, resetInitialDataTtls);
        }
      }
      calculateAndSetNewTTLs(storeMetadata, resetInitialDataTtls) {
        if (resetInitialDataTtls === true) {
          const now = Date.now();
          keys(storeMetadata).forEach(key => {
            const storeMetadataEntry = storeMetadata[key];
            const ttl = storeMetadataEntry.expirationTimestamp - storeMetadataEntry.ingestionTimestamp;
            storeMetadataEntry.ingestionTimestamp = now;
            storeMetadataEntry.expirationTimestamp = now + ttl;
          });
        }
        return storeMetadata;
      }
    }
    function hasOverlappingIds(snapshot, visitedIds) {
      const {
        seenRecords
      } = snapshot;
      return visitedIds.some(id => seenRecords.has(id) || id === snapshot.recordId);
    }
    function isNonPendingSnapshotWithNoOverlappingIds(snapshot, visitedIds) {
      return isPendingSnapshot(snapshot) === false && hasOverlappingIds(snapshot, visitedIds) === false;
    }
    function isPendingSnapshotWithNoOverlappingIds(snapshot, visitedIds, refreshedIds) {
      // pending snapshot need to check both visited and refreshed IDs
      // because the top-level record might only be refreshed (if it was
      // already in the store after a TTL expired then storePublish won't
      // be called).  And it's not enough to just check refreshed because
      // some records don't have TTLs so refreshedIds would be empty.
      return isPendingSnapshot(snapshot) === true && hasOverlappingIds(snapshot, refreshedIds) === false && hasOverlappingIds(snapshot, visitedIds) === false;
    }
    function getMatchingIds(partialKey, visitedIds) {
      const keys$1 = keys(partialKey);
      return visitedIds.filter(visitedId => {
        return keys$1.every(key => {
          return partialKey[key] === visitedId[key];
        });
      });
    }
    function getTTLOverride(ttlOverrideKey, ttlOverrides, defaultTTLOverride) {
      const override = ttlOverrides.get(ttlOverrideKey);
      const ttlOverride = override === undefined ? defaultTTLOverride : override;
      return ttlOverride;
    }
    class InMemoryStore {
      constructor(options = {}) {
        // public, in memory properties
        this.recordsMap = new StoreKeyMap();
        this.metadataMap = new StoreKeyMap();
        this.visitedIdsSet = new StoreKeySet();
        this.refreshedIdsSet = new StoreKeySet();
        this.redirectKeysMap = new StoreKeyMap();
        this.retainedIdsMap = new StoreKeyMap();
        this.ttlOverridesMap = new StoreKeyMap();
        // End Structured Key Variables
        this.snapshotSubscriptions = [];
        this.trimTask = null;
        this.pendingTrims = new StoreKeySet();
        this.defaultTTLOverride = undefined;
        this.watchSubscriptions = [];
        this.eventObservers = [];
        // private/protected
        this.insertedIdsSet = new StoreKeySet();
        this.reverseRedirectKeysMap = new StoreKeyMap();
        this.scheduler = options.scheduler || buildDefaultScheduler();
        this.fallbackStringKeyInMemoryStore = new StringKeyInMemoryStore(options);
      }
      // interface methods
      readEntry(key) {
        if (typeof key === 'string') {
          return this.fallbackStringKeyInMemoryStore.readEntry(key);
        }
        return this.recordsMap.get(key);
      }
      getNumEntries() {
        const numKeys = this.recordsMap.size();
        if (numKeys === 0) {
          return this.fallbackStringKeyInMemoryStore.getNumEntries();
        }
        return numKeys;
      }
      readMetadata(key) {
        if (typeof key === 'string') {
          return this.fallbackStringKeyInMemoryStore.readMetadata(key);
        }
        return this.metadataMap.get(key);
      }
      readMetadataWhere(query) {
        const keys = this.metadataMap.keysAsArray();
        if (keys.length === 0) {
          return this.fallbackStringKeyInMemoryStore.readMetadataWhere(query);
        }
        const results = [];
        const hasNamespaceQuery = hasOwnProperty.call(query, 'namespace');
        const hasRepresentationNameQuery = hasOwnProperty.call(query, 'representationName');
        const hasTtlOverrideQuery = hasOwnProperty.call(query, 'ttlOverride');
        for (let i = 0, length = keys.length; i < length; i++) {
          const key = keys[i];
          const storeMetadata = this.metadataMap.get(key);
          if (storeMetadata) {
            if (hasNamespaceQuery && storeMetadata.namespace !== query.namespace) {
              continue;
            }
            if (hasRepresentationNameQuery && storeMetadata.representationName !== query.representationName) {
              continue;
            }
            if (hasTtlOverrideQuery) {
              const ttlOverride = this.ttlOverridesMap.get(this.buildStructuredKey(storeMetadata.namespace, storeMetadata.representationName, {}));
              if (ttlOverride !== query.ttlOverride) {
                continue;
              }
            }
            results.push({
              metadata: storeMetadata,
              key
            });
          }
        }
        return results;
      }
      put(recordId, record) {
        if (typeof recordId === 'string') {
          this.fallbackStringKeyInMemoryStore.put(recordId, record);
          return;
        }
        const {
          recordsMap,
          insertedIdsSet,
          pendingTrims,
          retainedIdsMap
        } = this;
        // make sure we publish to the canonical record id in case it's been redirected
        const canonicalKey = this.getCanonicalRecordId(recordId);
        if (recordsMap.get(canonicalKey) === false) {
          insertedIdsSet.add(canonicalKey);
        }
        recordsMap.set(canonicalKey, record);
        // if this id is not retained, add it to the pendingTrim collection.
        // this does not mean it will be trimmed right away, it still needs to be expired
        // and if this key is subsequently subscribed to it will be retained and no longer considered for
        // trim
        if (retainedIdsMap.get(canonicalKey) === undefined) {
          pendingTrims.add(canonicalKey);
        }
        {
          freeze(record);
        }
      }
      publish(recordId, record) {
        if (typeof recordId === 'string') {
          this.fallbackStringKeyInMemoryStore.publish(recordId, record);
          return;
        }
        const canonicalKey = this.getCanonicalRecordId(recordId);
        this.put(canonicalKey, record);
        this.markVisited(canonicalKey);
        this.emitStorePublishEvent(recordId);
      }
      /**
       * Given a record id, this method returns the key where the corresponding data is actually stored.
       * It could be that this record id has been redirected, so this method will follow the redirects, if applicable,
       * and return the canonical key for the record
       * @param recordId The original location of the record
       * @returns The canonical key where the record is stored
       */
      getCanonicalRecordId(recordId) {
        if (typeof recordId === 'string') {
          return this.fallbackStringKeyInMemoryStore.getCanonicalRecordId(recordId);
        }
        const {
          redirectKeysMap
        } = this;
        let canonicalKey = recordId;
        while (redirectKeysMap.get(canonicalKey)) {
          canonicalKey = redirectKeysMap.get(canonicalKey);
        }
        return canonicalKey;
      }
      getRedirectLineage(key) {
        if (typeof key === 'string') {
          return this.fallbackStringKeyInMemoryStore.getRedirectLineage(key);
        }
        const {
          redirectKeysMap
        } = this;
        const lineage = [];
        let canonicalKey = redirectKeysMap.get(key);
        while (canonicalKey !== undefined) {
          push.call(lineage, canonicalKey);
          canonicalKey = redirectKeysMap.get(canonicalKey);
        }
        return lineage;
      }
      redirect(key, canonicalKey) {
        if (typeof key === 'string' && typeof canonicalKey === 'string') {
          this.fallbackStringKeyInMemoryStore.redirect(key, canonicalKey);
          return;
        }
        if (typeof key === 'string' || typeof canonicalKey === 'string') {
          throw new Error('cannot have key and canonicalKey of different types');
        }
        const {
          redirectKeysMap,
          reverseRedirectKeysMap
        } = this;
        if (key === canonicalKey) {
          throw new Error('cannot redirect a key to itself');
        }
        if (reverseRedirectKeysMap.has(canonicalKey)) {
          throw new Error('cannot have multiple redirects keys point to the same canonical key');
        }
        if (redirectKeysMap.has(canonicalKey)) {
          throw new Error('the canonical key must be terminal and cannot already be part of a redirect chain');
        }
        redirectKeysMap.set(key, canonicalKey);
        reverseRedirectKeysMap.set(canonicalKey, key);
        // evict key at original location as it now lives at the canonical key
        this.recordsMap.delete(key);
        this.visitedIdsSet.add(key);
      }
      broadcast(rebuildSnapshot, snapshotAvailable) {
        // Note: we should always get the subscription references from this at the beginning
        // of the function, in case the reference changes (because of an unsubscribe)
        const {
          snapshotSubscriptions,
          watchSubscriptions,
          visitedIdsSet,
          refreshedIdsSet,
          insertedIdsSet
        } = this;
        const allVisitedIds = visitedIdsSet.keysAsArray();
        const allRefreshedIds = refreshedIdsSet.keysAsArray();
        // Early exit if nothing has changed
        if (allVisitedIds.length === 0 && allRefreshedIds.length === 0) {
          if (this.isUsingStringKeys()) {
            return this.fallbackStringKeyInMemoryStore.broadcast(rebuildSnapshot, snapshotAvailable);
          }
          return Promise.resolve();
        }
        // Process snapshot subscriptions
        for (let i = 0, len = snapshotSubscriptions.length; i < len; i++) {
          const subscription = snapshotSubscriptions[i];
          const {
            snapshot
          } = subscription;
          // Don't re-emit the snapshot if there is no overlap between the visited keys and the
          // snapshot seen keys.
          if (isErrorSnapshot(snapshot) || isNonPendingSnapshotWithNoOverlappingIds(snapshot, allVisitedIds) || isPendingSnapshotWithNoOverlappingIds(snapshot, allVisitedIds, allRefreshedIds)) {
            continue;
          }
          rebuildSnapshot(snapshot, asyncAvailableSnapshot => {
            this.emitOrRefreshRebuiltSnapshot(asyncAvailableSnapshot, subscription, snapshotAvailable);
          });
        }
        // Process watch subscriptions
        for (let i = 0, len = watchSubscriptions.length; i < len; i++) {
          const {
            partialKey,
            callback
          } = watchSubscriptions[i];
          const matchingIds = getMatchingIds(partialKey, allVisitedIds);
          if (matchingIds.length > 0) {
            const watchCallbackEntries = [];
            for (let i = 0, len = matchingIds.length; i < len; i++) {
              const id = matchingIds[i];
              const inserted = insertedIdsSet.has(id);
              push.call(watchCallbackEntries, {
                id,
                inserted
              });
            }
            callback(watchCallbackEntries);
          }
        }
        this.visitedIdsSet = new StoreKeySet();
        this.refreshedIdsSet = new StoreKeySet();
        this.insertedIdsSet = new StoreKeySet();
        return Promise.resolve();
      }
      /**
       * Broadcasts an ErrorSnapshot to any Pending snapshots for the given
       * recordId.
       */
      broadcastNonCachedSnapshot(key, errorSnapshot) {
        if (typeof key === 'string') {
          this.fallbackStringKeyInMemoryStore.broadcastNonCachedSnapshot(key, errorSnapshot);
          return;
        }
        // Note: we should always get the subscription references from this at the beginning
        // of the function, in case the reference changes (because of an unsubscribe)
        const {
          snapshotSubscriptions
        } = this;
        for (let i = 0, len = snapshotSubscriptions.length; i < len; i++) {
          const subscription = snapshotSubscriptions[i];
          const {
            snapshot,
            callback
          } = subscription;
          // if the subscriber is pending and its recordId matches then emit
          // the error to it
          if (isPendingSnapshot(snapshot) && snapshot.recordId === key) {
            subscription.snapshot = errorSnapshot;
            callback(errorSnapshot);
          }
        }
      }
      lookup(selector, createSnapshot, refresh, ttlStrategy) {
        return createSnapshot(selector, refresh, ttlStrategy);
      }
      subscribe(snapshot, callback) {
        if (this.delegateToFallbackStringKeyStore(snapshot)) {
          return this.fallbackStringKeyInMemoryStore.subscribe(snapshot, callback);
        }
        const subscription = {
          snapshot,
          callback
        };
        this.snapshotSubscriptions = [...this.snapshotSubscriptions, subscription];
        if (!isErrorSnapshot(snapshot)) {
          this.retainSnapshotIds(snapshot);
        }
        return () => {
          const {
            snapshotSubscriptions
          } = this;
          const index = indexOf.call(snapshotSubscriptions, subscription);
          // only attempt to slice if the subscription is in the list (in case someone
          // calls unsubscribe multiple times)
          if (index > -1) {
            this.snapshotSubscriptions = [...slice.call(snapshotSubscriptions, 0, index), ...slice.call(snapshotSubscriptions, index + 1)];
            {
              this.snapshotSubscriptions = freeze(this.snapshotSubscriptions);
            }
            // need to re-gather snapshot associated Ids to capture latest refs
            const {
              snapshot
            } = subscription;
            if (!isErrorSnapshot(snapshot)) {
              this.releaseSnapshotIds(snapshot);
            }
          }
        };
      }
      updateAvailable(keys) {
        if (keys.length > 0 && typeof keys[0] === 'string') {
          return this.fallbackStringKeyInMemoryStore.updateAvailable(keys);
        }
        // Note: we should always get the subscription references from this at the beginning
        // of the function, in case the reference changes (because of an unsubscribe)
        const {
          snapshotSubscriptions
        } = this;
        // read metadata for each key, and mark as expired
        this.expirePossibleStaleRecords(keys);
        // Process snapshot subscriptions
        const pendingPromises = [];
        for (let i = 0, len = snapshotSubscriptions.length; i < len; i++) {
          const subscription = snapshotSubscriptions[i];
          const {
            snapshot
          } = subscription;
          if (isErrorSnapshot(snapshot)) {
            // TODO: If we want to support refreshing Error Snapshots, we will need
            // to update the ErrorSnapshot interface to include the recordId, or
            // resolve the snapshot through its refresh.config property
            continue;
          }
          if (!hasOverlappingIds(snapshot, keys)) {
            continue;
          }
          pendingPromises.push(this.refreshSnapshot(snapshot));
        }
        // resolves after all snapshots refresh resolve
        // for now catch in case of reject and resolve
        return Promise.all(pendingPromises).then(_promises => undefined).catch(_err => Promise.resolve(undefined));
      }
      retain(keys) {
        if (keys.length > 0 && typeof keys[0] === 'string') {
          return this.fallbackStringKeyInMemoryStore.retain(keys);
        }
        for (let i = 0, keysLength = keys.length; i < keysLength; i++) {
          const key = keys[i];
          this.increaseRetentionCount(key);
        }
        return () => {
          this.release(keys);
        };
      }
      watch(partialKey, callback) {
        if (typeof partialKey === 'string') {
          return this.fallbackStringKeyInMemoryStore.watch(partialKey, callback);
        }
        const subscription = {
          partialKey,
          callback
        };
        this.watchSubscriptions = [...this.watchSubscriptions, subscription];
        return () => {
          const {
            watchSubscriptions
          } = this;
          const index = indexOf.call(watchSubscriptions, subscription);
          this.watchSubscriptions = [...slice.call(watchSubscriptions, 0, index), ...slice.call(watchSubscriptions, index + 1)];
          {
            this.watchSubscriptions = freeze(this.watchSubscriptions);
          }
        };
      }
      /**
       * Evicts data at the canonical key location and marks any redirects (if applicable)
       * to the key as visited
       * @param key key to evict
       */
      evict(key) {
        if (typeof key === 'string') {
          this.fallbackStringKeyInMemoryStore.evict(key);
          return;
        }
        // find and evict the canonical key
        const canonicalKey = this.getCanonicalRecordId(key);
        this.recordsMap.delete(canonicalKey);
        this.markVisited(canonicalKey);
      }
      cleanup() {
        if (this.fallbackStringKeyInMemoryStore.pendingTrimKeys.size > 0) {
          this.fallbackStringKeyInMemoryStore.cleanup();
        }
      }
      /**
       * Deallocates data at the canonical key location for in-memory (L1) cache
       * @param key key to deallocate
       */
      dealloc(key) {
        if (typeof key === 'string') {
          this.fallbackStringKeyInMemoryStore.dealloc(key);
          return;
        }
        // find and deallocate the canonical key
        const canonicalKey = this.getCanonicalRecordId(key);
        this.recordsMap.delete(canonicalKey);
      }
      keyExistsInStore(key) {
        if (typeof key === 'string') {
          return this.fallbackStringKeyInMemoryStore.keyExistsInStore(key);
        }
        return this.recordsMap.get(key) !== undefined;
      }
      publishMetadata(key, storeMetadata) {
        if (typeof key === 'string') {
          this.fallbackStringKeyInMemoryStore.publishMetadata(key, storeMetadata);
          return;
        }
        this.putMetadata(key, storeMetadata, true);
        const canonicalKey = this.getCanonicalRecordId(key);
        this.markRefreshed(canonicalKey);
      }
      putMetadata(key, storeMetadata, adjustTTLOverride) {
        if (typeof key === 'string') {
          this.fallbackStringKeyInMemoryStore.putMetadata(key, storeMetadata, adjustTTLOverride);
          return;
        }
        const {
          namespace,
          representationName,
          ingestionTimestamp
        } = storeMetadata;
        const ttlOverrideKey = this.buildStructuredKey(namespace, representationName, {});
        const ttlOverride = getTTLOverride(ttlOverrideKey, this.ttlOverridesMap, this.defaultTTLOverride);
        const canonicalKey = this.getCanonicalRecordId(key);
        if (ttlOverride !== undefined && adjustTTLOverride) {
          // It should check if the namespace + representationName exists in the ttlOverride map.
          // If a ttlOverride does exist, calculate a new ExpirationTimestamp with the override.
          const newExpiration = ingestionTimestamp + ttlOverride;
          // Create a new StoreMetadata object and publish the new object to storeMetadata.
          const metaDataOverride = {
            ...storeMetadata,
            expirationTimestamp: newExpiration
          };
          this.metadataMap.set(canonicalKey, metaDataOverride);
        } else {
          // If it does not exist, publish the user passed StoreMetadata into the storeMetadata map.
          this.metadataMap.set(canonicalKey, storeMetadata);
        }
      }
      expirePossibleStaleRecords(keys) {
        if (keys.length > 0 && typeof keys[0] === 'string') {
          return this.fallbackStringKeyInMemoryStore.expirePossibleStaleRecords(keys);
        }
        const expirationTimestamp = Date.now();
        for (let i = 0, len = keys.length; i < len; i++) {
          const key = keys[i];
          const metadata = this.readMetadata(key);
          if (metadata !== undefined) {
            this.publishMetadata(key, {
              ...metadata,
              expirationTimestamp
            });
          }
        }
      }
      setTTLOverride(namespace, representationName, ttl) {
        // Set the TTLs in both the stores
        this.fallbackStringKeyInMemoryStore.setTTLOverride(namespace, representationName, ttl);
        this.ttlOverridesMap.set(this.buildStructuredKey(namespace, representationName, {}), ttl);
      }
      getTTLOverride(namespace, representationName) {
        return this.ttlOverridesMap.get(this.buildStructuredKey(namespace, representationName, {}));
      }
      getTTLOverrides() {
        return this.ttlOverridesMap;
      }
      setDefaultTTLOverride(ttl) {
        // Set the TTLs in both the stores
        this.fallbackStringKeyInMemoryStore.setDefaultTTLOverride(ttl);
        this.defaultTTLOverride = ttl;
      }
      getDefaultTTLOverride() {
        return this.defaultTTLOverride;
      }
      reset() {
        this.recordsMap = new StoreKeyMap();
        this.snapshotSubscriptions = [];
        this.watchSubscriptions = [];
        this.visitedIdsSet = new StoreKeySet();
        this.refreshedIdsSet = new StoreKeySet();
        this.insertedIdsSet = new StoreKeySet();
        this.redirectKeysMap = new StoreKeyMap();
        this.reverseRedirectKeysMap = new StoreKeyMap();
        this.retainedIdsMap = new StoreKeyMap();
        this.ttlOverridesMap = new StoreKeyMap();
        this.trimTask = null;
        this.metadataMap = new StoreKeyMap();
        this.defaultTTLOverride = undefined;
        // Don't emit this for now as InMemoryStore's reset() also calls emitLuvioStoreEvent
        //emitLuvioStoreEvent({ type: 'store-reset', timestamp: Date.now() }, this.eventObservers);
        // Also reset the fallbackStringKeyInMemoryStore
        this.fallbackStringKeyInMemoryStore.reset();
      }
      addStoreEventObserver(storeEventObserver) {
        const inMemoryStoreUnsubscribe = this.fallbackStringKeyInMemoryStore.addStoreEventObserver(storeEventObserver);
        this.eventObservers.push(storeEventObserver);
        return () => {
          const {
            eventObservers
          } = this;
          const index = this.eventObservers.indexOf(storeEventObserver);
          if (index > -1) {
            this.eventObservers = [...slice.call(eventObservers, 0, index), ...slice.call(eventObservers, index + 1)];
          }
          inMemoryStoreUnsubscribe();
        };
      }
      // public in memory methods
      scheduleTrim() {
        if (this.fallbackStringKeyInMemoryStore.pendingTrimKeys.size > 0) {
          this.fallbackStringKeyInMemoryStore.scheduleTrim();
          return;
        }
        if (this.trimTask === null) {
          this.trimTask = () => {
            const {
              metadataMap,
              retainedIdsMap,
              pendingTrims
            } = this;
            let deallocCount = 0;
            const now = Date.now();
            pendingTrims.forEach(key => {
              const recordExpiration = metadataMap.get(key);
              if (retainedIdsMap.get(key) !== undefined || recordExpiration === undefined || recordExpiration !== undefined && recordExpiration.expirationTimestamp >= now) {
                return;
              }
              this.dealloc(key);
              deallocCount++;
            });
            pendingTrims.clear();
            return Promise.resolve({
              deallocatedCount: deallocCount
            });
          };
          this.scheduler(this.trimTask, () => {
            this.trimTask = null;
          });
        }
      }
      // private/protected methods
      /**
       * Updates a subscription with a new snapshot and performs retention book-keeping
       * on the existing and new snapshot.
       */
      updateSubscriptionSnapshot(subscription, newSnapshot) {
        const {
          snapshot: oldSnapshot
        } = subscription;
        if (oldSnapshot === newSnapshot) {
          return;
        }
        subscription.snapshot = newSnapshot;
        if (!isErrorSnapshot(newSnapshot)) {
          this.retainSnapshotIds(newSnapshot);
        }
        if (!isErrorSnapshot(oldSnapshot)) {
          this.releaseSnapshotIds(oldSnapshot);
        }
      }
      refreshSnapshot(snapshot) {
        const {
          refresh
        } = snapshot;
        if (refresh !== undefined) {
          return refresh.resolve(refresh.config);
        }
        return Promise.resolve(undefined);
      }
      instrumentIngestedNewData(snapshot, rebuiltSnapshot) {
        const recordId = rebuiltSnapshot.recordId;
        const recordMetadata = this.metadataMap.get(recordId);
        // Non-batch scenario
        if (recordMetadata) {
          emitLuvioStoreEvent({
            type: 'cache-miss-out-of-ttl',
            oldSnapshot: snapshot,
            newSnapshot: rebuiltSnapshot,
            recordId,
            recordMetadata,
            timestamp: Date.now()
          }, this.eventObservers);
        } else {
          rebuiltSnapshot.seenRecords.keysAsArray().forEach(seenRecordId => {
            const seenRecordMetadata = this.metadataMap.get(seenRecordId);
            if (seenRecordMetadata) {
              emitLuvioStoreEvent({
                type: 'cache-miss-out-of-ttl',
                oldSnapshot: snapshot,
                newSnapshot: rebuiltSnapshot,
                recordId: seenRecordId,
                recordMetadata: seenRecordMetadata,
                timestamp: Date.now()
              }, this.eventObservers);
            }
          });
        }
      }
      emitOrRefreshRebuiltSnapshot(rebuiltSnapshot, subscription, snapshotAvailable) {
        const {
          snapshot,
          callback
        } = subscription;
        // if the rebuilt snapshot is pending then continue on, broadcast will get
        // called again once the pending snapshot is resolved
        if (isPendingSnapshot(rebuiltSnapshot)) {
          if (isPendingSnapshot(snapshot)) {
            this.updateSubscriptionSnapshot(subscription, rebuiltSnapshot);
          }
          return;
        }
        this.updateSubscriptionSnapshot(subscription, rebuiltSnapshot);
        if (snapshotAvailable(rebuiltSnapshot)) {
          // TODO [W-10186366]: revisit if we want to handle errors thrown in user-land callback
          if (rebuiltSnapshot !== snapshot) {
            callback(rebuiltSnapshot);
          }
          this.instrumentIngestedNewDataOnFulfilledSnapshots(snapshot, rebuiltSnapshot);
        } else if (isUnfulfilledSnapshot(rebuiltSnapshot)) {
          const {
            refresh
          } = rebuiltSnapshot;
          if (refresh !== undefined) {
            refresh.resolve(refresh.config);
          }
        }
      }
      instrumentIngestedNewDataOnFulfilledSnapshots(snapshot, rebuiltSnapshot) {
        if (isFulfilledSnapshot(snapshot) && isFulfilledSnapshot(rebuiltSnapshot)) {
          this.instrumentIngestedNewData(snapshot, rebuiltSnapshot);
        }
      }
      retainSnapshotIds(snapshot) {
        const {
          recordId,
          seenRecords
        } = snapshot;
        const snapshotRetainedIds = seenRecords === undefined ? [recordId] : [recordId, ...seenRecords.keysAsArray()];
        this.retain(snapshotRetainedIds);
      }
      releaseSnapshotIds(snapshot) {
        const {
          recordId,
          seenRecords
        } = snapshot;
        const snapshotReleaseIds = seenRecords === undefined ? [recordId] : [recordId, ...seenRecords.keysAsArray()];
        this.release(snapshotReleaseIds);
      }
      increaseRetentionCount(key) {
        const count = this.retainedIdsMap.get(key);
        this.retainedIdsMap.set(key, count === undefined ? 1 : count + 1);
        // do not consider this key for trim while retained
        this.pendingTrims.delete(key);
      }
      decreaseRetentionCount(key) {
        const count = this.retainedIdsMap.get(key);
        if (count === 1) {
          // consider this key for trimming when ref count goes to zero
          this.pendingTrims.add(key);
          this.retainedIdsMap.delete(key);
          return true;
        } else if (count === undefined) {
          return false;
        } else {
          this.retainedIdsMap.set(key, count - 1);
        }
        return false;
      }
      release(keys) {
        const keysLength = keys.length;
        let shouldScheduleTrim = false;
        for (let i = 0; i < keysLength; i++) {
          const key = keys[i];
          const result = this.decreaseRetentionCount(key);
          if (result === true) {
            shouldScheduleTrim = true;
          }
        }
        // only schedule trim if an entry is removed from retention map
        if (shouldScheduleTrim === true) {
          // schedule trim for next tick
          this.scheduleTrim();
        }
      }
      markVisited(canonicalKey) {
        if (typeof canonicalKey === 'string') {
          this.fallbackStringKeyInMemoryStore.markVisited(canonicalKey);
          return;
        }
        const {
          visitedIdsSet,
          reverseRedirectKeysMap
        } = this;
        let redirectKey = canonicalKey;
        // mark all redirects leading up to the canonical key as visited so
        // affected snapshots are updated
        do {
          visitedIdsSet.add(redirectKey);
          redirectKey = reverseRedirectKeysMap.get(redirectKey);
        } while (redirectKey !== undefined);
      }
      markRefreshed(canonicalKey) {
        const {
          refreshedIdsSet,
          reverseRedirectKeysMap
        } = this;
        let redirectKey = canonicalKey;
        // mark all redirects leading up to the canonical key as refreshed so
        // affected snapshots are updated
        do {
          refreshedIdsSet.add(redirectKey);
          redirectKey = reverseRedirectKeysMap.get(redirectKey);
        } while (redirectKey !== undefined);
      }
      isUsingStringKeys() {
        return keys(this.fallbackStringKeyInMemoryStore.visitedIds).length !== 0 || keys(this.fallbackStringKeyInMemoryStore.refreshedIds).length !== 0;
      }
      delegateToFallbackStringKeyStore(snapshot) {
        return !isErrorSnapshot(snapshot) && typeof snapshot.recordId === 'string';
      }
      emitStorePublishEvent(keyMetadata) {
        emitLuvioStoreEvent({
          type: 'store-publish',
          timestamp: Date.now(),
          store: this,
          key: keyMetadata,
          keySchema: this.buildKeySchema(keyMetadata)
        }, this.eventObservers);
      }
      buildStructuredKey(namespace, representationName, idValues) {
        {
          const undefinedIdValues = entries(idValues).filter(entry => entry[1] === undefined);
          if (undefinedIdValues.length > 0) {
            throw new Error(`Undefined value for config keys: ${undefinedIdValues.map(entry => entry[0]).join(', ')}. Undefined values are not supported- use null instead.`);
          }
        }
        const key = {
          ...idValues,
          namespace,
          representationName
        };
        return key;
      }
      buildIngestionStagingStore() {
        const store = new InMemoryStore();
        store.ttlOverridesMap = this.ttlOverridesMap;
        store.defaultTTLOverride = this.defaultTTLOverride;
        store.redirectKeysMap = this.redirectKeysMap;
        store.reverseRedirectKeysMap = this.reverseRedirectKeysMap;
        store.fallbackStringKeyInMemoryStore = this.fallbackStringKeyInMemoryStore.buildIngestionStagingStore();
        return store;
      }
      /**
       * Builds keySchema from provided NormalizedKeyMetadata.
       *
       * Rules of key schema:
       *   1. all keys start with "namespace":"representationName:"
       *   2. sort keys from extracted key metadata, as ordering is not guaranteed
       */
      buildKeySchema(keyMetadata) {
        // pull NamespacedType type out of NormalizedKeyMetadata
        const {
          namespace: _ns,
          representationName: _rn,
          ...keyParamValues
        } = keyMetadata;
        const keySchema = keys(keyParamValues).sort();
        return ['namespace', 'representationName', ...keySchema];
      }
      serialize() {
        return this.fallbackStringKeyInMemoryStore.serialize();
      }
    }
    function adapterToNetworkPriority(priority) {
      switch (priority) {
        case 'background':
          return 'background';
        case 'high':
          return 'high';
        case 'normal':
        default:
          return 'normal';
      }
    }
    exports.HttpStatusCode = void 0;
    (function (HttpStatusCode) {
      HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
      HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
      HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
      HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
      HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
      HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
      HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
      HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
      HttpStatusCode[HttpStatusCode["ServerError"] = 500] = "ServerError";
      HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(exports.HttpStatusCode || (exports.HttpStatusCode = {}));
    /**
     * A type guard function for determining if an unknown object is a {@link FormData}
     */
    function isFormData(obj) {
      return typeof obj === 'object' && obj !== null && 'namedEntries' in obj && isArray(obj.namedEntries);
    }
    /**
     * A type guard function for determining if an unknown object is a {@link FileReference}
     */
    function isFileReference(entryValue) {
      return typeof entryValue === 'object' && entryValue !== null && 'isFileReference' in entryValue && entryValue.isFileReference === true;
    }
    function coerceAdapterRequestContext(adapterRequestContext) {
      const {
        priority,
        requestCorrelator,
        eventObservers,
        sourceContext
      } = adapterRequestContext;
      return {
        networkPriority: adapterToNetworkPriority(priority),
        requestCorrelator,
        eventObservers,
        sourceContext
      };
    }
    function appendTTLStrategy(storeLookup, ttlStrategy) {
      const returnStoreLookup = (sel, refresh) => storeLookup(sel, refresh, ttlStrategy);
      // append ttlStrategy to storeLookup function (in cases where custom adapter
      // wants to perform it's own lookup)
      returnStoreLookup.ttlStrategy = ttlStrategy;
      return returnStoreLookup;
    }
    function buildNetworkSnapshot(args) {
      const {
        buildNetworkSnapshot,
        buildSnapshotContext,
        coercedAdapterRequestContext
      } = args;
      return buildNetworkSnapshot(buildSnapshotContext, coercedAdapterRequestContext).then(snapshot => snapshot.state === 'Pending' ? args.resolvePendingSnapshot(snapshot) : snapshot);
    }
    function buildTTLStrategy(staleDurationMilliseconds = 0) {
      return (timestamp, metadata, valueIsError) => {
        if (metadata !== undefined) {
          const {
            expirationTimestamp
          } = metadata;
          if (timestamp > expirationTimestamp) {
            if (timestamp <= expirationTimestamp + staleDurationMilliseconds && valueIsError !== true) {
              return exports.StoreResolveResultState.Stale;
            }
            return exports.StoreResolveResultState.NotPresent;
          }
        }
        if (valueIsError === true) {
          return exports.StoreResolveResultState.Error;
        }
        return exports.StoreResolveResultState.Found;
      };
    }
    // TODO - update userland-facing APIs to return `AvailableSnapshot` instead of `Snapshot`
    // and then the signatures here can be updated as well
    function buildAvailableSnapshotFromCachedSnapshotResponse(cachedSnapshot, availableSnapshotFunc) {
      if (isPromise(cachedSnapshot)) {
        return cachedSnapshot.then(availableSnapshotFunc);
      }
      return availableSnapshotFunc(cachedSnapshot);
    }
    function buildCacheAndNetworkImplementation(staleDurationSeconds = 0) {
      return function (args) {
        const {
          buildCachedSnapshot,
          buildNetworkSnapshot: buildNetworkSnapshot$1,
          buildSnapshotContext,
          storeLookup,
          coercedAdapterRequestContext,
          luvio
        } = args;
        const staleDurationMilliseconds = staleDurationSeconds * 1000;
        const cachedSnapshot = buildCachedSnapshot(buildSnapshotContext, appendTTLStrategy(storeLookup, buildTTLStrategy(staleDurationMilliseconds)), luvio);
        return buildAvailableSnapshotFromCachedSnapshotResponse(cachedSnapshot, snapshot => {
          if (snapshot !== undefined) {
            // data found in L1 cache
            if (isFulfilledSnapshot(snapshot) || isErrorSnapshot(snapshot) || isStaleSnapshot(snapshot)) {
              // kick off network request, do not await it
              buildNetworkSnapshot$1(buildSnapshotContext, coercedAdapterRequestContext);
              // return the cached snapshot to caller
              return snapshot;
            }
            if (isPendingSnapshot(snapshot)) {
              return args.resolvePendingSnapshot(snapshot);
            }
            // any other state falls through to network snapshot
          }
          return buildNetworkSnapshot(args);
        });
      };
    }
    const cacheThenNetworkImplementation = function (args) {
      const {
        buildCachedSnapshot,
        buildSnapshotContext,
        storeLookup,
        luvio
      } = args;
      const cachedSnapshot = buildCachedSnapshot(buildSnapshotContext, appendTTLStrategy(storeLookup, buildTTLStrategy()), luvio);
      return buildAvailableSnapshotFromCachedSnapshotResponse(cachedSnapshot, snapshot => {
        if (snapshot !== undefined) {
          if (isFulfilledSnapshot(snapshot) || isErrorSnapshot(snapshot)) {
            return snapshot;
          }
          if (isPendingSnapshot(snapshot)) {
            return args.resolvePendingSnapshot(snapshot);
          }
        }
        return buildNetworkSnapshot(args);
      });
    };
    const noCacheImplementation = function (args) {
      return buildNetworkSnapshot(args);
    };
    const onlyIfCachedImplementation = function (args) {
      const {
        buildCachedSnapshot,
        buildSnapshotContext,
        storeLookup,
        luvio
      } = args;
      const cachedSnapshot = buildCachedSnapshot(buildSnapshotContext, appendTTLStrategy(storeLookup, buildTTLStrategy()), luvio);
      return buildAvailableSnapshotFromCachedSnapshotResponse(cachedSnapshot, snapshot => {
        if (snapshot !== undefined && (isFulfilledSnapshot(snapshot) || isErrorSnapshot(snapshot))) {
          return snapshot;
        }
        const refresh = snapshot !== undefined ? snapshot.refresh : undefined;
        return createErrorSnapshot({
          body: undefined,
          headers: {},
          ok: false,
          status: exports.HttpStatusCode.GatewayTimeout,
          statusText: 'Data requested with only-if-cached policy and not found in the cache.',
          errorType: 'fetchResponse'
        }, refresh);
      });
    };
    function buildStaleWhileRevalidateImplementation(staleDurationSeconds) {
      return function (args) {
        const {
          buildCachedSnapshot,
          buildNetworkSnapshot: buildNetworkSnapshot$1,
          buildSnapshotContext,
          storeLookup,
          coercedAdapterRequestContext,
          luvio
        } = args;
        const staleDurationMilliseconds = staleDurationSeconds * 1000;
        const cachedSnapshot = buildCachedSnapshot(buildSnapshotContext, appendTTLStrategy(storeLookup, buildTTLStrategy(staleDurationMilliseconds)), luvio);
        return buildAvailableSnapshotFromCachedSnapshotResponse(cachedSnapshot, snapshot => {
          if (snapshot !== undefined) {
            if (isFulfilledSnapshot(snapshot) || isErrorSnapshot(snapshot)) {
              return snapshot;
            }
            if (isPendingSnapshot(snapshot)) {
              return args.resolvePendingSnapshot(snapshot);
            }
            if (snapshot.state === SnapshotState.Stale) {
              buildNetworkSnapshot$1(buildSnapshotContext, coercedAdapterRequestContext);
              return snapshot;
            }
          }
          return buildNetworkSnapshot(args);
        });
      };
    }
    function buildValidAtImplementation(basePolicyImplementation, timestamp) {
      return function validAtImplementation(args) {
        // This somewhat convoluted code is used to force the basePolicyImplementation's
        // TTLStrategy to use the the valid-at cache policy's timestamp. The flow goes:
        //
        // Environment.applyCachePolicy => validAtImplementation (this function) =>
        //    basePolicyImplementation => adapter's buildCachedSnapshot =>
        //    basePolicyImplementation's storeLookup => validAtStoreLookup (below) =>
        //    Environment.applyCachePolicy's storeLookup => InMemoryStore/Reader code =>
        //    valid-at TTLStrategy (below) =>
        //    basePolicyImplementation's TTLStrategy (with valid-at timestamp)
        const validAtStoreLookup = (sel, refresh, ttlStrategy) => args.storeLookup(sel, refresh, (_readerTimestamp, metadata, valueIsError) => ttlStrategy(timestamp, metadata, valueIsError));
        // let basePolicy make all the decisions, but have it use our storeLookup
        // so we can override the timestamp passed to the basePolicy's TTLStrategy
        return basePolicyImplementation({
          ...args,
          storeLookup: validAtStoreLookup
        });
      };
    }
    function isNodeLink(node) {
      return typeof node === 'object' && node !== null && hasOwnProperty.call(node, '__ref');
    }
    function isGraphNode(node) {
      return node !== null && node.type === GraphNodeType.Node;
    }
    var GraphNodeType;
    (function (GraphNodeType) {
      GraphNodeType["Link"] = "Link";
      GraphNodeType["Node"] = "Node";
      GraphNodeType["Error"] = "Error";
      GraphNodeType["Locked"] = "Locked";
    })(GraphNodeType || (GraphNodeType = {}));
    class GraphNodeError {
      constructor(store, data) {
        this.type = GraphNodeType.Error;
        this.store = store;
        this.data = data;
      }
      retrieve() {
        return this.data;
      }
    }
    function followLink(store, key) {
      return store.readEntry(key);
    }
    class GraphLink {
      constructor(store, data) {
        this.type = GraphNodeType.Link;
        this.store = store;
        this.data = data;
      }
      isPending() {
        return this.data.pending === true;
      }
      isMissing() {
        return this.data.isMissing === true;
      }
      follow() {
        const {
          __ref
        } = this.data;
        if (__ref === undefined) {
          return null;
        }
        const linked = followLink(this.store, __ref);
        if (linked === null || linked === undefined) {
          return null;
        }
        if (isStoreRecordError(linked)) {
          return new GraphNodeError(this.store, linked);
        }
        return new GraphNode(this.store, linked, __ref);
      }
      linkData() {
        return this.data.data;
      }
      writeLinkData(data) {
        this.data.data = data;
      }
    }
    class GraphNode {
      constructor(store, data, storeKey) {
        this.type = GraphNodeType.Node;
        this.store = store;
        this.data = data;
        this.storeKey = storeKey;
      }
      object(propertyName) {
        const value = this.data[propertyName];
        if (isNodeLink(value)) {
          throw new Error(`Cannot walk to path ${String(propertyName)}. "${String(propertyName)}" is a link: "${value}"`);
        }
        if (typeof value !== 'object' || value === null) {
          throw new Error(`Cannot walk to path ${String(propertyName)}. "${String(propertyName)}" is a scalar: "${value}"`);
        }
        // We're walking to an object property on the current store record, pass the storeKey down.
        return new GraphNode(this.store, value, this.storeKey);
      }
      link(propertyName) {
        const value = this.data[propertyName];
        if (!isNodeLink(value)) {
          throw new Error(`Cannot walk to link ${String(propertyName)}. "${String(propertyName)}" is not a link: "${value}"`);
        }
        return new GraphLink(this.store, value);
      }
      scalar(propertyName) {
        const value = this.data[propertyName];
        if (typeof value === 'object' && value !== null) {
          throw new Error(`Cannot return value at path ${String(propertyName)}. ${String(propertyName)} is not a scalar.`);
        }
        return value;
      }
      keys() {
        return keys(this.data);
      }
      isScalar(propertyName) {
        // TODO W-6900046 - merge.ts casts these to any and manually sets `data`
        // so this guard is required
        if (this.data === undefined) {
          return true;
        }
        const value = this.data[propertyName];
        return typeof value !== 'object' || value === null;
      }
      isMissing(propertyName) {
        const value = this.data[propertyName];
        if (value && typeof value.__state === 'object' && value.__state !== null) {
          return !!value.__state.isMissing;
        }
        return false;
      }
      isPending(propertyName) {
        const value = this.data[propertyName];
        if (value && typeof value.__state === 'object' && value.__state !== null) {
          return !!value.__state.pending;
        }
        return false;
      }
      write(propertyName, value) {
        this.data[propertyName] = value;
        const canonicalKey = this.store.getCanonicalRecordId(this.storeKey);
        this.store.markVisited(canonicalKey);
      }
      isUndefined(propertyName) {
        return this.data[propertyName] === undefined;
      }
      retrieve() {
        return this.data;
      }
    }
    function isUnionObjectSelection(sel) {
      return sel.union === true && sel.kind === 'Object';
    }
    function isReaderFragment(fragment) {
      return fragment.reader === true;
    }
    function isFragmentUnionSelection(sel) {
      return sel.union === true;
    }
    function formatStorageKey(name, argValues) {
      if (!argValues) {
        return name;
      }
      var values = [];
      for (var _argName in argValues) {
        if (hasOwnProperty.call(argValues, _argName)) {
          var value = argValues[_argName];
          if (value !== null || value !== undefined) {
            values.push(_argName + ':' + stringify(value));
          }
        }
      }
      return values.length === 0 ? name : name + '('.concat(values.join(','), ')');
    }
    function getArgumentValues(args, variables) {
      const values = {};
      args.forEach(arg => {
        if (arg.kind === 'Variable') {
          // Variables are provided at runtime and are not guaranteed to be stable.
          values[arg.name] = variables[arg.variableName];
        } else {
          values[arg.name] = arg.value;
        }
      });
      return values;
    }
    function getStorageKey(field, variables) {
      const {
        args,
        name
      } = field;
      if (args && args.length !== 0) {
        return formatStorageKey(name, getArgumentValues(args, variables));
      }
      return name;
    }

    /**
     * Checks if the given variable is defined
     */
    function isDefined(value) {
      return value !== undefined && value !== null;
    }

    /**
     * Checks if the given variable is an object
     */
    function isObject(value) {
      return typeof value === 'object' && value !== null;
    }
    var StoreLinkStateValues;
    (function (StoreLinkStateValues) {
      StoreLinkStateValues[StoreLinkStateValues["NotPresent"] = 0] = "NotPresent";
      StoreLinkStateValues[StoreLinkStateValues["RefNotPresent"] = 1] = "RefNotPresent";
      StoreLinkStateValues[StoreLinkStateValues["RefPresent"] = 2] = "RefPresent";
      StoreLinkStateValues[StoreLinkStateValues["Null"] = 3] = "Null";
      StoreLinkStateValues[StoreLinkStateValues["Missing"] = 4] = "Missing";
      StoreLinkStateValues[StoreLinkStateValues["Pending"] = 5] = "Pending";
    })(StoreLinkStateValues || (StoreLinkStateValues = {}));
    function getLinkState(link) {
      // This condition is hit when the link itself isn't present
      if (link === undefined) {
        return {
          state: StoreLinkStateValues.NotPresent
        };
      }
      if (link === null) {
        return {
          state: StoreLinkStateValues.Null
        };
      }
      const {
        __ref: key,
        pending,
        isMissing
      } = link;
      if (pending === true) {
        return {
          state: StoreLinkStateValues.Pending
        };
      }
      if (isMissing === true) {
        return {
          state: StoreLinkStateValues.Missing
        };
      }
      if (key === undefined) {
        return {
          state: StoreLinkStateValues.RefNotPresent
        };
      }
      return {
        state: StoreLinkStateValues.RefPresent,
        key
      };
    }
    const skipTTLStrategy = (_timestamp, _metadata, valueIsError) => {
      if (valueIsError === true) {
        return exports.StoreResolveResultState.Error;
      }
      return exports.StoreResolveResultState.Found;
    };
    function storeLookup(key, timestamp, store, ttlStrategy) {
      const redirectKeys = store.getRedirectLineage(key);
      const canonicalKey = store.getCanonicalRecordId(key);
      const value = store.readEntry(canonicalKey);
      if (value === undefined) {
        return {
          state: exports.StoreResolveResultState.NotPresent,
          redirects: redirectKeys,
          resolvedKey: canonicalKey
        };
      }
      let version = undefined;
      const metadata = store.readMetadata(canonicalKey);
      if (metadata !== undefined) {
        version = metadata.version;
      }
      const valueIsError = value !== null && isStoreRecordError(value);
      const state = ttlStrategy(timestamp, metadata, valueIsError);
      if (state === exports.StoreResolveResultState.NotPresent || state === exports.StoreResolveResultState.Stale) {
        if (metadata && metadata.ingestionTimestamp) {
          emitLuvioStoreEvent({
            type: 'data-out-of-ttl-duration-update',
            lastExpiredDuration: timestamp - metadata.ingestionTimestamp,
            recordId: canonicalKey,
            storeResolveResultState: state === exports.StoreResolveResultState.NotPresent ? 'not-present' : 'stale'
          }, store.eventObservers);
        }
      }
      switch (state) {
        case exports.StoreResolveResultState.NotPresent:
          return {
            state,
            redirects: redirectKeys,
            resolvedKey: canonicalKey
          };
        case exports.StoreResolveResultState.Error:
          return {
            state,
            value: value.error,
            version,
            redirects: redirectKeys,
            resolvedKey: canonicalKey
          };
        case exports.StoreResolveResultState.Stale:
          return {
            state,
            value,
            version: version,
            redirects: redirectKeys,
            resolvedKey: canonicalKey
          };
        default:
          return {
            state,
            value: value,
            redirects: redirectKeys,
            resolvedKey: canonicalKey,
            version
          };
      }
    }
    const READER_PATH_ROOT = 'ROOT';
    const EMPTY_STRING = '';
    var FragmentReadResultState;
    (function (FragmentReadResultState) {
      FragmentReadResultState[FragmentReadResultState["Missing"] = 0] = "Missing";
      FragmentReadResultState[FragmentReadResultState["Success"] = 1] = "Success";
      FragmentReadResultState[FragmentReadResultState["Error"] = 2] = "Error";
    })(FragmentReadResultState || (FragmentReadResultState = {}));
    const FRAGMENT_READ_RESULT_MISSING = {
      state: FragmentReadResultState.Missing
    };
    function validateUnionSelection(record, selection, path) {
      const {
        discriminator
      } = selection;
      const discriminatorValue = record[discriminator];
      if (discriminatorValue === undefined) {
        throw new Error(`Invalid discriminator. Expected discriminator at path "${path.fullPath}.${discriminator}" but received "${stringify(record)}"`);
      }
      const unionSelection = selection.unionSelections[discriminatorValue];
      if (unionSelection === undefined) {
        const keys = Object.keys(selection.unionSelections).map(key => `"${key}"`).join(', ');
        throw new Error(`Invalid union selection. Expected to be one of ${keys} but received "${discriminatorValue}"`);
      }
    }
    function resolveLink(reader, storeLink, version) {
      const {
        StoreLinkStateValues
      } = reader;
      const linkState = reader.getLinkState(storeLink);
      switch (linkState.state) {
        case StoreLinkStateValues.RefNotPresent:
        case StoreLinkStateValues.NotPresent:
        case StoreLinkStateValues.Missing:
          reader.markMissingLink(storeLink.__ref);
          reader.markMissing();
          return;
        case StoreLinkStateValues.Pending:
          reader.markPending();
          return;
        case StoreLinkStateValues.Null:
          {
            throw new Error(`TODO: Invalid Link State. Link on "${reader.currentPath.fullPath}"`);
          }
      }
      const {
        key: __ref
      } = linkState;
      return reader.read({
        recordId: __ref,
        node: {
          kind: 'Fragment',
          private: [],
          opaque: true,
          version
        },
        variables: {}
      });
    }
    const readerOpaqueReferenceMap = new WeakMap();
    class Reader {
      constructor(store, variables, refresh, baseSnapshot, ttlStrategy) {
        this.store = store;
        this.hasPendingData = false;
        this.getLinkState = getLinkState;
        this.StoreLinkStateValues = StoreLinkStateValues;
        this.StoreResolveResultState = exports.StoreResolveResultState;
        this.variables = variables;
        this.seenIds = new StoreKeySet();
        this.missingPaths = new StoreKeySet();
        this.missingLinks = new StoreKeySet();
        this.isMissingData = false;
        this.hasStaleData = false;
        this.refresh = refresh;
        // When we aren't passed a base snapshot, we don't have to worry about
        // marking the snapshot as changed because there is nothing to compare against.
        // Therefore, our initial state is that the snapshot has changed.
        let snapshotChanged = true;
        // When we aren't passed a base snapshot, we do not have any previous data
        // So we can just assign this to undefined
        let baseSnapshotValue = undefined;
        // When we are passed a base snapshot, we want to keep track of the previous data
        // We also will need to compare all of our data against the snapshot's previous data
        // Our initial state is that the snapshot has not changed. The reason for this is because
        // Once we detect a change, we can just flip this boolean on the first change and then
        // not have to worry about it for additional changes.
        if (baseSnapshot !== undefined && (baseSnapshot.state === SnapshotState.Fulfilled || baseSnapshot.state === SnapshotState.Stale)) {
          baseSnapshotValue = baseSnapshot.data;
          snapshotChanged = false;
        }
        this.snapshotChanged = snapshotChanged;
        this.currentPath = {
          fullPath: EMPTY_STRING,
          key: READER_PATH_ROOT,
          parent: null,
          baseSnapshotValue
        };
        this.baseSnapshot = baseSnapshot;
        this.timestamp = Date.now();
        this.ttlStrategy = ttlStrategy === undefined ? skipTTLStrategy : ttlStrategy;
      }
      resolveMetadata(source, version) {
        const link = source.__metadata;
        const linkState = getLinkState(link);
        if (linkState.state !== StoreLinkStateValues.RefPresent) {
          this.markMissing();
          return;
        }
        const lookup = this.resolveKey(linkState.key);
        if (lookup.version !== version) {
          this.markMissing();
          return;
        }
        return lookup.value;
      }
      readFragmentUnion(result, selection) {
        const {
          value: record
        } = result;
        {
          validateUnionSelection(record, selection, this.currentPath);
        }
        const {
          discriminator
        } = selection;
        const discriminatorValue = record[discriminator];
        return this.readFragment(result, selection.unionSelections[discriminatorValue]);
      }
      read(selector) {
        const {
          node: selectorNode
        } = selector;
        const {
          recordId: key
        } = selector;
        const result = this.storeLookup(key);
        const fragmentResult = this.readFragment(result, selectorNode);
        switch (fragmentResult.state) {
          case FragmentReadResultState.Missing:
            if (this.isMissingData === false) {
              this.isMissingData = true;
              this.snapshotChanged = true;
            }
            return this.createSnapshot(undefined, selector);
          case FragmentReadResultState.Error:
            return this.createErrorSnapshot(fragmentResult.value);
          default:
            return this.createSnapshot(fragmentResult.value, selector);
        }
      }
      getSnapshotState() {
        if (this.isMissingData === true) {
          return SnapshotState.Unfulfilled;
        }
        if (this.hasPendingData === true) {
          return SnapshotState.Pending;
        }
        if (this.hasStaleData === true) {
          return SnapshotState.Stale;
        }
        return SnapshotState.Fulfilled;
      }
      createErrorSnapshot(data) {
        return {
          data: undefined,
          error: data,
          state: SnapshotState.Error,
          refresh: this.refresh
        };
      }
      createSnapshot(data, selector) {
        // If snapshotChanged === false then we have established that baseSnapshot is present
        // Typescript is unable to conclude this fact hence adding a non-null assertion operator !
        // recordId of selector will be different than of baseSnapshot when reading a child of composite resource
        if (this.snapshotChanged === false && selector.recordId === this.baseSnapshot.recordId) {
          return this.baseSnapshot;
        }
        deepFreeze(data);
        return {
          recordId: selector.recordId,
          select: selector,
          variables: this.variables,
          seenRecords: this.seenIds,
          data,
          state: this.getSnapshotState(),
          missingPaths: this.missingPaths,
          missingLinks: this.missingLinks,
          refresh: this.refresh
        }; // Typescript complains about unfulfilled vs fulfilled snapshot if we don't cast
      }
      // Only works for non-complex values.. No Date or Functions.
      opaqueCopy(value) {
        return parse(stringify(value));
      }
      deepCopy(record, data, key, visitedKeys) {
        const value = record[key];
        this.enterPath(key);
        if (isArray(value)) {
          // Array
          const items = [];
          this.selectAll(value, items, visitedKeys);
          data[key] = items;
        } else if (typeof value === 'object' && value !== null) {
          // Object
          if (value.__ref !== undefined) {
            // Link
            const nextRecordId = value.__ref;
            if (isArray(nextRecordId)) {
              const items = [];
              this.selectAll(nextRecordId, items, visitedKeys);
              data[key] = items;
            } else {
              if (hasOwnProperty.call(visitedKeys, nextRecordId) === true) {
                throw new Error(`Invalid eager selection on records with circular references.`);
              }
              const lookupResult = this.resolveKey(nextRecordId);
              switch (lookupResult.state) {
                case exports.StoreResolveResultState.NotPresent:
                  data[key] = undefined;
                  break;
                case exports.StoreResolveResultState.Found:
                  {
                    const nested = {};
                    this.selectAll(lookupResult.value, nested, {
                      ...visitedKeys,
                      [nextRecordId]: true
                    });
                    data[key] = nested;
                    break;
                  }
              }
            }
          } else {
            // Inlined object
            const items = {};
            this.selectAll(value, items, visitedKeys);
            data[key] = items;
          }
        } else {
          // Scalar
          this.checkIfChanged(value);
          data[key] = value;
        }
        this.exitPath();
      }
      selectAllArray(record, data, visitedKeys) {
        const {
          length
        } = record;
        for (let key = 0; key < length; key += 1) {
          this.deepCopy(record, data, key, visitedKeys);
        }
      }
      selectAllObject(record, data, visitedKeys) {
        const recordKeys = keys(record);
        const {
          length
        } = recordKeys;
        for (let i = 0; i < length; i += 1) {
          const key = recordKeys[i];
          this.deepCopy(record, data, key, visitedKeys);
        }
      }
      selectAll(record, data, visitedKeys = {}) {
        const recordIsArray = isArray(record);
        if (recordIsArray === true) {
          this.selectAllArray(record, data, visitedKeys);
        } else {
          this.selectAllObject(record, data, visitedKeys);
        }
      }
      markPending() {
        this.hasPendingData = true;
      }
      markStale() {
        this.hasStaleData = true;
      }
      markMissing() {
        this.isMissingData = true;
        const fullPath = this.getFullPathString(this.currentPath.fullPath);
        this.missingPaths.add(fullPath);
        this.checkIfChanged(undefined);
      }
      markMissingLink(linkKey) {
        this.missingLinks.add(linkKey);
        this.markMissing();
      }
      unMarkMissing() {
        const fullPath = this.getFullPathString(this.currentPath.fullPath);
        this.missingPaths.delete(fullPath);
        if (this.missingPaths.size() === 0) {
          this.isMissingData = false;
        }
      }
      assignNonScalar(sink, key, value) {
        sink[key] = value;
      }
      enterPath(key) {
        const parent = this.currentPath;
        const {
          key: parentKey,
          fullPath: parentFullPath,
          baseSnapshotValue: parentBaseSnapshotValue
        } = parent;
        let baseSnapshotValue = undefined;
        if (parentBaseSnapshotValue !== undefined && parentBaseSnapshotValue !== null) {
          baseSnapshotValue = parentBaseSnapshotValue[key];
        }
        this.currentPath = {
          parent,
          key,
          fullPath: parentKey === READER_PATH_ROOT ? key : parentFullPath + '.' + key,
          baseSnapshotValue
        };
      }
      exitPath() {
        this.currentPath = this.currentPath.parent;
      }
      readSingleLink(propertyName, selection, source, sink, assignmentProperty) {
        const {
          required,
          nullable,
          fragment
        } = selection;
        const link = source[propertyName];
        const property = assignmentProperty === undefined ? propertyName : assignmentProperty;
        const linkState = getLinkState(link);
        switch (linkState.state) {
          case StoreLinkStateValues.RefNotPresent:
          case StoreLinkStateValues.NotPresent:
          case StoreLinkStateValues.Missing:
            // We need to read synthetic fragments here because data from the link is missing,
            // So we won't have a chance to call readFragment
            if (isReaderFragment(fragment) && fragment.synthetic === true) {
              return this.assignNonScalar(sink, property, fragment.read(this));
            }
            if (linkState.state === StoreLinkStateValues.Missing && required === false) {
              return;
            }
            this.markMissing();
            return;
          case StoreLinkStateValues.Null:
            if (nullable === true) {
              this.readScalar(propertyName, source, sink);
              return;
            }
            throw new Error(`Invalid Link State. Link on "${this.currentPath.fullPath}" is null but selection is not nullable: \n${stringify(selection, null, 2)}`);
          case StoreLinkStateValues.Pending:
            this.markPending();
            return;
          default:
            // if we have a link reference we override the required property passed to true
            // because if there was a missing reference the `isMissing` property would be true and the links state would
            // have returned `Missing`.
            this.readStoreLinkWithRef(linkState, fragment, sink, property, true);
        }
      }
      markRedirectsSeen(state) {
        const {
          redirects
        } = state;
        const {
          length: len
        } = redirects;
        if (len === 0) {
          return;
        }
        for (let i = 0; i < len; i += 1) {
          this.markSeenId(redirects[i]);
        }
      }
      resolveKey(key, options = {}) {
        const lookup = this.storeLookup(key);
        const {
          required
        } = options;
        switch (lookup.state) {
          case exports.StoreResolveResultState.Stale:
            this.markStale();
            break;
          case exports.StoreResolveResultState.NotPresent:
            if (required !== false) {
              this.markMissingLink(key);
            }
            break;
        }
        this.markRedirectsSeen(lookup);
        this.markSeenId(lookup.resolvedKey);
        return lookup;
      }
      readStoreLinkWithRef(linkState, fragment, sink, assignmentProperty, required) {
        const fragmentResult = this.readFragment(this.resolveKey(linkState.key, {
          required
        }), fragment);
        switch (fragmentResult.state) {
          case FragmentReadResultState.Error:
            this.markMissing();
            return;
          case FragmentReadResultState.Success:
            this.assignNonScalar(sink, assignmentProperty, fragmentResult.value);
        }
      }
      readObject(key, selection, source, sink) {
        const sourceValue = source[key];
        if (selection.nullable === true && sourceValue === null) {
          this.readScalar(key, source, sink);
          return;
        }
        if (selection.opaque === true) {
          this.readOpaque(sink, key, sourceValue, selection.required);
          return;
        }
        if (sourceValue === undefined) {
          if (selection.required === false) {
            this.checkIfChanged(sourceValue);
            return;
          }
          return this.markMissing();
        }
        if (typeof sourceValue.__state === 'object') {
          if (selection.supportsMissingMarker === true && sourceValue.__state.isMissing === true) {
            this.checkIfChanged(sourceValue);
            return;
          }
          if (sourceValue.__state.pending === true) {
            this.markPending();
            return;
          }
        }
        const sinkValue = isArray(sourceValue) ? [] : {};
        if (selection.selections === undefined) {
          this.selectAll(sourceValue, sinkValue);
        } else {
          this.traverseSelections(selection, sourceValue, sinkValue);
        }
        this.assignNonScalar(sink, key, sinkValue);
      }
      /**
       * Flip snapshotChanged flag to 'true' if current size of the value 'array' is different from the length of base snapshot.
       *
       * @param value - Sink array to be checked against baseSnapshotValue
       */
      checkIfArrayLengthChanged(value) {
        // If we've already detected a change, just return
        if (this.snapshotChanged === true) {
          return;
        }
        const {
          baseSnapshotValue
        } = this.currentPath;
        if (isDefined(baseSnapshotValue)) {
          this.snapshotChanged = baseSnapshotValue.length !== value.length;
        }
      }
      /**
       * Flip snapshotChanged flag to 'true' if number of keys in the 'Object' is different from the length of keys in base snapshot.
       *
       * @param keys - Array of Object keys to be checked against baseSnapshotValue
       */
      checkIfObjectKeysLengthChanged(keys$1) {
        // If we've already detected a change, just return
        if (this.snapshotChanged === true) {
          return;
        }
        const {
          baseSnapshotValue
        } = this.currentPath;
        if (isDefined(baseSnapshotValue)) {
          this.snapshotChanged = keys$1.length !== keys(baseSnapshotValue).length;
        }
      }
      checkIfChanged(value, options) {
        // If we've already detected a change, just return
        if (this.snapshotChanged === true) {
          return;
        }
        if ((options === null || options === void 0 ? void 0 : options.useDeepEquals) === true) {
          this.snapshotChanged = stringify(this.currentPath.baseSnapshotValue) !== stringify(value);
        } else {
          this.snapshotChanged = this.currentPath.baseSnapshotValue !== value;
        }
      }
      readPluralLink(propertyName, selection, record, data) {
        if (selection.fragment === undefined) {
          return;
        }
        const array = record[propertyName];
        if (array === undefined) {
          if (selection.required === false) {
            return;
          }
          return this.markMissing();
        }
        const sink = data[propertyName] = [];
        for (let i = 0, len = array.length; i < len; i += 1) {
          this.enterPath(i);
          this.readSingleLink(i, selection, array, sink);
          this.exitPath();
        }
        this.checkIfArrayLengthChanged(sink);
      }
      readObjectMap(propertyName, selection, record, data) {
        const obj = record[propertyName];
        if (obj === undefined) {
          if (selection.required === false) {
            return;
          }
          return this.markMissing();
        }
        const sink = data[propertyName] = {};
        const keys$1 = keys(obj);
        this.checkIfObjectKeysLengthChanged(keys$1);
        for (let i = 0, len = keys$1.length; i < len; i += 1) {
          const key = keys$1[i];
          this.enterPath(key);
          this.readObject(key, selection, obj, sink);
          this.exitPath();
        }
      }
      readLinkMap(propertyName, selection, record, data) {
        const map = record[propertyName];
        const keys$1 = keys(map);
        const sink = {};
        this.checkIfObjectKeysLengthChanged(keys$1);
        for (let i = 0, len = keys$1.length; i < len; i += 1) {
          const key = keys$1[i];
          this.enterPath(key);
          this.readSingleLink(key, selection, map, sink);
          this.exitPath();
        }
        this.assignNonScalar(data, propertyName, sink);
      }
      readSuccessResolveState(result, fragment) {
        if (isReaderFragment(fragment) && fragment.synthetic === true) {
          // this state should never occur
          return {
            state: FragmentReadResultState.Missing
          };
        }
        if (isFragmentUnionSelection(fragment)) {
          return this.readFragmentUnion(result, fragment);
        }
        const {
          version
        } = result;
        // apply version checking if version metadata exists
        if (version !== undefined && fragment.version !== undefined && version !== fragment.version) {
          return {
            state: FragmentReadResultState.Missing
          };
        }
        if (isReaderFragment(fragment)) {
          const value = fragment.read(result.value, this);
          return {
            state: FragmentReadResultState.Success,
            value
          };
        }
        if (fragment.opaque) {
          this.checkIfChanged(result.value, {
            useDeepEquals: true
          });
          if (isObject(result.value) && !readerOpaqueReferenceMap.has(result.value)) {
            readerOpaqueReferenceMap.set(result.value, this.opaqueCopy(result.value));
          }
          const opaqueValue = isObject(result.value) ? readerOpaqueReferenceMap.get(result.value) : result.value;
          return {
            state: FragmentReadResultState.Success,
            value: opaqueValue
          };
        }
        const sink = {};
        this.traverseSelections(fragment, result.value, sink);
        return {
          state: FragmentReadResultState.Success,
          value: sink
        };
      }
      readFragment(result, fragment) {
        if (isReaderFragment(fragment) && fragment.synthetic === true) {
          const value = fragment.read(this);
          // Handle the scenario where a synthetic read fails
          // One case being with a top level 404 response
          // from a composite adapter
          if (value.state === 'Error') {
            return {
              state: FragmentReadResultState.Error,
              value: value.value
            };
          }
          return {
            state: FragmentReadResultState.Success,
            value
          };
        }
        switch (result.state) {
          case exports.StoreResolveResultState.NotPresent:
            return FRAGMENT_READ_RESULT_MISSING;
          case exports.StoreResolveResultState.Error:
            return {
              state: FragmentReadResultState.Error,
              value: result.value
            };
          case exports.StoreResolveResultState.Stale:
            this.markStale();
            return this.readSuccessResolveState(result, fragment);
          case exports.StoreResolveResultState.Found:
            return this.readSuccessResolveState(result, fragment);
        }
      }
      readPluralObject(propertyName, selection, record, data) {
        if (selection.selections === undefined) {
          return;
        }
        const array = record[propertyName];
        if (array === undefined) {
          if (selection.required === false) {
            return;
          }
          return this.markMissing();
        }
        const sink = data[propertyName] = [];
        for (let i = 0, len = array.length; i < len; i += 1) {
          this.enterPath(i);
          const nextRecord = array[i];
          if (nextRecord === undefined) {
            this.markMissing();
            this.exitPath();
            return;
          }
          const obj = {};
          this.traverseSelections(selection, nextRecord, obj);
          push.call(sink, obj);
          this.exitPath();
        }
        this.checkIfArrayLengthChanged(sink);
      }
      readOpaque(sink, propertyName, value, required) {
        this.checkIfChanged(value);
        if (value === undefined && required === false) {
          return;
        }
        sink[propertyName] = value; // Should we be using this.opaqueCopy here? Not used by gql but seems bad to directly expose store entries.
      }
      readScalarMap(propertyName, record, data, required) {
        const obj = record[propertyName];
        if (obj === undefined) {
          if (required !== false) {
            this.markMissing();
            return;
          }
          this.checkIfChanged(undefined);
          return;
        }
        const sink = data[propertyName] = {};
        const keys$1 = keys(obj);
        this.checkIfObjectKeysLengthChanged(keys$1);
        for (let i = 0, len = keys$1.length; i < len; i += 1) {
          const key = keys$1[i];
          this.enterPath(key);
          this.readScalar(key, obj, sink);
          this.exitPath();
        }
      }
      readScalarPlural(propertyName, record, data, required) {
        const array = record[propertyName];
        if (array === undefined) {
          if (required === false) {
            return;
          }
          return this.markMissing();
        }
        const sink = data[propertyName] = [];
        // If the current snapshot is already know to be different from
        // previous snapshot, we can fast track and just copy the array
        // over.
        if (this.snapshotChanged === true) {
          // fast path: just copy from array to sink
          push.apply(sink, array);
          return;
        }
        this.checkIfArrayLengthChanged(array);
        // tsc seems to think 'this.snapshotChanged' is constant false here,
        // and it flags comparisons of false === true as error 'ts(2367)'
        // Oddly, this comparison exactly the same as earlier, yet the earlier
        // has no tsc errors.
        // @ts-ignore
        if (this.snapshotChanged === true) {
          // fast path: just copy from array to sink
          push.apply(sink, array);
          return;
        }
        for (let i = 0, len = array.length; i < len; i += 1) {
          this.enterPath(i);
          const value = array[i];
          push.call(sink, value);
          // the following method will change 'this.snapshotChanged'.
          // Later, check to see if 'this.snapshotChanged' is true,
          // if so, we can short-circuit the rest of this loop, and just
          // copy over the remainder of the array.
          this.checkIfChanged(value);
          this.exitPath();
          // see explanation for previous ts-ignore
          // @ts-ignore
          if (this.snapshotChanged === true) {
            // fast path the remainder: just copy from array to sink
            push.apply(sink, slice.call(array, i + 1));
            break;
          }
        }
      }
      readScalar(propertyName, record, data, required) {
        if (!hasOwnProperty.call(record, propertyName)) {
          if (required !== false) {
            this.markMissing();
            return;
          }
          this.checkIfChanged(undefined);
          return;
        }
        this.assignScalar(propertyName, data, record[propertyName]);
      }
      assignScalar(key, sink, value) {
        sink[key] = value;
        this.checkIfChanged(value);
      }
      storeLookup(key) {
        return storeLookup(key, this.timestamp, this.store, this.ttlStrategy);
      }
      selectUnion(selection, storeEntry, discriminatedObject, sink) {
        const {
          discriminator
        } = selection;
        const discriminatorValue = discriminatedObject[discriminator];
        {
          validateUnionSelection(discriminatedObject, selection, this.currentPath);
        }
        const unionSelection = selection.unionSelections[discriminatorValue];
        const childSelection = {
          selections: unionSelection.selections,
          private: unionSelection.private,
          name: selection.name,
          kind: selection.kind
        };
        this.traverseSelection(childSelection, storeEntry, sink);
      }
      selectObjectUnion(selection, source, sink) {
        const {
          name: propertyName
        } = selection;
        const object = source[propertyName];
        if (object === undefined) {
          this.markMissing();
          return;
        }
        if (selection.nullable === true && object === null) {
          this.readScalar(propertyName, source, sink);
          return;
        }
        this.selectUnion(selection, source, object, sink);
      }
      traverseSelection(selection, record, data) {
        const {
          variables
        } = this;
        const key = getStorageKey(selection, variables);
        if (isUnionObjectSelection(selection)) {
          this.selectObjectUnion(selection, record, data);
          return;
        }
        if (selection.kind === 'Link') {
          if (selection.plural === true) {
            this.readPluralLink(key, selection, record, data);
          } else if (selection.map === true) {
            this.readLinkMap(key, selection, record, data);
          } else {
            this.readSingleLink(key, selection, record, data);
          }
        } else if (selection.kind === 'Scalar') {
          if (selection.map === true) {
            this.readScalarMap(key, record, data, selection.required !== false);
          } else if (selection.plural === true) {
            this.readScalarPlural(key, record, data, selection.required !== false);
          } else {
            this.readScalar(key, record, data, selection.required);
          }
        } else if (selection.kind === 'Object') {
          if (selection.map === true) {
            this.readObjectMap(key, selection, record, data);
          } else if (selection.plural === true) {
            this.readPluralObject(key, selection, record, data);
          } else {
            this.readObject(key, selection, record, data);
          }
        }
      }
      traverseSelections(node, record, data) {
        const {
          selections
        } = node;
        if (selections === undefined) {
          this.selectAll(record, data);
          return;
        }
        const {
          length: len
        } = selections;
        for (let i = 0; i < len; i += 1) {
          const selection = selections[i];
          this.enterPath(selection.name);
          this.traverseSelection(selection, record, data);
          this.exitPath();
        }
      }
      isRebuilding() {
        return this.baseSnapshot !== undefined;
      }
      getIsDataMissing() {
        return this.isMissingData;
      }
      getTimeStamp() {
        return this.timestamp;
      }
      markSeenId(key) {
        this.seenIds.add(key);
      }
      getFullPathString(fullPath) {
        return typeof fullPath === 'number' ? fullPath.toString() : fullPath;
      }
    }

    /**
     * Maps a CachePolicy to a CachePolicyImplementation.  We don't necessarily trust
     * "cachePolicy" because that could come from userland code.  But we do trust
     * "defaultCachePolicy" because that comes from our own library code and should
     * be a valid type, so this function will fall back to "defaultCachePolicy" if
     * "cachePolicy" is invalid.
     *
     * @param cachePolicy cache policy
     * @param defaultCachePolicy default cache policy
     * @returns cache policy implementation corresponding to cachePolicy
     */
    function resolveCachePolicy(cachePolicy, defaultCachePolicy) {
      if (cachePolicy === undefined) {
        return resolveCachePolicy(defaultCachePolicy, defaultCachePolicy);
      }
      const {
        type
      } = cachePolicy;
      switch (type) {
        case 'cache-and-network':
          return buildCacheAndNetworkImplementation(cachePolicy.staleDurationSeconds);
        case 'cache-then-network':
          return cacheThenNetworkImplementation;
        case 'no-cache':
          return noCacheImplementation;
        case 'only-if-cached':
          return onlyIfCachedImplementation;
        case 'stale-while-revalidate':
          return buildStaleWhileRevalidateImplementation(cachePolicy.staleDurationSeconds);
        case 'valid-at':
          {
            const basePolicy = resolveCachePolicy(cachePolicy.basePolicy, defaultCachePolicy);
            return buildValidAtImplementation(basePolicy, cachePolicy.timestamp);
          }
        default:
          {
            // use TS "never" here to ensure our switch cases include all enumerations
            const exhaustiveCheck = type;
            {
              throw new Error(`unrecognized cache policy: ${exhaustiveCheck}`);
            }
          }
      }
    }
    function isFetchResponse(error) {
      return error !== null && typeof error === 'object' && 'status' in error;
    }
    /**
     * This function takes the unknown rejected response from a network adapter
     * and normalizes it to an Error object with the proper errorType
     */
    function normalizeNetworkAdapterError(error) {
      // if it's an Error (it should be) then add the errorType
      // NOTE: this preserves stack trace
      if (typeof error === 'object' && error instanceof Error) {
        error.errorType = 'networkAdapterError';
        return error;
      }
      // anything else should get turned into an Error with the errorType set
      const normalizedError = new Error(`NetworkAdapter rejected with non-Error object: ${typeof error === 'undefined' ? 'undefined' : stringify(error)}`);
      normalizedError.errorType = 'networkAdapterError';
      return normalizedError;
    }
    class Environment {
      constructor(store, networkAdapter) {
        this.networkCount = 0;
        this.storeQueryEvaluator = undefined;
        this.defaultCachePolicy = {
          type: 'cache-then-network'
        };
        this.store = store;
        this.networkAdapter = networkAdapter;
        this.adapterContextMap = create(null);
        this.typeQueryEvaluatorMap = create(null);
        // bind these methods so when they get passed into the
        // Store, the this reference is preserved
        this.createSnapshot = this.createSnapshot.bind(this);
        this.rebuildSnapshot = this.rebuildSnapshot.bind(this);
      }
      setDefaultCachePolicy(cachePolicy) {
        this.defaultCachePolicy = cachePolicy;
      }
      /**
       * Returns a resolved promise of a FetchResponse for ok http status codes.
       * Returns a rejected promise of an ErrorResponse of type "fetchResponse" for non-ok http status codes.
       * Returns a rejected promise of an ErrorResponse of type "networkError" if server can't be reached
       *
       * @throws {ErrorResponse}
       */
      dispatchResourceRequest(request, context, eventObservers) {
        const start = Date.now();
        const uuid = `${start}${this.networkCount++}`;
        emitAdapterEvent({
          type: 'network-request-start',
          timestamp: start,
          request,
          uuid
        }, eventObservers);
        return new Promise((resolve, reject) => {
          this.networkAdapter(request, context).then(response => {
            const end = Date.now();
            emitAdapterEvent({
              type: 'network-request-end',
              timestamp: end,
              duration: end - start,
              response,
              uuid
            }, eventObservers);
            if (!response.ok) {
              return reject({
                ...response,
                errorType: 'fetchResponse'
              });
            }
            return resolve(response);
          }, error => {
            const end = Date.now();
            emitAdapterEvent({
              type: 'network-request-error',
              uuid,
              timestamp: end,
              duration: end - start,
              error: error
            }, eventObservers);
            // return reject(normalizeNetworkAdapterError(error));
            // TODO [W-11204139]: uncomment above line and remove below line
            // once all network adapter impls has been updated to follow
            // the new network adapter behavior
            return reject(
            // legacy network adapter check
            isFetchResponse(error) ? {
              ...error,
              errorType: 'fetchResponse'
            } : normalizeNetworkAdapterError(error));
          });
        });
      }
      isErrorCacheable(errorSnapshot) {
        const {
          error
        } = errorSnapshot;
        if (error.errorType === 'fetchResponse') {
          return error.status === exports.HttpStatusCode.NotFound;
        }
        return false;
      }
      /**
       * Returns a Promise that resolves once the given PendingSnapshot is available.
       */
      resolvePendingSnapshot(snapshot) {
        return new Promise(resolve => {
          let unsubscribe;
          unsubscribe = this.storeSubscribe(snapshot, resolvedSnapshot => {
            if (unsubscribe !== undefined) {
              unsubscribe();
            }
            resolve(resolvedSnapshot);
          });
        });
      }
      storeIngest(key, ingest, response, luvio, storeOverride) {
        if (ingest !== null) {
          ingest(response, {
            fullPath: key,
            parent: null,
            propertyName: null
          }, luvio, storeOverride === undefined ? this.store : storeOverride, Date.now());
        }
      }
      storeIngestError(key, errorSnapshot, storeMetadataParams, storeOverride) {
        const {
          error
        } = errorSnapshot;
        if (this.isErrorCacheable(errorSnapshot)) {
          const store = storeOverride === undefined ? this.store : storeOverride;
          const entry = {
            __type: StoreRecordType.Error,
            status: StoreErrorStatus.RESOURCE_NOT_FOUND,
            error
          };
          freeze(entry);
          store.publish(key, entry);
          if (storeMetadataParams !== undefined) {
            const {
              ttl,
              namespace,
              representationName,
              version
            } = storeMetadataParams;
            const now = Date.now();
            const storeMetadata = {
              ingestionTimestamp: now,
              expirationTimestamp: now + ttl,
              representationName,
              namespace,
              version
            };
            store.publishMetadata(key, storeMetadata);
          }
          return;
        }
        // this error is not cached, notify any pending subscribers here
        // since broadcast only deals with cached recordIds
        this.store.broadcastNonCachedSnapshot(key, errorSnapshot);
      }
      // Adds the given data to the store at the given key and marks the key as visited.  Will cause subscribers to rebuild.
      storePublish(key, data) {
        this.store.publish(key, data);
      }
      // Adds the given data to the store at the given key (does NOT mark the key as visited).  Will NOT cause subscribers to rebuild.  NOTE: This should really only be used by internal Luvio APIs.
      storePut(key, data) {
        this.store.put(key, data);
      }
      storeRedirect(existingKey, redirectKey) {
        this.store.redirect(existingKey, redirectKey);
      }
      storeGetCanonicalKey(key) {
        return this.store.getCanonicalRecordId(key);
      }
      storeBroadcast(rebuildSnapshot, snapshotAvailable) {
        return this.store.broadcast(rebuildSnapshot, snapshotAvailable);
      }
      storeSubscribe(snapshot, callback) {
        return this.store.subscribe(snapshot, callback);
      }
      storeWatch(prefix, callback) {
        return this.store.watch(prefix, callback);
      }
      storeLookup(sel, createSnapshot, refresh, ttlStrategy) {
        return this.store.lookup(sel, createSnapshot, refresh, ttlStrategy);
      }
      storeCleanup() {
        this.store.cleanup();
      }
      storeEvict(key) {
        this.store.evict(key);
      }
      storeDealloc(key) {
        this.store.dealloc(key);
      }
      storeReset() {
        this.store.reset();
      }
      storeRetain(keys) {
        return this.store.retain(keys);
      }
      storeKeyExists(key) {
        return this.store.keyExistsInStore(key);
      }
      snapshotAvailable(snapshot) {
        return isFulfilledSnapshot(snapshot) || isErrorSnapshot(snapshot) || isStaleSnapshot(snapshot);
      }
      createSnapshot(selector, refresh, ttlStrategy) {
        const reader = new Reader(this.store, selector.variables, refresh, undefined, ttlStrategy);
        return reader.read(selector);
      }
      rebuildSnapshot(snapshot, onRebuild) {
        const reader = new Reader(this.store, snapshot.variables, snapshot.refresh, snapshot);
        onRebuild(reader.read(snapshot.select));
      }
      getNode(key, storeOverride) {
        const store = storeOverride === undefined ? this.store : storeOverride;
        const value = store.readEntry(key);
        // doesn't exist
        if (value === undefined) {
          return null;
        }
        return this.wrapNormalizedGraphNode(value, key, store);
      }
      wrapNormalizedGraphNode(normalized, key, storeOverride) {
        if (normalized === null) {
          return null;
        }
        const store = storeOverride === undefined ? this.store : storeOverride;
        if (isStoreRecordError(normalized)) {
          return new GraphNodeError(store, normalized);
        }
        return new GraphNode(store, normalized, key);
      }
      withContext(adapter, options) {
        const {
          contextId,
          onContextLoaded
        } = options;
        // simple in-memory object stores metadata
        // retrieve from adapterContextMap if contextId is supplied
        // we will only track context of adapters that explicitly provide a contextId
        if (this.adapterContextMap[contextId] === undefined) {
          this.adapterContextMap[contextId] = create(null);
        }
        const contextStore = this.adapterContextMap[contextId];
        const context = {
          set(key, value) {
            contextStore[key] = value;
          },
          get(key) {
            return contextStore[key];
          }
        };
        // if no onContextLoaded hook then return a function that
        // simply returns the adapter
        if (onContextLoaded === undefined) {
          return (config, requestContext) => {
            return adapter(config, context, requestContext);
          };
        }
        // if we got here then we need to return a function that awaits the
        // onContextLoaded hook only on the first invocation.
        let firstRun = true;
        const hookAsPromise = onContextLoaded(context);
        return (config, requestContext) => {
          if (firstRun) {
            return hookAsPromise.then(() => {
              firstRun = false;
              return adapter(config, context, requestContext); // TODO - remove as any cast after https://github.com/salesforce-experience-platform-emu/luvio/pull/230
            });
          }
          return adapter(config, context, requestContext);
        };
      }
      publishStoreMetadata(key, storeMetadata) {
        this.store.publishMetadata(key, storeMetadata);
      }
      putStoreMetadata(key, storeMetadata, adjustTTLOverride) {
        this.store.putMetadata(key, storeMetadata, adjustTTLOverride);
      }
      storeSetTTLOverride(namespace, representationName, ttl) {
        this.store.setTTLOverride(namespace, representationName, ttl);
        this.recomputeTTLOverrideExpirations(namespace, representationName);
        return Promise.resolve();
      }
      storeGetTTLOverride(namespace, representationName) {
        return Promise.resolve(this.store.getTTLOverride(namespace, representationName));
      }
      storeGetTTLOverrides() {
        return this.store.getTTLOverrides();
      }
      recomputeTTLOverrideExpirations(ttlNamespace, ttlRepresentationName) {
        const metadataResults = this.store.readMetadataWhere({
          namespace: ttlNamespace,
          representationName: ttlRepresentationName
        });
        for (let i = 0, length = metadataResults.length; i < length; i++) {
          const result = metadataResults[i];
          this.publishStoreMetadata(result.key, result.metadata);
        }
      }
      storeSetDefaultTTLOverride(ttl) {
        this.store.setDefaultTTLOverride(ttl);
        this.recomputeDefaultTTLOverrideExpirations();
        return Promise.resolve();
      }
      storeGetDefaultTTLOverride() {
        return this.store.getDefaultTTLOverride();
      }
      recomputeDefaultTTLOverrideExpirations() {
        const metadataResults = this.store.readMetadataWhere({
          ttlOverride: undefined
        });
        for (let i = 0, length = metadataResults.length; i < length; i++) {
          const result = metadataResults[i];
          this.publishStoreMetadata(result.key, result.metadata);
        }
      }
      storeBuildIngestionStagingStore() {
        return this.store.buildIngestionStagingStore();
      }
      applyCachePolicy(luvio, adapterRequestContext, buildSnapshotContext, buildCachedSnapshot, buildNetworkSnapshot) {
        const {
          defaultCachePolicy
        } = this;
        const {
          cachePolicy,
          eventObservers
        } = adapterRequestContext;
        let cachePolicyImpl = resolveCachePolicy(cachePolicy, defaultCachePolicy);
        const resolvePendingSnapshot = snapshot => this.resolvePendingSnapshot(snapshot);
        const storeLookup = (sel, refresh, ttlStrategy) => this.storeLookup(sel, this.createSnapshot, refresh, ttlStrategy);
        let wrappedBuildCacheSnapshot = buildCachedSnapshot;
        let wrappedBuildNetworkSnapshot = buildNetworkSnapshot;
        // if eventObservers are provided for the adapter, wrap calls in versions that emit events
        if (eventObservers !== undefined) {
          const cachePolicyType = cachePolicy === undefined ? defaultCachePolicy.type : cachePolicy.type;
          cachePolicyImpl = cachePolicyImplWithEvents(cachePolicyImpl, cachePolicyType, eventObservers);
          wrappedBuildCacheSnapshot = buildCachedSnapshotWithEvents(buildCachedSnapshot, eventObservers);
          wrappedBuildNetworkSnapshot = buildNetworkSnapshotWithEvents(buildNetworkSnapshot, eventObservers);
        }
        return cachePolicyImpl({
          buildCachedSnapshot: wrappedBuildCacheSnapshot,
          buildNetworkSnapshot: wrappedBuildNetworkSnapshot,
          buildSnapshotContext,
          resolvePendingSnapshot,
          storeLookup,
          coercedAdapterRequestContext: coerceAdapterRequestContext(adapterRequestContext),
          luvio
        });
      }
      handleSuccessResponse(ingestAndBroadcastFunc, _getResponseCacheKeysFunc) {
        return ingestAndBroadcastFunc();
      }
      handleErrorResponse(ingestAndBroadcastFunc) {
        return ingestAndBroadcastFunc();
      }
      /**
       * Gets store entries for notifyChange purposes.  Returns a Promise to
       * support environments that need to do async cache lookups.
       *
       * If not in the store then the cache key is not added to the returned set.
       */
      getNotifyChangeStoreEntries(keys) {
        const entries = [];
        for (let i = 0, len = keys.length; i < len; i++) {
          const key = keys[i];
          const node = this.getNode(key);
          if (isGraphNode(node)) {
            entries.push({
              key,
              record: node.retrieve()
            });
          }
        }
        return Promise.resolve(entries);
      }
      notifyStoreUpdateAvailable(keys) {
        return this.store.updateAvailable(keys);
      }
      registerStoreQueryEvaluator(queryEvaluator) {
        this.storeQueryEvaluator = queryEvaluator;
      }
      getStoreQueryEvaluator() {
        return this.storeQueryEvaluator;
      }
      registerTypeQueryEvaluator(namespace, representationName, queryEvaluator) {
        if (!this.typeQueryEvaluatorMap[namespace]) {
          this.typeQueryEvaluatorMap[namespace] = Object.create(null);
        }
        this.typeQueryEvaluatorMap[namespace][representationName] = queryEvaluator;
      }
      getTypeQueryEvaluator(namespace, representationName) {
        const evaluatorsByNamespace = this.typeQueryEvaluatorMap[namespace];
        if (evaluatorsByNamespace && evaluatorsByNamespace[representationName]) {
          return evaluatorsByNamespace[representationName];
        }
        return undefined;
      }
      buildStructuredKey(namespace, representationName, idValues) {
        return this.store.buildStructuredKey(namespace, representationName, idValues);
      }
      /**
       * Take a list of keys and marks them as stale to be refreshed.
       * Then will be refreshed with the provided refresh function.
       * If no refresh and makeConfig functions are provided it will refresh
       * time that record is trying to be fetched
       *
       * Example: one record from graphql needs to be refreshed and not
       * the entire graphql query
       *
       * @param keys
       * @param makeConfig
       * @param refresh
       * @returns
       */
      expirePossibleStaleRecords(keys, config, refresh) {
        this.store.expirePossibleStaleRecords(keys);
        if (refresh !== undefined && config !== undefined) {
          return this.refreshPossibleStaleRecords(config, refresh);
        }
        return Promise.resolve();
      }
      refreshPossibleStaleRecords(config, refresh) {
        return Promise.resolve(refresh(config, {
          cachePolicy: {
            type: 'no-cache'
          }
        })).then(() => {});
      }
    }
    class Luvio {
      constructor(environment, options = {}) {
        this.environment = environment;
        this.options = options;
      }
      storePublish(key, data) {
        this.environment.storePublish(key, data);
      }
      storeRedirect(existingKey, canonicalKey) {
        this.environment.storeRedirect(existingKey, canonicalKey);
      }
      storeRetain(keys) {
        return this.environment.storeRetain(keys);
      }
      storeGetCanonicalKey(key) {
        return this.environment.storeGetCanonicalKey(key);
      }
      /**
       * Broadcast any cache entry changes to subscribers.
       *
       * NOTE: this MUST be called *AFTER* storeLookup in the ingestion flow as
       * some environments (namely, makeDurable) modify the store in this method.
       */
      storeBroadcast() {
        return this.environment.storeBroadcast(this.environment.rebuildSnapshot, this.environment.snapshotAvailable);
      }
      storeIngest(key, ingest, response) {
        this.environment.storeIngest(key, ingest, response, this);
      }
      storeIngestError(key, errorSnapshot, storeMetadataParams) {
        return this.environment.storeIngestError(key, errorSnapshot, storeMetadataParams);
      }
      /**
       * Subscribe to the Luvio store to observe any changes to the data in the given
       * snapshot.
       *
       * NOTE: Errors are terminal - the callback will never be called after an ErrorSnapshot
       * is emitted (or if the given Snapshot is an ErrorSnapshot).
       *
       * @template D
       * @template V
       * @param {Snapshot<D, V>} snapshot The snapshot that contains data to observe.
       * @param {SnapshotSubscriptionCallback<D, V>} callback The callback to be called
       * whenever the given snapshot's data changes.  NOTE: the snapshot passed to the
       * callback will have consistent, normalized data - however it is not guaranteed
       * to be within the TTL of that data type.
       * @returns {Unsubscribe} A function that will unsubscribe when invoked.
       * @memberof Luvio
       */
      storeSubscribe(snapshot, callback) {
        return this.environment.storeSubscribe(snapshot, callback);
      }
      storeWatch(prefix, callback) {
        return this.environment.storeWatch(prefix, callback);
      }
      storeLookup(sel, refresh) {
        return this.environment.storeLookup(sel, this.environment.createSnapshot, refresh);
      }
      storeEvict(key) {
        this.environment.storeEvict(key);
      }
      storeCleanup() {
        this.environment.storeCleanup();
      }
      storeExpirePossibleStaleRecords(keys, config, refresh) {
        return this.environment.expirePossibleStaleRecords(keys, config, refresh);
      }
      createSnapshot(selector, refresh) {
        return this.environment.createSnapshot(selector, refresh);
      }
      errorSnapshot(error, refresh) {
        return createErrorSnapshot(error, refresh);
      }
      dispatchResourceRequest(resourceRequest, context) {
        let mergedResourceRequest = resourceRequest;
        let resourceRequestContext = {};
        let eventObservers = [];
        if (context !== undefined) {
          if (context.resourceRequestContext !== undefined) {
            resourceRequestContext = context.resourceRequestContext;
          }
          if (context.eventObservers !== undefined) {
            eventObservers = context.eventObservers;
          }
          const {
            overrides
          } = context;
          // Apply resource request override if passed as argument.
          if (overrides !== undefined) {
            const {
              headers,
              priority
            } = overrides;
            if (headers !== undefined) {
              mergedResourceRequest = {
                ...resourceRequest,
                headers: {
                  ...resourceRequest.headers,
                  ...headers
                }
              };
            }
            if (priority !== undefined) {
              mergedResourceRequest.priority = priority;
            }
          }
        }
        // ResourceRequest params are derived from Adapter config properties, which
        // can be optional.  This could leave some queryParams or urlParams with undefined
        // values.  We don't want to put the responsibility of filtering out those
        // undefined values on the injected networkAdapter.  So we do it here, on
        // the API that those adapters call to dispatch their ResourceRequests.
        const {
          queryParams,
          urlParams
        } = mergedResourceRequest;
        for (const paramKey of keys(queryParams)) {
          const value = queryParams[paramKey];
          if (value === undefined) {
            delete queryParams[paramKey];
          }
        }
        for (const paramKey of keys(urlParams)) {
          const value = urlParams[paramKey];
          if (value === undefined) {
            delete urlParams[paramKey];
          }
        }
        return this.environment.dispatchResourceRequest(mergedResourceRequest, resourceRequestContext, eventObservers);
      }
      refreshSnapshot(snapshot) {
        const {
          refresh
        } = snapshot;
        if (refresh !== undefined) {
          const {
            config,
            resolve
          } = refresh;
          return resolve(config);
        }
        throw new Error('Snapshot is not refreshable');
      }
      /**
       * This method is meant for custom scenarios and should not be used for
       * general store lookups.  Use applyCachePolicy instead.
       *
       * NOTE: this method works against synchronous stores only.
       */
      getNode(key) {
        return this.environment.getNode(key);
      }
      wrapNormalizedGraphNode(normalized, key) {
        return this.environment.wrapNormalizedGraphNode(normalized, key);
      }
      instrument(paramsBuilder) {
        const {
          instrument
        } = this.options;
        if (instrument) {
          instrument(paramsBuilder());
        }
      }
      /**
       * Returns true if the given snapshot can be returned to userland without
       * requiring any additional resolution.
       */
      snapshotAvailable(snapshot) {
        return this.environment.snapshotAvailable(snapshot);
      }
      withContext(adapter, options) {
        return this.environment.withContext(adapter, options);
      }
      /**
       * Returns a Promise that resolves once the given PendingSnapshot is available.  This
       * is syntactic sugar for calling storeSubscribe and unsubscribing after the
       * first emit.  Useful for one-shot data reads.  Use storeSubscribe instead of
       * this to get continual updates when data changes.
       *
       * @template D
       * @template V
       * @param {PendingSnapshot<D, V>} snapshot
       * @returns {Promise<Snapshot<D, V>>}
       */
      resolvePendingSnapshot(snapshot) {
        return this.environment.resolvePendingSnapshot(snapshot);
      }
      publishStoreMetadata(key, storeMetadataParams) {
        const {
          ttl,
          namespace,
          representationName,
          version
        } = storeMetadataParams;
        let {
          ingestionTimestamp
        } = storeMetadataParams;
        if (ingestionTimestamp === undefined) {
          ingestionTimestamp = Date.now();
        }
        const storeMetadata = {
          ingestionTimestamp: ingestionTimestamp,
          expirationTimestamp: ingestionTimestamp + ttl,
          representationName,
          namespace,
          version
        };
        return this.environment.publishStoreMetadata(key, storeMetadata);
      }
      /**
       * Sets the TTL value for a specific namespace-representation Type.  The given
       * TTL takes precedence over TTL values defined in RAML and also over the
       * default TTL value (if set using storeSetDefaultTTLOverride).
       *
       * @param {number} ttl Time-to-live in milliseconds
       * @returns {Promise<void>}
       */
      storeSetTTLOverride(namespace, representationName, ttl) {
        return this.environment.storeSetTTLOverride(namespace, representationName, ttl);
      }
      storeGetTTLOverride(namespace, representationName) {
        return this.environment.storeGetTTLOverride(namespace, representationName);
      }
      /**
       * Sets the default TTL value.  The given TTL takes precedence over TTL values
       * defined in RAML, but defers to namespace-representation-specific override
       * values.
       *
       * @param {number} ttl Time-to-live in milliseconds
       * @returns {Promise<void>}
       */
      storeSetDefaultTTLOverride(ttl) {
        return this.environment.storeSetDefaultTTLOverride(ttl);
      }
      applyCachePolicy(adapterRequestContext, buildSnapshotContext, buildCachedSnapshot, buildNetworkSnapshot) {
        return this.environment.applyCachePolicy(this, adapterRequestContext, buildSnapshotContext, buildCachedSnapshot, buildNetworkSnapshot);
      }
      /**
       * A method to be called any time an adapter gets a successful response
       * from the network adapter
       *
       * @param ingestAndBroadcastFunc A function that ingests a response and broadcasts
       * @param getResponseCacheKeysFunc A function that returns the set of cache keys present in a response body
       * @returns A snapshot or the Promise of a snapshot that comes from resource ingestion.  Can return undefined
       * or Promise<undefined> for adapters that do not return a response (ie: DELETE adapters).
       */
      handleSuccessResponse(ingestAndBroadcastFunc, getResponseCacheKeysFunc) {
        const memoizedGetResponseCacheKeysFunc = () => {
          let cachedResult = undefined;
          return function () {
            if (cachedResult === undefined) {
              cachedResult = getResponseCacheKeysFunc();
            }
            return cachedResult;
          };
        };
        return this.environment.handleSuccessResponse(ingestAndBroadcastFunc, memoizedGetResponseCacheKeysFunc());
      }
      /**
       * A method to be called any time an adapter gets an error response
       * from the network adapter
       *
       * @param ingestAndBroadcastFunc A function that ingests a response and broadcasts
       * @returns An ErrorSnapshot or the Promise of an ErrorSnapshot that comes from resource ingestion
       */
      handleErrorResponse(ingestAndBroadcastFunc) {
        return this.environment.handleErrorResponse(ingestAndBroadcastFunc);
      }
      /**
       * This method is meant to be used by adapter's notifyChange function.  It
       * accepts a set of cache keys and returns normalized store entries for each
       * cache key that is present in the store. Results are returned in a Promise
       * to support Environments that use asynchronous stores.
       *
       * If a cache key is not present in the store then that key will not be included
       * in the returned set.
       *
       * NOTE: this method is meant to be used by notifyChange and SHOULD NOT be used
       * as a general purpose way to get data out of the cache.  Use luvio.applyCachePolicy
       * for general-purpose cache lookups.
       *
       * @param keys A list of cache keys to check
       * @returns A Promise of a set of store entries that are present in the cache
       */
      getNotifyChangeStoreEntries(keys) {
        return this.environment.getNotifyChangeStoreEntries(keys);
      }
      notifyStoreUpdateAvailable(keys) {
        return this.environment.notifyStoreUpdateAvailable(keys);
      }
      registerStoreQueryEvaluator(queryEvaluator) {
        return this.environment.registerStoreQueryEvaluator(queryEvaluator);
      }
      getStoreQueryEvaluator() {
        return this.environment.getStoreQueryEvaluator();
      }
      registerTypeQueryEvaluator(namespace, representationName, queryEvaluator) {
        return this.environment.registerTypeQueryEvaluator(namespace, representationName, queryEvaluator);
      }
      getTypeQueryEvaluator(namespace, representationName) {
        return this.environment.getTypeQueryEvaluator(namespace, representationName);
      }
      buildStructuredKey(namespace, representationName, idValues) {
        return this.environment.buildStructuredKey(namespace, representationName, idValues);
      }
    }
    const Wildcard = Symbol('Wildcard');
    class InMemoryStoreQueryEvaluator {
      constructor(store) {
        this.store = store;
        this.storeToIndexMap = new WeakMap();
        this.storeToIndexMap.set(store, {
          nodeType: 'indexBySchema',
          value: {}
        });
      }
      queryByKey(keyQuery, keySchema) {
        const keyIndex = this.getKeyIndex(this.store, keySchema);
        if (keyIndex === undefined) {
          return Promise.resolve([]);
        }
        // Breadth-first search with known/constant depth on all branches
        let visited = [keyIndex];
        for (let i = 0; i < keySchema.length; i++) {
          const newVisited = [];
          const keyValue = keyQuery[keySchema[i]];
          // If the query value is wildcard, all values are acceptable
          const wildcard = keyValue === Wildcard;
          for (let j = 0, visitedLength = visited.length; j < visitedLength; j++) {
            const node = visited[j];
            if (node.nodeType === 'key') {
              // Shouldn't happen
              throw new Error('');
            }
            let children = [];
            if (wildcard) {
              // Push all children into queue
              children = values(node.value);
            } else {
              // Only push matching child if it exists
              if (hasOwnProperty.call(node.value, String(keyValue))) {
                children = [node.value[String(keyValue)]];
              }
            }
            newVisited.push(...children);
          }
          visited = newVisited;
        }
        // Once the whole tree has been traversed, visited should only contain leaf nodes, which always have a KeyMetadata value
        const foundKeyNodes = visited.map(element => {
          if (element.nodeType !== 'key') {
            throw new Error(`Found non-key in result: ${stringify(element, undefined, 2)}`);
          }
          return element;
        }) ;
        return Promise.resolve(foundKeyNodes.map(keyNode => keyNode.value));
      }
      queryWhere(keyQuery, keySchema, valueQuery, valueResolver) {
        const defaultResolver = (store, data) => {
          return this.resolveData(store, data);
        };
        const resolver = valueResolver !== null && valueResolver !== void 0 ? valueResolver : defaultResolver;
        return this.queryByKey(keyQuery, keySchema).then(keys => {
          return keys.filter(key => {
            const value = this.store.readEntry(JSON.stringify(key));
            return evaluateValueQuery(this.store, valueQuery, resolver(this.store, value), resolver);
          });
        });
      }
      resolveData(store, value) {
        if (typeof value === 'object' && value !== null && '__link' in value && typeof value['__link'] === 'string') {
          return store.readEntry(value.__link);
        }
        return value;
      }
      registerKey(store, key, keySchema) {
        const keyIndex = this.getOrRegisterKeyIndex(store, keySchema);
        if (keyIndex === undefined) {
          return;
        }
        const keySchemaLength = keySchema.length;
        let currentIndex = keyIndex;
        // Walk the index tree to find the node right above the leaf
        for (let i = 0; i < keySchemaLength - 1; i++) {
          const keyProperty = keySchema[i];
          const keyValue = key[keyProperty];
          currentIndex = this.getOrRegisterSubKeyIndex(currentIndex, keyValue);
        }
        // Set the leaf node for the key
        currentIndex.value[String(key[keySchema[keySchemaLength - 1]])] = {
          nodeType: 'key',
          value: key
        };
      }
      getIndexBySchema(store) {
        return this.storeToIndexMap.get(store);
      }
      getOrRegisterKeyIndex(store, keySchema) {
        const keyIndexBySchema = this.getIndexBySchema(store);
        if (keyIndexBySchema === undefined) {
          return undefined;
        }
        const keySchemaIdentifier = this.getKeySchemaIdentifier(keySchema);
        let maybeKeyIndex = keyIndexBySchema.value[keySchemaIdentifier];
        if (maybeKeyIndex === undefined) {
          maybeKeyIndex = {
            nodeType: 'index',
            value: {}
          };
          keyIndexBySchema.value[keySchemaIdentifier] = maybeKeyIndex;
        }
        return maybeKeyIndex;
      }
      getKeyIndex(store, keySchema) {
        let maybeKeyIndexBySchema = this.storeToIndexMap.get(store);
        if (maybeKeyIndexBySchema === undefined) {
          return undefined;
        }
        const keySchemaIdentifier = this.getKeySchemaIdentifier(keySchema);
        return maybeKeyIndexBySchema.value[keySchemaIdentifier];
      }
      getOrRegisterSubKeyIndex(index, keyValue) {
        let nextSubIndex = index.value[String(keyValue)];
        if (nextSubIndex === undefined) {
          nextSubIndex = {
            nodeType: 'index',
            value: {}
          };
          index.value[String(keyValue)] = nextSubIndex;
        } else if (nextSubIndex.nodeType !== 'index') {
          // This condition shouldn't be possible
          throw new Error('Failed to find subindex value');
        }
        return nextSubIndex;
      }
      getKeySchemaIdentifier(keySchema) {
        return keySchema.join(':');
      }
    }
    function evaluateValueQuery(store, query, value, resolver) {
      return Object.entries(query).map(([valueQueryKey, propertyQuery]) => {
        if (valueQueryKey.startsWith('$')) {
          return evaluateValueQueryOperator(store, valueQueryKey, query, value, resolver);
        } else {
          if (typeof value === 'object') {
            if (isArray(value)) {
              {
                throw new Error('Array querying is not supported yet');
              }
            }
            return evaluateValueQuery(store, propertyQuery, resolver(store, value[valueQueryKey]), resolver);
          }
        }
      }).every(result => result === true);
    }
    const queryOperatorToEvaluatorMap = {
      $eq: evaluateEqualsOperator,
      $ne: evaluateNotEqualOperator,
      $gt: evaluateGreaterThanOperator,
      $gte: evaluateGreaterThanOrEqualOperator,
      $lt: evaluateLessThanOperator,
      $lte: evaluateLessThanOrEqualOperator,
      $and: evaluateAndOperator,
      $not: evaluateNotOperator,
      $nor: evaluateNorOperator,
      $or: evaluateOrOperator,
      $in: evaluateInOperator,
      $nin: evaluateNotInOperator,
      $exists: evaluateExistsOperator,
      $regex: evaluateRegexOperator
    };
    function evaluateValueQueryOperator(store, operator, operatorQuery, value, resolver) {
      const evaluator = queryOperatorToEvaluatorMap[operator];
      if (evaluator === undefined) {
        {
          throw new Error(`Unsupported operator: ${operator}`);
        }
      }
      return evaluator(store, operatorQuery, value, resolver);
    }
    function evaluateEqualsOperator(_store, query, value, _resolver) {
      // TODO: This won't handle deep comparisons
      if (typeof value === 'object' && value !== null) {
        {
          throw new Error('Equals comparison against objects is not supported');
        }
      }
      return query.$eq === value;
    }
    function evaluateNotEqualOperator(store, query, value, resolver) {
      return !evaluateEqualsOperator(store, {
        $eq: query.$ne
      }, value);
    }
    function evaluateGreaterThanOperator(_store, query, value, _resolver) {
      const result = value > query.$gt;
      return result;
    }
    function evaluateGreaterThanOrEqualOperator(_store, query, value, _resolver) {
      const result = value >= query.$gte;
      return result;
    }
    function evaluateLessThanOperator(_store, query, value, _resolver) {
      const result = value < query.$lt;
      return result;
    }
    function evaluateLessThanOrEqualOperator(_store, query, value, _resolver) {
      const result = value <= query.$lte;
      return result;
    }
    function evaluateAndOperator(store, query, value, resolver) {
      for (let i = 0; i < query.$and.length; i++) {
        const subQuery = query.$and[i];
        const result = evaluateValueQuery(store, subQuery, value, resolver);
        if (result === false) {
          return false;
        }
      }
      return true;
    }
    function evaluateOrOperator(store, query, value, resolver) {
      for (let i = 0; i < query.$or.length; i++) {
        const subQuery = query.$or[i];
        const result = evaluateValueQuery(store, subQuery, value, resolver);
        if (result === true) {
          return true;
        }
      }
      return false;
    }
    function evaluateNorOperator(store, query, value, resolver) {
      const result = !evaluateOrOperator(store, {
        $or: query.$nor
      }, value, resolver);
      return result;
    }
    function evaluateNotOperator(store, query, value, resolver) {
      const result = !evaluateValueQuery(store, query.$not, value, resolver);
      return result;
    }
    function evaluateInOperator(store, query, value, resolver) {
      for (let i = 0; i < query.$in.length; i++) {
        const comparisonValue = query.$in[i];
        if (evaluateEqualsOperator(store, {
          $eq: comparisonValue
        }, value)) {
          return true;
        }
      }
      return false;
    }
    function evaluateNotInOperator(store, query, value, resolver) {
      const result = !evaluateInOperator(store, {
        $in: query.$nin
      }, value);
      return result;
    }
    function evaluateExistsOperator(_store, query, value, _resolver) {
      const valueExists = value !== undefined && value !== null;
      const result = query.$exists ? valueExists : !valueExists;
      return result;
    }
    function evaluateRegexOperator(_store, query, value, _resolver) {
      const result = query.$regex.test(value);
      return result;
    }
    var ResourceParamType;
    (function (ResourceParamType) {
      ResourceParamType[ResourceParamType["UrlParameter"] = 0] = "UrlParameter";
      ResourceParamType[ResourceParamType["QueryParameter"] = 1] = "QueryParameter";
      ResourceParamType[ResourceParamType["Body"] = 2] = "Body";
      ResourceParamType[ResourceParamType["Header"] = 3] = "Header";
    })(ResourceParamType || (ResourceParamType = {}));
    var TypeCheckShapes;
    (function (TypeCheckShapes) {
      TypeCheckShapes[TypeCheckShapes["String"] = 0] = "String";
      TypeCheckShapes[TypeCheckShapes["Boolean"] = 1] = "Boolean";
      TypeCheckShapes[TypeCheckShapes["Number"] = 2] = "Number";
      TypeCheckShapes[TypeCheckShapes["Integer"] = 3] = "Integer";
      TypeCheckShapes[TypeCheckShapes["Unsupported"] = 4] = "Unsupported";
    })(TypeCheckShapes || (TypeCheckShapes = {}));

    // Note: these should be in sync with the compiler ones:
    // https://github.com/salesforce-experience-platform-emu/luvio/blob/main/packages/%40luvio/compiler/src/intermediate/resource.ts#L76-L79
    const CONFIG_PROPERTY_URL_PARAMS = 'urlParams';
    const CONFIG_PROPERTY_QUERY_PARAMS = 'queryParams';
    const CONFIG_PROPERTY_BODY = 'body';
    const CONFIG_PROPERTY_HEADERS = 'headers';
    function isCorrectScalarType(value, type) {
      switch (type) {
        case TypeCheckShapes.String:
          return typeof value === 'string';
        case TypeCheckShapes.Boolean:
          return typeof value === 'boolean';
        case TypeCheckShapes.Number:
          return typeof value === 'number';
        case TypeCheckShapes.Integer:
          return typeof value === 'number' && Math.floor(value) === value;
        default:
          return false;
      }
    }
    function typeCheckArrayOfScalars(untrustedConfig, config, name, typeCheckShape) {
      const untrustedConfig_field = untrustedConfig[name];
      if (isArray(untrustedConfig_field)) {
        const untrustedConfig_field_array = [];
        for (let i = 0, arrayLength = untrustedConfig_field.length; i < arrayLength; i++) {
          const untrustedConfig_field_item = untrustedConfig_field[i];
          if (isCorrectScalarType(untrustedConfig_field_item, typeCheckShape)) {
            untrustedConfig_field_array.push(untrustedConfig_field_item);
          }
        }
        config[name] = untrustedConfig_field_array;
      }
    }
    function typeCheckConfig(untrustedConfig, config, configMetadata) {
      configMetadata.forEach(({
        name,
        typeCheckShape,
        isArrayShape
      }) => {
        switch (typeCheckShape) {
          case TypeCheckShapes.Unsupported:
            return;
          case TypeCheckShapes.String:
          case TypeCheckShapes.Boolean:
          case TypeCheckShapes.Number:
          case TypeCheckShapes.Integer:
            {
              if (isArrayShape) {
                typeCheckArrayOfScalars(untrustedConfig, config, name, typeCheckShape);
              } else {
                const untrustedConfig_field = untrustedConfig[name];
                if (isCorrectScalarType(untrustedConfig_field, typeCheckShape)) {
                  config[name] = untrustedConfig_field;
                }
              }
              return;
            }
          default:
            {
              return;
            }
        }
      });
    }
    function coerceConfig(uncoercedConfig, configMetadata) {
      const config = {};
      configMetadata.forEach(({
        name,
        coerceFn
      }) => {
        const value = coerceFn === undefined ? uncoercedConfig[name] : coerceFn(uncoercedConfig[name]);
        if (value !== undefined) {
          config[name] = value;
        }
      });
      return config;
    }
    function buildNetworkSnapshotCachePolicy(context, coercedAdapterRequestContext, buildNetworkSnapshotIdentifier, alternativeMethod, includeCacheSnapshot) {
      const {
        luvio,
        config
      } = context;
      const {
        networkPriority,
        requestCorrelator,
        eventObservers,
        sourceContext
      } = coercedAdapterRequestContext;
      const dispatchOptions = {
        resourceRequestContext: {
          requestCorrelator,
          sourceContext,
          luvioRequestMethod: alternativeMethod
        },
        eventObservers
      };
      if (networkPriority !== 'normal') {
        dispatchOptions.overrides = {
          priority: networkPriority
        };
      }
      return includeCacheSnapshot ? buildNetworkSnapshotIdentifier(luvio, config, dispatchOptions, context.cacheSnapshot) : buildNetworkSnapshotIdentifier(luvio, config, dispatchOptions);
    }
    function ingestShape(input, path, luvio, store, timestamp, ttlToUse, key, normalize, namespace, version, representationName, equals) {
      const existingRecord = store.readEntry(key);
      let incomingRecord = normalize(input, existingRecord, {
        fullPath: key,
        parent: path.parent,
        propertyName: path.propertyName,
        ttl: ttlToUse
      }, luvio, store, timestamp);
      if (existingRecord === undefined || equals(existingRecord, incomingRecord) === false) {
        luvio.storePublish(key, incomingRecord);
      }
      if (ttlToUse !== undefined) {
        const storeMetadataParams = {
          ttl: ttlToUse,
          namespace,
          version,
          representationName,
          ingestionTimestamp: timestamp
        };
        luvio.publishStoreMetadata(key, storeMetadataParams);
      }
    }
    function createResourceParams(configMetadata) {
      return config => createResourceParamsImpl(config, configMetadata);
    }
    function createResourceParamsImpl(config, configMetadata) {
      const parametersReducer = (acc, {
        name
      }) => {
        acc[name] = config[name];
        return acc;
      };
      const urlParams = configMetadata.filter(p => p.resourceType === ResourceParamType.UrlParameter).reduce(parametersReducer, {});
      const queryParams = configMetadata.filter(p => p.resourceType === ResourceParamType.QueryParameter).reduce(parametersReducer, {});
      const headerParams = configMetadata.filter(p => p.resourceType === ResourceParamType.Header).reduce(parametersReducer, {});
      const bodyParams = configMetadata.filter(p => p.resourceType === ResourceParamType.Body);
      const actualBodyParams = bodyParams.reduce((acc, {
        name,
        required
      }) => {
        const configValue = config[name];
        if (required) {
          acc[name] = configValue;
        } else if (configValue !== undefined) {
          acc[name] = configValue;
        }
        return acc;
      }, {});
      const resourceParams = {};
      if (keys(urlParams).length > 0) {
        resourceParams[CONFIG_PROPERTY_URL_PARAMS] = urlParams;
      }
      if (keys(queryParams).length > 0) {
        resourceParams[CONFIG_PROPERTY_QUERY_PARAMS] = queryParams;
      }
      if (bodyParams.length > 0) {
        resourceParams[CONFIG_PROPERTY_BODY] = actualBodyParams;
      }
      if (keys(headerParams).length > 0) {
        resourceParams[CONFIG_PROPERTY_HEADERS] = headerParams;
      }
      return resourceParams;
    }
    // version: 1.309.0-dev21-4baf03ecaf
    const __lwc_hmr_context = { moduleHash : '111984866657c41c81ca4000779f8a87' };
    if (lwc.hot) {
        lwc.hot.register('force/luvioEngine/luvioEngine.js', '111984866657c41c81ca4000779f8a87', {"name":"luvioEngine","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.Environment = Environment;
    exports.GraphNode = GraphNode;
    exports.InMemoryStore = InMemoryStore;
    exports.InMemoryStoreQueryEvaluator = InMemoryStoreQueryEvaluator;
    exports.Luvio = Luvio;
    exports.Reader = Reader;
    exports.StoreKeyMap = StoreKeyMap;
    exports.StoreKeySet = StoreKeySet;
    exports.StringKeyInMemoryStore = StringKeyInMemoryStore;
    exports.Wildcard = Wildcard;
    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.adapterToNetworkPriority = adapterToNetworkPriority;
    exports.buildNetworkSnapshotCachePolicy = buildNetworkSnapshotCachePolicy;
    exports.coerceAdapterRequestContext = coerceAdapterRequestContext;
    exports.coerceConfig = coerceConfig;
    exports.createCustomAdapterEventEmitter = createCustomAdapterEventEmitter;
    exports.createResourceParams = createResourceParams;
    exports.deepFreeze = deepFreeze;
    exports.emitAdapterEvent = emitAdapterEvent;
    exports.ingestShape = ingestShape;
    exports.isFileReference = isFileReference;
    exports.isFormData = isFormData;
    exports.resolveLink = resolveLink;
    exports.serializeStructuredKey = serializeStructuredKey;
    exports.setBypassDeepFreeze = setBypassDeepFreeze;
    exports.typeCheckConfig = typeCheckConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('force/ldsAdaptersApex', ['exports', 'lwc', 'force/luvioEngine', 'force/ldsBindings', 'force/ldsEngineWebruntime'], (function (exports, lwc, luvioEngine, ldsBindings, ldsEngine) {

    const {
      hasOwnProperty
    } = Object.prototype;

    /**
     * Returns the field API name, qualified with an object name if possible.
     * @param value The value from which to get the qualified field API name.
     * @return The qualified field API name.
     */
    function getFieldApiName(value) {
      if (typeof value === 'string') {
        return value;
      } else if (value && typeof value.objectApiName === 'string' && typeof value.fieldApiName === 'string') {
        return value.objectApiName + '.' + value.fieldApiName;
      }
      throw new TypeError('Value is not a string or FieldId.');
    }
    /**
     * Split the object API name and field API name from a qualified field name.
     * Eg: Opportunity.Title returns ['Opportunity', 'Title']
     * Eg: Opportunity.Account.Name returns ['Opportunity', 'Account.Name']
     * @param fieldApiName The qualified field name.
     * @return The object and field API names.
     */
    function splitQualifiedFieldApiName(fieldApiName) {
      const idx = fieldApiName.indexOf('.');
      if (idx < 1) {
        // object api name must non-empty
        throw new TypeError('Value does not include an object API name.');
      }
      return [fieldApiName.substring(0, idx), fieldApiName.substring(idx + 1)];
    }
    const {
      isArray: ArrayIsArray$1
    } = Array;
    function untrustedIsObject$1(untrusted) {
      return typeof untrusted === 'object' && untrusted !== null && ArrayIsArray$1(untrusted) === false;
    }

    /**
     * Gets a field value from an Apex sObject.
     * @param sobject The sObject holding the field.
     * @param field The qualified API name of the field to return.
     * @returns The field's value. If it doesn't exist, undefined is returned.
     */
    function getSObjectValue(sObject, field) {
      if (untrustedIsObject$1(sObject) === false) {
        return;
      }
      const unqualifiedField = splitQualifiedFieldApiName(getFieldApiName(field))[1];
      const fields = unqualifiedField.split('.');
      let ret = sObject;
      for (let i = 0, fieldsLength = fields.length; i < fieldsLength; i++) {
        const nextField = fields[i];
        if (!hasOwnProperty.call(ret, nextField)) {
          return undefined;
        }
        ret = ret[nextField];
      }
      return ret;
    }
    if (lwc.hot) {
        lwc.hot.register('force/ldsAdaptersApex/lds-apex-static-utils.js', '8c7b0e16bff01b5bde95d56d061a2226', {"name":"ldsAdaptersApex","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    const {
      keys: ObjectKeys,
      create: ObjectCreate
    } = Object;
    const {
      stringify: JSONStringify
    } = JSON;
    const {
      isArray: ArrayIsArray
    } = Array;
    function untrustedIsObject(untrusted) {
      return typeof untrusted === 'object' && untrusted !== null && ArrayIsArray(untrusted) === false;
    }
    const snapshotRefreshOptions = {
      overrides: {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    };
    /**
     * A deterministic JSON stringify implementation. Heavily adapted from https://github.com/epoberezkin/fast-json-stable-stringify.
     * This is needed because insertion order for JSON.stringify(object) affects output:
     * JSON.stringify({a: 1, b: 2})
     *      "{"a":1,"b":2}"
     * JSON.stringify({b: 2, a: 1})
     *      "{"b":2,"a":1}"
     * @param data Data to be JSON-stringified.
     * @returns JSON.stringified value with consistent ordering of keys.
     */
    function stableJSONStringify$1(node) {
      // This is for Date values.
      if (node && node.toJSON && typeof node.toJSON === 'function') {
        // eslint-disable-next-line no-param-reassign
        node = node.toJSON();
      }
      if (node === undefined) {
        return;
      }
      if (typeof node === 'number') {
        return isFinite(node) ? '' + node : 'null';
      }
      if (typeof node !== 'object') {
        return JSONStringify(node);
      }
      let i;
      let out;
      if (ArrayIsArray(node)) {
        out = '[';
        for (i = 0; i < node.length; i++) {
          if (i) {
            out += ',';
          }
          out += stableJSONStringify$1(node[i]) || 'null';
        }
        return out + ']';
      }
      if (node === null) {
        return 'null';
      }
      const keys = ObjectKeys(node).sort();
      out = '';
      for (i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = stableJSONStringify$1(node[key]);
        if (!value) {
          continue;
        }
        if (out) {
          out += ',';
        }
        out += JSONStringify(key) + ':' + value;
      }
      return '{' + out + '}';
    }
    const keyPrefix = 'Apex';
    function createResourceRequest$1(config) {
      const headers = {};
      const header_xSFDCAllowContinuation = config.headers.xSFDCAllowContinuation;
      if (header_xSFDCAllowContinuation !== undefined) {
        headers['X-SFDC-Allow-Continuation'] = header_xSFDCAllowContinuation;
      }
      return {
        baseUri: '/lwr/apex/v62.0',
        basePath: '/' + config.urlParams.apexClass + '/' + config.urlParams.apexMethod + '',
        method: 'get',
        body: null,
        urlParams: config.urlParams,
        queryParams: config.queryParams,
        headers,
        priority: 'normal'
      };
    }
    const {
      create,
      keys,
      values
    } = Object;
    const {
      isArray
    } = Array;
    const {
      stringify
    } = JSON;
    function createLink(ref) {
      return {
        __ref: luvioEngine.serializeStructuredKey(ref)
      };
    }
    const CACHE_CONTROL = 'cache-control';
    // eslint-disable-next-line @salesforce/lds/no-invalid-todo
    // TODO: APEX_TTL, apexResponseEquals, apexResponseIngest, and validateAdapterConfig should have been code generated
    // however compiler does not support response body type any so hand roll for now
    /**
     * Time to live for the Apex cache value. 5 minutes.
     */
    const APEX_TTL = 5 * 60 * 1000;
    // apex is essentially versionless, we can never know the shape of apex data
    // so we will rely on components to code defensively. All apex data will be ingested
    // and looked up with this version
    const APEX_VERSION = 'APEX_V_1';
    const APEX_STORE_METADATA_PARAMS = {
      ttl: APEX_TTL,
      namespace: keyPrefix,
      representationName: '',
      version: APEX_VERSION
    };
    function apexResponseEquals(existing, incoming) {
      return stringify(incoming) === stringify(existing);
    }
    const apexResponseIngest = (input, path, luvio, store, timestamp) => {
      // skip validation and normalization, since input type is any
      const key = path.fullPath;
      const incomingRecord = input;
      const existingRecord = store.readEntry(key);
      // freeze on ingest (luvio.opaque)
      luvioEngine.deepFreeze(incomingRecord);
      if (existingRecord === undefined || apexResponseEquals(existingRecord, incomingRecord) === false) {
        luvio.storePublish(key, incomingRecord);
      }
      luvio.publishStoreMetadata(key, {
        ...APEX_STORE_METADATA_PARAMS,
        ingestionTimestamp: timestamp
      });
      return createLink(key);
    };
    function validateAdapterConfig(untrustedConfig) {
      if (untrustedIsObject(untrustedConfig)) {
        const values$1 = values(untrustedConfig);
        return values$1.indexOf(undefined) === -1 ? untrustedConfig : null;
      }
      return untrustedConfig;
    }
    /**
     * A standard delimiter when producing cache keys.
     */
    const KEY_DELIM = ':';
    function isEmptyParam(param) {
      return param === undefined || param === null || typeof param === 'object' && keys(param).length === 0;
    }
    function keyBuilder(classname, method, isContinuation, params) {
      return [classname.replace('__', KEY_DELIM), method, isContinuation, isEmptyParam(params) ? '' : stableJSONStringify$1(params)].join(KEY_DELIM);
    }
    function configBuilder(config, classname, method, isContinuation) {
      return {
        apexMethod: method,
        apexClass: classname,
        methodParams: config,
        xSFDCAllowContinuation: isContinuation + ''
      };
    }
    function apexClassnameBuilder(namespace, classname) {
      return namespace !== '' ? `${namespace}__${classname}` : classname;
    }
    function isCacheControlValueCacheable(value) {
      if (value === undefined || value === null || typeof value !== 'string') {
        return false;
      }
      return value.indexOf('no-cache') < 0 && value.indexOf('no-store') < 0;
    }
    function getCacheControlHeaderValue(headers) {
      if (headers === undefined) {
        return undefined;
      }
      // header fields are case-insensitive according to
      // https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2
      const headerKeys = keys(headers);
      for (let i = 0, len = headerKeys.length; i < len; i += 1) {
        const key = headerKeys[i];
        if (key.toLowerCase() === CACHE_CONTROL) {
          return headers[key];
        }
      }
      return undefined;
    }
    function shouldCache(response) {
      const {
        headers
      } = response;
      const headerValue = getCacheControlHeaderValue(headers);
      return isCacheControlValueCacheable(headerValue);
    }
    function createResourceParams$1(config) {
      const queryParams = create(null);
      if (!isEmptyParam(config.methodParams)) {
        queryParams.methodParams = config.methodParams;
      }
      return {
        queryParams,
        urlParams: {
          apexMethod: config.apexMethod,
          apexClass: config.apexClass
        },
        headers: {
          xSFDCAllowContinuation: config.xSFDCAllowContinuation
        }
      };
    }
    function keyBuilderFromResourceParams$1(params) {
      let classname = params.urlParams.apexClass.replace('__', KEY_DELIM);
      return [classname, params.urlParams.apexMethod, params.headers.xSFDCAllowContinuation, isEmptyParam(params.queryParams.methodParams) ? '' : stableJSONStringify$1(params.queryParams.methodParams)].join(KEY_DELIM);
    }
    function ingestSuccess$1(luvio, resourceParams, response, snapshotRefresh) {
      const {
        body
      } = response;
      const recordId = keyBuilderFromResourceParams$1(resourceParams);
      const select = {
        recordId,
        node: {
          kind: 'Fragment',
          opaque: true,
          private: [],
          version: APEX_VERSION
        },
        variables: {}
      };
      luvio.storeIngest(recordId, apexResponseIngest, body);
      const snapshot = luvio.storeLookup(select, snapshotRefresh);
      {
        if (response.headers !== undefined && snapshot.state !== 'Fulfilled') {
          throw new Error('Invalid network response. Expected resource response to result in Fulfilled snapshot');
        }
        if (!(snapshot.state === 'Fulfilled' || snapshot.state === 'Stale')) {
          throw new Error('Invalid resource response. Expected resource response to result in Fulfilled or Stale snapshot');
        }
      }
      return snapshot;
    }
    function buildCachedSnapshotCachePolicy$1(buildSnapshotContext, storeLookup) {
      const {
        luvio,
        config
      } = buildSnapshotContext;
      const {
        apexClass,
        apexMethod,
        xSFDCAllowContinuation,
        methodParams
      } = config;
      const recordId = keyBuilder(apexClass, apexMethod, xSFDCAllowContinuation, methodParams);
      return storeLookup({
        recordId: recordId,
        node: {
          kind: 'Fragment',
          opaque: true,
          private: [],
          version: APEX_VERSION
        },
        variables: {}
      }, {
        config,
        resolve: () => buildNetworkSnapshot$1(luvio, config, snapshotRefreshOptions)
      });
    }
    function onFetchResponseSuccess$1(luvio, config, resourceParams, response) {
      const recordId = keyBuilderFromResourceParams$1(resourceParams);
      const select = {
        recordId,
        node: {
          kind: 'Fragment',
          opaque: true,
          private: [],
          version: APEX_VERSION
        },
        variables: {}
      };
      if (shouldCache(response)) {
        const snapshot = ingestSuccess$1(luvio, resourceParams, response, {
          config,
          resolve: () => buildNetworkSnapshot$1(luvio, config, snapshotRefreshOptions)
        });
        return luvio.storeBroadcast().then(() => snapshot);
      }
      // if Cache-Control is not set or set to 'no-cache', return a synthetic snapshot
      return Promise.resolve({
        recordId,
        variables: {},
        seenRecords: new luvioEngine.StoreKeySet(),
        select,
        state: 'Fulfilled',
        data: response.body
      });
    }
    function onFetchResponseError$1(luvio, config, _resourceParams, response) {
      return Promise.resolve(luvio.errorSnapshot(response, {
        config,
        resolve: () => buildNetworkSnapshot$1(luvio, config, snapshotRefreshOptions)
      }));
    }
    function buildNetworkSnapshot$1(luvio, config, options) {
      const resourceParams = createResourceParams$1(config);
      const request = createResourceRequest$1(resourceParams);
      return luvio.dispatchResourceRequest(request, options).then(response => {
        return luvio.handleSuccessResponse(() => onFetchResponseSuccess$1(luvio, config, resourceParams, response),
        // TODO [W-10490362]: Properly generate the response cache keys
        () => {
          return new luvioEngine.StoreKeyMap();
        });
      }, response => {
        return luvio.handleErrorResponse(() => onFetchResponseError$1(luvio, config, resourceParams, response));
      });
    }
    function buildNetworkSnapshotCachePolicy$1(context, coercedAdapterRequestContext) {
      const {
        luvio,
        config
      } = context;
      const {
        networkPriority,
        requestCorrelator,
        eventObservers,
        sourceContext
      } = coercedAdapterRequestContext;
      const dispatchOptions = {
        resourceRequestContext: {
          requestCorrelator,
          sourceContext
        },
        eventObservers
      };
      if (networkPriority !== 'normal') {
        dispatchOptions.overrides = {
          priority: networkPriority
        };
      }
      return buildNetworkSnapshot$1(luvio, config, dispatchOptions);
    }
    const factory = (luvio, invokerParams) => {
      const {
        namespace,
        classname,
        method,
        isContinuation
      } = invokerParams;
      return getApexAdapterFactory(luvio, namespace, classname, method, isContinuation);
    };
    function getApexAdapterFactory(luvio, namespace, classname, method, isContinuation) {
      return (untrustedConfig, requestContext) => {
        // Even though the config is of type `any`,
        // validation is required here because `undefined`
        // values on a wire mean that properties on the component
        // used in the config have not been loaded yet.
        const config = validateAdapterConfig(untrustedConfig);
        // Invalid or incomplete config
        if (config === null) {
          return null;
        }
        const configPlus = configBuilder(config, apexClassnameBuilder(namespace, classname), method, isContinuation);
        return luvio.applyCachePolicy(requestContext || {}, {
          config: configPlus,
          luvio
        }, buildCachedSnapshotCachePolicy$1, buildNetworkSnapshotCachePolicy$1);
      };
    }

    /**
     * A deterministic JSON stringify implementation. Heavily adapted from https://github.com/epoberezkin/fast-json-stable-stringify.
     * This is needed because insertion order for JSON.stringify(object) affects output:
     * JSON.stringify({a: 1, b: 2})
     *      "{"a":1,"b":2}"
     * JSON.stringify({b: 2, a: 1})
     *      "{"b":2,"a":1}"
     * @param data Data to be JSON-stringified.
     * @returns JSON.stringified value with consistent ordering of keys.
     */
    function stableJSONStringify(node) {
      // This is for Date values.
      if (node && node.toJSON && typeof node.toJSON === 'function') {
        // eslint-disable-next-line no-param-reassign
        node = node.toJSON();
      }
      if (node === undefined) {
        return;
      }
      if (typeof node === 'number') {
        return isFinite(node) ? '' + node : 'null';
      }
      if (typeof node !== 'object') {
        return stringify(node);
      }
      let i;
      let out;
      if (isArray(node)) {
        out = '[';
        for (i = 0; i < node.length; i++) {
          if (i) {
            out += ',';
          }
          out += stableJSONStringify(node[i]) || 'null';
        }
        return out + ']';
      }
      if (node === null) {
        return 'null';
      }
      const keys$1 = keys(node).sort();
      out = '';
      for (i = 0; i < keys$1.length; i++) {
        const key = keys$1[i];
        const value = stableJSONStringify(node[key]);
        if (!value) {
          continue;
        }
        if (out) {
          out += ',';
        }
        out += stringify(key) + ':' + value;
      }
      return '{' + out + '}';
    }
    function createResourceRequest(config) {
      const headers = {};
      const header_xSFDCAllowContinuation = config.headers.xSFDCAllowContinuation;
      if (header_xSFDCAllowContinuation !== undefined) {
        headers['X-SFDC-Allow-Continuation'] = header_xSFDCAllowContinuation;
      }
      return {
        baseUri: '/lwr/apex/v62.0',
        basePath: '/' + config.urlParams.apexClass + '/' + config.urlParams.apexMethod + '',
        method: 'post',
        body: config.body,
        urlParams: config.urlParams,
        queryParams: {},
        headers,
        priority: 'normal'
      };
    }
    function createResourceParams(config) {
      return {
        urlParams: {
          apexMethod: config.apexMethod,
          apexClass: config.apexClass
        },
        body: config.methodParams,
        headers: {
          xSFDCAllowContinuation: config.xSFDCAllowContinuation
        }
      };
    }
    function keyBuilderFromResourceParams(params) {
      let classname = params.urlParams.apexClass.replace('__', KEY_DELIM);
      return [classname, params.urlParams.apexMethod, params.headers.xSFDCAllowContinuation, isEmptyParam(params.body) ? '' : stableJSONStringify(params.body)].join(KEY_DELIM);
    }
    function ingestSuccess(luvio, resourceParams, response, snapshotRefresh) {
      const {
        body
      } = response;
      const recordId = keyBuilderFromResourceParams(resourceParams);
      const select = {
        recordId,
        node: {
          kind: 'Fragment',
          opaque: true,
          private: [],
          version: APEX_VERSION
        },
        variables: {}
      };
      luvio.storeIngest(recordId, apexResponseIngest, body);
      const snapshot = luvio.storeLookup(select, snapshotRefresh);
      {
        if (response.headers !== undefined && snapshot.state !== 'Fulfilled') {
          throw new Error('Invalid network response. Expected resource response to result in Fulfilled snapshot');
        }
        if (!(snapshot.state === 'Fulfilled' || snapshot.state === 'Stale')) {
          throw new Error('Invalid resource response. Expected resource response to result in Fulfilled or Stale snapshot');
        }
      }
      return snapshot;
    }
    function buildCachedSnapshotCachePolicy(buildSnapshotContext, storeLookup) {
      const {
        config
      } = buildSnapshotContext;
      const {
        apexClass,
        apexMethod,
        xSFDCAllowContinuation,
        methodParams
      } = config;
      const recordId = keyBuilder(apexClass, apexMethod, xSFDCAllowContinuation, methodParams);
      return storeLookup({
        recordId: recordId,
        node: {
          kind: 'Fragment',
          opaque: true,
          private: [],
          version: APEX_VERSION
        },
        variables: {}
      });
    }
    function onFetchResponseSuccess(luvio, _config, resourceParams, response) {
      const recordId = keyBuilderFromResourceParams(resourceParams);
      const select = {
        recordId,
        node: {
          kind: 'Fragment',
          opaque: true,
          private: [],
          version: APEX_VERSION
        },
        variables: {}
      };
      if (shouldCache(response)) {
        const snapshot = ingestSuccess(luvio, resourceParams, response);
        return luvio.storeBroadcast().then(() => snapshot);
      }
      // if Cache-Control is not set or set to 'no-cache', return a synthetic snapshot
      return Promise.resolve({
        recordId,
        variables: {},
        seenRecords: new luvioEngine.StoreKeySet(),
        select,
        state: 'Fulfilled',
        data: response.body
      });
    }
    function onFetchResponseError(luvio, _config, _resourceParams, response) {
      return Promise.resolve(luvio.errorSnapshot(response));
    }
    function buildNetworkSnapshot(luvio, config, options) {
      const resourceParams = createResourceParams(config);
      const request = createResourceRequest(resourceParams);
      return luvio.dispatchResourceRequest(request, options).then(response => {
        return luvio.handleSuccessResponse(() => onFetchResponseSuccess(luvio, config, resourceParams, response),
        // TODO [W-10490362]: Properly generate response cache keys
        () => {
          return new luvioEngine.StoreKeyMap();
        });
      }, response => {
        return luvio.handleErrorResponse(() => onFetchResponseError(luvio, config, resourceParams, response));
      });
    }
    function buildNetworkSnapshotCachePolicy(context, coercedAdapterRequestContext) {
      const {
        luvio,
        config
      } = context;
      const {
        networkPriority,
        requestCorrelator,
        eventObservers,
        sourceContext
      } = coercedAdapterRequestContext;
      const dispatchOptions = {
        resourceRequestContext: {
          requestCorrelator,
          sourceContext
        },
        eventObservers
      };
      if (networkPriority !== 'normal') {
        dispatchOptions.overrides = {
          priority: networkPriority
        };
      }
      return buildNetworkSnapshot(luvio, config, dispatchOptions);
    }
    function handleSnapshot(snapshot) {
      if (snapshot.state === 'Error') {
        throw snapshot.error;
      }
      return snapshot.data;
    }
    /**
     * Returns a function that executes the supplied ldsAdapter,
     * and handles unwrapping the snapshot to return to caller
     *
     * @param ldsAdapter adapter to be invoked
     * @returns an ApexInvoker
     */
    function invoker(ldsAdapter) {
      return (config, requestContext) => {
        const snapshotOrPromise = ldsAdapter(config, requestContext);
        return Promise.resolve(snapshotOrPromise).then(handleSnapshot);
      };
    }
    const invokerFactory = (luvio, invokerParams, adapterFactory) => {
      const {
        namespace,
        classname,
        method,
        isContinuation
      } = invokerParams;
      const ldsAdapter = adapterFactory(luvio, namespace, classname, method, isContinuation);
      return invoker(ldsAdapter);
    };
    const postInvoker = (luvio, invokerParams) => {
      return invokerFactory(luvio, invokerParams, postApexAdapterFactory);
    };
    const getInvoker = (luvio, invokerParams) => {
      return invokerFactory(luvio, invokerParams, getApexAdapterFactory);
    };
    function postApexAdapterFactory(luvio, namespace, classname, method, isContinuation) {
      return (config, requestContext) => {
        // config validation is unnecessary for this imperative adapter
        // due to the config being of type `any`.
        // however, we have special config validation for the wire adapter,
        // explanation in getApex
        const configPlus = configBuilder(config, apexClassnameBuilder(namespace, classname), method, isContinuation);
        return luvio.applyCachePolicy(requestContext || {}, {
          config: configPlus,
          luvio
        }, buildCachedSnapshotCachePolicy, buildNetworkSnapshotCachePolicy);
      };
    }
    const engineForPrefetcherMap = new Map();
    function registerPrefetcher(luvio, prefetcher) {
      {
        if (engineForPrefetcherMap.has(luvio)) {
          throw new Error('Environment error: Only one prefetcher per engine is allowed.');
        }
      }
      engineForPrefetcherMap.set(luvio, prefetcher);
    }
    function getPrefetcherFor(luvio) {
      return engineForPrefetcherMap.get(luvio);
    }
    function createGetApexAdapterWithPrediction(adapter, luvio, invokerParams, name) {
      return (config, requestContext) => {
        const prefetcher = getPrefetcherFor(luvio);
        const result = adapter(config, requestContext);
        // only save requests with a valid config.
        if (result !== null && prefetcher !== undefined && !(requestContext && requestContext.excludeFromPredictions)) {
          prefetcher.saveRequest({
            adapterName: 'getApex',
            config: {
              name,
              invokerParams,
              config
            }
          });
        }
        return result;
      };
    }
    const REFRESH_APEX_KEY = 'refreshApex';
    // export for @salesforce/apex
    const refreshApex = function (data) {
      return ldsBindings.refresh(data, REFRESH_APEX_KEY);
    };
    let luvio;
    ldsEngine.withDefaultLuvio(_luvio => {
      luvio = _luvio;
      ldsBindings.bindWireRefresh(luvio);
    });
    /**
     * Imperative GET Apex Adapter.
     *
     * @param namespace a one- to 15-character alphanumeric identifier that distinguishes a package and its contents from other packages
     * @param classname name of class where method is defined
     * @param method name of method defining the Apex code
     * @param isContinuation used to specify if the Apex method is a Continuation
     * @returns an ImperativeAdapter that uses the GET endpoint
     */
    const getApexInvoker_imperative = function (namespace, classname, method, isContinuation) {
      if (luvio === undefined) {
        {
          throw new Error('cannot create Apex adapter before default luvio is set');
        }
      }
      const adapterName = `getApex_${namespace}_${classname}_${method}_${isContinuation}`;
      const adapterMetadata = {
        apiFamily: 'Apex',
        name: adapterName
      };
      const getApexInstrumentedLdsAdapter = ldsBindings.createInstrumentedAdapter(ldsBindings.createLDSAdapter(luvio, adapterName, luvio => factory(luvio, {
        namespace,
        classname,
        method,
        isContinuation
      })), adapterMetadata);
      return ldsBindings.createImperativeAdapter(luvio, getApexInstrumentedLdsAdapter, adapterMetadata);
    };
    /**
     * Apex
     *
     * The Apex invoker is dual purpose; it can be invoked imperatively or be provided to an @wire
     * In order for this to work, LWC will look for the property "adapter" on the object, and check that
     * it conforms to the WireAdapter interface.
     */
    const getApexInvoker = function (namespace, classname, method, isContinuation, isCacheable) {
      if (luvio === undefined) {
        {
          throw new Error('cannot create Apex adapter before default luvio is set');
        }
      }
      const adapterName = `getApex_${namespace}_${classname}_${method}_${isContinuation}`;
      const adapterMetadata = {
        apiFamily: 'Apex',
        name: adapterName
      };
      const apexInvoker = isCacheable ? getInvoker : postInvoker;
      const invokeApexImperative = ldsBindings.createLDSAdapter(luvio, adapterName, luvio => apexInvoker(luvio, {
        namespace,
        classname,
        method,
        isContinuation
      }));
      invokeApexImperative.adapter = ldsBindings.createWireAdapterConstructor(luvio, ldsBindings.createInstrumentedAdapter(createGetApexAdapterWithPrediction(ldsBindings.createLDSAdapter(luvio, adapterName, luvio => factory(luvio, {
        namespace,
        classname,
        method,
        isContinuation
      })), luvio, {
        namespace,
        classname,
        method,
        isContinuation
      }, adapterName), adapterMetadata), adapterMetadata);
      return invokeApexImperative;
    };
    // version: 1.309.0-dev21-4baf03ecaf
    const __lwc_hmr_context = { moduleHash : '337d289492b7a095e50463d26bd160e8' };
    if (lwc.hot) {
        lwc.hot.register('force/ldsAdaptersApex/ldsAdaptersApex.js', '337d289492b7a095e50463d26bd160e8', {"name":"ldsAdaptersApex","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.GetApexWireAdapterFactory = factory;
    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.getApexInvoker = getApexInvoker;
    exports.getApexInvoker_imperative = getApexInvoker_imperative;
    exports.getSObjectValue = getSObjectValue;
    exports.refreshApex = refreshApex;
    exports.registerPrefetcher = registerPrefetcher;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('@salesforce/apex/applauncher.LoginFormController.setExperienceId', ['exports', 'lwc', 'force/ldsAdaptersApex'], (function (exports, lwc, ldsAdaptersApex) {

	var _tmpl = void 0;

	const apexInvoker = ldsAdaptersApex.getApexInvoker("applauncher", "LoginFormController", "setExperienceId", "false");
	const __lwc_component_class_internal = lwc.registerComponent(apexInvoker, {
	  tmpl: _tmpl,
	  sel: "@salesforce-20mfaxiv6iin2dap7vmnfiqin85zkn9s45mjngtf5la1ji639ivbua1yobewiz5vpqljrck2kgysq184k",
	  apiVersion: 62
	});

	exports.default = __lwc_component_class_internal;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('community_login/loginUtils', ['exports', '@salesforce/apex/applauncher.LoginFormController.setExperienceId'], (function (exports, setExperienceId) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var setExperienceId__default = /*#__PURE__*/_interopDefaultCompat(setExperienceId);

    const ENTER_KEY = 'Enter';

    /**
     * Return startURL query param value from the current URL or empty string if no start URL parameter present.
     */
    function getStartUrlFromCurrentUrl() {
      try {
        const keyValuePairs = queryStringToMap(window.location.search.substring(1).replace(/\+/g, ' '));
        return keyValuePairs.startURL || '';
      } catch (URIError) {
        return '';
      }
    }

    /**
     * Return decoded startURL query param value from the current URL,
     * or empty string if no start URL parameter present.
     */
    function getDecodedStartUrlFromCurrentUrl() {
      const startUrl = getStartUrlFromCurrentUrl();
      if (startUrl && !startUrl.startsWith('/')) {
        try {
          const decoded = decodeURIComponent(startUrl);
          return decoded;
        } catch (err) {
          // Return original startUrl from query string
        }
      }
      return startUrl || '';
    }

    /**
     * Append start URL to target URL as a query parameter or return the target URL if either input is missing.
     *
     * @param {string} target URL
     * @param {string} start URL
     */
    function appendStartUrlToTargetUrl(targetUrl, startUrl) {
      if (targetUrl && startUrl) {
        if (targetUrl.includes('?')) {
          targetUrl = targetUrl + '&startURL=' + startUrl;
        } else {
          targetUrl = targetUrl + '?startURL=' + startUrl;
        }
      }
      return targetUrl;
    }

    /**
     * Return expId param value from the current URL or empty string if no expId param present.
     */
    function getExpIdFromCurrentUrl() {
      const keyValuePairs = queryStringToMap(window.location.search.substring(1).replace(/\+/g, ' '));
      return keyValuePairs.expid || '';
    }

    /**
     * Retrieve expId param from current URL and set it as a branding cookie in response header.
     */
    function setBrandingCookie() {
      const expId = getExpIdFromCurrentUrl();
      if (expId) {
        setExperienceId__default.default({
          expId
        });
      }
    }
    function queryStringToMap(queryString) {
      return queryString.split('&').map(str => {
        const [key, value] = str.split('=');
        return {
          [key]: decodeURI(value)
        };
      }).reduce((prev, curr) => Object.assign(prev, curr));
    }

    exports.ENTER_KEY = ENTER_KEY;
    exports.appendStartUrlToTargetUrl = appendStartUrlToTargetUrl;
    exports.getDecodedStartUrlFromCurrentUrl = getDecodedStartUrlFromCurrentUrl;
    exports.getExpIdFromCurrentUrl = getExpIdFromCurrentUrl;
    exports.getStartUrlFromCurrentUrl = getStartUrlFromCurrentUrl;
    exports.setBrandingCookie = setBrandingCookie;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('community_login/checkEmail', ['exports', 'lwc', 'lightning/formattedText', 'lightning/formattedRichText', 'community_login/loginUtils', '@salesforce/label/CheckEmailLWC.title', '@salesforce/label/CheckEmailLWC.backToLogin', '@salesforce/label/CheckEmailLWC.message'], (function (exports, lwc, _lightningFormattedText, _lightningFormattedRichText, loginUtils, titleDefault, returnButtonDefault, checkEmailMessageDefault) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var _lightningFormattedText__default = /*#__PURE__*/_interopDefaultCompat(_lightningFormattedText);
    var _lightningFormattedRichText__default = /*#__PURE__*/_interopDefaultCompat(_lightningFormattedRichText);
    var titleDefault__default = /*#__PURE__*/_interopDefaultCompat(titleDefault);
    var returnButtonDefault__default = /*#__PURE__*/_interopDefaultCompat(returnButtonDefault);
    var checkEmailMessageDefault__default = /*#__PURE__*/_interopDefaultCompat(checkEmailMessageDefault);

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("[" + token + "]") : "";
      return ".comm-check-email__container" + shadowSelector + " {min-width: 18rem;max-width: 25rem;margin: 0px auto;color: var(--lwc-colorTextDefault, var(--dxp-g-root-contrast-1));background-color: var(--lwc-cardBackgroundColor, --dxp-g-root-1);font-family: var(--lwc-fontFamily, var(--dxp-g-root-font-family));}.comm-check-email__title" + shadowSelector + " {color: var(--lwc-colorTextDefault, var(--dxp-g-root-contrast));}.comm-check-email_return-button" + shadowSelector + " {color: var(--lwc-colorTextButtonBrand, var(--dxp-g-brand-contrast));background-color: var(--lwc-colorBackgroundButtonBrand, var(--dxp-g-brand));font-family: var(--lwc-fontFamily, var(--dxp-g-root-font-family));}.comm-check-email_return-button:hover" + shadowSelector + " {background-color: var(--lwc-colorBackgroundButtonBrand, var(--dxp-g-brand));}.comm-check-email_return-button:focus" + shadowSelector + " {background-color: var(--lwc-colorBackgroundButtonBrand, var(--dxp-g-brand));}";
      /*LWC compiler v7.1.5*/
    }
    var _implicitStylesheets = [stylesheet];

    const $fragment1 = lwc.parseFragment`<h2 class="comm-check-email__title slds-text-heading_large slds-text-align_center slds-var-p-around_large${0}"${2}>${"t1"}</h2>`;
    const $fragment2 = lwc.parseFragment`<div class="slds-form-element slds-m-top_small slds-m-bottom_large${0}"${2}><div class="slds-form-element__control${0}"${2}><button data-submitbtn type="button" class="comm-check-email_return-button slds-button slds-button_brand slds-button_stretch${0}"${2}>${"t3"}</button></div></div>`;
    const stc0 = {
      classMap: {
        "comm-check-email__container": true,
        "slds-card": true,
        "slds-card_inner": true,
        "slds-col": true,
        "slds-grow": true,
        "slds-p-around_medium": true
      },
      key: 2
    };
    const stc1 = {
      classMap: {
        "slds-p-bottom_small": true
      },
      key: 3
    };
    const stc2 = {
      classMap: {
        "slds-form-element": true
      },
      key: 7
    };
    const stc3 = {
      classMap: {
        "slds-form-element__control": true
      },
      key: 8
    };
    const stc4 = {
      "slds-text-color_error": true
    };
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, c: api_custom_element, h: api_element, b: api_bind} = $api;
      const {_m0} = $ctx;
      return [api_static_fragment($fragment1, 1, [api_static_part(1, null, api_dynamic_text($cmp.titleLabelText))]), api_element("div", stc0, [api_element("p", stc1, [api_custom_element("lightning-formatted-text", _lightningFormattedText__default.default, {
        props: {
          "value": $cmp.checkEmailMessageText
        },
        key: 4
      })]), api_static_fragment($fragment2, 6, [api_static_part(2, {
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.submit))
        }
      }, null), api_static_part(3, null, api_dynamic_text($cmp.returnButtonLabelText))]), $cmp.state.showError ? api_element("div", stc2, [api_element("div", stc3, [api_custom_element("lightning-formatted-rich-text", _lightningFormattedRichText__default.default, {
        classMap: stc4,
        props: {
          "value": $cmp.state.errorMessage
        },
        key: 9
      })])]) : null])];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-76j4ggd0p58";
    tmpl.legacyStylesheetToken = "community_login-checkEmail_checkEmail";
    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    const loginUrl = './login';

    /* TODO (@W-8528575): remove after locker compiler integration */
    class CheckEmail extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        /**
         * List of properties customizable via the builder.
         * Refer to the js-meta file for detail and usage.
         */
        this.titleLabel = void 0;
        this.returnButtonLabel = void 0;
        this.checkEmailMessage = void 0;
        this.state = {
          errorMessage: '',
          showError: false
        };
      }
      get titleLabelText() {
        return this.titleLabel || titleDefault__default.default;
      }
      get returnButtonLabelText() {
        return this.returnButtonLabel || returnButtonDefault__default.default;
      }
      get checkEmailMessageText() {
        return this.checkEmailMessage || checkEmailMessageDefault__default.default;
      }
      async submit() {
        window.location.assign(loginUtils.appendStartUrlToTargetUrl(loginUrl, loginUtils.getStartUrlFromCurrentUrl()));
      }
      connectedCallback() {
        this.classList.add('comm-check-email');
      }
      /*LWC compiler v7.1.5*/
    }
    lwc.registerDecorators(CheckEmail, {
      publicProps: {
        titleLabel: {
          config: 0
        },
        returnButtonLabel: {
          config: 0
        },
        checkEmailMessage: {
          config: 0
        }
      },
      track: {
        state: 1
      }
    });
    const __lwc_component_class_internal = lwc.registerComponent(CheckEmail, {
      tmpl: _tmpl,
      sel: "community_login-check-email",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@salesforce/community/Id', [], function() { return "0DBHy0000005ZrLOAU"; });
(function() { LWR.define('dxp_util/siteInfo', ['exports', '@salesforce/community/basePath', 'dxp_util/common', '@salesforce/i18n/lang', '@salesforce/community/Id', '@salesforce/site/Id'], (function (exports, basePath, common, CurrentLocale, CommunityId, SiteId) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var basePath__default = /*#__PURE__*/_interopDefaultCompat(basePath);
    var CurrentLocale__default = /*#__PURE__*/_interopDefaultCompat(CurrentLocale);
    var CommunityId__default = /*#__PURE__*/_interopDefaultCompat(CommunityId);
    var SiteId__default = /*#__PURE__*/_interopDefaultCompat(SiteId);

    const CMS_PATH_PREFIX = "/sfsites/c";
    const SITE_CMS_PATH_PREFIX = `${basePath__default.default}${CMS_PATH_PREFIX}`;
    const constructUrlPath = common.curry((prefix, isExternal, url) => {
      return isExternal ? url : `${basePath__default.default}${prefix ?? ""}${prefixWithLeadingSlash(url)}`;
    });
    const constructCmsPath = constructUrlPath(CMS_PATH_PREFIX);
    const constructSitePath = constructUrlPath("");
    const SiteInfo = {
      // curr locale is sometimes not formated to the correct syntax for locale, needs to be en_US, not en-US
      CurrentLanguage: CurrentLocale__default.default.replace("-", "_"),
      CommunityId: CommunityId__default.default,
      CurrentLocale: CurrentLocale__default.default,
      SiteId: SiteId__default.default
    };

    /**
     * Return cms path prefix.
     *
     * @returns {string} path prefix
     */
    function getPathPrefix() {
      return SITE_CMS_PATH_PREFIX;
    }

    /**
     * Construct url with site path
     *
     * @param {string} url relative url
     * @param {boolean} isExternal whether isExternal url.
     * @returns {string} content url
     */
    function buildSitePath(url, isExternal = false) {
      return constructSitePath(isExternal, url);
    }

    /**
     * Construct url with site path
     *
     * @param {string} url relative url
     * @param {boolean} isExternal whether isExternal url.
     * @returns {string} content url
     */
    function buildSiteCmsPath(url, isExternal = false) {
      return constructCmsPath(isExternal, url);
    }

    /**
     * Check if given url is site url
     *
     * @param {string} url url to check
     * @returns {boolean} whether url is a site url
     */
    function isSitePath(url) {
      return url?.startsWith(basePath__default.default);
    }

    /**
     * Checks if a URL string starts with either "http://", "https://", or "data:image".
     *
     * @param {string} url - The URL string to check.
     * @returns {boolean} Returns true if the URL starts with "http://", "https://", or "data:image"; otherwise, returns false.
     */
    function isValidImageUrl(url) {
      const regex = /^(https?|data:image\/[a-z]+)/i;
      return regex.test(url);
    }

    /**
     * Prefixes a URL segment with a leading slash if needed.
     * If the URL segment starts with a slash, it is returned unchanged.
     * If the URL segment does not start with a slash, a leading slash is added.
     *
     * @param {string} urlSegment - The URL segment to be prefixed.
     * @returns {string} The URL segment with a leading slash if needed.
     */
    function prefixWithLeadingSlash(urlSegment) {
      return urlSegment && !/^\/.*/.test(urlSegment) ? `/${urlSegment}` : urlSegment;
    }

    /**
     * Returns the image URL based on the provided URL.
     *
     * @param {string} url - The input URL.
     * @returns {string} The image URL.
     */
    function getImageUrl(url) {
      return isSitePath(url) ? url : buildSitePath(url, isValidImageUrl(url));
    }

    exports.CMS_PATH_PREFIX = CMS_PATH_PREFIX;
    exports.SiteInfo = SiteInfo;
    exports.buildSiteCmsPath = buildSiteCmsPath;
    exports.buildSitePath = buildSitePath;
    exports.constructUrlPath = constructUrlPath;
    exports.getImageUrl = getImageUrl;
    exports.getPathPrefix = getPathPrefix;
    exports.isSitePath = isSitePath;
    exports.isValidImageUrl = isValidImageUrl;
    exports.prefixWithLeadingSlash = prefixWithLeadingSlash;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_util/contentInfo', ['exports', 'dxp_util/siteInfo', 'dxp_util/normalizer'], (function (exports, siteInfo, normalizer) {

    /**
     * Regular expressions for CMS resources and for static image resources.
     */
    const cmsResourceUrlPattern = /^\/cms\//;
    const staticImageResourcePattern = /^\/img\//; // Static app resources referenced (e.g. the "no image" image")
    const staticCmsAssetPattern = /^\/assets\//; // Static (LWR-specific) app resources referenced

    /**
     * Check if given url is a cms resource url
     *
     * @param {string} url url to check
     * @returns {boolean} true if url contains /cms/ part
     */
    function isCmsResource(url) {
      return cmsResourceUrlPattern.test(url);
    }

    /**
     * Check if given url is a static image resource url
     *
     * @param {string} url url to check
     * @returns {boolean} true if url contains /img/ part
     */
    function isStaticImageResource(url) {
      return staticImageResourcePattern.test(url);
    }

    /**
     * Check if given url is a cms asset url
     *
     * @param {string} url url to check
     * @returns {boolean} true if url contains /assets/ part
     */
    function isCmsAsset(url) {
      return staticCmsAssetPattern.test(url);
    }

    /**
     * Check if given url is a resource url
     *
     * @param {string} url url to check
     * @returns {boolean} true if url is cms or image url
     */
    function isResource(url) {
      return isCmsResource(url) || isStaticImageResource(url);
    }

    /**
     * Resolves a cms assets/resource URL - that may (or may not) be managed by Salesforce CMS - to a canonical, routable URL.
     *
     * @param {string} url
     *  A URL of a resource. This may - or may not - be a Salesforce-hosted CMS resource.
     *
     * @returns {string}
     *  If {@see url} represents a CMS-hosted resource, then a resolved CMS resource URL;
     *  otherwise, the unaltered {@see url}.
     */
    function resolveUrl(url) {
      // If the URL is a CMS URL, transform it; otherwise, leave it alone.
      return isCmsAsset(url) ? siteInfo.buildSitePath(url) : isResource(url) ? siteInfo.buildSiteCmsPath(url) : url;
    }

    const CMS_MEDIA_BASE_PATH = "/cms/delivery/media";

    /**
     * A simple image info representation
     *
     * @typedef {object} ImageInfo
     *
     * @property {string} url image url
     * @property {string} altText alternative text
     */

    /**
     * A simple url info representation
     *
     * @typedef {object} UrlInfo
     *
     * @property {string} url image url
     * @property {boolean} isExternal whether url is external url
     */

    /**
     * Return cms content url *
     *
     * @param {object} config { url, isExternal }
     * @returns {string} content url
     */
    function getCMSContentUrl(config) {
      const {
        url,
        isExternal
      } = config;
      return siteInfo.buildSiteCmsPath(url, isExternal);
    }

    /**
     * Convert a cms item to url info
     *
     * @param {object} item cms content item
     * @returns {UrlInfo} url info
     */
    function toUrlInfo(item) {
      return {
        url: item.contentNodes?.source?.url ?? "",
        isExternal: !!item.contentNodes?.source?.isExternal,
        altText: item.contentNodes?.altText?.value ?? ""
      };
    }
    /**
     * Convert items to key map
     *
     * @param {Array} cmsContentItems Content Items
     * @returns {object} Content Key Map
     */
    function convertItemsToContentKeyMap(cmsContentItems = []) {
      return cmsContentItems.filter(item => item.contentKey && item.contentNodes).reduce((acc, item) => {
        acc.set(item.contentKey, toUrlInfo(item));
        return acc;
      }, new Map());
    }

    /**
     * Extract image info from cms content
     *
     * @param {object} data cms content data
     * @param {string[]} contentKeys a array of content key
     * @returns {ImageInfo} extracted image info
     */
    function extractImageInfo(data, contentKeys) {
      const contentKeyUrlMap = convertItemsToContentKeyMap(data?.items ?? []);
      const [key] = contentKeys;
      const urlInfo = contentKeyUrlMap.get(key);
      const imageInfo = urlInfo ? {
        url: getCMSContentUrl(urlInfo),
        altText: urlInfo.altText
      } : {};
      return imageInfo;
    }

    /**
     * Extract image info from cms v2 content
     *
     * @param {object} data cms content data
     * @returns {ImageInfo} extracted image info
     */
    function extractImageInfoV2(data) {
      const content = data?.contentBody ?? {};
      const media = content["sfdc_cms:media"] ?? {};
      const imageInfo = {
        url: siteInfo.buildSiteCmsPath(media.url ?? "", media.source?.type === "url"),
        altText: content.altText ?? ""
      };
      return imageInfo;
    }

    /**
     * Get Different Form Factors URLs from Image Info
     *
     * @param {object} imageInfo image info object
     * @returns {object} URLs for Mobile, Tablet and Desktop Form Factors
     */
    function getImageSrcSetUrls(imageInfo) {
      const mobileUrl = normalizer.normalizeString(imageInfo?.SrcSet?.[0]?.srcSet?.[0] || imageInfo?.Url, {
        fallbackValue: "initial",
        caseSensitive: true
      });
      const tabletUrl = normalizer.normalizeString(imageInfo?.SrcSet?.[1]?.srcSet?.[0] || imageInfo?.Url, {
        fallbackValue: "initial",
        caseSensitive: true
      });
      const desktopUrl = normalizer.normalizeString(imageInfo?.SrcSet?.[2]?.srcSet?.[0] || imageInfo?.Url, {
        fallbackValue: "initial",
        caseSensitive: true
      });
      return {
        mobileUrl,
        tabletUrl,
        desktopUrl
      };
    }

    /**
     * Extract Content Key from CMS Resource URL
     *
     * @param {string} url raw url
     * @returns {string} content key
     */
    function getContentKey(url) {
      if (!url || !url.includes(CMS_MEDIA_BASE_PATH)) {
        return null;
      }
      const start = url.indexOf(CMS_MEDIA_BASE_PATH) + CMS_MEDIA_BASE_PATH.length + 1;
      return url.substring(start) || null;
    }

    exports.convertItemsToContentKeyMap = convertItemsToContentKeyMap;
    exports.extractImageInfo = extractImageInfo;
    exports.extractImageInfoV2 = extractImageInfoV2;
    exports.getCMSContentUrl = getCMSContentUrl;
    exports.getContentKey = getContentKey;
    exports.getImageSrcSetUrls = getImageSrcSetUrls;
    exports.isCmsAsset = isCmsAsset;
    exports.isCmsResource = isCmsResource;
    exports.isResource = isResource;
    exports.isStaticImageResource = isStaticImageResource;
    exports.resolveUrl = resolveUrl;
    exports.toUrlInfo = toUrlInfo;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('community_layout/section', ['exports', 'lwc', 'lwr/environment', 'dxp_util/common', 'dxp_util/contentInfo'], (function (exports, lwc, environment, common, contentInfo) {

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("." + token) : "";
      var hostSelector = token ? ("." + token + "-host") : "";
      return ((useActualHostSelector ? ":host.comm-section-container {" : hostSelector + ".comm-section-container {")) + "display: block;position: relative;}.columns-content" + shadowSelector + " {display: flex;margin-left: auto;margin-right: auto;position: relative;}.background-image" + shadowSelector + ",.background-image-overlay" + shadowSelector + " {position: absolute;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;z-index: 0;}.background-image-overlay" + shadowSelector + " {background-color: var(--dxp-c-section-image-overlay-color);}@media only screen and (min-width: 64.0625em) {" + ((useActualHostSelector ? ":host.comm-section-container {" : hostSelector + ".comm-section-container {")) + "padding: var(\n --dxp-c-section-content-spacing-block-start,\n var(--dxp-style-c-padding-top, var(--dxp-s-section-content-spacing-block-start))\n )\n var(\n --dxp-c-section-content-spacing-inline-end,\n var(--dxp-style-c-padding-right, var(--dxp-s-section-content-spacing-inline-end))\n )\n var(\n --dxp-c-section-content-spacing-block-end,\n var(--dxp-style-c-padding-bottom, var(--dxp-s-section-content-spacing-block-end))\n )\n var(\n --dxp-c-section-content-spacing-inline-start,\n var(--dxp-style-c-padding-left, var(--dxp-s-section-content-spacing-inline-start))\n );min-height: var(--dxp-c-section-min-height-desktop, var(--dxp-c-l-section-min-height));}.columns-content" + shadowSelector + " {--dxp-c-region-wrapper-vertical-align: var(\n --dxp-c-l-section-vertical-align,\n var(--dxp-c-section-vertical-align)\n );flex-direction: row;max-width: var(\n --dxp-c-section-columns-max-width,\n var(\n --dxp-c-l-max-content-width,\n var(--dxp-c-max-content-width, var(--dxp-s-section-columns-max-width))\n )\n );min-height: var(\n --dxp-c-section-columns-min-height-desktop,\n var(--dxp-c-l-section-min-height)\n );}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'] .columns-content" : hostSelector + "[data-layout-direction~='desktop-direction-row'] .columns-content")) + shadowSelector + " {flex-direction: row;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-column'] .columns-content" : hostSelector + "[data-layout-direction~='desktop-direction-column'] .columns-content")) + shadowSelector + " {flex-direction: column;}.background-image" + shadowSelector + ", .background-image-overlay" + shadowSelector + " {min-height: var(--dxp-c-section-min-height-desktop, var(--dxp-c-l-section-min-height));}.background-image" + shadowSelector + " {background: var(--dxp-c-l-section-image-url) var(--dxp-c-section-image-position)\n var(--dxp-c-section-image-size-and-repeat);}}@media only screen and (min-width: 48em) and (max-width: 64em) {" + ((useActualHostSelector ? ":host.comm-section-container {" : hostSelector + ".comm-section-container {")) + "padding: var(\n --dxp-c-section-content-spacing-block-start-tablet,\n var(\n --dxp-style-c-padding-top-m,\n var(--dxp-s-section-content-spacing-block-start-mobile)\n )\n )\n var(\n --dxp-c-section-content-spacing-inline-end-tablet,\n var(\n --dxp-style-c-padding-right-m,\n var(--dxp-s-section-content-spacing-inline-end-mobile)\n )\n )\n var(\n --dxp-c-section-content-spacing-block-end-tablet,\n var(\n --dxp-style-c-padding-bottom-m,\n var(--dxp-s-section-content-spacing-block-end-mobile)\n )\n )\n var(\n --dxp-c-section-content-spacing-inline-start-tablet,\n var(\n --dxp-style-c-padding-left-m,\n var(--dxp-s-section-content-spacing-inline-start-mobile)\n )\n );min-height: var(--dxp-c-section-min-height-tablet, var(--dxp-c-m-section-min-height));}.columns-content" + shadowSelector + " {--dxp-c-region-wrapper-vertical-align: var(\n --dxp-c-m-section-vertical-align,\n var(--dxp-c-section-vertical-align)\n );flex-direction: column;max-width: var(\n --dxp-c-section-columns-max-width-tablet,\n var(\n --dxp-c-m-max-content-width,\n var(--dxp-c-max-content-width, var(--dxp-s-section-columns-max-width-mobile))\n )\n );min-height: var(\n --dxp-c-section-columns-min-height-tablet,\n var(--dxp-c-m-section-min-height)\n );}" + ((useActualHostSelector ? ":host[data-layout-direction~='tablet-direction-row'] .columns-content" : hostSelector + "[data-layout-direction~='tablet-direction-row'] .columns-content")) + shadowSelector + " {flex-direction: row;}" + ((useActualHostSelector ? ":host[data-layout-direction~='tablet-direction-column'] .columns-content" : hostSelector + "[data-layout-direction~='tablet-direction-column'] .columns-content")) + shadowSelector + " {flex-direction: column;}.background-image" + shadowSelector + ", .background-image-overlay" + shadowSelector + " {min-height: var(--dxp-c-section-min-height-tablet, var(--dxp-c-m-section-min-height));}.background-image" + shadowSelector + " {background: var(--dxp-c-m-section-image-url) var(--dxp-c-section-image-position)\n var(--dxp-c-section-image-size-and-repeat);}}@media only screen and (max-width: 47.9375em) {" + ((useActualHostSelector ? ":host.comm-section-container {" : hostSelector + ".comm-section-container {")) + "padding: var(\n --dxp-c-section-content-spacing-block-start-mobile,\n var(\n --dxp-style-c-padding-top-s,\n var(--dxp-s-section-content-spacing-block-start-mobile)\n )\n )\n var(\n --dxp-c-section-content-spacing-inline-end-mobile,\n var(\n --dxp-style-c-padding-right-s,\n var(--dxp-s-section-content-spacing-inline-end-mobile)\n )\n )\n var(\n --dxp-c-section-content-spacing-block-end-mobile,\n var(\n --dxp-style-c-padding-bottom-s,\n var(--dxp-s-section-content-spacing-block-end-mobile)\n )\n )\n var(\n --dxp-c-section-content-spacing-inline-start-mobile,\n var(\n --dxp-style-c-padding-left-s,\n var(--dxp-s-section-content-spacing-inline-start-mobile)\n )\n );min-height: var(--dxp-c-section-min-height-mobile, var(--dxp-c-s-section-min-height));}.columns-content" + shadowSelector + " {--dxp-c-region-wrapper-vertical-align: var(\n --dxp-c-s-section-vertical-align,\n var(--dxp-c-section-vertical-align)\n );flex-direction: column;max-width: var(\n --dxp-c-section-columns-max-width-mobile,\n var(\n --dxp-c-s-max-content-width,\n var(--dxp-c-max-content-width, var(--dxp-s-section-columns-max-width-mobile))\n )\n );min-height: var(\n --dxp-c-section-columns-min-height-mobile,\n var(--dxp-c-s-section-min-height)\n );}" + ((useActualHostSelector ? ":host[data-layout-direction~='mobile-direction-row'] .columns-content" : hostSelector + "[data-layout-direction~='mobile-direction-row'] .columns-content")) + shadowSelector + " {flex-direction: row;}" + ((useActualHostSelector ? ":host[data-layout-direction~='mobile-direction-column'] .columns-content" : hostSelector + "[data-layout-direction~='mobile-direction-column'] .columns-content")) + shadowSelector + " {flex-direction: column;}.background-image" + shadowSelector + ", .background-image-overlay" + shadowSelector + " {min-height: var(--dxp-c-section-min-height-mobile, var(--dxp-c-s-section-min-height));}.background-image" + shadowSelector + " {background: var(--dxp-c-s-section-image-url) var(--dxp-c-section-image-position)\n var(--dxp-c-section-image-size-and-repeat);}}";
      /*LWC compiler v7.1.5*/
    }
    stylesheet.$scoped$ = true;
    var _implicitScopedStylesheets = [stylesheet];

    const $fragment1 = lwc.parseFragment`<div class="background-image${0}"${"a0:aria-label"}${2}></div>`;
    const $fragment2 = lwc.parseFragment`<div class="background-image-overlay${0}"${2}></div>`;
    const stc0 = {
      classMap: {
        "columns-content": true
      },
      key: 4
    };
    const stc1 = {
      attrs: {
        "name": "columns"
      },
      key: 5
    };
    const stc2 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {sp: api_static_part, st: api_static_fragment, s: api_slot, h: api_element} = $api;
      return [api_static_fragment($fragment1, 1, [api_static_part(0, {
        attrs: {
          "aria-label": $cmp.imageAlt
        }
      }, null)]), api_static_fragment($fragment2, 3), api_element("div", stc0, [api_slot("columns", stc1, stc2, $slotset)])];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = ["columns"];
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-6j9an5vbrcd";
    tmpl.legacyStylesheetToken = "community_layout-section_section";
    if (_implicitScopedStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    /**
     * This comment is important, if it doesn't exist the slot will not be accessible in the ModuleDef,
     * see https://gus.lightning.force.com/lightning/r/0D5B000000moNnZ/view
     * @slot columns container for community_layout-column components
     */
    class Section extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._imageAltText = '';
        this._desktopBackgroundImageUrl = void 0;
        this._tabletBackgroundImageUrl = void 0;
        this._mobileBackgroundImageUrl = void 0;
        /**
         * sectionConfig is a JSON blob that stores attributes needed for site.com CRUD info (columnKey, Name, columns)
         * AND also attributes that will be passed into the generated column component (columnWidth)
         */
        this.sectionConfig = '{"columns":[{"columnKey":"col1","columnName":"Column 1","columnWidth":"12","seedComponents":[]}]}';
        this.maxContentWidth = void 0;
        this.sectionColumnGutterWidth = void 0;
        this.componentSpacerSize = void 0;
        this.sectionMinHeight = void 0;
        this.layoutDirectionDesktop = void 0;
        this.layoutDirectionTablet = void 0;
        this.layoutDirectionMobile = void 0;
        this.sectionVerticalAlign = void 0;
        this.backgroundImageOverlay = void 0;
      }
      /**
       * Gets the specified image from the CMS picker.
       */
      get backgroundImageConfig() {
        return this._backgroundImage;
      }
      set backgroundImageConfig(value) {
        if (typeof value === 'object' && value !== null) {
          this._backgroundImage = value;
          this._imageAltText = value?.AltText || '';
          const srcSetUrls = contentInfo.getImageSrcSetUrls(value);
          ({
            mobileUrl: this._mobileBackgroundImageUrl,
            tabletUrl: this._tabletBackgroundImageUrl,
            desktopUrl: this._desktopBackgroundImageUrl
          } = srcSetUrls);
        } else {
          this._backgroundImage = {};
        }
      }
      get imageAlt() {
        return this._imageAltText;
      }
      connectedCallback() {
        this.classList?.add('comm-section-container');
        if (typeof window === 'undefined' /* __lwr_isServer__ */) {
          this.setComputedCssVariables();
        }
        this.setResponsivePropertiesFallbackCssVariables();
      }
      renderedCallback() {
        this.setComputedCssVariables();
      }

      /**
       * Set fallback css variables for responsive properties when responsive css variables are unavailable
       * (e.g ExperienceScreenResponsive org perm is disabled)
       */
      setResponsivePropertiesFallbackCssVariables() {
        const styles = [];
        if (this.sectionVerticalAlign) {
          styles.push(`--dxp-c-section-vertical-align: ${this.sectionVerticalAlign};`);
        }
        if (this.maxContentWidth) {
          styles.push(`--dxp-c-max-content-width: ${this.maxContentWidth};`);
        }
        if (styles.length > 0) {
          this.setStyleAttribute(styles.join(' '));
        }
      }
      setComputedCssVariables() {
        if (this.backgroundImageConfig && this._desktopBackgroundImageUrl && this._tabletBackgroundImageUrl && this._mobileBackgroundImageUrl) {
          const {
            bgPosition,
            bgSizeOrRepeat
          } = this.backgroundImageConfig;
          const computedCssVariables = common.propertySet({
            '--dxp-c-l-section-image-url': common.toCssUrl(encodeURI(this._desktopBackgroundImageUrl)),
            '--dxp-c-m-section-image-url': common.toCssUrl(encodeURI(this._tabletBackgroundImageUrl)),
            '--dxp-c-s-section-image-url': common.toCssUrl(encodeURI(this._mobileBackgroundImageUrl)),
            '--dxp-c-section-image-position': bgPosition,
            '--dxp-c-section-image-size-and-repeat': bgSizeOrRepeat,
            '--dxp-c-section-image-overlay-color': this.backgroundImageOverlay
          }).toString();
          this.setStyleAttribute(computedCssVariables);
        }
      }
      setStyleAttribute(style) {
        // the browser may not include the trailing semicolon in the element style
        // attribute value. adding the semicolon when necessary until we can access
        // this.style (https://github.com/salesforce/lwc/issues/3999) and set the
        // individual properties instead.
        const initialStyle = this.getAttribute('style') || '';
        this.setAttribute('style', `${initialStyle}${!initialStyle || initialStyle.endsWith(';') ? '' : ';'}${style}`);
      }
      /*LWC compiler v7.1.5*/
    }
    Section.renderMode = 'light';
    lwc.registerDecorators(Section, {
      publicProps: {
        sectionConfig: {
          config: 0
        },
        maxContentWidth: {
          config: 0
        },
        sectionColumnGutterWidth: {
          config: 0
        },
        componentSpacerSize: {
          config: 0
        },
        sectionMinHeight: {
          config: 0
        },
        layoutDirectionDesktop: {
          config: 0
        },
        layoutDirectionTablet: {
          config: 0
        },
        layoutDirectionMobile: {
          config: 0
        },
        sectionVerticalAlign: {
          config: 0
        },
        backgroundImageConfig: {
          config: 3
        },
        backgroundImageOverlay: {
          config: 0
        }
      },
      fields: ["_imageAltText", "_desktopBackgroundImageUrl", "_tabletBackgroundImageUrl", "_mobileBackgroundImageUrl"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(Section, {
      tmpl: _tmpl,
      sel: "community_layout-section",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('community_layout/column', ['exports', 'lwc'], (function (exports, lwc) {

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("." + token) : "";
      var hostSelector = token ? ("." + token + "-host") : "";
      return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: flex;}.column-content" + shadowSelector + " {display: flex;flex-direction: column;flex: 1;min-width: 0;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_1-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_1-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_1-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_1-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_1-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_1-of-12 {")) + "flex-grow: 1;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_2-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_2-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_2-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_2-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_2-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_2-of-12 {")) + "flex-grow: 2;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_3-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_3-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_3-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_3-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_3-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_3-of-12 {")) + "flex-grow: 3;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_4-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_4-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_4-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_4-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_4-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_4-of-12 {")) + "flex-grow: 4;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_5-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_5-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_5-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_5-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_5-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_5-of-12 {")) + "flex-grow: 5;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_6-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_6-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_6-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_6-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_6-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_6-of-12 {")) + "flex-grow: 6;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_7-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_7-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_7-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_7-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_7-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_7-of-12 {")) + "flex-grow: 7;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_8-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_8-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_8-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_8-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_8-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_8-of-12 {")) + "flex-grow: 8;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_9-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_9-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_9-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_9-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_9-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_9-of-12 {")) + "flex-grow: 9;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_10-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_10-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_10-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_10-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_10-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_10-of-12 {")) + "flex-grow: 10;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'].col-large-size_11-of-12,:host[data-layout-direction~='tablet-direction-row'].col-large-size_11-of-12,:host[data-layout-direction~='mobile-direction-row'].col-large-size_11-of-12 {" : hostSelector + "[data-layout-direction~='desktop-direction-row'].col-large-size_11-of-12," + hostSelector + "[data-layout-direction~='tablet-direction-row'].col-large-size_11-of-12," + hostSelector + "[data-layout-direction~='mobile-direction-row'].col-large-size_11-of-12 {")) + "flex-grow: 11;}@media only screen and (min-width: 64.0625em) {" + ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "padding: var(--dxp-c-column-container-spacing-block-start)\n var(--dxp-c-column-container-spacing-inline-end)\n var(--dxp-c-column-container-spacing-block-end)\n var(--dxp-c-column-container-spacing-inline-start);}.column-content" + shadowSelector + " {padding: var(--dxp-c-column-content-spacing-block-start)\n var(--dxp-c-column-content-spacing-inline-end)\n var(--dxp-c-column-content-spacing-block-end)\n var(--dxp-c-column-content-spacing-inline-start);justify-content: var(--dxp-c-l-section-vertical-align, var(--dxp-c-section-vertical-align));}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-row'] {" : hostSelector + "[data-layout-direction~='desktop-direction-row'] {")) + "--sectionSpacerWidth: var(\n --dxp-c-column-spacer-size,\n var(--dxp-c-l-section-column-gutter-width, var(--dxp-s-column-spacer-size))\n );flex: 1;min-width: 0;}" + ((useActualHostSelector ? ":host[data-layout-direction~='desktop-direction-column'] {" : hostSelector + "[data-layout-direction~='desktop-direction-column'] {")) + "--sectionSpacerHeight: var(\n --dxp-c-column-spacer-size,\n var(--dxp-c-l-section-column-gutter-width, var(--dxp-s-column-spacer-size))\n );flex: 0;min-height: 0;}}@media only screen and (min-width: 48em) and (max-width: 64em) {" + ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "padding: var(--dxp-c-column-container-spacing-block-start-mobile)\n var(--dxp-c-column-container-spacing-inline-end-mobile)\n var(--dxp-c-column-container-spacing-block-end-mobile)\n var(--dxp-c-column-container-spacing-inline-start-mobile);}.column-content" + shadowSelector + " {padding: var(--dxp-c-column-content-spacing-block-start-mobile)\n var(--dxp-c-column-content-spacing-inline-end-mobile)\n var(--dxp-c-column-content-spacing-block-end-mobile)\n var(--dxp-c-column-content-spacing-inline-start-mobile);justify-content: var(--dxp-c-m-section-vertical-align, var(--dxp-c-section-vertical-align));}" + ((useActualHostSelector ? ":host[data-layout-direction~='tablet-direction-row'] {" : hostSelector + "[data-layout-direction~='tablet-direction-row'] {")) + "--sectionSpacerWidth: var(\n --dxp-c-column-spacer-size-tablet,\n var(--dxp-c-m-section-column-gutter-width, var(--dxp-s-column-spacer-size-mobile))\n );flex: 1;min-width: 0;}" + ((useActualHostSelector ? ":host[data-layout-direction~='tablet-direction-column'] {" : hostSelector + "[data-layout-direction~='tablet-direction-column'] {")) + "--sectionSpacerHeight: var(\n --dxp-c-column-spacer-size-tablet,\n var(--dxp-c-m-section-column-gutter-width, var(--dxp-s-column-spacer-size-mobile))\n );flex: 0;min-height: 0;}}@media only screen and (max-width: 47.9375em) {" + ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "padding: var(--dxp-c-column-container-spacing-block-start-mobile)\n var(--dxp-c-column-container-spacing-inline-end-mobile)\n var(--dxp-c-column-container-spacing-block-end-mobile)\n var(--dxp-c-column-container-spacing-inline-start-mobile);}.column-content" + shadowSelector + " {padding: var(--dxp-c-column-content-spacing-block-start-mobile)\n var(--dxp-c-column-content-spacing-inline-end-mobile)\n var(--dxp-c-column-content-spacing-block-end-mobile)\n var(--dxp-c-column-content-spacing-inline-start-mobile);justify-content: var(--dxp-c-s-section-vertical-align, var(--dxp-c-section-vertical-align));}" + ((useActualHostSelector ? ":host[data-layout-direction~='mobile-direction-row'] {" : hostSelector + "[data-layout-direction~='mobile-direction-row'] {")) + "--sectionSpacerWidth: var(\n --dxp-c-column-spacer-size-mobile,\n var(--dxp-c-s-section-column-gutter-width, var(--dxp-s-column-spacer-size-mobile))\n );flex: 1;min-width: 0;}" + ((useActualHostSelector ? ":host[data-layout-direction~='mobile-direction-column'] {" : hostSelector + "[data-layout-direction~='mobile-direction-column'] {")) + "--sectionSpacerHeight: var(\n --dxp-c-column-spacer-size-mobile,\n var(--dxp-c-s-section-column-gutter-width, var(--dxp-s-column-spacer-size-mobile))\n );flex: 0;min-height: 0;}}";
      /*LWC compiler v7.1.5*/
    }
    stylesheet.$scoped$ = true;
    var _implicitScopedStylesheets = [stylesheet];

    const stc0 = {
      classMap: {
        "column-content": true
      },
      key: 0
    };
    const stc1 = {
      attrs: {
        "name": "column"
      },
      key: 1
    };
    const stc2 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {s: api_slot, h: api_element} = $api;
      return [api_element("div", stc0, [api_slot("column", stc1, stc2, $slotset)])];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = ["column"];
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-48aostf02bd";
    tmpl.legacyStylesheetToken = "community_layout-column_column";
    if (_implicitScopedStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    /**
     * This comment is important, if it doesn't exist the slot will not be accessible in the ModuleDef,
     * see https://gus.lightning.force.com/lightning/r/0D5B000000moNnZ/view
     * @slot column a place for content within a column slot
     */
    // import { getMinSize, isHorizontalLayout, isVerticalLayout } from './utils';

    const DEFAULT_WIDTH = 12;
    const DEFAULT_COUNT = 1;
    const FULL_WIDTH = 'col-size_12-of-12';
    class Column extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._columnWidth = DEFAULT_WIDTH;
        this._columnCount = DEFAULT_COUNT;
      }
      /**
       * A unit of width ranging from 1 to 12 used to set the appropriate column style.
       */
      get columnWidth() {
        return this._columnWidth;
      }
      set columnWidth(newWidth) {
        this._columnWidth = newWidth;
        this.updateHostCssClasses();
      }

      /**
       * The total number of columns within the same section. This is useful when calculating how much width the spacers
       * in a section are taking up.
       */
      get columnCount() {
        return this._columnCount;
      }
      set columnCount(newCount) {
        this._columnCount = newCount;
      }
      connectedCallback() {
        this.updateHostCssClasses();
      }

      /**
       * Sets the host css. Required at the host level so that it has a width relative to its container (section).
       */
      updateHostCssClasses() {
        // We technically don't need these classes anymore but it seems safer to leave them for now in case site
        // authors are relying on them in their custom css.
        //
        // We previously had css classes that targeted form factors and the row flow-direction before assigning width.
        // The reason we could remove them is that when we use flex-direction column we're not assigning a height or
        // min-height to the container. That means the container only takes up the space needed by the content and
        // there's no room for the columns to grow so our style settings below are a no-op.
        //
        // The nice thing is if we ever start supporting a min-height in flex-direction column mode, everything will
        // distribute as specified in column distribution in the vertical direction!
        //
        // TODO: These classes are required again until we are able to get the host CSSStyleDeclaration during
        // connectedCallback using this.style after https://github.com/salesforce/lwc/issues/3999 is fixed. Currently,
        // this can only be accessed using the getComputedStyle(host.children[0].parentElement, null) workaround
        // after the component has been rendered. So, we're not able to get the correct flex-direction for the
        // current form factor when the component is server-side rendered.
        const updatedClassList = [FULL_WIDTH, this.colWidthClass];
        this.classList?.remove(...Array.from(this.classList).filter(clazz => clazz?.startsWith('col-large-size_')));
        this.classList?.add(...updatedClassList);
      }

      // updateHostStyle() {
      //     // We need to define how much the column can shrink which is needed for narrow screens and for flex to be able
      //     // to distribute space amongst the columns.
      //     const minSize = getMinSize(this.columnWidth, this.columnCount);

      //     const style = [];
      //     if (isHorizontalLayout()) {
      //         // The flex-grow value works well as the column width because we're using the 12 column span layout. If we have
      //         // 5 columns where one of them needs to be double the width of the others that follows naturally from the
      //         // given columnWidth values:
      //         // | 2 | 2 | 4 | 2 | 2 |
      //         //
      //         // The columns with flex-grow 2 will all be sized the same while the column with flex-grow 4 will be double the
      //         // size of the others.
      //         style.push(`flex-grow: ${this.columnWidth}`);
      //         if (minSize) {
      //             style.push(`min-width: ${minSize}`);
      //         }
      //     } else if (isVerticalLayout()) {
      //         // We don't want to apply flex-grow to vertical layouts to match existing behavior to be extra safe. If
      //         // the user specifies a min-height for the section, flex-grow will apply to vertical layouts as well.
      //         if (minSize) {
      //             style.push(`min-height: ${minSize}`);
      //         }
      //     }

      //     if (style.length > 0) {
      //         this.setAttribute('style', style.join('; '));
      //     }
      // }

      get colWidthClass() {
        return this.columnWidth ? `col-large-size_${this.columnWidth}-of-12` : 'col';
      }
      /*LWC compiler v7.1.5*/
    }
    Column.renderMode = 'light';
    Column.validationOptOut = ['class'];
    lwc.registerDecorators(Column, {
      publicProps: {
        columnWidth: {
          config: 3
        },
        columnCount: {
          config: 3
        }
      },
      fields: ["_columnWidth", "_columnCount"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(Column, {
      tmpl: _tmpl,
      sel: "community_layout-column",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@luvio/runtime', ['force/luvioRuntimeWebruntime'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
(function() { LWR.define('force/luvioRegistry', ['exports', 'lwc'], (function (exports, lwc) {

    /**
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */

    /*  *******************************************************************************************
     *  ATTENTION!
     *  THIS IS A GENERATED FILE FROM https://github.com/salesforce-experience-platform-emu/lds-lightning-platform
     *  If you would like to contribute to LDS, please follow the steps outlined in the git repo.
     *  Any changes made to this file in p4 will be automatically overwritten.
     *  *******************************************************************************************
     */
    /* proxy-compat-disable */
    /**
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */

    /**
     * Callbacks to be invoked when registrations happen.
     */
    const callbacks = [];
    /**
     * Registrations that have already occurred.
     *
     * Note that Registrations are maintained as a list rather than a map to allow
     * the same id to be registered multiple times with potentially different
     * data.
     */
    const registrations = [];
    /**
     * Invokes callback for each Registration, both past & future. That is, callback
     * will be invoked exactly as many times as register() is called.
     *
     * Note that Registration ids are not guaranteed to be unique. The meaning of
     * multiple Registrations with the same id is determined by the caller(s) of
     * register().
     */
    function forEachRegistration(callback) {
      callbacks.push(callback);
      registrations.forEach(r => callback(r));
    }
    /**
     * Invokes callback when the specified id is registered.
     *
     * Note that callback may be invoked:
     *
     *    - multiple times if multiple calls to register() specify the id
     *    - never if the specified id is never registered
     */
    function withRegistration(id, callback) {
      forEachRegistration(r => {
        if (r.id === id) {
          callback(r);
        }
      });
    }
    /**
     * Returns all current Registrations that match the specified id. If no matching
     * Registrations are found, [] is returned.
     */
    function findRegistrations(id) {
      return registrations.filter(r => r.id === id);
    }
    /**
     * Register an id and associated data.
     *
     * Callers of register() should make types available that include:
     *
     *    - the id they will register
     *    - definitions for any additional properties on their Registration objects
     *
     * For example:
     *
     *    export type MyRegistration = {
     *        id: 'myRegistrationId',
     *
     *        // some value that others might need
     *        myValue: string,
     *
     *        // some function that others might want to call
     *        myFunction: () => void,
     *    };
     *    register({ id: 'myRegistrationId', myValue: 'foo', myFunction: () => {} } as MyRegistration);
     *
     * The registry itself does not dictate the format of ids nor attempt to coordinate
     * uniqueness of id values.
     *
     * The same id can be registered multiple times with different Registration
     * objects.
     */
    function register(r) {
      registrations.push(r);
      callbacks.forEach(callback => callback(r));
    }
    // version: 1.278.0-a388a38f0
    const __lwc_hmr_context = { moduleHash : '337e2f351c3b3c0bb447df317317ab3e' };
    if (lwc.hot) {
        lwc.hot.register('force/luvioRegistry/luvioRegistry.js', '337e2f351c3b3c0bb447df317317ab3e', {"name":"luvioRegistry","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.findRegistrations = findRegistrations;
    exports.forEachRegistration = forEachRegistration;
    exports.register = register;
    exports.withRegistration = withRegistration;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@luvio/registry', ['force/luvioRegistry'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
(function() { LWR.define('experience/coercion', ['exports'], (function (exports) {

  function coerceBooleanProperty(value) {
    return value != null && `${value}`.toLowerCase() !== 'false';
  }

  function isNumberValue(value) {
    return !isNaN(parseFloat(String(value))) && !isNaN(Number(value));
  }
  function coerceNumberProperty(value, fallbackValue = 0) {
    return isNumberValue(value) ? Number(value) : fallbackValue;
  }

  function isObjectLike(value) {
    return value != null && typeof value === 'object';
  }
  function isNumber(value) {
    return typeof value === 'number' || isObjectLike(value) && Object.prototype.toString.call(value) === '[object Number]';
  }
  function isNaN$1(value) {
    return isNumber(value) && value !== +value;
  }
  function coerceStringProperty(value, fallbackValue) {
    const stringValue = value == null || isNaN$1(value) ? '' : value.toString();
    return stringValue.length > 0 ? stringValue : fallbackValue;
  }

  exports.coerceBooleanProperty = coerceBooleanProperty;
  exports.coerceNumberProperty = coerceNumberProperty;
  exports.coerceStringProperty = coerceStringProperty;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/serializeError', ['exports', 'lwc'], (function (exports, lwc) {

  var _tmpl = void 0;

  const list = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, globalThis.DOMException, globalThis.AssertionError, globalThis.SystemError].filter(Boolean).map(constructor => [constructor.name, constructor]);
  const errorConstructors = new Map(list);
  const __lwc_component_class_internal = lwc.registerComponent(errorConstructors, {
    tmpl: _tmpl,
    sel: "experience-serialize-error",
    apiVersion: 62
  });

  class NonError extends Error {
    constructor(message) {
      super(NonError._prepareSuperMessage(message));
      this.name = 'NonError';
    }
    static _prepareSuperMessage(message) {
      try {
        return JSON.stringify(message);
      } catch {
        return String(message);
      }
    }
    /*LWC compiler v7.1.5*/
  }
  lwc.registerDecorators(NonError, {
    fields: ["name"]
  });
  const commonProperties = [{
    property: 'name',
    enumerable: false
  }, {
    property: 'message',
    enumerable: false
  }, {
    property: 'stack',
    enumerable: false
  }, {
    property: 'code',
    enumerable: true
  }, {
    property: 'cause',
    enumerable: false
  }];
  const toJsonWasCalled = Symbol('.toJSON was called');
  const toJSON = from => {
    from[toJsonWasCalled] = true;
    const json = from.toJSON();
    delete from[toJsonWasCalled];
    return json;
  };
  const getErrorConstructor = name => __lwc_component_class_internal.get(name) ?? Error;
  const destroyCircular = ({
    from,
    seen,
    to,
    forceEnumerable,
    maxDepth,
    depth,
    useToJSON,
    serialize
  }) => {
    if (!to) {
      if (Array.isArray(from)) {
        to = [];
      } else if (!serialize && isErrorLike(from)) {
        const Error = getErrorConstructor(from.name);
        to = new Error();
      } else {
        to = {};
      }
    }
    seen.push(from);
    if (depth >= maxDepth) {
      return to;
    }
    if (useToJSON && typeof from.toJSON === 'function' && from[toJsonWasCalled] !== true) {
      return toJSON(from);
    }
    const continueDestroyCircular = value => destroyCircular({
      from: value,
      seen: [...seen],
      forceEnumerable,
      maxDepth,
      depth,
      useToJSON,
      serialize
    });
    for (const [key, value] of Object.entries(from)) {
      if (typeof Buffer === 'function' && Buffer.isBuffer(value)) {
        to[key] = '[object Buffer]';
        continue;
      }
      if (value !== null && typeof value === 'object' && typeof value.pipe === 'function') {
        to[key] = '[object Stream]';
        continue;
      }
      if (typeof value === 'function') {
        continue;
      }
      if (!value || typeof value !== 'object') {
        to[key] = value;
        continue;
      }
      if (!seen.includes(from[key])) {
        depth++;
        to[key] = continueDestroyCircular(from[key]);
        continue;
      }
      to[key] = '[Circular]';
    }
    for (const {
      property,
      enumerable
    } of commonProperties) {
      if (typeof from[property] !== 'undefined' && from[property] !== null) {
        Object.defineProperty(to, property, {
          value: isErrorLike(from[property]) ? continueDestroyCircular(from[property]) : from[property],
          enumerable: forceEnumerable ? true : enumerable,
          configurable: true,
          writable: true
        });
      }
    }
    return to;
  };
  function serializeError(value, options = {}) {
    const {
      maxDepth = Number.POSITIVE_INFINITY,
      useToJSON = true
    } = options;
    if (typeof value === 'object' && value !== null) {
      return destroyCircular({
        from: value,
        seen: [],
        forceEnumerable: true,
        maxDepth,
        depth: 0,
        useToJSON,
        serialize: true
      });
    }
    if (typeof value === 'function') {
      return `[Function: ${value.name ?? 'anonymous'}]`;
    }
    return value;
  }
  function deserializeError(value, options = {}) {
    const {
      maxDepth = Number.POSITIVE_INFINITY
    } = options;
    if (value instanceof Error) {
      return value;
    }
    if (isMinimumViableSerializedError(value)) {
      const Error = getErrorConstructor(value.name);
      return destroyCircular({
        from: value,
        seen: [],
        to: new Error(),
        maxDepth,
        depth: 0,
        serialize: false
      });
    }
    return new NonError(value);
  }
  function isErrorLike(value) {
    return Boolean(value) && typeof value === 'object' && 'name' in value && 'message' in value && 'stack' in value;
  }
  function isMinimumViableSerializedError(value) {
    return Boolean(value) && typeof value === 'object' && 'message' in value && !Array.isArray(value);
  }

  function registerErrorConstructor(type, ctor) {
    __lwc_component_class_internal.set(type, ctor);
  }

  exports.deserializeError = deserializeError;
  exports.registerErrorConstructor = registerErrorConstructor;
  exports.serializeError = serializeError;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/utils', ['exports', 'experience/utilsInternal'], (function (exports, utilsInternal) {



	Object.defineProperty(exports, 'clearDebounceTimeout', {
		enumerable: true,
		get: function () { return utilsInternal.clearDebounceTimeout; }
	});
	Object.defineProperty(exports, 'debounce', {
		enumerable: true,
		get: function () { return utilsInternal.debounce; }
	});
	Object.defineProperty(exports, 'empty', {
		enumerable: true,
		get: function () { return utilsInternal.empty; }
	});
	Object.defineProperty(exports, 'extendDebouncedTimeout', {
		enumerable: true,
		get: function () { return utilsInternal.extendDebouncedTimeout; }
	});
	Object.defineProperty(exports, 'get', {
		enumerable: true,
		get: function () { return utilsInternal.get; }
	});
	Object.defineProperty(exports, 'getObjectTag', {
		enumerable: true,
		get: function () { return utilsInternal.getObjectTag; }
	});
	Object.defineProperty(exports, 'isBlank', {
		enumerable: true,
		get: function () { return utilsInternal.isBlank; }
	});
	Object.defineProperty(exports, 'isFunction', {
		enumerable: true,
		get: function () { return utilsInternal.isFunction; }
	});
	Object.defineProperty(exports, 'isInteger', {
		enumerable: true,
		get: function () { return utilsInternal.isInteger; }
	});
	Object.defineProperty(exports, 'isNil', {
		enumerable: true,
		get: function () { return utilsInternal.isNil; }
	});
	Object.defineProperty(exports, 'isObject', {
		enumerable: true,
		get: function () { return utilsInternal.isObject; }
	});
	Object.defineProperty(exports, 'isObjectLike', {
		enumerable: true,
		get: function () { return utilsInternal.isObjectLike; }
	});
	Object.defineProperty(exports, 'isPlainObject', {
		enumerable: true,
		get: function () { return utilsInternal.isPlainObject; }
	});
	Object.defineProperty(exports, 'isPromiseLike', {
		enumerable: true,
		get: function () { return utilsInternal.isPromiseLike; }
	});

	Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/data', ['exports', 'experience/utils', 'lwc', 'experience/coercion', 'experience/serializeError', 'transport', 'experience/uri'], (function (exports, utils, lwc, coercion, serializeError, transport, uri) {

  const DEFAULT_ABORT_REASON = 'Aborted';
  class AbortError extends Error {
    constructor(message) {
      super(coercion.coerceStringProperty(message, DEFAULT_ABORT_REASON));
      this.name = 'AbortError';
    }
    /*LWC compiler v7.1.5*/
  }
  lwc.registerDecorators(AbortError, {
    fields: ["name"]
  });
  serializeError.registerErrorConstructor('AbortError', AbortError);

  const ABORT = Symbol('abort');
  const ABORT_SIGNAL = Symbol('abortSignal');
  const ABORTERS = new WeakMap();
  class AbortablePromise extends Promise {
    static from(promise) {
      if (promise instanceof AbortablePromise) {
        return promise;
      } else if (promise instanceof Promise || typeof promise.catch === 'function') {
        return new AbortablePromise((resolve, reject) => promise.then(resolve).catch(reject));
      }
      return new AbortablePromise((resolve, reject) => promise.then(resolve, reject));
    }
    static connect(parent, child) {
      const parentEntry = ABORTERS.get(parent);
      const childEntry = ABORTERS.get(child);
      const {
        controller: parentController
      } = parentEntry;
      const {
        controller: childController
      } = childEntry;
      const {
        signal: parentSignal
      } = parentController;
      const {
        signal: childSignal
      } = childController;
      if (parentSignal === childSignal) {
        return;
      }
      childEntry.parent = parentEntry;
      const ensureReason = (receiver, donor) => {
        !receiver.reason && (receiver.reason = donor.reason);
      };
      if (childSignal.aborted && !parentSignal.aborted) {
        ensureReason(parentEntry, childEntry);
        parentController.abort();
      } else if (parentSignal.aborted && !childSignal.aborted) {
        ensureReason(childEntry, parentEntry);
        childController.abort();
      } else {
        const parentHandler = () => {
          childSignal.removeEventListener('abort', parentHandler);
          if (!childSignal.aborted) {
            ensureReason(childEntry, parentEntry);
            childController.abort();
          }
        };
        const childHandler = () => {
          childSignal.removeEventListener('abort', childHandler);
          if (!parentSignal.aborted) {
            ensureReason(parentEntry, childEntry);
            parentController.abort();
          }
        };
        parentSignal.addEventListener('abort', parentHandler);
        childSignal.addEventListener('abort', childHandler);
      }
    }
    constructor(executor) {
      const abortController = new AbortController();
      const {
        signal
      } = abortController;
      let isFulfilled = false;
      const aborter = reason => {
        ABORTERS.get(this).reason = reason || DEFAULT_ABORT_REASON;
        abortController.abort();
      };
      super((resolve, reject) => {
        const resolver = value => {
          !isFulfilled && !signal.aborted && resolve(value);
          isFulfilled = true;
        };
        const rejector = reason => {
          !isFulfilled && !signal.aborted && reject(reason);
          isFulfilled = true;
        };
        const abortHandler = () => {
          signal.removeEventListener('abort', abortHandler);
          const abortEntry = ABORTERS.get(this);
          let isHandled = !!abortEntry.isHandled;
          let parentAbortEntry = abortEntry.parent;
          while (parentAbortEntry) {
            isHandled = isHandled || !!parentAbortEntry.isHandled;
            parentAbortEntry = parentAbortEntry.parent;
          }
          abortEntry.isHandled = true;
          if (!isFulfilled && !isHandled) {
            isFulfilled = true;
            const abortReason = abortEntry.reason;
            reject(new AbortError(abortReason instanceof Error ? abortReason.message : abortReason));
          }
        };
        signal.addEventListener('abort', abortHandler);
        executor(resolver, rejector, aborter, signal);
      });
      this[ABORT] = void 0;
      this[ABORT_SIGNAL] = void 0;
      ABORTERS.set(this, {
        controller: abortController
      });
      this[ABORT] = aborter.bind(null);
      this[ABORT_SIGNAL] = signal;
    }
    _wrapHandler(handler) {
      if (!utils.isFunction(handler)) {
        return handler;
      }
      return result => {
        let handlerResult = handler(result);
        if (handlerResult instanceof AbortablePromise) {
          AbortablePromise.connect(this, handlerResult);
        } else if (handlerResult instanceof Promise) {
          const abortableResult = handlerResult = AbortablePromise.from(handlerResult);
          AbortablePromise.connect(this, abortableResult);
        }
        if (this[ABORT_SIGNAL].aborted) {
          const abortReason = ABORTERS.get(this).reason;
          throw new AbortError(abortReason instanceof Error ? abortReason.message : abortReason);
        }
        return handlerResult;
      };
    }
    then(onFulfilled, onRejected) {
      const child = AbortablePromise.from(super.then(this._wrapHandler(onFulfilled), this._wrapHandler(onRejected)));
      AbortablePromise.connect(this, child);
      return child;
    }
    catch(onRejected) {
      const child = AbortablePromise.from(super.catch(this._wrapHandler(onRejected)));
      AbortablePromise.connect(this, child);
      return child;
    }
    finally(onFinally) {
      const child = AbortablePromise.from(super.finally(this._wrapHandler(onFinally)));
      AbortablePromise.connect(this, child);
      return child;
    }
    /*LWC compiler v7.1.5*/
  }

  class FetchResponse {
    constructor(response, data) {
      this.response = response;
      this.data = data;
    }
  }
  function isFetchResponse(value) {
    return value instanceof FetchResponse;
  }
  function createFetchResponse(response, data) {
    const result = new FetchResponse(response, data);
    Object.freeze(result);
    return result;
  }

  const RESPONSE_TYPES_OPAQUE = ['opaque', 'opaqueredirect'];
  async function defaultHandleResponse(response) {
    const [resp, data] = isFetchResponse(response) ? [response.response, response.data] : [response, response];
    if (resp instanceof Response && !resp.ok && !RESPONSE_TYPES_OPAQUE.includes(resp.type)) {
      throw await data;
    }
    return data;
  }
  function execute(url, requestInit, signal) {
    let effectiveRequestInit = {
      ...requestInit
    };
    delete effectiveRequestInit.interceptRequest;
    delete effectiveRequestInit.interceptResponse;
    let handleResponse = defaultHandleResponse;
    if (requestInit && utils.isFunction(requestInit.interceptResponse)) {
      const {
        interceptResponse
      } = requestInit;
      handleResponse = response => {
        const interceptorResult = interceptResponse(response, url, effectiveRequestInit);
        if (utils.isPromiseLike(interceptorResult)) {
          return Promise.resolve(interceptorResult).then(defaultHandleResponse);
        }
        return defaultHandleResponse(interceptorResult);
      };
    }
    const executeRequest = ({
      url: _url,
      requestInit: _reqInit
    } = {}) => {
      if (_reqInit && typeof _reqInit === 'object') {
        effectiveRequestInit = {
          ..._reqInit,
          signal
        };
        delete effectiveRequestInit.interceptRequest;
        delete effectiveRequestInit.interceptResponse;
      }
      return transport.fetch(_url || url, effectiveRequestInit).then(handleResponse);
    };
    if (requestInit && utils.isFunction(requestInit.interceptRequest)) {
      const {
        interceptRequest
      } = requestInit;
      const interceptorResult = interceptRequest(url, effectiveRequestInit);
      if (utils.isPromiseLike(interceptorResult)) {
        return Promise.resolve(interceptorResult).then(executeRequest);
      }
      return executeRequest(interceptorResult);
    }
    return executeRequest();
  }
  function fetchAbortable(executor) {
    let resolve;
    let reject;
    let abort;
    let signal;
    const mainPromise = new AbortablePromise((_resolve, _reject, _abort, _signal) => {
      resolve = _resolve;
      reject = _reject;
      abort = _abort;
      signal = _signal;
    });
    let isAborted = false;
    signal.addEventListener('abort', () => isAborted = true);
    const fetcher = (requestInfo, requestInit) => {
      const isRequest = requestInfo instanceof Request;
      const init = requestInit && typeof requestInit === 'object' ? {
        ...requestInit,
        signal
      } : {
        signal
      };
      const reqInit = isRequest ? {
        ...requestInfo.clone(),
        ...init
      } : init;
      const url = isRequest ? requestInfo.url : requestInfo;
      if (!isAborted) {
        execute(url, reqInit, signal).then(_r => !isAborted && resolve(_r)).catch(reason => !isAborted && reject(reason));
      }
      return mainPromise;
    };
    executor(fetcher, abort, signal);
    return mainPromise;
  }

  const defaultRequestInterceptor = (url, requestInit) => {
    return {
      url,
      requestInit: {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        ...(requestInit && typeof requestInit === 'object' ? requestInit : {})
      }
    };
  };
  function createResponseInterceptor(obtainData) {
    return (response, _url, _requestInit) => {
      if (response instanceof Response) {
        const {
          headers,
          status
        } = response;
        const contentType = headers.get('content-type');
        if (typeof contentType === 'string' && contentType.includes('application/json')) {
          const contentLength = headers.has('content-length') && headers.get('transfer-encoding') !== 'chunked' ? Number(headers.get('content-length')) : -1;
          if (status === 204 || contentLength === 0) {
            return null;
          }
          const effectiveData = obtainData(response, _url, _requestInit);
          return createFetchResponse(response, effectiveData);
        }
      }
      return response;
    };
  }
  const defaultResponseInterceptor = createResponseInterceptor(response => response.ok ? response.json() : response);
  function prepareRequestInit(requestInit) {
    const reqInit = requestInit && typeof requestInit === 'object' ? {
      ...requestInit
    } : {};
    if (!utils.isFunction(reqInit.interceptRequest)) {
      reqInit.interceptRequest = defaultRequestInterceptor;
    }
    if (!utils.isFunction(reqInit.interceptResponse)) {
      reqInit.interceptResponse = defaultResponseInterceptor;
    }
    return reqInit;
  }
  function fetchService(executorOrRequestInfo, requestInit) {
    return fetchAbortable((fetch, abort, signal) => {
      if (typeof executorOrRequestInfo === 'function') {
        const fetcher = (reqInfo, reqInit) => fetch(reqInfo, prepareRequestInit(reqInit));
        executorOrRequestInfo(fetcher, abort, signal);
      } else {
        fetch(executorOrRequestInfo, prepareRequestInit(requestInit));
      }
    });
  }

  function verifyType(prop, type = 'string') {
    return prop === null || (type === 'array' ? typeof prop === 'undefined' || Array.isArray(prop) : ['undefined', type].includes(typeof prop));
  }
  function isFetchErrorResponse(value) {
    return value !== null && typeof value === 'object' && Reflect.has(value, 'message') && Reflect.has(value, 'type') && verifyType(value?.message) && verifyType(value?.type) && verifyType(value?.arguments, 'object');
  }
  function isFetchErrorData(value) {
    return value !== null && typeof value === 'object' && Reflect.has(value, 'status') && Reflect.has(value, 'errors') && verifyType(value?.status, 'number') && verifyType(value?.errors, 'array');
  }
  function normalizeArguments(args) {
    if (args) {
      return Reflect.ownKeys(args).reduce((acc, key) => {
        typeof key === 'string' && Reflect.set(acc, key, Reflect.get(args, key));
        return acc;
      }, {});
    }
    return {};
  }
  function toFetchErrorResponse$1({
    message,
    type,
    arguments: args
  }) {
    return {
      message: message ?? '',
      type: type ?? '',
      arguments: normalizeArguments(args)
    };
  }
  function normalizeErrors(value) {
    if (Array.isArray(value)) {
      return value.reduce((acc, element) => {
        if (isFetchErrorResponse(element)) {
          acc.push(toFetchErrorResponse$1(element));
        }
        return acc;
      }, []);
    } else if (isFetchErrorResponse(value)) {
      return [toFetchErrorResponse$1(value)];
    }
    return [];
  }
  function normalizeMessage(errors) {
    return errors.find(error => error.message.length > 0)?.message ?? '';
  }
  function normalizeData(value) {
    if (isFetchErrorData(value)) {
      const {
        status,
        errors
      } = value;
      return {
        status: status ?? null,
        errors: normalizeErrors(errors)
      };
    }
    return {
      status: null,
      errors: normalizeErrors(value)
    };
  }
  class FetchError extends Error {
    constructor(data) {
      super();
      this.name = 'FetchError';
      this.errors = [];
      this.status = null;
      let {
        status,
        errors
      } = normalizeData(data);
      this.status = status;
      this.errors = errors;
      this.message = normalizeMessage(errors);
      Object.defineProperty(this, 'errors', {
        enumerable: true,
        configurable: false,
        get: () => errors,
        set(v) {
          errors = normalizeErrors(v);
          this.message = normalizeMessage(errors);
        }
      });
      Object.defineProperty(this, 'status', {
        enumerable: true,
        configurable: false,
        get: () => status,
        set(v) {
          status = typeof v === 'number' ? v : null;
        }
      });
    }
    /*LWC compiler v7.1.5*/
  }
  lwc.registerDecorators(FetchError, {
    fields: ["name", "errors", "status"]
  });
  serializeError.registerErrorConstructor('FetchError', FetchError);

  function isConnectApiErrorResponse(value) {
    function verifyType(prop) {
      return typeof prop === 'string' || typeof prop === 'undefined' || prop === null;
    }
    return value !== null && typeof value === 'object' && Reflect.has(value, 'message') && Reflect.has(value, 'errorCode') && verifyType(value?.message) && verifyType(value?.errorCode);
  }
  function extractArguments(requestInit) {
    function filterStringEntries(it) {
      const acc = {};
      for (const [key, value] of it) {
        if (typeof value === 'string') {
          acc[key] = value;
        }
      }
      return acc;
    }
    if (requestInit && typeof requestInit === 'object' && (Reflect.has(requestInit, 'url') || Reflect.has(requestInit, 'body'))) {
      const {
        url: urlString = '',
        body
      } = requestInit;
      const acc = body instanceof URLSearchParams ? Object.fromEntries(body.entries()) : body instanceof FormData ? filterStringEntries(body.entries()) : {};
      try {
        const {
          searchParams
        } = new URL(urlString);
        return {
          ...acc,
          ...Object.fromEntries(searchParams.entries())
        };
      } catch {
        return acc;
      }
    }
    return {};
  }
  function toFetchErrorResponse({
    message,
    errorCode
  }, requestInit) {
    return {
      type: errorCode ?? '',
      message: message ?? '',
      arguments: extractArguments(requestInit)
    };
  }
  function transformConnectApiErrorResponse(value, requestInit) {
    if (Array.isArray(value)) {
      return value.reduce((acc, element) => {
        if (isConnectApiErrorResponse(element)) {
          acc.push(toFetchErrorResponse(element, requestInit));
        }
        return acc;
      }, []);
    } else if (isConnectApiErrorResponse(value)) {
      return [toFetchErrorResponse(value, requestInit)];
    }
    return [];
  }
  const connectApiResponseInterceptor = createResponseInterceptor((response, url, requestInit) => {
    return response.ok ? response.json() : response.json().then(errors => {
      throw new FetchError({
        status: response.status,
        errors: transformConnectApiErrorResponse(errors, {
          ...requestInit,
          url
        })
      });
    });
  });

  Object.defineProperty(exports, 'composeQueryString', {
    enumerable: true,
    get: function () { return uri.composeQueryString; }
  });
  Object.defineProperty(exports, 'composeUri', {
    enumerable: true,
    get: function () { return uri.composeUri; }
  });
  exports.ABORT = ABORT;
  exports.ABORT_SIGNAL = ABORT_SIGNAL;
  exports.AbortError = AbortError;
  exports.AbortablePromise = AbortablePromise;
  exports.FetchError = FetchError;
  exports.connectApiResponseInterceptor = connectApiResponseInterceptor;
  exports.createFetchResponse = createFetchResponse;
  exports.createResponseInterceptor = createResponseInterceptor;
  exports.defaultRequestInterceptor = defaultRequestInterceptor;
  exports.defaultResponseInterceptor = defaultResponseInterceptor;
  exports.fetchAbortable = fetchAbortable;
  exports.fetchService = fetchService;
  exports.transformConnectApiErrorResponse = transformConnectApiErrorResponse;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/store', ['exports', 'experience/utils', 'experience/utilsInternal', '@luvio/runtime', '@luvio/registry', 'experience/serializeError', 'lwc', 'experience/data'], (function (exports, utils, utilsInternal, runtime, registry, serializeError$1, lwc, data) {

  const INSTANCES = new Map();
  const ACTIONS_TO_INSTANCES = new Map();
  const LOADING_PROMISES = new Map();
  const CONNECTED_ADAPTER_PATHS = {};
  const ADAPTERS_DEBOUNCE = new WeakMap();
  const ADAPTERS_DEBOUNCING = new Map();
  const ADAPTERS_SSR_PERMITTED = new WeakMap();
  const CACHE_TTL = 300;

  const STORE_KEY = 'experience::ɵɵStore';
  const STORE_KEY_META = 'experience::ɵɵMeta';
  const META_KEY_ERRORS = 'ɵɵErrors';
  const commandRuntimeStore = new runtime.InMemoryStore();
  commandRuntimeStore.set(STORE_KEY, {});
  commandRuntimeStore.set(STORE_KEY_META, {});
  let effectiveStore = commandRuntimeStore;
  function getState() {
    return effectiveStore.get(STORE_KEY);
  }
  function getMeta() {
    return effectiveStore.get(STORE_KEY_META);
  }
  function getStateValue(key) {
    return Reflect.get(getState(), key);
  }
  function setStateValue(key, value) {
    const state = getState();
    Reflect.set(state, key, value);
    effectiveStore.set(STORE_KEY, state);
  }
  function getMetaValue(key) {
    return Reflect.get(getMeta(), key);
  }
  function setMetaValue(key, value) {
    const meta = getMeta();
    Reflect.set(meta, key, value);
    effectiveStore.set(STORE_KEY_META, meta);
  }
  function hasErrorProp(storeName, prop, ...props) {
    const path = JSON.stringify([storeName, prop, ...props]);
    const entries = getMeta();
    return Reflect.has(entries, META_KEY_ERRORS) && entries[META_KEY_ERRORS][path] === true;
  }
  function addErrorProp(storeName, prop, ...props) {
    const path = JSON.stringify([storeName, prop, ...props]);
    const entries = getMeta();
    !Reflect.has(entries, META_KEY_ERRORS) && (entries[META_KEY_ERRORS] = {});
    entries[META_KEY_ERRORS][path] = true;
  }
  function deleteErrorProp(storeName, prop, ...props) {
    const path = JSON.stringify([storeName, prop, ...props]);
    const entries = getMeta();
    delete entries[META_KEY_ERRORS]?.[path];
  }
  function set(obj, path, value) {
    path.reduce((acc, key, i) => {
      if (i === path.length - 1) {
        acc[key] = value;
      } else if (!Reflect.has(acc, key)) {
        acc[key] = {};
      } else if (typeof acc[key] === 'object' && acc[key] !== null) {
        acc[key] = {
          ...acc[key]
        };
      }
      return acc[key];
    }, obj);
  }
  function ensureState(store) {
    if (store !== effectiveStore) {
      if (!store.keys().contains(STORE_KEY_META)) {
        store.set(STORE_KEY_META, {});
      }
      const meta = store.get(STORE_KEY_META);
      if (!store.keys().contains(STORE_KEY)) {
        store.set(STORE_KEY, {});
      } else if (Reflect.has(meta, META_KEY_ERRORS)) {
        const state = store.get(STORE_KEY);
        const errors = meta[META_KEY_ERRORS];
        Object.keys(errors).forEach(key => {
          const path = JSON.parse(key);
          if (path.length > 2) {
            set(state, path, {
              data: undefined,
              error: undefined,
              loaded: false,
              loading: false
            });
          } else {
            set(state, path, undefined);
          }
        });
        Object.entries(state).forEach(([key, value]) => {
          state[key] = utilsInternal.readonly(value);
        });
      }
      store.set(STORE_KEY_META, {});
    }
    return store;
  }
  const commandModuleRegistration = {
    id: 'commandModule',
    runtimeDependencies: {
      store: true
    },
    setCommandRuntime: ({
      store
    }) => effectiveStore = ensureState(store)
  };
  registry.register(commandModuleRegistration);

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const validStoreAdapterKeys = ['data', 'error', 'loaded', 'loading'];
  function loadWithDebounceContext(adapter, debounced) {
    ADAPTERS_DEBOUNCE.set(adapter, debounced);
    const result = adapter.load();
    ADAPTERS_DEBOUNCE.delete(adapter);
    return result;
  }
  function serializeError(ex) {
    const serialized = serializeError$1.serializeError(ex);
    return typeof serialized === 'string' ? serialized : JSON.stringify(serialized);
  }
  function deserializeError(error) {
    const strip = err => {
      if (err.name === 'NonError') {
        err.message = err.message.replace(/^"|"$/g, '');
      }
      return err;
    };
    try {
      return strip(serializeError$1.deserializeError(JSON.parse(error)));
    } catch (e) {
      return strip(serializeError$1.deserializeError(error));
    }
  }
  function assertKeyString(k) {
    const isKey = typeof k === 'string';
    {
      if (!isKey) {
        const message = `invalid type '${typeof k}' for key '${JSON.stringify(k)}'`;
        console.warn(`[store] ${message}`);
        throw new Error(message);
      }
      if (['.', '[', ']'].some(token => k.indexOf(token) !== -1)) {
        const message = `invalid character used in key '${k}'. Forbidden are: .[]`;
        console.warn(`[store] ${message}`);
        throw new Error(message);
      }
    }
    return k;
  }
  function isStoreAdapterEntry(v) {
    return utils.isPlainObject(v) && Object.keys(v).every(key => validStoreAdapterKeys.includes(key)) && (typeof v.error === 'string' || typeof v.error === 'undefined') && typeof v.loaded === 'boolean' && typeof v.loading === 'boolean';
  }
  function isStoreAdapterEntryContainer(v) {
    if (utils.isPlainObject(v)) {
      const keys = Object.keys(v);
      return keys.length > 0 && keys.some(prop => isStoreAdapterEntry(v[prop]));
    }
    return false;
  }
  function unwrapStoreAdapterEntryContainer(container, entryKey) {
    entryKey = typeof entryKey === 'string' ? entryKey : '{}';
    const entry = utils.isPlainObject(container) ? container[entryKey] : undefined;
    const isObj = utils.isPlainObject(entry);
    if (isObj && typeof entry.error === 'string') {
      return deserializeError(entry.error);
    }
    return isObj ? entry.data : undefined;
  }
  function wrapStoreAdapterEntryContainer(value, entryKey) {
    if (isStoreAdapterEntryContainer(value)) {
      return value;
    }
    const defaults = value instanceof Error ? {
      data: undefined,
      error: serializeError(value)
    } : {
      data: value,
      error: undefined
    };
    entryKey = typeof entryKey === 'string' ? entryKey : '{}';
    return {
      [entryKey]: {
        ...defaults,
        loaded: true,
        loading: false
      }
    };
  }
  function wrap(delegate, value, key, entryKey) {
    const path = `${delegate.name}.${assertKeyString(key)}`;
    const currentValue = delegate.get(key);
    const deepMergeValue = (...objects) => {
      return objects.reduce((acc, obj) => {
        const isContainer = isStoreAdapterEntryContainer(obj);
        Object.keys(obj).forEach(k => {
          const pVal = acc[k];
          const oVal = obj[k];
          if (isContainer && utils.isPlainObject(pVal) && utils.isPlainObject(oVal)) {
            acc[k] = deepMergeValue(pVal, oVal);
          } else {
            acc[k] = oVal;
          }
        });
        return acc;
      }, {});
    };
    const mergeValue = container => {
      return utils.isPlainObject(currentValue) ? deepMergeValue(utilsInternal.deepClone(currentValue).value, container) : container;
    };
    if (hasOwnProperty.call(CONNECTED_ADAPTER_PATHS, path) && CONNECTED_ADAPTER_PATHS[path] > 0 || isStoreAdapterEntryContainer(currentValue)) {
      return mergeValue(wrapStoreAdapterEntryContainer(value, entryKey));
    }
    return value;
  }
  function wrapAll(delegate, value, key) {
    const path = `${delegate.name}.${assertKeyString(key)}`;
    const currentValue = delegate.get(key);
    if (isStoreAdapterEntryContainer(currentValue)) {
      return Object.keys(currentValue).reduce((acc, k) => {
        const container = wrapStoreAdapterEntryContainer(value, k);
        acc[k] = {
          ...currentValue[k],
          ...container[k]
        };
        return acc;
      }, {});
    } else if (hasOwnProperty.call(CONNECTED_ADAPTER_PATHS, path) && CONNECTED_ADAPTER_PATHS[path] > 0) {
      return Object.keys(CONNECTED_ADAPTER_PATHS).reduce((acc, k) => {
        if (k.indexOf(`${path}.`) !== -1) {
          const ek = k.substring(k.lastIndexOf('.') + 1);
          const container = wrapStoreAdapterEntryContainer(value, ek);
          acc[ek] = container[ek];
        }
        return acc;
      }, {});
    }
    return value;
  }
  function obtainLocalState(delegate, entryKey, asPlugin = false) {
    const isAdapterMode = Array.isArray(entryKey);
    const adapterEntryKey = entryKey?.at?.(1);
    function unwrap(key, value) {
      const path = `${delegate.name}.${assertKeyString(key)}`;
      if (hasOwnProperty.call(CONNECTED_ADAPTER_PATHS, path) && CONNECTED_ADAPTER_PATHS[path] > 0 || isStoreAdapterEntryContainer(value)) {
        return utils.isPlainObject(value) ? unwrapStoreAdapterEntryContainer(value, adapterEntryKey) : undefined;
      }
      return value;
    }
    class LocalState {
      get name() {
        return delegate.name;
      }
      get size() {
        if (isAdapterMode && utils.isPlainObject(delegate.container)) {
          return Object.entries(delegate.container).reduce((acc, [k, v]) => {
            const p = `${delegate.name}.${k}`;
            if (hasOwnProperty.call(CONNECTED_ADAPTER_PATHS, p) && CONNECTED_ADAPTER_PATHS[p] > 0 || isStoreAdapterEntryContainer(v)) {
              if (utils.isPlainObject(v) && hasOwnProperty.call(v, entryKey[1])) {
                acc++;
              }
            } else {
              acc++;
            }
            return acc;
          }, 0);
        }
        return delegate.size;
      }
      has(key) {
        const result = delegate.has(key);
        if (isAdapterMode) {
          const value = delegate.get(key);
          const path = `${delegate.name}.${assertKeyString(key)}`;
          if (hasOwnProperty.call(CONNECTED_ADAPTER_PATHS, path) && CONNECTED_ADAPTER_PATHS[path] > 0 || isStoreAdapterEntryContainer(value)) {
            return utils.isPlainObject(value) && hasOwnProperty.call(value, entryKey[1]);
          }
        }
        return result;
      }
      get(key) {
        const value = delegate.get(key);
        return isAdapterMode ? unwrap(key, value) : value;
      }
      set(key, data) {
        const effectiveValue = isAdapterMode ? wrap(delegate, data, key, adapterEntryKey) : wrapAll(delegate, data, key);
        delegate.set(key, effectiveValue);
      }
      delete(key) {
        if (isAdapterMode && isStoreAdapterEntryContainer(delegate.get(key))) {
          const currentValue = delegate.get(key);
          const hasProp = hasOwnProperty.call(currentValue, entryKey[1]);
          if (hasProp) {
            const effectiveValue = {
              ...currentValue
            };
            delete effectiveValue[entryKey[1]];
            if (Object.keys(effectiveValue).length === 0) {
              delegate.delete(key);
            } else {
              delegate.set(key, effectiveValue);
            }
          }
          return hasProp;
        }
        return delegate.delete(key);
      }
      clear() {
        delegate.clear();
      }
      update(key, updater) {
        const effectiveUpdater = value => {
          const effectiveValue = isAdapterMode ? unwrap(key, value) : value;
          const updatedValue = updater(effectiveValue);
          return isAdapterMode ? wrap(delegate, updatedValue, key, adapterEntryKey) : wrapAll(delegate, updatedValue, key);
        };
        return delegate.update(key, effectiveUpdater);
      }
      dispatch(type, payload) {
        return delegate.dispatch(type, payload);
      }
    }
    class LocalPluginState extends LocalState {
      subscribe(key, fnOrSubscriber) {
        return delegate.subscribe(key, fnOrSubscriber);
      }
      subscribeAction(type, fnOrSubscriber) {
        return utils.isFunction(fnOrSubscriber) ? delegate.subscribeAction(type, fnOrSubscriber) : delegate.subscribeAction(type, fnOrSubscriber);
      }
      /*LWC compiler v7.1.5*/
    }
    return asPlugin ? new LocalPluginState() : new LocalState();
  }
  function obtainLocalAdapter(delegate) {
    class LocalAdapter {
      get config() {
        return delegate.config;
      }
      get() {
        return delegate.get();
      }
      load() {
        return loadWithDebounceContext(delegate, true);
      }
      subscribe(fnOrSubscriber) {
        return utils.isFunction(fnOrSubscriber) ? delegate.subscribe(fnOrSubscriber) : delegate.subscribe(fnOrSubscriber);
      }
      subscribeAction(type, fnOrSubscriber) {
        return utils.isFunction(fnOrSubscriber) ? delegate.subscribeAction(type, fnOrSubscriber) : delegate.subscribeAction(type, fnOrSubscriber);
      }
      subscribeLoad(fnOrSubscriber) {
        return utils.isFunction(fnOrSubscriber) ? delegate.subscribeLoad(fnOrSubscriber) : delegate.subscribeLoad(fnOrSubscriber);
      }
    }
    return new LocalAdapter();
  }
  function subscribe(key, subscriber, subs) {
    !subs[key] && (subs[key] = []);
    subs[key].push(subscriber);
    return {
      unsubscribe() {
        const s = subs[key];
        const i = s?.indexOf(subscriber);
        i > -1 && s.splice(i, 1);
      }
    };
  }
  function notifySubscriber(subscriber, category, localState, stage, type, payload, error) {
    const fn = subscriber[stage];
    if (utils.isFunction(fn)) {
      try {
        const action = {
          type,
          payload
        };
        stage === 'error' ? fn(action, localState, error) : fn(action, localState);
      } catch (e) {
        {
          console.warn(`[store] error in ${stage} ${category} subscribers:`);
          console.warn(e);
        }
      }
    }
  }
  function notifySubscribers(subscribers, category, localState, stage, type, payload, error) {
    if (subscribers[type]) {
      const subs = subscribers[type];
      for (const sub of subs) {
        if (stage === 'error') {
          notifySubscriber(sub, category, localState, stage, type, payload, error);
        } else {
          notifySubscriber(sub, category, localState, stage, type, payload);
        }
      }
    }
  }
  function patchSubscriber(subscriber, localStateGetter, actionHandler = action => action) {
    function patchSubscriberFunction(subscriberFn) {
      return (action, state, error) => {
        error ? subscriberFn(actionHandler(action), localStateGetter(), error) : subscriberFn(actionHandler(action), localStateGetter());
      };
    }
    return Object.entries(subscriber).reduce((acc, [key, value]) => {
      acc[key] = patchSubscriberFunction(value);
      return acc;
    }, {});
  }
  function createStoreAdapter(AdapterClass, config, ...parameters) {
    const params = arguments.length > 2 ? parameters : [];
    const instance = new AdapterClass(...params);
    ADAPTERS_SSR_PERMITTED.set(instance, true);
    instance.update(utils.isPlainObject(config) ? config : {});
    instance.connect();
    return instance;
  }
  function getStoreAdapterValue(AdapterClass, config, ...parameters) {
    const instance = createStoreAdapter(AdapterClass, config, ...parameters);
    return instance.get().then(entry => entry.data).finally(() => {
      instance.disconnect();
    });
  }
  function distributeStoreAdapterValue(AdapterClass, value, ...parameters) {
    const instance = createStoreAdapter(AdapterClass, {}, ...parameters);
    instance.disconnect();
    const store = instance['store'];
    const sliceKey = instance['key'];
    const slice = Reflect.get(store.container, sliceKey);
    const path = `${store.name}.${assertKeyString(sliceKey)}`;
    if (hasOwnProperty.call(CONNECTED_ADAPTER_PATHS, path) && CONNECTED_ADAPTER_PATHS[path] > 0 || isStoreAdapterEntryContainer(slice)) {
      store.set(sliceKey, wrapAll(store, value, sliceKey));
    } else {
      store.set(sliceKey, value);
    }
  }
  function setStoreAdapterValue(AdapterClass, value, config, ...parameters) {
    const instance = createStoreAdapter(AdapterClass, config, ...parameters);
    const store = instance['store'];
    const sliceKey = instance['key'];
    instance.disconnect();
    store.set(sliceKey, wrap(store, value, sliceKey, instance['entryKey']));
  }
  function deleteStoreAdapterValue(AdapterClass, config, ...parameters) {
    const instance = createStoreAdapter(AdapterClass, config, ...parameters);
    const state = obtainLocalState(instance['store'], [instance['key'], instance['entryKey'], instance['uuid']]);
    instance.disconnect();
    if (!instance.options?.discard && !instance['store'].options.discard) {
      state.delete(instance['key']);
    }
  }
  function toEntryKey(config, context) {
    const orderedContext = utilsInternal.deepSort(context ?? {}).value;
    const orderedConfig = utilsInternal.deepSort(config ?? {}).value;
    const contextKey = JSON.stringify(orderedContext, utilsInternal.circularRefReplacer());
    const configKey = JSON.stringify(orderedConfig, utilsInternal.circularRefReplacer());
    return `${contextKey}:${configKey}`;
  }
  function hasSubscribers(store, key, config, context) {
    const pathRoot = `${store.name}.${key}`;
    if (utils.isPlainObject(config) || utils.isPlainObject(context)) {
      const entryKey = toEntryKey(config, context);
      const pathEntry = `${pathRoot}.${entryKey}`;
      return Reflect.has(CONNECTED_ADAPTER_PATHS, pathEntry) && Number(CONNECTED_ADAPTER_PATHS[pathEntry]) > 0;
    }
    return Reflect.has(CONNECTED_ADAPTER_PATHS, pathRoot) && Number(CONNECTED_ADAPTER_PATHS[pathRoot]) > 0 || Reflect.has(store['subscribers'], key) && store['subscribers']?.[key]?.length > 0;
  }

  class StoreActionError extends Error {
    constructor(error) {
      super(typeof error === 'string' ? error : error instanceof Error ? error.message : undefined);
      this.name = 'StoreActionError';
      this.error = error;
    }
    /*LWC compiler v7.1.5*/
  }
  lwc.registerDecorators(StoreActionError, {
    fields: ["name"]
  });
  serializeError$1.registerErrorConstructor('StoreActionError', StoreActionError);

  class Store {
    constructor(name, options = Object.freeze({})) {
      this.actions = {};
      this.actionSubscribers = {};
      this.subscribers = {};
      this.localState = obtainLocalState(this);
      this.name = name;
      this.options = options;
      if (INSTANCES.has(name)) {
        return INSTANCES.get(name);
      }
      INSTANCES.set(name, this);
      if (Reflect.has(options, 'state')) {
        this._updateContainer(utils.isFunction(options.state) ? options.state() : options.state);
      } else if (!utils.isPlainObject(getStateValue(this.name))) {
        setStateValue(this.name, {});
      }
      if (utils.isPlainObject(options.actions)) {
        for (const [type, action] of Object.entries(options.actions)) {
          if (utils.isPlainObject(action) && typeof action.namespace === 'string' && utils.isFunction(action.handler)) {
            const {
              namespace,
              handler
            } = action;
            const namespacedAction = `${namespace}/${type}`;
            if (ACTIONS_TO_INSTANCES.has(namespacedAction)) {
              throw new TypeError(`[store] handler already registered for action type in namespace '${namespace}': ${type}`);
            }
            ACTIONS_TO_INSTANCES.set(namespacedAction, this);
            this._registerAction(type, handler);
          } else if (utils.isFunction(action)) {
            this._registerAction(type, action);
          } else {
            throw new TypeError(`[store] invalid action configuration for store '${name}': ${type}`);
          }
        }
      }
      const pluginState = obtainLocalState(this, undefined, true);
      if (Array.isArray(options.plugins)) {
        for (const plugin of options.plugins) {
          plugin(pluginState);
        }
      }
    }
    get size() {
      return Object.keys(this.container).length;
    }
    get container() {
      return getStateValue(this.name);
    }
    _updateContainer(value) {
      const val = utilsInternal.readonly(value);
      setStateValue(this.name, utils.isPlainObject(val) ? val : {});
    }
    _has(key) {
      return Reflect.has(this.container, key);
    }
    _get(key) {
      const container = this.container;
      const data = Reflect.has(container, key) ? container[key] : undefined;
      if (hasErrorProp(this.name, key)) {
        return deserializeError(data);
      }
      return data;
    }
    _delete(key) {
      if (this._has(key)) {
        this._notify(key, () => {
          deleteErrorProp(this.name, key);
          const {
            [key]: _,
            ...newContainer
          } = this.container;
          this._updateContainer(newContainer);
        });
        return true;
      }
      return false;
    }
    _update(key, data) {
      this._notify(key, () => this._set(key, data));
    }
    _set(key, data) {
      const isError = data instanceof Error;
      const value = isError ? serializeError(data) : data;
      if (isError) {
        addErrorProp(this.name, key);
      } else {
        deleteErrorProp(this.name, key);
      }
      this._updateContainer({
        ...this.container,
        [key]: value
      });
    }
    _notify(key, handler) {
      const oldValue = this._get(key);
      this._notifyMutationSubscribers('before', key, oldValue instanceof Error ? undefined : oldValue);
      utils.isFunction(handler) && handler();
      const value = this._get(key);
      if (value instanceof Error) {
        this._notifyMutationSubscribers('error', key, undefined, value);
      } else {
        this._notifyMutationSubscribers('after', key, value);
      }
    }
    _registerAction(type, handler) {
      this.actions[type] = payload => {
        try {
          const res = handler.call(null, this.localState, payload);
          return Promise.resolve(res);
        } catch (e) {
          return Promise.reject(e);
        }
      };
    }
    _notifyActionSubscribers(stage, type, payload, error) {
      notifySubscribers(this.actionSubscribers, 'action', this.localState, stage, type, payload, error);
    }
    _notifyMutationSubscribers(stage, key, value, error) {
      notifySubscribers(this.subscribers, 'mutation', this.localState, stage, key, value, error);
    }
    _dispatchAction(type, handler, payload) {
      const effectivePayload = utilsInternal.readonly(payload);
      this._notifyActionSubscribers('before', type, effectivePayload);
      return new Promise((resolve, reject) => {
        handler(effectivePayload).then(res => {
          this._notifyActionSubscribers('after', type, res);
          resolve(res);
        }).catch(error => {
          const err = error instanceof Error ? error : new StoreActionError(error);
          this._notifyActionSubscribers('error', type, effectivePayload, err);
          reject(err);
        });
      });
    }
    has(key) {
      return this._has(assertKeyString(key));
    }
    get(key) {
      return this._get(assertKeyString(key));
    }
    set(key, data) {
      this._update(assertKeyString(key), data);
    }
    delete(key) {
      return this._delete(assertKeyString(key));
    }
    clear() {
      for (const key of Object.keys(this.container)) {
        this._delete(key);
      }
    }
    update(key, updater) {
      if (utils.isFunction(updater)) {
        const k = assertKeyString(key);
        this._update(k, updater(this._get(k)));
      }
    }
    dispatch(type, payload) {
      const handler = this.actions[type];
      if (utils.isFunction(handler)) {
        return this._dispatchAction(type, handler, payload);
      }
      if (type.includes('/') && ACTIONS_TO_INSTANCES.has(type)) {
        const effectiveType = type.substring(type.indexOf('/') + 1);
        const responsibleStore = ACTIONS_TO_INSTANCES.get(type);
        return responsibleStore.dispatch(effectiveType, payload);
      }
      const message = `unknown action type: ${type}`;
      {
        console.warn(`[store] ${message}`);
      }
      return Promise.reject(new TypeError(message));
    }
    subscribe(key, fnOrSubscriber) {
      const toSubscriber = input => typeof input === 'function' ? {
        after: input,
        error: input
      } : input;
      const k = assertKeyString(key);
      const subscriber = toSubscriber(fnOrSubscriber);
      const subscribers = this.subscribers;
      const subscription = subscribe(k, subscriber, subscribers);
      const discard = typeof window !== 'undefined' && this.options?.discard === true;
      const effectiveSubscription = {
        unsubscribe: () => {
          subscription.unsubscribe();
          if (discard && (!Reflect.has(subscribers, k) || subscribers[k].length === 0)) {
            delete subscribers[k];
            this._delete(k);
          }
        }
      };
      if (this._has(k)) {
        const v = this._get(k);
        v instanceof Error ? notifySubscriber(subscriber, 'mutation', this.localState, 'error', k, undefined, v) : notifySubscriber(subscriber, 'mutation', this.localState, 'after', k, v);
      }
      return effectiveSubscription;
    }
    subscribeAction(type, fnOrSubscriber) {
      const subscriber = typeof fnOrSubscriber === 'function' ? {
        after: fnOrSubscriber,
        error: fnOrSubscriber
      } : fnOrSubscriber;
      if (type.includes('/') && ACTIONS_TO_INSTANCES.has(type)) {
        const effectiveType = type.substring(type.indexOf('/') + 1);
        const responsibleStore = ACTIONS_TO_INSTANCES.get(type);
        return responsibleStore.subscribeAction(effectiveType, fnOrSubscriber);
      }
      return subscribe(type, subscriber, this.actionSubscribers);
    }
  }

  const defaultConfig = Object.freeze({});
  function obtainLoader(options) {
    const {
      loader
    } = options || {};
    const isObj = utils.isPlainObject(loader);
    return {
      handler: !isObj && utils.isFunction(loader) ? loader : isObj && utils.isFunction(loader.handler) ? loader.handler : undefined,
      abortable: isObj && loader.abortable === true
    };
  }
  function empty(loading = false) {
    return {
      data: undefined,
      error: undefined,
      loaded: false,
      loading
    };
  }
  function createLooseSubscriber(subscriber, subs, activeUnsub, key) {
    const entry = activeUnsub ? {
      key,
      subscriber,
      unsubscribable: activeUnsub
    } : {
      key,
      subscriber
    };
    subs.push(entry);
    return {
      unsubscribe: () => {
        entry.unsubscribable?.unsubscribe();
        const s = subs;
        const i = s.indexOf(entry);
        i > -1 && s.splice(i, 1);
      }
    };
  }
  function disarmLooseSubscribers(rawSubs) {
    for (const entry of rawSubs) {
      delete entry.unsubscribable;
    }
  }
  function obtainAdapterControlledPath(store, key, entryKey) {
    const rootPath = `${store.name}.${key}`;
    return entryKey ? `${rootPath}.${entryKey}` : rootPath;
  }
  function updateAdapterControlledPathsCounter(store, key, entryKey, update = 1) {
    const pathRoot = obtainAdapterControlledPath(store, key);
    const pathEntry = `${pathRoot}.${entryKey}`;
    [pathRoot, pathEntry].forEach(path => {
      const count = CONNECTED_ADAPTER_PATHS[path];
      const newCount = (utils.isInteger(count) ? count : 0) + update;
      if (newCount > 0) {
        CONNECTED_ADAPTER_PATHS[path] = newCount;
      } else {
        delete CONNECTED_ADAPTER_PATHS[path];
      }
    });
  }
  function ensureEntry(entry) {
    return isStoreAdapterEntry(entry) ? entry : empty();
  }
  class StoreAdapter {
    get config() {
      return this._config || defaultConfig;
    }
    constructor(dataCallback, store, key, options) {
      this.uuid = utilsInternal.uuidv4();
      this.connectors = [];
      this.rawMutationSubscribers = [];
      this.rawActionSubscribers = [];
      this.rawLoadSubscribers = [];
      this.loadSubscribers = {};
      this.activeSubscriptions = [];
      this.localState = void 0;
      this.isConnected = false;
      this.isSubscribed = false;
      this._config = void 0;
      this._context = void 0;
      this.entryKey = void 0;
      this.lastCallbackEntry = void 0;
      this.dataCallback = dataCallback;
      this.store = store;
      this.key = key;
      this.options = options;
      if (options && Array.isArray(options.connectors)) {
        for (const connector of options.connectors) {
          if (utils.isPlainObject(connector)) {
            this.connectors.push(connector);
          } else if (utils.isFunction(connector)) {
            this.connectors.push({
              connect: connector
            });
          }
        }
      }
    }
    get loadingPromises() {
      return LOADING_PROMISES.get(this.store.name);
    }
    _notifyConnectors(stage) {
      for (const connector of this.connectors) {
        if (utils.isFunction(connector[stage])) {
          connector[stage](obtainLocalAdapter(this), {
            type: this.key,
            payload: this.config
          }, this.localState);
        }
      }
    }
    _notifyLoadSubscribers(stage, error) {
      const {
        data
      } = this._read();
      notifySubscribers(this.loadSubscribers, 'load', this.localState, stage, this.key, data, error);
    }
    _obtainLoadingPromiseKey() {
      return `${assertKeyString(this.key)}:${this.entryKey}`;
    }
    _obtainRawEntryContainer() {
      return this.store.get(this.key);
    }
    _obtainEntryContainer() {
      const entry = this._obtainRawEntryContainer();
      return utils.isPlainObject(entry) ? {
        ...entry
      } : {};
    }
    _obtainEntry(entry) {
      const e = utils.isPlainObject(entry) ? entry : this._obtainEntryContainer();
      return e?.[this.entryKey];
    }
    _read(entry) {
      return ensureEntry(entry || this._obtainEntry());
    }
    _writeContainer(container) {
      this.store.set(this.key, container);
    }
    _write(value, entryKey = this.entryKey) {
      const container = this._obtainEntryContainer();
      container[entryKey] = value;
      this._updateMeta('w', entryKey);
      this._writeContainer(container);
    }
    _updateMeta(mode, entryKey = this.entryKey) {
      const metaKey = `${this.store.name}:${assertKeyString(this.key)}`;
      const metaValue = getMetaValue(metaKey) ?? {};
      if (mode === 'd') {
        Reflect.deleteProperty(metaValue, entryKey);
      } else {
        Reflect.set(metaValue, entryKey, performance.now() + performance.timeOrigin);
      }
      setMetaValue(metaKey, metaValue);
    }
    _callback(value) {
      if (this.isConnected && this.dataCallback && !utilsInternal.deepEqual(value, this.lastCallbackEntry).value) {
        this.lastCallbackEntry = value;
        const {
          error
        } = value;
        const cbVal = {
          ...value
        };
        cbVal.error = typeof error === 'string' ? deserializeError(error) : undefined;
        utilsInternal.readonly(cbVal);
        this.dataCallback.call(null, cbVal);
      }
    }
    _removeLoadingPromise(loadingPromiseKey) {
      const loadingPromises = this.loadingPromises;
      const loadingPromise = loadingPromises?.get(loadingPromiseKey);
      loadingPromises?.delete(loadingPromiseKey);
      utils.clearDebounceTimeout(loadingPromise);
      utils.clearDebounceTimeout(ADAPTERS_DEBOUNCING.get(loadingPromiseKey));
    }
    _unsubscribe() {
      if (this.isSubscribed) {
        this.isSubscribed = false;
        updateAdapterControlledPathsCounter(this.store, this.key, this.entryKey, -1);
        const discard = typeof window !== 'undefined' && (this.options?.discard || this.store.options.discard) === true;
        if (discard && utils.isPlainObject(this._obtainRawEntryContainer())) {
          const entryKeyPath = obtainAdapterControlledPath(this.store, this.key, this.entryKey);
          if (!Reflect.has(CONNECTED_ADAPTER_PATHS, entryKeyPath)) {
            const container = this._obtainEntryContainer();
            delete container[this.entryKey];
            if (Object.keys(container).length === 0) {
              const metaKey = `${this.store.name}:${assertKeyString(this.key)}`;
              setMetaValue(metaKey, {});
              this.store.delete(this.key);
            } else {
              this._updateMeta('d');
              this._writeContainer(container);
            }
          }
        }
        this._notifyConnectors('disconnect');
      }
      for (const sub of this.activeSubscriptions) {
        sub.unsubscribe();
      }
      this.activeSubscriptions.splice(0, this.activeSubscriptions.length);
      disarmLooseSubscribers(this.rawMutationSubscribers);
      disarmLooseSubscribers(this.rawActionSubscribers);
      disarmLooseSubscribers(this.rawLoadSubscribers);
      for (const key of Object.keys(this.loadSubscribers)) {
        delete this.loadSubscribers[key];
      }
      delete this.lastCallbackEntry;
    }
    _subscribe() {
      if (!this.isConnected || !this._config) {
        return;
      }
      this._unsubscribe();
      const comparedEntryKey = toEntryKey(this._config, this._context);
      if (this.entryKey !== comparedEntryKey) {
        this.entryKey = comparedEntryKey;
        this.localState = obtainLocalState(this.store, [this.key, this.entryKey, this.uuid]);
        const initialContainer = this._obtainRawEntryContainer();
        if (typeof initialContainer !== 'undefined' && !isStoreAdapterEntryContainer(initialContainer)) {
          const transformedContainer = wrapStoreAdapterEntryContainer(initialContainer, this.entryKey);
          {
            const entryRootPath = obtainAdapterControlledPath(this.store, this.key);
            const entryKeyPath = `${entryRootPath}.${this.entryKey}`;
            console.warn(`[store-adapter] entry for path '${entryKeyPath}' is connected to a store adapter, yet the data doesn't have the required shape.`);
            console.warn(`[store-adapter] going to transform data:`, initialContainer);
          }
          Object.keys(transformedContainer).forEach(entryKey => this._updateMeta('w', entryKey));
          this._writeContainer(transformedContainer);
        }
      }
      updateAdapterControlledPathsCounter(this.store, this.key, this.entryKey);
      if (!LOADING_PROMISES.has(this.store.name)) {
        LOADING_PROMISES.set(this.store.name, new Map());
      }
      this._notifyConnectors('connect');
      for (const entry of this.rawLoadSubscribers) {
        const activeUnsub = subscribe(this.key, entry.subscriber, this.loadSubscribers);
        this.activeSubscriptions.push(activeUnsub);
        entry.unsubscribable = activeUnsub;
      }
      this.isSubscribed = true;
      const mutationHandler = () => {
        let oldPayload;
        const beforeHandler = ({
          payload
        }) => {
          oldPayload = payload;
        };
        const afterHandler = ({
          payload
        }) => {
          if (this.entryKey && (utils.isPlainObject(oldPayload) && Reflect.has(oldPayload, this.entryKey) || utils.isPlainObject(payload) && Reflect.has(payload, this.entryKey))) {
            const newEntry = this._obtainEntry(payload);
            this._isValid(newEntry) && this._callback(this._read(newEntry));
          }
        };
        return {
          before: beforeHandler,
          after: afterHandler,
          error: afterHandler
        };
      };
      this.activeSubscriptions.push(this.store.subscribe(this.key, mutationHandler()));
      if (!obtainLoader(this.options).handler || typeof window === 'undefined' && !ADAPTERS_SSR_PERMITTED.get(this)) {
        this._callback(this._read());
      } else {
        this._getAsync(this._read());
      }
      for (const entry of this.rawMutationSubscribers) {
        const activeUnsub = this.store.subscribe(this.key, entry.subscriber);
        this.activeSubscriptions.push(activeUnsub);
        entry.unsubscribable = activeUnsub;
      }
      for (const entry of this.rawActionSubscribers) {
        const activeUnsub = this.store.subscribeAction(entry.key, entry.subscriber);
        this.activeSubscriptions.push(activeUnsub);
        entry.unsubscribable = activeUnsub;
      }
    }
    _getAsync(entry) {
      const loadingPromiseKey = this._obtainLoadingPromiseKey();
      const loadingPromise = this.loadingPromises?.get(loadingPromiseKey);
      const hasLoadingPromise = utils.isPromiseLike(loadingPromise);
      if (hasLoadingPromise) {
        return loadingPromise;
      } else if (!entry.loaded && !entry.loading) {
        return loadWithDebounceContext(this, false);
      } else if (entry.loading && !hasLoadingPromise) {
        return loadWithDebounceContext(this, false);
      }
      if (!this._isValid(entry)) {
        return loadWithDebounceContext(this, false);
      }
      return Promise.resolve(utilsInternal.readonly(entry));
    }
    _isValid(entry) {
      if (this.options && utils.isFunction(this.options.validator)) {
        try {
          if (!this.options.validator({
            type: this.key,
            payload: utilsInternal.readonly(entry)
          }, obtainLocalAdapter(this), this.localState)) {
            return false;
          }
        } catch {
          // Intentionally empty
        }
      }
      const metaKey = `${this.store.name}:${assertKeyString(this.key)}`;
      const lastUpdated = getMetaValue(metaKey)?.[this.entryKey];
      if (typeof lastUpdated === 'number') {
        const ttl = typeof this.options?.cache?.ttl === 'number' && !Number.isNaN(this.options.cache.ttl) && this.options.cache.ttl >= -1 ? this.options?.cache?.ttl : CACHE_TTL;
        if (ttl === -1) {
          return true;
        }
        const now = performance.now();
        const then = lastUpdated - performance.timeOrigin;
        const diff = now - then;
        return ttl * 1000 >= diff;
      }
      return true;
    }
    _load(loadHandler, loadingPromiseKey) {
      this._notifyLoadSubscribers('before');
      const {
        name: storeName
      } = this.store;
      try {
        const shouldDebounce = ADAPTERS_DEBOUNCE.get(this) !== false;
        const effectiveLoadHandler = shouldDebounce ? utils.debounce(loadHandler) : loadHandler;
        const result = effectiveLoadHandler({
          type: this.key,
          payload: this._config
        }, this.localState);
        if (utils.isPromiseLike(result)) {
          shouldDebounce && ADAPTERS_DEBOUNCING.set(loadingPromiseKey, result);
          const abortableResultPromise = data.AbortablePromise.from(result);
          const loadingPromise = abortableResultPromise.then(data => {
            const currentLoadingPromiseKey = this._obtainLoadingPromiseKey();
            const currentLoadingPromise = this.loadingPromises?.get(currentLoadingPromiseKey);
            if (currentLoadingPromiseKey !== loadingPromiseKey) {
              ADAPTERS_DEBOUNCING.delete(loadingPromiseKey);
              this._removeLoadingPromise(loadingPromiseKey);
              const oldEntryKey = loadingPromiseKey.substring(loadingPromiseKey.indexOf(':') + 1);
              deleteErrorProp(storeName, this.key, oldEntryKey);
              this._write({
                data,
                error: undefined,
                loaded: true,
                loading: false
              }, oldEntryKey);
            } else if (currentLoadingPromise && currentLoadingPromise === loadingPromise) {
              ADAPTERS_DEBOUNCING.delete(currentLoadingPromiseKey);
              this._removeLoadingPromise(currentLoadingPromiseKey);
              deleteErrorProp(storeName, this.key, this.entryKey);
              this._write({
                data,
                error: undefined,
                loaded: true,
                loading: false
              });
              this._notifyLoadSubscribers('after');
            }
            return utilsInternal.readonly(this._read());
          }, ex => {
            const currentLoadingPromiseKey = this._obtainLoadingPromiseKey();
            const currentLoadingPromise = this.loadingPromises?.get(currentLoadingPromiseKey);
            if (currentLoadingPromiseKey !== loadingPromiseKey) {
              ADAPTERS_DEBOUNCING.delete(loadingPromiseKey);
              this._removeLoadingPromise(loadingPromiseKey);
              const oldEntryKey = loadingPromiseKey.substring(loadingPromiseKey.indexOf(':') + 1);
              if (ex instanceof data.AbortError) {
                deleteErrorProp(storeName, this.key, oldEntryKey);
                const container = this._obtainEntryContainer();
                this._write({
                  ...ensureEntry(container?.[oldEntryKey]),
                  loading: false
                }, oldEntryKey);
              } else {
                addErrorProp(storeName, this.key, oldEntryKey);
                this._write({
                  data: undefined,
                  error: serializeError(ex),
                  loaded: true,
                  loading: false
                }, oldEntryKey);
              }
            } else if (currentLoadingPromise && currentLoadingPromise === loadingPromise) {
              ADAPTERS_DEBOUNCING.delete(currentLoadingPromiseKey);
              this._removeLoadingPromise(currentLoadingPromiseKey);
              if (ex instanceof data.AbortError) {
                deleteErrorProp(storeName, this.key, this.entryKey);
                this._write({
                  ...this._read(),
                  loading: false
                });
                this._notifyLoadSubscribers('after');
              } else {
                addErrorProp(storeName, this.key, this.entryKey);
                this._write({
                  data: undefined,
                  error: serializeError(ex),
                  loaded: true,
                  loading: false
                });
                this._notifyLoadSubscribers('error', ex);
              }
            }
            return utilsInternal.readonly(this._read());
          });
          this.loadingPromises?.set(loadingPromiseKey, loadingPromise);
          this._write({
            ...this._read(),
            loading: true
          });
          return loadingPromise;
        }
        deleteErrorProp(storeName, this.key, this.entryKey);
        this._write({
          data: result,
          error: undefined,
          loaded: true,
          loading: false
        });
        this._notifyLoadSubscribers('after');
      } catch (ex) {
        if (ex instanceof data.AbortError) {
          deleteErrorProp(storeName, this.key, this.entryKey);
          this._write({
            ...this._read(),
            loading: false
          });
          this._notifyLoadSubscribers('after');
        } else {
          addErrorProp(storeName, this.key, this.entryKey);
          const error = serializeError(ex);
          this._write({
            data: undefined,
            error,
            loaded: true,
            loading: false
          });
          this._notifyLoadSubscribers('error', ex);
        }
      }
      ADAPTERS_DEBOUNCING.delete(loadingPromiseKey);
      return Promise.resolve(utilsInternal.readonly(this._read()));
    }
    update(config, context) {
      this._config = utilsInternal.readonly(config);
      this._context = utilsInternal.readonly(context ?? {});
      this._subscribe();
    }
    connect() {
      if (!this.isConnected) {
        ADAPTERS_SSR_PERMITTED.has(this) && ADAPTERS_SSR_PERMITTED.set(this, true);
        this.isConnected = true;
        this._subscribe();
      }
    }
    disconnect() {
      if (this.isConnected) {
        ADAPTERS_SSR_PERMITTED.has(this) && ADAPTERS_SSR_PERMITTED.set(this, false);
        this.isConnected = false;
        this._unsubscribe();
      }
    }
    get() {
      const promise = this._getAsync(this._read());
      return promise.then(entry => {
        if (typeof entry.error === 'string') {
          throw deserializeError(entry.error);
        }
        return entry;
      });
    }
    load() {
      const loaderConfig = obtainLoader(this.options);
      if (!this.isSubscribed || !loaderConfig.handler) {
        return Promise.resolve(utilsInternal.readonly(this._read()));
      }
      const currentLoadingPromiseKey = this._obtainLoadingPromiseKey();
      const currentLoadingPromise = this.loadingPromises?.get(currentLoadingPromiseKey);
      if (utils.isPromiseLike(currentLoadingPromise) && (utils.extendDebouncedTimeout(currentLoadingPromise) || utils.extendDebouncedTimeout(ADAPTERS_DEBOUNCING.get(currentLoadingPromiseKey)))) {
        return currentLoadingPromise;
      }
      const {
        handler: loadHandler
      } = loaderConfig;
      return this._load(loadHandler, currentLoadingPromiseKey);
    }
    subscribe(fnOrSubscriber) {
      const localStateGetter = () => this.localState;
      const actionHandler = action => {
        const {
          payload
        } = action;
        return {
          type: action.type,
          payload: payload?.[this.entryKey]?.data
        };
      };
      const subscriber = utils.isFunction(fnOrSubscriber) ? patchSubscriber({
        after: fnOrSubscriber,
        error: fnOrSubscriber
      }, localStateGetter, actionHandler) : patchSubscriber(fnOrSubscriber, localStateGetter, actionHandler);
      const activeUnsub = this.isSubscribed ? this.store.subscribe(this.key, subscriber) : undefined;
      activeUnsub && this.activeSubscriptions.push(activeUnsub);
      return createLooseSubscriber(subscriber, this.rawMutationSubscribers, activeUnsub);
    }
    subscribeAction(type, fnOrSubscriber) {
      const localStateGetter = () => this.localState;
      const subscriber = typeof fnOrSubscriber === 'function' ? patchSubscriber({
        after: fnOrSubscriber,
        error: fnOrSubscriber
      }, localStateGetter) : patchSubscriber(fnOrSubscriber, localStateGetter);
      const activeUnsub = this.isSubscribed ? this.store.subscribeAction(type, subscriber) : undefined;
      activeUnsub && this.activeSubscriptions.push(activeUnsub);
      return createLooseSubscriber(subscriber, this.rawActionSubscribers, activeUnsub, type);
    }
    subscribeLoad(fnOrSubscriber) {
      const localStateGetter = () => this.localState;
      const subscriber = utils.isFunction(fnOrSubscriber) ? patchSubscriber({
        after: fnOrSubscriber,
        error: fnOrSubscriber
      }, localStateGetter) : patchSubscriber(fnOrSubscriber, localStateGetter);
      const activeUnsub = this.isSubscribed ? subscribe(this.key, subscriber, this.loadSubscribers) : undefined;
      activeUnsub && this.activeSubscriptions.push(activeUnsub);
      return createLooseSubscriber(subscriber, this.rawLoadSubscribers, activeUnsub);
    }
  }

  exports.Store = Store;
  exports.StoreActionError = StoreActionError;
  exports.StoreAdapter = StoreAdapter;
  exports.deleteStoreAdapterValue = deleteStoreAdapterValue;
  exports.deserializeError = deserializeError;
  exports.distributeStoreAdapterValue = distributeStoreAdapterValue;
  exports.getStoreAdapterValue = getStoreAdapterValue;
  exports.hasSubscribers = hasSubscribers;
  exports.serializeError = serializeError;
  exports.setStoreAdapterValue = setStoreAdapterValue;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_util/idGenerator', ['exports', 'dxp_util/common'], (function (exports, common) {

    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    /**
     * Convert a number to a word string in english
     *
     * @param {number} num Number to be converted words
     * @returns {string} A string which describe the number in english
     */
    function numberToWord(num = 0) {
      if (typeof num === "string") {
        num = parseInt(num, 10);
      }
      if (num < 0) {
        throw new Error("Negative numbers are not supported.");
      }
      if (num === 0) {
        return "zero";
      }

      //the case of 1 - 20
      if (num < 20) {
        return ones[num];
      }
      const numString = num.toString();
      if (numString.length === 2) {
        return `${tens[numString[0]]}${ones[numString[1]] ? "-" + ones[numString[1]] : ""}`;
      }

      // 100 +
      if (numString.length === 3) {
        if (numString[1] === "0" && numString[2] === "0") {
          return `${ones[numString[0]]}-hundred`;
        }
        const result = numberToWord(+(numString[1] + numString[2]));
        return `${ones[numString[0]]}-hundred-${result}`;
      }

      // 1000 +
      if (numString.length === 4) {
        const end = +(numString[1] + numString[2] + numString[3]);
        if (end === 0) {
          return ones[numString[0]] + "-thousand";
        }
        if (end < 100) {
          return `${ones[numString[0]]}-thousand-${numberToWord(end)}`;
        }
        return `${ones[numString[0]]}-thousand-${numberToWord(end)}`;
      }
      throw new Error(`${num} are not supported.`);
    }

    const indexToWord = baseIndex => index => numberToWord(index + baseIndex);
    const capitalize = capitalCase => string => capitalCase ?? false ? common.toCapitalized(string) : string;
    const appendPrefix = prefix => string => `${prefix}${string}`;

    /**
     * Generate id per given prefix
     *
     * @param {number} baseIndex base index such as start with 0, 1
     * @param {string} capitalCase whether use capital case
     * @param {string} prefix Prefix for each id
     * @param {number} index Index to generate id
     * @returns {string} such as CustomFieldOne or custom-field-twenty
     */
    function generateId(baseIndex, capitalCase, prefix, index) {
      return common.compose(appendPrefix(prefix), capitalize(capitalCase), indexToWord(baseIndex))(index);
    }
    const fnGenerateId = common.curry(generateId);

    /**
     * Generate ids per given prefix and total count
     *
     * @param {string} prefix Prefix for each id
     * @param {number} count How many ids are required
     * @param {object} options Options for generating id
     * @returns {Array} ids A array if generated ids
     */
    function generateIds(prefix, count, options = {
      baseIndex: 0,
      capitalCase: false
    }) {
      return common.compose(common.map(fnGenerateId(options.baseIndex, options.capitalCase, prefix)), common.toIndexes)(count);
    }

    /**
     * Generate unique number
     *
     * @returns {number} unique number
     */
    function generateUniqueNumber() {
      return Math.floor(new Date().valueOf() * Math.random());
    }

    exports.fnGenerateId = fnGenerateId;
    exports.generateId = generateId;
    exports.generateIds = generateIds;
    exports.generateUniqueNumber = generateUniqueNumber;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_data_provider/dataProviderUtils', ['exports', 'dxp_util/contentInfo', '@app/isDesignMode', 'dxp_util/idGenerator'], (function (exports, contentInfo, isDesignMode, idGenerator) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var isDesignMode__default = /*#__PURE__*/_interopDefaultCompat(isDesignMode);

    /**
     * Genereate a mock collection when it's in design mode
     *
     * @param {number} count how many items to generate
     * @returns {Array} mock collection or empty array
     */
    function generateMockCollection(count) {
      return isDesignMode__default.default ? idGenerator.generateIds("", count).map(id => ({
        key: id,
        data: {}
      })) : [];
    }

    const DATA_BIND_REGEX = /\{!Item\.(.+?)\}/g;
    const DATA_PROVIDER_GET_FIELD_DATA_EVENT_NAME = "dxp_data_provider__getfielddata";
    const DATA_PROVIDER_FIELD_METADATA_PREFIX = "_";
    const DATA_PROVIDER_DATA_ACCESS = `${DATA_PROVIDER_FIELD_METADATA_PREFIX}data`;
    const MASTER_RECORD_TYPE_ID = "012000000000000AAA";
    const SFDC_TYPES = {
      RECORD: "sfdc_record__",
      CMS: "sfdc_cms__"
    };
    const getFieldAndMetadata = fieldAndMetadata => {
      const fieldParts = fieldAndMetadata.split(".");
      if (fieldParts.length > 0 && fieldParts[fieldParts.length - 1].startsWith("_")) {
        // if a metadata access, determine if on data or on a field. ex. {!Item._data} vs {!Item.field._displayValue}
        const metadata = fieldParts[fieldParts.length - 1];
        const field = fieldParts.slice(0, fieldParts.length - 1);
        if (fieldParts.length === 1) {
          return [null, metadata];
        }
        return [field, metadata];
      }
      return [fieldAndMetadata, null];
    };

    /**
     * Normalize the content key
     *
     * @param {string} key content key to normalize
     * @returns {string} normalized content key
     */
    function normalizeContentKey(key) {
      // If content key has '-', then comes from the expression {!urlAlias} -> route param
      if (key?.includes("-")) {
        // content key is the last value divided by '-', (ex. we-still-meeting-today-MCKABCDYJW4ZCE5IECPBVBBLQY5I)
        return key.split("-").slice(-1)[0];
      }
      return key;
    }

    /**
     * Build field path with existing path and incoming field
     *
     * @param {string} existingPath current field path
     * @param {string} field appended field
     * @returns {string} combined path from existingPath and new path
     */
    function buildFieldPath(existingPath, field) {
      return !existingPath ? field : `${existingPath}.${field}`;
    }

    Object.defineProperty(exports, 'resolve', {
        enumerable: true,
        get: function () { return contentInfo.resolveUrl; }
    });
    exports.DATA_BIND_REGEX = DATA_BIND_REGEX;
    exports.DATA_PROVIDER_DATA_ACCESS = DATA_PROVIDER_DATA_ACCESS;
    exports.DATA_PROVIDER_FIELD_METADATA_PREFIX = DATA_PROVIDER_FIELD_METADATA_PREFIX;
    exports.DATA_PROVIDER_GET_FIELD_DATA_EVENT_NAME = DATA_PROVIDER_GET_FIELD_DATA_EVENT_NAME;
    exports.MASTER_RECORD_TYPE_ID = MASTER_RECORD_TYPE_ID;
    exports.SFDC_TYPES = SFDC_TYPES;
    exports.buildFieldPath = buildFieldPath;
    exports.generateMockCollection = generateMockCollection;
    exports.getFieldAndMetadata = getFieldAndMetadata;
    exports.normalizeContentKey = normalizeContentKey;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_data_provider/imageInfoLibrary', ['exports', 'dxp_data_provider/dataProviderUtils', 'dxp_util/common', 'experience/picture', 'experience/resourceResolver'], (function (exports, dataProviderUtils, common, picture, resourceResolver) {

    const DEVICE_WIDTH_SET = {
      mobile: 640,
      tablet: 960,
      desktop: 1920
    };
    const FORM_FACTOR_MEDIA_QUERY = {
      mobile: "",
      tablet: "(min-width: 47.9375em)",
      desktop: "(min-width: 64em)"
    };
    const DEVICE_DENSITY = [1];
    const IMAGE_INFO_AUXILIARY_PROPERTIES = ["bgPosition", "bgSizeOrRepeat"];

    /**
     * Extract content key from image info
     *
     * @param {object} imageInfo image info object
     * @returns {string} content-key
     */
    function computeContentKey(imageInfo) {
      if (!imageInfo) {
        return "";
      }
      let contentKey = imageInfo.imageInfoV1?.contentKey ||
      // imageInfoV1
      imageInfo.source?.ref?.contentKey ||
      // lightning__imageType
      imageInfo.image?.source?.ref?.contentKey ||
      // lightning__backgroundImageType
      imageInfo.contentKey ||
      // for non-nested image info
      "";
      // If the contentKeys are not populated for an image served from CMS(url will have /sfsites/c/cms/delivery/media), extract the contentKey manually
      if (!contentKey) {
        const reg = /(?:\/sfsites\/c\/cms\/delivery\/media\/)([^?]+)/,
          url = getFromImageInfo(imageInfo, "url");
        contentKey = url?.match(reg)?.[1] || "";
      }
      return dataProviderUtils.normalizeContentKey(contentKey);
    }

    /**
     * Extract key from image info
     *
     * @param {object} imageInfo image info object
     * @param {string} key of image info
     *
     * @returns {undefined|string} value of key in image info
     */
    function getFromImageInfo(imageInfo, key) {
      if (!key || !imageInfo) {
        return undefined;
      }

      // imageInfoV1
      if (imageInfo.imageInfoV1) {
        return imageInfo.imageInfoV1[key];
      }

      // lightning__backgroundImageType
      if (imageInfo.image) {
        imageInfo = imageInfo.image;
      }
      return imageInfo[key];
    }

    /**
     * Generate SrcSet
     *
     * @param {string} url url of given image
     * @returns {Array | undefined} set of url per device width
     */
    function generateRawSrcSet(url) {
      return picture.createImageDataMap(url, DEVICE_WIDTH_SET, DEVICE_DENSITY);
    }

    /**
     * Generate SrcSet
     *
     * @param {string} url url of given image
     * @returns {Array} set of url per device width
     */
    function generateSrcSet(url) {
      return generateRawSrcSet(url)?.map(image => ({
        ...image,
        // removing 1x from the url as it is default for srcSet and
        // of no use for background-image css-property
        srcSet: image.srcSet.split(/\s(\dx)/, 2),
        media: FORM_FACTOR_MEDIA_QUERY[image.formFactor]
      }));
    }

    /**
     * Extract additional image info properties like bgPosition from raw image info
     *
     * @param {object} raw raw info
     * @returns {object } auxiliary image properties
     */
    function getAuxiliaryImageInfoProperties(raw) {
      if (raw?._imageInfo && typeof raw._imageInfo === "object") {
        return IMAGE_INFO_AUXILIARY_PROPERTIES.reduce((result, prop) => prop in raw._imageInfo ? {
          ...result,
          [prop]: raw._imageInfo[prop]
        } : result, {});
      }
      return {};
    }

    /**
     * Generate sfdcData
     *
     * @param {object} raw raw info
     * @param {object} data cms data
     * @returns {object} sfdc data
     */
    function generateSfdcData(raw, data) {
      const url = data ? common.get(data, "contentBody.sfdc_cms:media.url") : raw.url;
      const srcSet = generateSrcSet(url);
      if (data) {
        const Picture = {
          Url: raw?.isLandingPageEditor?.() ? url : resourceResolver.resolve(url),
          RawUrl: url,
          AltText: raw.overrideAltText ? raw.imageAltText : common.get(data, "contentBody.altText") || "",
          SrcSet: srcSet,
          ...getAuxiliaryImageInfoProperties(raw)
        };
        return {
          ...data,
          Picture,
          Pictures: [Picture]
        };
      }
      const Picture = {
        Url: raw?.isLandingPageEditor?.() ? url : resourceResolver.resolve(url),
        RawUrl: raw.url,
        AltText: raw.imageAltText ?? "",
        SrcSet: srcSet,
        ...getAuxiliaryImageInfoProperties(raw)
      };
      return {
        Picture,
        Pictures: [Picture]
      };
    }

    /**
     * Generate bulk sfdcData
     *
     * @param {object} raw raw info
     * @param {object} data cms data
     * @returns {object | undefined} sfdc data
     */
    function generateBulkSfdcData(raw, data) {
      if (!data.contents || data.contents.length < 1) {
        return null;
      }
      const Pictures = data.contents.map(content => {
        const url = common.get(content, "contentBody.sfdc_cms:media.url");
        const srcSet = generateSrcSet(url);
        return {
          Url: resourceResolver.resolve(url),
          RawUrl: url,
          AltText: raw.overrideAltText ? raw.imageAltText : common.get(content, "contentBody.altText") || "",
          ContentKey: content.contentKey,
          SrcSet: srcSet,
          ...getAuxiliaryImageInfoProperties(raw)
        };
      });
      return {
        Picture: Pictures[0],
        Pictures
      };
    }

    /**
     * Normalize given url.
     *
     * @param {object} imageInfo image info object
     * @param {string} imageInfo.url image url
     * @param {string}  [fallback=""] fallback string, by default is empty string
     * @returns {string} normalized url string
     */
    function safeImageUrl(imageInfo, fallback = "") {
      if (typeof imageInfo === "string") {
        return imageInfo || fallback;
      }
      const {
        Url
      } = imageInfo ?? {};
      return common.hasUri(Url) ? Url : fallback;
    }

    /**
     * Get contentKeys from imageInfo.
     *
     * @param {object | Array} imageInfo image info object or contentKeys array
     * @returns {Array<string> | null} array of contentKeys
     */
    function getContentKeys(imageInfo) {
      let contentKeys;
      if (common.typeOf(imageInfo) === "object") {
        const contentKey = computeContentKey(imageInfo);
        contentKeys = contentKey ? [contentKey] : null;
      } else if (common.typeOf(imageInfo) === "array") {
        contentKeys = imageInfo.map(contentKey => dataProviderUtils.normalizeContentKey(contentKey));
      }
      return contentKeys;
    }

    /**
     * Get external url details
     *
     * @param {object | Array} imageInfo image info object or contentKeys array
     * @param {null | Array} contentKeys image info object or contentKeys array
     * @returns {object | undefined} array of contentKeys
     */
    function processExternalUrl(imageInfo, contentKeys) {
      if (common.typeOf(imageInfo) === "object" && imageInfo !== null && !(contentKeys?.length > 0)) {
        const imageAltText = getFromImageInfo(imageInfo, "altText") || "";
        const url = getFromImageInfo(imageInfo, "url");
        return {
          imageAltText,
          url
        };
      }
      return undefined;
    }

    /**
     * Get overrideAltText details
     *
     * @param {object | Array} imageInfo image info object or contentKeys array
     * @returns {object | undefined} array of contentKeys
     */
    function processOverrideAltText(imageInfo) {
      if (common.typeOf(imageInfo) === "object" && imageInfo !== null) {
        // overrideAltText overrides CMS AltText in es_base_components:image
        const overrideAltText = imageInfo.overrideAltText || false;
        const imageAltText = getFromImageInfo(imageInfo, "altText") || "";
        return {
          overrideAltText,
          imageAltText
        };
      }
      return undefined;
    }

    /**
     * Get url from the image info object
     *
     * @param {object} imageInfo image info object
     * @returns {string} the image url
     */
    function getDefaultUrl(imageInfo) {
      if (common.typeOf(imageInfo) === "object" && imageInfo !== null) {
        return getFromImageInfo(imageInfo, "url") || "";
      }
      return "";
    }

    /**
     * Get sfdcData with a url
     *
     * @param {string} url
     * @param {object} raw raw info
     * @returns {object} sfdcData with Picture key
     */
    function getSfdcDataWithUrl(url, raw) {
      return {
        Picture: {
          Url: resourceResolver.resolve(url),
          RawUrl: url,
          AltText: "",
          SrcSet: generateSrcSet(url),
          ...getAuxiliaryImageInfoProperties(raw)
        }
      };
    }

    /**
     * Get sfdcData with content-keys
     *
     * @param {array} contentKeys array of content keys
     * @returns {object} sfdcData with Pictures key
     */
    function getSfdcDataWithContentKeys(contentKeys) {
      const urls = contentKeys.map(contentKey => `/cms/delivery/media/${contentKey}`);
      return {
        Pictures: urls.map((url, i) => {
          return {
            Url: resourceResolver.resolve(url),
            RawUrl: url,
            AltText: "",
            SrcSet: generateSrcSet(url),
            ContentKey: contentKeys[i]
          };
        })
      };
    }

    exports.DEVICE_DENSITY = DEVICE_DENSITY;
    exports.IMAGE_INFO_AUXILIARY_PROPERTIES = IMAGE_INFO_AUXILIARY_PROPERTIES;
    exports.computeContentKey = computeContentKey;
    exports.generateBulkSfdcData = generateBulkSfdcData;
    exports.generateRawSrcSet = generateRawSrcSet;
    exports.generateSfdcData = generateSfdcData;
    exports.generateSrcSet = generateSrcSet;
    exports.getContentKeys = getContentKeys;
    exports.getDefaultUrl = getDefaultUrl;
    exports.getFromImageInfo = getFromImageInfo;
    exports.getSfdcDataWithContentKeys = getSfdcDataWithContentKeys;
    exports.getSfdcDataWithUrl = getSfdcDataWithUrl;
    exports.processExternalUrl = processExternalUrl;
    exports.processOverrideAltText = processOverrideAltText;
    exports.safeImageUrl = safeImageUrl;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/config', ['exports'], (function (exports) {

  const currentRelease = {
    currentRelease: '252',
    apiVersion: 'v62.0'
  };

  exports.currentRelease = currentRelease;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/cmsDeliveryApi', ['exports', 'experience/store', 'experience/config', 'experience/data', 'experience/utils'], (function (exports, store, config, data, utils) {

  const API_VERSION$1 = config.currentRelease.apiVersion;
  function getEndPointUrl$1(channelOrSiteId, contentKeyOrId) {
    if (channelOrSiteId.startsWith('0DM')) {
      return `/services/data/${API_VERSION$1}/connect/sites/${channelOrSiteId}/cms/delivery/contents/${contentKeyOrId}`;
    } else if (channelOrSiteId.startsWith('0ap')) {
      return `/services/data/${API_VERSION$1}/connect/cms/delivery/channels/${channelOrSiteId}/contents/${contentKeyOrId}`;
    }
    throw new TypeError("The 'channelOrSiteId' parameter is invalid");
  }
  async function getContent$1(options) {
    if (!utils.isPlainObject(options)) {
      throw new TypeError(`Options are required to successfully be able to execute this request.`);
    }
    if (typeof options.channelOrSiteId !== 'string' || options.channelOrSiteId.trim().length === 0) {
      throw new TypeError("The 'channelOrSiteId' parameter is required to successfully execute this request.");
    }
    if (typeof options.contentKeyOrId !== 'string' || options.contentKeyOrId.trim().length === 0) {
      throw new TypeError("The 'contentKeyOrId' parameter is required to successfully execute this request.");
    }
    const channelOrSiteId = encodeURIComponent(options.channelOrSiteId);
    const contentKeyOrId = encodeURIComponent(options.contentKeyOrId);
    const endPointUrl = getEndPointUrl$1(channelOrSiteId, contentKeyOrId);
    return data.fetchService(endPointUrl).catch(response => {
      throw new Error(response.statusText);
    });
  }
  const cmsStore = new store.Store('@@CmsDeliveryApi');
  function getContentLoader(action) {
    return getContent$1(action.payload);
  }

  const API_VERSION = config.currentRelease.apiVersion;
  const PATH_PARAM = ['channelOrSiteId'];
  const VALID_TYPES = {
    channelOrSiteId: 'string',
    contentKeys: 'array',
    managedContentIds: 'array',
    contentTypeFQN: 'string',
    page: 'number',
    pageSize: 'number',
    referenceDepth: 'number',
    includeContentBody: 'boolean'
  };
  const VALID_TYPE_VALUES = Object.values(VALID_TYPES).filter((type, index, self) => {
    return self.indexOf(type) === index;
  });
  function getEndPointUrl(channelOrSiteId, queryParams) {
    if (channelOrSiteId.startsWith('0DM')) {
      return data.composeUri(`/services/data/${API_VERSION}/connect/sites/${channelOrSiteId}/cms/delivery/contents`, queryParams);
    } else if (channelOrSiteId.startsWith('0ap')) {
      return data.composeUri(`/services/data/${API_VERSION}/connect/cms/delivery/channels/${channelOrSiteId}/contents`, queryParams);
    }
    throw new TypeError('Enter a valid prefix for channelOrSiteId.');
  }
  function isPathParam(param) {
    return PATH_PARAM.includes(param);
  }
  function isTypeValid(paramValue) {
    return VALID_TYPE_VALUES.includes(paramValue);
  }
  function isListType(type) {
    return type === 'array';
  }
  function isTypeMatch(value, type) {
    if (isListType(type)) {
      return Array.isArray(value);
    }
    return isTypeValid(type) && typeof value === type;
  }
  function isNotEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }
  function isBoolean(value) {
    return typeof value === 'boolean';
  }
  function getQueryParams(options) {
    const queryParams = {};
    for (const [optionKey, optionValue] of Object.entries(options)) {
      const optionType = VALID_TYPES[optionKey];
      if (isPathParam(optionKey) || utils.isNil(optionValue) || utils.isNil(optionType)) {
        continue;
      }
      if (!isTypeMatch(optionValue, optionType)) {
        if (optionType === 'array') {
          throw new TypeError(`The type entered for ${optionKey} isn’t valid. Enter the value as an ${optionType}.`);
        } else {
          throw new TypeError(`The type entered for ${optionKey} isn’t valid. Enter the value as a ${optionType}.`);
        }
      }
      if (isListType(optionType)) {
        const listOptionValue = optionValue.join(',');
        if (isNotEmptyString(listOptionValue)) {
          queryParams[optionKey] = listOptionValue;
        }
      }
      if (isNotEmptyString(optionValue) || utils.isInteger(optionValue) || isBoolean(optionValue)) {
        queryParams[optionKey] = optionValue.toString();
      }
    }
    return queryParams;
  }
  async function getContents$1(options) {
    if (!utils.isPlainObject(options)) {
      throw new TypeError(`Enter input parameters to execute the request.`);
    }
    if (!isNotEmptyString(options.channelOrSiteId)) {
      throw new TypeError('Enter a value for channelOrSiteId.');
    }
    const channelOrSiteId = encodeURIComponent(options.channelOrSiteId);
    const queryParams = getQueryParams(options);
    const endPointUrl = getEndPointUrl(channelOrSiteId, queryParams);
    return data.fetchService(endPointUrl).catch(response => {
      throw new Error(response.statusText);
    });
  }
  const cmsDeliveryListStore = new store.Store('@@CmsDeliveryListApi');
  function getContentsLoader(action) {
    return getContents$1(action.payload);
  }

  class getContent extends store.StoreAdapter {
    constructor(dataCallback) {
      super(dataCallback, cmsStore, 'content', {
        loader: getContentLoader
      });
    }
    /*LWC compiler v7.1.5*/
  }
  class getContents extends store.StoreAdapter {
    constructor(dataCallback) {
      super(dataCallback, cmsDeliveryListStore, 'contents', {
        loader: getContentsLoader
      });
    }
    /*LWC compiler v7.1.5*/
  }

  exports.getContent = getContent;
  exports.getContents = getContents;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/dataProvider', ['exports', 'lwc', 'experience/dataLayerObject', 'experience/utils'], (function (exports, lwc, _experienceDataLayerObject, utils) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var _experienceDataLayerObject__default = /*#__PURE__*/_interopDefaultCompat(_experienceDataLayerObject);

    const stc0 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {k: api_key, c: api_custom_element, i: api_iterator, s: api_slot, f: api_flatten} = $api;
      return api_flatten([$cmp.hasDataLayerObjects ? api_iterator($cmp.dataLayerObjects, function (dataLayerObject) {
        return api_custom_element("experience-data-layer-object", _experienceDataLayerObject__default.default, {
          props: {
            "scriptDataAttributes": dataLayerObject.attributes,
            "customObject": dataLayerObject.customObject
          },
          key: api_key(0, dataLayerObject.id)
        });
      }) : stc0, api_slot("", {
        key: 1,
        slotData: $cmp.dataProxyContext
      }, stc0, $slotset)]);
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = [""];
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-1cva0bnnf5d";
    tmpl.legacyStylesheetToken = "experience-dataProvider_dataProvider";
    lwc.freezeTemplate(tmpl);

    const DATA_PROVIDER_ACTION_EVENT_NAME = 'sfdc__dataprovider_action';
    class DataProviderActionEvent extends CustomEvent {
      constructor(type, payload, callbackOrOptions) {
        const options = {
          onSuccess: utils.isFunction(callbackOrOptions) ? callbackOrOptions : utils.isPlainObject(callbackOrOptions) && utils.isFunction(callbackOrOptions.onSuccess) ? callbackOrOptions.onSuccess : undefined,
          onError: utils.isFunction(callbackOrOptions) ? callbackOrOptions : utils.isPlainObject(callbackOrOptions) && utils.isFunction(callbackOrOptions.onError) ? callbackOrOptions.onError : undefined
        };
        super(DATA_PROVIDER_ACTION_EVENT_NAME, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            type,
            payload,
            options
          }
        });
      }
      /*LWC compiler v7.1.5*/
    }

    class DataProviderConnectionAdapter {
      constructor(dataCallback) {
        this.dataCallback = dataCallback;
      }
      update() {}
      connect() {
        this.dataCallback({
          connected: true
        });
      }
      disconnect() {
        this.dataCallback({
          connected: false
        });
      }
    }

    const registeredActionsMap = new WeakMap();
    function isDataProviderConstructor(obj) {
      return function evaluate(_obj) {
        if (utils.isFunction(_obj) && _obj.constructor === __lwc_component_class_internal.constructor) {
          return true;
        }
        const proto = _obj != null ? Object.getPrototypeOf(_obj) : null;
        if (proto != null) {
          return evaluate(proto);
        }
        return false;
      }(obj);
    }
    function getDataProviderConstructorChain(obj) {
      const chain = [];
      (function evaluate(_obj, isProvider) {
        if (isProvider) {
          chain.push(_obj);
        }
        const proto = _obj != null ? Object.getPrototypeOf(_obj) : null;
        if (isDataProviderConstructor(proto)) {
          evaluate(proto, true);
        }
      })(obj, isDataProviderConstructor(obj));
      return chain.reverse();
    }
    function registerAction(ctor, type, handler) {
      if (!isDataProviderConstructor(ctor)) {
        throw new TypeError(`[dataProvider] parameter 'ctor' needs to be a DataProvider constructor`);
      }
      if (typeof type !== 'string') {
        throw new TypeError(`[dataProvider] parameter 'type' needs to be a string`);
      }
      if (!utils.isFunction(handler)) {
        throw new TypeError(`[dataProvider] parameter 'handler' needs to be a function`);
      }
      if (!registeredActionsMap.has(ctor)) {
        registeredActionsMap.set(ctor, {});
      }
      const container = registeredActionsMap.get(ctor);
      if (Reflect.has(container, type)) {
        throw new TypeError(`[dataProvider] a handler has already been registered for action type '${type}'`);
      }
      container[type] = handler;
    }
    function getRegisteredActions(ctor) {
      return getDataProviderConstructorChain(ctor).reduce((acc, _ctor) => {
        if (registeredActionsMap.has(_ctor)) {
          const actionsMap = registeredActionsMap.get(_ctor);
          return {
            ...acc,
            ...actionsMap
          };
        }
        return acc;
      }, {});
    }

    const handleDataProviderActionEventFieldSymbol = Symbol('handleDataProviderActionEventField');
    const handleDataProviderActionEventSymbol = Symbol('handleDataProviderActionEvent');
    const SFDC_DATA_ATTRIBUTE = Symbol();
    const SFDC_PROVIDER_ATTRIBUTE = Symbol();
    class DataProvider extends lwc.LightningElement {
      wireConnectedState({
        connected
      }) {
        if (connected) {
          this.addEventListener(DATA_PROVIDER_ACTION_EVENT_NAME, this[handleDataProviderActionEventFieldSymbol]);
        } else {
          this.removeEventListener(DATA_PROVIDER_ACTION_EVENT_NAME, this[handleDataProviderActionEventFieldSymbol]);
        }
      }
      get sfdcData() {
        return this._sfdcData;
      }
      set sfdcData(value) {
        this._sfdcData = value;
      }
      get dataProxyContext() {
        return {
          [SFDC_DATA_ATTRIBUTE]: this.getData(),
          [SFDC_PROVIDER_ATTRIBUTE]: this
        };
      }
      hasData(_prop) {
        return true;
      }
      updateComponents() {
        // TODO: Remove once commerce data provider is updated.
      }
      getData() {
        return this.sfdcData;
      }
      get hasDataLayerObjects() {
        return !!this.dataLayerObjects && this.dataLayerObjects.length > 0;
      }
      constructor() {
        super();
        this[handleDataProviderActionEventFieldSymbol] = this[handleDataProviderActionEventSymbol].bind(this);
        this.sfdcFields = [];
        this.sfdcIsPreviewMode = false;
        this.sfdcType = void 0;
        this.sfdcExpressionKey = void 0;
        this.sfdcIsViewLevelDataProvider = false;
        this.generatedTemplate = void 0;
        this._sfdcData = void 0;
        this.dataLayerObjects = void 0;
        this._sfdcData = {};
      }
      [handleDataProviderActionEventSymbol](event) {
        if (event.defaultPrevented) {
          return;
        }
        const {
          detail,
          target
        } = event;
        const {
          type,
          payload,
          options
        } = detail;
        const actions = getRegisteredActions(Object.getPrototypeOf(this).constructor);
        if (Reflect.has(actions, type)) {
          event.preventDefault();
          event.stopPropagation();
          const hasSuccessCallback = utils.isFunction(options.onSuccess);
          const hasErrorCallback = utils.isFunction(options.onError);
          try {
            const result = actions[type].call(this, payload, this, target);
            if (result instanceof Promise) {
              result.then(value => {
                hasSuccessCallback && options.onSuccess?.call(undefined, value, true);
                return value;
              }, err => {
                if ("development" !== 'production') {
                  console.warn('[dataProvider] error during action execution:', err);
                }
                hasErrorCallback && options.onError?.call(undefined, err, false);
              });
            } else {
              hasSuccessCallback && options.onSuccess?.call(undefined, result, true);
            }
          } catch (err) {
            {
              console.warn('[dataProvider] error during action execution:', err);
            }
            hasErrorCallback && options.onError?.call(undefined, err, false);
          }
        }
      }
      /*LWC compiler v7.1.5*/
    }
    DataProvider.renderMode = 'light';
    DataProvider.preloadData = void 0;
    lwc.registerDecorators(DataProvider, {
      publicProps: {
        sfdcFields: {
          config: 0
        },
        sfdcIsPreviewMode: {
          config: 0
        },
        sfdcType: {
          config: 0
        },
        sfdcExpressionKey: {
          config: 0
        },
        sfdcIsViewLevelDataProvider: {
          config: 0
        },
        generatedTemplate: {
          config: 0
        },
        sfdcData: {
          config: 3
        }
      },
      publicMethods: ["hasData", "updateComponents", "getData"],
      track: {
        _sfdcData: 1
      },
      wire: {
        wireConnectedState: {
          adapter: DataProviderConnectionAdapter,
          method: 1,
          config: function ($cmp) {
            return {};
          }
        }
      },
      fields: ["dataLayerObjects"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(DataProvider, {
      tmpl: _tmpl,
      sel: "experience-data-provider",
      apiVersion: 62
    });

    exports.DataProviderActionEvent = DataProviderActionEvent;
    exports.SFDC_DATA_ATTRIBUTE = SFDC_DATA_ATTRIBUTE;
    exports.SFDC_PROVIDER_ATTRIBUTE = SFDC_PROVIDER_ATTRIBUTE;
    exports.default = __lwc_component_class_internal;
    exports.registerAction = registerAction;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_data_provider/imageDataProvider', ['exports', 'lwc', 'experience/dataLayerObject', 'experience/picture', 'experience/dataProvider', 'experience/cmsDeliveryApi', 'dxp_util/siteInfo', 'dxp_util/common', 'experience/store', 'dxp_data_provider/imageInfoLibrary'], (function (exports, lwc, _experienceDataLayerObject, _experiencePicture, DataProvider, cmsDeliveryApi, siteInfo, common, store, imageInfoLibrary) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var _experienceDataLayerObject__default = /*#__PURE__*/_interopDefaultCompat(_experienceDataLayerObject);
    var _experiencePicture__default = /*#__PURE__*/_interopDefaultCompat(_experiencePicture);
    var DataProvider__default = /*#__PURE__*/_interopDefaultCompat(DataProvider);

    const stc0 = [];
    const stc1 = {
      "slds-hide": true
    };
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {k: api_key, c: api_custom_element, i: api_iterator, fr: api_fragment, s: api_slot, f: api_flatten} = $api;
      return api_flatten([$cmp.hasDataLayerObjects ? api_iterator($cmp.dataLayerObjects, function (dataLayerObject) {
        return api_custom_element("experience-data-layer-object", _experienceDataLayerObject__default.default, {
          props: {
            "scriptDataAttributes": dataLayerObject.attributes,
            "customObject": dataLayerObject.customObject
          },
          key: api_key(0, dataLayerObject.id)
        });
      }) : stc0, $cmp.enableImageCache ? api_fragment(1, [api_custom_element("experience-picture", _experiencePicture__default.default, {
        classMap: stc1,
        props: {
          "url": $cmp.rawUrl,
          "images": $cmp.computedSrcSet
        },
        key: 2
      })], 0) : null, api_slot("", {
        key: 3,
        slotData: $cmp.dataProxyContext
      }, stc0, $slotset)]);
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = [""];
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-kiush5r3gi";
    tmpl.legacyStylesheetToken = "dxp_data_provider-imageDataProvider_imageDataProvider";
    lwc.freezeTemplate(tmpl);

    /**
     * Image Data Provider to handle image info
     *
     * @class ImageDataProvider
     * @extends DataProvider
     */
    class ImageDataProvider extends DataProvider__default.default {
      constructor(...args) {
        super(...args);
        // default is 'shadow'
        /**
         *  Internal data binding expression key
         *
         * @type {string}
         * @memberof ImageDataProvider
         */
        this.sfdcExpressionKey = void 0;
        this._imageInfo = void 0;
        /**
         * Disable image caching
         *
         * @type {boolean}
         * @memberof ImageDataProvider
         */
        this.enableImageCache = void 0;
        this._sfdcData = {
          Picture: {
            Url: "",
            RawUrl: "",
            AltText: ""
          },
          Pictures: []
        };
      }
      /**
       * Get the siteId for delivery API
       */
      get siteId() {
        return this.contentKeys?.length > 0 ? siteInfo.SiteInfo.SiteId : null;
      }
      get imageInfo() {
        return this._imageInfo;
      }
      set imageInfo(value) {
        // filtering null, undefined, "", 0, false
        if (!value) {
          return;
        }

        // imageInfo contains number, true, object and array
        this._imageInfo = common.safeParseJson(value);
        this.contentKeys = imageInfoLibrary.getContentKeys(this.imageInfo); // returns Array<string> | null

        const externalUrlDetails = imageInfoLibrary.processExternalUrl(this._imageInfo, this.contentKeys);
        this.url = externalUrlDetails?.url;
        this.imageAltText = externalUrlDetails?.imageAltText;
        if (this.url) {
          this.updateData();
        }
        const overrideAltTextDetails = imageInfoLibrary.processOverrideAltText(this._imageInfo);
        this.overrideAltText = overrideAltTextDetails?.overrideAltText;
        this.imageAltText = overrideAltTextDetails?.imageAltText;
      }
      get rawUrl() {
        return this._sfdcData.Picture?.RawUrl;
      }
      get computedSrcSet() {
        return imageInfoLibrary.generateRawSrcSet(this.rawUrl);
      }
      updateData(data) {
        this._sfdcData = imageInfoLibrary.generateSfdcData(this, data);
      }
      updateBulkData(data) {
        this._sfdcData = imageInfoLibrary.generateBulkSfdcData(this, data) ?? this._sfdcData;
      }

      /**
       * Wire method to get managed content from cmsDeliveryApi
       */
      wiredCMSDeliveryContents({
        data,
        error
      }) {
        if (data) {
          this.updateBulkData(data);
        }
        if (error) {
          if (common.typeOf(this._imageInfo) === "object") {
            // single image
            const defaultImageUrl = imageInfoLibrary.getDefaultUrl(this._imageInfo);
            // resourceResolver doesn't resolve path prepended with /sfsites/c
            const url = defaultImageUrl.replace(/\/sfsites\/c/, "");
            this._sfdcData = imageInfoLibrary.getSfdcDataWithUrl(url, this);
          } else if (Array.isArray(this.contentKeys)) {
            // multiple images
            this._sfdcData = imageInfoLibrary.getSfdcDataWithContentKeys(this.contentKeys);
          }
        }
      }

      /**
       * Method to be used for preloading data to support SSR
       *
       * @param {object} preloadRequestContext - Request context to preload the data
       */
      static async preloadData(preloadRequestContext) {
        const errors = [];
        const channelOrSiteId = siteInfo.SiteInfo.SiteId;
        const requestIndexesMap = [];
        const getContentRequestsCollection =
        // eslint-disable-next-line @locker/locker/distorted-element-attributes-getter
        preloadRequestContext.attributes.reduce((requests, {
          imageInfo
        }, index) => {
          const contentKeys = imageInfoLibrary.getContentKeys(common.safeParseJson(imageInfo));
          if (contentKeys?.length > 0 && channelOrSiteId) {
            requests.push(
            // eslint-disable-next-line @lwc/lwc/no-unexpected-wire-adapter-usages
            store.getStoreAdapterValue(cmsDeliveryApi.getContents, {
              channelOrSiteId,
              contentKeys,
              includeContentBody: true
            }));
            requestIndexesMap.push(index);
          }
          return requests;
        }, []);
        await Promise.allSettled(getContentRequestsCollection).then(results => {
          results.forEach((result, index) => {
            if (result.status === "rejected") {
              const imageInfo =
              // eslint-disable-next-line @locker/locker/distorted-element-attributes-getter
              preloadRequestContext.attributes[requestIndexesMap[index]]?.imageInfo;
              const contentKeys = imageInfoLibrary.getContentKeys(common.safeParseJson(imageInfo));
              const error = {
                provider: "imageDataProvider",
                reason: result.reason?.toString()
              };
              errors.push({
                ...error,
                url: `/connect/sites/${siteInfo.SiteInfo.SiteId}/cms/delivery/contents/${contentKeys.join()}`
              });
            }
          });
        });
        return errors.length ? Promise.reject(new Error(JSON.stringify(errors))) : Promise.resolve();
      }
      /*LWC compiler v7.1.5*/
    }
    /**
     * Enable the component to render as lightDOM
     *
     * @static
     */
    ImageDataProvider.renderMode = "light";
    lwc.registerDecorators(ImageDataProvider, {
      publicProps: {
        sfdcExpressionKey: {
          config: 0
        },
        enableImageCache: {
          config: 0
        },
        imageInfo: {
          config: 3
        }
      },
      track: {
        _imageInfo: 1
      },
      wire: {
        wiredCMSDeliveryContents: {
          adapter: cmsDeliveryApi.getContents,
          dynamic: ["channelOrSiteId", "contentKeys"],
          method: 1,
          config: function ($cmp) {
            return {
              includeContentBody: true,
              channelOrSiteId: $cmp.siteId,
              contentKeys: $cmp.contentKeys
            };
          }
        }
      },
      fields: ["_sfdcData"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(ImageDataProvider, {
      tmpl: _tmpl,
      sel: "dxp_data_provider-image-data-provider",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_data_provider/dataProxy', ['exports', 'lwc', 'experience/dataProvider'], (function (exports, lwc, dataProvider) {

    var _tmpl = void 0;

    /**
     * Check if data is available
     *
     * @param {object} sfdcData data from the data provider
     * @param {string} name name of the data
     * @returns {boolean} true if the data is available
     */
    function hasData(sfdcData, name) {
      return sfdcData?.[dataProvider.SFDC_PROVIDER_ATTRIBUTE]?.hasData?.(name) ?? true;
    }

    /**
     * Return either .data or the sfdcData itself
     *
     * @param {object} sfdcData data from the data provider
     * @returns {object} actual data
     */
    function getData(sfdcData) {
      return sfdcData?.[dataProvider.SFDC_DATA_ATTRIBUTE] ?? sfdcData;
    }

    /**
     * Data Proxy to render generated template
     *
     * Data Proxy expect sfdcData is following DataProviderData<T> | T
     *
     * @class DataProxy
     */
    class DataProxy extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        // default is 'shadow'
        /**
         * Initial router container view to render, used for SSRed pages
         * both for server rendering and client hydration.
         * This is passed to webruntime-router-container.
         */
        this.routerContainerView = void 0;
        /**
         * Initial route params, used for SSRed pages
         * both for server rendering and client hydration
         */
        this.routeParams = void 0;
        this.attributes = {};
        this._sfdcData = void 0;
        this.generated = void 0;
        this.html = void 0;
      }
      /**
       * Accepts a generated template to render and a map of attributes for the components
       * in the template
       *
       * @type {object}
       * @memberof DataProxy
       */
      get generatedTemplate() {
        return this.generated;
      }
      set generatedTemplate(generated) {
        this.generated = generated;
        this.html = generated.html;
        // eslint-disable-next-line @locker/locker/distorted-element-attributes-getter
        this.attributes = this.evaluateAttributes(generated.attributes);
        this.updateComponents();
      }

      /**
       * Sfdc Data attribute
       *
       * DataProviderData<T> | T
       *
       * @type {object}
       * @memberof DataProxy
       */
      get sfdcData() {
        return this._sfdcData;
      }
      set sfdcData(value) {
        this._sfdcData = value;
        this.updateComponents();
      }
      hasData(name) {
        return hasData(this.sfdcData, name);
      }
      getData() {
        // Return symbolized data attributes or sfdcData itself
        return getData(this.sfdcData);
      }

      /**
       * If a data provider receives data to update the template with the new data,
       * it needs to call this function
       */
      updateComponents() {
        // Update any elements that are bound to data
        if (this.generatedTemplate) {
          this.attributes = this.evaluateAttributes(this.generatedTemplate.attributes);
        }
      }
      connectedCallback() {
        this.updateComponents();
      }

      /**
       * Injects the data into the attribute map, so the components can have the data
       *
       * @param {Function} [attr]  - function returning the map of attributes for the components
       * @returns {object} map of attributes
       */
      evaluateAttributes(attr) {
        if (typeof attr === "function") {
          return attr(this);
        }
        return {};
      }
      render() {
        return this.html;
      }
      /*LWC compiler v7.1.5*/
    }
    /**
     * Enable the component to render as lightDOM
     *
     * @static
     */
    DataProxy.renderMode = "light";
    lwc.registerDecorators(DataProxy, {
      publicProps: {
        routerContainerView: {
          config: 0
        },
        routeParams: {
          config: 0
        },
        generatedTemplate: {
          config: 3
        },
        sfdcData: {
          config: 3
        }
      },
      publicMethods: ["hasData", "getData", "updateComponents"],
      track: {
        attributes: 1,
        _sfdcData: 1
      },
      fields: ["generated", "html"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(DataProxy, {
      tmpl: _tmpl,
      sel: "dxp_data_provider-data-proxy",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
LWR.define('@salesforce/site/activeLanguages', [], function() { return [{"label":"English (US)","code":"en-US","default":true}]; });
LWR.define('@luvio/lwc-bindings', ['force/luvioLwcBindings'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
(function() { LWR.define('experience/seoPropertiesApiInternal', ['exports', 'lwc', '@luvio/runtime', 'experience/data', 'experience/uri', 'experience/config'], (function (exports, lwc, runtime, data, uri, config) {

  const SEO_PROPERTIES_RECORD_NAMESPACE = 'experience';
  const SEO_PROPERTIES_RECORD_TYPE_NAME = 'SeoProperties';
  const seoPropertiesRepresentationType = new runtime.OpaqueRepresentationType(SEO_PROPERTIES_RECORD_NAMESPACE, SEO_PROPERTIES_RECORD_TYPE_NAME, 60 * 60 * 1000, keyParams => {
    const {
      fields
    } = keyParams;
    const params = fields ? fields.split(',').sort() : [];
    return `${SEO_PROPERTIES_RECORD_NAMESPACE}::${SEO_PROPERTIES_RECORD_TYPE_NAME}:${keyParams.communityId}:${keyParams.recordId}:${params}`;
  });

  const API_VERSION = config.currentRelease.apiVersion;
  class GetSeoPropertiesRegistryCachePolicyCommand extends runtime.TypeRegistryCachePolicyCommand {
    constructor(...args) {
      super(...args);
      this.returnTypeNamespace = SEO_PROPERTIES_RECORD_NAMESPACE;
      this.returnTypeName = SEO_PROPERTIES_RECORD_TYPE_NAME;
    }
    buildKeyConfig() {
      return this.config;
    }
    buildKeyConfigFromInstance() {
      return this.config;
    }
    get configJsonSchema() {
      return {
        type: 'object',
        properties: {
          communityId: {
            type: 'string'
          },
          recordId: {
            type: 'string'
          },
          fields: {
            type: 'string'
          }
        },
        required: ['communityId', 'recordId'],
        additionalProperties: false
      };
    }
    fetch() {
      const {
        communityId,
        recordId,
        fields
      } = this.config;
      const api = `/services/data/${API_VERSION}/connect/communities/${communityId}/seo/properties/${recordId}`;
      const params = fields ? {
        fields
      } : {};
      return this.convertFetchResponseToData(data.fetchService(uri.composeUri(api, params)));
    }
    async convertFetchResponseToData(apiResponse) {
      try {
        const response = await apiResponse;
        return {
          data: response,
          errors: []
        };
      } catch (reason) {
        const errors = [];
        if (reason instanceof Error) {
          errors.push(reason);
        } else if (reason instanceof Response) {
          errors.push(new Error(`${reason.statusText}`));
        }
        return {
          data: undefined,
          errors: errors
        };
      }
    }
    /*LWC compiler v7.1.5*/
  }
  lwc.registerDecorators(GetSeoPropertiesRegistryCachePolicyCommand, {
    fields: ["returnTypeNamespace", "returnTypeName"]
  });

  exports.GetSeoPropertiesRegistryCachePolicyCommand = GetSeoPropertiesRegistryCachePolicyCommand;
  exports.seoPropertiesRepresentationType = seoPropertiesRepresentationType;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/luvioRuntime', ['exports', '@luvio/registry'], (function (exports, registry) {

  function registerAdapter(setCommandRuntime) {
    registry.register({
      id: 'commandModule',
      runtimeDependencies: {
        cacheInclusionPolicy: true,
        cachePolicies: true,
        defaultCachePolicyName: true,
        keySubscriptionService: true,
        metadataRepository: true,
        store: true,
        typeRegistry: true
      },
      setCommandRuntime: setCommandRuntime
    });
  }

  exports.registerAdapter = registerAdapter;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/seoPropertiesApi', ['exports', '@luvio/lwc-bindings', 'experience/luvioRuntime', 'experience/seoPropertiesApiInternal'], (function (exports, lwcBindings, luvioRuntime, seoPropertiesApiInternal) {

  exports.getSeoProperties = void 0;
  luvioRuntime.registerAdapter(commandRuntime => {
    commandRuntime.typeRegistry.register(seoPropertiesApiInternal.seoPropertiesRepresentationType);
    return {
      getSeoProperties: exports.getSeoProperties = class extends lwcBindings.CommandWireAdapterConstructor {
        getCommand() {
          return new seoPropertiesApiInternal.GetSeoPropertiesRegistryCachePolicyCommand(this.config, {}, commandRuntime);
        }
        /*LWC compiler v7.1.5*/
      }
    };
  });

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('community_builder/seoAssistant', ['exports', 'lwc', 'experience/seoPropertiesApi', 'lightning/navigation', '@salesforce/community/Id', '@salesforce/community/basePath', '@salesforce/site/activeLanguages', '@salesforce/i18n/lang'], (function (exports, lwc, seoPropertiesApi, navigation, CommunityId, basePath, activeLanguages, activeLanguageCode) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var CommunityId__default = /*#__PURE__*/_interopDefaultCompat(CommunityId);
    var basePath__default = /*#__PURE__*/_interopDefaultCompat(basePath);
    var activeLanguages__default = /*#__PURE__*/_interopDefaultCompat(activeLanguages);
    var activeLanguageCode__default = /*#__PURE__*/_interopDefaultCompat(activeLanguageCode);

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var hostSelector = token ? ("[" + token + "-host]") : "";
      return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: none;}";
      /*LWC compiler v7.1.5*/
    }
    var _implicitStylesheets = [stylesheet];

    const stc0 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      return stc0;
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-67g9kuprkgf";
    tmpl.legacyStylesheetToken = "community_builder-seoAssistant_seoAssistant";
    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    const fieldPatternToMatch = new RegExp(`\\{!(Record|Content)[\\.\\w:]+\\}`, 'g');
    const fieldExpPartToStrip = new RegExp(`\\{!(Record|Content)\\.|\\}`, 'g');
    const recordNameRegex = new RegExp('\\{!(Record|Content)\\._Title\\}', 'g');
    const objectNameRegex = new RegExp('\\{!(Record|Content)\\._Object\\}', 'g');
    const singleQuoteRegex = new RegExp("'", 'g');
    const doubleQuoteRegex = new RegExp('"', 'g');

    /**
     * Removes existing SEO properties set by this component and sets new resolved SEO properties
     * in the head markup of the page.
     *
     * TODO: Move this to an event handler because 'document' level DOM queries are not allowed in a component.
     *
     * @param {Object} recordData Record fields and values
     * @param {Object} unresolvedProperties
     * @param {Object} siteInfo SiteInfo containing basePath, activateLanguageCode, activeLanguages
     * @returns resolved SEO property
     */
    function setSeoProperties(recordData, unresolvedProperties, siteInfo) {
      const seoProperties = processSeoProperties(recordData, unresolvedProperties);
      if (seoProperties.title) {
        document.title = seoProperties.title;
      }
      if (seoProperties.description) {
        setDescription(seoProperties.description);
      }
      if (seoProperties.customHeadTags) {
        setCustomHeadTags(seoProperties.customHeadTags);
      }
      setLanguageLinkTags(recordData.hrefLangUrls, siteInfo);
      setCanonicalTag(recordData.canonicalUrl);
      setNoIndexTag(recordData.isSeoIndexed);
    }
    function setDescription(description) {
      const attributes = {
        name: 'description',
        content: description
      };
      const metaElement = createSEOElement('meta', attributes);
      document.head.appendChild(metaElement);
    }
    function setCustomHeadTags(customHeadTags) {
      Object.entries(customHeadTags).forEach(([tagType, tags]) => {
        tags.forEach(attributes => {
          const element = createSEOElement(tagType, attributes);
          document.head.appendChild(element);
        });
      });
    }
    function setCanonicalTag(canonicalUrl) {
      if (!canonicalUrl) {
        return;
      }
      const elem = document.createElement('link');
      elem.setAttribute('rel', 'canonical');
      elem.setAttribute('href', canonicalUrl);
      elem.setAttribute('data-owner', 'setSEOProperties');
      document.head.appendChild(elem);
    }
    function setNoIndexTag(isSeoIndexed) {
      if (!(isSeoIndexed === false)) {
        return;
      }
      const attributes = {
        name: 'robots',
        content: 'noindex,nofollow'
      };
      const metaElement = createSEOElement('meta', attributes);
      document.head.appendChild(metaElement);
    }
    function setLanguageLinkTags(hrefLangUrls = {}, siteInfo) {
      const basePath = siteInfo.basePath;
      const pathname = window.location.pathname;
      const origin = window.location.origin;
      const activeLanguage = siteInfo.activeLanguageCode;

      // If there is only one site language, this should mean only the base language exists
      // Do not add language link tags
      if (siteInfo.activeLanguages.length === 1) {
        return;
      }
      let pagePath = pathname;
      if (basePath !== '' && pathname.includes(basePath)) {
        // For the cases where the langCode is included with the page path (ie /fr/test-page)
        pagePath = pathname.split(basePath)[1];
      }
      siteInfo.activeLanguages.forEach(lang => {
        const langCode = lang.code;
        // Use server-constructed lang url if it exists
        let translationUrl = hrefLangUrls[convertLanguageCode(langCode)];

        // For special cases like articles, all translations may not exist, so we need
        // to exclude link tags for those languages entirely. The API will pass excluded
        // hreflangUrls as an empty value for those languages.
        if (translationUrl === '') {
          return;
        }

        // Non-record based URLs, construct on client
        if (!translationUrl) {
          let newBasePath;
          if (!basePath.endsWith('/' + activeLanguage)) {
            if (langCode === activeLanguage || lang.default) {
              newBasePath = basePath;
            } else {
              newBasePath = `${basePath}/${langCode}`;
            }
          } else {
            // look for exact match /activeLanguage at the end of the string
            const pattern = new RegExp(`/${activeLanguage}$`);
            const newLangPath = lang.default ? '' : '/' + langCode;
            newBasePath = basePath.replace(pattern, newLangPath);
          }
          translationUrl = `${origin}${newBasePath}${pagePath}`;
          if (newBasePath === '' && pagePath === '/') {
            // Use origin if URL does not have any path prefix (ie. www.sample.com)
            translationUrl = origin;
          }
        }
        createAlternateLinkTag(langCode.toLowerCase(), translationUrl);
        if (lang.default === true) {
          createAlternateLinkTag('x-default', translationUrl);
        }
      });
    }
    function createAlternateLinkTag(hrefLang, url) {
      const attributes = {
        rel: 'alternate',
        hreflang: hrefLang,
        href: url
      };
      const linkElement = createSEOElement('link', attributes);
      document.head.appendChild(linkElement);
    }
    function createSEOElement(tag, attributes) {
      const elem = document.createElement(tag);
      Object.entries(attributes).forEach(([name, value]) => {
        if (name === 'innerHTML') {
          // eslint-disable-next-line @lwc/lwc/no-inner-html
          elem.innerHTML = value;
        } else {
          elem.setAttribute(name, value);
        }
      });
      elem.setAttribute('data-owner', 'setSEOProperties');
      return elem;
    }

    /**
     * For translation lookup map, need to replace - with _ (ie. en-US with en_US)
     * @param {String} langCode Language code to format
     * @returns Converted language code
     */
    function convertLanguageCode(langCode) {
      return langCode.replace('-', '_');
    }

    /**
     * Removes all meta tags set by this component from the head markup
     */
    function cleanUpTags() {
      const metaElements = document.head.querySelectorAll('head [data-owner=setSEOProperties]');
      metaElements.forEach(node => node.parentNode.removeChild(node));
    }

    /**
     * Parse SEO properties and extract object field names from the expression used in them.
     *
     * @param string recordData Record fields and values
     * @returns resolved SEO properties
     */
    function getNeedRecordAndQueryFields(pageTitle, description, metaTags) {
      const seoProperties = [pageTitle, description, metaTags];
      const allFields = seoProperties.filter(prop => prop && prop.search(fieldPatternToMatch) > -1).flatMap(prop => prop.match(fieldPatternToMatch).map(val => val.replace(fieldExpPartToStrip, '')));
      const needRecord = allFields.length > 0;

      // '_name' expressions are not actual record fields but properties of the entity (E.g. name field, entity label).
      // They cannot be queried directly so we don't pass them to the API. They are included by default in the returned
      // value (if possible).
      const queryFields = Array.from(new Set(allFields.filter(field => !field.startsWith('_'))));
      return {
        needRecord,
        queryFields: queryFields.join()
      };
    }

    /**
     * Resolves all expressions in each SEO property using record information,
     * returns properties unchanged if there is no record data.
     *
     * @param {Object} recordData Record fields and values
     * @returns resolved SEO properties
     */
    function processSeoProperties(recordData, unresolvedProperties) {
      const resolvedProperties = {};
      if (unresolvedProperties.title) {
        resolvedProperties.title = resolveFieldsEL(recordData, unresolvedProperties.title, false);
      }
      if (unresolvedProperties.description) {
        resolvedProperties.description = resolveFieldsEL(recordData, unresolvedProperties.description, true);
      }
      if (unresolvedProperties.customHeadTags) {
        resolvedProperties.customHeadTags = convertCustomHeadTagsToJson(resolveFieldsEL(recordData, unresolvedProperties.customHeadTags, true));
      }
      return resolvedProperties;
    }

    /**
     * Resolves an expression using record information
     *
     * @param {Object} recordData Record fields and values
     * @param expression The expression to resolve
     * @returns resolved SEO property
     */
    function resolveFieldsEL(recordData, expression, isEscapedProperty) {
      if (!expression || !Object.keys(recordData).length > 0) {
        return expression;
      }
      expression = expression.replace(recordNameRegex, recordData.recordName);
      expression = expression.replace(objectNameRegex, recordData.objectName);
      expression = processFields(expression, recordData.fields, isEscapedProperty, false);
      if (recordData.complexFields) {
        expression = processFields(expression, recordData.complexFields, false, true);
      }
      return expression;
    }

    /**
     * Iterate through a map of fields, resolving each expression. Complex fields must be resolved such that
     * the quotation marks are replaced in the HTML string, along with the expression.
     *
     * An example complex value is BreadcrumbList, whose value is an array of objects. If the quotation
     * marks are not removed, the value will be a string, which deviates from schema.org/BreadcrumbList.
     *
     * @param {Object} fields The record fields/values to be iterated over
     * @param expression The HTML string for a tag to be resolved
     * @returns SEO property with expression language replaced with record data
     */
    function processFields(expression, fields, isEscapedProperty, isComplexFields) {
      Object.entries(fields).filter(([name]) => name).forEach(([name, value]) => {
        //For any complex values, replace quotation marks and EL in the HTML.
        const fieldPattern = value && isComplexFields ? new RegExp(`\\"\\{!(Record|Content)\\.${name}\\}\\"`, 'g') : new RegExp(`\\{!(Record|Content)\\.${name}\\}`, 'g');
        if (!value) {
          expression = expression.replace(fieldPattern, '');
        } else if (isEscapedProperty && !isCmsHeadTag(name)) {
          // Values that go in an HTML tag's attribute need to be escaped.
          const escapedValue = value.replace(singleQuoteRegex, '&apos;').replace(doubleQuoteRegex, '&quot;');
          expression = expression.replace(fieldPattern, escapedValue);
        } else {
          expression = expression.replace(fieldPattern, value);
        }
      });
      return expression;
    }

    /**
     * TODO(@W-15250243)
     * This is a hack to unblock landing pages for 250. Head tags are
     * getting escaped and then encoded, which breaks the DomParser.
     * Until we implement server-side sanitation, just skip over the
     * cms head tag expression.
     * @param name of the property
     * @returns if property is for the cms headtag
     */
    function isCmsHeadTag(name) {
      return name === 'Body.sfdc_cms:seoProperties.headTags';
    }

    /**
     * Convert head tags from HTML format to JSON
     *
     * @param htmlString Meta tags in HTML format
     * @returns resolved SEO property
     */
    function convertCustomHeadTagsToJson(htmlString) {
      const headDOM = getHeadDOM(htmlString);
      let customHeadTagsJson = {};
      if (headDOM) {
        // headDOM is null when PhantomJS renders the page.
        let metaTagsJson = [];
        let linkTagsJson = [];
        let scriptTagsJson = [];
        let tags = Array.from(headDOM.querySelectorAll('head meta, head link, head script'));
        tags.forEach(tag => {
          const node = {};
          convertAttributesNamedNodeMapToArray(tag.attributes).filter(attr => attr && attr.name && attr.value).map(attr => node[attr.name] = attr.value);
          if (tag.tagName === 'META') {
            metaTagsJson.push(node);
          } else if (tag.tagName === 'SCRIPT') {
            // eslint-disable-next-line @lwc/lwc/no-inner-html
            node.innerHTML = tag.innerHTML;
            scriptTagsJson.push(node);
          } else {
            linkTagsJson.push(node);
          }
        });
        customHeadTagsJson.meta = metaTagsJson;
        customHeadTagsJson.link = linkTagsJson;
        customHeadTagsJson.script = scriptTagsJson;
      }
      return customHeadTagsJson;
    }

    /**
     * Head tags are set as plain HTML input but setSEOProperties needs tags in a JSON format, so we build a DOM
     * from the htmlString.
     *
     * @param htmlString Head tags in HTML format
     * @returns DOM representation of head tags HTML
     */
    function getHeadDOM(htmlString) {
      const parser = new DOMParser();
      return parser.parseFromString(htmlString, 'text/html');
    }

    /**
     * Converts a tag's attribute NamedNodeMap to an array because it is not iterable.
     *
     * @param attributes NamedNodeMap representation of attributes
     */
    function convertAttributesNamedNodeMapToArray(attributes) {
      const attributeArray = [];
      for (let i = 0; i < attributes.length; i++) {
        attributeArray.push(attributes[i]);
      }
      return attributeArray;
    }

    class SeoAssistant extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        // Private version of pageTitle
        this._pageTitle = void 0;
        // Private version of description
        this._description = void 0;
        // Private version of head tags
        this._customHeadTags = void 0;
        /**
         * Context RecordId on object pages.
         *
         * @type {string}
         */
        this.recordId = void 0;
        /**
         * Main param used to query SEO properties. It can be a recordId or a urlAlias.
         *
         * @type {string}
         */
        this.queryKey = void 0;
        /**
         * Fields (comma-separated) used in SEO properties' expressions which need to be queried.
         *
         * @type {string}
         */
        this.queryFields = void 0;
        /**
         * Flag to decide if an API call is needed to fetch record data.
         *
         * @type {Boolean}
         */
        this.needRecord = false;
        /**
         * Record data including field values used to set properties' tags
         *
         * @type {Object}
         */
        this.recordData = {};
      }
      /**
       * Document title displayed in the browser and search result.
       *
       * @type {string}
       */
      get pageTitle() {
        return this._pageTitle;
      }
      set pageTitle(_pageTitle) {
        this._pageTitle = _pageTitle;
        this.getFieldsAndSetProperties();
      }
      /**
       * Content of the description meta tag.
       *
       * @type {string}
       */
      get description() {
        return this._description;
      }
      set description(_description) {
        this._description = _description;
        this.getFieldsAndSetProperties();
      }
      /**
       * Additional head tags in plain HTML form.
       *
       * @type {string}
       */
      get customHeadTags() {
        return this._customHeadTags;
      }
      set customHeadTags(_customHeadTags) {
        this._customHeadTags = _customHeadTags;
        this.getFieldsAndSetProperties();
      }
      /**
       * Check fields to query when the component is initialized. Set the raw properties directly if
       * there's no need to get data.
       */
      connectedCallback() {
        if (typeof window !== 'undefined') {
          this.getFieldsAndSetProperties();
        }
      }

      /**
       * Remove all tags set by this component at the end of its lifecycle.
       */
      disconnectedCallback() {
        if (typeof window !== 'undefined') {
          cleanUpTags();
        }
      }

      /**
       * Get the query key (recordId or urlAlias) from the page reference
       *
       * @param {*} data page reference wire response
       */
      wiredPageRef(data) {
        if (data) {
          const attributes = data.attributes;
          if (attributes.recordId) {
            this.queryKey = attributes.recordId;
          } else if (attributes.urlAlias) {
            this.queryKey = attributes.urlAlias;
          }
        }
      }

      /**
       * Set the field-based properties using the record data returned by the API
       *
       * @param {*} param SEO properties wire response
       */
      wiredRecordSeoProperties({
        error,
        data
      }) {
        if (this.needRecord && data) {
          Object.assign(this.recordData, data);
          this.getFieldsAndSetProperties();
        } else if (error) {
          this.error = error;
        }
      }

      /**
       * Parse SEO properties and extract object field names from the expression used in them, if any.
       * Set the SEO properties in the DOM if record information is not needed or is already
       * fetched.
       */
      getFieldsAndSetProperties() {
        const result = getNeedRecordAndQueryFields(this.pageTitle, this.description, this.customHeadTags);
        this.needRecord = result.needRecord;
        this.queryFields = result.queryFields;
        const siteInfo = {
          basePath: basePath__default.default,
          activeLanguageCode: activeLanguageCode__default.default,
          activeLanguages: activeLanguages__default.default
        };

        // When the properties don't rely on record information, they can be set right away,
        // without needing to wait for the API call. Otherwise, only set the properties when
        // we have record data from the API.
        // setSeoProperties could be called multiple times when any property is set, so clean up
        // before setting each time to avoid duplicate tags.
        if (typeof window !== 'undefined') {
          if (!this.needRecord) {
            cleanUpTags();
            setSeoProperties({}, this.getUnresolvedProperties(), siteInfo);
          } else if (Object.entries(this.recordData).length !== 0) {
            cleanUpTags();
            setSeoProperties(this.recordData, this.getUnresolvedProperties(), siteInfo);
          }
        }
      }

      /**
       * Get SEO properties in their original form, where they might still contain expressions.
       */
      getUnresolvedProperties() {
        const unresolvedProperties = {};
        unresolvedProperties.title = this.pageTitle;
        unresolvedProperties.description = this.description;
        unresolvedProperties.customHeadTags = this.customHeadTags;
        return unresolvedProperties;
      }
      /*LWC compiler v7.1.5*/
    }
    SeoAssistant.renderMode = 'light';
    lwc.registerDecorators(SeoAssistant, {
      publicProps: {
        pageTitle: {
          config: 3
        },
        description: {
          config: 3
        },
        customHeadTags: {
          config: 3
        },
        recordId: {
          config: 0
        }
      },
      track: {
        queryKey: 1,
        queryFields: 1
      },
      wire: {
        wiredPageRef: {
          adapter: navigation.CurrentPageReference,
          method: 1,
          config: function ($cmp) {
            return {};
          }
        },
        wiredRecordSeoProperties: {
          adapter: seoPropertiesApi.getSeoProperties,
          dynamic: ["recordId", "fields"],
          method: 1,
          config: function ($cmp) {
            return {
              communityId: CommunityId__default.default,
              recordId: $cmp.queryKey,
              fields: $cmp.queryFields
            };
          }
        }
      },
      fields: ["_pageTitle", "_description", "_customHeadTags", "needRecord", "recordData"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(SeoAssistant, {
      tmpl: _tmpl,
      sel: "community_builder-seo-assistant",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('dxp_data_provider/userDataProvider', ['exports', '@salesforce/loader', 'lwc', 'experience/dataLayerObject', 'experience/dataProvider'], (function (exports, loader, lwc, _experienceDataLayerObject, DataProvider) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var _experienceDataLayerObject__default = /*#__PURE__*/_interopDefaultCompat(_experienceDataLayerObject);
    var DataProvider__default = /*#__PURE__*/_interopDefaultCompat(DataProvider);

    const stc0 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {c: api_custom_element, s: api_slot} = $api;
      return [api_custom_element("experience-data-layer-object", _experienceDataLayerObject__default.default, {
        props: {
          "scriptDataAttributes": $cmp.dataAttributes,
          "customObject": $cmp.userDataLayer
        },
        key: 0
      }), api_slot("", {
        key: 1,
        slotData: $cmp.dataProxyContext
      }, stc0, $slotset)];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = [""];
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-1qlnuek0fto";
    tmpl.legacyStylesheetToken = "dxp_data_provider-userDataProvider_userDataProvider";
    lwc.freezeTemplate(tmpl);

    /**
     * Data provider that provides User data. Used in data binding
     * feature to fetch data on the client side.
     *
     * @extends DataProvider
     */

    class UserDataProvider extends DataProvider__default.default {
      constructor(...args) {
        super(...args);
        // default is 'shadow'
        this.sfdcExpressionKey = void 0;
        this.childData = void 0;
        this.userId = void 0;
        this.isGuest = void 0;
      }
      triggerAsyncImports() {
        // Trigger async import for guest module only if its undefined
        if (this.isGuest === undefined) {
          loader.load("@salesforce/user/isGuest").then(res => {
            this.isGuest = res.default;
            // Trigger async import for userId module only if isGuest is false
            if (this.isGuest === false) {
              loader.load("@salesforce/user/Id").then(userIdModule => {
                this.userId = userIdModule.default;
              });
            }
          });
        }
      }
      get sfdcData() {
        return {
          userId: this.userId,
          isGuest: this.isGuest,
          ...this.childData
        };
      }
      hasData(prop) {
        /* W-13769938 Bug fix: Return true for guest user.
         * Expressions Framework relies on hasData before evaluating any expression. If hasData is false then it throws Error.
         * For guest user only isGuest property is present, while 'userId' and 'Record' are not.
         * So if we have EXPR1 = User.Record.City == "ABC"  EXPR2 = User.isGuest == true. And Rule as: EXPR1 || EXPR2.
         * In case of guest user EXPR1 would throw error, which led to further expressions in OR condition (EXPR2)not being evaluated.
         * Thus this bug was observed.
         */
        return this.isGuest || this.sfdcData[prop] !== undefined;
      }

      //We should use getData() method instead of this in future when all the data from user will be fed to data layer
      get userDataLayer() {
        return {
          crmId: this.userId,
          attributes: {
            isGuest: this.isGuest
          }
        };
      }
      get dataAttributes() {
        var attributes = {
          providerType: "user"
        };
        return attributes;
      }
      connectedCallback() {
        this.triggerAsyncImports();
      }
      render() {
        return _tmpl;
      }
      /*LWC compiler v7.1.5*/
    }
    /**
     * Enable the component to render as lightDOM
     *
     * @static
     */
    UserDataProvider.renderMode = "light";
    lwc.registerDecorators(UserDataProvider, {
      publicProps: {
        sfdcExpressionKey: {
          config: 0
        },
        childData: {
          config: 0
        }
      },
      publicMethods: ["hasData"],
      fields: ["userId", "isGuest"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(UserDataProvider, {
      tmpl: _tmpl,
      sel: "dxp_data_provider-user-data-provider",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('community_layout/hiddenRegion', ['exports', 'lwc'], (function (exports, lwc) {

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var hostSelector = token ? ("[" + token + "-host]") : "";
      return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: none;}";
      /*LWC compiler v7.1.5*/
    }
    var _implicitStylesheets = [stylesheet];

    const stc0 = {
      attrs: {
        "name": "sfdcHiddenRegion"
      },
      key: 0
    };
    const stc1 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {s: api_slot} = $api;
      return [api_slot("sfdcHiddenRegion", stc0, stc1, $slotset)];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.slots = ["sfdcHiddenRegion"];
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-6c79d8rptei";
    tmpl.legacyStylesheetToken = "community_layout-hiddenRegion_hiddenRegion";
    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    /**
     * This comment is important, if it doesn't exist the slot will not be accessible in the ModuleDef,
     * see https://gus.lightning.force.com/lightning/r/0D5B000000moNnZ/view
     * @slot sfdcHiddenRegion a place for hidden components
     */
    class HiddenRegion extends lwc.LightningElement {
      /*LWC compiler v7.1.5*/
    }
    HiddenRegion.renderMode = 'light';
    const __lwc_component_class_internal = lwc.registerComponent(HiddenRegion, {
      tmpl: _tmpl,
      sel: "community_layout-hidden-region",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('@view/checkPasswordResetEmail', ['exports', 'dxp_data_provider/dataProxy', 'dxp_data_provider/userDataProvider', 'lwc', 'dxp_content_layout/siteLogo', 'dxp_data_provider/imageDataProvider', 'community_login/checkEmail', 'community_layout/column', 'community_layout/section', 'community_layout/sldsFlexibleLayout', 'community_builder/seoAssistant', 'webruntime/viewchangeNotifier', 'webruntime/pageDataLayerObject', 'community_layout/hiddenRegion', 'webruntime/expressions'], (function (exports, _dxp_data_providerDataProxy, _dxp_data_providerUserDataProvider, lwc, _dxp_content_layoutSiteLogo, _dxp_data_providerImageDataProvider, _community_loginCheckEmail, _community_layoutColumn, _community_layoutSection, _community_layoutSldsFlexibleLayout, _community_builderSeoAssistant, _webruntimeViewchangeNotifier, _webruntimePageDataLayerObject, _community_layoutHiddenRegion, expressions) {

	function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

	var _dxp_data_providerDataProxy__default = /*#__PURE__*/_interopDefaultCompat(_dxp_data_providerDataProxy);
	var _dxp_data_providerUserDataProvider__default = /*#__PURE__*/_interopDefaultCompat(_dxp_data_providerUserDataProvider);
	var _dxp_content_layoutSiteLogo__default = /*#__PURE__*/_interopDefaultCompat(_dxp_content_layoutSiteLogo);
	var _dxp_data_providerImageDataProvider__default = /*#__PURE__*/_interopDefaultCompat(_dxp_data_providerImageDataProvider);
	var _community_loginCheckEmail__default = /*#__PURE__*/_interopDefaultCompat(_community_loginCheckEmail);
	var _community_layoutColumn__default = /*#__PURE__*/_interopDefaultCompat(_community_layoutColumn);
	var _community_layoutSection__default = /*#__PURE__*/_interopDefaultCompat(_community_layoutSection);
	var _community_layoutSldsFlexibleLayout__default = /*#__PURE__*/_interopDefaultCompat(_community_layoutSldsFlexibleLayout);
	var _community_builderSeoAssistant__default = /*#__PURE__*/_interopDefaultCompat(_community_builderSeoAssistant);
	var _webruntimeViewchangeNotifier__default = /*#__PURE__*/_interopDefaultCompat(_webruntimeViewchangeNotifier);
	var _webruntimePageDataLayerObject__default = /*#__PURE__*/_interopDefaultCompat(_webruntimePageDataLayerObject);
	var _community_layoutHiddenRegion__default = /*#__PURE__*/_interopDefaultCompat(_community_layoutHiddenRegion);

	function tmpl$2($api, $cmp, $slotset, $ctx) {
	  const {c: api_custom_element, fr: api_fragment, ssf: api_scoped_slot_factory} = $api;
	  return [api_custom_element("dxp_data_provider-user-data-provider", _dxp_data_providerUserDataProvider__default.default, {
	    props: {
	      "sfdcExpressionKey": $cmp.attributes.dxp_data_provideruserdataprovider_1_0.sfdcExpressionKey,
	      "generatedTemplate": $cmp.attributes.dxp_data_provideruserdataprovider_1_0.generatedTemplate,
	      "sfdcIsPreviewMode": $cmp.attributes.dxp_data_provideruserdataprovider_1_0.sfdcIsPreviewMode,
	      "childData": $cmp.attributes.dxp_data_provideruserdataprovider_1_0.childData,
	      "sfdcFields": $cmp.attributes.dxp_data_provideruserdataprovider_1_0.sfdcFields
	    },
	    key: 0
	  }, [api_scoped_slot_factory("", function (item, key) {
	    return api_fragment(key, [api_custom_element("dxp_data_provider-data-proxy", _dxp_data_providerDataProxy__default.default, {
	      props: {
	        "routerContainerView": $cmp.routerContainerView,
	        "sfdcData": item,
	        "generatedTemplate": $cmp.attributes.dxp_data_provideruserdataprovider_1_0.generatedTemplate,
	        "routeParams": $cmp.routeParams
	      },
	      key: 1
	    })], 0);
	  })])];
	  /*LWC compiler v7.1.5*/
	}
	var _tmpl = lwc.registerTemplate(tmpl$2);
	tmpl$2.renderMode = "light";
	tmpl$2.stylesheets = [];
	tmpl$2.stylesheetToken = "lwc-6vmnurmjt6j";
	tmpl$2.legacyStylesheetToken = "___at___view-checkPasswordResetEmail_checkPasswordResetEmail";
	lwc.freezeTemplate(tmpl$2);

	const stc0$1 = [["--dxp-c-l-logo-width", "250", false], ["--dxp-c-l-alignment", "left", false], ["--dxp-c-m-alignment", "left", false], ["--dxp-c-m-logo-width", "250", false], ["--dxp-c-s-alignment", "left", false], ["--dxp-c-s-logo-width", "250", false]];
	const stc1$1 = {
	  "component-wrapper-spacer": true
	};
	const stc2$1 = {
	  "data-component-id": "siteLogo-39c5"
	};
	function tmpl$1($api, $cmp, $slotset, $ctx) {
	  const {c: api_custom_element} = $api;
	  return [api_custom_element("dxp_content_layout-site-logo", _dxp_content_layoutSiteLogo__default.default, {
	    styleDecls: stc0$1,
	    classMap: stc1$1,
	    attrs: stc2$1,
	    props: {
	      "imageInfoMobile": $cmp.attributes.dxp_content_layoutsitelogo_3_0.imageInfoMobile,
	      "logoWidth": $cmp.attributes.dxp_content_layoutsitelogo_3_0.logoWidth,
	      "imageInfo": $cmp.attributes.dxp_content_layoutsitelogo_3_0.imageInfo,
	      "alignment": $cmp.attributes.dxp_content_layoutsitelogo_3_0.alignment
	    },
	    key: 0
	  })];
	  /*LWC compiler v7.1.5*/
	}
	var dxp_data_providerimagedataprovider_2_1_html = lwc.registerTemplate(tmpl$1);
	tmpl$1.renderMode = "light";
	tmpl$1.stylesheets = [];
	tmpl$1.stylesheetToken = "lwc-3smqo7nssi4";
	tmpl$1.legacyStylesheetToken = "___at___view-checkPasswordResetEmail_dxp_data_providerimagedataprovider_2_1_html";
	lwc.freezeTemplate(tmpl$1);

	const stc0 = {
	  attrs: {
	    "data-component-id": "sldsFlexibleLayout-3a4f"
	  },
	  key: 0
	};
	const stc1 = [["--dxp-c-l-section-vertical-align", "flex-start", false], ["--dxp-c-m-section-vertical-align", "flex-start", false], ["--dxp-c-s-section-vertical-align", "flex-start", false]];
	const stc2 = {
	  "data-layout-direction": "desktop-direction-row tablet-direction-column mobile-direction-column",
	  "data-component-id": "section-8a78"
	};
	const stc3 = {
	  "data-layout-direction": "desktop-direction-row tablet-direction-column mobile-direction-column"
	};
	const stc4 = [];
	const stc5 = {
	  "data-component-id": "checkEmail-bcda"
	};
	const stc6 = {
	  key: 6
	};
	const stc7 = {
	  "component-wrapper-spacer": true
	};
	const stc8 = {
	  "data-component-id": "seoAssistant-f1a7"
	};
	const stc9 = {
	  slotAssignment: "sfdcHiddenRegion",
	  attrs: {
	    "data-component-id": "viewchangeNotifier-eab5"
	  },
	  key: 8
	};
	const stc10 = {
	  slotAssignment: "sfdcHiddenRegion",
	  attrs: {
	    "data-component-id": "pageDataLayerObject-6a80"
	  },
	  key: 9
	};
	function tmpl($api, $cmp, $slotset, $ctx) {
	  const {c: api_custom_element, fr: api_fragment, ssf: api_scoped_slot_factory} = $api;
	  return [api_custom_element("community_layout-slds-flexible-layout", _community_layoutSldsFlexibleLayout__default.default, stc0, [api_custom_element("community_layout-section", _community_layoutSection__default.default, {
	    styleDecls: stc1,
	    slotAssignment: "content",
	    attrs: stc2,
	    props: {
	      "layoutDirectionDesktop": $cmp.attributes.community_layoutsection_3_3.layoutDirectionDesktop,
	      "maxContentWidth": $cmp.attributes.community_layoutsection_3_3.maxContentWidth,
	      "sectionConfig": $cmp.attributes.community_layoutsection_3_3.sectionConfig,
	      "layoutDirectionMobile": $cmp.attributes.community_layoutsection_3_3.layoutDirectionMobile,
	      "sectionVerticalAlign": $cmp.attributes.community_layoutsection_3_3.sectionVerticalAlign,
	      "sectionMinHeight": $cmp.attributes.community_layoutsection_3_3.sectionMinHeight,
	      "sectionColumnGutterWidth": $cmp.attributes.community_layoutsection_3_3.sectionColumnGutterWidth,
	      "layoutDirectionTablet": $cmp.attributes.community_layoutsection_3_3.layoutDirectionTablet,
	      "backgroundImageConfig": $cmp.attributes.community_layoutsection_3_3.backgroundImageConfig,
	      "backgroundImageOverlay": $cmp.attributes.community_layoutsection_3_3.backgroundImageOverlay,
	      "componentSpacerSize": $cmp.attributes.community_layoutsection_3_3.componentSpacerSize
	    },
	    key: 1
	  }, [api_custom_element("community_layout-column", _community_layoutColumn__default.default, {
	    slotAssignment: "columns",
	    attrs: stc3,
	    props: {
	      "columnCount": $cmp.attributes.community_layoutcolumn_2_0.columnCount,
	      "columnWidth": "12"
	    },
	    key: 2
	  }, [api_custom_element("dxp_data_provider-image-data-provider", _dxp_data_providerImageDataProvider__default.default, {
	    slotAssignment: "column",
	    props: {
	      "sfdcExpressionKey": $cmp.attributes.dxp_data_providerimagedataprovider_2_1.sfdcExpressionKey,
	      "generatedTemplate": $cmp.attributes.dxp_data_providerimagedataprovider_2_1.generatedTemplate,
	      "sfdcIsPreviewMode": $cmp.attributes.dxp_data_providerimagedataprovider_2_1.sfdcIsPreviewMode,
	      "imageInfo": $cmp.attributes.dxp_data_providerimagedataprovider_2_1.imageInfo
	    },
	    key: 3
	  }, [api_scoped_slot_factory("", function (item, key) {
	    return api_fragment(key, [api_custom_element("dxp_data_provider-data-proxy", _dxp_data_providerDataProxy__default.default, {
	      props: {
	        "routerContainerView": $cmp.routerContainerView,
	        "sfdcData": item,
	        "generatedTemplate": $cmp.attributes.dxp_data_providerimagedataprovider_2_1.generatedTemplate,
	        "routeParams": $cmp.routeParams
	      },
	      key: 4
	    })], 0);
	  })]), api_custom_element("community_login-check-email", _community_loginCheckEmail__default.default, {
	    styleDecls: stc4,
	    slotAssignment: "column",
	    attrs: stc5,
	    props: {
	      "checkEmailMessage": $cmp.attributes.community_logincheckemail_3_2.checkEmailMessage,
	      "returnButtonLabel": $cmp.attributes.community_logincheckemail_3_2.returnButtonLabel,
	      "titleLabel": $cmp.attributes.community_logincheckemail_3_2.titleLabel
	    },
	    key: 5
	  })])])]), api_custom_element("community_layout-hidden-region", _community_layoutHiddenRegion__default.default, stc6, [api_custom_element("community_builder-seo-assistant", _community_builderSeoAssistant__default.default, {
	    styleDecls: stc4,
	    classMap: stc7,
	    slotAssignment: "sfdcHiddenRegion",
	    attrs: stc8,
	    props: {
	      "recordId": $cmp.attributes.community_builderseoassistant_3_4.recordId,
	      "pageTitle": $cmp.attributes.community_builderseoassistant_3_4.pageTitle,
	      "description": $cmp.attributes.community_builderseoassistant_3_4.description,
	      "customHeadTags": $cmp.attributes.community_builderseoassistant_3_4.customHeadTags
	    },
	    key: 7
	  }), api_custom_element("webruntime-viewchange-notifier", _webruntimeViewchangeNotifier__default.default, stc9), api_custom_element("webruntime-page-data-layer-object", _webruntimePageDataLayerObject__default.default, stc10)])];
	  /*LWC compiler v7.1.5*/
	}
	var dxp_data_provideruserdataprovider_1_0_html = lwc.registerTemplate(tmpl);
	tmpl.renderMode = "light";
	tmpl.stylesheets = [];
	tmpl.stylesheetToken = "lwc-12o4o6qjga5";
	tmpl.legacyStylesheetToken = "___at___view-checkPasswordResetEmail_dxp_data_provideruserdataprovider_1_0_html";
	lwc.freezeTemplate(tmpl);

	class Generated {
	  static get html() {
	    return _tmpl;
	  }
	  static get attributes() {
	    return function getAttributeSet(cmp) {
	      return {
	        "dxp_data_provideruserdataprovider_1_0": {
	          "sfdcIsPreviewMode": false,
	          "sfdcFields": [],
	          "childData": {},
	          "sfdcExpressionKey": "User",
	          "generatedTemplate": {
	            "attributes": dxp_data_provideruserdataprovider_1_0 => {
	              return {
	                "dxp_data_providerimagedataprovider_2_1": {
	                  "sfdcIsPreviewMode": false,
	                  "sfdcExpressionKey": "dxpImageInfoMobileSfdcExpressionKey",
	                  "imageInfo": "",
	                  "generatedTemplate": {
	                    "attributes": dxp_data_providerimagedataprovider_2_1 => {
	                      return {
	                        "dxp_content_layoutsitelogo_3_0": {
	                          "imageInfoMobile": expressions.EXPR_CLOSURE(() => expressions.EXPR_MEMBER(expressions.EXPR_PROVIDER(dxp_data_providerimagedataprovider_2_1), "Picture")),
	                          "logoWidth": 250,
	                          "imageInfo": "",
	                          "alignment": "left"
	                        }
	                      };
	                    },
	                    "html": dxp_data_providerimagedataprovider_2_1_html
	                  }
	                },
	                "community_layoutsection_3_3": {
	                  "layoutDirectionMobile": "column",
	                  "backgroundImageConfig": "",
	                  "backgroundImageOverlay": "rgba(0,0,0,0)",
	                  "sectionConfig": "{\"UUID\":\"ac799c9c-b4d9-4475-8c0d-424e56178a78\",\"columns\":[{\"UUID\":\"a0ac21a9-f76a-4381-9f4f-0176283c9128\",\"columnName\":\"Column 1\",\"columnKey\":\"col1\",\"columnWidth\":\"12\",\"seedComponents\":null}]}",
	                  "layoutDirectionDesktop": "row",
	                  "layoutDirectionTablet": "column",
	                  "sectionMinHeight": "",
	                  "componentSpacerSize": "",
	                  "sectionVerticalAlign": "flex-start",
	                  "maxContentWidth": "",
	                  "sectionColumnGutterWidth": ""
	                },
	                "community_logincheckemail_3_2": {
	                  "titleLabel": "Now check your email",
	                  "checkEmailMessage": "Check the email account associated with your username for the link to reset your password. If you didn\'t get an email, check your Spam folder. Or contact your administrator.",
	                  "returnButtonLabel": "Back to login"
	                },
	                "community_layoutcolumn_2_0": {
	                  "columnWidth": "12",
	                  "columnCount": "1"
	                },
	                "community_builderseoassistant_3_4": {
	                  "recordId": expressions.EXPR_CLOSURE(() => cmp.routeParams["recordId"] || ""),
	                  "customHeadTags": "",
	                  "pageTitle": "Check Password",
	                  "description": ""
	                }
	              };
	            },
	            "html": dxp_data_provideruserdataprovider_1_0_html
	          }
	        }
	      };
	    };
	  }
	}
	const __lwc_component_class_internal = lwc.registerComponent(Generated, {
	  tmpl: _tmpl,
	  sel: "@view-check-password-reset-email",
	  apiVersion: 62
	});

	exports.default = __lwc_component_class_internal;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
