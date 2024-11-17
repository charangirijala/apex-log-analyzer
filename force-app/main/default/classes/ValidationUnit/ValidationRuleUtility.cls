public class ValidationRuleUtility {
  public static void processValidationRule(String line) {
    /**
     * Extract the Rulename and Rule 18-digit Id
     */
    analyzeValidation(line);
  }

  /*
   * Example: 08:03:48.0 (436291)|VALIDATION_RULE|03dIR000000cCy7|Delivery_Schedule_14_Days_Or_Less
   * Extract name and Id
   * Create a new MethodUnit and send to addMethodtoStack
   */
  private static void analyzeValidation(String line) {
    MethodSchema methodUnit = new MethodSchema();
    methodUnit.type = 'Validation Rule';
    List<String> splitArr = line.split('\\|');
    methodUnit.methodName = splitArr[splitArr.size() - 1];
    methodUnit.ruleId = splitArr[splitArr.size() - 2];

    addMethodtoStack(methodUnit);
  }

  /*
   * We need to add methodUnit to only CodeUnit as the validation rules dosen't call another validation
   * Check if the current code unit type is validation and then push it
   */
  private static void addMethodtoStack(MethodSchema methodUnit) {
    if (!utilityVariables.codeUnitsStack.isEmpty()) {
      /**
       * Get the top of codeUnitsStack and push it to current method Unit
       */
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current codeUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.methodUnit = methodUnit;
      //Add the elss to the currentCodeUnit
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
      // System.debug('----Added methodUnit to current CodeUnit----');
      //Add methodUnit to stack
      utilityVariables.methodUnitsStack.push(methodUnit);
    }
  }
}
