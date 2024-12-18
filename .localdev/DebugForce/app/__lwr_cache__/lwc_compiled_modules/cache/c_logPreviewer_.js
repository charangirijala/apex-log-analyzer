import { registerDecorators as _registerDecorators, LightningElement, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./logPreviewer.html";
import { subscribe, APPLICATION_SCOPE, MessageContext } from "lightning/messageService";
import STATE from "@salesforce/messageChannel/App_Service__c";

/*
 * Active Filters Schema
 * {
 *  id:1,
 *  field:"Created Date",
 *  operator:"Equals",
 *  isPicklist:false,
 *  value:"2019-12-18T22:00:00.000Z",
 *  filterValues: [
        "HEAP_ALLOCATE",
        "CODE_UNIT_STARTED",
        "CODE_UNIT_FINISHED"
      ],
 *  isActive:true,
 *  isEdited:false,
 *  filterItemClass:"slds-filters__item slds-grid slds-grid_vertical-align-center filter-being-edited"
 * }
 */
class LogPreviewer extends LightningElement {
  constructor(...args) {
    super(...args);
    this.reRenderVal = false;
    this.isLoading = false;
    this.fieldValue = void 0;
    this.operatorValue = void 0;
    this.filterValue = "";
    this.filterPickListValue = [];
    this.filterPickListMaster = [];
    this.fileDataSub = null;
    this.isFilterEditing = false;
    this.isFilterPopOverShowing = false;
    this.currentEditFilterIdx = void 0;
    this.popoverTop = 0;
    this.activeFilters = [{
      id: 0,
      field: "Line",
      operator: "Equals",
      value: "2019-12-18T22:00:00.000Z",
      isPicklist: false,
      filterValues: [],
      isEdited: false,
      isActive: true,
      filterItemClass: "slds-filters__item slds-grid slds-grid_vertical-align-center"
    }, {
      id: 1,
      field: "Event",
      operator: "Equals",
      isPicklist: true,
      value: "",
      filterValues: ["HEAP_ALLOCATE", "CODE_UNIT_STARTED", "CODE_UNIT_FINISHED"],
      isEdited: false,
      isActive: true,
      filterItemClass: "slds-filters__item slds-grid slds-grid_vertical-align-center"
    }];
    this.dynamicHeight = void 0;
    this.filterClass = "slds-panel slds-size_medium slds-panel_docked slds-panel_docked-right slds-panel_drawer filter-panel slds-hidden";
    this.pageNumberClass = "slds-input";
    this.linesPerPageClass = "slds-input";
    this.fileMetadata = {
      fileName: "",
      nofLines: 0,
      nofCodeUnits: 0,
      nofMethodUnits: 0
    };
    this.noOfPages = 0;
    this.pageNumber = 0;
    this.linesPerPage = 100;
    this.displayedData = [];
    this.fileData = [];
    this.messageContext = void 0;
  }
  get fieldOptions() {
    return [{
      label: "Line",
      value: "Line",
      type: "text"
    }, {
      label: "Event",
      value: "Event",
      type: "picklist"
    }];
  }
  get operatorOptions() {
    /* 
      { label: "Equals", value: "Equals" },
      { label: "Not Equals", value: "Not Equals" },
      { label: "Greater Than", value: "Greater Than" },
      { label: "Greater Than or Equal", value: "Greater Than or Equal" },
      { label: "Less Than", value: "Less Than" },
      { label: "Less Than or Equal", value: "Less Than or Equal" },
      { label: "Contains", value: "Contains" }
     */

    if (this.fieldValue === "Line") {
      return [{
        label: "Equals",
        value: "Equals"
      }, {
        label: "Not Equals",
        value: "Not Equals"
      }, {
        label: "Contains",
        value: "Contains"
      }];
    }
    return [{
      label: "Equals",
      value: "Equals"
    }, {
      label: "Not Equals",
      value: "Not Equals"
    }];
  }
  get isFilterValuePicklist() {
    return this.fieldValue === "Event" && this.filterPickListMaster.length > 0;
  }
  get filterValueOptions() {
    let options = this.filterPickListMaster;
    let opts = options.map(item => ({
      ...item,
      selected: this.filterPickListValue.includes(item.value)
    }));
    console.log("Options generated: ", opts);
    return opts;
  }
  connectedCallback() {
    if (!this.fileDataSub) {
      this.subscribeToMessageChannel();
    }
  }
  get ShowFilterSave() {
    return this.isFilterEditing === true && this.isFilterPopOverShowing === false ? true : false;
  }
  renderedCallback() {
    const popover = this.template.querySelector("section");
    if (popover) {
      const popoverHeight = popover.getBoundingClientRect().height / 2;
      console.log("PopoverTOp: ", this.popoverTop);
      const height = this.popoverTop - popoverHeight;
      popover.style.top = `${height}px `;
    }
    console.log("Rerendering: ", this.activeFilters);
  }
  get hasActiveFilters() {
    return this.activeFilters.length > 0;
  }
  subscribeToMessageChannel() {
    // console.log("Subscribe called");
    if (!this.fileDataSub) {
      this.fileDataSub = subscribe(this.messageContext, STATE, message => {
        this.setFileData(message);
      }, {
        scope: APPLICATION_SCOPE
      });
      this.fileDataSub = true;
    }
  }
  setFileData(message) {
    if (message !== null && message !== undefined) {
      // console.log("[LogPreviewer.js] setFileData called", message);
      if (message.fileData !== undefined && message.fileData !== null) {
        this.fileData = message.fileData;
        this.pageNumber = 1;
        this.noOfPages = Math.ceil(this.fileData.length / this.linesPerPage);
        this.calculations();
      }
      if (message.fileMetadata !== undefined && message.fileMetadata !== null) {
        this.fileMetadata = message.fileMetadata;
      }
      if (message.eventsPicklistValues !== undefined && message.eventsPicklistValues !== null) {
        if (Array.isArray(message.eventsPicklistValues)) {
          this.filterPickListMaster = message.eventsPicklistValues.map(str => ({
            value: str,
            label: str
          }));
        }
      }
    }
  }
  onLinesPerPageChange(event) {
    // console.log("Page Change: ", event.target.value);
    let input = parseInt(event.target.value, 10);
    if (input >= 1 && input <= 1000) {
      // this.linesPerPageClass = "slds-input";
      this.linesPerPage = input;
      this.pageNumber = 1;
      this.noOfPages = Math.ceil(this.fileData.length / this.linesPerPage);
      this.calculations();
    }
  }
  calculations() {
    if (this.pageNumber !== 0) {
      this.displayedData = this.fileData.slice(this.linesPerPage * (this.pageNumber - 1), this.linesPerPage * this.pageNumber);
    }
  }
  onPageNumberChange(event) {
    // console.log("Page Change: ", event.target.value);
    let input = parseInt(event.target.value, 10);
    if (input >= 1 && input <= this.noOfPages) {
      // this.pageNumberClass = "slds-input";
      this.pageNumber = input;
      this.calculations();
    }
  }
  nextHandler() {
    if (this.pageNumber + 1 <= this.noOfPages) {
      this.pageNumber++;
      this.calculations();
    }
  }
  prevHandler() {
    if (this.pageNumber - 1 >= 1) {
      this.pageNumber--;
      this.calculations();
    }
  }
  closeFilter() {
    this.filterClass = "slds-panel slds-size_medium slds-panel_docked slds-panel_docked-right slds-panel_drawer filter-panel slds-hidden";
  }
  openFilter() {
    this.filterClass = "slds-panel slds-size_medium slds-panel_docked slds-panel_docked-right slds-panel_drawer filter-panel slds-is-open";
  }
  removeFilter(event) {
    const filterIndex = event.target.dataset.id;
    this.isFilterPopOverShowing = false;
    let idx = 0;
    console.log("[LogPreviewer.js] removeFilter called", filterIndex);
    if (filterIndex >= 0) {
      // only splice array when item is found
      this.activeFilters.splice(filterIndex, 1); // 2nd parameter means remove one item only
    }
    this.activeFilters.forEach(filter => {
      filter.id = idx++;
    });
    this.currentEditFilterIdx = 0;
  }
  addFilter() {
    // if (!this.isFilterEditing) {
    this.isFilterEditing = true;
    this.isFilterPopOverShowing = true;
    this.filterPickListValue = [];
    this.currentEditFilterIdx = this.activeFilters.length;
    const newFilter = {
      id: this.activeFilters.length,
      field: "New Filter",
      operator: "",
      value: "",
      isPicklist: false,
      filterValues: [],
      isActive: false,
      isEdited: true,
      filterItemClass: "slds-filters__item slds-grid slds-grid_vertical-align-center filter-being-edited"
    };
    this.activeFilters.push(newFilter);
    // }
  }
  removeAllFilters() {
    this.isFilterEditing = false;
    this.handlePopoverClose();
    this.activeFilters = [];
  }
  cancelFilterEdit() {
    this.isFilterEditing = false;
    this.isFilterPopOverShowing = false;
    this.activeFilters.pop();
  }
  saveFilterEdit() {
    this.isFilterEditing = false;
    this.handlePopoverClose();
    let idxToRemove = [];
    for (let i = 0; i < this.activeFilters.length; i++) {
      let filter = this.activeFilters[i];
      if (filter.field === "Line" && filter.operator !== "" && filter.value !== "") {
        filter.isActive = true;
        filter.filterItemClass = "slds-filters__item slds-grid slds-grid_vertical-align-center";
      } else if (filter.field === "Event" && filter.operator !== "" && filter.filterValues.length > 0) {
        filter.isActive = true;
        filter.filterItemClass = "slds-filters__item slds-grid slds-grid_vertical-align-center";
      } else {
        //Addition pop all filters where isactive=false
        idxToRemove.push(i);
      }
    }
    idxToRemove.forEach(idx => {
      this.activeFilters.splice(idx, 1);
    });
  }
  onFilterElementClick(event) {
    this.isFilterEditing = true;
    this.isFilterPopOverShowing = true;
    this.currentEditFilterIdx = event.currentTarget.dataset.id;
    this.fieldValue = this.activeFilters[this.currentEditFilterIdx].field;
    this.operatorValue = this.activeFilters[this.currentEditFilterIdx].operator;
    if (Array.isArray(this.activeFilters[this.currentEditFilterIdx].value)) {
      //this is for picklist
      this.filterValue = "";
      this.filterPickListValue = this.activeFilters[this.currentEditFilterIdx].filterValues;
    } else {
      // this.reRenderVal = !this.reRenderVal;
      console.log("reRenderVal; ", this.activeFilters[this.currentEditFilterIdx].value, "rerender item:", this.activeFilters[this.currentEditFilterIdx]);
      this.filterValue = this.activeFilters[this.currentEditFilterIdx].value;
    }
    console.log("Filter ID;" + event.currentTarget.dataset.id);
    this.activeFilters[this.currentEditFilterIdx].filterItemClass = "slds-filters__item slds-grid slds-grid_vertical-align-center filter-being-edited";
    const filterPanel = this.template.querySelector(".filter-panel");
    const coord = filterPanel.getBoundingClientRect();
    console.log("X; " + coord.x + " Y:", coord.y + "Width: ", coord.width);
    console.log(typeof event.clientY);
    console.log(typeof coord.Y);
    this.popoverTop = event.clientY - coord.y;
    console.log("popover cal; ", this.popoverTop);
  }
  handleFieldChange(event) {
    console.log("Field Selected ", event.detail.value);
    this.fieldValue = this.activeFilters[this.currentEditFilterIdx].field = event.detail.value;
    this.activeFilters[this.currentEditFilterIdx].isPicklist = this.fieldValue === "Event" ? true : false;
  }
  handleOperatorChange(event) {
    console.log("Operator Selected ", event.detail.value);
    this.operatorValue = this.activeFilters[this.currentEditFilterIdx].operator = event.detail.value;
  }
  handleFilterValueChange(event) {
    // this.filterValue = event.detail;
    if (this.currentEditFilterIdx < this.activeFilters.length) {
      this.activeFilters[this.currentEditFilterIdx].filterValues = event.detail.map(filter => {
        return filter.value;
      });
    }
    this.filterPickListValue = [];
    console.log("Selected items: ", this.filterPickListValue);
  }
  handlePopoverClose() {
    this.isFilterPopOverShowing = false;
    this.fieldValue = null;
    this.operatorValue = null;
    this.filterValue = "";
    this.filterPickListValue = [];
  }
  handleFilterTextChange(event) {
    console.log("Filter Text Changed ", event.target.value);
    this.filterValue = this.activeFilters[this.currentEditFilterIdx].value = event.target.value;
  }
  /*LWC compiler v7.1.3*/
}
_registerDecorators(LogPreviewer, {
  track: {
    activeFilters: 1,
    fileMetadata: 1,
    displayedData: 1
  },
  wire: {
    messageContext: {
      adapter: MessageContext,
      config: function ($cmp) {
        return {};
      }
    }
  },
  fields: ["reRenderVal", "isLoading", "fieldValue", "operatorValue", "filterValue", "filterPickListValue", "filterPickListMaster", "fileDataSub", "isFilterEditing", "isFilterPopOverShowing", "currentEditFilterIdx", "popoverTop", "dynamicHeight", "filterClass", "pageNumberClass", "linesPerPageClass", "noOfPages", "pageNumber", "linesPerPage", "fileData"]
});
const __lwc_component_class_internal = _registerComponent(LogPreviewer, {
  tmpl: _tmpl,
  sel: "c-log-previewer",
  apiVersion: 62
});
export default __lwc_component_class_internal;