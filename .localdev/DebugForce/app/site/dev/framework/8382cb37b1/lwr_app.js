LWR.define("logger/v/1", ["exports"], function(exports) {
  "use strict";
  function log(...msg) {
    console.log(...msg);
  }
  function logError(...msg) {
    console.error(...msg);
  }
  exports.log = log;
  exports.logError = logError;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("logger", ["exports", "logger/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("@salesforce/loader/v/1", ["exports", "lwr/loaderLegacy/v/0_13_10"], function(exports, _0_13_10) {
  "use strict";
  Object.defineProperty(exports, "load", {
    enumerable: true,
    get: function() {
      return _0_13_10.load;
    }
  });
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("@salesforce/loader", ["exports", "@salesforce/loader/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/domRouterUtils/v/0_13_10", ["exports", "lwr/routerUtils/v/0_13_10"], function(exports, _0_13_10) {
  "use strict";
  function getUrlObject(url = "") {
    url = url || "";
    if (url.indexOf("://") < 0) {
      const port = window.location.port ? `:${window.location.port}` : "";
      const origin = `${window.location.protocol}//${window.location.hostname}${port}`;
      const prefix = url.charAt(0) === "/" ? "" : "/";
      url = origin + prefix + url;
    }
    const searchParams = {};
    const link = document.createElement("a");
    link.href = url;
    const queryStr = link.search.substring(1);
    if (queryStr) {
      queryStr.split("&").forEach((pair) => {
        const [key, value = ""] = pair.split("=");
        searchParams[_0_13_10.decode(key)] = _0_13_10.decode(value);
      });
    }
    return {
      href: link.href,
      origin: `${link.protocol}//${link.hostname}${link.port ? `:${link.port}` : ""}`,
      pathname: link.pathname.replace(/(\/)?/, "/"),
      searchParams
    };
  }
  function getRelativeUrl(url) {
    const urlObj = getUrlObject(url);
    const href = urlObj.href.replace(/:\d+/, "");
    const origin = urlObj.origin.replace(/:\d+/, "");
    return href.replace(origin, "");
  }
  function set(path, route) {
    const data = route || {};
    window.history.pushState(data, "", path);
  }
  function replace(path, route) {
    const data = route || {};
    window.history.replaceState(data, "", path);
  }
  exports.getRelativeUrl = getRelativeUrl;
  exports.replace = replace;
  exports.set = set;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/domRouterUtils", ["exports", "lwr/domRouterUtils/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/metrics/v/0_13_10", ["exports"], function(exports) {
  "use strict";
  const BOOTSTRAP_PREFIX = "lwr.bootstrap.";
  const BOOTSTRAP_END = `${BOOTSTRAP_PREFIX}end`;
  const BOOTSTRAP_ERROR = `${BOOTSTRAP_PREFIX}error`;
  const BOOTSTRAP_ERROR_COUNT = `${BOOTSTRAP_ERROR}.count`;
  const BOOTSTRAP_DURATION = `${BOOTSTRAP_PREFIX}duration`;
  const INIT = "lwr.bootstrap.init";
  const INIT_DURATION = `${INIT}.duration`;
  const INIT_MODULE = `lwr.bootstrap.init.module`;
  const INIT_MODULE_DURATION = `${INIT_MODULE}.duration`;
  const INIT_MODULE_COUNT = `${INIT_MODULE}.count`;
  const LOADER_PREFIX = "lwr.loader.";
  const MODULE_DEFINE = `${LOADER_PREFIX}module.define`;
  const MODULE_DEFINE_COUNT = `${MODULE_DEFINE}.count`;
  const MODULE_DYNAMIC_LOAD = `${LOADER_PREFIX}module.dynamicLoad`;
  const MODULE_DYNAMIC_LOAD_COUNT = `${MODULE_DYNAMIC_LOAD}.count`;
  const MODULE_FETCH = `${LOADER_PREFIX}module.fetch`;
  const MODULE_FETCH_COUNT = `${MODULE_FETCH}.count`;
  const MODULE_FETCH_DURATION = `${MODULE_FETCH}.duration`;
  const MODULE_ERROR = `${LOADER_PREFIX}module.error`;
  const MODULE_ERROR_COUNT = `${MODULE_ERROR}.count`;
  const MAPPINGS_FETCH = `${LOADER_PREFIX}mappings.fetch`;
  const MAPPINGS_FETCH_COUNT = `${MAPPINGS_FETCH}.count`;
  const MAPPINGS_FETCH_DURATION = `${MAPPINGS_FETCH}.duration`;
  const MAPPINGS_ERROR = `${LOADER_PREFIX}mappings.error`;
  const MAPPINGS_ERROR_COUNT = `${MAPPINGS_ERROR}.count`;
  const ROUTER_PREFIX = "lwr.router.";
  const ROUTER_NAV = `${ROUTER_PREFIX}navigate`;
  const ROUTER_NAV_COUNT = `${ROUTER_NAV}.count`;
  const ROUTER_NAV_DURATION = `${ROUTER_NAV}.duration`;
  const ROUTER_VIEW = `${ROUTER_PREFIX}view`;
  const ROUTER_VIEW_DURATION = `${ROUTER_VIEW}.duration`;
  const ROUTER_ERROR = `${ROUTER_PREFIX}error`;
  const ROUTER_ERROR_COUNT = `${ROUTER_ERROR}.count`;
  exports.BOOTSTRAP_DURATION = BOOTSTRAP_DURATION;
  exports.BOOTSTRAP_END = BOOTSTRAP_END;
  exports.BOOTSTRAP_ERROR = BOOTSTRAP_ERROR;
  exports.BOOTSTRAP_ERROR_COUNT = BOOTSTRAP_ERROR_COUNT;
  exports.BOOTSTRAP_PREFIX = BOOTSTRAP_PREFIX;
  exports.INIT = INIT;
  exports.INIT_DURATION = INIT_DURATION;
  exports.INIT_MODULE = INIT_MODULE;
  exports.INIT_MODULE_COUNT = INIT_MODULE_COUNT;
  exports.INIT_MODULE_DURATION = INIT_MODULE_DURATION;
  exports.LOADER_PREFIX = LOADER_PREFIX;
  exports.MAPPINGS_ERROR = MAPPINGS_ERROR;
  exports.MAPPINGS_ERROR_COUNT = MAPPINGS_ERROR_COUNT;
  exports.MAPPINGS_FETCH = MAPPINGS_FETCH;
  exports.MAPPINGS_FETCH_COUNT = MAPPINGS_FETCH_COUNT;
  exports.MAPPINGS_FETCH_DURATION = MAPPINGS_FETCH_DURATION;
  exports.MODULE_DEFINE = MODULE_DEFINE;
  exports.MODULE_DEFINE_COUNT = MODULE_DEFINE_COUNT;
  exports.MODULE_DYNAMIC_LOAD = MODULE_DYNAMIC_LOAD;
  exports.MODULE_DYNAMIC_LOAD_COUNT = MODULE_DYNAMIC_LOAD_COUNT;
  exports.MODULE_ERROR = MODULE_ERROR;
  exports.MODULE_ERROR_COUNT = MODULE_ERROR_COUNT;
  exports.MODULE_FETCH = MODULE_FETCH;
  exports.MODULE_FETCH_COUNT = MODULE_FETCH_COUNT;
  exports.MODULE_FETCH_DURATION = MODULE_FETCH_DURATION;
  exports.ROUTER_ERROR = ROUTER_ERROR;
  exports.ROUTER_ERROR_COUNT = ROUTER_ERROR_COUNT;
  exports.ROUTER_NAV = ROUTER_NAV;
  exports.ROUTER_NAV_COUNT = ROUTER_NAV_COUNT;
  exports.ROUTER_NAV_DURATION = ROUTER_NAV_DURATION;
  exports.ROUTER_PREFIX = ROUTER_PREFIX;
  exports.ROUTER_VIEW = ROUTER_VIEW;
  exports.ROUTER_VIEW_DURATION = ROUTER_VIEW_DURATION;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/metrics", ["exports", "lwr/metrics/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/observable/v/0_13_10", ["exports"], function(exports) {
  "use strict";
  function createObservable() {
    let currentValue = void 0;
    let currentError = void 0;
    let observers = [];
    const addObserver = (obs) => {
      observers.push(obs);
    };
    const removeObserver = (obsIndex) => {
      observers = [...observers.slice(0, obsIndex), ...observers.slice(obsIndex + 1)];
    };
    const next = (value) => {
      observers.filter((obs) => obs !== null).forEach((obs) => obs.next && obs.next(value));
      currentValue = value;
      currentError = void 0;
    };
    const error = (err) => {
      observers.filter((obs) => obs !== null).forEach((obs) => obs.error && obs.error(err));
      currentValue = void 0;
      currentError = err;
    };
    const complete = () => {
      observers.filter((obs) => obs !== null).forEach((obs) => obs.complete && obs.complete());
      observers = [];
      currentValue = void 0;
      currentError = void 0;
    };
    const subscribe = (obs, replay = true) => {
      addObserver(obs);
      if (currentValue && replay) {
        obs.next(currentValue);
      }
      if (currentError) {
        error(currentError);
      }
      const obsIndex = observers.length - 1;
      return {
        unsubscribe: () => removeObserver(obsIndex)
      };
    };
    return {
      next,
      error,
      complete,
      subscribe
    };
  }
  exports.createObservable = createObservable;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/observable", ["exports", "lwr/observable/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/contextProvider/v/0_13_10", ["exports", "lwc/v/7_1_5", "lwr/routerUtils/v/0_13_10", "lwr/navigation/v/0_13_10"], function(exports, _7_1_5, _0_13_10$1, _0_13_10) {
  "use strict";
  const currentPageReferenceContextualizer = _7_1_5.createContextProvider(_0_13_10.CurrentPageReference);
  const currentViewContextualizer = _0_13_10$1.hasDocument ? _7_1_5.createContextProvider(_0_13_10.CurrentView) : void 0;
  const navigationContextContextualizer = _7_1_5.createContextProvider(_0_13_10.NavigationContext);
  function provideContext(contextValue, providerNode, contextualizer, contextualAdapter) {
    if (contextualizer && contextualAdapter) {
      contextualAdapter.setContext(providerNode, contextValue);
      contextualizer(providerNode, {
        consumerConnectedCallback: contextualAdapter.subscribeContext.bind(contextualAdapter, providerNode),
        consumerDisconnectedCallback: contextualAdapter.unsubscribeContext.bind(contextualAdapter, providerNode)
      });
    }
  }
  exports.currentPageReferenceContextualizer = currentPageReferenceContextualizer;
  exports.currentViewContextualizer = currentViewContextualizer;
  exports.navigationContextContextualizer = navigationContextContextualizer;
  exports.provideContext = provideContext;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/contextProvider", ["exports", "lwr/contextProvider/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/routerUtils/v/0_13_10", ["exports", "lwr/routerErrors/v/0_13_10"], function(exports, _0_13_10) {
  "use strict";
  function createFilterChain() {
    const filters = [];
    const empty = () => {
      return filters.length === 0;
    };
    const addSingle = (filter) => {
      if (typeof filter === "function") {
        filters.push(filter);
      }
    };
    const add = (f = []) => {
      if (Array.isArray(f)) {
        f.forEach((l) => addSingle(l));
      } else {
        addSingle(f);
      }
    };
    const compile2 = (arg) => {
      return filters.length === 0 ? Promise.resolve(true) : filters.reduce((previous, current) => {
        return previous.then((val) => {
          return val === false ? Promise.reject() : Promise.resolve(current(arg));
        });
      }, Promise.resolve(true)).then((val) => {
        return val === false ? false : true;
      }).catch((error) => {
        if (error instanceof Error) {
          throw error;
        } else {
          return false;
        }
      });
    };
    return {
      add,
      compile: compile2,
      empty
    };
  }
  function encode(str = "") {
    str = str || "";
    return encodeURIComponent(str);
  }
  function decode(str = "") {
    str = str || "";
    return decodeURIComponent(str);
  }
  function getPathFromUrl(url) {
    url = url || "/";
    if (url.charAt(0) !== "/") {
      url = "/" + url;
    }
    const fullmatch = url.match(/^[^#?]+/);
    if (fullmatch !== null) {
      const path = fullmatch[0];
      return path === "/" ? "/" : path.replace(/\/$/, "");
    }
    return "/";
  }
  function getQueryFromUrl(url) {
    url = url || "";
    const fragmentStart = url.indexOf("#");
    if (fragmentStart >= 0) {
      url = url.substring(0, fragmentStart);
    }
    const queryIdx = url.indexOf("?");
    const queryStr = queryIdx >= 0 ? url.substr(queryIdx + 1) : null;
    const queryParams = {};
    if (queryStr) {
      queryStr.split("&").forEach((pair) => {
        if (pair.indexOf("=") >= 0) {
          const [key, value = ""] = pair.split("=");
          queryParams[decode(key)] = decode(value);
        } else {
          queryParams[decode(pair)] = null;
        }
      });
    }
    return queryParams;
  }
  function getQueryString(queryObj = {}) {
    const keys = Object.keys(queryObj);
    return keys.length ? `?${keys.map((key) => {
      const value = queryObj[key];
      if (value === null) {
        return key;
      }
      return `${key}=${encode(value)}`;
    }).join("&")}` : "";
  }
  function isParam(str) {
    return str && str.length > 1 ? str.startsWith(":") : false;
  }
  function getParamName(routeParamName) {
    return routeParamName ? isParam(routeParamName) ? routeParamName.substr(1) : false : false;
  }
  function getQueryNames(compiledQuery) {
    return Object.values(compiledQuery).reduce((paramNames, {
      routeParamName
    }) => {
      const paramName = getParamName(routeParamName);
      if (paramName) {
        paramNames.push(paramName);
      }
      return paramNames;
    }, []);
  }
  function matchRouteDefinitionByPageReference(pageReference, routeDefs) {
    if (!pageReference) {
      return null;
    }
    const {
      type: refType,
      attributes: refAttrs = {},
      state: refState = {}
    } = pageReference;
    if (refType) {
      const [matched] = routeDefs.filter((compiledDef) => {
        const {
          original: {
            page: {
              type = null,
              attributes: pageAttrs = {},
              state: pageState = {}
            } = {}
          }
        } = compiledDef;
        const matchesType = type === refType;
        const refAttributesHasAllPageKeys = Object.keys(pageAttrs).every((key) => {
          return Object.keys(refAttrs).indexOf(key) >= 0;
        });
        const refAttributesHasSameNumberOfKeys = Object.keys(pageAttrs).length === Object.keys(refAttrs).length;
        const refStateHasAllPageKeys = Object.keys(pageState).every((key) => {
          return Object.keys(refState).indexOf(key) >= 0;
        });
        const pageAttributeLiteralsCompletelyMatch = Object.keys(pageAttrs).filter((key) => {
          const value = pageAttrs[key];
          return !value || !isParam(value);
        }).every((key) => pageAttrs[key] === refAttrs[key]);
        const pageStateLiteralsCompletelyMatch = Object.keys(pageState).filter((key) => {
          const value = pageState[key];
          return value === null || !isParam(value);
        }).every((key) => pageState[key] === refState[key]);
        return matchesType && refAttributesHasAllPageKeys && refAttributesHasSameNumberOfKeys && pageAttributeLiteralsCompletelyMatch && refStateHasAllPageKeys && pageStateLiteralsCompletelyMatch;
      });
      return matched || null;
    }
    return null;
  }
  function getPathParams(path, routeDef) {
    const {
      regex,
      params: definedParams
    } = routeDef;
    const execArray = regex.exec(path);
    if (execArray) {
      const [, ...pathParamValues] = execArray;
      const pathParams = {};
      definedParams.forEach((param, index) => {
        const {
          name: paramName
        } = param;
        const paramValue = pathParamValues[index];
        pathParams[paramName] = paramValue ? decode(paramValue) : paramValue;
      });
      return pathParams;
    }
    return null;
  }
  function getQueryParams(queryObj, routeDef) {
    if (queryObj && routeDef) {
      const {
        queryMatcher
      } = routeDef;
      const matchedQuery = queryMatcher(queryObj);
      if (matchedQuery) {
        const params = {};
        Object.keys(matchedQuery).forEach((queryKeyName) => {
          const paramValue = matchedQuery[queryKeyName];
          const {
            value,
            routeParamName
          } = paramValue;
          const paramName = routeParamName ? routeParamName.substr(1) : queryKeyName;
          params[paramName] = value ? decode(value) : value;
        });
        return params;
      }
    }
    return null;
  }
  function getUnboundQueries(queryObj, routeDef) {
    const {
      compiledQuery
    } = routeDef;
    const boundKeys = Object.keys(compiledQuery).filter((qKey) => {
      const {
        literalValue
      } = compiledQuery[qKey];
      return !literalValue;
    });
    const unbound = {};
    Object.keys(queryObj).forEach((queryKey) => {
      const queryValue = queryObj[queryKey];
      if (boundKeys.indexOf(queryKey) < 0) {
        unbound[queryKey] = queryValue;
      }
    });
    return unbound;
  }
  function getPageReferenceFromUriAndRouteDef(uri, routeDef) {
    if (routeDef) {
      const {
        original: {
          page: {
            type: pageType = "",
            attributes: pageAttributes = {},
            state: pageState = {}
          } = {}
        } = {}
      } = routeDef;
      const path = getPathFromUrl(uri);
      const query = getQueryFromUrl(uri);
      const pathParams = getPathParams(path, routeDef);
      const queryParams = getQueryParams(query, routeDef);
      if (pathParams && queryParams) {
        const allParams = {
          ...pathParams,
          ...queryParams
        };
        const boundAttributeParams = {};
        Object.keys(pageAttributes).forEach((attributeKey) => {
          const attributeValue = pageAttributes[attributeKey];
          let value;
          if (attributeValue && isParam(attributeValue)) {
            const paramName = attributeValue.substr(1);
            value = allParams[paramName];
          } else {
            value = attributeValue;
          }
          boundAttributeParams[attributeKey] = value;
        });
        const boundStateParams = {};
        Object.keys(pageState).forEach((stateKey) => {
          const stateValue = pageState[stateKey];
          let value;
          if (stateValue && isParam(stateValue)) {
            const paramName = stateValue.substr(1);
            value = allParams[paramName];
          } else {
            value = stateValue;
          }
          boundStateParams[stateKey] = value;
        });
        const unboundState = getUnboundQueries(query, routeDef);
        return {
          type: pageType,
          attributes: {
            ...boundAttributeParams
          },
          state: {
            ...unboundState,
            ...boundStateParams
          }
        };
      }
    }
    return null;
  }
  const DEFAULT_I18N_ROUTER_CONFIG = {
    locale: "en-US",
    defaultLocale: "en-US"
  };
  function isRoutePatternsMatched(path, queryObj, routeDef) {
    const {
      original: {
        patterns = null
      } = {}
    } = routeDef || {};
    if (patterns) {
      const pathParams = getPathParams(path, routeDef);
      const queryParams = getQueryParams(queryObj, routeDef);
      const params = {
        ...pathParams,
        ...queryParams
      };
      return Object.keys(patterns).every((paramKey) => {
        const pattern = patterns[paramKey];
        const regex = new RegExp(pattern);
        const paramValue = params[paramKey] || "";
        return regex.test(paramValue);
      });
    }
    return true;
  }
  function getRouteDefinitionForUri(uri, routeDefs) {
    const path = getPathFromUrl(uri);
    const queryObj = getQueryFromUrl(uri);
    const matchedPaths = routeDefs ? routeDefs.filter((def) => def.regex.test(path)) : [];
    const [matched] = matchedPaths.filter((def) => {
      const {
        queryMatcher
      } = def;
      return queryMatcher(queryObj) && isRoutePatternsMatched(path, queryObj, def);
    });
    return matched || null;
  }
  function matchRouteByUrl(url, routeDefs, basePath = "", i18n = DEFAULT_I18N_ROUTER_CONFIG, options) {
    if (basePath && url?.indexOf(basePath) === 0) {
      url = url.replace(basePath, "");
    }
    if (options?.locale || i18n?.locale) {
      const localePath = `/${options?.locale || i18n.locale}`;
      if (url?.indexOf(localePath) === 0) {
        url = url.replace(localePath, "");
      }
    }
    const routeDef = getRouteDefinitionForUri(url, routeDefs);
    let matchInfo;
    if (!routeDef) {
      return null;
    } else {
      const pageReference = getPageReferenceFromUriAndRouteDef(url, routeDef);
      if (pageReference) {
        const originalRouteDef = routeDef.original;
        matchInfo = {
          route: {
            id: originalRouteDef.id,
            attributes: {
              ...pageReference.attributes
            },
            state: {
              ...pageReference.state
            },
            pageReference: {
              type: pageReference.type,
              attributes: {
                ...pageReference.attributes
              },
              state: {
                ...pageReference.state
              }
            }
          },
          routeDefinition: routeDef
        };
        return matchInfo;
      }
    }
    return null;
  }
  function getUrlFromPageReference(pageReference, routeDefs, basePath = "", i18n = DEFAULT_I18N_ROUTER_CONFIG, options) {
    const routeDef = matchRouteDefinitionByPageReference(pageReference, routeDefs);
    if (routeDef) {
      return getUrlFromPageReferenceAndRouteDef(pageReference, routeDef, basePath, i18n, options);
    }
    return null;
  }
  function extractBindingValues(parameters, pageReference, pageBindings) {
    const {
      attributeBindings,
      stateBindings
    } = pageBindings;
    const {
      attributes: refAttributes,
      state: refState
    } = pageReference;
    const parameterValueMapping = {};
    parameters.forEach((paramName) => {
      const [attributeBindingKey] = Object.keys(attributeBindings).filter((attributeBindingKey2) => {
        return getParamName(attributeBindings[attributeBindingKey2]) === paramName;
      });
      if (attributeBindingKey) {
        parameterValueMapping[paramName] = refAttributes[attributeBindingKey];
      } else {
        const [stateBindingKey] = Object.keys(stateBindings).filter((stateBindingKey2) => {
          return getParamName(stateBindings[stateBindingKey2]) === paramName;
        });
        if (stateBindingKey) {
          parameterValueMapping[paramName] = refState[stateBindingKey];
        }
      }
    });
    return parameterValueMapping;
  }
  function getUrlFromPageReferenceAndRouteDef(pageReference, routeDef, basePath = "", i18n = DEFAULT_I18N_ROUTER_CONFIG, options) {
    const {
      params,
      original: {
        page = {}
      } = {},
      toPath,
      compiledQuery
    } = routeDef;
    const {
      attributes: attributeBindings = {},
      state: stateBindings = {}
    } = page;
    const pathParamNames = params.filter(({
      name
    }) => {
      return typeof name === "string";
    }).map(({
      name
    }) => {
      return name;
    });
    const pathParameters = extractBindingValues(pathParamNames, pageReference, {
      attributeBindings,
      stateBindings
    });
    const toPathUrl = toPath(pathParameters);
    const queryParamNames = getQueryNames(compiledQuery);
    const queryParameters = extractBindingValues(queryParamNames, pageReference, {
      attributeBindings,
      stateBindings
    });
    const queryObject = getQueryObjectForParametersAndPageReference(pageReference, queryParameters, routeDef);
    const queryString = getQueryString(queryObject);
    const locale = options?.locale || i18n && i18n.locale;
    const localePart = locale !== i18n.defaultLocale ? `/${locale}` : "";
    return `${basePath}${localePart}${toPathUrl}${queryString}`;
  }
  function getQueryObjectForParametersAndPageReference(pageReference, queryParameters, routeDef) {
    const {
      compiledQuery,
      original: {
        page: {
          state: stateBindings = {}
        }
      }
    } = routeDef;
    const {
      state: refState = {}
    } = pageReference || {};
    const nonParamState = {};
    Object.keys(refState).filter((stateKey) => {
      const bindingValue = stateBindings[stateKey];
      return !isParam(bindingValue);
    }).forEach((key) => nonParamState[key] = refState[key]);
    const queryParamKeyValueMap = {};
    Object.keys(queryParameters).forEach((paramName) => {
      const paramValue = queryParameters[paramName];
      const [compiledQueryMatch] = Object.keys(compiledQuery).filter((key) => {
        const compiledValue = compiledQuery[key];
        const {
          routeParamName
        } = compiledValue;
        return getParamName(routeParamName) === paramName;
      });
      if (compiledQueryMatch) {
        const queryKey = compiledQueryMatch;
        queryParamKeyValueMap[queryKey] = paramValue;
      }
    });
    return {
      ...nonParamState,
      ...queryParamKeyValueMap
    };
  }
  function getPageReferenceFromUrl(url, routeDefs, basePath = "", i18n = DEFAULT_I18N_ROUTER_CONFIG) {
    const routingMatch = matchRouteByUrl(url, routeDefs, basePath, i18n);
    if (routingMatch && routingMatch.route && routingMatch.route.pageReference) {
      return routingMatch.route.pageReference;
    }
    return null;
  }
  function isObject(o) {
    return typeof o === "object" && o !== null && !Array.isArray(o);
  }
  function isString(o) {
    return typeof o === "string";
  }
  function objectHasKey(o, key) {
    return key in o;
  }
  function freeze(o, depthLimit = 2) {
    if (isObject(o)) {
      try {
        Object.freeze(o);
        if (depthLimit > 0) {
          Object.keys(o).forEach((key) => {
            if (objectHasKey(o, key)) {
              const val = o[key];
              if (val && typeof val === "object") {
                freeze(val, depthLimit - 1);
              }
            }
          });
        }
      } catch (e) {
      }
    }
    return o;
  }
  function guid() {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  }
  function isValidRoute(object) {
    const expected = ["id", "attributes", "state", "pageReference"];
    const {
      pageReference = null
    } = object || {};
    return isObject(object) && hasExactProperties(object, expected) && isValidPageReference(pageReference);
  }
  function isValidPageReference(object) {
    const expected = ["type", "state", "attributes"];
    const {
      type,
      state,
      attributes
    } = object || {};
    const validTypes = isObject(object) && isString(type) && isObject(state) && validNullableString(state) && isObject(attributes) && validNullableString(attributes);
    return hasExactProperties(object, expected) && validTypes;
  }
  function validNullableString(object) {
    return Object.keys(object).every((key) => {
      const val = object[key];
      return typeof key === "string" && (typeof val === "string" || val === null);
    });
  }
  function hasExactProperties(object, expectedKeys) {
    if (isObject(object)) {
      const hasAllExpected = expectedKeys.every((expectedKey) => objectHasKey(object, expectedKey));
      const actual = Object.keys(expectedKeys);
      const actualHasNoExtraProperties = actual.length === expectedKeys.length;
      return hasAllExpected && actualHasNoExtraProperties;
    }
    return false;
  }
  function lexer(str) {
    const tokens = [];
    let i = 0;
    while (i < str.length) {
      const char = str[i];
      if (char === "*" || char === "+" || char === "?") {
        tokens.push({
          type: "MODIFIER",
          index: i,
          value: str[i++]
        });
        continue;
      }
      if (char === "\\") {
        tokens.push({
          type: "ESCAPED_CHAR",
          index: i++,
          value: str[i++]
        });
        continue;
      }
      if (char === "{") {
        tokens.push({
          type: "OPEN",
          index: i,
          value: str[i++]
        });
        continue;
      }
      if (char === "}") {
        tokens.push({
          type: "CLOSE",
          index: i,
          value: str[i++]
        });
        continue;
      }
      if (char === ":") {
        let name = "";
        let j = i + 1;
        while (j < str.length) {
          const code = str.charCodeAt(j);
          if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
            name += str[j++];
            continue;
          }
          break;
        }
        if (!name)
          throw new TypeError(`Missing parameter name at ${i}`);
        tokens.push({
          type: "NAME",
          index: i,
          value: name
        });
        i = j;
        continue;
      }
      if (char === "(") {
        let count = 1;
        let pattern = "";
        let j = i + 1;
        if (str[j] === "?") {
          throw new TypeError(`Pattern cannot start with "?" at ${j}`);
        }
        while (j < str.length) {
          if (str[j] === "\\") {
            pattern += str[j++] + str[j++];
            continue;
          }
          if (str[j] === ")") {
            count--;
            if (count === 0) {
              j++;
              break;
            }
          } else if (str[j] === "(") {
            count++;
            if (str[j + 1] !== "?") {
              throw new TypeError(`Capturing groups are not allowed at ${j}`);
            }
          }
          pattern += str[j++];
        }
        if (count)
          throw new TypeError(`Unbalanced pattern at ${i}`);
        if (!pattern)
          throw new TypeError(`Missing pattern at ${i}`);
        tokens.push({
          type: "PATTERN",
          index: i,
          value: pattern
        });
        i = j;
        continue;
      }
      tokens.push({
        type: "CHAR",
        index: i,
        value: str[i++]
      });
    }
    tokens.push({
      type: "END",
      index: i,
      value: ""
    });
    return tokens;
  }
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function parse(str, options = {}) {
    const tokens = lexer(str);
    const {
      prefixes = "./"
    } = options;
    const defaultPattern = `[^${escapeString(options.delimiter || "/#?")}]+?`;
    const result = [];
    let key = 0;
    let i = 0;
    let path = "";
    const tryConsume = (type) => {
      if (i < tokens.length && tokens[i].type === type)
        return tokens[i++].value;
    };
    const mustConsume = (type) => {
      const value = tryConsume(type);
      if (value !== void 0)
        return value;
      const {
        type: nextType,
        index
      } = tokens[i];
      throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}`);
    };
    const consumeText = () => {
      let result2 = "";
      let value;
      while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
        result2 += value;
      }
      return result2;
    };
    while (i < tokens.length) {
      const char = tryConsume("CHAR");
      const name = tryConsume("NAME");
      const pattern = tryConsume("PATTERN");
      if (name || pattern) {
        let prefix = char || "";
        if (prefixes.indexOf(prefix) === -1) {
          path += prefix;
          prefix = "";
        }
        if (path) {
          result.push(path);
          path = "";
        }
        result.push({
          name: name || key++,
          prefix,
          suffix: "",
          pattern: pattern || defaultPattern,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      const value = char || tryConsume("ESCAPED_CHAR");
      if (value) {
        path += value;
        continue;
      }
      if (path) {
        result.push(path);
        path = "";
      }
      const open = tryConsume("OPEN");
      if (open) {
        const prefix = consumeText();
        const name2 = tryConsume("NAME") || "";
        const pattern2 = tryConsume("PATTERN") || "";
        const suffix = consumeText();
        mustConsume("CLOSE");
        result.push({
          name: name2 || (pattern2 ? key++ : ""),
          pattern: name2 && !pattern2 ? defaultPattern : pattern2,
          prefix,
          suffix,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      mustConsume("END");
    }
    return result;
  }
  function tokensToFunction(tokens, options = {}) {
    const reFlags = flags(options);
    const {
      encode: encode2 = (x) => x,
      validate = true
    } = options;
    const matches = tokens.map((token) => {
      if (typeof token === "object") {
        return new RegExp(`^(?:${token.pattern})$`, reFlags);
      }
    });
    return (data) => {
      let path = "";
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (typeof token === "string") {
          path += token;
          continue;
        }
        const value = data ? data[token.name] : void 0;
        const optional = token.modifier === "?" || token.modifier === "*";
        const repeat = token.modifier === "*" || token.modifier === "+";
        if (Array.isArray(value)) {
          if (!repeat) {
            throw new TypeError(`Expected "${token.name}" to not repeat, but got an array`);
          }
          if (value.length === 0) {
            if (optional)
              continue;
            throw new TypeError(`Expected "${token.name}" to not be empty`);
          }
          for (let j = 0; j < value.length; j++) {
            const segment = encode2(value[j], token);
            if (validate && !matches[i].test(segment)) {
              throw new TypeError(`Expected all "${token.name}" to match "${token.pattern}", but got "${segment}"`);
            }
            path += token.prefix + segment + token.suffix;
          }
          continue;
        }
        if (typeof value === "string" || typeof value === "number") {
          const segment = encode2(String(value), token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError(`Expected "${token.name}" to match "${token.pattern}", but got "${segment}"`);
          }
          path += token.prefix + segment + token.suffix;
          continue;
        }
        if (optional)
          continue;
        const typeOfMessage = repeat ? "an array" : "a string";
        throw new TypeError(`Expected "${token.name}" to be ${typeOfMessage}`);
      }
      return path;
    };
  }
  function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
  }
  function regexpToRegexp(path, keys) {
    if (!keys)
      return path;
    const groups = path.source.match(/\((?!\?)/g);
    if (groups) {
      for (let i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: "",
          suffix: "",
          modifier: "",
          pattern: ""
        });
      }
    }
    return path;
  }
  function tokensToRegexp(tokens, keys, options = {}) {
    const {
      strict = false,
      start = true,
      end = true,
      encode: encode2 = (x) => x
    } = options;
    const endsWith = `[${escapeString(options.endsWith || "")}]|$`;
    const delimiter = `[${escapeString(options.delimiter || "/#?")}]`;
    let route = start ? "^" : "";
    for (const token of tokens) {
      if (typeof token === "string") {
        route += escapeString(encode2(token));
      } else {
        const prefix = escapeString(encode2(token.prefix));
        const suffix = escapeString(encode2(token.suffix));
        if (token.pattern) {
          if (keys)
            keys.push(token);
          if (prefix || suffix) {
            if (token.modifier === "+" || token.modifier === "*") {
              const mod = token.modifier === "*" ? "?" : "";
              route += `(?:${prefix}((?:${token.pattern})(?:${suffix}${prefix}(?:${token.pattern}))*)${suffix})${mod}`;
            } else {
              route += `(?:${prefix}(${token.pattern})${suffix})${token.modifier}`;
            }
          } else {
            route += `(${token.pattern})${token.modifier}`;
          }
        } else {
          route += `(?:${prefix}${suffix})${token.modifier}`;
        }
      }
    }
    if (end) {
      if (!strict)
        route += `${delimiter}?`;
      route += !options.endsWith ? "$" : `(?=${endsWith})`;
    } else {
      const endToken = tokens[tokens.length - 1];
      const isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
      if (!strict) {
        route += `(?:${delimiter}(?=${endsWith}))?`;
      }
      if (!isEndDelimited) {
        route += `(?=${delimiter}|${endsWith})`;
      }
    }
    return new RegExp(route, flags(options));
  }
  function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
  }
  function pathToRegexp$1(path, keys, options) {
    if (path instanceof RegExp)
      return regexpToRegexp(path, keys);
    if (Array.isArray(path))
      return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
  }
  function arrayToRegexp(paths, keys, options) {
    const parts = paths.map((path) => pathToRegexp$1(path, keys, options).source);
    return new RegExp(`(?:${parts.join("|")})`, flags(options));
  }
  const {
    INVALID_ROUTE_QUERY,
    MISSING_ROUTE_TEMPLATE,
    MISSING_PAGE_BINDING,
    INVALID_PAGE_BINDING,
    INVALID_URI_SYNTAX
  } = _0_13_10.messages;
  function parseRoutes(config) {
    const {
      routes,
      caseSensitive
    } = config;
    return routes.map((def) => {
      return parseUriRoute(def, caseSensitive);
    });
  }
  function parseUriRoute(def, caseSensitive = false) {
    const params = [];
    const {
      uri,
      page
    } = def;
    _0_13_10.invariant(!!uri, MISSING_ROUTE_TEMPLATE);
    _0_13_10.invariant(isValidUri(uri), INVALID_URI_SYNTAX);
    _0_13_10.invariant(!!page, MISSING_PAGE_BINDING);
    const path = getPathFromUrl(uri);
    const query = getQueryFromUrl(uri);
    const regex = pathToRegexp$1(path, params, {
      sensitive: caseSensitive,
      end: def.exact === false ? false : true
    });
    const toPath = compile(path, {
      encode: encodeURIComponent
    });
    const compiledQuery = compileQueryObject(query);
    const queryMatcher = getQueryMatcher(compiledQuery, caseSensitive);
    const compiledRoute = {
      original: def,
      regex,
      params,
      toPath,
      compiledQuery,
      queryMatcher
    };
    _0_13_10.invariant(isValidPageBinding(compiledRoute), INVALID_PAGE_BINDING);
    return compiledRoute;
  }
  function isValidUri(uri = "") {
    const invalid = ["*", "(", ")", ";"];
    const containsInvalidCharacter = invalid.some((invalidChar) => uri.indexOf(invalidChar) >= 0);
    return !containsInvalidCharacter;
  }
  function isValidPageBinding(compiledDef) {
    const {
      original: {
        page
      } = {},
      params,
      compiledQuery
    } = compiledDef;
    const pageType = page ? page.type : page;
    const pageAttributes = (page ? page.attributes : page) || {};
    const pageState = (page ? page.state : page) || {};
    if (typeof pageType !== "string" || typeof pageAttributes !== "object" || typeof pageState !== "object") {
      return false;
    }
    const pathParams = Object.values(params).map(({
      name
    }) => name);
    const queryParams = getQueryNames(compiledQuery);
    const allParams = [...pathParams, ...queryParams];
    const attributeBindings = Object.values(pageAttributes).filter(isParam).map(getParamName);
    const stateBindings = Object.values(pageState).filter(isParam).map(getParamName);
    const hasAllParams = allParams.every((paramName) => {
      if (typeof paramName !== "string") {
        return false;
      }
      return attributeBindings.indexOf(paramName) >= 0 || stateBindings.indexOf(paramName) >= 0;
    });
    const paramsUsedOnlyOnce = allParams.length === attributeBindings.length + stateBindings.length;
    return !!(page && pageType && pageAttributes && pageState && hasAllParams && paramsUsedOnlyOnce);
  }
  function compileQueryObject(queryObject) {
    const compiled = {};
    Object.keys(queryObject).forEach((qKey) => {
      const qValue = queryObject[qKey];
      _0_13_10.invariant(isParam(qKey) ? qValue === null : true, INVALID_ROUTE_QUERY);
      if (isParam(qKey)) {
        compiled[qKey.substr(1)] = {
          routeParamName: qKey
        };
      } else if (qValue && isParam(qValue)) {
        compiled[qKey] = {
          routeParamName: qValue
        };
      } else {
        compiled[qKey] = {
          literalValue: qValue === null ? null : qValue
        };
      }
    });
    return compiled;
  }
  function getQueryMatcher(compiledQuery, caseSensitive = false) {
    const queryMatcher = (queryObject) => {
      const inputKeys = Object.keys(queryObject);
      const defKeys = Object.keys(compiledQuery);
      const hasAllDefKeys = defKeys.every((defKey) => inputKeys.indexOf(defKey) >= 0);
      if (hasAllDefKeys) {
        return defKeys.reduce((matched, defKey) => {
          if (matched === null)
            return null;
          const {
            literalValue,
            routeParamName
          } = compiledQuery[defKey];
          const inputValue = queryObject[defKey];
          let literalValueMatches = true;
          if (typeof literalValue === "string") {
            literalValueMatches = caseSensitive ? literalValue === inputValue : literalValue.toUpperCase() === (inputValue == null ? inputValue : inputValue.toUpperCase());
          } else if (literalValue === null) {
            literalValueMatches = inputValue === literalValue;
          }
          if (literalValueMatches) {
            matched = {
              ...matched,
              [defKey]: {
                value: inputValue,
                routeParamName
              }
            };
          } else {
            matched = null;
          }
          return matched;
        }, {});
      }
      return null;
    };
    return queryMatcher;
  }
  const hasDocument = typeof document !== "undefined";
  const pathToRegexp = {
    pathToRegexp: pathToRegexp$1,
    compile
  };
  exports.DEFAULT_I18N_ROUTER_CONFIG = DEFAULT_I18N_ROUTER_CONFIG;
  exports.createFilterChain = createFilterChain;
  exports.decode = decode;
  exports.encode = encode;
  exports.freeze = freeze;
  exports.getPageReferenceFromUriAndRouteDef = getPageReferenceFromUriAndRouteDef;
  exports.getPageReferenceFromUrl = getPageReferenceFromUrl;
  exports.getPathFromUrl = getPathFromUrl;
  exports.getQueryFromUrl = getQueryFromUrl;
  exports.getQueryString = getQueryString;
  exports.getUrlFromPageReference = getUrlFromPageReference;
  exports.getUrlFromPageReferenceAndRouteDef = getUrlFromPageReferenceAndRouteDef;
  exports.guid = guid;
  exports.hasDocument = hasDocument;
  exports.isObject = isObject;
  exports.isValidRoute = isValidRoute;
  exports.matchRouteByUrl = matchRouteByUrl;
  exports.parseRoutes = parseRoutes;
  exports.pathToRegexp = pathToRegexp;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/routerUtils", ["exports", "lwr/routerUtils/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/navigationMixinHacks/v/0_13_10", ["exports", "lwr/routerUtils/v/0_13_10"], function(exports, _0_13_10) {
  "use strict";
  const CONTEXT_ID_BACKDOOR = `universalcontainergetnavigationcontext${_0_13_10.guid()}`;
  exports.CONTEXT_ID_BACKDOOR = CONTEXT_ID_BACKDOOR;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/navigationMixinHacks", ["exports", "lwr/navigationMixinHacks/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/currentView/v/0_13_10", ["exports", "lwr/contextUtils/v/0_13_10", "lwr/routerErrors/v/0_13_10"], function(exports, _0_13_10, _0_13_10$1) {
  "use strict";
  const CURRENT_VIEW_CONTEXT = new _0_13_10.ContextInfo(void 0);
  const CurrentView = class CurrentView extends _0_13_10.generateContextualWireAdapter(CURRENT_VIEW_CONTEXT) {
    async update(config, context) {
      if (context) {
        const viewName = config && config.viewName ? config.viewName : "default";
        const viewEntry = context.viewset[viewName];
        const viewInfo = viewEntry;
        const viewImporter = viewInfo && viewInfo.module || viewEntry;
        let importError;
        if (viewImporter) {
          try {
            const viewModule = await viewImporter();
            const newViewCtor = viewModule && viewModule.default;
            if (newViewCtor && newViewCtor.constructor !== void 0) {
              this._callback(newViewCtor);
            } else {
              throw new Error("error occurred with view import");
            }
          } catch (e) {
            const error = e;
            if (viewInfo.specifier) {
              importError = _0_13_10$1.generateMessageObject(_0_13_10$1.messages.VIEW_IMPORT_FAILED_WITH_SPECIFIER, [viewInfo.specifier, viewName, error.message, error.stack || ""]);
            } else {
              importError = _0_13_10$1.generateMessageObject(_0_13_10$1.messages.VIEW_IMPORT_FAILED, [viewName, error.message, error.stack || ""]);
            }
          }
        } else {
          importError = _0_13_10$1.generateMessageObject(_0_13_10$1.messages.VIEW_MISSING, [viewName]);
        }
        if (context.onComplete) {
          context.onComplete(importError);
        }
      }
    }
  };
  exports.CurrentView = CurrentView;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/currentView", ["exports", "lwr/currentView/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/currentPageReference/v/0_13_10", ["exports", "lwr/contextUtils/v/0_13_10"], function(exports, _0_13_10) {
  "use strict";
  const CURRENT_PAGE_REFERENCE_CONTEXT = new _0_13_10.ContextInfo(void 0);
  const CurrentPageReference = _0_13_10.generateContextualWireAdapter(CURRENT_PAGE_REFERENCE_CONTEXT);
  exports.CurrentPageReference = CurrentPageReference;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/currentPageReference", ["exports", "lwr/currentPageReference/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/routerErrors/v/0_13_10", ["exports"], function(exports) {
  "use strict";
  const ERROR_CODE_PREFIX = "LWR";
  const DiagnosticLevel = {
    Fatal: 0,
    Error: 1,
    Warning: 2,
    Log: 3
  };
  function replaceArgs(message, args) {
    return Array.isArray(args) ? message.replace(/\{([0-9]+)\}/g, (_, index) => {
      return args[index];
    }) : message;
  }
  function generateMessage(info, args) {
    return `${info.code}: ${replaceArgs(info.message, args)}`;
  }
  function generateMessageObject(info, args) {
    const messageObject = {
      ...info,
      message: replaceArgs(info.message, args)
    };
    if (info.address) {
      messageObject.address = replaceArgs(info.address, args);
    }
    if (info.stack) {
      messageObject.stack = replaceArgs(info.stack, args);
    }
    return messageObject;
  }
  function invariant(condition, errorInfo, args) {
    if (!condition) {
      throw new Error(generateMessage(errorInfo, args));
    }
  }
  const messages = {
    INVALID_MIXIN_CMP: {
      code: `${ERROR_CODE_PREFIX}4001`,
      message: "{0} must be an Element type",
      level: DiagnosticLevel.Error
    },
    MISSING_CONTEXT: {
      code: `${ERROR_CODE_PREFIX}4002`,
      message: "Could not find context to perform navigation action.",
      level: DiagnosticLevel.Error
    },
    INVALID_CONTEXT: {
      code: `${ERROR_CODE_PREFIX}4003`,
      message: "Cannot register navigation context; it must have this shape: { navigate, generateUrl, subscribe }",
      level: DiagnosticLevel.Error
    },
    MULTIPLE_ROOTS: {
      code: `${ERROR_CODE_PREFIX}4004`,
      message: "Router connection failed. There can only be one root router.",
      level: DiagnosticLevel.Error
    },
    MULTIPLE_CHILDREN: {
      code: `${ERROR_CODE_PREFIX}4005`,
      message: "Could not add to the navigation hierarchy. There can only be one child per navigation node.",
      level: DiagnosticLevel.Error
    },
    MISSING_ROUTE: {
      code: `${ERROR_CODE_PREFIX}4006`,
      message: 'A route cannot be created to navigate to URL "{0}"',
      level: DiagnosticLevel.Error,
      address: "{0}"
    },
    MISSING_URL: {
      code: `${ERROR_CODE_PREFIX}4007`,
      message: 'A URL cannot be created to navigate to route "{0}"',
      level: DiagnosticLevel.Error,
      address: "{0}"
    },
    PRENAV_FAILED: {
      code: `${ERROR_CODE_PREFIX}4008`,
      message: 'A preNavigate hook listener blocked routing to "{0}"',
      level: DiagnosticLevel.Warning,
      address: "{0}"
    },
    MISSING_ROUTE_TEMPLATE: {
      code: `${ERROR_CODE_PREFIX}4009`,
      message: 'A route definition must contain a "uri" property.',
      level: DiagnosticLevel.Error
    },
    MISSING_ROUTE_CMP: {
      code: `${ERROR_CODE_PREFIX}4016`,
      message: "Expected a route view component with a default export.",
      level: DiagnosticLevel.Error
    },
    MISSING_DATA_CONTEXT: {
      code: `${ERROR_CODE_PREFIX}4018`,
      message: "Could not find context to retrieve navigation data.",
      level: DiagnosticLevel.Error
    },
    INVALID_ROUTE_QUERY: {
      code: `${ERROR_CODE_PREFIX}4019`,
      message: "Invalid query param in route definition.",
      level: DiagnosticLevel.Error
    },
    MISSING_PAGE_BINDING: {
      code: `${ERROR_CODE_PREFIX}4020`,
      message: "Route definition must provide page binding",
      level: DiagnosticLevel.Error
    },
    INVALID_PAGE_BINDING: {
      code: `${ERROR_CODE_PREFIX}4021`,
      message: "Invalid page binding in route definition",
      level: DiagnosticLevel.Error
    },
    INVALID_URI_SYNTAX: {
      code: `${ERROR_CODE_PREFIX}4022`,
      message: "Invalid uri syntax. URI cannot contain *, +, (, ), ",
      level: DiagnosticLevel.Error
    },
    VIEW_IMPORT_FAILED: {
      code: `${ERROR_CODE_PREFIX}4023`,
      message: 'Error importing view with name "{0}", failure was: {1}',
      level: DiagnosticLevel.Error,
      stack: "{2}"
    },
    VIEW_MISSING: {
      code: `${ERROR_CODE_PREFIX}4024`,
      message: 'Expected a view with name "{0}" in the viewset',
      level: DiagnosticLevel.Error
    },
    VIEW_IMPORT_FAILED_WITH_SPECIFIER: {
      code: `${ERROR_CODE_PREFIX}4025`,
      message: 'Error importing module "{0}" from view with name "{1}", failure was: {2}',
      level: DiagnosticLevel.Error,
      stack: "{3}"
    },
    NO_ROUTE_MATCH: {
      code: `${ERROR_CODE_PREFIX}4026`,
      message: "A routing match cannot be found for: {0}",
      level: DiagnosticLevel.Error
    },
    INVALID_ROUTE_HANDLER: {
      code: `${ERROR_CODE_PREFIX}4027`,
      message: 'Route definition "{0}" does not have a valid route handler module',
      level: DiagnosticLevel.Error
    },
    DESTINATION_NOT_FOUND: {
      code: `${ERROR_CODE_PREFIX}4028`,
      message: "Route handler returned 404: Not Found",
      level: DiagnosticLevel.Error
    },
    DESTINATION_ERROR: {
      code: `${ERROR_CODE_PREFIX}4029`,
      message: "Route handler returned error status {0}: {1}",
      level: DiagnosticLevel.Error,
      stack: "{2}"
    },
    NO_INIT_URL: {
      code: `${ERROR_CODE_PREFIX}4030`,
      message: 'Cannot initialize a server router without a "url"',
      level: DiagnosticLevel.Error
    }
  };
  exports.generateMessage = generateMessage;
  exports.generateMessageObject = generateMessageObject;
  exports.invariant = invariant;
  exports.messages = messages;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/routerErrors", ["exports", "lwr/routerErrors/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/contextUtils/v/0_13_10", ["exports", "lwr/routerErrors/v/0_13_10"], function(exports, _0_13_10) {
  "use strict";
  function validateProvider(obj) {
    if (obj === void 0 || obj === null) {
      throw new TypeError("Provider must be defined.");
    }
  }
  class ContextInfo {
    constructor(defaultValue) {
      this.infoMap = new WeakMap();
      this.defaultValue = defaultValue;
    }
    getInfo(targetProvider) {
      let info = this.infoMap.get(targetProvider);
      if (info === void 0) {
        info = {
          consumers: new Set()
        };
        this.infoMap.set(targetProvider, info);
      }
      return info;
    }
    setContext(targetProvider, contextValue) {
      validateProvider(targetProvider);
      const value = contextValue;
      const info = this.getInfo(targetProvider);
      info.contextValue = contextValue;
      info.consumers.forEach((consumer) => consumer.provide(value));
      if (info.consumers.size === 0 && value?.onComplete) {
        value.onComplete();
      }
    }
    getContext(targetProvider) {
      validateProvider(targetProvider);
      const {
        contextValue
      } = this.getInfo(targetProvider);
      return contextValue !== void 0 ? contextValue : this.defaultValue;
    }
    clearContext(targetProvider) {
      validateProvider(targetProvider);
      this.infoMap.delete(targetProvider);
    }
    subscribeContext(targetProvider, consumer) {
      validateProvider(targetProvider);
      const {
        consumers,
        contextValue
      } = this.getInfo(targetProvider);
      if (!consumers.has(consumer)) {
        consumers.add(consumer);
        consumer.provide(contextValue);
      }
    }
    unsubscribeContext(targetProvider, consumer) {
      validateProvider(targetProvider);
      this.getInfo(targetProvider).consumers.delete(consumer);
    }
  }
  const CACHE = new WeakMap();
  function getNavigationHelm(id) {
    const metadata = CACHE.get(id);
    if (!metadata || !metadata.value) {
      throw new Error(_0_13_10.generateMessage(_0_13_10.messages.MISSING_CONTEXT));
    }
    return metadata.value;
  }
  function registerNavigationHelm(contextId, contextValue) {
    const metadata = {
      id: contextId,
      value: contextValue,
      update: (newValue) => {
        metadata.value = newValue;
      }
    };
    CACHE.set(metadata.id, metadata);
    return metadata;
  }
  function generateContextualWireAdapter(contextInstance) {
    var _Adapter;
    const Adapter = (_Adapter = class Adapter {
      constructor(callback) {
        this._callback = callback;
      }
      connect() {
      }
      disconnect() {
      }
      update(config, context) {
        if (context) {
          this._callback(context);
        }
      }
      static setContext(targetProvider, contextValue) {
        contextInstance.setContext(targetProvider, contextValue);
      }
      static getContext(targetProvider) {
        return contextInstance.getContext(targetProvider);
      }
      static clearContext(targetProvider) {
        contextInstance.clearContext(targetProvider);
      }
      static subscribeContext(targetProvider, consumer) {
        contextInstance.subscribeContext(targetProvider, consumer);
      }
      static unsubscribeContext(targetProvider, consumer) {
        contextInstance.unsubscribeContext(targetProvider, consumer);
      }
    }, _Adapter.contextSchema = {
      value: "required"
    }, _Adapter);
    return Adapter;
  }
  exports.ContextInfo = ContextInfo;
  exports.generateContextualWireAdapter = generateContextualWireAdapter;
  exports.getNavigationHelm = getNavigationHelm;
  exports.registerNavigationHelm = registerNavigationHelm;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/contextUtils", ["exports", "lwr/contextUtils/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/navigationContext/v/0_13_10", ["exports", "lwr/contextUtils/v/0_13_10"], function(exports, _0_13_10) {
  "use strict";
  const NAVIGATION_CONTEXT = new _0_13_10.ContextInfo(void 0);
  const NavigationContext = _0_13_10.generateContextualWireAdapter(NAVIGATION_CONTEXT);
  exports.NavigationContext = NavigationContext;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/navigationContext", ["exports", "lwr/navigationContext/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/navigation/v/0_13_10", ["exports", "lwr/navigationContext/v/0_13_10", "lwr/currentPageReference/v/0_13_10", "lwr/currentView/v/0_13_10", "lwr/contextUtils/v/0_13_10", "lwr/routerErrors/v/0_13_10", "lwr/navigationMixinHacks/v/0_13_10"], function(exports, _0_13_10, _0_13_10$1, _0_13_10$2, _0_13_10$3, _0_13_10$4, _0_13_10$5) {
  "use strict";
  function navigate(context, pageReference, replace, options) {
    const api = _0_13_10$3.getNavigationHelm(context);
    api.navigate(pageReference, replace, options);
  }
  function generateUrl(context, pageReference, options) {
    const api = _0_13_10$3.getNavigationHelm(context);
    return api.generateUrl(pageReference, options);
  }
  const isSSR = typeof window === "undefined";
  const Navigate = Symbol("Navigate");
  const GenerateUrl = Symbol("GenerateUrl");
  const NavContext = Symbol("NavContext");
  const GetContext = Symbol("NavContext");
  function NavigationMixin(Base) {
    _0_13_10$4.invariant(typeof Base.prototype.dispatchEvent === "function", _0_13_10$4.messages.INVALID_MIXIN_CMP, [Base.toString()]);
    class Mixin extends Base {
      [GetContext]() {
        if (!this[NavContext]) {
          this.dispatchEvent(new CustomEvent(_0_13_10$5.CONTEXT_ID_BACKDOOR, {
            bubbles: true,
            composed: true,
            detail: {
              callback: (contextId) => {
                this[NavContext] = contextId;
              }
            }
          }));
          if (!this[NavContext]) {
            throw new Error(_0_13_10$4.generateMessage(_0_13_10$4.messages.MISSING_CONTEXT));
          }
        }
      }
      [Navigate](pageRef, replace, options) {
        if (!isSSR) {
          this[GetContext]();
          navigate(this[NavContext], pageRef, replace, options);
        }
      }
      async [GenerateUrl](pageRef, options) {
        if (!isSSR) {
          this[GetContext]();
          return generateUrl(this[NavContext], pageRef, options);
        } else {
          return null;
        }
      }
    }
    return Mixin;
  }
  NavigationMixin.Navigate = Navigate;
  NavigationMixin.GenerateUrl = GenerateUrl;
  NavigationMixin.NavContext = NavContext;
  Object.defineProperty(exports, "NavigationContext", {
    enumerable: true,
    get: function() {
      return _0_13_10.NavigationContext;
    }
  });
  Object.defineProperty(exports, "CurrentPageReference", {
    enumerable: true,
    get: function() {
      return _0_13_10$1.CurrentPageReference;
    }
  });
  Object.defineProperty(exports, "CurrentView", {
    enumerable: true,
    get: function() {
      return _0_13_10$2.CurrentView;
    }
  });
  Object.defineProperty(exports, "ContextInfo", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.ContextInfo;
    }
  });
  Object.defineProperty(exports, "generateContextualWireAdapter", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.generateContextualWireAdapter;
    }
  });
  Object.defineProperty(exports, "getNavigationHelm", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.getNavigationHelm;
    }
  });
  Object.defineProperty(exports, "registerNavigationHelm", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.registerNavigationHelm;
    }
  });
  exports.NavigationMixin = NavigationMixin;
  exports.generateUrl = generateUrl;
  exports.navigate = navigate;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/navigation", ["exports", "lwr/navigation/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/domRouter/v/0_13_10", ["exports", "lwr/navigation/v/0_13_10", "lwr/contextProvider/v/0_13_10", "lwr/routerErrors/v/0_13_10", "lwr/routerUtils/v/0_13_10", "lwr/observable/v/0_13_10", "lwr/metrics/v/0_13_10", "lwr/profiler/v/0_13_10", "lwr/navigationMixinHacks/v/0_13_10"], function(exports, _0_13_10$5, _0_13_10$6, _0_13_10$1, _0_13_10, _0_13_10$2, _0_13_10$4, _0_13_10$3, _0_13_10$7) {
  "use strict";
  const NAV_EVENT = `universalcontainernavigationevent${_0_13_10.guid()}`;
  const PARENT_EVENT = `universalcontainerparentevent${_0_13_10.guid()}`;
  class DomRouterImpl {
    constructor(config, router, target) {
      this.pendingRoute = null;
      this.committedRoute = null;
      this.contextId = Object.freeze(() => void 0);
      this.connected = false;
      this.preNavFilters = _0_13_10.createFilterChain();
      this.errorNavFilters = _0_13_10.createFilterChain();
      this._handleNavigationEvent = (event) => {
        const navigationEvent = event;
        if (navigationEvent.detail && typeof navigationEvent.detail === "object") {
          const {
            url,
            replace,
            address
          } = navigationEvent.detail;
          const continueNavigation = this.config.handleNavigation(address, replace);
          if (!continueNavigation) {
            navigationEvent.stopPropagation();
          } else {
            if (this.root && !url) {
              this.root.processError(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.MISSING_URL, [JSON.stringify(address)]));
            } else if (!this.parent) {
              this.process(url, replace);
            }
          }
        }
      };
      this._handleParentEvent = (event) => {
        event.stopImmediatePropagation();
        const parentRouterEvent = event;
        if (parentRouterEvent && parentRouterEvent.detail && typeof parentRouterEvent.detail === "function") {
          parentRouterEvent.detail(this);
        }
      };
      this.config = {
        handleNavigation: config.handleNavigation || (() => true)
      };
      this.target = target || window;
      this.router = router;
      this.router.contextId = this.contextId;
      this.routeObservable = _0_13_10$2.createObservable();
    }
    get root() {
      if (!this.parent) {
        return this;
      }
      let maybe = this.parent;
      while (maybe) {
        if (!maybe.parent) {
          return maybe;
        }
        maybe = maybe.parent;
      }
      throw new Error("No root router could be found");
    }
    updateWires(result, url, error) {
      if (error) {
        this.processError(error);
      } else {
        if (this.committedRoute && result.route === this.committedRoute.route) {
          return;
        }
        _0_13_10$3.logOperationEnd({
          id: _0_13_10$4.ROUTER_VIEW,
          specifier: this.eventId
        });
        this.pendingRoute = this.pendingRoute || {
          ...result,
          url
        };
        this.committedRoute = {
          ...this.pendingRoute,
          ...result
        };
        _0_13_10$5.CurrentPageReference.setContext(this.target, result.route.pageReference);
        this.routeObservable.next({
          ...this.committedRoute,
          viewset: result.viewset
        });
        _0_13_10$3.logOperationEnd({
          id: _0_13_10$4.ROUTER_NAV,
          specifier: this.eventId
        });
        if (this.child) {
          this.child.process(this._stripUrlForChild(this.committedRoute.url));
        }
      }
    }
    connect() {
      this._sendEvent(PARENT_EVENT, (router) => {
        this.parent = router;
        router.addChild(this);
      });
      const contextApi = {
        navigate: (address, replace) => this.navigate(address, replace),
        generateUrl: (address, options) => this.generateUrl(address, options),
        subscribe: (callback, replay) => this.subscribe(callback, replay)
      };
      _0_13_10$5.registerNavigationHelm(this.contextId, contextApi);
      _0_13_10$6.provideContext(this.contextId, this.target, _0_13_10$6.navigationContextContextualizer, _0_13_10$5.NavigationContext);
      _0_13_10$6.provideContext(void 0, this.target, _0_13_10$6.currentPageReferenceContextualizer, _0_13_10$5.CurrentPageReference);
      _0_13_10$6.provideContext(void 0, this.target, _0_13_10$6.currentViewContextualizer, _0_13_10$5.CurrentView);
      this.router.subscribe((result) => {
        if (result.status === 404) {
          this.processError(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.DESTINATION_NOT_FOUND));
          return;
        }
        if (result.status && result.status >= 400) {
          const error = result.error || new Error();
          this.processError(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.DESTINATION_ERROR, [result.status.toString(), error.message, error.stack || ""]));
          return;
        }
        const pageReference = result.route.pageReference || {};
        const url = this.router.generateUrl(pageReference) || "";
        _0_13_10$3.logOperationStart({
          id: _0_13_10$4.ROUTER_VIEW,
          specifier: this.eventId
        });
        if (result.viewset) {
          const currentViewContext = {
            viewset: result.viewset,
            onComplete: this.updateWires.bind(this, result, url)
          };
          _0_13_10$5.CurrentView.setContext(this.target, currentViewContext);
        } else if (result.route.pageReference) {
          this.updateWires(result, url);
        }
      }, true);
      if (_0_13_10.hasDocument) {
        this.target.addEventListener(NAV_EVENT, this._handleNavigationEvent);
        this.target.addEventListener(PARENT_EVENT, this._handleParentEvent);
        this.target.addEventListener(_0_13_10$7.CONTEXT_ID_BACKDOOR, (event) => {
          const navCtxEvent = event;
          if (navCtxEvent.detail.callback) {
            navCtxEvent.detail.callback(this.contextId);
          }
        });
      }
      this.connected = true;
    }
    disconnect() {
      this.target.removeEventListener(NAV_EVENT, this._handleNavigationEvent);
      this.target.removeEventListener(PARENT_EVENT, this._handleParentEvent);
      if (this.parent) {
        this.parent.child = void 0;
      }
      this.parent = void 0;
      if (this.child) {
        this.child.parent = void 0;
      }
      this.child = void 0;
      this.connected = false;
    }
    addPreNavigate(filters) {
      this.preNavFilters.add(filters);
    }
    addErrorNavigate(filters) {
      this.errorNavFilters.add(filters);
    }
    async addChild(child) {
      await new Promise((resolve) => {
        setTimeout(() => {
          _0_13_10$1.invariant(!this.child, _0_13_10$1.messages.MULTIPLE_CHILDREN);
          this.child = child;
          resolve();
        }, 0);
      });
      if (this.child && this.committedRoute) {
        const url = this._stripUrlForChild(this.committedRoute.url);
        const canContinue = await this.child.preProcess(url);
        if (canContinue) {
          this.child.process(url);
        }
      }
    }
    async process(url, _shouldReplace, options, _updateHistory) {
      this.eventId = new Date().getTime().toString();
      _0_13_10$3.logOperationStart({
        id: _0_13_10$4.ROUTER_NAV,
        specifier: this.eventId
      });
      try {
        if (!this.parent) {
          await this.preProcess(url, options);
        }
      } catch (e) {
        if (e.code) {
          this.processError(e);
          return false;
        }
        throw e;
      }
      const address = this.router.parseUrl(url);
      if (address) {
        this.router.navigate(address, options);
      }
      return true;
    }
    preProcess(url, options) {
      const address = this.router.parseUrl(url);
      const routingMatch = address && this.router.matchRoute(address, options);
      if (!routingMatch) {
        return Promise.reject(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.MISSING_ROUTE, [url]));
      }
      this.pendingRoute = {
        url,
        ...routingMatch
      };
      const canGo = this.preNavFilters.empty() ? Promise.resolve(true) : this.preNavFilters.compile({
        current: this.committedRoute || void 0,
        next: this.pendingRoute
      });
      return canGo.then((canContinue) => {
        return canContinue && this.child ? this.child.preProcess(this._stripUrlForChild(url)) : canContinue;
      }).then((canContinue) => {
        return canContinue || Promise.reject(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.PRENAV_FAILED, [url]));
      });
    }
    processError(messageObject) {
      _0_13_10$3.logOperationStart({
        id: _0_13_10$4.ROUTER_ERROR
      });
      this.errorNavFilters.compile(messageObject);
      if (this.child) {
        this.child.processError(messageObject);
      }
    }
    navigate(address, replace, options) {
      const routerOptions = this.filterNavigateOptions(options);
      let url = this.router.generateUrl(address, routerOptions);
      if (url) {
        const parentPath = this.parent && this.parent.committedRoute && this.parent.committedRoute.pathMatch || "";
        url = parentPath.concat(url);
      }
      this._sendEvent(NAV_EVENT, {
        url,
        replace,
        address
      });
    }
    generateUrl(address, options) {
      const routerOptions = this.filterNavigateOptions(options);
      const url = this.router.generateUrl(address, routerOptions);
      if (!url) {
        return null;
      }
      const parentPath = this.parent && this.parent.committedRoute && this.parent.committedRoute.pathMatch || "";
      return `${parentPath}${url}`;
    }
    subscribe(callback, replay) {
      return this.routeObservable.subscribe({
        next: callback,
        error: () => {
        },
        complete: () => {
        }
      }, Boolean(replay));
    }
    _sendEvent(name, payload) {
      _0_13_10.hasDocument && this.target.dispatchEvent(new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail: payload
      }));
    }
    _stripUrlForChild(url) {
      if (this.pendingRoute && url.indexOf(this.pendingRoute.pathMatch) === 0) {
        return url.replace(this.pendingRoute.pathMatch, "");
      }
      return url;
    }
    filterNavigateOptions(options) {
      const isRoot = !this.parent;
      const routerOptions = {
        ...options,
        locale: isRoot ? options?.locale : void 0
      };
      return routerOptions;
    }
  }
  function createDomRouter(config, router, target) {
    return new DomRouterImpl(config, router, target);
  }
  exports.DomRouterImpl = DomRouterImpl;
  exports.NAV_EVENT = NAV_EVENT;
  exports.PARENT_EVENT = PARENT_EVENT;
  exports.createDomRouter = createDomRouter;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/domRouter", ["exports", "lwr/domRouter/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/historyRouter/v/0_13_10", ["exports", "lwc/v/7_1_5", "lwr/domRouter/v/0_13_10", "lwr/domRouterUtils/v/0_13_10", "lwr/routerUtils/v/0_13_10"], function(exports, _7_1_5, _0_13_10, _0_13_10$2, _0_13_10$1) {
  "use strict";
  class HistoryRouter extends _0_13_10.DomRouterImpl {
    constructor(...args) {
      super(...args);
      this.historyDisabled = false;
    }
    connect() {
      super.connect();
      if (!this.historyDisabled) {
        _0_13_10$1.hasDocument && window.addEventListener("popstate", this.onpopstate.bind(this));
        this.onpopstate();
      }
    }
    onpopstate() {
      if (!this.parent && _0_13_10$1.hasDocument) {
        this.catchBrowserUpdate(_0_13_10$2.getRelativeUrl(window.location.href));
      }
    }
    disconnect() {
      super.disconnect();
      _0_13_10$1.hasDocument && window.removeEventListener("popstate", this.onpopstate);
    }
    async process(url, shouldReplace, options, updateHistory = true) {
      const canContinue = await super.process(url, shouldReplace, options, updateHistory);
      if (canContinue && !this.historyDisabled && updateHistory && this.connected && !this.parent) {
        if (shouldReplace) {
          _0_13_10$2.replace(url);
        } else {
          _0_13_10$2.set(url);
        }
      }
      return canContinue;
    }
    catchBrowserUpdate(url) {
      this.process(url, false, {}, false);
    }
  }
  _7_1_5.registerDecorators(HistoryRouter, {
    fields: ["historyDisabled"]
  });
  function createHistoryRouter(config, router, target) {
    return new HistoryRouter(config, router, target);
  }
  exports.HistoryRouter = HistoryRouter;
  exports.createHistoryRouter = createHistoryRouter;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/historyRouter", ["exports", "lwr/historyRouter/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/routerContainer/v/0_13_10", ["exports", "lwc/v/7_1_5", "lwr/historyRouter/v/0_13_10", "lwr/routerErrors/v/0_13_10", "lwr/domRouter/v/0_13_10", "lwr/routerUtils/v/0_13_10"], function(exports, _7_1_5, _0_13_10$1, _0_13_10$2, _0_13_10, _0_13_10$3) {
  "use strict";
  function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
    var shadowSelector = token ? "[" + token + "]" : "";
    return "span.router-title" + shadowSelector + " {position: absolute;margin: -1px;border: 0;padding: 0;width: 1px;height: 1px;overflow: hidden;clip: rect(0 0 0 0);text-transform: none;white-space: nowrap;}";
  }
  var _implicitStylesheets = [stylesheet];
  const $fragment1 = _7_1_5.parseFragment`<span class="router-title${0}" aria-live="polite" aria-atomic="true"${2}></span>`;
  const stc0 = {
    key: 0
  };
  const stc1 = [];
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {s: api_slot, st: api_static_fragment} = $api;
    return [api_slot("", stc0, stc1, $slotset), api_static_fragment($fragment1, 2)];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.slots = [""];
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-7bis3qj4jjc";
  tmpl.legacyStylesheetToken = "lwr-routerContainer_routerContainer";
  if (_implicitStylesheets) {
    tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
  }
  _7_1_5.freezeTemplate(tmpl);
  let hasRoot = false;
  function createNavigationContext(node, config = {}, portableRouter) {
    const newRouter = config.historyDisabled ? new _0_13_10.DomRouterImpl(config, portableRouter, node) : new _0_13_10$1.HistoryRouter(config, portableRouter, node);
    const routerAPI = {
      addPreNavigate: (listener) => {
        newRouter.addPreNavigate(listener);
        return routerAPI;
      },
      addPostNavigate: (listener) => {
        newRouter.subscribe(listener);
        return routerAPI;
      },
      addErrorNavigate: (listener) => {
        newRouter.addErrorNavigate(listener);
        return routerAPI;
      },
      connect: () => {
        newRouter.connect();
        _0_13_10$2.invariant(!hasRoot || !!newRouter.parent, _0_13_10$2.messages.MULTIPLE_ROOTS);
        hasRoot = hasRoot || !newRouter.parent;
        routerAPI.id = newRouter.contextId;
      },
      disconnect: () => {
        hasRoot = hasRoot && !!newRouter.parent;
        newRouter.disconnect();
      }
    };
    return routerAPI;
  }
  class RouterContainer extends _7_1_5.LightningElement {
    constructor() {
      super();
      this.router = void 0;
      this.historyDisabled = false;
      this.currentTitle = _0_13_10$3.hasDocument ? document.title : "";
    }
    connectedCallback() {
      const config = {
        historyDisabled: this.historyDisabled,
        handleNavigation: this.handleNavigation.bind(this)
      };
      if (_0_13_10$3.hasDocument && this.router) {
        this.routerApi = createNavigationContext(this, config, this.router);
        this.routerApi.addPreNavigate(this.preNavigate.bind(this)).addPostNavigate(this.postNavigate.bind(this)).addErrorNavigate(this.errorNavigate.bind(this)).connect();
      }
    }
    preNavigate(routeChange) {
      const event = this._createEvent("prenavigate", routeChange, true);
      this.dispatchEvent(event);
      return !event.defaultPrevented;
    }
    postNavigate(routingResult) {
      this.dispatchEvent(this._createEvent("postnavigate", routingResult));
      const title = routingResult.routeDefinition.metadata && routingResult.routeDefinition.metadata.title;
      if (title) {
        this.currentTitle = title;
        document.title = title;
      }
      const a11yTitle = this.querySelector("span.router-title");
      if (a11yTitle)
        a11yTitle.innerHTML = this.currentTitle;
    }
    errorNavigate(error) {
      this.dispatchEvent(this._createEvent("errornavigate", error));
      return true;
    }
    handleNavigation(address, replace) {
      const event = this._createEvent("handlenavigation", {
        address,
        replace
      }, true);
      this.dispatchEvent(event);
      return !event.defaultPrevented;
    }
    disconnectedCallback() {
      if (this.routerApi) {
        this.routerApi.disconnect();
      }
    }
    _createEvent(name, payload, cancelable) {
      return new CustomEvent(name, {
        detail: payload,
        bubbles: false,
        composed: false,
        cancelable
      });
    }
  }
  RouterContainer.renderMode = "light";
  _7_1_5.registerDecorators(RouterContainer, {
    publicProps: {
      router: {
        config: 0
      },
      historyDisabled: {
        config: 0
      }
    }
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(RouterContainer, {
    tmpl: _tmpl,
    sel: "lwr-router-container",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/routerContainer", ["exports", "lwr/routerContainer/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/defaultView/v/1_66_768-252_0", ["exports", "lwc/v/7_1_5"], function(exports, _7_1_5) {
  "use strict";
  const stc0 = [];
  function tmpl($api, $cmp, $slotset, $ctx) {
    return stc0;
  }
  var html = _7_1_5.registerTemplate(tmpl);
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-15jgd3dq0rl";
  tmpl.legacyStylesheetToken = "webruntime-defaultView_defaultView";
  _7_1_5.freezeTemplate(tmpl);
  var _1_66_768252_0 = {
    html,
    attributes() {
    }
  };
  exports["default"] = _1_66_768252_0;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/defaultView", ["exports", "webruntime/defaultView/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/designmodeInit/v/1_66_768-252_0", ["exports", "lwr/loaderLegacy/v/0_13_10", "@app/isDesignMode/v/1", "@app/isPreviewMode/v/1"], function(exports, _0_13_10, isDesignMode, isPreviewMode) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var isDesignMode__default = /* @__PURE__ */ _interopDefaultLegacy(isDesignMode);
  var isPreviewMode__default = /* @__PURE__ */ _interopDefaultLegacy(isPreviewMode);
  const {
    info
  } = console;
  async function designmodeInit() {
    if (isDesignMode__default["default"] || isPreviewMode__default["default"]) {
      const {
        start,
        startPreview
      } = await _0_13_10.load("webruntimedesign/designmode/v/1");
      if (isDesignMode__default["default"]) {
        if (/interactive|complete/.test(document.readyState)) {
          start();
        } else {
          document.addEventListener("DOMContentLoaded", start, false);
        }
      }
      if (isPreviewMode__default["default"]) {
        if (startPreview) {
          startPreview();
        } else {
          info("startPreview() does not exist in this environment!");
        }
      }
    }
  }
  exports.designmodeInit = designmodeInit;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/designmodeInit", ["exports", "webruntime/designmodeInit/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/utils/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  function assert(assertion, message) {
    if (!assertion) {
      throw new Error(message);
    }
  }
  function isObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  }
  function getCookie(cookieName) {
    return typeof document !== "undefined" && document?.cookie.split(";").map((s) => s.trim().split("=")).filter(([name]) => name === cookieName).map(([, value]) => value)[0];
  }
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  }
  function uuidValidate(uuid) {
    return typeof uuid === "string" && /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i.test(uuid);
  }
  const absoluteUrlRegex = new RegExp("^([a-z]+://|//)", "i");
  function isAbsoluteURL(url) {
    if (!url) {
      return false;
    }
    return absoluteUrlRegex.test(url);
  }
  const sfdcCoreUrlRegex = new RegExp("/sfsites/c/.+", "i");
  function isSfdcCoreURL(url) {
    if (!url) {
      return false;
    }
    return sfdcCoreUrlRegex.test(url);
  }
  exports.assert = assert;
  exports.getCookie = getCookie;
  exports.isAbsoluteURL = isAbsoluteURL;
  exports.isObject = isObject;
  exports.isSfdcCoreURL = isSfdcCoreURL;
  exports.uuidValidate = uuidValidate;
  exports.uuidv4 = uuidv4;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/utils", ["exports", "webruntime/utils/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/logger/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  function log(...msg) {
    console.log(...msg);
  }
  function logError(...msg) {
    console.error(...msg);
  }
  exports.log = log;
  exports.logError = logError;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/logger", ["exports", "webruntime/logger/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/errors/v/1_66_768-252_0", ["exports", "webruntime/logger/v/1_66_768-252_0", "@communities-webruntime/common/v/1_66_768-252_0", "webruntime/transport/v/1"], function(exports, _1_66_768252_0, _1_66_768252_0$1, _1) {
  "use strict";
  function sendClientErrorToServer(payload) {
    _1.sendBeacon({
      path: _1_66_768252_0$1.ERRORS_PATH_PREFIX,
      payload: JSON.stringify(payload),
      contentType: "text/plain;charset=UTF-8"
    });
  }
  function dispatchClientError(error, type) {
    document.dispatchEvent(new CustomEvent("client-error", {
      detail: {
        error,
        type
      }
    }));
  }
  function reportError({
    subject,
    error,
    wcstack,
    type = _1_66_768252_0$1.CLIENT_ERROR_TYPES.UNKNOWN_ERROR
  }) {
    wcstack = wcstack || error.wcstack;
    const {
      message,
      stack
    } = error;
    const {
      hostname,
      pathname
    } = globalThis.location || {};
    const location = {
      hostname,
      pathname
    };
    const payload = {
      subject,
      message,
      stack,
      wcstack,
      location
    };
    _1_66_768252_0.logError(stack || payload);
    if (typeof document !== "undefined") {
      dispatchClientError(payload, type);
      sendClientErrorToServer(payload);
    }
  }
  exports.reportError = reportError;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/errors", ["exports", "webruntime/errors/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/innerApp/v/1_66_768-252_0", ["exports", "lwc/v/7_1_5", "@communities-webruntime/common/v/1_66_768-252_0", "webruntime/overrides/v/1", "webruntime/errors/v/1_66_768-252_0", "webruntime/utils/v/1_66_768-252_0", "webruntime/views/v/1", "webruntime/routingService/v/1", "@app/viewToThemeLayoutMap/v/1", "webruntime/designmodeInit/v/1_66_768-252_0", "webruntime/defaultView/v/1_66_768-252_0"], function(exports, _7_1_5, _1_66_768252_0$3, _1$1, _1_66_768252_0$2, _1_66_768252_0$1, getViewModule, _1, viewToThemeLayoutMap, _1_66_768252_0, defaultView) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var getViewModule__default = /* @__PURE__ */ _interopDefaultLegacy(getViewModule);
  var viewToThemeLayoutMap__default = /* @__PURE__ */ _interopDefaultLegacy(viewToThemeLayoutMap);
  var defaultView__default = /* @__PURE__ */ _interopDefaultLegacy(defaultView);
  var _tmpl = void 0;
  class InnerApp extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this.view = void 0;
      this.routerContainerView = void 0;
      this._routeParams = void 0;
      this.generatedTemplateHtml = void 0;
      this.attributes = {};
      this.previousRouteId = null;
      this.route = {};
    }
    get routeParams() {
      return this._routeParams || {};
    }
    set routeParams(value) {
      this._routeParams = value;
    }
    async connectedCallback() {
      const view = this.view || defaultView__default["default"];
      this.generatedTemplateHtml = view.html;
      this.attributes = view.attributes(this, this.routeParams) || {};
      await _1_66_768252_0.designmodeInit();
      this.subscription = _1.subscribe(this.loadThemeLayout.bind(this));
    }
    render() {
      return this.generatedTemplateHtml;
    }
    disconnectedCallback() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
    updateTemplate(template) {
      this.generatedTemplateHtml = template.html;
    }
    updateRoute(template, route) {
      _1.handleExtraRouteParams(route);
      const {
        state,
        attributes
      } = route;
      this.previousRouteId = this.route?.id || null;
      this._routeParams = {
        ...state,
        ...attributes
      };
      this.attributes = template.attributes(this, this.routeParams) || {};
      this.route = route;
    }
    restoreDefaultTemplate() {
      this.generatedTemplateHtml = defaultView__default["default"].html;
    }
    async loadThemeLayout(e) {
      let isViewLoaded = false;
      const view = e.routeDefinition.view;
      const themeLayout = viewToThemeLayoutMap__default["default"][view];
      if (true) {
        _1_66_768252_0$1.assert(themeLayout, `No theme layout matching the "${view}" view.`);
      }
      setTimeout(async () => {
        if (!isViewLoaded && this.themeLayout !== themeLayout) {
          this.restoreDefaultTemplate();
        }
      }, 10);
      let module;
      try {
        module = await getViewModule__default["default"](themeLayout);
      } catch (error) {
        await this.handleFetchViewFailed(error, e.routeDefinition.metadata?.isPublic);
      }
      if (!module) {
        return;
      }
      try {
        isViewLoaded = true;
        window?.scrollTo(0, 0);
        if (this.themeLayout !== themeLayout) {
          this.themeLayout = themeLayout;
          this.updateTemplate(module.default);
        }
        this.updateRoute(module.default, e.route);
      } catch (error) {
        _1_66_768252_0$2.reportError({
          subject: "InnerApp.loadThemeLayout error",
          type: _1_66_768252_0$3.CLIENT_ERROR_TYPES.FAILED_TO_LOAD_RESOURCE,
          error
        });
      }
    }
    async handleFetchViewFailed(error, isPublic) {
      const res = await _1$1.PageNavigationFailureOverrides.run({
        error,
        isPublic
      });
      if (res) {
        _1_66_768252_0$2.reportError({
          subject: "InnerApp.loadThemeLayout#getViewModule error",
          type: _1_66_768252_0$3.CLIENT_ERROR_TYPES.FAILED_TO_LOAD_RESOURCE,
          error
        });
      }
    }
  }
  InnerApp.renderMode = "light";
  _7_1_5.registerDecorators(InnerApp, {
    publicProps: {
      view: {
        config: 0
      },
      routerContainerView: {
        config: 0
      },
      routeParams: {
        config: 3
      }
    },
    publicMethods: ["updateTemplate", "updateRoute", "restoreDefaultTemplate"],
    fields: ["_routeParams", "generatedTemplateHtml", "attributes", "previousRouteId", "route"]
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(InnerApp, {
    tmpl: _tmpl,
    sel: "webruntime-inner-app",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/innerApp", ["exports", "webruntime/innerApp/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lightning/purifyLib/v/1_23_4-alpha", ["exports", "lwc/v/7_1_5"], function(exports, _7_1_5) {
  "use strict";
  var _tmpl = void 0;
  /*! @license DOMPurify 3.0.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.11/LICENSE */
  const {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  let {
    freeze,
    seal,
    create
  } = Object;
  let {
    apply,
    construct
  } = typeof Reflect !== "undefined" && Reflect;
  if (!freeze) {
    freeze = function freeze2(x) {
      return x;
    };
  }
  if (!seal) {
    seal = function seal2(x) {
      return x;
    };
  }
  if (!apply) {
    apply = function apply2(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }
  if (!construct) {
    construct = function construct2(Func, args) {
      return new Func(...args);
    };
  }
  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function(thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return apply(func, thisArg, args);
    };
  }
  function unconstruct(func) {
    return function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return construct(func, args);
    };
  }
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      setPrototypeOf(set, null);
    }
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === "string") {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === "object" && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === "function") {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }
  const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
  const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
  const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
  const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
  const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
  const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
  const text = freeze(["#text"]);
  const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
  const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
  const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
  const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
  const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
  const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
  const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
  const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
  const DOCTYPE_NAME = seal(/^html$/i);
  const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
  var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    DOCTYPE_NAME,
    CUSTOM_ELEMENT
  });
  const getGlobal = function getGlobal2() {
    return typeof window === "undefined" ? null : window;
  };
  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
      return null;
    }
    let suffix = null;
    const ATTR_NAME = "data-tt-policy-suffix";
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = "dompurify" + (suffix ? "#" + suffix : "");
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html2) {
          return html2;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      console.warn("TrustedTypes policy " + policyName + " could not be created.");
      return null;
    }
  };
  function createDOMPurify() {
    let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
    const DOMPurify = (root) => createDOMPurify(root);
    DOMPurify.version = "3.0.11";
    DOMPurify.removed = [];
    if (!window2 || !window2.document || window2.document.nodeType !== 9) {
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document: document2
    } = window2;
    const originalDocument = document2;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element: Element2,
      NodeFilter: NodeFilter2,
      NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window2;
    const ElementPrototype = Element2.prototype;
    const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
    const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
    const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
    const getParentNode = lookupGetter(ElementPrototype, "parentNode");
    if (typeof HTMLTemplateElement === "function") {
      const template = document2.createElement("template");
      if (template.content && template.content.ownerDocument) {
        document2 = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = "";
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document2;
    const {
      importNode
    } = originalDocument;
    let hooks = {};
    DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
    const {
      MUSTACHE_EXPR: MUSTACHE_EXPR2,
      ERB_EXPR: ERB_EXPR2,
      TMPLIT_EXPR: TMPLIT_EXPR2,
      DATA_ATTR: DATA_ATTR2,
      ARIA_ATTR: ARIA_ATTR2,
      IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
      ATTR_WHITESPACE: ATTR_WHITESPACE2,
      CUSTOM_ELEMENT: CUSTOM_ELEMENT2
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    let FORBID_TAGS = null;
    let FORBID_ATTR = null;
    let ALLOW_ARIA_ATTR = true;
    let ALLOW_DATA_ATTR = true;
    let ALLOW_UNKNOWN_PROTOCOLS = false;
    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    let SAFE_FOR_TEMPLATES = false;
    let WHOLE_DOCUMENT = false;
    let SET_CONFIG = false;
    let FORCE_BODY = false;
    let RETURN_DOM = false;
    let RETURN_DOM_FRAGMENT = false;
    let RETURN_TRUSTED_TYPE = false;
    let SANITIZE_DOM = true;
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
    let KEEP_CONTENT = true;
    let IN_PLACE = false;
    let USE_PROFILES = {};
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
    const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
    const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
    let transformCaseFunc = null;
    let CONFIG = null;
    const formElement = document2.createElement("form");
    const isRegexOrFunction = function isRegexOrFunction2(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    const _parseConfig = function _parseConfig2() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      if (!cfg || typeof cfg !== "object") {
        cfg = {};
      }
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
      transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
      ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
      RETURN_DOM = cfg.RETURN_DOM || false;
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
      FORCE_BODY = cfg.FORCE_BODY || false;
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
      IN_PLACE = cfg.IN_PLACE || false;
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      if (KEEP_CONTENT) {
        ALLOWED_TAGS["#text"] = true;
      }
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
      }
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ["tbody"]);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
        emptyHTML = trustedTypesPolicy.createHTML("");
      } else {
        if (trustedTypesPolicy === void 0) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }
        if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
          emptyHTML = trustedTypesPolicy.createHTML("");
        }
      }
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
    const HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
    const _checkValidNamespace = function _checkValidNamespace2(element) {
      let parent = getParentNode(element);
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: "template"
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "svg";
        }
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "math";
        }
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
        }
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }
      return false;
    };
    const _forceRemove = function _forceRemove2(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        node.parentNode.removeChild(node);
      } catch (_) {
        node.remove();
      }
    };
    const _removeAttribute = function _removeAttribute2(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }
      node.removeAttribute(name);
      if (name === "is" && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {
          }
        } else {
          try {
            node.setAttribute(name, "");
          } catch (_) {
          }
        }
      }
    };
    const _initDocument = function _initDocument2(dirty) {
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = "<remove></remove>" + dirty;
      } else {
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {
        }
      }
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, "template", null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    const _createNodeIterator = function _createNodeIterator2(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter2.SHOW_ELEMENT | NodeFilter2.SHOW_COMMENT | NodeFilter2.SHOW_TEXT | NodeFilter2.SHOW_PROCESSING_INSTRUCTION | NodeFilter2.SHOW_CDATA_SECTION, null);
    };
    const _isClobbered = function _isClobbered2(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
    };
    const _isNode = function _isNode2(object) {
      return typeof Node === "function" && object instanceof Node;
    };
    const _executeHook = function _executeHook2(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }
      arrayForEach(hooks[entryPoint], (hook) => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    const _sanitizeElements = function _sanitizeElements2(currentNode) {
      let content = null;
      _executeHook("beforeSanitizeElements", currentNode, null);
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      const tagName = transformCaseFunc(currentNode.nodeName);
      _executeHook("uponSanitizeElement", currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode.nodeType === 7) {
        _forceRemove(currentNode);
        return true;
      }
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode instanceof Element2 && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          content = stringReplace(content, expr, " ");
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      _executeHook("afterSanitizeElements", currentNode, null);
      return false;
    };
    const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
      if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
        return false;
      }
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName))
        ;
      else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName))
        ;
      else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (_isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)))
          ;
        else {
          return false;
        }
      } else if (URI_SAFE_ATTRIBUTES[lcName])
        ;
      else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, "")))
        ;
      else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
        ;
      else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, "")))
        ;
      else if (value) {
        return false;
      } else
        ;
      return true;
    };
    const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
      return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
    };
    const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
      _executeHook("beforeSanitizeAttributes", currentNode, null);
      const {
        attributes
      } = currentNode;
      if (!attributes) {
        return;
      }
      const hookEvent = {
        attrName: "",
        attrValue: "",
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      let l = attributes.length;
      while (l--) {
        const attr = attributes[l];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        let value = name === "value" ? attrValue : stringTrim(attrValue);
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = void 0;
        _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
        value = hookEvent.attrValue;
        if (hookEvent.forceKeepAttr) {
          continue;
        }
        _removeAttribute(name, currentNode);
        if (!hookEvent.keepAttr) {
          continue;
        }
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
            value = stringReplace(value, expr, " ");
          });
        }
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
          _removeAttribute(name, currentNode);
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
          if (namespaceURI)
            ;
          else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case "TrustedHTML": {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
              case "TrustedScriptURL": {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
            }
          }
        }
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          arrayPop(DOMPurify.removed);
        } catch (_) {
        }
      }
      _executeHook("afterSanitizeAttributes", currentNode, null);
    };
    const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);
      _executeHook("beforeSanitizeShadowDOM", fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        _executeHook("uponSanitizeShadowNode", shadowNode, null);
        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM2(shadowNode.content);
        }
        _sanitizeAttributes(shadowNode);
      }
      _executeHook("afterSanitizeShadowDOM", fragment, null);
    };
    DOMPurify.sanitize = function(dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = "<!-->";
      }
      if (typeof dirty !== "string" && !_isNode(dirty)) {
        if (typeof dirty.toString === "function") {
          dirty = dirty.toString();
          if (typeof dirty !== "string") {
            throw typeErrorCreate("dirty is not a string, aborting");
          }
        } else {
          throw typeErrorCreate("toString is not a function");
        }
      }
      if (!DOMPurify.isSupported) {
        return dirty;
      }
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      DOMPurify.removed = [];
      if (typeof dirty === "string") {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
          }
        }
      } else if (dirty instanceof Node) {
        body = _initDocument("<!---->");
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
          body = importedNode;
        } else if (importedNode.nodeName === "HTML") {
          body = importedNode;
        } else {
          body.appendChild(importedNode);
        }
      } else {
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        body = _initDocument(dirty);
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
        }
      }
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
      while (currentNode = nodeIterator.nextNode()) {
        if (_sanitizeElements(currentNode)) {
          continue;
        }
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        _sanitizeAttributes(currentNode);
      }
      if (IN_PLACE) {
        return dirty;
      }
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          serializedHTML = stringReplace(serializedHTML, expr, " ");
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };
    DOMPurify.clearConfig = function() {
      CONFIG = null;
      SET_CONFIG = false;
    };
    DOMPurify.isValidAttribute = function(tag, attr, value) {
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    DOMPurify.addHook = function(entryPoint, hookFunction) {
      if (typeof hookFunction !== "function") {
        return;
      }
      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    DOMPurify.removeHook = function(entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };
    DOMPurify.removeHooks = function(entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    DOMPurify.removeAllHooks = function() {
      hooks = {};
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();
  const __lwc_component_class_internal = _7_1_5.registerComponent(purify, {
    tmpl: _tmpl,
    sel: "lightning-purify-lib",
    apiVersion: 62
  });
  function sanitizeHTML(dirty, config) {
    return __lwc_component_class_internal.sanitize(dirty, config);
  }
  exports["default"] = sanitizeHTML;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lightning/purifyLib", ["exports", "lightning/purifyLib/v/1_23_4-alpha"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("experience/dataLayerObject/v/250_25_0", ["exports", "lwc/v/7_1_5", "lightning/purifyLib/v/1_23_4-alpha"], function(exports, _7_1_5, sanitizeHTML) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var sanitizeHTML__default = /* @__PURE__ */ _interopDefaultLegacy(sanitizeHTML);
  const stc0 = {
    hidden: ""
  };
  const stc1 = {
    lwc: {
      dom: "manual"
    }
  };
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {shc: api_sanitize_html_content, h: api_element} = $api;
    return [api_element("div", {
      attrs: stc0,
      props: {
        innerHTML: $ctx._rawHtml$0 !== ($ctx._rawHtml$0 = $cmp.scriptElement) ? $ctx._sanitizedHtml$0 = api_sanitize_html_content($cmp.scriptElement) : $ctx._sanitizedHtml$0
      },
      context: stc1,
      key: 0
    })];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-64pqse1e4gn";
  tmpl.legacyStylesheetToken = "experience-dataLayerObject_dataLayerObject";
  _7_1_5.freezeTemplate(tmpl);
  const ALLOWED_TAGS = [];
  const ALLOWED_ATTR = [];
  const richTextConfig = Object.freeze({
    ALLOWED_TAGS,
    ALLOWED_ATTR
  });
  function sanitizeDataLayerObject(html) {
    return typeof window === "undefined" ? html : sanitizeHTML__default["default"](html, richTextConfig);
  }
  class DataLayerObject extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this._scriptDataAttributes = {};
      this._catalogObjectId = void 0;
      this._catalogObjectType = void 0;
      this._catalogObjectAttributes = void 0;
      this._relatedCatalogObjects = void 0;
      this._customObject = void 0;
    }
    set scriptDataAttributes(scriptDataAttributes) {
      this._scriptDataAttributes = scriptDataAttributes;
    }
    get scriptDataAttributes() {
      return this._scriptDataAttributes;
    }
    set catalogObjectId(catalogObjectId) {
      this._catalogObjectId = catalogObjectId;
    }
    get catalogObjectId() {
      return this._catalogObjectId;
    }
    set catalogObjectType(catalogObjectType) {
      this._catalogObjectType = catalogObjectType;
    }
    get catalogObjectType() {
      return this._catalogObjectType;
    }
    set catalogObjectAttributes(catalogObjectAttributes) {
      this._catalogObjectAttributes = catalogObjectAttributes;
    }
    get catalogObjectAttributes() {
      return this._catalogObjectAttributes;
    }
    set relatedCatalogObjects(relatedCatalogObjects) {
      this._relatedCatalogObjects = relatedCatalogObjects;
    }
    get relatedCatalogObjects() {
      return this._relatedCatalogObjects;
    }
    set customObject(customObject) {
      this._customObject = customObject;
    }
    get customObject() {
      return this._customObject;
    }
    get scriptElement() {
      if (this.scriptDataAttributes?.providerType && (this.isCustomObject() || this.isCatalogObject())) {
        const dataProviderType = this.scriptDataAttributes?.providerType;
        return `<script type="application/json" data-provider-type="${dataProviderType}">${sanitizeDataLayerObject(this.scriptElementContent())}</script>`;
      }
      return ``;
    }
    scriptElementContent() {
      const renderedContent = this.isCustomObject() ? this.customObject : this.buildCatalogObject();
      return JSON.stringify(renderedContent);
    }
    isCustomObject() {
      return this.customObject ? true : false;
    }
    isCatalogObject() {
      return this.catalogObjectId && this.catalogObjectType ? true : false;
    }
    buildCatalogObject() {
      return {
        id: this.catalogObjectId,
        type: this.catalogObjectType,
        attributes: this.catalogObjectAttributes,
        relatedCatalogObjects: this.relatedCatalogObjects
      };
    }
  }
  DataLayerObject.renderMode = "light";
  _7_1_5.registerDecorators(DataLayerObject, {
    publicProps: {
      scriptDataAttributes: {
        config: 3
      },
      catalogObjectId: {
        config: 3
      },
      catalogObjectType: {
        config: 3
      },
      catalogObjectAttributes: {
        config: 3
      },
      relatedCatalogObjects: {
        config: 3
      },
      customObject: {
        config: 3
      },
      scriptElement: {
        config: 1
      }
    },
    fields: ["_scriptDataAttributes", "_catalogObjectId", "_catalogObjectType", "_catalogObjectAttributes", "_relatedCatalogObjects", "_customObject"]
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(DataLayerObject, {
    tmpl: _tmpl,
    sel: "experience-data-layer-object",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("experience/dataLayerObject", ["exports", "experience/dataLayerObject/v/250_25_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/app/v/1", ["exports", "lwc/v/7_1_5", "experience/dataLayerObject/v/250_25_0", "webruntime/innerApp/v/1_66_768-252_0", "lwr/routerContainer/v/0_13_10", "@salesforce/site/Id/v/1", "@salesforce/webstore/Id/v/1", "@app/templateDevName/v/1", "webruntime/routingService/v/1", "webruntime/errors/v/1_66_768-252_0"], function(exports, _7_1_5, _experienceDataLayerObject, _webruntimeInnerApp, _lwrRouterContainer, siteId, webstoreId, templateDevName, _1, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var _experienceDataLayerObject__default = /* @__PURE__ */ _interopDefaultLegacy(_experienceDataLayerObject);
  var _webruntimeInnerApp__default = /* @__PURE__ */ _interopDefaultLegacy(_webruntimeInnerApp);
  var _lwrRouterContainer__default = /* @__PURE__ */ _interopDefaultLegacy(_lwrRouterContainer);
  var siteId__default = /* @__PURE__ */ _interopDefaultLegacy(siteId);
  var webstoreId__default = /* @__PURE__ */ _interopDefaultLegacy(webstoreId);
  var templateDevName__default = /* @__PURE__ */ _interopDefaultLegacy(templateDevName);
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {c: api_custom_element} = $api;
    return [api_custom_element("lwr-router-container", _lwrRouterContainer__default["default"], {
      props: {
        router: $cmp.router
      },
      key: 0
    }, [api_custom_element("experience-data-layer-object", _experienceDataLayerObject__default["default"], {
      props: {
        scriptDataAttributes: $cmp.siteDataForDataLayer.scriptDataAttributes,
        customObject: $cmp.siteDataForDataLayer.customObject
      },
      key: 1
    }), api_custom_element("webruntime-inner-app", _webruntimeInnerApp__default["default"], {
      props: {
        view: $cmp.view,
        routerContainerView: $cmp.routerContainerView,
        routeParams: $cmp.routeParams
      },
      key: 2
    })])];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-ag6063mqi2";
  tmpl.legacyStylesheetToken = "webruntime-app_app";
  _7_1_5.freezeTemplate(tmpl);
  class App extends _7_1_5.LightningElement {
    constructor(view, routerContainerView) {
      super();
      this.routeParams = void 0;
      this.themeLayout = void 0;
      this.isInitialized = void 0;
      this.router = _1.router;
      this.view = view;
      this.routerContainerView = routerContainerView;
      this.siteDataForDataLayer = {
        scriptDataAttributes: {
          providerType: "site"
        },
        customObject: {
          siteId: siteId__default["default"],
          templateDevName: templateDevName__default["default"],
          ...webstoreId__default["default"] ? {
            webstore: {
              id: webstoreId__default["default"]
            }
          } : {}
        }
      };
    }
    renderedCallback() {
      if (this.isInitialized) {
        return;
      }
      const routerContainer = this.querySelector("lwr-router-container");
      _1.initializeRouterContainer(routerContainer);
      this.isInitialized = true;
    }
    errorCallback(error, wcstack) {
      _1_66_768252_0.reportError({
        subject: "app level error",
        error,
        wcstack
      });
      if (process.env.SSR) {
        throw error;
      }
    }
    disconnectedCallback() {
      this.isInitialized = false;
    }
    render() {
      return _tmpl;
    }
  }
  App.renderMode = "light";
  _7_1_5.registerDecorators(App, {
    publicProps: {
      routeParams: {
        config: 0
      }
    },
    fields: ["themeLayout", "isInitialized", "router"]
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(App, {
    tmpl: _tmpl,
    sel: "webruntime-app",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/app", ["exports", "webruntime/app/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/assert/v/1_66_768-252_0", ["exports", "webruntime/utils/v/1_66_768-252_0"], function(exports, _1_66_768252_0) {
  "use strict";
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _1_66_768252_0.assert;
    }
  });
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/assert", ["exports", "webruntime/assert/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("aura-instrumentation/v/1", ["exports", "webruntime/logger/v/1_66_768-252_0", "@communities-webruntime/common/v/1_66_768-252_0", "webruntime/assert/v/1_66_768-252_0"], function(exports, _1_66_768252_0, _1_66_768252_0$1, assert) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var assert__default = /* @__PURE__ */ _interopDefaultLegacy(assert);
  function getMarkName(ns, name) {
    return `${_1_66_768252_0$1.WEBRUNTIME_PREFIX}-${[ns, name].filter(Boolean).join(":")}`;
  }
  const {
    performance: performance2
  } = globalThis;
  function unwrapProxy(input) {
    const stringified = JSON.stringify(input);
    return stringified && JSON.parse(stringified);
  }
  function performanceMarkHelper(ns, name, ctx) {
    const markName = getMarkName(ns, name);
    performance2.mark(markName, {
      detail: {
        ctx: unwrapProxy(ctx)
      }
    });
  }
  function mark(ns, name, ctx) {
    performanceMarkHelper(ns, name, ctx);
  }
  function markStart(ns, name, ctx) {
    performanceMarkHelper(ns, name, ctx);
  }
  function markEnd(ns, name, ctx) {
    const markName = getMarkName(ns, name);
    try {
      performance2.measure(markName, {
        detail: {
          ctx: unwrapProxy(ctx)
        },
        start: markName
      });
    } catch (ex) {
      _1_66_768252_0.logError(`[instrumentation] no startMark named ${markName} found`, ex.stack);
    }
  }
  function time() {
    return Date.now();
  }
  function perfStart(name, attributes, eventSource) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] perfStart()`, {
        name,
        attributes,
        eventSource
      });
    }
  }
  function perfEnd(name, attributes, eventSource) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] perfEnd()`, {
        name,
        attributes,
        eventSource
      });
    }
  }
  function interaction(target, scope, context, eventSource, eventType) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] interaction()`, {
        target,
        scope,
        context,
        eventSource,
        eventType
      });
    }
  }
  function registerPlugin(pluginConfig) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] registerPlugin()`, {
        pluginConfig
      });
    }
  }
  function registerPeriodicLogger(name, callback) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] registerPeriodicLogger()`, {
        name,
        callback
      });
    }
  }
  function registerCacheStats(name) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] registerCacheStats()`, {
        name
      });
    }
    return {
      logHits(count) {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] registerCacheStats().logHits()`, {
            name,
            count
          });
        }
      },
      logMisses(count) {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] registerCacheStats().logMisses()`, {
            name,
            count
          });
        }
      },
      unRegister() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] registerCacheStats().unRegister()`, {
            name
          });
        }
      }
    };
  }
  function error(attributes, eventSource, eventType) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] error()`, {
        attributes,
        eventSource,
        eventType
      });
    }
  }
  function removePeriodicLogger(id) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] removePeriodicLogger()`, {
        id
      });
    }
  }
  function enablePlugin(name) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] enablePlugin()`, {
        name
      });
    }
  }
  function disablePlugin(name) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] disablePlugin()`, {
        name
      });
    }
  }
  function trackScenario(nameIn, attributes, eventSourceIn) {
    if (true) {
      _1_66_768252_0.log(`[instrumentation] trackScenario()`, {
        nameIn,
        attributes,
        eventSourceIn
      });
    }
  }
  function counter(metricsKey) {
    return {
      increment(value) {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] counter.increment()`, {
            metricsKey,
            value
          });
        }
      },
      decrement(value) {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] counter.decrement()`, {
            metricsKey,
            value
          });
        }
      },
      getValue() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] counter.getValue()`, {
            metricsKey
          });
        }
        return 0;
      },
      reset() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] counter.reset()`, {
            metricsKey
          });
        }
      }
    };
  }
  function gauge(metricsKey) {
    return {
      setValue(value) {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] setValue()`, {
            metricsKey,
            value
          });
        }
      },
      getValue() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] getValue()`, {
            metricsKey
          });
        }
        return 0;
      },
      reset() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] reset()`, {
            metricsKey
          });
        }
      }
    };
  }
  function percentileHistogram(metricsKey) {
    return {
      update(value) {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] percentileHistogram.update()`, {
            metricsKey,
            value
          });
        }
      },
      getValue() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] percentileHistogram.getValue()`, {
            metricsKey
          });
        }
        return [];
      },
      reset() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] percentileHistogram.reset()`, {
            metricsKey
          });
        }
      }
    };
  }
  function timer(metricsKey) {
    return {
      addDuration() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] timer.addDuration()`, {
            metricsKey
          });
        }
      },
      time() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] timer.time()`, {
            metricsKey
          });
        }
      },
      getValue() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] timer.getValue()`, {
            metricsKey
          });
        }
        return [];
      },
      reset() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] timer.reset()`, {
            metricsKey
          });
        }
      },
      get() {
        if (true) {
          _1_66_768252_0.log(`[instrumentation] timer.get()`, {
            metricsKey
          });
        }
      }
    };
  }
  class Notifications {
    constructor() {
      this._registry = {
        eptMarked: [],
        navToPage: [],
        navFromPage: [],
        windowUnload: []
      };
    }
    get knownEvents() {
      return Object.keys(this._registry);
    }
    _checkEventName(eventName) {
      if (!this._registry[eventName]) {
        throw new Error(`eventName ${eventName} isn't valid`);
      }
    }
    register(eventName, listenerName, callback) {
      assert__default["default"](eventName && typeof eventName === "string", "eventName must be a valid string");
      this._checkEventName(eventName);
      assert__default["default"](listenerName && typeof listenerName === "string", "listenerName must be a valid string");
      assert__default["default"](typeof callback === "function", "callback must be provided");
      return this._registry[eventName].push({
        name: listenerName,
        func: callback
      });
    }
    unregister(eventName, registrationId) {
      this._checkEventName(eventName);
      const index = registrationId - 1;
      assert__default["default"](this._registry[eventName][index], `No listener found for ${eventName} with registration ID ${registrationId}`);
      delete this._registry[eventName][index];
    }
    notify(eventName, eventPayload) {
      this._checkEventName(eventName);
      this._registry[eventName].forEach((subscriber) => subscriber.func(eventPayload));
    }
  }
  const notifications = new Notifications();
  exports.counter = counter;
  exports.disablePlugin = disablePlugin;
  exports.enablePlugin = enablePlugin;
  exports.error = error;
  exports.gauge = gauge;
  exports.interaction = interaction;
  exports.mark = mark;
  exports.markEnd = markEnd;
  exports.markStart = markStart;
  exports.notifications = notifications;
  exports.percentileHistogram = percentileHistogram;
  exports.perfEnd = perfEnd;
  exports.perfStart = perfStart;
  exports.registerCacheStats = registerCacheStats;
  exports.registerPeriodicLogger = registerPeriodicLogger;
  exports.registerPlugin = registerPlugin;
  exports.removePeriodicLogger = removePeriodicLogger;
  exports.time = time;
  exports.timer = timer;
  exports.trackScenario = trackScenario;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("aura-instrumentation", ["exports", "aura-instrumentation/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("aura-storage/v/1", ["exports"], function(exports) {
  "use strict";
  var _1 = {};
  exports["default"] = _1;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("aura-storage", ["exports", "aura-storage/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/auraMethodToResourceReferenceMapping/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  const prefix = "/services/data/v62.0";
  const auraMethodToResourceReferenceMapping = {
    "CommerceCatalogController.getProductCategoryPath": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/product-category-path/product-categories/${productCategoryId}",
      urlPathParamNames: ["productCategoryId", "webstoreId"],
      method: "GET"
    },
    "CommerceCatalogController.getProducts": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/products",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceCatalogController.getProduct": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/products/${productId}",
      urlPathParamNames: ["productId", "webstoreId"],
      method: "GET"
    },
    "CommerceCatalogManagementController.compositeCommerceProductCreate": {
      urlPath: prefix + "/commerce/management/webstore/${webstoreId}/composite-products",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "compositeCommerceProductInputRepresentation",
      method: "POST"
    },
    "CommerceCatalogManagementController.compositeCommerceProductUpdate": {
      urlPath: prefix + "/commerce/management/webstore/${webstoreId}/composite-products/${productId}",
      urlPathParamNames: ["productId", "webstoreId"],
      inputRepresentation: "compositeCommerceProductInputRepresentation",
      method: "PUT"
    },
    "CommerceCatalogManagementController.compositeCommerceVariationCreate": {
      urlPath: prefix + "/commerce/management/webstore/${webstoreId}/composite-variations",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "compositeCommerceVariationInputRepresentation",
      method: "POST"
    },
    "CommerceCatalogManagementController.ProductAttributeSearch": {
      urlPath: prefix + "/commerce/management/search/product-variation-attributes",
      urlPathParamNames: [],
      method: "GET"
    },
    "CommerceCatalogSettingsController.getDisplayableAttributes": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/catalog/attribute-settings/displayable-fields",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceCatalogSettingsController.replaceDisplayableAttributes": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/catalog/attribute-settings/displayable-fields",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "displayableAttributeSettings",
      method: "PUT"
    },
    "HSRCommerceCatalogController.getProductCategoryPathHSR": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/versions/${versionId}/product-categories/${productCategoryId}/product-category-path",
      urlPathParamNames: ["productCategoryId", "versionId", "webstoreId"],
      method: "GET"
    },
    "HSRCommerceCatalogController.getProductHSR": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/versions/${versionId}/products/${productId}",
      urlPathParamNames: ["productId", "versionId", "webstoreId"],
      method: "GET"
    },
    "CommerceStorePricingController.getProductPrices": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/pricing/products",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceStorePricingController.getProductPrice": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/pricing/products/${productId}",
      urlPathParamNames: ["productId", "webstoreId"],
      method: "GET"
    },
    "CommunitiesController.getPagePreviewUrl": {
      urlPath: prefix + "/connect/communities/${communityId}/preview-url/pages/${pageApiName}",
      urlPathParamNames: ["communityId", "pageApiName"],
      method: "GET"
    },
    "CommunitiesController.getCommunity": {
      urlPath: prefix + "/connect/communities/${communityId}",
      urlPathParamNames: ["communityId"],
      method: "GET"
    },
    "CommunitiesController.ingestRecord": {
      urlPath: prefix + "/connect/communities/${communityId}/microbatching",
      urlPathParamNames: ["communityId"],
      inputRepresentation: "requestIngestionInput",
      method: "POST"
    },
    "FilesController.getFileUploadConfig": {
      urlPath: prefix + "/connect/file/upload/config",
      urlPathParamNames: [],
      method: "GET"
    },
    "FilesController.createContentDocFromContentBody": {
      urlPath: prefix + "/connect/files/users/${userId}",
      urlPathParamNames: ["userId"],
      inputRepresentation: "file",
      method: "POST"
    },
    "MissionsController.purgeUserMissionsActivities": {
      urlPath: prefix + "/connect/communities/${communityId}/missions/activities/purge-job",
      urlPathParamNames: ["communityId"],
      method: "POST"
    },
    "CommerceCartController.upsertInventoryReservation": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/carts/${activeCartOrId}/inventory-reservations",
      urlPathParamNames: ["activeCartOrId", "webstoreId"],
      inputRepresentation: "cartInventoryReservationInput",
      method: "PUT"
    },
    "CommerceSearchController.getSearchBoostBuryRules": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/boost-bury-rules",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceSearchController.createSearchBoostBuryRule": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/boost-bury-rules",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "boostBuryRuleInput",
      method: "POST"
    },
    "CommerceSearchController.deleteSearchBoostBuryRule": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/boost-bury-rules/${ruleId}",
      urlPathParamNames: ["ruleId", "webstoreId"],
      method: "DELETE"
    },
    "CommerceSearchController.getSearchBoostBuryRule": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/boost-bury-rules/${ruleId}",
      urlPathParamNames: ["ruleId", "webstoreId"],
      method: "GET"
    },
    "CommerceSearchController.getSearchIndexErrors": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/index/${indexId}/errors",
      urlPathParamNames: ["indexId", "webstoreId"],
      method: "GET"
    },
    "CommerceSearchController.getManagementSortRules": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/sort-rules",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceSearchController.putSortRules": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/sort-rules",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "sortRules",
      method: "PUT"
    },
    "CommerceSearchController.searchProducts": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/search/product-search",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "productSearchInput",
      method: "POST"
    },
    "CommerceSearchSettingsController.getCommerceSearchIndexes": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/indexes",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceSearchSettingsController.createCommerceSearchIndex": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/indexes",
      urlPathParamNames: ["webstoreId"],
      method: "POST"
    },
    "CommerceSearchSettingsController.getCommerceSearchIndexLogs": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/index-logs",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceSearchSettingsController.getFacetableAttributeSettings": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/attribute-settings/facetable-fields",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceSearchSettingsController.replaceFacetableAttributeSettings": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/attribute-settings/facetable-fields",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "facetableAttributeSettings",
      method: "PUT"
    },
    "CommerceSearchSettingsController.getSearchableAttributes": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/attribute-settings/searchable-fields",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "CommerceSearchSettingsController.modifySearchableAttributes": {
      urlPath: prefix + "/commerce/management/webstores/${webstoreId}/search/attribute-settings/searchable-fields",
      urlPathParamNames: ["webstoreId"],
      inputRepresentation: "searchableAttributeSettings",
      method: "PATCH"
    },
    "CommerceShippingController.getShippingProfilesForWebStore": {
      urlPath: prefix + "/commerce/webstores/${webstoreId}/shippingProfiles",
      urlPathParamNames: ["webstoreId"],
      method: "GET"
    },
    "NavigationMenuController.getCommunityNavigationMenu": {
      urlPath: prefix + "/connect/communities/${communityId}/navigation-menu/navigation-menu-items",
      urlPathParamNames: ["communityId"],
      method: "GET"
    },
    "MarketingIntegrationController.getForm": {
      urlPath: prefix + "/sites/${siteId}/marketing-integration/forms/${formId}",
      urlPathParamNames: ["formId", "siteId"],
      method: "GET"
    },
    "MarketingIntegrationController.saveForm": {
      urlPath: prefix + "/sites/${siteId}/marketing-integration/forms",
      urlPathParamNames: ["siteId"],
      inputRepresentation: "formInput",
      method: "POST"
    },
    "MarketingIntegrationController.submitForm": {
      urlPath: prefix + "/sites/${siteId}/marketing-integration/forms/${formId}/data",
      urlPathParamNames: ["formId", "siteId"],
      inputRepresentation: "formSubmissionInput",
      method: "POST"
    },
    "SeoPropertiesController.getRecordSeoProperties": {
      urlPath: prefix + "/connect/communities/${communityId}/seo/properties/${recordId}",
      urlPathParamNames: ["communityId", "recordId"],
      method: "GET"
    },
    "FlowBuilderController.getRules": {
      urlPath: prefix + "/connect/interaction/builder/rules",
      urlPathParamNames: [],
      method: "GET"
    },
    "OrchestrationController.getOrchestrationInstanceCollection": {
      urlPath: prefix + "/connect/interaction/orchestration/instances",
      urlPathParamNames: [],
      method: "GET"
    },
    "FlowRuntimeConnectController.navigateFlow": {
      urlPath: prefix + "/connect/interaction/runtime/navigateFlow",
      urlPathParamNames: [],
      inputRepresentation: "request",
      method: "POST"
    },
    "FlowRuntimeConnectController.resumeFlow": {
      urlPath: prefix + "/connect/interaction/runtime/resumeFlow",
      urlPathParamNames: [],
      method: "POST"
    },
    "FlowRuntimeConnectController.startFlow": {
      urlPath: prefix + "/connect/interaction/runtime/startFlow",
      urlPathParamNames: [],
      method: "POST"
    },
    "DataCategoryController.getCategoryGroups": {
      urlPath: prefix + "/connect/data-category/category-group",
      urlPathParamNames: [],
      method: "GET"
    },
    "KnowledgeController.updateViewStat": {
      urlPath: prefix + "/connect/knowledge/article/view-stat",
      urlPathParamNames: [],
      method: "PATCH"
    },
    "NetworkDataCategoryController.getChildCategories": {
      urlPath: prefix + "/connect/communities/${communityId}/network-data-category/${networkDataCategoryId}/child-category",
      urlPathParamNames: ["communityId", "networkDataCategoryId"],
      method: "GET"
    },
    "NetworkDataCategoryController.getArticlesForCategory": {
      urlPath: prefix + "/connect/communities/${communityId}/network-data-category/${networkDataCategoryId}/knowledge-article",
      urlPathParamNames: ["communityId", "networkDataCategoryId"],
      method: "GET"
    },
    "NetworkDataCategoryController.updateNetworkDataCategory": {
      urlPath: prefix + "/connect/communities/${communityId}/network-data-category/${networkDataCategoryId}",
      urlPathParamNames: ["communityId", "networkDataCategoryId"],
      method: "PATCH"
    },
    "NetworkDataCategoryController.getNetworkDataCategories": {
      urlPath: prefix + "/connect/communities/${communityId}/data-category/network-data-category",
      urlPathParamNames: ["communityId"],
      method: "GET"
    },
    "NetworkDataCategoryController.updateNetworkDataCategories": {
      urlPath: prefix + "/connect/communities/${communityId}/data-category/network-data-category",
      urlPathParamNames: ["communityId"],
      inputRepresentation: "networkDataCategoryTree",
      method: "PUT"
    },
    "NetworkDataCategoryController.getParentNetworkDataCategoryPath": {
      urlPath: prefix + "/connect/communities/${communityId}/network-data-category/${networkDataCategoryId}/parent-path",
      urlPathParamNames: ["communityId", "networkDataCategoryId"],
      method: "GET"
    },
    "NetworkDataCategoryController.getServiceCatalogItems": {
      urlPath: prefix + "/connect/network-data-category/${networkDataCategoryId}/catalog-item",
      urlPathParamNames: ["networkDataCategoryId"],
      method: "GET"
    },
    "NetworkDataCategoryController.getServiceCatalogItemsForCommunity": {
      urlPath: prefix + "/connect/communities/${communityId}/network-data-category/${networkDataCategoryId}/catalog-item",
      urlPathParamNames: ["communityId", "networkDataCategoryId"],
      method: "GET"
    },
    "ExperienceModelTypeSystemController.getBlockTypes": {
      urlPath: prefix + "/connect/experience-model/block-types",
      urlPathParamNames: [],
      method: "GET"
    },
    "ExperienceModelTypeSystemController.getBlockType": {
      urlPath: prefix + "/connect/experience-model/block-types/${fullyQualifiedName}",
      urlPathParamNames: ["fullyQualifiedName"],
      method: "GET"
    },
    "ExperienceModelTypeSystemController.getContentTypes": {
      urlPath: prefix + "/connect/experience-model/content-types",
      urlPathParamNames: [],
      method: "GET"
    },
    "ExperienceModelTypeSystemController.getContentTypesByContextRecordId": {
      urlPath: prefix + "/connect/experience-model/content-types",
      urlPathParamNames: [],
      method: "GET"
    },
    "ExperienceModelTypeSystemController.getContentType": {
      urlPath: prefix + "/connect/experience-model/content-types/${fullyQualifiedName}",
      urlPathParamNames: ["fullyQualifiedName"],
      method: "GET"
    },
    "ExperienceModelTypeSystemController.getPropertyTypes": {
      urlPath: prefix + "/connect/experience-model/property-types",
      urlPathParamNames: [],
      method: "GET"
    },
    "ExperienceModelTypeSystemController.getPropertyType": {
      urlPath: prefix + "/connect/experience-model/property-types/${fullyQualifiedName}",
      urlPathParamNames: ["fullyQualifiedName"],
      method: "GET"
    },
    "ManagedContentController.getMCSFolderShares": {
      urlPath: prefix + "/connect/cms/folders/${folderId}/shares",
      urlPathParamNames: ["folderId"],
      method: "GET"
    },
    "ManagedContentController.patchMCSFolderShares": {
      urlPath: prefix + "/connect/cms/folders/${folderId}/shares",
      urlPathParamNames: ["folderId"],
      inputRepresentation: "mCSFolderShareCollectionUpdateInput",
      method: "PATCH"
    },
    "ManagedContentController.getMCSFolderShareTargets": {
      urlPath: prefix + "/connect/cms/folders/${folderId}/share-targets",
      urlPathParamNames: ["folderId"],
      method: "GET"
    },
    "ManagedContentController.cancelOrchestrationInstance": {
      urlPath: prefix + "/connect/cms/contents/orchestration-instances/${mContentOrchInstanceId}",
      urlPathParamNames: ["mContentOrchInstanceId"],
      method: "DELETE"
    },
    "ManagedContentController.cloneManagedContents": {
      urlPath: prefix + "/connect/cms/contents/clone",
      urlPathParamNames: [],
      inputRepresentation: "ManagedContentCloneInputParam",
      method: "POST"
    },
    "ManagedContentController.getCollectionItems": {
      urlPath: prefix + "/connect/cms/collections/${collectionKeyOrId}",
      urlPathParamNames: ["collectionKeyOrId"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentByTopicsAndContentKeys": {
      urlPath: prefix + "/connect/communities/${communityId}/managed-content/delivery",
      urlPathParamNames: ["communityId"],
      method: "GET"
    },
    "ManagedContentController.getPublishedManagedContentListByContentKey": {
      urlPath: prefix + "/connect/communities/${communityId}/managed-content/delivery/contents",
      urlPathParamNames: ["communityId"],
      method: "GET"
    },
    "ManagedContentController.getDeployments": {
      urlPath: prefix + "/cms/deployments",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentController.createDeployment": {
      urlPath: prefix + "/cms/deployments",
      urlPathParamNames: [],
      inputRepresentation: "DeploymentInput",
      method: "POST"
    },
    "ManagedContentController.cloneManagedContentDocument": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/clone",
      urlPathParamNames: ["contentKeyOrId"],
      inputRepresentation: "ManagedContentCloneInputParam",
      method: "POST"
    },
    "ManagedContentController.createManagedContent": {
      urlPath: prefix + "/connect/cms/contents",
      urlPathParamNames: [],
      inputRepresentation: "ManagedContentInputParam",
      method: "POST"
    },
    "ManagedContentController.createManagedContentWithMedia": {
      urlPath: prefix + "/connect/cms/contents",
      urlPathParamNames: [],
      inputRepresentation: "ManagedContentInputParam",
      method: "POST"
    },
    "ManagedContentController.getManagedContent": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}",
      urlPathParamNames: ["contentKeyOrId"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentForSite": {
      urlPath: prefix + "/connect/sites/${siteId}/cms/contents/${contentKeyOrId}",
      urlPathParamNames: ["contentKeyOrId", "siteId"],
      method: "GET"
    },
    "ManagedContentController.createManagedContentExportV2Job": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/contents/export",
      urlPathParamNames: ["contentSpaceId"],
      inputRepresentation: "managedContentV2JobRequest",
      method: "POST"
    },
    "ManagedContentController.createManagedContentImportV2Job": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/contents/import",
      urlPathParamNames: ["contentSpaceId"],
      inputRepresentation: "managedContentV2JobRequest",
      method: "POST"
    },
    "ManagedContentController.getCMSJobForSpace": {
      urlPath: prefix + "/cms/spaces/${contentSpaceId}/jobs/${jobId}",
      urlPathParamNames: ["contentSpaceId", "jobId"],
      method: "GET"
    },
    "ManagedContentController.getAllCMSJobsForSpace": {
      urlPath: prefix + "/cms/spaces/${contentSpaceId}/jobs",
      urlPathParamNames: ["contentSpaceId"],
      method: "GET"
    },
    "ManagedContentController.createManagedContentTranslationVariants": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/translate",
      urlPathParamNames: ["contentKeyOrId"],
      inputRepresentation: "languages",
      method: "POST"
    },
    "ManagedContentController.getManagedContentOrchestrationDefinitions": {
      urlPath: prefix + "/connect/cms/contents/orchestration-definitions",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentController.getManagedContentOrchestrationInstances": {
      urlPath: prefix + "/connect/cms/contents/orchestration-instances",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentController.createManagedContentOrchestrationInstance": {
      urlPath: prefix + "/connect/cms/contents/orchestration-instances",
      urlPathParamNames: [],
      inputRepresentation: "mContentOrchInstanceInput",
      method: "POST"
    },
    "ManagedContentController.getManagedContentPreviews": {
      urlPath: prefix + "/cms/spaces/${contentSpaceId}/preview-endpoints",
      urlPathParamNames: ["contentSpaceId"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentProviders": {
      urlPath: prefix + "/connect/cms/content/providers",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentController.publishDiagnostic": {
      urlPath: prefix + "/connect/cms/contents/publish/diagnostic",
      urlPathParamNames: [],
      inputRepresentation: "publishDiagnosticInput",
      method: "POST"
    },
    "ManagedContentController.publish": {
      urlPath: prefix + "/connect/cms/contents/publish",
      urlPathParamNames: [],
      inputRepresentation: "publishInput",
      method: "POST"
    },
    "ManagedContentController.getManagedContentReferencedBy": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/referenced-by",
      urlPathParamNames: ["contentKeyOrId"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentVariantRendition": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/renditions/${renditionType}",
      urlPathParamNames: ["contentKeyOrId", "renditionType"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentRunningOrchestrationHistoryEvents": {
      urlPath: prefix + "/connect/cms/contents/orchestration-history-events",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentController.updateDeployment": {
      urlPath: prefix + "/connect/cms/schedules/${deploymentId}",
      urlPathParamNames: ["deploymentId"],
      method: "PATCH"
    },
    "ManagedContentController.createSchedule": {
      urlPath: prefix + "/connect/cms/schedules",
      urlPathParamNames: [],
      inputRepresentation: "ScheduleInput",
      method: "POST"
    },
    "ManagedContentController.searchManagedContentForItems": {
      urlPath: prefix + "/connect/cms/items/search",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentController.getManagedContentSingleItem": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/single-item-content/${contentTypeFQN}",
      urlPathParamNames: ["contentSpaceId", "contentTypeFQN"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentSpaces": {
      urlPath: prefix + "/connect/cms/spaces",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentController.postManagedContentSpaceFolder": {
      urlPath: prefix + "/connect/cms/folders",
      urlPathParamNames: [],
      inputRepresentation: "managedContentSpaceFolderInput",
      method: "POST"
    },
    "ManagedContentController.getManagedContentSpaceFolderItems": {
      urlPath: prefix + "/connect/cms/folders/${folderId}/items",
      urlPathParamNames: ["folderId"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentSpaceFolderItemsV1": {
      urlPath: prefix + "/cms/folders/${folderId}/items",
      urlPathParamNames: ["folderId"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentSpaceFolder": {
      urlPath: prefix + "/connect/cms/folders/${folderId}",
      urlPathParamNames: ["folderId"],
      method: "GET"
    },
    "ManagedContentController.getManagedContentSpaceOrchestratorConfig": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/orchestrator-config",
      urlPathParamNames: ["contentSpaceId"],
      method: "GET"
    },
    "ManagedContentController.putManagedContentSpaceOrchestratorConfig": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/orchestrator-config",
      urlPathParamNames: ["contentSpaceId"],
      inputRepresentation: "mContentOrchConfigInput",
      method: "PUT"
    },
    "ManagedContentController.deleteManagedContentSpace": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}",
      urlPathParamNames: ["contentSpaceId"],
      method: "DELETE"
    },
    "ManagedContentController.getManagedContentSpace": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}",
      urlPathParamNames: ["contentSpaceId"],
      method: "GET"
    },
    "ManagedContentController.patchManagedContentSpace": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}",
      urlPathParamNames: ["contentSpaceId"],
      inputRepresentation: "ManagedContentSpaceInput",
      method: "PATCH"
    },
    "ManagedContentController.getTaxonomyTerms": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/taxonomy-terms",
      urlPathParamNames: ["contentKeyOrId"],
      method: "GET"
    },
    "ManagedContentController.updateTaxonomyTerms": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/taxonomy-terms",
      urlPathParamNames: ["contentKeyOrId"],
      inputRepresentation: "taxonomyTerms",
      method: "PATCH"
    },
    "ManagedContentController.createTranslationJob": {
      urlPath: prefix + "/connect/managed-content/translation",
      urlPathParamNames: [],
      inputRepresentation: "translationRequest",
      method: "POST"
    },
    "ManagedContentController.createTranslationV2Job": {
      urlPath: prefix + "/connect/cms/content/spaces/${contentSpaceId}/translation",
      urlPathParamNames: ["contentSpaceId"],
      inputRepresentation: "translationV2Request",
      method: "POST"
    },
    "ManagedContentController.getManagedContentTypesForMixin": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/content-types",
      urlPathParamNames: ["contentSpaceId"],
      method: "GET"
    },
    "ManagedContentController.unpublish": {
      urlPath: prefix + "/connect/cms/contents/unpublish",
      urlPathParamNames: [],
      inputRepresentation: "unpublishInput",
      method: "POST"
    },
    "ManagedContentController.createManagedContentVariant": {
      urlPath: prefix + "/connect/cms/contents/variants",
      urlPathParamNames: [],
      inputRepresentation: "ManagedContentVariantInputParam",
      method: "POST"
    },
    "ManagedContentController.getVariantReferences": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/variants/references",
      urlPathParamNames: ["contentKeyOrId"],
      method: "GET"
    },
    "ManagedContentController.deleteManagedContentVariant": {
      urlPath: prefix + "/connect/cms/contents/variants/${variantId}",
      urlPathParamNames: ["variantId"],
      method: "DELETE"
    },
    "ManagedContentController.getManagedContentVariant": {
      urlPath: prefix + "/connect/cms/contents/variants/${variantId}",
      urlPathParamNames: ["variantId"],
      method: "GET"
    },
    "ManagedContentController.replaceManagedContentVariant": {
      urlPath: prefix + "/connect/cms/contents/variants/${variantId}",
      urlPathParamNames: ["variantId"],
      inputRepresentation: "ManagedContentVariantInputParam",
      method: "PUT"
    },
    "ManagedContentController.replaceManagedContentVariantWithMedia": {
      urlPath: prefix + "/connect/cms/contents/variants/${variantId}",
      urlPathParamNames: ["variantId"],
      inputRepresentation: "ManagedContentVariantInputParam",
      method: "PUT"
    },
    "ManagedContentController.getManagedContentVariantVersions": {
      urlPath: prefix + "/connect/cms/contents/variants/${variantId}/versions",
      urlPathParamNames: ["variantId"],
      method: "GET"
    },
    "ManagedContentController.getWebUrls": {
      urlPath: prefix + "/connect/cms/contents/${contentKeyOrId}/web-urls",
      urlPathParamNames: ["contentKeyOrId"],
      method: "GET"
    },
    "ManagedContentController.updateManagedContentWebUrl": {
      urlPath: prefix + "/connect/cms/contents/web-urls/${managedContentWebUrlId}",
      urlPathParamNames: ["managedContentWebUrlId"],
      inputRepresentation: "managedContentWebUrlInput",
      method: "PATCH"
    },
    "ManagedContentChannelController.getManagedContentChannels": {
      urlPath: prefix + "/connect/cms/channels",
      urlPathParamNames: [],
      method: "GET"
    },
    "ManagedContentChannelController.postManagedContentChannel": {
      urlPath: prefix + "/connect/cms/channels",
      urlPathParamNames: [],
      inputRepresentation: "ManagedContentChannelInput",
      method: "POST"
    },
    "ManagedContentChannelController.deleteManagedContentChannel": {
      urlPath: prefix + "/connect/cms/channels/${channelId}",
      urlPathParamNames: ["channelId"],
      method: "DELETE"
    },
    "ManagedContentChannelController.getManagedContentChannel": {
      urlPath: prefix + "/connect/cms/channels/${channelId}",
      urlPathParamNames: ["channelId"],
      method: "GET"
    },
    "ManagedContentChannelController.patchManagedContentChannel": {
      urlPath: prefix + "/connect/cms/channels/${channelId}",
      urlPathParamNames: ["channelId"],
      inputRepresentation: "ManagedContentChannelInput",
      method: "PATCH"
    },
    "ManagedContentDeliveryController.getCollectionItemsForChannel": {
      urlPath: prefix + "/connect/cms/delivery/channels/${channelId}/collections/${collectionKeyOrId}",
      urlPathParamNames: ["channelId", "collectionKeyOrId"],
      method: "GET"
    },
    "ManagedContentDeliveryController.getCollectionItemsForSite": {
      urlPath: prefix + "/connect/sites/${siteId}/cms/delivery/collections/${collectionKeyOrId}",
      urlPathParamNames: ["collectionKeyOrId", "siteId"],
      method: "GET"
    },
    "ManagedContentDeliveryController.getCollectionMetadata": {
      urlPath: prefix + "/connect/cms/collections/${collectionKeyOrId}/metadata",
      urlPathParamNames: ["collectionKeyOrId"],
      method: "GET"
    },
    "ManagedContentDeliveryController.getCollectionMetadataForChannel": {
      urlPath: prefix + "/connect/cms/delivery/channels/${channelId}/collections/${collectionKeyOrId}/metadata",
      urlPathParamNames: ["channelId", "collectionKeyOrId"],
      method: "GET"
    },
    "ManagedContentDeliveryController.getCollectionMetadataForSite": {
      urlPath: prefix + "/connect/sites/${siteId}/cms/delivery/collections/${collectionKeyOrId}/metadata",
      urlPathParamNames: ["collectionKeyOrId", "siteId"],
      method: "GET"
    },
    "ManagedContentSpaceController.getManagedContentSpaceChannels": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/channels",
      urlPathParamNames: ["contentSpaceId"],
      method: "GET"
    },
    "ManagedContentSpaceController.patchManagedContentSpaceChannels": {
      urlPath: prefix + "/connect/cms/spaces/${contentSpaceId}/channels",
      urlPathParamNames: ["contentSpaceId"],
      inputRepresentation: "spaceChannels",
      method: "PATCH"
    },
    "ManagedContentSpaceController.deleteDummySpace": {
      urlPath: prefix + "/connect/cms/spaces/dummy/",
      urlPathParamNames: [],
      method: "DELETE"
    },
    "ManagedContentTypeController.getContentTypeSchema": {
      urlPath: prefix + "/connect/cms/content-types/${contentTypeFQN}",
      urlPathParamNames: ["contentTypeFQN"],
      method: "GET"
    },
    "SitesController.searchSite": {
      urlPath: prefix + "/connect/sites/${siteId}/search",
      urlPathParamNames: ["siteId"],
      method: "GET"
    },
    "ActionsController.getFlexipageFormulaOverrides": {
      urlPath: prefix + "/ui-api/actions/formula-activation/${actionFeature}",
      urlPathParamNames: ["actionFeature"],
      method: "GET"
    },
    "ActionsController.getGlobalActions": {
      urlPath: prefix + "/ui-api/actions/global",
      urlPathParamNames: [],
      method: "GET"
    },
    "ActionsController.getActionLayout": {
      urlPath: prefix + "/ui-api/actions/layout/${actionApiName}",
      urlPathParamNames: ["actionApiName"],
      method: "GET"
    },
    "ActionsController.getListViewActions": {
      urlPath: prefix + "/ui-api/actions/list-view/${listViewIds}",
      urlPathParamNames: ["listViewIds"],
      method: "GET"
    },
    "ActionsController.getLookupActions": {
      urlPath: prefix + "/ui-api/actions/lookup/${objectApiNames}",
      urlPathParamNames: ["objectApiNames"],
      method: "GET"
    },
    "ActionsController.getMRUListActions": {
      urlPath: prefix + "/ui-api/actions/mru-list/${objectApiNames}",
      urlPathParamNames: ["objectApiNames"],
      method: "GET"
    },
    "ActionsController.getObjectCreateActions": {
      urlPath: prefix + "/ui-api/actions/object/${objectApiName}/record-create",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "ActionsController.getActionOverrides": {
      urlPath: prefix + "/ui-api/actions/overrides/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "ActionsController.performUpdateRecordQuickAction": {
      urlPath: prefix + "/ui-api/actions/perform-quick-action/${actionApiName}",
      urlPathParamNames: ["actionApiName"],
      inputRepresentation: "performQuickActionInput",
      method: "PATCH"
    },
    "ActionsController.performQuickAction": {
      urlPath: prefix + "/ui-api/actions/perform-quick-action/${actionApiName}",
      urlPathParamNames: ["actionApiName"],
      inputRepresentation: "performQuickActionInput",
      method: "POST"
    },
    "ActionsController.getQuickActionDefaults": {
      urlPath: prefix + "/ui-api/actions/record-defaults/${actionApiName}",
      urlPathParamNames: ["actionApiName"],
      method: "GET"
    },
    "ActionsController.getQuickActionInfo": {
      urlPath: prefix + "/ui-api/actions/quick-action-info/${actionApiName}",
      urlPathParamNames: ["actionApiName"],
      method: "GET"
    },
    "ActionsController.getRecordEditActions": {
      urlPath: prefix + "/ui-api/actions/record/${recordIds}/record-edit",
      urlPathParamNames: ["recordIds"],
      method: "GET"
    },
    "ActionsController.getRecordActions": {
      urlPath: prefix + "/ui-api/actions/record/${recordIds}",
      urlPathParamNames: ["recordIds"],
      method: "GET"
    },
    "ActionsController.getRelatedListsActions": {
      urlPath: prefix + "/ui-api/actions/record/${recordIds}/related-list/batch/${relatedListIds}",
      urlPathParamNames: ["recordIds", "relatedListIds"],
      method: "GET"
    },
    "ActionsController.postRelatedListsActions": {
      urlPath: prefix + "/ui-api/actions/record/${recordIds}/related-list/batch",
      urlPathParamNames: ["recordIds"],
      inputRepresentation: "listRecordActionsQuery",
      method: "POST"
    },
    "ActionsController.getRelatedListRecordActions": {
      urlPath: prefix + "/ui-api/actions/record/${recordIds}/related-list-record/${relatedListRecordIds}",
      urlPathParamNames: ["recordIds", "relatedListRecordIds"],
      method: "GET"
    },
    "ActionsController.getRelatedListActions": {
      urlPath: prefix + "/ui-api/actions/record/${recordIds}/related-list/${relatedListId}",
      urlPathParamNames: ["recordIds", "relatedListId"],
      method: "GET"
    },
    "ActionsController.postRelatedListActions": {
      urlPath: prefix + "/ui-api/actions/record/${recordIds}/related-list/${relatedListId}",
      urlPathParamNames: ["recordIds", "relatedListId"],
      inputRepresentation: "listRecordActionsQuery",
      method: "POST"
    },
    "AppsController.getAppByID": {
      urlPath: prefix + "/ui-api/apps/${appId}",
      urlPathParamNames: ["appId"],
      method: "GET"
    },
    "AppsController.getAccessibleApps": {
      urlPath: prefix + "/ui-api/apps",
      urlPathParamNames: [],
      method: "GET"
    },
    "AppsController.getNavItems": {
      urlPath: prefix + "/ui-api/nav-items",
      urlPathParamNames: [],
      method: "GET"
    },
    "ListUiController.getListsByObjectName": {
      urlPath: prefix + "/ui-api/list-ui/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "ListUiController.getListInfosById": {
      urlPath: prefix + "/ui-api/list-info/batch",
      urlPathParamNames: [],
      method: "GET"
    },
    "ListUiController.getListInfosByName": {
      urlPath: prefix + "/ui-api/list-info/batch",
      urlPathParamNames: [],
      method: "GET"
    },
    "ListUiController.getListInfosByObjectName": {
      urlPath: prefix + "/ui-api/list-info/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "ListUiController.createListInfo": {
      urlPath: prefix + "/ui-api/list-info/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      inputRepresentation: "listInfoInput",
      method: "POST"
    },
    "ListUiController.deleteListInfo": {
      urlPath: prefix + "/ui-api/list-info/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      method: "DELETE"
    },
    "ListUiController.getListInfoById": {
      urlPath: prefix + "/ui-api/list-info/${listViewId}",
      urlPathParamNames: ["listViewId"],
      method: "GET"
    },
    "ListUiController.getListInfoByName": {
      urlPath: prefix + "/ui-api/list-info/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      method: "GET"
    },
    "ListUiController.updateListInfoByApiName": {
      urlPath: prefix + "/ui-api/list-info/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      inputRepresentation: "listInfoInput",
      method: "PATCH"
    },
    "ListUiController.getListObjectInfo": {
      urlPath: prefix + "/ui-api/list-object-info/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "ListUiController.getListPreferences": {
      urlPath: prefix + "/ui-api/list-preferences/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      method: "GET"
    },
    "ListUiController.updateListPreferences": {
      urlPath: prefix + "/ui-api/list-preferences/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      inputRepresentation: "listPreferencesInput",
      method: "PATCH"
    },
    "ListUiController.getListRecordsById": {
      urlPath: prefix + "/ui-api/list-records/${listViewId}",
      urlPathParamNames: ["listViewId"],
      method: "GET"
    },
    "ListUiController.getListRecordsByName": {
      urlPath: prefix + "/ui-api/list-records/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      method: "GET"
    },
    "ListUiController.postListRecordsByName": {
      urlPath: prefix + "/ui-api/list-records/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      inputRepresentation: "listRecordsQuery",
      method: "POST"
    },
    "ListUiController.getListUiById": {
      urlPath: prefix + "/ui-api/list-ui/${listViewId}",
      urlPathParamNames: ["listViewId"],
      method: "GET"
    },
    "ListUiController.getListUiByName": {
      urlPath: prefix + "/ui-api/list-ui/${objectApiName}/${listViewApiName}",
      urlPathParamNames: ["listViewApiName", "objectApiName"],
      method: "GET"
    },
    "MruListUiController.getMruListInfo": {
      urlPath: prefix + "/ui-api/mru-list-info/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "MruListUiController.getMruListRecords": {
      urlPath: prefix + "/ui-api/mru-list-records/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "MruListUiController.getMruListUi": {
      urlPath: prefix + "/ui-api/mru-list-ui/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.getAggregateUi": {
      urlPath: prefix + "/ui-api/aggregate-ui",
      urlPathParamNames: [],
      method: "GET"
    },
    "RecordUiController.executeAggregateUi": {
      urlPath: prefix + "/ui-api/aggregate-ui",
      urlPathParamNames: [],
      inputRepresentation: "input",
      method: "POST"
    },
    "RecordUiController.getRecordsWithFields": {
      urlPath: prefix + "/ui-api/records/batch/${recordIds}",
      urlPathParamNames: ["recordIds"],
      method: "GET"
    },
    "RecordUiController.getRecordsWithLayouts": {
      urlPath: prefix + "/ui-api/records/batch/${recordIds}",
      urlPathParamNames: ["recordIds"],
      method: "GET"
    },
    "RecordUiController.executeBatchRecordOperations": {
      urlPath: prefix + "/ui-api/records/batch",
      urlPathParamNames: [],
      inputRepresentation: "recordInput",
      method: "POST"
    },
    "RecordUiController.getDedupeConfig": {
      urlPath: prefix + "/ui-api/duplicates/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.getDuplicateConfig": {
      urlPath: prefix + "/ui-api/duplicates/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.getFormByName": {
      urlPath: prefix + "/ui-api/forms/${apiName}",
      urlPathParamNames: ["apiName"],
      method: "GET"
    },
    "RecordUiController.executeBatchGraphQL": {
      urlPath: prefix + "/graphql/batch",
      urlPathParamNames: [],
      inputRepresentation: "batchQueryInput",
      method: "POST"
    },
    "RecordUiController.executeGraphQL": {
      urlPath: prefix + "/graphql",
      urlPathParamNames: [],
      inputRepresentation: "queryInput",
      method: "POST"
    },
    "RecordUiController.getLayout": {
      urlPath: prefix + "/ui-api/layout/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.getLayoutUserState": {
      urlPath: prefix + "/ui-api/layout/${objectApiName}/user-state",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.updateLayoutUserState": {
      urlPath: prefix + "/ui-api/layout/${objectApiName}/user-state",
      urlPathParamNames: ["objectApiName"],
      inputRepresentation: "userState",
      method: "PATCH"
    },
    "RecordUiController.getObjectInfos": {
      urlPath: prefix + "/ui-api/object-info/batch/${objectApiNames}",
      urlPathParamNames: ["objectApiNames"],
      method: "GET"
    },
    "RecordUiController.getObjectInfo": {
      urlPath: prefix + "/ui-api/object-info/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.getPathLayout": {
      urlPath: prefix + "/ui-api/path/layout/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.getPicklistValuesByRecordType": {
      urlPath: prefix + "/ui-api/object-info/${objectApiName}/picklist-values/${recordTypeId}",
      urlPathParamNames: ["objectApiName", "recordTypeId"],
      method: "GET"
    },
    "RecordUiController.getPicklistValues": {
      urlPath: prefix + "/ui-api/object-info/${objectApiName}/picklist-values/${recordTypeId}/${fieldApiName}",
      urlPathParamNames: ["fieldApiName", "objectApiName", "recordTypeId"],
      method: "GET"
    },
    "RecordUiController.findDuplicates": {
      urlPath: prefix + "/ui-api/predupe",
      urlPathParamNames: [],
      inputRepresentation: "recordInput",
      method: "POST"
    },
    "RecordUiController.postRecordAvatarAssociation": {
      urlPath: prefix + "/ui-api/record-avatars/${recordId}/association",
      urlPathParamNames: ["recordId"],
      inputRepresentation: "input",
      method: "POST"
    },
    "RecordUiController.getRecordAvatars": {
      urlPath: prefix + "/ui-api/record-avatars/batch/${recordIds}",
      urlPathParamNames: ["recordIds"],
      method: "GET"
    },
    "RecordUiController.getRecordCloneDefaults": {
      urlPath: prefix + "/ui-api/record-defaults/clone/${recordId}",
      urlPathParamNames: ["recordId"],
      method: "GET"
    },
    "RecordUiController.getRecordCreateDefaults": {
      urlPath: prefix + "/ui-api/record-defaults/create/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.createRecord": {
      urlPath: prefix + "/ui-api/records",
      urlPathParamNames: [],
      inputRepresentation: "recordInput",
      method: "POST"
    },
    "RecordUiController.deleteRecord": {
      urlPath: prefix + "/ui-api/records/${recordId}",
      urlPathParamNames: ["recordId"],
      method: "DELETE"
    },
    "RecordUiController.getRecordWithFields": {
      urlPath: prefix + "/ui-api/records/${recordId}",
      urlPathParamNames: ["recordId"],
      method: "GET"
    },
    "RecordUiController.getRecordWithLayouts": {
      urlPath: prefix + "/ui-api/records/${recordId}",
      urlPathParamNames: ["recordId"],
      method: "GET"
    },
    "RecordUiController.updateRecord": {
      urlPath: prefix + "/ui-api/records/${recordId}",
      urlPathParamNames: ["recordId"],
      inputRepresentation: "recordInput",
      method: "PATCH"
    },
    "RecordUiController.getRecordDefaultsTemplateClone": {
      urlPath: prefix + "/ui-api/record-defaults/template/clone/${recordId}",
      urlPathParamNames: ["recordId"],
      method: "GET"
    },
    "RecordUiController.getRecordDefaultsTemplateForCreate": {
      urlPath: prefix + "/ui-api/record-defaults/template/create/${objectApiName}",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RecordUiController.getRecordUis": {
      urlPath: prefix + "/ui-api/record-ui/${recordIds}",
      urlPathParamNames: ["recordIds"],
      method: "GET"
    },
    "RecordUiController.getValidationRulesInfo": {
      urlPath: prefix + "/ui-api/object-info/${objectApiName}/validation-rules-info",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "RelatedListUiController.getRelatedListInfoBatch": {
      urlPath: prefix + "/ui-api/related-list-info/batch/${parentObjectApiName}/${relatedListNames}",
      urlPathParamNames: ["parentObjectApiName", "relatedListNames"],
      method: "GET"
    },
    "RelatedListUiController.getRelatedListInfoCollection": {
      urlPath: prefix + "/ui-api/related-list-info/${parentObjectApiName}",
      urlPathParamNames: ["parentObjectApiName"],
      method: "GET"
    },
    "RelatedListUiController.getRelatedListInfo": {
      urlPath: prefix + "/ui-api/related-list-info/${parentRecordId}/${relatedListId}",
      urlPathParamNames: ["parentRecordId", "relatedListId"],
      method: "GET"
    },
    "RelatedListUiController.getRelatedListInfoByApiName": {
      urlPath: prefix + "/ui-api/related-list-info/${parentObjectApiName}/${relatedListId}",
      urlPathParamNames: ["parentObjectApiName", "relatedListId"],
      method: "GET"
    },
    "RelatedListUiController.updateRelatedListInfoByApiName": {
      urlPath: prefix + "/ui-api/related-list-info/${parentObjectApiName}/${relatedListId}",
      urlPathParamNames: ["parentObjectApiName", "relatedListId"],
      inputRepresentation: "relatedListInfoInput",
      method: "PATCH"
    },
    "RelatedListUiController.getRelatedListPreferencesBatch": {
      urlPath: prefix + "/ui-api/related-list-preferences/batch/${preferencesIds}",
      urlPathParamNames: ["preferencesIds"],
      method: "GET"
    },
    "RelatedListUiController.getRelatedListPreferences": {
      urlPath: prefix + "/ui-api/related-list-preferences/${preferencesId}",
      urlPathParamNames: ["preferencesId"],
      method: "GET"
    },
    "RelatedListUiController.updateRelatedListPreferences": {
      urlPath: prefix + "/ui-api/related-list-preferences/${preferencesId}",
      urlPathParamNames: ["preferencesId"],
      inputRepresentation: "relatedListUserPreferencesInput",
      method: "PATCH"
    },
    "RelatedListUiController.getRelatedListsRecordCount": {
      urlPath: prefix + "/ui-api/related-list-count/batch/${parentRecordId}/${relatedListNames}",
      urlPathParamNames: ["parentRecordId", "relatedListNames"],
      method: "GET"
    },
    "RelatedListUiController.getRelatedListRecordCount": {
      urlPath: prefix + "/ui-api/related-list-count/${parentRecordId}/${relatedListId}",
      urlPathParamNames: ["parentRecordId", "relatedListId"],
      method: "GET"
    },
    "RelatedListUiController.getRelatedListRecordsBatch": {
      urlPath: prefix + "/ui-api/related-list-records/batch/${parentRecordId}/${relatedListIds}",
      urlPathParamNames: ["parentRecordId", "relatedListIds"],
      method: "GET"
    },
    "RelatedListUiController.postRelatedListRecordsBatch": {
      urlPath: prefix + "/ui-api/related-list-records/batch/${parentRecordId}",
      urlPathParamNames: ["parentRecordId"],
      inputRepresentation: "listRecordsQuery",
      method: "POST"
    },
    "RelatedListUiController.getRelatedListRecords": {
      urlPath: prefix + "/ui-api/related-list-records/${parentRecordId}/${relatedListId}",
      urlPathParamNames: ["parentRecordId", "relatedListId"],
      method: "GET"
    },
    "RelatedListUiController.postRelatedListRecords": {
      urlPath: prefix + "/ui-api/related-list-records/${parentRecordId}/${relatedListId}",
      urlPathParamNames: ["parentRecordId", "relatedListId"],
      inputRepresentation: "listRecordsQuery",
      method: "POST"
    },
    "SearchUiController.searchResultsKeyword": {
      urlPath: prefix + "/ui-api/search/results/keyword",
      urlPathParamNames: [],
      inputRepresentation: "options",
      method: "POST"
    },
    "SearchUiController.getSearchFilterMetadata": {
      urlPath: prefix + "/ui-api/search-info/${objectApiName}/filters",
      urlPathParamNames: ["objectApiName"],
      method: "GET"
    },
    "SearchUiController.getFilterOptions": {
      urlPath: prefix + "/ui-api/search-info/${objectApiName}/filters/${filterApiName}/options",
      urlPathParamNames: ["filterApiName", "objectApiName"],
      method: "GET"
    },
    "SearchUiController.searchResults": {
      urlPath: prefix + "/ui-api/search/results",
      urlPathParamNames: [],
      inputRepresentation: "options",
      method: "POST"
    },
    "LookupController.getLookupMetadata": {
      urlPath: prefix + "/ui-api/search-info/${objectApiName}/lookup/${fieldApiName}",
      urlPathParamNames: ["fieldApiName", "objectApiName"],
      method: "GET"
    },
    "LookupController.getLookupRecords": {
      urlPath: prefix + "/ui-api/lookups/${objectApiName}/${fieldApiName}",
      urlPathParamNames: ["fieldApiName", "objectApiName"],
      method: "GET"
    },
    "LookupController.lookup": {
      urlPath: prefix + "/ui-api/lookups/${objectApiName}/${fieldApiName}",
      urlPathParamNames: ["fieldApiName", "objectApiName"],
      inputRepresentation: "body",
      method: "POST"
    },
    "ServicePlanController.executeServicePlan": {
      urlPath: prefix + "/service-plan/execute/${generatedPlanId}",
      urlPathParamNames: ["generatedPlanId"],
      inputRepresentation: "servicePlanInputRepresentation",
      method: "PUT"
    },
    "ServicePlanController.generateSync": {
      urlPath: prefix + "/service-plan/generateSync/${recordId}",
      urlPathParamNames: ["recordId"],
      inputRepresentation: "ServicePlanPostInput",
      method: "POST"
    },
    "TableauEmbeddingController.postJWT": {
      urlPath: prefix + "/tableau/jwt",
      urlPathParamNames: [],
      method: "POST",
      inputRepresentation: "tableauJwtArgs"
    },
    "TableauEmbeddingController.getJWT": {
      urlPath: prefix + "/tableau/jwt",
      urlPathParamNames: [],
      method: "GET"
    },
    "TableauEmbeddingController.getEAS": {
      urlPath: prefix + "/tableau/eas",
      urlPathParamNames: [],
      method: "GET"
    },
    "MilestonesController.getBusinessHours": {
      urlPath: prefix + "/connect/milestones/business-hours",
      urlPathParamNames: [],
      method: "GET"
    },
    "MilestonesController.markMilestoneCompleted": {
      urlPath: prefix + "/connect/milestones/business-hours/milestone-completed",
      urlPathParamNames: [],
      method: "PUT"
    },
    "MilestonesController.getMilestonesDataManager": {
      urlPath: prefix + "/connect/milestones/milestones-data-manager/${recordId}",
      urlPathParamNames: ["recordId"],
      method: "GET"
    }
  };
  function getResourceReferenceFromAuraMethod(auraMethod) {
    return auraMethodToResourceReferenceMapping[auraMethod];
  }
  exports.getResourceReferenceFromAuraMethod = getResourceReferenceFromAuraMethod;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/auraMethodToResourceReferenceMapping", ["exports", "webruntime/auraMethodToResourceReferenceMapping/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/apiCall/v/1_66_768-252_0", ["exports", "webruntime/auraMethodToResourceReferenceMapping/v/1_66_768-252_0", "webruntime/transport/v/1", "webruntime/errors/v/1_66_768-252_0", "@app/apexApiBasePath/v/1", "webruntime/overrides/v/1", "@communities-webruntime/common/v/1_66_768-252_0"], function(exports, _1_66_768252_0, _1, _1_66_768252_0$1, apexApiBasePath, _1$1, _1_66_768252_0$2) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var apexApiBasePath__default = /* @__PURE__ */ _interopDefaultLegacy(apexApiBasePath);
  async function apiCallRawResponse(endpoint, params) {
    const [controller, action] = endpoint.split(".");
    if (controller === "ApexActionController") {
      return handleApexAction(action, params);
    }
    const uiApiReference = _1_66_768252_0.getResourceReferenceFromAuraMethod(endpoint);
    if (uiApiReference) {
      return handleUiApiCall(uiApiReference, params);
    }
    throw new Error(`Unsupported controller action: ${controller}.${action}`);
  }
  async function handleUiApiCall({
    urlPath,
    urlPathParamNames,
    method,
    inputRepresentation
  }, params) {
    const remainingParams = params && {
      ...params
    } || {};
    let path = urlPathParamNames.reduce((currentPath, paramName) => {
      const value = remainingParams[paramName];
      delete remainingParams[paramName];
      return currentPath.replace(`\${${paramName}}`, encodeURIComponent(value));
    }, urlPath);
    let body;
    if ((method === "POST" || method === "PATCH" || method === "PUT") && remainingParams[inputRepresentation]) {
      body = JSON.stringify(remainingParams[inputRepresentation]);
      delete remainingParams[inputRepresentation];
    }
    if (Object.keys(remainingParams).length) {
      path += `?${Object.entries(remainingParams).filter(([, val]) => {
        return val !== void 0 && val !== null && (!Array.isArray(val) || val.length);
      }).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join("&")}`;
    }
    const response = await _1.fetch(path, {
      method,
      body
    });
    let data;
    if (response.status === 401) {
      handleTimeoutNavigation();
    }
    if (response.status !== 204) {
      data = await response.json();
    }
    if (data instanceof Array) {
      data = data[0];
    }
    if (!response.ok) {
      const error = {
        status: response.status,
        data: {
          ...data,
          statusCode: response.status
        }
      };
      throw convertResponseToAuraActionErrorObject([error]);
    }
    return convertResponseToAuraActionObject(data);
  }
  async function handleApexAction(action, params) {
    if (action === "execute") {
      const {
        url,
        httpRequestOptions
      } = formatApexRequest(action, params);
      return _1.fetch(url, httpRequestOptions).then((response) => {
        if (response.status === 401) {
          handleTimeoutNavigation();
        }
        return response.status !== 204 ? response.json() : void 0;
      }).then((response) => {
        if (response && response.error && response.error.length > 0) {
          throw convertResponseToAuraActionErrorObject(response.error);
        }
        return convertResponseToAuraActionObject(response);
      });
    }
    throw new Error(`Unsupported Apex action: ${action}`);
  }
  function formatApexRequest(action, params) {
    if (!params || typeof params !== "object" || Object.keys(params).length === 0) {
      _1_66_768252_0$1.reportError({
        subject: "Apex API action error - invalid params",
        type: _1_66_768252_0$2.CLIENT_ERROR_TYPES.APEX_ACTION_ERROR,
        error: new Error(`Apex ${action} action called with invalid params: '${JSON.stringify(params)}'.`)
      });
    }
    if (params && params.cacheable === true) {
      const url = `/apex/${action}?${getApexQueryParams(params)}`;
      if (url.length <= _1_66_768252_0$2.MAX_URL_LENGTH) {
        return {
          url,
          httpRequestOptions: {
            method: "GET",
            basePath: apexApiBasePath__default["default"]
          }
        };
      }
    }
    return {
      url: `/apex/${action}`,
      httpRequestOptions: {
        method: "POST",
        body: JSON.stringify(params),
        basePath: apexApiBasePath__default["default"]
      }
    };
  }
  function getApexQueryParams(apexActionParams) {
    const cloneApexActionParams = {
      ...apexActionParams
    };
    const methodArguments = cloneApexActionParams.params;
    if (methodArguments && typeof methodArguments === "object") {
      const orderedParams = Object.keys(methodArguments).sort().reduce((obj, key) => {
        obj[key] = methodArguments[key];
        return obj;
      }, {});
      cloneApexActionParams.params = JSON.stringify(orderedParams);
    }
    return Object.keys(cloneApexActionParams).filter((key) => cloneApexActionParams[key] !== void 0 && cloneApexActionParams[key] != null).sort().map((key) => `${key}=${encodeURIComponent(cloneApexActionParams[key])}`).join("&");
  }
  function handleTimeoutNavigation() {
    _1$1.SessionTimeoutOverrides.runSync();
  }
  function convertResponseToAuraActionObject(data) {
    return {
      getReturnValue: () => {
        return data;
      }
    };
  }
  function convertResponseToAuraActionErrorObject(errors) {
    return {
      getError: () => {
        return errors;
      }
    };
  }
  exports.apiCallRawResponse = apiCallRawResponse;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/apiCall", ["exports", "webruntime/apiCall/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("aura/v/1", ["exports", "webruntime/apiCall/v/1_66_768-252_0", "webruntime/logger/v/1_66_768-252_0"], function(exports, _1_66_768252_0$1, _1_66_768252_0) {
  "use strict";
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function() {
              return e[k];
            }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }
  var _1_66_768252_0__namespace = /* @__PURE__ */ _interopNamespace(_1_66_768252_0);
  const createComponent = null;
  const renderComponent = null;
  const getDefinition = null;
  Object.defineProperty(exports, "executeGlobalControllerRawResponse", {
    enumerable: true,
    get: function() {
      return _1_66_768252_0$1.apiCallRawResponse;
    }
  });
  exports.logger = _1_66_768252_0__namespace;
  exports.createComponent = createComponent;
  exports.getDefinition = getDefinition;
  exports.renderComponent = renderComponent;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("aura", ["exports", "aura/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("instrumentation/service/v/1", ["exports", "aura-instrumentation/v/1"], function(exports, _1) {
  "use strict";
  Object.keys(_1).forEach(function(k) {
    if (k !== "default" && !exports.hasOwnProperty(k))
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
          return _1[k];
        }
      });
  });
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("instrumentation/service", ["exports", "instrumentation/service/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("instrumentation/utility/v/1", ["exports", "aura-instrumentation/v/1"], function(exports, _1) {
  "use strict";
  Object.keys(_1).forEach(function(k) {
    if (k !== "default" && !exports.hasOwnProperty(k))
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
          return _1[k];
        }
      });
  });
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("instrumentation/utility", ["exports", "instrumentation/utility/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lightning/configProvider/v/1", ["exports", "@app/basePath/v/1", "lwc/v/7_1_5"], function(exports, basePath, _7_1_5) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  const ISO8601_STRICT_PATTERN = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z){1})?)?)?$/i;
  const ISO8601_TIME_PATTERN = /^\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
  const STANDARD_TIME_FORMAT = "HH:mm:ss.SSS";
  const STANDARD_DATE_FORMAT = "YYYY-MM-DD";
  const TIME_SEPARATOR = "T";
  const TIMEZONE_INDICATOR = /(Z|([+-])(\d{2}):(\d{2}))$/;
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
    if (typeof dateTimeString === "string") {
      return dateTimeString.split(TIMEZONE_INDICATOR)[0];
    }
    return dateTimeString;
  }
  function isValidISO8601String(dateTimeString) {
    if (typeof dateTimeString !== "string") {
      return false;
    }
    return ISO8601_STRICT_PATTERN.test(dateTimeString);
  }
  function isValidISO8601TimeString(timeString) {
    if (typeof timeString !== "string") {
      return false;
    }
    return ISO8601_TIME_PATTERN.test(timeString);
  }
  function isValidDate(value) {
    const timeStamp = Date.parse(value);
    return isFinite(timeStamp);
  }
  var _tmpl = void 0;
  const labelSecondsLater = "in a few seconds";
  const labelSecondsAgo = "a few seconds ago";
  const fallbackFutureLabel = "in {0} {1}";
  const fallbackPastLabel = "{0} {1} ago";
  const fallbackPluralSuffix = "s";
  const units = {
    SECONDS: {
      name: "second",
      threshold: 45
    },
    MINUTES: {
      name: "minute",
      threshold: 45
    },
    HOURS: {
      name: "hour",
      threshold: 22
    },
    DAYS: {
      name: "day",
      threshold: 26
    },
    MONTHS: {
      name: "month",
      threshold: 11
    },
    YEARS: {
      name: "year"
    }
  };
  const SECOND_TO_MILLISECONDS = 1e3;
  const MINUTE_TO_MILLISECONDS = 6e4;
  const HOUR_TO_MILLISECONDS = 36e5;
  const DAY_TO_MILLISECONDS = 864e5;
  class Duration {
    constructor(milliseconds) {
      this.milliseconds = 0;
      if (typeof milliseconds !== "number") {
        this.isValid = false;
        console.warn(`The value of milliseconds passed into Duration must be of type number, 
                but we are getting the ${typeof milliseconds} value "${milliseconds}" instead.
                `);
        return;
      }
      this.isValid = true;
      this.milliseconds = milliseconds;
    }
    humanize(locale) {
      if (!this.isValid) {
        return "";
      }
      const unit = findBestUnitMatch(this);
      if (unit === units.SECONDS) {
        const isLater = this.milliseconds > 0;
        return isLater ? labelSecondsLater : labelSecondsAgo;
      }
      return format(locale, this.asIn(unit), unit.name);
    }
    asIn(unit) {
      switch (unit) {
        case units.SECONDS:
          return Math.round(this.milliseconds / SECOND_TO_MILLISECONDS);
        case units.MINUTES:
          return Math.round(this.milliseconds / MINUTE_TO_MILLISECONDS);
        case units.HOURS:
          return Math.round(this.milliseconds / HOUR_TO_MILLISECONDS);
        case units.DAYS:
          return Math.round(this.milliseconds / DAY_TO_MILLISECONDS);
        case units.MONTHS:
          return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS));
        case units.YEARS:
        default:
          return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS) / 12);
      }
    }
  }
  const __lwc_component_class_internal = _7_1_5.registerComponent(Duration, {
    tmpl: _tmpl,
    sel: "lightning-config-provider",
    apiVersion: 62
  });
  function daysToMonth(days) {
    const daysToMonthRatio = 4800 / 146097;
    return days * daysToMonthRatio;
  }
  function findBestUnitMatch(duration2) {
    const match = Object.keys(units).find((key) => {
      const unit = units[key];
      return unit === units.YEARS || Math.abs(duration2.asIn(unit)) < unit.threshold;
    });
    return units[match];
  }
  function format(locale, value, unit) {
    if ("Intl" in window && Intl.RelativeTimeFormat) {
      const formatter = new Intl.RelativeTimeFormat(locale, {
        style: "long",
        numeric: "always"
      });
      return formatter.format(value, unit);
    }
    return fallbackFormatter(value, unit);
  }
  function fallbackFormatter(value, unit) {
    console.warn(`The current environment does not support formatters for relative time.`);
    const absoluteValue = Math.abs(value);
    const unitString = absoluteValue !== 1 ? unit + fallbackPluralSuffix : unit;
    const label = value > 0 ? fallbackFutureLabel : fallbackPastLabel;
    return formatString(label, absoluteValue, unitString);
  }
  function formatString(str, ...args) {
    return str.replace(/{(\d+)}/g, (match, i) => {
      return args[i];
    });
  }
  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DATE_FORMAT = {
    short: "M/d/yyyy",
    medium: "MMM d, yyyy",
    long: "MMMM d, yyyy"
  };
  const TIME_FORMAT = {
    short: "h:mm a",
    medium: "h:mm:ss a",
    long: "h:mm:ss a"
  };
  const TIME_FORMAT_SIMPLE = {
    short: "h:m a",
    medium: "h:m:s a",
    long: "h:m:s a"
  };
  function formatDate(value, format2) {
    let isUTC = false;
    let dateString = value;
    if (typeof value === "string") {
      dateString = value.split(TIME_SEPARATOR)[0];
      isUTC = true;
    }
    return formatDateInternal(dateString, format2, isUTC);
  }
  function formatDateUTC(value, format2) {
    return formatDateInternal(value, format2, true);
  }
  function formatTime(date, format2) {
    if (!isDate(date)) {
      return new Date("");
    }
    const hours = (date.getHours() + 11) % 12 + 1;
    const suffix = date.getHours() >= 12 ? "PM" : "AM";
    switch (format2) {
      case STANDARD_TIME_FORMAT:
        return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${doublePad(date.getMilliseconds())}`;
      case TIME_FORMAT.short:
        return `${hours}:${pad(date.getMinutes())} ${suffix}`;
      case TIME_FORMAT.medium:
      case TIME_FORMAT.long:
      default:
        return `${hours}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${suffix}`;
    }
  }
  function formatDateTimeUTC(value) {
    if (!isDate(value)) {
      return new Date("");
    }
    const date = new Date(value.getTime());
    return `${formatDateUTC(date)}, ${formatTime(addTimezoneOffset(date))}`;
  }
  function parseDateTimeISO8601(value) {
    let isoString = null;
    let shouldAddOffset = true;
    if (isValidISOTimeString(value)) {
      isoString = `2014-03-20T${addTimezoneSuffix(value)}`;
    } else if (isValidISODateTimeString(value)) {
      if (value.indexOf(TIME_SEPARATOR) > 0) {
        isoString = addTimezoneSuffix(value);
        shouldAddOffset = false;
      } else {
        isoString = `${value}T00:00:00.000Z`;
      }
    }
    if (isoString) {
      const parsedDate = new Date(isoString);
      if (shouldAddOffset) {
        addTimezoneOffset(parsedDate);
      }
      return parsedDate;
    }
    return null;
  }
  function parseDateTime(value, format2) {
    if (format2 === STANDARD_DATE_FORMAT && isValidISODateTimeString(value)) {
      return parseDateTimeISO8601(value);
    }
    if (Object.values(DATE_FORMAT).includes(format2)) {
      return parseFormattedDate(value, format2);
    }
    if (Object.values(TIME_FORMAT_SIMPLE).includes(format2)) {
      return parseFormattedTime(value);
    }
    return null;
  }
  function parseDateTimeUTC(value) {
    return parseDateTimeISO8601(addTimezoneSuffix(value));
  }
  function isBefore(date1, date2, unit) {
    const normalizedDate1 = getDate(date1);
    const normalizedDate2 = getDate(date2);
    if (!normalizedDate1 || !normalizedDate2) {
      return false;
    }
    return startOf(normalizedDate1, unit).getTime() < startOf(normalizedDate2, unit).getTime();
  }
  function isAfter(date1, date2, unit) {
    const normalizedDate1 = getDate(date1);
    const normalizedDate2 = getDate(date2);
    if (!normalizedDate1 || !normalizedDate2) {
      return false;
    }
    return startOf(normalizedDate1, unit).getTime() > startOf(normalizedDate2, unit).getTime();
  }
  function UTCToWallTime(date, timezone, callback) {
    const utcDate = new Date(date.getTime());
    callback(subtractTimezoneOffset(utcDate));
  }
  function WallTimeToUTC(date, timezone, callback) {
    const localDate = new Date(date.getTime());
    callback(addTimezoneOffset(localDate));
  }
  function translateToOtherCalendar(date) {
    return date;
  }
  function translateFromOtherCalendar(date) {
    return date;
  }
  function translateToLocalizedDigits(input) {
    return input;
  }
  function translateFromLocalizedDigits(input) {
    return input;
  }
  function getNumberFormat() {
    return {
      format: (value) => {
        console.warn(`The current environment does not support large numbers and the original value of ${value} will be returned.`);
        return value;
      }
    };
  }
  function duration(minutes) {
    return new __lwc_component_class_internal(minutes * 60 * 1e3);
  }
  function displayDuration(value) {
    return value.humanize("en");
  }
  function parseFormattedTime(value) {
    const values = value.trim().split(/[:.\s*]/);
    const length = values.length;
    if (!values || length < 2 || length > 5) {
      return null;
    }
    const ampm = values[length - 1];
    const isBeforeNoon = ampm.toLowerCase() === "am";
    const isAfternoon = ampm.toLowerCase() === "pm";
    values.splice(-1, 1);
    const allNumbers = values.every((item) => !isNaN(item));
    if (!isAfternoon && !isBeforeNoon || !allNumbers) {
      return null;
    }
    const hours = values[0];
    const hour24 = pad(isAfternoon ? hours % 12 + 12 : hours % 12);
    const minutes = length >= 3 && values[1] || "0";
    const seconds = length >= 4 && values[2] || "0";
    const milliseconds = length === 5 && values[3] || "0";
    const newDate = new Date("2014-03-20");
    newDate.setHours(hour24, minutes, seconds, milliseconds);
    return isDate(newDate) ? newDate : null;
  }
  function parseFormattedDate(value, format2) {
    let pattern = /^([a-zA-Z]{3})\s*(\d{1,2}),\s*(\d{4})$/;
    switch (format2) {
      case DATE_FORMAT.short:
        pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        break;
      case DATE_FORMAT.long:
        pattern = /^([a-zA-Z]+)\s*(\d{1,2}),\s*(\d{4})$/;
        break;
    }
    const match = pattern.exec(value.trim());
    if (!match) {
      return null;
    }
    let month = match[1];
    const day = match[2];
    const year = match[3];
    if (format2 !== DATE_FORMAT.short) {
      month = MONTH_NAMES.findIndex((item) => item.toLowerCase().includes(month.toLowerCase()));
      month += 1;
    }
    const isoValue = `${year}-${pad(month)}-${pad(day)}`;
    const newDate = new Date(`${isoValue}T00:00:00.000Z`);
    return isDate(newDate) ? addTimezoneOffset(newDate) : null;
  }
  function formatDateInternal(value, format2, isUTC) {
    const date = getDate(value);
    if (!date) {
      return new Date("");
    }
    if (isUTC && isDate(value)) {
      addTimezoneOffset(date);
    }
    switch (format2) {
      case STANDARD_DATE_FORMAT:
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
      case DATE_FORMAT.short:
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      case DATE_FORMAT.long:
        return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      case DATE_FORMAT.medium:
      default: {
        const shortMonthName = MONTH_NAMES[date.getMonth()].substring(0, 3);
        return `${shortMonthName} ${date.getDate()}, ${date.getFullYear()}`;
      }
    }
  }
  function startOf(date, unit) {
    switch (unit) {
      case "day":
        date.setHours(0);
        date.setMinutes(0);
      case "minute":
        date.setSeconds(0);
        date.setMilliseconds(0);
        break;
    }
    return date;
  }
  function isDate(value) {
    return Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime());
  }
  function addTimezoneSuffix(value) {
    return `${removeTimeZoneSuffix(value)}Z`;
  }
  function addTimezoneOffset(date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  }
  function subtractTimezoneOffset(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }
  function getDate(value) {
    if (!value) {
      return null;
    }
    if (isDate(value)) {
      return new Date(value.getTime());
    }
    if (isFinite(value) && (typeof value === "number" || typeof value === "string")) {
      return new Date(parseInt(value, 10));
    }
    if (typeof value === "string") {
      return parseDateTimeISO8601(value);
    }
    return null;
  }
  function pad(n) {
    return Number(n) < 10 ? `0${n}` : n;
  }
  function doublePad(n) {
    return Number(n) < 10 ? `00${n}` : Number(n) < 100 ? `0${n}` : n;
  }
  var localizationService = {
    formatDate,
    formatDateUTC,
    formatTime,
    formatDateTimeUTC,
    parseDateTimeISO8601,
    parseDateTime,
    parseDateTimeUTC,
    isBefore,
    isAfter,
    UTCToWallTime,
    WallTimeToUTC,
    translateToOtherCalendar,
    translateFromOtherCalendar,
    translateToLocalizedDigits,
    translateFromLocalizedDigits,
    getNumberFormat,
    duration,
    displayDuration
  };
  function getLocalizationService() {
    return localizationService;
  }
  function getPathPrefix() {
    return basePath__default["default"];
  }
  function getToken() {
    return null;
  }
  function getIconSvgTemplates() {
    return null;
  }
  function getOneConfig() {
    return {
      densitySetting: ""
    };
  }
  var _1 = {
    getOneConfig,
    getIconSvgTemplates,
    getToken,
    getPathPrefix,
    getLocalizationService
  };
  exports["default"] = _1;
  exports.getIconSvgTemplates = getIconSvgTemplates;
  exports.getLocalizationService = getLocalizationService;
  exports.getOneConfig = getOneConfig;
  exports.getPathPrefix = getPathPrefix;
  exports.getToken = getToken;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lightning/configProvider", ["exports", "lightning/configProvider/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lightning/navigation/v/1", ["exports", "lwr/navigationContext/v/0_13_10", "lwr/currentPageReference/v/0_13_10", "lwr/currentView/v/0_13_10", "lwr/contextUtils/v/0_13_10", "lwr/routerErrors/v/0_13_10", "lwr/navigationMixinHacks/v/0_13_10"], function(exports, _0_13_10, _0_13_10$1, _0_13_10$2, _0_13_10$3, _0_13_10$4, _0_13_10$5) {
  "use strict";
  function navigate(context, pageReference, replace, options) {
    const api = _0_13_10$3.getNavigationHelm(context);
    api.navigate(pageReference, replace, options);
  }
  function generateUrl(context, pageReference, options) {
    const api = _0_13_10$3.getNavigationHelm(context);
    return api.generateUrl(pageReference, options);
  }
  const isSSR = typeof window === "undefined";
  const Navigate = Symbol("Navigate");
  const GenerateUrl = Symbol("GenerateUrl");
  const NavContext = Symbol("NavContext");
  const GetContext = Symbol("NavContext");
  function NavigationMixin(Base) {
    _0_13_10$4.invariant(typeof Base.prototype.dispatchEvent === "function", _0_13_10$4.messages.INVALID_MIXIN_CMP, [Base.toString()]);
    class Mixin extends Base {
      [GetContext]() {
        if (!this[NavContext]) {
          this.dispatchEvent(new CustomEvent(_0_13_10$5.CONTEXT_ID_BACKDOOR, {
            bubbles: true,
            composed: true,
            detail: {
              callback: (contextId) => {
                this[NavContext] = contextId;
              }
            }
          }));
          if (!this[NavContext]) {
            throw new Error(_0_13_10$4.generateMessage(_0_13_10$4.messages.MISSING_CONTEXT));
          }
        }
      }
      [Navigate](pageRef, replace, options) {
        if (!isSSR) {
          this[GetContext]();
          navigate(this[NavContext], pageRef, replace, options);
        }
      }
      async [GenerateUrl](pageRef, options) {
        if (!isSSR) {
          this[GetContext]();
          return generateUrl(this[NavContext], pageRef, options);
        } else {
          return null;
        }
      }
    }
    return Mixin;
  }
  NavigationMixin.Navigate = Navigate;
  NavigationMixin.GenerateUrl = GenerateUrl;
  NavigationMixin.NavContext = NavContext;
  Object.defineProperty(exports, "NavigationContext", {
    enumerable: true,
    get: function() {
      return _0_13_10.NavigationContext;
    }
  });
  Object.defineProperty(exports, "CurrentPageReference", {
    enumerable: true,
    get: function() {
      return _0_13_10$1.CurrentPageReference;
    }
  });
  Object.defineProperty(exports, "CurrentView", {
    enumerable: true,
    get: function() {
      return _0_13_10$2.CurrentView;
    }
  });
  Object.defineProperty(exports, "ContextInfo", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.ContextInfo;
    }
  });
  Object.defineProperty(exports, "generateContextualWireAdapter", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.generateContextualWireAdapter;
    }
  });
  Object.defineProperty(exports, "getNavigationHelm", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.getNavigationHelm;
    }
  });
  Object.defineProperty(exports, "registerNavigationHelm", {
    enumerable: true,
    get: function() {
      return _0_13_10$3.registerNavigationHelm;
    }
  });
  exports.NavigationMixin = NavigationMixin;
  exports.generateUrl = generateUrl;
  exports.navigate = navigate;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lightning/navigation", ["exports", "lightning/navigation/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/f6Controller/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  const DEBOUNCE_KEY_DOWN = 300;
  const {
    document: document2
  } = globalThis;
  const DEFAULT_CONFIG = {
    navKey: "F6",
    f6RegionAttribute: "data-f6-region",
    f6RegionHighlightClass: "f6-highlight"
  };
  const getActiveElem = (element) => {
    if (!element) {
      return element;
    }
    if (!element.shadowRoot) {
      if (element.activeElement) {
        return getActiveElem(element.activeElement);
      }
      return element;
    }
    if (!element.shadowRoot.activeElement) {
      return element;
    }
    return getActiveElem(element.shadowRoot.activeElement);
  };
  class F6Controller {
    constructor(config = {}) {
      this.regions = [];
      this.config = DEFAULT_CONFIG;
      this.handleClick = () => {
        this.clearRegionHighlights();
      };
      this.handleKeyDown = (event) => {
        this.clearRegionHighlights();
        const {
          key,
          ctrlKey,
          metaKey
        } = event;
        if (key === this.config.navKey && (ctrlKey || metaKey)) {
          this.populateRegions();
          this.handleNavigation(event);
        }
      };
      this.elementFilter = (element) => {
        if (element.parentElement && element.parentElement.matches(`*[${this.config.f6RegionAttribute}]`)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (element.matches(`*[${this.config.f6RegionAttribute}]`) && this.isVisible(element) && !this.isEmpty(element)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      };
      this._debounceKeyDownHandler = this.debounce(this.handleKeyDown.bind(this), DEBOUNCE_KEY_DOWN);
      this.initialize(config);
    }
    debounce(func, delay, options) {
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
        timer = setTimeout(function() {
          func.apply(this, args);
          invokeLeading = _options.leading;
        }, delay);
      };
    }
    appendStyleElement() {
      this._styleElement = document2.createElement("style");
      const selector = `[${this.config.f6RegionAttribute}].${this.config.f6RegionHighlightClass}`;
      this._styleElement.innerText = `${selector} { position: relative; }  ${selector}::after { width: 100%; height: 100%; content: ''; outline: rgb(94, 158, 214) 3px solid; outline-offset: -3px; position: absolute; top: 0; left: 0; z-index: 9999; }`;
      this._styleElement.setAttribute("type", "text/css");
      document2.head.appendChild(this._styleElement);
    }
    clearRegionHighlights() {
      if (!this.regions || !this.regions.length) {
        return;
      }
      this.regions.forEach((region) => {
        region.classList.remove(this.config.f6RegionHighlightClass);
      });
    }
    addRegionHighlight(element) {
      element.classList.add(this.config.f6RegionHighlightClass);
    }
    focusIn(region) {
      const firstFocusable = region.querySelector('a[href],button:not([disabled]),input:not([type="hidden"]):not([disabled]),select:not([type="hidden"]):not([disabled]),textarea:not([type="hidden"]):not([disabled])');
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        region.tabIndex = "-1";
        region.focus();
      }
    }
    handleNavigation(event) {
      event.preventDefault();
      if (!this.regions.length) {
        return;
      }
      const isPrevious = event.shiftKey;
      const currentRegionIndex = this.getElementRegionIndex(getActiveElem(event.target));
      const adjacentRegionIndex = this.getNextRegionIndex(currentRegionIndex, isPrevious);
      if (adjacentRegionIndex === -1) {
        return;
      }
      const regionToFocus = this.regions[adjacentRegionIndex];
      this.focusIn(regionToFocus);
      this.addRegionHighlight(regionToFocus);
    }
    shadowContains(container, element) {
      if (container === element || container.contains(element)) {
        return true;
      }
      if (container.shadowRoot) {
        if (this.isElementInContainerElements(container.shadowRoot.children, element)) {
          return true;
        }
      }
      if (container.tagName === "SLOT") {
        if (this.isElementInContainerElements(container.assignedElements(), element)) {
          return true;
        }
      }
      return this.isElementInContainerElements(container.children, element);
    }
    isElementInContainerElements(containerElements, searchElement) {
      if (!containerElements || !containerElements.length) {
        return false;
      }
      const numElements = containerElements.length;
      for (let index = 0; index < numElements; index++) {
        if (this.shadowContains(containerElements[index], searchElement)) {
          return true;
        }
      }
      return false;
    }
    getElementRegionIndex(element) {
      if (!this.regions || !this.regions.length) {
        return -1;
      }
      return this.regions.findIndex((container) => {
        return this.shadowContains(container, element);
      });
    }
    getNextRegionIndex(currentRegionIndex, isPrevious) {
      const lastRegionIndex = this.regions.length - 1;
      if (lastRegionIndex < 0) {
        return -1;
      }
      if (isPrevious) {
        if (currentRegionIndex <= 0) {
          return lastRegionIndex;
        }
        return currentRegionIndex - 1;
      }
      if (currentRegionIndex === lastRegionIndex) {
        return 0;
      }
      return currentRegionIndex + 1;
    }
    isVisible(element) {
      if (element === document2.body || !(element instanceof Element)) {
        return true;
      }
      try {
        const computedStyle = window.getComputedStyle(element) || element.style;
        if (!computedStyle) {
          return false;
        }
        const {
          display,
          visibility
        } = computedStyle;
        if (display && display.toLowerCase() === "none" || visibility && visibility.toLowerCase() === "hidden") {
          return false;
        }
        return this.isVisible(element.parentNode);
      } catch (error) {
        return false;
      }
    }
    isEmpty(element) {
      if (element.tagName === "SLOT") {
        if (!this.isEmptyChildren(element.assignedElements())) {
          return false;
        }
      }
      let children = element.children;
      if ((!children || !children.length) && element.shadowRoot) {
        children = element.shadowRoot.children;
      }
      return this.isEmptyChildren(children);
    }
    isEmptyChildren(children) {
      if (!children || !children.length) {
        return true;
      }
      const numChildren = children.length;
      for (let index = 0; index < numChildren; index++) {
        const child = children[index];
        if (child.tagName !== "SLOT" || !this.isEmpty(child)) {
          return false;
        }
      }
      return true;
    }
    populateRegions() {
      if (!document2) {
        return;
      }
      this.regions = [];
      const treeWalker = document2.createTreeWalker(document2.body, NodeFilter.SHOW_ELEMENT, this.elementFilter, false);
      while (treeWalker.nextNode()) {
        this.regions.push(treeWalker.currentNode);
      }
    }
    initialize(config = {}) {
      if (!document2) {
        return;
      }
      document2.addEventListener("keydown", this._debounceKeyDownHandler);
      this.regions = [];
      this.config = {
        ...this.config,
        ...config
      };
      this.appendStyleElement();
    }
    cleanUp() {
      if (!document2) {
        return;
      }
      document2.removeEventListener("keydown", this._debounceKeyDownHandler);
      this._regions = [];
      this._config = DEFAULT_CONFIG;
      this._debounceKeyDownHandler = null;
      if (this._styleElement) {
        document2.head.removeChild(this._styleElement);
        this._styleElement = null;
      }
    }
    getConfig() {
      return Object.freeze(this.config);
    }
  }
  let f6Controller;
  const createF6Controller = (config) => {
    if (!f6Controller) {
      f6Controller = new F6Controller(config);
    }
    return f6Controller;
  };
  const getCurrentRegionAttributeName = () => {
    if (f6Controller) {
      const config = f6Controller.getConfig();
      if (config) {
        return config.f6RegionAttribute;
      }
    }
    return void 0;
  };
  exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
  exports.F6Controller = F6Controller;
  exports.createF6Controller = createF6Controller;
  exports.getActiveElem = getActiveElem;
  exports.getCurrentRegionAttributeName = getCurrentRegionAttributeName;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/f6Controller", ["exports", "webruntime/f6Controller/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lightning/f6Controller/v/1", ["exports", "webruntime/f6Controller/v/1_66_768-252_0"], function(exports, _1_66_768252_0) {
  "use strict";
  Object.keys(_1_66_768252_0).forEach(function(k) {
    if (k !== "default" && !exports.hasOwnProperty(k))
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
          return _1_66_768252_0[k];
        }
      });
  });
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lightning/f6Controller", ["exports", "lightning/f6Controller/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/environment/v/1", ["exports"], function(exports) {
  "use strict";
  const environment = globalThis?.LWR?.env || {};
  const isServer = environment && (environment.SSR === "true" || environment.SSR === true);
  const basePath = environment && environment.basePath;
  const locale = environment && environment.locale;
  const assetBasePath = environment && environment.assetBasePath;
  const uiBasePath = environment && environment.uiBasePath;
  exports.assetBasePath = assetBasePath;
  exports.basePath = basePath;
  exports.isServer = isServer;
  exports.locale = locale;
  exports.uiBasePath = uiBasePath;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/environment", ["exports", "lwr/environment/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("transport/v/1", ["exports", "webruntime/transport/v/1"], function(exports, _1) {
  "use strict";
  Object.keys(_1).forEach(function(k) {
    if (k !== "default" && !exports.hasOwnProperty(k))
      Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
          return _1[k];
        }
      });
  });
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("transport", ["exports", "transport/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/transport/v/1", ["exports", "lwr/loaderLegacy/v/0_13_10", "@app/basePath/v/1", "@app/apiBasePath/v/1", "@salesforce/i18n/lang/v/1", "webruntime/utils/v/1_66_768-252_0", "@communities-webruntime/common/v/1_66_768-252_0", "lwc/v/7_1_5"], function(exports, _0_13_10, basePath, apiBasePath, language, _1_66_768252_0, _1_66_768252_0$1, _7_1_5) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var apiBasePath__default = /* @__PURE__ */ _interopDefaultLegacy(apiBasePath);
  var language__default = /* @__PURE__ */ _interopDefaultLegacy(language);
  var _tmpl = void 0;
  class UrlBuilder {
    constructor(url) {
      const [path, queryString] = url.split("?");
      this.path = path;
      this.searchParams = new URLSearchParams(queryString);
    }
    setParamDefaultValue(name, value) {
      if (!this.searchParams.has(name)) {
        this.searchParams.append(name, value);
      }
      return this;
    }
    build() {
      const queryString = this.searchParams.toString();
      return this.path + (queryString ? `?${queryString}` : ``);
    }
  }
  const __lwc_component_class_internal = _7_1_5.registerComponent(UrlBuilder, {
    tmpl: _tmpl,
    sel: "webruntime-transport",
    apiVersion: 62
  });
  const METHODS_WITH_CSRF = ["POST", "PATCH", "PUT", "DELETE"];
  const SFDC_REQUEST_ID_HEADER = "X-SFDC-Request-Id";
  const TOO_MANY_REQUESTS_RESPONSE_HEADER = "X-Salesforce-Too-Many-Requests";
  const PUBLIC_SIGIL_QUERY_PARAM_NAME = "asGuest";
  const LOCALE_SIGIL_QUERY_PARAM_NAME = "language";
  const ENCODE_SIGIL_QUERY_PARAM_NAME = "htmlEncode";
  const {
    location,
    navigator: navigator2
  } = globalThis;
  async function webruntimeFetch(path, init = {}) {
    _1_66_768252_0.assert(typeof path === "string", "Valid path not provided for fetch request");
    const initParams = {
      ...init,
      headers: {
        ...init.headers
      },
      credentials: init.credentials || "same-origin"
    };
    if (init.credentials === null) {
      delete initParams.credentials;
    }
    const isNonApiRequest = initParams.isNonApiRequest === true;
    const asGuest = initParams.asGuest === true || (await getUser()).isGuest;
    const actualBasePath = initParams.basePath !== void 0 ? initParams.basePath : apiBasePath__default["default"];
    const url = new __lwc_component_class_internal(location ? new URL(actualBasePath + path, location).toString() : actualBasePath + path);
    if (!isNonApiRequest) {
      url.setParamDefaultValue(LOCALE_SIGIL_QUERY_PARAM_NAME, language__default["default"]).setParamDefaultValue(PUBLIC_SIGIL_QUERY_PARAM_NAME, asGuest).setParamDefaultValue(ENCODE_SIGIL_QUERY_PARAM_NAME, false);
    }
    const contentType = initParams.headers["Content-Type"];
    if (contentType === null) {
      delete initParams.headers["Content-Type"];
    } else if (contentType) {
      initParams.headers["Content-Type"] = contentType;
    } else if (init.body) {
      initParams.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    initParams.headers[SFDC_REQUEST_ID_HEADER] = generateRequestId();
    await addCSRFToken(initParams);
    const response = await globalThis.fetch(url.build(), initParams);
    if (hasTooManyRequestsHeader(response)) {
      dispatchTooManyRequestsClientError();
    }
    return response;
  }
  function dispatchTooManyRequestsClientError() {
    document.dispatchEvent(new CustomEvent("client-error", {
      detail: {
        type: _1_66_768252_0$1.CLIENT_ERROR_TYPES.TOO_MANY_REQUESTS
      }
    }));
  }
  function hasTooManyRequestsHeader(response) {
    if (response.status === 503 || response.status === 429) {
      if (response.headers.get(TOO_MANY_REQUESTS_RESPONSE_HEADER)) {
        return true;
      }
    }
    return false;
  }
  async function addCSRFToken(params) {
    if (!METHODS_WITH_CSRF.includes(params.method)) {
      return;
    }
    const {
      csrfToken
    } = await getUser();
    if (csrfToken) {
      params.headers["CSRF-Token"] = csrfToken;
    }
  }
  async function sendBeacon({
    path,
    payload,
    contentType
  }) {
    const url = basePath__default["default"] + path;
    const sentBeacon = navigator2 && navigator2.sendBeacon && navigator2.sendBeacon(url, payload);
    if (!sentBeacon) {
      await globalThis.fetch(path, {
        headers: {
          "Content-Type": contentType
        },
        basePath: basePath__default["default"],
        body: payload,
        method: "POST",
        isNonApiRequest: true
      });
    }
  }
  function generateRequestId() {
    return (Date.now() + guid() + Math.round(Math.random() * 1e8)).substring(0, 18);
  }
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    }
    return s4() + s4();
  }
  async function getUser() {
    if (typeof window === "undefined") {
      return {
        isGuest: true,
        id: null,
        csrfToken: null
      };
    }
    const {
      default: user
    } = await _0_13_10.load("@app/user/v/1");
    return user;
  }
  exports.fetch = webruntimeFetch;
  exports.sendBeacon = sendBeacon;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/transport", ["exports", "webruntime/transport/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("assert/v/1", ["exports", "webruntime/utils/v/1_66_768-252_0"], function(exports, _1_66_768252_0) {
  "use strict";
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _1_66_768252_0.assert;
    }
  });
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("assert", ["exports", "assert/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("o11y/shared/v/1", ["exports"], function(exports) {
  "use strict";
  class Utility {
    constructor() {
      this.notImplemented = "Method not implemented.";
      const performanceExists = typeof performance !== "undefined";
      if (performanceExists) {
        if (performance.timeOrigin) {
          this._timeOrigin = performance.timeOrigin;
        } else {
          this._timeOrigin = Date.now();
        }
      } else {
        this._timeOrigin = Date.now();
      }
      const timeOrigin = this._timeOrigin;
      if (performanceExists && typeof performance.now === "function") {
        this.perfNow = performance.now.bind(performance);
        this.time = () => {
          const perfNow = this.perfNow();
          return {
            tsNow: timeOrigin + perfNow,
            perfNow,
            timeOrigin
          };
        };
      } else {
        this.perfNow = () => {
          return Date.now() - timeOrigin;
        };
        this.time = () => {
          const perfNow = this.perfNow();
          return {
            tsNow: Date.now(),
            perfNow,
            timeOrigin
          };
        };
      }
    }
    get isProduction() {
      return Utility._isProduction;
    }
    markProduction(value) {
      Utility._isProduction = value !== null && value !== void 0 ? value : true;
    }
    _checkArgument(argument, argKind) {
      if (typeof argKind === "string") {
        return typeof argument === argKind;
      }
      if (typeof argKind === "function") {
        return argument instanceof argKind;
      }
      if (Array.isArray(argKind)) {
        return argKind.some((arg) => this._checkArgument(argument, arg));
      }
      throw new Error(`Invalid argKind ${argKind}`);
    }
    requireArgument(argument, argumentName, argKind) {
      let disallowed = argument === void 0 || argument === null || argument === "";
      const kindSpecified = argKind !== void 0;
      if (!disallowed && kindSpecified) {
        disallowed = !this._checkArgument(argument, argKind);
      }
      if (disallowed) {
        throw new Error(`${argumentName} argument is required${kindSpecified ? " and must be of a supported type." : "."}`);
      }
    }
    requireArgumentIfDefined(argument, argumentName, argKind) {
      if (argument === void 0) {
        return false;
      }
      const disallowed = argument === null || argument === "" || !this._checkArgument(argument, argKind);
      if (disallowed) {
        throw new Error(`${argumentName} argument, if defined, must be of a supported type.`);
      }
      return true;
    }
    checkForDenyListedValues(argument, argumentName, denyList) {
      if (denyList.some((x) => argument === x)) {
        throw new Error(`The value ${argument} isn't allowed for ${argumentName} argument.`);
      }
    }
    checkForReservedCharacters(argument, argumentName, reservedChars) {
      if (argument && reservedChars.some((c) => argument.indexOf(c) >= 0)) {
        throw new Error(`The argument ${argumentName} isn't allowed to contain characters from ['${reservedChars.join(", ")}']. Received: ${argument}.`);
      }
    }
    generateUniqueId(length = 16) {
      const chars = [];
      const digits = "0123456789abcdef";
      if (!(length === void 0 || length > 0)) {
        throw new Error('If specified, the argument "length" must be a positive integer');
      }
      for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * 16);
        chars.push(digits[rand]);
      }
      return chars.join("");
    }
    getXpath(_element) {
      function hasSameSibs(elm) {
        const name = elm.localName;
        while (elm.nextElementSibling) {
          elm = elm.nextElementSibling;
          if (elm.localName === name) {
            return true;
          }
        }
        return false;
      }
      function idx(sib, name) {
        if (sib) {
          return idx(sib.previousElementSibling, name || sib.localName) + (sib.localName === name ? 1 : 0);
        }
        return 1;
      }
      function segs(elm) {
        if (!elm || elm.nodeType !== 1) {
          return [""];
        }
        const nodeValue = idx(elm) > 1 || hasSameSibs(elm) ? `${elm.localName.toLowerCase()}[${idx(elm)}]` : elm.localName.toLowerCase();
        return [...segs(elm.parentNode), nodeValue];
      }
      return segs(_element).join("/");
    }
    getAge(timestamp) {
      return timestamp - this._timeOrigin;
    }
    getConnectionType() {
      var _a;
      let connectionType;
      if (typeof navigator !== "undefined") {
        const expNav = navigator;
        connectionType = (_a = expNav === null || expNav === void 0 ? void 0 : expNav.connection) === null || _a === void 0 ? void 0 : _a.effectiveType;
      }
      return connectionType;
    }
    clone(value) {
      return JSON.parse(JSON.stringify(value));
    }
    definedValueOrDefault(value, defaultValue) {
      return value !== void 0 ? value : defaultValue;
    }
    getGlobal() {
      if (typeof globalThis === "object") {
        return globalThis;
      }
      if (typeof self === "object") {
        return self;
      }
      throw new Error("Unable to locate globalThis or self");
    }
    getIsBeaconSupported() {
      var _a;
      const g = this.getGlobal();
      return typeof ((_a = g.navigator) === null || _a === void 0 ? void 0 : _a.sendBeacon) === "function" && typeof g.Blob === "function";
    }
    estimateObjectSize(object) {
      const objectSet = new Set();
      const stack = [object];
      let bytes = 0;
      while (stack.length) {
        const value = stack.pop();
        if (typeof value === "boolean") {
          bytes += 4;
        } else if (typeof value === "string") {
          bytes += value.length * 2;
        } else if (typeof value === "number") {
          bytes += 8;
        } else if (value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Uint16Array || value instanceof Uint32Array || value instanceof Int8Array || value instanceof Int16Array || value instanceof Int32Array || value instanceof Float32Array || value instanceof Float64Array) {
          bytes += value.byteLength;
        } else if (typeof value === "object") {
          const obj = value;
          if (!objectSet.has(obj)) {
            objectSet.add(obj);
            for (const key in obj) {
              stack.push(obj[key]);
            }
          }
        }
      }
      return bytes;
    }
    noProdThrow(e) {
      if (utility.isProduction) {
        return;
      }
      throw e;
    }
    isAllowedOrigin(input, allowed) {
      return Array.isArray(allowed) && allowed.some((origin) => origin === "*" || input === origin || origin instanceof RegExp && origin.test(input));
    }
    roundNumber(value, decimals) {
      const pow = Math.pow(10, decimals);
      return Math.round(value * pow) / pow;
    }
    roundNumbersInObject(obj, decimals) {
      if (obj) {
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === "number") {
            obj[key] = this.roundNumber(value, decimals);
          }
        });
      }
    }
    tryGetAbsoluteUrl(url) {
      var _a;
      if ((url === null || url === void 0 ? void 0 : url.startsWith("/")) && typeof window === "object") {
        return ((_a = window.location.origin) !== null && _a !== void 0 ? _a : "") + url;
      }
      return url;
    }
  }
  Utility._isProduction = true;
  const _utility = new Utility();
  const global = _utility.getGlobal();
  _utility.markProduction(global === null || global === void 0 ? void 0 : global.__O11Y_IS_PROD__);
  const utility = Object.freeze(_utility);
  class UpCounterImpl {
    constructor(_name, _ownerName, _ownerAppName, _tags, createdOn, lastUpdatedOn, value) {
      this._name = _name;
      this._ownerName = _ownerName;
      this._ownerAppName = _ownerAppName;
      this._tags = _tags;
      this._value = 0;
      this._createdOn = createdOn === void 0 ? utility.time().tsNow : createdOn;
      if (lastUpdatedOn !== void 0) {
        this._lastUpdatedOn = lastUpdatedOn;
      }
      if (value !== void 0) {
        this._value = value;
      }
    }
    getName() {
      return this._name;
    }
    getCreatedOn() {
      return this._createdOn;
    }
    getLastUpdatedOn() {
      return this._lastUpdatedOn;
    }
    getData() {
      return this._value;
    }
    increment(value = 1) {
      if (typeof value === "number" && value > 0) {
        this._value += Math.round(value);
        this._lastUpdatedOn = utility.time().tsNow;
        return;
      }
      throw new Error("UpCounter can only increment positive numbers.");
    }
    reset() {
      this._lastUpdatedOn = void 0;
      this._value = 0;
    }
    getOwnerName() {
      return this._ownerName;
    }
    getOwnerAppName() {
      return this._ownerAppName;
    }
    getTags() {
      return this._tags;
    }
  }
  const co11yName = "co11y";
  class Co11yImpl {
    constructor() {
      this._upCounters = new Map();
      this._ownerAppName = co11yName;
    }
    _addOrUpdateCounter(operation, ownerName, status) {
      if (!operation) {
        return;
      }
      const sortedTags = {
        status
      };
      const key = `${this._ownerAppName}:${ownerName}:${operation}${JSON.stringify(sortedTags)}`;
      let instrument = this._upCounters.get(key);
      if (!instrument) {
        instrument = new UpCounterImpl(operation, ownerName, this._ownerAppName, sortedTags);
        this._upCounters.set(key, instrument);
      }
      instrument.increment();
    }
    success(operation, ownerName) {
      this._addOrUpdateCounter(operation, ownerName, "success");
    }
    exception(operation, ownerName) {
      this._addOrUpdateCounter(operation, ownerName, "error");
    }
    getBucketHistograms() {
      return [];
    }
    getUpCounters() {
      return Array.from(this._upCounters.values()).filter((m) => m.getLastUpdatedOn());
    }
    getValueRecorders() {
      return [];
    }
    setOwnerAppName(ownerAppName) {
      this._ownerAppName = ownerAppName;
    }
  }
  const co11y = new Co11yImpl();
  class LazyMapToList {
    constructor(maxSize) {
      this._lazyMap = new Map();
      if (maxSize !== void 0) {
        if (typeof maxSize === "number" && maxSize > 0) {
          this._maxSize = Math.ceil(maxSize);
          return;
        }
        throw new Error("maxSize must be a positive number");
      }
    }
    get maxSize() {
      return this._maxSize;
    }
    get size() {
      return this._lazyMap.size;
    }
    push(key, value) {
      let buffer = this._lazyMap.get(key);
      if (!buffer) {
        if (this.maxSize !== void 0 && this.size === this.maxSize) {
          return false;
        }
        buffer = new Array();
        this._lazyMap.set(key, buffer);
      }
      buffer.push(value);
      return true;
    }
    getMessages(key, extract) {
      const msgs = this._lazyMap.get(key);
      if (extract && this._lazyMap.has(key)) {
        this._lazyMap.set(key, []);
      }
      return msgs || [];
    }
    getAllMessages(extract) {
      const map = new Map();
      for (const [key, value] of this._lazyMap.entries()) {
        if (value.length) {
          map.set(key, this.getMessages(key, extract));
        }
      }
      return map;
    }
    extractMessages(key) {
      return this.getMessages(key, true);
    }
    extractAllMessages() {
      return this.getAllMessages(true);
    }
    get totalItemCount() {
      let count = 0;
      for (const array of this._lazyMap.values()) {
        count += array.length;
      }
      return count;
    }
  }
  class SchemaUtil {
    getSchemaId(schema) {
      return `${schema.namespace}.${schema.name}`;
    }
    isInternal(schema) {
      return (schema === null || schema === void 0 ? void 0 : schema.namespace) === "sf.instrumentation";
    }
    makePayload(schema, data, onlyIfBoth = true) {
      if (!onlyIfBoth || schema !== void 0 && data !== void 0) {
        return {
          schema,
          payload: data
        };
      }
      return void 0;
    }
    checkSchema(schema) {
      utility.requireArgument(schema, "schema", "object");
      utility.requireArgument(schema.namespace, "schema.namespace", "string");
      utility.requireArgument(schema.name, "schema.name", "string");
      utility.requireArgument(schema.pbjsSchema, "schema.pbjsSchema", "object");
      return this._getTokens(schema);
    }
    _getTokens(schema) {
      const parts = schema.namespace.split(".");
      if (parts.length !== 2) {
        throw new Error(`Schema "${this.getSchemaId(schema)}" must have a namespace of the form "domain.feature".`);
      }
      return {
        domain: parts[0],
        feature: parts[1],
        message: schema.name
      };
    }
    _getAnyNestedObject(schema, scopes) {
      return scopes.reduce((prev, currentScope) => {
        const descriptor = prev.nested;
        if (descriptor) {
          const ano = descriptor[currentScope];
          if (ano) {
            return ano;
          }
        }
        throw new Error(`Cannot locate ${scopes.join(".")} in schema with ID ${this.getSchemaId(schema)}`);
      }, schema.pbjsSchema);
    }
    getTypes(schema) {
      const schemaTokens = this.checkSchema(schema);
      const namespace = this._getAnyNestedObject(schema, [schemaTokens.domain, schemaTokens.feature]);
      const descriptor = namespace.nested;
      if (!descriptor) {
        throw new Error(`Cannot parse schema with ID ${this.getSchemaId(schema)}`);
      }
      return descriptor;
    }
    getType(schema, messageName) {
      utility.requireArgument(messageName, "messageName", "string");
      const descriptor = this.getTypes(schema);
      const message = descriptor[messageName];
      if (!message) {
        throw new Error(`Cannot locate message ${messageName} in schema with ID ${this.getSchemaId(schema)}`);
      }
      return message;
    }
    getOptions(schema, messageName, fieldName) {
      if (fieldName) {
        utility.requireArgument(messageName, "messageName", "string");
      }
      const schemaTokens = this.checkSchema(schema);
      if (!messageName) {
        const namespace = this._getAnyNestedObject(schema, [schemaTokens.domain, schemaTokens.feature]);
        return namespace.options;
      }
      const type = this.getType(schema, messageName);
      if (!fieldName) {
        return type.options;
      }
      const field = type.fields[fieldName];
      if (!field) {
        const schemaId = this.getSchemaId(schema);
        throw new Error(`Cannot locate field ${fieldName} in message ${messageName} in schema with ID ${schemaId}`);
      }
      return field.options;
    }
    getExtraFields(schema, data) {
      const {
        message
      } = this._getTokens(schema);
      const types = this.getTypes(schema);
      const fields = types[message]["fields"];
      const fieldSet = new Set(Object.keys(fields));
      const extraFields = data !== null && data !== void 0 ? Object.keys(data).filter((key) => !fieldSet.has(key)) : [];
      return extraFields;
    }
  }
  const schemaUtil = new SchemaUtil();
  const maxStringLengthAppLimit = 1e4;
  const maxItemCountAppLimit = 1e4;
  const minUnsigned = 0;
  const maxFourBytes = 2147483647;
  const minFourBytes = -2147483648;
  const maxFourBytesUnsigned = 4294967295;
  const maxEightBytes = 9223372036854776e3;
  const minEightBytes = -9223372036854776e3;
  const maxEightBytesUnsigned = 18446744073709552e3;
  class ValidationEntry {
    constructor(errorCode, fields, expected, received) {
      this.errorCode = errorCode;
      this.fields = fields;
      this.expected = expected;
      this.received = received;
    }
    asMessage(schemaId) {
      const key = this.fields[0] + this.fields.slice(1).reduce((prev, current) => Number(current) >= 0 ? `${prev}[${current}]` : `${prev}.${current}`, "");
      let msg;
      switch (this.errorCode) {
        case 1:
          msg = "Repeated field must be an array";
          break;
        case 2:
          msg = `Expected type ${this.expected} but received type ${this.received}`;
          break;
        case 3:
          msg = "Value must be finite";
          break;
        case 4:
          msg = "Value is out of range for its type";
          break;
        case 5:
          msg = "Bytes array is malformed";
          break;
        case 6:
          msg = "Exceeded app limit for maximum string length";
          break;
        case 7:
          msg = "Exceeded app limit for item count";
          break;
        case 12:
          msg = "Value must be an integer";
          break;
        case 13:
          msg = "Values like null or undefined are not allowed for items in repeated fields";
          break;
        default:
          msg = `Unknown error code: ${this.errorCode}`;
          break;
      }
      return `Schema ${schemaId} on field "${key}": ${msg}`;
    }
  }
  class LogValidator {
    validate(schema, data, noThrow = false) {
      const schemaTokens = schemaUtil.checkSchema(schema);
      utility.requireArgument(data, "data", "object");
      const schemaId = schemaUtil.getSchemaId(schema);
      const errorInfos = new Array();
      const nestedSchema = schemaUtil.getTypes(schema);
      this._validateFields(errorInfos, [], data, nestedSchema[schemaTokens.message], nestedSchema, schemaId);
      if (errorInfos.length && !noThrow) {
        throw new Error(errorInfos[0].asMessage(schemaId));
      }
      return errorInfos;
    }
    _validateFields(errorInfos, fieldNames, data, message, descriptor, schemaId) {
      const oneofs = message.oneofs || {};
      const fields = message.fields || {};
      for (const key in data) {
        const value = data[key];
        if (value !== void 0 && value !== null) {
          const mft = (fieldType, isRepeated, isItem) => this._matchFieldTypes(errorInfos, [...fieldNames, key], value, fieldType, descriptor, schemaId, key, isRepeated, isItem);
          if (oneofs[key]) {
            mft(fields[oneofs[key].oneof[0]].type);
          } else if (fields[key]) {
            mft(fields[key].type, fields[key].rule === "repeated");
          }
        }
      }
    }
    _matchFieldTypes(errorInfos, fieldNames, fieldDataValue, protobufType, descriptor, schemaId, key, isRepeated, isItem) {
      let errorCode;
      if (isRepeated) {
        if (Array.isArray(fieldDataValue)) {
          if (fieldDataValue.length > maxItemCountAppLimit) {
            errorCode = 7;
          }
          fieldDataValue.forEach((value, index) => {
            this._matchFieldTypes(errorInfos, [...fieldNames, index.toString()], value, protobufType, descriptor, schemaId, key, void 0, true);
          });
        } else {
          errorCode = 1;
        }
      } else if (fieldDataValue == null || fieldDataValue === void 0) {
        if (isItem) {
          errorCode = 13;
        }
      } else {
        let numOpts;
        let javaScriptType;
        switch (protobufType) {
          case "string":
            javaScriptType = "string";
            if (fieldDataValue.length > maxStringLengthAppLimit) {
              errorCode = 6;
            }
            break;
          case "bytes":
            javaScriptType = "object";
            if (!(fieldDataValue instanceof Uint8Array)) {
              errorCode = 5;
            }
            break;
          case "bool":
            javaScriptType = "boolean";
            break;
          case "uint32":
            javaScriptType = "number";
            numOpts = {
              min: minUnsigned,
              max: maxFourBytesUnsigned,
              isInt: true,
              isItem
            };
            break;
          case "int32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            javaScriptType = "number";
            numOpts = {
              min: minFourBytes,
              max: maxFourBytes,
              isInt: true,
              isItem
            };
            break;
          case "uint64":
            javaScriptType = "number";
            numOpts = {
              min: minUnsigned,
              max: maxEightBytesUnsigned,
              isInt: true,
              isItem
            };
            break;
          case "fixed64":
          case "sfixed64":
          case "int64":
          case "sint64":
            javaScriptType = "number";
            numOpts = {
              min: minEightBytes,
              max: maxEightBytes,
              isInt: true,
              isItem
            };
            break;
          case "double":
          case "float":
            javaScriptType = "number";
            numOpts = {
              min: Number.NEGATIVE_INFINITY,
              max: Number.POSITIVE_INFINITY,
              isInt: false,
              isItem
            };
            break;
          default:
            if (new Set(Object.keys(descriptor)).has(protobufType)) {
              this._validateFields(errorInfos, fieldNames, fieldDataValue, descriptor[protobufType], descriptor, schemaId);
              javaScriptType = "object";
            }
            break;
        }
        if (typeof fieldDataValue !== javaScriptType) {
          errorInfos.push(new ValidationEntry(2, fieldNames, protobufType, typeof fieldDataValue));
        } else if (numOpts) {
          if (numOpts.isInt && !Number.isFinite(fieldDataValue)) {
            errorCode = 3;
          } else if (numOpts.isInt && !Number.isInteger(fieldDataValue)) {
            errorCode = 12;
          } else if (!(!numOpts.isInt && Number.isNaN(fieldDataValue)) && !(fieldDataValue >= numOpts.min && fieldDataValue <= numOpts.max)) {
            errorCode = 4;
          }
        }
      }
      if (errorCode) {
        errorInfos.push(new ValidationEntry(errorCode, fieldNames));
      }
    }
  }
  const logValidator = new LogValidator();
  class MetricsUtility {
    _getMetricTags(metric) {
      const tags = metric.getTags();
      if (tags) {
        return Object.entries(tags).map((entry) => {
          const mt = {
            name: entry[0],
            value: entry[1].toString()
          };
          return mt;
        });
      }
      return void 0;
    }
    getUpCounters(metrics, reset = true) {
      return metrics.map((metric) => {
        const data = {
          name: metric.getName(),
          createdTimestamp: metric.getCreatedOn(),
          lastUpdatedTimestamp: metric.getLastUpdatedOn(),
          value: metric.getData(),
          ownerName: metric.getOwnerName(),
          ownerAppName: metric.getOwnerAppName(),
          tags: this._getMetricTags(metric)
        };
        if (reset) {
          metric.reset();
        }
        return data;
      });
    }
    getValueRecorders(metrics, reset = true) {
      return metrics.map((metric) => {
        const data = {
          name: metric.getName(),
          createdTimestamp: metric.getCreatedOn(),
          lastUpdatedTimestamp: metric.getLastUpdatedOn(),
          values: metric.getData(),
          ownerName: metric.getOwnerName(),
          ownerAppName: metric.getOwnerAppName(),
          tags: this._getMetricTags(metric)
        };
        if (reset) {
          metric.reset();
        }
        return data;
      });
    }
    getBucketHistograms(metrics, reset = true) {
      return metrics.map((metric) => {
        const data = {
          name: metric.getName(),
          createdTimestamp: metric.getCreatedOn(),
          lastUpdatedTimestamp: metric.getLastUpdatedOn(),
          values: metric.getData(),
          buckets: metric.getBuckets(),
          ownerName: metric.getOwnerName(),
          ownerAppName: metric.getOwnerAppName(),
          tags: this._getMetricTags(metric)
        };
        if (reset) {
          metric.reset();
        }
        return data;
      });
    }
    getMetricsTags(array) {
      const obj = {};
      array.forEach((tag) => {
        obj[tag.name] = tag.value;
      });
      return obj;
    }
  }
  const metricsUtility = Object.freeze(new MetricsUtility());
  class PayloadUtility {
    checkInputs(schema, data) {
      schemaUtil.checkSchema(schema);
      utility.requireArgument(data, "data", "object");
      let vEntries;
      let savedUserPayload;
      if (data.userPayload !== void 0 && schemaUtil.isInternal(schema)) {
        savedUserPayload = data.userPayload;
        vEntries = logValidator.validate(savedUserPayload.schema, savedUserPayload.payload, true);
        this._processValidationResults(schemaUtil.getSchemaId(savedUserPayload.schema), savedUserPayload.payload, vEntries);
        data.userPayload = void 0;
      }
      vEntries = logValidator.validate(schema, data, true);
      this._processValidationResults(schemaUtil.getSchemaId(schema), data, vEntries);
      if (savedUserPayload !== void 0) {
        data.userPayload = savedUserPayload;
      }
    }
    getExtraFields(schema, data) {
      utility.requireArgument(data, "data", "object");
      const ignoredFields = [];
      const subPayload = data.userPayload;
      if (subPayload !== void 0 && schemaUtil.isInternal(schema)) {
        ignoredFields.push(...schemaUtil.getExtraFields(subPayload.schema, subPayload.payload));
      }
      ignoredFields.push(...schemaUtil.getExtraFields(schema, data));
      return ignoredFields;
    }
    getPayloadFromProvider(provider, args) {
      const payload = (provider === null || provider === void 0 ? void 0 : provider.getPayload(args)) || void 0;
      if (payload) {
        this.checkInputs(payload.schema, payload.payload);
      }
      return payload;
    }
    _processValidationResults(schemaId, data, ventries) {
      for (let i = 0; i < ventries.length; i += 1) {
        const ei = ventries[i];
        if (ei.errorCode == 6 || ei.errorCode == 7) {
          const lfi = ei.fields.length - 1;
          const obj = this._traverseFields(data, ei.fields.slice(0, lfi));
          const field = ei.fields[lfi];
          if (ei.errorCode == 6) {
            obj[field] = obj[field].substring(0, maxStringLengthAppLimit);
          } else {
            obj[field].splice(maxItemCountAppLimit);
          }
        } else {
          throw new Error(ei.asMessage(schemaId));
        }
      }
    }
    _traverseFields(data, fields) {
      if (!fields.length) {
        return data;
      }
      return this._traverseFields(data[fields[0]], fields.slice(1));
    }
  }
  const payloadUtility = Object.freeze(new PayloadUtility());
  const o11y = "o11y";
  class PublicSafety {
    constructor(_errorCounter) {
      this._errorCounter = _errorCounter;
      this._safeCatchMode = false;
    }
    _callCo11y(options, hasException) {
      if (hasException) {
        co11y.exception(options === null || options === void 0 ? void 0 : options.op, o11y);
      } else {
        co11y.success(options === null || options === void 0 ? void 0 : options.op, o11y);
      }
    }
    tryCatch(fn, options) {
      let ex;
      try {
        fn();
      } catch (err) {
        ex = true;
        this._prodSafeCatch(err);
      } finally {
        this._callCo11y(options, ex);
      }
    }
    tryCatchReturn(fn, noopValue, options) {
      let ex;
      try {
        utility.requireArgument(noopValue, "noopValue");
        return fn();
      } catch (err) {
        ex = true;
        this._prodSafeCatch(err);
        return noopValue;
      } finally {
        this._callCo11y(options, ex);
      }
    }
    _prodSafeCatch(error) {
      let allowThrow;
      try {
        allowThrow = !utility.isProduction;
        if (allowThrow) {
          throw error;
        }
        if (this._safeCatchMode) {
          this._safeCatchMode = false;
          throw new Error("Internal error in prodSafeCatch.");
        }
        this._safeCatchMode = true;
        if (this._errorCounter) {
          this._errorCounter.increment();
        }
        if (!(error instanceof Error)) {
          const errorText = error && error.message || (typeof error.toString === "function" ? error.toString() : "");
          error = new Error(errorText);
        }
        this._safeCatchMode = false;
      } catch (internalError) {
        if (allowThrow) {
          throw internalError;
        }
        if (internalError && console && typeof console.error === "function") {
          try {
            console.error(internalError);
          } catch (_a) {
          }
        }
        this._safeCatchMode = false;
      }
    }
  }
  exports.Co11yImpl = Co11yImpl;
  exports.LazyMapToList = LazyMapToList;
  exports.MetricsUtility = MetricsUtility;
  exports.PublicSafety = PublicSafety;
  exports.UpCounterImpl = UpCounterImpl;
  exports.ValidationEntry = ValidationEntry;
  exports.co11y = co11y;
  exports.logValidator = logValidator;
  exports.maxItemCountAppLimit = maxItemCountAppLimit;
  exports.maxStringLengthAppLimit = maxStringLengthAppLimit;
  exports.metricsUtility = metricsUtility;
  exports.payloadUtility = payloadUtility;
  exports.schemaUtil = schemaUtil;
  exports.utility = utility;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("o11y/shared", ["exports", "o11y/shared/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("o11y_schema/sf_instrumentation/v/252_76_0", ["exports"], function(exports) {
  "use strict";
  var activity = {namespace: "sf.instrumentation", name: "Activity", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {Activity: {reserved: [[5, 5], [7, 7]], fields: {stopReason: {id: 6, type: "string"}, isRoot: {id: 8, type: "bool"}, isSampled: {id: 11, type: "bool"}, preRootId: {id: 9, type: "string"}, parentId: {id: 13, type: "string"}, duration: {id: 3, type: "double"}, timerOverridden: {id: 12, type: "uint32"}, isRerooted: {id: 15, type: "bool"}, name: {
    options: {"(meta.max_length)": 25},
    id: 2,
    type: "string"
  }, traceIdSource: {id: 14, type: "string"}, id: {id: 1, type: "string"}, userPayload: {id: 4, type: "Payload"}, errorCount: {id: 10, type: "uint32"}}}, Payload: {fields: {payload: {id: 2, type: "bytes"}, schemaName: {id: 1, type: "string"}}}}}}}}}};
  var basic_page = {namespace: "sf.instrumentation", name: "BasicPage", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {BasicPage: {fields: {entityType: {id: 3, type: "string"}, entityId: {id: 2, type: "string"}, url: {id: 1, type: "string"}}}}}}}}}};
  var core_envelope = {namespace: "sf.instrumentation", name: "CoreEnvelope", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {MessageBundle: {fields: {messages: {rule: "repeated", id: 2, type: "LogMessage"}, schemaName: {id: 1, type: "string"}}}, Metrics: {fields: {globalMetricTags: {rule: "repeated", id: 4, type: "MetricTag"}, bucketHistograms: {rule: "repeated", id: 3, type: "BucketHistogram"}, valueRecorders: {rule: "repeated", id: 2, type: "ValueRecorder"}, upCounters: {
    rule: "repeated",
    id: 1,
    type: "UpCounter"
  }}}, CoreEnvelopeDiagnostics: {fields: {schemaVersion: {id: 6, type: "string"}, generatedTimestamp: {id: 2, type: "double"}, bundleCount: {id: 3, type: "uint32"}, upCounterCount: {id: 4, type: "uint32"}, valueRecorderCount: {id: 5, type: "uint32"}, key: {id: 1, type: "string"}, bucketHistogramCount: {id: 7, type: "uint32"}}}, LogMessage: {fields: {data: {id: 2, type: "bytes"}, rootId: {id: 4, type: "string"}, csId: {id: 12, type: "string"}, recCsId: {
    id: 13,
    type: "string"
  }, pagePayload: {id: 7, type: "Payload"}, connectionType: {id: 9, type: "string"}, appPayload: {id: 10, type: "Payload"}, loggerAppName: {id: 8, type: "string"}, sseq: {id: 11, type: "uint32"}, recRootId: {id: 14, type: "string"}, loggerName: {id: 6, type: "string"}, age: {id: 3, type: "double"}, seq: {id: 5, type: "uint32"}, timestamp: {id: 1, type: "double"}}}, CoreEnvelope: {fields: {diagnostics: {id: 1, type: "CoreEnvelopeDiagnostics"}, bundles: {
    rule: "repeated",
    id: 2,
    type: "MessageBundle"
  }, metrics: {id: 3, type: "Metrics"}, staticAttributes: {id: 4, type: "StaticAttributes"}}}, MetricTag: {fields: {name: {id: 1, type: "string"}, value: {id: 2, type: "string"}}}, BucketHistogram: {fields: {
    lastUpdatedTimestamp: {id: 3, type: "double"},
    ownerName: {id: 7, type: "string"},
    ownerAppName: {id: 8, type: "string"},
    createdTimestamp: {id: 2, type: "double"},
    values: {rule: "repeated", id: 4, type: "double"},
    buckets: {rule: "repeated", id: 5, type: "uint32"},
    name: {id: 1, type: "string"},
    tags: {rule: "repeated", id: 6, type: "MetricTag"}
  }}, ValueRecorder: {fields: {lastUpdatedTimestamp: {id: 3, type: "double"}, ownerName: {id: 6, type: "string"}, ownerAppName: {id: 7, type: "string"}, createdTimestamp: {id: 2, type: "double"}, values: {rule: "repeated", id: 4, type: "double"}, name: {id: 1, type: "string"}, tags: {rule: "repeated", id: 5, type: "MetricTag"}}}, StaticAttributes: {fields: {appVersion: {id: 2, type: "string"}, appName: {
    id: 1,
    type: "string"
  }, deviceModel: {id: 5, type: "string"}, sdkVersion: {id: 6, type: "string"}, deviceId: {id: 4, type: "string"}, appExperience: {id: 3, type: "string"}}}, Payload: {fields: {payload: {id: 2, type: "bytes"}, schemaName: {id: 1, type: "string"}}}, UpCounter: {fields: {lastUpdatedTimestamp: {id: 3, type: "double"}, ownerName: {id: 6, type: "string"}, ownerAppName: {id: 7, type: "string"}, createdTimestamp: {id: 2, type: "double"}, name: {id: 1, type: "string"}, value: {
    id: 4,
    type: "uint32"
  }, tags: {rule: "repeated", id: 5, type: "MetricTag"}}}}}}}}}};
  var error = {namespace: "sf.instrumentation", name: "Error", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {Error: {reserved: [[5, 5], [7, 7]], fields: {activityId: {id: 6, type: "string"}, stack: {id: 3, type: "string"}, name: {id: 1, type: "string"}, message: {options: {"(meta.max_length)": 200}, id: 2, type: "string"}, userPayload: {id: 4, type: "Payload"}}}, Payload: {fields: {payload: {id: 2, type: "bytes"}, schemaName: {id: 1, type: "string"}}}}}}}}}};
  var event = {namespace: "sf.instrumentation", name: "Event", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {Event: {fields: {type: {id: 1, type: "string"}}}}}}}}}};
  var idle_detector_report = {namespace: "sf.instrumentation", name: "IdleDetectorReport", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {IdleDetectorReport: {fields: {listenerCount: {id: 3, type: "uint32"}, busyTasks: {rule: "repeated", id: 5, type: "string"}, busyDurations: {rule: "repeated", id: 6, type: "double"}, pollableCount: {id: 4, type: "uint32"}, pollCounts: {rule: "repeated", id: 8, type: "double"}, logThreshold: {id: 2, type: "double"}, maxDuration: {
    id: 1,
    type: "double"
  }, pollables: {rule: "repeated", id: 7, type: "string"}}}}}}}}}};
  var instrumented_event = {namespace: "sf.instrumentation", name: "InstrumentedEvent", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {MouseEvent: {reserved: [[6, 6], [7, 7], [15, 15], [16, 16], [17, 17], [18, 18], [19, 19], [20, 20], [21, 21], [22, 22]], fields: {
    cancelable: {id: 5, type: "bool"},
    ctrlKey: {id: 9, type: "bool"},
    type: {id: 25, type: "string"},
    button: {id: 3, type: "uint32"},
    offsetX: {id: 30, type: "double"},
    eventPhase: {id: 12, type: "uint32"},
    shiftKey: {id: 23, type: "bool"},
    offsetY: {id: 31, type: "double"},
    composed: {id: 8, type: "bool"},
    altKey: {id: 1, type: "bool"},
    isTrusted: {id: 13, type: "bool"},
    buttons: {id: 4, type: "uint32"},
    movementY: {id: 29, type: "double"},
    clientY: {id: 27, type: "double"},
    clientX: {id: 26, type: "double"},
    movementX: {id: 28, type: "double"},
    defaultPrevented: {id: 10, type: "bool"},
    metaKey: {id: 14, type: "bool"},
    timeStamp: {id: 24, type: "double"},
    bubbles: {id: 2, type: "bool"},
    detail: {id: 11, type: "int64"},
    pageY: {id: 33, type: "double"},
    pageX: {id: 32, type: "double"},
    screenX: {id: 34, type: "double"},
    screenY: {id: 35, type: "double"}
  }}, Event: {fields: {type: {id: 1, type: "string"}}}, InstrumentedEvent: {oneofs: {event: {oneof: ["mouseEvent", "baseEvent"]}}, reserved: [[4, 4], "xpath", [6, 6], [8, 8]], fields: {
    mouseEvent: {id: 7, type: "MouseEvent"},
    auto: {id: 3, type: "bool"},
    parentComponent: {id: 2, type: "string"},
    baseEvent: {id: 10, type: "Event"},
    ownerComponent: {id: 1, type: "string"},
    userPayload: {id: 5, type: "Payload"},
    simplePath: {id: 9, type: "string"}
  }}, Payload: {fields: {payload: {id: 2, type: "bytes"}, schemaName: {id: 1, type: "string"}}}}}}}}}};
  var mouse_event = {namespace: "sf.instrumentation", name: "MouseEvent", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {MouseEvent: {reserved: [[6, 6], [7, 7], [15, 15], [16, 16], [17, 17], [18, 18], [19, 19], [20, 20], [21, 21], [22, 22]], fields: {
    cancelable: {id: 5, type: "bool"},
    ctrlKey: {id: 9, type: "bool"},
    type: {id: 25, type: "string"},
    button: {id: 3, type: "uint32"},
    offsetX: {id: 30, type: "double"},
    eventPhase: {id: 12, type: "uint32"},
    shiftKey: {id: 23, type: "bool"},
    offsetY: {id: 31, type: "double"},
    composed: {id: 8, type: "bool"},
    altKey: {id: 1, type: "bool"},
    isTrusted: {id: 13, type: "bool"},
    buttons: {id: 4, type: "uint32"},
    movementY: {id: 29, type: "double"},
    clientY: {id: 27, type: "double"},
    clientX: {id: 26, type: "double"},
    movementX: {id: 28, type: "double"},
    defaultPrevented: {id: 10, type: "bool"},
    metaKey: {id: 14, type: "bool"},
    timeStamp: {id: 24, type: "double"},
    bubbles: {id: 2, type: "bool"},
    detail: {id: 11, type: "int64"},
    pageY: {id: 33, type: "double"},
    pageX: {id: 32, type: "double"},
    screenX: {id: 34, type: "double"},
    screenY: {id: 35, type: "double"}
  }}}}}}}}};
  var network = {namespace: "sf.instrumentation", name: "Network", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {Network: {fields: {mtd: {id: 1, type: "string"}, url: {id: 2, type: "string"}}}}}}}}}};
  var payload = {namespace: "sf.instrumentation", name: "Payload", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {Payload: {fields: {payload: {id: 2, type: "bytes"}, schemaName: {id: 1, type: "string"}}}}}}}}}};
  var payload_diags = {namespace: "sf.instrumentation", name: "PayloadDiags", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {PayloadDiags: {fields: {extras: {rule: "repeated", id: 1, type: "string"}}}}}}}}}};
  var simple = {namespace: "sf.instrumentation", name: "Simple", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {Simple: {fields: {text: {options: {"(meta.max_length)": 25}, id: 1, type: "string"}}}}}}}}}};
  var web_vitals = {namespace: "sf.instrumentation", name: "WebVitals", pbjsSchema: {nested: {sf: {nested: {instrumentation: {nested: {WebVitals: {fields: {navType: {id: 5, type: "string"}, name: {id: 1, type: "string"}, delta: {id: 3, type: "double"}, id: {id: 4, type: "string"}, value: {id: 2, type: "double"}, wvVersion: {id: 6, type: "string"}}}}}}}}}};
  exports.activitySchema = activity;
  exports.basicPageSchema = basic_page;
  exports.coreEnvelopeSchema = core_envelope;
  exports.errorSchema = error;
  exports.eventSchema = event;
  exports.idleDetectorReportSchema = idle_detector_report;
  exports.instrumentedEventSchema = instrumented_event;
  exports.mouseEventSchema = mouse_event;
  exports.networkSchema = network;
  exports.payloadDiagsSchema = payload_diags;
  exports.payloadSchema = payload;
  exports.simpleSchema = simple;
  exports.webVitalsSchema = web_vitals;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("o11y_schema/sf_instrumentation", ["exports", "o11y_schema/sf_instrumentation/v/252_76_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("o11y/client/v/1", ["exports", "o11y_schema/sf_instrumentation/v/252_76_0", "o11y/shared/v/1"], function(exports, _252_76_0, _1) {
  "use strict";
  class TaskerImpl {
    get isBusy() {
      return this._isOk ? this._busyCount > 0 : void 0;
    }
    constructor(name, initialCount, _doneCallback, _overDoneCallback) {
      this.name = name;
      this._doneCallback = _doneCallback;
      this._overDoneCallback = _overDoneCallback;
      this._busyCount = 0;
      this._isOk = true;
      this._busyCount = initialCount;
    }
    add() {
      if (this._isOk) {
        this._busyCount += 1;
      }
    }
    done() {
      if (this._isOk) {
        if (this._busyCount > 0) {
          this._busyCount -= 1;
          if (!this._busyCount) {
            this._doneCallback();
          }
        } else {
          this._isOk = false;
          this._overDoneCallback();
        }
      }
    }
  }
  const defaultLogThreshold = 300;
  class IdleDetectorImpl {
    constructor(options) {
      this._taskers = new Map();
      this._listeners = new Set();
      this._busyCheckers = new Map();
      this._logThreshold = defaultLogThreshold;
      this._endedTasks = new Array();
      this._pollableReport = new Array();
      if (_1.utility.requireArgumentIfDefined(options === null || options === void 0 ? void 0 : options.logThreshold, "options.logThreshold", "number")) {
        this._logThreshold = options.logThreshold;
      }
      if (_1.utility.requireArgumentIfDefined(options === null || options === void 0 ? void 0 : options.reportListener, "options.reportListener", "function")) {
        this._reportListener = options.reportListener;
      }
      if (_1.utility.requireArgumentIfDefined(options === null || options === void 0 ? void 0 : options.errorListener, "options.errorListener", "function")) {
        this._errorListener = options.errorListener;
      }
    }
    requestIdleDetectedCallback(callback) {
      _1.utility.requireArgument(callback, "callback", "function");
      if (this._listeners.size === 0) {
        this._firstCallbackTime = _1.utility.time().perfNow;
      }
      this._listeners.add(callback);
      this._checkIfLoaded();
    }
    _reportTaskEnded(tasker) {
      if (this._listeners.size) {
        const snapshot = Object.assign({}, this._taskers.get(tasker));
        this._endedTasks.push(snapshot);
      }
    }
    declareNotifierTaskSingle(name) {
      _1.utility.requireArgument(name, "name", "string");
      const tasker = this._addTasker(name, 1);
      const retVal = {
        get isBusy() {
          return tasker.isBusy;
        },
        done: () => {
          tasker.done();
          this._taskers.delete(tasker);
        }
      };
      return retVal;
    }
    declareNotifierTaskMulti(name, existingBusyCount = 0) {
      _1.utility.requireArgument(name, "name", "string");
      if (existingBusyCount !== void 0) {
        _1.utility.requireArgument(existingBusyCount, "existingBusyCount", "number");
        if (!Number.isInteger(existingBusyCount) || existingBusyCount < 0) {
          throw new Error("existingBusyCount accepts only non-negative integers");
        }
      }
      const tasker = this._addTasker(name, existingBusyCount);
      const retVal = {
        get isBusy() {
          return tasker.isBusy;
        },
        add: () => {
          if (!tasker.isBusy) {
            const meta = this._taskers.get(tasker);
            meta.start = _1.utility.time().perfNow;
            meta.end = void 0;
          }
          tasker.add();
        },
        done: tasker.done.bind(tasker)
      };
      return retVal;
    }
    declarePollableTaskMulti(name, isBusyChecker) {
      _1.utility.requireArgument(name, "name", "string");
      _1.utility.requireArgument(isBusyChecker, "isBusyChecker", "function");
      this._busyCheckers.set(isBusyChecker, name);
    }
    _addTasker(name, existingBusyCount) {
      const tasker = new TaskerImpl(name, existingBusyCount, () => {
        this._taskers.get(tasker).end = _1.utility.time().perfNow;
        this._reportTaskEnded(tasker);
        this._checkIfLoaded();
      }, () => {
        var _a;
        (_a = this._errorListener) === null || _a === void 0 ? void 0 : _a.call(this, `Overdone: ${tasker.name}`);
        _1.utility.noProdThrow(`Tasker '${tasker.name}' is done too many times.`);
      });
      this._taskers.set(tasker, {
        name,
        start: existingBusyCount > 0 ? _1.utility.time().perfNow : void 0,
        end: void 0
      });
      return tasker;
    }
    _areAllNotifiersIdle() {
      return !Array.from(this._taskers.keys()).some((t) => t.isBusy);
    }
    _getFirstBusyPollable() {
      const entry = Array.from(this._busyCheckers).find((entry2) => {
        var _a;
        const isBusyChecker = entry2[0];
        const name = entry2[1];
        try {
          return isBusyChecker();
        } catch (e) {
          (_a = this._errorListener) === null || _a === void 0 ? void 0 : _a.call(this, e, `BusyChecker ${name}`);
          _1.utility.noProdThrow(e);
          return false;
        }
      });
      return entry ? entry[1] : void 0;
    }
    _checkIfLoaded() {
      if (!this._listeners.size) {
        return;
      }
      if (this._timerCheckQueued) {
        clearTimeout(this._timerCheckQueued);
      }
      if (this._areAllNotifiersIdle()) {
        this._timerCheckQueued = setTimeout(() => {
          this._timerCheckQueued = setTimeout(() => {
            this._doubleCheck();
          }, 40);
        }, 0);
      }
    }
    _doubleCheck() {
      this._timerCheckQueued = void 0;
      if (this._areAllNotifiersIdle()) {
        const pollableName = this._getFirstBusyPollable();
        if (pollableName !== void 0) {
          this._addToPollableReport(pollableName);
          this._timerCheckQueued = setTimeout(() => {
            this._doubleCheck();
          }, 15);
        } else {
          const maxDuration = _1.utility.time().perfNow - this._firstCallbackTime;
          const listeners = Array.from(this._listeners.values());
          this._listeners.clear();
          this._firstCallbackTime = void 0;
          const endedTasks = this._endedTasks.splice(0);
          const pollableReport = this._pollableReport.splice(0);
          this._notify(listeners, maxDuration, endedTasks, pollableReport);
        }
      }
    }
    _addToPollableReport(name) {
      const lastEntry = this._pollableReport.length ? this._pollableReport[this._pollableReport.length - 1] : void 0;
      if ((lastEntry === null || lastEntry === void 0 ? void 0 : lastEntry.name) === name) {
        lastEntry.count += 1;
      } else {
        this._pollableReport.push({
          name,
          count: 1
        });
      }
    }
    _notify(listeners, maxDuration, taskReport, pollableReport) {
      var _a;
      if (maxDuration >= this._logThreshold && this._reportListener) {
        const logData = this._getReport(maxDuration, listeners.length, taskReport, pollableReport);
        this._reportListener(logData);
      }
      listeners.reverse();
      const tsNow = _1.utility.time().tsNow;
      for (const [index2, listener] of listeners.entries()) {
        try {
          listener(tsNow);
        } catch (e) {
          (_a = this._errorListener) === null || _a === void 0 ? void 0 : _a.call(this, e, `Listener #${listeners.length - 1 - index2}`);
          _1.utility.noProdThrow(e);
        }
      }
    }
    getReport() {
      const perfNow = _1.utility.time().perfNow;
      const maxDuration = this._firstCallbackTime > 0 ? perfNow - this._firstCallbackTime : void 0;
      const onGoingTasks = Array.from(this._taskers.entries()).filter((e) => e[0].isBusy).map((e) => ({
        name: e[1].name,
        start: e[1].start,
        end: perfNow
      }));
      return this._getReport(maxDuration, this._listeners.size, this._endedTasks.concat(onGoingTasks), this._pollableReport);
    }
    _getReport(maxDuration, listenerCount, taskReport, pollableReport) {
      const sortedTaskers = taskReport.map((t) => ({
        name: t.name,
        duration: t.end - t.start
      })).sort((a, b) => b.duration - a.duration);
      return {
        logThreshold: this._logThreshold,
        maxDuration,
        listenerCount,
        pollableCount: this._busyCheckers.size,
        busyTasks: sortedTaskers.map((t) => t.name),
        busyDurations: sortedTaskers.map((t) => t.duration),
        pollables: pollableReport.map((p) => p.name),
        pollCounts: pollableReport.map((p) => p.count)
      };
    }
  }
  const navigation_timing = {
    namespace: "sfcore.performance",
    name: "NavigationTiming",
    pbjsSchema: {
      nested: {
        sfcore: {
          nested: {
            performance: {
              nested: {
                NavigationTiming: {
                  oneofs: {
                    _xhrDelay: {
                      oneof: ["xhrDelay"]
                    },
                    _renderBlockingStatus: {
                      oneof: ["renderBlockingStatus"]
                    },
                    _firstInterimResponseStart: {
                      oneof: ["firstInterimResponseStart"]
                    },
                    _srvDuration: {
                      oneof: ["srvDuration"]
                    },
                    _isCdnCached: {
                      oneof: ["isCdnCached"]
                    },
                    _dbDuration: {
                      oneof: ["dbDuration"]
                    },
                    _reqBatchCount: {
                      oneof: ["reqBatchCount"]
                    }
                  },
                  fields: {
                    redirectCount: {
                      id: 37,
                      type: "uint32"
                    },
                    encodedBodySize: {
                      id: 21,
                      type: "uint32"
                    },
                    reqActionNames: {
                      rule: "repeated",
                      id: 28,
                      type: "string"
                    },
                    unloadEventEnd: {
                      id: 40,
                      type: "double"
                    },
                    responseEnd: {
                      id: 19,
                      type: "double"
                    },
                    domainLookupEnd: {
                      id: 12,
                      type: "double"
                    },
                    unloadEventStart: {
                      id: 39,
                      type: "double"
                    },
                    domContentLoadedEventStart: {
                      id: 32,
                      type: "double"
                    },
                    type: {
                      id: 38,
                      type: "string"
                    },
                    firstInterimResponseStart: {
                      options: {
                        proto3_optional: true
                      },
                      id: 18,
                      type: "double"
                    },
                    duration: {
                      id: 3,
                      type: "double"
                    },
                    decodedBodySize: {
                      id: 22,
                      type: "uint32"
                    },
                    redirectStart: {
                      id: 8,
                      type: "double"
                    },
                    connectEnd: {
                      id: 15,
                      type: "double"
                    },
                    isCdnCached: {
                      options: {
                        proto3_optional: true
                      },
                      id: 24,
                      type: "bool"
                    },
                    requestStart: {
                      id: 16,
                      type: "double"
                    },
                    startTime: {
                      id: 2,
                      type: "double"
                    },
                    fetchStart: {
                      id: 10,
                      type: "double"
                    },
                    domContentLoadedEventEnd: {
                      id: 33,
                      type: "double"
                    },
                    srvReqId: {
                      id: 29,
                      type: "string"
                    },
                    reqBatchCount: {
                      options: {
                        proto3_optional: true
                      },
                      id: 27,
                      type: "uint32"
                    },
                    renderBlockingStatus: {
                      options: {
                        proto3_optional: true
                      },
                      id: 6,
                      type: "string"
                    },
                    workerStart: {
                      id: 7,
                      type: "double"
                    },
                    responseStart: {
                      id: 17,
                      type: "double"
                    },
                    xhrDelay: {
                      options: {
                        proto3_optional: true
                      },
                      id: 30,
                      type: "double"
                    },
                    domInteractive: {
                      id: 34,
                      type: "double"
                    },
                    domComplete: {
                      id: 31,
                      type: "double"
                    },
                    domainLookupStart: {
                      id: 11,
                      type: "double"
                    },
                    responseStatus: {
                      id: 23,
                      type: "uint32"
                    },
                    redirectEnd: {
                      id: 9,
                      type: "double"
                    },
                    transferSize: {
                      id: 20,
                      type: "uint32"
                    },
                    srvDuration: {
                      options: {
                        proto3_optional: true
                      },
                      id: 26,
                      type: "double"
                    },
                    dbDuration: {
                      options: {
                        proto3_optional: true
                      },
                      id: 25,
                      type: "double"
                    },
                    connectStart: {
                      id: 13,
                      type: "double"
                    },
                    loadEventStart: {
                      id: 35,
                      type: "double"
                    },
                    secureConnectionStart: {
                      id: 14,
                      type: "double"
                    },
                    name: {
                      id: 1,
                      type: "string"
                    },
                    nextHopProtocol: {
                      id: 5,
                      type: "string"
                    },
                    initiatorType: {
                      id: 4,
                      type: "string"
                    },
                    loadEventEnd: {
                      id: 36,
                      type: "double"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const resource_timing = {
    namespace: "sfcore.performance",
    name: "ResourceTiming",
    pbjsSchema: {
      nested: {
        sfcore: {
          nested: {
            performance: {
              nested: {
                ResourceTiming: {
                  oneofs: {
                    _xhrDelay: {
                      oneof: ["xhrDelay"]
                    },
                    _renderBlockingStatus: {
                      oneof: ["renderBlockingStatus"]
                    },
                    _firstInterimResponseStart: {
                      oneof: ["firstInterimResponseStart"]
                    },
                    _srvDuration: {
                      oneof: ["srvDuration"]
                    },
                    _isCdnCached: {
                      oneof: ["isCdnCached"]
                    },
                    _dbDuration: {
                      oneof: ["dbDuration"]
                    },
                    _reqBatchCount: {
                      oneof: ["reqBatchCount"]
                    }
                  },
                  fields: {
                    encodedBodySize: {
                      id: 21,
                      type: "uint32"
                    },
                    reqActionNames: {
                      rule: "repeated",
                      id: 28,
                      type: "string"
                    },
                    responseEnd: {
                      id: 19,
                      type: "double"
                    },
                    domainLookupEnd: {
                      id: 12,
                      type: "double"
                    },
                    firstInterimResponseStart: {
                      options: {
                        proto3_optional: true
                      },
                      id: 18,
                      type: "double"
                    },
                    duration: {
                      id: 3,
                      type: "double"
                    },
                    decodedBodySize: {
                      id: 22,
                      type: "uint32"
                    },
                    redirectStart: {
                      id: 8,
                      type: "double"
                    },
                    connectEnd: {
                      id: 15,
                      type: "double"
                    },
                    isCdnCached: {
                      options: {
                        proto3_optional: true
                      },
                      id: 24,
                      type: "bool"
                    },
                    requestStart: {
                      id: 16,
                      type: "double"
                    },
                    startTime: {
                      id: 2,
                      type: "double"
                    },
                    fetchStart: {
                      id: 10,
                      type: "double"
                    },
                    srvReqId: {
                      id: 29,
                      type: "string"
                    },
                    reqBatchCount: {
                      options: {
                        proto3_optional: true
                      },
                      id: 27,
                      type: "uint32"
                    },
                    renderBlockingStatus: {
                      options: {
                        proto3_optional: true
                      },
                      id: 6,
                      type: "string"
                    },
                    workerStart: {
                      id: 7,
                      type: "double"
                    },
                    responseStart: {
                      id: 17,
                      type: "double"
                    },
                    xhrDelay: {
                      options: {
                        proto3_optional: true
                      },
                      id: 30,
                      type: "double"
                    },
                    domainLookupStart: {
                      id: 11,
                      type: "double"
                    },
                    responseStatus: {
                      id: 23,
                      type: "uint32"
                    },
                    redirectEnd: {
                      id: 9,
                      type: "double"
                    },
                    transferSize: {
                      id: 20,
                      type: "uint32"
                    },
                    srvDuration: {
                      options: {
                        proto3_optional: true
                      },
                      id: 26,
                      type: "double"
                    },
                    dbDuration: {
                      options: {
                        proto3_optional: true
                      },
                      id: 25,
                      type: "double"
                    },
                    connectStart: {
                      id: 13,
                      type: "double"
                    },
                    secureConnectionStart: {
                      id: 14,
                      type: "double"
                    },
                    name: {
                      id: 1,
                      type: "string"
                    },
                    nextHopProtocol: {
                      id: 5,
                      type: "string"
                    },
                    initiatorType: {
                      id: 4,
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  class FuzzyMapper {
    constructor(_fuzzyKeyRange) {
      this._fuzzyKeyRange = _fuzzyKeyRange;
      this._map = new Map();
      _1.utility.requireArgument(_fuzzyKeyRange, "_fuzzyKeyRange", "number");
    }
    add(key, fuzzyKey, value) {
      const mapValue = this._map.get(key);
      if (mapValue) {
        mapValue.push({
          fuzzyKey,
          value
        });
      } else {
        this._map.set(key, [{
          fuzzyKey,
          value
        }]);
      }
    }
    pop(key, fuzzyKey) {
      const mapValues = this._map.get(key);
      if ((mapValues === null || mapValues === void 0 ? void 0 : mapValues.length) >= 1) {
        let minDelta = Number.POSITIVE_INFINITY;
        let minIndex = -1;
        for (let index2 = 0; index2 < mapValues.length; index2++) {
          const {
            fuzzyKey: curFuzzyKey
          } = mapValues[index2];
          const curDelta = Math.abs(curFuzzyKey - fuzzyKey);
          if (curDelta <= this._fuzzyKeyRange && curDelta < minDelta) {
            minDelta = curDelta;
            minIndex = index2;
          }
        }
        if (minIndex >= 0) {
          const {
            value
          } = mapValues.splice(minIndex, 1)[0];
          if (mapValues.length === 0) {
            this._map.delete(key);
          }
          return value;
        }
      }
      return void 0;
    }
    clear() {
      this._map.clear();
    }
  }
  const basicInitiatorTypes = ["fetch", "xmlhttprequest"];
  class PerformanceObservability {
    constructor(_instr, fuzzyMapRange, _skipUrls, _logPerformanceActivityName, logLevel) {
      this._instr = _instr;
      this._skipUrls = _skipUrls;
      this._logPerformanceActivityName = _logPerformanceActivityName;
      this._isStarted = false;
      _1.utility.requireArgument(_instr, "_instr", "object");
      _1.utility.requireArgument(fuzzyMapRange, "fuzzyMapRange", "number");
      _1.utility.requireArgumentIfDefined(_skipUrls, "_skipUrls", Array);
      _1.utility.requireArgumentIfDefined(_logPerformanceActivityName, "_logPerformanceActivityName", "string");
      _1.utility.requireArgumentIfDefined(logLevel, "logLevel", "string");
      this._hasPerf = typeof performance !== "undefined" && typeof PerformanceObserver === "function";
      this._boundObserverCallback = this._logPerformanceEntries.bind(this);
      if (!logLevel || logLevel.toLowerCase() === "full") {
        this._logLevel = 1;
      } else if ((logLevel === null || logLevel === void 0 ? void 0 : logLevel.toLowerCase()) === "basic") {
        this._logLevel = 0;
      } else {
        throw new Error(`Invalid log level: ${logLevel}`);
      }
      this._fuzzyMapper = new FuzzyMapper(fuzzyMapRange);
    }
    get isStarted() {
      return this._isStarted;
    }
    get logLevel() {
      return this._logLevel;
    }
    start() {
      if (!this._hasPerf) {
        return;
      }
      if (!this._isStarted) {
        this._isStarted = true;
        this._navigationObserver = new PerformanceObserver(this._boundObserverCallback);
        this._navigationObserver.observe({
          type: "navigation",
          buffered: true
        });
        this._resourceObserver = new PerformanceObserver(this._boundObserverCallback);
        this._resourceObserver.observe({
          type: "resource",
          buffered: true
        });
      }
    }
    stop() {
      if (this._resourceObserver) {
        this._resourceObserver.disconnect();
        this._resourceObserver = void 0;
      }
      if (this._navigationObserver) {
        this._navigationObserver.disconnect();
        this._navigationObserver = void 0;
      }
      this._fuzzyMapper.clear();
      this._isStarted = false;
    }
    addEntry(absoluteUrl, perfTime, data) {
      this._fuzzyMapper.add(absoluteUrl, perfTime, data);
    }
    _resourceEntryToResourceTiming(prt) {
      var _a, _b;
      const rt = {
        name: prt.name,
        startTime: prt.startTime,
        duration: prt.duration,
        initiatorType: prt.initiatorType,
        nextHopProtocol: prt.nextHopProtocol,
        renderBlockingStatus: prt.renderBlockingStatus,
        workerStart: prt.workerStart,
        redirectStart: prt.redirectStart,
        redirectEnd: prt.redirectEnd,
        fetchStart: prt.fetchStart,
        domainLookupStart: prt.domainLookupStart,
        domainLookupEnd: prt.domainLookupEnd,
        connectStart: prt.connectStart,
        secureConnectionStart: prt.secureConnectionStart,
        connectEnd: prt.connectEnd,
        requestStart: prt.requestStart,
        responseStart: prt.responseStart,
        firstInterimResponseStart: prt.firstInterimResponseStart,
        responseEnd: prt.responseEnd,
        transferSize: prt.transferSize,
        encodedBodySize: prt.encodedBodySize,
        decodedBodySize: prt.decodedBodySize,
        responseStatus: prt.responseStatus
      };
      const sts = prt.serverTiming;
      if (Array.isArray(sts)) {
        rt.dbDuration = (_a = sts.find((st) => st.name === "db")) === null || _a === void 0 ? void 0 : _a.duration;
        rt.srvDuration = (_b = sts.find((st) => st.name === "Total")) === null || _b === void 0 ? void 0 : _b.duration;
      }
      return rt;
    }
    _shouldInclude(entry) {
      var _a;
      const isFiltered = (_a = this._skipUrls) === null || _a === void 0 ? void 0 : _a.some((skipUrl) => {
        if (skipUrl instanceof RegExp) {
          return skipUrl.test(entry.name);
        } else {
          return entry.name === skipUrl;
        }
      });
      if (isFiltered) {
        return false;
      }
      if (this._logLevel === 1) {
        return true;
      }
      return basicInitiatorTypes.indexOf(entry.initiatorType) >= 0 || entry.entryType === "navigation";
    }
    _logActivity(schema, payload, activityId, errorCount) {
      const startOptions = {
        id: activityId
      };
      const stopOptions = {
        perfStartOverride: payload.startTime,
        perfStopOverride: payload.startTime + payload.duration,
        errorCount
      };
      this._instr.startActivity(this._logPerformanceActivityName, startOptions).stop(schema, payload, stopOptions);
    }
    _logPerformanceEntries(list) {
      for (const entry of list.getEntriesByType("navigation")) {
        const nt = entry;
        if (this._shouldInclude(nt)) {
          if (nt !== this._navTiming) {
            this._navTiming = nt;
            const payload = this._resourceEntryToResourceTiming(nt);
            const navOnly = {
              domComplete: nt.domComplete,
              domContentLoadedEventStart: nt.domContentLoadedEventStart,
              domContentLoadedEventEnd: nt.domContentLoadedEventEnd,
              domInteractive: nt.domInteractive,
              loadEventStart: nt.loadEventStart,
              loadEventEnd: nt.loadEventEnd,
              redirectCount: nt.redirectCount,
              type: nt.type,
              unloadEventStart: nt.unloadEventStart,
              unloadEventEnd: nt.unloadEventEnd
            };
            this._logActivity(navigation_timing, Object.assign(payload, navOnly));
          }
          break;
        }
      }
      for (const entry of list.getEntriesByType("resource")) {
        const rt = entry;
        const requestInfo = this._fuzzyMapper.pop(rt.name, rt.startTime);
        if (this._shouldInclude(rt)) {
          const payload = this._resourceEntryToResourceTiming(rt);
          Object.assign(payload, {
            srvReqId: requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.requestId,
            xhrDelay: requestInfo ? requestInfo.activityDuration - rt.duration : void 0
          });
          this._logActivity(resource_timing, payload, requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.activityId, requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.errorCount);
        }
      }
    }
  }
  const defaultTraceIdLengthW3 = 32;
  const defaultTraceIdLengthB3 = 16;
  const defaultSpanIdLength = 16;
  const headerTraceParent = "traceparent";
  const headerB3 = "b3";
  const headerTraceId = "X-B3-TraceId";
  const headerSpanId = "X-B3-SpanId";
  const headerSampled = "X-B3-Sampled";
  const headerParentSpanId = "X-B3-ParentSpanId";
  const headerRequestId = "X-SFDC-Request-Id";
  const defaultActivityNameForFetch = "fetch";
  const defaultActivityNameForXhrSend = "xhr_send";
  const defaultTimingActivityName = "perf-timing";
  const defaultFuzzyMapRange = 50;
  class Tracing {
    constructor(_instr, _idleDetector) {
      this._instr = _instr;
      this._idleDetector = _idleDetector;
      _1.utility.requireArgument(_instr, "_instr", "object");
      _1.utility.requireArgument(_idleDetector, "_idleDetector", "object");
    }
    static _getB3CompactFormat(traceId, spanId, isSampled, parentSpanId) {
      let b3 = `${traceId}-${spanId}`;
      if (isSampled !== void 0 || parentSpanId !== void 0) {
        b3 += isSampled ? "-1" : "-0";
        if (parentSpanId !== void 0) {
          b3 += `-${parentSpanId}`;
        }
      }
      return b3;
    }
    static _getW3CompactFormat(traceId, spanId, isSampled) {
      return `00-${traceId}-${spanId}-${isSampled ? "01" : "00"}`;
    }
    static _conformTextAsId(text, numChars) {
      text = text.toLowerCase();
      const len = text.length;
      for (let i = 0; i < len; i += 1) {
        const c = text[i];
        if (!(c >= "a" && c <= "f") && !(c >= "0" && c <= "9")) {
          throw new Error(`The text '${text}' has an invalid character at index #${i}`);
        }
      }
      if (len > numChars) {
        return text.substr(len - numChars);
      }
      if (len < numChars) {
        return text.padStart(numChars, "0");
      }
      return text;
    }
    static getHeaders(traceId, spanId, isSampled, options) {
      _1.utility.requireArgument(traceId, "traceId", "string");
      _1.utility.requireArgument(spanId, "spanId", "string");
      const useB3Headers = options === null || options === void 0 ? void 0 : options.useB3Headers;
      traceId = this._conformTextAsId(traceId, (options === null || options === void 0 ? void 0 : options.traceIdEffectiveLength) !== void 0 ? options.traceIdEffectiveLength : useB3Headers ? defaultTraceIdLengthB3 : defaultTraceIdLengthW3);
      spanId = this._conformTextAsId(spanId, defaultSpanIdLength);
      const parentSpanId = options && options.parentSpanId !== void 0 && this._conformTextAsId(options.parentSpanId, defaultSpanIdLength) || void 0;
      const headers = {};
      if (useB3Headers) {
        const isCompact = options === null || options === void 0 ? void 0 : options.useCompactHeader;
        if (isCompact) {
          headers[headerB3] = this._getB3CompactFormat(traceId, spanId, isSampled, parentSpanId);
        } else {
          headers[headerTraceId] = traceId;
          headers[headerSpanId] = spanId;
          if (parentSpanId !== void 0) {
            headers[headerParentSpanId] = parentSpanId;
          }
          if (isSampled !== void 0) {
            headers[headerSampled] = isSampled ? "1" : "0";
          }
        }
      } else {
        headers[headerTraceParent] = this._getW3CompactFormat(traceId, spanId, isSampled);
      }
      return headers;
    }
    _disableNetworkInstrumentation() {
      if (Tracing._isNetworkInstrumentationEnabled) {
        if (Tracing._originalFetch) {
          Tracing._global.fetch = Tracing._originalFetch;
          Tracing._originalFetch = void 0;
        }
        if (Tracing._originalXhr) {
          Tracing._global.XMLHttpRequest = Tracing._originalXhr;
          Tracing._originalXhr = void 0;
        }
        if (Tracing._originalXhrOpen) {
          Tracing._global.XMLHttpRequest.prototype.open = Tracing._originalXhrOpen;
          Tracing._originalXhrOpen = void 0;
        }
        if (Tracing._originalXhrSetRequestHeader) {
          Tracing._global.XMLHttpRequest.prototype.setRequestHeader = Tracing._originalXhrSetRequestHeader;
          Tracing._originalXhrSetRequestHeader = void 0;
        }
        if (Tracing._originalXhrSend) {
          Tracing._global.XMLHttpRequest.prototype.send = Tracing._originalXhrSend;
          Tracing._originalXhrSend = void 0;
        }
        if (Tracing._performanceObservability) {
          Tracing._performanceObservability.stop();
          Tracing._performanceObservability = void 0;
        }
        Tracing._isNetworkInstrumentationEnabled = false;
      }
    }
    _enableNetworkInstrumentation(instr, logErrors, activityName, useTracing, options, tasker, logPerformance, logPerformanceActivityName, skipUrls, fuzzyMapRange) {
      if (typeof Tracing._global.fetch === "function") {
        this._overrideFetch(instr, logErrors, activityName, useTracing, options, tasker, skipUrls);
        Tracing._isNetworkInstrumentationEnabled = true;
      }
      if (typeof Tracing._global.XMLHttpRequest === "function") {
        this._overrideXhr(instr, logErrors, activityName, useTracing, options, tasker, skipUrls);
        Tracing._isNetworkInstrumentationEnabled = true;
      }
      if (logPerformance) {
        Tracing._performanceObservability = new PerformanceObservability(instr, fuzzyMapRange, skipUrls, logPerformanceActivityName, logPerformance === true ? "full" : logPerformance);
        Tracing._performanceObservability.start();
        Tracing._isNetworkInstrumentationEnabled = true;
      }
    }
    static _getTraceHeaders(activity, tracingInstr, options, method, url) {
      let traceHeaders;
      if (activity) {
        traceHeaders = activity.getTraceHeaders(options) || {};
      } else {
        const context = tracingInstr.internalInstrumentationContext;
        if (context === null || context === void 0 ? void 0 : context.rootId) {
          traceHeaders = Tracing.getHeaders(context.rootId, _1.utility.generateUniqueId(), context.isRootActivitySampled, options);
        } else {
          traceHeaders = {};
        }
      }
      if (typeof (options === null || options === void 0 ? void 0 : options.headerProcessor) === "function") {
        traceHeaders = options.headerProcessor({
          method,
          url,
          defaultHeaders: traceHeaders
        });
      } else if (typeof window === "object") {
        let newUrl;
        try {
          newUrl = new URL(url);
        } catch (_a) {
        }
        if (newUrl && newUrl.host !== window.location.host) {
          traceHeaders = void 0;
        }
      }
      return traceHeaders || {};
    }
    static _extractHeader(headerName, input, init) {
      if ((init === null || init === void 0 ? void 0 : init.headers) instanceof Headers) {
        return init.headers.get(headerName);
      }
      if (Array.isArray(init === null || init === void 0 ? void 0 : init.headers)) {
        const header = init.headers.find((entry) => entry[0] === headerName);
        return header === null || header === void 0 ? void 0 : header[1];
      }
      if (typeof (init === null || init === void 0 ? void 0 : init.headers) === "object") {
        return init.headers[headerName];
      }
      if (input instanceof Request) {
        return input.headers.get(headerName);
      }
      return void 0;
    }
    _overrideFetch(instr, logErrors, activityName, useTracing, tracingHeadersOptions, tasker, skipUrls) {
      Tracing._originalFetch = Tracing._global.fetch;
      const o11yFetch = async (resource, options, ...restArgs) => {
        var _a;
        let activity;
        let url;
        let absoluteUrl;
        let method;
        let fetchTime;
        let suspendInstrumentation = false;
        try {
          tasker === null || tasker === void 0 ? void 0 : tasker.add();
          method = options === null || options === void 0 ? void 0 : options.method;
          const ofo = options === null || options === void 0 ? void 0 : options.o11y;
          const isSkipInstrSet = ofo === null || ofo === void 0 ? void 0 : ofo.skipInstr;
          suspendInstrumentation = isSkipInstrSet || Tracing._shouldSkipUrl(skipUrls, resource);
          if (!suspendInstrumentation) {
            activity = instr.startActivity(activityName || defaultActivityNameForFetch);
          } else if (isSkipInstrSet) {
            Tracing._reqIndex += 1;
            try {
              if (resource instanceof URL) {
                resource.searchParams.append("o11y", Tracing._reqIndex.toString());
              } else if (typeof resource === "string") {
                const urlObj = new URL(resource);
                const kv = `o11y=${Tracing._reqIndex}`;
                urlObj.search += urlObj.search.startsWith("?") ? `&${kv}` : kv;
                resource = urlObj.toString();
              }
            } catch (_b) {
            }
          }
          options === null || options === void 0 ? true : delete options.o11y;
          url = resource === null || resource === void 0 ? void 0 : resource.toString();
          absoluteUrl = _1.utility.tryGetAbsoluteUrl(url);
          if (useTracing) {
            if (resource instanceof Request) {
              if (!method) {
                method = resource.method;
              }
              url = resource.url;
              absoluteUrl = _1.utility.tryGetAbsoluteUrl(url);
            }
            const traceHeaders = Tracing._getTraceHeaders(activity, instr, tracingHeadersOptions, method, absoluteUrl);
            if (!this._applyTraceHeaders(resource, options, traceHeaders) && options === void 0) {
              options = {
                headers: traceHeaders
              };
            }
          }
          fetchTime = _1.utility.perfNow();
          return await Tracing._originalFetch.call(Tracing._global, resource, options, ...restArgs);
        } catch (ex) {
          if (logErrors && !suspendInstrumentation) {
            if (activity) {
              activity.error(ex);
            } else {
              instr.error(ex);
            }
          }
          throw ex;
        } finally {
          try {
            const activityDuration = Tracing._endActivity(activity, url, method);
            if ((_a = Tracing._performanceObservability) === null || _a === void 0 ? void 0 : _a.isStarted) {
              const requestId = Tracing._extractHeader(headerRequestId, resource, options);
              Tracing._performanceObservability.addEntry(absoluteUrl, fetchTime, {
                requestId,
                activityDuration,
                activityId: activity === null || activity === void 0 ? void 0 : activity.getId(),
                errorCount: activity === null || activity === void 0 ? void 0 : activity.getErrorCount()
              });
            }
          } finally {
            tasker === null || tasker === void 0 ? void 0 : tasker.done();
          }
        }
      };
      Tracing._global.fetch = o11yFetch;
    }
    static _endActivity(activity, url, method) {
      var _a;
      if (activity) {
        if ((_a = Tracing._performanceObservability) === null || _a === void 0 ? void 0 : _a.isStarted) {
          activity.discard();
        } else {
          activity.stop(_252_76_0.networkSchema, {
            mtd: method,
            url
          });
        }
        return activity.getStopPerfTime() - activity.getStartPerfTime();
      }
      return void 0;
    }
    _overrideXhr(instr, logErrors, activityName, useTracing, options, tasker, skipUrls) {
      Tracing._originalXhr = Tracing._global.XMLHttpRequest;
      Tracing._originalXhrOpen = Tracing._originalXhr.prototype.open;
      Tracing._originalXhrSetRequestHeader = Tracing._originalXhr.prototype.setRequestHeader;
      Tracing._originalXhrSend = Tracing._originalXhr.prototype.send;
      function postProcess(xhr, failedAtInit) {
        var _a;
        if (xhr._o11y) {
          const activity = xhr._o11y.activity;
          const activityDuration = Tracing._endActivity(activity, xhr._o11y.url, xhr._o11y.method);
          if (!failedAtInit && ((_a = Tracing._performanceObservability) === null || _a === void 0 ? void 0 : _a.isStarted)) {
            Tracing._performanceObservability.addEntry(xhr._o11y.absoluteUrl, xhr._o11y.sendTime, {
              requestId: xhr._o11y.requestId,
              activityDuration,
              activityId: activity === null || activity === void 0 ? void 0 : activity.getId(),
              errorCount: activity === null || activity === void 0 ? void 0 : activity.getErrorCount()
            });
          }
        }
      }
      Tracing._originalXhr.prototype.open = function(method, url, __async, __username, __password) {
        this._o11y = {
          method,
          url: url === null || url === void 0 ? void 0 : url.toString()
        };
        this._o11y.absoluteUrl = _1.utility.tryGetAbsoluteUrl(this._o11y.url);
        this._o11y.suspendInstrumentation = Tracing._shouldSkipUrl(skipUrls, this._o11y.absoluteUrl);
        Tracing._originalXhrOpen.apply(this, arguments);
      };
      Tracing._originalXhr.prototype.setRequestHeader = function(name, value) {
        var _a;
        if (((_a = name === null || name === void 0 ? void 0 : name.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(name)) === headerRequestId.toLowerCase()) {
          this._o11y.requestId = value;
        }
        Tracing._originalXhrSetRequestHeader.apply(this, arguments);
      };
      Tracing._originalXhr.prototype.send = function(...args) {
        var _a;
        let activity;
        const xhr = this;
        try {
          tasker === null || tasker === void 0 ? void 0 : tasker.add();
          xhr._o11y = xhr._o11y || {};
          if (!xhr._o11y.suspendInstrumentation) {
            xhr._o11y.activity = activity = instr.startActivity(activityName || defaultActivityNameForXhrSend);
          }
          if (useTracing) {
            const traceHeaders = Tracing._getTraceHeaders(activity, instr, options, xhr._o11y.method, xhr._o11y.absoluteUrl);
            Object.entries(traceHeaders).forEach((entry) => {
              xhr.setRequestHeader(entry[0], entry[1]);
            });
          }
          xhr._o11y.sendTime = _1.utility.perfNow();
          Tracing._originalXhrSend.call(this, ...args);
        } catch (ex) {
          if (logErrors && !((_a = xhr._o11y) === null || _a === void 0 ? void 0 : _a.suspendInstrumentation)) {
            if (activity) {
              activity.error(ex);
            } else {
              instr.error(ex);
            }
          }
          postProcess(xhr, true);
          tasker === null || tasker === void 0 ? void 0 : tasker.done();
          throw ex;
        }
      };
      const xhrProxy = new Proxy(Tracing._originalXhr, {
        construct(target) {
          const newXhr = new target();
          newXhr.addEventListener("load", () => {
            postProcess(newXhr);
            tasker === null || tasker === void 0 ? void 0 : tasker.done();
          });
          newXhr.addEventListener("error", (__err) => {
            var _a, _b;
            try {
              if (logErrors && !((_a = newXhr._o11y) === null || _a === void 0 ? void 0 : _a.suspendInstrumentation)) {
                const error = new Error("XHR Network-Level Error");
                const activity = (_b = newXhr._o11y) === null || _b === void 0 ? void 0 : _b.activity;
                if (activity) {
                  activity.error(error);
                } else {
                  instr.error(error);
                }
              }
              postProcess(newXhr);
            } finally {
              tasker === null || tasker === void 0 ? void 0 : tasker.done();
            }
          });
          newXhr.addEventListener("abort", () => {
            var _a, _b;
            (_b = (_a = newXhr._o11y) === null || _a === void 0 ? void 0 : _a.activity) === null || _b === void 0 ? void 0 : _b.discard();
            tasker === null || tasker === void 0 ? void 0 : tasker.done();
          });
          return newXhr;
        }
      });
      Tracing._global.XMLHttpRequest = xhrProxy;
    }
    networkInstrumentation(options) {
      var _a;
      _1.utility.requireArgument(options, "options", ["boolean", "object"]);
      this._disableNetworkInstrumentation();
      if (options) {
        const tracingOptions = typeof options === "object" ? options : {};
        let tasker = void 0;
        if (_1.utility.definedValueOrDefault(tracingOptions.useTasker, true)) {
          tasker = (_a = this._idleDetector) === null || _a === void 0 ? void 0 : _a.declareNotifierTaskMulti("o11y network");
        }
        this._enableNetworkInstrumentation(_1.utility.definedValueOrDefault(tracingOptions.instrumentation, this._instr), _1.utility.definedValueOrDefault(tracingOptions.logErrors, true), tracingOptions.activityName, _1.utility.definedValueOrDefault(tracingOptions.useTracing, true), tracingOptions.tracingHeadersOptions, tasker, _1.utility.definedValueOrDefault(tracingOptions.logPerformance, true), _1.utility.definedValueOrDefault(tracingOptions.logPerformanceActivityName, defaultTimingActivityName), _1.utility.definedValueOrDefault(tracingOptions.skipUrls, []), _1.utility.definedValueOrDefault(tracingOptions.fuzzyMapRange, defaultFuzzyMapRange));
      }
    }
    resetRequestCounter() {
      Tracing._reqIndex = 0;
    }
    _applyTraceHeaders(resource, options, traceHeaders) {
      if ((options === null || options === void 0 ? void 0 : options.headers) !== void 0) {
        if (options.headers instanceof Headers && typeof options.headers.set === "function") {
          Object.entries(traceHeaders).forEach(([key, value]) => {
            options.headers.set(key, value);
          });
          return true;
        }
        if (Array.isArray(options.headers)) {
          Object.entries(traceHeaders).forEach((entry) => {
            options.headers.push(entry);
          });
          return true;
        }
        if (typeof options.headers === "object") {
          options.headers = Object.assign(options.headers, traceHeaders);
          return true;
        }
      } else if (resource instanceof Request && resource.headers instanceof Headers) {
        Object.entries(traceHeaders).forEach(([key, value]) => {
          resource.headers.set(key, value);
        });
        return true;
      } else if (options) {
        options.headers = Object.assign({}, traceHeaders);
        return true;
      }
      return false;
    }
    static _shouldSkipUrl(skipUrls, urlLike) {
      var _a;
      let url = urlLike;
      if (urlLike instanceof URL) {
        url = (_a = urlLike.toString) === null || _a === void 0 ? void 0 : _a.call(urlLike);
      } else if (urlLike instanceof Request) {
        url = urlLike.url;
      }
      return skipUrls === null || skipUrls === void 0 ? void 0 : skipUrls.some((skipUrl) => {
        if (skipUrl instanceof RegExp) {
          return skipUrl.test(url);
        } else {
          return url === skipUrl;
        }
      });
    }
  }
  Tracing._global = _1.utility.getGlobal();
  Tracing._isNetworkInstrumentationEnabled = false;
  Tracing._reqIndex = 0;
  var TimerOverride;
  (function(TimerOverride2) {
    TimerOverride2[TimerOverride2["none"] = 0] = "none";
    TimerOverride2[TimerOverride2["start"] = 1] = "start";
    TimerOverride2[TimerOverride2["stop"] = 2] = "stop";
    TimerOverride2[TimerOverride2["both"] = 3] = "both";
  })(TimerOverride || (TimerOverride = {}));
  const timedout = "timedout";
  const terminated = "terminated";
  const discarded = "discarded";
  const stopReason = {
    timedout,
    terminated,
    discarded
  };
  class ActivityImpl {
    constructor(_name, _rootId, _onStopped, _onError, timeout, id2, _isSampled, _startPerfTime, _noRerooting) {
      this._name = _name;
      this._rootId = _rootId;
      this._onStopped = _onStopped;
      this._onError = _onError;
      this._isSampled = _isSampled;
      this._noRerooting = _noRerooting;
      this._errorCount = 0;
      this._timerOverridden = TimerOverride.none;
      const {
        tsNow,
        perfNow
      } = _1.utility.time();
      ActivityImpl._count += 1;
      this._id = id2 || _1.utility.generateUniqueId();
      this._usePerf = typeof performance !== "undefined" && typeof performance.mark === "function" && typeof performance.measure === "function";
      if (this._usePerf) {
        this._perfName = `${this._name}__${ActivityImpl._count}`;
        this._perfId = `${this._name}__${this.id}`;
        try {
          performance.mark(this._perfId);
        } catch (_a) {
          this._usePerf = false;
        }
      }
      this._startTimestamp = tsNow;
      this._startPerfTime = perfNow;
      this._overrideTimer(_startPerfTime);
      if (timeout > 0) {
        this._timer = setTimeout(() => {
          this._stopReason = this._stopReason || stopReason.timedout;
          this.stop();
        }, timeout);
      }
      this._safety = new _1.PublicSafety();
    }
    get id() {
      return this._id;
    }
    getId() {
      return this.id;
    }
    getRootId() {
      return this._rootId;
    }
    get stopReason() {
      return this._stopReason;
    }
    error(error, userSchemaOrText, userData) {
      this._safety.tryCatch(() => {
        this._errorCount += 1;
        if (typeof error === "string") {
          error = new Error(error);
        }
        this._onError(error, this._getDetail(userSchemaOrText, userData));
      }, {
        op: "activity.error"
      });
    }
    stop(userSchemaOrText, userData, options) {
      this._safety.tryCatch(() => {
        _1.utility.requireArgumentIfDefined(userSchemaOrText, "userSchemaOrText", ["object", "string"]);
        _1.utility.requireArgumentIfDefined(userData, "userData", "object");
        if (options) {
          const perfStart = options.perfStartOverride;
          const isStartTimeDefined = _1.utility.requireArgumentIfDefined(perfStart, "options.perfStartOverride", "number");
          const perfStop = options.perfStopOverride;
          const isStopTimeDefined = _1.utility.requireArgumentIfDefined(perfStop, "options.perfStopOverride", "number");
          const errorCount = options.errorCount;
          if (_1.utility.requireArgumentIfDefined(errorCount, "options.errorCount", "number")) {
            this._errorCount = errorCount;
          }
          if (isStartTimeDefined && perfStart < 0) {
            throw new Error("perfStartOverride, if defined, must be >= 0");
          }
          if (isStopTimeDefined && (perfStop < 0 || perfStop < (isStartTimeDefined ? perfStart : this._startPerfTime) || perfStop > _1.utility.time().perfNow + 100)) {
            throw new Error("perfStopOverride, if defined, must be >= 0 and >= startTime and <= now");
          }
        }
        this._stopInternal(userSchemaOrText, userData, options);
      }, {
        op: "activity.stop"
      });
    }
    _overrideTimer(perfStartTime, perfStopTime) {
      if (perfStartTime !== void 0) {
        this._startTimestamp = Math.round(this._startTimestamp - (this._startPerfTime - perfStartTime));
        this._startPerfTime = perfStartTime;
        this._setTimerOverride(TimerOverride.start);
      }
      if (perfStopTime !== void 0) {
        this._stopPerfTime = perfStopTime;
        this._setTimerOverride(TimerOverride.stop);
      }
    }
    _setTimerOverride(value) {
      if (this._timerOverridden === TimerOverride.both || this._timerOverridden === value || value === TimerOverride.none) {
        return;
      }
      this._timerOverridden = this._timerOverridden === TimerOverride.none ? value : TimerOverride.both;
    }
    _stopInternal(userSchemaOrText, userData, options) {
      const stopPerfTime = _1.utility.perfNow();
      if (this._usePerf) {
        try {
          if (this._stopReason !== stopReason.discarded) {
            performance.measure(this._perfName, this._perfId);
          }
          performance.clearMarks(this._perfId);
          performance.clearMeasures(this._perfName);
        } catch (_a) {
        }
      }
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = void 0;
      }
      if (this.isStopped) {
        return;
      }
      if (options) {
        this._overrideTimer(options.perfStartOverride, options.perfStopOverride);
      }
      this._stopPerfTime = this._timerOverridden === TimerOverride.none || this._timerOverridden === TimerOverride.start ? stopPerfTime : this._stopPerfTime;
      const activityDetail = this._getDetail(userSchemaOrText, userData);
      this._onStopped(activityDetail);
    }
    get isStopped() {
      return this._stopPerfTime !== void 0;
    }
    discard() {
      this._safety.tryCatch(() => {
        this._stopReason = this._stopReason || stopReason.discarded;
        this.stop();
      }, {
        op: "activity.discard"
      });
    }
    terminate(userSchemaOrText, userData, options) {
      this._safety.tryCatch(() => {
        this._stopReason = this._stopReason || stopReason.terminated;
        this.stop(userSchemaOrText, userData, options);
      }, {
        op: "activity.terminate"
      });
    }
    getIsSampled() {
      return this._isSampled || false;
    }
    _getDetail(userSchemaOrText, userData) {
      return {
        id: this._id,
        rootId: this._rootId,
        name: this._name,
        userSchemaOrText,
        userData,
        stopReason: this._stopReason,
        startTimestamp: this._startTimestamp,
        startPerfTime: this._startPerfTime,
        stopPerfTime: this._stopPerfTime,
        errorCount: this._errorCount,
        isSampled: this.getIsSampled(),
        timerOverridden: this._timerOverridden,
        noRerooting: this._noRerooting
      };
    }
    getTraceHeaders(options) {
      const spanId = this.id;
      const traceId = this._rootId || spanId;
      return Tracing.getHeaders(traceId, spanId, this.getIsSampled(), options);
    }
    getStartTimestamp() {
      return this._startTimestamp;
    }
    getStartPerfTime() {
      return this._startPerfTime;
    }
    getStopPerfTime() {
      return this._stopPerfTime;
    }
    getErrorCount() {
      return this._errorCount;
    }
  }
  ActivityImpl._count = 0;
  const id = new Array(16).fill(0).join("");
  class ActivityNoOp {
    getId() {
      return id;
    }
    getRootId() {
      return void 0;
    }
    error() {
    }
    stop() {
    }
    discard() {
    }
    terminate() {
    }
    getIsSampled() {
      return false;
    }
    getTraceHeaders(__options) {
      return {};
    }
    getStartTimestamp() {
      return void 0;
    }
    getStartPerfTime() {
      return void 0;
    }
    getStopPerfTime() {
      return void 0;
    }
    getErrorCount() {
      return 0;
    }
  }
  const activityNoOp = Object.freeze(new ActivityNoOp());
  class DomEventHelpers {
    getInstrumentedEventData(domEventDataField, domEventData, handledBy, userPayload) {
      var _a;
      const instrumentedEvent = {
        ownerComponent: handledBy.tagName,
        parentComponent: ((_a = handledBy.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) || void 0,
        simplePath: _1.utility.getXpath(handledBy)
      };
      switch (domEventDataField) {
        case 0:
          instrumentedEvent.baseEvent = domEventData;
          break;
        case 1:
          instrumentedEvent.mouseEvent = domEventData;
          break;
      }
      if (userPayload) {
        instrumentedEvent.userPayload = _1.schemaUtil.makePayload(userPayload.schema, userPayload.payload, true);
      }
      return instrumentedEvent;
    }
    getEventData(e) {
      return {
        type: e.type
      };
    }
    getMouseEventData(e) {
      return {
        altKey: e.altKey,
        bubbles: e.bubbles,
        button: e.button,
        buttons: e.buttons,
        cancelable: e.cancelable,
        clientX: e.clientX,
        clientY: e.clientY,
        composed: e.composed,
        defaultPrevented: e.defaultPrevented,
        detail: e.detail,
        eventPhase: e.eventPhase,
        isTrusted: e.isTrusted,
        timeStamp: e.timeStamp,
        type: e.type,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        movementX: e.movementX,
        movementY: e.movementY,
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY,
        shiftKey: e.shiftKey
      };
    }
  }
  const singleton = new DomEventHelpers();
  const domEventHelpers = singleton;
  class BucketHistogramImpl {
    constructor(_name, _ownerName, _ownerAppName, _tags, _buckets, createdOn, lastUpdatedOn, values) {
      this._name = _name;
      this._ownerName = _ownerName;
      this._ownerAppName = _ownerAppName;
      this._tags = _tags;
      this._buckets = _buckets;
      this._values = new Array();
      this._createdOn = createdOn === void 0 ? _1.utility.time().tsNow : createdOn;
      if (lastUpdatedOn !== void 0) {
        this._lastUpdatedOn = lastUpdatedOn;
      }
      if (values !== void 0) {
        this._values = values;
      }
    }
    getName() {
      return this._name;
    }
    getCreatedOn() {
      return this._createdOn;
    }
    getLastUpdatedOn() {
      return this._lastUpdatedOn;
    }
    getData() {
      return this.values;
    }
    getBuckets() {
      return this.buckets;
    }
    get buckets() {
      return this._buckets.slice(0, this._buckets.length);
    }
    get values() {
      return this._values.slice(0, this._values.length);
    }
    record(value) {
      if (typeof value === "number") {
        this._values.push(value);
        this._lastUpdatedOn = _1.utility.time().tsNow;
        return;
      }
      throw new Error("BucketHistogram can only record numbers.");
    }
    reset() {
      this._lastUpdatedOn = void 0;
      this._values = [];
    }
    getOwnerName() {
      return this._ownerName;
    }
    getOwnerAppName() {
      return this._ownerAppName;
    }
    getTags() {
      return this._tags;
    }
  }
  class ValueRecorderImpl {
    constructor(_name, _ownerName, _ownerAppName, _tags, createdOn, lastUpdatedOn, values) {
      this._name = _name;
      this._ownerName = _ownerName;
      this._ownerAppName = _ownerAppName;
      this._tags = _tags;
      this._values = new Array();
      this._createdOn = createdOn === void 0 ? _1.utility.time().tsNow : createdOn;
      if (lastUpdatedOn !== void 0) {
        this._lastUpdatedOn = lastUpdatedOn;
      }
      if (values !== void 0) {
        this._values = values;
      }
    }
    getName() {
      return this._name;
    }
    getCreatedOn() {
      return this._createdOn;
    }
    getLastUpdatedOn() {
      return this._lastUpdatedOn;
    }
    getData() {
      return this.values;
    }
    get values() {
      return this._values.slice(0, this._values.length);
    }
    record(value) {
      if (typeof value === "number") {
        this._values.push(value);
        this._lastUpdatedOn = _1.utility.time().tsNow;
        return;
      }
      throw new Error("ValueRecorder can only record numbers.");
    }
    reset() {
      this._lastUpdatedOn = void 0;
      this._values = [];
    }
    getOwnerName() {
      return this._ownerName;
    }
    getOwnerAppName() {
      return this._ownerAppName;
    }
    getTags() {
      return this._tags;
    }
  }
  class SizeLimitedMap {
    constructor(maxSize) {
      this._map = new Map();
      if (typeof maxSize === "number" && maxSize > 0) {
        this._maxSize = Math.ceil(maxSize);
        return;
      }
      throw new Error("maxSize must be a positive number");
    }
    get maxSize() {
      return this._maxSize;
    }
    get(key) {
      return this._map.get(key);
    }
    has(key) {
      return this._map.has(key);
    }
    set(key, value) {
      if (this.has(key) || this._map.size < this.maxSize) {
        this._map.set(key, value);
        return true;
      }
      return false;
    }
    getElements() {
      return Array.from(this._map.values());
    }
    clear() {
      this._map.clear();
    }
  }
  const maxCounters = 1e3;
  const maxValueRecorders = 500;
  const maxBucketHistograms = 500;
  var MetricType;
  (function(MetricType2) {
    MetricType2[MetricType2["Counter"] = 0] = "Counter";
    MetricType2[MetricType2["Percentile"] = 1] = "Percentile";
    MetricType2[MetricType2["BucketHistogram"] = 2] = "BucketHistogram";
  })(MetricType || (MetricType = {}));
  class MetricsImpl {
    constructor(_ownerName, _getOwnerAppName) {
      this._ownerName = _ownerName;
      this._getOwnerAppName = _getOwnerAppName;
      this._upCounters = new SizeLimitedMap(maxCounters);
      this._valueRecorders = new SizeLimitedMap(maxValueRecorders);
      this._bucketHistograms = new SizeLimitedMap(maxBucketHistograms);
    }
    incrementCounter(operation, increment, hasError = false, tags = {}) {
      this._tagError(tags, hasError);
      this._upCounter(operation, tags).increment(increment);
    }
    trackValue(operation, value, hasError = false, tags = {}) {
      this._tagError(tags, hasError);
      this._valueRecorder(operation, tags).record(value);
    }
    bucketValue(operation, value, buckets, hasError = false, tags = {}) {
      this._tagError(tags, hasError);
      this._bucketHistogram(operation, tags, buckets).record(value);
    }
    _bucketHistogram(name, tags, buckets) {
      const {
        key,
        sortedTags
      } = this._getKeyAndSortedTags(name, tags, MetricType.BucketHistogram);
      let instrument = this._bucketHistograms.get(key);
      if (!instrument) {
        instrument = new BucketHistogramImpl(name, this._ownerName, this._getOwnerAppName(), sortedTags, buckets);
        if (!this._bucketHistograms.set(key, instrument)) {
          throw new Error(`Max size of ${maxBucketHistograms} exceeded for BucketHistograms`);
        }
      }
      return instrument;
    }
    _upCounter(name, tags) {
      const {
        key,
        sortedTags
      } = this._getKeyAndSortedTags(name, tags, MetricType.Counter);
      let instrument = this._upCounters.get(key);
      if (!instrument) {
        instrument = new _1.UpCounterImpl(name, this._ownerName, this._getOwnerAppName(), sortedTags);
        if (!this._upCounters.set(key, instrument)) {
          throw new Error(`Max size of ${maxCounters} exceeded for UpCounters`);
        }
      }
      return instrument;
    }
    _valueRecorder(name, tags) {
      const {
        key,
        sortedTags
      } = this._getKeyAndSortedTags(name, tags, MetricType.Percentile);
      let instrument = this._valueRecorders.get(key);
      if (!instrument) {
        instrument = new ValueRecorderImpl(name, this._ownerName, this._getOwnerAppName(), sortedTags);
        if (!this._valueRecorders.set(key, instrument)) {
          throw new Error(`Max size of ${maxValueRecorders} exceeded for ValueRecorders`);
        }
      }
      return instrument;
    }
    getUpCounters() {
      return this._upCounters.getElements();
    }
    getValueRecorders() {
      return this._valueRecorders.getElements();
    }
    getBucketHistograms() {
      return this._bucketHistograms.getElements();
    }
    _tagError(tags, hasError) {
      tags.status = hasError === true ? "error" : "success";
    }
    _getKeyAndSortedTags(operation, tags, metricType) {
      const sortedTags = Object.keys(tags).sort().reduce((prev, curr) => {
        prev[curr] = tags[curr];
        return prev;
      }, {});
      const key = `${MetricType[metricType]}:${operation}${JSON.stringify(sortedTags)}`;
      return {
        key,
        sortedTags
      };
    }
  }
  class MockBase {
    constructor() {
      this.isMock = true;
    }
  }
  const maxActivityDurationMsecs = void 0;
  const reservedMetricCharacters = ["`"];
  const reservedMetricNames = {
    internalError: "o11y-error"
  };
  const denyListMetricNames = Object.freeze(Array.from(Object.values(reservedMetricNames)));
  class InstrumentationImpl {
    constructor(_nextGen, _name) {
      this._nextGen = _nextGen;
      this._name = _name;
      this._onActivityStoppedCallback = this._handleActivityStop.bind(this);
      this._onActivityErrorCallback = this._handleActivityError.bind(this);
      for (const reservedChar of reservedMetricCharacters) {
        if (this._name.indexOf(reservedChar) >= 0) {
          throw new Error(`Name cannot include the reserved character "${reservedChar}"`);
        }
      }
      this._safety = new _1.PublicSafety({
        increment: (increment) => this._incrementError(increment)
      });
      this._metrics = this._initMetrics();
      const simpleTextOptions = _1.schemaUtil.getOptions(_252_76_0.simpleSchema, "Simple", "text");
      this._simpleTextMaxLength = simpleTextOptions ? simpleTextOptions["(meta.max_length)"] : _1.maxStringLengthAppLimit;
    }
    _initMetrics() {
      return new MetricsImpl(this.name, () => this._nextGen.appName || InstrumentationImpl.defaultAppName);
    }
    _incrementError(increment = 1) {
      this._metrics.incrementCounter(reservedMetricNames.internalError, increment, true);
    }
    get name() {
      return this._name;
    }
    _wrapUserPayload(userSchemaOrText, userData, onlyIfBoth = false) {
      let userSchema;
      if (typeof userSchemaOrText === "string") {
        userSchema = _252_76_0.simpleSchema;
        if (userSchemaOrText) {
          userData = {
            text: userSchemaOrText.substring(0, this._simpleTextMaxLength)
          };
        } else {
          userData = void 0;
        }
      } else {
        userSchema = userSchemaOrText;
      }
      return _1.schemaUtil.makePayload(userSchema, userData, onlyIfBoth);
    }
    _getEffectiveRootId(options) {
      var _a, _b;
      return (_b = (_a = options === null || options === void 0 ? void 0 : options.instrumentationContext) === null || _a === void 0 ? void 0 : _a.rootId) !== null && _b !== void 0 ? _b : this._nextGen.getDefaultInstrumentationContext().rootId;
    }
    get internalInstrumentationContext() {
      return this._nextGen.getDefaultInstrumentationContext();
    }
    log(userSchemaOrText, userData, options) {
      this._safety.tryCatch(() => {
        const timestamp = _1.utility.time().tsNow;
        _1.utility.requireArgument(userSchemaOrText, "userSchemaOrText", ["object", "string"]);
        _1.utility.requireArgumentIfDefined(userData, "userData", "object");
        _1.utility.requireArgumentIfDefined(options, "options", "object");
        const userPayload = this._wrapUserPayload(userSchemaOrText, userData);
        if (userPayload === null || userPayload === void 0 ? void 0 : userPayload.payload) {
          this._logInternal(this.name, userPayload.schema, userPayload.payload, timestamp, this._getEffectiveRootId(options));
        }
      }, {
        op: "log"
      });
    }
    _logInternal(loggerName, schema, data, timestamp, rootId2) {
      const sequence = this._nextGen.addLog(loggerName, schema, data, timestamp, rootId2);
      if (!_1.utility.isProduction) {
        const extraFields = _1.payloadUtility.getExtraFields(schema, data);
        if (!_1.utility.isProduction && extraFields.length > 0) {
          this.error("Extra fields", _252_76_0.payloadDiagsSchema, {
            extras: extraFields
          });
        }
      }
      return sequence;
    }
    error(error, userSchemaOrText, userData, options) {
      return this._safety.tryCatch(() => {
        _1.utility.requireArgumentIfDefined(userSchemaOrText, "userSchemaOrText", ["object", "string"]);
        _1.utility.requireArgumentIfDefined(userData, "userData", "object");
        _1.utility.requireArgumentIfDefined(options, "options", "object");
        const rootId2 = this._getEffectiveRootId(options);
        this._errorInternal(error, userSchemaOrText, userData, void 0, rootId2);
      }, {
        op: "error"
      });
    }
    _errorInternal(err, userSchemaOrText, userData, activityId, rootActivityId) {
      const loggedTimestamp = _1.utility.time().tsNow;
      let error;
      if (err instanceof Error) {
        error = err;
      } else {
        let msg;
        if (err === void 0 || err === null || typeof err.toString !== "function") {
          msg = "UNKNOWN";
        } else {
          msg = err.toString();
        }
        error = new Error(msg);
      }
      const userPayload = this._wrapUserPayload(userSchemaOrText, userData, true);
      const errorData = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        userPayload,
        activityId
      };
      return this._logInternal(this.name, _252_76_0.errorSchema, errorData, loggedTimestamp, rootActivityId);
    }
    startActivity(name, options) {
      return this._safety.tryCatchReturn(() => {
        var _a;
        _1.utility.requireArgument(name, "name");
        _1.utility.requireArgumentIfDefined(options, "options", "object");
        let context;
        let noRerooting = (options === null || options === void 0 ? void 0 : options.perfStartOverride) !== void 0;
        const rootId2 = (_a = options === null || options === void 0 ? void 0 : options.instrumentationContext) === null || _a === void 0 ? void 0 : _a.rootId;
        if (rootId2) {
          noRerooting = true;
          context = {
            rootId: rootId2,
            isRootActivitySampled: options.instrumentationContext.isRootActivitySampled
          };
        } else {
          context = this._nextGen.getDefaultInstrumentationContext();
        }
        const activity = new ActivityImpl(name, context.rootId, this._onActivityStoppedCallback, this._onActivityErrorCallback, maxActivityDurationMsecs, options === null || options === void 0 ? void 0 : options.id, context.isRootActivitySampled, options === null || options === void 0 ? void 0 : options.perfStartOverride, noRerooting);
        return activity;
      }, activityNoOp, {
        op: "startActivity"
      });
    }
    _getActivityData(detail) {
      const userPayload = this._wrapUserPayload(detail.userSchemaOrText, detail.userData, true);
      return {
        id: detail.id,
        name: detail.name,
        duration: detail.stopPerfTime - detail.startPerfTime,
        stopReason: detail.stopReason,
        userPayload,
        errorCount: detail.errorCount,
        isSampled: detail.isSampled,
        timerOverridden: detail.timerOverridden,
        isRerooted: detail.isRerooted
      };
    }
    _handleActivityStop(detail) {
      if (detail.stopReason === discarded) {
        return;
      }
      if (!detail.isRoot && !detail.noRerooting) {
        const rahe = this._nextGen.getRootActivityHistoryEntryByTime(detail.startPerfTime);
        if (!rahe && detail.rootId !== void 0 || rahe && detail.rootId !== rahe.id) {
          detail.rootId = rahe === null || rahe === void 0 ? void 0 : rahe.id;
          detail.isSampled = (rahe === null || rahe === void 0 ? void 0 : rahe.isSampled) || false;
          detail.isRerooted = true;
        }
      }
      const activityData = this._getActivityData(detail);
      this._logActivity(activityData, detail.startTimestamp, detail.rootId);
    }
    _logActivity(activityData, startTimestamp, rootId2) {
      this._logInternal(this.name, _252_76_0.activitySchema, activityData, startTimestamp, rootId2);
    }
    _handleActivityError(error, detail) {
      this._errorInternal(error, detail.userSchemaOrText, detail.userData, detail.id, detail.rootId);
    }
    domEvent(event, handledBy, userSchemaOrText, userData, options) {
      this._safety.tryCatch(() => {
        var _a;
        const tsNow = _1.utility.time().tsNow;
        _1.utility.requireArgument(event, "event", [Event, MockBase]);
        _1.utility.requireArgument(handledBy, "handledBy", [HTMLElement, "object"]);
        let htmlElement;
        if (handledBy instanceof HTMLElement) {
          htmlElement = handledBy;
        } else {
          handledBy = handledBy;
          if (((_a = handledBy.template) === null || _a === void 0 ? void 0 : _a.host) instanceof HTMLElement) {
            htmlElement = handledBy.template.host;
          } else {
            _1.utility.requireArgument(void 0, "handledBy");
          }
        }
        const userPayload = this._wrapUserPayload(userSchemaOrText, userData, true);
        const rootId2 = this._getEffectiveRootId(options);
        switch (event.type) {
          case "click": {
            const mouseEvent = event;
            const acd = this._nextGen.getClickTracker();
            if (acd) {
              acd.markEventHandled(mouseEvent);
            }
            const captureMouse = options === null || options === void 0 ? void 0 : options.captureMouseData;
            const instrumentedEvent = domEventHelpers.getInstrumentedEventData(captureMouse ? 1 : 0, captureMouse ? domEventHelpers.getMouseEventData(mouseEvent) : domEventHelpers.getEventData(mouseEvent), htmlElement, userPayload);
            instrumentedEvent.auto = options === null || options === void 0 ? void 0 : options._auto;
            this._logInternal(this.name, _252_76_0.instrumentedEventSchema, instrumentedEvent, tsNow, rootId2);
            break;
          }
          default:
            throw new Error(_1.utility.notImplemented);
        }
      }, {
        op: "domEvent"
      });
    }
    _siftTags(tags) {
      const modTags = Object.assign({}, tags);
      Object.entries(modTags).forEach(([key, value]) => {
        if (value === null) {
          modTags[key] = "null";
        } else if (value === "") {
          modTags[key] = "empty";
        } else if (Number.isNaN(value)) {
          modTags[key] = "NaN";
        } else {
          const type = typeof value;
          if (["number", "string", "boolean"].indexOf(type) === -1) {
            modTags[key] = type;
          }
        }
      });
      return modTags;
    }
    incrementCounter(operation, increment = 1, hasError = false, tags = {}) {
      this._safety.tryCatch(() => {
        _1.utility.requireArgument(operation, "operation", "string");
        _1.utility.checkForDenyListedValues(operation, "operation", denyListMetricNames);
        _1.utility.checkForReservedCharacters(operation, "operation", reservedMetricCharacters);
        _1.utility.requireArgument(increment, "increment", "number");
        _1.utility.requireArgument(hasError, "hasError", "boolean");
        _1.utility.requireArgument(tags, "tags", "object");
        this._metrics.incrementCounter(operation, increment, hasError, this._siftTags(tags));
      }, {
        op: "incrementCounter"
      });
    }
    trackValue(operation, value, hasError = false, tags = {}) {
      this._safety.tryCatch(() => {
        _1.utility.requireArgument(operation, "operation", "string");
        _1.utility.checkForDenyListedValues(operation, "operation", denyListMetricNames);
        _1.utility.checkForReservedCharacters(operation, "operation", reservedMetricCharacters);
        _1.utility.requireArgument(value, "value", "number");
        _1.utility.requireArgument(hasError, "hasError", "boolean");
        _1.utility.requireArgument(tags, "tags", "object");
        this._metrics.trackValue(operation, value, hasError, this._siftTags(tags));
      }, {
        op: "trackValue"
      });
    }
    bucketValue(operation, value, buckets = [], hasError = false, tags = {}) {
      this._safety.tryCatch(() => {
        _1.utility.requireArgument(operation, "operation", "string");
        _1.utility.checkForDenyListedValues(operation, "operation", denyListMetricNames);
        _1.utility.checkForReservedCharacters(operation, "operation", reservedMetricCharacters);
        _1.utility.requireArgument(value, "value", "number");
        _1.utility.requireArgument(buckets, "buckets", Array);
        Object.entries(buckets).forEach(([key, value2]) => {
          _1.utility.requireArgument(value2, `Bucket value for '${key}'`, "number");
        });
        _1.utility.requireArgument(hasError, "hasError", "boolean");
        _1.utility.requireArgument(tags, "tags", "object");
        this._metrics.bucketValue(operation, value, buckets, hasError, this._siftTags(tags));
      }, {
        op: "bucketValue"
      });
    }
    getUpCounters() {
      return this._metrics.getUpCounters().filter((m) => m.getLastUpdatedOn());
    }
    getValueRecorders() {
      return this._metrics.getValueRecorders().filter((m) => m.getLastUpdatedOn());
    }
    getBucketHistograms() {
      return this._metrics.getBucketHistograms().filter((m) => m.getLastUpdatedOn());
    }
    registerForLogPrompt(listener) {
      _1.utility.requireArgument(listener, "listener", "function");
      this._nextGen.registerForLogPrompt(listener);
    }
    _getAsaOptions(options) {
      return options ? Object.assign({
        instrumentationContext: options === null || options === void 0 ? void 0 : options.instrumentationContext
      }, options.startOptions) : void 0;
    }
    activity(name, execute, options) {
      var _a, _b, _c, _d;
      const asaOptions = this._getAsaOptions(options);
      const act = this.startActivity(name, asaOptions);
      try {
        return execute(act);
      } catch (err) {
        act.error(err, (_a = options === null || options === void 0 ? void 0 : options.errorPayload) === null || _a === void 0 ? void 0 : _a.schema, (_b = options === null || options === void 0 ? void 0 : options.errorPayload) === null || _b === void 0 ? void 0 : _b.payload);
        throw err;
      } finally {
        act.stop((_c = options === null || options === void 0 ? void 0 : options.stopPayload) === null || _c === void 0 ? void 0 : _c.schema, (_d = options === null || options === void 0 ? void 0 : options.stopPayload) === null || _d === void 0 ? void 0 : _d.payload, options === null || options === void 0 ? void 0 : options.stopOptions);
      }
    }
    async activityAsync(name, execute, options) {
      var _a, _b, _c, _d;
      const asaOptions = this._getAsaOptions(options);
      const act = this.startActivity(name, asaOptions);
      try {
        return await execute(act);
      } catch (err) {
        act.error(err, (_a = options === null || options === void 0 ? void 0 : options.errorPayload) === null || _a === void 0 ? void 0 : _a.schema, (_b = options === null || options === void 0 ? void 0 : options.errorPayload) === null || _b === void 0 ? void 0 : _b.payload);
        throw err;
      } finally {
        act.stop((_c = options === null || options === void 0 ? void 0 : options.stopPayload) === null || _c === void 0 ? void 0 : _c.schema, (_d = options === null || options === void 0 ? void 0 : options.stopPayload) === null || _d === void 0 ? void 0 : _d.payload, options === null || options === void 0 ? void 0 : options.stopOptions);
      }
    }
  }
  InstrumentationImpl.defaultAppName = "APP_NOT_REGISTERED";
  const GRACE = 0.1;
  const DEFAULT_LIMIT = 20;
  class RootActivityHistoryImpl {
    constructor(limit) {
      this._historyMap = new Map();
      this._historyList = new Array();
      if (_1.utility.requireArgumentIfDefined(limit, "limit", "number")) {
        limit = Math.ceil(limit);
        if (limit <= 0) {
          throw new Error("Limit must be a positive number");
        }
      } else {
        limit = DEFAULT_LIMIT;
      }
      this._graceCount = Math.max(1, Math.floor(limit * GRACE));
      this._realLimit = 1 + limit + this._graceCount;
    }
    add(entry) {
      if (this._historyMap.has(entry.id)) {
        throw new Error(`RootActivityHistoryImpl.add: entry already exists for rootId: ${entry.id}`);
      }
      this._historyMap.set(entry.id, entry);
      this._historyList.push(entry);
      if (this._historyList.length === this._realLimit) {
        const removed = this._historyList.splice(1, this._graceCount);
        removed.forEach((e) => this._historyMap.delete(e.id));
      }
    }
    get count() {
      return this._historyList.length;
    }
    findById(rootId2) {
      return this._historyMap.get(rootId2);
    }
    findByTime(atTime) {
      let closest;
      let closestDiff = Number.MAX_VALUE;
      for (const entry of this._historyList) {
        const startDelta = atTime - entry.startPerfTime;
        const isDuringRoot = startDelta >= 0 && (entry.stopPerfTime === void 0 || atTime < entry.stopPerfTime);
        if (isDuringRoot && startDelta < closestDiff) {
          closest = entry;
          closestDiff = startDelta;
        }
      }
      return closest;
    }
  }
  class RootActivityImpl extends ActivityImpl {
    constructor(name, onStopped, onError, rootId2, isSampled, startPerfTime, generatedRootIdLength) {
      super(name, void 0, onStopped, onError, void 0, rootId2 || _1.utility.generateUniqueId(generatedRootIdLength !== null && generatedRootIdLength !== void 0 ? generatedRootIdLength : 32), isSampled, startPerfTime);
    }
    get preRootId() {
      return this._preRootId;
    }
    set preRootId(value) {
      this._preRootId = value;
    }
    _getDetail(userSchema, userData) {
      const detail = super._getDetail(userSchema, userData);
      detail.isRoot = true;
      detail.preRootId = this.preRootId;
      return detail;
    }
  }
  const rootId = new Array(32).fill(0).join("");
  class RootActivityNoOp {
    getId() {
      return rootId;
    }
    getRootId() {
      return void 0;
    }
    error() {
    }
    stop() {
    }
    discard() {
    }
    terminate() {
    }
    getIsSampled() {
      return false;
    }
    getTraceHeaders(__options) {
      return {};
    }
    getStartTimestamp() {
      return void 0;
    }
    getStartPerfTime() {
      return void 0;
    }
    getStopPerfTime() {
      return void 0;
    }
    getErrorCount() {
      return 0;
    }
  }
  const rootActivityNoOp = Object.freeze(new RootActivityNoOp());
  class AppInstrumentationImpl extends InstrumentationImpl {
    constructor(_nextGen, _name, _allowMulti) {
      super(_nextGen, _name);
      this._allowMulti = _allowMulti;
      this._rootActivityHistory = new RootActivityHistoryImpl();
      this._onRootActivityStoppedCallback = this._handleRootActivityStop.bind(this);
    }
    startRootActivity(name, rootId2, isSampled, options) {
      return this._safety.tryCatchReturn(() => {
        _1.utility.requireArgument(name, "name");
        if ((options === null || options === void 0 ? void 0 : options.id) !== void 0) {
          throw new Error("Cannot specify id for root activity, use rootId argument instead");
        }
        const newRootActivity = new RootActivityImpl(name, this._onRootActivityStoppedCallback, this._onActivityErrorCallback, rootId2, isSampled, options === null || options === void 0 ? void 0 : options.perfStartOverride, this._nextGen.preferredRootIdLength);
        if (!this._allowMulti) {
          const entry = {
            id: newRootActivity.getId(),
            name,
            startPerfTime: newRootActivity.getStartPerfTime(),
            isSampled: newRootActivity.getIsSampled()
          };
          this._rootActivityHistory.add(entry);
          if (this._singleRootActivity && !this._singleRootActivity.isStopped) {
            const preRootId = this._singleRootActivity.getId();
            this._singleRootActivity.terminate();
            newRootActivity.preRootId = preRootId;
          }
          this._singleRootActivity = newRootActivity;
        }
        return newRootActivity;
      }, rootActivityNoOp, {
        op: "startRootActivity"
      });
    }
    _handleRootActivityStop(detail) {
      const historyEntry = this._rootActivityHistory.findById(detail.id);
      if (historyEntry) {
        historyEntry.stopPerfTime = detail.stopPerfTime;
        historyEntry.startPerfTime = detail.startPerfTime;
      }
      if (detail.stopReason === discarded) {
        return;
      }
      const activityData = this._getActivityData(detail);
      this._logActivity(activityData, detail.startTimestamp);
      this._singleRootActivity = void 0;
    }
    _getActivityData(detail) {
      const activityData = super._getActivityData(detail);
      activityData.isRoot = detail.isRoot;
      activityData.preRootId = detail.preRootId;
      return activityData;
    }
    getSingleRootActivityId() {
      var _a;
      return (_a = this._singleRootActivity) === null || _a === void 0 ? void 0 : _a.getId();
    }
    isSingleRootActivitySampled() {
      var _a;
      return (_a = this._singleRootActivity) === null || _a === void 0 ? void 0 : _a.getIsSampled();
    }
    _initMetrics() {
      return new MetricsImpl(this.name, () => this.name);
    }
    getRootActivityHistoryEntry(atTime) {
      return this._rootActivityHistory.findByTime(atTime);
    }
  }
  const pathLimit = 5;
  class AutomaticClickTracker {
    constructor(_instr, _doc) {
      this._instr = _instr;
      this._doc = _doc;
      this._isActive = false;
      this._boundClickListener = this._clickListener.bind(this);
      _1.utility.requireArgument(_instr, "_instr");
      _1.utility.requireArgument(_doc, "_doc");
    }
    activate() {
      if (!this._isActive) {
        this._doc.addEventListener("click", this._boundClickListener, true);
        this._isActive = true;
      }
    }
    deactivate() {
      if (this._isActive) {
        this._doc.removeEventListener("click", this._boundClickListener, true);
        this._isActive = false;
      }
    }
    markEventHandled(event) {
      this._ignoredEvent = event;
    }
    _clickListener(event) {
      var _a;
      let eventTargets = (_a = event.composedPath) === null || _a === void 0 ? void 0 : _a.call(event);
      if (!eventTargets || !eventTargets.length) {
        eventTargets = event.path;
      }
      const handledBy = this._getClickableElement(eventTargets);
      if (handledBy) {
        setTimeout(() => {
          if (event !== this._ignoredEvent) {
            this._instr.domEvent(event, handledBy, void 0, void 0, {
              _auto: true
            });
          }
        });
      }
    }
    _getClickableElement(path) {
      var _a, _b;
      const limit = path ? Math.min(path.length, pathLimit) : 0;
      for (let x = 0; x < limit; x += 1) {
        const currentElement = path[x];
        const tagName = (_a = currentElement.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (tagName === "a" || tagName === "button") {
          return currentElement;
        }
        if (tagName === "input") {
          const inputElement = currentElement;
          if (((_b = inputElement.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "button") {
            return inputElement;
          }
        }
      }
      return void 0;
    }
  }
  const MESSAGE_FROM_RECEIVER = "o11y:receiver";
  var CommState;
  (function(CommState2) {
    CommState2[CommState2["Unknown"] = 0] = "Unknown";
    CommState2[CommState2["Opening"] = 1] = "Opening";
  })(CommState || (CommState = {}));
  class ReceiverConnector {
    constructor(_logCallback, _metricsCallback, _commErrorCallback) {
      this._logCallback = _logCallback;
      this._metricsCallback = _metricsCallback;
      this._commErrorCallback = _commErrorCallback;
      this._senders = new Map();
      _1.utility.requireArgument(this._logCallback, "_logCallback", "function");
      _1.utility.requireArgument(this._metricsCallback, "_metricsCallback", "function");
      _1.utility.requireArgument(this._commErrorCallback, "_commErrorCallback", "function");
    }
    openComms(sender) {
      _1.utility.requireArgument(sender, "sender", "object");
      if (!this._senders.has(sender)) {
        const messageChannel = new MessageChannel();
        const status = {
          state: CommState.Opening,
          port: messageChannel.port1
        };
        this._senders.set(sender, status);
        status.port.onmessage = this._messagePortEventHandler.bind(this);
        status.port.onmessageerror = this._messagePortErrorHandler.bind(this);
        sender.postMessage({
          from: MESSAGE_FROM_RECEIVER,
          type: MESSAGE_TYPE_HANDSHAKE
        }, "*", [messageChannel.port2]);
      }
    }
    closeComms(sender) {
      const status = this._senders.get(sender);
      if (status) {
        status.port.onmessage = void 0;
        status.port.onmessageerror = void 0;
        this._senders.delete(sender);
      }
    }
    _messagePortEventHandler(e) {
      if (e.data.type === MESSAGE_TYPE_LOG) {
        this._logCallback(e.data.data);
      } else if (e.data.type === MESSAGE_TYPE_METRICS) {
        this._metricsCallback(e.data.data);
      }
    }
    _messagePortErrorHandler() {
      this._commErrorCallback();
    }
  }
  const MESSAGE_TYPE_HANDSHAKE = "handshake";
  const MESSAGE_TYPE_LOG = "log";
  const MESSAGE_TYPE_METRICS = "metrics";
  class SenderConnector {
    constructor(_self, _allowedOrigins) {
      this._self = _self;
      this._allowedOrigins = _allowedOrigins;
      this._messageEventHandlerFunc = this._messageEventHandler.bind(this);
      this._handshakeComplete = false;
      this._logBuffer = [];
      this._metricsBuffer = [];
      _1.utility.requireArgument(this._self, "_self", "object");
      _1.utility.requireArgumentIfDefined(_allowedOrigins, "allowedOrigins", Array);
      this._self.addEventListener("message", this._messageEventHandlerFunc);
    }
    _messageEventHandler(e) {
      if (e.data.from === MESSAGE_FROM_RECEIVER && e.data.type === MESSAGE_TYPE_HANDSHAKE && e.ports[0] instanceof MessagePort && _1.utility.isAllowedOrigin(e.origin, this._allowedOrigins)) {
        this._handshakeComplete = true;
        this._self.removeEventListener("message", this._messageEventHandlerFunc);
        this._otherPort = e.ports[0];
        this._emptyBuffers();
      }
    }
    sendLog(log) {
      if (!this._handshakeComplete) {
        this._logBuffer.push(log);
      } else {
        this._otherPort.postMessage({
          type: MESSAGE_TYPE_LOG,
          data: log
        });
      }
    }
    sendMetrics(metrics) {
      if (!this._handshakeComplete) {
        this._metricsBuffer.push(metrics);
      } else {
        this._otherPort.postMessage({
          type: MESSAGE_TYPE_METRICS,
          data: metrics
        });
      }
    }
    _emptyBuffers() {
      this._logBuffer.forEach((log) => this.sendLog(log));
      this._metricsBuffer.forEach((metrics) => this.sendMetrics(metrics));
      this._logBuffer = void 0;
      this._metricsBuffer = void 0;
    }
  }
  class MetricsStore {
    constructor() {
      this._upCounters = [];
      this._valueRecorders = [];
      this._bucketHistograms = [];
    }
    add(senderMetrics) {
      var _a, _b, _c;
      if ((_a = senderMetrics.upCounters) === null || _a === void 0 ? void 0 : _a.length) {
        this._upCounters.push(...senderMetrics.upCounters.map((it) => new _1.UpCounterImpl(it.name, it.ownerName, it.ownerAppName, _1.metricsUtility.getMetricsTags(it.tags), it.createdTimestamp, it.lastUpdatedTimestamp, it.value)));
      }
      if ((_b = senderMetrics.valueRecorders) === null || _b === void 0 ? void 0 : _b.length) {
        this._valueRecorders.push(...senderMetrics.valueRecorders.map((it) => new ValueRecorderImpl(it.name, it.ownerName, it.ownerAppName, _1.metricsUtility.getMetricsTags(it.tags), it.createdTimestamp, it.lastUpdatedTimestamp, it.values)));
      }
      if ((_c = senderMetrics.bucketHistograms) === null || _c === void 0 ? void 0 : _c.length) {
        this._bucketHistograms.push(...senderMetrics.bucketHistograms.map((it) => new BucketHistogramImpl(it.name, it.ownerName, it.ownerAppName, _1.metricsUtility.getMetricsTags(it.tags), it.buckets, it.createdTimestamp, it.lastUpdatedTimestamp, it.values)));
      }
    }
    getUpCounters() {
      this._upCounters = this._upCounters.filter((i) => i.getLastUpdatedOn() !== void 0);
      return this._upCounters;
    }
    getValueRecorders() {
      this._valueRecorders = this._valueRecorders.filter((i) => i.getLastUpdatedOn() !== void 0);
      return this._valueRecorders;
    }
    getBucketHistograms() {
      this._bucketHistograms = this._bucketHistograms.filter((i) => i.getLastUpdatedOn() !== void 0);
      return this._bucketHistograms;
    }
  }
  const DEFAULT_POLL_INTERVAL = 1e3;
  class SenderCollector {
    constructor(_connector, _pollInterval) {
      this._connector = _connector;
      this._pollInterval = DEFAULT_POLL_INTERVAL;
      _1.utility.requireArgument(_connector, "_connector", "object");
      if (_1.utility.requireArgumentIfDefined(_pollInterval, "_pollInterval", "number") && _pollInterval > 0) {
        this._pollInterval = _pollInterval;
      }
    }
    collect(schema, data, logMeta) {
      const msg = {
        schema,
        data,
        logMeta
      };
      this._connector.sendLog(msg);
    }
    receiveMetricsExtractors(extractors) {
      this._metricsExtractors = extractors;
      this._collectAndSendMetrics();
      setInterval(this._collectAndSendMetrics.bind(this), this._pollInterval);
    }
    _collectAndSendMetrics() {
      const metrics = {
        upCounters: _1.metricsUtility.getUpCounters(this._metricsExtractors.getAllUpCounters()),
        valueRecorders: _1.metricsUtility.getValueRecorders(this._metricsExtractors.getAllValueRecorders()),
        bucketHistograms: _1.metricsUtility.getBucketHistograms(this._metricsExtractors.getAllBucketHistograms())
      };
      if (metrics.upCounters.length || metrics.valueRecorders.length || metrics.bucketHistograms.length) {
        this._connector.sendMetrics(metrics);
      }
    }
  }
  const maxInstrumentationLength = 80;
  const defaultRootIdLength = 32;
  const truncatedText = "_CUT";
  const maxInstrumentationLengthBeforeTruncated = maxInstrumentationLength - truncatedText.length;
  function noOpFunc() {
  }
  class NextgenImpl {
    get preferredRootIdLength() {
      return this._preferredRootIdLength;
    }
    get pagePayloadProvider() {
      return this._pagePayloadProvider;
    }
    set pagePayloadProvider(provider) {
      this._pagePayloadProvider = provider;
    }
    get appPayloadProvider() {
      return this._appPayloadProvider;
    }
    set appPayloadProvider(provider) {
      this._appPayloadProvider = provider;
    }
    constructor(_idleDetector) {
      this._idleDetector = _idleDetector;
      this._logCollectors = new Set();
      this._instruments = new Map();
      this._seqBySchema = new Map();
      this._sequence = 0;
      this._forceDisabledLogCollectors = new Set();
      this._logCollectorFailures = new Map();
      this._isBufferingEnabled = false;
      this._buffer = [];
      this._logCollectionListeners = new Set();
      this._opMode = "default";
      this._isSender = false;
      this._isReceiver = false;
      this._decimalPoints = 2;
    }
    registerApp(name, options) {
      var _a, _b;
      _1.utility.requireArgument(name, "name", "string");
      if (this._appInstr) {
        throw new Error("An app has already been registered with instrumentation.");
      }
      const instr = this._instruments.get(name);
      if (instr) {
        throw new Error(`The instrumentation name ${name} is already taken`);
      }
      _1.co11y.setOwnerAppName(name);
      this._initOpMode(options === null || options === void 0 ? void 0 : options.operationMode);
      this._isSender = this._opMode === "sender";
      this._isReceiver = this._opMode === "receiver";
      if ((options === null || options === void 0 ? void 0 : options.decimalPoints) !== void 0) {
        this._decimalPoints = options.decimalPoints;
      }
      this._preferredRootIdLength = (_a = options === null || options === void 0 ? void 0 : options.preferredRootIdLength) !== null && _a !== void 0 ? _a : defaultRootIdLength;
      this._clientSessionId = ((_b = options === null || options === void 0 ? void 0 : options.clientSessionId) === null || _b === void 0 ? void 0 : _b.toString()) || _1.utility.generateUniqueId();
      this._appInstr = new AppInstrumentationImpl(this, name, options === null || options === void 0 ? void 0 : options.allowMultipleRootActivities);
      this._instruments.set(name, this._appInstr);
      if (this._isSender) {
        const senderCollector = new SenderCollector(new SenderConnector(window, options === null || options === void 0 ? void 0 : options.allowedReceiverOrigins), options === null || options === void 0 ? void 0 : options.senderMetricsPollingInterval);
        this.registerLogCollector(senderCollector);
        this.registerMetricsCollector(senderCollector);
      } else if (this._isReceiver) {
        this._metricsStore = new MetricsStore();
        this._receiverConnector = new ReceiverConnector((msg) => {
          msg.logMeta.receiverClientSessionId = this._clientSessionId;
          msg.logMeta.receiverRootId = this._appInstr.getSingleRootActivityId();
          this._multiplex(msg.schema, msg.data, msg.logMeta);
        }, (msg) => {
          this._metricsStore.add(msg);
        }, () => {
          this._appInstr.incrementCounter("o11y-error-receiver", 1, true);
        });
      }
      this._isBufferingEnabled = !this._isSender && (options === null || options === void 0 ? void 0 : options.enableBuffering);
      const tracing = new Tracing(this.getInstrumentation("Network"), this._idleDetector);
      return {
        log: this._appInstr.log.bind(this._appInstr),
        error: this._appInstr.error.bind(this._appInstr),
        startActivity: this._appInstr.startActivity.bind(this._appInstr),
        domEvent: this._appInstr.domEvent.bind(this._appInstr),
        incrementCounter: this._appInstr.incrementCounter.bind(this._appInstr),
        trackValue: this._appInstr.trackValue.bind(this._appInstr),
        bucketValue: this._appInstr.bucketValue.bind(this._appInstr),
        networkInstrumentation: tracing.networkInstrumentation.bind(tracing),
        registerForLogPrompt: this._appInstr.registerForLogPrompt.bind(this._appInstr),
        activity: this._appInstr.activity.bind(this._appInstr),
        activityAsync: this._appInstr.activityAsync.bind(this._appInstr),
        startRootActivity: this._appInstr.startRootActivity.bind(this._appInstr),
        registerLogCollector: this._isSender ? noOpFunc : this.registerLogCollector.bind(this),
        registerMetricsCollector: this._isSender ? noOpFunc : this.registerMetricsCollector.bind(this),
        activateClickTracker: this.activateClickTracker.bind(this),
        deactivateClickTracker: this.deactivateClickTracker.bind(this),
        disableBuffering: this.disableBuffering.bind(this),
        promptLogCollection: this.promptLogCollection.bind(this),
        getClientSessionId: this.getClientSessionId.bind(this),
        getOperationMode: this.getOperationMode.bind(this),
        startReceiving: this._isReceiver ? this._receiverConnector.openComms.bind(this._receiverConnector) : noOpFunc,
        stopReceiving: this._isReceiver ? this._receiverConnector.closeComms.bind(this._receiverConnector) : noOpFunc
      };
    }
    getInstrumentation(name) {
      _1.utility.requireArgument(name, "name", "string");
      if (name.length > maxInstrumentationLength) {
        name = name.substring(0, maxInstrumentationLengthBeforeTruncated) + truncatedText;
      }
      let instr = this._instruments.get(name);
      if (!instr) {
        instr = new InstrumentationImpl(this, name);
        this._instruments.set(name, instr);
      } else if (instr === this._appInstr) {
        throw new Error(`The instrumentation name ${name} is being used by the app.`);
      }
      return instr;
    }
    get appName() {
      var _a;
      return (_a = this._appInstr) === null || _a === void 0 ? void 0 : _a.name;
    }
    getRootActivityHistoryEntryByTime(atTime) {
      var _a;
      return (_a = this._appInstr) === null || _a === void 0 ? void 0 : _a.getRootActivityHistoryEntry(atTime);
    }
    addLog(loggerName, schema, data, timestamp, rootId2) {
      var _a, _b, _c;
      _1.payloadUtility.checkInputs(schema, data);
      this._sequence += 1;
      const isInternal = _1.schemaUtil.isInternal(schema);
      const userSchema = isInternal && (data === null || data === void 0 ? void 0 : data.userPayload) ? data.userPayload.schema : schema;
      const schemaId = _1.schemaUtil.getSchemaId(userSchema);
      let schemaSequence = this._seqBySchema.get(schemaId) || 0;
      schemaSequence += 1;
      this._seqBySchema.set(schemaId, schemaSequence);
      const logMeta = {
        timestamp,
        rootId: rootId2,
        sequence: this._sequence,
        schemaSequence,
        loggerName,
        pagePayload: void 0,
        appPayload: void 0,
        loggerAppName: this.appName,
        connectionType: _1.utility.getConnectionType(),
        clientSessionId: this._clientSessionId,
        age: _1.utility.getAge(timestamp)
      };
      const payloadArgs = {
        schema,
        data,
        logMeta
      };
      logMeta.pagePayload = _1.payloadUtility.getPayloadFromProvider(this.pagePayloadProvider, payloadArgs);
      logMeta.appPayload = _1.payloadUtility.getPayloadFromProvider(this.appPayloadProvider, payloadArgs);
      if (!this._isSender) {
        data = _1.utility.clone(data);
      }
      if (typeof this._decimalPoints === "number") {
        _1.utility.roundNumbersInObject(data, this._decimalPoints);
        if (isInternal) {
          _1.utility.roundNumbersInObject((_a = data.userPayload) === null || _a === void 0 ? void 0 : _a.payload, this._decimalPoints);
        }
        _1.utility.roundNumbersInObject((_b = logMeta.pagePayload) === null || _b === void 0 ? void 0 : _b.payload, this._decimalPoints);
        _1.utility.roundNumbersInObject((_c = logMeta.appPayload) === null || _c === void 0 ? void 0 : _c.payload, this._decimalPoints);
      }
      if (this._isBufferingEnabled) {
        const bufferedLog = {
          schema,
          data,
          logMeta
        };
        this._buffer.push(bufferedLog);
      }
      this._multiplex(schema, data, logMeta);
      return this._sequence;
    }
    _multiplex(schema, data, logMeta) {
      const eligibleCollectors = Array.from(this._logCollectors).filter((collector) => {
        var _a;
        return !this._forceDisabledLogCollectors.has(collector) && !((_a = collector.getIsCollectDisabled) === null || _a === void 0 ? void 0 : _a.call(collector));
      });
      if (eligibleCollectors.length > 0) {
        for (const collector of eligibleCollectors) {
          let failures = this._logCollectorFailures.get(collector) || 0;
          try {
            collector.collect(schema, data, logMeta);
            if (failures > 0) {
              this._logCollectorFailures.set(collector, failures - 1);
            }
          } catch (err) {
            failures += 1;
            if (failures >= NextgenImpl._collectorFailureLimit) {
              this._forceDisabledLogCollectors.add(collector);
              if (this._appInstr && (typeof err === "string" || err instanceof Error)) {
                this._appInstr.error(err);
              }
            } else {
              this._logCollectorFailures.set(collector, failures);
            }
          }
        }
      }
    }
    getBuffer() {
      return this._buffer;
    }
    disableBuffering() {
      this._isBufferingEnabled = false;
      this._buffer = [];
    }
    getClickTracker() {
      return this._autoClickTracker;
    }
    getDefaultInstrumentationContext() {
      var _a, _b;
      return {
        rootId: (_a = this._appInstr) === null || _a === void 0 ? void 0 : _a.getSingleRootActivityId(),
        isRootActivitySampled: (_b = this._appInstr) === null || _b === void 0 ? void 0 : _b.isSingleRootActivitySampled()
      };
    }
    activateClickTracker() {
      if (typeof document !== "undefined") {
        if (!this._autoClickTracker) {
          this._autoClickTracker = new AutomaticClickTracker(this._appInstr, document);
        }
        this._autoClickTracker.activate();
      }
    }
    deactivateClickTracker() {
      if (this._autoClickTracker) {
        this._autoClickTracker.deactivate();
        this._autoClickTracker = void 0;
      }
    }
    registerLogCollector(collector, options) {
      _1.utility.requireArgument(collector, "collector");
      if (this._logCollectors.has(collector)) {
        return;
      }
      this._logCollectors.add(collector);
      this._logCollectorFailures.set(collector, 0);
      if ((!collector.getIsCollectDisabled || !collector.getIsCollectDisabled()) && (options === null || options === void 0 ? void 0 : options.retroactive)) {
        for (const log of this._buffer) {
          collector.collect(log.schema, log.data, log.logMeta);
        }
      }
    }
    registerMetricsCollector(collector) {
      _1.utility.requireArgument(collector, "collector");
      if (this._metricsCollector) {
        throw new Error("A metrics Collector is already registered.");
      }
      this._metricsCollector = collector;
      this._metricsCollector.receiveMetricsExtractors({
        getAllUpCounters: this._getAllUpCounters.bind(this),
        getAllValueRecorders: this._getAllValueRecorders.bind(this),
        getAllBucketHistograms: this._getAllBucketHistograms.bind(this)
      });
    }
    _getAllUpCounters() {
      var _a;
      return (((_a = this._metricsStore) === null || _a === void 0 ? void 0 : _a.getUpCounters()) || []).concat(Array.from(this._instruments.values()).map((instr) => instr.getUpCounters()).flat()).concat(_1.co11y.getUpCounters());
    }
    _getAllValueRecorders() {
      var _a;
      return (((_a = this._metricsStore) === null || _a === void 0 ? void 0 : _a.getValueRecorders()) || []).concat(Array.from(this._instruments.values()).map((instr) => instr.getValueRecorders()).flat()).concat(_1.co11y.getValueRecorders());
    }
    _getAllBucketHistograms() {
      var _a;
      return (((_a = this._metricsStore) === null || _a === void 0 ? void 0 : _a.getBucketHistograms()) || []).concat(Array.from(this._instruments.values()).map((instr) => instr.getBucketHistograms()).flat()).concat(_1.co11y.getBucketHistograms());
    }
    registerForLogPrompt(listener) {
      this._logCollectionListeners.add(listener);
    }
    promptLogCollection(reason) {
      for (const listener of this._logCollectionListeners.keys()) {
        try {
          listener(reason);
        } catch (err) {
          if (!_1.utility.isProduction) {
            throw err;
          }
        }
      }
    }
    getClientSessionId() {
      return this._clientSessionId;
    }
    _initOpMode(opMode) {
      if (typeof opMode === "function") {
        opMode = opMode();
      }
      if (opMode === void 0 || typeof window !== "object") {
        opMode = "default";
      }
      if (["default", "receiver", "sender"].indexOf(opMode) >= 0) {
        this._opMode = opMode;
      } else {
        throw new Error(`Invalid operation mode: ${opMode}`);
      }
    }
    getOperationMode() {
      return this._opMode;
    }
  }
  NextgenImpl._collectorFailureLimit = 5;
  class Index {
    get _lazyNextGen() {
      if (!this._nextgen) {
        this._nextgen = new NextgenImpl(this._idleDetector);
      }
      return this._nextgen;
    }
    constructor(_idleDetector) {
      this._idleDetector = _idleDetector;
      _1.utility.requireArgument(_idleDetector, "_idleDetector");
    }
    registerInstrumentedApp(name, options) {
      const retVal = this._lazyNextGen.registerApp(name, options);
      if (options) {
        _1.utility.markProduction(options.isProduction);
        this._nextgen.appPayloadProvider = options.appPayloadProvider;
        this._nextgen.pagePayloadProvider = options.pagePayloadProvider;
      }
      return retVal;
    }
    getInstrumentation(name) {
      return this._lazyNextGen.getInstrumentation(name);
    }
  }
  const time = _1.utility.time.bind(_1.utility);
  const lightningLoggerSchemaId = "sfcore.customCmp.CustomComponentLog";
  const bgColorMap = {
    Error: "Crimson",
    Activity: "CadetBlue",
    InstrumentedEvent: "DarkOliveGreen",
    O11ySample: "BlueViolet"
  };
  const colorMap = {
    Error: "white",
    Activity: "white",
    InstrumentedEvent: "white",
    O11ySample: "white"
  };
  const defaultColor = "black";
  const defaultBgColor = "Gainsboro";
  class ConsoleCollector {
    constructor(environment) {
      this._simpleFilters = new Set();
      this._regexFilters = [];
      if (environment) {
        this._log("ConsoleCollector", environment);
      }
    }
    collect(schema, data, logMeta) {
      const id2 = _1.schemaUtil.getSchemaId(schema);
      if (!this._shouldLog(id2)) {
        return;
      }
      if (id2 === lightningLoggerSchemaId) {
        this._logCustom(data);
        return;
      }
      let label, color, bgColor;
      if (_1.schemaUtil.isInternal(schema)) {
        label = schema.name;
        color = colorMap[schema.name] || defaultColor;
        bgColor = bgColorMap[schema.name] || defaultBgColor;
      } else {
        label = id2;
      }
      this._log(label, data, logMeta, color, bgColor);
    }
    _shouldLog(schemaId) {
      if (this._simpleFilters.size == 0 && this._regexFilters.length == 0) {
        return true;
      }
      return this._simpleFilters.has(schemaId) || this._regexFilters.some((r) => r.test(schemaId));
    }
    addFilter(filter) {
      if (filter instanceof RegExp) {
        this._regexFilters.push(filter);
      } else {
        this._simpleFilters.add(filter);
      }
    }
    removeFilter(filter) {
      if (filter instanceof RegExp) {
        const index2 = this._regexFilters.findIndex((r) => r.source === filter.source);
        if (index2 >= 0) {
          this._regexFilters.splice(index2, 1);
        }
      } else {
        this._simpleFilters.delete(filter);
      }
    }
    clearFilters() {
      this._simpleFilters.clear();
      this._regexFilters.splice(0, this._regexFilters.length);
    }
    getFilters() {
      const filters = Array.from(this._simpleFilters);
      return filters.concat(this._regexFilters).sort();
    }
    _log(label, first, second, color = defaultColor, bgColor = defaultBgColor) {
      const css = `color:${color};background-color:${bgColor}`;
      console.log(`%cO11Y%c ${label}`, "color:white;background-color:#FF6600;font-weight:bold", css, first || "", second || "");
    }
    _logCustom(data) {
      console.log("%clightning/logger", "color:white;background-color:#00a1e0;font-weight:bold", data || "");
    }
  }
  const version = "252.11.0";
  const idleDetector = new IdleDetectorImpl({
    logThreshold: 300,
    reportListener: (report) => {
      idleDetectorInstr === null || idleDetectorInstr === void 0 ? void 0 : idleDetectorInstr.log(_252_76_0.idleDetectorReportSchema, report);
    },
    errorListener: (e, text) => {
      idleDetectorInstr === null || idleDetectorInstr === void 0 ? void 0 : idleDetectorInstr.error(e, text);
    }
  });
  const index = new Index(idleDetector);
  const registerInstrumentedApp = index.registerInstrumentedApp.bind(index);
  const getInstrumentation = index.getInstrumentation.bind(index);
  const idleDetectorInstr = getInstrumentation("IdleDetector");
  exports.ConsoleCollector = ConsoleCollector;
  exports._version = version;
  exports.getInstrumentation = getInstrumentation;
  exports.idleDetector = idleDetector;
  exports.registerInstrumentedApp = registerInstrumentedApp;
  exports.time = time;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("o11y/client", ["exports", "o11y/client/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/o11y/v/1", ["exports"], function(exports) {
  "use strict";
  const _o11y = {};
  exports._o11y = _o11y;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/o11y", ["exports", "webruntime/o11y/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/expressions/v/1", ["exports"], function(exports) {
  "use strict";
  let CONTEXT;
  const DEFAULT_DATE = "1970-01-01T";
  const ISO_DATE = "T00:00:00";
  const PROP_PROVIDER = "provider";
  const PROP_PROVIDERS = "providers";
  function isObjectLike(value) {
    return value !== null && typeof value === "object";
  }
  function createJsDate(value) {
    try {
      const containsTime = value?.indexOf(":") > -1;
      const containsDate = value?.indexOf("-") > -1;
      if (value === "" || !containsTime && !containsDate) {
        return null;
      }
      if (typeof value === "string") {
        if (!containsDate) {
          value = DEFAULT_DATE + value;
        }
        if (!containsTime) {
          value = value + ISO_DATE;
        }
        value = value.trim().replace(" ", "T");
        if (!value.endsWith("Z")) {
          value += "Z";
        }
      }
      return new Date(value);
    } catch (e) {
      return null;
    }
  }
  function exprClosure(fn) {
    try {
      const result = fn();
      const providers = Reflect.get(this, PROP_PROVIDERS);
      for (const provider of providers) {
        if (!provider?.hasData?.()) {
          throw new Error();
        }
      }
      return result ?? null;
    } catch (e) {
      return void 0;
    }
  }
  function exprProvider(provider) {
    if (isObjectLike(this)) {
      Reflect.set(this, PROP_PROVIDER, provider);
      Reflect.get(this, PROP_PROVIDERS).push(provider);
    }
    return provider?.getData?.();
  }
  function exprGlobal(route = {}, prop) {
    if (!!route && Object.prototype.hasOwnProperty.call(route, prop)) {
      return route[prop];
    }
  }
  function exprFilter(value, filter) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    const r = value.filter(filter);
    if (!r.length) {
      return void 0;
    }
    return r.length === 1 ? r[0] : r;
  }
  function exprMember(data, name) {
    if (isObjectLike(this) && Reflect.has(this, PROP_PROVIDER)) {
      const provider = Reflect.get(this, PROP_PROVIDER);
      Reflect.deleteProperty(this, PROP_PROVIDER);
      if (!provider?.hasData?.(name)) {
        throw new Error();
      }
      const providers = Reflect.get(this, PROP_PROVIDERS);
      const i = providers.indexOf(provider);
      i >= 0 && providers.splice(providers.indexOf(provider), 1);
    }
    if (typeof name === "string" && Array.isArray(data)) {
      data = data.map((entry) => entry[name]).filter((entry) => entry !== void 0);
      if (data.length === 0) {
        return void 0;
      }
      if (data.length === 1) {
        return data[0];
      }
      return data;
    }
    return data?.[name];
  }
  function exprFunction() {
    return void 0;
  }
  const EXPR_RUNTIME = {
    toDate(value) {
      if (value != null) {
        const d = createJsDate(value)?.setUTCHours(0, 0, 0, 0);
        if (d !== void 0 && !isNaN(d)) {
          return new Date(d);
        }
      }
      return null;
    },
    toTime(value) {
      if (value != null) {
        const d = createJsDate(value)?.setUTCFullYear(1970, 0, 1);
        if (d !== void 0 && !isNaN(d)) {
          return new Date(d);
        }
      }
      return null;
    },
    toDatetime(value) {
      if (value != null) {
        return createJsDate(value);
      }
      return null;
    },
    isBlank(value) {
      return !value && typeof value !== "number";
    },
    contains(value1, value2) {
      if (value1 != null) {
        return value1.includes(value2);
      }
      return false;
    },
    begins(value1, value2) {
      if (value2 == null) {
        return true;
      } else if (value1 != null) {
        return value1.toString().startsWith(value2.toString());
      }
      return false;
    }
  };
  const EXPR_CLOSURE = (...args) => {
    CONTEXT = {
      [PROP_PROVIDERS]: [],
      [PROP_PROVIDER]: null
    };
    return exprClosure.apply(CONTEXT, args);
  };
  const EXPR_PROVIDER = (...args) => exprProvider.apply(CONTEXT, args);
  const EXPR_MEMBER = (...args) => exprMember.apply(CONTEXT, args);
  const EXPR_GLOBAL = (...args) => exprGlobal.apply(CONTEXT, args);
  const EXPR_FILTER = (...args) => exprFilter.apply(CONTEXT, args);
  const EXPR_FUNCTION = (...args) => exprFunction.apply(CONTEXT, args);
  exports.EXPR_CLOSURE = EXPR_CLOSURE;
  exports.EXPR_FILTER = EXPR_FILTER;
  exports.EXPR_FUNCTION = EXPR_FUNCTION;
  exports.EXPR_GLOBAL = EXPR_GLOBAL;
  exports.EXPR_MEMBER = EXPR_MEMBER;
  exports.EXPR_PROVIDER = EXPR_PROVIDER;
  exports.EXPR_RUNTIME = EXPR_RUNTIME;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/expressions", ["exports", "webruntime/expressions/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/routerContainer/v/1", ["exports", "lwc/v/7_1_5", "webruntime/errors/v/1_66_768-252_0", "lwr/navigation/v/0_13_10", "webruntime/routingService/v/1", "webruntime/defaultView/v/1_66_768-252_0"], function(exports, _7_1_5, _1_66_768252_0, _0_13_10, _1, defaultView) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var defaultView__default = /* @__PURE__ */ _interopDefaultLegacy(defaultView);
  var _tmpl = void 0;
  class RouterContainer extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this.view = void 0;
      this._routeParams = void 0;
      this.generatedTemplateHtml = void 0;
      this.previousRouteParams = {};
      this.requiredParameters = ["contentTypeName", "name", "objectApiName", "recordId", "relationshipApiName", "term", "urlAlias"];
      this.attributes = {};
      this.route = {};
    }
    get routeParams() {
      return this._routeParams || {};
    }
    set routeParams(value) {
      this._routeParams = value;
    }
    render() {
      return this.generatedTemplateHtml;
    }
    connectedCallback() {
      const view = this.view || defaultView__default["default"];
      this.generatedTemplateHtml = view.html;
      this.attributes = view.attributes(this, this.routeParams);
      this.subscription = _1.subscribe(this.routeChange.bind(this));
    }
    viewChange(view) {
      _1.handleExtraRouteParams(this.route);
      this.generatedTemplateHtml = view.html;
      const {
        state,
        attributes
      } = this.route;
      this._routeParams = {
        ...state,
        ...attributes
      };
      this.attributes = view.attributes(this, this.routeParams);
    }
    routeChange(routingResult) {
      this.route = routingResult.route || null;
    }
    disconnectedCallback() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
    errorCallback(error, wcstack) {
      _1_66_768252_0.reportError({
        subject: "router level error",
        error,
        wcstack
      });
    }
  }
  RouterContainer.renderMode = "light";
  _7_1_5.registerDecorators(RouterContainer, {
    publicProps: {
      view: {
        config: 0
      },
      routeParams: {
        config: 3
      }
    },
    wire: {
      viewChange: {
        adapter: _0_13_10.CurrentView,
        method: 1,
        config: function($cmp) {
          return {};
        }
      }
    },
    fields: ["_routeParams", "generatedTemplateHtml", "previousRouteParams", "requiredParameters", "attributes", "route"]
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(RouterContainer, {
    tmpl: _tmpl,
    sel: "webruntime-router-container",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/routerContainer", ["exports", "webruntime/routerContainer/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/componentContainer/v/1", ["exports", "lwc/v/7_1_5"], function(exports, _7_1_5) {
  "use strict";
  function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
    var hostSelector = token ? "." + token + "-host" : "";
    return (useActualHostSelector ? ":host {" : hostSelector + " {") + "display: flow-root;}";
  }
  stylesheet.$scoped$ = true;
  var _implicitScopedStylesheets = [stylesheet];
  const stc0 = {
    key: 0
  };
  const stc1 = [];
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {s: api_slot} = $api;
    return [api_slot("", stc0, stc1, $slotset)];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.slots = [""];
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-4k1qbp7cls1";
  tmpl.legacyStylesheetToken = "webruntime-componentContainer_componentContainer";
  if (_implicitScopedStylesheets) {
    tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
  }
  _7_1_5.freezeTemplate(tmpl);
  class ComponentContainer extends _7_1_5.LightningElement {
  }
  ComponentContainer.renderMode = "light";
  const __lwc_component_class_internal = _7_1_5.registerComponent(ComponentContainer, {
    tmpl: _tmpl,
    sel: "webruntime-component-container",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/componentContainer", ["exports", "webruntime/componentContainer/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/slotContainer/v/1", ["exports", "lwc/v/7_1_5"], function(exports, _7_1_5) {
  "use strict";
  const stc0 = [];
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {s: api_slot} = $api;
    return [$cmp.isVisible ? api_slot("", {
      key: 0,
      slotData: $cmp.variations
    }, stc0, $slotset) : null];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.slots = [""];
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-769n4j124ma";
  tmpl.legacyStylesheetToken = "webruntime-slotContainer_slotContainer";
  _7_1_5.freezeTemplate(tmpl);
  class SlotContainer extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this.visibilityExpression = void 0;
      this.hidden = void 0;
      this.variationExpressions = void 0;
    }
    get isVisible() {
      return this.hidden ? !this.visibilityExpression : this.visibilityExpression;
    }
    get variations() {
      const variationMap = {};
      const foundVariationToShow = !!this.variationExpressions?.find((el) => {
        return el === true;
      });
      const variationIndexToShow = this.variationExpressions?.findIndex((el) => {
        return el === true;
      });
      const isAnyVariationUndefined = this.variationExpressions?.findIndex((el) => {
        return typeof el === "undefined";
      }) !== -1;
      this.variationExpressions?.forEach(function(expr, idx) {
        const key = `variation${idx + 1}`;
        if (isAnyVariationUndefined || foundVariationToShow && variationIndexToShow !== idx) {
          variationMap[key] = false;
        } else if (expr === true) {
          variationMap[key] = true;
        } else if (typeof expr === "undefined") {
          variationMap[key] = false;
        } else {
          variationMap[key] = false;
        }
      });
      variationMap.variation0 = !foundVariationToShow && !isAnyVariationUndefined;
      return variationMap;
    }
  }
  SlotContainer.renderMode = "light";
  _7_1_5.registerDecorators(SlotContainer, {
    publicProps: {
      visibilityExpression: {
        config: 0
      },
      hidden: {
        config: 0
      },
      variationExpressions: {
        config: 0
      }
    }
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(SlotContainer, {
    tmpl: _tmpl,
    sel: "webruntime-slot-container",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/slotContainer", ["exports", "webruntime/slotContainer/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/visibilityContainer/v/1", ["exports", "lwr/loaderLegacy/v/0_13_10", "lwc/v/7_1_5", "@app/isDesignMode/v/1"], function(exports, _0_13_10, _7_1_5, isDesignMode) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var isDesignMode__default = /* @__PURE__ */ _interopDefaultLegacy(isDesignMode);
  function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
    var hostSelector = token ? "." + token + "-host" : "";
    return "@media only screen and (max-width: 47.9375em) {" + (useActualHostSelector ? ":host.webruntime-visibility-container.dxp-sm-hide {" : hostSelector + ".webruntime-visibility-container.dxp-sm-hide {") + "display: none;}}@media only screen and (min-width: 48em) and (max-width: 64em) {" + (useActualHostSelector ? ":host.webruntime-visibility-container.dxp-md-hide {" : hostSelector + ".webruntime-visibility-container.dxp-md-hide {") + "display: none;}}@media only screen and (min-width: 64.0625em) {" + (useActualHostSelector ? ":host.webruntime-visibility-container.dxp-lg-hide {" : hostSelector + ".webruntime-visibility-container.dxp-lg-hide {") + "display: none;}}";
  }
  stylesheet.$scoped$ = true;
  var _implicitScopedStylesheets = [stylesheet];
  const stc0 = {
    key: 0
  };
  const stc1 = [];
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {s: api_slot} = $api;
    return [!$cmp.hidden ? api_slot("", stc0, stc1, $slotset) : null];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.slots = [""];
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-7ethp7o0ig8";
  tmpl.legacyStylesheetToken = "webruntime-visibilityContainer_visibilityContainer";
  if (_implicitScopedStylesheets) {
    tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
  }
  _7_1_5.freezeTemplate(tmpl);
  class VisibilityContainer extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this.hiddenInDesktop = false;
      this.hiddenInTablet = false;
      this.hiddenInMobile = false;
      this.hidden = true;
    }
    connectedCallback() {
      const formFactorsMetaObj = {
        Small: {
          isHidden: this.hiddenInMobile,
          mediaQuery: "only screen and (max-width: 47.9375em)",
          class: "dxp-sm-hide"
        },
        Medium: {
          isHidden: this.hiddenInTablet,
          mediaQuery: "only screen and (min-width: 48em) and (max-width: 64em)",
          class: "dxp-md-hide"
        },
        Large: {
          isHidden: this.hiddenInDesktop,
          mediaQuery: "only screen and (min-width: 64.0625em)",
          class: "dxp-lg-hide"
        }
      };
      let visibileMQ = "";
      Object.values(formFactorsMetaObj).forEach((value) => {
        if (value.isHidden) {
          this.classList.add(value.class);
        } else {
          visibileMQ += visibileMQ ? `, ${value.mediaQuery}` : value.mediaQuery;
        }
      });
      if (isDesignMode__default["default"]) {
        this.classList.add("interactions-element", "webruntime-design-visibility-container");
      } else {
        this.classList.add("webruntime-visibility-container");
      }
      _0_13_10.load("webruntime/formFactor/v/1").then(({
        getFormFactor
      }) => {
        if (typeof window !== "undefined" && !isDesignMode__default["default"] && formFactorsMetaObj[getFormFactor()].isHidden) {
          if (visibileMQ) {
            const visibileMQL = window.matchMedia(visibileMQ);
            const mediaQueryHandler = (e) => {
              if (e.matches) {
                this.hidden = false;
                visibileMQL.removeEventListener("change", mediaQueryHandler);
              }
            };
            visibileMQL.addEventListener("change", mediaQueryHandler);
          }
        } else {
          this.hidden = false;
        }
      });
    }
  }
  VisibilityContainer.renderMode = "light";
  VisibilityContainer.validationOptOut = ["class"];
  _7_1_5.registerDecorators(VisibilityContainer, {
    publicProps: {
      hiddenInDesktop: {
        config: 0
      },
      hiddenInTablet: {
        config: 0
      },
      hiddenInMobile: {
        config: 0
      }
    },
    track: {
      hidden: 1
    }
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(VisibilityContainer, {
    tmpl: _tmpl,
    sel: "webruntime-visibility-container",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/visibilityContainer", ["exports", "webruntime/visibilityContainer/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/viewchangeNotifier/v/1", ["exports", "lwc/v/7_1_5", "lwr/navigation/v/0_13_10", "@app/deployTarget/v/1", "webruntime/routingService/v/1"], function(exports, _7_1_5, _0_13_10, deployTarget, _1) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var deployTarget__default = /* @__PURE__ */ _interopDefaultLegacy(deployTarget);
  function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
    var hostSelector = token ? "[" + token + "-host]" : "";
    return (useActualHostSelector ? ":host {" : hostSelector + " {") + "display: none;}";
  }
  var _implicitStylesheets = [stylesheet];
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {d: api_dynamic_text, t: api_text} = $api;
    return [api_text(api_dynamic_text($cmp.routeParamString))];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-1j18phjg883";
  tmpl.legacyStylesheetToken = "webruntime-viewchangeNotifier_viewchangeNotifier";
  if (_implicitStylesheets) {
    tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
  }
  _7_1_5.freezeTemplate(tmpl);
  const REQUIRED_PARAMETERS = ["contentTypeName", "name", "objectApiName", "recordId", "relationshipApiName", "term", "urlAlias"];
  function filterRequiredParameters(params) {
    return Object.keys(params).reduce((filteredObj, key) => {
      if (REQUIRED_PARAMETERS.includes(key)) {
        filteredObj[key] = params[key];
      }
      return filteredObj;
    }, {});
  }
  function isObjectEqual(o1, o2) {
    if (o1 === o2)
      return true;
    if (!o1 || !o2)
      return false;
    return Object.keys(o1).length === Object.keys(o2).length && Object.entries(o2).every(([k, v]) => o1[k] === v);
  }
  class ViewchangeNotifier extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this.routeChangeSubscription = void 0;
      this.route = void 0;
      this.routeParams = void 0;
      this.previousRouteParams = void 0;
    }
    connectedCallback() {
      if (deployTarget__default["default"] === "MRT") {
        requestAnimationFrame(() => {
          this.route = _1.getCurrentRoute().route;
          this.updateRouteParams();
        });
      }
      this.routeChangeSubscription = _1.subscribe(this.routeChange.bind(this));
    }
    routeChange(routingResult) {
      this.route = routingResult.route;
    }
    viewChange() {
      this.updateRouteParams();
    }
    updateRouteParams() {
      const {
        state,
        attributes
      } = this.route || {};
      this.routeParams = filterRequiredParameters({
        ...state,
        ...attributes
      });
    }
    renderedCallback() {
      if (!this.routeParams)
        return;
      if (!_1.isCurrentRouteCanonicallyRedirected() && !isObjectEqual(this.previousRouteParams, this.routeParams)) {
        this.dispatchEvent(new CustomEvent("viewchange", {
          bubbles: true,
          composed: true,
          detail: {
            route: this.route
          }
        }));
      }
      this.previousRouteParams = this.routeParams;
    }
    disconnectedCallback() {
      this.routeChangeSubscription?.unsubscribe();
    }
    get routeParamString() {
      return window.btoa(JSON.stringify(this.routeParams));
    }
  }
  _7_1_5.registerDecorators(ViewchangeNotifier, {
    wire: {
      viewChange: {
        adapter: _0_13_10.CurrentView,
        method: 1,
        config: function($cmp) {
          return {};
        }
      }
    },
    fields: ["routeChangeSubscription", "route", "routeParams", "previousRouteParams"]
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(ViewchangeNotifier, {
    tmpl: _tmpl,
    sel: "webruntime-viewchange-notifier",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/viewchangeNotifier", ["exports", "webruntime/viewchangeNotifier/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/analyticsEvents/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  class ScrollToBottomEvent {
    constructor() {
      this.hasTriggered = false;
      this.hasAddedListener = false;
      this.trigger = () => this._trigger();
    }
    _trigger() {
      if (!this.hasTriggered) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const percent = scrollTop / (scrollHeight - document.documentElement.clientHeight) * 100;
        if (percent >= 90) {
          document.dispatchEvent(new CustomEvent("experience_interaction", {
            bubbles: true,
            composed: true,
            detail: {
              name: "page-scroll-to-bottom"
            }
          }));
          this.hasTriggered = true;
        }
      }
    }
    addListener() {
      if (!this.hasAddedListener) {
        document.addEventListener("scroll", this.trigger);
      }
      this.hasAddedListener = true;
      this.hasTriggered = false;
    }
    removeListener() {
      document.removeEventListener("scroll", this.trigger);
      this.hasAddedListener = false;
    }
  }
  exports.ScrollToBottomEvent = ScrollToBottomEvent;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/analyticsEvents", ["exports", "webruntime/analyticsEvents/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/pageDataLayerObject/v/1", ["exports", "lwc/v/7_1_5", "experience/dataLayerObject/v/250_25_0", "webruntime/analyticsEvents/v/1_66_768-252_0"], function(exports, _7_1_5, _experienceDataLayerObject, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var _experienceDataLayerObject__default = /* @__PURE__ */ _interopDefaultLegacy(_experienceDataLayerObject);
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {c: api_custom_element} = $api;
    return [api_custom_element("experience-data-layer-object", _experienceDataLayerObject__default["default"], {
      props: {
        scriptDataAttributes: $cmp.pageDataForDataLayer.scriptDataAttributes,
        customObject: $cmp.pageDataForDataLayer.customObject
      },
      key: 0
    })];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.renderMode = "light";
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-1k5dp68c4pi";
  tmpl.legacyStylesheetToken = "webruntime-pageDataLayerObject_pageDataLayerObject";
  _7_1_5.freezeTemplate(tmpl);
  class PageDataLayerObject extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this.handleViewChanged = (evt) => this._handleViewChanged(evt);
      this.pageDataForDataLayer = {
        scriptDataAttributes: {
          providerType: "page"
        }
      };
      this.scrollToBottomEvent = new _1_66_768252_0.ScrollToBottomEvent();
    }
    connectedCallback() {
      document.addEventListener("viewchange", this.handleViewChanged);
    }
    disconnectedCallback() {
      document.removeEventListener("viewchange", this.handleViewChanged);
      this.scrollToBottomEvent.removeListener();
    }
    renderedCallback() {
      if (this.pageDataForDataLayer?.customObject) {
        this.dispatchEvent(new CustomEvent("experience_interaction", {
          bubbles: true,
          composed: true,
          detail: {
            name: "page-view"
          }
        }));
      }
    }
    _handleViewChanged(evt) {
      const recordId = evt.detail?.route?.attributes?.recordId;
      const contentTypeName = evt.detail?.route?.attributes?.contentTypeName;
      const urlAlias = evt.detail?.route?.attributes?.urlAlias;
      const contentKey = evt.detail?.route?.attributes?.contentKey;
      const customObject = {
        type: evt.detail?.route?.pageReference?.type,
        url: window.location.href,
        urlReferrer: this.pageDataForDataLayer?.customObject?.url || document.referrer,
        ...recordId ? {
          recordId
        } : {},
        ...contentTypeName ? {
          contentTypeName
        } : {},
        ...urlAlias ? {
          urlAlias
        } : {},
        ...contentKey ? {
          contentKey
        } : {}
      };
      this.pageDataForDataLayer = {
        ...this.pageDataForDataLayer,
        customObject
      };
      this.scrollToBottomEvent.addListener();
    }
  }
  PageDataLayerObject.renderMode = "light";
  _7_1_5.registerDecorators(PageDataLayerObject, {
    fields: ["handleViewChanged", "pageDataForDataLayer", "scrollToBottomEvent"]
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(PageDataLayerObject, {
    tmpl: _tmpl,
    sel: "webruntime-page-data-layer-object",
    apiVersion: 62
  });
  exports["default"] = __lwc_component_class_internal;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/pageDataLayerObject", ["exports", "webruntime/pageDataLayerObject/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/serverRouter/v/0_13_10", ["exports", "lwr/contextProvider/v/0_13_10", "lwr/metrics/v/0_13_10", "lwr/navigation/v/0_13_10", "lwr/navigationMixinHacks/v/0_13_10", "lwr/profiler/v/0_13_10", "lwr/router/v/0_13_10", "lwr/routerErrors/v/0_13_10", "lwr/routerUtils/v/0_13_10"], function(exports, _0_13_10$3, _0_13_10$6, _0_13_10$2, _0_13_10$4, _0_13_10$5, _0_13_10$7, _0_13_10$1, _0_13_10) {
  "use strict";
  class ServerRouter {
    constructor(config, router, target) {
      this.contextId = Object.freeze(() => void 0);
      this.router = router;
      this.target = target;
      this.handleNavHook = config.handleNavigation;
      this.preNavHook = config.preNavigate;
      this.errorNavHook = config.errorNavigate;
      this.initWires(config.url);
    }
    async navigate(address, _replace, options) {
      if (_0_13_10.hasDocument) {
        if (this.handleNavHook && !this.handleNavHook(address)) {
          return;
        }
        const url = await this.getValidatedUrl(address, options);
        if (url) {
          document.location.href = url;
        }
      }
    }
    generateUrl(address, options) {
      return this.router.generateUrl(address, options);
    }
    initWires(url) {
      if (!url && _0_13_10.hasDocument) {
        url = document.location.href;
      }
      if (!url) {
        this.processError(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.NO_INIT_URL));
        return;
      }
      url = this.getRelativeUrl(url);
      const routingMatch = this.router.matchRoute(url, {});
      if (!routingMatch) {
        this.processError(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.MISSING_ROUTE, [url]));
        return;
      }
      this.currentRoute = routingMatch;
      _0_13_10$2.registerNavigationHelm(this.contextId, {
        navigate: (address, replace, options) => this.navigate(address, replace, options),
        generateUrl: (address, options) => this.generateUrl(address, options),
        subscribe: () => {
          throw new Error("The server router does not support the subscribe API");
        }
      });
      _0_13_10$3.provideContext(this.contextId, this.target, _0_13_10$3.navigationContextContextualizer, _0_13_10$2.NavigationContext);
      _0_13_10$3.provideContext(this.currentRoute?.route.pageReference, this.target, _0_13_10$3.currentPageReferenceContextualizer, _0_13_10$2.CurrentPageReference);
      if (_0_13_10.hasDocument) {
        this.target.addEventListener(_0_13_10$4.CONTEXT_ID_BACKDOOR, (event) => {
          const navCtxEvent = event;
          if (navCtxEvent.detail.callback) {
            navCtxEvent.detail.callback(this.contextId);
          }
        });
      }
    }
    getRelativeUrl(url) {
      if (url.startsWith("http")) {
        const parsed = new URL(url);
        return `${parsed.pathname}${parsed.search}`;
      }
      return url;
    }
    async getValidatedUrl(address, options) {
      const routingMatch = this.router.matchRoute(address, {});
      if (!routingMatch) {
        this.processError(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.NO_ROUTE_MATCH, [JSON.stringify(address)]));
        return;
      }
      const valid = this.preNavHook && await this.preNavHook({
        current: this.currentRoute,
        next: routingMatch
      });
      if (!valid) {
        this.processError(_0_13_10$1.generateMessageObject(_0_13_10$1.messages.PRENAV_FAILED, [JSON.stringify(address)]));
        return;
      }
      return this.router.generateUrl(address, options);
    }
    processError(messageObject) {
      _0_13_10$5.logOperationStart({
        id: _0_13_10$6.ROUTER_ERROR
      });
      this.errorNavHook && this.errorNavHook(messageObject);
    }
  }
  function createServerRouter(config, target) {
    new ServerRouter(config, _0_13_10$7.createRouter(config), target);
  }
  exports.ServerRouter = ServerRouter;
  exports.createServerRouter = createServerRouter;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/serverRouter", ["exports", "lwr/serverRouter/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/router/v/0_13_10", ["exports", "lwr/routerUtils/v/0_13_10", "lwr/routerErrors/v/0_13_10", "lwr/observable/v/0_13_10"], function(exports, _0_13_10$1, _0_13_10$2, _0_13_10) {
  "use strict";
  class RouterImpl {
    constructor(config) {
      this.deprecatedConfig = {};
      this.routeHandlerId = 0;
      this.compiledRoutes = [];
      this.routeObservable = _0_13_10.createObservable();
      this.config = {
        basePath: config.basePath || "",
        i18n: config.i18n || _0_13_10$1.DEFAULT_I18N_ROUTER_CONFIG,
        caseSensitive: Boolean(config.caseSensitive),
        routes: config.routes || [],
        generateUrl: (address, options) => _0_13_10$1.getUrlFromPageReference(address, this.compiledRoutes, this.config.basePath, this.config.i18n, options),
        parseUrl: (url) => _0_13_10$1.getPageReferenceFromUrl(url, this.compiledRoutes, this.config.basePath, this.config.i18n)
      };
      const {
        DEPRECATED_getRouteFromUrl,
        DEPRECATED_getUrlFromRoute
      } = config;
      if (DEPRECATED_getRouteFromUrl) {
        this.deprecatedConfig.DEPRECATED_getRouteFromUrl = DEPRECATED_getRouteFromUrl;
      }
      if (DEPRECATED_getUrlFromRoute) {
        this.deprecatedConfig.DEPRECATED_getUrlFromRoute = DEPRECATED_getUrlFromRoute;
      }
      this.compiledRoutes = _0_13_10$1.parseRoutes(this.config);
    }
    generateUrl(address, options) {
      const {
        DEPRECATED_getUrlFromRoute: getUrlFromRoute
      } = this.deprecatedConfig;
      if (getUrlFromRoute) {
        return getUrlFromRoute(address, this.config.generateUrl, options);
      } else {
        return this.config.generateUrl(address, options);
      }
    }
    parseUrl(url) {
      const {
        DEPRECATED_getRouteFromUrl: getRouteFromUrl
      } = this.deprecatedConfig;
      if (getRouteFromUrl) {
        return getRouteFromUrl(url, this.config.parseUrl);
      } else {
        return this.config.parseUrl(url);
      }
    }
    matchRoute(address, options) {
      const url = typeof address === "string" ? address : this.generateUrl(address, options);
      if (url === null) {
        return null;
      }
      const match = _0_13_10$1.matchRouteByUrl(url, this.compiledRoutes, this.config.basePath, this.config.i18n, options);
      const pathMatch = match && _0_13_10$1.getUrlFromPageReferenceAndRouteDef(match.route.pageReference, match.routeDefinition, this.config.basePath, this.config.i18n, options);
      if (!match || !pathMatch) {
        return null;
      }
      return {
        pathMatch,
        route: match.route,
        routeDefinition: match.routeDefinition.original
      };
    }
    async resolveView(address, options) {
      return new Promise((resolve, reject) => {
        const routingMatch = this.matchRoute(address, options);
        if (!routingMatch) {
          return reject(_0_13_10$2.generateMessage(_0_13_10$2.messages.NO_ROUTE_MATCH, [JSON.stringify(address)]));
        }
        return routingMatch.routeDefinition.handler?.().then((handlerModule) => {
          const routeHandlerClass = handlerModule.default;
          if (!routeHandlerClass) {
            return reject(_0_13_10$2.generateMessage(_0_13_10$2.messages.INVALID_ROUTE_HANDLER, [routingMatch.routeDefinition.id]));
          }
          const routeHandler = new routeHandlerClass(resolve);
          if (routeHandler) {
            routeHandler.update(routingMatch.route);
          }
        });
      });
    }
    navigate(address, options) {
      const routingMatch = this.matchRoute(address, options);
      if (!routingMatch) {
        throw new Error(_0_13_10$2.generateMessage(_0_13_10$2.messages.MISSING_ROUTE, [JSON.stringify(address)]));
      }
      this.pendingRoute = {
        ...routingMatch
      };
      this._mapView(this.pendingRoute);
    }
    subscribe(callback, replay) {
      return this.routeObservable.subscribe({
        next: callback,
        error: () => {
        },
        complete: () => {
        }
      }, Boolean(replay));
    }
    async _mapView(routingMatch) {
      const routeHandlerId = Math.random();
      this.routeHandlerId = routeHandlerId;
      const handlerModule = await routingMatch.routeDefinition.handler?.();
      const routeHandlerClass = handlerModule?.default;
      if (!routeHandlerClass) {
        throw new Error(_0_13_10$2.generateMessage(_0_13_10$2.messages.INVALID_ROUTE_HANDLER, [routingMatch.routeDefinition.id]));
      }
      this.routeHandler = new routeHandlerClass((routeDestination) => {
        this._updateView(routeHandlerId, routeDestination);
      });
      if (this.routeHandler) {
        this.routeHandler.update(routingMatch.route);
      }
      return true;
    }
    _updateView(viewHandlerId, routeDestination) {
      if (!routeDestination || viewHandlerId !== this.routeHandlerId) {
        return;
      }
      if (!this.pendingRoute) {
        throw new Error("Trying to commit route state without a route");
      }
      const viewset = _0_13_10$1.freeze(routeDestination.viewset);
      this.routeObservable.next({
        ...this.pendingRoute,
        ...routeDestination,
        viewset
      });
    }
  }
  function createRouter(config = {}) {
    return new RouterImpl(config);
  }
  exports.createRouter = createRouter;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/router", ["exports", "lwr/router/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/a11yService/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  const ARIA_LIVE_ID = "sf-aria-live";
  const TAB_INDEX_ATTR_NAME = "tabindex";
  const {
    document: document2
  } = globalThis;
  let previousRouteLabel;
  function ariaLiveNavigate(routingResult) {
    if (document2 && routingResult?.routeDefinition) {
      let ariaLiveRegion = document2.body.querySelector(`#${ARIA_LIVE_ID}`);
      if (!ariaLiveRegion) {
        ariaLiveRegion = document2.createElement("span");
        ariaLiveRegion.id = ARIA_LIVE_ID;
        ariaLiveRegion.setAttribute("aria-live", "polite");
        ariaLiveRegion.setAttribute("aria-atomic", "true");
        ariaLiveRegion.setAttribute("style", "position: absolute; margin: -1px; border: 0; padding: 0; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); text-transform: none; white-space: nowrap;");
        document2.body.appendChild(ariaLiveRegion);
      }
      ariaLiveRegion.innerText = routingResult.routeDefinition.label;
    }
  }
  function updateTitle(routingResult) {
    if (!document2) {
      return;
    }
    const newRouteLabel = routingResult?.routeDefinition?.label;
    const useRouteLabel = !previousRouteLabel || document2.title === previousRouteLabel;
    if (newRouteLabel != null && useRouteLabel) {
      document2.title = routingResult.routeDefinition.label;
    }
    previousRouteLabel = newRouteLabel;
  }
  function updateFocus(resetFocus) {
    if (!document2) {
      return;
    }
    const treeWalker = document2.createTreeWalker(document2.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (e) => {
        if (e.matches("webruntime-router-container")) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    });
    const element = resetFocus ? document2.body : treeWalker.nextNode();
    if (element) {
      element.setAttribute(TAB_INDEX_ATTR_NAME, "-1");
      element.focus({
        preventScroll: true
      });
      element.removeAttribute(TAB_INDEX_ATTR_NAME);
    }
  }
  exports.ARIA_LIVE_ID = ARIA_LIVE_ID;
  exports.TAB_INDEX_ATTR_NAME = TAB_INDEX_ATTR_NAME;
  exports.ariaLiveNavigate = ariaLiveNavigate;
  exports.updateFocus = updateFocus;
  exports.updateTitle = updateTitle;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/a11yService", ["exports", "webruntime/a11yService/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/routingService/v/1", ["exports", "lwr/loaderLegacy/v/0_13_10", "@communities-webruntime/common/v/1_66_768-252_0", "@salesforce/i18n/lang/v/1", "@app/deployTarget/v/1", "@app/uiBasePath/v/1", "@app/routes/v/1", "@app/viewToThemeLayoutMap/v/1", "webruntime/views/v/1", "webruntime/a11yService/v/1_66_768-252_0", "webruntime/overrides/v/1", "webruntime/logger/v/1_66_768-252_0", "webruntime/utils/v/1_66_768-252_0", "webruntime/o11y/v/1", "lwr/router/v/0_13_10", "lwr/serverRouter/v/0_13_10", "lwr/routerErrors/v/0_13_10", "lwr/navigation/v/0_13_10", "webruntime/transport/v/1", "@app/extraRouteParams/v/1"], function(exports, _0_13_10$3, _1_66_768252_0$2, locale, deployTarget, basePath, routes, viewToThemeLayoutMap, getViewModule, _1_66_768252_0$1, _1$2, _1_66_768252_0, _1_66_768252_0$3, _1$1, _0_13_10$1, _0_13_10$2, _0_13_10$4, _0_13_10, _1, extraRouteParams) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var locale__default = /* @__PURE__ */ _interopDefaultLegacy(locale);
  var deployTarget__default = /* @__PURE__ */ _interopDefaultLegacy(deployTarget);
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var routes__default = /* @__PURE__ */ _interopDefaultLegacy(routes);
  var viewToThemeLayoutMap__default = /* @__PURE__ */ _interopDefaultLegacy(viewToThemeLayoutMap);
  var getViewModule__default = /* @__PURE__ */ _interopDefaultLegacy(getViewModule);
  var extraRouteParams__default = /* @__PURE__ */ _interopDefaultLegacy(extraRouteParams);
  function splitOptionalParameters(inputRoutes) {
    const routesWithoutOptionalParameters = [];
    const routesWithOptionalParameters = [];
    inputRoutes.forEach((route) => {
      if (route.uri.includes("?")) {
        routesWithOptionalParameters.push(route);
      } else {
        routesWithoutOptionalParameters.push(route);
      }
    });
    const splitRoutes = [];
    routesWithOptionalParameters.forEach((route) => {
      const segments = [];
      const parts = route.uri.split("/");
      let optionalSegment;
      let paramName;
      let paramType = "";
      parts.forEach((part) => {
        if (part.endsWith("?")) {
          optionalSegment = part.substring(0, part.length - 1);
          segments.push({
            value: optionalSegment,
            isOptional: true
          });
          paramName = optionalSegment.substring(1);
          paramType = route.page.attributes?.[paramName] ? "attributes" : "state";
        } else {
          segments.push({
            value: part,
            isOptional: false
          });
        }
      });
      const optionalRoute = {
        ...route,
        uri: segments.map((s) => s.value).join("/")
      };
      splitRoutes.push(optionalRoute);
      const filteredSet = {};
      Object.keys(route.page[paramType]).forEach((key) => {
        if (key !== paramName) {
          filteredSet[key] = route.page[paramType][key];
        }
      });
      const requiredRoute = {
        ...route,
        uri: segments.filter((s) => !s.isOptional).map((s) => s.value).join("/"),
        page: {
          ...route.page,
          [paramType]: filteredSet
        }
      };
      if (requiredRoute.patterns) {
        requiredRoute.patterns = Object.fromEntries(Object.entries(requiredRoute.patterns).filter(([key]) => key !== paramName));
      }
      splitRoutes.push(requiredRoute);
    });
    return [...routesWithoutOptionalParameters, ...splitRoutes];
  }
  function splitObjectPageRoutes(inputRoutes) {
    const objectPageRoutes = [];
    const nonObjectPageRoutes = [];
    inputRoutes.forEach((route) => {
      const {
        type,
        attributes = {},
        state = {}
      } = route.page || {};
      if (type === "standard__objectPage") {
        if (isParam(attributes.actionName)) {
          objectPageRoutes.push(route);
        } else {
          let otherRoute;
          if (attributes.actionName === "list") {
            otherRoute = {
              ...route,
              page: {
                ...route.page,
                attributes: {
                  ...attributes
                },
                state: {
                  ...state
                }
              }
            };
            otherRoute.page.attributes.actionName = "home";
          } else if (attributes.actionName === "home") {
            otherRoute = {
              ...route,
              page: {
                ...route.page,
                attributes: {
                  ...attributes
                },
                state: {
                  ...state
                }
              }
            };
            otherRoute.page.attributes.actionName = "list";
          } else if (!attributes.actionName) {
            route.page.attributes.actionName = "home";
            otherRoute = {
              ...route,
              page: {
                ...route.page,
                attributes: {
                  ...attributes
                },
                state: {
                  ...state
                }
              }
            };
            otherRoute.page.attributes.actionName = "list";
          }
          objectPageRoutes.push(route, otherRoute);
        }
      } else {
        nonObjectPageRoutes.push(route);
      }
    });
    return [...objectPageRoutes, ...nonObjectPageRoutes];
  }
  function isParam(str) {
    return str && str.length > 1 ? str.startsWith(":") : false;
  }
  const canonicalURLCache = {};
  let currentRoute = null;
  function parseURL(url) {
    const {
      pathname,
      search,
      hash
    } = new URL(url, window.location.origin);
    return {
      pathname,
      search,
      hash
    };
  }
  async function getCanonicalURL(url) {
    const {
      pathname,
      search,
      hash
    } = parseURL(url);
    if (canonicalURLCache[pathname]) {
      return canonicalURLCache[pathname] + search + hash;
    }
    if (Object.values(canonicalURLCache).includes(pathname)) {
      return url;
    }
    try {
      const {
        redirected,
        url: canonicalUrl
      } = await _1.fetch(url, {
        basePath: "",
        method: "HEAD",
        isNonApiRequest: true
      });
      if (redirected) {
        const canonicalPath = parseURL(canonicalUrl).pathname;
        canonicalURLCache[pathname] = canonicalPath;
        return canonicalPath + search + hash;
      }
    } catch (error) {
      _1_66_768252_0.logError(`Unable to fetch canonical URL for ${url}`, "error:\n", error);
    }
    return null;
  }
  let isCurrentRouteCanonicallyRedirectedFlag;
  async function canonicalRedirectionHandler(router, routingResult) {
    const {
      route,
      routeDefinition
    } = routingResult;
    currentRoute = route;
    if (routeDefinition?.metadata?.hasVanityURL) {
      const url = router.generateUrl(route.pageReference);
      const canonicalUrl = await getCanonicalURL(url);
      const stillOnTheSamePage = currentRoute === route;
      if (canonicalUrl && canonicalUrl !== url && stillOnTheSamePage) {
        const canonicalUrlPageRef = {
          type: "standard__webPage",
          attributes: {
            url: canonicalUrl
          }
        };
        _0_13_10.navigate(router.contextId, canonicalUrlPageRef, true);
        isCurrentRouteCanonicallyRedirectedFlag = true;
        return true;
      }
    }
    isCurrentRouteCanonicallyRedirectedFlag = false;
    return false;
  }
  function isCurrentRouteCanonicallyRedirected() {
    return isCurrentRouteCanonicallyRedirectedFlag;
  }
  let useImportedExtraRouteParams = true;
  const extraRouteParamsStore = {};
  function getStoreKeyfromPageReference(pageReference) {
    const urlName = pageReference?.attributes?.urlName || pageReference?.attributes?.urlPath;
    if (urlName) {
      const objectApiName = pageReference?.attributes?.objectApiName || "";
      return `${urlName}:${objectApiName}`;
    }
    return null;
  }
  function storeAndDeleteExtraRouteParamsFromPageReference(pageReference) {
    if (pageReference.extraRouteParams) {
      storeExtraRouteParams(pageReference, pageReference.extraRouteParams);
      delete pageReference.extraRouteParams;
    }
  }
  function storeExtraRouteParams(pageReference, extraRouteParamsToStore) {
    const storeKey = getStoreKeyfromPageReference(pageReference);
    if (!extraRouteParamsToStore || !storeKey)
      return;
    extraRouteParamsStore[storeKey] = extraRouteParamsToStore;
  }
  function needsExtraRouteParams(pageReference) {
    const storeKey = getStoreKeyfromPageReference(pageReference);
    if (storeKey && storeKey in extraRouteParamsStore) {
      const storedExtraRouteParams = extraRouteParamsStore[storeKey];
      return !(storedExtraRouteParams && Object.keys(storedExtraRouteParams).length > 0);
    }
    return !!storeKey;
  }
  function extraRouteParamsPreNavigation(routeChange = {}) {
    const {
      current,
      next: {
        url,
        route: {
          pageReference
        } = {}
      }
    } = routeChange;
    if (current && needsExtraRouteParams(pageReference)) {
      window.location.assign(url);
      return true;
    }
    return false;
  }
  function handleExtraRouteParams(route) {
    if (useImportedExtraRouteParams) {
      addExtraRouteParamsToRoute$1(route, extraRouteParams__default["default"]);
      storeExtraRouteParams(route.pageReference, extraRouteParams__default["default"]);
      useImportedExtraRouteParams = false;
    } else {
      const storeKey = getStoreKeyfromPageReference(route?.pageReference);
      const storedExtraRouteParams = extraRouteParamsStore[storeKey];
      addExtraRouteParamsToRoute$1(route, storedExtraRouteParams);
    }
  }
  function addExtraRouteParamsToRoute$1(route, extraRouteParamsToAdd) {
    if (isObject(extraRouteParamsToAdd)) {
      if (isObject(route?.attributes)) {
        route.attributes = {
          ...route.attributes,
          ...extraRouteParamsToAdd
        };
      }
      if (isObject(route?.pageReference?.attributes)) {
        route.pageReference.attributes = {
          ...route.pageReference.attributes,
          ...extraRouteParamsToAdd
        };
      }
    }
  }
  function isObject(obj) {
    return obj && typeof obj === "object";
  }
  const REDIRECT_PAGE_CONTEXT_KEY = "redirectPageContext";
  function getRedirectPageContext(route) {
    return route?.state?.[REDIRECT_PAGE_CONTEXT_KEY] || null;
  }
  function isRedirectPageContextURL(url) {
    return url?.includes(`?${REDIRECT_PAGE_CONTEXT_KEY}=`);
  }
  function redirectPageContextIfNeeded(routerContextId, defaultRouteDef2, routeChange = {}) {
    const {
      current,
      next: {
        route,
        url
      } = {}
    } = routeChange;
    const redirectUrl = isRedirectPageContextURL(url) ? url : getRedirectPageContext(route) ? generateRedirectPageContextURL(route) : null;
    if (redirectUrl) {
      if (current) {
        window.location.assign(redirectUrl);
      } else {
        _0_13_10.navigate(routerContextId, defaultRouteDef2.page, true);
      }
      return true;
    }
    return false;
  }
  function generateRedirectPageContextURL(pageReference) {
    if (!pageReference)
      return null;
    const encodedPageReference = getRedirectPageContext(pageReference) || window.btoa(window.encodeURIComponent(JSON.stringify(pageReference)));
    return `${basePath__default["default"]}/?${REDIRECT_PAGE_CONTEXT_KEY}=${encodedPageReference}`;
  }
  const ARTICLE_APINAME_ALIAS = "KnowledgeArticleVersion";
  const defaultValueConfigs = [{
    type: "standard__objectPage",
    params: [{
      name: "filterName",
      type: "state",
      value: "Default"
    }]
  }, {
    type: "standard__search",
    params: [{
      name: "term",
      type: "state",
      value: " "
    }]
  }, {
    type: "standard__recordPage",
    params: [{
      name: "recordName",
      type: "state",
      value: "detail"
    }, {
      name: "categoryPath",
      type: "state",
      value: "detail"
    }],
    match: (route, {
      name
    }) => {
      const {
        attributes = {}
      } = route;
      if (attributes.urlName || attributes.urlPath) {
        return false;
      }
      if (attributes.objectApiName === "ProductCategory") {
        return name === "categoryPath";
      }
      if (attributes.objectApiName === "OrderSummary") {
        return false;
      }
      return name === "recordName";
    }
  }];
  const CMS_ROUTE_TYPE = "standard__managedContentPage";
  function getDefaultValueRouteParamConfig(route) {
    return defaultValueConfigs.find((config2) => route.type === config2.type);
  }
  function transferParamsForManagedContentRoute(route, routes2 = []) {
    if (route?.type === CMS_ROUTE_TYPE) {
      let cmsfqn = route.attributes?.contentTypeName;
      const cmsRoute = routes2.find((r) => r.page.type === CMS_ROUTE_TYPE && r.page?.attributes?.contentTypeName === cmsfqn);
      if (!cmsRoute && ["news", "cms_image", "cms_document"].indexOf(cmsfqn) !== -1) {
        cmsfqn = cmsfqn.startsWith("cms_") ? cmsfqn.substring(4) : cmsfqn;
        route.attributes.contentTypeName = `sfdc_cms__${cmsfqn}`;
      }
      if (route.attributes && route.attributes.contentKey) {
        route.attributes.urlAlias = route.attributes.contentKey;
        delete route.attributes.contentKey;
      }
    }
    return route;
  }
  let articleObjectApiName;
  function convertArticleApiNameAlias(route, routes2) {
    if (route.attributes?.objectApiName === ARTICLE_APINAME_ALIAS) {
      if (articleObjectApiName === void 0) {
        const articleRoute = routes2.find((r) => r.page.attributes?.objectApiName?.endsWith("__kav"));
        articleObjectApiName = articleRoute?.page?.attributes?.objectApiName || null;
      }
      if (articleObjectApiName) {
        route.attributes.objectApiName = articleObjectApiName;
      }
    }
  }
  function transformRouteWithURLName(route) {
    if (!route.attributes?.urlName && !route.attributes?.urlPath)
      return route;
    if (route.type === "standard__recordPage") {
      addExtraRouteParamsToRoute(route);
      delete route.attributes.recordId;
      delete route.state?.recordName;
      delete route.state?.categoryPath;
    }
    if (route.type === "standard__recordRelationshipPage") {
      addExtraRouteParamsToRoute(route);
      delete route.attributes.recordId;
    }
    return route;
  }
  function addExtraRouteParamsToRoute(route) {
    if (route.attributes.recordId) {
      route.extraRouteParams = {
        recordId: route.attributes.recordId
      };
    }
  }
  function transformArticleRoute(route, routes2) {
    if (route.type === "standard__knowledgeArticlePage") {
      route.type = "standard__recordPage";
      route.attributes.actionName = "view";
      route.attributes.objectApiName = ARTICLE_APINAME_ALIAS;
      delete route.attributes.articleType;
    }
    convertArticleApiNameAlias(route, routes2);
    return route;
  }
  function setDefaultParameterValue(route, config2) {
    const {
      params,
      match
    } = config2;
    params.forEach((param) => {
      const {
        type,
        name,
        value
      } = param;
      if (match && !match(route, param)) {
        return;
      }
      if (!route?.[type]?.[name]) {
        if (!route[type]) {
          route[type] = {};
        }
        route[type][name] = value;
      }
    });
  }
  function setDefaultValueForParameters(route = {}) {
    const config2 = getDefaultValueRouteParamConfig(route);
    if (config2) {
      setDefaultParameterValue(route, config2);
    }
  }
  function replaceSlashEntityCharacters(route, url) {
    if (route.state?.categoryPath?.includes("/") || route.attributes?.urlPath?.includes("/")) {
      let [pathname, search] = url.split("?");
      pathname = pathname.replace(/%2F/g, "/");
      search = search ? `?${search}` : "";
      return pathname + search;
    }
    return url;
  }
  function deleteNullAttributes(route) {
    Object.entries(route?.attributes || {}).filter(([, value]) => value === null).forEach(([key]) => delete route.attributes[key]);
    return route;
  }
  class GenericRouteHandler {
    constructor(callback) {
      this.callback = callback;
    }
    dispose() {
    }
    update(routeInfo) {
      const view = processedRoutes.find((r) => r.id === routeInfo.id)?.view;
      this.callback({
        viewset: {
          default: () => getViewModule__default["default"](view)
        }
      });
    }
  }
  const {
    window: window$1,
    performance: performance2
  } = globalThis;
  const routerMark = `${_1_66_768252_0$2.WEBRUNTIME_PREFIX}-framework-router`;
  let isMRT = deployTarget__default["default"] === "MRT";
  let config;
  exports.router = void 0;
  let processedRoutes = [], defaultRouteDef, mightHavePrivateRoute;
  function initializeRouter(routes2, options) {
    performance2?.mark?.(routerMark);
    processedRoutes = splitObjectPageRoutes(splitOptionalParameters(_1_66_768252_0$2.parseRoutes(routes2)));
    processedRoutes.forEach((route) => {
      route.handler = () => new Promise((resolve) => {
        resolve({
          default: GenericRouteHandler
        });
      });
    });
    defaultRouteDef = processedRoutes.find((route) => route.metadata.isDefault);
    if (options?.isMRT != null) {
      isMRT = options.isMRT;
    }
    mightHavePrivateRoute = !isMRT && processedRoutes.every((route) => route.metadata.isPublic !== false);
    config = {
      basePath: basePath__default["default"],
      caseSensitive: true,
      routes: processedRoutes,
      i18n: {
        locale: locale__default["default"],
        defaultLocale: locale__default["default"]
      },
      DEPRECATED_getRouteFromUrl: getRouteFromUrl,
      DEPRECATED_getUrlFromRoute: getUrlFromRoute
    };
    exports.router = _0_13_10$1.createRouter(config);
    performance2?.measure?.(routerMark, routerMark);
  }
  initializeRouter(routes__default["default"]);
  const initialRoute = getCurrentRoute();
  if (initialRoute) {
    _1_66_768252_0$1.updateTitle(initialRoute);
  }
  let o11yRouterSupport;
  let serverRouter;
  function getContextId() {
    return serverRouter?.contextId || exports.router.contextId;
  }
  function getRouteFromUrl(url, defaultImpl) {
    const route = defaultImpl(url);
    if (!route) {
      if (defaultRouteDef?.page) {
        return defaultRouteDef.page;
      }
      return null;
    }
    setDefaultValueForParameters(route);
    return route;
  }
  function getUrlFromRoute(route = {
    type: "",
    attributes: {},
    state: {}
  }, defaultImpl) {
    const {
      type,
      attributes = {},
      state = {}
    } = route;
    let url;
    const clwrRoute = JSON.parse(JSON.stringify(route));
    if (type === "standard__webPage") {
      url = attributes.url;
      return url == null ? "" : addBasePath(url);
    }
    if (type === "comm__loginPage") {
      if (attributes.actionName === "login") {
        const startUrl = state.startUrl != null ? `?startURL=${encodeURIComponent(state.startUrl)}` : "";
        return addBasePath(`${_1_66_768252_0$2.WEBRUNTIME_LOGIN_PATH}${startUrl}`);
      }
      if (attributes.actionName === "logout") {
        return addBasePath(_1_66_768252_0$2.WEBRUNTIME_LOGOUT_PATH);
      }
    }
    if (type === "standard__managedContentPage") {
      transferParamsForManagedContentRoute(clwrRoute, processedRoutes);
    }
    transformArticleRoute(clwrRoute, processedRoutes);
    transformRouteWithURLName(clwrRoute);
    setDefaultValueForParameters(clwrRoute);
    deleteNullAttributes(clwrRoute);
    url = defaultImpl(clwrRoute);
    if (type === "standard__recordPage") {
      url = replaceSlashEntityCharacters(clwrRoute, url);
    }
    if (!url && mightHavePrivateRoute) {
      url = generateRedirectPageContextURL(clwrRoute);
    }
    storeAndDeleteExtraRouteParamsFromPageReference(clwrRoute);
    return url;
  }
  async function handleLoginRedirectionPreNav(routeChange) {
    const {
      route,
      routeDefinition
    } = routeChange.next;
    return handleLoginRedirection(routeDefinition, route.pageReference);
  }
  async function handleLoginRedirection(routeDefinition, address) {
    if (routeDefinition?.metadata?.isPublic !== false) {
      return false;
    }
    const {
      default: user
    } = await _0_13_10$3.load("@app/user/v/1");
    if (user.isGuest) {
      const url = typeof address === "string" ? address : generateUrl(address);
      if (url && window$1) {
        if (isMRT) {
          const {
            default: loginPath
          } = await _0_13_10$3.load("@app/loginPath/v/1");
          navigateToLogin(loginPath, url);
        } else {
          window$1.location.href = url;
        }
      }
      return true;
    }
    return false;
  }
  function navigateToLogin(loginPath, startURL) {
    const loginUrl = new URL(loginPath, window$1.location.href);
    if (startURL) {
      loginUrl.searchParams.set("startURL", startURL);
    }
    window$1.location.assign(loginUrl.href);
  }
  function navigateToLogout(logoutPath) {
    const logoutUrl = new URL(logoutPath, window$1.location.href);
    window$1.location.assign(logoutUrl.href);
  }
  function handleRedirectPageContext(routeChange) {
    return redirectPageContextIfNeeded(getContextId(), defaultRouteDef, routeChange);
  }
  function handleSsrTransition(routeChange) {
    const {
      current,
      next
    } = routeChange;
    if (current && next && current.routeDefinition.ssr !== next.routeDefinition.ssr) {
      const url = generateUrl(next.route.pageReference);
      if (url) {
        window$1.location.assign(url);
        return true;
      }
    }
    return false;
  }
  function handleLandingPageNavigation(routeChange) {
    const {
      current,
      next: {
        pathMatch,
        route = {}
      }
    } = routeChange;
    const {
      pageReference: {
        type,
        attributes = {}
      }
    } = route;
    if (!current)
      return false;
    if (type === "standard__managedContentPage") {
      const {
        contentTypeName
      } = attributes;
      if (contentTypeName === "sfdc_cms__landingPage") {
        window$1.location.assign(pathMatch);
        return true;
      }
    }
    return false;
  }
  async function handleErrorEvent(event) {
    handleError(event.detail);
  }
  async function handleError(eventMsg) {
    try {
      if (!window$1?.location)
        return;
      const {
        address,
        message,
        code
      } = eventMsg;
      _1_66_768252_0.logError(`Routing error: ${message}`);
      if (code === _0_13_10$4.messages.PRENAV_FAILED.code) {
        return;
      }
      if (code === _0_13_10$4.messages.MISSING_ROUTE.code && !defaultRouteDef && isRedirectPageContextURL(address)) {
        window$1.location.assign(address);
        return;
      }
      if (defaultRouteDef?.metadata?.isPublic === false) {
        const {
          default: user
        } = await _0_13_10$3.load("@app/user/v/1");
        if (user.isGuest) {
          return;
        }
      }
      const currentPath = basePath__default["default"] ? window$1.location.pathname.replace(basePath__default["default"], "") : window$1.location.pathname;
      if (defaultRouteDef && currentPath !== defaultRouteDef.uri) {
        navigate(defaultRouteDef.page);
      }
    } finally {
      o11yRouterSupport?.errorNavigate(eventMsg);
    }
  }
  function handleNavigationEvent(event) {
    if (!handleNavigation(event.detail.address)) {
      event.preventDefault();
    }
  }
  function handleNavigation(pageReference) {
    if (!_1$2.NavigationOverrides.runSync(pageReference)) {
      return false;
    }
    const {
      type,
      attributes = {},
      state = {}
    } = pageReference;
    if (type === "standard__webPage") {
      const {
        url
      } = attributes;
      if (url == null)
        return true;
      if (_1_66_768252_0$3.isAbsoluteURL(url) || _1_66_768252_0$3.isSfdcCoreURL(url)) {
        window$1?.open(url);
        return false;
      }
      const matchedRouteDef = exports.router.parseUrl(url);
      const routeNotFound = !matchedRouteDef || matchedRouteDef === defaultRouteDef?.page;
      if (mightHavePrivateRoute && routeNotFound) {
        window$1?.location.assign(addBasePath(url));
        return false;
      }
    } else if (type === "comm__loginPage") {
      const {
        actionName
      } = attributes;
      if (actionName === "login") {
        navigateToLogin(addBasePath(_1_66_768252_0$2.WEBRUNTIME_LOGIN_PATH), state.startUrl || "");
        return false;
      } else if (actionName === "logout") {
        navigateToLogout(addBasePath(_1_66_768252_0$2.WEBRUNTIME_LOGOUT_PATH));
        return false;
      }
    }
    return true;
  }
  function addBasePath(url) {
    if (_1_66_768252_0$3.isAbsoluteURL(url)) {
      return url;
    }
    const baseMissing = basePath__default["default"] && url !== basePath__default["default"] && url.indexOf(`${basePath__default["default"]}/`) !== 0;
    return baseMissing ? `${basePath__default["default"]}${url}` : url;
  }
  function navigate(pageRef) {
    _0_13_10.navigate(getContextId(), pageRef);
  }
  function generateUrl(pageRef) {
    if (serverRouter) {
      return serverRouter.generateUrl(pageRef);
    }
    return exports.router.generateUrl(pageRef);
  }
  function subscribe(callback, replay = true) {
    if (typeof window$1 !== "undefined") {
      return exports.router.subscribe(callback, replay);
    }
    return null;
  }
  async function handlePrenavigate(routeChange, event) {
    o11yRouterSupport?.preNavigate(routeChange);
    _1$2.PreNavigateOverrides.run(routeChange);
    if (serverRouter && await handleLoginRedirectionPreNav(routeChange)) {
      return false;
    } else if (!serverRouter) {
      handleLoginRedirectionPreNav(routeChange);
    }
    if (handleLandingPageNavigation(routeChange)) {
      event?.preventDefault();
      return false;
    }
    if (handleRedirectPageContext(routeChange)) {
      event?.preventDefault();
      return false;
    }
    if (extraRouteParamsPreNavigation(routeChange)) {
      event?.preventDefault();
      return false;
    }
    if (handleSsrTransition(routeChange)) {
      event?.preventDefault();
      return false;
    }
    return true;
  }
  let previousThemeLayout;
  async function handlePrenavigateEvent(event) {
    const routeChange = event.detail;
    const currentView = routeChange.current?.routeDefinition.view;
    if (currentView) {
      previousThemeLayout = viewToThemeLayoutMap__default["default"][currentView];
    } else {
      previousThemeLayout = null;
    }
    await handlePrenavigate(routeChange, event);
  }
  async function handlePostnavigateEvent(event) {
    const routingResult = event.detail;
    const view = routingResult.routeDefinition?.view;
    const resetFocusToThemeRegion = previousThemeLayout !== viewToThemeLayoutMap__default["default"][view];
    try {
      _1_66_768252_0$1.ariaLiveNavigate(routingResult);
      _1_66_768252_0$1.updateTitle(routingResult);
      _1_66_768252_0$1.updateFocus(resetFocusToThemeRegion);
      await canonicalRedirectionHandler(exports.router, routingResult);
    } finally {
      o11yRouterSupport?.postNavigate(routingResult);
    }
  }
  function initializeRouterContainer(routerContainer) {
    o11yRouterSupport = _1$1._o11y.routingSupport;
    routerContainer.addEventListener("prenavigate", handlePrenavigateEvent);
    routerContainer.addEventListener("handlenavigation", handleNavigationEvent);
    routerContainer.addEventListener("postnavigate", handlePostnavigateEvent);
    routerContainer.addEventListener("errornavigate", handleErrorEvent);
  }
  function getCurrentRoute() {
    if (!window$1?.location)
      return {};
    const url = window$1.location.href.substring(window$1.location.origin.length);
    const matchedRoute = exports.router.matchRoute(url);
    const routeDefinition = matchedRoute?.routeDefinition || defaultRouteDef;
    const route = matchedRoute?.route || {
      id: defaultRouteDef?.id,
      pageReference: defaultRouteDef?.page,
      attributes: defaultRouteDef?.page?.attributes,
      state: defaultRouteDef?.page?.state
    };
    return {
      routeDefinition,
      url,
      route
    };
  }
  function initializeServerRouter(eventTarget, url) {
    if (!isMRT) {
      return;
    }
    if (serverRouter && typeof window$1 !== "undefined") {
      return;
    }
    const {
      routeDefinition: currentRouteDef,
      url: currentUrl
    } = initialRoute;
    if (currentRouteDef && !currentRouteDef.ssr) {
      return;
    }
    if (currentRouteDef && currentUrl) {
      handleLoginRedirection(currentRouteDef, currentUrl);
    }
    const serverRouterConfig = {
      ...config,
      url,
      handleNavigation,
      preNavigate: handlePrenavigate,
      errorNavigate: handleError
    };
    serverRouter = new _0_13_10$2.ServerRouter(serverRouterConfig, exports.router, eventTarget);
  }
  exports.generateUrl = generateUrl;
  exports.getCurrentRoute = getCurrentRoute;
  exports.handleExtraRouteParams = handleExtraRouteParams;
  exports.initializeRouter = initializeRouter;
  exports.initializeRouterContainer = initializeRouterContainer;
  exports.initializeServerRouter = initializeServerRouter;
  exports.isCurrentRouteCanonicallyRedirected = isCurrentRouteCanonicallyRedirected;
  exports.navigate = navigate;
  exports.subscribe = subscribe;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/routingService", ["exports", "webruntime/routingService/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/overrides/v/1", ["exports"], function(exports) {
  "use strict";
  class Overrides {
    constructor() {
      this.overrides = [];
    }
    add(f) {
      this.overrides.push(f);
    }
    run(...args) {
      return this.overrides.length === 0 ? Promise.resolve(true) : this.overrides.reduce((previous, current) => {
        return previous.then((val) => {
          return val === false ? Promise.resolve(false) : Promise.resolve(current(...args));
        });
      }, Promise.resolve(true)).then((val) => {
        return Promise.resolve(val);
      });
    }
    runSync(...args) {
      return this.overrides.length === 0 ? true : this.overrides.reduce((previous, current) => {
        return previous === true ? current(...args) : false;
      }, true);
    }
  }
  const PreNavigateOverrides = new Overrides(), NavigationOverrides = new Overrides(), SessionTimeoutOverrides = new Overrides(), PageNavigationFailureOverrides = new Overrides();
  exports.NavigationOverrides = NavigationOverrides;
  exports.Overrides = Overrides;
  exports.PageNavigationFailureOverrides = PageNavigationFailureOverrides;
  exports.PreNavigateOverrides = PreNavigateOverrides;
  exports.SessionTimeoutOverrides = SessionTimeoutOverrides;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/overrides", ["exports", "webruntime/overrides/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/views/v/1", ["exports", "lwr/loaderLegacy/v/0_13_10", "@communities-webruntime/common/v/1_66_768-252_0"], function(exports, _0_13_10, _1_66_768252_0) {
  "use strict";
  function getViewModule(devName) {
    return _0_13_10.load(_1_66_768252_0.getViewModuleSpecifier(devName), "webruntime/views/v/1");
  }
  exports["default"] = getViewModule;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/views", ["exports", "webruntime/views/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/formFactor/v/1", ["exports"], function(exports) {
  "use strict";
  function isMedium() {
    return typeof window !== "undefined" && window.matchMedia("only screen and (min-width: 48em) and (max-width: 64em)").matches;
  }
  function isSmall() {
    return typeof window !== "undefined" && window.matchMedia("only screen and (max-width: 47.9375em)").matches;
  }
  function getFormFactor() {
    if (isMedium())
      return "Medium";
    if (isSmall())
      return "Small";
    return "Large";
  }
  const EVALUATED_FORM_FACTOR = getFormFactor();
  exports["default"] = EVALUATED_FORM_FACTOR;
  exports.getFormFactor = getFormFactor;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/formFactor", ["exports", "webruntime/formFactor/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("wire-service/v/1", ["exports"], function(exports) {
  "use strict";
  function isUndefined(obj) {
    return obj === void 0;
  }
  const ValueChangedEventType = "ValueChangedEvent";
  class ValueChangedEvent {
    constructor(value) {
      this.type = ValueChangedEventType;
      this.value = value;
    }
  }
  const {
    freeze,
    defineProperty,
    isExtensible
  } = Object;
  const DeprecatedWiredElementHost = "$$DeprecatedWiredElementHostKey$$";
  const DeprecatedWiredParamsMeta = "$$DeprecatedWiredParamsMetaKey$$";
  function register(adapterId, adapterEventTargetCallback) {
    if (adapterId == null || !isExtensible(adapterId)) {
      throw new TypeError("adapter id must be extensible");
    }
    if (typeof adapterEventTargetCallback !== "function") {
      throw new TypeError("adapter factory must be a callable");
    }
    if ("adapter" in adapterId) {
      throw new TypeError("adapter id is already associated to an adapter factory");
    }
    const AdapterClass = class extends LegacyWireAdapterBridge {
      constructor(dataCallback) {
        super(dataCallback);
        adapterEventTargetCallback(this.eventTarget);
      }
    };
    freeze(AdapterClass);
    freeze(AdapterClass.prototype);
    defineProperty(adapterId, "adapter", {
      writable: false,
      configurable: false,
      value: AdapterClass
    });
  }
  function registerWireService() {
  }
  const {
    forEach,
    splice: ArraySplice,
    indexOf: ArrayIndexOf
  } = Array.prototype;
  const CONNECT = "connect";
  const DISCONNECT = "disconnect";
  const CONFIG = "config";
  function removeListener(listeners, toRemove) {
    const idx = ArrayIndexOf.call(listeners, toRemove);
    if (idx > -1) {
      ArraySplice.call(listeners, idx, 1);
    }
  }
  function isEmptyConfig(config) {
    return Object.keys(config).length === 0;
  }
  function isValidConfig(config, params) {
    return params.length === 0 || params.some((param) => !isUndefined(config[param]));
  }
  function isDifferentConfig(newConfig, oldConfig, params) {
    return params.some((param) => newConfig[param] !== oldConfig[param]);
  }
  class LegacyWireAdapterBridge {
    constructor(callback) {
      this.connecting = [];
      this.disconnecting = [];
      this.configuring = [];
      this.isFirstUpdate = true;
      this.callback = callback;
      this.wiredElementHost = callback[DeprecatedWiredElementHost];
      this.dynamicParamsNames = callback[DeprecatedWiredParamsMeta];
      this.eventTarget = {
        addEventListener: (type, listener) => {
          switch (type) {
            case CONNECT: {
              this.connecting.push(listener);
              break;
            }
            case DISCONNECT: {
              this.disconnecting.push(listener);
              break;
            }
            case CONFIG: {
              this.configuring.push(listener);
              if (this.currentConfig !== void 0) {
                listener.call(void 0, this.currentConfig);
              }
              break;
            }
            default:
              throw new Error(`Invalid event type ${type}.`);
          }
        },
        removeEventListener: (type, listener) => {
          switch (type) {
            case CONNECT: {
              removeListener(this.connecting, listener);
              break;
            }
            case DISCONNECT: {
              removeListener(this.disconnecting, listener);
              break;
            }
            case CONFIG: {
              removeListener(this.configuring, listener);
              break;
            }
            default:
              throw new Error(`Invalid event type ${type}.`);
          }
        },
        dispatchEvent: (evt) => {
          if (evt instanceof ValueChangedEvent) {
            const value = evt.value;
            this.callback(value);
          } else if (evt.type === "wirecontextevent") {
            return this.wiredElementHost.dispatchEvent(evt);
          } else {
            throw new Error(`Invalid event type ${evt.type}.`);
          }
          return false;
        }
      };
    }
    update(config) {
      if (this.isFirstUpdate) {
        this.isFirstUpdate = false;
        if (!isEmptyConfig(config) && !isValidConfig(config, this.dynamicParamsNames)) {
          return;
        }
      }
      if (isUndefined(this.currentConfig) || isDifferentConfig(config, this.currentConfig, this.dynamicParamsNames)) {
        this.currentConfig = config;
        forEach.call(this.configuring, (listener) => {
          listener.call(void 0, config);
        });
      }
    }
    connect() {
      forEach.call(this.connecting, (listener) => listener.call(void 0));
    }
    disconnect() {
      forEach.call(this.disconnecting, (listener) => listener.call(void 0));
    }
  }
  exports.ValueChangedEvent = ValueChangedEvent;
  exports.register = register;
  exports.registerWireService = registerWireService;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("wire-service", ["exports", "wire-service/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("@salesforce/client/formFactor/v/1", ["exports"], function(exports) {
  "use strict";
  function isMedium() {
    return typeof window !== "undefined" && window.matchMedia("only screen and (min-width: 48em) and (max-width: 64em)").matches;
  }
  function isSmall() {
    return typeof window !== "undefined" && window.matchMedia("only screen and (max-width: 47.9375em)").matches;
  }
  function getFormFactor() {
    if (isMedium())
      return "Medium";
    if (isSmall())
      return "Small";
    return "Large";
  }
  const EVALUATED_FORM_FACTOR = getFormFactor();
  exports["default"] = EVALUATED_FORM_FACTOR;
  exports.getFormFactor = getFormFactor;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("@salesforce/client/formFactor", ["exports", "@salesforce/client/formFactor/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("@communities-webruntime/common/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  var LOCKER_DEFAULT_ENABLED = true;
  var LABELS_DEFAULT_DIR = "src/labels";
  var TRUSTED_COMPONENTS = [
    "lwr",
    "assert",
    "logger",
    "webruntime",
    "webruntime/*",
    "mobileruntime/hybridAppManager",
    "@view",
    "@view/*",
    "@app",
    "@app/*",
    "@design",
    "@design/*",
    "@lwrjs",
    "webruntimedesign",
    "webruntimedesign/*",
    "@luvio",
    "@luvio/*",
    "aura-instrumentation",
    "aura",
    "instrumentation/service",
    "instrumentation/utility",
    "aura-storage",
    "transport",
    "wire-service",
    "force/ldsAdaptersAnalyticsDataService",
    "force/ldsAdaptersAnalyticsSmartDataDiscovery",
    "force/ldsAdaptersAnalyticsWave",
    "force/ldsAdaptersAnalyticsWavePrivate",
    "force/ldsAdaptersApex",
    "force/ldsAdaptersCmsAuthoring",
    "force/ldsAdaptersCmsDelivery",
    "force/ldsAdaptersCmsType",
    "force/ldsAdaptersCommerceCatalog",
    "force/ldsAdaptersCommerceSearch",
    "force/ldsAdaptersCommerceStorePricing",
    "force/ldsAdaptersCommunityMicrobatching",
    "force/ldsAdaptersCommunityNavigationMenu",
    "force/ldsAdaptersCommunitySeo",
    "force/ldsAdaptersCommunitySitesSearch",
    "force/ldsAdaptersExperienceMarketingIntegration",
    "force/ldsAdaptersGraphql",
    "force/ldsAdaptersIndustriesCib",
    "force/ldsAdaptersIndustriesClm",
    "force/ldsAdaptersIndustriesDecisionMatrixDesigner",
    "force/ldsAdaptersIndustriesEinsteinAiaccelerator",
    "force/ldsAdaptersIndustriesExplainability",
    "force/ldsAdaptersIndustriesHealthcloudHpi",
    "force/ldsAdaptersIndustriesIdentityverification",
    "force/ldsAdaptersIndustriesInteresttagging",
    "force/ldsAdaptersIndustriesLoyaltyEngine",
    "force/ldsAdaptersIndustriesPublicSector",
    "force/ldsAdaptersIndustriesRcgTenantmanagement",
    "force/ldsAdaptersIndustriesRuleBuilder",
    "force/ldsAdaptersIndustriesSustainabilityBei",
    "force/ldsAdaptersIndustriesSustainabilityDgf",
    "force/ldsAdaptersIndustriesSustainabilityRecalculate",
    "force/ldsAdaptersIndustriesSustainabilityRecordLockunlock",
    "force/ldsAdaptersIndustriesSustainabilityReferenceData",
    "force/ldsAdaptersIndustriesTimeline",
    "force/ldsAdaptersIndustriesVideovisits",
    "force/ldsAdaptersMarketingAssetcreation",
    "force/ldsAdaptersPlatformAdminSuccessGuidance",
    "force/ldsAdaptersPlatformFlow",
    "force/ldsAdaptersPlatformFlowBuilder",
    "force/ldsAdaptersPlatformInteractionOrchestrator",
    "force/ldsAdaptersPlatformLearningContent",
    "force/ldsAdaptersPlatformScaleCenter",
    "force/ldsAdaptersRevenueBillingBatch",
    "force/ldsAdaptersUiapi",
    "force/ldsBindings",
    "force/ldsEngine",
    "force/luvioEngine",
    "force/ldsEngineCreator",
    "force/ldsEngineWebruntime",
    "force/ldsEnvironmentSettings",
    "force/ldsInstrumentation",
    "force/ldsNetwork",
    "force/ldsRecordData",
    "force/ldsStorage",
    "force/mobileCapabilities",
    "force/ldsAdaptersAnalyticsTableauEmbedding",
    "runtime_hybrid_capabilities/nativeCapabilities",
    "o11y",
    "o11y/*",
    "@o11y",
    "@o11y/*",
    "@salesforce",
    "@udd",
    "@perm",
    "@branding",
    "@salesforce/*",
    "@udd/*",
    "@perm/*",
    "@branding/*",
    "trustedDesign/shadowDomUtils",
    "community_builder/seoAssistant",
    "community_case/supportQuickActionLayout",
    "community_runtime/utils",
    "community_user/userSettings",
    "embeddedMessaging/container",
    "experience_messaging/embeddedMessaging",
    "community_login/checkEmail",
    "community_login/forgotPassword",
    "community_login/loginForm",
    "community_login/loginUtils",
    "community_login/selfRegister",
    "community_login/socialLogin",
    "b2c_lite_commerce/cartApi",
    "b2c_lite_commerce/checkout",
    "b2c_lite_commerce/checkoutApi",
    "b2c_lite_commerce/checkoutApiDataSource",
    "b2c_lite_commerce/checkoutRequestRetry",
    "b2c_lite_commerce/context",
    "b2c_lite_commerce/data",
    "b2c_lite_commerce/einsteinActivitiesApi",
    "b2c_lite_commerce/einsteinApi",
    "b2c_lite_commerce/einsteinProductAndPriceApi",
    "b2c_lite_commerce/heroBannerUi",
    "b2c_lite_commerce/myAccountMenu",
    "b2c_lite_commerce/orderSummary",
    "b2c_lite_commerce/store",
    "lightning",
    "lightning/*",
    "interop/button",
    "interop/buttonIcon",
    "dxp_page_layout/placeHolderDesign",
    "community_builder/richTextEditor",
    "dxp_form/baseForm",
    "dxp_form/contactForm",
    "dxp_form/dynamicForm",
    "dxp_form/layoutUtils",
    "dxp_form/leadForm",
    "dxp_base/languageSelector",
    "dxp_search/siteResults",
    "dxp_flowruntime",
    "dxp_flowruntime/*",
    "dxp_action/umaFormSubmissionAction",
    "flowruntime",
    "flowruntime/*",
    "experience/store",
    "experience/data",
    "experience/util",
    "experience/cmsDeliveryApi",
    "experience/luvioRuntime",
    "experience/personalizationApi",
    "experience/personalizationApiInternal",
    "experience/seoPropertiesApi",
    "experience/seoPropertiesApiInternal",
    "experience/userApi",
    "experience/userApiInternal",
    "wave",
    "wave/*",
    "tableau/tableauViz",
    "tableau/tableauPulse"
  ];
  var WEBRUNTIME_PREFIX = "webruntime";
  function getPrefixedURL(urlString) {
    return `/${WEBRUNTIME_PREFIX}${urlString}`;
  }
  var API_PATH_PREFIX = getPrefixedURL("/api");
  var METRICS_PATH_PREFIX = getPrefixedURL(`/log/metrics`);
  var ERRORS_PATH_PREFIX = getPrefixedURL("/log/errors");
  var CLIENT_ERROR_TYPES = {
    APEX_ACTION_ERROR: "APEX_ACTION_ERROR",
    FAILED_TO_LOAD_RESOURCE: "FAILED_TO_LOAD_RESOURCE",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    UNKNOWN_ERROR: "UNKNOWN_ERROR"
  };
  var MOBILE_APP_USER_AGENTS = {
    PUBLISHER: "CommunityHybridContainer/",
    PLAYGROUND: "playgroundcommunity"
  };
  var MAX_URL_LENGTH = 8e3;
  var WEBRUNTIME_LOGIN_PATH = "/webruntime/login";
  var WEBRUNTIME_LOGOUT_PATH = "/webruntime/logout";
  var DESIGN_COMPONENT_NAMESPACE = "@design";
  function getDesignComponentModuleSpecifier(name) {
    return `${DESIGN_COMPONENT_NAMESPACE}/${name}`;
  }
  function convertToKebabCase(str) {
    return str.replace(/(?!^)([A-Z])/g, "-$1").toLowerCase();
  }
  var moduleSpecifierPattern = new RegExp(/^[a-z-A-Z_\d]+[/:]{1}[a-zA-Z_\d]+$/);
  var elementNamePattern = new RegExp(/^([a-z][a-z\d]*)(-[a-z\d]+)*$/);
  function assert(assertion, message) {
    if (!assertion) {
      throw new Error(message);
    }
  }
  function moduleSpecifierToElementName(moduleSpecifier) {
    if (elementNamePattern.test(moduleSpecifier)) {
      return moduleSpecifier;
    }
    assert(moduleSpecifierPattern.test(moduleSpecifier), `${moduleSpecifier} is an invalid module specifier.`);
    const parts = moduleSpecifier.split(/[/:]/);
    const [namespace, name] = parts;
    assert(!namespace.includes("-"), `${moduleSpecifier}'s namespace cannot contain hyphens.`);
    return [namespace.toLowerCase(), convertToKebabCase(name)].join("-");
  }
  var WEBRUNTIME_PREFIX2 = "webruntime";
  var JS_EXTENSION = "js";
  var DEFAULT_UID = "latest";
  var RESOURCE_TYPES = {
    FRAMEWORK: "framework",
    DESIGN: "design",
    COMPONENT: "component",
    VIEW: "view",
    DESIGNCOMPONENT: "designcomponent"
  };
  function assert2(assertion, message) {
    if (!assertion) {
      throw new Error(message);
    }
  }
  function parseResourceDescriptor(resourceDescriptor) {
    const [type, nameAndLocale = ""] = resourceDescriptor.split("://");
    const [name, locale] = nameAndLocale.indexOf("@") > 0 ? nameAndLocale.split("@") : [nameAndLocale];
    return {type, name, locale};
  }
  function getResourceUrl(resource = {type: "", name: ""}, mode, uid, appendExt = true) {
    const {name} = typeof resource === "string" ? parseResourceDescriptor(resource) : resource;
    assert2(name, "Name not specified");
    const urlPrefix = getResourceUrlPrefix(resource, mode, uid);
    const extension = appendExt ? `.${JS_EXTENSION}` : "";
    return `${urlPrefix}${name}${extension}`;
  }
  function getResourceUrlPrefix(resource = {type: "", name: ""}, mode, uid) {
    const {type, locale} = typeof resource === "string" ? parseResourceDescriptor(resource) : resource;
    const isComponent = type === RESOURCE_TYPES.COMPONENT;
    assert2(type, "Type not specified");
    assert2(mode, "Mode not specified");
    assert2(locale || !isComponent, "Component locale not specified");
    return `/${WEBRUNTIME_PREFIX2}/${type}/${uid || DEFAULT_UID}/${mode}${locale ? `/${locale}` : ``}/`;
  }
  var VIEW_NAMESPACE = "@view";
  function getViewModuleSpecifier(name) {
    return `${VIEW_NAMESPACE}/${name}`;
  }
  var METADATA_PROPERTIES = ["hasVanityURL", "isDefault", "isPublic", "isRoot"];
  var TRANSFER_CONFIGS = [
    {
      type: "standard__search",
      params: [
        {
          name: "term",
          type: "state"
        }
      ]
    },
    {
      type: "standard__objectPage",
      params: [
        {
          name: "filterName",
          type: "state"
        }
      ]
    },
    {
      type: "standard__recordPage",
      params: [
        {
          name: "recordName",
          type: "state"
        },
        {
          name: "categoryPath",
          type: "state"
        }
      ],
      match: ({attributes}, {name}) => {
        if (attributes?.objectApiName === "ProductCategory") {
          return name === "categoryPath";
        }
        return name !== "categoryPath";
      }
    }
  ];
  function transferRouteParameters(route, config) {
    const {match, params} = config;
    params.forEach((paramInfo) => {
      if (match && !match(route.page, paramInfo)) {
        return;
      }
      const {type, name} = paramInfo;
      const to = type;
      const from = to === "state" ? "attributes" : "state";
      if (!route.page?.[from]?.[name]) {
        return;
      }
      if (!route.page[to]) {
        route.page[to] = {};
      }
      route.page[to][name] = route.page[from][name];
      delete route.page[from][name];
    });
  }
  function transformMultiSegmentParams(path) {
    let newPath = path;
    ["categoryPath", "urlPath"].forEach((param) => {
      newPath = newPath.replace(new RegExp(`:${param}\\+?`), `:${param}+`);
    });
    return newPath;
  }
  function getRouteParamNameFromPathSegment(segment) {
    if (!segment.startsWith(":"))
      return null;
    return segment.substring(1).replace(/[?+]/g, "");
  }
  var WITHIN_PARENTHESES_REGEXP = /\(.*\)/;
  function removeParamPatterns(path) {
    return path.split("/").map((segment) => segment.replace(WITHIN_PARENTHESES_REGEXP, "")).join("/");
  }
  function injectParamPatterns(path, patterns) {
    return path.split("/").map((segment) => {
      const key = getRouteParamNameFromPathSegment(segment);
      if (key && patterns[key]) {
        return segment.replace(key, `${key}(${patterns[key]})`);
      }
      return segment;
    }).join("/");
  }
  function bindPageAttributesToRouteParams(route) {
    if (!route.uri.includes(":"))
      return;
    if (!route.page?.type)
      return;
    route.page.attributes = route.page.attributes || {};
    route.uri.split("/").forEach((segment) => {
      const key = getRouteParamNameFromPathSegment(segment);
      if (key) {
        const value = `:${key}`;
        if (!route.page.attributes[key]) {
          route.page.attributes[key] = value;
        }
      }
    });
  }
  function parseRoutes(routes, includeParamPatterns = false) {
    return routes.map((route) => {
      if (!route.uri) {
        route.uri = route.path;
      }
      if (!route.metadata) {
        route.metadata = {};
      }
      METADATA_PROPERTIES.forEach((property) => {
        if (property in route) {
          route.metadata[property] = route[property];
          delete route[property];
        }
      });
      if (route.uri) {
        route.uri = removeParamPatterns(route.uri);
        bindPageAttributesToRouteParams(route);
      }
      if (route.patternMap) {
        route.patterns = route.patternMap;
        delete route.patternMap;
      }
      const objectApiName = route.page?.attributes?.objectApiName;
      if (objectApiName && !objectApiName.startsWith(":")) {
        route.uri = route.uri.replace(":objectApiName", objectApiName);
        if (route.patterns?.objectApiName) {
          delete route.patterns.objectApiName;
        }
      }
      const transferConfig = TRANSFER_CONFIGS.find((config) => route.page?.type === config.type);
      if (transferConfig) {
        transferRouteParameters(route, transferConfig);
      }
      const type = route.page?.type;
      if (!includeParamPatterns && type === "standard__recordPage" && ["ProductCategory", "NetworkDataCategory"].includes(route.page.attributes?.objectApiName)) {
        route.uri = transformMultiSegmentParams(route.uri);
      }
      const needsActionName = ["standard__recordPage", "standard__recordRelationshipPage"].includes(type) && !route.page?.attributes?.actionName;
      if (needsActionName) {
        route.page.attributes.actionName = "view";
      }
      if (includeParamPatterns && route.patterns) {
        route.uri = injectParamPatterns(route.uri, route.patterns);
      }
      return route;
    });
  }
  exports.API_PATH_PREFIX = API_PATH_PREFIX;
  exports.CLIENT_ERROR_TYPES = CLIENT_ERROR_TYPES;
  exports.ERRORS_PATH_PREFIX = ERRORS_PATH_PREFIX;
  exports.LABELS_DEFAULT_DIR = LABELS_DEFAULT_DIR;
  exports.LOCKER_DEFAULT_ENABLED = LOCKER_DEFAULT_ENABLED;
  exports.MAX_URL_LENGTH = MAX_URL_LENGTH;
  exports.METRICS_PATH_PREFIX = METRICS_PATH_PREFIX;
  exports.MOBILE_APP_USER_AGENTS = MOBILE_APP_USER_AGENTS;
  exports.RESOURCE_TYPES = RESOURCE_TYPES;
  exports.TRUSTED_COMPONENTS = TRUSTED_COMPONENTS;
  exports.WEBRUNTIME_LOGIN_PATH = WEBRUNTIME_LOGIN_PATH;
  exports.WEBRUNTIME_LOGOUT_PATH = WEBRUNTIME_LOGOUT_PATH;
  exports.WEBRUNTIME_PREFIX = WEBRUNTIME_PREFIX;
  exports.convertToKebabCase = convertToKebabCase;
  exports.getDesignComponentModuleSpecifier = getDesignComponentModuleSpecifier;
  exports.getResourceUrl = getResourceUrl;
  exports.getViewModuleSpecifier = getViewModuleSpecifier;
  exports.moduleSpecifierToElementName = moduleSpecifierToElementName;
  exports.parseResourceDescriptor = parseResourceDescriptor;
  exports.parseRoutes = parseRoutes;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("@communities-webruntime/common", ["exports", "@communities-webruntime/common/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
