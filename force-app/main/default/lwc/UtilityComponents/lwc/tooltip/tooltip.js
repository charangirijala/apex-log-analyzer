import { LightningElement } from "lwc";

export default class LwcTooltip extends LightningElement {
  tooltipVisible = false;

  get tooltipStyle() {
    return `position: absolute; top: -45px; left: 15px; display: ${this.tooltipVisible ? "block" : "none"};`;
  }

  showTooltip() {
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }
}
