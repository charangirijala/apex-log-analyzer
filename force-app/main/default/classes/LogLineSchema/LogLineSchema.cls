public class LogLineSchema {
  /*
   * type- If the logLine is either debug or variable assignment or others.
   * loggingLevel- If the logLine is either error,warn,info,debug etc
   * userDebugMessage- The message that is logged in USER_DEBUG
   * lineNumber- Line number of the debug log
   */
  @AuraEnabled
  public String type;
  @AuraEnabled
  public String loggingLevel;
  @AuraEnabled
  public String userDebugMessage;
  @AuraEnabled
  public String lineNumber;
  //Added for VARIABLE_SCOPE_BEGIN
  @AuraEnabled
  public String varName;
  //Added for VARIABLE_SCOPE_BEGIN
  @AuraEnabled
  public String varType;
  //Added for VARIABLE_ASSIGNMENT
  @AuraEnabled
  public String varValue;
  //Added for VARIABLE_SCOPE_BEGIN
  @AuraEnabled
  public Boolean isVarStatic;
  //Added for VARIABLE_SCOPE_BEGIN
  @AuraEnabled
  public Boolean isVarAccessible;
  //Added for FATAL_ERROR
  @AuraEnabled
  public String errorMessage;
  //Added for Validation Pass or fail
  @AuraEnabled
  public Boolean isValidRulePass;
  //Added for Flow ruleName is both for element and rule
  @AuraEnabled
  public String ruleName;
  @AuraEnabled
  public Boolean isFlowElement;
}
