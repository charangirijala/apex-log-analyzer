public class ClientInputHandler {
  public class requestSchema {
    public String type;
    public String debugLogData;
    public Blob fileData;
  }

  @AuraEnabled(cacheable=true)
  public static resultSchema callApexFromClient(String requestData) {
    String rawLogData;
    //process results based on request data type
    requestSchema req = (requestSchema) JSON.deserialize(
      requestData,
      requestSchema.class
    );
    if (req.type == 'text') {
      rawLogData = req.debugLogData;
    } else if (req.type == 'base64') {
      rawLogData = req.fileData.toString();
    }
    resultSchema res = ProcessLogEntry.processLog(rawLogData);

    return res;
  }
}
