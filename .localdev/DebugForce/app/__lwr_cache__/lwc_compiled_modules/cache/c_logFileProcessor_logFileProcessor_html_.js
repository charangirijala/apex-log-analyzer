import _implicitStylesheets from "./logFileProcessor.css";
import _implicitScopedStylesheets from "./logFileProcessor.scoped.css?scoped=true";
import _lightningInput from "lightning/input";
import {freezeTemplate, registerTemplate} from "lwc";
const stc0 = [["text-align", "center", false]];
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, c: api_custom_element} = $api;
  const {_m0} = $ctx;
  return [api_custom_element("lightning-input", _lightningInput, {
    styleDecls: stc0,
    props: {
      "type": "file",
      "label": "Upload the .log / .txt file here",
      "accept": $cmp.acceptedFormats
    },
    key: 0,
    on: {
      "change": _m0 || ($ctx._m0 = api_bind($cmp.handleFileUpload))
    }
  })];
  /*LWC compiler v7.1.3*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-4ga6i2e7c9i";
tmpl.legacyStylesheetToken = "c-logFileProcessor_logFileProcessor";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
