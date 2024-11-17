/* eslint-disable @lwc/lwc/no-api-reassignments */
/* eslint-disable radix */
import {
  subscribe,
  publish,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import LOG_ANALYSIS_STATE from "@salesforce/messageChannel/Log_Analysis_Viewer_State__c";

import { api, LightningElement, wire } from "lwc";

export default class DetailedLogViewer extends LightningElement {
  minimize = false;
  @api idLimitMin;
  @api idLimitMax;
  logIdSubs = null;
  logId;
  @wire(MessageContext)
  messageContext;
  @api logsMasterData;
  @api logLinesData;
  lowerLimitReached = true;
  upperLimitReached = false;
  closeLogViewer() {
    console.log("[detailedLogViewer.js] Closing the detailedViewer");
    this.dispatchEvent(new CustomEvent("closelogviewer"));
  }

  //changes for fullscreen button
  get iconName() {
    return this.minimize ? "utility:minimize_window" : "utility:new_window";
  }
  fullscreen() {
    console.log("[detailedLogViewer.js] Going Full Screen");
    this.minimize = !this.minimize;
    const payload = {
      fullScreen: this.minimize
    };
    publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }
  subscribeToMessageChannel() {
    if (!this.logIdSubs) {
      this.logIdSubs = subscribe(
        this.messageContext,
        LOG_ANALYSIS_STATE,
        (message) => this.setVars(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  setVars(message) {
    this.logId = message.logId;
    if (message.fullScreen !== null) {
      this.minimize = message.fullScreen;
    }
  }
  recheckLimits() {
    const id = parseInt(this.logId);
    console.log("[detailedLogViewer.js] Rechecking limits.. Id = ", id);
    if (id > this.idLimitMin && id < this.idLimitMax) {
      if (this.lowerLimitReached === true || this.upperLimitReached === true) {
        this.lowerLimitReached = false;
        this.upperLimitReached = false;
        console.log(
          "[detailedLogViewer.js] Entered ambigous condition resetting the limits lowerLimitReached: ",
          this.lowerLimitReached,
          " upperLimitReached: ",
          this.upperLimitReached
        );
      }
    }
  }
  renderedCallback() {
    console.log(
      "[detailedLogViewer.js] Rendering detailedViewer for Id:",
      this.logId,
      "Log Lines data: ",
      this.logLinesData
    );
    this.recheckLimits();
  }
  get LogDataForId() {
    if (this.logLinesData !== null && this.logLinesData !== undefined) {
      const parsedId = parseInt(this.logId);
      if (this.logLinesData.has(parsedId)) {
        console.log(
          "[detailedLogViewer.js] LogDataForId is found and sent to logLineWrapper"
        );
        return this.logLinesData.get(parsedId);
      }
      console.log("[detailedLogViewer.js] LogDataForId is null or undefined");
    }

    return undefined;
  }
  handleForward() {
    let nextLogId = parseInt(this.logId) + 1;
    console.log(
      "[detailedLogViewer.js] Changed the logViewer to nxt treenode nextLogId:",
      nextLogId,
      " idLimitMin",
      this.idLimitMin,
      " idLimitMax",
      this.idLimitMax
    );
    if (nextLogId === this.idLimitMax) {
      this.upperLimitReached = true;
    }
    if (nextLogId > this.idLimitMin && nextLogId < this.idLimitMax) {
      this.upperLimitReached = false;
      this.lowerLimitReached = false;
    }
    const payload = { logId: nextLogId.toString() };
    publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
  }
  handleBackward() {
    const logid = parseInt(this.logId);
    if (logid === this.idLimitMin) {
      this.lowerLimitReached = true;
      return;
    }
    const prevLogId = logid - 1;
    console.log(
      "[detailedLogViewer.js] Changed the logViewer to prev treenode prevLogId:",
      prevLogId,
      " idLimitMin",
      this.idLimitMin,
      " idLimitMax",
      this.idLimitMax
    );
    if (prevLogId === this.idLimitMin) {
      this.lowerLimitReached = true;
    }
    if (prevLogId > this.idLimitMin && prevLogId < this.idLimitMax) {
      this.upperLimitReached = false;
      this.lowerLimitReached = false;
    }
    const payload = { logId: prevLogId.toString() };
    publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
  }
  get LogHeaderDetails() {
    console.log(
      "[detailedLogViewer.js] LogHeaderDetails called with logId",
      this.logId
    );
    if (this.logId) {
      const size = this.idLimitMax - this.idLimitMin;
      const temp = size + (this.idLimitMin - parseInt(this.logId));
      const idx = size - temp;
      console.log(
        "[detailedLogViewer.js] LogHeaderDetails calculated: ",
        JSON.parse(JSON.stringify(this.logsMasterData[idx]))
      );
      console.log("[detailedLogViewer.js] Passed selected Id index to parent");
      this.dispatchEvent(new CustomEvent("selectedid", { detail: idx }));
      return this.logsMasterData[idx];
    }
    if (
      (this.logId === undefined || this.logId === null) &&
      this.logsMasterData.length > 0
    ) {
      this.lowerLimitReached = true;
      this.logId = this.idLimitMin;
      return this.logsMasterData[0];
    }

    return undefined;
  }
}
