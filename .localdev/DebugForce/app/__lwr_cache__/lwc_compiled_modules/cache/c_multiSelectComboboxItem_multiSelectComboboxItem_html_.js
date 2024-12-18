import _implicitStylesheets from "./multiSelectComboboxItem.css";
import _implicitScopedStylesheets from "./multiSelectComboboxItem.scoped.css?scoped=true";
import _lightningIcon from "lightning/icon";
import {freezeTemplate, parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<span class="slds-media__body${0}"${2}><span class="slds-truncate${0}"${"a1:title"}${2}>${"t2"}</span></span>`;
const stc0 = {
  classMap: {
    "slds-media": true,
    "slds-listbox__option": true,
    "list-box-option": true,
    "slds-listbox__option_plain": true,
    "slds-media_small": true
  },
  attrs: {
    "role": "option"
  },
  key: 1
};
const stc1 = {
  classMap: {
    "slds-media__figure": true
  },
  key: 3
};
const stc2 = {
  classMap: {
    "slds-icon": true,
    "slds-icon--selected": true,
    "slds-icon--x-small": true,
    "slds-icon-text-default": true,
    "slds-var-m-right_x-small": true
  },
  props: {
    "iconName": "utility:check",
    "size": "x-small",
    "alternativeText": "Selected"
  },
  key: 4
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {ncls: api_normalize_class_name, b: api_bind, c: api_custom_element, h: api_element, fr: api_fragment, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment} = $api;
  const {_m0} = $ctx;
  return [api_element("li", {
    className: api_normalize_class_name($cmp.itemClass),
    attrs: {
      "role": "presentation",
      "data-id": $cmp.item.key,
      "data-name": $cmp.item.value
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
    }
  }, [api_element("div", stc0, [$cmp.item.selected ? api_fragment(2, [api_element("span", stc1, [api_custom_element("lightning-icon", _lightningIcon, stc2)])], 0) : null, api_static_fragment($fragment1, 6, [api_static_part(1, {
    attrs: {
      "title": $cmp.item.value
    }
  }, null), api_static_part(2, null, api_dynamic_text($cmp.item.label))])])])];
  /*LWC compiler v7.1.3*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-31s3jva5phs";
tmpl.legacyStylesheetToken = "c-multiSelectComboboxItem_multiSelectComboboxItem";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
