import { LightningElement, track } from "lwc";

export default class Splitscreen extends LightningElement {
  @track leftWidth = 50;
  isResizing = false;

  get leftSectionStyle() {
    return `width: ${this.leftWidth}%;`;
  }

  get rightSectionStyle() {
    return `width: ${100 - this.leftWidth}%;`;
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
