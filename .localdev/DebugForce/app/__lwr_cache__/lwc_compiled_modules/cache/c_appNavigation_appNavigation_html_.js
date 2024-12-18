import _implicitStylesheets from "./appNavigation.css";
import _implicitScopedStylesheets from "./appNavigation.scoped.css?scoped=true";
import _cAppContent from "c/appContent";
import {freezeTemplate, parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<div class="slds-context-bar__primary navLeft${0}"${2}><h1 class="appName slds-context-bar__label-action slds-context-bar__app-name${0}"${2}><span class="slds-truncate${0}" title="Sales"${2}>DebugForce</span></h1></div>`;
const $fragment2 = parseFragment`<span class="text-resize-watcher${0}" aria-hidden="true"${2}> </span>`;
const $fragment3 = parseFragment`<div${"c0"} aria-hidden="false" draggable="true" role="listitem"${2}><a class="slds-context-bar__label-action${0}" href="#"${"a1:data-navitem"}${"a1:title"} tabindex="0" draggable="false" aria-current="page"${2}><span class="slds-truncate nav-item${0}"${2}>${"t3"}</span></a></div>`;
const stc0 = {
  classMap: {
    "slds-no-print": true
  },
  key: 0
};
const stc1 = {
  key: 1
};
const stc2 = {
  classMap: {
    "slds-context-bar": true
  },
  key: 2
};
const stc3 = {
  classMap: {
    "slds-grid": true,
    "slds-has-flexi-truncate": true
  },
  key: 5
};
const stc4 = {
  classMap: {
    "slds-context-bar__secondary": true
  },
  attrs: {
    "role": "navigation",
    "aria-label": "Global"
  },
  key: 8
};
const stc5 = {
  classMap: {
    "slds-grid": true,
    "slds-has-flexi-truncate": true
  },
  attrs: {
    "role": "list"
  },
  key: 9
};
const stc6 = {
  key: 12
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {st: api_static_fragment, ncls: api_normalize_class_name, k: api_key, b: api_bind, d: api_dynamic_text, sp: api_static_part, i: api_iterator, h: api_element, c: api_custom_element} = $api;
  const {_m0} = $ctx;
  return [api_element("div", stc0, [api_element("div", stc1, [api_element("div", stc2, [api_static_fragment($fragment1, 4), api_element("div", stc3, [api_static_fragment($fragment2, 7), api_element("nav", stc4, [api_element("div", stc5, api_iterator($cmp.navItems, function (item, itemidx) {
    return api_static_fragment($fragment3, api_key(11, item.label), [api_static_part(0, {
      className: api_normalize_class_name(item.classCombination)
    }, null), api_static_part(1, {
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.handleNavigationItemClick))
      },
      attrs: {
        "data-navitem": itemidx,
        "title": item.label
      }
    }, null), api_static_part(3, null, api_dynamic_text(item.label))]);
  }))])])])])]), api_custom_element("c-app-content", _cAppContent, stc6)];
  /*LWC compiler v7.1.3*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-248qas79jvc";
tmpl.legacyStylesheetToken = "c-appNavigation_appNavigation";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
