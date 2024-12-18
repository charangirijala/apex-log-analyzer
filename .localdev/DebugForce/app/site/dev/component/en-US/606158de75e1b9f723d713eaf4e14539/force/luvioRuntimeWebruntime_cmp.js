(function() { LWR.define('force/luvioRuntime', ['exports', 'lwc'], (function (exports, lwc) {

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

    const {
      create,
      freeze,
      keys
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
      stringify
    } = JSON;
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
      const objKeys = keys(node).sort();
      out = '';
      for (i = 0; i < objKeys.length; i++) {
        const key = objKeys[i];
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
    function resolvedPromiseLike(result) {
      // Don't nest anything promise like
      if (isPromiseLike(result)) {
        return result.then(nextResult => nextResult);
      }
      return {
        then: (onFulfilled, _onRejected) => {
          if (onFulfilled) {
            try {
              return resolvedPromiseLike(onFulfilled(result));
            } catch (e) {
              return rejectedPromiseLike(e);
            }
          }
          // assume TResult1 == Result and just pass result down the chain
          return resolvedPromiseLike(result);
        }
      };
    }
    /**
     * Returns a PromiseLike object that rejects with the specified reason.
     *
     * @param reason rejection value
     * @returns PromiseLike that rejects with reason
     */
    function rejectedPromiseLike(reason) {
      if (isPromiseLike(reason)) {
        return reason.then(nextResult => nextResult);
      }
      return {
        then: (_onFulfilled, onRejected) => {
          if (onRejected) {
            try {
              return resolvedPromiseLike(onRejected(reason));
            } catch (e) {
              return rejectedPromiseLike(e);
            }
          }
          // assume TResult2 == Result and just pass rejection down the chain
          return rejectedPromiseLike(reason);
        }
      };
    }
    function isPromiseLike(value) {
      return value instanceof Promise || typeof value === 'object' && value !== null && hasOwnProperty.call(value, 'then') && typeof value.then === 'function';
    }

    /**
     * Converts an arbitrary value to an Error.
     *
     * @param x anything
     * @returns Error corresponding to x
     */
    function toError(x) {
      if (x instanceof Error) {
        return x;
      }
      return new Error(`${x}`);
    }
    /**
     * Recursively compares two values and indicates if they are equal.
     *
     * @param x first value
     * @param y second value
     * @returns true if x and y are recursively equal to each other; false if not
     */
    function deepEquals(x, y) {
      if (x === undefined) {
        return y === undefined;
      } else if (x === null) {
        return y === null;
      } else if (Array.isArray(x)) {
        if (!Array.isArray(y) || x.length !== y.length) {
          return false;
        }
        for (let i = 0; i < x.length; ++i) {
          if (!deepEquals(x[i], y[i])) {
            return false;
          }
        }
        return true;
      } else if (typeof x === 'object') {
        if (typeof y !== 'object') {
          return false;
        }
        const xkeys = Object.keys(x);
        const ykeys = Object.keys(y);
        if (xkeys.length !== ykeys.length) {
          return false;
        }
        for (let i = 0; i < xkeys.length; ++i) {
          const key = xkeys[i];
          if (!deepEquals(x[key], y[key])) {
            return false;
          }
        }
        return true;
      }
      return x === y;
    }

    // an error to indicate that the data inside a WithErrors construct
    // is missing or incomplete
    class DataNotFoundError extends Error {
      /*LWC compiler v7.1.5*/
    }

    /**
     * Implementation of CacheInclusionPolicy that uses a single level, in memory,
     * synchronous L1 cache.
     */
    class InMemoryCacheInclusionPolicy {
      /**
       * Reads data out of a single level in memory store.
       */
      read(options) {
        const {
          l1Cache,
          readFromL1
        } = options;
        // let read() try to get the result
        const readResult = readFromL1(l1Cache);
        return resolvedPromiseLike(readResult);
      }
      /**
       * Writes data to a single level in memory store.
       */
      write(options) {
        const {
          l1Cache,
          writeToL1
        } = options;
        writeToL1(l1Cache);
        return resolvedPromiseLike(undefined);
      }
    }

    /**
     * A simple in-memory implementation of the Store interface.
     */
    class InMemoryStore {
      constructor() {
        this.data = {};
      }
      // TODO - only intended for use in tests. We should refactor this into a subclass &
      // add to a test util library.
      clear() {
        this.data = {};
      }
      delete(key, _options) {
        delete this.data[key];
      }
      get(key, _options) {
        return this.data[key];
      }
      set(key, value, _options) {
        this.data[key] = value;
      }
      length() {
        return this.keys().length;
      }
      keys() {
        return new KeySet(Object.keys(this.data));
      }
    }
    /**
     * A simple in-memory implementation of the MetadataRepository interface.
     */
    class InMemoryMetadataRepository {
      constructor() {
        this.data = {};
      }
      // TODO - only intended for use in tests. We should refactor this into a subclass &
      // add to a test util library.
      clear() {
        this.data = {};
      }
      delete(key, _options) {
        delete this.data[key];
      }
      get(key, _options) {
        return this.data[key];
      }
      set(key, value, _options) {
        this.data[key] = value;
      }
      setPartial(key, value, _options) {
        const metadata = this.get(key);
        if (metadata === undefined) {
          throw new Error(`Metadata for key "${key}" not found`);
        }
        this.data[key] = {
          ...metadata,
          ...value
        };
      }
      expire(key, options) {
        const {
          expirationTime = Date.now()
        } = options || {};
        this.setPartial(key, {
          expirationTime
        });
      }
    }
    const SERIALIZED_STORE_VERSION = '1';
    function serialize(services) {
      return services.store.keys().elements().reduce((acc, key) => {
        acc.data[key] = services.store.get(key);
        const metadata = services['metadata-repository'].get(key);
        if (metadata) {
          acc.metadata[key] = metadata;
        }
        return acc;
      }, {
        version: SERIALIZED_STORE_VERSION,
        data: {},
        metadata: {}
      });
    }
    function deserializeToInMemoryServices(serialized, options = {}) {
      if (serialized.version !== SERIALIZED_STORE_VERSION) {
        throw new Error('unrecognized serialization version');
      }
      const services = {
        store: new InMemoryStore(),
        'metadata-repository': new InMemoryMetadataRepository()
      };
      const {
        ingestionTime
      } = options;
      // It's safe to write data/metadata since newly-constructed services will be empty
      Object.entries(serialized.data).forEach(([key, value]) => services.store.set(key, value));
      Object.entries(serialized.metadata).forEach(([key, value]) => {
        const metadata = typeof ingestionTime === 'number' ? {
          ...value,
          ingestionTime,
          expirationTime: ingestionTime + value.expirationTime - value.ingestionTime
        } : {
          ...value
        };
        services['metadata-repository'].set(key, metadata);
      });
      return services;
    }

    /**
     * A collection of keys, in no particular order.
     */
    class KeySet {
      constructor(initialKeys) {
        this.data = {};
        this.lengthInternal = 0;
        if (initialKeys) {
          initialKeys.forEach(key => {
            this.add(key);
          });
        }
      }
      add(key) {
        this.data[key] = true;
        this.lengthInternal++;
      }
      contains(key) {
        return this.data[key] === true;
      }
      elements() {
        return Object.keys(this.data);
      }
      get length() {
        return this.lengthInternal;
      }
      overlaps(other) {
        const otherKeys = other.elements();
        for (let j = 0; j < otherKeys.length; ++j) {
          if (this.contains(otherKeys[j])) {
            return true;
          }
        }
        return false;
      }
      difference(other) {
        const value = new KeySet();
        this.elements().forEach(key => {
          if (!other.contains(key)) {
            value.add(key);
          }
        });
        return value;
      }
      isSubsetOf(other) {
        return this.difference(other).length === 0;
      }
      equals(other) {
        return this.length === other.length && this.elements().every(key => other.contains(key));
      }
    }

    /**
     * A RecordableStore wraps another Store and is used to record which keys in the
     * other Store are read/written.
     */
    class RecordableStore {
      constructor(baseStore) {
        this.baseStore = baseStore;
        this.keysRead = new KeySet();
        this.missingKeysRead = new KeySet();
        this.keysUpdated = new KeySet();
      }
      delete(key, options) {
        this.keysUpdated.add(key);
        this.baseStore.delete(key, options);
      }
      get(key, options) {
        this.keysRead.add(key);
        const value = this.baseStore.get(key, options);
        if (value === undefined) {
          this.missingKeysRead.add(key);
        }
        return value;
      }
      set(key, value, options) {
        this.keysUpdated.add(key);
        this.baseStore.set(key, value, options);
      }
      length() {
        return this.baseStore.length();
      }
      keys() {
        return this.baseStore.keys();
      }
    }

    /**
     * A TTLFilteredStore wraps another Store and filters data from that Store
     * to entries whose metadata indicates that it has not yet expired.
     */
    class TTLFilteredStore {
      constructor(baseStore, metadataRepository, now = Date.now()) {
        this.baseStore = baseStore;
        this.metadataRepository = metadataRepository;
        this.now = now;
      }
      delete(key, options) {
        this.baseStore.delete(key, options);
      }
      get(key, options) {
        const metadata = this.metadataRepository.get(key);
        if (metadata && metadata.expirationTime <= this.now) {
          return undefined;
        }
        return this.baseStore.get(key, options);
      }
      set(key, value, options) {
        this.baseStore.set(key, value, options);
      }
      length() {
        return this.keys().length;
      }
      keys() {
        return new KeySet(this.baseStore.keys().elements().filter(key => this.get(key) !== undefined));
      }
    }

    /**
     * Implementation of CacheInclusionPolicy that uses an inclusive
     * L2 durable cache as a second level behind an in memory, synchronous,
     * L1 cache.
     */
    class DurableCacheInclusionPolicy {
      /**
       * Reads data out of a 2 level inclusive store.
       */
      read(options) {
        const {
          l1Cache,
          readFromL1
        } = options;
        // eavesdrop on which keys read() accesses
        const recordableStore = new RecordableStore(l1Cache);
        // let read() try to get the result
        const readResult = readFromL1(recordableStore);
        const {
          data,
          errors
        } = readResult;
        const cacheHit = data !== undefined && errors.length === 0;
        const errorEncountered = errors.length > 0 && !(errors[0] instanceof DataNotFoundError);
        if (cacheHit || errorEncountered) {
          return resolvedPromiseLike(readResult);
        }
        return this.revive(recordableStore.keysRead, l1Cache).then(revivedKeys => {
          if (recordableStore.keysRead.difference(revivedKeys).length > 0) {
            return resolvedPromiseLike(readResult);
          }
          return this.read({
            l1Cache,
            readFromL1
          });
        });
      }
      /**
       * Writes data to a 2 level inclusive store.
       */
      write(options) {
        const {
          l1Cache,
          writeToL1
        } = options;
        // eavesdrop on which keys write() accesses
        const tempRecordableStore = new RecordableStore(new InMemoryStore());
        // Write to a temp store to see what keys are ingested
        writeToL1(tempRecordableStore);
        // Try to read those keys from the existing store to see what keys are missing and need to be revived
        const keysToReviveRecordableStore = new RecordableStore(l1Cache);
        tempRecordableStore.keysUpdated.elements().forEach(key => keysToReviveRecordableStore.get(key));
        // Revive missing keys
        const missingKeys = keysToReviveRecordableStore.missingKeysRead;
        const revivePromiseLike = missingKeys.length > 0 ? this.revive(missingKeys, l1Cache).then(() => undefined) : resolvedPromiseLike(undefined);
        return revivePromiseLike.then(() => {
          // Do real write
          const recordableStore = new RecordableStore(l1Cache);
          writeToL1(recordableStore);
          return this.syncToL2Cache(recordableStore.keysUpdated, l1Cache);
        });
      }
    }
    function isCacheHitOrError(value) {
      // return cache result if data was found or error was encountered
      const {
        data,
        errors
      } = value;
      const cacheHit = data !== undefined && errors.length === 0;
      const errorEncountered = errors.length > 0 && !(errors[0] instanceof DataNotFoundError);
      return cacheHit || errorEncountered;
    }
    class CacheThenNetworkPolicy {
      constructor(runtime) {
        this.runtime = runtime;
        this.policyName = 'cache-then-network';
      }
      run(options) {
        const {
          readFromCache: readFromCacheOriginal,
          readFromNetwork: readFromNetworkOriginal,
          writeToCache: writeToCacheOriginal,
          buildResult
        } = options;
        // filter what data readFromCache is allowed to access from the store
        const now = Date.now();
        let ttlStore = new TTLFilteredStore(this.runtime.store, this.runtime.metadataRepository, now);
        const {
          readFromCache: readFromCacheDedupe,
          readFromNetwork: readFromNetworkDedupe,
          writeToCache: writeToCacheDedupe
        } = this.runtime.requestDeduplicationService.applyDedupe({
          readFromCache: store => this.readWithValidation(() => readFromCacheOriginal(store)),
          readFromNetwork: readFromNetworkOriginal,
          writeToCache: (store, networkResult) => this.writeWithValidation(() => writeToCacheOriginal(networkResult, store, this.runtime.metadataRepository, this.runtime.keySubscriptionService))
        });
        return readFromCacheDedupe(ttlStore).then(value => {
          if (isCacheHitOrError(value)) {
            return value;
          }
          // result not found in cache, try network
          return readFromNetworkDedupe().then(value => {
            return writeToCacheDedupe(this.runtime.store, value).then(() => value);
          }).then(value => {
            const builtResult = buildResult(value, this.runtime.store);
            this.runtime.cachePolicyValidator.validateBuildResult(builtResult);
            return builtResult;
          });
        });
      }
      readWithValidation(readFromCache) {
        const readResult = readFromCache();
        this.runtime.cachePolicyValidator.validateReadResult(readResult);
        return readResult;
      }
      writeWithValidation(writeToCache) {
        const writeResult = writeToCache();
        this.runtime.cachePolicyValidator.validateWriteResult(writeResult);
        return writeResult;
      }
    }
    class NoCachePolicy {
      constructor(runtime) {
        this.runtime = runtime;
        this.policyName = 'no-cache';
      }
      run(options) {
        const {
          readFromNetwork,
          writeToCache,
          buildResult
        } = options;
        return readFromNetwork().then(networkResult => {
          // ingest network result into cache
          const writeResult = writeToCache(networkResult, this.runtime.store, this.runtime.metadataRepository, this.runtime.keySubscriptionService);
          this.runtime.cachePolicyValidator.validateWriteResult(writeResult);
          return writeResult.then(result => {
            return {
              writeResult: result,
              networkResult
            };
          });
        }).then(value => {
          const builtResult = buildResult(value.networkResult, this.runtime.store);
          this.runtime.cachePolicyValidator.validateBuildResult(builtResult);
          return builtResult;
        });
      }
    }

    /**
     * A simple implementation of KeyKeySubscriptionService.
     */
    class DefaultKeySubscriptionService {
      constructor() {
        this.nextId = 1;
        this.subscriptions = [];
      }
      subscribe(options) {
        const subscriptionId = this.nextId++;
        const {
          subscription,
          callback
        } = options;
        this.subscriptions.push({
          subscriptionId,
          keys: subscription,
          callback
        });
        return () => {
          this.subscriptions = this.subscriptions.filter(subscription => subscription.subscriptionId !== subscriptionId);
        };
      }
      publish(keys, _options) {
        const subscriptions = this.subscriptions.slice();
        for (let i = 0; i < subscriptions.length; ++i) {
          const {
            keys: subscriptionKeys,
            callback
          } = subscriptions[i];
          if (keys.overlaps(subscriptionKeys)) {
            callback();
          }
        }
        return resolvedPromiseLike(undefined);
      }
    }
    const EventIdentifierWildcard = Symbol('EventIdentifierWildcard');
    /**
     * A simple implementation of EventKeySubscriptionService.
     */
    class DefaultEventSubscriptionService {
      constructor() {
        this.subscriptions = {};
      }
      subscribe(options) {
        const {
          subscription: eventSubscribe,
          callback
        } = options;
        let eventTypeSubscriptions = this.subscriptions[eventSubscribe.type];
        if (eventTypeSubscriptions === undefined) {
          eventTypeSubscriptions = [];
          this.subscriptions[eventSubscribe.type] = eventTypeSubscriptions;
        }
        const subscriptionMetadata = {
          callback,
          subscription: eventSubscribe
        };
        eventTypeSubscriptions.push(subscriptionMetadata);
        return () => {
          this.subscriptions[eventSubscribe.type] = eventTypeSubscriptions.filter(value => value !== subscriptionMetadata);
        };
      }
      publish(event, _options) {
        const eventTypeSubscriptions = this.subscriptions[event.type];
        if (eventTypeSubscriptions === undefined) {
          return resolvedPromiseLike(undefined);
        }
        const matchingSubscriptions = eventTypeSubscriptions.filter(subscriptionMetadata => {
          const keys$1 = Object.keys(event.identifiers);
          const subscriptionIdentifiers = subscriptionMetadata.subscription.identifiers;
          if (keys(subscriptionIdentifiers).length !== keys$1.length) {
            return false;
          }
          for (let i = 0; i < keys$1.length; i++) {
            const key = keys$1[i];
            const subscriptionIdValue = subscriptionIdentifiers[key];
            const eventIdValue = event.identifiers[key];
            if (subscriptionIdValue !== EventIdentifierWildcard && subscriptionIdValue !== eventIdValue) {
              return false;
            }
          }
          return true;
        });
        const promises = [];
        matchingSubscriptions.forEach(subscriptionMetadata => {
          const returnVal = subscriptionMetadata.callback(event);
          if (returnVal instanceof Promise) {
            promises.push(returnVal);
          }
        });
        if (promises.length > 0) {
          return Promise.all(promises).then(() => undefined);
        }
        return resolvedPromiseLike(undefined);
      }
    }
    function isSubscribable(x) {
      return 'subscribe' in x;
    }
    class OpaqueRepresentationType {
      constructor(namespace, typeName, ttl, buildKey) {
        this.namespace = namespace;
        this.typeName = typeName;
        this.ttl = ttl;
        this.buildKey = buildKey;
      }
      equals(x, y, _typeRegistry) {
        return stableJSONStringify(x) === stableJSONStringify(y);
      }
      read(key, store, _typeRegistry) {
        return store.get(key);
      }
      write(key, data, store, _typeRegistry, metadataRepository) {
        store.set(key, data);
        const now = Date.now();
        metadataRepository.set(key, {
          namespace: this.namespace,
          typeName: this.typeName,
          ingestionTime: now,
          expirationTime: now + this.ttl
        });
      }
    }

    /**
     * Error thrown by TypeRegistry.get() when a requested type is not found.
     */
    class TypeNotFoundError extends Error {
      /*LWC compiler v7.1.5*/
    }
    class DefaultTypeRegistry {
      constructor() {
        this.registry = {};
      }
      register(type, _options) {
        if (!this.registry[type.namespace]) {
          this.registry[type.namespace] = {};
        }
        this.registry[type.namespace][type.typeName] = type;
      }
      get(namespace, typeName, _options) {
        const registryNamespace = this.registry[namespace];
        if (!registryNamespace) {
          throw new TypeNotFoundError(`namespace ${namespace} not found`);
        }
        const type = registryNamespace[typeName];
        if (!type) {
          throw new TypeNotFoundError(`type ${typeName} not found in namespace ${namespace}`);
        }
        return type;
      }
    }
    class RequestDeduplicationService {
      constructor() {
        // TODO [W-12965475]: This class is a first pass at network deduplication. No consuming Commands should
        // directly try to leverage this, as it will be refactored/removed in the future.
        // This map tracks the mapping of the key set a given network request response is expected to contain
        // to that network request's outstanding promise. Entries are added to this map when a request has
        // a set of expected keys, and a new network request promise is created.
        this.outstandingNetworkRequests = new Map();
        // This map tracks the mapping of the keys a given read is waiting for to a resolve function that notifies the read
        // that the keys it needs may now be present in the cache. This resolve function can be called when any network
        // response is ingested, and the ingested keys contain the keys the read needs. This map is added to when
        // we believe that an outstanding request may contain the keys needed to satisfy a read.
        this.outstandingReads = new Map();
      }
      applyDedupe({
        readFromCache,
        readFromNetwork,
        writeToCache
      }) {
        const closureVariables = {
          expectedNetworkKeys: undefined
        };
        return {
          readFromCache: this.buildDedupedReadFromCache(readFromCache, closureVariables),
          readFromNetwork: this.buildDedupedReadFromNetwork(readFromNetwork, closureVariables),
          writeToCache: this.buildDedupedWriteToCache(writeToCache)
        };
      }
      buildDedupedReadFromCache(readFromCache, closureVariables) {
        const dedupedReadFromCache = store => {
          const recordableStore = new RecordableStore(store);
          return readFromCache(recordableStore).then(value => {
            const missingKeys = recordableStore.missingKeysRead;
            // if cache result was final, or we got a cache miss even though
            // we don't recognize anything as missing then we're done
            if (isCacheHitOrError(value) || missingKeys.length === 0) {
              return value;
            }
            // if we end up making a network request, we expect that it will return
            // everything that was initially missing
            if (!closureVariables.expectedNetworkKeys) {
              closureVariables.expectedNetworkKeys = missingKeys;
            }
            // build a list of the Promises for all the outstanding network requests
            // that are expected to return at least one of our missing keys
            let unrequestedKeys = new KeySet(missingKeys.elements());
            const matchingRequests = Array.from(this.outstandingNetworkRequests.entries()).reduce((matches, [outstandingRequestKeys, promise]) => {
              if (outstandingRequestKeys.overlaps(missingKeys)) {
                matches.push(promise);
                unrequestedKeys = unrequestedKeys.difference(outstandingRequestKeys);
              }
              return matches;
            }, []);
            // if outstanding requests are not expected to return all the keys we need,
            // return the cache read result
            if (unrequestedKeys.length > 0) {
              return value;
            }
            // Create a promise that can be resolved if any outstanding requests satisfy
            // the missing keys
            const otherResultMatchesPromise = new Promise(resolve => {
              this.outstandingReads.set(closureVariables.expectedNetworkKeys, resolve);
            });
            // wait for one of the matching network requests to come back, then retry
            return Promise.any([otherResultMatchesPromise, ...matchingRequests]).then(() => {
              this.outstandingReads.delete(closureVariables.expectedNetworkKeys);
              return dedupedReadFromCache(store);
            }).catch(() => {
              this.outstandingReads.delete(closureVariables.expectedNetworkKeys);
              return dedupedReadFromCache(store);
            });
          });
        };
        return dedupedReadFromCache;
      }
      buildDedupedReadFromNetwork(readFromNetwork, closureVariables) {
        return () => {
          if (closureVariables.expectedNetworkKeys === undefined || closureVariables.expectedNetworkKeys.length === 0) {
            return readFromNetwork();
          }
          const deleteOutstandingRequest = () => this.outstandingNetworkRequests.delete(closureVariables.expectedNetworkKeys);
          const networkPromise = readFromNetwork().then(value => {
            deleteOutstandingRequest();
            return value;
          }, reason => {
            deleteOutstandingRequest();
            return new Promise((_resolve, rejects) => {
              rejects(reason);
            });
          });
          this.outstandingNetworkRequests.set(closureVariables.expectedNetworkKeys, networkPromise);
          return networkPromise;
        };
      }
      buildDedupedWriteToCache(writeToCache) {
        return (store, networkResult) => {
          const recordableStore = new RecordableStore(store);
          const result = writeToCache(recordableStore, networkResult);
          return result.then(() => {
            const updatedKeys = recordableStore.keysUpdated;
            Array.from(this.outstandingReads.entries()).forEach(([outstandingReadKeys, resolve]) => {
              if (outstandingReadKeys.isSubsetOf(updatedKeys)) {
                resolve();
              }
            });
          });
        };
      }
    }

    /**
     * BaseCommand is an abstract implementation of SubscribableCommand. It adds the
     * notions of typed configuration, request context, and a set of runtime services
     * to the contract defined by Command/SubscribableCommand.
     */
    class BaseCommand {
      constructor(config, commandContext) {
        this.config = config;
        this.commandContext = commandContext;
      }
    }
    class BaseSubscribableCommand extends BaseCommand {
      /*LWC compiler v7.1.5*/
    }

    // Some implementations of trivial read/write command pairs
    /**
     * Generates a read/write command pair that maintain all state information
     * as local variables in a closure.
     *
     * @returns read/write commands for the specified data
     */
    function buildLocalStateCommands() {
      let subscribers = [];
      const currentValue = {
        data: undefined,
        errors: []
      };
      const subscribe = callback => {
        subscribers.push(callback);
        callback(currentValue);
        return () => {
          subscribers = subscribers.filter(cb => cb !== callback);
        };
      };
      const readCommand = {
        execute() {
          return resolvedPromiseLike({
            ...currentValue,
            subscribe
          });
        }
      };
      const writeCommand = {
        execute(args) {
          currentValue.data = args.newValue;
          subscribers.forEach(callback => callback(currentValue));
          return resolvedPromiseLike({
            ...currentValue
          });
        }
      };
      return [readCommand, writeCommand];
    }
    /**
     * Generates a read/write command pair that store data at a specified key in
     * a store, but maintain subscriber information as a local variable in a closure.
     *
     * @returns read/write commands for the specified data
     */
    function buildStoreBasedLocalStateCommands(store, key) {
      let subscribers = [];
      const subscribe = callback => {
        subscribers.push(callback);
        callback({
          data: store.get(key),
          errors: []
        });
        return () => {
          subscribers = subscribers.filter(cb => cb !== callback);
        };
      };
      const readCommand = {
        execute() {
          return resolvedPromiseLike({
            data: store.get(key),
            errors: [],
            subscribe
          });
        }
      };
      const writeCommand = {
        execute(args) {
          store.set(key, args.newValue);
          const currentValue = {
            data: args.newValue,
            errors: []
          };
          subscribers.forEach(callback => callback(currentValue));
          return resolvedPromiseLike(currentValue);
        }
      };
      return [readCommand, writeCommand];
    }
    /**
     * Generates a read/write command pair that store data at a specified key in
     * a store and use a subscription service to maintain the list of subscribers.
     *
     * @returns read/write commands for the specified data
     */
    function buildStoreSubscriptionBasedLocalStateCommands(store, key, keySubscriptionService) {
      const subscribe = callback => {
        callback({
          data: store.get(key),
          errors: []
        });
        return keySubscriptionService.subscribe({
          subscription: new KeySet([key]),
          callback: () => callback({
            data: store.get(key),
            errors: []
          })
        });
      };
      const readCommand = {
        execute() {
          return resolvedPromiseLike({
            data: store.get(key),
            errors: [],
            subscribe
          });
        }
      };
      const writeCommand = {
        execute(args) {
          store.set(key, args.newValue);
          keySubscriptionService.publish(new KeySet([key]));
          return resolvedPromiseLike({
            data: args.newValue,
            errors: []
          });
        }
      };
      return [readCommand, writeCommand];
    }
    function buildSubscribe(firstResult, store, cacheInclusionPolicy, subscriptionService, readFromL1, areResultsEqual) {
      return consumerCallback => {
        let mostRecentResult = firstResult;
        let keyUnsubscribe = () => {};
        const keyChangedCallback = () => {
          // when any of those keys are changed, re-do the read from cache that execute() did.
          // note that we use the raw store here, so cache policy limitations will not apply.
          // eavesdrop on which keys read() accesses
          const recordableStore = new RecordableStore(store);
          // let read() try to get the result
          return cacheInclusionPolicy.read({
            l1Cache: recordableStore,
            readFromL1
          }).then(value => {
            const {
              data
            } = value;
            const {
              data: mostRecentData
            } = mostRecentResult;
            // bail if data disappeared from the cache
            if (data === undefined) {
              return;
            }
            // subscribe if we had no previous result, or if the result has changed
            if (mostRecentResult === undefined || mostRecentData === undefined || !areResultsEqual(mostRecentData, data)) {
              consumerCallback(value);
              mostRecentResult = value;
            }
            keyUnsubscribe();
            keyUnsubscribe = subscriptionService.subscribe({
              subscription: recordableStore.keysRead,
              callback: keyChangedCallback
            });
          });
        };
        keyChangedCallback();
        // return an unsubscribe function
        return () => {
          keyUnsubscribe();
        };
      };
    }
    function writeToCacheInclusionPolicy(data, store, cacheInclusionPolicy, metadataRepository, keySubscriptionService, writeToL1) {
      // eavesdrop on which keys write() accesses
      const recordableStore = new RecordableStore(store);
      return cacheInclusionPolicy.write({
        l1Cache: recordableStore,
        writeToL1: store => {
          writeToL1(data, store, metadataRepository);
        }
      }).then(() => {
        // tell subscription service what changed
        return keySubscriptionService.publish(recordableStore.keysUpdated);
      });
    }
    function writeToL1(networkResult, returnType, buildKeyConfig, store, typeRegistry, metadataRepository) {
      if (networkResult.data !== undefined) {
        const keyConfig = buildKeyConfig(networkResult.data);
        const key = returnType.buildKey(keyConfig);
        returnType.write(key, networkResult.data, store, typeRegistry, metadataRepository);
      }
      // don't cache errors for now
    }
    function convertFetchResponseToData(response) {
      return response.then(response => {
        if (response.ok) {
          return response.json().then(json => ({
            data: json,
            errors: []
          }), reason => ({
            data: undefined,
            errors: [toError(reason)]
          }));
        } else {
          return {
            data: undefined,
            errors: [toError(response.statusText)]
          };
        }
      }).catch(reason => ({
        data: undefined,
        errors: [toError(reason)]
      }));
    }

    /**
     * A CachePolicyCommand extends BaseCommand to use a CachePolicy.
     *
     * TODO - much of the cache read logic here is identical to CachingCommand. See
     * if it makes sense to have this class subclass CachingCommand.
     */
    class CachePolicyCommand extends BaseSubscribableCommand {
      constructor(config, commandContext, internalRuntime) {
        super(config, commandContext);
        this.commandContext = commandContext;
        this.internalRuntime = internalRuntime;
        this.runtime = internalRuntime;
        this.initialize();
      }
      /**
       * A method to perform additional setup after initial construction.
       */
      initialize() {}
      /**
       * Selects a cache policy to be used.
       *
       * @returns the selected cache policy
       */
      selectCachePolicy() {
        const cachePolicyName = this.commandContext.cachePolicy || this.runtime.defaultCachePolicyName;
        const cachePolicy = this.runtime.cachePolicies.find(policy => policy.policyName === cachePolicyName);
        if (cachePolicy === undefined) {
          throw new Error(`Could not find cache policy "${cachePolicyName}". Did you configure it in your Runtime?`);
        }
        return cachePolicy;
      }
      execute() {
        // TODO - should these be promoted to protected class methods to allow
        // subclasses to selectively override them?
        const readFromCacheInclusionPolicy = store => this.readFromCacheInclusionPolicy(store);
        const fetch = () => this.fetch();
        const writeToCacheInclusionPolicy = (networkResult, store, metadataRepository, keySubscriptionService) => this.writeToCacheInclusionPolicy(networkResult, store, metadataRepository, keySubscriptionService);
        const buildResult = (networkResult, store) => this.buildResult(networkResult, store);
        const cachePolicy = this.selectCachePolicy();
        return cachePolicy.run({
          readFromCache: readFromCacheInclusionPolicy,
          readFromNetwork: fetch,
          writeToCache: writeToCacheInclusionPolicy,
          buildResult
        });
      }
      readFromCacheInclusionPolicy(store) {
        return this.runtime.cacheInclusionPolicy.read({
          l1Cache: store,
          readFromL1: store => this.readFromL1(store)
        }).then(result => {
          return {
            ...result,
            subscribe: this.buildSubscribe(result)
          };
        });
      }
      writeToCacheInclusionPolicy(networkResult, store, metadataRepository, keySubscriptionService) {
        return writeToCacheInclusionPolicy(networkResult, store, this.runtime.cacheInclusionPolicy, metadataRepository, keySubscriptionService, (result, store, metadataRepository) => this.writeToL1(result, store, metadataRepository));
      }
      buildResult(networkResult, store) {
        if (networkResult.errors.length > 0) {
          // When using the network result directly, provide a fake subscribe function
          return resolvedPromiseLike({
            ...networkResult,
            subscribe: _callback => {
              return () => {};
            }
          });
        }
        return this.readFromCacheInclusionPolicy(store);
      }
      buildSubscribe(firstResult) {
        return buildSubscribe(firstResult, this.internalRuntime.store, this.runtime.cacheInclusionPolicy, this.runtime.keySubscriptionService, store => this.readFromL1(store), (valueA, valueB) => this.areResultsEqual(valueA, valueB));
      }
      /*LWC compiler v7.1.5*/
    }

    /**
     * CachingReadCommand is an extension of BaseCommand that supports reading/subscribing
     * to store-based data.
     */
    class CachingCommand extends BaseSubscribableCommand {
      constructor(config, commandContext, runtime) {
        super(config, commandContext);
        this.commandContext = commandContext;
        this.runtime = runtime;
      }
      execute() {
        // eavesdrop on which keys read() accesses
        const recordableStore = new RecordableStore(this.runtime.store);
        // let read() try to get the result
        const readResult = this.read(recordableStore);
        return resolvedPromiseLike({
          ...readResult,
          subscribe: this.buildSubscribe()
        });
      }
      buildSubscribe() {
        return consumerCallback => {
          let lastResult = undefined;
          let keyUnsubscribe = () => {};
          const keyChangedCallback = () => {
            // when any of those keys are changed, re-do what execute() did
            const recordableStore = new RecordableStore(this.runtime.store);
            // let read() try to get the result
            const newResult = this.read(recordableStore);
            // bail if data disappeared from the cache
            if (newResult.data === undefined) {
              return;
            }
            // subscribe if we had no previous result, or if the result has changed
            if (lastResult === undefined || lastResult.data === undefined || !this.equals(lastResult.data, newResult.data)) {
              consumerCallback(newResult);
              lastResult = newResult;
            }
            keyUnsubscribe();
            keyUnsubscribe = this.runtime.keySubscriptionService.subscribe({
              subscription: recordableStore.keysRead,
              callback: () => keyChangedCallback()
            });
          };
          keyChangedCallback();
          return () => {
            keyUnsubscribe();
          };
        };
      }
      /*LWC compiler v7.1.5*/
    }

    /**
     * An implementation of BaseCommand that makes network requests but does not try to
     * use the store.
     */
    class NetworkCommand extends BaseCommand {
      constructor(config, commandContext, runtime) {
        super(config, commandContext);
        this.commandContext = commandContext;
        this.runtime = runtime;
      }
      execute() {
        return this.fetch();
      }
      /*LWC compiler v7.1.5*/
    }

    /**
     * A TypeRegistryCachePolicyCommand extends CachePolicyCommand to use a TypeRegistry for return types.
     */
    class TypeRegistryCachePolicyCommand extends CachePolicyCommand {
      readFromL1(store) {
        try {
          const returnType = this.returnType;
          const key = returnType.buildKey(this.buildKeyConfig());
          const data = returnType.read(key, store, this.runtime.typeRegistry);
          const errors = [];
          if (data === undefined) {
            errors.push(new DataNotFoundError());
          }
          return {
            data,
            errors
          };
        } catch (e) {
          return {
            data: undefined,
            errors: [toError(e)]
          };
        }
      }
      writeToL1(networkResult, store, metadataRepository) {
        return writeToL1(networkResult, this.returnType, data => this.buildKeyConfigFromInstance(data), store, this.runtime.typeRegistry, metadataRepository);
      }
      get returnType() {
        return this.runtime.typeRegistry.get(this.returnTypeNamespace, this.returnTypeName);
      }
      areResultsEqual(result1, result2) {
        return this.returnType.equals(result1, result2, this.runtime.typeRegistry);
      }
      /*LWC compiler v7.1.5*/
    }

    /**
     * A MutationTypeRegistryCommand is a command invocation that runs a mutation on the server
     * and caches the response using types from the type registry.
     */
    class MutationTypeRegistryCommand extends BaseCommand {
      constructor(config, commandContext, internalRuntime) {
        super(config, commandContext);
        this.commandContext = commandContext;
        this.internalRuntime = internalRuntime;
        this.runtime = internalRuntime;
      }
      readFromL1(store, instance) {
        try {
          const returnType = this.returnType;
          const keyConfig = this.buildKeyConfigFromInstance(instance);
          const key = returnType.buildKey(keyConfig);
          const data = returnType.read(key, store, this.runtime.typeRegistry);
          const errors = [];
          if (data === undefined) {
            errors.push(new DataNotFoundError());
          }
          return {
            data,
            errors
          };
        } catch (e) {
          return {
            data: undefined,
            errors: [toError(e)]
          };
        }
      }
      writeToL1(networkResult, store, metadataRepository) {
        writeToL1(networkResult, this.returnType, data => this.buildKeyConfigFromInstance(data), store, this.runtime.typeRegistry, metadataRepository);
      }
      readFromCacheInclusionPolicy(store, instance) {
        return this.runtime.cacheInclusionPolicy.read({
          l1Cache: store,
          readFromL1: store => this.readFromL1(store, instance)
        });
      }
      writeToCacheInclusionPolicy(networkResult, store, metadataRepository, keySubscriptionService) {
        return writeToCacheInclusionPolicy(networkResult, store, this.runtime.cacheInclusionPolicy, metadataRepository, keySubscriptionService, (result, store, metadataRepository) => this.writeToL1(result, store, metadataRepository));
      }
      get returnType() {
        return this.runtime.typeRegistry.get(this.returnTypeNamespace, this.returnTypeName);
      }
      areResultsEqual(result1, result2) {
        return this.returnType.equals(result1, result2, this.runtime.typeRegistry);
      }
      execute() {
        return this.fetch().then(networkResult => {
          this.writeToCacheInclusionPolicy(networkResult, this.internalRuntime.store, this.runtime.metadataRepository, this.runtime.keySubscriptionService);
          return networkResult;
        }).then(networkResult => {
          return this.buildResult(networkResult, this.internalRuntime.store);
        });
      }
      buildResult(networkResult, store) {
        if (networkResult.errors.length > 0) {
          // When using the network result directly, provide a fake subscribe function
          return resolvedPromiseLike(networkResult);
        }
        return this.readFromCacheInclusionPolicy(store, networkResult.data);
      }
      /*LWC compiler v7.1.5*/
    }
    const buildTypeRegistry = types => {
      const typeRegistry = new DefaultTypeRegistry();
      types.forEach(type => typeRegistry.register(type));
      return typeRegistry;
    };
    const buildDefaultRuntime = options => {
      const cachePolicyRuntime = {
        metadataRepository: new InMemoryMetadataRepository(),
        store: new InMemoryStore(),
        keySubscriptionService: new DefaultKeySubscriptionService(),
        cachePolicyValidator: {
          validateReadResult() {},
          validateWriteResult() {},
          validateBuildResult() {}
        },
        requestDeduplicationService: new RequestDeduplicationService()
      };
      return {
        ...cachePolicyRuntime,
        cachePolicies: [new CacheThenNetworkPolicy(cachePolicyRuntime), new NoCachePolicy(cachePolicyRuntime)],
        typeRegistry: buildTypeRegistry(options.types),
        cacheInclusionPolicy: new InMemoryCacheInclusionPolicy(),
        defaultCachePolicyName: 'cache-then-network',
        eventSubscriptionService: new DefaultEventSubscriptionService()
      };
    };
    // version: 1.278.0-a388a38f0
    const __lwc_hmr_context = { moduleHash : 'dad56f20acf32c569bed77775d75df4a' };
    if (lwc.hot) {
        lwc.hot.register('force/luvioRuntime/luvioRuntime.js', 'dad56f20acf32c569bed77775d75df4a', {"name":"luvioRuntime","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.ArrayIsArray = isArray;
    exports.ArrayPrototypeIndexOf = indexOf;
    exports.ArrayPrototypePush = push;
    exports.ArrayPrototypeSlice = slice;
    exports.BaseCommand = BaseCommand;
    exports.BaseSubscribableCommand = BaseSubscribableCommand;
    exports.CachePolicyCommand = CachePolicyCommand;
    exports.CacheThenNetworkPolicy = CacheThenNetworkPolicy;
    exports.CachingCommand = CachingCommand;
    exports.DataNotFoundError = DataNotFoundError;
    exports.DefaultEventSubscriptionService = DefaultEventSubscriptionService;
    exports.DefaultKeySubscriptionService = DefaultKeySubscriptionService;
    exports.DefaultTypeRegistry = DefaultTypeRegistry;
    exports.DurableCacheInclusionPolicy = DurableCacheInclusionPolicy;
    exports.EventIdentifierWildcard = EventIdentifierWildcard;
    exports.InMemoryCacheInclusionPolicy = InMemoryCacheInclusionPolicy;
    exports.InMemoryMetadataRepository = InMemoryMetadataRepository;
    exports.InMemoryStore = InMemoryStore;
    exports.JSONStringify = stringify;
    exports.KeySet = KeySet;
    exports.MutationTypeRegistryCommand = MutationTypeRegistryCommand;
    exports.NetworkCommand = NetworkCommand;
    exports.NoCachePolicy = NoCachePolicy;
    exports.ObjectCreate = create;
    exports.ObjectFreeze = freeze;
    exports.ObjectKeys = keys;
    exports.ObjectPrototypeHasOwnProperty = hasOwnProperty;
    exports.OpaqueRepresentationType = OpaqueRepresentationType;
    exports.RecordableStore = RecordableStore;
    exports.RequestDeduplicationService = RequestDeduplicationService;
    exports.TTLFilteredStore = TTLFilteredStore;
    exports.TypeNotFoundError = TypeNotFoundError;
    exports.TypeRegistryCachePolicyCommand = TypeRegistryCachePolicyCommand;
    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.buildDefaultRuntime = buildDefaultRuntime;
    exports.buildLocalStateCommands = buildLocalStateCommands;
    exports.buildStoreBasedLocalStateCommands = buildStoreBasedLocalStateCommands;
    exports.buildStoreSubscriptionBasedLocalStateCommands = buildStoreSubscriptionBasedLocalStateCommands;
    exports.convertFetchResponseToData = convertFetchResponseToData;
    exports.deepEquals = deepEquals;
    exports.deserializeToInMemoryServices = deserializeToInMemoryServices;
    exports.isSubscribable = isSubscribable;
    exports.rejectedPromiseLike = rejectedPromiseLike;
    exports.resolvedPromiseLike = resolvedPromiseLike;
    exports.serialize = serialize;
    exports.stableJSONStringify = stableJSONStringify;
    exports.toError = toError;

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
(function() { LWR.define('force/luvioRuntimeWebruntime', ['exports', 'lwc', 'force/luvioRegistry', 'force/luvioRuntime'], (function (exports, lwc, luvioRegistry, luvioRuntime) {

    function _interopNamespaceCompat(e) {
        if (e && typeof e === 'object' && 'default' in e) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var luvioRuntime__namespace = /*#__PURE__*/_interopNamespaceCompat(luvioRuntime);

    var _tmpl = void 0;

    const metadataRepositoryKey = 'metadata-repository';
    function buildInMemoryServices() {
      const serverData = globalThis.CLWR?.serverData || globalThis.LWR?.serverData || {};
      const initialData = serverData.initialData?.luvio || Object.values(serverData)[0]?.initialData?.luvio;
      if (initialData !== null && typeof initialData === 'object' && initialData.version && initialData.data && initialData.metadata) {
        // If server-side preloaded data is available, create in-memory service instances
        // (metadata repository and store) and remove initial data from memory.
        delete globalThis.CLWR?.serverData?.initialData?.luvio;
        return luvioRuntime.deserializeToInMemoryServices(initialData, {
          ingestionTime: Date.now()
        });
      }

      // Luvio 3
      // return {
      //    ...buildInMemoryMetadataRepositoryService(),
      //    ...buildInMemoryStoreService(),
      // };

      // Luvio 2 only
      return {
        [metadataRepositoryKey]: new luvioRuntime.InMemoryMetadataRepository(),
        store: new luvioRuntime.InMemoryStore()
      };
    }
    const services = buildInMemoryServices();
    const metadataRepository = services[metadataRepositoryKey];
    const store = services.store;
    const cachePolicyRuntime = {
      metadataRepository,
      store,
      keySubscriptionService: new luvioRuntime.DefaultKeySubscriptionService(),
      cachePolicyValidator: {
        validateReadResult() {},
        validateWriteResult() {},
        validateBuildResult() {}
      },
      requestDeduplicationService: new luvioRuntime.RequestDeduplicationService()
    };
    const cachePolicies = [new luvioRuntime.CacheThenNetworkPolicy(cachePolicyRuntime)];
    const commandRuntime = {
      ...cachePolicyRuntime,
      cacheInclusionPolicy: new luvioRuntime.InMemoryCacheInclusionPolicy(),
      cachePolicies,
      typeRegistry: new luvioRuntime.DefaultTypeRegistry(),
      defaultCachePolicyName: 'cache-then-network'
      // eventSubscriptionService: new DefaultEventSubscriptionService(), // Luvio 2 only; Not needed in LWR @wire adapters yet
    };
    luvioRegistry.withRegistration('commandModule', registration => {
      if (Object.keys(registration.runtimeDependencies).every(k => k in commandRuntime)) {
        registration.setCommandRuntime(commandRuntime);
      }
    });
    function serializeDataStore() {
      return luvioRuntime.serialize({
        [metadataRepositoryKey]: metadataRepository,
        store
      });
    }
    const __lwc_component_class_internal = lwc.registerComponent(luvioRuntime__namespace, {
      tmpl: _tmpl,
      sel: "force-luvio-runtime-webruntime",
      apiVersion: 62
    });
    const __lwc_hmr_context = { moduleHash : '46645633a661422b68825f9a3b5bd9b4' };
    if (lwc.hot) {
        lwc.hot.register('force/luvioRuntimeWebruntime/luvioRuntimeWebruntime.js', '46645633a661422b68825f9a3b5bd9b4', {"name":"luvioRuntimeWebruntime","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }
    if (lwc.hot) {
        lwc.hot.accept('force/luvioRuntimeWebruntime/luvioRuntimeWebruntime.js', (mod) => {
            const { default: __new_component } = mod;
            lwc.swapComponent(__lwc_component_class_internal, __new_component);
        });
    }

    exports.__lwc_hmr_context = __lwc_hmr_context;
    exports.default = __lwc_component_class_internal;
    exports.serializeDataStore = serializeDataStore;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
