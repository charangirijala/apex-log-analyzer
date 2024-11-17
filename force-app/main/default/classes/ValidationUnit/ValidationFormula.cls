public class ValidationFormula {
  public static void processValidationFormula(String line) {
    /*
     * Call the analyzeError method to get formula
     */
    analyzeValidation(line);
  }

  private static void analyzeValidation(String line) {
    /*
     * 1. Get the formula from the line
     * 2. Set the type tp VALFR
     * 3. Push LogLine to current MethodUnit
     */

    String formula = line.substringAfter('VALIDATION_FORMULA|');
    LogLineSchema logLine = new LogLineSchema();
    logLine.type = 'VALFR';
    logLine.valFor = formula;
    pushLogLine(logLine);
  }

  private static void pushLogLine(LogLineSchema log) {
    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      MethodSchema currentMethodUnit = (MethodSchema) utilityVariables.methodUnitsStack.peek();
      currentMethodUnit.hasError = true;
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = log;
      //Add elsss to currentMenthodUnit
      currentMethodUnit.executedLinesAndSubUnits.add(elss);
      //update currentLog
      utilityVariables.currentLog = log;
    }
  }

  public static void processMiscValidationFormula(String line) {
    String formula = utilityVariables.currentLog.valFor + '\n' + line;
    utilityVariables.currentLog.valFor = formula;
  }
}
