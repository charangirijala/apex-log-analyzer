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
    } else {
      // console.log(
      //   "Value of profiling info: ",
      //   JSON.stringify(this.profilingInfo)
      // );
      if (
        this.profilingInfo.data.apiVersion !== null &&
        this.profilingInfo.data.apiVersion !== undefined
      ) {
        this.apiVersion = "API : " + this.profilingInfo.data.apiVersion;
      }
    }
  }

  get prof_values() {
    const res = [];
    const apexProfiling =
      this.profilingInfo.data.APEX_PROFILING !== null &&
      this.profilingInfo.data.APEX_PROFILING !== undefined
        ? {
            profile:
              "APEX_PROFILING : " + this.profilingInfo.data.APEX_PROFILING,
            theme: this.stylingConfig(this.profilingInfo.data.APEX_PROFILING)
          }
        : {
            profile: "APEX_PROFILING : -",
            theme: ""
          };
    res.push(apexProfiling);
    const apexCode =
      this.profilingInfo.data.APEX_CODE !== null &&
      this.profilingInfo.data.APEX_CODE !== undefined
        ? {
            profile: "APEX_CODE : " + this.profilingInfo.data.APEX_CODE,
            theme: this.stylingConfig(this.profilingInfo.data.APEX_CODE)
          }
        : {
            profile: "APEX_CODE : -",
            theme: ""
          };
    res.push(apexCode);
    const callout =
      this.profilingInfo.data.CALLOUT !== null &&
      this.profilingInfo.data.CALLOUT !== undefined
        ? {
            profile: "CALLOUT : " + this.profilingInfo.data.CALLOUT,
            theme: this.stylingConfig(this.profilingInfo.data.CALLOUT)
          }
        : {
            profile: "CALLOUT : -",
            theme: ""
          };
    res.push(callout);
    const db =
      this.profilingInfo.data.DB !== null &&
      this.profilingInfo.data.DB !== undefined
        ? {
            profile: "DB : " + this.profilingInfo.data.DB,
            theme: this.stylingConfig(this.profilingInfo.data.DB)
          }
        : {
            profile: "DB : -",
            theme: ""
          };
    res.push(db);
    const nba =
      this.profilingInfo.data.NBA !== null &&
      this.profilingInfo.data.NBA !== undefined
        ? {
            profile: "NBA : " + this.profilingInfo.data.NBA,
            theme: this.stylingConfig(this.profilingInfo.data.NBA)
          }
        : {
            profile: "NBA : -",
            theme: ""
          };
    res.push(nba);
    const system =
      this.profilingInfo.data.SYSTEM !== null &&
      this.profilingInfo.data.SYSTEM !== undefined
        ? {
            profile: "SYSTEM : " + this.profilingInfo.data.SYSTEM,
            theme: this.stylingConfig(this.profilingInfo.data.SYSTEM)
          }
        : {
            profile: "SYSTEM : -",
            theme: ""
          };
    res.push(system);
    const validation =
      this.profilingInfo.data.VALIDATION !== null &&
      this.profilingInfo.data.VALIDATION !== undefined
        ? {
            profile: "VALIDATION : " + this.profilingInfo.data.VALIDATION,
            theme: this.stylingConfig(this.profilingInfo.data.VALIDATION)
          }
        : {
            profile: "VALIDATION : -",
            theme: ""
          };
    res.push(validation);

    const visualforce =
      this.profilingInfo.data.VISUALFORCE !== null &&
      this.profilingInfo.data.VISUALFORCE !== undefined
        ? {
            profile: "VISUALFORCE : " + this.profilingInfo.data.VISUALFORCE,
            theme: this.stylingConfig(this.profilingInfo.data.VISUALFORCE)
          }
        : {
            profile: "VISUALFORCE : -",
            theme: ""
          };
    res.push(visualforce);

    const wave =
      this.profilingInfo.data.WAVE !== null &&
      this.profilingInfo.data.WAVE !== undefined
        ? {
            profile: "WAVE : " + this.profilingInfo.data.WAVE,
            theme: this.stylingConfig(this.profilingInfo.data.WAVE)
          }
        : {
            profile: "WAVE : -",
            theme: ""
          };
    res.push(wave);

    const workflow =
      this.profilingInfo.data.WORKFLOW !== null &&
      this.profilingInfo.data.WORKFLOW !== undefined
        ? {
            profile: "WORKFLOW : " + this.profilingInfo.data.WORKFLOW,
            theme: this.stylingConfig(this.profilingInfo.data.WORKFLOW)
          }
        : {
            profile: "WORKFLOW : -",
            theme: ""
          };
    res.push(workflow);

    return res;
  }

  stylingConfig(value) {
    if (value === "NONE") return "";
    else if (value === "ERROR") return "slds-theme_error";
    else if (value === "INFO") return "slds-badge_inverse";
    else if (value === "WARN" || value === "DEBUG") return "slds-theme_warning";
    else if (value === "FINER" || value === "FINE" || value === "FINEST")
      return "slds-theme_success";
    return "";
  }
}
