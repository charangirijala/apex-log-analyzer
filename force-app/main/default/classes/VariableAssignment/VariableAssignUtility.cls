public class VariableAssignUtility {
  public static void processVariableAssignment(String line, String pattern) {
    if (pattern == 'Variable-No-Address') {
      VariableAssignUtility.analyzeVarNoAdd(line);
    } else if (pattern == 'Variable-With-Address') {
      VariableAssignUtility.analyzeVarWithAdd(line);
    }
  }

  private static void analyzeVarNoAdd(String line) {
  }

  private static void analyzeVarWithAdd(String line) {
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
    } else if (!utilityVariables.codeUnitsStack.isEmpty()) {
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current codeUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = lls;
      //Add the elss to the currentCodeUnit
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
    }
  }
}
