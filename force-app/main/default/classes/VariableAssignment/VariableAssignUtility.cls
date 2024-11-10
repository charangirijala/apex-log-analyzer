public class VariableAssignUtility {
  public static void processVariableAssignment(String line, String pattern) {
    if (pattern == 'Variable-Generic' || pattern == 'Variable-No-Address') {
      VariableAssignUtility.analyzeVar(line);
    }
  }
  /*
   * 1. Example Line 01:06:24.0 (17080772)|VARIABLE_ASSIGNMENT|[4]|this.ShippingState|"Andhra Pradesh"
   * 2. Example Line 01:06:24.0 (17129679)|VARIABLE_ASSIGNMENT|[3]|ac|null|
   * In case of Ex 2 the split size will be 6
   */
  private static void analyzeVar(String line) {
    List<String> splitArr = line.split('\\|');
    if (splitArr.size() == 6 || splitArr.size() == 5) {
      LogLineSchema lls = new LogLineSchema();
      lls.type = 'VARAS';
      lls.varName = splitArr[3];
      lls.varValue = splitArr[4];
      lls.lineNumber = splitArr[2];
      addToUnit(lls);
    }
  }

  private static void addToUnit(LogLineSchema lls) {
    /*
     * 1. Check the correct codeunit/MethodUnit and add the logLine to the codeunit/MethodUnit
     */
    if (!utilityVariables.methodUnitsStack.isEmpty()) {
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
