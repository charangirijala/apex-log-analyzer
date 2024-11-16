public class MethodSchema {
  public MethodSchema() {
    //Invoking executedLinesAndSubUnits in constructor
    executedLinesAndSubUnits = new List<ExecutedLineAndSubUnitSchema>();
  }

  //Actual Name of the method/Validation Rule
  @AuraEnabled
  public String methodName;
  //Total name of the method invoked with class and namespaces
  @AuraEnabled
  public String methodTitle;
  //18-digit Id of validation rule also Id for flow
  @AuraEnabled
  public String ruleId;
  //Id of the class from which method Invoked
  @AuraEnabled
  public String classId;
  //parameters of constructor
  @AuraEnabled
  public string constrParams;
  //Added for FATAL_ERROR to check if the current methodUnit has error
  @AuraEnabled
  public Boolean hasError;
  @AuraEnabled
  public List<ExecutedLineAndSubUnitSchema> executedLinesAndSubUnits;
}
