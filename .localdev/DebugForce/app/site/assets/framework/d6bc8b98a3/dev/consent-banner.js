/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/consent-banner-consent-mode.js":
/*!********************************************!*\
  !*** ./src/consent-banner-consent-mode.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsentBannerConsentMode: () => (/* binding */ ConsentBannerConsentMode)
/* harmony export */ });
/**
 * An enumeration that represents default assumptions regarding consent for tracking web engagement activity.
 */
const ConsentBannerConsentMode = Object.freeze({
    REQUIRED: "REQUIRED",
    NOT_REQUIRED: "NOT_REQUIRED",
    from: function(value) {
        let input = value.toUpperCase();
        return ([this.REQUIRED, this.NOT_REQUIRED].indexOf(input) !== -1) ? input : this.REQUIRED;
    },
});




/***/ }),

/***/ "./src/consent-banner-tracking-mode.js":
/*!*********************************************!*\
  !*** ./src/consent-banner-tracking-mode.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsentBannerTrackingMode: () => (/* binding */ ConsentBannerTrackingMode)
/* harmony export */ });
/**
 * An enumeration that represents the Salesforce Web SDKs with which the Consent Banner can integrate.
 */
const ConsentBannerTrackingMode = Object.freeze({
    DATA_CLOUD: "DATA_CLOUD",
    EXPERIENCE_SERVICES: "EXPERIENCE_SERVICES",
    from: function(value) {
        let input = value.toUpperCase();
        return ([this.DATA_CLOUD, this.EXPERIENCE_SERVICES].indexOf(input) !== -1) ? input : this.EXPERIENCE_SERVICES;
    },
});




/***/ }),

/***/ "./src/consent-cookie.js":
/*!*******************************!*\
  !*** ./src/consent-cookie.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsentCookie: () => (/* binding */ ConsentCookie)
/* harmony export */ });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ "./src/cookie.js");
/* harmony import */ var samesite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! samesite */ "./src/samesite.js");
/* harmony import */ var time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! time */ "./src/time.js");




/**
 * This structure manages creation and control of the UMA Web Tracking consent cookie.
 *
 * It is a lightweight wrapper around the {@link Cookie} API designed to enforce opinionated values for the cookie
 * name, value, and attributes.
 *
 * This structure is an implementation detail of {@link ConsentManager} and should not be used outside of that context.
 */
class ConsentCookie {
    static DEFAULT_TTL_DAYS = 365;

    #date;
    #orgId;
    #domain;
    #cookie;

    /**
     * Constructor.
     *
     * @param {string} orgId A Salesforce organization ID.
     * @param {string} domain The eTLD+1 domain for which tracking consent should be stored.
     * @param {Date|null} date An optionally configured Date object primarily used for test purposes.
     */
    constructor(orgId, domain, date = null) {
        this.#orgId = orgId;
        this.#domain = domain;
        this.#cookie = cookie__WEBPACK_IMPORTED_MODULE_0__.Cookie.get(this.#getCookieName()) ?? new cookie__WEBPACK_IMPORTED_MODULE_0__.Cookie(this.#getCookieName(), false);
        this.#date = date ?? new Date();
    }

    /**
     * Mark the consent cookie as expired in browser storage.
     *
     * @param {string} orgId
     * @returns {Promise<void>}
     */
    delete(orgId) {
        let cookie = cookie__WEBPACK_IMPORTED_MODULE_0__.Cookie.get(orgId);
        cookie.delete();
    }

    /**
     * Reports if the consent cookie has been created.
     *
     * @returns {boolean}
     */
    exists() {
        return cookie__WEBPACK_IMPORTED_MODULE_0__.Cookie.exists(this.#getCookieName());
    }

    /**
     * Gets the explicit value for the consent cookie.
     *
     * @internal We don't cast to boolean because that would interpret the string literal "false" as true and the
     * received value when reading a cookie from the browser typically presents the value as a string.
     * @returns {boolean} True if consent is explicitly granted; otherwise, false.
     */
    get() {
        return this.#cookie.value === true || ((typeof(this.#cookie.value) === "string") && (this.#cookie.value.toLowerCase() === "true"));
    }

    /**
     * Creates or updates the consent cookie with the given consent value.
     *
     * If this cookie is not registered as being associated with a Salesforce-owned domain,
     * we set it on the eTLD+1 of the current location; otherwise, we set it on the exact domain
     * of the current location.
     *
     * @param {boolean} value The explicit consent value to store in the consent cookie.
     * @param {int} days The number of days until the consent cookie expires.
     * @returns {void}
     */
    set(value, days = ConsentCookie.DEFAULT_TTL_DAYS) {
        this.#cookie.value = value;
        this.#cookie.attributes.domain = this.#domain;
        this.#cookie.attributes.expiresSeconds = (this.#date.getTime() / time__WEBPACK_IMPORTED_MODULE_2__.MILLISECONDS_PER_SECOND) + (days * time__WEBPACK_IMPORTED_MODULE_2__.SECONDS_PER_DAY);
        this.#cookie.attributes.path = "/";
        this.#cookie.attributes.sameSite = samesite__WEBPACK_IMPORTED_MODULE_1__.SameSite.STRICT;
        this.#cookie.attributes.secure = location.protocol === "https:";
        this.#cookie.set();
    }

    /**
     * Constructs the name of the consent cookie.
     *
     * @returns {string} The name of the consent cookie.
     */
    #getCookieName() {
        return `sfmc_consent_${this.#orgId}`;
    }
}




/***/ }),

/***/ "./src/consent-manager.js":
/*!********************************!*\
  !*** ./src/consent-manager.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsentManager: () => (/* binding */ ConsentManager)
/* harmony export */ });
/* harmony import */ var consent_banner_tracking_mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! consent-banner-tracking-mode */ "./src/consent-banner-tracking-mode.js");
/* harmony import */ var consent_banner_consent_mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! consent-banner-consent-mode */ "./src/consent-banner-consent-mode.js");
/* harmony import */ var consent_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! consent-cookie */ "./src/consent-cookie.js");
/* harmony import */ var data_cloud_consent_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! data-cloud-consent-manager */ "./src/data-cloud-consent-manager.js");
/* harmony import */ var experience_services_consent_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! experience-services-consent-manager */ "./src/experience-services-consent-manager.js");
/* harmony import */ var _domain_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./domain-manager */ "./src/domain-manager.js");







/**
 * This structure handles managing consent options expressed by an end-user.
 *
 * This structure's primary responsibilities are:
 * 1. Persisting storage of consent options into the browser and
 * 2. Submitting consent options to a Salesforce Web SDK backend
 *
 * This structure may be considered part of the public API for this module
 * and is exposed through the {@link ConsentBanner}.
 */
class ConsentManager {
    #orgId;
    #cookieDomain;
    #consentCookie;
    #domainManager;
    #trackingMode;
    #consentMode;
    #consentManager;

    /**
     * Constructor.
     *
     * @param {int} orgId
     * @param {string} trackingMode
     * @param {string} consentMode
     * @param {boolean} isSalesforceDomain
     */
    constructor(orgId, trackingMode, consentMode, isSalesforceDomain) {
        this.#orgId = orgId;
        this.#trackingMode = consent_banner_tracking_mode__WEBPACK_IMPORTED_MODULE_0__.ConsentBannerTrackingMode.from(trackingMode);
        this.#consentMode = consent_banner_consent_mode__WEBPACK_IMPORTED_MODULE_1__.ConsentBannerConsentMode.from(consentMode);
        this.#domainManager = new _domain_manager__WEBPACK_IMPORTED_MODULE_5__.DomainManager();
        this.#cookieDomain = this.#domainManager.getETLD(isSalesforceDomain);
        this.#consentCookie = new consent_cookie__WEBPACK_IMPORTED_MODULE_2__.ConsentCookie(this.#orgId, this.#cookieDomain);
        this.#consentManager = this.#trackingMode === consent_banner_tracking_mode__WEBPACK_IMPORTED_MODULE_0__.ConsentBannerTrackingMode.DATA_CLOUD
            ? new data_cloud_consent_manager__WEBPACK_IMPORTED_MODULE_3__.DataCloudConsentManager(this.getCookieDomain())
            : new experience_services_consent_manager__WEBPACK_IMPORTED_MODULE_4__.ExperienceServicesConsentManager(this.getCookieDomain());
    }

    /**
     * Indicates if the system has been granted consent for web engagement tracking.
     *
     * @returns {boolean}
     */
    hasConsent() {
        return (this.#consentMode === consent_banner_consent_mode__WEBPACK_IMPORTED_MODULE_1__.ConsentBannerConsentMode.NOT_REQUIRED) || this.#consentCookie.exists();
    }

    /**
     * Initializes the state of consent with a Salesforce Web SDK backend, usu. invoked on page load.
     *
     * @param {Event} event A DOM event.
     * @returns {void}
     */
    initConsent(event) {
        if (this.#consentMode === consent_banner_consent_mode__WEBPACK_IMPORTED_MODULE_1__.ConsentBannerConsentMode.NOT_REQUIRED) {
            this.#consentManager.setConsent(event, true);
        } else if (this.#consentCookie.exists()) {
            this.#consentManager.setConsent(event, this.#consentCookie.get());
        } else {
            this.#consentManager.setConsent(event, false);
        }
    }

    /**
     * Reports the current explicit or implicit consent for web engagement tracking.
     *
     * @returns {boolean}
     */
    getConsent() {
        if (!this.hasConsent()) {
            return false;
        }
        return (this.#consentMode === consent_banner_consent_mode__WEBPACK_IMPORTED_MODULE_1__.ConsentBannerConsentMode.NOT_REQUIRED) || this.#consentCookie.get();
    }

    /**
     * Returns the domain to use for consent and/or other required cookies.
     *
     * This will be the eTLD+1 domain for any non-Salesforce hostname or the exact domain for Salesforce hostnames.
     *
     * @returns {string}
     */
    getCookieDomain() {
        return this.#cookieDomain;
    }

    /**
     * Registers an explicit end-user consent choice.
     *
     * @param {Event} event
     * @param {boolean} value
     * @returns {void}
     */
    setConsent(event, value) {
        this.#consentCookie.set(value);
        this.#consentManager.setConsent(event, value);
    }

    /**
     * Clears any explicit consent option from the browser.
     *
     * @returns {void}
     */
    clearConsent() {
        this.#consentCookie.delete()
    }
}



/***/ }),

/***/ "./src/cookie-attributes.js":
/*!**********************************!*\
  !*** ./src/cookie-attributes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CookieAttributes: () => (/* binding */ CookieAttributes)
/* harmony export */ });
/* harmony import */ var time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! time */ "./src/time.js");


/**
 * Represents the standard collection of attributes for HTTP cookies.
 */
class CookieAttributes {
    static DOMAIN = "domain";
    static EXPIRES = "expires";
    static HTTP_ONLY = "httponly";
    static PATH = "path";
    static SAMESITE = "samesite";
    static SECURE = "secure";

    #attributes = null;
    #date = null;

    /**
     * Constructor.
     *
     * @param {Date|null} date An optionally configured Date object primarily used for test purposes.
     */
    constructor(date = null) {
        this.#date = date ?? new Date();
    }

    /**
     * Returns the host to which the cookie will be sent.
     *
     * @returns {string|null} Returns a hostname or null if the value was never set.
     */
    get domain() {
        return this.#getAttribute(CookieAttributes.DOMAIN);
    }

    /**
     * Sets the host to which the cookie will be sent.
     *
     * @param {string} value
     * @returns {void}
     */
    set domain(value) {
        this.#setAttribute(CookieAttributes.DOMAIN, value);
    }

    /**
     * Returns the expiry date of the cookie in {@link https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1|RFC 7231} format.
     *
     * @returns {string|null} Returns the expiry date or null if it was never set.
     */
    get expires() {
        return this.#getAttribute(CookieAttributes.EXPIRES);
    }

    /**
     * Sets the expiry date of the cookie in {@link https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1|RFC 7231} format.
     *
     * @param {string} utc A {@link https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1|RFC 7231} format date-time string.
     * @returns {void}
     */
    set expires(utc) {
        this.#setAttribute(CookieAttributes.EXPIRES, utc);
    }

    /**
     * Sets the expiry date of the cookie in {@link https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1|RFC 7231} format.
     *
     * @param {int} seconds Seconds elapsed since the Unix epoch.
     * @returns {void}
     */
    set expiresSeconds(seconds) {
        if (seconds != null) {
            this.#date.setTime(seconds * time__WEBPACK_IMPORTED_MODULE_0__.MILLISECONDS_PER_SECOND)
            this.#setAttribute(CookieAttributes.EXPIRES, this.#date.toUTCString());
        }
    }

    /**
     * Returns if the cookie should be accessible to client-side script.
     *
     * @returns {boolean} True if the cookie should not be accessible to client-side scripts; else, false.
     */
    get httpOnly() {
        return Boolean(this.#getAttribute(CookieAttributes.HTTP_ONLY));
    }

    /**
     * Sets if the cookie should be accessible to client-side script.
     *
     * @param {boolean} value True if the cookie should not be accessible to client-side scripts; else, false.
     * @returns {void}
     */
    set httpOnly(value) {
        this.#setAttribute(CookieAttributes.HTTP_ONLY, Boolean(value));
    }

    /**
     * Returns a URL path that must exist in the requested URL in order to send this cookie.
     *
     * @returns {string|null} Returns the URL path or null if it was never set.
     */
    get path() {
        return this.#getAttribute(CookieAttributes.PATH);
    }

    /**
     * Sets a URL path that must exist in the requested URL in order to send this cookie.
     *
     * @param {string} value
     */
    set path(value) {
        this.#setAttribute(CookieAttributes.PATH, value);
    }

    /**
     * Returns a value specifying the conditions under which this cookie will be sent.
     *
     * @returns {string|null} Possible values are "lax", "strict", "none", or null if it was never set.
     * @see SameSite
     */
    get sameSite() {
        return this.#getAttribute(CookieAttributes.SAMESITE);
    }

    /**
     * Sets a value specifying the conditions under which this cookie will be sent.
     *
     * @param {string} value Possible values are "lax", "strict", or "none".
     * @see SameSite
     */
    set sameSite(value) {
        this.#setAttribute(CookieAttributes.SAMESITE, value);
    }

    /**
     * Returns if the browser should only include the cookie in requests transmitted over a secure channel.
     *
     * @returns {boolean|null} True if the browser should only include the cookie in secure requests; else, false.
     */
    get secure() {
        return Boolean(this.#getAttribute(CookieAttributes.SECURE));
    }

    /**
     * Sets if the browser should only include the cookie in requests transmitted over a secure channel.
     *
     * @param {boolean} value
     */
    set secure(value) {
        this.#setAttribute(CookieAttributes.SECURE, Boolean(value));
    }

    /**
     * @param {string} name
     * @returns {boolean|string|int|null}
     */
    #getAttribute(name) {
        if ((this.#attributes == null) || !Object.keys(this.#attributes).includes(name)) {
            return null;
        }
        return this.#attributes[name];
    }

    /**
     * @param {string} name
     * @param {boolean|int|string} value
     */
    #setAttribute(name, value) {
        if (value != null) {
            this.#attributes = this.#attributes ?? {};
            this.#attributes[name] = value;
        }
    }
}



/***/ }),

