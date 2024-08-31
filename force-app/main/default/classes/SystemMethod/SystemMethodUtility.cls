public class SystemMethodUtility {
  /*
   * 1. This method is called from
   */
  public static void processSystemMethodEntry(String line, String pattern) {
    if (pattern == 'System-Method-Single') {
      SystemMethodUtility.addMethodtoUnit(line);
    }
  }

  /*
   * 1. Get the method executing in the line
   * 2. Get the current code Unit/Method Unit and push this line
   */
  private static void addMethodtoUnit(String line) {
    String methodName = line.substringAfterLast('|');
    MethodSchema methodInstance = new MethodSchema();
    methodInstance.methodTitle = 'System Method';
    methodInstance.methodName = methodName;

    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      /**
       * Get the top of methodUnitsStack and push it to current method Unit
       */
      MethodSchema currentMethodUnit = (MethodSchema) utilityVariables.methodUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current MethodUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.methodUnit = methodInstance;
      //Add elsss to currentMenthodUnit
      currentMethodUnit.executedLinesAndSubUnits.add(elss);
    } else if (!utilityVariables.codeUnitsStack.isEmpty()) {
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current codeUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.methodUnit = methodInstance;
      //Add the elss to the currentCodeUnit
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
    }
  }
}
