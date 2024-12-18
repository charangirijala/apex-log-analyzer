(function() { LWR.define('force/ldsEnvironmentSettings', ['exports', 'lwc'], (function (exports, lwc) {

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
    exports.EnvironmentSettings = void 0;
    (function (EnvironmentSettings) {
      EnvironmentSettings["ForceRecordTransactionsDisabled"] = "forceRecordTransactionsDisabled";
    })(exports.EnvironmentSettings || (exports.EnvironmentSettings = {}));
    const GATE_FORCE_RECORD_TRANSACTIONS_DISABLED = '$Browser.S1Features.forceRecordTransactionsDisabled';
    const supportedEnvironmentSettings = {
      [exports.EnvironmentSettings.ForceRecordTransactionsDisabled]: GATE_FORCE_RECORD_TRANSACTIONS_DISABLED
    };
    /**
     * Returns aura configuration settings. Used to check gate/perm statuses.
     * @param name Name of the setting to check.
     * @returns Value of the setting, or undefined if $A is not available.
     */
    function getEnvironmentSetting(name) {
      if (typeof window === 'undefined') {
        // server environment i.e. SSR in LWR
        return undefined;
      }
      const environmentSetting = supportedEnvironmentSettings[name];
      if (typeof window.$A !== 'undefined' && environmentSetting !== undefined) {
        return window.$A.get(environmentSetting);
      }
      return undefined;
    }
    // version: 1.309.0-dev21-4baf03ecaf
    const __lwc_hmr_context = { moduleHash : 'd4f0a11363675c0c6d4da2ec2703ec9f' };
    if (lwc.hot) {
        lwc.hot.register('force/ldsEnvironmentSettings/ldsEnvironmentSettings.js', 'd4f0a11363675c0c6d4da2ec2703ec9f', {"name":"ldsEnvironmentSettings","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.getEnvironmentSetting = getEnvironmentSetting;

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
(function() { LWR.define('force/ldsStorage', ['exports', 'lwc', 'aura-storage'], (function (exports, lwc, auraStorage) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var auraStorage__default = /*#__PURE__*/_interopDefaultCompat(auraStorage);

    // The VERSION environment variable is replaced by rollup during the bundling and replaces it with
    // the commit hash. This avoid having a cache hit on data that has been stored by a previous
    // version of LDS.
    const STORAGE_VERSION = "4baf03ecaf";
    // AuraStorage treats `secure` as a must-have whereas `persistent` is a nice-to-have. Secure and
    // persistent storage is only possible with CryptoAdapter. Availability of that adapter is
    // controlled by the application.
    const STORAGE_CONFIG = {
      persistent: true,
      secure: true,
      maxSize: 5 * 1024 * 1024,
      clearOnInit: false,
      debugLogging: false,
      version: STORAGE_VERSION
    };
    const STORAGE_INSTANCES = [];
    function createStorage(config) {
      if (auraStorage__default.default.initStorage === undefined) {
        return null;
      }
      const storageConfig = {
        ...STORAGE_CONFIG,
        ...config
      };
      const storage = auraStorage__default.default.initStorage(storageConfig);
      if (!storage.isPersistent()) {
        if (auraStorage__default.default.deleteStorage !== undefined) {
          auraStorage__default.default.deleteStorage(storageConfig.name).catch(() => {}); // intentional noop on error
        }
        return null;
      }
      STORAGE_INSTANCES.push(storage);
      return storage;
    }
    function clearStorages() {
      return Promise.all(STORAGE_INSTANCES.map(storage => {
        return storage.clear().catch(() => {}); // intentional noop on error
      }));
    }
    // version: 1.309.0-dev21-4baf03ecaf
    const __lwc_hmr_context = { moduleHash : 'bded79b76db2646dffc3c9871847196c' };
    if (lwc.hot) {
        lwc.hot.register('force/ldsStorage/ldsStorage.js', 'bded79b76db2646dffc3c9871847196c', {"name":"ldsStorage","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.clearStorages = clearStorages;
    exports.createStorage = createStorage;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('force/ldsNetwork', ['exports', 'lwc', 'force/luvioEngine', 'aura', 'instrumentation/service', 'force/ldsStorage', 'force/ldsEnvironmentSettings'], (function (exports, lwc, luvioEngine, aura, service, ldsStorage, ldsEnvironmentSettings) {

  const {
    create,
    entries: entries$1,
    keys: keys$1
  } = Object;
  const {
    parse: parse$1,
    stringify: stringify$1
  } = JSON;
  const BASE_URI = '/services/data/v62.0';
  const CONNECT_BASE_URI = `${BASE_URI}/connect`;
  const ASSET_MANAGEMENT_BASE_URI = `${BASE_URI}/asset-management`;
  const COMMERCE_BASE_URI = `${BASE_URI}/commerce`;
  const COMMERCE_CONFIGURATION_BASE_URI = `${COMMERCE_BASE_URI}/configuration`;
  const COMMERCE_CHANNEL_MANAGEMENT_BASE_URI = `${COMMERCE_BASE_URI}/management/channels`;
  const COMMERCE_EXTENSION_BASE_URI = `${COMMERCE_BASE_URI}/extension`;
  const COMMERCE_ESF_BASE_URI = `${COMMERCE_BASE_URI}/experience`;
  const GUIDANCE_BASE_URI = `${BASE_URI}/assistant-platform`;
  const WAVE_BASE_URI = `${BASE_URI}/wave`;
  const SMART_DATA_DISCOVERY_BASE_URI = `${BASE_URI}/smartdatadiscovery`;
  const CMS_BASE_URI = `${CONNECT_BASE_URI}/cms`;
  const CMS_NON_CONNECT_BASE_URI = `${BASE_URI}/cms`;
  const SCALECENTER_BASE_URI = `${BASE_URI}/scalecenter`;
  const FILEBASED_DATAIMPORT_BASE_URI = `${CONNECT_BASE_URI}/industries/fileBasedDataImports`;
  const INTERACTION_BASE_URI = `${CONNECT_BASE_URI}/interaction`;
  const EXPLAINABILITY_BASE_URI = `${CONNECT_BASE_URI}/decision-explainer`;
  const SITES_BASE_URI = `${BASE_URI}/sites`;
  const CIB_BASE_URI = `${CONNECT_BASE_URI}/financialservices`;
  const RCG_TENANTMANAGEMENT_BASE_URI = `${CONNECT_BASE_URI}/consumer-goods`;
  const IDENTITY_VERIFICATION_BASE_URI = `${CONNECT_BASE_URI}/identity-verification`;
  const PSS_SOCIAL_CARE_BASE_URI = `${CONNECT_BASE_URI}/careplan`;
  const CLM_BASE_URI = `${CONNECT_BASE_URI}/clm`;
  const LEARNING_CONTENT_PLATFORM_BASE_URI = `${BASE_URI}/learning-content-platform`;
  const ASSETCREATION_BASE_URI = `${BASE_URI}/asset-creation`;
  const HEALTH_CLOUD_BASE_URI = `${CONNECT_BASE_URI}/health`;
  const SALES_ENABLEMENT_BASE_URI = `${CONNECT_BASE_URI}/enablement`;
  const NAMED_CREDENTIAL_BASE_URI = `${BASE_URI}/named-credentials`;
  const EXTERNAL_CONNECTIVITY_BASE_URI = `${BASE_URI}/external-connectivity`;
  const EXTERNAL_SERVICES_BASE_URI = `${BASE_URI}/externalservices`;
  const E_SIGN_BASE_URI = `${CONNECT_BASE_URI}/e-sign`;
  const CLAUSE_LIBRARY_BASE_URI = `${CONNECT_BASE_URI}/clause-library`;
  const OMNI_ANALYTICS_BASE_URI = `${CONNECT_BASE_URI}/omni-analytics`;
  const SERVICE_EXCELLENCE_BASE_URI = `${CONNECT_BASE_URI}/service-excellence`;
  const EPC_BASE_URI = `${CONNECT_BASE_URI}/pcm`;
  const ERI_BASE_URI = `${CONNECT_BASE_URI}/eri`;
  const EXPERIENCE_MODEL_BASE_URI = `${CONNECT_BASE_URI}/experience-model`;
  const TABLEAU_EMBEDDING_BASE_URI = `${BASE_URI}/tableau`;
  const PEOPLE_API_BASE_URI = `${BASE_URI}/people`;
  const SALES_EXCELLENCE_BASE_URI = `${CONNECT_BASE_URI}/sales-excellence`;
  const ENABLEMENT_BASE_URI = `${CONNECT_BASE_URI}/enablement`;
  const EXTERNAL_DOC_BASE_URI = `${CONNECT_BASE_URI}/external-document`;
  const INSURANCE_BASE_URI = `${CONNECT_BASE_URI}/insurance`;
  const I18N_BASE_URI = `${CONNECT_BASE_URI}/i18n`;
  const GROUP_BASE_URI = `${CONNECT_BASE_URI}/group`;
  const SCHEDULER_BASE_URI = `${CONNECT_BASE_URI}/scheduling`;
  const DATA_PROVIDER_BASE_URI = `${CONNECT_BASE_URI}/data-providers`;
  const FORMULA_BASE_URI = `${CONNECT_BASE_URI}/formula`;
  const EDUCATION_BASE_URI = `${CONNECT_BASE_URI}/education`;
  const CPQ_BASE_URI = `${CONNECT_BASE_URI}/cpq`;
  const LIGHTNING_CARDS_BASE_URI = `${CONNECT_BASE_URI}/lightning-cards`;
  const FUNDRAISING_BASE_URI = `${CONNECT_BASE_URI}/fundraising`;
  const CDP_BASE_URI = `${BASE_URI}/ssot`;
  const CDP_SALES_EXCELLENCE_BASE_URI = `${CONNECT_BASE_URI}/sales-excellence/cust-data-pfrm`;
  const CDP_MACHINE_LEARNING_BASE_URI = `${CDP_BASE_URI}/machine-learning`;
  const CDP_COMMUNICATION_CAPPING_BASE_URI = `${CDP_BASE_URI}/communication-cappings`;
  const DOCGEN_BASE_URI = `${CONNECT_BASE_URI}/docgen`;
  const MATERIALITY_ASSESSMENT_BASE_URI = `${CONNECT_BASE_URI}/materialityassessment`;
  const INDUSTRIES_BASE_URI = `${BASE_URI}/industries`;
  const MEDIA_ADSALES_BASE_URI = `${CONNECT_BASE_URI}/media`;
  const EINSTEIN_BASE_URI = `${BASE_URI}/einstein`;
  const ECI_CONVERSATION_BASE_URI = `${BASE_URI}/conversation`;
  const COMMERCE_STORE_MANAGEMENT_BASE_URI = `${COMMERCE_BASE_URI}/management/webstores`;
  const STAGE_MANAGEMENT_BASE_URI = `${CONNECT_BASE_URI}/stage-management`;
  const SERVICE_CATALOG_CATEGORIES_BASE_URI = `${CONNECT_BASE_URI}/service-automation/service-catalog/categories`;
  const SERVICE_SLACK_BASE_URI = `${CONNECT_BASE_URI}/swarming`;
  const REMINDER_BASE_URI = `${CONNECT_BASE_URI}/reminder/reminder-definition`;
  const PATHASSISTANT_BASE_URI = `${CONNECT_BASE_URI}/pathassistant`;
  const AI4M_EINSTEIN_BASE_URI = `${CONNECT_BASE_URI}/ai4m/einstein`;
  const DECISIONTABLE_BASE_URI = `${CONNECT_BASE_URI}/business-rules`;
  const CONTENT_TAXONOMY_BASE_URI = `${CONNECT_BASE_URI}/content-taxonomy`;
  const ENERGY_UTILITIES_PROGRAMS_BASE_URI = `${CONNECT_BASE_URI}/eu-program`;
  const COMMERCE_GOALS_RECS_BUSINESS_OBJECTIVES_URI = `${CONNECT_BASE_URI}/business-objectives`;
  const COMMERCE_CATALOG_MANAGEMENT_BASE_URI = `${COMMERCE_BASE_URI}/management/webstore`;
  const COMMERCE_CATALOG_MANAGEMENT_URI = `${COMMERCE_BASE_URI}/management`;
  const PROGRAM_MGMT_BASE_URI = `${CONNECT_BASE_URI}/program-mgmt`;
  const SHARING_BASE_URI = `${BASE_URI}/sharing`;
  const OMNI_DESIGNER_BASE_URI = `${CONNECT_BASE_URI}/omni-designer`;
  const SALESFORCE_JOURNEY_BASE_URI = `${CONNECT_BASE_URI}/salesforce-journey`;
  const PERSONALIZATION_SERVICE_BASE_URI = `${BASE_URI}/personalization`;
  const INDUSTRIES_DFO_BASE_URI = `${CONNECT_BASE_URI}/revenue/dro`;
  const RECORD_AGGREGATION_BASE_URI = `${CONNECT_BASE_URI}/record-aggregation`;
  const EVF_SDK_BASE_URI = `${CONNECT_BASE_URI}/evf/sdk`;
  const CONTEXT_RULES_BASE_URI = `${CONNECT_BASE_URI}/context-rules`;
  const SEMANTIC_ENGINE_BASE_URI = `${BASE_URI}/semantic-engine`;
  const SEMANTIC_AUTHORING_BASE_URI = `${CDP_BASE_URI}/semantic`;
  const PAYMENTS_BASE_URI = `${BASE_URI}/payments`;
  const GDF_BASE_URI = `${CONNECT_BASE_URI}/gdf`;
  const GDF_DISCOVERY_FRAMEWORK_BASE_URI = `${CONNECT_BASE_URI}/discovery-framework`;
  const SERVICE_PLAN_BASE_URI = `${CONNECT_BASE_URI}/service-plan`;
  const MILESTONES_BASE_URI = `${CONNECT_BASE_URI}/milestones`;
  const ENGMNT_CONFIG_BASE_URI = `${BASE_URI}/engagementsignal`;
  const CONTENT_LINK_BASE_URI = `${CONNECT_BASE_URI}/content-link`;
  const AI_AUTOFILL_BASE_URI = `${CONNECT_BASE_URI}`;
  const LEARNING_ITEM_BASE_URI = `${CONNECT_BASE_URI}/learning-platform`;
  const APP_FRAMEWORK_BASE_URI = `${BASE_URI}/app-framework`;
  const REVENUE_MANAGEMENT_URI = `${CONNECT_BASE_URI}/revenue-management`;
  const UNIFIED_ANALYTICS_BASE_URI = `${BASE_URI}/tableau`;
  const SALES_EINSTEIN_COACH_BASE_URI = `${BASE_URI}/sales-einstein-coach`;
  function getStatusText(status) {
    switch (status) {
      case luvioEngine.HttpStatusCode.Ok:
        return 'OK';
      case luvioEngine.HttpStatusCode.Created:
        return 'Created';
      case luvioEngine.HttpStatusCode.NotModified:
        return 'Not Modified';
      case luvioEngine.HttpStatusCode.BadRequest:
        return 'Bad Request';
      case luvioEngine.HttpStatusCode.NotFound:
        return 'Not Found';
      case luvioEngine.HttpStatusCode.ServerError:
        return 'Server Error';
      default:
        return `Unexpected HTTP Status Code: ${status}`;
    }
  }
  class AuraFetchResponse {
    constructor(status, body, headers) {
      this.status = status;
      this.body = body;
      this.headers = headers || {};
      this.ok = status >= 200 && this.status <= 299;
      this.statusText = getStatusText(status);
    }
  }
  const router = create(null);
  router.methods = {};
  ['delete', 'get', 'patch', 'post', 'put'].forEach(method => {
    router[method] = function (predicate, handler) {
      const routes = this.methods[method] || [];
      routes.push({
        predicate,
        handler
      });
      this.methods[method] = routes;
    };
  });
  router.lookup = function (resourceRequest) {
    const {
      baseUri,
      basePath,
      method
    } = resourceRequest;
    const path = `${baseUri}${basePath}`;
    const routes = this.methods[method];
    if (routes === undefined || routes.length === 0) {
      return null;
    }
    const matchedRoute = routes.find(route => route.predicate(path));
    if (matchedRoute !== undefined) {
      return matchedRoute.handler;
    } else {
      return null;
    }
  };
  const NO_OP = () => {};
  // For use by callers within this module to instrument interesting things.
  const instrumentation$1 = {
    logCrud: NO_OP,
    networkRequest: NO_OP,
    networkResponse: NO_OP
  };
  /**
   * Allows external modules (typically a runtime environment) to set
   * instrumentation hooks for this module. Note that the hooks are
   * incremental - hooks not suppiled in newInstrumentation will retain
   * their previous values. The default instrumentation hooks are no-ops.
   *
   * @param newInstrumentation instrumentation hooks to be overridden
   */
  function instrument$1(newInstrumentation) {
    Object.assign(instrumentation$1, newInstrumentation);
  }

  /**
   * Create a new instrumentation cache stats and return it.
   *
   * @param name The cache logger name.
   */
  const NAMESPACE = 'lds';
  function registerLdsCacheStats(name) {
    return service.registerCacheStats(`${NAMESPACE}:${name}`);
  }
  const defaultActionConfig = {
    background: false,
    hotspot: true,
    longRunning: false
  };
  function createOkResponse$1(body) {
    return new AuraFetchResponse(luvioEngine.HttpStatusCode.Ok, body);
  }
  /**
   * Wraps the FetchFromNetwork function to provide instrumentation hooks
   * for network requests and responses.
   */
  function instrumentFetchFromNetwork(fetchFromNetwork) {
    return () => {
      instrumentation$1.networkRequest();
      return fetchFromNetwork().then(response => {
        instrumentation$1.networkResponse(() => response);
        return response;
      }).catch(response => {
        instrumentation$1.networkResponse(() => response);
        throw response;
      });
    };
  }
  /** Invoke an Aura controller with the pass parameters. */
  function dispatchAction(endpoint, params, config = {}, instrumentationCallbacks = {}) {
    const {
      action: actionConfig,
      cache: cacheConfig
    } = config;
    const fetchFromNetwork = instrumentFetchFromNetwork(() => {
      return aura.executeGlobalControllerRawResponse(endpoint, params, actionConfig).then(body => {
        // Get the return value from the raw response
        const returnValue = body.getReturnValue();
        // If a cache is passed, store the action body in the cache before returning the
        // value. Even though `AuraStorage.set` is an asynchronous operation we don't
        // need to wait for the store to resolve/reject before returning the value.
        // Swallow the error to not have an unhandled promise rejection.
        if (cacheConfig !== undefined && cacheConfig.storage !== null) {
          cacheConfig.storage.set(cacheConfig.key, returnValue).catch(_error => {});
        }
        if (instrumentationCallbacks.resolveFn) {
          instrumentationCallbacks.resolveFn({
            body: returnValue,
            params
          });
        }
        return createOkResponse$1(returnValue);
      }, error => {
        let err;
        // TODO [W-12255544]: Expose errors to the consumers. Improve the error messagesnetwork
        if (!error || !error.getError) {
          err = new Error('Failed to get error from response');
        } else {
          const actionErrors = error.getError();
          if (actionErrors.length > 0) {
            err = actionErrors[0];
          } else {
            err = new Error('Error fetching component');
          }
        }
        if (instrumentationCallbacks.rejectFn) {
          instrumentationCallbacks.rejectFn({
            err,
            params
          });
        }
        // Handle ConnectInJava exception shapes
        if (err.data !== undefined && err.data.statusCode !== undefined) {
          let data = {};
          data = err.data;
          if (err.id !== undefined) {
            data.id = err.id;
          }
          throw new AuraFetchResponse(data.statusCode, data);
        }
        // Handle all the other kind of errors
        throw new AuraFetchResponse(luvioEngine.HttpStatusCode.ServerError, {
          error: err.message
        });
      });
    });
    // If no cache is passed or if the action should be refreshed, directly fetch the action from
    // the server.
    if (cacheConfig === undefined || cacheConfig.forceRefresh === true || cacheConfig.storage === null) {
      return fetchFromNetwork();
    }
    // Otherwise check for the action body in the cache. If action is not present in the cache or if
    // the cache lookup fails for any reason fallback to the network.
    return cacheConfig.storage.get(cacheConfig.key).then(cacheResult => {
      if (cacheResult !== undefined) {
        cacheConfig.statsLogger.logHits();
        return createOkResponse$1(cacheResult);
      }
      cacheConfig.statsLogger.logMisses();
      return fetchFromNetwork();
    }, () => {
      return fetchFromNetwork();
    });
  }
  /**
   * All the methods exposed out of the UiApiController accept a clientOption config. This method
   * adds methods returns a new params object with the client option if necessary, otherwise it
   * returns the passed params object.
   */
  function buildUiApiParams(params, resourceRequest) {
    const fixedParams = fixParamsForAuraController(params);
    const ifModifiedSince = resourceRequest.headers['If-Modified-Since'];
    const ifUnmodifiedSince = resourceRequest.headers['If-Unmodified-Since'];
    let clientOptions = {};
    if (ifModifiedSince !== undefined) {
      clientOptions.ifModifiedSince = ifModifiedSince;
    }
    if (ifUnmodifiedSince !== undefined) {
      clientOptions.ifUnmodifiedSince = ifUnmodifiedSince;
    }
    return keys$1(clientOptions).length > 0 ? {
      ...fixedParams,
      clientOptions: clientOptions
    } : fixedParams;
  }
  // parameters that need a "Param" suffix appended
  const SUFFIXED_PARAMETERS = ['desc', 'page', 'sort'];
  const SUFFIX = 'Param';
  /**
   * The connect generation code appends a "Param" suffix to certain parameter names when
   * generating Aura controllers. This function accepts a set of UiApiParams and returns
   * an equivalent UiApiParams suitable for passing to an Aura controller.
   */
  function fixParamsForAuraController(params) {
    let updatedParams = params;
    for (let i = 0; i < SUFFIXED_PARAMETERS.length; ++i) {
      const param = SUFFIXED_PARAMETERS[i];
      if (updatedParams[param] !== undefined) {
        if (updatedParams === params) {
          updatedParams = {
            ...params
          };
        }
        updatedParams[param + SUFFIX] = updatedParams[param];
        delete updatedParams[param];
      }
    }
    return updatedParams;
  }
  /** Returns true if an action should ignore the network cache data. */
  function shouldForceRefresh(resourceRequest) {
    const cacheControl = resourceRequest.headers['Cache-Control'];
    return cacheControl !== undefined || cacheControl === 'no-cache';
  }
  function registerApiFamilyRoutes(apiFamily) {
    apiFamily.forEach(({
      method,
      predicate,
      transport,
      bodyParamName
    }) => {
      router[method](predicate, function (resourceRequest, resourceRequestContext) {
        const actionConfig = {
          action: transport.action === undefined ? defaultActionConfig : transport.action
        };
        const {
          urlParams,
          queryParams,
          body
        } = resourceRequest;
        let params;
        if (bodyParamName) {
          params = {
            [bodyParamName]: body,
            ...fixParamsForAuraController(urlParams),
            ...fixParamsForAuraController(queryParams)
          };
        } else {
          params = {
            ...body,
            ...fixParamsForAuraController(urlParams),
            ...fixParamsForAuraController(queryParams)
          };
        }
        const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
        return dispatchAction(transport.controller, params, enrichedConfig, {});
      });
    });
  }
  /**
   * Enriches a dispatch action config with additional context.
   *
   * This function takes an existing object and augments it with additional context
   * provided by the second object. The resulting enriched object contains both the
   * original data from the existing object and the extra context from the
   * additional object.
   *
   * @param {ResourceRequestContext} context - The object containing additional context
   *                                    to be added to the existing object.
   * @param {DispatchActionConfig} config - The existing object to be enriched.
   * @returns {DispatchActionConfig} The enriched object with combined data and context.
   */
  function enrichWithSourceContext(context, config = {}) {
    let enrichedConfig = config;
    const sourceContext = context && context.sourceContext;
    if (sourceContext !== undefined) {
      enrichedConfig = {
        ...config,
        action: {
          ...config.action,
          ...sourceContext.actionConfig,
          sourceContext: {
            ...sourceContext,
            actionConfig: undefined
          }
        }
      };
    }
    return enrichedConfig;
  }
  function executeSoqlQueryPost(resourceRequest, resourceRequestContext) {
    const {
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      query: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction('WaveController.executeSoqlQueryPost', params, enrichedConfig);
  }
  router.post(path => path.startsWith(`${WAVE_BASE_URI}/soql`), executeSoqlQueryPost);
  function buildDataGraphAction(actionName, bodyWrapper = 'input') {
    return (resourceRequest, resourceRequestContext) => {
      const {
        body
      } = resourceRequest;
      let buildParameters = {};
      // eslint-disable-next-line @salesforce/lds/no-optional-chaining
      if (resourceRequest.method === 'put' && resourceRequest.queryParams) {
        buildParameters = resourceRequest.queryParams;
      }
      buildParameters[bodyWrapper] = body;
      const params = buildUiApiParams(buildParameters, resourceRequest);
      const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
      return dispatchAction(actionName, params, enrichedConfig);
    };
  }
  router.post(path => path.startsWith(`${CDP_BASE_URI}/data-graphs/draft`), buildDataGraphAction('CdpDataGraphController.saveDataGraphDraft'));
  router.post(path => path.startsWith(`${CDP_BASE_URI}/data-graphs`), buildDataGraphAction('CdpDataGraphController.createDataGraph'));
  router.put(path => path.startsWith(`${CDP_BASE_URI}/data-graphs/retry`), buildDataGraphAction('CdpDataGraphController.retryDataGraph'));
  router.put(path => path.startsWith(`${CDP_BASE_URI}/data-graphs`), buildDataGraphAction('CdpDataGraphController.editDataGraph'));
  const LWR_APEX_BASE_URI = '/lwr/apex/v62.0';
  const ApexController = 'ApexActionController.execute';
  const CACHE_CONTROL = 'Cache-Control';
  const X_SFDC_ALLOW_CONTINUATION = 'X-SFDC-Allow-Continuation';
  const X_SFDC_LDS_ENDPOINTS = 'X-SFDC-LDS-Endpoints';
  function splitNamespaceClassname(classname) {
    const split = classname.split('__');
    return split.length > 1 ? [split[0], split[1]] : ['', split[0]];
  }
  function executePostApex(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      body,
      headers
    } = resourceRequest;
    const [namespace, classname] = splitNamespaceClassname(urlParams.apexClass);
    const params = {
      namespace,
      classname,
      method: urlParams.apexMethod,
      isContinuation: headers[X_SFDC_ALLOW_CONTINUATION] === 'true',
      params: body,
      cacheable: false
    };
    return dispatchApexAction(ApexController, params, {
      background: false,
      hotspot: false,
      longRunning: params.isContinuation,
      sourceContext: resourceRequestContext.sourceContext || undefined
    });
  }
  function executeGetApex(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams,
      headers
    } = resourceRequest;
    const [namespace, classname] = splitNamespaceClassname(urlParams.apexClass);
    const params = {
      namespace,
      classname,
      method: urlParams.apexMethod,
      isContinuation: headers[X_SFDC_ALLOW_CONTINUATION] === 'true',
      params: queryParams.methodParams,
      cacheable: true
    };
    return dispatchApexAction(ApexController, params, {
      background: false,
      hotspot: false,
      longRunning: params.isContinuation,
      sourceContext: resourceRequestContext.sourceContext || undefined
    });
  }
  function dispatchApexAction(endpoint, params, config) {
    config.headers = {
      ...config.headers,
      [X_SFDC_LDS_ENDPOINTS]: `${endpoint}:${params.classname}.${params.method}`
    };
    return aura.executeGlobalControllerRawResponse(endpoint, params, config).then(body => {
      // Get return value from body
      const returnValue = body.getReturnValue();
      // massage aura action response to
      //  headers: { 'Cache-Control' }
      //  body: returnValue
      return new AuraFetchResponse(luvioEngine.HttpStatusCode.Ok, returnValue === undefined || returnValue.returnValue === undefined ? null : returnValue.returnValue, {
        [CACHE_CONTROL]: returnValue.cacheable === true ? 'private' : 'no-cache'
      });
    }, error => {
      let err;
      // TODO [W-12255544]: Expose errors to the consumers. Improve the error messages
      if (!error || !error.getError) {
        err = new Error('Failed to get error from response');
      } else {
        const actionErrors = error.getError();
        if (actionErrors.length > 0) {
          err = actionErrors[0];
        } else {
          err = new Error('Error fetching component');
        }
      }
      // Handle ConnectInJava exception shapes
      if (err.data !== undefined && err.data.statusCode !== undefined) {
        const {
          data
        } = err;
        throw new AuraFetchResponse(data.statusCode, data);
      }
      // Handle all the other kind of errors
      throw new AuraFetchResponse(luvioEngine.HttpStatusCode.ServerError, err);
    });
  }
  router.post(path => path.startsWith(LWR_APEX_BASE_URI), executePostApex);
  router.get(path => path.startsWith(LWR_APEX_BASE_URI), executeGetApex);
  const GENERIC_CONNECT_API_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/generic/[A-Z0-9_-]`, 'i');
  const VISIT_BROADCAST_ASSIGNMENT_API_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/home-health/visit-broadcast-assignment`, 'i');
  const VISIT_BROADCAST_API_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/home-health/visit-broadcast`, 'i');
  const GET_LIST_VIEW_INFORMATION_LIB = new RegExp(`${GDF_BASE_URI}/information-library/document-clauses/list-view`, 'i');
  const GDF_UPDATE_ASSESSMENT_RESPONSES = new RegExp(`${GDF_DISCOVERY_FRAMEWORK_BASE_URI}/assessment-question-response`, 'i');
  const GDF_SAVE_ASSESSMENT_RESPONSES = new RegExp(`${GDF_DISCOVERY_FRAMEWORK_BASE_URI}/assessment-question-response`, 'i');
  const CREATE_NEW_SNIPPET_INFORMATION_LIB = new RegExp(`${GDF_BASE_URI}/information-library/create-new-snippet`, 'i');
  const DELETE_SNIPPET_INFORMATION_LIB = new RegExp(`${GDF_BASE_URI}/information-library/delete-snippet-record`, 'i');
  const DELETE_TOPIC_INFORMATION_LIB = new RegExp(`${GDF_BASE_URI}/information-library/delete-topic-record`, 'i');
  const SNIPPET_RELATED_TOPICS_INFORMATION_LIB = new RegExp(`${GDF_BASE_URI}/information-library/snippet/related-topics`, 'i');
  const POST_MATERIALITY_ASSESSMENT_CALCULATE = new RegExp(`${MATERIALITY_ASSESSMENT_BASE_URI}/calculate/([A-Z0-9]{15,18})`, 'i');
  const COMMUNITIES_MICROBATCHING_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([A-Z0-9]){15,18}/microbatching`, 'i');
  const COMMUNITIES_NAVIGATION_MENU_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([A-Z0-9]){15,18}/navigation-menu`, 'i');
  const COMMUNITIES_PREVIEW_URL_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([A-Z0-9]){15,18}/preview-url/pages/([A-Za-z0-9_]){1,255}`, 'i');
  const WAVE_DASHBOARDS_POST_PATH = new RegExp(`${WAVE_BASE_URI}/dashboards`, 'i');
  const NLP_SERVICE_READ_RESULTS = new RegExp(`${CONNECT_BASE_URI}/nlp-service/aiNaturalLangProcessResults/sourceRecords/([A-Z0-9]){15,18}$`, 'i');
  const NLP_SERVICE_READ_RESULTS_BY_REFERENCE_RECORD = new RegExp(`${CONNECT_BASE_URI}/nlp-service/aiNaturalLangProcessResults/referenceRecords/([A-Z0-9]){15,18}$`, 'i');
  const NLP_SERVICE_CLAUSE_GENERATION = new RegExp(`${CONNECT_BASE_URI}/nlp-service/aiNaturalLangProcessResults`, 'i');
  const GET_PRODUCT_PATH = new RegExp(`${COMMERCE_BASE_URI}/webstores/([A-Z0-9]){15,18}/products/([A-Z0-9]){15,18}`, 'i');
  const GET_PRODUCT_CATEGORY_PATH_PATH = new RegExp(`${COMMERCE_BASE_URI}/webstores/([A-Z0-9]){15,18}/product-category-path/product-categories/([A-Z0-9]){15,18}`, 'i');
  const PRODUCT_SEARCH_PATH = new RegExp(`${COMMERCE_BASE_URI}/webstores/([A-Z0-9]){15,18}/search/product-search`, 'i');
  const GET_PRODUCT_PRICE_PATH = new RegExp(`${COMMERCE_BASE_URI}/webstores/([A-Z0-9]){15,18}/pricing/products/([A-Z0-9]){15,18}`, 'i');
  const GET_MANAGEMENT_CHANNELS_PATH = new RegExp(`${COMMERCE_BASE_URI}/management/channels(\\?.*)?$`, 'i');
  const GET_MANAGEMENT_SHIPPING_PROFILES_PATH = new RegExp(`${COMMERCE_BASE_URI}/webstores/([A-Z0-9]){15,18}/shippingProfiles`, 'i');
  const GET_MANAGEMENT_SELF_REGISTRATION_CONFIGURATION_PATH = new RegExp(`${COMMERCE_BASE_URI}/webstores/([A-Z0-9]){15,18}/self-registration/configurations`, 'i');
  const PATCH_MANAGEMENT_SELF_REGISTRATION_CONFIGURATION_PATH = new RegExp(`${COMMERCE_BASE_URI}/webstores/([A-Z0-9]){15,18}/self-registration/configurations/networks/([A-Z0-9]){15,18}`, 'i');
  const GET_COMMERCE_CONFIGURATION_ATTRIBUTE_PATH = new RegExp(`${COMMERCE_CONFIGURATION_BASE_URI}/[^/]+/[^/]+/[^/]+$`, 'i');
  const GET_EXTENSIONS_PATH = new RegExp(`${COMMERCE_EXTENSION_BASE_URI}/extensions$`, 'i');
  const GET_MAPPINGS_PATH = new RegExp(`${COMMERCE_EXTENSION_BASE_URI}/mappings(\\?.*)?$`, 'i');
  const GET_MAPPING_PATH = new RegExp(`${COMMERCE_EXTENSION_BASE_URI}/mappings/([A-Z0-9]){15,18}$`, 'i');
  const GET_PROVIDERS_PATH = new RegExp(`${COMMERCE_EXTENSION_BASE_URI}/providers(\\?.*)?$`, 'i');
  const GET_PROVIDER_PATH = new RegExp(`${COMMERCE_EXTENSION_BASE_URI}/providers/([A-Z0-9]){15,18}$`, 'i');
  const PATCH_EXPERIENCE_BRANDING_PATH = new RegExp(`${COMMERCE_ESF_BASE_URI}/([A-Z0-9]){15,18}/branding$`, 'i');
  const POST_EXPERIENCE_EXTRACT_BRAND_PATH = new RegExp(`${COMMERCE_ESF_BASE_URI}/([A-Z0-9]){15,18}/brand-extractor$`, 'i');
  const GET_EXPERIENCE_CMS_WORKSPACES_PATH = new RegExp(`${COMMERCE_ESF_BASE_URI}/([A-Z0-9]){15,18}/cms-workspaces$`, 'i');
  const GET_GUIDANCE_ASSISTANT_PATH = new RegExp(`${GUIDANCE_BASE_URI}/([A-Z0-9_]){2,80}$`, 'i');
  const GET_LEARNING_CONTENT_PLATFORM_RELATED_LIST_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/featured-item/list/related$`, 'i');
  const GET_LEARNING_CONTENT_PLATFORM_RECOMMENDED_LIST_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/featured-item/list/recommended$`, 'i');
  const GET_LEARNING_CONFIG_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/config$`, 'i');
  const GET_LEARNING_ITEM_LIST_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/item/list$`, 'i');
  const GET_LEARNING_ITEM_PROGRESS_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/item/progress$`, 'i');
  const EVALUATE_LEARNING_ITEM_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/evaluate$`, 'i');
  const GET_LEARNING_TEXT_LESSON_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/textlesson/([A-Z0-9_]){2,80}$`, 'i');
  const GET_LEARNING_PRACTICE_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/practice/([A-Z0-9_]){2,80}$`, 'i');
  const GET_LEARNING_MODEL_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/model/([A-Z0-9_]){2,80}$`, 'i');
  const GET_MODULE_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/learning/module/([A-Z0-9_]){2,80}$`, 'i');
  const GET_GUIDANCE_ASSISTANT_TARGET_PATH = new RegExp(`${GUIDANCE_BASE_URI}/([A-Z0-9_]){2,80}/info$`, 'i');
  const GET_COACHING_AI_FEEDBACK_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/coaching/([A-Z0-9_]){2,80}/ai-feedback$`, 'i');
  const SUBMIT_FOR_COACHING_AI_FEEDBACK_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/coaching/ai-feedback$`, 'i');
  const SUBMIT_FOR_COACHING_AI_PRODUCT_PITCH_FEEDBACK_PATH = new RegExp(`${LEARNING_CONTENT_PLATFORM_BASE_URI}/coaching/moments/ai-product-pitch-feedback$`, 'i');
  const GET_GUIDANCE_ASSISTANT_LIST_PATH = new RegExp(`${GUIDANCE_BASE_URI}/([A-Z0-9_]){2,80}/list$`, 'i');
  const GET_GUIDANCE_ASSISTANT_INFO_LIST_PATH = new RegExp(`${GUIDANCE_BASE_URI}/([A-Z0-9_]){2,80}/list/info$`, 'i');
  const GET_GUIDANCE_QUESTIONNAIRE_PATH = new RegExp(`${GUIDANCE_BASE_URI}/questionnaire/([A-Z0-9_]){2,80}$`, 'i');
  const GET_GUIDANCE_QUESTIONNAIRES_PATH = new RegExp(`${GUIDANCE_BASE_URI}/([A-Z0-9_]){2,80}/questionnaires$`, 'i');
  const GET_GUIDANCE_STEP_PATH = new RegExp(`${GUIDANCE_BASE_URI}/step/([A-Z0-9_]){2,80}$`, 'i');
  const GET_GUIDANCE_INITIALIZE_PATH = new RegExp(`${GUIDANCE_BASE_URI}/([A-Z0-9_]){2,80}/initialize$`, 'i');
  const GET_CONVERSATION_SUMMARY_RELATED_LIST_PATH = new RegExp(`${ECI_CONVERSATION_BASE_URI}/summary/related/([A-Z0-9_]){2,80}$`, 'i');
  const GENERATE_CONVERSATION_SUMMARY_PATH = new RegExp(`${ECI_CONVERSATION_BASE_URI}/summary/ai/generate/([A-Z0-9_]){2,80}$`, 'i');
  const ECI_GET_TRANSCRIPT_PATH = new RegExp(`${ECI_CONVERSATION_BASE_URI}/transcript/([A-Z0-9_]){2,80}$`, 'i');
  const ECI_GENERATIVE_INSIGHT_PATH = new RegExp(`${ECI_CONVERSATION_BASE_URI}/generative/insight/([A-Z0-9_]){2,80}$`, 'i');
  const ECI_REALTIME_INSIGHT_MEETING_INITIATE_PATH = new RegExp(`${ECI_CONVERSATION_BASE_URI}/realtime/insight/meeting/initiate$`, 'i');
  const ECI_REALTIME_INSIGHT_MEETING_TERMINATE_PATH = new RegExp(`${ECI_CONVERSATION_BASE_URI}/realtime/insight/meeting/terminate$`, 'i');
  const STORIES_PATH = new RegExp(`${SMART_DATA_DISCOVERY_BASE_URI}/stories$`, 'i');
  const ANALYTICS_LIMITS_PATH = new RegExp(`${WAVE_BASE_URI}/limits$`, 'i');
  const DATA_CONNECTORS_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors$`, 'i');
  const DATA_CONNECTOR_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors/([A-Z0-9]){15,18}$`, 'i');
  const DATA_CONNECTOR_SOURCE_OBJECTS_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors/([A-Z0-9]){15,18}/sourceObjects$`, 'i');
  const DATA_CONNECTOR_SOURCE_OBJECT_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors/([A-Z0-9]){15,18}/sourceObjects/.{1,255}$`, 'i');
  const DATA_CONNECTOR_SOURCE_OBJECT_PREVIEW_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors/([A-Z0-9]){15,18}/sourceObjects/.{1,255}/dataPreview$`, 'i');
  const DATA_CONNECTOR_SOURCE_FIELDS_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors/([A-Z0-9]){15,18}/sourceObjects/.{1,255}/fields$`, 'i');
  const INGEST_DATA_CONNECTOR_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors/([A-Z0-9_]){15,18}/ingest$`, 'i');
  const DATA_CONNECTOR_STATUS_PATH = new RegExp(`${WAVE_BASE_URI}/dataconnectors/([A-Z0-9_]){15,18}/status$`, 'i');
  const DATA_CONNECTOR_TYPES_PATH = new RegExp(`${WAVE_BASE_URI}/dataConnectorTypes$`, 'i');
  const DATAFLOWS_PATH = new RegExp(`${WAVE_BASE_URI}/dataflows$`, 'i');
  const DATAFLOW_JOBS_PATH = new RegExp(`${WAVE_BASE_URI}/dataflowjobs$`, 'i');
  const DATAFLOW_JOB_PATH = new RegExp(`${WAVE_BASE_URI}/dataflowjobs/([A-Z0-9]){15,18}$`, 'i');
  const DATAFLOW_JOB_NODES_PATH = new RegExp(`${WAVE_BASE_URI}/dataflowjobs/([A-Z0-9]){15,18}/nodes$`, 'i');
  const DATAFLOW_JOB_NODE_PATH = new RegExp(`${WAVE_BASE_URI}/dataflowjobs/([A-Z0-9]){15,18}/nodes/([A-Z0-9]){15,18}$`, 'i');
  const EXECUTE_QUERY_PATH = new RegExp(`${WAVE_BASE_URI}/query`, 'i');
  const EXECUTE_SOQL_QUERY_PATH = new RegExp(`${WAVE_BASE_URI}/soql`, 'i');
  const GET_JWT_TABLEAU_EMBEDDING = new RegExp(`${TABLEAU_EMBEDDING_BASE_URI}/jwt`, 'i');
  const GET_EAS_TABLEAU_EMBEDDING = new RegExp(`${TABLEAU_EMBEDDING_BASE_URI}/eas`, 'i');
  const RECIPES_PATH = new RegExp(`${WAVE_BASE_URI}/recipes$`, 'i');
  const RECIPE_PATH = new RegExp(`${WAVE_BASE_URI}/recipes/([A-Z0-9]){15,18}$`, 'i');
  const ACTIONS_PATH = new RegExp(`${WAVE_BASE_URI}/actions/([A-Z0-9]){15,18}$`, 'i');
  const RECIPE_NOTIFICATION_PATH = new RegExp(`${WAVE_BASE_URI}/recipes/([A-Z0-9]){15,18}/notification$`, 'i');
  const REPLICATED_DATASETS_PATH = new RegExp(`${WAVE_BASE_URI}/replicatedDatasets$`, 'i');
  const REPLICATED_DATASET_PATH = new RegExp(`${WAVE_BASE_URI}/replicatedDatasets/([A-Z0-9]){15,18}$`, 'i');
  const REPLICATED_FIELDS_PATH = new RegExp(`${WAVE_BASE_URI}/replicatedDatasets/([A-Z0-9]){15,18}/fields$`, 'i');
  const SCHEDULE_PATH = new RegExp(`${WAVE_BASE_URI}/asset/([A-Z0-9]){15,18}/schedule$`, 'i');
  const DATASETS_PATH = new RegExp(`${WAVE_BASE_URI}/datasets$`, 'i');
  const DATASET_PATH = new RegExp(`${WAVE_BASE_URI}/datasets/([A-Z0-9_]){1,80}$`, 'i');
  const DATASET_VERSIONS_PATH = new RegExp(`${WAVE_BASE_URI}/datasets/([A-Z0-9_]){1,80}/versions$`, 'i');
  const DATASET_VERSION_PATH = new RegExp(`${WAVE_BASE_URI}/datasets/([A-Z0-9_]){1,80}/versions/([A-Z0-9_]){15,18}$`, 'i');
  const SECURITY_COVERAGE_DATASET_VERSION_PATH = new RegExp(`${WAVE_BASE_URI}/security/coverage/datasets/([A-Z0-9_]){1,80}/versions/([A-Z0-9_]){15,18}$`, 'i');
  const XMD_PATH = new RegExp(`${WAVE_BASE_URI}/datasets/([A-Z0-9_]){1,80}/versions/([A-Z0-9_]){15,18}/xmds/[A-Z]+$`, 'i');
  const DEPENDENCIES_PATH = new RegExp(`${WAVE_BASE_URI}/dependencies/([A-Z0-9]){15,18}$`, 'i');
  const WAVE_FOLDERS_PATH = new RegExp(`${WAVE_BASE_URI}/folders$`, 'i');
  const WAVE_FOLDERS_POST_PATH = new RegExp(`${WAVE_BASE_URI}/folders`, 'i');
  const WAVE_FOLDER_PATH = new RegExp(`${WAVE_BASE_URI}/folders/([A-Z0-9_]){1,80}$`, 'i');
  const WAVE_TEMPLATES_PATH = new RegExp(`${WAVE_BASE_URI}/templates$`, 'i');
  const WAVE_TEMPLATE_PATH = new RegExp(`${WAVE_BASE_URI}/templates/([A-Z0-9_]){1,80}$`, 'i');
  const WAVE_TEMPLATE_CONFIG_PATH = new RegExp(`${WAVE_BASE_URI}/templates/([A-Z0-9_]){1,80}/configuration$`, 'i');
  const WAVE_TEMPLATE_RELEASE_NOTES_PATH = new RegExp(`${WAVE_BASE_URI}/templates/([A-Z0-9_]){1,80}/releasenotes$`, 'i');
  const WAVE_TEMPLATE_VALIDATE_PATH = new RegExp(`${WAVE_BASE_URI}/templates/([A-Z0-9_]){1,80}/validate$`, 'i');
  const TEMPLATES_SETUP_PLAN_PATH = new RegExp(`${WAVE_BASE_URI}/templates/([A-Z0-9_]){1,80}/plans/([^/]+)$`, 'i');
  const GET_COLLECTION_ITEMS_PATH = new RegExp(`${CMS_BASE_URI}/collections/([A-Z0-9_]){1,28}$`, 'i');
  const GET_MANAGED_CONTENT_VARIANT_VERSIONS_PATH = new RegExp(`${CMS_BASE_URI}/contents/variants/([A-Z0-9_]){1,80}/versions$`, 'i');
  const POST_MANAGED_CONTENT_SPACE_FOLDERS_PATH = new RegExp(`${CMS_BASE_URI}/folders$`, 'i');
  const GET_MANAGED_CONTENT_SPACE_FOLDER_PATH = new RegExp(`${CMS_BASE_URI}/folders/([A-Z0-9_]){1,80}$`, 'i');
  const GET_CONTENT_TYPE_INTERNAL_PATH = new RegExp(`${CMS_BASE_URI}/content-types/([A-Z0-9_]){1,80}$`, 'i');
  const GET_MANAGED_CONTENT_VARIANT_PATH = new RegExp(`${CMS_BASE_URI}/contents/variants/([A-Z0-9_]){1,80}$`, 'i');
  const GET_MANAGED_CONTENT_FOLDER_ITEMS_PATH = new RegExp(`${CMS_BASE_URI}/folders/([A-Z0-9]){15,18}/items$`, 'i');
  const GET_MANAGED_CONTENT_SPACE_FOLDER_ITEMS_V1_PATH = new RegExp(`${CMS_NON_CONNECT_BASE_URI}/folders/([A-Z0-9]){15,18}/items$`, 'i');
  const GET_FOLDER_SHARE_TARGETS_PATH = new RegExp(`${CMS_BASE_URI}/folders/([A-Z0-9]){15,18}/share-targets$`, 'i');
  const GET_MANAGED_CONTENT_REFERENCED_BY_PATH = new RegExp(`${CMS_BASE_URI}/contents/([A-Z0-9_]){1,28}/referenced-by$`, 'i');
  const GET_FILE_UPLOAD_CONFIG_PATH = new RegExp(`${CONNECT_BASE_URI}/file/upload/config$`, 'i');
  const CREATE_CONTENT_DOC_FROM_CONTENT_BODY_PATH = new RegExp(`${CONNECT_BASE_URI}/files/users/([A-Z0-9]){2,18}$`, 'i');
  const GET_MANAGED_CONTENT_VARIANT_REFERENCES_PATH = new RegExp(`${CMS_BASE_URI}/contents/([A-Z0-9_]){1,28}/variants/references$`, 'i');
  const GET_MANAGED_CONTENT_VARIANT_RENDITION_PATH = new RegExp(`${CMS_BASE_URI}/contents/([A-Z0-9_]){1,28}/renditions/([-A-Za-z0-9_]){1,100}$`, 'i');
  const GET_WEB_URLS_PATH = new RegExp(`${CMS_BASE_URI}/contents/([A-Z0-9_]){1,28}/web-urls`, 'i');
  const UPDATE_MANAGED_CONTENT_WEB_URL_PATH = new RegExp(`${CMS_BASE_URI}/contents/web-urls/([A-Z0-9_]){1,28}`, 'i');
  const GET_MANAGED_CONTENT_PATH = new RegExp(`${CMS_BASE_URI}/contents/([A-Z0-9_]){1,80}$`, 'i');
  const GET_MANAGED_CONTENT_PROVIDERS_PATH = new RegExp(`${CMS_BASE_URI}/content/providers`, 'i');
  const REPLACE_MANAGED_CONTENT_VARIANT_PATH = GET_MANAGED_CONTENT_VARIANT_PATH;
  const DELETE_MANAGED_CONTENT_VARIANT_PATH = GET_MANAGED_CONTENT_VARIANT_PATH;
  const LIST_CONTENT_INTERNAL_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([A-Z0-9]){15,18}/managed-content/delivery/contents`, 'i');
  const LIST_CONTENT_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([A-Z0-9]){15,18}/managed-content/delivery`, 'i');
  const GET_COLLECTION_ITEMS_FOR_SITE = new RegExp(`${CONNECT_BASE_URI}/sites/([A-Z0-9]){15,18}/cms/delivery/collections/([A-Z0-9]){1,28}$`, 'i');
  const GET_COLLECTION_METADATA_FOR_SITE = new RegExp(`${CONNECT_BASE_URI}/sites/([A-Z0-9]){15,18}/cms/delivery/collections/([A-Z0-9]){1,28}/metadata$`, 'i');
  const GET_COLLECTION_ITEMS_FOR_CHANNEL = new RegExp(`${CONNECT_BASE_URI}/cms/delivery/channels/([A-Z0-9]){15,18}/collections/([A-Z0-9]){1,28}$`, 'i');
  const GET_COLLECTION_METADATA_FOR_CHANNEL = new RegExp(`${CONNECT_BASE_URI}/cms/delivery/channels/([A-Z0-9]){15,18}/collections/([A-Z0-9]){1,28}/metadata$`, 'i');
  const GET_CMS_SPACES = new RegExp(`${CMS_BASE_URI}/spaces$`, 'i');
  const CMS_SPACE_PATH = new RegExp(`${CMS_BASE_URI}/spaces/([A-Z0-9]){15,18}$`, 'i');
  const CMS_SINGLE_ITEM_PATH = new RegExp(`${CMS_BASE_URI}/spaces/([A-Z0-9]){15,18}/single-item-content/([-A-Za-z0-9_]){1,100}$`, 'i');
  const CMS_MANAGED_CONTENT_ORCH_CONFIG_PATH = new RegExp(`${CMS_BASE_URI}/spaces/([A-Z0-9]){15,18}/orchestrator-config$`, 'i');
  const CREATE_MANAGED_CONTENT_IMPORT_V2_JOB_PATH = new RegExp(`${CONNECT_BASE_URI}/cms/spaces/([A-Z0-9]){15,18}/contents/import`, 'i');
  const CREATE_MANAGED_CONTENT_EXPORT_V2_JOB_PATH = new RegExp(`${CONNECT_BASE_URI}/cms/spaces/([A-Z0-9]){15,18}/contents/export`, 'i');
  const CREATE_TRANSLATION_V2_JOB_PATH = new RegExp(`${CONNECT_BASE_URI}/cms/content/spaces/([A-Z0-9]){15,18}/translation`, 'i');
  const GET_MANAGED_CONTENT_PREVIEW_COLLECTION_PATH = new RegExp(`${CMS_BASE_URI}/spaces/([A-Z0-9]){15,18}/preview-endpoints`, 'i');
  const GET_MANAGED_CONTENT_FOR_SITE_PATH = new RegExp(`${CONNECT_BASE_URI}/sites/([A-Z0-9]){15,18}/cms/contents/([-A-Z0-9_]){1,28}$`, 'i');
  const GET_ALL_CMS_JOBS_PATH = new RegExp(`${CMS_NON_CONNECT_BASE_URI}/spaces/([A-Z0-9]){15,18}/jobs$`, 'i');
  const GET_CMS_JOB_PATH = new RegExp(`${CMS_NON_CONNECT_BASE_URI}/spaces/([A-Z0-9]){15,18}/jobs/([A-Z0-9_]){15,18}$`, 'i');
  const GET_SEARCH_RESULTS = new RegExp(`${CONNECT_BASE_URI}/cms/items/search`, 'i');
  const DEPLOYMENT_PATH = new RegExp(`${CMS_NON_CONNECT_BASE_URI}/deployments`, 'i');
  const SCHEDULED_DEPLOYMENT_PATH = new RegExp(`${CMS_BASE_URI}/schedules/([A-Z0-9_]){15,18}$`, 'i');
  const CMS_SCHEDULES_PATH = new RegExp(`${CMS_BASE_URI}/schedules`, 'i');
  const UNPUBLISH_MANAGED_CONTENT_PATH = new RegExp(`${CMS_BASE_URI}/contents/unpublish`, 'i');
  const PUBLISH_MANAGED_CONTENT_PATH = new RegExp(`${CMS_BASE_URI}/contents/publish`, 'i');
  const CLONE_SINGLE_CONTENT_PATH = new RegExp(`${CMS_BASE_URI}/contents/([-A-Z0-9_]){1,28}/clone$`, 'i');
  const POST_MANAGED_CONTENT_LLM_TRANSALTION_PATH = new RegExp(`${CMS_BASE_URI}/contents/([-A-Z0-9_]){1,28}/translate$`, 'i');
  const MCS_FOLDER_SHARES_PATH = new RegExp(`${CMS_BASE_URI}/folders/([A-Z0-9]){15,18}/shares$`, 'i');
  const CREATE_MANAGED_CONTENT_VARIANT_PATH = new RegExp(`${CMS_BASE_URI}/contents/variants`, 'i');
  const CREATE_MANAGED_CONTENT_PATH = new RegExp(`${CMS_BASE_URI}/contents$`, 'i');
  const GET_BLOCK_TYPES_PATH = new RegExp(`${EXPERIENCE_MODEL_BASE_URI}/block-types$`, 'i');
  const GET_BLOCK_TYPE_PATH = new RegExp(`${EXPERIENCE_MODEL_BASE_URI}/block-types/([-A-Za-z0-9_]){1,100}$`, 'i');
  const GET_CONTENT_TYPES_PATH = new RegExp(`${EXPERIENCE_MODEL_BASE_URI}/content-types$`, 'i');
  const GET_CONTENT_TYPE_PATH = new RegExp(`${EXPERIENCE_MODEL_BASE_URI}/content-types/([-A-Za-z0-9_]){1,100}$`, 'i');
  const GET_PROPERTY_TYPES_PATH = new RegExp(`${EXPERIENCE_MODEL_BASE_URI}/property-types$`, 'i');
  const GET_PROPERTY_TYPE_PATH = new RegExp(`${EXPERIENCE_MODEL_BASE_URI}/property-types/([-A-Za-z0-9_]){1,100}$`, 'i');
  const POST_TYPES = new RegExp(`${EXPERIENCE_MODEL_BASE_URI}/types`, 'i');
  const RECORD_SEO_PROPERTIES_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([A-Z0-9]){15,18}/seo/properties/([^\\s]){1,128}`, 'i');
  const GET_ORCHESTRATION_INSTANCE_COLLECTION_PATH = new RegExp(`${CONNECT_BASE_URI}/interaction/orchestration/instances$`, 'i');
  const SITES_SEARCH_PATH = new RegExp(`${CONNECT_BASE_URI}/sites/([A-Z0-9]){15,18}/search`, 'i');
  const INTERACTION_RUNTIME_RUN_FLOW_PATH = new RegExp(`^${INTERACTION_BASE_URI}/runtime/startFlow$`, 'i');
  const INTERACTION_RUNTIME_NAVIGATE_FLOW_PATH = new RegExp(`^${INTERACTION_BASE_URI}/runtime/navigateFlow$`, 'i');
  const INTERACTION_RUNTIME_RESUME_FLOW_PATH = new RegExp(`^${INTERACTION_BASE_URI}/runtime/resumeFlow$`, 'i');
  const INTERACTION_FLOW_BUILDER_RULES_PATH = new RegExp(`^${INTERACTION_BASE_URI}/builder/rules`, 'i');
  const REVENUE_SALES_TRANSACTION_CONTEXTS_VIEW = new RegExp(`${REVENUE_MANAGEMENT_URI}/sales-transaction-contexts/([A-Za-z0-9_]{1,255})/actions/ramp-deal-view`, 'i');
  const REVENUE_SALES_TRANSACTION_CONTEXTS_UPDATE = new RegExp(`${REVENUE_MANAGEMENT_URI}/sales-transaction-contexts/([A-Za-z0-9_]{1,255})/actions/ramp-deal-update`, 'i');
  const REVENUE_SALES_TRANSACTION_CONTEXTS_DELETE = new RegExp(`${REVENUE_MANAGEMENT_URI}/sales-transaction-contexts/([A-Za-z0-9_]{1,255})/actions/ramp-deal-delete`, 'i');
  const REVENUE_SALES_TRANSACTION_CONTEXTS_CREATE = new RegExp(`${REVENUE_MANAGEMENT_URI}/sales-transaction-contexts/([A-Za-z0-9_]{1,255})/actions/ramp-deal-create`, 'i');
  const REVENUE_AMEND_ASSETS_PATH = new RegExp(`${REVENUE_MANAGEMENT_URI}/assets/actions/amend`, 'i');
  const REVENUE_RENEW_ASSETS_PATH = new RegExp(`${REVENUE_MANAGEMENT_URI}/assets/actions/renew`, 'i');
  const REVENUE_CANCEL_ASSETS_PATH = new RegExp(`${REVENUE_MANAGEMENT_URI}/assets/actions/cancel`, 'i');
  const REVENUE_UPDATE_PLACE_QUOTE_PATH = new RegExp(`${COMMERCE_BASE_URI}/quotes/actions/place`, 'i');
  const REVENUE_PLACE_ORDER_PATH = new RegExp(`${COMMERCE_BASE_URI}/sales-orders/actions/place`, 'i');
  const USAGE_DETAIL_ORDER_PATH = new RegExp(`${COMMERCE_BASE_URI}/sales-orders/line-items/([A-Za-z0-9]){15,18}/usage-details`, 'i');
  const USAGE_DETAIL_QUOTE_PATH = new RegExp(`${COMMERCE_BASE_URI}/quotes/line-items/([A-Za-z0-9]){15,18}/usage-details`, 'i');
  const USAGE_DETAIL_ASSET_PATH = new RegExp(`${ASSET_MANAGEMENT_BASE_URI}/assets/([A-Za-z0-9]){15,18}/usage-details`, 'i');
  const REVENUE_INIT_SALES_TRANSACTION_PATH = new RegExp(`${CONNECT_BASE_URI}/rev/sales-transaction-context/actions/init`, 'i');
  const REVENUE_PLACE_SALES_TRANSACTION_PATH = new RegExp(`${CONNECT_BASE_URI}/rev/sales-transaction/actions/place`, 'i');
  const POST_BATCH_PAYMENTS_SCHEDULERS_PATH = new RegExp(`${COMMERCE_BASE_URI}/payments/payment-schedulers`, 'i');
  const POST_BATCH_INVOICES_SCHEDULERS_PATH = new RegExp(`${COMMERCE_BASE_URI}/invoicing/invoice-schedulers`, 'i');
  const EXPLAINABILITY_ACTION_LOG_PATH = new RegExp(`${EXPLAINABILITY_BASE_URI}/action-logs$`, 'i');
  const EXPLAINABILITY_DETAILED_ACTION_LOG_PATH = new RegExp(`${EXPLAINABILITY_BASE_URI}/detailed-action-log$`, 'i');
  const DECISION_MATRIX_COLUMNS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/decision-matrices/([A-Z0-9]){1,18}/columns`, 'i');
  const GET_EXPRESSION_SET_ALIAS_META_INFO_PATH = new RegExp(`${CONNECT_BASE_URI}/ruleengine/expression-set-alias-meta-info$`, 'i');
  const BUSINESS_KNOWLEDGE_MODEL_PATH = new RegExp(`${CONNECT_BASE_URI}/businessknowledgemodel/[A-Z0-9]`, 'i');
  const GET_LOOKUP_TABLES_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/lookup-tables`, 'i');
  const CREATE_EXPRESSION_SET_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/expression-set`, 'i');
  const GET_EXPRESSION_SET_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/expression-set/([A-Z0-9]){15,18}`, 'i');
  const PATCH_EXPRESSION_SET_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/expression-set/([A-Z0-9]){15,18}`, 'i');
  const DELETE_EXPRESSION_SET_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/expression-set/([A-Z0-9]){15,18}`, 'i');
  const GET_CONTEXT_TAG_MAPPING_PATH = new RegExp(`${CONTEXT_RULES_BASE_URI}/context-tag-mappings/rule-library-api-name/([A-Z0-9_]){1,80}/version-number/([0-9]){1,10}$`, 'i');
  const POST_CONTEXT_TAG_MAPPING_PATH = new RegExp(`${CONTEXT_RULES_BASE_URI}/context-tag-mappings/rule-library-api-name/([A-Z0-9_]){1,80}/version-number/([0-9]){1,10}`, 'i');
  const PATCH_CONTEXT_TAG_MAPPING_PATH = new RegExp(`${CONTEXT_RULES_BASE_URI}/context-tag-mappings/rule-library-api-name/([A-Z0-9_]){1,80}/version-number/([0-9]){1,10}`, 'i');
  const DELETE_CONTEXT_TAG_MAPPING_PATH = new RegExp(`${CONTEXT_RULES_BASE_URI}/context-tag-mappings/rule-library-api-name/([A-Z0-9_]){1,80}/version-number/([0-9]){1,10}/mapping-name/([A-Z0-9_]){1,255}`, 'i');
  const GET_DELETE_CONTEXT_TAG_MAPPING_PATH = new RegExp(`${CONTEXT_RULES_BASE_URI}/context-tag-mappings/rule-library-api-name/([A-Z0-9_]){1,80}/version-number/([0-9]){1,10}/mapping-name/([A-Z0-9_]){1,255}`, 'i');
  const GET_CONTEXT_RULE_USAGE_TYPE_PATH = new RegExp(`${CONTEXT_RULES_BASE_URI}/usage-types/([A-Z0-9_]){1,255}`, 'i');
  const USAGE_TYPES_PATH = new RegExp(`${CONNECT_BASE_URI}/ruleengine/usage-types`, 'i');
  const CREATE_OBJECT_ALIAS_PATH = new RegExp(`${CONNECT_BASE_URI}/ruleengine/object-alias`, 'i');
  const ALIAS_FIELD_PATH = new RegExp(`${CONNECT_BASE_URI}/ruleengine/object-alias/([A-Z0-9]){1,18}`, 'i');
  const PROCESS_TYPE_PATH = new RegExp(`${CONNECT_BASE_URI}/ruleengine/processType/[A-Z0-9]`, 'i');
  const DECISION_MATRIX_ROWS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/decision-matrices/([A-Z0-9]){1,18}/versions/([A-Z0-9]){1,18}/rows`, 'i');
  const DECISION_TABLE_FILE_UPLOAD_PATH = new RegExp(`${DECISIONTABLE_BASE_URI}/decision-table/([A-Z0-9]){15,18}/file$`, 'i');
  const SCALE_CENTER_GET_METRICS_PATH = new RegExp(`${SCALECENTER_BASE_URI}/metrics/query`, 'i');
  const GET_DECISION_MATRIC_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/decision-matrices/([A-Z0-9]){1,18}$`, 'i');
  const GET_DECISION_TABLE_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/decision-tables/([A-Z0-9]){15,18}$`, 'i');
  const GET_MESSAGE_TEMPLATE_DETAIL_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/explainability/message-templates/([A-Z0-9]){15,18}$`, 'i');
  const GET_CALC_PROC_VERSION_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/evaluation-services/version-definitions/([A-Z0-9]){1,18}$`, 'i');
  const GET_CALC_PROC_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/evaluation-services/([A-Z0-9]){1,18}$`, 'i');
  const POST_CALC_PROC_VERSION_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/evaluation-services/version-definitions$`, 'i');
  const SEARCH_CALCULATION_PROCEDURES_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/evaluation-services$`, 'i');
  const SIMULATION_EVALUATION_SERVICE_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/evaluation-services/version-definitions/([A-Z0-9]){1,18}/simulation$`, 'i');
  const POST_INVOKE_EXPRESSION_SET_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/expressionSet/(.+?)$`, 'i');
  const SEARCH_DECISION_MATRICES_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/decision-matrices`, 'i');
  const SEARCH_DECISION_TABLES_PATH = new RegExp(`${CONNECT_BASE_URI}/omnistudio/decision-tables`, 'i');
  const SEARCH_MESSAGE_TEMPLATES_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/explainability/message-templates`, 'i');
  const GET_EXPLAINABILITY_LOGS_PATH = new RegExp(`${CONNECT_BASE_URI}/business-rules/explainability/logs`, 'i');
  const GET_ACTION_PLAN_STATUS_INFO_PATH = new RegExp(`${CONNECT_BASE_URI}/action-plan/([A-Z0-9]){15,18}/status-info`, 'i');
  const GET_ACTION_PLANS_PATH = new RegExp(`${CONNECT_BASE_URI}/action-plan$`, 'i');
  const GET_ACTION_PLAN_ITEMS_PATH = new RegExp(`${CONNECT_BASE_URI}/action-plan/([A-Z0-9]){15,18}/action-plan-items$`, 'i');
  const GET_ACTION_PLAN_TEMPLATE_ITEMS_LABEL_PATH = new RegExp(`${CONNECT_BASE_URI}/action-plan-template-version/([A-Z0-9]){15,18}$`, 'i');
  const UPDATE_ACTION_PLAN_TEMPLATE_TASKS = new RegExp(`${CONNECT_BASE_URI}/action-plan-template-update/([A-Z0-9]){15,18}$`, 'i');
  const UPDATE_ACTION_PLAN_TASKS = new RegExp(`${CONNECT_BASE_URI}/action-plan-update/([A-Z0-9]){15,18}$`, 'i');
  const GET_CARE_PLAN_PATH = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/care-plans/([A-Z0-9]{15,18})$`, 'i');
  const GET_CARE_PLAN_TEMPLATE_DETAILS = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/careplan-templates/([A-Z0-9]){15,18}$`, 'i');
  const GET_CARE_PLAN_DEFINITION = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/definitions/([A-Z0-9]{15,18})$`, 'i');
  const POST_CARE_PLAN_TEMPLATE_DETAILS = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/careplan-templates/([A-Z0-9]){15,18}/actions/([A-Z]){1,128}$`, 'i');
  const POST_CARE_SERVICE_PLAN_DETAILS = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/care-plans$`, 'i');
  const UPDATE_CARE_PLAN_DETAILS = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/care-plans/([A-Z0-9]{15,18})$`, 'i');
  const GET_CARE_PLAN_BENEFIT_SESSION = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/benefit-session/([A-Z0-9]{15,18})$`, 'i');
  const GET_CARE_PLAN_TASK = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/care-plans/([A-Z0-9]{15,18})/tasks$`, 'i');
  const POST_CARE_PLAN_TASK = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/care-plans/([A-Z0-9]{15,18})/tasks$`, 'i');
  const UPDATE_CARE_PLAN_TASK = new RegExp(`${PSS_SOCIAL_CARE_BASE_URI}/care-plans/([A-Z0-9]{15,18})/tasks$`, 'i');
  const CREATE_BENEFIT_DISBURSEMENTS = new RegExp(`${CONNECT_BASE_URI}/benefit-assignment/([A-Z0-9]{15,18})/benefit-disbursements$`, 'i');
  const MARKETING_INTEGRATION_GET_FORM_PATH = new RegExp(`${SITES_BASE_URI}/([A-Z0-9]){15,18}/marketing-integration/forms/([A-Z0-9]){15,18}$`, 'i');
  const MARKETING_INTEGRATION_SUBMIT_FORM_PATH = new RegExp(`${SITES_BASE_URI}/([A-Z0-9]){15,18}/marketing-integration/forms/([A-Z0-9]){15,18}/data`, 'i');
  const MARKETING_INTEGRATION_SAVE_FORM_PATH = new RegExp(`${SITES_BASE_URI}/([A-Z0-9]){15,18}/marketing-integration/forms$`, 'i');
  const JOIN_CALL_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/video-call/join-call`, 'i');
  const LEAVE_CALL_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/video-call/leave-call`, 'i');
  const TRANSCRIPTION_CALL_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/video-call/transcription`, 'i');
  const VIDEO_PARTICIPANT_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/video-call/participant`, 'i');
  const VIDEO_CALL_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/video-call`, 'i');
  const FEATURE_VALIDATION_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/feature-validation`, 'i');
  const HPI_SCORE_PATH = new RegExp(`${CONNECT_BASE_URI}/health/uhs/actions`, 'i');
  const GET_PATIENT_LIST_SCORE = new RegExp(`${CONNECT_BASE_URI}/health/uhslist/[A-Z0-9_-]`, 'i');
  const GET_PATIENT_SCORE_APEX_PATH = new RegExp(`${CONNECT_BASE_URI}/health/uhsscore/apexinterface/[A-Z0-9_-]`, 'i');
  const GET_TAGS_BY_RECORD_PATH = new RegExp(`${CONNECT_BASE_URI}/interest-tags/assignments/entity/([A-Z0-9_]){1,80}$`, 'i');
  const GET_RECORDS_BY_TAGID_PATH = new RegExp(`${CONNECT_BASE_URI}/interest-tags/assignments/tag/([A-Z0-9_]){1,80}$`, 'i');
  const GET_TAGS_BY_CATEGORYID_PATH = new RegExp(`${CONNECT_BASE_URI}/interest-tags/tags$`, 'i');
  const GET_CATEGORIES_BY_TAGID_PATH = new RegExp(`${CONNECT_BASE_URI}/interest-tags/categories$`, 'i');
  const CREATE_INTEREST_TAG_ENTITY_ASSIGNMENT_PATH = new RegExp(`${CONNECT_BASE_URI}/interest-tags/assignments`, 'i');
  const LOYALTY_PROGRAM_PROCESS_RULE_CREATION = new RegExp(`${CONNECT_BASE_URI}/loyalty/programs/([A-Z0-9_]){1,80}/processes/([A-Za-z0-9_%]){1,80}$`, 'i');
  const LOYALTY_PROGRAM_PROCESS_RULE = new RegExp(`${CONNECT_BASE_URI}/loyalty/programs/([A-Z0-9_]){1,80}/processes/([A-Za-z0-9_%]){1,80}/rule/([A-Za-z0-9_%]){1,80}$`, 'i');
  const LOYALTY_PROGRAM_EXECUTION = new RegExp(`${CONNECT_BASE_URI}/realtime/loyalty/programs/([A-Za-z%0-9_]){1,80}$`, 'i');
  const LOYALTY_PROGRAM_EXPLAINABILITY = new RegExp(`${CONNECT_BASE_URI}/loyalty/program-process/transaction-journals/([A-Z0-9]){15,18}$`, 'i');
  const CIB_GET_CONTACTS_INTERACTIONS_PATH = new RegExp(`${CIB_BASE_URI}/contacts-interactions$`, 'i');
  const CIB_GET_INTERACTION_INSIGHTS_PATH = new RegExp(`${CIB_BASE_URI}/interaction-insights/([A-Z0-9]){15,18}$`, 'i');
  const CIB_GET_DEAL_PARTIES_PATH = new RegExp(`${CIB_BASE_URI}/deal-parties/([A-Z0-9]){15,18}$`, 'i');
  const TEARSHEET_GET_TEARSHEETS_PATH = new RegExp(`${CONNECT_BASE_URI}/financialservices/tearsheets/([A-Z0-9]){15,18}$`, 'i');
  const SERVICEPROCESS_GET_CASE_SERVICE_PROCESS_PATH = new RegExp(`${CONNECT_BASE_URI}/service-excellence/service-catalog-request/layout-data/case/([A-Z0-9]){15,18}$`, 'i');
  const SERVICEPROCESS_GET_SERVICE_PROCESS_DEFINITION_PATH = new RegExp(`${CONNECT_BASE_URI}/service-excellence/service-process-definition$`, 'i');
  const ACTIONABLE_LIST_DEFINITION_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list-definition$`, 'i');
  const ACTIONABLE_LIST_BULK_ACTION_PLAN_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/bulk-action/create-bulk-actionplans$`, 'i');
  const ACTIONABLE_LIST_GET_ACTIONABLE_LIST_MEMBERS_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list/([A-Z0-9]){15,18}/members$`, 'i');
  const UPSERT_ACTIONABLE_LIST_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list$`, 'i');
  const ACTIONABLE_LIST_DATASET_INFO_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list-definition/rows$`, 'i');
  const UPSERT_AL_DATASET_COLUMN_USER_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list-dataset-column-user-assignment$`, 'i');
  const AL_FILTER_TEMPLATE_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list-def-filter$`, 'i');
  const AL_FILTER_TEMPLATE_URI_PATH_WITH_PARAM = new RegExp(`${CONNECT_BASE_URI}/actionable-list-def-filter/([A-Z0-9]){1,64}$`, 'i');
  const AL_GET_FILTER_TEMPLATE_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/get-actionable-list-def-filters$`, 'i');
  const UPSERT_AL_REFRESH_COUNT_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list-refresh-count$`, 'i');
  const CLM_CONTRACT_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract/([A-Z0-9]){15,18}/contract-document-version$`, 'i');
  const CLM_CONTRACT_URI_CC_USER_PATH = new RegExp(`${CLM_BASE_URI}/cc/contract/([A-Z0-9]){15,18}/contract-document-version$`, 'i');
  const CLM_CONTRACT_GET_RECIPIENT_STATUS_URI_PATH = new RegExp(`${CLM_BASE_URI}/cc/documentRecipient$`, 'i');
  const CLM_CONTRACT_GET_EXTERNAL_DOC_URI_PATH = new RegExp(`${CLM_BASE_URI}/cc/external-document$`, 'i');
  const CLM_GET_DOCUMENT_URI_PATH = new RegExp(`${CLM_BASE_URI}/document-template$`, 'i');
  const CLM_UPDATE_DOCUMENT_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}$`, 'i');
  const CLM_CONTRACT_CHECKIN_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}/checkIn$`, 'i');
  const CLM_CONTRACT_UNLOCK_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}/unlock$`, 'i');
  const CLM_CONTRACT_LOCK_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}/lock$`, 'i');
  const CLM_CONTRACT_EXTERNAL_REVIEW_DOCUMENT_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}/externalReviewDocument$`, 'i');
  const CLM_CONTRACT_CHECKOUT_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}/checkout$`, 'i');
  const CLM_CONTENT_DOCUMENTS = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}/content-documents$`, 'i');
  const CLM_CONTRACT_REVIEW_PATH = new RegExp(`${CLM_BASE_URI}/contract-document-version/([A-Z0-9]){1,18}/review$`, 'i');
  const CLM_CREATE_EXTRACTION_CONTEXT_MAPPINGS_PATH = new RegExp(`${CLM_BASE_URI}/extraction-context-mappings$`, 'i');
  const CLM_EXTRACTION_CONTEXT_MAPPINGS_PATH = new RegExp(`${CLM_BASE_URI}/extraction-context-mappings/([A-Z0-9]){1,18}$`, 'i');
  const CLM_GET_DOCUMENT_GENERATION_PROCESS_PATH = new RegExp(`${CLM_BASE_URI}/document-generation-process/status$`, 'i');
  const CLM_GET_CONTRACT_ACTIONS_PATH = new RegExp(`${CLM_BASE_URI}/contract/([A-Z0-9]){1,18}/contract-actions$`, 'i');
  const CLM_CONTRACT_EXECUTE_ACTION_URI_PATH = new RegExp(`${CLM_BASE_URI}/contract/([A-Z0-9]){1,18}$`, 'i');
  const SAVE_EXTERNAL_DOCUMENT_URI_PATH = new RegExp(`${CLM_BASE_URI}/external-document-resource$`, 'i');
  const UPLOAD_REFERENCE_DATA_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/reference-data/([A-Z]){2,40}/upload$`, 'i');
  const FETCH_ENTITY_VERSION_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/reference-data/v2/entitySection/([A-Za-z]){2,40}/dataSource/([A-Za-z]){2,80}/version$`, 'i');
  const UPLOAD_ENTITY_VERSION_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/reference-data/v2/entityVersion/upload$`, 'i');
  const UPLOAD_DATASETS_VERSION_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/reference-data/v3/entityVersion/upload$`, 'i');
  const GET_DATASETS_VERSION_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/reference-data/v3/entitySection/([A-Za-z]){2,40}$`, 'i');
  const GENERATE_CALCULATION_CSV_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/calculation-csv-export/export$`, 'i');
  const BEI_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/bei/recalculate/([A-Z0-9]){1,18}$`, 'i');
  const RCG_TPM_MANAGEMENT_PATH = new RegExp(`${RCG_TENANTMANAGEMENT_BASE_URI}/tenant-registration$`, 'i');
  const RECALCULATE_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/footprint-calculation/recalculate`, 'i');
  const LOCK_RECORD_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/record-locking/lock/([A-Z0-9]){1,18}$`, 'i');
  const UNLOCK_RECORD_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/record-locking/unlock/([A-Z0-9]){1,18}$`, 'i');
  const IDENTIFY_VERIFICATION_BUILD_CONTEXT_PATH = new RegExp(`${IDENTITY_VERIFICATION_BASE_URI}/build-context/([A-Za-z0-9])+`, 'i');
  const DGF_DATE_ISSUE_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/dgf/identify-date-issues`, 'i');
  const DGF_DATAGAP_PATH = new RegExp(`${CONNECT_BASE_URI}/sustainability/dgf/compute-datagap-fillers`, 'i');
  const IDENTIFY_VERIFICATION_SEARCH_PATH = new RegExp(`${IDENTITY_VERIFICATION_BASE_URI}/search`, 'i');
  const IDENTIFY_VERIFICATION_VERIFY_RECORD_PATH = new RegExp(`${IDENTITY_VERIFICATION_BASE_URI}/verification`, 'i');
  const FORM_BASED_VERIFICATION_VERIFY_RECORD_PATH = new RegExp(`${IDENTITY_VERIFICATION_BASE_URI}/input-verification`, 'i');
  const AUDIT_TRAIL_EXPORT_DELETE_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/audit-trail-exports/([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}$`, 'i');
  const AUDIT_TRAIL_EXPORT_GET_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/audit-trail-exports`, 'i');
  const CDP_SALES_EXCELLENCE_CREATE_ACTIONABLE_LIST_RECORDS = new RegExp(`${CDP_SALES_EXCELLENCE_BASE_URI}/create-records`, 'i');
  const CDP_SALES_EXCELLENCE_GET_SEGMENT_DETAILS = new RegExp(`${CDP_SALES_EXCELLENCE_BASE_URI}/segments`, 'i');
  const CDP_SALES_EXCELLENCE_SEGMENT_PREVIEW = new RegExp(`${CDP_SALES_EXCELLENCE_BASE_URI}/segment-preview`, 'i');
  const AUDIT_TRAIL_EXPORT_DOWNLOAD_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/audit-trail-exports/([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}/download$`, 'i');
  const FILEBASED_DATAIMPORT_START_SIMPLE_IMPORT_PATH = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/simpleImport`, `i`);
  const FILEBASED_DATAIMPORT_START_ADVANCE_IMPORT_PATH = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/advanceImport`, `i`);
  const SERVICE_EMPLOYEE_GET_FIELD_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/employee-hub/employee-profile-card/employee-details`, 'i');
  const SERVICE_EMPLOYEE_GET_USER_PROFILE_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/employee-hub/profile/user/([A-Z0-9]){1,18}$`, 'i');
  const SERVICE_EMPLOYEE_GET_USER_SETTINGS_PATH = new RegExp(`${CONNECT_BASE_URI}/service-employee/user-settings/details`, `i`);
  const SERVICE_EMPLOYEE_UPDATE_USER_SETTINGS_PATH = new RegExp(`${CONNECT_BASE_URI}/service-employee/user-settings`, `i`);
  const SERVICE_EMPLOYEE_GET_AVAILABLE_OPTIONS_PATH = new RegExp(`${CONNECT_BASE_URI}/serviceEmployee/availableUserOptions`, `i`);
  const SERVICE_EMPLOYEE_POST_PROVISIONING_JOB = new RegExp(`${CONNECT_BASE_URI}/service-employee/employee-user-provisioning$`, `i`);
  const FILEBASED_DATAIMPORT_GET_PATH = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}$`, 'i');
  const FILEBASED_DATAIMPORT_TEST_PATH = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/test`, 'i');
  const FILEBASED_DATAIMPORT_POST_PATH = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}$`, 'i');
  const FILEBASED_DATAIMPORT_GET_CSV_PREVIEW_PATH = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/([A-Za-z0-9]){15,18}/preview$`, 'i');
  const FILEBASED_DATAIMPORT_GET_PATCH_DELETE_ENTITIES_BY_ID = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/([A-Za-z0-9]){15,18}$`, 'i');
  const FILEBASED_DATAIMPORT_GET_FIELDS = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/entities/([A-Za-z0-9_])+/fields$`, 'i');
  const FILEBASED_DATAIMPORT_GET_AUTO_MAPPING = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/automap$`, 'i');
  const FILEBASED_DATAIMPORT_GET_DPE_DEFINITIONS = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/dpeDefinitions$`, 'i');
  const FILEBASED_DATAIMPORT_GET_ENTITIES = new RegExp(`${FILEBASED_DATAIMPORT_BASE_URI}/entities$`, 'i');
  const SALES_EXCELLENCE_ACTIONABLE_LIST_MEMBER_SEARCH = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-list-members`, 'i');
  const SALES_EXCELLENCE_ACTIONABLE_LIST_MEMBER_SEARCH_BY_ID = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-list-members/([A-Za-z0-9_]){1,255}`, 'i');
  const SALES_EXCELLENCE_ASSIGN_ACTIONABLE_LIST = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-list/assignment/([A-Za-z0-9_]){1,255}`, 'i');
  const SALES_EXCELLENCE_ASSIGNED_ACTIONABLE_LISTS = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-lists$`, 'i');
  const SALES_EXCELLENCE_GET_ACTIONABLE_LIST_METADATA = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-lists/metadata/([A-Za-z0-9_]){1,255}$`, 'i');
  const SALES_EXCELLENCE_GET_ALM_QUEUES = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-list-member/queues`, 'i');
  const GET_FIELD_SETS_PATH = new RegExp(`${CONNECT_BASE_URI}/fieldset/[A-Za-z]([A-Za-z0-9_]){1,39}$`, 'i');
  const SALES_EXCELLENCE_GET_ACTIONABLE_LIST_KPI_MAPPING = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-list/key-performance-indicators/mappings`, 'i');
  const SALES_EXCELLENCE_GET_ACTIONABLE_LIST_KPI_BAR = new RegExp(`${SALES_EXCELLENCE_BASE_URI}/actionable-list/kpi`, 'i');
  const OMNI_ANALYTICS_FETCH_OMNIANALYTICS_LOGS = new RegExp(`${OMNI_ANALYTICS_BASE_URI}/get-analytics-logs`, 'i');
  const OMNI_ANALYTICS_STORE_OMNIANALYTICS_LOGS = new RegExp(`${OMNI_ANALYTICS_BASE_URI}/analytics-logs`, 'i');
  const OMNI_ANALYTICS_FETCH_OMNIANALYTICS_METADATA = new RegExp(`${OMNI_ANALYTICS_BASE_URI}/analytics-metadata`, 'i');
  const TIMELINE_PATH = new RegExp(`${CONNECT_BASE_URI}/timeline/([A-Z0-9]){15,18}/timeline-definitions/([A-Za-z0-9_]){1,255}/events`, 'i');
  const TIMELINE_METADATA_PATH = new RegExp(`${CONNECT_BASE_URI}/timeline/metadata/configurations`, 'i');
  const ENGAGEMENT_EVENT_TIMELINE_PATH = new RegExp(`${CONNECT_BASE_URI}/timeline/([A-Za-z0-9]){15,18}/timeline-definitions/([A-Za-z0-9_]){1,255}/cust-data-pfrm/events`, 'i');
  const TIMELINE_ENGAGEMENT_EVENT_METADATA_PATH = new RegExp(`${CONNECT_BASE_URI}/timeline/cust-data-pfrm/data-model-objects`, 'i');
  const TIMELINE_DATA_GRAPH_METADATA_PATH = new RegExp(`${CONNECT_BASE_URI}/timeline/cust-data-pfrm/data-graph-metadata`, 'i');
  const CRITERIABASEDSEARCHFILTER_CONFIGURATIONS_PATH = new RegExp(`${CONNECT_BASE_URI}/criteria-based-search/configurations`, 'i');
  const CRITERIABASEDSEARCHFILTER_SEARCH_OBJECT_PATH = new RegExp(`${CONNECT_BASE_URI}/criteria-based-search/searchable-object/results`, 'i');
  const AI_ACCELERATOR_PREDICTIONS = new RegExp(`${CONNECT_BASE_URI}/aiaccelerator/predictions`, 'i');
  const AI_ACCELERATOR_RECOMMENDATIONS = new RegExp(`${CONNECT_BASE_URI}/aiaccelerator/recommendations`, 'i');
  const AI_ACCELERATOR_GET_PREDICTIONS = new RegExp(`${CONNECT_BASE_URI}/aiaccelerator/v2/predictions`, 'i');
  const GET_STARTER_TEMPLATE_BYID_PATH = new RegExp(`${ASSETCREATION_BASE_URI}/starter-templates/([A-Z0-9]){1,18}$`, 'i');
  const GET_STARTER_TEMPLATES_PATH = new RegExp(`${ASSETCREATION_BASE_URI}/starter-templates$`, 'i');
  const POST_ASSET_OBJECT_PATH = new RegExp(`${ASSETCREATION_BASE_URI}/objects`, 'i');
  const MANAGED_CONTENT_ORCHESTRATION_DEFINITIONS_PATH = new RegExp(`${CMS_BASE_URI}/contents/orchestration-definitions$`, 'i');
  const MANAGED_CONTENT_ORCHESTRATION_INSTANCES_PATH = new RegExp(`${CMS_BASE_URI}/contents/orchestration-instances$`, 'i');
  const DELETE_MANAGED_CONTENT_ORCHESTRATION_INSTANCES_PATH = new RegExp(`${CMS_BASE_URI}/contents/orchestration-instances/([A-Z0-9]){1,18}$`, 'i');
  const MANAGED_CONTENT_CHANNEL_MANAGEMENT_PATH = new RegExp(`${CMS_BASE_URI}/channels$`, 'i');
  const MANAGED_CONTENT_CHANNEL_MANAGEMENT_RECORD_PATH = new RegExp(`${CMS_BASE_URI}/channels/([A-Z0-9]){15,18}$`, 'i');
  const MANAGED_CONTENT_RUNNING_ORCHESTRATION_HISTORY_PATH = new RegExp(`${CMS_BASE_URI}/contents/orchestration-history-events`, 'i');
  const MANAGED_CONTENT_TYPE_FOR_MIXIN_PATH = new RegExp(`${CMS_BASE_URI}/spaces/([A-Z0-9]){15,18}/content-types$`, 'i');
  const GET_SLOTS_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/get-slots`, 'i');
  const GET_SLOT_CHAINS_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/get-slot-chains`, 'i');
  const CANCEL_SLOT_CHAIN_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/cancel-slot-chain`, 'i');
  const BOOK_SLOTS_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/book-slot-chain`, 'i');
  const RESCHEDULE_SLOT_CHAIN_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/reschedule-slot-chain`, 'i');
  const FETCH_SERVICE_TERRITORY_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/fetch-service-territories`, 'i');
  const MOVE_TO_NEXT_STEP_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/move-to-next-step`, 'i');
  const TRIGGER_ON_DEMAND_COMPUTATION_PATH = new RegExp(`${SALES_ENABLEMENT_BASE_URI}/on-demand-computation/programs/([A-Za-z0-9_]){1,20}`, 'i');
  const GET_CONTRIBUTING_RECORDS_INFO_PATH = new RegExp(`${SALES_ENABLEMENT_BASE_URI}/contributing-records/taskMeasureProgress/([A-Za-z0-9_]){1,20}`, 'i');
  const GET_SALES_ENABLEMENT_PROGRAM_TEMPLATE_PATH = new RegExp(`${SALES_ENABLEMENT_BASE_URI}/programTemplate/([A-Za-z0-9_]){1,100}$`, 'i');
  const WORKTYPE_LEADTIME_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/worktype-leadtime`, 'i');
  const VALIDATE_SLOT_CHAIN_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/validate-slot-chain`, 'i');
  const ADHOC_TASKS_ATM_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/adhoc-tasks-atm`, 'i');
  const QUOTAS_AND_ALLOCATION_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/quotas-and-allocations`, 'i');
  const DIGITAL_VERIFICATION_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/advanced-therapy-management/digital-verification`, 'i');
  const GET_SALES_ENABLEMENT_PROGRAM_TEMPLATES_PATH = new RegExp(`${SALES_ENABLEMENT_BASE_URI}/programTemplate`, 'i');
  const DELETE_SALES_USER_WORKING_HOURS_PATH = new RegExp(`${BASE_URI}/sales/working-hours/time-slots/([A-Za-z0-9_]){1,100}$`, 'i');
  const GET_SALES_USER_WORKING_HOURS_PATH = new RegExp(`${BASE_URI}/sales/working-hours/time-slots`, 'i');
  const PATCH_SALES_USER_WORKING_HOURS_PATH = new RegExp(`${BASE_URI}/sales/working-hours/time-slots`, 'i');
  const POST_SALES_USER_WORKING_HOURS_PATH = new RegExp(`${BASE_URI}/sales/working-hours/time-slots`, 'i');
  const GET_ENGAGEMENT_WORKSPACE_OBJECTS_PATH = new RegExp(`${BASE_URI}/engagement-workspace/objects`, 'i');
  const ENGAGEMENT_WORKSPACE_PERSONALIZATION_PATH = new RegExp(`${BASE_URI}/engagement-workspace/workspace-personalization`, 'i');
  const CREDENTIAL_PATH = new RegExp(`${NAMED_CREDENTIAL_BASE_URI}/credential$`, 'i');
  const OAUTH_CREDENTIAL_AUTH_URL_PATH = new RegExp(`${NAMED_CREDENTIAL_BASE_URI}/credential/auth-url/o-auth$`, 'i');
  const EXTERNAL_CREDENTIAL_PATH = new RegExp(`${NAMED_CREDENTIAL_BASE_URI}/external-credentials$`, 'i');
  const EXTERNAL_CONNECTIVITY_CONNECTION_LIST_PATH = new RegExp(`${EXTERNAL_CONNECTIVITY_BASE_URI}/connections$`, 'i');
  // can be 15-18 char Id or developerName which max length is 255
  const EXTERNAL_CONNECTIVITY_CONNECTION_DETAIL_PATH = new RegExp(`${EXTERNAL_CONNECTIVITY_BASE_URI}/connections/([A-Za-z0-9_]){1,255}`, 'i');
  // can be 15-18 char Id or developerName which max length is 255
  const EXTERNAL_CONNECTIVITY_CONNECTION_DELETE_PATH = new RegExp(`${EXTERNAL_CONNECTIVITY_BASE_URI}/connections/delete/([A-Za-z0-9_]){1,255}`, 'i');
  // can be 15-18 char developerName which max length is 255
  const EXTERNAL_CONNECTIVITY_CONNECTION_TEST_PATH = new RegExp(`${EXTERNAL_CONNECTIVITY_BASE_URI}/connections/([A-Za-z0-9_]){1,255}/test$`, 'i');
  const EXTERNAL_CONNECTIVITY_CONNECTOR_LIST_PATH = new RegExp(`${EXTERNAL_CONNECTIVITY_BASE_URI}/connectors$`, 'i');
  // can be 15-18 char Id or developerName which max length is 255
  const EXTERNAL_CONNECTIVITY_CONNECTOR_DETAIL_PATH = new RegExp(`${EXTERNAL_CONNECTIVITY_BASE_URI}/connectors/([A-Za-z0-9_]){1,255}`, 'i');
  const EXTERNAL_SERVICES_DATA_SHAPE_PATH = new RegExp(`${EXTERNAL_SERVICES_BASE_URI}/inference/datashape/([A-Za-z0-9]){1,15}$`, 'i');
  const EXTERNAL_SERVICES_OPENAPI_SPEC_PATH = new RegExp(`${EXTERNAL_SERVICES_BASE_URI}/inference/openapispec/([A-Za-z0-9_]){1,15}$`, 'i');
  // actionName = externalServiceRegistrationName.operationName. Up to 510 characters, with a minimum of 3 characters., the operation name can have special characters that aren't escpaed so have to match everything.
  const EXTERNAL_SERVICES_ACTION_DETAILS_PATH = new RegExp(`${EXTERNAL_SERVICES_BASE_URI}/actions/services/(.){3,510}$`, 'i');
  const EXTERNAL_SERVICES_SEND_REQUEST_PATH = new RegExp(`${EXTERNAL_SERVICES_BASE_URI}/inference/datashape/([A-Za-z0-9]){1,15}/sendrequest$`, 'i');
  const EXTERNAL_SERVICES_STATISTICS_PATH = new RegExp(`${EXTERNAL_SERVICES_BASE_URI}/statistics/services$`, 'i');
  // upper limit for registrationName is 97 = 15 (namespace prefix) + 2 ("__" separator) + 80 (external service developer name)
  const EXTERNAL_SERVICES_STATISTICS_FOR_SERVICE_PATH = new RegExp(`${EXTERNAL_SERVICES_BASE_URI}/statistics/services/([A-Z0-9_]){1,97}$`, 'i');
  const EXTERNAL_SERVICES_VALIDATE_SCHEMA_PATH = new RegExp(`${EXTERNAL_SERVICES_BASE_URI}/schemas/([A-Z0-9_]){1,97}/validation`, 'i');
  const GET_COMMUNITY_INFO_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([A-Z0-9]){15,18}`, 'i');
  const STAGE_MGMT_KANBAN_VIEW_PATH = new RegExp(`${STAGE_MANAGEMENT_BASE_URI}/kanban-view/([A-Z0-9]){1,18}$`, 'i');
  const GET_SIGNER_ROLES = new RegExp(`${E_SIGN_BASE_URI}/signer-roles`, 'i');
  const SEND_DOCUMENT_ENVELOPE_FOR_ESIGN = new RegExp(`${E_SIGN_BASE_URI}/signature-requests/([A-Z0-9]){15,18}/envelope/send`, 'i');
  const GET_NOTIFICATION_SETTING = new RegExp(`${E_SIGN_BASE_URI}/notification-settings`, 'i');
  const GET_RECIPIENT = new RegExp(`${E_SIGN_BASE_URI}/recipients`, 'i');
  const GET_DOCUMENTS = new RegExp(`${E_SIGN_BASE_URI}/documents`, 'i');
  const UPDATE_DOCUMENT_ENVELOPE_FOR_ESIGN = new RegExp(`${E_SIGN_BASE_URI}/signature-requests/([A-Z0-9]){15,18}/envelopes/void`, 'i');
  const UPDATE_ENVELOPE_STATUS = new RegExp(`${E_SIGN_BASE_URI}/signature-requests/([A-Z0-9]){15,18}/envelopes/status`, 'i');
  // Clause Library Routes
  const GET_CLAUSE_CATEGORY_CONFIGS = new RegExp(`${CLAUSE_LIBRARY_BASE_URI}/clause-category-configurations`, 'i');
  const GET_DOCUMENT_CLAUSE_SETS = new RegExp(`${CLAUSE_LIBRARY_BASE_URI}/document-clause-sets`, 'i');
  const GET_DOCUMENT_CLAUSE_FIELDS = new RegExp(`${CLAUSE_LIBRARY_BASE_URI}/document-clauses/fields`, 'i');
  const POST_PROMOTE_DOCUMENT_CLAUSE_PATH = new RegExp(`${CLAUSE_LIBRARY_BASE_URI}/promote-clause`, 'i');
  const POST_CONTENT_LINK_LOAD_PATH = new RegExp(`${CONTENT_LINK_BASE_URI}/load`, 'i');
  const POST_DOCUMENT_COMPARE_PATH = new RegExp(`${DOCGEN_BASE_URI}/document-compare`, 'i');
  const SERVICE_EXCELLENCE_SET_USER_PREFERENCE_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/user-preference`, 'i');
  const SERVICE_EXCELLENCE_FETCH_USER_PREFERENCE_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/fetch-user-preference`, 'i');
  const SERVICE_EXCELLENCE_RECENT_ACTIONS_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/service-catalog-items/recent-actions`, 'i');
  const SERVICE_EXCELLENCE_ACTION_LAUNCH_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/service-catalog-items/action-launch`, 'i');
  const SERVICE_EXCELLENCE_ACTION_LAUNCHER_RECOMMENDATIONS_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/action-launcher-recommendations`, 'i');
  const SERVICE_EXCELLENCE_GET_SERVICE_CATALOG_ITEMS_PATH = new RegExp(`${SERVICE_EXCELLENCE_BASE_URI}/service-catalog-items/([A-Z0-9]){15,18}$`, 'i');
  const FETCH_ENTITY_DETAILS_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/fetch-entity-details`, 'i');
  const EPC_PRODUCT_ATTRIBUTE_DEFINITION_PATH = new RegExp(`${EPC_BASE_URI}/product-attribute-definition`, 'i');
  const DECISION_TABLE_BY_ID_PATH = new RegExp(`${DECISIONTABLE_BASE_URI}/decision-table/definitions/([A-Z0-9]){15,18}`, 'i');
  const DECISION_TABLE_TEMPLATES_LIST_PATH = new RegExp(`${DECISIONTABLE_BASE_URI}/decision-table/templates$`, 'i');
  const DECISION_TABLE_TEMPLATES_DEFINITION_PATH = new RegExp(`${DECISIONTABLE_BASE_URI}/decision-table/templates/(.){1,512}`, 'i');
  const DECISION_TABLE_ROW_UPLOAD_PATH = new RegExp(`${DECISIONTABLE_BASE_URI}/decision-table/([A-Z0-9]){15,18}/data$`, 'i');
  const EPC_DEACTIVATE_PATH = new RegExp(`${EPC_BASE_URI}/actions/deactivate`, 'i');
  const EPC_PRODUCT_FLOW_PATH = new RegExp(`${EPC_BASE_URI}/products/([A-Z0-9]){15,18}/flow$`, 'i');
  const EPC_PRODUCT_ATTRIBUTES_PATH = new RegExp(`${EPC_BASE_URI}/product/([A-Z0-9]){15,18}/attributes$`, 'i');
  const EPC_PRODUCT_BY_ID_PATH = new RegExp(`${EPC_BASE_URI}/products/([A-Z0-9]){15,18}$`, 'i');
  const EPC_CONTEXT_DEFINITION_BY_ID_PATH = new RegExp(`${EPC_BASE_URI}/configurationRule/context-definition/([A-Z0-9]){15,18}$`, 'i');
  const EPC_CONFIG_RULE_METADATA_PATH = new RegExp(`${EPC_BASE_URI}/configurationRule/config-rule-metadata/([A-Za-z]){5,50}/([A-Za-z]){5,50}$`, 'i');
  const EPC_RUNTIME_CATALOG_GET_SNAPSHOTS_PATH = new RegExp(`${EPC_BASE_URI}/index/snapshots`, 'i');
  const EPC_RUNTIME_CATALOG_GET_INDEX_CONFIGURATIONS_PATH = new RegExp(`${EPC_BASE_URI}/index/configurations`, 'i');
  const EPC_RUNTIME_CATALOG_PUT_INDEX_CONFIGURATIONS_PATH = new RegExp(`${EPC_BASE_URI}/index/configurations`, 'i');
  const EPC_RUNTIME_CATALOG_DEPLOY_SNAPSHOT_INDEX_PATH = new RegExp(`${EPC_BASE_URI}/index/deploy`, 'i');
  const EPC_GET_RELATED_RECORDS_PATH = new RegExp(`${EPC_BASE_URI}/relatedRecords/([A-Za-z0-9]+)$`, 'i');
  const GET_ERI_DIGEST_PATH = new RegExp(`${ERI_BASE_URI}/digest`, 'i');
  const NOTIFICATION_SERVICE_CONFIG_PATH = new RegExp(`${CONNECT_BASE_URI}/notification_service/config`, 'i');
  const GET_PEOPLE_API_PATH = new RegExp(`${PEOPLE_API_BASE_URI}`, 'i');
  const POST_EVALUATE_LEARNING_ITEM_PATH = new RegExp(`${LEARNING_ITEM_BASE_URI}/learning-item/([A-Z0-9]){15,18}/actions/evaluate$`, 'i');
  const SELF_ENROLL_IN_ENABLEMENT_PROGRAM_PATH = new RegExp(`${ENABLEMENT_BASE_URI}/program/([A-Z0-9]){15,18}/actions/enroll$`, 'i');
  const UNENROLL_FROM_ENABLEMENT_PROGRAM_PATH = RegExp(`${ENABLEMENT_BASE_URI}/program/([A-Z0-9]){15,18}/actions/unenroll$`, 'i');
  const ENABLEMENT_PROGRAM_SUMMARY_PATH = new RegExp(`${ENABLEMENT_BASE_URI}/program/summary/([A-Z0-9]){15,18}$`, 'i');
  const ENABLEMENT_PROGRAM_SUMMARY_COLLECTION_PATH = new RegExp(`${ENABLEMENT_BASE_URI}/program/summary/collection$`, 'i');
  const ENABLEMENT_PROGRAM_SUMMARY_COLLECTION_PATH_FOR_COMMUNITY_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([a-zA-Z0-9]){15,18}/enablement/program/summary/collection$`, 'i');
  const SALES_EINSTEIN_COACH_CONFIGURATION_PATH = new RegExp(`${SALES_EINSTEIN_COACH_BASE_URI}/practice/configuration$`, 'i');
  const SALES_EINSTEIN_COACH_FEEDBACK_PATH = new RegExp(`${SALES_EINSTEIN_COACH_BASE_URI}/practice/feedback$`, 'i');
  const SALES_EINSTEIN_COACH_ROLE_PLAY_PATH = new RegExp(`${SALES_EINSTEIN_COACH_BASE_URI}/practice/roleplay$`, 'i');
  const SALES_EINSTEIN_COACH_ROLE_PLAY_SESSION_PATH = new RegExp(`${SALES_EINSTEIN_COACH_BASE_URI}/practice/roleplay/start$`, 'i');
  const ASSESSMENT_ENVELOPES_PATH = new RegExp(`${CONNECT_BASE_URI}/assessments/assessmentenvelopes`, 'i');
  const ASSESSMENT_CONTEXT_SEARCH_PATH = new RegExp(`${CONNECT_BASE_URI}/assessments/([A-Z0-9]){15,18}/assessment-elements`, 'i');
  const EXTERNAL_DOC_API_PATH = new RegExp(`${EXTERNAL_DOC_BASE_URI}`, 'i');
  const EXTERNAL_DOC_SAVE_API_PATH = new RegExp(`${EXTERNAL_DOC_BASE_URI}/save`, 'i');
  const EXTERNAL_DOC_USERS_API_PATH = new RegExp(`${EXTERNAL_DOC_BASE_URI}/users`, 'i');
  const DATALOADING_CSV_DATA_TEMPLATE_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/csv-data-template/([A-Za-z0-9_]){5,255}`, 'i');
  const DATA_PROVIDER_OUTPUT_SCHEMA_PATH = new RegExp(`${DATA_PROVIDER_BASE_URI}/([A-Z0-9_]){1,80}/schema$`, 'i');
  const FORMULA_GPT_SCHEMA_PATH = new RegExp(`${FORMULA_BASE_URI}/einstein/explain`, 'i');
  const FORMULA_GPT_FIX_FORMULA_SCHEMA_PATH = new RegExp(`${FORMULA_BASE_URI}/einstein/fix`, 'i');
  const FORMULA_VALIDATION_SCHEMA_PATH = new RegExp(`${FORMULA_BASE_URI}/validate`, 'i');
  const GET_INDUSTRIES_CONTEXT_SERVICE_ACCESS_PATH = new RegExp(`${CONNECT_BASE_URI}/contextservice/access/([A-Za-z_]){10,50}/([A-Za-z0-9]){5,50}$`, 'i');
  const PUT_INDUSTRIES_CONTEXT_SERVICE_ACCESS_PATH = new RegExp(`${CONNECT_BASE_URI}/contextservice/access/([A-Za-z_]){10,50}/([A-Za-z0-9]){5,50}$`, 'i');
  const INDUSTRIES_CONTEXT_QUERY_PATH = new RegExp(`${CONNECT_BASE_URI}/context/queryrecord`, 'i');
  const INDUSTRIES_CONTEXT_QUERY_RECORDS_PATH = new RegExp(`${CONNECT_BASE_URI}/contexts/query-records`, 'i');
  const INDUSTRIES_CONTEXT_SERVICE_UPGRADE_DEFINITION_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/upgrades$`, 'i');
  const CREATE_INDUSTRIES_CONTEXT_SERVICE_DEFINITION_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions`, 'i');
  const GET_INDUSTRIES_CONTEXT_DEFINITIONS_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions`, 'i');
  const GET_INDUSTRIES_CONTEXT_SERVICE_DEFINITION_INFO_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/info/([A-Za-z_0-9]){5,50}$`, 'i');
  const INDUSTRIES_CONTEXT_SERVICE_DEFINITION_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z_0-9]){5,50}$`, 'i');
  const INDUSTRIES_CONTEXT_SERVICE_TYPEAHEAD_API_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/dynamic-attributes$`, 'i');
  const CREATE_INDUSTRIES_CONTEXT_MAPPINGS_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/context-mappings$`, 'i');
  const INDUSTRIES_CONTEXT_MAPPINGS_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/context-mappings/([A-Za-z0-9]){15,18}$`, 'i');
  const CREATE_INDUSTRIES_CONTEXT_TAGS_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/context-tags$`, 'i');
  const INDUSTRIES_CONTEXT_TAGS_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/context-tags/([A-Za-z0-9]){15,18}$`, 'i');
  const GET_INDUSTRIES_CONTEXT_TAGS_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/context-tags$`, 'i');
  const GET_INDUSTRIES_CONTEXT_TRANSLATION_PATH = new RegExp(`${CONNECT_BASE_URI}/contexts/([A-Za-z0-9_-]){5,255}/context-mappings/([A-Za-z0-9]){15,18}/translate$`, 'i');
  const GET_INDUSTRIES_CONTEXT_RUNTIME_PATH = new RegExp(`${CONNECT_BASE_URI}/context/([A-Za-z0-9_]){5,255}`, 'i');
  const GET_INDUSTRIES_CONTEXT_INFO_RUNTIME_PATH = new RegExp(`${CONNECT_BASE_URI}/contexts/([A-Za-z0-9_]){5,255}`, 'i');
  const INDUSTRIES_CONTEXT_ATTRIBUTELIST_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/context-node-mappings/([A-Za-z0-9]){15,18}/context-attribute-mappings$`, 'i');
  const CREATE_INDUSTRIES_CONTEXT_ATTRIBUTENODE_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/contextmapping/attributenode$`, 'i');
  const INDUSTRIES_CONTEXT_ATTRIBUTENODE_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/contextmapping/attributenode/([A-Za-z0-9]){15,18}$`, 'i');
  const INDUSTRIES_CONTEXT_ATTRIBUTE_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/context-node-mappings/([A-Za-z0-9]){15,18}/context-attribute-mappings/([A-Za-z0-9]){15,18}$`, 'i');
  const CREATE_INDUSTRIES_CONTEXT_NODE_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/contextmapping/node$`, 'i');
  const INDUSTRIES_CONTEXT_NODE_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/contextmapping/node/([A-Za-z0-9]){15,18}$`, 'i');
  const INDUSTRIES_CONTEXT_NODE_LIST_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/context-nodes`, 'i');
  const INDUSTRIES_CONTEXT_SERVICE_NODE_PATH = new RegExp(`${CONNECT_BASE_URI}/context-definitions/([A-Za-z0-9]){15,18}/context-nodes/([A-Za-z0-9]){15,18}$`, 'i');
  const INDUSTRIES_CONTEXT_ATTRIBUTE_LIST_PATH = new RegExp(`${CONNECT_BASE_URI}/context-nodes/([A-Za-z0-9]){15,18}/context-attributes`, 'i');
  const INDUSTRIES_CONTEXT_SERVICE_ATTRIBUTE_PATH = new RegExp(`${CONNECT_BASE_URI}/context-nodes/([A-Za-z0-9]){15,18}/context-attributes/([A-Za-z0-9]){15,18}$`, 'i');
  const INDUSTRIES_CONTEXT_SERVICE_NODE_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/context-mappings/([A-Z0-9]){15,18}/context-node-mappings/([A-Z0-9]){1,28}$`, 'i');
  const CREATE_INDUSTRIES_CONTEXT_NODE_MAPPINGS_PATH = new RegExp(`${CONNECT_BASE_URI}/context-mappings/([A-Za-z0-9]){15,18}/context-node-mappings$`, 'i');
  const DATALOADING_FEATURE_OBJECTS_PATH = new RegExp(`${CONNECT_BASE_URI}/industries/([A-Za-z0-9_]){5,255}/objects`, 'i');
  const GET_INDUSTRIES_PRICING_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/price-contexts/([A-Za-z0-9_])`, 'i');
  const GET_INDUSTRIES_PRICING_HEADLESS_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/pricing`, 'i');
  const GET_INDUSTRIES_PRICING_RECIPES_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/recipe`, 'i');
  const CREATE_INDUSTRIES_PRICING_RECIPES_MAPPING_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/recipe/mapping`, 'i');
  const GET_INDUSTRIES_PRICING_SYNC_PARAM_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/sync/([A-Za-z0-9_]){5,255}`, 'i');
  const CREATE_INDUSTRIES_PRICING_VERSIONED_REVISE_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/versioned-revise-details`, 'i');
  const GET_INDUSTRIES_PRICING_WATERFALL = new RegExp(`${CONNECT_BASE_URI}/core-pricing/waterfall/([A-Za-z0-9_-]){1,50}/([A-Za-z0-9]){1,50}(\\?.*)?$`, 'i');
  const VALIDATE_PRICING_FORMULA = new RegExp(`${CONNECT_BASE_URI}/core-pricing/formula/validate`, 'i');
  const INDUSTRIES_PRICING_PRICING_ACTION_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/pricing-action`, 'i');
  const INDUSTRIES_PRICING_CONSOLE_WDIGET_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/operation-console`, 'i');
  const INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_PATH = new RegExp(`${CONNECT_BASE_URI}/procedure-plan-definitions$`, 'i');
  const INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_PATH_IS_TEMPLATE = new RegExp(`${CONNECT_BASE_URI}/procedure-plan-definitions(\\?.*)?$`, 'i');
  const INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_EVALUATION = new RegExp(`${CONNECT_BASE_URI}/procedure-plan-definitions/evaluation$`, 'i');
  const INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_EVALUATION_BY_NAME = new RegExp(`${CONNECT_BASE_URI}/procedure-plan-definitions/evaluation/[A-Za-z](?!.*__)[A-Za-z0-9_]{0,253}[A-Za-z0-9]$`, 'i');
  const INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_WITH_ID_PATH = new RegExp(`${CONNECT_BASE_URI}/procedure-plan-definitions/([A-Za-z0-9]){15,18}$`, 'i');
  const INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_VERSION_CREATION = new RegExp(`${CONNECT_BASE_URI}/procedure-plan-definitions/([A-Za-z0-9]){15,18}/version$`, 'i');
  const INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_VERSION_DETAILS = new RegExp(`${CONNECT_BASE_URI}/procedure-plan-definitions/versions/([A-Za-z0-9]){15,18}$`, 'i');
  const INDUSTRIES_PRICING_CONTEXT_RULES_EVALUATE_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/contextrules/evaluate`, 'i');
  const INDUSTRIES_PRICING_CONTEXT_RULES_VALIDATE_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/contextrules/validate`, 'i');
  const INDUSTRIES_PRICING_CONTEXT_RULES_ATTRIBUTES_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/contextrules/attributes`, 'i');
  const INDUSTRIES_PRICING_CONTEXT_RULES = new RegExp(`${CONNECT_BASE_URI}/core-pricing/contextrules`, 'i');
  const INDUSTRIES_PRICING_CONTEXT_RULES_GET_PATCH_DELETE = new RegExp(`${CONNECT_BASE_URI}/core-pricing/contextrules/([A-Za-z0-9_-]){1,80}$`, 'i');
  const INDUSTRIES_PRICING_CONTEXT_RULES_FETCH_ALL_RULE_BY_SUB_USAGETYPE_ID = new RegExp(`${CONNECT_BASE_URI}/core-pricing/contextrules/all-rules/([A-Za-z0-9_-]){1,80}/([A-Za-z0-9_-]){1,80}/([A-Za-z0-9_-]){1,80}$`, 'i');
  const INDUSTRIES_PRICING_PRICING_WITH_ID_ACTION_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/pricing-action/([A-Za-z0-9]){15,18}$`, 'i');
  const INDUSTRIES_PRICING_DMO_DETAILS_PATH = new RegExp(`${CONNECT_BASE_URI}/core-pricing/dmo-data/([A-Za-z0-9_-]){1,50}(\\?.*)?$`, 'i');
  const SERVICE_CATALOG_CATEGORIES_PATH = new RegExp(`${SERVICE_CATALOG_CATEGORIES_BASE_URI}`, 'i');
  const ALD_COLUMN_VALUES_URI_PATH = new RegExp(`${CONNECT_BASE_URI}/actionable-list-definition/column-values/([A-Za-z0-9]){15,18}$`, 'i');
  const CASE_RELATED_FILE_PROCESS_INFORMATION_PATH = new RegExp(`${HEALTH_CLOUD_BASE_URI}/provider-network-management/case-related-file-process-information`, 'i');
  const SALESFORCE_JOURNEY_CAPABILITIES_PATH = new RegExp(`${SALESFORCE_JOURNEY_BASE_URI}/([A-Z0-9]){1,18}/capabilities`, 'i');
  const SALESFORCE_JOURNEY_CAPABILITY_CONTENT_PATH = new RegExp(`${SALESFORCE_JOURNEY_BASE_URI}/capability-content/(.+?)$`, 'i');
  const SALESFORCE_JOURNEY_CAPABILITY_SEARCH_PATH = new RegExp(`${SALESFORCE_JOURNEY_BASE_URI}/([A-Z0-9]){1,18}/capability-search`, 'i');
  const SALESFORCE_JOURNEY_CATEGORIES_PATH = new RegExp(`${SALESFORCE_JOURNEY_BASE_URI}/([A-Z0-9]){1,18}/categories`, 'i');
  const SALESFORCE_JOURNEY_CAPABILITY_USER_PREFERENCE_PATH = new RegExp(`${SALESFORCE_JOURNEY_BASE_URI}/capability-user-preference`, 'i');
  function generateAdapter(method, baseUri, pathRegex, controller, bodyParamName) {
    return {
      method,
      predicate: path => path.startsWith(baseUri) && pathRegex.test(path),
      transport: {
        controller
      },
      bodyParamName
    };
  }
  const I18N_GET_TIMEZONES_PATH = new RegExp(`${I18N_BASE_URI}/timezones/([A-Za-z0-9_-]){1,10}$`, 'i');
  const GET_ALL_RELATED_ENTITY_PATH = new RegExp(`${GROUP_BASE_URI}/accounts/([A-Z0-9]{15,18})/related-records`, 'i');
  const CREATE_GROUP_PATH = new RegExp(`${GROUP_BASE_URI}/group-definitions$`, 'i');
  const GET_HOUSEHOLD_FIELDS_PATH = new RegExp(`${GROUP_BASE_URI}/group-fields`, 'i');
  const MERGE_GROUP_PATH = new RegExp(`${GROUP_BASE_URI}/group-definitions/actions/merge`, 'i');
  const SPLIT_GROUP_PATH = new RegExp(`${GROUP_BASE_URI}/group-definitions/actions/split`, 'i');
  const GET_ENGAGEMENT_CHANNEL_TYPES = new RegExp(`${SCHEDULER_BASE_URI}/engagement-channel-types`, 'i');
  const GET_NEXT_WAITLIST_PARTICIPANT = new RegExp(`${SCHEDULER_BASE_URI}/next-waitlist-participant`, 'i');
  const PARTICIPANT_RECENT_INTERACTION = new RegExp(`${SCHEDULER_BASE_URI}/participant-recent-interactions`, 'i');
  const GROUP_APPOINTMENTS = new RegExp(`${SCHEDULER_BASE_URI}/group-appointments`, 'i');
  const WAITLIST_APPOINTMENTS = new RegExp(`${SCHEDULER_BASE_URI}/waitlist-appointments`, 'i');
  const WAITLIST_CHECKIN = new RegExp(`${SCHEDULER_BASE_URI}/waitlist-checkin`, 'i');
  const WAITLIST_RELATIONSHIPS = new RegExp(`${SCHEDULER_BASE_URI}/waitlist-relationships`, 'i');
  const WAITLISTS = new RegExp(`${SCHEDULER_BASE_URI}/waitlists`, 'i');
  const GET_SERVICE_TERRITORY_CAPACITY = new RegExp(`${SCHEDULER_BASE_URI}/service-territory-capacity`, 'i');
  const GET_SERVICE_RESOURCE_CAPACITY = new RegExp(`${SCHEDULER_BASE_URI}/service-resource-capacity`, 'i');
  const GET_DECRYPTION = new RegExp(`${SCHEDULER_BASE_URI}/decryption`, 'i');
  const GET_ENCRYPTION = new RegExp(`${SCHEDULER_BASE_URI}/encryption`, 'i');
  const GET_WAITLIST_PARTICIPANT_STATS = new RegExp(`${SCHEDULER_BASE_URI}/waitlist/participants/statistics$`, 'i');
  const UPDATE_WAITLIST_PARTICIPANT = new RegExp(`${SCHEDULER_BASE_URI}/waitlist/participants$`, 'i');
  const GET_APPOINTMENT_FROM_TOKEN = new RegExp(`${SCHEDULER_BASE_URI}/appointment-from-token`, 'i');
  const LIGHTNING_CARDS_ACTIVATION_PATH = new RegExp(`${LIGHTNING_CARDS_BASE_URI}/activationdata/([A-Z0-9]){15,18}`, 'i');
  const CREATE_SERVICE_APPOINTMENTS = new RegExp(`${SCHEDULER_BASE_URI}/service-appointments`, 'i');
  const SERVICE_APPOINTMENT_ATTENDEE = new RegExp(`${SCHEDULER_BASE_URI}/service-appointment-attendee`, 'i');
  const POST_SOLUTION_LIBRARY_RECIPES = new RegExp(`${CONNECT_BASE_URI}/solution-library/recipes`, 'i');
  const GET_SUCCESS_TEAM = new RegExp(`${EDUCATION_BASE_URI}/([A-Z0-9]{15,18})/success-team`, 'i');
  const GET_AVAILABLE_TOPICS = new RegExp(`${EDUCATION_BASE_URI}/appointment-booking/available-topics`, 'i');
  const GET_AVAILABLE_TIME_SLOTS = new RegExp(`${EDUCATION_BASE_URI}/appointment-booking/available-time-slots`, 'i');
  const POST_BENEFIT_ASSIGNMENT = new RegExp(`${EDUCATION_BASE_URI}/mentoring/benefit-assignment/([A-Z0-9]{15,18})/provider`, 'i');
  const POST_MATCHING_SELECTOR = new RegExp(`${EDUCATION_BASE_URI}/mentoring/matching-selector/([A-Z0-9]{15,18})`, 'i');
  const CREATE_CARE_PLANS = new RegExp(`${EDUCATION_BASE_URI}/careplan/bulk`, 'i');
  const EDU_PUBLISH_LEARNING_PROGRAM_PLAN = new RegExp(`${EDUCATION_BASE_URI}/campus-setup/learning-program-plan/publish`, 'i');
  const EDU_GET_LEARNING = new RegExp(`${EDUCATION_BASE_URI}/academic-operations/learnings/([A-Z0-9]{15,18})`, 'i');
  const EDU_GET_LEARNER_PROGRESS = new RegExp(`${EDUCATION_BASE_URI}/campus-setup/learner/([A-Z0-9]{15,18})/learner-progress`, 'i');
  const EDU_GET_LEARNING_PROGRAM_PLAN = new RegExp(`${EDUCATION_BASE_URI}/campus-setup/learning-program-plan/([A-Z0-9]{15,18})/preview`, 'i');
  const EDU_PUBLISH_LEARNING_FOUNDATION_LIST = new RegExp(`${EDUCATION_BASE_URI}/campus-setup/learning/validate-foundation-items`, 'i');
  const EDU_LEARNINGS = new RegExp(`${EDUCATION_BASE_URI}/academic-operations/learnings`, 'i');
  const EDU_GET_APT_TASK = new RegExp(`${EDUCATION_BASE_URI}/student-action-centre/([A-Z0-9]{15,18})/apts-tasks-plans`, 'i');
  const EDU_PATCH_TASK = new RegExp(`${EDUCATION_BASE_URI}/student-action-centre/task/([A-Z0-9]{15,18})`, 'i');
  const EDU_CREATE_TASK = new RegExp(`${EDUCATION_BASE_URI}/student-action-centre/task`, 'i');
  const EDU_GET_TASK_FIELDS = new RegExp(`${EDUCATION_BASE_URI}/student-action-centre/task/picklist-values`, 'i');
  const GET_PERSON_PUBLIC_PROFILE = new RegExp(`${EDUCATION_BASE_URI}/person-public-profile/([A-Za-z0-9]+( ?-?[A-Za-z0-9]+)+)/([A-Z0-9]{15,18})`, 'i');
  const GET_EDU_NEW_APPLICATION_PRELIM_DATA = new RegExp(`${EDUCATION_BASE_URI}/new-application/preliminary-data`, 'i');
  const GET_EDU_NEW_APPLICATION_ACADEMIC_TERMS = new RegExp(`${EDUCATION_BASE_URI}/new-application/academic-terms`, 'i');
  const GET_EDU_NEW_APPLICATION_PROGRAMS = new RegExp(`${EDUCATION_BASE_URI}/new-application/program-term-application-timelines`, 'i');
  const CREATE_EDU_NEW_APPLICATION_PRELIM_REFERENCES = new RegExp(`${EDUCATION_BASE_URI}/new-application/preliminary-application-references`, 'i');
  const GET_EDU_APPLICATIONS = new RegExp(`${EDUCATION_BASE_URI}/applications`, 'i');
  const GET_EDU_APPLICATION = new RegExp(`${EDUCATION_BASE_URI}/applications/([A-Z0-9]){15,18}`, 'i');
  const GET_EDU_APPLICATION_TASK = new RegExp(`${EDUCATION_BASE_URI}/individual-application-tasks/([A-Z0-9]){15,18}`, 'i');
  const APPLY_REMINDER_PATH = new RegExp(`${CONNECT_BASE_URI}/automated-actions/reminder/apply`, 'i');
  const CPQ_PREVIEW_PATH = new RegExp(`${CPQ_BASE_URI}/preview`, 'i');
  const CPQ_CONFIGURATOR_PATH = new RegExp(`${CPQ_BASE_URI}/configurator/actions/configure`, 'i');
  const CPQ_CONFIGURATOR_CREATE_RULE_PATH = new RegExp(`${CPQ_BASE_URI}/configurator/actions/create-rule`, 'i');
  const CPQ_CONFIGURATOR_UPDATE_RULE_PATH = new RegExp(`${CPQ_BASE_URI}/configurator/actions/update-rule`, 'i');
  const CPQ_CONFIGURATOR_VALIDATE_RULE_PATH = new RegExp(`${CPQ_BASE_URI}/configurator/actions/validate-rule`, 'i');
  const CPQ_PRODUCT_LIST_PATH = new RegExp(`${CPQ_BASE_URI}/products`, 'i');
  const CPQ_PRODUCT_BULK_PATH = new RegExp(`${CPQ_BASE_URI}/products/bulk`, 'i');
  const CPQ_GUIDED_SELECTION = new RegExp(`${CPQ_BASE_URI}/products/guided-selection$`, 'i');
  const CPQ_PRODUCT_DETAILS_PATH = new RegExp(`${CPQ_BASE_URI}/products/([A-Za-z0-9]){15,18}$`, 'i');
  const CPQ_PRODUCT_SEARCH_PATH = new RegExp(`${CPQ_BASE_URI}/products/search`, 'i');
  const CPQ_CREATE_CART = new RegExp(`${CPQ_BASE_URI}/carts$`, 'i');
  const CPQ_GET_CART = new RegExp(`${CPQ_BASE_URI}/carts/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)`, 'i');
  const CPQ_UPDATE_CART = new RegExp(`${CPQ_BASE_URI}/carts/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)$`, 'i');
  const CPQ_CATEGORY_LIST_PATH = new RegExp(`${CPQ_BASE_URI}/categories`, 'i');
  const CPQ_CATEGORY_DETAILS_PATH = new RegExp(`${CPQ_BASE_URI}/categories/([A-Za-z0-9]){15,18}$`, 'i');
  const CPQ_POST_CART_ITEM = new RegExp(`${CPQ_BASE_URI}/carts/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)/items$`, 'i');
  const CPQ_PATCH_CART_ITEM = new RegExp(`${CPQ_BASE_URI}/carts/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)/items$`, 'i');
  const CPQ_DELETE_CART_ITEM = new RegExp(`${CPQ_BASE_URI}/carts/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)/items/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)`, 'i');
  const CPQ_PRICE_CART = new RegExp(`${CPQ_BASE_URI}/carts/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)/price`, 'i');
  //DFO PATHS
  const INDUSTRIES_DFO_CONFIG_PATH = new RegExp(`${INDUSTRIES_DFO_BASE_URI}/configurations`, 'i');
  const FUNDRAISING_GIFT_COMMITMENT_PATH = new RegExp(`${FUNDRAISING_BASE_URI}/donor/[a-zA-Z0-9]{15,18}/commitments$`, 'i');
  const FUNDRAISING_CAMPAIGN_DEFAULT_DESIGNATION_PATH = new RegExp(`${FUNDRAISING_BASE_URI}/campaign/[a-zA-Z0-9]{15,18}/default-designations$`, 'i');
  const FUNDRAISING_COMMITMENT_DEFAULT_DESIGNATION_PATH = new RegExp(`${FUNDRAISING_BASE_URI}/commitment/[a-zA-Z0-9]{15,18}/default-designations$`, 'i');
  const FUNDRAISING_GIFT_TRANSACTION_PATH = new RegExp(`${FUNDRAISING_BASE_URI}/gift-commitments/[a-zA-Z0-9]{15,18}/gift-transactions$`, 'i');
  const FUNDRAISING_TRANSACTION_LINKED_DESIGNATION_PATH = new RegExp(`${FUNDRAISING_BASE_URI}/transaction/[a-zA-Z0-9]{15,18}/designations$`, 'i');
  // CDP Data Graph Endpoints
  const CDP_DATA_GRAPH_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs`, 'i');
  // Prevent matching /data-graphs/metadata
  const GET_CDP_DATA_GRAPH_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs/(?!metadata$)([A-Z0-9_]){1,80}$`, 'i');
  const DELETE_CDP_DATA_GRAPH_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs/([A-Z0-9_]){1,80}$`, 'i');
  const DEPENDENCY_CDP_DATA_GRAPH_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs/dependency/([A-Z0-9_]){1,80}$`, 'i');
  const CDP_DATA_GRAPH_DRAFT_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs/draft`, 'i');
  const GET_CDP_DATA_GRAPH_DRAFT_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs/draft/([A-Z0-9_]){1,80}`, 'i');
  // CDP Metadata Endpoints
  const CDP_METADATA = new RegExp(`${CDP_BASE_URI}/metadata$`, 'i');
  const GET_CDP_DATA_GRAPH_METADATA_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs/metadata`, 'i');
  // CDP Query Endpoints
  // ssot/universalIdLookup/{entityName}/{dataSourceId}/{dataSourceObjectId}/{sourceRecordId}
  const CDP_UNIVERSAL_ID_LOOKUP = new RegExp(`${CDP_BASE_URI}/universalIdLookup/([A-Za-z0-9_]){1,80}/([A-Za-z0-9_]){1,255}/([A-Za-z0-9_]){1,255}/([A-Za-z0-9_]){1,255}$`, 'i');
  // CDP Calculated Insights Endpoints
  const CDP_CALCULATED_INSIGHTS_COLLECTION_METADATA = new RegExp(`${CDP_BASE_URI}/calculated-insights$`, 'i');
  const CDP_CALCULATED_INSIGHT_METADATA = new RegExp(`${CDP_BASE_URI}/calculated-insights/([A-Za-z0-9_]){1,80}$`, 'i');
  const CDP_CALCULATED_INSIGHT_QUERY = new RegExp(`${CDP_BASE_URI}/insight/calculated-insights/([A-Za-z0-9_]){1,80}$`, 'i');
  // ssot/profile/{dataModelName}/{id}/calculated-insights/{ciName}
  const CDP_QUERY_PROFILE_CALCULATED_INSIGHT = new RegExp(`${CDP_BASE_URI}/profile/([A-Za-z0-9_]){1,80}/([A-Za-z0-9_]){1,255}/calculated-insights/([A-Za-z0-9_]){1,80}$`, 'i');
  // CDP Machine Learning Endpoints
  const CDP_MLMODEL_ARTIFACT_COLLECTION = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/model-artifacts`, 'i');
  // can be 15-18 char Id or developerName which max length is 255
  const CDP_MLMODEL_ARTIFACT = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/model-artifacts/([A-Za-z0-9_]){1,255}`, 'i');
  const CDP_WORKSPACES_COLLECTION = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/workspaces$`, 'i');
  // can be 15-18 char Id or developerName which max length is 255
  const CDP_WORKSPACE = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/workspaces/([A-Za-z0-9_]){1,255}`, 'i');
  const CDP_ML_CONFIGURED_MODEL_COLLECTION = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/workspaces/([A-Za-z0-9_]){1,255}/models$`, 'i');
  // can be 15-18 char Id or developerName which max length is 255
  const CDP_ML_CONFIGURED_MODEL = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/workspaces/([A-Za-z0-9_]){1,255}/models/([A-Za-z0-9_]){1,255}`, 'i');
  const CDP_CONFIGURED_MODEL_COLLECTION = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/configured-models`, 'i');
  // can be 15-18 char Id or developerName which max length is 255
  const CDP_CONFIGURED_MODEL = new RegExp(`${CDP_MACHINE_LEARNING_BASE_URI}/configured-models/([A-Za-z0-9_]){1,255}`, 'i');
  const CDP_COMMUNICATION_CAPPING_CONFIGURATION = new RegExp(`${CDP_COMMUNICATION_CAPPING_BASE_URI}/([A-Za-z0-9_]){1,80}$`, 'i');
  const CDP_COMMUNICATION_CAPPING_STATUS_RETRY = new RegExp(`${CDP_COMMUNICATION_CAPPING_BASE_URI}/([A-Za-z0-9_]){1,80}/actions/retry`, 'i');
  // CDP Query endpoint queryANSISql
  const CDP_QUERY_ANSI_SQL = new RegExp(`${CDP_BASE_URI}/query`, 'i');
  const KNOWLEDGE_ARTICLE_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([a-zA-Z0-9]){15,18}/network-data-category/9cn([a-zA-Z0-9]){12,15}/knowledge-article`, 'i');
  const CATALOG_ITEM_FOR_COMMUNITY_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([a-zA-Z0-9]){15,18}/network-data-category/9cn([a-zA-Z0-9]){12,15}/catalog-item`, 'i');
  const NETWORK_DATA_CATEGORY_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([a-zA-Z0-9]){15,18}/network-data-category/9cn([a-zA-Z0-9]){12,15}`, 'i');
  const CATALOG_ITEM_PATH = new RegExp(`${CONNECT_BASE_URI}/network-data-category/9cn([a-zA-Z0-9]){12,15}/catalog-item`, 'i');
  const NETWORK_DATA_CATEGORIES_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([a-zA-Z0-9]){15,18}/data-category/network-data-category`, 'i');
  const PARENT_NETWORK_DATA_CATEGORY_PATH = new RegExp(`${CONNECT_BASE_URI}/communities/([a-zA-Z0-9]){15,18}/network-data-category/9cn([a-zA-Z0-9]){12,15}/parent-path`, 'i');
  const CHILD_CATEGORY = new RegExp(`${CONNECT_BASE_URI}/communities/([a-zA-Z0-9]){15,18}/network-data-category/9cn([a-zA-Z0-9]){12,15}/child-category`, 'i');
  const CATEGORY_GROUP_PATH = new RegExp(`${CONNECT_BASE_URI}/data-category/category-group`);
  const PUT_CDP_DATA_GRAPH_PATH = new RegExp(`${CDP_BASE_URI}/data-graphs/retry`, 'i');
  const AUTOMOTIVE_INV_MGMT_PATH = new RegExp(`${CONNECT_BASE_URI}/inventory-visibility/actions`, 'i');
  const DOCGEN_BATCH_DOCGEN_PERFORM_ACTION_PATH = new RegExp(`${DOCGEN_BASE_URI}/doc-generation-batch-process/([A-Z0-9]){1,18}/([a-zA-Z0-9_]){0,80}$`, 'i');
  const DOCGEN_DOCUMENT_TEMPLATE_PATH = new RegExp(`${DOCGEN_BASE_URI}/document-templates`, 'i');
  const CPQ_INSTANT_PRICING_PATH = new RegExp(`${INDUSTRIES_BASE_URI}/cpq/quotes/actions/get-instant-price`, 'i');
  const GET_AVAILS_CALENDAR_METADATA = new RegExp(`${MEDIA_ADSALES_BASE_URI}/availsCalendar/metadata`, 'i');
  const POST_AVAILS_CALENDAR_FORECASTS = new RegExp(`${MEDIA_ADSALES_BASE_URI}/availsCalendar/forecasts`, 'i');
  const POST_AVAILS_CALENDAR_CONTENDING = new RegExp(`${MEDIA_ADSALES_BASE_URI}/availsCalendar/contending`, 'i');
  const GET_AVAILS_CALENDAR_CONFIGS = new RegExp(`${MEDIA_ADSALES_BASE_URI}/availsCalendar/runtimeConfig`, 'i');
  const EINSTEIN_LLM_GENERATIONS_PATH = new RegExp(`${EINSTEIN_BASE_URI}/llm/prompt/generations`, 'i');
  const EINSTEIN_PROMPT_TEMPLATE_GENERATIONS_PATH = new RegExp(`${EINSTEIN_BASE_URI}/prompt-templates/([A-Za-z0-9_]){1,255}/generations`, 'i');
  const EINSTEIN_PROMPT_TEMPLATE_PATH = new RegExp(`${EINSTEIN_BASE_URI}/prompt-templates$`, 'i');
  const EINSTEIN_LLM_FEEDBACK_PATH = new RegExp(`${EINSTEIN_BASE_URI}/llm/feedback`, 'i');
  const EINSTEIN_LLM_EMBEDDINGS_PATH = new RegExp(`${EINSTEIN_BASE_URI}/llm/embeddings`, 'i');
  const DOCUMENT_MATRIX_FETCH_RESULTS = new RegExp(`${CONNECT_BASE_URI}/document-matrix/document-decision/([A-Za-z0-9]){1,18}$`, 'i');
  const NEXTGENSALESAGREEMENTPRICE_PATH = new RegExp(`${CONNECT_BASE_URI}/sales-agreements/([A-Za-z0-9]){1,255}/price`, 'i');
  const SALES_AGREEMENT_UPDATE_PATH = new RegExp(`${CONNECT_BASE_URI}/sales-agreements/([A-Za-z0-9]){1,255}/product`, 'i');
  const MFG_PROGRAM_TEMPLATE_PATH = new RegExp(`${CONNECT_BASE_URI}/entity/mfg-program-templates/([A-Za-z0-9]){15,18}$`, 'i');
  const MFG_PROGRAM_TEMPLATES_LIST_PATH = new RegExp(`${CONNECT_BASE_URI}/entity/mfg-program-templates$`, 'i');
  const COMMERCE_STORE_MANAGEMENT_CONFIGURE_PRODUCT_PRICING_PATH = new RegExp(`${COMMERCE_STORE_MANAGEMENT_BASE_URI}/([A-Z0-9]){15,18}/configureProductPricing`, 'i');
  const COMMERCE_STORE_MANAGEMENT_GET_PRODUCT_PRICING_PATH = new RegExp(`${COMMERCE_STORE_MANAGEMENT_BASE_URI}/([A-Z0-9]){15,18}/getProductPricing`, 'i');
  const COMMERCE_CATALOG_MANAGEMENT_COMPOSITE_PRODUCT_CREATE_PATH = new RegExp(`${COMMERCE_CATALOG_MANAGEMENT_BASE_URI}/([A-Z0-9]){15,18}/composite-products`, 'i');
  const COMMERCE_CATALOG_MANAGEMENT_COMPOSITE_PRODUCT_UPDATE_PATH = new RegExp(`${COMMERCE_CATALOG_MANAGEMENT_BASE_URI}/([A-Z0-9]){15,18}/composite-products/([A-Z0-9]){15,18}`, 'i');
  const COMMERCE_CATALOG_MANAGEMENT_COMPOSITE_VARIATION_CREATE_PATH = new RegExp(`${COMMERCE_CATALOG_MANAGEMENT_BASE_URI}/([A-Z0-9]){15,18}/composite-variations`, 'i');
  const COMMERCE_CATALOG_MANAGEMENT_PRODUCT_ATTRIBUTE_SEARCH_PATH = new RegExp(`${COMMERCE_CATALOG_MANAGEMENT_URI}/search/product-variation-attributes`, 'i');
  const COMMERCE_CHANNELS_PATH = new RegExp(`${COMMERCE_CHANNEL_MANAGEMENT_BASE_URI}/0ZE[A-Za-z0-9]{12,15}`, 'i');
  const SERVICE_PLAN_PATH = new RegExp(`${SERVICE_PLAN_BASE_URI}/execute/([a-zA-Z0-9]){12,15}`, 'i');
  const SERVICE_PLAN_POST_PATH = new RegExp(`${SERVICE_PLAN_BASE_URI}/generationRequests`, 'i');
  const SERVICE_PLAN_GENERATION_REQUEST_STATUS_GET_PATH = new RegExp(`${SERVICE_PLAN_BASE_URI}/generationRequests/([a-zA-Z0-9]){12,15}`, 'i');
  const SERVICE_PLAN_DETAILS_PATH = new RegExp(`${SERVICE_PLAN_BASE_URI}/servicePlanDetails/1G9([a-zA-Z0-9]){12,15}$`, 'i');
  const REMINDER_PATH = new RegExp(`${REMINDER_BASE_URI}`, 'i');
  const PATHASSISTANT_GET_PATH = new RegExp(`${PATHASSISTANT_BASE_URI}/([A-Z0-9]){15,18}$`, 'i');
  const PATHASSISTANT_DAYS_IN_STAGE_PATH = new RegExp(`${PATHASSISTANT_BASE_URI}/([A-Z0-9]){15,18}/daysInStage$`, 'i');
  const PATHASSISTANT_COLLAPSIBLE_DRAWER_USER_PREF_PATH = new RegExp(`${PATHASSISTANT_BASE_URI}/collapsibleDrawerUserPref`, 'i');
  const POST_AI4M_EINSTEIN_CREATE_CONTENT_PATH = new RegExp(`${AI4M_EINSTEIN_BASE_URI}/content`, 'i');
  const POST_AI4M_EINSTEIN_MODIFY_CONTENT_PATH = new RegExp(`${AI4M_EINSTEIN_BASE_URI}/content/modification`, 'i');
  const CONTENT_TAXONOMY_TERMS_SEARCH_PATH = new RegExp(`${CONTENT_TAXONOMY_BASE_URI}/terms/search`);
  const CONTENT_TAXONOMY_TERMS_PATH = new RegExp(`${CONTENT_TAXONOMY_BASE_URI}/terms`);
  const CONTENT_TAXONOMY_TERM_PATH = new RegExp(`${CONTENT_TAXONOMY_BASE_URI}/([A-Za-z0-9]){15,18}/terms/([A-Za-z0-9]){15,18}`);
  const CONTENT_TAXONOMY_CREATE_TERM_PATH = new RegExp(`${CONTENT_TAXONOMY_BASE_URI}/([A-Za-z0-9]){15,18}/terms`);
  const ENERGY_UTILITIES_PROGRAMS_GET_PROGRAM_APPLICATIONS_PATH = new RegExp(`${ENERGY_UTILITIES_PROGRAMS_BASE_URI}/applications`);
  const KNOWLEDGE_ARTICLE_VIEW_STAT_PATH = new RegExp(`${CONNECT_BASE_URI}/knowledge/article/view-stat`, 'i');
  const CONVERSATION_RUNTIME_PROXY_PATH = new RegExp(`${CONNECT_BASE_URI}/conversation-runtime-proxy`);
  const COPILOT_LLM_FEEDBACK_PATH = new RegExp(`${CONNECT_BASE_URI}/copilot/feedback`);
  const COPILOT_OBJECTS_PATH = new RegExp(`${CONNECT_BASE_URI}/copilot/objects`);
  const COPILOT_FOLLOWUP_ACTIONS_PATH = new RegExp(`${CONNECT_BASE_URI}/follow-up-actions(\\?.*)?$`, 'i');
  const COPILOT_RECOMMENDATION_PATH = new RegExp(`${CONNECT_BASE_URI}/recommended-plan-templates/([A-Z0-9_]){1,80}/([A-Z0-9_]){1,80}$`, 'i');
  const COPILOT_RECOMMENDED_ACTIONS_PATH = new RegExp(`${CONNECT_BASE_URI}/recommended-actions(\\?.*)?$`, 'i');
  const COPILOT_RECOMMENDED_UTTERANCES_PATH = new RegExp(`${CONNECT_BASE_URI}/recommended-utterances(\\?.*)?$`, 'i');
  const COPILOT_WELCOME_UTTERANCES_PATH = new RegExp(`${CONNECT_BASE_URI}/welcome-utterances(\\?.*)?$`, 'i');
  const HARMONIZE_INVOICE_DRAFT_TO_POSTED_PATH = new RegExp(`${COMMERCE_BASE_URI}/invoicing/invoices/collection/actions/post`, 'i');
  const HARMONIZE_BATCH_INVOICE_DRAFT_TO_POSTED_PATH = new RegExp(`${COMMERCE_BASE_URI}/invoicing/invoice-batch-runs/([A-Za-z0-9]){15,18}/actions/draft-to-posted`, 'i');
  const HARMONIZE_BILLING_SCHEDULE_RECOVERY_PATH = new RegExp(`${COMMERCE_BASE_URI}/invoicing/billing-schedules/collection/actions/recover`, 'i');
  const HARMONIZE_BILLING_BATCH_INVOICE_DOC_GENERATION_PATH = new RegExp(`${COMMERCE_BASE_URI}/billing/invoices/invoice-batch-docgen/([A-Za-z0-9]){15,18}/actions/run`, 'i');
  const HARMONIZE_BILLING_BATCH_CRON_NEXT_EXECUTION_DATES_PATH = new RegExp(`${CONNECT_BASE_URI}/billing/batch/cron/execution-dates`, 'i');
  const BUSINESS_OBJECTIVES_PATH = new RegExp(`${COMMERCE_GOALS_RECS_BUSINESS_OBJECTIVES_URI}(\\?.*)?$`, 'i');
  const BUSINESS_OBJECTIVES_RECOMMENDATIONS_PATH = new RegExp(`${COMMERCE_GOALS_RECS_BUSINESS_OBJECTIVES_URI}/recommendations(\\?.*)?$`, 'i');
  const CMS_CONTENT_TAXONOMY_TERMS_PATH = new RegExp(`${CMS_BASE_URI}/contents/([A-Z0-9_]){15,28}/taxonomy-terms`, 'i');
  const POST_TRIGGER_BENEFIT_SESSION_GENERATION_BASE_URI = new RegExp(`${PROGRAM_MGMT_BASE_URI}/benefit-schedules/([A-Z0-9]{15,18})/sessions$`, 'i');
  const INSURANCE_RATING = new RegExp(`${INSURANCE_BASE_URI}/product-rating`, 'i');
  const INSURANCE_ENDORSE_POLICY = new RegExp(`${INSURANCE_BASE_URI}/policies/([A-Za-z0-9_]){15,18}/endorse/`, 'i');
  const INSURANCE_ISSUE = new RegExp(`${INSURANCE_BASE_URI}/policies`, 'i');
  const INSURANCE_GET_POLICY = new RegExp(`${INSURANCE_BASE_URI}/policies/([A-Za-z0-9_]){15,18}$`, 'i');
  const INSURANCE_GET_POLICY_LINEITEM = new RegExp(`${INSURANCE_BASE_URI}/policies/([A-Za-z0-9_]){15,18}/policyLineItems/([A-Za-z0-9_]){15,18}$`, 'i');
  const INSURANCE_SEARCH_PRODUCER_SPLIT_ARNG = new RegExp(`${INSURANCE_BASE_URI}/producer-split-arrangements`, 'i');
  const CREATE_ENGAGEMENT_SIGNAL = new RegExp(`${ENGMNT_CONFIG_BASE_URI}/engagement-signals`, 'i');
  const INSURANCE_COST_CALCULATION_COVERAGE = new RegExp(`${INSURANCE_BASE_URI}/plan-management/coverages/([A-Za-z0-9_]){15,18}/cost`, 'i');
  const INSURANCE_COST_CALCULATION_POLICY = new RegExp(`${INSURANCE_BASE_URI}/plan-management/policies/([A-Za-z0-9_]){15,18}/cost`, 'i');
  const INSURANCE_COST_CALCULATION_RATE_PLAN_LINE_ITEM = new RegExp(`${INSURANCE_BASE_URI}/plan-management/ratePlanLineItems/([A-Za-z0-9_]){15,18}/cost`, 'i');
  const INSURANCE_COST_CALCULATION_RATE_PLAN = new RegExp(`${INSURANCE_BASE_URI}/plan-management/ratePlans/([A-Za-z0-9_]){15,18}/cost`, 'i');
  const PRICE_PROTECTION_CLAIM_PATH = new RegExp(`${CONNECT_BASE_URI}/price-protection-claim-execution`, 'i');
  const INSURANCE_PRODUCER_SPLIT_ASSG_VALIDATE = new RegExp(`${INSURANCE_BASE_URI}/split-assignment/validate`, 'i');
  const INSURANCE_PRODUCER_SPLIT_ASSG_SAVE = new RegExp(`${INSURANCE_BASE_URI}/split-assignment/create`, 'i');
  const INDUSTRIES_CONSTRAINTS_POST_PATH = new RegExp(`${INDUSTRIES_BASE_URI}/constraints/([A-Za-z0-9_]){15,18}/versions`, 'i');
  const INDUSTRIES_CONSTRAINTS_PATH = new RegExp(`${INDUSTRIES_BASE_URI}/constraints/([A-Za-z0-9_]){15,18}/versions/([A-Za-z0-9_]){15,18}`, 'i');
  const insurance = [generateAdapter('post', INSURANCE_BASE_URI, INSURANCE_RATING, 'InsuranceFoundationFamilyController.insuranceProductRatingPost', 'ProductRatingPostInput'), generateAdapter('patch', INSURANCE_BASE_URI, INSURANCE_RATING, 'InsuranceFoundationFamilyController.insuranceProductRatingPatch', 'productRatingPatchInput'), generateAdapter('post', INSURANCE_BASE_URI, INSURANCE_ENDORSE_POLICY, 'InsurancePolicyAdminFamilyController.EndorsePolicy', 'EndorsePolicyInput'), generateAdapter('get', INSURANCE_BASE_URI, INSURANCE_GET_POLICY, 'InsurancePolicyAdminFamilyController.GetPolicy'), generateAdapter('get', INSURANCE_BASE_URI, INSURANCE_GET_POLICY_LINEITEM, 'InsurancePolicyAdminFamilyController.GetPolicyLineItem'), generateAdapter('post', INSURANCE_BASE_URI, INSURANCE_ISSUE, 'InsurancePolicyAdminFamilyController.IssuePolicy', 'IssuePolicyInput'), generateAdapter('patch', INSURANCE_BASE_URI, INSURANCE_COST_CALCULATION_COVERAGE, 'InsuranceBrokerageFamilyController.CostCalculationByCoverageId', 'CostCalculationInput'), generateAdapter('patch', INSURANCE_BASE_URI, INSURANCE_COST_CALCULATION_POLICY, 'InsuranceBrokerageFamilyController.CostCalculationByPolicyId', 'CostCalculationInput'), generateAdapter('patch', INSURANCE_BASE_URI, INSURANCE_COST_CALCULATION_RATE_PLAN_LINE_ITEM, 'InsuranceBrokerageFamilyController.CostCalculationByRatePlanLineItemId', 'CostCalculationInput'), generateAdapter('patch', INSURANCE_BASE_URI, INSURANCE_COST_CALCULATION_RATE_PLAN, 'InsuranceBrokerageFamilyController.CostCalculationByRatePlanId', 'CostCalculationInput'), generateAdapter('get', INSURANCE_BASE_URI, INSURANCE_SEARCH_PRODUCER_SPLIT_ARNG, 'InsuranceBrokerageFamilyController.getProducerSplitArngSearchResult'), generateAdapter('post', INSURANCE_BASE_URI, INSURANCE_PRODUCER_SPLIT_ASSG_VALIDATE, 'InsuranceBrokerageFamilyController.postInsuranceProducerSplitAssgValidate', 'splitAssignmentValidateInput'), generateAdapter('post', INSURANCE_BASE_URI, INSURANCE_PRODUCER_SPLIT_ASSG_SAVE, 'InsuranceBrokerageFamilyController.postInsuranceProducerSplitAssgSave', 'splitAssignmentSaveInput')];
  const SHARING_PUBLIC_GROUP_SUMMARY_PATH = new RegExp(`${SHARING_BASE_URI}/publicGroupsSummary`, 'i');
  const SHARING_PUBLIC_GROUP_DETAILS_PATH = new RegExp(`${SHARING_BASE_URI}/publicGroupsDetails`, 'i');
  const USER_SUMMARY_SHARING_PATH = new RegExp(`${SHARING_BASE_URI}/groups-for-user/([A-Z0-9_]){15,18}/([A-Za-z]){5,50}`, 'i');
  const MFG_CREATE_SUPPLIER_CLAIMS_PATH = new RegExp(`${CONNECT_BASE_URI}/warranty/supplier-claim`, 'i');
  const GET_SOBJECTS_PATH = new RegExp(`${SHARING_BASE_URI}/sobjects`, 'i');
  const GET_USER_PERMISSIONS_PATH = new RegExp(`${SHARING_BASE_URI}/userPermissions`, 'i');
  const MFG_PRODUCT_SERVICE_CAMPAIGN_ITEMS_PATH = new RegExp(`${CONNECT_BASE_URI}/industries-field-service/product-service-campaign/items-from-list`, 'i');
  const WORK_ORDER_FOR_PRODUCT_SERVICE_CAMPAIGN_ITEM = new RegExp(`${CONNECT_BASE_URI}/industries-field-service/product-service-campaign/work-order`, 'i');
  const WORK_ORDER_ESTIMATION_PRICE_ITEM_PATH = new RegExp(`${CONNECT_BASE_URI}/industries-field-service/work-order-estimation/price-item`, 'i');
  const APPOINTMENT_SCHEDULING_PATH = new RegExp(`${CONNECT_BASE_URI}/industries-field-service/appointment-scheduling/slots/([A-Za-z0-9]){15,18}/([A-Za-z0-9]){15,18}`, 'i');
  const OMNI_DESIGNER_FETCH_ENTITY_INFO = new RegExp(`${OMNI_DESIGNER_BASE_URI}/entity-info`, 'i');
  const OMNI_DESIGNER_DATARAPTOR_CONFIG = new RegExp(`${OMNI_DESIGNER_BASE_URI}/dataraptor-config`, 'i');
  const OMNI_DESIGNER_GET_EXPRESSION_GRAMMAR = new RegExp(`${OMNI_DESIGNER_BASE_URI}/expression-grammar`, 'i');
  const OMNI_DESIGNER_PATCH_SIMULATE_DATARAPTOR = new RegExp(`${OMNI_DESIGNER_BASE_URI}/dataraptor-simulate`, 'i');
  const OMNI_DESIGNER_GET_FILE_CARD_DETAIL_URI = new RegExp(`${OMNI_DESIGNER_BASE_URI}/get-file-card/([A-Za-z0-9_])`, 'i');
  const OMNI_DESIGNER_ADD_ATTACHMENT_URI = new RegExp(`${OMNI_DESIGNER_BASE_URI}/card/add-attachment`, 'i');
  const OMNI_DESIGNER_GET_CARD_BY_ID_URI = new RegExp(`${OMNI_DESIGNER_BASE_URI}/card/([A-Za-z0-9_]){1,255}`, 'i');
  const OMNI_DESIGNER_FETCH_DATARAPTOR_LIST = new RegExp(`${OMNI_DESIGNER_BASE_URI}/dataraptor-list`, 'i');
  const OMNI_DESIGNER_FETCH_DECISION_MATRIX = new RegExp(`${OMNI_DESIGNER_BASE_URI}/decision-matrix`, 'i');
  const OMNI_DESIGNER_FETCH_DOCUSIGN_TEMPLATES = new RegExp(`${OMNI_DESIGNER_BASE_URI}/docusign-templates`, 'i');
  const OMNI_DESIGNER_FETCH_EMAIL_DOCUMENTS = new RegExp(`${OMNI_DESIGNER_BASE_URI}/email-documents`, 'i');
  const OMNI_DESIGNER_FETCH_OMNIPROCESS_LIST = new RegExp(`${OMNI_DESIGNER_BASE_URI}/omni-process-list`, 'i');
  const OMNI_DESIGNER_FETCH_OMNIPROCESS_DATA = new RegExp(`${OMNI_DESIGNER_BASE_URI}/omniprocess/([A-Z0-9]){15,18}`, 'i');
  const OMNI_DESIGNER_FETCH_ENTITY_RECORDS_URI = new RegExp(`${OMNI_DESIGNER_BASE_URI}/get-entity-records`, 'i');
  const OMNI_DESIGNER_GET_CARD_LIST_URI = new RegExp(`${OMNI_DESIGNER_BASE_URI}/get-cards`, 'i');
  const CREATE_PERSONALIZATION_POINT = new RegExp(`${PERSONALIZATION_SERVICE_BASE_URI}/personalization-points`, 'i');
  const GET_PERSONALIZATION_POINT = new RegExp(`${PERSONALIZATION_SERVICE_BASE_URI}/personalization-points/([A-Za-z0-9_]){5,50}`, 'i');
  const DELETE_PERSONALIZATION_POINT = new RegExp(`${PERSONALIZATION_SERVICE_BASE_URI}/personalization-points/([A-Za-z0-9_]){5,50}`, 'i');
  const UPDATE_PERSONALIZATION_POINT = new RegExp(`${PERSONALIZATION_SERVICE_BASE_URI}/personalization-points/([A-Za-z0-9_]){5,50}`, 'i');
  const CREATE_PERSONALIZATION_SCHEMA = new RegExp(`${PERSONALIZATION_SERVICE_BASE_URI}/personalization-schemas`, 'i');
  const GET_PERSONALIZATION_SCHEMA = new RegExp(`${PERSONALIZATION_SERVICE_BASE_URI}/personalization-schemas/([A-Za-z0-9_]){5,50}`, 'i');
  const DELETE_PERSONALIZATION_SCHEMA = new RegExp(`${PERSONALIZATION_SERVICE_BASE_URI}/personalization-schemas/([A-Za-z0-9_]){5,50}`, 'i');
  const OMNI_DESIGNER_UPSERT_OMNIPROCESS = new RegExp(`${OMNI_DESIGNER_BASE_URI}/upsert-omni-process`, 'i');
  const OMNI_DESIGNER_UPSERT_DATARAPTOR = new RegExp(`${OMNI_DESIGNER_BASE_URI}/upsert-dataraptor`, 'i');
  const RECORD_AGGREGATION_DEFINITION_CREATE_DATA = new RegExp(`${RECORD_AGGREGATION_BASE_URI}$`, 'i');
  const RECORD_AGGREGATION_DEFINITION_FETCH_RECORD_ROLLUP_RESULT_DATA = new RegExp(`${RECORD_AGGREGATION_BASE_URI}/([A-Za-z0-9]){15,18}/record-rollup-results$`, 'i');
  const RECORD_AGGREGATION_DEFINITION_FETCH_APPLICABLE_OBJECTS_DATA = new RegExp(`${RECORD_AGGREGATION_BASE_URI}/utilities/applicable-objects$`, 'i');
  const FULFILLMENT_STEPS_PATH = new RegExp(`${CONNECT_BASE_URI}/fulfillmentSteps/([A-Z0-9]){1,18}$`, 'i');
  const FULFILLMENT_CONTEXTS_PATH = new RegExp(`${CONNECT_BASE_URI}/fulfillmentContexts/([A-Z0-9]){1,18}$`, 'i');
  const RECORD_AGGREGATION_DEFINITION_READ_UPDATE_DATA = new RegExp(`${RECORD_AGGREGATION_BASE_URI}/([A-Za-z0-9]){15,18}$`, 'i');
  const RECORD_AGGREGATION_DEFINITION_GET_ENTITY_APPLICABLE_FIELDS_DATA = new RegExp(`${RECORD_AGGREGATION_BASE_URI}/utilities/applicable-objects/([A-Za-z0-9_]){1,50}/applicable-fields$`, 'i');
  const OMNI_DESIGNER_OS_BUILD_JSONRESOURCE = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/build-json`, 'i');
  const OMNI_DESIGNER_OS_CLONE_OMNI_PROCESS_ELEMENT = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/clone-omni-process-element`, 'i');
  const OMNI_DESIGNER_OS_CLONE_OMNI_PROCESS = new RegExp(`${OMNI_DESIGNER_BASE_URI}/clone-omni-process`, 'i');
  const OMNI_DESIGNER_OS_DELETE_OMNI_PROCESS_ELEMENT = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/delete-omni-process-element`, 'i');
  const OMNI_DESIGNER_OS_INSERT_OMNI_PROCESS_ELEMENT = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/insert-omni-process-element`, 'i');
  const OMNI_DESIGNER_OS_MOVE_OMNI_PROCESS_ELEMENT = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/move-omni-process-element`, 'i');
  const OMNI_DESIGNER_FETCH_DESIGNER_CUSTOMIZATIONS = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/fetch-designer-customization/([A-Za-z0-9_]){1,255}$`, 'i');
  const OMNI_DESIGNER_FETCH_DYNAMIC_ELEMENTS_RESOURCE = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/fetch-dynamic-elements`, 'i');
  const OMNI_DESIGNER_FETCH_NON_OMNISCRIPT_LWC_RESOURCE = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/non-omniscript-lwc`, 'i');
  const OMNI_DESIGNER_FETCH_OS_FILE_OUTPUT_RESOURCE = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/file-based/([A-Za-z0-9_]){1,255}$`, 'i');
  const OMNI_DESIGNER_FETCH_FILE_BASED_OS_LIST_RESOURCE = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/get-scripts`, 'i');
  const OMNI_DESIGNER_GET_DESIGNER_CUSTOMIZATIONS_WARNING = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/fetch-designer-customization-element-warning/([A-Za-z0-9_]+)/([A-Za-z0-9]){15,18}`, 'i');
  const OMNI_DESIGNER_OS_BUILD_BP_DATA_JSON_RESOURCE = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/build-business-process-data-json`, 'i');
  const OMNI_DESIGNER_UPLOAD_DOCUMENT = new RegExp(`${OMNI_DESIGNER_BASE_URI}/os/document`, 'i');
  const OMNI_DESIGNER_PATCH_EXECUTION_IP = new RegExp(`${OMNI_DESIGNER_BASE_URI}/execute-ip`, 'i');
  const UNIFIED_ANALYTICS_PUBLISH_MONITORING_EVENTS_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/admin/monitoring/events$`, 'i');
  const UNIFIED_ANALYTICS_DASHBOARD_COLLECTION_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/dashboards$`, 'i');
  const UNIFIED_ANALYTICS_FLOW_COLLECTION_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/flows$`, 'i');
  const UNIFIED_ANALYTICS_FLOW_BY_NAME = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/flows/[A-Za-z0-9_]{3,50}`, 'i');
  const UNIFIED_ANALYTICS_DASHBOARD_BY_NAME = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/dashboards/([A-Za-z0-9_]+){3,50}$`, 'i');
  const UNIFIED_ANALYTICS_LOGLINES_BY_NAME = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/loglines$`, 'i');
  const UNIFIED_ANALYTICS_WORKSPACE_COLLECTION_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/workspaces$`, 'i');
  const UNIFIED_ANALYTICS_WORKSPACE_BY_NAME = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/workspaces/[A-Za-z0-9_]{3,50}$`, 'i');
  const UNIFIED_ANALYTICS_WORKSPACE_ASSETS = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/workspaces/[A-Za-z0-9_]{3,50}/assets$`, 'i');
  const UNIFIED_ANALYTICS_DELTE_WORKSPACE_ASSET = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/workspaces/[A-Za-z0-9_]{3,50}/assets/[A-Za-z0-9_]{3,50}$`, 'i');
  const UNIFIED_ANALYTICS_VISUALIZATIONS_COLLECTION_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/visualizations$`, 'i');
  const UNIFIED_ANALYTICS_VISUALIZATION = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/visualizations/[A-Za-z0-9_]{1,255}$`, 'i');
  const UNIFIED_ANALYTICS_VISUALIZATIONS_BUNDLE = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/visualizations/[A-Za-z0-9_]{1,255}/bundle$`, 'i');
  const UNIFIED_ANALYTICS_FOLLOW = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/follow/followers/[A-Za-z0-9_]{3,50}/follows$`, 'i');
  const UNIFIED_ANALYTICS_UNFOLLOW = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/follow/followers/[A-Za-z0-9_]{3,50}/follows/[A-Za-z0-9_]{3,50}$`, 'i');
  const UNIFIED_ANALYTICS_FOLLOWERS = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/follow/assets/[A-Za-z0-9_]{3,50}/followers$`, 'i');
  const UNIFIED_ANALYTICS_FOLLOWED_ASSETS = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/follow/followers/[A-Za-z0-9_]{3,50}/followed-assets$`, 'i');
  const UNIFIED_ANALYTICS_UNIQUE_FOLLOWER_COUNT = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/follow/assets/[A-Za-z0-9_]{3,50}/follower-count$`, 'i');
  const UNIFIED_ANALYTICS_ASSETS_QUERY = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/assets/query$`, 'i');
  const UNIFIED_ANALYTICS_ORGS = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/orgs/[A-Za-z0-9_]{3,50}$`, 'i');
  const UNIFIED_ANALYTICS_USERS_QUERY = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/users/query$`, 'i');
  const PAYMENT_METHOD_SET_PATH = new RegExp(`${PAYMENTS_BASE_URI}/payment-method-sets$`, 'i');
  const UNIFIED_ANALYTICS_LIBRARY_ASSETS_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/library/assets/query$`, 'i');
  const PAYMNET_INTENT_PATH = new RegExp(`${PAYMENTS_BASE_URI}/payment-intents$`, 'i');
  const PAYMNET_INTENT_TIMELINE_PATH = new RegExp(`${PAYMENTS_BASE_URI}/payment-intents/([A-Z0-9]){15,18}/timeline$`, 'i');
  const SAVED_PAYMENT_METHOD_PATH = new RegExp(`${PAYMENTS_BASE_URI}/merchant-accounts/([A-Z0-9]){15,18}/saved-payment-methods$`, 'i');
  const MILESTONES_BUSINESS_HOURS_PATH = new RegExp(`${MILESTONES_BASE_URI}/business-hours$`, 'i');
  const MILESTONES_MILESTONE_COMPLETED_PATH = new RegExp(`${MILESTONES_BASE_URI}/milestone-completed$`, 'i');
  const MILESTONES_MILESTONES_DATA_MANAGER_PATH = new RegExp(`${MILESTONES_BASE_URI}/milestones-data-manager/([A-Za-z0-9]){15,18}$`, 'i');
  const UNIFIED_ANALYTICS_SUBSCRIPTIONS_DIGEST_GET = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/subscriptions/digest/([A-Za-z0-9_]+){3,50}$`, 'i');
  const UNIFIED_ANALYTICS_SUBSCRIPTIONS_DIGEST_PATCH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/subscriptions/digest/([A-Za-z0-9_]+){3,50}$`, 'i');
  const UNIFIED_ANALYTICS_ANNOTATIONS_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/annotations$`, 'i');
  const UNIFIED_ANALYTICS_SLACK_CHANNEL_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/slack/channels$`, 'i');
  const UNIFIED_ANALYTICS_ANNOTATIONS_SLACK_APP_INFO_PATH = new RegExp(`${UNIFIED_ANALYTICS_BASE_URI}/annotations/slack-app-info$`, 'i');
  const APP_FRAMEWORK_APPS_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/apps$`, 'i');
  const APP_FRAMEWORK_APPS_POST = APP_FRAMEWORK_APPS_GET;
  const APP_FRAMEWORK_APP_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/apps/([^/]+)$`, 'i');
  const APP_FRAMEWORK_APP_DELETE = APP_FRAMEWORK_APP_GET;
  const APP_FRAMEWORK_APP_ASSETS_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/apps/([^/]+)/assets$`, 'i');
  const APP_FRAMEWORK_APP_ACTIVITIES_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/apps/([^/]+)/activities$`, 'i');
  const APP_FRAMEWORK_APP_ACTIVITY_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/apps/([^/]+)/activities/([^/])+$`, 'i');
  const APP_FRAMEWORK_INSTALLED_ASSETS_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/installed-assets$`, 'i');
  const APP_FRAMEWORK_TEMPLATES_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/templates$`, 'i');
  const APP_FRAMEWORK_TEMPLATE_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/templates/([^/]+)$`, 'i');
  const APP_FRAMEWORK_TEMPLATE_CONFIG_GET = new RegExp(`${APP_FRAMEWORK_BASE_URI}/templates/([^/]+)/configuration$`, 'i');
  const unifiedAnalytics = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_ANNOTATIONS_PATH, 'AnalyticsController.createAnnotation', 'annotation'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_ANNOTATIONS_PATH, 'AnalyticsController.getAnnotations'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_SLACK_CHANNEL_PATH, 'AnalyticsController.createAssetSlackChannel', 'assetChannel'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_SLACK_CHANNEL_PATH, 'AnalyticsController.getAssetSlackChannels'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_ANNOTATIONS_SLACK_APP_INFO_PATH, 'AnalyticsController.getSlackAppInfo'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_WORKSPACE_COLLECTION_PATH, 'AnalyticsController.createWorkspace', 'workspace'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_WORKSPACE_COLLECTION_PATH, 'AnalyticsController.getWorkspaces'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_WORKSPACE_BY_NAME, 'AnalyticsController.getWorkspace'), generateAdapter('delete', BASE_URI, UNIFIED_ANALYTICS_WORKSPACE_BY_NAME, 'AnalyticsController.deleteWorkspace', 'workspace'), generateAdapter('patch', BASE_URI, UNIFIED_ANALYTICS_WORKSPACE_BY_NAME, 'AnalyticsController.updateWorkspace', 'workspace'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_WORKSPACE_ASSETS, 'AnalyticsController.createWorkspaceAsset', 'workspaceAsset'), generateAdapter('delete', BASE_URI, UNIFIED_ANALYTICS_DELTE_WORKSPACE_ASSET, 'AnalyticsController.deleteWorkspaceAsset', 'deleteWorkspaceAsset'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_DASHBOARD_COLLECTION_PATH, 'AnalyticsController.getDashboards'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_DASHBOARD_BY_NAME, 'AnalyticsController.getDashboard'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_LOGLINES_BY_NAME, 'AnalyticsController.createLoglines', 'loglines'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_DASHBOARD_COLLECTION_PATH, 'AnalyticsController.createDashboard', 'dashboard'), generateAdapter('patch', BASE_URI, UNIFIED_ANALYTICS_DASHBOARD_BY_NAME, 'AnalyticsController.updateDashboard', 'dashboard'), generateAdapter('delete', BASE_URI, UNIFIED_ANALYTICS_DASHBOARD_BY_NAME, 'AnalyticsController.deleteDashboard'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_VISUALIZATIONS_COLLECTION_PATH, 'AnalyticsController.getVisualizations'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_VISUALIZATION, 'AnalyticsController.getVisualization'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_VISUALIZATIONS_BUNDLE, 'AnalyticsController.getVisualizationBundle'), generateAdapter('delete', BASE_URI, UNIFIED_ANALYTICS_VISUALIZATION, 'AnalyticsController.deleteVisualization'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_VISUALIZATIONS_COLLECTION_PATH, 'AnalyticsController.createVisualization', 'visualization'), generateAdapter('patch', BASE_URI, UNIFIED_ANALYTICS_VISUALIZATION, 'AnalyticsController.updateVisualization', 'visualization'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_FOLLOW, 'AnalyticsController.follow', 'followerAsset'), generateAdapter('delete', BASE_URI, UNIFIED_ANALYTICS_UNFOLLOW, 'AnalyticsController.unfollow'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_FOLLOWERS, 'AnalyticsController.getFollowers'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_FOLLOWED_ASSETS, 'AnalyticsController.getFollowedAssets'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_UNIQUE_FOLLOWER_COUNT, 'AnalyticsController.getUniqueFollowerCount'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_ASSETS_QUERY, 'AnalyticsController.queryAssets', 'assetsQueryInput'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_USERS_QUERY, 'AnalyticsController.queryUsers', 'usersQueryInput'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_ORGS, 'AnalyticsController.getOrg'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_FLOW_COLLECTION_PATH, 'AnalyticsController.getFlows'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_FLOW_BY_NAME, 'AnalyticsController.getFlowByName'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_LIBRARY_ASSETS_PATH, 'AnalyticsController.fetchAssets', 'libraryAssetsQueryInput'), generateAdapter('post', BASE_URI, UNIFIED_ANALYTICS_PUBLISH_MONITORING_EVENTS_PATH, 'AnalyticsController.publish', 'events'), generateAdapter('get', BASE_URI, UNIFIED_ANALYTICS_SUBSCRIPTIONS_DIGEST_GET, 'AnalyticsController.getSubscriptionDigestConfig'), generateAdapter('patch', BASE_URI, UNIFIED_ANALYTICS_SUBSCRIPTIONS_DIGEST_PATCH, 'AnalyticsController.updateSubscriptionDigestConfig', 'digestConfig')];
  const EVF_SDK_GET_EVENT_TYPES_PATH = new RegExp(`${EVF_SDK_BASE_URI}/event-types`, 'i');
  const EVF_SDK_POST_EVENT_PATH = new RegExp(`${EVF_SDK_BASE_URI}/event$`, 'i');
  const OMNI_DESIGNER_GET_EMAIL_TEMPLATES = new RegExp(`${OMNI_DESIGNER_BASE_URI}/email-templates`, 'i');
  const OMNI_DESIGNER_GET_INTEGRATION_PROCEDURE_DATA = new RegExp(`${OMNI_DESIGNER_BASE_URI}/record/[A-Za-z0-9_]`, 'i');
  const OMNI_DESIGNER_POST_INTEGRATION_PROCEDURE_ELEMENT = new RegExp(`${OMNI_DESIGNER_BASE_URI}/insert-ip-record`, 'i');
  const SEMANTIC_ENGINE_POST_GATEWAY_PATH = new RegExp(`${SEMANTIC_ENGINE_BASE_URI}/gateway$`, 'i');
  const homeHealth = [generateAdapter('post', HEALTH_CLOUD_BASE_URI, VISIT_BROADCAST_ASSIGNMENT_API_PATH, 'HomeHealthController.broadcastVisitAssignment', 'VisitBroadcastAssignmentInput'), generateAdapter('post', HEALTH_CLOUD_BASE_URI, VISIT_BROADCAST_API_PATH, 'HomeHealthController.createVisitBroadcast', 'VisitBroadcastInput')];
  const providerNetworkManagement = [generateAdapter('get', HEALTH_CLOUD_BASE_URI, CASE_RELATED_FILE_PROCESS_INFORMATION_PATH, 'ProviderNetworkManagementController.getCaseRelatedFileProcessInformation')];
  const connect = [generateAdapter('get', CONNECT_BASE_URI, NOTIFICATION_SERVICE_CONFIG_PATH, 'NotificationServiceConnectFamilyController.getNotificationServiceConfig'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, AI_ACCELERATOR_RECOMMENDATIONS, 'AIAcceleratorConnectFamilyController.fetchRecommendations'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, AI_ACCELERATOR_PREDICTIONS, 'AIAcceleratorConnectFamilyController.predictions'), generateAdapter('post', CONNECT_BASE_URI, AI_ACCELERATOR_GET_PREDICTIONS, 'AIAcceleratorConnectFamilyController.getPredictions', 'predictionRequest'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, LOCK_RECORD_PATH, 'SustainabilityFamilyController.lockRecord'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, UNLOCK_RECORD_PATH, 'SustainabilityFamilyController.unlockRecord'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, DGF_DATE_ISSUE_PATH, 'SustainabilityFamilyController.identifyDateIssues'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, DGF_DATAGAP_PATH, 'SustainabilityFamilyController.computeDataGapFillers'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, COMMUNITIES_MICROBATCHING_PATH, 'CommunitiesController.ingestRecord'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, NLP_SERVICE_CLAUSE_GENERATION, 'IndustriesEinsteinNLPServiceController.createAINaturalLangProcessResult'), generateAdapter('get', CONNECT_BASE_URI, NLP_SERVICE_READ_RESULTS, 'IndustriesEinsteinNLPServiceController.fetchAINaturalLangProcessResultsBySourceId'), generateAdapter('get', CONNECT_BASE_URI, NLP_SERVICE_READ_RESULTS_BY_REFERENCE_RECORD, 'IndustriesEinsteinNLPServiceController.fetchAINaturalLangProcessResultsByReferenceRecordId'), generateAdapter('get', CONNECT_BASE_URI, COMMUNITIES_NAVIGATION_MENU_PATH, 'NavigationMenuController.getCommunityNavigationMenu'), generateAdapter('get', CONNECT_BASE_URI, COMMUNITIES_PREVIEW_URL_PATH, 'CommunitiesController.getPagePreviewUrl'), generateAdapter('get', CMS_BASE_URI, GET_COLLECTION_ITEMS_PATH, 'ManagedContentController.getCollectionItems'), generateAdapter('get', CONNECT_BASE_URI, GET_SEARCH_RESULTS, 'ManagedContentController.searchManagedContentForItems'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_PATH, 'ManagedContentController.getManagedContent'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_PROVIDERS_PATH, 'ManagedContentController.getManagedContentProviders'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_REFERENCED_BY_PATH, 'ManagedContentController.getManagedContentReferencedBy'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_VARIANT_RENDITION_PATH, 'ManagedContentController.getManagedContentVariantRendition'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_VARIANT_REFERENCES_PATH, 'ManagedContentController.getVariantReferences'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_VARIANT_PATH, 'ManagedContentController.getManagedContentVariant'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_VARIANT_VERSIONS_PATH, 'ManagedContentController.getManagedContentVariantVersions'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_SPACE_FOLDER_PATH, 'ManagedContentController.getManagedContentSpaceFolder'), generateAdapter('post', CMS_BASE_URI, POST_MANAGED_CONTENT_SPACE_FOLDERS_PATH, 'ManagedContentController.postManagedContentSpaceFolder', 'managedContentSpaceFolderInput'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_FOLDER_ITEMS_PATH, 'ManagedContentController.getManagedContentSpaceFolderItems'), generateAdapter('get', CMS_BASE_URI, GET_WEB_URLS_PATH, 'ManagedContentController.getWebUrls'), generateAdapter('patch', CMS_BASE_URI, UPDATE_MANAGED_CONTENT_WEB_URL_PATH, 'ManagedContentController.updateManagedContentWebUrl', 'managedContentWebUrlInput'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CMS_BASE_URI, UNPUBLISH_MANAGED_CONTENT_PATH, 'ManagedContentController.unpublish', 'unpublishInput'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CMS_BASE_URI, PUBLISH_MANAGED_CONTENT_PATH, 'ManagedContentController.publish', 'publishInput'), generateAdapter('post', CMS_BASE_URI, CLONE_SINGLE_CONTENT_PATH, 'ManagedContentController.cloneManagedContentDocument', 'ManagedContentCloneInputParam'), generateAdapter('post', CMS_BASE_URI, POST_MANAGED_CONTENT_LLM_TRANSALTION_PATH, 'ManagedContentController.createManagedContentTranslationVariants', 'languages'), generateAdapter('get', CONNECT_BASE_URI, MCS_FOLDER_SHARES_PATH, 'ManagedContentController.getMCSFolderShares'), generateAdapter('patch', CONNECT_BASE_URI, MCS_FOLDER_SHARES_PATH, 'ManagedContentController.patchMCSFolderShares', 'mCSFolderShareCollectionUpdateInput'), generateAdapter('get', CONNECT_BASE_URI, LIST_CONTENT_INTERNAL_PATH, 'ManagedContentController.getPublishedManagedContentListByContentKey'), generateAdapter('get', CONNECT_BASE_URI, LIST_CONTENT_PATH, 'ManagedContentController.getManagedContentByTopicsAndContentKeys'), generateAdapter('get', CONNECT_BASE_URI, GET_COLLECTION_ITEMS_FOR_SITE, 'ManagedContentDeliveryController.getCollectionItemsForSite'), generateAdapter('get', CONNECT_BASE_URI, GET_COLLECTION_METADATA_FOR_SITE, 'ManagedContentDeliveryController.getCollectionMetadataForSite'), generateAdapter('get', CONNECT_BASE_URI, GET_COLLECTION_ITEMS_FOR_CHANNEL, 'ManagedContentDeliveryController.getCollectionItemsForChannel'), generateAdapter('get', CONNECT_BASE_URI, GET_COLLECTION_METADATA_FOR_CHANNEL, 'ManagedContentDeliveryController.getCollectionMetadataForChannel'), generateAdapter('get', CMS_BASE_URI, MANAGED_CONTENT_ORCHESTRATION_DEFINITIONS_PATH, 'ManagedContentController.getManagedContentOrchestrationDefinitions'), generateAdapter('get', CMS_BASE_URI, MANAGED_CONTENT_ORCHESTRATION_INSTANCES_PATH, 'ManagedContentController.getManagedContentOrchestrationInstances'), generateAdapter('get', CMS_BASE_URI, MANAGED_CONTENT_CHANNEL_MANAGEMENT_PATH, 'ManagedContentChannelsController.getManagedContentChannels'), generateAdapter('get', CONNECT_BASE_URI, GET_FILE_UPLOAD_CONFIG_PATH, 'FilesController.getFileUploadConfig'), generateAdapter('post', CONNECT_BASE_URI, CREATE_CONTENT_DOC_FROM_CONTENT_BODY_PATH, 'FilesController.createContentDocFromContentBody', 'file'), generateAdapter('post', CMS_BASE_URI, MANAGED_CONTENT_CHANNEL_MANAGEMENT_PATH, 'ManagedContentChannelsController.postManagedContentChannel', 'ManagedContentCreateInputParam'), generateAdapter('get', CMS_BASE_URI, MANAGED_CONTENT_CHANNEL_MANAGEMENT_RECORD_PATH, 'ManagedContentChannelsController.getManagedContentChannel'), generateAdapter('patch', CMS_BASE_URI, MANAGED_CONTENT_CHANNEL_MANAGEMENT_RECORD_PATH, 'ManagedContentChannelsController.patchManagedContentChannel', 'ManagedContentUpdateInputParam'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CMS_BASE_URI, MANAGED_CONTENT_ORCHESTRATION_INSTANCES_PATH, 'ManagedContentController.createManagedContentOrchestrationInstance'), generateAdapter('delete', CMS_BASE_URI, DELETE_MANAGED_CONTENT_ORCHESTRATION_INSTANCES_PATH, 'ManagedContentController.cancelOrchestrationInstance'), generateAdapter('get', CMS_BASE_URI, MANAGED_CONTENT_RUNNING_ORCHESTRATION_HISTORY_PATH, 'ManagedContentController.getManagedContentRunningOrchestrationHistoryEvents'), generateAdapter('get', CMS_BASE_URI, MANAGED_CONTENT_TYPE_FOR_MIXIN_PATH, 'ManagedContentController.getManagedContentTypesForMixin'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CMS_NON_CONNECT_BASE_URI, DEPLOYMENT_PATH, 'ManagedContentController.createDeployment'), generateAdapter('get', CMS_NON_CONNECT_BASE_URI, DEPLOYMENT_PATH, 'ManagedContentController.getDeployments'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CMS_BASE_URI, SCHEDULED_DEPLOYMENT_PATH, 'ManagedContentController.updateDeployment'), generateAdapter('post', CMS_BASE_URI, CMS_SCHEDULES_PATH, 'ManagedContentController.createSchedule', 'ScheduleInput'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CMS_BASE_URI, CREATE_MANAGED_CONTENT_VARIANT_PATH, 'ManagedContentController.createManagedContentVariant'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CMS_BASE_URI, CREATE_MANAGED_CONTENT_PATH, 'ManagedContentController.createManagedContent'), generateAdapter('get', CMS_BASE_URI, GET_CMS_SPACES, 'ManagedContentController.getManagedContentSpaces'), generateAdapter('get', CMS_BASE_URI, CMS_SPACE_PATH, 'ManagedContentController.getManagedContentSpace'), generateAdapter('get', CMS_BASE_URI, CMS_SINGLE_ITEM_PATH, 'ManagedContentController.getManagedContentSingleItem'), generateAdapter('get', CMS_BASE_URI, CMS_MANAGED_CONTENT_ORCH_CONFIG_PATH, 'ManagedContentController.getManagedContentSpaceOrchestratorConfig'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CMS_BASE_URI, CMS_MANAGED_CONTENT_ORCH_CONFIG_PATH, 'ManagedContentController.putManagedContentSpaceOrchestratorConfig'), generateAdapter('get', CMS_BASE_URI, GET_MANAGED_CONTENT_PREVIEW_COLLECTION_PATH, 'ManagedContentController.getManagedContentPreviews'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('get', CONNECT_BASE_URI, GET_MANAGED_CONTENT_FOR_SITE_PATH, 'ManagedContentController.getManagedContentForSite'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CMS_BASE_URI, CMS_SPACE_PATH, 'ManagedContentController.patchManagedContentSpace'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_MANAGED_CONTENT_IMPORT_V2_JOB_PATH, 'ManagedContentController.createManagedContentImportV2Job'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_MANAGED_CONTENT_EXPORT_V2_JOB_PATH, 'ManagedContentController.createManagedContentExportV2Job'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_TRANSLATION_V2_JOB_PATH, 'ManagedContentController.createTranslationV2Job'), generateAdapter('get', CMS_NON_CONNECT_BASE_URI, GET_ALL_CMS_JOBS_PATH, 'ManagedContentController.getAllCMSJobsForSpace'), generateAdapter('get', CMS_NON_CONNECT_BASE_URI, GET_CMS_JOB_PATH, 'ManagedContentController.getCMSJobForSpace'), generateAdapter('get', CMS_NON_CONNECT_BASE_URI, GET_MANAGED_CONTENT_SPACE_FOLDER_ITEMS_V1_PATH, 'ManagedContentController.getManagedContentSpaceFolderItemsV1'), generateAdapter('get', CONNECT_BASE_URI, GET_FOLDER_SHARE_TARGETS_PATH, 'ManagedContentController.getMCSFolderShareTargets'), generateAdapter('delete', CMS_BASE_URI, MANAGED_CONTENT_CHANNEL_MANAGEMENT_RECORD_PATH, 'ManagedContentChannelsController.deleteManagedContentChannel'), generateAdapter('get', EXPERIENCE_MODEL_BASE_URI, GET_BLOCK_TYPE_PATH, 'ExperienceModelTypeSystemController.getBlockType'), generateAdapter('get', EXPERIENCE_MODEL_BASE_URI, GET_BLOCK_TYPES_PATH, 'ExperienceModelTypeSystemController.getBlockTypes'), generateAdapter('get', EXPERIENCE_MODEL_BASE_URI, GET_CONTENT_TYPE_PATH, 'ExperienceModelTypeSystemController.getContentType'), generateAdapter('get', EXPERIENCE_MODEL_BASE_URI, GET_CONTENT_TYPES_PATH, 'ExperienceModelTypeSystemController.getContentTypes'), generateAdapter('get', EXPERIENCE_MODEL_BASE_URI, GET_PROPERTY_TYPE_PATH, 'ExperienceModelTypeSystemController.getPropertyType'), generateAdapter('get', EXPERIENCE_MODEL_BASE_URI, GET_PROPERTY_TYPES_PATH, 'ExperienceModelTypeSystemController.getPropertyTypes'), generateAdapter('post', EXPERIENCE_MODEL_BASE_URI, POST_TYPES, 'ExperienceModelTypesController.getTypes', 'experienceModelTypes'), generateAdapter('get', CONNECT_BASE_URI, RECORD_SEO_PROPERTIES_PATH, 'SeoPropertiesController.getRecordSeoProperties'), generateAdapter('get', CONNECT_BASE_URI, GET_ORCHESTRATION_INSTANCE_COLLECTION_PATH, 'OrchestrationController.getOrchestrationInstanceCollection'), generateAdapter('get', CONNECT_BASE_URI, SITES_SEARCH_PATH, 'SitesController.searchSite'), generateAdapter('get', CONNECT_BASE_URI, DECISION_MATRIX_COLUMNS_PATH, 'InteractionDecisionMatrixController.getColumns'), generateAdapter('get', CONNECT_BASE_URI, BUSINESS_KNOWLEDGE_MODEL_PATH, 'RulesEngineConnectController.getBusinessKnowledgeModel'), generateAdapter('get', CONNECT_BASE_URI, GET_LOOKUP_TABLES_PATH, 'InteractionCalculationProceduresController.getLookupTables'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_EXPRESSION_SET_PATH, 'InteractionCalculationProceduresController.createExpressionSet'), generateAdapter('get', CONNECT_BASE_URI, GET_EXPRESSION_SET_PATH, 'InteractionCalculationProceduresController.readExpressionSet'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, PATCH_EXPRESSION_SET_PATH, 'InteractionCalculationProceduresController.updateExpressionSet'), generateAdapter('delete', CONNECT_BASE_URI, DELETE_EXPRESSION_SET_PATH, 'InteractionCalculationProceduresController.deleteExpressionSet'), generateAdapter('get', CONNECT_BASE_URI, GET_CONTEXT_TAG_MAPPING_PATH, 'ContextRulesController.getContextTagMappings'), generateAdapter('post', CONNECT_BASE_URI, POST_CONTEXT_TAG_MAPPING_PATH, 'ContextRulesController.createContextTagMapping', 'tagMappingInputRepresentation'), generateAdapter('patch', CONNECT_BASE_URI, PATCH_CONTEXT_TAG_MAPPING_PATH, 'ContextRulesController.updateContextTagMapping', 'tagMappingInputRepresentation'), generateAdapter('delete', CONNECT_BASE_URI, DELETE_CONTEXT_TAG_MAPPING_PATH, 'ContextRulesController.deleteContextTagMapping'), generateAdapter('get', CONNECT_BASE_URI, GET_DELETE_CONTEXT_TAG_MAPPING_PATH, 'ContextRulesController.getContextTagMapping'), generateAdapter('get', CONNECT_BASE_URI, GET_CONTEXT_RULE_USAGE_TYPE_PATH, 'ContextRulesController.getUsageTypeDetail'), generateAdapter('get', CONNECT_BASE_URI, USAGE_TYPES_PATH, 'BusinessRuleEngineController.getUsageTypes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_OBJECT_ALIAS_PATH, 'InteractionCalculationProceduresController.createObjectAlias'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, ALIAS_FIELD_PATH, 'InteractionCalculationProceduresController.updateAliasField'), generateAdapter('get', CONNECT_BASE_URI, PROCESS_TYPE_PATH, 'RulesEngineConnectController.getProcessType'), generateAdapter('get', CONNECT_BASE_URI, DECISION_MATRIX_ROWS_PATH, 'InteractionDecisionMatrixController.getRows'), generateAdapter('get', CONNECT_BASE_URI, GET_EXPRESSION_SET_ALIAS_META_INFO_PATH, 'InteractionCalculationProceduresController.getExpressionSetAliasMetaInfo'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, DECISION_MATRIX_COLUMNS_PATH, 'InteractionDecisionMatrixController.saveColumns'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, DECISION_MATRIX_ROWS_PATH, 'InteractionDecisionMatrixController.saveRows'), generateAdapter('get', CONNECT_BASE_URI, GET_DECISION_MATRIC_DETAILS_PATH, 'InteractionCalculationProceduresController.getDecisionMatrixDetails'), generateAdapter('get', CONNECT_BASE_URI, GET_DECISION_TABLE_DETAILS_PATH, 'InteractionCalculationProceduresController.getDecisionTableDetails'), generateAdapter('get', CONNECT_BASE_URI, GET_MESSAGE_TEMPLATE_DETAIL_PATH, 'BusinessRuleEngineController.getMessageTemplateDetail'), generateAdapter('get', CONNECT_BASE_URI, GET_CALC_PROC_VERSION_DETAILS_PATH, 'InteractionCalculationProceduresController.getCalcProcVersionDefinition'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, GET_CALC_PROC_VERSION_DETAILS_PATH, 'InteractionCalculationProceduresController.activateCalcProcedureVersion'), generateAdapter('get', CONNECT_BASE_URI, GET_CALC_PROC_DETAILS_PATH, 'InteractionCalculationProceduresController.getCalcProcDetails'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, POST_CALC_PROC_VERSION_DETAILS_PATH, 'InteractionCalculationProceduresController.createRule'), generateAdapter('get', CONNECT_BASE_URI, SEARCH_CALCULATION_PROCEDURES_DETAILS_PATH, 'InteractionCalculationProceduresController.searchCalculationProcedure'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, SIMULATION_EVALUATION_SERVICE_PATH, 'InteractionCalculationProceduresController.simulateEvaluationService'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, POST_INVOKE_EXPRESSION_SET_PATH, 'BusinessRuleEngineController.calculate'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CMS_BASE_URI, REPLACE_MANAGED_CONTENT_VARIANT_PATH, 'ManagedContentController.replaceManagedContentVariant'), generateAdapter('delete', CMS_BASE_URI, DELETE_MANAGED_CONTENT_VARIANT_PATH, 'ManagedContentController.deleteManagedContentVariant'), generateAdapter('get', CONNECT_BASE_URI, SEARCH_DECISION_MATRICES_PATH, 'InteractionCalculationProceduresController.searchDecisionMatrixByName'), generateAdapter('get', CONNECT_BASE_URI, SEARCH_DECISION_TABLES_PATH, 'InteractionCalculationProceduresController.searchDecisionTableByName'), generateAdapter('get', CONNECT_BASE_URI, SEARCH_MESSAGE_TEMPLATES_PATH, 'BusinessRuleEngineController.searchMessageTemplates'), generateAdapter('get', CONNECT_BASE_URI, GET_EXPLAINABILITY_LOGS_PATH, 'InteractionCalculationProceduresController.getExplainabilityLogs'), generateAdapter('get', CONNECT_BASE_URI, SIMULATION_EVALUATION_SERVICE_PATH, 'InteractionCalculationProceduresController.getSimulationInputVariables'), generateAdapter('get', CONNECT_BASE_URI, GET_ACTION_PLAN_STATUS_INFO_PATH, 'ActionPlanController.getActionPlanStatusInfo'), generateAdapter('get', CONNECT_BASE_URI, GET_ACTION_PLAN_TEMPLATE_ITEMS_LABEL_PATH, 'ActionPlanController.getActionPlanTemplateItemsLabel'), generateAdapter('patch', CONNECT_BASE_URI, UPDATE_ACTION_PLAN_TEMPLATE_TASKS, 'ActionPlanController.updateActionPlanTemplateTasks', 'actionPlanTemplateUpdateInput'), generateAdapter('patch', CONNECT_BASE_URI, UPDATE_ACTION_PLAN_TASKS, 'ActionPlanController.updateActionPlanTasks', 'actionPlanUpdateInput'), generateAdapter('get', CONNECT_BASE_URI, GET_ACTION_PLANS_PATH, 'ActionPlanController.getActionPlanListByTargetRecord'), generateAdapter('get', CONNECT_BASE_URI, GET_ACTION_PLAN_ITEMS_PATH, 'ActionPlanController.getActionPlanItems'), generateAdapter('get', PSS_SOCIAL_CARE_BASE_URI, GET_CARE_PLAN_PATH, 'PublicSectorFamilyController.getCarePlanDetails'), generateAdapter('get', PSS_SOCIAL_CARE_BASE_URI, GET_CARE_PLAN_BENEFIT_SESSION, 'PublicSectorAndProgramMgmtFamilyController.getCarePlanBenefitSessionDetails'), generateAdapter('get', PSS_SOCIAL_CARE_BASE_URI, GET_CARE_PLAN_DEFINITION, 'PublicSectorFamilyController.getCarePlanDefinition'), generateAdapter('get', PSS_SOCIAL_CARE_BASE_URI, GET_CARE_PLAN_TEMPLATE_DETAILS, 'PublicSectorFamilyController.getCarePlanTemplateDetails'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', PSS_SOCIAL_CARE_BASE_URI, POST_CARE_PLAN_TEMPLATE_DETAILS, 'PublicSectorFamilyController.postCarePlanTemplateDetails'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', PSS_SOCIAL_CARE_BASE_URI, POST_CARE_SERVICE_PLAN_DETAILS, 'PublicSectorFamilyController.postCarePlanDetails'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', PSS_SOCIAL_CARE_BASE_URI, UPDATE_CARE_PLAN_DETAILS, 'PublicSectorFamilyController.updateCarePlanDetails'), generateAdapter('get', PSS_SOCIAL_CARE_BASE_URI, GET_CARE_PLAN_TASK, 'PublicSectorFamilyController.getCarePlanTasks'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', PSS_SOCIAL_CARE_BASE_URI, POST_CARE_PLAN_TASK, 'PublicSectorFamilyController.createCarePlanTasks'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', PSS_SOCIAL_CARE_BASE_URI, UPDATE_CARE_PLAN_TASK, 'PublicSectorFamilyController.updateCarePlanTasks'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_BENEFIT_DISBURSEMENTS, 'PublicSectorAndProgramMgmtFamilyController.createBenefitDisbursements'), generateAdapter('get', CONNECT_BASE_URI, LOYALTY_PROGRAM_PROCESS_RULE, 'LoyaltyEngineConnectController.getProgramProcessRule'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, LOYALTY_PROGRAM_PROCESS_RULE_CREATION, 'LoyaltyEngineConnectController.createProgramProcessRule'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, LOYALTY_PROGRAM_PROCESS_RULE, 'LoyaltyEngineConnectController.updateProgramProcessRule'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, LOYALTY_PROGRAM_EXECUTION, 'LoyaltyEngineConnectController.executeRealtimeLoyaltyEngine'), generateAdapter('get', CONNECT_BASE_URI, LOYALTY_PROGRAM_EXPLAINABILITY, 'LoyaltyEngineConnectController.getJournalExplainabilityInfo'), generateAdapter('get', EXPLAINABILITY_BASE_URI, EXPLAINABILITY_ACTION_LOG_PATH, 'ExplainabilityServiceController.getExplainabilityActionLogs'), generateAdapter('get', EXPLAINABILITY_BASE_URI, EXPLAINABILITY_DETAILED_ACTION_LOG_PATH, 'ExplainabilityServiceController.getExplainabilityDetailedActionLog'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EXPLAINABILITY_BASE_URI, EXPLAINABILITY_ACTION_LOG_PATH, 'ExplainabilityServiceController.storeExplainabilityActionLog'), generateAdapter('get', CIB_BASE_URI, CIB_GET_CONTACTS_INTERACTIONS_PATH, 'CibController.getContactsInteractions'), generateAdapter('get', CIB_BASE_URI, CIB_GET_INTERACTION_INSIGHTS_PATH, 'CibController.getInteractionInsights'), generateAdapter('get', CIB_BASE_URI, CIB_GET_DEAL_PARTIES_PATH, 'CibController.getDealParties'), generateAdapter('get', CONNECT_BASE_URI, TEARSHEET_GET_TEARSHEETS_PATH, 'TearsheetController.getTearsheets'), generateAdapter('get', CONNECT_BASE_URI, SERVICEPROCESS_GET_CASE_SERVICE_PROCESS_PATH, 'IServiceProcessConnectFamilyController.getCaseServiceProcessLayoutData'), generateAdapter('get', CONNECT_BASE_URI, SERVICEPROCESS_GET_SERVICE_PROCESS_DEFINITION_PATH, 'IServiceProcessConnectFamilyController.fetchServiceProcessDefinition'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, ACTIONABLE_LIST_DEFINITION_URI_PATH, 'IndustriesActionableListDefinitionController.createActionableListDefinition'), generateAdapter('post', CONNECT_BASE_URI, ACTIONABLE_LIST_BULK_ACTION_PLAN_URI_PATH, 'IndustriesActionableListMemberController.createBulkActionPlans', 'createBulkActionPlanInput'), generateAdapter('get', CONNECT_BASE_URI, ACTIONABLE_LIST_DEFINITION_URI_PATH, 'IndustriesActionableListDefinitionController.getActionableListDefinitions'), generateAdapter('get', CONNECT_BASE_URI, ACTIONABLE_LIST_GET_ACTIONABLE_LIST_MEMBERS_PATH, 'IndustriesActionableListController.getActionableListMembers'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, UPSERT_ACTIONABLE_LIST_URI_PATH, 'IndustriesActionableListController.upsertActionableList'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, ACTIONABLE_LIST_DATASET_INFO_URI_PATH, 'IndustriesActionableListController.getActionableListDatasetInfo'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, UPSERT_AL_DATASET_COLUMN_USER_URI_PATH, 'IndustriesActionableListController.upsertActionableListDatasetColumnUser'), generateAdapter('post', CONNECT_BASE_URI, AL_FILTER_TEMPLATE_URI_PATH, 'IndustriesActionableListController.upsertActionableListFilterTemplate', 'actionableListDefinitionFilterInput'), generateAdapter('get', CONNECT_BASE_URI, AL_FILTER_TEMPLATE_URI_PATH_WITH_PARAM, 'IndustriesActionableListController.getFilterTemplate'), generateAdapter('delete', CONNECT_BASE_URI, AL_FILTER_TEMPLATE_URI_PATH_WITH_PARAM, 'IndustriesActionableListController.deleteFilterTemplate'), generateAdapter('get', CONNECT_BASE_URI, AL_GET_FILTER_TEMPLATE_URI_PATH, 'IndustriesActionableListController.getFilterTemplatesForListDefinition'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, UPSERT_AL_REFRESH_COUNT_URI_PATH, 'IndustriesActionableListController.upsertActionableListRefreshFilter'), generateAdapter('get', CONNECT_BASE_URI, ALD_COLUMN_VALUES_URI_PATH, 'IndustriesActionableListController.getDatasetColumnValues'), generateAdapter('get', CLM_BASE_URI, CLM_CONTRACT_URI_PATH, 'ClmController.getContractDocumentVersion'), generateAdapter('get', CLM_BASE_URI, CLM_CONTRACT_URI_CC_USER_PATH, 'ClmController.getLatestContractDocumentVersionCC'), generateAdapter('get', CLM_BASE_URI, CLM_CONTRACT_GET_RECIPIENT_STATUS_URI_PATH, 'ClmController.getDocumentRecipientAndStatus'), generateAdapter('get', CLM_BASE_URI, CLM_CONTRACT_GET_EXTERNAL_DOC_URI_PATH, 'ClmController.getExternalDocumentReviewCC'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, CLM_CONTENT_DOCUMENTS, 'ClmController.updateSharingOnAttachment'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CLM_BASE_URI, CLM_CONTRACT_URI_PATH, 'ClmController.createContractDocumentVersionAndInitializeGenerateDocumentProcess'), generateAdapter('get', CLM_BASE_URI, CLM_GET_DOCUMENT_URI_PATH, 'ClmController.getTemplates'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, CLM_CONTRACT_CHECKIN_URI_PATH, 'ClmController.checkIn'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, CLM_CONTRACT_UNLOCK_URI_PATH, 'ClmController.unlock'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, CLM_CONTRACT_LOCK_URI_PATH, 'ClmController.lockContractDocumentVersion'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CLM_BASE_URI, CLM_CONTRACT_EXTERNAL_REVIEW_DOCUMENT_URI_PATH, 'ClmController.createExternalReviewDocument'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CLM_BASE_URI, CLM_CONTRACT_CHECKOUT_URI_PATH, 'ClmController.checkoutContractDocumentVersion'), generateAdapter('delete', CLM_BASE_URI, CLM_CONTENT_DOCUMENTS, 'ClmController.deleteAttachment'), generateAdapter('get', CLM_BASE_URI, CLM_CONTENT_DOCUMENTS, 'ClmController.getContentDocument'), generateAdapter('delete', CLM_BASE_URI, CLM_CONTRACT_REVIEW_PATH, 'ClmController.deleteContractDocumentVersionReview'), generateAdapter('get', CLM_BASE_URI, CLM_CONTRACT_REVIEW_PATH, 'ClmController.getContractDocumentVersionReview'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, CLM_CONTRACT_REVIEW_PATH, 'ClmController.updateContractDocumentVersionReview'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CLM_BASE_URI, CLM_CONTRACT_REVIEW_PATH, 'ClmController.createContractDocumentVersionReview'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('delete', CLM_BASE_URI, CLM_EXTRACTION_CONTEXT_MAPPINGS_PATH, 'ClmController.deleteExtractionContextMapping'), generateAdapter('get', CLM_BASE_URI, CLM_EXTRACTION_CONTEXT_MAPPINGS_PATH, 'ClmController.getExtractionContextMapping'), generateAdapter('patch', CLM_BASE_URI, CLM_EXTRACTION_CONTEXT_MAPPINGS_PATH, 'ClmController.updateExtractionContextMapping', 'updateExtractionContextMapping'), generateAdapter('post', CLM_BASE_URI, CLM_CREATE_EXTRACTION_CONTEXT_MAPPINGS_PATH, 'ClmController.createExtractionContextMapping', 'extractionContextMappingInput'), generateAdapter('get', CLM_BASE_URI, CLM_GET_DOCUMENT_GENERATION_PROCESS_PATH, 'ClmController.getDocumentGenerationProcessDetails'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, CLM_UPDATE_DOCUMENT_URI_PATH, 'ClmController.updateContractDocumentVersionWithTemplate'), generateAdapter('get', CLM_BASE_URI, CLM_GET_CONTRACT_ACTIONS_PATH, 'ClmController.getContractActions'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, CLM_CONTRACT_EXECUTE_ACTION_URI_PATH, 'ClmController.executeContractAction'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CLM_BASE_URI, SAVE_EXTERNAL_DOCUMENT_URI_PATH, 'ClmController.saveExternalDocument'), generateAdapter('get', GDF_BASE_URI, GET_LIST_VIEW_INFORMATION_LIB, 'InformationLibraryFamilyController.getDocumentClauseList'), generateAdapter('post', GDF_BASE_URI, CREATE_NEW_SNIPPET_INFORMATION_LIB, 'InformationLibraryFamilyController.createNewSnippetResource', 'createNewSnippetInput'), generateAdapter('post', GDF_BASE_URI, DELETE_SNIPPET_INFORMATION_LIB, 'InformationLibraryFamilyController.deleteSnippetResource', 'deleteSnippetInput'), generateAdapter('post', GDF_BASE_URI, DELETE_TOPIC_INFORMATION_LIB, 'InformationLibraryFamilyController.deleteTopicResource', 'deleteTopicInput'), generateAdapter('get', GDF_BASE_URI, SNIPPET_RELATED_TOPICS_INFORMATION_LIB, 'InformationLibraryFamilyController.getSnippetRelatedTopics'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, UPLOAD_REFERENCE_DATA_PATH, 'SustainabilityFamilyController.uploadReferenceData'), generateAdapter('get', CONNECT_BASE_URI, FETCH_ENTITY_VERSION_PATH, 'SustainabilityFamilyController.getEntityVersion'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, UPLOAD_ENTITY_VERSION_PATH, 'SustainabilityFamilyController.uploadEntityVersion'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, BEI_PATH, 'SustainabilityFamilyController.performBuildingEnergyIntensityCalculation'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, RECALCULATE_PATH, 'SustainabilityFamilyController.performSustainabilityFootprintCalculationOnRecord'), generateAdapter('post', CONNECT_BASE_URI, UPLOAD_DATASETS_VERSION_PATH, 'SustainabilityFamilyController.postUploadDataset', 'uploadDatasetEntityInput'), generateAdapter('post', CONNECT_BASE_URI, GENERATE_CALCULATION_CSV_PATH, 'SustainabilityFamilyController.ISCGenerateCalculatedFieldsCSV', 'csvAttachEntityInput'), generateAdapter('get', CONNECT_BASE_URI, GET_DATASETS_VERSION_PATH, 'SustainabilityFamilyController.getSCGetDatasetMetaResource'), generateAdapter('get', RCG_TENANTMANAGEMENT_BASE_URI, RCG_TPM_MANAGEMENT_PATH, 'RCGTenantManagementController.getTenantRegistrationStatus'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', RCG_TENANTMANAGEMENT_BASE_URI, RCG_TPM_MANAGEMENT_PATH, 'RCGTenantManagementController.updateTenantCertificate'), generateAdapter('get', SERVICE_EXCELLENCE_BASE_URI, SERVICE_EXCELLENCE_GET_SERVICE_CATALOG_ITEMS_PATH, 'ServiceCatalogConnectController.getServiceCatalogItems'), generateAdapter('get', SERVICE_EXCELLENCE_BASE_URI, SERVICE_EXCELLENCE_FETCH_USER_PREFERENCE_PATH, 'ServiceCatalogConnectController.getUserPreference'), generateAdapter('get', SERVICE_EXCELLENCE_BASE_URI, SERVICE_EXCELLENCE_RECENT_ACTIONS_PATH, 'ServiceCatalogConnectController.getRecentActions'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', SERVICE_EXCELLENCE_BASE_URI, SERVICE_EXCELLENCE_ACTION_LAUNCH_PATH, 'ServiceCatalogConnectController.createActionLaunchDetails'), generateAdapter('post', SERVICE_EXCELLENCE_BASE_URI, SERVICE_EXCELLENCE_SET_USER_PREFERENCE_PATH, 'ServiceCatalogConnectController.setUserPreference', 'userPreference'), generateAdapter('post', SERVICE_EXCELLENCE_BASE_URI, SERVICE_EXCELLENCE_ACTION_LAUNCHER_RECOMMENDATIONS_PATH, 'ServiceCatalogConnectController.getEinsteinRecommendedItems', 'actionLauncherRecommendations'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EPC_BASE_URI, EPC_PRODUCT_ATTRIBUTE_DEFINITION_PATH, 'EpcConnectFamilyController.createProductAttributeDefinition'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', EPC_BASE_URI, EPC_DEACTIVATE_PATH, 'EpcConnectFamilyController.deactivate'), generateAdapter('get', EPC_BASE_URI, EPC_PRODUCT_FLOW_PATH, 'ConfiguratorResourceFamilyController.getProductFlowByProductId'), generateAdapter('get', EPC_BASE_URI, EPC_PRODUCT_ATTRIBUTES_PATH, 'EpcConnectFamilyController.fetchProductAttributesByProductId'), generateAdapter('get', EPC_BASE_URI, EPC_PRODUCT_BY_ID_PATH, 'EpcConnectFamilyController.fetchEpcProductById'), generateAdapter('get', EPC_BASE_URI, EPC_CONTEXT_DEFINITION_BY_ID_PATH, 'EpcConnectFamilyController.getContextDefinitionInfoById'), generateAdapter('get', EPC_BASE_URI, EPC_CONFIG_RULE_METADATA_PATH, 'EpcConnectFamilyController.getConfigRuleMetadata'), generateAdapter('get', EPC_BASE_URI, EPC_RUNTIME_CATALOG_GET_SNAPSHOTS_PATH, 'EpcSearchConnectFamilyController.getSnapshots'), generateAdapter('get', EPC_BASE_URI, EPC_RUNTIME_CATALOG_GET_INDEX_CONFIGURATIONS_PATH, 'EpcSearchConnectFamilyController.getIndexConfigurations'), generateAdapter('put', EPC_BASE_URI, EPC_RUNTIME_CATALOG_PUT_INDEX_CONFIGURATIONS_PATH, 'EpcSearchConnectFamilyController.updateIndexConfigurations', 'epcIndexConfigurationRequestPayload'), generateAdapter('post', EPC_BASE_URI, EPC_RUNTIME_CATALOG_DEPLOY_SNAPSHOT_INDEX_PATH, 'EpcSearchConnectFamilyController.deploySnapshotIndex', 'deploySnapshotInput'), generateAdapter('post', EPC_BASE_URI, EPC_GET_RELATED_RECORDS_PATH, 'EpcConnectFamilyController.fetchRelatedRecords', 'epcProductRequestPayload'), generateAdapter('get', GROUP_BASE_URI, GET_ALL_RELATED_ENTITY_PATH, 'GroupFamilyController.getAllRelatedEntity'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', GROUP_BASE_URI, CREATE_GROUP_PATH, 'GroupFamilyController.createHousehold'), generateAdapter('get', GROUP_BASE_URI, GET_HOUSEHOLD_FIELDS_PATH, 'GroupFamilyController.getAllGroupFields'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', GROUP_BASE_URI, MERGE_GROUP_PATH, 'GroupFamilyController.mergeGroup'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', GROUP_BASE_URI, SPLIT_GROUP_PATH, 'GroupFamilyController.splitGroup'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', DATA_PROVIDER_BASE_URI, DATA_PROVIDER_OUTPUT_SCHEMA_PATH, 'DataProviderController.getDataProviderSchema'), generateAdapter('post', FORMULA_BASE_URI, FORMULA_GPT_SCHEMA_PATH, 'FormulaController.getFormulaExplanation', 'formulaExplainInput'), generateAdapter('post', FORMULA_BASE_URI, FORMULA_VALIDATION_SCHEMA_PATH, 'FormulaController.getFormulaValidation', 'formulaValidateInput'), generateAdapter('post', FORMULA_BASE_URI, FORMULA_GPT_FIX_FORMULA_SCHEMA_PATH, 'FormulaController.fixFormula', 'formulaFixInput'), generateAdapter('get', CONNECT_BASE_URI, LIGHTNING_CARDS_ACTIVATION_PATH, 'LightningCardsActivationController.getCardActivation'), generateAdapter('get', MEDIA_ADSALES_BASE_URI, GET_AVAILS_CALENDAR_METADATA, 'AvailsCalendarConnectFamilyController.getMetadata'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', MEDIA_ADSALES_BASE_URI, POST_AVAILS_CALENDAR_FORECASTS, 'AvailsCalendarConnectFamilyController.getForecasts'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', MEDIA_ADSALES_BASE_URI, POST_AVAILS_CALENDAR_CONTENDING, 'AvailsCalendarConnectFamilyController.getContendingLineItems'), generateAdapter('get', MEDIA_ADSALES_BASE_URI, GET_AVAILS_CALENDAR_CONFIGS, 'AvailsCalendarConnectFamilyController.getRuntimeConfigs'), generateAdapter('post', CONNECT_BASE_URI, DOCUMENT_MATRIX_FETCH_RESULTS, 'DocumentMatrixFamilyController.getDocumentDecision', 'inputs'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', PROGRAM_MGMT_BASE_URI, POST_TRIGGER_BENEFIT_SESSION_GENERATION_BASE_URI, 'ProgramManagementController.postTriggerBenefitSessionGeneration')];
  const commerce = [generateAdapter('get', COMMERCE_BASE_URI, GET_PRODUCT_PATH, 'CommerceCatalogController.getProduct'), generateAdapter('get', COMMERCE_BASE_URI, GET_PRODUCT_CATEGORY_PATH_PATH, 'CommerceCatalogController.getProductCategoryPath'), generateAdapter('get', COMMERCE_BASE_URI, GET_PRODUCT_PRICE_PATH, 'CommerceStorePricingController.getProductPrice'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', COMMERCE_BASE_URI, PRODUCT_SEARCH_PATH, 'CommerceProductSearchController.productSearch')];
  const commerce_management = [generateAdapter('get', COMMERCE_BASE_URI, GET_MANAGEMENT_SHIPPING_PROFILES_PATH, 'CommerceShippingController.getShippingProfilesForWebStore'), generateAdapter('get', COMMERCE_BASE_URI, GET_MANAGEMENT_SELF_REGISTRATION_CONFIGURATION_PATH, 'ICommerceManagementController.getCommerceSelfRegistrationConfigurations'), generateAdapter('patch', COMMERCE_BASE_URI, PATCH_MANAGEMENT_SELF_REGISTRATION_CONFIGURATION_PATH, 'ICommerceManagementController.updateCommerceSelfRegistrationConfiguration', 'SelfRegistrationConfigurationInputRepresentation')];
  const commerce_configuration = [generateAdapter('delete', COMMERCE_CONFIGURATION_BASE_URI, GET_COMMERCE_CONFIGURATION_ATTRIBUTE_PATH, 'CommerceConfigurationDataController.deleteAttributeValue'), generateAdapter('get', COMMERCE_CONFIGURATION_BASE_URI, GET_COMMERCE_CONFIGURATION_ATTRIBUTE_PATH, 'CommerceConfigurationDataController.getAttributeValue'), generateAdapter('put', COMMERCE_CONFIGURATION_BASE_URI, GET_COMMERCE_CONFIGURATION_ATTRIBUTE_PATH, 'CommerceConfigurationDataController.setAttributeValue', 'commerceConfigurationAttributeInputRepresentation')];
  const commerce_extension = [generateAdapter('get', COMMERCE_EXTENSION_BASE_URI, GET_EXTENSIONS_PATH, 'CommerceExtensionFamilyController.getExtensions'), generateAdapter('get', COMMERCE_EXTENSION_BASE_URI, GET_MAPPINGS_PATH, 'CommerceExtensionFamilyController.getExtensionMappings'), generateAdapter('post', COMMERCE_EXTENSION_BASE_URI, GET_MAPPINGS_PATH, 'CommerceExtensionFamilyController.mapExtension', 'mappingInputRepresentation'), generateAdapter('get', COMMERCE_EXTENSION_BASE_URI, GET_MAPPING_PATH, 'CommerceExtensionFamilyController.getExtensionMapping'), generateAdapter('put', COMMERCE_EXTENSION_BASE_URI, GET_MAPPING_PATH, 'CommerceExtensionFamilyController.remapExtension', 'mappingInputRepresentation'), generateAdapter('delete', COMMERCE_EXTENSION_BASE_URI, GET_MAPPING_PATH, 'CommerceExtensionFamilyController.unmapExtension'), generateAdapter('get', COMMERCE_EXTENSION_BASE_URI, GET_PROVIDERS_PATH, 'CommerceExtensionFamilyController.getProviders'), generateAdapter('get', COMMERCE_EXTENSION_BASE_URI, GET_PROVIDER_PATH, 'CommerceExtensionFamilyController.getProvider')];
  const commerce_esf = [generateAdapter('patch', COMMERCE_ESF_BASE_URI, PATCH_EXPERIENCE_BRANDING_PATH, 'CommerceExperienceBrandingController.updateBrandingSet', 'brandingSetInputRepresentation'), generateAdapter('post', COMMERCE_ESF_BASE_URI, POST_EXPERIENCE_EXTRACT_BRAND_PATH, 'CommerceExperienceBrandingController.queryBrandExtractor', 'brandExtractorQueryInputRepresentation'), generateAdapter('get', COMMERCE_ESF_BASE_URI, GET_EXPERIENCE_CMS_WORKSPACES_PATH, 'CommerceExperienceBrandingController.getCmsWorkspaces')];
  const commerceGoalsRecs = [generateAdapter('get', COMMERCE_GOALS_RECS_BUSINESS_OBJECTIVES_URI, BUSINESS_OBJECTIVES_PATH, 'IBusinessObjectivesAndRecsFamilyController.getBusinessObjectives'), generateAdapter('patch', COMMERCE_GOALS_RECS_BUSINESS_OBJECTIVES_URI, BUSINESS_OBJECTIVES_PATH, 'IBusinessObjectivesAndRecsFamilyController.patchBusinessObjective', 'busObjRecommendationInput'), generateAdapter('get', COMMERCE_GOALS_RECS_BUSINESS_OBJECTIVES_URI, BUSINESS_OBJECTIVES_RECOMMENDATIONS_PATH, 'IBusinessObjectivesAndRecsFamilyController.getRecommendations'), generateAdapter('patch', COMMERCE_GOALS_RECS_BUSINESS_OBJECTIVES_URI, BUSINESS_OBJECTIVES_RECOMMENDATIONS_PATH, 'IBusinessObjectivesAndRecsFamilyController.patchRecommendations', 'busObjRecommendationInput')];
  const scalecenter = [{
    method: 'get',
    predicate: path => SCALE_CENTER_GET_METRICS_PATH.test(path),
    transport: {
      controller: 'ScaleCenterController.queryMetrics'
    }
  }];
  const networkDataCategory = [{
    method: 'get',
    predicate: path => KNOWLEDGE_ARTICLE_PATH.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.getArticlesForCategory'
    }
  }, {
    method: 'get',
    predicate: path => CATALOG_ITEM_FOR_COMMUNITY_PATH.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.getServiceCatalogItemsForCommunity'
    }
  }, {
    method: 'get',
    predicate: path => CATALOG_ITEM_PATH.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.getServiceCatalogItems'
    }
  }, {
    method: 'get',
    predicate: path => NETWORK_DATA_CATEGORIES_PATH.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.getNetworkDataCategories'
    }
  }, {
    method: 'put',
    predicate: path => NETWORK_DATA_CATEGORIES_PATH.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.updateNetworkDataCategories'
    }
  }, {
    method: 'patch',
    predicate: path => NETWORK_DATA_CATEGORY_PATH.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.updateNetworkDataCategory'
    }
  }, {
    method: 'get',
    predicate: path => PARENT_NETWORK_DATA_CATEGORY_PATH.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.getParentNetworkDataCategoryPath'
    }
  }, {
    method: 'get',
    predicate: path => CHILD_CATEGORY.test(path),
    transport: {
      controller: 'NetworkDataCategoryController.getChildCategories'
    }
  }];
  const dataCategory = [{
    method: 'get',
    predicate: path => CATEGORY_GROUP_PATH.test(path),
    transport: {
      controller: 'DataCategoryController.getCategoryGroups'
    }
  }];
  const learningContentPlatform = [generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_CONTENT_PLATFORM_RELATED_LIST_PATH, 'LearningContentPlatformController.getFeaturedItemsRelatedList'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_CONTENT_PLATFORM_RECOMMENDED_LIST_PATH, 'LearningContentPlatformController.getFeaturedItemsRecommendedList'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_CONFIG_PATH, 'LearningContentPlatformController.getLearningConfig'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_ITEM_LIST_PATH, 'LearningContentPlatformController.getLearningItemsList'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_ITEM_PROGRESS_PATH, 'LearningContentPlatformController.getLearningItemProgress'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', LEARNING_CONTENT_PLATFORM_BASE_URI, EVALUATE_LEARNING_ITEM_PATH, 'LearningContentPlatformController.evaluateLearningItem'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_TEXT_LESSON_PATH, 'LearningContentPlatformController.getTextLesson'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_MODEL_PATH, 'LearningContentPlatformController.getLearningModel'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_MODULE_PATH, 'LearningContentPlatformController.getModule'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_LEARNING_PRACTICE_PATH, 'LearningContentPlatformController.getLearningPractice'), generateAdapter('get', LEARNING_CONTENT_PLATFORM_BASE_URI, GET_COACHING_AI_FEEDBACK_PATH, 'LearningContentPlatformController.getCoachingAIFeedback'), generateAdapter('post', LEARNING_CONTENT_PLATFORM_BASE_URI, SUBMIT_FOR_COACHING_AI_FEEDBACK_PATH, 'LearningContentPlatformController.submitForCoachingAIFeedback', 'coachingAICallSubmissionInputRepresentation'), generateAdapter('post', LEARNING_CONTENT_PLATFORM_BASE_URI, SUBMIT_FOR_COACHING_AI_PRODUCT_PITCH_FEEDBACK_PATH, 'LearningContentPlatformController.submitForCoachingMomentsProductPitchFeedback', 'coachingAIProductPitchFeedbackInputRepresentation')];
  const guidance = [{
    method: 'get',
    predicate: path => path.startsWith(GUIDANCE_BASE_URI) && !GET_GUIDANCE_ASSISTANT_INFO_LIST_PATH.test(path) && GET_GUIDANCE_ASSISTANT_TARGET_PATH.test(path),
    transport: {
      controller: 'LightningExperienceAssistantPlatformController.getAssistantTarget'
    }
  }, generateAdapter('get', GUIDANCE_BASE_URI, GET_GUIDANCE_ASSISTANT_LIST_PATH, 'LightningExperienceAssistantPlatformController.getAssistantList'), generateAdapter('get', GUIDANCE_BASE_URI, GET_GUIDANCE_ASSISTANT_INFO_LIST_PATH, 'LightningExperienceAssistantPlatformController.getAssistantInfoList'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', GUIDANCE_BASE_URI, GET_GUIDANCE_ASSISTANT_LIST_PATH, 'LightningExperienceAssistantPlatformController.saveAssistantList'), generateAdapter('get', GUIDANCE_BASE_URI, GET_GUIDANCE_ASSISTANT_PATH, 'LightningExperienceAssistantPlatformController.getAssistant'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', GUIDANCE_BASE_URI, GET_GUIDANCE_ASSISTANT_PATH, 'LightningExperienceAssistantPlatformController.saveAssistant'), generateAdapter('get', GUIDANCE_BASE_URI, GET_GUIDANCE_QUESTIONNAIRES_PATH, 'LightningExperienceAssistantPlatformController.getQuestionnaires'), generateAdapter('get', GUIDANCE_BASE_URI, GET_GUIDANCE_QUESTIONNAIRE_PATH, 'LightningExperienceAssistantPlatformController.getQuestionnaire'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', GUIDANCE_BASE_URI, GET_GUIDANCE_QUESTIONNAIRE_PATH, 'LightningExperienceAssistantPlatformController.saveQuestionnaire'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', GUIDANCE_BASE_URI, GET_GUIDANCE_STEP_PATH, 'LightningExperienceAssistantPlatformController.evaluateStep'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', GUIDANCE_BASE_URI, GET_GUIDANCE_INITIALIZE_PATH, 'LightningExperienceAssistantPlatformController.initialize')];
  const eci = [generateAdapter('get', ECI_CONVERSATION_BASE_URI, GET_CONVERSATION_SUMMARY_RELATED_LIST_PATH, 'ConversationController.getConversationSummaryRelatedList'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', ECI_CONVERSATION_BASE_URI, GENERATE_CONVERSATION_SUMMARY_PATH, 'ConversationController.generateConversationSummary'), generateAdapter('get', ECI_CONVERSATION_BASE_URI, ECI_GET_TRANSCRIPT_PATH, 'ConversationController.getTranscript'), generateAdapter('get', ECI_CONVERSATION_BASE_URI, ECI_GENERATIVE_INSIGHT_PATH, 'ConversationController.getConversationGenerativeInsight'), generateAdapter('post', ECI_CONVERSATION_BASE_URI, ECI_REALTIME_INSIGHT_MEETING_INITIATE_PATH, 'ConversationController.initiateMeeting', 'conversationRealtimeStartMeetingPayload'), generateAdapter('post', ECI_CONVERSATION_BASE_URI, ECI_REALTIME_INSIGHT_MEETING_TERMINATE_PATH, 'ConversationController.terminateMeeting', 'conversationRealtimeEndMeetingPayload')];
  const analytics = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, EXECUTE_QUERY_PATH, 'WaveController.executeQueryByInputRep'), generateAdapter('get', WAVE_BASE_URI, ANALYTICS_LIMITS_PATH, 'WaveController.getAnalyticsLimits'), generateAdapter('get', WAVE_BASE_URI, DATA_CONNECTORS_PATH, 'WaveController.getDataConnectors'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, DATA_CONNECTORS_PATH, 'WaveController.createDataConnector'), generateAdapter('get', WAVE_BASE_URI, DATA_CONNECTOR_PATH, 'WaveController.getDataConnector'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, DATA_CONNECTOR_PATH, 'WaveController.updateDataConnector'), generateAdapter('delete', WAVE_BASE_URI, DATA_CONNECTOR_PATH, 'WaveController.deleteDataConnector'), generateAdapter('get', WAVE_BASE_URI, DATA_CONNECTOR_SOURCE_FIELDS_PATH, 'WaveController.getDataConnectorSourceFields'), generateAdapter('get', WAVE_BASE_URI, DATA_CONNECTOR_SOURCE_OBJECTS_PATH, 'WaveController.getDataConnectorSourceObjects'), generateAdapter('get', WAVE_BASE_URI, DATA_CONNECTOR_SOURCE_OBJECT_PATH, 'WaveController.getDataConnectorSourceObject'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, DATA_CONNECTOR_SOURCE_OBJECT_PREVIEW_PATH, 'WaveController.getDataConnectorSourceObjectDataPreviewWithFields'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, INGEST_DATA_CONNECTOR_PATH, 'WaveController.ingestDataConnector'), generateAdapter('get', WAVE_BASE_URI, DATA_CONNECTOR_STATUS_PATH, 'WaveController.getDataConnectorStatus'), generateAdapter('get', WAVE_BASE_URI, DATA_CONNECTOR_TYPES_PATH, 'WaveController.getDataConnectorTypes'), generateAdapter('get', WAVE_BASE_URI, DATAFLOWS_PATH, 'WaveController.getDataflows'), generateAdapter('get', WAVE_BASE_URI, DEPENDENCIES_PATH, 'WaveController.getDependencies'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, DATAFLOW_JOBS_PATH, 'WaveController.startDataflow'), generateAdapter('get', WAVE_BASE_URI, DATAFLOW_JOBS_PATH, 'WaveController.getDataflowJobs'), generateAdapter('get', WAVE_BASE_URI, DATAFLOW_JOB_PATH, 'WaveController.getDataflowJob'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, DATAFLOW_JOB_PATH, 'WaveController.updateDataflowJob'), generateAdapter('get', WAVE_BASE_URI, DATAFLOW_JOB_NODES_PATH, 'WaveController.getDataflowJobNodes'), generateAdapter('get', WAVE_BASE_URI, DATAFLOW_JOB_NODE_PATH, 'WaveController.getDataflowJobNode'), generateAdapter('get', WAVE_BASE_URI, RECIPE_PATH, 'WaveController.getRecipe'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, RECIPE_PATH, 'WaveController.updateRecipe'), generateAdapter('get', WAVE_BASE_URI, RECIPES_PATH, 'WaveController.getRecipes'), generateAdapter('get', WAVE_BASE_URI, RECIPE_NOTIFICATION_PATH, 'WaveController.getRecipeNotification'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', WAVE_BASE_URI, RECIPE_NOTIFICATION_PATH, 'WaveController.updateRecipeNotification'), generateAdapter('get', WAVE_BASE_URI, ACTIONS_PATH, 'WaveController.getActions'), generateAdapter('get', WAVE_BASE_URI, SCHEDULE_PATH, 'WaveController.getSchedule'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', WAVE_BASE_URI, SCHEDULE_PATH, 'WaveController.updateSchedule'), generateAdapter('get', WAVE_BASE_URI, DATASET_PATH, 'WaveController.getDataset'), generateAdapter('delete', WAVE_BASE_URI, DATASET_PATH, 'WaveController.deleteDataset'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, DATASET_PATH, 'WaveController.updateDataset'), generateAdapter('get', WAVE_BASE_URI, DATASETS_PATH, 'WaveController.getDatasets'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, DATASETS_PATH, 'WaveController.createDataset'), generateAdapter('get', WAVE_BASE_URI, DATASET_VERSION_PATH, 'WaveController.getDatasetVersion'), generateAdapter('get', WAVE_BASE_URI, DATASET_VERSIONS_PATH, 'WaveController.getDatasetVersions'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, DATASET_VERSION_PATH, 'WaveController.updateDatasetVersion'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, DATASET_VERSIONS_PATH, 'WaveController.createDatasetVersion'), generateAdapter('get', WAVE_BASE_URI, SECURITY_COVERAGE_DATASET_VERSION_PATH, 'WaveController.getSecurityCoverageDatasetVersion'), generateAdapter('get', WAVE_BASE_URI, XMD_PATH, 'WaveController.getXmd'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', WAVE_BASE_URI, XMD_PATH, 'WaveController.updateXmd'), generateAdapter('delete', WAVE_BASE_URI, RECIPE_PATH, 'WaveController.deleteRecipe'), generateAdapter('get', WAVE_BASE_URI, REPLICATED_DATASETS_PATH, 'WaveController.getReplicatedDatasets'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, REPLICATED_DATASETS_PATH, 'WaveController.createReplicatedDataset'), generateAdapter('get', WAVE_BASE_URI, REPLICATED_DATASET_PATH, 'WaveController.getReplicatedDataset'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, REPLICATED_DATASET_PATH, 'WaveController.updateReplicatedDataset'), generateAdapter('delete', WAVE_BASE_URI, REPLICATED_DATASET_PATH, 'WaveController.deleteReplicatedDataset'), generateAdapter('get', WAVE_BASE_URI, REPLICATED_FIELDS_PATH, 'WaveController.getReplicatedFields'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, REPLICATED_FIELDS_PATH, 'WaveController.updateReplicatedFields'), generateAdapter('delete', WAVE_BASE_URI, WAVE_FOLDER_PATH, 'WaveController.deleteWaveFolder'), generateAdapter('get', WAVE_BASE_URI, WAVE_FOLDER_PATH, 'WaveController.getWaveFolder'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', WAVE_BASE_URI, WAVE_FOLDER_PATH, 'WaveController.patchWaveFolder'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', WAVE_BASE_URI, WAVE_FOLDER_PATH, 'WaveController.updateWaveFolder'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, WAVE_FOLDERS_POST_PATH, 'WaveController.createWaveFolder'), generateAdapter('get', WAVE_BASE_URI, WAVE_FOLDERS_PATH, 'WaveController.getWaveFolders'), generateAdapter('get', WAVE_BASE_URI, WAVE_TEMPLATES_PATH, 'WaveController.getWaveTemplates'), generateAdapter('get', WAVE_BASE_URI, WAVE_TEMPLATE_PATH, 'WaveController.getWaveTemplate'), generateAdapter('get', WAVE_BASE_URI, WAVE_TEMPLATE_CONFIG_PATH, 'WaveController.getWaveTemplateConfig'), generateAdapter('get', WAVE_BASE_URI, WAVE_TEMPLATE_RELEASE_NOTES_PATH, 'WaveController.getWaveTemplateReleaseNotes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, WAVE_TEMPLATE_VALIDATE_PATH, 'WaveController.validateWaveTemplate')];
  const connectInternal = [generateAdapter('get', CMS_BASE_URI, GET_CONTENT_TYPE_INTERNAL_PATH, 'ManagedContentTypeController.getContentTypeSchema')];
  const analyticsPrivate = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, EXECUTE_SOQL_QUERY_PATH, 'WaveController.executeSoqlQueryPost'), generateAdapter('post', WAVE_BASE_URI, WAVE_DASHBOARDS_POST_PATH, 'WaveController.createDashboard', 'dashboard'), generateAdapter('get', WAVE_BASE_URI, TEMPLATES_SETUP_PLAN_PATH, 'TemplatesSetupController.getTemplateSetupPlan'),
  // executeTemplateSetupPlan doesn't have a POST body currently
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', WAVE_BASE_URI, TEMPLATES_SETUP_PLAN_PATH, 'TemplatesSetupController.executeTemplateSetupPlan')];
  const tableauEmbedding = [generateAdapter('get', TABLEAU_EMBEDDING_BASE_URI, GET_JWT_TABLEAU_EMBEDDING, 'TableauEmbeddingController.getJWT'), generateAdapter('get', TABLEAU_EMBEDDING_BASE_URI, GET_EAS_TABLEAU_EMBEDDING, 'TableauEmbeddingController.getEAS')];
  const smartDataDiscovery = [generateAdapter('get', SMART_DATA_DISCOVERY_BASE_URI, STORIES_PATH, 'SmartDataDiscoveryController.getStories')];
  const flow = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', INTERACTION_BASE_URI, INTERACTION_RUNTIME_RUN_FLOW_PATH, 'FlowRuntimeConnectController.startFlow'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', INTERACTION_BASE_URI, INTERACTION_RUNTIME_NAVIGATE_FLOW_PATH, 'FlowRuntimeConnectController.navigateFlow'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', INTERACTION_BASE_URI, INTERACTION_RUNTIME_RESUME_FLOW_PATH, 'FlowRuntimeConnectController.resumeFlow')];
  const flowBuilder = [generateAdapter('get', INTERACTION_BASE_URI, INTERACTION_FLOW_BUILDER_RULES_PATH, 'FlowBuilderController.getRules')];
  const billing = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', COMMERCE_BASE_URI, POST_BATCH_PAYMENTS_SCHEDULERS_PATH, 'BillingBatchApplicationController.createPaymentsBatchScheduler'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', COMMERCE_BASE_URI, POST_BATCH_INVOICES_SCHEDULERS_PATH, 'BatchInvoiceApplicationController.createBatchInvoiceScheduler'), generateAdapter('post', COMMERCE_BASE_URI, HARMONIZE_INVOICE_DRAFT_TO_POSTED_PATH, 'HarmonizeBillingController.postDraftInvoices', 'inputRequest'), generateAdapter('post', COMMERCE_BASE_URI, HARMONIZE_BATCH_INVOICE_DRAFT_TO_POSTED_PATH, 'BatchInvoiceApplicationController.triggerInvoiceBatchDraftToPosted', 'invoiceBatchDraftToPostedInput'), generateAdapter('post', COMMERCE_BASE_URI, HARMONIZE_BILLING_SCHEDULE_RECOVERY_PATH, 'BillingController.recoverBillingSchedules', 'inputRequest'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', COMMERCE_BASE_URI, HARMONIZE_BILLING_BATCH_INVOICE_DOC_GENERATION_PATH, 'BatchInvoiceApplicationController.generateBatchInvoiceDocuments'), generateAdapter('post', CONNECT_BASE_URI, HARMONIZE_BILLING_BATCH_CRON_NEXT_EXECUTION_DATES_PATH, 'BillingBatchApplicationController.getNextExecutionDates', 'CronExecutionDatesInput')];
  const marketingIntegration = [generateAdapter('get', SITES_BASE_URI, MARKETING_INTEGRATION_GET_FORM_PATH, 'MarketingIntegrationController.getForm'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', SITES_BASE_URI, MARKETING_INTEGRATION_SUBMIT_FORM_PATH, 'MarketingIntegrationController.submitForm'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', SITES_BASE_URI, MARKETING_INTEGRATION_SAVE_FORM_PATH, 'MarketingIntegrationController.saveForm')];
  const videovisits = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, JOIN_CALL_PATH, 'VideoCallController.chimeMeeting'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, LEAVE_CALL_PATH, 'VideoCallController.leaveChimeMeeting'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, TRANSCRIPTION_CALL_PATH, 'VideoCallController.toggleTranscription'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, VIDEO_CALL_PATH, 'VideoCallController.setupCall'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, VIDEO_PARTICIPANT_PATH, 'VideoCallController.evaluateVideoCallParticipant'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, VIDEO_CALL_PATH, 'VideoCallController.updateVideoCall'), generateAdapter('get', CONNECT_BASE_URI, VIDEO_PARTICIPANT_PATH, 'VideoCallController.getParticipantData')];
  const featurevalidation = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, FEATURE_VALIDATION_PATH, 'FeatureValidationController.featureValidation')];
  const hpiscore = [{
    method: 'get',
    transport: {
      controller: 'HolisticPatientIndexController.getActionsDetails'
    },
    predicate: path => path.startsWith(CONNECT_BASE_URI) && HPI_SCORE_PATH.test(path)
  }, {
    method: 'get',
    transport: {
      controller: 'HolisticPatientIndexController.getMorePatientScores'
    },
    predicate: path => path.startsWith(CONNECT_BASE_URI) && GET_PATIENT_LIST_SCORE.test(path)
  }, {
    method: 'get',
    transport: {
      controller: 'HolisticPatientIndexController.getApexInterfaceStatus'
    },
    predicate: path => path.startsWith(CONNECT_BASE_URI) && GET_PATIENT_SCORE_APEX_PATH.test(path)
  }, {
    method: 'post',
    transport: {
      controller: 'HolisticPatientIndexController.saveHistoryForAction'
    },
    predicate: path => path.startsWith(CONNECT_BASE_URI) && GET_PATIENT_SCORE_APEX_PATH.test(path)
  }];
  const externalDocApi = [generateAdapter('get', EXTERNAL_DOC_BASE_URI, EXTERNAL_DOC_USERS_API_PATH, 'ExternalDocumentController.getExternalDocumentUsers'), generateAdapter('get', EXTERNAL_DOC_BASE_URI, EXTERNAL_DOC_API_PATH, 'ExternalDocumentController.getExternalDocument'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EXTERNAL_DOC_BASE_URI, EXTERNAL_DOC_API_PATH, 'ExternalDocumentController.createExternalDocument'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', EXTERNAL_DOC_BASE_URI, EXTERNAL_DOC_SAVE_API_PATH, 'ExternalDocumentController.saveExternalDocument')];
  const interesttagging = [generateAdapter('get', CONNECT_BASE_URI, GET_TAGS_BY_RECORD_PATH, 'InterestTaggingFamilyController.getTagsByRecordId'), generateAdapter('get', CONNECT_BASE_URI, GET_RECORDS_BY_TAGID_PATH, 'InterestTaggingFamilyController.getInterestTagEntityAssignments'), generateAdapter('get', CONNECT_BASE_URI, GET_TAGS_BY_CATEGORYID_PATH, 'InterestTaggingFamilyController.getTagsByCategoryId'), generateAdapter('get', CONNECT_BASE_URI, GET_CATEGORIES_BY_TAGID_PATH, 'InterestTaggingFamilyController.getTagCategoriesByTagId'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INTEREST_TAG_ENTITY_ASSIGNMENT_PATH, 'InterestTaggingFamilyController.createInterestTagEntityAssignment')];
  const identityVerification = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, IDENTIFY_VERIFICATION_BUILD_CONTEXT_PATH, 'IdentityVerificationController.buildVerificationContext'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, IDENTIFY_VERIFICATION_SEARCH_PATH, 'IdentityVerificationController.searchRecords'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, IDENTIFY_VERIFICATION_VERIFY_RECORD_PATH, 'IdentityVerificationController.identityVerification'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, FORM_BASED_VERIFICATION_VERIFY_RECORD_PATH, 'IdentityVerificationController.createFormVerification')];
  const fileBasedDataimport = [generateAdapter('post', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_START_ADVANCE_IMPORT_PATH, 'CsvDataImportResourceFamilyController.startAdvanceImport', 'importData'), generateAdapter('post', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_START_SIMPLE_IMPORT_PATH, 'CsvDataImportResourceFamilyController.startSimpleImport', 'importData'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_PATH, 'CsvDataImportResourceFamilyController.getFileBasedDataImports'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_TEST_PATH, 'CsvDataImportResourceFamilyController.getFileBasedDataImports'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_CSV_PREVIEW_PATH, 'CsvDataImportResourceFamilyController.getCsvPreviewData'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_PATCH_DELETE_ENTITIES_BY_ID, 'CsvDataImportResourceFamilyController.getFileBasedDataImportById'), generateAdapter('patch', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_PATCH_DELETE_ENTITIES_BY_ID, 'CsvDataImportResourceFamilyController.fileBasedDataImportUpdate', 'fileBasedDataImportReq'), generateAdapter('delete', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_PATCH_DELETE_ENTITIES_BY_ID, 'CsvDataImportResourceFamilyController.fileBasedDataImportDelete'), generateAdapter('post', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_POST_PATH, 'CsvDataImportResourceFamilyController.fileBasedDataImportAdd', 'fileBasedDataImportReq'), generateAdapter('post', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_TEST_PATH, 'CsvDataImportResourceFamilyController.fileBasedDataImportAdd', 'fileBasedDataImportReq'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_FIELDS, 'CsvDataImportResourceFamilyController.getAllFields'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_AUTO_MAPPING, 'CsvDataImportResourceFamilyController.getCsvAutoMap'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_DPE_DEFINITIONS, 'CsvDataImportResourceFamilyController.getDPEDefinitions'), generateAdapter('get', FILEBASED_DATAIMPORT_BASE_URI, FILEBASED_DATAIMPORT_GET_ENTITIES, 'CsvDataImportResourceFamilyController.getAllSobjects')];
  const auditTrailExport = [generateAdapter('get', SERVICE_EXCELLENCE_BASE_URI, AUDIT_TRAIL_EXPORT_DOWNLOAD_PATH, 'AuditTrailFileExportConnectController.getAuditTrailFileExport'), generateAdapter('delete', SERVICE_EXCELLENCE_BASE_URI, AUDIT_TRAIL_EXPORT_DELETE_PATH, 'AuditTrailFileExportConnectController.deleteAuditTrailFileExport'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', SERVICE_EXCELLENCE_BASE_URI, AUDIT_TRAIL_EXPORT_GET_PATH, 'AuditTrailFileExportConnectController.createAuditTrailFileExport'), generateAdapter('get', SERVICE_EXCELLENCE_BASE_URI, AUDIT_TRAIL_EXPORT_GET_PATH, 'AuditTrailFileExportConnectController.getAuditTrailFileExports')];
  const salesExcellence = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, SALES_EXCELLENCE_ACTIONABLE_LIST_MEMBER_SEARCH_BY_ID, 'IndustriesActionableListMemberController.searchActionListMembersByListId'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, SALES_EXCELLENCE_ACTIONABLE_LIST_MEMBER_SEARCH, 'IndustriesActionableListMemberController.searchActionListMembers'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, SALES_EXCELLENCE_ASSIGN_ACTIONABLE_LIST, 'IndustriesActionableListMemberController.assignActionableList'), generateAdapter('get', CONNECT_BASE_URI, SALES_EXCELLENCE_ASSIGNED_ACTIONABLE_LISTS, 'IndustriesActionableListMemberController.getAssignedActionableLists'), generateAdapter('get', CONNECT_BASE_URI, SALES_EXCELLENCE_GET_ACTIONABLE_LIST_METADATA, 'IndustriesActionableListMemberController.getActionableListMetadata'), generateAdapter('get', CONNECT_BASE_URI, SALES_EXCELLENCE_GET_ALM_QUEUES, 'IndustriesActionableListMemberController.getALMQueues'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, SALES_EXCELLENCE_GET_ACTIONABLE_LIST_KPI_MAPPING, 'IndustriesActionableListMemberController.generateActionableListKpiMappingResults'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, SALES_EXCELLENCE_GET_ACTIONABLE_LIST_KPI_BAR, 'IndustriesActionableListMemberController.generateActionableListKpiBarResults')];
  const omnianalytics = [generateAdapter('get', CONNECT_BASE_URI, OMNI_ANALYTICS_FETCH_OMNIANALYTICS_LOGS, 'OmniAnalyticsController.fetchOmniAnalyticsLogs'), generateAdapter('post', CONNECT_BASE_URI, OMNI_ANALYTICS_STORE_OMNIANALYTICS_LOGS, 'OmniAnalyticsController.storeOmniAnalyticsLogs', 'omniAnalyticsLogDefinition'), generateAdapter('get', CONNECT_BASE_URI, OMNI_ANALYTICS_FETCH_OMNIANALYTICS_METADATA, 'OmniAnalyticsController.fetchOmniAnalyticsMetadata')];
  const cdpSalesExcellence = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CDP_SALES_EXCELLENCE_SEGMENT_PREVIEW, 'CdpSalesExcellenceController.createObjectsDataFromSelectedSegment'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CDP_SALES_EXCELLENCE_CREATE_ACTIONABLE_LIST_RECORDS, 'CdpSalesExcellenceController.createActionableListRecords'), generateAdapter('get', CONNECT_BASE_URI, CDP_SALES_EXCELLENCE_GET_SEGMENT_DETAILS, 'CdpSalesExcellenceController.getSegmentsDetails')];
  const industriesFieldset = [generateAdapter('get', CONNECT_BASE_URI, GET_FIELD_SETS_PATH, 'FieldSetController.getFieldSets')];
  const timeline = [generateAdapter('get', CONNECT_BASE_URI, TIMELINE_PATH, 'TimelineController.getTimelineData'), generateAdapter('get', CONNECT_BASE_URI, TIMELINE_METADATA_PATH, 'TimelineController.getTimelineMetadata'), generateAdapter('get', CONNECT_BASE_URI, ENGAGEMENT_EVENT_TIMELINE_PATH, 'TimelineController.getEngagementEvents'), generateAdapter('get', CONNECT_BASE_URI, TIMELINE_ENGAGEMENT_EVENT_METADATA_PATH, 'TimelineController.getDataModelObjects'), generateAdapter('get', CONNECT_BASE_URI, TIMELINE_DATA_GRAPH_METADATA_PATH, 'TimelineController.getDataGraphMetadata')];
  const criteriabasedsearchfilter = [generateAdapter('get', CONNECT_BASE_URI, CRITERIABASEDSEARCHFILTER_CONFIGURATIONS_PATH, 'CriteriaBasedSearchController.getSearchCriteriaConfigurations'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CRITERIABASEDSEARCHFILTER_SEARCH_OBJECT_PATH, 'CriteriaBasedSearchController.searchObject')];
  const assetCreation = [generateAdapter('get', ASSETCREATION_BASE_URI, GET_STARTER_TEMPLATES_PATH, 'AssetCreationController.getStarterTemplates'), generateAdapter('get', ASSETCREATION_BASE_URI, GET_STARTER_TEMPLATE_BYID_PATH, 'AssetCreationController.getStarterTemplateById'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', ASSETCREATION_BASE_URI, POST_ASSET_OBJECT_PATH, 'AssetCreationController.createAsset')];
  const advancedTherapyManagement = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, GET_SLOTS_PATH, 'AdvancedTherapyManagementController.getSlots'), generateAdapter('post', HEALTH_CLOUD_BASE_URI, GET_SLOT_CHAINS_PATH, 'AdvancedTherapyManagementController.getSlotChains', 'getSlotChainsInput'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, BOOK_SLOTS_PATH, 'AdvancedTherapyManagementController.bookSlotChain'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, CANCEL_SLOT_CHAIN_PATH, 'AdvancedTherapyManagementController.cancelSlotChain'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, FETCH_SERVICE_TERRITORY_PATH, 'AdvancedTherapyManagementController.getWorkTypeServiceTerritories'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, RESCHEDULE_SLOT_CHAIN_PATH, 'AdvancedTherapyManagementController.rescheduleSlotChain'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, FETCH_ENTITY_DETAILS_PATH, 'AdvancedTherapyManagementController.getEntityDetailsInfo'), generateAdapter('post', HEALTH_CLOUD_BASE_URI, WORKTYPE_LEADTIME_PATH, 'AdvancedTherapyManagementController.workTypeLeadTime', 'WorkTypeLeadTimeInput'), generateAdapter('post', HEALTH_CLOUD_BASE_URI, VALIDATE_SLOT_CHAIN_PATH, 'AdvancedTherapyManagementController.validateSlotChain', 'SlotChainInput'), generateAdapter('post', HEALTH_CLOUD_BASE_URI, ADHOC_TASKS_ATM_PATH, 'AdvancedTherapyManagementController.adhocTasksAtm', 'AdhocTasksAtmInput'), generateAdapter('post', HEALTH_CLOUD_BASE_URI, QUOTAS_AND_ALLOCATION_PATH, 'AdvancedTherapyManagementController.quotasAndAllocation', 'QuotasAndAllocationInput'), generateAdapter('post', HEALTH_CLOUD_BASE_URI, DIGITAL_VERIFICATION_PATH, 'AdvancedTherapyManagementController.digitalVerification', 'digitalVerificationInputRequest'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, GENERIC_CONNECT_API_PATH, 'GenericConnectApiController.genericConnectApiPOST'), generateAdapter('get', HEALTH_CLOUD_BASE_URI, GENERIC_CONNECT_API_PATH, 'GenericConnectApiController.genericConnectApiGET'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', HEALTH_CLOUD_BASE_URI, MOVE_TO_NEXT_STEP_PATH, 'AdvancedTherapyManagementController.moveToNextStep')];
  const enablementProgram = [generateAdapter('get', SALES_ENABLEMENT_BASE_URI, GET_SALES_ENABLEMENT_PROGRAM_TEMPLATE_PATH, 'EnablementProgramController.getEnablementProgramTemplate'), generateAdapter('get', SALES_ENABLEMENT_BASE_URI, GET_SALES_ENABLEMENT_PROGRAM_TEMPLATES_PATH, 'EnablementProgramController.getEnablementProgramTemplateList')];
  const enablementMeasure = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', SALES_ENABLEMENT_BASE_URI, TRIGGER_ON_DEMAND_COMPUTATION_PATH, 'EnablementMeasureConnectController.triggerOnDemandComputation'), generateAdapter('get', SALES_ENABLEMENT_BASE_URI, GET_CONTRIBUTING_RECORDS_INFO_PATH, 'EnablementMeasureConnectController.getContributingRecordsInfoForMilestone')];
  const salesUserWorkingHours = [generateAdapter('delete', BASE_URI, DELETE_SALES_USER_WORKING_HOURS_PATH, 'ISalesUserWorkingHoursFamilyController.deleteSalesUserWorkingHours'), generateAdapter('get', BASE_URI, GET_SALES_USER_WORKING_HOURS_PATH, 'ISalesUserWorkingHoursFamilyController.getSalesUserWorkingHours'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', BASE_URI, PATCH_SALES_USER_WORKING_HOURS_PATH, 'ISalesUserWorkingHoursFamilyController.updateSalesUserWorkingHours'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', BASE_URI, POST_SALES_USER_WORKING_HOURS_PATH, 'ISalesUserWorkingHoursFamilyController.postSalesUserWorkingHours')];
  const salesEngagementWorkspace = [generateAdapter('get', BASE_URI, GET_ENGAGEMENT_WORKSPACE_OBJECTS_PATH, 'IEngagementWorkspaceFamilyController.getEngagementWorkspaceObjects'), generateAdapter('get', BASE_URI, ENGAGEMENT_WORKSPACE_PERSONALIZATION_PATH, 'IEngagementWorkspaceFamilyController.getWorkspaceUserPersonalization'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', BASE_URI, ENGAGEMENT_WORKSPACE_PERSONALIZATION_PATH, 'IEngagementWorkspaceFamilyController.updateWorkspaceUserPersonalization'), generateAdapter('delete', BASE_URI, ENGAGEMENT_WORKSPACE_PERSONALIZATION_PATH, 'IEngagementWorkspaceFamilyController.deleteWorkspaceUserPersonalization')];
  const namedCredential = [generateAdapter('delete', NAMED_CREDENTIAL_BASE_URI, CREDENTIAL_PATH, 'NamedCredentialsController.deleteCredential'), generateAdapter('get', NAMED_CREDENTIAL_BASE_URI, CREDENTIAL_PATH, 'NamedCredentialsController.getCredential'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', NAMED_CREDENTIAL_BASE_URI, CREDENTIAL_PATH, 'NamedCredentialsController.updateCredential'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', NAMED_CREDENTIAL_BASE_URI, CREDENTIAL_PATH, 'NamedCredentialsController.createCredential'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', NAMED_CREDENTIAL_BASE_URI, OAUTH_CREDENTIAL_AUTH_URL_PATH, 'NamedCredentialsController.getOAuthCredentialAuthUrl'), generateAdapter('get', NAMED_CREDENTIAL_BASE_URI, EXTERNAL_CREDENTIAL_PATH, 'NamedCredentialsController.getExternalCredentials')];
  const externalConnectivity = [generateAdapter('get', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTION_LIST_PATH, 'ExternalConnectivityController.getConnections'), generateAdapter('post', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTION_LIST_PATH, 'ExternalConnectivityController.createConnection', 'requestBody'), generateAdapter('get', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTION_DETAIL_PATH, 'ExternalConnectivityController.getConnectionDetails'), generateAdapter('put', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTION_DETAIL_PATH, 'ExternalConnectivityController.updateConnection', 'requestBody'), generateAdapter('post', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTION_DELETE_PATH, 'ExternalConnectivityController.deleteConnection', 'requestBody'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTION_TEST_PATH, 'ExternalConnectivityController.testConnection'), generateAdapter('get', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTOR_LIST_PATH, 'ExternalConnectivityController.getConnectors'), generateAdapter('get', EXTERNAL_CONNECTIVITY_BASE_URI, EXTERNAL_CONNECTIVITY_CONNECTOR_DETAIL_PATH, 'ExternalConnectivityController.getConnectorDetails')];
  const externalServices = [generateAdapter('get', EXTERNAL_SERVICES_BASE_URI, EXTERNAL_SERVICES_ACTION_DETAILS_PATH, 'ExternalServicesController.getActionDetailsForService'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EXTERNAL_SERVICES_BASE_URI, EXTERNAL_SERVICES_DATA_SHAPE_PATH, 'ExternalServicesController.getDataShape'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EXTERNAL_SERVICES_BASE_URI, EXTERNAL_SERVICES_OPENAPI_SPEC_PATH, 'ExternalServicesController.getOpenApiSpec'), generateAdapter('get', EXTERNAL_SERVICES_BASE_URI, EXTERNAL_SERVICES_STATISTICS_PATH, 'ExternalServicesController.getStatistics'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EXTERNAL_SERVICES_BASE_URI, EXTERNAL_SERVICES_SEND_REQUEST_PATH, 'ExternalServicesController.sendTestConnectionRequest'), generateAdapter('get', EXTERNAL_SERVICES_BASE_URI, EXTERNAL_SERVICES_STATISTICS_FOR_SERVICE_PATH, 'ExternalServicesController.getStatisticsForService'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EXTERNAL_SERVICES_BASE_URI, EXTERNAL_SERVICES_VALIDATE_SCHEMA_PATH, 'ExternalServicesController.validateSchema')];
  const communityInfo = [generateAdapter('get', CONNECT_BASE_URI, GET_COMMUNITY_INFO_PATH, 'CommunitiesController.getCommunity')];
  const eSignature = [generateAdapter('get', E_SIGN_BASE_URI, GET_SIGNER_ROLES, 'DocgenController.getSignerRoles'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', E_SIGN_BASE_URI, SEND_DOCUMENT_ENVELOPE_FOR_ESIGN, 'DocgenController.sendEnvelopeForEsign'), generateAdapter('get', E_SIGN_BASE_URI, GET_NOTIFICATION_SETTING, 'DocgenController.getESignNotificationSettings'), generateAdapter('get', E_SIGN_BASE_URI, GET_RECIPIENT, 'DocgenController.getRecipients'), generateAdapter('get', E_SIGN_BASE_URI, GET_DOCUMENTS, 'DocgenController.getDocuments'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', E_SIGN_BASE_URI, UPDATE_DOCUMENT_ENVELOPE_FOR_ESIGN, 'DocgenController.voidEnvelope'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', E_SIGN_BASE_URI, UPDATE_ENVELOPE_STATUS, 'DocgenController.updateEnvelopeStatus')];
  const clauseLibrary = [generateAdapter('get', CLAUSE_LIBRARY_BASE_URI, GET_CLAUSE_CATEGORY_CONFIGS, 'ClauseLibraryController.getClauseCategoryConfigurations'), generateAdapter('get', CLAUSE_LIBRARY_BASE_URI, GET_DOCUMENT_CLAUSE_SETS, 'ClauseLibraryController.getDocumentClauseSets'), generateAdapter('get', CLAUSE_LIBRARY_BASE_URI, GET_DOCUMENT_CLAUSE_FIELDS, 'ClauseLibraryController.getDocumentClauseFields'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CLAUSE_LIBRARY_BASE_URI, POST_PROMOTE_DOCUMENT_CLAUSE_PATH, 'ClauseLibraryController.promoteDocumentClause', 'promotionRequest')];
  const contentLink = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONTENT_LINK_BASE_URI, POST_CONTENT_LINK_LOAD_PATH, 'DocgenController.getContentLink', 'getContentLinkInput')];
  const eriDigest = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', ERI_BASE_URI, GET_ERI_DIGEST_PATH, 'ERIDigestController.getERIDigest')];
  const peopleApi = [generateAdapter('get', PEOPLE_API_BASE_URI, GET_PEOPLE_API_PATH, 'PeopleAPIConnectController.getParsedSignatureData')];
  const learning = [generateAdapter('post', LEARNING_ITEM_BASE_URI, POST_EVALUATE_LEARNING_ITEM_PATH, 'LearningContentPlatformController.evaluateLearningItem', 'evaluateLearningItemInputRepresentation')];
  const enablement = [generateAdapter('get', ENABLEMENT_BASE_URI, ENABLEMENT_PROGRAM_SUMMARY_PATH, 'EnablementProgramController.enablementProgramSummary'), generateAdapter('get', ENABLEMENT_BASE_URI, ENABLEMENT_PROGRAM_SUMMARY_COLLECTION_PATH, 'EnablementProgramController.getProgramSummaryCollection'), generateAdapter('get', CONNECT_BASE_URI, ENABLEMENT_PROGRAM_SUMMARY_COLLECTION_PATH_FOR_COMMUNITY_PATH, 'EnablementProgramController.getProgramSummaryCollectionForCommunity'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', ENABLEMENT_BASE_URI, SELF_ENROLL_IN_ENABLEMENT_PROGRAM_PATH, 'EnablementProgramController.enroll'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', ENABLEMENT_BASE_URI, UNENROLL_FROM_ENABLEMENT_PROGRAM_PATH, 'EnablementProgramController.unenroll')];
  const salesEinsteinCoach = [generateAdapter('get', SALES_EINSTEIN_COACH_BASE_URI, SALES_EINSTEIN_COACH_CONFIGURATION_PATH, 'SalesEinsteinCoachController.getSalesEinsteinCoachConfiguration'), generateAdapter('post', SALES_EINSTEIN_COACH_BASE_URI, SALES_EINSTEIN_COACH_FEEDBACK_PATH, 'SalesEinsteinCoachController.submitForFeedback', 'SalesEinsteinCoachFeedbackInputRepresentation'), generateAdapter('post', SALES_EINSTEIN_COACH_BASE_URI, SALES_EINSTEIN_COACH_ROLE_PLAY_PATH, 'SalesEinsteinCoachController.submitForRolePlay', 'SalesEinsteinCoachRolePlayInputRepresentation'), generateAdapter('delete', SALES_EINSTEIN_COACH_BASE_URI, SALES_EINSTEIN_COACH_ROLE_PLAY_PATH, 'SalesEinsteinCoachController.deleteRolePlaySession'), generateAdapter('post', SALES_EINSTEIN_COACH_BASE_URI, SALES_EINSTEIN_COACH_ROLE_PLAY_SESSION_PATH, 'SalesEinsteinCoachController.startRolePlaySession', 'SalesEinsteinCoachRolePlaySessionInputRepresentation')];
  const globalization = [generateAdapter('get', I18N_BASE_URI, I18N_GET_TIMEZONES_PATH, 'TimeZoneAPIController.getTimezonesByLocale')];
  const assessment = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, ASSESSMENT_ENVELOPES_PATH, 'AssessmentController.postAssessmentEnvelope'), generateAdapter('get', CONNECT_BASE_URI, ASSESSMENT_ENVELOPES_PATH, 'AssessmentController.getAssessmentEnvelope'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, ASSESSMENT_CONTEXT_SEARCH_PATH, 'AssessmentSearchController.postAssessmentContextSearch')];
  const dataloading = [generateAdapter('get', CONNECT_BASE_URI, DATALOADING_CSV_DATA_TEMPLATE_PATH, 'DataLoadingController.getCsvDataTemplate'), generateAdapter('get', CONNECT_BASE_URI, DATALOADING_FEATURE_OBJECTS_PATH, 'DataLoadingController.getObjectsForFeature')];
  const scheduler = [generateAdapter('get', SCHEDULER_BASE_URI, GET_ENGAGEMENT_CHANNEL_TYPES, 'LightningSchedulerController.getEngagementChannelTypes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', SCHEDULER_BASE_URI, CREATE_SERVICE_APPOINTMENTS, 'LightningSchedulerController.createServiceAppointment'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', SCHEDULER_BASE_URI, CREATE_SERVICE_APPOINTMENTS, 'LightningSchedulerController.updateServiceAppointment'), generateAdapter('get', SCHEDULER_BASE_URI, GET_NEXT_WAITLIST_PARTICIPANT, 'LightningSchedulerController.getNextWaitlistParticipant'), generateAdapter('post', SCHEDULER_BASE_URI, GROUP_APPOINTMENTS, 'LightningSchedulerController.getGroupAppointments', 'getGroupAppointmentsInput'), generateAdapter('get', SCHEDULER_BASE_URI, PARTICIPANT_RECENT_INTERACTION, 'LightningSchedulerController.participantRecentInteractions'), generateAdapter('get', SCHEDULER_BASE_URI, WAITLISTS, 'LightningSchedulerController.waitlists'), generateAdapter('get', SCHEDULER_BASE_URI, WAITLIST_RELATIONSHIPS, 'LightningSchedulerController.waitlistRelationships'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', SCHEDULER_BASE_URI, WAITLIST_APPOINTMENTS, 'LightningSchedulerController.waitlistAppointment'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', SCHEDULER_BASE_URI, WAITLIST_CHECKIN, 'LightningSchedulerController.waitlistCheckIn'), generateAdapter('post', SCHEDULER_BASE_URI, SERVICE_APPOINTMENT_ATTENDEE, 'LightningSchedulerController.createServiceAppointmentAttendee', 'createServiceAppointmentAttendeeInput'), generateAdapter('patch', SCHEDULER_BASE_URI, SERVICE_APPOINTMENT_ATTENDEE, 'LightningSchedulerController.updateServiceAppointmentAttendee', 'updateServiceAppointmentAttendeeInput'), generateAdapter('get', SCHEDULER_BASE_URI, GET_SERVICE_TERRITORY_CAPACITY, 'LightningSchedulerController.getServiceTerritoryCapacity'), generateAdapter('get', SCHEDULER_BASE_URI, GET_SERVICE_RESOURCE_CAPACITY, 'LightningSchedulerController.getServiceResourceCapacity'), generateAdapter('get', SCHEDULER_BASE_URI, GET_APPOINTMENT_FROM_TOKEN, 'LightningSchedulerController.getAppointmentFromToken'), generateAdapter('get', SCHEDULER_BASE_URI, GET_DECRYPTION, 'LightningSchedulerController.decryption'), generateAdapter('get', SCHEDULER_BASE_URI, GET_ENCRYPTION, 'LightningSchedulerController.encrypt'), generateAdapter('get', SCHEDULER_BASE_URI, GET_WAITLIST_PARTICIPANT_STATS, 'LightningSchedulerController.getWaitlistParticipantStats'), generateAdapter('patch', SCHEDULER_BASE_URI, UPDATE_WAITLIST_PARTICIPANT, 'LightningSchedulerController.updateWaitlistParticipant', 'updateWaitlistParticipantInput')];
  const materialityAssessment = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', MATERIALITY_ASSESSMENT_BASE_URI, POST_MATERIALITY_ASSESSMENT_CALCULATE, 'MaterialityAssessmentController.postPerformCalculation')];
  const starter = [generateAdapter('post', CONNECT_BASE_URI, POST_SOLUTION_LIBRARY_RECIPES, 'SolutionLibraryController.postSolutionLibraryRecipes', 'SolutionLibrarySearchData')];
  const education = [generateAdapter('get', EDUCATION_BASE_URI, GET_SUCCESS_TEAM, 'AppointmentBookingController.getSuccessTeam'), generateAdapter('get', EDUCATION_BASE_URI, GET_AVAILABLE_TOPICS, 'AppointmentBookingController.getAvailableTopics'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EDUCATION_BASE_URI, GET_AVAILABLE_TIME_SLOTS, 'AppointmentBookingController.postAvailableTimeSlots'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EDUCATION_BASE_URI, CREATE_CARE_PLANS, 'CarePlanBulkController.createCarePlans'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EDUCATION_BASE_URI, EDU_PUBLISH_LEARNING_PROGRAM_PLAN, 'CampusSetupController.postPublishLearningProgramPlan'), generateAdapter('get', EDUCATION_BASE_URI, EDU_GET_LEARNING, 'CampusSetupController.getLearning'), generateAdapter('get', EDUCATION_BASE_URI, EDU_GET_LEARNER_PROGRESS, 'CampusSetupController.getLearnerProgress'), generateAdapter('get', EDUCATION_BASE_URI, EDU_GET_LEARNING_PROGRAM_PLAN, 'CampusSetupController.getLearningProgramPlan'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EDUCATION_BASE_URI, EDU_PUBLISH_LEARNING_FOUNDATION_LIST, 'CampusSetupController.postValidateLearningFoundationList', 'learningValidationRequestList'), generateAdapter('post', EDUCATION_BASE_URI, EDU_LEARNINGS, 'CampusSetupController.createLearnings', 'createLearningRecords'), generateAdapter('patch', EDUCATION_BASE_URI, EDU_LEARNINGS, 'CampusSetupController.updateLearnings', 'updateLearningRecords'), generateAdapter('get', EDUCATION_BASE_URI, GET_PERSON_PUBLIC_PROFILE, 'PersonPublicProfileInfoController.getPersonPublicProfile'), generateAdapter('post', EDUCATION_BASE_URI, POST_BENEFIT_ASSIGNMENT, 'MentoringController.postBenefitAssignment', 'mentoringBenefitAssignmentInput'), generateAdapter('post', EDUCATION_BASE_URI, POST_MATCHING_SELECTOR, 'MentoringController.retrievePotentialMentors', 'mentoringMatchingSelectorInput'), generateAdapter('get', EDUCATION_BASE_URI, EDU_GET_APT_TASK, 'StudentActionCentreController.getAptsTasksPlans'), generateAdapter('patch', EDUCATION_BASE_URI, EDU_PATCH_TASK, 'StudentActionCentreController.updateTaskStatus', 'task'), generateAdapter('post', EDUCATION_BASE_URI, EDU_CREATE_TASK, 'StudentActionCentreController.createTask', 'task'), generateAdapter('get', EDUCATION_BASE_URI, EDU_GET_TASK_FIELDS, 'StudentActionCentreController.getPicklistValues'), generateAdapter('get', EDUCATION_BASE_URI, GET_EDU_NEW_APPLICATION_PRELIM_DATA, 'ProgramTermApplicationTimelinePickerController.getNewApplicationPreliminaryData'), generateAdapter('get', EDUCATION_BASE_URI, GET_EDU_NEW_APPLICATION_ACADEMIC_TERMS, 'ProgramTermApplicationTimelinePickerController.getAcademicTerms'), generateAdapter('get', EDUCATION_BASE_URI, GET_EDU_NEW_APPLICATION_PROGRAMS, 'ProgramTermApplicationTimelinePickerController.getProgramTermApplicationTimelines'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EDUCATION_BASE_URI, CREATE_EDU_NEW_APPLICATION_PRELIM_REFERENCES, 'ProgramTermApplicationTimelinePickerController.postPreliminaryApplicationReferences'), generateAdapter('get', EDUCATION_BASE_URI, GET_EDU_APPLICATION, 'ApplicationsController.getApplicationDetails'), generateAdapter('get', EDUCATION_BASE_URI, GET_EDU_APPLICATIONS, 'ApplicationsController.getApplications'), generateAdapter('get', EDUCATION_BASE_URI, GET_EDU_APPLICATION_TASK, 'ApplicationsController.getIndividualApplicationTask')];
  const industriesContext = [generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_CONTEXT_TRANSLATION_PATH, 'ContextResourceFamilyController.getContextTranslation'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_CONTEXT_RUNTIME_PATH, 'ContextResourceFamilyController.getContext'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_CONTEXT_INFO_RUNTIME_PATH, 'ContextResourceFamilyController.getContext'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_CONTEXT_SERVICE_ACCESS_PATH, 'ContextAccessResourceFamilyController.getContextServiceAccess'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_QUERY_PATH, 'ContextResourceFamilyController.queryContextRecordAndChildren'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_QUERY_RECORDS_PATH, 'ContextResourceFamilyController.queryRecords'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_CONTEXT_SERVICE_DEFINITION_INFO_PATH, 'ContextResourceFamilyController.getContextDefinitionInfo'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_DEFINITION_PATH, 'ContextResourceFamilyController.deleteContextDefinition'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_DEFINITION_PATH, 'ContextResourceFamilyController.getContextDefinition'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_TYPEAHEAD_API_PATH, 'ContextResourceFamilyController.getDynamicAttributes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_UPGRADE_DEFINITION_PATH, 'ContextResourceFamilyController.upgradeContextServiceDefinition'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_DEFINITION_PATH, 'ContextResourceFamilyController.updateContextDefinition'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_ATTRIBUTE_PATH, 'ContextResourceFamilyController.deleteContextServiceAttribute'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_ATTRIBUTE_PATH, 'ContextResourceFamilyController.getContextServiceAttribute'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_NODE_PATH, 'ContextResourceFamilyController.deleteContextServiceNode'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_NODE_PATH, 'ContextResourceFamilyController.getContextServiceNode'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_NODE_LIST_PATH, 'ContextResourceFamilyController.updateContextNodes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_NODE_LIST_PATH, 'ContextResourceFamilyController.createContextNodes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTE_LIST_PATH, 'ContextResourceFamilyController.updateContextServiceAttributes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTE_LIST_PATH, 'ContextResourceFamilyController.createContextAttributes'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTELIST_MAPPING_PATH, 'ContextResourceFamilyController.createContextAttributeMappings'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_MAPPINGS_PATH, 'ContextResourceFamilyController.createContextMappings'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_MAPPINGS_PATH, 'ContextResourceFamilyController.deleteContextServiceMapping'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_MAPPINGS_PATH, 'ContextResourceFamilyController.getContextServiceMapping'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTELIST_MAPPING_PATH, 'ContextResourceFamilyController.updateContextAttributeMappings'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_MAPPINGS_PATH, 'ContextResourceFamilyController.updateContextMappings'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_TAGS_PATH, 'ContextResourceFamilyController.createContextTags'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_TAGS_PATH, 'ContextResourceFamilyController.deleteContextServiceTag'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_TAGS_PATH, 'ContextResourceFamilyController.getContextServiceTag'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_TAGS_PATH, 'ContextResourceFamilyController.updateContextTags'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_CONTEXT_TAGS_PATH, 'ContextResourceFamilyController.getContextTags'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_ATTRIBUTENODE_MAPPING_PATH, 'ContextResourceFamilyController.createContextAttributeMapping'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTENODE_MAPPING_PATH, 'ContextResourceFamilyController.deleteContextAttributeMapping'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTENODE_MAPPING_PATH, 'ContextResourceFamilyController.getContextAttributeMapping'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTENODE_MAPPING_PATH, 'ContextResourceFamilyController.updateContextAttributeMapping'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTE_MAPPING_PATH, 'ContextResourceFamilyController.deleteContextServiceAttributeMapping'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_ATTRIBUTE_MAPPING_PATH, 'ContextResourceFamilyController.getContextServiceAttributeMapping'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_NODE_MAPPING_PATH, 'ContextResourceFamilyController.createContextNodeMapping'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_NODE_MAPPING_PATH, 'ContextResourceFamilyController.deleteContextNodeMapping'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_NODE_MAPPING_PATH, 'ContextResourceFamilyController.getContextNodeMapping'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_NODE_MAPPING_PATH, 'ContextResourceFamilyController.updateContextNodeMapping'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_NODE_MAPPINGS_PATH, 'ContextResourceFamilyController.createContextNodeMappings'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_NODE_MAPPINGS_PATH, 'ContextResourceFamilyController.updateContextNodeMappings'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_NODE_MAPPING_PATH, 'ContextResourceFamilyController.deleteContextServiceNodeMapping'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_CONTEXT_SERVICE_NODE_MAPPING_PATH, 'ContextResourceFamilyController.getContextServiceNodeMapping'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, PUT_INDUSTRIES_CONTEXT_SERVICE_ACCESS_PATH, 'ContextAccessResourceFamilyController.putContextServiceAccess'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_CONTEXT_SERVICE_DEFINITION_PATH, 'ContextResourceFamilyController.createContextServiceDefinition'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_CONTEXT_DEFINITIONS_PATH, 'ContextResourceFamilyController.getContextDefinitions')];
  const industriesPricing = [generateAdapter('post', CONNECT_BASE_URI, GET_INDUSTRIES_PRICING_PATH, 'PricingResourceFamilyController.newPricingRequest', 'PricingRequest'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_PRICING_PRICING_WITH_ID_ACTION_PATH, 'PricingResourceFamilyController.deletePricingAction'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_PRICING_WITH_ID_ACTION_PATH, 'PricingResourceFamilyController.getPricingActions'), generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_PRICING_PRICING_WITH_ID_ACTION_PATH, 'PricingResourceFamilyController.updatePricingAction', 'pricingActionInput'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_PRICING_ACTION_PATH, 'PricingResourceFamilyController.createPricingAction', 'pricingActionInput'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_PRICING_ACTION_PATH, 'PricingResourceFamilyController.getAllPricingActions'), generateAdapter('post', CONNECT_BASE_URI, GET_INDUSTRIES_PRICING_HEADLESS_PATH, 'PricingResourceFamilyController.getPrice', 'pricingInputRequest'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONSOLE_WDIGET_PATH, 'PricingResourceFamilyController.getPricingOpsConsoleData'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_PATH_IS_TEMPLATE, 'ProcedurePlanDefinitionResourceFamilyController.getAllProcedurePlanDefinition'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_PATH, 'ProcedurePlanDefinitionResourceFamilyController.createProcedurePlanDefinition', 'procedurePlanDefinition'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_WITH_ID_PATH, 'ProcedurePlanDefinitionResourceFamilyController.getProcedurePlanDefinition', 'procedurePlanDefinition'), generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_WITH_ID_PATH, 'ProcedurePlanDefinitionResourceFamilyController.updateProcedurePlanDefinition', 'procedurePlanDefinition'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_WITH_ID_PATH, 'ProcedurePlanDefinitionResourceFamilyController.deleteProcedurePlanDefinition'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_VERSION_DETAILS, 'ProcedurePlanDefinitionResourceFamilyController.deleteProcedurePlanVersionDetails'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_VERSION_DETAILS, 'ProcedurePlanDefinitionResourceFamilyController.getProcedurePlanVersionDetails'), generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_VERSION_DETAILS, 'ProcedurePlanDefinitionResourceFamilyController.updateProcedurePlanVersionDetails', 'procedurePlanVersion'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_VERSION_CREATION, 'ProcedurePlanDefinitionResourceFamilyController.createProcedurePlanVersionDetails', 'procedurePlanVersion'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_EVALUATION, 'ProcedurePlanDefinitionResourceFamilyController.procedurePlanEvaluation', 'procedurePlanEvaluationInput'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_PROCEDURE_PLAN_DEFINITION_EVALUATION_BY_NAME, 'ProcedurePlanDefinitionResourceFamilyController.evaluateProcedurePlanDefinitionByName', 'procedurePlanEvaluationInput'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES_EVALUATE_PATH, 'IPricingContextRulesResourceFamilyController.fetchRunTimeContextRule', 'contextRulesRuntimeInput'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES_VALIDATE_PATH, 'IPricingContextRulesResourceFamilyController.validateRule', 'contextRulesInput'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES_ATTRIBUTES_PATH, 'IPricingContextRulesResourceFamilyController.getContextRulesAttributes'), generateAdapter('post', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES, 'IPricingContextRulesResourceFamilyController.createRule', 'contextRulesInput'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES_GET_PATCH_DELETE, 'IPricingContextRulesResourceFamilyController.fetchRule'), generateAdapter('delete', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES_GET_PATCH_DELETE, 'IPricingContextRulesResourceFamilyController.deleteRule'), generateAdapter('patch', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES_GET_PATCH_DELETE, 'IPricingContextRulesResourceFamilyController.updateRule', 'contextRulesInput'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_CONTEXT_RULES_FETCH_ALL_RULE_BY_SUB_USAGETYPE_ID, 'IPricingContextRulesResourceFamilyController.fetchAllRules'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_PRICING_RECIPES_MAPPING_PATH, 'PricingResourceFamilyController.getRecipeLookupTableMapping'), generateAdapter('get', CONNECT_BASE_URI, INDUSTRIES_PRICING_DMO_DETAILS_PATH, 'PricingResourceFamilyController.getPricingDmoDetails'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_PRICING_RECIPES_MAPPING_PATH, 'PricingResourceFamilyController.createPricingRecipeMapping'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_PRICING_SYNC_PARAM_PATH, 'PricingResourceFamilyController.syncPricingData'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, CREATE_INDUSTRIES_PRICING_VERSIONED_REVISE_DETAILS_PATH, 'PricingResourceFamilyController.updateAndPersistAdjustmentEntity'), generateAdapter('get', CONNECT_BASE_URI, GET_INDUSTRIES_PRICING_WATERFALL, 'IPricingWaterfallLogResourceFamilyController.requestPricingWaterFallOutputResponse'), generateAdapter('post', CONNECT_BASE_URI, VALIDATE_PRICING_FORMULA, 'PricingResourceFamilyController.validatePricingFormula', 'pricingFormulaValidationRequest')];
  const salesTransactionContexts = [generateAdapter('get', REVENUE_MANAGEMENT_URI, REVENUE_SALES_TRANSACTION_CONTEXTS_VIEW, 'IRampDealServiceResourceFamilyController.viewRampDeal'), generateAdapter('post', REVENUE_MANAGEMENT_URI, REVENUE_SALES_TRANSACTION_CONTEXTS_CREATE, 'IRampDealServiceResourceFamilyController.createRampDeal', 'createRampDealInputParam'), generateAdapter('post', REVENUE_MANAGEMENT_URI, REVENUE_SALES_TRANSACTION_CONTEXTS_DELETE, 'IRampDealServiceResourceFamilyController.deleteRampDeal', 'deleteRampDealInputParam'), generateAdapter('post', REVENUE_MANAGEMENT_URI, REVENUE_SALES_TRANSACTION_CONTEXTS_UPDATE, 'IRampDealServiceResourceFamilyController.updateRampDeal', 'updateRampDealInputParam')];
  const amendRenewCancelAssets = [generateAdapter('post', REVENUE_MANAGEMENT_URI, REVENUE_AMEND_ASSETS_PATH, 'IArcResourceFamilyController.amend', 'amendRequest'), generateAdapter('post', REVENUE_MANAGEMENT_URI, REVENUE_RENEW_ASSETS_PATH, 'IArcResourceFamilyController.renew', 'renewRequest'), generateAdapter('post', REVENUE_MANAGEMENT_URI, REVENUE_CANCEL_ASSETS_PATH, 'IArcResourceFamilyController.cancel', 'cancelRequest')];
  const updateQuote = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', COMMERCE_BASE_URI, REVENUE_UPDATE_PLACE_QUOTE_PATH, 'PlaceQuoteController.placeQuote')];
  const placeOrder = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', COMMERCE_BASE_URI, REVENUE_PLACE_ORDER_PATH, 'CommerceOrderController.placeOrder')];
  const salesTransaction = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, REVENUE_INIT_SALES_TRANSACTION_PATH, 'SalesTransactionContextController.initSalesTrxnContext'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, REVENUE_PLACE_SALES_TRANSACTION_PATH, 'SalesTransactionContextController.placeSalesTransaction')];
  const usageDetail = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('get', COMMERCE_BASE_URI, USAGE_DETAIL_QUOTE_PATH, 'UsageDetailsController.getQuoteUsageDetails'), generateAdapter('get', COMMERCE_BASE_URI, USAGE_DETAIL_ORDER_PATH, 'UsageDetailsController.getOrderUsageDetails'), generateAdapter('get', ASSET_MANAGEMENT_BASE_URI, USAGE_DETAIL_ASSET_PATH, 'UsageDetailsController.getAssetUsageDetails')];
  const automationRules = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, APPLY_REMINDER_PATH, 'IAutomatedActionConnectFamilyController.applyReminder')];
  const fundraising = [generateAdapter('get', FUNDRAISING_BASE_URI, FUNDRAISING_GIFT_COMMITMENT_PATH, 'IndustriesFundraisingOperationsFamilyController.getGiftCommitments'), generateAdapter('get', FUNDRAISING_BASE_URI, FUNDRAISING_CAMPAIGN_DEFAULT_DESIGNATION_PATH, 'IndustriesFundraisingOperationsFamilyController.getCampaignDefaultDesignations'), generateAdapter('get', FUNDRAISING_BASE_URI, FUNDRAISING_COMMITMENT_DEFAULT_DESIGNATION_PATH, 'IndustriesFundraisingOperationsFamilyController.getCommitmentDefaultDesignations'), generateAdapter('get', FUNDRAISING_BASE_URI, FUNDRAISING_GIFT_TRANSACTION_PATH, 'IndustriesFundraisingOperationsFamilyController.getGiftTransactions'), generateAdapter('get', FUNDRAISING_BASE_URI, FUNDRAISING_TRANSACTION_LINKED_DESIGNATION_PATH, 'IndustriesFundraisingOperationsFamilyController.getTransactionLinkedDesignations')];
  const cpq = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_PREVIEW_PATH, 'ICpqConnectFeatureController.preview'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_CONFIGURATOR_PATH, 'ICpqConnectFeatureController.configure'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_CONFIGURATOR_CREATE_RULE_PATH, 'ICpqConnectFeatureController.createRule', 'configRulesInput'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_CONFIGURATOR_UPDATE_RULE_PATH, 'ICpqConnectFeatureController.updateRule', 'configRulesInput'), generateAdapter('post', CPQ_BASE_URI, CPQ_CONFIGURATOR_VALIDATE_RULE_PATH, 'ICpqConnectFeatureController.validateRule', 'configRuleValidatorInput'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_PRODUCT_DETAILS_PATH, 'ICpqConnectFeatureController.productDetails'), generateAdapter('post', CPQ_BASE_URI, CPQ_GUIDED_SELECTION, 'ICpqConnectFeatureController.guidedSelectionProductList', 'requestBody'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_PRODUCT_SEARCH_PATH, 'ICpqConnectFeatureController.searchProductList'), generateAdapter('post', CPQ_BASE_URI, CPQ_PRODUCT_BULK_PATH, 'ICpqConnectFeatureController.bulkProductDetails', 'requestBody'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_PRODUCT_LIST_PATH, 'ICpqConnectFeatureController.productList'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_CREATE_CART, 'ICpqConnectFeatureController.createCart'), generateAdapter('post', CPQ_BASE_URI, CPQ_CATEGORY_LIST_PATH, 'ICpqConnectFeatureController.categoryList', 'requestBody'), generateAdapter('post', CPQ_BASE_URI, CPQ_CATEGORY_DETAILS_PATH, 'ICpqConnectFeatureController.categoryDetails', 'requestBody'), generateAdapter('get', CPQ_BASE_URI, CPQ_GET_CART, 'ICpqConnectFeatureController.getCart'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CPQ_BASE_URI, CPQ_UPDATE_CART, 'ICpqConnectFeatureController.updateCart'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CPQ_BASE_URI, CPQ_POST_CART_ITEM, 'ICpqConnectFeatureController.createCartItems'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CPQ_BASE_URI, CPQ_PATCH_CART_ITEM, 'ICpqConnectFeatureController.updateCartItems'), generateAdapter('delete', CPQ_BASE_URI, CPQ_DELETE_CART_ITEM, 'ICpqConnectFeatureController.deleteCartItem'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', CPQ_BASE_URI, CPQ_PRICE_CART, 'ICpqConnectFeatureController.priceCart')];
  const stageManagement = [generateAdapter('get', STAGE_MANAGEMENT_BASE_URI, STAGE_MGMT_KANBAN_VIEW_PATH, 'IStageMgmtFamilyController.getStageDetails')];
  const cdp = [generateAdapter('delete', CDP_BASE_URI, DELETE_CDP_DATA_GRAPH_PATH, 'CdpDataGraphController.deleteDataGraph'), generateAdapter('get', CDP_BASE_URI, GET_CDP_DATA_GRAPH_PATH, 'CdpDataGraphController.getDataGraph'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CDP_BASE_URI, CDP_DATA_GRAPH_PATH, 'CdpDataGraphController.createDataGraph'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CDP_BASE_URI, CDP_DATA_GRAPH_PATH, 'CdpDataGraphController.editDataGraph'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CDP_BASE_URI, PUT_CDP_DATA_GRAPH_PATH, 'CdpDataGraphController.retryDataGraph'), generateAdapter('get', CDP_BASE_URI, DEPENDENCY_CDP_DATA_GRAPH_PATH, 'CdpDataGraphController.getDataGraphDependency'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CDP_BASE_URI, CDP_DATA_GRAPH_DRAFT_PATH, 'CdpDataGraphController.saveDataGraphDraft'), generateAdapter('get', CDP_BASE_URI, GET_CDP_DATA_GRAPH_DRAFT_PATH, 'CdpDataGraphController.getDataGraphDraft')];
  const cdpMetadata = [generateAdapter('get', CDP_BASE_URI, CDP_METADATA, 'CdpQueryController.getAllMetadata'), generateAdapter('get', CDP_BASE_URI, GET_CDP_DATA_GRAPH_METADATA_PATH, 'CdpQueryController.getDataGraphMetadata')];
  const cdpQuery = [generateAdapter('get', CDP_BASE_URI, CDP_UNIVERSAL_ID_LOOKUP, 'CdpQueryController.universalIdLookupBySourceId'), generateAdapter('post', CDP_BASE_URI, CDP_QUERY_ANSI_SQL, 'CdpQueryController.queryANSISql', 'input')];
  const cdpCalculatedInsights = [generateAdapter('get', CDP_BASE_URI, CDP_CALCULATED_INSIGHTS_COLLECTION_METADATA, 'CdpCalculatedInsightController.getCalculatedInsights'), generateAdapter('get', CDP_BASE_URI, CDP_CALCULATED_INSIGHT_METADATA, 'CdpCalculatedInsightController.getCalculatedInsight'), generateAdapter('get', CDP_BASE_URI, CDP_CALCULATED_INSIGHT_QUERY, 'CdpQueryController.queryCalculatedInsights'), generateAdapter('get', CDP_BASE_URI, CDP_QUERY_PROFILE_CALCULATED_INSIGHT, 'CdpQueryController.queryProfileApi')];
  const cdpMachineLearning = [generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_ML_CONFIGURED_MODEL, 'CdpMachineLearningController.getModel'), generateAdapter('patch', CDP_MACHINE_LEARNING_BASE_URI, CDP_ML_CONFIGURED_MODEL, 'CdpMachineLearningController.updateModel', 'model'), generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_MLMODEL_ARTIFACT, 'CdpMachineLearningController.getModelArtifact'), generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_MLMODEL_ARTIFACT_COLLECTION, 'CdpMachineLearningController.getModelArtifacts'), generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_ML_CONFIGURED_MODEL_COLLECTION, 'CdpMachineLearningController.getModels'), generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_WORKSPACES_COLLECTION, 'CdpMachineLearningController.getWorkspaces'), generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_WORKSPACE, 'CdpMachineLearningController.getWorkspace'), generateAdapter('post', CDP_MACHINE_LEARNING_BASE_URI, CDP_ML_CONFIGURED_MODEL_COLLECTION, 'CdpMachineLearningController.createModel', 'model'), generateAdapter('patch', CDP_MACHINE_LEARNING_BASE_URI, CDP_CONFIGURED_MODEL, 'CdpMachineLearningController.updateConfiguredModel', 'configuredModel'), generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_CONFIGURED_MODEL, 'CdpMachineLearningController.getConfiguredModel'), generateAdapter('post', CDP_MACHINE_LEARNING_BASE_URI, CDP_CONFIGURED_MODEL_COLLECTION, 'CdpMachineLearningController.createConfiguredModel', 'configuredModel'), generateAdapter('get', CDP_MACHINE_LEARNING_BASE_URI, CDP_CONFIGURED_MODEL_COLLECTION, 'CdpMachineLearningController.getConfiguredModels')];
  const cdpCommunicationCapping = [generateAdapter('get', CDP_COMMUNICATION_CAPPING_BASE_URI, CDP_COMMUNICATION_CAPPING_CONFIGURATION, 'CdpCommunicationCappingController.getCommunicationCappingRepresentation'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CDP_COMMUNICATION_CAPPING_BASE_URI, CDP_COMMUNICATION_CAPPING_STATUS_RETRY, 'CdpCommunicationCappingController.triggerDMOCICreation')];
  const automotive = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, AUTOMOTIVE_INV_MGMT_PATH, 'InventoryManagementActionsController.postInventoryManagementAction')];
  const docgen = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', DOCGEN_BASE_URI, DOCGEN_BATCH_DOCGEN_PERFORM_ACTION_PATH, 'DocgenController.performDocGenerationBatchProcessAction'), generateAdapter('post', DOCGEN_BASE_URI, DOCGEN_DOCUMENT_TEMPLATE_PATH, 'DocgenController.createDocumentTemplate', 'documentTemplate'), generateAdapter('patch', DOCGEN_BASE_URI, DOCGEN_DOCUMENT_TEMPLATE_PATH, 'DocgenController.updateDocumentTemplate', 'documentTemplateUpdateInput'), generateAdapter('get', DOCGEN_BASE_URI, DOCGEN_DOCUMENT_TEMPLATE_PATH, 'DocgenController.getDocumentTemplates'), generateAdapter('post', DOCGEN_BASE_URI, POST_DOCUMENT_COMPARE_PATH, 'DocgenController.createComparisonDocument', 'documentCompareInput')];
  const IndustriesDfo = [generateAdapter('get', INDUSTRIES_DFO_BASE_URI, INDUSTRIES_DFO_CONFIG_PATH, 'IDfoConfigInfoApiConnectFamilyController.getDfoConfigInfo'), generateAdapter('put', INDUSTRIES_DFO_BASE_URI, INDUSTRIES_DFO_CONFIG_PATH, 'IDfoConfigInfoApiConnectFamilyController.putDfoConfigInfo', 'dfoConfigInfo')];
  const instantPricing = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', INDUSTRIES_BASE_URI, CPQ_INSTANT_PRICING_PATH, 'InstantPricingConnectFeatureController.getInstantPricing')];
  const einstein = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EINSTEIN_BASE_URI, EINSTEIN_LLM_GENERATIONS_PATH, 'EinsteinLLMController.generateMessages'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EINSTEIN_BASE_URI, EINSTEIN_PROMPT_TEMPLATE_GENERATIONS_PATH, 'EinsteinLLMController.generateMessagesForPromptTemplate'), generateAdapter('get', EINSTEIN_BASE_URI, EINSTEIN_PROMPT_TEMPLATE_PATH, 'EinsteinLLMController.getPromptTemplates'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EINSTEIN_BASE_URI, EINSTEIN_LLM_FEEDBACK_PATH, 'EinsteinLLMController.feedback'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', EINSTEIN_BASE_URI, EINSTEIN_LLM_EMBEDDINGS_PATH, 'EinsteinLLMController.createEmbeddings')];
  const nextGenSalesAgreementPrice = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, NEXTGENSALESAGREEMENTPRICE_PATH, 'NextGenerationSalesAgreementPriceController.getNextGenSalesAgreementPrice')];
  const mfgProgramTemplatesList = [generateAdapter('get', CONNECT_BASE_URI, MFG_PROGRAM_TEMPLATES_LIST_PATH, 'MfgProgramController.getManufacturingProgramTemplatesList')];
  const mfgProgramTemplate = [generateAdapter('get', CONNECT_BASE_URI, MFG_PROGRAM_TEMPLATE_PATH, 'MfgProgramController.getManufacturingProgramTemplateDetails')];
  const updateSalesAgreement = [generateAdapter('put', CONNECT_BASE_URI, SALES_AGREEMENT_UPDATE_PATH, 'SalesAgreementProductController.updateSalesAgreement', 'salesAgreementDetailInput')];
  const commerceStoreManagement = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', COMMERCE_STORE_MANAGEMENT_BASE_URI, COMMERCE_STORE_MANAGEMENT_CONFIGURE_PRODUCT_PRICING_PATH, 'ICommerceStoreManagementController.configureProductPricing'), generateAdapter('get', COMMERCE_STORE_MANAGEMENT_BASE_URI, COMMERCE_STORE_MANAGEMENT_GET_PRODUCT_PRICING_PATH, 'ICommerceStoreManagementController.getProductPricing')];
  const commerceCatalogManagement = [generateAdapter('post', COMMERCE_CATALOG_MANAGEMENT_BASE_URI, COMMERCE_CATALOG_MANAGEMENT_COMPOSITE_PRODUCT_CREATE_PATH, 'CommerceCatalogManagementController.compositeCommerceProductCreate', 'compositeCommerceProductInputRepresentation'), generateAdapter('put', COMMERCE_CATALOG_MANAGEMENT_BASE_URI, COMMERCE_CATALOG_MANAGEMENT_COMPOSITE_PRODUCT_UPDATE_PATH, 'CommerceCatalogManagementController.compositeCommerceProductUpdate', 'compositeCommerceProductInputRepresentation'), generateAdapter('post', COMMERCE_CATALOG_MANAGEMENT_BASE_URI, COMMERCE_CATALOG_MANAGEMENT_COMPOSITE_VARIATION_CREATE_PATH, 'CommerceCatalogManagementController.compositeCommerceVariationCreate', 'compositeCommerceVariationInputRepresentation'), generateAdapter('get', COMMERCE_CATALOG_MANAGEMENT_URI, COMMERCE_CATALOG_MANAGEMENT_PRODUCT_ATTRIBUTE_SEARCH_PATH, 'CommerceCatalogManagementController.getProductAttributesAndProductAttributeSets')];
  const servicePlan = [generateAdapter('put', SERVICE_PLAN_BASE_URI, SERVICE_PLAN_PATH, 'ServicePlanController.executeServicePlan', 'servicePlanExecutionInputRepresentation'), generateAdapter('post', SERVICE_PLAN_BASE_URI, SERVICE_PLAN_POST_PATH, 'ServicePlanController.generateServicePlan', 'servicePlanGenerationRequest'), generateAdapter('get', SERVICE_PLAN_BASE_URI, SERVICE_PLAN_GENERATION_REQUEST_STATUS_GET_PATH, 'ServicePlanController.getGenerationRequest'), generateAdapter('get', SERVICE_PLAN_BASE_URI, SERVICE_PLAN_DETAILS_PATH, 'ServicePlanController.getServicePlanDetails')];
  const commerceChannelsManagement = [generateAdapter('get', COMMERCE_BASE_URI, GET_MANAGEMENT_CHANNELS_PATH, 'ICommerceChannelManagementController.getChannels'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('get', COMMERCE_CHANNEL_MANAGEMENT_BASE_URI, COMMERCE_CHANNELS_PATH, 'ICommerceChannelManagementController.getChannel'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', COMMERCE_CHANNEL_MANAGEMENT_BASE_URI, COMMERCE_CHANNELS_PATH, 'ICommerceChannelManagementController.updateChannel')];
  const serviceCatalogCategory = [generateAdapter('get', SERVICE_CATALOG_CATEGORIES_BASE_URI, SERVICE_CATALOG_CATEGORIES_PATH, 'ServiceCatalogCategoryController.getCategories')];
  const SERVICE_SLACK_CONVERSATION_INFO = new RegExp(`${SERVICE_SLACK_BASE_URI}/slack/conversation/info$`, 'i');
  const SERVICE_SLACK_SEARCH_CONVERSATION = new RegExp(`${SERVICE_SLACK_BASE_URI}/slack/search/conversation$`, 'i');
  const SERVICE_SLACK_SEARCH_EMOJI = new RegExp(`${SERVICE_SLACK_BASE_URI}/slack/search/emoji$`, 'i');
  const SERVICE_SLACK_SEARCH_USER = new RegExp(`${SERVICE_SLACK_BASE_URI}/slack/search/user$`, 'i');
  const SERVICE_SLACK_CONVERSATION_AUTH = new RegExp(`${SERVICE_SLACK_BASE_URI}/conversation/auth$`, 'i');
  const SERVICE_SLACK_CONVERSATION_EMOJIS = new RegExp(`${SERVICE_SLACK_BASE_URI}/conversation/emojis$`, 'i');
  const SERVICE_SLACK_CONVERSATION_FILES = new RegExp(`${SERVICE_SLACK_BASE_URI}/conversation/files$`, 'i');
  const SERVICE_SLACK_CONVERSATION_MESSAGES = new RegExp(`${SERVICE_SLACK_BASE_URI}/conversation/messages$`, 'i');
  const SERVICE_SLACK_CONVERSATION_BY_TIMESTAMP = new RegExp(`${SERVICE_SLACK_BASE_URI}/conversation/messages/([0-9.]){1,30}$`, 'i');
  const SERVICE_SLACK_CONVERSATION_MESSAGE_REACTIONS = new RegExp(`${SERVICE_SLACK_BASE_URI}/conversation/messages/([0-9.]){1,30}/reactions$`, 'i');
  const SERVICE_SLACK_CONVERSATION_USER = new RegExp(`${SERVICE_SLACK_BASE_URI}/conversation/user/([A-Za-z0-9_]+){3,50}$`, 'i');
  const serviceSlack = [generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_MESSAGES, 'SwarmingController.getSlackConversationReplies'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_MESSAGES, 'SwarmingController.getSlackConversationHistory'), generateAdapter('post', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_MESSAGES, 'SwarmingController.postSlackMessage', 'slackMessagePostRequest'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_AUTH, 'SwarmingController.getSlackSalesforceAuthentication'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_INFO, 'SwarmingController.getConversationInfo'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_SEARCH_CONVERSATION, 'SwarmingController.searchSlackConversation'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_SEARCH_EMOJI, 'SwarmingController.searchSlackEmoji'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_SEARCH_USER, 'SwarmingController.searchSlackUser'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_EMOJIS, 'SwarmingController.getSlackEmojis'), generateAdapter('post', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_FILES, 'SwarmingController.uploadSlackFile', 'slackFileUploadRequest'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_BY_TIMESTAMP, 'SwarmingController.getSlackReply'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_BY_TIMESTAMP, 'SwarmingController.getSlackMessage'), generateAdapter('patch', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_BY_TIMESTAMP, 'SwarmingController.updateSlackMessage', 'slackMessageUpdateRequest'), generateAdapter('delete', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_BY_TIMESTAMP, 'SwarmingController.deleteSlackMessage'), generateAdapter('post', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_MESSAGE_REACTIONS, 'SwarmingController.postSlackMessageReaction', 'slackMessageReactionPostRequest'), generateAdapter('delete', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_MESSAGE_REACTIONS, 'SwarmingController.deleteSlackMessageReaction'), generateAdapter('get', SERVICE_SLACK_BASE_URI, SERVICE_SLACK_CONVERSATION_USER, 'SwarmingController.getSlackUser')];
  const reminder = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', REMINDER_BASE_URI, REMINDER_PATH, 'ReminderDefinitionsController.createReminderDefinition'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', REMINDER_BASE_URI, REMINDER_PATH, 'ReminderDefinitionsController.updateReminderDefinition')];
  const pathassistant = [generateAdapter('get', PATHASSISTANT_BASE_URI, PATHASSISTANT_GET_PATH, 'PathAssistantController.getPathAssistant'), generateAdapter('get', PATHASSISTANT_BASE_URI, PATHASSISTANT_DAYS_IN_STAGE_PATH, 'PathAssistantController.getPathAssistantDaysInStage'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('patch', PATHASSISTANT_BASE_URI, PATHASSISTANT_COLLAPSIBLE_DRAWER_USER_PREF_PATH, 'PathAssistantController.updateCollapsibleDrawerUserPref')];
  const ai4m = [generateAdapter('post', AI4M_EINSTEIN_BASE_URI, POST_AI4M_EINSTEIN_MODIFY_CONTENT_PATH, 'Ai4mController.postModifyContent', 'ContentModifyInput'), generateAdapter('post', AI4M_EINSTEIN_BASE_URI, POST_AI4M_EINSTEIN_CREATE_CONTENT_PATH, 'Ai4mController.postCreateContent', 'ContentCreateInput')];
  const decisiontable = [generateAdapter('get', DECISIONTABLE_BASE_URI, DECISION_TABLE_BY_ID_PATH, 'DecisionTableFamilyController.getDecisionTable'), generateAdapter('get', DECISIONTABLE_BASE_URI, DECISION_TABLE_TEMPLATES_DEFINITION_PATH, 'DecisionTableFamilyController.getDecisionTableTemplateDefinition'), generateAdapter('get', DECISIONTABLE_BASE_URI, DECISION_TABLE_TEMPLATES_LIST_PATH, 'DecisionTableFamilyController.getDecisionTableTemplateList'), generateAdapter('post', DECISIONTABLE_BASE_URI, DECISION_TABLE_ROW_UPLOAD_PATH, 'DecisionTableFamilyController.postDecisionTableRows', 'rowsInput'), generateAdapter('get', DECISIONTABLE_BASE_URI, DECISION_TABLE_ROW_UPLOAD_PATH, 'DecisionTableFamilyController.getDecisionTableRows'), generateAdapter('post', DECISIONTABLE_BASE_URI, DECISION_TABLE_FILE_UPLOAD_PATH, 'DecisionTableFamilyController.postDecisionTableFile', 'fileInput'), generateAdapter('get', DECISIONTABLE_BASE_URI, DECISION_TABLE_FILE_UPLOAD_PATH, 'DecisionTableFamilyController.getDecisionTableFile')];
  const contentTaxonomy = [generateAdapter('get', CONTENT_TAXONOMY_BASE_URI, CONTENT_TAXONOMY_TERMS_SEARCH_PATH, 'ContentTaxonomyController.searchTerms'), generateAdapter('get', CONTENT_TAXONOMY_BASE_URI, CONTENT_TAXONOMY_TERMS_PATH, 'ContentTaxonomyController.getTerms'), generateAdapter('get', CONTENT_TAXONOMY_BASE_URI, CONTENT_TAXONOMY_TERM_PATH, 'ContentTaxonomyController.getTerm'), generateAdapter('delete', CONTENT_TAXONOMY_BASE_URI, CONTENT_TAXONOMY_TERM_PATH, 'ContentTaxonomyController.deleteTerm'), generateAdapter('patch', CONTENT_TAXONOMY_BASE_URI, CONTENT_TAXONOMY_TERM_PATH, 'ContentTaxonomyController.updateTerm', 'term'), generateAdapter('post', CONTENT_TAXONOMY_BASE_URI, CONTENT_TAXONOMY_CREATE_TERM_PATH, 'ContentTaxonomyController.createTerm', 'term'), generateAdapter('get', CMS_BASE_URI, CMS_CONTENT_TAXONOMY_TERMS_PATH, 'ManagedContentController.getTaxonomyTerms'), generateAdapter('patch', CMS_BASE_URI, CMS_CONTENT_TAXONOMY_TERMS_PATH, 'ManagedContentController.updateTaxonomyTerms', 'taxonomyTerms')];
  const mfgProductServiceCampaign = [
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('post', CONNECT_BASE_URI, MFG_PRODUCT_SERVICE_CAMPAIGN_ITEMS_PATH, 'ProductServiceCampaignController.createProductServiceCampaign', 'createPSCIInput')];
  const workOrderForProductServiceCampaignItem = [generateAdapter('post', CONNECT_BASE_URI, WORK_ORDER_FOR_PRODUCT_SERVICE_CAMPAIGN_ITEM, 'CreateWorkOrdersController.createWorkOrders', 'createWorkOrdersInput')];
  const workOrderEtimationPriceItem = [generateAdapter('put', CONNECT_BASE_URI, WORK_ORDER_ESTIMATION_PRICE_ITEM_PATH, 'WorkOrderEstimationController.priceItemWithCoverage', 'priceItemWithCoverageInput')];
  const appointmentScheduling = [generateAdapter('get', CONNECT_BASE_URI, APPOINTMENT_SCHEDULING_PATH, 'AppointmentSchedulingController.getAppointmentSlots'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', CONNECT_BASE_URI, APPOINTMENT_SCHEDULING_PATH, 'AppointmentSchedulingController.bookAppointmentSlot')];
  const energyUtilities = [generateAdapter('get', ENERGY_UTILITIES_PROGRAMS_BASE_URI, ENERGY_UTILITIES_PROGRAMS_GET_PROGRAM_APPLICATIONS_PATH, 'EUProgramController.getProgramApplication')];
  const knowledge = [generateAdapter('patch', CONNECT_BASE_URI, KNOWLEDGE_ARTICLE_VIEW_STAT_PATH, 'KnowledgeController.updateViewStat', 'articleViewStatInput')];
  const conversationRuntimeProxy = [generateAdapter('get', CONNECT_BASE_URI, CONVERSATION_RUNTIME_PROXY_PATH, 'ConversationRuntimeProxyController.getBotId'), generateAdapter('post', CONNECT_BASE_URI, CONVERSATION_RUNTIME_PROXY_PATH, 'ConversationRuntimeProxyController.sendMessage', 'postBody'), generateAdapter('get', CONNECT_BASE_URI, COPILOT_RECOMMENDATION_PATH, 'ConversationRuntimeProxyController.getRecommendedPlanTemplates'), generateAdapter('post', CONNECT_BASE_URI, COPILOT_FOLLOWUP_ACTIONS_PATH, 'ConversationRuntimeProxyController.getFollowUpActions', 'postBody'), generateAdapter('get', CONNECT_BASE_URI, COPILOT_RECOMMENDED_ACTIONS_PATH, 'ConversationRuntimeProxyController.getRecommendedActions'), generateAdapter('get', CONNECT_BASE_URI, COPILOT_RECOMMENDED_UTTERANCES_PATH, 'ConversationRuntimeProxyController.getRecommendedUtterances'), generateAdapter('get', CONNECT_BASE_URI, COPILOT_WELCOME_UTTERANCES_PATH, 'ConversationRuntimeProxyController.getWelcomeUtterances'), generateAdapter('post', CONNECT_BASE_URI, COPILOT_LLM_FEEDBACK_PATH, 'ConversationRuntimeProxyController.submitFeedback', 'submitFeedback'), generateAdapter('get', CONNECT_BASE_URI, COPILOT_OBJECTS_PATH, 'ConversationRuntimeProxyController.getCopilotObjects')];
  const sharingFamily = [generateAdapter('post', SHARING_BASE_URI, SHARING_PUBLIC_GROUP_SUMMARY_PATH, 'SharingController.getPublicGroupShareData', 'publicGroup'), generateAdapter('get', SHARING_BASE_URI, USER_SUMMARY_SHARING_PATH, 'SharingController.getGroupsForUser'), generateAdapter('get', SHARING_BASE_URI, GET_SOBJECTS_PATH, 'SharingController.getAllSobjects'), generateAdapter('get', SHARING_BASE_URI, GET_USER_PERMISSIONS_PATH, 'SharingController.getUserPermissions'), generateAdapter('post', SHARING_BASE_URI, SHARING_PUBLIC_GROUP_DETAILS_PATH, 'SharingController.getPublicGroupMembershipDetails', 'publicGroupsDetailsParams')];
  const gdfDch = [generateAdapter('patch', CONNECT_BASE_URI, GDF_UPDATE_ASSESSMENT_RESPONSES, 'DCHFamilyController.updateAssessmentResponses', 'saveAssessmentResponsesInput'), generateAdapter('post', CONNECT_BASE_URI, GDF_SAVE_ASSESSMENT_RESPONSES, 'DCHFamilyController.saveAssessmentResponses', 'saveAssessmentResponsesInput')];
  const omnidesigner = [generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_ENTITY_INFO, 'OmniDesignerController.fetchEntityInfo'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_DATARAPTOR_CONFIG, 'OmniDesignerController.getDataraptorConfig'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_GET_EXPRESSION_GRAMMAR, 'OmniDesignerController.getExpressionGrammar'), generateAdapter('patch', CONNECT_BASE_URI, OMNI_DESIGNER_PATCH_SIMULATE_DATARAPTOR, 'OmniDesignerController.simulateDataraptor', 'dataraptorSimualateInputParams'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_GET_FILE_CARD_DETAIL_URI, 'OmniDesignerController.getFileCardDetail'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_ADD_ATTACHMENT_URI, 'OmniDesignerController.cardUpsertAttachment', 'cardUpsertAttachmentInput'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_GET_CARD_BY_ID_URI, 'OmniDesignerController.getCardById'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_DATARAPTOR_LIST, 'OmniDesignerController.fetchDataraptorList'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_DECISION_MATRIX, 'OmniDesignerController.fetchDecisionMatrix'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_DOCUSIGN_TEMPLATES, 'OmniDesignerController.fetchDocusignTemplates'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_EMAIL_DOCUMENTS, 'OmniDesignerController.fetchEmailDocuments'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_OMNIPROCESS_LIST, 'OmniDesignerController.fetchOmniProcessList'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_OMNIPROCESS_DATA, 'OmniDesignerController.fetchOmniProcessData'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_ENTITY_RECORDS_URI, 'OmniDesignerController.getEntityRecords', 'getEntityRecordsInput'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_GET_CARD_LIST_URI, 'OmniDesignerController.getCardList'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_UPSERT_OMNIPROCESS, 'OmniDesignerOmniscriptResourceController.upsertOmniProcess', 'omniProcessUpsertData'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_UPSERT_DATARAPTOR, 'OmniDesignerOmniscriptResourceController.upsertDataraptor', 'dataraptorUpsertData'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_DESIGNER_CUSTOMIZATIONS, 'OmniDesignerOmniscriptResourceController.fetchDesignerCustomizations'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_DYNAMIC_ELEMENTS_RESOURCE, 'OmniDesignerOmniscriptResourceController.fetchDynamicElements'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_NON_OMNISCRIPT_LWC_RESOURCE, 'OmniDesignerOmniscriptResourceController.fetchNonOmniscriptLwcResource'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_OS_BUILD_JSONRESOURCE, 'OmniDesignerOmniscriptResourceController.buildJson', 'buildJson'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_OS_CLONE_OMNI_PROCESS_ELEMENT, 'OmniDesignerOmniscriptResourceController.cloneOmniscriptElement', 'cloneOmniscriptElementData'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_OS_CLONE_OMNI_PROCESS, 'OmniDesignerOmniscriptResourceController.cloneOmniProcess', 'cloneOmniProcessData'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_OS_DELETE_OMNI_PROCESS_ELEMENT, 'OmniDesignerOmniscriptResourceController.deleteOmniscriptElement', 'deleteOmniscriptElementData'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_OS_INSERT_OMNI_PROCESS_ELEMENT, 'OmniDesignerOmniscriptResourceController.insertOmniscriptElement', 'insertOmniscriptElementData'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_OS_MOVE_OMNI_PROCESS_ELEMENT, 'OmniDesignerOmniscriptResourceController.moveOmniscriptElement', 'moveOmniscriptElementData'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_UPLOAD_DOCUMENT, 'OmniDesignerOmniscriptResourceController.uploadDocument', 'uploadDocumentData'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_GET_INTEGRATION_PROCEDURE_DATA, 'OmniDesignerController.getIntegrationProcedureFetchRecord'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_POST_INTEGRATION_PROCEDURE_ELEMENT, 'OmniDesignerController.postIntegrationProcedureConnectPost', 'integrationProcedureRecordInputRepresentationObject'), generateAdapter('patch', CONNECT_BASE_URI, OMNI_DESIGNER_PATCH_EXECUTION_IP, 'OmniDesignerController.integrationProcedureExecutionResult', 'integrationProcedureExecuteInputRepresentationObject'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_OS_FILE_OUTPUT_RESOURCE, 'OmniDesignerOmniscriptResourceController.getOmniscriptDetail'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_FETCH_FILE_BASED_OS_LIST_RESOURCE, 'OmniDesignerOmniscriptResourceController.getOmniScriptList'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_GET_EMAIL_TEMPLATES, 'OmniDesignerController.getEmailTemplates'), generateAdapter('post', CONNECT_BASE_URI, OMNI_DESIGNER_OS_BUILD_BP_DATA_JSON_RESOURCE, 'OmniDesignerOmniscriptResourceController.results', 'businessDataJson'), generateAdapter('get', CONNECT_BASE_URI, OMNI_DESIGNER_GET_DESIGNER_CUSTOMIZATIONS_WARNING, 'OmniDesignerOmniscriptResourceController.fetchDesignerCustomizationElementWarning')];
  const manufacturing = [generateAdapter('post', CONNECT_BASE_URI, MFG_CREATE_SUPPLIER_CLAIMS_PATH, 'ManufacturingController.createSupplierClaims', 'supplierClaimInput')];
  const salesforceJourney = [generateAdapter('post', SALESFORCE_JOURNEY_BASE_URI, SALESFORCE_JOURNEY_CAPABILITIES_PATH, 'SalesforceJourneyController.getCapabilities', 'filterConditionsInput'), generateAdapter('get', SALESFORCE_JOURNEY_BASE_URI, SALESFORCE_JOURNEY_CAPABILITY_CONTENT_PATH, 'SalesforceJourneyController.getCapabilityContentDocument'), generateAdapter('get', SALESFORCE_JOURNEY_BASE_URI, SALESFORCE_JOURNEY_CAPABILITY_SEARCH_PATH, 'SalesforceJourneyController.getCapabilitySearchResult'), generateAdapter('get', SALESFORCE_JOURNEY_BASE_URI, SALESFORCE_JOURNEY_CATEGORIES_PATH, 'SalesforceJourneyController.getCategoriesMetadata'), generateAdapter('post', SALESFORCE_JOURNEY_BASE_URI, SALESFORCE_JOURNEY_CAPABILITY_USER_PREFERENCE_PATH, 'SalesforceJourneyController.upsertCapabilityUserPreference', 'capabilityUserPreferenceInput')];
  const personalizationService = [generateAdapter('get', PERSONALIZATION_SERVICE_BASE_URI, GET_PERSONALIZATION_POINT, 'PersonalizationServiceController.getPersonalizationPoint'), generateAdapter('post', PERSONALIZATION_SERVICE_BASE_URI, CREATE_PERSONALIZATION_POINT, 'PersonalizationServiceController.createPersonalizationPoint', 'input'), generateAdapter('put', PERSONALIZATION_SERVICE_BASE_URI, UPDATE_PERSONALIZATION_POINT, 'PersonalizationServiceController.updatePersonalizationPoint', 'input'), generateAdapter('delete', PERSONALIZATION_SERVICE_BASE_URI, DELETE_PERSONALIZATION_POINT, 'PersonalizationServiceController.deletePersonalizationPoint'), generateAdapter('get', PERSONALIZATION_SERVICE_BASE_URI, GET_PERSONALIZATION_SCHEMA, 'PersonalizationServiceController.getPersonalizationSchema'), generateAdapter('post', PERSONALIZATION_SERVICE_BASE_URI, CREATE_PERSONALIZATION_SCHEMA, 'PersonalizationServiceController.createPersonalizationSchema', 'input'), generateAdapter('delete', PERSONALIZATION_SERVICE_BASE_URI, DELETE_PERSONALIZATION_SCHEMA, 'PersonalizationServiceController.deletePersonalizationSchema')];
  const industriesRecordAggregation = [generateAdapter('post', RECORD_AGGREGATION_BASE_URI, RECORD_AGGREGATION_DEFINITION_CREATE_DATA, 'RecordAggregationFamilyController.createRecordAggregationResource', 'recordAggregationPostInput'), generateAdapter('put', RECORD_AGGREGATION_BASE_URI, RECORD_AGGREGATION_DEFINITION_READ_UPDATE_DATA, 'RecordAggregationFamilyController.updateRecordAggregationResource', 'recordAggregationPutInput'), generateAdapter('post', RECORD_AGGREGATION_BASE_URI, RECORD_AGGREGATION_DEFINITION_FETCH_RECORD_ROLLUP_RESULT_DATA, 'RecordAggregationFamilyController.generateRecordRollupResult', 'recordAggregationResultInput'), generateAdapter('get', RECORD_AGGREGATION_BASE_URI, RECORD_AGGREGATION_DEFINITION_FETCH_APPLICABLE_OBJECTS_DATA, 'RecordAggregationFamilyController.recordAggregationDefinitionApplicableObjects'), generateAdapter('get', RECORD_AGGREGATION_BASE_URI, RECORD_AGGREGATION_DEFINITION_READ_UPDATE_DATA, 'RecordAggregationFamilyController.getRecordAggregationDefinition'), generateAdapter('patch', RECORD_AGGREGATION_BASE_URI, RECORD_AGGREGATION_DEFINITION_READ_UPDATE_DATA, 'RecordAggregationFamilyController.recordAggregationDefinitionPartialUpdate', 'recordAggregationPatchInput'), generateAdapter('get', RECORD_AGGREGATION_BASE_URI, RECORD_AGGREGATION_DEFINITION_GET_ENTITY_APPLICABLE_FIELDS_DATA, 'RecordAggregationFamilyController.getRecordAggregationObjectApplicableFieldList')];
  const integrationFulfillment = [generateAdapter('get', CONNECT_BASE_URI, FULFILLMENT_STEPS_PATH, 'IntegrationOrchestratorFamilyController.fulfillmentSteps'), generateAdapter('get', CONNECT_BASE_URI, FULFILLMENT_CONTEXTS_PATH, 'IntegrationOrchestratorFamilyController.fulfillmentContexts')];
  const evfSdk = [generateAdapter('post', EVF_SDK_BASE_URI, EVF_SDK_POST_EVENT_PATH, 'EvfSdkController.publishEvent', 'event'), generateAdapter('get', EVF_SDK_BASE_URI, EVF_SDK_GET_EVENT_TYPES_PATH, 'EvfSdkController.getEventTypes')];
  const semanticEngine = [generateAdapter('post', SEMANTIC_ENGINE_BASE_URI, SEMANTIC_ENGINE_POST_GATEWAY_PATH, 'SemanticEngineController.executeSemanticQuery', 'semanticQueryRequest')];
  const SEMANTIC_AUTHORING_MODELS_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models$`, 'i');
  const SEMANTIC_AUTHORING_MODELS_BY_NAME_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)$`, 'i');
  const SEMANTIC_AUTHORING_METRICS_BY_MODEL_NAME_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/metrics$`, 'i');
  const SEMANTIC_AUTHORING_METRIC_BY_NAME_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/metrics/([A-Za-z0-9_-]+)$`, 'i');
  const SEMANTIC_AUTHORING_SUB_METRICS_BY_MODEL_NAME_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/sub-metrics$`, 'i');
  const SEMANTIC_AUTHORING_SUB_METRIC_BY_NAME_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/sub-metrics/([A-Za-z0-9_-]+)$`, 'i');
  const SEMANTIC_AUTHORING_SUB_METRICS_BY_METRICS_NAME_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/metric-api-names/(([a-zA-Z0-9_-]+,)*[a-zA-Z0-9_-]+)/sub-metrics$`, 'i');
  const SEMANTIC_AUTHORING_SUB_METRICS_BY_ID_NAME_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/sub-metrics/(([a-zA-Z0-9_-]+,)*[a-zA-Z0-9_-]+)$`, 'i');
  const SEMANTIC_AUTHORING_POST_SUB_METRIC_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/sub-metrics$`, 'i');
  const SEMANTIC_AUTHORING_DELETE_SUB_METRIC_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/sub-metrics/([A-Za-z0-9_-]+)$`, 'i');
  const SEMANTIC_AUTHORING_GOAL_IN_SUB_METRIC_PATH = new RegExp(`${SEMANTIC_AUTHORING_BASE_URI}/models/([A-Za-z0-9_-]+)/sub-metrics/([A-Za-z0-9_-]+)/goal$`, 'i');
  const semanticAuthoring = [generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_MODELS_PATH, 'SemanticModelController.getSemanticModels', 'SemanticModelCollectionOutputRepresentation'), generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_MODELS_BY_NAME_PATH, 'SemanticModelController.getSemanticModel', 'SemanticModelOutputRepresentation'), generateAdapter('post', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_MODELS_PATH, 'SemanticModelController.createSemanticModel', 'input'), generateAdapter('patch', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_MODELS_BY_NAME_PATH, 'SemanticModelController.patchSemanticModel', 'inputName'), generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_METRICS_BY_MODEL_NAME_PATH, 'SemanticMetricController.getSemanticMetrics'), generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_METRIC_BY_NAME_PATH, 'SemanticMetricController.getSemanticMetric'), generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_SUB_METRIC_BY_NAME_PATH, 'SemanticSubMetricController.getSemanticSubMetric'), generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_SUB_METRICS_BY_MODEL_NAME_PATH, 'SemanticSubMetricController.getSemanticSubMetrics'), generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_SUB_METRICS_BY_METRICS_NAME_PATH, 'SemanticSubMetricController.getSemanticMetricsToSubMetrics'), generateAdapter('get', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_SUB_METRICS_BY_ID_NAME_PATH, 'SemanticSubMetricController.getSemanticSubMetricsById'), generateAdapter('post', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_POST_SUB_METRIC_PATH, 'SemanticSubMetricController.createSemanticSubMetric', 'input'), generateAdapter('delete', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_DELETE_SUB_METRIC_PATH, 'SemanticSubMetricController.deleteSemanticSubMetric'), generateAdapter('patch', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_GOAL_IN_SUB_METRIC_PATH, 'SemanticSubMetricController.patchSemanticMetricGoal', 'input'), generateAdapter('delete', SEMANTIC_AUTHORING_BASE_URI, SEMANTIC_AUTHORING_GOAL_IN_SUB_METRIC_PATH, 'SemanticSubMetricController.deleteGoalFromSubMetric')];
  const payments = [generateAdapter('get', PAYMENTS_BASE_URI, PAYMENT_METHOD_SET_PATH, 'PaymentsBuyerController.getPaymentMethodSetsByMerchantAccount'), generateAdapter('post', PAYMENTS_BASE_URI, PAYMNET_INTENT_PATH, 'PaymentsBuyerController.createPaymentIntent', 'paymentIntentInputRepresentation'), generateAdapter('post', PAYMENTS_BASE_URI, SAVED_PAYMENT_METHOD_PATH, 'PaymentsBuyerController.createSavedPaymentMethod', 'savedPaymentMethodInputRepresentation'), generateAdapter('get', PAYMENTS_BASE_URI, SAVED_PAYMENT_METHOD_PATH, 'PaymentsBuyerController.getSavedPaymentMethods'), generateAdapter('get', PAYMENTS_BASE_URI, PAYMNET_INTENT_TIMELINE_PATH, 'PaymentsActivityTimelineController.getActivityTimeline')];
  const GENERATE_AI_AUTOFILL_FORM = new RegExp(`${AI_AUTOFILL_BASE_URI}/generateAutoFillFormContent`, `i`);
  const aiAutofill = [generateAdapter('post', AI_AUTOFILL_BASE_URI, GENERATE_AI_AUTOFILL_FORM, 'AutoFillFormController.generateAutoFillFormContent', 'autoFillFormResourceInput')];
  const milestones = [generateAdapter('get', MILESTONES_BASE_URI, MILESTONES_BUSINESS_HOURS_PATH, 'MilestonesController.getBusinessHours'),
  // eslint-disable-next-line @salesforce/lds/oas-body-name-required
  generateAdapter('put', MILESTONES_BASE_URI, MILESTONES_MILESTONE_COMPLETED_PATH, 'MilestonesController.markMilestoneCompleted'), generateAdapter('get', MILESTONES_BASE_URI, MILESTONES_MILESTONES_DATA_MANAGER_PATH, 'MilestonesController.getMilestonesDataManager')];
  const serviceEmployee = [generateAdapter('post', CONNECT_BASE_URI, SERVICE_EMPLOYEE_GET_FIELD_DETAILS_PATH, 'ServiceEmployeeController.getFieldDetailsFromCompactLayout', 'employeeProfileCardInputList'), generateAdapter('post', CONNECT_BASE_URI, SERVICE_EMPLOYEE_GET_USER_PROFILE_DETAILS_PATH, 'ServiceEmployeeController.getUserProfileDetails', 'userProfile'), generateAdapter('patch', CONNECT_BASE_URI, SERVICE_EMPLOYEE_UPDATE_USER_SETTINGS_PATH, 'ServiceEmployeeController.userSettings', 'userSettingsInputReq'), generateAdapter('get', CONNECT_BASE_URI, SERVICE_EMPLOYEE_GET_USER_SETTINGS_PATH, 'ServiceEmployeeController.getUserSettings'), generateAdapter('post', CONNECT_BASE_URI, SERVICE_EMPLOYEE_GET_AVAILABLE_OPTIONS_PATH, 'ServiceEmployeeController.availableUserOptions', 'availableUserOptions'), generateAdapter('post', CONNECT_BASE_URI, SERVICE_EMPLOYEE_POST_PROVISIONING_JOB, 'ServiceEmployeeController.initiateEmpUserProvisioningJob', 'initiateEmpUserProvisioningInputRepresentation')];
  const channelRevenueManagement = [generateAdapter('post', CONNECT_BASE_URI, PRICE_PROTECTION_CLAIM_PATH, 'PriceProtectionController.priceProtectionClaim', 'priceProtectionClaimInput')];
  const appFramework = [generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_APPS_GET, 'AppFrameworkController.getApps'), generateAdapter('post', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_APPS_POST, 'AppFrameworkController.createApp', 'app'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_APP_GET, 'AppFrameworkController.getApp'), generateAdapter('delete', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_APP_DELETE, 'AppFrameworkController.deleteApp'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_APP_ASSETS_GET, 'AppFrameworkController.getAppAssets'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_APP_ACTIVITIES_GET, 'AppFrameworkController.getAppActivities'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_APP_ACTIVITY_GET, 'AppFrameworkController.getAppActivity'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_INSTALLED_ASSETS_GET, 'AppFrameworkController.getInstalledAssets'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_TEMPLATES_GET, 'AppFrameworkController.getTemplates'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_TEMPLATE_GET, 'AppFrameworkController.getTemplate'), generateAdapter('get', APP_FRAMEWORK_BASE_URI, APP_FRAMEWORK_TEMPLATE_CONFIG_GET, 'AppFrameworkController.getTemplateConfig')];
  const engagement = [generateAdapter('post', ENGMNT_CONFIG_BASE_URI, CREATE_ENGAGEMENT_SIGNAL, 'EngagementSignalServiceController.createEngagementSignal', 'input')];
  const constraints = [generateAdapter('get', INDUSTRIES_BASE_URI, INDUSTRIES_CONSTRAINTS_PATH, 'IConstraintServiceResourceFamilyController.getConstraintVersion'), generateAdapter('post', INDUSTRIES_BASE_URI, INDUSTRIES_CONSTRAINTS_POST_PATH, 'IConstraintServiceResourceFamilyController.createConstraintVersion', 'constraintInput'), generateAdapter('patch', INDUSTRIES_BASE_URI, INDUSTRIES_CONSTRAINTS_PATH, 'IConstraintServiceResourceFamilyController.updateConstraintVersion', 'constraintInput')];
  const SF_DRIVE_GET_CREDENTIALS_PATH = new RegExp(`${CDP_BASE_URI}/sf-drive/actions/generate-credential$`, 'i');
  const sfDrive = [generateAdapter('post', CDP_BASE_URI, SF_DRIVE_GET_CREDENTIALS_PATH, 'SfDriveController.generateSFDriveCredentials', 'generateSFDriveCredentialsInput')];
  registerApiFamilyRoutes(homeHealth);
  registerApiFamilyRoutes(providerNetworkManagement);
  registerApiFamilyRoutes(decisiontable);
  registerApiFamilyRoutes(updateQuote);
  registerApiFamilyRoutes(placeOrder);
  registerApiFamilyRoutes(salesTransaction);
  registerApiFamilyRoutes(usageDetail);
  registerApiFamilyRoutes(connect);
  registerApiFamilyRoutes(connectInternal);
  registerApiFamilyRoutes(commerce);
  registerApiFamilyRoutes(commerce_management);
  registerApiFamilyRoutes(servicePlan);
  registerApiFamilyRoutes(commerceChannelsManagement);
  registerApiFamilyRoutes(commerce_configuration);
  registerApiFamilyRoutes(commerce_extension);
  registerApiFamilyRoutes(commerce_esf);
  registerApiFamilyRoutes(guidance);
  registerApiFamilyRoutes(analytics);
  registerApiFamilyRoutes(analyticsPrivate);
  registerApiFamilyRoutes(tableauEmbedding);
  registerApiFamilyRoutes(scalecenter);
  registerApiFamilyRoutes(networkDataCategory);
  registerApiFamilyRoutes(dataCategory);
  registerApiFamilyRoutes(flow);
  registerApiFamilyRoutes(flowBuilder);
  registerApiFamilyRoutes(billing);
  registerApiFamilyRoutes(marketingIntegration);
  registerApiFamilyRoutes(videovisits);
  registerApiFamilyRoutes(featurevalidation);
  registerApiFamilyRoutes(interesttagging);
  registerApiFamilyRoutes(identityVerification);
  registerApiFamilyRoutes(salesExcellence);
  registerApiFamilyRoutes(omnianalytics);
  registerApiFamilyRoutes(hpiscore);
  registerApiFamilyRoutes(learningContentPlatform);
  registerApiFamilyRoutes(eci);
  registerApiFamilyRoutes(industriesFieldset);
  registerApiFamilyRoutes(timeline);
  registerApiFamilyRoutes(criteriabasedsearchfilter);
  registerApiFamilyRoutes(smartDataDiscovery);
  registerApiFamilyRoutes(assetCreation);
  registerApiFamilyRoutes(advancedTherapyManagement);
  registerApiFamilyRoutes(enablementProgram);
  registerApiFamilyRoutes(enablementMeasure);
  registerApiFamilyRoutes(namedCredential);
  registerApiFamilyRoutes(externalConnectivity);
  registerApiFamilyRoutes(externalServices);
  registerApiFamilyRoutes(enablement);
  registerApiFamilyRoutes(communityInfo);
  registerApiFamilyRoutes(eSignature);
  registerApiFamilyRoutes(clauseLibrary);
  registerApiFamilyRoutes(contentLink);
  registerApiFamilyRoutes(eriDigest);
  registerApiFamilyRoutes(peopleApi);
  registerApiFamilyRoutes(assessment);
  registerApiFamilyRoutes(externalDocApi);
  registerApiFamilyRoutes(globalization);
  registerApiFamilyRoutes(dataloading);
  registerApiFamilyRoutes(salesUserWorkingHours);
  registerApiFamilyRoutes(salesEngagementWorkspace);
  registerApiFamilyRoutes(scheduler);
  registerApiFamilyRoutes(industriesContext);
  registerApiFamilyRoutes(industriesPricing);
  registerApiFamilyRoutes(education);
  registerApiFamilyRoutes(starter);
  registerApiFamilyRoutes(automationRules);
  registerApiFamilyRoutes(fundraising);
  registerApiFamilyRoutes(fileBasedDataimport);
  registerApiFamilyRoutes(auditTrailExport);
  registerApiFamilyRoutes(cpq);
  registerApiFamilyRoutes(IndustriesDfo);
  registerApiFamilyRoutes(cdp);
  registerApiFamilyRoutes(cdpMetadata);
  registerApiFamilyRoutes(cdpQuery);
  registerApiFamilyRoutes(cdpCalculatedInsights);
  registerApiFamilyRoutes(cdpMachineLearning);
  registerApiFamilyRoutes(cdpCommunicationCapping);
  registerApiFamilyRoutes(insurance);
  registerApiFamilyRoutes(cdpSalesExcellence);
  registerApiFamilyRoutes(automotive);
  registerApiFamilyRoutes(docgen);
  registerApiFamilyRoutes(materialityAssessment);
  registerApiFamilyRoutes(instantPricing);
  registerApiFamilyRoutes(einstein);
  registerApiFamilyRoutes(nextGenSalesAgreementPrice);
  registerApiFamilyRoutes(commerceStoreManagement);
  registerApiFamilyRoutes(commerceCatalogManagement);
  registerApiFamilyRoutes(serviceCatalogCategory);
  registerApiFamilyRoutes(serviceSlack);
  registerApiFamilyRoutes(reminder);
  registerApiFamilyRoutes(pathassistant);
  registerApiFamilyRoutes(ai4m);
  registerApiFamilyRoutes(contentTaxonomy);
  registerApiFamilyRoutes(energyUtilities);
  registerApiFamilyRoutes(updateSalesAgreement);
  registerApiFamilyRoutes(knowledge);
  registerApiFamilyRoutes(conversationRuntimeProxy);
  registerApiFamilyRoutes(commerceGoalsRecs);
  registerApiFamilyRoutes(sharingFamily);
  registerApiFamilyRoutes(mfgProgramTemplatesList);
  registerApiFamilyRoutes(mfgProgramTemplate);
  registerApiFamilyRoutes(manufacturing);
  registerApiFamilyRoutes(mfgProductServiceCampaign);
  registerApiFamilyRoutes(workOrderForProductServiceCampaignItem);
  registerApiFamilyRoutes(workOrderEtimationPriceItem);
  registerApiFamilyRoutes(appointmentScheduling);
  registerApiFamilyRoutes(omnidesigner);
  registerApiFamilyRoutes(salesforceJourney);
  registerApiFamilyRoutes(personalizationService);
  registerApiFamilyRoutes(industriesRecordAggregation);
  registerApiFamilyRoutes(integrationFulfillment);
  registerApiFamilyRoutes(unifiedAnalytics);
  registerApiFamilyRoutes(evfSdk);
  registerApiFamilyRoutes(stageManagement);
  registerApiFamilyRoutes(semanticEngine);
  registerApiFamilyRoutes(semanticAuthoring);
  registerApiFamilyRoutes(payments);
  registerApiFamilyRoutes(gdfDch);
  registerApiFamilyRoutes(milestones);
  registerApiFamilyRoutes(engagement);
  registerApiFamilyRoutes(serviceEmployee);
  registerApiFamilyRoutes(channelRevenueManagement);
  registerApiFamilyRoutes(learning);
  registerApiFamilyRoutes(appFramework);
  registerApiFamilyRoutes(aiAutofill);
  registerApiFamilyRoutes(salesTransactionContexts);
  registerApiFamilyRoutes(salesEinsteinCoach);
  registerApiFamilyRoutes(amendRenewCancelAssets);
  registerApiFamilyRoutes(constraints);
  registerApiFamilyRoutes(sfDrive);
  const UI_API_BASE_URI$1 = `${BASE_URI}/ui-api`;
  const ACTION_CONFIG = {
    background: false,
    hotspot: true,
    longRunning: false
  };
  const actionConfig = {
    action: ACTION_CONFIG
  };

  /** Invoke executeAggregateUi Aura controller.  This is only to be used with large getRecord requests that
   *  would otherwise cause a query length exception.
   */
  function dispatchSplitRecordAggregateUiAction$1(endpoint, params, config = {}) {
    const {
      action: actionConfig
    } = config;
    return aura.executeGlobalControllerRawResponse(endpoint, params, actionConfig).then(body => {
      // stuff it into FetchResponse to be handled by lds-network-adapter
      return new AuraFetchResponse(luvioEngine.HttpStatusCode.Ok, body.getReturnValue());
    }, error => {
      let err;
      // TODO [W-12255544]: Expose errors to the consumers. Improve the error messages
      if (!error || !error.getError) {
        err = new Error('Failed to get error from response');
      } else {
        const actionErrors = error.getError();
        if (actionErrors.length > 0) {
          err = actionErrors[0];
        } else {
          err = new Error('Error fetching component');
        }
      }
      // Handle ConnectInJava exception shapes
      if (err.data !== undefined && err.data.statusCode !== undefined) {
        const {
          data
        } = err;
        throw new AuraFetchResponse(data.statusCode, data);
      }
      // Handle all the other kind of errors
      throw new AuraFetchResponse(luvioEngine.HttpStatusCode.ServerError, {
        error: err.message
      });
    });
  }
  exports.CrudEventType = void 0;
  (function (CrudEventType) {
    CrudEventType["CREATE"] = "create";
    CrudEventType["DELETE"] = "delete";
    CrudEventType["READ"] = "read";
    CrudEventType["READS"] = "reads";
    CrudEventType["UPDATE"] = "update";
  })(exports.CrudEventType || (exports.CrudEventType = {}));
  exports.CrudEventState = void 0;
  (function (CrudEventState) {
    CrudEventState["ERROR"] = "ERROR";
    CrudEventState["SUCCESS"] = "SUCCESS";
  })(exports.CrudEventState || (exports.CrudEventState = {}));
  const forceRecordTransactionsDisabled = ldsEnvironmentSettings.getEnvironmentSetting(ldsEnvironmentSettings.EnvironmentSettings.ForceRecordTransactionsDisabled);
  var UiApiRecordController$1;
  (function (UiApiRecordController) {
    UiApiRecordController["CreateRecord"] = "RecordUiController.createRecord";
    UiApiRecordController["DeleteRecord"] = "RecordUiController.deleteRecord";
    UiApiRecordController["ExecuteAggregateUi"] = "RecordUiController.executeAggregateUi";
    UiApiRecordController["ExecuteGraphQL"] = "RecordUiController.executeGraphQL";
    UiApiRecordController["ExecuteGraphQLBatch"] = "RecordUiController.executeBatchGraphQL";
    UiApiRecordController["GetLayout"] = "RecordUiController.getLayout";
    UiApiRecordController["GetLayoutUserState"] = "RecordUiController.getLayoutUserState";
    UiApiRecordController["GetRecordAvatars"] = "RecordUiController.getRecordAvatars";
    UiApiRecordController["GetRecordTemplateClone"] = "RecordUiController.getRecordDefaultsTemplateClone";
    UiApiRecordController["GetRecordTemplateCreate"] = "RecordUiController.getRecordDefaultsTemplateForCreate";
    UiApiRecordController["GetRecordCreateDefaults"] = "RecordUiController.getRecordCreateDefaults";
    UiApiRecordController["GetRecordUi"] = "RecordUiController.getRecordUis";
    UiApiRecordController["GetRecordWithFields"] = "RecordUiController.getRecordWithFields";
    UiApiRecordController["GetRecordsWithFields"] = "RecordUiController.getRecordsWithFields";
    UiApiRecordController["GetRecordWithLayouts"] = "RecordUiController.getRecordWithLayouts";
    UiApiRecordController["GetObjectInfo"] = "RecordUiController.getObjectInfo";
    UiApiRecordController["GetObjectInfos"] = "RecordUiController.getObjectInfos";
    UiApiRecordController["GetPicklistValues"] = "RecordUiController.getPicklistValues";
    UiApiRecordController["GetPicklistValuesByRecordType"] = "RecordUiController.getPicklistValuesByRecordType";
    UiApiRecordController["UpdateRecord"] = "RecordUiController.updateRecord";
    UiApiRecordController["UpdateRecordAvatar"] = "RecordUiController.postRecordAvatarAssociation";
    UiApiRecordController["UpdateLayoutUserState"] = "RecordUiController.updateLayoutUserState";
    UiApiRecordController["GetDuplicateConfiguration"] = "RecordUiController.getDuplicateConfig";
    UiApiRecordController["GetDuplicates"] = "RecordUiController.findDuplicates";
    UiApiRecordController["ExecuteBatchRecordOperations"] = "RecordUiController.executeBatchRecordOperations";
    UiApiRecordController["GetPathLayout"] = "RecordUiController.getPathLayout";
  })(UiApiRecordController$1 || (UiApiRecordController$1 = {}));
  const UIAPI_GET_LAYOUT = `${UI_API_BASE_URI$1}/layout/`;
  const UIAPI_AGGREGATE_UI_PATH = `${UI_API_BASE_URI$1}/aggregate-ui`;
  const UIAPI_RECORDS_PATH$1 = `${UI_API_BASE_URI$1}/records`;
  const UIAPI_RECORDS_BATCH_PATH$1 = `${UI_API_BASE_URI$1}/records/batch`;
  const UIAPI_RECORD_AVATARS_BASE = `${UI_API_BASE_URI$1}/record-avatars/`;
  const UIAPI_RECORD_AVATARS_BATCH_PATH = `${UI_API_BASE_URI$1}/record-avatars/batch/`;
  const UIAPI_RECORD_AVATAR_UPDATE = `/association`;
  const UIAPI_RECORD_TEMPLATE_CLONE_PATH = `${UI_API_BASE_URI$1}/record-defaults/template/clone/`;
  const UIAPI_RECORD_TEMPLATE_CREATE_PATH = `${UI_API_BASE_URI$1}/record-defaults/template/create/`;
  const UIAPI_RECORD_CREATE_DEFAULTS_PATH = `${UI_API_BASE_URI$1}/record-defaults/create/`;
  const UIAPI_RECORD_UI_PATH = `${UI_API_BASE_URI$1}/record-ui/`;
  const UIAPI_GET_LAYOUT_USER_STATE = '/user-state';
  const UIAPI_OBJECT_INFO_PATH = `${UI_API_BASE_URI$1}/object-info/`;
  const UIAPI_OBJECT_INFO_BATCH_PATH = `${UI_API_BASE_URI$1}/object-info/batch/`;
  const UIAPI_DUPLICATE_CONFIGURATION_PATH = `${UI_API_BASE_URI$1}/duplicates/`;
  const UIAPI_DUPLICATES_PATH = `${UI_API_BASE_URI$1}/predupe`;
  const UIAPI_GRAPHQL_PATH = `${BASE_URI}/graphql`;
  const UIAPI_GRAPHQL_BATCH_PATH = `${BASE_URI}/graphql/batch`;
  const UIAPI_GET_PATH_LAYOUT = `${UI_API_BASE_URI$1}/path/layout/`;
  const NO_RECORD_ID_204 = '204_NO_RECORD_ID';
  const NO_RECORD_TYPE_204 = '204_NO_RECORD_TYPE';
  let crudInstrumentationCallbacks$1 = null;
  if (forceRecordTransactionsDisabled === false) {
    crudInstrumentationCallbacks$1 = {
      createRecordRejectFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.CREATE, {
          recordId: config.params.recordInput.apiName,
          state: exports.CrudEventState.ERROR
        });
      },
      createRecordResolveFunction: config => {
        const recordId = config.body ? config.body.id : NO_RECORD_ID_204;
        const recordType = config.body ? config.body.apiName : NO_RECORD_TYPE_204;
        instrumentation$1.logCrud(exports.CrudEventType.CREATE, {
          recordId,
          recordType,
          state: exports.CrudEventState.SUCCESS
        });
      },
      deleteRecordRejectFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.DELETE, {
          recordId: config.params.recordId,
          state: exports.CrudEventState.ERROR
        });
      },
      deleteRecordResolveFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.DELETE, {
          recordId: config.params.recordId,
          state: exports.CrudEventState.SUCCESS
        });
      },
      getRecordAggregateRejectFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.READ, {
          recordId: config.params.recordId,
          state: exports.CrudEventState.ERROR
        });
      },
      getRecordAggregateResolveFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.READ, {
          recordId: config.params.recordId,
          recordType: config.body.apiName,
          state: exports.CrudEventState.SUCCESS
        });
      },
      getRecordRejectFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.READ, {
          recordId: config.params.recordId,
          state: exports.CrudEventState.ERROR
        });
      },
      getRecordResolveFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.READ, {
          recordId: config.params.recordId,
          recordType: config.body.apiName,
          state: exports.CrudEventState.SUCCESS
        });
      },
      updateRecordRejectFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.UPDATE, {
          recordId: config.params.recordId,
          state: exports.CrudEventState.ERROR
        });
      },
      updateRecordResolveFunction: config => {
        const recordType = config.body ? config.body.apiName : NO_RECORD_TYPE_204;
        instrumentation$1.logCrud(exports.CrudEventType.UPDATE, {
          recordId: config.params.recordId,
          recordType,
          state: exports.CrudEventState.SUCCESS
        });
      }
    };
  }
  const objectInfoStorage = ldsStorage.createStorage({
    name: 'ldsObjectInfo',
    expiration: 15 * 60 // 15 minutes, TODO [W-6900122]:  Make it sync with RAML definition
  });
  const objectInfoStorageStatsLogger = registerLdsCacheStats('getObjectInfo:storage');
  const layoutStorage = ldsStorage.createStorage({
    name: 'ldsLayout',
    expiration: 15 * 60 // 15 minutes, TODO [W-6900122]:  Make it sync with RAML definition
  });
  const layoutStorageStatsLogger = registerLdsCacheStats('getLayout:storage');
  const layoutUserStateStorage = ldsStorage.createStorage({
    name: 'ldsLayoutUserState',
    expiration: 15 * 60 // 15 minutes, TODO [W-6900122]: Make it sync with RAML definition
  });
  const layoutUserStateStorageStatsLogger = registerLdsCacheStats('getLayoutUserState:storage');
  function getObjectInfo(resourceRequest, resourceRequestContext, cacheKey) {
    const params = buildUiApiParams({
      objectApiName: resourceRequest.urlParams.objectApiName
    }, resourceRequest);
    const config = {
      ...actionConfig
    };
    if (objectInfoStorage !== null) {
      config.cache = {
        storage: objectInfoStorage,
        key: cacheKey,
        statsLogger: objectInfoStorageStatsLogger,
        forceRefresh: shouldForceRefresh(resourceRequest)
      };
    }
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, config);
    return dispatchAction(UiApiRecordController$1.GetObjectInfo, params, enrichedConfig);
  }
  function getObjectInfos(resourceRequest, resourceRequestContext, cacheKey) {
    const params = buildUiApiParams({
      objectApiNames: resourceRequest.urlParams.objectApiNames
    }, resourceRequest);
    const config = {
      ...actionConfig
    };
    if (objectInfoStorage !== null) {
      config.cache = {
        storage: objectInfoStorage,
        key: cacheKey,
        statsLogger: objectInfoStorageStatsLogger,
        forceRefresh: shouldForceRefresh(resourceRequest)
      };
    }
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, config);
    return dispatchAction(UiApiRecordController$1.GetObjectInfos, params, enrichedConfig);
  }
  function executeAggregateUi(resourceRequest, resourceRequestContext) {
    const aggregateUiParams = {
      input: resourceRequest.body
    };
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchSplitRecordAggregateUiAction$1(UiApiRecordController$1.ExecuteAggregateUi, aggregateUiParams, enrichedConfig);
  }
  function getRecord(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const {
      recordId
    } = urlParams;
    const {
      fields,
      layoutTypes,
      modes,
      optionalFields
    } = queryParams;
    let getRecordParams = {};
    let controller;
    if (layoutTypes !== undefined) {
      getRecordParams = {
        recordId,
        layoutTypes,
        modes,
        optionalFields
      };
      controller = UiApiRecordController$1.GetRecordWithLayouts;
    } else {
      getRecordParams = {
        recordId,
        fields,
        optionalFields
      };
      controller = UiApiRecordController$1.GetRecordWithFields;
    }
    const params = buildUiApiParams(getRecordParams, resourceRequest);
    const instrumentationCallbacks = crudInstrumentationCallbacks$1 !== null ? {
      rejectFn: crudInstrumentationCallbacks$1.getRecordRejectFunction,
      resolveFn: crudInstrumentationCallbacks$1.getRecordResolveFunction
    } : {};
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(controller, params, enrichedConfig, instrumentationCallbacks);
  }
  function getRecords(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const {
      recordIds
    } = urlParams;
    const {
      fields,
      optionalFields
    } = queryParams;
    // Note: in getRecords batch case, we don't use the aggregate UI hack.
    const getRecordsParams = {
      recordIds,
      fields,
      optionalFields
    };
    const params = buildUiApiParams(getRecordsParams, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetRecordsWithFields, params, enrichedConfig);
  }
  function createRecord(resourceRequest, resourceRequestContext) {
    const {
      body,
      queryParams: {
        useDefaultRule,
        triggerUserEmail,
        triggerOtherEmail,
        handleOwnerChange
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      useDefaultRule,
      triggerOtherEmail,
      triggerUserEmail,
      handleOwnerChange,
      recordInput: body
    }, resourceRequest);
    const instrumentationCallbacks = crudInstrumentationCallbacks$1 !== null ? {
      rejectFn: crudInstrumentationCallbacks$1.createRecordRejectFunction,
      resolveFn: crudInstrumentationCallbacks$1.createRecordResolveFunction
    } : {};
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.CreateRecord, params, enrichedConfig, instrumentationCallbacks).then(okResponse => {
      if (handleOwnerChange && okResponse.body === null) {
        return new AuraFetchResponse(luvioEngine.HttpStatusCode.NoContent, undefined);
      }
      return okResponse;
    });
  }
  function deleteRecord(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      recordId: urlParams.recordId
    }, resourceRequest);
    const instrumentationCallbacks = crudInstrumentationCallbacks$1 !== null ? {
      rejectFn: crudInstrumentationCallbacks$1.deleteRecordRejectFunction,
      resolveFn: crudInstrumentationCallbacks$1.deleteRecordResolveFunction
    } : {};
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.DeleteRecord, params, enrichedConfig, instrumentationCallbacks);
  }
  function updateRecord(resourceRequest, resourceRequestContext) {
    const {
      body,
      urlParams,
      queryParams: {
        useDefaultRule,
        triggerUserEmail,
        triggerOtherEmail,
        handleOwnerChange
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      useDefaultRule,
      triggerOtherEmail,
      triggerUserEmail,
      handleOwnerChange,
      recordId: urlParams.recordId,
      recordInput: body
    }, resourceRequest);
    const instrumentationCallbacks = crudInstrumentationCallbacks$1 !== null ? {
      rejectFn: crudInstrumentationCallbacks$1.updateRecordRejectFunction,
      resolveFn: crudInstrumentationCallbacks$1.updateRecordResolveFunction
    } : {};
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.UpdateRecord, params, enrichedConfig, instrumentationCallbacks).then(okResponse => {
      if (handleOwnerChange && okResponse.body === null) {
        return new AuraFetchResponse(luvioEngine.HttpStatusCode.NoContent, undefined);
      }
      return okResponse;
    });
  }
  function updateLayoutUserState(resourceRequest, resourceRequestContext) {
    const {
      body,
      urlParams: {
        objectApiName
      },
      queryParams: {
        layoutType,
        mode,
        recordTypeId
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      layoutType,
      mode,
      recordTypeId,
      userState: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.UpdateLayoutUserState, params, enrichedConfig).then(response => {
      // eslint-disable-next-line @salesforce/lds/no-invalid-todo
      // TODO: Instead of surgically evicting the record that has been updated in the cache we
      // currently dump all the entries. We need a way to recreate the same cache key between
      // getLayoutUserState and updateLayoutUserState.
      if (layoutUserStateStorage !== null) {
        layoutUserStateStorage.clear().catch(() => {}); // intentional noop on error
      }
      return response;
    });
  }
  function getRecordAvatars(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const recordIds = urlParams.recordIds;
    const params = buildUiApiParams({
      recordIds
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetRecordAvatars, params, enrichedConfig);
  }
  function updateRecordAvatar(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      input: body,
      recordId: urlParams.recordId
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.UpdateRecordAvatar, params, enrichedConfig);
  }
  function getRecordUi(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordIds
      },
      queryParams: {
        layoutTypes,
        modes,
        optionalFields
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      layoutTypes,
      modes,
      optionalFields,
      recordIds
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetRecordUi, params, enrichedConfig);
  }
  function getPicklistValues(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName: urlParams.objectApiName,
      recordTypeId: urlParams.recordTypeId,
      fieldApiName: urlParams.fieldApiName
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetPicklistValues, params, enrichedConfig);
  }
  function getPicklistValuesByRecordType(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName,
        recordTypeId
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      recordTypeId
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetPicklistValuesByRecordType, params, enrichedConfig);
  }
  function getLayout(resourceRequest, resourceRequestContext, cacheKey) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        layoutType,
        mode,
        recordTypeId
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      layoutType,
      mode,
      recordTypeId
    }, resourceRequest);
    const config = {
      ...actionConfig
    };
    if (layoutStorage !== null) {
      config.cache = {
        storage: layoutStorage,
        key: cacheKey,
        statsLogger: layoutStorageStatsLogger,
        forceRefresh: shouldForceRefresh(resourceRequest)
      };
    }
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, config);
    return dispatchAction(UiApiRecordController$1.GetLayout, params, enrichedConfig);
  }
  function getLayoutUserState(resourceRequest, resourceRequestContext, cacheKey) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        layoutType,
        mode,
        recordTypeId
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      layoutType,
      mode,
      recordTypeId
    }, resourceRequest);
    const config = {
      ...actionConfig
    };
    if (layoutUserStateStorage !== null) {
      config.cache = {
        storage: layoutUserStateStorage,
        key: cacheKey,
        statsLogger: layoutUserStateStorageStatsLogger,
        forceRefresh: shouldForceRefresh(resourceRequest)
      };
    }
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, config);
    return dispatchAction(UiApiRecordController$1.GetLayoutUserState, params, enrichedConfig);
  }
  function getRecordTemplateClone(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordId
      },
      queryParams: {
        optionalFields,
        recordTypeId
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      recordId,
      recordTypeId,
      optionalFields
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetRecordTemplateClone, params, enrichedConfig);
  }
  function getRecordTemplateCreate(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        optionalFields,
        recordTypeId
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      recordTypeId,
      optionalFields
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetRecordTemplateCreate, params, enrichedConfig);
  }
  function getRecordCreateDefaults(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        formFactor,
        optionalFields,
        recordTypeId
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      formFactor,
      recordTypeId,
      optionalFields
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetRecordCreateDefaults, params, enrichedConfig);
  }
  function getDuplicateConfiguration(resourceRequest, resourceRequestContext) {
    const params = buildUiApiParams({
      objectApiName: resourceRequest.urlParams.objectApiName,
      recordTypeId: resourceRequest.queryParams.recordTypeId
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetDuplicateConfiguration, params, enrichedConfig);
  }
  function getDuplicates(resourceRequest, resourceRequestContext) {
    const {
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      recordInput: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiRecordController$1.GetDuplicates, params, enrichedConfig);
  }
  function executeGraphQL(resourceRequest, resourceRequestContext) {
    const controller = UiApiRecordController$1.ExecuteGraphQL;
    // The endpoint uses a strange queryInput object wrapper around the parameters.
    const params = buildUiApiParams({
      queryInput: resourceRequest.body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(controller, params, enrichedConfig);
  }
  function executeGraphQLBatch(resourceRequest, resourceRequestContext) {
    const controller = UiApiRecordController$1.ExecuteGraphQLBatch;
    const params = buildUiApiParams({
      batchQueryInput: resourceRequest.body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(controller, params, enrichedConfig);
  }
  function executeBatchRecordOperations(resourceRequest, resourceRequestContext) {
    const controller = UiApiRecordController$1.ExecuteBatchRecordOperations;
    const params = buildUiApiParams({
      recordInput: resourceRequest.body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(controller, params, enrichedConfig);
  }
  function getPathLayout(resourceRequest, resourceRequestContext, cacheKey) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        recordTypeId,
        layoutOverride,
        mode
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      recordTypeId,
      layoutOverride,
      mode
    }, resourceRequest);
    const config = {
      ...actionConfig
    };
    if (layoutStorage !== null) {
      config.cache = {
        storage: layoutStorage,
        key: cacheKey,
        statsLogger: layoutStorageStatsLogger,
        forceRefresh: shouldForceRefresh(resourceRequest)
      };
    }
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, config);
    return dispatchAction(UiApiRecordController$1.GetPathLayout, params, enrichedConfig);
  }
  router.delete(path => path.startsWith(UIAPI_RECORDS_PATH$1), deleteRecord);
  router.patch(path => path.startsWith(UIAPI_RECORDS_PATH$1), updateRecord);
  router.patch(path => path.startsWith(UIAPI_GET_LAYOUT) && path.endsWith(UIAPI_GET_LAYOUT_USER_STATE), updateLayoutUserState);
  router.post(path => path === UIAPI_RECORDS_PATH$1, createRecord);
  router.post(path => path.startsWith(UIAPI_RECORD_AVATARS_BASE) && path.endsWith(UIAPI_RECORD_AVATAR_UPDATE), updateRecordAvatar);
  router.get(path => path.startsWith(UIAPI_GET_LAYOUT) && path.endsWith(UIAPI_GET_LAYOUT_USER_STATE), getLayoutUserState);
  router.get(path => path.startsWith(UIAPI_GET_LAYOUT) && path.endsWith(UIAPI_GET_LAYOUT_USER_STATE) === false, getLayout);
  // object-info/batch/
  router.get(path => path.startsWith(UIAPI_OBJECT_INFO_BATCH_PATH), getObjectInfos);
  // object-info/API_NAME/picklist-values/RECORD_TYPE_ID/FIELD_API_NAME
  router.get(path => path.startsWith(UIAPI_OBJECT_INFO_PATH) && /picklist-values\/[a-zA-Z\d]+\/[a-zA-Z\d]+/.test(path), getPicklistValues);
  // object-info/API_NAME/picklist-values/RECORD_TYPE_ID
  router.get(path => path.startsWith(UIAPI_OBJECT_INFO_PATH) && /picklist-values\/[a-zA-Z\d]+/.test(path), getPicklistValuesByRecordType);
  router.get(path => path.startsWith(UIAPI_OBJECT_INFO_PATH) && path.startsWith(UIAPI_OBJECT_INFO_BATCH_PATH) === false && /picklist-values\/[a-zA-Z\d]+\/[a-zA-Z\d]+/.test(path) === false && /picklist-values\/[a-zA-Z\d]+/.test(path) === false, getObjectInfo);
  router.post(path => path.startsWith(UIAPI_AGGREGATE_UI_PATH), executeAggregateUi);
  router.post(path => path === UIAPI_RECORDS_BATCH_PATH$1, executeBatchRecordOperations);
  router.get(path => path.startsWith(UIAPI_RECORDS_BATCH_PATH$1), getRecords); // Must be registered before getRecord since they both begin with /records.
  router.get(path => path.startsWith(UIAPI_RECORDS_PATH$1), getRecord);
  router.get(path => path.startsWith(UIAPI_RECORD_TEMPLATE_CLONE_PATH), getRecordTemplateClone);
  router.get(path => path.startsWith(UIAPI_RECORD_TEMPLATE_CREATE_PATH), getRecordTemplateCreate);
  router.get(path => path.startsWith(UIAPI_RECORD_CREATE_DEFAULTS_PATH), getRecordCreateDefaults);
  router.get(path => path.startsWith(UIAPI_RECORD_AVATARS_BATCH_PATH), getRecordAvatars);
  router.get(path => path.startsWith(UIAPI_RECORD_UI_PATH), getRecordUi);
  router.get(path => path.startsWith(UIAPI_DUPLICATE_CONFIGURATION_PATH), getDuplicateConfiguration);
  router.post(path => path.startsWith(UIAPI_DUPLICATES_PATH), getDuplicates);
  router.post(path => path === UIAPI_GRAPHQL_PATH, executeGraphQL);
  router.post(path => path === UIAPI_GRAPHQL_BATCH_PATH, executeGraphQLBatch);
  router.get(path => path.startsWith(UIAPI_GET_PATH_LAYOUT), getPathLayout);
  var UiApiActionsController;
  (function (UiApiActionsController) {
    UiApiActionsController["GetLookupActions"] = "ActionsController.getLookupActions";
    UiApiActionsController["GetRecordActions"] = "ActionsController.getRecordActions";
    UiApiActionsController["GetRecordEditActions"] = "ActionsController.getRecordEditActions";
    UiApiActionsController["GetObjectCreateActions"] = "ActionsController.getObjectCreateActions";
    UiApiActionsController["PostRelatedListActions"] = "ActionsController.postRelatedListActions";
    UiApiActionsController["GetRelatedListsActions"] = "ActionsController.getRelatedListsActions";
    UiApiActionsController["GetRelatedListRecordActions"] = "ActionsController.getRelatedListRecordActions";
    UiApiActionsController["GetGlobalActions"] = "ActionsController.getGlobalActions";
    UiApiActionsController["GetQuickActionDefaults"] = "ActionsController.getQuickActionDefaults";
    UiApiActionsController["GetQuickActionInfo"] = "ActionsController.getQuickActionInfo";
    UiApiActionsController["GetActionOverrides"] = "ActionsController.getActionOverrides";
    UiApiActionsController["PerformQuickAction"] = "ActionsController.performQuickAction";
    UiApiActionsController["PerformUpdateRecordQuickAction"] = "ActionsController.performUpdateRecordQuickAction";
    UiApiActionsController["PostRelatedListsActions"] = "ActionsController.postRelatedListsActions";
    UiApiActionsController["GetQuickActionLayout"] = "ActionsController.getActionLayout";
    UiApiActionsController["GetFlexipageFormulaOverrides"] = "ActionsController.getFlexipageFormulaOverrides";
  })(UiApiActionsController || (UiApiActionsController = {}));
  const UIAPI_ACTIONS_LOOKUP_PATH = `${UI_API_BASE_URI$1}/actions/lookup/`;
  const UIAPI_ACTIONS_RECORD_PATH = `${UI_API_BASE_URI$1}/actions/record/`;
  const UIAPI_ACTIONS_GLOBAL_PATH = `${UI_API_BASE_URI$1}/actions/global`;
  const UIAPI_ACTIONS_OBJECT_PATH = `${UI_API_BASE_URI$1}/actions/object/`;
  const UIAPI_ACTIONS_RECORD_EDIT = '/record-edit';
  const UIAPI_ACTIONS_RELATED_LIST = '/related-list/';
  const UIAPI_ACTIONS_OBJECT_CREATE = '/record-create';
  const UIAPI_ACTIONS_RELATED_LIST_BATCH = '/related-list/batch';
  const UIAPI_ACTIONS_RELATED_LIST_RECORD = '/related-list-record/';
  const UIAPI_ACTIONS_QUICKACTION_DEFAULTS_PATH = `${UI_API_BASE_URI$1}/actions/record-defaults/`;
  const UIAPI_ACTIONS_QUICKACTION_INFO_PATH = `${UI_API_BASE_URI$1}/actions/quick-action-info/`;
  const UIAPI_ACTIONS_ACTIONOVERRIDES_PATH = `${UI_API_BASE_URI$1}/actions/overrides/`;
  const UIAPI_ACTIONS_PERFORM_QUICK_ACTION_PATH = `${UI_API_BASE_URI$1}/actions/perform-quick-action/`;
  const UIAPI_ACTIONS_LAYOUT_PATH = `${UI_API_BASE_URI$1}/actions/layout/`;
  const UIAPI_ACTIONS_FLEXIPAGE_FORMULA_OVERRIDES_PATH = `${UI_API_BASE_URI$1}/actions/formula-activation/`;
  function getLookupActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiNames
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      objectApiNames,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetLookupActions, parameters, enrichedConfig);
  }
  function getRecordActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordIds
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      recordIds,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetRecordActions, parameters, enrichedConfig);
  }
  function getRecordEditActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordIds
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      recordIds,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetRecordEditActions, parameters, enrichedConfig);
  }
  function postRelatedListActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordIds,
        relatedListId
      },
      body
    } = resourceRequest;
    const parameters = buildUiApiParams({
      recordIds,
      relatedListId,
      listRecordActionsQuery: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.PostRelatedListActions, parameters, enrichedConfig);
  }
  function postRelatedListsActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordIds
      },
      body
    } = resourceRequest;
    const parameters = buildUiApiParams({
      recordIds,
      listRecordActionsQuery: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.PostRelatedListsActions, parameters, enrichedConfig);
  }
  function getRelatedListsActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordIds,
        relatedListIds
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      recordIds,
      relatedListIds,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetRelatedListsActions, parameters, enrichedConfig);
  }
  function getRelatedListRecordActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        recordIds,
        relatedListRecordIds
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      recordIds,
      relatedListRecordIds,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetRelatedListRecordActions, parameters, enrichedConfig);
  }
  function getObjectCreateActions(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      objectApiName,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetObjectCreateActions, parameters, enrichedConfig);
  }
  function getGlobalActions(resourceRequest, resourceRequestContext) {
    const {
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetGlobalActions, parameters, enrichedConfig);
  }
  function getActionOverrides(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      objectApiName,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetActionOverrides, parameters, enrichedConfig);
  }
  function getQuickActionDefaults(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        actionApiName
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      actionApiName,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetQuickActionDefaults, parameters, enrichedConfig);
  }
  function getQuickActionInfo(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        actionApiName
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      actionApiName,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetQuickActionInfo, parameters, enrichedConfig);
  }
  function performUpdateRecordQuickAction(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        actionApiName
      },
      body
    } = resourceRequest;
    const parameters = buildUiApiParams({
      actionApiName,
      performQuickActionInput: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.PerformUpdateRecordQuickAction, parameters, enrichedConfig);
  }
  function performQuickAction(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        actionApiName
      },
      body
    } = resourceRequest;
    const parameters = buildUiApiParams({
      actionApiName,
      performQuickActionInput: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.PerformQuickAction, parameters, enrichedConfig);
  }
  function getActionLayout(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        actionApiName
      }
    } = resourceRequest;
    const parameters = buildUiApiParams({
      actionApiName
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetQuickActionLayout, parameters, enrichedConfig);
  }
  function getFlexipageFormulaOverrides(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        actionFeature
      },
      queryParams
    } = resourceRequest;
    const parameters = buildUiApiParams({
      actionFeature,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiActionsController.GetFlexipageFormulaOverrides, parameters, enrichedConfig);
  }
  router.get(path => path.startsWith(UIAPI_ACTIONS_LOOKUP_PATH), getLookupActions);
  router.get(path => path.startsWith(UIAPI_ACTIONS_RECORD_PATH) && path.endsWith(UIAPI_ACTIONS_RECORD_EDIT), getRecordEditActions);
  router.get(path => path.startsWith(UIAPI_ACTIONS_RECORD_PATH) && path.indexOf(UIAPI_ACTIONS_RELATED_LIST_RECORD) > 0, getRelatedListRecordActions);
  router.post(path => path.startsWith(UIAPI_ACTIONS_RECORD_PATH) && path.indexOf(UIAPI_ACTIONS_RELATED_LIST) > 0 && path.indexOf(UIAPI_ACTIONS_RELATED_LIST_BATCH) === -1, postRelatedListActions);
  router.post(path => path.startsWith(UIAPI_ACTIONS_RECORD_PATH) && path.indexOf(UIAPI_ACTIONS_RELATED_LIST_BATCH) > 0, postRelatedListsActions);
  router.get(path => path.startsWith(UIAPI_ACTIONS_RECORD_PATH) && path.indexOf(UIAPI_ACTIONS_RELATED_LIST_BATCH) > 0, getRelatedListsActions);
  router.get(path => path.startsWith(UIAPI_ACTIONS_RECORD_PATH) && path.indexOf(UIAPI_ACTIONS_RELATED_LIST) === -1 && path.indexOf(UIAPI_ACTIONS_RELATED_LIST_RECORD) === -1 && !path.endsWith(UIAPI_ACTIONS_RECORD_EDIT), getRecordActions);
  router.get(path => path.startsWith(UIAPI_ACTIONS_OBJECT_PATH) && path.indexOf(UIAPI_ACTIONS_OBJECT_CREATE) > 0, getObjectCreateActions);
  router.get(path => path.startsWith(UIAPI_ACTIONS_GLOBAL_PATH), getGlobalActions);
  router.get(path => path.startsWith(UIAPI_ACTIONS_QUICKACTION_DEFAULTS_PATH), getQuickActionDefaults);
  router.get(path => path.startsWith(UIAPI_ACTIONS_QUICKACTION_INFO_PATH), getQuickActionInfo);
  router.get(path => path.startsWith(UIAPI_ACTIONS_ACTIONOVERRIDES_PATH), getActionOverrides);
  router.patch(path => path.startsWith(UIAPI_ACTIONS_PERFORM_QUICK_ACTION_PATH), performUpdateRecordQuickAction);
  router.post(path => path.startsWith(UIAPI_ACTIONS_PERFORM_QUICK_ACTION_PATH), performQuickAction);
  router.get(path => path.startsWith(UIAPI_ACTIONS_LAYOUT_PATH), getActionLayout);
  router.get(path => path.startsWith(UIAPI_ACTIONS_FLEXIPAGE_FORMULA_OVERRIDES_PATH), getFlexipageFormulaOverrides);
  var UiApiListsController;
  (function (UiApiListsController) {
    UiApiListsController["GetListsByObjectName"] = "ListUiController.getListsByObjectName";
    UiApiListsController["GetListUiById"] = "ListUiController.getListUiById";
    UiApiListsController["GetListRecordsById"] = "ListUiController.getListRecordsById";
    UiApiListsController["GetListUiByName"] = "ListUiController.getListUiByName";
    UiApiListsController["GetListInfoByName"] = "ListUiController.getListInfoByName";
    UiApiListsController["GetListInfosByName"] = "ListUiController.getListInfosByName";
    UiApiListsController["PostListRecordsByName"] = "ListUiController.postListRecordsByName";
    UiApiListsController["UpdateListInfoByName"] = "ListUiController.updateListInfoByApiName";
    UiApiListsController["CreateListInfo"] = "ListUiController.createListInfo";
    UiApiListsController["GetListObjectInfo"] = "ListUiController.getListObjectInfo";
    UiApiListsController["DeleteListInfo"] = "ListUiController.deleteListInfo";
    UiApiListsController["GetListPreferences"] = "ListUiController.getListPreferences";
    UiApiListsController["UpdateListPreferences"] = "ListUiController.updateListPreferences";
    UiApiListsController["GetListInfosByObjectName"] = "ListUiController.getListInfosByObjectName";
  })(UiApiListsController || (UiApiListsController = {}));
  const UIAPI_LIST_RECORDS_PATH = `${UI_API_BASE_URI$1}/list-records/`;
  const UIAPI_LIST_UI_PATH = `${UI_API_BASE_URI$1}/list-ui/`;
  const UIAPI_LIST_INFO_PATH = `${UI_API_BASE_URI$1}/list-info/`;
  const UIAPI_LIST_INFO_BATCH_PATH = `${UIAPI_LIST_INFO_PATH}batch`;
  const UIAPI_LIST_OBJ_INFO_PATH = `${UI_API_BASE_URI$1}/list-object-info/`;
  const UIAPI_LIST_PREF_PATH = `${UI_API_BASE_URI$1}/list-preferences/`;
  function postListRecordsByName(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName,
        listViewApiName
      },
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      listViewApiName,
      listRecordsQuery: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.PostListRecordsByName, params, enrichedConfig);
  }
  function getListRecordsById(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        listViewId
      },
      queryParams: {
        fields,
        optionalFields,
        pageSize,
        pageToken,
        sortBy
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      listViewId,
      fields,
      optionalFields,
      pageSize,
      pageToken,
      sortBy
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListRecordsById, params, enrichedConfig);
  }
  function getListUiByName(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName,
        listViewApiName
      },
      queryParams: {
        fields,
        optionalFields,
        pageSize,
        pageToken,
        sortBy
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      listViewApiName,
      fields,
      optionalFields,
      pageSize,
      pageToken,
      sortBy
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListUiByName, params, enrichedConfig);
  }
  function getListUiById(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        listViewId
      },
      queryParams: {
        fields,
        optionalFields,
        pageSize,
        pageToken,
        sortBy
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      listViewId,
      fields,
      optionalFields,
      pageSize,
      pageToken,
      sortBy
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListUiById, params, enrichedConfig);
  }
  function getListInfoByName(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName,
        listViewApiName
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      listViewApiName
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListInfoByName, params, enrichedConfig);
  }
  function updateListInfoByName(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName,
        listViewApiName
      },
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName: objectApiName,
      listViewApiName: listViewApiName,
      listInfoInput: {
        filterLogicString: body.filterLogicString,
        filteredByInfo: body.filteredByInfo,
        label: body.label,
        scope: body.scope,
        visibility: body.visibility,
        displayColumns: body.displayColumns,
        listShares: body.listShares
      }
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.UpdateListInfoByName, params, enrichedConfig);
  }
  function getListInfosByObjectName(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        pageSize,
        pageToken,
        q,
        recentListsOnly
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      pageSize,
      pageToken,
      q,
      recentListsOnly
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListInfosByObjectName, params, enrichedConfig);
  }
  function getListInfosByName(resourceRequest, resourceRequestContext) {
    const {
      queryParams: {
        names
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      names
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListInfosByName, params, enrichedConfig);
  }
  function getListsByObjectName(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        pageSize,
        pageToken,
        q,
        recentListsOnly
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      pageSize,
      pageToken,
      q,
      recentListsOnly
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListsByObjectName, params, enrichedConfig);
  }
  function getListObjectInfo(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName: urlParams.objectApiName
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListObjectInfo, params, enrichedConfig);
  }
  function getListPreferences(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName: urlParams.objectApiName,
      listViewApiName: urlParams.listViewApiName
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.GetListPreferences, params, enrichedConfig);
  }
  function updateListPreferences(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName,
        listViewApiName
      },
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName: objectApiName,
      listViewApiName: listViewApiName,
      listPreferencesInput: {
        columnWidths: body.columnWidths,
        columnWrap: body.columnWrap,
        orderedBy: body.orderedBy
      }
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.UpdateListPreferences, params, enrichedConfig);
  }
  function createListInfo(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName: objectApiName,
      listInfoInput: {
        displayColumns: body.displayColumns,
        filterLogicString: body.filterLogicString,
        filteredByInfo: body.filteredByInfo,
        label: body.label,
        listViewApiName: body.listViewApiName,
        scope: body.scope,
        visibility: body.visibility,
        listShares: body.listShares
      }
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiListsController.CreateListInfo, params, enrichedConfig);
  }
  function deleteListInfo(resourceRequest) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName: urlParams.objectApiName,
      listViewApiName: urlParams.listViewApiName
    }, resourceRequest);
    return dispatchAction(UiApiListsController.DeleteListInfo, params);
  }
  // .../list-records/${objectApiName}/${listViewApiName}
  router.post(path => path.startsWith(UIAPI_LIST_RECORDS_PATH) && /list-records\/.*\//.test(path), postListRecordsByName);
  // .../list-records/${listViewId}
  router.get(path => path.startsWith(UIAPI_LIST_RECORDS_PATH) && /list-records\/.*\//.test(path) === false, getListRecordsById);
  // .../list-ui/${objectApiName}/${listViewApiName}
  router.get(path => path.startsWith(UIAPI_LIST_UI_PATH) && /list-ui\/.*\//.test(path), getListUiByName);
  // .../list-ui/${listViewId}
  router.get(path => path.startsWith(UIAPI_LIST_UI_PATH) && /00B[a-zA-Z\d]{15}$/.test(path), getListUiById);
  // .../list-ui/${objectApiName}
  router.get(path => path.startsWith(UIAPI_LIST_UI_PATH) && /list-ui\/.*\//.test(path) === false && /00B[a-zA-Z\d]{15}$/.test(path) === false, getListsByObjectName);
  // .../list-info/batch (listViewIds/listViewApiNames are passed via queryParams)
  router.get(path => path === UIAPI_LIST_INFO_BATCH_PATH, getListInfosByName);
  // .../list-info/${objectApiName}/${listViewApiName}
  router.patch(path => path.startsWith(UIAPI_LIST_INFO_PATH), updateListInfoByName);
  router.get(path => path.startsWith(UIAPI_LIST_INFO_PATH) && /list-info\/.*\//.test(path), getListInfoByName);
  router.delete(path => path.startsWith(UIAPI_LIST_INFO_PATH), deleteListInfo);
  // .../list-info/${objectApiName}
  router.post(path => path.startsWith(UIAPI_LIST_INFO_PATH), createListInfo);
  // .../list-info/${objectApiName}
  router.get(path => path.startsWith(UIAPI_LIST_INFO_PATH), getListInfosByObjectName);
  // .../list-object-info/${objectApiName}
  router.get(path => path.startsWith(UIAPI_LIST_OBJ_INFO_PATH) && /list-object-info\/.*\//.test(path) === false && /00B[a-zA-Z\d]{15}$/.test(path) === false, getListObjectInfo);
  // .../list-preferences/${objectApiName}/${listViewApiName}
  router.get(path => path.startsWith(UIAPI_LIST_PREF_PATH) && /list-preferences\/.*\//.test(path), getListPreferences);
  router.patch(path => path.startsWith(UIAPI_LIST_PREF_PATH), updateListPreferences);
  const UIAPI_LOOKUP_RECORDS = `${UI_API_BASE_URI$1}/lookups`;
  const LookupRecords = 'LookupController.lookup';
  function lookupRecords(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams,
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      ...urlParams,
      ...queryParams,
      body: Object.assign({}, body)
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(LookupRecords, params, enrichedConfig);
  }
  router.post(path => path.startsWith(UIAPI_LOOKUP_RECORDS), lookupRecords);
  var UiApiMruListsController;
  (function (UiApiMruListsController) {
    UiApiMruListsController["GetMruListUi"] = "MruListUiController.getMruListUi";
    UiApiMruListsController["GetMruListRecords"] = "MruListUiController.getMruListRecords";
  })(UiApiMruListsController || (UiApiMruListsController = {}));
  const UIAPI_MRU_LIST_RECORDS_PATH = `${UI_API_BASE_URI$1}/mru-list-records/`;
  const UIAPI_MRU_LIST_UI_PATH = `${UI_API_BASE_URI$1}/mru-list-ui/`;
  function getMruListRecords(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        fields,
        optionalFields,
        pageSize,
        pageToken,
        sortBy
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      fields,
      optionalFields,
      pageSize,
      pageToken,
      sortBy
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiMruListsController.GetMruListRecords, params, enrichedConfig);
  }
  function getMruListUi(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        objectApiName
      },
      queryParams: {
        fields,
        optionalFields,
        pageSize,
        pageToken,
        sortBy
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      objectApiName,
      fields,
      optionalFields,
      pageSize,
      pageToken,
      sortBy
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiMruListsController.GetMruListUi, params, enrichedConfig);
  }
  router.get(path => path.startsWith(UIAPI_MRU_LIST_RECORDS_PATH), getMruListRecords);
  router.get(path => path.startsWith(UIAPI_MRU_LIST_UI_PATH), getMruListUi);
  var UiApiRecordController;
  (function (UiApiRecordController) {
    UiApiRecordController["GetRelatedListInfo"] = "RelatedListUiController.getRelatedListInfoByApiName";
    UiApiRecordController["UpdateRelatedListInfo"] = "RelatedListUiController.updateRelatedListInfoByApiName";
    UiApiRecordController["GetRelatedListsInfo"] = "RelatedListUiController.getRelatedListInfoCollection";
    UiApiRecordController["PostRelatedListRecords"] = "RelatedListUiController.postRelatedListRecords";
    UiApiRecordController["GetRelatedListCount"] = "RelatedListUiController.getRelatedListRecordCount";
    UiApiRecordController["GetRelatedListCounts"] = "RelatedListUiController.getRelatedListsRecordCount";
    UiApiRecordController["GetRelatedListInfoBatch"] = "RelatedListUiController.getRelatedListInfoBatch";
    UiApiRecordController["GetRelatedListPreferences"] = "RelatedListUiController.getRelatedListPreferences";
    UiApiRecordController["UpdateRelatedListPreferences"] = "RelatedListUiController.updateRelatedListPreferences";
    UiApiRecordController["GetRelatedListPreferencesBatch"] = "RelatedListUiController.getRelatedListPreferencesBatch";
    UiApiRecordController["PostRelatedListRecordsBatch"] = "RelatedListUiController.postRelatedListRecordsBatch";
  })(UiApiRecordController || (UiApiRecordController = {}));
  const UIAPI_RELATED_LIST_INFO_PATH = `${UI_API_BASE_URI$1}/related-list-info`;
  const UIAPI_RELATED_LIST_INFO_BATCH_PATH = `${UI_API_BASE_URI$1}/related-list-info/batch`;
  const UIAPI_RELATED_LIST_RECORDS_PATH = `${UI_API_BASE_URI$1}/related-list-records`;
  const UIAPI_RELATED_LIST_RECORDS_BATCH_PATH = `${UI_API_BASE_URI$1}/related-list-records/batch`;
  const UIAPI_RELATED_LIST_COUNT_PATH = `${UI_API_BASE_URI$1}/related-list-count`;
  const UIAPI_RELATED_LIST_PREFERENCES_PATH = `${UI_API_BASE_URI$1}/related-list-preferences`;
  const UIAPI_RELATED_LIST_PREFERENCES_BATCH_PATH = `${UI_API_BASE_URI$1}/related-list-preferences/batch`;
  let crudInstrumentationCallbacks = null;
  if (forceRecordTransactionsDisabled === false) {
    crudInstrumentationCallbacks = {
      getRelatedListRecordsRejectFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.READS, {
          parentRecordId: config.params.parentRecordId,
          relatedListId: config.params.relatedListId,
          state: exports.CrudEventState.ERROR
        });
      },
      getRelatedListRecordsResolveFunction: config => {
        logGetRelatedListRecordsInteraction(config.body);
      },
      getRelatedListRecordsBatchRejectFunction: config => {
        instrumentation$1.logCrud(exports.CrudEventType.READS, {
          parentRecordId: config.params.parentRecordId,
          relatedListIds: config.params.listRecordsQuery.relatedListParameters.map(entry => entry.relatedListId),
          state: exports.CrudEventState.ERROR
        });
      },
      getRelatedListRecordsBatchResolveFunction: config => {
        config.body.results.forEach(res => {
          // Log for each RL that was returned from batch endpoint
          if (res.statusCode === 200) {
            logGetRelatedListRecordsInteraction(res.result);
          }
        });
      }
    };
  }
  function getRelatedListInfo(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const params = buildUiApiParams({
      parentObjectApiName: urlParams.parentObjectApiName,
      relatedListId: urlParams.relatedListId,
      recordTypeId: queryParams.recordTypeId,
      fields: queryParams.fields,
      optionalFields: queryParams.optionalFields,
      restrictColumnsToLayout: queryParams.restrictColumnsToLayout
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.GetRelatedListInfo, params, enrichedConfig);
  }
  function updateRelatedListInfo(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams,
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      parentObjectApiName: urlParams.parentObjectApiName,
      relatedListId: urlParams.relatedListId,
      recordTypeId: queryParams.recordTypeId,
      relatedListInfoInput: {
        orderedByInfo: body.orderedByInfo,
        userPreferences: body.userPreferences
      }
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.UpdateRelatedListInfo, params, enrichedConfig);
  }
  function getRelatedListsInfo(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const params = buildUiApiParams({
      parentObjectApiName: urlParams.parentObjectApiName,
      recordTypeId: queryParams.recordTypeId
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.GetRelatedListsInfo, params, enrichedConfig);
  }
  function postRelatedListRecords(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        parentRecordId,
        relatedListId
      },
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      parentRecordId: parentRecordId,
      relatedListId: relatedListId,
      listRecordsQuery: body
    }, resourceRequest);
    const instrumentationCallbacks = crudInstrumentationCallbacks !== null ? {
      rejectFn: crudInstrumentationCallbacks.getRelatedListRecordsRejectFunction,
      resolveFn: crudInstrumentationCallbacks.getRelatedListRecordsResolveFunction
    } : {};
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.PostRelatedListRecords, params, enrichedConfig, instrumentationCallbacks);
  }
  function postRelatedListRecordsBatch(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        parentRecordId
      },
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      parentRecordId: parentRecordId,
      listRecordsQuery: body
    }, resourceRequest);
    const instrumentationCallbacks = crudInstrumentationCallbacks !== null ? {
      rejectFn: crudInstrumentationCallbacks.getRelatedListRecordsBatchRejectFunction,
      resolveFn: crudInstrumentationCallbacks.getRelatedListRecordsBatchResolveFunction
    } : {};
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.PostRelatedListRecordsBatch, params, enrichedConfig, instrumentationCallbacks);
  }
  function getRelatedListCount(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const params = buildUiApiParams({
      parentRecordId: urlParams.parentRecordId,
      relatedListId: urlParams.relatedListId,
      maxCount: queryParams.maxCount
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.GetRelatedListCount, params, enrichedConfig);
  }
  function getRelatedListsCount(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      parentRecordId: urlParams.parentRecordId,
      relatedListNames: urlParams.relatedListNames
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.GetRelatedListCounts, params, enrichedConfig);
  }
  function getRelatedListInfoBatch(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const params = buildUiApiParams({
      parentObjectApiName: urlParams.parentObjectApiName,
      relatedListNames: urlParams.relatedListNames,
      recordTypeId: queryParams.recordTypeId
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.GetRelatedListInfoBatch, params, enrichedConfig);
  }
  function getRelatedListPreferences(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      preferencesId: urlParams.preferencesId
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.GetRelatedListPreferences, params, enrichedConfig);
  }
  function updateRelatedListPreferences(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      preferencesId: urlParams.preferencesId,
      relatedListUserPreferencesInput: {
        columnWidths: body.columnWidths,
        columnWrap: body.columnWrap,
        orderedBy: body.orderedBy
      }
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.UpdateRelatedListPreferences, params, enrichedConfig);
  }
  function getRelatedListPreferencesBatch(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      preferencesIds: urlParams.preferencesIds
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiRecordController.GetRelatedListPreferencesBatch, params, enrichedConfig);
  }
  router.patch(path => path.startsWith(UIAPI_RELATED_LIST_INFO_PATH), updateRelatedListInfo);
  // related-list-info/batch/API_NAME/RELATED_LIST_IDS
  router.get(path => path.startsWith(UIAPI_RELATED_LIST_INFO_BATCH_PATH) && /related-list-info\/batch\/[a-zA-Z_\d]+\/[a-zA-Z_\d]+/.test(path), getRelatedListInfoBatch);
  // related-list-info/API_NAME/RELATED_LIST_ID
  router.get(path => path.startsWith(UIAPI_RELATED_LIST_INFO_PATH) && /related-list-info\/[a-zA-Z_\d]+\/[a-zA-Z_\d]+/.test(path), getRelatedListInfo);
  router.get(path => path.startsWith(UIAPI_RELATED_LIST_INFO_PATH) && /related-list-info\/[a-zA-Z_\d]+\/[a-zA-Z_\d]+/.test(path) === false, getRelatedListsInfo);
  router.post(path => path.startsWith(UIAPI_RELATED_LIST_RECORDS_PATH) && path.startsWith(UIAPI_RELATED_LIST_RECORDS_BATCH_PATH) === false, postRelatedListRecords);
  router.post(path => path.startsWith(UIAPI_RELATED_LIST_RECORDS_BATCH_PATH), postRelatedListRecordsBatch);
  // related-list-count/batch/parentRecordId/relatedListNames
  router.get(path => path.startsWith(UIAPI_RELATED_LIST_COUNT_PATH + '/batch'), getRelatedListsCount);
  // related-list-count/parentRecordId/relatedListName
  router.get(path => path.startsWith(UIAPI_RELATED_LIST_COUNT_PATH) && path.startsWith(UIAPI_RELATED_LIST_COUNT_PATH + '/batch') === false, getRelatedListCount);
  // related-list-preferences/preferencesId
  router.patch(path => path.startsWith(UIAPI_RELATED_LIST_PREFERENCES_PATH) && path.startsWith(UIAPI_RELATED_LIST_PREFERENCES_BATCH_PATH) === false, updateRelatedListPreferences);
  router.get(path => path.startsWith(UIAPI_RELATED_LIST_PREFERENCES_PATH) && path.startsWith(UIAPI_RELATED_LIST_PREFERENCES_BATCH_PATH) === false, getRelatedListPreferences);
  // related-list-preferences/batch/preferencesIds
  router.get(path => path.startsWith(UIAPI_RELATED_LIST_PREFERENCES_BATCH_PATH), getRelatedListPreferencesBatch);
  function logGetRelatedListRecordsInteraction(body) {
    const records = body.records;
    // Don't log anything if the related list has no records.
    if (records.length === 0) {
      return;
    }
    const recordIds = records.map(record => {
      return record.id;
    });
    /**
     *  In almost every case - the relatedList records will all be of the same apiName, but there is an edge case for
        Activities entity that could return Events & Tasks- so handle that case by returning a joined string.
        ADS Implementation only looks at the first record returned to determine the apiName.
        See force/recordLibrary/recordMetricsPlugin.js _getRecordType method.
     */
    instrumentation$1.logCrud(exports.CrudEventType.READS, {
      parentRecordId: body.listReference.inContextOfRecordId,
      relatedListId: body.listReference.relatedListId,
      recordIds,
      recordType: body.records[0].apiName,
      state: exports.CrudEventState.SUCCESS
    });
  }
  var UiApiSearchController;
  (function (UiApiSearchController) {
    UiApiSearchController["SearchResults"] = "SearchUiController.searchResults";
    UiApiSearchController["KeywordSearchResults"] = "SearchUiController.searchResultsKeyword";
    UiApiSearchController["SearchFilterOptions"] = "SearchUiController.getFilterOptions";
    UiApiSearchController["SearchFilterMetadata"] = "SearchUiController.getSearchFilterMetadata";
    UiApiSearchController["LookupMetadata"] = "LookupController.getLookupMetadata";
  })(UiApiSearchController || (UiApiSearchController = {}));
  const UIAPI_SEARCH_UI_PATH = `${UI_API_BASE_URI$1}/search`;
  const UIAPI_SEARCH_UI_RESULTS_PATH = `${UIAPI_SEARCH_UI_PATH}/results`;
  const UIAPI_SEARCH_UI_KEYWORD_RESULTS_PATH = `${UIAPI_SEARCH_UI_RESULTS_PATH}/keyword`;
  const UIAPI_SEARCH_UI_SEARCH_INFO_PATH = `${UI_API_BASE_URI$1}/search-info/`;
  function searchResults(resourceRequest, resourceRequestContext) {
    const {
      queryParams,
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      options: body,
      q: queryParams.q
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiSearchController.SearchResults, params, enrichedConfig);
  }
  function searchKeywordResults(resourceRequest, resourceRequestContext) {
    const {
      queryParams,
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      options: body,
      q: queryParams.q,
      objectApiName: queryParams.objectApiName
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiSearchController.KeywordSearchResults, params, enrichedConfig);
  }
  function getSearchFilterOptions(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const params = buildUiApiParams({
      ...urlParams,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiSearchController.SearchFilterOptions, params, enrichedConfig);
  }
  function getSearchFilterMetadata(resourceRequest, resourceRequestContext) {
    const {
      urlParams,
      queryParams
    } = resourceRequest;
    const params = buildUiApiParams({
      ...urlParams,
      ...queryParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiSearchController.SearchFilterMetadata, params, enrichedConfig);
  }
  function getLookupMetadata(resourceRequest, resourceRequestContext) {
    const {
      urlParams
    } = resourceRequest;
    const params = buildUiApiParams({
      ...urlParams
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext, actionConfig);
    return dispatchAction(UiApiSearchController.LookupMetadata, params, enrichedConfig);
  }
  // .../search/results/keyword
  router.post(path => path.startsWith(UIAPI_SEARCH_UI_KEYWORD_RESULTS_PATH), searchKeywordResults);
  // .../search/results
  router.post(path => path.startsWith(UIAPI_SEARCH_UI_RESULTS_PATH), searchResults);
  // .../search-info/${objectApiName}/filters
  router.get(path => path.startsWith(UIAPI_SEARCH_UI_SEARCH_INFO_PATH) && /\w+\/filters$/.test(path), getSearchFilterMetadata);
  // .../search-info/${objectApiName}/filters/${filterApiName}/options
  router.get(path => path.startsWith(UIAPI_SEARCH_UI_SEARCH_INFO_PATH) && /\w+\/filters\/\w+\/options/.test(path), getSearchFilterOptions);
  // .../search-info/${objectApiName}/lookup/${fieldApiName}
  router.get(path => path.startsWith(UIAPI_SEARCH_UI_SEARCH_INFO_PATH) && /\w+\/lookup\/\w+/.test(path), getLookupMetadata);
  var UiApiAppsController;
  (function (UiApiAppsController) {
    UiApiAppsController["GetNavItems"] = "AppsController.getNavItems";
    UiApiAppsController["GetAllApps"] = "AppsController.getAccessibleApps";
    UiApiAppsController["GetAppDetails"] = "AppsController.getAppByID";
  })(UiApiAppsController || (UiApiAppsController = {}));
  const UIAPI_NAV_ITEMS_PATH = `${UI_API_BASE_URI$1}/nav-items`;
  const UIAPI_APPS_PATH = `${UI_API_BASE_URI$1}/apps`;
  function getNavItems(resourceRequest, resourceRequestContext) {
    const {
      queryParams: {
        formFactor,
        page,
        pageSize,
        navItemNames
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      formFactor,
      page,
      pageSize,
      navItemNames
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiAppsController.GetNavItems, params, enrichedConfig);
  }
  function getAllApps(resourceRequest, resourceRequestContext) {
    const {
      queryParams: {
        formFactor,
        userCustomizations
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      formFactor,
      userCustomizations
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiAppsController.GetAllApps, params, enrichedConfig);
  }
  function getAppDetails(resourceRequest, resourceRequestContext) {
    const {
      urlParams: {
        appId
      },
      queryParams: {
        formFactor,
        userCustomizations
      }
    } = resourceRequest;
    const params = buildUiApiParams({
      appId,
      formFactor,
      userCustomizations
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction(UiApiAppsController.GetAppDetails, params, enrichedConfig);
  }
  router.get(path => path.startsWith(UIAPI_NAV_ITEMS_PATH), getNavItems);
  router.get(path => path === UIAPI_APPS_PATH, getAllApps);
  router.get(path => path.startsWith(UIAPI_APPS_PATH), getAppDetails);
  function postJWT(resourceRequest, resourceRequestContext) {
    const {
      body
    } = resourceRequest;
    const params = buildUiApiParams({
      tableauJwtArgs: body
    }, resourceRequest);
    const enrichedConfig = enrichWithSourceContext(resourceRequestContext);
    return dispatchAction('TableauEmbeddingController.postJWT', params, enrichedConfig);
  }
  router.post(path => path.startsWith(`${TABLEAU_EMBEDDING_BASE_URI}/jwt`), postJWT);

  /**
   * Copyright (c) 2022, Salesforce, Inc.,
   * All rights reserved.
   * For full license text, see the LICENSE.txt file
   */

  const {
    parse,
    stringify
  } = JSON;
  const {
    join,
    push,
    unshift
  } = Array.prototype;
  const {
    isArray
  } = Array;
  const {
    entries,
    keys
  } = Object;
  const UI_API_BASE_URI = '/services/data/v62.0/ui-api';
  let instrumentation = {
    aggregateUiChunkCount: _cb => {},
    aggregateUiConnectError: () => {},
    duplicateRequest: _cb => {},
    getRecordAggregateInvoke: () => {},
    getRecordAggregateResolve: _cb => {},
    getRecordAggregateReject: _cb => {},
    getRecordAggregateRetry: () => {},
    getRecordNormalInvoke: () => {},
    networkRateLimitExceeded: () => {}
  };
  function instrument(newInstrumentation) {
    instrumentation = Object.assign(instrumentation, newInstrumentation);
  }
  const LDS_RECORDS_AGGREGATE_UI = 'LDS_Records_AggregateUi';
  // Boundary which represents the limit that we start chunking at,
  // determined by comma separated string length of fields
  const MAX_STRING_LENGTH_PER_CHUNK = 10000;
  // UIAPI limit
  const MAX_AGGREGATE_UI_CHUNK_LIMIT = 50;
  function createOkResponse(body) {
    return {
      status: luvioEngine.HttpStatusCode.Ok,
      body,
      statusText: 'ok',
      headers: {},
      ok: true
    };
  }
  function getErrorResponseText(status) {
    switch (status) {
      case luvioEngine.HttpStatusCode.Ok:
        return 'OK';
      case luvioEngine.HttpStatusCode.NotModified:
        return 'Not Modified';
      case luvioEngine.HttpStatusCode.NotFound:
        return 'Not Found';
      case luvioEngine.HttpStatusCode.BadRequest:
        return 'Bad Request';
      case luvioEngine.HttpStatusCode.ServerError:
        return 'Server Error';
      default:
        return `Unexpected HTTP Status Code: ${status}`;
    }
  }
  function createErrorResponse(status, body) {
    return {
      status,
      body,
      statusText: getErrorResponseText(status),
      headers: {},
      ok: false
    };
  }
  function isSpanningRecord(fieldValue) {
    return fieldValue !== null && typeof fieldValue === 'object';
  }
  function mergeRecordFields(first, second) {
    const {
      fields: targetFields
    } = first;
    const {
      fields: sourceFields
    } = second;
    const fieldNames = keys(sourceFields);
    for (let i = 0, len = fieldNames.length; i < len; i += 1) {
      const fieldName = fieldNames[i];
      const sourceField = sourceFields[fieldName];
      const targetField = targetFields[fieldName];
      if (isSpanningRecord(sourceField.value)) {
        if (targetField === undefined) {
          targetFields[fieldName] = sourceFields[fieldName];
          continue;
        }
        mergeRecordFields(targetField.value, sourceField.value);
        continue;
      }
      targetFields[fieldName] = sourceFields[fieldName];
    }
    return first;
  }
  /** Invoke executeAggregateUi Aura controller.  This is only to be used with large getRecord requests that
   *  would otherwise cause a query length exception.
   */
  function dispatchSplitRecordAggregateUiAction(recordId, networkAdapter, resourceRequest, resourceRequestContext) {
    instrumentation.getRecordAggregateInvoke();
    return networkAdapter(resourceRequest, resourceRequestContext).then(resp => {
      const {
        body
      } = resp;
      // This response body could be an executeAggregateUi, which we don't natively support.
      // Massage it into looking like a getRecord response.
      if (body === null || body === undefined || body.compositeResponse === undefined || body.compositeResponse.length === 0) {
        // We shouldn't even get into this state - a 200 with no body?
        throw createErrorResponse(luvioEngine.HttpStatusCode.ServerError, {
          error: 'No response body in executeAggregateUi found'
        });
      }
      const merged = body.compositeResponse.reduce((seed, response) => {
        if (response.httpStatusCode !== luvioEngine.HttpStatusCode.Ok) {
          instrumentation.getRecordAggregateReject(() => recordId);
          throw createErrorResponse(luvioEngine.HttpStatusCode.ServerError, {
            error: response.message
          });
        }
        if (seed === null) {
          return response.body;
        }
        return mergeRecordFields(seed, response.body);
      }, null);
      instrumentation.getRecordAggregateResolve(() => {
        return {
          recordId,
          apiName: merged.apiName
        };
      });
      return createOkResponse(merged);
    }, err => {
      instrumentation.getRecordAggregateReject(() => recordId);
      // rethrow error
      throw err;
    });
  }
  function shouldUseAggregateUiForGetRecord(fieldsArray, optionalFieldsArray) {
    return fieldsArray.length + optionalFieldsArray.length >= MAX_STRING_LENGTH_PER_CHUNK;
  }
  function buildAggregateUiUrl(params, resourceRequest) {
    const {
      fields,
      optionalFields
    } = params;
    const queryString = [];
    if (fields !== undefined && fields.length > 0) {
      const fieldString = join.call(fields, ',');
      push.call(queryString, `fields=${encodeURIComponent(fieldString)}`);
    }
    if (optionalFields !== undefined && optionalFields.length > 0) {
      const optionalFieldString = join.call(optionalFields, ',');
      push.call(queryString, `optionalFields=${encodeURIComponent(optionalFieldString)}`);
    }
    return `${resourceRequest.baseUri}${resourceRequest.basePath}?${join.call(queryString, '&')}`;
  }
  function buildGetRecordByFieldsCompositeRequest(resourceRequest, recordsCompositeRequest) {
    const {
      fieldsArray,
      optionalFieldsArray,
      fieldsLength,
      optionalFieldsLength
    } = recordsCompositeRequest;
    // Formula:  # of fields per chunk = floor(avg field length / max length per chunk)
    const averageFieldStringLength = Math.floor((fieldsLength + optionalFieldsLength) / (fieldsArray.length + optionalFieldsArray.length));
    const fieldsPerChunk = Math.floor(MAX_STRING_LENGTH_PER_CHUNK / averageFieldStringLength);
    const optionalFieldsChunks = [];
    // Do the same for optional tracked fields
    for (let i = 0, j = optionalFieldsArray.length; i < j; i += fieldsPerChunk) {
      const newChunk = optionalFieldsArray.slice(i, i + fieldsPerChunk);
      push.call(optionalFieldsChunks, newChunk);
    }
    const compositeRequest = [];
    // Add fields as one chunk at the beginning of the compositeRequest
    if (fieldsArray.length > 0) {
      const url = buildAggregateUiUrl({
        fields: fieldsArray
      }, resourceRequest);
      push.call(compositeRequest, {
        url,
        referenceId: `${LDS_RECORDS_AGGREGATE_UI}_fields`
      });
    }
    // Make sure we don't exceed the max subquery chunk limit for aggUi by capping the amount
    // of optionalFields subqueries at MAX_AGGREGATE_UI_CHUNK_LIMIT - 1 (first chunk is for fields)
    const maxNumberOfAllowableOptionalFieldsChunks = MAX_AGGREGATE_UI_CHUNK_LIMIT - 1;
    const optionalFieldsChunksLength = Math.min(optionalFieldsChunks.length, maxNumberOfAllowableOptionalFieldsChunks);
    for (let i = 0; i < optionalFieldsChunksLength; i += 1) {
      const fieldChunk = optionalFieldsChunks[i];
      const url = buildAggregateUiUrl({
        optionalFields: fieldChunk
      }, resourceRequest);
      push.call(compositeRequest, {
        url,
        referenceId: `${LDS_RECORDS_AGGREGATE_UI}_optionalFields_${i}`
      });
    }
    return compositeRequest;
  }
  const UIAPI_RECORDS_PATH = `${UI_API_BASE_URI}/records`;
  const UIAPI_RECORDS_BATCH_PATH = `${UI_API_BASE_URI}/records/batch/`;
  const QUERY_TOO_COMPLICATED_ERROR_CODE = 'QUERY_TOO_COMPLICATED';
  function fetchResponseIsQueryTooComplicated(error) {
    const {
      body
    } = error;
    if (error.status === luvioEngine.HttpStatusCode.BadRequest && body !== undefined) {
      return body.statusCode === luvioEngine.HttpStatusCode.BadRequest && body.errorCode === QUERY_TOO_COMPLICATED_ERROR_CODE;
    }
    return false;
  }
  /*
   * Takes a ResourceRequest, builds the aggregateUi payload, and dispatches via aggregateUi action
   */
  function buildAndDispatchGetRecordAggregateUi(recordId, req, params) {
    const {
      networkAdapter,
      resourceRequest,
      resourceRequestContext
    } = req;
    const compositeRequest = buildGetRecordByFieldsCompositeRequest(resourceRequest, params);
    // W-12245125: Emit chunk size metrics
    instrumentation.aggregateUiChunkCount(() => compositeRequest.length);
    const aggregateUiParams = {
      compositeRequest
    };
    const aggregateUiResourceRequest = {
      baseUri: UI_API_BASE_URI,
      basePath: '/aggregate-ui',
      method: 'post',
      priority: resourceRequest.priority,
      urlParams: {},
      body: aggregateUiParams,
      queryParams: {},
      headers: {}
    };
    return dispatchSplitRecordAggregateUiAction(recordId, networkAdapter, aggregateUiResourceRequest, resourceRequestContext);
  }
  const getRecordDispatcher = req => {
    const {
      resourceRequest,
      networkAdapter,
      resourceRequestContext
    } = req;
    const {
      queryParams,
      urlParams
    } = resourceRequest;
    const {
      fields,
      optionalFields
    } = queryParams;
    {
      if (typeof urlParams.recordId !== 'string') {
        throw new Error(`Invalid recordId: expected string, recieved "${typeof urlParams.recordId}"`);
      }
    }
    const recordId = urlParams.recordId;
    const fieldsArray = fields !== undefined && isArray(fields) ? fields : [];
    const optionalFieldsArray = optionalFields !== undefined && Array.isArray(optionalFields) ? optionalFields : [];
    const fieldsString = fieldsArray.join(',');
    const optionalFieldsString = optionalFieldsArray.join(',');
    // Don't submit a megarequest to UIAPI due to SOQL limit reasons.
    // Split and aggregate if needed
    const useAggregateUi = shouldUseAggregateUiForGetRecord(fieldsString, optionalFieldsString);
    if (useAggregateUi) {
      return buildAndDispatchGetRecordAggregateUi(recordId, {
        networkAdapter,
        resourceRequest,
        resourceRequestContext
      }, {
        fieldsArray,
        optionalFieldsArray,
        fieldsLength: fieldsString.length,
        optionalFieldsLength: optionalFieldsString.length
      });
    }
    return defaultDispatcher(req).catch(err => {
      if (fetchResponseIsQueryTooComplicated(err)) {
        // Retry with aggregateUi to see if we can avoid Query Too Complicated
        return buildAndDispatchGetRecordAggregateUi(recordId, {
          networkAdapter,
          resourceRequest,
          resourceRequestContext
        }, {
          fieldsArray,
          optionalFieldsArray,
          fieldsLength: fieldsString.length,
          optionalFieldsLength: optionalFieldsString.length
        });
      } else {
        throw err;
      }
    });
  };
  function matchRecordsHandlers(path, resourceRequest) {
    const method = resourceRequest.method.toLowerCase();
    if (method === 'get' && path.startsWith(UIAPI_RECORDS_PATH) && path.startsWith(UIAPI_RECORDS_BATCH_PATH) === false) {
      return getRecordDispatcher;
    }
    return null;
  }
  const defaultDispatcher = req => {
    const {
      networkAdapter,
      resourceRequest,
      resourceRequestContext
    } = req;
    return networkAdapter(resourceRequest, resourceRequestContext);
  };
  function getDispatcher(resourceRequest) {
    const {
      basePath,
      baseUri
    } = resourceRequest;
    const path = `${baseUri}${basePath}`;
    const recordsMatch = matchRecordsHandlers(path, resourceRequest);
    if (recordsMatch !== null) {
      return recordsMatch;
    }
    return defaultDispatcher;
  }
  const inflightRequests = Object.create(null);
  const TRANSACTION_KEY_SEP$1 = '::';
  const EMPTY_STRING$1 = '';
  function isResourceRequestDedupable(resourceRequest) {
    const resourceRequestContext = resourceRequest.resourceRequestContext;
    return resourceRequest.resourceRequest.method.toLowerCase() === 'get' || resourceRequestContext && resourceRequestContext.luvioRequestMethod === 'get';
  }
  function getTransactionKey$1(req) {
    const {
      resourceRequest
    } = req;
    const {
      baseUri,
      basePath,
      queryParams,
      headers
    } = resourceRequest;
    const path = `${baseUri}${basePath}`;
    const queryParamsString = queryParams ? stringify(queryParams) : EMPTY_STRING$1;
    const headersString = stringify(headers);
    const bodyString = resourceRequest.body && isResourceRequestDedupable(req) ? stringify(resourceRequest.body) : EMPTY_STRING$1;
    return `${path}${TRANSACTION_KEY_SEP$1}${headersString}${TRANSACTION_KEY_SEP$1}${queryParamsString}${bodyString}`;
  }
  function getFulfillingRequest(inflightRequests, resourceRequest) {
    const {
      fulfill
    } = resourceRequest;
    if (fulfill === undefined) {
      return null;
    }
    const handlersMap = entries(inflightRequests);
    for (let i = 0, len = handlersMap.length; i < len; i += 1) {
      const [transactionKey, handlers] = handlersMap[i];
      // check fulfillment against only the first handler ([0]) because it's equal or
      // fulfills all subsequent handlers in the array
      const existing = handlers[0].resourceRequest;
      if (fulfill(existing, resourceRequest) === true) {
        return transactionKey;
      }
    }
    return null;
  }
  /**
    Dedupes network requests being made to Salesforce APIs
    This function is only designed to dedupe GET requests.

    If POST/PUT/PATCH/DELETE requests need to be deduped, that should be handled
    on the server instead of here.
  */
  const dedupeRequest = req => {
    const {
      resourceRequest
    } = req;
    {
      if (!isResourceRequestDedupable(req)) {
        throw new Error('Invalid ResourceRequest that cannot be deduped. Only "get" Requests supported.');
      }
    }
    const transactionKey = getTransactionKey$1(req);
    // if an identical request is in-flight then queue for its response (do not re-issue the request)
    if (transactionKey in inflightRequests) {
      return new Promise((resolve, reject) => {
        push.call(inflightRequests[transactionKey], {
          resolve,
          reject,
          resourceRequest
        });
      });
    }
    const dispatch = getDispatcher(resourceRequest);
    // fallback to checking a custom deduper to find a similar (but not identical) request
    const similarTransactionKey = getFulfillingRequest(inflightRequests, resourceRequest);
    if (similarTransactionKey !== null) {
      return new Promise(resolve => {
        // custom dedupers find similar (not identical) requests. if the similar request fails
        // there's no guarantee the deduped request should fail. thus we re-issue the
        // original request in the case of a failure
        push.call(inflightRequests[similarTransactionKey], {
          resolve,
          reject: function reissueRequest() {
            resolve(dispatch(req));
          },
          resourceRequest
        });
      });
    }
    dispatch(req).then(response => {
      const handlers = inflightRequests[transactionKey];
      delete inflightRequests[transactionKey];
      // handlers mutate responses so must clone the response for each.
      // the first handler is given the original version to avoid an
      // extra clone (particularly when there's only 1 handler).
      for (let i = 1, len = handlers.length; i < len; i++) {
        const handler = handlers[i];
        handler.resolve(parse(stringify(response)));
      }
      handlers[0].resolve(response);
    }, error => {
      const handlers = inflightRequests[transactionKey];
      delete inflightRequests[transactionKey];
      for (let i = 0, len = handlers.length; i < len; i++) {
        const handler = handlers[i];
        handler.reject(error);
      }
    });
    // rely on sync behavior of Promise creation to create the list for handlers
    return new Promise((resolve, reject) => {
      inflightRequests[transactionKey] = [{
        resolve,
        reject,
        resourceRequest
      }];
    });
  };
  const RATE_LIMIT_CONFIG = {
    bucketCapacity: 100,
    fillsPerSecond: 100
  };
  class TokenBucket {
    /**
     * Constructs an instance of Token Bucket for rate limiting
     *
     * @param bucket The token holding capacity of the bucket
     * @param refillTokensPerSecond The number of tokens replenished every second
     */
    constructor(config) {
      this.bucketCapacity = config.bucketCapacity;
      this.refillTokensPerMilliSecond = config.fillsPerSecond / 1000;
      this.tokens = config.bucketCapacity;
      this.lastRefillTime = Date.now();
    }
    /**
     * Refills the bucket and removes desired number of tokens
     *
     * @param removeTokens number of tokens to be removed from the bucket should be >= 0
     * @returns {boolean} true if removing token was succesful
     */
    take(removeTokens) {
      // refill tokens before removing
      this.refill();
      const {
        tokens
      } = this;
      const remainingTokens = tokens - removeTokens;
      if (remainingTokens >= 0) {
        this.tokens = remainingTokens;
        return true;
      }
      return false;
    }
    refill() {
      const {
        bucketCapacity,
        tokens,
        refillTokensPerMilliSecond,
        lastRefillTime
      } = this;
      const now = Date.now();
      const timePassed = now - lastRefillTime;
      // Number of tokens should be integer so something like Math.floor is desired
      // Using Bitwise NOT ~ twice will achieve the same result with performance benefits
      const calculatedTokens = tokens + ~~(timePassed * refillTokensPerMilliSecond);
      this.tokens = bucketCapacity < calculatedTokens ? bucketCapacity : calculatedTokens;
      this.lastRefillTime = now;
    }
  }
  var tokenBucket = new TokenBucket(RATE_LIMIT_CONFIG);
  function platformNetworkAdapter(baseNetworkAdapter) {
    return (resourceRequest, resourceRequestContext) => {
      if (!tokenBucket.take(1)) {
        // We are hitting rate limiting, add some metrics
        instrumentation.networkRateLimitExceeded();
      }
      const salesforceRequest = {
        networkAdapter: baseNetworkAdapter,
        resourceRequest: resourceRequest,
        resourceRequestContext: resourceRequestContext
      };
      // If GET, or overriden to be treated as a GET with resourceRequestContext.networkResourceOverride, then dedupe.
      if (isResourceRequestDedupable(salesforceRequest)) {
        return dedupeRequest(salesforceRequest);
      } else {
        const dispatch = getDispatcher(resourceRequest);
        return dispatch(salesforceRequest);
      }
    };
  }
  const TRANSACTION_KEY_SEP = '::';
  const EMPTY_STRING = '';
  function getTransactionKey(resourceRequest) {
    const {
      baseUri,
      basePath,
      queryParams,
      headers
    } = resourceRequest;
    const path = `${baseUri}${basePath}`;
    const queryParamsString = queryParams ? stringify$1(queryParams) : EMPTY_STRING;
    const headersString = stringify$1(headers);
    return `${path}${TRANSACTION_KEY_SEP}${headersString}${TRANSACTION_KEY_SEP}${queryParamsString}`;
  }
  function controllerInvokerFactory(resourceRequest) {
    const {
      baseUri,
      basePath,
      method
    } = resourceRequest;
    const path = `${baseUri}${basePath}`;
    if (luvioEngine.isFormData(resourceRequest.body)) {
      const errorMessage = 'Form data not supported in aura network transport';
      {
        // in non-Prod we can throw an error that bubbles up fast
        throw new Error(errorMessage);
      }
    }
    const ret = router.lookup(resourceRequest);
    if (ret === null) {
      const errorMessage = `No invoker matching controller factory: ${path} ${method}.`;
      {
        // in non-Prod we can throw an error that bubbles up fast
        throw new Error(errorMessage);
      }
    }
    return ret;
  }
  function auraNetworkAdapter(resourceRequest, resourceRequestContext) {
    const transactionKey = getTransactionKey(resourceRequest);
    const controllerInvoker = controllerInvokerFactory(resourceRequest);
    return controllerInvoker(resourceRequest, resourceRequestContext, transactionKey);
  }
  var main = platformNetworkAdapter(auraNetworkAdapter);
  // version: 1.309.0-dev21-4baf03ecaf
  const __lwc_hmr_context = { moduleHash : 'e097845c49564acc43f0955d6715da2e' };
  if (lwc.hot) {
      lwc.hot.register('force/ldsNetwork/ldsNetwork.js', 'e097845c49564acc43f0955d6715da2e', {"name":"ldsNetwork","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
  }

  exports.UIAPI_GET_LAYOUT = UIAPI_GET_LAYOUT;
  exports.UIAPI_GET_LAYOUT_USER_STATE = UIAPI_GET_LAYOUT_USER_STATE;
  exports.UIAPI_OBJECT_INFO_BATCH_PATH = UIAPI_OBJECT_INFO_BATCH_PATH;
  exports.UIAPI_OBJECT_INFO_PATH = UIAPI_OBJECT_INFO_PATH;
  exports.UIAPI_RECORDS_PATH = UIAPI_RECORDS_PATH$1;
  exports.UIAPI_RELATED_LIST_RECORDS_BATCH_PATH = UIAPI_RELATED_LIST_RECORDS_BATCH_PATH;
  exports.UIAPI_RELATED_LIST_RECORDS_PATH = UIAPI_RELATED_LIST_RECORDS_PATH;
  exports.__lwc_hmr_context = __lwc_hmr_context;
  exports.createOkResponse = createOkResponse$1;
  exports.default = main;
  exports.defaultActionConfig = defaultActionConfig;
  exports.dispatchAuraAction = dispatchAction;
  exports.forceRecordTransactionsDisabled = forceRecordTransactionsDisabled;
  exports.getTransactionKey = getTransactionKey;
  exports.instrument = instrument$1;
  exports.layoutStorage = layoutStorage;
  exports.layoutStorageStatsLogger = layoutStorageStatsLogger;
  exports.layoutUserStateStorage = layoutUserStateStorage;
  exports.layoutUserStateStorageStatsLogger = layoutUserStateStorageStatsLogger;
  exports.ldsNetworkAdapterInstrument = instrument;
  exports.objectInfoStorage = objectInfoStorage;
  exports.objectInfoStorageStatsLogger = objectInfoStorageStatsLogger;
  exports.shouldForceRefresh = shouldForceRefresh;

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
(function() { LWR.define('o11y_schema/sf_lds', ['exports'], (function (exports) {

	const adapter_unfulfilled_error = {
	  namespace: "sf.lds",
	  name: "AdapterUnfulfilledError",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "AdapterUnfulfilledError": {
	                "fields": {
	                  "adapter": {
	                    "id": 1,
	                    "type": "string"
	                  },
	                  "missingPaths": {
	                    "rule": "repeated",
	                    "id": 2,
	                    "type": "string"
	                  },
	                  "missingLinks": {
	                    "rule": "repeated",
	                    "id": 3,
	                    "type": "string"
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

	const durable_store_evict = {
	  namespace: "sf.lds",
	  name: "DurableStoreEvict",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "DurableStoreEvict": {
	                "fields": {
	                  "keyCount": {
	                    "id": 2,
	                    "type": "uint32"
	                  },
	                  "segment": {
	                    "id": 1,
	                    "type": "string"
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

	const durable_store_graphql = {
	  namespace: "sf.lds",
	  name: "DurableStoreGraphql",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "DurableStoreGraphql": {
	                "fields": {
	                  "size": {
	                    "id": 1,
	                    "type": "uint32"
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

	const durable_store_read = {
	  namespace: "sf.lds",
	  name: "DurableStoreRead",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "DurableStoreRead": {
	                "fields": {
	                  "keyCount": {
	                    "id": 2,
	                    "type": "uint32"
	                  },
	                  "resultCount": {
	                    "id": 4,
	                    "type": "uint32"
	                  },
	                  "segment": {
	                    "id": 1,
	                    "type": "string"
	                  },
	                  "resultSize": {
	                    "id": 5,
	                    "type": "uint32"
	                  },
	                  "isAllFound": {
	                    "id": 3,
	                    "type": "bool"
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

	const durable_store_write = {
	  namespace: "sf.lds",
	  name: "DurableStoreWrite",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "DurableStoreWrite": {
	                "fields": {
	                  "keyCount": {
	                    "id": 2,
	                    "type": "uint32"
	                  },
	                  "size": {
	                    "id": 3,
	                    "type": "uint32"
	                  },
	                  "segment": {
	                    "id": 1,
	                    "type": "string"
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

	const evict_cache_records_by_ids = {
	  namespace: "sf.lds",
	  name: "EvictCacheRecordsByIds",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "EvictCacheRecordsByIds": {
	                "fields": {
	                  "idCount": {
	                    "id": 1,
	                    "type": "uint32"
	                  },
	                  "isCanceled": {
	                    "id": 4,
	                    "type": "bool"
	                  },
	                  "evictedCount": {
	                    "id": 2,
	                    "type": "uint32"
	                  },
	                  "skippedCount": {
	                    "id": 3,
	                    "type": "uint32"
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

	const evict_expired_entries = {
	  namespace: "sf.lds",
	  name: "EvictExpiredEntries",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "EvictExpiredEntries": {
	                "fields": {
	                  "isCanceled": {
	                    "id": 3,
	                    "type": "bool"
	                  },
	                  "expiredInDays": {
	                    "id": 1,
	                    "type": "uint32"
	                  },
	                  "evictedCount": {
	                    "id": 2,
	                    "type": "uint32"
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

	const luvio_store_stats = {
	  namespace: "sf.lds",
	  name: "LuvioStoreStats",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "LuvioStoreStats": {
	                "fields": {
	                  "subCount": {
	                    "id": 1,
	                    "type": "uint32"
	                  },
	                  "lookupDuration": {
	                    "id": 8,
	                    "type": "double"
	                  },
	                  "broadcastCount": {
	                    "id": 5,
	                    "type": "uint32"
	                  },
	                  "ingestCount": {
	                    "id": 3,
	                    "type": "uint32"
	                  },
	                  "broadcastDuration": {
	                    "id": 6,
	                    "type": "double"
	                  },
	                  "recordCount": {
	                    "id": 2,
	                    "type": "uint32"
	                  },
	                  "lookupCount": {
	                    "id": 7,
	                    "type": "uint32"
	                  },
	                  "ingestDuration": {
	                    "id": 4,
	                    "type": "double"
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

	const perf_network_stats = {
	  namespace: "sf.lds",
	  name: "PerfNetworkStats",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "PerfNetworkStats": {
	                "fields": {
	                  "wireName": {
	                    "id": 1,
	                    "type": "string"
	                  },
	                  "networkCount": {
	                    "id": 2,
	                    "type": "uint32"
	                  },
	                  "errorCount": {
	                    "id": 4,
	                    "type": "uint32"
	                  },
	                  "averageDuration": {
	                    "id": 3,
	                    "type": "double"
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

	const perf_sqlite_store_stats = {
	  namespace: "sf.lds",
	  name: "PerfSqliteStoreStats",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "PerfSqliteStoreStats": {
	                "fields": {
	                  "queryAvgDuration": {
	                    "id": 9,
	                    "type": "double"
	                  },
	                  "batchUpsertCount": {
	                    "id": 3,
	                    "type": "uint32"
	                  },
	                  "batchDeleteCount": {
	                    "id": 4,
	                    "type": "uint32"
	                  },
	                  "queryTotalCount": {
	                    "id": 7,
	                    "type": "uint32"
	                  },
	                  "wireName": {
	                    "id": 1,
	                    "type": "string"
	                  },
	                  "queryErrorCount": {
	                    "id": 8,
	                    "type": "uint32"
	                  },
	                  "batchTotalCount": {
	                    "id": 2,
	                    "type": "uint32"
	                  },
	                  "batchAvgDuration": {
	                    "id": 5,
	                    "type": "double"
	                  },
	                  "batchErrorCount": {
	                    "id": 6,
	                    "type": "uint32"
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

	const perf_total_stats = {
	  namespace: "sf.lds",
	  name: "PerfTotalStats",
	  pbjsSchema: {
	    "nested": {
	      "sf": {
	        "nested": {
	          "lds": {
	            "nested": {
	              "PerfTotalStats": {
	                "fields": {
	                  "totalDuration": {
	                    "id": 2,
	                    "type": "double"
	                  },
	                  "wireCount": {
	                    "id": 3,
	                    "type": "uint32"
	                  },
	                  "sqlQueryCount": {
	                    "id": 5,
	                    "type": "uint32"
	                  },
	                  "wireName": {
	                    "id": 1,
	                    "type": "string"
	                  },
	                  "networkCount": {
	                    "id": 4,
	                    "type": "uint32"
	                  },
	                  "sqlBatchCount": {
	                    "id": 6,
	                    "type": "uint32"
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

	exports.adapterUnfulfilledErrorSchema = adapter_unfulfilled_error;
	exports.durableStoreEvictSchema = durable_store_evict;
	exports.durableStoreGraphqlSchema = durable_store_graphql;
	exports.durableStoreReadSchema = durable_store_read;
	exports.durableStoreWriteSchema = durable_store_write;
	exports.evictCacheRecordsByIdsSchema = evict_cache_records_by_ids;
	exports.evictExpiredEntriesSchema = evict_expired_entries;
	exports.luvioStoreStatsSchema = luvio_store_stats;
	exports.perfNetworkStatsSchema = perf_network_stats;
	exports.perfSqliteStoreStatsSchema = perf_sqlite_store_stats;
	exports.perfTotalStatsSchema = perf_total_stats;

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
(function() { LWR.define('force/ldsInstrumentation', ['exports', 'lwc', 'o11y/client', 'o11y_schema/sf_lds', 'force/ldsBindings'], (function (exports, lwc, client, sf_lds, ldsBindings) {

    var SnapshotState;
    (function (SnapshotState) {
      SnapshotState["Fulfilled"] = "Fulfilled";
      SnapshotState["Unfulfilled"] = "Unfulfilled";
      SnapshotState["Error"] = "Error";
      SnapshotState["Pending"] = "Pending";
      SnapshotState["Stale"] = "Stale";
    })(SnapshotState || (SnapshotState = {}));
    Promise.resolve();
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
    var StoreResolveResultState;
    (function (StoreResolveResultState) {
      StoreResolveResultState[StoreResolveResultState["Found"] = 0] = "Found";
      StoreResolveResultState[StoreResolveResultState["Error"] = 1] = "Error";
      StoreResolveResultState[StoreResolveResultState["Null"] = 2] = "Null";
      StoreResolveResultState[StoreResolveResultState["NotPresent"] = 3] = "NotPresent";
      StoreResolveResultState[StoreResolveResultState["Stale"] = 4] = "Stale";
    })(StoreResolveResultState || (StoreResolveResultState = {}));
    var HttpStatusCode;
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
    })(HttpStatusCode || (HttpStatusCode = {}));
    var GraphNodeType;
    (function (GraphNodeType) {
      GraphNodeType["Link"] = "Link";
      GraphNodeType["Node"] = "Node";
      GraphNodeType["Error"] = "Error";
      GraphNodeType["Locked"] = "Locked";
    })(GraphNodeType || (GraphNodeType = {}));
    var StoreLinkStateValues;
    (function (StoreLinkStateValues) {
      StoreLinkStateValues[StoreLinkStateValues["NotPresent"] = 0] = "NotPresent";
      StoreLinkStateValues[StoreLinkStateValues["RefNotPresent"] = 1] = "RefNotPresent";
      StoreLinkStateValues[StoreLinkStateValues["RefPresent"] = 2] = "RefPresent";
      StoreLinkStateValues[StoreLinkStateValues["Null"] = 3] = "Null";
      StoreLinkStateValues[StoreLinkStateValues["Missing"] = 4] = "Missing";
      StoreLinkStateValues[StoreLinkStateValues["Pending"] = 5] = "Pending";
    })(StoreLinkStateValues || (StoreLinkStateValues = {}));
    var FragmentReadResultState;
    (function (FragmentReadResultState) {
      FragmentReadResultState[FragmentReadResultState["Missing"] = 0] = "Missing";
      FragmentReadResultState[FragmentReadResultState["Success"] = 1] = "Success";
      FragmentReadResultState[FragmentReadResultState["Error"] = 2] = "Error";
    })(FragmentReadResultState || (FragmentReadResultState = {}));
    ({
      state: FragmentReadResultState.Missing
    });
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
    // engine version: 0.156.4-dev2-78889b7e

    const DurableEnvironmentEventDiscriminator = 'durable';
    function isDurableEnvironmentEvent(event) {
      return event.type === 'environment' && event.environment === DurableEnvironmentEventDiscriminator;
    }

    /**
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */

    const {
      stringify: stringify$1
    } = JSON;
    function isPromise$1(value) {
      // check for Thenable due to test frameworks using custom Promise impls
      return value !== null && value !== undefined && typeof value.then === 'function';
    }
    function isErrorSnapshot(snapshot) {
      return snapshot.state === 'Error';
    }
    function runAdapterWithReport(adapterName, adapter, adapterConfig, requestContext, onAdapterComplete) {
      let adapterStart;
      let adapterEnd;
      let lookupStart;
      let lookupEnd;
      let cacheStart;
      let cacheEnd;
      let networkStart;
      let networkEnd;
      let staleLookup = false;
      let result;
      let snapshotState = '';
      let error;
      let exceptionMessage;
      let completedNetworkRequests = [];
      let collectedNetworkStartEvents = {};
      let reviveStats = [];
      let rawEvents = [];
      const markEnd = adapterEndedCallback => {
        if (adapterStart === undefined) {
          throw Error('adapter has not been started yet');
        }
        if (adapterEnd) {
          throw Error('adapter has already ended');
        }
        if (result === undefined) {
          throw Error('no result type set');
        }
        adapterEnd = Date.now();
        const executionTime = adapterEnd - adapterStart;
        const cacheLookupTime = cacheEnd - cacheStart;
        const lookupTime = lookupEnd - lookupStart;
        const networkLookupTime = networkEnd - networkStart;
        const config = stringify$1(adapterConfig);
        switch (result) {
          case 'l1-hit':
            if (staleLookup === true) {
              adapterEndedCallback({
                result: 'l1-hit',
                adapterName,
                rawEvents,
                config,
                stale: true,
                executionTime,
                cacheLookupTime,
                lookupTime,
                snapshotState
              });
            } else {
              adapterEndedCallback({
                result: 'l1-hit',
                adapterName,
                rawEvents,
                config,
                stale: false,
                executionTime,
                cacheLookupTime,
                lookupTime,
                snapshotState
              });
            }
            break;
          case 'l2-hit':
            if (staleLookup === true) {
              adapterEndedCallback({
                result: 'l2-hit',
                adapterName,
                rawEvents,
                config,
                stale: true,
                executionTime,
                cacheLookupTime,
                lookupTime,
                snapshotState,
                revives: reviveStats
              });
            } else {
              adapterEndedCallback({
                result: 'l2-hit',
                adapterName,
                rawEvents,
                config,
                stale: false,
                executionTime,
                cacheLookupTime,
                lookupTime,
                snapshotState,
                revives: reviveStats
              });
            }
            break;
          case 'cache-miss':
            adapterEndedCallback({
              result: 'cache-miss',
              adapterName,
              rawEvents,
              config,
              executionTime,
              cacheLookupTime,
              lookupTime,
              networkLookupTime,
              completedNetworkRequests,
              snapshotState,
              revives: reviveStats
            });
            break;
          case 'invalid-config':
            adapterEndedCallback({
              result: 'invalid-config',
              rawEvents,
              config,
              adapterName,
              executionTime
            });
            break;
          case 'error':
            adapterEndedCallback({
              result: 'error',
              rawEvents,
              config,
              error,
              adapterName,
              executionTime,
              cacheLookupTime,
              lookupTime,
              networkLookupTime,
              snapshotState
            });
            break;
          case 'exception':
            adapterEndedCallback({
              result: 'exception',
              rawEvents,
              config,
              exceptionMessage,
              adapterName,
              executionTime
            });
            break;
        }
      };
      const markException = error => {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        exceptionMessage = message;
        result = 'exception';
      };
      const metricsEventObserver = {
        onAdapterEvent: ev => {
          rawEvents.push(ev);
          switch (ev.type) {
            case 'adapter-lookup-start':
              lookupStart = Date.now();
              break;
            case 'adapter-lookup-end':
              lookupEnd = Date.now();
              break;
            case 'cache-lookup-start':
              cacheStart = Date.now();
              break;
            case 'cache-lookup-end':
              cacheEnd = Date.now();
              if (ev.wasResultAsync === false) {
                // L1 cache hit
                result = 'l1-hit';
              } else {
                // L2 cache hit
                result = 'l2-hit';
              }
              if (ev.snapshotState === 'Stale') {
                staleLookup = true;
              }
              break;
            case 'network-lookup-start':
              // if the lookup is stale, the network lookup is
              // caused by an async refresh
              if (staleLookup === false) {
                result = 'cache-miss';
                networkStart = Date.now();
              }
              break;
            case 'network-lookup-end':
              if (staleLookup === false) {
                networkEnd = Date.now();
              }
              break;
            case 'network-request-start':
              collectedNetworkStartEvents[ev.uuid] = ev;
              break;
            case 'network-request-end':
              {
                const startEvent = collectedNetworkStartEvents[ev.uuid];
                if (startEvent === undefined || startEvent.type !== 'network-request-start') {
                  {
                    throw Error('no matching network start event emmited');
                  }
                }
                completedNetworkRequests.push({
                  request: startEvent.request,
                  response: ev.response,
                  duration: ev.timestamp - startEvent.timestamp
                });
                break;
              }
          }
        },
        onEnvironmentEvent: ev => {
          rawEvents.push(ev);
          if (isDurableEnvironmentEvent(ev)) {
            if (ev.data.type === 'l2-revive-end') {
              let missingKeys;
              const snapshot = ev.data.snapshot;
              if (snapshot.state === 'Unfulfilled') {
                missingKeys = snapshot.missingLinks.keysAsArray();
                if (snapshot.missingLinks.size() === 0) {
                  missingKeys.push(snapshot.recordId);
                }
              }
              reviveStats.push({
                resultState: ev.data.snapshot.state,
                missingKeys,
                l2Trips: ev.data.l2Trips,
                duration: ev.data.duration
              });
            }
          }
        },
        onCustomAdapterEvent: ev => {
          rawEvents.push(ev);
        }
      };
      const bindObserverToAdapterRequestContext = requestContext => {
        let requestContextWithInstrumentationObserver = {
          ...requestContext
        };
        if (requestContextWithInstrumentationObserver.eventObservers === undefined) {
          requestContextWithInstrumentationObserver.eventObservers = [];
        }
        requestContextWithInstrumentationObserver.eventObservers.push(metricsEventObserver);
        return requestContextWithInstrumentationObserver;
      };
      adapterStart = Date.now();
      try {
        const normalizedRequestContext = bindObserverToAdapterRequestContext(requestContext);
        const adapterResult = adapter(adapterConfig, normalizedRequestContext);
        if (isPromise$1(adapterResult)) {
          adapterResult.then(snapshot => {
            snapshotState = snapshot.state;
            if (isErrorSnapshot(snapshot)) {
              result = 'error';
              error = stringify$1(snapshot.error);
            }
            markEnd(onAdapterComplete);
          }).catch(e => {
            // async error
            markException(e);
            markEnd(onAdapterComplete);
          });
        } else {
          if (adapterResult === null) {
            // invalid config
            result = 'invalid-config';
          } else if (isErrorSnapshot(adapterResult)) {
            snapshotState = 'Error';
            result = 'error';
            error = stringify$1(adapterResult.error);
          }
          markEnd(onAdapterComplete);
        }
        return adapterResult;
      } catch (error) {
        // synchronous error (lookup exception)
        markException(error);
        markEnd(onAdapterComplete);
        throw error;
      }
    }
    const ADAPTER_CACHE_HIT_COUNT_METRIC_NAME = 'cache-hit-count';
    const ADAPTER_CACHE_HIT_DURATION_METRIC_NAME = 'cache-hit-duration';
    const ADAPTER_CACHE_HIT_L2_COUNT_METRIC_NAME = 'cache-hit-l2-count';
    const ADAPTER_CACHE_HIT_L2_DURATION_METRIC_NAME = 'cache-hit-l2-duration';
    const ADAPTER_CACHE_MISS_COUNT_METRIC_NAME = 'cache-miss-count';
    const ADAPTER_CACHE_MISS_DURATION_METRIC_NAME = 'cache-miss-duration';
    const ADAPTER_CACHE_MISS_OUT_OF_TTL_COUNT_METRIC_NAME = 'cache-miss-out-of-ttl-count';
    const ADAPTER_CACHE_MISS_OUT_OF_TTL_DURATION_METRIC_NAME = 'cache-miss-out-of-ttl-duration';
    const REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_COUNT_METRIC_NAME = 'cache-miss-out-of-ttl-data-changed-count';
    const REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_COUNT_METRIC_NAME = 'cache-miss-out-of-ttl-data-unchanged-count';
    const REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_DURATION_METRIC_NAME = 'cache-miss-out-of-ttl-data-changed-duration';
    const REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_DURATION_METRIC_NAME = 'cache-miss-out-of-ttl-data-unchanged-duration';
    /**
     * W-8121791
     * Number of subqueries used when aggregateUi is invoked for getRecord
     */
    const AGGREGATE_UI_CHUNK_COUNT = 'aggregate-ui-chunk-count';
    /**
     * W-6981216
     * Counter for overall LDS cache hits.
     * Note: This is also being recorded in AILTN logging.
     */
    const CACHE_HIT_COUNT = ADAPTER_CACHE_HIT_COUNT_METRIC_NAME;
    /**
     * W-6981216
     * Counter for overall LDS cache hits.
     * Note: This is also being recorded in AILTN logging.
     */
    const CACHE_MISS_COUNT = ADAPTER_CACHE_MISS_COUNT_METRIC_NAME;
    /**
     * W-9949353
     * Used to track how often we dedupe HTTP requests
     * Invoked when an HTTP request is deduped against an already in-flight request
     */
    const DUPLICATE_REQUEST_COUNT = 'duplicate-request-count';
    /**
     * W-7667066
     * This count represents the number of times getRecord() was invoked, but not including
     * executeAggregateUi calls.  It can be represented as the sum of the Aura Action invocations
     * GetRecordWithLayouts and GetRecordWithFields.
     */
    const GET_RECORD_NORMAL_INVOKE_COUNT = 'get-record-normal-invoke-count';
    /**
     * W-7667066
     * This count represents the number of times getRecord() was invoked, with a large enough payload
     * that executeAggregateUi was used.
     */
    const GET_RECORD_AGGREGATE_INVOKE_COUNT = 'get-record-aggregate-invoke-count';
    /**
     * W-7301684
     * Counter for when getRecordNotifyChange api calls are allowed through.
     */
    const GET_RECORD_NOTIFY_CHANGE_ALLOW_COUNT = 'get-record-notify-change-allow-count';
    /**
     * W-7301684
     * Counter for when getRecordNotifyChange api calls are dropped/throttled.
     */
    const GET_RECORD_NOTIFY_CHANGE_DROP_COUNT = 'get-record-notify-change-drop-count';
    /**
     * W-11118785
     * Counter for when notifyRecordUpdateAvailable api calls are allowed through.
     */
    const NOTIFY_RECORD_UPDATE_AVAILABLE_ALLOW_COUNT = 'notify-record-update-available-allow-count';
    /**
     * W-11118785
     * Counter for when notifyRecordUpdateAvailable api calls are dropped/throttled.
     */
    const NOTIFY_RECORD_UPDATE_AVAILABLE_DROP_COUNT = 'notify-record-update-available-drop-count';
    /**
     * W-8278006
     * Counter for rate limiting telemetry. Is updated whenever the network adapter hits the specified limit.
     */
    const NETWORK_RATE_LIMIT_EXCEEDED_COUNT = 'network-rate-limit-exceeded-count';
    /**
     * W-6981216
     * Timer to measure performance for Luvio.storeBroadcast() method.
     */
    const STORE_BROADCAST_DURATION = 'store-broadcast-duration';
    /**
     * W-6981216
     * Timer to measure performance for Luvio.storeIngest() method.
     */
    const STORE_INGEST_DURATION = 'store-ingest-duration';
    /**
     * W-6981216
     * Timer to measure performance for Luvio.storeLookup() method.
     */
    const STORE_LOOKUP_DURATION = 'store-lookup-duration';
    /**
     * W-9805009
     * Timer to measure performance for Luvio.storeSetTTLOverride() method.
     */
    const STORE_SET_TTL_OVERRIDE_DURATION = 'store-set-ttl-override-duration';
    /**
     * W-9805009
     * Timer to measure performance for Luvio.storeSetDefaultTTLOverride() method.
     */
    const STORE_SET_DEFAULT_TTL_OVERRIDE_DURATION = 'store-set-default-ttl-override-duration';
    /**
     * W-11118785
     * Timer to measure performance for Luvio.notifyStoreUpdateAvailable() method.
     */
    const NOTIFY_STORE_UPDATE_AVAILABLE_DURATION = 'notify-store-update-available-duration';
    /**
     * W-6981216
     * Counter for number of records in LDS store. Is updated by periodicLogger invocations.
     * Note: This is also being recorded in AILTN logging.
     */
    const STORE_SIZE_COUNT = 'store-size-count';
    /**
     * W-6981216
     * Counter for number of LDS snapshot subscription. Is updated by periodicLogger invocations.
     * Note: This is also being recorded in AILTN logging.
     */
    const STORE_SNAPSHOT_SUBSCRIPTIONS_COUNT = 'store-snapshot-subscriptions-count';
    /**
     * W-6981216
     * Counter for number of LDS watch subscriptions. Is updated by periodicLogger invocations.
     * Note: This is also being recorded in AILTN logging.
     */
    const STORE_WATCH_SUBSCRIPTIONS_COUNT = 'store-watch-subscriptions-count';
    /**
     * W-9131128
     * Counter for graphQL get adapter response with mixed bag of both data and error in response
     */
    const GET_GRAPHQL_RESPONSE_MIXED = 'get-graphql-response-mixed-count';
    /**
     * W-9537401
     * Counter for Luvio store trim task invocation
     */
    const STORE_TRIM_TASK_COUNT = 'store-trim-task-count';
    /**
     * W-9537401
     * Timer to measure performance for Luvio store trim task
     */
    const STORE_TRIM_TASK_DURATION = 'store-trim-task-duration';
    /**
     * W-9804037
     * Counters for Luvio cache policy usage
     * Note: Undefined cache policy defaults to different cache policies based on runtime
     */
    const CACHE_POLICY_COUNTERS = {
      'cache-and-network': 'cache-policy-cache-and-network',
      'cache-then-network': 'cache-policy-cache-then-network',
      'no-cache': 'cache-policy-no-cache',
      'only-if-cached': 'cache-policy-only-if-cached',
      'stale-while-revalidate': 'cache-policy-stale-while-revalidate',
      'valid-at': 'cache-policy-valid-at'
    };
    const CACHE_POLICY_UNDEFINED_COUNTER = 'cache-policy-undefined';
    const STALE_TAG = 'stale';
    /**
     * W-9804037
     * Durable Store health metric
     * Counter to track Durable Store read, write and error rates
     */
    const DURABLE_STORE_COUNT = 'durable-store-count';
    /**
     * W-10490363
     * GraphQL Eval health metric
     * Counter to track Success and Error Rate on Eval
     */
    const GRAPHQL_ADAPTER_COUNT = 'graphql-adapter-count';
    /**
     * Counter for tracking invalid record type IDs
     */
    const RECORD_TYPE_ID_IS_NULL_COUNT = 'record-type-id-is-null-count';
    /**
     * W-12293528
     * GraphQL health metric
     * Counter to track size of the top-level GraphQL object
     */
    const STORE_GRAPHQL_SIZE_COUNT = 'store-graphql-size-count';
    /**
     * W-12293528
     * GraphQL health metric
     * Counter to track validation errors in query
     */
    const GRAPHQL_QUERY_VALIDATION_ERROR_COUNT = 'graphql-query-validation-error-count';
    /**
     * W-12293528
     * GraphQL health metric
     * Counter to track syntax errors in query
     */
    const GRAPHQL_QUERY_SYNTAX_ERROR_COUNT = 'graphql-query-syntax-error-count';
    /**
     * W-12293528
     * GraphQL health metric
     * Counter to track miscellaneous errors in query
     */
    const GRAPHQL_QUERY_OTHER_ERROR_COUNT = 'graphql-query-other-error-count';
    /**
     * W-12025795
     * GraphQL metric
     * Counter to track usage of legacy adapter
     */
    const GRAPHQL_LEGACY_ADAPTER_USAGE_COUNT = 'graphql-legacy-adapter-usage-count';
    /**
     * W-12025795
     * GraphQL metric
     * Counter to track errors in usage of legacy adapter
     */
    const GRAPHQL_LEGACY_ADAPTER_ERRORS_IN_RESPONSE_COUNT = 'graphql-legacy-adapter-errors-in-response-count';
    /**
     * W-15022402
     * Predictive Data loading predict() Activity Tracking
     * Activity name to track duration, errors for predictive data loading's predict() function
     */
    const PREDICTIVE_DATA_LOADING_PREDICT = 'predictive-data-loading-predict';
    /**
     * W-15022402
     * Predictive Data loading saveRequest() Activity Tracking
     * Activity name to track duration, errors for predictive data loading's saveRequest() function
     */
    const PREDICTIVE_DATA_LOADING_SAVE_REQUEST = 'predictive-data-loading-save-request';
    var metricKeys = /*#__PURE__*/Object.freeze({
      __proto__: null,
      ADAPTER_CACHE_HIT_COUNT_METRIC_NAME: ADAPTER_CACHE_HIT_COUNT_METRIC_NAME,
      ADAPTER_CACHE_HIT_DURATION_METRIC_NAME: ADAPTER_CACHE_HIT_DURATION_METRIC_NAME,
      ADAPTER_CACHE_HIT_L2_COUNT_METRIC_NAME: ADAPTER_CACHE_HIT_L2_COUNT_METRIC_NAME,
      ADAPTER_CACHE_HIT_L2_DURATION_METRIC_NAME: ADAPTER_CACHE_HIT_L2_DURATION_METRIC_NAME,
      ADAPTER_CACHE_MISS_COUNT_METRIC_NAME: ADAPTER_CACHE_MISS_COUNT_METRIC_NAME,
      ADAPTER_CACHE_MISS_DURATION_METRIC_NAME: ADAPTER_CACHE_MISS_DURATION_METRIC_NAME,
      ADAPTER_CACHE_MISS_OUT_OF_TTL_COUNT_METRIC_NAME: ADAPTER_CACHE_MISS_OUT_OF_TTL_COUNT_METRIC_NAME,
      ADAPTER_CACHE_MISS_OUT_OF_TTL_DURATION_METRIC_NAME: ADAPTER_CACHE_MISS_OUT_OF_TTL_DURATION_METRIC_NAME,
      AGGREGATE_UI_CHUNK_COUNT: AGGREGATE_UI_CHUNK_COUNT,
      CACHE_HIT_COUNT: CACHE_HIT_COUNT,
      CACHE_MISS_COUNT: CACHE_MISS_COUNT,
      CACHE_POLICY_COUNTERS: CACHE_POLICY_COUNTERS,
      CACHE_POLICY_UNDEFINED_COUNTER: CACHE_POLICY_UNDEFINED_COUNTER,
      DUPLICATE_REQUEST_COUNT: DUPLICATE_REQUEST_COUNT,
      DURABLE_STORE_COUNT: DURABLE_STORE_COUNT,
      GET_GRAPHQL_RESPONSE_MIXED: GET_GRAPHQL_RESPONSE_MIXED,
      GET_RECORD_AGGREGATE_INVOKE_COUNT: GET_RECORD_AGGREGATE_INVOKE_COUNT,
      GET_RECORD_NORMAL_INVOKE_COUNT: GET_RECORD_NORMAL_INVOKE_COUNT,
      GET_RECORD_NOTIFY_CHANGE_ALLOW_COUNT: GET_RECORD_NOTIFY_CHANGE_ALLOW_COUNT,
      GET_RECORD_NOTIFY_CHANGE_DROP_COUNT: GET_RECORD_NOTIFY_CHANGE_DROP_COUNT,
      GRAPHQL_ADAPTER_COUNT: GRAPHQL_ADAPTER_COUNT,
      GRAPHQL_LEGACY_ADAPTER_ERRORS_IN_RESPONSE_COUNT: GRAPHQL_LEGACY_ADAPTER_ERRORS_IN_RESPONSE_COUNT,
      GRAPHQL_LEGACY_ADAPTER_USAGE_COUNT: GRAPHQL_LEGACY_ADAPTER_USAGE_COUNT,
      GRAPHQL_QUERY_OTHER_ERROR_COUNT: GRAPHQL_QUERY_OTHER_ERROR_COUNT,
      GRAPHQL_QUERY_SYNTAX_ERROR_COUNT: GRAPHQL_QUERY_SYNTAX_ERROR_COUNT,
      GRAPHQL_QUERY_VALIDATION_ERROR_COUNT: GRAPHQL_QUERY_VALIDATION_ERROR_COUNT,
      NETWORK_RATE_LIMIT_EXCEEDED_COUNT: NETWORK_RATE_LIMIT_EXCEEDED_COUNT,
      NOTIFY_RECORD_UPDATE_AVAILABLE_ALLOW_COUNT: NOTIFY_RECORD_UPDATE_AVAILABLE_ALLOW_COUNT,
      NOTIFY_RECORD_UPDATE_AVAILABLE_DROP_COUNT: NOTIFY_RECORD_UPDATE_AVAILABLE_DROP_COUNT,
      NOTIFY_STORE_UPDATE_AVAILABLE_DURATION: NOTIFY_STORE_UPDATE_AVAILABLE_DURATION,
      PREDICTIVE_DATA_LOADING_PREDICT: PREDICTIVE_DATA_LOADING_PREDICT,
      PREDICTIVE_DATA_LOADING_SAVE_REQUEST: PREDICTIVE_DATA_LOADING_SAVE_REQUEST,
      RECORD_TYPE_ID_IS_NULL_COUNT: RECORD_TYPE_ID_IS_NULL_COUNT,
      REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_COUNT_METRIC_NAME: REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_COUNT_METRIC_NAME,
      REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_DURATION_METRIC_NAME: REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_DURATION_METRIC_NAME,
      REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_COUNT_METRIC_NAME: REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_COUNT_METRIC_NAME,
      REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_DURATION_METRIC_NAME: REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_DURATION_METRIC_NAME,
      STALE_TAG: STALE_TAG,
      STORE_BROADCAST_DURATION: STORE_BROADCAST_DURATION,
      STORE_GRAPHQL_SIZE_COUNT: STORE_GRAPHQL_SIZE_COUNT,
      STORE_INGEST_DURATION: STORE_INGEST_DURATION,
      STORE_LOOKUP_DURATION: STORE_LOOKUP_DURATION,
      STORE_SET_DEFAULT_TTL_OVERRIDE_DURATION: STORE_SET_DEFAULT_TTL_OVERRIDE_DURATION,
      STORE_SET_TTL_OVERRIDE_DURATION: STORE_SET_TTL_OVERRIDE_DURATION,
      STORE_SIZE_COUNT: STORE_SIZE_COUNT,
      STORE_SNAPSHOT_SUBSCRIPTIONS_COUNT: STORE_SNAPSHOT_SUBSCRIPTIONS_COUNT,
      STORE_TRIM_TASK_COUNT: STORE_TRIM_TASK_COUNT,
      STORE_TRIM_TASK_DURATION: STORE_TRIM_TASK_DURATION,
      STORE_WATCH_SUBSCRIPTIONS_COUNT: STORE_WATCH_SUBSCRIPTIONS_COUNT
    });

    /**
     * Observability / Critical Availability Program (230+)
     *
     * This file is intended to be used as a consolidated place for all definitions, functions,
     * and helpers related to "M1"[1].
     *
     * Below are the R.E.A.D.S. metrics for the Lightning Data Service, defined here[2].
     *
     * [1] Search "[M1] Lightning Data Service Design Spike" in Quip
     * [2] Search "Lightning Data Service R.E.A.D.S. Metrics" in Quip
     */
    const OBSERVABILITY_NAMESPACE = 'LIGHTNING.lds.service';
    const ADAPTER_INVOCATION_COUNT_METRIC_NAME = 'request';
    const ADAPTER_ERROR_COUNT_METRIC_NAME = 'error';
    /**
     * W-8828410
     * Counter for the number of UnfulfilledSnapshotErrors the luvio engine has.
     */
    const TOTAL_ADAPTER_ERROR_COUNT = ADAPTER_ERROR_COUNT_METRIC_NAME;
    /**
     * W-8828410
     * Counter for the number of invocations made into LDS by a wire adapter.
     */
    const TOTAL_ADAPTER_REQUEST_SUCCESS_COUNT = ADAPTER_INVOCATION_COUNT_METRIC_NAME;
    const {
      create,
      keys
    } = Object;
    const {
      isArray
    } = Array;
    const {
      parse,
      stringify
    } = JSON;

    /**
     * Inspired by https://www.npmjs.com/package/hashlru
     */
    class LRUCache {
      constructor(limit) {
        this.oldCache = new Map();
        this.newCache = new Map();
        this.size = 0;
        this.limit = limit;
      }
      checkSize() {
        if (this.size >= this.limit) {
          this.size = 0;
          this.oldCache = this.newCache;
          this.newCache = new Map();
        }
      }
      get(key) {
        if (this.newCache.has(key)) {
          return this.newCache.get(key);
        } else if (this.oldCache.has(key)) {
          const value = this.oldCache.get(key);
          this.oldCache.delete(key);
          this.newCache.set(key, value);
          this.size += 1;
          this.checkSize();
          return value;
        }
        return undefined;
      }
      set(key, value) {
        if (this.newCache.has(key)) {
          this.newCache.set(key, value);
        } else {
          this.newCache.set(key, value);
          this.size += 1;
          this.checkSize();
        }
      }
      delete(key) {
        if (this.newCache.has(key)) {
          this.newCache.delete(key);
          this.size -= 1;
        } else if (this.oldCache.has(key)) {
          this.oldCache.delete(key);
        }
      }
    }

    /**
     * A deterministic JSON stringify implementation. Heavily adapted from https://github.com/epoberezkin/fast-json-stable-stringify.
     * This is needed because insertion order for JSON.stringify(object) affects output:
     * JSON.stringify({a: 1, b: 2})
     *      "{"a":1,"b":2}"
     * JSON.stringify({b: 2, a: 1})
     *      "{"b":2,"a":1}"
     * Modified from the apex implementation to sort arrays non-destructively.
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
        // copy any array before sorting so we don't mutate the object.
        // eslint-disable-next-line no-param-reassign
        node = node.slice(0).sort();
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
    function isPromise(value) {
      // check for Thenable due to test frameworks using custom Promise impls
      return value !== null && value !== undefined && typeof value.then === 'function';
    }
    function isAdapterError(error) {
      if (typeof error !== 'string') {
        return false;
      }
      const parsedError = parse(error);
      return parsedError.errorType !== undefined && parsedError.errorType === 'adapterError';
    }
    function throttle(callback, ms) {
      let waiting = false;
      return () => {
        if (!waiting) {
          callback();
          waiting = true;
          setTimeout(() => waiting = false, ms);
        }
      };
    }
    const NAMESPACE = 'lds';
    const APEX_ADAPTER_NAME = 'getApex';
    const NORMALIZED_APEX_ADAPTER_NAME = createMetricsKey('Apex', APEX_ADAPTER_NAME);
    const GRAPHQL_ADAPTER_NAME = 'graphQL';
    const GRAPHQL_RECORDS_KEY = 'GraphQL::graphql__uiapi__query';
    const ldsInstrumentation = client.getInstrumentation(NAMESPACE);
    const observabilityInstrumentation = client.getInstrumentation(OBSERVABILITY_NAMESPACE);
    class Instrumentation {
      /**
       * Injected to LDS for Luvio specific instrumentation.
       *
       * @param context The transaction context.
       */
      instrumentLuvio(_context) {
        // TODO [W-9783151]: refactor luvio.instrument to not require this class
      }
    }
    /**
     * Provide this method for the instrument option for a Luvio instance.
     * @param context The transaction context.
     */
    function instrumentLuvio(context) {
      if (isAdapterUnfulfilledError(context)) {
        // We are consolidating all apex adapter instrumentation calls under a single key
        const normalizedContext = {
          ...context,
          adapterName: normalizeAdapterName(context.adapterName)
        };
        incrementAdapterRequestErrorCount(normalizedContext);
        logAdapterRequestError(normalizedContext);
      }
    }
    /**
     * Returns whether or not this is an AdapterUnfulfilledError.
     * @param context The transaction context.
     * @returns Whether or not this is an AdapterUnfulfilledError.
     */
    function isAdapterUnfulfilledError(context) {
      return context[ldsBindings.ADAPTER_UNFULFILLED_ERROR] === true;
    }
    /**
     * W-8620679
     * Increment the counter for an UnfulfilledSnapshotError coming from luvio
     *
     * @param context The transaction context.
     */
    function incrementAdapterRequestErrorCount(context) {
      const adapterRequestErrorCounter = createMetricsKey(ADAPTER_ERROR_COUNT_METRIC_NAME, context.adapterName);
      observabilityInstrumentation.incrementCounter(adapterRequestErrorCounter);
      observabilityInstrumentation.incrementCounter(TOTAL_ADAPTER_ERROR_COUNT);
    }
    /**
     * W-10495632
     * Logs the missing paths and/or links associated with the UnfulfilledSnapshotError.
     *
     * @param context The transaction context.
     */
    function logAdapterRequestError(context) {
      ldsInstrumentation.error(ldsBindings.ADAPTER_UNFULFILLED_ERROR, sf_lds.adapterUnfulfilledErrorSchema, {
        adapter: context.adapterName,
        missing_paths: keys(context.missingPaths),
        missing_links: keys(context.missingLinks)
      });
    }
    /**
     * W-13639107
     * Logs when object info has changed
     */
    function logObjectInfoChanged() {
      ldsInstrumentation.log('objectInfoChanged');
    }
    /**
     * Increment the counter based on the cache policy type for an adapter call
     *
     * @param requestContext Adapter request context that includes cache policy
     */
    function incrementAdapterCachePolicyType(requestContext) {
      const cachePolicy = requestContext && requestContext.cachePolicy && requestContext.cachePolicy.type;
      if (cachePolicy !== undefined) {
        ldsInstrumentation.incrementCounter(CACHE_POLICY_COUNTERS[cachePolicy], 1);
        return;
      }
      ldsInstrumentation.incrementCounter(CACHE_POLICY_UNDEFINED_COUNTER, 1);
    }
    /**
     * Increment the counter based on missing recordTypeId in a record ingest
     *
     * @param apiName incoming API name for bad data
     */
    function incrementRecordTypeIdIsNullCount(apiName) {
      const adapterRequestErrorCounter = createMetricsKey(RECORD_TYPE_ID_IS_NULL_COUNT, apiName);
      observabilityInstrumentation.incrementCounter(adapterRequestErrorCounter);
    }
    /**
     * Logs when adapter requests come in. If we have subsequent cache misses on a given config, beyond its TTL then log the duration to metrics.
     * Backed by an LRU Cache implementation to prevent too many record entries from being stored in-memory.
     * @param name The wire adapter name.
     * @param config The config passed into wire adapter.
     * @param currentCacheMissTimestamp Timestamp for when the request was made.
     * @param ttl TTL for the wire adapter.
     * @param durationMetricName Name for duration metric.
     * @param counterMetricName Name for counter metric.
     */
    const adapterCacheMisses = new LRUCache(250);
    function logAdapterCacheMissOutOfTtlDuration(name, config, currentCacheMissTimestamp, ttl, counterMetricName, durationMetricName) {
      const configKey = `${name}:${stableJSONStringify(config)}`;
      const existingCacheMissTimestamp = adapterCacheMisses.get(configKey);
      adapterCacheMisses.set(configKey, currentCacheMissTimestamp);
      if (existingCacheMissTimestamp !== undefined) {
        const duration = currentCacheMissTimestamp - existingCacheMissTimestamp;
        if (duration > ttl) {
          ldsInstrumentation.incrementCounter(counterMetricName, 1);
          ldsInstrumentation.trackValue(durationMetricName, duration);
        }
      }
    }
    /**
     * Starts an o11y Activity using the supplied o11y Instrumention and adapterName.
     * If a requestContext is supplied, we check for the existence of a requestCorrelator containing an ObservabilityContext.
     * If an ObservabilityContext is defined, we build an object that conforms to the ApiOptions interface required by the startActivity API
     */
    function startAdapterActivity(instrumentation, adapterName, requestContext) {
      if (requestContext === undefined || requestContext.requestCorrelator === undefined || getObservabilityContext(requestContext) === undefined) {
        return instrumentation.startActivity(adapterName);
      }
      const {
        traceId,
        ...rest
      } = requestContext.requestCorrelator.observabilityContext;
      const apiOptions = {
        instrumentationContext: rest
      };
      if (traceId !== undefined) {
        apiOptions.instrumentationContext.parentId = traceId;
      }
      return instrumentation.startActivity(adapterName, apiOptions);
    }
    const executeAsyncActivityDefaultOptions = {
      LOG_ERROR_ONLY: false
    };
    /**
     * Starts an async o11y Activity using ldsInstrumentation.
     *
     * Heavily borrowed from o11y asyncActivity, but actually swallows the error instead of rethrowing.
     *
     */
    async function executeAsyncActivity(name, execute, options) {
      var _a, _b, _c, _d;
      const normalizedOptions = Object.assign({}, executeAsyncActivityDefaultOptions, options);
      const act = ldsInstrumentation.startActivity(name, options);
      let isError = false;
      try {
        return await execute(act);
      } catch (err) {
        // eslint-disable-next-line @salesforce/lds/no-optional-chaining
        if ((_a = normalizedOptions.errorPayload) === null || _a === void 0 ? void 0 : _a.schema) {
          act.error(err, normalizedOptions.errorPayload.schema,
          // eslint-disable-next-line @salesforce/lds/no-optional-chaining
          (_b = normalizedOptions.errorPayload) === null || _b === void 0 ? void 0 : _b.payload);
        } else {
          act.error(err, normalizedOptions.ERROR_SCOPE);
        }
        isError = true;
      } finally {
        if (normalizedOptions.LOG_ERROR_ONLY && !isError) {
          act.discard();
        } else {
          act.stop(
          // eslint-disable-next-line @salesforce/lds/no-optional-chaining
          (_c = normalizedOptions === null || normalizedOptions === void 0 ? void 0 : normalizedOptions.stopPayload) === null || _c === void 0 ? void 0 : _c.schema,
          // eslint-disable-next-line @salesforce/lds/no-optional-chaining
          (_d = normalizedOptions === null || normalizedOptions === void 0 ? void 0 : normalizedOptions.stopPayload) === null || _d === void 0 ? void 0 : _d.payload);
        }
      }
    }
    function instrumentAdapter(adapter, metadata, adapterInstrumentationOptions) {
      const {
        apiFamily,
        name,
        ttl
      } = metadata;
      let trackL1Hits = false;
      let trackL2Hits = false;
      let trackCacheMisses = false;
      let reportObserver = undefined;
      if (adapterInstrumentationOptions !== undefined) {
        ({
          trackL1Hits,
          trackL2Hits,
          trackCacheMisses,
          reportObserver
        } = adapterInstrumentationOptions);
      }
      const adapterName = normalizeAdapterName(name, apiFamily);
      /**
       * W-8076905
       * Dynamically generated metric. Simple counter for all requests made by this adapter.
       */
      const wireAdapterRequestMetric = createMetricsKey(ADAPTER_INVOCATION_COUNT_METRIC_NAME, adapterName);
      /**
       * W-6981216
       * Dynamically generated metric. Simple counter for cache hits by adapter name.
       */
      const cacheHitCountByAdapterMetric = createMetricsKey(ADAPTER_CACHE_HIT_COUNT_METRIC_NAME, adapterName);
      /**
       * W-10490326
       * Dynamically generated metric. Simple counter for L2 cache hits by adapter name.
       */
      const l2CacheHitCountByAdapterMetric = createMetricsKey(ADAPTER_CACHE_HIT_L2_COUNT_METRIC_NAME, adapterName);
      /**
       * W-7404607
       * Dynamically generated metric. Timer for cache hits by adapter name.
       */
      const cacheHitDurationByAdapterMetric = createMetricsKey(ADAPTER_CACHE_HIT_DURATION_METRIC_NAME, adapterName);
      /**
       * W-10490326
       * Dynamically generated metric. Timer for L2 cache hits by adapter name.
       */
      const l2CacheHitDurationByAdapterMetric = createMetricsKey(ADAPTER_CACHE_HIT_L2_DURATION_METRIC_NAME, adapterName);
      /**
       * W-6981216
       * Dynamically generated metric. Simple counter for cache misses by adapter name.
       */
      const cacheMissCountByAdapterMetric = createMetricsKey(ADAPTER_CACHE_MISS_COUNT_METRIC_NAME, adapterName);
      /**
       * W-7404607
       * Dynamically generated metric. Timer for cache hits by adapter name.
       */
      const cacheMissDurationByAdapterMetric = createMetricsKey(ADAPTER_CACHE_MISS_DURATION_METRIC_NAME, adapterName);
      /**
       * W-7376275
       * Dynamically generated metric. Measures the amount of time it takes for LDS to get another cache miss on
       * a request we've made in the past.
       * Request Record 1 -> Record 2 -> Back to Record 1 outside of TTL is an example of when this metric will fire.
       */
      const cacheMissOutOfTtlDurationByAdapterMetric = createMetricsKey(ADAPTER_CACHE_MISS_OUT_OF_TTL_DURATION_METRIC_NAME, adapterName);
      const cacheMissOutOfTtlCountByAdapterMetric = createMetricsKey(ADAPTER_CACHE_MISS_OUT_OF_TTL_COUNT_METRIC_NAME, adapterName);
      const instrumentedAdapter = (config, requestContext) => {
        // increment adapter request metrics
        observabilityInstrumentation.incrementCounter(wireAdapterRequestMetric, 1);
        observabilityInstrumentation.incrementCounter(TOTAL_ADAPTER_REQUEST_SUCCESS_COUNT, 1);
        // increment cache policy metrics
        incrementAdapterCachePolicyType(requestContext);
        // start collecting
        const activity = startAdapterActivity(ldsInstrumentation, adapterName, requestContext);
        // swap in activity's Id if observabilityContext exists
        updateRequestContext(activity, requestContext);
        return runAdapterWithReport(metadata.name, adapter, config, requestContext || {}, report => {
          const {
            executionTime
          } = report;
          switch (report.result) {
            case 'l1-hit':
              {
                ldsInstrumentation.incrementCounter(ADAPTER_CACHE_HIT_COUNT_METRIC_NAME, 1);
                ldsInstrumentation.incrementCounter(cacheHitCountByAdapterMetric, 1);
                ldsInstrumentation.trackValue(cacheHitDurationByAdapterMetric, executionTime);
                if (trackL1Hits) {
                  activity.stop('l1-hit');
                } else {
                  activity.discard();
                }
                break;
              }
            case 'l2-hit':
              {
                let tags = undefined;
                if (report.stale === true) {
                  tags = {
                    [STALE_TAG]: true
                  };
                }
                ldsInstrumentation.incrementCounter(ADAPTER_CACHE_HIT_L2_COUNT_METRIC_NAME, 1, undefined, tags);
                ldsInstrumentation.incrementCounter(l2CacheHitCountByAdapterMetric, 1, undefined, tags);
                ldsInstrumentation.trackValue(l2CacheHitDurationByAdapterMetric, executionTime, undefined, tags);
                if (trackL2Hits) {
                  activity.stop('l2-hit');
                } else {
                  activity.discard();
                }
                break;
              }
            case 'cache-miss':
              {
                ldsInstrumentation.trackValue(cacheMissDurationByAdapterMetric, executionTime);
                ldsInstrumentation.incrementCounter(ADAPTER_CACHE_MISS_COUNT_METRIC_NAME, 1);
                ldsInstrumentation.incrementCounter(cacheMissCountByAdapterMetric, 1);
                if (trackCacheMisses) {
                  activity.stop('cache-miss');
                } else {
                  activity.discard();
                }
                if (ttl !== undefined) {
                  logAdapterCacheMissOutOfTtlDuration(adapterName, config, Date.now(), ttl, cacheMissOutOfTtlCountByAdapterMetric, cacheMissOutOfTtlDurationByAdapterMetric);
                }
              }
              break;
            case 'error':
              {
                const error = report.error;
                // We are capturing userland transient errors through here, and
                // there is a chance that these errors could contain PII, as seen in W-12224448.
                // Log AdapterErrors only
                if (isAdapterError(error)) {
                  activity.error(error);
                }
                activity.stop('error');
              }
              break;
            case 'exception':
            case 'invalid-config':
              {
                activity.discard();
              }
              break;
            default:
              {
                {
                  throw new Error(`unsupported adapter result`);
                }
              }
          }
          if (reportObserver !== undefined) {
            reportObserver(report);
          }
        });
      };
      // Set the name property on the function for debugging purposes.
      Object.defineProperty(instrumentedAdapter, 'name', {
        value: name + '__instrumented'
      });
      return isGraphqlAdapter(name) === true ? instrumentGraphqlAdapter(instrumentedAdapter) : instrumentedAdapter;
    }
    /**
     * Replaces observabilityContext's traceId with parentActivity's Id since traceId
     * is treated as parentId when observabilityContext is passed to native as part of
     * the network request.
     * @param parentActivity
     * @param requestContext
     */
    function updateRequestContext(parentActivity, requestContext) {
      if (requestContext !== undefined) {
        const observabilityContext = getObservabilityContext(requestContext);
        if (observabilityContext !== undefined) {
          observabilityContext.traceId = parentActivity.getId();
        }
      }
    }
    function getObservabilityContext(requestContext) {
      return requestContext.requestCorrelator !== undefined ? requestContext.requestCorrelator.observabilityContext : undefined;
    }
    /**
     * Any graphql get adapter specific instrumentation that we need to log
     * @param snapshot from either in-memory or built after a network hit
     */
    function logGraphqlMetrics(snapshot, config) {
      // We have both data and error in the returned response
      const {
        data: snapshotData
      } = snapshot;
      if (snapshotData && snapshotData.data && keys(snapshotData.data).length > 0 && snapshotData.errors && snapshotData.errors.length > 0) {
        ldsInstrumentation.incrementCounter(GET_GRAPHQL_RESPONSE_MIXED);
      }
      if (config && 'useUiApiAdapter' in config && config.useUiApiAdapter === false) {
        // using legacy adapter
        ldsInstrumentation.incrementCounter(GRAPHQL_LEGACY_ADAPTER_USAGE_COUNT);
        if (snapshotData && snapshotData.errors && snapshotData.errors.length > 0) {
          // track errors in legacy adapter responses
          ldsInstrumentation.incrementCounter(GRAPHQL_LEGACY_ADAPTER_ERRORS_IN_RESPONSE_COUNT);
        }
      }
      if (snapshotData.errors && snapshotData.errors.length > 0) {
        // W-12293528 GraphQL metrics
        // log counts of returned errors
        let validationErrorCount = 0;
        let syntaxErrorCount = 0;
        let otherErrorCount = 0;
        // conslidate instrumentation calls with # of occurrences
        snapshotData.errors.forEach(e => {
          if (e.message && e.message.startsWith('Validation error')) {
            validationErrorCount++;
          } else if (e.message && e.message.startsWith('Invalid Syntax')) {
            syntaxErrorCount++;
          } else {
            otherErrorCount++;
          }
        });
        if (validationErrorCount > 0) {
          ldsInstrumentation.incrementCounter(GRAPHQL_QUERY_VALIDATION_ERROR_COUNT, validationErrorCount);
        }
        if (syntaxErrorCount > 0) {
          ldsInstrumentation.incrementCounter(GRAPHQL_QUERY_SYNTAX_ERROR_COUNT, syntaxErrorCount);
        }
        if (otherErrorCount > 0) {
          ldsInstrumentation.incrementCounter(GRAPHQL_QUERY_OTHER_ERROR_COUNT, otherErrorCount);
        }
      }
    }
    /**
     * Wraps methods to collect runtime performance using o11y's trackValue API
     * @param obj Object instance containing the methods to instrument
     * @param methods array containing objects with keys for the method name and the metric key to use in o11y
     */
    function instrumentMethods(obj, methods) {
      for (let i = 0, len = methods.length; i < len; i++) {
        const {
          methodName,
          metricKey
        } = methods[i];
        const originalMethod = obj[methodName];
        obj[methodName] = function (...args) {
          const startTime = Date.now();
          try {
            const res = originalMethod.call(this, ...args);
            const executionTime = Date.now() - startTime;
            // handle async resolved/rejected
            if (isPromise(res)) {
              res.then(() => {
                ldsInstrumentation.trackValue(metricKey, Date.now() - startTime);
              }).catch(_error => {
                ldsInstrumentation.trackValue(metricKey, Date.now() - startTime, true);
              });
            } else {
              // handle synchronous success
              ldsInstrumentation.trackValue(metricKey, executionTime);
            }
            return res;
          } catch (error) {
            // handle synchronous throw
            ldsInstrumentation.trackValue(metricKey, Date.now() - startTime, true);
            // rethrow error
            throw error;
          }
        };
      }
    }
    function createMetricsKey(name, unit) {
      let metricName = name;
      if (unit) {
        metricName = metricName + '.' + unit;
      }
      return metricName;
    }
    /**
     * Returns whether adapter is an Apex one or not.
     * @param adapterName The name of the adapter.
     */
    function isApexAdapter(adapterName) {
      return adapterName.indexOf(APEX_ADAPTER_NAME) > -1;
    }
    /**
     * Returns boolean whether adapter is a graphQL one or not.
     * @param adapterName The name of the adapter.
     */
    function isGraphqlAdapter(adapterName) {
      return adapterName === GRAPHQL_ADAPTER_NAME;
    }
    /**
     * Normalizes getApex adapter names to `Apex.getApex`. Non-Apex adapters will be prefixed with
     * API family, if supplied. Example: `UiApi.getRecord`.
     *
     * Note: If you are adding additional logging that can come from getApex adapter contexts that provide
     * the full getApex adapter name (i.e. getApex_[namespace]_[class]_[function]_[continuation]),
     * ensure to call this method to normalize all logging to 'getApex'. This
     * is because Argus has a 50k key cardinality limit. More context: W-8379680.
     *
     * @param adapterName The name of the adapter.
     * @param apiFamily The API family of the adapter.
     */
    function normalizeAdapterName(adapterName, apiFamily) {
      if (isApexAdapter(adapterName)) {
        return NORMALIZED_APEX_ADAPTER_NAME;
      }
      return apiFamily ? `${apiFamily}.${adapterName}` : adapterName;
    }
    /**
     * Logs an error to Splunk using o11y
     */
    function logError(err) {
      ldsInstrumentation.error(err);
    }
    /**
     * Calls instrumentation/service telemetry counter
     * @param name Name of the metric
     * @param value number to increment by, if undefined increment by 1
     */
    function incrementCounterMetric(name, number) {
      ldsInstrumentation.incrementCounter(name, number);
    }
    /**
     * Calls instrumentation/service telemetry percentileHistogram
     * @param name Name of the metric
     * @param value number used to update the percentileHistogram
     */
    function updatePercentileHistogramMetric(name, value) {
      ldsInstrumentation.trackValue(name, value);
    }
    function setAggregateUiChunkCountMetric(chunkCount) {
      updatePercentileHistogramMetric(AGGREGATE_UI_CHUNK_COUNT, chunkCount);
    }
    function incrementGetRecordNormalInvokeCount() {
      incrementCounterMetric(GET_RECORD_NORMAL_INVOKE_COUNT);
    }
    function incrementGetRecordAggregateInvokeCount() {
      incrementCounterMetric(GET_RECORD_AGGREGATE_INVOKE_COUNT);
    }
    function incrementGetRecordNotifyChangeAllowCount() {
      incrementCounterMetric(GET_RECORD_NOTIFY_CHANGE_ALLOW_COUNT);
    }
    function incrementGetRecordNotifyChangeDropCount() {
      incrementCounterMetric(GET_RECORD_NOTIFY_CHANGE_DROP_COUNT);
    }
    function incrementNotifyRecordUpdateAvailableAllowCount() {
      incrementCounterMetric(NOTIFY_RECORD_UPDATE_AVAILABLE_ALLOW_COUNT);
    }
    function incrementNotifyRecordUpdateAvailableDropCount() {
      incrementCounterMetric(NOTIFY_RECORD_UPDATE_AVAILABLE_DROP_COUNT);
    }
    function incrementNetworkRateLimitExceededCount() {
      incrementCounterMetric(NETWORK_RATE_LIMIT_EXCEEDED_COUNT);
    }
    function instrumentStoreTrimTask(callback) {
      return () => {
        ldsInstrumentation.incrementCounter(STORE_TRIM_TASK_COUNT);
        const startTime = Date.now();
        const res = callback();
        ldsInstrumentation.trackValue(STORE_TRIM_TASK_DURATION, Date.now() - startTime);
        // TODO [W-10060579]: replace record count per trim task with metric
        return res;
      };
    }
    function setStoreScheduler(store) {
      const originalScheduler = store.scheduler;
      store.scheduler = (callback, done) => {
        originalScheduler(instrumentStoreTrimTask(callback), done);
      };
    }
    function instrumentStoreStatsCallback(store) {
      return () => {
        const {
          snapshotSubscriptions,
          watchSubscriptions
        } = store;
        const records = store.fallbackStringKeyInMemoryStore.records;
        updatePercentileHistogramMetric(STORE_SIZE_COUNT, keys(records).length);
        if (GRAPHQL_RECORDS_KEY in records) {
          const graphQLRecordSize = keys(records[GRAPHQL_RECORDS_KEY]).length;
          updatePercentileHistogramMetric(STORE_GRAPHQL_SIZE_COUNT, graphQLRecordSize);
        }
        updatePercentileHistogramMetric(STORE_SNAPSHOT_SUBSCRIPTIONS_COUNT, keys(snapshotSubscriptions).length);
        updatePercentileHistogramMetric(STORE_WATCH_SUBSCRIPTIONS_COUNT, keys(watchSubscriptions).length);
      };
    }
    /**
     * Collects additional store statistics by tying its periodic,
     * point-in-time data collection with a luvio method
     * @param luvio
     * @param store
     */
    function setupStoreStatsCollection(luvio, callback) {
      const wrapMethod = 'storeBroadcast';
      const originalMethod = luvio[wrapMethod];
      const throttledCallback = throttle(callback, 200);
      luvio[wrapMethod] = function (...args) {
        throttledCallback();
        return originalMethod.call(this, ...args);
      };
    }
    /**
     * @param instrumentedAdapter
     * @returns instrumentedGraphqlAdapter, which logs additional metrics for get graphQL adapter
     */
    function instrumentGraphqlAdapter(instrumentedAdapter) {
      const instrumentedGraphqlAdapter = (config, requestContext) => {
        const result = instrumentedAdapter(config, requestContext);
        if (result === null) {
          return result;
        }
        if (isPromise(result)) {
          result.then(_snapshot => {
            logGraphqlMetrics(_snapshot, config);
          });
        } else {
          logGraphqlMetrics(result, config);
        }
        return result;
      };
      return instrumentedGraphqlAdapter;
    }
    /**
     * Sets up instrumentation for @salesforce/lds-adapters-uiapi
     */
    function setLdsAdaptersUiapiInstrumentation(uiapiRegistration) {
      uiapiRegistration.instrument({
        recordConflictsResolved: serverRequestCount => {
          // Ignore 0 values which can originate from ADS bridge
          if (serverRequestCount > 0) {
            updatePercentileHistogramMetric('record-conflicts-resolved', serverRequestCount);
          }
        },
        nullDisplayValueConflict: ({
          fieldType,
          areValuesEqual
        }) => {
          const metricName = `merge-null-dv-count.${fieldType}`;
          if (fieldType === 'scalar') {
            incrementCounterMetric(`${metricName}.${areValuesEqual}`);
          } else {
            incrementCounterMetric(metricName);
          }
        },
        getRecordNotifyChangeAllowed: incrementGetRecordNotifyChangeAllowCount,
        getRecordNotifyChangeDropped: incrementGetRecordNotifyChangeDropCount,
        notifyRecordUpdateAvailableAllowed: incrementNotifyRecordUpdateAvailableAllowCount,
        notifyRecordUpdateAvailableDropped: incrementNotifyRecordUpdateAvailableDropCount,
        recordTypeIdIsNull: incrementRecordTypeIdIsNullCount
      });
    }
    /**
     * Sets up instrumentation for @salesforce/lds-network-adapter
     */
    function setLdsNetworkAdapterInstrumentation(networkAdapterRegistration) {
      networkAdapterRegistration.instrument({
        aggregateUiChunkCount: cb => setAggregateUiChunkCountMetric(cb()),
        duplicateRequest: () => incrementCounterMetric(DUPLICATE_REQUEST_COUNT),
        getRecordAggregateInvoke: incrementGetRecordAggregateInvokeCount,
        getRecordNormalInvoke: incrementGetRecordNormalInvokeCount,
        networkRateLimitExceeded: incrementNetworkRateLimitExceededCount
      });
    }
    /**
     * Provides concrete implementations using o11y/client for instrumentation hooks
     */
    function setInstrumentationHooks() {
      ldsBindings.instrument({
        instrumentAdapter: instrumentAdapter
      });
    }
    /**
     * Initialize the instrumentation and instrument the LDS instance and the InMemoryStore.
     *
     * @param luvio The Luvio instance to instrument.
     * @param store The InMemoryStore to instrument.
     */
    function setupInstrumentation(luvio, store) {
      setInstrumentationHooks();
      instrumentStoreMethods(luvio);
      setupStoreStatsCollection(luvio, instrumentStoreStatsCallback(store));
      setStoreScheduler(store);
      setStoreEventObservers(store);
    }
    function instrumentStoreMethods(luvio, _store) {
      instrumentMethods(luvio, [{
        methodName: 'storeBroadcast',
        metricKey: STORE_BROADCAST_DURATION
      }, {
        methodName: 'storeIngest',
        metricKey: STORE_INGEST_DURATION
      }, {
        methodName: 'storeLookup',
        metricKey: STORE_LOOKUP_DURATION
      }, {
        methodName: 'storeSetTTLOverride',
        metricKey: STORE_SET_TTL_OVERRIDE_DURATION
      }, {
        methodName: 'storeSetDefaultTTLOverride',
        metricKey: STORE_SET_DEFAULT_TTL_OVERRIDE_DURATION
      }, {
        methodName: 'notifyStoreUpdateAvailable',
        metricKey: NOTIFY_STORE_UPDATE_AVAILABLE_DURATION
      }]);
    }
    function handleIngestedNewData(event) {
      if (event.type === 'cache-miss-out-of-ttl') {
        const {
          recordMetadata,
          oldSnapshot,
          newSnapshot
        } = event;
        const lastExpiredDurationEntry = cacheMissOutOfTtlDurations.get(event.recordId);
        if (lastExpiredDurationEntry !== undefined) {
          const representationName = `${recordMetadata.namespace}__${recordMetadata.representationName}`;
          let durationMetricName;
          let countMetricName;
          if (oldSnapshot !== newSnapshot) {
            durationMetricName = REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_DURATION_METRIC_NAME;
            countMetricName = REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_CHANGED_COUNT_METRIC_NAME;
          } else {
            durationMetricName = REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_DURATION_METRIC_NAME;
            countMetricName = REPRESENTATION_CACHE_MISS_OUT_OF_TTL_DATA_UNCHANGED_COUNT_METRIC_NAME;
          }
          const metricTags = {
            state: lastExpiredDurationEntry.storeResolveResultState,
            representationName: representationName
          };
          ldsInstrumentation.trackValue(durationMetricName, lastExpiredDurationEntry.value, undefined, metricTags);
          ldsInstrumentation.incrementCounter(countMetricName, 1, undefined, metricTags);
          cacheMissOutOfTtlDurations.delete(event.recordId);
        }
      }
    }
    const cacheMissOutOfTtlDurations = new LRUCache(250);
    function handleOnDataOutOfTtlDurationUpdate(event) {
      cacheMissOutOfTtlDurations.set(event.recordId, {
        value: event.lastExpiredDuration,
        storeResolveResultState: event.storeResolveResultState
      });
    }
    function setStoreEventObservers(store) {
      const cacheMissOutOfTtlEventObserver = {
        onCacheMissOutOfTtl: handleIngestedNewData
      };
      const cacheMissOutOfTtlDurationUpdateEventObserver = {
        onDataOutOfTtlDurationUpdate: handleOnDataOutOfTtlDurationUpdate
      };
      store.addStoreEventObserver(cacheMissOutOfTtlEventObserver);
      store.addStoreEventObserver(cacheMissOutOfTtlDurationUpdateEventObserver);
    }
    function onIdleDetected(callback) {
      client.idleDetector.requestIdleDetectedCallback(timestamp => {
        callback(timestamp);
      });
    }
    const instrumentation = new Instrumentation();
    // version: 1.309.0-dev21-4baf03ecaf
    const __lwc_hmr_context = { moduleHash : 'bac9ba4185ca2bb27aa2898afbc8e1e0' };
    if (lwc.hot) {
        lwc.hot.register('force/ldsInstrumentation/ldsInstrumentation.js', 'bac9ba4185ca2bb27aa2898afbc8e1e0', {"name":"ldsInstrumentation","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.Instrumentation = Instrumentation;
    exports.LRUCache = LRUCache;
    exports.METRIC_KEYS = metricKeys;
    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.executeAsyncActivity = executeAsyncActivity;
    exports.handleIngestedNewData = handleIngestedNewData;
    exports.handleOnDataOutOfTtlDurationUpdate = handleOnDataOutOfTtlDurationUpdate;
    exports.incrementCounterMetric = incrementCounterMetric;
    exports.incrementGetRecordNormalInvokeCount = incrementGetRecordNormalInvokeCount;
    exports.incrementGetRecordNotifyChangeAllowCount = incrementGetRecordNotifyChangeAllowCount;
    exports.incrementGetRecordNotifyChangeDropCount = incrementGetRecordNotifyChangeDropCount;
    exports.incrementNotifyRecordUpdateAvailableAllowCount = incrementNotifyRecordUpdateAvailableAllowCount;
    exports.incrementNotifyRecordUpdateAvailableDropCount = incrementNotifyRecordUpdateAvailableDropCount;
    exports.instrumentAdapter = instrumentAdapter;
    exports.instrumentLuvio = instrumentLuvio;
    exports.instrumentMethods = instrumentMethods;
    exports.instrumentStoreMethods = instrumentStoreMethods;
    exports.instrumentation = instrumentation;
    exports.logError = logError;
    exports.logObjectInfoChanged = logObjectInfoChanged;
    exports.onIdleDetected = onIdleDetected;
    exports.setInstrumentationHooks = setInstrumentationHooks;
    exports.setLdsAdaptersUiapiInstrumentation = setLdsAdaptersUiapiInstrumentation;
    exports.setLdsNetworkAdapterInstrumentation = setLdsNetworkAdapterInstrumentation;
    exports.setStoreEventObservers = setStoreEventObservers;
    exports.setupInstrumentation = setupInstrumentation;
    exports.startAdapterActivity = startAdapterActivity;
    exports.updatePercentileHistogramMetric = updatePercentileHistogramMetric;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('force/ldsEngine', ['exports', 'lwc', 'force/luvioEngine', 'force/ldsNetwork'], (function (exports, lwc, luvioEngine, networkAdapter) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var networkAdapter__default = /*#__PURE__*/_interopDefaultCompat(networkAdapter);

    /*
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */
    /**
     * Callbacks to be invoked when registrations happen,
     */
    const callbacks$1 = [];
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
      callbacks$1.push(callback);
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
      callbacks$1.forEach(callback => callback(r));
    }

    /*
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */
    // most recently set default Luvio instance
    let defaultLuvio;
    // callbacks to be invoked when default luvio instance is set/changed
    let callbacks = [];
    /**
     * Constructs/sets the default Luvio instance. Any previously-set default luvio instance
     * is overwritten.
     */
    function setDefaultLuvio(params) {
      const newLuvio = 'luvio' in params ? params.luvio : 'environment' in params ? new luvioEngine.Luvio(params.environment) : 'networkAdapter' in params ? new luvioEngine.Luvio(new luvioEngine.Environment(params.store || new luvioEngine.InMemoryStore(), params.networkAdapter)) : undefined;
      if (newLuvio === undefined) {
        // eslint-disable-next-line @salesforce/lds/no-error-in-production
        throw new Error('unable to construct default Luvio instance from supplied parameters');
      }
      defaultLuvio = newLuvio;
      // inform observers
      for (let i = 0; i < callbacks.length; ++i) {
        callbacks[i](defaultLuvio);
      }
    }
    /**
     * Registers a callback to be invoked with the default Luvio instance. Note that the
     * callback may be invoked multiple times if the default Luvio changes.
     *
     * @param callback callback to be invoked with default Luvio instance
     */
    function withDefaultLuvio(callback) {
      if (defaultLuvio) {
        callback(defaultLuvio);
      }
      callbacks.push(callback);
    }

    /*
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */
    // bundling of lds-default-luvio and @luvio/engine for core
    // The code in lds-runtime-aura (force/ldsEngineCreator) depends on Aura module
    // services to invoke its LDS initialization logic. Unfortunately, Aura component
    // tests do not support module services and have no analogous function. The net
    // result is that LDS is never initialized in the iframe that loads the Aura
    // component test & any attempts to create an LWC component that uses an LDS
    // adapter fail because the wire adapter constructors are undefined (W-9233247).
    //
    // The code below is the least offensive workaround we could come up with. When
    // this code (force/ldsEngine) is loaded via static imports in an Aura component
    // test iframe, it will perform a minimal initialization of LDS that allows
    // the test to run and access data on the server. The instrumentation and
    // configuration initialization steps from lds-runtime-aura are skipped to
    // keep the logic simpler & faster.
    //
    // For future reference, here are the values we see from getApp():
    //
    // - for a regular .app, the name of the app, e.g. "one:one"
    // - for the top-level iframe of a .app loaded in JSTEST mode, "aurajstest:jstest"
    // - for the top-level iframe of a .cmp loaded in JSTEST mode, undefined
    // - for a test iframe of a .cmp or .app test loaded via
    //   /auratest/test.app?testName=..&aura.mode=AUTOJSTEST, undefined
    // - for a test iframe loaded via /aura?... (no clue where/how these are
    //   generated), undefined
    if (typeof $A !== 'undefined' && $A.getContext().getMode().indexOf('AUTOJSTEST') > -1 && $A.getContext().getApp() === undefined) {
      const storeOptions = {
        scheduler: () => {}
      };
      const store = new luvioEngine.InMemoryStore(storeOptions);
      const environment = new luvioEngine.Environment(store, networkAdapter__default.default);
      const luvio = new luvioEngine.Luvio(environment);
      setDefaultLuvio({
        luvio
      });
    }
    // version: 1.309.0-dev21-4baf03ecaf
    const __lwc_hmr_context = { moduleHash : '44acdf19617273204f54e88148b02c6d' };
    if (lwc.hot) {
        lwc.hot.register('force/ldsEngine/ldsEngine.js', '44acdf19617273204f54e88148b02c6d', {"name":"ldsEngine","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    Object.defineProperty(exports, 'Environment', {
        enumerable: true,
        get: function () { return luvioEngine.Environment; }
    });
    Object.defineProperty(exports, 'GraphNode', {
        enumerable: true,
        get: function () { return luvioEngine.GraphNode; }
    });
    Object.defineProperty(exports, 'HttpStatusCode', {
        enumerable: true,
        get: function () { return luvioEngine.HttpStatusCode; }
    });
    Object.defineProperty(exports, 'InMemoryStore', {
        enumerable: true,
        get: function () { return luvioEngine.InMemoryStore; }
    });
    Object.defineProperty(exports, 'Luvio', {
        enumerable: true,
        get: function () { return luvioEngine.Luvio; }
    });
    Object.defineProperty(exports, 'Reader', {
        enumerable: true,
        get: function () { return luvioEngine.Reader; }
    });
    Object.defineProperty(exports, 'StoreResolveResultState', {
        enumerable: true,
        get: function () { return luvioEngine.StoreResolveResultState; }
    });
    Object.defineProperty(exports, 'adapterToNetworkPriority', {
        enumerable: true,
        get: function () { return luvioEngine.adapterToNetworkPriority; }
    });
    Object.defineProperty(exports, 'coerceAdapterRequestContext', {
        enumerable: true,
        get: function () { return luvioEngine.coerceAdapterRequestContext; }
    });
    Object.defineProperty(exports, 'createCustomAdapterEventEmitter', {
        enumerable: true,
        get: function () { return luvioEngine.createCustomAdapterEventEmitter; }
    });
    Object.defineProperty(exports, 'emitAdapterEvent', {
        enumerable: true,
        get: function () { return luvioEngine.emitAdapterEvent; }
    });
    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.forEachRegistration = forEachRegistration;
    exports.register = register;
    exports.setDefaultLuvio = setDefaultLuvio;
    exports.withDefaultLuvio = withDefaultLuvio;
    exports.withRegistration = withRegistration;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('force/ldsEngineWebruntime', ['exports', 'lwc', 'lwr/environment', 'force/ldsEngine', 'force/ldsNetwork', 'force/ldsInstrumentation'], (function (exports, lwc, environment$1, ldsEngine, networkAdapter, ldsInstrumentation) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var networkAdapter__default = /*#__PURE__*/_interopDefaultCompat(networkAdapter);

    const serverData = globalThis.CLWR?.serverData || globalThis.LWR?.serverData || {};
    const store = new ldsEngine.InMemoryStore({
      initialData: serverData.initialData?.lds || Object.values(serverData)[0]?.initialData?.lds,
      resetInitialDataTtls: !environment$1.isServer
    });

    // remove initial data from memory
    delete globalThis.CLWR?.serverData?.initialData?.lds;
    const environment = new ldsEngine.Environment(store, networkAdapter__default.default);
    const luvio = new ldsEngine.Luvio(environment, {
      instrument: ldsInstrumentation.instrumentation.instrumentLuvio.bind(ldsInstrumentation.instrumentation)
    });
    ldsInstrumentation.setupInstrumentation(luvio, store);
    ldsEngine.withRegistration('@salesforce/lds-network-adapter', reg => ldsInstrumentation.setLdsNetworkAdapterInstrumentation(reg));
    ldsEngine.withRegistration('@salesforce/lds-adapters-uiapi', reg => ldsInstrumentation.setLdsAdaptersUiapiInstrumentation(reg));
    ldsEngine.setDefaultLuvio({
      luvio
    });
    function serializeDataStore() {
      return store.serialize();
    }
    const __lwc_hmr_context = { moduleHash : 'e8e9a06529d44b31da6eb4f153e4fee3' };
    if (lwc.hot) {
        lwc.hot.register('force/ldsEngineWebruntime/ldsEngineWebruntime.js', 'e8e9a06529d44b31da6eb4f153e4fee3', {"name":"ldsEngineWebruntime","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    Object.defineProperty(exports, 'Environment', {
        enumerable: true,
        get: function () { return ldsEngine.Environment; }
    });
    Object.defineProperty(exports, 'GraphNode', {
        enumerable: true,
        get: function () { return ldsEngine.GraphNode; }
    });
    Object.defineProperty(exports, 'HttpStatusCode', {
        enumerable: true,
        get: function () { return ldsEngine.HttpStatusCode; }
    });
    Object.defineProperty(exports, 'InMemoryStore', {
        enumerable: true,
        get: function () { return ldsEngine.InMemoryStore; }
    });
    Object.defineProperty(exports, 'Luvio', {
        enumerable: true,
        get: function () { return ldsEngine.Luvio; }
    });
    Object.defineProperty(exports, 'Reader', {
        enumerable: true,
        get: function () { return ldsEngine.Reader; }
    });
    Object.defineProperty(exports, 'forEachRegistration', {
        enumerable: true,
        get: function () { return ldsEngine.forEachRegistration; }
    });
    Object.defineProperty(exports, 'register', {
        enumerable: true,
        get: function () { return ldsEngine.register; }
    });
    Object.defineProperty(exports, 'setDefaultLuvio', {
        enumerable: true,
        get: function () { return ldsEngine.setDefaultLuvio; }
    });
    Object.defineProperty(exports, 'withDefaultLuvio', {
        enumerable: true,
        get: function () { return ldsEngine.withDefaultLuvio; }
    });
    Object.defineProperty(exports, 'withRegistration', {
        enumerable: true,
        get: function () { return ldsEngine.withRegistration; }
    });
    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.serializeDataStore = serializeDataStore;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
