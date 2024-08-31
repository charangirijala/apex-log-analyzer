public class ProcessBatch implements Database.Batchable<String>, Database.Stateful {
  private List<String> rawDataList = new List<String>();

  //State is preserved for this variable and is used as the final result send to client(Static variables don't work here)
  private resultSchema result = new resultSchema();

  public ProcessBatch(String data) {
    System.debug('-----Start of ProcessBatch Constructor-----');
    this.result = utilityVariables.result;
    this.result.apiVersion = '99.0';
    this.rawDataList = new List<String>();
    UtilityRowIterator ur = new UtilityRowIterator(data, '\n');
    while (ur.hasNext()) {
      this.rawDataList.add(ur.next());
    }
    System.debug('-----End of ProcessBatch Constructor-----');
  }

  public Iterable<String> start(Database.BatchableContext bc) {
    System.debug('-----Start of ProcessBatch start----');
    System.debug('-----End of ProcessBatch start----');
    return this.rawDataList;
  }

  public void execute(Database.BatchableContext bc, List<String> logBatch) {
    System.debug('-----Start of ProcessBatch execute----');
    /*
     * Replace all the &#124; to pipe for each line
     * The line must be either:
     * 1. Profiling Info
     * 2. Standard Expression
     * 3. Execute Anonymous Code
     * 4. Normal Pattern less line
     */

    for (String lineRaw : logBatch) {
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
      'In Execute method: CodeUnits: ' + utilityVariables.codeUnitsStack.size()
    );
    System.debug('In execute method: Result:' + utilityVariables.result);
    System.debug(
      'In execute method: Result JSON: ' +
      JSON.serialize(utilityVariables.result)
    );

    //Change value in execute
    this.result.executeAnonyCode = new List<String>{
      'Dummy List1',
      'Dummy List2'
    };
    System.debug('-----End of ProcessBatch execute----');
  }

  public void finish(Database.BatchableContext bc) {
    System.debug('-----Start of ProcessBatch finish----');
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
    System.debug(
      'Heap Size used: ' +
        System.Limits.getHeapSize() +
        ' of ' +
        System.Limits.getLimitHeapSize()
    );
    System.debug('Final Result after Log Processing: ' + this.result);
    System.debug('Final Result in JSON: ' + JSON.serialize(this.result));
    System.debug('-----End of ProcessBatch finish----');
  }
}
