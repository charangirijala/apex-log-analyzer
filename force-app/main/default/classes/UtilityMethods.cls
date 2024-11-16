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
    // utilityVariables.result.profilingInfo = utilityVariables.apexProfilingCategories;
    // utilityVariables.result.apiVersion = utilityVariables.apiVersion;

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
    // utilityVariables.result.executeAnonyCode = utilityVariables.ExecAnStatements;
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
   * @description This method analyzes lines which dosent match any regex and adds them to the current LogLine
   * Example : debug stmts having more than one line: All the unidentified stmts below USER_DEBUG and pushed into the logLine
   * @param line
   * @return void
   */
  public static void processMiscLines(String line) {
    /*
     * 1. Check for the currentEvent and process acccordingly
     */
    if (
      utilityVariables.currentLineEvent == 'USER_DEBUG' &&
      utilityVariables.currentLog != null &&
      utilityVariables.currentLog.type == 'DEBUG'
    ) {
      // System.debug('processMiscUserDebug is called..');
      UserDebugUtility.processMiscUserDebug(line);
    } else if (
      utilityVariables.currentLineEvent == 'FATAL_ERROR' &&
      utilityVariables.currentLog != null &&
      utilityVariables.currentLog.type == 'FAERR'
    ) {
      FatalErrorUtility.processMiscFatalError(line);
    }
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
           * Prevent the event from being processed again
           * Compare each event and process the line
           */
          if (utilityVariables.currentLineEvent == 'CODE_UNIT_STARTED') {
            /*
             * Call the getCodeUnitDetails method and update the stack
             * @param String line
             * @param String eventInfo.get(regex) -> this returns the pattern name of the matched regex
             */
            utilityVariables.getCodeUnitDetails(line, eventInfo.get(regex));
            break;
          } else if (
            utilityVariables.currentLineEvent == 'CODE_UNIT_FINISHED'
          ) {
            /*
             * 1. call the processCodeUnitEnd method
             * 2. It removes the stack top and finish the codeUnit
             */
            UtilityMethods.processCodeUnitEnd();
            break;
          } else if (
            utilityVariables.currentLineEvent == 'VARIABLE_SCOPE_BEGIN'
          ) {
            /*
             * 1. Get the variable details and create a logLine
             * 2. Push the variable to the current CodeUnit/MethodUnit
             */
            VariableScopeUtility.processVariableScope(line);
            break;
          } else if (
            utilityVariables.currentLineEvent == 'VARIABLE_ASSIGNMENT'
          ) {
            /*
             * 1. Get the variable name and var value create a logLine
             * 2. Push the logLine to the current CodeUnit/MethodUnit
             */
            VariableAssignUtility.processVariableAssignment(
              line,
              eventInfo.get(regex)
            );
            break;
          } else if (utilityVariables.currentLineEvent == 'CONSTRUCTOR_ENTRY') {
            /*
             * 1. Use same methods as METHOD_ENTRY
             * 2. Process all details and call METHOD_ENTRY methods
             */
            ConstructorUtility.processConstructorEntry(line);
            break;
          } else if (utilityVariables.currentLineEvent == 'CONSTRUCTOR_EXIT') {
            /*
             * 1. Use same methods as METHOD_EXIT
             */
            ConstructorUtility.processConstructorExit();
            break;
          } else if (utilityVariables.currentLineEvent == 'STATEMENT_EXECUTE') {
            /*
             * 1. Validate the statement and get the execute line
             * 2. Check if previous line is also having same event
             * 3. If not push to the codeUnit
             * 4. The above logic in processStmtExecute
             */
            //UtilityMethods.processStmtExecute(line);
            break;
          } else if (utilityVariables.currentLineEvent == 'METHOD_ENTRY') {
            /*
             * 1. Validate line and get the method name,title and class Id
             * 2. Push it on to the methodStack
             * Call the method from MethodUtility class
             * @param String line
             * @param String eventInfo.get(regex) -> this returns the pattern name of the matched regex
             */
            MethodUtility.processMethodEntry(line, eventInfo.get(regex));
            break;
          } else if (utilityVariables.currentLineEvent == 'METHOD_EXIT') {
            /*
             * 1. Check the methodUnitsStack and pop the top
             */
            //System.debug('IN METHOD_EXIT');
            // System.debug('METHOD_EXIT LINE: ' + line);
            MethodUtility.processMethodExit();
            break;
            // System.debug('METHOD EXIT COMPLETE');
          } else if (
            utilityVariables.currentLineEvent == 'SYSTEM_METHOD_ENTRY'
          ) {
            /*
             * 1. Push the system method to the correct CodeUnit/MethodUnit
             */
            SystemMethodUtility.processSystemMethodEntry(
              line,
              eventInfo.get(regex)
            );
            break;
          } else if (utilityVariables.currentLineEvent == 'FATAL_ERROR') {
            FatalErrorUtility.processFatalError(line);
          } else if (utilityVariables.currentLineEvent == 'USER_DEBUG') {
            /*
             * 1. get the logging level and the log message and add it to logLine schemd of elss
             */
            UserDebugUtility.processUserDebug(line);
            break;
          } else if (utilityVariables.currentLineEvent == 'VALIDATION_RULE') {
            /*
             * 1. Create a new method unit in the name of validation
             */
            ValidationRuleUtility.processValidationRule(line);
            break;
          } else if (utilityVariables.currentLineEvent == 'VALIDATION_PASS') {
            /*
             * 1. Create a logline indicating validation passed
             * 2. pop the validation unit from the methodStack
             */
            ValidationPassFail.processValidationPass(line);
            break;
          } else if (utilityVariables.currentLineEvent == 'VALIDATION_FAIL') {
            /*
             * 1. Create a logline indicating validation failed
             * 2. pop the validation unit from the methodStack
             */
            ValidationPassFail.processValidationFail(line);
            break;
          } else if (utilityVariables.currentLineEvent == 'USER_INFO') {
            /*
             * 1. get user details and store in the userInfoSchema object and add it to result
             */
            UserInfoUtility.processUserInfo(line);
            break;
          }else if (utilityVariables.currentLineEvent == 'SOQL_EXECUTE_BEGIN') {
            /*
             * 1. Use same methods as METHOD_ENTRY
             * 2. Process all details and call METHOD_ENTRY methods
             */
            SoqlUtility.processSoqlbegin(line,eventInfo.get(regex));
            break;
          }else if (utilityVariables.currentLineEvent == 'SOQL_EXECUTE_END') {
            /*
             * 1. Use same methods as METHOD_EXIT
             */
            SoqlUtility.processSoqlExit(line,eventInfo.get(regex));
            break;
          }
           else if (utilityVariables.currentLineEvent == 'FLOW_CREATE_INTERVIEW_BEGIN') {
             flowUtility.analyzeFlowStart(line);
             break;
          }
          else if (utilityVariables.currentLineEvent == 'FLOW_CREATE_INTERVIEW_END') {
            flowUtility.analyzeFlowName(line);
            break;
          }
           else if (utilityVariables.currentLineEvent == 'FLOW_ELEMENT_BEGIN') {
             flowUtility.addElement(line);
             break;
           }
           else if (utilityVariables.currentLineEvent == 'FLOW_ELEMENT_END') {
             flowUtility.removeElement();
             break;
           }
           else if (utilityVariables.currentLineEvent == 'FLOW_BULK_ELEMENT_BEGIN') {
             /*
              * 1. Use same methods as FLOW_ELEMENT_BEGIN
              */
             flowUtility.addElement(line);
             break;
           }
           else if (utilityVariables.currentLineEvent == 'FLOW_BULK_ELEMENT_END') {
             /*
              * 1. Use same methods as FLOW_ELEMENT_END
              */
             flowUtility.removeElement();
             break;
           }
           else if (utilityVariables.currentLineEvent == 'FLOW_VALUE_ASSIGNMENT') {
           flowUtility.addvalue(line);
           break;
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
