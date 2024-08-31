public class MethodSchema {
  public MethodSchema() {
    //Invoking executedLinesAndSubUnits in constructor
    executedLinesAndSubUnits = new List<ExecutedLineAndSubUnitSchema>();
  }

  //Actual Name of the method
  @AuraEnabled
  public String methodName;
  //Total name of the method invoked with class and namespaces
  @AuraEnabled
  public String methodTitle;
  //Id of the class from which method Invoked
  @AuraEnabled
  public String classId;

  @AuraEnabled
  public List<ExecutedLineAndSubUnitSchema> executedLinesAndSubUnits;
}
