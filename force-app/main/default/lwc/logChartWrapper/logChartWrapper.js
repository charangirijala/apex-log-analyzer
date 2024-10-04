import { api, LightningElement } from "lwc";

export default class LogChartWrapper extends LightningElement {
  @api state;
  @api profilingInfo;
  @api executeAnonyCode;
  @api codeUnits;
  renderedCallback() {
    // console.log("profiling info:", JSON.stringify(this.profilingInfo));
  }
}
