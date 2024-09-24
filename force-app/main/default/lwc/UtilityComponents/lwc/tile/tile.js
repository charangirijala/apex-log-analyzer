import { LightningElement, api } from "lwc";

export default class Tile extends LightningElement {
  isOpen = true;
  isClosed = false;
  @api title;
  secClass = "slds-section slds-is-open";

  get sectionClass() {
    return this.secClass;
  }
  toggleHandler() {
    this.isOpen = !this.isOpen;
    this.isClosed = !this.isClosed;
    if (this.isClosed && !this.isOpen) {
      // console.log('Section closed');
      this.secClass = "slds-section";
    } else {
      this.secClass = "slds-section slds-is-open";
    }
  }
}
