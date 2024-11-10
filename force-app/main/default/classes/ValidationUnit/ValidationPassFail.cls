public class ValidationPassFail {
  public static void processValidationPass(String line) {
    /*
     * Create a logLine to push to current validation Method Unit
     */
    LogLineSchema logLine = new LogLineSchema();
    logLine.type = 'VALPS';
    logLine.isValidRulePass = true;
    pushLogLineAndPop(logLine);
  }
  public static void processValidationFail(String line) {
    /*
     * Create a logLine to push to current validation Method Unit
     */
    LogLineSchema logLine = new LogLineSchema();
    logLine.type = 'VALFL';
    logLine.isValidRulePass = false;
    pushLogLineAndPop(logLine);
  }

  private static void pushLogLineAndPop(LogLineSchema log) {
    /*
     * 1. Get Current MethodUnit and push elss & make hasError true/false for that unit
     * 2. Pop the current methodUnit
     */

    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      /**
       * Get the top of methodUnitsStack and push it to current method Unit
       */
      MethodSchema currentMethodUnit = (MethodSchema) utilityVariables.methodUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current MethodUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = log;
      //Add elsss to currentMenthodUnit
      currentMethodUnit.executedLinesAndSubUnits.add(elss);
      if (log.isValidRulePass) {
        currentMethodUnit.hasError = false;
      } else {
        currentMethodUnit.hasError = true;
      }
      //System.debug('Pushed to Current MethoDUnit');
      //update currentLog
      utilityVariables.currentLog = log;

      /*
       * Pop the methodunit from Stack
       */
      utilityVariables.methodUnitsStack.pop();
    }
  }
}
