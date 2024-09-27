import { LightningElement, api } from "lwc";

export default class Badge extends LightningElement {
  @api value;
  @api type;
  @api marginSide;
  @api marginTop;
  @api marginBottom;
  get badgeClass() {
    let temp = "slds-badge badge ";
    if (this.marginSide) {
      temp += "slds-var-m-horizontal_" + this.marginSide;
      temp += " ";
    }
    if (this.marginTop) {
      temp += "slds-var-m-top_" + this.marginTop;
      temp += " ";
    }
    if (this.marginBottom) {
      temp += "slds-var-m-bottom_" + this.marginBottom;
      temp += " ";
    }
    if (this.type) {
      temp += this.type;
      temp += " ";
    }
    return temp;
  }
}
