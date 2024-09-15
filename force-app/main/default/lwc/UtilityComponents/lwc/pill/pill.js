import { api, LightningElement } from "lwc";

export default class Pill extends LightningElement {
  @api pillLabel;
  @api iconName;
  @api removeBtnTxt;
  hasIcon = false;
  iconUrl;
  connectedCallback() {
    if (this.iconName !== null || this.iconName !== undefined) {
      this.iconUrl =
        "/assets/icons/doctype-sprite/svg/symbols.svg#" + this.iconName;
      this.hasIcon = true;
    }
  }
  removeHandler() {
    const event = new CustomEvent("remove");
    this.dispatchEvent(event);
  }
}
