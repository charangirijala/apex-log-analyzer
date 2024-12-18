(function () {
    'use strict';

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * Logger class for webSDK
     */
    class WebSDKLogger {
        /**
         * Enabled debug logs
         * @param value boolean
         */
        static enableDebug(value) {
            this._debug = value;
        }
        /**
         * Console logs the input value
         * @param value log
         */
        static log(value) {
            if (this._debug) {
                console.log(`ExpTagManager: ${value}`);
            }
        }
        /**
         * Console warns the input value
         * @param value log
         */
        static warn(value) {
            if (this._debug) {
                console.warn(`ExpTagManager: ${value}`);
            }
        }
        /**
         * Console error the input value
         * @param value log
         */
        static error(value) {
            if (this._debug) {
                console.error(`ExpTagManager: ${value}`);
            }
        }
    }
    WebSDKLogger._debug = false;

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const EVENT_ORDER_ACCEPTED = 'order-accepted';
    const CART_INTERACTIONS_LIST = [
        'cart-add',
        'cart-remove',
        'cart-replace',
        'cart-update',
        'cart-view',
        'checkout-begin',
        'checkout-contact-info',
        'checkout-user-register',
        'checkout-shipping-address',
        'checkout-billing-address',
        'checkout-shipping-options',
        'checkout-payment',
        'checkout-apply-coupon',
        'checkout-review',
        'checkout-submit',
    ];

    /*! js-cookie v3.0.5 | MIT */
    /* eslint-disable no-var */
    function assign (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target
    }
    /* eslint-enable no-var */

    /* eslint-disable no-var */
    var defaultConverter = {
      read: function (value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      },
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        )
      }
    };
    /* eslint-enable no-var */

    /* eslint-disable no-var */

    function init (converter, defaultAttributes) {
      function set (name, value, attributes) {
        if (typeof document === 'undefined') {
          return
        }

        attributes = assign({}, defaultAttributes, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }

        name = encodeURIComponent(name)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);

        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue
          }

          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie =
          name + '=' + converter.write(value, name) + stringifiedAttributes)
      }

      function get (name) {
        if (typeof document === 'undefined' || (arguments.length && !name)) {
          return
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var value = parts.slice(1).join('=');

          try {
            var found = decodeURIComponent(parts[0]);
            jar[found] = converter.read(value, found);

            if (name === found) {
              break
            }
          } catch (e) {}
        }

        return name ? jar[name] : jar
      }

      return Object.create(
        {
          set,
          get,
          remove: function (name, attributes) {
            set(
              name,
              '',
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function (attributes) {
            return init(this.converter, assign({}, this.attributes, attributes))
          },
          withConverter: function (converter) {
            return init(assign({}, this.converter, converter), this.attributes)
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      )
    }

    init(defaultConverter, { path: '/' });

    // Plugins and their properties
    const CONVERSION_TYPE_APPEND_RENAME = 'AppendRename';
    class AppendAllNamesFromKeyPlugin {
        transform(pluginProperties, childValue, payload) {
            const fieldWithName = pluginProperties.fromKey;
            if (!Object.prototype.hasOwnProperty.call(childValue, fieldWithName)) {
                WebSDKLogger.error(`No field of given name exists to rename does not have field: ${fieldWithName}`);
                return;
            }
            const fieldValue = `${childValue[fieldWithName].charAt(0).toLowerCase()}${childValue[fieldWithName].slice(1)}`;
            Object.assign(payload, {
                ...payload,
                ...Object.fromEntries(Object.entries(childValue)
                    .filter((e) => e[0] !== fieldWithName)
                    .map(([k, v]) => [`${fieldValue}${k.charAt(0).toUpperCase()}${k.slice(1)}`, v])),
            });
        }
    }
    const CONVERSION_TYPE_APPEND = 'AppendName';
    class AppendNamePlugin {
        transform(pluginProperties, childValue, _payload) {
            const _mapFunc = (v) => {
                // don't add the name if the key doesn't exist
                if (!Object.prototype.hasOwnProperty.call(v, pluginProperties.key)) {
                    return v;
                }
                const { [pluginProperties.key]: name, ...rest } = v; // this doesn't replace attributes keys
                delete v[pluginProperties.key];
                return Object.assign({}, rest, { [pluginProperties.name]: name });
            };
            const mapFunc = (v) => {
                v = _mapFunc(v);
                if (Object.prototype.hasOwnProperty.call(v, 'attributes')) {
                    v.attributes = _mapFunc(v.attributes);
                }
                return v;
            };
            if (!Array.isArray(childValue)) {
                return Object.assign(childValue, mapFunc(childValue));
            }
            Object.assign(childValue, childValue.map(mapFunc));
        }
    }
    // Register the plugins to be used
    const PLUGINS = {
        [CONVERSION_TYPE_APPEND_RENAME]: new AppendAllNamesFromKeyPlugin(),
        [CONVERSION_TYPE_APPEND]: new AppendNamePlugin(),
    };

    const cart={namespace:"sf.commerce",name:"Cart",pbjsSchema:{"nested":{"sf":{"nested":{"commerce":{"nested":{"Cart":{"fields":{"coupon":{"id":104,"type":"string"},"totalProductsAmount":{"id":105,"type":"double"},"orderId":{"id":108,"type":"string"},"sourceChannel":{"id":4,"type":"string"},"channelType":{"id":6,"type":"string"},"uniqueProductCount":{"id":106,"type":"uint32"},"webstoreId":{"id":2,"type":"string"},"name":{"id":101,"type":"string"},"subscriptionQuantity":{"id":107,"type":"double"},
    "eventName":{"id":1,"type":"string"},"correlationId":{"id":5,"type":"string"},"currency":{"id":103,"type":"string"},"id":{"id":102,"type":"string"},"visitorId":{"id":3,"type":"string"}}}}}}}}}};

    const cart_item={namespace:"sf.commerce",name:"CartItem",pbjsSchema:{"nested":{"sf":{"nested":{"commerce":{"nested":{"CartItem":{"fields":{"totalProductAmount":{"id":106,"type":"double"},"quantity":{"id":104,"type":"double"},"productId":{"id":107,"type":"string"},"lineItemId":{"id":102,"type":"string"},"sourceChannel":{"id":4,"type":"string"},"adjustedTotalProductAmount":{"id":110,"type":"double"},"cartId":{"id":101,"type":"string"},"saleType":{"id":112,"type":"string"},"channelType":{"id":6,
    "type":"string"},"webstoreId":{"id":2,"type":"string"},"price":{"id":103,"type":"double"},"imageUrl":{"id":111,"type":"string"},"name":{"id":105,"type":"string"},"eventName":{"id":1,"type":"string"},"correlationId":{"id":5,"type":"string"},"sku":{"id":109,"type":"string"},"productType":{"id":108,"type":"string"},"visitorId":{"id":3,"type":"string"}}}}}}}}}};

    const checkout={namespace:"sf.commerce",name:"Checkout",pbjsSchema:{"nested":{"sf":{"nested":{"commerce":{"nested":{"Checkout":{"fields":{"uiLayoutType":{"id":103,"type":"string"},"sourceChannel":{"id":4,"type":"string"},"cartId":{"id":101,"type":"string"},"eventName":{"id":1,"type":"string"},"correlationId":{"id":5,"type":"string"},"channelType":{"id":6,"type":"string"},"isExpressCheckout":{"id":105,"type":"bool"},"checkoutId":{"id":102,"type":"string"},"initialOrn":{"id":104,"type":"string"},
    "webstoreId":{"id":2,"type":"string"},"visitorId":{"id":3,"type":"string"},"isManaged":{"id":106,"type":"bool"}}}}}}}}}};

    const order={namespace:"sf.commerce",name:"Order",pbjsSchema:{"nested":{"sf":{"nested":{"commerce":{"nested":{"Order":{"fields":{"totalProductAmount":{"id":104,"type":"double"},"orderId":{"id":101,"type":"string"},"sourceChannel":{"id":4,"type":"string"},"cartId":{"id":103,"type":"string"},"grandTotalAmount":{"id":105,"type":"double"},"eventName":{"id":1,"type":"string"},"correlationId":{"id":5,"type":"string"},"channelType":{"id":6,"type":"string"},"currency":{"id":102,"type":"string"},"webstoreId":{"id":2,
    "type":"string"},"visitorId":{"id":3,"type":"string"}}}}}}}}}};

    const payment={namespace:"sf.commerce",name:"Payment",pbjsSchema:{"nested":{"sf":{"nested":{"commerce":{"nested":{"Payment":{"fields":{"sourceChannel":{"id":4,"type":"string"},"cartId":{"id":101,"type":"string"},"channelType":{"id":6,"type":"string"},"initialOrn":{"id":105,"type":"string"},"webstoreId":{"id":2,"type":"string"},"isManualCapture":{"id":106,"type":"bool"},"paymentMethods":{"rule":"repeated","id":107,"type":"string"},"eventName":{"id":1,"type":"string"},"paymentMethod":{"id":104,
    "type":"string"},"correlationId":{"id":5,"type":"string"},"isExpressPayment":{"id":103,"type":"bool"},"checkoutId":{"id":102,"type":"string"},"visitorId":{"id":3,"type":"string"}}}}}}}}}};

    const rename = (newName, oldName = 'id') => ({
        type: CONVERSION_TYPE_APPEND,
        key: oldName,
        name: newName, // this plugin will rename field id to newName
    });
    const CART_REGISTRY_SCHEMA = {
        cart: {
            schema: cart,
            // cart can have lineItems which have their own schema
            lineItems: {
                schema: cart_item,
                plugins: [rename('lineItemId')],
                catalogObject: {
                    plugins: [
                        {
                            fromKey: 'type',
                            type: CONVERSION_TYPE_APPEND_RENAME, // this plugin will make whatever value from key "type" to all other fields ie: type: "Product" then all other fields at this level will have product appended
                        },
                    ],
                },
            },
        },
    };
    const CHECKOUT_REGISTRY_SCHEMA = {
        cart: {
            schema: checkout,
            plugins: [rename('cartId')],
        },
    };
    const PAYMENT_REGISTRY_SCHEMA = {
        cart: {
            schema: payment,
            plugins: [rename('cartId')],
        },
    };
    const ORDER_REGISTRY_SCHEMA = {
        order: {
            schema: order,
            plugins: [rename('orderId'), rename('grandTotalAmount', 'adjustedTotalProductAmount')],
        },
    };
    /**
     * A map of experience_interaction event names to its corresponding o11y Transformer
     * Enter entry of form:
     *      [event_name, registry]
     * For example: ['page-view', new SimpleTransformer()] or ['cart-add', CART_REGISTRY_SCHEMA]
     * See list of existing event names in 'src/constants/index.ts', but any custom event names should work
     * See an example custom transformer in 'src/eventDispatcher/o11yEventDispatcher/transformer/simpleTransformer.ts.txt'
     */
    const O11Y_EVENT_TO_TRANSFORMER_REGISTRY = new Map([
        ...CART_INTERACTIONS_LIST.filter((value) => value.startsWith('cart')).map((value) => [value, CART_REGISTRY_SCHEMA]),
        ...CART_INTERACTIONS_LIST.filter((value) => value.startsWith('checkout')).map((value) => [value, CHECKOUT_REGISTRY_SCHEMA]),
        ...['checkout-payment', 'checkout-payment-render'].map((value) => [
            value,
            PAYMENT_REGISTRY_SCHEMA,
        ]),
        [EVENT_ORDER_ACCEPTED, ORDER_REGISTRY_SCHEMA],
    ]);

    class TransformerRegistry {
        constructor(initialRegistry) {
            this.registryMap = new Map();
            if (initialRegistry) {
                this.registryMap = initialRegistry;
            }
        }
        addTransformer(eventName, registry) {
            this.registryMap.set(eventName, registry);
        }
        hasEvent(eventName) {
            return this.registryMap.has(eventName);
        }
        getTransformer(eventName) {
            return this.registryMap.get(eventName);
        }
    }

    /**
     * Provides the common fields for O11y events.  These events are not expected on the data provider's attributes
     * thus these must be extracted separately from different sources.
     * @param interaction
     * @param dataLayer
     * @returns CommonPayload
     */
    const getCommonEventFields = (interaction, dataLayer) => {
        var _a, _b, _c;
        const cart = (_a = interaction.cart) !== null && _a !== void 0 ? _a : {};
        const guestUUID = dataLayer.guestUUID;
        const { source, site } = dataLayer;
        const { correlationId } = (_b = cart === null || cart === void 0 ? void 0 : cart.attributes) !== null && _b !== void 0 ? _b : {}; // webstoreId isn't on the event
        const { channel } = source !== null && source !== void 0 ? source : {};
        return {
            correlationId: correlationId,
            eventName: interaction.name,
            sourceChannel: channel,
            visitorId: guestUUID,
            webstoreId: (_c = site === null || site === void 0 ? void 0 : site.webstore) === null || _c === void 0 ? void 0 : _c.id,
            channelType: site === null || site === void 0 ? void 0 : site.templateDevName,
        };
    };
    /**
     * Given an o11y schema return all the valid fields in that schema
     *
     * For example simpleSchmea:
     * export const simple = {
     *     namespace: 'sf.instrumentation',
     *     name: 'Simple',
     *     pbjsSchema: {
     *         'nested'.'sf'.'nested'.'instrumentation'.'nested'.'Simple'.'fields': {
     *                                     'text': {
     *                                         'options': { '(meta.max_length)': 25 },
     *                                         'id': 1,
     *                                         'type': 'string',
     *                                     }, ....
     *
     * Returns: { text: 'string' }
     * This also gives the possibility to return max length to trim the string among other options, but we'll keep it simple
     *
     * @param schema
     */
    const findFieldsWithType = (schema) => {
        var _a;
        for (const key in schema) {
            if (Object.prototype.hasOwnProperty.call(schema, key)) {
                // dive into the schema until you find the fields key then you can grab all the
                if (key === 'fields') {
                    // Transform the fields object to have field numbers as keys and types as values
                    const fields = schema[key];
                    const transformedFields = {};
                    for (const field in fields) {
                        if (Object.prototype.hasOwnProperty.call(fields, field)) {
                            const type = fields[field].type;
                            const rule = (_a = fields[field].rule) !== null && _a !== void 0 ? _a : undefined;
                            // Convert 'uint32' to 'number'; arrays will be of type '<type>[]'
                            if (rule === 'repeated') {
                                transformedFields[field] = type + '[]';
                            }
                            else {
                                transformedFields[field] = type === 'uint32' ? 'number' : type;
                            }
                        }
                    }
                    return transformedFields;
                }
                if (typeof schema[key] === 'object' && schema[key] !== null) {
                    const result = findFieldsWithType(schema[key]);
                    if (result !== undefined) {
                        return result;
                    }
                }
            }
        }
        WebSDKLogger.error('Invalid schema passed: ' + schema);
        return {}; // if passed in schema object has no fields then return empty object, no fields will get sent.
    };
    /**
     * Given an o11y type t return a javascript type
     * See https://protobuf.dev/programming-guides/proto3/
     * @param t
     */
    const convertType = (t) => {
        switch (t) {
            case 'double':
            case 'float':
            case 'int32':
            case 'int64':
            case 'uint32':
            case 'uint64':
            case 'sint32':
            case 'sint64':
            case 'fixed32':
            case 'fixed64':
            case 'sfixed32':
            case 'sfixed64':
                return 'number';
            case 'bool':
                return 'boolean';
            case 'string':
                return 'string';
            case 'bytes':
                return 'Uint8Array';
            default:
                return t;
        }
    };
    // (t === 'uint32' ? typeof 10 : t === 'double' ? typeof 1.1 : t);
    /**
     * Remove fields from the payload who's key and type don't match foundFieldsWithType
     * @param payload
     * @param foundFieldsWithType
     */
    const filterFoundFieldsWithType = (payload, foundFieldsWithType) => {
        return Object.fromEntries(Object.entries(payload).filter(([key, value]) => {
            if (Object.prototype.hasOwnProperty.call(foundFieldsWithType, key)) {
                if (foundFieldsWithType[key].includes('[]')) {
                    const type = foundFieldsWithType[key].substring(0, foundFieldsWithType[key].length - 2);
                    if (!Array.isArray(value) || value.filter((ele) => typeof ele !== type).length !== 0) {
                        return false;
                    }
                    return true;
                }
                return typeof payload[key] === convertType(foundFieldsWithType[key]);
            }
            return false;
        }));
    };
    /**
     * Given an obj return the flattened version of the object overriding duplicates.
     * Prefers lower order keys.
     * @param obj
     * @param prefix
     * @param res
     */
    const flattenObject = (obj, prefix = '', res = {}) => {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    flattenObject(obj[key], newKey, res);
                }
                else if (!Object.prototype.hasOwnProperty.call(res, key)) {
                    res[key] = obj[key];
                }
            }
        }
        return res;
    };
    /**
     * Traverse the schema definition until you find the top most key schema
     * @param obj
     */
    const getTopSchema = (obj) => {
        if (typeof obj !== 'object' || obj === null) {
            return null;
        }
        if ('schema' in obj) {
            return obj.schema;
        }
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && !Array.isArray(obj[key])) {
                const result = getTopSchema(obj[key]);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    };
    class O11yEventTransformer {
        constructor(registry) {
            this._registry = registry;
        }
        transform(interaction, dataLayer) {
            const commonEvents = getCommonEventFields(interaction, dataLayer);
            const specificEvents = this.getRegistryEvents(interaction);
            const events = specificEvents.length == 0
                ? [
                    {
                        schema: getTopSchema(this._registry),
                        payload: commonEvents,
                    },
                ]
                : specificEvents;
            // if no specific events given then just return the common event
            return events.map((e) => {
                const payload = Object.entries({
                    ...e.payload,
                    ...commonEvents,
                })
                    .filter(([_, value]) => value !== undefined)
                    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
                return {
                    schema: e.schema,
                    payload: payload,
                };
            });
        }
        /**
         * Takes in an event and uses the event registry to map the event to one or more events.
         * This will assume that all top level fields as well as all fields in the attribute object will get mapped to
         * the registry's top level object schema and then each sub object will be mapped recursively based on the registry
         */
        getRegistryEvents(interaction) {
            const result = [];
            const traverse = (obj, reg) => {
                const payload = {};
                const children = [];
                // if it has a plugin then use it to transform the data
                if (Object.prototype.hasOwnProperty.call(reg, 'plugins')) {
                    reg.plugins.map((p) => PLUGINS[p.type].transform(p, obj, undefined));
                }
                for (const key in obj) {
                    if (typeof obj[key] === 'object' && key !== 'attributes') {
                        children.push({ k: key, o: obj[key] });
                    }
                    else if (obj[key] !== null) {
                        // if it's primitive or attributes
                        // append all attributes to payload
                        if (key === 'attributes') {
                            Object.assign(payload, obj.attributes);
                        }
                        else {
                            // append all top level keys to payload
                            payload[key] = obj[key];
                        }
                    }
                }
                children.forEach((c) => {
                    // if key doesn't match a value in the registry then continue to use top level
                    const registry = (Object.prototype.hasOwnProperty.call(reg, c.k) ? reg[c.k] : undefined);
                    // plugins always work at its location unlike schema
                    const pluginsReg = reg[c.k];
                    // check plugins for children, if it has a plugin then use it to transform the data
                    if (pluginsReg && Object.prototype.hasOwnProperty.call(pluginsReg, 'plugins')) {
                        pluginsReg.plugins.map((p) => PLUGINS[p.type].transform(p, c.o, payload));
                    }
                    // run plugins first and if registry is undefined then i know there are no child payloads so flatten add and return
                    if (!registry) {
                        // this will be filtered out later
                        const rest = flattenObject(c.o);
                        Object.keys(rest)
                            .filter((key) => !Object.prototype.hasOwnProperty.call(payload, key))
                            .forEach((key) => {
                            payload[key] = rest[key];
                        });
                        return;
                    }
                    // if it has a schema then append it to the payload as an object otherwise we need to transform the data
                    if (Object.prototype.hasOwnProperty.call(registry, 'schema')) {
                        if (Array.isArray(c.o)) {
                            c.o.forEach((o) => traverse(o, registry));
                        }
                        else {
                            traverse(c.o, registry);
                        }
                    }
                });
                if (Object.prototype.hasOwnProperty.call(reg, 'schema')) {
                    // get all fields in the schema
                    const schemaFieldsWithType = findFieldsWithType(reg.schema);
                    result.push({
                        // filter out fields that aren't in the schema
                        schema: reg.schema,
                        payload: filterFoundFieldsWithType(payload, schemaFieldsWithType),
                    });
                }
            };
            traverse(interaction, this._registry);
            return result;
        }
    }

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class O11YEventDispatcher {
        constructor() {
            this.registry = new TransformerRegistry(O11Y_EVENT_TO_TRANSFORMER_REGISTRY);
        }
        /**
         * Creates o11y payload from interaction events and triggers a send of the event
         * @param payloadEvent
         * @param _consent
         */
        send(payloadEvent, _consent) {
            if (!window.WEBSDK || !window.WEBSDK.sendEngagementEvent) {
                WebSDKLogger.error('No o11y sendEvent method in window.');
                return;
            }
            const { interactions, ...rest } = payloadEvent;
            WebSDKLogger.log(`Received:\ninteractions=${JSON.stringify(interactions)}`);
            interactions
                .filter((interactionEvent) => interactionEvent && interactionEvent.name)
                .forEach((interactionEvent) => {
                if (!this.registry.hasEvent(interactionEvent.name)) {
                    WebSDKLogger.error(`Unrecognized interaction event ${interactionEvent.name}`);
                    return;
                }
                const registry = this.registry.getTransformer(interactionEvent.name);
                let o11yEvents;
                if (registry.transform) {
                    o11yEvents = registry.transform(interactionEvent, rest);
                }
                else {
                    o11yEvents = new O11yEventTransformer(registry).transform(interactionEvent, rest);
                }
                o11yEvents.forEach((e) => window.WEBSDK.sendEngagementEvent(e.schema, e.payload));
            });
        }
    }

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    var _a;
    (_a = window.ECEngmtEvtDispatchers) === null || _a === void 0 ? void 0 : _a.push({
        dispatcherName: 'O11Y',
        dispatcher: new O11YEventDispatcher(),
    });

})();
