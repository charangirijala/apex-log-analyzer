public class SoqlUtility {

  //11:43:50.1 (6696702)|SOQL_EXECUTE_BEGIN|[3]|Aggregations:0|SELECT Id FROM Opportunity
  public static void processSoqlbegin(String line, String pattern) {
    List<String> splitArr = line.split('\\|');
    if (splitArr.size() == 5) {
      LogLineSchema lls = new LogLineSchema();
      lls.type = 'SOQLB';
      lls.varName = splitArr[3];
      lls.varValue = splitArr[4];
      lls.lineNumber = splitArr[2];
      addToUnit(lls);
    }
  }
  //11:43:50.1 (14725333)|SOQL_EXECUTE_END|[3]|Rows:7
    public static void processSoqlExit(String line, String pattern) {
      List<String> splitArr = line.split('\\|');
      if (splitArr.size() == 4) {
        LogLineSchema lls = new LogLineSchema();
        lls.type = 'SOQLE';
        lls.varName = 'Retrieved';
        lls.varValue = splitArr[3];
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
