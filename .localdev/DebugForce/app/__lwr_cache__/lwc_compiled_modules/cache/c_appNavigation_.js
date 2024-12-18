import { registerDecorators as _registerDecorators, LightningElement, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./appNavigation.html";
import { publish, MessageContext } from "lightning/messageService";
import STATE from "@salesforce/messageChannel/App_Service__c";
class AppNavigation extends LightningElement {
  constructor(...args) {
    super(...args);
    this.activeApp = "Home";
    this.messageContext = void 0;
    this.classCombinationActive = "navItem slds-context-bar__item slds-shrink-none slds-is-active";
    this.classCombinationInactive = "navItem slds-context-bar__item slds-shrink-none";
    this.navItems = [{
      label: "Home",
      classCombination: "navItem slds-context-bar__item slds-shrink-none slds-is-active"
    }, {
      label: "Raw Log Viewer",
      classCombination: "navItem slds-context-bar__item slds-shrink-none"
    }, {
      label: "Log Analysis",
      classCombination: "navItem slds-context-bar__item slds-shrink-none"
    }, {
      label: "Detailed Log Viewer",
      classCombination: "navItem slds-context-bar__item slds-shrink-none"
    }];
  }
  connectedCallback() {
    const payload = {
      activeApp: this.activeApp
    };
    publish(this.messageContext, STATE, payload);
  }
  handleNavigationItemClick(event) {
    event.preventDefault();
    // console.log(event.currentTarget.dataset.navitem);
    const selectedIdx = event.currentTarget.dataset.navitem;
    for (let i = 0; i < this.navItems.length; i++) {
      if (i === parseInt(selectedIdx, 10)) {
        const payload = {
          activeApp: this.navItems[i].label
        };
        publish(this.messageContext, STATE, payload);
        this.navItems[i].classCombination = this.classCombinationActive;
      } else {
        this.navItems[i].classCombination = this.classCombinationInactive;
      }
    }
    // console.log(JSON.stringify(this.navItems));
  }
  /*LWC compiler v7.1.3*/
}
_registerDecorators(AppNavigation, {
  track: {
    navItems: 1
  },
  wire: {
    messageContext: {
      adapter: MessageContext,
      config: function ($cmp) {
        return {};
      }
    }
  },
  fields: ["activeApp", "classCombinationActive", "classCombinationInactive"]
});
const __lwc_component_class_internal = _registerComponent(AppNavigation, {
  tmpl: _tmpl,
  sel: "c-app-navigation",
  apiVersion: 62
});
export default __lwc_component_class_internal;