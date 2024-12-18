LWR.define("lwr/lockerDefine/v/0_13_10", ["exports"], function(exports) {
  "use strict";
  /*!
   * Copyright (C) 2019 salesforce.com, inc.
   */
  var _TrustedHTMLCtor$prot$LWS, _TrustedScriptCtor$pr$LWS, _URLCtor$prototype$LWS;
  const {
    apply: ReflectApply$LWS$1,
    construct: ReflectConstruct$LWS,
    defineProperty: ReflectDefineProperty$LWS$1,
    deleteProperty: ReflectDeleteProperty$LWS$1,
    get: ReflectGet$LWS,
    getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor$LWS,
    getPrototypeOf: ReflectGetPrototypeOf$LWS$1,
    has: ReflectHas$LWS,
    isExtensible: ReflectIsExtensible$LWS,
    ownKeys: ReflectOwnKeys$LWS$1,
    preventExtensions: ReflectPreventExtensions$LWS,
    set: ReflectSet$LWS,
    setPrototypeOf: ReflectSetPrototypeOf$LWS$1
  } = Reflect;
  const ObjectCtor$LWS$1 = Object;
  const {
    assign: ObjectAssign$LWS$1,
    freeze: ObjectFreeze$LWS$1,
    defineProperties: ObjectDefineProperties$LWS,
    getOwnPropertyDescriptors: ObjectGetOwnPropertyDescriptors$LWS,
    getOwnPropertySymbols: ObjectGetOwnPropertySymbols$LWS,
    keys: ObjectKeys$LWS$1,
    preventExtensions: ObjectPreventExtensions$LWS,
    prototype: ObjectProto$LWS$1
  } = ObjectCtor$LWS$1;
  const {
    hasOwn: OriginalObjectHasOwn$LWS$1
  } = ObjectCtor$LWS$1;
  const {
    __lookupGetter__: ObjectProtoLookupGetter$LWS$1,
    __lookupSetter__: ObjectProtoLookupSetter$LWS$1,
    hasOwnProperty: ObjectProtoHasOwnProperty$LWS$1
  } = ObjectProto$LWS$1;
  const {
    toString: ObjectProtoToString$LWS$1
  } = ObjectProto$LWS$1;
  function isObject$LWS$1(value$LWS) {
    return typeof value$LWS === "object" && value$LWS !== null;
  }
  function isObjectLike$LWS(value$LWS) {
    return typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function";
  }
  const ObjectHasOwn$LWS$1 = typeof OriginalObjectHasOwn$LWS$1 === "function" ? OriginalObjectHasOwn$LWS$1 : function ObjectHasOwn$LWS2(object$LWS, key$LWS) {
    return ReflectApply$LWS$1(ObjectProtoHasOwnProperty$LWS$1, object$LWS, [key$LWS]);
  };
  function ObjectLookupOwnGetter$LWS$1(object$LWS, key$LWS) {
    return object$LWS === null || object$LWS === void 0 || !ObjectHasOwn$LWS$1(object$LWS, key$LWS) ? void 0 : ReflectApply$LWS$1(ObjectProtoLookupGetter$LWS$1, object$LWS, [key$LWS]);
  }
  function ObjectLookupOwnSetter$LWS(object$LWS, key$LWS) {
    return object$LWS === null || object$LWS === void 0 || !ObjectHasOwn$LWS$1(object$LWS, key$LWS) ? void 0 : ReflectApply$LWS$1(ObjectProtoLookupSetter$LWS$1, object$LWS, [key$LWS]);
  }
  function ObjectLookupOwnValue$LWS(object$LWS, key$LWS) {
    return object$LWS === null || object$LWS === void 0 || !ObjectHasOwn$LWS$1(object$LWS, key$LWS) ? void 0 : object$LWS[key$LWS];
  }
  const SymbolCtor$LWS$1 = Symbol;
  const {
    asyncIterator: SymbolAsyncIterator$LWS,
    for: SymbolFor$LWS$1,
    iterator: SymbolIterator$LWS$1,
    toStringTag: SymbolToStringTag$LWS$1,
    unscopables: SymbolUnscopables$LWS$1
  } = SymbolCtor$LWS$1;
  const {
    toString: SymbolProtoToString$LWS,
    valueOf: SymbolProtoValueOf$LWS
  } = SymbolCtor$LWS$1.prototype;
  const ArrayCtor$LWS$1 = Array;
  const {
    prototype: ArrayProto$LWS$1
  } = ArrayCtor$LWS$1;
  const {
    at: ArrayProtoAt$LWS$1,
    concat: ArrayProtoConcat$LWS$1,
    copyWithin: ArrayProtoCopyWithin$LWS$1,
    entries: ArrayProtoEntries$LWS$1,
    every: ArrayProtoEvery$LWS$1,
    fill: ArrayProtoFill$LWS$1,
    findIndex: ArrayProtoFindIndex$LWS$1,
    flat: ArrayProtoFlat$LWS$1,
    flatMap: ArrayProtoFlatMap$LWS$1,
    forEach: ArrayProtoForEach$LWS$1,
    keys: ArrayProtoKeys$LWS$1,
    lastIndexOf: ArrayProtoLastIndexOf$LWS$1,
    pop: ArrayProtoPop$LWS$1,
    reduce: ArrayProtoReduce$LWS$1,
    reduceRight: ArrayProtoReduceRight$LWS$1,
    reverse: ArrayProtoReverse$LWS$1,
    some: ArrayProtoSome$LWS$1,
    toLocaleString: ArrayProtoToLocaleString$LWS$1,
    values: ArrayProtoValues$LWS$1,
    [SymbolIterator$LWS$1]: ArrayProtoSymbolIterator$LWS$1
  } = ArrayProto$LWS$1;
  const ArrayUnscopables$LWS$1 = ObjectFreeze$LWS$1(ObjectAssign$LWS$1({
    __proto__: null
  }, ArrayProto$LWS$1[SymbolUnscopables$LWS$1]));
  const {
    includes: ArrayProtoIncludes$LWS$1,
    map: ArrayProtoMap$LWS$1,
    splice: ArrayProtoSplice$LWS$1,
    sort: ArrayProtoSort$LWS$1,
    unshift: ArrayProtoUnshift$LWS$1
  } = ArrayProto$LWS$1;
  const {
    filter: ArrayProtoFilter$LWS$1,
    find: ArrayProtoFind$LWS$1,
    indexOf: ArrayProtoIndexOf$LWS$1,
    join: ArrayProtoJoin$LWS$1,
    push: ArrayProtoPush$LWS$1,
    shift: ArrayProtoShift$LWS$1,
    slice: ArrayProtoSlice$LWS$1,
    toString: ArrayProtoToString$LWS$1
  } = ArrayProto$LWS$1;
  const {
    isArray: ArrayIsArray$LWS$1
  } = ArrayCtor$LWS$1;
  function ArrayConcat$LWS(array$LWS, ...args$LWS) {
    const result$LWS = ReflectApply$LWS$1(ArrayProtoSlice$LWS$1, array$LWS, [0]);
    for (let i$LWS = 0, {
      length: length$LWS2
    } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const value$LWS = args$LWS[i$LWS];
      if (ArrayIsArray$LWS$1(value$LWS)) {
        ReflectApply$LWS$1(ArrayProtoPush$LWS$1, result$LWS, value$LWS);
      } else {
        result$LWS[result$LWS.length] = value$LWS;
      }
    }
    return result$LWS;
  }
  function toSafeArray$LWS$1(array$LWS) {
    ReflectSetPrototypeOf$LWS$1(array$LWS, null);
    array$LWS.at = ArrayProtoAt$LWS$1;
    array$LWS.concat = ArrayProtoConcat$LWS$1;
    array$LWS.copyWithin = ArrayProtoCopyWithin$LWS$1;
    array$LWS.entries = ArrayProtoEntries$LWS$1;
    array$LWS.every = ArrayProtoEvery$LWS$1;
    array$LWS.fill = ArrayProtoFill$LWS$1;
    array$LWS.filter = ArrayProtoFilter$LWS$1;
    array$LWS.find = ArrayProtoFind$LWS$1;
    array$LWS.findIndex = ArrayProtoFindIndex$LWS$1;
    array$LWS.flat = ArrayProtoFlat$LWS$1;
    array$LWS.flatMap = ArrayProtoFlatMap$LWS$1;
    array$LWS.forEach = ArrayProtoForEach$LWS$1;
    array$LWS.includes = ArrayProtoIncludes$LWS$1;
    array$LWS.indexOf = ArrayProtoIndexOf$LWS$1;
    array$LWS.join = ArrayProtoJoin$LWS$1;
    array$LWS.keys = ArrayProtoKeys$LWS$1;
    array$LWS.lastIndexOf = ArrayProtoLastIndexOf$LWS$1;
    array$LWS.map = ArrayProtoMap$LWS$1;
    array$LWS.pop = ArrayProtoPop$LWS$1;
    array$LWS.push = ArrayProtoPush$LWS$1;
    array$LWS.reduce = ArrayProtoReduce$LWS$1;
    array$LWS.reduceRight = ArrayProtoReduceRight$LWS$1;
    array$LWS.reverse = ArrayProtoReverse$LWS$1;
    array$LWS.shift = ArrayProtoShift$LWS$1;
    array$LWS.slice = ArrayProtoSlice$LWS$1;
    array$LWS.some = ArrayProtoSome$LWS$1;
    array$LWS.sort = ArrayProtoSort$LWS$1;
    array$LWS.splice = ArrayProtoSplice$LWS$1;
    array$LWS.toLocaleString = ArrayProtoToLocaleString$LWS$1;
    array$LWS.toString = ArrayProtoToString$LWS$1;
    array$LWS.unshift = ArrayProtoUnshift$LWS$1;
    array$LWS.values = ArrayProtoValues$LWS$1;
    array$LWS[SymbolIterator$LWS$1] = ArrayProtoSymbolIterator$LWS$1;
    array$LWS[SymbolUnscopables$LWS$1] = ArrayUnscopables$LWS$1;
    ReflectSetPrototypeOf$LWS$1(array$LWS, ArrayProto$LWS$1);
    return array$LWS;
  }
  const ArrayBufferCtor$LWS = ArrayBuffer;
  const {
    isView: ArrayBufferIsView$LWS
  } = ArrayBufferCtor$LWS;
  const ArrayBufferProtoByteLengthGetter$LWS = ObjectLookupOwnGetter$LWS$1(ArrayBufferCtor$LWS.prototype, "byteLength");
  const SUPPORTS_BIG_INT$LWS = typeof BigInt === "function";
  const BigIntProtoValueOf$LWS = SUPPORTS_BIG_INT$LWS ? BigInt.prototype.valueOf : void 0;
  const {
    valueOf: BooleanProtoValueOf$LWS
  } = Boolean.prototype;
  const LOCKER_IDENTIFIER_MARKER$LWS = "$LWS";
  const LOCKER_UNMINIFIED_FLAG$LWS$1 = `${function LOCKER_UNMINIFIED_FLAG$LWS2() {
    return LOCKER_UNMINIFIED_FLAG$LWS2.name;
  }()}`.includes("LOCKER_UNMINIFIED_FLAG");
  const LOCKER_SERVICE_KEY$LWS = "LSKey";
  const LOCKER_SERVICE_KEY_LOWERED$LWS = "lskey";
  const CHAR_QUOTE_DOUBLE$LWS = '"';
  const CHAR_QUOTE_SINGLE$LWS = "'";
  const UNCOMPILED_LOCATION_NAME$LWS = `uncompiledLocation${LOCKER_IDENTIFIER_MARKER$LWS}`;
  const UNCOMPILED_TOP_NAME$LWS = `uncompiledTop${LOCKER_IDENTIFIER_MARKER$LWS}`;
  const WEBPACK_REQUIRE_NAME$LWS = "__webpack_require__";
  const ERR_ILLEGAL_PROPERTY_ACCESS$LWS = "Illegal property access.";
  const ERR_INVALID_SANDBOX_KEY$LWS = "Invalid sandbox key.";
  const LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS = SymbolFor$LWS$1("@@lockerNearMembraneIsMasked");
  const LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS$1 = SymbolFor$LWS$1("@@lockerNearMembraneSerializedValue");
  const LOCKER_NEAR_MEMBRANE_SYMBOL$LWS$1 = SymbolFor$LWS$1("@@lockerNearMembrane");
  const LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS = SymbolFor$LWS$1("@@lockerNearMembraneUnmaskedValue");
  const SYMBOL_LIVE_OBJECT$LWS = SymbolFor$LWS$1("@@lockerLiveValue");
  const TO_STRING_BRAND_ARRAY$LWS = "[object Array]";
  const TO_STRING_BRAND_ARRAY_BUFFER$LWS = "[object ArrayBuffer]";
  const TO_STRING_BRAND_BIG_INT$LWS$1 = "[object BigInt]";
  const TO_STRING_BRAND_BOOLEAN$LWS$1 = "[object Boolean]";
  const TO_STRING_BRAND_DATE$LWS = "[object Date]";
  const TO_STRING_BRAND_FUNCTION$LWS = "[object Function]";
  const TO_STRING_BRAND_MAP$LWS = "[object Map]";
  const TO_STRING_BRAND_NULL$LWS = "[object Null]";
  const TO_STRING_BRAND_NUMBER$LWS$1 = "[object Number]";
  const TO_STRING_BRAND_OBJECT$LWS = "[object Object]";
  const TO_STRING_BRAND_REG_EXP$LWS = "[object RegExp]";
  const TO_STRING_BRAND_SET$LWS = "[object Set]";
  const TO_STRING_BRAND_STRING$LWS$1 = "[object String]";
  const TO_STRING_BRAND_SYMBOL$LWS$1 = "[object Symbol]";
  const TO_STRING_BRAND_UNDEFINED$LWS = "[object Undefined]";
  const TO_STRING_BRAND_WEAK_MAP$LWS = "[object WeakMap]";
  const TO_STRING_BRAND_WEAK_SET$LWS = "[object WeakSet]";
  const SANDBOX_EVAL_CONTEXT_NAME$LWS = "$lockerEvalContext$";
  const SANDBOX_EVAL_HELPERS_NAME$LWS = "$lockerEvalHelpers$";
  const DateCtor$LWS = Date;
  const {
    now: DateNow$LWS
  } = DateCtor$LWS;
  const {
    valueOf: DateProtoValueOf$LWS
  } = DateCtor$LWS.prototype;
  const ErrorCtor$LWS$1 = Error;
  const TypeErrorCtor$LWS$1 = TypeError;
  class LockerSecurityError$LWS extends Error {
    constructor(message$LWS) {
      super(`Lightning Web Security: ${message$LWS}`);
    }
  }
  const ProxyCtor$LWS = Proxy;
  const {
    revocable: ProxyRevocable$LWS
  } = ProxyCtor$LWS;
  function createRevokedProxy$LWS(object$LWS) {
    const revocable$LWS = ProxyRevocable$LWS(object$LWS, {
      __proto__: null
    });
    revocable$LWS.revoke();
    return revocable$LWS.proxy;
  }
  function isRevokedProxy$LWS(value$LWS) {
    try {
      ArrayIsArray$LWS$1(value$LWS);
      return false;
    } catch (_unused$LWS) {
    }
    return true;
  }
  const {
    bind: FunctionProtoBind$LWS,
    toString: FunctionProtoToString$LWS
  } = Function.prototype;
  function createUnmaskableTraps$LWS(func$LWS) {
    let handshakeUnmaskFlag$LWS = false;
    return {
      defineProperty(target$LWS, key$LWS, desc$LWS) {
        if (key$LWS === LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return ReflectDefineProperty$LWS$1(target$LWS, key$LWS, desc$LWS);
      },
      get(target$LWS, key$LWS, receiver$LWS, handshake$LWS = false) {
        handshakeUnmaskFlag$LWS && (handshakeUnmaskFlag$LWS = handshake$LWS);
        const isUnmaskedSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS;
        if (handshakeUnmaskFlag$LWS) {
          if (isUnmaskedSymbol$LWS) {
            return func$LWS;
          }
        }
        const result$LWS = ReflectGet$LWS(target$LWS, key$LWS, receiver$LWS);
        if (result$LWS !== void 0 && isUnmaskedSymbol$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return result$LWS;
      },
      getOwnPropertyDescriptor(target$LWS, key$LWS) {
        const result$LWS = ReflectGetOwnPropertyDescriptor$LWS(target$LWS, key$LWS);
        if (result$LWS && key$LWS === LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return result$LWS;
      },
      has(target$LWS, key$LWS) {
        const result$LWS = ReflectHas$LWS(target$LWS, key$LWS);
        const isUnmaskedSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS;
        if (result$LWS) {
          handshakeUnmaskFlag$LWS = false;
          if (isUnmaskedSymbol$LWS) {
            throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
          }
        } else {
          handshakeUnmaskFlag$LWS = isUnmaskedSymbol$LWS;
        }
        return result$LWS;
      },
      set(target$LWS, key$LWS, value$LWS, receiver$LWS) {
        if (key$LWS === LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return ReflectSet$LWS(target$LWS, key$LWS, value$LWS, receiver$LWS);
      }
    };
  }
  function getUnmaskedFunction$LWS(func$LWS) {
    const unmasked$LWS = LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS in func$LWS ? void 0 : func$LWS[LOCKER_NEAR_MEMBRANE_UNMASKED_VALUE_SYMBOL$LWS];
    return unmasked$LWS === void 0 ? func$LWS : unmasked$LWS;
  }
  function isMaskedFunction$LWS(value$LWS) {
    return typeof value$LWS === "function" && !(LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS in value$LWS) && value$LWS[LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS] === true;
  }
  function maskFunction$LWS(func$LWS, maskFunc$LWS, trapInvokers$LWS) {
    let applyTrapInvoker$LWS = ReflectApply$LWS$1;
    let constructTrapInvoker$LWS = ReflectConstruct$LWS;
    let definePropertyTrapInvoker$LWS = ReflectDefineProperty$LWS$1;
    let getTrapInvoker$LWS = ReflectGet$LWS;
    let getOwnPropertyDescriptorTrapInvoker$LWS = ReflectGetOwnPropertyDescriptor$LWS;
    let hasTrapInvoker$LWS = ReflectHas$LWS;
    let setTrapInvoker$LWS = ReflectSet$LWS;
    if (trapInvokers$LWS) {
      ({
        apply: applyTrapInvoker$LWS = ReflectApply$LWS$1,
        construct: constructTrapInvoker$LWS = ReflectConstruct$LWS,
        defineProperty: definePropertyTrapInvoker$LWS = ReflectDefineProperty$LWS$1,
        get: getTrapInvoker$LWS = ReflectGet$LWS,
        getOwnPropertyDescriptor: getOwnPropertyDescriptorTrapInvoker$LWS = ReflectGetOwnPropertyDescriptor$LWS,
        has: hasTrapInvoker$LWS = ReflectHas$LWS,
        set: setTrapInvoker$LWS = ReflectSet$LWS
      } = trapInvokers$LWS);
    }
    let handshakeFlag$LWS = false;
    let handshakeProxyMaskedFlag$LWS = false;
    let lastProxyTrapCalled$LWS = 0;
    const proxy$LWS = new ProxyCtor$LWS(maskFunc$LWS, {
      apply(_target$LWS, thisArg$LWS, args$LWS) {
        lastProxyTrapCalled$LWS = 1;
        if (thisArg$LWS === proxy$LWS || thisArg$LWS === maskFunc$LWS) {
          thisArg$LWS = func$LWS;
        }
        return applyTrapInvoker$LWS(func$LWS, thisArg$LWS, args$LWS);
      },
      construct(_target$LWS, args$LWS, newTarget$LWS) {
        lastProxyTrapCalled$LWS = 2;
        if (newTarget$LWS === proxy$LWS || newTarget$LWS === maskFunc$LWS) {
          newTarget$LWS = func$LWS;
        }
        return constructTrapInvoker$LWS(func$LWS, args$LWS, newTarget$LWS);
      },
      defineProperty(target$LWS, key$LWS, desc$LWS) {
        lastProxyTrapCalled$LWS = 4;
        if (key$LWS === LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return definePropertyTrapInvoker$LWS(target$LWS, key$LWS, desc$LWS);
      },
      deleteProperty(target$LWS, key$LWS) {
        lastProxyTrapCalled$LWS = 32;
        return ReflectDeleteProperty$LWS$1(target$LWS, key$LWS);
      },
      get(target$LWS, key$LWS, receiver$LWS) {
        handshakeFlag$LWS && (handshakeFlag$LWS = lastProxyTrapCalled$LWS === 128);
        handshakeProxyMaskedFlag$LWS && (handshakeProxyMaskedFlag$LWS = handshakeFlag$LWS);
        lastProxyTrapCalled$LWS = 16;
        const isProxyMaskedSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS;
        if (handshakeProxyMaskedFlag$LWS) {
          if (isProxyMaskedSymbol$LWS) {
            return true;
          }
        }
        const result$LWS = getTrapInvoker$LWS(target$LWS, key$LWS, receiver$LWS, handshakeFlag$LWS);
        if (result$LWS !== void 0 && isProxyMaskedSymbol$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return result$LWS;
      },
      getOwnPropertyDescriptor(target$LWS, key$LWS) {
        lastProxyTrapCalled$LWS = 32;
        const result$LWS = getOwnPropertyDescriptorTrapInvoker$LWS(target$LWS, key$LWS);
        if (result$LWS && key$LWS === LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return result$LWS;
      },
      getPrototypeOf(target$LWS) {
        lastProxyTrapCalled$LWS = 64;
        return ReflectGetPrototypeOf$LWS$1(target$LWS);
      },
      has(target$LWS, key$LWS) {
        lastProxyTrapCalled$LWS = 128;
        const result$LWS = hasTrapInvoker$LWS(target$LWS, key$LWS);
        const isProxyMaskedSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS;
        if (result$LWS) {
          handshakeFlag$LWS = false;
          if (isProxyMaskedSymbol$LWS) {
            throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
          }
        } else {
          handshakeFlag$LWS = true;
          handshakeProxyMaskedFlag$LWS = isProxyMaskedSymbol$LWS;
        }
        return result$LWS;
      },
      isExtensible(target$LWS) {
        lastProxyTrapCalled$LWS = 256;
        return ReflectIsExtensible$LWS(target$LWS);
      },
      ownKeys(target$LWS) {
        lastProxyTrapCalled$LWS = 512;
        return ReflectOwnKeys$LWS$1(target$LWS);
      },
      preventExtensions(target$LWS) {
        lastProxyTrapCalled$LWS = 1024;
        return ReflectPreventExtensions$LWS(target$LWS);
      },
      set(target$LWS, key$LWS, value$LWS, receiver$LWS) {
        lastProxyTrapCalled$LWS = 2048;
        if (key$LWS === LOCKER_NEAR_MEMBRANE_IS_MASKED_SYMBOL$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_PROPERTY_ACCESS$LWS);
        }
        return setTrapInvoker$LWS(target$LWS, key$LWS, value$LWS, receiver$LWS);
      },
      setPrototypeOf(target$LWS, proto$LWS) {
        lastProxyTrapCalled$LWS = 4096;
        return ReflectSetPrototypeOf$LWS$1(target$LWS, proto$LWS);
      }
    });
    return proxy$LWS;
  }
  function noop$LWS$1() {
  }
  const MapCtor$LWS$1 = Map;
  const {
    prototype: MapProto$LWS$1
  } = MapCtor$LWS$1;
  const {
    clear: MapProtoClear$LWS$1,
    delete: MapProtoDelete$LWS$1,
    forEach: MapProtoForEach$LWS$1,
    get: MapProtoGet$LWS$1,
    has: MapProtoHas$LWS$1,
    keys: MapProtoKeys$LWS$1,
    values: MapProtoValues$LWS$1,
    [SymbolIterator$LWS$1]: MapProtoSymbolIterator$LWS$1,
    [SymbolToStringTag$LWS$1]: MapProtoSymbolToStringTag$LWS$1
  } = MapProto$LWS$1;
  const {
    entries: MapProtoEntries$LWS$1,
    set: MapProtoSet$LWS$1
  } = MapProto$LWS$1;
  const MapProtoSizeGetter$LWS$1 = ObjectLookupOwnGetter$LWS$1(MapProto$LWS$1, "size");
  function toSafeMap$LWS$1(map$LWS) {
    ReflectSetPrototypeOf$LWS$1(map$LWS, null);
    map$LWS.clear = MapProtoClear$LWS$1;
    map$LWS.delete = MapProtoDelete$LWS$1;
    map$LWS.entries = MapProtoEntries$LWS$1;
    map$LWS.forEach = MapProtoForEach$LWS$1;
    map$LWS.get = MapProtoGet$LWS$1;
    map$LWS.has = MapProtoHas$LWS$1;
    map$LWS.keys = MapProtoKeys$LWS$1;
    map$LWS.set = MapProtoSet$LWS$1;
    ReflectDefineProperty$LWS$1(map$LWS, "size", {
      __proto__: null,
      configurable: true,
      enumerable: true,
      get: MapProtoSizeGetter$LWS$1,
      set: void 0
    });
    map$LWS.values = MapProtoValues$LWS$1;
    map$LWS[SymbolIterator$LWS$1] = MapProtoSymbolIterator$LWS$1;
    map$LWS[SymbolToStringTag$LWS$1] = MapProtoSymbolToStringTag$LWS$1;
    ReflectSetPrototypeOf$LWS$1(map$LWS, MapProto$LWS$1);
    return map$LWS;
  }
  const NumberCtor$LWS$1 = Number;
  const {
    isFinite: NumberIsFinite$LWS$1,
    isInteger: NumberIsInteger$LWS$1,
    isNaN: NumberIsNaN$LWS$1
  } = NumberCtor$LWS$1;
  const {
    toFixed: NumberProtoToFixed$LWS,
    valueOf: NumberProtoValueOf$LWS
  } = NumberCtor$LWS$1.prototype;
  const StringCtor$LWS$1 = String;
  const {
    prototype: StringProto$LWS$1
  } = StringCtor$LWS$1;
  const {
    charAt: StringProtoCharAt$LWS,
    charCodeAt: StringProtoCharCodeAt$LWS,
    endsWith: StringProtoEndsWith$LWS,
    includes: StringProtoIncludes$LWS,
    indexOf: StringProtoIndexOf$LWS,
    lastIndexOf: StringProtoLastIndexOf$LWS,
    match: StringProtoMatch$LWS,
    replace: StringProtoReplace$LWS,
    slice: StringProtoSlice$LWS$1,
    split: StringProtoSplit$LWS,
    startsWith: StringProtoStartsWith$LWS,
    substring: StringProtoSubstring$LWS,
    toLowerCase: StringProtoToLowerCase$LWS,
    toUpperCase: StringProtoToUpperCase$LWS,
    valueOf: StringProtoValueOf$LWS$1
  } = StringProto$LWS$1;
  const quoteCharRegExpRegistry$LWS = {
    __proto__: null,
    [CHAR_QUOTE_DOUBLE$LWS]: /\\?"/g,
    [CHAR_QUOTE_SINGLE$LWS]: /\\?'/g
  };
  const TrustedHTMLCtor$LWS = typeof TrustedHTML === "function" ? TrustedHTML : void 0;
  const TrustedHTMLProtoToString$LWS = TrustedHTMLCtor$LWS == null || (_TrustedHTMLCtor$prot$LWS = TrustedHTMLCtor$LWS.prototype) == null ? void 0 : _TrustedHTMLCtor$prot$LWS.toString;
  const TrustedScriptCtor$LWS = typeof TrustedScript === "function" ? TrustedScript : void 0;
  const TrustedScriptProtoToString$LWS = TrustedScriptCtor$LWS == null || (_TrustedScriptCtor$pr$LWS = TrustedScriptCtor$LWS.prototype) == null ? void 0 : _TrustedScriptCtor$pr$LWS.toString;
  const URLCtor$LWS = typeof URL === "function" ? URL : void 0;
  const URLProtoToString$LWS = URLCtor$LWS == null || (_URLCtor$prototype$LWS = URLCtor$LWS.prototype) == null ? void 0 : _URLCtor$prototype$LWS.toString;
  const funcBodyRegExp$LWS = /^[\s\S]+?\{[\t ]*(?:\r?\n)?([\s\S]*?)(?:\r?\n)?[\t ]*\}$|[\s\S]+?=>\s*([\s\S]+?)\s*$/;
  function capitalizeFirstChar$LWS(string$LWS) {
    const {
      length: length$LWS2
    } = string$LWS;
    if (length$LWS2) {
      const upper$LWS = ReflectApply$LWS$1(StringProtoToUpperCase$LWS, string$LWS[0], []);
      return length$LWS2 === 1 ? upper$LWS : upper$LWS + ReflectApply$LWS$1(StringProtoSlice$LWS$1, string$LWS, [1]);
    }
    return "";
  }
  function enquote$LWS(string$LWS, quoteChar$LWS = CHAR_QUOTE_SINGLE$LWS) {
    return quoteChar$LWS + ReflectApply$LWS$1(StringProtoReplace$LWS, string$LWS, [quoteCharRegExpRegistry$LWS[quoteChar$LWS], `\\${quoteChar$LWS}`]) + quoteChar$LWS;
  }
  function extractFunctionBodySource$LWS(func$LWS) {
    var _ref$LWS, _match$$LWS;
    const source$LWS = ReflectApply$LWS$1(FunctionProtoToString$LWS, func$LWS, []);
    const match$LWS = ReflectApply$LWS$1(StringProtoMatch$LWS, source$LWS, [funcBodyRegExp$LWS]);
    return (_ref$LWS = (_match$$LWS = match$LWS == null ? void 0 : match$LWS[1]) != null ? _match$$LWS : match$LWS == null ? void 0 : match$LWS[2]) != null ? _ref$LWS : "";
  }
  function isConvertibleToString$LWS(value$LWS) {
    if (typeof value$LWS !== "symbol") {
      try {
        return `${value$LWS}` !== void 0;
      } catch (_unused2$LWS) {
      }
    }
    return false;
  }
  function toString$LWS(value$LWS) {
    return typeof value$LWS === "string" ? value$LWS : `${value$LWS}`;
  }
  function toSafeTemplateStringValue$LWS(value$LWS) {
    if (typeof value$LWS === "string") {
      return value$LWS;
    }
    try {
      if (typeof value$LWS === "function") {
        return ReflectApply$LWS$1(FunctionProtoToString$LWS, value$LWS, []);
      }
      if (typeof value$LWS === "object" && value$LWS !== null) {
        if (TrustedHTMLCtor$LWS && value$LWS instanceof TrustedHTMLCtor$LWS) {
          return ReflectApply$LWS$1(TrustedHTMLProtoToString$LWS, value$LWS, []);
        }
        if (TrustedScriptCtor$LWS && value$LWS instanceof TrustedScriptCtor$LWS) {
          return ReflectApply$LWS$1(TrustedScriptProtoToString$LWS, value$LWS, []);
        }
        if (URLCtor$LWS && value$LWS instanceof URLCtor$LWS) {
          return ReflectApply$LWS$1(URLProtoToString$LWS, value$LWS, []);
        }
        const result$LWS = ReflectApply$LWS$1(ObjectProtoToString$LWS$1, value$LWS, []);
        return result$LWS === TO_STRING_BRAND_SYMBOL$LWS$1 ? ReflectApply$LWS$1(SymbolProtoToString$LWS, value$LWS, []) : result$LWS;
      }
      if (typeof value$LWS === "symbol") {
        return ReflectApply$LWS$1(SymbolProtoToString$LWS, value$LWS, []);
      }
      return StringCtor$LWS$1(value$LWS);
    } catch (_unused3$LWS) {
    }
    return "[object Unknown]";
  }
  const RegExpCtor$LWS$1 = RegExp;
  const {
    prototype: RegExpProto$LWS$1
  } = RegExpCtor$LWS$1;
  const {
    exec: RegExpProtoExec$LWS,
    test: RegExpProtoTest$LWS$1
  } = RegExpProto$LWS$1;
  const RegExpProtoSourceGetter$LWS = ObjectLookupOwnGetter$LWS$1(RegExpProto$LWS$1, "source");
  const endsWithWordCharRegExp$LWS = /\w$/;
  const specialCharRegExp$LWS = /[\\^$.*+?()[\]{}|]/g;
  const startsWithWordCharRegExp$LWS = /^\w/;
  function toRegExpEscapedIdentifierName$LWS(identifier$LWS) {
    return (startsWithWordCharRegExp$LWS.test(identifier$LWS) ? "\\b" : "") + toRegExpEscapedString$LWS(identifier$LWS) + (endsWithWordCharRegExp$LWS.test(identifier$LWS) ? "\\b" : "");
  }
  function toRegExpEscapedString$LWS(string$LWS) {
    return ReflectApply$LWS$1(StringProtoReplace$LWS, string$LWS, [specialCharRegExp$LWS, "\\$&"]);
  }
  const SetCtor$LWS$1 = Set;
  const {
    prototype: SetProto$LWS$1
  } = SetCtor$LWS$1;
  const {
    clear: SetProtoClear$LWS,
    delete: SetProtoDelete$LWS,
    entries: SetProtoEntries$LWS,
    forEach: SetProtoForEach$LWS,
    has: SetProtoHas$LWS$1,
    keys: SetProtoKeys$LWS,
    [SymbolIterator$LWS$1]: SetProtoSymbolIterator$LWS,
    [SymbolToStringTag$LWS$1]: SetProtoSymbolToStringTag$LWS
  } = SetProto$LWS$1;
  const {
    add: SetProtoAdd$LWS$1,
    values: SetProtoValues$LWS$1
  } = SetProto$LWS$1;
  const SetProtoSizeGetter$LWS = ObjectLookupOwnGetter$LWS$1(SetProto$LWS$1, "size");
  function toSafeSet$LWS(set$LWS) {
    ReflectSetPrototypeOf$LWS$1(set$LWS, null);
    set$LWS.add = SetProtoAdd$LWS$1;
    set$LWS.clear = SetProtoClear$LWS;
    set$LWS.delete = SetProtoDelete$LWS;
    set$LWS.entries = SetProtoEntries$LWS;
    set$LWS.forEach = SetProtoForEach$LWS;
    set$LWS.has = SetProtoHas$LWS$1;
    set$LWS.keys = SetProtoKeys$LWS;
    ReflectDefineProperty$LWS$1(set$LWS, "size", {
      __proto__: null,
      configurable: true,
      enumerable: true,
      get: SetProtoSizeGetter$LWS,
      set: void 0
    });
    set$LWS.values = SetProtoValues$LWS$1;
    set$LWS[SymbolIterator$LWS$1] = SetProtoSymbolIterator$LWS;
    set$LWS[SymbolToStringTag$LWS$1] = SetProtoSymbolToStringTag$LWS;
    ReflectSetPrototypeOf$LWS$1(set$LWS, SetProto$LWS$1);
    return set$LWS;
  }
  const WeakMapCtor$LWS$1 = WeakMap;
  const {
    prototype: WeakMapProto$LWS$1
  } = WeakMapCtor$LWS$1;
  const {
    has: WeakMapProtoHas$LWS$1
  } = WeakMapProto$LWS$1;
  const {
    delete: WeakMapProtoDelete$LWS$1,
    get: WeakMapProtoGet$LWS$1,
    set: WeakMapProtoSet$LWS$1,
    [SymbolToStringTag$LWS$1]: WeakMapProtoSymbolToStringTag$LWS$1
  } = WeakMapProto$LWS$1;
  function toSafeWeakMap$LWS$1(weakMap$LWS) {
    ReflectSetPrototypeOf$LWS$1(weakMap$LWS, null);
    weakMap$LWS.delete = WeakMapProtoDelete$LWS$1;
    weakMap$LWS.get = WeakMapProtoGet$LWS$1;
    weakMap$LWS.has = WeakMapProtoHas$LWS$1;
    weakMap$LWS.set = WeakMapProtoSet$LWS$1;
    weakMap$LWS[SymbolToStringTag$LWS$1] = WeakMapProtoSymbolToStringTag$LWS$1;
    ReflectSetPrototypeOf$LWS$1(weakMap$LWS, WeakMapProto$LWS$1);
    return weakMap$LWS;
  }
  const WeakSetCtor$LWS$1 = WeakSet;
  const {
    prototype: WeakSetProto$LWS$1
  } = WeakSetCtor$LWS$1;
  const {
    has: WeakSetProtoHas$LWS$1
  } = WeakSetProto$LWS$1;
  const {
    add: WeakSetProtoAdd$LWS$1,
    delete: WeakSetProtoDelete$LWS$1,
    [SymbolToStringTag$LWS$1]: WeakSetProtoSymbolToStringTag$LWS$1
  } = WeakSetProto$LWS$1;
  function toSafeWeakSet$LWS$1(weakSet$LWS) {
    ReflectSetPrototypeOf$LWS$1(weakSet$LWS, null);
    weakSet$LWS.add = WeakSetProtoAdd$LWS$1;
    weakSet$LWS.delete = WeakSetProtoDelete$LWS$1;
    weakSet$LWS.has = WeakSetProtoHas$LWS$1;
    weakSet$LWS[SymbolToStringTag$LWS$1] = WeakSetProtoSymbolToStringTag$LWS$1;
    ReflectSetPrototypeOf$LWS$1(weakSet$LWS, WeakSetProto$LWS$1);
    return weakSet$LWS;
  }
  const {
    toStringTag: TO_STRING_TAG_SYMBOL$LWS
  } = Symbol;
  const expressionCharRegExp$LWS = /[(`.[+\-/*%<>=,?^&]/;
  const lineBreakRegExp$LWS = /\r\n?|\n|\u2028|\u2029/;
  const skipWhiteSpacesRegExp$LWS = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
  const stringLiteralRegExp$LWS = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
  function getBrandByTrialAndError$LWS(value$LWS) {
    try {
      if ("byteLength" in value$LWS) {
        ReflectApply$LWS$1(ArrayBufferProtoByteLengthGetter$LWS, value$LWS, []);
        return TO_STRING_BRAND_ARRAY_BUFFER$LWS;
      }
    } catch (_unused4$LWS) {
    }
    try {
      if ("toLocaleDateString" in value$LWS) {
        ReflectApply$LWS$1(DateProtoValueOf$LWS, value$LWS, []);
        return TO_STRING_BRAND_DATE$LWS;
      }
    } catch (_unused5$LWS) {
    }
    try {
      if ("get" in value$LWS && "size" in value$LWS) {
        ReflectApply$LWS$1(MapProtoSizeGetter$LWS$1, value$LWS, []);
        return TO_STRING_BRAND_MAP$LWS;
      }
    } catch (_unused6$LWS) {
    }
    try {
      if ("add" in value$LWS && "size" in value$LWS) {
        ReflectApply$LWS$1(SetProtoSizeGetter$LWS, value$LWS, []);
        return TO_STRING_BRAND_SET$LWS;
      }
    } catch (_unused7$LWS) {
    }
    try {
      if ("get" in value$LWS && !("size" in value$LWS)) {
        ReflectApply$LWS$1(WeakMapProtoHas$LWS$1, value$LWS, []);
        return TO_STRING_BRAND_WEAK_MAP$LWS;
      }
    } catch (_unused8$LWS) {
    }
    try {
      if ("add" in value$LWS && !("size" in value$LWS)) {
        ReflectApply$LWS$1(WeakSetProtoHas$LWS$1, value$LWS, []);
        return TO_STRING_BRAND_WEAK_SET$LWS;
      }
    } catch (_unused9$LWS) {
    }
    try {
      if ("toPrecision" in value$LWS) {
        ReflectApply$LWS$1(NumberProtoValueOf$LWS, value$LWS, []);
        return TO_STRING_BRAND_NUMBER$LWS$1;
      }
    } catch (_unused10$LWS) {
    }
    try {
      if ("description" in value$LWS) {
        ReflectApply$LWS$1(SymbolProtoValueOf$LWS, value$LWS, []);
        return TO_STRING_BRAND_SYMBOL$LWS$1;
      }
    } catch (_unused11$LWS) {
    }
    try {
      if (ObjectHasOwn$LWS$1(value$LWS, "lastIndex")) {
        ReflectApply$LWS$1(RegExpProtoSourceGetter$LWS, value$LWS, []);
        return TO_STRING_BRAND_REG_EXP$LWS;
      }
    } catch (_unused12$LWS) {
    }
    try {
      if (ObjectHasOwn$LWS$1(value$LWS, "length")) {
        ReflectApply$LWS$1(StringProtoValueOf$LWS$1, value$LWS, []);
        return TO_STRING_BRAND_STRING$LWS$1;
      }
    } catch (_unused13$LWS) {
    }
    try {
      ReflectApply$LWS$1(BooleanProtoValueOf$LWS, value$LWS, []);
      return TO_STRING_BRAND_BOOLEAN$LWS$1;
    } catch (_unused14$LWS) {
    }
    if (SUPPORTS_BIG_INT$LWS) {
      try {
        ReflectApply$LWS$1(BigIntProtoValueOf$LWS, value$LWS, []);
        return TO_STRING_BRAND_BIG_INT$LWS$1;
      } catch (_unused15$LWS) {
      }
    }
    return TO_STRING_BRAND_OBJECT$LWS;
  }
  function getBrand$LWS(value$LWS) {
    if (value$LWS === null) {
      return TO_STRING_BRAND_NULL$LWS;
    }
    if (value$LWS === void 0) {
      return TO_STRING_BRAND_UNDEFINED$LWS;
    }
    switch (typeof value$LWS) {
      case "bigint":
        return TO_STRING_BRAND_BIG_INT$LWS$1;
      case "boolean":
        return TO_STRING_BRAND_BOOLEAN$LWS$1;
      case "function":
        return TO_STRING_BRAND_FUNCTION$LWS;
      case "number":
        return TO_STRING_BRAND_NUMBER$LWS$1;
      case "string":
        return TO_STRING_BRAND_STRING$LWS$1;
      case "symbol":
        return TO_STRING_BRAND_SYMBOL$LWS$1;
    }
    if (ArrayIsArray$LWS$1(value$LWS)) {
      return TO_STRING_BRAND_ARRAY$LWS;
    }
    return TO_STRING_TAG_SYMBOL$LWS in value$LWS ? getBrandByTrialAndError$LWS(value$LWS) : ReflectApply$LWS$1(ObjectProtoToString$LWS$1, value$LWS, []);
  }
  typeof performance === "undefined" ? DateNow$LWS : ReflectApply$LWS$1(FunctionProtoBind$LWS, performance.now, [performance]);
  function indexOfPragma$LWS(source$LWS, pragma$LWS) {
    let pos$LWS = 0;
    while (true) {
      skipWhiteSpacesRegExp$LWS.lastIndex = pos$LWS;
      pos$LWS += ReflectApply$LWS$1(RegExpProtoExec$LWS, skipWhiteSpacesRegExp$LWS, [source$LWS])[0].length;
      const stringLiteralMatch$LWS = ReflectApply$LWS$1(RegExpProtoExec$LWS, stringLiteralRegExp$LWS, [ReflectApply$LWS$1(StringProtoSlice$LWS$1, source$LWS, [pos$LWS])]);
      if (stringLiteralMatch$LWS === null) {
        return -1;
      }
      if ((stringLiteralMatch$LWS[1] || stringLiteralMatch$LWS[2]) === pragma$LWS) {
        skipWhiteSpacesRegExp$LWS.lastIndex = pos$LWS + stringLiteralMatch$LWS[0].length;
        const spaceAfterMatch$LWS = ReflectApply$LWS$1(RegExpProtoExec$LWS, skipWhiteSpacesRegExp$LWS, [source$LWS]);
        const end$LWS = spaceAfterMatch$LWS.index + spaceAfterMatch$LWS[0].length;
        const nextChar$LWS = source$LWS[end$LWS];
        if (nextChar$LWS === ";" || nextChar$LWS === "}") {
          return pos$LWS;
        }
        const indexAfterNext$LWS = end$LWS + 1;
        if (ReflectApply$LWS$1(RegExpProtoTest$LWS$1, lineBreakRegExp$LWS, [spaceAfterMatch$LWS[0]]) && !(nextChar$LWS === "!" && indexAfterNext$LWS < source$LWS.length && source$LWS[indexAfterNext$LWS] === "=" || ReflectApply$LWS$1(RegExpProtoTest$LWS$1, expressionCharRegExp$LWS, [nextChar$LWS]))) {
          return pos$LWS;
        }
      }
      pos$LWS += stringLiteralMatch$LWS[0].length;
      skipWhiteSpacesRegExp$LWS.lastIndex = pos$LWS;
      pos$LWS += ReflectApply$LWS$1(RegExpProtoExec$LWS, skipWhiteSpacesRegExp$LWS, [source$LWS])[0].length;
      if (source$LWS[pos$LWS] === ";") {
        pos$LWS += 1;
      }
    }
  }
  const {
    parse: JSONParse$LWS
  } = JSON;
  function getNearMembraneProxySerializedValue$LWS$1(object$LWS) {
    if (typeof object$LWS === "object" && object$LWS !== null || typeof object$LWS === "function") {
      return LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS$1 in object$LWS ? void 0 : object$LWS[LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS$1];
    }
    return void 0;
  }
  function isNearMembraneProxy$LWS$1(value$LWS) {
    if (typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function") {
      return !(LOCKER_NEAR_MEMBRANE_SYMBOL$LWS$1 in value$LWS) && value$LWS[LOCKER_NEAR_MEMBRANE_SYMBOL$LWS$1] === true;
    }
    return false;
  }
  const SEEN_OBJECTS$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
  function cloneBoxedPrimitive$LWS(object$LWS) {
    return ObjectCtor$LWS$1(getNearMembraneProxySerializedValue$LWS$1(object$LWS));
  }
  function cloneMap$LWS(map$LWS, queue$LWS2) {
    const clone$LWS = new MapCtor$LWS$1();
    const entriesIterable$LWS = ReflectApply$LWS$1(MapProtoEntries$LWS$1, map$LWS, []);
    let {
      length: queueOffset$LWS
    } = queue$LWS2;
    while (true) {
      const {
        done: done$LWS,
        value: subKeyValuePair$LWS
      } = entriesIterable$LWS.next();
      if (done$LWS) {
        break;
      }
      const {
        0: subKey$LWS,
        1: subValue$LWS
      } = subKeyValuePair$LWS;
      let subCloneKey$LWS;
      queue$LWS2[queueOffset$LWS++] = [(subClone$LWS) => {
        subCloneKey$LWS = subClone$LWS;
      }, subKey$LWS];
      queue$LWS2[queueOffset$LWS++] = [(subCloneValue$LWS) => {
        ReflectApply$LWS$1(MapProtoSet$LWS$1, clone$LWS, [subCloneKey$LWS, subCloneValue$LWS]);
      }, subValue$LWS];
    }
    return clone$LWS;
  }
  function cloneRegExp$LWS(regexp$LWS) {
    const {
      flags: flags$LWS,
      source: source$LWS
    } = JSONParse$LWS(getNearMembraneProxySerializedValue$LWS$1(regexp$LWS));
    return new RegExpCtor$LWS$1(source$LWS, flags$LWS);
  }
  function cloneSet$LWS(set$LWS, queue$LWS2) {
    const clone$LWS = new SetCtor$LWS$1();
    const valuesIterable$LWS = ReflectApply$LWS$1(SetProtoValues$LWS$1, set$LWS, []);
    let {
      length: queueOffset$LWS
    } = queue$LWS2;
    while (true) {
      const {
        done: done$LWS,
        value: subValue$LWS
      } = valuesIterable$LWS.next();
      if (done$LWS) {
        break;
      }
      queue$LWS2[queueOffset$LWS++] = [(subCloneValue$LWS) => {
        ReflectApply$LWS$1(SetProtoAdd$LWS$1, clone$LWS, [subCloneValue$LWS]);
      }, subValue$LWS];
    }
    return clone$LWS;
  }
  function enqueue$LWS(queue$LWS2, originalValue$LWS, cloneValue$LWS) {
    const keys$LWS = ObjectKeys$LWS$1(originalValue$LWS);
    let {
      length: queueOffset$LWS
    } = queue$LWS2;
    for (let i$LWS = 0, {
      length: length$LWS2
    } = keys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const key$LWS = keys$LWS[i$LWS];
      const subValue$LWS = originalValue$LWS[key$LWS];
      queue$LWS2[queueOffset$LWS++] = [(subCloneValue$LWS) => {
        cloneValue$LWS[key$LWS] = subCloneValue$LWS;
      }, subValue$LWS];
    }
  }
  function partialStructuredCloneInternal$LWS(value$LWS) {
    let result$LWS;
    const queue$LWS2 = [[(subClone$LWS) => {
      result$LWS = subClone$LWS;
    }, value$LWS]];
    queueLoop:
      while (queue$LWS2.length) {
        const {
          0: setter$LWS,
          1: originalValue$LWS
        } = ReflectApply$LWS$1(ArrayProtoShift$LWS$1, queue$LWS2, []);
        if (originalValue$LWS === null || originalValue$LWS === void 0 || typeof originalValue$LWS === "boolean" || typeof originalValue$LWS === "number" || typeof originalValue$LWS === "string" || typeof originalValue$LWS === "bigint") {
          setter$LWS(originalValue$LWS);
          continue queueLoop;
        }
        if (typeof originalValue$LWS === "symbol") {
          setter$LWS(originalValue$LWS);
          break queueLoop;
        }
        let cloneValue$LWS = SEEN_OBJECTS$LWS.get(originalValue$LWS);
        if (cloneValue$LWS) {
          setter$LWS(cloneValue$LWS);
          continue queueLoop;
        }
        const brand$LWS = getBrand$LWS(originalValue$LWS);
        switch (brand$LWS) {
          case TO_STRING_BRAND_OBJECT$LWS: {
            const proto$LWS = ReflectGetPrototypeOf$LWS$1(originalValue$LWS);
            if (proto$LWS === ObjectProto$LWS$1 || proto$LWS === null || ReflectGetPrototypeOf$LWS$1(proto$LWS) === null) {
              cloneValue$LWS = {};
              enqueue$LWS(queue$LWS2, originalValue$LWS, cloneValue$LWS);
            }
            break;
          }
          case TO_STRING_BRAND_ARRAY$LWS:
            cloneValue$LWS = ArrayCtor$LWS$1(originalValue$LWS.length);
            enqueue$LWS(queue$LWS2, originalValue$LWS, cloneValue$LWS);
            break;
          case TO_STRING_BRAND_MAP$LWS:
            cloneValue$LWS = cloneMap$LWS(originalValue$LWS, queue$LWS2);
            break;
          case TO_STRING_BRAND_SET$LWS:
            cloneValue$LWS = cloneSet$LWS(originalValue$LWS, queue$LWS2);
            break;
        }
        if (cloneValue$LWS === void 0) {
          if (!isNearMembraneProxy$LWS$1(originalValue$LWS)) {
            SEEN_OBJECTS$LWS.set(originalValue$LWS, originalValue$LWS);
            setter$LWS(originalValue$LWS);
            continue queueLoop;
          }
          switch (brand$LWS) {
            case TO_STRING_BRAND_REG_EXP$LWS:
              cloneValue$LWS = cloneRegExp$LWS(originalValue$LWS);
              break;
            case TO_STRING_BRAND_BOOLEAN$LWS$1:
            case TO_STRING_BRAND_NUMBER$LWS$1:
            case TO_STRING_BRAND_BIG_INT$LWS$1:
            case TO_STRING_BRAND_STRING$LWS$1:
              cloneValue$LWS = cloneBoxedPrimitive$LWS(originalValue$LWS);
              break;
          }
        }
        if (cloneValue$LWS === void 0) {
          setter$LWS(originalValue$LWS);
          break queueLoop;
        }
        SEEN_OBJECTS$LWS.set(originalValue$LWS, cloneValue$LWS);
        setter$LWS(cloneValue$LWS);
      }
    return result$LWS;
  }
  function partialStructuredClone$LWS(value$LWS) {
    let result$LWS = value$LWS;
    if (typeof value$LWS === "object" && value$LWS !== null) {
      try {
        result$LWS = partialStructuredCloneInternal$LWS(value$LWS);
      } catch (_unused16$LWS) {
      }
      SEEN_OBJECTS$LWS.clear();
    }
    return result$LWS;
  }
  function shallowCloneArray$LWS(array$LWS) {
    return ReflectApply$LWS$1(ArrayProtoSlice$LWS$1, array$LWS, [0]);
  }
  function shallowCloneOptions$LWS(options$LWS) {
    const ownKeys$LWS = ReflectOwnKeys$LWS$1(options$LWS);
    const clone$LWS = {
      __proto__: null
    };
    for (let i$LWS = 0, {
      length: length$LWS2
    } = ownKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const key$LWS = ownKeys$LWS[i$LWS];
      clone$LWS[key$LWS] = options$LWS[key$LWS];
    }
    return clone$LWS;
  }
  const consoleRef$LWS = console;
  const {
    warn: consoleWarnRef$LWS
  } = consoleRef$LWS;
  function consoleWarn$LWS(...args$LWS) {
    ReflectApply$LWS$1(consoleWarnRef$LWS, consoleRef$LWS, args$LWS);
  }
  let gaterEnabledFeatures$LWS = [];
  function isGaterEnabledFeature$LWS(featureName$LWS) {
    return ReflectApply$LWS$1(ArrayProtoIncludes$LWS$1, gaterEnabledFeatures$LWS, [`com.salesforce.locker.${featureName$LWS}`]);
  }
  const trackedLiveTargets$LWS = toSafeWeakSet$LWS$1(new WeakSetCtor$LWS$1());
  function isTargetLive$LWS(target$LWS, targetTraits$LWS = 0) {
    if (targetTraits$LWS & 1 || targetTraits$LWS & 2 || targetTraits$LWS & 64 || target$LWS === null || target$LWS === void 0 || target$LWS === ObjectProto$LWS$1 || target$LWS === RegExpProto$LWS$1) {
      return false;
    }
    if (typeof target$LWS === "function") {
      try {
        return trackedLiveTargets$LWS.has(target$LWS) || ObjectHasOwn$LWS$1(target$LWS, SYMBOL_LIVE_OBJECT$LWS);
      } catch (_unused17$LWS) {
      }
      return false;
    }
    if (typeof target$LWS === "object") {
      try {
        if (trackedLiveTargets$LWS.has(target$LWS) || ObjectHasOwn$LWS$1(target$LWS, SYMBOL_LIVE_OBJECT$LWS)) {
          return true;
        }
      } catch (_unused18$LWS) {
      }
      let constructor$LWS;
      try {
        ({
          constructor: constructor$LWS
        } = target$LWS);
        if (constructor$LWS === ObjectCtor$LWS$1) {
          return true;
        }
      } catch (_unused19$LWS) {
      }
      try {
        if (ReflectGetPrototypeOf$LWS$1(target$LWS) === null && (typeof constructor$LWS !== "function" || constructor$LWS.prototype !== target$LWS)) {
          return true;
        }
      } catch (_unused20$LWS) {
      }
      if (targetTraits$LWS === 0) {
        try {
          if (ArrayIsArray$LWS$1(target$LWS)) {
            return true;
          }
        } catch (_unused21$LWS) {
          return false;
        }
        if (ArrayBufferIsView$LWS(target$LWS)) {
          return true;
        }
      }
      try {
        if (ObjectHasOwn$LWS$1(target$LWS, "lastIndex")) {
          ReflectApply$LWS$1(RegExpProtoSourceGetter$LWS, target$LWS, []);
          return true;
        }
      } catch (_unused22$LWS) {
      }
      try {
        if ("byteLength" in target$LWS) {
          ReflectApply$LWS$1(ArrayBufferProtoByteLengthGetter$LWS, target$LWS, []);
          return true;
        }
      } catch (_unused23$LWS) {
      }
    }
    return false;
  }
  function trackAsLiveTarget$LWS(target$LWS) {
    trackedLiveTargets$LWS.add(target$LWS);
    return target$LWS;
  }
  const lockerFeatures$LWS = {};
  function isLockerFeatureEnabled$LWS(featureName$LWS) {
    return lockerFeatures$LWS[featureName$LWS];
  }
  const NS_HEAD$LWS = `${LOCKER_SERVICE_KEY$LWS}-`;
  const NS_TAIL$LWS = "$";
  const STORAGE_NS_HEAD$LWS = `${LOCKER_SERVICE_KEY$LWS}[`;
  const STORAGE_NS_TAIL$LWS = "]";
  function getNamespaceMarker$LWS(namespace$LWS) {
    return `${NS_HEAD$LWS}${namespace$LWS}${NS_TAIL$LWS}`;
  }
  function getStorageNamespaceMarker$LWS(namespace$LWS) {
    return `${STORAGE_NS_HEAD$LWS}${namespace$LWS}${STORAGE_NS_TAIL$LWS}`;
  }
  function prependNamespaceMarker$LWS(key$LWS, namespace$LWS) {
    return `${getNamespaceMarker$LWS(namespace$LWS)}${key$LWS}`;
  }
  function prependStorageNamespaceMarker$LWS(key$LWS, namespace$LWS) {
    return `${getStorageNamespaceMarker$LWS(namespace$LWS)}${key$LWS}`;
  }
  function removeNamespaceMarker$LWS(key$LWS, namespace$LWS) {
    if (typeof key$LWS === "string") {
      const marker$LWS = getNamespaceMarker$LWS(namespace$LWS);
      return ReflectApply$LWS$1(StringProtoStartsWith$LWS, key$LWS, [marker$LWS]) ? ReflectApply$LWS$1(StringProtoSlice$LWS$1, key$LWS, [marker$LWS.length]) : key$LWS;
    }
    return "";
  }
  function removeStorageNamespaceMarker$LWS(key$LWS, namespace$LWS) {
    if (typeof key$LWS === "string") {
      const marker$LWS = getStorageNamespaceMarker$LWS(namespace$LWS);
      return ReflectApply$LWS$1(StringProtoStartsWith$LWS, key$LWS, [marker$LWS]) ? ReflectApply$LWS$1(StringProtoSlice$LWS$1, key$LWS, [marker$LWS.length]) : key$LWS;
    }
    return "";
  }
  function startsWithNamespaceMarker$LWS(key$LWS, namespace$LWS) {
    return typeof key$LWS === "string" && ReflectApply$LWS$1(StringProtoStartsWith$LWS, key$LWS, [getNamespaceMarker$LWS(namespace$LWS)]);
  }
  function startsWithStorageNamespaceMarker$LWS(key$LWS, namespace$LWS) {
    return typeof key$LWS === "string" && ReflectApply$LWS$1(StringProtoStartsWith$LWS, key$LWS, [getStorageNamespaceMarker$LWS(namespace$LWS)]);
  }
  const PromiseCtor$LWS = Promise;
  const {
    catch: PromiseProtoCatch$LWS,
    then: PromiseProtoThen$LWS
  } = PromiseCtor$LWS.prototype;
  const PromiseResolve$LWS = PromiseCtor$LWS.resolve.bind(PromiseCtor$LWS);
  const PromiseReject$LWS = PromiseCtor$LWS.reject.bind(PromiseCtor$LWS);
  /*! version: 0.22.5 */
  /*!
   * Copyright (C) 2019 salesforce.com, inc.
   */
  const AbortControllerCtor$LWS = AbortController;
  const {
    prototype: AbortControllerProto$LWS
  } = AbortControllerCtor$LWS;
  const {
    abort: AbortControllerProtoAbort$LWS
  } = AbortControllerProto$LWS;
  const AbortControllerProtoSignalGetter$LWS = ObjectLookupOwnGetter$LWS$1(AbortControllerProto$LWS, "signal");
  const {
    prototype: AttrProto$LWS
  } = Attr;
  const AttrProtoNameGetter$LWS = ObjectLookupOwnGetter$LWS$1(AttrProto$LWS, "name");
  const AttrProtoNamespaceURIGetter$LWS = ObjectLookupOwnGetter$LWS$1(AttrProto$LWS, "namespaceURI");
  const AttrProtoOwnerElementGetter$LWS = ObjectLookupOwnGetter$LWS$1(AttrProto$LWS, "ownerElement");
  const {
    get: AttrProtoValueGetter$LWS,
    set: AttrProtoValueSetter$LWS
  } = ReflectGetOwnPropertyDescriptor$LWS(AttrProto$LWS, "value");
  function normalizeNamespacedAttributeName$LWS(attrName$LWS) {
    const href$LWS = "href";
    if (ReflectApply$LWS$1(StringProtoEndsWith$LWS, attrName$LWS, [href$LWS]) && !ReflectApply$LWS$1(StringProtoStartsWith$LWS, attrName$LWS, ["xlink:href"])) {
      return href$LWS;
    }
    return attrName$LWS;
  }
  const rootDocument$LWS = document;
  const {
    prototype: DocumentProto$LWS$1
  } = Document;
  const {
    close: DocumentProtoClose$LWS$1,
    open: DocumentProtoOpen$LWS$1
  } = DocumentProto$LWS$1;
  const {
    createComment: DocumentProtoCreateComment$LWS,
    createElement: DocumentProtoCreateElement$LWS$1,
    createElementNS: DocumentProtoCreateElementNS$LWS,
    getElementById: DocumentProtoGetElementById$LWS
  } = DocumentProto$LWS$1;
  const DocumentProtoBodyGetter$LWS$1 = ObjectLookupOwnGetter$LWS$1(DocumentProto$LWS$1, "body");
  const {
    get: DocumentProtoCookieGetter$LWS,
    set: DocumentProtoCookieSetter$LWS
  } = ReflectGetOwnPropertyDescriptor$LWS(DocumentProto$LWS$1, "cookie");
  const DocumentProtoDefaultViewGetter$LWS = ObjectLookupOwnGetter$LWS$1(DocumentProto$LWS$1, "defaultView");
  const DocumentProtoDocumentElementGetter$LWS = ObjectLookupOwnGetter$LWS$1(DocumentProto$LWS$1, "documentElement");
  const DocumentProtoHeadGetter$LWS = ObjectLookupOwnGetter$LWS$1(DocumentProto$LWS$1, "head");
  const DocumentProtoImplementationGetter$LWS = ObjectLookupOwnGetter$LWS$1(DocumentProto$LWS$1, "implementation");
  const {
    prototype: ElementProto$LWS
  } = Element;
  const ElementAriaAttributesToPropertyName$LWS = {
    __proto__: null,
    "aria-activedescendant": "ariaActiveDescendant",
    "aria-atomic": "ariaAtomic",
    "aria-autocomplete": "ariaAutoComplete",
    "aria-busy": "ariaBusy",
    "aria-checked": "ariaChecked",
    "aria-colcount": "ariaColCount",
    "aria-colindex": "ariaColIndex",
    "aria-colspan": "ariaColSpan",
    "aria-controls": "ariaControls",
    "aria-current": "ariaCurrent",
    "aria-describedby": "ariaDescribedBy",
    "aria-details": "ariaDetails",
    "aria-disabled": "ariaDisabled",
    "aria-errormessage": "ariaErrorMessage",
    "aria-expanded": "ariaExpanded",
    "aria-flowto": "ariaFlowTo",
    "aria-haspopup": "ariaHasPopup",
    "aria-hidden": "ariaHidden",
    "aria-invalid": "ariaInvalid",
    "aria-keyshortcuts": "ariaKeyShortcuts",
    "aria-label": "ariaLabel",
    "aria-labelledby": "ariaLabelledBy",
    "aria-level": "ariaLevel",
    "aria-live": "ariaLive",
    "aria-modal": "ariaModal",
    "aria-multiline": "ariaMultiLine",
    "aria-multiselectable": "ariaMultiSelectable",
    "aria-orientation": "ariaOrientation",
    "aria-owns": "ariaOwns",
    "aria-placeholder": "ariaPlaceholder",
    "aria-posinset": "ariaPosInSet",
    "aria-pressed": "ariaPressed",
    "aria-readonly": "ariaReadOnly",
    "aria-relevant": "ariaRelevant",
    "aria-required": "ariaRequired",
    "aria-roledescription": "ariaRoleDescription",
    "aria-rowcount": "ariaRowCount",
    "aria-rowindex": "ariaRowIndex",
    "aria-rowspan": "ariaRowSpan",
    "aria-selected": "ariaSelected",
    "aria-setsize": "ariaSetSize",
    "aria-sort": "ariaSort",
    "aria-valuemax": "ariaValueMax",
    "aria-valuemin": "ariaValueMin",
    "aria-valuenow": "ariaValueNow",
    "aria-valuetext": "ariaValueText"
  };
  const {
    closest: ElementProtoClosest$LWS,
    getAttribute: ElementProtoGetAttribute$LWS,
    getAttributeNode: ElementProtoGetAttributeNode$LWS,
    getAttributeNodeNS: ElementProtoGetAttributeNodeNS$LWS,
    hasAttribute: ElementProtoHasAttribute$LWS,
    querySelector: ElementProtoQuerySelector$LWS,
    querySelectorAll: ElementProtoQuerySelectorAll$LWS,
    removeAttribute: ElementProtoRemoveAttribute$LWS,
    removeAttributeNode: ElementProtoRemoveAttributeNode$LWS,
    removeAttributeNS: ElementProtoRemoveAttributeNS$LWS,
    setAttribute: ElementProtoSetAttribute$LWS$1,
    setAttributeNS: ElementProtoSetAttributeNS$LWS,
    toggleAttribute: ElementProtoToggleAttribute$LWS
  } = ElementProto$LWS;
  const {
    get: ElementProtoInnerHTMLGetter$LWS,
    set: ElementProtoInnerHTMLSetter$LWS
  } = ReflectGetOwnPropertyDescriptor$LWS(ElementProto$LWS, "innerHTML");
  const ElementProtoNamespaceURIGetter$LWS = ObjectLookupOwnGetter$LWS$1(ElementProto$LWS, "namespaceURI");
  const {
    get: ElementProtoOuterHTMLGetter$LWS
  } = ReflectGetOwnPropertyDescriptor$LWS(ElementProto$LWS, "outerHTML");
  const ElementProtoTagNameGetter$LWS = ObjectLookupOwnGetter$LWS$1(ElementProto$LWS, "tagName");
  const HTMLTemplateElementProtoContentGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLTemplateElement.prototype, "content");
  const {
    prototype: NodeProto$LWS$1
  } = Node;
  const {
    appendChild: NodeProtoAppendChild$LWS$1,
    cloneNode: NodeProtoCloneNode$LWS,
    isEqualNode: NodeProtoIsEqualNode$LWS
  } = NodeProto$LWS$1;
  const NodeProtoChildNodesGetter$LWS = ObjectLookupOwnGetter$LWS$1(NodeProto$LWS$1, "childNodes");
  const NodeProtoFirstChildGetter$LWS = ObjectLookupOwnGetter$LWS$1(NodeProto$LWS$1, "firstChild");
  const NodeProtoIsConnectedGetter$LWS = ObjectLookupOwnGetter$LWS$1(NodeProto$LWS$1, "isConnected");
  ObjectLookupOwnGetter$LWS$1(NodeProto$LWS$1, "lastChild");
  const NodeProtoNodeNameGetter$LWS = ObjectLookupOwnGetter$LWS$1(NodeProto$LWS$1, "nodeName");
  const NodeProtoOwnerDocumentGetter$LWS = ObjectLookupOwnGetter$LWS$1(NodeProto$LWS$1, "ownerDocument");
  ReflectGetOwnPropertyDescriptor$LWS(NodeProto$LWS$1, "textContent");
  const noopenerRegExp$LWS = /(^|,)(\s*noopener\s*=\s*(?:yes|1)\s*)(,|$)/g;
  const rootWindow$LWS$1 = window;
  const {
    setTimeout: WindowSetTimeout$LWS
  } = rootWindow$LWS$1;
  const {
    clearInterval: WindowClearInterval$LWS,
    decodeURIComponent: WindowDecodeURIComponent$LWS,
    encodeURIComponent: WindowEncodeURIComponent$LWS,
    fetch: WindowFetch$LWS,
    location: rootWindowLocation$LWS,
    setInterval: WindowSetInterval$LWS,
    top: rootWindowTop$LWS
  } = rootWindow$LWS$1;
  const WindowQueueMicrotask$LWS = (() => {
    const {
      queueMicrotask: queueMicrotask$LWS
    } = rootWindow$LWS$1;
    if (typeof queueMicrotask$LWS === "function") {
      return queueMicrotask$LWS;
    }
    return function queueMicrotask$LWS2(callback$LWS) {
      let promise$LWS = PromiseResolve$LWS();
      promise$LWS = ReflectApply$LWS$1(PromiseProtoThen$LWS, promise$LWS, [callback$LWS]);
      ReflectApply$LWS$1(PromiseProtoCatch$LWS, promise$LWS, [(error) => WindowSetTimeout$LWS(() => {
        throw error;
      }, 0)]);
    };
  })();
  const WindowDocumentGetter$LWS = ObjectLookupOwnGetter$LWS$1(rootWindow$LWS$1, "document");
  const WindowFrameElementGetter$LWS = ObjectLookupOwnGetter$LWS$1(rootWindow$LWS$1, "frameElement");
  const WindowLengthGetter$LWS = ObjectLookupOwnGetter$LWS$1(rootWindow$LWS$1, "length");
  const WindowLocationGetter$LWS = ObjectLookupOwnGetter$LWS$1(rootWindow$LWS$1, "location");
  function initWindowOpenChildWindow$LWS(win$LWS, url$LWS) {
    if (typeof url$LWS === "string" && url$LWS !== "") {
      try {
        const doc$LWS = ReflectApply$LWS$1(WindowDocumentGetter$LWS, win$LWS, []);
        const {
          location: location$LWS
        } = win$LWS;
        if (location$LWS.href !== url$LWS) {
          ReflectApply$LWS$1(DocumentProtoOpen$LWS$1, doc$LWS, []);
          ReflectApply$LWS$1(DocumentProtoClose$LWS$1, doc$LWS, []);
          location$LWS.replace(url$LWS);
        }
      } catch (_unused$LWS) {
      }
    }
    return win$LWS;
  }
  const CHILD_WINDOW_BLOCKED_PROPERTY_SYMBOL$LWS = SymbolFor$LWS$1("@@lwsChildWindowBlockedProperty");
  const CHILD_WINDOW_BLOCKED_PROPERTIES$LWS = ["eval", "Function", "setInterval", "setTimeout"];
  function markForUnsafePropertyBlocking$LWS(childWindow$LWS) {
    if (!childWindow$LWS || childWindow$LWS === rootWindow$LWS$1) {
      return childWindow$LWS;
    }
    for (const blocked$LWS of CHILD_WINDOW_BLOCKED_PROPERTIES$LWS) {
      const descriptor$LWS = ReflectGetOwnPropertyDescriptor$LWS(childWindow$LWS, blocked$LWS);
      const replacement$LWS = () => {
      };
      ReflectDefineProperty$LWS$1(replacement$LWS, CHILD_WINDOW_BLOCKED_PROPERTY_SYMBOL$LWS, {
        __proto__: null,
        configurable: false,
        enumerable: false,
        get() {
          return true;
        }
      });
      if (typeof childWindow$LWS[blocked$LWS] === "function") {
        descriptor$LWS.value = replacement$LWS;
      }
      ReflectDefineProperty$LWS$1(childWindow$LWS, blocked$LWS, descriptor$LWS);
    }
    return childWindow$LWS;
  }
  function throwIfMarkedAsUnsafeInChildWindow$LWS(virtualEnvironmentEvaluator$LWS, name$LWS) {
    const getPossiblyBlockedPropertyFromSandbox$LWS = virtualEnvironmentEvaluator$LWS(`() => globalThis.${name$LWS}`);
    if (getPossiblyBlockedPropertyFromSandbox$LWS()[CHILD_WINDOW_BLOCKED_PROPERTY_SYMBOL$LWS]) {
      throw new LockerSecurityError$LWS(`Cannot call ${name$LWS} on this window.`);
    }
  }
  function isWindow$LWS(value$LWS) {
    if (typeof value$LWS === "object" && value$LWS !== null && ObjectHasOwn$LWS$1(value$LWS, "window") && value$LWS.window === value$LWS) {
      try {
        ReflectApply$LWS$1(WindowLocationGetter$LWS, value$LWS, []);
        return true;
      } catch (_unused2$LWS) {
      }
    }
    return false;
  }
  function normalizeWindowOpenArguments$LWS(args$LWS) {
    const normalizedArgs$LWS = shallowCloneArray$LWS(args$LWS);
    const {
      length: length$LWS2
    } = normalizedArgs$LWS;
    if (length$LWS2) {
      const url$LWS = normalizedArgs$LWS[0];
      if (typeof url$LWS !== "string") {
        normalizedArgs$LWS[0] = url$LWS ? `${url$LWS}` : void 0;
      }
    }
    if (length$LWS2 > 1) {
      const target$LWS = normalizedArgs$LWS[1];
      if (typeof target$LWS !== "string") {
        normalizedArgs$LWS[1] = target$LWS ? `${target$LWS}` : void 0;
      }
    }
    if (length$LWS2 > 2) {
      let features$LWS = normalizedArgs$LWS[2];
      if (typeof features$LWS !== "string") {
        features$LWS = features$LWS ? `${features$LWS}` : void 0;
      }
      if (features$LWS) {
        let loweredFeatures$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, features$LWS, []);
        if (ReflectApply$LWS$1(RegExpProtoTest$LWS$1, noopenerRegExp$LWS, [loweredFeatures$LWS])) {
          loweredFeatures$LWS = ReflectApply$LWS$1(StringProtoReplace$LWS, loweredFeatures$LWS, [
            noopenerRegExp$LWS,
            (_match$LWS, leading$LWS, _feature$LWS, ending$LWS) => `${leading$LWS}noopener${ending$LWS}`
          ]);
        }
        features$LWS = loweredFeatures$LWS;
      }
      normalizedArgs$LWS[2] = features$LWS;
    }
    return normalizedArgs$LWS;
  }
  class Validator$LWS {
    constructor(document$LWS, {
      HTMLLinkElement: HTMLLinkElement$LWS,
      HTMLScriptElement: HTMLScriptElement$LWS,
      HTMLStyleElement: HTMLStyleElement$LWS
    }) {
      this.isAllowedSharedElementChild = (element$LWS) => element$LWS instanceof this._constructors.HTMLLinkElement || element$LWS instanceof this._constructors.HTMLScriptElement || element$LWS instanceof this._constructors.HTMLStyleElement;
      this.isEqualDomString = (leftString$LWS, rightString$LWS) => {
        ReflectApply$LWS$1(ElementProtoInnerHTMLSetter$LWS, this._templates.left, [leftString$LWS]);
        ReflectApply$LWS$1(ElementProtoInnerHTMLSetter$LWS, this._templates.right, [rightString$LWS]);
        return deepIsEqualNode$LWS(this._templates.left, this._templates.right);
      };
      this.isInherentlyUnsecure = (input$LWS) => ReflectApply$LWS$1(StringProtoIncludes$LWS, input$LWS, ["iframe"]) && ReflectApply$LWS$1(StringProtoIncludes$LWS, input$LWS, ["script"]) && ReflectApply$LWS$1(StringProtoIncludes$LWS, input$LWS, ["srcdoc"]);
      this.isSharedElement = (element$LWS) => element$LWS === ReflectApply$LWS$1(DocumentProtoHeadGetter$LWS, this._document, []) || element$LWS === ReflectApply$LWS$1(DocumentProtoBodyGetter$LWS$1, this._document, []) || element$LWS === ReflectApply$LWS$1(DocumentProtoDocumentElementGetter$LWS, this._document, []);
      this._constructors = {
        HTMLLinkElement: HTMLLinkElement$LWS,
        HTMLScriptElement: HTMLScriptElement$LWS,
        HTMLStyleElement: HTMLStyleElement$LWS
      };
      this._document = document$LWS;
      this._templates = {
        left: ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, this._document, ["template"]),
        right: ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, this._document, ["template"])
      };
    }
  }
  function deepIsEqualNode$LWS(leftRoot$LWS, rightRoot$LWS) {
    const leftRootNode$LWS = leftRoot$LWS instanceof HTMLTemplateElement ? ReflectApply$LWS$1(HTMLTemplateElementProtoContentGetter$LWS, leftRoot$LWS, []) : leftRoot$LWS;
    const rightRootNode$LWS = rightRoot$LWS instanceof HTMLTemplateElement ? ReflectApply$LWS$1(HTMLTemplateElementProtoContentGetter$LWS, rightRoot$LWS, []) : rightRoot$LWS;
    if (ReflectApply$LWS$1(NodeProtoIsEqualNode$LWS, leftRootNode$LWS, [rightRootNode$LWS])) {
      const leftChildNodes$LWS = ReflectApply$LWS$1(NodeProtoChildNodesGetter$LWS, leftRootNode$LWS, []);
      const childCount$LWS = leftChildNodes$LWS.length;
      if (childCount$LWS > 0) {
        const rightChildNodes$LWS = ReflectApply$LWS$1(NodeProtoChildNodesGetter$LWS, rightRootNode$LWS, []);
        for (let i$LWS = 0; i$LWS < childCount$LWS; i$LWS += 1) {
          if (deepIsEqualNode$LWS(leftChildNodes$LWS[i$LWS], rightChildNodes$LWS[i$LWS]) === false) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
  const rootValidator$LWS = new Validator$LWS(rootDocument$LWS, rootWindow$LWS$1);
  const documentToValidatorMap$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1([[rootDocument$LWS, rootValidator$LWS]]));
  function getValidator$LWS(document$LWS, globalObject$LWS) {
    if (globalObject$LWS === void 0 || globalObject$LWS === rootWindow$LWS$1) {
      return rootValidator$LWS;
    }
    let validator$LWS = documentToValidatorMap$LWS.get(document$LWS);
    if (validator$LWS === void 0) {
      validator$LWS = new Validator$LWS(document$LWS, globalObject$LWS);
      documentToValidatorMap$LWS.set(document$LWS, validator$LWS);
    }
    return validator$LWS;
  }
  const BlobCtor$LWS = Blob;
  const {
    prototype: BlobProto$LWS
  } = BlobCtor$LWS;
  const {
    slice: BlobProtoSlice$LWS
  } = BlobProto$LWS;
  const BlobProtoSizeGetter$LWS = ObjectLookupOwnGetter$LWS$1(BlobProto$LWS, "size");
  const BlobProtoTypeGetter$LWS = ObjectLookupOwnGetter$LWS$1(BlobProto$LWS, "type");
  const {
    navigator: navigator$LWS$1,
    navigator: {
      userAgentData: userAgentData$LWS$1
    }
  } = rootWindow$LWS$1;
  const brands$LWS$1 = userAgentData$LWS$1 == null ? void 0 : userAgentData$LWS$1.brands;
  const chromiumUserAgentRegExp$LWS$1 = / (?:Headless)?Chrome\/\d+/;
  const webKitUserAgentRegExp$LWS = /WebKit/i;
  let userAgent$LWS$1;
  function getUserAgent$LWS$1() {
    if (userAgent$LWS$1 === void 0) {
      userAgent$LWS$1 = navigator$LWS$1.userAgent;
    }
    return userAgent$LWS$1;
  }
  const CUSTOM_ELEMENT_REGISTRY_ATTRIBUTE_NAME$LWS = LOCKER_SERVICE_KEY_LOWERED$LWS;
  const IS_CHROMIUM_BROWSER$LWS$1 = ArrayIsArray$LWS$1(brands$LWS$1) && brands$LWS$1.length ? ReflectApply$LWS$1(ArrayProtoFind$LWS$1, brands$LWS$1, [
    (item$LWS) => (item$LWS == null ? void 0 : item$LWS.brand) === "Chromium"
  ]) !== void 0 : ReflectApply$LWS$1(RegExpProtoTest$LWS$1, chromiumUserAgentRegExp$LWS$1, [getUserAgent$LWS$1()]);
  const IS_WEBKIT_BROWSER$LWS = !IS_CHROMIUM_BROWSER$LWS$1 && (ArrayIsArray$LWS$1(brands$LWS$1) && brands$LWS$1.length ? ReflectApply$LWS$1(ArrayProtoFind$LWS$1, brands$LWS$1, [
    (item$LWS) => {
      const brand$LWS = item$LWS == null ? void 0 : item$LWS.brand;
      return typeof brand$LWS === "string" && ReflectApply$LWS$1(RegExpProtoTest$LWS$1, webKitUserAgentRegExp$LWS, [brand$LWS]);
    }
  ]) !== void 0 : ReflectApply$LWS$1(RegExpProtoTest$LWS$1, webKitUserAgentRegExp$LWS, [getUserAgent$LWS$1()]));
  const {
    getElementById: DocumentFragmentProtoGetElementById$LWS
  } = DocumentFragment.prototype;
  const DOMExceptionCtor$LWS$1 = DOMException;
  ObjectLookupOwnGetter$LWS$1(DOMExceptionCtor$LWS$1.prototype, "code");
  const {
    createDocument: DOMImplementationProtoCreateDocument$LWS
  } = DOMImplementation.prototype;
  const DOMTokenListProtoValueGetter$LWS = ObjectLookupOwnGetter$LWS$1(DOMTokenList.prototype, "value");
  const EventCtor$LWS = Event;
  const {
    prototype: EventProto$LWS
  } = EventCtor$LWS;
  const {
    stopPropagation: EventProtoStopPropagation$LWS
  } = EventProto$LWS;
  const EventProtoCurrentTargetGetter$LWS = ObjectLookupOwnGetter$LWS$1(EventProto$LWS, "currentTarget");
  const {
    addEventListener: EventTargetProtoAddEventListener$LWS,
    dispatchEvent: EventTargetProtoDispatchEvent$LWS,
    removeEventListener: EventTargetProtoRemoveEventListener$LWS
  } = EventTarget.prototype;
  const {
    prototype: HTMLAnchorElementProto$LWS
  } = HTMLAnchorElement;
  const HTMLAnchorElementProtoHostnameGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLAnchorElementProto$LWS, "hostname");
  const {
    get: HTMLAnchorElementProtoHrefGetter$LWS,
    set: HTMLAnchorElementProtoHrefSetter$LWS
  } = ReflectGetOwnPropertyDescriptor$LWS(HTMLAnchorElementProto$LWS, "href");
  const HTMLAnchorElementProtoPathnameGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLAnchorElementProto$LWS, "pathname");
  const HTMLAnchorElementProtoProtocolGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLAnchorElementProto$LWS, "protocol");
  const HTMLElement$LWS = getUnmaskedFunction$LWS(rootWindow$LWS$1.HTMLElement);
  const {
    prototype: HTMLElementProto$LWS
  } = HTMLElement$LWS;
  ObjectLookupOwnGetter$LWS$1(HTMLElementProto$LWS, "style");
  const HTMLElementGlobalAttributesToPropertyName$LWS = {
    __proto__: null,
    accesskey: "accessKey",
    contenteditable: "contentEditable",
    enterkeyhint: "enterKeyHint",
    inputmode: "inputMode",
    tabindex: "tabIndex"
  };
  const {
    prototype: HTMLIFrameElementProto$LWS
  } = HTMLIFrameElement;
  ObjectLookupOwnGetter$LWS$1(HTMLIFrameElementProto$LWS, "contentWindow");
  const HTMLIFrameElementProtoSrcSetter$LWS = ObjectLookupOwnSetter$LWS(HTMLIFrameElementProto$LWS, "src");
  const HTMLScriptElementCtor$LWS = HTMLScriptElement;
  const {
    prototype: HTMLScriptElementProto$LWS
  } = HTMLScriptElementCtor$LWS;
  const {
    get: HTMLScriptElementProtoSrcGetter$LWS,
    set: HTMLScriptElementProtoSrcSetter$LWS
  } = ReflectGetOwnPropertyDescriptor$LWS(HTMLScriptElementProto$LWS, "src");
  const NAMESPACE_DEFAULT$LWS = "default";
  const NAMESPACE_SVG$LWS = "http://www.w3.org/2000/svg";
  const NAMESPACE_XHTML$LWS = "http://www.w3.org/1999/xhtml";
  const NAMESPACE_XLINK$LWS = "http://www.w3.org/1999/xlink";
  const RequestProtoURLGetter$LWS = ObjectLookupOwnGetter$LWS$1(Request.prototype, "url");
  const ResponseCtor$LWS = Response;
  const ResponseProto$LWS = ResponseCtor$LWS.prototype;
  const ResponseProtoOkGetter$LWS = ObjectLookupOwnGetter$LWS$1(ResponseProto$LWS, "ok");
  ObjectLookupOwnGetter$LWS$1(ResponseProto$LWS, "status");
  ObjectLookupOwnGetter$LWS$1(ResponseProto$LWS, "statusText");
  const {
    text: ResponseProtoText$LWS
  } = ResponseProto$LWS;
  const {
    createObjectURL: URLCreateObjectURL$LWS,
    revokeObjectURL: URLRevokeObjectURL$LWS
  } = URL;
  const SCRIPT_EVALUATOR_PROPERTY_NAME$LWS = "$evaluator$";
  const SCRIPT_HOOK_SOURCE_TEXT$LWS = `document.currentScript.${SCRIPT_EVALUATOR_PROPERTY_NAME$LWS}`;
  const evaluatedScriptElements$LWS = toSafeWeakSet$LWS$1(new WeakSetCtor$LWS$1());
  const originalScriptPropertyCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  const resolvedURLRegistryCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function defineScriptAccessorProperty$LWS(script$LWS2, propKey$LWS, getter$LWS, setter$LWS) {
    ReflectDefineProperty$LWS$1(script$LWS2, propKey$LWS, {
      __proto__: null,
      configurable: true,
      enumerable: true,
      get: getter$LWS,
      set: setter$LWS
    });
  }
  function defineScriptEvaluatorProperty$LWS(script$LWS2, callback$LWS) {
    if (!ReflectDefineProperty$LWS$1(script$LWS2, SCRIPT_EVALUATOR_PROPERTY_NAME$LWS, {
      __proto__: null,
      configurable: true,
      get: ReflectApply$LWS$1(FunctionProtoBind$LWS, () => {
        evaluatedScriptElements$LWS.add(script$LWS2);
        deleteScriptEvaluatorProperty$LWS(script$LWS2);
        const ownerDoc$LWS = ReflectApply$LWS$1(NodeProtoOwnerDocumentGetter$LWS, script$LWS2, []);
        const defaultView$LWS = ReflectApply$LWS$1(DocumentProtoDefaultViewGetter$LWS, ownerDoc$LWS, []);
        const context$LWS = {
          [UNCOMPILED_LOCATION_NAME$LWS]: defaultView$LWS.location,
          [UNCOMPILED_TOP_NAME$LWS]: defaultView$LWS.top
        };
        callback$LWS(context$LWS, defaultView$LWS, ownerDoc$LWS);
      }, [])
    })) {
      throw new LockerSecurityError$LWS(`Cannot evaluate ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, script$LWS2, [])}`);
    }
  }
  function deleteOriginalScriptProperty$LWS(script$LWS2) {
    originalScriptPropertyCache$LWS.delete(script$LWS2);
  }
  function deleteScriptEvaluatorProperty$LWS(script$LWS2) {
    ReflectDeleteProperty$LWS$1(script$LWS2, SCRIPT_EVALUATOR_PROPERTY_NAME$LWS);
  }
  function getOriginalScriptProperty$LWS(script$LWS2) {
    return originalScriptPropertyCache$LWS.get(script$LWS2);
  }
  function isScriptEvaluated$LWS(script$LWS2) {
    return evaluatedScriptElements$LWS.has(script$LWS2);
  }
  function isScriptPropertyEvaluatorHookDefined$LWS(script$LWS2) {
    return originalScriptPropertyCache$LWS.has(script$LWS2);
  }
  function isScriptURLEvaluatorHookDefined$LWS(script$LWS2) {
    return resolvedURLRegistryCache$LWS.has(script$LWS2);
  }
  function setOriginalScriptScriptProperty$LWS(script$LWS2, scriptProperty$LWS) {
    return originalScriptPropertyCache$LWS.set(script$LWS2, scriptProperty$LWS);
  }
  const documentPattern$LWS = "document";
  const windowPattern$LWS = "document\\.defaultView|frames|globalThis|self|window";
  const webpackGlobalPattern$LWS = `${windowPattern$LWS}|global`;
  const webpackGlobalDocumentPattern$LWS = `${documentPattern$LWS}|global.document`;
  const UNIVERSAL_CONTEXT_NAMES$LWS = [UNCOMPILED_LOCATION_NAME$LWS, UNCOMPILED_TOP_NAME$LWS, "location", "top"];
  const locationReferencesRegExp$LWS = createPropertyReferenceRegExp$LWS(`${documentPattern$LWS}|${windowPattern$LWS}`, "location");
  const locationReferencesWithWebpackRegExp$LWS = createPropertyReferenceRegExp$LWS(`${webpackGlobalDocumentPattern$LWS}|${webpackGlobalPattern$LWS}`, "location");
  const sandboxEvalContextNameRegExp$LWS = new RegExpCtor$LWS$1(`(?:^|\\W)${toRegExpEscapedString$LWS(SANDBOX_EVAL_CONTEXT_NAME$LWS)}(?:\\W|$)`);
  const webpackRequireNameRegExp$LWS = new RegExpCtor$LWS$1(toRegExpEscapedIdentifierName$LWS(WEBPACK_REQUIRE_NAME$LWS));
  const windowTopReferencesRegExp$LWS = createPropertyReferenceRegExp$LWS(windowPattern$LWS, "top");
  const windowTopReferencesWithWebpackRegExp$LWS = createPropertyReferenceRegExp$LWS(webpackGlobalPattern$LWS, "top");
  function createPropertyReferenceRegExp$LWS(objectPattern$LWS, key$LWS) {
    return new RegExpCtor$LWS$1(`\\b(?:${objectPattern$LWS})\\.${key$LWS}\\b(\\s*(?:[?*/%&^|+-]|>>>?|<<)*=(?=[^=]))?`, "g");
  }
  function compileSourceText$LWS(sourceText$LWS) {
    if (ReflectApply$LWS$1(RegExpProtoTest$LWS$1, sandboxEvalContextNameRegExp$LWS, [sourceText$LWS])) {
      return sourceText$LWS;
    }
    let locationRegExp$LWS;
    let topRegExp$LWS;
    if (ReflectApply$LWS$1(RegExpProtoTest$LWS$1, webpackRequireNameRegExp$LWS, [sourceText$LWS])) {
      locationRegExp$LWS = locationReferencesWithWebpackRegExp$LWS;
      topRegExp$LWS = windowTopReferencesWithWebpackRegExp$LWS;
    } else {
      locationRegExp$LWS = locationReferencesRegExp$LWS;
      topRegExp$LWS = windowTopReferencesRegExp$LWS;
    }
    sourceText$LWS = ReflectApply$LWS$1(StringProtoReplace$LWS, sourceText$LWS, [locationRegExp$LWS, (_match$LWS, assignmentOperator$LWS) => assignmentOperator$LWS ? `${UNCOMPILED_LOCATION_NAME$LWS}.href${assignmentOperator$LWS}` : UNCOMPILED_LOCATION_NAME$LWS]);
    sourceText$LWS = ReflectApply$LWS$1(StringProtoReplace$LWS, sourceText$LWS, [topRegExp$LWS, () => UNCOMPILED_TOP_NAME$LWS]);
    return sourceText$LWS;
  }
  function generateContextAssignmentCodeFromContextNames$LWS(names$LWS) {
    return `const {${ReflectApply$LWS$1(ArrayProtoToString$LWS$1, names$LWS, [])}}=${SANDBOX_EVAL_CONTEXT_NAME$LWS}`;
  }
  function transformSourceText$LWS(sourceText$LWS) {
    if (ReflectApply$LWS$1(RegExpProtoTest$LWS$1, sandboxEvalContextNameRegExp$LWS, [sourceText$LWS])) {
      return sourceText$LWS;
    }
    const code$LWS = compileSourceText$LWS(sourceText$LWS);
    const prefix$LWS = `${generateContextAssignmentCodeFromContextNames$LWS(UNIVERSAL_CONTEXT_NAMES$LWS)};`;
    const pragmaIndex$LWS = indexOfPragma$LWS(code$LWS, "use strict");
    if (pragmaIndex$LWS === -1) {
      return prefix$LWS + code$LWS;
    }
    let afterPragmaIndex$LWS = pragmaIndex$LWS + 12;
    if (afterPragmaIndex$LWS < code$LWS.length && code$LWS[afterPragmaIndex$LWS] === ";") {
      afterPragmaIndex$LWS += 1;
    }
    return ReflectApply$LWS$1(StringProtoSlice$LWS$1, code$LWS, [0, afterPragmaIndex$LWS]) + prefix$LWS + ReflectApply$LWS$1(StringProtoSlice$LWS$1, code$LWS, [afterPragmaIndex$LWS]);
  }
  const {
    key: StorageProtoKey$LWS,
    getItem: StorageProtoGetItem$LWS,
    removeItem: StorageProtoRemoveItem$LWS,
    setItem: StorageProtoSetItem$LWS
  } = Storage.prototype;
  ReflectGetOwnPropertyDescriptor$LWS(SVGScriptElement.prototype, "href");
  const XhrCtor$LWS = XMLHttpRequest;
  const {
    prototype: XhrProto$LWS
  } = XhrCtor$LWS;
  const {
    abort: XhrProtoAbort$LWS,
    open: XhrProtoOpen$LWS,
    send: XhrProtoSend$LWS
  } = XhrProto$LWS;
  const XhrProtoResponseTextGetter$LWS = ObjectLookupOwnGetter$LWS$1(XhrProto$LWS, "responseText");
  const XhrProtoStatusGetter$LWS = ObjectLookupOwnGetter$LWS$1(XhrProto$LWS, "status");
  ObjectLookupOwnSetter$LWS(XhrProto$LWS, "withCredentials");
  /*! version: 0.22.5 */
  /*!
   * Copyright (C) 2019 salesforce.com, inc.
   */
  const ALLOWED_MIME_TYPES$LWS = ["application/octet-stream", "application/json", "application/pdf", "video/", "audio/", "image/", "font/", "text/plain", "text/markdown", "application/zip", "application/x-bzip", "application/x-rar-compressed", "application/x-tar"];
  const validMimeTypeRegExp$LWS = /^[a-z]+\/[a-z0-9.+-]+$/;
  function isMIMETypeAllowed$LWS(mimeType$LWS) {
    if (ReflectApply$LWS$1(RegExpProtoTest$LWS$1, validMimeTypeRegExp$LWS, [mimeType$LWS])) {
      for (let i$LWS = 0, {
        length: length$LWS2
      } = ALLOWED_MIME_TYPES$LWS; i$LWS < length$LWS2; i$LWS += 1) {
        if (ReflectApply$LWS$1(StringProtoStartsWith$LWS, mimeType$LWS, [ALLOWED_MIME_TYPES$LWS[i$LWS]])) {
          return true;
        }
      }
    }
    return false;
  }
  const DISALLOWED_ENDPOINTS_LIST$LWS = ["/aura", "/webruntime"];
  const TRUSTED_DOMAINS_REG_EXP$LWS = /\.(force|salesforce|visualforce|documentforce|my\.site|salesforce-sites)\.com$/;
  const URL_SCHEMES_LIST$LWS = toSafeArray$LWS$1(["about:", "http:", "https:"]);
  const newlinesAndTabsRegExp$LWS = /[\u2028\u2029\n\r\t]/g;
  const normalizerAnchor$LWS = ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, rootDocument$LWS, ["a"]);
  function isValidURL$LWS(parsedURL$LWS) {
    const loweredPathname$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, parsedURL$LWS.pathname, []);
    for (let i$LWS = 0, {
      length: length$LWS2
    } = DISALLOWED_ENDPOINTS_LIST$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      if (ReflectApply$LWS$1(StringProtoEndsWith$LWS, loweredPathname$LWS, [DISALLOWED_ENDPOINTS_LIST$LWS[i$LWS]]) || ReflectApply$LWS$1(StringProtoIncludes$LWS, loweredPathname$LWS, [`${DISALLOWED_ENDPOINTS_LIST$LWS[i$LWS]}/`])) {
        return false;
      }
    }
    return true;
  }
  function isValidURLScheme$LWS(url$LWS) {
    ReflectApply$LWS$1(HTMLAnchorElementProtoHrefSetter$LWS, normalizerAnchor$LWS, [url$LWS]);
    return URL_SCHEMES_LIST$LWS.includes(ReflectApply$LWS$1(HTMLAnchorElementProtoProtocolGetter$LWS, normalizerAnchor$LWS, []));
  }
  function parseURL$LWS(url$LWS) {
    const normalizedURL$LWS = sanitizeURLForElement$LWS(url$LWS);
    return {
      normalizedURL: normalizedURL$LWS,
      pathname: WindowDecodeURIComponent$LWS(ReflectApply$LWS$1(HTMLAnchorElementProtoPathnameGetter$LWS, normalizerAnchor$LWS, []))
    };
  }
  function resolveURL$LWS(url$LWS) {
    ReflectApply$LWS$1(HTMLAnchorElementProtoHrefSetter$LWS, normalizerAnchor$LWS, [url$LWS]);
    return ReflectApply$LWS$1(HTMLAnchorElementProtoHrefGetter$LWS, normalizerAnchor$LWS, []);
  }
  function sanitizeURLForElement$LWS(url$LWS) {
    return resolveURL$LWS(sanitizeURLString$LWS(url$LWS));
  }
  function sanitizeURLString$LWS(urlString$LWS) {
    return urlString$LWS === "" ? urlString$LWS : ReflectApply$LWS$1(StringProtoReplace$LWS, urlString$LWS, [newlinesAndTabsRegExp$LWS, ""]);
  }
  /*! version: 0.22.5 */
  /*! @license DOMPurify 3.0.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.5/LICENSE */
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
  if (!apply) {
    apply = function apply2(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }
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
  function addToSet(set, array, transformCaseFunc) {
    var _transformCaseFunc;
    transformCaseFunc = (_transformCaseFunc = transformCaseFunc) !== null && _transformCaseFunc !== void 0 ? _transformCaseFunc : stringToLowerCase;
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
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      newObject[property] = value;
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
    function fallbackValue(element) {
      console.warn("fallback value for", element);
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
    DOCTYPE_NAME
  });
  const getGlobal = () => typeof window === "undefined" ? null : window;
  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes2, purifyHostElement) {
    if (typeof trustedTypes2 !== "object" || typeof trustedTypes2.createPolicy !== "function") {
      return null;
    }
    let suffix = null;
    const ATTR_NAME = "data-tt-policy-suffix";
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = "dompurify" + (suffix ? "#" + suffix : "");
    try {
      return trustedTypes2.createPolicy(policyName, {
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
    DOMPurify.version = "3.0.5";
    DOMPurify.removed = [];
    if (!window2 || !window2.document || window2.document.nodeType !== 9) {
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    const originalDocument = window2.document;
    const currentScript = originalDocument.currentScript;
    let {
      document: document2
    } = window2;
    const {
      DocumentFragment: DocumentFragment2,
      HTMLTemplateElement: HTMLTemplateElement2,
      Node: Node2,
      Element: Element2,
      NodeFilter: NodeFilter2,
      NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes: trustedTypes2
    } = window2;
    const ElementPrototype = Element2.prototype;
    const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
    const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
    const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
    const getParentNode = lookupGetter(ElementPrototype, "parentNode");
    if (typeof HTMLTemplateElement2 === "function") {
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
      ATTR_WHITESPACE: ATTR_WHITESPACE2
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    let CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
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
    let PARSER_MEDIA_TYPE;
    const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
    const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
    let transformCaseFunc;
    let CONFIG = null;
    const formElement = document2.createElement("form");
    const isRegexOrFunction = function isRegexOrFunction2(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    const _parseConfig = function _parseConfig2(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      if (!cfg || typeof cfg !== "object") {
        cfg = {};
      }
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
      transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
      ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = "ALLOWED_NAMESPACES" in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
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
        ALLOWED_TAGS = addToSet({}, [...text]);
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
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes2, currentScript);
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
    const ALL_SVG_TAGS = addToSet({}, svg$1);
    addToSet(ALL_SVG_TAGS, svgFilters);
    addToSet(ALL_SVG_TAGS, svgDisallowed);
    const ALL_MATHML_TAGS = addToSet({}, mathMl$1);
    addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
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
      let doc;
      let leadingWhitespace;
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
    const _createIterator = function _createIterator2(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter2.SHOW_ELEMENT | NodeFilter2.SHOW_COMMENT | NodeFilter2.SHOW_TEXT, null, false);
    };
    const _isClobbered = function _isClobbered2(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
    };
    const _isNode = function _isNode2(object) {
      return typeof Node2 === "object" ? object instanceof Node2 : object && typeof object === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
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
      let content;
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
      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName))
            return false;
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName))
            return false;
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
        content = stringReplace(content, MUSTACHE_EXPR2, " ");
        content = stringReplace(content, ERB_EXPR2, " ");
        content = stringReplace(content, TMPLIT_EXPR2, " ");
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
        if (_basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)))
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
    const _basicCustomElementTest = function _basicCustomElementTest2(tagName) {
      return tagName.indexOf("-") > 0;
    };
    const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
      let attr;
      let value;
      let lcName;
      let l;
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
      l = attributes.length;
      while (l--) {
        attr = attributes[l];
        const {
          name,
          namespaceURI
        } = attr;
        value = name === "value" ? attr.value : stringTrim(attr.value);
        lcName = transformCaseFunc(name);
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
          value = stringReplace(value, MUSTACHE_EXPR2, " ");
          value = stringReplace(value, ERB_EXPR2, " ");
          value = stringReplace(value, TMPLIT_EXPR2, " ");
        }
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
          _removeAttribute(name, currentNode);
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        if (trustedTypesPolicy && typeof trustedTypes2 === "object" && typeof trustedTypes2.getAttributeType === "function") {
          if (namespaceURI)
            ;
          else {
            switch (trustedTypes2.getAttributeType(lcTag, lcName)) {
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
      let shadowNode;
      const shadowIterator = _createIterator(fragment);
      _executeHook("beforeSanitizeShadowDOM", fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        _executeHook("uponSanitizeShadowNode", shadowNode, null);
        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        if (shadowNode.content instanceof DocumentFragment2) {
          _sanitizeShadowDOM2(shadowNode.content);
        }
        _sanitizeAttributes(shadowNode);
      }
      _executeHook("afterSanitizeShadowDOM", fragment, null);
    };
    DOMPurify.sanitize = function(dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let body;
      let importedNode;
      let currentNode;
      let returnNode;
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
      } else if (dirty instanceof Node2) {
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
      const nodeIterator = _createIterator(IN_PLACE ? dirty : body);
      while (currentNode = nodeIterator.nextNode()) {
        if (_sanitizeElements(currentNode)) {
          continue;
        }
        if (currentNode.content instanceof DocumentFragment2) {
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
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR2, " ");
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR2, " ");
        serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR2, " ");
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function(cfg) {
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
  /*!
   * Copyright (C) 2023 salesforce.com, inc.
   */
  const SUPPORTS_TRUSTED_TYPES = typeof trustedTypes !== "undefined";
  function createTrustedTypesPolicy(name, options) {
    return trustedTypes.createPolicy(name, options);
  }
  function createFallbackPolicy(_name, options) {
    return options;
  }
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
  try {
    createPolicy("default", {
      createHTML(dirty) {
        if (dirty === "null" || dirty === "undefined") {
          return dirty;
        }
        return dirty;
      },
      createScript(dirty) {
        if (dirty === "null" || dirty === "undefined") {
          return dirty;
        }
        return void 0;
      },
      createScriptURL(dirty) {
        if (dirty === "null" || dirty === "undefined") {
          return dirty;
        }
        return dirty;
      }
    });
  } catch (_unused) {
  }
  const trusted = createPolicy("trusted", policyOptions);
  /*! version: 0.22.5 */
  /*!
   * Copyright (C) 2019 salesforce.com, inc.
   */
  const additionalAttributes$LWS = ["role", "part", "target"];
  const htmlTags$LWS = ["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "caption", "canvas", "center", "cite", "code", "col", "colgroup", "command", "datalist", "dd", "del", "details", "dfn", "dir", "div", "dl", "dt", "em", "fieldset", "figure", "figcaption", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "keygen", "kbd", "label", "legend", "li", "map", "mark", "menu", "meter", "nav", "ol", "optgroup", "option", "output", "p", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"];
  const miscTags$LWS = ["#comment", "#document-fragment"];
  const svgTags$LWS = ["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "audio", "canvas", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "video", "view", "vkern", "use"];
  const allHTMLTags$LWS = ArrayConcat$LWS(htmlTags$LWS, svgTags$LWS, miscTags$LWS);
  const allSVGTags$LWS = ArrayConcat$LWS(svgTags$LWS, miscTags$LWS);
  const CUSTOM_ELEMENT_HANDLING$LWS = {
    attributeNameCheck: /.+/,
    allowCustomizedBuiltInElements: false,
    tagNameCheck: /^[a-z][-_.\w]*-[-.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u37D0\u37F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u10000-\uEFFFF]*$/
  };
  const NODE_ALL_IN_PLACE$LWS = {
    ADD_ATTR: shallowCloneArray$LWS(additionalAttributes$LWS),
    ALLOWED_TAGS: shallowCloneArray$LWS(allHTMLTags$LWS),
    CUSTOM_ELEMENT_HANDLING: ObjectAssign$LWS$1({}, CUSTOM_ELEMENT_HANDLING$LWS),
    IN_PLACE: true,
    TRUSTED_TYPES_POLICY: trusted
  };
  const NODE_SVG$LWS = {
    ADD_ATTR: shallowCloneArray$LWS(additionalAttributes$LWS),
    ALLOWED_TAGS: shallowCloneArray$LWS(allSVGTags$LWS),
    CUSTOM_ELEMENT_HANDLING: ObjectAssign$LWS$1({}, CUSTOM_ELEMENT_HANDLING$LWS),
    RETURN_DOM_FRAGMENT: true,
    SANITIZE_DOM: false,
    TRUSTED_TYPES_POLICY: trusted
  };
  const STRING_BLOB_HTML$LWS = {
    ADD_ATTR: shallowCloneArray$LWS(additionalAttributes$LWS),
    ALLOWED_TAGS: ReflectApply$LWS$1(ArrayProtoFilter$LWS$1, allHTMLTags$LWS, [(tag$LWS) => tag$LWS !== "iframe"]),
    CUSTOM_ELEMENT_HANDLING: ObjectAssign$LWS$1({}, CUSTOM_ELEMENT_HANDLING$LWS),
    SANITIZE_DOM: false,
    TRUSTED_TYPES_POLICY: trusted
  };
  var CONFIG$LWS = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    NODE_ALL_IN_PLACE: NODE_ALL_IN_PLACE$LWS,
    NODE_SVG: NODE_SVG$LWS,
    STRING_BLOB_HTML: STRING_BLOB_HTML$LWS
  });
  const instancesBySandboxKeyRegistry$LWS = {
    __proto__: null
  };
  const SANITIZE_ATTRIBUTES_LIST$LWS = toSafeArray$LWS$1(["href", "xlink:href"]);
  const SHARED_SVG_SANITIZER_KEY$LWS = "SHARED_SVG_SANITIZER_KEY";
  ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, document, ["template"]);
  const queue$LWS = toSafeSet$LWS(new SetCtor$LWS$1());
  const urlReplacerRegExp$LWS = /[^a-z0-9]+/gi;
  function createSantizerHooksRegistry$LWS(sandboxKey$LWS) {
    return {
      __proto__: null,
      uponSanitizeAttribute: uponSanitizeAttribute$LWS,
      uponSanitizeElement(node$LWS, data$LWS, config$LWS) {
        var _config$CUSTOM_ELEMEN$LWS;
        const {
          tagName: tagName$LWS
        } = data$LWS;
        const tagNameCheck$LWS = config$LWS == null || (_config$CUSTOM_ELEMEN$LWS = config$LWS.CUSTOM_ELEMENT_HANDLING) == null ? void 0 : _config$CUSTOM_ELEMEN$LWS.tagNameCheck;
        if (tagNameCheck$LWS && ReflectApply$LWS$1(RegExpProtoTest$LWS$1, tagNameCheck$LWS, [tagName$LWS]) && !ReflectApply$LWS$1(ElementProtoHasAttribute$LWS, node$LWS, [CUSTOM_ELEMENT_REGISTRY_ATTRIBUTE_NAME$LWS])) {
          ReflectApply$LWS$1(ElementProtoSetAttribute$LWS$1, node$LWS, [CUSTOM_ELEMENT_REGISTRY_ATTRIBUTE_NAME$LWS, sandboxKey$LWS]);
        }
      }
    };
  }
  function createUrlContainer$LWS(url$LWS) {
    const container$LWS = ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, document, ["div"]);
    ReflectApply$LWS$1(ElementProtoSetAttribute$LWS$1, container$LWS, ["style", "display:none"]);
    ReflectApply$LWS$1(ElementProtoSetAttribute$LWS$1, container$LWS, ["id", url$LWS]);
    const body$LWS = ReflectApply$LWS$1(DocumentProtoBodyGetter$LWS$1, document, []);
    ReflectApply$LWS$1(NodeProtoAppendChild$LWS$1, body$LWS, [container$LWS]);
    return container$LWS;
  }
  function getSanitizerForConfig$LWS(sandboxKey$LWS, configName$LWS) {
    if (typeof sandboxKey$LWS !== "string") {
      throw new LockerSecurityError$LWS(ERR_INVALID_SANDBOX_KEY$LWS);
    }
    if (typeof configName$LWS !== "string") {
      throw new LockerSecurityError$LWS("Invalid config name.");
    }
    let sandboxConfiguredSanitizerInstances$LWS = instancesBySandboxKeyRegistry$LWS[sandboxKey$LWS];
    if (sandboxConfiguredSanitizerInstances$LWS === void 0) {
      sandboxConfiguredSanitizerInstances$LWS = instancesBySandboxKeyRegistry$LWS[sandboxKey$LWS] = {
        __proto__: null
      };
    }
    let configuredDOMPurifyInstance$LWS = sandboxConfiguredSanitizerInstances$LWS[configName$LWS];
    if (configuredDOMPurifyInstance$LWS === void 0) {
      const config$LWS = CONFIG$LWS[configName$LWS];
      configuredDOMPurifyInstance$LWS = purify();
      configuredDOMPurifyInstance$LWS.setConfig(config$LWS);
      const hooksRegistry$LWS = createSantizerHooksRegistry$LWS(sandboxKey$LWS);
      for (const hookName$LWS in hooksRegistry$LWS) {
        configuredDOMPurifyInstance$LWS.addHook(hookName$LWS, hooksRegistry$LWS[hookName$LWS]);
      }
      sandboxConfiguredSanitizerInstances$LWS[configName$LWS] = configuredDOMPurifyInstance$LWS;
    }
    return configuredDOMPurifyInstance$LWS;
  }
  function sanitizeSvgTextReturnDOM$LWS(dirty$LWS) {
    const svgSanitizer$LWS = getSanitizerForConfig$LWS(SHARED_SVG_SANITIZER_KEY$LWS, "NODE_SVG");
    return svgSanitizer$LWS.sanitize(dirty$LWS);
  }
  function sanitizeSvgHref$LWS(url$LWS) {
    const urlAsString$LWS = toString$LWS(url$LWS);
    if (ReflectApply$LWS$1(StringProtoStartsWith$LWS, urlAsString$LWS, ["#"])) {
      return url$LWS;
    }
    const normalizedHref$LWS = parseHref$LWS(urlAsString$LWS);
    if (URL_SCHEMES_LIST$LWS.includes(normalizedHref$LWS.protocol)) {
      const container$LWS = ReflectApply$LWS$1(DocumentProtoGetElementById$LWS, document, [normalizedHref$LWS.normalizedURL]);
      if (container$LWS && normalizedHref$LWS.normalizedFragment) {
        checkExistingAndDequeue$LWS(container$LWS, normalizedHref$LWS);
      } else if (!container$LWS) {
        fetchAndSanitize$LWS(normalizedHref$LWS);
      }
      return normalizedHref$LWS.requestedFragment ? `#${normalizedHref$LWS.normalizedFragment}` : `#${normalizedHref$LWS.normalizedURL}`;
    }
    return url$LWS;
  }
  function updater$LWS(container$LWS, normalizedHref$LWS) {
    const {
      normalizedFragment: normalizedFragment$LWS,
      requestedFragment: requestedFragment$LWS
    } = normalizedHref$LWS;
    let el$LWS = ReflectApply$LWS$1(ElementProtoQuerySelector$LWS, container$LWS, [`#${normalizedFragment$LWS}`]);
    if (el$LWS === null) {
      try {
        el$LWS = ReflectApply$LWS$1(ElementProtoQuerySelector$LWS, container$LWS, [`#${requestedFragment$LWS}`]);
        ReflectApply$LWS$1(ElementProtoSetAttribute$LWS$1, el$LWS, ["id", normalizedFragment$LWS]);
      } catch (_unused$LWS) {
      }
    }
  }
  function checkExistingAndDequeue$LWS(container$LWS, normalizedHref$LWS) {
    if (queue$LWS.has(normalizedHref$LWS.normalizedURL)) {
      const interval$LWS = WindowSetInterval$LWS(() => {
        if (!queue$LWS.has(normalizedHref$LWS.normalizedURL)) {
          updater$LWS(container$LWS, normalizedHref$LWS);
          WindowClearInterval$LWS(interval$LWS);
        }
      }, 50);
    } else {
      updater$LWS(container$LWS, normalizedHref$LWS);
    }
  }
  function fetchAndSanitize$LWS(normalizedHref$LWS) {
    const container$LWS = createUrlContainer$LWS(normalizedHref$LWS.normalizedURL);
    queue$LWS.add(normalizedHref$LWS.normalizedURL);
    const xhr$LWS = new XhrCtor$LWS();
    ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, xhr$LWS, ["load", () => {
      const status$LWS = ReflectApply$LWS$1(XhrProtoStatusGetter$LWS, xhr$LWS, []);
      if (status$LWS === 200) {
        const responseText$LWS = ReflectApply$LWS$1(XhrProtoResponseTextGetter$LWS, xhr$LWS, []);
        const fragment$LWS = sanitizeSvgTextReturnDOM$LWS(responseText$LWS);
        if (normalizedHref$LWS.requestedFragment) {
          const el$LWS = ReflectApply$LWS$1(DocumentFragmentProtoGetElementById$LWS, fragment$LWS, [normalizedHref$LWS.requestedFragment]);
          if (el$LWS) {
            ReflectApply$LWS$1(ElementProtoSetAttribute$LWS$1, el$LWS, ["id", normalizedHref$LWS.normalizedFragment]);
          }
        }
        ReflectApply$LWS$1(NodeProtoAppendChild$LWS$1, container$LWS, [fragment$LWS]);
        queue$LWS.delete(normalizedHref$LWS.normalizedURL);
      }
    }]);
    ReflectApply$LWS$1(XhrProtoOpen$LWS, xhr$LWS, ["GET", normalizedHref$LWS.requestedURL]);
    ReflectApply$LWS$1(XhrProtoSend$LWS, xhr$LWS, []);
  }
  function parseHref$LWS(url$LWS) {
    ReflectApply$LWS$1(HTMLAnchorElementProtoHrefSetter$LWS, normalizerAnchor$LWS, [url$LWS]);
    const href$LWS = ReflectApply$LWS$1(HTMLAnchorElementProtoHrefGetter$LWS, normalizerAnchor$LWS, []);
    const protocol$LWS = ReflectApply$LWS$1(HTMLAnchorElementProtoProtocolGetter$LWS, normalizerAnchor$LWS, []);
    const {
      0: requestedURL$LWS,
      1: requestedFragment$LWS
    } = ReflectApply$LWS$1(StringProtoSplit$LWS, href$LWS, ["#"]);
    const loweredUrl$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, requestedURL$LWS, []);
    const normalizedURL$LWS = ReflectApply$LWS$1(StringProtoReplace$LWS, loweredUrl$LWS, [urlReplacerRegExp$LWS, ""]);
    const normalizedFragment$LWS = requestedFragment$LWS ? `${normalizedURL$LWS}_${ReflectApply$LWS$1(StringProtoReplace$LWS, requestedFragment$LWS, [urlReplacerRegExp$LWS, ""])}` : "";
    return {
      normalizedFragment: normalizedFragment$LWS,
      normalizedURL: normalizedURL$LWS,
      protocol: protocol$LWS,
      requestedFragment: requestedFragment$LWS,
      requestedURL: requestedURL$LWS
    };
  }
  function uponSanitizeAttribute$LWS(node$LWS, data$LWS, _config$LWS) {
    const {
      attrValue: attrValue$LWS,
      attrName: attrName$LWS
    } = data$LWS;
    if (attrValue$LWS && ReflectApply$LWS$1(StringProtoToUpperCase$LWS, ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, node$LWS, []), []) === "USE" && SANITIZE_ATTRIBUTES_LIST$LWS.includes(attrName$LWS)) {
      data$LWS.attrValue = sanitizeSvgHref$LWS(attrValue$LWS);
    }
    if (attrName$LWS && (ReflectApply$LWS$1(StringProtoStartsWith$LWS, attrName$LWS, ["@"]) || ReflectApply$LWS$1(StringProtoStartsWith$LWS, attrName$LWS, ["."]) || ReflectApply$LWS$1(StringProtoStartsWith$LWS, attrName$LWS, ["?"]))) {
      data$LWS.forceKeepAttr = true;
    }
    return data$LWS;
  }
  function blobSanitizer$LWS(sandboxKey$LWS) {
    if (typeof sandboxKey$LWS !== "string") {
      throw new LockerSecurityError$LWS(ERR_INVALID_SANDBOX_KEY$LWS);
    }
    return getSanitizerForConfig$LWS(sandboxKey$LWS, "STRING_BLOB_HTML");
  }
  /*! version: 0.22.5 */
  /*!
   * Copyright (C) 2023 salesforce.com, inc.
   */
  const inflightRequests$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  async function getSourceText$LWS(resourceURL$LWS, targetElement$LWS) {
    abortInFlightRequest$LWS(targetElement$LWS);
    const controller$LWS = new AbortControllerCtor$LWS();
    inflightRequests$LWS.set(targetElement$LWS, controller$LWS);
    const hostname$LWS = ReflectApply$LWS$1(HTMLAnchorElementProtoHostnameGetter$LWS, normalizerAnchor$LWS, []);
    const credentials$LWS = ReflectApply$LWS$1(RegExpProtoTest$LWS$1, TRUSTED_DOMAINS_REG_EXP$LWS, [hostname$LWS]) ? "include" : "same-origin";
    const signal$LWS = ReflectApply$LWS$1(AbortControllerProtoSignalGetter$LWS, controller$LWS, []);
    const response$LWS = await WindowFetch$LWS(resourceURL$LWS, {
      __proto__: null,
      method: "GET",
      credentials: credentials$LWS,
      signal: signal$LWS
    });
    inflightRequests$LWS.delete(targetElement$LWS);
    if (!ReflectApply$LWS$1(ResponseProtoOkGetter$LWS, response$LWS, [])) {
      throw new ErrorCtor$LWS$1("Request failed.");
    }
    const sourceText$LWS = await ReflectApply$LWS$1(ResponseProtoText$LWS, response$LWS, []);
    return sourceText$LWS;
  }
  function abortInFlightRequest$LWS(element$LWS) {
    const abortController$LWS = inflightRequests$LWS.get(element$LWS);
    if (abortController$LWS) {
      ReflectApply$LWS$1(AbortControllerProtoAbort$LWS, abortController$LWS, []);
    }
  }
  const EVALUATOR_PROPERTY_KEY$LWS = "$evaluator$";
  const BLOB_SCRIPT_SOURCE$LWS = `document.currentScript['${EVALUATOR_PROPERTY_KEY$LWS}']`;
  var ContentType$LWS;
  (function(ContentType$LWS2) {
    ContentType$LWS2[ContentType$LWS2["HTML"] = 0] = "HTML";
    ContentType$LWS2[ContentType$LWS2["SVG"] = 1] = "SVG";
    ContentType$LWS2[ContentType$LWS2["XML"] = 2] = "XML";
  })(ContentType$LWS || (ContentType$LWS = {}));
  const evaluatedScripts$LWS = toSafeWeakSet$LWS$1(new WeakSetCtor$LWS$1());
  const scriptURLsCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  const htmlTemplate$LWS = ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, document, ["template"]);
  const policyOptions$LWS = {
    createHTML(dirty$LWS, lwsKey$LWS, contentType$LWS) {
      if (dirty$LWS === null || dirty$LWS === void 0) {
        return "";
      }
      if (typeof lwsKey$LWS !== "string") {
        throw new LockerSecurityError$LWS(ERR_INVALID_SANDBOX_KEY$LWS);
      }
      switch (contentType$LWS) {
        case ContentType$LWS.HTML: {
          ReflectApply$LWS$1(ElementProtoInnerHTMLSetter$LWS, htmlTemplate$LWS, [trusted.createHTML(dirty$LWS)]);
          const content$LWS = ReflectApply$LWS$1(HTMLTemplateElementProtoContentGetter$LWS, htmlTemplate$LWS, []);
          const sanitizer$LWS = getSanitizerForConfig$LWS(lwsKey$LWS, "NODE_ALL_IN_PLACE");
          sanitizer$LWS.sanitize(content$LWS);
          return ReflectApply$LWS$1(ElementProtoInnerHTMLGetter$LWS, htmlTemplate$LWS, []);
        }
        case ContentType$LWS.SVG: {
          const tplElement$LWS = ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, document, ["template"]);
          ReflectApply$LWS$1(ElementProtoInnerHTMLSetter$LWS, tplElement$LWS, [trusted.createHTML(dirty$LWS)]);
          const wrappedDirty$LWS = ReflectApply$LWS$1(DocumentProtoCreateElementNS$LWS, document, [NAMESPACE_SVG$LWS, "svg"]);
          ReflectApply$LWS$1(ElementProtoInnerHTMLSetter$LWS, wrappedDirty$LWS, [trusted.createHTML(dirty$LWS)]);
          const sanitized$LWS = getSanitizerForConfig$LWS("SHARED_SVG_SANITIZER_KEY", "NODE_SVG").sanitize(wrappedDirty$LWS);
          const firstChild$LWS = ReflectApply$LWS$1(NodeProtoFirstChildGetter$LWS, sanitized$LWS, []);
          return ReflectApply$LWS$1(ElementProtoInnerHTMLGetter$LWS, firstChild$LWS, []);
        }
        case ContentType$LWS.XML:
          return dirty$LWS;
        default:
          return "";
      }
    },
    createScript(_dirty$LWS, _evaluator$LWS) {
      return "";
    },
    createScriptURL(dirty$LWS, evaluator$LWS, targetElement$LWS) {
      const setURL$LWS = encloseSrcSetter$LWS(targetElement$LWS);
      dirty$LWS = `${dirty$LWS}`;
      if (evaluatedScripts$LWS.has(targetElement$LWS) || dirty$LWS === "" || dirty$LWS === "undefined" || dirty$LWS === "null") {
        setURL$LWS(trusted.createScriptURL(dirty$LWS));
        return dirty$LWS;
      }
      const targetElementIsConnected$LWS = ReflectApply$LWS$1(NodeProtoIsConnectedGetter$LWS, targetElement$LWS, []);
      const resolvedURL$LWS = resolveURL$LWS(dirty$LWS);
      if (targetElementIsConnected$LWS) {
        if (getURL$LWS(targetElement$LWS)) {
          evaluatedScripts$LWS.add(targetElement$LWS);
          setURL$LWS(trusted.createScriptURL(dirty$LWS));
          return dirty$LWS;
        }
        if (scriptURLsCache$LWS.has(targetElement$LWS)) {
          return "";
        }
      }
      const asyncRequest$LWS = getSourceText$LWS(resolvedURL$LWS, targetElement$LWS);
      scriptURLsCache$LWS.set(targetElement$LWS, resolvedURL$LWS);
      const safeURL$LWS = createSandboxURL$LWS();
      const onFulfill$LWS = (sourceText$LWS) => {
        ReflectDefineProperty$LWS$1(targetElement$LWS, EVALUATOR_PROPERTY_KEY$LWS, {
          __proto__: null,
          configurable: true,
          get: ReflectApply$LWS$1(FunctionProtoBind$LWS, () => {
            ReflectDeleteProperty$LWS$1(targetElement$LWS, EVALUATOR_PROPERTY_KEY$LWS);
            URLRevokeObjectURL$LWS(safeURL$LWS);
            const cachedURL$LWS = scriptURLsCache$LWS.get(targetElement$LWS);
            scriptURLsCache$LWS.delete(targetElement$LWS);
            evaluatedScripts$LWS.add(targetElement$LWS);
            setURL$LWS(trusted.createScriptURL(cachedURL$LWS));
            evaluator$LWS(sourceText$LWS);
          }, [targetElement$LWS]),
          set: void 0
        });
        setURL$LWS(trusted.createScriptURL(safeURL$LWS));
      };
      const onReject$LWS = (_error$LWS) => {
        URLRevokeObjectURL$LWS(safeURL$LWS);
        const cachedURL$LWS = scriptURLsCache$LWS.get(targetElement$LWS);
        scriptURLsCache$LWS.delete(targetElement$LWS);
        setURL$LWS(trusted.createScriptURL("blob:http://localhost/not-found"));
        const errorEventHandler$LWS = () => {
          setURL$LWS(trusted.createScriptURL(cachedURL$LWS));
          ReflectApply$LWS$1(EventTargetProtoRemoveEventListener$LWS, targetElement$LWS, ["error", errorEventHandler$LWS]);
        };
        ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, targetElement$LWS, ["error", errorEventHandler$LWS]);
      };
      ReflectApply$LWS$1(PromiseProtoThen$LWS, asyncRequest$LWS, [onFulfill$LWS, onReject$LWS]);
      return "";
    }
  };
  const lwsInternalPolicy$LWS = createPolicy("lwsInternal", policyOptions$LWS);
  function createSandboxURL$LWS() {
    return URLCreateObjectURL$LWS(new BlobCtor$LWS([BLOB_SCRIPT_SOURCE$LWS], {
      __proto__: null,
      type: "text/javascript"
    }));
  }
  function getURL$LWS(targetElement$LWS) {
    const isHTMLScriptElement$LWS = targetElement$LWS instanceof HTMLScriptElementCtor$LWS;
    if (isHTMLScriptElement$LWS) {
      return ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, targetElement$LWS, ["src"]);
    }
    const hasHref$LWS = ReflectApply$LWS$1(ElementProtoHasAttribute$LWS, targetElement$LWS, ["href"]);
    return hasHref$LWS ? ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, targetElement$LWS, ["href"]) : ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, targetElement$LWS, ["xlink:href"]);
  }
  function encloseSrcSetter$LWS(targetElement$LWS) {
    const namespaceURI$LWS = ReflectApply$LWS$1(ElementProtoNamespaceURIGetter$LWS, targetElement$LWS, []);
    const attributeNamespaceURI$LWS = namespaceURI$LWS === NAMESPACE_XHTML$LWS ? "" : NAMESPACE_XLINK$LWS;
    const attributeName$LWS = targetElement$LWS instanceof HTMLScriptElementCtor$LWS ? "src" : "href";
    return function(src$LWS2) {
      ReflectApply$LWS$1(ElementProtoSetAttributeNS$LWS, targetElement$LWS, [attributeNamespaceURI$LWS, attributeName$LWS, src$LWS2]);
    };
  }
  /*! version: 0.22.5 */
  /*!
   * Copyright (C) 2019 salesforce.com, inc.
   */
  var _rootWindow$CustomEle$LWS;
  const ERR_ILLEGAL_CONSTRUCTOR$LWS = "Illegal constructor";
  const ERR_ILLEGAL_INVOCATION$LWS = "Illegal invocation.";
  const ERR_NO_NEW_OP_HTML_ELEMENT$LWS = "Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.";
  let currentRegistry$LWS;
  let currentUpgradingInstance$LWS;
  const definitionCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  const globalRegistryCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  const pivotCtorCache$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
  const sandboxRegistryCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  const CustomElementRegistryProto$LWS = (_rootWindow$CustomEle$LWS = rootWindow$LWS$1.CustomElementRegistry) == null ? void 0 : _rootWindow$CustomEle$LWS.prototype;
  const CustomElementRegistryProtoDefine$LWS = CustomElementRegistryProto$LWS ? getUnmaskedFunction$LWS(CustomElementRegistryProto$LWS.define) : void 0;
  const CustomElementRegistryProtoWhenDefined$LWS = CustomElementRegistryProto$LWS ? getUnmaskedFunction$LWS(CustomElementRegistryProto$LWS.whenDefined) : void 0;
  const CustomElementRegistryProtoUpgrade$LWS = CustomElementRegistryProto$LWS ? getUnmaskedFunction$LWS(CustomElementRegistryProto$LWS.upgrade) : void 0;
  class VirtualRegistry$LWS {
    constructor(document$LWS, originalHTMLElementCtor$LWS = getUnmaskedFunction$LWS(ReflectApply$LWS$1(DocumentProtoDefaultViewGetter$LWS, document$LWS, []).HTMLElement)) {
      this._awaitingUpgrade = toSafeMap$LWS$1(new MapCtor$LWS$1());
      this._definedCtors = toSafeSet$LWS(new SetCtor$LWS$1());
      this._definitionByElement = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
      this._definitionByTag = toSafeMap$LWS$1(new MapCtor$LWS$1());
      this._pendingRegistryByElement = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
      this._document = document$LWS;
      this._originalHTMLElementCtor = originalHTMLElementCtor$LWS;
    }
    applyDefine(cer$LWS, args$LWS) {
      const {
        0: tagName$LWS,
        1: LocalCtor$LWS,
        2: options$LWS
      } = args$LWS;
      if (options$LWS && options$LWS.extends) {
        throw new DOMExceptionCtor$LWS$1("NotSupportedError: 'extends' key in customElements.define() options is not supported.");
      }
      if (this._definitionByTag.has(tagName$LWS)) {
        throw new DOMExceptionCtor$LWS$1(`Failed to execute 'define' on 'CustomElementRegistry': the name "${tagName$LWS}" has already been used with this registry.`);
      }
      if (this._definedCtors.has(LocalCtor$LWS)) {
        throw new DOMExceptionCtor$LWS$1("Failed to execute 'define' on 'CustomElementRegistry': this constructor has already been used with this registry.");
      }
      const definition$LWS = getDefinitionForCtor$LWS(LocalCtor$LWS);
      let PivotCtor$LWS = pivotCtorCache$LWS.get(tagName$LWS);
      if (PivotCtor$LWS === void 0) {
        PivotCtor$LWS = createPivotingClass$LWS(this._document, this._originalHTMLElementCtor, definition$LWS, tagName$LWS);
        ReflectApply$LWS$1(CustomElementRegistryProtoDefine$LWS, cer$LWS, [tagName$LWS, PivotCtor$LWS]);
      } else {
        const {
          formAssociated: formAssociated$LWS
        } = definition$LWS;
        if (PivotCtor$LWS.formAssociated !== formAssociated$LWS) {
          throw new LockerSecurityError$LWS(`Cannot create a definition for <${tagName$LWS}> with "formAssociated = ${formAssociated$LWS}". Either use "formAssociated = ${PivotCtor$LWS.formAssociated}" for this component or rename the component to not conflict with <${tagName$LWS}>`);
        }
      }
      pivotCtorCache$LWS.set(tagName$LWS, PivotCtor$LWS);
      definitionCache$LWS.set(LocalCtor$LWS, definition$LWS);
      this._definedCtors.add(LocalCtor$LWS);
      this._definitionByTag.set(tagName$LWS, definition$LWS);
      definition$LWS.PivotCtor = PivotCtor$LWS;
      const awaiting$LWS = this._awaitingUpgrade.get(tagName$LWS);
      if (awaiting$LWS) {
        awaiting$LWS.forEach((element$LWS) => {
          const originalDefinition$LWS = this._pendingRegistryByElement.get(element$LWS);
          if (originalDefinition$LWS) {
            this._pendingRegistryByElement.delete(element$LWS);
            this.upgrade(element$LWS, originalDefinition$LWS, definition$LWS);
          }
        });
      }
    }
    applyGet(cer$LWS, args$LWS) {
      const tagName$LWS = args$LWS[0];
      const definition$LWS = this._definitionByTag.get(tagName$LWS);
      return definition$LWS ? definition$LWS.LocalCtor : void 0;
    }
    applyUpgrade(cer$LWS, args$LWS) {
      const element$LWS = args$LWS[0];
      const tagName$LWS = ReflectApply$LWS$1(ElementProtoTagNameGetter$LWS, element$LWS, []);
      const tagNameLowerCased$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, tagName$LWS, []);
      const definition$LWS = this._definitionByTag.get(tagNameLowerCased$LWS);
      if (definition$LWS) {
        ReflectApply$LWS$1(CustomElementRegistryProtoUpgrade$LWS, cer$LWS, [element$LWS]);
      }
    }
    applyWhenDefined(cer$LWS, args$LWS) {
      const tagName$LWS = args$LWS[0];
      const promise$LWS = ReflectApply$LWS$1(CustomElementRegistryProtoWhenDefined$LWS, cer$LWS, args$LWS);
      return new PromiseCtor$LWS((resolve$LWS, reject$LWS) => {
        ReflectApply$LWS$1(PromiseProtoThen$LWS, promise$LWS, [() => {
          const definition$LWS = this._definitionByTag.get(tagName$LWS);
          if (definition$LWS) {
            resolve$LWS(definition$LWS.LocalCtor);
          }
        }, reject$LWS]);
      });
    }
    getDefinition(instance$LWS) {
      return this._definitionByElement.get(instance$LWS);
    }
    newCtor(instance$LWS, newTarget$LWS, originalHTMLElementCtor$LWS) {
      const pendingUpgrade$LWS = currentUpgradingInstance$LWS;
      if (pendingUpgrade$LWS) {
        currentUpgradingInstance$LWS = void 0;
        return pendingUpgrade$LWS;
      }
      const {
        constructor: LocalCtor$LWS
      } = instance$LWS;
      const definition$LWS = definitionCache$LWS.get(LocalCtor$LWS);
      if (definition$LWS === void 0 || typeof definition$LWS.PivotCtor !== "function") {
        try {
          ReflectApply$LWS$1(ElementProtoTagNameGetter$LWS, this, []);
          return instance$LWS;
        } catch (_unused$LWS) {
          return ReflectConstruct$LWS(originalHTMLElementCtor$LWS, [], newTarget$LWS);
        }
      }
      return new definition$LWS.PivotCtor(this, definition$LWS);
    }
    scheduleConnectedCallback(instance$LWS, tagName$LWS) {
      let awaiting$LWS = this._awaitingUpgrade.get(tagName$LWS);
      if (awaiting$LWS === void 0) {
        awaiting$LWS = toSafeSet$LWS(new SetCtor$LWS$1());
        this._awaitingUpgrade.set(tagName$LWS, awaiting$LWS);
      }
      awaiting$LWS.add(instance$LWS);
    }
    scheduleDisconnectedCallback(instance$LWS, tagName$LWS) {
      const awaiting$LWS = this._awaitingUpgrade.get(tagName$LWS);
      if (awaiting$LWS) {
        awaiting$LWS.delete(instance$LWS);
      }
    }
    scheduleOrUpgrade(instance$LWS, tagName$LWS, originalDefinition$LWS) {
      const definition$LWS = this._definitionByTag.get(tagName$LWS);
      if (definition$LWS) {
        this.upgrade(instance$LWS, originalDefinition$LWS, definition$LWS);
      } else {
        this._pendingRegistryByElement.set(instance$LWS, originalDefinition$LWS);
        ReflectSetPrototypeOf$LWS$1(instance$LWS, this._originalHTMLElementCtor.prototype);
      }
    }
    setDefinition(instance$LWS, definition$LWS) {
      ReflectSetPrototypeOf$LWS$1(instance$LWS, definition$LWS.LocalCtor.prototype);
      this._definitionByElement.set(instance$LWS, definition$LWS);
    }
    upgrade(instance$LWS, originalDefinition$LWS, definition$LWS) {
      const {
        LocalCtor: LocalCtor$LWS,
        connectedCallback: connectedCallback$LWS
      } = definition$LWS;
      this.setDefinition(instance$LWS, definition$LWS);
      if (definition$LWS !== originalDefinition$LWS) {
        patchAttributes$LWS(instance$LWS, originalDefinition$LWS, definition$LWS);
      }
      currentUpgradingInstance$LWS = instance$LWS;
      ReflectConstruct$LWS(LocalCtor$LWS, []);
      const tagName$LWS = ReflectApply$LWS$1(ElementProtoTagNameGetter$LWS, instance$LWS, []);
      const tagNameLowerCased$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, tagName$LWS, []);
      const awaiting$LWS = this._awaitingUpgrade.get(tagNameLowerCased$LWS);
      if (awaiting$LWS && awaiting$LWS.size) {
        triggerAttributeChangedCallbackDuringUpgrade$LWS(instance$LWS, originalDefinition$LWS);
        const needsConnectedCallback$LWS = awaiting$LWS.has(instance$LWS);
        if (needsConnectedCallback$LWS && ReflectApply$LWS$1(NodeProtoIsConnectedGetter$LWS, instance$LWS, [])) {
          if (typeof connectedCallback$LWS === "function") {
            ReflectApply$LWS$1(connectedCallback$LWS, instance$LWS, []);
          }
          awaiting$LWS.delete(instance$LWS);
          if (!awaiting$LWS.size) {
            this._awaitingUpgrade.delete(tagNameLowerCased$LWS);
          }
        }
      }
    }
  }
  function createDefinitionRecord$LWS(LocalCtor$LWS) {
    let attributeChangedCallback$LWS, formAssociatedCallback$LWS, formDisabledCallback$LWS, formResetCallback$LWS, formStateRestoreCallback$LWS;
    const {
      formAssociated: formAssociated$LWS = false,
      observedAttributes: observedAttributesIterable$LWS,
      prototype: LocalCtorProto$LWS
    } = LocalCtor$LWS;
    const {
      adoptedCallback: adoptedCallback$LWS,
      connectedCallback: connectedCallback$LWS,
      disconnectedCallback: disconnectedCallback$LWS
    } = LocalCtorProto$LWS;
    if (formAssociated$LWS) {
      ({
        formAssociatedCallback: formAssociatedCallback$LWS,
        formDisabledCallback: formDisabledCallback$LWS,
        formResetCallback: formResetCallback$LWS,
        formStateRestoreCallback: formStateRestoreCallback$LWS
      } = LocalCtorProto$LWS);
    }
    let observedAttributes$LWS = observedAttributesIterable$LWS ? [...observedAttributesIterable$LWS] : void 0;
    if (observedAttributes$LWS && !observedAttributes$LWS.length) {
      observedAttributes$LWS = void 0;
    }
    if (observedAttributes$LWS) {
      ({
        attributeChangedCallback: attributeChangedCallback$LWS
      } = LocalCtorProto$LWS);
      if (typeof attributeChangedCallback$LWS !== "function") {
        attributeChangedCallback$LWS = void 0;
        observedAttributes$LWS = void 0;
      }
    }
    return {
      LocalCtor: LocalCtor$LWS,
      PivotCtor: void 0,
      formAssociated: formAssociated$LWS,
      observedAttributes: observedAttributes$LWS,
      observedAttributesAsSet: observedAttributes$LWS ? toSafeSet$LWS(new SetCtor$LWS$1(observedAttributes$LWS)) : void 0,
      adoptedCallback: typeof adoptedCallback$LWS === "function" ? adoptedCallback$LWS : void 0,
      attributeChangedCallback: attributeChangedCallback$LWS,
      connectedCallback: typeof connectedCallback$LWS === "function" ? connectedCallback$LWS : void 0,
      disconnectedCallback: typeof disconnectedCallback$LWS === "function" ? disconnectedCallback$LWS : void 0,
      formAssociatedCallback: typeof formAssociatedCallback$LWS === "function" ? formAssociatedCallback$LWS : void 0,
      formDisabledCallback: typeof formDisabledCallback$LWS === "function" ? formDisabledCallback$LWS : void 0,
      formResetCallback: typeof formResetCallback$LWS === "function" ? formResetCallback$LWS : void 0,
      formStateRestoreCallback: typeof formStateRestoreCallback$LWS === "function" ? formStateRestoreCallback$LWS : void 0
    };
  }
  const instanceRegistryMap$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function createPivotingClass$LWS(document$LWS, originalHTMLElementCtor$LWS, originalDefinition$LWS, tagName$LWS) {
    var _a$LWS;
    return _a$LWS = class PivotCtor$LWS extends originalHTMLElementCtor$LWS {
      constructor(localRegistry$LWS, definition$LWS) {
        super();
        let instanceRegistry$LWS;
        if (localRegistry$LWS && definition$LWS) {
          instanceRegistry$LWS = localRegistry$LWS;
          localRegistry$LWS.setDefinition(this, definition$LWS);
        } else {
          instanceRegistry$LWS = getNodeRegistry$LWS(document$LWS, this) || getCurrentRegistry$LWS() || getGlobalCustomElementRegistry$LWS(document$LWS, originalHTMLElementCtor$LWS);
          instanceRegistry$LWS.scheduleOrUpgrade(this, tagName$LWS, originalDefinition$LWS);
        }
        instanceRegistryMap$LWS.set(this, instanceRegistry$LWS);
      }
      adoptedCallback() {
        const definition$LWS = instanceRegistryMap$LWS.get(this).getDefinition(this);
        const adoptedCallback$LWS = definition$LWS && definition$LWS.adoptedCallback;
        if (adoptedCallback$LWS) {
          ReflectApply$LWS$1(adoptedCallback$LWS, this, []);
        }
      }
      attributeChangedCallback(attrName$LWS, oldValue$LWS, newValue$LWS) {
        const definition$LWS = instanceRegistryMap$LWS.get(this).getDefinition(this);
        const attributeChangedCallback$LWS = definition$LWS && definition$LWS.attributeChangedCallback;
        if (attributeChangedCallback$LWS && (originalDefinition$LWS === definition$LWS || definition$LWS.observedAttributesAsSet.has(attrName$LWS))) {
          ReflectApply$LWS$1(attributeChangedCallback$LWS, this, [attrName$LWS, oldValue$LWS, newValue$LWS]);
        }
      }
      connectedCallback() {
        const instanceRegistry$LWS = instanceRegistryMap$LWS.get(this);
        const definition$LWS = instanceRegistry$LWS.getDefinition(this);
        if (definition$LWS) {
          const {
            connectedCallback: connectedCallback$LWS
          } = definition$LWS;
          if (connectedCallback$LWS) {
            ReflectApply$LWS$1(connectedCallback$LWS, this, []);
          }
        } else {
          instanceRegistry$LWS.scheduleConnectedCallback(this, tagName$LWS);
        }
      }
      disconnectedCallback() {
        const instanceRegistry$LWS = instanceRegistryMap$LWS.get(this);
        const definition$LWS = instanceRegistry$LWS.getDefinition(this);
        if (definition$LWS) {
          const {
            disconnectedCallback: disconnectedCallback$LWS
          } = definition$LWS;
          if (disconnectedCallback$LWS) {
            ReflectApply$LWS$1(disconnectedCallback$LWS, this, []);
          }
        } else {
          instanceRegistry$LWS.scheduleDisconnectedCallback(this, tagName$LWS);
        }
      }
      formAssociatedCallback(form$LWS) {
        const definition$LWS = instanceRegistryMap$LWS.get(this).getDefinition(this);
        const formAssociatedCallback$LWS = definition$LWS && definition$LWS.formAssociatedCallback;
        if (formAssociatedCallback$LWS) {
          ReflectApply$LWS$1(formAssociatedCallback$LWS, this, [form$LWS]);
        }
      }
      formDisabledCallback(disabled$LWS) {
        const definition$LWS = instanceRegistryMap$LWS.get(this).getDefinition(this);
        const formDisabledCallback$LWS = definition$LWS && definition$LWS.formDisabledCallback;
        if (formDisabledCallback$LWS) {
          ReflectApply$LWS$1(formDisabledCallback$LWS, this, [disabled$LWS]);
        }
      }
      formResetCallback() {
        const definition$LWS = instanceRegistryMap$LWS.get(this).getDefinition(this);
        const formResetCallback$LWS = definition$LWS && definition$LWS.formResetCallback;
        if (formResetCallback$LWS) {
          ReflectApply$LWS$1(formResetCallback$LWS, this, []);
        }
      }
      formStateRestoreCallback(state$LWS, reason$LWS) {
        const definition$LWS = instanceRegistryMap$LWS.get(this).getDefinition(this);
        const formStateRestoreCallback$LWS = definition$LWS && definition$LWS.formStateRestoreCallback;
        if (formStateRestoreCallback$LWS) {
          ReflectApply$LWS$1(formStateRestoreCallback$LWS, this, [state$LWS, reason$LWS]);
        }
      }
    }, _a$LWS.formAssociated = Boolean(originalDefinition$LWS.formAssociated), _a$LWS.observedAttributes = originalDefinition$LWS.observedAttributes ? shallowCloneArray$LWS(originalDefinition$LWS.observedAttributes) : [], _a$LWS;
  }
  function getCurrentRegistry$LWS() {
    const registry$LWS = currentRegistry$LWS;
    currentRegistry$LWS = void 0;
    return registry$LWS;
  }
  function getDefinitionForCtor$LWS(LocalCtor$LWS) {
    const proto$LWS = typeof LocalCtor$LWS === "function" ? LocalCtor$LWS.prototype : void 0;
    if (!isObject$LWS$1(proto$LWS)) {
      throw new TypeErrorCtor$LWS$1("Invalid custom element constructor.");
    }
    let definition$LWS = definitionCache$LWS.get(LocalCtor$LWS);
    if (definition$LWS === void 0) {
      definition$LWS = createDefinitionRecord$LWS(LocalCtor$LWS);
      definitionCache$LWS.set(LocalCtor$LWS, definition$LWS);
    }
    return definition$LWS;
  }
  function getGlobalCustomElementRegistry$LWS(document$LWS, originalHTMLElementCtor$LWS) {
    let registry$LWS = globalRegistryCache$LWS.get(document$LWS);
    if (registry$LWS) {
      return registry$LWS;
    }
    registry$LWS = new VirtualRegistry$LWS(document$LWS, originalHTMLElementCtor$LWS);
    globalRegistryCache$LWS.set(document$LWS, registry$LWS);
    return registry$LWS;
  }
  function getNodeRegistry$LWS(document$LWS, node$LWS) {
    const key$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, node$LWS, [CUSTOM_ELEMENT_REGISTRY_ATTRIBUTE_NAME$LWS]);
    if (key$LWS === null) {
      return void 0;
    }
    ReflectApply$LWS$1(ElementProtoRemoveAttribute$LWS, node$LWS, [CUSTOM_ELEMENT_REGISTRY_ATTRIBUTE_NAME$LWS]);
    const ownerDoc$LWS = ReflectApply$LWS$1(NodeProtoOwnerDocumentGetter$LWS, node$LWS, []);
    if (ownerDoc$LWS !== document$LWS) {
      return void 0;
    }
    const registries$LWS = sandboxRegistryCache$LWS.get(document$LWS);
    return registries$LWS ? registries$LWS.get(key$LWS) : void 0;
  }
  function getObservedAttributesDifference$LWS(originalDefinition$LWS, definition$LWS) {
    const {
      observedAttributes: observedAttributes$LWS
    } = definition$LWS;
    if (originalDefinition$LWS === definition$LWS || observedAttributes$LWS === void 0) {
      return void 0;
    }
    const {
      observedAttributesAsSet: originalObservedAttributesAsSet$LWS
    } = originalDefinition$LWS;
    if (originalObservedAttributesAsSet$LWS === void 0) {
      return toSafeSet$LWS(new SetCtor$LWS$1(observedAttributes$LWS));
    }
    const difference$LWS = toSafeSet$LWS(new SetCtor$LWS$1());
    for (let i$LWS = 0, {
      length: length$LWS2
    } = observedAttributes$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const attrName$LWS = observedAttributes$LWS[i$LWS];
      if (!originalObservedAttributesAsSet$LWS.has(attrName$LWS)) {
        difference$LWS.add(attrName$LWS);
      }
    }
    return difference$LWS;
  }
  function patchAttributes$LWS(instance$LWS, originalDefinition$LWS, definition$LWS) {
    const {
      attributeChangedCallback: attributeChangedCallback$LWS
    } = definition$LWS;
    if (attributeChangedCallback$LWS === void 0) {
      return;
    }
    const observedAttributesDifference$LWS = getObservedAttributesDifference$LWS(originalDefinition$LWS, definition$LWS);
    if (observedAttributesDifference$LWS === void 0) {
      return;
    }
    instance$LWS.removeAttribute = maskFunction$LWS(function removeAttribute$LWS(attrName$LWS) {
      const args$LWS = [attrName$LWS];
      if (observedAttributesDifference$LWS.has(attrName$LWS)) {
        const old$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, args$LWS);
        ReflectApply$LWS$1(ElementProtoRemoveAttribute$LWS, this, args$LWS);
        args$LWS[1] = old$LWS;
        args$LWS[2] = null;
        ReflectApply$LWS$1(attributeChangedCallback$LWS, this, args$LWS);
      } else {
        ReflectApply$LWS$1(ElementProtoRemoveAttribute$LWS, this, args$LWS);
      }
    }, ElementProtoRemoveAttribute$LWS);
    instance$LWS.setAttribute = maskFunction$LWS(function setAttribute$LWS(attrName$LWS, value$LWS) {
      const args$LWS = [attrName$LWS];
      const stringifiedValue$LWS = toString$LWS(value$LWS);
      const setAttributeArgs$LWS = [attrName$LWS, stringifiedValue$LWS];
      if (observedAttributesDifference$LWS.has(attrName$LWS)) {
        const old$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, args$LWS);
        ReflectApply$LWS$1(ElementProtoSetAttribute$LWS$1, this, setAttributeArgs$LWS);
        args$LWS[1] = old$LWS;
        args$LWS[2] = stringifiedValue$LWS;
        ReflectApply$LWS$1(attributeChangedCallback$LWS, this, args$LWS);
      } else {
        ReflectApply$LWS$1(ElementProtoSetAttribute$LWS$1, this, setAttributeArgs$LWS);
      }
    }, ElementProtoSetAttribute$LWS$1);
    instance$LWS.toggleAttribute = maskFunction$LWS(function toggleAttribute$LWS(attrName$LWS) {
      const args$LWS = [attrName$LWS];
      let returnValue$LWS;
      if (observedAttributesDifference$LWS.has(attrName$LWS)) {
        const hasAttribute$LWS = ReflectApply$LWS$1(ElementProtoHasAttribute$LWS, this, args$LWS);
        const old$LWS = hasAttribute$LWS ? ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, args$LWS) : null;
        returnValue$LWS = ReflectApply$LWS$1(ElementProtoToggleAttribute$LWS, this, args$LWS);
        args$LWS[1] = old$LWS;
        if (hasAttribute$LWS) {
          args$LWS[2] = null;
        }
        ReflectApply$LWS$1(attributeChangedCallback$LWS, this, args$LWS);
      } else {
        returnValue$LWS = ReflectApply$LWS$1(ElementProtoToggleAttribute$LWS, this, args$LWS);
      }
      return returnValue$LWS;
    }, ElementProtoToggleAttribute$LWS);
    for (const originalAttrName$LWS of observedAttributesDifference$LWS) {
      const attrPropName$LWS = HTMLElementGlobalAttributesToPropertyName$LWS[originalAttrName$LWS] || ElementAriaAttributesToPropertyName$LWS[originalAttrName$LWS] || originalAttrName$LWS;
      if (attrPropName$LWS in instance$LWS) {
        ReflectDefineProperty$LWS$1(instance$LWS, attrPropName$LWS, {
          __proto__: null,
          enumerable: true,
          configurable: true,
          get() {
            return ReflectGet$LWS(ReflectGetPrototypeOf$LWS$1(this), attrPropName$LWS, this);
          },
          set(value$LWS) {
            const oldValue$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, [originalAttrName$LWS]);
            ReflectSet$LWS(ReflectGetPrototypeOf$LWS$1(this), attrPropName$LWS, value$LWS, this);
            const newValue$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, [originalAttrName$LWS]);
            if (oldValue$LWS !== newValue$LWS) {
              ReflectApply$LWS$1(attributeChangedCallback$LWS, this, [originalAttrName$LWS, oldValue$LWS, newValue$LWS]);
            }
          }
        });
      }
    }
  }
  function patchCustomElementRegistry$LWS(globalObject$LWS, registry$LWS) {
    const {
      CustomElementRegistry: {
        prototype: globalCustomElementRegistryProto$LWS
      },
      customElements: customElements$LWS
    } = globalObject$LWS;
    const {
      define: originalDefine$LWS,
      get: originalGet$LWS,
      upgrade: originalUpgrade$LWS,
      whenDefined: originalWhenDefined$LWS
    } = globalCustomElementRegistryProto$LWS;
    globalCustomElementRegistryProto$LWS.define = maskFunction$LWS(function define$LWS(...args$LWS) {
      if (this !== customElements$LWS) {
        throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS);
      }
      return registry$LWS.applyDefine(this, args$LWS);
    }, originalDefine$LWS, createUnmaskableTraps$LWS(originalDefine$LWS));
    globalCustomElementRegistryProto$LWS.get = maskFunction$LWS(function get$LWS(...args$LWS) {
      if (this !== customElements$LWS) {
        throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS);
      }
      return registry$LWS.applyGet(this, args$LWS);
    }, originalGet$LWS, createUnmaskableTraps$LWS(originalGet$LWS));
    globalCustomElementRegistryProto$LWS.upgrade = maskFunction$LWS(function upgrade$LWS(...args$LWS) {
      if (this !== customElements$LWS) {
        throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS);
      }
      registry$LWS.applyUpgrade(this, args$LWS);
    }, originalUpgrade$LWS, createUnmaskableTraps$LWS(originalUpgrade$LWS));
    globalCustomElementRegistryProto$LWS.whenDefined = maskFunction$LWS(function whenDefined$LWS(...args$LWS) {
      if (this !== customElements$LWS) {
        return PromiseReject$LWS(new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS));
      }
      return registry$LWS.applyWhenDefined(this, args$LWS);
    }, originalWhenDefined$LWS, createUnmaskableTraps$LWS(originalWhenDefined$LWS));
  }
  function patchHTMLElement$LWS(globalObject$LWS, registry$LWS) {
    const {
      HTMLElement: originalHTMLElementCtor$LWS
    } = globalObject$LWS;
    globalObject$LWS.HTMLElement = maskFunction$LWS(function HTMLElement$LWS2() {
      if (new.target === void 0) {
        throw new TypeErrorCtor$LWS$1(ERR_NO_NEW_OP_HTML_ELEMENT$LWS);
      }
      if (new.target === HTMLElement$LWS2) {
        throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_CONSTRUCTOR$LWS);
      }
      return registry$LWS.newCtor(this, new.target, originalHTMLElementCtor$LWS);
    }, originalHTMLElementCtor$LWS, createUnmaskableTraps$LWS(originalHTMLElementCtor$LWS));
  }
  function triggerAttributeChangedCallbackDuringUpgrade$LWS(instance$LWS, originalDefinition$LWS) {
    const {
      attributeChangedCallback: attributeChangedCallback$LWS
    } = originalDefinition$LWS;
    if (attributeChangedCallback$LWS === void 0) {
      return;
    }
    const {
      observedAttributes: observedAttributes$LWS
    } = originalDefinition$LWS;
    for (let i$LWS = 0, {
      length: length$LWS2
    } = observedAttributes$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const attrName$LWS = observedAttributes$LWS[i$LWS];
      if (ReflectApply$LWS$1(ElementProtoHasAttribute$LWS, instance$LWS, [attrName$LWS])) {
        const newValue$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, instance$LWS, [attrName$LWS]);
        ReflectApply$LWS$1(attributeChangedCallback$LWS, instance$LWS, [attrName$LWS, null, newValue$LWS]);
      }
    }
  }
  function getSandboxCustomElementRegistry$LWS(document$LWS, key$LWS) {
    let registries$LWS = sandboxRegistryCache$LWS.get(document$LWS);
    if (registries$LWS === void 0) {
      registries$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
      sandboxRegistryCache$LWS.set(document$LWS, registries$LWS);
    }
    let registry$LWS = registries$LWS.get(key$LWS);
    if (registry$LWS) {
      return registry$LWS;
    }
    registry$LWS = new VirtualRegistry$LWS(document$LWS);
    registries$LWS.set(key$LWS, registry$LWS);
    return registry$LWS;
  }
  function patchGlobalObject$LWS(globalObject$LWS, document$LWS = globalObject$LWS.document) {
    const {
      HTMLElement: HTMLElementCtor$LWS
    } = globalObject$LWS;
    const isHTMLElementCtorPatched$LWS = isMaskedFunction$LWS(HTMLElementCtor$LWS);
    const isCustomElementRegistryPatched$LWS = isMaskedFunction$LWS(globalObject$LWS.CustomElementRegistry.prototype.get);
    const registry$LWS = !isHTMLElementCtorPatched$LWS || !isCustomElementRegistryPatched$LWS ? getGlobalCustomElementRegistry$LWS(document$LWS, getUnmaskedFunction$LWS(HTMLElementCtor$LWS)) : void 0;
    if (!isHTMLElementCtorPatched$LWS) {
      patchHTMLElement$LWS(globalObject$LWS, registry$LWS);
    }
    if (!isCustomElementRegistryPatched$LWS) {
      patchCustomElementRegistry$LWS(globalObject$LWS, registry$LWS);
    }
  }
  function setCustomElementsRegistry$LWS(document$LWS, key$LWS) {
    currentRegistry$LWS = getSandboxCustomElementRegistry$LWS(document$LWS, key$LWS);
  }
  const DataTransferBlockedProperties$LWS = ["mozCursor", "mozSourceNode", "mozUserCancelled"];
  const attributeDistortionFactoriesCache$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
  const sandboxAttributeDistortionRegistryCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function finalizeAttributeDistortions$LWS(record$LWS) {
    const attributeFactories$LWS = attributeDistortionFactoriesCache$LWS.get(record$LWS);
    if (attributeFactories$LWS === void 0) {
      return;
    }
    attributeDistortionFactoriesCache$LWS.delete(record$LWS);
    const {
      document: document$LWS,
      key: key$LWS
    } = record$LWS;
    let sandboxAttributeDistortionRegistry$LWS = sandboxAttributeDistortionRegistryCache$LWS.get(document$LWS);
    if (sandboxAttributeDistortionRegistry$LWS === void 0) {
      sandboxAttributeDistortionRegistry$LWS = {
        __proto__: null
      };
      sandboxAttributeDistortionRegistryCache$LWS.set(document$LWS, sandboxAttributeDistortionRegistry$LWS);
    }
    const attributeDistortionRegistry$LWS = {
      __proto__: null
    };
    sandboxAttributeDistortionRegistry$LWS[key$LWS] = attributeDistortionRegistry$LWS;
    for (let i$LWS = 0, {
      length: length$LWS2
    } = attributeFactories$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      attributeFactories$LWS[i$LWS](attributeDistortionRegistry$LWS);
    }
  }
  function getAttributeDistortion$LWS(record$LWS, element$LWS, attrName$LWS, attributeNamespace$LWS = NAMESPACE_DEFAULT$LWS) {
    const {
      document: document$LWS,
      key: key$LWS
    } = record$LWS;
    const sandboxAttributeDistortionRegistry$LWS = sandboxAttributeDistortionRegistryCache$LWS.get(document$LWS);
    if (sandboxAttributeDistortionRegistry$LWS === void 0) {
      return void 0;
    }
    const attributeDistortionRegistry$LWS = sandboxAttributeDistortionRegistry$LWS[key$LWS];
    if (attributeDistortionRegistry$LWS === void 0) {
      return void 0;
    }
    const elementCtorMapByAttributeNamespaceRegistry$LWS = attributeDistortionRegistry$LWS[ReflectApply$LWS$1(StringProtoToLowerCase$LWS, attrName$LWS, [])];
    if (elementCtorMapByAttributeNamespaceRegistry$LWS === void 0) {
      return void 0;
    }
    const elementCtorMap$LWS = elementCtorMapByAttributeNamespaceRegistry$LWS[attributeNamespace$LWS];
    if (elementCtorMap$LWS === void 0) {
      return void 0;
    }
    const mapIterator$LWS = elementCtorMap$LWS.entries();
    for (const {
      0: Ctor$LWS,
      1: distortion$LWS
    } of mapIterator$LWS) {
      if (element$LWS instanceof Ctor$LWS) {
        return distortion$LWS;
      }
    }
    return void 0;
  }
  function normalizeNamespace$LWS(ns$LWS) {
    return ns$LWS === null || ns$LWS === void 0 || ns$LWS === "" ? NAMESPACE_DEFAULT$LWS : ns$LWS;
  }
  function registerAttributeDistortion$LWS(record$LWS, ElementCtor$LWS, attributeName$LWS, attributeNamespace$LWS, distortion$LWS) {
    let attributeFactories$LWS = attributeDistortionFactoriesCache$LWS.get(record$LWS);
    if (attributeFactories$LWS === void 0) {
      attributeFactories$LWS = [];
      attributeDistortionFactoriesCache$LWS.set(record$LWS, attributeFactories$LWS);
    }
    const loweredAttributeName$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, attributeName$LWS, []);
    attributeFactories$LWS[attributeFactories$LWS.length] = (attributeDistortionRegistry$LWS) => {
      let elementCtorMapByAttributeNamespaceRegistry$LWS = attributeDistortionRegistry$LWS[loweredAttributeName$LWS];
      if (elementCtorMapByAttributeNamespaceRegistry$LWS === void 0) {
        elementCtorMapByAttributeNamespaceRegistry$LWS = {
          __proto__: null
        };
        attributeDistortionRegistry$LWS[loweredAttributeName$LWS] = elementCtorMapByAttributeNamespaceRegistry$LWS;
      }
      let elementCtorMap$LWS = elementCtorMapByAttributeNamespaceRegistry$LWS[attributeNamespace$LWS];
      if (elementCtorMap$LWS === void 0) {
        elementCtorMap$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
        elementCtorMapByAttributeNamespaceRegistry$LWS[attributeNamespace$LWS] = elementCtorMap$LWS;
      }
      elementCtorMap$LWS.set(ElementCtor$LWS, distortion$LWS);
    };
  }
  function initDistortionAttrValueSetter$LWS({
    globalObject: {
      Attr: Attr$LWS
    }
  }) {
    const originalAttrValueSetter$LWS = ObjectLookupOwnSetter$LWS(Attr$LWS.prototype, "value");
    return function distortionAttrValueSetter$LWS(record$LWS) {
      return [originalAttrValueSetter$LWS, function value$LWS(val$LWS) {
        const ownerElement$LWS = ReflectApply$LWS$1(AttrProtoOwnerElementGetter$LWS, this, []);
        if (ownerElement$LWS) {
          const attrName$LWS = ReflectApply$LWS$1(AttrProtoNameGetter$LWS, this, []);
          const attrNamespace$LWS = ReflectApply$LWS$1(AttrProtoNamespaceURIGetter$LWS, this, []);
          const normalizedNamespace$LWS = normalizeNamespace$LWS(attrNamespace$LWS);
          const distortion$LWS = getAttributeDistortion$LWS(record$LWS, ownerElement$LWS, attrName$LWS, normalizedNamespace$LWS);
          if (distortion$LWS) {
            ReflectApply$LWS$1(distortion$LWS, ownerElement$LWS, [val$LWS]);
            return;
          }
        }
        ReflectApply$LWS$1(originalAttrValueSetter$LWS, this, [val$LWS]);
      }];
    };
  }
  function initDistortionAuraUtilGlobalEval$LWS({
    UNCOMPILED_CONTEXT: UNCOMPILED_CONTEXT$LWS,
    globalObject: globalObject$LWS
  }) {
    var _globalObject$aura$LWS;
    const originalGlobalEval$LWS = (_globalObject$aura$LWS = globalObject$LWS.aura) == null || (_globalObject$aura$LWS = _globalObject$aura$LWS.util) == null ? void 0 : _globalObject$aura$LWS.globalEval;
    if (typeof originalGlobalEval$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionAuraUtilGlobalEval$LWS({
      sandboxEvaluator: sandboxEvaluator$LWS
    }) {
      return [originalGlobalEval$LWS, function globalEval$LWS(sourceText$LWS, descriptor$LWS, type$LWS) {
        let wrappedSourceText$LWS = `(function s(){return(${sourceText$LWS})})()`;
        if (typeof descriptor$LWS === "string") {
          const split$LWS = ReflectApply$LWS$1(StringProtoSplit$LWS, descriptor$LWS, ["://"]);
          const {
            length: length$LWS2
          } = split$LWS;
          const name$LWS = length$LWS2 ? split$LWS[split$LWS.length - 1] : "";
          wrappedSourceText$LWS += this.sourceComment + (type$LWS === "lib" ? `/libraries/${ReflectApply$LWS$1(StringProtoReplace$LWS, name$LWS, [".", "/"])}` : `/components/${ReflectApply$LWS$1(StringProtoReplace$LWS, name$LWS, [":", "/"])}.js`);
        }
        return sandboxEvaluator$LWS(transformSourceText$LWS(wrappedSourceText$LWS), UNCOMPILED_CONTEXT$LWS);
      }];
    };
  }
  function initDistortionBroadcastChannelPostMessage$LWS({
    globalObject: globalObject$LWS
  }) {
    const {
      BroadcastChannel: BroadcastChannel$LWS
    } = globalObject$LWS;
    if (typeof BroadcastChannel$LWS !== "function") {
      return noop$LWS$1;
    }
    const {
      prototype: {
        postMessage: originalPostMessage$LWS
      }
    } = BroadcastChannel$LWS;
    const distortionEntry$LWS = [originalPostMessage$LWS, function postMessage$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalPostMessage$LWS, this, args$LWS);
      } catch (error) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2) {
          const message$LWS = args$LWS[0];
          if (isObject$LWS$1(message$LWS)) {
            args$LWS[0] = partialStructuredClone$LWS(message$LWS);
            return ReflectApply$LWS$1(originalPostMessage$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionBroadcastChannelPostMessage$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionCacheStorageDelete$LWS({
    globalObject: {
      CacheStorage: CacheStorage$LWS
    }
  }) {
    var _CacheStorage$prototy$LWS;
    const originalDelete$LWS = CacheStorage$LWS == null || (_CacheStorage$prototy$LWS = CacheStorage$LWS.prototype) == null ? void 0 : _CacheStorage$prototy$LWS.delete;
    if (typeof originalDelete$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCacheStorageDelete$LWS({
      key: key$LWS
    }) {
      return [originalDelete$LWS, function patchedDelete$LWS(...args$LWS) {
        if (args$LWS.length) {
          const {
            0: cacheName$LWS
          } = args$LWS;
          if (isConvertibleToString$LWS(cacheName$LWS)) {
            args$LWS[0] = prependNamespaceMarker$LWS(cacheName$LWS, key$LWS);
          }
        }
        return ReflectApply$LWS$1(originalDelete$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionCacheStorageHas$LWS({
    globalObject: {
      CacheStorage: CacheStorage$LWS
    }
  }) {
    var _CacheStorage$prototy2$LWS;
    const originalHas$LWS = CacheStorage$LWS == null || (_CacheStorage$prototy2$LWS = CacheStorage$LWS.prototype) == null ? void 0 : _CacheStorage$prototy2$LWS.has;
    if (typeof originalHas$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCacheStorageHas$LWS({
      key: key$LWS
    }) {
      return [originalHas$LWS, function has$LWS(...args$LWS) {
        if (args$LWS.length) {
          const {
            0: cacheName$LWS
          } = args$LWS;
          if (isConvertibleToString$LWS(cacheName$LWS)) {
            args$LWS[0] = prependNamespaceMarker$LWS(cacheName$LWS, key$LWS);
          }
        }
        return ReflectApply$LWS$1(originalHas$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionCacheStorageKeys$LWS({
    globalObject: {
      CacheStorage: CacheStorage$LWS
    }
  }) {
    var _CacheStorage$prototy3$LWS;
    const originalKeys$LWS = CacheStorage$LWS == null || (_CacheStorage$prototy3$LWS = CacheStorage$LWS.prototype) == null ? void 0 : _CacheStorage$prototy3$LWS.keys;
    if (typeof originalKeys$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCacheStorageKeys$LWS({
      key: key$LWS
    }) {
      return [originalKeys$LWS, function keys$LWS() {
        const keysResultPromise$LWS = ReflectApply$LWS$1(originalKeys$LWS, this, []);
        return ReflectApply$LWS$1(PromiseProtoThen$LWS, keysResultPromise$LWS, [(result$LWS) => {
          const sandboxedCacheNames$LWS = [];
          for (let i$LWS = 0, j$LWS = 0, {
            length: length$LWS2
          } = result$LWS; i$LWS < length$LWS2; i$LWS += 1) {
            const cacheName$LWS = result$LWS[i$LWS];
            if (startsWithNamespaceMarker$LWS(cacheName$LWS, key$LWS)) {
              sandboxedCacheNames$LWS[j$LWS++] = removeNamespaceMarker$LWS(cacheName$LWS, key$LWS);
            }
          }
          return sandboxedCacheNames$LWS;
        }]);
      }];
    };
  }
  function initDistortionCacheStorageMatch$LWS({
    globalObject: {
      CacheStorage: CacheStorage$LWS
    }
  }) {
    var _CacheStorage$prototy4$LWS;
    const originalMatch$LWS = CacheStorage$LWS == null || (_CacheStorage$prototy4$LWS = CacheStorage$LWS.prototype) == null ? void 0 : _CacheStorage$prototy4$LWS.match;
    if (typeof originalMatch$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCacheStorageMatch$LWS({
      key: key$LWS
    }) {
      return [originalMatch$LWS, function match$LWS(...args$LWS) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (!length$LWS2) {
          return ReflectApply$LWS$1(originalMatch$LWS, this, args$LWS);
        }
        const matchOptions$LWS = length$LWS2 >= 2 ? args$LWS[1] : void 0;
        if (isObjectLike$LWS(matchOptions$LWS) && "cacheName" in matchOptions$LWS) {
          const {
            cacheName: cacheName$LWS
          } = matchOptions$LWS;
          if (isConvertibleToString$LWS(cacheName$LWS)) {
            const clonedOptions$LWS = shallowCloneOptions$LWS(matchOptions$LWS);
            clonedOptions$LWS.cacheName = prependNamespaceMarker$LWS(cacheName$LWS, key$LWS);
            args$LWS[1] = clonedOptions$LWS;
            return ReflectApply$LWS$1(originalMatch$LWS, this, args$LWS);
          }
        }
        return PromiseReject$LWS(new LockerSecurityError$LWS("caches.match() expects 'options.cacheName' to be present."));
      }];
    };
  }
  function initDistortionCacheStorageOpen$LWS({
    globalObject: {
      CacheStorage: CacheStorage$LWS
    }
  }) {
    var _CacheStorage$prototy5$LWS;
    const originalOpen$LWS = CacheStorage$LWS == null || (_CacheStorage$prototy5$LWS = CacheStorage$LWS.prototype) == null ? void 0 : _CacheStorage$prototy5$LWS.open;
    if (typeof originalOpen$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCacheStorageOpen$LWS({
      key: key$LWS
    }) {
      return [originalOpen$LWS, function open$LWS(...args$LWS) {
        if (args$LWS.length) {
          const {
            0: cacheName$LWS
          } = args$LWS;
          if (isConvertibleToString$LWS(cacheName$LWS)) {
            args$LWS[0] = prependNamespaceMarker$LWS(cacheName$LWS, key$LWS);
          }
        }
        return ReflectApply$LWS$1(originalOpen$LWS, this, args$LWS);
      }];
    };
  }
  const COOKIE_DELIMITER$LWS = "; ";
  function prefixCookieDetailsOrName$LWS(detailsOrName$LWS, namespace$LWS) {
    if (isObjectLike$LWS(detailsOrName$LWS)) {
      const clonedDetails$LWS = shallowCloneOptions$LWS(detailsOrName$LWS);
      clonedDetails$LWS.name = prependNamespaceMarker$LWS(clonedDetails$LWS.name, namespace$LWS);
      return clonedDetails$LWS;
    }
    return prependNamespaceMarker$LWS(detailsOrName$LWS, namespace$LWS);
  }
  function unprefixCookie$LWS(cookieEntry$LWS, namespace$LWS) {
    if (!startsWithNamespaceMarker$LWS(cookieEntry$LWS, namespace$LWS)) {
      return null;
    }
    const marker$LWS = getNamespaceMarker$LWS(namespace$LWS);
    const {
      length: markerLength$LWS
    } = marker$LWS;
    const pos$LWS = cookieEntry$LWS.length > markerLength$LWS && cookieEntry$LWS[markerLength$LWS] === "=" ? markerLength$LWS + 1 : markerLength$LWS;
    return ReflectApply$LWS$1(StringProtoSlice$LWS$1, cookieEntry$LWS, [pos$LWS]);
  }
  function initDistortionCookieStoreDelete$LWS({
    globalObject: {
      CookieStore: CookieStore$LWS
    }
  }) {
    var _CookieStore$prototyp$LWS;
    const originalDelete$LWS = CookieStore$LWS == null || (_CookieStore$prototyp$LWS = CookieStore$LWS.prototype) == null ? void 0 : _CookieStore$prototyp$LWS.delete;
    if (typeof originalDelete$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCookieStoreDelete$LWS({
      key: key$LWS
    }) {
      return [originalDelete$LWS, function deleteValue$LWS(...args$LWS) {
        const detailsOrName$LWS = args$LWS.length ? args$LWS[0] : void 0;
        if (detailsOrName$LWS !== null && detailsOrName$LWS !== void 0) {
          args$LWS[0] = prefixCookieDetailsOrName$LWS(detailsOrName$LWS, key$LWS);
        }
        return ReflectApply$LWS$1(originalDelete$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionCookieStoreGet$LWS({
    globalObject: {
      CookieStore: CookieStore$LWS
    }
  }) {
    var _CookieStore$prototyp2$LWS;
    const originalGet$LWS = CookieStore$LWS == null || (_CookieStore$prototyp2$LWS = CookieStore$LWS.prototype) == null ? void 0 : _CookieStore$prototyp2$LWS.get;
    if (typeof originalGet$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCookieStoreGet$LWS({
      key: key$LWS
    }) {
      return [originalGet$LWS, function get$LWS(...args$LWS) {
        const detailsOrName$LWS = args$LWS.length ? args$LWS[0] : void 0;
        if (detailsOrName$LWS !== null && detailsOrName$LWS !== void 0) {
          args$LWS[0] = prefixCookieDetailsOrName$LWS(detailsOrName$LWS, key$LWS);
        }
        const getResultPromise$LWS = ReflectApply$LWS$1(originalGet$LWS, this, args$LWS);
        return ReflectApply$LWS$1(PromiseProtoThen$LWS, getResultPromise$LWS, [(cookieListItem$LWS) => {
          if (cookieListItem$LWS) {
            const {
              name: name$LWS
            } = cookieListItem$LWS;
            if (startsWithNamespaceMarker$LWS(name$LWS, key$LWS)) {
              cookieListItem$LWS.name = removeNamespaceMarker$LWS(name$LWS, key$LWS);
              return cookieListItem$LWS;
            }
          }
          return null;
        }]);
      }];
    };
  }
  function initDistortionCookieStoreGetAll$LWS({
    globalObject: {
      CookieStore: CookieStore$LWS
    }
  }) {
    var _CookieStore$prototyp3$LWS;
    const originalGetAll$LWS = CookieStore$LWS == null || (_CookieStore$prototyp3$LWS = CookieStore$LWS.prototype) == null ? void 0 : _CookieStore$prototyp3$LWS.getAll;
    if (typeof originalGetAll$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCookieStoreGetAll$LWS({
      key: key$LWS
    }) {
      return [originalGetAll$LWS, function getAll$LWS(...args$LWS) {
        const detailsOrName$LWS = args$LWS.length ? args$LWS[0] : void 0;
        if (detailsOrName$LWS !== null && detailsOrName$LWS !== void 0) {
          args$LWS[0] = prefixCookieDetailsOrName$LWS(args$LWS[0], key$LWS);
        }
        const getAllResultPromise$LWS = ReflectApply$LWS$1(originalGetAll$LWS, this, args$LWS);
        return ReflectApply$LWS$1(PromiseProtoThen$LWS, getAllResultPromise$LWS, [(result$LWS) => {
          const sandboxedCookies$LWS = [];
          let sandboxedCookiesOffset$LWS = 0;
          for (let i$LWS = 0, {
            length: length$LWS2
          } = result$LWS; i$LWS < length$LWS2; i$LWS += 1) {
            const cookieListItem$LWS = result$LWS[i$LWS];
            if (cookieListItem$LWS) {
              const {
                name: name$LWS
              } = cookieListItem$LWS;
              if (startsWithNamespaceMarker$LWS(name$LWS, key$LWS)) {
                cookieListItem$LWS.name = removeNamespaceMarker$LWS(name$LWS, key$LWS);
                sandboxedCookies$LWS[sandboxedCookiesOffset$LWS++] = cookieListItem$LWS;
              }
            }
          }
          return sandboxedCookies$LWS;
        }]);
      }];
    };
  }
  const restrictedEventTargetRegistryBySandboxKeyRegistry$LWS = {
    __proto__: null
  };
  function isEventTargetRestricted$LWS(record$LWS, eventTarget$LWS, eventName$LWS) {
    const {
      key: key$LWS
    } = record$LWS;
    const {
      [key$LWS]: restrictedEventTargetRegistry$LWS
    } = restrictedEventTargetRegistryBySandboxKeyRegistry$LWS;
    if (restrictedEventTargetRegistry$LWS === void 0 || restrictedEventTargetRegistry$LWS[eventName$LWS] === void 0) {
      return false;
    }
    return restrictedEventTargetRegistry$LWS[eventName$LWS].has(eventTarget$LWS.constructor);
  }
  function registerEventTargetRestriction$LWS(record$LWS, EventTargetCtor$LWS, eventName$LWS) {
    if (isEventTargetRestricted$LWS(record$LWS, EventTargetCtor$LWS.prototype, eventName$LWS)) {
      return;
    }
    const {
      key: key$LWS
    } = record$LWS;
    const {
      [key$LWS]: restrictedEventTargetRegistry$LWS = {
        __proto__: null
      }
    } = restrictedEventTargetRegistryBySandboxKeyRegistry$LWS;
    const {
      [eventName$LWS]: restrictedEventTargetCtors$LWS = toSafeWeakSet$LWS$1(new WeakSetCtor$LWS$1())
    } = restrictedEventTargetRegistry$LWS;
    restrictedEventTargetCtors$LWS.add(EventTargetCtor$LWS);
    restrictedEventTargetRegistry$LWS[eventName$LWS] = restrictedEventTargetCtors$LWS;
    restrictedEventTargetRegistryBySandboxKeyRegistry$LWS[key$LWS] = restrictedEventTargetRegistry$LWS;
  }
  function createEventHandlerExceptionMessage$LWS(instanceOrProto$LWS, eventName$LWS) {
    let exceptionMessage$LWS = `Cannot set '${eventName$LWS}' event handler`;
    const safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS(instanceOrProto$LWS.constructor, "name");
    if (safeDesc$LWS) {
      ReflectSetPrototypeOf$LWS$1(safeDesc$LWS, null);
      const {
        value: name$LWS
      } = safeDesc$LWS;
      if (typeof name$LWS === "string") {
        exceptionMessage$LWS += ` on ${name$LWS} object`;
      }
    }
    return `${exceptionMessage$LWS}.`;
  }
  function createEventListenerExceptionMessage$LWS(instanceOrProto$LWS, eventName$LWS) {
    let exceptionMessage$LWS = `Cannot add '${eventName$LWS}' event listener`;
    const safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS(instanceOrProto$LWS.constructor, "name");
    if (safeDesc$LWS) {
      ReflectSetPrototypeOf$LWS$1(safeDesc$LWS, null);
      const {
        value: name$LWS
      } = safeDesc$LWS;
      if (typeof name$LWS === "string") {
        exceptionMessage$LWS += ` to ${name$LWS} object`;
      }
    }
    return `${exceptionMessage$LWS}.`;
  }
  function createEventDistortionFactory$LWS(eventHandlerTarget$LWS, eventListenerTarget$LWS, eventName$LWS) {
    const onEventHandlerName$LWS = `on${eventName$LWS}`;
    const originalEventHandlerSetter$LWS = ObjectLookupOwnSetter$LWS(eventHandlerTarget$LWS, onEventHandlerName$LWS);
    if (typeof originalEventHandlerSetter$LWS !== "function") {
      return noop$LWS$1;
    }
    const eventExceptionMessage$LWS = createEventHandlerExceptionMessage$LWS(eventHandlerTarget$LWS, onEventHandlerName$LWS);
    const distortionMapEntry$LWS = [originalEventHandlerSetter$LWS, function() {
      throw new LockerSecurityError$LWS(eventExceptionMessage$LWS);
    }];
    return function distortionEventHandler$LWS(record$LWS) {
      registerEventTargetRestriction$LWS(record$LWS, eventListenerTarget$LWS, eventName$LWS);
      return distortionMapEntry$LWS;
    };
  }
  function initDistortionCookieStoreOnChange$LWS({
    globalObject: {
      CookieStore: CookieStore$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(CookieStore$LWS == null ? void 0 : CookieStore$LWS.prototype, CookieStore$LWS, "change");
  }
  function initDistortionCookieStoreSet$LWS({
    globalObject: {
      CookieStore: CookieStore$LWS
    }
  }) {
    var _CookieStore$prototyp4$LWS;
    const originalSet$LWS = CookieStore$LWS == null || (_CookieStore$prototyp4$LWS = CookieStore$LWS.prototype) == null ? void 0 : _CookieStore$prototyp4$LWS.set;
    if (typeof originalSet$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionCookieStoreSet$LWS({
      key: key$LWS
    }) {
      return [originalSet$LWS, function set$LWS(...args$LWS) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2 > 1) {
          args$LWS[0] = prependNamespaceMarker$LWS(args$LWS[0], key$LWS);
        } else if (length$LWS2) {
          const {
            0: details$LWS
          } = args$LWS;
          if (isObjectLike$LWS(details$LWS)) {
            const clonedDetails$LWS = shallowCloneOptions$LWS(details$LWS);
            clonedDetails$LWS.name = prependNamespaceMarker$LWS(clonedDetails$LWS.name, key$LWS);
            args$LWS[0] = clonedDetails$LWS;
          }
        }
        return ReflectApply$LWS$1(originalSet$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionCSSStyleRuleStyleGetter$LWS({
    globalObject: {
      CSSStyleRule: CSSStyleRule$LWS
    }
  }) {
    const originalStyleGetter$LWS = ObjectLookupOwnGetter$LWS$1(CSSStyleRule$LWS.prototype, "style");
    const distortionEntry$LWS = [originalStyleGetter$LWS, function style$LWS() {
      return trackAsLiveTarget$LWS(ReflectApply$LWS$1(originalStyleGetter$LWS, this, []));
    }];
    return function distortionCSSStyleRuleStyleGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionCustomElementRegistryDefine$LWS({
    document: document$LWS,
    globalObject: {
      CustomElementRegistry: CustomElementRegistry$LWS,
      customElements: customElements$LWS
    }
  }) {
    var _CustomElementRegistr$LWS;
    const originalCustomElementsDefine$LWS = CustomElementRegistry$LWS == null || (_CustomElementRegistr$LWS = CustomElementRegistry$LWS.prototype) == null ? void 0 : _CustomElementRegistr$LWS.define;
    return function distortionCustomElementRegistryDefine$LWS({
      key: key$LWS
    }) {
      const registry$LWS = getSandboxCustomElementRegistry$LWS(document$LWS, key$LWS);
      return [originalCustomElementsDefine$LWS, function define$LWS(...args$LWS) {
        if (this !== customElements$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS);
        }
        return registry$LWS.applyDefine(this, args$LWS);
      }];
    };
  }
  function initDistortionCustomElementRegistryGet$LWS({
    document: document$LWS,
    globalObject: {
      CustomElementRegistry: CustomElementRegistry$LWS,
      customElements: customElements$LWS
    }
  }) {
    var _CustomElementRegistr2$LWS;
    const originalCustomElementsGet$LWS = CustomElementRegistry$LWS == null || (_CustomElementRegistr2$LWS = CustomElementRegistry$LWS.prototype) == null ? void 0 : _CustomElementRegistr2$LWS.get;
    return function distortionCustomElementRegistryGet$LWS({
      key: key$LWS
    }) {
      const registry$LWS = getSandboxCustomElementRegistry$LWS(document$LWS, key$LWS);
      return [originalCustomElementsGet$LWS, function get$LWS(...args$LWS) {
        if (this !== customElements$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS);
        }
        return registry$LWS.applyGet(this, args$LWS);
      }];
    };
  }
  function initDistortionCustomElementRegistryUpgrade$LWS({
    document: document$LWS,
    globalObject: {
      CustomElementRegistry: CustomElementRegistry$LWS,
      customElements: customElements$LWS
    }
  }) {
    var _CustomElementRegistr3$LWS;
    const originalCustomElementsUpgrade$LWS = CustomElementRegistry$LWS == null || (_CustomElementRegistr3$LWS = CustomElementRegistry$LWS.prototype) == null ? void 0 : _CustomElementRegistr3$LWS.upgrade;
    return function distortionCustomElementRegistryUpgrade$LWS({
      key: key$LWS
    }) {
      const registry$LWS = getSandboxCustomElementRegistry$LWS(document$LWS, key$LWS);
      return [originalCustomElementsUpgrade$LWS, function upgrade$LWS(...args$LWS) {
        if (this !== customElements$LWS) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS);
        }
        registry$LWS.applyUpgrade(this, args$LWS);
      }];
    };
  }
  function initDistortionCustomElementRegistryWhenDefined$LWS({
    document: document$LWS,
    globalObject: {
      CustomElementRegistry: CustomElementRegistry$LWS,
      customElements: customElements$LWS
    }
  }) {
    var _CustomElementRegistr4$LWS;
    const originalCustomElementsWhenDefined$LWS = CustomElementRegistry$LWS == null || (_CustomElementRegistr4$LWS = CustomElementRegistry$LWS.prototype) == null ? void 0 : _CustomElementRegistr4$LWS.whenDefined;
    return function distortionCustomElementRegistryWhenDefined$LWS({
      key: key$LWS
    }) {
      const registry$LWS = getSandboxCustomElementRegistry$LWS(document$LWS, key$LWS);
      return [originalCustomElementsWhenDefined$LWS, function whenDefined$LWS(...args$LWS) {
        if (this !== customElements$LWS) {
          return PromiseReject$LWS(new TypeErrorCtor$LWS$1(ERR_ILLEGAL_INVOCATION$LWS));
        }
        return registry$LWS.applyWhenDefined(this, args$LWS);
      }];
    };
  }
  function initDistortionDocumentCookieGetter$LWS({
    globalObject: {
      Document: Document$LWS
    }
  }) {
    const originalCookieGetter$LWS = ObjectLookupOwnGetter$LWS$1(Document$LWS.prototype, "cookie");
    return function distortionDocumentCookieGetter$LWS({
      key: key$LWS
    }) {
      return [originalCookieGetter$LWS, function get$LWS() {
        const documentCookieValue$LWS = ReflectApply$LWS$1(DocumentProtoCookieGetter$LWS, this, []);
        const cookies$LWS = ReflectApply$LWS$1(StringProtoSplit$LWS, documentCookieValue$LWS, [COOKIE_DELIMITER$LWS]);
        const sandboxedCookies$LWS = [];
        let sandboxedCookiesOffset$LWS = 0;
        for (let i$LWS = 0, {
          length: length$LWS2
        } = cookies$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const cookie$LWS = unprefixCookie$LWS(cookies$LWS[i$LWS], key$LWS);
          if (cookie$LWS) {
            sandboxedCookies$LWS[sandboxedCookiesOffset$LWS++] = cookie$LWS;
          }
        }
        return ReflectApply$LWS$1(ArrayProtoJoin$LWS$1, sandboxedCookies$LWS, [COOKIE_DELIMITER$LWS]);
      }];
    };
  }
  function initDistortionDocumentCookieSetter$LWS({
    globalObject: {
      Document: Document$LWS
    }
  }) {
    const originalCookieSetter$LWS = ObjectLookupOwnSetter$LWS(Document$LWS.prototype, "cookie");
    return function distortionDocumentCookieSetter$LWS({
      key: key$LWS
    }) {
      return [originalCookieSetter$LWS, function set$LWS(value$LWS) {
        const cookieEntries$LWS = ReflectApply$LWS$1(StringProtoSplit$LWS, value$LWS, [COOKIE_DELIMITER$LWS]);
        let {
          0: newCookieEntry$LWS
        } = cookieEntries$LWS;
        if (newCookieEntry$LWS.length && newCookieEntry$LWS[0] === "=") {
          newCookieEntry$LWS = ReflectApply$LWS$1(StringProtoSlice$LWS$1, newCookieEntry$LWS, [1]);
        }
        cookieEntries$LWS[0] = prependNamespaceMarker$LWS(newCookieEntry$LWS, key$LWS);
        const cookie$LWS = ReflectApply$LWS$1(ArrayProtoJoin$LWS$1, cookieEntries$LWS, [COOKIE_DELIMITER$LWS]);
        ReflectApply$LWS$1(DocumentProtoCookieSetter$LWS, this, [cookie$LWS]);
      }];
    };
  }
  function initDistortionDocumentCreateElement$LWS({
    document: document$LWS,
    globalObject: {
      Document: {
        prototype: {
          createElement: originalDocumentCreateElement$LWS
        }
      }
    }
  }) {
    return function distortionDocumentCreateElement$LWS({
      key: key$LWS
    }) {
      return [originalDocumentCreateElement$LWS, function(...args$LWS) {
        const {
          0: tagName$LWS
        } = args$LWS;
        if (ReflectApply$LWS$1(StringProtoIncludes$LWS, tagName$LWS, ["-"])) {
          setCustomElementsRegistry$LWS(document$LWS, key$LWS);
        }
        return ReflectApply$LWS$1(originalDocumentCreateElement$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionDocumentCreateElementNS$LWS({
    document: document$LWS,
    globalObject: {
      Document: {
        prototype: {
          createElementNS: originalDocumentCreateElementNS$LWS
        }
      }
    }
  }) {
    return function distortionDocumentCreateElementNS$LWS({
      key: key$LWS
    }) {
      return [originalDocumentCreateElementNS$LWS, function(...args$LWS) {
        const {
          1: tagName$LWS
        } = args$LWS;
        if (ReflectApply$LWS$1(StringProtoIncludes$LWS, tagName$LWS, ["-"])) {
          setCustomElementsRegistry$LWS(document$LWS, key$LWS);
        }
        return ReflectApply$LWS$1(originalDocumentCreateElementNS$LWS, this, args$LWS);
      }];
    };
  }
  function domain$LWS() {
    throw new LockerSecurityError$LWS("Cannot set document.domain.");
  }
  function initDistortionDocumentDomainSetter$LWS({
    globalObject: {
      Document: Document$LWS
    }
  }) {
    const originalDomainSetter$LWS = ObjectLookupOwnSetter$LWS(Document$LWS.prototype, "domain");
    const distortionEntry$LWS = [originalDomainSetter$LWS, domain$LWS];
    return function distortionDocumentDomainSetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$r$LWS
  } = rootValidator$LWS;
  function throwLockerSecurityError$LWS(command$LWS, target$LWS) {
    throw new LockerSecurityError$LWS(`Cannot execute command '${command$LWS}' on ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, target$LWS, [])}.`);
  }
  function initDistortionDocumentExecCommand$LWS({
    document: document$LWS,
    globalObject: {
      Document: {
        prototype: {
          execCommand: originalExecCommand$LWS
        }
      },
      HTMLElement: HTMLElement$LWS2
    }
  }) {
    const originalActiveElement$LWS = ObjectLookupOwnGetter$LWS$1(Document.prototype, "activeElement");
    const originalIsContentEditable$LWS = ObjectLookupOwnGetter$LWS$1(HTMLElement$LWS2.prototype, "isContentEditable");
    return function distortionDocumentExecCommand$LWS({
      key: key$LWS,
      type: type$LWS
    }) {
      return [originalExecCommand$LWS, function execCommand$LWS(...args$LWS) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2 >= 1) {
          const command$LWS = toString$LWS(args$LWS[0]);
          const loweredCommand$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, command$LWS, []);
          if (loweredCommand$LWS === "selectall" && this === rootDocument$LWS) {
            throwLockerSecurityError$LWS(command$LWS, this);
          }
          args$LWS[0] = command$LWS;
          if (length$LWS2 > 2) {
            const {
              2: unsanitizedValue$LWS
            } = args$LWS;
            if (unsanitizedValue$LWS !== null && unsanitizedValue$LWS !== void 0) {
              if (loweredCommand$LWS === "inserthtml") {
                if (type$LWS === 0) {
                  const activeElement$LWS = ReflectApply$LWS$1(originalActiveElement$LWS, this, []);
                  if (isSharedElement$r$LWS(activeElement$LWS) && ReflectApply$LWS$1(originalIsContentEditable$LWS, activeElement$LWS, [])) {
                    throwLockerSecurityError$LWS(command$LWS, activeElement$LWS);
                  }
                }
                setCustomElementsRegistry$LWS(document$LWS, key$LWS);
                args$LWS[0] = command$LWS;
                args$LWS[2] = lwsInternalPolicy$LWS.createHTML(unsanitizedValue$LWS, key$LWS, ContentType$LWS.HTML);
              }
            }
          }
        }
        return ReflectApply$LWS$1(originalExecCommand$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionDocumentOnsecuritypolicyviolation$LWS({
    globalObject: {
      Document: {
        prototype: DocumentProto$LWS2
      },
      HTMLDocument: HTMLDocument$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(DocumentProto$LWS2, HTMLDocument$LWS, "securitypolicyviolation");
  }
  function initDistortionDocumentOpen$LWS({
    globalObject: {
      Document: {
        prototype: {
          open: originalDocumentOpen$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalDocumentOpen$LWS, function open$LWS(...args$LWS) {
      const {
        length: length$LWS2
      } = args$LWS;
      if (this === rootDocument$LWS && length$LWS2 < 3) {
        throw new LockerSecurityError$LWS(`Cannot open top level document.`);
      }
      if (length$LWS2 >= 3) {
        const normalizedArgs$LWS = normalizeWindowOpenArguments$LWS(args$LWS);
        const childWindow$LWS = ReflectApply$LWS$1(originalDocumentOpen$LWS, this, normalizedArgs$LWS);
        markForUnsafePropertyBlocking$LWS(childWindow$LWS);
        if (childWindow$LWS) {
          initWindowOpenChildWindow$LWS(childWindow$LWS, normalizedArgs$LWS[0]);
        }
        return childWindow$LWS;
      }
      return ReflectApply$LWS$1(originalDocumentOpen$LWS, this, args$LWS);
    }];
    return function distortionDocumentOpen$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionDocumentReplaceChildren$LWS({
    globalObject: {
      Document: {
        prototype: {
          replaceChildren: originalReplaceChild$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalReplaceChild$LWS, function replaceChildren$LWS(...args$LWS) {
      if (this === rootDocument$LWS) {
        throw new LockerSecurityError$LWS(`Cannot replace children of document.`);
      }
      return ReflectApply$LWS$1(originalReplaceChild$LWS, this, args$LWS);
    }];
    return function distortionDocumentReplaceChildren$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionDOMParserParseFromString$LWS({
    document: document$LWS,
    globalObject: globalObject$LWS,
    globalObject: {
      DOMParser: {
        prototype: {
          parseFromString: originalParseFromString$LWS
        }
      }
    }
  }) {
    return function distortionDOMParserParseFromString$LWS({
      key: key$LWS
    }) {
      return [originalParseFromString$LWS, function parseFromString$LWS(...args$LWS) {
        const {
          isInherentlyUnsecure: isInherentlyUnsecure$LWS2
        } = getValidator$LWS(document$LWS, globalObject$LWS);
        if (args$LWS.length >= 2) {
          const string$LWS = toString$LWS(args$LWS[0]);
          const mimeType$LWS = toString$LWS(args$LWS[1]);
          let contentType$LWS;
          switch (mimeType$LWS) {
            case "application/xhtml+xml":
            case "application/xml":
            case "text/xml":
              contentType$LWS = ContentType$LWS.XML;
              break;
            case "image/svg+xml":
              contentType$LWS = ContentType$LWS.SVG;
              break;
            default:
              contentType$LWS = ContentType$LWS.HTML;
          }
          if (contentType$LWS === ContentType$LWS.XML) {
            if (isInherentlyUnsecure$LWS2(string$LWS)) {
              throw new LockerSecurityError$LWS(`Cannot 'parseFromString' using an unsecure ${toSafeTemplateStringValue$LWS(string$LWS)}.`);
            }
          }
          setCustomElementsRegistry$LWS(document$LWS, key$LWS);
          args$LWS[0] = lwsInternalPolicy$LWS.createHTML(string$LWS, key$LWS, contentType$LWS);
        }
        return ReflectApply$LWS$1(originalParseFromString$LWS, this, args$LWS);
      }];
    };
  }
  const {
    isSharedElement: isSharedElement$q$LWS,
    isAllowedSharedElementChild: isAllowedSharedElementChild$6$LWS
  } = rootValidator$LWS;
  function initDistortionElementAfter$LWS({
    globalObject: {
      Element: {
        prototype: {
          after: originalAfter$LWS
        }
      },
      Node: Node$LWS
    }
  }) {
    const distortionEntry$LWS = [originalAfter$LWS, function after$LWS(...args$LWS) {
      if (isSharedElement$q$LWS(this)) {
        for (let i$LWS = 0, {
          length: length$LWS2
        } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const argValue$LWS = args$LWS[i$LWS];
          if (!isAllowedSharedElementChild$6$LWS(argValue$LWS)) {
            const nodeNameOrString$LWS = argValue$LWS instanceof Node$LWS ? ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, argValue$LWS, []) : toString$LWS(argValue$LWS);
            throw new LockerSecurityError$LWS(`Cannot insert ${nodeNameOrString$LWS} after ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
          }
        }
      }
      return ReflectApply$LWS$1(originalAfter$LWS, this, args$LWS);
    }];
    return function distortionElementAfter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$p$LWS,
    isAllowedSharedElementChild: isAllowedSharedElementChild$5$LWS
  } = rootValidator$LWS;
  function initDistortionElementAppend$LWS({
    globalObject: {
      Element: {
        prototype: {
          append: originalAppend$LWS
        }
      },
      Node: Node$LWS
    }
  }) {
    const distortionEntry$LWS = [originalAppend$LWS, function append$LWS(...args$LWS) {
      if (isSharedElement$p$LWS(this)) {
        for (let i$LWS = 0, {
          length: length$LWS2
        } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const argValue$LWS = args$LWS[i$LWS];
          if (!isAllowedSharedElementChild$5$LWS(argValue$LWS)) {
            const nodeNameOrString$LWS = argValue$LWS instanceof Node$LWS ? ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, argValue$LWS, []) : toString$LWS(argValue$LWS);
            throw new LockerSecurityError$LWS(`Cannot append ${nodeNameOrString$LWS} to ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
          }
        }
      }
      return ReflectApply$LWS$1(originalAppend$LWS, this, args$LWS);
    }];
    return function distortionElementAppend$LWS() {
      return distortionEntry$LWS;
    };
  }
  const elementShadowRootBySandboxKeyRegistry$LWS = {
    __proto__: null
  };
  function registerShadowRootInSandbox$LWS(sandboxKey$LWS, shadowRoot$LWS) {
    const {
      [sandboxKey$LWS]: elementShadowRootRegistry$LWS = toSafeWeakSet$LWS$1(new WeakSetCtor$LWS$1())
    } = elementShadowRootBySandboxKeyRegistry$LWS;
    elementShadowRootRegistry$LWS.add(shadowRoot$LWS);
    if (!elementShadowRootBySandboxKeyRegistry$LWS[sandboxKey$LWS]) {
      elementShadowRootBySandboxKeyRegistry$LWS[sandboxKey$LWS] = elementShadowRootRegistry$LWS;
    }
  }
  function isShadowRootAccessibleInThisSandbox$LWS(sandboxKey$LWS, shadowRoot$LWS) {
    const elementShadowRootRegistry$LWS = elementShadowRootBySandboxKeyRegistry$LWS[sandboxKey$LWS];
    if (!elementShadowRootRegistry$LWS) {
      return false;
    }
    return elementShadowRootRegistry$LWS.has(shadowRoot$LWS);
  }
  function initDistortionElementAttachShadow$LWS({
    globalObject: {
      Element: {
        prototype: {
          attachShadow: originalAttachShadow$LWS
        }
      }
    }
  }) {
    return function distortionElementAttachShadow$LWS({
      key: key$LWS
    }) {
      return [originalAttachShadow$LWS, function attachShadow$LWS(...args$LWS) {
        const shadowRoot$LWS = ReflectApply$LWS$1(originalAttachShadow$LWS, this, args$LWS);
        registerShadowRootInSandbox$LWS(key$LWS, shadowRoot$LWS);
        return shadowRoot$LWS;
      }];
    };
  }
  const namedNodeMapToElementCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function pairElement$LWS(attrInstance$LWS, element$LWS) {
    namedNodeMapToElementCache$LWS.set(attrInstance$LWS, element$LWS);
  }
  function setNamedItemWithAttr$LWS(record$LWS, originalMethod$LWS, nodeNameMap$LWS, attr$LWS) {
    const element$LWS = namedNodeMapToElementCache$LWS.get(nodeNameMap$LWS);
    if (element$LWS) {
      const attrName$LWS = ReflectApply$LWS$1(AttrProtoNameGetter$LWS, attr$LWS, []);
      const attrNamespace$LWS = ReflectApply$LWS$1(AttrProtoNamespaceURIGetter$LWS, attr$LWS, []);
      const normalizedNamespace$LWS = normalizeNamespace$LWS(attrNamespace$LWS);
      const distortion$LWS = getAttributeDistortion$LWS(record$LWS, element$LWS, attrName$LWS, normalizedNamespace$LWS);
      if (distortion$LWS) {
        const attrValue$LWS = ReflectApply$LWS$1(AttrProtoValueGetter$LWS, attr$LWS, []);
        return ReflectApply$LWS$1(distortion$LWS, element$LWS, [attrValue$LWS]);
      }
    }
    return ReflectApply$LWS$1(originalMethod$LWS, nodeNameMap$LWS, [attr$LWS]);
  }
  function initDistortionElementAttributesGetter$LWS({
    globalObject: {
      Element: Element$LWS
    }
  }) {
    const originalAttributesGetter$LWS = ObjectLookupOwnGetter$LWS$1(Element$LWS.prototype, "attributes");
    const distortionEntry$LWS = [originalAttributesGetter$LWS, function attributes$LWS() {
      const attrs$LWS = ReflectApply$LWS$1(originalAttributesGetter$LWS, this, []);
      pairElement$LWS(attrs$LWS, this);
      return attrs$LWS;
    }];
    return function distortionElementAttributesGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$o$LWS,
    isAllowedSharedElementChild: isAllowedSharedElementChild$4$LWS
  } = rootValidator$LWS;
  function initDistortionElementBefore$LWS({
    globalObject: {
      Element: {
        prototype: {
          before: originalBefore$LWS
        }
      },
      Node: Node$LWS
    }
  }) {
    const distortionEntry$LWS = [originalBefore$LWS, function before$LWS(...args$LWS) {
      if (isSharedElement$o$LWS(this)) {
        for (let i$LWS = 0, {
          length: length$LWS2
        } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const argValue$LWS = args$LWS[i$LWS];
          if (!isAllowedSharedElementChild$4$LWS(argValue$LWS)) {
            const nodeNameOrString$LWS = argValue$LWS instanceof Node$LWS ? ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, argValue$LWS, []) : toString$LWS(argValue$LWS);
            throw new LockerSecurityError$LWS(`Cannot insert ${nodeNameOrString$LWS} before ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
          }
        }
      }
      return ReflectApply$LWS$1(originalBefore$LWS, this, args$LWS);
    }];
    return function distortionElementBefore$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionElementGetInnerHTML$LWS({
    globalObject: {
      Element: {
        prototype: {
          getInnerHTML: originalGetInnerHTML$LWS
        }
      }
    }
  }) {
    if (typeof originalGetInnerHTML$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalGetInnerHTML$LWS, function getInnerHTML$LWS(...args$LWS) {
      if (args$LWS.length) {
        const {
          0: options$LWS
        } = args$LWS;
        if (isObjectLike$LWS(options$LWS)) {
          const clonedOptions$LWS = shallowCloneOptions$LWS(options$LWS);
          clonedOptions$LWS.includeShadowRoots = false;
          args$LWS[0] = clonedOptions$LWS;
        } else {
          args$LWS[0] = {
            __proto__: null,
            includeShadowRoots: false
          };
        }
      } else {
        args$LWS[0] = {
          __proto__: null,
          includeShadowRoots: false
        };
      }
      return ReflectApply$LWS$1(originalGetInnerHTML$LWS, this, args$LWS);
    }];
    return function distortionElementGetInnerHTML$LWS() {
      return distortionEntry$LWS;
    };
  }
  function scriptPropertySetters$LWS(incomingThis$LWS, property$LWS, valueAsTrustedString$LWS, originalScriptPropertyGetter$LWS, originalScriptPropertySetter$LWS, distortions$LWS, sandboxEvaluator$LWS, signedScriptHookSourceText$LWS) {
    const valueAsString$LWS = toString$LWS(valueAsTrustedString$LWS);
    if (!isScriptPropertyEvaluatorHookDefined$LWS(incomingThis$LWS)) {
      const distortedScriptPropertyGetter$LWS = distortions$LWS.get(originalScriptPropertyGetter$LWS);
      defineScriptAccessorProperty$LWS(incomingThis$LWS, property$LWS, distortedScriptPropertyGetter$LWS, originalScriptPropertySetter$LWS);
    }
    setOriginalScriptScriptProperty$LWS(incomingThis$LWS, valueAsString$LWS);
    if (!isScriptEvaluated$LWS(incomingThis$LWS)) {
      if (!isScriptURLEvaluatorHookDefined$LWS(incomingThis$LWS)) {
        defineScriptEvaluatorProperty$LWS(incomingThis$LWS, (context$LWS, defaultView$LWS, ownerDoc$LWS) => {
          deleteOriginalScriptProperty$LWS(incomingThis$LWS);
          ReflectDeleteProperty$LWS$1(incomingThis$LWS, property$LWS);
          ReflectApply$LWS$1(originalScriptPropertySetter$LWS, incomingThis$LWS, [valueAsTrustedString$LWS]);
          sandboxEvaluator$LWS(transformSourceText$LWS(valueAsString$LWS), context$LWS, defaultView$LWS, ownerDoc$LWS);
        });
        ReflectApply$LWS$1(originalScriptPropertySetter$LWS, incomingThis$LWS, [signedScriptHookSourceText$LWS]);
      }
      return true;
    }
    return false;
  }
  const {
    isInherentlyUnsecure: isInherentlyUnsecure$3$LWS,
    isSharedElement: isSharedElement$n$LWS
  } = rootValidator$LWS;
  function initDistortionElementInnerHTMLSetter$LWS({
    document: document$LWS,
    globalObject: {
      Element: Element$LWS,
      HTMLScriptElement: HTMLScriptElement$LWS,
      SVGElement: SVGElement$LWS,
      XMLDocument: XMLDocument$LWS
    },
    root: {
      distortions: distortions$LWS
    }
  }) {
    const {
      get: originalInnerHTMLGetter$LWS,
      set: originalInnerHTMLSetter$LWS
    } = ReflectGetOwnPropertyDescriptor$LWS(Element$LWS.prototype, "innerHTML");
    return function distortionElementInnerHTMLSetter$LWS({
      key: key$LWS,
      sandboxEvaluator: sandboxEvaluator$LWS
    }) {
      return [originalInnerHTMLSetter$LWS, function innerHTML$LWS(value$LWS) {
        const isOwnerXMLDocument$LWS = ReflectApply$LWS$1(NodeProtoOwnerDocumentGetter$LWS, this, []) instanceof XMLDocument$LWS;
        if (!isOwnerXMLDocument$LWS) {
          if (isSharedElement$n$LWS(this)) {
            throw new LockerSecurityError$LWS(`Cannot set innerHTML of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
          }
          if (this instanceof HTMLScriptElement$LWS || this instanceof SVGScriptElement) {
            const scriptWasNotEvaluatedInScriptPropertySetter$LWS = scriptPropertySetters$LWS(this, "innerHTML", trusted.createScript(value$LWS), originalInnerHTMLGetter$LWS, originalInnerHTMLSetter$LWS, distortions$LWS, sandboxEvaluator$LWS, trusted.createScript(SCRIPT_HOOK_SOURCE_TEXT$LWS));
            if (scriptWasNotEvaluatedInScriptPropertySetter$LWS) {
              return;
            }
          }
          setCustomElementsRegistry$LWS(document$LWS, key$LWS);
          const contentType$LWS = this instanceof SVGElement$LWS ? ContentType$LWS.SVG : ContentType$LWS.HTML;
          value$LWS = lwsInternalPolicy$LWS.createHTML(value$LWS, key$LWS, contentType$LWS);
        }
        if (isInherentlyUnsecure$3$LWS(value$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot set 'innerHTML' using an unsecure ${toSafeTemplateStringValue$LWS(value$LWS)}.`);
        }
        ReflectApply$LWS$1(originalInnerHTMLSetter$LWS, this, [value$LWS]);
      }];
    };
  }
  const {
    isSharedElement: isSharedElement$m$LWS,
    isAllowedSharedElementChild: isAllowedSharedElementChild$3$LWS
  } = rootValidator$LWS;
  function initDistortionElementInsertAdjacentElement$LWS({
    globalObject: {
      Element: {
        prototype: {
          insertAdjacentElement: originalInsertAdjacentElement$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalInsertAdjacentElement$LWS, function insertAdjacentElement$LWS(...args$LWS) {
      if (args$LWS.length > 1) {
        const {
          1: element$LWS
        } = args$LWS;
        if (isSharedElement$m$LWS(this) && !isAllowedSharedElementChild$3$LWS(element$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot insert ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, element$LWS, [])} adjacent to ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
        }
      }
      return ReflectApply$LWS$1(originalInsertAdjacentElement$LWS, this, args$LWS);
    }];
    return function distortionElementInsertAdjacentElement$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isInherentlyUnsecure: isInherentlyUnsecure$2$LWS,
    isSharedElement: isSharedElement$l$LWS
  } = rootValidator$LWS;
  const allowedElementHTMLRegExp$LWS = /^\s*<(link|script|style)/i;
  function initDistortionElementInsertAdjacentHTML$LWS({
    document: document$LWS,
    globalObject: {
      Element: {
        prototype: {
          insertAdjacentHTML: originalInsertAdjacentHTML$LWS
        }
      }
    }
  }) {
    return function distortionElementInsertAdjacentHTML$LWS({
      key: key$LWS
    }) {
      return [originalInsertAdjacentHTML$LWS, function insertAdjacentHTML$LWS(...args$LWS) {
        if (args$LWS.length > 1) {
          const match$LWS = ReflectApply$LWS$1(StringProtoMatch$LWS, args$LWS[1], [allowedElementHTMLRegExp$LWS]);
          if (isSharedElement$l$LWS(this) && match$LWS === null) {
            throw new LockerSecurityError$LWS(`Cannot insert adjacent HTML to ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}`);
          }
          setCustomElementsRegistry$LWS(document$LWS, key$LWS);
          const contentType$LWS = this instanceof SVGElement ? ContentType$LWS.SVG : ContentType$LWS.HTML;
          args$LWS[1] = lwsInternalPolicy$LWS.createHTML(args$LWS[1], key$LWS, contentType$LWS);
          if (isInherentlyUnsecure$2$LWS(args$LWS[1])) {
            throw new LockerSecurityError$LWS(`Cannot 'insertAdjacentHTML' using an unsecure ${toSafeTemplateStringValue$LWS(args$LWS[1])}.`);
          }
        }
        ReflectApply$LWS$1(originalInsertAdjacentHTML$LWS, this, args$LWS);
      }];
    };
  }
  const {
    isInherentlyUnsecure: isInherentlyUnsecure$1$LWS,
    isSharedElement: isSharedElement$k$LWS
  } = rootValidator$LWS;
  function initDistortionElementOuterHTMLSetter$LWS({
    document: document$LWS,
    globalObject: {
      Element: Element$LWS
    }
  }) {
    const originalOuterHTMLSetter$LWS = ObjectLookupOwnSetter$LWS(Element$LWS.prototype, "outerHTML");
    return function distortionElementOuterHTMLSetter$LWS({
      key: key$LWS
    }) {
      return [originalOuterHTMLSetter$LWS, function outerHTML$LWS(value$LWS) {
        if (isSharedElement$k$LWS(this)) {
          throw new LockerSecurityError$LWS(`Cannot set outerHTML of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
        }
        setCustomElementsRegistry$LWS(document$LWS, key$LWS);
        const html$LWS = lwsInternalPolicy$LWS.createHTML(value$LWS, key$LWS, ContentType$LWS.HTML);
        if (isInherentlyUnsecure$1$LWS(html$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot set 'outerHTML' using an unsecure ${toSafeTemplateStringValue$LWS(html$LWS)}.`);
        }
        ReflectApply$LWS$1(originalOuterHTMLSetter$LWS, this, [html$LWS]);
      }];
    };
  }
  const {
    isSharedElement: isSharedElement$j$LWS,
    isAllowedSharedElementChild: isAllowedSharedElementChild$2$LWS
  } = rootValidator$LWS;
  function initDistortionElementPrepend$LWS({
    globalObject: {
      Element: {
        prototype: {
          prepend: originalPrepend$LWS
        }
      },
      Node: Node$LWS
    }
  }) {
    const distortionEntry$LWS = [originalPrepend$LWS, function prepend$LWS(...args$LWS) {
      if (isSharedElement$j$LWS(this)) {
        for (let i$LWS = 0, {
          length: length$LWS2
        } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const argValue$LWS = args$LWS[i$LWS];
          if (!isAllowedSharedElementChild$2$LWS(argValue$LWS)) {
            const nodeNameOrString$LWS = argValue$LWS instanceof Node$LWS ? ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, argValue$LWS, []) : toString$LWS(argValue$LWS);
            throw new LockerSecurityError$LWS(`Cannot prepend ${nodeNameOrString$LWS} to ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
          }
        }
      }
      return ReflectApply$LWS$1(originalPrepend$LWS, this, args$LWS);
    }];
    return function distortionElementPrepend$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$i$LWS
  } = rootValidator$LWS;
  function initDistortionElementRemove$LWS({
    globalObject: {
      Element: {
        prototype: {
          remove: originalRemove$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalRemove$LWS, function remove$LWS() {
      if (isSharedElement$i$LWS(this)) {
        throw new LockerSecurityError$LWS(`Cannot remove ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
      }
      ReflectApply$LWS$1(originalRemove$LWS, this, []);
    }];
    return function distortionElementRemove$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$h$LWS
  } = rootValidator$LWS;
  function initDistortionElementReplaceChildren$LWS({
    globalObject: {
      Element: {
        prototype: {
          replaceChildren: originalReplaceChildren$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalReplaceChildren$LWS, function replaceChildren$LWS(...args$LWS) {
      if (isSharedElement$h$LWS(this)) {
        throw new LockerSecurityError$LWS(`Cannot replace children of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
      }
      return ReflectApply$LWS$1(originalReplaceChildren$LWS, this, args$LWS);
    }];
    return function distortionElementReplaceChildren$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$g$LWS
  } = rootValidator$LWS;
  function initDistortionElementReplaceWith$LWS({
    globalObject: {
      Element: {
        prototype: {
          replaceWith: originalReplaceWith$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalReplaceWith$LWS, function replaceWith$LWS(...args$LWS) {
      if (isSharedElement$g$LWS(this)) {
        throw new LockerSecurityError$LWS(`Cannot replace ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
      }
      return ReflectApply$LWS$1(originalReplaceWith$LWS, this, args$LWS);
    }];
    return function distortionElementReplaceWith$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionElementSetAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      }
    }
  }) {
    return function distortionElementSetAttribute$LWS(record$LWS) {
      return [originalSetAttribute$LWS, function setAttribute$LWS(...args$LWS) {
        if (args$LWS.length > 1) {
          const attrName$LWS = normalizeNamespacedAttributeName$LWS(toString$LWS(args$LWS[0]));
          const attrValue$LWS = toString$LWS(args$LWS[1]);
          const distortion$LWS = getAttributeDistortion$LWS(record$LWS, this, attrName$LWS);
          if (distortion$LWS) {
            ReflectApply$LWS$1(distortion$LWS, this, [attrValue$LWS]);
            return;
          }
          args$LWS[0] = attrName$LWS;
          args$LWS[1] = attrValue$LWS;
        }
        ReflectApply$LWS$1(originalSetAttribute$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionElementSetAttributeNode$LWS({
    globalObject: {
      Attr: Attr$LWS,
      Element: {
        prototype: {
          setAttributeNode: originalSetAttributeNode$LWS
        }
      }
    }
  }) {
    return function distortionElementSetAttributeNode$LWS(record$LWS) {
      return [originalSetAttributeNode$LWS, function setAttributeNode$LWS(...args$LWS) {
        const attr$LWS = args$LWS.length ? args$LWS[0] : void 0;
        if (!(attr$LWS instanceof Attr$LWS)) {
          return ReflectApply$LWS$1(originalSetAttributeNode$LWS, this, args$LWS);
        }
        if (ReflectApply$LWS$1(AttrProtoOwnerElementGetter$LWS, attr$LWS, [])) {
          return ReflectApply$LWS$1(originalSetAttributeNode$LWS, this, args$LWS);
        }
        const attrName$LWS = normalizeNamespacedAttributeName$LWS(ReflectApply$LWS$1(AttrProtoNameGetter$LWS, attr$LWS, []));
        const attrNamespace$LWS = ReflectApply$LWS$1(AttrProtoNamespaceURIGetter$LWS, attr$LWS, []);
        const normalizedNamespace$LWS = normalizeNamespace$LWS(attrNamespace$LWS);
        const distortion$LWS = getAttributeDistortion$LWS(record$LWS, this, attrName$LWS, normalizedNamespace$LWS);
        if (distortion$LWS) {
          const oldAttr$LWS = ReflectApply$LWS$1(ElementProtoGetAttributeNode$LWS, this, [attrName$LWS]);
          if (oldAttr$LWS) {
            ReflectApply$LWS$1(ElementProtoRemoveAttributeNode$LWS, this, [oldAttr$LWS]);
          }
          const attrValue$LWS = ReflectApply$LWS$1(AttrProtoValueGetter$LWS, attr$LWS, []);
          ReflectApply$LWS$1(distortion$LWS, this, [attrValue$LWS]);
          const newAttr$LWS = ReflectApply$LWS$1(ElementProtoGetAttributeNode$LWS, this, [attrName$LWS]);
          if (newAttr$LWS) {
            ReflectApply$LWS$1(ElementProtoRemoveAttributeNode$LWS, this, [newAttr$LWS]);
          }
          if (oldAttr$LWS) {
            ReflectApply$LWS$1(originalSetAttributeNode$LWS, this, [oldAttr$LWS]);
          }
          if (newAttr$LWS) {
            const newValue$LWS = ReflectApply$LWS$1(AttrProtoValueGetter$LWS, newAttr$LWS, []);
            ReflectApply$LWS$1(AttrProtoValueSetter$LWS, attr$LWS, [newValue$LWS]);
            return ReflectApply$LWS$1(originalSetAttributeNode$LWS, this, [attr$LWS]);
          }
          return void 0;
        }
        return ReflectApply$LWS$1(originalSetAttributeNode$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionElementSetAttributeNodeNS$LWS({
    globalObject: {
      Attr: Attr$LWS,
      Element: {
        prototype: {
          setAttributeNodeNS: originalSetAttributeNodeNS$LWS
        }
      }
    }
  }) {
    return function distortionElementSetAttributeNodeNS$LWS(record$LWS) {
      return [originalSetAttributeNodeNS$LWS, function setAttributeNodeNS$LWS(...args$LWS) {
        const attr$LWS = args$LWS.length ? args$LWS[0] : void 0;
        if (!(attr$LWS instanceof Attr$LWS)) {
          return ReflectApply$LWS$1(originalSetAttributeNodeNS$LWS, this, args$LWS);
        }
        if (ReflectApply$LWS$1(AttrProtoOwnerElementGetter$LWS, attr$LWS, [])) {
          return ReflectApply$LWS$1(originalSetAttributeNodeNS$LWS, this, args$LWS);
        }
        const attrName$LWS = normalizeNamespacedAttributeName$LWS(ReflectApply$LWS$1(AttrProtoNameGetter$LWS, attr$LWS, []));
        const attrNamespace$LWS = ReflectApply$LWS$1(AttrProtoNamespaceURIGetter$LWS, attr$LWS, []);
        const normalizedNamespace$LWS = normalizeNamespace$LWS(attrNamespace$LWS);
        const distortion$LWS = getAttributeDistortion$LWS(record$LWS, this, attrName$LWS, normalizedNamespace$LWS);
        if (distortion$LWS) {
          const oldAttr$LWS = ReflectApply$LWS$1(ElementProtoGetAttributeNodeNS$LWS, this, [attrNamespace$LWS, attrName$LWS]);
          if (oldAttr$LWS) {
            ReflectApply$LWS$1(ElementProtoRemoveAttributeNode$LWS, this, [oldAttr$LWS]);
          }
          const attrValue$LWS = ReflectApply$LWS$1(AttrProtoValueGetter$LWS, attr$LWS, []);
          ReflectApply$LWS$1(distortion$LWS, this, [attrValue$LWS]);
          const newAttr$LWS = ReflectApply$LWS$1(ElementProtoGetAttributeNodeNS$LWS, this, [attrNamespace$LWS, attrName$LWS]);
          if (newAttr$LWS) {
            ReflectApply$LWS$1(ElementProtoRemoveAttributeNode$LWS, this, [newAttr$LWS]);
          }
          if (oldAttr$LWS) {
            ReflectApply$LWS$1(originalSetAttributeNodeNS$LWS, this, [oldAttr$LWS]);
          }
          if (newAttr$LWS) {
            const newValue$LWS = ReflectApply$LWS$1(AttrProtoValueGetter$LWS, newAttr$LWS, []);
            ReflectApply$LWS$1(AttrProtoValueSetter$LWS, attr$LWS, [newValue$LWS]);
            return ReflectApply$LWS$1(originalSetAttributeNodeNS$LWS, this, [attr$LWS]);
          }
          return null;
        }
        return ReflectApply$LWS$1(originalSetAttributeNodeNS$LWS, this, [attr$LWS]);
      }];
    };
  }
  function initDistortionElementSetAttributeNS$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttributeNS: originalSetAttributeNS$LWS
        }
      }
    }
  }) {
    return function distortionElementSetAttributeNS$LWS(record$LWS) {
      return [originalSetAttributeNS$LWS, function setAttributeNS$LWS(...args$LWS) {
        if (args$LWS.length < 3) {
          ReflectApply$LWS$1(originalSetAttributeNS$LWS, this, args$LWS);
          return;
        }
        let {
          0: attrNamespace$LWS
        } = args$LWS;
        if (attrNamespace$LWS !== null && attrNamespace$LWS !== void 0) {
          attrNamespace$LWS = toString$LWS(attrNamespace$LWS);
        }
        const attrName$LWS = normalizeNamespacedAttributeName$LWS(toString$LWS(args$LWS[1]));
        const attrValue$LWS = toString$LWS(args$LWS[2]);
        const normalizedNamespace$LWS = normalizeNamespace$LWS(attrNamespace$LWS);
        const distortion$LWS = getAttributeDistortion$LWS(record$LWS, this, attrName$LWS, normalizedNamespace$LWS);
        if (distortion$LWS) {
          ReflectApply$LWS$1(distortion$LWS, this, [attrValue$LWS]);
          return;
        }
        {
          args$LWS[0] = attrNamespace$LWS;
          args$LWS[1] = attrName$LWS;
          args$LWS[2] = attrValue$LWS;
          ReflectApply$LWS$1(originalSetAttributeNS$LWS, this, args$LWS);
        }
      }];
    };
  }
  const {
    isInherentlyUnsecure: isInherentlyUnsecure$LWS,
    isSharedElement: isSharedElement$f$LWS
  } = rootValidator$LWS;
  function initDistortionElementSetHTML$LWS({
    document: document$LWS,
    globalObject: {
      Element: {
        prototype: {
          setHTML: originalSetHTML$LWS
        }
      },
      SVGElement: SVGElement$LWS,
      XMLDocument: XMLDocument$LWS
    }
  }) {
    if (typeof originalSetHTML$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionElementSetHTML$LWS({
      key: key$LWS
    }) {
      return [originalSetHTML$LWS, function setHTML$LWS(...args$LWS) {
        const isOwnerXMLDocument$LWS = ReflectApply$LWS$1(NodeProtoOwnerDocumentGetter$LWS, this, []) instanceof XMLDocument$LWS;
        if (!isOwnerXMLDocument$LWS) {
          if (isSharedElement$f$LWS(this)) {
            throw new LockerSecurityError$LWS(`Cannot setHTML of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
          }
          setCustomElementsRegistry$LWS(document$LWS, key$LWS);
          const value$LWS = args$LWS[0];
          const contentType$LWS = this instanceof SVGElement$LWS ? ContentType$LWS.SVG : ContentType$LWS.HTML;
          args$LWS[0] = lwsInternalPolicy$LWS.createHTML(value$LWS, key$LWS, contentType$LWS);
          if (isInherentlyUnsecure$LWS(args$LWS[0])) {
            throw new LockerSecurityError$LWS(`Cannot 'setHTML' using an unsecure ${toSafeTemplateStringValue$LWS(args$LWS[0])}.`);
          }
        }
        ReflectApply$LWS$1(originalSetHTML$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionElementShadowRootGetter$LWS({
    globalObject: {
      Element: Element$LWS
    }
  }) {
    const originalShadowRootGetter$LWS = ObjectLookupOwnGetter$LWS$1(Element$LWS.prototype, "shadowRoot");
    return function distortionShadowRootGetter$LWS({
      key: key$LWS
    }) {
      return [originalShadowRootGetter$LWS, function shadowRoot$LWS() {
        const realShadowRoot$LWS = ReflectApply$LWS$1(originalShadowRootGetter$LWS, this, []);
        if (isShadowRootAccessibleInThisSandbox$LWS(key$LWS, realShadowRoot$LWS)) {
          return realShadowRoot$LWS;
        }
        return null;
      }];
    };
  }
  function initDistortionElementToggleAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          hasAttribute: ElementProtoHasAttribute$LWS2,
          toggleAttribute: originalToggleAttribute$LWS
        }
      }
    }
  }) {
    return function distortionElementToggleAttribute$LWS(record$LWS) {
      return [originalToggleAttribute$LWS, function toggleAttribute$LWS(...args$LWS) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2 > 0) {
          const attrName$LWS = toString$LWS(args$LWS[0]);
          const distortion$LWS = getAttributeDistortion$LWS(record$LWS, this, attrName$LWS);
          if (distortion$LWS) {
            const distortionArgs$LWS = length$LWS2 > 1 ? [args$LWS[1]] : [];
            ReflectApply$LWS$1(distortion$LWS, this, distortionArgs$LWS);
            return ReflectApply$LWS$1(ElementProtoHasAttribute$LWS2, this, [attrName$LWS]);
          }
          args$LWS[0] = attrName$LWS;
        }
        return ReflectApply$LWS$1(originalToggleAttribute$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionEval$LWS({
    UNCOMPILED_CONTEXT: UNCOMPILED_CONTEXT$LWS,
    globalObject: {
      eval: originalEval$LWS
    }
  }) {
    return function distortionEval$LWS({
      sandboxEvaluator: sandboxEvaluator$LWS,
      virtualEnvironmentEvaluator: virtualEnvironmentEvaluator$LWS
    }) {
      return [originalEval$LWS, function(sourceText$LWS) {
        throwIfMarkedAsUnsafeInChildWindow$LWS(virtualEnvironmentEvaluator$LWS, "eval");
        return sandboxEvaluator$LWS(transformSourceText$LWS(toString$LWS(sourceText$LWS)), UNCOMPILED_CONTEXT$LWS);
      }];
    };
  }
  function createDistortedComposedPath$LWS(event$LWS, sandboxKey$LWS) {
    const currentTarget$LWS = ReflectApply$LWS$1(EventProtoCurrentTargetGetter$LWS, event$LWS, []);
    const {
      composedPath: originalComposedPath$LWS
    } = Event.prototype;
    const rawComposedPath$LWS = ReflectApply$LWS$1(originalComposedPath$LWS, event$LWS, []);
    const currentTargetIndex$LWS = ReflectApply$LWS$1(ArrayProtoIndexOf$LWS$1, rawComposedPath$LWS, [currentTarget$LWS]);
    let distortedComposedPath$LWS = rawComposedPath$LWS;
    for (let i$LWS = currentTargetIndex$LWS; i$LWS > -1; i$LWS -= 1) {
      const objectThatMightBeAShadowRoot$LWS = rawComposedPath$LWS[i$LWS];
      if (objectThatMightBeAShadowRoot$LWS instanceof ShadowRoot && !isShadowRootAccessibleInThisSandbox$LWS(sandboxKey$LWS, objectThatMightBeAShadowRoot$LWS)) {
        distortedComposedPath$LWS = ReflectApply$LWS$1(ArrayProtoSlice$LWS$1, rawComposedPath$LWS, [i$LWS + 1]);
        break;
      }
    }
    return distortedComposedPath$LWS;
  }
  function initDistortionEventComposedPath$LWS({
    globalObject: {
      Event: {
        prototype: {
          composedPath: originalComposedPath$LWS
        }
      }
    }
  }) {
    return function distortionEventComposedPath$LWS({
      key: key$LWS
    }) {
      return [originalComposedPath$LWS, function composedPath$LWS() {
        return createDistortedComposedPath$LWS(this, key$LWS);
      }];
    };
  }
  function initDistortionEventPathGetter$LWS({
    globalObject: {
      Event: Event$LWS
    }
  }) {
    const originalPathGetter$LWS = ObjectLookupOwnGetter$LWS$1(Event$LWS.prototype, "path");
    if (typeof originalPathGetter$LWS !== "function") {
      return noop$LWS$1;
    }
    return function distortionEventPathGetter$LWS({
      key: key$LWS
    }) {
      return [
        originalPathGetter$LWS,
        function path$LWS() {
          return createDistortedComposedPath$LWS(this, key$LWS);
        }
      ];
    };
  }
  function initDistortionEventTargetAddEventListener$LWS({
    globalObject: {
      EventTarget: {
        prototype: {
          addEventListener: originalAddEventListener$LWS
        }
      }
    }
  }) {
    return function distortionEventTargetAddEventListener$LWS(record$LWS) {
      function addEventListener$LWS(...args$LWS) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2 > 1) {
          const eventName$LWS = toString$LWS(args$LWS[0]);
          if (isEventTargetRestricted$LWS(record$LWS, this, eventName$LWS)) {
            throw new LockerSecurityError$LWS(createEventListenerExceptionMessage$LWS(this, eventName$LWS));
          }
          args$LWS[0] = eventName$LWS;
        }
        return ReflectApply$LWS$1(originalAddEventListener$LWS, this, args$LWS);
      }
      return [originalAddEventListener$LWS, addEventListener$LWS];
    };
  }
  function initDistortionFunction$LWS({
    UNCOMPILED_CONTEXT: UNCOMPILED_CONTEXT$LWS,
    globalObject: {
      Function: originalFunction$LWS
    }
  }) {
    const funcFooterRegExp$LWS = /\n?}[^}]*$/;
    return function distortionFunction$LWS({
      sandboxEvaluator: sandboxEvaluator$LWS,
      virtualEnvironmentEvaluator: virtualEnvironmentEvaluator$LWS
    }) {
      return [originalFunction$LWS, function Function$LWS(...args$LWS) {
        throwIfMarkedAsUnsafeInChildWindow$LWS(virtualEnvironmentEvaluator$LWS, "Function");
        const sandboxFuncCtor$LWS = sandboxEvaluator$LWS("(function() {return Function(...arguments)})");
        const {
          length: length$LWS2
        } = args$LWS;
        if (!length$LWS2) {
          return ReflectApply$LWS$1(sandboxFuncCtor$LWS, this, []);
        }
        const lastIndex$LWS = length$LWS2 - 1;
        const funcBody$LWS = toString$LWS(args$LWS[lastIndex$LWS]);
        ReflectApply$LWS$1(sandboxFuncCtor$LWS, this, [funcBody$LWS]);
        args$LWS[lastIndex$LWS] = "";
        const wireFunc$LWS = ReflectApply$LWS$1(sandboxFuncCtor$LWS, this, args$LWS);
        const prefix$LWS = `${generateContextAssignmentCodeFromContextNames$LWS(UNIVERSAL_CONTEXT_NAMES$LWS)};`;
        const header$LWS = ReflectApply$LWS$1(StringProtoReplace$LWS, `${wireFunc$LWS}`, [funcFooterRegExp$LWS, ""]);
        const code$LWS = compileSourceText$LWS(funcBody$LWS);
        return sandboxEvaluator$LWS(`${prefix$LWS}(${header$LWS}${code$LWS}
})`, UNCOMPILED_CONTEXT$LWS);
      }];
    };
  }
  function initDistortionHistoryPushState$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      History: {
        prototype: {
          pushState: originalPushState$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalPushState$LWS, function pushState$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalPushState$LWS, this, args$LWS);
      } catch (error) {
        if (args$LWS.length && error instanceof DOMException$LWS) {
          const state$LWS = args$LWS[0];
          if (isObject$LWS$1(state$LWS)) {
            args$LWS[0] = partialStructuredClone$LWS(state$LWS);
            return ReflectApply$LWS$1(originalPushState$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionHistoryPushState$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionHistoryReplaceState$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      History: {
        prototype: {
          replaceState: originalReplaceState$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalReplaceState$LWS, function replaceState$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalReplaceState$LWS, this, args$LWS);
      } catch (error) {
        if (args$LWS.length && error instanceof DOMException$LWS) {
          const state$LWS = args$LWS[0];
          if (isObject$LWS$1(state$LWS)) {
            args$LWS[0] = partialStructuredClone$LWS(state$LWS);
            return ReflectApply$LWS$1(originalReplaceState$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionHistoryReplaceState$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionHTMLBodyElementOnrejectionhandled$LWS({
    globalObject: {
      HTMLBodyElement: HTMLBodyElement$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(HTMLBodyElement$LWS.prototype, HTMLBodyElement$LWS, "rejectionhandled");
  }
  function initDistortionHTMLBodyElementOnstorage$LWS({
    globalObject: {
      HTMLBodyElement: HTMLBodyElement$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(HTMLBodyElement$LWS.prototype, HTMLBodyElement$LWS, "storage");
  }
  function initDistortionHTMLBodyElementOnunhandledrejection$LWS({
    globalObject: {
      HTMLBodyElement: HTMLBodyElement$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(HTMLBodyElement$LWS.prototype, HTMLBodyElement$LWS, "unhandledrejection");
  }
  function initDistortionHTMLElementCtor$LWS({
    document: document$LWS,
    globalObject: {
      HTMLElement: originalHTMLElementCtor$LWS
    }
  }) {
    return function distortionHTMLElementCtor$LWS({
      key: key$LWS
    }) {
      let registry$LWS;
      return [originalHTMLElementCtor$LWS, function HTMLElement$LWS2() {
        if (new.target === void 0) {
          throw new TypeErrorCtor$LWS$1(ERR_NO_NEW_OP_HTML_ELEMENT$LWS);
        }
        if (new.target === HTMLElement$LWS2) {
          throw new TypeErrorCtor$LWS$1(ERR_ILLEGAL_CONSTRUCTOR$LWS);
        }
        if (registry$LWS === void 0) {
          registry$LWS = getSandboxCustomElementRegistry$LWS(document$LWS, key$LWS);
        }
        return registry$LWS.newCtor(this, new.target, originalHTMLElementCtor$LWS);
      }];
    };
  }
  function initDistortionHTMLElementDatasetGetter$LWS({
    globalObject: {
      HTMLElement: HTMLElement$LWS2
    }
  }) {
    const originalDatasetGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLElement$LWS2.prototype, "dataset");
    const distortionEntry$LWS = [originalDatasetGetter$LWS, function dataset$LWS() {
      return trackAsLiveTarget$LWS(ReflectApply$LWS$1(originalDatasetGetter$LWS, this, []));
    }];
    return function distortionHTMLElementDatasetGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$e$LWS
  } = rootValidator$LWS;
  function initDistortionHTMLElementInnerTextSetter$LWS({
    globalObject: {
      HTMLElement: HTMLElement$LWS2
    }
  }) {
    const originalInnerTextSetter$LWS = ObjectLookupOwnSetter$LWS(HTMLElement$LWS2.prototype, "innerText");
    if (typeof originalInnerTextSetter$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalInnerTextSetter$LWS, function innerText$LWS(value$LWS) {
      if (isSharedElement$e$LWS(this)) {
        throw new LockerSecurityError$LWS(`Cannot set innerText of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
      }
      ReflectApply$LWS$1(originalInnerTextSetter$LWS, this, [value$LWS]);
    }];
    return function distortionHTMLElementInnerTextSetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$d$LWS
  } = rootValidator$LWS;
  function initDistortionHTMLElementOuterTextSetter$LWS({
    globalObject: {
      HTMLElement: HTMLElement$LWS2
    }
  }) {
    const originalOuterTextSetter$LWS = ObjectLookupOwnSetter$LWS(HTMLElement$LWS2.prototype, "outerText");
    if (typeof originalOuterTextSetter$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalOuterTextSetter$LWS, function outerText$LWS(value$LWS) {
      if (isSharedElement$d$LWS(this)) {
        throw new LockerSecurityError$LWS(`Cannot set outerText of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])}.`);
      }
      ReflectApply$LWS$1(originalOuterTextSetter$LWS, this, [value$LWS]);
    }];
    return function distortionHTMLElementOuterTextSetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionHTMLElementStyleGetter$LWS({
    globalObject: {
      HTMLElement: HTMLElement$LWS2
    }
  }) {
    const originalStyleGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLElement$LWS2.prototype, "style");
    const distortionEntry$LWS = [originalStyleGetter$LWS, function style$LWS() {
      return trackAsLiveTarget$LWS(ReflectApply$LWS$1(originalStyleGetter$LWS, this, []));
    }];
    return function distortionHTMLElementStyleGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionHTMLFrameSetElementOnrejectionhandled$LWS({
    globalObject: {
      HTMLFrameSetElement: HTMLFrameSetElement$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(HTMLFrameSetElement$LWS.prototype, HTMLFrameSetElement$LWS, "rejectionhandled");
  }
  function initDistortionHTMLFrameSetElementOnstorage$LWS({
    globalObject: {
      HTMLFrameSetElement: HTMLFrameSetElement$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(HTMLFrameSetElement$LWS.prototype, HTMLFrameSetElement$LWS, "storage");
  }
  function initDistortionHTMLFrameSetElementOnunhandledrejection$LWS({
    globalObject: {
      HTMLFrameSetElement: HTMLFrameSetElement$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(HTMLFrameSetElement$LWS.prototype, HTMLFrameSetElement$LWS, "unhandledrejection");
  }
  function initDistortionIFrameElementContentDocumentGetter$LWS({
    globalObject: {
      HTMLIFrameElement: HTMLIFrameElement$LWS
    }
  }) {
    const originalContentDocumentGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLIFrameElement$LWS.prototype, "contentDocument");
    const distortionEntry$LWS = [originalContentDocumentGetter$LWS, function get$LWS() {
      return isRevokedProxy$LWS(this) ? null : ReflectApply$LWS$1(originalContentDocumentGetter$LWS, this, []);
    }];
    return function distortionIFrameElementContentDocument$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionIFrameElementContentWindowGetter$LWS({
    globalObject: {
      HTMLIFrameElement: HTMLIFrameElement$LWS
    }
  }) {
    const originalContentWindowGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLIFrameElement$LWS.prototype, "contentWindow");
    const distortionEntry$LWS = [originalContentWindowGetter$LWS, function get$LWS() {
      return isRevokedProxy$LWS(this) ? null : ReflectApply$LWS$1(originalContentWindowGetter$LWS, this, []);
    }];
    return function distortionIFrameElementContentWindow$LWS() {
      return distortionEntry$LWS;
    };
  }
  function src$LWS(value$LWS) {
    const urlString$LWS = sanitizeURLForElement$LWS(value$LWS);
    if (!isValidURLScheme$LWS(urlString$LWS)) {
      throw new LockerSecurityError$LWS("HTMLIFrameElement.src supports http://, https:// schemes, relative urls and about:blank.");
    }
    ReflectApply$LWS$1(HTMLIFrameElementProtoSrcSetter$LWS, this, [urlString$LWS]);
  }
  function initDistortionHTMLIFrameElementSrcSetter$LWS({
    globalObject: {
      HTMLIFrameElement: HTMLIFrameElement$LWS
    }
  }) {
    const originalSrcSetter$LWS = ObjectLookupOwnSetter$LWS(HTMLIFrameElement$LWS.prototype, "src");
    const distortionMapEntry$LWS = [originalSrcSetter$LWS, src$LWS];
    return function distortionHTMLIFrameElementSrcSetter$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, HTMLIFrameElement$LWS, "src", NAMESPACE_DEFAULT$LWS, src$LWS);
      return distortionMapEntry$LWS;
    };
  }
  const importRegExp$LWS = /import/i;
  const WARN_MESSAGE$LWS = 'Lightning Web Security: HTMLLinkElement does not allow setting "rel" property to "import" value.';
  function isValidRelValue$LWS(value$LWS) {
    return typeof value$LWS !== "string" || !ReflectApply$LWS$1(RegExpProtoTest$LWS$1, importRegExp$LWS, [value$LWS]);
  }
  function initDistortionHTMLLinkElementRelSetter$LWS({
    globalObject: {
      HTMLLinkElement: HTMLLinkElement$LWS
    }
  }) {
    const originalRelSetter$LWS = ObjectLookupOwnSetter$LWS(HTMLLinkElement$LWS.prototype, "rel");
    function rel$LWS(value$LWS) {
      const valueAsString$LWS = toString$LWS(value$LWS);
      if (isValidRelValue$LWS(valueAsString$LWS)) {
        ReflectApply$LWS$1(originalRelSetter$LWS, this, [valueAsString$LWS]);
        return;
      }
      consoleWarn$LWS(WARN_MESSAGE$LWS);
    }
    const distortionEntry$LWS = [originalRelSetter$LWS, rel$LWS];
    return function distortionHTMLLinkElementRelSetter$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, HTMLLinkElement$LWS, "rel", NAMESPACE_DEFAULT$LWS, rel$LWS);
      return distortionEntry$LWS;
    };
  }
  function initDistortionHTMLLinkElementRelListSetter$LWS({
    globalObject: {
      DOMTokenList: DOMTokenList$LWS,
      HTMLLinkElement: HTMLLinkElement$LWS
    }
  }) {
    const originalRelListSetter$LWS = ObjectLookupOwnSetter$LWS(HTMLLinkElement$LWS.prototype, "relList");
    const distortionEntry$LWS = [originalRelListSetter$LWS, function relList$LWS(relListValue$LWS) {
      const string$LWS = relList$LWS instanceof DOMTokenList$LWS ? ReflectApply$LWS$1(DOMTokenListProtoValueGetter$LWS, relListValue$LWS, []) : toString$LWS(relListValue$LWS);
      if (isValidRelValue$LWS(string$LWS)) {
        ReflectApply$LWS$1(originalRelListSetter$LWS, this, [string$LWS]);
        return;
      }
      consoleWarn$LWS(WARN_MESSAGE$LWS);
    }];
    return function distortionHTMLLinkElementRelListSetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionHTMLObjectElementDataSetter$LWS({
    globalObject: {
      HTMLObjectElement: HTMLObjectElement$LWS
    }
  }) {
    const originalDataSetter$LWS = ObjectLookupOwnSetter$LWS(HTMLObjectElement$LWS.prototype, "data");
    function data$LWS(value$LWS) {
      const urlString$LWS = sanitizeURLForElement$LWS(value$LWS);
      if (!isValidURLScheme$LWS(urlString$LWS)) {
        throw new LockerSecurityError$LWS("HTMLObjectElement.data supports http://, https:// schemes, relative urls and about:blank.");
      }
      const parsedURL$LWS = parseURL$LWS(urlString$LWS);
      if (!isValidURL$LWS(parsedURL$LWS)) {
        throw new LockerSecurityError$LWS(`Cannot request disallowed endpoint: ${parsedURL$LWS.normalizedURL}`);
      }
      ReflectApply$LWS$1(originalDataSetter$LWS, this, [trusted.createScriptURL(urlString$LWS)]);
    }
    const distortionEntry$LWS = [originalDataSetter$LWS, data$LWS];
    return function distortionHTMLObjectElementDataSetter$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, HTMLObjectElement$LWS, "data", NAMESPACE_DEFAULT$LWS, data$LWS);
      return distortionEntry$LWS;
    };
  }
  const descriptorCaches$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function createBlockedAttributeDistortionFactoryInitializer$LWS(Ctor$LWS, ctorName$LWS, attributeName$LWS) {
    return function initDistortionBlockedAttribute$LWS() {
      const enquotedAttributeName$LWS = enquote$LWS(attributeName$LWS);
      const distortionName$LWS = `blocked${capitalizeFirstChar$LWS(attributeName$LWS)}Attribute`;
      const {
        [distortionName$LWS]: distortion$LWS
      } = {
        [distortionName$LWS]: () => {
          throw new LockerSecurityError$LWS(`Attribute ${enquotedAttributeName$LWS} not allowed on ${ctorName$LWS}.`);
        }
      };
      return function distortionBlockedAttribute$LWS(record$LWS) {
        registerAttributeDistortion$LWS(record$LWS, Ctor$LWS, attributeName$LWS, NAMESPACE_DEFAULT$LWS, distortion$LWS);
      };
    };
  }
  function createGetThrowerFactoryInitializer$LWS(proto$LWS, key$LWS) {
    const originalGet$LWS = ObjectLookupOwnGetter$LWS$1(proto$LWS, key$LWS);
    const keyAsString$LWS = toSafeTemplateStringValue$LWS(key$LWS);
    const distortionEntry$LWS = [
      originalGet$LWS,
      function get$LWS() {
        throw new LockerSecurityError$LWS(`Cannot access ${keyAsString$LWS}.`);
      }
    ];
    function getThrowerDistortionFactory$LWS() {
      return distortionEntry$LWS;
    }
    return function getThrowerDistortionFactoryInitializer$LWS() {
      return getThrowerDistortionFactory$LWS;
    };
  }
  function createSetThrowerFactoryInitializer$LWS(proto$LWS, key$LWS) {
    const originalSet$LWS = ObjectLookupOwnSetter$LWS(proto$LWS, key$LWS);
    const keyAsString$LWS = toSafeTemplateStringValue$LWS(key$LWS);
    const distortionEntry$LWS = [
      originalSet$LWS,
      function set$LWS() {
        throw new LockerSecurityError$LWS(`Cannot access ${keyAsString$LWS}.`);
      }
    ];
    function setThrowerDistortionFactory$LWS() {
      return distortionEntry$LWS;
    }
    return function setThrowerDistortionFactoryInitializer$LWS() {
      return setThrowerDistortionFactory$LWS;
    };
  }
  function createValueThrowerFactoryInitializer$LWS(proto$LWS, key$LWS) {
    const {
      [key$LWS]: originalValue$LWS
    } = proto$LWS;
    const keyAsString$LWS = toSafeTemplateStringValue$LWS(key$LWS);
    const distortionEntry$LWS = [
      originalValue$LWS,
      function value$LWS() {
        throw new LockerSecurityError$LWS(`Cannot access ${keyAsString$LWS}.`);
      }
    ];
    function valueThrowerDistortionFactory$LWS() {
      return distortionEntry$LWS;
    }
    return function valueThrowerDistortionFactoryInitializer$LWS() {
      return valueThrowerDistortionFactory$LWS;
    };
  }
  function addBlockedAttributeDistortionFactoryInitializers$LWS(Ctor$LWS, ctorName$LWS, attributes$LWS, factoryInitializers$LWS) {
    let {
      length: factoryInitializersOffset$LWS
    } = factoryInitializers$LWS;
    for (let i$LWS = 0, {
      length: length$LWS2
    } = attributes$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      factoryInitializers$LWS[factoryInitializersOffset$LWS++] = createBlockedAttributeDistortionFactoryInitializer$LWS(Ctor$LWS, ctorName$LWS, attributes$LWS[i$LWS]);
    }
  }
  function addBlockedPropertyDistortionFactoryInitializers$LWS({
    document: document$LWS
  }, proto$LWS, properties$LWS, factoryInitializers$LWS) {
    let {
      length: factoryInitializersOffset$LWS
    } = factoryInitializers$LWS;
    let descsCache$LWS = descriptorCaches$LWS.get(document$LWS);
    if (descsCache$LWS === void 0) {
      descsCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
      descriptorCaches$LWS.set(document$LWS, descsCache$LWS);
    }
    let safeDescs$LWS = descsCache$LWS.get(proto$LWS);
    if (safeDescs$LWS === void 0) {
      safeDescs$LWS = {
        __proto__: null
      };
      descsCache$LWS.set(proto$LWS, safeDescs$LWS);
    }
    for (let i$LWS = 0, {
      length: length$LWS2
    } = properties$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const prop$LWS = properties$LWS[i$LWS];
      let safeDesc$LWS = safeDescs$LWS[prop$LWS];
      if (safeDesc$LWS === void 0) {
        var _ReflectGetOwnPropert$LWS;
        safeDesc$LWS = (_ReflectGetOwnPropert$LWS = ReflectGetOwnPropertyDescriptor$LWS(proto$LWS, prop$LWS)) != null ? _ReflectGetOwnPropert$LWS : null;
        if (safeDesc$LWS) {
          ReflectSetPrototypeOf$LWS$1(safeDesc$LWS, null);
        }
        safeDescs$LWS[prop$LWS] = safeDesc$LWS;
      }
      if (safeDesc$LWS) {
        const {
          value: value$LWS
        } = safeDesc$LWS;
        if ("get" in safeDesc$LWS || "set" in safeDesc$LWS) {
          const {
            get: getter$LWS,
            set: setter$LWS
          } = safeDesc$LWS;
          if (getter$LWS) {
            factoryInitializers$LWS[factoryInitializersOffset$LWS++] = createGetThrowerFactoryInitializer$LWS(proto$LWS, prop$LWS);
          }
          if (setter$LWS) {
            factoryInitializers$LWS[factoryInitializersOffset$LWS++] = createSetThrowerFactoryInitializer$LWS(proto$LWS, prop$LWS);
          }
        } else {
          if (typeof value$LWS === "function") {
            factoryInitializers$LWS[factoryInitializersOffset$LWS++] = createValueThrowerFactoryInitializer$LWS(proto$LWS, prop$LWS);
          }
        }
      }
    }
  }
  const scriptURLs$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function trackScriptURL$LWS(targetElement$LWS, url$LWS) {
    scriptURLs$LWS.set(targetElement$LWS, url$LWS);
  }
  function getScriptURL$LWS(targetElement$LWS) {
    return scriptURLs$LWS.get(targetElement$LWS);
  }
  function createScriptDistortion$LWS({
    sandboxEvaluator: sandboxEvaluator$LWS
  }, attributeName$LWS) {
    const distortionName$LWS = `script${capitalizeFirstChar$LWS(attributeName$LWS)}`;
    const {
      [distortionName$LWS]: distortion$LWS
    } = {
      [distortionName$LWS](url$LWS) {
        trackScriptURL$LWS(this, resolveURL$LWS(url$LWS));
        const targetElement$LWS = this;
        const evaluator$LWS = function evaluator$LWS2(sourceText$LWS) {
          const ownerDoc$LWS = ReflectApply$LWS$1(NodeProtoOwnerDocumentGetter$LWS, targetElement$LWS, []);
          const defaultView$LWS = ReflectApply$LWS$1(DocumentProtoDefaultViewGetter$LWS, ownerDoc$LWS, []);
          const context$LWS = {
            [UNCOMPILED_LOCATION_NAME$LWS]: defaultView$LWS.location,
            [UNCOMPILED_TOP_NAME$LWS]: defaultView$LWS.top
          };
          sourceText$LWS = transformSourceText$LWS(sourceText$LWS);
          return sandboxEvaluator$LWS(sourceText$LWS, context$LWS, defaultView$LWS, ownerDoc$LWS);
        };
        lwsInternalPolicy$LWS.createScriptURL(url$LWS, evaluator$LWS, targetElement$LWS);
      }
    };
    return distortion$LWS;
  }
  function initDistortionHTMLScriptElementSrcGetter$LWS({
    globalObject: {
      HTMLScriptElement: HTMLScriptElement$LWS
    }
  }) {
    const originalSrcGetter$LWS = ObjectLookupOwnGetter$LWS$1(HTMLScriptElement$LWS.prototype, "src");
    const distortionEntry$LWS = [originalSrcGetter$LWS, function src$LWS2() {
      var _getScriptURL$LWS;
      return (_getScriptURL$LWS = getScriptURL$LWS(this)) != null ? _getScriptURL$LWS : ReflectApply$LWS$1(originalSrcGetter$LWS, this, []);
    }];
    return function distortionHTMLScriptElementSrcGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionHTMLScriptElementSrcSetter$LWS({
    globalObject: {
      HTMLScriptElement: HTMLScriptElement$LWS
    }
  }) {
    const {
      set: originalSrcSetter$LWS
    } = ReflectGetOwnPropertyDescriptor$LWS(HTMLScriptElement$LWS.prototype, "src");
    return function distortionHTMLScriptElementSrcSetter$LWS(record$LWS) {
      const src$LWS2 = createScriptDistortion$LWS(record$LWS, "src");
      registerAttributeDistortion$LWS(record$LWS, HTMLScriptElement$LWS, "src", NAMESPACE_DEFAULT$LWS, src$LWS2);
      return [originalSrcSetter$LWS, src$LWS2];
    };
  }
  function initDistortionHTMLScriptElementTextSetter$LWS({
    globalObject: {
      HTMLScriptElement: HTMLScriptElement$LWS
    },
    root: {
      distortions: distortions$LWS
    }
  }) {
    const {
      get: originalTextGetter$LWS,
      set: originalTextSetter$LWS
    } = ReflectGetOwnPropertyDescriptor$LWS(HTMLScriptElement$LWS.prototype, "text");
    return function distortionHTMLScriptElementTextSetter$LWS({
      sandboxEvaluator: sandboxEvaluator$LWS
    }) {
      return [originalTextSetter$LWS, function text$LWS(value$LWS) {
        if (this instanceof HTMLScriptElement$LWS) {
          const scriptWasNotEvaluatedInScriptPropertySetter$LWS = scriptPropertySetters$LWS(this, "text", trusted.createScript(value$LWS), originalTextGetter$LWS, originalTextSetter$LWS, distortions$LWS, sandboxEvaluator$LWS, trusted.createScript(SCRIPT_HOOK_SOURCE_TEXT$LWS));
          if (scriptWasNotEvaluatedInScriptPropertySetter$LWS) {
            return;
          }
        }
        ReflectApply$LWS$1(originalTextSetter$LWS, this, [value$LWS]);
      }];
    };
  }
  function initDistortionIDBObjectStoreAdd$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      IDBObjectStore: {
        prototype: {
          add: originalAdd$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalAdd$LWS, function add$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalAdd$LWS, this, args$LWS);
      } catch (error) {
        if (args$LWS.length && error instanceof DOMException$LWS) {
          const value$LWS = args$LWS[0];
          if (isObject$LWS$1(value$LWS)) {
            args$LWS[0] = partialStructuredClone$LWS(value$LWS);
            return ReflectApply$LWS$1(originalAdd$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionIDBObjectStoreAdd$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionIDBObjectStorePut$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      IDBObjectStore: {
        prototype: {
          put: originalPut$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalPut$LWS, function put$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalPut$LWS, this, args$LWS);
      } catch (error) {
        if (args$LWS.length && error instanceof DOMException$LWS) {
          const value$LWS = args$LWS[0];
          if (isObject$LWS$1(value$LWS)) {
            args$LWS[0] = partialStructuredClone$LWS(value$LWS);
            return ReflectApply$LWS$1(originalPut$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionIDBObjectStorePut$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionMessagePortPostMessage$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      MessagePort: MessagePort$LWS
    }
  }) {
    const {
      postMessage: originalPostMessage$LWS
    } = MessagePort$LWS.prototype;
    const distortionEntry$LWS = [originalPostMessage$LWS, function postMessage$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalPostMessage$LWS, this, args$LWS);
      } catch (error) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2 && error instanceof DOMException$LWS) {
          const message$LWS = args$LWS[0];
          if (isObject$LWS$1(message$LWS)) {
            if (length$LWS2 > 1) {
              args$LWS = partialStructuredClone$LWS(args$LWS);
            } else {
              args$LWS[0] = partialStructuredClone$LWS(message$LWS);
            }
            return ReflectApply$LWS$1(originalPostMessage$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionMessagePortPostMessage$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionNamedNodeMapSetNamedItem$LWS({
    globalObject: {
      Attr: Attr$LWS,
      NamedNodeMap: {
        prototype: {
          setNamedItem: originalSetNamedItem$LWS
        }
      }
    }
  }) {
    return function distortionNamedNodeMapSetNamedItem$LWS(record$LWS) {
      return [originalSetNamedItem$LWS, function setNamedItem$LWS(...args$LWS) {
        const attr$LWS = args$LWS.length ? args$LWS[0] : void 0;
        if (attr$LWS && attr$LWS instanceof Attr$LWS) {
          return setNamedItemWithAttr$LWS(record$LWS, originalSetNamedItem$LWS, this, attr$LWS);
        }
        return ReflectApply$LWS$1(originalSetNamedItem$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionNamedNodeMapSetNamedItemNS$LWS({
    globalObject: {
      Attr: Attr$LWS,
      NamedNodeMap: {
        prototype: {
          setNamedItemNS: originalSetNamedItemNS$LWS
        }
      }
    }
  }) {
    return function distortionNamedNodeMapSetNamedItemNS$LWS(record$LWS) {
      return [originalSetNamedItemNS$LWS, function setNamedItemNS$LWS(...args$LWS) {
        const attr$LWS = args$LWS.length ? args$LWS[0] : void 0;
        if (attr$LWS && attr$LWS instanceof Attr$LWS) {
          return setNamedItemWithAttr$LWS(record$LWS, originalSetNamedItemNS$LWS, this, attr$LWS);
        }
        return ReflectApply$LWS$1(originalSetNamedItemNS$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionNavigatorSendBeacon$LWS({
    globalObject: {
      Navigator: {
        prototype: {
          sendBeacon: originalSendBeacon$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalSendBeacon$LWS, function sendBeacon$LWS(...args$LWS) {
      if (args$LWS.length) {
        const parsedURL$LWS = parseURL$LWS(toString$LWS(args$LWS[0]));
        if (!isValidURL$LWS(parsedURL$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot request disallowed endpoint: ${parsedURL$LWS.normalizedURL}`);
        }
        args$LWS[0] = parsedURL$LWS.normalizedURL;
      }
      return ReflectApply$LWS$1(originalSendBeacon$LWS, this, args$LWS);
    }];
    return function distortionNavigatorSendBeacon$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionNavigatorServiceWorkerGetter$LWS({
    globalObject: {
      Navigator: Navigator$LWS
    }
  }) {
    const originalServiceWorkerGetter$LWS = ObjectLookupOwnGetter$LWS$1(Navigator$LWS.prototype, "serviceWorker");
    if (typeof originalServiceWorkerGetter$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalServiceWorkerGetter$LWS, noop$LWS$1];
    return function distortionNavigatorServiceWorkerGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$c$LWS,
    isAllowedSharedElementChild: isAllowedSharedElementChild$1$LWS
  } = rootValidator$LWS;
  function initDistortionNodeInsertBefore$LWS({
    globalObject: {
      Node: {
        prototype: {
          insertBefore: originalInsertBefore$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalInsertBefore$LWS, function insertBefore$LWS(...args$LWS) {
      if (args$LWS.length) {
        const {
          0: node$LWS
        } = args$LWS;
        if (isSharedElement$c$LWS(this) && !isAllowedSharedElementChild$1$LWS(node$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot insert child ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, node$LWS, [])} into ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])},`);
        }
      }
      return ReflectApply$LWS$1(originalInsertBefore$LWS, this, args$LWS);
    }];
    return function distortionNodeInsertBefore$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionNodeValueSetter$LWS({
    globalObject: {
      Attr: Attr$LWS,
      Node: Node$LWS
    }
  }) {
    const originalNodeValueSetter$LWS = ObjectLookupOwnSetter$LWS(Node$LWS.prototype, "nodeValue");
    return function distortionNodeValueSetter$LWS(record$LWS) {
      return [originalNodeValueSetter$LWS, function nodeValue$LWS(value$LWS) {
        if (this instanceof Attr$LWS) {
          const ownerEl$LWS = ReflectApply$LWS$1(AttrProtoOwnerElementGetter$LWS, this, []);
          if (ownerEl$LWS === null) {
            ReflectApply$LWS$1(originalNodeValueSetter$LWS, this, [value$LWS]);
            return;
          }
          const attrName$LWS = ReflectApply$LWS$1(AttrProtoNameGetter$LWS, this, []);
          const attrNamespace$LWS = ReflectApply$LWS$1(AttrProtoNamespaceURIGetter$LWS, this, []);
          const normalizedNamespace$LWS = normalizeNamespace$LWS(attrNamespace$LWS);
          const distortion$LWS = getAttributeDistortion$LWS(record$LWS, ownerEl$LWS, attrName$LWS, normalizedNamespace$LWS);
          if (distortion$LWS) {
            ReflectApply$LWS$1(distortion$LWS, ownerEl$LWS, [value$LWS]);
            return;
          }
        }
        ReflectApply$LWS$1(originalNodeValueSetter$LWS, this, [value$LWS]);
      }];
    };
  }
  const {
    isSharedElement: isSharedElement$b$LWS
  } = rootValidator$LWS;
  function initDistortionNodeRemoveChild$LWS({
    globalObject: {
      Node: {
        prototype: {
          removeChild: originalRemoveChild$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalRemoveChild$LWS, function removeChild$LWS(...args$LWS) {
      if (args$LWS.length) {
        const {
          0: child$LWS
        } = args$LWS;
        if (isSharedElement$b$LWS(child$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot remove ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, child$LWS, [])}.`);
        }
      }
      return ReflectApply$LWS$1(originalRemoveChild$LWS, this, args$LWS);
    }];
    return function distortionNodeRemoveChild$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$a$LWS
  } = rootValidator$LWS;
  function initDistortionNodeReplaceChild$LWS({
    globalObject: {
      Node: {
        prototype: {
          replaceChild: originalReplaceChild$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalReplaceChild$LWS, function replaceChild$LWS(...args$LWS) {
      const {
        length: length$LWS2
      } = args$LWS;
      if (length$LWS2 > 1) {
        const {
          1: child$LWS
        } = args$LWS;
        if (isSharedElement$a$LWS(child$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot replace ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, child$LWS, [])}.`);
        }
      }
      return ReflectApply$LWS$1(originalReplaceChild$LWS, this, args$LWS);
    }];
    return function distortionNodeReplaceChild$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionNodeTextContentGetter$LWS({
    globalObject: {
      HTMLScriptElement: HTMLScriptElement$LWS,
      Node: Node$LWS,
      SVGScriptElement: SVGScriptElement$LWS
    }
  }) {
    const originalTextContentGetter$LWS = ObjectLookupOwnGetter$LWS$1(Node$LWS.prototype, "textContent");
    const distortionEntry$LWS = [originalTextContentGetter$LWS, function textContent$LWS() {
      if (this instanceof HTMLScriptElement$LWS || this instanceof SVGScriptElement$LWS) {
        var _getOriginalScriptPro$LWS;
        return (_getOriginalScriptPro$LWS = getOriginalScriptProperty$LWS(this)) != null ? _getOriginalScriptPro$LWS : ReflectApply$LWS$1(originalTextContentGetter$LWS, this, []);
      }
      return ReflectApply$LWS$1(originalTextContentGetter$LWS, this, []);
    }];
    return function distortionHTMLScriptElementSrcGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$9$LWS
  } = rootValidator$LWS;
  function initDistortionNodeTextContentSetter$LWS({
    globalObject: {
      Attr: Attr$LWS,
      Node: Node$LWS,
      HTMLScriptElement: HTMLScriptElement$LWS,
      SVGScriptElement: SVGScriptElement$LWS
    },
    root: {
      distortions: distortions$LWS
    }
  }) {
    const {
      get: originalTextContentGetter$LWS,
      set: originalTextContentSetter$LWS
    } = ReflectGetOwnPropertyDescriptor$LWS(Node$LWS.prototype, "textContent");
    return function distortionNodeTextContentSetter$LWS(record$LWS) {
      const {
        sandboxEvaluator: sandboxEvaluator$LWS
      } = record$LWS;
      return [originalTextContentSetter$LWS, function textContent$LWS(value$LWS) {
        const valueAsString$LWS = trusted.createScript(value$LWS);
        if (this instanceof Attr$LWS) {
          const ownerEl$LWS = ReflectApply$LWS$1(AttrProtoOwnerElementGetter$LWS, this, []);
          if (ownerEl$LWS === null) {
            ReflectApply$LWS$1(originalTextContentSetter$LWS, this, [valueAsString$LWS]);
            return;
          }
          const attrName$LWS = ReflectApply$LWS$1(AttrProtoNameGetter$LWS, this, []);
          const attrNamespace$LWS = ReflectApply$LWS$1(AttrProtoNamespaceURIGetter$LWS, this, []);
          const normalizedNamespace$LWS = normalizeNamespace$LWS(attrNamespace$LWS);
          const distortion$LWS = getAttributeDistortion$LWS(record$LWS, ownerEl$LWS, attrName$LWS, normalizedNamespace$LWS);
          if (distortion$LWS) {
            ReflectApply$LWS$1(distortion$LWS, ownerEl$LWS, [valueAsString$LWS]);
            return;
          }
        } else if (this instanceof HTMLScriptElement$LWS || this instanceof SVGScriptElement$LWS) {
          const scriptWasNotEvaluatedInScriptPropertySetter$LWS = scriptPropertySetters$LWS(this, "textContent", valueAsString$LWS, originalTextContentGetter$LWS, originalTextContentSetter$LWS, distortions$LWS, sandboxEvaluator$LWS, trusted.createScript(SCRIPT_HOOK_SOURCE_TEXT$LWS));
          if (scriptWasNotEvaluatedInScriptPropertySetter$LWS) {
            return;
          }
        } else if (isSharedElement$9$LWS(this)) {
          throw new LockerSecurityError$LWS(`Cannot set textContent of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, this, [])} elements.`);
        }
        ReflectApply$LWS$1(originalTextContentSetter$LWS, this, [valueAsString$LWS]);
      }];
    };
  }
  function initDistortionNotificationCtor$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      Notification: originalNotificationCtor$LWS
    }
  }) {
    if (typeof originalNotificationCtor$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalNotificationCtor$LWS, function Notification$LWS(...args$LWS) {
      try {
        return ReflectConstruct$LWS(originalNotificationCtor$LWS, args$LWS);
      } catch (error) {
        if (args$LWS.length > 1 && error instanceof DOMException$LWS) {
          const providedOptions$LWS = args$LWS[1];
          if (isObjectLike$LWS(providedOptions$LWS)) {
            const {
              data: data$LWS
            } = providedOptions$LWS;
            if (isObject$LWS$1(data$LWS)) {
              args$LWS[1] = {
                __proto__: providedOptions$LWS,
                data: partialStructuredClone$LWS(data$LWS)
              };
              return ReflectConstruct$LWS(originalNotificationCtor$LWS, args$LWS);
            }
          }
        }
        throw error;
      }
    }];
    return function distortionNotificationCtor$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionPerformanceMark$LWS({
    globalObject: {
      Performance: {
        prototype: {
          mark: originalMark$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalMark$LWS, function mark$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalMark$LWS, this, args$LWS);
      } catch (error) {
        if (args$LWS.length > 1 && error instanceof DOMException) {
          const providedOptions$LWS = args$LWS[1];
          if (isObject$LWS$1(providedOptions$LWS)) {
            args$LWS[1] = partialStructuredClone$LWS(providedOptions$LWS);
            return ReflectApply$LWS$1(originalMark$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionPerformanceMark$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionPerformanceMeasure$LWS({
    globalObject: {
      Performance: {
        prototype: {
          measure: originalMeasure$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalMeasure$LWS, function measure$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalMeasure$LWS, this, args$LWS);
      } catch (error) {
        if (args$LWS.length > 1 && error instanceof DOMException) {
          const providedOptions$LWS = args$LWS[1];
          if (isObject$LWS$1(providedOptions$LWS)) {
            args$LWS[1] = partialStructuredClone$LWS(providedOptions$LWS);
            return ReflectApply$LWS$1(originalMeasure$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionPerformanceMeasure$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionPerformanceMarkCtor$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      PerformanceMark: originalPerformanceMarkCtor$LWS
    }
  }) {
    if (typeof originalPerformanceMarkCtor$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalPerformanceMarkCtor$LWS, function PerformanceMark$LWS(...args$LWS) {
      try {
        return ReflectConstruct$LWS(originalPerformanceMarkCtor$LWS, args$LWS);
      } catch (error) {
        if (args$LWS.length > 1 && error instanceof DOMException$LWS) {
          const providedOptions$LWS = args$LWS[1];
          if (isObject$LWS$1(providedOptions$LWS)) {
            args$LWS[1] = partialStructuredClone$LWS(providedOptions$LWS);
            return ReflectConstruct$LWS(originalPerformanceMarkCtor$LWS, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionPerformanceMarkCtor$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionRangeCreateContextualFragment$LWS({
    document: document$LWS,
    globalObject: {
      Range: {
        prototype: {
          createContextualFragment: originalCreateContextualFragment$LWS
        }
      }
    }
  }) {
    return function distortionRangeCreateContextualFragment$LWS({
      key: key$LWS
    }) {
      return [originalCreateContextualFragment$LWS, function createContextualFragment$LWS(...args$LWS) {
        if (args$LWS.length) {
          const {
            0: tagString$LWS
          } = args$LWS;
          if (tagString$LWS !== null && tagString$LWS !== void 0) {
            setCustomElementsRegistry$LWS(document$LWS, key$LWS);
            args$LWS[0] = lwsInternalPolicy$LWS.createHTML(tagString$LWS, key$LWS, ContentType$LWS.HTML);
          }
        }
        return ReflectApply$LWS$1(originalCreateContextualFragment$LWS, this, args$LWS);
      }];
    };
  }
  const {
    isSharedElement: isSharedElement$8$LWS
  } = rootValidator$LWS;
  function initDistortionRangeDeleteContents$LWS({
    globalObject: {
      AbstractRange: AbstractRange$LWS,
      Range: {
        prototype: {
          deleteContents: originalDeleteContents$LWS
        }
      }
    }
  }) {
    const {
      prototype: AbstractRangeProto$LWS
    } = AbstractRange$LWS != null ? AbstractRange$LWS : Range;
    const originalEndContainerGetter$LWS = ObjectLookupOwnGetter$LWS$1(AbstractRangeProto$LWS, "endContainer");
    const originalStartContainerGetter$LWS = ObjectLookupOwnGetter$LWS$1(AbstractRangeProto$LWS, "startContainer");
    const distortionEntry$LWS = [originalDeleteContents$LWS, function deleteContents$LWS(...args$LWS) {
      const containers$LWS = [ReflectApply$LWS$1(originalEndContainerGetter$LWS, this, []), ReflectApply$LWS$1(originalStartContainerGetter$LWS, this, [])];
      for (let i$LWS = 0, {
        length: length$LWS2
      } = containers$LWS; i$LWS < length$LWS2; i$LWS += 1) {
        const container$LWS = containers$LWS[i$LWS];
        if (isSharedElement$8$LWS(container$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot delete contents of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, container$LWS, [])}.`);
        }
      }
      return ReflectApply$LWS$1(originalDeleteContents$LWS, this, args$LWS);
    }];
    return function distortionRangeDeleteContents$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$7$LWS
  } = rootValidator$LWS;
  function initDistortionRangeExtractContents$LWS({
    globalObject: {
      AbstractRange: AbstractRange$LWS,
      Range: {
        prototype: {
          extractContents: originalExtractContents$LWS
        }
      }
    }
  }) {
    const {
      prototype: AbstractRangeProto$LWS
    } = AbstractRange$LWS != null ? AbstractRange$LWS : Range;
    const originalEndContainerGetter$LWS = ObjectLookupOwnGetter$LWS$1(AbstractRangeProto$LWS, "endContainer");
    const originalStartContainerGetter$LWS = ObjectLookupOwnGetter$LWS$1(AbstractRangeProto$LWS, "startContainer");
    const distortionEntry$LWS = [originalExtractContents$LWS, function extractContents$LWS(...args$LWS) {
      const containers$LWS = [ReflectApply$LWS$1(originalEndContainerGetter$LWS, this, []), ReflectApply$LWS$1(originalStartContainerGetter$LWS, this, [])];
      for (let i$LWS = 0, {
        length: length$LWS2
      } = containers$LWS; i$LWS < length$LWS2; i$LWS += 1) {
        const container$LWS = containers$LWS[i$LWS];
        if (isSharedElement$7$LWS(container$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot extract contents of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, container$LWS, [])}.`);
        }
      }
      return ReflectApply$LWS$1(originalExtractContents$LWS, this, args$LWS);
    }];
    return function distortionRangeExtractContents$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$6$LWS,
    isAllowedSharedElementChild: isAllowedSharedElementChild$LWS
  } = rootValidator$LWS;
  function initDistortionRangeInsertNode$LWS({
    globalObject: {
      Range: {
        prototype: {
          insertNode: originalInsertNode$LWS
        }
      }
    }
  }) {
    const originalCommonAncestorContainerGetter$LWS = ObjectLookupOwnGetter$LWS$1(Range.prototype, "commonAncestorContainer");
    const distortionEntry$LWS = [originalInsertNode$LWS, function insertNode$LWS(...args$LWS) {
      if (args$LWS.length) {
        const commonAncestorContainer$LWS = ReflectApply$LWS$1(originalCommonAncestorContainerGetter$LWS, this, []);
        if (commonAncestorContainer$LWS && isSharedElement$6$LWS(commonAncestorContainer$LWS) && !isAllowedSharedElementChild$LWS(args$LWS[0])) {
          throw new LockerSecurityError$LWS(`Cannot insert a new child node of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, commonAncestorContainer$LWS, [])}.`);
        }
      }
      return ReflectApply$LWS$1(originalInsertNode$LWS, this, args$LWS);
    }];
    return function distortionRangeInsertNode$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$5$LWS
  } = rootValidator$LWS;
  function createRangeProtoMethodDistortionFactoryInitializer$LWS(methodName$LWS) {
    return function initDistortionContentWindowGetter$LWS({
      globalObject: {
        Range: {
          prototype: {
            [methodName$LWS]: originalMethod$LWS
          }
        }
      }
    }) {
      const {
        [methodName$LWS]: distortion$LWS
      } = {
        [methodName$LWS](...args$LWS) {
          if (args$LWS.length) {
            const {
              0: node$LWS
            } = args$LWS;
            if (isSharedElement$5$LWS(node$LWS)) {
              throw new LockerSecurityError$LWS(`Cannot call ${methodName$LWS} with ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, node$LWS, [])}.`);
            }
          }
          return ReflectApply$LWS$1(originalMethod$LWS, this, args$LWS);
        }
      };
      const distortionEntry$LWS = [originalMethod$LWS, distortion$LWS];
      return function distortionContentWindowGetter$LWS() {
        return distortionEntry$LWS;
      };
    };
  }
  const initDistortionRangeSetEnd$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("setEnd");
  const initDistortionRangeSelectNode$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("selectNode");
  const initDistortionRangeSelectNodeContents$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("selectNodeContents");
  const initDistortionRangeSetEndAfter$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("setEndAfter");
  const initDistortionRangeSetEndBefore$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("setEndBefore");
  const initDistortionRangeSetStart$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("setStart");
  const initDistortionRangeSetStartAfter$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("setStartAfter");
  const initDistortionRangeSetStartBefore$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("setStartBefore");
  const initDistortionRangeSurroundContents$LWS = createRangeProtoMethodDistortionFactoryInitializer$LWS("surroundContents");
  const {
    isSharedElement: isSharedElement$4$LWS
  } = rootValidator$LWS;
  function initDistortionSelectionCollapse$LWS({
    globalObject: {
      Selection: {
        prototype: {
          collapse: originalSelectionCollapse$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalSelectionCollapse$LWS, function collapse$LWS(...args$LWS) {
      if (args$LWS.length) {
        const {
          0: node$LWS
        } = args$LWS;
        if (node$LWS && isSharedElement$4$LWS(node$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot collapse selection to ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, node$LWS, [])}`);
        }
      }
      return ReflectApply$LWS$1(originalSelectionCollapse$LWS, this, args$LWS);
    }];
    return function distortionSelectionCollapse$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$3$LWS
  } = rootValidator$LWS;
  function initDistortionSelectionExtend$LWS({
    globalObject: {
      Selection: {
        prototype: {
          extend: originalSelectionExtend$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalSelectionExtend$LWS, function extend$LWS(...args$LWS) {
      if (args$LWS.length) {
        const {
          0: node$LWS
        } = args$LWS;
        if (isSharedElement$3$LWS(node$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot extend selection to ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, node$LWS, [])}`);
        }
      }
      return ReflectApply$LWS$1(originalSelectionExtend$LWS, this, args$LWS);
    }];
    return function distortionSelectionExtend$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$2$LWS
  } = rootValidator$LWS;
  function initDistortionSelectionSelectAllChildren$LWS({
    globalObject: {
      Selection: {
        prototype: {
          selectAllChildren: originalSelectionSelectAllChildren$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalSelectionSelectAllChildren$LWS, function selectAllChildren$LWS(...args$LWS) {
      if (args$LWS.length) {
        const {
          0: node$LWS
        } = args$LWS;
        if (isSharedElement$2$LWS(node$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot select all children of ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, node$LWS, [])}`);
        }
      }
      return ReflectApply$LWS$1(originalSelectionSelectAllChildren$LWS, this, args$LWS);
    }];
    return function distortionSelectionSelectAllChildren$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$1$LWS
  } = rootValidator$LWS;
  function initDistortionSelectionSetBaseAndExtent$LWS({
    globalObject: {
      Selection: {
        prototype: {
          setBaseAndExtent: originalSelectionSetBaseAndExtent$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalSelectionSetBaseAndExtent$LWS, function setBaseAndExtent$LWS(...args$LWS) {
      if (args$LWS.length === 4) {
        const {
          0: anchorNode$LWS,
          2: focusNode$LWS
        } = args$LWS;
        const anchorNodeIsShared$LWS = isSharedElement$1$LWS(anchorNode$LWS);
        const focusNodeIsShared$LWS = isSharedElement$1$LWS(focusNode$LWS);
        if (anchorNodeIsShared$LWS || focusNodeIsShared$LWS) {
          const subject$LWS = anchorNodeIsShared$LWS ? anchorNode$LWS : focusNode$LWS;
          throw new LockerSecurityError$LWS(`Cannot set selection with ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, subject$LWS, [])}`);
        }
      }
      return ReflectApply$LWS$1(originalSelectionSetBaseAndExtent$LWS, this, args$LWS);
    }];
    return function distortionSelectionSetBaseAndExtent$LWS() {
      return distortionEntry$LWS;
    };
  }
  const {
    isSharedElement: isSharedElement$LWS
  } = rootValidator$LWS;
  function initDistortionSelectionSetPosition$LWS({
    globalObject: {
      Selection: {
        prototype: {
          setPosition: originalSelectionSetPosition$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalSelectionSetPosition$LWS, function setPosition$LWS(...args$LWS) {
      if (args$LWS.length) {
        const {
          0: node$LWS
        } = args$LWS;
        if (node$LWS && isSharedElement$LWS(node$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot set position with ${ReflectApply$LWS$1(NodeProtoNodeNameGetter$LWS, node$LWS, [])}`);
        }
      }
      return ReflectApply$LWS$1(originalSelectionSetPosition$LWS, this, args$LWS);
    }];
    return function distortionSelectionSetPosition$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionServiceWorkerContainerProto$LWS({
    globalObject: {
      ServiceWorkerContainer: ServiceWorkerContainer$LWS
    }
  }) {
    if (typeof ServiceWorkerContainer$LWS !== "function") {
      return noop$LWS$1;
    }
    const {
      prototype: originalPrototype$LWS
    } = ServiceWorkerContainer$LWS;
    const distortionEntry$LWS = [originalPrototype$LWS, createRevokedProxy$LWS(originalPrototype$LWS)];
    return function distortionServiceWorkerContainerProto$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionShadowRootInnerHTMLSetter$LWS({
    document: document$LWS,
    globalObject: {
      ShadowRoot: ShadowRoot$LWS
    }
  }) {
    const originalInnerHTMLSetter$LWS = ObjectLookupOwnSetter$LWS(ShadowRoot$LWS.prototype, "innerHTML");
    return function distortionShadowRootInnerHTMLSetter$LWS({
      key: key$LWS
    }) {
      return [originalInnerHTMLSetter$LWS, function innerHTML$LWS(value$LWS) {
        setCustomElementsRegistry$LWS(document$LWS, key$LWS);
        ReflectApply$LWS$1(originalInnerHTMLSetter$LWS, this, [lwsInternalPolicy$LWS.createHTML(value$LWS, key$LWS, ContentType$LWS.HTML)]);
      }];
    };
  }
  function SharedWorker$LWS(scriptURL$LWS) {
    throw new LockerSecurityError$LWS(`Cannot create SharedWorker with ${toSafeTemplateStringValue$LWS(scriptURL$LWS)}.`);
  }
  function initDistortionSharedWorkerCtor$LWS({
    globalObject: {
      SharedWorker: originalSharedWorkerCtor$LWS
    }
  }) {
    if (typeof originalSharedWorkerCtor$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalSharedWorkerCtor$LWS, SharedWorker$LWS];
    return function distortionSharedWorkerCtor$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionSharedWorkerProto$LWS({
    globalObject: {
      SharedWorker: SharedWorker$LWS2
    }
  }) {
    if (typeof SharedWorker$LWS2 !== "function") {
      return noop$LWS$1;
    }
    const {
      prototype: originalPrototype$LWS
    } = SharedWorker$LWS2;
    const distortionEntry$LWS = [originalPrototype$LWS, createRevokedProxy$LWS(originalPrototype$LWS)];
    return function distortionSharedWorkerProto$LWS() {
      return distortionEntry$LWS;
    };
  }
  function getStorageKeysForNamespace$LWS(storage$LWS, namespace$LWS) {
    const storageKeys$LWS = ObjectKeys$LWS$1(storage$LWS);
    const keys$LWS = [];
    let keysOffset$LWS = 0;
    for (let i$LWS = 0, {
      length: length$LWS2
    } = storageKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const key$LWS = storageKeys$LWS[i$LWS];
      if (startsWithStorageNamespaceMarker$LWS(key$LWS, namespace$LWS)) {
        keys$LWS[keysOffset$LWS++] = key$LWS;
      }
    }
    return keys$LWS;
  }
  function processStorageKeysForNamespace$LWS(storageKeysForNamespace$LWS, namespace$LWS) {
    const {
      length: length$LWS2
    } = storageKeysForNamespace$LWS;
    const keys$LWS = ArrayCtor$LWS$1(length$LWS2);
    for (let i$LWS = 0; i$LWS < length$LWS2; i$LWS += 1) {
      const key$LWS = storageKeysForNamespace$LWS[i$LWS];
      keys$LWS[i$LWS] = removeStorageNamespaceMarker$LWS(key$LWS, namespace$LWS);
    }
    return keys$LWS;
  }
  const storageToMetaMap$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function getStorageMetaOrThrowInvalidInvocation$LWS(storage$LWS) {
    const storageMeta$LWS = storageToMetaMap$LWS.get(storage$LWS);
    if (storageMeta$LWS === void 0) {
      throw new LockerSecurityError$LWS(ERR_ILLEGAL_INVOCATION$LWS);
    }
    return storageMeta$LWS;
  }
  function createStorageProxy$LWS(storageTarget$LWS) {
    const proxy$LWS = new ProxyCtor$LWS(storageTarget$LWS, {
      get(target$LWS, key$LWS, receiver$LWS) {
        if (typeof key$LWS === "symbol") {
          return ReflectGet$LWS(target$LWS, key$LWS, receiver$LWS);
        }
        const {
          namespace: namespace$LWS,
          storage: storage$LWS
        } = storageToMetaMap$LWS.get(proxy$LWS);
        const markedKey$LWS = prependStorageNamespaceMarker$LWS(key$LWS, namespace$LWS);
        if (ObjectHasOwn$LWS$1(storage$LWS, markedKey$LWS)) {
          return ReflectGet$LWS(storage$LWS, markedKey$LWS);
        }
        const proto$LWS = ReflectGetPrototypeOf$LWS$1(target$LWS);
        return proto$LWS === null ? void 0 : ReflectGet$LWS(proto$LWS, key$LWS, receiver$LWS);
      },
      set(target$LWS, key$LWS, value$LWS) {
        if (typeof key$LWS === "symbol") {
          return ReflectSet$LWS(target$LWS, key$LWS, value$LWS);
        }
        const {
          namespace: namespace$LWS,
          storage: storage$LWS
        } = storageToMetaMap$LWS.get(proxy$LWS);
        const markedKey$LWS = prependStorageNamespaceMarker$LWS(key$LWS, namespace$LWS);
        ReflectApply$LWS$1(StorageProtoSetItem$LWS, storage$LWS, [markedKey$LWS, value$LWS]);
        return true;
      },
      defineProperty(target$LWS, key$LWS, unsafePartialDesc$LWS) {
        const safeDesc$LWS = unsafePartialDesc$LWS;
        ReflectSetPrototypeOf$LWS$1(safeDesc$LWS, null);
        if (typeof key$LWS === "symbol") {
          return ReflectDefineProperty$LWS$1(target$LWS, key$LWS, safeDesc$LWS);
        }
        const {
          namespace: namespace$LWS,
          storage: storage$LWS
        } = storageToMetaMap$LWS.get(proxy$LWS);
        const markedKey$LWS = prependStorageNamespaceMarker$LWS(key$LWS, namespace$LWS);
        return ReflectDefineProperty$LWS$1(storage$LWS, markedKey$LWS, safeDesc$LWS);
      },
      deleteProperty(target$LWS, key$LWS) {
        if (typeof key$LWS === "symbol") {
          return ReflectDeleteProperty$LWS$1(target$LWS, key$LWS);
        }
        const {
          namespace: namespace$LWS,
          storage: storage$LWS
        } = storageToMetaMap$LWS.get(proxy$LWS);
        const markedKey$LWS = prependStorageNamespaceMarker$LWS(key$LWS, namespace$LWS);
        return ReflectDeleteProperty$LWS$1(storage$LWS, markedKey$LWS);
      },
      getOwnPropertyDescriptor(target$LWS, key$LWS) {
        let safeDesc$LWS;
        if (typeof key$LWS === "symbol") {
          safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS(target$LWS, key$LWS);
        } else {
          const {
            namespace: namespace$LWS,
            storage: storage$LWS
          } = storageToMetaMap$LWS.get(proxy$LWS);
          const markedKey$LWS = prependStorageNamespaceMarker$LWS(key$LWS, namespace$LWS);
          safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS(storage$LWS, markedKey$LWS);
        }
        if (safeDesc$LWS) {
          ReflectSetPrototypeOf$LWS$1(safeDesc$LWS, null);
        }
        return safeDesc$LWS;
      },
      ownKeys(target$LWS) {
        const {
          namespace: namespace$LWS,
          storage: storage$LWS
        } = storageToMetaMap$LWS.get(proxy$LWS);
        const storageKeysForNamespace$LWS = getStorageKeysForNamespace$LWS(storage$LWS, namespace$LWS);
        const storageKeys$LWS = processStorageKeysForNamespace$LWS(storageKeysForNamespace$LWS, namespace$LWS);
        const localSymbolKeys$LWS = ObjectGetOwnPropertySymbols$LWS(target$LWS);
        return ArrayConcat$LWS(storageKeys$LWS, localSymbolKeys$LWS);
      },
      has(target$LWS, key$LWS) {
        if (typeof key$LWS === "symbol") {
          return ReflectHas$LWS(target$LWS, key$LWS);
        }
        const {
          namespace: namespace$LWS,
          storage: storage$LWS
        } = storageToMetaMap$LWS.get(proxy$LWS);
        const markedKey$LWS = prependStorageNamespaceMarker$LWS(key$LWS, namespace$LWS);
        if (ObjectHasOwn$LWS$1(storage$LWS, markedKey$LWS)) {
          return true;
        }
        const proto$LWS = ReflectGetPrototypeOf$LWS$1(target$LWS);
        if (proto$LWS === null) {
          return false;
        }
        return ReflectHas$LWS(proto$LWS, key$LWS);
      },
      preventExtensions(_target$LWS) {
        return false;
      }
    });
    return proxy$LWS;
  }
  class PatchedStorage$LWS {
    constructor() {
      throw new LockerSecurityError$LWS(ERR_ILLEGAL_CONSTRUCTOR$LWS);
    }
    get length() {
      const {
        namespace: namespace$LWS,
        storage: storage$LWS
      } = getStorageMetaOrThrowInvalidInvocation$LWS(this);
      const storageKeysForNamespace$LWS = getStorageKeysForNamespace$LWS(storage$LWS, namespace$LWS);
      return storageKeysForNamespace$LWS.length;
    }
    key(...args$LWS) {
      const {
        namespace: namespace$LWS,
        storage: storage$LWS
      } = getStorageMetaOrThrowInvalidInvocation$LWS(this);
      if (args$LWS.length) {
        const storageKeysForNamespace$LWS = getStorageKeysForNamespace$LWS(storage$LWS, namespace$LWS);
        const index$LWS = args$LWS[0];
        const storageKey$LWS = storageKeysForNamespace$LWS[index$LWS];
        const storageDefaultKey$LWS = storageKeysForNamespace$LWS[0];
        const resolvedKey$LWS = storageKey$LWS || storageDefaultKey$LWS;
        if (typeof resolvedKey$LWS !== "string") {
          return null;
        }
        return removeStorageNamespaceMarker$LWS(resolvedKey$LWS, namespace$LWS);
      }
      return ReflectApply$LWS$1(StorageProtoKey$LWS, storage$LWS, args$LWS);
    }
    getItem(...args$LWS) {
      const {
        namespace: namespace$LWS,
        storage: storage$LWS
      } = getStorageMetaOrThrowInvalidInvocation$LWS(this);
      if (args$LWS.length) {
        args$LWS[0] = prependStorageNamespaceMarker$LWS(toString$LWS(args$LWS[0]), namespace$LWS);
      }
      return ReflectApply$LWS$1(StorageProtoGetItem$LWS, storage$LWS, args$LWS);
    }
    setItem(...args$LWS) {
      const {
        namespace: namespace$LWS,
        storage: storage$LWS
      } = getStorageMetaOrThrowInvalidInvocation$LWS(this);
      if (args$LWS.length > 1) {
        args$LWS[0] = prependStorageNamespaceMarker$LWS(toString$LWS(args$LWS[0]), namespace$LWS);
        args$LWS[1] = toString$LWS(args$LWS[1]);
      }
      ReflectApply$LWS$1(StorageProtoSetItem$LWS, storage$LWS, args$LWS);
    }
    removeItem(...args$LWS) {
      const {
        namespace: namespace$LWS,
        storage: storage$LWS
      } = getStorageMetaOrThrowInvalidInvocation$LWS(this);
      if (args$LWS.length) {
        args$LWS[0] = prependStorageNamespaceMarker$LWS(toString$LWS(args$LWS[0]), namespace$LWS);
      }
      ReflectApply$LWS$1(StorageProtoRemoveItem$LWS, storage$LWS, args$LWS);
    }
    clear() {
      const {
        namespace: namespace$LWS,
        storage: storage$LWS
      } = getStorageMetaOrThrowInvalidInvocation$LWS(this);
      const storageKeysForNamespace$LWS = getStorageKeysForNamespace$LWS(storage$LWS, namespace$LWS);
      for (let i$LWS = 0, {
        length: length$LWS2
      } = storageKeysForNamespace$LWS; i$LWS < length$LWS2; i$LWS += 1) {
        const key$LWS = storageKeysForNamespace$LWS[i$LWS];
        ReflectApply$LWS$1(StorageProtoRemoveItem$LWS, storage$LWS, [key$LWS]);
      }
    }
  }
  function createStorage$LWS(storage$LWS, namespace$LWS) {
    const proxy$LWS = createStorageProxy$LWS({
      __proto__: PatchedStorage$LWS.prototype
    });
    trackAsLiveTarget$LWS(proxy$LWS);
    storageToMetaMap$LWS.set(proxy$LWS, {
      namespace: namespace$LWS,
      storage: storage$LWS
    });
    return proxy$LWS;
  }
  const {
    prototype: PatchedStorageProto$LWS
  } = PatchedStorage$LWS;
  const {
    clear: patchedStorageProtoClear$LWS,
    getItem: patchedStorageProtoGetItem$LWS,
    key: patchedStorageProtoKey$LWS,
    removeItem: patchedStorageProtoRemoveItem$LWS,
    setItem: patchedStorageProtoSetItem$LWS
  } = PatchedStorageProto$LWS;
  const patchedStorageProtoLengthGetter$LWS = ObjectLookupOwnGetter$LWS$1(PatchedStorageProto$LWS, "length");
  function createDistortionStorageFactoryInitializer$LWS(storageName$LWS) {
    return function initDistortionStorageFactory$LWS({
      globalObject: globalObject$LWS
    }) {
      let originalStorageObject$LWS;
      try {
        originalStorageObject$LWS = globalObject$LWS[storageName$LWS];
      } catch (_unused2$LWS) {
      }
      if (!isObject$LWS$1(originalStorageObject$LWS)) {
        return noop$LWS$1;
      }
      return function distortionStorageFactory$LWS({
        key: key$LWS
      }) {
        return [originalStorageObject$LWS, createStorage$LWS(originalStorageObject$LWS, key$LWS)];
      };
    };
  }
  function initDistortionStorageLength$LWS({
    globalObject: {
      Storage: Storage$LWS
    }
  }) {
    const originalLengthGetter$LWS = ObjectLookupOwnGetter$LWS$1(Storage$LWS.prototype, "length");
    const distortionEntry$LWS = [originalLengthGetter$LWS, patchedStorageProtoLengthGetter$LWS];
    return function distortionStorageLength$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionStorageGetItem$LWS({
    globalObject: {
      Storage: {
        prototype: {
          getItem: originalStorageGetItem$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalStorageGetItem$LWS, patchedStorageProtoGetItem$LWS];
    return function distortionStorageSetItem$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionStorageSetItem$LWS({
    globalObject: {
      Storage: {
        prototype: {
          setItem: originalStorageSetItem$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalStorageSetItem$LWS, patchedStorageProtoSetItem$LWS];
    return function distortionStorageSetItem$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionStorageKey$LWS({
    globalObject: {
      Storage: {
        prototype: {
          key: originalStorageKey$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalStorageKey$LWS, patchedStorageProtoKey$LWS];
    return function distortionStorageKey$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionStorageRemoveItem$LWS({
    globalObject: {
      Storage: {
        prototype: {
          removeItem: originalStorageRemoveItem$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalStorageRemoveItem$LWS, patchedStorageProtoRemoveItem$LWS];
    return function distortionStorageRemoveItem$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionStorageClear$LWS({
    globalObject: {
      Storage: {
        prototype: {
          clear: originalStorageClear$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalStorageClear$LWS, patchedStorageProtoClear$LWS];
    return function distortionStorageClear$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionStorage$LWS({
    globalObject: {
      Storage: Storage$LWS
    }
  }) {
    const distortionEntry$LWS = [Storage$LWS, PatchedStorage$LWS];
    return function distortionStorage$LWS() {
      return distortionEntry$LWS;
    };
  }
  const initDistortionLocalStorage$LWS = createDistortionStorageFactoryInitializer$LWS("localStorage");
  const initDistortionSessionStorage$LWS = createDistortionStorageFactoryInitializer$LWS("sessionStorage");
  function initDistortionSVGAnimateElementAttributeNameAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      },
      SVGAnimateElement: SVGAnimateElement$LWS
    }
  }) {
    return function distortionSVGAnimateElementAttributeNameAttribute$LWS(record$LWS) {
      function distortAttribute$LWS(el$LWS, attrName$LWS) {
        if (ReflectApply$LWS$1(ElementProtoHasAttribute$LWS, el$LWS, [attrName$LWS])) {
          const originalAttributeValue$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, el$LWS, [attrName$LWS]);
          if (originalAttributeValue$LWS) {
            const distortion$LWS = getAttributeDistortion$LWS(record$LWS, el$LWS, attrName$LWS);
            if (distortion$LWS) {
              ReflectApply$LWS$1(distortion$LWS, el$LWS, [originalAttributeValue$LWS]);
            }
          }
        }
      }
      registerAttributeDistortion$LWS(record$LWS, SVGAnimateElement$LWS, "attributeName", NAMESPACE_DEFAULT$LWS, function attributeName$LWS(value$LWS) {
        ReflectApply$LWS$1(originalSetAttribute$LWS, this, ["attributeName", value$LWS]);
        if (value$LWS === "href") {
          distortAttribute$LWS(this, "from");
          distortAttribute$LWS(this, "to");
          distortAttribute$LWS(this, "values");
        }
      });
    };
  }
  function initDistortionSVGAnimateElementFromAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      },
      SVGAnimateElement: SVGAnimateElement$LWS
    }
  }) {
    function from$LWS(value$LWS) {
      if (ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, ["attributeName"]) === "href") {
        value$LWS = sanitizeSvgHref$LWS(value$LWS);
      }
      ReflectApply$LWS$1(originalSetAttribute$LWS, this, ["from", value$LWS]);
    }
    return function distortionSVGAnimateElementFromAttribute$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, SVGAnimateElement$LWS, "from", NAMESPACE_DEFAULT$LWS, from$LWS);
    };
  }
  function initDistortionSVGAnimateElementToAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      },
      SVGAnimateElement: SVGAnimateElement$LWS
    }
  }) {
    function to$LWS(value$LWS) {
      if (ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, ["attributeName"]) === "href") {
        value$LWS = sanitizeSvgHref$LWS(value$LWS);
      }
      ReflectApply$LWS$1(originalSetAttribute$LWS, this, ["to", value$LWS]);
    }
    return function distortionSVGAnimateElementToAttribute$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, SVGAnimateElement$LWS, "to", NAMESPACE_DEFAULT$LWS, to$LWS);
    };
  }
  function initDistortionSVGAnimateElementValuesAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      },
      SVGAnimateElement: SVGAnimateElement$LWS
    }
  }) {
    function values$LWS(value$LWS) {
      let returnValues$LWS = value$LWS;
      if (ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, ["attributeName"]) === "href") {
        const valuesSplit$LWS = ReflectApply$LWS$1(StringProtoSplit$LWS, value$LWS, [";"]);
        const {
          length: length$LWS2
        } = valuesSplit$LWS;
        for (let i$LWS = 0; i$LWS < length$LWS2; i$LWS += 1) {
          valuesSplit$LWS[i$LWS] = sanitizeSvgHref$LWS(valuesSplit$LWS[i$LWS]);
        }
        returnValues$LWS = ReflectApply$LWS$1(ArrayProtoJoin$LWS$1, valuesSplit$LWS, [";"]);
      }
      ReflectApply$LWS$1(originalSetAttribute$LWS, this, ["values", returnValues$LWS]);
    }
    return function distortionSVGAnimateElementValuesAttribute$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, SVGAnimateElement$LWS, "values", NAMESPACE_DEFAULT$LWS, values$LWS);
    };
  }
  function initDistortionSVGElementDatasetGetter$LWS({
    globalObject: {
      SVGElement: SVGElement$LWS
    }
  }) {
    const originalDatasetGetter$LWS = ObjectLookupOwnGetter$LWS$1(SVGElement$LWS.prototype, "dataset");
    const distortionEntry$LWS = [originalDatasetGetter$LWS, function dataset$LWS() {
      return trackAsLiveTarget$LWS(ReflectApply$LWS$1(originalDatasetGetter$LWS, this, []));
    }];
    return function distortionSVGElementDatasetGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionSVGElementStyleGetter$LWS({
    globalObject: {
      SVGElement: SVGElement$LWS
    }
  }) {
    const originalStyleGetter$LWS = ObjectLookupOwnGetter$LWS$1(SVGElement$LWS.prototype, "style");
    const distortionEntry$LWS = [originalStyleGetter$LWS, function style$LWS() {
      return trackAsLiveTarget$LWS(ReflectApply$LWS$1(originalStyleGetter$LWS, this, []));
    }];
    return function distortionSVGElementStyleGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  const script$LWS = ReflectApply$LWS$1(DocumentProtoCreateElementNS$LWS, document, [NAMESPACE_SVG$LWS, "script"]);
  function initDistortionSVGScriptElementHrefGetter$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      },
      SVGScriptElement: SVGScriptElement$LWS
    }
  }) {
    const originalHrefGetter$LWS = ObjectLookupOwnGetter$LWS$1(SVGScriptElement$LWS.prototype, "href");
    const distortionEntry$LWS = [originalHrefGetter$LWS, function href$LWS() {
      const url$LWS = getScriptURL$LWS(this);
      if (typeof url$LWS === "string") {
        ReflectApply$LWS$1(originalSetAttribute$LWS, script$LWS, ["href", trusted.createScriptURL(url$LWS)]);
        return ReflectApply$LWS$1(originalHrefGetter$LWS, script$LWS, []);
      }
      return ReflectApply$LWS$1(originalHrefGetter$LWS, this, []);
    }];
    return function distortionSVGScriptElementHrefGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionSVGScriptElementHrefSetter$LWS({
    globalObject: {
      SVGScriptElement: SVGScriptElement$LWS
    }
  }) {
    return function distortionSVGScriptElementHrefSetter$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, SVGScriptElement$LWS, "href", NAMESPACE_XLINK$LWS, createScriptDistortion$LWS(record$LWS, "href"));
      registerAttributeDistortion$LWS(record$LWS, SVGScriptElement$LWS, "xlink:href", NAMESPACE_XLINK$LWS, createScriptDistortion$LWS(record$LWS, "xlink:href"));
      registerAttributeDistortion$LWS(record$LWS, SVGScriptElement$LWS, "href", NAMESPACE_DEFAULT$LWS, createScriptDistortion$LWS(record$LWS, "href"));
      registerAttributeDistortion$LWS(record$LWS, SVGScriptElement$LWS, "xlink:href", NAMESPACE_DEFAULT$LWS, createScriptDistortion$LWS(record$LWS, "xlink:href"));
    };
  }
  function initDistortionSVGSetElementAttributeNameAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      },
      SVGSetElement: SVGSetElement$LWS
    }
  }) {
    return function distortionSVGSetElementAttributeNameAttribute$LWS(record$LWS) {
      function distortAttribute$LWS(el$LWS, attrName$LWS) {
        if (ReflectApply$LWS$1(ElementProtoHasAttribute$LWS, el$LWS, [attrName$LWS])) {
          const originalAttributeValue$LWS = ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, el$LWS, [attrName$LWS]);
          if (originalAttributeValue$LWS) {
            const distortion$LWS = getAttributeDistortion$LWS(record$LWS, el$LWS, attrName$LWS);
            if (distortion$LWS) {
              ReflectApply$LWS$1(distortion$LWS, el$LWS, [originalAttributeValue$LWS]);
            }
          }
        }
      }
      function attributeName$LWS(value$LWS) {
        ReflectApply$LWS$1(originalSetAttribute$LWS, this, ["attributeName", value$LWS]);
        if (value$LWS === "href") {
          distortAttribute$LWS(this, "to");
        }
      }
      registerAttributeDistortion$LWS(record$LWS, SVGSetElement$LWS, "attributeName", NAMESPACE_DEFAULT$LWS, attributeName$LWS);
    };
  }
  function initDistortionSVGSetElementToAttribute$LWS({
    globalObject: {
      Element: {
        prototype: {
          setAttribute: originalSetAttribute$LWS
        }
      },
      SVGSetElement: SVGSetElement$LWS
    }
  }) {
    function to$LWS(value$LWS) {
      if (ReflectApply$LWS$1(ElementProtoGetAttribute$LWS, this, ["attributeName"]) === "href") {
        value$LWS = sanitizeSvgHref$LWS(value$LWS);
      }
      ReflectApply$LWS$1(originalSetAttribute$LWS, this, ["to", value$LWS]);
    }
    return function distortionSVGSetElementToAttribute$LWS(record$LWS) {
      registerAttributeDistortion$LWS(record$LWS, SVGSetElement$LWS, "to", NAMESPACE_DEFAULT$LWS, to$LWS);
    };
  }
  function createDistortionHrefAttributeFactoryInitializer$LWS(attributeName$LWS) {
    return function distortionHrefAttributeFactoryInitializer$LWS({
      globalObject: {
        Element: {
          prototype: {
            setAttribute: originalSetAttribute$LWS,
            setAttributeNS: originalSetAttributeNS$LWS
          }
        },
        SVGUseElement: SVGUseElement$LWS
      }
    }) {
      function xlinkNamespaceDistortion$LWS(value$LWS) {
        const returnValue$LWS = value$LWS === null || value$LWS === void 0 || value$LWS === "" ? value$LWS : sanitizeSvgHref$LWS(value$LWS);
        ReflectApply$LWS$1(originalSetAttributeNS$LWS, this, [NAMESPACE_XLINK$LWS, attributeName$LWS, returnValue$LWS]);
      }
      return function distortionHrefAttributeFactory$LWS(record$LWS) {
        registerAttributeDistortion$LWS(record$LWS, SVGUseElement$LWS, attributeName$LWS, NAMESPACE_XLINK$LWS, xlinkNamespaceDistortion$LWS);
        if (attributeName$LWS === "href") {
          const defaultNamespaceDistortion$LWS = function defaultNamespaceDistortion$LWS2(value$LWS) {
            const returnValue$LWS = value$LWS === null || value$LWS === void 0 || value$LWS === "" ? value$LWS : sanitizeSvgHref$LWS(value$LWS);
            ReflectApply$LWS$1(originalSetAttribute$LWS, this, [attributeName$LWS, returnValue$LWS]);
          };
          registerAttributeDistortion$LWS(record$LWS, SVGUseElement$LWS, attributeName$LWS, NAMESPACE_DEFAULT$LWS, defaultNamespaceDistortion$LWS);
        }
      };
    };
  }
  const initDistortionSVGUseElementHrefAttribute$LWS = createDistortionHrefAttributeFactoryInitializer$LWS("href");
  const initDistortionSVGUseElementXlinkHrefAttribute$LWS = createDistortionHrefAttributeFactoryInitializer$LWS("xlink:href");
  function createTrustedTypesExceptionMessage$LWS(name$LWS) {
    return `Cannot create TrustedTypePolicy with '${name$LWS}' policy name.`;
  }
  function initDistortionTrustedTypePolicyFactoryCreatePolicy$LWS({
    globalObject: {
      TrustedTypePolicyFactory: TrustedTypePolicyFactory$LWS
    }
  }) {
    var _TrustedTypePolicyFac$LWS;
    const originalCreatePolicy$LWS = TrustedTypePolicyFactory$LWS == null || (_TrustedTypePolicyFac$LWS = TrustedTypePolicyFactory$LWS.prototype) == null ? void 0 : _TrustedTypePolicyFac$LWS.createPolicy;
    if (typeof originalCreatePolicy$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalCreatePolicy$LWS, function createPolicy$LWS(...args$LWS) {
      const name$LWS = args$LWS.length ? args$LWS[0] : void 0;
      if (name$LWS === "default") {
        throw new LockerSecurityError$LWS(createTrustedTypesExceptionMessage$LWS(name$LWS));
      }
      try {
        return ReflectApply$LWS$1(originalCreatePolicy$LWS, this, args$LWS);
      } catch (_unused3$LWS) {
        consoleWarn$LWS(`${createTrustedTypesExceptionMessage$LWS(name$LWS)} Substituting with Lightning Web Security policy.`);
      }
      return trusted;
    }];
    return function distortionTrustedTypePolicyFactoryCreatePolicy$LWS() {
      return distortionEntry$LWS;
    };
  }
  const HTML_MIME_TYPES_LIST$LWS = toSafeArray$LWS$1(["text/html", "image/svg+xml", "text/xml"]);
  const createInsecureBlobErrorMessage$LWS = (input$LWS) => `Cannot 'createObjectURL' using an unsecure ${toSafeTemplateStringValue$LWS(input$LWS)}.`;
  function initDistortionURLCreateObjectURL$LWS({
    document: document$LWS,
    globalObject: globalObject$LWS,
    globalObject: {
      MediaSource: MediaSource$LWS,
      URL: {
        createObjectURL: originalCreateObjectURL$LWS
      }
    }
  }) {
    const {
      isEqualDomString: isEqualDomString$LWS,
      isInherentlyUnsecure: isInherentlyUnsecure$LWS2
    } = getValidator$LWS(document$LWS, globalObject$LWS);
    return function distortionURLCreateObjectURL$LWS({
      key: key$LWS
    }) {
      const sanitizer$LWS = blobSanitizer$LWS(key$LWS);
      return [originalCreateObjectURL$LWS, function createObjectURL$LWS(blobObject$LWS) {
        let outURL$LWS = ReflectApply$LWS$1(originalCreateObjectURL$LWS, this, [blobObject$LWS]);
        if (MediaSource$LWS && blobObject$LWS instanceof MediaSource$LWS) {
          return outURL$LWS;
        }
        const blobType$LWS = ReflectApply$LWS$1(BlobProtoTypeGetter$LWS, blobObject$LWS, []);
        if (blobType$LWS === "") {
          const plainTextBlob$LWS = ReflectApply$LWS$1(BlobProtoSlice$LWS, blobObject$LWS, [0, void 0, "text/plain"]);
          return ReflectApply$LWS$1(originalCreateObjectURL$LWS, this, [plainTextBlob$LWS]);
        }
        const loweredBlobType$LWS = ReflectApply$LWS$1(StringProtoToLowerCase$LWS, blobType$LWS, []);
        if (HTML_MIME_TYPES_LIST$LWS.includes(loweredBlobType$LWS)) {
          const blobSize$LWS = ReflectApply$LWS$1(BlobProtoSizeGetter$LWS, blobObject$LWS, []);
          const normalizedBlob$LWS = ReflectApply$LWS$1(BlobProtoSlice$LWS, blobObject$LWS, [0, blobSize$LWS, `${loweredBlobType$LWS};charset=utf-8`]);
          URLRevokeObjectURL$LWS(outURL$LWS);
          outURL$LWS = ReflectApply$LWS$1(originalCreateObjectURL$LWS, this, [normalizedBlob$LWS]);
          const xhr$LWS = new XhrCtor$LWS();
          ReflectApply$LWS$1(XhrProtoOpen$LWS, xhr$LWS, ["GET", outURL$LWS, false]);
          try {
            ReflectApply$LWS$1(XhrProtoSend$LWS, xhr$LWS, []);
          } catch (_unused4$LWS) {
            throw new LockerSecurityError$LWS(`Unable to verify ${toSafeTemplateStringValue$LWS(blobObject$LWS)} is secure.`);
          }
          const responseText$LWS = ReflectApply$LWS$1(XhrProtoResponseTextGetter$LWS, xhr$LWS, []);
          if (isInherentlyUnsecure$LWS2(responseText$LWS)) {
            throw new LockerSecurityError$LWS(createInsecureBlobErrorMessage$LWS(blobObject$LWS));
          }
          const sanitized$LWS = sanitizer$LWS.sanitize(responseText$LWS);
          if (!isEqualDomString$LWS(trusted.createHTML(responseText$LWS), trusted.createHTML(sanitized$LWS))) {
            URLRevokeObjectURL$LWS(outURL$LWS);
            throw new LockerSecurityError$LWS(createInsecureBlobErrorMessage$LWS(blobObject$LWS));
          }
          return outURL$LWS;
        }
        if (isMIMETypeAllowed$LWS(loweredBlobType$LWS)) {
          return outURL$LWS;
        }
        URLRevokeObjectURL$LWS(outURL$LWS);
        throw new LockerSecurityError$LWS("Unsupported MIME type.");
      }];
    };
  }
  function initDistortionWindowFetch$LWS({
    globalObject: {
      fetch: originalFetch$LWS
    }
  }) {
    const distortionEntry$LWS = [originalFetch$LWS, function fetch$LWS(...args$LWS) {
      let {
        0: url$LWS
      } = args$LWS;
      if (url$LWS !== null && url$LWS !== void 0) {
        let parsedURL$LWS;
        if (url$LWS instanceof Request) {
          parsedURL$LWS = parseURL$LWS(ReflectApply$LWS$1(RequestProtoURLGetter$LWS, url$LWS, []));
        } else {
          parsedURL$LWS = parseURL$LWS(toString$LWS(url$LWS));
          url$LWS = parsedURL$LWS.normalizedURL;
          args$LWS[0] = url$LWS;
        }
        if (!isValidURL$LWS(parsedURL$LWS)) {
          const {
            normalizedURL: normalizedURL$LWS
          } = parsedURL$LWS;
          return PromiseReject$LWS(new LockerSecurityError$LWS(`Cannot request disallowed endpoint: ${toSafeTemplateStringValue$LWS(normalizedURL$LWS)}`));
        }
      }
      return ReflectApply$LWS$1(originalFetch$LWS, this, args$LWS);
    }];
    return function distortionWindowFetch$LWS() {
      return distortionEntry$LWS;
    };
  }
  class BaseFrameHandler$LWS {
    defineProperty(_target$LWS, _key$LWS, _descriptor$LWS) {
      return true;
    }
    deleteProperty(_target$LWS, _key$LWS) {
      return true;
    }
    getOwnPropertyDescriptor(_target$LWS, _key$LWS) {
      return void 0;
    }
    isExtensible(_target$LWS) {
      return true;
    }
    ownKeys(_target$LWS) {
      return [];
    }
    preventExtensions(_target$LWS) {
      return true;
    }
    set(_target$LWS, _key$LWS, _value$LWS, _receiver$LWS) {
      return true;
    }
    setPrototypeOf(_target$LWS) {
      return false;
    }
  }
  ReflectSetPrototypeOf$LWS$1(BaseFrameHandler$LWS.prototype, null);
  class ShadowFramesPrototypeHandler$LWS extends BaseFrameHandler$LWS {
  }
  function initDistortionWindowFramesGetter$LWS({
    globalObject: globalObject$LWS
  }) {
    const originalWindowFramesGetter$LWS = ObjectLookupOwnGetter$LWS$1(globalObject$LWS, "frames");
    if (typeof originalWindowFramesGetter$LWS !== "function") {
      return noop$LWS$1;
    }
    const createFramesProxy$LWS = () => {
      const WindowPrototype$LWS = ReflectGetPrototypeOf$LWS$1(globalObject$LWS);
      const WindowProperties$LWS = ReflectGetPrototypeOf$LWS$1(WindowPrototype$LWS);
      const framesLengthGetter$LWS = ReflectApply$LWS$1(FunctionProtoBind$LWS, WindowLengthGetter$LWS, [globalObject$LWS]);
      const framesLengthSetter$LWS = ReflectApply$LWS$1(FunctionProtoBind$LWS, noop$LWS$1, []);
      const getFrameByIndexKey$LWS = (key$LWS) => {
        const possibleIndex$LWS = typeof key$LWS === "string" ? +key$LWS : -1;
        if (possibleIndex$LWS > -1 && NumberIsInteger$LWS$1(possibleIndex$LWS) && possibleIndex$LWS < ReflectApply$LWS$1(WindowLengthGetter$LWS, globalObject$LWS, [])) {
          const value$LWS = ObjectLookupOwnValue$LWS(globalObject$LWS, key$LWS);
          if (isWindow$LWS(value$LWS)) {
            return value$LWS;
          }
        }
        return void 0;
      };
      const getFrameByNameKey$LWS = (key$LWS) => {
        if (typeof key$LWS === "string" && !ObjectHasOwn$LWS$1(globalObject$LWS, key$LWS) && !ObjectHasOwn$LWS$1(WindowPrototype$LWS, key$LWS)) {
          const value$LWS = ObjectLookupOwnValue$LWS(WindowProperties$LWS, key$LWS);
          if (isWindow$LWS(value$LWS)) {
            return value$LWS;
          }
        }
        return void 0;
      };
      const getValueByKey$LWS = (key$LWS) => key$LWS === "length" ? ReflectApply$LWS$1(WindowLengthGetter$LWS, globalObject$LWS, []) : getFrameByIndexKey$LWS(key$LWS);
      class ShadowFrameHandler$LWS extends BaseFrameHandler$LWS {
        get(target$LWS, key$LWS, receiver$LWS) {
          const value$LWS = getValueByKey$LWS(key$LWS);
          return value$LWS === void 0 ? ReflectGet$LWS(target$LWS, key$LWS, receiver$LWS) : value$LWS;
        }
        getOwnPropertyDescriptor(_target$LWS, key$LWS) {
          if (key$LWS === "length") {
            return {
              __proto__: null,
              configurable: true,
              enumerable: true,
              get: framesLengthGetter$LWS,
              set: framesLengthSetter$LWS
            };
          }
          const value$LWS = getFrameByIndexKey$LWS(key$LWS);
          if (value$LWS) {
            return {
              __proto__: null,
              configurable: true,
              enumerable: true,
              value: value$LWS,
              writable: false
            };
          }
          return void 0;
        }
        has(target$LWS, key$LWS) {
          return ReflectHas$LWS(target$LWS, key$LWS) || getValueByKey$LWS(key$LWS) !== void 0;
        }
        ownKeys() {
          const {
            length: length$LWS2
          } = globalObject$LWS;
          const keys$LWS = ArrayCtor$LWS$1(length$LWS2 + 1);
          for (let i$LWS = 0; i$LWS < length$LWS2; i$LWS += 1) {
            keys$LWS[i$LWS] = `${i$LWS}`;
          }
          keys$LWS[length$LWS2] = "length";
          return keys$LWS;
        }
      }
      class ShadowWindowPropertiesHandler$LWS extends ShadowFramesPrototypeHandler$LWS {
        get(target$LWS, key$LWS, receiver$LWS) {
          const value$LWS = getFrameByNameKey$LWS(key$LWS);
          return value$LWS === void 0 ? ReflectGet$LWS(target$LWS, key$LWS, receiver$LWS) : value$LWS;
        }
        getOwnPropertyDescriptor(_target$LWS, key$LWS) {
          const value$LWS = getFrameByNameKey$LWS(key$LWS);
          if (value$LWS === void 0) {
            return value$LWS;
          }
          return {
            __proto__: null,
            configurable: true,
            enumerable: true,
            value: value$LWS,
            writable: false
          };
        }
        has(target$LWS, key$LWS) {
          return ReflectHas$LWS(target$LWS, key$LWS) || getFrameByNameKey$LWS(key$LWS) !== void 0;
        }
        ownKeys() {
          const keys$LWS = [];
          let keysOffset$LWS = 0;
          const unsafeDescs$LWS = ObjectGetOwnPropertyDescriptors$LWS(WindowProperties$LWS);
          ReflectSetPrototypeOf$LWS$1(unsafeDescs$LWS, null);
          for (const key$LWS in unsafeDescs$LWS) {
            if (typeof key$LWS === "string") {
              const unsafeDesc$LWS = unsafeDescs$LWS[key$LWS];
              if (ObjectHasOwn$LWS$1(unsafeDesc$LWS, "value") && isWindow$LWS(unsafeDesc$LWS.value)) {
                keys$LWS[keysOffset$LWS++] = key$LWS;
              }
            }
          }
          return keys$LWS;
        }
      }
      const shadowFrames$LWS = {};
      const shadowFramesPrototype$LWS = {};
      const shadowWindowProperties$LWS = {};
      const shadowFramesHandler$LWS = new ShadowFrameHandler$LWS();
      const shadowFramesPrototypeHandler$LWS = new ShadowFramesPrototypeHandler$LWS();
      const shadowWindowPropertiesHandler$LWS = new ShadowWindowPropertiesHandler$LWS();
      const framesPrototypeProxy$LWS = new ProxyCtor$LWS(shadowFramesPrototype$LWS, shadowFramesPrototypeHandler$LWS);
      const windowPropertiesProxy$LWS = new ProxyCtor$LWS(shadowWindowProperties$LWS, shadowWindowPropertiesHandler$LWS);
      ReflectSetPrototypeOf$LWS$1(shadowFrames$LWS, framesPrototypeProxy$LWS);
      ReflectSetPrototypeOf$LWS$1(shadowFramesPrototype$LWS, windowPropertiesProxy$LWS);
      return new ProxyCtor$LWS(shadowFrames$LWS, shadowFramesHandler$LWS);
    };
    let framesProxy$LWS;
    const distortionEntry$LWS = [
      originalWindowFramesGetter$LWS,
      function frames$LWS() {
        if (framesProxy$LWS === void 0) {
          framesProxy$LWS = createFramesProxy$LWS();
        }
        return framesProxy$LWS;
      }
    ];
    return function distortionWindowFramesGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionWindowGetComputedStyle$LWS({
    globalObject: {
      getComputedStyle: originalGetComputedStyle$LWS
    }
  }) {
    const distortionEntry$LWS = [originalGetComputedStyle$LWS, function getComputedStyle$LWS(...args$LWS) {
      return trackAsLiveTarget$LWS(ReflectApply$LWS$1(originalGetComputedStyle$LWS, this, args$LWS));
    }];
    return function distortionWindowGetComputedStyle$LWS() {
      return distortionEntry$LWS;
    };
  }
  function length$LWS() {
    return 0;
  }
  function initDistortionWindowLengthGetter$LWS({
    globalObject: globalObject$LWS
  }) {
    const originalLengthGetter$LWS = ObjectLookupOwnGetter$LWS$1(globalObject$LWS, "length");
    if (typeof originalLengthGetter$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalLengthGetter$LWS, length$LWS];
    return function distortionWindowLengthGetter$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionWindowOnrejectionhandled$LWS({
    globalObject: globalObject$LWS,
    globalObject: {
      Window: Window$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(globalObject$LWS, Window$LWS, "rejectionhandled");
  }
  function initDistortionWindowOnsecuritypolicyviolation$LWS({
    globalObject: globalObject$LWS,
    globalObject: {
      Window: Window$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(globalObject$LWS, Window$LWS, "securitypolicyviolation");
  }
  function initDistortionWindowOnstorage$LWS({
    globalObject: globalObject$LWS,
    globalObject: {
      Window: Window$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(globalObject$LWS, Window$LWS, "storage");
  }
  function initDistortionWindowOnunhandledrejection$LWS({
    globalObject: globalObject$LWS,
    globalObject: {
      Window: Window$LWS
    }
  }) {
    return createEventDistortionFactory$LWS(globalObject$LWS, Window$LWS, "unhandledrejection");
  }
  function initDistortionWindowOpen$LWS({
    globalObject: {
      open: originalWindowOpen$LWS
    }
  }) {
    const distortionEntry$LWS = [originalWindowOpen$LWS, function open$LWS(...args$LWS) {
      const normalizedArgs$LWS = normalizeWindowOpenArguments$LWS(args$LWS);
      const childWindow$LWS = ReflectApply$LWS$1(originalWindowOpen$LWS, this, normalizedArgs$LWS);
      markForUnsafePropertyBlocking$LWS(childWindow$LWS);
      if (normalizedArgs$LWS.length > 1) {
        const {
          1: target$LWS
        } = normalizedArgs$LWS;
        const willOpenInSameBrowsingContext$LWS = target$LWS === "_self" || target$LWS === "_parent" || target$LWS === "_top";
        if (willOpenInSameBrowsingContext$LWS) {
          return childWindow$LWS;
        }
      }
      if (childWindow$LWS && normalizedArgs$LWS.length) {
        initWindowOpenChildWindow$LWS(childWindow$LWS, normalizedArgs$LWS[0]);
      }
      return childWindow$LWS;
    }];
    return function distortionWindowOpen$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionWindowPostMessage$LWS({
    globalObject: {
      postMessage: originalPostMessage$LWS
    }
  }) {
    const distortionEntry$LWS = [originalPostMessage$LWS, function postMessage$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalPostMessage$LWS, this, args$LWS);
      } catch (error) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2) {
          const message$LWS = args$LWS[0];
          if (isObject$LWS$1(message$LWS)) {
            const providedOptions$LWS = length$LWS2 > 1 ? args$LWS[1] : void 0;
            if (isObjectLike$LWS(providedOptions$LWS)) {
              args$LWS = partialStructuredClone$LWS(args$LWS);
            } else {
              args$LWS[0] = partialStructuredClone$LWS(message$LWS);
            }
            return ReflectApply$LWS$1(originalPostMessage$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionWindowPostMessage$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionWindowSetInterval$LWS({
    UNCOMPILED_CONTEXT: UNCOMPILED_CONTEXT$LWS,
    globalObject: {
      setInterval: originalSetInterval$LWS
    }
  }) {
    return function distortionWndowSetInterval$LWS({
      sandboxEvaluator: sandboxEvaluator$LWS,
      virtualEnvironmentEvaluator: virtualEnvironmentEvaluator$LWS
    }) {
      return [originalSetInterval$LWS, function setInterval$LWS(...args$LWS) {
        throwIfMarkedAsUnsafeInChildWindow$LWS(virtualEnvironmentEvaluator$LWS, "setInterval");
        if (args$LWS.length) {
          const {
            0: callback$LWS
          } = args$LWS;
          if (callback$LWS !== null && callback$LWS !== void 0 && typeof callback$LWS !== "function") {
            const sourceText$LWS = toString$LWS(callback$LWS);
            let transformedSourceText$LWS;
            args$LWS[0] = () => {
              if (transformedSourceText$LWS === void 0) {
                transformedSourceText$LWS = transformSourceText$LWS(sourceText$LWS);
              }
              sandboxEvaluator$LWS(transformedSourceText$LWS, UNCOMPILED_CONTEXT$LWS);
            };
          }
        }
        return ReflectApply$LWS$1(originalSetInterval$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionWindowSetTimeout$LWS({
    UNCOMPILED_CONTEXT: UNCOMPILED_CONTEXT$LWS,
    globalObject: {
      setTimeout: originalSetTimeout$LWS
    }
  }) {
    return function distortionWindowSetTimeout$LWS({
      sandboxEvaluator: sandboxEvaluator$LWS,
      virtualEnvironmentEvaluator: virtualEnvironmentEvaluator$LWS
    }) {
      return [originalSetTimeout$LWS, function setTimeout$LWS(...args$LWS) {
        throwIfMarkedAsUnsafeInChildWindow$LWS(virtualEnvironmentEvaluator$LWS, "setTimeout");
        if (args$LWS.length) {
          const {
            0: callback$LWS
          } = args$LWS;
          if (callback$LWS !== null && callback$LWS !== void 0 && typeof callback$LWS !== "function") {
            const sourceText$LWS = toString$LWS(callback$LWS);
            args$LWS[0] = () => {
              sandboxEvaluator$LWS(transformSourceText$LWS(sourceText$LWS), UNCOMPILED_CONTEXT$LWS);
            };
          }
        }
        return ReflectApply$LWS$1(originalSetTimeout$LWS, this, args$LWS);
      }];
    };
  }
  function initDistortionWindowStructuredClone$LWS({
    globalObject: {
      DOMException: DOMException$LWS,
      structuredClone: originalStructuredClone$LWS
    }
  }) {
    if (typeof originalStructuredClone$LWS !== "function") {
      return noop$LWS$1;
    }
    const distortionEntry$LWS = [originalStructuredClone$LWS, function structuredClone$LWS(...args$LWS) {
      try {
        return ReflectApply$LWS$1(originalStructuredClone$LWS, this, args$LWS);
      } catch (error) {
        const {
          length: length$LWS2
        } = args$LWS;
        if (length$LWS2 && error instanceof DOMException$LWS) {
          const message$LWS = args$LWS[0];
          if (isObject$LWS$1(message$LWS)) {
            const providedOptions$LWS = length$LWS2 > 1 ? args$LWS[1] : void 0;
            if (isObjectLike$LWS(providedOptions$LWS)) {
              const {
                transfer: transfer$LWS
              } = providedOptions$LWS;
              args$LWS[1] = {
                __proto__: providedOptions$LWS,
                transfer: transfer$LWS
              };
              args$LWS = partialStructuredClone$LWS(args$LWS);
            } else {
              args$LWS[0] = partialStructuredClone$LWS(message$LWS);
            }
            return ReflectApply$LWS$1(originalStructuredClone$LWS, this, args$LWS);
          }
        }
        throw error;
      }
    }];
    return function distortionWindowStructuredClone$LWS() {
      return distortionEntry$LWS;
    };
  }
  function Worker$LWS(scriptURL$LWS) {
    throw new LockerSecurityError$LWS(`Cannot create Worker with ${toSafeTemplateStringValue$LWS(scriptURL$LWS)}.`);
  }
  function initDistortionWorkerCtor$LWS({
    globalObject: {
      Worker: originalWorkerCtor$LWS
    }
  }) {
    const distortionEntry$LWS = [originalWorkerCtor$LWS, Worker$LWS];
    return function distortionWorkerCtor$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionWorkerProto$LWS({
    globalObject: {
      Worker: {
        prototype: originalPrototype$LWS
      }
    }
  }) {
    const distortionEntry$LWS = [originalPrototype$LWS, createRevokedProxy$LWS(originalPrototype$LWS)];
    return function distortionWorkerProto$LWS() {
      return distortionEntry$LWS;
    };
  }
  function initDistortionXMLHttpRequestOpen$LWS({
    globalObject: {
      XMLHttpRequest: {
        prototype: {
          open: originalOpen$LWS
        }
      }
    }
  }) {
    const distortionEntry$LWS = [originalOpen$LWS, function open$LWS(...args$LWS) {
      const url$LWS = args$LWS.length > 1 ? args$LWS[1] : void 0;
      if (url$LWS !== null && url$LWS !== void 0) {
        const parsedURL$LWS = parseURL$LWS(toString$LWS(url$LWS));
        if (!isValidURL$LWS(parsedURL$LWS)) {
          throw new LockerSecurityError$LWS(`Cannot request disallowed endpoint: ${parsedURL$LWS.normalizedURL}`);
        }
        args$LWS[1] = parsedURL$LWS.normalizedURL;
      }
      ReflectApply$LWS$1(originalOpen$LWS, this, args$LWS);
    }];
    return function distortionXMLHttpRequestOpen$LWS() {
      return distortionEntry$LWS;
    };
  }
  function replaceDocumentContent$LWS(doc$LWS, content$LWS) {
    const docImpl$LWS = ReflectApply$LWS$1(DocumentProtoImplementationGetter$LWS, doc$LWS, []);
    const newDoc$LWS = ReflectApply$LWS$1(DOMImplementationProtoCreateDocument$LWS, docImpl$LWS, [NAMESPACE_XHTML$LWS, "html"]);
    const newDocEl$LWS = ReflectApply$LWS$1(DocumentProtoDocumentElementGetter$LWS, newDoc$LWS, []);
    ReflectApply$LWS$1(ElementProtoInnerHTMLSetter$LWS, newDocEl$LWS, [content$LWS]);
    return newDoc$LWS;
  }
  function initDistortionXMLHttpRequestResponseGetter$LWS({
    document: document$LWS,
    globalObject: {
      Document: Document$LWS,
      XMLHttpRequest: XMLHttpRequest$LWS
    }
  }) {
    const originalResponseGetter$LWS = ObjectLookupOwnGetter$LWS$1(XMLHttpRequest$LWS.prototype, "response");
    return function distortionXMLHttpRequestResponseGetter$LWS({
      key: key$LWS
    }) {
      return [originalResponseGetter$LWS, function response$LWS() {
        const rawResponse$LWS = ReflectApply$LWS$1(originalResponseGetter$LWS, this, []);
        setCustomElementsRegistry$LWS(document$LWS, key$LWS);
        if (rawResponse$LWS instanceof Document$LWS) {
          const docEl$LWS = ReflectApply$LWS$1(DocumentProtoDocumentElementGetter$LWS, rawResponse$LWS, []);
          const content$LWS = ReflectApply$LWS$1(ElementProtoOuterHTMLGetter$LWS, docEl$LWS, []);
          return replaceDocumentContent$LWS(rawResponse$LWS, lwsInternalPolicy$LWS.createHTML(content$LWS, key$LWS, ContentType$LWS.HTML));
        }
        return rawResponse$LWS;
      }];
    };
  }
  function initDistortionXMLHttpRequestResponseXMLGetter$LWS({
    document: document$LWS,
    globalObject: {
      XMLHttpRequest: XMLHttpRequest$LWS
    }
  }) {
    const originalResponseXMLGetter$LWS = ObjectLookupOwnGetter$LWS$1(XMLHttpRequest$LWS.prototype, "responseXML");
    return function distortionXMLHttpRequestResponseXMLGetter$LWS({
      key: key$LWS
    }) {
      return [originalResponseXMLGetter$LWS, function responseXML$LWS() {
        const rawResponseXML$LWS = ReflectApply$LWS$1(originalResponseXMLGetter$LWS, this, []);
        setCustomElementsRegistry$LWS(document$LWS, key$LWS);
        const docEl$LWS = ReflectApply$LWS$1(DocumentProtoDocumentElementGetter$LWS, rawResponseXML$LWS, []);
        const content$LWS = ReflectApply$LWS$1(ElementProtoOuterHTMLGetter$LWS, docEl$LWS, []);
        return replaceDocumentContent$LWS(rawResponseXML$LWS, lwsInternalPolicy$LWS.createHTML(content$LWS, key$LWS, ContentType$LWS.HTML));
      }];
    };
  }
  const internalDistortionFactoryInitializers$LWS = [
    initDistortionBroadcastChannelPostMessage$LWS,
    initDistortionCSSStyleRuleStyleGetter$LWS,
    initDistortionDocumentDomainSetter$LWS,
    initDistortionDocumentOnsecuritypolicyviolation$LWS,
    initDistortionDocumentOpen$LWS,
    initDistortionElementAttributesGetter$LWS,
    initDistortionElementGetInnerHTML$LWS,
    initDistortionElementRemove$LWS,
    initDistortionElementReplaceChildren$LWS,
    initDistortionElementReplaceWith$LWS,
    initDistortionFunction$LWS,
    initDistortionHistoryPushState$LWS,
    initDistortionHistoryReplaceState$LWS,
    initDistortionHTMLElementDatasetGetter$LWS,
    initDistortionHTMLElementInnerTextSetter$LWS,
    initDistortionHTMLElementOuterTextSetter$LWS,
    initDistortionHTMLElementStyleGetter$LWS,
    initDistortionIFrameElementContentDocumentGetter$LWS,
    initDistortionIFrameElementContentWindowGetter$LWS,
    initDistortionHTMLIFrameElementSrcSetter$LWS,
    initDistortionHTMLLinkElementRelSetter$LWS,
    initDistortionHTMLLinkElementRelListSetter$LWS,
    initDistortionHTMLObjectElementDataSetter$LWS,
    initDistortionHTMLScriptElementSrcGetter$LWS,
    initDistortionHTMLScriptElementTextSetter$LWS,
    initDistortionIDBObjectStoreAdd$LWS,
    initDistortionIDBObjectStorePut$LWS,
    initDistortionMessagePortPostMessage$LWS,
    initDistortionNavigatorSendBeacon$LWS,
    initDistortionNavigatorServiceWorkerGetter$LWS,
    initDistortionNodeRemoveChild$LWS,
    initDistortionNodeReplaceChild$LWS,
    initDistortionPerformanceMark$LWS,
    initDistortionPerformanceMeasure$LWS,
    initDistortionPerformanceMarkCtor$LWS,
    initDistortionNotificationCtor$LWS,
    initDistortionRangeDeleteContents$LWS,
    initDistortionRangeExtractContents$LWS,
    initDistortionRangeInsertNode$LWS,
    initDistortionRangeSelectNode$LWS,
    initDistortionRangeSelectNodeContents$LWS,
    initDistortionRangeSetEnd$LWS,
    initDistortionRangeSetEndAfter$LWS,
    initDistortionRangeSetEndBefore$LWS,
    initDistortionRangeSetStart$LWS,
    initDistortionRangeSetStartAfter$LWS,
    initDistortionRangeSetStartBefore$LWS,
    initDistortionRangeSurroundContents$LWS,
    initDistortionSelectionCollapse$LWS,
    initDistortionSelectionExtend$LWS,
    initDistortionSelectionSelectAllChildren$LWS,
    initDistortionSelectionSetBaseAndExtent$LWS,
    initDistortionSelectionSetPosition$LWS,
    initDistortionServiceWorkerContainerProto$LWS,
    initDistortionSharedWorkerCtor$LWS,
    initDistortionSharedWorkerProto$LWS,
    initDistortionStorage$LWS,
    initDistortionStorageClear$LWS,
    initDistortionStorageGetItem$LWS,
    initDistortionStorageKey$LWS,
    initDistortionStorageLength$LWS,
    initDistortionStorageRemoveItem$LWS,
    initDistortionStorageSetItem$LWS,
    initDistortionSVGAnimateElementFromAttribute$LWS,
    initDistortionSVGAnimateElementToAttribute$LWS,
    initDistortionSVGAnimateElementValuesAttribute$LWS,
    initDistortionSVGElementDatasetGetter$LWS,
    initDistortionSVGElementStyleGetter$LWS,
    initDistortionSVGSetElementToAttribute$LWS,
    initDistortionSVGUseElementHrefAttribute$LWS,
    initDistortionSVGUseElementXlinkHrefAttribute$LWS,
    initDistortionTrustedTypePolicyFactoryCreatePolicy$LWS,
    initDistortionWindowFetch$LWS,
    initDistortionWindowFramesGetter$LWS,
    initDistortionWindowGetComputedStyle$LWS,
    initDistortionWindowLengthGetter$LWS,
    initDistortionWindowOpen$LWS,
    initDistortionWindowPostMessage$LWS,
    initDistortionWindowStructuredClone$LWS,
    initDistortionWorkerCtor$LWS,
    initDistortionWorkerProto$LWS,
    initDistortionXMLHttpRequestOpen$LWS
  ];
  const internalKeyedDistortionFactoryInitializers$LWS = [
    initDistortionAttrValueSetter$LWS,
    initDistortionAuraUtilGlobalEval$LWS,
    initDistortionCacheStorageDelete$LWS,
    initDistortionCacheStorageHas$LWS,
    initDistortionCacheStorageKeys$LWS,
    initDistortionCacheStorageMatch$LWS,
    initDistortionCacheStorageOpen$LWS,
    initDistortionCookieStoreDelete$LWS,
    initDistortionCookieStoreGet$LWS,
    initDistortionCookieStoreGetAll$LWS,
    initDistortionCookieStoreOnChange$LWS,
    initDistortionCookieStoreSet$LWS,
    initDistortionCustomElementRegistryDefine$LWS,
    initDistortionCustomElementRegistryGet$LWS,
    initDistortionCustomElementRegistryUpgrade$LWS,
    initDistortionCustomElementRegistryWhenDefined$LWS,
    initDistortionDocumentCookieGetter$LWS,
    initDistortionDocumentCookieSetter$LWS,
    initDistortionDocumentCreateElement$LWS,
    initDistortionDocumentCreateElementNS$LWS,
    initDistortionDocumentExecCommand$LWS,
    initDistortionDocumentReplaceChildren$LWS,
    initDistortionDOMParserParseFromString$LWS,
    initDistortionElementAttachShadow$LWS,
    initDistortionElementInnerHTMLSetter$LWS,
    initDistortionElementInsertAdjacentHTML$LWS,
    initDistortionElementOuterHTMLSetter$LWS,
    initDistortionElementSetAttribute$LWS,
    initDistortionElementSetAttributeNode$LWS,
    initDistortionElementSetAttributeNodeNS$LWS,
    initDistortionElementSetAttributeNS$LWS,
    initDistortionElementSetHTML$LWS,
    initDistortionElementShadowRootGetter$LWS,
    initDistortionElementToggleAttribute$LWS,
    initDistortionEval$LWS,
    initDistortionEventComposedPath$LWS,
    initDistortionEventPathGetter$LWS,
    initDistortionEventTargetAddEventListener$LWS,
    initDistortionHTMLBodyElementOnrejectionhandled$LWS,
    initDistortionHTMLBodyElementOnstorage$LWS,
    initDistortionHTMLBodyElementOnunhandledrejection$LWS,
    initDistortionHTMLElementCtor$LWS,
    initDistortionHTMLFrameSetElementOnrejectionhandled$LWS,
    initDistortionHTMLFrameSetElementOnstorage$LWS,
    initDistortionHTMLFrameSetElementOnunhandledrejection$LWS,
    initDistortionHTMLScriptElementSrcSetter$LWS,
    initDistortionHTMLScriptElementTextSetter$LWS,
    initDistortionNamedNodeMapSetNamedItem$LWS,
    initDistortionNamedNodeMapSetNamedItemNS$LWS,
    initDistortionNodeValueSetter$LWS,
    initDistortionNodeTextContentGetter$LWS,
    initDistortionNodeTextContentSetter$LWS,
    initDistortionRangeCreateContextualFragment$LWS,
    initDistortionShadowRootInnerHTMLSetter$LWS,
    initDistortionLocalStorage$LWS,
    initDistortionSessionStorage$LWS,
    initDistortionSVGAnimateElementAttributeNameAttribute$LWS,
    initDistortionSVGScriptElementHrefGetter$LWS,
    initDistortionSVGScriptElementHrefSetter$LWS,
    initDistortionSVGSetElementAttributeNameAttribute$LWS,
    initDistortionURLCreateObjectURL$LWS,
    initDistortionWindowOnrejectionhandled$LWS,
    initDistortionWindowOnsecuritypolicyviolation$LWS,
    initDistortionWindowOnstorage$LWS,
    initDistortionWindowOnunhandledrejection$LWS,
    initDistortionWindowSetInterval$LWS,
    initDistortionWindowSetTimeout$LWS,
    initDistortionXMLHttpRequestResponseGetter$LWS,
    initDistortionXMLHttpRequestResponseXMLGetter$LWS
  ];
  const externalDistortionFactoryInitializers$LWS = ArrayConcat$LWS(internalDistortionFactoryInitializers$LWS, [
    initDistortionElementAfter$LWS,
    initDistortionElementAppend$LWS,
    initDistortionElementBefore$LWS,
    initDistortionElementInsertAdjacentElement$LWS,
    initDistortionElementPrepend$LWS,
    initDistortionNodeInsertBefore$LWS
  ]);
  const externalKeyedDistortionFactoryInitializers$LWS = internalKeyedDistortionFactoryInitializers$LWS;
  const distortionFactoryInitializerToggleSwitches$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1([[initDistortionCacheStorageDelete$LWS, "caches"], [initDistortionCacheStorageHas$LWS, "caches"], [initDistortionCacheStorageKeys$LWS, "caches"], [initDistortionCacheStorageMatch$LWS, "caches"], [initDistortionCacheStorageOpen$LWS, "caches"], [initDistortionCookieStoreDelete$LWS, "cookieStore"], [initDistortionCookieStoreGet$LWS, "cookieStore"], [initDistortionCookieStoreGetAll$LWS, "cookieStore"], [initDistortionCookieStoreOnChange$LWS, "cookieStore"], [initDistortionCookieStoreSet$LWS, "cookieStore"], [initDistortionCSSStyleRuleStyleGetter$LWS, "style"], [initDistortionCustomElementRegistryDefine$LWS, "customElements"], [initDistortionCustomElementRegistryGet$LWS, "customElements"], [initDistortionCustomElementRegistryUpgrade$LWS, "customElements"], [initDistortionCustomElementRegistryWhenDefined$LWS, "customElements"], [initDistortionDocumentCookieGetter$LWS, "documentCookie"], [initDistortionDocumentCookieSetter$LWS, "documentCookie"], [initDistortionDocumentDomainSetter$LWS, "documentDomain"], [initDistortionDocumentExecCommand$LWS, "documentExecCommand"], [initDistortionDOMParserParseFromString$LWS, "domParserParseFromString"], [initDistortionElementAfter$LWS, "element"], [initDistortionElementAppend$LWS, "element"], [initDistortionElementAttributesGetter$LWS, "attributes"], [initDistortionElementBefore$LWS, "element"], [initDistortionElementGetInnerHTML$LWS, "innerHTML"], [initDistortionElementInnerHTMLSetter$LWS, "innerHTML"], [initDistortionElementInsertAdjacentElement$LWS, "element"], [initDistortionElementInsertAdjacentHTML$LWS, "element"], [initDistortionElementOuterHTMLSetter$LWS, "element"], [initDistortionElementPrepend$LWS, "element"], [initDistortionElementRemove$LWS, "element"], [initDistortionElementReplaceChildren$LWS, "element"], [initDistortionElementReplaceWith$LWS, "element"], [initDistortionElementSetAttribute$LWS, "attributes"], [initDistortionElementSetAttributeNode$LWS, "attributes"], [initDistortionElementSetAttributeNodeNS$LWS, "attributes"], [initDistortionElementSetAttributeNS$LWS, "attributes"], [initDistortionElementSetHTML$LWS, "element"], [initDistortionElementToggleAttribute$LWS, "attributes"], [initDistortionHistoryPushState$LWS, "history"], [initDistortionHistoryReplaceState$LWS, "history"], [initDistortionHTMLElementDatasetGetter$LWS, "dataset"], [initDistortionHTMLElementStyleGetter$LWS, "style"], [initDistortionHTMLScriptElementSrcGetter$LWS, "script"], [initDistortionHTMLScriptElementSrcSetter$LWS, "script"], [initDistortionHTMLScriptElementTextSetter$LWS, "script"], [initDistortionIDBObjectStoreAdd$LWS, "indexedDB"], [initDistortionIDBObjectStorePut$LWS, "indexedDB"], [initDistortionLocalStorage$LWS, "storage"], [initDistortionMessagePortPostMessage$LWS, "postMessage"], [initDistortionNamedNodeMapSetNamedItem$LWS, "attributes"], [initDistortionNamedNodeMapSetNamedItemNS$LWS, "attributes"], [initDistortionNavigatorSendBeacon$LWS, "navigatorSendBeacon"], [initDistortionNodeInsertBefore$LWS, "node"], [initDistortionNodeRemoveChild$LWS, "node"], [initDistortionNodeReplaceChild$LWS, "node"], [initDistortionNodeTextContentGetter$LWS, "node"], [initDistortionNodeTextContentSetter$LWS, "node"], [initDistortionNodeValueSetter$LWS, "node"], [initDistortionNotificationCtor$LWS, "notification"], [initDistortionPerformanceMark$LWS, "performance"], [initDistortionPerformanceMarkCtor$LWS, "performance"], [initDistortionPerformanceMeasure$LWS, "performance"], [initDistortionRangeCreateContextualFragment$LWS, "range"], [initDistortionRangeDeleteContents$LWS, "range"], [initDistortionRangeExtractContents$LWS, "range"], [initDistortionRangeInsertNode$LWS, "range"], [initDistortionRangeSelectNode$LWS, "range"], [initDistortionRangeSelectNodeContents$LWS, "range"], [initDistortionRangeSetEnd$LWS, "range"], [initDistortionRangeSetEndAfter$LWS, "range"], [initDistortionRangeSetEndBefore$LWS, "range"], [initDistortionRangeSetStart$LWS, "range"], [initDistortionRangeSetStartAfter$LWS, "range"], [initDistortionRangeSetStartBefore$LWS, "range"], [initDistortionRangeSurroundContents$LWS, "range"], [initDistortionSelectionCollapse$LWS, "selection"], [initDistortionSelectionExtend$LWS, "selection"], [initDistortionSelectionSelectAllChildren$LWS, "selection"], [initDistortionSelectionSetBaseAndExtent$LWS, "selection"], [initDistortionSelectionSetPosition$LWS, "selection"], [initDistortionSessionStorage$LWS, "storage"], [initDistortionShadowRootInnerHTMLSetter$LWS, "innerHTML"], [initDistortionStorage$LWS, "storage"], [initDistortionStorageClear$LWS, "storage"], [initDistortionStorageGetItem$LWS, "storage"], [initDistortionStorageKey$LWS, "storage"], [initDistortionStorageLength$LWS, "storage"], [initDistortionStorageRemoveItem$LWS, "storage"], [initDistortionStorageSetItem$LWS, "storage"], [initDistortionSVGElementDatasetGetter$LWS, "dataset"], [initDistortionSVGElementStyleGetter$LWS, "style"], [initDistortionSVGScriptElementHrefGetter$LWS, "script"], [initDistortionSVGScriptElementHrefSetter$LWS, "script"], [initDistortionWindowFetch$LWS, "windowFetch"], [initDistortionWindowFramesGetter$LWS, "windowFrames"], [initDistortionWindowGetComputedStyle$LWS, "style"], [initDistortionWindowLengthGetter$LWS, "windowFrames"], [initDistortionWindowPostMessage$LWS, "postMessage"], [initDistortionWindowSetInterval$LWS, "setInterval"], [initDistortionWindowSetTimeout$LWS, "setTimeout"], [initDistortionXMLHttpRequestResponseGetter$LWS, "xhr"], [initDistortionXMLHttpRequestResponseXMLGetter$LWS, "xhr"]]));
  const DocumentBlockedProperties$LWS = ["createProcessingInstruction", "exitFullscreen", "fullscreen", "fullscreenElement", "fullscreenEnabled", "mozCancelFullScreen", "mozFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "onfullscreenchange", "onfullscreenerror", "onmozfullscreenchange", "onmozfullscreenerror", "onrejectionhandled", "onunhandledrejection", "parseHTMLUnsafe", "releaseCapture", "releaseEvents", "webkitFullScreenKeyboardInputAllowed", "write", "writeln"];
  const ElementBlockedProperties$LWS = ["mozRequestFullScreen", "onfullscreenchange", "onfullscreenerror", "requestFullscreen", "setHTMLUnsafe", "webkitRequestFullScreen", "webkitRequestFullscreen"];
  const EventBlockedProperties$LWS = ["originalTarget", "explicitOriginalTarget"];
  const HTMLElementBlockedAttributes$LWS = ["nonce"];
  const HTMLElementBlockedProperties$LWS = ["nonce", "onrejectionhandled", "onunhandledrejection"];
  const HTMLEmbedElementBlockedProperties$LWS = ["getSVGDocument"];
  const HTMLIFrameElementBlockedAttributes$LWS = ["srcdoc"];
  const HTMLIFrameElementBlockedProperties$LWS = ["getSVGDocument", "srcdoc"];
  const HTMLObjectElementBlockedProperties$LWS = ["getSVGDocument"];
  const HTMLScriptElementBlockedAttributes$LWS = ["nonce"];
  const HTMLScriptElementBlockedProperties$LWS = ["nonce"];
  const SVGElementBlockedAttributes$LWS = ["nonce"];
  const SVGElementBlockedProperties$LWS = ["nonce"];
  const UIEventBlockedProperties$LWS = ["rangeParent"];
  const WindowBlockedProperties$LWS = ["find", "requestFileSystem", "webkitRequestFileSystem"];
  const XSLTProcessorBlockedProperties$LWS = ["transformToDocument", "transformToFragment"];
  /*! version: 0.22.5 */
  /*!
   * Copyright (C) 2019 salesforce.com, inc.
   */
  const rootSandboxRegistry$LWS = {
    __proto__: null
  };
  const documentSandboxRegistryCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1([[rootDocument$LWS, rootSandboxRegistry$LWS]]));
  const opaqueWindowSandboxRegistryCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  function getOpaqueSandboxRegistry$LWS(globalObject$LWS) {
    let sandboxRegistry$LWS = opaqueWindowSandboxRegistryCache$LWS.get(globalObject$LWS);
    if (sandboxRegistry$LWS === void 0) {
      sandboxRegistry$LWS = {
        __proto__: null
      };
      opaqueWindowSandboxRegistryCache$LWS.set(globalObject$LWS, sandboxRegistry$LWS);
    }
    return sandboxRegistry$LWS;
  }
  function getSandboxRegistry$LWS(document$LWS) {
    let sandboxRegistry$LWS = documentSandboxRegistryCache$LWS.get(document$LWS);
    if (sandboxRegistry$LWS === void 0) {
      sandboxRegistry$LWS = {
        __proto__: null
      };
      documentSandboxRegistryCache$LWS.set(document$LWS, sandboxRegistry$LWS);
    }
    return sandboxRegistry$LWS;
  }
  const LightningWebSecurity$LWS = {
    __proto__: null
  };
  const ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS = LOCKER_UNMINIFIED_FLAG$LWS$1 || false || false;
  const distortionFactoryToToggleSwitch$LWS = ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS ? toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1()) : null;
  const sandboxToDistortionEntryToToggleSwitchRegistry$LWS = ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS ? toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1()) : null;
  const sandboxToDisabledDistortionToggleSwitches$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
  function setSandboxDistortionToggleState$LWS(record$LWS, toggleSwitchName$LWS, state$LWS) {
    const disabledDistortionToggleSwitches$LWS = sandboxToDisabledDistortionToggleSwitches$LWS.get(record$LWS);
    if (state$LWS) {
      disabledDistortionToggleSwitches$LWS == null || disabledDistortionToggleSwitches$LWS.delete(toggleSwitchName$LWS);
    } else {
      disabledDistortionToggleSwitches$LWS == null || disabledDistortionToggleSwitches$LWS.add(toggleSwitchName$LWS);
    }
  }
  function getSandboxDistortionToggleState$LWS(record$LWS, toggleSwitchName$LWS) {
    const disabledDistortionToggleSwitches$LWS = sandboxToDisabledDistortionToggleSwitches$LWS.get(record$LWS);
    return !disabledDistortionToggleSwitches$LWS.has(toggleSwitchName$LWS);
  }
  let namespaces$LWS = null;
  if (ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS) {
    ReflectDefineProperty$LWS$1(LightningWebSecurity$LWS, "namespaces", {
      __proto__: null,
      enumerable: true,
      configurable: false,
      get() {
        if (!namespaces$LWS) {
          namespaces$LWS = {
            __proto__: null
          };
          const registry$LWS = getSandboxRegistry$LWS(document);
          const sandboxKeys$LWS = ReflectApply$LWS$1(ObjectKeys$LWS$1, null, [registry$LWS]);
          for (const sandboxKey$LWS of sandboxKeys$LWS) {
            const record$LWS = registry$LWS[sandboxKey$LWS];
            const distortionToggleSwitchRegistry$LWS = sandboxToDistortionEntryToToggleSwitchRegistry$LWS == null ? void 0 : sandboxToDistortionEntryToToggleSwitchRegistry$LWS.get(record$LWS);
            const seenFlags$LWS = toSafeSet$LWS(new SetCtor$LWS$1());
            const distortions$LWS = {
              __proto__: null
            };
            namespaces$LWS[sandboxKey$LWS] = {
              __proto__: null,
              distortions: distortions$LWS
            };
            for (const {
              1: flag$LWS
            } of distortionToggleSwitchRegistry$LWS) {
              if (!seenFlags$LWS.has(flag$LWS)) {
                seenFlags$LWS.add(flag$LWS);
                ReflectDefineProperty$LWS$1(namespaces$LWS[sandboxKey$LWS].distortions, flag$LWS, {
                  __proto__: null,
                  enumerable: true,
                  configurable: false,
                  get() {
                    return getSandboxDistortionToggleState$LWS(record$LWS, flag$LWS);
                  },
                  set(flagValue$LWS) {
                    return setSandboxDistortionToggleState$LWS(record$LWS, flag$LWS, flagValue$LWS);
                  }
                });
              }
            }
            ObjectPreventExtensions$LWS(distortions$LWS);
          }
          ObjectPreventExtensions$LWS(namespaces$LWS);
        }
        return namespaces$LWS;
      }
    });
    ReflectDefineProperty$LWS$1(window, "$LWS", {
      __proto__: null,
      enumerable: false,
      configurable: false,
      writable: false,
      value: LightningWebSecurity$LWS
    });
  }
  ObjectFreeze$LWS$1(LightningWebSecurity$LWS);
  function createDistortionToggleSwitchWrapper$LWS(sandboxKey$LWS, toggleSwitchName$LWS, proxyMaskedFunctionDistortion$LWS, originalValue$LWS) {
    return function(...args$LWS) {
      var _root$LWS$namespaces$LWS;
      const {
        $LWS: root$LWS
      } = rootWindow$LWS$1;
      let useDistortedValue$LWS = root$LWS == null || (_root$LWS$namespaces$LWS = root$LWS.namespaces) == null || (_root$LWS$namespaces$LWS = _root$LWS$namespaces$LWS[sandboxKey$LWS]) == null ? void 0 : _root$LWS$namespaces$LWS.distortions[toggleSwitchName$LWS];
      if (useDistortedValue$LWS === void 0) {
        useDistortedValue$LWS = true;
      }
      const constructOrApplyTarget$LWS = useDistortedValue$LWS ? proxyMaskedFunctionDistortion$LWS : originalValue$LWS;
      if (new.target) {
        return ReflectConstruct$LWS(constructOrApplyTarget$LWS, args$LWS, new.target);
      }
      return ReflectApply$LWS$1(constructOrApplyTarget$LWS, this, args$LWS);
    };
  }
  const distortionFactoriesCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  const opaqueWindowPostMessageDistortionFactoryCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
  const SUPPORTS_DISTORTIONS_WEAK_MAP$LWS = !IS_WEBKIT_BROWSER$LWS;
  function createDistortionEntries$LWS(record$LWS, factories$LWS) {
    const distortionEntryToToggleSwitch$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
    const entries$LWS = [];
    for (let i$LWS = 0, {
      length: length$LWS2
    } = factories$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const factory$LWS = factories$LWS[i$LWS];
      const entry$LWS = factory$LWS(record$LWS);
      if (entry$LWS) {
        const {
          0: originalValue$LWS,
          1: distortedValue$LWS
        } = entry$LWS;
        if (typeof originalValue$LWS === "function") {
          const proxyMaskedFunctionDistortion$LWS = proxyMaskFunctionDistortion$LWS(record$LWS, factory$LWS, distortedValue$LWS, originalValue$LWS);
          const toggleSwitchName$LWS = ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS && (distortionFactoryToToggleSwitch$LWS == null ? void 0 : distortionFactoryToToggleSwitch$LWS.get(factory$LWS));
          let distortionToggleSwitchWrapperOrProxyMaskedFunction$LWS = proxyMaskedFunctionDistortion$LWS;
          if (ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS && toggleSwitchName$LWS) {
            distortionToggleSwitchWrapperOrProxyMaskedFunction$LWS = createDistortionToggleSwitchWrapper$LWS(record$LWS.key, toggleSwitchName$LWS, proxyMaskedFunctionDistortion$LWS, originalValue$LWS);
            if (originalValue$LWS[CHILD_WINDOW_BLOCKED_PROPERTY_SYMBOL$LWS]) {
              const descriptor$LWS = ReflectGetOwnPropertyDescriptor$LWS(originalValue$LWS, CHILD_WINDOW_BLOCKED_PROPERTY_SYMBOL$LWS);
              ReflectDefineProperty$LWS$1(distortionToggleSwitchWrapperOrProxyMaskedFunction$LWS, CHILD_WINDOW_BLOCKED_PROPERTY_SYMBOL$LWS, descriptor$LWS);
            }
          }
          entries$LWS[entries$LWS.length] = [originalValue$LWS, toggleSwitchName$LWS ? distortionToggleSwitchWrapperOrProxyMaskedFunction$LWS : proxyMaskedFunctionDistortion$LWS];
        } else {
          if (typeof originalValue$LWS === "object" && originalValue$LWS !== null) {
            entries$LWS[entries$LWS.length] = entry$LWS;
          }
        }
        if (ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS) {
          const toggleSwitchName$LWS = distortionFactoryToToggleSwitch$LWS == null ? void 0 : distortionFactoryToToggleSwitch$LWS.get(factory$LWS);
          if (toggleSwitchName$LWS) {
            distortionEntryToToggleSwitch$LWS.set(entries$LWS[entries$LWS.length - 1], toggleSwitchName$LWS);
          }
        }
      }
    }
    if (ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS) {
      sandboxToDistortionEntryToToggleSwitchRegistry$LWS == null || sandboxToDistortionEntryToToggleSwitchRegistry$LWS.set(record$LWS, distortionEntryToToggleSwitch$LWS);
      sandboxToDisabledDistortionToggleSwitches$LWS.set(record$LWS, toSafeSet$LWS(new SetCtor$LWS$1()));
    }
    return entries$LWS;
  }
  function createDistortionMap$LWS(entries$LWS) {
    return SUPPORTS_DISTORTIONS_WEAK_MAP$LWS ? toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1(entries$LWS)) : toSafeMap$LWS$1(new MapCtor$LWS$1(entries$LWS));
  }
  function getDistortionFactories$LWS(record$LWS) {
    const {
      document: document$LWS,
      globalObject: globalObject$LWS,
      type: type$LWS
    } = record$LWS;
    let factories$LWS = distortionFactoriesCache$LWS.get(document$LWS);
    if (factories$LWS) {
      return factories$LWS;
    }
    const {
      Document: Document$LWS,
      Element: Element$LWS,
      Event: Event$LWS,
      HTMLElement: HTMLElement$LWS2,
      HTMLIFrameElement: HTMLIFrameElement$LWS,
      HTMLScriptElement: HTMLScriptElement$LWS,
      SVGElement: SVGElement$LWS,
      UIEvent: UIEvent$LWS,
      XSLTProcessor: XSLTProcessor$LWS
    } = globalObject$LWS;
    const initializers$LWS = type$LWS === 1 ? ArrayConcat$LWS(internalDistortionFactoryInitializers$LWS, internalKeyedDistortionFactoryInitializers$LWS) : ArrayConcat$LWS(externalDistortionFactoryInitializers$LWS, externalKeyedDistortionFactoryInitializers$LWS);
    addBlockedAttributeDistortionFactoryInitializers$LWS(HTMLElement$LWS2, "HTMLElement", HTMLElementBlockedAttributes$LWS, initializers$LWS);
    addBlockedAttributeDistortionFactoryInitializers$LWS(HTMLIFrameElement$LWS, "HTMLIFrameElement", HTMLIFrameElementBlockedAttributes$LWS, initializers$LWS);
    addBlockedAttributeDistortionFactoryInitializers$LWS(HTMLScriptElement$LWS, "HTMLScriptElement", HTMLScriptElementBlockedAttributes$LWS, initializers$LWS);
    addBlockedAttributeDistortionFactoryInitializers$LWS(SVGElement$LWS, "SVGElement", SVGElementBlockedAttributes$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, DataTransfer.prototype, DataTransferBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, Document$LWS.prototype, DocumentBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, Element$LWS.prototype, ElementBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, Event$LWS.prototype, EventBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, HTMLElement$LWS2.prototype, HTMLElementBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, HTMLIFrameElement$LWS.prototype, HTMLIFrameElementBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, HTMLEmbedElement.prototype, HTMLEmbedElementBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, HTMLObjectElement.prototype, HTMLObjectElementBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, HTMLScriptElement$LWS.prototype, HTMLScriptElementBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, SVGElement$LWS.prototype, SVGElementBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, UIEvent$LWS.prototype, UIEventBlockedProperties$LWS, initializers$LWS);
    addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, globalObject$LWS, WindowBlockedProperties$LWS, initializers$LWS);
    if (typeof XSLTProcessor$LWS === "function") {
      addBlockedPropertyDistortionFactoryInitializers$LWS(record$LWS, XSLTProcessor$LWS.prototype, XSLTProcessorBlockedProperties$LWS, initializers$LWS);
    }
    patchGlobalObject$LWS(globalObject$LWS, document$LWS);
    factories$LWS = initializers$LWS;
    for (let i$LWS = 0, {
      length: length$LWS2
    } = factories$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      let toggleSwitchName$LWS;
      if (ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS) {
        toggleSwitchName$LWS = distortionFactoryInitializerToggleSwitches$LWS.get(initializers$LWS[i$LWS]);
      }
      factories$LWS[i$LWS] = initializers$LWS[i$LWS](record$LWS);
      if (ENABLE_DISTORTION_TOGGLE_SWITCHES$LWS && toggleSwitchName$LWS) {
        distortionFactoryToToggleSwitch$LWS == null || distortionFactoryToToggleSwitch$LWS.set(factories$LWS[i$LWS], toggleSwitchName$LWS);
      }
    }
    factories$LWS[factories$LWS.length] = finalizeAttributeDistortions$LWS;
    distortionFactoriesCache$LWS.set(document$LWS, factories$LWS);
    return factories$LWS;
  }
  function getOpaqueWindowPostMessageDistortionFactory$LWS(record$LWS) {
    const {
      globalObject: globalObject$LWS
    } = record$LWS;
    let opaqueWindowPostMessageDistortionFactory$LWS = opaqueWindowPostMessageDistortionFactoryCache$LWS.get(globalObject$LWS);
    if (opaqueWindowPostMessageDistortionFactory$LWS) {
      return opaqueWindowPostMessageDistortionFactory$LWS;
    }
    opaqueWindowPostMessageDistortionFactory$LWS = initDistortionWindowPostMessage$LWS(record$LWS);
    opaqueWindowPostMessageDistortionFactoryCache$LWS.set(globalObject$LWS, opaqueWindowPostMessageDistortionFactory$LWS);
    return opaqueWindowPostMessageDistortionFactory$LWS;
  }
  function proxyMaskFunctionDistortion$LWS({
    LOCKER_VERBOSE_INSTRUMENTATION_FLAG: LOCKER_VERBOSE_INSTRUMENTATION_FLAG$LWS,
    instrumentation: instrumentation$LWS,
    key: sandboxKey$LWS
  }, distortionFactory$LWS, distortionFunc$LWS, maskFunc$LWS) {
    return maskFunction$LWS(distortionFunc$LWS, maskFunc$LWS, {
      apply: function(target$LWS, thisArg$LWS, args$LWS) {
        try {
          return ReflectApply$LWS$1(target$LWS, thisArg$LWS, args$LWS);
        } catch (error) {
          throw error;
        } finally {
        }
      },
      construct: function(target$LWS, args$LWS, newTarget$LWS) {
        try {
          return ReflectConstruct$LWS(target$LWS, args$LWS, newTarget$LWS);
        } catch (error) {
          throw error;
        } finally {
        }
      }
    });
  }
  let lockerEvalContextValue$LWS;
  let lockerEvalHelpersValue$LWS;
  function clearEvalContext$LWS() {
    const evalContext$LWS = lockerEvalContextValue$LWS;
    lockerEvalContextValue$LWS = void 0;
    return evalContext$LWS;
  }
  function clearEvalHelpers$LWS() {
    const evalHelpers$LWS = lockerEvalHelpersValue$LWS;
    lockerEvalHelpersValue$LWS = void 0;
    return evalHelpers$LWS;
  }
  function setEvalContext$LWS(evalContext$LWS) {
    lockerEvalContextValue$LWS = evalContext$LWS;
  }
  function setEvalHelpers$LWS(evalHelpers$LWS) {
    lockerEvalHelpersValue$LWS = evalHelpers$LWS;
  }
  const CORE_SANDBOX_KEY$LWS = "lws-core-sandbox";
  const DEFAULT_ENDOWMENTS_DESCRIPTOR_MAP$LWS = {
    [SANDBOX_EVAL_CONTEXT_NAME$LWS]: {
      __proto__: null,
      get() {
        return clearEvalContext$LWS();
      }
    },
    [SANDBOX_EVAL_HELPERS_NAME$LWS]: {
      __proto__: null,
      get() {
        return clearEvalHelpers$LWS();
      }
    }
  };
  const EMPTY_DISTORTIONS_MAP$LWS = createDistortionMap$LWS();
  const EMPTY_OBJECT$LWS = {};
  const ROOT_UNCOMPILED_CONTEXT$LWS = {
    [UNCOMPILED_LOCATION_NAME$LWS]: rootWindowLocation$LWS,
    [UNCOMPILED_TOP_NAME$LWS]: rootWindowTop$LWS,
    location: rootWindowLocation$LWS,
    top: rootWindowTop$LWS
  };
  const {
    apply: ReflectApply$LWS,
    defineProperty: ReflectDefineProperty$LWS,
    deleteProperty: ReflectDeleteProperty$LWS,
    getPrototypeOf: ReflectGetPrototypeOf$LWS,
    ownKeys: ReflectOwnKeys$LWS,
    setPrototypeOf: ReflectSetPrototypeOf$LWS
  } = Reflect;
  const ObjectCtor$LWS = Object;
  const {
    assign: ObjectAssign$LWS,
    freeze: ObjectFreeze$LWS,
    keys: ObjectKeys$LWS,
    prototype: ObjectProto$LWS
  } = ObjectCtor$LWS;
  const {
    hasOwn: OriginalObjectHasOwn$LWS
  } = ObjectCtor$LWS;
  const {
    __lookupGetter__: ObjectProtoLookupGetter$LWS,
    __lookupSetter__: ObjectProtoLookupSetter$LWS,
    hasOwnProperty: ObjectProtoHasOwnProperty$LWS
  } = ObjectProto$LWS;
  const ObjectHasOwn$LWS = typeof OriginalObjectHasOwn$LWS === "function" ? OriginalObjectHasOwn$LWS : function ObjectHasOwn$LWS2(object$LWS, key$LWS) {
    return ReflectApply$LWS(ObjectProtoHasOwnProperty$LWS, object$LWS, [key$LWS]);
  };
  const {
    toString: ObjectProtoToString$LWS
  } = ObjectProto$LWS;
  function isObject$LWS(value$LWS) {
    return typeof value$LWS === "object" && value$LWS !== null;
  }
  function ObjectLookupOwnGetter$LWS(object$LWS, key$LWS) {
    return object$LWS === null || object$LWS === void 0 || !ObjectHasOwn$LWS(object$LWS, key$LWS) ? void 0 : ReflectApply$LWS(ObjectProtoLookupGetter$LWS, object$LWS, [key$LWS]);
  }
  const SymbolCtor$LWS = Symbol;
  const {
    for: SymbolFor$LWS,
    iterator: SymbolIterator$LWS,
    toStringTag: SymbolToStringTag$LWS,
    unscopables: SymbolUnscopables$LWS
  } = SymbolCtor$LWS;
  const ArrayCtor$LWS = Array;
  const {
    prototype: ArrayProto$LWS
  } = ArrayCtor$LWS;
  const {
    at: ArrayProtoAt$LWS,
    concat: ArrayProtoConcat$LWS,
    copyWithin: ArrayProtoCopyWithin$LWS,
    entries: ArrayProtoEntries$LWS,
    every: ArrayProtoEvery$LWS,
    fill: ArrayProtoFill$LWS,
    findIndex: ArrayProtoFindIndex$LWS,
    flat: ArrayProtoFlat$LWS,
    flatMap: ArrayProtoFlatMap$LWS,
    forEach: ArrayProtoForEach$LWS,
    join: ArrayProtoJoin$LWS,
    keys: ArrayProtoKeys$LWS,
    lastIndexOf: ArrayProtoLastIndexOf$LWS,
    pop: ArrayProtoPop$LWS,
    reduce: ArrayProtoReduce$LWS,
    reduceRight: ArrayProtoReduceRight$LWS,
    reverse: ArrayProtoReverse$LWS,
    slice: ArrayProtoSlice$LWS,
    some: ArrayProtoSome$LWS,
    toLocaleString: ArrayProtoToLocaleString$LWS,
    toString: ArrayProtoToString$LWS,
    values: ArrayProtoValues$LWS,
    [SymbolIterator$LWS]: ArrayProtoSymbolIterator$LWS
  } = ArrayProto$LWS;
  const ArrayUnscopables$LWS = ObjectFreeze$LWS(ObjectAssign$LWS({
    __proto__: null
  }, ArrayProto$LWS[SymbolUnscopables$LWS]));
  const {
    filter: ArrayProtoFilter$LWS,
    find: ArrayProtoFind$LWS,
    includes: ArrayProtoIncludes$LWS,
    indexOf: ArrayProtoIndexOf$LWS,
    map: ArrayProtoMap$LWS,
    push: ArrayProtoPush$LWS,
    shift: ArrayProtoShift$LWS,
    splice: ArrayProtoSplice$LWS,
    sort: ArrayProtoSort$LWS,
    unshift: ArrayProtoUnshift$LWS
  } = ArrayProto$LWS;
  const {
    isArray: ArrayIsArray$LWS
  } = ArrayCtor$LWS;
  function toSafeArray$LWS(array$LWS) {
    ReflectSetPrototypeOf$LWS(array$LWS, null);
    array$LWS.at = ArrayProtoAt$LWS;
    array$LWS.concat = ArrayProtoConcat$LWS;
    array$LWS.copyWithin = ArrayProtoCopyWithin$LWS;
    array$LWS.entries = ArrayProtoEntries$LWS;
    array$LWS.every = ArrayProtoEvery$LWS;
    array$LWS.fill = ArrayProtoFill$LWS;
    array$LWS.filter = ArrayProtoFilter$LWS;
    array$LWS.find = ArrayProtoFind$LWS;
    array$LWS.findIndex = ArrayProtoFindIndex$LWS;
    array$LWS.flat = ArrayProtoFlat$LWS;
    array$LWS.flatMap = ArrayProtoFlatMap$LWS;
    array$LWS.forEach = ArrayProtoForEach$LWS;
    array$LWS.includes = ArrayProtoIncludes$LWS;
    array$LWS.indexOf = ArrayProtoIndexOf$LWS;
    array$LWS.join = ArrayProtoJoin$LWS;
    array$LWS.keys = ArrayProtoKeys$LWS;
    array$LWS.lastIndexOf = ArrayProtoLastIndexOf$LWS;
    array$LWS.map = ArrayProtoMap$LWS;
    array$LWS.pop = ArrayProtoPop$LWS;
    array$LWS.push = ArrayProtoPush$LWS;
    array$LWS.reduce = ArrayProtoReduce$LWS;
    array$LWS.reduceRight = ArrayProtoReduceRight$LWS;
    array$LWS.reverse = ArrayProtoReverse$LWS;
    array$LWS.shift = ArrayProtoShift$LWS;
    array$LWS.slice = ArrayProtoSlice$LWS;
    array$LWS.some = ArrayProtoSome$LWS;
    array$LWS.sort = ArrayProtoSort$LWS;
    array$LWS.splice = ArrayProtoSplice$LWS;
    array$LWS.toLocaleString = ArrayProtoToLocaleString$LWS;
    array$LWS.toString = ArrayProtoToString$LWS;
    array$LWS.unshift = ArrayProtoUnshift$LWS;
    array$LWS.values = ArrayProtoValues$LWS;
    array$LWS[SymbolIterator$LWS] = ArrayProtoSymbolIterator$LWS;
    array$LWS[SymbolUnscopables$LWS] = ArrayUnscopables$LWS;
    ReflectSetPrototypeOf$LWS(array$LWS, ArrayProto$LWS);
    return array$LWS;
  }
  ObjectLookupOwnGetter$LWS(ArrayBuffer.prototype, "byteLength");
  const LOCKER_UNMINIFIED_FLAG$LWS = `${function LOCKER_UNMINIFIED_FLAG$LWS2() {
    return LOCKER_UNMINIFIED_FLAG$LWS2.name;
  }()}`.includes("LOCKER_UNMINIFIED_FLAG");
  const CHAR_ELLIPSIS$LWS = "\u2026";
  const LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS = SymbolFor$LWS("@@lockerNearMembraneSerializedValue");
  const LOCKER_NEAR_MEMBRANE_SYMBOL$LWS = SymbolFor$LWS("@@lockerNearMembrane");
  SymbolFor$LWS("@@lockerLiveValue");
  const TO_STRING_BRAND_BIG_INT$LWS = "[object BigInt]";
  const TO_STRING_BRAND_BOOLEAN$LWS = "[object Boolean]";
  const TO_STRING_BRAND_NUMBER$LWS = "[object Number]";
  const TO_STRING_BRAND_STRING$LWS = "[object String]";
  const TO_STRING_BRAND_SYMBOL$LWS = "[object Symbol]";
  const MapCtor$LWS = Map;
  const {
    prototype: MapProto$LWS
  } = MapCtor$LWS;
  const {
    clear: MapProtoClear$LWS,
    delete: MapProtoDelete$LWS,
    forEach: MapProtoForEach$LWS,
    get: MapProtoGet$LWS,
    has: MapProtoHas$LWS,
    keys: MapProtoKeys$LWS,
    values: MapProtoValues$LWS,
    [SymbolIterator$LWS]: MapProtoSymbolIterator$LWS,
    [SymbolToStringTag$LWS]: MapProtoSymbolToStringTag$LWS
  } = MapProto$LWS;
  const {
    entries: MapProtoEntries$LWS,
    set: MapProtoSet$LWS
  } = MapProto$LWS;
  const MapProtoSizeGetter$LWS = ObjectLookupOwnGetter$LWS(MapProto$LWS, "size");
  function toSafeMap$LWS(map$LWS) {
    ReflectSetPrototypeOf$LWS(map$LWS, null);
    map$LWS.clear = MapProtoClear$LWS;
    map$LWS.delete = MapProtoDelete$LWS;
    map$LWS.entries = MapProtoEntries$LWS;
    map$LWS.forEach = MapProtoForEach$LWS;
    map$LWS.get = MapProtoGet$LWS;
    map$LWS.has = MapProtoHas$LWS;
    map$LWS.keys = MapProtoKeys$LWS;
    map$LWS.set = MapProtoSet$LWS;
    ReflectDefineProperty$LWS(map$LWS, "size", {
      __proto__: null,
      configurable: true,
      enumerable: true,
      get: MapProtoSizeGetter$LWS,
      set: void 0
    });
    map$LWS.values = MapProtoValues$LWS;
    map$LWS[SymbolIterator$LWS] = MapProtoSymbolIterator$LWS;
    map$LWS[SymbolToStringTag$LWS] = MapProtoSymbolToStringTag$LWS;
    ReflectSetPrototypeOf$LWS(map$LWS, MapProto$LWS);
    return map$LWS;
  }
  const NumberCtor$LWS = Number;
  const {
    isFinite: NumberIsFinite$LWS,
    isInteger: NumberIsInteger$LWS,
    isNaN: NumberIsNaN$LWS
  } = NumberCtor$LWS;
  const RegExpCtor$LWS = RegExp;
  const {
    prototype: RegExpProto$LWS
  } = RegExpCtor$LWS;
  const {
    test: RegExpProtoTest$LWS
  } = RegExpProto$LWS;
  ObjectLookupOwnGetter$LWS(RegExpProto$LWS, "source");
  const SetCtor$LWS = Set;
  const {
    prototype: SetProto$LWS
  } = SetCtor$LWS;
  const {
    add: SetProtoAdd$LWS,
    has: SetProtoHas$LWS,
    values: SetProtoValues$LWS
  } = SetProto$LWS;
  ObjectLookupOwnGetter$LWS(SetProto$LWS, "size");
  const StringCtor$LWS = String;
  const {
    prototype: StringProto$LWS
  } = StringCtor$LWS;
  const {
    slice: StringProtoSlice$LWS,
    valueOf: StringProtoValueOf$LWS
  } = StringProto$LWS;
  const WeakMapCtor$LWS = WeakMap;
  const {
    prototype: WeakMapProto$LWS
  } = WeakMapCtor$LWS;
  const {
    has: WeakMapProtoHas$LWS
  } = WeakMapProto$LWS;
  const {
    delete: WeakMapProtoDelete$LWS,
    get: WeakMapProtoGet$LWS,
    set: WeakMapProtoSet$LWS,
    [SymbolToStringTag$LWS]: WeakMapProtoSymbolToStringTag$LWS
  } = WeakMapProto$LWS;
  function toSafeWeakMap$LWS(weakMap$LWS) {
    ReflectSetPrototypeOf$LWS(weakMap$LWS, null);
    weakMap$LWS.delete = WeakMapProtoDelete$LWS;
    weakMap$LWS.get = WeakMapProtoGet$LWS;
    weakMap$LWS.has = WeakMapProtoHas$LWS;
    weakMap$LWS.set = WeakMapProtoSet$LWS;
    weakMap$LWS[SymbolToStringTag$LWS] = WeakMapProtoSymbolToStringTag$LWS;
    ReflectSetPrototypeOf$LWS(weakMap$LWS, WeakMapProto$LWS);
    return weakMap$LWS;
  }
  const WeakSetCtor$LWS = WeakSet;
  const {
    prototype: WeakSetProto$LWS
  } = WeakSetCtor$LWS;
  const {
    has: WeakSetProtoHas$LWS
  } = WeakSetProto$LWS;
  const {
    add: WeakSetProtoAdd$LWS,
    delete: WeakSetProtoDelete$LWS,
    [SymbolToStringTag$LWS]: WeakSetProtoSymbolToStringTag$LWS
  } = WeakSetProto$LWS;
  function toSafeWeakSet$LWS(weakSet$LWS) {
    ReflectSetPrototypeOf$LWS(weakSet$LWS, null);
    weakSet$LWS.add = WeakSetProtoAdd$LWS;
    weakSet$LWS.delete = WeakSetProtoDelete$LWS;
    weakSet$LWS.has = WeakSetProtoHas$LWS;
    weakSet$LWS[SymbolToStringTag$LWS] = WeakSetProtoSymbolToStringTag$LWS;
    ReflectSetPrototypeOf$LWS(weakSet$LWS, WeakSetProto$LWS);
    return weakSet$LWS;
  }
  const {
    stringify: JSONStringify$LWS
  } = JSON;
  function getNearMembraneProxySerializedValue$LWS(object$LWS) {
    if (typeof object$LWS === "object" && object$LWS !== null || typeof object$LWS === "function") {
      return LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS in object$LWS ? void 0 : object$LWS[LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS];
    }
    return void 0;
  }
  function isNearMembraneProxy$LWS(value$LWS) {
    if (typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function") {
      return !(LOCKER_NEAR_MEMBRANE_SYMBOL$LWS in value$LWS) && value$LWS[LOCKER_NEAR_MEMBRANE_SYMBOL$LWS] === true;
    }
    return false;
  }
  toSafeMap$LWS(new MapCtor$LWS());
  const ErrorCtor$LWS = Error;
  const TypeErrorCtor$LWS = TypeError;
  function noop$LWS() {
  }
  const {
    min: MathMin$LWS
  } = Math;
  const rootWindow$LWS = window;
  const {
    navigator: navigator$LWS,
    navigator: {
      userAgentData: userAgentData$LWS
    }
  } = rootWindow$LWS;
  const brands$LWS = userAgentData$LWS == null ? void 0 : userAgentData$LWS.brands;
  const chromiumUserAgentRegExp$LWS = / (?:Headless)?Chrome\/\d+/;
  let userAgent$LWS;
  function getUserAgent$LWS() {
    if (userAgent$LWS === void 0) {
      userAgent$LWS = navigator$LWS.userAgent;
    }
    return userAgent$LWS;
  }
  const IS_CHROMIUM_BROWSER$LWS = ArrayIsArray$LWS(brands$LWS) && brands$LWS.length ? ReflectApply$LWS(ArrayProtoFind$LWS, brands$LWS, [
    (item$LWS) => (item$LWS == null ? void 0 : item$LWS.brand) === "Chromium"
  ]) !== void 0 : ReflectApply$LWS(RegExpProtoTest$LWS, chromiumUserAgentRegExp$LWS, [getUserAgent$LWS()]);
  const IS_OLD_CHROMIUM_BROWSER$LWS = IS_CHROMIUM_BROWSER$LWS && userAgentData$LWS === void 0;
  const {
    prototype: DocumentProto$LWS
  } = Document;
  const {
    close: DocumentProtoClose$LWS,
    createElement: DocumentProtoCreateElement$LWS,
    open: DocumentProtoOpen$LWS
  } = DocumentProto$LWS;
  const DocumentProtoBodyGetter$LWS = ObjectLookupOwnGetter$LWS(DocumentProto$LWS, "body");
  const DOMExceptionCtor$LWS = DOMException;
  ObjectLookupOwnGetter$LWS(DOMExceptionCtor$LWS.prototype, "code");
  const {
    remove: ElementProtoRemove$LWS,
    setAttribute: ElementProtoSetAttribute$LWS
  } = Element.prototype;
  const HTMLElementProtoStyleGetter$LWS = ObjectLookupOwnGetter$LWS(HTMLElement.prototype, "style");
  const HTMLIFrameElementProtoContentWindowGetter$LWS = ObjectLookupOwnGetter$LWS(HTMLIFrameElement.prototype, "contentWindow");
  const {
    prototype: NodeProto$LWS
  } = Node;
  const {
    appendChild: NodeProtoAppendChild$LWS
  } = NodeProto$LWS;
  const NodeProtoLastChildGetter$LWS = ObjectLookupOwnGetter$LWS(NodeProto$LWS, "lastChild");
  if (LOCKER_UNMINIFIED_FLAG$LWS) {
    let lockerDebugModeSymbolFlag$LWS = true;
    const LOCKER_DEBUG_MODE_SYMBOL$LWS = SymbolFor$LWS("@@lockerDebugMode");
    const MAX_ARRAY_DISPLAY$LWS = 100;
    const MAX_OBJECT_DISPLAY$LWS = 5;
    const MAX_STRING_DISPLAY$LWS = 100;
    const MID_STRING_DISPLAY$LWS = MAX_STRING_DISPLAY$LWS / 2;
    const headerCSSText$LWS = "display: inline-block; margin-bottom: 3px; margin-left: -3px; word-break: break-all; word-wrap: wrap;";
    const bodyItemStyleObject$LWS = {
      style: "margin-left:15px; margin-bottom: 3px;"
    };
    const bodyStyleObject$LWS = {
      style: "display: inline-block; margin-left:12px; word-break: break-all; word-wrap: wrap;"
    };
    const keyEnumerableStringStyleObject$LWS = {
      style: "color: #9d288c; font-weight: bold"
    };
    const keyNonEnumerableOrSymbolStyleObject$LWS = {
      style: "color: #b17ab0"
    };
    const primitiveBlueColorStyleObject$LWS = {
      style: "color: #16239f"
    };
    const primitiveGreenColorStyleObject$LWS = {
      style: "color: #236d25"
    };
    const primitiveGreyColorStyleObject$LWS = {
      style: "color: #606367"
    };
    const primitiveOrangeColorStyleObject$LWS = {
      style: "color: #b82619"
    };
    const formatValue$LWS = function formatValue$LWS2(value$LWS) {
      if (value$LWS === null || value$LWS === void 0) {
        return ["span", primitiveGreyColorStyleObject$LWS, `${value$LWS}`];
      }
      if (typeof value$LWS === "boolean") {
        return ["span", primitiveBlueColorStyleObject$LWS, value$LWS];
      }
      if (typeof value$LWS === "number") {
        return NumberIsFinite$LWS(value$LWS) ? ["span", primitiveBlueColorStyleObject$LWS, value$LWS] : ["span", primitiveBlueColorStyleObject$LWS, `${value$LWS >= 0 ? "" : "-"}Infinity`];
      }
      if (typeof value$LWS === "bigint") {
        return ["span", primitiveGreenColorStyleObject$LWS, `${value$LWS}n`];
      }
      if (typeof value$LWS === "string") {
        let string$LWS = value$LWS;
        const {
          length: length$LWS2
        } = string$LWS;
        if (length$LWS2 > MAX_STRING_DISPLAY$LWS) {
          const firstChunk$LWS = ReflectApply$LWS(StringProtoSlice$LWS, string$LWS, [0, MID_STRING_DISPLAY$LWS]);
          const lastChunk$LWS = ReflectApply$LWS(StringProtoSlice$LWS, string$LWS, [length$LWS2 - MID_STRING_DISPLAY$LWS - 1, length$LWS2]);
          string$LWS = firstChunk$LWS + CHAR_ELLIPSIS$LWS + lastChunk$LWS;
        }
        return ["span", primitiveOrangeColorStyleObject$LWS, JSONStringify$LWS(string$LWS)];
      }
      if (ArrayIsArray$LWS(value$LWS)) {
        return ["span", {}, `Array(${value$LWS.length})`];
      }
      if (isObject$LWS(value$LWS)) {
        return ["span", {}, `{${CHAR_ELLIPSIS$LWS}}`];
      }
      return ["span", primitiveOrangeColorStyleObject$LWS, StringCtor$LWS(value$LWS)];
    };
    const formatHeader$LWS = function formatHeader$LWS2(object$LWS, config$LWS) {
      const isChildElement$LWS = config$LWS == null ? void 0 : config$LWS.isChildElement;
      const formattedHeader$LWS = [];
      let formattedHeaderOffset$LWS = 0;
      if (isChildElement$LWS) {
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", keyEnumerableStringStyleObject$LWS, config$LWS.childKey];
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, ": "];
      }
      const brand$LWS = ReflectApply$LWS(ObjectProtoToString$LWS, object$LWS, []);
      let keys$LWS = ObjectKeys$LWS(object$LWS);
      if (brand$LWS === TO_STRING_BRAND_SYMBOL$LWS) {
        if (!ReflectApply$LWS(ArrayProtoIncludes$LWS, keys$LWS, ["description"])) {
          ReflectApply$LWS(ArrayProtoUnshift$LWS, keys$LWS, ["description"]);
        }
      } else if (brand$LWS === TO_STRING_BRAND_STRING$LWS) {
        const {
          length: length$LWS2
        } = object$LWS;
        keys$LWS = ReflectApply$LWS(ArrayProtoFilter$LWS, keys$LWS, [(key$LWS) => {
          const possibleIndex$LWS = typeof key$LWS === "string" ? +key$LWS : -1;
          return possibleIndex$LWS < 0 || possibleIndex$LWS >= length$LWS2 || !NumberIsInteger$LWS(possibleIndex$LWS);
        }]);
      }
      const ownKeysRaw$LWS = ReflectOwnKeys$LWS(object$LWS);
      const ownKeys$LWS = ReflectApply$LWS(ArrayProtoMap$LWS, ownKeysRaw$LWS, [StringCtor$LWS]);
      const {
        length: ownKeysLength$LWS
      } = ownKeys$LWS;
      if (ArrayIsArray$LWS(object$LWS)) {
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, `(${object$LWS.length}) [`];
        for (let i$LWS = 0, length$LWS2 = MathMin$LWS(ownKeysLength$LWS, MAX_ARRAY_DISPLAY$LWS); i$LWS < length$LWS2; i$LWS += 1) {
          const ownKeyRaw$LWS = ownKeysRaw$LWS[i$LWS];
          const ownKey$LWS = ownKeys$LWS[i$LWS];
          const value$LWS = object$LWS[ownKeyRaw$LWS];
          if (ownKey$LWS !== "length") {
            if (!NumberIsNaN$LWS(NumberCtor$LWS(ownKey$LWS))) {
              formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, i$LWS ? ", " : ""];
              formattedHeader$LWS[formattedHeaderOffset$LWS++] = formatValue$LWS(value$LWS);
            } else {
              formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, i$LWS ? ", " : ""];
              formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", primitiveGreyColorStyleObject$LWS, StringCtor$LWS(ownKey$LWS)];
              formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, ": "];
              formattedHeader$LWS[formattedHeaderOffset$LWS++] = formatValue$LWS(value$LWS);
            }
          }
        }
        if (ownKeysLength$LWS > MAX_ARRAY_DISPLAY$LWS) {
          formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", null, ["span", {}, `, ${CHAR_ELLIPSIS$LWS}`]];
        }
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, "]"];
        return formattedHeader$LWS;
      }
      let boxedHeaderEntry$LWS;
      let headerOpening$LWS = "{";
      switch (brand$LWS) {
        case TO_STRING_BRAND_BIG_INT$LWS:
        case TO_STRING_BRAND_BOOLEAN$LWS:
        case TO_STRING_BRAND_NUMBER$LWS:
        case TO_STRING_BRAND_STRING$LWS:
        case TO_STRING_BRAND_SYMBOL$LWS: {
          let colorStyleObject$LWS = primitiveBlueColorStyleObject$LWS;
          if (brand$LWS === TO_STRING_BRAND_BIG_INT$LWS) {
            colorStyleObject$LWS = primitiveGreenColorStyleObject$LWS;
          } else if (brand$LWS === TO_STRING_BRAND_SYMBOL$LWS) {
            colorStyleObject$LWS = primitiveOrangeColorStyleObject$LWS;
          }
          headerOpening$LWS = `${ReflectApply$LWS(StringProtoSlice$LWS, brand$LWS, [8, -1])} {`;
          boxedHeaderEntry$LWS = ["span", colorStyleObject$LWS, `${StringCtor$LWS(getNearMembraneProxySerializedValue$LWS(object$LWS))}`];
          break;
        }
      }
      formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, headerOpening$LWS];
      if (boxedHeaderEntry$LWS) {
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = boxedHeaderEntry$LWS;
        if (ownKeysLength$LWS) {
          formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, ", "];
        }
      }
      for (let i$LWS = 0, length$LWS2 = MathMin$LWS(ownKeysLength$LWS, MAX_OBJECT_DISPLAY$LWS); i$LWS < length$LWS2; i$LWS += 1) {
        const ownKeyRaw$LWS = ownKeysRaw$LWS[i$LWS];
        const ownKey$LWS = ownKeys$LWS[i$LWS];
        const value$LWS = object$LWS[ownKeyRaw$LWS];
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, i$LWS ? ", " : ""];
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", primitiveGreyColorStyleObject$LWS, ownKey$LWS];
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, ": "];
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = formatValue$LWS(value$LWS);
      }
      if (ownKeysLength$LWS > MAX_OBJECT_DISPLAY$LWS) {
        formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", null, ["span", {}, `, ${CHAR_ELLIPSIS$LWS}`]];
      }
      formattedHeader$LWS[formattedHeaderOffset$LWS++] = ["span", {}, "}"];
      return formattedHeader$LWS;
    };
    const formatBody$LWS = function formatBody$LWS2(object$LWS) {
      const ownKeysRaw$LWS = ReflectOwnKeys$LWS(object$LWS);
      const ownKeys$LWS = ReflectApply$LWS(ArrayProtoMap$LWS, ownKeysRaw$LWS, [StringCtor$LWS]);
      const isArray$LWS = ArrayIsArray$LWS(object$LWS);
      if (isArray$LWS) {
        const lengthIndex$LWS = ReflectApply$LWS(ArrayProtoIndexOf$LWS, ownKeys$LWS, ["length"]);
        const lengthKeyRaw$LWS = ReflectApply$LWS(ArrayProtoSplice$LWS, ownKeysRaw$LWS, [lengthIndex$LWS, 1])[0];
        ReflectApply$LWS(ArrayProtoPush$LWS, ownKeysRaw$LWS, [lengthKeyRaw$LWS]);
        const lengthKey$LWS = ReflectApply$LWS(ArrayProtoSplice$LWS, ownKeys$LWS, [lengthIndex$LWS, 1])[0];
        ReflectApply$LWS(ArrayProtoPush$LWS, ownKeys$LWS, [lengthKey$LWS]);
      }
      const formattedBody$LWS = [];
      let formattedBodyOffset$LWS = 0;
      for (let i$LWS = 0, {
        length: length$LWS2
      } = ownKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
        const ownKeyRaw$LWS = ownKeysRaw$LWS[i$LWS];
        const ownKey$LWS = ownKeys$LWS[i$LWS];
        const value$LWS = object$LWS[ownKeyRaw$LWS];
        if (isObject$LWS(value$LWS)) {
          formattedBody$LWS[formattedBodyOffset$LWS++] = ["div", {}, ["object", {
            object: value$LWS,
            config: {
              childKey: StringCtor$LWS(ownKey$LWS),
              isChildElement: true
            }
          }]];
        } else {
          let currentKeyStyle$LWS = keyEnumerableStringStyleObject$LWS;
          if (isArray$LWS && ownKey$LWS === "length") {
            currentKeyStyle$LWS = keyNonEnumerableOrSymbolStyleObject$LWS;
          }
          formattedBody$LWS[formattedBodyOffset$LWS++] = ["div", bodyItemStyleObject$LWS, ["span", currentKeyStyle$LWS, ownKey$LWS], ["span", {}, ": "], formatValue$LWS(value$LWS)];
        }
      }
      return formattedBody$LWS;
    };
    let {
      devtoolsFormatters: devtoolsFormatters$LWS
    } = rootWindow$LWS;
    if (!ArrayIsArray$LWS(devtoolsFormatters$LWS)) {
      devtoolsFormatters$LWS = [];
      ReflectDefineProperty$LWS(rootWindow$LWS, "devtoolsFormatters", {
        __proto__: null,
        configurable: true,
        value: devtoolsFormatters$LWS,
        writable: true
      });
    }
    devtoolsFormatters$LWS[devtoolsFormatters$LWS.length] = {
      header(object$LWS, config$LWS) {
        if (lockerDebugModeSymbolFlag$LWS) {
          lockerDebugModeSymbolFlag$LWS = false;
          ReflectDefineProperty$LWS(rootWindow$LWS, LOCKER_DEBUG_MODE_SYMBOL$LWS, {
            __proto__: null,
            configurable: true,
            value: true,
            writable: true
          });
        }
        if (!isNearMembraneProxy$LWS(object$LWS)) {
          return null;
        }
        const headerDiv$LWS = ["div", {
          style: `${headerCSSText$LWS}${config$LWS != null && config$LWS.isChildElement ? "" : "font-style: italic;"}`
        }];
        ReflectApply$LWS(ArrayProtoPush$LWS, headerDiv$LWS, formatHeader$LWS(object$LWS, config$LWS));
        return ["div", {}, headerDiv$LWS];
      },
      hasBody() {
        return true;
      },
      body(object$LWS) {
        const bodyDiv$LWS = ["div", bodyStyleObject$LWS];
        ReflectApply$LWS(ArrayProtoPush$LWS, bodyDiv$LWS, formatBody$LWS(object$LWS));
        return bodyDiv$LWS;
      }
    };
  }
  const proxyTargetToLazyPropertyDescriptorStateMap$LWS = toSafeWeakMap$LWS(new WeakMapCtor$LWS());
  function createMembraneMarshall$LWS(globalObject$LWS) {
    var _ref$LWS, _ref2$LWS, _ReflectApply$LWS, _globalThisRef$BigInt$LWS, _globalThisRef$BigUin$LWS;
    const ArrayCtor$LWS2 = Array;
    const ArrayBufferCtor$LWS2 = ArrayBuffer;
    const ErrorCtor$LWS2 = Error;
    const NumberCtor$LWS2 = Number;
    const ObjectCtor$LWS2 = Object;
    const ProxyCtor$LWS2 = Proxy;
    const ReflectRef$LWS = Reflect;
    const RegExpCtor$LWS2 = RegExp;
    const StringCtor$LWS2 = String;
    const SymbolCtor$LWS2 = Symbol;
    const TypeErrorCtor$LWS2 = TypeError;
    const WeakMapCtor$LWS2 = WeakMap;
    const WeakSetCtor$LWS2 = WeakSet;
    const {
      for: SymbolFor$LWS2,
      toStringTag: SymbolToStringTag$LWS2
    } = SymbolCtor$LWS2;
    const {
      apply: ReflectApply$LWS2,
      construct: ReflectConstruct$LWS2,
      defineProperty: ReflectDefineProperty$LWS2,
      deleteProperty: ReflectDeleteProperty$LWS2,
      get: ReflectGet$LWS2,
      getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor$LWS2,
      getPrototypeOf: ReflectGetPrototypeOf$LWS2,
      has: ReflectHas$LWS2,
      isExtensible: ReflectIsExtensible$LWS2,
      ownKeys: ReflectOwnKeys$LWS2,
      preventExtensions: ReflectPreventExtensions$LWS2,
      set: ReflectSet$LWS2,
      setPrototypeOf: ReflectSetPrototypeOf$LWS2
    } = ReflectRef$LWS;
    const {
      assign: ObjectAssign$LWS2,
      defineProperties: ObjectDefineProperties$LWS2,
      freeze: ObjectFreeze$LWS2,
      getOwnPropertyDescriptor: ObjectGetOwnPropertyDescriptor$LWS,
      getOwnPropertyDescriptors: ObjectGetOwnPropertyDescriptors$LWS2,
      isFrozen: ObjectIsFrozen$LWS,
      isSealed: ObjectIsSealed$LWS,
      keys: ObjectKeys$LWS2,
      prototype: ObjectProto$LWS2,
      seal: ObjectSeal$LWS
    } = ObjectCtor$LWS2;
    const {
      hasOwnProperty: ObjectProtoHasOwnProperty$LWS2,
      propertyIsEnumerable: ObjectProtoPropertyIsEnumerable$LWS,
      toString: ObjectProtoToString$LWS2
    } = ObjectProto$LWS2;
    const {
      hasOwn: OriginalObjectHasOwn$LWS2
    } = ObjectCtor$LWS2;
    const {
      __defineGetter__: ObjectProtoDefineGetter$LWS,
      __defineSetter__: ObjectProtoDefineSetter$LWS,
      __lookupGetter__: ObjectProtoLookupGetter$LWS2,
      __lookupSetter__: ObjectProtoLookupSetter$LWS2
    } = ObjectProto$LWS2;
    const ObjectHasOwn$LWS2 = typeof OriginalObjectHasOwn$LWS2 === "function" ? OriginalObjectHasOwn$LWS2 : (object$LWS, key$LWS) => ReflectApply$LWS2(ObjectProtoHasOwnProperty$LWS2, object$LWS, [key$LWS]);
    const globalThisRef$LWS = (_ref$LWS = (_ref2$LWS = globalObject$LWS != null ? globalObject$LWS : typeof globalThis !== "undefined" ? globalThis : void 0) != null ? _ref2$LWS : typeof self !== "undefined" ? self : void 0) != null ? _ref$LWS : (ReflectDefineProperty$LWS2(ObjectProto$LWS2, "globalThis", {
      __proto__: null,
      configurable: true,
      get() {
        ReflectDeleteProperty$LWS2(ObjectProto$LWS2, "globalThis");
        return this != null ? this : self;
      }
    }), globalThis);
    const IS_IN_SHADOW_REALM$LWS = typeof globalObject$LWS !== "object" || globalObject$LWS === null;
    const IS_NOT_IN_SHADOW_REALM$LWS = !IS_IN_SHADOW_REALM$LWS;
    const LOCKER_DEBUG_MODE_SYMBOL$LWS = IS_NOT_IN_SHADOW_REALM$LWS ? SymbolFor$LWS2("@@lockerDebugMode") : void 0;
    const LOCKER_IDENTIFIER_MARKER$LWS2 = "$LWS";
    const LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS2 = IS_NOT_IN_SHADOW_REALM$LWS ? SymbolFor$LWS2("@@lockerNearMembraneSerializedValue") : void 0;
    const LOCKER_NEAR_MEMBRANE_SYMBOL$LWS2 = IS_NOT_IN_SHADOW_REALM$LWS ? SymbolFor$LWS2("@@lockerNearMembrane") : void 0;
    const LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2 = SymbolFor$LWS2("@@lockerNearMembraneUndefinedValue");
    const LOCKER_STACK_TRACE_LIMIT$LWS = 20;
    const LOCKER_UNMINIFIED_FLAG$LWS2 = `${function LOCKER_UNMINIFIED_FLAG$LWS3() {
      return LOCKER_UNMINIFIED_FLAG$LWS3.name;
    }()}`.includes("LOCKER_UNMINIFIED_FLAG");
    const LOCKER_DEBUGGABLE_FLAG$LWS = LOCKER_UNMINIFIED_FLAG$LWS2 && IS_NOT_IN_SHADOW_REALM$LWS;
    const ERR_ILLEGAL_PROPERTY_ACCESS$LWS2 = "Illegal property access.";
    const FLAGS_REG_EXP$LWS = IS_IN_SHADOW_REALM$LWS ? /\w*$/ : void 0;
    let MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS;
    const SUPPORTS_BIG_INT$LWS2 = typeof BigInt === "function";
    const {
      isArray: isArrayOrThrowForRevoked$LWS
    } = ArrayCtor$LWS2;
    const {
      includes: ArrayProtoIncludes$LWS2,
      indexOf: ArrayProtoIndexOf$LWS2,
      slice: ArrayProtoSlice$LWS2
    } = ArrayCtor$LWS2.prototype;
    const {
      isView: ArrayBufferIsView$LWS2
    } = ArrayBufferCtor$LWS2;
    const BigIntProtoValueOf$LWS2 = SUPPORTS_BIG_INT$LWS2 ? BigInt.prototype.valueOf : void 0;
    const {
      valueOf: BooleanProtoValueOf$LWS2
    } = Boolean.prototype;
    const {
      toString: ErrorProtoToString$LWS
    } = ErrorCtor$LWS2.prototype;
    const {
      bind: FunctionProtoBind$LWS2,
      toString: FunctionProtoToString$LWS2
    } = Function.prototype;
    const {
      stringify: JSONStringify$LWS2
    } = JSON;
    const {
      isInteger: NumberIsInteger$LWS2
    } = NumberCtor$LWS2;
    const {
      valueOf: NumberProtoValueOf$LWS2
    } = NumberCtor$LWS2.prototype;
    const {
      revocable: ProxyRevocable$LWS2
    } = ProxyCtor$LWS2;
    const {
      prototype: RegExpProto$LWS2
    } = RegExpCtor$LWS2;
    const {
      exec: RegExpProtoExec$LWS2,
      test: RegExpProtoTest$LWS2,
      toString: RegExProtoToString$LWS
    } = RegExpProto$LWS2;
    const RegExpProtoFlagsGetter$LWS = IS_IN_SHADOW_REALM$LWS ? (_ReflectApply$LWS = ReflectApply$LWS2(ObjectProtoLookupGetter$LWS2, RegExpProto$LWS2, ["flags"])) != null ? _ReflectApply$LWS : function flags$LWS() {
      const string$LWS = ReflectApply$LWS2(RegExProtoToString$LWS, this, []);
      return ReflectApply$LWS2(RegExpProtoExec$LWS2, FLAGS_REG_EXP$LWS, [string$LWS])[0];
    } : void 0;
    const RegExpProtoSourceGetter$LWS2 = ReflectApply$LWS2(ObjectProtoLookupGetter$LWS2, RegExpProto$LWS2, ["source"]);
    const {
      replace: StringProtoReplace$LWS2,
      slice: StringProtoSlice$LWS2,
      valueOf: StringProtoValueOf$LWS2
    } = StringCtor$LWS2.prototype;
    const {
      toString: SymbolProtoToString$LWS2,
      valueOf: SymbolProtoValueOf$LWS2
    } = SymbolCtor$LWS2.prototype;
    const BigInt64ArrayProto$LWS = (_globalThisRef$BigInt$LWS = globalThisRef$LWS.BigInt64Array) == null ? void 0 : _globalThisRef$BigInt$LWS.prototype;
    const BigUint64ArrayProto$LWS = (_globalThisRef$BigUin$LWS = globalThisRef$LWS.BigUint64Array) == null ? void 0 : _globalThisRef$BigUin$LWS.prototype;
    const {
      prototype: Float32ArrayProto$LWS
    } = Float32Array;
    const {
      prototype: Float64ArrayProto$LWS
    } = Float64Array;
    const {
      prototype: Int8ArrayProto$LWS
    } = Int8Array;
    const {
      prototype: Int16ArrayProto$LWS
    } = Int16Array;
    const {
      prototype: Int32ArrayProto$LWS
    } = Int32Array;
    const {
      prototype: Uint8ArrayProto$LWS
    } = Uint8Array;
    const {
      prototype: Uint16ArrayProto$LWS
    } = Uint16Array;
    const {
      prototype: Uint32ArrayProto$LWS
    } = Uint32Array;
    const TypedArrayProto$LWS = Uint8ArrayProto$LWS.__proto__;
    const TypedArrayProtoLengthGetter$LWS = ReflectApply$LWS2(ObjectProtoLookupGetter$LWS2, TypedArrayProto$LWS, ["length"]);
    const {
      prototype: WeakMapProto$LWS2
    } = WeakMapCtor$LWS2;
    const {
      delete: WeakMapProtoDelete$LWS2,
      has: WeakMapProtoHas$LWS2,
      set: WeakMapProtoSet$LWS2,
      [SymbolToStringTag$LWS2]: WeakMapProtoSymbolToStringTag$LWS2
    } = WeakMapProto$LWS2;
    const {
      prototype: WeakSetProto$LWS2
    } = WeakSetCtor$LWS2;
    const {
      add: WeakSetProtoAdd$LWS2,
      has: WeakSetProtoHas$LWS2,
      delete: WeakSetProtoDelete$LWS2,
      [SymbolToStringTag$LWS2]: WeakSetProtoSymbolToStringTag$LWS2
    } = WeakSetProto$LWS2;
    const consoleObject$LWS = IS_NOT_IN_SHADOW_REALM$LWS && typeof console === "object" && console !== null ? console : void 0;
    const consoleInfo$LWS = consoleObject$LWS == null ? void 0 : consoleObject$LWS.info;
    const localEval$LWS = IS_IN_SHADOW_REALM$LWS ? eval : void 0;
    let installedErrorPrepareStackTraceFlag$LWS = false;
    let installedPropertyDescriptorMethodWrappersFlag$LWS = false;
    function alwaysFalse$LWS() {
      return false;
    }
    const installErrorPrepareStackTrace$LWS = LOCKER_UNMINIFIED_FLAG$LWS2 ? () => {
      if (installedErrorPrepareStackTraceFlag$LWS) {
        return;
      }
      installedErrorPrepareStackTraceFlag$LWS = true;
      const CallSite$LWS = (() => {
        try {
          var _callSites$$LWS;
          ErrorCtor$LWS2.prepareStackTrace = (_error$LWS, callSites2) => callSites2;
          const callSites = new ErrorCtor$LWS2().stack;
          ReflectDeleteProperty$LWS2(ErrorCtor$LWS2, "prepareStackTrace");
          return isArrayOrThrowForRevoked$LWS(callSites) && callSites.length > 0 ? (_callSites$$LWS = callSites[0]) == null ? void 0 : _callSites$$LWS.constructor : void 0;
        } catch (_unused$LWS) {
        }
        return void 0;
      })();
      if (typeof CallSite$LWS !== "function") {
        return;
      }
      const {
        getEvalOrigin: CallSiteProtoGetEvalOrigin$LWS,
        getFunctionName: CallSiteProtoGetFunctionName$LWS,
        toString: CallSiteProtoToString$LWS
      } = CallSite$LWS.prototype;
      const lockerFunctionNameMarkerRegExp$LWS = new RegExpCtor$LWS2(`${ReflectApply$LWS2(StringProtoReplace$LWS2, LOCKER_IDENTIFIER_MARKER$LWS2, [/[\\^$.*+?()[\]{}|]/g, "\\$&"])}(?=\\.|$)`);
      const formatStackTrace = function formatStackTrace2(error, callSites) {
        let stackTrace$LWS = "";
        try {
          stackTrace$LWS = ReflectApply$LWS2(ErrorProtoToString$LWS, error, []);
        } catch (_unused2$LWS) {
          stackTrace$LWS = "<error>";
        }
        let consecutive$LWS = false;
        for (let i$LWS = 0, {
          length: length$LWS2
        } = callSites; i$LWS < length$LWS2; i$LWS += 1) {
          const callSite$LWS = callSites[i$LWS];
          const funcName$LWS = ReflectApply$LWS2(CallSiteProtoGetFunctionName$LWS, callSite$LWS, []);
          let isMarked$LWS = false;
          if (typeof funcName$LWS === "string" && funcName$LWS !== "eval" && ReflectApply$LWS2(RegExpProtoTest$LWS2, lockerFunctionNameMarkerRegExp$LWS, [funcName$LWS])) {
            isMarked$LWS = true;
          }
          if (!isMarked$LWS) {
            const evalOrigin$LWS = ReflectApply$LWS2(CallSiteProtoGetEvalOrigin$LWS, callSite$LWS, []);
            if (typeof evalOrigin$LWS === "string" && ReflectApply$LWS2(RegExpProtoTest$LWS2, lockerFunctionNameMarkerRegExp$LWS, [evalOrigin$LWS])) {
              isMarked$LWS = true;
            }
          }
          if (isMarked$LWS) {
            if (!consecutive$LWS) {
              consecutive$LWS = true;
              stackTrace$LWS += "\n    at LWS";
            }
            continue;
          } else {
            consecutive$LWS = false;
          }
          try {
            stackTrace$LWS += `
    at ${ReflectApply$LWS2(CallSiteProtoToString$LWS, callSite$LWS, [])}`;
          } catch (_unused3$LWS) {
          }
        }
        return stackTrace$LWS;
      };
      try {
        ErrorCtor$LWS2.prepareStackTrace = function prepareStackTrace(error, callSites) {
          return formatStackTrace(error, callSites);
        };
      } catch (_unused4$LWS) {
      }
      try {
        const {
          stackTraceLimit: stackTraceLimit$LWS
        } = ErrorCtor$LWS2;
        if (typeof stackTraceLimit$LWS !== "number" || stackTraceLimit$LWS < LOCKER_STACK_TRACE_LIMIT$LWS) {
          ErrorCtor$LWS2.stackTraceLimit = LOCKER_STACK_TRACE_LIMIT$LWS;
        }
      } catch (_unused5$LWS) {
      }
    } : noop$LWS2;
    function noop$LWS2() {
    }
    const serializeBigIntObject$LWS = IS_IN_SHADOW_REALM$LWS ? (bigIntObject$LWS) => ReflectApply$LWS2(BigIntProtoValueOf$LWS2, bigIntObject$LWS, []) : noop$LWS2;
    const serializeBooleanObject$LWS = IS_IN_SHADOW_REALM$LWS ? (booleanObject$LWS) => ReflectApply$LWS2(BooleanProtoValueOf$LWS2, booleanObject$LWS, []) : noop$LWS2;
    const serializeNumberObject$LWS = IS_IN_SHADOW_REALM$LWS ? (numberObject$LWS) => ReflectApply$LWS2(NumberProtoValueOf$LWS2, numberObject$LWS, []) : noop$LWS2;
    const serializeRegExp$LWS = IS_IN_SHADOW_REALM$LWS ? (value$LWS) => {
      if (value$LWS !== RegExpProto$LWS2) {
        const source$LWS = ReflectApply$LWS2(RegExpProtoSourceGetter$LWS2, value$LWS, []);
        return JSONStringify$LWS2({
          __proto__: null,
          flags: ReflectApply$LWS2(RegExpProtoFlagsGetter$LWS, value$LWS, []),
          source: source$LWS
        });
      }
      return void 0;
    } : noop$LWS2;
    const serializeStringObject$LWS = IS_IN_SHADOW_REALM$LWS ? (stringObject$LWS) => ReflectApply$LWS2(StringProtoValueOf$LWS2, stringObject$LWS, []) : noop$LWS2;
    const serializeSymbolObject$LWS = IS_IN_SHADOW_REALM$LWS ? (symbolObject$LWS) => ReflectApply$LWS2(SymbolProtoValueOf$LWS2, symbolObject$LWS, []) : noop$LWS2;
    const serializeTargetByBrand$LWS = IS_IN_SHADOW_REALM$LWS ? (target$LWS) => {
      const brand$LWS = ReflectApply$LWS2(ObjectProtoToString$LWS2, target$LWS, []);
      switch (brand$LWS) {
        case "[object Boolean]":
          return serializeBooleanObject$LWS(target$LWS);
        case "[object Number]":
          return serializeNumberObject$LWS(target$LWS);
        case "[object RegExp]":
          return serializeRegExp$LWS(target$LWS);
        case "[object String]":
          return serializeStringObject$LWS(target$LWS);
        case "[object Object]":
          try {
            return serializeSymbolObject$LWS(target$LWS);
          } catch (_unused6$LWS) {
          }
          if (SUPPORTS_BIG_INT$LWS2) {
            try {
              return serializeBigIntObject$LWS(target$LWS);
            } catch (_unused7$LWS) {
            }
          }
        default:
          return void 0;
      }
    } : noop$LWS2;
    const serializeTargetByTrialAndError$LWS = IS_IN_SHADOW_REALM$LWS ? (target$LWS) => {
      try {
        return serializeSymbolObject$LWS(target$LWS);
      } catch (_unused8$LWS) {
      }
      if (SUPPORTS_BIG_INT$LWS2) {
        try {
          return serializeBigIntObject$LWS(target$LWS);
        } catch (_unused9$LWS) {
        }
      }
      try {
        return serializeBooleanObject$LWS(target$LWS);
      } catch (_unused10$LWS) {
      }
      try {
        return serializeNumberObject$LWS(target$LWS);
      } catch (_unused11$LWS) {
      }
      try {
        return serializeRegExp$LWS(target$LWS);
      } catch (_unused12$LWS) {
      }
      try {
        return serializeStringObject$LWS(target$LWS);
      } catch (_unused13$LWS) {
      }
      return void 0;
    } : noop$LWS2;
    function toSafeTemplateStringValue$LWS2(value$LWS) {
      if (typeof value$LWS === "string") {
        return value$LWS;
      }
      try {
        if (typeof value$LWS === "object" && value$LWS !== null) {
          const result$LWS = ReflectApply$LWS2(ObjectProtoToString$LWS2, value$LWS, []);
          return result$LWS === "[object Symbol]" ? ReflectApply$LWS2(SymbolProtoToString$LWS2, value$LWS, []) : result$LWS;
        }
        if (typeof value$LWS === "function") {
          return ReflectApply$LWS2(FunctionProtoToString$LWS2, value$LWS, []);
        }
        return StringCtor$LWS2(value$LWS);
      } catch (_unused14$LWS) {
      }
      return "[Object Unknown]";
    }
    function toSafeWeakMap$LWS2(weakMap$LWS) {
      ReflectSetPrototypeOf$LWS2(weakMap$LWS, null);
      weakMap$LWS.delete = WeakMapProtoDelete$LWS2;
      weakMap$LWS.has = WeakMapProtoHas$LWS2;
      weakMap$LWS.set = WeakMapProtoSet$LWS2;
      weakMap$LWS[SymbolToStringTag$LWS2] = WeakMapProtoSymbolToStringTag$LWS2;
      ReflectSetPrototypeOf$LWS2(weakMap$LWS, WeakMapProto$LWS2);
      return weakMap$LWS;
    }
    function toSafeWeakSet$LWS2(weakSet$LWS) {
      ReflectSetPrototypeOf$LWS2(weakSet$LWS, null);
      weakSet$LWS.add = WeakSetProtoAdd$LWS2;
      weakSet$LWS.delete = WeakSetProtoDelete$LWS2;
      weakSet$LWS.has = WeakSetProtoHas$LWS2;
      weakSet$LWS[SymbolToStringTag$LWS2] = WeakSetProtoSymbolToStringTag$LWS2;
      ReflectSetPrototypeOf$LWS2(weakSet$LWS, WeakSetProto$LWS2);
      return weakSet$LWS;
    }
    return function createHooksCallback$LWS(color$LWS, foreignCallableHooksCallback$LWS, options$LWS) {
      if (IS_IN_SHADOW_REALM$LWS) {
        options$LWS = void 0;
      }
      const {
        distortionCallback: distortionCallback$LWS,
        liveTargetCallback: liveTargetCallback$LWS,
        revokedProxyCallback: revokedProxyCallback$LWS2
      } = ObjectAssign$LWS2({
        __proto__: null
      }, options$LWS);
      const applyTrapNameRegistry$LWS = {
        __proto__: null,
        0: void 0,
        1: void 0,
        2: void 0,
        3: void 0,
        4: void 0,
        n: void 0
      };
      const constructTrapNameRegistry$LWS = {
        __proto__: null,
        0: void 0,
        1: void 0,
        2: void 0,
        3: void 0,
        4: void 0,
        n: void 0
      };
      const lazyPropertyDescriptorStateCache$LWS = toSafeWeakMap$LWS2(new WeakMapCtor$LWS2());
      const proxyPointerCache$LWS = toSafeWeakMap$LWS2(new WeakMapCtor$LWS2());
      let foreignCallablePushErrorTarget$LWS;
      let foreignCallablePushTarget$LWS;
      let foreignCallableApply$LWS;
      let foreignCallableConstruct$LWS;
      let foreignCallableDefineProperty$LWS;
      let foreignCallableDeleteProperty$LWS;
      let foreignCallableGet$LWS;
      let foreignCallableGetOwnPropertyDescriptor$LWS;
      let foreignCallableGetPrototypeOf$LWS;
      let foreignCallableHas$LWS;
      let foreignCallableIsExtensible$LWS;
      let foreignCallableOwnKeys$LWS;
      let foreignCallablePreventExtensions$LWS;
      let foreignCallableSet$LWS;
      let foreignCallableSetPrototypeOf$LWS;
      let foreignCallableDebugInfo$LWS;
      let foreignCallableGetPropertyValue$LWS;
      let foreignCallableGetLazyPropertyDescriptorStateByTarget$LWS;
      let foreignCallableGetTargetIntegrityTraits$LWS;
      let foreignCallableGetToStringTagOfTarget$LWS;
      let foreignCallableInstallErrorPrepareStackTrace$LWS;
      let foreignCallableIsTargetLive$LWS;
      let foreignCallableIsTargetRevoked$LWS;
      let foreignCallableSerializeTarget$LWS;
      let foreignCallableSetLazyPropertyDescriptorStateByTarget$LWS;
      let foreignCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors$LWS;
      let foreignCallableBatchGetPrototypeOfWhenHasNoOwnProperty$LWS;
      let foreignCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor$LWS;
      let fastForeignTargetPointers$LWS;
      let foreignPointerBigInt64ArrayProto$LWS;
      let foreignPointerBigUint64ArrayProto$LWS;
      let foreignPointerFloat32ArrayProto$LWS;
      let foreignPointerFloat64ArrayProto$LWS;
      let foreignPointerInt8ArrayProto$LWS;
      let foreignPointerInt16ArrayProto$LWS;
      let foreignPointerInt32ArrayProto$LWS;
      let foreignPointerObjectProto$LWS;
      let foreignPointerTypedArrayProto$LWS;
      let foreignPointerUint8ArrayProto$LWS;
      let foreignPointerUint16ArrayProto$LWS;
      let foreignPointerUint32ArrayProto$LWS;
      let selectedTarget$LWS;
      let lastProxyTrapCalled$LWS = 0;
      let handshakePropertyFlag$LWS = false;
      let useFastForeignTargetPath$LWS = IS_IN_SHADOW_REALM$LWS;
      let useFastForeignTargetPathForTypedArrays$LWS = IS_IN_SHADOW_REALM$LWS;
      const activateLazyOwnPropertyDefinition$LWS = IS_IN_SHADOW_REALM$LWS ? (target$LWS, key$LWS, state$LWS) => {
        state$LWS[key$LWS] = false;
        const foreignTargetPointer$LWS = getTransferablePointer$LWS(target$LWS);
        let safeDesc$LWS;
        try {
          foreignCallableGetOwnPropertyDescriptor$LWS(foreignTargetPointer$LWS, key$LWS, (_key$LWS, configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS) => {
            safeDesc$LWS = createDescriptorFromMeta$LWS(configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS);
          });
        } catch (error) {
          var _selectedTarget$LWS;
          const errorToThrow$LWS = (_selectedTarget$LWS = selectedTarget$LWS) != null ? _selectedTarget$LWS : error;
          selectedTarget$LWS = void 0;
          throw errorToThrow$LWS;
        }
        if (safeDesc$LWS) {
          ReflectDefineProperty$LWS2(target$LWS, key$LWS, safeDesc$LWS);
        } else {
          ReflectDeleteProperty$LWS2(target$LWS, key$LWS);
        }
      } : noop$LWS2;
      let checkDebugMode$LWS = LOCKER_DEBUGGABLE_FLAG$LWS ? () => {
        try {
          if (ObjectHasOwn$LWS2(globalThisRef$LWS, LOCKER_DEBUG_MODE_SYMBOL$LWS)) {
            checkDebugMode$LWS = () => true;
            installErrorPrepareStackTrace$LWS();
            foreignCallableInstallErrorPrepareStackTrace$LWS();
          }
        } catch (_unused15$LWS) {
          checkDebugMode$LWS = alwaysFalse$LWS;
        }
        return false;
      } : alwaysFalse$LWS;
      const clearFastForeignTargetPointers$LWS = IS_IN_SHADOW_REALM$LWS ? () => {
        fastForeignTargetPointers$LWS = toSafeWeakSet$LWS2(new WeakSetCtor$LWS2());
      } : noop$LWS2;
      function copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget$LWS(foreignTargetPointer$LWS, shadowTarget$LWS) {
        let protoPointerOrNull$LWS;
        try {
          protoPointerOrNull$LWS = foreignCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors$LWS(foreignTargetPointer$LWS, (...descriptorTuples$LWS) => {
            const descriptors$LWS = {};
            for (let i$LWS = 0, {
              length: length$LWS2
            } = descriptorTuples$LWS; i$LWS < length$LWS2; i$LWS += 7) {
              const key$LWS = descriptorTuples$LWS[i$LWS];
              descriptors$LWS[key$LWS] = createDescriptorFromMeta$LWS(descriptorTuples$LWS[i$LWS + 1], descriptorTuples$LWS[i$LWS + 2], descriptorTuples$LWS[i$LWS + 3], descriptorTuples$LWS[i$LWS + 4], descriptorTuples$LWS[i$LWS + 5], descriptorTuples$LWS[i$LWS + 6]);
            }
            ObjectDefineProperties$LWS2(shadowTarget$LWS, descriptors$LWS);
          });
        } catch (error) {
          var _selectedTarget2$LWS;
          const errorToThrow$LWS = (_selectedTarget2$LWS = selectedTarget$LWS) != null ? _selectedTarget2$LWS : error;
          selectedTarget$LWS = void 0;
          throw errorToThrow$LWS;
        }
        let proto$LWS;
        if (typeof protoPointerOrNull$LWS === "function") {
          protoPointerOrNull$LWS();
          proto$LWS = selectedTarget$LWS;
          selectedTarget$LWS = void 0;
        } else {
          proto$LWS = null;
        }
        ReflectSetPrototypeOf$LWS2(shadowTarget$LWS, proto$LWS);
      }
      function createApplyOrConstructTrapForZeroOrMoreArgs$LWS(proxyTrapEnum$LWS) {
        const isApplyTrap$LWS = proxyTrapEnum$LWS & 1;
        const arityToApplyOrConstructTrapNameRegistry$LWS = isApplyTrap$LWS ? applyTrapNameRegistry$LWS : constructTrapNameRegistry$LWS;
        const foreignCallableApplyOrConstruct$LWS = isApplyTrap$LWS ? foreignCallableApply$LWS : foreignCallableConstruct$LWS;
        return function applyOrConstructTrap$LWS(_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS) {
          lastProxyTrapCalled$LWS = proxyTrapEnum$LWS;
          const args$LWS = isApplyTrap$LWS ? argsOrNewTarget$LWS : thisArgOrArgs$LWS;
          const {
            length: length$LWS2
          } = args$LWS;
          if (length$LWS2 !== 0) {
            var _arityToApplyOrConstr$LWS;
            return this[(_arityToApplyOrConstr$LWS = arityToApplyOrConstructTrapNameRegistry$LWS[length$LWS2]) != null ? _arityToApplyOrConstr$LWS : arityToApplyOrConstructTrapNameRegistry$LWS.n](_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS);
          }
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const thisArgOrNewTarget$LWS = isApplyTrap$LWS ? thisArgOrArgs$LWS : argsOrNewTarget$LWS;
          let pointerOrPrimitive$LWS;
          try {
            pointerOrPrimitive$LWS = foreignCallableApplyOrConstruct$LWS(foreignTargetPointer$LWS, typeof thisArgOrNewTarget$LWS === "object" && thisArgOrNewTarget$LWS !== null || typeof thisArgOrNewTarget$LWS === "function" ? getTransferablePointer$LWS(thisArgOrNewTarget$LWS) : typeof thisArgOrNewTarget$LWS === "undefined" ? void 0 : thisArgOrNewTarget$LWS);
          } catch (error) {
            var _selectedTarget3$LWS;
            const errorToThrow$LWS = (_selectedTarget3$LWS = selectedTarget$LWS) != null ? _selectedTarget3$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let result$LWS;
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
          return result$LWS;
        };
      }
      function createApplyOrConstructTrapForOneOrMoreArgs$LWS(proxyTrapEnum$LWS) {
        const isApplyTrap$LWS = proxyTrapEnum$LWS & 1;
        const arityToApplyOrConstructTrapNameRegistry$LWS = isApplyTrap$LWS ? applyTrapNameRegistry$LWS : constructTrapNameRegistry$LWS;
        const foreignCallableApplyOrConstruct$LWS = isApplyTrap$LWS ? foreignCallableApply$LWS : foreignCallableConstruct$LWS;
        return function applyOrConstructTrapForOneOrMoreArgs$LWS(_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS) {
          lastProxyTrapCalled$LWS = proxyTrapEnum$LWS;
          const args$LWS = isApplyTrap$LWS ? argsOrNewTarget$LWS : thisArgOrArgs$LWS;
          const {
            length: length$LWS2
          } = args$LWS;
          if (length$LWS2 !== 1) {
            var _arityToApplyOrConstr2$LWS;
            return this[(_arityToApplyOrConstr2$LWS = arityToApplyOrConstructTrapNameRegistry$LWS[length$LWS2]) != null ? _arityToApplyOrConstr2$LWS : arityToApplyOrConstructTrapNameRegistry$LWS.n](_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS);
          }
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const thisArgOrNewTarget$LWS = isApplyTrap$LWS ? thisArgOrArgs$LWS : argsOrNewTarget$LWS;
          let pointerOrPrimitive$LWS;
          try {
            const {
              0: arg0$LWS
            } = args$LWS;
            pointerOrPrimitive$LWS = foreignCallableApplyOrConstruct$LWS(foreignTargetPointer$LWS, typeof thisArgOrNewTarget$LWS === "object" && thisArgOrNewTarget$LWS !== null || typeof thisArgOrNewTarget$LWS === "function" ? getTransferablePointer$LWS(thisArgOrNewTarget$LWS) : typeof thisArgOrNewTarget$LWS === "undefined" ? void 0 : thisArgOrNewTarget$LWS, typeof arg0$LWS === "object" && arg0$LWS !== null || typeof arg0$LWS === "function" ? getTransferablePointer$LWS(arg0$LWS) : typeof arg0$LWS === "undefined" ? void 0 : arg0$LWS);
          } catch (error) {
            var _selectedTarget4$LWS;
            const errorToThrow$LWS = (_selectedTarget4$LWS = selectedTarget$LWS) != null ? _selectedTarget4$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let result$LWS;
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
          return result$LWS;
        };
      }
      function createApplyOrConstructTrapForTwoOrMoreArgs$LWS(proxyTrapEnum$LWS) {
        const isApplyTrap$LWS = proxyTrapEnum$LWS & 1;
        const arityToApplyOrConstructTrapNameRegistry$LWS = isApplyTrap$LWS ? applyTrapNameRegistry$LWS : constructTrapNameRegistry$LWS;
        const foreignCallableApplyOrConstruct$LWS = isApplyTrap$LWS ? foreignCallableApply$LWS : foreignCallableConstruct$LWS;
        return function applyOrConstructTrapForTwoOrMoreArgs$LWS(_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS) {
          lastProxyTrapCalled$LWS = proxyTrapEnum$LWS;
          const args$LWS = isApplyTrap$LWS ? argsOrNewTarget$LWS : thisArgOrArgs$LWS;
          const {
            length: length$LWS2
          } = args$LWS;
          if (length$LWS2 !== 2) {
            var _arityToApplyOrConstr3$LWS;
            return this[(_arityToApplyOrConstr3$LWS = arityToApplyOrConstructTrapNameRegistry$LWS[length$LWS2]) != null ? _arityToApplyOrConstr3$LWS : arityToApplyOrConstructTrapNameRegistry$LWS.n](_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS);
          }
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const thisArgOrNewTarget$LWS = isApplyTrap$LWS ? thisArgOrArgs$LWS : argsOrNewTarget$LWS;
          let pointerOrPrimitive$LWS;
          try {
            const {
              0: arg0$LWS,
              1: arg1$LWS
            } = args$LWS;
            pointerOrPrimitive$LWS = foreignCallableApplyOrConstruct$LWS(foreignTargetPointer$LWS, typeof thisArgOrNewTarget$LWS === "object" && thisArgOrNewTarget$LWS !== null || typeof thisArgOrNewTarget$LWS === "function" ? getTransferablePointer$LWS(thisArgOrNewTarget$LWS) : typeof thisArgOrNewTarget$LWS === "undefined" ? void 0 : thisArgOrNewTarget$LWS, typeof arg0$LWS === "object" && arg0$LWS !== null || typeof arg0$LWS === "function" ? getTransferablePointer$LWS(arg0$LWS) : typeof arg0$LWS === "undefined" ? void 0 : arg0$LWS, typeof arg1$LWS === "object" && arg1$LWS !== null || typeof arg1$LWS === "function" ? getTransferablePointer$LWS(arg1$LWS) : typeof arg1$LWS === "undefined" ? void 0 : arg1$LWS);
          } catch (error) {
            var _selectedTarget5$LWS;
            const errorToThrow$LWS = (_selectedTarget5$LWS = selectedTarget$LWS) != null ? _selectedTarget5$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let result$LWS;
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
          return result$LWS;
        };
      }
      function createApplyOrConstructTrapForThreeOrMoreArgs$LWS(proxyTrapEnum$LWS) {
        const isApplyTrap$LWS = proxyTrapEnum$LWS & 1;
        const arityToApplyOrConstructTrapNameRegistry$LWS = isApplyTrap$LWS ? applyTrapNameRegistry$LWS : constructTrapNameRegistry$LWS;
        const foreignCallableApplyOrConstruct$LWS = isApplyTrap$LWS ? foreignCallableApply$LWS : foreignCallableConstruct$LWS;
        return function applyOrConstructTrapForTwoOrMoreArgs$LWS(_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS) {
          lastProxyTrapCalled$LWS = proxyTrapEnum$LWS;
          const args$LWS = isApplyTrap$LWS ? argsOrNewTarget$LWS : thisArgOrArgs$LWS;
          const {
            length: length$LWS2
          } = args$LWS;
          if (length$LWS2 !== 3) {
            var _arityToApplyOrConstr4$LWS;
            return this[(_arityToApplyOrConstr4$LWS = arityToApplyOrConstructTrapNameRegistry$LWS[length$LWS2]) != null ? _arityToApplyOrConstr4$LWS : arityToApplyOrConstructTrapNameRegistry$LWS.n](_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS);
          }
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const thisArgOrNewTarget$LWS = isApplyTrap$LWS ? thisArgOrArgs$LWS : argsOrNewTarget$LWS;
          let pointerOrPrimitive$LWS;
          try {
            const {
              0: arg0$LWS,
              1: arg1$LWS,
              2: arg2$LWS
            } = args$LWS;
            pointerOrPrimitive$LWS = foreignCallableApplyOrConstruct$LWS(foreignTargetPointer$LWS, typeof thisArgOrNewTarget$LWS === "object" && thisArgOrNewTarget$LWS !== null || typeof thisArgOrNewTarget$LWS === "function" ? getTransferablePointer$LWS(thisArgOrNewTarget$LWS) : typeof thisArgOrNewTarget$LWS === "undefined" ? void 0 : thisArgOrNewTarget$LWS, typeof arg0$LWS === "object" && arg0$LWS !== null || typeof arg0$LWS === "function" ? getTransferablePointer$LWS(arg0$LWS) : typeof arg0$LWS === "undefined" ? void 0 : arg0$LWS, typeof arg1$LWS === "object" && arg1$LWS !== null || typeof arg1$LWS === "function" ? getTransferablePointer$LWS(arg1$LWS) : typeof arg1$LWS === "undefined" ? void 0 : arg1$LWS, typeof arg2$LWS === "object" && arg2$LWS !== null || typeof arg2$LWS === "function" ? getTransferablePointer$LWS(arg2$LWS) : typeof arg2$LWS === "undefined" ? void 0 : arg2$LWS);
          } catch (error) {
            var _selectedTarget6$LWS;
            const errorToThrow$LWS = (_selectedTarget6$LWS = selectedTarget$LWS) != null ? _selectedTarget6$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let result$LWS;
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
          return result$LWS;
        };
      }
      function createApplyOrConstructTrapForFourOrMoreArgs$LWS(proxyTrapEnum$LWS) {
        const isApplyTrap$LWS = proxyTrapEnum$LWS & 1;
        const arityToApplyOrConstructTrapNameRegistry$LWS = isApplyTrap$LWS ? applyTrapNameRegistry$LWS : constructTrapNameRegistry$LWS;
        const foreignCallableApplyOrConstruct$LWS = isApplyTrap$LWS ? foreignCallableApply$LWS : foreignCallableConstruct$LWS;
        return function applyOrConstructTrapForTwoOrMoreArgs$LWS(_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS) {
          lastProxyTrapCalled$LWS = proxyTrapEnum$LWS;
          const args$LWS = isApplyTrap$LWS ? argsOrNewTarget$LWS : thisArgOrArgs$LWS;
          const {
            length: length$LWS2
          } = args$LWS;
          if (length$LWS2 !== 4) {
            var _arityToApplyOrConstr5$LWS;
            return this[(_arityToApplyOrConstr5$LWS = arityToApplyOrConstructTrapNameRegistry$LWS[length$LWS2]) != null ? _arityToApplyOrConstr5$LWS : arityToApplyOrConstructTrapNameRegistry$LWS.n](_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS);
          }
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const thisArgOrNewTarget$LWS = isApplyTrap$LWS ? thisArgOrArgs$LWS : argsOrNewTarget$LWS;
          let pointerOrPrimitive$LWS;
          try {
            const {
              0: arg0$LWS,
              1: arg1$LWS,
              2: arg2$LWS,
              3: arg3$LWS
            } = args$LWS;
            pointerOrPrimitive$LWS = foreignCallableApplyOrConstruct$LWS(foreignTargetPointer$LWS, typeof thisArgOrNewTarget$LWS === "object" && thisArgOrNewTarget$LWS !== null || typeof thisArgOrNewTarget$LWS === "function" ? getTransferablePointer$LWS(thisArgOrNewTarget$LWS) : typeof thisArgOrNewTarget$LWS === "undefined" ? void 0 : thisArgOrNewTarget$LWS, typeof arg0$LWS === "object" && arg0$LWS !== null || typeof arg0$LWS === "function" ? getTransferablePointer$LWS(arg0$LWS) : typeof arg0$LWS === "undefined" ? void 0 : arg0$LWS, typeof arg1$LWS === "object" && arg1$LWS !== null || typeof arg1$LWS === "function" ? getTransferablePointer$LWS(arg1$LWS) : typeof arg1$LWS === "undefined" ? void 0 : arg1$LWS, typeof arg2$LWS === "object" && arg2$LWS !== null || typeof arg2$LWS === "function" ? getTransferablePointer$LWS(arg2$LWS) : typeof arg2$LWS === "undefined" ? void 0 : arg2$LWS, typeof arg3$LWS === "object" && arg3$LWS !== null || typeof arg3$LWS === "function" ? getTransferablePointer$LWS(arg3$LWS) : typeof arg3$LWS === "undefined" ? void 0 : arg3$LWS);
          } catch (error) {
            var _selectedTarget7$LWS;
            const errorToThrow$LWS = (_selectedTarget7$LWS = selectedTarget$LWS) != null ? _selectedTarget7$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let result$LWS;
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
          return result$LWS;
        };
      }
      function createApplyOrConstructTrapForFiveOrMoreArgs$LWS(proxyTrapEnum$LWS) {
        const isApplyTrap$LWS = proxyTrapEnum$LWS & 1;
        const arityToApplyOrConstructTrapNameRegistry$LWS = isApplyTrap$LWS ? applyTrapNameRegistry$LWS : constructTrapNameRegistry$LWS;
        const foreignCallableApplyOrConstruct$LWS = isApplyTrap$LWS ? foreignCallableApply$LWS : foreignCallableConstruct$LWS;
        return function applyOrConstructTrapForTwoOrMoreArgs$LWS(_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS) {
          lastProxyTrapCalled$LWS = proxyTrapEnum$LWS;
          const args$LWS = isApplyTrap$LWS ? argsOrNewTarget$LWS : thisArgOrArgs$LWS;
          const {
            length: length$LWS2
          } = args$LWS;
          if (length$LWS2 !== 5) {
            var _arityToApplyOrConstr6$LWS;
            return this[(_arityToApplyOrConstr6$LWS = arityToApplyOrConstructTrapNameRegistry$LWS[length$LWS2]) != null ? _arityToApplyOrConstr6$LWS : arityToApplyOrConstructTrapNameRegistry$LWS.n](_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS);
          }
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const thisArgOrNewTarget$LWS = isApplyTrap$LWS ? thisArgOrArgs$LWS : argsOrNewTarget$LWS;
          let pointerOrPrimitive$LWS;
          try {
            const {
              0: arg0$LWS,
              1: arg1$LWS,
              2: arg2$LWS,
              3: arg3$LWS,
              4: arg4$LWS
            } = args$LWS;
            pointerOrPrimitive$LWS = foreignCallableApplyOrConstruct$LWS(foreignTargetPointer$LWS, typeof thisArgOrNewTarget$LWS === "object" && thisArgOrNewTarget$LWS !== null || typeof thisArgOrNewTarget$LWS === "function" ? getTransferablePointer$LWS(thisArgOrNewTarget$LWS) : typeof thisArgOrNewTarget$LWS === "undefined" ? void 0 : thisArgOrNewTarget$LWS, typeof arg0$LWS === "object" && arg0$LWS !== null || typeof arg0$LWS === "function" ? getTransferablePointer$LWS(arg0$LWS) : typeof arg0$LWS === "undefined" ? void 0 : arg0$LWS, typeof arg1$LWS === "object" && arg1$LWS !== null || typeof arg1$LWS === "function" ? getTransferablePointer$LWS(arg1$LWS) : typeof arg1$LWS === "undefined" ? void 0 : arg1$LWS, typeof arg2$LWS === "object" && arg2$LWS !== null || typeof arg2$LWS === "function" ? getTransferablePointer$LWS(arg2$LWS) : typeof arg2$LWS === "undefined" ? void 0 : arg2$LWS, typeof arg3$LWS === "object" && arg3$LWS !== null || typeof arg3$LWS === "function" ? getTransferablePointer$LWS(arg3$LWS) : typeof arg3$LWS === "undefined" ? void 0 : arg3$LWS, typeof arg4$LWS === "object" && arg4$LWS !== null || typeof arg4$LWS === "function" ? getTransferablePointer$LWS(arg4$LWS) : typeof arg4$LWS === "undefined" ? void 0 : arg4$LWS);
          } catch (error) {
            var _selectedTarget8$LWS;
            const errorToThrow$LWS = (_selectedTarget8$LWS = selectedTarget$LWS) != null ? _selectedTarget8$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let result$LWS;
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
          return result$LWS;
        };
      }
      function createApplyOrConstructTrapForAnyNumberOfArgs$LWS(proxyTrapEnum$LWS) {
        const isApplyTrap$LWS = proxyTrapEnum$LWS & 1;
        const foreignCallableApplyOrConstruct$LWS = isApplyTrap$LWS ? foreignCallableApply$LWS : foreignCallableConstruct$LWS;
        return function applyOrConstructTrapForAnyNumberOfArgs$LWS(_shadowTarget$LWS, thisArgOrArgs$LWS, argsOrNewTarget$LWS) {
          lastProxyTrapCalled$LWS = proxyTrapEnum$LWS;
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const args$LWS = isApplyTrap$LWS ? argsOrNewTarget$LWS : thisArgOrArgs$LWS;
          const {
            length: length$LWS2
          } = args$LWS;
          const thisArgOrNewTarget$LWS = isApplyTrap$LWS ? thisArgOrArgs$LWS : argsOrNewTarget$LWS;
          let combinedOffset$LWS = 2;
          const combinedArgs$LWS = new ArrayCtor$LWS2(length$LWS2 + combinedOffset$LWS);
          combinedArgs$LWS[0] = foreignTargetPointer$LWS;
          let pointerOrPrimitive$LWS;
          try {
            combinedArgs$LWS[1] = typeof thisArgOrNewTarget$LWS === "object" && thisArgOrNewTarget$LWS !== null || typeof thisArgOrNewTarget$LWS === "function" ? getTransferablePointer$LWS(thisArgOrNewTarget$LWS) : typeof thisArgOrNewTarget$LWS === "undefined" ? void 0 : thisArgOrNewTarget$LWS;
            for (let i$LWS = 0; i$LWS < length$LWS2; i$LWS += 1) {
              const arg$LWS = args$LWS[i$LWS];
              combinedArgs$LWS[combinedOffset$LWS++] = typeof arg$LWS === "object" && arg$LWS !== null || typeof arg$LWS === "function" ? getTransferablePointer$LWS(arg$LWS) : typeof arg$LWS === "undefined" ? void 0 : arg$LWS;
            }
            pointerOrPrimitive$LWS = ReflectApply$LWS2(foreignCallableApplyOrConstruct$LWS, void 0, combinedArgs$LWS);
          } catch (error) {
            var _selectedTarget9$LWS;
            const errorToThrow$LWS = (_selectedTarget9$LWS = selectedTarget$LWS) != null ? _selectedTarget9$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let result$LWS;
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
          return result$LWS;
        };
      }
      function createDescriptorFromMeta$LWS(configurable$LWS, enumerable$LWS, writable$LWS, valuePointerOrPrimitive$LWS, getterPointerOrPrimitive$LWS, setterPointerOrPrimitive$LWS) {
        const safeDesc$LWS = {
          __proto__: null
        };
        if (configurable$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
          safeDesc$LWS.configurable = configurable$LWS;
        }
        if (enumerable$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
          safeDesc$LWS.enumerable = enumerable$LWS;
        }
        if (writable$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
          safeDesc$LWS.writable = writable$LWS;
        }
        if (getterPointerOrPrimitive$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
          if (typeof getterPointerOrPrimitive$LWS === "function") {
            getterPointerOrPrimitive$LWS();
            safeDesc$LWS.get = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            safeDesc$LWS.get = void 0;
          }
        }
        if (setterPointerOrPrimitive$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
          if (typeof setterPointerOrPrimitive$LWS === "function") {
            setterPointerOrPrimitive$LWS();
            safeDesc$LWS.set = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            safeDesc$LWS.set = void 0;
          }
        }
        if (valuePointerOrPrimitive$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
          if (typeof valuePointerOrPrimitive$LWS === "function") {
            valuePointerOrPrimitive$LWS();
            safeDesc$LWS.value = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            safeDesc$LWS.value = valuePointerOrPrimitive$LWS;
          }
        }
        return safeDesc$LWS;
      }
      function createPointer$LWS(originalTarget$LWS) {
        const pointer$LWS = () => {
          selectedTarget$LWS = originalTarget$LWS;
        };
        return pointer$LWS;
      }
      const disableFastForeignTargetPointers$LWS = IS_IN_SHADOW_REALM$LWS ? () => {
        useFastForeignTargetPath$LWS = false;
        useFastForeignTargetPathForTypedArrays$LWS = false;
        clearFastForeignTargetPointers$LWS();
      } : noop$LWS2;
      const getLazyPropertyDescriptorStateByTarget$LWS = IS_IN_SHADOW_REALM$LWS ? (target$LWS) => {
        let state$LWS = lazyPropertyDescriptorStateCache$LWS.get(target$LWS);
        if (state$LWS === void 0) {
          const statePointerOrUndefined$LWS = foreignCallableGetLazyPropertyDescriptorStateByTarget$LWS(getTransferablePointer$LWS(target$LWS));
          if (typeof statePointerOrUndefined$LWS === "function") {
            statePointerOrUndefined$LWS();
            state$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
            if (state$LWS) {
              lazyPropertyDescriptorStateCache$LWS.set(target$LWS, state$LWS);
            }
          }
        }
        return state$LWS;
      } : noop$LWS2;
      const isForeignPointerOfObjectProto$LWS = IS_IN_SHADOW_REALM$LWS ? (foreignTargetPointer$LWS) => foreignTargetPointer$LWS === (foreignPointerObjectProto$LWS === void 0 ? foreignPointerObjectProto$LWS = getTransferablePointer$LWS(ObjectProto$LWS2) : foreignPointerObjectProto$LWS) : alwaysFalse$LWS;
      const isForeignPointerOfTypedArrayProto$LWS = IS_IN_SHADOW_REALM$LWS ? (foreignTargetPointer$LWS) => foreignTargetPointer$LWS === (foreignPointerFloat32ArrayProto$LWS === void 0 ? foreignPointerFloat32ArrayProto$LWS = getTransferablePointer$LWS(Float32ArrayProto$LWS) : foreignPointerFloat32ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerFloat64ArrayProto$LWS === void 0 ? foreignPointerFloat64ArrayProto$LWS = getTransferablePointer$LWS(Float64ArrayProto$LWS) : foreignPointerFloat64ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerInt8ArrayProto$LWS === void 0 ? foreignPointerInt8ArrayProto$LWS = getTransferablePointer$LWS(Int8ArrayProto$LWS) : foreignPointerInt8ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerInt16ArrayProto$LWS === void 0 ? foreignPointerInt16ArrayProto$LWS = getTransferablePointer$LWS(Int16ArrayProto$LWS) : foreignPointerInt16ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerInt32ArrayProto$LWS === void 0 ? foreignPointerInt32ArrayProto$LWS = getTransferablePointer$LWS(Int32ArrayProto$LWS) : foreignPointerInt32ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerUint8ArrayProto$LWS === void 0 ? foreignPointerUint8ArrayProto$LWS = getTransferablePointer$LWS(Uint8ArrayProto$LWS) : foreignPointerUint8ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerUint16ArrayProto$LWS === void 0 ? foreignPointerUint16ArrayProto$LWS = getTransferablePointer$LWS(Uint16ArrayProto$LWS) : foreignPointerUint16ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerUint32ArrayProto$LWS === void 0 ? foreignPointerUint32ArrayProto$LWS = getTransferablePointer$LWS(Uint32ArrayProto$LWS) : foreignPointerUint32ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerTypedArrayProto$LWS === void 0 ? foreignPointerTypedArrayProto$LWS = getTransferablePointer$LWS(TypedArrayProto$LWS) : foreignPointerTypedArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerBigInt64ArrayProto$LWS === void 0 ? foreignPointerBigInt64ArrayProto$LWS = BigInt64ArrayProto$LWS ? getTransferablePointer$LWS(BigInt64ArrayProto$LWS) : noop$LWS2 : foreignPointerBigInt64ArrayProto$LWS) || foreignTargetPointer$LWS === (foreignPointerBigUint64ArrayProto$LWS === void 0 ? foreignPointerBigUint64ArrayProto$LWS = BigUint64ArrayProto$LWS ? getTransferablePointer$LWS(BigUint64ArrayProto$LWS) : noop$LWS2 : foreignPointerBigUint64ArrayProto$LWS) : alwaysFalse$LWS;
      function getTransferablePointer$LWS(originalTarget$LWS, foreignCallablePusher$LWS = foreignCallablePushTarget$LWS) {
        let proxyPointer$LWS = proxyPointerCache$LWS.get(originalTarget$LWS);
        if (proxyPointer$LWS) {
          return proxyPointer$LWS;
        }
        let targetFunctionArity$LWS = 0;
        let targetFunctionName$LWS = "";
        let targetTypedArrayLength$LWS = 0;
        if (revokedProxyCallback$LWS2 && revokedProxyCallback$LWS2(originalTarget$LWS)) {
          proxyPointer$LWS = foreignCallablePusher$LWS(createPointer$LWS(originalTarget$LWS), 64, targetFunctionArity$LWS, targetFunctionName$LWS, targetTypedArrayLength$LWS);
          proxyPointerCache$LWS.set(originalTarget$LWS, proxyPointer$LWS);
          return proxyPointer$LWS;
        }
        let distortionTarget$LWS;
        let targetTraits$LWS = 16;
        if (distortionCallback$LWS) {
          distortionTarget$LWS = distortionCallback$LWS(originalTarget$LWS);
          if (distortionTarget$LWS !== originalTarget$LWS && typeof distortionTarget$LWS !== typeof originalTarget$LWS) {
            throw new TypeErrorCtor$LWS2(`Invalid distortion ${toSafeTemplateStringValue$LWS2(originalTarget$LWS)}.`);
          }
        } else {
          distortionTarget$LWS = originalTarget$LWS;
        }
        let isPossiblyRevoked$LWS = true;
        if (typeof distortionTarget$LWS === "function") {
          isPossiblyRevoked$LWS = false;
          targetFunctionArity$LWS = 0;
          targetTraits$LWS = 4;
          try {
            if (!("prototype" in distortionTarget$LWS)) {
              targetTraits$LWS |= 8;
            }
            const safeLengthDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS2(originalTarget$LWS, "length");
            if (safeLengthDesc$LWS) {
              ReflectSetPrototypeOf$LWS2(safeLengthDesc$LWS, null);
              const {
                value: safeLengthDescValue$LWS
              } = safeLengthDesc$LWS;
              if (typeof safeLengthDescValue$LWS === "number") {
                targetFunctionArity$LWS = safeLengthDescValue$LWS;
              }
            }
            const safeNameDesc$LWS = false ? ReflectGetOwnPropertyDescriptor$LWS2(originalTarget$LWS, "name") : void 0;
            if (safeNameDesc$LWS)
              ;
          } catch (_unused16$LWS) {
            isPossiblyRevoked$LWS = true;
          }
        } else if (ArrayBufferIsView$LWS2(distortionTarget$LWS)) {
          isPossiblyRevoked$LWS = false;
          targetTraits$LWS = 2;
          try {
            targetTypedArrayLength$LWS = ReflectApply$LWS2(TypedArrayProtoLengthGetter$LWS, distortionTarget$LWS, []);
            targetTraits$LWS |= 32;
          } catch (_unused17$LWS) {
            isPossiblyRevoked$LWS = true;
          }
        }
        if (isPossiblyRevoked$LWS) {
          try {
            if (isArrayOrThrowForRevoked$LWS(distortionTarget$LWS)) {
              targetTraits$LWS = 1;
            }
          } catch (_unused18$LWS) {
            targetTraits$LWS = 64;
          }
        }
        proxyPointer$LWS = foreignCallablePusher$LWS(createPointer$LWS(distortionTarget$LWS), targetTraits$LWS, targetFunctionArity$LWS, targetFunctionName$LWS, targetTypedArrayLength$LWS);
        proxyPointerCache$LWS.set(originalTarget$LWS, proxyPointer$LWS);
        return proxyPointer$LWS;
      }
      const installPropertyDescriptorMethodWrappers$LWS = IS_IN_SHADOW_REALM$LWS ? (unforgeableGlobalThisKeys$LWS) => {
        if (installedPropertyDescriptorMethodWrappersFlag$LWS) {
          return;
        }
        installedPropertyDescriptorMethodWrappersFlag$LWS = true;
        const shouldFixChromeBug$LWS = isArrayOrThrowForRevoked$LWS(unforgeableGlobalThisKeys$LWS) && unforgeableGlobalThisKeys$LWS.length > 0;
        const keyToGlobalThisGetterRegistry$LWS = shouldFixChromeBug$LWS ? {
          __proto__: null
        } : void 0;
        const getFixedDescriptor$LWS = shouldFixChromeBug$LWS ? (target$LWS, key$LWS) => ReflectApply$LWS2(ArrayProtoIncludes$LWS2, unforgeableGlobalThisKeys$LWS, [key$LWS]) ? {
          configurable: false,
          enumerable: ReflectApply$LWS2(ObjectProtoPropertyIsEnumerable$LWS, target$LWS, [key$LWS]),
          get: getUnforgeableGlobalThisGetter$LWS(key$LWS),
          set: void 0
        } : ReflectGetOwnPropertyDescriptor$LWS2(target$LWS, key$LWS) : void 0;
        const getUnforgeableGlobalThisGetter$LWS = shouldFixChromeBug$LWS ? (key$LWS) => {
          let globalThisGetter$LWS = keyToGlobalThisGetterRegistry$LWS[key$LWS];
          if (globalThisGetter$LWS === void 0) {
            globalThisGetter$LWS = ReflectApply$LWS2(FunctionProtoBind$LWS2, unboundGlobalThisGetter$LWS, []);
            keyToGlobalThisGetterRegistry$LWS[key$LWS] = globalThisGetter$LWS;
          }
          return globalThisGetter$LWS;
        } : void 0;
        const lookupFixedGetter$LWS = shouldFixChromeBug$LWS ? (target$LWS, key$LWS) => ReflectApply$LWS2(ArrayProtoIncludes$LWS2, unforgeableGlobalThisKeys$LWS, [key$LWS]) ? getUnforgeableGlobalThisGetter$LWS(key$LWS) : ReflectApply$LWS2(ObjectProtoLookupGetter$LWS2, target$LWS, [key$LWS]) : void 0;
        const lookupFixedSetter$LWS = shouldFixChromeBug$LWS ? (target$LWS, key$LWS) => ReflectApply$LWS2(ArrayProtoIncludes$LWS2, unforgeableGlobalThisKeys$LWS, [key$LWS]) ? void 0 : ReflectApply$LWS2(ObjectProtoLookupSetter$LWS2, target$LWS, [key$LWS]) : void 0;
        const unboundGlobalThisGetter$LWS = shouldFixChromeBug$LWS ? () => globalThisRef$LWS : void 0;
        const wrapDefineAccessOrProperty$LWS = (originalFunc$LWS) => {
          const {
            length: originalFuncLength$LWS
          } = originalFunc$LWS;
          const useThisArgAsTarget$LWS = originalFuncLength$LWS === 2;
          return new ProxyCtor$LWS2(originalFunc$LWS, {
            apply(_originalFunc$LWS, thisArg$LWS, args$LWS) {
              if (args$LWS.length >= originalFuncLength$LWS) {
                const target$LWS = useThisArgAsTarget$LWS ? thisArg$LWS : args$LWS[0];
                if (typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function") {
                  const key$LWS = useThisArgAsTarget$LWS ? args$LWS[0] : args$LWS[1];
                  const state$LWS = getLazyPropertyDescriptorStateByTarget$LWS(target$LWS);
                  if (state$LWS != null && state$LWS[key$LWS]) {
                    target$LWS[key$LWS];
                  }
                }
              }
              return ReflectApply$LWS2(originalFunc$LWS, thisArg$LWS, args$LWS);
            }
          });
        };
        const wrapLookupAccessor$LWS = (originalFunc$LWS, lookupFixedAccessor$LWS) => new ProxyCtor$LWS2(originalFunc$LWS, {
          apply(_originalFunc$LWS, thisArg$LWS, args$LWS) {
            if (args$LWS.length && (typeof thisArg$LWS === "object" && thisArg$LWS !== null || typeof thisArg$LWS === "function")) {
              const {
                0: key$LWS
              } = args$LWS;
              const state$LWS = getLazyPropertyDescriptorStateByTarget$LWS(thisArg$LWS);
              if (state$LWS != null && state$LWS[key$LWS]) {
                thisArg$LWS[key$LWS];
              }
              if (shouldFixChromeBug$LWS && thisArg$LWS === globalThisRef$LWS) {
                return lookupFixedAccessor$LWS(thisArg$LWS, key$LWS);
              }
            }
            return ReflectApply$LWS2(originalFunc$LWS, thisArg$LWS, args$LWS);
          }
        });
        const wrapGetOwnPropertyDescriptor$LWS = (originalFunc$LWS) => new ProxyCtor$LWS2(originalFunc$LWS, {
          apply(_originalFunc$LWS, thisArg$LWS, args$LWS) {
            if (args$LWS.length > 1) {
              const {
                0: target$LWS,
                1: key$LWS
              } = args$LWS;
              if (typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function") {
                const state$LWS = getLazyPropertyDescriptorStateByTarget$LWS(target$LWS);
                if (state$LWS != null && state$LWS[key$LWS]) {
                  target$LWS[key$LWS];
                }
                if (shouldFixChromeBug$LWS && target$LWS === globalThisRef$LWS) {
                  return getFixedDescriptor$LWS(target$LWS, key$LWS);
                }
              }
            }
            return ReflectApply$LWS2(originalFunc$LWS, thisArg$LWS, args$LWS);
          }
        });
        const wrapGetOwnPropertyDescriptors$LWS = (originalFunc$LWS) => new ProxyCtor$LWS2(originalFunc$LWS, {
          apply(_originalFunc$LWS, thisArg$LWS, args$LWS) {
            const target$LWS = args$LWS.length ? args$LWS[0] : void 0;
            if (!(typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function")) {
              return ReflectApply$LWS2(originalFunc$LWS, thisArg$LWS, args$LWS);
            }
            const state$LWS = getLazyPropertyDescriptorStateByTarget$LWS(target$LWS);
            const isFixingChromeBug$LWS = target$LWS === globalThisRef$LWS && shouldFixChromeBug$LWS;
            const unsafeDescs$LWS = isFixingChromeBug$LWS ? {} : ReflectApply$LWS2(originalFunc$LWS, thisArg$LWS, args$LWS);
            if (!isFixingChromeBug$LWS && state$LWS === void 0) {
              return unsafeDescs$LWS;
            }
            const ownKeys$LWS = ReflectOwnKeys$LWS2(isFixingChromeBug$LWS ? target$LWS : unsafeDescs$LWS);
            for (let i$LWS = 0, {
              length: length$LWS2
            } = ownKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
              const ownKey$LWS = ownKeys$LWS[i$LWS];
              const isLazyProp$LWS = !!(state$LWS != null && state$LWS[ownKey$LWS]);
              if (isLazyProp$LWS) {
                target$LWS[ownKey$LWS];
              }
              if (isLazyProp$LWS || isFixingChromeBug$LWS) {
                const unsafeDesc$LWS = isFixingChromeBug$LWS ? getFixedDescriptor$LWS(target$LWS, ownKey$LWS) : ReflectGetOwnPropertyDescriptor$LWS2(target$LWS, ownKey$LWS);
                if (unsafeDesc$LWS) {
                  unsafeDescs$LWS[ownKey$LWS] = unsafeDesc$LWS;
                } else if (!isFixingChromeBug$LWS) {
                  ReflectDeleteProperty$LWS2(unsafeDescs$LWS, ownKey$LWS);
                }
              }
            }
            return unsafeDescs$LWS;
          }
        });
        try {
          ReflectRef$LWS.defineProperty = wrapDefineAccessOrProperty$LWS(ReflectDefineProperty$LWS2);
        } catch (_unused19$LWS) {
        }
        try {
          ReflectRef$LWS.getOwnPropertyDescriptor = wrapGetOwnPropertyDescriptor$LWS(ReflectGetOwnPropertyDescriptor$LWS2);
        } catch (_unused20$LWS) {
        }
        try {
          ObjectCtor$LWS2.getOwnPropertyDescriptor = wrapGetOwnPropertyDescriptor$LWS(ObjectGetOwnPropertyDescriptor$LWS);
        } catch (_unused21$LWS) {
        }
        try {
          ObjectCtor$LWS2.getOwnPropertyDescriptors = wrapGetOwnPropertyDescriptors$LWS(ObjectGetOwnPropertyDescriptors$LWS2);
        } catch (_unused22$LWS) {
        }
        try {
          ObjectProto$LWS2.__defineGetter__ = wrapDefineAccessOrProperty$LWS(ObjectProtoDefineGetter$LWS);
        } catch (_unused23$LWS) {
        }
        try {
          ObjectProto$LWS2.__defineSetter__ = wrapDefineAccessOrProperty$LWS(ObjectProtoDefineSetter$LWS);
        } catch (_unused24$LWS) {
        }
        try {
          ObjectProto$LWS2.__lookupGetter__ = wrapLookupAccessor$LWS(ObjectProtoLookupGetter$LWS2, lookupFixedGetter$LWS);
        } catch (_unused25$LWS) {
        }
        try {
          ObjectProto$LWS2.__lookupSetter__ = wrapLookupAccessor$LWS(ObjectProtoLookupSetter$LWS2, lookupFixedSetter$LWS);
        } catch (_unused26$LWS) {
        }
      } : noop$LWS2;
      function lookupForeignDescriptor$LWS(foreignTargetPointer$LWS, shadowTarget$LWS, key$LWS) {
        let protoPointerOrNull$LWS;
        let safeDesc$LWS;
        try {
          protoPointerOrNull$LWS = foreignCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor$LWS(foreignTargetPointer$LWS, key$LWS, (_key$LWS, configurable$LWS, enumerable$LWS, writable$LWS, valuePointerOrPrimitive$LWS, getterPointerOrPrimitive$LWS, setterPointerOrPrimitive$LWS) => {
            safeDesc$LWS = {
              __proto__: null,
              foreign: true
            };
            if (configurable$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
              safeDesc$LWS.configurable = configurable$LWS;
            }
            if (enumerable$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
              safeDesc$LWS.enumerable = enumerable$LWS;
            }
            if (writable$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
              safeDesc$LWS.writable = writable$LWS;
            }
            if (getterPointerOrPrimitive$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
              if (typeof getterPointerOrPrimitive$LWS === "function") {
                getterPointerOrPrimitive$LWS();
                safeDesc$LWS.get = selectedTarget$LWS;
                selectedTarget$LWS = void 0;
              } else {
                safeDesc$LWS.get = void 0;
              }
            }
            if (setterPointerOrPrimitive$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
              if (typeof setterPointerOrPrimitive$LWS === "function") {
                setterPointerOrPrimitive$LWS();
                safeDesc$LWS.set = selectedTarget$LWS;
                selectedTarget$LWS = void 0;
              } else {
                safeDesc$LWS.set = void 0;
              }
            }
            if (valuePointerOrPrimitive$LWS !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
              if (typeof valuePointerOrPrimitive$LWS === "function") {
                valuePointerOrPrimitive$LWS();
                safeDesc$LWS.value = selectedTarget$LWS;
                selectedTarget$LWS = void 0;
              } else {
                safeDesc$LWS.value = valuePointerOrPrimitive$LWS;
              }
            }
            if (configurable$LWS === false) {
              ReflectDefineProperty$LWS2(shadowTarget$LWS, key$LWS, safeDesc$LWS);
            }
          });
        } catch (error) {
          var _selectedTarget10$LWS;
          const errorToThrow$LWS = (_selectedTarget10$LWS = selectedTarget$LWS) != null ? _selectedTarget10$LWS : error;
          selectedTarget$LWS = void 0;
          throw errorToThrow$LWS;
        }
        if (safeDesc$LWS === void 0) {
          let currentObject$LWS;
          if (typeof protoPointerOrNull$LWS === "function") {
            protoPointerOrNull$LWS();
            currentObject$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            currentObject$LWS = null;
          }
          while (currentObject$LWS) {
            safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS2(currentObject$LWS, key$LWS);
            if (safeDesc$LWS) {
              ReflectSetPrototypeOf$LWS2(safeDesc$LWS, null);
              break;
            }
            currentObject$LWS = ReflectGetPrototypeOf$LWS2(currentObject$LWS);
          }
          if (safeDesc$LWS) {
            var _ref3$LWS;
            const {
              get: getter$LWS,
              set: setter$LWS,
              value: localValue$LWS
            } = safeDesc$LWS;
            const possibleProxy$LWS = (_ref3$LWS = getter$LWS != null ? getter$LWS : setter$LWS) != null ? _ref3$LWS : localValue$LWS;
            safeDesc$LWS.foreign = (typeof possibleProxy$LWS === "object" && possibleProxy$LWS !== null || typeof possibleProxy$LWS === "function") && proxyPointerCache$LWS.get(possibleProxy$LWS) !== void 0;
          }
        }
        return safeDesc$LWS;
      }
      function passthruForeignTraversedSet$LWS(foreignTargetPointer$LWS, shadowTarget$LWS, key$LWS, value$LWS, receiver$LWS) {
        const safeDesc$LWS = lookupForeignDescriptor$LWS(foreignTargetPointer$LWS, shadowTarget$LWS, key$LWS);
        if (safeDesc$LWS) {
          if ("get" in safeDesc$LWS || "set" in safeDesc$LWS) {
            const {
              set: setter$LWS
            } = safeDesc$LWS;
            if (setter$LWS) {
              if (safeDesc$LWS.foreign) {
                foreignCallableApply$LWS(getTransferablePointer$LWS(setter$LWS), typeof receiver$LWS === "object" && receiver$LWS !== null || typeof receiver$LWS === "function" ? getTransferablePointer$LWS(receiver$LWS) : typeof receiver$LWS === "undefined" ? void 0 : receiver$LWS, typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : typeof value$LWS === "undefined" ? void 0 : value$LWS);
              } else {
                ReflectApply$LWS2(setter$LWS, receiver$LWS, [value$LWS]);
              }
              return true;
            }
            return false;
          }
          if (safeDesc$LWS.writable === false) {
            return false;
          }
        }
        if (!(typeof receiver$LWS === "object" && receiver$LWS !== null || typeof receiver$LWS === "function")) {
          return false;
        }
        const safeReceiverDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS2(receiver$LWS, key$LWS);
        if (safeReceiverDesc$LWS) {
          ReflectSetPrototypeOf$LWS2(safeReceiverDesc$LWS, null);
          if ("get" in safeReceiverDesc$LWS || "set" in safeReceiverDesc$LWS || safeReceiverDesc$LWS.writable === false) {
            return false;
          }
          ReflectDefineProperty$LWS2(receiver$LWS, key$LWS, {
            __proto__: null,
            value: value$LWS
          });
          return true;
        }
        return ReflectDefineProperty$LWS2(receiver$LWS, key$LWS, {
          __proto__: null,
          configurable: true,
          enumerable: true,
          value: value$LWS,
          writable: true
        });
      }
      function pushErrorAcrossBoundary$LWS(error) {
        if (LOCKER_DEBUGGABLE_FLAG$LWS) {
          checkDebugMode$LWS();
        }
        if (typeof error === "object" && error !== null || typeof error === "function") {
          const foreignErrorPointer$LWS = getTransferablePointer$LWS(error, foreignCallablePushErrorTarget$LWS);
          foreignErrorPointer$LWS();
        }
        return error;
      }
      function pushTarget$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS, foreignTargetFunctionArity$LWS, foreignTargetFunctionName$LWS, foreignTargetTypedArrayLength$LWS) {
        const {
          proxy: proxy$LWS
        } = new BoundaryProxyHandler$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS, foreignTargetFunctionArity$LWS, foreignTargetFunctionName$LWS, foreignTargetTypedArrayLength$LWS);
        proxyPointerCache$LWS.set(proxy$LWS, foreignTargetPointer$LWS);
        return createPointer$LWS(proxy$LWS);
      }
      const setLazyPropertyDescriptorStateByTarget$LWS = IS_IN_SHADOW_REALM$LWS ? (target$LWS, state$LWS) => {
        lazyPropertyDescriptorStateCache$LWS.set(target$LWS, state$LWS);
        foreignCallableSetLazyPropertyDescriptorStateByTarget$LWS(getTransferablePointer$LWS(target$LWS), getTransferablePointer$LWS(state$LWS));
      } : noop$LWS2;
      class BoundaryProxyHandler$LWS {
        constructor(foreignTargetPointer$LWS, foreignTargetTraits$LWS, foreignTargetFunctionArity$LWS, foreignTargetFunctionName$LWS, foreignTargetTypedArrayLength$LWS) {
          this.makeProxyLive = IS_IN_SHADOW_REALM$LWS ? function() {
            this.deleteProperty = BoundaryProxyHandler$LWS.passthruDeletePropertyTrap;
            this.defineProperty = BoundaryProxyHandler$LWS.passthruDefinePropertyTrap;
            this.preventExtensions = BoundaryProxyHandler$LWS.passthruPreventExtensionsTrap;
            this.set = BoundaryProxyHandler$LWS.passthruSetTrap;
            this.setPrototypeOf = BoundaryProxyHandler$LWS.passthruSetPrototypeOfTrap;
          } : noop$LWS2;
          this.makeProxyStatic = IS_IN_SHADOW_REALM$LWS ? function() {
            this.defineProperty = BoundaryProxyHandler$LWS.staticDefinePropertyTrap;
            this.deleteProperty = BoundaryProxyHandler$LWS.staticDeletePropertyTrap;
            this.get = BoundaryProxyHandler$LWS.staticGetTrap;
            this.getOwnPropertyDescriptor = BoundaryProxyHandler$LWS.staticGetOwnPropertyDescriptorTrap;
            this.getPrototypeOf = BoundaryProxyHandler$LWS.staticGetPrototypeOfTrap;
            this.has = BoundaryProxyHandler$LWS.staticHasTrap;
            this.isExtensible = BoundaryProxyHandler$LWS.staticIsExtensibleTrap;
            this.ownKeys = BoundaryProxyHandler$LWS.staticOwnKeysTrap;
            this.preventExtensions = BoundaryProxyHandler$LWS.staticPreventExtensionsTrap;
            this.set = BoundaryProxyHandler$LWS.staticSetTrap;
            this.setPrototypeOf = BoundaryProxyHandler$LWS.staticSetPrototypeOfTrap;
            const {
              foreignTargetPointer: foreignTargetPointer$LWS2,
              foreignTargetTraits: foreignTargetTraits$LWS2,
              shadowTarget: shadowTarget$LWS2
            } = this;
            if (useFastForeignTargetPath$LWS) {
              fastForeignTargetPointers$LWS.delete(foreignTargetPointer$LWS2);
            }
            const targetIntegrityTraits$LWS = foreignCallableGetTargetIntegrityTraits$LWS(foreignTargetPointer$LWS2);
            if (targetIntegrityTraits$LWS & 8) {
              this.revoke();
              return;
            }
            try {
              copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget$LWS(foreignTargetPointer$LWS2, shadowTarget$LWS2);
            } catch (_unused27$LWS) {
              if (foreignCallableIsTargetRevoked$LWS(foreignTargetPointer$LWS2)) {
                this.revoke();
                return;
              }
            }
            if (foreignTargetTraits$LWS2 & 16 && !(SymbolToStringTag$LWS2 in shadowTarget$LWS2)) {
              let toStringTag$LWS = "Object";
              try {
                toStringTag$LWS = foreignCallableGetToStringTagOfTarget$LWS(foreignTargetPointer$LWS2);
              } catch (_unused28$LWS) {
              }
              this.staticToStringTag = toStringTag$LWS;
            }
            if (targetIntegrityTraits$LWS & 4) {
              ObjectFreeze$LWS2(shadowTarget$LWS2);
            } else {
              if (targetIntegrityTraits$LWS & 2) {
                ObjectSeal$LWS(shadowTarget$LWS2);
              } else if (targetIntegrityTraits$LWS & 1) {
                ReflectPreventExtensions$LWS2(shadowTarget$LWS2);
              }
              if (LOCKER_UNMINIFIED_FLAG$LWS2) {
                foreignCallableDebugInfo$LWS("Mutations on the membrane of an object originating outside of the sandbox will not be reflected on the object itself:", foreignTargetPointer$LWS2);
              }
            }
          } : noop$LWS2;
          let shadowTarget$LWS;
          const isForeignTargetArray$LWS = foreignTargetTraits$LWS & 1;
          const isForeignTargetFunction$LWS = foreignTargetTraits$LWS & 4;
          if (isForeignTargetFunction$LWS) {
            shadowTarget$LWS = foreignTargetTraits$LWS & 8 ? () => {
            } : function() {
            };
          } else if (isForeignTargetArray$LWS) {
            shadowTarget$LWS = [];
          } else {
            shadowTarget$LWS = {};
          }
          const {
            proxy: proxy$LWS,
            revoke: revoke$LWS
          } = ProxyRevocable$LWS2(shadowTarget$LWS, this);
          this.foreignTargetPointer = foreignTargetPointer$LWS;
          this.foreignTargetTraits = foreignTargetTraits$LWS;
          this.foreignTargetTypedArrayLength = foreignTargetTypedArrayLength$LWS;
          this.nonConfigurableDescriptorCallback = (key$LWS, configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS) => {
            ReflectDefineProperty$LWS2(this.shadowTarget, key$LWS, createDescriptorFromMeta$LWS(configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS));
          };
          this.proxy = proxy$LWS;
          this.revoke = revoke$LWS;
          this.serialize = noop$LWS2;
          this.shadowTarget = shadowTarget$LWS;
          this.staticToStringTag = "Object";
          if (isForeignTargetFunction$LWS) {
            var _applyTrapNameRegistr$LWS, _constructTrapNameReg$LWS;
            this.apply = this[(_applyTrapNameRegistr$LWS = applyTrapNameRegistry$LWS[foreignTargetFunctionArity$LWS]) != null ? _applyTrapNameRegistr$LWS : applyTrapNameRegistry$LWS.n];
            this.construct = this[(_constructTrapNameReg$LWS = constructTrapNameRegistry$LWS[foreignTargetFunctionArity$LWS]) != null ? _constructTrapNameReg$LWS : constructTrapNameRegistry$LWS.n];
          }
          this.defineProperty = BoundaryProxyHandler$LWS.defaultDefinePropertyTrap;
          this.deleteProperty = BoundaryProxyHandler$LWS.defaultDeletePropertyTrap;
          this.isExtensible = BoundaryProxyHandler$LWS.defaultIsExtensibleTrap;
          this.getOwnPropertyDescriptor = BoundaryProxyHandler$LWS.defaultGetOwnPropertyDescriptorTrap;
          this.getPrototypeOf = BoundaryProxyHandler$LWS.defaultGetPrototypeOfTrap;
          this.get = foreignTargetTraits$LWS & 32 ? BoundaryProxyHandler$LWS.hybridGetTrapForTypedArray : BoundaryProxyHandler$LWS.defaultGetTrap;
          this.has = BoundaryProxyHandler$LWS.defaultHasTrap;
          this.ownKeys = BoundaryProxyHandler$LWS.defaultOwnKeysTrap;
          this.preventExtensions = BoundaryProxyHandler$LWS.defaultPreventExtensionsTrap;
          this.setPrototypeOf = BoundaryProxyHandler$LWS.defaultSetPrototypeOfTrap;
          this.set = BoundaryProxyHandler$LWS.defaultSetTrap;
          if (foreignTargetTraits$LWS & 64) {
            this.revoke();
          } else if (IS_IN_SHADOW_REALM$LWS) {
            if (isForeignTargetArray$LWS || foreignTargetTraits$LWS & 2) {
              this.makeProxyLive();
            }
          } else {
            if (foreignTargetTraits$LWS & 16) {
              let cachedSerializedValue$LWS = LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
              this.serialize = () => {
                if (cachedSerializedValue$LWS === LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2) {
                  cachedSerializedValue$LWS = foreignCallableSerializeTarget$LWS(this.foreignTargetPointer);
                }
                return cachedSerializedValue$LWS;
              };
            }
          }
        }
        static passthruDefinePropertyTrap(_shadowTarget$LWS, key$LWS, unsafePartialDesc$LWS) {
          lastProxyTrapCalled$LWS = 4;
          const {
            foreignTargetPointer: foreignTargetPointer$LWS,
            nonConfigurableDescriptorCallback: nonConfigurableDescriptorCallback$LWS
          } = this;
          const safePartialDesc$LWS = unsafePartialDesc$LWS;
          ReflectSetPrototypeOf$LWS2(safePartialDesc$LWS, null);
          const {
            get: getter$LWS,
            set: setter$LWS,
            value: value$LWS
          } = safePartialDesc$LWS;
          const valuePointerOrPrimitive$LWS = "value" in safePartialDesc$LWS ? typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : typeof value$LWS === "undefined" ? void 0 : value$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          const getterPointerOrUndefinedSymbol$LWS = "get" in safePartialDesc$LWS ? typeof getter$LWS === "function" ? getTransferablePointer$LWS(getter$LWS) : getter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          const setterPointerOrUndefinedSymbol$LWS = "set" in safePartialDesc$LWS ? typeof setter$LWS === "function" ? getTransferablePointer$LWS(setter$LWS) : setter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          let result$LWS = false;
          try {
            result$LWS = foreignCallableDefineProperty$LWS(foreignTargetPointer$LWS, key$LWS, "configurable" in safePartialDesc$LWS ? !!safePartialDesc$LWS.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "enumerable" in safePartialDesc$LWS ? !!safePartialDesc$LWS.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "writable" in safePartialDesc$LWS ? !!safePartialDesc$LWS.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, valuePointerOrPrimitive$LWS, getterPointerOrUndefinedSymbol$LWS, setterPointerOrUndefinedSymbol$LWS, nonConfigurableDescriptorCallback$LWS);
          } catch (error) {
            var _selectedTarget11$LWS;
            const errorToThrow$LWS = (_selectedTarget11$LWS = selectedTarget$LWS) != null ? _selectedTarget11$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          if (useFastForeignTargetPath$LWS && result$LWS && (typeof getterPointerOrUndefinedSymbol$LWS === "function" || typeof setterPointerOrUndefinedSymbol$LWS === "function")) {
            fastForeignTargetPointers$LWS.delete(foreignTargetPointer$LWS);
          }
          return result$LWS;
        }
        static passthruDeletePropertyTrap(_shadowTarget$LWS, key$LWS) {
          lastProxyTrapCalled$LWS = 8;
          let result$LWS = false;
          try {
            result$LWS = foreignCallableDeleteProperty$LWS(this.foreignTargetPointer, key$LWS);
          } catch (error) {
            var _selectedTarget12$LWS;
            const errorToThrow$LWS = (_selectedTarget12$LWS = selectedTarget$LWS) != null ? _selectedTarget12$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          return result$LWS;
        }
        static passthruGetPrototypeOfTrap(_shadowTarget$LWS) {
          lastProxyTrapCalled$LWS = 64;
          let protoPointerOrNull$LWS;
          try {
            protoPointerOrNull$LWS = foreignCallableGetPrototypeOf$LWS(this.foreignTargetPointer);
          } catch (error) {
            var _selectedTarget13$LWS;
            const errorToThrow$LWS = (_selectedTarget13$LWS = selectedTarget$LWS) != null ? _selectedTarget13$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          let proto$LWS;
          if (typeof protoPointerOrNull$LWS === "function") {
            protoPointerOrNull$LWS();
            proto$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            proto$LWS = null;
          }
          return proto$LWS;
        }
        static passthruIsExtensibleTrap(_shadowTarget$LWS) {
          lastProxyTrapCalled$LWS = 256;
          const {
            shadowTarget: shadowTarget$LWS
          } = this;
          let result$LWS = false;
          if (ReflectIsExtensible$LWS2(shadowTarget$LWS)) {
            const {
              foreignTargetPointer: foreignTargetPointer$LWS
            } = this;
            try {
              result$LWS = foreignCallableIsExtensible$LWS(foreignTargetPointer$LWS);
            } catch (error) {
              var _selectedTarget14$LWS;
              const errorToThrow$LWS = (_selectedTarget14$LWS = selectedTarget$LWS) != null ? _selectedTarget14$LWS : error;
              selectedTarget$LWS = void 0;
              throw errorToThrow$LWS;
            }
            if (!result$LWS) {
              copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget$LWS(foreignTargetPointer$LWS, shadowTarget$LWS);
              ReflectPreventExtensions$LWS2(shadowTarget$LWS);
            }
          }
          return result$LWS;
        }
        static passthruOwnKeysTrap(_shadowTarget$LWS) {
          lastProxyTrapCalled$LWS = 512;
          let ownKeys$LWS;
          try {
            foreignCallableOwnKeys$LWS(this.foreignTargetPointer, (...args$LWS) => {
              ownKeys$LWS = args$LWS;
            });
          } catch (error) {
            var _selectedTarget15$LWS;
            const errorToThrow$LWS = (_selectedTarget15$LWS = selectedTarget$LWS) != null ? _selectedTarget15$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          return ownKeys$LWS || [];
        }
        static passthruGetOwnPropertyDescriptorTrap(_shadowTarget$LWS, key$LWS) {
          lastProxyTrapCalled$LWS = 32;
          const {
            foreignTargetPointer: foreignTargetPointer$LWS,
            shadowTarget: shadowTarget$LWS
          } = this;
          let safeDesc$LWS;
          try {
            foreignCallableGetOwnPropertyDescriptor$LWS(foreignTargetPointer$LWS, key$LWS, (_key$LWS, configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS) => {
              safeDesc$LWS = createDescriptorFromMeta$LWS(configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS);
              if (safeDesc$LWS.configurable === false) {
                ReflectDefineProperty$LWS2(shadowTarget$LWS, key$LWS, safeDesc$LWS);
              }
            });
          } catch (error) {
            var _selectedTarget16$LWS;
            const errorToThrow$LWS = (_selectedTarget16$LWS = selectedTarget$LWS) != null ? _selectedTarget16$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          if (IS_NOT_IN_SHADOW_REALM$LWS && safeDesc$LWS && (key$LWS === LOCKER_NEAR_MEMBRANE_SYMBOL$LWS2 || key$LWS === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS2)) {
            throw new TypeErrorCtor$LWS2(ERR_ILLEGAL_PROPERTY_ACCESS$LWS2);
          }
          return safeDesc$LWS;
        }
        static passthruPreventExtensionsTrap(_shadowTarget$LWS) {
          lastProxyTrapCalled$LWS = 1024;
          const {
            foreignTargetPointer: foreignTargetPointer$LWS,
            shadowTarget: shadowTarget$LWS
          } = this;
          let result$LWS = true;
          if (ReflectIsExtensible$LWS2(shadowTarget$LWS)) {
            let resultEnum$LWS = 0;
            try {
              resultEnum$LWS = foreignCallablePreventExtensions$LWS(foreignTargetPointer$LWS);
            } catch (error) {
              var _selectedTarget17$LWS;
              const errorToThrow$LWS = (_selectedTarget17$LWS = selectedTarget$LWS) != null ? _selectedTarget17$LWS : error;
              selectedTarget$LWS = void 0;
              throw errorToThrow$LWS;
            }
            if (!(resultEnum$LWS & 1)) {
              copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget$LWS(foreignTargetPointer$LWS, shadowTarget$LWS);
              ReflectPreventExtensions$LWS2(shadowTarget$LWS);
            }
            result$LWS = !(resultEnum$LWS & 2);
          }
          return result$LWS;
        }
        static passthruSetPrototypeOfTrap(_shadowTarget$LWS, proto$LWS) {
          lastProxyTrapCalled$LWS = 4096;
          const {
            foreignTargetPointer: foreignTargetPointer$LWS
          } = this;
          const transferableProto$LWS = proto$LWS ? getTransferablePointer$LWS(proto$LWS) : proto$LWS;
          let result$LWS = false;
          try {
            result$LWS = foreignCallableSetPrototypeOf$LWS(foreignTargetPointer$LWS, transferableProto$LWS);
          } catch (error) {
            var _selectedTarget18$LWS;
            const errorToThrow$LWS = (_selectedTarget18$LWS = selectedTarget$LWS) != null ? _selectedTarget18$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          if (useFastForeignTargetPath$LWS && result$LWS) {
            fastForeignTargetPointers$LWS.delete(foreignTargetPointer$LWS);
          }
          return result$LWS;
        }
        static passthruSetTrap(_shadowTarget$LWS, key$LWS, value$LWS, receiver$LWS) {
          lastProxyTrapCalled$LWS = 2048;
          const {
            foreignTargetPointer: foreignTargetPointer$LWS,
            proxy: proxy$LWS,
            shadowTarget: shadowTarget$LWS
          } = this;
          if (typeof value$LWS === "undefined") {
            value$LWS = void 0;
          }
          if (typeof receiver$LWS === "undefined") {
            receiver$LWS = proxy$LWS;
          }
          if (IS_NOT_IN_SHADOW_REALM$LWS && (key$LWS === LOCKER_NEAR_MEMBRANE_SYMBOL$LWS2 || key$LWS === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS2)) {
            throw new TypeErrorCtor$LWS2(ERR_ILLEGAL_PROPERTY_ACCESS$LWS2);
          }
          const isFastPath$LWS = proxy$LWS === receiver$LWS;
          let result$LWS = false;
          try {
            result$LWS = isFastPath$LWS ? foreignCallableSet$LWS(foreignTargetPointer$LWS, key$LWS, typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : value$LWS) : passthruForeignTraversedSet$LWS(foreignTargetPointer$LWS, shadowTarget$LWS, key$LWS, value$LWS, receiver$LWS);
          } catch (error) {
            var _selectedTarget19$LWS;
            const errorToThrow$LWS = (_selectedTarget19$LWS = selectedTarget$LWS) != null ? _selectedTarget19$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          return result$LWS;
        }
      }
      BoundaryProxyHandler$LWS.hybridGetTrap = IS_IN_SHADOW_REALM$LWS ? function(_shadowTarget$LWS, key$LWS, receiver$LWS) {
        const {
          foreignTargetPointer: foreignTargetPointer$LWS,
          foreignTargetTraits: foreignTargetTraits$LWS,
          proxy: proxy$LWS,
          shadowTarget: shadowTarget$LWS
        } = this;
        let safeDesc$LWS;
        let result$LWS;
        if (useFastForeignTargetPath$LWS && fastForeignTargetPointers$LWS.has(foreignTargetPointer$LWS)) {
          let pointerOrPrimitive$LWS;
          try {
            pointerOrPrimitive$LWS = foreignCallableGetPropertyValue$LWS(foreignTargetPointer$LWS, key$LWS);
          } catch (error) {
            var _selectedTarget20$LWS;
            const errorToThrow$LWS = (_selectedTarget20$LWS = selectedTarget$LWS) != null ? _selectedTarget20$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
        } else {
          safeDesc$LWS = lookupForeignDescriptor$LWS(foreignTargetPointer$LWS, shadowTarget$LWS, key$LWS);
          if (safeDesc$LWS) {
            const {
              get: getter$LWS,
              value: localValue$LWS
            } = safeDesc$LWS;
            if (getter$LWS) {
              if (safeDesc$LWS.foreign) {
                const foreignGetterPointer$LWS = getTransferablePointer$LWS(getter$LWS);
                const transferableReceiver$LWS = proxy$LWS === receiver$LWS ? foreignTargetPointer$LWS : typeof receiver$LWS === "object" && receiver$LWS !== null || typeof receiver$LWS === "function" ? getTransferablePointer$LWS(receiver$LWS) : receiver$LWS;
                let pointerOrPrimitive$LWS;
                try {
                  pointerOrPrimitive$LWS = foreignCallableApply$LWS(foreignGetterPointer$LWS, transferableReceiver$LWS);
                } catch (error) {
                  var _selectedTarget21$LWS;
                  const errorToThrow$LWS = (_selectedTarget21$LWS = selectedTarget$LWS) != null ? _selectedTarget21$LWS : error;
                  selectedTarget$LWS = void 0;
                  throw errorToThrow$LWS;
                }
                if (typeof pointerOrPrimitive$LWS === "function") {
                  pointerOrPrimitive$LWS();
                  result$LWS = selectedTarget$LWS;
                  selectedTarget$LWS = void 0;
                } else {
                  result$LWS = pointerOrPrimitive$LWS;
                }
              } else {
                result$LWS = ReflectApply$LWS2(getter$LWS, receiver$LWS, []);
              }
            } else {
              result$LWS = localValue$LWS;
            }
          } else {
            const transferableReceiver$LWS = proxy$LWS === receiver$LWS ? foreignTargetPointer$LWS : typeof receiver$LWS === "object" && receiver$LWS !== null || typeof receiver$LWS === "function" ? getTransferablePointer$LWS(receiver$LWS) : receiver$LWS;
            let pointerOrPrimitive$LWS;
            try {
              pointerOrPrimitive$LWS = foreignCallableGet$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS, key$LWS, transferableReceiver$LWS);
            } catch (error) {
              var _selectedTarget22$LWS;
              const errorToThrow$LWS = (_selectedTarget22$LWS = selectedTarget$LWS) != null ? _selectedTarget22$LWS : error;
              selectedTarget$LWS = void 0;
              throw errorToThrow$LWS;
            }
            if (typeof pointerOrPrimitive$LWS === "function") {
              pointerOrPrimitive$LWS();
              result$LWS = selectedTarget$LWS;
              selectedTarget$LWS = void 0;
            } else {
              result$LWS = pointerOrPrimitive$LWS;
            }
          }
        }
        if (safeDesc$LWS === void 0 && result$LWS === void 0 && key$LWS === SymbolToStringTag$LWS2 && foreignTargetTraits$LWS & 16) {
          let toStringTag$LWS;
          try {
            toStringTag$LWS = foreignCallableGetToStringTagOfTarget$LWS(foreignTargetPointer$LWS);
          } catch (error) {
            var _selectedTarget23$LWS;
            const errorToThrow$LWS = (_selectedTarget23$LWS = selectedTarget$LWS) != null ? _selectedTarget23$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          if (toStringTag$LWS !== "Object") {
            result$LWS = toStringTag$LWS;
          }
        }
        return result$LWS;
      } : noop$LWS2;
      BoundaryProxyHandler$LWS.hybridGetTrapForTypedArray = IS_IN_SHADOW_REALM$LWS ? function(_shadowTarget$LWS, key$LWS, receiver$LWS) {
        const {
          foreignTargetPointer: foreignTargetPointer$LWS,
          foreignTargetTypedArrayLength: foreignTargetTypedArrayLength$LWS,
          proxy: proxy$LWS,
          shadowTarget: shadowTarget$LWS
        } = this;
        let useFastPath$LWS = useFastForeignTargetPathForTypedArrays$LWS;
        if (!useFastPath$LWS && typeof key$LWS === "string") {
          const possibleIndex$LWS = +key$LWS;
          useFastPath$LWS = possibleIndex$LWS > -1 && possibleIndex$LWS < foreignTargetTypedArrayLength$LWS && NumberIsInteger$LWS2(possibleIndex$LWS);
        }
        let result$LWS;
        if (useFastPath$LWS) {
          let pointerOrPrimitive$LWS;
          try {
            pointerOrPrimitive$LWS = foreignCallableGetPropertyValue$LWS(foreignTargetPointer$LWS, key$LWS);
          } catch (error) {
            var _selectedTarget24$LWS;
            const errorToThrow$LWS = (_selectedTarget24$LWS = selectedTarget$LWS) != null ? _selectedTarget24$LWS : error;
            selectedTarget$LWS = void 0;
            throw errorToThrow$LWS;
          }
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            result$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            result$LWS = pointerOrPrimitive$LWS;
          }
        } else {
          const safeDesc$LWS = lookupForeignDescriptor$LWS(foreignTargetPointer$LWS, shadowTarget$LWS, key$LWS);
          if (safeDesc$LWS) {
            const {
              get: getter$LWS,
              value: localValue$LWS
            } = safeDesc$LWS;
            if (getter$LWS) {
              if (safeDesc$LWS.foreign) {
                const foreignGetterPointer$LWS = getTransferablePointer$LWS(getter$LWS);
                const transferableReceiver$LWS = proxy$LWS === receiver$LWS ? foreignTargetPointer$LWS : typeof receiver$LWS === "object" && receiver$LWS !== null || typeof receiver$LWS === "function" ? getTransferablePointer$LWS(receiver$LWS) : receiver$LWS;
                let pointerOrPrimitive$LWS;
                try {
                  pointerOrPrimitive$LWS = foreignCallableApply$LWS(foreignGetterPointer$LWS, transferableReceiver$LWS);
                } catch (error) {
                  var _selectedTarget25$LWS;
                  const errorToThrow$LWS = (_selectedTarget25$LWS = selectedTarget$LWS) != null ? _selectedTarget25$LWS : error;
                  selectedTarget$LWS = void 0;
                  throw errorToThrow$LWS;
                }
                if (typeof pointerOrPrimitive$LWS === "function") {
                  pointerOrPrimitive$LWS();
                  result$LWS = selectedTarget$LWS;
                  selectedTarget$LWS = void 0;
                } else {
                  result$LWS = pointerOrPrimitive$LWS;
                }
              } else {
                result$LWS = ReflectApply$LWS2(getter$LWS, receiver$LWS, []);
              }
            } else {
              result$LWS = localValue$LWS;
            }
          }
        }
        return result$LWS;
      } : noop$LWS2;
      BoundaryProxyHandler$LWS.hybridHasTrap = IS_IN_SHADOW_REALM$LWS ? function(_shadowTarget$LWS, key$LWS) {
        let trueOrProtoPointerOrNull$LWS;
        try {
          trueOrProtoPointerOrNull$LWS = foreignCallableBatchGetPrototypeOfWhenHasNoOwnProperty$LWS(this.foreignTargetPointer, key$LWS);
        } catch (error) {
          var _selectedTarget26$LWS;
          const errorToThrow$LWS = (_selectedTarget26$LWS = selectedTarget$LWS) != null ? _selectedTarget26$LWS : error;
          selectedTarget$LWS = void 0;
          throw errorToThrow$LWS;
        }
        let result$LWS = false;
        if (trueOrProtoPointerOrNull$LWS === true) {
          result$LWS = true;
        } else {
          let currentObject$LWS;
          if (typeof trueOrProtoPointerOrNull$LWS === "function") {
            trueOrProtoPointerOrNull$LWS();
            currentObject$LWS = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          } else {
            currentObject$LWS = null;
          }
          while (currentObject$LWS) {
            if (ObjectHasOwn$LWS2(currentObject$LWS, key$LWS)) {
              result$LWS = true;
              break;
            }
            currentObject$LWS = ReflectGetPrototypeOf$LWS2(currentObject$LWS);
          }
        }
        return result$LWS;
      } : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.passthruGetTrap = IS_NOT_IN_SHADOW_REALM$LWS ? function(_shadowTarget$LWS, key$LWS, receiver$LWS) {
        handshakePropertyFlag$LWS && (handshakePropertyFlag$LWS = lastProxyTrapCalled$LWS === 128);
        lastProxyTrapCalled$LWS = 16;
        const isNearMembraneSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_SYMBOL$LWS2;
        const isNearMembraneSerializedValueSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS2;
        if (handshakePropertyFlag$LWS) {
          if (isNearMembraneSymbol$LWS) {
            return true;
          }
          if (isNearMembraneSerializedValueSymbol$LWS) {
            return this.serialize();
          }
        }
        const {
          foreignTargetPointer: foreignTargetPointer$LWS,
          foreignTargetTraits: foreignTargetTraits$LWS,
          proxy: proxy$LWS
        } = this;
        if (typeof receiver$LWS === "undefined") {
          receiver$LWS = proxy$LWS;
        }
        const transferableReceiver$LWS = proxy$LWS === receiver$LWS ? LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2 : typeof receiver$LWS === "object" && receiver$LWS !== null || typeof receiver$LWS === "function" ? getTransferablePointer$LWS(receiver$LWS) : receiver$LWS;
        let pointerOrPrimitive$LWS;
        try {
          pointerOrPrimitive$LWS = foreignCallableGet$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS, key$LWS, transferableReceiver$LWS);
        } catch (error) {
          var _selectedTarget27$LWS;
          const errorToThrow$LWS = (_selectedTarget27$LWS = selectedTarget$LWS) != null ? _selectedTarget27$LWS : error;
          selectedTarget$LWS = void 0;
          throw errorToThrow$LWS;
        }
        let result$LWS;
        if (typeof pointerOrPrimitive$LWS === "function") {
          pointerOrPrimitive$LWS();
          result$LWS = selectedTarget$LWS;
          selectedTarget$LWS = void 0;
        } else {
          result$LWS = pointerOrPrimitive$LWS;
        }
        if (result$LWS !== void 0 && (isNearMembraneSymbol$LWS || isNearMembraneSerializedValueSymbol$LWS)) {
          throw new TypeErrorCtor$LWS2(ERR_ILLEGAL_PROPERTY_ACCESS$LWS2);
        }
        return result$LWS;
      } : noop$LWS2;
      BoundaryProxyHandler$LWS.passthruHasTrap = IS_NOT_IN_SHADOW_REALM$LWS ? function(_shadowTarget$LWS, key$LWS) {
        lastProxyTrapCalled$LWS = 128;
        let result$LWS;
        try {
          result$LWS = foreignCallableHas$LWS(this.foreignTargetPointer, key$LWS);
        } catch (error) {
          var _selectedTarget28$LWS;
          const errorToThrow$LWS = (_selectedTarget28$LWS = selectedTarget$LWS) != null ? _selectedTarget28$LWS : error;
          selectedTarget$LWS = void 0;
          throw errorToThrow$LWS;
        }
        const isNearMembraneSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_SYMBOL$LWS2;
        const isNearMembraneSerializedValueSymbol$LWS = key$LWS === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL$LWS2;
        if (result$LWS) {
          handshakePropertyFlag$LWS = false;
          if (isNearMembraneSymbol$LWS || isNearMembraneSerializedValueSymbol$LWS) {
            throw new TypeErrorCtor$LWS2(ERR_ILLEGAL_PROPERTY_ACCESS$LWS2);
          }
        } else {
          handshakePropertyFlag$LWS = isNearMembraneSymbol$LWS || isNearMembraneSerializedValueSymbol$LWS;
        }
        return result$LWS;
      } : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.pendingDefinePropertyTrap = IS_IN_SHADOW_REALM$LWS ? function(shadowTarget$LWS, key$LWS, unsafePartialDesc$LWS) {
        const {
          foreignTargetPointer: foreignTargetPointer$LWS,
          foreignTargetTraits: foreignTargetTraits$LWS
        } = this;
        if (foreignCallableIsTargetLive$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS)) {
          this.makeProxyLive();
        } else {
          if (useFastForeignTargetPath$LWS) {
            if (isForeignPointerOfObjectProto$LWS(foreignTargetPointer$LWS)) {
              disableFastForeignTargetPointers$LWS();
            } else if (isForeignPointerOfTypedArrayProto$LWS(foreignTargetPointer$LWS)) {
              useFastForeignTargetPathForTypedArrays$LWS = false;
            }
          }
          this.makeProxyStatic();
        }
        return this.defineProperty(shadowTarget$LWS, key$LWS, unsafePartialDesc$LWS);
      } : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.pendingDeletePropertyTrap = IS_IN_SHADOW_REALM$LWS ? function(shadowTarget$LWS, key$LWS) {
        if (foreignCallableIsTargetLive$LWS(this.foreignTargetPointer, this.foreignTargetTraits)) {
          this.makeProxyLive();
        } else {
          this.makeProxyStatic();
        }
        return this.deleteProperty(shadowTarget$LWS, key$LWS);
      } : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.pendingPreventExtensionsTrap = IS_IN_SHADOW_REALM$LWS ? function(shadowTarget$LWS) {
        if (foreignCallableIsTargetLive$LWS(this.foreignTargetPointer, this.foreignTargetTraits)) {
          this.makeProxyLive();
        } else {
          this.makeProxyStatic();
        }
        return this.preventExtensions(shadowTarget$LWS);
      } : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.pendingSetPrototypeOfTrap = IS_IN_SHADOW_REALM$LWS ? function(shadowTarget$LWS, proto$LWS) {
        const {
          foreignTargetPointer: foreignTargetPointer$LWS,
          foreignTargetTraits: foreignTargetTraits$LWS
        } = this;
        if (foreignCallableIsTargetLive$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS)) {
          this.makeProxyLive();
        } else {
          if (useFastForeignTargetPath$LWS) {
            if (isForeignPointerOfObjectProto$LWS(foreignTargetPointer$LWS)) {
              disableFastForeignTargetPointers$LWS();
            } else if (isForeignPointerOfTypedArrayProto$LWS(foreignTargetPointer$LWS)) {
              useFastForeignTargetPathForTypedArrays$LWS = false;
            }
          }
          this.makeProxyStatic();
        }
        return this.setPrototypeOf(shadowTarget$LWS, proto$LWS);
      } : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.pendingSetTrap = IS_IN_SHADOW_REALM$LWS ? function(shadowTarget$LWS, key$LWS, value$LWS, receiver$LWS) {
        const {
          foreignTargetPointer: foreignTargetPointer$LWS,
          foreignTargetTraits: foreignTargetTraits$LWS
        } = this;
        if (foreignCallableIsTargetLive$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS)) {
          this.makeProxyLive();
        } else {
          if (useFastForeignTargetPath$LWS) {
            if (isForeignPointerOfObjectProto$LWS(foreignTargetPointer$LWS)) {
              disableFastForeignTargetPointers$LWS();
            } else if (isForeignPointerOfTypedArrayProto$LWS(foreignTargetPointer$LWS)) {
              useFastForeignTargetPathForTypedArrays$LWS = false;
            }
          }
          this.makeProxyStatic();
        }
        return this.set(shadowTarget$LWS, key$LWS, value$LWS, receiver$LWS);
      } : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.staticDefinePropertyTrap = IS_IN_SHADOW_REALM$LWS ? ReflectDefineProperty$LWS2 : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.staticDeletePropertyTrap = IS_IN_SHADOW_REALM$LWS ? ReflectDeleteProperty$LWS2 : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.staticGetOwnPropertyDescriptorTrap = IS_IN_SHADOW_REALM$LWS ? ReflectGetOwnPropertyDescriptor$LWS2 : noop$LWS2;
      BoundaryProxyHandler$LWS.staticGetPrototypeOfTrap = IS_IN_SHADOW_REALM$LWS ? ReflectGetPrototypeOf$LWS2 : () => null;
      BoundaryProxyHandler$LWS.staticGetTrap = IS_IN_SHADOW_REALM$LWS ? function(shadowTarget$LWS, key$LWS, receiver$LWS) {
        const {
          foreignTargetTraits: foreignTargetTraits$LWS,
          staticToStringTag: staticToStringTag$LWS
        } = this;
        const result$LWS = ReflectGet$LWS2(shadowTarget$LWS, key$LWS, receiver$LWS);
        if (result$LWS === void 0 && key$LWS === SymbolToStringTag$LWS2 && foreignTargetTraits$LWS & 16 && staticToStringTag$LWS !== "Object" && !(key$LWS in shadowTarget$LWS)) {
          return staticToStringTag$LWS;
        }
        return result$LWS;
      } : noop$LWS2;
      BoundaryProxyHandler$LWS.staticHasTrap = IS_IN_SHADOW_REALM$LWS ? ReflectHas$LWS2 : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.staticIsExtensibleTrap = IS_IN_SHADOW_REALM$LWS ? ReflectIsExtensible$LWS2 : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.staticOwnKeysTrap = IS_IN_SHADOW_REALM$LWS ? ReflectOwnKeys$LWS2 : () => [];
      BoundaryProxyHandler$LWS.staticPreventExtensionsTrap = IS_IN_SHADOW_REALM$LWS ? ReflectPreventExtensions$LWS2 : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.staticSetPrototypeOfTrap = IS_IN_SHADOW_REALM$LWS ? ReflectSetPrototypeOf$LWS2 : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.staticSetTrap = IS_IN_SHADOW_REALM$LWS ? ReflectSet$LWS2 : alwaysFalse$LWS;
      BoundaryProxyHandler$LWS.defaultDefinePropertyTrap = IS_IN_SHADOW_REALM$LWS ? BoundaryProxyHandler$LWS.pendingDefinePropertyTrap : BoundaryProxyHandler$LWS.passthruDefinePropertyTrap;
      BoundaryProxyHandler$LWS.defaultDeletePropertyTrap = IS_IN_SHADOW_REALM$LWS ? BoundaryProxyHandler$LWS.pendingDeletePropertyTrap : BoundaryProxyHandler$LWS.passthruDeletePropertyTrap;
      BoundaryProxyHandler$LWS.defaultGetOwnPropertyDescriptorTrap = BoundaryProxyHandler$LWS.passthruGetOwnPropertyDescriptorTrap;
      BoundaryProxyHandler$LWS.defaultGetPrototypeOfTrap = BoundaryProxyHandler$LWS.passthruGetPrototypeOfTrap;
      BoundaryProxyHandler$LWS.defaultGetTrap = IS_IN_SHADOW_REALM$LWS ? BoundaryProxyHandler$LWS.hybridGetTrap : BoundaryProxyHandler$LWS.passthruGetTrap;
      BoundaryProxyHandler$LWS.defaultHasTrap = IS_IN_SHADOW_REALM$LWS ? BoundaryProxyHandler$LWS.hybridHasTrap : BoundaryProxyHandler$LWS.passthruHasTrap;
      BoundaryProxyHandler$LWS.defaultIsExtensibleTrap = BoundaryProxyHandler$LWS.passthruIsExtensibleTrap;
      BoundaryProxyHandler$LWS.defaultOwnKeysTrap = BoundaryProxyHandler$LWS.passthruOwnKeysTrap;
      BoundaryProxyHandler$LWS.defaultPreventExtensionsTrap = IS_IN_SHADOW_REALM$LWS ? BoundaryProxyHandler$LWS.pendingPreventExtensionsTrap : BoundaryProxyHandler$LWS.passthruPreventExtensionsTrap;
      BoundaryProxyHandler$LWS.defaultSetTrap = IS_IN_SHADOW_REALM$LWS ? BoundaryProxyHandler$LWS.pendingSetTrap : BoundaryProxyHandler$LWS.passthruSetTrap;
      BoundaryProxyHandler$LWS.defaultSetPrototypeOfTrap = IS_IN_SHADOW_REALM$LWS ? BoundaryProxyHandler$LWS.pendingSetPrototypeOfTrap : BoundaryProxyHandler$LWS.passthruSetPrototypeOfTrap;
      if (IS_IN_SHADOW_REALM$LWS) {
        clearFastForeignTargetPointers$LWS();
      }
      foreignCallableHooksCallback$LWS(createPointer$LWS(globalThisRef$LWS), IS_NOT_IN_SHADOW_REALM$LWS ? () => {
        const result$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        return result$LWS;
      } : noop$LWS2, (value$LWS) => {
        if (typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function") {
          return getTransferablePointer$LWS(value$LWS);
        }
        return typeof value$LWS === "undefined" ? void 0 : value$LWS;
      }, (targetPointer$LWS, key$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        const value$LWS = target$LWS == null ? void 0 : target$LWS[key$LWS];
        return createPointer$LWS(typeof value$LWS === "undefined" ? void 0 : value$LWS);
      }, IS_IN_SHADOW_REALM$LWS ? (sourceText$LWS) => {
        let result$LWS;
        try {
          result$LWS = localEval$LWS(sourceText$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        return typeof result$LWS === "object" && result$LWS !== null || typeof result$LWS === "function" ? getTransferablePointer$LWS(result$LWS) : result$LWS;
      } : noop$LWS2, (targetPointer$LWS, newPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        if (typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function") {
          proxyPointerCache$LWS.set(target$LWS, newPointer$LWS);
        }
      }, LOCKER_DEBUGGABLE_FLAG$LWS ? (foreignTargetPointer$LWS, foreignTargetTraits$LWS, foreignTargetFunctionArity$LWS, foreignTargetFunctionName$LWS, foreignTargetTypedArrayLength$LWS) => {
        const pointer$LWS = pushTarget$LWS(foreignTargetPointer$LWS, foreignTargetTraits$LWS, foreignTargetFunctionArity$LWS, foreignTargetFunctionName$LWS, foreignTargetTypedArrayLength$LWS);
        const pointerWrapper$LWS = () => {
          checkDebugMode$LWS();
          return pointer$LWS();
        };
        return pointerWrapper$LWS;
      } : pushTarget$LWS, pushTarget$LWS, (targetPointer$LWS, thisArgPointerOrUndefined$LWS, ...args$LWS) => {
        targetPointer$LWS();
        const func$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let thisArg$LWS;
        if (typeof thisArgPointerOrUndefined$LWS === "function") {
          thisArgPointerOrUndefined$LWS();
          thisArg$LWS = selectedTarget$LWS;
          selectedTarget$LWS = void 0;
        }
        for (let i$LWS = 0, {
          length: length$LWS2
        } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const pointerOrPrimitive$LWS = args$LWS[i$LWS];
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            args$LWS[i$LWS] = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          }
        }
        let result$LWS;
        try {
          result$LWS = ReflectApply$LWS2(func$LWS, thisArg$LWS, args$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        return typeof result$LWS === "object" && result$LWS !== null || typeof result$LWS === "function" ? getTransferablePointer$LWS(result$LWS) : typeof result$LWS === "undefined" ? void 0 : result$LWS;
      }, (targetPointer$LWS, newTargetPointerOrUndefined$LWS, ...args$LWS) => {
        targetPointer$LWS();
        const constructor$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let newTarget$LWS;
        if (typeof newTargetPointerOrUndefined$LWS === "function") {
          newTargetPointerOrUndefined$LWS();
          newTarget$LWS = selectedTarget$LWS;
          selectedTarget$LWS = void 0;
        }
        for (let i$LWS = 0, {
          length: length$LWS2
        } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const pointerOrPrimitive$LWS = args$LWS[i$LWS];
          if (typeof pointerOrPrimitive$LWS === "function") {
            pointerOrPrimitive$LWS();
            args$LWS[i$LWS] = selectedTarget$LWS;
            selectedTarget$LWS = void 0;
          }
        }
        let result$LWS;
        try {
          result$LWS = ReflectConstruct$LWS2(constructor$LWS, args$LWS, newTarget$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        return typeof result$LWS === "object" && result$LWS !== null || typeof result$LWS === "function" ? getTransferablePointer$LWS(result$LWS) : typeof result$LWS === "undefined" ? void 0 : result$LWS;
      }, (targetPointer$LWS, key$LWS, configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS, foreignCallableNonConfigurableDescriptorCallback$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        const safePartialDesc$LWS = createDescriptorFromMeta$LWS(configurable$LWS, enumerable$LWS, writable$LWS, valuePointer$LWS, getterPointer$LWS, setterPointer$LWS);
        let result$LWS = false;
        try {
          result$LWS = ReflectDefineProperty$LWS2(target$LWS, key$LWS, safePartialDesc$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (result$LWS && configurable$LWS === false) {
          let safeDesc$LWS;
          try {
            safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS2(target$LWS, key$LWS);
          } catch (error) {
            throw pushErrorAcrossBoundary$LWS(error);
          }
          if (safeDesc$LWS) {
            ReflectSetPrototypeOf$LWS2(safeDesc$LWS, null);
            if (safeDesc$LWS.configurable === false) {
              const {
                get: getter$LWS,
                set: setter$LWS,
                value: value$LWS
              } = safeDesc$LWS;
              foreignCallableNonConfigurableDescriptorCallback$LWS(key$LWS, false, "enumerable" in safeDesc$LWS ? safeDesc$LWS.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "writable" in safeDesc$LWS ? safeDesc$LWS.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "value" in safeDesc$LWS ? typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : value$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "get" in safeDesc$LWS ? typeof getter$LWS === "function" ? getTransferablePointer$LWS(getter$LWS) : getter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "set" in safeDesc$LWS ? typeof setter$LWS === "function" ? getTransferablePointer$LWS(setter$LWS) : setter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2);
            }
          }
        }
        return result$LWS;
      }, (targetPointer$LWS, key$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        try {
          return ReflectDeleteProperty$LWS2(target$LWS, key$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
      }, (targetPointer$LWS, targetTraits$LWS, key$LWS, receiverPointerOrPrimitive$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let receiver$LWS;
        if (typeof receiverPointerOrPrimitive$LWS === "function") {
          receiverPointerOrPrimitive$LWS();
          receiver$LWS = selectedTarget$LWS;
          selectedTarget$LWS = void 0;
        } else {
          receiver$LWS = receiverPointerOrPrimitive$LWS === LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2 ? target$LWS : receiverPointerOrPrimitive$LWS;
        }
        let result$LWS;
        try {
          result$LWS = ReflectGet$LWS2(target$LWS, key$LWS, receiver$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (typeof result$LWS === "object" && result$LWS !== null || typeof result$LWS === "function") {
          return getTransferablePointer$LWS(result$LWS);
        }
        if (result$LWS === void 0 && key$LWS === SymbolToStringTag$LWS2 && targetTraits$LWS & 16) {
          try {
            if (!(key$LWS in target$LWS)) {
              const brand$LWS = ReflectApply$LWS2(ObjectProtoToString$LWS2, target$LWS, []);
              if (brand$LWS !== "[object Object]") {
                result$LWS = ReflectApply$LWS2(StringProtoSlice$LWS2, brand$LWS, [8, -1]);
              }
            }
          } catch (error) {
            throw pushErrorAcrossBoundary$LWS(error);
          }
        }
        return typeof result$LWS === "undefined" ? void 0 : result$LWS;
      }, (targetPointer$LWS, key$LWS, foreignCallableDescriptorCallback$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let safeDesc$LWS;
        try {
          safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS2(target$LWS, key$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (safeDesc$LWS) {
          ReflectSetPrototypeOf$LWS2(safeDesc$LWS, null);
          const {
            get: getter$LWS,
            set: setter$LWS,
            value: value$LWS
          } = safeDesc$LWS;
          foreignCallableDescriptorCallback$LWS(key$LWS, "configurable" in safeDesc$LWS ? safeDesc$LWS.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "enumerable" in safeDesc$LWS ? safeDesc$LWS.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "writable" in safeDesc$LWS ? safeDesc$LWS.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "value" in safeDesc$LWS ? typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : typeof value$LWS === "undefined" ? void 0 : value$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "get" in safeDesc$LWS ? typeof getter$LWS === "function" ? getTransferablePointer$LWS(getter$LWS) : getter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "set" in safeDesc$LWS ? typeof setter$LWS === "function" ? getTransferablePointer$LWS(setter$LWS) : setter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2);
        }
      }, (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let proto$LWS;
        try {
          proto$LWS = ReflectGetPrototypeOf$LWS2(target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (typeof proto$LWS === "undefined") {
          return null;
        }
        return proto$LWS ? getTransferablePointer$LWS(proto$LWS) : proto$LWS;
      }, (targetPointer$LWS, key$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        try {
          return key$LWS in target$LWS;
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
      }, (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        try {
          return ReflectIsExtensible$LWS2(target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
      }, (targetPointer$LWS, foreignCallableKeysCallback$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let ownKeys$LWS;
        try {
          ownKeys$LWS = ReflectOwnKeys$LWS2(target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        ReflectApply$LWS2(foreignCallableKeysCallback$LWS, void 0, ownKeys$LWS);
      }, (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let result$LWS = 2;
        try {
          if (ReflectPreventExtensions$LWS2(target$LWS)) {
            result$LWS = 4;
          } else if (ReflectIsExtensible$LWS2(target$LWS)) {
            result$LWS |= 1;
          }
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        return result$LWS;
      }, (targetPointer$LWS, key$LWS, valuePointerOrPrimitive$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let value$LWS;
        if (typeof valuePointerOrPrimitive$LWS === "function") {
          valuePointerOrPrimitive$LWS();
          value$LWS = selectedTarget$LWS;
          selectedTarget$LWS = void 0;
        } else {
          value$LWS = valuePointerOrPrimitive$LWS;
        }
        try {
          return ReflectSet$LWS2(target$LWS, key$LWS, value$LWS, target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
      }, (targetPointer$LWS, protoPointerOrNull$LWS = null) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let proto$LWS;
        if (typeof protoPointerOrNull$LWS === "function") {
          ReflectApply$LWS2(protoPointerOrNull$LWS, void 0, []);
          proto$LWS = selectedTarget$LWS;
          selectedTarget$LWS = void 0;
        } else {
          proto$LWS = null;
        }
        try {
          return ReflectSetPrototypeOf$LWS2(target$LWS, proto$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
      }, LOCKER_DEBUGGABLE_FLAG$LWS ? (...args$LWS) => {
        if (checkDebugMode$LWS()) {
          for (let i$LWS = 0, {
            length: length$LWS2
          } = args$LWS; i$LWS < length$LWS2; i$LWS += 1) {
            const pointerOrPrimitive$LWS = args$LWS[i$LWS];
            if (typeof pointerOrPrimitive$LWS === "function") {
              pointerOrPrimitive$LWS();
              args$LWS[i$LWS] = selectedTarget$LWS;
              selectedTarget$LWS = void 0;
            }
          }
          try {
            ReflectApply$LWS2(consoleInfo$LWS, consoleObject$LWS, args$LWS);
          } catch (_unused29$LWS) {
          }
        }
      } : noop$LWS2, IS_IN_SHADOW_REALM$LWS ? (targetPointer$LWS, ...descriptorTuples$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        for (let i$LWS = 0, {
          length: length$LWS2
        } = descriptorTuples$LWS; i$LWS < length$LWS2; i$LWS += 7) {
          ReflectDefineProperty$LWS2(target$LWS, descriptorTuples$LWS[i$LWS], createDescriptorFromMeta$LWS(descriptorTuples$LWS[i$LWS + 1], descriptorTuples$LWS[i$LWS + 2], descriptorTuples$LWS[i$LWS + 3], descriptorTuples$LWS[i$LWS + 4], descriptorTuples$LWS[i$LWS + 5], descriptorTuples$LWS[i$LWS + 6]));
        }
      } : noop$LWS2, IS_NOT_IN_SHADOW_REALM$LWS ? (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        const state$LWS = proxyTargetToLazyPropertyDescriptorStateMap$LWS.get(target$LWS);
        return state$LWS ? getTransferablePointer$LWS(state$LWS) : state$LWS;
      } : noop$LWS2, IS_NOT_IN_SHADOW_REALM$LWS ? (targetPointer$LWS, key$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let value$LWS;
        try {
          value$LWS = target$LWS[key$LWS];
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        return typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : value$LWS;
      } : noop$LWS2, IS_NOT_IN_SHADOW_REALM$LWS ? (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        try {
          if (!ReflectIsExtensible$LWS2(target$LWS)) {
            if (ObjectIsFrozen$LWS(target$LWS)) {
              return 4 & 2 & 1;
            }
            if (ObjectIsSealed$LWS(target$LWS)) {
              return 2 & 1;
            }
            return 1;
          }
        } catch (_unused30$LWS) {
          try {
            isArrayOrThrowForRevoked$LWS(target$LWS);
          } catch (_unused31$LWS) {
            return 8;
          }
        }
        return 0;
      } : () => 0, (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        try {
          const brand$LWS = ReflectApply$LWS2(ObjectProtoToString$LWS2, target$LWS, []);
          return brand$LWS === "[object Object]" ? "Object" : ReflectApply$LWS2(StringProtoSlice$LWS2, brand$LWS, [8, -1]);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
      }, installErrorPrepareStackTrace$LWS, IS_IN_SHADOW_REALM$LWS ? (targetPointer$LWS, ...ownKeysAndUnforgeableGlobalThisKeys$LWS) => {
        const sliceIndex$LWS = ReflectApply$LWS2(ArrayProtoIndexOf$LWS2, ownKeysAndUnforgeableGlobalThisKeys$LWS, [LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2]);
        let ownKeys$LWS;
        let unforgeableGlobalThisKeys$LWS;
        if (sliceIndex$LWS === -1) {
          ownKeys$LWS = ownKeysAndUnforgeableGlobalThisKeys$LWS;
        } else {
          ownKeys$LWS = ReflectApply$LWS2(ArrayProtoSlice$LWS2, ownKeysAndUnforgeableGlobalThisKeys$LWS, [0, sliceIndex$LWS]);
          unforgeableGlobalThisKeys$LWS = ReflectApply$LWS2(ArrayProtoSlice$LWS2, ownKeysAndUnforgeableGlobalThisKeys$LWS, [sliceIndex$LWS + 1]);
        }
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let state$LWS = getLazyPropertyDescriptorStateByTarget$LWS(target$LWS);
        if (state$LWS === void 0) {
          state$LWS = {
            __proto__: null
          };
          setLazyPropertyDescriptorStateByTarget$LWS(target$LWS, state$LWS);
        }
        for (let i$LWS = 0, {
          length: length$LWS2
        } = ownKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          const ownKey$LWS = ownKeys$LWS[i$LWS];
          state$LWS[ownKey$LWS] = true;
          ReflectDefineProperty$LWS2(target$LWS, ownKey$LWS, {
            __proto__: null,
            configurable: true,
            get() {
              activateLazyOwnPropertyDefinition$LWS(target$LWS, ownKey$LWS, state$LWS);
              return target$LWS[ownKey$LWS];
            },
            set(value$LWS) {
              activateLazyOwnPropertyDefinition$LWS(target$LWS, ownKey$LWS, state$LWS);
              ReflectSet$LWS2(target$LWS, ownKey$LWS, value$LWS);
            }
          });
        }
        installPropertyDescriptorMethodWrappers$LWS(unforgeableGlobalThisKeys$LWS);
      } : noop$LWS2, IS_NOT_IN_SHADOW_REALM$LWS && liveTargetCallback$LWS ? (targetPointer$LWS, targetTraits$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        if (target$LWS !== ObjectProto$LWS2 && target$LWS !== RegExpProto$LWS2) {
          try {
            return liveTargetCallback$LWS(target$LWS, targetTraits$LWS);
          } catch (_unused32$LWS) {
          }
        }
        return false;
      } : alwaysFalse$LWS, IS_NOT_IN_SHADOW_REALM$LWS ? (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        try {
          isArrayOrThrowForRevoked$LWS(target$LWS);
          return false;
        } catch (_unused33$LWS) {
        }
        return true;
      } : alwaysFalse$LWS, IS_IN_SHADOW_REALM$LWS ? (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        try {
          return SymbolToStringTag$LWS2 in target$LWS ? serializeTargetByTrialAndError$LWS(target$LWS) : serializeTargetByBrand$LWS(target$LWS);
        } catch (_unused34$LWS) {
        }
        return void 0;
      } : noop$LWS2, IS_NOT_IN_SHADOW_REALM$LWS ? (targetPointer$LWS, statePointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        statePointer$LWS();
        const state$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        proxyTargetToLazyPropertyDescriptorStateMap$LWS.set(target$LWS, state$LWS);
      } : noop$LWS2, IS_IN_SHADOW_REALM$LWS ? (targetPointer$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        if (useFastForeignTargetPath$LWS) {
          fastForeignTargetPointers$LWS.add(getTransferablePointer$LWS(target$LWS));
        }
      } : noop$LWS2, (targetPointer$LWS, foreignCallableDescriptorsCallback$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let unsafeDescs$LWS;
        try {
          unsafeDescs$LWS = ObjectGetOwnPropertyDescriptors$LWS2(target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        const ownKeys$LWS = ReflectOwnKeys$LWS2(unsafeDescs$LWS);
        const {
          length: length$LWS2
        } = ownKeys$LWS;
        const descriptorTuples$LWS = new ArrayCtor$LWS2(length$LWS2 * 7);
        for (let i$LWS = 0, j$LWS = 0; i$LWS < length$LWS2; i$LWS += 1, j$LWS += 7) {
          const ownKey$LWS = ownKeys$LWS[i$LWS];
          const safeDesc$LWS = unsafeDescs$LWS[ownKey$LWS];
          ReflectSetPrototypeOf$LWS2(safeDesc$LWS, null);
          const {
            get: getter$LWS,
            set: setter$LWS,
            value: value$LWS
          } = safeDesc$LWS;
          descriptorTuples$LWS[j$LWS] = ownKey$LWS;
          descriptorTuples$LWS[j$LWS + 1] = "configurable" in safeDesc$LWS ? safeDesc$LWS.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          descriptorTuples$LWS[j$LWS + 2] = "enumerable" in safeDesc$LWS ? safeDesc$LWS.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          descriptorTuples$LWS[j$LWS + 3] = "writable" in safeDesc$LWS ? safeDesc$LWS.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          descriptorTuples$LWS[j$LWS + 4] = "value" in safeDesc$LWS ? typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : value$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          descriptorTuples$LWS[j$LWS + 5] = "get" in safeDesc$LWS ? typeof getter$LWS === "function" ? getTransferablePointer$LWS(getter$LWS) : getter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
          descriptorTuples$LWS[j$LWS + 6] = "set" in safeDesc$LWS ? typeof setter$LWS === "function" ? getTransferablePointer$LWS(setter$LWS) : setter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2;
        }
        ReflectApply$LWS2(foreignCallableDescriptorsCallback$LWS, void 0, descriptorTuples$LWS);
        let proto$LWS;
        try {
          proto$LWS = ReflectGetPrototypeOf$LWS2(target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (typeof proto$LWS === "undefined") {
          return null;
        }
        return proto$LWS ? getTransferablePointer$LWS(proto$LWS) : proto$LWS;
      }, (targetPointer$LWS, key$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let proto$LWS;
        try {
          if (ObjectHasOwn$LWS2(target$LWS, key$LWS)) {
            return true;
          }
          proto$LWS = ReflectGetPrototypeOf$LWS2(target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (typeof proto$LWS === "undefined") {
          return null;
        }
        return proto$LWS ? getTransferablePointer$LWS(proto$LWS) : proto$LWS;
      }, (targetPointer$LWS, key$LWS, foreignCallableDescriptorCallback$LWS) => {
        targetPointer$LWS();
        const target$LWS = selectedTarget$LWS;
        selectedTarget$LWS = void 0;
        let safeDesc$LWS;
        try {
          safeDesc$LWS = ReflectGetOwnPropertyDescriptor$LWS2(target$LWS, key$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (safeDesc$LWS) {
          ReflectSetPrototypeOf$LWS2(safeDesc$LWS, null);
          const {
            get: getter$LWS,
            set: setter$LWS,
            value: value$LWS
          } = safeDesc$LWS;
          foreignCallableDescriptorCallback$LWS(key$LWS, "configurable" in safeDesc$LWS ? safeDesc$LWS.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "enumerable" in safeDesc$LWS ? safeDesc$LWS.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "writable" in safeDesc$LWS ? safeDesc$LWS.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "value" in safeDesc$LWS ? typeof value$LWS === "object" && value$LWS !== null || typeof value$LWS === "function" ? getTransferablePointer$LWS(value$LWS) : typeof value$LWS === "undefined" ? void 0 : value$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "get" in safeDesc$LWS ? typeof getter$LWS === "function" ? getTransferablePointer$LWS(getter$LWS) : getter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2, "set" in safeDesc$LWS ? typeof setter$LWS === "function" ? getTransferablePointer$LWS(setter$LWS) : setter$LWS : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS2);
          return void 0;
        }
        let proto$LWS;
        try {
          proto$LWS = ReflectGetPrototypeOf$LWS2(target$LWS);
        } catch (error) {
          throw pushErrorAcrossBoundary$LWS(error);
        }
        if (typeof proto$LWS === "undefined") {
          return null;
        }
        return proto$LWS ? getTransferablePointer$LWS(proto$LWS) : proto$LWS;
      });
      let foreignCallablesHooked$LWS = false;
      return (...hooks$LWS) => {
        if (foreignCallablesHooked$LWS) {
          return;
        }
        foreignCallablesHooked$LWS = true;
        ({
          6: foreignCallablePushErrorTarget$LWS,
          7: foreignCallablePushTarget$LWS,
          8: foreignCallableApply$LWS,
          9: foreignCallableConstruct$LWS,
          10: foreignCallableDefineProperty$LWS,
          11: foreignCallableDeleteProperty$LWS,
          12: foreignCallableGet$LWS,
          13: foreignCallableGetOwnPropertyDescriptor$LWS,
          14: foreignCallableGetPrototypeOf$LWS,
          15: foreignCallableHas$LWS,
          16: foreignCallableIsExtensible$LWS,
          17: foreignCallableOwnKeys$LWS,
          18: foreignCallablePreventExtensions$LWS,
          19: foreignCallableSet$LWS,
          20: foreignCallableSetPrototypeOf$LWS,
          21: foreignCallableDebugInfo$LWS,
          23: foreignCallableGetLazyPropertyDescriptorStateByTarget$LWS,
          24: foreignCallableGetPropertyValue$LWS,
          25: foreignCallableGetTargetIntegrityTraits$LWS,
          26: foreignCallableGetToStringTagOfTarget$LWS,
          27: foreignCallableInstallErrorPrepareStackTrace$LWS,
          29: foreignCallableIsTargetLive$LWS,
          30: foreignCallableIsTargetRevoked$LWS,
          31: foreignCallableSerializeTarget$LWS,
          32: foreignCallableSetLazyPropertyDescriptorStateByTarget$LWS,
          34: foreignCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors$LWS,
          35: foreignCallableBatchGetPrototypeOfWhenHasNoOwnProperty$LWS,
          36: foreignCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor$LWS
        } = hooks$LWS);
        const applyTrapForZeroOrMoreArgs$LWS = createApplyOrConstructTrapForZeroOrMoreArgs$LWS(1);
        const applyTrapForOneOrMoreArgs$LWS = createApplyOrConstructTrapForOneOrMoreArgs$LWS(1);
        const applyTrapForTwoOrMoreArgs$LWS = createApplyOrConstructTrapForTwoOrMoreArgs$LWS(1);
        const applyTrapForThreeOrMoreArgs$LWS = createApplyOrConstructTrapForThreeOrMoreArgs$LWS(1);
        const applyTrapForFourOrMoreArgs$LWS = createApplyOrConstructTrapForFourOrMoreArgs$LWS(1);
        const applyTrapForFiveOrMoreArgs$LWS = createApplyOrConstructTrapForFiveOrMoreArgs$LWS(1);
        const applyTrapForAnyNumberOfArgs$LWS = createApplyOrConstructTrapForAnyNumberOfArgs$LWS(1);
        const constructTrapForZeroOrMoreArgs$LWS = createApplyOrConstructTrapForZeroOrMoreArgs$LWS(2);
        const constructTrapForOneOrMoreArgs$LWS = createApplyOrConstructTrapForOneOrMoreArgs$LWS(2);
        const constructTrapForTwoOrMoreArgs$LWS = createApplyOrConstructTrapForTwoOrMoreArgs$LWS(2);
        const constructTrapForThreeOrMoreArgs$LWS = createApplyOrConstructTrapForThreeOrMoreArgs$LWS(2);
        const constructTrapForFourOrMoreArgs$LWS = createApplyOrConstructTrapForFourOrMoreArgs$LWS(2);
        const constructTrapForFiveOrMoreArgs$LWS = createApplyOrConstructTrapForFiveOrMoreArgs$LWS(2);
        const constructTrapForAnyNumberOfArgs$LWS = createApplyOrConstructTrapForAnyNumberOfArgs$LWS(2);
        if (MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS === void 0) {
          MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS = ObjectKeys$LWS2({
            applyTrapForZeroOrMoreArgs: applyTrapForZeroOrMoreArgs$LWS,
            applyTrapForOneOrMoreArgs: applyTrapForOneOrMoreArgs$LWS,
            applyTrapForTwoOrMoreArgs: applyTrapForTwoOrMoreArgs$LWS,
            applyTrapForThreeOrMoreArgs: applyTrapForThreeOrMoreArgs$LWS,
            applyTrapForFourOrMoreArgs: applyTrapForFourOrMoreArgs$LWS,
            applyTrapForFiveOrMoreArgs: applyTrapForFiveOrMoreArgs$LWS,
            applyTrapForAnyNumberOfArgs: applyTrapForAnyNumberOfArgs$LWS,
            constructTrapForZeroOrMoreArgs: constructTrapForZeroOrMoreArgs$LWS,
            constructTrapForOneOrMoreArgs: constructTrapForOneOrMoreArgs$LWS,
            constructTrapForTwoOrMoreArgs: constructTrapForTwoOrMoreArgs$LWS,
            constructTrapForThreeOrMoreArgs: constructTrapForThreeOrMoreArgs$LWS,
            constructTrapForFourOrMoreArgs: constructTrapForFourOrMoreArgs$LWS,
            constructTrapForFiveOrMoreArgs: constructTrapForFiveOrMoreArgs$LWS,
            constructTrapForAnyNumberOfArgs: constructTrapForAnyNumberOfArgs$LWS
          });
        }
        applyTrapNameRegistry$LWS[0] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[0];
        applyTrapNameRegistry$LWS[1] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[1];
        applyTrapNameRegistry$LWS[2] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[2];
        applyTrapNameRegistry$LWS[3] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[3];
        applyTrapNameRegistry$LWS[4] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[4];
        applyTrapNameRegistry$LWS[5] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[5];
        applyTrapNameRegistry$LWS.n = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[6];
        constructTrapNameRegistry$LWS[0] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[7];
        constructTrapNameRegistry$LWS[1] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[8];
        constructTrapNameRegistry$LWS[2] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[9];
        constructTrapNameRegistry$LWS[3] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[10];
        constructTrapNameRegistry$LWS[4] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[11];
        constructTrapNameRegistry$LWS[5] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[12];
        constructTrapNameRegistry$LWS.n = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES$LWS[13];
        const {
          prototype: BoundaryProxyHandlerProto$LWS
        } = BoundaryProxyHandler$LWS;
        BoundaryProxyHandlerProto$LWS[applyTrapNameRegistry$LWS[0]] = applyTrapForZeroOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[applyTrapNameRegistry$LWS[1]] = applyTrapForOneOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[applyTrapNameRegistry$LWS[2]] = applyTrapForTwoOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[applyTrapNameRegistry$LWS[3]] = applyTrapForThreeOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[applyTrapNameRegistry$LWS[4]] = applyTrapForFourOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[applyTrapNameRegistry$LWS[5]] = applyTrapForFiveOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[applyTrapNameRegistry$LWS.n] = applyTrapForAnyNumberOfArgs$LWS;
        BoundaryProxyHandlerProto$LWS[constructTrapNameRegistry$LWS[0]] = constructTrapForZeroOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[constructTrapNameRegistry$LWS[1]] = constructTrapForOneOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[constructTrapNameRegistry$LWS[2]] = constructTrapForTwoOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[constructTrapNameRegistry$LWS[3]] = constructTrapForThreeOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[constructTrapNameRegistry$LWS[4]] = constructTrapForFourOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[constructTrapNameRegistry$LWS[5]] = constructTrapForFiveOrMoreArgs$LWS;
        BoundaryProxyHandlerProto$LWS[constructTrapNameRegistry$LWS.n] = constructTrapForAnyNumberOfArgs$LWS;
        ReflectSetPrototypeOf$LWS2(BoundaryProxyHandlerProto$LWS, null);
      };
    };
  }
  const createMembraneMarshallSourceInStrictMode$LWS = `
'use strict';
(${createMembraneMarshall$LWS})`;
  function createBlueConnector$LWS(globalObject$LWS) {
    if (typeof globalObject$LWS !== "object" || globalObject$LWS === null) {
      throw new TypeErrorCtor$LWS("Missing globalObject.");
    }
    return createMembraneMarshall$LWS(globalObject$LWS);
  }
  function createRedConnector$LWS(evaluator$LWS) {
    if (typeof evaluator$LWS !== "function") {
      throw new TypeErrorCtor$LWS("Missing evaluator function.");
    }
    return evaluator$LWS(createMembraneMarshallSourceInStrictMode$LWS)();
  }
  const LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS = SymbolFor$LWS("@@lockerNearMembraneUndefinedValue");
  class VirtualEnvironment$LWS {
    constructor(options$LWS) {
      if (options$LWS === void 0) {
        throw new ErrorCtor$LWS("Missing required VirtualEnvironment options.");
      }
      const {
        blueConnector: blueConnector$LWS,
        redConnector: redConnector$LWS,
        distortionCallback: distortionCallback$LWS,
        instrumentation: instrumentation$LWS,
        liveTargetCallback: liveTargetCallback$LWS,
        revokedProxyCallback: revokedProxyCallback$LWS2,
        signSourceCallback: signSourceCallback$LWS
      } = ObjectAssign$LWS({
        __proto__: null
      }, options$LWS);
      let blueHooks$LWS;
      const blueConnect$LWS = blueConnector$LWS("blue", (...hooks$LWS) => {
        blueHooks$LWS = hooks$LWS;
      }, {
        distortionCallback: distortionCallback$LWS,
        instrumentation: instrumentation$LWS,
        liveTargetCallback: liveTargetCallback$LWS,
        revokedProxyCallback: revokedProxyCallback$LWS2
      });
      const {
        0: blueGlobalThisPointer$LWS,
        1: blueGetSelectedTarget$LWS,
        2: blueGetTransferableValue$LWS,
        3: blueCallableGetPropertyValuePointer$LWS,
        5: blueCallableLinkPointers$LWS,
        6: blueCallablePushErrorTarget$LWS,
        7: blueCallablePushTarget$LWS,
        8: blueCallableApply$LWS,
        9: blueCallableConstruct$LWS,
        10: blueCallableDefineProperty$LWS,
        11: blueCallableDeleteProperty$LWS,
        12: blueCallableGet$LWS,
        13: blueCallableGetOwnPropertyDescriptor$LWS,
        14: blueCallableGetPrototypeOf$LWS,
        15: blueCallableHas$LWS,
        16: blueCallableIsExtensible$LWS,
        17: blueCallableOwnKeys$LWS,
        18: blueCallablePreventExtensions$LWS,
        19: blueCallableSet$LWS,
        20: blueCallableSetPrototypeOf$LWS,
        23: blueCallableGetLazyPropertyDescriptorStateByTarget$LWS,
        24: blueCallableGetPropertyValue$LWS,
        25: blueCallableGetTargetIntegrityTraits$LWS,
        26: blueCallableGetToStringTagOfTarget$LWS,
        27: blueCallableInstallErrorPrepareStackTrace$LWS,
        29: blueCallableIsTargetLive$LWS,
        32: blueCallableSetLazyPropertyDescriptorStateByTarget$LWS,
        34: blueCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors$LWS,
        35: blueCallableBatchGetPrototypeOfWhenHasNoOwnProperty$LWS,
        36: blueCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor$LWS
      } = blueHooks$LWS;
      let redHooks$LWS;
      const redConnect$LWS = redConnector$LWS("red", (...hooks$LWS) => {
        redHooks$LWS = hooks$LWS;
      });
      const {
        0: redGlobalThisPointer$LWS,
        3: redCallableGetPropertyValuePointer$LWS,
        4: redCallableEvaluate$LWS,
        5: redCallableLinkPointers$LWS,
        6: redCallablePushErrorTarget$LWS,
        7: redCallablePushTarget$LWS,
        8: redCallableApply$LWS,
        9: redCallableConstruct$LWS,
        10: redCallableDefineProperty$LWS,
        11: redCallableDeleteProperty$LWS,
        12: redCallableGet$LWS,
        13: redCallableGetOwnPropertyDescriptor$LWS,
        14: redCallableGetPrototypeOf$LWS,
        15: redCallableHas$LWS,
        16: redCallableIsExtensible$LWS,
        17: redCallableOwnKeys$LWS,
        18: redCallablePreventExtensions$LWS,
        19: redCallableSet$LWS,
        20: redCallableSetPrototypeOf$LWS,
        21: redCallableDebugInfo$LWS,
        22: redCallableDefineProperties$LWS,
        23: redCallableGetLazyPropertyDescriptorStateByTarget$LWS,
        25: redCallableGetTargetIntegrityTraits$LWS,
        26: redCallableGetToStringTagOfTarget$LWS,
        27: redCallableInstallErrorPrepareStackTrace$LWS,
        28: redCallableInstallLazyPropertyDescriptors$LWS,
        30: redCallableIsTargetRevoked$LWS,
        31: redCallableSerializeTarget$LWS,
        32: redCallableSetLazyPropertyDescriptorStateByTarget$LWS,
        33: redCallableTrackAsFastTarget$LWS,
        34: redCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors$LWS,
        35: redCallableBatchGetPrototypeOfWhenHasNoOwnProperty$LWS,
        36: redCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor$LWS
      } = redHooks$LWS;
      blueConnect$LWS(noop$LWS, noop$LWS, noop$LWS, noop$LWS, noop$LWS, noop$LWS, redCallablePushErrorTarget$LWS, redCallablePushTarget$LWS, redCallableApply$LWS, redCallableConstruct$LWS, redCallableDefineProperty$LWS, redCallableDeleteProperty$LWS, redCallableGet$LWS, redCallableGetOwnPropertyDescriptor$LWS, redCallableGetPrototypeOf$LWS, redCallableHas$LWS, redCallableIsExtensible$LWS, redCallableOwnKeys$LWS, redCallablePreventExtensions$LWS, redCallableSet$LWS, redCallableSetPrototypeOf$LWS, redCallableDebugInfo$LWS, noop$LWS, redCallableGetLazyPropertyDescriptorStateByTarget$LWS, noop$LWS, redCallableGetTargetIntegrityTraits$LWS, redCallableGetToStringTagOfTarget$LWS, redCallableInstallErrorPrepareStackTrace$LWS, noop$LWS, noop$LWS, redCallableIsTargetRevoked$LWS, redCallableSerializeTarget$LWS, redCallableSetLazyPropertyDescriptorStateByTarget$LWS, redCallableTrackAsFastTarget$LWS, redCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors$LWS, redCallableBatchGetPrototypeOfWhenHasNoOwnProperty$LWS, redCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor$LWS);
      redConnect$LWS(noop$LWS, noop$LWS, noop$LWS, noop$LWS, noop$LWS, noop$LWS, blueCallablePushErrorTarget$LWS, blueCallablePushTarget$LWS, blueCallableApply$LWS, blueCallableConstruct$LWS, blueCallableDefineProperty$LWS, blueCallableDeleteProperty$LWS, blueCallableGet$LWS, blueCallableGetOwnPropertyDescriptor$LWS, blueCallableGetPrototypeOf$LWS, blueCallableHas$LWS, blueCallableIsExtensible$LWS, blueCallableOwnKeys$LWS, blueCallablePreventExtensions$LWS, blueCallableSet$LWS, blueCallableSetPrototypeOf$LWS, noop$LWS, noop$LWS, blueCallableGetLazyPropertyDescriptorStateByTarget$LWS, blueCallableGetPropertyValue$LWS, blueCallableGetTargetIntegrityTraits$LWS, blueCallableGetToStringTagOfTarget$LWS, blueCallableInstallErrorPrepareStackTrace$LWS, noop$LWS, blueCallableIsTargetLive$LWS, noop$LWS, noop$LWS, blueCallableSetLazyPropertyDescriptorStateByTarget$LWS, noop$LWS, blueCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors$LWS, blueCallableBatchGetPrototypeOfWhenHasNoOwnProperty$LWS, blueCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor$LWS);
      this.blueGlobalThisPointer = blueGlobalThisPointer$LWS;
      this.blueGetSelectedTarget = blueGetSelectedTarget$LWS;
      this.blueGetTransferableValue = blueGetTransferableValue$LWS;
      this.blueCallableGetPropertyValuePointer = blueCallableGetPropertyValuePointer$LWS;
      this.blueCallableLinkPointers = blueCallableLinkPointers$LWS;
      this.redGlobalThisPointer = () => redGlobalThisPointer$LWS();
      this.redCallableGetPropertyValuePointer = (targetPointer$LWS, key$LWS) => redCallableGetPropertyValuePointer$LWS(targetPointer$LWS, key$LWS);
      this.redCallableEvaluate = signSourceCallback$LWS ? (sourceText$LWS) => redCallableEvaluate$LWS(signSourceCallback$LWS(sourceText$LWS)) : (sourceText$LWS) => redCallableEvaluate$LWS(sourceText$LWS);
      this.redCallableLinkPointers = (targetPointer$LWS, foreignTargetPointer$LWS) => redCallableLinkPointers$LWS(targetPointer$LWS, foreignTargetPointer$LWS);
      this.redCallableSetPrototypeOf = (targetPointer$LWS, protoPointerOrNull$LWS) => redCallableSetPrototypeOf$LWS(targetPointer$LWS, protoPointerOrNull$LWS);
      this.redCallableDefineProperties = (targetPointer$LWS, ...descriptorTuples$LWS) => {
        const {
          length: length$LWS2
        } = descriptorTuples$LWS;
        const args$LWS = new ArrayCtor$LWS(length$LWS2 + 1);
        args$LWS[0] = targetPointer$LWS;
        for (let i$LWS = 0; i$LWS < length$LWS2; i$LWS += 1) {
          args$LWS[i$LWS + 1] = descriptorTuples$LWS[i$LWS];
        }
        ReflectApply$LWS(redCallableDefineProperties$LWS, void 0, args$LWS);
      };
      this.redCallableInstallLazyPropertyDescriptors = (targetPointer$LWS, ...ownKeysAndUnforgeableGlobalThisKeys$LWS) => {
        const {
          length: length$LWS2
        } = ownKeysAndUnforgeableGlobalThisKeys$LWS;
        const args$LWS = new ArrayCtor$LWS(length$LWS2 + 1);
        args$LWS[0] = targetPointer$LWS;
        for (let i$LWS = 0; i$LWS < length$LWS2; i$LWS += 1) {
          args$LWS[i$LWS + 1] = ownKeysAndUnforgeableGlobalThisKeys$LWS[i$LWS];
        }
        ReflectApply$LWS(redCallableInstallLazyPropertyDescriptors$LWS, void 0, args$LWS);
      };
      this.redCallableTrackAsFastTarget = (targetPointer$LWS) => redCallableTrackAsFastTarget$LWS(targetPointer$LWS);
    }
    evaluate(sourceText$LWS) {
      try {
        const bluePointerOrPrimitiveValue$LWS = this.redCallableEvaluate(sourceText$LWS);
        if (typeof bluePointerOrPrimitiveValue$LWS === "function") {
          bluePointerOrPrimitiveValue$LWS();
          return this.blueGetSelectedTarget();
        }
        return bluePointerOrPrimitiveValue$LWS;
      } catch (error) {
        var _this$blueGetSelected$LWS;
        throw (_this$blueGetSelected$LWS = this.blueGetSelectedTarget()) != null ? _this$blueGetSelected$LWS : error;
      }
    }
    lazyRemapProperties(target$LWS, ownKeys$LWS, unforgeableGlobalThisKeys$LWS) {
      if (typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function") {
        const args$LWS = [this.blueGetTransferableValue(target$LWS)];
        ReflectApply$LWS(ArrayProtoPush$LWS, args$LWS, ownKeys$LWS);
        if (unforgeableGlobalThisKeys$LWS != null && unforgeableGlobalThisKeys$LWS.length) {
          args$LWS[args$LWS.length] = LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS;
          ReflectApply$LWS(ArrayProtoPush$LWS, args$LWS, unforgeableGlobalThisKeys$LWS);
        }
        ReflectApply$LWS(this.redCallableInstallLazyPropertyDescriptors, void 0, args$LWS);
      }
    }
    link(...keys$LWS) {
      let bluePointer$LWS = this.blueGlobalThisPointer;
      let redPointer$LWS = this.redGlobalThisPointer;
      for (let i$LWS = 0, {
        length: length$LWS2
      } = keys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
        const key$LWS = keys$LWS[i$LWS];
        bluePointer$LWS = this.blueCallableGetPropertyValuePointer(bluePointer$LWS, key$LWS);
        redPointer$LWS = this.redCallableGetPropertyValuePointer(redPointer$LWS, key$LWS);
        this.redCallableLinkPointers(redPointer$LWS, bluePointer$LWS);
        this.blueCallableLinkPointers(bluePointer$LWS, redPointer$LWS);
      }
    }
    remapProperties(target$LWS, unsafeBlueDescs$LWS) {
      if (typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function") {
        const targetPointer$LWS = this.blueGetTransferableValue(target$LWS);
        const ownKeys$LWS = ReflectOwnKeys$LWS(unsafeBlueDescs$LWS);
        const {
          length: length$LWS2
        } = ownKeys$LWS;
        const args$LWS = new ArrayCtor$LWS(1 + length$LWS2 * 7);
        args$LWS[0] = targetPointer$LWS;
        for (let i$LWS = 0, j$LWS = 1; i$LWS < length$LWS2; i$LWS += 1, j$LWS += 7) {
          const ownKey$LWS = ownKeys$LWS[i$LWS];
          const unsafeBlueDesc$LWS = unsafeBlueDescs$LWS[ownKey$LWS];
          const safeBlueDesc$LWS = ObjectAssign$LWS({
            __proto__: null
          }, unsafeBlueDesc$LWS);
          args$LWS[j$LWS] = ownKey$LWS;
          args$LWS[j$LWS + 1] = "configurable" in safeBlueDesc$LWS ? !!safeBlueDesc$LWS.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS;
          args$LWS[j$LWS + 2] = "enumerable" in safeBlueDesc$LWS ? !!safeBlueDesc$LWS.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS;
          args$LWS[j$LWS + 3] = "writable" in safeBlueDesc$LWS ? !!safeBlueDesc$LWS.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS;
          args$LWS[j$LWS + 4] = "value" in safeBlueDesc$LWS ? this.blueGetTransferableValue(safeBlueDesc$LWS.value) : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS;
          args$LWS[j$LWS + 5] = "get" in safeBlueDesc$LWS ? this.blueGetTransferableValue(safeBlueDesc$LWS.get) : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS;
          args$LWS[j$LWS + 6] = "set" in safeBlueDesc$LWS ? this.blueGetTransferableValue(safeBlueDesc$LWS.set) : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL$LWS;
        }
        ReflectApply$LWS(this.redCallableDefineProperties, this, args$LWS);
      }
    }
    remapProto(target$LWS, proto$LWS) {
      if (typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function") {
        const foreignTargetPointer$LWS = this.blueGetTransferableValue(target$LWS);
        const transferableProto$LWS = proto$LWS ? this.blueGetTransferableValue(proto$LWS) : proto$LWS;
        this.redCallableSetPrototypeOf(foreignTargetPointer$LWS, transferableProto$LWS);
      }
    }
    trackAsFastTarget(target$LWS) {
      if (typeof target$LWS === "object" && target$LWS !== null || typeof target$LWS === "function") {
        this.redCallableTrackAsFastTarget(this.blueGetTransferableValue(target$LWS));
      }
    }
  }
  function getESGlobalKeys$LWS(remapTypedArrays$LWS = true) {
    const ESGlobalKeys$LWS = [
      "globalThis",
      "Infinity",
      "NaN",
      "undefined",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "BigInt",
      "Boolean",
      "FinalizationRegistry",
      "Number",
      "RegExp",
      "String",
      "Symbol",
      "WeakRef",
      "JSON",
      "Math",
      "Reflect",
      "escape",
      "unescape"
    ];
    if (remapTypedArrays$LWS === false) {
      ESGlobalKeys$LWS.push("ArrayBuffer", "BigInt64Array", "BigUint64Array", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "SharedArrayBuffer", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array");
    }
    return ESGlobalKeys$LWS;
  }
  const ReflectiveIntrinsicObjectNames$LWS = ["AggregateError", "Array", "Error", "EvalError", "Function", "Object", "Proxy", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "eval", "globalThis"];
  function getESGlobalsAndReflectiveIntrinsicObjectNames$LWS(remapTypedArrays$LWS = true) {
    const ESGlobalKeys$LWS = getESGlobalKeys$LWS(remapTypedArrays$LWS);
    return toSafeArray$LWS([...ESGlobalKeys$LWS, ...ReflectiveIntrinsicObjectNames$LWS]);
  }
  function getGlobalObjectOwnKeys$LWS(source$LWS) {
    const ownKeys$LWS = ReflectOwnKeys$LWS(source$LWS);
    if (ObjectHasOwn$LWS(source$LWS, "webkit") && !ReflectApply$LWS(ArrayProtoIncludes$LWS, ownKeys$LWS, ["webkit"])) {
      ownKeys$LWS[ownKeys$LWS.length] = "webkit";
    }
    return ownKeys$LWS;
  }
  function assignFilteredGlobalDescriptorsFromPropertyDescriptorMap$LWS(descs$LWS, source$LWS, includeTypedArrays$LWS) {
    const ownKeys$LWS = getGlobalObjectOwnKeys$LWS(source$LWS);
    const ESGlobalsAndReflectiveIntrinsicObjectNames$LWS = getESGlobalsAndReflectiveIntrinsicObjectNames$LWS(includeTypedArrays$LWS);
    for (let i$LWS = 0, {
      length: length$LWS2
    } = ownKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const ownKey$LWS = ownKeys$LWS[i$LWS];
      if (!ESGlobalsAndReflectiveIntrinsicObjectNames$LWS.includes(ownKey$LWS)) {
        const unsafeDesc$LWS = source$LWS[ownKey$LWS];
        if (unsafeDesc$LWS) {
          descs$LWS[ownKey$LWS] = ObjectAssign$LWS({
            __proto__: null
          }, unsafeDesc$LWS);
        }
      }
    }
    return descs$LWS;
  }
  function getFilteredGlobalOwnKeys$LWS(source$LWS, includeTypedArrays$LWS) {
    const result$LWS = [];
    let resultOffset$LWS = 0;
    const ownKeys$LWS = getGlobalObjectOwnKeys$LWS(source$LWS);
    const ESGlobalsAndReflectiveIntrinsicObjectNames$LWS = getESGlobalsAndReflectiveIntrinsicObjectNames$LWS(includeTypedArrays$LWS);
    for (let i$LWS = 0, {
      length: length$LWS2
    } = ownKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const ownKey$LWS = ownKeys$LWS[i$LWS];
      if (!ESGlobalsAndReflectiveIntrinsicObjectNames$LWS.includes(ownKey$LWS)) {
        result$LWS[resultOffset$LWS++] = ownKey$LWS;
      }
    }
    return result$LWS;
  }
  function linkIntrinsics$LWS(env$LWS, globalObject$LWS) {
    for (let i$LWS = 0, {
      length: length$LWS2
    } = ReflectiveIntrinsicObjectNames$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const globalName$LWS = ReflectiveIntrinsicObjectNames$LWS[i$LWS];
      const reflectiveValue$LWS = globalObject$LWS[globalName$LWS];
      if (reflectiveValue$LWS) {
        if (reflectiveValue$LWS.prototype) {
          env$LWS.link(globalName$LWS, "prototype");
        } else {
          env$LWS.link(globalName$LWS);
        }
      }
    }
  }
  const blueDocumentToRecordMap$LWS = toSafeWeakMap$LWS(new WeakMap());
  const unforgeablePoisonedWindowKeys$LWS = IS_CHROMIUM_BROWSER$LWS ? ["window"] : void 0;
  function getCachedGlobalObjectReferences$LWS(globalObject$LWS) {
    const {
      window: window$LWS
    } = globalObject$LWS;
    let record$LWS;
    let document$LWS;
    try {
      ({
        document: document$LWS
      } = globalObject$LWS);
      record$LWS = blueDocumentToRecordMap$LWS.get(document$LWS);
    } catch (_unused$LWS) {
      return void 0;
    }
    if (record$LWS) {
      return record$LWS;
    }
    const WindowProto$LWS = ReflectGetPrototypeOf$LWS(window$LWS);
    const WindowPropertiesProto$LWS = ReflectGetPrototypeOf$LWS(WindowProto$LWS);
    const EventTargetProto$LWS = ReflectGetPrototypeOf$LWS(WindowPropertiesProto$LWS);
    record$LWS = {
      document: document$LWS,
      DocumentProto: ReflectGetPrototypeOf$LWS(document$LWS),
      window: window$LWS,
      WindowProto: ReflectGetPrototypeOf$LWS(window$LWS),
      WindowPropertiesProto: ReflectGetPrototypeOf$LWS(WindowProto$LWS),
      EventTargetProto: EventTargetProto$LWS,
      EventTargetProtoOwnKeys: EventTargetProto$LWS ? ReflectOwnKeys$LWS(EventTargetProto$LWS) : []
    };
    blueDocumentToRecordMap$LWS.set(document$LWS, record$LWS);
    return record$LWS;
  }
  function filterWindowKeys$LWS(keys$LWS, remapTypedArrays$LWS) {
    const excludedKeys$LWS = new SetCtor$LWS(["document", "location", "top", "window"]);
    if (remapTypedArrays$LWS === false) {
      excludedKeys$LWS.add("crypto");
      excludedKeys$LWS.add("Crypto");
      excludedKeys$LWS.add("SubtleCrypto");
      excludedKeys$LWS.add("Blob");
      excludedKeys$LWS.add("File");
      excludedKeys$LWS.add("FileReader");
      excludedKeys$LWS.add("URL");
    }
    const result$LWS = [];
    let resultOffset$LWS = 0;
    for (let i$LWS = 0, {
      length: length$LWS2
    } = keys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const key$LWS = keys$LWS[i$LWS];
      if (ReflectApply$LWS(SetProtoHas$LWS, excludedKeys$LWS, [key$LWS])) {
        continue;
      }
      result$LWS[resultOffset$LWS++] = key$LWS;
    }
    return result$LWS;
  }
  function removeWindowDescriptors$LWS(unsafeDescs$LWS, remapTypedArrays$LWS) {
    ReflectDeleteProperty$LWS(unsafeDescs$LWS, "document");
    ReflectDeleteProperty$LWS(unsafeDescs$LWS, "location");
    ReflectDeleteProperty$LWS(unsafeDescs$LWS, "top");
    ReflectDeleteProperty$LWS(unsafeDescs$LWS, "window");
    ReflectDeleteProperty$LWS(unsafeDescs$LWS, "chrome");
    if (remapTypedArrays$LWS === false) {
      ReflectDeleteProperty$LWS(unsafeDescs$LWS, "crypto");
      ReflectDeleteProperty$LWS(unsafeDescs$LWS, "Crypto");
      ReflectDeleteProperty$LWS(unsafeDescs$LWS, "SubtleCrypto");
      ReflectDeleteProperty$LWS(unsafeDescs$LWS, "Blob");
      ReflectDeleteProperty$LWS(unsafeDescs$LWS, "File");
      ReflectDeleteProperty$LWS(unsafeDescs$LWS, "FileReader");
      ReflectDeleteProperty$LWS(unsafeDescs$LWS, "URL");
    }
    return unsafeDescs$LWS;
  }
  getCachedGlobalObjectReferences$LWS(rootWindow$LWS);
  const IFRAME_SANDBOX_ATTRIBUTE_VALUE$LWS = "allow-same-origin allow-scripts";
  const revoked$LWS = toSafeWeakSet$LWS(new WeakSetCtor$LWS());
  const blueCreateHooksCallbackCache$LWS = toSafeWeakMap$LWS(new WeakMapCtor$LWS());
  function createDetachableIframe$LWS(doc$LWS) {
    var _ReflectApply$LWS;
    const iframe$LWS = ReflectApply$LWS(DocumentProtoCreateElement$LWS, doc$LWS, ["iframe"]);
    const parent$LWS = (_ReflectApply$LWS = ReflectApply$LWS(DocumentProtoBodyGetter$LWS, doc$LWS, [])) != null ? _ReflectApply$LWS : ReflectApply$LWS(NodeProtoLastChildGetter$LWS, doc$LWS, []);
    const style$LWS = ReflectApply$LWS(HTMLElementProtoStyleGetter$LWS, iframe$LWS, []);
    style$LWS.display = "none";
    ReflectApply$LWS(ElementProtoSetAttribute$LWS, iframe$LWS, ["sandbox", IFRAME_SANDBOX_ATTRIBUTE_VALUE$LWS]);
    ReflectApply$LWS(NodeProtoAppendChild$LWS, parent$LWS, [iframe$LWS]);
    return iframe$LWS;
  }
  function createIframeVirtualEnvironment$LWS(globalObject$LWS, providedOptions$LWS) {
    if (typeof globalObject$LWS !== "object" || globalObject$LWS === null) {
      throw new TypeErrorCtor$LWS("Missing global object virtualization target.");
    }
    const blueRefs$LWS = getCachedGlobalObjectReferences$LWS(globalObject$LWS);
    if (typeof blueRefs$LWS !== "object" || blueRefs$LWS === null) {
      throw new TypeErrorCtor$LWS("Invalid virtualization target.");
    }
    const {
      distortionCallback: distortionCallback$LWS,
      defaultPolicy: defaultPolicy$LWS,
      endowments: endowments$LWS,
      globalObjectShape: globalObjectShape$LWS,
      instrumentation: instrumentation$LWS,
      keepAlive: keepAlive$LWS = true,
      liveTargetCallback: liveTargetCallback$LWS,
      remapTypedArrays: remapTypedArrays$LWS = true,
      signSourceCallback: signSourceCallback$LWS
    } = ObjectAssign$LWS({
      __proto__: null
    }, providedOptions$LWS);
    const iframe$LWS = createDetachableIframe$LWS(blueRefs$LWS.document);
    const redWindow$LWS = ReflectApply$LWS(HTMLIFrameElementProtoContentWindowGetter$LWS, iframe$LWS, []);
    const shouldUseDefaultGlobalOwnKeys$LWS = typeof globalObjectShape$LWS !== "object" || globalObjectShape$LWS === null;
    const defaultGlobalOwnKeys$LWS = filterWindowKeys$LWS(getFilteredGlobalOwnKeys$LWS(redWindow$LWS, remapTypedArrays$LWS), remapTypedArrays$LWS);
    let blueConnector$LWS = blueCreateHooksCallbackCache$LWS.get(blueRefs$LWS.document);
    if (blueConnector$LWS === void 0) {
      blueConnector$LWS = createBlueConnector$LWS(globalObject$LWS);
      blueCreateHooksCallbackCache$LWS.set(blueRefs$LWS.document, blueConnector$LWS);
    }
    if (typeof redWindow$LWS.trustedTypes !== "undefined" && isObject$LWS(defaultPolicy$LWS)) {
      redWindow$LWS.trustedTypes.createPolicy("default", defaultPolicy$LWS);
    }
    const {
      eval: redIndirectEval$LWS
    } = redWindow$LWS;
    const env$LWS = new VirtualEnvironment$LWS({
      blueConnector: blueConnector$LWS,
      redConnector: createRedConnector$LWS(signSourceCallback$LWS ? (sourceText$LWS) => redIndirectEval$LWS(signSourceCallback$LWS(sourceText$LWS)) : redIndirectEval$LWS),
      distortionCallback: distortionCallback$LWS,
      instrumentation: instrumentation$LWS,
      liveTargetCallback: liveTargetCallback$LWS,
      revokedProxyCallback: keepAlive$LWS ? revokedProxyCallback$LWS : void 0,
      signSourceCallback: signSourceCallback$LWS
    });
    linkIntrinsics$LWS(env$LWS, globalObject$LWS);
    if (typeof globalThis === "undefined") {
      env$LWS.link("window", "document");
    } else {
      env$LWS.link("document");
    }
    env$LWS.link("__proto__", "__proto__", "__proto__");
    env$LWS.remapProto(blueRefs$LWS.document, blueRefs$LWS.DocumentProto);
    env$LWS.lazyRemapProperties(blueRefs$LWS.window, shouldUseDefaultGlobalOwnKeys$LWS ? defaultGlobalOwnKeys$LWS : filterWindowKeys$LWS(getFilteredGlobalOwnKeys$LWS(globalObjectShape$LWS), remapTypedArrays$LWS), keepAlive$LWS ? void 0 : unforgeablePoisonedWindowKeys$LWS);
    if (endowments$LWS) {
      const filteredEndowments$LWS = {};
      assignFilteredGlobalDescriptorsFromPropertyDescriptorMap$LWS(filteredEndowments$LWS, endowments$LWS, remapTypedArrays$LWS);
      removeWindowDescriptors$LWS(filteredEndowments$LWS, remapTypedArrays$LWS);
      env$LWS.remapProperties(blueRefs$LWS.window, filteredEndowments$LWS);
    }
    env$LWS.lazyRemapProperties(blueRefs$LWS.EventTargetProto, blueRefs$LWS.EventTargetProtoOwnKeys);
    if (keepAlive$LWS) {
      const {
        document: redDocument$LWS
      } = redWindow$LWS;
      revoked$LWS.add(redDocument$LWS);
      revoked$LWS.add(redWindow$LWS);
      ReflectApply$LWS(DocumentProtoOpen$LWS, redDocument$LWS, []);
      ReflectApply$LWS(DocumentProtoClose$LWS, redDocument$LWS, []);
    } else {
      if (IS_OLD_CHROMIUM_BROWSER$LWS) {
        redIndirectEval$LWS("window");
      }
      ReflectApply$LWS(ElementProtoRemove$LWS, iframe$LWS, []);
    }
    return env$LWS;
  }
  function revokedProxyCallback$LWS(value$LWS) {
    return revoked$LWS.has(value$LWS);
  }
  function createResourceLoadError$LWS(url$LWS) {
    return new Error(`lightning/platformResourceLoader encountered an error loading ${enquote$LWS(url$LWS)}.`);
  }
  const EMPTY_EVAL_HELPERS$LWS = {
    forAwaitOf: noop$LWS$1,
    genToAsync: noop$LWS$1,
    loadScript: noop$LWS$1,
    loadStyle: noop$LWS$1,
    makeRedGet: noop$LWS$1,
    makeRedSyncImports: noop$LWS$1,
    namespace: noop$LWS$1,
    spreadable: noop$LWS$1,
    super: noop$LWS$1
  };
  const EVAL_HELPERS_SOURCE_TEXT$LWS = `'use strict';
        ${SANDBOX_EVAL_CONTEXT_NAME$LWS}(${function redHelpersFactory$LWS(baseGenToAsync$LWS, forAwaitOf$LWS, loadScript$LWS, loadStyle$LWS) {
    const ArrayCtor$LWS2 = Array;
    const {
      iterator: SymbolIterator$LWS2
    } = Symbol;
    const {
      [SymbolIterator$LWS2]: ArrayProtoIterator$LWS
    } = ArrayCtor$LWS2.prototype;
    const GeneratorProto$LWS = function* () {
    }.constructor.prototype.prototype;
    const {
      next: GeneratorProtoNext$LWS,
      throw: GeneratorProtoThrow$LWS
    } = GeneratorProto$LWS;
    const {
      defineProperties: ObjectDefineProperties$LWS2,
      freeze: ObjectFreeze$LWS2
    } = Object;
    const {
      apply: ReflectApply$LWS2,
      get: ReflectGet$LWS2,
      getPrototypeOf: ReflectGetPrototypeOf$LWS2,
      setPrototypeOf: ReflectSetPrototypeOf$LWS2
    } = Reflect;
    function genToAsync$LWS(func$LWS, thisArg$LWS) {
      let gen$LWS;
      const wrapGenMethod$LWS = (genMethod$LWS) => (value$LWS) => {
        if (gen$LWS === void 0) {
          gen$LWS = ReflectApply$LWS2(func$LWS, thisArg$LWS, []);
        }
        return ReflectApply$LWS2(genMethod$LWS, gen$LWS, [value$LWS]);
      };
      return baseGenToAsync$LWS(wrapGenMethod$LWS(GeneratorProtoNext$LWS), wrapGenMethod$LWS(GeneratorProtoThrow$LWS));
    }
    function makeRedGet$LWS(...bindings$LWS) {
      const {
        length: length$LWS2
      } = bindings$LWS;
      const redGet$LWS = ArrayCtor$LWS2(length$LWS2);
      const descriptors$LWS = {};
      for (let i$LWS = 0; i$LWS < length$LWS2; i$LWS += 1) {
        descriptors$LWS[i$LWS] = {
          __proto__: null,
          get: bindings$LWS[i$LWS]
        };
      }
      ObjectDefineProperties$LWS2(redGet$LWS, descriptors$LWS);
      return redGet$LWS;
    }
    function makeRedSyncImports$LWS(bindings$LWS) {
      return function(...args$LWS) {
        for (let i$LWS = 0, {
          length: length$LWS2
        } = bindings$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          try {
            bindings$LWS[i$LWS];
          } catch (_unused35$LWS) {
          }
        }
        return spreadable$LWS(args$LWS);
      };
    }
    function namespace$LWS(object$LWS) {
      return ObjectFreeze$LWS2(object$LWS);
    }
    function spreadable$LWS(array$LWS) {
      ReflectSetPrototypeOf$LWS2(array$LWS, null);
      array$LWS[SymbolIterator$LWS2] = ArrayProtoIterator$LWS;
      return array$LWS;
    }
    function superApplyOrGet$LWS(target$LWS, key$LWS, thisArgOrReceiver$LWS, args$LWS) {
      const superProto$LWS = ReflectGetPrototypeOf$LWS2(target$LWS);
      if (superProto$LWS === null) {
        return void 0;
      }
      return args$LWS ? ReflectApply$LWS2(superProto$LWS[key$LWS], thisArgOrReceiver$LWS, args$LWS) : ReflectGet$LWS2(superProto$LWS, key$LWS, thisArgOrReceiver$LWS);
    }
    return {
      forAwaitOf: forAwaitOf$LWS,
      genToAsync: genToAsync$LWS,
      loadScript: loadScript$LWS,
      loadStyle: loadStyle$LWS,
      makeRedGet: makeRedGet$LWS,
      makeRedSyncImports: makeRedSyncImports$LWS,
      namespace: namespace$LWS,
      spreadable: spreadable$LWS,
      super: superApplyOrGet$LWS
    };
  }})`;
  function createEvalHelpersFactoryArgs$LWS(record$LWS) {
    const {
      document: document$LWS,
      document: {
        head: head$LWS
      },
      distortions: distortions$LWS,
      globalObject: {
        HTMLScriptElement: HTMLScriptElement$LWS,
        HTMLScriptElement: {
          prototype: HTMLScriptElementProto$LWS2
        }
      },
      root: _root$LWS
    } = record$LWS;
    const isRootRecord$LWS = record$LWS === _root$LWS;
    const forOfStateCache$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
    const resourcePromiseCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
    const resourceStatusCache$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
    const scriptSrcGetterDistortion$LWS = distortions$LWS.get(isRootRecord$LWS ? HTMLScriptElementProtoSrcGetter$LWS : ObjectLookupOwnGetter$LWS$1(HTMLScriptElementProto$LWS2, "src"));
    const scriptSrcSetterDistortion$LWS = distortions$LWS.get(isRootRecord$LWS ? HTMLScriptElementProtoSrcSetter$LWS : ObjectLookupOwnSetter$LWS(HTMLScriptElementProto$LWS2, "src"));
    function genStep$LWS(resolve$LWS, reject$LWS, next$LWS, thrower$LWS, genMethodWrapper$LWS, arg$LWS) {
      let info$LWS;
      let value$LWS;
      try {
        info$LWS = genMethodWrapper$LWS(arg$LWS);
        value$LWS = info$LWS.value;
      } catch (error) {
        reject$LWS(error);
        return;
      }
      if (info$LWS.done) {
        resolve$LWS(value$LWS);
      } else {
        ReflectApply$LWS$1(PromiseProtoThen$LWS, PromiseResolve$LWS(value$LWS), [next$LWS, thrower$LWS]);
      }
    }
    function loadPromise$LWS(element$LWS, urlAsString$LWS) {
      const promise$LWS = new PromiseCtor$LWS((resolve$LWS, reject$LWS) => {
        function onerror$LWS(event$LWS) {
          ReflectApply$LWS$1(EventTargetProtoRemoveEventListener$LWS, element$LWS, ["error", onerror$LWS]);
          ReflectApply$LWS$1(EventTargetProtoRemoveEventListener$LWS, element$LWS, ["load", onload$LWS]);
          ReflectApply$LWS$1(EventProtoStopPropagation$LWS, event$LWS, []);
          resourceStatusCache$LWS.set(element$LWS, 1);
          reject$LWS(createResourceLoadError$LWS(urlAsString$LWS));
        }
        function onload$LWS() {
          ReflectApply$LWS$1(EventTargetProtoRemoveEventListener$LWS, element$LWS, ["error", onerror$LWS]);
          ReflectApply$LWS$1(EventTargetProtoRemoveEventListener$LWS, element$LWS, ["load", onload$LWS]);
          resourceStatusCache$LWS.set(element$LWS, 3);
          if (element$LWS instanceof HTMLScriptElement$LWS) {
            element$LWS._ltngRequireLoaded = true;
          }
          resolve$LWS(void 0);
        }
        ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, element$LWS, ["error", onerror$LWS]);
        ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, element$LWS, ["load", onload$LWS]);
      });
      resourceStatusCache$LWS.set(element$LWS, 2);
      resourcePromiseCache$LWS.set(element$LWS, promise$LWS);
      ReflectApply$LWS$1(NodeProtoAppendChild$LWS$1, head$LWS, [element$LWS]);
      return promise$LWS;
    }
    return [
      function baseGenToAsync$LWS(genNextWrapper$LWS, genThrowWrapper$LWS) {
        return new PromiseCtor$LWS((resolve$LWS, reject$LWS) => {
          function next$LWS(value$LWS) {
            genStep$LWS(resolve$LWS, reject$LWS, next$LWS, thrower$LWS, genNextWrapper$LWS, value$LWS);
          }
          function thrower$LWS(error) {
            genStep$LWS(resolve$LWS, reject$LWS, next$LWS, thrower$LWS, genThrowWrapper$LWS, error);
          }
          next$LWS(void 0);
        });
      },
      function forAwaitOf$LWS(index$LWS, stage$LWS, object$LWS) {
        if (stage$LWS === 0) {
          let sync$LWS = false;
          let {
            [SymbolAsyncIterator$LWS]: iterator$LWS
          } = object$LWS;
          if (iterator$LWS === null || iterator$LWS === void 0) {
            sync$LWS = true;
            ({
              [SymbolIterator$LWS$1]: iterator$LWS
            } = object$LWS);
          }
          if (typeof iterator$LWS !== "function") {
            throw new TypeErrorCtor$LWS$1("Object is not async iterable");
          }
          forOfStateCache$LWS.set(index$LWS, {
            iterable: ReflectApply$LWS$1(iterator$LWS, object$LWS, []),
            step: void 0,
            sync: sync$LWS
          });
          return void 0;
        }
        const state$LWS = forOfStateCache$LWS.get(index$LWS);
        if (stage$LWS === 1) {
          const result$LWS = state$LWS.iterable.next();
          return state$LWS.sync ? new PromiseCtor$LWS((resolve$LWS) => {
            state$LWS.step = result$LWS;
            resolve$LWS();
          }) : ReflectApply$LWS$1(PromiseProtoThen$LWS, result$LWS, [(step$LWS) => {
            state$LWS.step = step$LWS;
          }]);
        }
        if (stage$LWS === 2) {
          return state$LWS.step.value;
        }
        if (stage$LWS === 3) {
          const done$LWS = !!state$LWS.step.done;
          if (done$LWS) {
            forOfStateCache$LWS.delete(index$LWS);
          }
          return done$LWS;
        }
        return void 0;
      },
      function loadScript$LWS(_thisArg$LWS, url$LWS) {
        const urlResolved$LWS = resolveURL$LWS(toString$LWS(url$LWS));
        const scripts$LWS = ReflectApply$LWS$1(ElementProtoQuerySelectorAll$LWS, head$LWS, ["script"]);
        for (let i$LWS = 0, {
          length: length$LWS2
        } = scripts$LWS; i$LWS < length$LWS2; i$LWS += 1) {
          var _resourceStatusCache$$LWS;
          const script$LWS3 = scripts$LWS[i$LWS];
          const status$LWS = (_resourceStatusCache$$LWS = resourceStatusCache$LWS.get(script$LWS3)) != null ? _resourceStatusCache$$LWS : 0;
          if (status$LWS && ReflectApply$LWS$1(scriptSrcGetterDistortion$LWS, script$LWS3, []) === urlResolved$LWS) {
            if (status$LWS === 3) {
              return PromiseResolve$LWS(void 0);
            }
            if (status$LWS === 1) {
              return PromiseReject$LWS(createResourceLoadError$LWS(urlResolved$LWS));
            }
            if (status$LWS === 2) {
              return resourcePromiseCache$LWS.get(script$LWS3);
            }
          }
        }
        const script$LWS2 = ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, document$LWS, ["script"]);
        script$LWS2.type = "text/javascript";
        script$LWS2._ltngRequireCreated = true;
        ReflectApply$LWS$1(scriptSrcSetterDistortion$LWS, script$LWS2, [urlResolved$LWS]);
        return loadPromise$LWS(script$LWS2, urlResolved$LWS);
      },
      function loadStyle$LWS(_thisArg$LWS, url$LWS) {
        const urlResolved$LWS = resolveURL$LWS(toString$LWS(url$LWS));
        let link$LWS = ReflectApply$LWS$1(ElementProtoQuerySelector$LWS, head$LWS, [`link[href=${enquote$LWS(urlResolved$LWS)}]`]);
        if (link$LWS) {
          var _resourceStatusCache$2$LWS;
          const status$LWS = (_resourceStatusCache$2$LWS = resourceStatusCache$LWS.get(link$LWS)) != null ? _resourceStatusCache$2$LWS : 0;
          if (status$LWS === 0 || status$LWS === 3) {
            return PromiseResolve$LWS(void 0);
          }
          if (status$LWS === 1) {
            return PromiseReject$LWS(createResourceLoadError$LWS(urlResolved$LWS));
          }
          const promise$LWS = status$LWS === 2 ? resourcePromiseCache$LWS.get(link$LWS) : void 0;
          return promise$LWS != null ? promise$LWS : PromiseResolve$LWS(void 0);
        }
        link$LWS = ReflectApply$LWS$1(DocumentProtoCreateElement$LWS$1, document$LWS, ["link"]);
        link$LWS.type = "text/css";
        link$LWS.rel = "stylesheet";
        link$LWS.href = urlResolved$LWS;
        return loadPromise$LWS(link$LWS, urlResolved$LWS);
      }
    ];
  }
  function toSourceText$LWS(value$LWS, sourceType$LWS) {
    let sourceText$LWS = typeof value$LWS === "function" ? extractFunctionBodySource$LWS(value$LWS) : toString$LWS(value$LWS);
    sourceText$LWS = ReflectApply$LWS$1(StringProtoReplace$LWS, sourceText$LWS, [
      /\/\/# sandbox(?=MappingURL=.*?\s*$)/,
      "//# source"
    ]);
    sourceText$LWS = `
//# LWS Version = "0.22.5"
${sourceText$LWS}`;
    return sourceType$LWS === 1 && indexOfPragma$LWS(sourceText$LWS, "use strict") === -1 ? `'use strict';${sourceText$LWS}` : sourceText$LWS;
  }
  const IFRAME_KEEP_ALIVE_FLAG$LWS = LOCKER_UNMINIFIED_FLAG$LWS$1 && true;
  const rootDistortionMapSeedEntries$LWS = [[rootDocument$LWS, rootDocument$LWS], [rootWindowLocation$LWS, rootWindowLocation$LWS], [rootWindow$LWS$1, rootWindow$LWS$1]];
  const seenGlobalObjects$LWS = toSafeWeakSet$LWS$1(new WeakSetCtor$LWS$1());
  function createGetVirtualEnvironment$LWS(record$LWS) {
    let virtualEnvironment$LWS;
    return () => {
      if (virtualEnvironment$LWS === void 0) {
        virtualEnvironment$LWS = createVirtualEnvironment$LWS(record$LWS);
      }
      return virtualEnvironment$LWS;
    };
  }
  function createVirtualEnvironmentEvaluator$LWS(record$LWS, getVirtualEnvironment$LWS) {
    let virtualEnvironment$LWS;
    return (sourceText$LWS) => {
      if (virtualEnvironment$LWS === void 0) {
        virtualEnvironment$LWS = getVirtualEnvironment$LWS();
        const context$LWS = clearEvalContext$LWS();
        setEvalContext$LWS((redEvalHelpersFactory$LWS) => {
          const helpers$LWS = ReflectApply$LWS$1(redEvalHelpersFactory$LWS, void 0, createEvalHelpersFactoryArgs$LWS(record$LWS));
          record$LWS.helpers = helpers$LWS;
          setEvalHelpers$LWS(helpers$LWS);
        });
        virtualEnvironment$LWS.evaluate(EVAL_HELPERS_SOURCE_TEXT$LWS);
        if (typeof context$LWS === "object" && context$LWS !== null) {
          virtualEnvironment$LWS.trackAsFastTarget(context$LWS);
          const ownKeys$LWS = ReflectOwnKeys$LWS$1(context$LWS);
          for (let i$LWS = 0, {
            length: length$LWS2
          } = ownKeys$LWS; i$LWS < length$LWS2; i$LWS += 1) {
            const value$LWS = context$LWS[ownKeys$LWS[i$LWS]];
            if (typeof value$LWS === "object" && value$LWS !== null) {
              virtualEnvironment$LWS.trackAsFastTarget(value$LWS);
            }
          }
        }
        setEvalContext$LWS(context$LWS);
      }
      return virtualEnvironment$LWS.evaluate(sourceText$LWS);
    };
  }
  function createSandboxEvaluator$LWS({
    LOCKER_VERBOSE_INSTRUMENTATION_FLAG: verboseInstrumentation$LWS,
    document: document$LWS,
    globalObject: globalObject$LWS,
    instrumentation: instrumentation$LWS,
    key: key$LWS,
    type: type$LWS
  }) {
    return (sourceText$LWS, evalContext$LWS = EMPTY_OBJECT$LWS, evalGlobalObject$LWS = globalObject$LWS, evalDocument$LWS = document$LWS) => internalEvaluateInSandbox$LWS({
      context: evalContext$LWS,
      document: evalDocument$LWS,
      endowments: EMPTY_OBJECT$LWS,
      globalObject: evalGlobalObject$LWS,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      source: sourceText$LWS,
      sourceType: 0,
      type: type$LWS,
      verboseInstrumentation: verboseInstrumentation$LWS
    });
  }
  function createVirtualEnvironment$LWS(record$LWS) {
    const {
      endowments: endowments$LWS,
      globalObject: globalObject$LWS,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      root: _root$LWS,
      root: {
        distortions: distortions$LWS
      },
      type: type$LWS
    } = record$LWS;
    let remapTypedArrays$LWS = true;
    if (key$LWS === "omnistudio") {
      remapTypedArrays$LWS = false;
    } else if (ReflectApply$LWS$1(StringProtoStartsWith$LWS, key$LWS, ["devopsimpkg"])) {
      remapTypedArrays$LWS = false;
    }
    return createIframeVirtualEnvironment$LWS(globalObject$LWS, {
      defaultPolicy: {
        createScript: (dirty$LWS) => dirty$LWS
      },
      distortionCallback(originalTarget$LWS) {
        const distortedTarget$LWS = distortions$LWS.get(originalTarget$LWS);
        if (distortedTarget$LWS) {
          return distortedTarget$LWS;
        }
        if (typeof originalTarget$LWS === "function") {
          return originalTarget$LWS;
        }
        try {
          if (!ObjectHasOwn$LWS$1(originalTarget$LWS, "location")) {
            return originalTarget$LWS;
          }
        } catch (_unused36$LWS) {
          return originalTarget$LWS;
        }
        let originalTargetDocument$LWS;
        let originalTargetWindow$LWS;
        if (ObjectHasOwn$LWS$1(originalTarget$LWS, "window") && originalTarget$LWS.window === originalTarget$LWS) {
          try {
            originalTargetDocument$LWS = ReflectApply$LWS$1(WindowDocumentGetter$LWS, originalTarget$LWS, []);
            originalTargetWindow$LWS = originalTarget$LWS;
          } catch (_unused37$LWS) {
            try {
              if (ReflectApply$LWS$1(WindowLocationGetter$LWS, originalTarget$LWS, [])) {
                createOpaqueSecondaryWindowSandboxRecord$LWS({
                  globalObject: originalTarget$LWS,
                  key: key$LWS,
                  type: type$LWS
                }, _root$LWS);
                return originalTarget$LWS;
              }
            } catch (_unused38$LWS) {
            }
          }
        } else if ("defaultView" in originalTarget$LWS) {
          let defaultView$LWS;
          try {
            defaultView$LWS = ReflectApply$LWS$1(DocumentProtoDefaultViewGetter$LWS, originalTarget$LWS, []);
          } catch (_unused39$LWS) {
          }
          if (defaultView$LWS) {
            originalTargetDocument$LWS = originalTarget$LWS;
            originalTargetWindow$LWS = defaultView$LWS;
          }
        }
        if (originalTargetWindow$LWS) {
          createSecondaryWindowSandboxRecord$LWS({
            context: EMPTY_OBJECT$LWS,
            document: originalTargetDocument$LWS,
            globalObject: originalTargetWindow$LWS,
            key: key$LWS,
            type: type$LWS
          }, _root$LWS);
        }
        return originalTarget$LWS;
      },
      endowments: endowments$LWS && endowments$LWS !== EMPTY_OBJECT$LWS ? ObjectAssign$LWS$1({}, DEFAULT_ENDOWMENTS_DESCRIPTOR_MAP$LWS, ObjectGetOwnPropertyDescriptors$LWS(endowments$LWS)) : DEFAULT_ENDOWMENTS_DESCRIPTOR_MAP$LWS,
      instrumentation: instrumentation$LWS,
      remapTypedArrays: remapTypedArrays$LWS,
      keepAlive: !remapTypedArrays$LWS && isLockerFeatureEnabled$LWS("isLockerNextForOmnistudioEnabled") || IFRAME_KEEP_ALIVE_FLAG$LWS,
      liveTargetCallback: isTargetLive$LWS,
      signSourceCallback: (sourceText$LWS) => trusted.createScript(sourceText$LWS)
    });
  }
  function getDefaultType$LWS(key$LWS) {
    return key$LWS === CORE_SANDBOX_KEY$LWS ? 1 : 0;
  }
  function createRootWindowSandboxRecord$LWS({
    context: context$LWS = EMPTY_OBJECT$LWS,
    endowments: endowments$LWS = EMPTY_OBJECT$LWS,
    instrumentation: instrumentation$LWS = EMPTY_OBJECT$LWS,
    key: key$LWS,
    type: type$LWS = getDefaultType$LWS(key$LWS),
    verboseInstrumentation: verboseInstrumentation$LWS = false
  }) {
    let record$LWS = rootSandboxRegistry$LWS[key$LWS];
    if (record$LWS) {
      return record$LWS;
    }
    const LOCKER_INSTRUMENTATION_FLAG$LWS = instrumentation$LWS !== EMPTY_OBJECT$LWS && typeof instrumentation$LWS === "object" && instrumentation$LWS !== null;
    const distortions$LWS = createDistortionMap$LWS(rootDistortionMapSeedEntries$LWS);
    record$LWS = {
      BASIC_INSTRUMENTATION_DATA: LOCKER_INSTRUMENTATION_FLAG$LWS ? {
        sandboxKey: key$LWS
      } : EMPTY_OBJECT$LWS,
      LOCKER_INSTRUMENTATION_FLAG: LOCKER_INSTRUMENTATION_FLAG$LWS,
      LOCKER_VERBOSE_INSTRUMENTATION_FLAG: verboseInstrumentation$LWS && LOCKER_INSTRUMENTATION_FLAG$LWS,
      UNCOMPILED_CONTEXT: ROOT_UNCOMPILED_CONTEXT$LWS,
      context: context$LWS,
      document: rootDocument$LWS,
      distortions: distortions$LWS,
      endowments: endowments$LWS,
      globalObject: rootWindow$LWS$1,
      helpers: EMPTY_EVAL_HELPERS$LWS,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      root: EMPTY_OBJECT$LWS,
      sandboxEvaluator: noop$LWS$1,
      type: type$LWS,
      virtualEnvironmentEvaluator: noop$LWS$1
    };
    const getVirtualEnvironment$LWS = createGetVirtualEnvironment$LWS(record$LWS);
    record$LWS.root = record$LWS;
    record$LWS.sandboxEvaluator = createSandboxEvaluator$LWS(record$LWS);
    record$LWS.virtualEnvironmentEvaluator = createVirtualEnvironmentEvaluator$LWS(record$LWS, getVirtualEnvironment$LWS);
    const entries$LWS = createDistortionEntries$LWS(record$LWS, getDistortionFactories$LWS(record$LWS));
    for (let i$LWS = 0, {
      length: length$LWS2
    } = entries$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const {
        0: entryKey$LWS,
        1: entryValue$LWS
      } = entries$LWS[i$LWS];
      distortions$LWS.set(entryKey$LWS, entryValue$LWS);
    }
    rootSandboxRegistry$LWS[key$LWS] = record$LWS;
    return record$LWS;
  }
  function createOpaqueSecondaryWindowSandboxRecord$LWS({
    globalObject: globalObject$LWS,
    key: key$LWS,
    type: type$LWS = getDefaultType$LWS(key$LWS)
  }, _root$LWS) {
    const sandboxRegistry$LWS = getOpaqueSandboxRegistry$LWS(globalObject$LWS);
    let record$LWS = sandboxRegistry$LWS[key$LWS];
    if (record$LWS) {
      return record$LWS;
    }
    const {
      BASIC_INSTRUMENTATION_DATA: BASIC_INSTRUMENTATION_DATA$LWS,
      LOCKER_INSTRUMENTATION_FLAG: LOCKER_INSTRUMENTATION_FLAG$LWS,
      LOCKER_VERBOSE_INSTRUMENTATION_FLAG: LOCKER_VERBOSE_INSTRUMENTATION_FLAG$LWS,
      distortions: distortions$LWS,
      instrumentation: instrumentation$LWS
    } = _root$LWS;
    record$LWS = {
      BASIC_INSTRUMENTATION_DATA: BASIC_INSTRUMENTATION_DATA$LWS,
      LOCKER_INSTRUMENTATION_FLAG: LOCKER_INSTRUMENTATION_FLAG$LWS,
      LOCKER_VERBOSE_INSTRUMENTATION_FLAG: LOCKER_VERBOSE_INSTRUMENTATION_FLAG$LWS,
      UNCOMPILED_CONTEXT: EMPTY_OBJECT$LWS,
      context: EMPTY_OBJECT$LWS,
      document,
      distortions: EMPTY_DISTORTIONS_MAP$LWS,
      endowments: EMPTY_OBJECT$LWS,
      globalObject: globalObject$LWS,
      helpers: EMPTY_EVAL_HELPERS$LWS,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      root: _root$LWS,
      sandboxEvaluator: noop$LWS$1,
      type: type$LWS,
      virtualEnvironmentEvaluator: noop$LWS$1
    };
    const {
      location: location$LWS
    } = globalObject$LWS;
    distortions$LWS.set(location$LWS, location$LWS);
    if (!seenGlobalObjects$LWS.has(globalObject$LWS)) {
      distortions$LWS.set(globalObject$LWS, globalObject$LWS);
    }
    const opaqueWindowPostMessageDistortionFactory$LWS = getOpaqueWindowPostMessageDistortionFactory$LWS(record$LWS);
    const opaqueWindowPostMessageDistortionEntry$LWS = opaqueWindowPostMessageDistortionFactory$LWS(record$LWS);
    const originalOpaqueWindowPostMessage$LWS = opaqueWindowPostMessageDistortionEntry$LWS[0];
    distortions$LWS.set(originalOpaqueWindowPostMessage$LWS, proxyMaskFunctionDistortion$LWS(record$LWS, opaqueWindowPostMessageDistortionFactory$LWS, opaqueWindowPostMessageDistortionEntry$LWS[1], originalOpaqueWindowPostMessage$LWS));
    sandboxRegistry$LWS[key$LWS] = record$LWS;
    return record$LWS;
  }
  function createSecondaryWindowSandboxRecord$LWS({
    globalObject: globalObject$LWS,
    document: document$LWS,
    context: context$LWS = EMPTY_OBJECT$LWS,
    key: key$LWS,
    type: type$LWS = getDefaultType$LWS(key$LWS)
  }, _root$LWS) {
    const sandboxRegistry$LWS = getSandboxRegistry$LWS(document$LWS);
    let record$LWS = sandboxRegistry$LWS[key$LWS];
    if (record$LWS) {
      return record$LWS;
    }
    const {
      BASIC_INSTRUMENTATION_DATA: BASIC_INSTRUMENTATION_DATA$LWS,
      LOCKER_INSTRUMENTATION_FLAG: LOCKER_INSTRUMENTATION_FLAG$LWS,
      LOCKER_VERBOSE_INSTRUMENTATION_FLAG: LOCKER_VERBOSE_INSTRUMENTATION_FLAG$LWS,
      distortions: distortions$LWS,
      instrumentation: instrumentation$LWS
    } = _root$LWS;
    const {
      location: location$LWS,
      top: top$LWS
    } = globalObject$LWS;
    record$LWS = {
      BASIC_INSTRUMENTATION_DATA: BASIC_INSTRUMENTATION_DATA$LWS,
      LOCKER_INSTRUMENTATION_FLAG: LOCKER_INSTRUMENTATION_FLAG$LWS,
      LOCKER_VERBOSE_INSTRUMENTATION_FLAG: LOCKER_VERBOSE_INSTRUMENTATION_FLAG$LWS,
      UNCOMPILED_CONTEXT: {
        [UNCOMPILED_LOCATION_NAME$LWS]: location$LWS,
        [UNCOMPILED_TOP_NAME$LWS]: top$LWS,
        location: location$LWS,
        top: top$LWS
      },
      context: context$LWS,
      document: document$LWS,
      distortions: EMPTY_DISTORTIONS_MAP$LWS,
      endowments: EMPTY_OBJECT$LWS,
      globalObject: globalObject$LWS,
      helpers: EMPTY_EVAL_HELPERS$LWS,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      root: _root$LWS,
      sandboxEvaluator: noop$LWS$1,
      type: type$LWS,
      virtualEnvironmentEvaluator: noop$LWS$1
    };
    const getVirtualEnvironment$LWS = createGetVirtualEnvironment$LWS(record$LWS);
    record$LWS.sandboxEvaluator = createSandboxEvaluator$LWS(record$LWS);
    record$LWS.virtualEnvironmentEvaluator = createVirtualEnvironmentEvaluator$LWS(record$LWS, getVirtualEnvironment$LWS);
    distortions$LWS.set(document$LWS, document$LWS);
    distortions$LWS.set(location$LWS, location$LWS);
    const seenGlobalObject$LWS = seenGlobalObjects$LWS.has(globalObject$LWS);
    if (!seenGlobalObject$LWS) {
      distortions$LWS.set(globalObject$LWS, globalObject$LWS);
    }
    const entries$LWS = createDistortionEntries$LWS(record$LWS, getDistortionFactories$LWS(record$LWS));
    for (let i$LWS = 0, {
      length: length$LWS2
    } = entries$LWS; i$LWS < length$LWS2; i$LWS += 1) {
      const {
        0: entryKey$LWS,
        1: entryValue$LWS
      } = entries$LWS[i$LWS];
      distortions$LWS.set(entryKey$LWS, entryValue$LWS);
    }
    sandboxRegistry$LWS[key$LWS] = record$LWS;
    if (seenGlobalObject$LWS) {
      return record$LWS;
    }
    seenGlobalObjects$LWS.add(globalObject$LWS);
    const onDOMContentLoadedOrWindowLoad$LWS = () => {
      try {
        const {
          document: newDocument$LWS
        } = globalObject$LWS;
        if (document$LWS !== newDocument$LWS) {
          createSecondaryWindowSandboxRecord$LWS({
            context: EMPTY_OBJECT$LWS,
            document: newDocument$LWS,
            globalObject: globalObject$LWS,
            key: key$LWS,
            type: type$LWS
          }, _root$LWS);
        }
      } catch (_unused40$LWS) {
        createOpaqueSecondaryWindowSandboxRecord$LWS({
          globalObject: globalObject$LWS,
          key: key$LWS,
          type: type$LWS
        }, _root$LWS);
      }
    };
    const frameElement$LWS = ReflectApply$LWS$1(WindowFrameElementGetter$LWS, globalObject$LWS, []);
    if (frameElement$LWS) {
      ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, frameElement$LWS, [
        "load",
        onDOMContentLoadedOrWindowLoad$LWS,
        true
      ]);
    } else {
      ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, globalObject$LWS, [
        "unload",
        function onWindowUnload$LWS() {
          WindowQueueMicrotask$LWS(() => {
            try {
              const {
                document: newDocument$LWS
              } = globalObject$LWS;
              if (document$LWS === newDocument$LWS) {
                return;
              }
              ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, globalObject$LWS, ["DOMContentLoaded", onDOMContentLoadedOrWindowLoad$LWS, true]);
              ReflectApply$LWS$1(EventTargetProtoAddEventListener$LWS, globalObject$LWS, ["unload", onWindowUnload$LWS, true]);
            } catch (_unused41$LWS) {
              createOpaqueSecondaryWindowSandboxRecord$LWS({
                globalObject: globalObject$LWS,
                key: key$LWS,
                type: type$LWS
              }, _root$LWS);
            }
          });
        },
        true
      ]);
    }
    return record$LWS;
  }
  function internalEvaluateInSandbox$LWS(evaluateOptions$LWS) {
    const {
      document: document$LWS,
      context: context$LWS,
      endowments: endowments$LWS,
      globalObject: globalObject$LWS,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      source: source$LWS,
      sourceType: sourceType$LWS,
      type: type$LWS,
      verboseInstrumentation: verboseInstrumentation$LWS
    } = evaluateOptions$LWS;
    if (typeof key$LWS !== "string") {
      throw new LockerSecurityError$LWS(ERR_INVALID_SANDBOX_KEY$LWS);
    }
    const {
      LOCKER_INSTRUMENTATION_FLAG: LOCKER_INSTRUMENTATION_FLAG$LWS,
      helpers: helpers$LWS,
      virtualEnvironmentEvaluator: virtualEnvironmentEvaluator$LWS
    } = globalObject$LWS === rootWindow$LWS$1 ? createRootWindowSandboxRecord$LWS({
      context: context$LWS,
      endowments: endowments$LWS,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      type: type$LWS,
      verboseInstrumentation: verboseInstrumentation$LWS
    }) : createSecondaryWindowSandboxRecord$LWS({
      context: context$LWS,
      document: document$LWS,
      globalObject: globalObject$LWS,
      key: key$LWS,
      type: type$LWS
    }, rootSandboxRegistry$LWS[key$LWS]);
    if (context$LWS !== EMPTY_OBJECT$LWS) {
      setEvalContext$LWS(context$LWS);
    }
    if (helpers$LWS !== EMPTY_EVAL_HELPERS$LWS) {
      setEvalHelpers$LWS(helpers$LWS);
    }
    let result$LWS;
    const sourceText$LWS = toSourceText$LWS(source$LWS, sourceType$LWS);
    const activity$LWS = LOCKER_INSTRUMENTATION_FLAG$LWS ? instrumentation$LWS == null ? void 0 : instrumentation$LWS.startActivity("lws.evaluate") : void 0;
    try {
      result$LWS = virtualEnvironmentEvaluator$LWS(sourceText$LWS);
      instrumentation$LWS == null || instrumentation$LWS.incrementCounter == null || instrumentation$LWS.incrementCounter("lws.evaluate", 1, false);
    } catch (error) {
      instrumentation$LWS == null || instrumentation$LWS.incrementCounter == null || instrumentation$LWS.incrementCounter("lws.evaluate", 1, true);
      activity$LWS == null || activity$LWS.error({
        sandboxKey: key$LWS,
        error
      });
      activity$LWS == null || activity$LWS.stop();
      throw error;
    } finally {
      clearEvalContext$LWS();
      clearEvalHelpers$LWS();
    }
    activity$LWS == null || activity$LWS.stop();
    return result$LWS;
  }
  function evaluateFunction$LWS(key$LWS, fn$LWS, scope$LWS = EMPTY_OBJECT$LWS, sourceURL$LWS = "", endowments$LWS = EMPTY_OBJECT$LWS, instrumentation$LWS = EMPTY_OBJECT$LWS, verboseInstrumentation$LWS = false) {
    const argValues$LWS = toSafeArray$LWS$1([rootWindow$LWS$1.location, rootWindow$LWS$1.top]);
    const argNames$LWS = toSafeArray$LWS$1(["location", "top"]);
    const providedScopeNames$LWS = ObjectKeys$LWS$1(scope$LWS);
    for (let i$LWS = 0, {
      length: length$LWS2
    } = providedScopeNames$LWS; i$LWS < length$LWS2; i$LWS++) {
      const name$LWS = providedScopeNames$LWS[i$LWS];
      argNames$LWS.push(name$LWS);
      argValues$LWS.push(scope$LWS[name$LWS]);
    }
    return internalEvaluateInSandbox$LWS({
      context: EMPTY_OBJECT$LWS,
      document: rootDocument$LWS,
      endowments: endowments$LWS,
      globalObject: rootWindow$LWS$1,
      instrumentation: instrumentation$LWS,
      key: key$LWS,
      source: `((${argNames$LWS.join(",")}) => ${fn$LWS})
${sourceURL$LWS}`,
      sourceType: 1,
      type: 0,
      verboseInstrumentation: verboseInstrumentation$LWS
    })(...argValues$LWS);
  }
  const sandboxDependencies$LWS = toSafeMap$LWS$1(new MapCtor$LWS$1());
  const lprDepNames$LWS = toSafeSet$LWS(new SetCtor$LWS$1(["lightning/platformResourceLoader", "lightning:platformResourceLoader", "lightningmobileruntime/platformResourceLoader", "lightningmobileruntime:platformResourceLoader"]));
  function wrapDependency$LWS(dep$LWS, depName$LWS, key$LWS) {
    if (depName$LWS === "lwc" || depName$LWS === "@lwc/engine-dom" || depName$LWS === "@lwc:engine-dom") {
      return wrapLWC$LWS(dep$LWS, key$LWS);
    }
    if (lprDepNames$LWS.has(depName$LWS)) {
      return wrapPlatformResourceLoader$LWS(dep$LWS, key$LWS);
    }
    return dep$LWS;
  }
  function wrapLWC$LWS(dep$LWS, key$LWS) {
    let depRegistry$LWS = sandboxDependencies$LWS.get(key$LWS);
    if (depRegistry$LWS === void 0) {
      depRegistry$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
      sandboxDependencies$LWS.set(key$LWS, depRegistry$LWS);
    }
    let secureDep$LWS = depRegistry$LWS.get(dep$LWS);
    if (secureDep$LWS) {
      return secureDep$LWS;
    }
    secureDep$LWS = ObjectAssign$LWS$1({}, dep$LWS);
    ReflectDefineProperty$LWS$1(secureDep$LWS, "sanitizeAttribute", {
      __proto__: null,
      enumerable: true,
      configurable: true,
      writable: true,
      value(tag$LWS, _namespace$LWS, attrName$LWS, attrValue$LWS) {
        if ((attrName$LWS === "href" || attrName$LWS === "xlink:href") && ReflectApply$LWS$1(StringProtoToLowerCase$LWS, tag$LWS, []) === "use") {
          return sanitizeSvgHref$LWS(attrValue$LWS);
        }
        return attrValue$LWS;
      }
    });
    ReflectDefineProperty$LWS$1(secureDep$LWS, "renderer", {
      __proto__: null,
      enumerable: true,
      configurable: true,
      get: function() {
        let renderer$LWS;
        return function() {
          if (renderer$LWS === void 0) {
            renderer$LWS = createRootWindowSandboxRecord$LWS({
              key: key$LWS
            }).virtualEnvironmentEvaluator(`'use strict';
                    (${ReflectApply$LWS$1(FunctionProtoToString$LWS, dep$LWS.rendererFactory, [])})`)(dep$LWS.renderer);
          }
          return renderer$LWS;
        };
      }(),
      set(_value$LWS) {
      }
    });
    depRegistry$LWS.set(dep$LWS, secureDep$LWS);
    return secureDep$LWS;
  }
  function wrapPlatformResourceLoader$LWS(dep$LWS, key$LWS) {
    let depRegistry$LWS = sandboxDependencies$LWS.get(key$LWS);
    if (depRegistry$LWS === void 0) {
      depRegistry$LWS = toSafeWeakMap$LWS$1(new WeakMapCtor$LWS$1());
      sandboxDependencies$LWS.set(key$LWS, depRegistry$LWS);
    }
    let secureDep$LWS = depRegistry$LWS.get(dep$LWS);
    if (secureDep$LWS) {
      return secureDep$LWS;
    }
    secureDep$LWS = {
      loadScript: (cmp$LWS, url$LWS, config$LWS) => {
        const urlResolved$LWS = resolveURL$LWS(url$LWS);
        const sandbox$LWS = createRootWindowSandboxRecord$LWS({
          key: key$LWS
        });
        if (isGaterEnabledFeature$LWS("enableTrustedMode") && config$LWS != null && config$LWS.trustedMode) {
          const trustedGlobals$LWS = config$LWS.trustedGlobals;
          if ((trustedGlobals$LWS == null ? void 0 : trustedGlobals$LWS.length) > 0) {
            return dep$LWS.loadScript(cmp$LWS, urlResolved$LWS).then(() => {
              const installGlobals$LWS = sandbox$LWS.virtualEnvironmentEvaluator(`(list) => list.forEach(([key, get, set]) => Object.defineProperty(window, key, { get, set, configurable: true, enumerable: true }));`);
              const globals$LWS = trustedGlobals$LWS.map((globalName$LWS) => [globalName$LWS, function get$LWS() {
                return window[globalName$LWS];
              }, function set$LWS(value$LWS) {
                window[globalName$LWS] = value$LWS;
              }]);
              installGlobals$LWS(globals$LWS);
            });
          }
          return dep$LWS.loadScript(cmp$LWS, urlResolved$LWS);
        }
        return sandbox$LWS.helpers.loadScript(cmp$LWS, urlResolved$LWS);
      },
      loadStyle: (cmp$LWS, url$LWS) => {
        const urlResolved$LWS = resolveURL$LWS(url$LWS);
        return createRootWindowSandboxRecord$LWS({
          key: key$LWS
        }).helpers.loadStyle(cmp$LWS, urlResolved$LWS);
      }
    };
    depRegistry$LWS.set(dep$LWS, secureDep$LWS);
    return secureDep$LWS;
  }
  /*! version: 0.22.5 */
  const loaderDefine = globalThis.LWR.define;
  function markLiveObject(object) {
    Reflect.defineProperty(object, Symbol.for("@@lockerLiveValue"), {});
    return object;
  }
  function vNextEvaluateModule(namespace, specifier, exporter) {
    return evaluateFunction$LWS(namespace, exporter, void 0, `//# sourceURL=modules/${specifier}.js
`);
  }
  function secureExporter(specifier, dependencies, exporter, trustedNamespaces) {
    const [namespace, name] = specifier.split("/");
    if (trustedNamespaces.includes(namespace) || trustedNamespaces.includes(`${namespace}/*`) || trustedNamespaces.includes(`${namespace}/${name}`)) {
      return exporter;
    }
    const out = vNextEvaluateModule(namespace, specifier, exporter);
    let exportsIndex = -1;
    let lwcIndex = -1;
    let platformResourceLoaderIndex = -1;
    let lmrPlatformResourceLoaderIndex = -1;
    for (let i = 0; i < dependencies.length; i++) {
      const dependency = dependencies[i];
      const [dependencyName] = dependency.split("/v/");
      switch (dependencyName) {
        case "exports":
          exportsIndex = i;
          break;
        case "lwc":
        case "@lwc/engine-dom":
          lwcIndex = i;
          break;
        case "lightning/platformResourceLoader":
          platformResourceLoaderIndex = i;
          break;
        case "lightningmobileruntime/platformResourceLoader":
          lmrPlatformResourceLoaderIndex = i;
          break;
      }
    }
    if (exportsIndex !== -1 || lwcIndex !== -1 || platformResourceLoaderIndex !== -1) {
      return function(...args) {
        if (exportsIndex !== -1) {
          const arg = args[exportsIndex];
          args[exportsIndex] = markLiveObject(arg) || arg;
        }
        if (lwcIndex !== -1) {
          args[lwcIndex] = wrapDependency$LWS(args[lwcIndex], "lwc", namespace);
        }
        if (platformResourceLoaderIndex !== -1) {
          args[platformResourceLoaderIndex] = wrapDependency$LWS(args[platformResourceLoaderIndex], "lightning/platformResourceLoader", namespace);
        }
        if (lmrPlatformResourceLoaderIndex !== -1) {
          args[lmrPlatformResourceLoaderIndex] = wrapDependency$LWS(args[lmrPlatformResourceLoaderIndex], "lightningmobileruntime/platformResourceLoader", namespace);
        }
        return out.apply(this, args);
      };
    }
    return out;
  }
  function registerLockerDefine(trustedNamespaces) {
    globalThis.LWR = Object.freeze(Object.assign(Object.assign({}, globalThis.LWR), {
      define: function(specifier, dependencies, exporter, signature) {
        if (typeof dependencies === "function") {
          signature = exporter;
          exporter = dependencies;
          dependencies = [];
        }
        loaderDefine(specifier, dependencies, secureExporter(specifier, dependencies, exporter, trustedNamespaces), signature);
      }
    }));
  }
  exports.registerLockerDefine = registerLockerDefine;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/lockerDefine", ["exports", "lwr/lockerDefine/v/0_13_10"], function(e, m) {
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
LWR.define("lwr/init/v/0_13_10", ["exports", "lwr/metrics/v/0_13_10", "lwr/profiler/v/0_13_10", "lwc/v/7_1_5"], function(exports, _0_13_10$1, _0_13_10, _7_1_5) {
  "use strict";
  function hydrateComponentProxy(customElement, Ctor, props) {
    _7_1_5.hydrateComponent(customElement, Ctor, props);
  }
  function initializeWebComponent(elementName, Ctor) {
    return _7_1_5.createElement(elementName, {
      is: Ctor
    });
  }
  function toKebabCase(specifier) {
    return specifier.replace(/\/v\/[a-zA-Z0-9-_.]+$/, "").replace("/", "-").replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
  }
  const CAMEL_REGEX = /-([a-z])/g;
  function getPropFromAttrName(propName) {
    return propName.replace(CAMEL_REGEX, (g) => g[1].toUpperCase());
  }
  function init(rootModules, serverData = {}) {
    if (typeof customElements === "undefined" || typeof document === "undefined") {
      _0_13_10.logOperationStart({
        id: _0_13_10$1.BOOTSTRAP_END
      });
      return;
    }
    _0_13_10.logOperationStart({
      id: _0_13_10$1.INIT
    });
    let index = 0;
    for (const [specifier, ctor] of rootModules) {
      const elementName = toKebabCase(specifier);
      if (!document.body.querySelector(elementName)) {
        _0_13_10.logOperationStart({
          id: _0_13_10$1.INIT_MODULE,
          specifier,
          specifierIndex: ++index
        });
        const component = initializeWebComponent(elementName, ctor);
        const container = document.querySelector("[lwr-root]");
        container ? container.appendChild(component) : document.body.appendChild(component);
        _0_13_10.logOperationEnd({
          id: _0_13_10$1.INIT_MODULE,
          specifier,
          specifierIndex: index,
          metadata: {
            renderMode: "spa"
          }
        });
        continue;
      }
      const elements = document.querySelectorAll(elementName);
      for (const element of elements) {
        _0_13_10.logOperationStart({
          id: _0_13_10$1.INIT_MODULE,
          specifier,
          specifierIndex: ++index
        });
        const propsId = element.dataset.lwrPropsId;
        if (propsId) {
          hydrateComponentProxy(element, ctor, serverData[propsId] || {});
          _0_13_10.logOperationEnd({
            id: _0_13_10$1.INIT_MODULE,
            specifier,
            specifierIndex: index,
            metadata: {
              renderMode: "ssr"
            }
          });
          continue;
        }
        const component = initializeWebComponent(elementName, ctor);
        for (const {
          name,
          value
        } of element.attributes) {
          component.setAttribute(name, value);
          const prop = getPropFromAttrName(name);
          if (prop in component) {
            component[prop] = value;
          }
        }
        while (element.childNodes.length > 0) {
          component.appendChild(element.childNodes[0]);
        }
        const parent = element.parentElement;
        if (parent) {
          parent.replaceChild(component, element);
        }
        _0_13_10.logOperationEnd({
          id: _0_13_10$1.INIT_MODULE,
          specifier,
          specifierIndex: index,
          metadata: {
            renderMode: "csr"
          }
        });
      }
    }
    _0_13_10.logOperationEnd({
      id: _0_13_10$1.INIT
    });
    _0_13_10.logOperationStart({
      id: _0_13_10$1.BOOTSTRAP_END
    });
  }
  exports.getPropFromAttrName = getPropFromAttrName;
  exports.init = init;
  exports.toKebabCase = toKebabCase;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/init", ["exports", "lwr/init/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("hooks/mrtAppLoginPathHook/v/1_66_768-252_0", ["exports", "@app/basePath/v/1", "@communities-webruntime/common/v/1_66_768-252_0"], function(exports, basePath, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  const APP_LOGIN_PATH_SPECIFIER = "@app/loginPath";
  function mrtAppLoginPathHook(serviceAPI) {
    serviceAPI.addLoaderPlugin({
      resolveModule: async (specifier) => {
        if (specifier === APP_LOGIN_PATH_SPECIFIER) {
          return {
            url: `${basePath__default["default"]}/${_1_66_768252_0.WEBRUNTIME_PREFIX}/module/${specifier}`
          };
        }
        return null;
      }
    });
  }
  exports["default"] = mrtAppLoginPathHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("hooks/mrtAppLoginPathHook", ["exports", "hooks/mrtAppLoginPathHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("hooks/mrtFeatureFlagHook/v/1_66_768-252_0", ["exports", "@app/basePath/v/1", "@app/deployTarget/v/1", "@communities-webruntime/common/v/1_66_768-252_0"], function(exports, basePath, deployTarget, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var deployTarget__default = /* @__PURE__ */ _interopDefaultLegacy(deployTarget);
  const SALESFORCE_FEATURE_FLAG_PREFIX = "@salesforce/featureFlag/";
  function mrtFeatureFlagModuleHook(serviceAPI) {
    serviceAPI.addLoaderPlugin({
      resolveModule: async (specifier) => {
        if (deployTarget__default["default"] === "MRT" && specifier.startsWith(SALESFORCE_FEATURE_FLAG_PREFIX)) {
          return {
            url: `${basePath__default["default"]}/${_1_66_768252_0.WEBRUNTIME_PREFIX}/module/${specifier}`
          };
        }
        return null;
      }
    });
  }
  exports["default"] = mrtFeatureFlagModuleHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("hooks/mrtFeatureFlagHook", ["exports", "hooks/mrtFeatureFlagHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("hooks/mrtPermissionsHook/v/1_66_768-252_0", ["exports", "@app/basePath/v/1", "@app/deployTarget/v/1", "@communities-webruntime/common/v/1_66_768-252_0"], function(exports, basePath, deployTarget, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var deployTarget__default = /* @__PURE__ */ _interopDefaultLegacy(deployTarget);
  const PERMISSION_MODULES_PREFIXES_AND_PATH = {
    "@salesforce/userPermission/": "",
    "@salesforce/customPermission/": "custom/",
    "@perm/": ""
  };
  function mrtPermissionsModuleHook(serviceAPI) {
    serviceAPI.addLoaderPlugin({
      resolveModule: async (specifier) => {
        if (deployTarget__default["default"] !== "MRT") {
          return null;
        }
        const prefix = Object.keys(PERMISSION_MODULES_PREFIXES_AND_PATH).find((p) => specifier.startsWith(p));
        if (!prefix) {
          return null;
        }
        const specifierArr = specifier.split("/");
        const permName = specifierArr[specifierArr.length - 1];
        const permPath = PERMISSION_MODULES_PREFIXES_AND_PATH[prefix];
        return {
          url: `${basePath__default["default"]}/${_1_66_768252_0.WEBRUNTIME_PREFIX}/perm/${permPath}${permName}`
        };
      }
    });
  }
  exports["default"] = mrtPermissionsModuleHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("hooks/mrtPermissionsHook", ["exports", "hooks/mrtPermissionsHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("hooks/appUserLoaderHook/v/1_66_768-252_0", ["exports", "@app/basePath/v/1", "@communities-webruntime/common/v/1_66_768-252_0"], function(exports, basePath, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  const APP_USER_SPECIFIER = "@app/user";
  function appUserLoaderHook(serviceAPI) {
    serviceAPI.addLoaderPlugin({
      resolveModule: async (specifier) => {
        if (specifier === APP_USER_SPECIFIER) {
          return {
            url: `${basePath__default["default"]}/${_1_66_768252_0.WEBRUNTIME_PREFIX}/module/${specifier}`
          };
        }
        return null;
      }
    });
  }
  exports["default"] = appUserLoaderHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("hooks/appUserLoaderHook", ["exports", "hooks/appUserLoaderHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("hooks/clientGuestDetectionHook/v/1_66_768-252_0", ["exports", "@app/authenticationCookieName/v/1", "webruntime/utils/v/1_66_768-252_0"], function(exports, authenticationCookieName, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var authenticationCookieName__default = /* @__PURE__ */ _interopDefaultLegacy(authenticationCookieName);
  const APP_USER_SPECIFIER = "@app/user";
  const VERSIONED_APP_USER_SPECIFIER = `${APP_USER_SPECIFIER}/v/1`;
  const {
    LWR: LWR2
  } = globalThis;
  if (authenticationCookieName__default["default"] && !_1_66_768252_0.getCookie(authenticationCookieName__default["default"])) {
    LWR2.define(VERSIONED_APP_USER_SPECIFIER, [APP_USER_SPECIFIER], function(m) {
      return m && typeof m === "object" && "default" in m ? m.default : m;
    });
    LWR2.define(APP_USER_SPECIFIER, ["exports"], (exports2) => {
      exports2.default = {
        isGuest: true,
        id: null,
        csrfToken: null
      };
    });
  }
  function noop() {
  }
  exports["default"] = noop;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("hooks/clientGuestDetectionHook", ["exports", "hooks/clientGuestDetectionHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/dynamicImportResourceHook/v/1_66_768-252_0", ["exports", "@app/basePath/v/1", "@app/versionKey/v/1"], function(exports, basePath, versionKey) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var versionKey__default = /* @__PURE__ */ _interopDefaultLegacy(versionKey);
  function DynamicImportResourceHook(serviceAPI) {
    const resourceUrlSpecifier = "@salesforce/resourceUrl/";
    const resourceUrlResolvedBaseUrl = "resourceUrl://";
    serviceAPI.addLoaderPlugin({
      resolveModule: async (id) => {
        if (id.startsWith(resourceUrlSpecifier)) {
          return {
            url: `${resourceUrlResolvedBaseUrl}${id}`
          };
        }
        return null;
      },
      loadModule: async (url) => {
        if (url.startsWith(resourceUrlResolvedBaseUrl)) {
          const parts = url.split("/");
          const name = parts[parts.length - 1];
          return {
            data: `LWR.define('${resourceUrlSpecifier}${name}', ['exports'], function(exports) {
                        exports.default = '${basePath__default["default"]}/webruntime/org-asset/${versionKey__default["default"]}/resource-name/${name}';
                    });`,
            status: 200
          };
        }
        return null;
      }
    });
  }
  exports["default"] = DynamicImportResourceHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/dynamicImportResourceHook", ["exports", "webruntime/dynamicImportResourceHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("o11y_schema/sf_clwr/v/252_76_0", ["exports"], function(exports) {
  "use strict";
  var app_payload = {namespace: "sf.clwr", name: "AppPayload", pbjsSchema: {nested: {sf: {nested: {clwr: {nested: {AppPayload: {reserved: [[9, 9]], fields: {
    jtbdPhase: {id: 11, type: "string"},
    visd: {id: 1, type: "double"},
    isPreview: {id: 4, type: "bool"},
    jtbdName: {id: 10, type: "string"},
    siteId: {id: 6, type: "string"},
    jtbdCount: {id: 12, type: "uint32"},
    isMobile: {id: 3, type: "bool"},
    lang: {id: 5, type: "string"},
    isDesign: {id: 2, type: "bool"},
    vKey: {id: 7, type: "string"},
    deployTarget: {id: 8, type: "string"}
  }}}}}}}}};
  var nav = {namespace: "sf.clwr", name: "Nav", pbjsSchema: {nested: {sf: {nested: {clwr: {nested: {Nav: {fields: {isIdleHit: {id: 1, type: "bool"}, isManual: {id: 2, type: "bool"}}}}}}}}}};
  var nav_transition = {namespace: "sf.clwr", name: "NavTransition", pbjsSchema: {nested: {sf: {nested: {clwr: {nested: {NavTransition: {fields: {code: {id: 4, type: "string"}, isSsr: {id: 3, type: "bool"}, level: {id: 5, type: "string"}, nextUrl: {id: 1, type: "string"}, type: {id: 2, type: "string"}}}}}}}}}};
  var page_payload = {namespace: "sf.clwr", name: "PagePayload", pbjsSchema: {nested: {sf: {nested: {clwr: {nested: {PagePayload: {fields: {isSsr: {id: 3, type: "bool"}, type: {id: 2, type: "string"}, url: {id: 1, type: "string"}}}}}}}}}};
  var root = {namespace: "sf.clwr", name: "Root", pbjsSchema: {nested: {sf: {nested: {clwr: {nested: {Root: {oneofs: {_bootstrap: {oneof: ["bootstrap"]}, _lwrBootstrap: {oneof: ["lwrBootstrap"]}, _lwrBootstrapError: {oneof: ["lwrBootstrapError"]}}, fields: {sequence: {id: 1, type: "uint32"}, navCount: {id: 2, type: "uint32"}, clickCount: {id: 3, type: "uint32"}, lwrBootstrapError: {options: {proto3_optional: true}, id: 7, type: "string"}, isManual: {id: 4, type: "bool"}, lwrBootstrap: {
    options: {proto3_optional: true},
    id: 6,
    type: "double"
  }, bootstrap: {options: {proto3_optional: true}, id: 5, type: "double"}}}}}}}}}};
  exports.appPayloadSchema = app_payload;
  exports.navSchema = nav;
  exports.navTransitionSchema = nav_transition;
  exports.pagePayloadSchema = page_payload;
  exports.rootSchema = root;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("o11y_schema/sf_clwr", ["exports", "o11y_schema/sf_clwr/v/252_76_0"], function(e, m) {
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
LWR.define("o11y/web_vitals/v/252_11_0", ["exports", "o11y/client/v/1", "o11y/shared/v/1", "o11y_schema/sf_instrumentation/v/252_76_0"], function(exports, _1$1, _1, _252_76_0) {
  "use strict";
  var e, n, t, i, r, a = -1, o = function(e2) {
    addEventListener("pageshow", function(n2) {
      n2.persisted && (a = n2.timeStamp, e2(n2));
    }, true);
  }, c = function() {
    return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  }, u = function() {
    var e2 = c();
    return e2 && e2.activationStart || 0;
  }, f = function(e2, n2) {
    var t2 = c(), i2 = "navigate";
    a >= 0 ? i2 = "back-forward-cache" : t2 && (document.prerendering || u() > 0 ? i2 = "prerender" : document.wasDiscarded ? i2 = "restore" : t2.type && (i2 = t2.type.replace(/_/g, "-")));
    return {
      name: e2,
      value: n2 === void 0 ? -1 : n2,
      rating: "good",
      delta: 0,
      entries: [],
      id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
      navigationType: i2
    };
  }, s = function(e2, n2, t2) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e2)) {
        var i2 = new PerformanceObserver(function(e3) {
          Promise.resolve().then(function() {
            n2(e3.getEntries());
          });
        });
        return i2.observe(Object.assign({
          type: e2,
          buffered: true
        }, t2 || {})), i2;
      }
    } catch (e3) {
    }
  }, d = function(e2, n2, t2, i2) {
    var r2, a2;
    return function(o2) {
      n2.value >= 0 && (o2 || i2) && ((a2 = n2.value - (r2 || 0)) || r2 === void 0) && (r2 = n2.value, n2.delta = a2, n2.rating = function(e3, n3) {
        return e3 > n3[1] ? "poor" : e3 > n3[0] ? "needs-improvement" : "good";
      }(n2.value, t2), e2(n2));
    };
  }, l = function(e2) {
    requestAnimationFrame(function() {
      return requestAnimationFrame(function() {
        return e2();
      });
    });
  }, p = function(e2) {
    var n2 = function(n3) {
      n3.type !== "pagehide" && document.visibilityState !== "hidden" || e2(n3);
    };
    addEventListener("visibilitychange", n2, true), addEventListener("pagehide", n2, true);
  }, v = function(e2) {
    var n2 = false;
    return function(t2) {
      n2 || (e2(t2), n2 = true);
    };
  }, m = -1, h = function() {
    return document.visibilityState !== "hidden" || document.prerendering ? 1 / 0 : 0;
  }, g = function(e2) {
    document.visibilityState === "hidden" && m > -1 && (m = e2.type === "visibilitychange" ? e2.timeStamp : 0, T());
  }, y = function() {
    addEventListener("visibilitychange", g, true), addEventListener("prerenderingchange", g, true);
  }, T = function() {
    removeEventListener("visibilitychange", g, true), removeEventListener("prerenderingchange", g, true);
  }, E = function() {
    return m < 0 && (m = h(), y(), o(function() {
      setTimeout(function() {
        m = h(), y();
      }, 0);
    })), {
      get firstHiddenTime() {
        return m;
      }
    };
  }, C = function(e2) {
    document.prerendering ? addEventListener("prerenderingchange", function() {
      return e2();
    }, true) : e2();
  }, L = [1800, 3e3], w = function(e2, n2) {
    n2 = n2 || {}, C(function() {
      var t2, i2 = E(), r2 = f("FCP"), a2 = s("paint", function(e3) {
        e3.forEach(function(e4) {
          e4.name === "first-contentful-paint" && (a2.disconnect(), e4.startTime < i2.firstHiddenTime && (r2.value = Math.max(e4.startTime - u(), 0), r2.entries.push(e4), t2(true)));
        });
      });
      a2 && (t2 = d(e2, r2, L, n2.reportAllChanges), o(function(i3) {
        r2 = f("FCP"), t2 = d(e2, r2, L, n2.reportAllChanges), l(function() {
          r2.value = performance.now() - i3.timeStamp, t2(true);
        });
      }));
    });
  }, b = [0.1, 0.25], S = function(e2, n2) {
    n2 = n2 || {}, w(v(function() {
      var t2, i2 = f("CLS", 0), r2 = 0, a2 = [], c2 = function(e3) {
        e3.forEach(function(e4) {
          if (!e4.hadRecentInput) {
            var n3 = a2[0], t3 = a2[a2.length - 1];
            r2 && e4.startTime - t3.startTime < 1e3 && e4.startTime - n3.startTime < 5e3 ? (r2 += e4.value, a2.push(e4)) : (r2 = e4.value, a2 = [e4]);
          }
        }), r2 > i2.value && (i2.value = r2, i2.entries = a2, t2());
      }, u2 = s("layout-shift", c2);
      u2 && (t2 = d(e2, i2, b, n2.reportAllChanges), p(function() {
        c2(u2.takeRecords()), t2(true);
      }), o(function() {
        r2 = 0, i2 = f("CLS", 0), t2 = d(e2, i2, b, n2.reportAllChanges), l(function() {
          return t2();
        });
      }), setTimeout(t2, 0));
    }));
  }, A = {
    passive: true,
    capture: true
  }, I = new Date(), P = function(i2, r2) {
    e || (e = r2, n = i2, t = new Date(), k(removeEventListener), F());
  }, F = function() {
    if (n >= 0 && n < t - I) {
      var r2 = {
        entryType: "first-input",
        name: e.type,
        target: e.target,
        cancelable: e.cancelable,
        startTime: e.timeStamp,
        processingStart: e.timeStamp + n
      };
      i.forEach(function(e2) {
        e2(r2);
      }), i = [];
    }
  }, M = function(e2) {
    if (e2.cancelable) {
      var n2 = (e2.timeStamp > 1e12 ? new Date() : performance.now()) - e2.timeStamp;
      e2.type == "pointerdown" ? function(e3, n3) {
        var t2 = function() {
          P(e3, n3), r2();
        }, i2 = function() {
          r2();
        }, r2 = function() {
          removeEventListener("pointerup", t2, A), removeEventListener("pointercancel", i2, A);
        };
        addEventListener("pointerup", t2, A), addEventListener("pointercancel", i2, A);
      }(n2, e2) : P(n2, e2);
    }
  }, k = function(e2) {
    ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(n2) {
      return e2(n2, M, A);
    });
  }, D = [100, 300], x = function(t2, r2) {
    r2 = r2 || {}, C(function() {
      var a2, c2 = E(), u2 = f("FID"), l2 = function(e2) {
        e2.startTime < c2.firstHiddenTime && (u2.value = e2.processingStart - e2.startTime, u2.entries.push(e2), a2(true));
      }, m2 = function(e2) {
        e2.forEach(l2);
      }, h2 = s("first-input", m2);
      a2 = d(t2, u2, D, r2.reportAllChanges), h2 && p(v(function() {
        m2(h2.takeRecords()), h2.disconnect();
      })), h2 && o(function() {
        var o2;
        u2 = f("FID"), a2 = d(t2, u2, D, r2.reportAllChanges), i = [], n = -1, e = null, k(addEventListener), o2 = l2, i.push(o2), F();
      });
    });
  }, B = 0, R = 1 / 0, H = 0, N = function(e2) {
    e2.forEach(function(e3) {
      e3.interactionId && (R = Math.min(R, e3.interactionId), H = Math.max(H, e3.interactionId), B = H ? (H - R) / 7 + 1 : 0);
    });
  }, O = function() {
    return r ? B : performance.interactionCount || 0;
  }, q = function() {
    "interactionCount" in performance || r || (r = s("event", N, {
      type: "event",
      buffered: true,
      durationThreshold: 0
    }));
  }, j = [200, 500], _ = 0, z = function() {
    return O() - _;
  }, G = [], J = {}, K = function(e2) {
    var n2 = G[G.length - 1], t2 = J[e2.interactionId];
    if (t2 || G.length < 10 || e2.duration > n2.latency) {
      if (t2)
        t2.entries.push(e2), t2.latency = Math.max(t2.latency, e2.duration);
      else {
        var i2 = {
          id: e2.interactionId,
          latency: e2.duration,
          entries: [e2]
        };
        J[i2.id] = i2, G.push(i2);
      }
      G.sort(function(e3, n3) {
        return n3.latency - e3.latency;
      }), G.splice(10).forEach(function(e3) {
        delete J[e3.id];
      });
    }
  }, Q = function(e2, n2) {
    n2 = n2 || {}, C(function() {
      var t2;
      q();
      var i2, r2 = f("INP"), a2 = function(e3) {
        e3.forEach(function(e4) {
          (e4.interactionId && K(e4), e4.entryType === "first-input") && !G.some(function(n4) {
            return n4.entries.some(function(n5) {
              return e4.duration === n5.duration && e4.startTime === n5.startTime;
            });
          }) && K(e4);
        });
        var n3, t3 = (n3 = Math.min(G.length - 1, Math.floor(z() / 50)), G[n3]);
        t3 && t3.latency !== r2.value && (r2.value = t3.latency, r2.entries = t3.entries, i2());
      }, c2 = s("event", a2, {
        durationThreshold: (t2 = n2.durationThreshold) !== null && t2 !== void 0 ? t2 : 40
      });
      i2 = d(e2, r2, j, n2.reportAllChanges), c2 && ("PerformanceEventTiming" in window && "interactionId" in PerformanceEventTiming.prototype && c2.observe({
        type: "first-input",
        buffered: true
      }), p(function() {
        a2(c2.takeRecords()), r2.value < 0 && z() > 0 && (r2.value = 0, r2.entries = []), i2(true);
      }), o(function() {
        G = [], _ = O(), r2 = f("INP"), i2 = d(e2, r2, j, n2.reportAllChanges);
      }));
    });
  }, U = [2500, 4e3], V = {}, W = function(e2, n2) {
    n2 = n2 || {}, C(function() {
      var t2, i2 = E(), r2 = f("LCP"), a2 = function(e3) {
        var n3 = e3[e3.length - 1];
        n3 && n3.startTime < i2.firstHiddenTime && (r2.value = Math.max(n3.startTime - u(), 0), r2.entries = [n3], t2());
      }, c2 = s("largest-contentful-paint", a2);
      if (c2) {
        t2 = d(e2, r2, U, n2.reportAllChanges);
        var m2 = v(function() {
          V[r2.id] || (a2(c2.takeRecords()), c2.disconnect(), V[r2.id] = true, t2(true));
        });
        ["keydown", "click"].forEach(function(e3) {
          addEventListener(e3, function() {
            return setTimeout(m2, 0);
          }, true);
        }), p(m2), o(function(i3) {
          r2 = f("LCP"), t2 = d(e2, r2, U, n2.reportAllChanges), l(function() {
            r2.value = performance.now() - i3.timeStamp, V[r2.id] = true, t2(true);
          });
        });
      }
    });
  }, X = [800, 1800], Y = function e2(n2) {
    document.prerendering ? C(function() {
      return e2(n2);
    }) : document.readyState !== "complete" ? addEventListener("load", function() {
      return e2(n2);
    }, true) : setTimeout(n2, 0);
  }, Z = function(e2, n2) {
    n2 = n2 || {};
    var t2 = f("TTFB"), i2 = d(e2, t2, X, n2.reportAllChanges);
    Y(function() {
      var r2 = c();
      if (r2) {
        var a2 = r2.responseStart;
        if (a2 <= 0 || a2 > performance.now())
          return;
        t2.value = Math.max(a2 - u(), 0), t2.entries = [r2], i2(true), o(function() {
          t2 = f("TTFB", 0), (i2 = d(e2, t2, X, n2.reportAllChanges))(true);
        });
      }
    });
  };
  const webVitalsVersion = "3.5.2";
  exports.WebVitalsMetrics = void 0;
  (function(WebVitalsMetrics) {
    WebVitalsMetrics[WebVitalsMetrics["CLS"] = 0] = "CLS";
    WebVitalsMetrics[WebVitalsMetrics["FCP"] = 1] = "FCP";
    WebVitalsMetrics[WebVitalsMetrics["FID"] = 2] = "FID";
    WebVitalsMetrics[WebVitalsMetrics["LCP"] = 3] = "LCP";
    WebVitalsMetrics[WebVitalsMetrics["TBT"] = 4] = "TBT";
    WebVitalsMetrics[WebVitalsMetrics["TTFB"] = 5] = "TTFB";
    WebVitalsMetrics[WebVitalsMetrics["INP"] = 6] = "INP";
  })(exports.WebVitalsMetrics || (exports.WebVitalsMetrics = {}));
  const defaultMetrics = [exports.WebVitalsMetrics.CLS, exports.WebVitalsMetrics.FCP, exports.WebVitalsMetrics.FID, exports.WebVitalsMetrics.LCP, exports.WebVitalsMetrics.TTFB, exports.WebVitalsMetrics.INP];
  class WebVitals {
    constructor() {
      this._isInitialized = false;
      this._safety = new _1.PublicSafety();
      this._instr = _1$1.getInstrumentation("WebVitals");
    }
    activate(__instr, metrics) {
      this._safety.tryCatch(() => {
        if (this._isInitialized) {
          throw new Error("WebVitals is already activated.");
        }
        _1.utility.requireArgumentIfDefined(metrics, "metrics", Array);
        this._isInitialized = true;
        const metricSet = new Set(metrics || defaultMetrics);
        if (metricSet.delete(exports.WebVitalsMetrics.CLS)) {
          S(this._logHandler.bind(this));
        }
        if (metricSet.delete(exports.WebVitalsMetrics.FCP)) {
          w(this._activityHandler.bind(this));
        }
        if (metricSet.delete(exports.WebVitalsMetrics.FID)) {
          x(this._logHandler.bind(this));
        }
        if (metricSet.delete(exports.WebVitalsMetrics.LCP)) {
          W(this._activityHandler.bind(this));
        }
        if (metricSet.delete(exports.WebVitalsMetrics.TTFB)) {
          Z(this._activityHandler.bind(this));
        }
        if (metricSet.delete(exports.WebVitalsMetrics.INP)) {
          Q(this._activityHandler.bind(this));
        }
        if (metricSet.size > 0) {
          const unsupported = JSON.stringify(Array.from(metricSet.keys()));
          this._instr.error(`Unsupported WebVital metrics: ${unsupported}`);
        }
      });
    }
    _getPayload(metric) {
      return {
        name: metric.name,
        value: metric.value,
        delta: metric.delta,
        id: metric.id,
        navType: metric.navigationType,
        wvVersion: webVitalsVersion
      };
    }
    _logHandler(metric) {
      this._instr.log(_252_76_0.webVitalsSchema, this._getPayload(metric));
    }
    _activityHandler(metric) {
      let perfStartOverride = 0;
      let perfStopOverride = metric.value;
      if (metric.name === "INP") {
        const firstEntry = metric.entries[0];
        perfStartOverride += firstEntry.startTime;
        perfStopOverride += firstEntry.startTime;
      }
      this._instr.startActivity(metric.name).stop(_252_76_0.webVitalsSchema, this._getPayload(metric), {
        perfStartOverride,
        perfStopOverride
      });
    }
  }
  const webVitals = new WebVitals();
  exports.webVitals = webVitals;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("o11y/web_vitals", ["exports", "o11y/web_vitals/v/252_11_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("o11y_schema/version/v/252_76_0", ["exports"], function(exports) {
  "use strict";
  var version = "252.76.0";
  exports.version = version;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("o11y_schema/version", ["exports", "o11y_schema/version/v/252_76_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/o11yHook/v/1_66_768-252_0", ["exports", "lwr/loaderLegacy/v/0_13_10", "@app/basePath/v/1", "@app/isDesignMode/v/1", "webruntime/o11y/v/1", "o11y/client/v/1", "o11y_schema/version/v/252_76_0", "o11y/web_vitals/v/252_11_0", "webruntime/transport/v/1", "webruntime/dispatcher/v/1", "@communities-webruntime/common/v/1_66_768-252_0", "o11y_schema/sf_clwr/v/252_76_0", "o11y/shared/v/1", "@app/isMobileAppMode/v/1", "@app/isPreviewMode/v/1", "@app/versionKey/v/1", "@app/deployTarget/v/1", "@salesforce/i18n/lang/v/1", "@salesforce/site/Id/v/1"], function(exports, _0_13_10, basePath, isDesignMode, webruntimeO11y, _1$1, _252_76_0$1, _252_11_0, transport, dispatcher, _1_66_768252_0, _252_76_0, _1, isMobileAppMode, isPreviewMode, versionKey, deployTarget, lang, siteId) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
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
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var isDesignMode__default = /* @__PURE__ */ _interopDefaultLegacy(isDesignMode);
  var webruntimeO11y__namespace = /* @__PURE__ */ _interopNamespace(webruntimeO11y);
  var transport__namespace = /* @__PURE__ */ _interopNamespace(transport);
  var dispatcher__default = /* @__PURE__ */ _interopDefaultLegacy(dispatcher);
  var isMobileAppMode__default = /* @__PURE__ */ _interopDefaultLegacy(isMobileAppMode);
  var isPreviewMode__default = /* @__PURE__ */ _interopDefaultLegacy(isPreviewMode);
  var versionKey__default = /* @__PURE__ */ _interopDefaultLegacy(versionKey);
  var deployTarget__default = /* @__PURE__ */ _interopDefaultLegacy(deployTarget);
  var lang__default = /* @__PURE__ */ _interopDefaultLegacy(lang);
  var siteId__default = /* @__PURE__ */ _interopDefaultLegacy(siteId);
  const CORE_UPLOAD_THRESHOLD = 5e4;
  const MAX_IDLE_WAIT_MSECS = 3e3;
  const MIN_ROOT_ACTIVITY_DURATION_MSECS = 300;
  const INSTR_APP_NAME = "lwr_experience";
  const VERSION = "246";
  const CONFIG_URL = `/${_1_66_768252_0.WEBRUNTIME_PREFIX}/o11y/${VERSION}/config`;
  const TOKEN_URL = `/${_1_66_768252_0.WEBRUNTIME_PREFIX}/o11y/${VERSION}/token`;
  const INVALID_API_ENDPOINT = "O11Y_ENDPOINT_NOT_CONFIGURED";
  const KNOWN_RECEIVER_ORIGINS = [/\.force\.com(:\d+)?$/, /\.salesforce\.com(:\d+)?$/];
  const defaultServerConfig = {
    coreEnabled: false,
    coreSamplingRate: 0,
    coreRelativeEndpoint: "",
    falconEnabled: false,
    falconSamplingRate: 0,
    falconAbsoluteEndpoint: "",
    traceSamplingRate: false ? 0 : 1,
    isGuestApiEnabled: false,
    logPerfResTiming: ""
  };
  const randomPerApp = Math.random();
  const clientConfig = Object.assign({}, defaultServerConfig, {
    token: ""
  });
  const isProduction = false;
  if (isProduction) {
    _1.utility.markProduction();
  }
  let disallowCoreAccess = true;
  async function initConfig(transportFetch2) {
    const userModule = await _0_13_10.load("@app/user/v/1");
    const user = userModule.default;
    const isGuest = user.isGuest;
    const init = {
      headers: {
        Accept: "text/plain",
        "Content-Type": null
      },
      basePath: basePath__default["default"],
      isNonApiRequest: true,
      o11y: {
        skipInstr: true
      }
    };
    function getPath(url) {
      return isGuest ? `${url}?asGuest=true` : url;
    }
    const srvConfigJson = await transportFetch2(getPath(CONFIG_URL), init).then((resp) => resp.text());
    new _1.PublicSafety().tryCatch(() => {
      const srvConfig = JSON.parse(srvConfigJson);
      Object.keys(clientConfig).forEach((key) => {
        const value = srvConfig[key];
        const expectedType = typeof clientConfig[key];
        if (expectedType === "string" && value === "" || _1.utility.requireArgumentIfDefined(value, `srvConfig.${key}`, expectedType)) {
          clientConfig[key] = srvConfig[key];
        }
      });
    });
    disallowCoreAccess = usesConnectApi() && !clientConfig.isGuestApiEnabled && isGuest;
    if (shouldUploadToFalcon()) {
      clientConfig.token = await transportFetch2(getPath(TOKEN_URL), init).then((resp) => resp.text());
    }
  }
  function getRawConfig() {
    return clientConfig;
  }
  function canUploadToEndpoint(enabled, apiEndpoint) {
    return enabled && apiEndpoint !== "" && apiEndpoint !== INVALID_API_ENDPOINT;
  }
  function willSampleLog(sampleRate) {
    return !isProduction || sampleRate > 0 && sampleRate >= randomPerApp;
  }
  function shouldUploadToCore() {
    return !disallowCoreAccess && canUploadToEndpoint(clientConfig.coreEnabled, clientConfig.coreRelativeEndpoint) && willSampleLog(clientConfig.coreSamplingRate);
  }
  function shouldUploadToFalcon() {
    return canUploadToEndpoint(clientConfig.falconEnabled, clientConfig.falconAbsoluteEndpoint) && willSampleLog(clientConfig.falconSamplingRate);
  }
  function usesConnectApi() {
    const index = clientConfig.coreRelativeEndpoint?.indexOf("services/data/");
    return index === 0 || index === 1;
  }
  function useApiBasePath() {
    const ep = clientConfig.coreRelativeEndpoint || "";
    return usesConnectApi() && ep.length > 1 && ep[0] !== "/";
  }
  function sampleRootActivity() {
    const randomPerInvocation = Math.random();
    const rate = clientConfig.traceSamplingRate || 0;
    return rate > 0 && rate >= randomPerInvocation;
  }
  function getKnownReceiverOrigins() {
    return KNOWN_RECEIVER_ORIGINS.slice();
  }
  const actOptionsStartAtZero = {
    perfStartOverride: 0
  };
  let debugMsg;
  class O11yRoutingSupport {
    constructor(o11yApp) {
      this._rootPayload = {
        sequence: 0,
        navCount: 0,
        clickCount: 0,
        isManual: false,
        bootstrap: void 0,
        lwrBootstrap: void 0,
        lwrBootstrapError: void 0
      };
      this._navPayload = {
        isIdleHit: false,
        isManual: false
      };
      this._hadRootActivity = false;
      this._hadNavActivity = false;
      this._isFirstNavActivity = true;
      const debugMode = true;
      debugMsg = (msg) => debugMode && console.log(`O11YR ${msg}`);
      debugMsg("Started");
      this._o11yApp = o11yApp;
      document.body.addEventListener("click", this._handleClick.bind(this), {
        capture: true,
        passive: true
      });
      window.addEventListener("visibilitychange", this._handleVisibilityChange.bind(this));
    }
    _handleClick() {
      if (!this._rootActivity && this._hadFirstRootActivity) {
        this._startRoot();
      } else {
        this._rootPayload.clickCount += 1;
      }
    }
    _handleVisibilityChange() {
      const isHide = document.visibilityState === "hidden";
      debugMsg(isHide ? "Hide" : "Show");
      if (isHide) {
        this._stopNavTransition();
        this._stopNav();
        this._stopRoot(false);
      } else {
        if (this._hadRootActivity) {
          this._startRoot(true);
        }
        if (this._hadNavActivity && !this._navActivity) {
          this._startNav(this._navData, true);
        }
      }
    }
    get _isFirstRootActivity() {
      return this._rootPayload.sequence === 1;
    }
    get _hadFirstRootActivity() {
      return this._rootPayload.sequence > 0;
    }
    _startRoot(isManual = false) {
      if (this._rootActivity) {
        this._stopRoot(false);
      }
      if (this._hadFirstRootActivity) {
        this._rootPayload.clickCount = 0;
        this._rootPayload.navCount = 0;
      }
      this._rootPayload.sequence += 1;
      this._rootPayload.isManual = isManual;
      this._rootActivity = this._o11yApp.startRootActivity("root", void 0, sampleRootActivity());
      this._hadRootActivity = true;
      debugMsg(`Root Started ${this._rootActivity.getId()}`);
      _1$1.idleDetector.requestIdleDetectedCallback(() => {
        this._stopRoot(true);
      });
    }
    _stopRoot(idleStop) {
      if (!this._rootActivity) {
        return;
      }
      debugMsg(`Root Stop ${idleStop ? "idle" : "busy"} ${this._rootActivity.getId()}`);
      try {
        if (!this._isFirstRootActivity && this._rootPayload.navCount === 0 && _1$1.time().perfNow - this._rootActivity.getStartPerfTime() < MIN_ROOT_ACTIVITY_DURATION_MSECS) {
          this._rootActivity.discard();
          this._rootPayload.sequence -= 1;
          return;
        }
        if (this._isFirstRootActivity) {
          this._rootPayload.bootstrap = this._getMetricValueByName(`${_1_66_768252_0.WEBRUNTIME_PREFIX}-app-bootstrap`, "duration");
          this._rootPayload.lwrBootstrap = this._getMetricValueByName("lwr.bootstrap.end", "startTime");
        }
        const options = this._isFirstRootActivity ? actOptionsStartAtZero : void 0;
        if (idleStop) {
          this._rootActivity.stop(_252_76_0.rootSchema, this._rootPayload, options);
        } else {
          this._rootActivity.terminate(_252_76_0.rootSchema, this._rootPayload, options);
        }
      } finally {
        this._rootActivity = void 0;
        this._hadRootActivity = false;
      }
    }
    _startNav(data, isManual) {
      this._stopNav();
      this._navPayload.isIdleHit = false;
      this._navPayload.isManual = isManual;
      this._rootPayload.navCount += 1;
      this._navData = data ? {
        url: data.url,
        pageRef: data.pageRef,
        isSsr: data.isSsr
      } : void 0;
      this._navActivity = this._o11yApp.startActivity("navigation");
      this._hadNavActivity = true;
      debugMsg(`Nav Started ${this._navActivity.getId()}`);
      _1$1.idleDetector.requestIdleDetectedCallback(() => {
        debugMsg(`Nav Idle ${this._navActivity?.getId()}`);
        this._navPayload.isIdleHit = true;
      });
    }
    _stopNav() {
      if (this._navActivity) {
        debugMsg(`Nav Stop ${this._navActivity.getId()}`);
        try {
          const options = this._isFirstNavActivity ? actOptionsStartAtZero : void 0;
          this._isFirstNavActivity = false;
          this._navActivity.stop(_252_76_0.navSchema, this._navPayload, options);
        } finally {
          this._navActivity = void 0;
        }
      }
    }
    _startNavTransition(data) {
      if (this._navTransitionActivity) {
        this._stopNavTransition(void 0, true);
      }
      this._navTransitionData = data;
      this._navTransitionActivity = this._o11yApp.startActivity("navigation transition");
      debugMsg(`Trans Started ${this._navTransitionActivity.getId()}`);
    }
    _stopNavTransition(errorData, shouldTerminate = false) {
      if (this._navTransitionActivity) {
        debugMsg(`Trans ${shouldTerminate ? "Terminate" : "Stop"} ${this._navTransitionActivity.getId()}`);
        try {
          if (errorData) {
            const {
              code,
              message,
              level
            } = errorData;
            const levelText = ["Fatal", "Error", "Warning", "Log"][level];
            this._navTransitionActivity.error(message, _252_76_0.navTransitionSchema, {
              code: code?.toString(),
              level: levelText
            });
          }
          const payload = this._navTransitionData ? {
            nextUrl: this._navTransitionData.url,
            type: this._navTransitionData.pageRef?.type,
            isSsr: this._navTransitionData.isSsr
          } : void 0;
          if (shouldTerminate) {
            this._navTransitionActivity.terminate(_252_76_0.navTransitionSchema, payload);
          } else {
            this._navTransitionActivity.stop(_252_76_0.navTransitionSchema, payload);
          }
        } finally {
          this._navTransitionActivity = void 0;
          this._navTransitionData = void 0;
        }
      }
    }
    _getMetricValueByName(metricName, property) {
      if (typeof window.performance?.getEntriesByName !== "function") {
        return 0;
      }
      const appBootstrap = window.performance.getEntriesByName(metricName);
      return appBootstrap[0]?.[property] || 0;
    }
    preNavigate(data) {
      this._startNavTransition({
        url: data.next.url,
        pageRef: data.next.route.pageReference,
        isSsr: data.next.routeDefinition?.bootstrap?.ssr
      });
    }
    postNavigate(data) {
      this._stopNavTransition();
      this._startNav({
        url: data.url,
        pageRef: data.route.pageReference,
        isSsr: data.routeDefinition?.bootstrap?.ssr
      }, false);
    }
    errorNavigate(data) {
      debugMsg(`Err level ${data?.level}: ${data?.code}`);
      this._stopNavTransition(data);
    }
    getCurrentPageData() {
      if (this._navData) {
        const {
          pageRef,
          url,
          isSsr
        } = this._navData;
        return {
          url,
          type: pageRef?.type,
          isSsr
        };
      }
      return void 0;
    }
    startFirstRootActivity() {
      if (!this._hadFirstRootActivity) {
        this._startRoot();
      }
    }
  }
  class O11yAppPayloadProvider {
    constructor() {
      this._totalVisibleDuration = 0;
      this._isVisible = document?.visibilityState === "visible";
      if (this._isVisible) {
        this._lastVisibleTime = 0;
      }
      window?.addEventListener("visibilitychange", this._handleVisibilityChange.bind(this));
    }
    _handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        this._isVisible = false;
        if (this._lastVisibleTime !== void 0) {
          const perfNow = _1$1.time().perfNow;
          this._totalVisibleDuration += perfNow - this._lastVisibleTime;
          this._lastVisibleTime = perfNow;
        }
      } else {
        this._isVisible = true;
        this._lastVisibleTime = _1$1.time().perfNow;
      }
    }
    getPayload() {
      const _durationSinceLastRecorded = this._isVisible && this._lastVisibleTime !== void 0 ? _1$1.time().perfNow - this._lastVisibleTime : 0;
      const payload = {
        isDesign: isDesignMode__default["default"],
        isMobile: isMobileAppMode__default["default"],
        isPreview: isPreviewMode__default["default"],
        lang: lang__default["default"],
        siteId: siteId__default["default"],
        vKey: versionKey__default["default"],
        visd: this._totalVisibleDuration + _durationSinceLastRecorded,
        deployTarget: deployTarget__default["default"]
      };
      return {
        schema: _252_76_0.appPayloadSchema,
        payload
      };
    }
  }
  class O11yPagePayloadProvider {
    linkWithRouterSupport(routerSupport) {
      this._routingSupport = routerSupport;
    }
    getPayload() {
      if (this._routingSupport) {
        const payload = this._routingSupport.getCurrentPageData();
        if (payload) {
          if (payload.type === "standard__search") {
            payload.url = this._redactSearchTerm(payload.url);
          }
          return {
            schema: _252_76_0.pagePayloadSchema,
            payload
          };
        }
      }
      return void 0;
    }
    _redactSearchTerm(url) {
      if (url) {
        const lastSlashIndex = url.lastIndexOf("/");
        if (lastSlashIndex !== -1) {
          return `${url.substring(0, lastSlashIndex + 1)}MASKED_SEARCH_INFO`;
        }
      }
      return url;
    }
  }
  let protoEncoderFunc;
  let prevLogPerformance;
  const o11y = Object.assign(webruntimeO11y__namespace._o11y, {
    clientVersion: _1$1._version,
    schemaVersion: _252_76_0$1.version,
    upload: uploadAsNeededAsync
  });
  const versionLabel = `${_1$1._version}:${_252_76_0$1.version}`;
  const transportFetch = transport__namespace.fetch;
  async function hookO11ySetup(serviceApi) {
    const isProduction2 = false;
    try {
      if (typeof window === "undefined") {
        o11y.isUnavailable = true;
        return;
      }
      const o11yOpConfig = getO11yOpConfig(isProduction2);
      const pagePayloadProvider = new O11yPagePayloadProvider();
      o11y.app = _1$1.registerInstrumentedApp(INSTR_APP_NAME, {
        isProduction: isProduction2,
        enableBuffering: true,
        appPayloadProvider: new O11yAppPayloadProvider(),
        pagePayloadProvider,
        operationMode: o11yOpConfig.operationMode,
        allowedReceiverOrigins: o11yOpConfig.allowedReceiverOrigins
      });
      if (!isProduction2) {
        o11y.app.log(`o11y ${versionLabel}`);
      }
      observeModuleLoaderEvents();
      o11y.routingSupport = new O11yRoutingSupport(o11y.app);
      pagePayloadProvider.linkWithRouterSupport(o11y.routingSupport);
      if (!isProduction2) {
        o11y.routingSupport.startFirstRootActivity();
      }
      initNetworkInstrumentation(o11y.app, true);
      _252_11_0.webVitals.activate();
      o11y.consoleCollector = setupConsoleCollector(isProduction2, o11y.app);
      if (Array.isArray(window.o11yLogCollectors)) {
        window.o11yLogCollectors.forEach((e) => {
          o11y.app?.registerLogCollector(e.collector, e.options);
        });
      }
      await initConfig(transportFetch);
      if (isProduction2) {
        o11y.routingSupport.startFirstRootActivity();
      }
      initNetworkInstrumentation(o11y.app);
      await waitForLoad();
      await setupSimpleLogger(o11y.app, serviceApi.appMetadata.bootstrapModule, `o11y ${versionLabel}`);
    } catch (err) {
      if (!isProduction2) {
        throw err;
      }
      try {
        console?.error("Failed to start o11y", err);
      } catch {
      }
    } finally {
      try {
        o11y.app?.disableBuffering();
      } catch {
      }
    }
  }
  function initNetworkInstrumentation(o11yApp, firstTime) {
    let logPerformance = getRawConfig().logPerfResTiming;
    if (logPerformance !== "basic" && logPerformance !== "full") {
      logPerformance = false;
    }
    if (firstTime || prevLogPerformance !== logPerformance) {
      prevLogPerformance = logPerformance;
      o11yApp.networkInstrumentation({
        logPerformanceActivityName: "network",
        tracingHeadersOptions: {
          useB3Headers: true
        },
        logPerformance,
        skipUrls: [/\?.*o11y=\d+/]
      });
    }
  }
  function addEventListenersForUpload() {
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        uploadAsNeededAsync(true);
      }
    });
  }
  async function waitForLoad() {
    const waitForIdleWithTimeout = (resolve) => {
      let resolved = false;
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }, MAX_IDLE_WAIT_MSECS);
      _1$1.idleDetector.requestIdleDetectedCallback(() => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      });
    };
    return new Promise((resolve) => {
      if (document.readyState === "complete") {
        waitForIdleWithTimeout(resolve);
      } else {
        window.addEventListener("load", () => waitForIdleWithTimeout(resolve));
      }
    });
  }
  async function initSimpleCollector(o11yApp, environment) {
    const [simpleCollectorModule, collectorsModule] = await Promise.all([_0_13_10.load("o11y/simple_collector/v/252_11_0"), _0_13_10.load("o11y/collectors/v/252_11_0")]);
    protoEncoderFunc = (collectorsModule.default || collectorsModule).encodeCoreEnvelopeContentsRaw;
    const simpleCollector = new (simpleCollectorModule.default || simpleCollectorModule).SimpleCollector({
      environment
    });
    o11yApp.registerLogCollector(simpleCollector, {
      retroactive: true
    });
    o11yApp.registerMetricsCollector(simpleCollector);
    return simpleCollector;
  }
  function uploadAsNeededAsync(ignoreThreshold = false) {
    const promises = [];
    const doCore = shouldUploadToCore();
    const doFalcon = shouldUploadToFalcon();
    const simpleCollector = o11y.simpleCollector;
    if (simpleCollector?.hasData && (doCore || doFalcon) && (ignoreThreshold || simpleCollector.estimatedByteSize >= CORE_UPLOAD_THRESHOLD)) {
      const rawContents = simpleCollector.getRawContentsOfCoreEnvelope();
      const binary = protoEncoderFunc(rawContents);
      if (doCore) {
        promises.push(uploadToCoreAsync(binary));
      }
      if (doFalcon) {
        promises.push(uploadToFalconAsync(binary));
      }
    }
    return Promise.allSettled(promises);
  }
  function uploadToCoreAsync(binary) {
    const fromCharCode = String.fromCharCode;
    const output = [];
    for (let i = 0, length = binary.length; i < length; i++) {
      output.push(fromCharCode(binary[i]));
    }
    const b64 = window.btoa(output.join(""));
    const options = {
      method: "POST",
      body: JSON.stringify({
        base64Env: b64
      }),
      keepalive: true,
      isNonApiRequest: !usesConnectApi(),
      o11y: {
        skipInstr: true
      }
    };
    let path = getRawConfig().coreRelativeEndpoint;
    if (useApiBasePath()) {
      if (path[0] !== "/") {
        path = `/${path}`;
      }
    } else {
      options.basePath = basePath__default["default"];
    }
    return transportFetch(path, options);
  }
  function uploadToFalconAsync(binary) {
    const config = getRawConfig();
    const reqInit = {
      method: "POST",
      body: binary,
      headers: {
        "x-sfdc-o11y-token": config.token || "",
        "Content-Type": "application/octet-stream"
      },
      keepalive: true,
      o11y: {
        skipInstr: true
      }
    };
    return fetch(config.falconAbsoluteEndpoint, reqInit);
  }
  function getO11yOpConfig(isProduction2) {
    let operationMode;
    let allowedReceiverOrigins;
    if (window.parent !== window && isDesignMode__default["default"]) {
      operationMode = "sender";
      allowedReceiverOrigins = getKnownReceiverOrigins();
      if (!isProduction2) {
        allowedReceiverOrigins.unshift("*");
      }
    }
    return {
      operationMode,
      allowedReceiverOrigins
    };
  }
  function observeModuleLoaderEvents() {
    const moduleFetchTasker = _1$1.idleDetector.declareNotifierTaskMulti("o11y LWR module fetch");
    dispatcher__default["default"]?.((info) => {
      if (info.id === "lwr.loader.module.fetch") {
        if (info.phase === 0) {
          moduleFetchTasker.add();
        } else {
          moduleFetchTasker.done();
        }
      } else if (info.id === "lwr.loader.module.error") {
        moduleFetchTasker.done();
      } else if (info.id === "lwr.bootstrap.end" || info.id === "lwr.bootstrap.error") {
        globalThis.performance.mark(info.id);
      }
    });
  }
  function setupConsoleCollector(isProduction2, o11yApp) {
    const consoleCollector = new _1$1.ConsoleCollector();
    if (isProduction2) {
      consoleCollector.addFilter("sfcore.customCmp.CustomComponentLog");
    }
    o11yApp.registerLogCollector(consoleCollector, {
      retroactive: true
    });
    return consoleCollector;
  }
  async function setupSimpleLogger(o11yApp, appName, sdkVersion) {
    if (shouldUploadToCore() || shouldUploadToFalcon()) {
      o11y.simpleCollector = await initSimpleCollector(o11yApp, {
        appName,
        sdkVersion
      });
      addEventListenersForUpload();
      await uploadAsNeededAsync(true);
    }
  }
  exports["default"] = hookO11ySetup;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/o11yHook", ["exports", "webruntime/o11yHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/globalErrorHandler/v/1_66_768-252_0", ["@communities-webruntime/common/v/1_66_768-252_0", "@app/basePath/v/1"], function(_1_66_768252_0, basePath) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  const {
    window: window2
  } = globalThis;
  function sendClientErrorToServer(payload) {
    const url = basePath__default["default"] + _1_66_768252_0.ERRORS_PATH_PREFIX;
    const body = JSON.stringify(payload);
    const sentBeacon = window2 && window2.navigator && window2.navigator.sendBeacon && window2.navigator.sendBeacon(url, body);
    if (!sentBeacon) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
    }
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
    error = {},
    extra,
    type = _1_66_768252_0.CLIENT_ERROR_TYPES.UNKNOWN_ERROR
  }) {
    let message, stack, wcstack;
    if (error) {
      message = error.message;
      stack = error.stack;
      wcstack = error.wcstack;
    } else if (extra) {
      message = extra.message;
    }
    const {
      pathname,
      hostname
    } = window2.location;
    const location = {
      pathname,
      hostname
    };
    const payload = {
      subject,
      message,
      stack,
      wcstack,
      extra,
      location
    };
    dispatchClientError(payload, type);
    sendClientErrorToServer(payload);
  }
  window2?.addEventListener("error", (event = {}) => {
    const {
      message,
      filename,
      lineno,
      colno,
      error
    } = event;
    reportError({
      subject: "window error",
      error,
      extra: {
        message,
        filename,
        lineno,
        colno
      }
    });
  });
  window2?.addEventListener("unhandledrejection", (event = {}) => {
    const {
      reason = {}
    } = event;
    reportError({
      subject: "unhandledrejection",
      error: reason
    });
  });
});
LWR.define("webruntime/globalErrorHandler", ["exports", "webruntime/globalErrorHandler/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/guestUuidCookieGenerator/v/1_66_768-252_0", ["webruntime/utils/v/1_66_768-252_0", "@app/guestUuidCookieName/v/1"], function(_1_66_768252_0, guestUuidCookieName) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var guestUuidCookieName__default = /* @__PURE__ */ _interopDefaultLegacy(guestUuidCookieName);
  const DEFAULT_CONFIG = {
    guestUuidCookieMaxAge: 365 * 24 * 60 * 60
  };
  const {
    document: document2
  } = globalThis;
  if (document2 && guestUuidCookieName__default["default"]) {
    let idValue = _1_66_768252_0.getCookie(guestUuidCookieName__default["default"]);
    if (!_1_66_768252_0.uuidValidate(idValue)) {
      idValue = _1_66_768252_0.uuidv4();
    }
    document2.cookie = `${guestUuidCookieName__default["default"]}=${idValue};Max-Age=${DEFAULT_CONFIG.guestUuidCookieMaxAge};SameSite=LAX;Path=/`;
    const experienceInteractionDetails = {
      name: "set-guest-uuid",
      guestUuid: idValue
    };
    document2.dispatchEvent(new CustomEvent("experience_interaction", {
      bubbles: true,
      composed: true,
      detail: experienceInteractionDetails
    }));
  }
});
LWR.define("webruntime/guestUuidCookieGenerator", ["exports", "webruntime/guestUuidCookieGenerator/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/clientPluginService/v/1_66_768-252_0", ["exports", "o11y/client/v/1"], function(exports, _1) {
  "use strict";
  const EXP_TAG_MGR_LOGGER_KEY = "EXPERIENCE-TAG-MANAGER";
  async function load() {
    if (window) {
      const expTagMgrLogger = _1.getInstrumentation(EXP_TAG_MGR_LOGGER_KEY);
      window.WEBSDK = window.WEBSDK || {};
      window.WEBSDK.sendEngagementEvent = (schema, payload) => expTagMgrLogger.log(schema, payload);
    }
  }
  const {
    error
  } = console;
  async function loadPlugins() {
    await Promise.all([load()]).catch(error);
  }
  exports.loadPlugins = loadPlugins;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/clientPluginService", ["exports", "webruntime/clientPluginService/v/1_66_768-252_0"], function(e, m) {
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
LWR.define("webruntime/mobileUtils/v/1_66_768-252_0", ["exports", "@app/isMobileAppMode/v/1", "@communities-webruntime/common/v/1_66_768-252_0"], function(exports, isMobileAppMode, _1_66_768252_0) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var isMobileAppMode__default = /* @__PURE__ */ _interopDefaultLegacy(isMobileAppMode);
  function isMobileApp() {
    const userAgent = globalThis.navigator?.userAgent;
    return userAgent && (isMobileAppMode__default["default"] && userAgent.includes(_1_66_768252_0.MOBILE_APP_USER_AGENTS.PUBLISHER) || userAgent.includes(_1_66_768252_0.MOBILE_APP_USER_AGENTS.PLAYGROUND));
  }
  exports.isMobileApp = isMobileApp;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/mobileUtils", ["exports", "webruntime/mobileUtils/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/mobileModuleInit/v/1_66_768-252_0", ["exports", "lwr/loaderLegacy/v/0_13_10", "webruntime/mobileUtils/v/1_66_768-252_0", "webruntime/routingService/v/1", "webruntime/logger/v/1_66_768-252_0"], function(exports, _0_13_10, _1_66_768252_0$1, _1, _1_66_768252_0) {
  "use strict";
  function mobileEventsBridge() {
    registerEvents();
    _1.subscribe(routeComplete);
  }
  function registerEvents() {
    document.addEventListener("notify-client-module", notifyClientModule);
  }
  function routeComplete(routeResult) {
    notifyMobileModule("navigationcompleted", {
      routeResult
    });
  }
  function notifyClientModule({
    detail
  }) {
    const {
      action,
      data
    } = detail;
    switch (action) {
      case "navigate":
        _1.navigate(data.routeObj, data.replaceState);
        break;
      default:
        _1_66_768252_0.log(`No such action "${action}" exists.`);
        break;
    }
  }
  function notifyMobileModule(action, data) {
    document.dispatchEvent(new CustomEvent("notify-mobile-module", {
      bubbles: true,
      composed: true,
      detail: {
        action,
        data
      }
    }));
  }
  async function mobileModuleInit() {
    if (!_1_66_768252_0$1.isMobileApp()) {
      return;
    }
    const {
      hybridAppManager
    } = await _0_13_10.load("mobileruntime/hybridAppManager/v/1");
    hybridAppManager();
    mobileEventsBridge();
  }
  exports.mobileModuleInit = mobileModuleInit;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/mobileModuleInit", ["exports", "webruntime/mobileModuleInit/v/1_66_768-252_0"], function(e, m) {
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
LWR.define("webruntime/clientHook/v/1_66_768-252_0", ["exports", "@communities-webruntime/common/v/1_66_768-252_0", "webruntime/f6Controller/v/1_66_768-252_0", "webruntime/mobileModuleInit/v/1_66_768-252_0", "webruntime/routingService/v/1", "webruntime/mobileUtils/v/1_66_768-252_0", "webruntime/utils/v/1_66_768-252_0", "@app/uiBasePath/v/1", "@app/deployTarget/v/1", "webruntime/clientPluginService/v/1_66_768-252_0", "webruntime/guestUuidCookieGenerator/v/1_66_768-252_0", "webruntime/globalErrorHandler/v/1_66_768-252_0"], function(exports, _1_66_768252_0, _1_66_768252_0$1, _1_66_768252_0$2, _1, _1_66_768252_0$4, _1_66_768252_0$5, basePath, deployTarget, _1_66_768252_0$3, _1_66_768252_0$6, _1_66_768252_0$7) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var deployTarget__default = /* @__PURE__ */ _interopDefaultLegacy(deployTarget);
  function handleClick(evt) {
    const link = evt.composedPath().find((el) => el.tagName === "A");
    if (!link || evt.defaultPrevented || _1_66_768252_0$4.isMobileApp())
      return;
    let href = link.getAttribute("href");
    if (!href || href.includes("#"))
      return;
    const url = new URL(href, window.location.href);
    const isWebLink = url?.protocol === "http:" || url?.protocol === "https:";
    const isExternal = _1_66_768252_0$5.isAbsoluteURL(href);
    if (!(isExternal || href.startsWith("/"))) {
      href = window.location.pathname + href;
    } else if (basePath__default["default"].endsWith("/s") && href.startsWith(basePath__default["default"])) {
      href = href.replace("/s/", "/");
    }
    const isValidUrl = isExternal || Boolean(_1.router.matchRoute(href));
    const targetTab = link.getAttribute("target");
    const isForCurrentTab = !targetTab && !isExternal || targetTab === "_self" || targetTab === window.name || targetTab === "_top" && window.top === window || targetTab === "_parent" && window.parent === window;
    const shouldRoute = isWebLink && isValidUrl && isForCurrentTab ^ isExternal;
    if (shouldRoute) {
      evt.preventDefault();
      _1.navigate({
        type: "standard__webPage",
        attributes: {
          url: href
        }
      });
    }
  }
  async function clientHook() {
    if (deployTarget__default["default"] === "MRT") {
      _1.initializeServerRouter(globalThis.window);
    }
    window?.addEventListener("click", handleClick);
    window?.performance.measure(`${_1_66_768252_0.WEBRUNTIME_PREFIX}-app-bootstrap`);
    _1_66_768252_0$1.createF6Controller();
    await _1_66_768252_0$2.mobileModuleInit();
    await _1_66_768252_0$3.loadPlugins();
  }
  exports["default"] = clientHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/clientHook", ["exports", "webruntime/clientHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("webruntime/hook/v/1_66_768-252_0", ["exports"], function(exports) {
  "use strict";
  var inlinedModules = ["@app/apexApiBasePath", "@app/apiBasePath", "@app/authenticationCookieName", "@app/basePath", "@app/guestUuidCookieName", "@app/isDesignMode", "@app/isPreviewMode", "@app/isMobileAppMode", "@app/loginPath", "@app/deployTarget", "@app/routes", "@app/extraRouteParams", "@app/templateDevName", "@app/uiBasePath", "@app/versionKey", "@app/viewToThemeLayoutMap", "@app/views", "@salesforce/community/basePath", "@salesforce/i18n/lang", "@salesforce/site/Id", "@salesforce/webstore/Id", "webruntime/dispatcher"];
  const designBundled = ["webruntimedesign/componentWrapper", "webruntimedesign/regionWrapper", "webruntimedesign/dropRegion", "webruntimedesign/componentService", "webruntimedesign/designComponent"];
  const frameworkInlinedModules = ["o11y/simple_collector", "o11y/collectors", "mobileruntime/hybridAppManager"];
  function communitiesHook(serviceAPI) {
    serviceAPI.addLoaderPlugin({
      resolveModule: async (id) => {
        const [specifier] = id.split("/v/");
        if (id.endsWith("/v/version-not-provided")) {
          return specifier;
        }
        if (frameworkInlinedModules.includes(specifier)) {
          return specifier;
        }
        if (specifier && (designBundled.includes(specifier) || inlinedModules.includes(specifier))) {
          return specifier;
        }
        if (specifier === "@salesforce/loader") {
          return "lwr/loaderLegacy/v/0_13_10";
        }
        return null;
      }
    });
  }
  exports["default"] = communitiesHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/hook", ["exports", "webruntime/hook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/serverDataCallback/v/0_13_10", ["exports"], function(exports) {
  "use strict";
  const serverDataCallbacks = [];
  function registerServerDataCallbacks(hook) {
    serverDataCallbacks.push(hook);
  }
  function evaluateServerDataCallbacks(serverData = {}) {
    for (const serverDataCallback of serverDataCallbacks) {
      serverDataCallback({
        serverData
      });
    }
  }
  exports.evaluateServerDataCallbacks = evaluateServerDataCallbacks;
  exports.registerServerDataCallbacks = registerServerDataCallbacks;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/serverDataCallback", ["exports", "lwr/serverDataCallback/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("lwr/preInit/v/0_13_10", ["exports"], function(exports) {
  "use strict";
  const lwrGlobals = globalThis.LWR;
  if (lwrGlobals.define || lwrGlobals.env) {
    globalThis.LWR = Object.freeze({
      define: lwrGlobals.define,
      env: lwrGlobals.env
    });
  } else {
    delete globalThis.LWR;
  }
  function getClientBootstrapConfig() {
    return lwrGlobals;
  }
  exports.getClientBootstrapConfig = getClientBootstrapConfig;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("lwr/preInit", ["exports", "lwr/preInit/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("@lwrjs/app-service/communities_app_native/module/amd/v/0_13_10", ["lwr/loaderLegacy/v/0_13_10", "lwr/preInit/v/0_13_10", "lwr/serverDataCallback/v/0_13_10", "webruntime/bootstrapHook/v/1_66_768-252_0", "webruntime/hook/v/1_66_768-252_0", "webruntime/clientHook/v/1_66_768-252_0", "webruntime/o11yHook/v/1_66_768-252_0", "webruntime/dynamicImportResourceHook/v/1_66_768-252_0", "hooks/clientGuestDetectionHook/v/1_66_768-252_0", "hooks/appUserLoaderHook/v/1_66_768-252_0", "hooks/mrtPermissionsHook/v/1_66_768-252_0", "hooks/mrtFeatureFlagHook/v/1_66_768-252_0", "hooks/mrtAppLoginPathHook/v/1_66_768-252_0", "lwr/init/v/0_13_10", "lwr/lockerDefine/v/0_13_10"], function(_0_13_10, _0_13_10$3, _0_13_10$1, loaderService_webruntime_bootstrapHook, loaderService_webruntime_hook, loaderService_webruntime_clientHook, loaderService_webruntime_o11yHook, loaderService_webruntime_dynamicImportResourceHook, loaderService_hooks_clientGuestDetectionHook, loaderService_hooks_appUserLoaderHook, loaderService_hooks_mrtPermissionsHook, loaderService_hooks_mrtFeatureFlagHook, loaderService_hooks_mrtAppLoginPathHook, _0_13_10$4, _0_13_10$2) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var loaderService_webruntime_bootstrapHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_webruntime_bootstrapHook);
  var loaderService_webruntime_hook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_webruntime_hook);
  var loaderService_webruntime_clientHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_webruntime_clientHook);
  var loaderService_webruntime_o11yHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_webruntime_o11yHook);
  var loaderService_webruntime_dynamicImportResourceHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_webruntime_dynamicImportResourceHook);
  var loaderService_hooks_clientGuestDetectionHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_hooks_clientGuestDetectionHook);
  var loaderService_hooks_appUserLoaderHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_hooks_appUserLoaderHook);
  var loaderService_hooks_mrtPermissionsHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_hooks_mrtPermissionsHook);
  var loaderService_hooks_mrtFeatureFlagHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_hooks_mrtFeatureFlagHook);
  var loaderService_hooks_mrtAppLoginPathHook__default = /* @__PURE__ */ _interopDefaultLegacy(loaderService_hooks_mrtAppLoginPathHook);
  loaderService_webruntime_bootstrapHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_webruntime_hook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_webruntime_clientHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_webruntime_o11yHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_webruntime_dynamicImportResourceHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_hooks_clientGuestDetectionHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_hooks_appUserLoaderHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_hooks_mrtPermissionsHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_hooks_mrtFeatureFlagHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  loaderService_hooks_mrtAppLoginPathHook__default["default"]({..._0_13_10.services, addServerDataCallback: _0_13_10$1.registerServerDataCallbacks});
  _0_13_10$2.registerLockerDefine(["@locker/*", "lwr/*", "@lwrjs/*", "lwc", "@lwc/*", "lwr", "assert", "logger", "webruntime", "webruntime/*", "mobileruntime/hybridAppManager", "@view", "@view/*", "@app", "@app/*", "@design", "@design/*", "@lwrjs", "webruntimedesign", "webruntimedesign/*", "@luvio", "@luvio/*", "aura-instrumentation", "aura", "instrumentation/service", "instrumentation/utility", "aura-storage", "transport", "wire-service", "force/ldsAdaptersAnalyticsDataService", "force/ldsAdaptersAnalyticsSmartDataDiscovery", "force/ldsAdaptersAnalyticsWave", "force/ldsAdaptersAnalyticsWavePrivate", "force/ldsAdaptersApex", "force/ldsAdaptersCmsAuthoring", "force/ldsAdaptersCmsDelivery", "force/ldsAdaptersCmsType", "force/ldsAdaptersCommerceCatalog", "force/ldsAdaptersCommerceSearch", "force/ldsAdaptersCommerceStorePricing", "force/ldsAdaptersCommunityMicrobatching", "force/ldsAdaptersCommunityNavigationMenu", "force/ldsAdaptersCommunitySeo", "force/ldsAdaptersCommunitySitesSearch", "force/ldsAdaptersExperienceMarketingIntegration", "force/ldsAdaptersGraphql", "force/ldsAdaptersIndustriesCib", "force/ldsAdaptersIndustriesClm", "force/ldsAdaptersIndustriesDecisionMatrixDesigner", "force/ldsAdaptersIndustriesEinsteinAiaccelerator", "force/ldsAdaptersIndustriesExplainability", "force/ldsAdaptersIndustriesHealthcloudHpi", "force/ldsAdaptersIndustriesIdentityverification", "force/ldsAdaptersIndustriesInteresttagging", "force/ldsAdaptersIndustriesLoyaltyEngine", "force/ldsAdaptersIndustriesPublicSector", "force/ldsAdaptersIndustriesRcgTenantmanagement", "force/ldsAdaptersIndustriesRuleBuilder", "force/ldsAdaptersIndustriesSustainabilityBei", "force/ldsAdaptersIndustriesSustainabilityDgf", "force/ldsAdaptersIndustriesSustainabilityRecalculate", "force/ldsAdaptersIndustriesSustainabilityRecordLockunlock", "force/ldsAdaptersIndustriesSustainabilityReferenceData", "force/ldsAdaptersIndustriesTimeline", "force/ldsAdaptersIndustriesVideovisits", "force/ldsAdaptersMarketingAssetcreation", "force/ldsAdaptersPlatformAdminSuccessGuidance", "force/ldsAdaptersPlatformFlow", "force/ldsAdaptersPlatformFlowBuilder", "force/ldsAdaptersPlatformInteractionOrchestrator", "force/ldsAdaptersPlatformLearningContent", "force/ldsAdaptersPlatformScaleCenter", "force/ldsAdaptersRevenueBillingBatch", "force/ldsAdaptersUiapi", "force/ldsBindings", "force/ldsEngine", "force/luvioEngine", "force/ldsEngineCreator", "force/ldsEngineWebruntime", "force/ldsEnvironmentSettings", "force/ldsInstrumentation", "force/ldsNetwork", "force/ldsRecordData", "force/ldsStorage", "force/mobileCapabilities", "force/ldsAdaptersAnalyticsTableauEmbedding", "runtime_hybrid_capabilities/nativeCapabilities", "o11y", "o11y/*", "@o11y", "@o11y/*", "@salesforce", "@udd", "@perm", "@branding", "@salesforce/*", "@udd/*", "@perm/*", "@branding/*", "trustedDesign/shadowDomUtils", "community_builder/seoAssistant", "community_case/supportQuickActionLayout", "community_runtime/utils", "community_user/userSettings", "embeddedMessaging/container", "experience_messaging/embeddedMessaging", "community_login/checkEmail", "community_login/forgotPassword", "community_login/loginForm", "community_login/loginUtils", "community_login/selfRegister", "community_login/socialLogin", "b2c_lite_commerce/cartApi", "b2c_lite_commerce/checkout", "b2c_lite_commerce/checkoutApi", "b2c_lite_commerce/checkoutApiDataSource", "b2c_lite_commerce/checkoutRequestRetry", "b2c_lite_commerce/context", "b2c_lite_commerce/data", "b2c_lite_commerce/einsteinActivitiesApi", "b2c_lite_commerce/einsteinApi", "b2c_lite_commerce/einsteinProductAndPriceApi", "b2c_lite_commerce/heroBannerUi", "b2c_lite_commerce/myAccountMenu", "b2c_lite_commerce/orderSummary", "b2c_lite_commerce/store", "lightning", "lightning/*", "interop/button", "interop/buttonIcon", "dxp_page_layout/placeHolderDesign", "community_builder/richTextEditor", "dxp_form/baseForm", "dxp_form/contactForm", "dxp_form/dynamicForm", "dxp_form/layoutUtils", "dxp_form/leadForm", "dxp_base/languageSelector", "dxp_search/siteResults", "dxp_flowruntime", "dxp_flowruntime/*", "dxp_action/umaFormSubmissionAction", "flowruntime", "flowruntime/*", "experience/store", "experience/data", "experience/util", "experience/cmsDeliveryApi", "experience/luvioRuntime", "experience/personalizationApi", "experience/personalizationApiInternal", "experience/seoPropertiesApi", "experience/seoPropertiesApiInternal", "experience/userApi", "experience/userApiInternal", "wave", "wave/*", "tableau/tableauViz", "tableau/tableauPulse"]);
  const clientBootstrapConfig = _0_13_10$3.getClientBootstrapConfig();
  const {serverData, rootComponents} = clientBootstrapConfig;
  _0_13_10$1.evaluateServerDataCallbacks(serverData);
  Promise.all(rootComponents.map(async (rootSpecifier) => {
    const element = _0_13_10$4.toKebabCase(rootSpecifier);
    return _0_13_10.load(rootSpecifier, "@lwrjs/app-service/communities_app_native/module/amd/v/0_13_10").then(({default: Ctor}) => {
      _0_13_10$4.init([[element, Ctor]], serverData);
    });
  }));
});
LWR.define("@lwrjs/app-service/communities_app_native/module/amd", ["exports", "@lwrjs/app-service/communities_app_native/module/amd/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
