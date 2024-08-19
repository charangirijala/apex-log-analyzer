public class resultSchema {
  @AuraEnabled
  public String apiVersion;
  @AuraEnabled
  public Map<String, String> profilingInfo;
  @AuraEnabled
  public List<CodeUnitContainerSchema> codeUnits;
  @AuraEnabled
  public List<String> executeAnonyCode;
}
