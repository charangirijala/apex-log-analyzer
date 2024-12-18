import _implicitStylesheets from "./logAnalysis.css";
import _implicitScopedStylesheets from "./logAnalysis.scoped.css?scoped=true";
import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import _lightningIcon from "lightning/icon";
import _lightningButtonIcon from "lightning/buttonIcon";
import _lightningHelptext from "lightning/helptext";
import {freezeTemplate, parseFragment, registerTemplate, sanitizeAttribute} from "lwc";
const $fragment1 = parseFragment`<div data-data-rendering-service-uid="8090" data-aura-rendered-by="30141:0"${3}><div class="highlights-icon-container slds-avatar slds-m-right_small icon${0}" style="background-color: #3ba755"${2}><img alt="" src="https://forcedebug-dev-ed.trailblaze.my.salesforce.com/img/icon/t4v35/standard/task_120.png"${3}></div></div>`;
const $fragment2 = parseFragment`<div class="slds-page-header__name-title${0}" data-aura-rendered-by="55:33168;a"${2}><h1 class="slds-scrollable_none${0}" data-aura-rendered-by="56:33168;a"${2}><span aria-hidden="true" class="slds-assistive-text${0}" data-aura-rendered-by="57:33168;a"${2}>Tasks</span><span class="triggerLinkText selectedListView slds-page-header__title slds-truncate slds-p-right--xx-small lst-temp-slds-lineHeight uiOutputText${0}" data-aura-rendered-by="61:33168;a" data-aura-class="uiOutputText"${2}>Recently Viewed</span></h1></div>`;
const $fragment3 = parseFragment`<svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon-text-default slds-icon_xx-small${0}"${2}><g lwc-6qul4k2dv7m=""${3}><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""${3}/></g></svg>`;
const $fragment4 = parseFragment`<span class="slds-assistive-text${0}" lwc-4897l11qtae=""${2}>Select a List View: Tasks</span>`;
const $fragment5 = parseFragment`<svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_xx-small${0}"${2}><g lwc-6qul4k2dv7m=""${3}><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""${3}/></g></svg>`;
const $fragment6 = parseFragment`<span class="slds-assistive-text${0}" lwc-4897l11qtae=""${2}>Show more actions</span>`;
const $fragment7 = parseFragment`<div class="branding-actions actionMenu popupTargetContainer uiPopupTarget uiMenuList forceActionsDropDownMenuList uiMenuList--left uiMenuList--default${0}" data-aura-rendered-by="37706:0" data-aura-class="uiPopupTarget uiMenuList forceActionsDropDownMenuList uiMenuList--left uiMenuList--default"${"a0:aria-labelledby"}${2}><div role="menu" class="branding-actions actionMenu${0}" data-aura-rendered-by="37700:0"${2}><ul role="presentation" class="scrollable${0}" data-aura-rendered-by="37702:0"${2}></ul></div></div>`;
const $fragment8 = parseFragment`<div class="slds-grid slds-wrap${0}"${2}><div class="slds-col slds-align-bottom${0}"${2}><p class="slds-text-body_small slds-text-body--small${0}" data-aura-rendered-by="84:33168;a"${2}><span${3}><span aria-live="polite" role="status" class="countSortedByFilteredBy${0}" aria-label="Recently Viewed"${2}>1 item • </span><span${3}>Updated an hour ago</span></span></p></div><div class="slds-col slds-no-flex slds-grid slds-align-bottom${0}"${2}><div${3}><button class="slds-button slds-button_icon slds-button_icon-border${0}" title="Previous Page" tabindex="0"${2}><svg class="slds-button__icon${0}" aria-hidden="true"${2}><use${"a12:xlink:href"}${3}/></svg><span class="slds-assistive-text${0}"${2}>Previous Page</span></button><button class="slds-button slds-button_icon slds-button_icon-border${0}" title="Next Page"${2}><svg class="slds-button__icon${0}" aria-hidden="true"${2}><use${"a17:xlink:href"}${3}/></svg><span class="slds-assistive-text${0}"${2}>Next Page</span></button></div></div><div class="slds-col slds-var-p-top_small${0}"${2}><div${3}><div class="slds-col slds-size_1-of-1${0}"${2}><div class="slds-form-element${0}"${2}><div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left-right${0}"${2}><svg class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default${0}" aria-hidden="true"${2}><use${"a26:xlink:href"}${3}/></svg><input type="text" placeholder="Placeholder text…" class="slds-input${0}"${2}><button class="slds-button slds-button_icon slds-input__icon slds-input__icon_right${0}" title="Clear"${2}><svg class="slds-button__icon slds-icon-text-light${0}" aria-hidden="true"${2}><use${"a30:xlink:href"}${3}/></svg><span class="slds-assistive-text${0}"${2}>Clear</span></button></div></div></div></div></div></div>`;
const $fragment9 = parseFragment`<div class="slds-spinner_container slds-grid slds-hide${0}" data-aura-rendered-by="128:611;a"${2}><div class="slds-align_absolute-center slds-align--absolute-center slds-p-top_large slds-p-top--large${0}" data-aura-rendered-by="129:611;a"${2}><div role="status" class="slds-spinner slds-spinner_medium slds-spinner--medium slds-spinner_brand slds-spinner--brand${0}" data-aura-rendered-by="130:611;a"${2}><span class="slds-assistive-text${0}" data-aura-rendered-by="131:611;a"${2}>Loading...</span><div class="slds-spinner__dot-a${0}" data-aura-rendered-by="133:611;a"${2}></div><div class="slds-spinner__dot-b${0}" data-aura-rendered-by="134:611;a"${2}></div></div><div aria-live="assertive" data-aura-rendered-by="135:611;a"${3}><div class="test-loadingDelay slds-grid slds-grid_vertical slds-grid--vertical slds-p-top_xx-large slds-p-top--xx-large slds-hide${0}" data-aura-rendered-by="136:611;a"${2}><div class="slds-text-heading_medium slds-text-heading--medium slds-p-top_xx-large slds-p-top--xx-large slds-text-align_center slds-text-align--center long-loading-1${0}" data-aura-rendered-by="137:611;a"${2}>Loading...</div><div aria-live="polite" data-aura-rendered-by="140:611;a"${3}>Hang tight or select a different list view.</div></div></div></div></div>`;
const $fragment10 = parseFragment`<div class="slds-var-p-left_large checkbox-container slds-checkbox uiInput forceVirtualCheckbox uiInput--default forceSplitViewCheckbox${0}" data-aura-rendered-by="11:733;a" data-aura-class="uiInput forceVirtualCheckbox uiInput--default forceSplitViewCheckbox"${2}><input tabindex="0"${"a1:id"} type="checkbox" class="keyboardMode--trigger${0}" aria-label="Select All" data-aura-rendered-by="12:733;a" data-interactive-lib-uid="2"${2}><span class="slds-checkbox--faux slds-checkbox_faux${0}" data-aura-rendered-by="13:733;a"${2}></span></div>`;
const $fragment11 = parseFragment`<span class="slds-assistive-text${0}" data-aura-rendered-by="157:611;a"${2}>Sorted by:</span>`;
const $fragment12 = parseFragment`<span title="Recently Viewed" class="slds-var-p-left_large test-title slds-p-right--x-small${0}" data-aura-rendered-by="159:611;a"${2}>Recently Viewed</span>`;
const $fragment13 = parseFragment`<svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-5rerfgpjhrd="" data-key="arrowdown" class="slds-icon slds-icon-text-default slds-icon_xx-small${0}"${2}><g lwc-5rerfgpjhrd=""${3}><path d="M96 310c-8 8-8 19 0 27l150 147c8 8 20 8 28 0l151-147c8-8 8-19 0-27l-28-27a20 20 0 00-28 0l-47 46c-8 8-22 3-22-9V50c0-10-9-20-20-20h-40c-11 0-20 11-20 20v270c0 12-14 17-22 9l-47-46a20 20 0 00-28 0z" lwc-5rerfgpjhrd=""${3}/></g></svg>`;
const $fragment14 = parseFragment`<span class="slds-assistive-text${0}" lwc-4897l11qtae=""${2}>Descending</span>`;
const $fragment15 = parseFragment`<svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-gj6nt2jq8l="" data-key="info" class="slds-button__icon${0}"${2}><g lwc-gj6nt2jq8l=""${3}><path d="M260 20a240 240 0 100 480 240 240 0 100-480zm0 121c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30zm50 210c0 5-4 9-10 9h-80c-5 0-10-3-10-9v-20c0-5 4-11 10-11 5 0 10-3 10-9v-40c0-5-4-11-10-11-5 0-10-3-10-9v-20c0-5 4-11 10-11h60c5 0 10 5 10 11v80c0 5 4 9 10 9 5 0 10 5 10 11z" lwc-gj6nt2jq8l=""${3}/></g></svg>`;
const $fragment16 = parseFragment`<span class="slds-assistive-text${0}" lwc-485vfn4rmof=""${2}>Help</span>`;
const $fragment17 = parseFragment`<div role="GridCell" class="slds-align_absolute-center slds-var-m-vertical_x-small slds-var-m-left_small${0}" data-aura-rendered-by="760:0"${2}><div class="slds-var-p-around_small checkbox-container slds-checkbox uiInput forceVirtualCheckbox uiInput--default forceSplitViewCheckbox${0}" data-aura-rendered-by="767:0" data-aura-class="uiInput forceVirtualCheckbox uiInput--default forceSplitViewCheckbox"${2}><input tabindex="-1"${"a2:id"} type="checkbox" class="keyboardMode--trigger${0}" data-aura-rendered-by="768:0" data-interactive-lib-uid="3" aria-label="Select item Email"${2}><span class="slds-checkbox--faux slds-checkbox_faux${0}" data-aura-rendered-by="769:0"${2}></span></div></div>`;
const $fragment18 = parseFragment`<div class="slds-grid slds-wrap${0}" data-aura-rendered-by="775:0"${2}><span class="slds-grow slds-text-body--regular slds-text-color--default fade slds-is-relative slds-scrollable_none test-splitViewCardData${0}" data-aura-rendered-by="776:0"${2}><span data-aura-rendered-by="722:0" class="uiOutputText${0}" data-aura-class="uiOutputText"${2}>Email</span></span><span class="slds-truncate slds-col--bump-left test-splitViewCardData${0}" data-aura-rendered-by="778:0"${2}><span data-aura-rendered-by="728:0" class="uiOutputText${0}" data-aura-class="uiOutputText"${2}>Jack Rogers</span></span></div>`;
const $fragment19 = parseFragment`<span class="slds-truncate test-splitViewCardData${0}" data-aura-rendered-by="781:0"${2}><span data-aura-rendered-by="734:0" class="uiOutputText${0}" data-aura-class="uiOutputText"${2}>00001019</span></span>`;
const $fragment20 = parseFragment`<span data-aura-rendered-by="743:0" class="uiOutputDate${0}" data-aura-class="uiOutputDate"${2}></span>`;
const $fragment21 = parseFragment`<svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-gj6nt2jq8l="" data-key="info" class="slds-icon slds-icon-text-default slds-icon_xx-small${0}"${2}><g lwc-gj6nt2jq8l=""${3}><path d="M260 20a240 240 0 100 480 240 240 0 100-480zm0 121c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30zm50 210c0 5-4 9-10 9h-80c-5 0-10-3-10-9v-20c0-5 4-11 10-11 5 0 10-3 10-9v-40c0-5-4-11-10-11-5 0-10-3-10-9v-20c0-5 4-11 10-11h60c5 0 10 5 10 11v80c0 5 4 9 10 9 5 0 10 5 10 11z" lwc-gj6nt2jq8l=""${3}/></g></svg>`;
const $fragment22 = parseFragment`<span class="slds-assistive-text${0}" lwc-4897l11qtae=""${2}>Overdue Task</span>`;
const $fragment23 = parseFragment`<div class="emptyContent hidden${0}" data-aura-rendered-by="173:611;a"${2}><div class="emptyContentInner slds-text-align--center${0}" data-aura-rendered-by="174:611;a"${2}></div></div>`;
const $fragment24 = parseFragment`<div class="slds-grid slds-no-flex slds-hide forceListViewManagerSecondaryDisplayManager${0}" data-aura-rendered-by="178:611;a" data-aura-class="forceListViewManagerSecondaryDisplayManager"${2}></div>`;
const stc0 = {
  classMap: {
    "fullheight": true,
    "center": true,
    "oneCenterStage": true,
    "slds-is-absolute": true
  },
  key: 0
};
const stc1 = {
  classMap: {
    "slds-brand-band": true,
    "slds-brand-band_cover": true,
    "slds-brand-band_medium": true,
    "slds-template_bottom-magnet": true
  },
  key: 1
};
const stc2 = {
  classMap: {
    "centerRegion": true
  },
  key: 2
};
const stc3 = {
  classMap: {
    "leftRegion": true
  },
  key: 3
};
const stc4 = {
  classMap: {
    "slds-split-view": true,
    "slds-card": true,
    "slds-card_boundary": true,
    "slds-grid": true,
    "slds-grid_vertical": true,
    "slds-grid_vertical": true
  },
  key: 4
};
const stc5 = {
  classMap: {
    "slds-split-view__header": true,
    "slds-shrink-none": true,
    "test-headerRegion": true,
    "forceListViewManagerHeader": true
  },
  attrs: {
    "data-aura-rendered-by": "36:33168;a",
    "data-aura-class": "forceListViewManagerHeader"
  },
  key: 5
};
const stc6 = {
  classMap: {
    "slds-grid": true
  },
  attrs: {
    "data-aura-rendered-by": "37:33168;a"
  },
  key: 6
};
const stc7 = {
  classMap: {
    "slds-col": true,
    "slds-has-flexi-truncate": true,
    "firstHeaderRow": true
  },
  attrs: {
    "data-aura-rendered-by": "38:33168;a"
  },
  key: 7
};
const stc8 = {
  classMap: {
    "slds-media": true,
    "slds-no-space": true,
    "slds-grow": true
  },
  attrs: {
    "data-aura-rendered-by": "40:33168;a"
  },
  key: 8
};
const stc9 = {
  classMap: {
    "slds-media__body": true,
    "slds-align-middle": true
  },
  attrs: {
    "data-aura-rendered-by": "43:33168;a"
  },
  key: 11
};
const stc10 = {
  classMap: {
    "slds-grid": true,
    "slds-media__body": true
  },
  attrs: {
    "data-aura-rendered-by": "48:33168;a"
  },
  key: 12
};
const stc11 = {
  classMap: {
    "slds-truncate": true
  },
  attrs: {
    "data-target-selection-name": "50e27b43761f49d99bf31a503ed4e21a",
    "data-aura-rendered-by": "49:33168;a"
  },
  key: 13
};
const stc12 = {
  "triggerLink": true,
  "slds-type-focus": true,
  "slds-truncate": true,
  "slds-page-header__title": true,
  "slds-text-color_default": true,
  "slds-text-color--default": true,
  "forceListViewPicker": true
};
const stc13 = {
  classMap: {
    "triggerLinkTextAndIconWrapper": true,
    "slds-page-header__name": true
  },
  attrs: {
    "data-aura-rendered-by": "54:33168;a"
  },
  key: 15
};
const stc14 = {
  classMap: {
    "slds-page-header__name-switcher": true
  },
  key: 18
};
const stc15 = {
  classMap: {
    "slds-dropdown-trigger": true,
    "slds-dropdown-trigger_click": true,
    "lst-temp-slds-lineHeight": true
  },
  key: 19
};
const stc16 = {
  classMap: {
    "slds-button": true,
    "slds-button_reset": true,
    "slds-button--reset": true,
    "slds-button_icon": true,
    "slds-button_icon-small": true,
    "slds-button_icon-container": true,
    "downIcon": true,
    "slds-m-bottom_xx-small": true
  },
  attrs: {
    "role": "button",
    "aria-expanded": "false",
    "title": "Select a List View: Tasks"
  },
  key: 20
};
const stc17 = {
  classMap: {
    "slds-icon-utility-down": true,
    "slds-icon_container": true
  },
  props: {
    "iconName": "utility:down"
  },
  key: 21
};
const stc18 = {
  styleDecls: [["--sds-c-icon-color-background", "var(", false]],
  attrs: {
    "part": "boundary"
  },
  key: 22
};
const stc19 = {
  attrs: {
    "exportparts": "icon"
  },
  props: {
    "size": "xx-small"
  },
  key: 23
};
const stc20 = {
  classMap: {
    "slds-col": true,
    "slds-no-flex": true,
    "slds-grid": true,
    "slds-align-top": true,
    "slds-p-bottom--xx-small": true,
    "test-lvmForceActionsContainer": true
  },
  attrs: {
    "data-aura-rendered-by": "73:33168;a"
  },
  key: 28
};
const stc21 = {
  classMap: {
    "oneActionsRibbon": true,
    "forceActionsContainer": true
  },
  attrs: {
    "data-aura-rendered-by": "37650:0",
    "data-aura-class": "oneActionsRibbon forceActionsContainer"
  },
  key: 29
};
const stc22 = {
  classMap: {
    "oneActionsDropDown": true
  },
  attrs: {
    "data-target-reveals": "sfdc:StandardButton.Task.NewTask,sfdc:StandardButton.Task.MassAssignRecordLabel",
    "data-aura-rendered-by": "37676:0",
    "data-aura-class": "oneActionsDropDown"
  },
  key: 30
};
const stc23 = {
  classMap: {
    "uiMenu": true
  },
  attrs: {
    "data-aura-rendered-by": "37711:0",
    "data-aura-class": "uiMenu"
  },
  key: 31
};
const stc24 = {
  "uiPopupTrigger": true
};
const stc25 = {
  attrs: {
    "data-aura-rendered-by": "37691:0"
  },
  key: 33
};
const stc26 = {
  attrs: {
    "data-aura-rendered-by": "37684:0"
  },
  key: 34
};
const stc27 = {
  "slds-button": true,
  "slds-button--icon-x-small": true,
  "slds-button--icon-border-filled": true
};
const stc28 = {
  classMap: {
    "slds-icon-utility-down": true,
    "slds-button__icon": true,
    "slds-icon_container": true,
    "forceIcon": true
  },
  attrs: {
    "data-data-rendering-service-uid": "9071",
    "data-aura-rendered-by": "37682:0",
    "data-aura-class": "forceIcon"
  },
  props: {
    "iconName": "utility:down",
    "lwc4897l11qtaeHost": ""
  },
  key: 36
};
const stc29 = {
  styleDecls: [["--sds-c-icon-color-background", "var(", false]],
  attrs: {
    "lwc-4897l11qtae": "",
    "part": "boundary"
  },
  key: 37
};
const stc30 = {
  attrs: {
    "exportparts": "icon"
  },
  props: {
    "lwc4897l11qtae": "",
    "size": "xx-small",
    "variant": "inverse",
    "lwc6qul4k2dv7mHost": ""
  },
  key: 38
};
const stc31 = {
  classMap: {
    "slds-grid": true,
    "listDisplays": true,
    "safari-workaround-anchor": true
  },
  attrs: {
    "data-aura-rendered-by": "123:611;a"
  },
  key: 47
};
const stc32 = {
  classMap: {
    "slds-grid": true,
    "listViewContainer": true,
    "safari-workaround": true
  },
  attrs: {
    "data-aura-rendered-by": "124:611;a"
  },
  key: 48
};
const stc33 = {
  classMap: {
    "slds-col": true,
    "slds-no-space": true,
    "forceListViewManagerPrimaryDisplayManager": true
  },
  attrs: {
    "data-aura-rendered-by": "127:611;a",
    "data-aura-class": "forceListViewManagerPrimaryDisplayManager"
  },
  key: 49
};
const stc34 = {
  classMap: {
    "slds-grid": true,
    "slds-grid--vertical": true,
    "forceListViewManagerSplitViewList": true
  },
  attrs: {
    "data-aura-rendered-by": "154:611;a",
    "data-aura-class": "forceListViewManagerSplitViewList"
  },
  key: 52
};
const stc35 = {
  classMap: {
    "slds-split-view__list-header": true,
    "slds-p-left_none": true,
    "test-header": true
  },
  attrs: {
    "data-aura-rendered-by": "155:611;a"
  },
  key: 53
};
const stc36 = {
  classMap: {
    "slds-icon_container": true,
    "slds-icon-utility-arrowdown": true,
    "test-descending": true
  },
  attrs: {
    "data-data-rendering-service-uid": "242",
    "data-aura-rendered-by": "162:611;a"
  },
  props: {
    "lwc4897l11qtaeHost": "",
    "iconName": "utility:arrowdown"
  },
  key: 60
};
const stc37 = {
  attrs: {
    "lwc-4897l11qtae": "",
    "part": "boundary"
  },
  key: 61
};
const stc38 = {
  attrs: {
    "exportparts": "icon"
  },
  props: {
    "lwc4897l11qtae": "",
    "size": "xx-small",
    "variant": "",
    "lwc5rerfgpjhrdHost": ""
  },
  key: 62
};
const stc39 = {
  classMap: {
    "slds-float_right": true
  },
  attrs: {
    "data-data-rendering-service-uid": "256",
    "data-aura-rendered-by": "17:733;a"
  },
  props: {
    "lwc287jov2qsebHost": ""
  },
  key: 67
};
const stc40 = {
  classMap: {
    "slds-form-element__icon": true
  },
  attrs: {
    "lwc-287jov2qseb": "",
    "part": "help-text"
  },
  key: 68
};
const stc41 = {
  props: {
    "lwc287jov2qseb": "",
    "variant": "bare",
    "lwc485vfn4rmofHost": ""
  },
  key: 69
};
const stc42 = {
  "slds-button": true,
  "slds-button_icon": true,
  "slds-button_icon-bare": true
};
const stc43 = {
  attrs: {
    "exportparts": "icon"
  },
  props: {
    "lwc485vfn4rmof": "",
    "variant": "bare",
    "lwcGj6nt2jq8lHost": ""
  },
  key: 71
};
const stc44 = {
  classMap: {
    "slds-grid": true,
    "safari-workaround-anchor": true,
    "forceVirtualRecordList": true
  },
  attrs: {
    "data-aura-rendered-by": "170:611;a",
    "data-aura-class": "forceVirtualRecordList"
  },
  key: 76
};
const stc45 = {
  classMap: {
    "safari-workaround": true
  },
  attrs: {
    "data-aura-rendered-by": "171:611;a"
  },
  key: 77
};
const stc46 = {
  styleDecls: [],
  classMap: {
    "scroller": true,
    "uiScroller": true,
    "scroller-wrapper": true,
    "scroll-bidirectional": true,
    "native": true
  },
  attrs: {
    "tabindex": "-1",
    "data-aura-rendered-by": "790:0",
    "data-aura-class": "uiScroller"
  },
  key: 78
};
const stc47 = {
  classMap: {
    "scroller": true
  },
  attrs: {
    "data-aura-rendered-by": "791:0"
  },
  key: 79
};
const stc48 = {
  classMap: {
    "slds-scrollable--y": true
  },
  attrs: {
    "role": "grid",
    "aria-label": "Select an item from this list to open it.",
    "data-aura-rendered-by": "689:0"
  },
  key: 80
};
const stc49 = {
  classMap: {
    "forceRecordLayout": true
  },
  attrs: {
    "data-aura-rendered-by": "754:0",
    "data-aura-class": "forceRecordLayout"
  },
  key: 81
};
const stc50 = {
  classMap: {
    "slds-split-view__list-item": true,
    "forceSplitViewListSelectableRecord": true
  },
  attrs: {
    "role": "row",
    "tabindex": "-1",
    "data-aura-rendered-by": "759:0",
    "data-aura-class": "forceSplitViewListSelectableRecord"
  },
  key: 82
};
const stc51 = {
  classMap: {
    "slds-grid": true,
    "slds-grow": true
  },
  attrs: {
    "role": "GridCell",
    "data-aura-rendered-by": "773:0"
  },
  key: 85
};
const stc52 = {
  classMap: {
    "slds-split-view__list-item-action": true,
    "slds-grow": true,
    "slds-has-flexi-truncate": true,
    "splitViewListRecordLink-00TdM000001lHfxUAE-757:0": true
  },
  attrs: {
    "tabindex": "0",
    "href": "/lightning/r/00TdM000001lHfxUAE/view",
    "data-aura-rendered-by": "774:0",
    "data-recordid": "00TdM000001lHfxUAE"
  },
  key: 86
};
const stc53 = {
  classMap: {
    "slds-grid": true,
    "slds-wrap": true
  },
  attrs: {
    "data-aura-rendered-by": "780:0"
  },
  key: 89
};
const stc54 = {
  classMap: {
    "slds-truncate": true,
    "slds-col--bump-left": true,
    "test-splitViewCardData": true
  },
  attrs: {
    "data-aura-rendered-by": "783:0"
  },
  key: 92
};
const stc55 = {
  classMap: {
    "runtime_sales_activitiesTaskDateOverride": true
  },
  attrs: {
    "data-aura-rendered-by": "740:0",
    "data-aura-class": "runtime_sales_activitiesTaskDateOverride"
  },
  key: 93
};
const stc56 = {
  classMap: {
    "slds-icon-utility-info": true,
    "slds-m-left_xx-small": true,
    "slds-text-link_reset": true,
    "slds-icon_container": true
  },
  attrs: {
    "data-aura-rendered-by": "744:0"
  },
  props: {
    "iconName": "utility:info",
    "title": "Overdue Task",
    "lwc4897l11qtaeHost": ""
  },
  key: 96
};
const stc57 = {
  styleDecls: [["--sds-c-icon-color-background", "var(", false]],
  attrs: {
    "lwc-4897l11qtae": "",
    "part": "boundary"
  },
  key: 97
};
const stc58 = {
  attrs: {
    "exportparts": "icon"
  },
  props: {
    "lwc4897l11qtae": "",
    "size": "xx-small",
    "variant": "",
    "lwcGj6nt2jq8lHost": ""
  },
  key: 98
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {st: api_static_fragment, gid: api_scoped_id, c: api_custom_element, h: api_element, sp: api_static_part} = $api;
  return [api_element("div", stc0, [api_element("div", stc1, [api_element("div", stc2, [api_element("div", stc3, [api_element("div", stc4, [api_element("div", stc5, [api_element("div", stc6, [api_element("div", stc7, [api_element("div", stc8, [api_static_fragment($fragment1, 10), api_element("div", stc9, [api_element("div", stc10, [api_element("div", stc11, [api_element("div", {
    classMap: stc12,
    attrs: {
      "data-aura-rendered-by": "53:33168;a",
      "data-aura-class": "forceListViewPicker",
      "data-proxy-id": "aura-pos-lib-9",
      "id": api_scoped_id("53:33168;a")
    },
    key: 14
  }, [api_element("div", stc13, [api_static_fragment($fragment2, 17), api_element("div", stc14, [api_element("div", stc15, [api_element("button", stc16, [api_custom_element("lightning-icon", _lightningIcon, stc17, [api_element("span", stc18, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, stc19, [api_static_fragment($fragment3, 25)]), api_static_fragment($fragment4, 27)])])])])])])])])])])])]), api_element("div", stc20, [api_element("ul", stc21, [api_element("li", stc22, [api_element("div", stc23, [api_element("div", {
    classMap: stc24,
    attrs: {
      "id": api_scoped_id("37678:0"),
      "data-aura-rendered-by": "37689:0",
      "data-aura-class": "uiPopupTrigger",
      "data-interactive-uid": "82"
    },
    key: 32
  }, [api_element("div", stc25, [api_element("div", stc26, [api_element("a", {
    classMap: stc27,
    attrs: {
      "aria-disabled": "false",
      "role": "button",
      "aria-describedby": api_scoped_id(""),
      "tabindex": "0",
      "aria-expanded": "false",
      "aria-haspopup": "true",
      "title": "Show 2 more actions",
      "data-aura-rendered-by": "37685:0",
      "href": "javascript:void(0);"
    },
    key: 35
  }, [api_custom_element("lightning-icon", _lightningIcon, stc28, [api_element("span", stc29, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, stc30, [api_static_fragment($fragment5, 40)]), api_static_fragment($fragment6, 42)])])])])])]), api_static_fragment($fragment7, 44, [api_static_part(0, {
    attrs: {
      "aria-labelledby": api_scoped_id("37678:0")
    }
  }, null)])])])])])]), api_static_fragment($fragment8, 46, [api_static_part(12, {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#undo")
    }
  }, null), api_static_part(17, {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#redo")
    }
  }, null), api_static_part(26, {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#search")
    }
  }, null), api_static_part(30, {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", "/assets/icons/utility-sprite/svg/symbols.svg#clear")
    }
  }, null)])]), api_element("div", stc31, [api_element("div", stc32, [api_element("div", stc33, [api_static_fragment($fragment9, 51), api_element("div", stc34, [api_element("div", stc35, [api_static_fragment($fragment10, 55, [api_static_part(1, {
    attrs: {
      "id": api_scoped_id("7:733;a__all")
    }
  }, null)]), api_static_fragment($fragment11, 57), api_static_fragment($fragment12, 59), api_custom_element("lightning-icon", _lightningIcon, stc36, [api_element("span", stc37, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, stc38, [api_static_fragment($fragment13, 64)]), api_static_fragment($fragment14, 66)])]), api_custom_element("lightning-helptext", _lightningHelptext, stc39, [api_element("div", stc40, [api_custom_element("lightning-button-icon", _lightningButtonIcon, stc41, [api_element("button", {
    classMap: stc42,
    attrs: {
      "lwc-485vfn4rmof": "",
      "type": "button",
      "part": "button button-icon",
      "aria-describedby": api_scoped_id("salesforce-lightning-tooltip-bubble_e7514755-82ba-91d7-9121-9a682ee37096")
    },
    key: 70
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, stc43, [api_static_fragment($fragment15, 73)]), api_static_fragment($fragment16, 75)])])])])]), api_element("div", stc44, [api_element("div", stc45, [api_element("div", stc46, [api_element("div", stc47, [api_element("ul", stc48, [api_element("div", stc49, [api_element("li", stc50, [api_static_fragment($fragment17, 84, [api_static_part(2, {
    attrs: {
      "id": api_scoped_id("763:0__00TdM000001lHfxUAE")
    }
  }, null)]), api_element("div", stc51, [api_element("a", stc52, [api_static_fragment($fragment18, 88), api_element("div", stc53, [api_static_fragment($fragment19, 91), api_element("span", stc54, [api_element("div", stc55, [api_static_fragment($fragment20, 95), api_custom_element("lightning-icon", _lightningIcon, stc56, [api_element("span", stc57, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, stc58, [api_static_fragment($fragment21, 100)]), api_static_fragment($fragment22, 102)])])])])])])])])])])])])]), api_static_fragment($fragment23, 104)])])]), api_static_fragment($fragment24, 106)])])])])])])])];
  /*LWC compiler v7.1.3*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lwc-7l1pf211die";
tmpl.legacyStylesheetToken = "c-logAnalysis_logAnalysis";
if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
freezeTemplate(tmpl);
