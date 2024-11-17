public class FatalErrorUtility {
  public static void processFatalError(String line) {
    /*
     * Call the analyzeError method to get the error message
     */
    analyzeError(line);
  }

  private static void analyzeError(String line) {
    /*
     * 1. Get the errorMessage from the line
     * 2. Set the type tp FAERR
     * 3. Push LogLine to current CodeUnit/MethodUnit
     */

    String errMsg = line.substringAfter('FATAL_ERROR|');
    LogLineSchema logLine = new LogLineSchema();
    logLine.type = 'FAERR';
    logLine.errorMessage = errMsg;
    pushLogLine(logLine);
  }

  private static void pushLogLine(LogLineSchema log) {
    /*
     * 1. Get Current Codeunit/MethodUnit and push elss & make hasError true for that unit
     * 2. Update the currentLog variable
     */
    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      /**
       * Get the top of methodUnitsStack and push it to current method Unit
       */

      MethodSchema currentMethodUnit = (MethodSchema) utilityVariables.methodUnitsStack.peek();
      currentMethodUnit.hasError = true;
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = log;
      //Add elsss to currentMenthodUnit
      currentMethodUnit.executedLinesAndSubUnits.add(elss);
      //update currentLog
      utilityVariables.currentLog = log;
    } else if (!utilityVariables.codeUnitsStack.isEmpty()) {
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current codeUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      currentCodeUnit.hasError = true;
      elss.logLine = log;
      //Add the elss to the currentCodeUnit
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
      //update currentLog
      utilityVariables.currentLog = log;
    }
  }

  public static void processMiscFatalError(String line) {
    //push the line to the currentLog
    String errMsg = utilityVariables.currentLog.errorMessage + '\n' + line;
    utilityVariables.currentLog.errorMessage = errMsg;
  }
}
