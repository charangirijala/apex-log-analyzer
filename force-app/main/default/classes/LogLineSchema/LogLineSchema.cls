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
}
