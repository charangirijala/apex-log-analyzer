import { LightningElement, track, api } from "lwc";

export default class Splitscreen extends LightningElement {
  @api closeLog
  @api fullScreen
  @track leftWidth = 50;
  isResizing = false;

  //changes for close and fullscreen buttons
  get leftSectionStyle() {
    if (this.closeLog) { return 'width: 100%;' }
    else if (!this.fullScreen) { return `width: ${this.leftWidth}%;` }
    else { return 'width: 0%;' }
  }
  //changes for close and fullscreen buttons
  get rightSectionStyle() {
    if (this.closeLog) { return 'width: 0%;' }
    else if (!this.fullScreen) { return `width: ${100 - this.leftWidth}%;` }
    else { return 'width: 100%;' }
  }

  startResize(event) {
    this.isResizing = true;
    event.preventDefault();
    window.addEventListener("mousemove", this.resize.bind(this));
    window.addEventListener("mouseup", this.stopResize.bind(this));
  }

  resize(event) {
    if (!this.isResizing) return;
    const containerWidth =
      this.template.querySelector(".split-screen").offsetWidth;
    const newLeftWidth = (event.clientX / containerWidth) * 100;
    this.leftWidth = Math.max(10, Math.min(90, newLeftWidth));
  }

  stopResize() {
    this.isResizing = false;
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.stopResize);
  }
}
