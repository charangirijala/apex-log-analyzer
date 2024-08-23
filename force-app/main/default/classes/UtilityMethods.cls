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
    //Store the result in the resultSchema object
    utilityVariables.result.profilingInfo = utilityVariables.apexProfilingCategories;
    utilityVariables.result.apiVersion = utilityVariables.apiVersion;
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
    List<String> splitArr = line.split('^(Execute\\sAnonymous:\\s)');
    utilityVariables.ExecAnStatements.add(splitArr[1]);
    //Store the result in the resultSchema object
    utilityVariables.result.executeAnonyCode = utilityVariables.ExecAnStatements;
  }

  /*
   * @description this method pops the stack top and codeUnit ends here
   */
  public static void processCodeUnitEnd() {
    if (!utilityVariables.codeUnitsStack.isEmpty()) {
      utilityVariables.codeUnitsStack.pop();
    }
  }

  /*
   * @description this method process the logs and prepares the resultSchema object
   * @param line
   * @return void
   */
  public static void processStmtExecute(String line) {
    /*
     * The below method adds the line number to the stmtsExecuted String
     */
    // System.debug('Entered stmt Execute');
    StmtExecuteLinesSchema.addLineNumber(line);
    /*
     * As of now line by line stmt Execute methods are being added instead of group simultaneous stmt Execute lines
     */
    StmtExecuteLinesSchema.commitToCU();
  }

  /*
   * @description this method process standard exp and finds the event of the line
   * Checks for the event in eventMasterData and process the event details
   */
  public static void processStandardExpStmts(String line) {
    List<String> splitArr = line.split('\\|');
    /*
     * 1. Every time you update currentLineEvent make sure previousLineEvent is also updated
     * 2. CurrentLineEvent=previousLineEvent
     * 3. Update currentLineEvent
     */
    utilityVariables.previousLineEvent = utilityVariables.currentLineEvent;
    utilityVariables.currentLineEvent = splitArr[1];
    Map<String, String> eventInfo = utilityVariables.eventMasterData.get(
      utilityVariables.currentLineEvent
    );
    if (eventInfo != null) {
      //Get all the regex for the event
      Set<String> regexSet = eventInfo.keySet();

      for (String regex : regexSet) {
        Pattern compiledRegex = Pattern.compile(regex);
        if (compiledRegex.matcher(line).matches()) {
          /*
           * Compare each event and process the line
           */
          if (utilityVariables.currentLineEvent == 'CODE_UNIT_STARTED') {
            /*
             * Call the getCodeUnitDetails method and update the stack
             * @param String line
             * @param String eventInfo.get(regex) -> this returns the pattern name of the matched regex
             */
            utilityVariables.getCodeUnitDetails(line, eventInfo.get(regex));
          } else if (
            utilityVariables.currentLineEvent == 'CODE_UNIT_FINISHED'
          ) {
            /*
             * 1. call the processCodeUnitEnd method
             * 2. It removes the stack top and finish the codeUnit
             */
            UtilityMethods.processCodeUnitEnd();
          } else if (utilityVariables.currentLineEvent == 'STATEMENT_EXECUTE') {
            /*
             * 1. Validate the statement and get the execute line
             * 2. Check if previous line is also having same event
             * 3. If not push to the codeUnit
             * 4. The above logic in processStmtExecute
             */
            //UtilityMethods.processStmtExecute(line);
          } else if (utilityVariables.currentLineEvent == 'METHOD_ENTRY') {
            /*
             * 1. Validate line and get the method name,title and class Id
             * 2. Push it on to the methodStack
             * Call the method from MethodUtility class
             * @param String line
             * @param String eventInfo.get(regex) -> this returns the pattern name of the matched regex
             */
            MethodUtility.processMethodEntry(line, eventInfo.get(regex));
          } else if (utilityVariables.currentLineEvent == 'METHOD_EXIT') {
            System.debug('METHOD_EXIT detected');
          }
        }
      }
    } else {
      /*
       * NO event found in eventMasterData add more events to the master in future and
       * not to worry about it
       */
    }
  }
}
