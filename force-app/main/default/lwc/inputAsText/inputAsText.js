import { api, LightningElement } from "lwc";

export default class InputAsText extends LightningElement {
  @api isFileUploaded;
  renderedCallback() {
    //console.log("InputAsText rendered isFileUploaded: ", this.isFileUploaded);
  }
  handleTextAreaChange(event) {
    var dataCheck = false;
    var data = [];
    console.log("Processing textarea..");
    event.preventDefault();
    if (event.target.value !== "") {
      dataCheck = true;
      data = event.target.value.split(/\r\n|\n/);
    }
    // console.log("Textarea: ", JSON.stringify(data));
    const textAreaEvent = new CustomEvent("textareachange", {
      detail: { logData: data, isValidData: dataCheck }
    });
    this.dispatchEvent(textAreaEvent);
    console.log("TextArea size: ", data.length);
  }
  get textAreaDisabled() {
    return this.isFileUploaded;
  }
}
