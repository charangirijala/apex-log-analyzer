public class ClientInputHandler {
  @AuraEnabled(cacheable=true)
  public static string callApexFromClient(Object requestData) {
    System.debug('Request Recieved: ' + requestData);
    return 'Request Recieved';
  }
}
