public class ProcessLogEntry {
  public static resultSchema processLog(List<String> logArr) {
    try {
      Integer numberOfLines = 0;
      // List<String> logList = new List<String>();
      //Execute batch class
      // ProcessBatch batchJob = new ProcessBatch(rawDataString);
      // Database.executeBatch(batchJob, 5000);
      for (Integer i = 0; i < logArr.size(); i++) {
        numberOfLines++;
        String lineRaw = logArr[i];
        // logList.add(lineRaw);
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
          // System.debug('STD Exp Matched....');
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
          UtilityMethods.processMiscLines(line);
        }
      }
      System.debug('Total number of lines processed: ' + numberOfLines);
      System.debug(
        'Final check for CodeUnits Stack size: ' +
        utilityVariables.codeUnitsStack.size()
      );
      System.debug(
        'Final check for MethodUnits Stack size: ' +
        utilityVariables.methodUnitsStack.size()
      );
      System.debug(
        'CPU used: ' +
          System.Limits.getCpuTime() +
          ' of ' +
          System.Limits.getLimitCpuTime()
      );
      //   System.debug('Blob Size is:' + myBlob.size());
      System.debug(
        'Heap Size used: ' +
          System.Limits.getHeapSize() +
          ' of ' +
          System.Limits.getLimitHeapSize()
      );
      System.debug(
        'Final Result in JSON: ' + JSON.serialize(utilityVariables.result, true)
      );
    } catch (StringException e) {
      System.debug(
        'String max characters(6000000) limit exceeded: ' + e.getMessage()
      );
    }

    return utilityVariables.result;
  }
}
