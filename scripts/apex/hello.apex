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
  UtilityRowIterator r = new UtilityRowIterator(rawDataString, '\n');
  while (r.hasNext()) {
    String lineRaw = r.next();
    /*
     * Replace all the &#124; to pipe for each line
     * The line must be either:
     * 1. Profiling Info
     * 2. Standard Expression
     * 3. Execute Anonymous Code
     * 4. Normal Pattern less line
     */
    String line = lineRaw.replaceAll('&#124;', '|');
    if (utilityVariables.profilingRegex.matcher(line).matches()) {
      /*
       * 1. Call processApexProfilingCategories() to process data and update @apiVersion and @apexProfilingCategories
       * 2. Update the profiling info in ResultSchema Object
       */
      UtilityMethods.processApexProfilingCategories(line);
    } else if (utilityVariables.standExpRegex.matcher(line).matches()) {
      /*
       * 1. Since it matches Standard exp each line should be matched with eventMasterData to find out event and process the data
       * 2. Call processStandardExpStmts()
       */
      UtilityMethods.processStandardExpStmts(line);
    } else if (utilityVariables.execAnRegex.matcher(line).matches()) {
      /*
       * 1. Store all the execute anonymous statements in list<String> static variable ExecAnStatements by calling processExecAnStatements
       * 2. add the list to result executeAnonyCode field
       */
      UtilityMethods.processExecAnStatements(line);
    } else {
      /*
       *1. No pattern matched for the line
       */
    }
  }

  System.debug(
    'Final check for Stack size: ' + utilityVariables.codeUnitsStack.size()
  );

  System.debug('Final Result after Log Processing: ' + utilityVariables.result);
  System.debug(
    'Final Result in JSON: ' + JSON.serialize(utilityVariables.result)
  );
} catch (StringException e) {
  System.debug(
    'String max characters(6000000) limit exceeded: ' + e.getMessage()
  );
}
