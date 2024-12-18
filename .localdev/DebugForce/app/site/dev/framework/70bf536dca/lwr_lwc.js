LWR.define("lwc/v/7_1_5", ["exports"], function(exports) {
  "use strict";
  function invariant(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }
  function isTrue$1(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }
  function isFalse$1(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }
  function fail(msg) {
    throw new Error(msg);
  }
  var assert = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    fail,
    invariant,
    isFalse: isFalse$1,
    isTrue: isTrue$1
  });
  const {
    assign,
    create,
    defineProperties,
    defineProperty,
    entries,
    freeze,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
    getOwnPropertyDescriptors,
    getOwnPropertyNames: getOwnPropertyNames$1,
    getPrototypeOf: getPrototypeOf$1,
    hasOwnProperty: hasOwnProperty$1,
    isFrozen,
    keys,
    seal,
    setPrototypeOf
  } = Object;
  const {
    isArray: isArray$1
  } = Array;
  const {
    concat: ArrayConcat$1,
    copyWithin: ArrayCopyWithin,
    every: ArrayEvery,
    fill: ArrayFill,
    filter: ArrayFilter,
    find: ArrayFind,
    findIndex: ArrayFindIndex,
    includes: ArrayIncludes,
    indexOf: ArrayIndexOf,
    join: ArrayJoin,
    map: ArrayMap,
    pop: ArrayPop,
    push: ArrayPush$1,
    reduce: ArrayReduce,
    reverse: ArrayReverse,
    shift: ArrayShift,
    slice: ArraySlice,
    some: ArraySome,
    sort: ArraySort,
    splice: ArraySplice,
    unshift: ArrayUnshift,
    forEach
  } = Array.prototype;
  function arrayEvery(arr, predicate) {
    return ArrayEvery.call(arr, predicate);
  }
  const {
    fromCharCode: StringFromCharCode
  } = String;
  const {
    charAt: StringCharAt,
    charCodeAt: StringCharCodeAt,
    replace: StringReplace,
    split: StringSplit,
    slice: StringSlice,
    toLowerCase: StringToLowerCase,
    trim: StringTrim
  } = String.prototype;
  function isUndefined$1(obj) {
    return obj === void 0;
  }
  function isNull(obj) {
    return obj === null;
  }
  function isTrue(obj) {
    return obj === true;
  }
  function isFalse(obj) {
    return obj === false;
  }
  function isBoolean(obj) {
    return typeof obj === "boolean";
  }
  function isFunction$1(obj) {
    return typeof obj === "function";
  }
  function isObject(obj) {
    return typeof obj === "object";
  }
  function isString(obj) {
    return typeof obj === "string";
  }
  function isNumber(obj) {
    return typeof obj === "number";
  }
  function noop() {
  }
  const OtS$1 = {}.toString;
  function toString$1(obj) {
    if (obj?.toString) {
      if (isArray$1(obj)) {
        return ArrayJoin.call(ArrayMap.call(obj, toString$1), ",");
      }
      return obj.toString();
    } else if (typeof obj === "object") {
      return OtS$1.call(obj);
    } else {
      return String(obj);
    }
  }
  function getPropertyDescriptor(o, p) {
    do {
      const d2 = getOwnPropertyDescriptor$1(o, p);
      if (!isUndefined$1(d2)) {
        return d2;
      }
      o = getPrototypeOf$1(o);
    } while (o !== null);
  }
  const allVersions = [58, 59, 60, 61, 62];
  const LOWEST_API_VERSION = allVersions[0];
  function isAPIFeatureEnabled(apiVersionFeature, apiVersion) {
    switch (apiVersionFeature) {
      case 0:
      case 1:
        return apiVersion >= 59;
      case 3:
      case 4:
      case 5:
      case 2:
        return apiVersion >= 60;
      case 7:
      case 6:
        return apiVersion >= 61;
      case 8:
      case 9:
      case 10:
        return apiVersion >= 62;
    }
  }
  const AriaPropertyNames = ["ariaActiveDescendant", "ariaAtomic", "ariaAutoComplete", "ariaBusy", "ariaChecked", "ariaColCount", "ariaColIndex", "ariaColIndexText", "ariaColSpan", "ariaControls", "ariaCurrent", "ariaDescribedBy", "ariaDescription", "ariaDetails", "ariaDisabled", "ariaErrorMessage", "ariaExpanded", "ariaFlowTo", "ariaHasPopup", "ariaHidden", "ariaInvalid", "ariaKeyShortcuts", "ariaLabel", "ariaLabelledBy", "ariaLevel", "ariaLive", "ariaModal", "ariaMultiLine", "ariaMultiSelectable", "ariaOrientation", "ariaOwns", "ariaPlaceholder", "ariaPosInSet", "ariaPressed", "ariaReadOnly", "ariaRelevant", "ariaRequired", "ariaRoleDescription", "ariaRowCount", "ariaRowIndex", "ariaRowIndexText", "ariaRowSpan", "ariaSelected", "ariaSetSize", "ariaSort", "ariaValueMax", "ariaValueMin", "ariaValueNow", "ariaValueText", "ariaBrailleLabel", "ariaBrailleRoleDescription", "role"];
  const {
    AriaAttrNameToPropNameMap,
    AriaPropNameToAttrNameMap
  } = /* @__PURE__ */ (() => {
    const AriaAttrNameToPropNameMap2 = create(null);
    const AriaPropNameToAttrNameMap2 = create(null);
    forEach.call(AriaPropertyNames, (propName) => {
      const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, () => "aria-"));
      AriaAttrNameToPropNameMap2[attrName] = propName;
      AriaPropNameToAttrNameMap2[propName] = attrName;
    });
    return {
      AriaAttrNameToPropNameMap: AriaAttrNameToPropNameMap2,
      AriaPropNameToAttrNameMap: AriaPropNameToAttrNameMap2
    };
  })();
  const ID_REFERENCING_ATTRIBUTES_SET = /* @__PURE__ */ new Set(["aria-activedescendant", "aria-controls", "aria-describedby", "aria-details", "aria-errormessage", "aria-flowto", "aria-labelledby", "aria-owns", "for"]);
  const KEY__SHADOW_RESOLVER = "$shadowResolver$";
  const KEY__SHADOW_STATIC = "$shadowStaticNode$";
  const KEY__SHADOW_TOKEN = "$shadowToken$";
  const KEY__SYNTHETIC_MODE = "$$lwc-synthetic-mode";
  const KEY__SCOPED_CSS = "$scoped$";
  const KEY__NATIVE_GET_ELEMENT_BY_ID = "$nativeGetElementById$";
  const KEY__NATIVE_QUERY_SELECTOR_ALL = "$nativeQuerySelectorAll$";
  const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
  const CAMEL_REGEX = /-([a-z])/g;
  const SPECIAL_PROPERTY_ATTRIBUTE_MAPPING = /* @__PURE__ */ new Map([["accessKey", "accesskey"], ["readOnly", "readonly"], ["tabIndex", "tabindex"], ["bgColor", "bgcolor"], ["colSpan", "colspan"], ["rowSpan", "rowspan"], ["contentEditable", "contenteditable"], ["crossOrigin", "crossorigin"], ["dateTime", "datetime"], ["formAction", "formaction"], ["isMap", "ismap"], ["maxLength", "maxlength"], ["minLength", "minlength"], ["noValidate", "novalidate"], ["useMap", "usemap"], ["htmlFor", "for"]]);
  const CACHED_PROPERTY_ATTRIBUTE_MAPPING = /* @__PURE__ */ new Map();
  function htmlPropertyToAttribute(propName) {
    const ariaAttributeName = AriaPropNameToAttrNameMap[propName];
    if (!isUndefined$1(ariaAttributeName)) {
      return ariaAttributeName;
    }
    const specialAttributeName = SPECIAL_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
    if (!isUndefined$1(specialAttributeName)) {
      return specialAttributeName;
    }
    const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
    if (!isUndefined$1(cachedAttributeName)) {
      return cachedAttributeName;
    }
    let attributeName = "";
    for (let i2 = 0, len = propName.length; i2 < len; i2++) {
      const code = StringCharCodeAt.call(propName, i2);
      if (code >= 65 && code <= 90) {
        attributeName += "-" + StringFromCharCode(code + 32);
      } else {
        attributeName += StringFromCharCode(code);
      }
    }
    CACHED_PROPERTY_ATTRIBUTE_MAPPING.set(propName, attributeName);
    return attributeName;
  }
  const CACHED_KEBAB_CAMEL_MAPPING = /* @__PURE__ */ new Map();
  function kebabCaseToCamelCase(attrName) {
    let result = CACHED_KEBAB_CAMEL_MAPPING.get(attrName);
    if (isUndefined$1(result)) {
      result = StringReplace.call(attrName, CAMEL_REGEX, (g) => g[1].toUpperCase());
      CACHED_KEBAB_CAMEL_MAPPING.set(attrName, result);
    }
    return result;
  }
  const LWC_VERSION = "7.1.5";
  const LWC_VERSION_COMMENT_REGEX = /\/\*LWC compiler v([\d.]+)\*\/\s*}/;
  const features = {
    PLACEHOLDER_TEST_FLAG: null,
    DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE: null,
    ENABLE_WIRE_SYNC_EMIT: null,
    DISABLE_LIGHT_DOM_UNSCOPED_CSS: null,
    ENABLE_FROZEN_TEMPLATE: null,
    ENABLE_LEGACY_SCOPE_TOKENS: null,
    ENABLE_FORCE_SHADOW_MIGRATE_MODE: null,
    ENABLE_EXPERIMENTAL_SIGNALS: null,
    ENABLE_SLOT_FORWARDING_FIX: null
  };
  if (!globalThis.lwcRuntimeFlags) {
    Object.defineProperty(globalThis, "lwcRuntimeFlags", {
      value: create(null)
    });
  }
  const flags = globalThis.lwcRuntimeFlags;
  function setFeatureFlag(name, value) {
    if (!isBoolean(value)) {
      const message = `Failed to set the value "${value}" for the runtime feature flag "${name}". Runtime feature flags can only be set to a boolean value.`;
      if (true) {
        throw new TypeError(message);
      } else {
        console.error(message);
        return;
      }
    }
    if (isUndefined$1(features[name])) {
      console.info(`Attempt to set a value on an unknown feature flag "${name}" resulted in a NOOP.`);
      return;
    }
    if (true) {
      flags[name] = value;
    } else {
      const runtimeValue = flags[name];
      if (!isUndefined$1(runtimeValue)) {
        console.error(`Failed to set the value "${value}" for the runtime feature flag "${name}". "${name}" has already been set with the value "${runtimeValue}".`);
        return;
      }
      defineProperty(flags, name, {
        value
      });
    }
  }
  function setFeatureFlagForTest(name, value) {
    if (true) {
      setFeatureFlag(name, value);
    }
  }
  const onReportingEnabledCallbacks = [];
  let currentDispatcher$1 = noop;
  let enabled$1 = false;
  const reportingControl = {
    attachDispatcher(dispatcher) {
      enabled$1 = true;
      currentDispatcher$1 = dispatcher;
      for (const callback of onReportingEnabledCallbacks) {
        try {
          callback();
        } catch (err) {
          console.error("Could not invoke callback", err);
        }
      }
      onReportingEnabledCallbacks.length = 0;
    },
    detachDispatcher() {
      enabled$1 = false;
      currentDispatcher$1 = noop;
    }
  };
  function onReportingEnabled(callback) {
    if (enabled$1) {
      callback();
    } else {
      onReportingEnabledCallbacks.push(callback);
    }
  }
  function report(reportingEventId, payload) {
    if (enabled$1) {
      currentDispatcher$1(reportingEventId, payload);
    }
  }
  function isReportingEnabled() {
    return enabled$1;
  }
  function getComponentTag(vm) {
    return `<${StringToLowerCase.call(vm.tagName)}>`;
  }
  function getComponentStack(vm) {
    const stack = [];
    let prefix = "";
    while (!isNull(vm.owner)) {
      ArrayPush$1.call(stack, prefix + getComponentTag(vm));
      vm = vm.owner;
      prefix += "	";
    }
    return ArrayJoin.call(stack, "\n");
  }
  function getErrorComponentStack(vm) {
    const wcStack = [];
    let currentVm = vm;
    while (!isNull(currentVm)) {
      ArrayPush$1.call(wcStack, getComponentTag(currentVm));
      currentVm = currentVm.owner;
    }
    return wcStack.reverse().join("\n	");
  }
  function addErrorComponentStack(vm, error) {
    if (!isFrozen(error) && isUndefined$1(error.wcStack)) {
      const wcStack = getErrorComponentStack(vm);
      defineProperty(error, "wcStack", {
        get() {
          return wcStack;
        }
      });
    }
  }
  const alreadyLoggedMessages = new Set();
  if (false) {
    window.__lwcResetAlreadyLoggedMessages = () => {
      alreadyLoggedMessages.clear();
    };
  }
  function log(method, message, vm, once) {
    let msg = `[LWC ${method}]: ${message}`;
    if (!isUndefined$1(vm)) {
      msg = `${msg}
${getComponentStack(vm)}`;
    }
    if (once) {
      if (alreadyLoggedMessages.has(msg)) {
        return;
      }
      alreadyLoggedMessages.add(msg);
    }
    if (false) {
      console[method](msg);
      return;
    }
    try {
      throw new Error(msg);
    } catch (e) {
      console[method](e);
    }
  }
  function logError(message, vm) {
    log("error", message, vm, false);
  }
  function logWarn(message, vm) {
    log("warn", message, vm, false);
  }
  function logWarnOnce(message, vm) {
    log("warn", message, vm, true);
  }
  const TargetToReactiveRecordMap = new WeakMap();
  function getReactiveRecord(target) {
    let reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (isUndefined$1(reactiveRecord)) {
      const newRecord = create(null);
      reactiveRecord = newRecord;
      TargetToReactiveRecordMap.set(target, newRecord);
    }
    return reactiveRecord;
  }
  let currentReactiveObserver = null;
  function valueMutated(target, key) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (!isUndefined$1(reactiveRecord)) {
      const reactiveObservers = reactiveRecord[key];
      if (!isUndefined$1(reactiveObservers)) {
        for (let i2 = 0, len = reactiveObservers.length; i2 < len; i2 += 1) {
          const ro = reactiveObservers[i2];
          ro.notify();
        }
      }
    }
  }
  function valueObserved(target, key) {
    if (currentReactiveObserver === null) {
      return;
    }
    const ro = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    let reactiveObservers = reactiveRecord[key];
    if (isUndefined$1(reactiveObservers)) {
      reactiveObservers = [];
      reactiveRecord[key] = reactiveObservers;
    } else if (reactiveObservers[0] === ro) {
      return;
    }
    if (ArrayIndexOf.call(reactiveObservers, ro) === -1) {
      ro.link(reactiveObservers);
    }
  }
  class ReactiveObserver {
    constructor(callback) {
      this.listeners = [];
      this.callback = callback;
    }
    observe(job) {
      const inceptionReactiveRecord = currentReactiveObserver;
      currentReactiveObserver = this;
      let error;
      try {
        job();
      } catch (e) {
        error = Object(e);
      } finally {
        currentReactiveObserver = inceptionReactiveRecord;
        if (error !== void 0) {
          throw error;
        }
      }
    }
    reset() {
      const {
        listeners
      } = this;
      const len = listeners.length;
      if (len > 0) {
        for (let i2 = 0; i2 < len; i2++) {
          const set = listeners[i2];
          const setLength = set.length;
          if (setLength > 1) {
            const index = ArrayIndexOf.call(set, this);
            set[index] = set[setLength - 1];
          }
          ArrayPop.call(set);
        }
        listeners.length = 0;
      }
    }
    notify() {
      this.callback.call(void 0, this);
    }
    link(reactiveObservers) {
      ArrayPush$1.call(reactiveObservers, this);
      ArrayPush$1.call(this.listeners, reactiveObservers);
    }
    isObserving() {
      return currentReactiveObserver === this;
    }
  }
  const TargetToSignalTrackerMap = new WeakMap();
  function getSignalTracker(target) {
    let signalTracker = TargetToSignalTrackerMap.get(target);
    if (isUndefined$1(signalTracker)) {
      signalTracker = new SignalTracker();
      TargetToSignalTrackerMap.set(target, signalTracker);
    }
    return signalTracker;
  }
  function subscribeToSignal(target, signal, update) {
    const signalTracker = getSignalTracker(target);
    if (isFalse(signalTracker.seen(signal))) {
      signalTracker.subscribeToSignal(signal, update);
    }
  }
  function unsubscribeFromSignals(target) {
    if (TargetToSignalTrackerMap.has(target)) {
      const signalTracker = getSignalTracker(target);
      signalTracker.unsubscribeFromSignals();
      signalTracker.reset();
    }
  }
  class SignalTracker {
    constructor() {
      this.signalToUnsubscribeMap = new Map();
    }
    seen(signal) {
      return this.signalToUnsubscribeMap.has(signal);
    }
    subscribeToSignal(signal, update) {
      try {
        const unsubscribe = signal.subscribe(update);
        if (isFunction$1(unsubscribe)) {
          this.signalToUnsubscribeMap.set(signal, unsubscribe);
        }
      } catch (err) {
        logWarnOnce(`Attempted to subscribe to an object that has the shape of a signal but received the following error: ${err?.stack ?? err}`);
      }
    }
    unsubscribeFromSignals() {
      try {
        this.signalToUnsubscribeMap.forEach((unsubscribe) => unsubscribe());
      } catch (err) {
        logWarnOnce(`Attempted to call a signal's unsubscribe callback but received the following error: ${err?.stack ?? err}`);
      }
    }
    reset() {
      this.signalToUnsubscribeMap.clear();
    }
  }
  function componentValueMutated(vm, key) {
    {
      valueMutated(vm.component, key);
    }
  }
  function componentValueObserved(vm, key, target = {}) {
    const {
      component,
      tro
    } = vm;
    {
      valueObserved(component, key);
    }
    if (lwcRuntimeFlags.ENABLE_EXPERIMENTAL_SIGNALS && isObject(target) && !isNull(target) && "value" in target && "subscribe" in target && isFunction$1(target.subscribe) && tro.isObserving()) {
      subscribeToSignal(component, target, tro.notify.bind(tro));
    }
  }
  function createReactiveObserver(callback) {
    return new ReactiveObserver(callback);
  }
  let nextTickCallbackQueue = [];
  const SPACE_CHAR = 32;
  const EmptyObject = seal(create(null));
  const EmptyArray = seal([]);
  function flushCallbackQueue() {
    if (true) {
      if (nextTickCallbackQueue.length === 0) {
        throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
      }
    }
    const callbacks = nextTickCallbackQueue;
    nextTickCallbackQueue = [];
    for (let i2 = 0, len = callbacks.length; i2 < len; i2 += 1) {
      callbacks[i2]();
    }
  }
  function addCallbackToNextTick(callback) {
    if (true) {
      if (!isFunction$1(callback)) {
        throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
      }
    }
    if (nextTickCallbackQueue.length === 0) {
      Promise.resolve().then(flushCallbackQueue);
    }
    ArrayPush$1.call(nextTickCallbackQueue, callback);
  }
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  }
  const DECLARATION_DELIMITER = /;(?![^(]*\))/g;
  const PROPERTY_DELIMITER = /:(.+)/;
  function parseStyleText(cssText) {
    const styleMap = {};
    const declarations = cssText.split(DECLARATION_DELIMITER);
    for (const declaration of declarations) {
      if (declaration) {
        const [prop, value] = declaration.split(PROPERTY_DELIMITER);
        if (prop !== void 0 && value !== void 0) {
          styleMap[prop.trim()] = value.trim();
        }
      }
    }
    return styleMap;
  }
  function cloneAndOmitKey(object, keyToOmit) {
    const result = {};
    for (const key of keys(object)) {
      if (key !== keyToOmit) {
        result[key] = object[key];
      }
    }
    return result;
  }
  function flattenStylesheets(stylesheets) {
    const list = [];
    for (const stylesheet of stylesheets) {
      if (!isArray$1(stylesheet)) {
        list.push(stylesheet);
      } else {
        list.push(...flattenStylesheets(stylesheet));
      }
    }
    return list;
  }
  function assertNotProd() {
    if (false) {
      throw new ReferenceError();
    }
  }
  function shouldBeFormAssociated(Ctor) {
    const ctorFormAssociated = Boolean(Ctor.formAssociated);
    const apiVersion = getComponentAPIVersion(Ctor);
    const apiFeatureEnabled = isAPIFeatureEnabled(7, apiVersion);
    if (ctorFormAssociated && !apiFeatureEnabled) {
      const tagName = getComponentRegisteredName(Ctor);
      logWarnOnce(`Component <${tagName}> set static formAssociated to true, but form association is not enabled because the API version is ${apiVersion}. To enable form association, update the LWC component API version to 61 or above. https://lwc.dev/guide/versioning`);
    }
    return ctorFormAssociated && apiFeatureEnabled;
  }
  function resolveCircularModuleDependency(fn) {
    const module = fn();
    return module?.__esModule ? module.default : module;
  }
  function isCircularModuleDependency(obj) {
    return isFunction$1(obj) && hasOwnProperty$1.call(obj, "__circular__");
  }
  const instrumentDef = globalThis.__lwc_instrument_cmp_def ?? noop;
  const instrumentInstance = globalThis.__lwc_instrument_cmp_instance ?? noop;
  const HTMLElementConstructor = typeof HTMLElement !== "undefined" ? HTMLElement : function() {
  };
  const HTMLElementPrototype = HTMLElementConstructor.prototype;
  const ariaReflectionPolyfillDescriptors = create(null);
  for (const [propName, attrName] of entries(AriaPropNameToAttrNameMap)) {
    if (isUndefined$1(getPropertyDescriptor(HTMLElementPrototype, propName))) {
      ariaReflectionPolyfillDescriptors[propName] = {
        get() {
          return this.getAttribute(attrName);
        },
        set(newValue) {
          if (isNull(newValue)) {
            this.removeAttribute(attrName);
          } else {
            this.setAttribute(attrName, newValue);
          }
        },
        configurable: true,
        enumerable: true
      };
    }
  }
  const defaultDefHTMLPropertyNames = ["accessKey", "dir", "draggable", "hidden", "id", "lang", "spellcheck", "tabIndex", "title"];
  const HTMLElementOriginalDescriptors = create(null);
  forEach.call(keys(AriaPropNameToAttrNameMap), (propName) => {
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
    if (!isUndefined$1(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  forEach.call(defaultDefHTMLPropertyNames, (propName) => {
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
    if (!isUndefined$1(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  function generateDataDescriptor(options) {
    return assign({
      configurable: true,
      enumerable: true,
      writable: true
    }, options);
  }
  function generateAccessorDescriptor(options) {
    return assign({
      configurable: true,
      enumerable: true
    }, options);
  }
  let isDomMutationAllowed = false;
  function unlockDomMutation() {
    assertNotProd();
    isDomMutationAllowed = true;
  }
  function lockDomMutation() {
    assertNotProd();
    isDomMutationAllowed = false;
  }
  function logMissingPortalWarn(name, type) {
    return logWarn(`The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`);
  }
  function patchElementWithRestrictions(elm, options) {
    assertNotProd();
    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, "outerHTML");
    const descriptors = {
      outerHTML: generateAccessorDescriptor({
        get() {
          return originalOuterHTMLDescriptor.get.call(this);
        },
        set(value) {
          logError(`Invalid attempt to set outerHTML on Element.`);
          return originalOuterHTMLDescriptor.set.call(this, value);
        }
      })
    };
    if (!options.isLight && options.isSynthetic && !options.isPortal) {
      const {
        appendChild,
        insertBefore,
        removeChild,
        replaceChild
      } = elm;
      const originalNodeValueDescriptor = getPropertyDescriptor(elm, "nodeValue");
      const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, "innerHTML");
      const originalTextContentDescriptor = getPropertyDescriptor(elm, "textContent");
      assign(descriptors, {
        appendChild: generateDataDescriptor({
          value(aChild) {
            logMissingPortalWarn("appendChild", "method");
            return appendChild.call(this, aChild);
          }
        }),
        insertBefore: generateDataDescriptor({
          value(newNode, referenceNode) {
            if (!isDomMutationAllowed) {
              logMissingPortalWarn("insertBefore", "method");
            }
            return insertBefore.call(this, newNode, referenceNode);
          }
        }),
        removeChild: generateDataDescriptor({
          value(aChild) {
            if (!isDomMutationAllowed) {
              logMissingPortalWarn("removeChild", "method");
            }
            return removeChild.call(this, aChild);
          }
        }),
        replaceChild: generateDataDescriptor({
          value(newChild, oldChild) {
            logMissingPortalWarn("replaceChild", "method");
            return replaceChild.call(this, newChild, oldChild);
          }
        }),
        nodeValue: generateAccessorDescriptor({
          get() {
            return originalNodeValueDescriptor.get.call(this);
          },
          set(value) {
            if (!isDomMutationAllowed) {
              logMissingPortalWarn("nodeValue", "property");
            }
            originalNodeValueDescriptor.set.call(this, value);
          }
        }),
        textContent: generateAccessorDescriptor({
          get() {
            return originalTextContentDescriptor.get.call(this);
          },
          set(value) {
            logMissingPortalWarn("textContent", "property");
            originalTextContentDescriptor.set.call(this, value);
          }
        }),
        innerHTML: generateAccessorDescriptor({
          get() {
            return originalInnerHTMLDescriptor.get.call(this);
          },
          set(value) {
            logMissingPortalWarn("innerHTML", "property");
            return originalInnerHTMLDescriptor.set.call(this, value);
          }
        })
      });
    }
    defineProperties(elm, descriptors);
  }
  function getShadowRootRestrictionsDescriptors(sr) {
    assertNotProd();
    const originalAddEventListener = sr.addEventListener;
    const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, "innerHTML");
    const originalTextContentDescriptor = getPropertyDescriptor(sr, "textContent");
    return {
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },
        set(value) {
          logError(`Invalid attempt to set innerHTML on ShadowRoot.`);
          return originalInnerHTMLDescriptor.set.call(this, value);
        }
      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },
        set(value) {
          logError(`Invalid attempt to set textContent on ShadowRoot.`);
          return originalTextContentDescriptor.set.call(this, value);
        }
      }),
      addEventListener: generateDataDescriptor({
        value(type, listener, options) {
          if (!isUndefined$1(options)) {
            logError("The `addEventListener` method on ShadowRoot does not support any options.", getAssociatedVMIfPresent(this));
          }
          return originalAddEventListener.apply(this, arguments);
        }
      })
    };
  }
  function getCustomElementRestrictionsDescriptors(elm) {
    assertNotProd();
    const originalAddEventListener = elm.addEventListener;
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, "innerHTML");
    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, "outerHTML");
    const originalTextContentDescriptor = getPropertyDescriptor(elm, "textContent");
    return {
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },
        set(value) {
          logError(`Invalid attempt to set innerHTML on HTMLElement.`);
          return originalInnerHTMLDescriptor.set.call(this, value);
        }
      }),
      outerHTML: generateAccessorDescriptor({
        get() {
          return originalOuterHTMLDescriptor.get.call(this);
        },
        set(value) {
          logError(`Invalid attempt to set outerHTML on HTMLElement.`);
          return originalOuterHTMLDescriptor.set.call(this, value);
        }
      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },
        set(value) {
          logError(`Invalid attempt to set textContent on HTMLElement.`);
          return originalTextContentDescriptor.set.call(this, value);
        }
      }),
      addEventListener: generateDataDescriptor({
        value(type, listener, options) {
          if (!isUndefined$1(options)) {
            logError("The `addEventListener` method in `LightningElement` does not support any options.", getAssociatedVMIfPresent(this));
          }
          return originalAddEventListener.apply(this, arguments);
        }
      })
    };
  }
  function patchShadowRootWithRestrictions(sr) {
    defineProperties(sr, getShadowRootRestrictionsDescriptors(sr));
  }
  function patchCustomElementWithRestrictions(elm) {
    const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm);
    const elmProto = getPrototypeOf$1(elm);
    setPrototypeOf(elm, create(elmProto, restrictionsDescriptors));
  }
  function updateComponentValue(vm, key, newValue) {
    const {
      cmpFields
    } = vm;
    if (newValue !== cmpFields[key]) {
      cmpFields[key] = newValue;
      componentValueMutated(vm, key);
    }
  }
  const {
    isArray
  } = Array;
  const {
    prototype: ObjectDotPrototype,
    getPrototypeOf,
    create: ObjectCreate,
    defineProperty: ObjectDefineProperty,
    isExtensible,
    getOwnPropertyDescriptor,
    getOwnPropertyNames,
    getOwnPropertySymbols,
    preventExtensions,
    hasOwnProperty
  } = Object;
  const {
    push: ArrayPush,
    concat: ArrayConcat
  } = Array.prototype;
  const OtS = {}.toString;
  function toString(obj) {
    if (obj && obj.toString) {
      return obj.toString();
    } else if (typeof obj === "object") {
      return OtS.call(obj);
    } else {
      return obj + "";
    }
  }
  function isUndefined(obj) {
    return obj === void 0;
  }
  function isFunction(obj) {
    return typeof obj === "function";
  }
  const proxyToValueMap = new WeakMap();
  function registerProxy(proxy, value) {
    proxyToValueMap.set(proxy, value);
  }
  const unwrap$1 = (replicaOrAny) => proxyToValueMap.get(replicaOrAny) || replicaOrAny;
  class BaseProxyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }
    wrapDescriptor(descriptor) {
      if (hasOwnProperty.call(descriptor, "value")) {
        descriptor.value = this.wrapValue(descriptor.value);
      } else {
        const {
          set: originalSet,
          get: originalGet
        } = descriptor;
        if (!isUndefined(originalGet)) {
          descriptor.get = this.wrapGetter(originalGet);
        }
        if (!isUndefined(originalSet)) {
          descriptor.set = this.wrapSetter(originalSet);
        }
      }
      return descriptor;
    }
    copyDescriptorIntoShadowTarget(shadowTarget, key) {
      const {
        originalTarget
      } = this;
      const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
      if (!isUndefined(originalDescriptor)) {
        const wrappedDesc = this.wrapDescriptor(originalDescriptor);
        ObjectDefineProperty(shadowTarget, key, wrappedDesc);
      }
    }
    lockShadowTarget(shadowTarget) {
      const {
        originalTarget
      } = this;
      const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      targetKeys.forEach((key) => {
        this.copyDescriptorIntoShadowTarget(shadowTarget, key);
      });
      const {
        membrane: {
          tagPropertyKey
        }
      } = this;
      if (!isUndefined(tagPropertyKey) && !hasOwnProperty.call(shadowTarget, tagPropertyKey)) {
        ObjectDefineProperty(shadowTarget, tagPropertyKey, ObjectCreate(null));
      }
      preventExtensions(shadowTarget);
    }
    apply(shadowTarget, thisArg, argArray) {
    }
    construct(shadowTarget, argArray, newTarget) {
    }
    get(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved: valueObserved2
        }
      } = this;
      const value = originalTarget[key];
      valueObserved2(originalTarget, key);
      return this.wrapValue(value);
    }
    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          tagPropertyKey,
          valueObserved: valueObserved2
        }
      } = this;
      valueObserved2(originalTarget, key);
      return key in originalTarget || key === tagPropertyKey;
    }
    ownKeys(shadowTarget) {
      const {
        originalTarget,
        membrane: {
          tagPropertyKey
        }
      } = this;
      const keys2 = isUndefined(tagPropertyKey) || hasOwnProperty.call(originalTarget, tagPropertyKey) ? [] : [tagPropertyKey];
      ArrayPush.apply(keys2, getOwnPropertyNames(originalTarget));
      ArrayPush.apply(keys2, getOwnPropertySymbols(originalTarget));
      return keys2;
    }
    isExtensible(shadowTarget) {
      const {
        originalTarget
      } = this;
      if (!isExtensible(shadowTarget)) {
        return false;
      }
      if (!isExtensible(originalTarget)) {
        this.lockShadowTarget(shadowTarget);
        return false;
      }
      return true;
    }
    getPrototypeOf(shadowTarget) {
      const {
        originalTarget
      } = this;
      return getPrototypeOf(originalTarget);
    }
    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved: valueObserved2,
          tagPropertyKey
        }
      } = this;
      valueObserved2(originalTarget, key);
      let desc = getOwnPropertyDescriptor(originalTarget, key);
      if (isUndefined(desc)) {
        if (key !== tagPropertyKey) {
          return void 0;
        }
        desc = {
          value: void 0,
          writable: false,
          configurable: false,
          enumerable: false
        };
        ObjectDefineProperty(shadowTarget, tagPropertyKey, desc);
        return desc;
      }
      if (desc.configurable === false) {
        this.copyDescriptorIntoShadowTarget(shadowTarget, key);
      }
      return this.wrapDescriptor(desc);
    }
  }
  const getterMap$1 = new WeakMap();
  const setterMap$1 = new WeakMap();
  const reverseGetterMap = new WeakMap();
  const reverseSetterMap = new WeakMap();
  class ReactiveProxyHandler extends BaseProxyHandler {
    wrapValue(value) {
      return this.membrane.getProxy(value);
    }
    wrapGetter(originalGet) {
      const wrappedGetter = getterMap$1.get(originalGet);
      if (!isUndefined(wrappedGetter)) {
        return wrappedGetter;
      }
      const handler = this;
      const get = function() {
        return handler.wrapValue(originalGet.call(unwrap$1(this)));
      };
      getterMap$1.set(originalGet, get);
      reverseGetterMap.set(get, originalGet);
      return get;
    }
    wrapSetter(originalSet) {
      const wrappedSetter = setterMap$1.get(originalSet);
      if (!isUndefined(wrappedSetter)) {
        return wrappedSetter;
      }
      const set = function(v) {
        originalSet.call(unwrap$1(this), unwrap$1(v));
      };
      setterMap$1.set(originalSet, set);
      reverseSetterMap.set(set, originalSet);
      return set;
    }
    unwrapDescriptor(descriptor) {
      if (hasOwnProperty.call(descriptor, "value")) {
        descriptor.value = unwrap$1(descriptor.value);
      } else {
        const {
          set,
          get
        } = descriptor;
        if (!isUndefined(get)) {
          descriptor.get = this.unwrapGetter(get);
        }
        if (!isUndefined(set)) {
          descriptor.set = this.unwrapSetter(set);
        }
      }
      return descriptor;
    }
    unwrapGetter(redGet) {
      const reverseGetter = reverseGetterMap.get(redGet);
      if (!isUndefined(reverseGetter)) {
        return reverseGetter;
      }
      const handler = this;
      const get = function() {
        return unwrap$1(redGet.call(handler.wrapValue(this)));
      };
      getterMap$1.set(get, redGet);
      reverseGetterMap.set(redGet, get);
      return get;
    }
    unwrapSetter(redSet) {
      const reverseSetter = reverseSetterMap.get(redSet);
      if (!isUndefined(reverseSetter)) {
        return reverseSetter;
      }
      const handler = this;
      const set = function(v) {
        redSet.call(handler.wrapValue(this), handler.wrapValue(v));
      };
      setterMap$1.set(set, redSet);
      reverseSetterMap.set(redSet, set);
      return set;
    }
    set(shadowTarget, key, value) {
      const {
        originalTarget,
        membrane: {
          valueMutated: valueMutated2
        }
      } = this;
      const oldValue = originalTarget[key];
      if (oldValue !== value) {
        originalTarget[key] = value;
        valueMutated2(originalTarget, key);
      } else if (key === "length" && isArray(originalTarget)) {
        valueMutated2(originalTarget, key);
      }
      return true;
    }
    deleteProperty(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueMutated: valueMutated2
        }
      } = this;
      delete originalTarget[key];
      valueMutated2(originalTarget, key);
      return true;
    }
    setPrototypeOf(shadowTarget, prototype) {
      if (true) {
        throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
      }
    }
    preventExtensions(shadowTarget) {
      if (isExtensible(shadowTarget)) {
        const {
          originalTarget
        } = this;
        preventExtensions(originalTarget);
        if (isExtensible(originalTarget)) {
          return false;
        }
        this.lockShadowTarget(shadowTarget);
      }
      return true;
    }
    defineProperty(shadowTarget, key, descriptor) {
      const {
        originalTarget,
        membrane: {
          valueMutated: valueMutated2,
          tagPropertyKey
        }
      } = this;
      if (key === tagPropertyKey && !hasOwnProperty.call(originalTarget, key)) {
        return true;
      }
      ObjectDefineProperty(originalTarget, key, this.unwrapDescriptor(descriptor));
      if (descriptor.configurable === false) {
        this.copyDescriptorIntoShadowTarget(shadowTarget, key);
      }
      valueMutated2(originalTarget, key);
      return true;
    }
  }
  const getterMap = new WeakMap();
  const setterMap = new WeakMap();
  class ReadOnlyHandler extends BaseProxyHandler {
    wrapValue(value) {
      return this.membrane.getReadOnlyProxy(value);
    }
    wrapGetter(originalGet) {
      const wrappedGetter = getterMap.get(originalGet);
      if (!isUndefined(wrappedGetter)) {
        return wrappedGetter;
      }
      const handler = this;
      const get = function() {
        return handler.wrapValue(originalGet.call(unwrap$1(this)));
      };
      getterMap.set(originalGet, get);
      return get;
    }
    wrapSetter(originalSet) {
      const wrappedSetter = setterMap.get(originalSet);
      if (!isUndefined(wrappedSetter)) {
        return wrappedSetter;
      }
      const handler = this;
      const set = function(v) {
        if (true) {
          const {
            originalTarget
          } = handler;
          throw new Error(`Invalid mutation: Cannot invoke a setter on "${originalTarget}". "${originalTarget}" is read-only.`);
        }
      };
      setterMap.set(originalSet, set);
      return set;
    }
    set(shadowTarget, key, value) {
      if (true) {
        const {
          originalTarget
        } = this;
        const msg = isArray(originalTarget) ? `Invalid mutation: Cannot mutate array at index ${key.toString()}. Array is read-only.` : `Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`;
        throw new Error(msg);
      }
      return false;
    }
    deleteProperty(shadowTarget, key) {
      if (true) {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
      return false;
    }
    setPrototypeOf(shadowTarget, prototype) {
      if (true) {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
      }
    }
    preventExtensions(shadowTarget) {
      if (true) {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
      }
      return false;
    }
    defineProperty(shadowTarget, key, descriptor) {
      if (true) {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
      return false;
    }
  }
  function extract(objectOrArray) {
    if (isArray(objectOrArray)) {
      return objectOrArray.map((item) => {
        const original = unwrap$1(item);
        if (original !== item) {
          return extract(original);
        }
        return item;
      });
    }
    const obj = ObjectCreate(getPrototypeOf(objectOrArray));
    const names = getOwnPropertyNames(objectOrArray);
    return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
      const item = objectOrArray[key];
      const original = unwrap$1(item);
      if (original !== item) {
        seed[key] = extract(original);
      } else {
        seed[key] = item;
      }
      return seed;
    }, obj);
  }
  const formatter = {
    header: (plainOrProxy) => {
      const originalTarget = unwrap$1(plainOrProxy);
      if (!originalTarget || originalTarget === plainOrProxy) {
        return null;
      }
      const obj = extract(plainOrProxy);
      return ["object", {
        object: obj
      }];
    },
    hasBody: () => {
      return false;
    },
    body: () => {
      return null;
    }
  };
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    return {};
  }
  function init$1() {
    if (false) {
      throw new ReferenceError();
    }
    const global2 = getGlobal();
    const devtoolsFormatters = global2.devtoolsFormatters || [];
    ArrayPush.call(devtoolsFormatters, formatter);
    global2.devtoolsFormatters = devtoolsFormatters;
  }
  if (true) {
    init$1();
  }
  function defaultValueIsObservable(value) {
    if (value === null) {
      return false;
    }
    if (typeof value !== "object") {
      return false;
    }
    if (isArray(value)) {
      return true;
    }
    const proto = getPrototypeOf(value);
    return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
  }
  const defaultValueObserved = (obj, key) => {
  };
  const defaultValueMutated = (obj, key) => {
  };
  function createShadowTarget(value) {
    return isArray(value) ? [] : {};
  }
  class ObservableMembrane {
    constructor(options = {}) {
      this.readOnlyObjectGraph = new WeakMap();
      this.reactiveObjectGraph = new WeakMap();
      const {
        valueMutated: valueMutated2,
        valueObserved: valueObserved2,
        valueIsObservable,
        tagPropertyKey
      } = options;
      this.valueMutated = isFunction(valueMutated2) ? valueMutated2 : defaultValueMutated;
      this.valueObserved = isFunction(valueObserved2) ? valueObserved2 : defaultValueObserved;
      this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
      this.tagPropertyKey = tagPropertyKey;
    }
    getProxy(value) {
      const unwrappedValue = unwrap$1(value);
      if (this.valueIsObservable(unwrappedValue)) {
        if (this.readOnlyObjectGraph.get(unwrappedValue) === value) {
          return value;
        }
        return this.getReactiveHandler(unwrappedValue);
      }
      return unwrappedValue;
    }
    getReadOnlyProxy(value) {
      value = unwrap$1(value);
      if (this.valueIsObservable(value)) {
        return this.getReadOnlyHandler(value);
      }
      return value;
    }
    unwrapProxy(p) {
      return unwrap$1(p);
    }
    getReactiveHandler(value) {
      let proxy = this.reactiveObjectGraph.get(value);
      if (isUndefined(proxy)) {
        const handler = new ReactiveProxyHandler(this, value);
        proxy = new Proxy(createShadowTarget(value), handler);
        registerProxy(proxy, value);
        this.reactiveObjectGraph.set(value, proxy);
      }
      return proxy;
    }
    getReadOnlyHandler(value) {
      let proxy = this.readOnlyObjectGraph.get(value);
      if (isUndefined(proxy)) {
        const handler = new ReadOnlyHandler(this, value);
        proxy = new Proxy(createShadowTarget(value), handler);
        registerProxy(proxy, value);
        this.readOnlyObjectGraph.set(value, proxy);
      }
      return proxy;
    }
  }
  const lockerLivePropertyKey = Symbol.for("@@lockerLiveValue");
  const reactiveMembrane = new ObservableMembrane({
    valueObserved,
    valueMutated,
    tagPropertyKey: lockerLivePropertyKey
  });
  function unwrap(value) {
    return reactiveMembrane.unwrapProxy(value);
  }
  function getReadOnlyProxy(value) {
    return reactiveMembrane.getReadOnlyProxy(value);
  }
  function getReactiveProxy(value) {
    return reactiveMembrane.getProxy(value);
  }
  function markLockerLiveObject(obj) {
    {
      obj[lockerLivePropertyKey] = void 0;
    }
  }
  let globalStylesheet;
  function isStyleElement(elm) {
    return elm.tagName === "STYLE";
  }
  async function fetchStylesheet(elm) {
    if (isStyleElement(elm)) {
      return elm.textContent;
    } else {
      const {
        href
      } = elm;
      try {
        return await (await fetch(href)).text();
      } catch (err) {
        logWarnOnce(`Ignoring cross-origin stylesheet in migrate mode: ${href}`);
        return "";
      }
    }
  }
  function initGlobalStylesheet() {
    const stylesheet = new CSSStyleSheet();
    const elmsToPromises = new Map();
    let lastSeenLength = 0;
    const copyToGlobalStylesheet = () => {
      const elms = document.head.querySelectorAll('style:not([data-rendered-by-lwc]),link[rel="stylesheet"]');
      if (elms.length === lastSeenLength) {
        return;
      }
      lastSeenLength = elms.length;
      const promises = [...elms].map((elm) => {
        let promise = elmsToPromises.get(elm);
        if (!promise) {
          promise = fetchStylesheet(elm);
          elmsToPromises.set(elm, promise);
        }
        return promise;
      });
      Promise.all(promises).then((stylesheetTexts) => {
        stylesheet.replaceSync(stylesheetTexts.join("\n"));
      });
    };
    const headObserver = new MutationObserver(copyToGlobalStylesheet);
    headObserver.observe(document.head, {
      childList: true
    });
    copyToGlobalStylesheet();
    return stylesheet;
  }
  function applyShadowMigrateMode(shadowRoot) {
    if (!globalStylesheet) {
      globalStylesheet = initGlobalStylesheet();
    }
    shadowRoot.synthetic = true;
    shadowRoot.adoptedStyleSheets.push(globalStylesheet);
  }
  function createBridgeToElementDescriptor(propName, descriptor) {
    const {
      get,
      set,
      enumerable,
      configurable
    } = descriptor;
    if (!isFunction$1(get)) {
      throw new TypeError(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
    }
    if (!isFunction$1(set)) {
      throw new TypeError(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
    }
    return {
      enumerable,
      configurable,
      get() {
        const vm = getAssociatedVM(this);
        if (isBeingConstructed(vm)) {
          if (true) {
            logError(`The value of property \`${propName}\` can't be read from the constructor because the owner component hasn't set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
          }
          return;
        }
        componentValueObserved(vm, propName);
        return get.call(vm.elm);
      },
      set(newValue) {
        const vm = getAssociatedVM(this);
        if (true) {
          const vmBeingRendered2 = getVMBeingRendered();
          if (isInvokingRender) {
            logError(`${vmBeingRendered2}.render() method has side effects on the state of ${vm}.${propName}`);
          }
          if (isUpdatingTemplate) {
            logError(`When updating the template of ${vmBeingRendered2}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
          }
          if (isBeingConstructed(vm)) {
            logError(`Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
          }
          if (isObject(newValue) && !isNull(newValue)) {
            logError(`Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
          }
        }
        updateComponentValue(vm, propName, newValue);
        return set.call(vm.elm, newValue);
      }
    };
  }
  const refsCache = new WeakMap();
  const LightningElement = function() {
    if (isNull(vmBeingConstructed)) {
      throw new TypeError("Illegal constructor");
    }
    instrumentInstance(this, vmBeingConstructed);
    const vm = vmBeingConstructed;
    const {
      def,
      elm
    } = vm;
    const {
      bridge
    } = def;
    if (true) {
      const {
        assertInstanceOfHTMLElement
      } = vm.renderer;
      assertInstanceOfHTMLElement(vm.elm, `Component creation requires a DOM element to be associated to ${vm}.`);
    }
    setPrototypeOf(elm, bridge.prototype);
    vm.component = this;
    if (arguments.length === 1) {
      const {
        callHook: callHook2,
        setHook: setHook2,
        getHook: getHook2
      } = arguments[0];
      vm.callHook = callHook2;
      vm.setHook = setHook2;
      vm.getHook = getHook2;
    }
    markLockerLiveObject(this);
    associateVM(this, vm);
    associateVM(elm, vm);
    if (vm.renderMode === 1) {
      vm.renderRoot = doAttachShadow(vm);
    } else {
      vm.renderRoot = elm;
    }
    if (true) {
      patchCustomElementWithRestrictions(elm);
    }
    return this;
  };
  function doAttachShadow(vm) {
    const {
      elm,
      mode,
      shadowMode,
      def: {
        ctor
      },
      renderer: {
        attachShadow
      }
    } = vm;
    const shadowRoot = attachShadow(elm, {
      [KEY__SYNTHETIC_MODE]: shadowMode === 1,
      delegatesFocus: Boolean(ctor.delegatesFocus),
      mode
    });
    vm.shadowRoot = shadowRoot;
    associateVM(shadowRoot, vm);
    if (true) {
      patchShadowRootWithRestrictions(shadowRoot);
    }
    if (lwcRuntimeFlags.ENABLE_FORCE_SHADOW_MIGRATE_MODE && vm.shadowMigrateMode) {
      applyShadowMigrateMode(shadowRoot);
    }
    return shadowRoot;
  }
  function warnIfInvokedDuringConstruction(vm, methodOrPropName) {
    if (isBeingConstructed(vm)) {
      logError(`this.${methodOrPropName} should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM or has no children yet.`);
    }
  }
  LightningElement.prototype = {
    constructor: LightningElement,
    dispatchEvent(event) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          dispatchEvent
        }
      } = vm;
      return dispatchEvent(elm, event);
    },
    addEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          addEventListener: addEventListener2
        }
      } = vm;
      if (true) {
        const vmBeingRendered2 = getVMBeingRendered();
        if (isInvokingRender) {
          logError(`${vmBeingRendered2}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
        }
        if (isUpdatingTemplate) {
          logError(`Updating the template of ${vmBeingRendered2} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
        }
        if (!isFunction$1(listener)) {
          logError(`Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
        }
      }
      const wrappedListener = getWrappedComponentsListener(vm, listener);
      addEventListener2(elm, type, wrappedListener, options);
    },
    removeEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          removeEventListener
        }
      } = vm;
      const wrappedListener = getWrappedComponentsListener(vm, listener);
      removeEventListener(elm, type, wrappedListener, options);
    },
    hasAttribute(name) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = vm;
      return !isNull(getAttribute(elm, name));
    },
    hasAttributeNS(namespace, name) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = vm;
      return !isNull(getAttribute(elm, name, namespace));
    },
    removeAttribute(name) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          removeAttribute
        }
      } = vm;
      removeAttribute(elm, name);
    },
    removeAttributeNS(namespace, name) {
      const {
        elm,
        renderer: {
          removeAttribute
        }
      } = getAssociatedVM(this);
      removeAttribute(elm, name, namespace);
    },
    getAttribute(name) {
      const vm = getAssociatedVM(this);
      const {
        elm
      } = vm;
      const {
        getAttribute
      } = vm.renderer;
      return getAttribute(elm, name);
    },
    getAttributeNS(namespace, name) {
      const vm = getAssociatedVM(this);
      const {
        elm
      } = vm;
      const {
        getAttribute
      } = vm.renderer;
      return getAttribute(elm, name, namespace);
    },
    setAttribute(name, value) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          setAttribute
        }
      } = vm;
      if (true) {
        if (isBeingConstructed(vm)) {
          logError(`Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        }
      }
      setAttribute(elm, name, value);
    },
    setAttributeNS(namespace, name, value) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          setAttribute
        }
      } = vm;
      if (true) {
        if (isBeingConstructed(vm)) {
          logError(`Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        }
      }
      setAttribute(elm, name, value, namespace);
    },
    getBoundingClientRect() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getBoundingClientRect
        }
      } = vm;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "getBoundingClientRect()");
      }
      return getBoundingClientRect(elm);
    },
    attachInternals() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        apiVersion,
        renderer: {
          attachInternals
        }
      } = vm;
      if (!isAPIFeatureEnabled(7, apiVersion)) {
        throw new Error(`The attachInternals API is only supported in API version 61 and above. The current version is ${apiVersion}. To use this API, update the LWC component API version. https://lwc.dev/guide/versioning`);
      }
      if (vm.shadowMode === 1) {
        throw new Error("attachInternals API is not supported in synthetic shadow.");
      }
      return attachInternals(elm);
    },
    get isConnected() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          isConnected
        }
      } = vm;
      return isConnected(elm);
    },
    get classList() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getClassList
        }
      } = vm;
      if (true) {
        if (isBeingConstructed(vm)) {
          logError(`Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
        }
      }
      return getClassList(elm);
    },
    get template() {
      const vm = getAssociatedVM(this);
      if (true) {
        if (vm.renderMode === 0) {
          logError("`this.template` returns null for light DOM components. Since there is no shadow, the rendered content can be accessed via `this` itself. e.g. instead of `this.template.querySelector`, use `this.querySelector`.");
        }
      }
      return vm.shadowRoot;
    },
    get hostElement() {
      const vm = getAssociatedVM(this);
      const apiVersion = getComponentAPIVersion(vm.def.ctor);
      if (!isAPIFeatureEnabled(8, apiVersion)) {
        if (true) {
          logWarnOnce("The `this.hostElement` API within LightningElement is only supported in API version 62 and above. Increase the API version to use it.");
        }
        return void 0;
      }
      if (true) {
        assert.isTrue(vm.elm instanceof Element, `this.hostElement should be an Element, found: ${vm.elm}`);
      }
      return vm.elm;
    },
    get refs() {
      const vm = getAssociatedVM(this);
      if (isUpdatingTemplate) {
        if (true) {
          logError(`this.refs should not be called while ${getComponentTag(vm)} is rendering. Use this.refs only when the DOM is stable, e.g. in renderedCallback().`);
        }
        return;
      }
      if (true) {
        warnIfInvokedDuringConstruction(vm, "refs");
      }
      const {
        refVNodes,
        cmpTemplate
      } = vm;
      if (isNull(cmpTemplate) && !isBeingConstructed(vm)) {
        logError(`this.refs is undefined for ${getComponentTag(vm)}. This is either because the attached template has no "lwc:ref" directive, or this.refs was invoked before renderedCallback(). Use this.refs only when the referenced HTML elements have been rendered to the DOM, such as within renderedCallback() or disconnectedCallback().`);
      }
      if (isNull(refVNodes)) {
        return;
      }
      let refs = refsCache.get(refVNodes);
      if (isUndefined$1(refs)) {
        refs = create(null);
        for (const key of keys(refVNodes)) {
          refs[key] = refVNodes[key].elm;
        }
        freeze(refs);
        refsCache.set(refVNodes, refs);
      }
      return refs;
    },
    set refs(value) {
      defineProperty(this, "refs", {
        configurable: true,
        enumerable: true,
        writable: true,
        value
      });
    },
    get shadowRoot() {
      return null;
    },
    get children() {
      const vm = getAssociatedVM(this);
      const renderer2 = vm.renderer;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "children");
      }
      return renderer2.getChildren(vm.elm);
    },
    get childNodes() {
      const vm = getAssociatedVM(this);
      const renderer2 = vm.renderer;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "childNodes");
      }
      return renderer2.getChildNodes(vm.elm);
    },
    get firstChild() {
      const vm = getAssociatedVM(this);
      const renderer2 = vm.renderer;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "firstChild");
      }
      return renderer2.getFirstChild(vm.elm);
    },
    get firstElementChild() {
      const vm = getAssociatedVM(this);
      const renderer2 = vm.renderer;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "firstElementChild");
      }
      return renderer2.getFirstElementChild(vm.elm);
    },
    get lastChild() {
      const vm = getAssociatedVM(this);
      const renderer2 = vm.renderer;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "lastChild");
      }
      return renderer2.getLastChild(vm.elm);
    },
    get lastElementChild() {
      const vm = getAssociatedVM(this);
      const renderer2 = vm.renderer;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "lastElementChild");
      }
      return renderer2.getLastElementChild(vm.elm);
    },
    get ownerDocument() {
      const vm = getAssociatedVM(this);
      const renderer2 = vm.renderer;
      if (true) {
        warnIfInvokedDuringConstruction(vm, "ownerDocument");
      }
      return renderer2.ownerDocument(vm.elm);
    },
    get tagName() {
      const {
        elm,
        renderer: renderer2
      } = getAssociatedVM(this);
      return renderer2.getTagName(elm);
    },
    get style() {
      const {
        elm,
        renderer: renderer2,
        def
      } = getAssociatedVM(this);
      const apiVersion = getComponentAPIVersion(def.ctor);
      if (!isAPIFeatureEnabled(9, apiVersion)) {
        if (true) {
          logWarnOnce("The `this.style` API within LightningElement returning the CSSStyleDeclaration is only supported in API version 62 and above. Increase the API version to use it.");
        }
        return void 0;
      }
      return renderer2.getStyle(elm);
    },
    render() {
      const vm = getAssociatedVM(this);
      return vm.def.template;
    },
    toString() {
      const vm = getAssociatedVM(this);
      return `[object ${vm.def.name}]`;
    }
  };
  const queryAndChildGetterDescriptors = create(null);
  const queryMethods = ["getElementsByClassName", "getElementsByTagName", "querySelector", "querySelectorAll"];
  for (const queryMethod of queryMethods) {
    queryAndChildGetterDescriptors[queryMethod] = {
      value(arg) {
        const vm = getAssociatedVM(this);
        const {
          elm,
          renderer: renderer2
        } = vm;
        if (true) {
          warnIfInvokedDuringConstruction(vm, `${queryMethod}()`);
        }
        return renderer2[queryMethod](elm, arg);
      },
      configurable: true,
      enumerable: true,
      writable: true
    };
  }
  defineProperties(LightningElement.prototype, queryAndChildGetterDescriptors);
  const lightningBasedDescriptors = create(null);
  for (const propName in HTMLElementOriginalDescriptors) {
    lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
  }
  {
    for (const [propName, descriptor] of entries(ariaReflectionPolyfillDescriptors)) {
      lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, descriptor);
    }
  }
  defineProperties(LightningElement.prototype, lightningBasedDescriptors);
  defineProperty(LightningElement, "CustomElementConstructor", {
    get() {
      throw new ReferenceError("The current runtime does not support CustomElementConstructor.");
    },
    configurable: true
  });
  function createObservedFieldPropertyDescriptor(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        const val = vm.cmpFields[key];
        componentValueObserved(vm, key, val);
        return val;
      },
      set(newValue) {
        const vm = getAssociatedVM(this);
        updateComponentValue(vm, key, newValue);
      },
      enumerable: true,
      configurable: true
    };
  }
  const AdapterToTokenMap = new Map();
  function createContextProviderWithRegister(adapter, registerContextProvider2) {
    if (AdapterToTokenMap.has(adapter)) {
      throw new Error(`Adapter already has a context provider.`);
    }
    const adapterContextToken = guid();
    AdapterToTokenMap.set(adapter, adapterContextToken);
    const providers = new WeakSet();
    return (elmOrComponent, options) => {
      if (providers.has(elmOrComponent)) {
        throw new Error(`Adapter was already installed on ${elmOrComponent}.`);
      }
      providers.add(elmOrComponent);
      const {
        consumerConnectedCallback,
        consumerDisconnectedCallback
      } = options;
      registerContextProvider2(elmOrComponent, adapterContextToken, (subscriptionPayload) => {
        const {
          setNewContext,
          setDisconnectedCallback
        } = subscriptionPayload;
        const consumer = {
          provide(newContext) {
            setNewContext(newContext);
          }
        };
        const disconnectCallback = () => {
          if (!isUndefined$1(consumerDisconnectedCallback)) {
            consumerDisconnectedCallback(consumer);
          }
        };
        setDisconnectedCallback(disconnectCallback);
        consumerConnectedCallback(consumer);
      });
    };
  }
  function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
    const {
      adapter
    } = wireDef;
    const adapterContextToken = AdapterToTokenMap.get(adapter);
    if (isUndefined$1(adapterContextToken)) {
      return;
    }
    const {
      elm,
      context: {
        wiredConnecting,
        wiredDisconnecting
      },
      renderer: {
        registerContextConsumer
      }
    } = vm;
    ArrayPush$1.call(wiredConnecting, () => {
      registerContextConsumer(elm, adapterContextToken, {
        setNewContext(newContext) {
          callbackWhenContextIsReady(newContext);
        },
        setDisconnectedCallback(disconnectCallback) {
          ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
        }
      });
    });
  }
  const DeprecatedWiredElementHost = "$$DeprecatedWiredElementHostKey$$";
  const DeprecatedWiredParamsMeta = "$$DeprecatedWiredParamsMetaKey$$";
  const WIRE_DEBUG_ENTRY = "@wire";
  const WireMetaMap = new Map();
  function createFieldDataCallback(vm, name) {
    return (value) => {
      updateComponentValue(vm, name, value);
    };
  }
  function createMethodDataCallback(vm, method) {
    return (value) => {
      runWithBoundaryProtection(vm, vm.owner, noop, () => {
        method.call(vm.component, value);
      }, noop);
    };
  }
  function createConfigWatcher(component, configCallback, callbackWhenConfigIsReady) {
    let hasPendingConfig = false;
    const ro = createReactiveObserver(() => {
      if (hasPendingConfig === false) {
        hasPendingConfig = true;
        Promise.resolve().then(() => {
          hasPendingConfig = false;
          ro.reset();
          computeConfigAndUpdate();
        });
      }
    });
    const computeConfigAndUpdate = () => {
      let config;
      ro.observe(() => config = configCallback(component));
      callbackWhenConfigIsReady(config);
    };
    return {
      computeConfigAndUpdate,
      ro
    };
  }
  function createConnector(vm, name, wireDef) {
    const {
      method,
      adapter,
      configCallback,
      dynamic
    } = wireDef;
    let debugInfo;
    if (true) {
      const wiredPropOrMethod = isUndefined$1(method) ? name : method.name;
      debugInfo = create(null);
      debugInfo.wasDataProvisionedForConfig = false;
      vm.debugInfo[WIRE_DEBUG_ENTRY][wiredPropOrMethod] = debugInfo;
    }
    const fieldOrMethodCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
    const dataCallback = (value) => {
      if (true) {
        debugInfo.data = value;
        debugInfo.wasDataProvisionedForConfig = true;
      }
      fieldOrMethodCallback(value);
    };
    let context;
    let connector;
    defineProperty(dataCallback, DeprecatedWiredElementHost, {
      value: vm.elm
    });
    defineProperty(dataCallback, DeprecatedWiredParamsMeta, {
      value: dynamic
    });
    runWithBoundaryProtection(vm, vm, noop, () => {
      connector = new adapter(dataCallback, {
        tagName: vm.tagName
      });
    }, noop);
    const updateConnectorConfig = (config) => {
      runWithBoundaryProtection(vm, vm, noop, () => {
        if (true) {
          debugInfo.config = config;
          debugInfo.context = context;
          debugInfo.wasDataProvisionedForConfig = false;
        }
        connector.update(config, context);
      }, noop);
    };
    const {
      computeConfigAndUpdate,
      ro
    } = createConfigWatcher(vm.component, configCallback, updateConnectorConfig);
    if (!isUndefined$1(adapter.contextSchema)) {
      createContextWatcher(vm, wireDef, (newContext) => {
        if (context !== newContext) {
          context = newContext;
          if (vm.state === 1) {
            computeConfigAndUpdate();
          }
        }
      });
    }
    return {
      connector,
      computeConfigAndUpdate,
      resetConfigWatcher: () => ro.reset()
    };
  }
  function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
    if (adapter.adapter) {
      adapter = adapter.adapter;
    }
    const method = descriptor.value;
    const def = {
      adapter,
      method,
      configCallback,
      dynamic
    };
    WireMetaMap.set(descriptor, def);
  }
  function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
    if (adapter.adapter) {
      adapter = adapter.adapter;
    }
    const def = {
      adapter,
      configCallback,
      dynamic
    };
    WireMetaMap.set(descriptor, def);
  }
  function installWireAdapters(vm) {
    const {
      context,
      def: {
        wire: wire2
      }
    } = vm;
    if (true) {
      vm.debugInfo[WIRE_DEBUG_ENTRY] = create(null);
    }
    const wiredConnecting = context.wiredConnecting = [];
    const wiredDisconnecting = context.wiredDisconnecting = [];
    for (const fieldNameOrMethod in wire2) {
      const descriptor = wire2[fieldNameOrMethod];
      const wireDef = WireMetaMap.get(descriptor);
      if (true) {
        assert.invariant(wireDef, `Internal Error: invalid wire definition found.`);
      }
      if (!isUndefined$1(wireDef)) {
        const {
          connector,
          computeConfigAndUpdate,
          resetConfigWatcher
        } = createConnector(vm, fieldNameOrMethod, wireDef);
        const hasDynamicParams = wireDef.dynamic.length > 0;
        ArrayPush$1.call(wiredConnecting, () => {
          connector.connect();
          if (!lwcRuntimeFlags.ENABLE_WIRE_SYNC_EMIT) {
            if (hasDynamicParams) {
              Promise.resolve().then(computeConfigAndUpdate);
              return;
            }
          }
          computeConfigAndUpdate();
        });
        ArrayPush$1.call(wiredDisconnecting, () => {
          connector.disconnect();
          resetConfigWatcher();
        });
      }
    }
  }
  function connectWireAdapters(vm) {
    const {
      wiredConnecting
    } = vm.context;
    for (let i2 = 0, len = wiredConnecting.length; i2 < len; i2 += 1) {
      wiredConnecting[i2]();
    }
  }
  function disconnectWireAdapters(vm) {
    const {
      wiredDisconnecting
    } = vm.context;
    runWithBoundaryProtection(vm, vm, noop, () => {
      for (let i2 = 0, len = wiredDisconnecting.length; i2 < len; i2 += 1) {
        wiredDisconnecting[i2]();
      }
    }, noop);
  }
  function api$1(value, context) {
    if (true) {
      assert.fail(`@api decorator can only be used as a decorator function.`);
    }
    throw new Error();
  }
  function createPublicPropertyDescriptor(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        if (isBeingConstructed(vm)) {
          if (true) {
            logError(`Can\u2019t read the value of property \`${toString$1(key)}\` from the constructor because the owner component hasn\u2019t set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
          }
          return;
        }
        const val = vm.cmpProps[key];
        componentValueObserved(vm, key, val);
        return val;
      },
      set(newValue) {
        const vm = getAssociatedVM(this);
        if (true) {
          const vmBeingRendered2 = getVMBeingRendered();
          if (isInvokingRender) {
            logError(`render() method has side effects on the state of property "${toString$1(key)}"`, isNull(vmBeingRendered2) ? vm : vmBeingRendered2);
          }
          if (isUpdatingTemplate) {
            logError(`Updating the template has side effects on the state of property "${toString$1(key)}"`, isNull(vmBeingRendered2) ? vm : vmBeingRendered2);
          }
        }
        vm.cmpProps[key] = newValue;
        componentValueMutated(vm, key);
      },
      enumerable: true,
      configurable: true
    };
  }
  function createPublicAccessorDescriptor(key, descriptor) {
    const {
      get,
      set,
      enumerable,
      configurable
    } = descriptor;
    assert.invariant(isFunction$1(get), `Invalid public accessor ${toString$1(key)} decorated with @api. The property is missing a getter.`);
    return {
      get() {
        if (true) {
          getAssociatedVM(this);
        }
        return get.call(this);
      },
      set(newValue) {
        const vm = getAssociatedVM(this);
        if (true) {
          const vmBeingRendered2 = getVMBeingRendered();
          if (isInvokingRender) {
            logError(`render() method has side effects on the state of property "${toString$1(key)}"`, isNull(vmBeingRendered2) ? vm : vmBeingRendered2);
          }
          if (isUpdatingTemplate) {
            logError(`Updating the template has side effects on the state of property "${toString$1(key)}"`, isNull(vmBeingRendered2) ? vm : vmBeingRendered2);
          }
        }
        if (set) {
          set.call(this, newValue);
        } else if (true) {
          logError(`Invalid attempt to set a new value for property "${toString$1(key)}" that does not has a setter decorated with @api.`, vm);
        }
      },
      enumerable,
      configurable
    };
  }
  function track(target) {
    if (arguments.length === 1) {
      return getReactiveProxy(target);
    }
    if (true) {
      assert.fail(`@track decorator can only be used with one argument to return a trackable object, or as a decorator function.`);
    }
    throw new Error();
  }
  function internalTrackDecorator(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        const val = vm.cmpFields[key];
        componentValueObserved(vm, key, val);
        return val;
      },
      set(newValue) {
        const vm = getAssociatedVM(this);
        if (true) {
          const vmBeingRendered2 = getVMBeingRendered();
          if (isInvokingRender) {
            logError(`${vmBeingRendered2}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
          }
          if (isUpdatingTemplate) {
            logError(`Updating the template of ${vmBeingRendered2} has side effects on the state of ${vm}.${toString$1(key)}`);
          }
        }
        const reactiveOrAnyValue = getReactiveProxy(newValue);
        updateComponentValue(vm, key, reactiveOrAnyValue);
      },
      enumerable: true,
      configurable: true
    };
  }
  function wire(adapter, config) {
    if (true) {
      assert.fail("@wire(adapter, config?) may only be used as a decorator.");
    }
    throw new Error();
  }
  function internalWireFieldDecorator(key) {
    return {
      get() {
        const vm = getAssociatedVM(this);
        componentValueObserved(vm, key);
        return vm.cmpFields[key];
      },
      set(value) {
        const vm = getAssociatedVM(this);
        updateComponentValue(vm, key, value);
      },
      enumerable: true,
      configurable: true
    };
  }
  function getClassDescriptorType(descriptor) {
    if (isFunction$1(descriptor.value)) {
      return "method";
    } else if (isFunction$1(descriptor.set) || isFunction$1(descriptor.get)) {
      return "accessor";
    } else {
      return "field";
    }
  }
  function validateObservedField(Ctor, fieldName, descriptor) {
    assertNotProd();
    if (!isUndefined$1(descriptor)) {
      const type = getClassDescriptorType(descriptor);
      const message = `Invalid observed ${fieldName} field. Found a duplicate ${type} with the same name.`;
      logError(message);
    }
  }
  function validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor) {
    assertNotProd();
    if (!isUndefined$1(descriptor)) {
      const type = getClassDescriptorType(descriptor);
      logError(`Invalid @track ${fieldName} field. Found a duplicate ${type} with the same name.`);
    }
  }
  function validateFieldDecoratedWithWire(Ctor, fieldName, descriptor) {
    assertNotProd();
    if (!isUndefined$1(descriptor)) {
      const type = getClassDescriptorType(descriptor);
      logError(`Invalid @wire ${fieldName} field. Found a duplicate ${type} with the same name.`);
    }
  }
  function validateMethodDecoratedWithWire(Ctor, methodName, descriptor) {
    assertNotProd();
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
      logError(`Invalid @wire ${methodName} field. The field should have a valid writable descriptor.`);
    }
  }
  function validateFieldDecoratedWithApi(Ctor, fieldName, descriptor) {
    assertNotProd();
    if (!isUndefined$1(descriptor)) {
      const type = getClassDescriptorType(descriptor);
      const message = `Invalid @api ${fieldName} field. Found a duplicate ${type} with the same name.`;
      logError(message);
    }
  }
  function validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor) {
    assertNotProd();
    if (isFunction$1(descriptor.set)) {
      if (!isFunction$1(descriptor.get)) {
        logError(`Missing getter for property ${fieldName} decorated with @api in ${Ctor}. You cannot have a setter without the corresponding getter.`);
      }
    } else if (!isFunction$1(descriptor.get)) {
      logError(`Missing @api get ${fieldName} accessor.`);
    }
  }
  function validateMethodDecoratedWithApi(Ctor, methodName, descriptor) {
    assertNotProd();
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
      logError(`Invalid @api ${methodName} method.`);
    }
  }
  function registerDecorators(Ctor, meta) {
    const proto = Ctor.prototype;
    const {
      publicProps,
      publicMethods,
      wire: wire2,
      track: track2,
      fields
    } = meta;
    const apiMethods = create(null);
    const apiFields = create(null);
    const wiredMethods = create(null);
    const wiredFields = create(null);
    const observedFields = create(null);
    const apiFieldsConfig = create(null);
    let descriptor;
    if (!isUndefined$1(publicProps)) {
      for (const fieldName in publicProps) {
        const propConfig = publicProps[fieldName];
        apiFieldsConfig[fieldName] = propConfig.config;
        descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
        if (propConfig.config > 0) {
          if (isUndefined$1(descriptor)) {
            throw new Error();
          }
          if (true) {
            validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor);
          }
          descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
        } else {
          if (true) {
            validateFieldDecoratedWithApi(Ctor, fieldName, descriptor);
          }
          if (!isUndefined$1(descriptor) && !isUndefined$1(descriptor.get)) {
            descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
          } else {
            descriptor = createPublicPropertyDescriptor(fieldName);
          }
        }
        apiFields[fieldName] = descriptor;
        defineProperty(proto, fieldName, descriptor);
      }
    }
    if (!isUndefined$1(publicMethods)) {
      forEach.call(publicMethods, (methodName) => {
        descriptor = getOwnPropertyDescriptor$1(proto, methodName);
        if (true) {
          validateMethodDecoratedWithApi(Ctor, methodName, descriptor);
        }
        if (isUndefined$1(descriptor)) {
          throw new Error();
        }
        apiMethods[methodName] = descriptor;
      });
    }
    if (!isUndefined$1(wire2)) {
      for (const fieldOrMethodName in wire2) {
        const {
          adapter,
          method,
          config: configCallback,
          dynamic = []
        } = wire2[fieldOrMethodName];
        descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);
        if (method === 1) {
          if (true) {
            if (!adapter) {
              logError(`@wire on method "${fieldOrMethodName}": adapter id must be truthy.`);
            }
            validateMethodDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
          }
          if (isUndefined$1(descriptor)) {
            throw new Error();
          }
          wiredMethods[fieldOrMethodName] = descriptor;
          storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
        } else {
          if (true) {
            if (!adapter) {
              logError(`@wire on field "${fieldOrMethodName}": adapter id must be truthy.`);
            }
            validateFieldDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
          }
          descriptor = internalWireFieldDecorator(fieldOrMethodName);
          wiredFields[fieldOrMethodName] = descriptor;
          storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
          defineProperty(proto, fieldOrMethodName, descriptor);
        }
      }
    }
    if (!isUndefined$1(track2)) {
      for (const fieldName in track2) {
        descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
        if (true) {
          validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor);
        }
        descriptor = internalTrackDecorator(fieldName);
        defineProperty(proto, fieldName, descriptor);
      }
    }
    if (!isUndefined$1(fields)) {
      for (let i2 = 0, n = fields.length; i2 < n; i2++) {
        const fieldName = fields[i2];
        descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
        if (true) {
          validateObservedField(Ctor, fieldName, descriptor);
        }
        const isDuplicatePublicProp = !isUndefined$1(publicProps) && fieldName in publicProps;
        const isDuplicateTrackedProp = !isUndefined$1(track2) && fieldName in track2;
        if (!isDuplicatePublicProp && !isDuplicateTrackedProp) {
          observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
        }
      }
    }
    setDecoratorsMeta(Ctor, {
      apiMethods,
      apiFields,
      apiFieldsConfig,
      wiredMethods,
      wiredFields,
      observedFields
    });
    return Ctor;
  }
  const signedDecoratorToMetaMap = new Map();
  function setDecoratorsMeta(Ctor, meta) {
    signedDecoratorToMetaMap.set(Ctor, meta);
  }
  const defaultMeta = {
    apiMethods: EmptyObject,
    apiFields: EmptyObject,
    apiFieldsConfig: EmptyObject,
    wiredMethods: EmptyObject,
    wiredFields: EmptyObject,
    observedFields: EmptyObject
  };
  function getDecoratorsMeta(Ctor) {
    const meta = signedDecoratorToMetaMap.get(Ctor);
    return isUndefined$1(meta) ? defaultMeta : meta;
  }
  let warned = false;
  if (false) {
    window.__lwcResetWarnedOnVersionMismatch = () => {
      warned = false;
    };
  }
  function checkVersionMismatch(func, type) {
    const versionMatcher = func.toString().match(LWC_VERSION_COMMENT_REGEX);
    if (!isNull(versionMatcher) && !warned) {
      const version = versionMatcher[1];
      if (version !== LWC_VERSION) {
        warned = true;
        const friendlyName = type === "component" ? `${type} ${func.name}` : type;
        logError(`LWC WARNING: current engine is v${LWC_VERSION}, but ${friendlyName} was compiled with v${version}.
Please update your compiled code or LWC engine so that the versions match.
No further warnings will appear.`);
        report("CompilerRuntimeVersionMismatch", {
          compilerVersion: version,
          runtimeVersion: LWC_VERSION
        });
      }
    }
  }
  const signedTemplateSet = new Set();
  function defaultEmptyTemplate() {
    return [];
  }
  signedTemplateSet.add(defaultEmptyTemplate);
  function isTemplateRegistered(tpl) {
    return signedTemplateSet.has(tpl);
  }
  function registerTemplate(tpl) {
    if (true) {
      checkVersionMismatch(tpl, "template");
    }
    signedTemplateSet.add(tpl);
    return tpl;
  }
  function sanitizeAttribute(tagName, namespaceUri, attrName, attrValue) {
    return attrValue;
  }
  const cachedGetterByKey = create(null);
  const cachedSetterByKey = create(null);
  function createGetter(key) {
    let fn = cachedGetterByKey[key];
    if (isUndefined$1(fn)) {
      fn = cachedGetterByKey[key] = function() {
        const vm = getAssociatedVM(this);
        const {
          getHook: getHook2
        } = vm;
        return getHook2(vm.component, key);
      };
    }
    return fn;
  }
  function createSetter(key) {
    let fn = cachedSetterByKey[key];
    if (isUndefined$1(fn)) {
      fn = cachedSetterByKey[key] = function(newValue) {
        const vm = getAssociatedVM(this);
        const {
          setHook: setHook2
        } = vm;
        newValue = getReadOnlyProxy(newValue);
        setHook2(vm.component, key, newValue);
      };
    }
    return fn;
  }
  function createMethodCaller(methodName) {
    return function() {
      const vm = getAssociatedVM(this);
      const {
        callHook: callHook2,
        component
      } = vm;
      const fn = component[methodName];
      return callHook2(vm.component, fn, ArraySlice.call(arguments));
    };
  }
  function createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback) {
    return function attributeChangedCallback(attrName, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      const propName = attributeToPropMap[attrName];
      if (isUndefined$1(propName)) {
        if (!isUndefined$1(superAttributeChangedCallback)) {
          superAttributeChangedCallback.apply(this, arguments);
        }
        return;
      }
      this[propName] = newValue;
    };
  }
  function createAccessorThatWarns(propName) {
    let prop;
    return {
      get() {
        logWarn(`The property "${propName}" is not publicly accessible. Add the @api annotation to the property declaration or getter/setter in the component to make it accessible.`);
        return prop;
      },
      set(value) {
        logWarn(`The property "${propName}" is not publicly accessible. Add the @api annotation to the property declaration or getter/setter in the component to make it accessible.`);
        prop = value;
      },
      enumerable: true,
      configurable: true
    };
  }
  function HTMLBridgeElementFactory(SuperClass, publicProperties, methods, observedFields, proto, hasCustomSuperClass) {
    const HTMLBridgeElement = class extends SuperClass {
    };
    const attributeToPropMap = create(null);
    const {
      attributeChangedCallback: superAttributeChangedCallback
    } = SuperClass.prototype;
    const {
      observedAttributes: superObservedAttributes = []
    } = SuperClass;
    const descriptors = create(null);
    if (true) {
      if (!isUndefined$1(proto) && !isNull(proto) && !hasCustomSuperClass) {
        const nonPublicPropertiesToWarnOn = new Set([
          ...keys(getOwnPropertyDescriptors(proto)),
          ...observedFields
        ].filter((propName) => !(propName in HTMLElementPrototype) && !(propName in ariaReflectionPolyfillDescriptors)));
        for (const propName of nonPublicPropertiesToWarnOn) {
          if (ArrayIndexOf.call(publicProperties, propName) === -1) {
            descriptors[propName] = createAccessorThatWarns(propName);
          }
        }
      }
    }
    for (let i2 = 0, len = publicProperties.length; i2 < len; i2 += 1) {
      const propName = publicProperties[i2];
      attributeToPropMap[htmlPropertyToAttribute(propName)] = propName;
      descriptors[propName] = {
        get: createGetter(propName),
        set: createSetter(propName),
        enumerable: true,
        configurable: true
      };
    }
    for (let i2 = 0, len = methods.length; i2 < len; i2 += 1) {
      const methodName = methods[i2];
      descriptors[methodName] = {
        value: createMethodCaller(methodName),
        writable: true,
        configurable: true
      };
    }
    descriptors.attributeChangedCallback = {
      value: createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback)
    };
    descriptors.attachInternals = {
      set() {
        if (true) {
          logWarn("attachInternals cannot be accessed outside of a component. Use this.attachInternals instead.");
        }
      },
      get() {
        if (true) {
          logWarn("attachInternals cannot be accessed outside of a component. Use this.attachInternals instead.");
        }
      }
    };
    descriptors.formAssociated = {
      set() {
        if (true) {
          logWarn("formAssociated cannot be accessed outside of a component. Set the value within the component class.");
        }
      },
      get() {
        if (true) {
          logWarn("formAssociated cannot be accessed outside of a component. Set the value within the component class.");
        }
      }
    };
    defineProperty(HTMLBridgeElement, "observedAttributes", {
      get() {
        return [...superObservedAttributes, ...keys(attributeToPropMap)];
      }
    });
    defineProperties(HTMLBridgeElement.prototype, descriptors);
    return HTMLBridgeElement;
  }
  const basePublicProperties = [...getOwnPropertyNames$1(HTMLElementOriginalDescriptors), ...getOwnPropertyNames$1(ariaReflectionPolyfillDescriptors)];
  const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor, basePublicProperties, [], [], null, false);
  freeze(BaseBridgeElement);
  seal(BaseBridgeElement.prototype);
  let stylesheetsToCssContent = /* @__PURE__ */ new WeakMap();
  let cssContentToAbortControllers = /* @__PURE__ */ new Map();
  if (false) {
    window.__lwcResetStylesheetCache = () => {
      stylesheetsToCssContent = new WeakMap();
      cssContentToAbortControllers = new Map();
    };
  }
  function linkStylesheetToCssContentInDevMode(stylesheet, cssContent) {
    assertNotProd();
    let cssContents = stylesheetsToCssContent.get(stylesheet);
    if (isUndefined$1(cssContents)) {
      cssContents = new Set();
      stylesheetsToCssContent.set(stylesheet, cssContents);
    }
    cssContents.add(cssContent);
  }
  function getOrCreateAbortControllerInDevMode(cssContent) {
    assertNotProd();
    let abortController = cssContentToAbortControllers.get(cssContent);
    if (isUndefined$1(abortController)) {
      abortController = new AbortController();
      cssContentToAbortControllers.set(cssContent, abortController);
    }
    return abortController;
  }
  function getOrCreateAbortSignal(cssContent) {
    if (true) {
      return getOrCreateAbortControllerInDevMode(cssContent).signal;
    }
    return void 0;
  }
  function makeHostToken(token) {
    return `${token}-host`;
  }
  function createInlineStyleVNode(content) {
    return api.h("style", {
      key: "style",
      attrs: {
        type: "text/css"
      }
    }, [api.t(content)]);
  }
  function updateStylesheetToken(vm, template, legacy) {
    const {
      elm,
      context,
      renderMode,
      shadowMode,
      renderer: {
        getClassList,
        removeAttribute,
        setAttribute
      }
    } = vm;
    const {
      stylesheets: newStylesheets
    } = template;
    const newStylesheetToken = legacy ? template.legacyStylesheetToken : template.stylesheetToken;
    const {
      stylesheets: newVmStylesheets
    } = vm;
    const isSyntheticShadow = renderMode === 1 && shadowMode === 1;
    const {
      hasScopedStyles
    } = context;
    let newToken;
    let newHasTokenInClass;
    let newHasTokenInAttribute;
    let oldToken;
    let oldHasTokenInClass;
    let oldHasTokenInAttribute;
    if (legacy) {
      oldToken = context.legacyStylesheetToken;
      oldHasTokenInClass = context.hasLegacyTokenInClass;
      oldHasTokenInAttribute = context.hasLegacyTokenInAttribute;
    } else {
      oldToken = context.stylesheetToken;
      oldHasTokenInClass = context.hasTokenInClass;
      oldHasTokenInAttribute = context.hasTokenInAttribute;
    }
    if (!isUndefined$1(oldToken)) {
      if (oldHasTokenInClass) {
        getClassList(elm).remove(makeHostToken(oldToken));
      }
      if (oldHasTokenInAttribute) {
        removeAttribute(elm, makeHostToken(oldToken));
      }
    }
    const hasNewStylesheets = hasStyles(newStylesheets);
    const hasNewVmStylesheets = hasStyles(newVmStylesheets);
    if (hasNewStylesheets || hasNewVmStylesheets) {
      newToken = newStylesheetToken;
    }
    if (!isUndefined$1(newToken)) {
      if (hasScopedStyles) {
        getClassList(elm).add(makeHostToken(newToken));
        newHasTokenInClass = true;
      }
      if (isSyntheticShadow) {
        setAttribute(elm, makeHostToken(newToken), "");
        newHasTokenInAttribute = true;
      }
    }
    if (legacy) {
      context.legacyStylesheetToken = newToken;
      context.hasLegacyTokenInClass = newHasTokenInClass;
      context.hasLegacyTokenInAttribute = newHasTokenInAttribute;
    } else {
      context.stylesheetToken = newToken;
      context.hasTokenInClass = newHasTokenInClass;
      context.hasTokenInAttribute = newHasTokenInAttribute;
    }
  }
  function evaluateStylesheetsContent(stylesheets, stylesheetToken, vm) {
    const content = [];
    let root;
    for (let i2 = 0; i2 < stylesheets.length; i2++) {
      let stylesheet = stylesheets[i2];
      if (isArray$1(stylesheet)) {
        ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, stylesheetToken, vm));
      } else {
        if (true) {
          checkVersionMismatch(stylesheet, "stylesheet");
          stylesheet = getStyleOrSwappedStyle(stylesheet);
        }
        const isScopedCss = stylesheet[KEY__SCOPED_CSS];
        if (lwcRuntimeFlags.DISABLE_LIGHT_DOM_UNSCOPED_CSS && !isScopedCss && vm.renderMode === 0) {
          logError("Unscoped CSS is not supported in Light DOM in this environment. Please use scoped CSS (*.scoped.css) instead of unscoped CSS (*.css). See also: https://sfdc.co/scoped-styles-light-dom");
          continue;
        }
        const scopeToken = isScopedCss || vm.shadowMode === 1 && vm.renderMode === 1 ? stylesheetToken : void 0;
        const useActualHostSelector = vm.renderMode === 0 ? !isScopedCss : vm.shadowMode === 0;
        let useNativeDirPseudoclass;
        if (vm.renderMode === 1) {
          useNativeDirPseudoclass = vm.shadowMode === 0;
        } else {
          if (isUndefined$1(root)) {
            root = getNearestShadowComponent(vm);
          }
          useNativeDirPseudoclass = isNull(root) || root.shadowMode === 0;
        }
        const cssContent = stylesheet(scopeToken, useActualHostSelector, useNativeDirPseudoclass);
        if (true) {
          linkStylesheetToCssContentInDevMode(stylesheet, cssContent);
        }
        ArrayPush$1.call(content, cssContent);
      }
    }
    return content;
  }
  function getStylesheetsContent(vm, template) {
    const {
      stylesheets,
      stylesheetToken
    } = template;
    const {
      stylesheets: vmStylesheets
    } = vm;
    let content = [];
    if (hasStyles(stylesheets)) {
      content = evaluateStylesheetsContent(stylesheets, stylesheetToken, vm);
    }
    if (hasStyles(vmStylesheets)) {
      ArrayPush$1.apply(content, evaluateStylesheetsContent(vmStylesheets, stylesheetToken, vm));
    }
    return content;
  }
  function getNearestShadowComponent(vm) {
    let owner = vm;
    while (!isNull(owner)) {
      if (owner.renderMode === 1) {
        return owner;
      }
      owner = owner.owner;
    }
    return owner;
  }
  function getScopeTokenClass(owner, legacy) {
    const {
      cmpTemplate,
      context
    } = owner;
    return context.hasScopedStyles && (legacy ? cmpTemplate?.legacyStylesheetToken : cmpTemplate?.stylesheetToken) || null;
  }
  function getStylesheetTokenHost(vnode) {
    const {
      template
    } = getComponentInternalDef(vnode.ctor);
    const {
      vm
    } = vnode;
    const {
      stylesheetToken
    } = template;
    return !isUndefined$1(stylesheetToken) && computeHasScopedStyles(template, vm) ? makeHostToken(stylesheetToken) : null;
  }
  function getNearestNativeShadowComponent(vm) {
    const owner = getNearestShadowComponent(vm);
    if (!isNull(owner) && owner.shadowMode === 1) {
      return null;
    }
    return owner;
  }
  function createStylesheet(vm, stylesheets) {
    const {
      renderMode,
      shadowMode,
      renderer: {
        insertStylesheet: insertStylesheet2
      }
    } = vm;
    if (renderMode === 1 && shadowMode === 1) {
      for (let i2 = 0; i2 < stylesheets.length; i2++) {
        const stylesheet = stylesheets[i2];
        insertStylesheet2(stylesheet, void 0, getOrCreateAbortSignal(stylesheet));
      }
    } else if (vm.hydrated) {
      return ArrayMap.call(stylesheets, createInlineStyleVNode);
    } else {
      const root = getNearestNativeShadowComponent(vm);
      const target = isNull(root) ? void 0 : root.shadowRoot;
      for (let i2 = 0; i2 < stylesheets.length; i2++) {
        const stylesheet = stylesheets[i2];
        insertStylesheet2(stylesheet, target, getOrCreateAbortSignal(stylesheet));
      }
    }
    return null;
  }
  function unrenderStylesheet(stylesheet) {
    assertNotProd();
    const cssContents = stylesheetsToCssContent.get(stylesheet);
    if (isUndefined$1(cssContents)) {
      throw new Error("Cannot unrender stylesheet which was never rendered");
    }
    for (const cssContent of cssContents) {
      const abortController = cssContentToAbortControllers.get(cssContent);
      if (isUndefined$1(abortController)) {
        continue;
      }
      abortController.abort();
      cssContentToAbortControllers.delete(cssContent);
    }
  }
  const supportsWeakRefs = typeof WeakRef === "function" && typeof FinalizationRegistry === "function";
  class LegacyWeakMultiMap {
    constructor() {
      this._map = new WeakMap();
    }
    _getValues(key) {
      let values = this._map.get(key);
      if (isUndefined$1(values)) {
        values = new Set();
        this._map.set(key, values);
      }
      return values;
    }
    get(key) {
      return this._getValues(key);
    }
    add(key, vm) {
      const set = this._getValues(key);
      set.add(vm);
    }
    delete(key) {
      this._map.delete(key);
    }
  }
  class ModernWeakMultiMap {
    constructor() {
      this._map = new WeakMap();
      this._registry = new FinalizationRegistry((weakRefs) => {
        for (let i2 = weakRefs.length - 1; i2 >= 0; i2--) {
          const vm = weakRefs[i2].deref();
          if (isUndefined$1(vm)) {
            ArraySplice.call(weakRefs, i2, 1);
          }
        }
      });
    }
    _getWeakRefs(key) {
      let weakRefs = this._map.get(key);
      if (isUndefined$1(weakRefs)) {
        weakRefs = [];
        this._map.set(key, weakRefs);
      }
      return weakRefs;
    }
    get(key) {
      const weakRefs = this._getWeakRefs(key);
      const result = new Set();
      for (const weakRef of weakRefs) {
        const vm = weakRef.deref();
        if (!isUndefined$1(vm)) {
          result.add(vm);
        }
      }
      return result;
    }
    add(key, value) {
      const weakRefs = this._getWeakRefs(key);
      ArrayPush$1.call(weakRefs, new WeakRef(value));
      this._registry.register(value, weakRefs);
    }
    delete(key) {
      this._map.delete(key);
    }
  }
  const WeakMultiMap = supportsWeakRefs ? ModernWeakMultiMap : LegacyWeakMultiMap;
  let swappedTemplateMap = /* @__PURE__ */ new WeakMap();
  let swappedComponentMap = /* @__PURE__ */ new WeakMap();
  let swappedStyleMap = /* @__PURE__ */ new WeakMap();
  let activeTemplates = /* @__PURE__ */ new WeakMultiMap();
  let activeComponents = /* @__PURE__ */ new WeakMultiMap();
  let activeStyles = /* @__PURE__ */ new WeakMultiMap();
  if (false) {
    window.__lwcResetHotSwaps = () => {
      swappedTemplateMap = new WeakMap();
      swappedComponentMap = new WeakMap();
      swappedStyleMap = new WeakMap();
      activeTemplates = new WeakMultiMap();
      activeComponents = new WeakMultiMap();
      activeStyles = new WeakMultiMap();
    };
  }
  function rehydrateHotTemplate(tpl) {
    const list = activeTemplates.get(tpl);
    for (const vm of list) {
      if (isFalse(vm.isDirty)) {
        markComponentAsDirty(vm);
        scheduleRehydration(vm);
      }
    }
    activeTemplates.delete(tpl);
    return true;
  }
  function rehydrateHotStyle(style) {
    const activeVMs = activeStyles.get(style);
    if (!activeVMs.size) {
      return true;
    }
    unrenderStylesheet(style);
    for (const vm of activeVMs) {
      forceRehydration(vm);
    }
    activeStyles.delete(style);
    return true;
  }
  function rehydrateHotComponent(Ctor) {
    const list = activeComponents.get(Ctor);
    let canRefreshAllInstances = true;
    for (const vm of list) {
      const {
        owner
      } = vm;
      if (!isNull(owner)) {
        forceRehydration(owner);
      } else {
        canRefreshAllInstances = false;
      }
    }
    activeComponents.delete(Ctor);
    return canRefreshAllInstances;
  }
  function getTemplateOrSwappedTemplate(tpl) {
    assertNotProd();
    const visited = new Set();
    while (swappedTemplateMap.has(tpl) && !visited.has(tpl)) {
      visited.add(tpl);
      tpl = swappedTemplateMap.get(tpl);
    }
    return tpl;
  }
  function getComponentOrSwappedComponent(Ctor) {
    assertNotProd();
    const visited = new Set();
    while (swappedComponentMap.has(Ctor) && !visited.has(Ctor)) {
      visited.add(Ctor);
      Ctor = swappedComponentMap.get(Ctor);
    }
    return Ctor;
  }
  function getStyleOrSwappedStyle(style) {
    assertNotProd();
    const visited = new Set();
    while (swappedStyleMap.has(style) && !visited.has(style)) {
      visited.add(style);
      style = swappedStyleMap.get(style);
    }
    return style;
  }
  function addActiveStylesheets(stylesheets, vm) {
    if (isUndefined$1(stylesheets) || isNull(stylesheets)) {
      return;
    }
    for (const stylesheet of flattenStylesheets(stylesheets)) {
      const swappedStylesheet = getStyleOrSwappedStyle(stylesheet);
      activeStyles.add(swappedStylesheet, vm);
    }
  }
  function setActiveVM(vm) {
    assertNotProd();
    const Ctor = vm.def.ctor;
    activeComponents.add(Ctor, vm);
    const template = vm.cmpTemplate;
    if (!isNull(template)) {
      activeTemplates.add(template, vm);
      addActiveStylesheets(template.stylesheets, vm);
      addActiveStylesheets(vm.stylesheets, vm);
    }
  }
  function swapTemplate(oldTpl, newTpl) {
    if (true) {
      if (isTemplateRegistered(oldTpl) && isTemplateRegistered(newTpl)) {
        swappedTemplateMap.set(oldTpl, newTpl);
        return rehydrateHotTemplate(oldTpl);
      } else {
        throw new TypeError(`Invalid Template`);
      }
    }
    return false;
  }
  function swapComponent(oldComponent, newComponent) {
    if (true) {
      const isOldCtorAComponent = isComponentConstructor(oldComponent);
      const isNewCtorAComponent = isComponentConstructor(newComponent);
      if (isOldCtorAComponent && isNewCtorAComponent) {
        swappedComponentMap.set(oldComponent, newComponent);
        return rehydrateHotComponent(oldComponent);
      } else if (isOldCtorAComponent === false && isNewCtorAComponent === true) {
        throw new TypeError(`Invalid Component: Attempting to swap a non-component with a component`);
      } else if (isOldCtorAComponent === true && isNewCtorAComponent === false) {
        throw new TypeError(`Invalid Component: Attempting to swap a component with a non-component`);
      } else {
        return false;
      }
    }
    return false;
  }
  function swapStyle(oldStyle, newStyle) {
    if (true) {
      swappedStyleMap.set(oldStyle, newStyle);
      return rehydrateHotStyle(oldStyle);
    }
    return false;
  }
  const CtorToDefMap = new WeakMap();
  function getCtorProto(Ctor) {
    let proto = getPrototypeOf$1(Ctor);
    if (isNull(proto)) {
      throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
    }
    if (isCircularModuleDependency(proto)) {
      const p = resolveCircularModuleDependency(proto);
      if (true) {
        if (isNull(p)) {
          throw new ReferenceError(`Circular module dependency for ${Ctor.name}, must resolve to a constructor that extends LightningElement.`);
        }
      }
      proto = p === proto ? LightningElement : p;
    }
    return proto;
  }
  function createComponentDef(Ctor) {
    const {
      shadowSupportMode: ctorShadowSupportMode,
      renderMode: ctorRenderMode,
      formAssociated: ctorFormAssociated
    } = Ctor;
    if (true) {
      const ctorName = Ctor.name;
      if (!Ctor.constructor) {
        logError(`Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);
      }
      if (!isUndefined$1(ctorShadowSupportMode) && ctorShadowSupportMode !== "any" && ctorShadowSupportMode !== "reset" && ctorShadowSupportMode !== "native") {
        logError(`Invalid value for static property shadowSupportMode: '${ctorShadowSupportMode}'`);
      }
      if (ctorShadowSupportMode === "any") {
        logWarn(`Invalid value 'any' for static property shadowSupportMode. 'any' is deprecated and will be removed in a future release--use 'native' instead.`);
      }
      if (!isUndefined$1(ctorRenderMode) && ctorRenderMode !== "light" && ctorRenderMode !== "shadow") {
        logError(`Invalid value for static property renderMode: '${ctorRenderMode}'. renderMode must be either 'light' or 'shadow'.`);
      }
    }
    const decoratorsMeta = getDecoratorsMeta(Ctor);
    const {
      apiFields,
      apiFieldsConfig,
      apiMethods,
      wiredFields,
      wiredMethods,
      observedFields
    } = decoratorsMeta;
    const proto = Ctor.prototype;
    let {
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      formAssociatedCallback,
      formResetCallback,
      formDisabledCallback,
      formStateRestoreCallback,
      render
    } = proto;
    const superProto = getCtorProto(Ctor);
    const hasCustomSuperClass = superProto !== LightningElement;
    const superDef = hasCustomSuperClass ? getComponentInternalDef(superProto) : lightingElementDef;
    const bridge = HTMLBridgeElementFactory(superDef.bridge, keys(apiFields), keys(apiMethods), keys(observedFields), proto, hasCustomSuperClass);
    const props = assign(create(null), superDef.props, apiFields);
    const propsConfig = assign(create(null), superDef.propsConfig, apiFieldsConfig);
    const methods = assign(create(null), superDef.methods, apiMethods);
    const wire2 = assign(create(null), superDef.wire, wiredFields, wiredMethods);
    connectedCallback = connectedCallback || superDef.connectedCallback;
    disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
    renderedCallback = renderedCallback || superDef.renderedCallback;
    errorCallback = errorCallback || superDef.errorCallback;
    formAssociatedCallback = formAssociatedCallback || superDef.formAssociatedCallback;
    formResetCallback = formResetCallback || superDef.formResetCallback;
    formDisabledCallback = formDisabledCallback || superDef.formDisabledCallback;
    formStateRestoreCallback = formStateRestoreCallback || superDef.formStateRestoreCallback;
    render = render || superDef.render;
    let shadowSupportMode = superDef.shadowSupportMode;
    if (!isUndefined$1(ctorShadowSupportMode)) {
      shadowSupportMode = ctorShadowSupportMode;
      if (isReportingEnabled() && (shadowSupportMode === "any" || shadowSupportMode === "native")) {
        report("ShadowSupportModeUsage", {
          tagName: Ctor.name,
          mode: shadowSupportMode
        });
      }
    }
    let renderMode = superDef.renderMode;
    if (!isUndefined$1(ctorRenderMode)) {
      renderMode = ctorRenderMode === "light" ? 0 : 1;
    }
    let formAssociated = superDef.formAssociated;
    if (!isUndefined$1(ctorFormAssociated)) {
      formAssociated = ctorFormAssociated;
    }
    const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
    const name = Ctor.name || superDef.name;
    defineProperties(proto, observedFields);
    const def = {
      ctor: Ctor,
      name,
      wire: wire2,
      props,
      propsConfig,
      methods,
      bridge,
      template,
      renderMode,
      shadowSupportMode,
      formAssociated,
      connectedCallback,
      disconnectedCallback,
      errorCallback,
      formAssociatedCallback,
      formDisabledCallback,
      formResetCallback,
      formStateRestoreCallback,
      renderedCallback,
      render
    };
    instrumentDef(def);
    if (true) {
      freeze(Ctor.prototype);
    }
    return def;
  }
  function isComponentConstructor(ctor) {
    if (!isFunction$1(ctor)) {
      return false;
    }
    if (ctor.prototype instanceof LightningElement) {
      return true;
    }
    let current = ctor;
    do {
      if (isCircularModuleDependency(current)) {
        const circularResolved = resolveCircularModuleDependency(current);
        if (circularResolved === current) {
          return true;
        }
        current = circularResolved;
      }
      if (current === LightningElement) {
        return true;
      }
    } while (!isNull(current) && (current = getPrototypeOf$1(current)));
    return false;
  }
  function getComponentInternalDef(Ctor) {
    if (true) {
      Ctor = getComponentOrSwappedComponent(Ctor);
    }
    let def = CtorToDefMap.get(Ctor);
    if (isUndefined$1(def)) {
      if (isCircularModuleDependency(Ctor)) {
        const resolvedCtor = resolveCircularModuleDependency(Ctor);
        def = getComponentInternalDef(resolvedCtor);
        CtorToDefMap.set(Ctor, def);
        return def;
      }
      if (!isComponentConstructor(Ctor)) {
        throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
      }
      def = createComponentDef(Ctor);
      CtorToDefMap.set(Ctor, def);
    }
    return def;
  }
  function getComponentHtmlPrototype(Ctor) {
    const def = getComponentInternalDef(Ctor);
    return def.bridge;
  }
  const lightingElementDef = {
    ctor: LightningElement,
    name: LightningElement.name,
    props: lightningBasedDescriptors,
    propsConfig: EmptyObject,
    methods: EmptyObject,
    renderMode: 1,
    shadowSupportMode: "reset",
    formAssociated: void 0,
    wire: EmptyObject,
    bridge: BaseBridgeElement,
    template: defaultEmptyTemplate,
    render: LightningElement.prototype.render
  };
  function getComponentDef(Ctor) {
    const def = getComponentInternalDef(Ctor);
    const {
      ctor,
      name,
      props,
      propsConfig,
      methods
    } = def;
    const publicProps = {};
    for (const key in props) {
      publicProps[key] = {
        config: propsConfig[key] || 0,
        type: "any",
        attr: htmlPropertyToAttribute(key)
      };
    }
    const publicMethods = {};
    for (const key in methods) {
      publicMethods[key] = methods[key].value;
    }
    return {
      ctor,
      name,
      props: publicProps,
      methods: publicMethods
    };
  }
  function isVBaseElement(vnode) {
    const {
      type
    } = vnode;
    return type === 2 || type === 3;
  }
  function isSameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }
  function isVCustomElement(vnode) {
    return vnode.type === 3;
  }
  function isVFragment(vnode) {
    return vnode.type === 5;
  }
  function isVScopedSlotFragment(vnode) {
    return vnode.type === 6;
  }
  function isVStatic(vnode) {
    return vnode.type === 4;
  }
  function isVStaticPartElement(vnode) {
    return vnode.type === 1;
  }
  function isVStaticPartText(vnode) {
    return vnode.type === 0;
  }
  const ColonCharCode = 58;
  function patchAttributes(oldVnode, vnode, renderer2) {
    const {
      data,
      elm
    } = vnode;
    const {
      attrs
    } = data;
    if (isUndefined$1(attrs)) {
      return;
    }
    const oldAttrs = isNull(oldVnode) ? EmptyObject : oldVnode.data.attrs;
    if (oldAttrs === attrs) {
      return;
    }
    const external = "external" in data ? data.external : false;
    const {
      setAttribute,
      removeAttribute,
      setProperty
    } = renderer2;
    for (const key in attrs) {
      const cur = attrs[key];
      const old = oldAttrs[key];
      if (old !== cur) {
        let propName;
        if (external && (propName = kebabCaseToCamelCase(key)) in elm) {
          setProperty(elm, propName, cur);
        } else if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
          setAttribute(elm, key, cur, XML_NAMESPACE);
        } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
          setAttribute(elm, key, cur, XLINK_NAMESPACE);
        } else if (isNull(cur) || isUndefined$1(cur)) {
          removeAttribute(elm, key);
        } else {
          setAttribute(elm, key, cur);
        }
      }
    }
  }
  function patchSlotAssignment(oldVnode, vnode, renderer2) {
    const {
      slotAssignment
    } = vnode;
    if (oldVnode?.slotAssignment === slotAssignment) {
      return;
    }
    const {
      elm
    } = vnode;
    const {
      setAttribute,
      removeAttribute
    } = renderer2;
    if (isUndefined$1(slotAssignment) || isNull(slotAssignment)) {
      removeAttribute(elm, "slot");
    } else {
      setAttribute(elm, "slot", slotAssignment);
    }
  }
  function isLiveBindingProp(sel, key) {
    return sel === "input" && (key === "value" || key === "checked");
  }
  function patchProps(oldVnode, vnode, renderer2) {
    const {
      props
    } = vnode.data;
    if (isUndefined$1(props)) {
      return;
    }
    let oldProps;
    if (!isNull(oldVnode)) {
      oldProps = oldVnode.data.props;
      if (oldProps === props) {
        return;
      }
      if (isUndefined$1(oldProps)) {
        oldProps = EmptyObject;
      }
    }
    const isFirstPatch = isNull(oldVnode);
    const {
      elm,
      sel
    } = vnode;
    const {
      getProperty,
      setProperty
    } = renderer2;
    for (const key in props) {
      const cur = props[key];
      if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? getProperty(elm, key) : oldProps[key]) || !(key in oldProps)) {
        if (true) {
          if (!(key in elm)) {
            logWarn(`Unknown public property "${key}" of element <${elm.tagName.toLowerCase()}>. This is either a typo on the corresponding attribute "${htmlPropertyToAttribute(key)}", or the attribute does not exist in this browser or DOM implementation.`);
          }
        }
        setProperty(elm, key, cur);
      }
    }
  }
  const classNameToClassMap = create(null);
  function getMapFromClassName(className) {
    if (isUndefined$1(className) || isNull(className) || className === "") {
      return EmptyObject;
    }
    className = isString(className) ? className : className + "";
    let map = classNameToClassMap[className];
    if (map) {
      return map;
    }
    map = create(null);
    let start2 = 0;
    let o;
    const len = className.length;
    for (o = 0; o < len; o++) {
      if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
        if (o > start2) {
          map[StringSlice.call(className, start2, o)] = true;
        }
        start2 = o + 1;
      }
    }
    if (o > start2) {
      map[StringSlice.call(className, start2, o)] = true;
    }
    classNameToClassMap[className] = map;
    if (true) {
      freeze(map);
    }
    return map;
  }
  function patchClassAttribute(oldVnode, vnode, renderer2) {
    const {
      elm,
      data: {
        className: newClass
      }
    } = vnode;
    const oldClass = isNull(oldVnode) ? void 0 : oldVnode.data.className;
    if (oldClass === newClass) {
      return;
    }
    const newClassMap = getMapFromClassName(newClass);
    const oldClassMap = getMapFromClassName(oldClass);
    if (oldClassMap === newClassMap) {
      return;
    }
    const {
      getClassList
    } = renderer2;
    const classList = getClassList(elm);
    let name;
    for (name in oldClassMap) {
      if (isUndefined$1(newClassMap[name])) {
        classList.remove(name);
      }
    }
    for (name in newClassMap) {
      if (isUndefined$1(oldClassMap[name])) {
        classList.add(name);
      }
    }
  }
  function patchStyleAttribute(oldVnode, vnode, renderer2, owner) {
    const {
      elm,
      data: {
        style: newStyle
      }
    } = vnode;
    if (true) {
      if (!isNull(newStyle) && !isUndefined$1(newStyle) && !isString(newStyle)) {
        logError(`Invalid 'style' attribute passed to <${elm.tagName.toLowerCase()}> is ignored. This attribute must be a string value.`, owner);
      }
    }
    const oldStyle = isNull(oldVnode) ? void 0 : oldVnode.data.style;
    if (oldStyle === newStyle) {
      return;
    }
    const {
      setAttribute,
      removeAttribute
    } = renderer2;
    if (!isString(newStyle) || newStyle === "") {
      removeAttribute(elm, "style");
    } else {
      setAttribute(elm, "style", newStyle);
    }
  }
  function applyEventListeners(vnode, renderer2) {
    const {
      elm,
      data
    } = vnode;
    const {
      on
    } = data;
    if (isUndefined$1(on)) {
      return;
    }
    const {
      addEventListener: addEventListener2
    } = renderer2;
    for (const name in on) {
      const handler = on[name];
      addEventListener2(elm, name, handler);
    }
  }
  function applyStaticClassAttribute(vnode, renderer2) {
    const {
      elm,
      data: {
        classMap
      }
    } = vnode;
    if (isUndefined$1(classMap)) {
      return;
    }
    const {
      getClassList
    } = renderer2;
    const classList = getClassList(elm);
    for (const name in classMap) {
      classList.add(name);
    }
  }
  function applyStaticStyleAttribute(vnode, renderer2) {
    const {
      elm,
      data: {
        styleDecls
      }
    } = vnode;
    if (isUndefined$1(styleDecls)) {
      return;
    }
    const {
      setCSSStyleProperty
    } = renderer2;
    for (let i2 = 0; i2 < styleDecls.length; i2++) {
      const [prop, value, important] = styleDecls[i2];
      setCSSStyleProperty(elm, prop, value, important);
    }
  }
  function applyRefs(vnode, owner) {
    const {
      data
    } = vnode;
    const {
      ref
    } = data;
    if (isUndefined$1(ref)) {
      return;
    }
    if (isUndefined$1(owner.refVNodes)) {
      throw new Error("refVNodes must be defined when setting a ref");
    }
    const refVNodes = owner.refVNodes;
    refVNodes[ref] = vnode;
  }
  function patchTextVNode(n1, n2, renderer2) {
    n2.elm = n1.elm;
    if (n2.text !== n1.text) {
      updateTextContent$1(n2, renderer2);
    }
  }
  function patchTextVStaticPart(n1, n2, renderer2) {
    if (isNull(n1) || n2.text !== n1.text) {
      updateTextContent$1(n2, renderer2);
    }
  }
  function updateTextContent$1(vnode, renderer2) {
    const {
      elm,
      text
    } = vnode;
    const {
      setText
    } = renderer2;
    if (true) {
      unlockDomMutation();
    }
    setText(elm, text);
    if (true) {
      lockDomMutation();
    }
  }
  function traverseAndSetElements(root, parts, renderer2) {
    const numParts = parts.length;
    if (numParts === 1) {
      const firstPart = parts[0];
      if (firstPart.partId === 0) {
        firstPart.elm = root;
        return;
      }
    }
    const partIdsToParts = new Map();
    for (const staticPart of parts) {
      partIdsToParts.set(staticPart.partId, staticPart);
    }
    const {
      nextSibling,
      getFirstChild,
      getParentNode
    } = renderer2;
    let numFoundParts = 0;
    let partId = -1;
    function assertNotRoot(node2) {
      if (true) {
        assert.isFalse(node2 === root, `Reached the root without finding all parts. Found ${numFoundParts}, needed ${numParts}.`);
      }
    }
    let node = root;
    while (!isNull(node)) {
      partId++;
      const part = partIdsToParts.get(partId);
      if (!isUndefined$1(part)) {
        part.elm = node;
        numFoundParts++;
        if (numFoundParts === numParts) {
          return;
        }
      }
      const child = getFirstChild(node);
      if (!isNull(child)) {
        node = child;
      } else {
        let sibling;
        while (isNull(sibling = nextSibling(node))) {
          assertNotRoot(node);
          node = getParentNode(node);
        }
        assertNotRoot(node);
        node = sibling;
      }
    }
    if (true) {
      assert.isTrue(numFoundParts === numParts, `Should have found all parts by now. Found ${numFoundParts}, needed ${numParts}.`);
    }
  }
  function mountStaticParts(root, vnode, renderer2) {
    const {
      parts,
      owner
    } = vnode;
    if (isUndefined$1(parts)) {
      return;
    }
    traverseAndSetElements(root, parts, renderer2);
    for (const part of parts) {
      if (isVStaticPartElement(part)) {
        applyEventListeners(part, renderer2);
        applyRefs(part, owner);
        patchAttributes(null, part, renderer2);
        patchClassAttribute(null, part, renderer2);
        patchStyleAttribute(null, part, renderer2, owner);
      } else {
        if (!isVStaticPartText(part)) {
          throw new Error(`LWC internal error, encountered unknown static part type: ${part.type}`);
        }
        patchTextVStaticPart(null, part, renderer2);
      }
    }
  }
  function patchStaticParts(n1, n2, renderer2) {
    const {
      parts: currParts,
      owner: currPartsOwner
    } = n2;
    if (isUndefined$1(currParts)) {
      return;
    }
    const {
      parts: prevParts
    } = n1;
    if (true) {
      assert.isTrue(currParts.length === prevParts?.length, "Expected static parts to be the same for the same element. This is an error with the LWC framework itself.");
    }
    for (let i2 = 0; i2 < currParts.length; i2++) {
      const prevPart = prevParts[i2];
      const part = currParts[i2];
      part.elm = prevPart.elm;
      if (prevPart.type !== part.type) {
        throw new Error(`LWC internal error, static part types do not match. Previous type was ${prevPart.type} and current type is ${part.type}`);
      }
      if (isVStaticPartElement(part)) {
        applyRefs(part, currPartsOwner);
        patchAttributes(prevPart, part, renderer2);
        patchClassAttribute(prevPart, part, renderer2);
        patchStyleAttribute(prevPart, part, renderer2, currPartsOwner);
      } else {
        patchTextVStaticPart(null, part, renderer2);
      }
    }
  }
  function hydrateStaticParts(vnode, renderer2) {
    const {
      parts,
      owner
    } = vnode;
    if (isUndefined$1(parts)) {
      return;
    }
    for (const part of parts) {
      if (isVStaticPartElement(part)) {
        applyEventListeners(part, renderer2);
        applyRefs(part, owner);
      }
    }
  }
  function patchChildren(c1, c2, parent, renderer2) {
    if (hasDynamicChildren(c2)) {
      updateDynamicChildren(c1, c2, parent, renderer2);
    } else {
      updateStaticChildren(c1, c2, parent, renderer2);
    }
  }
  function patch(n1, n2, parent, renderer2) {
    if (n1 === n2) {
      return;
    }
    if (true) {
      if (!isSameVnode(n1, n2) && !(isVCustomElement(n1) && isVCustomElement(n2))) {
        throw new Error("Expected these VNodes to be the same: " + JSON.stringify({
          sel: n1.sel,
          key: n1.key
        }) + ", " + JSON.stringify({
          sel: n2.sel,
          key: n2.key
        }));
      }
    }
    switch (n2.type) {
      case 0:
        patchTextVNode(n1, n2, renderer2);
        break;
      case 1:
        patchComment(n1, n2, renderer2);
        break;
      case 4:
        patchStatic(n1, n2, renderer2);
        break;
      case 5:
        patchFragment(n1, n2, parent, renderer2);
        break;
      case 2:
        patchElement(n1, n2, n2.data.renderer ?? renderer2);
        break;
      case 3:
        patchCustomElement(n1, n2, parent, n2.data.renderer ?? renderer2);
        break;
    }
  }
  function mount(node, parent, renderer2, anchor) {
    switch (node.type) {
      case 0:
        mountText(node, parent, anchor, renderer2);
        break;
      case 1:
        mountComment(node, parent, anchor, renderer2);
        break;
      case 4:
        mountStatic(node, parent, anchor, renderer2);
        break;
      case 5:
        mountFragment(node, parent, anchor, renderer2);
        break;
      case 2:
        mountElement(node, parent, anchor, node.data.renderer ?? renderer2);
        break;
      case 3:
        mountCustomElement(node, parent, anchor, node.data.renderer ?? renderer2);
        break;
    }
  }
  function mountText(vnode, parent, anchor, renderer2) {
    const {
      owner
    } = vnode;
    const {
      createText
    } = renderer2;
    const textNode = vnode.elm = createText(vnode.text);
    linkNodeToShadow(textNode, owner, renderer2);
    insertNode(textNode, parent, anchor, renderer2);
  }
  function patchComment(n1, n2, renderer2) {
    n2.elm = n1.elm;
    if (n2.text !== n1.text) {
      updateTextContent$1(n2, renderer2);
    }
  }
  function mountComment(vnode, parent, anchor, renderer2) {
    const {
      owner
    } = vnode;
    const {
      createComment
    } = renderer2;
    const commentNode = vnode.elm = createComment(vnode.text);
    linkNodeToShadow(commentNode, owner, renderer2);
    insertNode(commentNode, parent, anchor, renderer2);
  }
  function mountFragment(vnode, parent, anchor, renderer2) {
    const {
      children
    } = vnode;
    mountVNodes(children, parent, renderer2, anchor);
    vnode.elm = vnode.leading.elm;
  }
  function patchFragment(n1, n2, parent, renderer2) {
    const {
      children,
      stable
    } = n2;
    if (stable) {
      updateStaticChildren(n1.children, children, parent, renderer2);
    } else {
      updateDynamicChildren(n1.children, children, parent, renderer2);
    }
    n2.elm = n2.leading.elm;
  }
  function mountElement(vnode, parent, anchor, renderer2) {
    const {
      sel,
      owner,
      data: {
        svg
      }
    } = vnode;
    const {
      createElement: createElement2
    } = renderer2;
    const namespace = isTrue(svg) ? SVG_NAMESPACE : void 0;
    const elm = vnode.elm = createElement2(sel, namespace);
    linkNodeToShadow(elm, owner, renderer2);
    applyStyleScoping(elm, owner, renderer2);
    applyDomManual(elm, vnode);
    applyElementRestrictions(elm, vnode);
    patchElementPropsAndAttrsAndRefs$1(null, vnode, renderer2);
    insertNode(elm, parent, anchor, renderer2);
    mountVNodes(vnode.children, elm, renderer2, null);
  }
  function patchStatic(n1, n2, renderer2) {
    n2.elm = n1.elm;
    patchSlotAssignment(n1, n2, renderer2);
    patchStaticParts(n1, n2, renderer2);
  }
  function patchElement(n1, n2, renderer2) {
    const elm = n2.elm = n1.elm;
    patchElementPropsAndAttrsAndRefs$1(n1, n2, renderer2);
    patchChildren(n1.children, n2.children, elm, renderer2);
  }
  function mountStatic(vnode, parent, anchor, renderer2) {
    const {
      owner
    } = vnode;
    const {
      cloneNode,
      isSyntheticShadowDefined
    } = renderer2;
    const elm = vnode.elm = cloneNode(vnode.fragment, true);
    linkNodeToShadow(elm, owner, renderer2);
    applyElementRestrictions(elm, vnode);
    const {
      renderMode,
      shadowMode
    } = owner;
    if (isSyntheticShadowDefined) {
      if (shadowMode === 1 || renderMode === 0) {
        elm[KEY__SHADOW_STATIC] = true;
      }
    }
    patchSlotAssignment(null, vnode, renderer2);
    mountStaticParts(elm, vnode, renderer2);
    insertNode(elm, parent, anchor, renderer2);
  }
  function mountCustomElement(vnode, parent, anchor, renderer2) {
    const {
      sel,
      owner,
      ctor
    } = vnode;
    const {
      createCustomElement: createCustomElement2
    } = renderer2;
    let vm;
    const upgradeCallback = (elm2) => {
      vm = createViewModelHook(elm2, vnode, renderer2);
    };
    const normalizedTagname = sel.toLowerCase();
    const useNativeLifecycle = !lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE;
    const isFormAssociated = shouldBeFormAssociated(ctor);
    const elm = createCustomElement2(normalizedTagname, upgradeCallback, useNativeLifecycle, isFormAssociated);
    vnode.elm = elm;
    vnode.vm = vm;
    linkNodeToShadow(elm, owner, renderer2);
    applyStyleScoping(elm, owner, renderer2);
    if (vm) {
      allocateChildren(vnode, vm);
    }
    patchElementPropsAndAttrsAndRefs$1(null, vnode, renderer2);
    insertNode(elm, parent, anchor, renderer2);
    if (vm) {
      {
        if (!useNativeLifecycle) {
          if (true) {
            assert.isTrue(vm.state === 0, `${vm} cannot be recycled.`);
          }
          runConnectedCallback(vm);
        }
      }
    }
    mountVNodes(vnode.children, elm, renderer2, null);
    if (vm) {
      appendVM(vm);
    }
  }
  function patchCustomElement(n1, n2, parent, renderer2) {
    if (n1.ctor !== n2.ctor) {
      const anchor = renderer2.nextSibling(n1.elm);
      unmount(n1, parent, renderer2, true);
      mountCustomElement(n2, parent, anchor, renderer2);
    } else {
      const elm = n2.elm = n1.elm;
      const vm = n2.vm = n1.vm;
      patchElementPropsAndAttrsAndRefs$1(n1, n2, renderer2);
      if (!isUndefined$1(vm)) {
        allocateChildren(n2, vm);
        const {
          shadowMode,
          renderMode
        } = vm;
        if (shadowMode == 0 && renderMode !== 0 && hasDynamicChildren(n1.children)) {
          markAsDynamicChildren(n2.children);
        }
      }
      patchChildren(n1.children, n2.children, elm, renderer2);
      if (!isUndefined$1(vm)) {
        rerenderVM(vm);
      }
    }
  }
  function mountVNodes(vnodes, parent, renderer2, anchor, start2 = 0, end2 = vnodes.length) {
    for (; start2 < end2; ++start2) {
      const vnode = vnodes[start2];
      if (isVNode(vnode)) {
        mount(vnode, parent, renderer2, anchor);
      }
    }
  }
  function unmount(vnode, parent, renderer2, doRemove = false) {
    const {
      type,
      elm,
      sel
    } = vnode;
    if (doRemove && type !== 5) {
      removeNode(elm, parent, renderer2);
    }
    switch (type) {
      case 5: {
        unmountVNodes(vnode.children, parent, renderer2, doRemove);
        break;
      }
      case 2: {
        const shouldRemoveChildren = sel === "slot" && vnode.owner.shadowMode === 1;
        unmountVNodes(vnode.children, elm, renderer2, shouldRemoveChildren);
        break;
      }
      case 3: {
        const {
          vm
        } = vnode;
        if (!isUndefined$1(vm)) {
          removeVM(vm);
        }
      }
    }
  }
  function unmountVNodes(vnodes, parent, renderer2, doRemove = false, start2 = 0, end2 = vnodes.length) {
    for (; start2 < end2; ++start2) {
      const ch = vnodes[start2];
      if (isVNode(ch)) {
        unmount(ch, parent, renderer2, doRemove);
      }
    }
  }
  function isVNode(vnode) {
    return vnode != null;
  }
  function linkNodeToShadow(elm, owner, renderer2) {
    const {
      renderRoot,
      renderMode,
      shadowMode
    } = owner;
    const {
      isSyntheticShadowDefined
    } = renderer2;
    if (isSyntheticShadowDefined) {
      if (shadowMode === 1 || renderMode === 0) {
        elm[KEY__SHADOW_RESOLVER] = renderRoot[KEY__SHADOW_RESOLVER];
      }
    }
  }
  function insertFragmentOrNode(vnode, parent, anchor, renderer2) {
    if (true) {
      unlockDomMutation();
    }
    if (isVFragment(vnode)) {
      const children = vnode.children;
      for (let i2 = 0; i2 < children.length; i2 += 1) {
        const child = children[i2];
        if (!isNull(child)) {
          renderer2.insert(child.elm, parent, anchor);
        }
      }
    } else {
      renderer2.insert(vnode.elm, parent, anchor);
    }
    if (true) {
      lockDomMutation();
    }
  }
  function insertNode(node, parent, anchor, renderer2) {
    if (true) {
      unlockDomMutation();
    }
    renderer2.insert(node, parent, anchor);
    if (true) {
      lockDomMutation();
    }
  }
  function removeNode(node, parent, renderer2) {
    if (true) {
      unlockDomMutation();
    }
    renderer2.remove(node, parent);
    if (true) {
      lockDomMutation();
    }
  }
  function patchElementPropsAndAttrsAndRefs$1(oldVnode, vnode, renderer2) {
    if (isNull(oldVnode)) {
      applyEventListeners(vnode, renderer2);
      applyStaticClassAttribute(vnode, renderer2);
      applyStaticStyleAttribute(vnode, renderer2);
    }
    const {
      owner
    } = vnode;
    patchClassAttribute(oldVnode, vnode, renderer2);
    patchStyleAttribute(oldVnode, vnode, renderer2, owner);
    patchAttributes(oldVnode, vnode, renderer2);
    patchProps(oldVnode, vnode, renderer2);
    patchSlotAssignment(oldVnode, vnode, renderer2);
    applyRefs(vnode, owner);
  }
  function applyStyleScoping(elm, owner, renderer2) {
    const {
      getClassList
    } = renderer2;
    const scopeToken = getScopeTokenClass(owner, false);
    if (!isNull(scopeToken)) {
      getClassList(elm).add(scopeToken);
    }
    if (lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS) {
      const legacyScopeToken = getScopeTokenClass(owner, true);
      if (!isNull(legacyScopeToken)) {
        getClassList(elm).add(legacyScopeToken);
      }
    }
    const {
      stylesheetToken: syntheticToken
    } = owner.context;
    if (owner.shadowMode === 1) {
      if (!isUndefined$1(syntheticToken)) {
        elm.$shadowToken$ = syntheticToken;
      }
      if (lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS) {
        const legacyToken = owner.context.legacyStylesheetToken;
        if (!isUndefined$1(legacyToken)) {
          elm.$legacyShadowToken$ = legacyToken;
        }
      }
    }
  }
  function applyDomManual(elm, vnode) {
    const {
      owner,
      data: {
        context
      }
    } = vnode;
    if (owner.shadowMode === 1 && context?.lwc?.dom === "manual") {
      elm.$domManual$ = true;
    }
  }
  function applyElementRestrictions(elm, vnode) {
    if (true) {
      const isSynthetic = vnode.owner.shadowMode === 1;
      const isPortal = vnode.type === 2 && vnode.data.context?.lwc?.dom === "manual";
      const isLight = vnode.owner.renderMode === 0;
      patchElementWithRestrictions(elm, {
        isPortal,
        isLight,
        isSynthetic
      });
    }
  }
  function allocateChildren(vnode, vm) {
    const children = vnode.aChildren || vnode.children;
    const {
      renderMode,
      shadowMode
    } = vm;
    if (true) {
      if (renderMode !== 0 && ArraySome.call(children, (child) => !isNull(child) && isVScopedSlotFragment(child))) {
        logError(`Invalid usage of 'lwc:slot-data' on ${getComponentTag(vm)} tag. Scoped slot content can only be passed to a light dom child.`);
      }
    }
    const allocatedChildren = flattenFragmentsInChildren(children);
    vnode.children = allocatedChildren;
    vm.aChildren = allocatedChildren;
    if (shadowMode === 1 || renderMode === 0) {
      allocateInSlot(vm, allocatedChildren, vnode.owner);
      vnode.aChildren = allocatedChildren;
      vnode.children = EmptyArray;
    }
  }
  function flattenFragmentsInChildren(children) {
    const flattenedChildren = [];
    const nodeStack = [];
    let fragmentFound = false;
    for (let i2 = children.length - 1; i2 > -1; i2 -= 1) {
      const child = children[i2];
      ArrayPush$1.call(nodeStack, child);
      fragmentFound = fragmentFound || !!(child && isVFragment(child));
    }
    if (!fragmentFound) {
      return children;
    }
    let currentNode;
    while (!isUndefined$1(currentNode = ArrayPop.call(nodeStack))) {
      if (!isNull(currentNode) && isVFragment(currentNode)) {
        const fChildren = currentNode.children;
        for (let i2 = fChildren.length - 2; i2 > 0; i2 -= 1) {
          ArrayPush$1.call(nodeStack, fChildren[i2]);
        }
      } else {
        ArrayPush$1.call(flattenedChildren, currentNode);
      }
    }
    markAsDynamicChildren(flattenedChildren);
    return flattenedChildren;
  }
  function createViewModelHook(elm, vnode, renderer2) {
    let vm = getAssociatedVMIfPresent(elm);
    if (!isUndefined$1(vm)) {
      return vm;
    }
    const {
      sel,
      mode,
      ctor,
      owner
    } = vnode;
    vm = createVM(elm, ctor, renderer2, {
      mode,
      owner,
      tagName: sel
    });
    if (true) {
      assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
    }
    return vm;
  }
  function allocateInSlot(vm, children, owner) {
    const {
      cmpSlots: {
        slotAssignments: oldSlotsMapping
      }
    } = vm;
    const cmpSlotsMapping = create(null);
    for (let i2 = 0, len = children.length; i2 < len; i2 += 1) {
      const vnode = children[i2];
      if (isNull(vnode)) {
        continue;
      }
      let slotName = "";
      if (isVBaseElement(vnode) || isVStatic(vnode)) {
        slotName = vnode.slotAssignment ?? "";
      } else if (isVScopedSlotFragment(vnode)) {
        slotName = vnode.slotName;
      }
      const normalizedSlotName = "" + slotName;
      const vnodes = cmpSlotsMapping[normalizedSlotName] = cmpSlotsMapping[normalizedSlotName] || [];
      ArrayPush$1.call(vnodes, vnode);
    }
    vm.cmpSlots = {
      owner,
      slotAssignments: cmpSlotsMapping
    };
    if (isFalse(vm.isDirty)) {
      const oldKeys = keys(oldSlotsMapping);
      if (oldKeys.length !== keys(cmpSlotsMapping).length) {
        markComponentAsDirty(vm);
        return;
      }
      for (let i2 = 0, len = oldKeys.length; i2 < len; i2 += 1) {
        const key = oldKeys[i2];
        if (isUndefined$1(cmpSlotsMapping[key]) || oldSlotsMapping[key].length !== cmpSlotsMapping[key].length) {
          markComponentAsDirty(vm);
          return;
        }
        const oldVNodes = oldSlotsMapping[key];
        const vnodes = cmpSlotsMapping[key];
        for (let j = 0, a = cmpSlotsMapping[key].length; j < a; j += 1) {
          if (oldVNodes[j] !== vnodes[j]) {
            markComponentAsDirty(vm);
            return;
          }
        }
      }
    }
  }
  const DynamicChildren = new WeakSet();
  function markAsDynamicChildren(children) {
    DynamicChildren.add(children);
  }
  function hasDynamicChildren(children) {
    return DynamicChildren.has(children);
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    for (let j = beginIdx; j <= endIdx; ++j) {
      const ch = children[j];
      if (isVNode(ch)) {
        const {
          key
        } = ch;
        if (key !== void 0) {
          map[key] = j;
        }
      }
    }
    return map;
  }
  function updateDynamicChildren(oldCh, newCh, parent, renderer2) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    const newChEnd = newCh.length - 1;
    let newEndIdx = newChEnd;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;
    let clonedOldCh = false;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!isVNode(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (!isVNode(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (!isVNode(newStartVnode)) {
        newStartVnode = newCh[++newStartIdx];
      } else if (!isVNode(newEndVnode)) {
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldStartVnode, newStartVnode)) {
        patch(oldStartVnode, newStartVnode, parent, renderer2);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        patch(oldEndVnode, newEndVnode, parent, renderer2);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldStartVnode, newEndVnode)) {
        patch(oldStartVnode, newEndVnode, parent, renderer2);
        let anchor;
        if (isVFragment(oldEndVnode)) {
          anchor = renderer2.nextSibling(oldEndVnode.trailing.elm);
        } else {
          anchor = renderer2.nextSibling(oldEndVnode.elm);
        }
        insertFragmentOrNode(oldStartVnode, parent, anchor, renderer2);
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        patch(oldEndVnode, newStartVnode, parent, renderer2);
        insertFragmentOrNode(newStartVnode, parent, oldStartVnode.elm, renderer2);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === void 0) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndefined$1(idxInOld)) {
          mount(newStartVnode, parent, renderer2, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          if (isVNode(elmToMove)) {
            if (elmToMove.sel !== newStartVnode.sel) {
              mount(newStartVnode, parent, renderer2, oldStartVnode.elm);
            } else {
              patch(elmToMove, newStartVnode, parent, renderer2);
              if (!clonedOldCh) {
                clonedOldCh = true;
                oldCh = [...oldCh];
              }
              oldCh[idxInOld] = void 0;
              insertFragmentOrNode(elmToMove, parent, oldStartVnode.elm, renderer2);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        let i2 = newEndIdx;
        let n;
        do {
          n = newCh[++i2];
        } while (!isVNode(n) && i2 < newChEnd);
        before = isVNode(n) ? n.elm : null;
        mountVNodes(newCh, parent, renderer2, before, newStartIdx, newEndIdx + 1);
      } else {
        unmountVNodes(oldCh, parent, renderer2, true, oldStartIdx, oldEndIdx + 1);
      }
    }
  }
  function updateStaticChildren(c1, c2, parent, renderer2) {
    const c1Length = c1.length;
    const c2Length = c2.length;
    if (c1Length === 0) {
      mountVNodes(c2, parent, renderer2, null);
      return;
    }
    if (c2Length === 0) {
      unmountVNodes(c1, parent, renderer2, true);
      return;
    }
    let anchor = null;
    for (let i2 = c2Length - 1; i2 >= 0; i2 -= 1) {
      const n1 = c1[i2];
      const n2 = c2[i2];
      if (n2 !== n1) {
        if (isVNode(n1)) {
          if (isVNode(n2)) {
            if (isSameVnode(n1, n2)) {
              patch(n1, n2, parent, renderer2);
              anchor = n2.elm;
            } else {
              unmount(n1, parent, renderer2, true);
              mount(n2, parent, renderer2, anchor);
              anchor = n2.elm;
            }
          } else {
            unmount(n1, parent, renderer2, true);
          }
        } else if (isVNode(n2)) {
          mount(n2, parent, renderer2, anchor);
          anchor = n2.elm;
        }
      }
    }
  }
  const SymbolIterator = Symbol.iterator;
  function addVNodeToChildLWC(vnode) {
    ArrayPush$1.call(getVMBeingRendered().velements, vnode);
  }
  function sp(partId, data, text) {
    const type = isNull(text) ? 1 : 0;
    return {
      type,
      partId,
      data,
      text,
      elm: void 0
    };
  }
  function ssf(slotName, factory) {
    return {
      type: 6,
      factory,
      owner: getVMBeingRendered(),
      elm: void 0,
      sel: "__scoped_slot_fragment__",
      key: void 0,
      slotName
    };
  }
  function st(fragmentFactory, key, parts) {
    const owner = getVMBeingRendered();
    const fragment = fragmentFactory(parts);
    const vnode = {
      type: 4,
      sel: "__static__",
      key,
      elm: void 0,
      fragment,
      owner,
      parts,
      slotAssignment: void 0
    };
    return vnode;
  }
  function fr(key, children, stable) {
    const owner = getVMBeingRendered();
    const useCommentNodes = isAPIFeatureEnabled(5, owner.apiVersion);
    const leading = useCommentNodes ? co("") : t("");
    const trailing = useCommentNodes ? co("") : t("");
    return {
      type: 5,
      sel: "__fragment__",
      key,
      elm: void 0,
      children: [leading, ...children, trailing],
      stable,
      owner,
      leading,
      trailing
    };
  }
  function h(sel, data, children = EmptyArray) {
    const vmBeingRendered2 = getVMBeingRendered();
    if (true) {
      assert.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
      assert.isTrue(isObject(data), `h() 2nd argument data must be an object.`);
      assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
      assert.isTrue("key" in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered2}. Key inside iterator is either undefined or null.`);
      assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
      assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);
      forEach.call(children, (childVnode) => {
        if (childVnode != null) {
          assert.isTrue("type" in childVnode && "sel" in childVnode && "elm" in childVnode && "key" in childVnode, `${childVnode} is not a vnode.`);
        }
      });
    }
    const {
      key,
      slotAssignment
    } = data;
    const vnode = {
      type: 2,
      sel,
      data,
      children,
      elm: void 0,
      key,
      owner: vmBeingRendered2,
      slotAssignment
    };
    return vnode;
  }
  function ti(value) {
    const shouldNormalize = value > 0 && !(isTrue(value) || isFalse(value));
    if (true) {
      const vmBeingRendered2 = getVMBeingRendered();
      if (shouldNormalize) {
        logError(`Invalid tabindex value \`${toString$1(value)}\` in template for ${vmBeingRendered2}. This attribute must be set to 0 or -1.`, vmBeingRendered2);
      }
    }
    return shouldNormalize ? 0 : value;
  }
  function s(slotName, data, children, slotset) {
    if (true) {
      assert.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
      assert.isTrue(isObject(data), `s() 2nd argument data must be an object.`);
      assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
    }
    const vmBeingRendered2 = getVMBeingRendered();
    const {
      renderMode,
      apiVersion
    } = vmBeingRendered2;
    if (!isUndefined$1(slotset) && !isUndefined$1(slotset.slotAssignments) && !isUndefined$1(slotset.slotAssignments[slotName]) && slotset.slotAssignments[slotName].length !== 0) {
      const newChildren = [];
      const slotAssignments = slotset.slotAssignments[slotName];
      for (let i2 = 0; i2 < slotAssignments.length; i2++) {
        const vnode = slotAssignments[i2];
        if (!isNull(vnode)) {
          const assignedNodeIsScopedSlot = isVScopedSlotFragment(vnode);
          const isScopedSlotElement = !isUndefined$1(data.slotData);
          if (assignedNodeIsScopedSlot !== isScopedSlotElement) {
            if (true) {
              logError(`Mismatched slot types for ${slotName === "" ? "(default)" : slotName} slot. Both parent and child component must use standard type or scoped type for a given slot.`, slotset.owner);
            }
            continue;
          }
          if (assignedNodeIsScopedSlot) {
            setVMBeingRendered(slotset.owner);
            try {
              const {
                tro
              } = slotset.owner;
              tro.observe(() => {
                ArrayPush$1.call(newChildren, vnode.factory(data.slotData, data.key));
              });
            } finally {
              setVMBeingRendered(vmBeingRendered2);
            }
          } else {
            let clonedVNode;
            if (renderMode === 0 && isAPIFeatureEnabled(6, apiVersion) && (isVBaseElement(vnode) || isVStatic(vnode)) && vnode.slotAssignment !== data.slotAssignment) {
              clonedVNode = {
                ...vnode,
                slotAssignment: data.slotAssignment
              };
              if (lwcRuntimeFlags.ENABLE_SLOT_FORWARDING_FIX) {
                if (isVCustomElement(vnode)) {
                  addVNodeToChildLWC(clonedVNode);
                }
              }
            }
            ArrayPush$1.call(newChildren, clonedVNode ?? vnode);
          }
        }
      }
      children = newChildren;
    }
    const {
      shadowMode
    } = vmBeingRendered2;
    if (renderMode === 0) {
      if (isAPIFeatureEnabled(2, apiVersion)) {
        return fr(data.key, children, 0);
      } else {
        sc(children);
        return children;
      }
    }
    if (shadowMode === 1) {
      sc(children);
    }
    return h("slot", data, children);
  }
  function c(sel, Ctor, data, children = EmptyArray) {
    const vmBeingRendered2 = getVMBeingRendered();
    if (true) {
      assert.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
      assert.isTrue(isFunction$1(Ctor), `c() 2nd argument Ctor must be a function.`);
      assert.isTrue(isObject(data), `c() 3nd argument data must be an object.`);
      assert.isTrue(arguments.length === 3 || isArray$1(children), `c() 4nd argument data must be an array.`);
      assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
      assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);
      if (data.style && !isString(data.style)) {
        logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered2);
      }
      if (arguments.length === 4) {
        forEach.call(children, (childVnode) => {
          if (childVnode != null) {
            assert.isTrue("type" in childVnode && "sel" in childVnode && "elm" in childVnode && "key" in childVnode, `${childVnode} is not a vnode.`);
          }
        });
      }
    }
    const {
      key,
      slotAssignment
    } = data;
    let elm, aChildren, vm;
    const vnode = {
      type: 3,
      sel,
      data,
      children,
      elm,
      key,
      slotAssignment,
      ctor: Ctor,
      owner: vmBeingRendered2,
      mode: "open",
      aChildren,
      vm
    };
    addVNodeToChildLWC(vnode);
    return vnode;
  }
  function i(iterable, factory) {
    const list = [];
    sc(list);
    const vmBeingRendered2 = getVMBeingRendered();
    if (isUndefined$1(iterable) || iterable === null) {
      if (true) {
        logError(`Invalid template iteration for value "${toString$1(iterable)}" in ${vmBeingRendered2}. It must be an Array or an iterable Object.`, vmBeingRendered2);
      }
      return list;
    }
    if (true) {
      assert.isFalse(isUndefined$1(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString$1(iterable)}\` in ${vmBeingRendered2}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
    }
    const iterator = iterable[SymbolIterator]();
    if (true) {
      assert.isTrue(iterator && isFunction$1(iterator.next), `Invalid iterator function for "${toString$1(iterable)}" in ${vmBeingRendered2}.`);
    }
    let next = iterator.next();
    let j = 0;
    let {
      value,
      done: last
    } = next;
    let keyMap;
    let iterationError;
    if (true) {
      keyMap = create(null);
    }
    while (last === false) {
      next = iterator.next();
      last = next.done;
      const vnode = factory(value, j, j === 0, last === true);
      if (isArray$1(vnode)) {
        ArrayPush$1.apply(list, vnode);
      } else {
        ArrayPush$1.call(list, vnode);
      }
      if (true) {
        const vnodes = isArray$1(vnode) ? vnode : [vnode];
        forEach.call(vnodes, (childVnode) => {
          if (!isNull(childVnode) && (isVBaseElement(childVnode) || isVStatic(childVnode))) {
            const {
              key
            } = childVnode;
            const {
              tagName
            } = vmBeingRendered2;
            if (isString(key) || isNumber(key)) {
              if (keyMap[key] === 1 && isUndefined$1(iterationError)) {
                iterationError = `Duplicated "key" attribute value in "<${tagName}>" for item number ${j}. A key with value "${key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
              }
              keyMap[key] = 1;
            } else if (isUndefined$1(iterationError)) {
              iterationError = `Invalid "key" attribute value in "<${tagName}>" for item number ${j}. Set a unique "key" value on all iterated child elements.`;
            }
          }
        });
      }
      j += 1;
      value = next.value;
    }
    if (true) {
      if (!isUndefined$1(iterationError)) {
        logError(iterationError, vmBeingRendered2);
      }
    }
    return list;
  }
  function f(items) {
    if (true) {
      assert.isTrue(isArray$1(items), "flattening api can only work with arrays.");
    }
    const len = items.length;
    const flattened = [];
    sc(flattened);
    for (let j = 0; j < len; j += 1) {
      const item = items[j];
      if (isArray$1(item)) {
        ArrayPush$1.apply(flattened, item);
      } else {
        ArrayPush$1.call(flattened, item);
      }
    }
    return flattened;
  }
  function t(text) {
    let key, elm;
    return {
      type: 0,
      sel: "__text__",
      text,
      elm,
      key,
      owner: getVMBeingRendered()
    };
  }
  function co(text) {
    let elm, key;
    return {
      type: 1,
      sel: "__comment__",
      text,
      elm,
      key,
      owner: getVMBeingRendered()
    };
  }
  function d(value) {
    return value == null ? "" : String(value);
  }
  function b(fn) {
    const vmBeingRendered2 = getVMBeingRendered();
    if (isNull(vmBeingRendered2)) {
      throw new Error();
    }
    const vm = vmBeingRendered2;
    return function(event) {
      invokeEventListener(vm, fn, vm.component, event);
    };
  }
  function k(compilerKey, obj) {
    switch (typeof obj) {
      case "number":
      case "string":
        return compilerKey + ":" + obj;
      case "object":
        if (true) {
          logError(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
        }
    }
  }
  function gid(id) {
    const vmBeingRendered2 = getVMBeingRendered();
    if (isUndefined$1(id) || id === "") {
      if (true) {
        logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered2);
      }
      return id;
    }
    if (isNull(id)) {
      return null;
    }
    const {
      idx: idx2,
      shadowMode
    } = vmBeingRendered2;
    if (shadowMode === 1) {
      return StringReplace.call(id, /\S+/g, (id2) => `${id2}-${idx2}`);
    }
    return id;
  }
  function fid(url) {
    const vmBeingRendered2 = getVMBeingRendered();
    if (isUndefined$1(url) || url === "") {
      if (true) {
        if (isUndefined$1(url)) {
          logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered2);
        }
      }
      return url;
    }
    if (isNull(url)) {
      return null;
    }
    const {
      idx: idx2,
      shadowMode
    } = vmBeingRendered2;
    if (shadowMode === 1 && /^#/.test(url)) {
      return `${url}-${idx2}`;
    }
    return url;
  }
  function ddc(sel, Ctor, data, children = EmptyArray) {
    if (true) {
      assert.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
      assert.isTrue(isObject(data), `dc() 3nd argument data must be an object.`);
      assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 4nd argument data must be an array.`);
    }
    if (isNull(Ctor) || isUndefined$1(Ctor)) {
      return null;
    }
    if (!isComponentConstructor(Ctor)) {
      throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
    }
    return c(sel, Ctor, data, children);
  }
  function dc(Ctor, data, children = EmptyArray) {
    if (true) {
      assert.isTrue(isObject(data), `dc() 2nd argument data must be an object.`);
      assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 3rd argument data must be an array.`);
    }
    if (isNull(Ctor) || isUndefined$1(Ctor)) {
      return null;
    }
    if (!isComponentConstructor(Ctor)) {
      throw new Error(`Invalid constructor ${toString$1(Ctor)} is not a LightningElement constructor.`);
    }
    const sel = getComponentRegisteredName(Ctor);
    if (isUndefined$1(sel) || sel === "") {
      throw new Error(`Invalid LWC constructor ${toString$1(Ctor)} does not have a registered name`);
    }
    return c(sel, Ctor, data, children);
  }
  function sc(vnodes) {
    if (true) {
      assert.isTrue(isArray$1(vnodes), "sc() api can only work with arrays.");
    }
    markAsDynamicChildren(vnodes);
    return vnodes;
  }
  let sanitizeHtmlContentHook = () => {
    throw new Error("sanitizeHtmlContent hook must be implemented.");
  };
  function setSanitizeHtmlContentHook(newHookImpl) {
    sanitizeHtmlContentHook = newHookImpl;
  }
  function shc(content) {
    return sanitizeHtmlContentHook(content);
  }
  function ncls(value) {
    if (isUndefined$1(value) || isNull(value)) {
      return void 0;
    }
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray$1(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        const normalized = ncls(value[i2]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value) && !isNull(value)) {
      const keys$1 = keys(value);
      for (let i2 = 0; i2 < keys$1.length; i2 += 1) {
        const key = keys$1[i2];
        if (value[key]) {
          res += key + " ";
        }
      }
    }
    return StringTrim.call(res);
  }
  const api = freeze({
    s,
    h,
    c,
    i,
    f,
    t,
    d,
    b,
    k,
    co,
    dc,
    fr,
    ti,
    st,
    gid,
    fid,
    shc,
    ssf,
    ddc,
    sp,
    ncls
  });
  const operationIdNameMapping = ["constructor", "render", "patch", "connectedCallback", "renderedCallback", "disconnectedCallback", "errorCallback", "lwc-hydrate", "lwc-rehydrate"];
  const isUserTimingSupported = typeof performance !== "undefined" && typeof performance.mark === "function" && typeof performance.clearMarks === "function" && typeof performance.measure === "function" && typeof performance.clearMeasures === "function";
  const start = !isUserTimingSupported ? noop : (markName) => {
    performance.mark(markName);
  };
  const end = !isUserTimingSupported ? noop : (measureName, markName) => {
    performance.measure(measureName, markName);
    performance.clearMarks(markName);
    performance.clearMeasures(measureName);
  };
  function getOperationName(opId) {
    return operationIdNameMapping[opId];
  }
  function getMeasureName(opId, vm) {
    return `${getComponentTag(vm)} - ${getOperationName(opId)}`;
  }
  function getMarkName(opId, vm) {
    return `${getMeasureName(opId, vm)} - ${vm.idx}`;
  }
  const isMeasureEnabled = true;
  let isProfilerEnabled = false;
  let currentDispatcher = noop;
  const profilerControl = {
    enableProfiler() {
      isProfilerEnabled = true;
    },
    disableProfiler() {
      isProfilerEnabled = false;
    },
    attachDispatcher(dispatcher) {
      currentDispatcher = dispatcher;
      this.enableProfiler();
    },
    detachDispatcher() {
      const dispatcher = currentDispatcher;
      currentDispatcher = noop;
      this.disableProfiler();
      return dispatcher;
    }
  };
  function logOperationStart(opId, vm) {
    if (isMeasureEnabled) {
      const markName = getMarkName(opId, vm);
      start(markName);
    }
    if (isProfilerEnabled) {
      currentDispatcher(opId, 0, vm.tagName, vm.idx, vm.renderMode, vm.shadowMode);
    }
  }
  function logOperationEnd(opId, vm) {
    if (isMeasureEnabled) {
      const markName = getMarkName(opId, vm);
      const measureName = getMeasureName(opId, vm);
      end(measureName, markName);
    }
    if (isProfilerEnabled) {
      currentDispatcher(opId, 1, vm.tagName, vm.idx, vm.renderMode, vm.shadowMode);
    }
  }
  function logGlobalOperationStart(opId, vm) {
    if (isMeasureEnabled) {
      const opName = getOperationName(opId);
      const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
      start(markName);
    }
    if (isProfilerEnabled) {
      currentDispatcher(opId, 0, vm?.tagName, vm?.idx, vm?.renderMode, vm?.shadowMode);
    }
  }
  function logGlobalOperationEnd(opId, vm) {
    if (isMeasureEnabled) {
      const opName = getOperationName(opId);
      const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
      end(opName, markName);
    }
    if (isProfilerEnabled) {
      currentDispatcher(opId, 1, vm?.tagName, vm?.idx, vm?.renderMode, vm?.shadowMode);
    }
  }
  let isUpdatingTemplate = false;
  let vmBeingRendered = null;
  function getVMBeingRendered() {
    return vmBeingRendered;
  }
  function setVMBeingRendered(vm) {
    vmBeingRendered = vm;
  }
  const VALID_SCOPE_TOKEN_REGEX = /^[a-zA-Z0-9\-_.]+$/;
  function isValidScopeToken(token) {
    return isString(token) && VALID_SCOPE_TOKEN_REGEX.test(token);
  }
  function validateSlots(vm) {
    assertNotProd();
    const {
      cmpSlots
    } = vm;
    for (const slotName in cmpSlots.slotAssignments) {
      assert.isTrue(isArray$1(cmpSlots.slotAssignments[slotName]), `Slots can only be set to an array, instead received ${toString$1(cmpSlots.slotAssignments[slotName])} for slot "${slotName}" in ${vm}.`);
    }
  }
  function validateLightDomTemplate(template, vm) {
    assertNotProd();
    if (template === defaultEmptyTemplate) {
      return;
    }
    if (vm.renderMode === 0) {
      if (template.renderMode !== "light") {
        logError(`Light DOM components can't render shadow DOM templates. Add an 'lwc:render-mode="light"' directive to the root template tag of ${getComponentTag(vm)}.`);
      }
    } else {
      if (!isUndefined$1(template.renderMode)) {
        logError(`Shadow DOM components template can't render light DOM templates. Either remove the 'lwc:render-mode' directive from ${getComponentTag(vm)} or set it to 'lwc:render-mode="shadow"`);
      }
    }
  }
  const browserExpressionSerializer = (partToken, classAttrToken) => {
    const type = StringCharAt.call(partToken, 0);
    switch (type) {
      case "c":
        return classAttrToken;
      case "t":
        return " ";
      default:
        return "";
    }
  };
  function buildSerializeExpressionFn(parts) {
    {
      return browserExpressionSerializer;
    }
  }
  let registerFragmentCache = noop;
  if (false) {
    const fragmentCaches = [];
    registerFragmentCache = (fragmentCache) => {
      fragmentCaches.push(fragmentCache);
    };
    window.__lwcResetFragmentCaches = () => {
      for (const fragmentCache of fragmentCaches) {
        for (const key of keys(fragmentCache)) {
          delete fragmentCache[key];
        }
      }
    };
  }
  function buildParseFragmentFn(createFragmentFn) {
    return (strings, ...keys2) => {
      const cache = create(null);
      registerFragmentCache(cache);
      return function(parts) {
        const {
          context: {
            hasScopedStyles,
            stylesheetToken,
            legacyStylesheetToken
          },
          shadowMode,
          renderer: renderer2
        } = getVMBeingRendered();
        const hasStyleToken = !isUndefined$1(stylesheetToken);
        const isSyntheticShadow = shadowMode === 1;
        const hasLegacyToken = lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS && !isUndefined$1(legacyStylesheetToken);
        let cacheKey = 0;
        if (hasStyleToken && hasScopedStyles) {
          cacheKey |= 1;
        }
        if (hasStyleToken && isSyntheticShadow) {
          cacheKey |= 2;
        }
        {
          const cached = cache[cacheKey];
          if (!isUndefined$1(cached)) {
            return cached;
          }
        }
        if (hasStyleToken && !isValidScopeToken(stylesheetToken) || hasLegacyToken && !isValidScopeToken(legacyStylesheetToken)) {
          throw new Error("stylesheet token must be a valid string");
        }
        const stylesheetTokenToRender = stylesheetToken + (hasLegacyToken ? ` ${legacyStylesheetToken}` : "");
        const classToken = hasScopedStyles && hasStyleToken ? " " + stylesheetTokenToRender : "";
        const classAttrToken = hasScopedStyles && hasStyleToken ? ` class="${stylesheetTokenToRender}"` : "";
        const attrToken = hasStyleToken && isSyntheticShadow ? " " + stylesheetTokenToRender : "";
        const exprClassToken = classAttrToken;
        const serializeExpression = buildSerializeExpressionFn();
        let htmlFragment = "";
        for (let i2 = 0, n = keys2.length; i2 < n; i2++) {
          switch (keys2[i2]) {
            case 0:
              htmlFragment += strings[i2] + classToken;
              break;
            case 1:
              htmlFragment += strings[i2] + classAttrToken;
              break;
            case 2:
              htmlFragment += strings[i2] + attrToken;
              break;
            case 3:
              htmlFragment += strings[i2] + classAttrToken + attrToken;
              break;
            default:
              htmlFragment += strings[i2] + serializeExpression(keys2[i2], exprClassToken);
              break;
          }
        }
        htmlFragment += strings[strings.length - 1];
        cache[cacheKey] = createFragmentFn(htmlFragment, renderer2);
        return cache[cacheKey];
      };
    };
  }
  const parseFragment = buildParseFragmentFn((html, renderer2) => {
    const {
      createFragment
    } = renderer2;
    return createFragment(html);
  });
  const parseSVGFragment = buildParseFragmentFn((html, renderer2) => {
    const {
      createFragment,
      getFirstChild
    } = renderer2;
    const fragment = createFragment("<svg>" + html + "</svg>");
    return getFirstChild(fragment);
  });
  function evaluateTemplate(vm, html) {
    if (true) {
      html = getTemplateOrSwappedTemplate(html);
    }
    const isUpdatingTemplateInception = isUpdatingTemplate;
    const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
    let vnodes = [];
    runWithBoundaryProtection(vm, vm.owner, () => {
      vmBeingRendered = vm;
      logOperationStart(1, vm);
    }, () => {
      const {
        component,
        context,
        cmpSlots,
        cmpTemplate,
        tro
      } = vm;
      tro.observe(() => {
        if (html !== cmpTemplate) {
          if (!isTemplateRegistered(html)) {
            throw new TypeError(`Invalid template returned by the render() method on ${vm.tagName}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
          }
          if (true) {
            validateLightDomTemplate(html, vm);
          }
          if (!isNull(cmpTemplate)) {
            resetComponentRoot(vm);
          }
          vm.cmpTemplate = html;
          context.tplCache = create(null);
          context.hasScopedStyles = computeHasScopedStyles(html, vm);
          updateStylesheetToken(vm, html, false);
          if (lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS) {
            updateStylesheetToken(vm, html, true);
          }
          const stylesheetsContent = getStylesheetsContent(vm, html);
          context.styleVNodes = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
        }
        if (true) {
          validateSlots(vm);
          setActiveVM(vm);
        }
        vm.velements = [];
        isUpdatingTemplate = true;
        vnodes = html.call(void 0, api, component, cmpSlots, context.tplCache);
        const {
          styleVNodes
        } = context;
        if (!isNull(styleVNodes)) {
          ArrayUnshift.apply(vnodes, styleVNodes);
        }
      });
    }, () => {
      isUpdatingTemplate = isUpdatingTemplateInception;
      vmBeingRendered = vmOfTemplateBeingUpdatedInception;
      logOperationEnd(1, vm);
    });
    if (true) {
      if (!isArray$1(vnodes)) {
        logError(`Compiler should produce html functions that always return an array.`);
      }
    }
    return vnodes;
  }
  function computeHasScopedStylesInStylesheets(stylesheets) {
    if (hasStyles(stylesheets)) {
      for (let i2 = 0; i2 < stylesheets.length; i2++) {
        if (isTrue(stylesheets[i2][KEY__SCOPED_CSS])) {
          return true;
        }
      }
    }
    return false;
  }
  function computeHasScopedStyles(template, vm) {
    const {
      stylesheets
    } = template;
    const vmStylesheets = !isUndefined$1(vm) ? vm.stylesheets : null;
    return computeHasScopedStylesInStylesheets(stylesheets) || computeHasScopedStylesInStylesheets(vmStylesheets);
  }
  function hasStyles(stylesheets) {
    return !isUndefined$1(stylesheets) && !isNull(stylesheets) && stylesheets.length > 0;
  }
  let isInvokingRender = false;
  let vmBeingConstructed = null;
  function isBeingConstructed(vm) {
    return vmBeingConstructed === vm;
  }
  function invokeComponentCallback(vm, fn, args) {
    const {
      component,
      callHook: callHook2,
      owner
    } = vm;
    runWithBoundaryProtection(vm, owner, noop, () => {
      callHook2(component, fn, args);
    }, noop);
  }
  function invokeComponentConstructor(vm, Ctor) {
    const vmBeingConstructedInception = vmBeingConstructed;
    let error;
    logOperationStart(0, vm);
    vmBeingConstructed = vm;
    try {
      const result = new Ctor();
      if (vmBeingConstructed.component !== result) {
        throw new TypeError("Invalid component constructor, the class should extend LightningElement.");
      }
    } catch (e) {
      error = Object(e);
    } finally {
      logOperationEnd(0, vm);
      vmBeingConstructed = vmBeingConstructedInception;
      if (!isUndefined$1(error)) {
        addErrorComponentStack(vm, error);
        throw error;
      }
    }
  }
  function invokeComponentRenderMethod(vm) {
    const {
      def: {
        render
      },
      callHook: callHook2,
      component,
      owner
    } = vm;
    const isRenderBeingInvokedInception = isInvokingRender;
    const vmBeingRenderedInception = getVMBeingRendered();
    let html;
    let renderInvocationSuccessful = false;
    runWithBoundaryProtection(vm, owner, () => {
      isInvokingRender = true;
      setVMBeingRendered(vm);
    }, () => {
      vm.tro.observe(() => {
        html = callHook2(component, render);
        renderInvocationSuccessful = true;
      });
    }, () => {
      isInvokingRender = isRenderBeingInvokedInception;
      setVMBeingRendered(vmBeingRenderedInception);
    });
    return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
  }
  function invokeEventListener(vm, fn, thisValue, event) {
    const {
      callHook: callHook2,
      owner
    } = vm;
    runWithBoundaryProtection(vm, owner, noop, () => {
      if (true) {
        assert.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
      }
      callHook2(thisValue, fn, [event]);
    }, noop);
  }
  const registeredComponentMap = new Map();
  function registerComponent(Ctor, metadata) {
    if (isFunction$1(Ctor)) {
      if (true) {
        checkVersionMismatch(Ctor, "component");
      }
      registeredComponentMap.set(Ctor, metadata);
    }
    return Ctor;
  }
  function getComponentRegisteredTemplate(Ctor) {
    return registeredComponentMap.get(Ctor)?.tmpl;
  }
  function getComponentRegisteredName(Ctor) {
    return registeredComponentMap.get(Ctor)?.sel;
  }
  function getComponentAPIVersion(Ctor) {
    const metadata = registeredComponentMap.get(Ctor);
    const apiVersion = metadata?.apiVersion;
    if (isUndefined$1(apiVersion)) {
      return LOWEST_API_VERSION;
    }
    return apiVersion;
  }
  function getTemplateReactiveObserver(vm) {
    return createReactiveObserver(() => {
      const {
        isDirty
      } = vm;
      if (isFalse(isDirty)) {
        markComponentAsDirty(vm);
        scheduleRehydration(vm);
      }
    });
  }
  function resetTemplateObserverAndUnsubscribe(vm) {
    const {
      tro,
      component
    } = vm;
    tro.reset();
    if (lwcRuntimeFlags.ENABLE_EXPERIMENTAL_SIGNALS) {
      unsubscribeFromSignals(component);
    }
  }
  function renderComponent(vm) {
    if (true) {
      assert.invariant(vm.isDirty, `${vm} is not dirty.`);
    }
    resetTemplateObserverAndUnsubscribe(vm);
    const vnodes = invokeComponentRenderMethod(vm);
    vm.isDirty = false;
    vm.isScheduled = false;
    return vnodes;
  }
  function markComponentAsDirty(vm) {
    if (true) {
      const vmBeingRendered2 = getVMBeingRendered();
      assert.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
      assert.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered2}.`);
      assert.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered2}.`);
    }
    vm.isDirty = true;
  }
  const cmpEventListenerMap = new WeakMap();
  function getWrappedComponentsListener(vm, listener) {
    if (!isFunction$1(listener)) {
      throw new TypeError("Expected an EventListener but received " + typeof listener);
    }
    let wrappedListener = cmpEventListenerMap.get(listener);
    if (isUndefined$1(wrappedListener)) {
      wrappedListener = function(event) {
        invokeEventListener(vm, listener, void 0, event);
      };
      cmpEventListenerMap.set(listener, wrappedListener);
    }
    return wrappedListener;
  }
  let idx = 0;
  const ViewModelReflection = new WeakMap();
  function callHook(cmp, fn, args = []) {
    return fn.apply(cmp, args);
  }
  function setHook(cmp, prop, newValue) {
    cmp[prop] = newValue;
  }
  function getHook(cmp, prop) {
    return cmp[prop];
  }
  function rerenderVM(vm) {
    rehydrate(vm);
  }
  function connectRootElement(elm) {
    const vm = getAssociatedVM(elm);
    logGlobalOperationStart(7, vm);
    if (vm.state === 1) {
      disconnectRootElement(elm);
    }
    runConnectedCallback(vm);
    rehydrate(vm);
    logGlobalOperationEnd(7, vm);
  }
  function disconnectRootElement(elm) {
    const vm = getAssociatedVM(elm);
    resetComponentStateWhenRemoved(vm);
  }
  function appendVM(vm) {
    rehydrate(vm);
  }
  function resetComponentStateWhenRemoved(vm) {
    const {
      state
    } = vm;
    if (state !== 2) {
      resetTemplateObserverAndUnsubscribe(vm);
      runDisconnectedCallback(vm);
      runChildNodesDisconnectedCallback(vm);
      runLightChildNodesDisconnectedCallback(vm);
    }
  }
  function removeVM(vm) {
    if (true) {
      if (lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE) {
        assert.isTrue(vm.state === 1 || vm.state === 2, `${vm} must have been connected.`);
      }
    }
    resetComponentStateWhenRemoved(vm);
  }
  function getNearestShadowAncestor(owner) {
    let ancestor = owner;
    while (!isNull(ancestor) && ancestor.renderMode === 0) {
      ancestor = ancestor.owner;
    }
    return ancestor;
  }
  function createVM(elm, ctor, renderer2, options) {
    const {
      mode,
      owner,
      tagName,
      hydrated
    } = options;
    const def = getComponentInternalDef(ctor);
    const apiVersion = getComponentAPIVersion(ctor);
    const vm = {
      elm,
      def,
      idx: idx++,
      state: 0,
      isScheduled: false,
      isDirty: true,
      tagName,
      mode,
      owner,
      refVNodes: null,
      children: EmptyArray,
      aChildren: EmptyArray,
      velements: EmptyArray,
      cmpProps: create(null),
      cmpFields: create(null),
      cmpSlots: {
        slotAssignments: create(null)
      },
      cmpTemplate: null,
      hydrated: Boolean(hydrated),
      renderMode: def.renderMode,
      context: {
        stylesheetToken: void 0,
        hasTokenInClass: void 0,
        hasTokenInAttribute: void 0,
        legacyStylesheetToken: void 0,
        hasLegacyTokenInClass: void 0,
        hasLegacyTokenInAttribute: void 0,
        hasScopedStyles: void 0,
        styleVNodes: null,
        tplCache: EmptyObject,
        wiredConnecting: EmptyArray,
        wiredDisconnecting: EmptyArray
      },
      tro: null,
      shadowMode: null,
      shadowMigrateMode: false,
      stylesheets: null,
      component: null,
      shadowRoot: null,
      renderRoot: null,
      callHook,
      setHook,
      getHook,
      renderer: renderer2,
      apiVersion
    };
    if (true) {
      vm.debugInfo = create(null);
    }
    vm.stylesheets = computeStylesheets(vm, def.ctor);
    const computedShadowMode = computeShadowMode(def, vm.owner, renderer2, hydrated);
    if (lwcRuntimeFlags.ENABLE_FORCE_SHADOW_MIGRATE_MODE) {
      vm.shadowMode = 0;
      vm.shadowMigrateMode = computedShadowMode === 1;
    } else {
      vm.shadowMode = computedShadowMode;
    }
    vm.tro = getTemplateReactiveObserver(vm);
    if (isReportingEnabled() && vm.renderMode === 1) {
      report("ShadowModeUsage", {
        tagName: vm.tagName,
        mode: vm.shadowMode
      });
    }
    if (true) {
      vm.toString = () => {
        return `[object:vm ${def.name} (${vm.idx})]`;
      };
    }
    invokeComponentConstructor(vm, def.ctor);
    if (hasWireAdapters(vm)) {
      installWireAdapters(vm);
    }
    return vm;
  }
  function validateComponentStylesheets(vm, stylesheets) {
    let valid = true;
    const validate = (arrayOrStylesheet) => {
      if (isArray$1(arrayOrStylesheet)) {
        for (let i2 = 0; i2 < arrayOrStylesheet.length; i2++) {
          validate(arrayOrStylesheet[i2]);
        }
      } else if (!isFunction$1(arrayOrStylesheet)) {
        valid = false;
      }
    };
    if (!isArray$1(stylesheets)) {
      valid = false;
    } else {
      validate(stylesheets);
    }
    return valid;
  }
  function computeStylesheets(vm, ctor) {
    warnOnStylesheetsMutation(ctor);
    const {
      stylesheets
    } = ctor;
    if (!isUndefined$1(stylesheets)) {
      const valid = validateComponentStylesheets(vm, stylesheets);
      if (valid) {
        return flattenStylesheets(stylesheets);
      } else if (true) {
        logError(`static stylesheets must be an array of CSS stylesheets. Found invalid stylesheets on <${vm.tagName}>`, vm);
      }
    }
    return null;
  }
  function warnOnStylesheetsMutation(ctor) {
    if (true) {
      let {
        stylesheets
      } = ctor;
      defineProperty(ctor, "stylesheets", {
        enumerable: true,
        configurable: true,
        get() {
          return stylesheets;
        },
        set(newValue) {
          logWarnOnce(`Dynamically setting the "stylesheets" static property on ${ctor.name} will not affect the stylesheets injected.`);
          stylesheets = newValue;
        }
      });
    }
  }
  function computeShadowAndRenderMode(Ctor, renderer2) {
    const def = getComponentInternalDef(Ctor);
    const {
      renderMode
    } = def;
    const shadowMode = computeShadowMode(def, null, renderer2, false);
    return {
      renderMode,
      shadowMode
    };
  }
  function computeShadowMode(def, owner, renderer2, hydrated) {
    if (isTrue(hydrated)) {
      return 0;
    }
    const {
      isSyntheticShadowDefined
    } = renderer2;
    let shadowMode;
    if (isSyntheticShadowDefined || lwcRuntimeFlags.ENABLE_FORCE_SHADOW_MIGRATE_MODE) {
      if (def.renderMode === 0) {
        shadowMode = 0;
      } else if (def.shadowSupportMode === "native") {
        shadowMode = 0;
      } else {
        const shadowAncestor = getNearestShadowAncestor(owner);
        if (!isNull(shadowAncestor) && shadowAncestor.shadowMode === 0) {
          shadowMode = 0;
        } else {
          shadowMode = 1;
        }
      }
    } else {
      shadowMode = 0;
    }
    return shadowMode;
  }
  function assertIsVM(obj) {
    if (!isObject(obj) || isNull(obj) || !("renderRoot" in obj)) {
      throw new TypeError(`${obj} is not a VM.`);
    }
  }
  function associateVM(obj, vm) {
    ViewModelReflection.set(obj, vm);
  }
  function getAssociatedVM(obj) {
    const vm = ViewModelReflection.get(obj);
    if (true) {
      assertIsVM(vm);
    }
    return vm;
  }
  function getAssociatedVMIfPresent(obj) {
    const maybeVm = ViewModelReflection.get(obj);
    if (true) {
      if (!isUndefined$1(maybeVm)) {
        assertIsVM(maybeVm);
      }
    }
    return maybeVm;
  }
  function rehydrate(vm) {
    if (isTrue(vm.isDirty)) {
      const children = renderComponent(vm);
      patchShadowRoot(vm, children);
    }
  }
  function patchShadowRoot(vm, newCh) {
    const {
      renderRoot,
      children: oldCh,
      renderer: renderer2
    } = vm;
    resetRefVNodes(vm);
    vm.children = newCh;
    if (newCh.length > 0 || oldCh.length > 0) {
      if (oldCh !== newCh) {
        runWithBoundaryProtection(vm, vm, () => {
          logOperationStart(2, vm);
        }, () => {
          patchChildren(oldCh, newCh, renderRoot, renderer2);
        }, () => {
          logOperationEnd(2, vm);
        });
      }
    }
    if (vm.state === 1) {
      runRenderedCallback(vm);
    }
  }
  function runRenderedCallback(vm) {
    const {
      def: {
        renderedCallback
      }
    } = vm;
    if (!isUndefined$1(renderedCallback)) {
      logOperationStart(4, vm);
      invokeComponentCallback(vm, renderedCallback);
      logOperationEnd(4, vm);
    }
  }
  let rehydrateQueue = [];
  function flushRehydrationQueue() {
    logGlobalOperationStart(8);
    if (true) {
      assert.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
    }
    const vms = rehydrateQueue.sort((a, b2) => a.idx - b2.idx);
    rehydrateQueue = [];
    for (let i2 = 0, len = vms.length; i2 < len; i2 += 1) {
      const vm = vms[i2];
      try {
        rehydrate(vm);
      } catch (error) {
        if (i2 + 1 < len) {
          if (rehydrateQueue.length === 0) {
            addCallbackToNextTick(flushRehydrationQueue);
          }
          ArrayUnshift.apply(rehydrateQueue, ArraySlice.call(vms, i2 + 1));
        }
        logGlobalOperationEnd(8);
        throw error;
      }
    }
    logGlobalOperationEnd(8);
  }
  function runConnectedCallback(vm) {
    const {
      state
    } = vm;
    if (state === 1) {
      return;
    }
    vm.state = 1;
    if (hasWireAdapters(vm)) {
      connectWireAdapters(vm);
    }
    const {
      connectedCallback
    } = vm.def;
    if (!isUndefined$1(connectedCallback)) {
      logOperationStart(3, vm);
      invokeComponentCallback(vm, connectedCallback);
      logOperationEnd(3, vm);
    }
    if (lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE && true) {
      if (!vm.renderer.isConnected(vm.elm)) {
        if (true) {
          logWarnOnce(`Element <${vm.tagName}> fired a \`connectedCallback\` and rendered, but was not connected to the DOM. Please ensure all components are actually connected to the DOM, e.g. using \`document.body.appendChild(element)\`. This will not be supported in future versions of LWC and could cause component errors. For details, see: https://sfdc.co/synthetic-lifecycle`);
        }
        report("ConnectedCallbackWhileDisconnected", {
          tagName: vm.tagName
        });
      }
    }
  }
  function hasWireAdapters(vm) {
    return getOwnPropertyNames$1(vm.def.wire).length > 0;
  }
  function runDisconnectedCallback(vm) {
    if (true) {
      assert.isTrue(vm.state !== 2, `${vm} must be inserted.`);
    }
    if (isFalse(vm.isDirty)) {
      vm.isDirty = true;
    }
    vm.state = 2;
    if (hasWireAdapters(vm)) {
      disconnectWireAdapters(vm);
    }
    const {
      disconnectedCallback
    } = vm.def;
    if (!isUndefined$1(disconnectedCallback)) {
      logOperationStart(5, vm);
      invokeComponentCallback(vm, disconnectedCallback);
      logOperationEnd(5, vm);
    }
  }
  function runChildNodesDisconnectedCallback(vm) {
    const {
      velements: vCustomElementCollection
    } = vm;
    for (let i2 = vCustomElementCollection.length - 1; i2 >= 0; i2 -= 1) {
      const {
        elm
      } = vCustomElementCollection[i2];
      if (!isUndefined$1(elm)) {
        const childVM = getAssociatedVMIfPresent(elm);
        if (!isUndefined$1(childVM)) {
          resetComponentStateWhenRemoved(childVM);
        }
      }
    }
  }
  function runLightChildNodesDisconnectedCallback(vm) {
    const {
      aChildren: adoptedChildren
    } = vm;
    recursivelyDisconnectChildren(adoptedChildren);
  }
  function recursivelyDisconnectChildren(vnodes) {
    for (let i2 = 0, len = vnodes.length; i2 < len; i2 += 1) {
      const vnode = vnodes[i2];
      if (!isNull(vnode) && !isUndefined$1(vnode.elm)) {
        switch (vnode.type) {
          case 2:
            recursivelyDisconnectChildren(vnode.children);
            break;
          case 3: {
            const vm = getAssociatedVM(vnode.elm);
            resetComponentStateWhenRemoved(vm);
            break;
          }
        }
      }
    }
  }
  function resetComponentRoot(vm) {
    recursivelyRemoveChildren(vm.children, vm);
    vm.children = EmptyArray;
    runChildNodesDisconnectedCallback(vm);
    vm.velements = EmptyArray;
  }
  function recursivelyRemoveChildren(vnodes, vm) {
    const {
      renderRoot,
      renderer: {
        remove
      }
    } = vm;
    for (let i2 = 0, len = vnodes.length; i2 < len; i2 += 1) {
      const vnode = vnodes[i2];
      if (!isNull(vnode)) {
        if (isVFragment(vnode)) {
          recursivelyRemoveChildren(vnode.children, vm);
        } else if (!isUndefined$1(vnode.elm)) {
          remove(vnode.elm, renderRoot);
        }
      }
    }
  }
  function scheduleRehydration(vm) {
    if (isTrue(vm.isScheduled)) {
      return;
    }
    vm.isScheduled = true;
    if (rehydrateQueue.length === 0) {
      addCallbackToNextTick(flushRehydrationQueue);
    }
    ArrayPush$1.call(rehydrateQueue, vm);
  }
  function getErrorBoundaryVM(vm) {
    let currentVm = vm;
    while (!isNull(currentVm)) {
      if (!isUndefined$1(currentVm.def.errorCallback)) {
        return currentVm;
      }
      currentVm = currentVm.owner;
    }
  }
  function runWithBoundaryProtection(vm, owner, pre, job, post) {
    let error;
    pre();
    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      post();
      if (!isUndefined$1(error)) {
        addErrorComponentStack(vm, error);
        const errorBoundaryVm = isNull(owner) ? void 0 : getErrorBoundaryVM(owner);
        if (isUndefined$1(errorBoundaryVm)) {
          throw error;
        }
        resetComponentRoot(vm);
        logOperationStart(6, vm);
        const errorCallback = errorBoundaryVm.def.errorCallback;
        invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
        logOperationEnd(6, vm);
      }
    }
  }
  function forceRehydration(vm) {
    vm.cmpTemplate = () => [];
    if (isFalse(vm.isDirty)) {
      markComponentAsDirty(vm);
      scheduleRehydration(vm);
    }
  }
  function runFormAssociatedCustomElementCallback(vm, faceCb, args) {
    const {
      renderMode,
      shadowMode
    } = vm;
    if (shadowMode === 1 && renderMode !== 0) {
      throw new Error("Form associated lifecycle methods are not available in synthetic shadow. Please use native shadow or light DOM.");
    }
    invokeComponentCallback(vm, faceCb, args);
  }
  function runFormAssociatedCallback(elm, form) {
    const vm = getAssociatedVM(elm);
    const {
      formAssociatedCallback
    } = vm.def;
    if (!isUndefined$1(formAssociatedCallback)) {
      runFormAssociatedCustomElementCallback(vm, formAssociatedCallback, [form]);
    }
  }
  function runFormDisabledCallback(elm, disabled) {
    const vm = getAssociatedVM(elm);
    const {
      formDisabledCallback
    } = vm.def;
    if (!isUndefined$1(formDisabledCallback)) {
      runFormAssociatedCustomElementCallback(vm, formDisabledCallback, [disabled]);
    }
  }
  function runFormResetCallback(elm) {
    const vm = getAssociatedVM(elm);
    const {
      formResetCallback
    } = vm.def;
    if (!isUndefined$1(formResetCallback)) {
      runFormAssociatedCustomElementCallback(vm, formResetCallback);
    }
  }
  function runFormStateRestoreCallback(elm, state, reason) {
    const vm = getAssociatedVM(elm);
    const {
      formStateRestoreCallback
    } = vm.def;
    if (!isUndefined$1(formStateRestoreCallback)) {
      runFormAssociatedCustomElementCallback(vm, formStateRestoreCallback, [state, reason]);
    }
  }
  function resetRefVNodes(vm) {
    const {
      cmpTemplate
    } = vm;
    vm.refVNodes = !isNull(cmpTemplate) && cmpTemplate.hasRefs ? create(null) : null;
  }
  const getElementById = globalThis[KEY__NATIVE_GET_ELEMENT_BY_ID];
  const querySelectorAll = globalThis[KEY__NATIVE_QUERY_SELECTOR_ALL];
  delete globalThis[KEY__NATIVE_GET_ELEMENT_BY_ID];
  delete globalThis[KEY__NATIVE_QUERY_SELECTOR_ALL];
  function isSyntheticShadowRootInstance(rootNode) {
    return rootNode !== document && isTrue(rootNode.synthetic);
  }
  function reportViolation$1(source, target, attrName) {
    let vm = getAssociatedVMIfPresent(source.getRootNode().host);
    if (isUndefined$1(vm)) {
      vm = getAssociatedVMIfPresent(target.getRootNode().host);
    }
    if (isUndefined$1(vm)) {
      return;
    }
    report("CrossRootAriaInSyntheticShadow", {
      tagName: vm.tagName,
      attributeName: attrName
    });
    if (true) {
      logWarnOnce(`Element <${source.tagName.toLowerCase()}> uses attribute "${attrName}" to reference element <${target.tagName.toLowerCase()}>, which is not in the same shadow root. This will break in native shadow DOM. For details, see: https://sfdc.co/synthetic-aria`, vm);
    }
  }
  function parseIdRefAttributeValue(attrValue) {
    return isString(attrValue) ? ArrayFilter.call(StringSplit.call(attrValue, /\s+/), Boolean) : [];
  }
  function detectSyntheticCrossRootAria(elm, attrName, attrValue) {
    const root = elm.getRootNode();
    if (!isSyntheticShadowRootInstance(root)) {
      return;
    }
    if (attrName === "id") {
      if (!isString(attrValue) || attrValue.length === 0) {
        return;
      }
      for (const idRefAttrName of ID_REFERENCING_ATTRIBUTES_SET) {
        const query = `[${idRefAttrName}~="${CSS.escape(attrValue)}"]`;
        const sourceElements = querySelectorAll.call(document, query);
        for (let i2 = 0; i2 < sourceElements.length; i2++) {
          const sourceElement = sourceElements[i2];
          const sourceRoot = sourceElement.getRootNode();
          if (sourceRoot !== root) {
            reportViolation$1(sourceElement, elm, idRefAttrName);
            break;
          }
        }
      }
    } else {
      const ids = parseIdRefAttributeValue(attrValue);
      for (const id of ids) {
        const target = getElementById.call(document, id);
        if (!isNull(target)) {
          const targetRoot = target.getRootNode();
          if (targetRoot !== root) {
            reportViolation$1(elm, target, attrName);
          }
        }
      }
    }
  }
  let enabled = false;
  function enableDetection$1() {
    if (enabled) {
      return;
    }
    enabled = true;
    const {
      setAttribute
    } = Element.prototype;
    assign(Element.prototype, {
      setAttribute(attrName, attrValue) {
        setAttribute.call(this, attrName, attrValue);
        if (attrName === "id" || ID_REFERENCING_ATTRIBUTES_SET.has(attrName)) {
          detectSyntheticCrossRootAria(this, attrName, attrValue);
        }
      }
    });
    const idDescriptor = getOwnPropertyDescriptor$1(Element.prototype, "id");
    if (!isUndefined$1(idDescriptor)) {
      const {
        get,
        set
      } = idDescriptor;
      if (isFunction$1(get) && isFunction$1(set)) {
        defineProperty(Element.prototype, "id", {
          get() {
            return get.call(this);
          },
          set(value) {
            set.call(this, value);
            detectSyntheticCrossRootAria(this, "id", value);
          },
          enumerable: true,
          configurable: true
        });
      }
    }
  }
  function supportsCssEscape() {
    return typeof CSS !== "undefined" && isFunction$1(CSS.escape);
  }
  function isSyntheticShadowLoaded() {
    return hasOwnProperty$1.call(Element.prototype, KEY__SHADOW_TOKEN);
  }
  if (supportsCssEscape() && isSyntheticShadowLoaded()) {
    if (true) {
      enableDetection$1();
    } else {
      onReportingEnabled(enableDetection$1);
    }
  }
  const NON_STANDARD_ARIA_PROPS = ["ariaActiveDescendant", "ariaControls", "ariaDescribedBy", "ariaDetails", "ariaErrorMessage", "ariaFlowTo", "ariaLabelledBy", "ariaOwns"];
  function isGlobalAriaPolyfillLoaded() {
    return !isUndefined$1(getOwnPropertyDescriptor$1(Element.prototype, "ariaActiveDescendant"));
  }
  function findVM(elm) {
    const {
      host
    } = elm.getRootNode();
    const vm = isUndefined$1(host) ? void 0 : getAssociatedVMIfPresent(host);
    if (!isUndefined$1(vm)) {
      return vm;
    }
    let parentElement = elm;
    while (!isNull(parentElement = parentElement.parentElement)) {
      if (parentElement instanceof BaseBridgeElement) {
        const vm2 = getAssociatedVMIfPresent(parentElement);
        if (!isUndefined$1(vm2)) {
          return vm2;
        }
      }
    }
  }
  function checkAndReportViolation(elm, prop, isSetter, setValue) {
    const vm = findVM(elm);
    if (true) {
      logWarnOnce(`Element <${elm.tagName.toLowerCase()}> ` + (isUndefined$1(vm) ? "" : `owned by <${vm.elm.tagName.toLowerCase()}> `) + `uses non-standard property "${prop}". This will be removed in a future version of LWC. See https://sfdc.co/deprecated-aria`);
    }
    let setValueType;
    if (isSetter) {
      setValueType = isNull(setValue) ? "null" : typeof setValue;
    }
    report("NonStandardAriaReflection", {
      tagName: vm?.tagName,
      propertyName: prop,
      isSetter,
      setValueType
    });
  }
  function enableDetection() {
    const {
      prototype
    } = Element;
    for (const prop of NON_STANDARD_ARIA_PROPS) {
      const descriptor = getOwnPropertyDescriptor$1(prototype, prop);
      if (true) {
        if (isUndefined$1(descriptor) || isUndefined$1(descriptor.get) || isUndefined$1(descriptor.set)) {
          throw new Error("detect-non-standard-aria.ts loaded before @lwc/aria-reflection");
        }
      }
      const {
        get,
        set
      } = descriptor;
      defineProperty(prototype, prop, {
        get() {
          checkAndReportViolation(this, prop, false, void 0);
          return get.call(this);
        },
        set(val) {
          checkAndReportViolation(this, prop, true, val);
          return set.call(this, val);
        },
        configurable: true,
        enumerable: true
      });
    }
  }
  if (isGlobalAriaPolyfillLoaded()) {
    if (true) {
      enableDetection();
    } else {
      onReportingEnabled(enableDetection);
    }
  }
  let hasMismatch = false;
  function hydrateRoot(vm) {
    hasMismatch = false;
    runConnectedCallback(vm);
    hydrateVM(vm);
    if (hasMismatch && true) {
      logError("Hydration completed with errors.", vm);
    }
  }
  function hydrateVM(vm) {
    const children = renderComponent(vm);
    vm.children = children;
    resetRefVNodes(vm);
    const {
      renderRoot: parentNode,
      renderer: {
        getFirstChild
      }
    } = vm;
    hydrateChildren(getFirstChild(parentNode), children, parentNode, vm, false);
    runRenderedCallback(vm);
  }
  function hydrateNode(node, vnode, renderer2) {
    let hydratedNode;
    switch (vnode.type) {
      case 0:
        hydratedNode = hydrateText(node, vnode, renderer2);
        break;
      case 1:
        hydratedNode = hydrateComment(node, vnode, renderer2);
        break;
      case 4:
        hydratedNode = hydrateStaticElement(node, vnode, renderer2);
        break;
      case 5:
        hydratedNode = hydrateFragment(node, vnode, renderer2);
        break;
      case 2:
        hydratedNode = hydrateElement(node, vnode, vnode.data.renderer ?? renderer2);
        break;
      case 3:
        hydratedNode = hydrateCustomElement(node, vnode, vnode.data.renderer ?? renderer2);
        break;
    }
    return renderer2.nextSibling(hydratedNode);
  }
  const NODE_VALUE_PROP = "nodeValue";
  function textNodeContentsAreEqual(node, vnode, renderer2) {
    const {
      getProperty
    } = renderer2;
    const nodeValue = getProperty(node, NODE_VALUE_PROP);
    if (nodeValue === vnode.text) {
      return true;
    }
    if (nodeValue === "\u200D" && vnode.text === "") {
      return true;
    }
    return false;
  }
  function getValidationPredicate(elm, renderer2, optOutStaticProp) {
    const hostMutatedValue = renderer2.getAttribute(elm, "data-lwc-host-mutated");
    if (isString(hostMutatedValue)) {
      const mutatedAttrValues = new Set(StringSplit.call(hostMutatedValue, / /));
      return (attrName) => !mutatedAttrValues.has(attrName);
    }
    if (isUndefined$1(optOutStaticProp)) {
      return (_attrName) => true;
    }
    if (isTrue(optOutStaticProp)) {
      return (_attrName) => false;
    }
    if (isArray$1(optOutStaticProp) && arrayEvery(optOutStaticProp, isString)) {
      return (attrName) => !ArrayIncludes.call(optOutStaticProp, attrName);
    }
    if (true) {
      logWarn("Validation opt out must be `true` or an array of attributes that should not be validated.");
    }
    return (_attrName) => true;
  }
  function hydrateText(node, vnode, renderer2) {
    if (!hasCorrectNodeType(vnode, node, 3, renderer2)) {
      return handleMismatch(node, vnode, renderer2);
    }
    return updateTextContent(node, vnode, vnode.owner, renderer2);
  }
  function updateTextContent(node, vnode, owner, renderer2) {
    if (true) {
      if (!textNodeContentsAreEqual(node, vnode, renderer2)) {
        logWarn("Hydration mismatch: text values do not match, will recover from the difference", owner);
      }
    }
    const {
      setText
    } = renderer2;
    setText(node, vnode.text ?? null);
    vnode.elm = node;
    return node;
  }
  function hydrateComment(node, vnode, renderer2) {
    if (!hasCorrectNodeType(vnode, node, 8, renderer2)) {
      return handleMismatch(node, vnode, renderer2);
    }
    if (true) {
      const {
        getProperty
      } = renderer2;
      const nodeValue = getProperty(node, NODE_VALUE_PROP);
      if (nodeValue !== vnode.text) {
        logWarn("Hydration mismatch: comment values do not match, will recover from the difference", vnode.owner);
      }
    }
    const {
      setProperty
    } = renderer2;
    setProperty(node, NODE_VALUE_PROP, vnode.text ?? null);
    vnode.elm = node;
    return node;
  }
  function hydrateStaticElement(elm, vnode, renderer2) {
    if (!hasCorrectNodeType(vnode, elm, 1, renderer2) || !areCompatibleStaticNodes(vnode.fragment, elm, vnode, renderer2)) {
      return handleMismatch(elm, vnode, renderer2);
    }
    return hydrateStaticElementParts(elm, vnode, renderer2);
  }
  function hydrateStaticElementParts(elm, vnode, renderer2) {
    const {
      parts
    } = vnode;
    if (!isUndefined$1(parts)) {
      traverseAndSetElements(elm, parts, renderer2);
    }
    if (!haveCompatibleStaticParts(vnode, renderer2)) {
      return handleMismatch(elm, vnode, renderer2);
    }
    vnode.elm = elm;
    hydrateStaticParts(vnode, renderer2);
    return elm;
  }
  function hydrateFragment(elm, vnode, renderer2) {
    const {
      children,
      owner
    } = vnode;
    hydrateChildren(elm, children, renderer2.getProperty(elm, "parentNode"), owner, true);
    return vnode.elm = children[children.length - 1].elm;
  }
  function hydrateElement(elm, vnode, renderer2) {
    if (!hasCorrectNodeType(vnode, elm, 1, renderer2) || !isMatchingElement(vnode, elm, renderer2)) {
      return handleMismatch(elm, vnode, renderer2);
    }
    vnode.elm = elm;
    const {
      owner
    } = vnode;
    const {
      context
    } = vnode.data;
    const isDomManual = Boolean(!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === "manual");
    if (isDomManual) {
      const {
        data: {
          props
        }
      } = vnode;
      const {
        getProperty
      } = renderer2;
      if (!isUndefined$1(props) && !isUndefined$1(props.innerHTML)) {
        if (getProperty(elm, "innerHTML") === props.innerHTML) {
          vnode.data = {
            ...vnode.data,
            props: cloneAndOmitKey(props, "innerHTML")
          };
        } else {
          if (true) {
            logWarn(`Mismatch hydrating element <${getProperty(elm, "tagName").toLowerCase()}>: innerHTML values do not match for element, will recover from the difference`, owner);
          }
        }
      }
    }
    patchElementPropsAndAttrsAndRefs(vnode, renderer2);
    if (!isDomManual) {
      const {
        getFirstChild
      } = renderer2;
      hydrateChildren(getFirstChild(elm), vnode.children, elm, owner, false);
    }
    return elm;
  }
  function hydrateCustomElement(elm, vnode, renderer2) {
    const {
      validationOptOut
    } = vnode.ctor;
    const shouldValidateAttr = getValidationPredicate(elm, renderer2, validationOptOut);
    if (!hasCorrectNodeType(vnode, elm, 1, renderer2) || !isMatchingElement(vnode, elm, renderer2, shouldValidateAttr)) {
      return handleMismatch(elm, vnode, renderer2);
    }
    const {
      sel,
      mode,
      ctor,
      owner
    } = vnode;
    const {
      defineCustomElement,
      getTagName
    } = renderer2;
    const isFormAssociated = shouldBeFormAssociated(ctor);
    defineCustomElement(StringToLowerCase.call(getTagName(elm)), isFormAssociated);
    const vm = createVM(elm, ctor, renderer2, {
      mode,
      owner,
      tagName: sel,
      hydrated: true
    });
    vnode.elm = elm;
    vnode.vm = vm;
    allocateChildren(vnode, vm);
    patchElementPropsAndAttrsAndRefs(vnode, renderer2);
    if (true) {
      assert.isTrue(vm.state === 0, `${vm} cannot be recycled.`);
    }
    runConnectedCallback(vm);
    if (vm.renderMode !== 0) {
      const {
        getFirstChild
      } = renderer2;
      hydrateChildren(getFirstChild(elm), vnode.children, elm, vm, false);
    }
    hydrateVM(vm);
    return elm;
  }
  function hydrateChildren(node, children, parentNode, owner, expectAddlSiblings) {
    let hasWarned = false;
    let nextNode = node;
    const {
      renderer: renderer2
    } = owner;
    for (let i2 = 0; i2 < children.length; i2++) {
      const childVnode = children[i2];
      if (!isNull(childVnode)) {
        if (nextNode) {
          nextNode = hydrateNode(nextNode, childVnode, renderer2);
        } else {
          hasMismatch = true;
          if (true) {
            if (!hasWarned) {
              hasWarned = true;
              logError(`Hydration mismatch: incorrect number of rendered nodes. Client produced more nodes than the server.`, owner);
            }
          }
          mount(childVnode, parentNode, renderer2, nextNode);
          nextNode = renderer2.nextSibling(childVnode.elm);
        }
      }
    }
    const useCommentsForBookends = isAPIFeatureEnabled(5, owner.apiVersion);
    if ((!useCommentsForBookends || !expectAddlSiblings) && nextNode) {
      hasMismatch = true;
      if (true) {
        if (!hasWarned) {
          logError(`Hydration mismatch: incorrect number of rendered nodes. Server rendered more nodes than the client.`, owner);
        }
      }
      const {
        nextSibling
      } = renderer2;
      do {
        const current = nextNode;
        nextNode = nextSibling(nextNode);
        removeNode(current, parentNode, renderer2);
      } while (nextNode);
    }
  }
  function handleMismatch(node, vnode, renderer2) {
    hasMismatch = true;
    const {
      getProperty
    } = renderer2;
    const parentNode = getProperty(node, "parentNode");
    mount(vnode, parentNode, renderer2, node);
    removeNode(node, parentNode, renderer2);
    return vnode.elm;
  }
  function patchElementPropsAndAttrsAndRefs(vnode, renderer2) {
    applyEventListeners(vnode, renderer2);
    patchProps(null, vnode, renderer2);
    applyRefs(vnode, vnode.owner);
  }
  function hasCorrectNodeType(vnode, node, nodeType, renderer2) {
    const {
      getProperty
    } = renderer2;
    if (getProperty(node, "nodeType") !== nodeType) {
      if (true) {
        logError("Hydration mismatch: incorrect node type received", vnode.owner);
      }
      return false;
    }
    return true;
  }
  function isMatchingElement(vnode, elm, renderer2, shouldValidateAttr = () => true) {
    const {
      getProperty
    } = renderer2;
    if (vnode.sel.toLowerCase() !== getProperty(elm, "tagName").toLowerCase()) {
      if (true) {
        logError(`Hydration mismatch: expecting element with tag "${vnode.sel.toLowerCase()}" but found "${getProperty(elm, "tagName").toLowerCase()}".`, vnode.owner);
      }
      return false;
    }
    const {
      data
    } = vnode;
    const hasCompatibleAttrs = validateAttrs(vnode, elm, data, renderer2, shouldValidateAttr);
    const hasCompatibleClass = shouldValidateAttr("class") ? validateClassAttr(vnode, elm, data, renderer2) : true;
    const hasCompatibleStyle = shouldValidateAttr("style") ? validateStyleAttr(vnode, elm, data, renderer2) : true;
    return hasCompatibleAttrs && hasCompatibleClass && hasCompatibleStyle;
  }
  function attributeValuesAreEqual(vnodeValue, value) {
    const vnodeValueAsString = String(vnodeValue);
    if (vnodeValueAsString === value) {
      return true;
    }
    if (isNull(value) && (isUndefined$1(vnodeValue) || isNull(vnodeValue))) {
      return true;
    }
    return false;
  }
  function validateAttrs(vnode, elm, data, renderer2, shouldValidateAttr) {
    const {
      attrs = {}
    } = data;
    let nodesAreCompatible = true;
    for (const [attrName, attrValue] of Object.entries(attrs)) {
      if (!shouldValidateAttr(attrName)) {
        continue;
      }
      const {
        getAttribute
      } = renderer2;
      const elmAttrValue = getAttribute(elm, attrName);
      if (!attributeValuesAreEqual(attrValue, elmAttrValue)) {
        if (true) {
          const {
            getProperty
          } = renderer2;
          logError(`Mismatch hydrating element <${getProperty(elm, "tagName").toLowerCase()}>: attribute "${attrName}" has different values, expected "${attrValue}" but found ${isNull(elmAttrValue) ? "null" : `"${elmAttrValue}"`}`, vnode.owner);
        }
        nodesAreCompatible = false;
      }
    }
    return nodesAreCompatible;
  }
  function validateClassAttr(vnode, elm, data, renderer2) {
    const {
      owner
    } = vnode;
    let {
      className,
      classMap
    } = data;
    const {
      getProperty,
      getClassList,
      getAttribute
    } = renderer2;
    const scopedToken = getScopeTokenClass(owner, false);
    const stylesheetTokenHost = isVCustomElement(vnode) ? getStylesheetTokenHost(vnode) : null;
    if (!isNull(scopedToken) || !isNull(stylesheetTokenHost)) {
      if (!isUndefined$1(className)) {
        const classTokens = [scopedToken, className, stylesheetTokenHost];
        const classNames = ArrayFilter.call(classTokens, (token) => !isNull(token));
        className = ArrayJoin.call(classNames, " ");
      } else if (!isUndefined$1(classMap)) {
        classMap = {
          ...classMap,
          ...!isNull(scopedToken) ? {
            [scopedToken]: true
          } : {},
          ...!isNull(stylesheetTokenHost) ? {
            [stylesheetTokenHost]: true
          } : {}
        };
      } else {
        const classTokens = [scopedToken, stylesheetTokenHost];
        const classNames = ArrayFilter.call(classTokens, (token) => !isNull(token));
        if (classNames.length) {
          className = ArrayJoin.call(classNames, " ");
        }
      }
    }
    let nodesAreCompatible = true;
    let readableVnodeClassname;
    const elmClassName = getAttribute(elm, "class");
    if (!isUndefined$1(className) && String(className) !== elmClassName) {
      nodesAreCompatible = false;
      readableVnodeClassname = JSON.stringify(className);
    } else if (!isUndefined$1(classMap)) {
      const classList = getClassList(elm);
      let computedClassName = "";
      for (const name in classMap) {
        computedClassName += " " + name;
        if (!classList.contains(name)) {
          nodesAreCompatible = false;
        }
      }
      readableVnodeClassname = JSON.stringify(computedClassName.trim());
      if (classList.length > keys(classMap).length) {
        nodesAreCompatible = false;
      }
    } else if (isUndefined$1(className) && !isNull(elmClassName)) {
      nodesAreCompatible = false;
      readableVnodeClassname = '""';
    }
    if (!nodesAreCompatible) {
      if (true) {
        logError(`Mismatch hydrating element <${getProperty(elm, "tagName").toLowerCase()}>: attribute "class" has different values, expected ${readableVnodeClassname} but found ${JSON.stringify(elmClassName)}`, vnode.owner);
      }
    }
    return nodesAreCompatible;
  }
  function validateStyleAttr(vnode, elm, data, renderer2) {
    const {
      style,
      styleDecls
    } = data;
    const {
      getAttribute
    } = renderer2;
    const elmStyle = getAttribute(elm, "style") || "";
    let vnodeStyle;
    let nodesAreCompatible = true;
    if (!isUndefined$1(style) && style !== elmStyle) {
      nodesAreCompatible = false;
      vnodeStyle = style;
    } else if (!isUndefined$1(styleDecls)) {
      const parsedVnodeStyle = parseStyleText(elmStyle);
      const expectedStyle = [];
      for (let i2 = 0, n = styleDecls.length; i2 < n; i2++) {
        const [prop, value, important] = styleDecls[i2];
        expectedStyle.push(`${prop}: ${value + (important ? " important!" : "")}`);
        const parsedPropValue = parsedVnodeStyle[prop];
        if (isUndefined$1(parsedPropValue)) {
          nodesAreCompatible = false;
        } else if (!parsedPropValue.startsWith(value)) {
          nodesAreCompatible = false;
        } else if (important && !parsedPropValue.endsWith("!important")) {
          nodesAreCompatible = false;
        }
      }
      if (keys(parsedVnodeStyle).length > styleDecls.length) {
        nodesAreCompatible = false;
      }
      vnodeStyle = ArrayJoin.call(expectedStyle, ";");
    }
    if (!nodesAreCompatible) {
      if (true) {
        const {
          getProperty
        } = renderer2;
        logError(`Mismatch hydrating element <${getProperty(elm, "tagName").toLowerCase()}>: attribute "style" has different values, expected "${vnodeStyle}" but found "${elmStyle}".`, vnode.owner);
      }
    }
    return nodesAreCompatible;
  }
  function areCompatibleStaticNodes(client, ssr, vnode, renderer2) {
    const {
      getProperty,
      getAttribute
    } = renderer2;
    if (getProperty(client, "nodeType") === 3) {
      if (!hasCorrectNodeType(vnode, ssr, 3, renderer2)) {
        return false;
      }
      return getProperty(client, NODE_VALUE_PROP) === getProperty(ssr, NODE_VALUE_PROP);
    }
    if (getProperty(client, "nodeType") === 8) {
      if (!hasCorrectNodeType(vnode, ssr, 8, renderer2)) {
        return false;
      }
      return getProperty(client, NODE_VALUE_PROP) === getProperty(ssr, NODE_VALUE_PROP);
    }
    if (!hasCorrectNodeType(vnode, ssr, 1, renderer2)) {
      return false;
    }
    const {
      owner,
      parts
    } = vnode;
    let isCompatibleElements = true;
    if (getProperty(client, "tagName") !== getProperty(ssr, "tagName")) {
      if (true) {
        logError(`Hydration mismatch: expecting element with tag "${getProperty(client, "tagName").toLowerCase()}" but found "${getProperty(ssr, "tagName").toLowerCase()}".`, owner);
      }
      return false;
    }
    const clientAttrsNames = getProperty(client, "getAttributeNames").call(client);
    clientAttrsNames.forEach((attrName) => {
      if (getAttribute(client, attrName) !== getAttribute(ssr, attrName)) {
        if (parts?.[0].partId !== 0) {
          if (true) {
            logError(`Mismatch hydrating element <${getProperty(client, "tagName").toLowerCase()}>: attribute "${attrName}" has different values, expected "${getAttribute(client, attrName)}" but found "${getAttribute(ssr, attrName)}"`, owner);
          }
          isCompatibleElements = false;
        }
      }
    });
    return isCompatibleElements;
  }
  function haveCompatibleStaticParts(vnode, renderer2) {
    const {
      parts,
      owner
    } = vnode;
    if (isUndefined$1(parts)) {
      return true;
    }
    const shouldValidateAttr = (data, attrName) => attrName in data;
    for (const part of parts) {
      const {
        elm
      } = part;
      if (isVStaticPartElement(part)) {
        if (!hasCorrectNodeType(vnode, elm, 1, renderer2)) {
          return false;
        }
        const {
          data
        } = part;
        const hasMatchingAttrs = validateAttrs(vnode, elm, data, renderer2, () => true);
        const hasMatchingStyleAttr = shouldValidateAttr(data, "style") ? validateStyleAttr(vnode, elm, data, renderer2) : true;
        const hasMatchingClass = shouldValidateAttr(data, "className") ? validateClassAttr(vnode, elm, data, renderer2) : true;
        if (isFalse(hasMatchingAttrs && hasMatchingStyleAttr && hasMatchingClass)) {
          return false;
        }
      } else {
        if (!hasCorrectNodeType(vnode, elm, 3, renderer2)) {
          return false;
        }
        updateTextContent(elm, part, owner, renderer2);
      }
    }
    return true;
  }
  let hooksAreSet = false;
  function setHooks(hooks) {
    assert.isFalse(hooksAreSet, "Hooks are already overridden, only one definition is allowed.");
    hooksAreSet = true;
    setSanitizeHtmlContentHook(hooks.sanitizeHtmlContent);
  }
  const TEMPLATE_PROPS = ["slots", "stylesheetToken", "stylesheets", "renderMode", "legacyStylesheetToken"];
  const STYLESHEET_PROPS = [
    "$scoped$"
  ];
  const ARRAY_MUTATION_METHODS = ["pop", "push", "shift", "unshift", "reverse", "sort", "fill", "splice", "copyWithin"];
  let mutationTrackingDisabled = false;
  function getOriginalArrayMethod(prop) {
    switch (prop) {
      case "pop":
        return ArrayPop;
      case "push":
        return ArrayPush$1;
      case "shift":
        return ArrayShift;
      case "unshift":
        return ArrayUnshift;
      case "reverse":
        return ArrayReverse;
      case "sort":
        return ArraySort;
      case "fill":
        return ArrayFill;
      case "splice":
        return ArraySplice;
      case "copyWithin":
        return ArrayCopyWithin;
    }
  }
  function reportViolation(type, eventId, prop) {
    if (true) {
      logWarnOnce(`Mutating the "${prop}" property on a ${type} is deprecated and will be removed in a future version of LWC. See: https://sfdc.co/template-mutation`);
    }
    report(eventId, {
      propertyName: prop
    });
  }
  function reportTemplateViolation(prop) {
    reportViolation("template", "TemplateMutation", prop);
  }
  function reportStylesheetViolation(prop) {
    reportViolation("stylesheet", "StylesheetMutation", prop);
  }
  function warnOnArrayMutation(stylesheets) {
    for (const prop of ARRAY_MUTATION_METHODS) {
      const originalArrayMethod = getOriginalArrayMethod(prop);
      stylesheets[prop] = function arrayMutationWarningWrapper() {
        reportTemplateViolation("stylesheets");
        return originalArrayMethod.apply(this, arguments);
      };
    }
  }
  function warnOnStylesheetFunctionMutation(stylesheet) {
    for (const prop of STYLESHEET_PROPS) {
      let value = stylesheet[prop];
      defineProperty(stylesheet, prop, {
        enumerable: true,
        configurable: true,
        get() {
          return value;
        },
        set(newValue) {
          reportStylesheetViolation(prop);
          value = newValue;
        }
      });
    }
  }
  function trackStylesheetsMutation(stylesheets) {
    traverseStylesheets(stylesheets, (subStylesheets) => {
      if (isArray$1(subStylesheets)) {
        warnOnArrayMutation(subStylesheets);
      } else {
        warnOnStylesheetFunctionMutation(subStylesheets);
      }
    });
  }
  function deepFreeze(stylesheets) {
    traverseStylesheets(stylesheets, (subStylesheets) => {
      freeze(subStylesheets);
    });
  }
  function traverseStylesheets(stylesheets, callback) {
    callback(stylesheets);
    for (let i2 = 0; i2 < stylesheets.length; i2++) {
      const stylesheet = stylesheets[i2];
      if (isArray$1(stylesheet)) {
        traverseStylesheets(stylesheet, callback);
      } else {
        callback(stylesheet);
      }
    }
  }
  function trackMutations(tmpl) {
    if (!isUndefined$1(tmpl.stylesheets)) {
      trackStylesheetsMutation(tmpl.stylesheets);
    }
    for (const prop of TEMPLATE_PROPS) {
      let value = tmpl[prop];
      defineProperty(tmpl, prop, {
        enumerable: true,
        configurable: true,
        get() {
          return value;
        },
        set(newValue) {
          if (!mutationTrackingDisabled) {
            reportTemplateViolation(prop);
          }
          value = newValue;
        }
      });
    }
    const originalDescriptor = getOwnPropertyDescriptor$1(tmpl, "stylesheetTokens");
    defineProperty(tmpl, "stylesheetTokens", {
      enumerable: true,
      configurable: true,
      get: originalDescriptor.get,
      set(value) {
        reportTemplateViolation("stylesheetTokens");
        mutationTrackingDisabled = true;
        originalDescriptor.set.call(this, value);
        mutationTrackingDisabled = false;
      }
    });
  }
  function addLegacyStylesheetTokensShim(tmpl) {
    defineProperty(tmpl, "stylesheetTokens", {
      enumerable: true,
      configurable: true,
      get() {
        const {
          stylesheetToken
        } = this;
        if (isUndefined$1(stylesheetToken)) {
          return stylesheetToken;
        }
        return {
          hostAttribute: `${stylesheetToken}-host`,
          shadowAttribute: stylesheetToken
        };
      },
      set(value) {
        this.stylesheetToken = isUndefined$1(value) ? void 0 : value.shadowAttribute;
      }
    });
  }
  function freezeTemplate(tmpl) {
    if (lwcRuntimeFlags.ENABLE_FROZEN_TEMPLATE) {
      freeze(tmpl);
      if (!isUndefined$1(tmpl.stylesheets)) {
        deepFreeze(tmpl.stylesheets);
      }
    } else {
      addLegacyStylesheetTokensShim(tmpl);
      if (true) {
        trackMutations(tmpl);
      } else {
        onReportingEnabled(() => {
          trackMutations(tmpl);
        });
      }
    }
  }
  function getComponentConstructor(elm) {
    let ctor = null;
    if (!isUndefined$1(elm)) {
      const vm = getAssociatedVMIfPresent(elm);
      if (!isUndefined$1(vm)) {
        ctor = vm.def.ctor;
      }
    }
    return ctor;
  }
  function readonly(obj) {
    if (true) {
      if (arguments.length !== 1) {
        logError("@readonly cannot be used as a decorator just yet, use it as a function with one argument to produce a readonly version of the provided value.");
      }
    }
    return getReadOnlyProxy(obj);
  }
  function getHeaderForCustomElement(ce, componentInstance) {
    return ["div", {}, ["object", {
      object: ce,
      config: {
        skip: true
      }
    }], ["div", {}, ["span", {
      style: "margin: 0 5px; color: red"
    }, "LWC:"], ["object", {
      object: componentInstance
    }]]];
  }
  function getHeaderForComponentInstance(componentInstance, debugInfo) {
    if (keys(debugInfo).length === 0) {
      return null;
    }
    return ["div", {}, ["object", {
      object: componentInstance,
      config: {
        skip: true
      }
    }], ["div", {}, ["span", {
      style: "margin: 0 5px; color: red"
    }, "Debug:"], ["object", {
      object: debugInfo
    }]]];
  }
  const LightningElementFormatter = {
    name: "LightningElementFormatter",
    header(obj, config) {
      const vm = getAssociatedVMIfPresent(obj);
      if (!isUndefined$1(vm) && (isUndefined$1(config) || !config.skip)) {
        if (obj instanceof HTMLElement) {
          return getHeaderForCustomElement(obj, vm.component);
        } else {
          return getHeaderForComponentInstance(obj, vm.debugInfo);
        }
      }
      return null;
    },
    hasBody() {
      return false;
    }
  };
  function init() {
    const devtoolsFormatters = globalThis.devtoolsFormatters || [];
    ArrayPush$1.call(devtoolsFormatters, LightningElementFormatter);
    globalThis.devtoolsFormatters = devtoolsFormatters;
  }
  if (true) {
    init();
  }
  const supportsConstructableStylesheets = isFunction$1(CSSStyleSheet.prototype.replaceSync) && isArray$1(document.adoptedStyleSheets);
  const stylesheetCache = new Map();
  if (false) {
    window.__lwcResetGlobalStylesheets = () => {
      stylesheetCache.clear();
    };
  }
  function createFreshStyleElement(content) {
    const elm = document.createElement("style");
    elm.type = "text/css";
    elm.textContent = content;
    elm.setAttribute("data-rendered-by-lwc", "");
    return elm;
  }
  function createStyleElement(content, cacheData) {
    const {
      element,
      usedElement
    } = cacheData;
    if (usedElement) {
      return element.cloneNode(true);
    }
    cacheData.usedElement = true;
    return element;
  }
  function createConstructableStylesheet(content) {
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(content);
    return stylesheet;
  }
  function insertConstructableStylesheet(content, target, cacheData, signal) {
    const {
      adoptedStyleSheets
    } = target;
    const {
      stylesheet
    } = cacheData;
    adoptedStyleSheets.push(stylesheet);
    if (true) {
      if (isUndefined$1(signal)) {
        throw new Error("Expected AbortSignal to be defined in dev mode");
      }
      signal.addEventListener("abort", () => {
        adoptedStyleSheets.splice(adoptedStyleSheets.indexOf(stylesheet), 1);
        stylesheetCache.delete(content);
      });
    }
  }
  function insertStyleElement(content, target, cacheData, signal) {
    const elm = createStyleElement(content, cacheData);
    target.appendChild(elm);
    if (true) {
      if (isUndefined$1(signal)) {
        throw new Error("Expected AbortSignal to be defined in dev mode");
      }
      signal.addEventListener("abort", () => {
        target.removeChild(elm);
        stylesheetCache.delete(content);
      });
    }
  }
  function getCacheData(content, useConstructableStylesheet) {
    let cacheData = stylesheetCache.get(content);
    if (isUndefined$1(cacheData)) {
      cacheData = {
        stylesheet: void 0,
        element: void 0,
        roots: void 0,
        global: false,
        usedElement: false
      };
      stylesheetCache.set(content, cacheData);
    }
    if (useConstructableStylesheet && isUndefined$1(cacheData.stylesheet)) {
      cacheData.stylesheet = createConstructableStylesheet(content);
    } else if (!useConstructableStylesheet && isUndefined$1(cacheData.element)) {
      cacheData.element = createFreshStyleElement(content);
    }
    return cacheData;
  }
  function insertGlobalStylesheet(content, signal) {
    const cacheData = getCacheData(content, false);
    if (cacheData.global) {
      return;
    }
    cacheData.global = true;
    insertStyleElement(content, document.head, cacheData, signal);
  }
  function insertLocalStylesheet(content, target, signal) {
    const cacheData = getCacheData(content, supportsConstructableStylesheets);
    let {
      roots
    } = cacheData;
    if (isUndefined$1(roots)) {
      roots = cacheData.roots = new WeakSet();
    } else if (roots.has(target)) {
      return;
    }
    roots.add(target);
    if (supportsConstructableStylesheets) {
      insertConstructableStylesheet(content, target, cacheData, signal);
    } else {
      insertStyleElement(content, target, cacheData, signal);
    }
  }
  function insertStylesheet(content, target, signal) {
    if (isUndefined$1(target)) {
      insertGlobalStylesheet(content, signal);
    } else {
      insertLocalStylesheet(content, target, signal);
    }
  }
  const cachedConstructors = new Map();
  const nativeLifecycleElementsToUpgradedByLWC = new WeakMap();
  let elementBeingUpgradedByLWC = false;
  let BaseUpgradableConstructor;
  let BaseHTMLElement;
  function createBaseUpgradableConstructor() {
    BaseUpgradableConstructor = class TheBaseUpgradableConstructor extends HTMLElement {
      constructor(upgradeCallback, useNativeLifecycle) {
        super();
        if (useNativeLifecycle) {
          nativeLifecycleElementsToUpgradedByLWC.set(this, elementBeingUpgradedByLWC);
        }
        if (elementBeingUpgradedByLWC) {
          upgradeCallback(this);
        }
      }
      connectedCallback() {
        if (isTrue(nativeLifecycleElementsToUpgradedByLWC.get(this))) {
          connectRootElement(this);
        }
      }
      disconnectedCallback() {
        if (isTrue(nativeLifecycleElementsToUpgradedByLWC.get(this))) {
          disconnectRootElement(this);
        }
      }
      formAssociatedCallback(form) {
        runFormAssociatedCallback(this, form);
      }
      formDisabledCallback(disabled) {
        runFormDisabledCallback(this, disabled);
      }
      formResetCallback() {
        runFormResetCallback(this);
      }
      formStateRestoreCallback(state, reason) {
        runFormStateRestoreCallback(this, state, reason);
      }
    };
    BaseHTMLElement = HTMLElement;
  }
  const createUpgradableConstructor = (isFormAssociated) => {
    if (HTMLElement !== BaseHTMLElement) {
      createBaseUpgradableConstructor();
    }
    class UpgradableConstructor extends BaseUpgradableConstructor {
    }
    if (isFormAssociated) {
      UpgradableConstructor.formAssociated = isFormAssociated;
    }
    return UpgradableConstructor;
  };
  function getUpgradableConstructor(tagName, isFormAssociated) {
    let UpgradableConstructor = cachedConstructors.get(tagName);
    if (isUndefined$1(UpgradableConstructor)) {
      if (!isUndefined$1(customElements.get(tagName))) {
        throw new Error(`Unexpected tag name "${tagName}". This name is a registered custom element, preventing LWC to upgrade the element.`);
      }
      UpgradableConstructor = createUpgradableConstructor(isFormAssociated);
      customElements.define(tagName, UpgradableConstructor);
      cachedConstructors.set(tagName, UpgradableConstructor);
    }
    return UpgradableConstructor;
  }
  const createCustomElement = (tagName, upgradeCallback, useNativeLifecycle, isFormAssociated) => {
    const UpgradableConstructor = getUpgradableConstructor(tagName, isFormAssociated);
    if (Boolean(UpgradableConstructor.formAssociated) !== isFormAssociated) {
      throw new Error(`<${tagName}> was already registered with formAssociated=${UpgradableConstructor.formAssociated}. It cannot be re-registered with formAssociated=${isFormAssociated}. Please rename your component to have a different name than <${tagName}>`);
    }
    elementBeingUpgradedByLWC = true;
    try {
      return new UpgradableConstructor(upgradeCallback, useNativeLifecycle);
    } finally {
      elementBeingUpgradedByLWC = false;
    }
  };
  function rendererFactory(baseRenderer) {
    const renderer2 = function(exports2) {
      function invariant2(value, msg) {
        if (!value) {
          throw new Error(`Invariant Violation: ${msg}`);
        }
      }
      function isTrue$12(value, msg) {
        if (!value) {
          throw new Error(`Assert Violation: ${msg}`);
        }
      }
      function isFalse$12(value, msg) {
        if (value) {
          throw new Error(`Assert Violation: ${msg}`);
        }
      }
      function fail2(msg) {
        throw new Error(msg);
      }
      var assert2 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        fail: fail2,
        invariant: invariant2,
        isFalse: isFalse$12,
        isTrue: isTrue$12
      });
      function isUndefined2(obj) {
        return obj === void 0;
      }
      function isNull2(obj) {
        return obj === null;
      }
      class WireContextSubscriptionEvent extends CustomEvent {
        constructor(adapterToken, {
          setNewContext,
          setDisconnectedCallback
        }) {
          super(adapterToken, {
            bubbles: true,
            composed: true
          });
          this.setNewContext = setNewContext;
          this.setDisconnectedCallback = setDisconnectedCallback;
        }
      }
      function registerContextConsumer(elm, adapterContextToken, subscriptionPayload) {
        dispatchEvent(elm, new WireContextSubscriptionEvent(adapterContextToken, subscriptionPayload));
      }
      function registerContextProvider2(elm, adapterContextToken, onContextSubscription) {
        addEventListener2(elm, adapterContextToken, (evt) => {
          evt.stopImmediatePropagation();
          const {
            setNewContext,
            setDisconnectedCallback
          } = evt;
          onContextSubscription({
            setNewContext,
            setDisconnectedCallback
          });
        });
      }
      function cloneNode(node, deep) {
        return node.cloneNode(deep);
      }
      function createElement2(tagName, namespace) {
        return isUndefined2(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
      }
      function createText(content) {
        return document.createTextNode(content);
      }
      function createComment(content) {
        return document.createComment(content);
      }
      function createFragment(html) {
        const template = document.createElement("template");
        template.innerHTML = html;
        return template.content.firstChild;
      }
      function insert(node, parent, anchor) {
        parent.insertBefore(node, anchor);
      }
      function remove(node, parent) {
        parent.removeChild(node);
      }
      function nextSibling(node) {
        return node.nextSibling;
      }
      function previousSibling(node) {
        return node.previousSibling;
      }
      function getParentNode(node) {
        return node.parentNode;
      }
      function attachShadow(element, options) {
        if (!isNull2(element.shadowRoot)) {
          return element.shadowRoot;
        }
        return element.attachShadow(options);
      }
      function setText(node, content) {
        node.nodeValue = content;
      }
      function getProperty(node, key) {
        return node[key];
      }
      function setProperty(node, key, value) {
        node[key] = value;
      }
      function getAttribute(element, name, namespace) {
        return isUndefined2(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
      }
      function setAttribute(element, name, value, namespace) {
        return isUndefined2(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
      }
      function removeAttribute(element, name, namespace) {
        if (isUndefined2(namespace)) {
          element.removeAttribute(name);
        } else {
          element.removeAttributeNS(namespace, name);
        }
      }
      function addEventListener2(target, type, callback, options) {
        target.addEventListener(type, callback, options);
      }
      function removeEventListener(target, type, callback, options) {
        target.removeEventListener(type, callback, options);
      }
      function dispatchEvent(target, event) {
        return target.dispatchEvent(event);
      }
      function getClassList(element) {
        return element.classList;
      }
      function setCSSStyleProperty(element, name, value, important) {
        element.style.setProperty(name, value, important ? "important" : "");
      }
      function getBoundingClientRect(element) {
        return element.getBoundingClientRect();
      }
      function querySelector(element, selectors) {
        return element.querySelector(selectors);
      }
      function querySelectorAll2(element, selectors) {
        return element.querySelectorAll(selectors);
      }
      function getElementsByTagName(element, tagNameOrWildCard) {
        return element.getElementsByTagName(tagNameOrWildCard);
      }
      function getElementsByClassName(element, names) {
        return element.getElementsByClassName(names);
      }
      function getChildren(element) {
        return element.children;
      }
      function getChildNodes(element) {
        return element.childNodes;
      }
      function getFirstChild(element) {
        return element.firstChild;
      }
      function getFirstElementChild(element) {
        return element.firstElementChild;
      }
      function getLastChild(element) {
        return element.lastChild;
      }
      function getLastElementChild(element) {
        return element.lastElementChild;
      }
      function isConnected(node) {
        return node.isConnected;
      }
      function assertInstanceOfHTMLElement(elm, msg) {
        assert2.invariant(elm instanceof HTMLElement, msg);
      }
      function ownerDocument(element) {
        return element.ownerDocument;
      }
      function getTagName(elm) {
        return elm.tagName;
      }
      function getStyle(elm) {
        return elm.style;
      }
      function attachInternals(elm) {
        return attachInternalsFunc.call(elm);
      }
      const attachInternalsFunc = typeof ElementInternals !== "undefined" ? HTMLElement.prototype.attachInternals : () => {
        throw new Error("attachInternals API is not supported in this browser environment.");
      };
      exports2.addEventListener = addEventListener2;
      exports2.assertInstanceOfHTMLElement = assertInstanceOfHTMLElement;
      exports2.attachInternals = attachInternals;
      exports2.attachShadow = attachShadow;
      exports2.cloneNode = cloneNode;
      exports2.createComment = createComment;
      exports2.createElement = createElement2;
      exports2.createFragment = createFragment;
      exports2.createText = createText;
      exports2.dispatchEvent = dispatchEvent;
      exports2.getAttribute = getAttribute;
      exports2.getBoundingClientRect = getBoundingClientRect;
      exports2.getChildNodes = getChildNodes;
      exports2.getChildren = getChildren;
      exports2.getClassList = getClassList;
      exports2.getElementsByClassName = getElementsByClassName;
      exports2.getElementsByTagName = getElementsByTagName;
      exports2.getFirstChild = getFirstChild;
      exports2.getFirstElementChild = getFirstElementChild;
      exports2.getLastChild = getLastChild;
      exports2.getLastElementChild = getLastElementChild;
      exports2.getParentNode = getParentNode;
      exports2.getProperty = getProperty;
      exports2.getStyle = getStyle;
      exports2.getTagName = getTagName;
      exports2.insert = insert;
      exports2.isConnected = isConnected;
      exports2.nextSibling = nextSibling;
      exports2.ownerDocument = ownerDocument;
      exports2.previousSibling = previousSibling;
      exports2.querySelector = querySelector;
      exports2.querySelectorAll = querySelectorAll2;
      exports2.registerContextConsumer = registerContextConsumer;
      exports2.registerContextProvider = registerContextProvider2;
      exports2.remove = remove;
      exports2.removeAttribute = removeAttribute;
      exports2.removeEventListener = removeEventListener;
      exports2.setAttribute = setAttribute;
      exports2.setCSSStyleProperty = setCSSStyleProperty;
      exports2.setProperty = setProperty;
      exports2.setText = setText;
      return exports2;
    }({});
    Object.setPrototypeOf(renderer2, baseRenderer);
    return renderer2;
  }
  const startTrackingMutations = noop;
  const stopTrackingMutations = noop;
  const renderer = assign(rendererFactory(null), {
    insertStylesheet,
    createCustomElement,
    defineCustomElement: getUpgradableConstructor,
    isSyntheticShadowDefined: hasOwnProperty$1.call(Element.prototype, KEY__SHADOW_TOKEN),
    startTrackingMutations,
    stopTrackingMutations
  });
  function resetShadowRootAndLightDom(element, Ctor) {
    if (element.shadowRoot) {
      const shadowRoot = element.shadowRoot;
      while (!isNull(shadowRoot.firstChild)) {
        shadowRoot.removeChild(shadowRoot.firstChild);
      }
    }
    if (Ctor.renderMode === "light") {
      while (!isNull(element.firstChild)) {
        element.removeChild(element.firstChild);
      }
    }
  }
  function createVMWithProps(element, Ctor, props) {
    const vm = createVM(element, Ctor, renderer, {
      mode: "open",
      owner: null,
      tagName: element.tagName.toLowerCase(),
      hydrated: true
    });
    for (const [key, value] of Object.entries(props)) {
      element[key] = value;
    }
    return vm;
  }
  function hydrateComponent(element, Ctor, props = {}) {
    if (!(element instanceof Element)) {
      throw new TypeError(`"hydrateComponent" expects a valid DOM element as the first parameter but instead received ${element}.`);
    }
    if (!isFunction$1(Ctor)) {
      throw new TypeError(`"hydrateComponent" expects a valid component constructor as the second parameter but instead received ${Ctor}.`);
    }
    if (!isObject(props) || isNull(props)) {
      throw new TypeError(`"hydrateComponent" expects an object as the third parameter but instead received ${props}.`);
    }
    if (getAssociatedVMIfPresent(element)) {
      console.warn(`"hydrateComponent" expects an element that is not hydrated.`, element);
      return;
    }
    try {
      const {
        defineCustomElement,
        getTagName
      } = renderer;
      const isFormAssociated = shouldBeFormAssociated(Ctor);
      defineCustomElement(StringToLowerCase.call(getTagName(element)), isFormAssociated);
      const vm = createVMWithProps(element, Ctor, props);
      hydrateRoot(vm);
    } catch (e) {
      console.error("Recovering from error while hydrating: ", e);
      resetShadowRootAndLightDom(element, Ctor);
      createVMWithProps(element, Ctor, props);
      connectRootElement(element);
    }
  }
  function deprecatedBuildCustomElementConstructor(Ctor) {
    if (true) {
      console.warn(`Deprecated function called: "buildCustomElementConstructor" function is deprecated and it will be removed.Use "${Ctor.name}.CustomElementConstructor" static property of the component constructor to access the corresponding custom element constructor instead.`);
    }
    return Ctor.CustomElementConstructor;
  }
  function clearNode(node) {
    const childNodes = renderer.getChildNodes(node);
    for (let i2 = childNodes.length - 1; i2 >= 0; i2--) {
      renderer.remove(childNodes[i2], node);
    }
  }
  function buildCustomElementConstructor(Ctor) {
    var _a;
    const HtmlPrototype = getComponentHtmlPrototype(Ctor);
    const {
      observedAttributes
    } = HtmlPrototype;
    const {
      attributeChangedCallback
    } = HtmlPrototype.prototype;
    return _a = class extends HTMLElement {
      constructor() {
        super();
        if (!isNull(this.shadowRoot)) {
          if (true) {
            console.warn(`Found an existing shadow root for the custom element "${Ctor.name}". Call \`hydrateComponent\` instead.`);
          }
          clearNode(this.shadowRoot);
        }
        const {
          shadowMode,
          renderMode
        } = computeShadowAndRenderMode(Ctor, renderer);
        const isNativeShadow = renderMode === 1 && shadowMode === 0;
        if (!isNativeShadow && this.childNodes.length > 0) {
          if (true) {
            console.warn(`Light DOM and synthetic shadow custom elements cannot have child nodes. Ensure the element is empty, including whitespace.`);
          }
          clearNode(this);
        }
        createVM(this, Ctor, renderer, {
          mode: "open",
          owner: null,
          tagName: this.tagName
        });
      }
      connectedCallback() {
        connectRootElement(this);
      }
      disconnectedCallback() {
        disconnectRootElement(this);
      }
      attributeChangedCallback(name, oldValue, newValue) {
        attributeChangedCallback.call(this, name, oldValue, newValue);
      }
      formAssociatedCallback(form) {
        runFormAssociatedCallback(this, form);
      }
      formDisabledCallback(disabled) {
        runFormDisabledCallback(this, disabled);
      }
      formResetCallback() {
        runFormResetCallback(this);
      }
      formStateRestoreCallback(state, reason) {
        runFormStateRestoreCallback(this, state, reason);
      }
    }, _a.observedAttributes = observedAttributes, _a.formAssociated = Boolean(Ctor.formAssociated), _a;
  }
  const _Node$1 = Node;
  const ConnectingSlot = new WeakMap();
  const DisconnectingSlot = new WeakMap();
  function callNodeSlot(node, slot) {
    if (true) {
      assert.isTrue(node, `callNodeSlot() should not be called for a non-object`);
    }
    const fn = slot.get(node);
    if (!isUndefined$1(fn)) {
      fn(node);
    }
    return node;
  }
  let monkeyPatched = false;
  function monkeyPatchDomAPIs() {
    if (monkeyPatched) {
      return;
    }
    monkeyPatched = true;
    const {
      appendChild,
      insertBefore,
      removeChild,
      replaceChild
    } = _Node$1.prototype;
    assign(_Node$1.prototype, {
      appendChild(newChild) {
        const appendedNode = appendChild.call(this, newChild);
        return callNodeSlot(appendedNode, ConnectingSlot);
      },
      insertBefore(newChild, referenceNode) {
        if (arguments.length < 2) {
          console.warn("insertBefore should be called with 2 arguments. Calling with only 1 argument is not supported.");
        }
        const insertedNode = insertBefore.call(this, newChild, referenceNode);
        return callNodeSlot(insertedNode, ConnectingSlot);
      },
      removeChild(oldChild) {
        const removedNode = removeChild.call(this, oldChild);
        return callNodeSlot(removedNode, DisconnectingSlot);
      },
      replaceChild(newChild, oldChild) {
        const replacedNode = replaceChild.call(this, newChild, oldChild);
        callNodeSlot(replacedNode, DisconnectingSlot);
        callNodeSlot(newChild, ConnectingSlot);
        return replacedNode;
      }
    });
  }
  if (true) {
    monkeyPatchDomAPIs();
  }
  function createElement(sel, options) {
    if (!isObject(options) || isNull(options)) {
      throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString$1(options)}".`);
    }
    const Ctor = options.is;
    if (!isFunction$1(Ctor)) {
      throw new TypeError(`"createElement" function expects an "is" option with a valid component constructor.`);
    }
    const {
      createCustomElement: createCustomElement2
    } = renderer;
    const tagName = StringToLowerCase.call(sel);
    const useNativeCustomElementLifecycle = !lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE;
    const isFormAssociated = shouldBeFormAssociated(Ctor);
    const upgradeCallback = (elm) => {
      createVM(elm, Ctor, renderer, {
        tagName,
        mode: options.mode !== "closed" ? "open" : "closed",
        owner: null
      });
      if (!useNativeCustomElementLifecycle) {
        monkeyPatchDomAPIs();
        ConnectingSlot.set(elm, connectRootElement);
        DisconnectingSlot.set(elm, disconnectRootElement);
      }
    };
    return createCustomElement2(tagName, upgradeCallback, useNativeCustomElementLifecycle, isFormAssociated);
  }
  const _Node = Node;
  function isNodeShadowed(node) {
    if (isFalse(node instanceof _Node)) {
      return false;
    }
    if (node instanceof ShadowRoot) {
      return false;
    }
    const rootNode = node.getRootNode();
    if (rootNode instanceof ShadowRoot && isFalse(hasOwnProperty$1.call(getPrototypeOf$1(rootNode), "synthetic"))) {
      return true;
    }
    return renderer.isSyntheticShadowDefined && !isUndefined$1(node[KEY__SHADOW_RESOLVER]);
  }
  const ComponentConstructorToCustomElementConstructorMap = new Map();
  function getCustomElementConstructor(Ctor) {
    if (Ctor === LightningElement) {
      throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
    }
    let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);
    if (isUndefined$1(ce)) {
      ce = buildCustomElementConstructor(Ctor);
      ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
    }
    return ce;
  }
  defineProperty(LightningElement, "CustomElementConstructor", {
    get() {
      return getCustomElementConstructor(this);
    }
  });
  freeze(LightningElement);
  seal(LightningElement.prototype);
  function addEventListener(target, type, callback, options) {
    target.addEventListener(type, callback, options);
  }
  function createContextProvider(adapter) {
    return createContextProviderWithRegister(adapter, registerContextProvider);
  }
  function registerContextProvider(elm, adapterContextToken, onContextSubscription) {
    addEventListener(elm, adapterContextToken, (evt) => {
      evt.stopImmediatePropagation();
      const {
        setNewContext,
        setDisconnectedCallback
      } = evt;
      onContextSubscription({
        setNewContext,
        setDisconnectedCallback
      });
    });
  }
  exports.LightningElement = LightningElement;
  exports.__unstable__ProfilerControl = profilerControl;
  exports.__unstable__ReportingControl = reportingControl;
  exports.api = api$1;
  exports.buildCustomElementConstructor = deprecatedBuildCustomElementConstructor;
  exports.createContextProvider = createContextProvider;
  exports.createElement = createElement;
  exports.freezeTemplate = freezeTemplate;
  exports.getComponentConstructor = getComponentConstructor;
  exports.getComponentDef = getComponentDef;
  exports.hydrateComponent = hydrateComponent;
  exports.isComponentConstructor = isComponentConstructor;
  exports.isNodeFromTemplate = isNodeShadowed;
  exports.parseFragment = parseFragment;
  exports.parseSVGFragment = parseSVGFragment;
  exports.readonly = readonly;
  exports.registerComponent = registerComponent;
  exports.registerDecorators = registerDecorators;
  exports.registerTemplate = registerTemplate;
  exports.renderer = renderer;
  exports.rendererFactory = rendererFactory;
  exports.sanitizeAttribute = sanitizeAttribute;
  exports.setFeatureFlag = setFeatureFlag;
  exports.setFeatureFlagForTest = setFeatureFlagForTest;
  exports.setHooks = setHooks;
  exports.swapComponent = swapComponent;
  exports.swapStyle = swapStyle;
  exports.swapTemplate = swapTemplate;
  exports.track = track;
  exports.unwrap = unwrap;
  exports.wire = wire;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwc", ["exports", "lwc/v/7_1_5"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
