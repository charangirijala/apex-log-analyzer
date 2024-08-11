import { LightningElement, track } from "lwc";
import saveFile from "@salesforce/apex/apexLogTryController.saveFile";
export default class FileUploader extends LightningElement {
  @track fileName;
  @track showLoadingSpinner = false;
  @track data;
  @track isTrue = false;
  fileData;
  filesUploaded;
  fileReader;
  fileContents;
  MAX_FILE_SIZE = 1500000;
  fileUploadHandler(event) {
    if (event.target.files.length > 0) {
      this.filesUploaded = event.target.files;
      this.fileName = this.filesUploaded[0].name;
    }
  }

  handleSubmit() {
    console.log("handleSubmit Called()");

    if (this.filesUploaded.length > 0) {
      console.log("this.filesUploaded.length > 0 condtion entered::)");

      this.uploadFile();
    } else {
      this.fileName = "Please upload a file and click submit";
    }
  }

  uploadFile() {
    console.log("uploadFile called()");
    console.log("Size of file uploaded: ", this.filesUploaded[0].size);
    console.log("MAX size allowed: ", this.MAX_FILE_SIZE);
    if (this.filesUploaded[0].size > this.MAX_FILE_SIZE) {
      console.log("File Size too large");
    } else {
      this.showLoadingSpinner = true;
      this.fileReader = new FileReader();
      this.fileReader.onloadend = () => {
        this.fileContents = this.fileReader.result;
        console.log("File Contents:", JSON.stringify(this.fileContents));
        this.saveFile();
      };
      this.fileReader.readAsText(this.filesUploaded[0]);
    }
  }

  saveFile() {
    console.log("saveFile method entered()");

    try {
      saveFile({ base64Data: JSON.stringify(this.fileContents) })
        .then((result) => {
          if (result === null || result.length === 0) {
            console.log("The File dosen't contain any data");
            this.fileName = "The File dosen't contain any data";
            this.showLoadingSpinner = false;
          } else {
            this.data = result;
            this.fileName = this.fileName + "-Uploaded successfully";
            this.showLoadingSpinner = false;
          }
        })
        .catch((error) => {
          console.error(error);
          this.showLoadingSpinner = false;
          this.fileName = "Error Loading file - " + this.fileName;
        });
    } catch (error) {
      console.error(error);
      this.showLoadingSpinner = false;
    }
  }
}
