import {
  publish,
  MessageContext,
  subscribe,
  APPLICATION_SCOPE
} from "lightning/messageService";

import LOG_ANALYSIS_STATE from "@salesforce/messageChannel/Log_Analysis_Viewer_State__c";
import { api, LightningElement, track, wire } from "lwc";

let IdBase = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
const setSize = 100;
const columns = [
  {
    fieldName: "name",
    label: "Name",
    classComb: "slds-is-resizable slds-cell_action-mode name-col"
  },
  {
    fieldName: "type",
    label: "Type",
    classComb: "slds-is-resizable slds-cell_action-mode type-col"
  },
  {
    fieldName: "hasError",
    label: "hasError",
    classComb: "slds-is-resizable slds-cell_action-mode error-col"
  }
];

class CUHierarchy {
  Id;
  Name;
  Type;
  hasError;
  children = [];
  constructor(name, type) {
    this.Id = IdBase++;
    this.Name = name;
    this.Type = type;
    this.hasError = false;
  }
}

class TreeNode {
  Id;
  name;
  type;
  hasError;
  hasChild;
  isExpanded;
  isSelected;
  level;
  posinset;
  setsize;
  classComb;
  parents;
  constructor(id, name, type, hasError, parentId) {
    this.Id = id;
    this.name = name;
    this.type = type;
    this.hasError = hasError;
    this.hasChild = false;
    this.isExpanded = true;
    this.isSelected = false;
    this.level = 1;
    this.posinset = 1;
    this.setsize = setSize;
    this.classComb = "slds-hint-parent";
    this.parents = parentId + "|";
  }
}

class LogLine {
  Id;
  type;
  logLineData;

  name;
  unitId;
  constructor(type, data, name, unitid) {
    this.Id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    this.type = type;
    this.logLineData = data;
    this.name = name;
    this.unitId = unitid;
  }
}
export default class LogAnalysisView extends LightningElement {
  closeLogSub = null;
  closeLog;
  fullScreen = false;
  @api codeUnits;
  idLimitMin = IdBase;
  idLimitMax;
  TreeNodeLogs = new Map();
  @track columns = columns;
  @track treeNodes = [];
  @track test = [
    {
      a: "102",
      b: false
    }
  ];
  cuInHierarchy = [];
  logViewCol = 6;
  currentLogId;

  @wire(MessageContext)
  messageContext;

