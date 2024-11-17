import { api, LightningElement, track, wire } from "lwc";
import {
  subscribe,
  APPLICATION_SCOPE,
  MessageContext,
  publish
} from "lightning/messageService";
import LOG_ANALYSIS_STATE from "@salesforce/messageChannel/Log_Analysis_Viewer_State__c";
/*
  Ex Schema of logData:
  {"Id":88036,
  "type":"line",
  "logLineData":{"lineNumber":"[44]",
  "type":"VARAS",
  "varName":"execAnMatcher",
  "varValue":"{\"delegate\":\"0x79ce1bfb\"}"},
  "name":null,
  "unitId":null}

  {"Id":73448,
  "type":"unit",
  "logLineData":null,
  "name":"apexLogTryController",
  "unitId":61497}
 */
export default class LogLineWrapper extends LightningElement {
  @api logLinesData;
  logIdSubs = null;
  logId;
  @wire(MessageContext)
  messageContext;
  @track logsArr = [];

  get logsArrData() {
    // console.log("[logLineWrapper.js] logsArr:", JSON.stringify(this.logsArr));
    return this.logsArr;
  }
  connectedCallback() {
    this.subscribeToMessageChannel();
  }
  subscribeToMessageChannel() {
    if (!this.logIdSubs) {
      this.logIdSubs = subscribe(
        this.messageContext,
        LOG_ANALYSIS_STATE,
        (message) => this.setLogId(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }
  setLogId(message) {
    console.log(
      "[logLineWrapper.js] logId fetched from messageChannel is ",
      this.logId
    );
    this.logId = message.logId;
    this.prepareLogData();
  }
  openSubUnit(event) {
    // console.log(
    //   "[logLineWrapper.js] Sub Unit open called logId:",
    //   event.target.dataset.logid
    // );
    const temp = event.target.dataset.logid;
    if (temp !== null || temp !== undefined) {
      const payload = { logId: temp };
      // console.log(
      //   "[logLineWrapper.js] Publish called: ",
      //   JSON.stringify(payload)
      // );

      publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
    }
  }
  prepareLogData() {
    if (this.logId && this.logLinesData) {
      const parsedId = parseInt(this.logId, 10);
      if (this.logLinesData.has(parsedId)) {
        console.log("[logLineWrapper.js] LogDataForId is found");
        this.logsArr = this.logLinesData.get(parsedId);
      } else {
        console.log("[logLineWrapper.js] LogDataForId is null or undefined");
        this.logsArr = [];
      }
    }
    if (this.logsArr.length !== 0) {
      console.log(
        "[logLineWrapper.js] logsArr Data Changed with size:",
        this.logsArr.length
      );
      this.logsArr.forEach((log) => {
        if (log.type === "line") {
          let logTemp = log;
          logTemp.isLine = true;
          logTemp.isUnit = false;
          // <!-- VARAS -->
          if (logTemp.logLineData.type === "VARAS") {
            logTemp.eventClassComb = "slds-line-clamp varas";
            // logTemp.logLineData.type = "Variable Assigned:";
          }
          // <!-- VARIN -->
          else if (logTemp.logLineData.type === "VARIN") {
            logTemp.eventClassComb = "slds-line-clamp varin";
            // logTemp.logLineData.type = "Variable Initialized:";
          }

          // <!-- DEBUG -->
          else if (logTemp.logLineData.type === "DEBUG") {
            logTemp.eventClassComb = "slds-line-clamp debug";
            // logTemp.logLineData.type = "DEBUG Statement:";
          }

          // <!-- FATAL_ERROR -->
          else if (logTemp.logLineData.type === "FAERR") {
            logTemp.eventClassComb = "slds-line-clamp faerr";
            // console.log("Error: ", JSON.stringify(logTemp.logLineData));
          }

          // <!-- VALIDATION_FAIL -->
          else if (logTemp.logLineData.type === "VALFL") {
            logTemp.eventClassComb = "slds-line-clamp valfl";
            logTemp.isValidRuleFail = true;
          }
          // <!-- VALIDATION_FORMULA -->
          else if (logTemp.logLineData.type === "VALFR") {
            logTemp.eventClassComb = "slds-line-clamp valfr";
          }
          // <!-- VALIDATION_PASS -->
          else if (logTemp.logLineData.type === "VALPS") {
            logTemp.eventClassComb = "slds-line-clamp valps";
          }
          //<!-- SOQLB -->
          else if (logTemp.logLineData.type === "SOQLB") {
            logTemp.eventClassComb = "slds-line-clamp soqb";
            //console.log("Query: ", JSON.stringify(logTemp.logLineData));
          }
          //<!-- SOQLE -->
          else if (logTemp.logLineData.type === "SOQLE") {
            logTemp.eventClassComb = "slds-line-clamp soqe";
            //console.log("No.of Rows: ", JSON.stringify(logTemp.logLineData));
          }
          //<!-- FLORL -->
          else if (logTemp.logLineData.type === "FLORL") {
            logTemp.eventClassComb = "slds-line-clamp florl";
            // console.log("No.of Rows: ", JSON.stringify(logTemp.logLineData));
          }
          //<!-- FLOEL -->
          else if (logTemp.logLineData.type === "FLOEL") {
            logTemp.eventClassComb = "slds-line-clamp floel";
            // console.log("No.of Rows: ", JSON.stringify(logTemp.logLineData));
          }
          log = logTemp;
        } else if (log.type === "unit") {
          log.isLine = false;
          log.isUnit = true;
        }
      });
    }
  }
}
