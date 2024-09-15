import { api, LightningElement } from "lwc";

export default class LogChartWrapper extends LightningElement {
  @api state;
  apiVersion = "API Version: 61.0";
  @api profilingInfo;
}
