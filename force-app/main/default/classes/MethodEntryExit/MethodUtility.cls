public class MethodUtility {
  /*
   * 1. line must be validated and call other function
   */
  public static void processMethodEntry(String line, String pattern) {
    /*
     * 1. write logic according to the pattern
     * 2. If Method generic then get all the data like methodName,methodTitle etc
     */
    if (pattern == 'Method-Generic') {
      //call the processMethodGeneric method
      processMethodGeneric(line);
    } else if (pattern == 'Method-System') {
    }
  }

  /*
   * 1. This method adds the methodunit to the Stack of method Units
   * 2. This method also adds the methodUnit to the current executing codeUnit
   */
  private static void addMethodToStack(MethodSchema methodUnit) {
    utilityVariables.methodUnitsStack.push(methodUnit);
    //Get Current Executing codeUnit
    CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
    //create a new ExecutingLineAndSubUnitSchema and push it to the current codeUnit
    ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
    elss.methodUnit = methodUnit;
    //Add the elss to the currentCodeUnit
    currentCodeUnit.executedLinesAndSubUnits.add(elss);
  }

  /*
   * Line Example: 22:11:59.1 (895268244)|METHOD_ENTRY|[33]|01pdM000006G137|apexLogTryController.levelOneCheck(String)
   */
  private static void processMethodGeneric(String line) {
    MethodSchema methodUnit = new MethodSchema();
    List<String> splitArr = line.split('\\|');
    methodUnit.methodTitle = splitArr[splitArr.size() - 1];
    methodUnit.methodName = methodUnit.methodTitle.substringAfterLast('.');
    System.debug('Size of the split:' + splitArr.size());
    if (splitArr.size() == 5) {
      methodUnit.classId = splitArr[splitArr.size() - 2];
    }
    //Once methodUnit is completed push it to methodUnitsStack
    addMethodToStack(methodUnit);
  }
}
