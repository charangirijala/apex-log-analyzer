import { api, LightningElement, track } from "lwc";

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
    this.level = 1;
    this.posinset = 1;
    this.setsize = setSize;
    this.classComb = "slds-hint-parent";
    this.parents = parentId + "|";
  }
}
export default class LogAnalysisView extends LightningElement {
  @api codeUnits;
  @track columns = columns;
  @track treeNodes = [];
  @track test = [
    {
      a: "102",
      b: false
    }
  ];
  cuInHierarchy = [];
  connectedCallback() {
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
        this.getChildren(unit.codeUnit.executedLinesAndSubUnits, res);
      } else if (unit.methodUnit) {
        const res = new CUHierarchy(unit.methodUnit.methodName, "Method");
        // console.log("Method unit captured ", unit.methodUnit.methodName);
        parent.children.push(res);
        this.getChildren(unit.methodUnit.executedLinesAndSubUnits, res);
        // console.log("Child node res: ", res);
      }
    });
  }

  get treeNodeRenderer() {
    console.log("Getting latest verison");
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