/***/ "./src/cookie.js":
/*!***********************!*\
  !*** ./src/cookie.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cookie: () => (/* binding */ Cookie),
/* harmony export */   UninitializedCookieError: () => (/* binding */ UninitializedCookieError)
/* harmony export */ });
/* harmony import */ var cookie_attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie-attributes */ "./src/cookie-attributes.js");


/**
 * Represents an invalid attempt to update a cookie that exists in the browser without knowing or explicitly settings
 * its associated attributes.
 */
class UninitializedCookieError extends Error {
    constructor(message) {
        super(message);
    }
}

/**
 * An API for HTTP cookies.
 *
 * There are two primary facets to this API:
 * 1. It contains a collection of static and class functions that support interaction with the browser's cookie jar, i.e. things that manipulate `document.cookie`.
 * 2. It can be instantiated and configured to represent an HTTP cookie in-memory.
 *
 * Note that a quirk of this API design is that - by default - it will disallow saving a cookie read into memory from
 * the browser directly back into the browser! This is because cookies read from the browser only contain the cookie's
 * name-value pair; it does not include the cookie's attributes. If you were to immediately save the cookie back out,
 * it would very likely create a new, separate cookie due to the uninitialized attributes.
 *
 * Initializing any of the cookie's attributes with a non-null value with then make the cookie eligible for saving
 * back into the browser, as the system will assume any custom configuration now makes the in-memory representation
 * of a cookie the authoritative version.
 *
 * See the "set" suite of tests in cookie.test.js for test coverage related to the described behavior.
 */
class Cookie {
    #name;
    #value;
    #attributes = null;

    /**
     * Gets the explicit value for the cookie with the given name.
     *
     * @param {string} cookieName The name of the cookie for which to query.
     * @returns {Cookie|null} True if consent is explicitly granted, false if not, or null if the cookie does not exist.
     */
    static get(cookieName) {
        let cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(cookieName)) ?? null;
        return Cookie.#parse(cookie);
    }

    /**
     * Reports if a cookie with the given name has been created.
     *
     * @param {string} cookieName The name of the cookie for which to query.
     * @returns {boolean}
     */
    static exists(cookieName) {
        let re = new RegExp(cookieName + "=([^;]+)");
        let value = re.exec(document.cookie);
        return value !== null;
    }

    /**
     * Construct an in-memory representation of an HTTP cookie based on its raw string representation.
     *
     * @param {string} value The raw string representation of an HTTP cookie.
     * @returns {Cookie|null} An in-memory representation of an HTTP cookie or null if the given string could not be parsed.
     */
    static fromString(value) {
        return Cookie.#parse(value);
    }

    /**
     * Parse the raw string representation of an HTTP cookie.
     *
     * @param {string} value The raw string representation of an HTTP cookie.
     * @returns {Cookie|null} An in-memory representation of an HTTP cookie or null if the given string could not be parsed.
     * @todo Validate that a name=value pair is successfully parsed from any given non-empty value...
     */
    static #parse(value) {
        if (value === undefined || value === null || value === "") {
            return null;
        }

        let values = Object.fromEntries(value.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)));
        let keys = Object.keys(values);
        let name = keys[0];

        let attributes = null;
        if (keys.length > 1) {
            attributes = new cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes();
            attributes.domain = values[cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.DOMAIN] ?? null;
            attributes.path = values[cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.PATH] ?? null;
            attributes.expires = values[cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.EXPIRES] ?? null;
            attributes.sameSite = values[cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.SAMESITE] ?? null;
            attributes.secure = keys.includes(cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.SECURE) ?? null;
            attributes.httpOnly = keys.includes(cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.HTTP_ONLY) ?? null;
        }

        return new Cookie(
            decodeURIComponent(name),
            decodeURIComponent(values[name]),
            attributes
        )
    }

    /**
     * Constructor.
     *
     * @param {string} name
     * @param {boolean|int|string} value
     * @param {CookieAttributes|null} attributes
     */
    constructor(name, value, attributes= new cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes()) {
        this.#name = name;
        this.#value = value;
        this.#attributes = attributes;
    }

    /**
     * Returns the name of the cookie.
     *
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Returns the current value of the cookie.
     *
     * @returns {boolean|int|string}
     */
    get value() {
        return this.#value;
    }

    /**
     * Sets the in-memory value of this cookie.
     *
     * @param {boolean|int|string} value
     * @returns void
     */
    set value(value) {
        this.#value = value;
    }

    /**
     * Returns the attributes associated with this cookie.
     *
     * @returns {CookieAttributes}
     */
    get attributes() {
        return this.#attributes;
    }

    /**
     * Mark the cookie as expired in the browser.
     */
    delete() {
        this.#attributes.expiresSeconds = 0;
        this.set();
    }

    /**
     * Persist the in-memory value and attributes of this cookie into the browser.
     * @returns void
     */
    set() {
        if (this.#attributes === null) {
            throw new UninitializedCookieError(`Refusing to write cookie named "${this.#name}" with uninitialized attributes.`);
        }

        document.cookie = this.toString();
    }

    /**
     * Return this cookie as a raw string representation.
     *
     * @returns {string}
     */
    toString() {
        let result = `${encodeURIComponent(this.#name)}=${encodeURIComponent(this.#value)}`;

        if (this.#attributes !== null) {
            if (this.#attributes.domain !== null) {
                result += `; ${cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.DOMAIN}=${this.#attributes.domain}`
            }

            if (this.#attributes.expires !== null) {
                result += `; ${cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.EXPIRES}=${this.#attributes.expires}`
            }

            if (this.#attributes.httpOnly === true) {
                result += `; ${cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.HTTP_ONLY}`
            }

            if (this.#attributes.path !== null) {
                result += `; ${cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.PATH}=${this.#attributes.path}`
            }

            if (this.#attributes.sameSite !== null) {
                result += `; ${cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.SAMESITE}=${this.#attributes.sameSite}`
            }

            if (this.#attributes.secure === true) {
                result += `; ${cookie_attributes__WEBPACK_IMPORTED_MODULE_0__.CookieAttributes.SECURE}`
            }
        }

        return result;
    }
}



/***/ }),

/***/ "./src/data-cloud-consent-manager.js":
/*!*******************************************!*\
  !*** ./src/data-cloud-consent-manager.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataCloudConsentManager: () => (/* binding */ DataCloudConsentManager)
/* harmony export */ });
/**
 * This is a helper structure which controls submission of consent values to the Data Cloud Web SDK.
 *
 * This structure is an implementation detail of {@link ConsentManager} and should not be used outside of that context.
 */
class DataCloudConsentManager {
    #cookieDomain = null;

    /**
     * @param {string} cookieDomain
     */
    constructor(cookieDomain) {
        this.#cookieDomain = cookieDomain;
    }

    /**
     * Registers a consent value with the Data Cloud Web SDK.
     * @param {Event} event The DOM event associated with the consent value change.
     * @param {boolean} value True if consent is granted; else, false.
     * @returns {boolean}
     * @see https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360a_api_salesforce_interactions_web_sdk.htm
     * @see https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360a_api_consent.htm
     */
    setConsent(event, value) {
        /* global SalesforceInteractions */
        if (typeof SalesforceInteractions === "undefined" || typeof event === "undefined" || event === null) {
            console.error("Failed to register consent with Data Cloud Web SDK.")
            return false;
        }

        // Create Data Cloud consent object
        let consent = {
            provider: "Salesforce Marketing Cloud",
            purpose: SalesforceInteractions.ConsentPurpose.Tracking,
            status: value
                ? SalesforceInteractions.ConsentStatus.OptIn
                : SalesforceInteractions.ConsentStatus.OptOut
        };

        // Initialize Data Cloud Web SDK with consent configuration
        SalesforceInteractions.init({
            consents: [consent],
            cookieDomain: this.#cookieDomain ?? window.location.hostname
        }).then(() => {});
        return true;
    }
}



/***/ }),

/***/ "./src/domain-manager.js":
/*!*******************************!*\
  !*** ./src/domain-manager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomainManager: () => (/* binding */ DomainManager)
/* harmony export */ });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ "./src/cookie.js");


/**
 * This manager should contain generally useful methods for interacting with or manipulating Internet domain names.
 */
class DomainManager {
    static PROBE_COOKIE_NAME = "_sfmc_pc";

    /**
     * Retrieves the extended top-level domain plus 1 (eTLD+1) for the current document's hostname IFF it
     * is not a Salesforce-owned domain. Otherwise, it returns the exact domain.
     *
     * Note that this method relies on an implementation detail of most major web browsers, assuming that
     * they will refuse to set a cookie on a top-level domain, e.g. .com, .co.uk, .shinjuku.tokyo.jp, etc.
     *
     * @param {boolean} isSalesforceDomain True if the current browser location is known to be a Salesforce-owned domain; else, false.
     * @returns {string} The eTLD+1 domain for the current document's hostname.
     */
    getETLD(isSalesforceDomain) {
        let cookieDomain = window.location.hostname;
        if (isSalesforceDomain) {
            return cookieDomain;
        }

        let probeCookie = new cookie__WEBPACK_IMPORTED_MODULE_0__.Cookie(DomainManager.PROBE_COOKIE_NAME, true);
        try {
            // Walk the given domain from its top-level component down to its most specific subdomain
            // to determine the highest-level domain on which we can successfully set a cookie
            let domains = cookieDomain.split(".");
            probeCookie.attributes.domain = domains.pop();
            while (domains.length > 0 && !cookie__WEBPACK_IMPORTED_MODULE_0__.Cookie.exists(probeCookie.name)) {
                probeCookie.attributes.domain = domains.pop() + '.' + probeCookie.attributes.domain;
                probeCookie.set();
            }
            return probeCookie.attributes.domain;
        } finally {
            probeCookie.delete();
        }
    }
}



/***/ }),

/***/ "./src/experience-services-consent-manager.js":
/*!****************************************************!*\
  !*** ./src/experience-services-consent-manager.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExperienceServicesConsentManager: () => (/* binding */ ExperienceServicesConsentManager)
/* harmony export */ });
/**
 * This is a helper structure which controls submission of consent values to the Experience Services Web SDK.
 *
 * This structure is an implementation detail of {@link ConsentManager} and should not be used outside of that context.
 */
class ExperienceServicesConsentManager {
    #cookieDomain = null;

    /**
     * @param {string} cookieDomain
     */
    constructor(cookieDomain) {
        this.#cookieDomain = cookieDomain;
    }

    /**
     * Registers a consent value with the Experience Services Web SDK.
     * @param {Event} event The DOM event associated with the consent value change.
     * @param {boolean} value True if consent is granted; else, false.
     * @returns {boolean}
     */
    setConsent(event, value) {
        // Confirm we have a valid event
        if (typeof event === "undefined" || event === null) {
            console.error("Failed to register consent with Experience Services Web SDK.")
            return false;
        }

        // Explicitly set the Web SDK's cookie domain
        event.target.dispatchEvent(
            new CustomEvent('experience_interaction', {
                bubbles: true,
                composed: true,
                detail: {
                    name: 'set-cookie-domain',
                    domain: this.#cookieDomain,
                },
            })
        );

        // Explicitly set the consent cookie's value
        event.target.dispatchEvent(
            new CustomEvent('experience_interaction', {
                bubbles: true,
                composed: true,
                detail: {
                    name: 'set-consent',
                    value: value
                },
            })
        );
        return true;
    }
}



/***/ }),

/***/ "./src/samesite.js":
/*!*************************!*\
  !*** ./src/samesite.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SameSite: () => (/* binding */ SameSite)
/* harmony export */ });
const SameSite = Object.freeze({
    LAX: "lax",
    STRICT: "strict",
    NONE: "none"
});




/***/ }),

/***/ "./src/time.js":
/*!*********************!*\
  !*** ./src/time.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MILLISECONDS_PER_SECOND: () => (/* binding */ MILLISECONDS_PER_SECOND),
/* harmony export */   SECONDS_PER_DAY: () => (/* binding */ SECONDS_PER_DAY)
/* harmony export */ });
const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 24 * 60 * 60;




/***/ }),

/***/ "./src/ui-tools.js":
/*!*************************!*\
  !*** ./src/ui-tools.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UiTools: () => (/* binding */ UiTools)
/* harmony export */ });
/**
 * Helper class for manipulating dom elements
 */
class UiTools {

    /**
     * Appends text to an HTML element.
     *
     * @param {string} elementId The name of the element to append a text node.
     * @param {string} text The text content of the text node.
     */
    static appendText(elementId, text) {
        if (!text) {
            return;
        }

        const el = document.querySelector(elementId);
        if (el === null) {
            return;
        }

        if (!text.endsWith(".")) {
            text += ".";
        }

        const node = document.createTextNode(text);
        el.appendChild(node);
    }

}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/consent-banner.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsentBanner: () => (/* binding */ ConsentBanner)
/* harmony export */ });
/* harmony import */ var consent_banner_tracking_mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! consent-banner-tracking-mode */ "./src/consent-banner-tracking-mode.js");
/* harmony import */ var consent_banner_consent_mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! consent-banner-consent-mode */ "./src/consent-banner-consent-mode.js");
/* harmony import */ var consent_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! consent-manager */ "./src/consent-manager.js");
/* harmony import */ var _ui_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui-tools */ "./src/ui-tools.js");





