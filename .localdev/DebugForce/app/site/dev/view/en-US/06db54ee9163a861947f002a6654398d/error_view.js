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
LWR.define('@salesforce/community/Id', [], function() { return "0DBHy0000005ZrLOAU"; });
LWR.define('@salesforce/community/basePath', ['@app/basePath'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
LWR.define('@salesforce/site/activeLanguages', [], function() { return [{"label":"English (US)","code":"en-US","default":true}]; });
LWR.define('@luvio/lwc-bindings', ['force/luvioLwcBindings'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
LWR.define('@luvio/runtime', ['force/luvioRuntimeWebruntime'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
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
(function() { LWR.define('experience/config', ['exports'], (function (exports) {

  const currentRelease = {
    currentRelease: '252',
    apiVersion: 'v62.0'
  };

  exports.currentRelease = currentRelease;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
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
(function() { LWR.define('community_builder/richTextUtil', ['exports', '@salesforce/community/basePath'], (function (exports, COMMUNITY_BASE_PATH) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var COMMUNITY_BASE_PATH__default = /*#__PURE__*/_interopDefaultCompat(COMMUNITY_BASE_PATH);

    const CORE_PATH_PREFIX = '/sfsites/c';
    const CONTENT_ASSET_REGEX = /\{!contentAsset\.(.+?)\.(.+?)\}/g;
    const CMS_CONTENT_REGEX = /\{!cmsMedia\.(.+?)\}/g;
    function processContents(html, imageInfoMap) {
      let result = html;
      let tokens;
      while ((tokens = CMS_CONTENT_REGEX.exec(html)) !== null) {
        const [match, contentKey] = tokens;
        let url = getCMSContentUrl(contentKey, imageInfoMap);
        result = result.replace(match, url);
      }
      return processContentAssets(result);
    }
    function processContentsForEditMode(html) {
      let result = html;
      let tokens;
      while ((tokens = CMS_CONTENT_REGEX.exec(html)) !== null) {
        const [match, contentKey] = tokens;
        let url = getCMSContentUrlForEditMode(contentKey);
        result = result.replace(match, url);
      }
      return processContentAssets(result);
    }
    function processContentAssets(html) {
      let result = html;
      let tokens;
      while ((tokens = CONTENT_ASSET_REGEX.exec(html)) !== null) {
        const [match, assetName, version] = tokens;
        let url = getContentAssetUrl(assetName, version);
        result = result.replace(match, url);
      }
      return result;
    }
    function getPathPrefix() {
      return COMMUNITY_BASE_PATH__default.default + CORE_PATH_PREFIX;
    }
    function getCMSContentUrl(contentKey, imageInfoMap) {
      if (!isEmpty(imageInfoMap)) {
        return imageInfoMap[contentKey]?.Url;
      }
      //default to empty url, maybe use a placeholder image with base64 encoded data:image/svg+xml...?
      return '';
    }

    /**
     * Returns the CMS image url for RTE edit mode.
     * This URL will be replaced with {!cmsMedia.contentKey} when exit edit mode and saving
     * It will then be updated with the url provided by the image data provider
     *
     * @param {*} contentKey String
     */
    function getCMSContentUrlForEditMode(contentKey) {
      return `${getPathPrefix()}/cms/delivery/media/${contentKey}`;
    }
    function normalizeImageInfos(imageInfo) {
      let imageInfoMap = {};
      if (!isEmpty(imageInfo)) {
        imageInfoMap = imageInfo.reduce((acc, obj) => {
          acc[obj.ContentKey] = obj;
          return acc;
        }, {});
      }
      return imageInfoMap;
    }

    /**
     * Returns true if the value is Array or Object type and is empty.
     * All other types are considered empty.
     * @param {*} value
     * @returns {boolean}
     */
    function isEmpty(value) {
      // Check for null or undefined
      if (value == null) {
        return true;
      }
      if (Array.isArray(value)) {
        return value.length === 0;
      }

      // Check for objects
      if (typeof value === 'object') {
        return Object.keys(value).length === 0;
      }

      // For other types, treat them as empty
      return true;
    }
    function getContentAssetUrl(assetName, version) {
      return `${getPathPrefix()}/file-asset/${assetName}?v=${version}`;
    }

    exports.getCMSContentUrl = getCMSContentUrl;
    exports.getCMSContentUrlForEditMode = getCMSContentUrlForEditMode;
    exports.getPathPrefix = getPathPrefix;
    exports.isEmpty = isEmpty;
    exports.normalizeImageInfos = normalizeImageInfos;
    exports.processContentAssets = processContentAssets;
    exports.processContents = processContents;
    exports.processContentsForEditMode = processContentsForEditMode;

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
(function() { LWR.define('lightning/utils', ['exports'], (function (exports) {

    function classNamesHash(hash, classes) {
      if (typeof classes === 'string') {
        const array = classes.trim().split(/\s+/);
        for (let i = 0, {
            length
          } = array; i < length; i += 1) {
          hash[array[i]] = true;
        }
        return hash;
      }
      return Object.assign(hash, classes);
    }
    const proto = Object.defineProperties(Object.create(null), {
      add: {
        value(className) {
          return classNamesHash(this, className);
        }
      },
      invert: {
        value() {
          const keys = Object.keys(this);
          for (let i = 0, {
              length
            } = keys; i < length; i += 1) {
            const key = keys[i];
            this[key] = !this[key];
          }
          return this;
        }
      },
      toString: {
        value() {
          let string = '';
          const keys = Object.keys(this);
          for (let i = 0, {
              length
            } = keys; i < length; i += 1) {
            const key = keys[i];
            if (this[key]) {
              string += (string.length ? ' ' : '') + key;
            }
          }
          return string;
        }
      }
    });
    function classSet(config) {
      return classNamesHash(Object.create(proto), config);
    }

    // Matches lower cased tag names of standard inputable elements as well as
    // custom elements whose tag names contain inputable names.
    const inputableNode = /input|select|textarea|button|object/;
    function visible(element) {
      // Check computed style visibility first because it doesn't cause a layout
      // reflow/recalculation.
      if (window.getComputedStyle(element).visibility === 'hidden') {
        return false;
      }
      // Perform the performance heavier `getBoundingClientRect()` last because
      // it causes a page layout reflow/recalculation.
      const {
        width,
        height
      } = element.getBoundingClientRect();
      return width > 0 || height > 0;
    }
    function focusable(element) {
      const tagName = element.tagName.toLowerCase();
      if (tagName === 'a' && element.href || !element.disabled && inputableNode.test(tagName)) {
        return visible(element);
      }
      return false;
    }
    function tabbable(element) {
      // Perform the "isDataActionable" first as `focusable()` is potentially
      // performance heavy.
      return element.dataset.navigation === 'enable' || element.tabIndex >= 0 && focusable(element);
    }
    function queryFocusable(element) {
      const childElements = element.querySelectorAll('*');
      const focusables = [];
      for (let i = 0, {
          length
        } = childElements; i < length; i += 1) {
        const child = childElements[i];
        if (tabbable(child)) {
          focusables.push(child);
        }
      }
      return focusables;
    }

    /**
     * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
     * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
     * @param  {string|array} arguments - string(s) to be injected into the `string` param
     * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
     */

    function formatLabel(str) {
      const args = Array.prototype.slice.call(arguments, 1);
      let replacements = args;
      if (Array.isArray(args[0])) {
        [replacements] = args;
      }
      return str.replace(/{(\d+)}/g, (match, i) => {
        const replacement = replacements[i];
        return replacement !== null && replacement !== undefined ? replacement : '';
      });
    }

    exports.classSet = classSet;
    exports.formatLabel = formatLabel;
    exports.queryFocusable = queryFocusable;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('community_builder/outputRichText', ['exports', 'lwc', 'lightning/utils', 'community_builder/richTextUtil', 'dxp_data_provider/dataProviderUtils'], (function (exports, lwc, utils, richTextUtil, dataProviderUtils) {

    function stylesheet$1(token, useActualHostSelector, useNativeDirPseudoclass) {
      var shadowSelector = token ? ("[" + token + "]") : "";
      return [".cb-outputRichText-container.ql-editor", shadowSelector, " {box-sizing: border-box;line-height: 1.42;height: 100%;outline: none;overflow-y: auto;tab-size: 4;-moz-tab-size: 4;text-align: left;white-space: pre-wrap;word-wrap: break-word;}.cb-outputRichText-container.ql-editor", shadowSelector, " > *", shadowSelector, " {cursor: text;}.cb-outputRichText-container.ql-editor", shadowSelector, " p", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " ul", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " pre", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " blockquote", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " h1", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " h2", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " h3", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " h4", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " h5", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " h6", shadowSelector, " {margin: 0;padding: 0;counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " ul", shadowSelector, " {padding-left: 1.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " > li", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " ul", shadowSelector, " > li", shadowSelector, " {list-style-type: none;}.cb-outputRichText-container.ql-editor", shadowSelector, " ul", shadowSelector, " > li", shadowSelector, "::before {content: '\\2022';}.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='true']", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='false']", shadowSelector, " {pointer-events: none;}.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='true']", shadowSelector, " > li", shadowSelector, " *", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='false']", shadowSelector, " > li", shadowSelector, " *", shadowSelector, " {pointer-events: all;}.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='true']", shadowSelector, " > li", shadowSelector, "::before,.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='false']", shadowSelector, " > li", shadowSelector, "::before {color: #777;cursor: pointer;pointer-events: all;}.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='true']", shadowSelector, " > li", shadowSelector, "::before {content: '\\2611';}.cb-outputRichText-container.ql-editor", shadowSelector, " ul[data-checked='false']", shadowSelector, " > li", shadowSelector, "::before {content: '\\2610';}.cb-outputRichText-container.ql-editor", shadowSelector, " li", shadowSelector, "::before {display: inline-block;white-space: nowrap;width: 1.2em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li:not(.ql-direction-rtl)", shadowSelector, "::before {margin-left: -1.5em;margin-right: 0.3em;text-align: right;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-direction-rtl", shadowSelector, "::before {margin-left: 0.3em;margin-right: -1.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 1.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-direction-rtl", shadowSelector, " {padding-right: 1.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li", shadowSelector, " {counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment: list-0;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li", shadowSelector, ":before {content: counter(list-0, decimal) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-1", shadowSelector, " {counter-increment: list-1;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-1", shadowSelector, ":before {content: counter(list-1, lower-alpha) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-1", shadowSelector, " {counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-2", shadowSelector, " {counter-increment: list-2;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-2", shadowSelector, ":before {content: counter(list-2, lower-roman) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-2", shadowSelector, " {counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-3", shadowSelector, " {counter-increment: list-3;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-3", shadowSelector, ":before {content: counter(list-3, decimal) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-3", shadowSelector, " {counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-4", shadowSelector, " {counter-increment: list-4;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-4", shadowSelector, ":before {content: counter(list-4, lower-alpha) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-4", shadowSelector, " {counter-reset: list-5 list-6 list-7 list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-5", shadowSelector, " {counter-increment: list-5;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-5", shadowSelector, ":before {content: counter(list-5, lower-roman) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-5", shadowSelector, " {counter-reset: list-6 list-7 list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-6", shadowSelector, " {counter-increment: list-6;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-6", shadowSelector, ":before {content: counter(list-6, decimal) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-6", shadowSelector, " {counter-reset: list-7 list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-7", shadowSelector, " {counter-increment: list-7;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-7", shadowSelector, ":before {content: counter(list-7, lower-alpha) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-7", shadowSelector, " {counter-reset: list-8 list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-8", shadowSelector, " {counter-increment: list-8;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-8", shadowSelector, ":before {content: counter(list-8, lower-roman) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-8", shadowSelector, " {counter-reset: list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-9", shadowSelector, " {counter-increment: list-9;}.cb-outputRichText-container.ql-editor", shadowSelector, " ol", shadowSelector, " li.ql-indent-9", shadowSelector, ":before {content: counter(list-9, decimal) '. ';}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-1:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 3em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-1:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 4.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-1.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 3em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-1.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 4.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-2:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 6em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-2:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 7.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-2.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 6em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-2.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 7.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-3:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 9em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-3:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 10.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-3.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 9em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-3.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 10.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-4:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 12em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-4:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 13.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-4.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 12em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-4.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 13.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-5:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 15em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-5:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 16.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-5.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 15em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-5.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 16.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-6:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 18em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-6:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 19.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-6.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 18em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-6.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 19.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-7:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 21em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-7:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 22.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-7.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 21em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-7.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 22.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-8:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 24em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-8:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 25.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-8.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 24em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-8.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 25.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-9:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 27em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-9:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 28.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-indent-9.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 27em;}.cb-outputRichText-container.ql-editor", shadowSelector, " li.ql-indent-9.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 28.5em;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-video", shadowSelector, " {display: block;max-width: 100%;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-video.ql-align-center", shadowSelector, " {margin: 0 auto;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-video.ql-align-right", shadowSelector, " {margin: 0 0 0 auto;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-bg-black", shadowSelector, " {background-color: #000;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-bg-red", shadowSelector, " {background-color: #e60000;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-bg-orange", shadowSelector, " {background-color: #f90;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-bg-yellow", shadowSelector, " {background-color: #ff0;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-bg-green", shadowSelector, " {background-color: #008a00;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-bg-blue", shadowSelector, " {background-color: #06c;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-bg-purple", shadowSelector, " {background-color: #93f;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-color-white", shadowSelector, " {color: #fff;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-color-red", shadowSelector, " {color: #e60000;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-color-orange", shadowSelector, " {color: #f90;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-color-yellow", shadowSelector, " {color: #ff0;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-color-green", shadowSelector, " {color: #008a00;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-color-blue", shadowSelector, " {color: #06c;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-color-purple", shadowSelector, " {color: #93f;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-direction-rtl", shadowSelector, " {direction: rtl;text-align: inherit;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-align-center", shadowSelector, " {text-align: center;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-align-justify", shadowSelector, " {text-align: justify;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-align-right", shadowSelector, " {text-align: right;}.cb-outputRichText-container.ql-editor", shadowSelector, " .ql-blank", shadowSelector, "::before {color: rgba(0, 0, 0, 0.6);content: attr(data-placeholder);font-style: italic;left: 15px;pointer-events: none;position: absolute;right: 15px;}.cb-outputRichText-container.ql-editor", shadowSelector, " blockquote", shadowSelector, " {border-left: 4px solid #ccc;margin-bottom: 5px;margin-top: 5px;padding-left: 16px;}.cb-outputRichText-container.ql-editor", shadowSelector, " code", shadowSelector, ",.cb-outputRichText-container.ql-editor", shadowSelector, " pre", shadowSelector, " {background-color: #f0f0f0;border-radius: 3px;}.cb-outputRichText-container.ql-editor", shadowSelector, " pre", shadowSelector, " {white-space: pre-wrap;margin-bottom: 5px;margin-top: 5px;padding: 5px 10px;}.cb-outputRichText-container.ql-editor", shadowSelector, " code", shadowSelector, " {font-size: 85%;padding: 2px 4px;}.cb-outputRichText-container.ql-editor", shadowSelector, " pre.ql-syntax", shadowSelector, " {background-color: #23241f;color: #f8f8f2;overflow: visible;}.cb-outputRichText-container.ql-editor", shadowSelector, " img", shadowSelector, " {max-width: 100%;}.cb-outputRichText-container.ql-editor", shadowSelector, " .cb-video-container", shadowSelector, " {position: relative;padding-bottom: 56.25%;overflow: hidden;max-width: 100%;height: 0;}.cb-outputRichText-container.ql-editor", shadowSelector, " .cb-video-container", shadowSelector, " .ql-video", shadowSelector, " {position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: none;}"].join('');
      /*LWC compiler v7.1.5*/
    }
    var _implicitStylesheets = [stylesheet$1];

    function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
      var hostSelector = token ? ("." + token + "-host") : "";
      return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: block;overflow: auto;}";
      /*LWC compiler v7.1.5*/
    }
    stylesheet.$scoped$ = true;
    var _implicitScopedStylesheets = [stylesheet];

    const $fragment1 = lwc.parseFragment`<div${"c0"}${2}></div>`;
    function tmpl($api, $cmp, $slotset, $ctx) {
      const {ncls: api_normalize_class_name, sp: api_static_part, st: api_static_fragment} = $api;
      return [api_static_fragment($fragment1, 1, [api_static_part(0, {
        className: api_normalize_class_name($cmp.containerClass)
      }, null)])];
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-1nf8r8ii43j";
    tmpl.legacyStylesheetToken = "community_builder-outputRichText_outputRichText";
    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    if (_implicitScopedStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
    }
    lwc.freezeTemplate(tmpl);

    class OutputRichText extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.processedValue = '';
        this.isDomReady = false;
        this.pendingEvent = void 0;
        this.enableQuillCss = false;
      }
      /**
       * Sets the rich text to display.
       * @type {string}
       *
       * The rich text should be a valid html string which can contain
       * references to content assets in the form of {!contentAsset.name.version}
       */
      get value() {
        return this.processedValue;
      }
      set value(val) {
        this.rawValue = val;
        this.processRichText(val);
        this.renderRichText();
      }

      /**
       * Data provider provides data that is used to resolve the data expressions
       * ex. {!Item.field}
       *
       * @param {object} data - Object with field names as keys and field values as values
       */
      setDataExpressions(data) {
        this.processedValue = this.resolveDataExpressions(this.value, data);
        this.renderRichText();
      }
      get containerClass() {
        return utils.classSet({
          'cb-outputRichText-container': true,
          'ql-editor': this.enableQuillCss
        }).toString();
      }

      /**
       * Image Data Provider provides the CMS image information
       */
      set imageInfos(info) {
        this._imageInfos = info;
        if (!richTextUtil.isEmpty(info)) {
          const imageInfoMap = richTextUtil.normalizeImageInfos(info);
          this.processRichText(this.rawValue, imageInfoMap);
          this.renderRichText();
        }
      }
      get imageInfos() {
        return this._imageInfos;
      }
      processRichText(value, imageInfoMap) {
        this.processedValue = richTextUtil.processContents(value, imageInfoMap);
        this.processDataExpressions(this.processedValue);
      }

      /**
       * Resolve data expressions with the provided data. Searches html for
       * {!Item.field} and resolves with data.
       *
       * @param {string} html - html to render
       * @param {object} data - object with field names as keys and field values as values
       */
      resolveDataExpressions(html, data) {
        let result = html;
        let tokens;
        while ((tokens = dataProviderUtils.DATA_BIND_REGEX.exec(html)) !== null) {
          const [match, field] = tokens;
          result = result.replace(match, data[field]);
        }
        return result;
      }

      /**
       * Searches html for data expresions (ex. {!Item.field})
       * Sends event to data provider asking for data to resolve data expressions
       *
       * @param {String} html - html to render
       */
      processDataExpressions(html) {
        let tokens;
        let fields = [];
        while ((tokens = dataProviderUtils.DATA_BIND_REGEX.exec(html)) !== null) {
          const [, field] = tokens;
          fields.push(field);
        }
        if (fields.length > 0) {
          this.pendingEvent = new CustomEvent(dataProviderUtils.DATA_PROVIDER_GET_FIELD_DATA_EVENT_NAME, {
            detail: fields,
            bubbles: true,
            composed: true
          });
        }
      }
      renderedCallback() {
        this.isDomReady = true;
        this.renderRichText();
      }
      renderRichText() {
        if (this.isDomReady) {
          const container = this.querySelector('div');
          // eslint-disable-next-line @lwc/lwc/no-inner-html
          container.innerHTML = this.processedValue;
          if (this.pendingEvent) {
            // We need to set pendingEvent to null before dispatching, because event could trigger
            // a rerender which would send the event out again
            const e = this.pendingEvent;
            this.pendingEvent = null;
            this.dispatchEvent(e);
          }
        }
      }
      /*LWC compiler v7.1.5*/
    }
    OutputRichText.renderMode = 'light';
    lwc.registerDecorators(OutputRichText, {
      publicProps: {
        enableQuillCss: {
          config: 0
        },
        value: {
          config: 3
        },
        imageInfos: {
          config: 3
        }
      },
      publicMethods: ["setDataExpressions"],
      fields: ["processedValue", "isDomReady", "pendingEvent"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(OutputRichText, {
      tmpl: _tmpl,
      sel: "community_builder-output-rich-text",
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
(function() { LWR.define('@view/error', ['exports', 'dxp_data_provider/dataProxy', 'dxp_data_provider/userDataProvider', 'lwc', 'community_builder/outputRichText', 'dxp_data_provider/imageDataProvider', 'community_layout/column', 'community_layout/section', 'community_layout/sldsFlexibleLayout', 'community_builder/seoAssistant', 'webruntime/viewchangeNotifier', 'webruntime/pageDataLayerObject', 'community_layout/hiddenRegion', 'webruntime/expressions'], (function (exports, _dxp_data_providerDataProxy, _dxp_data_providerUserDataProvider, lwc, _community_builderOutputRichText, _dxp_data_providerImageDataProvider, _community_layoutColumn, _community_layoutSection, _community_layoutSldsFlexibleLayout, _community_builderSeoAssistant, _webruntimeViewchangeNotifier, _webruntimePageDataLayerObject, _community_layoutHiddenRegion, expressions) {

	function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

	var _dxp_data_providerDataProxy__default = /*#__PURE__*/_interopDefaultCompat(_dxp_data_providerDataProxy);
	var _dxp_data_providerUserDataProvider__default = /*#__PURE__*/_interopDefaultCompat(_dxp_data_providerUserDataProvider);
	var _community_builderOutputRichText__default = /*#__PURE__*/_interopDefaultCompat(_community_builderOutputRichText);
	var _dxp_data_providerImageDataProvider__default = /*#__PURE__*/_interopDefaultCompat(_dxp_data_providerImageDataProvider);
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
	tmpl$2.stylesheetToken = "lwc-78d32rnq1vg";
	tmpl$2.legacyStylesheetToken = "___at___view-error_error";
	lwc.freezeTemplate(tmpl$2);

	const stc0$1 = [];
	const stc1$1 = {
	  "data-component-id": "richTextEditor-747c"
	};
	function tmpl$1($api, $cmp, $slotset, $ctx) {
	  const {c: api_custom_element} = $api;
	  return [api_custom_element("community_builder-output-rich-text", _community_builderOutputRichText__default.default, {
	    styleDecls: stc0$1,
	    attrs: stc1$1,
	    props: {
	      "imageInfos": $cmp.attributes.community_builderoutputrichtext_3_0.imageInfos,
	      "enableQuillCss": $cmp.attributes.community_builderoutputrichtext_3_0.enableQuillCss,
	      "value": $cmp.attributes.community_builderoutputrichtext_3_0.value
	    },
	    key: 0
	  })];
	  /*LWC compiler v7.1.5*/
	}
	var dxp_data_providerimagedataprovider_2_1_html = lwc.registerTemplate(tmpl$1);
	tmpl$1.renderMode = "light";
	tmpl$1.stylesheets = [];
	tmpl$1.stylesheetToken = "lwc-2nn1a4h3esf";
	tmpl$1.legacyStylesheetToken = "___at___view-error_dxp_data_providerimagedataprovider_2_1_html";
	lwc.freezeTemplate(tmpl$1);

	const stc0 = {
	  attrs: {
	    "data-component-id": "sldsFlexibleLayout-7a9f"
	  },
	  key: 0
	};
	const stc1 = [["--dxp-c-l-section-vertical-align", "flex-start", false], ["--dxp-c-m-section-vertical-align", "flex-start", false], ["--dxp-c-s-section-vertical-align", "flex-start", false]];
	const stc2 = {
	  "data-layout-direction": "desktop-direction-row tablet-direction-column mobile-direction-column",
	  "data-component-id": "section-6f6e"
	};
	const stc3 = {
	  "data-layout-direction": "desktop-direction-row tablet-direction-column mobile-direction-column"
	};
	const stc4 = {
	  key: 5
	};
	const stc5 = [];
	const stc6 = {
	  "component-wrapper-spacer": true
	};
	const stc7 = {
	  "data-component-id": "seoAssistant-f309"
	};
	const stc8 = {
	  slotAssignment: "sfdcHiddenRegion",
	  attrs: {
	    "data-component-id": "viewchangeNotifier-7124"
	  },
	  key: 7
	};
	const stc9 = {
	  slotAssignment: "sfdcHiddenRegion",
	  attrs: {
	    "data-component-id": "pageDataLayerObject-88cb"
	  },
	  key: 8
	};
	function tmpl($api, $cmp, $slotset, $ctx) {
	  const {c: api_custom_element, fr: api_fragment, ssf: api_scoped_slot_factory} = $api;
	  return [api_custom_element("community_layout-slds-flexible-layout", _community_layoutSldsFlexibleLayout__default.default, stc0, [api_custom_element("community_layout-section", _community_layoutSection__default.default, {
	    styleDecls: stc1,
	    slotAssignment: "content",
	    attrs: stc2,
	    props: {
	      "layoutDirectionDesktop": $cmp.attributes.community_layoutsection_3_2.layoutDirectionDesktop,
	      "maxContentWidth": $cmp.attributes.community_layoutsection_3_2.maxContentWidth,
	      "sectionConfig": $cmp.attributes.community_layoutsection_3_2.sectionConfig,
	      "layoutDirectionMobile": $cmp.attributes.community_layoutsection_3_2.layoutDirectionMobile,
	      "sectionVerticalAlign": $cmp.attributes.community_layoutsection_3_2.sectionVerticalAlign,
	      "sectionMinHeight": $cmp.attributes.community_layoutsection_3_2.sectionMinHeight,
	      "sectionColumnGutterWidth": $cmp.attributes.community_layoutsection_3_2.sectionColumnGutterWidth,
	      "layoutDirectionTablet": $cmp.attributes.community_layoutsection_3_2.layoutDirectionTablet,
	      "backgroundImageConfig": $cmp.attributes.community_layoutsection_3_2.backgroundImageConfig,
	      "backgroundImageOverlay": $cmp.attributes.community_layoutsection_3_2.backgroundImageOverlay,
	      "componentSpacerSize": $cmp.attributes.community_layoutsection_3_2.componentSpacerSize
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
	  })])])])]), api_custom_element("community_layout-hidden-region", _community_layoutHiddenRegion__default.default, stc4, [api_custom_element("community_builder-seo-assistant", _community_builderSeoAssistant__default.default, {
	    styleDecls: stc5,
	    classMap: stc6,
	    slotAssignment: "sfdcHiddenRegion",
	    attrs: stc7,
	    props: {
	      "recordId": $cmp.attributes.community_builderseoassistant_3_3.recordId,
	      "pageTitle": $cmp.attributes.community_builderseoassistant_3_3.pageTitle,
	      "description": $cmp.attributes.community_builderseoassistant_3_3.description,
	      "customHeadTags": $cmp.attributes.community_builderseoassistant_3_3.customHeadTags
	    },
	    key: 6
	  }), api_custom_element("webruntime-viewchange-notifier", _webruntimeViewchangeNotifier__default.default, stc8), api_custom_element("webruntime-page-data-layer-object", _webruntimePageDataLayerObject__default.default, stc9)])];
	  /*LWC compiler v7.1.5*/
	}
	var dxp_data_provideruserdataprovider_1_0_html = lwc.registerTemplate(tmpl);
	tmpl.renderMode = "light";
	tmpl.stylesheets = [];
	tmpl.stylesheetToken = "lwc-5ajmn2uqk6";
	tmpl.legacyStylesheetToken = "___at___view-error_dxp_data_provideruserdataprovider_1_0_html";
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
	                  "sfdcExpressionKey": "dxpImageInfoSfdcExpressionKey",
	                  "imageInfo": [],
	                  "generatedTemplate": {
	                    "attributes": dxp_data_providerimagedataprovider_2_1 => {
	                      return {
	                        "community_builderoutputrichtext_3_0": {
	                          "imageInfos": expressions.EXPR_CLOSURE(() => expressions.EXPR_MEMBER(expressions.EXPR_PROVIDER(dxp_data_providerimagedataprovider_2_1), "Pictures")),
	                          "value": "\u003Ch1 style=\"text-align: center;\"\u003EInvalid Page\u003C/h1\u003E",
	                          "enableQuillCss": "enableQuillCss"
	                        }
	                      };
	                    },
	                    "html": dxp_data_providerimagedataprovider_2_1_html
	                  }
	                },
	                "community_layoutsection_3_2": {
	                  "layoutDirectionMobile": "column",
	                  "backgroundImageConfig": "",
	                  "backgroundImageOverlay": "rgba(0,0,0,0)",
	                  "sectionConfig": "{\"UUID\":\"5cf2edf0-ff45-408f-95b3-09c7bc2a6f6e\",\"columns\":[{\"UUID\":\"b91352a0-bfc9-439c-9be9-a1a7c9d3f98d\",\"columnName\":\"Column 1\",\"columnKey\":\"col1\",\"columnWidth\":\"12\",\"seedComponents\":null}]}",
	                  "layoutDirectionDesktop": "row",
	                  "layoutDirectionTablet": "column",
	                  "sectionMinHeight": "",
	                  "componentSpacerSize": "",
	                  "sectionVerticalAlign": "flex-start",
	                  "maxContentWidth": "",
	                  "sectionColumnGutterWidth": ""
	                },
	                "community_layoutcolumn_2_0": {
	                  "columnWidth": "12",
	                  "columnCount": "1"
	                },
	                "community_builderseoassistant_3_3": {
	                  "recordId": expressions.EXPR_CLOSURE(() => cmp.routeParams["recordId"] || ""),
	                  "customHeadTags": "",
	                  "pageTitle": "Error",
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
	  sel: "@view-error",
	  apiVersion: 62
	});

	exports.default = __lwc_component_class_internal;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
