LWR.define('@salesforce/community/basePath', ['@app/basePath'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
LWR.define('@salesforce/community/Id', [], function() { return "0DBHy0000005ZrLOAU"; });
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
LWR.define('@luvio/lwc-bindings', ['force/luvioLwcBindings'], function(m) { return m && typeof m === 'object' && 'default' in m ? m.default : m; });
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
(function() { LWR.define('experience/userApiInternal', ['exports', 'lwc', '@luvio/runtime', 'experience/config', 'experience/data', 'experience/uri'], (function (exports, lwc, runtime, config, data, uri) {

  const USER_RECORD_NAMESPACE = 'experience';
  const USER_RECORD_TYPE_NAME = 'User';
  const userRepresentationType = new runtime.OpaqueRepresentationType(USER_RECORD_NAMESPACE, USER_RECORD_TYPE_NAME, 60 * 60 * 1000, keyParams => {
    keyParams.fields.sort();
    return `${USER_RECORD_NAMESPACE}::${USER_RECORD_TYPE_NAME}:${keyParams.id}:${keyParams.fields}`;
  });

  const API_VERSION = config.currentRelease.apiVersion;
  class GetUserRegistryCachePolicyCommand extends runtime.TypeRegistryCachePolicyCommand {
    constructor(...args) {
      super(...args);
      this.returnTypeNamespace = USER_RECORD_NAMESPACE;
      this.returnTypeName = USER_RECORD_TYPE_NAME;
    }
    buildKeyConfig() {
      return this.config;
    }
    buildKeyConfigFromInstance() {
      return this.config;
    }
    get configJsonSchema() {
      return true;
    }
    fetch() {
      const config = this.buildKeyConfig();
      if (!config?.id || !(Array.isArray(config?.fields) && config.fields.length)) {
        const data = {
          data: undefined,
          errors: []
        };
        return Promise.resolve(data);
      }
      const queryParams = {
        optionalFields: config.fields.join(',')
      };
      return this.convertFetchResponseToData(data.fetchService(uri.composeUri(`/services/data/${API_VERSION}/ui-api/records/${config.id}`, queryParams)));
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
  lwc.registerDecorators(GetUserRegistryCachePolicyCommand, {
    fields: ["returnTypeNamespace", "returnTypeName"]
  });

  exports.GetUserRegistryCachePolicyCommand = GetUserRegistryCachePolicyCommand;
  exports.userRepresentationType = userRepresentationType;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
(function() { LWR.define('experience/userApi', ['exports', '@luvio/lwc-bindings', 'experience/luvioRuntime', 'experience/userApiInternal'], (function (exports, lwcBindings, luvioRuntime, userApiInternal) {

  exports.getUser = void 0;
  luvioRuntime.registerAdapter(commandRuntime => {
    commandRuntime.typeRegistry.register(userApiInternal.userRepresentationType);
    return {
      getUser: exports.getUser = class extends lwcBindings.CommandWireAdapterConstructor {
        getCommand() {
          return new userApiInternal.GetUserRegistryCachePolicyCommand(this.config, {}, commandRuntime);
        }
        /*LWC compiler v7.1.5*/
      }
    };
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
(function() { LWR.define('dxp_data_provider/userRecordDataProvider', ['exports', '@salesforce/loader', 'lwc', 'experience/userApi', 'experience/dataProvider', 'dxp_data_provider/dataProviderUtils', 'dxp_util/common'], (function (exports, loader, lwc, userApi, DataProvider, dataProviderUtils, common) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var DataProvider__default = /*#__PURE__*/_interopDefaultCompat(DataProvider);

    var _tmpl = void 0;

    /**
     * Data provider that provides User Record data. Used as a child data provider in
     * data binding feature to fetch data on the client side.
     *
     * @extends DataProvider
     */
    class UserRecordDataProvider extends DataProvider__default.default {
      get sfdcFields() {
        return this._fieldPaths;
      }
      set sfdcFields(fieldPaths) {
        if (!this.userId) {
          this.triggerAsyncImports();
        }
        this._fieldPaths = fieldPaths;
        if (fieldPaths && fieldPaths.length) {
          this.fieldsToFetch = fieldPaths.filter((value, index, array) => array.indexOf(value) === index).map(field => this.formatField(field));
        }
      }
      hasData() {
        return !!this.record;
      }
      get sfdcData() {
        this.formatFields(this.record);
        return this.formattedRecord;
      }
      constructor() {
        super();
        // default is 'shadow'
        this.sfdcExpressionKey = void 0;
        this._fieldPaths = void 0;
        this.fieldsToFetch = void 0;
        /**
         * Set the objectApiName statically
         * as importing it as USER from '@salesforce/schema/User'
         * and then doing USER.objectApiName
         * may add to unnecessary site rendering performance
         */
        this.objectApiName = "User";
        this.record = void 0;
        this.formattedRecord = void 0;
        this.userId = void 0;
        this.isGuest = void 0;
        this.formattedRecord = {};
        this.fieldsToFetch = [];
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

      /**
       * Fetch the record data based on the record id and fields passed in
       */
      wiredRecord({
        data
      }) {
        if (data) {
          this.record = data;
        }
      }
      formatFields(record, existingPath) {
        if (record) {
          const fields = record.fields || [];
          for (let field in fields) {
            if (field && fields[field]) {
              const fieldPath = dataProviderUtils.buildFieldPath(existingPath, field);
              const current = {};
              common.set(current, fieldPath, fields[field]?.value?.fields || fields[field]?.value || "");
              this.formattedRecord = common.deepMerge(this.formattedRecord, current);
              if (typeof fields[field].value === "object") {
                this.formatFields(fields[field].value, fieldPath);
              }
            }
          }
        }
      }

      /**
       * Record fields are formated with ${objectApiName}.${field}
       *
       * @param {string} field - field
       */
      formatField(field) {
        return `${this.objectApiName}.${field}`;
      }
      /*LWC compiler v7.1.5*/
    }
    /**
     * Enable the component to render as lightDOM
     *
     * @static
     */
    UserRecordDataProvider.renderMode = "light";
    lwc.registerDecorators(UserRecordDataProvider, {
      publicProps: {
        sfdcExpressionKey: {
          config: 0
        },
        sfdcFields: {
          config: 3
        }
      },
      publicMethods: ["hasData"],
      track: {
        fieldsToFetch: 1
      },
      wire: {
        wiredRecord: {
          adapter: userApi.getUser,
          dynamic: ["id", "fields"],
          method: 1,
          config: function ($cmp) {
            return {
              id: $cmp.userId,
              fields: $cmp.fieldsToFetch
            };
          }
        }
      },
      fields: ["_fieldPaths", "objectApiName", "record", "formattedRecord", "userId", "isGuest"]
    });
    const __lwc_component_class_internal = lwc.registerComponent(UserRecordDataProvider, {
      tmpl: _tmpl,
      sel: "dxp_data_provider-user-record-data-provider",
      apiVersion: 62
    });

    exports.default = __lwc_component_class_internal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
