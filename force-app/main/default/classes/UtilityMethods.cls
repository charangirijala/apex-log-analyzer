public class UtilityMethods {
  /**
   * @description This method is used to extract profiling info of the logs. It also extracts apiVersion
   * @param line
   * @return void
   **/
  public static void processApexProfilingCategories(String line) {
    List<String> splitForApi = line.split(' ');
    utilityVariables.apiVersion = splitForApi[0];
    String restOfLine = splitForApi[1];

    List<String> categoryPairs = restOfLine.split(';');
    for (String pair : categoryPairs) {
      List<String> temp = pair.split(',');
      String category = temp[0];
      String value = temp[1];
      if (utilityVariables.apexProfilingCategories.containsKey(category)) {
        utilityVariables.apexProfilingCategories.put(category, value);
        //System.debug('CATEGORY: ' + category + ' VALUE: ' + value);
      }
    }
  }

  /*
   * @description This method collects all the execute anonymous statements
   * Execute Anonymous: ContentVersion file = [
   * Execute Anonymous:   SELECT Title, VersionData
   * Execute Anonymous:   FROM ContentVersion
   * Execute Anonymous:   WHERE ContentDocument.id = '069dM000005ivlNQAQ'
   * Execute Anonymous: ];
   */
  public static void processExecAnStatements(String line) {
    String s = 'Execute Anonymous: ContentVersion file = [';
    List<String> splitArr = s.split('^(Execute\\sAnonymous:\\s)');
    utilityVariables.ExecAnStatements.add(splitArr[1]);
  }
}