/**
 * This structure manages rendering and processing of a UI banner that prompts and gathers consent from an end-user.
 *
 * This structure is part of the public API for this Javascript module.
 */
class ConsentBanner {
    static #DEFAULT_BANNER_MESSAGE = "We use cookies to enhance your browsing experience, serve personalized content or ads, and analyze web traffic. By accepting, you consent to our use of cookies.";
    static #DEFAULT_BANNER_COLOR = "#FFFFFF";
    static #DEFAULT_BANNER_TEXT_COLOR = "#000000";
    static #DEFAULT_BANNER_POSITION = "top";
    static #DEFAULT_BANNER_FONT_FAMILY = "serif";
    static #DEFAULT_ALLOW_BUTTON_COLOR = "#FFFFFF";
    static #DEFAULT_ALLOW_BUTTON_TEXT_COLOR = "#000000";
    static #DEFAULT_DECLINE_BUTTON_COLOR = "#FFFFFF";
    static #DEFAULT_DECLINE_BUTTON_TEXT_COLOR = "#000000";
    static #DEFAULT_PRIVACY_POLICY_TEXT = "Review our privacy policy";
    static #DEFAULT_TRACKING_MODE = consent_banner_tracking_mode__WEBPACK_IMPORTED_MODULE_0__.ConsentBannerTrackingMode.EXPERIENCE_SERVICES.value;
    static #DEFAULT_CONSENT_MODE = consent_banner_consent_mode__WEBPACK_IMPORTED_MODULE_1__.ConsentBannerConsentMode.REQUIRED.value;
    static #DEFAULT_IS_SALESFORCE_DOMAIN = true;

    #rootElement = null;
    #consentManager;
    orgId;
    bannerMessage;
    bannerColor;
    bannerTextColor;
    bannerPosition;
    bannerFontFamily;
    allowButtonColor;
    allowButtonTextColor;
    declineButtonColor;
    declineButtonTextColor;
    privacyPolicyText;
    trackingMode;
    consentMode;
    isSalesforceDomain;

    /**
     * Constructor.
     *
     * @param {Object} config A Javascript object that contains all values for the ConsentBannerSettings Entity.
     */
    constructor(config = {}) {
        Object.assign(this, config);
        this.#rootElement = null;
        this.#consentManager = new consent_manager__WEBPACK_IMPORTED_MODULE_2__.ConsentManager(
            this.orgId,
            this.trackingMode ?? ConsentBanner.#DEFAULT_TRACKING_MODE,
            this.consentMode ?? ConsentBanner.#DEFAULT_CONSENT_MODE,
            this.isSalesforceDomain ?? ConsentBanner.#DEFAULT_IS_SALESFORCE_DOMAIN
        );
        document.addEventListener("DOMContentLoaded", (event) => {
            this.#onLoad(event);
        });
    }

    /**
     * Returns the ConsentManager instance used by this structure.
     *
     * @returns {ConsentManager}
     */
    get consentManager() {
        return this.#consentManager;
    }

    /**
     * Page load event handler that initializes a consent value.
     *
     * @param {Event} event
     */
    #onLoad(event) {
        this.consentManager.initConsent(event);
        if (!this.consentManager.hasConsent()) {
            this.#appendHtml(document.body);
        }
    }

    /**
     * Registers explicitly granted consent with the browser and Salesforce Web SDK backends.
     *
     * @param {Event} event
     */
    #onAccept(event) {
        this.consentManager.setConsent(event, true)
        this.#rootElement.style.display = "none";
    }

    /**
     * Registers explicitly rejected consent with the browser and Salesforce Web SDK backends.
     *
     * @param {Event} event
     */
    #onReject(event) {
        this.consentManager.setConsent(event, false)
        this.#rootElement.style.display = "none";
    }

    /**
     * Injects the consent banner component into the current HTML document.
     *
     * @param {Element} element The HTML element to which the consent banner component will be appended as a child.
     */
    #appendHtml(element) {
        this.#rootElement = document.createElement('div');
        this.#rootElement.innerHTML = this.#toHtml();
        element.appendChild(this.#rootElement);

        _ui_tools__WEBPACK_IMPORTED_MODULE_3__.UiTools.appendText('#sfmc-consent-banner-message-content', this.#_bannerMessage);
        _ui_tools__WEBPACK_IMPORTED_MODULE_3__.UiTools.appendText('#sfmc-consent-banner-privacy-policy-link', this.#_privacyPolicyText);
        _ui_tools__WEBPACK_IMPORTED_MODULE_3__.UiTools.appendText('#sfmc-consent-banner-info-link', this.#_infoText);

        const elAccept = document.querySelector("#sfmc-consent-banner-accept-button");
        elAccept.addEventListener("click", (event) => {
            this.#onAccept(event);
        });

        const elReject = document.querySelector("#sfmc-consent-banner-decline-button");
        elReject.addEventListener("click", (event) => {
            this.#onReject(event);
        });
    }

    get #_bannerMessage() {
        return this.bannerMessage ?? ConsentBanner.#DEFAULT_BANNER_MESSAGE;
    }

    get #_bannerColor() {
        return this.bannerColor ?? ConsentBanner.#DEFAULT_BANNER_COLOR;
    }

    get #_bannerTextColor() {
        return this.bannerTextColor ?? ConsentBanner.#DEFAULT_BANNER_TEXT_COLOR;
    }

    get #_bannerPosition() {
        return (this.bannerPosition ?? ConsentBanner.#DEFAULT_BANNER_POSITION).toLowerCase();
    }

    get #_bannerFontFamily() {
        return this.bannerFontFamily ?? ConsentBanner.#DEFAULT_BANNER_FONT_FAMILY;
    }

    get #_allowButtonColor() {
        return this.allowButtonColor ?? ConsentBanner.#DEFAULT_ALLOW_BUTTON_COLOR;
    }

    get #_allowButtonTextColor() {
        return this.allowButtonTextColor ?? ConsentBanner.#DEFAULT_ALLOW_BUTTON_TEXT_COLOR;
    }

    get #_declineButtonColor() {
        return this.declineButtonColor ?? ConsentBanner.#DEFAULT_DECLINE_BUTTON_COLOR;
    }

    get #_declineButtonTextColor() {
        return this.declineButtonTextColor ?? ConsentBanner.#DEFAULT_DECLINE_BUTTON_TEXT_COLOR;
    }

    get #_privacyPolicyText() {
        return this.privacyPolicyText ?? ConsentBanner.#DEFAULT_PRIVACY_POLICY_TEXT;
    }

    get #_privacyPolicyLink() {
        const url = this.privacyPolicyUrl ?? null;
        return (url === null) ? "" : `<a id="sfmc-consent-banner-privacy-policy-link" href="${encodeURI(url)}"></a>`;
    }

    get #_infoText() {
        return this.infoText ?? null;
    }

    get #_infoLink() {
        const url = this.infoUrl ?? null;
        return (url === null) ? "" : `<a id="sfmc-consent-banner-info-link" href="${encodeURI(url)}"></a>`;
    }

    /**
     * Returns the HTML markup that will render the consent banner.
     *
     * @returns {string}
     */
    #toHtml() {
        return `
<style>
    #sfmc-consent-banner {
        background-color: ${this.#_bannerColor};
        box-shadow: 2px 2px 5px 2px #DDD;
        border-radius: 0.35rem;
        ${this.#_bannerPosition}: 2rem;
        color: ${this.#_bannerTextColor};
        display: grid;
        font-family: ${this.#_bannerFontFamily};
        font-size: 1rem;
        grid-template-columns: 1fr 250px;
        left: 0;
        margin: 0 auto;
        min-width: 240px;
        padding: 1rem 2rem;
        position: fixed;
        right: 0;
        width: 70%;
        z-index: 999;
    }
    
    #sfmc-consent-banner button {
        border-radius: 0.35rem;
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
    }
    
    #sfmc-consent-banner-message {
        padding: 0 1rem; 
        align-self: center;
    }
    
    #sfmc-consent-banner-message script {
        display: inline;
    }
    
    #sfmc-consent-banner-buttons {
        align-self: center;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        justify-self: center;
        padding: 1em;
    }
    
    #sfmc-consent-banner-accept-button {
        border: 1px solid ${this.#_allowButtonTextColor};
        background-color: ${this.#_allowButtonColor};
        color: ${this.#_allowButtonTextColor};
    }
    
    #sfmc-consent-banner-decline-button {
        border: 1px solid ${this.#_declineButtonTextColor};
        background-color: ${this.#_declineButtonColor};
        color: ${this.#_declineButtonTextColor};
    }
    
    @media screen and (max-width: 600px) {
        #sfmc-consent-banner {
            grid-template-columns: 1fr;
        }
    }
</style>
<div id="sfmc-consent-banner" tabindex="-1">
    <div id="sfmc-consent-banner-message">
        <span id="sfmc-consent-banner-message-content"></span>
        <span id="sfmc-consent-banner-message-privacy-policy">${this.#_privacyPolicyLink}</span>
        <span id="sfmc-consent-banner-message-info">${this.#_infoLink}</span>
    </div>
    <div id="sfmc-consent-banner-buttons">
        <button id="sfmc-consent-banner-accept-button">Accept</button>
        <button id="sfmc-consent-banner-decline-button">Reject</button>        
    </div>
</div>
`
    }
}


