public class flowUtility {
  //extracting the Flow ID and storing it in Utility variable flowId
   public static void analyzeFlowStart(String line) {
     List<String> splitArr = line.split('\\|');
     utilityVariables.flowId = splitArr[splitArr.size() - 2];
   }

  //pushing the method to Stack i.e each flow under a particular object
  public static void analyzeFlowName(String line) {
    MethodSchema methodUnit = new MethodSchema();
    List<String> splitArr = line.split('\\|');
    methodUnit.methodName = splitArr[splitArr.size() - 1];
    methodUnit.ruleId = utilityVariables.flowId;
    addMethodtoStack(methodUnit);
  }

   public static void addElement(String line) {
       List<String> splitArr = line.split('\\|');    
       LogLineSchema logLine = new LogLineSchema();
       logLine.type = 'FLOEL';
       logLine.isFlowElement = true;
       logLine.ruleName  = splitArr[splitArr.size() -1] +' ' +splitArr[splitArr.size() - 2];
       pushVal(logLine);
   }
   public static void removeElement() {

   }
   public static void addvalue(String line) {
     List<String> splitArr = line.split('\\|');
     LogLineSchema logLine = new LogLineSchema();
     logLine.type = 'FLORL';
     logLine.isFlowElement = true;
     logLine.ruleName  = splitArr[splitArr.size() - 2] +' ' +splitArr[splitArr.size() - 1];
     pushVal(logLine);
   }
   public static void popMethodUnit(){
    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      utilityVariables.methodUnitsStack.pop();
    }
   }
   //adding the existing flow to method stack and codeunit
  private static void addMethodtoStack(MethodSchema methodUnit) {
    if (!utilityVariables.codeUnitsStack.isEmpty()) {
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.methodUnit = methodUnit;
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
      utilityVariables.methodUnitsStack.push(methodUnit);
      }
  }

  private static void pushVal(LogLineSchema log) {
    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      MethodSchema currentMethodUnit = (MethodSchema) utilityVariables.methodUnitsStack.peek();
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = log;
      currentMethodUnit.executedLinesAndSubUnits.add(elss);
      utilityVariables.currentLog = log;
    }
  }
}