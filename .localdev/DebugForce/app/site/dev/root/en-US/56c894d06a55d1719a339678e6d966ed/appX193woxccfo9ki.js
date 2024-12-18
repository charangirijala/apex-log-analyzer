(function() { LWR.define('webruntime/appX193woxccfo9ki', ['exports', 'lwc', 'webruntime/app', '@view/scopedHeaderAndFooter', '@view/register', 'webruntime/bootstrapHook', 'force/ldsEngineWebruntime', 'force/luvioRuntimeWebruntime', 'dxp_data_provider/imageDataProvider', 'dxp_data_provider/userDataProvider', 'dxp_data_provider/userRecordDataProvider'], (function (exports, lwc, App, appView, routerContainerView, bootstrapHook, ldsEngineWebruntime, luvioRuntimeWebruntime, dataProvider0, dataProvider1, dataProvider2) {

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var App__default = /*#__PURE__*/_interopDefaultCompat(App);
    var appView__default = /*#__PURE__*/_interopDefaultCompat(appView);
    var routerContainerView__default = /*#__PURE__*/_interopDefaultCompat(routerContainerView);
    var dataProvider0__default = /*#__PURE__*/_interopDefaultCompat(dataProvider0);
    var dataProvider1__default = /*#__PURE__*/_interopDefaultCompat(dataProvider1);
    var dataProvider2__default = /*#__PURE__*/_interopDefaultCompat(dataProvider2);

    const stc0 = [];
    function tmpl($api, $cmp, $slotset, $ctx) {
      return stc0;
      /*LWC compiler v7.1.5*/
    }
    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.renderMode = "light";
    tmpl.stylesheets = [];
    tmpl.stylesheetToken = "lwc-429djhfve2n";
    tmpl.legacyStylesheetToken = "webruntime-appX193woxccfo9ki_appX193woxccfo9ki";
    lwc.freezeTemplate(tmpl);

    function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
    function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

    /* route parameters: {} */
    class RouteApp extends App__default.default {
      constructor() {
        super(appView__default.default, routerContainerView__default.default);
        this.url = void 0;
      }
      connectedCallback() {
        bootstrapHook.buildServerRouter(this.url, this);
      }
      /*LWC compiler v7.1.5*/
    }
    RouteApp.renderMode = 'light';
    lwc.registerDecorators(RouteApp, {
      publicProps: {
        url: {
          config: 0
        }
      }
    });
    const __lwc_component_class_internal = lwc.registerComponent(RouteApp, {
      tmpl: _tmpl,
      sel: "webruntime-app-x193woxccfo9ki",
      apiVersion: 62
    });
    function getServerData(_x) {
      return _getServerData.apply(this, arguments);
    }
    function _getServerData() {
      _getServerData = _asyncToGenerator(function* (context) {
        const routeParams = {
          ...context.query,
          ...context.params
        };
        yield Promise.all([dataProvider0__default.default.preloadData?.({
          ...context,
          attributes: [{
            "imageInfo": ""
          }]
        }).catch(err => {
          throw new Error(`Error in "getServerData" for "dxp_data_provider/imageDataProvider"${err.message ? ': ' + err.message : ''}`, {
            cause: err
          });
        }), dataProvider1__default.default.preloadData?.({
          ...context,
          attributes: [{
            "sfdcFields": [],
            "childData": {}
          }]
        }).catch(err => {
          throw new Error(`Error in "getServerData" for "dxp_data_provider/userDataProvider"${err.message ? ': ' + err.message : ''}`, {
            cause: err
          });
        }), dataProvider2__default.default.preloadData?.({
          ...context,
          attributes: [{
            "sfdcFields": []
          }]
        }).catch(err => {
          throw new Error(`Error in "getServerData" for "dxp_data_provider/userRecordDataProvider"${err.message ? ': ' + err.message : ''}`, {
            cause: err
          });
        })].filter(Boolean));
        const ldsDataStore = ldsEngineWebruntime.serializeDataStore();
        const luvioDataStore = luvioRuntimeWebruntime.serializeDataStore();
        const areAllSSRableDataProvidersStatic = [true , !dataProvider1__default.default.preloadData, !dataProvider2__default.default.preloadData].reduce((acc, isDPStatic) => acc && isDPStatic, true);
        const isEmpty = data => Object.keys(data || {}).length === 0;
        const isStatic = areAllSSRableDataProvidersStatic || isEmpty(ldsDataStore?.luvioStoreData?.data) && isEmpty(luvioDataStore?.data);
        return {
          props: {
            url: context.url,
            routeParams,
            initialData: {
              lds: ldsDataStore,
              luvio: luvioDataStore
            }
          },
          markup: {
            "title": "Register"
          },
          cache: {
            ttl: isStatic ? 43200 : 60
          }
        };
      });
      return _getServerData.apply(this, arguments);
    }

    exports.default = __lwc_component_class_internal;
    exports.getServerData = getServerData;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
})();
