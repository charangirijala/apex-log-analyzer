public class flowUtility {
  //extracting the Flow ID and storing it in Utility variable flowId
   public static void analyzeFlowStart(String line) {
     List<String> splitArr = line.split('\\|');
     utilityVariables.flowId = splitArr[splitArr.size() - 2];
   }

  //pushing the method to Stack i.e each flow under a particular object
  public static void analyzeFlowName(String line) {
    MethodSchema methodUnit = new MethodSchema();
    methodUnit.type = 'Flow';
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
       logLine.elementType = splitArr.size()==4 ? splitArr[splitArr.size() - 2]: +splitArr[splitArr.size() - 2];
       logLine.ruleName  = splitArr.size()==4 ? 'Bulk Element '+splitArr[splitArr.size() - 1]+' Has started': 'Element '+splitArr[splitArr.size() - 1]+ ' has Started';
       pushVal(logLine);
   }
   public static void removeElement(String line) {
      List<String> splitArr = line.split('\\|');    
       LogLineSchema logLine = new LogLineSchema();
       logLine.type = 'FLOEL';
       logLine.isFlowElement = true;
       //logLine.elementType = splitArr.size()==6 ? 'Bulk ' +splitArr[splitArr.size() - 4] + ' End' : splitArr[splitArr.size() - 2] + ' End';
       logLine.ruleName  = splitArr.size()==6 ?'Bulk Element '+ splitArr[splitArr.size() -3]+' has Ended':'Element '+splitArr[splitArr.size() -1]+' has Ended';
       pushVal(logLine);
   }
   public static void addvalue(String line) {
     List<String> splitArr = line.split('\\|');
     LogLineSchema logLine = new LogLineSchema();
     logLine.type = 'FLORL';
     logLine.isInFlow = true;
     logLine.ruleName  = 'The outcome '+splitArr[splitArr.size() - 2] +' in above element is set to ' +splitArr[splitArr.size() - 1];
     pushVal(logLine);
   }
   public static void isError(String line) {
    List<String> splitArr = line.split('\\|');
    LogLineSchema logLine = new LogLineSchema();
    logLine.type = 'FLOER';
    logLine.isInFlow = true;
    logLine.isError=true;
    logLine.ruleName  = 'The element ('+splitArr[splitArr.size() - 1] +') '+splitArr[splitArr.size() - 2] +' caused an Error. Error Message - '+ splitArr[splitArr.size() - 3];
    pushVal(logLine);
  }
  public static void actionDetail(String line) {
    List<String> splitArr = line.split('\\|');
    LogLineSchema logLine = new LogLineSchema();
    logLine.type = 'FLOAC';
    logLine.isInFlow = true;
    logLine.ruleName  = splitArr.size()==8 ? 'Action Type - '+splitArr[splitArr.size() -4] +', Action Name - '+splitArr[splitArr.size() -3] +', Is Action Success - '+splitArr[splitArr.size() -2] +', Error Message - '+splitArr[splitArr.size() -1]:
    'Action Type - '+splitArr[splitArr.size() -3] +', Action Name - '+splitArr[splitArr.size() -2] +', Is Action Success - '+splitArr[splitArr.size() -1];
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