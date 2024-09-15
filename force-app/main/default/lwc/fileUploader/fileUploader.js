import { LightningElement } from "lwc";
import callApexFromClient from "@salesforce/apex/ClientInputHandler.callApexFromClient";
export default class FileUploader extends LightningElement {
  fileUploaded = false;
  textAreaFilled = false;
  textAreaData;
  fileNameLabel;
  isSuccess = true;
  responseState = false;
  fileData = [];
  profilingData = {
    isAvailable: false,
    data: null
  };
  get acceptedFormats() {
    return [".log", ".txt"];
  }
  get renderUploader() {
    if (this.responseState) {
      if (!this.isSuccess) return false;
    }
    return true;
  }
  removeFileHandler() {
    this.fileUploaded = false;
    this.fileData = [];
    // console.log("File Removed: " + this.fileData);
  }
  textAreaChangeHandler(event) {
    // console.log("Data from inputAsText: " + JSON.stringify(event.detail));
    this.textAreaData = event.detail;
    this.textAreaFilled = this.textAreaData.isValidData ? true : false;
  }
  handleFileUpload(event) {
    var reader = new FileReader();
    console.log("Processing Uploaded file...");
    const rawFile = event.target.files[0];
    console.log("File Size: ", rawFile.size);
    reader.onload = (e) => {
      const file = e.target.result;
      // console.log(file);
      this.fileData = file.split(/\r\n|\n/);
      console.log("No.of Lines: ", this.fileData.length);
      // lines.forEach((line) => {
      //   console.log("Single Line: ", line);
      // });
      this.fileNameLabel = rawFile.name;
      this.fileUploaded = true;
    };
    reader.onerror = (e) => {
      console.log("Oops!!..Error Loading File..", e);
    };
    reader.readAsText(rawFile);
  }
  async handleSubmit() {
    //prepare data here and call apex class
    const requestBody = {
      debugLogData: []
    };
    if (this.fileUploaded) {
      //process fileData
      requestBody.debugLogData = this.fileData;
    } else if (this.textAreaFilled) {
      //process textArea Data
      requestBody.debugLogData = this.textAreaData.logData;
    }
    // console.log("RequestBody sent to client: ", JSON.stringify(requestBody));
    const req = JSON.stringify(requestBody);
    // console.log("Req Sent to server: ", req);
    try {
      const data = await callApexFromClient({ requestData: req });
      // console.log("Response from Server:", JSON.stringify(data));
      this.isSuccess = true;
      this.responseState = true;
      this.processResponse(data);
    } catch (err) {
      this.responseState = true;
      this.isSuccess = false;
      console.log("Oopss!! Error response from server", JSON.stringify(err));
    }
  }

  get displayButton() {
    return this.textAreaFilled || this.fileUploaded;
  }

  processResponse(data) {
    const resObj = JSON.parse(data);
    console.log("Parsed Response: ", resObj);
    // console.log("Profiling Data :", JSON.stringify(this.profilingData));
  }
}
