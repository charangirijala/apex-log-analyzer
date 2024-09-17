import { api, LightningElement } from "lwc";

export default class LogChartWrapper extends LightningElement {
  @api state;
  @api profilingInfo;
  renderedCallback() {
    // console.log("profiling info:", JSON.stringify(this.profilingInfo));
  }
}
