import { LightningElement, track, wire } from "lwc";
import {
  subscribe,
  publish,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import LOG_ANALYSIS_STATE from "@salesforce/messageChannel/Log_Analysis_Viewer_State__c";

export default class Splitscreen extends LightningElement {
  closeLog;
  msgChannelSub = null;
  fullScreen;
  @track leftWidth = 50;
  isResizing = false;
  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    if (!this.msgChannelSub) {
      this.subscribeToMessageChannel();
    }
  }
  renderedCallback() {
    if (this.fullScreen === false && !this.isResizing) {
      this.leftWidth = 50;
    }
  }
  subscribeToMessageChannel() {
    if (!this.msgChannelSub) {
      this.msgChannelSub = subscribe(
        this.messageContext,
        LOG_ANALYSIS_STATE,
        (message) => {
          this.setVars(message);
        },
        { scope: APPLICATION_SCOPE }
      );
    }
  }
  setVars(message) {
    if (message.closeLog !== null) {
      this.closeLog = message.closeLog;
    }
    if (message.fullScreen !== null) {
      this.fullScreen = message.fullScreen;
    }
  }
  //changes for close and fullscreen buttons
  get leftSectionStyle() {
    if (this.closeLog) {
      // console.log("LeftWidth: 100%");
      this.leftWidth = 100;
      return "width: 100%;";
    } else if (!this.fullScreen) {
      // console.log("LeftWidth: ", this.leftWidth);
      return `width: ${this.leftWidth}%;`;
    }
    // console.log("LeftWidth: ", 0);
    this.leftWidth = 0;
    return "width: 0%;";
  }
  //changes for close and fullscreen buttons
  get rightSectionStyle() {
    if (this.closeLog) {
      return "width: 0%;";
    } else if (!this.fullScreen) {
      return `width: ${100 - this.leftWidth}%;`;
    }
    return "width: 100%;";
  }

  startResize(event) {
    this.isResizing = true;

    if (this.closeLog === null || this.closeLog === true) {
      const payload = { closeLog: false };
      publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
    }
    if (this.fullScreen === null || this.fullScreen === true) {
      const payload = { fullScreen: false };
      publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
    }
    event.preventDefault();
    // console.log("Resizing Started");
    window.addEventListener("mousemove", this.resize.bind(this));
    window.addEventListener("mouseup", this.stopResize.bind(this));
  }

  resize(event) {
    if (!this.isResizing) return;
    const containerWidth =
      this.template.querySelector(".split-screen").offsetWidth;
    // console.log("Container width: " + containerWidth);
    // console.log("Mouse X: " + event.clientX);
    const newLeftWidth = (event.clientX / containerWidth) * 100;
    this.leftWidth = Math.max(0, Math.min(100, newLeftWidth));
    // console.log("Left width: " + this.leftWidth + "%");
  }

  stopResize() {
    this.isResizing = false;
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.stopResize);
  }
}
