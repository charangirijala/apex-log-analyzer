public class UserDebugUtility {
  public static void processUserDebug(String line) {
    /*
     * Call the analyzeLine method to process the event
     */
    // System.debug('In processUserDebug');
    analyzeLine(line);
  }

  private static void analyzeLine(String line) {
    /*
     * 1. Get the details of lineNumber,userDebugMessage,loggingLevel
     * 2. Set the type to DEBUG
     * 3. Push Logline to Current CodeUnit/MethodUnit
     */

    String lineData = line.substringAfter('USER_DEBUG|');
    List<String> Details = lineData.split('\\|');
    LogLineSchema logLine = new LogLineSchema();
    logLine.type = 'DEBUG';
    if (Details.size() > 2) {
      // System.debug('Analyzing the loggingLevel');
      logLine.lineNumber = Details[0];
      if (
        Details[1] == 'DEBUG' ||
        Details[1] == 'WARN' ||
        Details[1] == 'INFO' ||
        Details[1] == 'ERROR' ||
        Details[1] == 'FINER' ||
        Details[1] == 'FINEST' ||
        Details[1] == 'FINE' ||
        Details[1] == 'NONE'
      ) {
        logLine.loggingLevel = Details[1];
        String spliter = Details[1] + '|';
        logLine.userDebugMessage = lineData.substringAfter(spliter);
      }

      //Check if values are populated and push logLine
      if (logLine.userDebugMessage != null && logLine.loggingLevel != null) {
        pushLogLine(logLine);
      }
    }
  }

  private static void pushLogLine(LogLineSchema log) {
    /*
     * 1. Get Current Codeunit/MethodUnit and push elss
     * 2. Update the currentLog variable
     */

    if (!utilityVariables.methodUnitsStack.isEmpty()) {
      /**
       * Get the top of methodUnitsStack and push it to current method Unit
       */
      MethodSchema currentMethodUnit = (MethodSchema) utilityVariables.methodUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current MethodUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = log;
      //Add elsss to currentMenthodUnit
      currentMethodUnit.executedLinesAndSubUnits.add(elss);
      //System.debug('Pushed to Current MethoDUnit');
      //update currentLog
      utilityVariables.currentLog = log;
    } else if (!utilityVariables.codeUnitsStack.isEmpty()) {
      CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
      //create a new ExecutingLineAndSubUnitSchema and push it to the current codeUnit
      ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
      elss.logLine = log;
      //Add the elss to the currentCodeUnit
      currentCodeUnit.executedLinesAndSubUnits.add(elss);
      // System.debug('Pushed to Current CodeuNit');
      //update currentLog
      utilityVariables.currentLog = log;
    }
  }

  public static void processMiscUserDebug(String line) {
    //push the line to currentLog
    String logMessage =
      utilityVariables.currentLog.userDebugMessage +
      '\n' +
      line;
    // System.debug('Log Messages added: ' + logMessage);
    utilityVariables.currentLog.userDebugMessage = logMessage;
    //  System.debug('Log Message Updated in logLine');
  }
}
