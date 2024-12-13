import { wire, LightningElement, track } from "lwc";
import {
  subscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import STATE from "@salesforce/messageChannel/App_Service__c";
export default class LogPreviewer extends LightningElement {
  util = false;
  isLoading = false;
  fileDataSub = null;
  inset = -1;
  offset = 1;
  @track displayedData = [];
  fileData = [];
  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    if (!this.fileDataSub) {
      this.subscribeToMessageChannel();
      console.log(
        "[LogPreviewer.js] sub to messagechannel fileData Length: ",
        JSON.stringify(this.fileData)
      );
    }
  }

  subscribeToMessageChannel() {
    console.log("Subscribe called");
    if (!this.fileDataSub) {
      this.fileDataSub = subscribe(
        this.messageContext,
        STATE,
        (message) => {
          this.setFileData(message);
        },
        { scope: APPLICATION_SCOPE }
      );
      this.fileDataSub = true;
    }
  }

  setFileData(message) {
    if (
      message !== null &&
      message !== undefined &&
      message.fileData !== undefined &&
      message.fileData !== null
    ) {
      console.log("[LogPreviewer.js] setFileData called");
      this.fileData = message.fileData;
      // console.log("setFileData called", JSON.stringify(this.fileData));
      //set first 100 lines to display
      this.displayedData = this.fileData.slice(
        0 * this.inset++,
        100 * this.offset++
      );
    }
  }

  handleScroll(event) {
    const container = event.target;

    //scroll down condtion
    if (
      container.scrollTop + container.clientHeight ===
      container.scrollHeight
    ) {
      this.displayedData = this.fileData.slice(
        100 * this.inset++,
        100 * this.offset++
      );
      console.log("Container.scrollTop: ", container.scrollTop);
      console.log("Container.scrollHeight: ", container.scrollHeight);
      console.log("Container.clientHeight: ", container.clientHeight);
      this.util = !this.util;
      console.log("[LogPreviewer.js] inset: ", this.inset);
      console.log("[LogPreviewer.js] offset: ", this.offset);
      console.log("[LogPreviewer.js] this.displayedData: ", this.displayedData);
    }

    //scroll up condition
    // if (container.scrollTop === 0) {
    //   if (this.inset !== -1 && this.offset !== 1) {
    //     this.displayedData = this.fileData.slice(
    //       100 * --this.inset,
    //       100 * --this.offset
    //     );
    //     console.log("Container.scrollTop: ", container.scrollTop);
    //     console.log("Container.scrollHeight: ", container.scrollHeight);
    //     console.log("Container.clientHeight: ", container.clientHeight);
    //     this.util = !this.util;
    //     console.log("[LogPreviewer.js] inset: ", this.inset);
    //     console.log("[LogPreviewer.js] offset: ", this.offset);
    //     console.log(
    //       "[LogPreviewer.js] this.displayedData: ",
    //       this.displayedData
    //     );
    //   }
    // }
  }
}
