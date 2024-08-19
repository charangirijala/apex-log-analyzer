public class CodeUnitContainerSchema {
  public CodeUnitContainerSchema() {
    executedLinesAndSubUnits = new List<ExecutedLineAndSubUnitSchema>();
  }
  @AuraEnabled
  public String codeUnitType;
  @AuraEnabled
  public List<String> execAnoyCode;
  @AuraEnabled
  public String codeUnitName;
  @AuraEnabled
  public Boolean isTrigger;
  @AuraEnabled
  public String methodExecuting;
  @AuraEnabled
  public String classId;
  @AuraEnabled
  public String executingNamespace;
  @AuraEnabled
  public String triggerId;
  @AuraEnabled
  public String triggerObject;
  @AuraEnabled
  public String triggerEvent;
  @AuraEnabled
  public List<ExecutedLineAndSubUnitSchema> executedLinesAndSubUnits;
}
