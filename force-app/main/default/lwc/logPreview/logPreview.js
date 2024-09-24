import { LightningElement, api } from "lwc";

export default class LogPreview extends LightningElement {
  @api tableData = [];
  tableSize;
  renderedCallback() {
    console.log("Datatable rendering");
    this.tableSize = this.tableData.length;
  }

  get finalData() {
    var res = [];
    this.tableData.forEach((line, i) => {
      let obj = {};
      obj.line = line;
      obj.unqId = i;

      res.push(obj);
    });

    return res;
  }

  handleScroll(event) {
    const unqId = event.target.value;
    if (unqId < this.tableSize) {
      const ele = this.template.querySelector(`[data-unqid="${unqId}"]`);
      if (ele !== null && ele !== undefined) {
        ele.scrollIntoView();
      }
    }
  }
}
