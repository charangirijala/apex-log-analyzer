import { LightningElement } from "lwc";
import callApexFromClient from "@salesforce/apex/ClientInputHandler.callApexFromClient";
export default class FileUploader extends LightningElement {
  fileUploaded = false;
  textAreaFilled = false;
  textAreaData;
  fileNameLabel;
  fileData = {
    fileName: "",
    base64: ""
  };
  get acceptedFormats() {
    return [".log", ".txt"];
  }
  removeFileHandler() {
    this.fileUploaded = false;
    this.fileData = {};
    // console.log("File Removed: " + this.fileData);
  }
  textAreaChangeHandler(event) {
    // console.log("Data from inputAsText: " + JSON.stringify(event.detail));
    this.textAreaData = event.detail;
    this.textAreaFilled = this.textAreaData.isValidData ? true : false;
  }
  handleFileUpload(event) {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = () => {
      var base64 = reader.result.split(",")[1];
      this.fileData.fileName = file.name;
      this.fileData.base64 = base64;
      // console.log("FileData: " + JSON.stringify(this.fileData));
      this.fileNameLabel = "Uploaded File: " + this.fileData.fileName;
      this.fileUploaded = true;
    };
    reader.readAsDataURL(file);
  }
  handleSubmit() {
    //prepare data here and call apex class
    const requestBody = {
      type: "",
      debugLogData: ""
    };
    if (this.fileUploaded) {
      //process fileData
      requestBody.type = "base64";
      requestBody.debugLogData = this.fileData.base64;
    } else if (this.textAreaFilled) {
      //process textArea Data
      requestBody.type = "text";
      requestBody.debugLogData = this.textAreaData.logData;
    }
    // console.log("RequestBody sent to client: ", JSON.stringify(requestBody));
    callApexFromClient({ requestData: requestBody })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get displayButton() {
    return this.textAreaFilled || this.fileUploaded;
  }
}