  currentLogIdx = 0;
  //close button
  setLogViewCol() {
    console.log("close log true");
    this.closeLog = true;
    const payload = { closeLog: true };
    publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
    //this.logViewCol = 12;
  }
  get detailedLogViewDisplay() {
    return this.logViewCol === 6 ? true : false;
  }
  openLogViewer(event) {
    const codeUnitId = event.currentTarget.dataset.unqid;
    console.log(
      "[logAnalysisView.js] CodeUnit clicked, Id: ",
      codeUnitId,
      " Opening detailed log for this Id"
    );
    this.logViewCol = 6;
    // this.currentLogId = codeUnitId;
    const payload = { logId: codeUnitId };
    publish(this.messageContext, LOG_ANALYSIS_STATE, payload);
    //adding for re-opening log
    this.closeLog = false;
  }
  setSelectedTreeNode(event) {
    this.test[0].a = this.test[0].a === "102" ? "103" : "102";
    console.log("[logAnalysisView.js] Selected Log idx: ", event.detail);
    if (this.treeNodes !== null && this.treeNodes !== undefined) {
      this.treeNodes[this.currentLogIdx].isSelected = false;
      this.currentLogIdx = event.detail;
      this.treeNodes[this.currentLogIdx].isSelected = true;
    }
  }
  connectedCallback() {
    if (!this.closeLogSub) {
      this.subscribeToMessageChannel();
    }
    //prepare cuInHierarchy from codeunit data
    this.codeUnits.forEach((cu) => {
      const parent = new CUHierarchy(cu.codeUnitName, cu.codeUnitType);
      this.getChildren(cu.executedLinesAndSubUnits, parent);
      this.cuInHierarchy.push(parent);
    });
    //prepare TreeNodes from cuInHierarchy
    const level = 1;
    let posinset = 1;
    this.cuInHierarchy.forEach((row) => {
      this.generateTreeNodes(row, level, posinset, "");
      posinset++;
    });
    this.idLimitMax = this.idLimitMin + this.treeNodes.length - 1;
  }
  subscribeToMessageChannel() {
    if (!this.closeLogSub) {
      this.closeLogSub = subscribe(
        this.messageContext,
        LOG_ANALYSIS_STATE,
        (message) => {
          this.setCloseLog(message);
        },
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  setCloseLog(message) {
    this.closeLog = message.closeLog;
  }
  generateTreeNodes(row, level, posinset, parentId) {
    const fRow = new TreeNode(
      row.Id,
      row.Name,
      row.Type,
      row.hasError,
      parentId
    );
    //Recurrsion Base condition
    if (
      row.children === null ||
      row.children === undefined ||
      row.children.length === 0
    ) {
      fRow.posinset = posinset;
      fRow.level = level;
      fRow.hasChild = false;
      this.treeNodes.push(fRow);
      return;
    }

    //Process logic if not satisfied base condition
    fRow.posinset = posinset;
    fRow.level = level;
    fRow.hasChild = true;
    const children = row.children;
    let idx = 1;
    this.treeNodes.push(fRow);
    children.forEach((child) => {
      // console.log("Parent id", fRow.parents);
      this.generateTreeNodes(child, level + 1, idx, fRow.parents + row.Id);
      idx++;
    });
  }

  getChildren(elss, parent) {
    //baseConditon
    if (elss === null || elss === undefined || elss.length === 0) {
      //no children return empty array
      parent.children = [];
      return;
    }

    // console.log("Elss Size", elss.length);
    elss.forEach((unit) => {
      if (unit.codeUnit) {
        const res = new CUHierarchy(
          unit.codeUnit.codeUnitName,
          unit.codeUnit.codeUnitType
        );
        // console.log("Code unit captured", unit.codeUnit.codeUnitName);
        parent.children.push(res);
        this.pushToTreeNodeLogs(parent.Id, null, "unit", res.Name, res.Id);
        this.getChildren(unit.codeUnit.executedLinesAndSubUnits, res);
      } else if (unit.methodUnit) {
        const res = new CUHierarchy(unit.methodUnit.methodName, "Method");
        // console.log("Method unit captured ", unit.methodUnit.methodName);
        parent.children.push(res);
        this.pushToTreeNodeLogs(parent.Id, null, "unit", res.Name, res.Id);
        this.getChildren(unit.methodUnit.executedLinesAndSubUnits, res);
        // console.log("Child node res: ", res);
      } else if (unit.logLine) {
        // console.log("Log parentId", parent.Id);
        this.pushToTreeNodeLogs(parent.Id, unit.logLine, "line", null, null);
      }
    });
  }

  pushToTreeNodeLogs(parentId, data, type, name, unitId) {
    if (this.TreeNodeLogs.has(parentId)) {
      let logData = this.TreeNodeLogs.get(parentId);
      if (type === "unit") {
        const newLine = new LogLine(type, null, name, unitId);
        logData.push(newLine);
        this.TreeNodeLogs.set(parentId, logData);
      } else if (type === "line") {
        const newLine = new LogLine(type, data, null, null);
        logData.push(newLine);
        this.TreeNodeLogs.set(parentId, logData);
      }
    } else {
      if (type === "line") {
        const temp = [];
        const newLine = new LogLine(type, data, null, null);
        temp.push(newLine);
        this.TreeNodeLogs.set(parentId, temp);
      } else if (type === "unit") {
        const temp = [];
        const newLine = new LogLine(type, null, name, unitId);
        temp.push(newLine);
        this.TreeNodeLogs.set(parentId, temp);
      }
    }
  }
  get treeNodeRenderer() {
    console.log("[logAnalysisView.js] Getting latest version of treeNodes");
    return this.treeNodes;
  }
  handleToggle(event) {
    this.test[0].a = this.test[0].a === "102" ? "103" : "102";
    // console.log(JSON.stringify(this.test));
    const element = event.target;
    const id = element.dataset.id;
    const isExpanded = element.dataset.expanded;
    console.log("Data Id:", id, " IsExpanded: ", isExpanded);
    this.treeNodes.forEach((row) => {
      if (row.parents.includes(id)) {
        if (isExpanded === "true") {
          row.classComb = "slds-hint-parent slds-hide";
          row.isExpanded = false;
        } else {
          row.classComb = "slds-hint-parent";
          row.isExpanded = true;
        }
      }
      if (row.Id.toString() === id) {
        row.isExpanded = !row.isExpanded;
      }
    });
  }
}
