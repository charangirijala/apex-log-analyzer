import { registerDecorators as _registerDecorators, LightningElement, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./appContent.html";
import { subscribe, MessageContext, APPLICATION_SCOPE } from "lightning/messageService";
import STATE from "@salesforce/messageChannel/App_Service__c";
class AppContent extends LightningElement {
  constructor(...args) {
    super(...args);
    this.messageContext = void 0;
    this.activeApp = "Home";
    this.activeAppSub = null;
  }
  connectedCallback() {
    if (!this.activeAppSub) {
      this.subscribeToMessageChannel();
    }
  }
  subscribeToMessageChannel() {
    if (!this.activeAppSub) {
      this.activeAppSub = subscribe(this.messageContext, STATE, message => {
        this.setActiveApp(message);
      }, {
        scope: APPLICATION_SCOPE
      });
    }
  }
  setActiveApp(message) {
    this.activeApp = message.activeApp;
  }
  get isHome() {
    return this.activeApp === "Home" ? "" : "slds-hide";
  }
  get isRawLogViewer() {
    return this.activeApp === "Raw Log Viewer" ? "" : "slds-hide";
  }
  get isLogAnalysis() {
    return this.activeApp === "Log Analysis" ? "" : "slds-hide";
  }
  get isDetailLogViewer() {
    return this.activeApp === "Detailed Log Viewer" ? "" : "slds-hide";
  }
  /*LWC compiler v7.1.3*/
}
_registerDecorators(AppContent, {
  wire: {
    messageContext: {
      adapter: MessageContext,
      config: function ($cmp) {
        return {};
      }
    }
  },
  fields: ["activeApp", "activeAppSub"]
});
const __lwc_component_class_internal = _registerComponent(AppContent, {
  tmpl: _tmpl,
  sel: "c-app-content",
  apiVersion: 62
});
export default __lwc_component_class_internal;