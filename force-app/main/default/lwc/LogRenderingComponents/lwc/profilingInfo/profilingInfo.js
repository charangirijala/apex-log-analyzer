import { api, LightningElement } from "lwc";
import LogLevel_Info from "@salesforce/label/c.LogLevel_Info";

export default class ProfilingInfo extends LightningElement {
  @api apiVersion;
  @api profilingInfo;
  toolTipText = LogLevel_Info;
  connectedCallback() {
    console.log("Connected ProfilingInfo");
    let _keys = [];
    _keys = Object.keys(this.profilingInfo);
    this.profilingStd.forEach((profile) => {
      if (_keys.includes(profile.key)) {
        profile.value = this.profilingInfo[profile.key];
        profile.styling += this.stylingConfig(profile.value);
      }
    });
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
