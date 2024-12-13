import { LightningElement, wire } from "lwc";
import {
  subscribe,
  MessageContext,
  APPLICATION_SCOPE
} from "lightning/messageService";
import STATE from "@salesforce/messageChannel/App_Service__c";

export default class AppContent extends LightningElement {
  @wire(MessageContext)
  messageContext;
  activeApp = "Home";
  activeAppSub = null;
  connectedCallback() {
    if (!this.activeAppSub) {
      this.subscribeToMessageChannel();
    }
  }

  subscribeToMessageChannel() {
    if (!this.activeAppSub) {
      this.activeAppSub = subscribe(
        this.messageContext,
        STATE,
        (message) => {
          this.setActiveApp(message);
        },
        { scope: APPLICATION_SCOPE }
      );
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
}