window.sfmc = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UseUJBQXlCO0FBQ3pGLHNEQUFzRCxnQkFBZ0I7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ZtYy8uL3NyYy9jb25zZW50LWJhbm5lci1jb25zZW50LW1vZGUuanMiLCJ3ZWJwYWNrOi8vc2ZtYy8uL3NyYy9jb25zZW50LWJhbm5lci10cmFja2luZy1tb2RlLmpzIiwid2VicGFjazovL3NmbWMvLi9zcmMvY29uc2VudC1jb29raWUuanMiLCJ3ZWJwYWNrOi8vc2ZtYy8uL3NyYy9jb25zZW50LW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc2ZtYy8uL3NyYy9jb29raWUtYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9zZm1jLy4vc3JjL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly9zZm1jLy4vc3JjL2RhdGEtY2xvdWQtY29uc2VudC1tYW5hZ2VyLmpzIiwid2VicGFjazovL3NmbWMvLi9zcmMvZG9tYWluLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc2ZtYy8uL3NyYy9leHBlcmllbmNlLXNlcnZpY2VzLWNvbnNlbnQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zZm1jLy4vc3JjL3NhbWVzaXRlLmpzIiwid2VicGFjazovL3NmbWMvLi9zcmMvdGltZS5qcyIsIndlYnBhY2s6Ly9zZm1jLy4vc3JjL3VpLXRvb2xzLmpzIiwid2VicGFjazovL3NmbWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ZtYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ZtYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NmbWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zZm1jLy4vc3JjL2NvbnNlbnQtYmFubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gZW51bWVyYXRpb24gdGhhdCByZXByZXNlbnRzIGRlZmF1bHQgYXNzdW1wdGlvbnMgcmVnYXJkaW5nIGNvbnNlbnQgZm9yIHRyYWNraW5nIHdlYiBlbmdhZ2VtZW50IGFjdGl2aXR5LlxuICovXG5jb25zdCBDb25zZW50QmFubmVyQ29uc2VudE1vZGUgPSBPYmplY3QuZnJlZXplKHtcbiAgICBSRVFVSVJFRDogXCJSRVFVSVJFRFwiLFxuICAgIE5PVF9SRVFVSVJFRDogXCJOT1RfUkVRVUlSRURcIixcbiAgICBmcm9tOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBsZXQgaW5wdXQgPSB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gKFt0aGlzLlJFUVVJUkVELCB0aGlzLk5PVF9SRVFVSVJFRF0uaW5kZXhPZihpbnB1dCkgIT09IC0xKSA/IGlucHV0IDogdGhpcy5SRVFVSVJFRDtcbiAgICB9LFxufSk7XG5cbmV4cG9ydCB7XG4gICAgQ29uc2VudEJhbm5lckNvbnNlbnRNb2RlLFxufVxuIiwiLyoqXG4gKiBBbiBlbnVtZXJhdGlvbiB0aGF0IHJlcHJlc2VudHMgdGhlIFNhbGVzZm9yY2UgV2ViIFNES3Mgd2l0aCB3aGljaCB0aGUgQ29uc2VudCBCYW5uZXIgY2FuIGludGVncmF0ZS5cbiAqL1xuY29uc3QgQ29uc2VudEJhbm5lclRyYWNraW5nTW9kZSA9IE9iamVjdC5mcmVlemUoe1xuICAgIERBVEFfQ0xPVUQ6IFwiREFUQV9DTE9VRFwiLFxuICAgIEVYUEVSSUVOQ0VfU0VSVklDRVM6IFwiRVhQRVJJRU5DRV9TRVJWSUNFU1wiLFxuICAgIGZyb206IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGxldCBpbnB1dCA9IHZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiAoW3RoaXMuREFUQV9DTE9VRCwgdGhpcy5FWFBFUklFTkNFX1NFUlZJQ0VTXS5pbmRleE9mKGlucHV0KSAhPT0gLTEpID8gaW5wdXQgOiB0aGlzLkVYUEVSSUVOQ0VfU0VSVklDRVM7XG4gICAgfSxcbn0pO1xuXG5leHBvcnQge1xuICAgIENvbnNlbnRCYW5uZXJUcmFja2luZ01vZGUsXG59XG4iLCJpbXBvcnQge0Nvb2tpZX0gZnJvbSBcImNvb2tpZVwiO1xuaW1wb3J0IHtTYW1lU2l0ZX0gZnJvbSBcInNhbWVzaXRlXCI7XG5pbXBvcnQge01JTExJU0VDT05EU19QRVJfU0VDT05ELCBTRUNPTkRTX1BFUl9EQVl9IGZyb20gXCJ0aW1lXCI7XG5cbi8qKlxuICogVGhpcyBzdHJ1Y3R1cmUgbWFuYWdlcyBjcmVhdGlvbiBhbmQgY29udHJvbCBvZiB0aGUgVU1BIFdlYiBUcmFja2luZyBjb25zZW50IGNvb2tpZS5cbiAqXG4gKiBJdCBpcyBhIGxpZ2h0d2VpZ2h0IHdyYXBwZXIgYXJvdW5kIHRoZSB7QGxpbmsgQ29va2llfSBBUEkgZGVzaWduZWQgdG8gZW5mb3JjZSBvcGluaW9uYXRlZCB2YWx1ZXMgZm9yIHRoZSBjb29raWVcbiAqIG5hbWUsIHZhbHVlLCBhbmQgYXR0cmlidXRlcy5cbiAqXG4gKiBUaGlzIHN0cnVjdHVyZSBpcyBhbiBpbXBsZW1lbnRhdGlvbiBkZXRhaWwgb2Yge0BsaW5rIENvbnNlbnRNYW5hZ2VyfSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkIG91dHNpZGUgb2YgdGhhdCBjb250ZXh0LlxuICovXG5jbGFzcyBDb25zZW50Q29va2llIHtcbiAgICBzdGF0aWMgREVGQVVMVF9UVExfREFZUyA9IDM2NTtcblxuICAgICNkYXRlO1xuICAgICNvcmdJZDtcbiAgICAjZG9tYWluO1xuICAgICNjb29raWU7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmdJZCBBIFNhbGVzZm9yY2Ugb3JnYW5pemF0aW9uIElELlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkb21haW4gVGhlIGVUTEQrMSBkb21haW4gZm9yIHdoaWNoIHRyYWNraW5nIGNvbnNlbnQgc2hvdWxkIGJlIHN0b3JlZC5cbiAgICAgKiBAcGFyYW0ge0RhdGV8bnVsbH0gZGF0ZSBBbiBvcHRpb25hbGx5IGNvbmZpZ3VyZWQgRGF0ZSBvYmplY3QgcHJpbWFyaWx5IHVzZWQgZm9yIHRlc3QgcHVycG9zZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3JnSWQsIGRvbWFpbiwgZGF0ZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy4jb3JnSWQgPSBvcmdJZDtcbiAgICAgICAgdGhpcy4jZG9tYWluID0gZG9tYWluO1xuICAgICAgICB0aGlzLiNjb29raWUgPSBDb29raWUuZ2V0KHRoaXMuI2dldENvb2tpZU5hbWUoKSkgPz8gbmV3IENvb2tpZSh0aGlzLiNnZXRDb29raWVOYW1lKCksIGZhbHNlKTtcbiAgICAgICAgdGhpcy4jZGF0ZSA9IGRhdGUgPz8gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXJrIHRoZSBjb25zZW50IGNvb2tpZSBhcyBleHBpcmVkIGluIGJyb3dzZXIgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmdJZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgICAqL1xuICAgIGRlbGV0ZShvcmdJZCkge1xuICAgICAgICBsZXQgY29va2llID0gQ29va2llLmdldChvcmdJZCk7XG4gICAgICAgIGNvb2tpZS5kZWxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGlmIHRoZSBjb25zZW50IGNvb2tpZSBoYXMgYmVlbiBjcmVhdGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZXhpc3RzKCkge1xuICAgICAgICByZXR1cm4gQ29va2llLmV4aXN0cyh0aGlzLiNnZXRDb29raWVOYW1lKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGV4cGxpY2l0IHZhbHVlIGZvciB0aGUgY29uc2VudCBjb29raWUuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWwgV2UgZG9uJ3QgY2FzdCB0byBib29sZWFuIGJlY2F1c2UgdGhhdCB3b3VsZCBpbnRlcnByZXQgdGhlIHN0cmluZyBsaXRlcmFsIFwiZmFsc2VcIiBhcyB0cnVlIGFuZCB0aGVcbiAgICAgKiByZWNlaXZlZCB2YWx1ZSB3aGVuIHJlYWRpbmcgYSBjb29raWUgZnJvbSB0aGUgYnJvd3NlciB0eXBpY2FsbHkgcHJlc2VudHMgdGhlIHZhbHVlIGFzIGEgc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGNvbnNlbnQgaXMgZXhwbGljaXRseSBncmFudGVkOyBvdGhlcndpc2UsIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2Nvb2tpZS52YWx1ZSA9PT0gdHJ1ZSB8fCAoKHR5cGVvZih0aGlzLiNjb29raWUudmFsdWUpID09PSBcInN0cmluZ1wiKSAmJiAodGhpcy4jY29va2llLnZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IFwidHJ1ZVwiKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBvciB1cGRhdGVzIHRoZSBjb25zZW50IGNvb2tpZSB3aXRoIHRoZSBnaXZlbiBjb25zZW50IHZhbHVlLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBjb29raWUgaXMgbm90IHJlZ2lzdGVyZWQgYXMgYmVpbmcgYXNzb2NpYXRlZCB3aXRoIGEgU2FsZXNmb3JjZS1vd25lZCBkb21haW4sXG4gICAgICogd2Ugc2V0IGl0IG9uIHRoZSBlVExEKzEgb2YgdGhlIGN1cnJlbnQgbG9jYXRpb247IG90aGVyd2lzZSwgd2Ugc2V0IGl0IG9uIHRoZSBleGFjdCBkb21haW5cbiAgICAgKiBvZiB0aGUgY3VycmVudCBsb2NhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgVGhlIGV4cGxpY2l0IGNvbnNlbnQgdmFsdWUgdG8gc3RvcmUgaW4gdGhlIGNvbnNlbnQgY29va2llLlxuICAgICAqIEBwYXJhbSB7aW50fSBkYXlzIFRoZSBudW1iZXIgb2YgZGF5cyB1bnRpbCB0aGUgY29uc2VudCBjb29raWUgZXhwaXJlcy5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXQodmFsdWUsIGRheXMgPSBDb25zZW50Q29va2llLkRFRkFVTFRfVFRMX0RBWVMpIHtcbiAgICAgICAgdGhpcy4jY29va2llLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuI2Nvb2tpZS5hdHRyaWJ1dGVzLmRvbWFpbiA9IHRoaXMuI2RvbWFpbjtcbiAgICAgICAgdGhpcy4jY29va2llLmF0dHJpYnV0ZXMuZXhwaXJlc1NlY29uZHMgPSAodGhpcy4jZGF0ZS5nZXRUaW1lKCkgLyBNSUxMSVNFQ09ORFNfUEVSX1NFQ09ORCkgKyAoZGF5cyAqIFNFQ09ORFNfUEVSX0RBWSk7XG4gICAgICAgIHRoaXMuI2Nvb2tpZS5hdHRyaWJ1dGVzLnBhdGggPSBcIi9cIjtcbiAgICAgICAgdGhpcy4jY29va2llLmF0dHJpYnV0ZXMuc2FtZVNpdGUgPSBTYW1lU2l0ZS5TVFJJQ1Q7XG4gICAgICAgIHRoaXMuI2Nvb2tpZS5hdHRyaWJ1dGVzLnNlY3VyZSA9IGxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xuICAgICAgICB0aGlzLiNjb29raWUuc2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyB0aGUgbmFtZSBvZiB0aGUgY29uc2VudCBjb29raWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgY29uc2VudCBjb29raWUuXG4gICAgICovXG4gICAgI2dldENvb2tpZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiBgc2ZtY19jb25zZW50XyR7dGhpcy4jb3JnSWR9YDtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgQ29uc2VudENvb2tpZSxcbn1cbiIsImltcG9ydCB7Q29uc2VudEJhbm5lclRyYWNraW5nTW9kZX0gZnJvbSBcImNvbnNlbnQtYmFubmVyLXRyYWNraW5nLW1vZGVcIjtcbmltcG9ydCB7Q29uc2VudEJhbm5lckNvbnNlbnRNb2RlfSBmcm9tIFwiY29uc2VudC1iYW5uZXItY29uc2VudC1tb2RlXCI7XG5pbXBvcnQge0NvbnNlbnRDb29raWV9IGZyb20gXCJjb25zZW50LWNvb2tpZVwiO1xuaW1wb3J0IHtEYXRhQ2xvdWRDb25zZW50TWFuYWdlcn0gZnJvbSBcImRhdGEtY2xvdWQtY29uc2VudC1tYW5hZ2VyXCI7XG5pbXBvcnQge0V4cGVyaWVuY2VTZXJ2aWNlc0NvbnNlbnRNYW5hZ2VyfSBmcm9tIFwiZXhwZXJpZW5jZS1zZXJ2aWNlcy1jb25zZW50LW1hbmFnZXJcIjtcbmltcG9ydCB7RG9tYWluTWFuYWdlcn0gZnJvbSBcIi4vZG9tYWluLW1hbmFnZXJcIjtcblxuLyoqXG4gKiBUaGlzIHN0cnVjdHVyZSBoYW5kbGVzIG1hbmFnaW5nIGNvbnNlbnQgb3B0aW9ucyBleHByZXNzZWQgYnkgYW4gZW5kLXVzZXIuXG4gKlxuICogVGhpcyBzdHJ1Y3R1cmUncyBwcmltYXJ5IHJlc3BvbnNpYmlsaXRpZXMgYXJlOlxuICogMS4gUGVyc2lzdGluZyBzdG9yYWdlIG9mIGNvbnNlbnQgb3B0aW9ucyBpbnRvIHRoZSBicm93c2VyIGFuZFxuICogMi4gU3VibWl0dGluZyBjb25zZW50IG9wdGlvbnMgdG8gYSBTYWxlc2ZvcmNlIFdlYiBTREsgYmFja2VuZFxuICpcbiAqIFRoaXMgc3RydWN0dXJlIG1heSBiZSBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIHB1YmxpYyBBUEkgZm9yIHRoaXMgbW9kdWxlXG4gKiBhbmQgaXMgZXhwb3NlZCB0aHJvdWdoIHRoZSB7QGxpbmsgQ29uc2VudEJhbm5lcn0uXG4gKi9cbmNsYXNzIENvbnNlbnRNYW5hZ2VyIHtcbiAgICAjb3JnSWQ7XG4gICAgI2Nvb2tpZURvbWFpbjtcbiAgICAjY29uc2VudENvb2tpZTtcbiAgICAjZG9tYWluTWFuYWdlcjtcbiAgICAjdHJhY2tpbmdNb2RlO1xuICAgICNjb25zZW50TW9kZTtcbiAgICAjY29uc2VudE1hbmFnZXI7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50fSBvcmdJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja2luZ01vZGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29uc2VudE1vZGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzU2FsZXNmb3JjZURvbWFpblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9yZ0lkLCB0cmFja2luZ01vZGUsIGNvbnNlbnRNb2RlLCBpc1NhbGVzZm9yY2VEb21haW4pIHtcbiAgICAgICAgdGhpcy4jb3JnSWQgPSBvcmdJZDtcbiAgICAgICAgdGhpcy4jdHJhY2tpbmdNb2RlID0gQ29uc2VudEJhbm5lclRyYWNraW5nTW9kZS5mcm9tKHRyYWNraW5nTW9kZSk7XG4gICAgICAgIHRoaXMuI2NvbnNlbnRNb2RlID0gQ29uc2VudEJhbm5lckNvbnNlbnRNb2RlLmZyb20oY29uc2VudE1vZGUpO1xuICAgICAgICB0aGlzLiNkb21haW5NYW5hZ2VyID0gbmV3IERvbWFpbk1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy4jY29va2llRG9tYWluID0gdGhpcy4jZG9tYWluTWFuYWdlci5nZXRFVExEKGlzU2FsZXNmb3JjZURvbWFpbik7XG4gICAgICAgIHRoaXMuI2NvbnNlbnRDb29raWUgPSBuZXcgQ29uc2VudENvb2tpZSh0aGlzLiNvcmdJZCwgdGhpcy4jY29va2llRG9tYWluKTtcbiAgICAgICAgdGhpcy4jY29uc2VudE1hbmFnZXIgPSB0aGlzLiN0cmFja2luZ01vZGUgPT09IENvbnNlbnRCYW5uZXJUcmFja2luZ01vZGUuREFUQV9DTE9VRFxuICAgICAgICAgICAgPyBuZXcgRGF0YUNsb3VkQ29uc2VudE1hbmFnZXIodGhpcy5nZXRDb29raWVEb21haW4oKSlcbiAgICAgICAgICAgIDogbmV3IEV4cGVyaWVuY2VTZXJ2aWNlc0NvbnNlbnRNYW5hZ2VyKHRoaXMuZ2V0Q29va2llRG9tYWluKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBpZiB0aGUgc3lzdGVtIGhhcyBiZWVuIGdyYW50ZWQgY29uc2VudCBmb3Igd2ViIGVuZ2FnZW1lbnQgdHJhY2tpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNDb25zZW50KCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuI2NvbnNlbnRNb2RlID09PSBDb25zZW50QmFubmVyQ29uc2VudE1vZGUuTk9UX1JFUVVJUkVEKSB8fCB0aGlzLiNjb25zZW50Q29va2llLmV4aXN0cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBzdGF0ZSBvZiBjb25zZW50IHdpdGggYSBTYWxlc2ZvcmNlIFdlYiBTREsgYmFja2VuZCwgdXN1LiBpbnZva2VkIG9uIHBhZ2UgbG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEEgRE9NIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGluaXRDb25zZW50KGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLiNjb25zZW50TW9kZSA9PT0gQ29uc2VudEJhbm5lckNvbnNlbnRNb2RlLk5PVF9SRVFVSVJFRCkge1xuICAgICAgICAgICAgdGhpcy4jY29uc2VudE1hbmFnZXIuc2V0Q29uc2VudChldmVudCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4jY29uc2VudENvb2tpZS5leGlzdHMoKSkge1xuICAgICAgICAgICAgdGhpcy4jY29uc2VudE1hbmFnZXIuc2V0Q29uc2VudChldmVudCwgdGhpcy4jY29uc2VudENvb2tpZS5nZXQoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiNjb25zZW50TWFuYWdlci5zZXRDb25zZW50KGV2ZW50LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIHRoZSBjdXJyZW50IGV4cGxpY2l0IG9yIGltcGxpY2l0IGNvbnNlbnQgZm9yIHdlYiBlbmdhZ2VtZW50IHRyYWNraW5nLlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0Q29uc2VudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbnNlbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy4jY29uc2VudE1vZGUgPT09IENvbnNlbnRCYW5uZXJDb25zZW50TW9kZS5OT1RfUkVRVUlSRUQpIHx8IHRoaXMuI2NvbnNlbnRDb29raWUuZ2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZG9tYWluIHRvIHVzZSBmb3IgY29uc2VudCBhbmQvb3Igb3RoZXIgcmVxdWlyZWQgY29va2llcy5cbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBiZSB0aGUgZVRMRCsxIGRvbWFpbiBmb3IgYW55IG5vbi1TYWxlc2ZvcmNlIGhvc3RuYW1lIG9yIHRoZSBleGFjdCBkb21haW4gZm9yIFNhbGVzZm9yY2UgaG9zdG5hbWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb29raWVEb21haW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNjb29raWVEb21haW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGFuIGV4cGxpY2l0IGVuZC11c2VyIGNvbnNlbnQgY2hvaWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgc2V0Q29uc2VudChldmVudCwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy4jY29uc2VudENvb2tpZS5zZXQodmFsdWUpO1xuICAgICAgICB0aGlzLiNjb25zZW50TWFuYWdlci5zZXRDb25zZW50KGV2ZW50LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGFueSBleHBsaWNpdCBjb25zZW50IG9wdGlvbiBmcm9tIHRoZSBicm93c2VyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgY2xlYXJDb25zZW50KCkge1xuICAgICAgICB0aGlzLiNjb25zZW50Q29va2llLmRlbGV0ZSgpXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIENvbnNlbnRNYW5hZ2VyLFxufSIsImltcG9ydCB7TUlMTElTRUNPTkRTX1BFUl9TRUNPTkR9IGZyb20gXCJ0aW1lXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgc3RhbmRhcmQgY29sbGVjdGlvbiBvZiBhdHRyaWJ1dGVzIGZvciBIVFRQIGNvb2tpZXMuXG4gKi9cbmNsYXNzIENvb2tpZUF0dHJpYnV0ZXMge1xuICAgIHN0YXRpYyBET01BSU4gPSBcImRvbWFpblwiO1xuICAgIHN0YXRpYyBFWFBJUkVTID0gXCJleHBpcmVzXCI7XG4gICAgc3RhdGljIEhUVFBfT05MWSA9IFwiaHR0cG9ubHlcIjtcbiAgICBzdGF0aWMgUEFUSCA9IFwicGF0aFwiO1xuICAgIHN0YXRpYyBTQU1FU0lURSA9IFwic2FtZXNpdGVcIjtcbiAgICBzdGF0aWMgU0VDVVJFID0gXCJzZWN1cmVcIjtcblxuICAgICNhdHRyaWJ1dGVzID0gbnVsbDtcbiAgICAjZGF0ZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RGF0ZXxudWxsfSBkYXRlIEFuIG9wdGlvbmFsbHkgY29uZmlndXJlZCBEYXRlIG9iamVjdCBwcmltYXJpbHkgdXNlZCBmb3IgdGVzdCBwdXJwb3Nlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRlID0gbnVsbCkge1xuICAgICAgICB0aGlzLiNkYXRlID0gZGF0ZSA/PyBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhvc3QgdG8gd2hpY2ggdGhlIGNvb2tpZSB3aWxsIGJlIHNlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IFJldHVybnMgYSBob3N0bmFtZSBvciBudWxsIGlmIHRoZSB2YWx1ZSB3YXMgbmV2ZXIgc2V0LlxuICAgICAqL1xuICAgIGdldCBkb21haW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNnZXRBdHRyaWJ1dGUoQ29va2llQXR0cmlidXRlcy5ET01BSU4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGhvc3QgdG8gd2hpY2ggdGhlIGNvb2tpZSB3aWxsIGJlIHNlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXQgZG9tYWluKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuI3NldEF0dHJpYnV0ZShDb29raWVBdHRyaWJ1dGVzLkRPTUFJTiwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGV4cGlyeSBkYXRlIG9mIHRoZSBjb29raWUgaW4ge0BsaW5rIGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTcuMS4xLjF8UkZDIDcyMzF9IGZvcm1hdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gUmV0dXJucyB0aGUgZXhwaXJ5IGRhdGUgb3IgbnVsbCBpZiBpdCB3YXMgbmV2ZXIgc2V0LlxuICAgICAqL1xuICAgIGdldCBleHBpcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0QXR0cmlidXRlKENvb2tpZUF0dHJpYnV0ZXMuRVhQSVJFUyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZXhwaXJ5IGRhdGUgb2YgdGhlIGNvb2tpZSBpbiB7QGxpbmsgaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNy4xLjEuMXxSRkMgNzIzMX0gZm9ybWF0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV0YyBBIHtAbGluayBodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzcyMzEjc2VjdGlvbi03LjEuMS4xfFJGQyA3MjMxfSBmb3JtYXQgZGF0ZS10aW1lIHN0cmluZy5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBzZXQgZXhwaXJlcyh1dGMpIHtcbiAgICAgICAgdGhpcy4jc2V0QXR0cmlidXRlKENvb2tpZUF0dHJpYnV0ZXMuRVhQSVJFUywgdXRjKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBleHBpcnkgZGF0ZSBvZiB0aGUgY29va2llIGluIHtAbGluayBodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzcyMzEjc2VjdGlvbi03LjEuMS4xfFJGQyA3MjMxfSBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludH0gc2Vjb25kcyBTZWNvbmRzIGVsYXBzZWQgc2luY2UgdGhlIFVuaXggZXBvY2guXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgc2V0IGV4cGlyZXNTZWNvbmRzKHNlY29uZHMpIHtcbiAgICAgICAgaWYgKHNlY29uZHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4jZGF0ZS5zZXRUaW1lKHNlY29uZHMgKiBNSUxMSVNFQ09ORFNfUEVSX1NFQ09ORClcbiAgICAgICAgICAgIHRoaXMuI3NldEF0dHJpYnV0ZShDb29raWVBdHRyaWJ1dGVzLkVYUElSRVMsIHRoaXMuI2RhdGUudG9VVENTdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGlmIHRoZSBjb29raWUgc2hvdWxkIGJlIGFjY2Vzc2libGUgdG8gY2xpZW50LXNpZGUgc2NyaXB0LlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvb2tpZSBzaG91bGQgbm90IGJlIGFjY2Vzc2libGUgdG8gY2xpZW50LXNpZGUgc2NyaXB0czsgZWxzZSwgZmFsc2UuXG4gICAgICovXG4gICAgZ2V0IGh0dHBPbmx5KCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLiNnZXRBdHRyaWJ1dGUoQ29va2llQXR0cmlidXRlcy5IVFRQX09OTFkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGlmIHRoZSBjb29raWUgc2hvdWxkIGJlIGFjY2Vzc2libGUgdG8gY2xpZW50LXNpZGUgc2NyaXB0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBUcnVlIGlmIHRoZSBjb29raWUgc2hvdWxkIG5vdCBiZSBhY2Nlc3NpYmxlIHRvIGNsaWVudC1zaWRlIHNjcmlwdHM7IGVsc2UsIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHNldCBodHRwT25seSh2YWx1ZSkge1xuICAgICAgICB0aGlzLiNzZXRBdHRyaWJ1dGUoQ29va2llQXR0cmlidXRlcy5IVFRQX09OTFksIEJvb2xlYW4odmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgVVJMIHBhdGggdGhhdCBtdXN0IGV4aXN0IGluIHRoZSByZXF1ZXN0ZWQgVVJMIGluIG9yZGVyIHRvIHNlbmQgdGhpcyBjb29raWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IFJldHVybnMgdGhlIFVSTCBwYXRoIG9yIG51bGwgaWYgaXQgd2FzIG5ldmVyIHNldC5cbiAgICAgKi9cbiAgICBnZXQgcGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2dldEF0dHJpYnV0ZShDb29raWVBdHRyaWJ1dGVzLlBBVEgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBVUkwgcGF0aCB0aGF0IG11c3QgZXhpc3QgaW4gdGhlIHJlcXVlc3RlZCBVUkwgaW4gb3JkZXIgdG8gc2VuZCB0aGlzIGNvb2tpZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldCBwYXRoKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuI3NldEF0dHJpYnV0ZShDb29raWVBdHRyaWJ1dGVzLlBBVEgsIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdmFsdWUgc3BlY2lmeWluZyB0aGUgY29uZGl0aW9ucyB1bmRlciB3aGljaCB0aGlzIGNvb2tpZSB3aWxsIGJlIHNlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IFBvc3NpYmxlIHZhbHVlcyBhcmUgXCJsYXhcIiwgXCJzdHJpY3RcIiwgXCJub25lXCIsIG9yIG51bGwgaWYgaXQgd2FzIG5ldmVyIHNldC5cbiAgICAgKiBAc2VlIFNhbWVTaXRlXG4gICAgICovXG4gICAgZ2V0IHNhbWVTaXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZ2V0QXR0cmlidXRlKENvb2tpZUF0dHJpYnV0ZXMuU0FNRVNJVEUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYSB2YWx1ZSBzcGVjaWZ5aW5nIHRoZSBjb25kaXRpb25zIHVuZGVyIHdoaWNoIHRoaXMgY29va2llIHdpbGwgYmUgc2VudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibGF4XCIsIFwic3RyaWN0XCIsIG9yIFwibm9uZVwiLlxuICAgICAqIEBzZWUgU2FtZVNpdGVcbiAgICAgKi9cbiAgICBzZXQgc2FtZVNpdGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy4jc2V0QXR0cmlidXRlKENvb2tpZUF0dHJpYnV0ZXMuU0FNRVNJVEUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGlmIHRoZSBicm93c2VyIHNob3VsZCBvbmx5IGluY2x1ZGUgdGhlIGNvb2tpZSBpbiByZXF1ZXN0cyB0cmFuc21pdHRlZCBvdmVyIGEgc2VjdXJlIGNoYW5uZWwuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfSBUcnVlIGlmIHRoZSBicm93c2VyIHNob3VsZCBvbmx5IGluY2x1ZGUgdGhlIGNvb2tpZSBpbiBzZWN1cmUgcmVxdWVzdHM7IGVsc2UsIGZhbHNlLlxuICAgICAqL1xuICAgIGdldCBzZWN1cmUoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuI2dldEF0dHJpYnV0ZShDb29raWVBdHRyaWJ1dGVzLlNFQ1VSRSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgaWYgdGhlIGJyb3dzZXIgc2hvdWxkIG9ubHkgaW5jbHVkZSB0aGUgY29va2llIGluIHJlcXVlc3RzIHRyYW5zbWl0dGVkIG92ZXIgYSBzZWN1cmUgY2hhbm5lbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQgc2VjdXJlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuI3NldEF0dHJpYnV0ZShDb29raWVBdHRyaWJ1dGVzLlNFQ1VSRSwgQm9vbGVhbih2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58c3RyaW5nfGludHxudWxsfVxuICAgICAqL1xuICAgICNnZXRBdHRyaWJ1dGUobmFtZSkge1xuICAgICAgICBpZiAoKHRoaXMuI2F0dHJpYnV0ZXMgPT0gbnVsbCkgfHwgIU9iamVjdC5rZXlzKHRoaXMuI2F0dHJpYnV0ZXMpLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4jYXR0cmlidXRlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxpbnR8c3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgICNzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuI2F0dHJpYnV0ZXMgPSB0aGlzLiNhdHRyaWJ1dGVzID8/IHt9O1xuICAgICAgICAgICAgdGhpcy4jYXR0cmlidXRlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIENvb2tpZUF0dHJpYnV0ZXMsXG59IiwiaW1wb3J0IHtDb29raWVBdHRyaWJ1dGVzfSBmcm9tIFwiY29va2llLWF0dHJpYnV0ZXNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludmFsaWQgYXR0ZW1wdCB0byB1cGRhdGUgYSBjb29raWUgdGhhdCBleGlzdHMgaW4gdGhlIGJyb3dzZXIgd2l0aG91dCBrbm93aW5nIG9yIGV4cGxpY2l0bHkgc2V0dGluZ3NcbiAqIGl0cyBhc3NvY2lhdGVkIGF0dHJpYnV0ZXMuXG4gKi9cbmNsYXNzIFVuaW5pdGlhbGl6ZWRDb29raWVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBBUEkgZm9yIEhUVFAgY29va2llcy5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHByaW1hcnkgZmFjZXRzIHRvIHRoaXMgQVBJOlxuICogMS4gSXQgY29udGFpbnMgYSBjb2xsZWN0aW9uIG9mIHN0YXRpYyBhbmQgY2xhc3MgZnVuY3Rpb25zIHRoYXQgc3VwcG9ydCBpbnRlcmFjdGlvbiB3aXRoIHRoZSBicm93c2VyJ3MgY29va2llIGphciwgaS5lLiB0aGluZ3MgdGhhdCBtYW5pcHVsYXRlIGBkb2N1bWVudC5jb29raWVgLlxuICogMi4gSXQgY2FuIGJlIGluc3RhbnRpYXRlZCBhbmQgY29uZmlndXJlZCB0byByZXByZXNlbnQgYW4gSFRUUCBjb29raWUgaW4tbWVtb3J5LlxuICpcbiAqIE5vdGUgdGhhdCBhIHF1aXJrIG9mIHRoaXMgQVBJIGRlc2lnbiBpcyB0aGF0IC0gYnkgZGVmYXVsdCAtIGl0IHdpbGwgZGlzYWxsb3cgc2F2aW5nIGEgY29va2llIHJlYWQgaW50byBtZW1vcnkgZnJvbVxuICogdGhlIGJyb3dzZXIgZGlyZWN0bHkgYmFjayBpbnRvIHRoZSBicm93c2VyISBUaGlzIGlzIGJlY2F1c2UgY29va2llcyByZWFkIGZyb20gdGhlIGJyb3dzZXIgb25seSBjb250YWluIHRoZSBjb29raWUnc1xuICogbmFtZS12YWx1ZSBwYWlyOyBpdCBkb2VzIG5vdCBpbmNsdWRlIHRoZSBjb29raWUncyBhdHRyaWJ1dGVzLiBJZiB5b3Ugd2VyZSB0byBpbW1lZGlhdGVseSBzYXZlIHRoZSBjb29raWUgYmFjayBvdXQsXG4gKiBpdCB3b3VsZCB2ZXJ5IGxpa2VseSBjcmVhdGUgYSBuZXcsIHNlcGFyYXRlIGNvb2tpZSBkdWUgdG8gdGhlIHVuaW5pdGlhbGl6ZWQgYXR0cmlidXRlcy5cbiAqXG4gKiBJbml0aWFsaXppbmcgYW55IG9mIHRoZSBjb29raWUncyBhdHRyaWJ1dGVzIHdpdGggYSBub24tbnVsbCB2YWx1ZSB3aXRoIHRoZW4gbWFrZSB0aGUgY29va2llIGVsaWdpYmxlIGZvciBzYXZpbmdcbiAqIGJhY2sgaW50byB0aGUgYnJvd3NlciwgYXMgdGhlIHN5c3RlbSB3aWxsIGFzc3VtZSBhbnkgY3VzdG9tIGNvbmZpZ3VyYXRpb24gbm93IG1ha2VzIHRoZSBpbi1tZW1vcnkgcmVwcmVzZW50YXRpb25cbiAqIG9mIGEgY29va2llIHRoZSBhdXRob3JpdGF0aXZlIHZlcnNpb24uXG4gKlxuICogU2VlIHRoZSBcInNldFwiIHN1aXRlIG9mIHRlc3RzIGluIGNvb2tpZS50ZXN0LmpzIGZvciB0ZXN0IGNvdmVyYWdlIHJlbGF0ZWQgdG8gdGhlIGRlc2NyaWJlZCBiZWhhdmlvci5cbiAqL1xuY2xhc3MgQ29va2llIHtcbiAgICAjbmFtZTtcbiAgICAjdmFsdWU7XG4gICAgI2F0dHJpYnV0ZXMgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZXhwbGljaXQgdmFsdWUgZm9yIHRoZSBjb29raWUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVOYW1lIFRoZSBuYW1lIG9mIHRoZSBjb29raWUgZm9yIHdoaWNoIHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHtDb29raWV8bnVsbH0gVHJ1ZSBpZiBjb25zZW50IGlzIGV4cGxpY2l0bHkgZ3JhbnRlZCwgZmFsc2UgaWYgbm90LCBvciBudWxsIGlmIHRoZSBjb29raWUgZG9lcyBub3QgZXhpc3QuXG4gICAgICovXG4gICAgc3RhdGljIGdldChjb29raWVOYW1lKSB7XG4gICAgICAgIGxldCBjb29raWUgPSBkb2N1bWVudC5jb29raWVcbiAgICAgICAgICAgIC5zcGxpdChcIjsgXCIpXG4gICAgICAgICAgICAuZmluZCgocm93KSA9PiByb3cuc3RhcnRzV2l0aChjb29raWVOYW1lKSkgPz8gbnVsbDtcbiAgICAgICAgcmV0dXJuIENvb2tpZS4jcGFyc2UoY29va2llKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBvcnRzIGlmIGEgY29va2llIHdpdGggdGhlIGdpdmVuIG5hbWUgaGFzIGJlZW4gY3JlYXRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVOYW1lIFRoZSBuYW1lIG9mIHRoZSBjb29raWUgZm9yIHdoaWNoIHRvIHF1ZXJ5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBleGlzdHMoY29va2llTmFtZSkge1xuICAgICAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKGNvb2tpZU5hbWUgKyBcIj0oW147XSspXCIpO1xuICAgICAgICBsZXQgdmFsdWUgPSByZS5leGVjKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gaW4tbWVtb3J5IHJlcHJlc2VudGF0aW9uIG9mIGFuIEhUVFAgY29va2llIGJhc2VkIG9uIGl0cyByYXcgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSByYXcgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGFuIEhUVFAgY29va2llLlxuICAgICAqIEByZXR1cm5zIHtDb29raWV8bnVsbH0gQW4gaW4tbWVtb3J5IHJlcHJlc2VudGF0aW9uIG9mIGFuIEhUVFAgY29va2llIG9yIG51bGwgaWYgdGhlIGdpdmVuIHN0cmluZyBjb3VsZCBub3QgYmUgcGFyc2VkLlxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tU3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBDb29raWUuI3BhcnNlKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgcmF3IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhbiBIVFRQIGNvb2tpZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgcmF3IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhbiBIVFRQIGNvb2tpZS5cbiAgICAgKiBAcmV0dXJucyB7Q29va2llfG51bGx9IEFuIGluLW1lbW9yeSByZXByZXNlbnRhdGlvbiBvZiBhbiBIVFRQIGNvb2tpZSBvciBudWxsIGlmIHRoZSBnaXZlbiBzdHJpbmcgY291bGQgbm90IGJlIHBhcnNlZC5cbiAgICAgKiBAdG9kbyBWYWxpZGF0ZSB0aGF0IGEgbmFtZT12YWx1ZSBwYWlyIGlzIHN1Y2Nlc3NmdWxseSBwYXJzZWQgZnJvbSBhbnkgZ2l2ZW4gbm9uLWVtcHR5IHZhbHVlLi4uXG4gICAgICovXG4gICAgc3RhdGljICNwYXJzZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWVzID0gT2JqZWN0LmZyb21FbnRyaWVzKHZhbHVlLnNwbGl0KCc7ICcpLm1hcCh2ID0+IHYuc3BsaXQoLz0oLiopL3MpLm1hcChkZWNvZGVVUklDb21wb25lbnQpKSk7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModmFsdWVzKTtcbiAgICAgICAgbGV0IG5hbWUgPSBrZXlzWzBdO1xuXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gbnVsbDtcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgYXR0cmlidXRlcyA9IG5ldyBDb29raWVBdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLmRvbWFpbiA9IHZhbHVlc1tDb29raWVBdHRyaWJ1dGVzLkRPTUFJTl0gPz8gbnVsbDtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucGF0aCA9IHZhbHVlc1tDb29raWVBdHRyaWJ1dGVzLlBBVEhdID8/IG51bGw7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLmV4cGlyZXMgPSB2YWx1ZXNbQ29va2llQXR0cmlidXRlcy5FWFBJUkVTXSA/PyBudWxsO1xuICAgICAgICAgICAgYXR0cmlidXRlcy5zYW1lU2l0ZSA9IHZhbHVlc1tDb29raWVBdHRyaWJ1dGVzLlNBTUVTSVRFXSA/PyBudWxsO1xuICAgICAgICAgICAgYXR0cmlidXRlcy5zZWN1cmUgPSBrZXlzLmluY2x1ZGVzKENvb2tpZUF0dHJpYnV0ZXMuU0VDVVJFKSA/PyBudWxsO1xuICAgICAgICAgICAgYXR0cmlidXRlcy5odHRwT25seSA9IGtleXMuaW5jbHVkZXMoQ29va2llQXR0cmlidXRlcy5IVFRQX09OTFkpID8/IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IENvb2tpZShcbiAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSxcbiAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZXNbbmFtZV0pLFxuICAgICAgICAgICAgYXR0cmlidXRlc1xuICAgICAgICApXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxpbnR8c3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Q29va2llQXR0cmlidXRlc3xudWxsfSBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgdmFsdWUsIGF0dHJpYnV0ZXM9IG5ldyBDb29raWVBdHRyaWJ1dGVzKCkpIHtcbiAgICAgICAgdGhpcy4jbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuI3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuI2F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGNvb2tpZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNuYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGNvb2tpZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufGludHxzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW4tbWVtb3J5IHZhbHVlIG9mIHRoaXMgY29va2llLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufGludHxzdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLiN2YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF0dHJpYnV0ZXMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY29va2llLlxuICAgICAqXG4gICAgICogQHJldHVybnMge0Nvb2tpZUF0dHJpYnV0ZXN9XG4gICAgICovXG4gICAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNhdHRyaWJ1dGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcmsgdGhlIGNvb2tpZSBhcyBleHBpcmVkIGluIHRoZSBicm93c2VyLlxuICAgICAqL1xuICAgIGRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy4jYXR0cmlidXRlcy5leHBpcmVzU2Vjb25kcyA9IDA7XG4gICAgICAgIHRoaXMuc2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyc2lzdCB0aGUgaW4tbWVtb3J5IHZhbHVlIGFuZCBhdHRyaWJ1dGVzIG9mIHRoaXMgY29va2llIGludG8gdGhlIGJyb3dzZXIuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuI2F0dHJpYnV0ZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbmluaXRpYWxpemVkQ29va2llRXJyb3IoYFJlZnVzaW5nIHRvIHdyaXRlIGNvb2tpZSBuYW1lZCBcIiR7dGhpcy4jbmFtZX1cIiB3aXRoIHVuaW5pdGlhbGl6ZWQgYXR0cmlidXRlcy5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhpcyBjb29raWUgYXMgYSByYXcgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGAke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLiNuYW1lKX09JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy4jdmFsdWUpfWA7XG5cbiAgICAgICAgaWYgKHRoaXMuI2F0dHJpYnV0ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiNhdHRyaWJ1dGVzLmRvbWFpbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOyAke0Nvb2tpZUF0dHJpYnV0ZXMuRE9NQUlOfT0ke3RoaXMuI2F0dHJpYnV0ZXMuZG9tYWlufWBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuI2F0dHJpYnV0ZXMuZXhwaXJlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOyAke0Nvb2tpZUF0dHJpYnV0ZXMuRVhQSVJFU309JHt0aGlzLiNhdHRyaWJ1dGVzLmV4cGlyZXN9YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy4jYXR0cmlidXRlcy5odHRwT25seSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOyAke0Nvb2tpZUF0dHJpYnV0ZXMuSFRUUF9PTkxZfWBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuI2F0dHJpYnV0ZXMucGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOyAke0Nvb2tpZUF0dHJpYnV0ZXMuUEFUSH09JHt0aGlzLiNhdHRyaWJ1dGVzLnBhdGh9YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy4jYXR0cmlidXRlcy5zYW1lU2l0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOyAke0Nvb2tpZUF0dHJpYnV0ZXMuU0FNRVNJVEV9PSR7dGhpcy4jYXR0cmlidXRlcy5zYW1lU2l0ZX1gXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiNhdHRyaWJ1dGVzLnNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgOyAke0Nvb2tpZUF0dHJpYnV0ZXMuU0VDVVJFfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIENvb2tpZSxcbiAgICBVbmluaXRpYWxpemVkQ29va2llRXJyb3IsXG59IiwiLyoqXG4gKiBUaGlzIGlzIGEgaGVscGVyIHN0cnVjdHVyZSB3aGljaCBjb250cm9scyBzdWJtaXNzaW9uIG9mIGNvbnNlbnQgdmFsdWVzIHRvIHRoZSBEYXRhIENsb3VkIFdlYiBTREsuXG4gKlxuICogVGhpcyBzdHJ1Y3R1cmUgaXMgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsIG9mIHtAbGluayBDb25zZW50TWFuYWdlcn0gYW5kIHNob3VsZCBub3QgYmUgdXNlZCBvdXRzaWRlIG9mIHRoYXQgY29udGV4dC5cbiAqL1xuY2xhc3MgRGF0YUNsb3VkQ29uc2VudE1hbmFnZXIge1xuICAgICNjb29raWVEb21haW4gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvb2tpZURvbWFpblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvb2tpZURvbWFpbikge1xuICAgICAgICB0aGlzLiNjb29raWVEb21haW4gPSBjb29raWVEb21haW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY29uc2VudCB2YWx1ZSB3aXRoIHRoZSBEYXRhIENsb3VkIFdlYiBTREsuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIERPTSBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGNvbnNlbnQgdmFsdWUgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgVHJ1ZSBpZiBjb25zZW50IGlzIGdyYW50ZWQ7IGVsc2UsIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuc2FsZXNmb3JjZS5jb20vZG9jcy9hdGxhcy5lbi11cy5jMzYwYV9hcGkubWV0YS9jMzYwYV9hcGkvYzM2MGFfYXBpX3NhbGVzZm9yY2VfaW50ZXJhY3Rpb25zX3dlYl9zZGsuaHRtXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5zYWxlc2ZvcmNlLmNvbS9kb2NzL2F0bGFzLmVuLXVzLmMzNjBhX2FwaS5tZXRhL2MzNjBhX2FwaS9jMzYwYV9hcGlfY29uc2VudC5odG1cbiAgICAgKi9cbiAgICBzZXRDb25zZW50KGV2ZW50LCB2YWx1ZSkge1xuICAgICAgICAvKiBnbG9iYWwgU2FsZXNmb3JjZUludGVyYWN0aW9ucyAqL1xuICAgICAgICBpZiAodHlwZW9mIFNhbGVzZm9yY2VJbnRlcmFjdGlvbnMgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGV2ZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IGV2ZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlZ2lzdGVyIGNvbnNlbnQgd2l0aCBEYXRhIENsb3VkIFdlYiBTREsuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgRGF0YSBDbG91ZCBjb25zZW50IG9iamVjdFxuICAgICAgICBsZXQgY29uc2VudCA9IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiBcIlNhbGVzZm9yY2UgTWFya2V0aW5nIENsb3VkXCIsXG4gICAgICAgICAgICBwdXJwb3NlOiBTYWxlc2ZvcmNlSW50ZXJhY3Rpb25zLkNvbnNlbnRQdXJwb3NlLlRyYWNraW5nLFxuICAgICAgICAgICAgc3RhdHVzOiB2YWx1ZVxuICAgICAgICAgICAgICAgID8gU2FsZXNmb3JjZUludGVyYWN0aW9ucy5Db25zZW50U3RhdHVzLk9wdEluXG4gICAgICAgICAgICAgICAgOiBTYWxlc2ZvcmNlSW50ZXJhY3Rpb25zLkNvbnNlbnRTdGF0dXMuT3B0T3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBEYXRhIENsb3VkIFdlYiBTREsgd2l0aCBjb25zZW50IGNvbmZpZ3VyYXRpb25cbiAgICAgICAgU2FsZXNmb3JjZUludGVyYWN0aW9ucy5pbml0KHtcbiAgICAgICAgICAgIGNvbnNlbnRzOiBbY29uc2VudF0sXG4gICAgICAgICAgICBjb29raWVEb21haW46IHRoaXMuI2Nvb2tpZURvbWFpbiA/PyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVcbiAgICAgICAgfSkudGhlbigoKSA9PiB7fSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBEYXRhQ2xvdWRDb25zZW50TWFuYWdlcixcbn0iLCJpbXBvcnQge0Nvb2tpZX0gZnJvbSBcImNvb2tpZVwiO1xuXG4vKipcbiAqIFRoaXMgbWFuYWdlciBzaG91bGQgY29udGFpbiBnZW5lcmFsbHkgdXNlZnVsIG1ldGhvZHMgZm9yIGludGVyYWN0aW5nIHdpdGggb3IgbWFuaXB1bGF0aW5nIEludGVybmV0IGRvbWFpbiBuYW1lcy5cbiAqL1xuY2xhc3MgRG9tYWluTWFuYWdlciB7XG4gICAgc3RhdGljIFBST0JFX0NPT0tJRV9OQU1FID0gXCJfc2ZtY19wY1wiO1xuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBleHRlbmRlZCB0b3AtbGV2ZWwgZG9tYWluIHBsdXMgMSAoZVRMRCsxKSBmb3IgdGhlIGN1cnJlbnQgZG9jdW1lbnQncyBob3N0bmFtZSBJRkYgaXRcbiAgICAgKiBpcyBub3QgYSBTYWxlc2ZvcmNlLW93bmVkIGRvbWFpbi4gT3RoZXJ3aXNlLCBpdCByZXR1cm5zIHRoZSBleGFjdCBkb21haW4uXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgcmVsaWVzIG9uIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbCBvZiBtb3N0IG1ham9yIHdlYiBicm93c2VycywgYXNzdW1pbmcgdGhhdFxuICAgICAqIHRoZXkgd2lsbCByZWZ1c2UgdG8gc2V0IGEgY29va2llIG9uIGEgdG9wLWxldmVsIGRvbWFpbiwgZS5nLiAuY29tLCAuY28udWssIC5zaGluanVrdS50b2t5by5qcCwgZXRjLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1NhbGVzZm9yY2VEb21haW4gVHJ1ZSBpZiB0aGUgY3VycmVudCBicm93c2VyIGxvY2F0aW9uIGlzIGtub3duIHRvIGJlIGEgU2FsZXNmb3JjZS1vd25lZCBkb21haW47IGVsc2UsIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlVExEKzEgZG9tYWluIGZvciB0aGUgY3VycmVudCBkb2N1bWVudCdzIGhvc3RuYW1lLlxuICAgICAqL1xuICAgIGdldEVUTEQoaXNTYWxlc2ZvcmNlRG9tYWluKSB7XG4gICAgICAgIGxldCBjb29raWVEb21haW4gPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgICAgIGlmIChpc1NhbGVzZm9yY2VEb21haW4pIHtcbiAgICAgICAgICAgIHJldHVybiBjb29raWVEb21haW47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvYmVDb29raWUgPSBuZXcgQ29va2llKERvbWFpbk1hbmFnZXIuUFJPQkVfQ09PS0lFX05BTUUsIHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2FsayB0aGUgZ2l2ZW4gZG9tYWluIGZyb20gaXRzIHRvcC1sZXZlbCBjb21wb25lbnQgZG93biB0byBpdHMgbW9zdCBzcGVjaWZpYyBzdWJkb21haW5cbiAgICAgICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgaGlnaGVzdC1sZXZlbCBkb21haW4gb24gd2hpY2ggd2UgY2FuIHN1Y2Nlc3NmdWxseSBzZXQgYSBjb29raWVcbiAgICAgICAgICAgIGxldCBkb21haW5zID0gY29va2llRG9tYWluLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgIHByb2JlQ29va2llLmF0dHJpYnV0ZXMuZG9tYWluID0gZG9tYWlucy5wb3AoKTtcbiAgICAgICAgICAgIHdoaWxlIChkb21haW5zLmxlbmd0aCA+IDAgJiYgIUNvb2tpZS5leGlzdHMocHJvYmVDb29raWUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBwcm9iZUNvb2tpZS5hdHRyaWJ1dGVzLmRvbWFpbiA9IGRvbWFpbnMucG9wKCkgKyAnLicgKyBwcm9iZUNvb2tpZS5hdHRyaWJ1dGVzLmRvbWFpbjtcbiAgICAgICAgICAgICAgICBwcm9iZUNvb2tpZS5zZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9iZUNvb2tpZS5hdHRyaWJ1dGVzLmRvbWFpbjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHByb2JlQ29va2llLmRlbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIERvbWFpbk1hbmFnZXIsXG59IiwiLyoqXG4gKiBUaGlzIGlzIGEgaGVscGVyIHN0cnVjdHVyZSB3aGljaCBjb250cm9scyBzdWJtaXNzaW9uIG9mIGNvbnNlbnQgdmFsdWVzIHRvIHRoZSBFeHBlcmllbmNlIFNlcnZpY2VzIFdlYiBTREsuXG4gKlxuICogVGhpcyBzdHJ1Y3R1cmUgaXMgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsIG9mIHtAbGluayBDb25zZW50TWFuYWdlcn0gYW5kIHNob3VsZCBub3QgYmUgdXNlZCBvdXRzaWRlIG9mIHRoYXQgY29udGV4dC5cbiAqL1xuY2xhc3MgRXhwZXJpZW5jZVNlcnZpY2VzQ29uc2VudE1hbmFnZXIge1xuICAgICNjb29raWVEb21haW4gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvb2tpZURvbWFpblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvb2tpZURvbWFpbikge1xuICAgICAgICB0aGlzLiNjb29raWVEb21haW4gPSBjb29raWVEb21haW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY29uc2VudCB2YWx1ZSB3aXRoIHRoZSBFeHBlcmllbmNlIFNlcnZpY2VzIFdlYiBTREsuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIERPTSBldmVudCBhc3NvY2lhdGVkIHdpdGggdGhlIGNvbnNlbnQgdmFsdWUgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgVHJ1ZSBpZiBjb25zZW50IGlzIGdyYW50ZWQ7IGVsc2UsIGZhbHNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHNldENvbnNlbnQoZXZlbnQsIHZhbHVlKSB7XG4gICAgICAgIC8vIENvbmZpcm0gd2UgaGF2ZSBhIHZhbGlkIGV2ZW50XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgZXZlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVnaXN0ZXIgY29uc2VudCB3aXRoIEV4cGVyaWVuY2UgU2VydmljZXMgV2ViIFNESy5cIilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4cGxpY2l0bHkgc2V0IHRoZSBXZWIgU0RLJ3MgY29va2llIGRvbWFpblxuICAgICAgICBldmVudC50YXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnZXhwZXJpZW5jZV9pbnRlcmFjdGlvbicsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc2V0LWNvb2tpZS1kb21haW4nLFxuICAgICAgICAgICAgICAgICAgICBkb21haW46IHRoaXMuI2Nvb2tpZURvbWFpbixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBFeHBsaWNpdGx5IHNldCB0aGUgY29uc2VudCBjb29raWUncyB2YWx1ZVxuICAgICAgICBldmVudC50YXJnZXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnZXhwZXJpZW5jZV9pbnRlcmFjdGlvbicsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc2V0LWNvbnNlbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIEV4cGVyaWVuY2VTZXJ2aWNlc0NvbnNlbnRNYW5hZ2VyLFxufSIsImNvbnN0IFNhbWVTaXRlID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgTEFYOiBcImxheFwiLFxuICAgIFNUUklDVDogXCJzdHJpY3RcIixcbiAgICBOT05FOiBcIm5vbmVcIlxufSk7XG5cbmV4cG9ydCB7XG4gICAgU2FtZVNpdGUsXG59XG4iLCJjb25zdCBNSUxMSVNFQ09ORFNfUEVSX1NFQ09ORCA9IDEwMDA7XG5jb25zdCBTRUNPTkRTX1BFUl9EQVkgPSAyNCAqIDYwICogNjA7XG5cbmV4cG9ydCB7XG4gICAgTUlMTElTRUNPTkRTX1BFUl9TRUNPTkQsXG4gICAgU0VDT05EU19QRVJfREFZXG59XG4iLCIvKipcbiAqIEhlbHBlciBjbGFzcyBmb3IgbWFuaXB1bGF0aW5nIGRvbSBlbGVtZW50c1xuICovXG5jbGFzcyBVaVRvb2xzIHtcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgdGV4dCB0byBhbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIFRoZSBuYW1lIG9mIHRoZSBlbGVtZW50IHRvIGFwcGVuZCBhIHRleHQgbm9kZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUaGUgdGV4dCBjb250ZW50IG9mIHRoZSB0ZXh0IG5vZGUuXG4gICAgICovXG4gICAgc3RhdGljIGFwcGVuZFRleHQoZWxlbWVudElkLCB0ZXh0KSB7XG4gICAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnRJZCk7XG4gICAgICAgIGlmIChlbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0ZXh0LmVuZHNXaXRoKFwiLlwiKSkge1xuICAgICAgICAgICAgdGV4dCArPSBcIi5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7XG4gICAgVWlUb29scyxcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Q29uc2VudEJhbm5lclRyYWNraW5nTW9kZX0gZnJvbSBcImNvbnNlbnQtYmFubmVyLXRyYWNraW5nLW1vZGVcIjtcbmltcG9ydCB7Q29uc2VudEJhbm5lckNvbnNlbnRNb2RlfSBmcm9tIFwiY29uc2VudC1iYW5uZXItY29uc2VudC1tb2RlXCI7XG5pbXBvcnQge0NvbnNlbnRNYW5hZ2VyfSBmcm9tIFwiY29uc2VudC1tYW5hZ2VyXCI7XG5pbXBvcnQge1VpVG9vbHN9IGZyb20gXCIuL3VpLXRvb2xzXCI7XG5cbi8qKlxuICogVGhpcyBzdHJ1Y3R1cmUgbWFuYWdlcyByZW5kZXJpbmcgYW5kIHByb2Nlc3Npbmcgb2YgYSBVSSBiYW5uZXIgdGhhdCBwcm9tcHRzIGFuZCBnYXRoZXJzIGNvbnNlbnQgZnJvbSBhbiBlbmQtdXNlci5cbiAqXG4gKiBUaGlzIHN0cnVjdHVyZSBpcyBwYXJ0IG9mIHRoZSBwdWJsaWMgQVBJIGZvciB0aGlzIEphdmFzY3JpcHQgbW9kdWxlLlxuICovXG5jbGFzcyBDb25zZW50QmFubmVyIHtcbiAgICBzdGF0aWMgI0RFRkFVTFRfQkFOTkVSX01FU1NBR0UgPSBcIldlIHVzZSBjb29raWVzIHRvIGVuaGFuY2UgeW91ciBicm93c2luZyBleHBlcmllbmNlLCBzZXJ2ZSBwZXJzb25hbGl6ZWQgY29udGVudCBvciBhZHMsIGFuZCBhbmFseXplIHdlYiB0cmFmZmljLiBCeSBhY2NlcHRpbmcsIHlvdSBjb25zZW50IHRvIG91ciB1c2Ugb2YgY29va2llcy5cIjtcbiAgICBzdGF0aWMgI0RFRkFVTFRfQkFOTkVSX0NPTE9SID0gXCIjRkZGRkZGXCI7XG4gICAgc3RhdGljICNERUZBVUxUX0JBTk5FUl9URVhUX0NPTE9SID0gXCIjMDAwMDAwXCI7XG4gICAgc3RhdGljICNERUZBVUxUX0JBTk5FUl9QT1NJVElPTiA9IFwidG9wXCI7XG4gICAgc3RhdGljICNERUZBVUxUX0JBTk5FUl9GT05UX0ZBTUlMWSA9IFwic2VyaWZcIjtcbiAgICBzdGF0aWMgI0RFRkFVTFRfQUxMT1dfQlVUVE9OX0NPTE9SID0gXCIjRkZGRkZGXCI7XG4gICAgc3RhdGljICNERUZBVUxUX0FMTE9XX0JVVFRPTl9URVhUX0NPTE9SID0gXCIjMDAwMDAwXCI7XG4gICAgc3RhdGljICNERUZBVUxUX0RFQ0xJTkVfQlVUVE9OX0NPTE9SID0gXCIjRkZGRkZGXCI7XG4gICAgc3RhdGljICNERUZBVUxUX0RFQ0xJTkVfQlVUVE9OX1RFWFRfQ09MT1IgPSBcIiMwMDAwMDBcIjtcbiAgICBzdGF0aWMgI0RFRkFVTFRfUFJJVkFDWV9QT0xJQ1lfVEVYVCA9IFwiUmV2aWV3IG91ciBwcml2YWN5IHBvbGljeVwiO1xuICAgIHN0YXRpYyAjREVGQVVMVF9UUkFDS0lOR19NT0RFID0gQ29uc2VudEJhbm5lclRyYWNraW5nTW9kZS5FWFBFUklFTkNFX1NFUlZJQ0VTLnZhbHVlO1xuICAgIHN0YXRpYyAjREVGQVVMVF9DT05TRU5UX01PREUgPSBDb25zZW50QmFubmVyQ29uc2VudE1vZGUuUkVRVUlSRUQudmFsdWU7XG4gICAgc3RhdGljICNERUZBVUxUX0lTX1NBTEVTRk9SQ0VfRE9NQUlOID0gdHJ1ZTtcblxuICAgICNyb290RWxlbWVudCA9IG51bGw7XG4gICAgI2NvbnNlbnRNYW5hZ2VyO1xuICAgIG9yZ0lkO1xuICAgIGJhbm5lck1lc3NhZ2U7XG4gICAgYmFubmVyQ29sb3I7XG4gICAgYmFubmVyVGV4dENvbG9yO1xuICAgIGJhbm5lclBvc2l0aW9uO1xuICAgIGJhbm5lckZvbnRGYW1pbHk7XG4gICAgYWxsb3dCdXR0b25Db2xvcjtcbiAgICBhbGxvd0J1dHRvblRleHRDb2xvcjtcbiAgICBkZWNsaW5lQnV0dG9uQ29sb3I7XG4gICAgZGVjbGluZUJ1dHRvblRleHRDb2xvcjtcbiAgICBwcml2YWN5UG9saWN5VGV4dDtcbiAgICB0cmFja2luZ01vZGU7XG4gICAgY29uc2VudE1vZGU7XG4gICAgaXNTYWxlc2ZvcmNlRG9tYWluO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIEEgSmF2YXNjcmlwdCBvYmplY3QgdGhhdCBjb250YWlucyBhbGwgdmFsdWVzIGZvciB0aGUgQ29uc2VudEJhbm5lclNldHRpbmdzIEVudGl0eS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIHRoaXMuI3Jvb3RFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy4jY29uc2VudE1hbmFnZXIgPSBuZXcgQ29uc2VudE1hbmFnZXIoXG4gICAgICAgICAgICB0aGlzLm9yZ0lkLFxuICAgICAgICAgICAgdGhpcy50cmFja2luZ01vZGUgPz8gQ29uc2VudEJhbm5lci4jREVGQVVMVF9UUkFDS0lOR19NT0RFLFxuICAgICAgICAgICAgdGhpcy5jb25zZW50TW9kZSA/PyBDb25zZW50QmFubmVyLiNERUZBVUxUX0NPTlNFTlRfTU9ERSxcbiAgICAgICAgICAgIHRoaXMuaXNTYWxlc2ZvcmNlRG9tYWluID8/IENvbnNlbnRCYW5uZXIuI0RFRkFVTFRfSVNfU0FMRVNGT1JDRV9ET01BSU5cbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLiNvbkxvYWQoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBDb25zZW50TWFuYWdlciBpbnN0YW5jZSB1c2VkIGJ5IHRoaXMgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge0NvbnNlbnRNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBjb25zZW50TWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2NvbnNlbnRNYW5hZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhZ2UgbG9hZCBldmVudCBoYW5kbGVyIHRoYXQgaW5pdGlhbGl6ZXMgYSBjb25zZW50IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICAjb25Mb2FkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29uc2VudE1hbmFnZXIuaW5pdENvbnNlbnQoZXZlbnQpO1xuICAgICAgICBpZiAoIXRoaXMuY29uc2VudE1hbmFnZXIuaGFzQ29uc2VudCgpKSB7XG4gICAgICAgICAgICB0aGlzLiNhcHBlbmRIdG1sKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGV4cGxpY2l0bHkgZ3JhbnRlZCBjb25zZW50IHdpdGggdGhlIGJyb3dzZXIgYW5kIFNhbGVzZm9yY2UgV2ViIFNESyBiYWNrZW5kcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgI29uQWNjZXB0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29uc2VudE1hbmFnZXIuc2V0Q29uc2VudChldmVudCwgdHJ1ZSlcbiAgICAgICAgdGhpcy4jcm9vdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBleHBsaWNpdGx5IHJlamVjdGVkIGNvbnNlbnQgd2l0aCB0aGUgYnJvd3NlciBhbmQgU2FsZXNmb3JjZSBXZWIgU0RLIGJhY2tlbmRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICAjb25SZWplY3QoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jb25zZW50TWFuYWdlci5zZXRDb25zZW50KGV2ZW50LCBmYWxzZSlcbiAgICAgICAgdGhpcy4jcm9vdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluamVjdHMgdGhlIGNvbnNlbnQgYmFubmVyIGNvbXBvbmVudCBpbnRvIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIEhUTUwgZWxlbWVudCB0byB3aGljaCB0aGUgY29uc2VudCBiYW5uZXIgY29tcG9uZW50IHdpbGwgYmUgYXBwZW5kZWQgYXMgYSBjaGlsZC5cbiAgICAgKi9cbiAgICAjYXBwZW5kSHRtbChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuI3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuI3Jvb3RFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuI3RvSHRtbCgpO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuI3Jvb3RFbGVtZW50KTtcblxuICAgICAgICBVaVRvb2xzLmFwcGVuZFRleHQoJyNzZm1jLWNvbnNlbnQtYmFubmVyLW1lc3NhZ2UtY29udGVudCcsIHRoaXMuI19iYW5uZXJNZXNzYWdlKTtcbiAgICAgICAgVWlUb29scy5hcHBlbmRUZXh0KCcjc2ZtYy1jb25zZW50LWJhbm5lci1wcml2YWN5LXBvbGljeS1saW5rJywgdGhpcy4jX3ByaXZhY3lQb2xpY3lUZXh0KTtcbiAgICAgICAgVWlUb29scy5hcHBlbmRUZXh0KCcjc2ZtYy1jb25zZW50LWJhbm5lci1pbmZvLWxpbmsnLCB0aGlzLiNfaW5mb1RleHQpO1xuXG4gICAgICAgIGNvbnN0IGVsQWNjZXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZm1jLWNvbnNlbnQtYmFubmVyLWFjY2VwdC1idXR0b25cIik7XG4gICAgICAgIGVsQWNjZXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuI29uQWNjZXB0KGV2ZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZWxSZWplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NmbWMtY29uc2VudC1iYW5uZXItZGVjbGluZS1idXR0b25cIik7XG4gICAgICAgIGVsUmVqZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuI29uUmVqZWN0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0ICNfYmFubmVyTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFubmVyTWVzc2FnZSA/PyBDb25zZW50QmFubmVyLiNERUZBVUxUX0JBTk5FUl9NRVNTQUdFO1xuICAgIH1cblxuICAgIGdldCAjX2Jhbm5lckNvbG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYW5uZXJDb2xvciA/PyBDb25zZW50QmFubmVyLiNERUZBVUxUX0JBTk5FUl9DT0xPUjtcbiAgICB9XG5cbiAgICBnZXQgI19iYW5uZXJUZXh0Q29sb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhbm5lclRleHRDb2xvciA/PyBDb25zZW50QmFubmVyLiNERUZBVUxUX0JBTk5FUl9URVhUX0NPTE9SO1xuICAgIH1cblxuICAgIGdldCAjX2Jhbm5lclBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuYmFubmVyUG9zaXRpb24gPz8gQ29uc2VudEJhbm5lci4jREVGQVVMVF9CQU5ORVJfUE9TSVRJT04pLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0ICNfYmFubmVyRm9udEZhbWlseSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFubmVyRm9udEZhbWlseSA/PyBDb25zZW50QmFubmVyLiNERUZBVUxUX0JBTk5FUl9GT05UX0ZBTUlMWTtcbiAgICB9XG5cbiAgICBnZXQgI19hbGxvd0J1dHRvbkNvbG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxvd0J1dHRvbkNvbG9yID8/IENvbnNlbnRCYW5uZXIuI0RFRkFVTFRfQUxMT1dfQlVUVE9OX0NPTE9SO1xuICAgIH1cblxuICAgIGdldCAjX2FsbG93QnV0dG9uVGV4dENvbG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxvd0J1dHRvblRleHRDb2xvciA/PyBDb25zZW50QmFubmVyLiNERUZBVUxUX0FMTE9XX0JVVFRPTl9URVhUX0NPTE9SO1xuICAgIH1cblxuICAgIGdldCAjX2RlY2xpbmVCdXR0b25Db2xvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjbGluZUJ1dHRvbkNvbG9yID8/IENvbnNlbnRCYW5uZXIuI0RFRkFVTFRfREVDTElORV9CVVRUT05fQ09MT1I7XG4gICAgfVxuXG4gICAgZ2V0ICNfZGVjbGluZUJ1dHRvblRleHRDb2xvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjbGluZUJ1dHRvblRleHRDb2xvciA/PyBDb25zZW50QmFubmVyLiNERUZBVUxUX0RFQ0xJTkVfQlVUVE9OX1RFWFRfQ09MT1I7XG4gICAgfVxuXG4gICAgZ2V0ICNfcHJpdmFjeVBvbGljeVRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaXZhY3lQb2xpY3lUZXh0ID8/IENvbnNlbnRCYW5uZXIuI0RFRkFVTFRfUFJJVkFDWV9QT0xJQ1lfVEVYVDtcbiAgICB9XG5cbiAgICBnZXQgI19wcml2YWN5UG9saWN5TGluaygpIHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5wcml2YWN5UG9saWN5VXJsID8/IG51bGw7XG4gICAgICAgIHJldHVybiAodXJsID09PSBudWxsKSA/IFwiXCIgOiBgPGEgaWQ9XCJzZm1jLWNvbnNlbnQtYmFubmVyLXByaXZhY3ktcG9saWN5LWxpbmtcIiBocmVmPVwiJHtlbmNvZGVVUkkodXJsKX1cIj48L2E+YDtcbiAgICB9XG5cbiAgICBnZXQgI19pbmZvVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mb1RleHQgPz8gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgI19pbmZvTGluaygpIHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5pbmZvVXJsID8/IG51bGw7XG4gICAgICAgIHJldHVybiAodXJsID09PSBudWxsKSA/IFwiXCIgOiBgPGEgaWQ9XCJzZm1jLWNvbnNlbnQtYmFubmVyLWluZm8tbGlua1wiIGhyZWY9XCIke2VuY29kZVVSSSh1cmwpfVwiPjwvYT5gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIEhUTUwgbWFya3VwIHRoYXQgd2lsbCByZW5kZXIgdGhlIGNvbnNlbnQgYmFubmVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICAjdG9IdG1sKCkge1xuICAgICAgICByZXR1cm4gYFxuPHN0eWxlPlxuICAgICNzZm1jLWNvbnNlbnQtYmFubmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLiNfYmFubmVyQ29sb3J9O1xuICAgICAgICBib3gtc2hhZG93OiAycHggMnB4IDVweCAycHggI0RERDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMC4zNXJlbTtcbiAgICAgICAgJHt0aGlzLiNfYmFubmVyUG9zaXRpb259OiAycmVtO1xuICAgICAgICBjb2xvcjogJHt0aGlzLiNfYmFubmVyVGV4dENvbG9yfTtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZm9udC1mYW1pbHk6ICR7dGhpcy4jX2Jhbm5lckZvbnRGYW1pbHl9O1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDI1MHB4O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgbWluLXdpZHRoOiAyNDBweDtcbiAgICAgICAgcGFkZGluZzogMXJlbSAycmVtO1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB3aWR0aDogNzAlO1xuICAgICAgICB6LWluZGV4OiA5OTk7XG4gICAgfVxuICAgIFxuICAgICNzZm1jLWNvbnNlbnQtYmFubmVyIGJ1dHRvbiB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuMzVyZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XG4gICAgfVxuICAgIFxuICAgICNzZm1jLWNvbnNlbnQtYmFubmVyLW1lc3NhZ2Uge1xuICAgICAgICBwYWRkaW5nOiAwIDFyZW07IFxuICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgfVxuICAgIFxuICAgICNzZm1jLWNvbnNlbnQtYmFubmVyLW1lc3NhZ2Ugc2NyaXB0IHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgIH1cbiAgICBcbiAgICAjc2ZtYy1jb25zZW50LWJhbm5lci1idXR0b25zIHtcbiAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgICAgICBnYXA6IDFyZW07XG4gICAgICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgfVxuICAgIFxuICAgICNzZm1jLWNvbnNlbnQtYmFubmVyLWFjY2VwdC1idXR0b24ge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAke3RoaXMuI19hbGxvd0J1dHRvblRleHRDb2xvcn07XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy4jX2FsbG93QnV0dG9uQ29sb3J9O1xuICAgICAgICBjb2xvcjogJHt0aGlzLiNfYWxsb3dCdXR0b25UZXh0Q29sb3J9O1xuICAgIH1cbiAgICBcbiAgICAjc2ZtYy1jb25zZW50LWJhbm5lci1kZWNsaW5lLWJ1dHRvbiB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7dGhpcy4jX2RlY2xpbmVCdXR0b25UZXh0Q29sb3J9O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuI19kZWNsaW5lQnV0dG9uQ29sb3J9O1xuICAgICAgICBjb2xvcjogJHt0aGlzLiNfZGVjbGluZUJ1dHRvblRleHRDb2xvcn07XG4gICAgfVxuICAgIFxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICNzZm1jLWNvbnNlbnQtYmFubmVyIHtcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgICAgICB9XG4gICAgfVxuPC9zdHlsZT5cbjxkaXYgaWQ9XCJzZm1jLWNvbnNlbnQtYmFubmVyXCIgdGFiaW5kZXg9XCItMVwiPlxuICAgIDxkaXYgaWQ9XCJzZm1jLWNvbnNlbnQtYmFubmVyLW1lc3NhZ2VcIj5cbiAgICAgICAgPHNwYW4gaWQ9XCJzZm1jLWNvbnNlbnQtYmFubmVyLW1lc3NhZ2UtY29udGVudFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gaWQ9XCJzZm1jLWNvbnNlbnQtYmFubmVyLW1lc3NhZ2UtcHJpdmFjeS1wb2xpY3lcIj4ke3RoaXMuI19wcml2YWN5UG9saWN5TGlua308L3NwYW4+XG4gICAgICAgIDxzcGFuIGlkPVwic2ZtYy1jb25zZW50LWJhbm5lci1tZXNzYWdlLWluZm9cIj4ke3RoaXMuI19pbmZvTGlua308L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBpZD1cInNmbWMtY29uc2VudC1iYW5uZXItYnV0dG9uc1wiPlxuICAgICAgICA8YnV0dG9uIGlkPVwic2ZtYy1jb25zZW50LWJhbm5lci1hY2NlcHQtYnV0dG9uXCI+QWNjZXB0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gaWQ9XCJzZm1jLWNvbnNlbnQtYmFubmVyLWRlY2xpbmUtYnV0dG9uXCI+UmVqZWN0PC9idXR0b24+ICAgICAgICBcbiAgICA8L2Rpdj5cbjwvZGl2PlxuYFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBDb25zZW50QmFubmVyLFxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==