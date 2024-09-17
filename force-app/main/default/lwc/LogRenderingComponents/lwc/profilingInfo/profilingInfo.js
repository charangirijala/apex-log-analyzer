import { api, LightningElement } from "lwc";
import LogLevel_Info from "@salesforce/label/c.LogLevel_Info";

export default class ProfilingInfo extends LightningElement {
  apiVersion = "API : -";
  @api profilingInfo;
  renderComp = false;
  toolTipText = LogLevel_Info;
  connectedCallback() {
    console.log("Connecting ProfilingInfo to DOM");
    if (this.profilingInfo.isAvailable) {
      this.renderComp = true;
    }
  }
  renderedCallback() {
    console.log("Rendering changes to ProfilingInfo");
    if (!this.profilingInfo.isAvailable) {
      this.renderComp = false;
      // console.log("Profiling Info available.. processing..");
      // console.log(
      //   "Instance of data sent to profilingInfo: ",
      //   JSON.stringify(this.profilingInfo)
      // );
      // this.renderComp = true;
      //   if (
      //     this.profilingInfo.data.apiVersion !== undefined ||
      //     this.profilingInfo.data.apiVersion !== null
      //   ) {
      //     this.apiVersion = "API : " + this.profilingInfo.data.apiVersion;
      //   }
      // let _keys = [];
      // _keys = Object.keys(this.profilingInfo.data);
      // this.profilingStd.forEach((profile) => {
      //   if (_keys.includes(profile.key)) {
      //     profile.value = this.profilingInfo.data[profile.key];
      //     profile.styling += this.stylingConfig(profile.value);
      //   }
      // });
    }
  }
  profilingStd = [
    { key: "APEX_PROFILING", value: "-", styling: "slds-badge" },
    { key: "APEX_CODE", value: "-", styling: "slds-badge" },
    { key: "CALLOUT", value: "-", styling: "slds-badge" },
    { key: "DB", value: "-", styling: "slds-badge" },
    { key: "NBA", value: "-", styling: "slds-badge" },
    { key: "SYSTEM", value: "-", styling: "slds-badge" },
    { key: "VALIDATION", value: "-", styling: "slds-badge" },
    { key: "WAVE", value: "-", styling: "slds-badge" },
    { key: "VISUALFORCE", value: "-", styling: "slds-badge" },
    { key: "WORKFLOW", value: "-", styling: "slds-badge" }
  ];
  stylingConfig(value) {
    if (value === "NONE") return "";
    else if (value === "ERROR") return " slds-theme_error";
    else if (value === "INFO") return " slds-badge_inverse";
    else if (value === "WARN" || value === "DEBUG")
      return " slds-theme_warning";
    else if (value === "FINER" || value === "FINE" || value === "FINEST")
      return " slds-theme_success";
    return "";
  }
}
