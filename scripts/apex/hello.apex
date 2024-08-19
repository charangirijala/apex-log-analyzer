ContentVersion file = [
  SELECT Title, VersionData
  FROM ContentVersion
  WHERE ContentDocument.id = '069dM000005ivlNQAQ'
];
Blob myBlob = file.VersionData;
System.debug('Blob Size is::' + myBlob.size());
try {
  String rawDataString = myBlob.toString();
  System.debug('Length of Raw String: ' + rawDataString.length());
  //Instaniate a ResultSchema Object to send to Client
  resultSchema result = new resultSchema();
  UtilityRowIterator r = new UtilityRowIterator(rawDataString, '\n');
  while (r.hasNext()) {
    String line = r.next();
    /*
     * The line must be either:
     * 1. Profiling Info
     * 2. Standard Expression
     * 3. Execute Anonymous Code
     * 4. Normal Pattern less line
     */
    if (utilityVariables.profilingRegex.matcher(line).matches()) {
      /*
       * 1. Call processApexProfilingCategories() to process data and update @apiVersion and @apexProfilingCategories
       * 2. Update the profiling info in ResultSchema Object
       */
      UtilityMethods.processApexProfilingCategories(line);
      result.profilingInfo = utilityVariables.apexProfilingCategories;
      result.apiVersion = utilityVariables.apiVersion;
    } else if (utilityVariables.standExpRegex.matcher(line).matches()) {
      /*
       *
       */
    } else if (utilityVariables.execAnRegex.matcher(line).matches()) {
      /*
       * 1. Store all the execute anonymous statements in list<String> static variable ExecAnStatements by calling processExecAnStatements
       * 2. add the list to result executeAnonyCode field
       */
      UtilityMethods.processExecAnStatements(line);
      result.executeAnonyCode = utilityVariables.ExecAnStatements;
    } else {
      /*
       *1. No pattern matched for the line
       */
    }
  }

  System.debug('Final Result after Log Processing: ' + result);
} catch (StringException e) {
  System.debug(
    'String max characters(6000000) limit exceeded: ' + e.getMessage()
  );
}
