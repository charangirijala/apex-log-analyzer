import { LightningElement } from "lwc";
export default class FileUploader extends LightningElement {
  fileUploaded = false;
  textAreaFilled = false;
  fileNameLabel;
  fileData;
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
    const textAreaData = event.detail;
    this.textAreaFilled = textAreaData.isValidData ? true : false;
  }
  handleFileUpload(event) {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = () => {
      var base64 = reader.result.split(",")[1];
      this.fileData = {
        fileName: file.name,
        base64: base64
      };
      // console.log("FileData: " + JSON.stringify(this.fileData));
      this.fileNameLabel = "Uploaded File: " + this.fileData.fileName;
      this.fileUploaded = true;
    };
    reader.readAsDataURL(file);
  }
  handleSubmit() {
    //prepare data here and call apex class
    // console.log(
    //   "FileUploaded: ",
    //   this.fileUploaded,
    //   " TextAreaFilled: ",
    //   this.textAreaFilled
    // );

    if (this.fileUploaded) {
      //process fileData
    } else if (this.textAreaFilled) {
      //process textArea Data
    }
  }

  get displayButton() {
    return this.textAreaFilled || this.fileUploaded;
  }
}
