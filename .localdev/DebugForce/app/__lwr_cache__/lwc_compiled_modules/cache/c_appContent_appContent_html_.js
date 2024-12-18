import _implicitStylesheets from "./appContent.css";
import _implicitScopedStylesheets from "./appContent.scoped.css?scoped=true";
import _cLogFileProcessor from "c/logFileProcessor";
import _cLogPreviewer from "c/logPreviewer";
import _cLogAnalysis from "c/logAnalysis";
import {freezeTemplate, parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<div${"c0"}${2}><p${3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quidem fuga dignissimos minima magnam. Ducimus, fuga? Molestias nemo eius voluptates laborum, sapiente soluta cupiditate ducimus, magni in et sit quia natus perferendis animi perspiciatis reiciendis suscipit dignissimos! Est incidunt, autem placeat quidem consectetur, suscipit, cumque similique ipsam quaerat ducimus facere! Architecto earum, deleniti alias quasi accusantium dignissimos optio nihil aut velit aliquid quisquam adipisci, impedit accusamus voluptate magni totam asperiores, eligendi tenetur ipsum. Iusto rem, consectetur mollitia nam quod quo. Voluptatibus consequuntur ducimus enim repudiandae molestias, rerum beatae expedita dolores hic debitis fuga unde ut? Ex inventore doloremque eligendi? Iste!</p></div>`;
const stc0 = {
  classMap: {
    "oneCenterStage": true,
    "slds-is-absolute": true
  },
  key: 0
};
const stc1 = {
  classMap: {
    "appContent": true,
    "slds-is-relative": true
  },
  key: 1
};
const stc2 = {
  classMap: {
    "slds-brand-band": true,
    "slds-template_default": true
  },
  key: 2
};
const stc3 = {
  key: 4
};
const stc4 = {
  key: 6
};
const stc5 = {
  key: 8
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {ncls: api_normalize_class_name, c: api_custom_element, h: api_element, sp: api_static_part, st: api_static_fragment} = $api;
  return [api_element("div", stc0, [api_element("div", stc1, [api_element("div", stc2, [api_element("div", {
    className: api_normalize_class_name($cmp.isHome),
    key: 3
  }, [api_custom_element("c-log-file-processor", _cLogFileProcessor, stc3)]), api_element("div", {
    className: api_normalize_class_name($cmp.isRawLogViewer),
    key: 5
  }, [api_custom_element("c-log-previewer", _cLogPreviewer, stc4)]), api_element("div", {
    className: api_normalize_class_name($cmp.isLogAnalysis),
    key: 7
  }, [api_custom_element("c-log-analysis", _cLogAnalysis, stc5)]), api_static_fragment($fragment1, 10, [api_static_part(0, {
    className: api_normalize_class_name($cmp.isDetailLogViewer)
  }, null)])])])])];
  /*LWC compiler v7.1.3*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-7dgfns8br9f";
tmpl.legacyStylesheetToken = "c-appContent_appContent";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
