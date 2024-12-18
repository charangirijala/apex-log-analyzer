LWR.define("@salesforce/label/MyCommunities.errorInFileDownload/v/0_13_10", ["exports"], function(exports) {
  "use strict";
  var _0_13_10 = `MyCommunities.errorInFileDownload`;
  exports["default"] = _0_13_10;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("@salesforce/label/MyCommunities.errorInFileDownload", ["exports", "@salesforce/label/MyCommunities.errorInFileDownload/v/0_13_10"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
LWR.define("mobileruntime/hybridAppManager/v/1", ["exports", "lwr/loaderLegacy/v/0_13_10", "logger/v/1", "webruntime/routingService/v/1", "@salesforce/site/Id/v/1", "webruntime/transport/v/1", "lwc/v/7_1_5", "@salesforce/community/basePath/v/1", "@app/basePath/v/1", "@app/loginPath/v/1", "@app/uiBasePath/v/1", "@salesforce/label/MyCommunities.errorInFileDownload/v/0_13_10", "webruntime/overrides/v/1"], function(exports, _0_13_10, _1$2, _1$1, siteId, _1$3, _7_1_5, communityBasePath, basePath$1, loginPath, basePath, fileDownloadErrorMsg, _1) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e};
  }
  var siteId__default = /* @__PURE__ */ _interopDefaultLegacy(siteId);
  var communityBasePath__default = /* @__PURE__ */ _interopDefaultLegacy(communityBasePath);
  var basePath$1__default = /* @__PURE__ */ _interopDefaultLegacy(basePath$1);
  var loginPath__default = /* @__PURE__ */ _interopDefaultLegacy(loginPath);
  var basePath__default = /* @__PURE__ */ _interopDefaultLegacy(basePath);
  var fileDownloadErrorMsg__default = /* @__PURE__ */ _interopDefaultLegacy(fileDownloadErrorMsg);
  function injectNativeApis() {
    window.native = {
      sendAILTNData: function(payload) {
        if (!payload?.logLines) {
          return new Promise(function(resolve, reject) {
            reject("Received null or invalid payload");
          });
        }
      },
      refreshNotifications: function() {
        document.dispatchEvent(new CustomEvent("refreshNotifications", {
          detail: {},
          bubbles: true,
          cancelable: true,
          composed: false
        }));
      },
      navigateTo: function(pageRef) {
        return new Promise(function(resolve, reject) {
          if (!pageRef) {
            reject("Received invalid pageReference payload");
          }
          try {
            const url = _1$1.generateUrl(pageRef);
            if (url) {
              window.open(new URL(url, window.location.href));
              resolve("Navigated to the correct path");
            } else {
              reject("Received invalid pageReference payload");
            }
          } catch (error) {
            reject(`Error generating URL: ${error.message}`);
          }
        });
      }
    };
  }
  const $fragment1 = _7_1_5.parseFragment`<header class="slds-modal__header${0}"${2}><h2${"a1:id"} class="slds-modal__title slds-hyphenate${0}"${2}>${"t2"}</h2></header>`;
  const $fragment2 = _7_1_5.parseFragment`<div class="slds-modal__content slds-var-p-around_medium${0}"${"a0:id"}${2}><div class="slds-text-align_center slds-text-heading_small slds-var-p-around_medium${0}"${2}>${"t2"}</div></div>`;
  const $fragment3 = _7_1_5.parseFragment`<button class="slds-button slds-button_brand${0}"${2}><label${3}>${"t2"}</label></button>`;
  const $fragment4 = _7_1_5.parseFragment`<button class="slds-button slds-button_brand${0}"${2}><label${3}>${"t2"}</label></button>`;
  const $fragment5 = _7_1_5.parseFragment`<div class="slds-backdrop slds-backdrop_open${0}"${2}></div>`;
  const stc0 = {
    key: 0
  };
  const stc1 = {
    "slds-modal": true,
    "slds-fade-in-open": true,
    "slds-modal_large": true
  };
  const stc2 = {
    classMap: {
      "slds-modal__container": true
    },
    key: 2
  };
  const stc3 = {
    classMap: {
      "slds-modal__footer": true
    },
    key: 7
  };
  function tmpl($api, $cmp, $slotset, $ctx) {
    const {gid: api_scoped_id, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, b: api_bind, h: api_element} = $api;
    const {_m0, _m1, _m2, _m3} = $ctx;
    return [$cmp.showModal ? api_element("section", stc0, [api_element("section", {
      classMap: stc1,
      attrs: {
        role: "dialog",
        tabindex: "-1",
        "aria-labelledby": api_scoped_id("modal-heading-01"),
        "aria-modal": "true",
        "aria-describedby": api_scoped_id("modal-content-id-1")
      },
      key: 1
    }, [api_element("div", stc2, [api_static_fragment($fragment1, 4, [api_static_part(1, {
      attrs: {
        id: api_scoped_id("modal-heading-01")
      }
    }, null), api_static_part(2, null, api_dynamic_text($cmp.labels.ModalHeader))]), api_static_fragment($fragment2, 6, [api_static_part(0, {
      attrs: {
        id: api_scoped_id("modal-content-id-1")
      }
    }, null), api_static_part(2, null, api_dynamic_text($cmp.modalBody))]), api_element("footer", stc3, [!$cmp.config.forceAppUpdate ? api_static_fragment($fragment3, 9, [api_static_part(0, {
      on: {
        click: _m1 || ($ctx._m1 = api_bind($cmp.remindMeLater))
      }
    }, null), api_static_part(2, null, api_dynamic_text($cmp.labels.RemindMeLater))]) : null, api_static_fragment($fragment4, 11, [api_static_part(0, {
      on: {
        click: _m3 || ($ctx._m3 = api_bind($cmp.openStore))
      }
    }, null), api_static_part(2, null, api_dynamic_text($cmp.labels.UpdateNow))])])])]), api_static_fragment($fragment5, 13)]) : null];
  }
  var _tmpl = _7_1_5.registerTemplate(tmpl);
  tmpl.stylesheets = [];
  tmpl.stylesheetToken = "lwc-2mvql2nutql";
  tmpl.legacyStylesheetToken = "mobileruntime-appUpdateModal_appUpdateModal";
  _7_1_5.freezeTemplate(tmpl);
  const labels = {
    ModalHeader: "Update Your App",
    ForceUpdateModalBody: "You must update to the latest version of this app to continue using it.",
    ModalBody: "A new version of this app is available.Find and install the latest version of the app for your device.",
    RemindMeLater: "Remind Me Later",
    UpdateNow: "Update Now"
  };
  class AppUpdateModal extends _7_1_5.LightningElement {
    constructor(...args) {
      super(...args);
      this.showModal = true;
      this.config = {};
    }
    get labels() {
      return labels;
    }
    get modalBody() {
      return this.config.forceAppUpdate ? this.labels.ForceUpdateModalBody : this.labels.ModalBody;
    }
    openStore() {
      window.open(this.config?.minVersion?.url?.trim());
    }
    remindMeLater() {
      this.showModal = false;
    }
  }
  _7_1_5.registerDecorators(AppUpdateModal, {
    publicProps: {
      config: {
        config: 0
      }
    },
    fields: ["showModal"]
  });
  const __lwc_component_class_internal = _7_1_5.registerComponent(AppUpdateModal, {
    tmpl: _tmpl,
    sel: "mobileruntime-app-update-modal",
    apiVersion: 62
  });
  const FETCH_NATIVE_TABBAR_CONFIG = `/services/data/v57.0/connect/sites/${siteId__default["default"]}/cms/delivery/contents?contentTypeFQN=sfdc_cms__mobilePublisherConfig&includeContentBody=true`;
  function invokeNativeApi(action, params) {
    if (!isNativeJSAvailable()) {
      _1$2.log("Native JS API is not available");
      return;
    }
    const {
      invokeNative
    } = window.mycommunities.nativejsapi;
    return invokeNative(action, params);
  }
  function isAbsoluteUrl(url = "") {
    return new RegExp("^([a-z]+://)", "i").test(url);
  }
  function isExternalLink(url = "") {
    if (!isAbsoluteUrl(url)) {
      return false;
    }
    const urlObj = new URL(url);
    const currentHost = window.location.host;
    return urlObj.host !== currentHost;
  }
  async function hideSplashScreen() {
    if (!isNativeJSAvailable()) {
      _1$2.log("Native JS API is not available");
      return;
    }
    try {
      const response = await _1$3.fetch(FETCH_NATIVE_TABBAR_CONFIG, {
        method: "GET"
      });
      if (response.status === 200) {
        const data = await response.json();
        const origin = window.location.origin;
        const {
          nativeTabMenu = {},
          mobilePublisherAppUpdateConfig = {}
        } = data?.contents?.[0]?.contentBody || {};
        nativeTabMenu?.menuItems?.forEach((menuItem, idx) => {
          const {
            payload,
            name,
            ...item
          } = menuItem;
          nativeTabMenu.menuItems[idx] = {
            ...item,
            name: name ? name : " ",
            id: (idx + 1) * 10,
            position: idx + 1,
            targetUrl: constructTargetUrl(origin, menuItem),
            iconDetails: {
              ...item.iconDetails,
              mimeType: "image/png",
              url: `data:image/png;base64,${payload}`
            }
          };
        });
        if (mobilePublisherAppUpdateConfig) {
          const {
            forceAppUpdate = false,
            enableAppUpdate = false,
            minVersion = {}
          } = mobilePublisherAppUpdateConfig;
          const platform = isIOS() ? "ios" : isAndroid() ? "android" : "";
          const config = {
            forceAppUpdate,
            enableAppUpdate,
            minVersion: minVersion[platform]
          };
          if (isNativeFeatureFlagEnabled("forceAppUpdate")) {
            nativeTabMenu.appUpdateConfig = {
              enableAppUpdate,
              gracePeriod: forceAppUpdate ? 0 : 15
            };
          } else {
            showWebViewModal(config);
          }
        }
        triggerWebAppBootstrapDone(nativeTabMenu);
      } else {
        _1$2.log("Failed to fetch bottom tab bar. Status is: ", response.status);
        triggerWebAppBootstrapDone(true);
      }
    } catch (err) {
      _1$2.log("Failed to fetch bottom tab bar", err);
      triggerWebAppBootstrapDone(true);
    }
    _1$2.log("Initial load done! Splash Screen hidden");
  }
  function isRedirectToNetworkSwitcher(url, siteURLPrefix) {
    const urlObj = new URL(url || "", window.location.origin);
    url = urlObj.href;
    const switchNetworkPath = "/servlet/networks/switch";
    const clickedURLPathName = urlObj.pathname;
    const idxOfSlashS = clickedURLPathName.indexOf("/s/");
    const clickedURLPrefix = idxOfSlashS === -1 ? clickedURLPathName : clickedURLPathName.substring(0, idxOfSlashS + 2);
    return [switchNetworkPath, encodeURIComponent(switchNetworkPath)].some((networkPath) => url.includes(networkPath)) || !clickedURLPrefix.startsWith(siteURLPrefix);
  }
  function to18Char(recordId) {
    if (!recordId) {
      return null;
    }
    switch (recordId.length) {
      case 15:
        return get18CharId(recordId);
      case 18:
        return recordId;
      default:
        return null;
    }
  }
  function isCordovaAvailable() {
    const {
      cordova
    } = window;
    return typeof cordova !== "undefined" && cordova && cordova.require("cordova/channel") && cordova.require("cordova/channel").onDeviceReady && cordova.require("cordova/channel").onDeviceReady.state === 2;
  }
  function getCordovaOauthPlugin() {
    return isCordovaAvailable() ? window.cordova.require("com.salesforce.plugin.oauth") : null;
  }
  function isLogoutURL(url) {
    if (!url) {
      return false;
    }
    const logoutUrl = "/secur/logout.jsp";
    return url.includes(logoutUrl) || url.includes(encodeURIComponent(logoutUrl));
  }
  function handleLogout(logoutUrl) {
    const oAuthPlugin = getCordovaOauthPlugin();
    if (oAuthPlugin) {
      oAuthPlugin.logout(logoutUrl);
    }
  }
  function handleDOMContentLoaded() {
    _1$2.log("hybrid_app_manager_utils:handle_page_loaded");
    injectNativeApis();
    if (isNativeJSAvailable()) {
      if (typeof window.mycommunities.nativejsapi.webAppPageLoadDone === "function") {
        _1$2.log("hybrid_app_manager_utils:handle_page_loaded: webAppPageLoadDone function called");
        window.mycommunities.nativejsapi.webAppPageLoadDone();
      } else {
        _1$2.log("hybrid_app_manager_utils:handle_page_loaded:webAppPageLoadDone function is not available");
      }
    }
  }
  function triggerWebAppBootstrapDone(data) {
    const {
      webAppBootstrapDone
    } = window.mycommunities.nativejsapi;
    _1$2.log("Triggering webAppBootstrapDone");
    webAppBootstrapDone(data);
  }
  function isNativeFeatureFlagEnabled(featureName) {
    if (isNativeJSAvailable()) {
      const clientFeatures = window.mycommunities.nativejsapi.clientFeatures;
      return clientFeatures?.[featureName]?.enabled;
    }
    return false;
  }
  function showWebViewModal(config) {
    const currentAppVersion = getCurrentAppVersion();
    if (config.enableAppUpdate && currentAppVersion) {
      const minAppVersion = config.minVersion.version;
      const showModal = compareAppVersion(currentAppVersion, minAppVersion);
      if (showModal) {
        const modal = _7_1_5.createElement("app-update-modal", {
          is: __lwc_component_class_internal
        });
        modal.config = config;
        document.body.appendChild(modal);
      }
    }
  }
  function compareAppVersion(currentAppVersion, minAppVersion) {
    let v1parts = currentAppVersion.split(".");
    let v2parts = minAppVersion.split(".");
    let versionComparatorVal = 0;
    while (v1parts.length < v2parts.length)
      v1parts.push("0");
    while (v2parts.length < v1parts.length)
      v2parts.push("0");
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
    for (let i = 0; i < v1parts.length; ++i) {
      if (v1parts[i] === v2parts[i]) {
        continue;
      } else if (v1parts[i] > v2parts[i]) {
        versionComparatorVal = 1;
        break;
      } else {
        versionComparatorVal = -1;
        break;
      }
    }
    return versionComparatorVal === -1;
  }
  function isIOS() {
    const userAgent = window?.navigator?.userAgent || "";
    return userAgent.toLowerCase().includes("iphone") || userAgent.toLowerCase().includes("ipad");
  }
  function isAndroid() {
    const userAgent = window?.navigator?.userAgent || "";
    return userAgent.toLowerCase().includes("android");
  }
  function getCurrentAppVersion() {
    const userAgent = window?.navigator?.userAgent || "";
    const appVersion = userAgent.split("CommunityHybridContainer/")[1];
    return appVersion && (appVersion.match(/(\d{1,3}\.)?(\d{1,3}\.)?(\d{1,3})/) || [])[0];
  }
  function get18CharId(recordId) {
    let suffix = "";
    const CASE_DECODE_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456";
    for (let set = 0; set < 3; ++set) {
      let decode_value = 0;
      for (let bit = 0; bit < 5; bit++) {
        const c = recordId.charAt(set * 5 + bit);
        if (c >= "A" && c <= "Z") {
          decode_value += 1 << bit;
        }
      }
      suffix += CASE_DECODE_STRING.charAt(decode_value);
    }
    return recordId + suffix;
  }
  function isNativeJSAvailable() {
    return window?.mycommunities?.nativejsapi;
  }
  function constructTargetUrl(baseUrl, menuItem) {
    let constructedTargetUrl = menuItem.targetUrl;
    if (communityBasePath__default["default"]) {
      constructedTargetUrl = communityBasePath__default["default"] + constructedTargetUrl;
    }
    return new URL(constructedTargetUrl, baseUrl).href;
  }
  const FRONTDOOR_PATH_PREFIX = "/secur/frontdoor.jsp";
  function handleSessionTimeout({
    routeUrl
  }) {
    const oAuthPlugin = getCordovaOauthPlugin();
    if (oAuthPlugin) {
      oAuthPlugin.authenticate(function(map) {
        if (map && map.accessToken) {
          document.cookie = `sid=${map.accessToken}; path=/; secure=true`;
          if (routeUrl != null) {
            window.open(routeUrl);
          }
        }
      }, function() {
        _1$2.logError("Error in handler Session Timeout. Cordova OAuth Plugin authentication failed.");
      });
    } else {
      _1$2.logError("Error in handler Session Timeout. OAuth Plugin is not available.");
    }
  }
  async function isSessionTimeout() {
    let isTimeout = false;
    const user = await _0_13_10.load("@app/user/v/1");
    try {
      await _0_13_10.load(`@app/user?c=${crypto.randomUUID()}`, "mobileruntime/hybridAppManager/v/1");
    } catch (e) {
      isTimeout = !user.isGuest;
    }
    return isTimeout;
  }
  function isLoginNavigation(url) {
    const loginURL = new URL(loginPath__default["default"], window.location.href);
    const pageURL = new URL(url, window.location.href);
    return loginPath__default["default"] && loginURL.pathname === pageURL.pathname && loginURL.origin === pageURL.origin;
  }
  function handleAuthentication(startURL) {
    const oAuthPlugin = getCordovaOauthPlugin();
    if (oAuthPlugin) {
      oAuthPlugin.authenticate(function(creds) {
        window.location.href = `${creds.loginUrl}${FRONTDOOR_PATH_PREFIX}?sid=${creds.accessToken}&retURL=${encodeURIComponent(startURL || basePath__default["default"])}&display=touch`;
      }, function() {
        throw new Error("Authentication via Cordova OAuth Plugin failed.");
      });
    } else {
      window.location.href = startURL || loginPath__default["default"];
    }
  }
  function handleAuthenticationForLoginRoute(route) {
    if (typeof route === "object") {
      if (route.type === "standard__webPage") {
        const {
          attributes: {
            url = null
          } = {}
        } = route;
        if (url && isLoginNavigation(url)) {
          const routeURL = new URL(url, window.location.href);
          handleAuthentication(routeURL.searchParams.get("startURL"));
          return false;
        }
      } else if (route.type === "comm__namedPage" && route.attributes && route.attributes.name === "Login" || route.type === "comm__loginPage" && route.attributes?.actionName === "login") {
        handleAuthentication(route?.state?.startURL);
        return false;
      }
    }
    return true;
  }
  async function handleAuthenticationForPrivateRoute({
    next: {
      route,
      routeDefinition
    } = {}
  } = {}) {
    if (routeDefinition?.metadata?.isPublic !== false) {
      return true;
    }
    const {
      default: user
    } = await _0_13_10.load("@app/user/v/1");
    if (user.isGuest) {
      const url = await _1$1.generateUrl(route);
      if (url) {
        const routeURL = new URL(url, window.location.href);
        handleAuthentication(routeURL.pathname + routeURL.search + routeURL.hash);
        return false;
      }
    }
    return true;
  }
  function showErrorToastMessage() {
    _1$2.log("Handle showing of Toast Message for Error case.");
  }
  const VALID_DOWNLOAD_PATHS = ["/sfc/servlet.shepherd", "/servlet/servlet.FileDownload", "/servlet/fileField", "version/renditionDownload", "/cms/delivery/media"];
  function parseFileDownloadUrl(url) {
    const fileContentDownloadRoute = "/sfc/servlet.:type/:contentType/download/:recordId";
    const fileContentRouteMatcher = new RegExp(fileContentDownloadRoute.replace(/:[^\s/]+/g, "([\\w-]+)"));
    const match = url.match(fileContentRouteMatcher);
    if (match && match.length === 4) {
      return {
        recordId: match[3]
      };
    }
    const attachmentDownloadRoute = "/servlet/servlet.:type?file=:recordId";
    const attachmentRouteMatcher = new RegExp(attachmentDownloadRoute.replace(/:[^\s/?]+/g, "([\\w-]+)").replace(/\?/g, "[?]"));
    const attachmentMatch = url.match(attachmentRouteMatcher);
    if (attachmentMatch && attachmentMatch.length === 3) {
      return {
        recordId: attachmentMatch[2]
      };
    }
    const FILE_FIELD_PATH = "/servlet/fileField";
    if (url.includes(FILE_FIELD_PATH)) {
      const searchParams = new URLSearchParams(decodeURIComponent(url).split("?")[1]);
      const recordId = searchParams.get("entityId");
      const fieldId = searchParams.get("field");
      return {
        recordId,
        fieldId
      };
    }
    const RENDITION_DOWNLOAD_PATH = "version/renditionDownload";
    if (url.includes(RENDITION_DOWNLOAD_PATH)) {
      const renditionURL = new URL(url);
      const versionId = renditionURL.searchParams.get("versionId");
      return {
        recordId: to18Char(versionId)
      };
    }
    const CMS_DOWNLOAD_PATH = "/cms/delivery/media";
    if (url.includes(CMS_DOWNLOAD_PATH)) {
      const cmsFileDownloadPath = "/cms/delivery/media/([\\w]+)";
      const cmsFileRouteMatcher = new RegExp(cmsFileDownloadPath);
      const cmsMatch = url.match(cmsFileRouteMatcher);
      if (cmsMatch && cmsMatch.length === 2) {
        const recordId = cmsMatch[1];
        const cmsURL = new URL(url);
        const versionId = cmsURL.searchParams.get("version");
        const channelId = cmsURL.searchParams.get("channelId");
        return {
          recordId,
          versionId,
          channelId
        };
      }
    }
    return null;
  }
  function invokeFileDownload(recordInfo) {
    const nativePromise = invokeNativeApi("downloadFile", recordInfo);
    if (nativePromise) {
      return nativePromise.catch((error) => {
        _1$2.log(`Error while downloading file of record id: ${recordInfo.recordId} message: ${error}` && error.message);
        showErrorToastMessage();
      });
    }
  }
  function handleFileDownloadUrl(url) {
    if (!url) {
      _1$2.log(`${fileDownloadErrorMsg__default["default"]}. URL is ${url}`);
      showErrorToastMessage();
      return;
    }
    const recordInformation = parseFileDownloadUrl(url);
    if (!recordInformation) {
      _1$2.log(`Parsing the file URL "${url}" yielded null`);
      showErrorToastMessage();
      return;
    }
    return invokeFileDownload(recordInformation);
  }
  function isFileDownloadUrl(url) {
    url = url || "";
    return VALID_DOWNLOAD_PATHS.some((downloadPath) => url.indexOf(downloadPath) > -1);
  }
  const originalOpen = globalThis.open;
  function handlePageNavigation(url) {
    const urlObj = new URL(url, window.location.href);
    url = urlObj.href;
    if (urlObj.protocol === "http:") {
      _1$2.log("Blocked for http protocol with URL:", url);
      return;
    }
    if (url.startsWith("javascript")) {
      _1$2.log("Blocked potential XSS attempt with URL:", url);
      return;
    }
    if (url.indexOf("/") !== 0 && url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
      return originalOpen(url, "_self");
    }
    if (isLogoutURL(url)) {
      handleLogout(url);
    } else if (isExternalLink(urlObj)) {
      invokeNativeApi("navigateToExternalURL", {
        url
      });
    } else if (isLoginNavigation(url)) {
      dispatchNavigationEvent({
        type: "standard__webPage",
        attributes: {
          url: urlObj.pathname + urlObj.search + urlObj.hash
        }
      }, false);
    } else if (isFileDownloadUrl(url)) {
      handleFileDownloadUrl(url);
    } else if (isRedirectToNetworkSwitcher(url, basePath$1__default["default"])) {
      invokeNativeApi("navigateToExternalURL", {
        url
      });
    } else {
      const pathname = urlObj?.pathname || "";
      const queryParams = urlObj?.search || "";
      const replaceState = pathname === "/" || pathname === basePath$1__default["default"];
      if (pathname.startsWith(communityBasePath__default["default"])) {
        dispatchNavigationEvent({
          type: "standard__webPage",
          attributes: {
            url: pathname + queryParams
          }
        }, replaceState);
      } else {
        dispatchNavigationEvent({
          type: "standard__webPage",
          attributes: {
            url
          }
        }, replaceState);
      }
    }
  }
  function dispatchNavigationEvent(routeObj, replaceState) {
    return document.dispatchEvent(new CustomEvent("notify-client-module", {
      cancelable: true,
      composed: true,
      detail: {
        action: "navigate",
        data: {
          routeObj,
          replaceState
        }
      }
    }));
  }
  function links() {
    registerDOMEvents();
  }
  function registerDOMEvents() {
    document.addEventListener("click", handleEvent);
    document.addEventListener("notify-mobile-module", notifyMobileModule);
  }
  function handleNavigationCompleted({
    pathMatch: path,
    route,
    routeDefinition
  }) {
    const {
      id
    } = route || {};
    const {
      type
    } = route?.pageReference || {};
    const {
      isRoot
    } = routeDefinition?.metadata || {};
    document.dispatchEvent(new CustomEvent("routeChangeSuccess", {
      bubbles: true,
      composed: true,
      detail: {
        routeType: type,
        routeId: id,
        routeUrl: path,
        backNavigation: {
          canGoBack: !isRoot
        }
      }
    }));
  }
  function handleEvent(event) {
    const target = event.composedPath().find((el) => el.tagName === "A");
    if (target) {
      event.preventDefault();
      event.stopPropagation();
      return handlePageNavigation(target.href);
    }
  }
  function notifyMobileModule({
    detail
  }) {
    const {
      action,
      data
    } = detail || {
      action: "",
      data: null
    };
    switch (action) {
      case "navigationcompleted":
        handleNavigationCompleted(data?.routeResult || {});
        break;
      default:
        _1$2.log(`No such ${action} exists in notify-mobile-module event. Please re-check!!`);
        break;
    }
  }
  function overrideWindowOpen() {
    window.open = (url) => {
      return handlePageNavigation(url);
    };
  }
  async function hybridAppManager() {
    await hideSplashScreen();
    if (/interactive|complete/.test(document.readyState)) {
      handleDOMContentLoaded();
    } else {
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded, false);
    }
    overrideWindowOpen();
    return links();
  }
  function handleTimeout() {
    handleSessionTimeout({
      routeUrl: window.location.pathname
    });
    return false;
  }
  _1.PreNavigateOverrides.add((routeInfo) => {
    return handleAuthenticationForPrivateRoute(routeInfo);
  });
  _1.NavigationOverrides.add((route) => {
    return handleAuthenticationForLoginRoute(route);
  });
  _1.PageNavigationFailureOverrides.add(async ({
    error,
    isPublic
  }) => {
    const isTimeout = await isSessionTimeout();
    if (error?.constructor?.name === "LoaderError" && !isPublic && isTimeout) {
      return handleTimeout();
    }
    return true;
  });
  _1.SessionTimeoutOverrides.add(() => {
    return handleTimeout();
  });
  function defineModules(modulesByName) {
    Object.entries(modulesByName).forEach(([name, module]) => {
      LWR.define(name, [], function() {
        return module;
      });
    });
  }
  defineModules({
    "mobileruntime/hybridAppManager": hybridAppManager
  });
  exports.hybridAppManager = hybridAppManager;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("mobileruntime/hybridAppManager", ["exports", "mobileruntime/hybridAppManager/v/1"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
