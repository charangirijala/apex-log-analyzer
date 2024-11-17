public class VariableScopeUtility {
  /*
   * 1. if variable Name is this then no need to process
   * 2. if not call the AnalyzeLine method
   */
  public static void processVariableScope(String line) {
    List<String> lineData = line.split('\\|');
    if (lineData.size() == 7) {
      String variableName = lineData[3];
      VariableScopeUtility.analyzeLine(lineData);
    }
  }

  /*
   * 1. Get the details of variable and push it onto current Code/MethodUnit
   */
  private static void analyzeLine(List<String> lineData) {
    LogLineSchema lls = new LogLineSchema();
    lls.type = 'VARIN';
    if (lineData[6] == 'true') {
      lls.isVarStatic = true;
    } else if (lineData[6] == 'false') {
      lls.isVarStatic = false;
    }
    if (lineData[5] == 'true') {
      lls.isVarAccessible = true;
    } else if (lineData[5] == 'false') {
      lls.isVarAccessible = false;
    }
    lls.varType = lineData[4];
    lls.varName = lineData[3];
    lls.lineNumber = lineData[2];
    /*
     * Get Current CodeUnit/MethodUnit and push it
     */

    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      /**
       * Get the top of methodUnitsStack and push it to current method Unit
       */
      MethodSchema currentMethodUnit = (MethodSchema) utilityVariables.methodUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current MethodUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = lls;
      //Add elsss to currentMenthodUnit
      currentMethodUnit.executedLinesAndSubUnits.add(elss);
      //update currentLog
      utilityVariables.currentLog = lls;
    } else if (!utilityVariables.codeUnitsStack.isEmpty()) {
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current codeUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = lls;
      //Add the elss to the currentCodeUnit
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
      //update currentLog
      utilityVariables.currentLog = lls;
    }
  }
}
