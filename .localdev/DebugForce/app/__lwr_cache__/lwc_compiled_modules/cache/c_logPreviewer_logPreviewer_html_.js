import _implicitStylesheets from "./logPreviewer.css";
import _implicitScopedStylesheets from "./logPreviewer.scoped.css?scoped=true";
import _lightningCombobox from "lightning/combobox";
import _cMultiSelectCombobox from "c/multiSelectCombobox";
import _lightningInput from "lightning/input";
import {freezeTemplate, parseFragment, registerTemplate, sanitizeAttribute} from "lwc";
const $fragment1 = parseFragment`<div class="slds-hide${0}"${2}>${"t1"}</div>`;
const $fragment2 = parseFragment`<div class="slds-page-header report-header${0}"${2}><div class="slds-page-header__row${0}"${2}><div class="slds-page-header__col-title${0}"${2}><div class="slds-media${0}"${2}><div class="slds-media__figure${0}"${2}><span class="slds-icon_container slds-icon-standard-report${0}"${2}><svg aria-hidden="true" class="slds-page-header__icon slds-icon${0}" viewBox="0 0 100 100"${2}><path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"${3}/><path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM43 66c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V56c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v10zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V47c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v19zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V51c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v15z"${3}/></svg><span class="slds-assistive-text${0}"${2}>Report: Accounts</span></span></div><div class="slds-media__body${0}"${2}><div class="slds-page-header__name${0}"${2}><div class="slds-page-header__name-title${0}"${2}><h1${3}><span${3}>Log Viewer</span><span class="slds-page-header__title slds-truncate${0}" title="New Accounts Report"${2}>${"t18"}</span></h1></div></div></div></div></div><div class="slds-page-header__col-actions slds-align-middle slds-p-bottom_none${0}"${2}><div class="slds-page-header__controls${0}"${2}><div class="slds-page-header__control${0}"${2}><div class="action-bars${0}"${2}><div class="slds-m-left--xx-small${0}"${2}><div class="slds-button-group actionBarButtonGroup${0}" role="group"${2}><button class="slds-button slds-button_neutral action-bar-action-inlineEditReport reportAction report-action-inlineEditReport filtersButton${0}" type="button"${2}><svg aria-hidden="true" class="slds-button__icon slds-button__icon_left${0}" viewBox="0 0 52 52"${2}><g${3}><path d="M9.5 33.4l8.9 8.9c.4.4 1 .4 1.4 0L42 20c.4-.4.4-1 0-1.4l-8.8-8.8c-.4-.4-1-.4-1.4 0L9.5 32.1c-.4.4-.4 1 0 1.3zM36.1 5.7c-.4.4-.4 1 0 1.4l8.8 8.8c.4.4 1 .4 1.4 0l2.5-2.5c1.6-1.5 1.6-3.9 0-5.5l-4.7-4.7c-1.6-1.6-4.1-1.6-5.7 0l-2.3 2.5zM2.1 48.2c-.2 1 .7 1.9 1.7 1.7l10.9-2.6c.4-.1.7-.3.9-.5l.2-.2c.2-.2.3-.9-.1-1.3l-9-9c-.4-.4-1.1-.3-1.3-.1l-.2.2c-.3.3-.4.6-.5.9L2.1 48.2z"${3}/></g></svg>Enable Field Editing</button></div></div><div class="slds-m-left--xx-small${0}"${2}><div class="slds-button-group actionBarButtonGroup${0}"${"a31:id"} role="group"${2}><div class="slds-tooltip-trigger${0}" style="display: inline-block; line-height: 1"${2}><div${3}><div role="button" tabindex="-1"${3}><button class="slds-button slds-button_icon-border action-bar-action-searchTable reportAction report-action-searchTable filtersButton${0}" type="button"${2}><svg aria-hidden="true" class="slds-button__icon${0}" viewBox="0 0 52 52"${2}><path d="M49.62 45.27L36.22 32a18.9 18.9 0 10-34.1-9.2A18.91 18.91 0 0032 36.27l13.3 13.3a1.45 1.45 0 002.1 0l2.1-2.1a1.68 1.68 0 00.12-2.2zm-28.7-11.5a12.9 12.9 0 1112.9-12.9 12.87 12.87 0 01-12.9 12.9z" fill-rule="evenodd"${3}/></svg><span class="slds-assistive-text${0}"${2}>Search report table</span></button></div></div><span${3}></span></div></div></div><div class="slds-m-left--xx-small${0}"${2}><div class="slds-button-group actionBarButtonGroup${0}" role="group"${2}><button class="slds-button slds-button_neutral action-bar-action-addChart reportAction report-action-addChart filtersButton action-bar-sprite-button${0}" disabled="" type="button"${2}><svg aria-hidden="true" class="slds-button__icon slds-button__icon_left${0}" viewBox="0 0 100 100"${2}><path d="M45.2 67.5c-.7-5.7 1.1-11.5 4.9-15.8 3.8-4.3 9.3-6.7 15-6.7.8 0 1.7.1 2.5.2.9.1 1.8.3 2.7.6 1.4.4 2.7-.7 2.5-2.1-1.1-11.9-10-21.5-21.6-23.7-1.6-.3-3.2 1-3.2 2.6v22.7c0 1.5-1.2 2.7-2.7 2.7H22.7c-1.7 0-2.9 1.5-2.6 3.2 2.2 11.5 11.7 20.4 23.6 21.6 1.4.1 2.5-1.2 2.1-2.5-.3-.9-.5-1.9-.6-2.8z"${3}/><path d="M43.5 40.8V22.7c0-1.7-1.5-2.9-3.2-2.6-10.8 2-18.3 9.5-20.3 20.3-.3 1.6 1 3.2 2.6 3.2h18.2c1.5-.1 2.7-1.3 2.7-2.8zm36.4 22.3c-.8-6.6-6.2-12-12.9-12.9-.6-.1-1.3-.1-1.9-.1-8.9 0-16 7.7-14.9 16.9.8 6.7 6.2 12.1 12.9 12.9.6.1 1.3.1 1.9.1 8.9 0 16-7.7 14.9-16.9zm-7.6 3.1c0 .7-.5 1.2-1.2 1.2h-3.6v3.8c0 .7-.5 1.2-1.2 1.2h-2.5c-.7 0-1.2-.5-1.2-1.2v-3.7h-3.7c-.7 0-1.2-.5-1.2-1.2v-2.5c0-.7.5-1.2 1.2-1.2h3.6v-3.7c0-.7.5-1.2 1.2-1.2h2.5c.7 0 1.2.5 1.2 1.2v3.7h3.7c.7 0 1.2.5 1.2 1.2v2.4z"${3}/></svg>Add Chart</button></div></div><div class="slds-m-left--xx-small${0}"${2}><div class="slds-button-group actionBarButtonGroup${0}" role="group"${2}><div class="slds-tooltip-trigger${0}" style="display: inline-block; line-height: 1"${2}><div${3}><div role="button" tabindex="-1"${3}><button aria-pressed="false"${"a53:aria-controls"} aria-expanded="false" class="action-bar-action-toggleFilter reportAction report-action-toggleFilter filtersButton slds-button slds-not-selected slds-button_icon-border${0}" type="button"${2}><svg aria-hidden="true" class="slds-button__icon slds-button__icon_stateful${0}" viewBox="0 0 52 52"${2}><path d="M48.3 4H3.9C2.4 4 1.7 5.7 2.6 6.8L22 29.5c.6.7.9 1.7.9 2.6v14.4c0 .8.8 1.5 1.6 1.5h3c.8 0 1.4-.7 1.4-1.5V32.1c0-1 .4-1.9 1.1-2.6L49.6 6.8c.9-1.1.2-2.8-1.3-2.8z"${3}/></svg><span class="slds-assistive-text${0}"${2}>Filters</span></button></div></div><span${3}></span></div></div></div><div class="slds-m-left--xx-small${0}"${2}><div class="slds-button-group actionBarButtonGroup${0}"${"a60:id"} role="group"${2}><div class="slds-tooltip-trigger${0}" style="display: inline-block; line-height: 1"${2}><div${3}><div role="button" tabindex="-1"${3}><button class="slds-button slds-button_icon-border action-bar-action-refreshReport reportAction report-action-refreshReport filtersButton${0}" type="button"${2}><svg aria-hidden="true" class="slds-button__icon${0}" viewBox="0 0 52 52"${2}><path d="M46.5 4h-3c-.8 0-1.5.7-1.5 1.5v7c0 .9-.5 1.3-1.2.7-.3-.4-.6-.7-1-1-5-5-12-7.1-19.2-5.7-2.5.5-4.9 1.5-7 2.9-6.1 4-9.6 10.5-9.7 17.5-.1 5.4 2 10.8 5.8 14.7 4 4.2 9.4 6.5 15.2 6.5 5.1 0 9.9-1.8 13.7-5 .7-.6.7-1.6.1-2.2l-2.1-2.1c-.5-.5-1.4-.6-2-.1-3.6 3-8.5 4.2-13.4 3-1.3-.3-2.6-.9-3.8-1.6C11.7 36.6 9 30 10.6 23.4c.3-1.3.9-2.6 1.6-3.8C15 14.7 19.9 12 25.1 12c4 0 7.8 1.6 10.6 4.4.5.4.9.9 1.2 1.4.3.8-.4 1.2-1.3 1.2h-7c-.8 0-1.5.7-1.5 1.5v3.1c0 .8.6 1.4 1.4 1.4h18.3c.7 0 1.3-.6 1.3-1.3V5.5C48 4.7 47.3 4 46.5 4z"${3}/></svg><span class="slds-assistive-text${0}"${2}>Refresh</span></button></div></div><span${3}></span></div></div></div><div class="slds-m-left--xx-small${0}"${2}><div class="slds-button-group actionBarButtonGroup${0}"${"a71:id"} role="group"${2}><button class="slds-button slds-button_neutral action-bar-action-LightningReportEditAction reportAction report-action-LightningReportEditAction filtersButton${0}" type="button"${2}>Edit</button><div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-button_last${0}"${"a74:id"}${2}><button class="slds-button slds-button_icon-border ignore-click-MDNrlq4E6E more-actions-button${0}" tabindex="0" type="button" aria-expanded="false" aria-haspopup="true"${2}><svg aria-hidden="true" class="slds-button__icon${0}" viewBox="0 0 52 52"${2}><path d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z"${3}/></svg><span class="slds-assistive-text${0}"${2}>More Actions</span></button></div></div></div></div></div></div></div></div><div class="slds-page-header__row${0}"${2}><div class="slds-page-header__col-meta${0}"${2}></div></div></div>`;
const $fragment3 = parseFragment`<div class="filter-header-btn-container${0}"${2}><button type="button" class="slds-button slds-button_neutral${0}"${2}>Cancel</button><button type="button" class="slds-button slds-button_brand${0}"${2}>Save</button></div>`;
const $fragment4 = parseFragment`<div class="float-right slds-var-p-bottom_medium${0}"${2}><button type="button" class="slds-button slds-button_neutral slds-var-m-top_medium${0}"${2}><span${3}>Done</span></button></div>`;
const $fragment5 = parseFragment`<div class="slds-panel__header${0}"${2}><h2 class="slds-panel__header-title slds-text-heading_small slds-truncate${0}" title="Filters"${2}>Filters</h2><div class="slds-panel__header-actions${0}"${2}><button class="slds-button slds-button_icon slds-button_icon-small slds-panel__close${0}" title="Collapse Filter"${2}><svg class="slds-button__icon${0}" aria-hidden="true"${2}><use${"a6:xlink:href"}${3}/></svg><span class="slds-assistive-text${0}"${2}>Collapse Filter</span></button></div></div>`;
const $fragment6 = parseFragment`<ol class="slds-list_vertical slds-list_vertical-space${0}"${2}><li class="slds-item slds-hint-parent${0}"${2}><div class="slds-filters__item slds-grid slds-grid_vertical-align-center${0}"${2}><button class="slds-button_reset slds-grow slds-has-blur-focus${0}"${2}><span class="slds-assistive-text${0}"${2}>Edit filter:</span><span class="slds-show slds-text-body_small${0}"${2}>Show Me</span><span class="slds-show${0}"${2}>All Lines</span></button></div></li></ol>`;
const $fragment7 = parseFragment`<h3 class="slds-text-body_small slds-m-vertical_x-small${0}"${2}>Matching all these filters</h3>`;
const $fragment8 = parseFragment`<span class="slds-show slds-text-body_small${0}"${2}>${"t1"}</span>`;
const $fragment9 = parseFragment`<span class="slds-show filter-body${0}"${2}>${"t1"}</span>`;
const $fragment10 = parseFragment`<span class="slds-show filter-body${0}"${2}>${"t1"}</span>`;
const $fragment11 = parseFragment`<button class="slds-button slds-button_icon slds-button_icon slds-button_icon-small${0}" title="Remove Filter"${"a0:data-id"}${2}><svg class="slds-button__icon slds-button__icon_hint${0}" aria-hidden="true"${2}><use${"a2:xlink:href"}${3}/></svg></button>`;
const $fragment12 = parseFragment`<div class="slds-filters__footer slds-grid slds-shrink-none${0}"${2}><button class="slds-button_reset slds-text-link${0}"${2}>Add Filter</button><button class="slds-button_reset slds-text-link slds-col_bump-left${0}"${2}>Remove All</button></div>`;
const $fragment13 = parseFragment`<span class="image${0}" aria-label="" style="display: block"${2}></span>`;
const $fragment14 = parseFragment`<div class="widget-container widget-container_reportMetrics${0}"${2}><div draggable="false" class="widget contained-widget${0}"${2}><div class="dashboard-widget css-13udsys${0}"${2}><div class="metrics-widget widgetReady finalState${0}"${2}><ul${3}><li${3}><div class="metricsElement metricsTitle${0}" title="Total Records"${2}>Total Lines</div><div class="metricsElement metricsValue${0}"${2}>${"t9"}</div></li><li${3}><div class="metricsElement metricsTitle${0}" title="Total Annual Revenue"${2}>Total CodeUnits</div><div class="metricsElement metricsValue${0}"${2}>${"t14"}</div></li><li${3}><div class="metricsElement metricsTitle${0}" title="Total Partner Account"${2}>Total MethodUnits</div><div class="metricsElement metricsValue${0}"${2}>${"t19"}</div></li><li${3}><div class="metricsElement metricsTitle${0}" title="Total Contact Count"${2}>Total Contact Count</div><div class="metricsElement metricsValue${0}"${2}>0</div></li></ul></div></div></div></div>`;
const $fragment15 = parseFragment`<tr${3}><th class="line-header${0}"${2}></th><th class="line-header${0}" style="text-align: left"${2}>Line</th></tr>`;
const $fragment16 = parseFragment`<tr${3}><td style="text-align: center"${3}><span class="line-number-text${0}"${2}>${"t3"}</span></td><td${3}><span class="line-text${0}"${2}>${"t6"}</span></td></tr>`;
const $fragment17 = parseFragment`<div${3}></div>`;
const $fragment18 = parseFragment`<li class="slds-utility-bar__item slds-var-p-horizontal_xxx-small utility-bar-span-text${0}"${2}><span${3}>Lines per page:</span></li>`;
const $fragment19 = parseFragment`<li class="slds-utility-bar__item slds-var-p-horizontal_xxx-small${0}"${2}><div class="slds-button-group${0}"${2}><button class="slds-button slds-button_icon slds-button_icon-border${0}" title="Previous Page" tabindex="0"${2}><svg class="slds-button__icon${0}" aria-hidden="true"${2}><use${"a4:xlink:href"}${3}/></svg><span class="slds-assistive-text${0}"${2}>Previous Page</span></button><button class="slds-button slds-button_icon slds-button_icon-border${0}" title="Next Page"${2}><svg class="slds-button__icon${0}" aria-hidden="true"${2}><use${"a9:xlink:href"}${3}/></svg><span class="slds-assistive-text${0}"${2}>Next Page</span></button></div></li>`;
const $fragment20 = parseFragment`<li class="slds-utility-bar__item utility-bar-span-text slds-var-p-horizontal_xxx-small${0}"${2}><span${3}>of <strong${3}>${"t4"}</strong></span></li>`;
const $fragment21 = parseFragment`<li class="slds-utility-bar__item utility-bar-span-text slds-var-p-horizontal_xxx-small${0}"${2}><span${3}>Page</span></li>`;
const stc0 = {
  classMap: {
    "reportView": true
  },
  key: 2
};
const stc1 = {
  classMap: {
    "reportBuilderContainer": true
  },
  key: 3
};
const stc2 = {
  classMap: {
    "reportBuilder": true,
    "reportBuilder-view": true,
    "hide-settings-footer": true
  },
  key: 4
};
const stc3 = {
  classMap: {
    "edge-builder-ii": true
  },
  key: 5
};
const stc4 = {
  classMap: {
    "dashboard-container": true,
    "with-header": true
  },
  key: 6
};
const stc5 = {
  classMap: {
    "dashboard-builder-body": true,
    "dashboard-show-header": true
  },
  key: 9
};
const stc6 = {
  classMap: {
    "dashboard-builder-body-fill": true
  },
  key: 10
};
const stc7 = {
  classMap: {
    "dashboard-builder-body-content": true
  },
  key: 11
};
const stc8 = {
  classMap: {
    "dashboard-grid-container": true
  },
  key: 12
};
const stc9 = {
  classMap: {
    "layout-outer-container": true
  },
  key: 13
};
const stc10 = {
  classMap: {
    "layout-inner-container": true
  },
  styleDecls: [["background-color", "rgb(255, 255, 255)", false], ["overflow-y", "auto", false]],
  key: 14
};
const stc11 = {
  classMap: {
    "grid-layout-container": true
  },
  styleDecls: [["min-width", "480px", false]],
  key: 15
};
const stc12 = {
  classMap: {
    "grid-layout": true
  },
  styleDecls: [["background-color", "rgb(255, 255, 255)", false], ["background-position", "left top", false], ["background-size", "auto", false]],
  attrs: {
    "tabindex": "-1"
  },
  key: 16
};
const stc13 = {
  classMap: {
    "widget-grid": true
  },
  key: 17
};
const stc14 = {
  "widgets": true
};
const stc15 = {
  classMap: {
    "slds-popover": true,
    "popover-section": true,
    "slds-nubbin_right": true
  },
  attrs: {
    "role": "dialog"
  },
  key: 24
};
const stc16 = {
  classMap: {
    "filterPanel": true
  },
  key: 25
};
const stc17 = {
  classMap: {
    "slds-panel__body": true,
    "panelbody": true
  },
  key: 35
};
const stc18 = {
  classMap: {
    "slds-filters": true
  },
  key: 36
};
const stc19 = {
  classMap: {
    "slds-list_vertical": true,
    "slds-list_vertical-space": true
  },
  key: 42
};
const stc20 = {
  "slds-item": true,
  "slds-hint-parent": true
};
const stc21 = {
  "slds-button_reset": true,
  "slds-grow": true,
  "slds-has-blur-focus": true
};
const stc22 = {
  classMap: {
    "widget-container": true,
    "widget-container_scroll-container": true
  },
  key: 57
};
const stc23 = {
  classMap: {
    "widget": true
  },
  attrs: {
    "draggable": "false"
  },
  key: 58
};
const stc24 = {
  classMap: {
    "dashboard-widget": true,
    "css-13udsys": true
  },
  key: 59
};
const stc25 = {
  classMap: {
    "containerWidget": true,
    "container-widget": true,
    "background-image": true,
    "widgetReady": true,
    "finalState": true
  },
  styleDecls: [["background-position", "left top", false], ["background-size", "auto", false], ["background-color", "rgb(255, 255, 255)", false], ["border-radius", "0px", false]],
  key: 60
};
const stc26 = {
  classMap: {
    "widgets-inner": true
  },
  key: 63
};
const stc27 = {
  key: 66
};
const stc28 = {
  key: 67
};
const stc29 = {
  classMap: {
    "footerContainer": true
  },
  key: 74
};
const stc30 = {
  classMap: {
    "slds-utility-bar_container": true
  },
  attrs: {
    "aria-label": "Utility Bar"
  },
  key: 75
};
const stc31 = {
  classMap: {
    "slds-utility-bar": true,
    "utility-bar": true,
    "slds-var-p-around_xx-small": true
  },
  key: 76
};
const stc32 = {
  classMap: {
    "slds-utility-bar__item": true,
    "slds-var-p-horizontal_xxx-small": true,
    "utility-bar-input": true
  },
  key: 77
};
const stc33 = {
  "type": "text",
  "maxlength": "4",
  "inputmode": "decimal"
};
const stc34 = {
  classMap: {
    "slds-utility-bar__item": true,
    "slds-var-p-horizontal_xxx-small": true,
    "utility-bar-input": true
  },
  key: 85
};
const stc35 = {
  "type": "text",
  "inputmode": "decimal"
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, gid: api_scoped_id, b: api_bind, ncls: api_normalize_class_name, fr: api_fragment, c: api_custom_element, h: api_element, k: api_key, i: api_iterator, f: api_flatten} = $api;
  const {_m0, _m1, _m2, _m3, _m4, _m5, _m6, _m7, _m8, _m9, _m10, _m11, _m12, _m13, _m14, _m15, _m16, _m17} = $ctx;
  return [api_static_fragment($fragment1, 1, [api_static_part(1, null, api_dynamic_text($cmp.reRenderVal))]), api_element("div", stc0, [api_element("div", stc1, [api_element("div", stc2, [api_element("div", stc3, [api_element("div", stc4, [api_static_fragment($fragment2, 8, [api_static_part(18, null, api_dynamic_text($cmp.fileMetadata.fileName)), api_static_part(31, {
    attrs: {
      "id": api_scoped_id("EkjCGIs38w")
    }
  }, null), api_static_part(53, {
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.openFilter))
    },
    attrs: {
      "aria-controls": api_scoped_id("filterPanel")
    }
  }, null), api_static_part(60, {
    attrs: {
      "id": api_scoped_id("QXuKFQV-L9")
    }
  }, null), api_static_part(71, {
    attrs: {
      "id": api_scoped_id("bgBHqCaUPy")
    }
  }, null), api_static_part(74, {
    attrs: {
      "id": api_scoped_id("MDNrlq4E6E")
    }
  }, null)]), api_element("div", stc5, [api_element("div", stc6, [api_element("div", stc7, [api_element("div", stc8, [api_element("div", stc9, [api_element("div", stc10, [api_element("div", stc11, [api_element("div", stc12, [api_element("div", stc13, [api_element("div", {
    classMap: stc14,
    style: $cmp.dynamicHeight,
    key: 18
  }, [api_element("div", {
    className: api_normalize_class_name($cmp.filterClass),
    key: 19
  }, [$cmp.ShowFilterSave ? api_fragment(20, [api_static_fragment($fragment3, 22, [api_static_part(1, {
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.cancelFilterEdit))
    }
  }, null), api_static_part(3, {
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.saveFilterEdit))
    }
  }, null)])], 0) : null, $cmp.isFilterPopOverShowing ? api_fragment(23, [api_element("section", stc15, [api_element("div", stc16, [api_custom_element("lightning-combobox", _lightningCombobox, {
    props: {
      "name": "Field",
      "label": "Field",
      "value": $cmp.fieldValue,
      "placeholder": "Select Field",
      "options": $cmp.fieldOptions
    },
    key: 26,
    on: {
      "change": _m3 || ($ctx._m3 = api_bind($cmp.handleFieldChange))
    }
  }), api_custom_element("lightning-combobox", _lightningCombobox, {
    props: {
      "name": "Operator",
      "label": "Operator",
      "value": $cmp.operatorValue,
      "placeholder": "Select Operator",
      "options": $cmp.operatorOptions
    },
    key: 27,
    on: {
      "change": _m4 || ($ctx._m4 = api_bind($cmp.handleOperatorChange))
    }
  }), $cmp.isFilterValuePicklist ? api_fragment(28, [api_custom_element("c-multi-select-combobox", _cMultiSelectCombobox, {
    props: {
      "label": "Value",
      "name": "Value",
      "options": $cmp.filterValueOptions
    },
    key: 29,
    on: {
      "close": _m5 || ($ctx._m5 = api_bind($cmp.handleFilterValueChange))
    }
  })], 0) : api_fragment(28, [api_custom_element("lightning-input", _lightningInput, {
    props: {
      "type": "text",
      "label": "Value",
      "minLength": "3",
      "value": $cmp.filterValue
    },
    key: 30,
    on: {
      "change": _m6 || ($ctx._m6 = api_bind($cmp.handleFilterTextChange))
    }
  })], 0), api_static_fragment($fragment4, 32, [api_static_part(1, {
    on: {
      "click": _m7 || ($ctx._m7 = api_bind($cmp.handlePopoverClose))
    }
  }, null)])])])], 0) : null, api_static_fragment($fragment5, 34, [api_static_part(4, {
    on: {
      "click": _m8 || ($ctx._m8 = api_bind($cmp.closeFilter))
    }
  }, null), api_static_part(6, {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#close")
    }
  }, null)]), api_element("div", stc17, [api_element("div", stc18, [api_static_fragment($fragment6, 38), $cmp.hasActiveFilters ? api_fragment(39, [api_static_fragment($fragment7, 41), api_element("ol", stc19, api_iterator($cmp.activeFilters, function (filter) {
    return api_element("li", {
      classMap: stc20,
      key: api_key(43, filter.id)
    }, [api_element("div", {
      className: api_normalize_class_name(filter.filterItemClass),
      key: 44
    }, [api_element("button", {
      classMap: stc21,
      attrs: {
        "data-id": filter.id
      },
      key: 45,
      on: {
        "click": _m9 || ($ctx._m9 = api_bind($cmp.onFilterElementClick))
      }
    }, [api_static_fragment($fragment8, 47, [api_static_part(1, null, api_dynamic_text(filter.field))]), filter.isPicklist ? api_fragment(48, [api_static_fragment($fragment9, 50, [api_static_part(1, null, api_dynamic_text(filter.operator) + " " + api_dynamic_text(filter.filterValues))])], 0) : api_fragment(48, [api_static_fragment($fragment10, 52, [api_static_part(1, null, api_dynamic_text(filter.operator) + " " + api_dynamic_text(filter.value))])], 0)]), api_static_fragment($fragment11, 54, [api_static_part(0, {
      on: {
        "click": _m11 || ($ctx._m11 = api_bind($cmp.removeFilter))
      },
      attrs: {
        "data-id": filter.id
      }
    }, null), api_static_part(2, {
      attrs: {
        "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#delete")
      }
    }, null)])])]);
  }))], 0) : null, api_static_fragment($fragment12, 56, [api_static_part(1, {
    on: {
      "click": _m12 || ($ctx._m12 = api_bind($cmp.addFilter))
    }
  }, null), api_static_part(3, {
    on: {
      "click": _m13 || ($ctx._m13 = api_bind($cmp.removeAllFilters))
    }
  }, null)])])])]), api_element("div", stc22, [api_element("div", stc23, [api_element("div", stc24, [api_element("div", stc25, [api_static_fragment($fragment13, 62), api_element("div", stc26, [api_static_fragment($fragment14, 65, [api_static_part(9, null, api_dynamic_text($cmp.fileMetadata.nofLines)), api_static_part(14, null, api_dynamic_text($cmp.fileMetadata.nofCodeUnits)), api_static_part(19, null, api_dynamic_text($cmp.fileMetadata.nofMethodUnits))]), api_element("table", stc27, [api_element("tbody", stc28, api_flatten([api_static_fragment($fragment15, 69), api_iterator($cmp.displayedData, function (lineObj) {
    return api_static_fragment($fragment16, api_key(71, lineObj.lineNumber), [api_static_part(3, null, api_dynamic_text(lineObj.lineNumber)), api_static_part(6, null, api_dynamic_text(lineObj.line))]);
  })]))])])])])])])])])])])])])])])])])]), api_static_fragment($fragment17, 73)])])])]), api_element("div", stc29, [api_element("footer", stc30, [api_element("ul", stc31, [api_element("li", stc32, [api_element("input", {
    className: api_normalize_class_name($cmp.linesPerPageClass),
    attrs: stc33,
    props: {
      "value": $cmp.linesPerPage
    },
    key: 78,
    on: {
      "input": _m14 || ($ctx._m14 = api_bind($cmp.onLinesPerPageChange))
    }
  })]), api_static_fragment($fragment18, 80), api_static_fragment($fragment19, 82, [api_static_part(2, {
    on: {
      "click": _m15 || ($ctx._m15 = api_bind($cmp.prevHandler))
    }
  }, null), api_static_part(4, {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#undo")
    }
  }, null), api_static_part(7, {
    on: {
      "click": _m16 || ($ctx._m16 = api_bind($cmp.nextHandler))
    }
  }, null), api_static_part(9, {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#redo")
    }
  }, null)]), api_static_fragment($fragment20, 84, [api_static_part(4, null, api_dynamic_text($cmp.noOfPages))]), api_element("li", stc34, [api_element("input", {
    className: api_normalize_class_name($cmp.pageNumberClass),
    attrs: stc35,
    props: {
      "value": $cmp.pageNumber
    },
    key: 86,
    on: {
      "input": _m17 || ($ctx._m17 = api_bind($cmp.onPageNumberChange))
    }
  })]), api_static_fragment($fragment21, 88)])])])];
  /*LWC compiler v7.1.3*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-1c8idvoj5el";
tmpl.legacyStylesheetToken = "c-logPreviewer_logPreviewer";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
