import { api, LightningElement } from "lwc";

export default class LogChartWrapper extends LightningElement {
  apiVersion = "API Version: 61.0";
  @api profilingInfo;
}
