import _implicitStylesheets from "./multiSelectCombobox.css";
import _implicitScopedStylesheets from "./multiSelectCombobox.scoped.css?scoped=true";
import _lightningIcon from "lightning/icon";
import _cMultiSelectComboboxItem from "c/multiSelectComboboxItem";
import _lightningPillContainer from "lightning/pillContainer";
import {freezeTemplate, parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<abbr title="required" class="slds-required${0}"${2}>*</abbr>`;
const stc0 = {
  classMap: {
    "slds-form-element": true
  },
  key: 0
};
const stc1 = {
  classMap: {
    "slds-form-element__label": true
  },
  key: 1
};
const stc2 = {
  classMap: {
    "slds-form-element__control": true
  },
  key: 4
};
const stc3 = {
  classMap: {
    "slds-combobox_container": true
  },
  key: 5
};
const stc4 = {
  classMap: {
    "slds-combobox": true,
    "slds-dropdown-trigger": true,
    "slds-dropdown-trigger_click": true,
    "multi-select-combobox__dropdown": true
  },
  key: 6
};
const stc5 = {
  classMap: {
    "slds-combobox_form-element": true,
    "slds-input-has-icon": true,
    "slds-input-has-icon_right": true
  },
  attrs: {
    "role": "none"
  },
  key: 7
};
const stc6 = {
  "slds-combobox__input": true,
  "slds-input_faux": true,
  "fix-slds-input_faux": true,
  "multi-select-combobox__input": true
};
const stc7 = {
  classMap: {
    "slds-icon_container": true,
    "slds-icon-utility-down": true,
    "slds-input__icon": true,
    "slds-input__icon_right": true,
    "multi-select-combobox__icon": true
  },
  attrs: {
    "title": "Click to open the dropdown"
  },
  key: 9
};
const stc8 = {
  classMap: {
    "slds-icon": true,
    "slds-icon--selected": true,
    "slds-icon--x-small": true,
    "slds-icon-text-default": true
  },
  props: {
    "iconName": "utility:down",
    "size": "xx-small",
    "alternativeText": "Click here"
  },
  key: 10
};
const stc9 = {
  classMap: {
    "slds-dropdown": true,
    "slds-dropdown_length-5": true,
    "slds-dropdown_fluid": true,
    "multi-select-combobox__listbox": true
  },
  attrs: {
    "aria-label": "Multi Select Combobox Dropdown",
    "role": "listbox"
  },
  key: 11
};
const stc10 = {
  classMap: {
    "slds-listbox": true,
    "slds-listbox_vertical": true
  },
  attrs: {
    "role": "presentation"
  },
  key: 12
};
const stc11 = {
  key: 14
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {st: api_static_fragment, d: api_dynamic_text, t: api_text, h: api_element, gid: api_scoped_id, c: api_custom_element, k: api_key, b: api_bind, i: api_iterator} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("div", stc0, [$cmp.label ? api_element("label", stc1, [$cmp.required ? api_static_fragment($fragment1, 3) : null, api_text(api_dynamic_text($cmp.label))]) : null, api_element("div", stc2, [api_element("div", stc3, [api_element("div", stc4, [api_element("div", stc5, [api_element("input", {
    classMap: stc6,
    attrs: {
      "aria-label": "Multi Select Combobox Input",
      "aria-controls": api_scoped_id("multi-pick-list-dropdown-items"),
      "role": "textbox",
      "type": "text",
      "required": $cmp.required ? "" : null,
      "disabled": $cmp.isDisabled ? "" : null,
      "readonly": ""
    },
    props: {
      "value": $cmp.selectedItems
    },
    key: 8
  }), api_element("span", stc7, [api_custom_element("lightning-icon", _lightningIcon, stc8)])]), api_element("div", stc9, [api_element("ul", stc10, api_iterator($cmp.currentOptions, function (item) {
    return api_custom_element("c-multi-select-combobox-item", _cMultiSelectComboboxItem, {
      props: {
        "item": item
      },
      key: api_key(13, item.value),
      on: {
        "change": _m0 || ($ctx._m0 = api_bind($cmp.handleChange))
      }
    });
  }))])])])]), $cmp.hasPillsEnabled ? api_element("div", stc11, [$cmp.isVisible ? api_custom_element("lightning-pill-container", _lightningPillContainer, {
    props: {
      "items": $cmp.selectedOptions,
      "variant": "bare"
    },
    key: 15,
    on: {
      "itemremove": _m1 || ($ctx._m1 = api_bind($cmp.handleRemove))
    }
  }) : null]) : null])];
  /*LWC compiler v7.1.3*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-2ek5fhb76d7";
tmpl.legacyStylesheetToken = "c-multiSelectCombobox_multiSelectCombobox";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
