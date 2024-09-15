public class ClientInputHandler {
  public class requestSchema {
    public List<String> debugLogData;
  }

  @AuraEnabled(cacheable=true)
  public static resultSchema callApexFromClient(String requestData) {
    String rawLogData;
    //process results based on request data type
    requestSchema req = (requestSchema) JSON.deserialize(
      requestData,
      requestSchema.class
    );
    // System.debug('Requestbody is: ' + req.debugLogData);
    System.debug('Requestbody LogArr size: ' + req.debugLogData.size());
    resultSchema res = ProcessLogEntry.processLog(req.debugLogData);
    return res;
  }
}
