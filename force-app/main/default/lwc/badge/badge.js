import { LightningElement, api } from "lwc";

export default class Badge extends LightningElement {
  @api value;
  @api type;
  @api marginSide;
  get badgeClass() {
    let temp = "slds-badge badge ";
    if (this.marginSide) {
      temp += "slds-var-m-horizontal_" + this.marginSide;
      temp += " ";
    }
    if (this.type) {
      temp += this.type;
      temp += " ";
    }
    return temp;
  }
}
