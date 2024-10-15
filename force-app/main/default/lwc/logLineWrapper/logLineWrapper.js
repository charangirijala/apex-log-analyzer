import { api, LightningElement } from "lwc";
/*
  Example Schema of logData:
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
  @api logData;

  logsArr = [];

  get logsArrData() {
    return this.logsArr;
  }
  connectedCallback() {
    this.logsArr = this.logData;
    this.logsArr.forEach((log) => {
      console.log("logsArr Data:", JSON.stringify(log));
      if (log.type === "line") {
        let logTemp = log;
        logTemp.isLine = true;
        logTemp.isUnit = false;
        // <!-- VARAS -->
        if (logTemp.logLineData.type === "VARAS") {
          // logTemp.logLineData.eventClassComb = "slds-line-clamp varas";
          logTemp.logLineData.type = "Variable Assigned:";
        }
        // <!-- VARIN -->
        else if (logTemp.logLineData.type === "VARIN") {
          // logTemp.logLineData.eventClassComb = "slds-line-clamp varin";
          logTemp.logLineData.type = "Variable Initialized:";
        }

        // <!-- DEBUG -->
        else if (logTemp.logLineData.type === "DEBUG") {
          // logTemp.logLineData.eventClassComb = "slds-line-clamp debug";
          logTemp.logLineData.type = "DEBUG Statement:";
        }

        log = logTemp;
      } else if (log.type === "unit") {
        log.isLine = false;
        log.isUnit = true;
      }
    });
  }
}
