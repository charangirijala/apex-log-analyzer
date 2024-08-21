global class StmtExecuteLinesSchema {
  public StmtExecuteLinesSchema() {
  }
  /*
   * 1. @Variable stmtsExecuted Static string variable which is used store all the lines exectued
   * 2. @Method addLine method to add the line numbers to the variable
   * 3. @Method reset method to clear all the lines added to stmtsExecuted
   * 4. @Method commitToCU method to add the stmtsExecuted variable to the current CodeUnit
   */

  public static String stmtsExecuted = 'Lines Executed- ';

  /*
   * 1. gets input the line number add it to stmtsExecuted
   */
  public static void addLine(string lineNumber) {
    if (stmtsExecuted == 'Lines Executed- ') {
      stmtsExecuted += lineNumber;
    } else {
      stmtsExecuted += ', ' + lineNumber;
    }
  }

  /*
   * 1. reset the stmtExecuted to 'Lines Executed- '
   */
  public static void reset() {
    stmtsExecuted = 'Lines Executed- ';
  }

  /*
   * 1. commit the stmtsExecuted to the current codeUnit
   * 2. Get the top of stack and push the stmtsExecuted to ExecutedLineAndSubUnitSchema
   */
  public static void commitToCU() {
    if (!utilityVariables.codeUnitsStack.isEmpty()) {
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = stmtsExecuted;
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
      //reset the stmtExecuted
      StmtExecuteLinesSchema.reset();
    }
  }
}
