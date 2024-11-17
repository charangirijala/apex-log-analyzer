import { LightningElement, track } from "lwc";
import callApexFromClient from "@salesforce/apex/ClientInputHandler.callApexFromClient";
export default class FileUploader extends LightningElement {
  fileUploaded = false;
  textAreaFilled = false;
  textAreaData;
  fileNameLabel;
  isSuccess = true;
  responseState = false;
  executeAnonyCode;
  codeUnits;
  loading;
  fileData = [];
  @track profilingData = {
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
    this.resetApp();
    // console.log("File Removed: " + this.fileData);
  }
  textAreaChangeHandler(event) {
    // console.log("Data from inputAsText: " + JSON.stringify(event.detail));
    this.textAreaData = event.detail;
    this.textAreaFilled = this.textAreaData.isValidData ? true : false;
    if (!this.textAreaFilled) {
      // this.resetApp();
      this.resetApp();
    }
  }
  handleFileUpload(event) {
    var reader = new FileReader();
    console.log("[fileUploader.js] Processing Uploaded file...");
    const rawFile = event.target.files[0];
    console.log("[fileUploader.js] File Size: ", rawFile.size);
    reader.onload = (e) => {
      const file = e.target.result;
      // console.log(file);
      this.fileData = file.split(/\r\n|\n/);
      console.log("[fileUploader.js] No.of Lines: ", this.fileData.length);
      // lines.forEach((line) => {
      //   console.log("Single Line: ", line);
      // });
      this.fileNameLabel = rawFile.name;
      this.fileUploaded = true;
    };
    reader.onerror = (e) => {
      console.log("[fileUploader.js] Oops!!..Error Loading File..", e);
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
    console.log("[fileUploader.js] Req sent to server.. waiting..");
    //added for loading icon
    this.loading = true;
    try {
      const data = await callApexFromClient({ requestData: req });
      console.log("[fileUploader.js] Success response from server");
      this.isSuccess = true;
      // loading will be made false after the processing of response added at line 132
      // this.loading=false
      this.responseState = true;
      this.processResponse(data);
    } catch (err) {
      this.responseState = true;
      this.isSuccess = false;
      console.log(
        "[fileUploader.js] Oopss!! Error response from server",
        JSON.stringify(err)
      );
    }
  }

  get displayButton() {
    return this.textAreaFilled || this.fileUploaded;
  }

  processResponse(data) {
    console.log(
      "[fileUploader.js] processing data from server",
      JSON.stringify(data)
    );
    if (data !== undefined && data !== null && Object.keys(data).length !== 0) {
      //Extract apiVersion and ProfilingInfo
      if (data.apiVersion !== undefined && data.apiVersion !== null) {
        console.log(
          "[fileUploader.js] API version captured: ",
          data.apiVersion
        );
        this.profilingData.isAvailable = true;
        this.profilingData.data = {
          ...this.profilingData.data,
          apiVersion: data.apiVersion
        };
      }

      if (data.profilingInfo !== undefined && data.profilingInfo !== null) {
        console.log(
          "[fileUploader.js] Profiling info captured: ",
          data.profilingInfo
        );
        this.profilingData.isAvailable = true;
        this.profilingData.data = {
          ...this.profilingData.data,
          ...data.profilingInfo
        };
      }

      //extract ExecuteAnonymous code
      if (
        data.executeAnonyCode !== undefined &&
        data.executeAnonyCode !== null
      ) {
        console.log("[fileUploader.js] Execute Anonymous code captured");
        this.executeAnonyCode = data.executeAnonyCode;
      }
      if (data.codeUnits !== undefined && data.codeUnits !== null) {
        console.log("[fileUploader.js] CodeUnits captured");
        this.codeUnits = data.codeUnits;
      }
    }
    this.loading = false;
    console.log("[fileUploader.js] processed data from server");
  }

  resetApp() {
    this.fileUploaded = false;
    this.textAreaFilled = false;
    this.fileNameLabel = undefined;
    this.profilingData = {
      isAvailable: false,
      data: null
    };
    this.textAreaData = undefined;
    this.isSuccess = true;
    this.responseState = false;
    this.fileData = [];
    this.executeAnonyCode = undefined;
  }
}
