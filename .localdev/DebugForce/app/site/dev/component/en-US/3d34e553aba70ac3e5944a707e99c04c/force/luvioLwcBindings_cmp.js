(function() { LWR.define('force/luvioLwcBindings', ['exports', 'lwc'], (function (exports, lwc) {

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

    class JsonSchemaViolationError extends Error {
      /*LWC compiler v7.1.5*/
    }
    class MinItemsViolationError extends JsonSchemaViolationError {
      /*LWC compiler v7.1.5*/
    }
    class MaxItemsViolationError extends JsonSchemaViolationError {
      /*LWC compiler v7.1.5*/
    }
    class IncorrectTypeError extends JsonSchemaViolationError {
      /*LWC compiler v7.1.5*/
    }
    class AdditionalPropertiesError extends JsonSchemaViolationError {
      /*LWC compiler v7.1.5*/
    }
    class MissingRequiredPropertyError extends JsonSchemaViolationError {
      /*LWC compiler v7.1.5*/
    }
    function validateJsonSchema(data, schema, path = '$') {
      if (schema === true) return;
      if (schema === false) throw new JsonSchemaViolationError(`Data at ${path} has schema 'false'`);
      const rawType = typeof data;
      const dataType = data === null ? 'null' : Array.isArray(data) ? 'array' : rawType;
      const error = new IncorrectTypeError(`Data type at path '${path}' does not match JSONSchema. Expected ${schema.type}, got ${dataType}.`);
      if ('anyOf' in schema) {
        validateAnyOf(data, schema, path);
      } else if (schema.type === 'object') {
        if (dataType !== 'object') {
          throw error;
        }
        validateObject(data, schema, path);
      } else if (schema.type === 'array') {
        if (dataType !== 'array') {
          throw error;
        }
        validateArray(data, schema, path);
      } else {
        validateScalar(data, schema, path);
      }
    }
    function validateAnyOf(data, schema, path) {
      let valid = false;
      schema.anyOf.forEach(element => {
        try {
          validateJsonSchema(data, element);
          valid = true;
        } catch (err) {
          // swallow error for individual validations as only one needs to pass
        }
      });
      if (!valid) {
        throw new JsonSchemaViolationError(`Data at ${path} did not match any subschema in anyOf.`);
      }
      return;
    }
    function validateObject(data, schema, path) {
      const schemaKeys = Object.keys(schema.properties);
      const requiredKeys = new Set(schema.required);
      if (!schema.additionalProperties) {
        const schemaKeySet = new Set(schemaKeys);
        const additionalProperties = Object.keys(data).filter(key => !schemaKeySet.has(key));
        if (additionalProperties.length > 0) {
          throw new AdditionalPropertiesError(`Object at path '${path}' contains unallowed additionalProperties: ${additionalProperties}.`);
        }
      }
      for (let i = 0, length = schemaKeys.length; i < length; i++) {
        const key = schemaKeys[i];
        const keyInData = key in data && data[key] !== undefined;
        if (requiredKeys.has(key) && !keyInData) {
          throw new MissingRequiredPropertyError(`Object at path '${path}' is missing required property '${key}'.`);
        }
        if (keyInData) {
          validateJsonSchema(data[key], schema.properties[key], `${path}.${key}`);
        }
      }
    }
    function validateArray(data, schema, path) {
      if (schema.minItems !== undefined && data.length < schema.minItems) {
        throw new MinItemsViolationError(`Array at path '${path}' fails minItems constraint. Has ${data.length} items, needs at least ${schema.minItems}.`);
      }
      if (schema.maxItems !== undefined && data.length > schema.maxItems) {
        throw new MaxItemsViolationError(`Array at path '${path}' fails maxItems constraint. Has ${data.length} items, needs at most ${schema.maxItems}.`);
      }
      data.forEach((element, index) => validateJsonSchema(element, schema.items, `${path}[${index}]`));
    }
    function validateScalar(data, schema, path) {
      const schemaDataType = schema.type;
      const dataType = typeof data;
      const error = new IncorrectTypeError(`Expected type ${schemaDataType} at path '${path}'. Got type ${dataType}.`);
      if (schemaDataType === 'integer') {
        if (dataType !== 'number' || !Number.isInteger(data)) {
          throw error;
        }
      } else if (schemaDataType === 'number') {
        if (dataType !== 'number') {
          throw error;
        }
      } else if (schemaDataType === 'string') {
        if (dataType !== 'string') {
          throw error;
        }
      } else if (schemaDataType === 'boolean') {
        if (dataType !== 'boolean') {
          throw error;
        }
      } else if (schemaDataType === 'null') {
        if (data !== null) {
          throw error;
        }
      } else {
        throw new IncorrectTypeError(`Unknown schema data type: ${schemaDataType}.`);
      }
    }

    /**
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */

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
    function isSubscribable(x) {
      return 'subscribe' in x;
    }

    /**
     * Copyright (c) 2022, Salesforce, Inc.,
     * All rights reserved.
     * For full license text, see the LICENSE.txt file
     */

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
        JSON.stringify(this.obj, function (key, value) {
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
        const data = parentPath.data[key] = Array.isArray(value) ? [] : {};
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
     * into the luvio engine code nor into commands. All the data coming from LWC-land need to be
     * sanitized first.
     */
    function sanitize(obj) {
      return new Sanitizer(obj).sanitize();
    }
    class CommandWireAdapterConstructor {
      constructor(callback) {
        this.callback = callback;
        this.connected = false;
        this.emit();
      }
      connect() {
        this.connected = true;
        this.invokeAdapter();
      }
      disconnect() {
        this.unsubscribe();
        this.connected = false;
      }
      update(config, _context) {
        this.unsubscribe();
        this.config = sanitize(config);
        this.invokeAdapter();
      }
      emit(result) {
        try {
          if (result === undefined) {
            this.callback({
              data: undefined,
              error: undefined
            });
          } else {
            this.callback({
              data: result.data,
              error: result.errors.length > 0 ? result.errors[0] : undefined
            });
          }
        } catch (e) {
          // TODO - need to handle this better
          throw toError(e);
        }
      }
      invokeAdapter() {
        if (!this.connected || this.config === undefined) {
          return;
        }
        const initialConfig = this.config;
        const command = this.getCommand();
        try {
          validateJsonSchema(this.config, command.configJsonSchema);
        } catch (err) {
          return;
        }
        command.execute().then(result => {
          // config changed or component disconnected before result came back, ignore result
          if (!this.connected || this.config !== initialConfig) {
            return;
          }
          this.emit(result);
          if (isSubscribable(result)) {
            this.unsubscriber = result.subscribe(updatedResult => {
              if (!this.connected || this.config !== initialConfig) {
                this.unsubscribe();
                return;
              }
              this.emit(updatedResult);
              // TODO - do we need to resubscribe to updatedResult?
            });
          }
        });
      }
      unsubscribe() {
        if (this.unsubscriber) {
          this.unsubscriber();
          delete this.unsubscriber;
        }
      }
    }
    // version: 1.278.0-a388a38f0
    const __lwc_hmr_context = { moduleHash : 'd00c6e4824a90141ff711e941c87cb8e' };
    if (lwc.hot) {
        lwc.hot.register('force/luvioLwcBindings/luvioLwcBindings.js', 'd00c6e4824a90141ff711e941c87cb8e', {"name":"luvioLwcBindings","namespace":"force","enableLightningWebSecurityTransforms":false,"experimentalDynamicComponent":{"loader":"@salesforce/loader","strictSpecifier":false},"experimentalDynamicDirective":false,"enableDynamicComponents":true,"enableStaticContentOptimization":true,"outputConfig":{"sourcemap":false}});
    }

    exports.CommandWireAdapterConstructor = CommandWireAdapterConstructor;
    exports.__lwc_hmr_context = __lwc_hmr_context;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
