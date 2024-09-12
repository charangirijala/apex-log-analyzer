import { api, LightningElement } from "lwc";

export default class InputAsText extends LightningElement {
  @api isFileUploaded;
  renderedCallback() {
    //console.log("InputAsText rendered isFileUploaded: ", this.isFileUploaded);
  }
  handleTextAreaChange(event) {
    var dataCheck = false;
    event.preventDefault();
    if (event.target.value !== "") {
      dataCheck = true;
    }
    const textAreaEvent = new CustomEvent("textareachange", {
      detail: { logData: event.target.value, isValidData: dataCheck }
    });
    this.dispatchEvent(textAreaEvent);
  }
  get textAreaDisabled() {
    return this.isFileUploaded;
  }
}
