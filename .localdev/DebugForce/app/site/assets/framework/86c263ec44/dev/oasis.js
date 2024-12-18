(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const { getOwnPropertyDescriptor: getOwnPropertyDescriptor$3 } = Object;
    const { DOCUMENT_POSITION_CONTAINED_BY, DOCUMENT_POSITION_CONTAINS, DOCUMENT_POSITION_PRECEDING, DOCUMENT_POSITION_FOLLOWING, ELEMENT_NODE, TEXT_NODE, CDATA_SECTION_NODE, PROCESSING_INSTRUCTION_NODE, COMMENT_NODE, DOCUMENT_FRAGMENT_NODE, } = Node;
    const { appendChild, cloneNode, compareDocumentPosition, insertBefore, removeChild, replaceChild, hasChildNodes, getRootNode, } = Node.prototype;
    const firstChildGetter = getOwnPropertyDescriptor$3(Node.prototype, 'firstChild').get;
    const lastChildGetter = getOwnPropertyDescriptor$3(Node.prototype, 'lastChild').get;
    getOwnPropertyDescriptor$3(Node.prototype, 'textContent').get;
    const parentNodeGetter = getOwnPropertyDescriptor$3(Node.prototype, 'parentNode').get;
    getOwnPropertyDescriptor$3(Node.prototype, 'ownerDocument')
        .get;
    const parentElementGetter = getOwnPropertyDescriptor$3(Node.prototype, 'parentElement')
        .get;
    const textContextGetter = getOwnPropertyDescriptor$3(Node.prototype, 'textContent').get;
    const childNodesGetter = getOwnPropertyDescriptor$3(Node.prototype, 'childNodes').get;
    getOwnPropertyDescriptor$3(Node.prototype, 'isConnected').get;

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const { getOwnPropertyDescriptor: getOwnPropertyDescriptor$2, hasOwnProperty: hasOwnProperty$2 } = Object;
    const { addEventListener, getAttribute, getBoundingClientRect, getElementsByTagName: getElementsByTagName$2, getElementsByTagNameNS: getElementsByTagNameNS$2, getElementsByClassName: getElementsByClassName$2, matches: matches$1, closest: closest$1, hasAttribute, querySelector: querySelector$2, querySelectorAll: querySelectorAll$2, removeAttribute, removeEventListener, setAttribute, } = Element.prototype;
    hasOwnProperty$2.call(Element.prototype, 'attachShadow')
        ? Element.prototype.attachShadow
        : () => {
            throw new TypeError('attachShadow() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill and use Lightning Web Components');
        };
    const childElementCountGetter = getOwnPropertyDescriptor$2(Element.prototype, 'childElementCount').get;
    const firstElementChildGetter = getOwnPropertyDescriptor$2(Element.prototype, 'firstElementChild').get;
    const lastElementChildGetter = getOwnPropertyDescriptor$2(Element.prototype, 'lastElementChild').get;
    const innerHTMLDescriptor = getOwnPropertyDescriptor$2(Element.prototype, 'innerHTML');
    const innerHTMLGetter = innerHTMLDescriptor.get;
    innerHTMLDescriptor.set;
    const outerHTMLDescriptor = getOwnPropertyDescriptor$2(Element.prototype, 'outerHTML');
    const outerHTMLGetter = outerHTMLDescriptor.get;
    outerHTMLDescriptor.set;
    const tagNameGetter = getOwnPropertyDescriptor$2(Element.prototype, 'tagName').get;
    const tabIndexDescriptor = getOwnPropertyDescriptor$2(HTMLElement.prototype, 'tabIndex');
    tabIndexDescriptor.get;
    tabIndexDescriptor.set;
    const childrenGetter = getOwnPropertyDescriptor$2(Element.prototype, 'children').get;
    const shadowRootGetter = getOwnPropertyDescriptor$2(Element.prototype, 'shadowRoot').get;

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const { getOwnPropertyDescriptor: getOwnPropertyDescriptor$1 } = Object;
    getOwnPropertyDescriptor$1(Document.prototype, 'activeElement').get;
    // defaultView can be null when a document has no browsing context. For example, the owner document
    // of a node in a template doesn't have a default view: https://jsfiddle.net/hv9z0q5a/
    getOwnPropertyDescriptor$1(Document.prototype, 'defaultView').get;
    const { createComment, querySelector: querySelector$1, querySelectorAll: querySelectorAll$1, getElementById: getElementById$1, getElementsByName: getElementsByName$1, getElementsByClassName: getElementsByClassName$1, getElementsByTagName: getElementsByTagName$1, getElementsByTagNameNS: getElementsByTagNameNS$1, } = Document.prototype;

    const {
      apply: ReflectApply,
      defineProperty: ReflectDefineProperty,
      deleteProperty: ReflectDeleteProperty,
      getPrototypeOf: ReflectGetPrototypeOf,
      ownKeys: ReflectOwnKeys,
      setPrototypeOf: ReflectSetPrototypeOf
    } = Reflect;
    const ObjectCtor = Object;
    const {
      assign: ObjectAssign,
      freeze: ObjectFreeze,
      keys: ObjectKeys,
      prototype: ObjectProto
    } = ObjectCtor;
    const {
      hasOwn: OriginalObjectHasOwn
    } = ObjectCtor;
    const {
      __lookupGetter__: ObjectProtoLookupGetter,
      __lookupSetter__: ObjectProtoLookupSetter,
      hasOwnProperty: ObjectProtoHasOwnProperty
    } = ObjectProto;
    const ObjectHasOwn = typeof OriginalObjectHasOwn === 'function' ? OriginalObjectHasOwn : /* istanbul ignore next: currently unreachable via tests */function ObjectHasOwn(object, key) {
      return ReflectApply(ObjectProtoHasOwnProperty, object, [key]);
    };
    const {
      toString: ObjectProtoToString
    } = ObjectProto;
    function isObject(value) {
      return typeof value === 'object' && value !== null;
    }
    function ObjectLookupOwnGetter(object, key) {
      return object === null || object === undefined || !ObjectHasOwn(object, key) ? undefined : ReflectApply(ObjectProtoLookupGetter, object, [key]);
    }
    const SymbolCtor = Symbol;
    const {
      for: SymbolFor,
      iterator: SymbolIterator,
      toStringTag: SymbolToStringTag,
      unscopables: SymbolUnscopables
    } = SymbolCtor;
    const ArrayCtor = Array;
    const {
      prototype: ArrayProto
    } = ArrayCtor;
    const {
      at: ArrayProtoAt,
      concat: ArrayProtoConcat,
      copyWithin: ArrayProtoCopyWithin,
      entries: ArrayProtoEntries,
      every: ArrayProtoEvery,
      fill: ArrayProtoFill,
      findIndex: ArrayProtoFindIndex,
      flat: ArrayProtoFlat,
      flatMap: ArrayProtoFlatMap,
      forEach: ArrayProtoForEach,
      join: ArrayProtoJoin,
      keys: ArrayProtoKeys,
      lastIndexOf: ArrayProtoLastIndexOf,
      pop: ArrayProtoPop,
      reduce: ArrayProtoReduce,
      reduceRight: ArrayProtoReduceRight,
      reverse: ArrayProtoReverse,
      slice: ArrayProtoSlice,
      some: ArrayProtoSome,
      toLocaleString: ArrayProtoToLocaleString,
      toString: ArrayProtoToString,
      values: ArrayProtoValues,
      [SymbolIterator]: ArrayProtoSymbolIterator
    } = ArrayProto;
    const ArrayUnscopables = ObjectFreeze(ObjectAssign({
      __proto__: null
    }, ArrayProto[SymbolUnscopables]));
    const {
      filter: ArrayProtoFilter,
      find: ArrayProtoFind,
      includes: ArrayProtoIncludes,
      indexOf: ArrayProtoIndexOf,
      map: ArrayProtoMap,
      push: ArrayProtoPush,
      shift: ArrayProtoShift,
      splice: ArrayProtoSplice,
      sort: ArrayProtoSort,
      unshift: ArrayProtoUnshift
    } = ArrayProto;
    const {
      isArray: ArrayIsArray
    } = ArrayCtor;
    function toSafeArray(array) {
      ReflectSetPrototypeOf(array, null);
      array.at = ArrayProtoAt;
      array.concat = ArrayProtoConcat;
      // *** DO NOT SET THE ARRAY CONSTRUCTOR PROPERTY ***
      // https://bugs.chromium.org/p/v8/issues/detail?id=13202
      // https://source.chromium.org/chromium/chromium/src/+/main:v8/src/objects/lookup.cc;l=196-215?q=IsArraySpeciesLookupChainIntact
      //
      // In V8 setting the constructor property of an array, promise, regexp, or
      // typed array triggers a de-opt because it could change an instance's
      // @@species. This de-opt affects at least `Array#splice` and occurs even
      // if the prototype of the array is change or nulled beforehand. Further,
      // the de-opt persists after a page refresh. It is not until navigating to
      // a different page that the performance of `Array#splice` is restored.
      array.copyWithin = ArrayProtoCopyWithin;
      array.entries = ArrayProtoEntries;
      array.every = ArrayProtoEvery;
      array.fill = ArrayProtoFill;
      array.filter = ArrayProtoFilter;
      array.find = ArrayProtoFind;
      array.findIndex = ArrayProtoFindIndex;
      array.flat = ArrayProtoFlat;
      array.flatMap = ArrayProtoFlatMap;
      array.forEach = ArrayProtoForEach;
      array.includes = ArrayProtoIncludes;
      array.indexOf = ArrayProtoIndexOf;
      array.join = ArrayProtoJoin;
      array.keys = ArrayProtoKeys;
      array.lastIndexOf = ArrayProtoLastIndexOf;
      array.map = ArrayProtoMap;
      array.pop = ArrayProtoPop;
      array.push = ArrayProtoPush;
      array.reduce = ArrayProtoReduce;
      array.reduceRight = ArrayProtoReduceRight;
      array.reverse = ArrayProtoReverse;
      array.shift = ArrayProtoShift;
      array.slice = ArrayProtoSlice;
      array.some = ArrayProtoSome;
      array.sort = ArrayProtoSort;
      array.splice = ArrayProtoSplice;
      array.toLocaleString = ArrayProtoToLocaleString;
      array.toString = ArrayProtoToString;
      array.unshift = ArrayProtoUnshift;
      array.values = ArrayProtoValues;
      array[SymbolIterator] = ArrayProtoSymbolIterator;
      array[SymbolUnscopables] = ArrayUnscopables;
      ReflectSetPrototypeOf(array, ArrayProto);
      return array;
    }
    ObjectLookupOwnGetter(ArrayBuffer.prototype, 'byteLength');
    // This package is bundled by third-parties that have their own build time
    // replacement logic. Instead of customizing each build system to be aware
    // of this package we implement a two phase debug mode by performing small
    // runtime checks to determine phase one, our code is unminified, and
    // phase two, the user opted-in to custom devtools formatters. Phase one
    // is used for light weight initialization time debug while phase two is
    // reserved for post initialization runtime
    const LOCKER_UNMINIFIED_FLAG =
    // eslint-disable-next-line @typescript-eslint/naming-convention
    /* istanbul ignore next */
`${function LOCKER_UNMINIFIED_FLAG() {
  return LOCKER_UNMINIFIED_FLAG.name;
}()}`    .includes('LOCKER_UNMINIFIED_FLAG');
    // Character constants.
    const CHAR_ELLIPSIS = '\u2026';
    // Near-membrane constants.
    const LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL = SymbolFor('@@lockerNearMembraneSerializedValue');
    const LOCKER_NEAR_MEMBRANE_SYMBOL = SymbolFor('@@lockerNearMembrane');
    SymbolFor('@@lockerLiveValue');
    const TO_STRING_BRAND_BIG_INT = '[object BigInt]';
    const TO_STRING_BRAND_BOOLEAN = '[object Boolean]';
    const TO_STRING_BRAND_NUMBER = '[object Number]';
    const TO_STRING_BRAND_STRING = '[object String]';
    const TO_STRING_BRAND_SYMBOL = '[object Symbol]';
    const MapCtor = Map;
    const {
      prototype: MapProto
    } = MapCtor;
    const {
      clear: MapProtoClear,
      delete: MapProtoDelete,
      forEach: MapProtoForEach,
      get: MapProtoGet,
      has: MapProtoHas,
      keys: MapProtoKeys,
      values: MapProtoValues,
      [SymbolIterator]: MapProtoSymbolIterator,
      [SymbolToStringTag]: MapProtoSymbolToStringTag
    } = MapProto;
    const {
      entries: MapProtoEntries,
      set: MapProtoSet
    } = MapProto;
    const MapProtoSizeGetter = ObjectLookupOwnGetter(MapProto, 'size');
    function toSafeMap(map) {
      ReflectSetPrototypeOf(map, null);
      map.clear = MapProtoClear;
      map.delete = MapProtoDelete;
      map.entries = MapProtoEntries;
      map.forEach = MapProtoForEach;
      map.get = MapProtoGet;
      map.has = MapProtoHas;
      map.keys = MapProtoKeys;
      map.set = MapProtoSet;
      ReflectDefineProperty(map, 'size', {
        __proto__: null,
        configurable: true,
        enumerable: true,
        get: MapProtoSizeGetter,
        set: undefined
      });
      map.values = MapProtoValues;
      map[SymbolIterator] = MapProtoSymbolIterator;
      map[SymbolToStringTag] = MapProtoSymbolToStringTag;
      ReflectSetPrototypeOf(map, MapProto);
      return map;
    }
    const NumberCtor = Number;
    const {
      isFinite: NumberIsFinite,
      isInteger: NumberIsInteger,
      isNaN: NumberIsNaN
    } = NumberCtor;
    const RegExpCtor = RegExp;
    const {
      prototype: RegExpProto
    } = RegExpCtor;
    const {
      test: RegExpProtoTest
    } = RegExpProto;
    ObjectLookupOwnGetter(RegExpProto, 'source');
    const SetCtor = Set;
    const {
      prototype: SetProto
    } = SetCtor;
    ObjectLookupOwnGetter(SetProto, 'size');
    const StringCtor = String;
    const {
      prototype: StringProto
    } = StringCtor;
    const {
      slice: StringProtoSlice,
      valueOf: StringProtoValueOf
    } = StringProto;
    const WeakMapCtor = WeakMap;
    const {
      prototype: WeakMapProto
    } = WeakMapCtor;
    const {
      has: WeakMapProtoHas
    } = WeakMapProto;
    const {
      delete: WeakMapProtoDelete,
      get: WeakMapProtoGet,
      set: WeakMapProtoSet,
      [SymbolToStringTag]: WeakMapProtoSymbolToStringTag
    } = WeakMapProto;
    function toSafeWeakMap(weakMap) {
      ReflectSetPrototypeOf(weakMap, null);
      weakMap.delete = WeakMapProtoDelete;
      weakMap.get = WeakMapProtoGet;
      weakMap.has = WeakMapProtoHas;
      weakMap.set = WeakMapProtoSet;
      weakMap[SymbolToStringTag] = WeakMapProtoSymbolToStringTag;
      ReflectSetPrototypeOf(weakMap, WeakMapProto);
      return weakMap;
    }
    const WeakSetCtor = WeakSet;
    const {
      prototype: WeakSetProto
    } = WeakSetCtor;
    const {
      has: WeakSetProtoHas
    } = WeakSetProto;
    const {
      add: WeakSetProtoAdd,
      delete: WeakSetProtoDelete,
      [SymbolToStringTag]: WeakSetProtoSymbolToStringTag
    } = WeakSetProto;
    function toSafeWeakSet(weakSet) {
      ReflectSetPrototypeOf(weakSet, null);
      weakSet.add = WeakSetProtoAdd;
      weakSet.delete = WeakSetProtoDelete;
      weakSet.has = WeakSetProtoHas;
      weakSet[SymbolToStringTag] = WeakSetProtoSymbolToStringTag;
      ReflectSetPrototypeOf(weakSet, WeakSetProto);
      return weakSet;
    }
    // Used by '@locker/near-membrane-dom'.
    const {
      stringify: JSONStringify
    } = JSON;
    function getNearMembraneProxySerializedValue(object) {
      if (typeof object === 'object' && object !== null || typeof object === 'function') {
        // To extract the serialized value of a blue near-membrane proxy we must
        // perform a two step handshake. First, we trigger the "has" trap for
        // the `LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL` property which
        // must report `false`. Second, we trigger the "get" trap to return the
        // serialized value.
        return LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL in object ? undefined : object[LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL];
      }
      return undefined;
    }
    function isNearMembraneProxy(value) {
      if (typeof value === 'object' && value !== null || typeof value === 'function') {
        // To extract the flag value of a blue near-membrane proxy we must
        // perform a two step handshake. First, we trigger the "has" trap for
        // the `LOCKER_NEAR_MEMBRANE_SYMBOL` property which must report `false`.
        // Second, we trigger the "get" trap to return the flag value.
        return !(LOCKER_NEAR_MEMBRANE_SYMBOL in value) && value[LOCKER_NEAR_MEMBRANE_SYMBOL] === true;
      }
      return false;
    }
    toSafeMap(new MapCtor());
    const ErrorCtor = Error;
    const TypeErrorCtor = TypeError;
    function noop() {
      // No operation performed.
    }

    // Used by '@locker/near-membrane-dom'.
    const {
      min: MathMin
    } = Math;

    const rootWindow = window;
    const {
      // We don't cherry-pick the 'userAgent' property from `navigator` here
      // to avoid triggering its getter.
      navigator,
      navigator: {
        userAgentData
      }
    } = rootWindow;
    // The user-agent client hints API is experimental and subject to change.
    // https://caniuse.com/mdn-api_navigator_useragentdata
    // istanbul ignore next: optional chaining and nullish coalescing results in an expansion that contains an unreachable "void 0" branch for every occurrence of the operator
    const brands = userAgentData == null ? void 0 : userAgentData.brands;
    // Note: Chromium identifies itself as Chrome in its user-agent string.
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
    const chromiumUserAgentRegExp = / (?:Headless)?Chrome\/\d+/;
    let userAgent;
    function getUserAgent() {
      if (userAgent === undefined) {
        userAgent = navigator.userAgent;
      }
      return userAgent;
    }
    const IS_CHROMIUM_BROWSER =
    // While experimental, `navigator.userAgentData.brands` may be defined as an
    // empty array in headless Chromium based browsers.
    ArrayIsArray(brands) && brands.length ?
    // Use user-agent client hints API if available to avoid deprecation
    // warnings.
    // https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API
    // istanbul ignore next: this code is not reachable in the coverage run.
    ReflectApply(ArrayProtoFind, brands, [
    // prettier-ignore
    item => (item == null ? void 0 : item.brand) === 'Chromium']) !== undefined :
    // Fallback to a standard user-agent string sniff.
    ReflectApply(RegExpProtoTest, chromiumUserAgentRegExp, [getUserAgent()]);
    const IS_OLD_CHROMIUM_BROWSER = IS_CHROMIUM_BROWSER &&
    // Chromium added support for `navigator.userAgentData` in v90.
    // https://caniuse.com/mdn-api_navigator_useragentdata
    userAgentData === undefined;
    const {
      prototype: DocumentProto
    } = Document;
    const {
      close: DocumentProtoClose,
      createElement: DocumentProtoCreateElement,
      open: DocumentProtoOpen
    } = DocumentProto;
    const DocumentProtoBodyGetter = ObjectLookupOwnGetter(DocumentProto, 'body');

    // The DOMException constructor was exposed in Edge 12 but wasn't invocable
    // until Edge 79. As long as this is used for instanceof checks it should be fine.
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException#browser_compatibility
    const DOMExceptionCtor = DOMException;
    ObjectLookupOwnGetter(DOMExceptionCtor.prototype, 'code');
    const {
      remove: ElementProtoRemove,
      setAttribute: ElementProtoSetAttribute
    } = Element.prototype;
    const HTMLElementProtoStyleGetter = ObjectLookupOwnGetter(HTMLElement.prototype, 'style');
    const HTMLIFrameElementProtoContentWindowGetter = ObjectLookupOwnGetter(HTMLIFrameElement.prototype, 'contentWindow');
    const {
      prototype: NodeProto
    } = Node;
    const {
      appendChild: NodeProtoAppendChild
    } = NodeProto;
    const NodeProtoLastChildGetter = ObjectLookupOwnGetter(NodeProto, 'lastChild');

    // This package is bundled by third-parties that have their own build time
    // replacement logic. Instead of customizing each build system to be aware
    // of this package we implement a two phase debug mode by performing small
    // runtime checks to determine phase one, our code is unminified, and
    // phase two, the user opted-in to custom devtools formatters. Phase one
    // is used for light weight initialization time debug while phase two is
    // reserved for post initialization runtime.
    // istanbul ignore else: not avoidable via tests
    if (LOCKER_UNMINIFIED_FLAG) {
      // We passed the phase one gate so we know our code is unminified and we can
      // install Locker's custom devtools formatter.
      let lockerDebugModeSymbolFlag = true;
      const LOCKER_DEBUG_MODE_SYMBOL = SymbolFor('@@lockerDebugMode');
      const MAX_ARRAY_DISPLAY = 100;
      const MAX_OBJECT_DISPLAY = 5;
      const MAX_STRING_DISPLAY = 100;
      const MID_STRING_DISPLAY = MAX_STRING_DISPLAY / 2;
      const headerCSSText = 'display: inline-block; margin-bottom: 3px; margin-left: -3px; word-break: break-all; word-wrap: wrap;';
      const bodyItemStyleObject = {
        style: 'margin-left:15px; margin-bottom: 3px;'
      };
      const bodyStyleObject = {
        style: 'display: inline-block; margin-left:12px; word-break: break-all; word-wrap: wrap;'
      };
      const keyEnumerableStringStyleObject = {
        style: 'color: #9d288c; font-weight: bold'
      };
      const keyNonEnumerableOrSymbolStyleObject = {
        style: 'color: #b17ab0'
      };
      const primitiveBlueColorStyleObject = {
        style: 'color: #16239f'
      };
      const primitiveGreenColorStyleObject = {
        style: 'color: #236d25'
      };
      const primitiveGreyColorStyleObject = {
        style: 'color: #606367'
      };
      const primitiveOrangeColorStyleObject = {
        style: 'color: #b82619'
      };
      // istanbul ignore next: currently unreachable via tests
      const formatValue = function formatValue(value) {
        if (value === null || value === undefined) {
          return ['span', primitiveGreyColorStyleObject, `${value}`];
        }
        if (typeof value === 'boolean') {
          return ['span', primitiveBlueColorStyleObject, value];
        }
        if (typeof value === 'number') {
          return NumberIsFinite(value) ? ['span', primitiveBlueColorStyleObject, value] : ['span', primitiveBlueColorStyleObject, `${value >= 0 ? '' : '-'}Infinity`];
        }
        if (typeof value === 'bigint') {
          return ['span', primitiveGreenColorStyleObject, `${value}n`];
        }
        if (typeof value === 'string') {
          let string = value;
          const {
            length
          } = string;
          if (length > MAX_STRING_DISPLAY) {
            const firstChunk = ReflectApply(StringProtoSlice, string, [0, MID_STRING_DISPLAY]);
            const lastChunk = ReflectApply(StringProtoSlice, string, [length - MID_STRING_DISPLAY - 1, length]);
            string = firstChunk + CHAR_ELLIPSIS + lastChunk;
          }
          // @TODO: Default to using single quotes on main header and double
          // quotes on body.
          return ['span', primitiveOrangeColorStyleObject, JSONStringify(string)];
        }
        if (ArrayIsArray(value)) {
          return ['span', {}, `Array(${value.length})`];
        }
        if (isObject(value)) {
          return ['span', {}, `{${CHAR_ELLIPSIS}}`];
        }
        // Symbol will be coerced to a string.
        return ['span', primitiveOrangeColorStyleObject, StringCtor(value)];
      };
      // istanbul ignore next: currently unreachable via tests
      const formatHeader = function formatHeader(object, config) {
        const isChildElement = config == null ? void 0 : config.isChildElement;
        const formattedHeader = [];
        let formattedHeaderOffset = 0;
        if (isChildElement) {
          formattedHeader[formattedHeaderOffset++] = ['span', keyEnumerableStringStyleObject, config.childKey];
          formattedHeader[formattedHeaderOffset++] = ['span', {}, ': '];
        }
        const brand = ReflectApply(ObjectProtoToString, object, []);
        let keys = ObjectKeys(object);
        if (brand === TO_STRING_BRAND_SYMBOL) {
          if (!ReflectApply(ArrayProtoIncludes, keys, ['description'])) {
            ReflectApply(ArrayProtoUnshift, keys, ['description']);
          }
        } else if (brand === TO_STRING_BRAND_STRING) {
          const {
            length
          } = object;
          keys = ReflectApply(ArrayProtoFilter, keys, [key => {
            const possibleIndex = typeof key === 'string' ? +key : -1;
            return possibleIndex < 0 || possibleIndex >= length || !NumberIsInteger(possibleIndex);
          }]);
        }
        const ownKeysRaw = ReflectOwnKeys(object);
        const ownKeys = ReflectApply(ArrayProtoMap, ownKeysRaw, [StringCtor]);
        const {
          length: ownKeysLength
        } = ownKeys;
        if (ArrayIsArray(object)) {
          formattedHeader[formattedHeaderOffset++] = ['span', {}, `(${object.length}) [`];
          for (let i = 0, length = MathMin(ownKeysLength, MAX_ARRAY_DISPLAY); i < length; i += 1) {
            const ownKeyRaw = ownKeysRaw[i];
            const ownKey = ownKeys[i];
            const value = object[ownKeyRaw];
            if (ownKey !== 'length') {
              if (!NumberIsNaN(NumberCtor(ownKey))) {
                formattedHeader[formattedHeaderOffset++] = ['span', {}, i ? ', ' : ''];
                formattedHeader[formattedHeaderOffset++] = formatValue(value);
              } else {
                formattedHeader[formattedHeaderOffset++] = ['span', {}, i ? ', ' : ''];
                formattedHeader[formattedHeaderOffset++] = ['span', primitiveGreyColorStyleObject, StringCtor(ownKey)];
                formattedHeader[formattedHeaderOffset++] = ['span', {}, ': '];
                formattedHeader[formattedHeaderOffset++] = formatValue(value);
              }
            }
          }
          if (ownKeysLength > MAX_ARRAY_DISPLAY) {
            formattedHeader[formattedHeaderOffset++] = ['span', null, ['span', {}, `, ${CHAR_ELLIPSIS}`]];
          }
          formattedHeader[formattedHeaderOffset++] = ['span', {}, ']'];
          return formattedHeader;
        }
        let boxedHeaderEntry;
        let headerOpening = '{';
        // eslint-disable-next-line default-case
        switch (brand) {
          case TO_STRING_BRAND_BIG_INT:
          case TO_STRING_BRAND_BOOLEAN:
          case TO_STRING_BRAND_NUMBER:
          case TO_STRING_BRAND_STRING:
          case TO_STRING_BRAND_SYMBOL:
            {
              let colorStyleObject = primitiveBlueColorStyleObject;
              if (brand === TO_STRING_BRAND_BIG_INT) {
                colorStyleObject = primitiveGreenColorStyleObject;
              } else if (brand === TO_STRING_BRAND_SYMBOL) {
                colorStyleObject = primitiveOrangeColorStyleObject;
              }
              headerOpening = `${ReflectApply(StringProtoSlice, brand, [8, -1])} {`;
              boxedHeaderEntry = ['span', colorStyleObject, `${StringCtor(getNearMembraneProxySerializedValue(object))}`];
              break;
            }
        }
        formattedHeader[formattedHeaderOffset++] = ['span', {}, headerOpening];
        if (boxedHeaderEntry) {
          formattedHeader[formattedHeaderOffset++] = boxedHeaderEntry;
          if (ownKeysLength) {
            formattedHeader[formattedHeaderOffset++] = ['span', {}, ', '];
          }
        }
        for (let i = 0, length = MathMin(ownKeysLength, MAX_OBJECT_DISPLAY); i < length; i += 1) {
          const ownKeyRaw = ownKeysRaw[i];
          const ownKey = ownKeys[i];
          const value = object[ownKeyRaw];
          formattedHeader[formattedHeaderOffset++] = ['span', {}, i ? ', ' : ''];
          formattedHeader[formattedHeaderOffset++] = ['span', primitiveGreyColorStyleObject, ownKey];
          formattedHeader[formattedHeaderOffset++] = ['span', {}, ': '];
          formattedHeader[formattedHeaderOffset++] = formatValue(value);
        }
        if (ownKeysLength > MAX_OBJECT_DISPLAY) {
          formattedHeader[formattedHeaderOffset++] = ['span', null, ['span', {}, `, ${CHAR_ELLIPSIS}`]];
        }
        formattedHeader[formattedHeaderOffset++] = ['span', {}, '}'];
        return formattedHeader;
      };
      // istanbul ignore next: currently unreachable via tests
      const formatBody = function formatBody(object) {
        // @TODO: Arrays are broken into groups of 100.
        const ownKeysRaw = ReflectOwnKeys(object);
        const ownKeys = ReflectApply(ArrayProtoMap, ownKeysRaw, [StringCtor]);
        // Put 'length' at the end of array.
        const isArray = ArrayIsArray(object);
        if (isArray) {
          const lengthIndex = ReflectApply(ArrayProtoIndexOf, ownKeys, ['length']);
          const lengthKeyRaw = ReflectApply(ArrayProtoSplice, ownKeysRaw, [lengthIndex, 1])[0];
          ReflectApply(ArrayProtoPush, ownKeysRaw, [lengthKeyRaw]);
          const lengthKey = ReflectApply(ArrayProtoSplice, ownKeys, [lengthIndex, 1])[0];
          ReflectApply(ArrayProtoPush, ownKeys, [lengthKey]);
        }
        const formattedBody = [];
        let formattedBodyOffset = 0;
        for (let i = 0, {
            length
          } = ownKeys; i < length; i += 1) {
          const ownKeyRaw = ownKeysRaw[i];
          const ownKey = ownKeys[i];
          const value = object[ownKeyRaw];
          if (isObject(value)) {
            formattedBody[formattedBodyOffset++] = ['div', {}, ['object', {
              object: value,
              config: {
                childKey: StringCtor(ownKey),
                isChildElement: true
              }
            }]];
          } else {
            let currentKeyStyle = keyEnumerableStringStyleObject;
            if (isArray && ownKey === 'length') {
              currentKeyStyle = keyNonEnumerableOrSymbolStyleObject;
            }
            formattedBody[formattedBodyOffset++] = ['div', bodyItemStyleObject, ['span', currentKeyStyle, ownKey], ['span', {}, ': '], formatValue(value)];
          }
        }
        return formattedBody;
      };
      let {
        devtoolsFormatters
      } = rootWindow;
      if (!ArrayIsArray(devtoolsFormatters)) {
        devtoolsFormatters = [];
        ReflectDefineProperty(rootWindow, 'devtoolsFormatters', {
          __proto__: null,
          configurable: true,
          value: devtoolsFormatters,
          writable: true
        });
      }
      // Append our custom formatter to the array of devtools formatters.
      // istanbul ignore next: currently unreachable via tests
      devtoolsFormatters[devtoolsFormatters.length] = {
        // istanbul ignore next: currently unreachable via tests
        header(object, config) {
          if (lockerDebugModeSymbolFlag) {
            // We passed the second phase gate so we know that the user has
            // opted-in to custom devtools formatters. Close the gate and
            // define the @@lockerDebugMode symbol on window.
            lockerDebugModeSymbolFlag = false;
            ReflectDefineProperty(rootWindow, LOCKER_DEBUG_MODE_SYMBOL, {
              __proto__: null,
              configurable: true,
              value: true,
              writable: true
            });
          }
          if (!isNearMembraneProxy(object)) {
            return null;
          }
          const headerDiv = ['div', {
            style: `${headerCSSText}${config != null && config.isChildElement ? '' : 'font-style: italic;'}`
          }];
          ReflectApply(ArrayProtoPush, headerDiv, formatHeader(object, config));
          return ['div', {}, headerDiv];
        },
        // istanbul ignore next: currently unreachable via tests
        hasBody() {
          return true;
        },
        // istanbul ignore next: currently unreachable via tests
        body(object) {
          const bodyDiv = ['div', bodyStyleObject];
          ReflectApply(ArrayProtoPush, bodyDiv, formatBody(object));
          return bodyDiv;
        }
      };
    }

    /**
     * This file contains an exportable (portable) function `init()` used to initialize
     * one side of a membrane on any realm. The only prerequisite is the ability to
     * evaluate the sourceText of the `init()` function there. Once evaluated, the
     * function will return a set of values that can be used to wire up the side of
     * the membrane with another existing `init()` function from another realm, in
     * which case they will exchange callable functions that are required to connect
     * the two realms via the membrane.
     *
     * About the mechanics of the membrane, there are few important considerations:
     *
     * 1. Pointers are the way to pass reference to object and functions.
     * 2. A dedicated symbol (LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) is needed
     *    to represent the absence of a value.
     * 3. The realm that owns the object or function is responsible for projecting
     *    the proxy onto the other side (via callablePushTarget), which returns a
     *    Pointer that can be used by the realm to pass the reference to the same
     *    proxy over and over again.
     * 4. The realm that owns the proxy (after the other side projects it into it)
     *    will hold a Pointer alongside the proxy to signal what original object or
     *    function should the foreign operation operates, it is always the first
     *    argument of the foreign callable for proxies, and the other side can use
     *    it via `selectedTarget!`.
     */
    const proxyTargetToLazyPropertyDescriptorStateMap = toSafeWeakMap(new WeakMapCtor());
    // istanbul ignore next
    function createMembraneMarshall(globalObject) {
      var _ref, _ref2, _ReflectApply, _globalThisRef$BigInt, _globalThisRef$BigUin;
      /* eslint-disable prefer-object-spread */
      const ArrayCtor = Array;
      const ArrayBufferCtor = ArrayBuffer;
      const ErrorCtor = Error;
      const NumberCtor = Number;
      const ObjectCtor = Object;
      const ProxyCtor = Proxy;
      const ReflectRef = Reflect;
      const RegExpCtor = RegExp;
      const StringCtor = String;
      const SymbolCtor = Symbol;
      const TypeErrorCtor = TypeError;
      // eslint-disable-next-line @typescript-eslint/no-shadow, no-shadow
      const WeakMapCtor = WeakMap;
      const WeakSetCtor = WeakSet;
      const {
        for: SymbolFor,
        toStringTag: SymbolToStringTag
      } = SymbolCtor;
      const {
        // eslint-disable-next-line @typescript-eslint/no-shadow, no-shadow
        apply: ReflectApply,
        construct: ReflectConstruct,
        defineProperty: ReflectDefineProperty,
        deleteProperty: ReflectDeleteProperty,
        get: ReflectGet,
        getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor,
        getPrototypeOf: ReflectGetPrototypeOf,
        has: ReflectHas,
        isExtensible: ReflectIsExtensible,
        ownKeys: ReflectOwnKeys,
        preventExtensions: ReflectPreventExtensions,
        set: ReflectSet,
        // eslint-disable-next-line @typescript-eslint/no-shadow, no-shadow
        setPrototypeOf: ReflectSetPrototypeOf
      } = ReflectRef;
      const {
        assign: ObjectAssign,
        defineProperties: ObjectDefineProperties,
        freeze: ObjectFreeze,
        getOwnPropertyDescriptor: ObjectGetOwnPropertyDescriptor,
        getOwnPropertyDescriptors: ObjectGetOwnPropertyDescriptors,
        isFrozen: ObjectIsFrozen,
        isSealed: ObjectIsSealed,
        keys: ObjectKeys,
        prototype: ObjectProto,
        seal: ObjectSeal
      } = ObjectCtor;
      const {
        hasOwnProperty: ObjectProtoHasOwnProperty,
        propertyIsEnumerable: ObjectProtoPropertyIsEnumerable,
        toString: ObjectProtoToString
      } = ObjectProto;
      const {
        hasOwn: OriginalObjectHasOwn
      } = ObjectCtor;
      const {
        __defineGetter__: ObjectProtoDefineGetter,
        __defineSetter__: ObjectProtoDefineSetter,
        __lookupGetter__: ObjectProtoLookupGetter,
        __lookupSetter__: ObjectProtoLookupSetter
      } = ObjectProto;
      const ObjectHasOwn = typeof OriginalObjectHasOwn === 'function' ? OriginalObjectHasOwn : (object, key) => ReflectApply(ObjectProtoHasOwnProperty, object, [key]);
      const globalThisRef = (_ref = (_ref2 = globalObject != null ? globalObject :
      // Support for globalThis was added in Chrome 71.
      // https://caniuse.com/mdn-javascript_builtins_globalthisfor
      typeof globalThis !== 'undefined' ? globalThis : undefined) != null ? _ref2 :
      // However, environments like Android emulators are running Chrome 69.
      // eslint-disable-next-line no-restricted-globals
      typeof self !== 'undefined' ? self : undefined) != null ? _ref : (
      // See https://mathiasbynens.be/notes/globalthis for more details.
      ReflectDefineProperty(ObjectProto, 'globalThis', {
        __proto__: null,
        configurable: true,
        get() {
          ReflectDeleteProperty(ObjectProto, 'globalThis');
          // Safari 12 on iOS 12.1 has a `this` of `undefined` so we
          // fallback to `self`.
          // eslint-disable-next-line no-restricted-globals
          return this != null ? this : self;
        }
      }), globalThis);
      const IS_IN_SHADOW_REALM = typeof globalObject !== 'object' || globalObject === null;
      const IS_NOT_IN_SHADOW_REALM = !IS_IN_SHADOW_REALM;
      const LOCKER_DEBUG_MODE_SYMBOL = IS_NOT_IN_SHADOW_REALM ? SymbolFor('@@lockerDebugMode') : undefined;
      const LOCKER_IDENTIFIER_MARKER = '$LWS';
      const LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL = IS_NOT_IN_SHADOW_REALM ? SymbolFor('@@lockerNearMembraneSerializedValue') : undefined;
      const LOCKER_NEAR_MEMBRANE_SYMBOL = IS_NOT_IN_SHADOW_REALM ? SymbolFor('@@lockerNearMembrane') : undefined;
      const LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL = SymbolFor('@@lockerNearMembraneUndefinedValue');
      // The default stack trace limit in Chrome is 10.
      // Set to 20 to account for stack trace filtering.
      const LOCKER_STACK_TRACE_LIMIT = 20;
      // This package is bundled by third-parties that have their own build time
      // replacement logic. Instead of customizing each build system to be aware
      // of this package we implement a two phase debug mode by performing small
      // runtime checks to determine phase one, our code is unminified, and
      // phase two, the user opted-in to custom devtools formatters. Phase one
      // is used for light weight initialization time debug while phase two is
      // reserved for post initialization runtime.
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const LOCKER_UNMINIFIED_FLAG = `${function LOCKER_UNMINIFIED_FLAG() {
    return LOCKER_UNMINIFIED_FLAG.name;
  }()}`.includes('LOCKER_UNMINIFIED_FLAG');
      // Indicate whether debug support is available.
      const LOCKER_DEBUGGABLE_FLAG = LOCKER_UNMINIFIED_FLAG && IS_NOT_IN_SHADOW_REALM;
      const ERR_ILLEGAL_PROPERTY_ACCESS = 'Illegal property access.';
      // BigInt is not supported in Safari 13.1.
      // https://caniuse.com/bigint
      const FLAGS_REG_EXP = IS_IN_SHADOW_REALM ? /\w*$/ : undefined;
      // Minification safe references to the private `BoundaryProxyHandler`
      // 'apply' and 'construct' trap variant's property names.
      let MINIFICATION_SAFE_TRAP_PROPERTY_NAMES;
      const SUPPORTS_BIG_INT = typeof BigInt === 'function';
      const {
        isArray: isArrayOrThrowForRevoked
      } = ArrayCtor;
      const {
        includes: ArrayProtoIncludes,
        indexOf: ArrayProtoIndexOf,
        slice: ArrayProtoSlice
      } = ArrayCtor.prototype;
      const {
        isView: ArrayBufferIsView
      } = ArrayBufferCtor;
      const BigIntProtoValueOf = SUPPORTS_BIG_INT ? BigInt.prototype.valueOf : undefined;
      const {
        valueOf: BooleanProtoValueOf
      } = Boolean.prototype;
      const {
        toString: ErrorProtoToString
      } = ErrorCtor.prototype;
      const {
        bind: FunctionProtoBind,
        toString: FunctionProtoToString
      } = Function.prototype;
      const {
        stringify: JSONStringify
      } = JSON;
      const {
        isInteger: NumberIsInteger
      } = NumberCtor;
      const {
        valueOf: NumberProtoValueOf
      } = NumberCtor.prototype;
      const {
        revocable: ProxyRevocable
      } = ProxyCtor;
      const {
        prototype: RegExpProto
      } = RegExpCtor;
      const {
        exec: RegExpProtoExec,
        test: RegExpProtoTest,
        toString: RegExProtoToString
      } = RegExpProto;
      // Edge 15 does not support RegExp.prototype.flags.
      // https://caniuse.com/mdn-javascript_builtins_regexp_flags
      const RegExpProtoFlagsGetter = IS_IN_SHADOW_REALM ? (_ReflectApply = ReflectApply(ObjectProtoLookupGetter, RegExpProto, ['flags'])) != null ? _ReflectApply : function flags() {
        const string = ReflectApply(RegExProtoToString, this, []);
        return ReflectApply(RegExpProtoExec, FLAGS_REG_EXP, [string])[0];
      } : undefined;
      const RegExpProtoSourceGetter = ReflectApply(ObjectProtoLookupGetter, RegExpProto, ['source']);
      const {
        replace: StringProtoReplace,
        slice: StringProtoSlice,
        valueOf: StringProtoValueOf
      } = StringCtor.prototype;
      const {
        toString: SymbolProtoToString,
        valueOf: SymbolProtoValueOf
      } = SymbolCtor.prototype;
      const BigInt64ArrayProto = (_globalThisRef$BigInt = globalThisRef.BigInt64Array) == null ? void 0 : _globalThisRef$BigInt.prototype;
      const BigUint64ArrayProto = (_globalThisRef$BigUin = globalThisRef.BigUint64Array) == null ? void 0 : _globalThisRef$BigUin.prototype;
      const {
        prototype: Float32ArrayProto
      } = Float32Array;
      const {
        prototype: Float64ArrayProto
      } = Float64Array;
      const {
        prototype: Int8ArrayProto
      } = Int8Array;
      const {
        prototype: Int16ArrayProto
      } = Int16Array;
      const {
        prototype: Int32ArrayProto
      } = Int32Array;
      const {
        prototype: Uint8ArrayProto
      } = Uint8Array;
      const {
        prototype: Uint16ArrayProto
      } = Uint16Array;
      const {
        prototype: Uint32ArrayProto
      } = Uint32Array;
      // eslint-disable-next-line no-proto
      const TypedArrayProto = Uint8ArrayProto.__proto__;
      const TypedArrayProtoLengthGetter = ReflectApply(ObjectProtoLookupGetter, TypedArrayProto, ['length']);
      const {
        prototype: WeakMapProto
      } = WeakMapCtor;
      const {
        delete: WeakMapProtoDelete,
        has: WeakMapProtoHas,
        set: WeakMapProtoSet,
        [SymbolToStringTag]: WeakMapProtoSymbolToStringTag
      } = WeakMapProto;
      const {
        prototype: WeakSetProto
      } = WeakSetCtor;
      const {
        add: WeakSetProtoAdd,
        has: WeakSetProtoHas,
        delete: WeakSetProtoDelete,
        [SymbolToStringTag]: WeakSetProtoSymbolToStringTag
      } = WeakSetProto;
      const consoleObject = IS_NOT_IN_SHADOW_REALM && typeof console === 'object' && console !== null ? console : undefined;
      const consoleInfo = consoleObject == null ? void 0 : consoleObject.info;
      const localEval = IS_IN_SHADOW_REALM ? eval : undefined;
      // Install flags to ensure things are installed once per realm.
      let installedErrorPrepareStackTraceFlag = false;
      let installedPropertyDescriptorMethodWrappersFlag = false;
      function alwaysFalse() {
        return false;
      }
      const installErrorPrepareStackTrace = LOCKER_UNMINIFIED_FLAG ? () => {
        if (installedErrorPrepareStackTraceFlag) {
          return;
        }
        installedErrorPrepareStackTraceFlag = true;
        // Feature detect the V8 stack trace API.
        // https://v8.dev/docs/stack-trace-api
        const CallSite = (() => {
          try {
            var _callSites$;
            ErrorCtor.prepareStackTrace = (_error, callSites) => callSites;
            const callSites = new ErrorCtor().stack;
            ReflectDeleteProperty(ErrorCtor, 'prepareStackTrace');
            return isArrayOrThrowForRevoked(callSites) && callSites.length > 0 ? (_callSites$ = callSites[0]) == null ? void 0 : _callSites$.constructor : undefined;
            // eslint-disable-next-line no-empty
          } catch (_unused) {}
          return undefined;
        })();
        if (typeof CallSite !== 'function') {
          return;
        }
        const {
          getEvalOrigin: CallSiteProtoGetEvalOrigin,
          getFunctionName: CallSiteProtoGetFunctionName,
          toString: CallSiteProtoToString
        } = CallSite.prototype;
        // A regexp to detect call sites containing LOCKER_IDENTIFIER_MARKER.
        const lockerFunctionNameMarkerRegExp = new RegExpCtor(`${
    // Escape regexp special characters in LOCKER_IDENTIFIER_MARKER.
    ReflectApply(StringProtoReplace, LOCKER_IDENTIFIER_MARKER, [/[\\^$.*+?()[\]{}|]/g, '\\$&'])
    // Function name references in call sites also contain
    // the name of the class they belong to,
    // e.g. myClassName.myFunctionName.
    }(?=\\.|$)`);
        const formatStackTrace = function formatStackTrace(error, callSites) {
          // Based on V8's default stack trace formatting:
          // https://chromium.googlesource.com/v8/v8.git/+/refs/heads/main/src/execution/messages.cc#371
          let stackTrace = '';
          try {
            stackTrace = ReflectApply(ErrorProtoToString, error, []);
          } catch (_unused2) {
            stackTrace = '<error>';
          }
          let consecutive = false;
          for (let i = 0, {
              length
            } = callSites; i < length; i += 1) {
            const callSite = callSites[i];
            const funcName = ReflectApply(CallSiteProtoGetFunctionName, callSite, []);
            let isMarked = false;
            if (typeof funcName === 'string' && funcName !== 'eval' && ReflectApply(RegExpProtoTest, lockerFunctionNameMarkerRegExp, [funcName])) {
              isMarked = true;
            }
            if (!isMarked) {
              const evalOrigin = ReflectApply(CallSiteProtoGetEvalOrigin, callSite, []);
              if (typeof evalOrigin === 'string' && ReflectApply(RegExpProtoTest, lockerFunctionNameMarkerRegExp, [evalOrigin])) {
                isMarked = true;
              }
            }
            // Only write a single LWS entry per consecutive LWS stacks.
            if (isMarked) {
              if (!consecutive) {
                consecutive = true;
                stackTrace += '\n    at LWS';
              }
              continue;
            } else {
              consecutive = false;
            }
            try {
              stackTrace += `\n    at ${ReflectApply(CallSiteProtoToString, callSite, [])}`;
              // eslint-disable-next-line no-empty
            } catch (_unused3) {}
          }
          return stackTrace;
        };
        try {
          // Error.prepareStackTrace cannot be a bound or proxy wrapped
          // function, so to obscure its source we wrap the call to
          // formatStackTrace().
          ErrorCtor.prepareStackTrace = function prepareStackTrace(error, callSites) {
            return formatStackTrace(error, callSites);
          };
          // eslint-disable-next-line no-empty
        } catch (_unused4) {}
        try {
          const {
            stackTraceLimit
          } = ErrorCtor;
          if (typeof stackTraceLimit !== 'number' || stackTraceLimit < LOCKER_STACK_TRACE_LIMIT) {
            ErrorCtor.stackTraceLimit = LOCKER_STACK_TRACE_LIMIT;
          }
          // eslint-disable-next-line no-empty
        } catch (_unused5) {}
      } : noop;
      function noop() {
        // No-operation.
      }
      const serializeBigIntObject = IS_IN_SHADOW_REALM ? bigIntObject =>
      // Section 21.2.3 Properties of the BigInt Prototype Object
      // https://tc39.es/ecma262/#thisbigintvalue
      // Step 2: If Type(value) is Object and value has a [[BigIntData]] internal slot, then
      //     a. Assert: Type(value.[[BigIntData]]) is BigInt.
      ReflectApply(BigIntProtoValueOf, bigIntObject, []) : noop;
      const serializeBooleanObject = IS_IN_SHADOW_REALM ? booleanObject =>
      // Section 20.3.3 Properties of the Boolean Prototype Object
      // https://tc39.es/ecma262/#thisbooleanvalue
      // Step 2: If Type(value) is Object and value has a [[BooleanData]] internal slot, then
      //     a. Let b be value.[[BooleanData]].
      //     b. Assert: Type(b) is Boolean.
      ReflectApply(BooleanProtoValueOf, booleanObject, []) : noop;
      const serializeNumberObject = IS_IN_SHADOW_REALM ? numberObject =>
      // 21.1.3 Properties of the Number Prototype Object
      // https://tc39.es/ecma262/#thisnumbervalue
      // Step 2: If Type(value) is Object and value has a [[NumberData]] internal slot, then
      //     a. Let n be value.[[NumberData]].
      //     b. Assert: Type(n) is Number.
      ReflectApply(NumberProtoValueOf, numberObject, []) : noop;
      const serializeRegExp = IS_IN_SHADOW_REALM ? value => {
        // 22.2.5.12 get RegExp.prototype.source
        // https://tc39.es/ecma262/#sec-get-regexp.prototype.source
        // Step 3: If R does not have an [[OriginalSource]] internal slot, then
        //     a. If SameValue(R, %RegExp.prototype%) is true, return "(?:)".
        //     b. Otherwise, throw a TypeError exception.
        if (value !== RegExpProto) {
          const source = ReflectApply(RegExpProtoSourceGetter, value, []);
          return JSONStringify({
            __proto__: null,
            flags: ReflectApply(RegExpProtoFlagsGetter, value, []),
            source
          });
        }
        return undefined;
      } : noop;
      const serializeStringObject = IS_IN_SHADOW_REALM ? stringObject =>
      // 22.1.3 Properties of the String Prototype Object
      // https://tc39.es/ecma262/#thisstringvalue
      // Step 2: If Type(value) is Object and value has a [[StringData]] internal slot, then
      //     a. Let s be value.[[StringData]].
      //     b. Assert: Type(s) is String.
      ReflectApply(StringProtoValueOf, stringObject, []) : noop;
      const serializeSymbolObject = IS_IN_SHADOW_REALM ? symbolObject =>
      // 20.4.3 Properties of the Symbol Prototype Object
      // https://tc39.es/ecma262/#thissymbolvalue
      // Step 2: If Type(value) is Object and value has a [[SymbolData]] internal slot, then
      //     a. Let s be value.[[SymbolData]].
      //     b. Assert: Type(s) is Symbol.
      ReflectApply(SymbolProtoValueOf, symbolObject, []) : noop;
      const serializeTargetByBrand = IS_IN_SHADOW_REALM ? target => {
        const brand = ReflectApply(ObjectProtoToString, target, []);
        switch (brand) {
          // The brand checks below represent boxed primitives of
          // `ESGlobalKeys` in packages/near-membrane-base/src/intrinsics.ts
          // which are not remapped or reflective.
          case '[object Boolean]':
            return serializeBooleanObject(target);
          case '[object Number]':
            return serializeNumberObject(target);
          case '[object RegExp]':
            return serializeRegExp(target);
          case '[object String]':
            return serializeStringObject(target);
          case '[object Object]':
            try {
              // Symbol.prototype[@@toStringTag] is defined by default so
              // must have been removed.
              // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
              return serializeSymbolObject(target);
              // eslint-disable-next-line no-empty
            } catch (_unused6) {}
            if (SUPPORTS_BIG_INT) {
              // BigInt.prototype[@@toStringTag] is defined by default so
              // must have been removed.
              // https://tc39.es/ecma262/#sec-bigint.prototype-@@tostringtag
              try {
                return serializeBigIntObject(target);
                // eslint-disable-next-line no-empty
              } catch (_unused7) {}
            }
          // eslint-disable-next-line no-fallthrough
          default:
            return undefined;
        }
      } : noop;
      const serializeTargetByTrialAndError = IS_IN_SHADOW_REALM ? target => {
        // The serialization attempts below represent boxed primitives of
        // `ESGlobalKeys` in packages/near-membrane-base/src/intrinsics.ts
        // which are not remapped or reflective.
        try {
          // Symbol.prototype[@@toStringTag] is defined by default so
          // attempted before others.
          // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
          return serializeSymbolObject(target);
          // eslint-disable-next-line no-empty
        } catch (_unused8) {}
        if (SUPPORTS_BIG_INT) {
          // BigInt.prototype[@@toStringTag] is defined by default so
          // attempted before others.
          // https://tc39.es/ecma262/#sec-bigint.prototype-@@tostringtag
          try {
            return serializeBigIntObject(target);
            // eslint-disable-next-line no-empty
          } catch (_unused9) {}
        }
        try {
          return serializeBooleanObject(target);
          // eslint-disable-next-line no-empty
        } catch (_unused10) {}
        try {
          return serializeNumberObject(target);
          // eslint-disable-next-line no-empty
        } catch (_unused11) {}
        try {
          return serializeRegExp(target);
          // eslint-disable-next-line no-empty
        } catch (_unused12) {}
        try {
          return serializeStringObject(target);
          // eslint-disable-next-line no-empty
        } catch (_unused13) {}
        return undefined;
      } : noop;
      function toSafeTemplateStringValue(value) {
        if (typeof value === 'string') {
          return value;
        }
        try {
          if (typeof value === 'object' && value !== null) {
            const result = ReflectApply(ObjectProtoToString, value, []);
            return result === '[object Symbol]' ? ReflectApply(SymbolProtoToString, value, []) : result;
          }
          if (typeof value === 'function') {
            return ReflectApply(FunctionProtoToString, value, []);
          }
          // Attempt to coerce `value` to a string with the String() constructor.
          // Section 22.1.1.1 String ( value )
          // https://tc39.es/ecma262/#sec-string-constructor-string-value
          return StringCtor(value);
          // eslint-disable-next-line no-empty
        } catch (_unused14) {}
        return '[Object Unknown]';
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow, no-shadow
      function toSafeWeakMap(weakMap) {
        ReflectSetPrototypeOf(weakMap, null);
        weakMap.delete = WeakMapProtoDelete;
        weakMap.has = WeakMapProtoHas;
        weakMap.set = WeakMapProtoSet;
        weakMap[SymbolToStringTag] = WeakMapProtoSymbolToStringTag;
        ReflectSetPrototypeOf(weakMap, WeakMapProto);
        return weakMap;
      }
      function toSafeWeakSet(weakSet) {
        ReflectSetPrototypeOf(weakSet, null);
        weakSet.add = WeakSetProtoAdd;
        weakSet.delete = WeakSetProtoDelete;
        weakSet.has = WeakSetProtoHas;
        weakSet[SymbolToStringTag] = WeakSetProtoSymbolToStringTag;
        ReflectSetPrototypeOf(weakSet, WeakSetProto);
        return weakSet;
      }
      return function createHooksCallback(color, foreignCallableHooksCallback, options) {
        if (IS_IN_SHADOW_REALM) {
          options = undefined;
        }
        const {
          distortionCallback,
          liveTargetCallback,
          revokedProxyCallback
          // eslint-disable-next-line prefer-object-spread
        } = ObjectAssign({
          __proto__: null
        }, options);
        const applyTrapNameRegistry = {
          // Populated in the returned connector function below.
          __proto__: null,
          0: undefined,
          1: undefined,
          2: undefined,
          3: undefined,
          4: undefined,
          n: undefined
        };
        const constructTrapNameRegistry = {
          // Populated in the returned connector function below.
          __proto__: null,
          0: undefined,
          1: undefined,
          2: undefined,
          3: undefined,
          4: undefined,
          n: undefined
        };
        const lazyPropertyDescriptorStateCache = toSafeWeakMap(new WeakMapCtor());
        const proxyPointerCache = toSafeWeakMap(new WeakMapCtor());
        let foreignCallablePushErrorTarget;
        let foreignCallablePushTarget;
        let foreignCallableApply;
        let foreignCallableConstruct;
        let foreignCallableDefineProperty;
        let foreignCallableDeleteProperty;
        let foreignCallableGet;
        let foreignCallableGetOwnPropertyDescriptor;
        let foreignCallableGetPrototypeOf;
        let foreignCallableHas;
        let foreignCallableIsExtensible;
        let foreignCallableOwnKeys;
        let foreignCallablePreventExtensions;
        let foreignCallableSet;
        let foreignCallableSetPrototypeOf;
        let foreignCallableDebugInfo;
        let foreignCallableGetPropertyValue;
        let foreignCallableGetLazyPropertyDescriptorStateByTarget;
        let foreignCallableGetTargetIntegrityTraits;
        let foreignCallableGetToStringTagOfTarget;
        let foreignCallableInstallErrorPrepareStackTrace;
        let foreignCallableIsTargetLive;
        let foreignCallableIsTargetRevoked;
        let foreignCallableSerializeTarget;
        let foreignCallableSetLazyPropertyDescriptorStateByTarget;
        let foreignCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors;
        let foreignCallableBatchGetPrototypeOfWhenHasNoOwnProperty;
        let foreignCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor;
        let fastForeignTargetPointers;
        let foreignPointerBigInt64ArrayProto;
        let foreignPointerBigUint64ArrayProto;
        let foreignPointerFloat32ArrayProto;
        let foreignPointerFloat64ArrayProto;
        let foreignPointerInt8ArrayProto;
        let foreignPointerInt16ArrayProto;
        let foreignPointerInt32ArrayProto;
        let foreignPointerObjectProto;
        let foreignPointerTypedArrayProto;
        let foreignPointerUint8ArrayProto;
        let foreignPointerUint16ArrayProto;
        let foreignPointerUint32ArrayProto;
        let selectedTarget;
        let lastProxyTrapCalled = 0 /* ProxyHandlerTraps.None */;
        let handshakePropertyFlag = false;
        let useFastForeignTargetPath = IS_IN_SHADOW_REALM;
        let useFastForeignTargetPathForTypedArrays = IS_IN_SHADOW_REALM;
        const activateLazyOwnPropertyDefinition = IS_IN_SHADOW_REALM ? (target, key, state) => {
          state[key] = false;
          const foreignTargetPointer = getTransferablePointer(target);
          let safeDesc;
          try {
            foreignCallableGetOwnPropertyDescriptor(foreignTargetPointer, key, (_key, configurable, enumerable, writable, valuePointer, getterPointer, setterPointer) => {
              safeDesc = createDescriptorFromMeta(configurable, enumerable, writable, valuePointer, getterPointer, setterPointer);
            });
          } catch (error) {
            var _selectedTarget;
            const errorToThrow = (_selectedTarget = selectedTarget) != null ? _selectedTarget : error;
            selectedTarget = undefined;
            throw errorToThrow;
          }
          if (safeDesc) {
            ReflectDefineProperty(target, key, safeDesc);
          } else {
            ReflectDeleteProperty(target, key);
          }
        } : noop;
        let checkDebugMode = LOCKER_DEBUGGABLE_FLAG ? () => {
          try {
            if (ObjectHasOwn(globalThisRef, LOCKER_DEBUG_MODE_SYMBOL)) {
              checkDebugMode = () => true;
              installErrorPrepareStackTrace();
              foreignCallableInstallErrorPrepareStackTrace();
            }
          } catch (_unused15) {
            checkDebugMode = alwaysFalse;
          }
          return false;
        } : alwaysFalse;
        const clearFastForeignTargetPointers = IS_IN_SHADOW_REALM ? () => {
          fastForeignTargetPointers = toSafeWeakSet(new WeakSetCtor());
        } : noop;
        function copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget(foreignTargetPointer, shadowTarget) {
          let protoPointerOrNull;
          try {
            protoPointerOrNull = foreignCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors(foreignTargetPointer, (...descriptorTuples) => {
              const descriptors = {};
              for (let i = 0, {
                  length
                } = descriptorTuples; i < length; i += 7) {
                const key = descriptorTuples[i];
                descriptors[key] = createDescriptorFromMeta(descriptorTuples[i + 1],
                // configurable
                descriptorTuples[i + 2],
                // enumerable
                descriptorTuples[i + 3],
                // writable
                descriptorTuples[i + 4],
                // valuePointer
                descriptorTuples[i + 5],
                // getterPointer
                descriptorTuples[i + 6] // setterPointer
                );
              }
              // Use `ObjectDefineProperties()` instead of individual
              // `ReflectDefineProperty()` calls for better performance.
              ObjectDefineProperties(shadowTarget, descriptors);
            });
          } catch (error) {
            var _selectedTarget2;
            const errorToThrow = (_selectedTarget2 = selectedTarget) != null ? _selectedTarget2 : error;
            selectedTarget = undefined;
            throw errorToThrow;
          }
          let proto;
          if (typeof protoPointerOrNull === 'function') {
            protoPointerOrNull();
            proto = selectedTarget;
            selectedTarget = undefined;
          } else {
            proto = null;
          }
          ReflectSetPrototypeOf(shadowTarget, proto);
        }
        function createApplyOrConstructTrapForZeroOrMoreArgs(proxyTrapEnum) {
          const isApplyTrap = proxyTrapEnum & 1 /* ProxyHandlerTraps.Apply */;
          const arityToApplyOrConstructTrapNameRegistry = isApplyTrap ? applyTrapNameRegistry : constructTrapNameRegistry;
          const foreignCallableApplyOrConstruct = isApplyTrap ? foreignCallableApply : foreignCallableConstruct;
          return function applyOrConstructTrap(_shadowTarget, thisArgOrArgs, argsOrNewTarget) {
            lastProxyTrapCalled = proxyTrapEnum;
            const args = isApplyTrap ? argsOrNewTarget : thisArgOrArgs;
            const {
              length
            } = args;
            if (length !== 0) {
              var _arityToApplyOrConstr;
              return this[(_arityToApplyOrConstr = arityToApplyOrConstructTrapNameRegistry[length]) != null ? _arityToApplyOrConstr : arityToApplyOrConstructTrapNameRegistry.n](_shadowTarget, thisArgOrArgs, argsOrNewTarget);
            }
            // @ts-ignore: Prevent private property access error.
            const {
              foreignTargetPointer
            } = this;
            const thisArgOrNewTarget = isApplyTrap ? thisArgOrArgs : argsOrNewTarget;
            let pointerOrPrimitive;
            try {
              pointerOrPrimitive = foreignCallableApplyOrConstruct(foreignTargetPointer,
              // Inline getTransferableValue().
              typeof thisArgOrNewTarget === 'object' && thisArgOrNewTarget !== null || typeof thisArgOrNewTarget === 'function' ? getTransferablePointer(thisArgOrNewTarget) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof thisArgOrNewTarget === 'undefined' ? undefined : thisArgOrNewTarget);
            } catch (error) {
              var _selectedTarget3;
              const errorToThrow = (_selectedTarget3 = selectedTarget) != null ? _selectedTarget3 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let result;
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
            return result;
          };
        }
        function createApplyOrConstructTrapForOneOrMoreArgs(proxyTrapEnum) {
          const isApplyTrap = proxyTrapEnum & 1 /* ProxyHandlerTraps.Apply */;
          const arityToApplyOrConstructTrapNameRegistry = isApplyTrap ? applyTrapNameRegistry : constructTrapNameRegistry;
          const foreignCallableApplyOrConstruct = isApplyTrap ? foreignCallableApply : foreignCallableConstruct;
          return function applyOrConstructTrapForOneOrMoreArgs(_shadowTarget, thisArgOrArgs, argsOrNewTarget) {
            lastProxyTrapCalled = proxyTrapEnum;
            const args = isApplyTrap ? argsOrNewTarget : thisArgOrArgs;
            const {
              length
            } = args;
            if (length !== 1) {
              var _arityToApplyOrConstr2;
              return this[(_arityToApplyOrConstr2 = arityToApplyOrConstructTrapNameRegistry[length]) != null ? _arityToApplyOrConstr2 : arityToApplyOrConstructTrapNameRegistry.n](_shadowTarget, thisArgOrArgs, argsOrNewTarget);
            }
            // @ts-ignore: Prevent private property access error.
            const {
              foreignTargetPointer
            } = this;
            const thisArgOrNewTarget = isApplyTrap ? thisArgOrArgs : argsOrNewTarget;
            let pointerOrPrimitive;
            try {
              const {
                0: arg0
              } = args;
              pointerOrPrimitive = foreignCallableApplyOrConstruct(foreignTargetPointer,
              // Inline getTransferableValue().
              typeof thisArgOrNewTarget === 'object' && thisArgOrNewTarget !== null || typeof thisArgOrNewTarget === 'function' ? getTransferablePointer(thisArgOrNewTarget) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof thisArgOrNewTarget === 'undefined' ? undefined : thisArgOrNewTarget,
              // Inline getTransferableValue().
              typeof arg0 === 'object' && arg0 !== null || typeof arg0 === 'function' ? getTransferablePointer(arg0) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg0 === 'undefined' ? undefined : arg0);
            } catch (error) {
              var _selectedTarget4;
              const errorToThrow = (_selectedTarget4 = selectedTarget) != null ? _selectedTarget4 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let result;
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
            return result;
          };
        }
        function createApplyOrConstructTrapForTwoOrMoreArgs(proxyTrapEnum) {
          const isApplyTrap = proxyTrapEnum & 1 /* ProxyHandlerTraps.Apply */;
          const arityToApplyOrConstructTrapNameRegistry = isApplyTrap ? applyTrapNameRegistry : constructTrapNameRegistry;
          const foreignCallableApplyOrConstruct = isApplyTrap ? foreignCallableApply : foreignCallableConstruct;
          return function applyOrConstructTrapForTwoOrMoreArgs(_shadowTarget, thisArgOrArgs, argsOrNewTarget) {
            lastProxyTrapCalled = proxyTrapEnum;
            const args = isApplyTrap ? argsOrNewTarget : thisArgOrArgs;
            const {
              length
            } = args;
            if (length !== 2) {
              var _arityToApplyOrConstr3;
              return this[(_arityToApplyOrConstr3 = arityToApplyOrConstructTrapNameRegistry[length]) != null ? _arityToApplyOrConstr3 : arityToApplyOrConstructTrapNameRegistry.n](_shadowTarget, thisArgOrArgs, argsOrNewTarget);
            }
            // @ts-ignore: Prevent private property access error.
            const {
              foreignTargetPointer
            } = this;
            const thisArgOrNewTarget = isApplyTrap ? thisArgOrArgs : argsOrNewTarget;
            let pointerOrPrimitive;
            try {
              const {
                0: arg0,
                1: arg1
              } = args;
              pointerOrPrimitive = foreignCallableApplyOrConstruct(foreignTargetPointer,
              // Inline getTransferableValue().
              typeof thisArgOrNewTarget === 'object' && thisArgOrNewTarget !== null || typeof thisArgOrNewTarget === 'function' ? getTransferablePointer(thisArgOrNewTarget) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof thisArgOrNewTarget === 'undefined' ? undefined : thisArgOrNewTarget,
              // Inline getTransferableValue().
              typeof arg0 === 'object' && arg0 !== null || typeof arg0 === 'function' ? getTransferablePointer(arg0) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg0 === 'undefined' ? undefined : arg0,
              // Inline getTransferableValue().
              typeof arg1 === 'object' && arg1 !== null || typeof arg1 === 'function' ? getTransferablePointer(arg1) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg1 === 'undefined' ? undefined : arg1);
            } catch (error) {
              var _selectedTarget5;
              const errorToThrow = (_selectedTarget5 = selectedTarget) != null ? _selectedTarget5 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let result;
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
            return result;
          };
        }
        function createApplyOrConstructTrapForThreeOrMoreArgs(proxyTrapEnum) {
          const isApplyTrap = proxyTrapEnum & 1 /* ProxyHandlerTraps.Apply */;
          const arityToApplyOrConstructTrapNameRegistry = isApplyTrap ? applyTrapNameRegistry : constructTrapNameRegistry;
          const foreignCallableApplyOrConstruct = isApplyTrap ? foreignCallableApply : foreignCallableConstruct;
          return function applyOrConstructTrapForTwoOrMoreArgs(_shadowTarget, thisArgOrArgs, argsOrNewTarget) {
            lastProxyTrapCalled = proxyTrapEnum;
            const args = isApplyTrap ? argsOrNewTarget : thisArgOrArgs;
            const {
              length
            } = args;
            if (length !== 3) {
              var _arityToApplyOrConstr4;
              return this[(_arityToApplyOrConstr4 = arityToApplyOrConstructTrapNameRegistry[length]) != null ? _arityToApplyOrConstr4 : arityToApplyOrConstructTrapNameRegistry.n](_shadowTarget, thisArgOrArgs, argsOrNewTarget);
            }
            // @ts-ignore: Prevent private property access error.
            const {
              foreignTargetPointer
            } = this;
            const thisArgOrNewTarget = isApplyTrap ? thisArgOrArgs : argsOrNewTarget;
            let pointerOrPrimitive;
            try {
              const {
                0: arg0,
                1: arg1,
                2: arg2
              } = args;
              pointerOrPrimitive = foreignCallableApplyOrConstruct(foreignTargetPointer,
              // Inline getTransferableValue().
              typeof thisArgOrNewTarget === 'object' && thisArgOrNewTarget !== null || typeof thisArgOrNewTarget === 'function' ? getTransferablePointer(thisArgOrNewTarget) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof thisArgOrNewTarget === 'undefined' ? undefined : thisArgOrNewTarget,
              // Inline getTransferableValue().
              typeof arg0 === 'object' && arg0 !== null || typeof arg0 === 'function' ? getTransferablePointer(arg0) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg0 === 'undefined' ? undefined : arg0,
              // Inline getTransferableValue().
              typeof arg1 === 'object' && arg1 !== null || typeof arg1 === 'function' ? getTransferablePointer(arg1) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg1 === 'undefined' ? undefined : arg1,
              // Inline getTransferableValue().
              typeof arg2 === 'object' && arg2 !== null || typeof arg2 === 'function' ? getTransferablePointer(arg2) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg2 === 'undefined' ? undefined : arg2);
            } catch (error) {
              var _selectedTarget6;
              const errorToThrow = (_selectedTarget6 = selectedTarget) != null ? _selectedTarget6 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let result;
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
            return result;
          };
        }
        function createApplyOrConstructTrapForFourOrMoreArgs(proxyTrapEnum) {
          const isApplyTrap = proxyTrapEnum & 1 /* ProxyHandlerTraps.Apply */;
          const arityToApplyOrConstructTrapNameRegistry = isApplyTrap ? applyTrapNameRegistry : constructTrapNameRegistry;
          const foreignCallableApplyOrConstruct = isApplyTrap ? foreignCallableApply : foreignCallableConstruct;
          return function applyOrConstructTrapForTwoOrMoreArgs(_shadowTarget, thisArgOrArgs, argsOrNewTarget) {
            lastProxyTrapCalled = proxyTrapEnum;
            const args = isApplyTrap ? argsOrNewTarget : thisArgOrArgs;
            const {
              length
            } = args;
            if (length !== 4) {
              var _arityToApplyOrConstr5;
              return this[(_arityToApplyOrConstr5 = arityToApplyOrConstructTrapNameRegistry[length]) != null ? _arityToApplyOrConstr5 : arityToApplyOrConstructTrapNameRegistry.n](_shadowTarget, thisArgOrArgs, argsOrNewTarget);
            }
            // @ts-ignore: Prevent private property access error.
            const {
              foreignTargetPointer
            } = this;
            const thisArgOrNewTarget = isApplyTrap ? thisArgOrArgs : argsOrNewTarget;
            let pointerOrPrimitive;
            try {
              const {
                0: arg0,
                1: arg1,
                2: arg2,
                3: arg3
              } = args;
              pointerOrPrimitive = foreignCallableApplyOrConstruct(foreignTargetPointer,
              // Inline getTransferableValue().
              typeof thisArgOrNewTarget === 'object' && thisArgOrNewTarget !== null || typeof thisArgOrNewTarget === 'function' ? getTransferablePointer(thisArgOrNewTarget) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof thisArgOrNewTarget === 'undefined' ? undefined : thisArgOrNewTarget,
              // Inline getTransferableValue().
              typeof arg0 === 'object' && arg0 !== null || typeof arg0 === 'function' ? getTransferablePointer(arg0) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg0 === 'undefined' ? undefined : arg0,
              // Inline getTransferableValue().
              typeof arg1 === 'object' && arg1 !== null || typeof arg1 === 'function' ? getTransferablePointer(arg1) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg1 === 'undefined' ? undefined : arg1,
              // Inline getTransferableValue().
              typeof arg2 === 'object' && arg2 !== null || typeof arg2 === 'function' ? getTransferablePointer(arg2) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg2 === 'undefined' ? undefined : arg2,
              // Inline getTransferableValue().
              typeof arg3 === 'object' && arg3 !== null || typeof arg3 === 'function' ? getTransferablePointer(arg3) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg3 === 'undefined' ? undefined : arg3);
            } catch (error) {
              var _selectedTarget7;
              const errorToThrow = (_selectedTarget7 = selectedTarget) != null ? _selectedTarget7 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let result;
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
            return result;
          };
        }
        function createApplyOrConstructTrapForFiveOrMoreArgs(proxyTrapEnum) {
          const isApplyTrap = proxyTrapEnum & 1 /* ProxyHandlerTraps.Apply */;
          const arityToApplyOrConstructTrapNameRegistry = isApplyTrap ? applyTrapNameRegistry : constructTrapNameRegistry;
          const foreignCallableApplyOrConstruct = isApplyTrap ? foreignCallableApply : foreignCallableConstruct;
          return function applyOrConstructTrapForTwoOrMoreArgs(_shadowTarget, thisArgOrArgs, argsOrNewTarget) {
            lastProxyTrapCalled = proxyTrapEnum;
            const args = isApplyTrap ? argsOrNewTarget : thisArgOrArgs;
            const {
              length
            } = args;
            if (length !== 5) {
              var _arityToApplyOrConstr6;
              return this[(_arityToApplyOrConstr6 = arityToApplyOrConstructTrapNameRegistry[length]) != null ? _arityToApplyOrConstr6 : arityToApplyOrConstructTrapNameRegistry.n](_shadowTarget, thisArgOrArgs, argsOrNewTarget);
            }
            // @ts-ignore: Prevent private property access error.
            const {
              foreignTargetPointer
            } = this;
            const thisArgOrNewTarget = isApplyTrap ? thisArgOrArgs : argsOrNewTarget;
            let pointerOrPrimitive;
            try {
              const {
                0: arg0,
                1: arg1,
                2: arg2,
                3: arg3,
                4: arg4
              } = args;
              pointerOrPrimitive = foreignCallableApplyOrConstruct(foreignTargetPointer,
              // Inline getTransferableValue().
              typeof thisArgOrNewTarget === 'object' && thisArgOrNewTarget !== null || typeof thisArgOrNewTarget === 'function' ? getTransferablePointer(thisArgOrNewTarget) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof thisArgOrNewTarget === 'undefined' ? undefined : thisArgOrNewTarget,
              // Inline getTransferableValue().
              typeof arg0 === 'object' && arg0 !== null || typeof arg0 === 'function' ? getTransferablePointer(arg0) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg0 === 'undefined' ? undefined : arg0,
              // Inline getTransferableValue().
              typeof arg1 === 'object' && arg1 !== null || typeof arg1 === 'function' ? getTransferablePointer(arg1) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg1 === 'undefined' ? undefined : arg1,
              // Inline getTransferableValue().
              typeof arg2 === 'object' && arg2 !== null || typeof arg2 === 'function' ? getTransferablePointer(arg2) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg2 === 'undefined' ? undefined : arg2,
              // Inline getTransferableValue().
              typeof arg3 === 'object' && arg3 !== null || typeof arg3 === 'function' ? getTransferablePointer(arg3) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg3 === 'undefined' ? undefined : arg3,
              // Inline getTransferableValue().
              typeof arg4 === 'object' && arg4 !== null || typeof arg4 === 'function' ? getTransferablePointer(arg4) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof arg4 === 'undefined' ? undefined : arg4);
            } catch (error) {
              var _selectedTarget8;
              const errorToThrow = (_selectedTarget8 = selectedTarget) != null ? _selectedTarget8 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let result;
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
            return result;
          };
        }
        function createApplyOrConstructTrapForAnyNumberOfArgs(proxyTrapEnum) {
          const isApplyTrap = proxyTrapEnum & 1 /* ProxyHandlerTraps.Apply */;
          const foreignCallableApplyOrConstruct = isApplyTrap ? foreignCallableApply : foreignCallableConstruct;
          return function applyOrConstructTrapForAnyNumberOfArgs(_shadowTarget, thisArgOrArgs, argsOrNewTarget) {
            lastProxyTrapCalled = proxyTrapEnum;
            // @ts-ignore: Prevent private property access error.
            const {
              foreignTargetPointer
            } = this;
            const args = isApplyTrap ? argsOrNewTarget : thisArgOrArgs;
            const {
              length
            } = args;
            const thisArgOrNewTarget = isApplyTrap ? thisArgOrArgs : argsOrNewTarget;
            let combinedOffset = 2;
            const combinedArgs = new ArrayCtor(length + combinedOffset);
            combinedArgs[0] = foreignTargetPointer;
            let pointerOrPrimitive;
            try {
              combinedArgs[1] = typeof thisArgOrNewTarget === 'object' && thisArgOrNewTarget !== null || typeof thisArgOrNewTarget === 'function' ? getTransferablePointer(thisArgOrNewTarget) :
              // Intentionally ignoring `document.all`.
              // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
              // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
              typeof thisArgOrNewTarget === 'undefined' ? undefined : thisArgOrNewTarget;
              for (let i = 0; i < length; i += 1) {
                const arg = args[i];
                // Inlining `getTransferableValue()`.
                combinedArgs[combinedOffset++] = typeof arg === 'object' && arg !== null || typeof arg === 'function' ? getTransferablePointer(arg) :
                // Intentionally ignoring `document.all`.
                // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
                // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
                typeof arg === 'undefined' ? undefined : arg;
              }
              pointerOrPrimitive = ReflectApply(foreignCallableApplyOrConstruct, undefined, combinedArgs);
            } catch (error) {
              var _selectedTarget9;
              const errorToThrow = (_selectedTarget9 = selectedTarget) != null ? _selectedTarget9 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let result;
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
            return result;
          };
        }
        function createDescriptorFromMeta(configurable, enumerable, writable, valuePointerOrPrimitive, getterPointerOrPrimitive, setterPointerOrPrimitive) {
          const safeDesc = {
            __proto__: null
          };
          if (configurable !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
            safeDesc.configurable = configurable;
          }
          if (enumerable !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
            safeDesc.enumerable = enumerable;
          }
          if (writable !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
            safeDesc.writable = writable;
          }
          if (getterPointerOrPrimitive !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
            if (typeof getterPointerOrPrimitive === 'function') {
              getterPointerOrPrimitive();
              safeDesc.get = selectedTarget;
              selectedTarget = undefined;
            } else {
              safeDesc.get = undefined;
            }
          }
          if (setterPointerOrPrimitive !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
            if (typeof setterPointerOrPrimitive === 'function') {
              setterPointerOrPrimitive();
              safeDesc.set = selectedTarget;
              selectedTarget = undefined;
            } else {
              safeDesc.set = undefined;
            }
          }
          if (valuePointerOrPrimitive !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
            if (typeof valuePointerOrPrimitive === 'function') {
              valuePointerOrPrimitive();
              safeDesc.value = selectedTarget;
              selectedTarget = undefined;
            } else {
              safeDesc.value = valuePointerOrPrimitive;
            }
          }
          return safeDesc;
        }
        function createPointer(originalTarget) {
          const pointer = () => {
            // assert: selectedTarget is undefined
            selectedTarget = originalTarget;
          };
          return pointer;
        }
        const disableFastForeignTargetPointers = IS_IN_SHADOW_REALM ? () => {
          useFastForeignTargetPath = false;
          useFastForeignTargetPathForTypedArrays = false;
          clearFastForeignTargetPointers();
        } : noop;
        const getLazyPropertyDescriptorStateByTarget = IS_IN_SHADOW_REALM ? target => {
          let state = lazyPropertyDescriptorStateCache.get(target);
          if (state === undefined) {
            const statePointerOrUndefined = foreignCallableGetLazyPropertyDescriptorStateByTarget(getTransferablePointer(target));
            if (typeof statePointerOrUndefined === 'function') {
              statePointerOrUndefined();
              state = selectedTarget;
              selectedTarget = undefined;
              if (state) {
                lazyPropertyDescriptorStateCache.set(target, state);
              }
            }
          }
          return state;
        } : noop;
        const isForeignPointerOfObjectProto = IS_IN_SHADOW_REALM ?
        // eslint-disable-next-line no-return-assign
        foreignTargetPointer => foreignTargetPointer === (foreignPointerObjectProto === undefined ? foreignPointerObjectProto = getTransferablePointer(ObjectProto) : foreignPointerObjectProto) : alwaysFalse;
        const isForeignPointerOfTypedArrayProto = IS_IN_SHADOW_REALM ?
        // eslint-disable-next-line no-return-assign
        foreignTargetPointer => foreignTargetPointer === (foreignPointerFloat32ArrayProto === undefined ? foreignPointerFloat32ArrayProto = getTransferablePointer(Float32ArrayProto) : foreignPointerFloat32ArrayProto) || foreignTargetPointer === (foreignPointerFloat64ArrayProto === undefined ? foreignPointerFloat64ArrayProto = getTransferablePointer(Float64ArrayProto) : foreignPointerFloat64ArrayProto) || foreignTargetPointer === (foreignPointerInt8ArrayProto === undefined ? foreignPointerInt8ArrayProto = getTransferablePointer(Int8ArrayProto) : foreignPointerInt8ArrayProto) || foreignTargetPointer === (foreignPointerInt16ArrayProto === undefined ? foreignPointerInt16ArrayProto = getTransferablePointer(Int16ArrayProto) : foreignPointerInt16ArrayProto) || foreignTargetPointer === (foreignPointerInt32ArrayProto === undefined ? foreignPointerInt32ArrayProto = getTransferablePointer(Int32ArrayProto) : foreignPointerInt32ArrayProto) || foreignTargetPointer === (foreignPointerUint8ArrayProto === undefined ? foreignPointerUint8ArrayProto = getTransferablePointer(Uint8ArrayProto) : foreignPointerUint8ArrayProto) || foreignTargetPointer === (foreignPointerUint16ArrayProto === undefined ? foreignPointerUint16ArrayProto = getTransferablePointer(Uint16ArrayProto) : foreignPointerUint16ArrayProto) || foreignTargetPointer === (foreignPointerUint32ArrayProto === undefined ? foreignPointerUint32ArrayProto = getTransferablePointer(Uint32ArrayProto) : foreignPointerUint32ArrayProto) || foreignTargetPointer === (foreignPointerTypedArrayProto === undefined ? foreignPointerTypedArrayProto = getTransferablePointer(TypedArrayProto) : foreignPointerTypedArrayProto) || foreignTargetPointer === (foreignPointerBigInt64ArrayProto === undefined ? foreignPointerBigInt64ArrayProto = BigInt64ArrayProto ? getTransferablePointer(BigInt64ArrayProto) : noop : foreignPointerBigInt64ArrayProto) || foreignTargetPointer === (foreignPointerBigUint64ArrayProto === undefined ? foreignPointerBigUint64ArrayProto = BigUint64ArrayProto ? getTransferablePointer(BigUint64ArrayProto) : noop : foreignPointerBigUint64ArrayProto) : alwaysFalse;
        function getTransferablePointer(originalTarget, foreignCallablePusher = foreignCallablePushTarget) {
          let proxyPointer = proxyPointerCache.get(originalTarget);
          if (proxyPointer) {
            return proxyPointer;
          }
          let targetFunctionArity = 0;
          let targetFunctionName = '';
          let targetTypedArrayLength = 0;
          if (revokedProxyCallback && revokedProxyCallback(originalTarget)) {
            proxyPointer = foreignCallablePusher(createPointer(originalTarget), 64 /* TargetTraits.Revoked */, targetFunctionArity, targetFunctionName, targetTypedArrayLength);
            proxyPointerCache.set(originalTarget, proxyPointer);
            return proxyPointer;
          }
          let distortionTarget;
          let targetTraits = 16 /* TargetTraits.IsObject */;
          if (distortionCallback) {
            distortionTarget = distortionCallback(originalTarget);
            // If a distortion entry is found, it must be a valid proxy target.
            if (distortionTarget !== originalTarget && typeof distortionTarget !== typeof originalTarget) {
              throw new TypeErrorCtor(`Invalid distortion ${toSafeTemplateStringValue(originalTarget)}.`);
            }
          } else {
            distortionTarget = originalTarget;
          }
          let isPossiblyRevoked = true;
          if (typeof distortionTarget === 'function') {
            isPossiblyRevoked = false;
            targetFunctionArity = 0;
            targetTraits = 4 /* TargetTraits.IsFunction */;
            try {
              // Detect arrow functions.
              if (!('prototype' in distortionTarget)) {
                targetTraits |= 8 /* TargetTraits.IsArrowFunction */;
              }

              const safeLengthDesc = ReflectGetOwnPropertyDescriptor(originalTarget, 'length');
              if (safeLengthDesc) {
                ReflectSetPrototypeOf(safeLengthDesc, null);
                const {
                  value: safeLengthDescValue
                } = safeLengthDesc;
                if (typeof safeLengthDescValue === 'number') {
                  targetFunctionArity = safeLengthDescValue;
                }
              }
              const safeNameDesc = false ? ReflectGetOwnPropertyDescriptor(originalTarget, 'name') : undefined;
              if (safeNameDesc) ;
            } catch (_unused16) {
              isPossiblyRevoked = true;
            }
          } else if (ArrayBufferIsView(distortionTarget)) {
            isPossiblyRevoked = false;
            targetTraits = 2 /* TargetTraits.IsArrayBufferView */;
            try {
              targetTypedArrayLength = ReflectApply(TypedArrayProtoLengthGetter, distortionTarget, []);
              targetTraits |= 32 /* TargetTraits.IsTypedArray */;
              // eslint-disable-next-line no-empty
            } catch (_unused17) {
              // Could be a DataView object or a revoked proxy.
              isPossiblyRevoked = true;
            }
          }
          if (isPossiblyRevoked) {
            try {
              if (isArrayOrThrowForRevoked(distortionTarget)) {
                targetTraits = 1 /* TargetTraits.IsArray */;
              }
            } catch (_unused18) {
              targetTraits = 64 /* TargetTraits.Revoked */;
            }
          }

          proxyPointer = foreignCallablePusher(createPointer(distortionTarget), targetTraits, targetFunctionArity, targetFunctionName, targetTypedArrayLength);
          proxyPointerCache.set(originalTarget, proxyPointer);
          return proxyPointer;
        }
        const installPropertyDescriptorMethodWrappers = IS_IN_SHADOW_REALM ? unforgeableGlobalThisKeys => {
          if (installedPropertyDescriptorMethodWrappersFlag) {
            return;
          }
          installedPropertyDescriptorMethodWrappersFlag = true;
          // We wrap property descriptor methods to activate lazy
          // descriptors and/or workaround browser bugs. The following
          // methods are wrapped:
          //   Object.getOwnPropertyDescriptors()
          //   Object.getOwnPropertyDescriptor()
          //   Reflect.defineProperty()
          //   Reflect.getOwnPropertyDescriptor()
          //   Object.prototype.__defineGetter__()
          //   Object.prototype.__defineSetter__()
          //   Object.prototype.__lookupGetter__()
          //   Object.prototype.__lookupSetter__()
          //
          // Chromium based browsers have a bug that nulls the result
          // of `window` getters in detached iframes when the property
          // descriptor of `window.window` is retrieved.
          // https://bugs.chromium.org/p/chromium/issues/detail?id=1305302
          //
          // Methods may be poisoned when they interact with the `window`
          // object and retrieve property descriptors, like 'window',
          // that contain the `window` object itself. The following
          // built-in methods are susceptible to this issue:
          //     console.log(window);
          //     Object.getOwnPropertyDescriptors(window);
          //     Object.getOwnPropertyDescriptor(window, 'window');
          //     Reflect.getOwnPropertyDescriptor(window, 'window');
          //     window.__lookupGetter__('window');
          //     window.__lookupSetter__('window');
          //
          // We side step issues with `console` by mapping it to the
          // primary realm's `console`. Since we're already wrapping
          // property descriptor methods to activate lazy descriptors
          // we use the wrapper to workaround the `window` getter
          // nulling bug.
          const shouldFixChromeBug = isArrayOrThrowForRevoked(unforgeableGlobalThisKeys) && unforgeableGlobalThisKeys.length > 0;
          // Lazily populated by `getUnforgeableGlobalThisGetter()`;
          const keyToGlobalThisGetterRegistry = shouldFixChromeBug ? {
            __proto__: null
          } : undefined;
          const getFixedDescriptor = shouldFixChromeBug ? (target, key) => ReflectApply(ArrayProtoIncludes, unforgeableGlobalThisKeys, [key]) ? {
            configurable: false,
            enumerable: ReflectApply(ObjectProtoPropertyIsEnumerable, target, [key]),
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            get: getUnforgeableGlobalThisGetter(key),
            set: undefined
          } : ReflectGetOwnPropertyDescriptor(target, key) : undefined;
          const getUnforgeableGlobalThisGetter = shouldFixChromeBug ? key => {
            let globalThisGetter = keyToGlobalThisGetterRegistry[key];
            if (globalThisGetter === undefined) {
              // We can't access the original getter to mask
              // with `proxyMaskFunction()`, so instead we wrap
              // `unboundGlobalThisGetter` in bound function
              // to obscure the getter source as "[native code]".
              globalThisGetter = ReflectApply(FunctionProtoBind,
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              unboundGlobalThisGetter, []);
              // Preserve identity continuity of getters.
              keyToGlobalThisGetterRegistry[key] = globalThisGetter;
            }
            return globalThisGetter;
          } : undefined;
          const lookupFixedGetter = shouldFixChromeBug ? (target, key) => ReflectApply(ArrayProtoIncludes, unforgeableGlobalThisKeys, [key]) ? getUnforgeableGlobalThisGetter(key) : ReflectApply(ObjectProtoLookupGetter, target, [key]) : undefined;
          const lookupFixedSetter = shouldFixChromeBug ? (target, key) => ReflectApply(ArrayProtoIncludes, unforgeableGlobalThisKeys, [key]) ? undefined : ReflectApply(ObjectProtoLookupSetter, target, [key]) : undefined;
          const unboundGlobalThisGetter = shouldFixChromeBug ? () => globalThisRef : undefined;
          const wrapDefineAccessOrProperty = originalFunc => {
            const {
              length: originalFuncLength
            } = originalFunc;
            // `__defineGetter__()` and `__defineSetter__()` have
            // function lengths of 2 while `Reflect.defineProperty()`
            // has a function length of 3.
            const useThisArgAsTarget = originalFuncLength === 2;
            return new ProxyCtor(originalFunc, {
              apply(_originalFunc, thisArg, args) {
                if (args.length >= originalFuncLength) {
                  const target = useThisArgAsTarget ? thisArg : args[0];
                  if (typeof target === 'object' && target !== null || typeof target === 'function') {
                    const key = useThisArgAsTarget ? args[0] : args[1];
                    const state = getLazyPropertyDescriptorStateByTarget(target);
                    if (state != null && state[key]) {
                      // Activate the descriptor by triggering
                      // its getter.
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      target[key];
                    }
                  }
                }
                return ReflectApply(originalFunc, thisArg, args);
              }
            });
          };
          const wrapLookupAccessor = (originalFunc, lookupFixedAccessor) => new ProxyCtor(originalFunc, {
            apply(_originalFunc, thisArg, args) {
              if (args.length && (typeof thisArg === 'object' && thisArg !== null || typeof thisArg === 'function')) {
                const {
                  0: key
                } = args;
                const state = getLazyPropertyDescriptorStateByTarget(thisArg);
                if (state != null && state[key]) {
                  // Activate the descriptor by triggering
                  // its getter.
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  thisArg[key];
                }
                if (shouldFixChromeBug && thisArg === globalThisRef) {
                  return lookupFixedAccessor(thisArg, key);
                }
              }
              return ReflectApply(originalFunc, thisArg, args);
            }
          });
          const wrapGetOwnPropertyDescriptor = originalFunc => new ProxyCtor(originalFunc, {
            apply(_originalFunc, thisArg, args) {
              if (args.length > 1) {
                const {
                  0: target,
                  1: key
                } = args;
                if (typeof target === 'object' && target !== null || typeof target === 'function') {
                  const state = getLazyPropertyDescriptorStateByTarget(target);
                  if (state != null && state[key]) {
                    // Activate the descriptor by triggering
                    // its getter.
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    target[key];
                  }
                  if (shouldFixChromeBug && target === globalThisRef) {
                    return getFixedDescriptor(target, key);
                  }
                }
              }
              return ReflectApply(originalFunc, thisArg, args);
            }
          });
          const wrapGetOwnPropertyDescriptors = originalFunc => new ProxyCtor(originalFunc, {
            apply(_originalFunc, thisArg, args) {
              const target = args.length ? args[0] : undefined;
              if (!(typeof target === 'object' && target !== null || typeof target === 'function')) {
                // Defer to native method to throw exception.
                return ReflectApply(originalFunc, thisArg, args);
              }
              const state = getLazyPropertyDescriptorStateByTarget(target);
              const isFixingChromeBug = target === globalThisRef && shouldFixChromeBug;
              const unsafeDescs = isFixingChromeBug ?
              // Create an empty property descriptor map
              // to populate with curated descriptors.
              {} :
              // Since this is not a global object it is
              // safe to use the native method.
              ReflectApply(originalFunc, thisArg, args);
              if (!isFixingChromeBug && state === undefined) {
                // Exit early if the target is not a global
                // object and there are no lazy descriptors.
                return unsafeDescs;
              }
              const ownKeys = ReflectOwnKeys(isFixingChromeBug ? target : unsafeDescs);
              for (let i = 0, {
                  length
                } = ownKeys; i < length; i += 1) {
                const ownKey = ownKeys[i];
                const isLazyProp = !!(state != null && state[ownKey]);
                if (isLazyProp) {
                  // Activate the descriptor by triggering
                  // its getter.
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  target[ownKey];
                }
                if (isLazyProp || isFixingChromeBug) {
                  const unsafeDesc = isFixingChromeBug ? getFixedDescriptor(target, ownKey) : ReflectGetOwnPropertyDescriptor(target, ownKey);
                  // Update the descriptor map entry.
                  if (unsafeDesc) {
                    unsafeDescs[ownKey] = unsafeDesc;
                  } else if (!isFixingChromeBug) {
                    ReflectDeleteProperty(unsafeDescs, ownKey);
                  }
                }
              }
              return unsafeDescs;
            }
          });
          try {
            ReflectRef.defineProperty = wrapDefineAccessOrProperty(ReflectDefineProperty);
            // eslint-disable-next-line no-empty
          } catch (_unused19) {}
          try {
            ReflectRef.getOwnPropertyDescriptor = wrapGetOwnPropertyDescriptor(ReflectGetOwnPropertyDescriptor);
            // eslint-disable-next-line no-empty
          } catch (_unused20) {}
          try {
            ObjectCtor.getOwnPropertyDescriptor = wrapGetOwnPropertyDescriptor(ObjectGetOwnPropertyDescriptor);
            // eslint-disable-next-line no-empty
          } catch (_unused21) {}
          try {
            ObjectCtor.getOwnPropertyDescriptors = wrapGetOwnPropertyDescriptors(ObjectGetOwnPropertyDescriptors);
            // eslint-disable-next-line no-empty
          } catch (_unused22) {}
          try {
            // eslint-disable-next-line @typescript-eslint/naming-convention, no-restricted-properties, no-underscore-dangle
            ObjectProto.__defineGetter__ = wrapDefineAccessOrProperty(ObjectProtoDefineGetter);
            // eslint-disable-next-line no-empty
          } catch (_unused23) {}
          try {
            // eslint-disable-next-line @typescript-eslint/naming-convention, no-restricted-properties, no-underscore-dangle
            ObjectProto.__defineSetter__ = wrapDefineAccessOrProperty(ObjectProtoDefineSetter);
            // eslint-disable-next-line no-empty
          } catch (_unused24) {}
          try {
            // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
            ObjectProto.__lookupGetter__ = wrapLookupAccessor(ObjectProtoLookupGetter, lookupFixedGetter);
            // eslint-disable-next-line no-empty
          } catch (_unused25) {}
          try {
            // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
            ObjectProto.__lookupSetter__ = wrapLookupAccessor(ObjectProtoLookupSetter, lookupFixedSetter);
            // eslint-disable-next-line no-empty
          } catch (_unused26) {}
        } : noop;
        function lookupForeignDescriptor(foreignTargetPointer, shadowTarget, key) {
          let protoPointerOrNull;
          let safeDesc;
          try {
            protoPointerOrNull = foreignCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor(foreignTargetPointer, key, (_key, configurable, enumerable, writable, valuePointerOrPrimitive, getterPointerOrPrimitive, setterPointerOrPrimitive) => {
              safeDesc = {
                __proto__: null,
                foreign: true
              };
              if (configurable !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
                safeDesc.configurable = configurable;
              }
              if (enumerable !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
                safeDesc.enumerable = enumerable;
              }
              if (writable !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
                safeDesc.writable = writable;
              }
              if (getterPointerOrPrimitive !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
                if (typeof getterPointerOrPrimitive === 'function') {
                  getterPointerOrPrimitive();
                  safeDesc.get = selectedTarget;
                  selectedTarget = undefined;
                } else {
                  safeDesc.get = undefined;
                }
              }
              if (setterPointerOrPrimitive !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
                if (typeof setterPointerOrPrimitive === 'function') {
                  setterPointerOrPrimitive();
                  safeDesc.set = selectedTarget;
                  selectedTarget = undefined;
                } else {
                  safeDesc.set = undefined;
                }
              }
              if (valuePointerOrPrimitive !== LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
                if (typeof valuePointerOrPrimitive === 'function') {
                  valuePointerOrPrimitive();
                  safeDesc.value = selectedTarget;
                  selectedTarget = undefined;
                } else {
                  safeDesc.value = valuePointerOrPrimitive;
                }
              }
              if (configurable === false) {
                // Update the descriptor to non-configurable on
                // the shadow target.
                ReflectDefineProperty(shadowTarget, key, safeDesc);
              }
            });
          } catch (error) {
            var _selectedTarget10;
            const errorToThrow = (_selectedTarget10 = selectedTarget) != null ? _selectedTarget10 : error;
            selectedTarget = undefined;
            throw errorToThrow;
          }
          if (safeDesc === undefined) {
            // Avoiding calling the has trap for any proto chain operation,
            // instead we implement the regular logic here in this trap.
            let currentObject;
            if (typeof protoPointerOrNull === 'function') {
              protoPointerOrNull();
              currentObject = selectedTarget;
              selectedTarget = undefined;
            } else {
              currentObject = null;
            }
            while (currentObject) {
              safeDesc = ReflectGetOwnPropertyDescriptor(currentObject, key);
              if (safeDesc) {
                ReflectSetPrototypeOf(safeDesc, null);
                break;
              }
              currentObject = ReflectGetPrototypeOf(currentObject);
            }
            if (safeDesc) {
              var _ref3;
              const {
                get: getter,
                set: setter,
                value: localValue
              } = safeDesc;
              const possibleProxy = (_ref3 = getter != null ? getter : setter) != null ? _ref3 : localValue;
              safeDesc.foreign = (typeof possibleProxy === 'object' && possibleProxy !== null || typeof possibleProxy === 'function') && proxyPointerCache.get(possibleProxy) !== undefined;
            }
          }
          return safeDesc;
        }
        function passthruForeignTraversedSet(foreignTargetPointer, shadowTarget, key, value, receiver) {
          const safeDesc = lookupForeignDescriptor(foreignTargetPointer, shadowTarget, key);
          // Following the specification steps for
          // OrdinarySetWithOwnDescriptor ( O, P, V, Receiver, ownDesc ).
          // https://tc39.es/ecma262/#sec-ordinarysetwithowndescriptor
          if (safeDesc) {
            if ('get' in safeDesc || 'set' in safeDesc) {
              const {
                set: setter
              } = safeDesc;
              if (setter) {
                if (safeDesc.foreign) {
                  foreignCallableApply(getTransferablePointer(setter),
                  // Inline getTransferableValue().
                  typeof receiver === 'object' && receiver !== null || typeof receiver === 'function' ? getTransferablePointer(receiver) :
                  // Intentionally ignoring `document.all`.
                  // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
                  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
                  typeof receiver === 'undefined' ? undefined : receiver,
                  // Inline getTransferableValue().
                  typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) :
                  // Intentionally ignoring `document.all`.
                  // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
                  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
                  typeof value === 'undefined' ? undefined : value);
                } else {
                  // Even though the setter function exists, we can't
                  // use `ReflectSet()` because there might be a
                  // distortion for that setter function, in which
                  // case we must resolve the local setter and call
                  // it instead.
                  ReflectApply(setter, receiver, [value]);
                }
                // If there is a setter, it either throw or we can assume
                // the value was set.
                return true;
              }
              return false;
            }
            if (safeDesc.writable === false) {
              return false;
            }
          }
          // Exit early if receiver is not object like.
          if (!(typeof receiver === 'object' && receiver !== null || typeof receiver === 'function')) {
            return false;
          }
          const safeReceiverDesc = ReflectGetOwnPropertyDescriptor(receiver, key);
          if (safeReceiverDesc) {
            ReflectSetPrototypeOf(safeReceiverDesc, null);
            // Exit early for accessor descriptors or non-writable data
            // descriptors.
            if ('get' in safeReceiverDesc || 'set' in safeReceiverDesc || safeReceiverDesc.writable === false) {
              return false;
            }
            // Setting the descriptor with only a value entry should not
            // affect existing descriptor traits.
            ReflectDefineProperty(receiver, key, {
              __proto__: null,
              value
            });
            return true;
          }
          // `ReflectDefineProperty()` and `ReflectSet()` both are expected
          // to return `false` when attempting to add a new property if the
          // receiver is not extensible.
          return ReflectDefineProperty(receiver, key, {
            __proto__: null,
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        function pushErrorAcrossBoundary(error) {
          if (LOCKER_DEBUGGABLE_FLAG) {
            checkDebugMode();
          }
          // Inline getTransferableValue().
          if (typeof error === 'object' && error !== null || typeof error === 'function') {
            const foreignErrorPointer = getTransferablePointer(error, foreignCallablePushErrorTarget);
            foreignErrorPointer();
          }
          return error;
        }
        function pushTarget(foreignTargetPointer, foreignTargetTraits, foreignTargetFunctionArity, foreignTargetFunctionName, foreignTargetTypedArrayLength) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const {
            proxy
          } = new BoundaryProxyHandler(foreignTargetPointer, foreignTargetTraits, foreignTargetFunctionArity, foreignTargetFunctionName, foreignTargetTypedArrayLength);
          proxyPointerCache.set(proxy, foreignTargetPointer);
          return createPointer(proxy);
        }
        const setLazyPropertyDescriptorStateByTarget = IS_IN_SHADOW_REALM ? (target, state) => {
          lazyPropertyDescriptorStateCache.set(target, state);
          foreignCallableSetLazyPropertyDescriptorStateByTarget(getTransferablePointer(target), getTransferablePointer(state));
        } : noop;
        class BoundaryProxyHandler {
          constructor(foreignTargetPointer, foreignTargetTraits, foreignTargetFunctionArity, foreignTargetFunctionName, foreignTargetTypedArrayLength) {
            // Internal red/shadow realm side utilities:
            this.makeProxyLive = IS_IN_SHADOW_REALM ? function () {
              // Replace pending traps with live traps that can work with the
              // target without taking snapshots.
              this.deleteProperty = BoundaryProxyHandler.passthruDeletePropertyTrap;
              this.defineProperty = BoundaryProxyHandler.passthruDefinePropertyTrap;
              this.preventExtensions = BoundaryProxyHandler.passthruPreventExtensionsTrap;
              this.set = BoundaryProxyHandler.passthruSetTrap;
              this.setPrototypeOf = BoundaryProxyHandler.passthruSetPrototypeOfTrap;
            } : noop;
            this.makeProxyStatic = IS_IN_SHADOW_REALM ? function () {
              // Reset all traps except apply and construct for static proxies
              // since the proxy target is the shadow target and all operations
              // are going to be applied to it rather than the real target.
              this.defineProperty = BoundaryProxyHandler.staticDefinePropertyTrap;
              this.deleteProperty = BoundaryProxyHandler.staticDeletePropertyTrap;
              this.get = BoundaryProxyHandler.staticGetTrap;
              this.getOwnPropertyDescriptor = BoundaryProxyHandler.staticGetOwnPropertyDescriptorTrap;
              this.getPrototypeOf = BoundaryProxyHandler.staticGetPrototypeOfTrap;
              this.has = BoundaryProxyHandler.staticHasTrap;
              this.isExtensible = BoundaryProxyHandler.staticIsExtensibleTrap;
              this.ownKeys = BoundaryProxyHandler.staticOwnKeysTrap;
              this.preventExtensions = BoundaryProxyHandler.staticPreventExtensionsTrap;
              this.set = BoundaryProxyHandler.staticSetTrap;
              this.setPrototypeOf = BoundaryProxyHandler.staticSetPrototypeOfTrap;
              const {
                foreignTargetPointer,
                foreignTargetTraits,
                shadowTarget
              } = this;
              if (useFastForeignTargetPath) {
                fastForeignTargetPointers.delete(foreignTargetPointer);
              }
              // We don't wrap `foreignCallableGetTargetIntegrityTraits()`
              // in a try-catch because it cannot throw.
              const targetIntegrityTraits = foreignCallableGetTargetIntegrityTraits(foreignTargetPointer);
              if (targetIntegrityTraits & 8 /* TargetIntegrityTraits.Revoked */) {
                // the target is a revoked proxy, in which case we revoke
                // this proxy as well.
                this.revoke();
                return;
              }
              // A proxy can revoke itself when traps are triggered and break
              // the membrane, therefore we need protection.
              try {
                copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget(foreignTargetPointer, shadowTarget);
              } catch (_unused27) {
                // We don't wrap `foreignCallableIsTargetRevoked()` in a
                // try-catch because it cannot throw.
                if (foreignCallableIsTargetRevoked(foreignTargetPointer)) {
                  this.revoke();
                  return;
                }
              }
              if (foreignTargetTraits & 16 /* TargetTraits.IsObject */ && !(SymbolToStringTag in shadowTarget)) {
                let toStringTag = 'Object';
                try {
                  toStringTag = foreignCallableGetToStringTagOfTarget(foreignTargetPointer);
                  // eslint-disable-next-line no-empty
                } catch (_unused28) {}
                this.staticToStringTag = toStringTag;
              }
              // Preserve the semantics of the target.
              if (targetIntegrityTraits & 4 /* TargetIntegrityTraits.IsFrozen */) {
                ObjectFreeze(shadowTarget);
              } else {
                if (targetIntegrityTraits & 2 /* TargetIntegrityTraits.IsSealed */) {
                  ObjectSeal(shadowTarget);
                } else if (targetIntegrityTraits & 1 /* TargetIntegrityTraits.IsNotExtensible */) {
                  ReflectPreventExtensions(shadowTarget);
                }
                if (LOCKER_UNMINIFIED_FLAG) {
                  // We don't wrap `foreignCallableDebugInfo()` in a try-catch
                  // because it cannot throw.
                  foreignCallableDebugInfo('Mutations on the membrane of an object originating ' + 'outside of the sandbox will not be reflected on ' + 'the object itself:', foreignTargetPointer);
                }
              }
            } : noop;
            let shadowTarget;
            const isForeignTargetArray = foreignTargetTraits & 1 /* TargetTraits.IsArray */;
            const isForeignTargetFunction = foreignTargetTraits & 4 /* TargetTraits.IsFunction */;
            if (isForeignTargetFunction) {
              // This shadow target is never invoked. It's needed to avoid
              // proxy trap invariants. Because it's not invoked the code
              // does not need to be instrumented for code coverage.
              //
              // istanbul ignore next
              shadowTarget = foreignTargetTraits & 8 /* TargetTraits.IsArrowFunction */ ? () => {} : function () {};
            } else if (isForeignTargetArray) {
              shadowTarget = [];
            } else {
              shadowTarget = {};
            }
            const {
              proxy,
              revoke
            } = ProxyRevocable(shadowTarget, this);
            this.foreignTargetPointer = foreignTargetPointer;
            this.foreignTargetTraits = foreignTargetTraits;
            this.foreignTargetTypedArrayLength = foreignTargetTypedArrayLength;
            // Define in the BoundaryProxyHandler constructor so it is bound
            // to the BoundaryProxyHandler instance.
            this.nonConfigurableDescriptorCallback = (key, configurable, enumerable, writable, valuePointer, getterPointer, setterPointer) => {
              // Update the descriptor to non-configurable on the shadow
              // target.
              ReflectDefineProperty(this.shadowTarget, key, createDescriptorFromMeta(configurable, enumerable, writable, valuePointer, getterPointer, setterPointer));
            };
            this.proxy = proxy;
            this.revoke = revoke;
            this.serialize = noop;
            this.shadowTarget = shadowTarget;
            this.staticToStringTag = 'Object';
            // Define traps.
            if (isForeignTargetFunction) {
              var _applyTrapNameRegistr, _constructTrapNameReg;
              this.apply = this[(_applyTrapNameRegistr = applyTrapNameRegistry[foreignTargetFunctionArity]) != null ? _applyTrapNameRegistr : applyTrapNameRegistry.n];
              this.construct = this[(_constructTrapNameReg = constructTrapNameRegistry[foreignTargetFunctionArity]) != null ? _constructTrapNameReg : constructTrapNameRegistry.n];
            }
            this.defineProperty = BoundaryProxyHandler.defaultDefinePropertyTrap;
            this.deleteProperty = BoundaryProxyHandler.defaultDeletePropertyTrap;
            this.isExtensible = BoundaryProxyHandler.defaultIsExtensibleTrap;
            this.getOwnPropertyDescriptor = BoundaryProxyHandler.defaultGetOwnPropertyDescriptorTrap;
            this.getPrototypeOf = BoundaryProxyHandler.defaultGetPrototypeOfTrap;
            this.get = foreignTargetTraits & 32 /* TargetTraits.IsTypedArray */ ? BoundaryProxyHandler.hybridGetTrapForTypedArray : BoundaryProxyHandler.defaultGetTrap;
            this.has = BoundaryProxyHandler.defaultHasTrap;
            this.ownKeys = BoundaryProxyHandler.defaultOwnKeysTrap;
            this.preventExtensions = BoundaryProxyHandler.defaultPreventExtensionsTrap;
            this.setPrototypeOf = BoundaryProxyHandler.defaultSetPrototypeOfTrap;
            this.set = BoundaryProxyHandler.defaultSetTrap;
            if (foreignTargetTraits & 64 /* TargetTraits.Revoked */) {
              this.revoke();
            } else if (IS_IN_SHADOW_REALM) {
              if (isForeignTargetArray || foreignTargetTraits & 2 /* TargetTraits.IsArrayBufferView */) {
                this.makeProxyLive();
              }
            } else {
              if (foreignTargetTraits & 16 /* TargetTraits.IsObject */) {
                // Lazily define serialize method.
                let cachedSerializedValue = LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
                this.serialize = () => {
                  if (cachedSerializedValue === LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL) {
                    cachedSerializedValue = foreignCallableSerializeTarget(this.foreignTargetPointer);
                  }
                  return cachedSerializedValue;
                };
              }
            }
          }
          // Passthru traps:
          static passthruDefinePropertyTrap(_shadowTarget, key, unsafePartialDesc) {
            lastProxyTrapCalled = 4 /* ProxyHandlerTraps.DefineProperty */;
            const {
              foreignTargetPointer,
              nonConfigurableDescriptorCallback
            } = this;
            const safePartialDesc = unsafePartialDesc;
            ReflectSetPrototypeOf(safePartialDesc, null);
            const {
              get: getter,
              set: setter,
              value
            } = safePartialDesc;
            const valuePointerOrPrimitive = 'value' in safePartialDesc ?
            // Inline getTransferableValue().
            typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) :
            // Intentionally ignoring `document.all`.
            // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
            // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
            typeof value === 'undefined' ? undefined : value : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            const getterPointerOrUndefinedSymbol = 'get' in safePartialDesc ?
            // Inline getTransferableValue().
            typeof getter === 'function' ? getTransferablePointer(getter) : getter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            const setterPointerOrUndefinedSymbol = 'set' in safePartialDesc ?
            // Inline getTransferableValue().
            typeof setter === 'function' ? getTransferablePointer(setter) : setter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            let result = false;
            try {
              result = foreignCallableDefineProperty(foreignTargetPointer, key, 'configurable' in safePartialDesc ? !!safePartialDesc.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'enumerable' in safePartialDesc ? !!safePartialDesc.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'writable' in safePartialDesc ? !!safePartialDesc.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, valuePointerOrPrimitive, getterPointerOrUndefinedSymbol, setterPointerOrUndefinedSymbol, nonConfigurableDescriptorCallback);
            } catch (error) {
              var _selectedTarget11;
              const errorToThrow = (_selectedTarget11 = selectedTarget) != null ? _selectedTarget11 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            if (useFastForeignTargetPath && result && (typeof getterPointerOrUndefinedSymbol === 'function' || typeof setterPointerOrUndefinedSymbol === 'function')) {
              fastForeignTargetPointers.delete(foreignTargetPointer);
            }
            return result;
          }
          static passthruDeletePropertyTrap(_shadowTarget, key) {
            lastProxyTrapCalled = 8 /* ProxyHandlerTraps.DeleteProperty */;
            let result = false;
            try {
              result = foreignCallableDeleteProperty(this.foreignTargetPointer, key);
            } catch (error) {
              var _selectedTarget12;
              const errorToThrow = (_selectedTarget12 = selectedTarget) != null ? _selectedTarget12 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            return result;
          }
          static passthruGetPrototypeOfTrap(_shadowTarget) {
            lastProxyTrapCalled = 64 /* ProxyHandlerTraps.GetPrototypeOf */;
            let protoPointerOrNull;
            try {
              protoPointerOrNull = foreignCallableGetPrototypeOf(this.foreignTargetPointer);
            } catch (error) {
              var _selectedTarget13;
              const errorToThrow = (_selectedTarget13 = selectedTarget) != null ? _selectedTarget13 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            let proto;
            if (typeof protoPointerOrNull === 'function') {
              protoPointerOrNull();
              proto = selectedTarget;
              selectedTarget = undefined;
            } else {
              proto = null;
            }
            return proto;
          }
          static passthruIsExtensibleTrap(_shadowTarget) {
            lastProxyTrapCalled = 256 /* ProxyHandlerTraps.IsExtensible */;
            const {
              shadowTarget
            } = this;
            let result = false;
            // Check if already locked.
            if (ReflectIsExtensible(shadowTarget)) {
              const {
                foreignTargetPointer
              } = this;
              try {
                result = foreignCallableIsExtensible(foreignTargetPointer);
              } catch (error) {
                var _selectedTarget14;
                const errorToThrow = (_selectedTarget14 = selectedTarget) != null ? _selectedTarget14 : error;
                selectedTarget = undefined;
                throw errorToThrow;
              }
              if (!result) {
                copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget(foreignTargetPointer, shadowTarget);
                ReflectPreventExtensions(shadowTarget);
              }
            }
            return result;
          }
          static passthruOwnKeysTrap(_shadowTarget) {
            lastProxyTrapCalled = 512 /* ProxyHandlerTraps.OwnKeys */;
            let ownKeys;
            try {
              foreignCallableOwnKeys(this.foreignTargetPointer, (...args) => {
                ownKeys = args;
              });
            } catch (error) {
              var _selectedTarget15;
              const errorToThrow = (_selectedTarget15 = selectedTarget) != null ? _selectedTarget15 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            return ownKeys || [];
          }
          static passthruGetOwnPropertyDescriptorTrap(_shadowTarget, key) {
            lastProxyTrapCalled = 32 /* ProxyHandlerTraps.GetOwnPropertyDescriptor */;
            const {
              foreignTargetPointer,
              shadowTarget
            } = this;
            let safeDesc;
            try {
              foreignCallableGetOwnPropertyDescriptor(foreignTargetPointer, key, (_key, configurable, enumerable, writable, valuePointer, getterPointer, setterPointer) => {
                safeDesc = createDescriptorFromMeta(configurable, enumerable, writable, valuePointer, getterPointer, setterPointer);
                if (safeDesc.configurable === false) {
                  // Update the descriptor to non-configurable on
                  // the shadow target.
                  ReflectDefineProperty(shadowTarget, key, safeDesc);
                }
              });
            } catch (error) {
              var _selectedTarget16;
              const errorToThrow = (_selectedTarget16 = selectedTarget) != null ? _selectedTarget16 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            // Getting forged descriptors of handshake properties is not allowed.
            if (IS_NOT_IN_SHADOW_REALM && safeDesc && (key === LOCKER_NEAR_MEMBRANE_SYMBOL || key === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL)) {
              throw new TypeErrorCtor(ERR_ILLEGAL_PROPERTY_ACCESS);
            }
            return safeDesc;
          }
          static passthruPreventExtensionsTrap(_shadowTarget) {
            lastProxyTrapCalled = 1024 /* ProxyHandlerTraps.PreventExtensions */;
            const {
              foreignTargetPointer,
              shadowTarget
            } = this;
            let result = true;
            if (ReflectIsExtensible(shadowTarget)) {
              let resultEnum = 0 /* PreventExtensionsResult.None */;
              try {
                resultEnum = foreignCallablePreventExtensions(foreignTargetPointer);
              } catch (error) {
                var _selectedTarget17;
                const errorToThrow = (_selectedTarget17 = selectedTarget) != null ? _selectedTarget17 : error;
                selectedTarget = undefined;
                throw errorToThrow;
              }
              // If the target is a proxy it might reject the
              // preventExtension call, in which case we should not
              // attempt to lock down the shadow target.
              if (!(resultEnum & 1 /* PreventExtensionsResult.Extensible */)) {
                copyForeignOwnPropertyDescriptorsAndPrototypeToShadowTarget(foreignTargetPointer, shadowTarget);
                ReflectPreventExtensions(shadowTarget);
              }
              result = !(resultEnum & 2 /* PreventExtensionsResult.False */);
            }

            return result;
          }
          static passthruSetPrototypeOfTrap(_shadowTarget, proto) {
            lastProxyTrapCalled = 4096 /* ProxyHandlerTraps.SetPrototypeOf */;
            const {
              foreignTargetPointer
            } = this;
            const transferableProto = proto ? getTransferablePointer(proto) : proto;
            let result = false;
            try {
              result = foreignCallableSetPrototypeOf(foreignTargetPointer, transferableProto);
            } catch (error) {
              var _selectedTarget18;
              const errorToThrow = (_selectedTarget18 = selectedTarget) != null ? _selectedTarget18 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            if (useFastForeignTargetPath && result) {
              fastForeignTargetPointers.delete(foreignTargetPointer);
            }
            return result;
          }
          static passthruSetTrap(_shadowTarget, key, value, receiver) {
            lastProxyTrapCalled = 2048 /* ProxyHandlerTraps.Set */;
            const {
              foreignTargetPointer,
              proxy,
              shadowTarget
            } = this;
            // Intentionally ignoring `document.all`.
            // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
            // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
            if (typeof value === 'undefined') {
              value = undefined;
            }
            if (typeof receiver === 'undefined') {
              receiver = proxy;
            }
            // Setting forged values of handshake properties is not allowed.
            if (IS_NOT_IN_SHADOW_REALM && (key === LOCKER_NEAR_MEMBRANE_SYMBOL || key === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL)) {
              throw new TypeErrorCtor(ERR_ILLEGAL_PROPERTY_ACCESS);
            }
            const isFastPath = proxy === receiver;
            let result = false;
            try {
              result = isFastPath ? foreignCallableSet(foreignTargetPointer, key,
              // Inline getTransferableValue().
              typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) : value) : passthruForeignTraversedSet(foreignTargetPointer, shadowTarget, key, value, receiver);
            } catch (error) {
              var _selectedTarget19;
              const errorToThrow = (_selectedTarget19 = selectedTarget) != null ? _selectedTarget19 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            return result;
          }
        }
        // Logic implementation of all traps.
        // Hybrid traps:
        // (traps that operate on their shadowTarget, proxy, and foreignTargetPointer):
        BoundaryProxyHandler.hybridGetTrap = IS_IN_SHADOW_REALM ? function (_shadowTarget, key, receiver) {
          const {
            foreignTargetPointer,
            foreignTargetTraits,
            proxy,
            shadowTarget
          } = this;
          let safeDesc;
          let result;
          if (useFastForeignTargetPath && fastForeignTargetPointers.has(foreignTargetPointer)) {
            let pointerOrPrimitive;
            try {
              pointerOrPrimitive = foreignCallableGetPropertyValue(foreignTargetPointer, key);
            } catch (error) {
              var _selectedTarget20;
              const errorToThrow = (_selectedTarget20 = selectedTarget) != null ? _selectedTarget20 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
          } else {
            safeDesc = lookupForeignDescriptor(foreignTargetPointer, shadowTarget, key);
            if (safeDesc) {
              const {
                get: getter,
                value: localValue
              } = safeDesc;
              if (getter) {
                if (safeDesc.foreign) {
                  const foreignGetterPointer = getTransferablePointer(getter);
                  const transferableReceiver = proxy === receiver ? foreignTargetPointer :
                  // Inline getTransferableValue().
                  typeof receiver === 'object' && receiver !== null || typeof receiver === 'function' ? getTransferablePointer(receiver) : receiver;
                  let pointerOrPrimitive;
                  try {
                    pointerOrPrimitive = foreignCallableApply(foreignGetterPointer, transferableReceiver);
                  } catch (error) {
                    var _selectedTarget21;
                    const errorToThrow = (_selectedTarget21 = selectedTarget) != null ? _selectedTarget21 : error;
                    selectedTarget = undefined;
                    throw errorToThrow;
                  }
                  if (typeof pointerOrPrimitive === 'function') {
                    pointerOrPrimitive();
                    result = selectedTarget;
                    selectedTarget = undefined;
                  } else {
                    result = pointerOrPrimitive;
                  }
                } else {
                  // Even though the getter function exists,
                  // we can't use `ReflectGet()` because there
                  // might be a distortion for that getter function,
                  // in which case we must resolve the local getter
                  // and call it instead.
                  result = ReflectApply(getter, receiver, []);
                }
              } else {
                result = localValue;
              }
            } else {
              const transferableReceiver = proxy === receiver ? foreignTargetPointer :
              // Inline getTransferableValue().
              typeof receiver === 'object' && receiver !== null || typeof receiver === 'function' ? getTransferablePointer(receiver) : receiver;
              let pointerOrPrimitive;
              try {
                pointerOrPrimitive = foreignCallableGet(foreignTargetPointer, foreignTargetTraits, key, transferableReceiver);
              } catch (error) {
                var _selectedTarget22;
                const errorToThrow = (_selectedTarget22 = selectedTarget) != null ? _selectedTarget22 : error;
                selectedTarget = undefined;
                throw errorToThrow;
              }
              if (typeof pointerOrPrimitive === 'function') {
                pointerOrPrimitive();
                result = selectedTarget;
                selectedTarget = undefined;
              } else {
                result = pointerOrPrimitive;
              }
            }
          }
          if (safeDesc === undefined && result === undefined && key === SymbolToStringTag && foreignTargetTraits & 16 /* TargetTraits.IsObject */) {
            let toStringTag;
            try {
              toStringTag = foreignCallableGetToStringTagOfTarget(foreignTargetPointer);
            } catch (error) {
              var _selectedTarget23;
              const errorToThrow = (_selectedTarget23 = selectedTarget) != null ? _selectedTarget23 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            // The default language toStringTag is "Object". If we
            // receive "Object" we return `undefined` to let the
            // language resolve it naturally without projecting a
            // value.
            if (toStringTag !== 'Object') {
              result = toStringTag;
            }
          }
          return result;
        } : noop;
        BoundaryProxyHandler.hybridGetTrapForTypedArray = IS_IN_SHADOW_REALM ? function (_shadowTarget, key, receiver) {
          const {
            foreignTargetPointer,
            foreignTargetTypedArrayLength,
            proxy,
            shadowTarget
          } = this;
          let useFastPath = useFastForeignTargetPathForTypedArrays;
          if (!useFastPath && typeof key === 'string') {
            const possibleIndex = +key;
            useFastPath = possibleIndex > -1 && possibleIndex < foreignTargetTypedArrayLength && NumberIsInteger(possibleIndex);
          }
          let result;
          if (useFastPath) {
            let pointerOrPrimitive;
            try {
              pointerOrPrimitive = foreignCallableGetPropertyValue(foreignTargetPointer, key);
            } catch (error) {
              var _selectedTarget24;
              const errorToThrow = (_selectedTarget24 = selectedTarget) != null ? _selectedTarget24 : error;
              selectedTarget = undefined;
              throw errorToThrow;
            }
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              result = selectedTarget;
              selectedTarget = undefined;
            } else {
              result = pointerOrPrimitive;
            }
          } else {
            const safeDesc = lookupForeignDescriptor(foreignTargetPointer, shadowTarget, key);
            if (safeDesc) {
              const {
                get: getter,
                value: localValue
              } = safeDesc;
              if (getter) {
                if (safeDesc.foreign) {
                  const foreignGetterPointer = getTransferablePointer(getter);
                  const transferableReceiver = proxy === receiver ? foreignTargetPointer :
                  // Inline getTransferableValue().
                  typeof receiver === 'object' && receiver !== null || typeof receiver === 'function' ? getTransferablePointer(receiver) : receiver;
                  let pointerOrPrimitive;
                  try {
                    pointerOrPrimitive = foreignCallableApply(foreignGetterPointer, transferableReceiver);
                  } catch (error) {
                    var _selectedTarget25;
                    const errorToThrow = (_selectedTarget25 = selectedTarget) != null ? _selectedTarget25 : error;
                    selectedTarget = undefined;
                    throw errorToThrow;
                  }
                  if (typeof pointerOrPrimitive === 'function') {
                    pointerOrPrimitive();
                    result = selectedTarget;
                    selectedTarget = undefined;
                  } else {
                    result = pointerOrPrimitive;
                  }
                } else {
                  // Even though the getter function exists,
                  // we can't use `ReflectGet()` because there
                  // might be a distortion for that getter function,
                  // in which case we must resolve the local getter
                  // and call it instead.
                  result = ReflectApply(getter, receiver, []);
                }
              } else {
                result = localValue;
              }
            }
          }
          return result;
        } : noop;
        BoundaryProxyHandler.hybridHasTrap = IS_IN_SHADOW_REALM ? function (_shadowTarget, key) {
          let trueOrProtoPointerOrNull;
          try {
            trueOrProtoPointerOrNull = foreignCallableBatchGetPrototypeOfWhenHasNoOwnProperty(this.foreignTargetPointer, key);
          } catch (error) {
            var _selectedTarget26;
            const errorToThrow = (_selectedTarget26 = selectedTarget) != null ? _selectedTarget26 : error;
            selectedTarget = undefined;
            throw errorToThrow;
          }
          let result = false;
          if (trueOrProtoPointerOrNull === true) {
            result = true;
          } else {
            // Avoiding calling the has trap for any proto chain operation,
            // instead we implement the regular logic here in this trap.
            let currentObject;
            if (typeof trueOrProtoPointerOrNull === 'function') {
              trueOrProtoPointerOrNull();
              currentObject = selectedTarget;
              selectedTarget = undefined;
            } else {
              currentObject = null;
            }
            while (currentObject) {
              if (ObjectHasOwn(currentObject, key)) {
                result = true;
                break;
              }
              currentObject = ReflectGetPrototypeOf(currentObject);
            }
          }
          return result;
        } : alwaysFalse;
        BoundaryProxyHandler.passthruGetTrap = IS_NOT_IN_SHADOW_REALM ? function (_shadowTarget, key, receiver) {
          // Only allow accessing handshake property values if the
          // "has" trap has been triggered immediately BEFORE and
          // the property does NOT exist.
          handshakePropertyFlag && (handshakePropertyFlag = lastProxyTrapCalled === 128 /* ProxyHandlerTraps.Has */);
          lastProxyTrapCalled = 16 /* ProxyHandlerTraps.Get */;
          const isNearMembraneSymbol = key === LOCKER_NEAR_MEMBRANE_SYMBOL;
          const isNearMembraneSerializedValueSymbol = key === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL;
          if (handshakePropertyFlag) {
            // Exit without performing a [[Get]] for handshake
            // properties because we know that when the
            // `handshakePropertyFlag` is ON that there are NO
            // shadowed values.
            if (isNearMembraneSymbol) {
              return true;
            }
            if (isNearMembraneSerializedValueSymbol) {
              return this.serialize();
            }
          }
          const {
            foreignTargetPointer,
            foreignTargetTraits,
            proxy
          } = this;
          if (typeof receiver === 'undefined') {
            receiver = proxy;
          }
          const transferableReceiver = proxy === receiver ? LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL :
          // Inline getTransferableValue().
          typeof receiver === 'object' && receiver !== null || typeof receiver === 'function' ? getTransferablePointer(receiver) : receiver;
          let pointerOrPrimitive;
          try {
            pointerOrPrimitive = foreignCallableGet(foreignTargetPointer, foreignTargetTraits, key, transferableReceiver);
          } catch (error) {
            var _selectedTarget27;
            const errorToThrow = (_selectedTarget27 = selectedTarget) != null ? _selectedTarget27 : error;
            selectedTarget = undefined;
            throw errorToThrow;
          }
          let result;
          if (typeof pointerOrPrimitive === 'function') {
            pointerOrPrimitive();
            result = selectedTarget;
            selectedTarget = undefined;
          } else {
            result = pointerOrPrimitive;
          }
          // Getting forged values of handshake properties is not allowed.
          if (result !== undefined && (isNearMembraneSymbol || isNearMembraneSerializedValueSymbol)) {
            throw new TypeErrorCtor(ERR_ILLEGAL_PROPERTY_ACCESS);
          }
          return result;
        } : noop;
        BoundaryProxyHandler.passthruHasTrap = IS_NOT_IN_SHADOW_REALM ? function (_shadowTarget, key) {
          lastProxyTrapCalled = 128 /* ProxyHandlerTraps.Has */;
          let result;
          try {
            result = foreignCallableHas(this.foreignTargetPointer, key);
          } catch (error) {
            var _selectedTarget28;
            const errorToThrow = (_selectedTarget28 = selectedTarget) != null ? _selectedTarget28 : error;
            selectedTarget = undefined;
            throw errorToThrow;
          }
          const isNearMembraneSymbol = key === LOCKER_NEAR_MEMBRANE_SYMBOL;
          const isNearMembraneSerializedValueSymbol = key === LOCKER_NEAR_MEMBRANE_SERIALIZED_VALUE_SYMBOL;
          if (result) {
            handshakePropertyFlag = false;
            // Checking the existence of forged handshake properties
            // is not allowed.
            if (isNearMembraneSymbol || isNearMembraneSerializedValueSymbol) {
              throw new TypeErrorCtor(ERR_ILLEGAL_PROPERTY_ACCESS);
            }
          } else {
            // The `handshakePropertyFlag` is ON if the handshake
            // property does NOT exist on the object or its [[Prototype]].
            handshakePropertyFlag = isNearMembraneSymbol || isNearMembraneSerializedValueSymbol;
          }
          return result;
        } : alwaysFalse;
        // Pending traps:
        BoundaryProxyHandler.pendingDefinePropertyTrap = IS_IN_SHADOW_REALM ? function (shadowTarget, key, unsafePartialDesc) {
          const {
            foreignTargetPointer,
            foreignTargetTraits
          } = this;
          // We don't wrap `foreignCallableIsTargetLive()` in a
          // try-catch because it cannot throw.
          if (foreignCallableIsTargetLive(foreignTargetPointer, foreignTargetTraits)) {
            this.makeProxyLive();
          } else {
            if (useFastForeignTargetPath) {
              if (isForeignPointerOfObjectProto(foreignTargetPointer)) {
                disableFastForeignTargetPointers();
              } else if (isForeignPointerOfTypedArrayProto(foreignTargetPointer)) {
                useFastForeignTargetPathForTypedArrays = false;
              }
            }
            this.makeProxyStatic();
          }
          return this.defineProperty(shadowTarget, key, unsafePartialDesc);
        } : alwaysFalse;
        BoundaryProxyHandler.pendingDeletePropertyTrap = IS_IN_SHADOW_REALM ? function (shadowTarget, key) {
          // We don't wrap `foreignCallableIsTargetLive()` in a
          // try-catch because it cannot throw.
          if (foreignCallableIsTargetLive(this.foreignTargetPointer, this.foreignTargetTraits)) {
            this.makeProxyLive();
          } else {
            this.makeProxyStatic();
          }
          return this.deleteProperty(shadowTarget, key);
        } : alwaysFalse;
        BoundaryProxyHandler.pendingPreventExtensionsTrap = IS_IN_SHADOW_REALM ? function (shadowTarget) {
          // We don't wrap `foreignCallableIsTargetLive()` in a
          // try-catch because it cannot throw.
          if (foreignCallableIsTargetLive(this.foreignTargetPointer, this.foreignTargetTraits)) {
            this.makeProxyLive();
          } else {
            this.makeProxyStatic();
          }
          return this.preventExtensions(shadowTarget);
        } : alwaysFalse;
        BoundaryProxyHandler.pendingSetPrototypeOfTrap = IS_IN_SHADOW_REALM ? function (shadowTarget, proto) {
          const {
            foreignTargetPointer,
            foreignTargetTraits
          } = this;
          // We don't wrap `foreignCallableIsTargetLive()` in a
          // try-catch because it cannot throw.
          if (foreignCallableIsTargetLive(foreignTargetPointer, foreignTargetTraits)) {
            this.makeProxyLive();
          } else {
            if (useFastForeignTargetPath) {
              if (isForeignPointerOfObjectProto(foreignTargetPointer)) {
                disableFastForeignTargetPointers();
              } else if (isForeignPointerOfTypedArrayProto(foreignTargetPointer)) {
                useFastForeignTargetPathForTypedArrays = false;
              }
            }
            this.makeProxyStatic();
          }
          return this.setPrototypeOf(shadowTarget, proto);
        } : alwaysFalse;
        BoundaryProxyHandler.pendingSetTrap = IS_IN_SHADOW_REALM ? function (shadowTarget, key, value, receiver) {
          const {
            foreignTargetPointer,
            foreignTargetTraits
          } = this;
          // We don't wrap `foreignCallableIsTargetLive()` in a
          // try-catch because it cannot throw.
          if (foreignCallableIsTargetLive(foreignTargetPointer, foreignTargetTraits)) {
            this.makeProxyLive();
          } else {
            if (useFastForeignTargetPath) {
              if (isForeignPointerOfObjectProto(foreignTargetPointer)) {
                disableFastForeignTargetPointers();
              } else if (isForeignPointerOfTypedArrayProto(foreignTargetPointer)) {
                useFastForeignTargetPathForTypedArrays = false;
              }
            }
            this.makeProxyStatic();
          }
          return this.set(shadowTarget, key, value, receiver);
        } : alwaysFalse;
        //  Static traps:
        BoundaryProxyHandler.staticDefinePropertyTrap = IS_IN_SHADOW_REALM ? ReflectDefineProperty : alwaysFalse;
        BoundaryProxyHandler.staticDeletePropertyTrap = IS_IN_SHADOW_REALM ? ReflectDeleteProperty : alwaysFalse;
        BoundaryProxyHandler.staticGetOwnPropertyDescriptorTrap = IS_IN_SHADOW_REALM ? ReflectGetOwnPropertyDescriptor : noop;
        BoundaryProxyHandler.staticGetPrototypeOfTrap = IS_IN_SHADOW_REALM ? ReflectGetPrototypeOf : () => null;
        BoundaryProxyHandler.staticGetTrap = IS_IN_SHADOW_REALM ? function (shadowTarget, key, receiver) {
          const {
            foreignTargetTraits,
            staticToStringTag
          } = this;
          const result = ReflectGet(shadowTarget, key, receiver);
          if (result === undefined && key === SymbolToStringTag && foreignTargetTraits & 16 /* TargetTraits.IsObject */ &&
          // The default language toStringTag is "Object". If we
          // receive "Object" we return `undefined` to let the
          // language resolve it naturally without projecting a
          // value.
          staticToStringTag !== 'Object' && !(key in shadowTarget)) {
            return staticToStringTag;
          }
          return result;
        } : noop;
        BoundaryProxyHandler.staticHasTrap = IS_IN_SHADOW_REALM ? ReflectHas : alwaysFalse;
        BoundaryProxyHandler.staticIsExtensibleTrap = IS_IN_SHADOW_REALM ? ReflectIsExtensible : alwaysFalse;
        BoundaryProxyHandler.staticOwnKeysTrap = IS_IN_SHADOW_REALM ? ReflectOwnKeys : () => [];
        BoundaryProxyHandler.staticPreventExtensionsTrap = IS_IN_SHADOW_REALM ? ReflectPreventExtensions : alwaysFalse;
        BoundaryProxyHandler.staticSetPrototypeOfTrap = IS_IN_SHADOW_REALM ? ReflectSetPrototypeOf : alwaysFalse;
        BoundaryProxyHandler.staticSetTrap = IS_IN_SHADOW_REALM ? ReflectSet : alwaysFalse;
        // Default traps:
        // Pending traps are needed for the shadow realm side of the membrane
        // to avoid leaking mutation operations on the primary realm side.
        BoundaryProxyHandler.defaultDefinePropertyTrap = IS_IN_SHADOW_REALM ? BoundaryProxyHandler.pendingDefinePropertyTrap : BoundaryProxyHandler.passthruDefinePropertyTrap;
        BoundaryProxyHandler.defaultDeletePropertyTrap = IS_IN_SHADOW_REALM ? BoundaryProxyHandler.pendingDeletePropertyTrap : BoundaryProxyHandler.passthruDeletePropertyTrap;
        BoundaryProxyHandler.defaultGetOwnPropertyDescriptorTrap = BoundaryProxyHandler.passthruGetOwnPropertyDescriptorTrap;
        BoundaryProxyHandler.defaultGetPrototypeOfTrap = BoundaryProxyHandler.passthruGetPrototypeOfTrap;
        BoundaryProxyHandler.defaultGetTrap = IS_IN_SHADOW_REALM ? BoundaryProxyHandler.hybridGetTrap : BoundaryProxyHandler.passthruGetTrap;
        BoundaryProxyHandler.defaultHasTrap = IS_IN_SHADOW_REALM ? BoundaryProxyHandler.hybridHasTrap : BoundaryProxyHandler.passthruHasTrap;
        BoundaryProxyHandler.defaultIsExtensibleTrap = BoundaryProxyHandler.passthruIsExtensibleTrap;
        BoundaryProxyHandler.defaultOwnKeysTrap = BoundaryProxyHandler.passthruOwnKeysTrap;
        BoundaryProxyHandler.defaultPreventExtensionsTrap = IS_IN_SHADOW_REALM ? BoundaryProxyHandler.pendingPreventExtensionsTrap : BoundaryProxyHandler.passthruPreventExtensionsTrap;
        BoundaryProxyHandler.defaultSetTrap = IS_IN_SHADOW_REALM ? BoundaryProxyHandler.pendingSetTrap : BoundaryProxyHandler.passthruSetTrap;
        BoundaryProxyHandler.defaultSetPrototypeOfTrap = IS_IN_SHADOW_REALM ? BoundaryProxyHandler.pendingSetPrototypeOfTrap : BoundaryProxyHandler.passthruSetPrototypeOfTrap;
        if (IS_IN_SHADOW_REALM) {
          // Initialize `fastForeignTargetPointers` weak map.
          clearFastForeignTargetPointers();
        }
        // Export callable hooks to a foreign realm.
        foreignCallableHooksCallback(
        // globalThisPointer
        // When crossing, should be mapped to the foreign globalThis
        createPointer(globalThisRef),
        // getSelectedTarget
        IS_NOT_IN_SHADOW_REALM ? () => {
          const result = selectedTarget;
          selectedTarget = undefined;
          return result;
        } : noop,
        // getTransferableValue
        value => {
          if (typeof value === 'object' && value !== null || typeof value === 'function') {
            return getTransferablePointer(value);
          }
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          return typeof value === 'undefined' ? undefined : value;
        },
        // callableGetPropertyValuePointer: this callable function allows
        // the foreign realm to access a linkable pointer for a property value.
        // In order to do that, the foreign side must provide a pointer and
        // a key access the value in order to produce a pointer
        (targetPointer, key) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          const value = target == null ? void 0 : target[key];
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          return createPointer(typeof value === 'undefined' ? undefined : value);
        },
        // callableEvaluate
        IS_IN_SHADOW_REALM ? sourceText => {
          let result;
          try {
            result = localEval(sourceText);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Inline getTransferableValue().
          return typeof result === 'object' && result !== null || typeof result === 'function' ? getTransferablePointer(result) : result;
        } : noop,
        // callableLinkPointers: this callable function allows the foreign
        // realm to define a linkage between two values across the membrane.
        (targetPointer, newPointer) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          if (typeof target === 'object' && target !== null || typeof target === 'function') {
            proxyPointerCache.set(target, newPointer);
          }
        },
        // callablePushErrorTarget
        LOCKER_DEBUGGABLE_FLAG ? (foreignTargetPointer, foreignTargetTraits, foreignTargetFunctionArity, foreignTargetFunctionName, foreignTargetTypedArrayLength) => {
          const pointer = pushTarget(foreignTargetPointer, foreignTargetTraits, foreignTargetFunctionArity, foreignTargetFunctionName, foreignTargetTypedArrayLength);
          const pointerWrapper = () => {
            checkDebugMode();
            return pointer();
          };
          return pointerWrapper;
        } : pushTarget,
        // callablePushTarget: This function can be used by a foreign realm
        // to install a proxy into this realm that correspond to an object
        // from the foreign realm. It returns a Pointer that can be used by
        // the foreign realm to pass back a reference to this realm when
        // passing arguments or returning from a foreign callable invocation.
        // This function is extremely important to understand the mechanics
        // of this membrane.
        pushTarget,
        // callableApply
        (targetPointer, thisArgPointerOrUndefined, ...args) => {
          targetPointer();
          const func = selectedTarget;
          selectedTarget = undefined;
          let thisArg;
          if (typeof thisArgPointerOrUndefined === 'function') {
            thisArgPointerOrUndefined();
            thisArg = selectedTarget;
            selectedTarget = undefined;
          }
          for (let i = 0, {
              length
            } = args; i < length; i += 1) {
            const pointerOrPrimitive = args[i];
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              args[i] = selectedTarget;
              selectedTarget = undefined;
            }
          }
          let result;
          try {
            result = ReflectApply(func, thisArg, args);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Inline getTransferableValue().
          return typeof result === 'object' && result !== null || typeof result === 'function' ? getTransferablePointer(result) :
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          typeof result === 'undefined' ? undefined : result;
        },
        // callableConstruct
        (targetPointer, newTargetPointerOrUndefined, ...args) => {
          targetPointer();
          const constructor = selectedTarget;
          selectedTarget = undefined;
          let newTarget;
          if (typeof newTargetPointerOrUndefined === 'function') {
            newTargetPointerOrUndefined();
            newTarget = selectedTarget;
            selectedTarget = undefined;
          }
          for (let i = 0, {
              length
            } = args; i < length; i += 1) {
            const pointerOrPrimitive = args[i];
            if (typeof pointerOrPrimitive === 'function') {
              pointerOrPrimitive();
              args[i] = selectedTarget;
              selectedTarget = undefined;
            }
          }
          let result;
          try {
            result = ReflectConstruct(constructor, args, newTarget);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Inline getTransferableValue().
          return typeof result === 'object' && result !== null || typeof result === 'function' ? getTransferablePointer(result) :
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          typeof result === 'undefined' ? undefined : result;
        },
        // callableDefineProperty
        (targetPointer, key, configurable, enumerable, writable, valuePointer, getterPointer, setterPointer, foreignCallableNonConfigurableDescriptorCallback) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          const safePartialDesc = createDescriptorFromMeta(configurable, enumerable, writable, valuePointer, getterPointer, setterPointer);
          let result = false;
          try {
            result = ReflectDefineProperty(target, key, safePartialDesc);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          if (result && configurable === false) {
            let safeDesc;
            try {
              safeDesc = ReflectGetOwnPropertyDescriptor(target, key);
            } catch (error) {
              throw pushErrorAcrossBoundary(error);
            }
            if (safeDesc) {
              ReflectSetPrototypeOf(safeDesc, null);
              if (safeDesc.configurable === false) {
                const {
                  get: getter,
                  set: setter,
                  value
                } = safeDesc;
                foreignCallableNonConfigurableDescriptorCallback(key, false,
                // configurable
                'enumerable' in safeDesc ? safeDesc.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'writable' in safeDesc ? safeDesc.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'value' in safeDesc ?
                // Inline getTransferableValue().
                typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) : value : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'get' in safeDesc ?
                // Inline getTransferableValue().
                typeof getter === 'function' ? getTransferablePointer(getter) : getter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'set' in safeDesc ?
                // Inline getTransferableValue().
                typeof setter === 'function' ? getTransferablePointer(setter) : setter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL);
              }
            }
          }
          return result;
        },
        // callableDeleteProperty
        (targetPointer, key) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          try {
            return ReflectDeleteProperty(target, key);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
        },
        // callableGet
        (targetPointer, targetTraits, key, receiverPointerOrPrimitive) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let receiver;
          if (typeof receiverPointerOrPrimitive === 'function') {
            receiverPointerOrPrimitive();
            receiver = selectedTarget;
            selectedTarget = undefined;
          } else {
            receiver = receiverPointerOrPrimitive === LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL ? target : receiverPointerOrPrimitive;
          }
          let result;
          try {
            result = ReflectGet(target, key, receiver);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Inline getTransferableValue().
          if (typeof result === 'object' && result !== null || typeof result === 'function') {
            return getTransferablePointer(result);
          }
          if (result === undefined && key === SymbolToStringTag && targetTraits & 16 /* TargetTraits.IsObject */) {
            try {
              if (!(key in target)) {
                // Section 19.1.3.6 Object.prototype.toString()
                // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
                const brand = ReflectApply(ObjectProtoToString, target, []);
                // The default language toStringTag is "Object". If
                // we receive "[object Object]" we return `undefined`
                // to let the language resolve it naturally without
                // projecting a value.
                if (brand !== '[object Object]') {
                  result = ReflectApply(StringProtoSlice, brand, [8, -1]);
                }
              }
            } catch (error) {
              throw pushErrorAcrossBoundary(error);
            }
          }
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          return typeof result === 'undefined' ? undefined : result;
        },
        // callableGetOwnPropertyDescriptor
        (targetPointer, key, foreignCallableDescriptorCallback) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let safeDesc;
          try {
            safeDesc = ReflectGetOwnPropertyDescriptor(target, key);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          if (safeDesc) {
            ReflectSetPrototypeOf(safeDesc, null);
            const {
              get: getter,
              set: setter,
              value
            } = safeDesc;
            foreignCallableDescriptorCallback(key, 'configurable' in safeDesc ? safeDesc.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'enumerable' in safeDesc ? safeDesc.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'writable' in safeDesc ? safeDesc.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'value' in safeDesc ?
            // Inline getTransferableValue().
            typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) :
            // Intentionally ignoring `document.all`.
            // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
            // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
            typeof value === 'undefined' ? undefined : value : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'get' in safeDesc ?
            // Inline getTransferableValue().
            typeof getter === 'function' ? getTransferablePointer(getter) : getter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'set' in safeDesc ?
            // Inline getTransferableValue().
            typeof setter === 'function' ? getTransferablePointer(setter) : setter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL);
          }
        },
        // callableGetPrototypeOf
        targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let proto;
          try {
            proto = ReflectGetPrototypeOf(target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          if (typeof proto === 'undefined') {
            return null;
          }
          return proto ? getTransferablePointer(proto) : proto;
        },
        // callableHas
        (targetPointer, key) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          try {
            return key in target;
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
        },
        // callableIsExtensible
        targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          try {
            return ReflectIsExtensible(target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
        },
        // callableOwnKeys
        (targetPointer, foreignCallableKeysCallback) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let ownKeys;
          try {
            ownKeys = ReflectOwnKeys(target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          ReflectApply(foreignCallableKeysCallback, undefined, ownKeys);
        },
        // callablePreventExtensions
        targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let result = 2 /* PreventExtensionsResult.False */;
          try {
            if (ReflectPreventExtensions(target)) {
              result = 4 /* PreventExtensionsResult.True */;
            } else if (ReflectIsExtensible(target)) {
              result |= 1 /* PreventExtensionsResult.Extensible */;
            }
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          return result;
        },
        // callableSet
        (targetPointer, key, valuePointerOrPrimitive) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let value;
          if (typeof valuePointerOrPrimitive === 'function') {
            valuePointerOrPrimitive();
            value = selectedTarget;
            selectedTarget = undefined;
          } else {
            value = valuePointerOrPrimitive;
          }
          try {
            return ReflectSet(target, key, value, target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
        },
        // callableSetPrototypeOf
        (targetPointer, protoPointerOrNull = null) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let proto;
          if (typeof protoPointerOrNull === 'function') {
            protoPointerOrNull();
            proto = selectedTarget;
            selectedTarget = undefined;
          } else {
            proto = null;
          }
          try {
            return ReflectSetPrototypeOf(target, proto);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
        },
        // callableDebugInfo
        LOCKER_DEBUGGABLE_FLAG ? (...args) => {
          if (checkDebugMode()) {
            for (let i = 0, {
                length
              } = args; i < length; i += 1) {
              const pointerOrPrimitive = args[i];
              if (typeof pointerOrPrimitive === 'function') {
                pointerOrPrimitive();
                args[i] = selectedTarget;
                selectedTarget = undefined;
              }
            }
            try {
              ReflectApply(consoleInfo, consoleObject, args);
              // eslint-disable-next-line no-empty
            } catch (_unused29) {}
          }
        } : noop,
        // callableDefineProperties
        IS_IN_SHADOW_REALM ? (targetPointer, ...descriptorTuples) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          for (let i = 0, {
              length
            } = descriptorTuples; i < length; i += 7) {
            // We don't use `ObjectDefineProperties()` here because it
            // will throw an exception if it fails to define one of its
            // properties.
            ReflectDefineProperty(target, descriptorTuples[i], createDescriptorFromMeta(descriptorTuples[i + 1],
            // configurable
            descriptorTuples[i + 2],
            // enumerable
            descriptorTuples[i + 3],
            // writable
            descriptorTuples[i + 4],
            // valuePointer
            descriptorTuples[i + 5],
            // getterPointer
            descriptorTuples[i + 6] // setterPointer
            ));
          }
        } : noop,
        // callableGetLazyPropertyDescriptorStateByTarget
        IS_NOT_IN_SHADOW_REALM ? targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          // We don't wrap the weak map `get()` call in a try-catch
          // because we know `target` is an object.
          const state = proxyTargetToLazyPropertyDescriptorStateMap.get(target);
          return state ? getTransferablePointer(state) : state;
        } : noop,
        // callableGetPropertyValue
        IS_NOT_IN_SHADOW_REALM ? (targetPointer, key) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let value;
          try {
            value = target[key];
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          return typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) : value;
        } : noop,
        // callableGetTargetIntegrityTraits
        IS_NOT_IN_SHADOW_REALM ? targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          // A target may be a proxy that is revoked or throws in its
          // "isExtensible" trap.
          try {
            if (!ReflectIsExtensible(target)) {
              if (ObjectIsFrozen(target)) {
                return 4 /* TargetIntegrityTraits.IsFrozen */ & 2 /* TargetIntegrityTraits.IsSealed */ & 1 /* TargetIntegrityTraits.IsNotExtensible */;
              }

              if (ObjectIsSealed(target)) {
                return 2 /* TargetIntegrityTraits.IsSealed */ & 1 /* TargetIntegrityTraits.IsNotExtensible */;
              }

              return 1 /* TargetIntegrityTraits.IsNotExtensible */;
            }
          } catch (_unused30) {
            try {
              isArrayOrThrowForRevoked(target);
            } catch (_unused31) {
              return 8 /* TargetIntegrityTraits.Revoked */;
            }
          }

          return 0 /* TargetIntegrityTraits.None */;
        } : () => 0 /* TargetIntegrityTraits.None */,
        // callableGetToStringTagOfTarget
        targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          try {
            // Section 19.1.3.6 Object.prototype.toString()
            // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
            const brand = ReflectApply(ObjectProtoToString, target, []);
            return brand === '[object Object]' ? 'Object' : ReflectApply(StringProtoSlice, brand, [8, -1]);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
        },
        // callableInstallErrorPrepareStackTrace
        installErrorPrepareStackTrace,
        // callableInstallLazyPropertyDescriptors
        IS_IN_SHADOW_REALM ? (targetPointer, ...ownKeysAndUnforgeableGlobalThisKeys) => {
          const sliceIndex = ReflectApply(ArrayProtoIndexOf, ownKeysAndUnforgeableGlobalThisKeys, [LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL]);
          let ownKeys;
          let unforgeableGlobalThisKeys;
          if (sliceIndex === -1) {
            ownKeys = ownKeysAndUnforgeableGlobalThisKeys;
          } else {
            ownKeys = ReflectApply(ArrayProtoSlice, ownKeysAndUnforgeableGlobalThisKeys, [0, sliceIndex]);
            unforgeableGlobalThisKeys = ReflectApply(ArrayProtoSlice, ownKeysAndUnforgeableGlobalThisKeys, [sliceIndex + 1]);
          }
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let state = getLazyPropertyDescriptorStateByTarget(target);
          if (state === undefined) {
            state = {
              __proto__: null
            };
            setLazyPropertyDescriptorStateByTarget(target, state);
          }
          for (let i = 0, {
              length
            } = ownKeys; i < length; i += 1) {
            const ownKey = ownKeys[i];
            state[ownKey] = true;
            ReflectDefineProperty(target, ownKey,
            // The role of this descriptor is to serve as a
            // bouncer. When either a getter or a setter is
            // invoked the descriptor will be replaced with
            // the descriptor from the foreign side and the
            // get/set operation will carry on from there.
            {
              __proto__: null,
              // We DO explicitly set configurability in the
              // off chance that the property doesn't exist.
              configurable: true,
              // We DON'T explicitly set enumerability to
              // defer to the enumerability of the existing
              // property. In the off chance the property
              // doesn't exist the property will be defined
              // as non-enumerable.
              get() {
                activateLazyOwnPropertyDefinition(target, ownKey, state);
                return target[ownKey];
              },
              set(value) {
                activateLazyOwnPropertyDefinition(target, ownKey, state);
                ReflectSet(target, ownKey, value);
              }
            });
          }
          installPropertyDescriptorMethodWrappers(unforgeableGlobalThisKeys);
        } : noop,
        // callableIsTargetLive
        IS_NOT_IN_SHADOW_REALM && liveTargetCallback ? (targetPointer, targetTraits) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          if (target !== ObjectProto && target !== RegExpProto) {
            try {
              return liveTargetCallback(target, targetTraits);
              // eslint-disable-next-line no-empty
            } catch (_unused32) {}
          }
          return false;
        } : alwaysFalse,
        // callableIsTargetRevoked
        IS_NOT_IN_SHADOW_REALM ? targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          try {
            isArrayOrThrowForRevoked(target);
            return false;
            //  eslint-disable-next-line no-empty
          } catch (_unused33) {}
          return true;
        } : alwaysFalse,
        // callableSerializeTarget
        IS_IN_SHADOW_REALM ? targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          try {
            return SymbolToStringTag in target ? serializeTargetByTrialAndError(target) :
            // Fast path.
            serializeTargetByBrand(target);
            // eslint-disable-next-line no-empty
          } catch (_unused34) {}
          return undefined;
        } : noop,
        // callableSetLazyPropertyDescriptorStateByTarget
        IS_NOT_IN_SHADOW_REALM ? (targetPointer, statePointer) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          statePointer();
          const state = selectedTarget;
          selectedTarget = undefined;
          // We don't wrap the weak map `set()` call in a try-catch
          // because we know `target` is an object.
          proxyTargetToLazyPropertyDescriptorStateMap.set(target, state);
        } : noop,
        // callableTrackAsFastTarget
        IS_IN_SHADOW_REALM ? targetPointer => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          if (useFastForeignTargetPath) {
            fastForeignTargetPointers.add(getTransferablePointer(target));
          }
        } : noop,
        // callableBatchGetPrototypeOfAndGetOwnPropertyDescriptors
        (targetPointer, foreignCallableDescriptorsCallback) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let unsafeDescs;
          try {
            unsafeDescs = ObjectGetOwnPropertyDescriptors(target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          const ownKeys = ReflectOwnKeys(unsafeDescs);
          const {
            length
          } = ownKeys;
          const descriptorTuples = new ArrayCtor(length * 7);
          for (let i = 0, j = 0; i < length; i += 1, j += 7) {
            const ownKey = ownKeys[i];
            const safeDesc = unsafeDescs[ownKey];
            ReflectSetPrototypeOf(safeDesc, null);
            const {
              get: getter,
              set: setter,
              value
            } = safeDesc;
            descriptorTuples[j] = ownKey;
            descriptorTuples[j + 1] = 'configurable' in safeDesc ? safeDesc.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            descriptorTuples[j + 2] = 'enumerable' in safeDesc ? safeDesc.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            descriptorTuples[j + 3] = 'writable' in safeDesc ? safeDesc.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            descriptorTuples[j + 4] = 'value' in safeDesc ?
            // Inline getTransferableValue().
            typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) : value : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            descriptorTuples[j + 5] = 'get' in safeDesc ?
            // Inline getTransferableValue().
            typeof getter === 'function' ? getTransferablePointer(getter) : getter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            descriptorTuples[j + 6] = 'set' in safeDesc ?
            // Inline getTransferableValue().
            typeof setter === 'function' ? getTransferablePointer(setter) : setter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
          }
          ReflectApply(foreignCallableDescriptorsCallback, undefined, descriptorTuples);
          let proto;
          try {
            proto = ReflectGetPrototypeOf(target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          if (typeof proto === 'undefined') {
            return null;
          }
          return proto ? getTransferablePointer(proto) : proto;
        },
        // callableBatchGetPrototypeOfWhenHasNoOwnProperty
        (targetPointer, key) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let proto;
          try {
            if (ObjectHasOwn(target, key)) {
              return true;
            }
            proto = ReflectGetPrototypeOf(target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          if (typeof proto === 'undefined') {
            return null;
          }
          return proto ? getTransferablePointer(proto) : proto;
        },
        // callableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor
        (targetPointer, key, foreignCallableDescriptorCallback) => {
          targetPointer();
          const target = selectedTarget;
          selectedTarget = undefined;
          let safeDesc;
          try {
            safeDesc = ReflectGetOwnPropertyDescriptor(target, key);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          if (safeDesc) {
            ReflectSetPrototypeOf(safeDesc, null);
            const {
              get: getter,
              set: setter,
              value
            } = safeDesc;
            foreignCallableDescriptorCallback(key, 'configurable' in safeDesc ? safeDesc.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'enumerable' in safeDesc ? safeDesc.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'writable' in safeDesc ? safeDesc.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'value' in safeDesc ?
            // Inline getTransferableValue().
            typeof value === 'object' && value !== null || typeof value === 'function' ? getTransferablePointer(value) :
            // Intentionally ignoring `document.all`.
            // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
            // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
            typeof value === 'undefined' ? undefined : value : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'get' in safeDesc ?
            // Inline getTransferableValue().
            typeof getter === 'function' ? getTransferablePointer(getter) : getter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL, 'set' in safeDesc ?
            // Inline getTransferableValue().
            typeof setter === 'function' ? getTransferablePointer(setter) : setter : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL);
            return undefined;
          }
          let proto;
          try {
            proto = ReflectGetPrototypeOf(target);
          } catch (error) {
            throw pushErrorAcrossBoundary(error);
          }
          // Intentionally ignoring `document.all`.
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/all
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          if (typeof proto === 'undefined') {
            return null;
          }
          return proto ? getTransferablePointer(proto) : proto;
        });
        let foreignCallablesHooked = false;
        return (...hooks) => {
          if (foreignCallablesHooked) {
            return;
          }
          foreignCallablesHooked = true;
          ({
            // 0: globalThisPointer,
            // 1: getSelectedTarget,
            // 2: getTransferableValue,
            // 3: callableGetPropertyValuePointer,
            // 4: callableEvaluate,
            // 5: callableLinkPointers,
            6: foreignCallablePushErrorTarget,
            7: foreignCallablePushTarget,
            8: foreignCallableApply,
            9: foreignCallableConstruct,
            10: foreignCallableDefineProperty,
            11: foreignCallableDeleteProperty,
            12: foreignCallableGet,
            13: foreignCallableGetOwnPropertyDescriptor,
            14: foreignCallableGetPrototypeOf,
            15: foreignCallableHas,
            16: foreignCallableIsExtensible,
            17: foreignCallableOwnKeys,
            18: foreignCallablePreventExtensions,
            19: foreignCallableSet,
            20: foreignCallableSetPrototypeOf,
            21: foreignCallableDebugInfo,
            // 22: callableDefineProperties,
            23: foreignCallableGetLazyPropertyDescriptorStateByTarget,
            24: foreignCallableGetPropertyValue,
            25: foreignCallableGetTargetIntegrityTraits,
            26: foreignCallableGetToStringTagOfTarget,
            27: foreignCallableInstallErrorPrepareStackTrace,
            // 28: callableInstallLazyPropertyDescriptors,
            29: foreignCallableIsTargetLive,
            30: foreignCallableIsTargetRevoked,
            31: foreignCallableSerializeTarget,
            32: foreignCallableSetLazyPropertyDescriptorStateByTarget,
            // 33: callableTrackAsFastTarget,
            34: foreignCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors,
            35: foreignCallableBatchGetPrototypeOfWhenHasNoOwnProperty,
            36: foreignCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor
          } = hooks);
          const applyTrapForZeroOrMoreArgs = createApplyOrConstructTrapForZeroOrMoreArgs(1 /* ProxyHandlerTraps.Apply */);
          const applyTrapForOneOrMoreArgs = createApplyOrConstructTrapForOneOrMoreArgs(1 /* ProxyHandlerTraps.Apply */);
          const applyTrapForTwoOrMoreArgs = createApplyOrConstructTrapForTwoOrMoreArgs(1 /* ProxyHandlerTraps.Apply */);
          const applyTrapForThreeOrMoreArgs = createApplyOrConstructTrapForThreeOrMoreArgs(1 /* ProxyHandlerTraps.Apply */);
          const applyTrapForFourOrMoreArgs = createApplyOrConstructTrapForFourOrMoreArgs(1 /* ProxyHandlerTraps.Apply */);
          const applyTrapForFiveOrMoreArgs = createApplyOrConstructTrapForFiveOrMoreArgs(1 /* ProxyHandlerTraps.Apply */);
          const applyTrapForAnyNumberOfArgs = createApplyOrConstructTrapForAnyNumberOfArgs(1 /* ProxyHandlerTraps.Apply */);
          const constructTrapForZeroOrMoreArgs = createApplyOrConstructTrapForZeroOrMoreArgs(2 /* ProxyHandlerTraps.Construct */);
          const constructTrapForOneOrMoreArgs = createApplyOrConstructTrapForOneOrMoreArgs(2 /* ProxyHandlerTraps.Construct */);
          const constructTrapForTwoOrMoreArgs = createApplyOrConstructTrapForTwoOrMoreArgs(2 /* ProxyHandlerTraps.Construct */);
          const constructTrapForThreeOrMoreArgs = createApplyOrConstructTrapForThreeOrMoreArgs(2 /* ProxyHandlerTraps.Construct */);
          const constructTrapForFourOrMoreArgs = createApplyOrConstructTrapForFourOrMoreArgs(2 /* ProxyHandlerTraps.Construct */);
          const constructTrapForFiveOrMoreArgs = createApplyOrConstructTrapForFiveOrMoreArgs(2 /* ProxyHandlerTraps.Construct */);
          const constructTrapForAnyNumberOfArgs = createApplyOrConstructTrapForAnyNumberOfArgs(2 /* ProxyHandlerTraps.Construct */);
          if (MINIFICATION_SAFE_TRAP_PROPERTY_NAMES === undefined) {
            // A minification safe way to get the 'apply' and 'construct'
            // trap property names.
            MINIFICATION_SAFE_TRAP_PROPERTY_NAMES = ObjectKeys({
              applyTrapForZeroOrMoreArgs,
              applyTrapForOneOrMoreArgs,
              applyTrapForTwoOrMoreArgs,
              applyTrapForThreeOrMoreArgs,
              applyTrapForFourOrMoreArgs,
              applyTrapForFiveOrMoreArgs,
              applyTrapForAnyNumberOfArgs,
              constructTrapForZeroOrMoreArgs,
              constructTrapForOneOrMoreArgs,
              constructTrapForTwoOrMoreArgs,
              constructTrapForThreeOrMoreArgs,
              constructTrapForFourOrMoreArgs,
              constructTrapForFiveOrMoreArgs,
              constructTrapForAnyNumberOfArgs
            });
          }
          applyTrapNameRegistry[0] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[0];
          applyTrapNameRegistry[1] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[1];
          applyTrapNameRegistry[2] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[2];
          applyTrapNameRegistry[3] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[3];
          applyTrapNameRegistry[4] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[4];
          applyTrapNameRegistry[5] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[5];
          applyTrapNameRegistry.n = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[6];
          constructTrapNameRegistry[0] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[7];
          constructTrapNameRegistry[1] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[8];
          constructTrapNameRegistry[2] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[9];
          constructTrapNameRegistry[3] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[10];
          constructTrapNameRegistry[4] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[11];
          constructTrapNameRegistry[5] = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[12];
          constructTrapNameRegistry.n = MINIFICATION_SAFE_TRAP_PROPERTY_NAMES[13];
          const {
            prototype: BoundaryProxyHandlerProto
          } = BoundaryProxyHandler;
          BoundaryProxyHandlerProto[applyTrapNameRegistry[0]] = applyTrapForZeroOrMoreArgs;
          BoundaryProxyHandlerProto[applyTrapNameRegistry[1]] = applyTrapForOneOrMoreArgs;
          BoundaryProxyHandlerProto[applyTrapNameRegistry[2]] = applyTrapForTwoOrMoreArgs;
          BoundaryProxyHandlerProto[applyTrapNameRegistry[3]] = applyTrapForThreeOrMoreArgs;
          BoundaryProxyHandlerProto[applyTrapNameRegistry[4]] = applyTrapForFourOrMoreArgs;
          BoundaryProxyHandlerProto[applyTrapNameRegistry[5]] = applyTrapForFiveOrMoreArgs;
          BoundaryProxyHandlerProto[applyTrapNameRegistry.n] = applyTrapForAnyNumberOfArgs;
          BoundaryProxyHandlerProto[constructTrapNameRegistry[0]] = constructTrapForZeroOrMoreArgs;
          BoundaryProxyHandlerProto[constructTrapNameRegistry[1]] = constructTrapForOneOrMoreArgs;
          BoundaryProxyHandlerProto[constructTrapNameRegistry[2]] = constructTrapForTwoOrMoreArgs;
          BoundaryProxyHandlerProto[constructTrapNameRegistry[3]] = constructTrapForThreeOrMoreArgs;
          BoundaryProxyHandlerProto[constructTrapNameRegistry[4]] = constructTrapForFourOrMoreArgs;
          BoundaryProxyHandlerProto[constructTrapNameRegistry[5]] = constructTrapForFiveOrMoreArgs;
          BoundaryProxyHandlerProto[constructTrapNameRegistry.n] = constructTrapForAnyNumberOfArgs;
          ReflectSetPrototypeOf(BoundaryProxyHandlerProto, null);
        };
      };
      /* eslint-enable prefer-object-spread */
    }

    const createMembraneMarshallSourceInStrictMode = `
'use strict';
(${createMembraneMarshall})`;
    function createBlueConnector(globalObject) {
      if (typeof globalObject !== 'object' || globalObject === null) {
        throw new TypeErrorCtor('Missing globalObject.');
      }
      return createMembraneMarshall(globalObject);
    }
    function createRedConnector(evaluator) {
      if (typeof evaluator !== 'function') {
        throw new TypeErrorCtor('Missing evaluator function.');
      }
      return evaluator(createMembraneMarshallSourceInStrictMode)();
    }
    const LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL = SymbolFor('@@lockerNearMembraneUndefinedValue');
    class VirtualEnvironment {
      constructor(options) {
        if (options === undefined) {
          throw new ErrorCtor('Missing required VirtualEnvironment options.');
        }
        // prettier-ignore
        const {
          blueConnector,
          redConnector,
          distortionCallback,
          instrumentation,
          liveTargetCallback,
          revokedProxyCallback,
          signSourceCallback
          // eslint-disable-next-line prefer-object-spread
        } = ObjectAssign({
          __proto__: null
        }, options);
        let blueHooks;
        const blueConnect = blueConnector('blue', (...hooks) => {
          blueHooks = hooks;
        }, {
          distortionCallback,
          instrumentation,
          liveTargetCallback,
          revokedProxyCallback
        });
        const {
          0: blueGlobalThisPointer,
          1: blueGetSelectedTarget,
          2: blueGetTransferableValue,
          3: blueCallableGetPropertyValuePointer,
          // 4: blueCallableEvaluate,
          5: blueCallableLinkPointers,
          6: blueCallablePushErrorTarget,
          7: blueCallablePushTarget,
          8: blueCallableApply,
          9: blueCallableConstruct,
          10: blueCallableDefineProperty,
          11: blueCallableDeleteProperty,
          12: blueCallableGet,
          13: blueCallableGetOwnPropertyDescriptor,
          14: blueCallableGetPrototypeOf,
          15: blueCallableHas,
          16: blueCallableIsExtensible,
          17: blueCallableOwnKeys,
          18: blueCallablePreventExtensions,
          19: blueCallableSet,
          20: blueCallableSetPrototypeOf,
          // 21: blueCallableDebugInfo,
          // 22: blueCallableDefineProperties,
          23: blueCallableGetLazyPropertyDescriptorStateByTarget,
          24: blueCallableGetPropertyValue,
          25: blueCallableGetTargetIntegrityTraits,
          26: blueCallableGetToStringTagOfTarget,
          27: blueCallableInstallErrorPrepareStackTrace,
          // 28: blueCallableInstallLazyPropertyDescriptors,
          29: blueCallableIsTargetLive,
          // 30: blueCallableIsTargetRevoked,
          // 31: blueCallableSerializeTarget,
          32: blueCallableSetLazyPropertyDescriptorStateByTarget,
          // 33: blueTrackAsFastTarget,
          34: blueCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors,
          35: blueCallableBatchGetPrototypeOfWhenHasNoOwnProperty,
          36: blueCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor
        } = blueHooks;
        let redHooks;
        const redConnect = redConnector('red', (...hooks) => {
          redHooks = hooks;
        });
        const {
          0: redGlobalThisPointer,
          // 1: redGetSelectedTarget,
          // 2: redGetTransferableValue,
          3: redCallableGetPropertyValuePointer,
          4: redCallableEvaluate,
          5: redCallableLinkPointers,
          6: redCallablePushErrorTarget,
          7: redCallablePushTarget,
          8: redCallableApply,
          9: redCallableConstruct,
          10: redCallableDefineProperty,
          11: redCallableDeleteProperty,
          12: redCallableGet,
          13: redCallableGetOwnPropertyDescriptor,
          14: redCallableGetPrototypeOf,
          15: redCallableHas,
          16: redCallableIsExtensible,
          17: redCallableOwnKeys,
          18: redCallablePreventExtensions,
          19: redCallableSet,
          20: redCallableSetPrototypeOf,
          21: redCallableDebugInfo,
          22: redCallableDefineProperties,
          23: redCallableGetLazyPropertyDescriptorStateByTarget,
          // 24: redCallableGetPropertyValue,
          25: redCallableGetTargetIntegrityTraits,
          26: redCallableGetToStringTagOfTarget,
          27: redCallableInstallErrorPrepareStackTrace,
          28: redCallableInstallLazyPropertyDescriptors,
          // 29: redCallableIsTargetLive,
          30: redCallableIsTargetRevoked,
          31: redCallableSerializeTarget,
          32: redCallableSetLazyPropertyDescriptorStateByTarget,
          33: redCallableTrackAsFastTarget,
          34: redCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors,
          35: redCallableBatchGetPrototypeOfWhenHasNoOwnProperty,
          36: redCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor
        } = redHooks;
        blueConnect(noop,
        // redGlobalThisPointer,
        noop,
        // redGetSelectedTarget,
        noop,
        // redGetTransferableValue,
        noop,
        // redCallableGetPropertyValuePointer,
        noop,
        // redCallableEvaluate,
        noop,
        // redCallableLinkPointers,
        redCallablePushErrorTarget, redCallablePushTarget, redCallableApply, redCallableConstruct, redCallableDefineProperty, redCallableDeleteProperty, redCallableGet, redCallableGetOwnPropertyDescriptor, redCallableGetPrototypeOf, redCallableHas, redCallableIsExtensible, redCallableOwnKeys, redCallablePreventExtensions, redCallableSet, redCallableSetPrototypeOf, redCallableDebugInfo, noop,
        // redCallableDefineProperties,
        redCallableGetLazyPropertyDescriptorStateByTarget, noop,
        // redCallableGetPropertyValue,
        redCallableGetTargetIntegrityTraits, redCallableGetToStringTagOfTarget, redCallableInstallErrorPrepareStackTrace, noop,
        // redCallableInstallLazyPropertyDescriptors,
        noop,
        // redCallableIsTargetLive,
        redCallableIsTargetRevoked, redCallableSerializeTarget, redCallableSetLazyPropertyDescriptorStateByTarget, redCallableTrackAsFastTarget, redCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors, redCallableBatchGetPrototypeOfWhenHasNoOwnProperty, redCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor);
        redConnect(noop,
        // blueGlobalThisPointer,
        noop,
        // blueGetSelectedTarget,
        noop,
        // blueGetTransferableValue,
        noop,
        // blueCallableGetPropertyValuePointer,
        noop,
        // blueCallableEvaluate,
        noop,
        // blueCallableLinkPointers,
        blueCallablePushErrorTarget, blueCallablePushTarget, blueCallableApply, blueCallableConstruct, blueCallableDefineProperty, blueCallableDeleteProperty, blueCallableGet, blueCallableGetOwnPropertyDescriptor, blueCallableGetPrototypeOf, blueCallableHas, blueCallableIsExtensible, blueCallableOwnKeys, blueCallablePreventExtensions, blueCallableSet, blueCallableSetPrototypeOf, noop,
        // blueCallableDebugInfo
        noop,
        // blueCallableDefineProperties,
        blueCallableGetLazyPropertyDescriptorStateByTarget, blueCallableGetPropertyValue, blueCallableGetTargetIntegrityTraits, blueCallableGetToStringTagOfTarget, blueCallableInstallErrorPrepareStackTrace, noop,
        // blueCallableInstallLazyPropertyDescriptors,
        blueCallableIsTargetLive, noop,
        // blueCallableIsTargetRevoked,
        noop,
        // blueCallableSerializeTarget,,
        blueCallableSetLazyPropertyDescriptorStateByTarget, noop,
        // blueCallableTrackAsFastTarget,
        blueCallableBatchGetPrototypeOfAndGetOwnPropertyDescriptors, blueCallableBatchGetPrototypeOfWhenHasNoOwnProperty, blueCallableBatchGetPrototypeOfWhenHasNoOwnPropertyDescriptor);
        this.blueGlobalThisPointer = blueGlobalThisPointer;
        this.blueGetSelectedTarget = blueGetSelectedTarget;
        this.blueGetTransferableValue = blueGetTransferableValue;
        this.blueCallableGetPropertyValuePointer = blueCallableGetPropertyValuePointer;
        this.blueCallableLinkPointers = blueCallableLinkPointers;
        // Ensure the `this` context of red callable functions is `undefined`.
        this.redGlobalThisPointer = () => redGlobalThisPointer();
        this.redCallableGetPropertyValuePointer = (targetPointer, key) => redCallableGetPropertyValuePointer(targetPointer, key);
        this.redCallableEvaluate = signSourceCallback ? sourceText => redCallableEvaluate(signSourceCallback(sourceText)) : sourceText => redCallableEvaluate(sourceText);
        this.redCallableLinkPointers = (targetPointer, foreignTargetPointer) => redCallableLinkPointers(targetPointer, foreignTargetPointer);
        this.redCallableSetPrototypeOf = (targetPointer, protoPointerOrNull) => redCallableSetPrototypeOf(targetPointer, protoPointerOrNull);
        this.redCallableDefineProperties = (targetPointer, ...descriptorTuples) => {
          const {
            length
          } = descriptorTuples;
          const args = new ArrayCtor(length + 1);
          args[0] = targetPointer;
          for (let i = 0; i < length; i += 1) {
            args[i + 1] = descriptorTuples[i];
          }
          ReflectApply(redCallableDefineProperties, undefined, args);
        };
        this.redCallableInstallLazyPropertyDescriptors = (targetPointer, ...ownKeysAndUnforgeableGlobalThisKeys) => {
          const {
            length
          } = ownKeysAndUnforgeableGlobalThisKeys;
          const args = new ArrayCtor(length + 1);
          args[0] = targetPointer;
          for (let i = 0; i < length; i += 1) {
            args[i + 1] = ownKeysAndUnforgeableGlobalThisKeys[i];
          }
          ReflectApply(redCallableInstallLazyPropertyDescriptors, undefined, args);
        };
        this.redCallableTrackAsFastTarget = targetPointer => redCallableTrackAsFastTarget(targetPointer);
      }
      evaluate(sourceText) {
        try {
          const bluePointerOrPrimitiveValue = this.redCallableEvaluate(sourceText);
          if (typeof bluePointerOrPrimitiveValue === 'function') {
            bluePointerOrPrimitiveValue();
            return this.blueGetSelectedTarget();
          }
          return bluePointerOrPrimitiveValue;
        } catch (error) {
          var _this$blueGetSelected;
          throw (_this$blueGetSelected = this.blueGetSelectedTarget()) != null ? _this$blueGetSelected : error;
        }
      }
      lazyRemapProperties(target, ownKeys, unforgeableGlobalThisKeys) {
        if (typeof target === 'object' && target !== null || typeof target === 'function') {
          const args = [this.blueGetTransferableValue(target)];
          ReflectApply(ArrayProtoPush, args, ownKeys);
          if (unforgeableGlobalThisKeys != null && unforgeableGlobalThisKeys.length) {
            // Use `LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL` to delimit
            // `ownKeys` and `unforgeableGlobalThisKeys`.
            args[args.length] = LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            ReflectApply(ArrayProtoPush, args, unforgeableGlobalThisKeys);
          }
          ReflectApply(this.redCallableInstallLazyPropertyDescriptors, undefined, args);
        }
      }
      link(...keys) {
        let bluePointer = this.blueGlobalThisPointer;
        let redPointer = this.redGlobalThisPointer;
        for (let i = 0, {
            length
          } = keys; i < length; i += 1) {
          const key = keys[i];
          bluePointer = this.blueCallableGetPropertyValuePointer(bluePointer, key);
          redPointer = this.redCallableGetPropertyValuePointer(redPointer, key);
          this.redCallableLinkPointers(redPointer, bluePointer);
          this.blueCallableLinkPointers(bluePointer, redPointer);
        }
      }
      remapProperties(target, unsafeBlueDescs) {
        if (typeof target === 'object' && target !== null || typeof target === 'function') {
          const targetPointer = this.blueGetTransferableValue(target);
          const ownKeys = ReflectOwnKeys(unsafeBlueDescs);
          const {
            length
          } = ownKeys;
          const args = new ArrayCtor(1 + length * 7);
          args[0] = targetPointer;
          for (let i = 0, j = 1; i < length; i += 1, j += 7) {
            const ownKey = ownKeys[i];
            const unsafeBlueDesc = unsafeBlueDescs[ownKey];
            // Avoid poisoning by only installing own properties from unsafeBlueDescs.
            // We don't use a toSafeDescriptor() style helper since that mutates
            // the unsafeBlueDesc.
            // eslint-disable-next-line prefer-object-spread
            const safeBlueDesc = ObjectAssign({
              __proto__: null
            }, unsafeBlueDesc);
            args[j] = ownKey;
            args[j + 1] = 'configurable' in safeBlueDesc ? !!safeBlueDesc.configurable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            args[j + 2] = 'enumerable' in safeBlueDesc ? !!safeBlueDesc.enumerable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            args[j + 3] = 'writable' in safeBlueDesc ? !!safeBlueDesc.writable : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            args[j + 4] = 'value' in safeBlueDesc ? this.blueGetTransferableValue(safeBlueDesc.value) : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            args[j + 5] = 'get' in safeBlueDesc ? this.blueGetTransferableValue(safeBlueDesc.get) : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
            args[j + 6] = 'set' in safeBlueDesc ? this.blueGetTransferableValue(safeBlueDesc.set) : LOCKER_NEAR_MEMBRANE_UNDEFINED_VALUE_SYMBOL;
          }
          ReflectApply(this.redCallableDefineProperties, this, args);
        }
      }
      remapProto(target, proto) {
        if (typeof target === 'object' && target !== null || typeof target === 'function') {
          const foreignTargetPointer = this.blueGetTransferableValue(target);
          const transferableProto = proto ? this.blueGetTransferableValue(proto) : proto;
          this.redCallableSetPrototypeOf(foreignTargetPointer, transferableProto);
        }
      }
      trackAsFastTarget(target) {
        if (typeof target === 'object' && target !== null || typeof target === 'function') {
          this.redCallableTrackAsFastTarget(this.blueGetTransferableValue(target));
        }
      }
    }

    /**
     * This list must be in sync with ecma-262, anything new added to the global object
     * should be considered, to decide whether or not they need remapping. The default
     * behavior, if missing form the following list, is to be remapped, which is safer.
     *
     * Note: remapped means the functionality is provided by the blue realm, rather than
     * the red one. This helps with the identity discontinuity issue, e.g.: all Set objects
     * have the same identity because it is always derived from the outer realm's Set.
     *
     * Note 1: We have identified 3 types of intrinsics
     * A: primitives driven intrinsics
     * B: syntax driven intrinsics (they usually have a imperative form as well)
     * C: imperative only intrinsics
     *
     * While A is not remapped, it is safe, and works fast that way, and C is remapped to
     * preserve the identity of all produced objects from the same realm, B is really
     * problematic, and requires a lot more work to guarantee that objects from both sides
     * can be considered equivalents (without identity discontinuity).
     */
    const ESGlobalKeys = [
    // *** 19.1 Value Properties of the Global Object
    'globalThis', 'Infinity', 'NaN', 'undefined',
    // *** 19.2 Function Properties of the Global Object
    // 'eval', // dangerous & Reflective
    'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent',
    // *** 19.3 Constructor Properties of the Global Object
    // 'AggregateError', // Reflective
    // 'Array', // Reflective
    // 'ArrayBuffer', // Remapped
    'BigInt',
    // 'BigInt64Array', // Remapped
    // 'BigUint64Array', // Remapped
    'Boolean',
    // 'DataView', // Remapped
    // 'Date', // Remapped
    // 'Error', // Reflective
    // 'EvalError', // Reflective
    'FinalizationRegistry',
    // 'Float32Array', // Remapped
    // 'Float64Array', // Remapped
    // 'Function', // dangerous & Reflective
    // 'Int8Array', // Remapped
    // 'Int16Array', // Remapped
    // 'Int32Array', // Remapped
    // 'Map', // Remapped
    'Number',
    // 'Object', // Reflective
    // Allow blue `Promise` constructor to overwrite the Red one so that promises
    // created by the `Promise` constructor or APIs like `fetch` will work.
    // 'Promise', // Remapped
    // 'Proxy', // Reflective
    // 'RangeError', // Reflective
    // 'ReferenceError', // Reflective
    'RegExp',
    // 'Set', // Remapped
    // 'SharedArrayBuffer', // Remapped
    'String', 'Symbol',
    // 'SyntaxError', // Reflective
    // 'TypeError', // Reflective
    // 'Uint8Array', // Remapped
    // 'Uint8ClampedArray', // Remapped
    // 'Uint16Array', // Remapped
    // 'Uint32Array', // Remapped
    // 'URIError', // Reflective
    // 'WeakMap', // Remapped
    // 'WeakSet', // Remapped
    'WeakRef',
    // *** 18.4 Other Properties of the Global Object
    // 'Atomics', // Remapped
    'JSON', 'Math', 'Reflect',
    // *** Annex B
    'escape', 'unescape'
    // *** ECMA-402
    // 'Intl',  // Remapped
    ];
    // These are foundational things that should never be wrapped but are equivalent
    // @TODO: Revisit this list.
    const ReflectiveIntrinsicObjectNames = ['AggregateError', 'Array', 'Error', 'EvalError', 'Function', 'Object', 'Proxy', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError', 'eval', 'globalThis'];
    const ESGlobalsAndReflectiveIntrinsicObjectNames = toSafeArray([...ESGlobalKeys, ...ReflectiveIntrinsicObjectNames]);
    function getGlobalObjectOwnKeys(source) {
      const ownKeys = ReflectOwnKeys(source);
      // WKWebView incorrectly excludes the 'webkit' own property of the global
      // object from `Object.keys()` and `Reflect.ownKeys()` results, so add it.
      // istanbul ignore if: currently unreachable via tests
      if (ObjectHasOwn(source, 'webkit') && !ReflectApply(ArrayProtoIncludes, ownKeys, ['webkit'])) {
        ownKeys[ownKeys.length] = 'webkit';
      }
      return ownKeys;
    }
    function assignFilteredGlobalDescriptorsFromPropertyDescriptorMap(descs, source) {
      const ownKeys = getGlobalObjectOwnKeys(source);
      for (let i = 0, {
          length
        } = ownKeys; i < length; i += 1) {
        const ownKey = ownKeys[i];
        // Avoid overriding ECMAScript global names that correspond to
        // global intrinsics. This guarantee that those entries will be
        // ignored if present in the source property descriptor map.
        if (!ESGlobalsAndReflectiveIntrinsicObjectNames.includes(ownKey)) {
          const unsafeDesc = source[ownKey];
          if (unsafeDesc) {
            // Avoid poisoning by only installing own properties from
            // unsafeDesc. We don't use a toSafeDescriptor() style helper
            // since that mutates the unsafeBlueDesc.
            // eslint-disable-next-line prefer-object-spread
            descs[ownKey] = ObjectAssign({
              __proto__: null
            }, unsafeDesc);
          }
        }
      }
      return descs;
    }
    function getFilteredGlobalOwnKeys(source) {
      const result = [];
      let resultOffset = 0;
      const ownKeys = getGlobalObjectOwnKeys(source);
      for (let i = 0, {
          length
        } = ownKeys; i < length; i += 1) {
        const ownKey = ownKeys[i];
        // Avoid overriding ECMAScript global names that correspond to global
        // intrinsics. This guarantees that those entries will be ignored if
        // present in the source object.
        if (!ESGlobalsAndReflectiveIntrinsicObjectNames.includes(ownKey)) {
          result[resultOffset++] = ownKey;
        }
      }
      return result;
    }
    function linkIntrinsics(env, globalObject) {
      // Remap intrinsics that are realm agnostic.
      for (let i = 0, {
          length
        } = ReflectiveIntrinsicObjectNames; i < length; i += 1) {
        const globalName = ReflectiveIntrinsicObjectNames[i];
        const reflectiveValue = globalObject[globalName];
        if (reflectiveValue) {
          // Proxy.prototype is undefined.
          if (reflectiveValue.prototype) {
            env.link(globalName, 'prototype');
          } else {
            env.link(globalName);
          }
        }
      }
    }

    const blueDocumentToRecordMap = toSafeWeakMap(new WeakMap());
    // Chromium based browsers have a bug that nulls the result of `window`
    // getters in detached iframes when the property descriptor of `window.window`
    // is retrieved.
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1305302
    const unforgeablePoisonedWindowKeys = IS_CHROMIUM_BROWSER ? ['window'] : undefined;
    function getCachedGlobalObjectReferences(globalObject) {
      const {
        window
      } = globalObject;
      let record;
      let document;
      // Suppress errors thrown on cross-origin opaque windows.
      try {
        ({
          document
        } = globalObject);
        record = blueDocumentToRecordMap.get(document);
        // eslint-disable-next-line no-empty
      } catch (_unused) {
        return undefined;
      }
      if (record) {
        return record;
      }
      // Cache references to object values that can't be replaced
      // window -> Window -> WindowProperties -> EventTarget
      const WindowProto = ReflectGetPrototypeOf(window);
      const WindowPropertiesProto = ReflectGetPrototypeOf(WindowProto);
      const EventTargetProto = ReflectGetPrototypeOf(WindowPropertiesProto);
      record = {
        document,
        DocumentProto: ReflectGetPrototypeOf(document),
        window,
        WindowProto: ReflectGetPrototypeOf(window),
        WindowPropertiesProto: ReflectGetPrototypeOf(WindowProto),
        EventTargetProto,
        // Some simulated browser environments, e.g. those using JSDOM, may lack an EventTargetProto.
        EventTargetProtoOwnKeys: EventTargetProto ? ReflectOwnKeys(EventTargetProto) : []
      };
      blueDocumentToRecordMap.set(document, record);
      return record;
    }
    function filterWindowKeys(keys) {
      const result = [];
      let resultOffset = 0;
      for (let i = 0, {
          length
        } = keys; i < length; i += 1) {
        const key = keys[i];
        if (
        // Filter out unforgeable property keys that cannot be installed.
        key !== 'document' && key !== 'location ' && key !== 'top' && key !== 'window' &&
        // Remove other browser specific unforgeables.
        key !== 'chrome') {
          result[resultOffset++] = key;
        }
      }
      return result;
    }
    /**
     * global descriptors are a combination of 3 set of descriptors:
     * - first, the key of the red descriptors define the descriptors
     *   provided by the browser when creating a brand new window.
     * - second, once we know the base keys, we get the actual descriptors
     *   from the blueDescriptors, since those are the one we want to provide
     *   access to via the membrane.
     * - third, the user of this library can provide endowments, which define
     *   global descriptors that should be installed into the sandbox on top
     *   of the base descriptors.
     *
     * Note: The main reason for using redDescriptors as the base keys instead
     * of blueDescriptor is because there is no guarantee that this library is
     * the first one to be evaluated in the host app, which means it has no ways
     * to determine what is a real DOM API vs app specific globals.
     *
     * Quirk: The only quirk here is for the case in which this library runs
     * after some other code that patches some of the DOM APIs. This means
     * the installed proxy in the sandbox will point to the patched global
     * API in the blue realm, rather than the original, because we don't have
     * a way to access the original anymore. This should not be a deal-breaker
     * if the patched API behaves according to the spec.
     *
     * The result of this method is a descriptor map that contains everything
     * that will be installed (via the membrane) as global descriptors in
     * the red realm.
     */
    function removeWindowDescriptors(unsafeDescs) {
      // Remove unforgeable descriptors that cannot be installed.
      ReflectDeleteProperty(unsafeDescs, 'document');
      ReflectDeleteProperty(unsafeDescs, 'location');
      ReflectDeleteProperty(unsafeDescs, 'top');
      ReflectDeleteProperty(unsafeDescs, 'window');
      // Remove other browser specific unforgeables.
      ReflectDeleteProperty(unsafeDescs, 'chrome');
      return unsafeDescs;
    }
    /**
     * Initialization operation to capture and cache all unforgeable references
     * and their respective descriptor maps before any other code runs, this
     * usually help because this library runs before anything else that can poison
     * the environment.
     */
    getCachedGlobalObjectReferences(rootWindow);
    const IFRAME_SANDBOX_ATTRIBUTE_VALUE = 'allow-same-origin allow-scripts';
    const revoked = toSafeWeakSet(new WeakSetCtor());
    const blueCreateHooksCallbackCache = toSafeWeakMap(new WeakMapCtor());
    let defaultGlobalOwnKeys = null;
    function createDetachableIframe(doc) {
      var _ReflectApply;
      const iframe = ReflectApply(DocumentProtoCreateElement, doc, ['iframe']);
      // It is impossible to test whether the NodeProtoLastChildGetter branch is
      // reached in a normal Karma test environment.
      const parent = (_ReflectApply = ReflectApply(DocumentProtoBodyGetter, doc, [])) != null ? _ReflectApply : /* istanbul ignore next */ReflectApply(NodeProtoLastChildGetter, doc, []);
      const style = ReflectApply(HTMLElementProtoStyleGetter, iframe, []);
      style.display = 'none';
      ReflectApply(ElementProtoSetAttribute, iframe, ['sandbox', IFRAME_SANDBOX_ATTRIBUTE_VALUE]);
      ReflectApply(NodeProtoAppendChild, parent, [iframe]);
      return iframe;
    }
    function createIframeVirtualEnvironment(globalObject, providedOptions) {
      if (typeof globalObject !== 'object' || globalObject === null) {
        throw new TypeErrorCtor('Missing global object virtualization target.');
      }
      const blueRefs = getCachedGlobalObjectReferences(globalObject);
      if (typeof blueRefs !== 'object' || blueRefs === null) {
        throw new TypeErrorCtor('Invalid virtualization target.');
      }
      const {
        distortionCallback,
        defaultPolicy,
        endowments,
        globalObjectShape,
        instrumentation,
        keepAlive = true,
        liveTargetCallback,
        signSourceCallback
        // eslint-disable-next-line prefer-object-spread
      } = ObjectAssign({
        __proto__: null
      }, providedOptions);
      const iframe = createDetachableIframe(blueRefs.document);
      const redWindow = ReflectApply(HTMLIFrameElementProtoContentWindowGetter, iframe, []);
      const shouldUseDefaultGlobalOwnKeys = typeof globalObjectShape !== 'object' || globalObjectShape === null;
      if (shouldUseDefaultGlobalOwnKeys && defaultGlobalOwnKeys === null) {
        defaultGlobalOwnKeys = filterWindowKeys(getFilteredGlobalOwnKeys(redWindow));
      }
      let blueConnector = blueCreateHooksCallbackCache.get(blueRefs.document);
      if (blueConnector === undefined) {
        blueConnector = createBlueConnector(globalObject);
        blueCreateHooksCallbackCache.set(blueRefs.document, blueConnector);
      }
      // Install default TrustedTypes policy in the virtual environment.
      // @ts-ignore trustedTypes does not exist on GlobalObject
      if (typeof redWindow.trustedTypes !== 'undefined' && isObject(defaultPolicy)) {
        // @ts-ignore trustedTypes does not exist on GlobalObject
        redWindow.trustedTypes.createPolicy('default', defaultPolicy);
      }
      const {
        eval: redIndirectEval
      } = redWindow;
      const env = new VirtualEnvironment({
        blueConnector,
        redConnector: createRedConnector(signSourceCallback ? sourceText => redIndirectEval(signSourceCallback(sourceText)) : redIndirectEval),
        distortionCallback,
        instrumentation,
        liveTargetCallback,
        revokedProxyCallback: keepAlive ? revokedProxyCallback : undefined,
        signSourceCallback
      });
      linkIntrinsics(env, globalObject);
      // window
      // window.document
      // In browsers globalThis is === window.
      if (typeof globalThis === 'undefined') {
        // Support for globalThis was added in Chrome 71.
        // However, environments like Android emulators are running Chrome 69.
        env.link('window', 'document');
      } else {
        // document is === window.document.
        env.link('document');
      }
      // window.__proto__ (aka Window.prototype)
      // window.__proto__.__proto__ (aka WindowProperties.prototype)
      // window.__proto__.__proto__.__proto__ (aka EventTarget.prototype)
      env.link('__proto__', '__proto__', '__proto__');
      env.remapProto(blueRefs.document, blueRefs.DocumentProto);
      env.lazyRemapProperties(blueRefs.window, shouldUseDefaultGlobalOwnKeys ? defaultGlobalOwnKeys : filterWindowKeys(getFilteredGlobalOwnKeys(globalObjectShape)),
      // Chromium based browsers have a bug that nulls the result of `window`
      // getters in detached iframes when the property descriptor of `window.window`
      // is retrieved.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1305302
      keepAlive ? undefined : unforgeablePoisonedWindowKeys);
      if (endowments) {
        const filteredEndowments = {};
        assignFilteredGlobalDescriptorsFromPropertyDescriptorMap(filteredEndowments, endowments);
        removeWindowDescriptors(filteredEndowments);
        env.remapProperties(blueRefs.window, filteredEndowments);
      }
      // We intentionally skip remapping Window.prototype because there is nothing
      // in it that needs to be remapped.
      env.lazyRemapProperties(blueRefs.EventTargetProto, blueRefs.EventTargetProtoOwnKeys);
      // We don't remap `blueRefs.WindowPropertiesProto` because it is "magical"
      // in that it provides access to elements by id.
      //
      // Once we get the iframe info ready, and all mapped, we can proceed to
      // detach the iframe only if `options.keepAlive` isn't true.
      if (keepAlive) {
        // @TODO: Temporary hack to preserve the document reference in Firefox.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=543435
        const {
          document: redDocument
        } = redWindow;
        // Revoke the proxies of the redDocument and redWindow to prevent access.
        revoked.add(redDocument);
        revoked.add(redWindow);
        ReflectApply(DocumentProtoOpen, redDocument, []);
        ReflectApply(DocumentProtoClose, redDocument, []);
      } else {
        if (IS_OLD_CHROMIUM_BROWSER) {
          // For Chromium < v86 browsers we evaluate the `window` object to
          // kickstart the realm so that `window` persists when the iframe is
          // removed from the document.
          redIndirectEval('window');
        }
        ReflectApply(ElementProtoRemove, iframe, []);
      }
      return env;
    }
    function revokedProxyCallback(value) {
      return revoked.has(value);
    }

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
    /*! version: 0.20.4 */

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * This utility should be used to convert NodeList and HTMLCollection into an array before we
     * perform array operations on them. See issue #1545 for more details.
     */
    function arrayFromCollection(collection) {
        const size = collection.length;
        const cloned = [];
        if (size > 0) {
            for (let i = 0; i < size; i++) {
                cloned[i] = collection[i];
            }
        }
        return cloned;
    }
    const { assign, create, defineProperties, defineProperty, freeze, getOwnPropertyDescriptor, getOwnPropertyDescriptors, getOwnPropertyNames, getPrototypeOf, keys, seal, setPrototypeOf, } = Object;
    const { filter: ArrayFilter, find: ArrayFind, indexOf: ArrayIndexOf, join: ArrayJoin, map: ArrayMap, push: ArrayPush, reduce: ArrayReduce, reverse: ArrayReverse, slice: ArraySlice, splice: ArraySplice, unshift: ArrayUnshift, forEach, } = Array.prototype;
    function isUndefined(obj) {
        return obj === undefined;
    }
    function isNull(obj) {
        return obj === null;
    }
    function isTrue(obj) {
        return obj === true;
    }
    function isString(obj) {
        return typeof obj === 'string';
    }
    function MapConcat(maps) {
        const map = new Map();
        maps.forEach((m) => {
            m.forEach((v, k) => {
                map.set(k, v);
            });
        });
        return map;
    }
    const MapCreate = (args) => new Map(args);
    function createHiddenField(key) {
        return Symbol(key);
    }
    function setHiddenField(o, field, value) {
        o[field] = value;
    }
    function getHiddenField(o, field) {
        return o[field];
    }
    function isHostElement(node) {
        return node instanceof HTMLElement && !!shadowRootGetter.call(node);
    }
    function getShadowRootFromHostElement(elm) {
        return shadowRootGetter.call(elm);
    }

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const Items$1 = createHiddenField('StaticNodeListItems');
    function StaticNodeList() {
        throw new TypeError('Illegal constructor');
    }
    StaticNodeList.prototype = create(NodeList.prototype, {
        constructor: {
            writable: true,
            configurable: true,
            value: StaticNodeList,
        },
        item: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(index) {
                return this[index];
            },
        },
        length: {
            enumerable: true,
            configurable: true,
            get() {
                return getHiddenField(this, Items$1).length;
            },
        },
        // Iterator protocol
        forEach: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(cb, thisArg) {
                forEach.call(getHiddenField(this, Items$1), cb, thisArg);
            },
        },
        entries: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return ArrayMap.call(getHiddenField(this, Items$1), (v, i) => [i, v]);
            },
        },
        keys: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return ArrayMap.call(getHiddenField(this, Items$1), (_v, i) => i);
            },
        },
        values: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return getHiddenField(this, Items$1);
            },
        },
        [Symbol.iterator]: {
            writable: true,
            configurable: true,
            value() {
                let nextIndex = 0;
                return {
                    next: () => {
                        const items = getHiddenField(this, Items$1);
                        return nextIndex < items.length
                            ? {
                                value: items[nextIndex++],
                                done: false,
                            }
                            : {
                                done: true,
                            };
                    },
                };
            },
        },
        [Symbol.toStringTag]: {
            configurable: true,
            get() {
                return 'NodeList';
            },
        },
    });
    // prototype inheritance dance
    setPrototypeOf(StaticNodeList, NodeList);
    function createStaticNodeList(items) {
        const nodeList = create(StaticNodeList.prototype);
        setHiddenField(nodeList, Items$1, items);
        // setting static indexes
        forEach.call(items, (item, index) => {
            defineProperty(nodeList, index, {
                value: item,
                enumerable: true,
                configurable: true,
            });
        });
        return nodeList;
    }

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const assignedSlotGetter$1 = getOwnPropertyDescriptor(Element.prototype, 'assignedSlot').get;
    function isSlotElement(node) {
        return node instanceof HTMLSlotElement;
    }
    function getFilteredChildNodes(node) {
        if (isSlotElement(node)) {
            return node.assignedNodes({ flatten: true });
        }
        else if (isHostElement(node)) {
            return arrayFromCollection(childNodesGetter.call(getShadowRootFromHostElement(node)));
        }
        return arrayFromCollection(childNodesGetter.call(node));
    }
    const firstChildDistortion = function firstChild() {
        const nodes = getFilteredChildNodes(this);
        return nodes.length > 0 ? nodes[0] : null;
    };
    const lastChildDistortion = function lastChild() {
        const nodes = getFilteredChildNodes(this);
        return nodes.length > 0 ? nodes[nodes.length - 1] : null;
    };
    const textContentDistortion = function textContent() {
        return getTextContent(this);
    };
    const parentNodeDistortion = function parentNode() {
        const assignedSlot = assignedSlotGetter$1.call(this);
        // if node is slotted, jump into the slot node instead
        if (assignedSlot) {
            return assignedSlot;
        }
        const parentNode = parentNodeGetter.call(this);
        // if walking up we encounter a shadowRoot, we skip it
        if (parentNode && parentNode instanceof ShadowRoot) {
            return parentNode.host;
        }
        return parentNode;
    };
    const parentElementDistortion = function parentElement() {
        const assignedSlot = assignedSlotGetter$1.call(this);
        // if node is slotted, jump into the slot node instead
        if (assignedSlot) {
            return assignedSlot;
        }
        const parentNode = parentNodeGetter.call(this);
        // if walking up we encounter a shadowRoot, we skip it
        if (parentNode && parentNode instanceof ShadowRoot) {
            return parentNode.host;
        }
        return parentElementGetter.call(this);
    };
    const childNodesDistortion = function childNodes() {
        return createStaticNodeList(getFilteredChildNodes(this)); // cast to NodeListOf<Node>
    };
    const hasChildNodesDistortion = function hasChildNodes() {
        return getFilteredChildNodes(this).length > 0;
    };
    const getRootNodeDistortion = function getRootNode$1() {
        if (this.isConnected) {
            return this.ownerDocument; // Is this correct?
        }
        return getRootNode.call(this);
    };
    function getTextContent(node) {
        switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE: {
                const childNodes = getFilteredChildNodes(node);
                let content = '';
                for (let i = 0, len = childNodes.length; i < len; i += 1) {
                    const currentNode = childNodes[i];
                    if (currentNode.nodeType !== COMMENT_NODE) {
                        content += getTextContent(currentNode);
                    }
                }
                return content;
            }
            default:
                return node.nodeValue;
        }
    }
    var NodeDistortions = MapCreate([
        [firstChildGetter, firstChildDistortion],
        [lastChildGetter, lastChildDistortion],
        [textContextGetter, textContentDistortion],
        [parentNodeGetter, parentNodeDistortion],
        [parentElementGetter, parentElementDistortion],
        [childNodesGetter, childNodesDistortion],
        [hasChildNodes, hasChildNodesDistortion],
        [getRootNode, getRootNodeDistortion],
    ]);

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const assignedSlotOriginal = getOwnPropertyDescriptor(Text.prototype, 'assignedSlot').get;
    const assignedSlotDistortion$1 = function assignedSlot() {
        return null;
    };
    var TextDistortions = MapCreate([[assignedSlotOriginal, assignedSlotDistortion$1]]);

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const { assignedNodes: assignedNodesOriginal, assignedElements: assignedElementsOriginal } = HTMLSlotElement.prototype;
    const assignedElementsDistortion = function assignedElements(options) {
        const flatten = !isUndefined(options) && isTrue(options.flatten);
        if (!flatten) {
            return [];
        }
        return assignedElementsOriginal.call(this, { flatten: true });
    };
    const assignedNodesDistortion = function assignedNodes(options) {
        const flatten = !isUndefined(options) && isTrue(options.flatten);
        if (!flatten) {
            return [];
        }
        return assignedNodesOriginal.call(this, { flatten: true });
    };
    var SlotDistortions = MapCreate([
        [assignedElementsOriginal, assignedElementsDistortion],
        [assignedNodesOriginal, assignedNodesDistortion],
    ]);

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const Items = createHiddenField('StaticHTMLCollectionItems');
    function StaticHTMLCollection() {
        throw new TypeError('Illegal constructor');
    }
    StaticHTMLCollection.prototype = create(HTMLCollection.prototype, {
        constructor: {
            writable: true,
            configurable: true,
            value: StaticHTMLCollection,
        },
        item: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(index) {
                return this[index];
            },
        },
        length: {
            enumerable: true,
            configurable: true,
            get() {
                return getHiddenField(this, Items).length;
            },
        },
        // https://dom.spec.whatwg.org/#dom-htmlcollection-nameditem-key
        namedItem: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(name) {
                if (name === '') {
                    return null;
                }
                const items = getHiddenField(this, Items);
                for (let i = 0, len = items.length; i < len; i++) {
                    const item = items[len];
                    if (name === getAttribute.call(item, 'id') || name === getAttribute.call(item, 'name')) {
                        return item;
                    }
                }
                return null;
            },
        },
        // Iterable protocol
        // TODO [#1665]: HTMLCollection should not implement the iterable protocol. The only collection
        // interface implementing this protocol is NodeList. This code need to be removed.
        forEach: {
            writable: true,
            enumerable: true,
            configurable: true,
            value(cb, thisArg) {
                forEach.call(getHiddenField(this, Items), cb, thisArg);
            },
        },
        entries: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return ArrayMap.call(getHiddenField(this, Items), (v, i) => [i, v]);
            },
        },
        keys: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return ArrayMap.call(getHiddenField(this, Items), (v, i) => i);
            },
        },
        values: {
            writable: true,
            enumerable: true,
            configurable: true,
            value() {
                return getHiddenField(this, Items);
            },
        },
        [Symbol.iterator]: {
            writable: true,
            configurable: true,
            value() {
                let nextIndex = 0;
                return {
                    next: () => {
                        const items = getHiddenField(this, Items);
                        return nextIndex < items.length
                            ? {
                                value: items[nextIndex++],
                                done: false,
                            }
                            : {
                                done: true,
                            };
                    },
                };
            },
        },
        [Symbol.toStringTag]: {
            configurable: true,
            get() {
                return 'HTMLCollection';
            },
        },
    });
    // prototype inheritance dance
    setPrototypeOf(StaticHTMLCollection, HTMLCollection);
    function createStaticHTMLCollection(items) {
        const collection = create(StaticHTMLCollection.prototype);
        setHiddenField(collection, Items, items);
        // setting static indexes
        forEach.call(items, (item, index) => {
            defineProperty(collection, index, {
                value: item,
                enumerable: true,
                configurable: true,
            });
        });
        return collection;
    }

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function getChildNodesMarkup(childNodes) {
        let s = '';
        for (let i = 0, len = childNodes.length; i < len; i += 1) {
            s += getOuterHTML(childNodes[i]);
        }
        return s;
    }
    function getInnerHTML(elm) {
        if (isSlotElement(elm)) {
            return getChildNodesMarkup(elm.assignedNodes({ flatten: true }));
        }
        else if (isHostElement(elm)) {
            return getChildNodesMarkup(childNodesGetter.call(getShadowRootFromHostElement(elm)));
        }
        return getChildNodesMarkup(childNodesGetter.call(elm));
    }

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
    const escapeAttrRegExp = /[&\u00A0"]/g;
    const escapeDataRegExp = /[&\u00A0<>]/g;
    const { replace, toLowerCase } = String.prototype;
    function escapeReplace(c) {
        switch (c) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case '\u00A0':
                return '&nbsp;';
            default:
                return '';
        }
    }
    function escapeAttr(s) {
        return replace.call(s, escapeAttrRegExp, escapeReplace);
    }
    function escapeData(s) {
        return replace.call(s, escapeDataRegExp, escapeReplace);
    }
    // http://www.whatwg.org/specs/web-apps/current-work/#void-elements
    const voidElements = new Set([
        'AREA',
        'BASE',
        'BR',
        'COL',
        'COMMAND',
        'EMBED',
        'HR',
        'IMG',
        'INPUT',
        'KEYGEN',
        'LINK',
        'META',
        'PARAM',
        'SOURCE',
        'TRACK',
        'WBR',
    ]);
    const plaintextParents = new Set(['STYLE', 'SCRIPT', 'XMP', 'IFRAME', 'NOEMBED', 'NOFRAMES', 'PLAINTEXT', 'NOSCRIPT']);
    function getOuterHTML(node) {
        switch (node.nodeType) {
            case ELEMENT_NODE: {
                const { attributes: attrs } = node;
                const tagName = tagNameGetter.call(node);
                let s = '<' + toLowerCase.call(tagName);
                for (let i = 0, attr; (attr = attrs[i]); i++) {
                    s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
                }
                s += '>';
                if (voidElements.has(tagName)) {
                    return s;
                }
                return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
            }
            case TEXT_NODE: {
                const { data, parentNode } = node;
                if (parentNode instanceof Element && plaintextParents.has(tagNameGetter.call(parentNode))) {
                    return data;
                }
                return escapeData(data);
            }
            case CDATA_SECTION_NODE: {
                return `<!CDATA[[${node.data}]]>`;
            }
            case PROCESSING_INSTRUCTION_NODE: {
                return `<?${node.target} ${node.data}?>`;
            }
            case COMMENT_NODE: {
                return `<!--${node.data}-->`;
            }
            default: {
                // intentionally ignoring unknown node types
                // Note: since this routine is always invoked for childNodes
                // we can safety ignore type 9, 10 and 99 (document, fragment and doctype)
                return '';
            }
        }
    }

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const eventTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'target').get;
    const focusEventRelatedTargetGetter = getOwnPropertyDescriptor(FocusEvent.prototype, 'relatedTarget').get;
    const { composedPath } = Event.prototype;
    const eventsMeta = new WeakMap();
    function extractEventMetadata(event) {
        let meta = eventsMeta.get(event);
        if (meta) {
            return meta;
        }
        meta = {
            target: eventTargetGetter.call(event),
            composedPath: composedPath.call(event),
        };
        if (event instanceof FocusEvent) {
            meta.relatedTarget = focusEventRelatedTargetGetter.call(event);
        }
        eventsMeta.set(event, meta);
        return meta;
    }
    const targetDistortion = function target() {
        return extractEventMetadata(this).target;
    };
    const composedPathDistortion = function composedPath() {
        return ArrayFilter.call(extractEventMetadata(this).composedPath, (et) => !(et instanceof ShadowRoot));
    };
    const relatedTargetDistortion = function relatedTarget() {
        return extractEventMetadata(this).relatedTarget;
    };
    var EventDistortions = MapCreate([
        [eventTargetGetter, targetDistortion],
        [composedPath, composedPathDistortion],
        [focusEventRelatedTargetGetter, relatedTargetDistortion],
    ]);

    /*! http://mths.be/startswith v0.2.0 by @mathias */
    if (!String.prototype.startsWith) {
    	(function() {
    		var defineProperty = (function() {
    			// IE 8 only supports `Object.defineProperty` on DOM elements
    			try {
    				var object = {};
    				var $defineProperty = Object.defineProperty;
    				var result = $defineProperty(object, object, object) && $defineProperty;
    			} catch(error) {}
    			return result;
    		}());
    		var toString = {}.toString;
    		var startsWith = function(search) {
    			if (this == null) {
    				throw TypeError();
    			}
    			var string = String(this);
    			if (search && toString.call(search) == '[object RegExp]') {
    				throw TypeError();
    			}
    			var stringLength = string.length;
    			var searchString = String(search);
    			var searchLength = searchString.length;
    			var position = arguments.length > 1 ? arguments[1] : undefined;
    			// `ToInteger`
    			var pos = position ? Number(position) : 0;
    			if (pos != pos) { // better `isNaN`
    				pos = 0;
    			}
    			var start = Math.min(Math.max(pos, 0), stringLength);
    			// Avoid the `indexOf` call if no match is possible
    			if (searchLength + start > stringLength) {
    				return false;
    			}
    			var index = -1;
    			while (++index < searchLength) {
    				if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
    					return false;
    				}
    			}
    			return true;
    		};
    		if (defineProperty) {
    			defineProperty(String.prototype, 'startsWith', {
    				'value': startsWith,
    				'configurable': true,
    				'writable': true
    			});
    		} else {
    			String.prototype.startsWith = startsWith;
    		}
    	}());
    }

    /*! http://mths.be/endswith v0.2.0 by @mathias */
    if (!String.prototype.endsWith) {
    	(function() {
    		var defineProperty = (function() {
    			// IE 8 only supports `Object.defineProperty` on DOM elements
    			try {
    				var object = {};
    				var $defineProperty = Object.defineProperty;
    				var result = $defineProperty(object, object, object) && $defineProperty;
    			} catch(error) {}
    			return result;
    		}());
    		var toString = {}.toString;
    		var endsWith = function(search) {
    			if (this == null) {
    				throw TypeError();
    			}
    			var string = String(this);
    			if (search && toString.call(search) == '[object RegExp]') {
    				throw TypeError();
    			}
    			var stringLength = string.length;
    			var searchString = String(search);
    			var searchLength = searchString.length;
    			var pos = stringLength;
    			if (arguments.length > 1) {
    				var position = arguments[1];
    				if (position !== undefined) {
    					// `ToInteger`
    					pos = position ? Number(position) : 0;
    					if (pos != pos) { // better `isNaN`
    						pos = 0;
    					}
    				}
    			}
    			var end = Math.min(Math.max(pos, 0), stringLength);
    			var start = end - searchLength;
    			if (start < 0) {
    				return false;
    			}
    			var index = -1;
    			while (++index < searchLength) {
    				if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
    					return false;
    				}
    			}
    			return true;
    		};
    		if (defineProperty) {
    			defineProperty(String.prototype, 'endsWith', {
    				'value': endsWith,
    				'configurable': true,
    				'writable': true
    			});
    		} else {
    			String.prototype.endsWith = endsWith;
    		}
    	}());
    }

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
    	if (val === null || val === undefined) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}

    	return Object(val);
    }

    function shouldUseNative() {
    	try {
    		if (!Object.assign) {
    			return false;
    		}

    		// Detect buggy property enumeration order in older V8 versions.

    		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
    		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
    		test1[5] = 'de';
    		if (Object.getOwnPropertyNames(test1)[0] === '5') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test2 = {};
    		for (var i = 0; i < 10; i++) {
    			test2['_' + String.fromCharCode(i)] = i;
    		}
    		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
    			return test2[n];
    		});
    		if (order2.join('') !== '0123456789') {
    			return false;
    		}

    		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    		var test3 = {};
    		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
    			test3[letter] = letter;
    		});
    		if (Object.keys(Object.assign({}, test3)).join('') !==
    				'abcdefghijklmnopqrst') {
    			return false;
    		}

    		return true;
    	} catch (err) {
    		// We don't expect any of the above to throw, but better to be safe.
    		return false;
    	}
    }

    var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    	var arguments$1 = arguments;

    	var from;
    	var to = toObject(target);
    	var symbols;

    	for (var s = 1; s < arguments.length; s++) {
    		from = Object(arguments$1[s]);

    		for (var key in from) {
    			if (hasOwnProperty.call(from, key)) {
    				to[key] = from[key];
    			}
    		}

    		if (getOwnPropertySymbols) {
    			symbols = getOwnPropertySymbols(from);
    			for (var i = 0; i < symbols.length; i++) {
    				if (propIsEnumerable.call(from, symbols[i])) {
    					to[symbols[i]] = from[symbols[i]];
    				}
    			}
    		}
    	}

    	return to;
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, basedir, module) {
    	return module = {
    	  path: basedir,
    	  exports: {},
    	  require: function (path, base) {
          return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
        }
    	}, fn(module, module.exports), module.exports;
    }

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }

    var indexesOf = function (ary, item) {
      var i = -1, indexes = [];
      while((i = ary.indexOf(item, i + 1)) !== -1)
        { indexes.push(i); }
      return indexes
    };

    function unique_pred(list, compare) {
      var ptr = 1
        , len = list.length
        , a=list[0], b=list[0];
      for(var i=1; i<len; ++i) {
        b = a;
        a = list[i];
        if(compare(a, b)) {
          if(i === ptr) {
            ptr++;
            continue
          }
          list[ptr++] = a;
        }
      }
      list.length = ptr;
      return list
    }

    function unique_eq(list) {
      var ptr = 1
        , len = list.length
        , a=list[0], b = list[0];
      for(var i=1; i<len; ++i, b=a) {
        b = a;
        a = list[i];
        if(a !== b) {
          if(i === ptr) {
            ptr++;
            continue
          }
          list[ptr++] = a;
        }
      }
      list.length = ptr;
      return list
    }

    function unique(list, compare, sorted) {
      if(list.length === 0) {
        return list
      }
      if(compare) {
        if(!sorted) {
          list.sort(compare);
        }
        return unique_pred(list, compare)
      }
      if(!sorted) {
        list.sort();
      }
      return unique_eq(list)
    }

    var uniq = unique;

    var unesc_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = unesc;
    var whitespace = '[\\x20\\t\\r\\n\\f]';
    var unescapeRegExp = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig');

    function unesc(str) {
      return str.replace(unescapeRegExp, function (_, escaped, escapedWhitespace) {
        var high = '0x' + escaped - 0x10000; // NaN means non-codepoint
        // Workaround erroneous numeric interpretation of +"0x"
        // eslint-disable-next-line no-self-compare

        return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
        String.fromCharCode(high + 0x10000) : // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode(high >> 10 | 0xd800, high & 0x3ff | 0xdc00);
      });
    }

    module.exports = exports.default;
    });

    var getProp_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = getProp;

    function getProp(obj) {
      var arguments$1 = arguments;

      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments$1[_key];
      }

      while (props.length > 0) {
        var prop = props.shift();

        if (!obj[prop]) {
          return undefined;
        }

        obj = obj[prop];
      }

      return obj;
    }

    module.exports = exports.default;
    });

    var ensureObject_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = ensureObject;

    function ensureObject(obj) {
      var arguments$1 = arguments;

      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments$1[_key];
      }

      while (props.length > 0) {
        var prop = props.shift();

        if (!obj[prop]) {
          obj[prop] = {};
        }

        obj = obj[prop];
      }
    }

    module.exports = exports.default;
    });

    var stripComments_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = stripComments;

    function stripComments(str) {
      var s = "";
      var commentStart = str.indexOf("/*");
      var lastEnd = 0;

      while (commentStart >= 0) {
        s = s + str.slice(lastEnd, commentStart);
        var commentEnd = str.indexOf("*/", commentStart + 2);

        if (commentEnd < 0) {
          return s;
        }

        lastEnd = commentEnd + 2;
        commentStart = str.indexOf("/*", lastEnd);
      }

      s = s + str.slice(lastEnd);
      return s;
    }

    module.exports = exports.default;
    });

    var util = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.stripComments = exports.ensureObject = exports.getProp = exports.unesc = void 0;

    var _unesc = _interopRequireDefault(unesc_1);

    exports.unesc = _unesc.default;

    var _getProp = _interopRequireDefault(getProp_1);

    exports.getProp = _getProp.default;

    var _ensureObject = _interopRequireDefault(ensureObject_1);

    exports.ensureObject = _ensureObject.default;

    var _stripComments = _interopRequireDefault(stripComments_1);

    exports.stripComments = _stripComments.default;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    });

    var node = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;



    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

    var cloneNode = function cloneNode(obj, parent) {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      var cloned = new obj.constructor();

      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue;
        }

        var value = obj[i];
        var type = typeof value;

        if (i === 'parent' && type === 'object') {
          if (parent) {
            cloned[i] = parent;
          }
        } else if (value instanceof Array) {
          cloned[i] = value.map(function (j) {
            return cloneNode(j, cloned);
          });
        } else {
          cloned[i] = cloneNode(value, cloned);
        }
      }

      return cloned;
    };

    var Node =
    /*#__PURE__*/
    function () {
      function Node(opts) {
        if (opts === void 0) {
          opts = {};
        }

        objectAssign(this, opts);
        this.spaces = this.spaces || {};
        this.spaces.before = this.spaces.before || '';
        this.spaces.after = this.spaces.after || '';
      }

      var _proto = Node.prototype;

      _proto.remove = function remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }

        this.parent = undefined;
        return this;
      };

      _proto.replaceWith = function replaceWith() {
        var arguments$1 = arguments;

        if (this.parent) {
          for (var index in arguments) {
            this.parent.insertBefore(this, arguments$1[index]);
          }

          this.remove();
        }

        return this;
      };

      _proto.next = function next() {
        return this.parent.at(this.parent.index(this) + 1);
      };

      _proto.prev = function prev() {
        return this.parent.at(this.parent.index(this) - 1);
      };

      _proto.clone = function clone(overrides) {
        if (overrides === void 0) {
          overrides = {};
        }

        var cloned = cloneNode(this);

        for (var name in overrides) {
          cloned[name] = overrides[name];
        }

        return cloned;
      }
      /**
       * Some non-standard syntax doesn't follow normal escaping rules for css.
       * This allows non standard syntax to be appended to an existing property
       * by specifying the escaped value. By specifying the escaped value,
       * illegal characters are allowed to be directly inserted into css output.
       * @param {string} name the property to set
       * @param {any} value the unescaped value of the property
       * @param {string} valueEscaped optional. the escaped value of the property.
       */
      ;

      _proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value, valueEscaped) {
        if (!this.raws) {
          this.raws = {};
        }

        var originalValue = this[name];
        var originalEscaped = this.raws[name];
        this[name] = originalValue + value; // this may trigger a setter that updates raws, so it has to be set first.

        if (originalEscaped || valueEscaped !== value) {
          this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
        } else {
          delete this.raws[name]; // delete any escaped value that was created by the setter.
        }
      }
      /**
       * Some non-standard syntax doesn't follow normal escaping rules for css.
       * This allows the escaped value to be specified directly, allowing illegal
       * characters to be directly inserted into css output.
       * @param {string} name the property to set
       * @param {any} value the unescaped value of the property
       * @param {string} valueEscaped the escaped value of the property.
       */
      ;

      _proto.setPropertyAndEscape = function setPropertyAndEscape(name, value, valueEscaped) {
        if (!this.raws) {
          this.raws = {};
        }

        this[name] = value; // this may trigger a setter that updates raws, so it has to be set first.

        this.raws[name] = valueEscaped;
      }
      /**
       * When you want a value to passed through to CSS directly. This method
       * deletes the corresponding raw value causing the stringifier to fallback
       * to the unescaped value.
       * @param {string} name the property to set.
       * @param {any} value The value that is both escaped and unescaped.
       */
      ;

      _proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value) {
        this[name] = value; // this may trigger a setter that updates raws, so it has to be set first.

        if (this.raws) {
          delete this.raws[name];
        }
      }
      /**
       *
       * @param {number} line The number (starting with 1)
       * @param {number} column The column number (starting with 1)
       */
      ;

      _proto.isAtPosition = function isAtPosition(line, column) {
        if (this.source && this.source.start && this.source.end) {
          if (this.source.start.line > line) {
            return false;
          }

          if (this.source.end.line < line) {
            return false;
          }

          if (this.source.start.line === line && this.source.start.column > column) {
            return false;
          }

          if (this.source.end.line === line && this.source.end.column < column) {
            return false;
          }

          return true;
        }

        return undefined;
      };

      _proto.stringifyProperty = function stringifyProperty(name) {
        return this.raws && this.raws[name] || this[name];
      };

      _proto.valueToString = function valueToString() {
        return String(this.stringifyProperty("value"));
      };

      _proto.toString = function toString() {
        return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join('');
      };

      _createClass(Node, [{
        key: "rawSpaceBefore",
        get: function get() {
          var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;

          if (rawSpace === undefined) {
            rawSpace = this.spaces && this.spaces.before;
          }

          return rawSpace || "";
        },
        set: function set(raw) {
          (0, util.ensureObject)(this, "raws", "spaces");
          this.raws.spaces.before = raw;
        }
      }, {
        key: "rawSpaceAfter",
        get: function get() {
          var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;

          if (rawSpace === undefined) {
            rawSpace = this.spaces.after;
          }

          return rawSpace || "";
        },
        set: function set(raw) {
          (0, util.ensureObject)(this, "raws", "spaces");
          this.raws.spaces.after = raw;
        }
      }]);

      return Node;
    }();

    exports.default = Node;
    module.exports = exports.default;
    });

    var types = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.UNIVERSAL = exports.ATTRIBUTE = exports.CLASS = exports.COMBINATOR = exports.COMMENT = exports.ID = exports.NESTING = exports.PSEUDO = exports.ROOT = exports.SELECTOR = exports.STRING = exports.TAG = void 0;
    var TAG = 'tag';
    exports.TAG = TAG;
    var STRING = 'string';
    exports.STRING = STRING;
    var SELECTOR = 'selector';
    exports.SELECTOR = SELECTOR;
    var ROOT = 'root';
    exports.ROOT = ROOT;
    var PSEUDO = 'pseudo';
    exports.PSEUDO = PSEUDO;
    var NESTING = 'nesting';
    exports.NESTING = NESTING;
    var ID = 'id';
    exports.ID = ID;
    var COMMENT = 'comment';
    exports.COMMENT = COMMENT;
    var COMBINATOR = 'combinator';
    exports.COMBINATOR = COMBINATOR;
    var CLASS = 'class';
    exports.CLASS = CLASS;
    var ATTRIBUTE = 'attribute';
    exports.ATTRIBUTE = ATTRIBUTE;
    var UNIVERSAL = 'universal';
    exports.UNIVERSAL = UNIVERSAL;
    });

    var container = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _node = _interopRequireDefault(node);

    var types$1 = _interopRequireWildcard(types);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Container =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(Container, _Node);

      function Container(opts) {
        var _this;

        _this = _Node.call(this, opts) || this;

        if (!_this.nodes) {
          _this.nodes = [];
        }

        return _this;
      }

      var _proto = Container.prototype;

      _proto.append = function append(selector) {
        selector.parent = this;
        this.nodes.push(selector);
        return this;
      };

      _proto.prepend = function prepend(selector) {
        selector.parent = this;
        this.nodes.unshift(selector);
        return this;
      };

      _proto.at = function at(index) {
        return this.nodes[index];
      };

      _proto.index = function index(child) {
        if (typeof child === 'number') {
          return child;
        }

        return this.nodes.indexOf(child);
      };

      _proto.removeChild = function removeChild(child) {
        child = this.index(child);
        this.at(child).parent = undefined;
        this.nodes.splice(child, 1);
        var index;

        for (var id in this.indexes) {
          index = this.indexes[id];

          if (index >= child) {
            this.indexes[id] = index - 1;
          }
        }

        return this;
      };

      _proto.removeAll = function removeAll() {
        for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) { break; }
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) { break; }
            _ref = _i.value;
          }

          var node = _ref;
          node.parent = undefined;
        }

        this.nodes = [];
        return this;
      };

      _proto.empty = function empty() {
        return this.removeAll();
      };

      _proto.insertAfter = function insertAfter(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex + 1, 0, newNode);
        newNode.parent = this;
        var index;

        for (var id in this.indexes) {
          index = this.indexes[id];

          if (oldIndex <= index) {
            this.indexes[id] = index + 1;
          }
        }

        return this;
      };

      _proto.insertBefore = function insertBefore(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex, 0, newNode);
        newNode.parent = this;
        var index;

        for (var id in this.indexes) {
          index = this.indexes[id];

          if (index <= oldIndex) {
            this.indexes[id] = index + 1;
          }
        }

        return this;
      };

      _proto._findChildAtPosition = function _findChildAtPosition(line, col) {
        var found = undefined;
        this.each(function (node) {
          if (node.atPosition) {
            var foundChild = node.atPosition(line, col);

            if (foundChild) {
              found = foundChild;
              return false;
            }
          } else if (node.isAtPosition(line, col)) {
            found = node;
            return false;
          }
        });
        return found;
      }
      /**
       * Return the most specific node at the line and column number given.
       * The source location is based on the original parsed location, locations aren't
       * updated as selector nodes are mutated.
       * 
       * Note that this location is relative to the location of the first character
       * of the selector, and not the location of the selector in the overall document
       * when used in conjunction with postcss.
       *
       * If not found, returns undefined.
       * @param {number} line The line number of the node to find. (1-based index)
       * @param {number} col  The column number of the node to find. (1-based index)
       */
      ;

      _proto.atPosition = function atPosition(line, col) {
        if (this.isAtPosition(line, col)) {
          return this._findChildAtPosition(line, col) || this;
        } else {
          return undefined;
        }
      };

      _proto._inferEndPosition = function _inferEndPosition() {
        if (this.last && this.last.source && this.last.source.end) {
          this.source = this.source || {};
          this.source.end = this.source.end || {};
          objectAssign(this.source.end, this.last.source.end);
        }
      };

      _proto.each = function each(callback) {
        if (!this.lastEach) {
          this.lastEach = 0;
        }

        if (!this.indexes) {
          this.indexes = {};
        }

        this.lastEach++;
        var id = this.lastEach;
        this.indexes[id] = 0;

        if (!this.length) {
          return undefined;
        }

        var index, result;

        while (this.indexes[id] < this.length) {
          index = this.indexes[id];
          result = callback(this.at(index), index);

          if (result === false) {
            break;
          }

          this.indexes[id] += 1;
        }

        delete this.indexes[id];

        if (result === false) {
          return false;
        }
      };

      _proto.walk = function walk(callback) {
        return this.each(function (node, i) {
          var result = callback(node, i);

          if (result !== false && node.length) {
            result = node.walk(callback);
          }

          if (result === false) {
            return false;
          }
        });
      };

      _proto.walkAttributes = function walkAttributes(callback) {
        var _this2 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.ATTRIBUTE) {
            return callback.call(_this2, selector);
          }
        });
      };

      _proto.walkClasses = function walkClasses(callback) {
        var _this3 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.CLASS) {
            return callback.call(_this3, selector);
          }
        });
      };

      _proto.walkCombinators = function walkCombinators(callback) {
        var _this4 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.COMBINATOR) {
            return callback.call(_this4, selector);
          }
        });
      };

      _proto.walkComments = function walkComments(callback) {
        var _this5 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.COMMENT) {
            return callback.call(_this5, selector);
          }
        });
      };

      _proto.walkIds = function walkIds(callback) {
        var _this6 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.ID) {
            return callback.call(_this6, selector);
          }
        });
      };

      _proto.walkNesting = function walkNesting(callback) {
        var _this7 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.NESTING) {
            return callback.call(_this7, selector);
          }
        });
      };

      _proto.walkPseudos = function walkPseudos(callback) {
        var _this8 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.PSEUDO) {
            return callback.call(_this8, selector);
          }
        });
      };

      _proto.walkTags = function walkTags(callback) {
        var _this9 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.TAG) {
            return callback.call(_this9, selector);
          }
        });
      };

      _proto.walkUniversals = function walkUniversals(callback) {
        var _this10 = this;

        return this.walk(function (selector) {
          if (selector.type === types$1.UNIVERSAL) {
            return callback.call(_this10, selector);
          }
        });
      };

      _proto.split = function split(callback) {
        var _this11 = this;

        var current = [];
        return this.reduce(function (memo, node, index) {
          var split = callback.call(_this11, node);
          current.push(node);

          if (split) {
            memo.push(current);
            current = [];
          } else if (index === _this11.length - 1) {
            memo.push(current);
          }

          return memo;
        }, []);
      };

      _proto.map = function map(callback) {
        return this.nodes.map(callback);
      };

      _proto.reduce = function reduce(callback, memo) {
        return this.nodes.reduce(callback, memo);
      };

      _proto.every = function every(callback) {
        return this.nodes.every(callback);
      };

      _proto.some = function some(callback) {
        return this.nodes.some(callback);
      };

      _proto.filter = function filter(callback) {
        return this.nodes.filter(callback);
      };

      _proto.sort = function sort(callback) {
        return this.nodes.sort(callback);
      };

      _proto.toString = function toString() {
        return this.map(String).join('');
      };

      _createClass(Container, [{
        key: "first",
        get: function get() {
          return this.at(0);
        }
      }, {
        key: "last",
        get: function get() {
          return this.at(this.length - 1);
        }
      }, {
        key: "length",
        get: function get() {
          return this.nodes.length;
        }
      }]);

      return Container;
    }(_node.default);

    exports.default = Container;
    module.exports = exports.default;
    });

    var root = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _container = _interopRequireDefault(container);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Root =
    /*#__PURE__*/
    function (_Container) {
      _inheritsLoose(Root, _Container);

      function Root(opts) {
        var _this;

        _this = _Container.call(this, opts) || this;
        _this.type = types.ROOT;
        return _this;
      }

      var _proto = Root.prototype;

      _proto.toString = function toString() {
        var str = this.reduce(function (memo, selector) {
          memo.push(String(selector));
          return memo;
        }, []).join(',');
        return this.trailingComma ? str + ',' : str;
      };

      _proto.error = function error(message, options) {
        if (this._error) {
          return this._error(message, options);
        } else {
          return new Error(message);
        }
      };

      _createClass(Root, [{
        key: "errorGenerator",
        set: function set(handler) {
          this._error = handler;
        }
      }]);

      return Root;
    }(_container.default);

    exports.default = Root;
    module.exports = exports.default;
    });

    var selector = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _container = _interopRequireDefault(container);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Selector =
    /*#__PURE__*/
    function (_Container) {
      _inheritsLoose(Selector, _Container);

      function Selector(opts) {
        var _this;

        _this = _Container.call(this, opts) || this;
        _this.type = types.SELECTOR;
        return _this;
      }

      return Selector;
    }(_container.default);

    exports.default = Selector;
    module.exports = exports.default;
    });

    /*! https://mths.be/cssesc v3.0.0 by @mathias */

    var object = {};
    var hasOwnProperty$1 = object.hasOwnProperty;
    var merge = function merge(options, defaults) {
    	if (!options) {
    		return defaults;
    	}
    	var result = {};
    	for (var key in defaults) {
    		// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
    		// only recognized option names are used.
    		result[key] = hasOwnProperty$1.call(options, key) ? options[key] : defaults[key];
    	}
    	return result;
    };

    var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
    var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
    var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;

    // https://mathiasbynens.be/notes/css-escapes#css
    var cssesc = function cssesc(string, options) {
    	options = merge(options, cssesc.options);
    	if (options.quotes != 'single' && options.quotes != 'double') {
    		options.quotes = 'single';
    	}
    	var quote = options.quotes == 'double' ? '"' : '\'';
    	var isIdentifier = options.isIdentifier;

    	var firstChar = string.charAt(0);
    	var output = '';
    	var counter = 0;
    	var length = string.length;
    	while (counter < length) {
    		var character = string.charAt(counter++);
    		var codePoint = character.charCodeAt();
    		var value = void 0;
    		// If it’s not a printable ASCII character…
    		if (codePoint < 0x20 || codePoint > 0x7E) {
    			if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
    				// It’s a high surrogate, and there is a next character.
    				var extra = string.charCodeAt(counter++);
    				if ((extra & 0xFC00) == 0xDC00) {
    					// next character is low surrogate
    					codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
    				} else {
    					// It’s an unmatched surrogate; only append this code unit, in case
    					// the next code unit is the high surrogate of a surrogate pair.
    					counter--;
    				}
    			}
    			value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
    		} else {
    			if (options.escapeEverything) {
    				if (regexAnySingleEscape.test(character)) {
    					value = '\\' + character;
    				} else {
    					value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
    				}
    			} else if (/[\t\n\f\r\x0B]/.test(character)) {
    				value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
    			} else if (character == '\\' || !isIdentifier && (character == '"' && quote == character || character == '\'' && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
    				value = '\\' + character;
    			} else {
    				value = character;
    			}
    		}
    		output += value;
    	}

    	if (isIdentifier) {
    		if (/^-[-\d]/.test(output)) {
    			output = '\\-' + output.slice(1);
    		} else if (/\d/.test(firstChar)) {
    			output = '\\3' + firstChar + ' ' + output.slice(1);
    		}
    	}

    	// Remove spaces after `\HEX` escapes that are not followed by a hex digit,
    	// since they’re redundant. Note that this is only possible if the escape
    	// sequence isn’t preceded by an odd number of backslashes.
    	output = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {
    		if ($1 && $1.length % 2) {
    			// It’s not safe to remove the space, so don’t.
    			return $0;
    		}
    		// Strip the space.
    		return ($1 || '') + $2;
    	});

    	if (!isIdentifier && options.wrap) {
    		return quote + output + quote;
    	}
    	return output;
    };

    // Expose default options (so they can be overridden globally).
    cssesc.options = {
    	'escapeEverything': false,
    	'isIdentifier': false,
    	'quotes': 'single',
    	'wrap': false
    };

    cssesc.version = '3.0.0';

    var cssesc_1 = cssesc;

    var className = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _cssesc = _interopRequireDefault(cssesc_1);



    var _node = _interopRequireDefault(node);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var ClassName =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(ClassName, _Node);

      function ClassName(opts) {
        var _this;

        _this = _Node.call(this, opts) || this;
        _this.type = types.CLASS;
        _this._constructed = true;
        return _this;
      }

      var _proto = ClassName.prototype;

      _proto.valueToString = function valueToString() {
        return '.' + _Node.prototype.valueToString.call(this);
      };

      _createClass(ClassName, [{
        key: "value",
        set: function set(v) {
          if (this._constructed) {
            var escaped = (0, _cssesc.default)(v, {
              isIdentifier: true
            });

            if (escaped !== v) {
              (0, util.ensureObject)(this, "raws");
              this.raws.value = escaped;
            } else if (this.raws) {
              delete this.raws.value;
            }
          }

          this._value = v;
        },
        get: function get() {
          return this._value;
        }
      }]);

      return ClassName;
    }(_node.default);

    exports.default = ClassName;
    module.exports = exports.default;
    });

    var comment = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _node = _interopRequireDefault(node);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Comment =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(Comment, _Node);

      function Comment(opts) {
        var _this;

        _this = _Node.call(this, opts) || this;
        _this.type = types.COMMENT;
        return _this;
      }

      return Comment;
    }(_node.default);

    exports.default = Comment;
    module.exports = exports.default;
    });

    var id = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _node = _interopRequireDefault(node);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var ID =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(ID, _Node);

      function ID(opts) {
        var _this;

        _this = _Node.call(this, opts) || this;
        _this.type = types.ID;
        return _this;
      }

      var _proto = ID.prototype;

      _proto.valueToString = function valueToString() {
        return '#' + _Node.prototype.valueToString.call(this);
      };

      return ID;
    }(_node.default);

    exports.default = ID;
    module.exports = exports.default;
    });

    var namespace = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _cssesc = _interopRequireDefault(cssesc_1);



    var _node = _interopRequireDefault(node);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Namespace =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(Namespace, _Node);

      function Namespace() {
        return _Node.apply(this, arguments) || this;
      }

      var _proto = Namespace.prototype;

      _proto.qualifiedName = function qualifiedName(value) {
        if (this.namespace) {
          return this.namespaceString + "|" + value;
        } else {
          return value;
        }
      };

      _proto.valueToString = function valueToString() {
        return this.qualifiedName(_Node.prototype.valueToString.call(this));
      };

      _createClass(Namespace, [{
        key: "namespace",
        get: function get() {
          return this._namespace;
        },
        set: function set(namespace) {
          if (namespace === true || namespace === "*" || namespace === "&") {
            this._namespace = namespace;

            if (this.raws) {
              delete this.raws.namespace;
            }

            return;
          }

          var escaped = (0, _cssesc.default)(namespace, {
            isIdentifier: true
          });
          this._namespace = namespace;

          if (escaped !== namespace) {
            (0, util.ensureObject)(this, "raws");
            this.raws.namespace = escaped;
          } else if (this.raws) {
            delete this.raws.namespace;
          }
        }
      }, {
        key: "ns",
        get: function get() {
          return this._namespace;
        },
        set: function set(namespace) {
          this.namespace = namespace;
        }
      }, {
        key: "namespaceString",
        get: function get() {
          if (this.namespace) {
            var ns = this.stringifyProperty("namespace");

            if (ns === true) {
              return '';
            } else {
              return ns;
            }
          } else {
            return '';
          }
        }
      }]);

      return Namespace;
    }(_node.default);

    exports.default = Namespace;
    module.exports = exports.default;
    });

    var tag = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _namespace = _interopRequireDefault(namespace);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Tag =
    /*#__PURE__*/
    function (_Namespace) {
      _inheritsLoose(Tag, _Namespace);

      function Tag(opts) {
        var _this;

        _this = _Namespace.call(this, opts) || this;
        _this.type = types.TAG;
        return _this;
      }

      return Tag;
    }(_namespace.default);

    exports.default = Tag;
    module.exports = exports.default;
    });

    var string = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _node = _interopRequireDefault(node);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var String =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(String, _Node);

      function String(opts) {
        var _this;

        _this = _Node.call(this, opts) || this;
        _this.type = types.STRING;
        return _this;
      }

      return String;
    }(_node.default);

    exports.default = String;
    module.exports = exports.default;
    });

    var pseudo = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _container = _interopRequireDefault(container);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Pseudo =
    /*#__PURE__*/
    function (_Container) {
      _inheritsLoose(Pseudo, _Container);

      function Pseudo(opts) {
        var _this;

        _this = _Container.call(this, opts) || this;
        _this.type = types.PSEUDO;
        return _this;
      }

      var _proto = Pseudo.prototype;

      _proto.toString = function toString() {
        var params = this.length ? '(' + this.map(String).join(',') + ')' : '';
        return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join('');
      };

      return Pseudo;
    }(_container.default);

    exports.default = Pseudo;
    module.exports = exports.default;
    });

    /**
     * Module exports.
     */

    var browser = deprecate;

    /**
     * Mark that a method should not be used.
     * Returns a modified function which warns once by default.
     *
     * If `localStorage.noDeprecation = true` is set, then it is a no-op.
     *
     * If `localStorage.throwDeprecation = true` is set, then deprecated functions
     * will throw an Error when invoked.
     *
     * If `localStorage.traceDeprecation = true` is set, then deprecated functions
     * will invoke `console.trace()` instead of `console.error()`.
     *
     * @param {Function} fn - the function to deprecate
     * @param {String} msg - the string to print to the console when `fn` is invoked
     * @returns {Function} a new "deprecated" version of `fn`
     * @api public
     */

    function deprecate (fn, msg) {
      if (config('noDeprecation')) {
        return fn;
      }

      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config('throwDeprecation')) {
            throw new Error(msg);
          } else if (config('traceDeprecation')) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }

      return deprecated;
    }

    /**
     * Checks `localStorage` for boolean values for the given `name`.
     *
     * @param {String} name
     * @returns {Boolean}
     * @api private
     */

    function config (name) {
      // accessing global.localStorage can trigger a DOMException in sandboxed iframes
      try {
        if (!commonjsGlobal.localStorage) { return false; }
      } catch (_) {
        return false;
      }
      var val = commonjsGlobal.localStorage[name];
      if (null == val) { return false; }
      return String(val).toLowerCase() === 'true';
    }

    var attribute = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.unescapeValue = unescapeValue;
    exports.default = void 0;

    var _cssesc = _interopRequireDefault(cssesc_1);

    var _unesc = _interopRequireDefault(unesc_1);

    var _namespace = _interopRequireDefault(namespace);



    var _CSSESC_QUOTE_OPTIONS;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



    var WRAPPED_IN_QUOTES = /^('|")(.*)\1$/;
    var warnOfDeprecatedValueAssignment = browser(function () {}, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. " + "Call attribute.setValue() instead.");
    var warnOfDeprecatedQuotedAssignment = browser(function () {}, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
    var warnOfDeprecatedConstructor = browser(function () {}, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");

    function unescapeValue(value) {
      var deprecatedUsage = false;
      var quoteMark = null;
      var unescaped = value;
      var m = unescaped.match(WRAPPED_IN_QUOTES);

      if (m) {
        quoteMark = m[1];
        unescaped = m[2];
      }

      unescaped = (0, _unesc.default)(unescaped);

      if (unescaped !== value) {
        deprecatedUsage = true;
      }

      return {
        deprecatedUsage: deprecatedUsage,
        unescaped: unescaped,
        quoteMark: quoteMark
      };
    }

    function handleDeprecatedContructorOpts(opts) {
      if (opts.quoteMark !== undefined) {
        return opts;
      }

      if (opts.value === undefined) {
        return opts;
      }

      warnOfDeprecatedConstructor();

      var _unescapeValue = unescapeValue(opts.value),
          quoteMark = _unescapeValue.quoteMark,
          unescaped = _unescapeValue.unescaped;

      if (!opts.raws) {
        opts.raws = {};
      }

      if (opts.raws.value === undefined) {
        opts.raws.value = opts.value;
      }

      opts.value = unescaped;
      opts.quoteMark = quoteMark;
      return opts;
    }

    var Attribute =
    /*#__PURE__*/
    function (_Namespace) {
      _inheritsLoose(Attribute, _Namespace);

      function Attribute(opts) {
        var _this;

        if (opts === void 0) {
          opts = {};
        }

        _this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
        _this.type = types.ATTRIBUTE;
        _this.raws = _this.raws || {};
        Object.defineProperty(_this.raws, 'unquoted', {
          get: browser(function () {
            return _this.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
          set: browser(function () {
            return _this.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
        });
        _this._constructed = true;
        return _this;
      }
      /**
       * Returns the Attribute's value quoted such that it would be legal to use
       * in the value of a css file. The original value's quotation setting
       * used for stringification is left unchanged. See `setValue(value, options)`
       * if you want to control the quote settings of a new value for the attribute.
       *
       * You can also change the quotation used for the current value by setting quoteMark.
       *
       * Options:
       *   * quoteMark {'"' | "'" | null} - Use this value to quote the value. If this
       *     option is not set, the original value for quoteMark will be used. If
       *     indeterminate, a double quote is used. The legal values are:
       *     * `null` - the value will be unquoted and characters will be escaped as necessary.
       *     * `'` - the value will be quoted with a single quote and single quotes are escaped.
       *     * `"` - the value will be quoted with a double quote and double quotes are escaped.
       *   * preferCurrentQuoteMark {boolean} - if true, prefer the source quote mark
       *     over the quoteMark option value.
       *   * smart {boolean} - if true, will select a quote mark based on the value
       *     and the other options specified here. See the `smartQuoteMark()`
       *     method.
       **/


      var _proto = Attribute.prototype;

      _proto.getQuotedValue = function getQuotedValue(options) {
        if (options === void 0) {
          options = {};
        }

        var quoteMark = this._determineQuoteMark(options);

        var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
        var escaped = (0, _cssesc.default)(this._value, cssescopts);
        return escaped;
      };

      _proto._determineQuoteMark = function _determineQuoteMark(options) {
        return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
      }
      /**
       * Set the unescaped value with the specified quotation options. The value
       * provided must not include any wrapping quote marks -- those quotes will
       * be interpreted as part of the value and escaped accordingly.
       */
      ;

      _proto.setValue = function setValue(value, options) {
        if (options === void 0) {
          options = {};
        }

        this._value = value;
        this._quoteMark = this._determineQuoteMark(options);

        this._syncRawValue();
      }
      /**
       * Intelligently select a quoteMark value based on the value's contents. If
       * the value is a legal CSS ident, it will not be quoted. Otherwise a quote
       * mark will be picked that minimizes the number of escapes.
       *
       * If there's no clear winner, the quote mark from these options is used,
       * then the source quote mark (this is inverted if `preferCurrentQuoteMark` is
       * true). If the quoteMark is unspecified, a double quote is used.
       *
       * @param options This takes the quoteMark and preferCurrentQuoteMark options
       * from the quoteValue method.
       */
      ;

      _proto.smartQuoteMark = function smartQuoteMark(options) {
        var v = this.value;
        var numSingleQuotes = v.replace(/[^']/g, '').length;
        var numDoubleQuotes = v.replace(/[^"]/g, '').length;

        if (numSingleQuotes + numDoubleQuotes === 0) {
          var escaped = (0, _cssesc.default)(v, {
            isIdentifier: true
          });

          if (escaped === v) {
            return Attribute.NO_QUOTE;
          } else {
            var pref = this.preferredQuoteMark(options);

            if (pref === Attribute.NO_QUOTE) {
              // pick a quote mark that isn't none and see if it's smaller
              var quote = this.quoteMark || options.quoteMark || Attribute.DOUBLE_QUOTE;
              var opts = CSSESC_QUOTE_OPTIONS[quote];
              var quoteValue = (0, _cssesc.default)(v, opts);

              if (quoteValue.length < escaped.length) {
                return quote;
              }
            }

            return pref;
          }
        } else if (numDoubleQuotes === numSingleQuotes) {
          return this.preferredQuoteMark(options);
        } else if (numDoubleQuotes < numSingleQuotes) {
          return Attribute.DOUBLE_QUOTE;
        } else {
          return Attribute.SINGLE_QUOTE;
        }
      }
      /**
       * Selects the preferred quote mark based on the options and the current quote mark value.
       * If you want the quote mark to depend on the attribute value, call `smartQuoteMark(opts)`
       * instead.
       */
      ;

      _proto.preferredQuoteMark = function preferredQuoteMark(options) {
        var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;

        if (quoteMark === undefined) {
          quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
        }

        if (quoteMark === undefined) {
          quoteMark = Attribute.DOUBLE_QUOTE;
        }

        return quoteMark;
      };

      _proto._syncRawValue = function _syncRawValue() {
        var rawValue = (0, _cssesc.default)(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);

        if (rawValue === this._value) {
          if (this.raws) {
            delete this.raws.value;
          }
        } else {
          this.raws.value = rawValue;
        }
      };

      _proto._handleEscapes = function _handleEscapes(prop, value) {
        if (this._constructed) {
          var escaped = (0, _cssesc.default)(value, {
            isIdentifier: true
          });

          if (escaped !== value) {
            this.raws[prop] = escaped;
          } else {
            delete this.raws[prop];
          }
        }
      };

      _proto._spacesFor = function _spacesFor(name) {
        var attrSpaces = {
          before: '',
          after: ''
        };
        var spaces = this.spaces[name] || {};
        var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
        return objectAssign(attrSpaces, spaces, rawSpaces);
      };

      _proto._stringFor = function _stringFor(name, spaceName, concat) {
        if (spaceName === void 0) {
          spaceName = name;
        }

        if (concat === void 0) {
          concat = defaultAttrConcat;
        }

        var attrSpaces = this._spacesFor(spaceName);

        return concat(this.stringifyProperty(name), attrSpaces);
      }
      /**
       * returns the offset of the attribute part specified relative to the
       * start of the node of the output string.
       *
       * * "ns" - alias for "namespace"
       * * "namespace" - the namespace if it exists.
       * * "attribute" - the attribute name
       * * "attributeNS" - the start of the attribute or its namespace
       * * "operator" - the match operator of the attribute
       * * "value" - The value (string or identifier)
       * * "insensitive" - the case insensitivity flag;
       * @param part One of the possible values inside an attribute.
       * @returns -1 if the name is invalid or the value doesn't exist in this attribute.
       */
      ;

      _proto.offsetOf = function offsetOf(name) {
        var count = 1;

        var attributeSpaces = this._spacesFor("attribute");

        count += attributeSpaces.before.length;

        if (name === "namespace" || name === "ns") {
          return this.namespace ? count : -1;
        }

        if (name === "attributeNS") {
          return count;
        }

        count += this.namespaceString.length;

        if (this.namespace) {
          count += 1;
        }

        if (name === "attribute") {
          return count;
        }

        count += this.stringifyProperty("attribute").length;
        count += attributeSpaces.after.length;

        var operatorSpaces = this._spacesFor("operator");

        count += operatorSpaces.before.length;
        var operator = this.stringifyProperty("operator");

        if (name === "operator") {
          return operator ? count : -1;
        }

        count += operator.length;
        count += operatorSpaces.after.length;

        var valueSpaces = this._spacesFor("value");

        count += valueSpaces.before.length;
        var value = this.stringifyProperty("value");

        if (name === "value") {
          return value ? count : -1;
        }

        count += value.length;
        count += valueSpaces.after.length;

        var insensitiveSpaces = this._spacesFor("insensitive");

        count += insensitiveSpaces.before.length;

        if (name === "insensitive") {
          return this.insensitive ? count : -1;
        }

        return -1;
      };

      _proto.toString = function toString() {
        var _this2 = this;

        var selector = [this.rawSpaceBefore, '['];
        selector.push(this._stringFor('qualifiedAttribute', 'attribute'));

        if (this.operator && (this.value || this.value === '')) {
          selector.push(this._stringFor('operator'));
          selector.push(this._stringFor('value'));
          selector.push(this._stringFor('insensitiveFlag', 'insensitive', function (attrValue, attrSpaces) {
            if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
              attrSpaces.before = " ";
            }

            return defaultAttrConcat(attrValue, attrSpaces);
          }));
        }

        selector.push(']');
        selector.push(this.rawSpaceAfter);
        return selector.join('');
      };

      _createClass(Attribute, [{
        key: "quoted",
        get: function get() {
          var qm = this.quoteMark;
          return qm === "'" || qm === '"';
        },
        set: function set(value) {
          warnOfDeprecatedQuotedAssignment();
        }
        /**
         * returns a single (`'`) or double (`"`) quote character if the value is quoted.
         * returns `null` if the value is not quoted.
         * returns `undefined` if the quotation state is unknown (this can happen when
         * the attribute is constructed without specifying a quote mark.)
         */

      }, {
        key: "quoteMark",
        get: function get() {
          return this._quoteMark;
        }
        /**
         * Set the quote mark to be used by this attribute's value.
         * If the quote mark changes, the raw (escaped) value at `attr.raws.value` of the attribute
         * value is updated accordingly.
         *
         * @param {"'" | '"' | null} quoteMark The quote mark or `null` if the value should be unquoted.
         */
        ,
        set: function set(quoteMark) {
          if (!this._constructed) {
            this._quoteMark = quoteMark;
            return;
          }

          if (this._quoteMark !== quoteMark) {
            this._quoteMark = quoteMark;

            this._syncRawValue();
          }
        }
      }, {
        key: "qualifiedAttribute",
        get: function get() {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        }
      }, {
        key: "insensitiveFlag",
        get: function get() {
          return this.insensitive ? 'i' : '';
        }
      }, {
        key: "value",
        get: function get() {
          return this._value;
        }
        /**
         * Before 3.0, the value had to be set to an escaped value including any wrapped
         * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
         * is unescaped during parsing and any quote marks are removed.
         *
         * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
         * a deprecation warning is raised when the new value contains any characters that would
         * require escaping (including if it contains wrapped quotes).
         *
         * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
         * how the new value is quoted.
         */
        ,
        set: function set(v) {
          if (this._constructed) {
            var _unescapeValue2 = unescapeValue(v),
                deprecatedUsage = _unescapeValue2.deprecatedUsage,
                unescaped = _unescapeValue2.unescaped,
                quoteMark = _unescapeValue2.quoteMark;

            if (deprecatedUsage) {
              warnOfDeprecatedValueAssignment();
            }

            if (unescaped === this._value && quoteMark === this._quoteMark) {
              return;
            }

            this._value = unescaped;
            this._quoteMark = quoteMark;

            this._syncRawValue();
          } else {
            this._value = v;
          }
        }
      }, {
        key: "attribute",
        get: function get() {
          return this._attribute;
        },
        set: function set(name) {
          this._handleEscapes("attribute", name);

          this._attribute = name;
        }
      }]);

      return Attribute;
    }(_namespace.default);

    exports.default = Attribute;
    Attribute.NO_QUOTE = null;
    Attribute.SINGLE_QUOTE = "'";
    Attribute.DOUBLE_QUOTE = '"';
    var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
      "'": {
        quotes: 'single',
        wrap: true
      },
      '"': {
        quotes: 'double',
        wrap: true
      }
    }, _CSSESC_QUOTE_OPTIONS[null] = {
      isIdentifier: true
    }, _CSSESC_QUOTE_OPTIONS);

    function defaultAttrConcat(attrValue, attrSpaces) {
      return "" + attrSpaces.before + attrValue + attrSpaces.after;
    }
    });

    var universal = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _namespace = _interopRequireDefault(namespace);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Universal =
    /*#__PURE__*/
    function (_Namespace) {
      _inheritsLoose(Universal, _Namespace);

      function Universal(opts) {
        var _this;

        _this = _Namespace.call(this, opts) || this;
        _this.type = types.UNIVERSAL;
        _this.value = '*';
        return _this;
      }

      return Universal;
    }(_namespace.default);

    exports.default = Universal;
    module.exports = exports.default;
    });

    var combinator = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _node = _interopRequireDefault(node);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Combinator =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(Combinator, _Node);

      function Combinator(opts) {
        var _this;

        _this = _Node.call(this, opts) || this;
        _this.type = types.COMBINATOR;
        return _this;
      }

      return Combinator;
    }(_node.default);

    exports.default = Combinator;
    module.exports = exports.default;
    });

    var nesting = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _node = _interopRequireDefault(node);



    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var Nesting =
    /*#__PURE__*/
    function (_Node) {
      _inheritsLoose(Nesting, _Node);

      function Nesting(opts) {
        var _this;

        _this = _Node.call(this, opts) || this;
        _this.type = types.NESTING;
        _this.value = '&';
        return _this;
      }

      return Nesting;
    }(_node.default);

    exports.default = Nesting;
    module.exports = exports.default;
    });

    var sortAscending_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = sortAscending;

    function sortAscending(list) {
      return list.sort(function (a, b) {
        return a - b;
      });
    }
    module.exports = exports.default;
    });

    var tokenTypes = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.combinator = exports.word = exports.comment = exports.str = exports.tab = exports.newline = exports.feed = exports.cr = exports.backslash = exports.bang = exports.slash = exports.doubleQuote = exports.singleQuote = exports.space = exports.greaterThan = exports.pipe = exports.equals = exports.plus = exports.caret = exports.tilde = exports.dollar = exports.closeSquare = exports.openSquare = exports.closeParenthesis = exports.openParenthesis = exports.semicolon = exports.colon = exports.comma = exports.at = exports.asterisk = exports.ampersand = void 0;
    var ampersand = 38; // `&`.charCodeAt(0);

    exports.ampersand = ampersand;
    var asterisk = 42; // `*`.charCodeAt(0);

    exports.asterisk = asterisk;
    var at = 64; // `@`.charCodeAt(0);

    exports.at = at;
    var comma = 44; // `,`.charCodeAt(0);

    exports.comma = comma;
    var colon = 58; // `:`.charCodeAt(0);

    exports.colon = colon;
    var semicolon = 59; // `;`.charCodeAt(0);

    exports.semicolon = semicolon;
    var openParenthesis = 40; // `(`.charCodeAt(0);

    exports.openParenthesis = openParenthesis;
    var closeParenthesis = 41; // `)`.charCodeAt(0);

    exports.closeParenthesis = closeParenthesis;
    var openSquare = 91; // `[`.charCodeAt(0);

    exports.openSquare = openSquare;
    var closeSquare = 93; // `]`.charCodeAt(0);

    exports.closeSquare = closeSquare;
    var dollar = 36; // `$`.charCodeAt(0);

    exports.dollar = dollar;
    var tilde = 126; // `~`.charCodeAt(0);

    exports.tilde = tilde;
    var caret = 94; // `^`.charCodeAt(0);

    exports.caret = caret;
    var plus = 43; // `+`.charCodeAt(0);

    exports.plus = plus;
    var equals = 61; // `=`.charCodeAt(0);

    exports.equals = equals;
    var pipe = 124; // `|`.charCodeAt(0);

    exports.pipe = pipe;
    var greaterThan = 62; // `>`.charCodeAt(0);

    exports.greaterThan = greaterThan;
    var space = 32; // ` `.charCodeAt(0);

    exports.space = space;
    var singleQuote = 39; // `'`.charCodeAt(0);

    exports.singleQuote = singleQuote;
    var doubleQuote = 34; // `"`.charCodeAt(0);

    exports.doubleQuote = doubleQuote;
    var slash = 47; // `/`.charCodeAt(0);

    exports.slash = slash;
    var bang = 33; // `!`.charCodeAt(0);

    exports.bang = bang;
    var backslash = 92; // '\\'.charCodeAt(0);

    exports.backslash = backslash;
    var cr = 13; // '\r'.charCodeAt(0);

    exports.cr = cr;
    var feed = 12; // '\f'.charCodeAt(0);

    exports.feed = feed;
    var newline = 10; // '\n'.charCodeAt(0);

    exports.newline = newline;
    var tab = 9; // '\t'.charCodeAt(0);
    // Expose aliases primarily for readability.

    exports.tab = tab;
    var str = singleQuote; // No good single character representation!

    exports.str = str;
    var comment = -1;
    exports.comment = comment;
    var word = -2;
    exports.word = word;
    var combinator = -3;
    exports.combinator = combinator;
    });

    var tokenize_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = tokenize;
    exports.FIELDS = void 0;

    var t = _interopRequireWildcard(tokenTypes);

    var _unescapable, _wordDelimiters;

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

    var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
    var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
    var hex = {};
    var hexChars = "0123456789abcdefABCDEF";

    for (var i = 0; i < hexChars.length; i++) {
      hex[hexChars.charCodeAt(i)] = true;
    }
    /**
     *  Returns the last index of the bar css word
     * @param {string} css The string in which the word begins
     * @param {number} start The index into the string where word's first letter occurs
     */


    function consumeWord(css, start) {
      var next = start;
      var code;

      do {
        code = css.charCodeAt(next);

        if (wordDelimiters[code]) {
          return next - 1;
        } else if (code === t.backslash) {
          next = consumeEscape(css, next) + 1;
        } else {
          // All other characters are part of the word
          next++;
        }
      } while (next < css.length);

      return next - 1;
    }
    /**
     *  Returns the last index of the escape sequence
     * @param {string} css The string in which the sequence begins
     * @param {number} start The index into the string where escape character (`\`) occurs.
     */


    function consumeEscape(css, start) {
      var next = start;
      var code = css.charCodeAt(next + 1);

      if (unescapable[code]) ; else if (hex[code]) {
        var hexDigits = 0; // consume up to 6 hex chars

        do {
          next++;
          hexDigits++;
          code = css.charCodeAt(next + 1);
        } while (hex[code] && hexDigits < 6); // if fewer than 6 hex chars, a trailing space ends the escape


        if (hexDigits < 6 && code === t.space) {
          next++;
        }
      } else {
        // the next char is part of the current word
        next++;
      }

      return next;
    }

    var FIELDS = {
      TYPE: 0,
      START_LINE: 1,
      START_COL: 2,
      END_LINE: 3,
      END_COL: 4,
      START_POS: 5,
      END_POS: 6
    };
    exports.FIELDS = FIELDS;

    function tokenize(input) {
      var tokens = [];
      var css = input.css.valueOf();
      var _css = css,
          length = _css.length;
      var offset = -1;
      var line = 1;
      var start = 0;
      var end = 0;
      var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;

      function unclosed(what, fix) {
        if (input.safe) {
          // fyi: this is never set to true.
          css += fix;
          next = css.length - 1;
        } else {
          throw input.error('Unclosed ' + what, line, start - offset, start);
        }
      }

      while (start < length) {
        code = css.charCodeAt(start);

        if (code === t.newline) {
          offset = start;
          line += 1;
        }

        switch (code) {
          case t.space:
          case t.tab:
          case t.newline:
          case t.cr:
          case t.feed:
            next = start;

            do {
              next += 1;
              code = css.charCodeAt(next);

              if (code === t.newline) {
                offset = next;
                line += 1;
              }
            } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);

            tokenType = t.space;
            endLine = line;
            endColumn = next - offset - 1;
            end = next;
            break;

          case t.plus:
          case t.greaterThan:
          case t.tilde:
          case t.pipe:
            next = start;

            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);

            tokenType = t.combinator;
            endLine = line;
            endColumn = start - offset;
            end = next;
            break;
          // Consume these characters as single tokens.

          case t.asterisk:
          case t.ampersand:
          case t.bang:
          case t.comma:
          case t.equals:
          case t.dollar:
          case t.caret:
          case t.openSquare:
          case t.closeSquare:
          case t.colon:
          case t.semicolon:
          case t.openParenthesis:
          case t.closeParenthesis:
            next = start;
            tokenType = code;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;

          case t.singleQuote:
          case t.doubleQuote:
            quote = code === t.singleQuote ? "'" : '"';
            next = start;

            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);

              if (next === -1) {
                unclosed('quote', quote);
              }

              escapePos = next;

              while (css.charCodeAt(escapePos - 1) === t.backslash) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);

            tokenType = t.str;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;

          default:
            if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
              next = css.indexOf('*/', start + 2) + 1;

              if (next === 0) {
                unclosed('comment', '*/');
              }

              content = css.slice(start, next + 1);
              lines = content.split('\n');
              last = lines.length - 1;

              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }

              tokenType = t.comment;
              line = nextLine;
              endLine = nextLine;
              endColumn = next - nextOffset;
            } else if (code === t.slash) {
              next = start;
              tokenType = code;
              endLine = line;
              endColumn = start - offset;
              end = next + 1;
            } else {
              next = consumeWord(css, start);
              tokenType = t.word;
              endLine = line;
              endColumn = next - offset;
            }

            end = next + 1;
            break;
        } // Ensure that the token structure remains consistent


        tokens.push([tokenType, // [0] Token type
        line, // [1] Starting line
        start - offset, // [2] Starting column
        endLine, // [3] Ending line
        endColumn, // [4] Ending column
        start, // [5] Start position / Source index
        end]); // Reset offset for the next token

        if (nextOffset) {
          offset = nextOffset;
          nextOffset = null;
        }

        start = end;
      }

      return tokens;
    }
    });

    var parser = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _indexesOf = _interopRequireDefault(indexesOf);

    var _uniq = _interopRequireDefault(uniq);

    var _root = _interopRequireDefault(root);

    var _selector = _interopRequireDefault(selector);

    var _className = _interopRequireDefault(className);

    var _comment = _interopRequireDefault(comment);

    var _id = _interopRequireDefault(id);

    var _tag = _interopRequireDefault(tag);

    var _string = _interopRequireDefault(string);

    var _pseudo = _interopRequireDefault(pseudo);

    var _attribute = _interopRequireWildcard(attribute);

    var _universal = _interopRequireDefault(universal);

    var _combinator = _interopRequireDefault(combinator);

    var _nesting = _interopRequireDefault(nesting);

    var _sortAscending = _interopRequireDefault(sortAscending_1);

    var _tokenize = _interopRequireWildcard(tokenize_1);

    var tokens = _interopRequireWildcard(tokenTypes);

    var types$1 = _interopRequireWildcard(types);



    var _WHITESPACE_TOKENS, _Object$assign;

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

    var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
    var WHITESPACE_EQUIV_TOKENS = objectAssign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));

    function tokenStart(token) {
      return {
        line: token[_tokenize.FIELDS.START_LINE],
        column: token[_tokenize.FIELDS.START_COL]
      };
    }

    function tokenEnd(token) {
      return {
        line: token[_tokenize.FIELDS.END_LINE],
        column: token[_tokenize.FIELDS.END_COL]
      };
    }

    function getSource(startLine, startColumn, endLine, endColumn) {
      return {
        start: {
          line: startLine,
          column: startColumn
        },
        end: {
          line: endLine,
          column: endColumn
        }
      };
    }

    function getTokenSource(token) {
      return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
    }

    function getTokenSourceSpan(startToken, endToken) {
      if (!startToken) {
        return undefined;
      }

      return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
    }

    function unescapeProp(node, prop) {
      var value = node[prop];

      if (typeof value !== "string") {
        return;
      }

      if (value.indexOf("\\") !== -1) {
        (0, util.ensureObject)(node, 'raws');
        node[prop] = (0, util.unesc)(value);

        if (node.raws[prop] === undefined) {
          node.raws[prop] = value;
        }
      }

      return node;
    }

    var Parser =
    /*#__PURE__*/
    function () {
      function Parser(rule, options) {
        if (options === void 0) {
          options = {};
        }

        this.rule = rule;
        this.options = objectAssign({
          lossy: false,
          safe: false
        }, options);
        this.position = 0;
        this.css = typeof this.rule === 'string' ? this.rule : this.rule.selector;
        this.tokens = (0, _tokenize.default)({
          css: this.css,
          error: this._errorGenerator(),
          safe: this.options.safe
        });
        var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
        this.root = new _root.default({
          source: rootSource
        });
        this.root.errorGenerator = this._errorGenerator();
        var selector = new _selector.default({
          source: {
            start: {
              line: 1,
              column: 1
            }
          }
        });
        this.root.append(selector);
        this.current = selector;
        this.loop();
      }

      var _proto = Parser.prototype;

      _proto._errorGenerator = function _errorGenerator() {
        var _this = this;

        return function (message, errorOptions) {
          if (typeof _this.rule === 'string') {
            return new Error(message);
          }

          return _this.rule.error(message, errorOptions);
        };
      };

      _proto.attribute = function attribute() {
        var attr = [];
        var startingToken = this.currToken;
        this.position++;

        while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
          attr.push(this.currToken);
          this.position++;
        }

        if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
          return this.expected('closing square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
        }

        var len = attr.length;
        var node = {
          source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
          sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
        };

        if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) {
          return this.expected('attribute', attr[0][_tokenize.FIELDS.START_POS]);
        }

        var pos = 0;
        var spaceBefore = '';
        var commentBefore = '';
        var lastAdded = null;
        var spaceAfterMeaningfulToken = false;

        while (pos < len) {
          var token = attr[pos];
          var content = this.content(token);
          var next = attr[pos + 1];

          switch (token[_tokenize.FIELDS.TYPE]) {
            case tokens.space:
              // if (
              //     len === 1 ||
              //     pos === 0 && this.content(next) === '|'
              // ) {
              //     return this.expected('attribute', token[TOKEN.START_POS], content);
              // }
              spaceAfterMeaningfulToken = true;

              if (this.options.lossy) {
                break;
              }

              if (lastAdded) {
                (0, util.ensureObject)(node, 'spaces', lastAdded);
                var prevContent = node.spaces[lastAdded].after || '';
                node.spaces[lastAdded].after = prevContent + content;
                var existingComment = (0, util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || null;

                if (existingComment) {
                  node.raws.spaces[lastAdded].after = existingComment + content;
                }
              } else {
                spaceBefore = spaceBefore + content;
                commentBefore = commentBefore + content;
              }

              break;

            case tokens.asterisk:
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = 'operator';
              } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
                if (spaceBefore) {
                  (0, util.ensureObject)(node, 'spaces', 'attribute');
                  node.spaces.attribute.before = spaceBefore;
                  spaceBefore = '';
                }

                if (commentBefore) {
                  (0, util.ensureObject)(node, 'raws', 'spaces', 'attribute');
                  node.raws.spaces.attribute.before = spaceBefore;
                  commentBefore = '';
                }

                node.namespace = (node.namespace || "") + content;
                var rawValue = (0, util.getProp)(node, 'raws', 'namespace') || null;

                if (rawValue) {
                  node.raws.namespace += content;
                }

                lastAdded = 'namespace';
              }

              spaceAfterMeaningfulToken = false;
              break;

            case tokens.dollar:
              if (lastAdded === "value") {
                var oldRawValue = (0, util.getProp)(node, 'raws', 'value');
                node.value += "$";

                if (oldRawValue) {
                  node.raws.value = oldRawValue + "$";
                }

                break;
              }

            // Falls through

            case tokens.caret:
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = 'operator';
              }

              spaceAfterMeaningfulToken = false;
              break;

            case tokens.combinator:
              if (content === '~' && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = 'operator';
              }

              if (content !== '|') {
                spaceAfterMeaningfulToken = false;
                break;
              }

              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = 'operator';
              } else if (!node.namespace && !node.attribute) {
                node.namespace = true;
              }

              spaceAfterMeaningfulToken = false;
              break;

            case tokens.word:
              if (next && this.content(next) === '|' && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && // this look-ahead probably fails with comment nodes involved.
              !node.operator && !node.namespace) {
                node.namespace = content;
                lastAdded = 'namespace';
              } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
                if (spaceBefore) {
                  (0, util.ensureObject)(node, 'spaces', 'attribute');
                  node.spaces.attribute.before = spaceBefore;
                  spaceBefore = '';
                }

                if (commentBefore) {
                  (0, util.ensureObject)(node, 'raws', 'spaces', 'attribute');
                  node.raws.spaces.attribute.before = commentBefore;
                  commentBefore = '';
                }

                node.attribute = (node.attribute || "") + content;

                var _rawValue = (0, util.getProp)(node, 'raws', 'attribute') || null;

                if (_rawValue) {
                  node.raws.attribute += content;
                }

                lastAdded = 'attribute';
              } else if (!node.value && node.value !== "" || lastAdded === "value" && !spaceAfterMeaningfulToken) {
                var _unescaped = (0, util.unesc)(content);

                var _oldRawValue = (0, util.getProp)(node, 'raws', 'value') || '';

                var oldValue = node.value || '';
                node.value = oldValue + _unescaped;
                node.quoteMark = null;

                if (_unescaped !== content || _oldRawValue) {
                  (0, util.ensureObject)(node, 'raws');
                  node.raws.value = (_oldRawValue || oldValue) + content;
                }

                lastAdded = 'value';
              } else {
                var insensitive = content === 'i' || content === "I";

                if ((node.value || node.value === '') && (node.quoteMark || spaceAfterMeaningfulToken)) {
                  node.insensitive = insensitive;

                  if (!insensitive || content === "I") {
                    (0, util.ensureObject)(node, 'raws');
                    node.raws.insensitiveFlag = content;
                  }

                  lastAdded = 'insensitive';

                  if (spaceBefore) {
                    (0, util.ensureObject)(node, 'spaces', 'insensitive');
                    node.spaces.insensitive.before = spaceBefore;
                    spaceBefore = '';
                  }

                  if (commentBefore) {
                    (0, util.ensureObject)(node, 'raws', 'spaces', 'insensitive');
                    node.raws.spaces.insensitive.before = commentBefore;
                    commentBefore = '';
                  }
                } else if (node.value || node.value === '') {
                  lastAdded = 'value';
                  node.value += content;

                  if (node.raws.value) {
                    node.raws.value += content;
                  }
                }
              }

              spaceAfterMeaningfulToken = false;
              break;

            case tokens.str:
              if (!node.attribute || !node.operator) {
                return this.error("Expected an attribute followed by an operator preceding the string.", {
                  index: token[_tokenize.FIELDS.START_POS]
                });
              }

              var _unescapeValue = (0, _attribute.unescapeValue)(content),
                  unescaped = _unescapeValue.unescaped,
                  quoteMark = _unescapeValue.quoteMark;

              node.value = unescaped;
              node.quoteMark = quoteMark;
              lastAdded = 'value';
              (0, util.ensureObject)(node, 'raws');
              node.raws.value = content;
              spaceAfterMeaningfulToken = false;
              break;

            case tokens.equals:
              if (!node.attribute) {
                return this.expected('attribute', token[_tokenize.FIELDS.START_POS], content);
              }

              if (node.value) {
                return this.error('Unexpected "=" found; an operator was already defined.', {
                  index: token[_tokenize.FIELDS.START_POS]
                });
              }

              node.operator = node.operator ? node.operator + content : content;
              lastAdded = 'operator';
              spaceAfterMeaningfulToken = false;
              break;

            case tokens.comment:
              if (lastAdded) {
                if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === 'insensitive') {
                  var lastComment = (0, util.getProp)(node, 'spaces', lastAdded, 'after') || '';
                  var rawLastComment = (0, util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || lastComment;
                  (0, util.ensureObject)(node, 'raws', 'spaces', lastAdded);
                  node.raws.spaces[lastAdded].after = rawLastComment + content;
                } else {
                  var lastValue = node[lastAdded] || '';
                  var rawLastValue = (0, util.getProp)(node, 'raws', lastAdded) || lastValue;
                  (0, util.ensureObject)(node, 'raws');
                  node.raws[lastAdded] = rawLastValue + content;
                }
              } else {
                commentBefore = commentBefore + content;
              }

              break;

            default:
              return this.error("Unexpected \"" + content + "\" found.", {
                index: token[_tokenize.FIELDS.START_POS]
              });
          }

          pos++;
        }

        unescapeProp(node, "attribute");
        unescapeProp(node, "namespace");
        this.newNode(new _attribute.default(node));
        this.position++;
      }
      /**
       * return a node containing meaningless garbage up to (but not including) the specified token position.
       * if the token position is negative, all remaining tokens are consumed.
       *
       * This returns an array containing a single string node if all whitespace,
       * otherwise an array of comment nodes with space before and after.
       *
       * These tokens are not added to the current selector, the caller can add them or use them to amend
       * a previous node's space metadata.
       *
       * In lossy mode, this returns only comments.
       */
      ;

      _proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
        if (stopPosition < 0) {
          stopPosition = this.tokens.length;
        }

        var startPosition = this.position;
        var nodes = [];
        var space = "";
        var lastComment = undefined;

        do {
          if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
            if (!this.options.lossy) {
              space += this.content();
            }
          } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
            var spaces = {};

            if (space) {
              spaces.before = space;
              space = "";
            }

            lastComment = new _comment.default({
              value: this.content(),
              source: getTokenSource(this.currToken),
              sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
              spaces: spaces
            });
            nodes.push(lastComment);
          }
        } while (++this.position < stopPosition);

        if (space) {
          if (lastComment) {
            lastComment.spaces.after = space;
          } else if (!this.options.lossy) {
            var firstToken = this.tokens[startPosition];
            var lastToken = this.tokens[this.position - 1];
            nodes.push(new _string.default({
              value: '',
              source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
              sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
              spaces: {
                before: space,
                after: ''
              }
            }));
          }
        }

        return nodes;
      }
      /**
       * 
       * @param {*} nodes 
       */
      ;

      _proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
        var _this2 = this;

        if (requiredSpace === void 0) {
          requiredSpace = false;
        }

        var space = "";
        var rawSpace = "";
        nodes.forEach(function (n) {
          var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);

          var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);

          space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
          rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
        });

        if (rawSpace === space) {
          rawSpace = undefined;
        }

        var result = {
          space: space,
          rawSpace: rawSpace
        };
        return result;
      };

      _proto.isNamedCombinator = function isNamedCombinator(position) {
        if (position === void 0) {
          position = this.position;
        }

        return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
      };

      _proto.namedCombinator = function namedCombinator() {
        if (this.isNamedCombinator()) {
          var nameRaw = this.content(this.tokens[this.position + 1]);
          var name = (0, util.unesc)(nameRaw).toLowerCase();
          var raws = {};

          if (name !== nameRaw) {
            raws.value = "/" + nameRaw + "/";
          }

          var node = new _combinator.default({
            value: "/" + name + "/",
            source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
            sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
            raws: raws
          });
          this.position = this.position + 3;
          return node;
        } else {
          this.unexpected();
        }
      };

      _proto.combinator = function combinator() {
        var _this3 = this;

        if (this.content() === '|') {
          return this.namespace();
        } // We need to decide between a space that's a descendant combinator and meaningless whitespace at the end of a selector.


        var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);

        if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma) {
          var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);

          if (nodes.length > 0) {
            var last = this.current.last;

            if (last) {
              var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes),
                  space = _this$convertWhitespa.space,
                  rawSpace = _this$convertWhitespa.rawSpace;

              if (rawSpace !== undefined) {
                last.rawSpaceAfter += rawSpace;
              }

              last.spaces.after += space;
            } else {
              nodes.forEach(function (n) {
                return _this3.newNode(n);
              });
            }
          }

          return;
        }

        var firstToken = this.currToken;
        var spaceOrDescendantSelectorNodes = undefined;

        if (nextSigTokenPos > this.position) {
          spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
        }

        var node;

        if (this.isNamedCombinator()) {
          node = this.namedCombinator();
        } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
          node = new _combinator.default({
            value: this.content(),
            source: getTokenSource(this.currToken),
            sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
          });
          this.position++;
        } else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) ; else if (!spaceOrDescendantSelectorNodes) {
          this.unexpected();
        }

        if (node) {
          if (spaceOrDescendantSelectorNodes) {
            var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes),
                _space = _this$convertWhitespa2.space,
                _rawSpace = _this$convertWhitespa2.rawSpace;

            node.spaces.before = _space;
            node.rawSpaceBefore = _rawSpace;
          }
        } else {
          // descendant combinator
          var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true),
              _space2 = _this$convertWhitespa3.space,
              _rawSpace2 = _this$convertWhitespa3.rawSpace;

          if (!_rawSpace2) {
            _rawSpace2 = _space2;
          }

          var spaces = {};
          var raws = {
            spaces: {}
          };

          if (_space2.endsWith(' ') && _rawSpace2.endsWith(' ')) {
            spaces.before = _space2.slice(0, _space2.length - 1);
            raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
          } else if (_space2.startsWith(' ') && _rawSpace2.startsWith(' ')) {
            spaces.after = _space2.slice(1);
            raws.spaces.after = _rawSpace2.slice(1);
          } else {
            raws.value = _rawSpace2;
          }

          node = new _combinator.default({
            value: ' ',
            source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
            sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
            spaces: spaces,
            raws: raws
          });
        }

        if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
          node.spaces.after = this.optionalSpace(this.content());
          this.position++;
        }

        return this.newNode(node);
      };

      _proto.comma = function comma() {
        if (this.position === this.tokens.length - 1) {
          this.root.trailingComma = true;
          this.position++;
          return;
        }

        this.current._inferEndPosition();

        var selector = new _selector.default({
          source: {
            start: tokenStart(this.tokens[this.position + 1])
          }
        });
        this.current.parent.append(selector);
        this.current = selector;
        this.position++;
      };

      _proto.comment = function comment() {
        var current = this.currToken;
        this.newNode(new _comment.default({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };

      _proto.error = function error(message, opts) {
        throw this.root.error(message, opts);
      };

      _proto.missingBackslash = function missingBackslash() {
        return this.error('Expected a backslash preceding the semicolon.', {
          index: this.currToken[_tokenize.FIELDS.START_POS]
        });
      };

      _proto.missingParenthesis = function missingParenthesis() {
        return this.expected('opening parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
      };

      _proto.missingSquareBracket = function missingSquareBracket() {
        return this.expected('opening square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
      };

      _proto.unexpected = function unexpected() {
        return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
      };

      _proto.namespace = function namespace() {
        var before = this.prevToken && this.content(this.prevToken) || true;

        if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
          this.position++;
          return this.word(before);
        } else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
          this.position++;
          return this.universal(before);
        }
      };

      _proto.nesting = function nesting() {
        if (this.nextToken) {
          var nextContent = this.content(this.nextToken);

          if (nextContent === "|") {
            this.position++;
            return;
          }
        }

        var current = this.currToken;
        this.newNode(new _nesting.default({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };

      _proto.parentheses = function parentheses() {
        var last = this.current.last;
        var unbalanced = 1;
        this.position++;

        if (last && last.type === types$1.PSEUDO) {
          var selector = new _selector.default({
            source: {
              start: tokenStart(this.tokens[this.position - 1])
            }
          });
          var cache = this.current;
          last.append(selector);
          this.current = selector;

          while (this.position < this.tokens.length && unbalanced) {
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              unbalanced++;
            }

            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
              unbalanced--;
            }

            if (unbalanced) {
              this.parse();
            } else {
              this.current.source.end = tokenEnd(this.currToken);
              this.current.parent.source.end = tokenEnd(this.currToken);
              this.position++;
            }
          }

          this.current = cache;
        } else {
          // I think this case should be an error. It's used to implement a basic parse of media queries
          // but I don't think it's a good idea.
          var parenStart = this.currToken;
          var parenValue = "(";
          var parenEnd;

          while (this.position < this.tokens.length && unbalanced) {
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              unbalanced++;
            }

            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
              unbalanced--;
            }

            parenEnd = this.currToken;
            parenValue += this.parseParenthesisToken(this.currToken);
            this.position++;
          }

          if (last) {
            last.appendToPropertyAndEscape("value", parenValue, parenValue);
          } else {
            this.newNode(new _string.default({
              value: parenValue,
              source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
              sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
            }));
          }
        }

        if (unbalanced) {
          return this.expected('closing parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
        }
      };

      _proto.pseudo = function pseudo() {
        var _this4 = this;

        var pseudoStr = '';
        var startingToken = this.currToken;

        while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
          pseudoStr += this.content();
          this.position++;
        }

        if (!this.currToken) {
          return this.expected(['pseudo-class', 'pseudo-element'], this.position - 1);
        }

        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) {
          this.splitWord(false, function (first, length) {
            pseudoStr += first;

            _this4.newNode(new _pseudo.default({
              value: pseudoStr,
              source: getTokenSourceSpan(startingToken, _this4.currToken),
              sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
            }));

            if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              _this4.error('Misplaced parenthesis.', {
                index: _this4.nextToken[_tokenize.FIELDS.START_POS]
              });
            }
          });
        } else {
          return this.expected(['pseudo-class', 'pseudo-element'], this.currToken[_tokenize.FIELDS.START_POS]);
        }
      };

      _proto.space = function space() {
        var content = this.content(); // Handle space before and after the selector

        if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function (node) {
          return node.type === 'comment';
        })) {
          this.spaces = this.optionalSpace(content);
          this.position++;
        } else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
          this.current.last.spaces.after = this.optionalSpace(content);
          this.position++;
        } else {
          this.combinator();
        }
      };

      _proto.string = function string() {
        var current = this.currToken;
        this.newNode(new _string.default({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };

      _proto.universal = function universal(namespace) {
        var nextToken = this.nextToken;

        if (nextToken && this.content(nextToken) === '|') {
          this.position++;
          return this.namespace();
        }

        var current = this.currToken;
        this.newNode(new _universal.default({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }), namespace);
        this.position++;
      };

      _proto.splitWord = function splitWord(namespace, firstCallback) {
        var _this5 = this;

        var nextToken = this.nextToken;
        var word = this.content();

        while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
          this.position++;
          var current = this.content();
          word += current;

          if (current.lastIndexOf('\\') === current.length - 1) {
            var next = this.nextToken;

            if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
              word += this.requiredSpace(this.content(next));
              this.position++;
            }
          }

          nextToken = this.nextToken;
        }

        var hasClass = (0, _indexesOf.default)(word, '.').filter(function (i) {
          return word[i - 1] !== '\\';
        });
        var hasId = (0, _indexesOf.default)(word, '#').filter(function (i) {
          return word[i - 1] !== '\\';
        }); // Eliminate Sass interpolations from the list of id indexes

        var interpolations = (0, _indexesOf.default)(word, '#{');

        if (interpolations.length) {
          hasId = hasId.filter(function (hashIndex) {
            return !~interpolations.indexOf(hashIndex);
          });
        }

        var indices = (0, _sortAscending.default)((0, _uniq.default)([0].concat(hasClass, hasId)));
        indices.forEach(function (ind, i) {
          var index = indices[i + 1] || word.length;
          var value = word.slice(ind, index);

          if (i === 0 && firstCallback) {
            return firstCallback.call(_this5, value, indices.length);
          }

          var node;
          var current = _this5.currToken;
          var sourceIndex = current[_tokenize.FIELDS.START_POS] + indices[i];
          var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));

          if (~hasClass.indexOf(ind)) {
            var classNameOpts = {
              value: value.slice(1),
              source: source,
              sourceIndex: sourceIndex
            };
            node = new _className.default(unescapeProp(classNameOpts, "value"));
          } else if (~hasId.indexOf(ind)) {
            var idOpts = {
              value: value.slice(1),
              source: source,
              sourceIndex: sourceIndex
            };
            node = new _id.default(unescapeProp(idOpts, "value"));
          } else {
            var tagOpts = {
              value: value,
              source: source,
              sourceIndex: sourceIndex
            };
            unescapeProp(tagOpts, "value");
            node = new _tag.default(tagOpts);
          }

          _this5.newNode(node, namespace); // Ensure that the namespace is used only once


          namespace = null;
        });
        this.position++;
      };

      _proto.word = function word(namespace) {
        var nextToken = this.nextToken;

        if (nextToken && this.content(nextToken) === '|') {
          this.position++;
          return this.namespace();
        }

        return this.splitWord(namespace);
      };

      _proto.loop = function loop() {
        while (this.position < this.tokens.length) {
          this.parse(true);
        }

        this.current._inferEndPosition();

        return this.root;
      };

      _proto.parse = function parse(throwOnParenthesis) {
        switch (this.currToken[_tokenize.FIELDS.TYPE]) {
          case tokens.space:
            this.space();
            break;

          case tokens.comment:
            this.comment();
            break;

          case tokens.openParenthesis:
            this.parentheses();
            break;

          case tokens.closeParenthesis:
            if (throwOnParenthesis) {
              this.missingParenthesis();
            }

            break;

          case tokens.openSquare:
            this.attribute();
            break;

          case tokens.dollar:
          case tokens.caret:
          case tokens.equals:
          case tokens.word:
            this.word();
            break;

          case tokens.colon:
            this.pseudo();
            break;

          case tokens.comma:
            this.comma();
            break;

          case tokens.asterisk:
            this.universal();
            break;

          case tokens.ampersand:
            this.nesting();
            break;

          case tokens.slash:
          case tokens.combinator:
            this.combinator();
            break;

          case tokens.str:
            this.string();
            break;
          // These cases throw; no break needed.

          case tokens.closeSquare:
            this.missingSquareBracket();

          case tokens.semicolon:
            this.missingBackslash();

          default:
            this.unexpected();
        }
      }
      /**
       * Helpers
       */
      ;

      _proto.expected = function expected(description, index, found) {
        if (Array.isArray(description)) {
          var last = description.pop();
          description = description.join(', ') + " or " + last;
        }

        var an = /^[aeiou]/.test(description[0]) ? 'an' : 'a';

        if (!found) {
          return this.error("Expected " + an + " " + description + ".", {
            index: index
          });
        }

        return this.error("Expected " + an + " " + description + ", found \"" + found + "\" instead.", {
          index: index
        });
      };

      _proto.requiredSpace = function requiredSpace(space) {
        return this.options.lossy ? ' ' : space;
      };

      _proto.optionalSpace = function optionalSpace(space) {
        return this.options.lossy ? '' : space;
      };

      _proto.lossySpace = function lossySpace(space, required) {
        if (this.options.lossy) {
          return required ? ' ' : '';
        } else {
          return space;
        }
      };

      _proto.parseParenthesisToken = function parseParenthesisToken(token) {
        var content = this.content(token);

        if (token[_tokenize.FIELDS.TYPE] === tokens.space) {
          return this.requiredSpace(content);
        } else {
          return content;
        }
      };

      _proto.newNode = function newNode(node, namespace) {
        if (namespace) {
          if (/^ +$/.test(namespace)) {
            if (!this.options.lossy) {
              this.spaces = (this.spaces || '') + namespace;
            }

            namespace = true;
          }

          node.namespace = namespace;
          unescapeProp(node, "namespace");
        }

        if (this.spaces) {
          node.spaces.before = this.spaces;
          this.spaces = '';
        }

        return this.current.append(node);
      };

      _proto.content = function content(token) {
        if (token === void 0) {
          token = this.currToken;
        }

        return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
      };

      /**
       * returns the index of the next non-whitespace, non-comment token.
       * returns -1 if no meaningful token is found.
       */
      _proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
        if (startPosition === void 0) {
          startPosition = this.position + 1;
        }

        var searchPosition = startPosition;

        while (searchPosition < this.tokens.length) {
          if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
            searchPosition++;
            continue;
          } else {
            return searchPosition;
          }
        }

        return -1;
      };

      _createClass(Parser, [{
        key: "currToken",
        get: function get() {
          return this.tokens[this.position];
        }
      }, {
        key: "nextToken",
        get: function get() {
          return this.tokens[this.position + 1];
        }
      }, {
        key: "prevToken",
        get: function get() {
          return this.tokens[this.position - 1];
        }
      }]);

      return Parser;
    }();

    exports.default = Parser;
    module.exports = exports.default;
    });

    var processor = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _parser = _interopRequireDefault(parser);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    var Processor =
    /*#__PURE__*/
    function () {
      function Processor(func, options) {
        this.func = func || function noop() {};

        this.funcRes = null;
        this.options = options;
      }

      var _proto = Processor.prototype;

      _proto._shouldUpdateSelector = function _shouldUpdateSelector(rule, options) {
        if (options === void 0) {
          options = {};
        }

        var merged = objectAssign({}, this.options, options);

        if (merged.updateSelector === false) {
          return false;
        } else {
          return typeof rule !== "string";
        }
      };

      _proto._isLossy = function _isLossy(options) {
        if (options === void 0) {
          options = {};
        }

        var merged = objectAssign({}, this.options, options);

        if (merged.lossless === false) {
          return true;
        } else {
          return false;
        }
      };

      _proto._root = function _root(rule, options) {
        if (options === void 0) {
          options = {};
        }

        var parser = new _parser.default(rule, this._parseOptions(options));
        return parser.root;
      };

      _proto._parseOptions = function _parseOptions(options) {
        return {
          lossy: this._isLossy(options)
        };
      };

      _proto._run = function _run(rule, options) {
        var _this = this;

        if (options === void 0) {
          options = {};
        }

        return new Promise(function (resolve, reject) {
          try {
            var root = _this._root(rule, options);

            Promise.resolve(_this.func(root)).then(function (transform) {
              var string = undefined;

              if (_this._shouldUpdateSelector(rule, options)) {
                string = root.toString();
                rule.selector = string;
              }

              return {
                transform: transform,
                root: root,
                string: string
              };
            }).then(resolve, reject);
          } catch (e) {
            reject(e);
            return;
          }
        });
      };

      _proto._runSync = function _runSync(rule, options) {
        if (options === void 0) {
          options = {};
        }

        var root = this._root(rule, options);

        var transform = this.func(root);

        if (transform && typeof transform.then === "function") {
          throw new Error("Selector processor returned a promise to a synchronous call.");
        }

        var string = undefined;

        if (options.updateSelector && typeof rule !== "string") {
          string = root.toString();
          rule.selector = string;
        }

        return {
          transform: transform,
          root: root,
          string: string
        };
      }
      /**
       * Process rule into a selector AST.
       *
       * @param rule {postcss.Rule | string} The css selector to be processed
       * @param options The options for processing
       * @returns {Promise<parser.Root>} The AST of the selector after processing it.
       */
      ;

      _proto.ast = function ast(rule, options) {
        return this._run(rule, options).then(function (result) {
          return result.root;
        });
      }
      /**
       * Process rule into a selector AST synchronously.
       *
       * @param rule {postcss.Rule | string} The css selector to be processed
       * @param options The options for processing
       * @returns {parser.Root} The AST of the selector after processing it.
       */
      ;

      _proto.astSync = function astSync(rule, options) {
        return this._runSync(rule, options).root;
      }
      /**
       * Process a selector into a transformed value asynchronously
       *
       * @param rule {postcss.Rule | string} The css selector to be processed
       * @param options The options for processing
       * @returns {Promise<any>} The value returned by the processor.
       */
      ;

      _proto.transform = function transform(rule, options) {
        return this._run(rule, options).then(function (result) {
          return result.transform;
        });
      }
      /**
       * Process a selector into a transformed value synchronously.
       *
       * @param rule {postcss.Rule | string} The css selector to be processed
       * @param options The options for processing
       * @returns {any} The value returned by the processor.
       */
      ;

      _proto.transformSync = function transformSync(rule, options) {
        return this._runSync(rule, options).transform;
      }
      /**
       * Process a selector into a new selector string asynchronously.
       *
       * @param rule {postcss.Rule | string} The css selector to be processed
       * @param options The options for processing
       * @returns {string} the selector after processing.
       */
      ;

      _proto.process = function process(rule, options) {
        return this._run(rule, options).then(function (result) {
          return result.string || result.root.toString();
        });
      }
      /**
       * Process a selector into a new selector string synchronously.
       *
       * @param rule {postcss.Rule | string} The css selector to be processed
       * @param options The options for processing
       * @returns {string} the selector after processing.
       */
      ;

      _proto.processSync = function processSync(rule, options) {
        var result = this._runSync(rule, options);

        return result.string || result.root.toString();
      };

      return Processor;
    }();

    exports.default = Processor;
    module.exports = exports.default;
    });

    var constructors = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;

    var _attribute = _interopRequireDefault(attribute);

    var _className = _interopRequireDefault(className);

    var _combinator = _interopRequireDefault(combinator);

    var _comment = _interopRequireDefault(comment);

    var _id = _interopRequireDefault(id);

    var _nesting = _interopRequireDefault(nesting);

    var _pseudo = _interopRequireDefault(pseudo);

    var _root = _interopRequireDefault(root);

    var _selector = _interopRequireDefault(selector);

    var _string = _interopRequireDefault(string);

    var _tag = _interopRequireDefault(tag);

    var _universal = _interopRequireDefault(universal);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    var attribute$1 = function attribute(opts) {
      return new _attribute.default(opts);
    };

    exports.attribute = attribute$1;

    var className$1 = function className(opts) {
      return new _className.default(opts);
    };

    exports.className = className$1;

    var combinator$1 = function combinator(opts) {
      return new _combinator.default(opts);
    };

    exports.combinator = combinator$1;

    var comment$1 = function comment(opts) {
      return new _comment.default(opts);
    };

    exports.comment = comment$1;

    var id$1 = function id(opts) {
      return new _id.default(opts);
    };

    exports.id = id$1;

    var nesting$1 = function nesting(opts) {
      return new _nesting.default(opts);
    };

    exports.nesting = nesting$1;

    var pseudo$1 = function pseudo(opts) {
      return new _pseudo.default(opts);
    };

    exports.pseudo = pseudo$1;

    var root$1 = function root(opts) {
      return new _root.default(opts);
    };

    exports.root = root$1;

    var selector$1 = function selector(opts) {
      return new _selector.default(opts);
    };

    exports.selector = selector$1;

    var string$1 = function string(opts) {
      return new _string.default(opts);
    };

    exports.string = string$1;

    var tag$1 = function tag(opts) {
      return new _tag.default(opts);
    };

    exports.tag = tag$1;

    var universal$1 = function universal(opts) {
      return new _universal.default(opts);
    };

    exports.universal = universal$1;
    });

    var guards = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.isNode = isNode;
    exports.isPseudoElement = isPseudoElement;
    exports.isPseudoClass = isPseudoClass;
    exports.isContainer = isContainer;
    exports.isNamespace = isNamespace;
    exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = exports.isPseudo = exports.isNesting = exports.isIdentifier = exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;



    var _IS_TYPE;

    var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[types.ATTRIBUTE] = true, _IS_TYPE[types.CLASS] = true, _IS_TYPE[types.COMBINATOR] = true, _IS_TYPE[types.COMMENT] = true, _IS_TYPE[types.ID] = true, _IS_TYPE[types.NESTING] = true, _IS_TYPE[types.PSEUDO] = true, _IS_TYPE[types.ROOT] = true, _IS_TYPE[types.SELECTOR] = true, _IS_TYPE[types.STRING] = true, _IS_TYPE[types.TAG] = true, _IS_TYPE[types.UNIVERSAL] = true, _IS_TYPE);

    function isNode(node) {
      return typeof node === "object" && IS_TYPE[node.type];
    }

    function isNodeType(type, node) {
      return isNode(node) && node.type === type;
    }

    var isAttribute = isNodeType.bind(null, types.ATTRIBUTE);
    exports.isAttribute = isAttribute;
    var isClassName = isNodeType.bind(null, types.CLASS);
    exports.isClassName = isClassName;
    var isCombinator = isNodeType.bind(null, types.COMBINATOR);
    exports.isCombinator = isCombinator;
    var isComment = isNodeType.bind(null, types.COMMENT);
    exports.isComment = isComment;
    var isIdentifier = isNodeType.bind(null, types.ID);
    exports.isIdentifier = isIdentifier;
    var isNesting = isNodeType.bind(null, types.NESTING);
    exports.isNesting = isNesting;
    var isPseudo = isNodeType.bind(null, types.PSEUDO);
    exports.isPseudo = isPseudo;
    var isRoot = isNodeType.bind(null, types.ROOT);
    exports.isRoot = isRoot;
    var isSelector = isNodeType.bind(null, types.SELECTOR);
    exports.isSelector = isSelector;
    var isString = isNodeType.bind(null, types.STRING);
    exports.isString = isString;
    var isTag = isNodeType.bind(null, types.TAG);
    exports.isTag = isTag;
    var isUniversal = isNodeType.bind(null, types.UNIVERSAL);
    exports.isUniversal = isUniversal;

    function isPseudoElement(node) {
      return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value.toLowerCase() === ":before" || node.value.toLowerCase() === ":after");
    }

    function isPseudoClass(node) {
      return isPseudo(node) && !isPseudoElement(node);
    }

    function isContainer(node) {
      return !!(isNode(node) && node.walk);
    }

    function isNamespace(node) {
      return isAttribute(node) || isTag(node);
    }
    });

    var selectors = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    Object.keys(types).forEach(function (key) {
      if (key === "default" || key === "__esModule") { return; }
      exports[key] = types[key];
    });



    Object.keys(constructors).forEach(function (key) {
      if (key === "default" || key === "__esModule") { return; }
      exports[key] = constructors[key];
    });



    Object.keys(guards).forEach(function (key) {
      if (key === "default" || key === "__esModule") { return; }
      exports[key] = guards[key];
    });
    });

    var dist = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _processor = _interopRequireDefault(processor);

    var selectors$1 = _interopRequireWildcard(selectors);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    var parser = function parser(processor) {
      return new _processor.default(processor);
    };

    objectAssign(parser, selectors$1);
    delete parser.__esModule;
    var _default = parser;
    exports.default = _default;
    module.exports = exports.default;
    });

    var postcssSelectorParser = /*@__PURE__*/getDefaultExportFromCjs(dist);

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: BSD-3-Clause
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
     */

    // IE11 does not have Element.prototype.matches, we can use msMatchesSelector.
    // This is ignored for code coverage because we don't run code coverage in IE.
    var nativeMatches = Element.prototype.matches || /* istanbul ignore next */ Element.prototype.msMatchesSelector;

    function getChildren (node) {
      if (node.documentElement) { // document, make sure <html> is the first "child"
        return [node.documentElement]
      } else if (node.shadowRoot) { // shadow host
        return node.shadowRoot.children
      } else if (typeof node.assignedElements === 'function') { // slot
        // If the slot has assigned slottable nodes (text or elements), then it is rendering
        // those instead of the default content. Otherwise, return the default content.
        // See: https://dom.spec.whatwg.org/#concept-slotable
        return node.assignedNodes().length ? node.assignedElements() : node.children
      } else { // regular element
        return node.children
      }
    }

    var ElementIterator = function ElementIterator (context) {
      this._queue = [context];
      this.next(); // disregard the root
    };

    ElementIterator.prototype.next = function next () {
      // create the results list in depth-first order
      var node = this._queue.pop();
      if (node) {
        var children = getChildren(node);
        // In IE, children may be undefined if the `node` is the document.
        // We don't run coverage tests for IE, so it's ignored.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children#Browser_compatibility
        /* istanbul ignore else */
        if (children) {
          for (var i = children.length - 1; i >= 0; i--) {
            this._queue.push(children[i]);
          }
        }
      }
      return node
    };

    // given a list of ast nodes, find the final list and stop when hitting
    // a combinator. for instance "div span > button span strong.foo" should return "strong.foo"
    function getLastNonCombinatorNodes (nodes) {
      var results = [];
      for (var i = nodes.length - 1; i >= 0; i--) {
        var node = nodes[i];
        if (node.type === 'combinator') {
          break
        }
        results.push(node);
      }
      return results.reverse()
    }

    function getParent (element) {
      // If an element is slotted, ignore the "real" parent and use the shadow DOM parent.
      // Unless the slot is also slotted; just return the parent element in this case.
      if (typeof element.assignedElements !== 'function' && element.assignedSlot && element.assignedSlot.parentElement) {
        return element.assignedSlot.parentElement
      }
      if (element.parentElement) {
        return element.parentElement
      }
      // if an element is inside the shadow DOM, break outside of it
      var rootNode = element.getRootNode();
      /* istanbul ignore else */
      if (rootNode !== document) {
        return rootNode.host
      }
    }

    function getFirstMatchingAncestor (element, nodes) {
      var ancestor = getParent(element);
      while (ancestor) {
        if (matchesSelector(ancestor, { nodes: nodes })) {
          return ancestor
        }

        ancestor = getParent(ancestor);
      }
    }

    function getFirstMatchingPreviousSibling (element, nodes) {
      var sibling = element.previousElementSibling;
      while (sibling) {
        if (matchesSelector(sibling, { nodes: nodes })) {
          return sibling
        }
        sibling = sibling.previousElementSibling;
      }
    }

    function matchesSelector (element, ast) {
      var nodes = ast.nodes;
      for (var i = nodes.length - 1; i >= 0; i--) {
        var node = nodes[i];
        /* istanbul ignore else */
        if (node.type === 'id') {
          if (element.id !== node.value) {
            return false
          }
        } else if (node.type === 'class') {
          if (!element.classList.contains(node.value)) {
            return false
          }
        } else if (node.type === 'tag') {
          if (element.tagName.toLowerCase() !== node.value.toLowerCase()) {
            return false
          }
        } else if (node.type === 'pseudo' || node.type === 'attribute') {
          // For pseudos and attributes, just use the native element matcher.
          // `sourceCode` comes from `attachSourceIfNecessary()`
          if (!nativeMatches.call(element, node.sourceCode)) {
            return false
          }
        } else if (node.type === 'combinator') {
          /* istanbul ignore else */
          if (node.value === ' ') {
            // walk all ancestors
            var precedingNodes = getLastNonCombinatorNodes(nodes.slice(0, i));
            var ancestor = getFirstMatchingAncestor(element, precedingNodes);
            if (!ancestor) {
              return false
            } else {
              element = ancestor;
              i -= precedingNodes.length;
            }
          } else if (node.value === '>') {
            // walk immediate parent only
            var precedingNodes$1 = getLastNonCombinatorNodes(nodes.slice(0, i));
            var ancestor$1 = getParent(element);
            if (!ancestor$1 || !matchesSelector(ancestor$1, { nodes: precedingNodes$1 })) {
              return false
            } else {
              element = ancestor$1;
              i -= 1;
            }
          } else if (node.value === '+') {
            // walk immediate sibling only
            var precedingNodes$2 = getLastNonCombinatorNodes(nodes.slice(0, i));
            var sibling = element.previousElementSibling;
            if (!sibling || !matchesSelector(sibling, { nodes: precedingNodes$2 })) {
              return false
            } else {
              i -= precedingNodes$2.length;
            }
          } else if (node.value === '~') {
            // walk all previous siblings
            var precedingNodes$3 = getLastNonCombinatorNodes(nodes.slice(0, i));
            var sibling$1 = getFirstMatchingPreviousSibling(element, precedingNodes$3);
            if (!sibling$1) {
              return false
            } else {
              i -= precedingNodes$3.length;
            }
          }
        }
      }
      return true
    }

    function getMatchingElements (elementIterator, ast, multiple) {
      var results = multiple ? [] : null;
      var element;
      while ((element = elementIterator.next())) {
        for (var i = 0, list = ast.nodes; i < list.length; i += 1) { // comma-separated selectors, e.g. .foo, .bar
          var node = list[i];

          if (matchesSelector(element, node)) {
            if (multiple) {
              results.push(element);
            } else {
              return element
            }
          }
        }
      }
      return results
    }

    function getMatchingElementsByTagName (elementIterator, tagName) {
      var results = [];
      var element;
      var tagNameAsLowerCase = tagName.toLowerCase();
      while ((element = elementIterator.next())) {
        if (tagName === '*' || tagNameAsLowerCase === element.tagName.toLowerCase()) {
          results.push(element);
        }
      }
      return results
    }

    function getMatchingElementsByName (elementIterator, name) {
      var results = [];
      var element;
      while ((element = elementIterator.next())) {
        if (element.name === name) {
          results.push(element);
        }
      }
      return results
    }

    /**
     * https://dom.spec.whatwg.org/#concept-getelementsbytagnamens
     */
    function getMatchingElementsByTagNameNS (elementIterator, namespaceURI, tagName) {
      var results = [];
      // exit early if null, empty string or undefined is provided
      // these will not match the element namespace
      if (!namespaceURI) {
        return results
      }
      var element;

      while ((element = elementIterator.next())) {
        // we'll do a case insensitive match to find out where the tag name is
        var outerHTMLAsUppercase = element.outerHTML.toUpperCase();
        // we are not not guaranteed to have an uppercase element.tagName, eg: svg elements
        var index = outerHTMLAsUppercase.indexOf(element.tagName.toUpperCase());
        // now we can get the original, non-uppercased tag name
        var originalTagName = element.outerHTML.substr(index, element.tagName.length);
        // tagName supports a wildcard parameter
        var tagMatches = tagName === originalTagName || tagName === '*';
        // namespace supports a wildcard parameter
        var namespaceMatches = element.namespaceURI === namespaceURI || namespaceURI === '*';
        if (tagMatches && namespaceMatches) {
          results.push(element);
        }
      }
      return results
    }

    function getMatchingElementsByClassName (elementIterator, classNames) {
      var results = [];
      var element;

      var loop = function () {
        var elementClassList = element.classList;
        var contains = classNames.every(function (className) {
          return elementClassList.contains(className)
        });
        if (contains) {
          results.push(element);
        }
      };

      while ((element = elementIterator.next())) loop();
      return results
    }

    function getMatchingElementById (elementIterator, id) {
      var element;
      while ((element = elementIterator.next())) {
        if (element.id === id) {
          return element
        }
      }

      return null
    }

    // For convenience, attach the source to all pseudo selectors.
    // We need this later, and it's easier than passing the selector into every function.
    function attachSourceIfNecessary (ref, selector) {
      var nodes = ref.nodes;

      for (var i$1 = 0, list = nodes; i$1 < list.length; i$1 += 1) {
        var node = list[i$1];

        if (node.type === 'pseudo' || node.type === 'attribute') {
          var splitSelector = selector.split('\n');
          var ref$1 = node.source;
          var start = ref$1.start;
          var end = ref$1.end;
          var sourceCode = '';
          for (var i = start.line - 1; i < end.line; i++) {
            var line = splitSelector[i];
            var stringStart = i === start.line - 1 ? start.column : 0;
            var stringEnd = i === end.line - 1 ? end.column : line.length;
            sourceCode += line.substring(stringStart, stringEnd);
          }
          node.sourceCode = (node.type === 'pseudo' ? ':' : '[') + sourceCode;
        }
        if (node.nodes) {
          attachSourceIfNecessary(node, selector);
        }
      }
    }

    function assertIsDocumentOrShadowRoot (context) {
      if (context.nodeType !== 11 && context.nodeType !== 9) {
        throw new TypeError('Provided context must be of type Document or ShadowRoot')
      }
    }

    function assertIsElement (element) {
      if (!element || element.nodeType !== 1) {
        throw new TypeError('Provided context must be of type Element')
      }
    }

    function parse (selector) {
      var ast = postcssSelectorParser().astSync(selector);
      attachSourceIfNecessary(ast, selector);
      return ast
    }

    function query (selector, context, multiple) {
      var ast = parse(selector);

      var elementIterator = new ElementIterator(context);
      return getMatchingElements(elementIterator, ast, multiple)
    }

    function getElementsByTagName (tagName, context) {
      if ( context === void 0 ) context = document;

      var elementIterator = new ElementIterator(context);
      return getMatchingElementsByTagName(elementIterator, tagName)
    }

    function getElementsByTagNameNS (namespaceURI, tagName, context) {
      if ( context === void 0 ) context = document;

      var elementIterator = new ElementIterator(context);
      return getMatchingElementsByTagNameNS(elementIterator, namespaceURI, tagName)
    }

    function querySelector (selector, context) {
      if ( context === void 0 ) context = document;

      return query(selector, context, false)
    }

    function querySelectorAll (selector, context) {
      if ( context === void 0 ) context = document;

      return query(selector, context, true)
    }

    function getElementsByClassName (classNames, context) {
      if ( context === void 0 ) context = document;

      var elementIterator = new ElementIterator(context);
      var classNamesSplit = classNames.trim().split(/\s+/);
      return getMatchingElementsByClassName(elementIterator, classNamesSplit)
    }

    function getElementById (id, context) {
      if ( context === void 0 ) context = document;

      assertIsDocumentOrShadowRoot(context);
      var elementIterator = new ElementIterator(context);
      return getMatchingElementById(elementIterator, id)
    }

    function getElementsByName (name, context) {
      if ( context === void 0 ) context = document;

      assertIsDocumentOrShadowRoot(context);
      var elementIterator = new ElementIterator(context);
      return getMatchingElementsByName(elementIterator, name)
    }

    function matches (selector, element) {
      assertIsElement(element);
      var ast = parse(selector);

      for (var i = 0, list = ast.nodes; i < list.length; i += 1) { // comma-separated selectors, e.g. .foo, .bar
        var node = list[i];

        if (matchesSelector(element, node)) {
          return true
        }
      }
      return false
    }

    function closest (selector, element) {
      var ast = parse(selector);

      for (var i = 0, list = ast.nodes; i < list.length; i += 1) { // comma-separated selectors, e.g. .foo, .bar
        var node = list[i];

        if (matchesSelector(element, node)) {
          return element
        }

        var matchingAncestor = getFirstMatchingAncestor(element, node.nodes);
        if (matchingAncestor) {
          return matchingAncestor
        }
      }
      return null
    }

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const assignedSlotGetter = getOwnPropertyDescriptor(Element.prototype, 'assignedSlot').get;
    const fragmentChildrenGetter = getOwnPropertyDescriptor(DocumentFragment.prototype, 'children').get;
    function getFilteredChildren(elm) {
        if (isSlotElement(elm)) {
            return elm.assignedElements({ flatten: true });
        }
        else if (isHostElement(elm)) {
            return arrayFromCollection(fragmentChildrenGetter.call(getShadowRootFromHostElement(elm)));
        }
        return arrayFromCollection(childrenGetter.call(elm));
    }
    // Deep-traversing patches from this point on:
    // The following patched methods surfaces shadowed elements in global
    // traversing mechanisms.
    const querySelectorDistortion$1 = function querySelector$1(selectors) {
        return querySelector(selectors, this);
    };
    const querySelectorAllDistortion$1 = function querySelectorAll$1(selectors) {
        const elements = querySelectorAll(selectors, this);
        return createStaticNodeList(elements);
    };
    const getElementsByClassNameDistortion = function getElementsByClassName$1(classNames) {
        const elements = getElementsByClassName(classNames, this);
        return createStaticNodeList(elements);
    };
    const getElementsByTagNameDistortion = function getElementsByTagName$1(tagName) {
        const elements = getElementsByTagName(tagName, this);
        return createStaticNodeList(elements);
    };
    const getElementsByTagNameNSDistortion = function getElementsByTagNameNS$1(namespaceURI, tagName) {
        const elements = getElementsByTagNameNS(namespaceURI, tagName, this);
        return createStaticNodeList(elements);
    };
    const matchesDistortion = function matches$1(selector) {
        return matches(selector, this);
    };
    const closestDistortion = function closest$1(selector) {
        return closest(selector, this);
    };
    // Non-deep-traversing patches: this descriptor map includes all descriptors that
    // do not have access to nodes beyond the immediate children.
    const innerHTMLDistortion = function innerHTML() {
        return getInnerHTML(this);
    };
    const outerHTMLDistortion = function outerHTML() {
        return getOuterHTML(this);
    };
    const shadowRootDistortion = function shadowRoot() {
        // you should not see any shadowRoot ever in this virtualization mode
        return null;
    };
    const childrenDistortion = function children() {
        return createStaticHTMLCollection(getFilteredChildren(this));
    };
    const childElementCountDistortion = function childElementCount() {
        return getFilteredChildren(this).length;
    };
    const firstElementChildDistortion = function firstElementChild() {
        return getFilteredChildren(this)[0];
    };
    const lastElementChildDistortion = function lastElementChild() {
        const elements = getFilteredChildren(this);
        return elements[elements.length - 1];
    };
    const assignedSlotDistortion = function assignedSlot() {
        // you should now see any slotting ever in this virtualization mode
        return null;
    };
    var ElementDistortions = MapCreate([
        [innerHTMLGetter, innerHTMLDistortion],
        [outerHTMLGetter, outerHTMLDistortion],
        [shadowRootGetter, shadowRootDistortion],
        [childrenGetter, childrenDistortion],
        [childElementCountGetter, childElementCountDistortion],
        [firstElementChildGetter, firstElementChildDistortion],
        [lastElementChildGetter, lastElementChildDistortion],
        [assignedSlotGetter, assignedSlotDistortion],
        [querySelector$2, querySelectorDistortion$1],
        [querySelectorAll$2, querySelectorAllDistortion$1],
        [getElementsByClassName$2, getElementsByClassNameDistortion],
        [getElementsByTagName$2, getElementsByTagNameDistortion],
        [getElementsByTagNameNS$2, getElementsByTagNameNSDistortion],
        [matches$1, matchesDistortion],
        [closest$1, closestDistortion],
    ]);
    // Main Window Patches
    const { attachShadow: originalAttachShadow } = Element.prototype;
    // the role of this callback is to simply capture important events
    // from `getObservedEventNames()` before they cross the first shadow boundary
    // to capture the original event's metadata in case the event is observed
    // from inside the oasis' realm.
    function trackShadowEvent(e) {
        extractEventMetadata(e);
    }
    const attachShadowPatched = function attachShadow(options) {
        const sr = originalAttachShadow.call(this, options);
        // observed events needs to be captured for flattening them
        getObservedEventNames().forEach((name) => addEventListener.call(sr, name, trackShadowEvent));
        return sr;
    };
    defineProperty(Element.prototype, 'attachShadow', {
        value: attachShadowPatched,
        enumerable: true,
        writable: true,
        configurable: true,
    });
    function getDocumentChildrenWithShadows() {
        // It is fine... it is slow... but this only should happen
        // few times, again, it is fine!
        return Array.from(document.querySelectorAll(`*`)).filter((elm) => isHostElement(elm));
    }
    // returns all the active host elements with a shadow root
    // attached to them
    function getAllActiveHostElements() {
        const map = new Map();
        let currentSegment = getDocumentChildrenWithShadows();
        while (currentSegment.length > 0) {
            const elm = currentSegment.shift();
            // there is a possibility that with synthetic shadow we get some duplicate entries here,
            // we can simply about duplicates by checking the already defined map.
            if (!map.has(elm)) {
                const sr = getShadowRootFromHostElement(elm);
                if (sr) {
                    map.set(elm, sr);
                    const newSegment = Array.from(sr.querySelectorAll(`*`)).filter((elm) => isHostElement(elm));
                    currentSegment = currentSegment.concat(newSegment);
                }
            }
        }
        return map;
    }
    const observedEventNames = create(null);
    function getObservedEventNames() {
        return Reflect.ownKeys(observedEventNames);
    }
    function addKnownEventName(name) {
        if (observedEventNames[name]) {
            return;
        }
        observedEventNames[name] = 1;
        getAllActiveHostElements().forEach((sr) => {
            addEventListener.call(sr, name, trackShadowEvent);
        });
    }

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const activeElementOriginal = getOwnPropertyDescriptor(Document.prototype, 'activeElement').get;
    const activeElementDistortion = function () {
        let activeElement = activeElementOriginal.call(this);
        while (activeElement) {
            const sr = getShadowRootFromHostElement(activeElement);
            if (!sr) {
                return activeElement;
            }
            activeElement = sr.activeElement; // it is safe to use the dot notation here
        }
        return activeElement;
    };
    const getElementByIdDistortion = function getElementById$1(id) {
        return getElementById(id, this);
    };
    const getElementsByNameDistortion = function getElementsByName$1(name) {
        return getElementsByName(name, this);
    };
    const querySelectorDistortion = function querySelector$1(selectors) {
        return querySelector(selectors, this);
    };
    const querySelectorAllDistortion = function getElementsByName(selectors) {
        return querySelectorAll(selectors, this);
    };
    var DocumentDistortions = MapCreate([
        [activeElementOriginal, activeElementDistortion],
        [getElementById$1, getElementByIdDistortion],
        [getElementsByName$1, getElementsByNameDistortion],
        [querySelector$1, querySelectorDistortion],
        [querySelectorAll$1, querySelectorAllDistortion],
    ]);

    /*
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const lengthGetterOriginal = getOwnPropertyDescriptor(window, 'length').get;
    function lengthGetterDistortion() {
        return window.length;
    }
    function isWindow(value) {
        if (typeof value === 'object' &&
            value !== null &&
            value.window === value) {
            // Slower check that must certainly detect a window object.
            try {
                // window.self getter only works for a window object, otherwise it
                // throws, additionally, this works fine for a detached window as
                // well, which is important since it will guarantee that this check
                // works also for iframes that are disconnected, and could be connected
                // later on, that should not bypass this check. This check is is also
                // equivalent to window.frames, and here is the very simple spec for
                // this getter:
                // https://html.spec.whatwg.org/multipage/window-object.html#dom-self
                Reflect.apply(lengthGetterOriginal, value, []);
                return true;
                // eslint-disable-next-line no-empty
            }
            catch (_a) { }
        }
        return false;
    }
    // The rules for this proxy are as follows:
    //
    // If the key is a string...
    //      ...And the key is a valid index that matches an existing
    //      index in the frame list or matches the value of a name
    //      property of a frame in the frame list, then return the
    //      appropriate frame from the frame list.
    //
    //      ...Or the key's value is "length", then return the number of
    //      frames in the in the frame list.
    //  Else,
    //      ...Return the value of the key from the shadow target
    class BaseFrameHandler {
        defineProperty(_target, _key, _descriptor) {
            return true;
        }
        deleteProperty(_target, _key) {
            return true;
        }
        getOwnPropertyDescriptor(_target, _key) {
            return undefined;
        }
        isExtensible(_target) {
            return true;
        }
        ownKeys(_target) {
            return [];
        }
        preventExtensions(_target) {
            return true;
        }
        set(_target, _key, _value, _receiver) {
            return true;
        }
        setPrototypeOf(_target) {
            return false;
        }
    }
    Reflect.setPrototypeOf(BaseFrameHandler.prototype, null);
    class ShadowFramesPrototypeHandler extends BaseFrameHandler {
    }
    const framesGetterOriginal = getOwnPropertyDescriptor(window, 'frames').get;
    const createFramesProxy = () => {
        const WindowPrototype = Reflect.getPrototypeOf(window);
        const WindowProperties = Reflect.getPrototypeOf(WindowPrototype);
        // Wrap `lengthGetterOriginal` in bound function to obscure the getter
        // source as "[native code]".
        const framesLengthGetter = lengthGetterOriginal === null || lengthGetterOriginal === void 0 ? void 0 : lengthGetterOriginal.bind(window);
        // Wrap `noop` in bound function to obscure the setter source as
        // "[native code]".
        const framesLengthSetter = (function length() { }).bind(window);
        const getFrameByIndexKey = (key) => {
            const possibleIndex = typeof key === 'string' ? +key : -1;
            if (possibleIndex > -1 &&
                Number.isInteger(possibleIndex) &&
                possibleIndex < Reflect.apply(lengthGetterOriginal, window, [])) {
                const value = window.hasOwnProperty(key) && window[key];
                // istanbul ignore else: needs default platform behavior test
                if (isWindow(value)) {
                    return value;
                }
            }
            return undefined;
        };
        const getFrameByNameKey = (key) => {
            if (typeof key === 'string' &&
                // Don't shadow properties on the global object...
                !window.hasOwnProperty(key) &&
                // ...Or its prototype.
                !WindowPrototype.hasOwnProperty(key)) {
                const value = WindowProperties.hasOwnProperty(key) && WindowProperties[key];
                if (isWindow(value)) {
                    return value;
                }
            }
            return undefined;
        };
        const getValueByKey = (key) => key === 'length'
            ? Reflect.apply(lengthGetterOriginal, window, [])
            : getFrameByIndexKey(key);
        class ShadowFrameHandler extends BaseFrameHandler {
            get(target, key, receiver) {
                const value = getValueByKey(key);
                return value === undefined
                    ? // window.frames.foo when iframe.name is 'foo'
                        Reflect.get(target, key, receiver)
                    : // window.frames.length
                        // window.frames[n]
                        // window.frames['n']
                        value;
            }
            getOwnPropertyDescriptor(_target, key) {
                if (key === 'length') {
                    return {
                        __proto__: null,
                        configurable: true,
                        enumerable: true,
                        get: framesLengthGetter,
                        set: framesLengthSetter,
                    };
                }
                const value = getFrameByIndexKey(key);
                if (value) {
                    return {
                        __proto__: null,
                        configurable: true,
                        enumerable: true,
                        value,
                        writable: false,
                    };
                }
                return undefined;
            }
            // istanbul ignore next: suspicious gap, currently unreachable via tests
            has(target, key) {
                return Reflect.has(target, key) || getValueByKey(key) !== undefined;
            }
            ownKeys() {
                const { length } = window;
                const keys = new Array(length + 1);
                for (let i = 0; i < length; i += 1) {
                    keys[i] = `${i}`;
                }
                keys[length] = 'length';
                return keys;
            }
        }
        class ShadowWindowPropertiesHandler extends ShadowFramesPrototypeHandler {
            get(target, key, receiver) {
                const value = getFrameByNameKey(key);
                return value === undefined
                    ? // window.frames.foo when iframe.name is 'foo'
                        Reflect.get(target, key, receiver)
                    : /* istanbul ignore next: needs default platform behavior test */ value;
            }
            getOwnPropertyDescriptor(_target, key) {
                const value = getFrameByNameKey(key);
                if (value === undefined) {
                    return value;
                }
                return {
                    __proto__: null,
                    configurable: true,
                    enumerable: true,
                    value,
                    writable: false,
                };
            }
            // istanbul ignore next: suspicious gap, currently unreachable via tests
            has(target, key) {
                return Reflect.has(target, key) || getFrameByNameKey(key) !== undefined;
            }
            ownKeys() {
                const keys = [];
                let keysOffset = 0;
                const unsafeDescs = getOwnPropertyDescriptors(WindowProperties);
                Reflect.setPrototypeOf(unsafeDescs, null);
                for (const key in unsafeDescs) {
                    // istanbul ignore next: currently unreachable via tests, may indicate a dead code path
                    if (typeof key === 'string') {
                        const unsafeDesc = unsafeDescs[key];
                        if (unsafeDesc.hasOwnProperty('value') && isWindow(unsafeDesc.value)) {
                            keys[keysOffset++] = key;
                        }
                    }
                }
                return keys;
            }
        }
        // In order to preserve window.frames === window.frames, create a
        // shadow target object, to be used with the proxy object that is
        // returned by accesses to window.frames.
        const shadowFrames = {};
        const shadowFramesPrototype = {};
        const shadowWindowProperties = {};
        const shadowFramesHandler = new ShadowFrameHandler();
        const shadowFramesPrototypeHandler = new ShadowFramesPrototypeHandler();
        const shadowWindowPropertiesHandler = new ShadowWindowPropertiesHandler();
        const framesPrototypeProxy = new Proxy(shadowFramesPrototype, shadowFramesPrototypeHandler);
        const windowPropertiesProxy = new Proxy(shadowWindowProperties, shadowWindowPropertiesHandler);
        Reflect.setPrototypeOf(shadowFrames, framesPrototypeProxy);
        Reflect.setPrototypeOf(shadowFramesPrototype, windowPropertiesProxy);
        return new Proxy(shadowFrames, shadowFramesHandler);
    };
    let framesProxy;
    const framesGetterDistortion = function frames() {
        if (framesProxy === undefined) {
            framesProxy = createFramesProxy();
        }
        return framesProxy;
    };
    var WindowDistortions = MapCreate([
        [lengthGetterOriginal, lengthGetterDistortion],
        [framesGetterOriginal, framesGetterDistortion],
    ]);

    /*
     * Copyright (c) 2020, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const { addEventListener: addEventListenerOriginal, dispatchEvent: dispatchEventOriginal } = EventTarget.prototype;
    const addEventListenerDistortion = function addEventListener(...args) {
        // track the event name that libs in oasis will be listening for
        // in order to flatten those events before re-targeting
        const [name] = args;
        addKnownEventName(name);
        return addEventListenerOriginal.apply(this, args);
    };
    var EventTargetDistortions = MapCreate([[addEventListenerOriginal, addEventListenerDistortion]]);

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: BSD-3-Clause
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
     */
    // local caches
    const { createElement } = document;
    const { prepend: originalPrepend, append: originalAppend, appendChild: originalAppendChild, insertBefore: originalInsertBefore, setAttribute: originalSetAttribute, } = Element.prototype;
    const documentBodyGetter = Reflect.getOwnPropertyDescriptor(Document.prototype, 'body').get;
    function defineExportedGlobal(name, descriptor) {
        Reflect.defineProperty(window, name, descriptor);
    }
    function getImportedGlobal(name) {
        return window[name];
    }
    // TODO: make sure that these are only accessible when doing controlled evaluations
    const endowments = {
        $oasisExternalDefineProperty$: {
            value: defineExportedGlobal,
        },
        $oasisExternalGetProperty$: {
            value: getImportedGlobal,
        },
    };
    function isScriptElement(node) {
        return node instanceof HTMLScriptElement;
    }
    const patchedAppendChild = function appendChild(...args) {
        const [child] = args;
        if (isScriptElement(child)) {
            createScriptReflection(child);
            return child;
        }
        return originalAppendChild.apply(this, args);
    };
    const patchedInsertBefore = function insertBefore(...args) {
        const [child] = args;
        if (isScriptElement(child)) {
            createScriptReflection(child);
            return child;
        }
        return originalInsertBefore.apply(this, args);
    };
    const patchedAppend = function append(...args) {
        const [child] = args;
        if (!isString(child) && isScriptElement(child)) {
            createScriptReflection(child);
            return;
        }
        originalAppend.apply(this, args);
    };
    const patchedPrepend = function prepend(...args) {
        const [child] = args;
        if (!isString(child) && isScriptElement(child)) {
            createScriptReflection(child);
            return;
        }
        originalPrepend.apply(this, args);
    };
    const distortionMap = MapConcat([
        MapCreate([
            // Element & Node
            [originalAppendChild, patchedAppendChild],
            [originalInsertBefore, patchedInsertBefore],
            [originalAppend, patchedAppend],
            [originalPrepend, patchedPrepend],
            // TODO: document.* as well
        ]),
        NodeDistortions,
        TextDistortions,
        SlotDistortions,
        ElementDistortions,
        EventDistortions,
        DocumentDistortions,
        EventTargetDistortions,
        WindowDistortions,
    ]);
    const distortionCallback = (v) => {
        return distortionMap.get(v) || v;
    };
    const ve = createIframeVirtualEnvironment(window, {
        distortionCallback,
        defaultPolicy: {
            createScript: (dirty) => dirty,
        },
        endowments: endowments,
        keepAlive: true,
        signSourceCallback: (sourceText) => trusted.createScript(sourceText),
    });
    const magicIframe = document.querySelector('iframe');
    if (isNull(magicIframe)) {
        throw new Error(`Invalid Initialization`);
    }
    const magicWindow = magicIframe.contentWindow;
    const magicDocument = magicWindow.document;
    const magicBody = documentBodyGetter.call(magicDocument);
    // patching iframe.contentWindow getter to prevent access to the magic iframe
    const contentWindowDescriptor = Reflect.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');
    const originalContentWindowGetter = contentWindowDescriptor.get;
    contentWindowDescriptor.get = function contentWindow() {
        if (this === magicIframe) {
            return null;
        }
        return originalContentWindowGetter.call(this);
    };
    Reflect.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', contentWindowDescriptor);
    // patching iframe.contentDocument getter to prevent access to the magic iframe
    const contentDocumentDescriptor = Reflect.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentDocument');
    const originalContentDocumentGetter = contentDocumentDescriptor.get;
    contentDocumentDescriptor.get = function contentWindow() {
        if (this === magicIframe) {
            return null;
        }
        return originalContentDocumentGetter.call(this);
    };
    Reflect.defineProperty(HTMLIFrameElement.prototype, 'contentDocument', contentDocumentDescriptor);
    ve.evaluate(`
    // This initialization will prevent any of these APIs to be polyfilled
    // on the blue realm that can affect this sandbox.
    [
        HTMLElement.prototype,
        Element.prototype,
        Node.prototype,
        Event.prototype,
        Document.prototype,
        EventTarget.prototype,
        MutationObserver.prototype,
        HTMLCollection.prototype,
        NodeList.prototype,
        ShadowRoot.prototype,
        HTMLSlotElement.prototype,
        Text.prototype,
    ].forEach(o => delete o.$);
`);
    // remap any exported globals between the sandbox and window
    function mapExportedGlobals(names) {
        names.forEach((name) => {
            ve.evaluate(`
            'use strict';
            const key = \`${name}\`;
            $oasisExternalDefineProperty$(key, {
                get() { return window[key]; },
                enumerable: true,
                configurable: true,
            });
        `);
        });
    }
    // remap any imported globals between the sandbox and window
    function mapImportedGlobals(names) {
        names.forEach((name) => {
            ve.evaluate(`
            'use strict';
            const key = \`${name}\`;
            Object.defineProperty(window, key, {
                get() { return $oasisExternalGetProperty$(key); },
                enumerable: true,
                configurable: true,
            });
        `);
        });
    }
    function createScriptReflection(elm) {
        const { attributes, textContent: sourceText } = elm;
        const script = createElement.call(magicDocument, 'script');
        // carry over all oasis' attributes
        for (let i = 0, len = attributes.length; i < len; i += 1) {
            const attr = attributes.item(i);
            if (!isNull(attr) && attr.name.indexOf('on') !== 0) {
                originalSetAttribute.call(script, attr.name, attr.value);
            }
        }
        // force the nonce in case it get unshelved by the browser
        if (nonce !== '' && attributes.getNamedItem('nonce')) {
            originalSetAttribute.call(script, 'nonce', nonce);
        }
        // listen for any error events on the script element
        addEventListenerOriginal.call(script, 'error', (e) => {
            dispatchEventOriginal.call(elm, new ErrorEvent('error', e));
        });
        // listen for any load events on the script element
        addEventListenerOriginal.call(script, 'load', () => dispatchEventOriginal.call(elm, new Event('load')));
        // listen for CSP errors in oasis frame
        addEventListenerOriginal.call(magicDocument, 'securitypolicyviolation', (e) => {
            dispatchEventOriginal.call(elm, new SecurityPolicyViolationEvent('securitypolicyviolation', e));
        });
        // for posterity, set any inline scripts in the script tag
        // knowing that they may not run if a src attribute was set
        if (sourceText) {
            script.textContent = sourceText;
        }
        // append the script element to the magic body
        originalAppendChild.call(magicBody, script);
    }
    function normalizeGlobalNames(names) {
        if (!isNull(names) && !isUndefined(names)) {
            return names
                .split(',')
                .map((name) => name.trim())
                .filter((name) => GLOBAL_NAMES_REGEX.test(name));
        }
        return [];
    }
    function execute(elm) {
        // TODO: improve this to not use an expando, use a weakmap instead
        if (elm.evaluate)
            return; // skipping
        elm.evaluate = true;
        mapExportedGlobals(normalizeGlobalNames(elm.exportedGlobalNames));
        mapImportedGlobals(normalizeGlobalNames(elm.importedGlobalNames));
        createScriptReflection(elm);
    }
    // disallow spaces but allow anything else, including "_", "-" and "$"
    const GLOBAL_NAMES_REGEX = /^\S+$/;
    let nonce = '';
    class OasisScript extends HTMLElement {
        static get observedAttributes() {
            return ['nonce'];
        }
        constructor() {
            super();
            const slot = document.createElement('slot');
            addEventListenerOriginal.call(slot, 'slotchange', () => execute(this), {
                once: true, // we only care about the first time this receive some content
            });
            this.attachShadow({ mode: 'open' }).appendChild(slot);
        }
        get exportedGlobalNames() {
            return this.getAttribute('exported-global-names');
        }
        set exportedGlobalNames(v) {
            if (isNull(v) || isUndefined(v) || v === '') {
                this.removeAttribute('exported-global-names');
            }
            else {
                this.setAttribute('exported-global-names', v);
            }
        }
        get importedGlobalNames() {
            return this.getAttribute('imported-global-names');
        }
        set importedGlobalNames(v) {
            if (isNull(v) || isUndefined(v) || v === '') {
                this.removeAttribute('imported-global-names');
            }
            else {
                this.setAttribute('imported-global-names', v);
            }
        }
        get src() {
            var _a;
            return (_a = this.getAttribute('src')) !== null && _a !== void 0 ? _a : '';
        }
        set src(v) {
            if (isNull(v) || isUndefined(v) || v === '') {
                this.removeAttribute('src');
            }
            else {
                this.setAttribute('src', v);
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'nonce' && newValue !== '') {
                nonce = newValue;
            }
        }
        connectedCallback() {
            // always hide oasis element
            this.setAttribute('hidden', 'true');
            // Ensure that we only execute if there is a src
            // or if textContent has been set programmatically.
            const { src } = this;
            if (src && src.length) {
                execute(this);
            }
            else if (this.textContent) {
                execute(this);
            }
        }
    }
    customElements.define('x-oasis-script', OasisScript);

}));
//# sourceMappingURL=oasis.js.map
