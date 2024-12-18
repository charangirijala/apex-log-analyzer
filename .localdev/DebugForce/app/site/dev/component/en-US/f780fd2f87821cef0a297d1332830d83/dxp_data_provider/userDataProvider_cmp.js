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
