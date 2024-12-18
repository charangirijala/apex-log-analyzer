LWR.define("webruntime/bootstrapHook/v/1_66_768-252_0", ["exports", "lwc/v/7_1_5", "webruntime/routingService/v/1"], function(exports, _7_1_5, _1) {
  "use strict";
  let setHooksCalled = false;
  function bootstrapHook(serviceAPI) {
    if (!setHooksCalled) {
      _7_1_5.setHooks({
        sanitizeHtmlContent(content) {
          return content;
        }
      });
      setHooksCalled = true;
    }
    serviceAPI.addServerDataCallback(({
      serverData
    }) => {
      globalThis.CLWR = globalThis.CLWR || {};
      Object.assign(globalThis.CLWR, {
        serverData: {
          initialData: serverData.initialData || Object.values(serverData)[0]?.initialData,
          url: serverData.url || Object.values(serverData)[0]?.url,
          routeParams: serverData.routeParams || Object.values(serverData)[0]?.routeParams
        }
      });
    });
  }
  function buildServerRouter(url, eventTarget) {
    _1.initializeServerRouter(eventTarget, url);
  }
  exports.buildServerRouter = buildServerRouter;
  exports["default"] = bootstrapHook;
  Object.defineProperty(exports, "__esModule", {value: true});
});
LWR.define("webruntime/bootstrapHook", ["exports", "webruntime/bootstrapHook/v/1_66_768-252_0"], function(e, m) {
  e.default = m && typeof m == "object" && "default" in m ? m.default : m;
  Object.keys(m).forEach(function(n) {
    n === "default" || e.hasOwnProperty(n) || Object.defineProperty(e, n, {enumerable: true, get: function() {
      return m[n];
    }});
  });
});
