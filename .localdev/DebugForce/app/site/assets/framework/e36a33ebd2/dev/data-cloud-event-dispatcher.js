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
    const DATA_PROVIDER_TYPE_CATALOG = 'catalog';
    const EVENT_PAGE_VIEW = 'page-view';
    const EVENT_EMAIL_UPDATE = 'email-update';
    const EVENT_PHONE_UPDATE = 'phone-update';
    const EVENT_ADDRESS_UPDATE = 'address-update';
    const EVENT_IDENTITY = 'identity';
    const DLO_USER_ENGAGEMENT = 'userEngagement';
    const DLO_CART = 'cart';
    const DLO_CART_ITEM = 'cartItem';
    const DLO_SEARCH = 'search';
    const DLO_CATALOG = 'catalog';
    const DLO_IDENTITY = 'identity';
    const DLO_PARTY_IDENTIFICATION = 'partyIdentification';
    const DLO_ORDER = 'order';
    const DLO_ERROR = 'error';
    const DLO_CONTACT_POINT_EMAIL = 'contactPointEmail';
    const DLO_CONTACT_POINT_PHONE = 'contactPointPhone';
    const DLO_CONTACT_POINT_ADDRESS = 'contactPointAddress';
    const DATA_CLOUD_CART_EVENT_TYPE_CART = 'cart';
    const DATA_CLOUD_CART_EVENT_TYPE_WISH_LIST = 'wish-list';
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
    const WISH_LIST_INTERACTIONS_LIST = [
        'wish-list-add',
        'wish-list-remove',
        'wish-list-replace',
        'wish-list-update',
    ];
    const INTERACTION_NAME_TO_EVENT_TYPE_MAP = {
        'cart-add': DLO_CART,
        'cart-remove': DLO_CART,
        'cart-replace': DLO_CART,
        'cart-update': DLO_CART,
        'cart-view': DLO_CART,
        'checkout-begin': DLO_CART,
        'checkout-contact-info': DLO_CART,
        'checkout-user-register': DLO_CART,
        'checkout-shipping-address': DLO_CART,
        'checkout-billing-address': DLO_CART,
        'checkout-shipping-options': DLO_CART,
        'checkout-payment': DLO_CART,
        'checkout-apply-coupon': DLO_CART,
        'checkout-review': DLO_CART,
        'checkout-submit': DLO_CART,
        'wish-list-add': DLO_CART,
        'wish-list-remove': DLO_CART,
        'wish-list-replace': DLO_CART,
        'wish-list-update': DLO_CART,
        'catalog-object-view-start': DLO_CATALOG,
        'catalog-object-view-stop': DLO_CATALOG,
        'catalog-object-click': DLO_CATALOG,
        'catalog-object-impression': DLO_CATALOG,
        'form-submit': DLO_CATALOG,
        'user-engagement': DLO_USER_ENGAGEMENT,
        'button-click': DLO_USER_ENGAGEMENT,
        'anchor-click': DLO_USER_ENGAGEMENT,
        'input-type-button-click': DLO_USER_ENGAGEMENT,
        'input-type-submit-click': DLO_USER_ENGAGEMENT,
        'input-type-reset-click': DLO_USER_ENGAGEMENT,
        'page-scroll-to-bottom': DLO_USER_ENGAGEMENT,
        'update-user-profile': DLO_USER_ENGAGEMENT,
        'page-view': DLO_USER_ENGAGEMENT,
        'email-update': DLO_CONTACT_POINT_EMAIL,
        'phone-update': DLO_CONTACT_POINT_PHONE,
        'address-update': DLO_CONTACT_POINT_ADDRESS,
        'order-accepted': DLO_ORDER,
        'category-search': DLO_SEARCH,
        search: DLO_SEARCH,
        order: DLO_ORDER,
        error: DLO_ERROR,
    };
    const PARTY_IDENTIFICATION_EVENT_DEFAULT_ID_NAME = 'CRM_Id';
    const PARTY_IDENTIFICATION_EVENT_DEFAULT_ID_TYPE = 'ES_Identifier';
    const DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT = 'Engagement';
    const DATA_CLOUD_EVENT_CATEGORY_PROFILE = 'Profile';
    const LANDING_PAGE_CONTENT_TYPE_NAME = 'sfdc_cms__landingPage';
    const USER_OPTS_OUT_OF_TRACKING = '0';
    const HTTP_ERROR_START_CODE = 400;
    const TRACKING_SERVICE_TOKEN_QUERY_PARAM = 'sftoken';
    const TRACKING_SERVICE_ENDPOINT_PATH = '/link';
    const DEVICE_IDENTIFIER = 'deviceId';
    const SECURE_HTTP_PROTOCOL = 'https';

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class CommonUtils {
        /**
         * Gets data layer content as javascript object
         * @param scriptTag
         * @returns
         */
        static getJsonFromDataLayer(scriptTag) {
            let jsonData;
            if (scriptTag != null) {
                try {
                    // Remove all white spaces before parsing the JSON string
                    jsonData = JSON.parse(scriptTag.textContent.replace(/\s/g, ''));
                }
                catch (e) {
                    WebSDKLogger.log('Failed to parse data layer JSON');
                }
            }
            return jsonData;
        }
        /**
         * Gets query string based on a data provider type
         * @param dataProviderType
         * @returns query string
         */
        static getQueryStringForDataProviderType(dataProviderType) {
            return `script[type='application/json'][data-provider-type='${dataProviderType}']`;
        }
        /**
         * Get all catalog objects from data layer
         * @param catalogObjectType
         * @param catalogObjectId
         * @returns CatalogObject array
         */
        static getCatalogObjectDataFromDataLayer(catalogObjectId, catalogObjectType) {
            return Array.from(document.querySelectorAll(this.getQueryStringForDataProviderType(DATA_PROVIDER_TYPE_CATALOG)))
                .flatMap((catalogObjectTag) => {
                return this.getJsonFromDataLayer(catalogObjectTag);
            })
                .filter((catalogObjectData) => {
                return catalogObjectData.type == catalogObjectType && catalogObjectData.id == catalogObjectId;
            });
        }
        /**
         * Converts bytes to string
         * @param bytes Uint8Array
         * @returns string
         */
        static bytesToBase64(bytes) {
            const binString = String.fromCodePoint(...bytes);
            return btoa(binString);
        }
        /**
         * Checks if a string is well formed or not
         * @param str string
         * @returns boolean
         */
        static isWellFormed(str) {
            try {
                encodeURIComponent(str);
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }

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

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    /**
     * Service to make api calls
     */
    class ApiService {
        static async get(url) {
            if (!url) {
                return;
            }
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });
                const { status, statusText } = response;
                if (status < HTTP_ERROR_START_CODE) {
                    WebSDKLogger.log(`Get call successful on URL ${url} with status code ${status}`);
                }
                else {
                    const err = new Error(`Get call failed on URL with status code ${status} and reason is: ${statusText}}`);
                    throw err;
                }
            }
            catch (e) {
                WebSDKLogger.error(`Get call successful on URL ${url} with message ${e.message}`);
            }
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class DataCloudUtils {
        /**
         * Provides the common fields of Data Cloud event
         * @param interactionName string
         * @param category string
         * @param eventType string
         * @returns DataCloudEventRequiredFields
         */
        static getCommonEventFields(interactionName, dataLayer, category, eventType) {
            const { site = {}, deviceIdentifier } = dataLayer;
            // If no siteId present default to host
            const { siteId = window.location.host } = site;
            return {
                category,
                eventType,
                eventId: crypto.randomUUID(),
                dateTime: new Date().toISOString(),
                deviceId: deviceIdentifier === null || deviceIdentifier === void 0 ? void 0 : deviceIdentifier.deviceId,
                sessionId: deviceIdentifier === null || deviceIdentifier === void 0 ? void 0 : deviceIdentifier.deviceId,
                interactionName,
                siteId,
            };
        }
        /**
         * Transfer searchResult to DataCloud search event format
         * @param searchResult SearchResult
         * @returns SearchResultFields
         */
        static transformSearchResultToDLOFormat(searchResult) {
            var _a;
            if (!searchResult || Object.keys(searchResult).length === 0) {
                return {};
            }
            const searchResultId = searchResult === null || searchResult === void 0 ? void 0 : searchResult.id;
            const searchResultAttributes = (_a = searchResult === null || searchResult === void 0 ? void 0 : searchResult.attributes) !== null && _a !== void 0 ? _a : {};
            const { title: searchResultTitle, absolutePosition: searchResultPosition, positionInPage: searchResultPositionInPage, pageNumber: searchResultPageNumber, correlationId, } = searchResultAttributes;
            return {
                searchResultId,
                searchResultTitle,
                searchResultPosition,
                searchResultPositionInPage,
                searchResultPageNumber,
                correlationId,
            };
        }
        /**
         * Checks if payload has identity event
         * @param payload WebSDKEvent<ExperienceInteractionDetails>
         * @returns boolean
         */
        static isIdentityEvent(interaction) {
            const { name: interactionName = '' } = interaction || {};
            if (interactionName === EVENT_IDENTITY) {
                return true;
            }
            return false;
        }
        /**
         * Checks if payload has page-view event
         * @param payload WebSDKEvent<ExperienceInteractionDetails>
         * @returns boolean
         */
        static isPageViewEvent(interaction) {
            const { name: interactionName = '' } = interaction || {};
            if (interactionName === EVENT_PAGE_VIEW) {
                return true;
            }
            return false;
        }
        /**
         * Checks if page is a landing page
         * @param payload WebSDKEvent<ExperienceInteractionDetails>
         * @returns boolean
         */
        static isEventFromCMSLandingPage(dataLayer) {
            var _a;
            const contentTypeName = (_a = dataLayer === null || dataLayer === void 0 ? void 0 : dataLayer.source) === null || _a === void 0 ? void 0 : _a.contentTypeName;
            if (contentTypeName && contentTypeName === LANDING_PAGE_CONTENT_TYPE_NAME) {
                return true;
            }
            return false;
        }
        /**
         * Checks if payload has any of the contact point events
         * @param payload WebSDKEvent<ExperienceInteractionDetails>
         * @returns boolean
         */
        static isContactPointEvent(interaction) {
            const { name: interactionName = '' } = interaction || {};
            if (interactionName === EVENT_EMAIL_UPDATE ||
                interactionName === EVENT_PHONE_UPDATE ||
                interactionName === EVENT_ADDRESS_UPDATE) {
                return true;
            }
            return false;
        }
        /**
         * Returns webstore information from site data layer
         * @param dataLayer DataLayer
         * @returns object
         */
        static getWebstoreInfo(dataLayer) {
            const { site = {} } = dataLayer;
            const { webstore = {} } = site;
            const { id: webStoreId = '', ...rest } = webstore;
            return {
                webStoreId,
                ...rest,
            };
        }
        /**
         * Removes any field which is undefined or null
         * @param eventList DataCloudEventList
         * @returns DataCloudEventList
         */
        static removeUndefinedAndNullAttributes(eventList) {
            const { events } = eventList;
            const newEvents = [];
            events.forEach((event) => {
                const newEvent = {};
                const eventKeys = Object.keys(event);
                eventKeys.forEach((key) => {
                    if (event[key]) {
                        newEvent[key] = event[key];
                    }
                });
                newEvents.push(newEvent);
            });
            return {
                events: newEvents,
            };
        }
        /**
         * Triggers a get call to tracking service endpoint
         * @param dataLayer DataLayer
         */
        static callTrackingServiceEndpoint(dataLayer) {
            var _a, _b;
            const trackingServiceJWT = this.getQueryParamValue(TRACKING_SERVICE_TOKEN_QUERY_PARAM);
            if (trackingServiceJWT) {
                const { deviceIdentifier: { deviceId }, } = dataLayer;
                const trackingSvcEndpoint = (_b = (_a = window.expTagMgrConfig) === null || _a === void 0 ? void 0 : _a.UMA) === null || _b === void 0 ? void 0 : _b.trackingSvcEndpoint;
                // trigger api call
                if (trackingSvcEndpoint) {
                    try {
                        const url = new URL(`${SECURE_HTTP_PROTOCOL}://${trackingSvcEndpoint}${TRACKING_SERVICE_ENDPOINT_PATH}?${TRACKING_SERVICE_TOKEN_QUERY_PARAM}=${trackingServiceJWT}&${DEVICE_IDENTIFIER}=${deviceId}`);
                        // remove additional slashes if any
                        ApiService.get(url.href.replace(/([^:]\/)\/+/g, '$1'));
                    }
                    catch (e) {
                        WebSDKLogger.error(`UMA tracking service endpoint is not a valid URL`);
                    }
                }
            }
        }
        /**
         * Returns value of a query param
         * @param param string
         * @returns string
         */
        static getQueryParamValue(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class ContactPointPayload {
        /**
         * Creates a contact point payload
         * @param interaction ExperienceInteractionDetails
         * @returns DataCloudEventContactPointEmail
         */
        static createContactPointPayload(dataLayer, interaction) {
            const commonFields = DataCloudUtils.getCommonEventFields(interaction === null || interaction === void 0 ? void 0 : interaction.name, dataLayer, DATA_CLOUD_EVENT_CATEGORY_PROFILE, INTERACTION_NAME_TO_EVENT_TYPE_MAP[interaction === null || interaction === void 0 ? void 0 : interaction.name]);
            const { name, ...rest } = interaction;
            const contactPointEvent = {
                ...commonFields,
                ...rest,
            };
            return contactPointEvent;
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class ErrorPayload {
        /**
         * Create an error payload from ErrorInteraction or error property of
         * another interaction event
         * @param errorInteraction ErrorInteractionDetails
         * @param interactionName string
         * @returns DataCloudEventError
         */
        static createErrorPayloadFromErrorInteraction(errorInteraction, dataLayer, interactionName) {
            const partialPayload = this.createPartialPayload(errorInteraction, dataLayer, interactionName);
            const { id } = errorInteraction;
            return {
                errorId: id,
                ...partialPayload,
            };
        }
        /**
         * Creates error payload from error field present in an interaction event
         * @param errorFromOtherEvent ErrorDetails
         * @param interactionName string
         * @param parentEventId string
         * @returns DataCloudEventError | null
         */
        static createErrorPayloadFromErrorField(errorFromOtherEvent, dataLayer, interactionName, parentEventId) {
            let errorPayload = null;
            if (errorFromOtherEvent && parentEventId) {
                const partialPayload = this.createPartialPayload(errorFromOtherEvent, dataLayer, interactionName);
                errorPayload = {
                    errorId: parentEventId,
                    ...partialPayload,
                };
            }
            return errorPayload;
        }
        /**
         * Create partial payload from error interaction or error field of an interaction
         * @param error ErrorDetails | ErrorInteractionDetails
         * @param interactionName string
         * @returns DataCloudEventError
         */
        static createPartialPayload(error, dataLayer, interactionName) {
            const commonFieldsForEvent = DataCloudUtils.getCommonEventFields(interactionName, dataLayer, DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT, DLO_ERROR);
            const errorAttributes = error === null || error === void 0 ? void 0 : error.attributes;
            const { message: errorMessage, type: errorType, code: errorCode, ...rest } = errorAttributes;
            return {
                ...commonFieldsForEvent,
                errorCode,
                errorMessage,
                errorType,
                ...rest,
            };
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class IdentityPayload {
        /**
         * Creates identity payload
         * @param user User
         * @returns DataCloudEventIdentity
         */
        static createIdentityPayload(dataLayer, interaction = null) {
            const { user } = dataLayer;
            const initializedUser = user !== null && user !== void 0 ? user : { attributes: {} };
            const commonFields = DataCloudUtils.getCommonEventFields('identity', dataLayer, DATA_CLOUD_EVENT_CATEGORY_PROFILE, DLO_IDENTITY);
            const { attributes, crmId } = initializedUser;
            const isAnonymous = crmId ? '0' : '1';
            const userFields = { isAnonymous, ...attributes };
            let identityPayload = {
                ...commonFields,
                ...userFields,
            };
            // process identity interaction event if available
            // merge data layer data and event data
            if ((interaction === null || interaction === void 0 ? void 0 : interaction.name) === EVENT_IDENTITY) {
                const { name, ...rest } = interaction;
                identityPayload = { ...identityPayload, ...rest };
            }
            return identityPayload;
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const CatalogObjectTypeProduct = 'Product';

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class CatalogObjectPayload {
        /**
         * Creates catalogObjects payload
         * @param catalogObjectInteraction CatalogObjectInteractionDetails
         * @param commonFields DataCloudEventRequiredFields
         * @returns DataCloudEventCatalogObject[]
         */
        static createCatalogObjectsPayload(catalogObjectInteraction, dataLayer) {
            const { name, catalogObjects } = catalogObjectInteraction;
            const events = [];
            let catalogObjectType = null;
            if (catalogObjects) {
                catalogObjectType = Array.isArray(catalogObjects) ? catalogObjects[0].type : catalogObjects.type;
            }
            let dataCloudEventType = DLO_USER_ENGAGEMENT;
            if (catalogObjectType && catalogObjectType === CatalogObjectTypeProduct) {
                dataCloudEventType = DLO_CATALOG;
            }
            const commonFields = DataCloudUtils.getCommonEventFields(name, dataLayer, DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT, dataCloudEventType);
            if (catalogObjects) {
                if (Array.isArray(catalogObjects)) {
                    catalogObjects.forEach((catalogObject) => {
                        events.push(this.createCatalogObjectPayload(catalogObject, commonFields));
                    });
                }
                else {
                    events.push(this.createCatalogObjectPayload(catalogObjects, commonFields));
                }
            }
            else {
                // No catalog object present in the interaction. Go with basic fields.
                events.push({ ...commonFields });
            }
            return events;
        }
        /**
         * Creates catalogObject payload
         * @param catalogObject CatalogObject
         * @param commonFields DataCloudEventRequiredFields
         * @returns DataCloudEventCatalogObject
         */
        static createCatalogObjectPayload(catalogObject, commonFields) {
            const { id, type, attributes } = catalogObject;
            const { eventType } = commonFields;
            const catalogObjectsFromDataLayer = CommonUtils.getCatalogObjectDataFromDataLayer(id, type);
            const catalogObjectAttributes = Object.assign({}, ...catalogObjectsFromDataLayer.map((catalogObjectFromDataLayer) => catalogObjectFromDataLayer.attributes));
            let catalogAttributes = {};
            if (eventType === DLO_USER_ENGAGEMENT) {
                catalogAttributes = { catalogObjectId: id, catalogObjectType: type };
            }
            else {
                catalogAttributes = { id, type };
            }
            return {
                ...catalogAttributes,
                ...catalogObjectAttributes,
                ...attributes,
                ...commonFields,
            };
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class SourcePayload {
        /**
         * Creates source payload
         * @param source Page
         * @returns SourceFields
         */
        static createSourcePayload(source) {
            const initializedSource = source !== null && source !== void 0 ? source : {};
            const { urlReferrer, url, locale, type, channel, pageId, title, name, urlAlias } = initializedSource;
            return {
                sourceUrlReferrer: urlReferrer,
                sourceUrl: url,
                sourceLocale: locale,
                sourceChannel: channel,
                sourcePageType: type,
                sourcePageId: pageId,
                sourcePageTitle: title,
                sourcePageName: name,
                sourceUrlAlias: urlAlias,
            };
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class CartPayload {
        /**
         * Creates cart payload
         * @param cartOrWishListInteraction CommerceCartInteractionDetails | CommerceWishListInteractionDetails
         * @param commonFields DataCloudEventRequiredFields
         * @param eventType string
         * @returns DataCloudEvent[]
         */
        static createCartOrWishListPayload(cartOrWishListInteraction, dataLayer, commonFields, eventType) {
            var _a, _b, _c, _d, _e, _f;
            const { name } = cartOrWishListInteraction;
            let cartOrWishList;
            let lineItems;
            let attributes;
            let cartOrWishListId;
            // get webstore info if present in the site data layer
            const webstore = DataCloudUtils.getWebstoreInfo(dataLayer);
            if (eventType === DATA_CLOUD_CART_EVENT_TYPE_WISH_LIST) {
                // wish-list event
                cartOrWishList =
                    (_a = cartOrWishListInteraction.wishList) !== null && _a !== void 0 ? _a : {};
                lineItems = (_b = cartOrWishList.lineItems) !== null && _b !== void 0 ? _b : [];
                attributes = (_c = cartOrWishList.attributes) !== null && _c !== void 0 ? _c : {};
                cartOrWishListId = cartOrWishList === null || cartOrWishList === void 0 ? void 0 : cartOrWishList.id;
            }
            else if (eventType === DATA_CLOUD_CART_EVENT_TYPE_CART) {
                // cart event
                cartOrWishList = (_d = cartOrWishListInteraction.cart) !== null && _d !== void 0 ? _d : {};
                lineItems = (_e = cartOrWishList.lineItems) !== null && _e !== void 0 ? _e : [];
                attributes = (_f = cartOrWishList.attributes) !== null && _f !== void 0 ? _f : {};
                cartOrWishListId = cartOrWishList === null || cartOrWishList === void 0 ? void 0 : cartOrWishList.id;
            }
            // The eventId of cart event would be used as cartEventId in the line items
            const { eventId } = commonFields;
            const cartEvent = {
                id: cartOrWishListId,
                ...commonFields,
                ...attributes,
                ...webstore,
            };
            const cartOrWishListItemEvents = [];
            if (Array.isArray(lineItems)) {
                lineItems.forEach((lineItem) => {
                    cartOrWishListItemEvents.push(this.createCartOrWishListItemPayload(lineItem, eventId, name, dataLayer));
                });
            }
            else {
                cartOrWishListItemEvents.push(this.createCartOrWishListItemPayload(lineItems, eventId, name, dataLayer));
            }
            return [cartEvent, ...cartOrWishListItemEvents];
        }
        /**
         * Creates cartItem payload
         * @param lineItem CommerceLineItem
         * @param cartEventId string
         * @param interactionName string
         * @returns DataCloudEventCartItem
         */
        static createCartOrWishListItemPayload(lineItem, cartEventId, interactionName, dataLayer) {
            var _a;
            const { id, attributes: lineItemAttributes } = lineItem;
            const catalogObject = (_a = lineItem === null || lineItem === void 0 ? void 0 : lineItem.catalogObject) !== null && _a !== void 0 ? _a : {};
            const { id: catalogObjectId, type: catalogObjectType, attributes } = catalogObject;
            return {
                ...DataCloudUtils.getCommonEventFields(interactionName, dataLayer, DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT, DLO_CART_ITEM),
                cartEventId,
                lineItemId: id,
                ...lineItemAttributes,
                catalogObjectId,
                catalogObjectType,
                ...attributes,
            };
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class SearchPayload {
        /**
         * Creates search payload
         * @param searchInteraction SearchInteractionDetails
         * @param commonFields DataCloudEventRequiredFields
         * @returns DataCloudEvent
         */
        static createSearchPayload(searchInteraction, commonFields) {
            var _a;
            const { searchQuery, categoryId } = searchInteraction;
            const searchAttributes = (_a = searchInteraction === null || searchInteraction === void 0 ? void 0 : searchInteraction.attributes) !== null && _a !== void 0 ? _a : {};
            const { searchFacetList, searchType, ...rest } = searchAttributes;
            return {
                ...commonFields,
                searchQuery,
                categoryId,
                searchFacetList: searchFacetList === null || searchFacetList === void 0 ? void 0 : searchFacetList.toString(),
                searchType: searchType === null || searchType === void 0 ? void 0 : searchType.toString(),
                ...rest,
            };
        }
    }

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class OrderPayload {
        /**
         * Creates order payload
         * @param orderInteraction CommerceOrderInteractionDetails
         * @param commonFields DataCloudEventRequiredFields
         * @returns DataCloudEvent
         */
        static createOrderPayload(orderInteraction, commonFields) {
            const { order } = orderInteraction;
            const { id, attributes } = order;
            return {
                ...commonFields,
                id,
                ...attributes,
            };
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class InteractionPayload {
        /**
         * Creates interaction payload
         * @param payload WebSDKEvent
         * @returns DataCloudEvent[]
         */
        static createInteractionPayload(interaction, dataLayer) {
            const { source, searchResult = {}, screenInfo, personalization = {}, userAgent, component = {}, catalogObjects = {}, } = dataLayer;
            const { name, status } = interaction;
            let interactionPayload = [];
            // get webstore info if present in the site data layer
            const webstore = DataCloudUtils.getWebstoreInfo(dataLayer);
            if (INTERACTION_NAME_TO_EVENT_TYPE_MAP[name] === DLO_CATALOG) {
                const catalogEvents = CatalogObjectPayload.createCatalogObjectsPayload(interaction, dataLayer);
                interactionPayload = catalogEvents.map((catalogEvent) => {
                    return {
                        ...catalogObjects, //This is for click event(single product), for impressions personalization
                        // content id comes from catalog object attributes. catalogEvent override the one coming
                        // from the catalogObjects field.
                        // TODO: Move catalog event handling to webSDK from event dispatcher
                        ...catalogEvent,
                        ...screenInfo,
                        ...component,
                        ...userAgent,
                        ...SourcePayload.createSourcePayload(source),
                        ...DataCloudUtils.transformSearchResultToDLOFormat(searchResult),
                        ...personalization,
                        ...webstore,
                        eventStatus: status,
                    };
                });
            }
            else if (INTERACTION_NAME_TO_EVENT_TYPE_MAP[name] === DLO_CART) {
                const commonFields = DataCloudUtils.getCommonEventFields(name, dataLayer, DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT, DLO_CART);
                // The event can be a cart or wish-list event
                if (WISH_LIST_INTERACTIONS_LIST.includes(name)) {
                    interactionPayload = CartPayload.createCartOrWishListPayload(interaction, dataLayer, commonFields, DATA_CLOUD_CART_EVENT_TYPE_WISH_LIST);
                }
                else if (CART_INTERACTIONS_LIST.includes(name)) {
                    interactionPayload = CartPayload.createCartOrWishListPayload(interaction, dataLayer, commonFields, DATA_CLOUD_CART_EVENT_TYPE_CART);
                }
                // enhance the cart event, not the cart-item event
                // the cart-item event refers to the cart event through cartEventId
                // TODO: The personalization content id should be added to each cartItem. Currently not handled.
                interactionPayload[0] = {
                    ...interactionPayload[0],
                    ...screenInfo,
                    ...component,
                    ...userAgent,
                    ...SourcePayload.createSourcePayload(source),
                    ...DataCloudUtils.transformSearchResultToDLOFormat(searchResult),
                    ...personalization,
                    eventStatus: status,
                };
            }
            else if (INTERACTION_NAME_TO_EVENT_TYPE_MAP[name] === DLO_SEARCH) {
                const commonFields = DataCloudUtils.getCommonEventFields(name, dataLayer, DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT, DLO_SEARCH);
                const searchPayload = SearchPayload.createSearchPayload(interaction, commonFields);
                const dataCloudEvent = {
                    ...searchPayload,
                    ...screenInfo,
                    ...component,
                    ...userAgent,
                    ...SourcePayload.createSourcePayload(source),
                    ...webstore,
                    eventStatus: status,
                };
                interactionPayload.push(dataCloudEvent);
            }
            else if (INTERACTION_NAME_TO_EVENT_TYPE_MAP[name] === DLO_ERROR) {
                const errorPayload = ErrorPayload.createErrorPayloadFromErrorInteraction(interaction, dataLayer, name);
                const dataCloudEvent = {
                    ...errorPayload,
                    ...screenInfo,
                    ...component,
                    ...userAgent,
                    ...webstore,
                    ...SourcePayload.createSourcePayload(source),
                };
                interactionPayload.push(dataCloudEvent);
            }
            else if (INTERACTION_NAME_TO_EVENT_TYPE_MAP[name] === DLO_ORDER) {
                const commonFields = DataCloudUtils.getCommonEventFields(name, dataLayer, DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT, DLO_ORDER);
                const orderPayload = OrderPayload.createOrderPayload(interaction, commonFields);
                const dataCloudEvent = {
                    ...orderPayload,
                    ...screenInfo,
                    ...component,
                    ...userAgent,
                    ...SourcePayload.createSourcePayload(source),
                    ...webstore,
                    eventStatus: status,
                };
                interactionPayload.push(dataCloudEvent);
            }
            else {
                // All other events fall into userEngagement type
                const { name: genericInteractionName, ...restOfTheInteractions } = interaction;
                // @ts-ignore
                const { attributes = {}, ...noAttributesInteractions } = restOfTheInteractions;
                const commonFields = DataCloudUtils.getCommonEventFields(genericInteractionName, dataLayer, DATA_CLOUD_EVENT_CATEGORY_ENGAGEMENT, DLO_USER_ENGAGEMENT);
                const dataCloudEvent = {
                    ...commonFields,
                    ...screenInfo,
                    ...component,
                    ...userAgent,
                    ...SourcePayload.createSourcePayload(source),
                    ...attributes,
                    ...noAttributesInteractions,
                    ...DataCloudUtils.transformSearchResultToDLOFormat(searchResult),
                    ...personalization,
                    ...webstore,
                    eventStatus: status,
                };
                interactionPayload.push(dataCloudEvent);
            }
            return interactionPayload;
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class PartyIdentificationPayload {
        /**
         * Creates party identification payload
         * @param user User
         * @returns DataCloudEventPartyIdentification
         */
        static createPartyIdentificationPayload(dataLayer) {
            var _a;
            const { user, deviceIdentifier } = dataLayer;
            const initializedUser = user !== null && user !== void 0 ? user : { attributes: {} };
            const commonFields = DataCloudUtils.getCommonEventFields('identity', dataLayer, DATA_CLOUD_EVENT_CATEGORY_PROFILE, DLO_PARTY_IDENTIFICATION);
            const { crmId } = initializedUser;
            const userAttributes = (_a = initializedUser.attributes) !== null && _a !== void 0 ? _a : {};
            const { identityResolution } = userAttributes;
            let finalPayload = null;
            if (crmId && !identityResolution) {
                // Create default party identification event to assist in IR of
                // anonymous to known user
                const partyIdentificationId = `${deviceIdentifier === null || deviceIdentifier === void 0 ? void 0 : deviceIdentifier.deviceId}_${PARTY_IDENTIFICATION_EVENT_DEFAULT_ID_TYPE}_${PARTY_IDENTIFICATION_EVENT_DEFAULT_ID_NAME}`;
                finalPayload = {
                    ...commonFields,
                    IDName: PARTY_IDENTIFICATION_EVENT_DEFAULT_ID_NAME,
                    IDType: PARTY_IDENTIFICATION_EVENT_DEFAULT_ID_TYPE,
                    userId: crmId,
                    partyIdentificationId,
                };
            }
            else if (identityResolution) {
                const { partyIdentification = {} } = identityResolution;
                const { idName, id, idType, idNumber } = partyIdentification;
                if (id && idNumber) {
                    // id and idNumber are required fields
                    finalPayload = {
                        ...commonFields,
                        IDName: idName,
                        IDType: idType,
                        userId: idNumber,
                        partyIdentificationId: id,
                    };
                }
            }
            return finalPayload;
        }
    }

    /**
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class DataCloudEventPayload {
        /**
         * Converts webSDK event to Data Cloud event list
         * @param payload WebSDKEvent
         * @returns DataCloudEventList
         */
        static createDataCloudEventPayload(interaction, dataLayer) {
            // Convert to DataCloudEvent format
            const eventPayloads = [];
            if (DataCloudUtils.isIdentityEvent(interaction)) {
                const identityEvent = IdentityPayload.createIdentityPayload(dataLayer, interaction);
                eventPayloads.push(identityEvent);
            }
            else if (DataCloudUtils.isContactPointEvent(interaction)) {
                const contactPointEvent = ContactPointPayload.createContactPointPayload(dataLayer, interaction);
                eventPayloads.push(contactPointEvent);
            }
            else {
                if (DataCloudUtils.isPageViewEvent(interaction)) {
                    //Additional processing for landing pages to unify profiles
                    //Trigger get call to messaging endpoint
                    DataCloudUtils.callTrackingServiceEndpoint(dataLayer);
                    //Temporary fix for Landing Pages
                    //If the page is a UMA Landing Page, don't include identity and partyIdentification events
                    if (!DataCloudUtils.isEventFromCMSLandingPage(dataLayer)) {
                        // Include identity and party identification data cloud
                        // events only for page-view event
                        const profile = IdentityPayload.createIdentityPayload(dataLayer);
                        eventPayloads.push(profile);
                        // Add party identification event if details available in user data layer;
                        // otherwise add a default event if user has logged in.
                        const partyIdentification = PartyIdentificationPayload.createPartyIdentificationPayload(dataLayer);
                        partyIdentification && eventPayloads.push(partyIdentification);
                    }
                }
                const interactions = InteractionPayload.createInteractionPayload(interaction, dataLayer);
                eventPayloads.push(...interactions);
                // Create a error payload if error field is present as part if the interaction event
                const error = ErrorPayload.createErrorPayloadFromErrorField(interaction === null || interaction === void 0 ? void 0 : interaction.error, dataLayer, interaction === null || interaction === void 0 ? void 0 : interaction.name, interactions[0].eventId);
                error && eventPayloads.push(error);
            }
            return eventPayloads;
        }
    }

    /**
     * Copyright (c) 2024, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class DataCloudEventDispatcher {
        /**
         * Formats payload and send data to the Data Cloud
         * @param payload string
         */
        sendEvent(payload) {
            const { tenantSpecificEndpoint, appSourceId } = window.expTagMgrConfig.dataCloud;
            if (tenantSpecificEndpoint && appSourceId) {
                if (CommonUtils.isWellFormed(payload)) {
                    const base64EncodePayload = CommonUtils.bytesToBase64(new TextEncoder().encode(payload));
                    const uriEncodedPayload = encodeURIComponent(base64EncodePayload);
                    let dataCloudEndpoint = '';
                    const endpointSuffix = `/web/events/${appSourceId}?event=`;
                    if (!tenantSpecificEndpoint.includes('https://')) {
                        dataCloudEndpoint = `https://${tenantSpecificEndpoint}${endpointSuffix}`;
                    }
                    else {
                        dataCloudEndpoint = `${tenantSpecificEndpoint}${endpointSuffix}`;
                    }
                    // Send the event
                    ApiService.get(`${dataCloudEndpoint}${uriEncodedPayload}`);
                }
                else {
                    WebSDKLogger.log('Payload is not well formed');
                }
            }
            else {
                WebSDKLogger.log('Invalid DC configuration');
            }
        }
        /**
         * Creates the final payload and triggers a send
         * @param payload WebSDKEvent
         */
        send(payload, consent) {
            var _a;
            if (!((_a = window.expTagMgrConfig) === null || _a === void 0 ? void 0 : _a.dataCloud) || !consent || consent.dataUsePurpose === USER_OPTS_OUT_OF_TRACKING) {
                WebSDKLogger.log(`Could not send event as all conditions are not evaluating to true`);
                return;
            }
            const { interactions, ...rest } = payload;
            const eventPayload = [];
            // Check if multiple interactions are present
            if (interactions.length > 1) {
                interactions.forEach((interactionEvent) => {
                    // if the interaction is a valid experience_interaction event, then ony process it
                    // TODO: Add typescript schema check
                    (interactionEvent === null || interactionEvent === void 0 ? void 0 : interactionEvent.name) &&
                        eventPayload.push(...DataCloudEventPayload.createDataCloudEventPayload(interactionEvent, { ...rest }));
                });
            }
            else {
                eventPayload.push(...DataCloudEventPayload.createDataCloudEventPayload(interactions[0], { ...rest }));
            }
            if (eventPayload.length) {
                const finalPayload = {
                    events: eventPayload,
                };
                const noUndefinedAttributesPayload = DataCloudUtils.removeUndefinedAndNullAttributes(finalPayload);
                this.sendEvent(JSON.stringify(noUndefinedAttributesPayload));
            }
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
        dispatcherName: 'DataCloud',
        dispatcher: new DataCloudEventDispatcher(),
    });

})();
