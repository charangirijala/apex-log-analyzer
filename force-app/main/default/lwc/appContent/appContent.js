import { api, LightningElement } from "lwc";

export default class AppContent extends LightningElement {
  @api activeApp;

  get isHome() {
    return this.activeApp === "Home";
  }

  get isRawLogViewer() {
    return this.activeApp === "Raw Log Viewer";
  }

  get isLogAnalysis() {
    return this.activeApp === "Log Analysis";
  }

  get isDetailLogViewer() {
    return this.activeApp === "Detailed Log Viewer";
  }
}
