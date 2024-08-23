public class MethodSchema {
  //Actual Name of the method
  @AuraEnabled
  public String methodName;
  //Total name of the method invoked with class and namespaces
  @AuraEnabled
  public String methodTitle;
  //Id of the class from which method Invoked
  @AuraEnabled
  public String classId;
}
