import { api, LightningElement } from "lwc";

import { loadScript, loadStyle } from "lightning/platformResourceLoader";

import Prism from "@salesforce/resourceUrl/Prism";

export default class ExeAnonymousCodeView extends LightningElement {
  prismJsLoaded = false;

  //   codeArr = [
  //     "//gglib file-069dM000005rk6fQAA",
  //     "ContentVersion file = [",
  //     "  SELECT Title, VersionData",
  //     "  FROM ContentVersion",
  //     "  WHERE ContentDocument.id = '069dM000005ivlNQAQ'",
  //     "];",
  //     "Blob myBlob = file.VersionData;",
  //     "System.debug('Blob Size is:' + myBlob.size());",
  //     "try {",
  //     "  String rawDataString = myBlob.toString();",
  //     "  Integer numberOfLines = 0;",
  //     "  System.debug('Length of Raw String: ' + rawDataString.length());",
  //     "  // UtilityRowIterator r = new UtilityRowIterator(rawDataString, '\\n');",
  //     "  // List<String> logList = new List<String>();",
  //     "  //Execute batch class",
  //     "  ProcessBatch batchJob = new ProcessBatch(rawDataString);",
  //     "  Database.executeBatch(batchJob, 5000);",
  //     "  // while (r.hasNext()) {",
  //     "  //   numberOfLines++;",
  //     "  //   String lineRaw = r.next();",
  //     "  //   logList.add(lineRaw);",
  //     "  //   /*",
  //     "  //    * Replace all the | to pipe for each line",
  //     "  //    * The line must be either:",
  //     "  //    * 1. Profiling Info",
  //     "  //    * 2. Standard Expression",
  //     "  //    * 3. Execute Anonymous Code",
  //     "  //    * 4. Normal Pattern less line",
  //     "  //    */",
  //     "  //   String line = lineRaw.replaceAll('|', '|');",
  //     "  //   if (utilityVariables.profilingRegex.matcher(line).matches()) {",
  //     "  //     /*",
  //     "  //      * 1. Call processApexProfilingCategories() to process data and update @apiVersion and @apexProfilingCategories",
  //     "  //      * 2. Update the profiling info in ResultSchema Object",
  //     "  //      */",
  //     "  //     UtilityMethods.processApexProfilingCategories(line);",
  //     "  //   } else if (utilityVariables.standExpRegex.matcher(line).matches()) {",
  //     "  //     /*",
  //     "  //      * 1. Since it matches Standard exp each line should be matched with eventMasterData to find out event and process the data",
  //     "  //      * 2. Call processStandardExpStmts()",
  //     "  //      */",
  //     "  //     UtilityMethods.processStandardExpStmts(line);",
  //     "  //   } else if (utilityVariables.execAnRegex.matcher(line).matches()) {",
  //     "  //     /*",
  //     "  //      * 1. Store all the execute anonymous statements in list<String> static variable ExecAnStatements by calling processExecAnStatements",
  //     "  //      * 2. add the list to result executeAnonyCode field",
  //     "  //      */",
  //     "  //     UtilityMethods.processExecAnStatements(line);",
  //     "  //   } else {",
  //     "  //     /*",
  //     "  //      *1. No pattern matched for the line",
  //     "  //      */",
  //     "  //   }",
  //     "  // }",
  //     "  System.debug('Total number of lines processed: ' + numberOfLines);",
  //     "  System.debug(",
  //     "    'Final check for CodeUnits Stack size: ' +",
  //     "    utilityVariables.codeUnitsStack.size()",
  //     "  );",
  //     "  System.debug(",
  //     "    'Final check for MethodUnits Stack size: ' +",
  //     "    utilityVariables.methodUnitsStack.size()",
  //     "  );",
  //     "  System.debug(",
  //     "    'CPU used: ' +",
  //     "      System.Limits.getCpuTime() +",
  //     "      ' of ' +",
  //     "      System.Limits.getLimitCpuTime()",
  //     "  );",
  //     "  System.debug(",
  //     "    'Heap Size used: ' +",
  //     "      System.Limits.getHeapSize() +",
  //     "      ' of ' +",
  //     "      System.Limits.getLimitHeapSize()",
  //     "  );",
  //     "  System.debug('Final Result after Log Processing: ' + utilityVariables.result);",
  //     "  System.debug(",
  //     "    'Final Result in JSON: ' + JSON.serialize(utilityVariables.result)",
  //     "  );",
  //     "} catch (StringException e) {",
  //     "  System.debug(",
  //     "    'String max characters(6000000) limit exceeded: ' + e.getMessage()",
  //     "  );",
  //     "}"
  //   ];

  @api executeAnonyCode;
  renderedCallback() {
    if (this.prismJsLoaded) {
      this.highlightCode();
    } else {
      Promise.all([
        loadScript(this, Prism + "/prism/prism.js"),
        loadStyle(this, Prism + "/prism/prism.css")
      ])
        .then(() => {
          this.prismJsLoaded = true;
          this.highlightCode();
        })
        .catch((error) => {
          console.error("Error loading Prism.js", error);
        });
    }
  }

  highlightCode() {
    if (this.executeAnonyCode !== null && this.executeAnonyCode !== undefined) {
      const codeSnippet = this.executeAnonyCode.join("\n");
      const codeElement = this.template.querySelector("code");
      if (codeElement) {
        codeElement.textContent = codeSnippet;
        window.Prism.highlightElement(codeElement);
      }
    }
  }
}
