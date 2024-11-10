public class utilityVariables {
  //ResultSchema Object to send to the cilent
  public static resultSchema result = new resultSchema();

  //Stack implemented variable to store the code units
  public static Stack codeUnitsStack = new Stack();

  //Stack to store all the executing methods
  public static Stack methodUnitsStack = new Stack();

  //String to store the API version of debug log
  public static String apiVersion;

  //String to Store the current line event
  public static String currentLineEvent;

  //String to Store the previous line event
  public static String previousLineEvent = null;

  //Track the currentHolding logLine
  public static LogLineSchema currentLog = null;

  //Map of the String to their respective Apex Profiling categories
  public static Map<String, String> apexProfilingCategories = new Map<String, String>{
    'APEX_PROFILING' => '',
    'APEX_CODE' => '',
    'CALLOUT' => '',
    'DB' => '',
    'NBA' => '',
    'SYSTEM' => '',
    'VALIDATION' => '',
    'WAVE' => '',
    'WORKFLOW' => '',
    'VISUALFORCE' => ''
  };

  //Regex to find if line has profiling info
  public static Pattern profilingRegex = Pattern.compile(
    '[1-9].\\.[0-9]\\s(APEX_CODE),[A-Z]*;(APEX_PROFILING),[A-Z]*;(CALLOUT),[A-Z]*;(DB),[A-Z]*;(NBA),[A-Z]*;(SYSTEM),[A-Z]*;(VALIDATION),[A-Z]*;(VISUALFORCE),[A-Z]*;(WAVE),[A-Z]*;(WORKFLOW),[A-Z]*'
  );

  //Regex to find if Line is standard Expression or not
  public static Pattern standExpRegex = Pattern.compile(
    '^[0-9:.]*\\s\\([0-9]*\\)(\\|)[A-Z_]*.*'
  );

  //Regex to find an execute anonymous line
  public static Pattern execAnRegex = Pattern.compile(
    '^(Execute\\sAnonymous:\\s).*'
  );

  //Variable to store all Execute anonymous statements
  public static List<String> ExecAnStatements = new List<String>();

  //Map of all the regex patterns and subsequent Standard Expression Events like CODE_UNIT_STARTED,STATEMENT_EXECUTE etc
  public static Map<String, Map<String, String>> eventMasterData = new Map<String, Map<String, String>>{
    'CODE_UNIT_STARTED' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(\\[EXTERNAL\\])(0-9)]+(\\|apex:\\/\\/).+(\\/ACTION\\$).+' => 'Class-Action',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(\\[EXTERNAL\\])(0-9)]+(\\|)[A-Za-z0-9]+(\\|).+(\\.).+(\\([A-Za-z]+\\))' => 'Class-Method',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(0-9)(\\[EXTERNAL\\])]+(\\|)[\\w.]+' => 'Class-Simple',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(0-9)(\\[EXTERNAL\\])]+(\\|TRIGGERS)' => 'Trigger-Simple',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(0-9)(\\[EXTERNAL\\])]+(\\|)\\w+(\\|)[\\w.]+\\s(on)\\s(\\w)+\\s(trigger\\sevent\\s)\\w+(\\|__sfdc_trigger\\/)[\\w\\/]+' => 'Trigger-Detailed',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(0-9)(\\[EXTERNAL\\])]+(\\|)\\w+;\\w+;\\w+(\\|)[\\w\\.]+' => 'Trigger-Event'
    },
    'STATEMENT_EXECUTE' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(STATEMENT_EXECUTE\\|)\\[[0-9]+\\]' => 'Statement-Execute'
    },
    'METHOD_ENTRY' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(METHOD_ENTRY\\|)[\\[0-9\\]]+(\\|)[\\w]+(\\|).+' => 'Method-Generic',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(METHOD_ENTRY\\|)[\\[0-9\\]]+(\\|\\|).+' => 'Method-System'
    },
    'METHOD_EXIT' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(METHOD_EXIT\\|).+' => 'Method-Single'
    },
    'CONSTRUCTOR_ENTRY' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CONSTRUCTOR_ENTRY\\|)(\\[([0-9]+|(EXTERNAL))\\]\\|)[a-zA-Z-0-9]+(\\|<init>\\(.*\\))(\\|)(.)+' => 'Constructor-Entry-Single'
    },
    'CONSTRUCTOR_EXIT' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CONSTRUCTOR_EXIT\\|)(\\[([0-9]+|(EXTERNAL))\\]\\|)[a-zA-Z-0-9]+(\\|<init>\\(.*\\))(\\|)(.)+' => 'Constructor-Exit-Single'
    },
    'SYSTEM_METHOD_ENTRY' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(SYSTEM_METHOD_ENTRY\\|)[\\[0-9\\]]+(\\|).+' => 'System-Method-Single'
    },
    'VARIABLE_ASSIGNMENT' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(VARIABLE_ASSIGNMENT\\|)(\\[([0-9]+|(EXTERNAL))\\]\\|).+\\|.+\\|[0-9a-z]+' => 'Variable-Generic',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(VARIABLE_ASSIGNMENT\\|)(\\[([0-9]+|(EXTERNAL))\\]\\|).+(\\|).+' => 'Variable-No-Address'
    },
    'USER_DEBUG' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(USER_DEBUG\\|)\\[([0-9]+|(EXTERNAL))\\]\\|((DEBUG)|(INFO)|(WARN)|(ERROR)|(NONE)|(FINER)|(FINEST)|(FINE))(\\|).+' => 'Debug-Generic'
    },
    'VARIABLE_SCOPE_BEGIN' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(VARIABLE_SCOPE_BEGIN\\|)(\\[([0-9]+|(EXTERNAL))\\]\\|)(.+\\|.+\\|((true)|(false))\\|((true)|(false)))' => 'Variable-Scope-Generic'
    },
    'CODE_UNIT_FINISHED' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_FINISHED\\|).*' => 'Finished-Generic'
    },
    'FATAL_ERROR' => new Map<String, String>{
      '^[0-9:.]*\\s\\([0-9]*\\)(\\|FATAL_ERROR\\|).*' => 'Fatal-Error-Generic'
    },
    'CUMULATIVE_LIMIT_USAGE' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|CUMULATIVE_LIMIT_USAGE' => 'Cumulative-Limit-Usage-Generic'
    },
    'USER_INFO' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(USER_INFO\\|)\\[([0-9]+|(EXTERNAL))\\](\\|\\w+\\|)[A-Za-z0-9\\._%+\\-]+@[A-Za-z0-9\\.\\-]+\\.[A-Za-z]{2,}(\\|.+\\|)(GMT[+0-9:-]+)' => 'User-Info-Generic'
    },
    'SOQL_EXECUTE_BEGIN'=>new Map<String,String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(SOQL_EXECUTE_BEGIN\\|)\\[[0-9]+\\]+(\\|).*' => 'SOQL-Begin'
    },
    'SOQL_EXECUTE_END'=>new Map<String,String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(SOQL_EXECUTE_END\\|)\\[[0-9]+\\]+(\\|).*' => 'SOQL-End'
    }
  };

  public static String getStatementExecute(String line) {
    List<String> splitArr = line.split('\\|');
    return splitArr[splitArr.size() - 1];
  }
  //To Process CODE_UNIT_STARTED
  public static void getCodeUnitDetails(String line, String pattern) {
    CodeUnitContainerSchema codeUnitDetails = new CodeUnitContainerSchema();
    Boolean enteredCondtion = false;
    if (pattern == 'Class-Action') {
      enteredCondtion = true;
      List<String> splitArr = line.split('\\|');
      String neededLine = splitArr[splitArr.size() - 1];
      List<String> splitArr1 = neededLine.split('/');
      codeUnitDetails.codeUnitName = splitArr1[splitArr1.size() - 2];
      codeUnitDetails.codeUnitType = 'Class';
      codeUnitDetails.methodExecuting = splitArr1[splitArr1.size() - 1];
      codeUnitDetails.isTrigger = false;
    } else if (pattern == 'Class-Method') {
      enteredCondtion = true;
      codeUnitDetails.codeUnitType = 'Class';
      codeUnitDetails.isTrigger = false;
      List<String> splitArr = line.split('\\|');
      String neededLine = splitArr[splitArr.size() - 1];
      codeUnitDetails.classId = splitArr[splitArr.size() - 2];
      List<String> splitArr1 = neededLine.split('\\.');
      if (splitArr1.size() == 3) {
        codeUnitDetails.codeUnitName = splitArr1[1];
        codeUnitDetails.executingNamespace = splitArr1[0];
        codeUnitDetails.methodExecuting = splitArr1[2];
      } else if (splitArr1.size() == 2) {
        codeUnitDetails.codeUnitName = splitArr1[0];
        codeUnitDetails.methodExecuting = splitArr1[1];
      }
    } else if (pattern == 'Class-Simple') {
      List<String> splitArr = line.split('\\|');
      String neededLine = splitArr[splitArr.size() - 1];
      if (neededLine != 'TRIGGERS') {
        enteredCondtion = true;
        codeUnitDetails.codeUnitType = 'Class';
        codeUnitDetails.isTrigger = false;
        codeUnitDetails.codeUnitName = neededLine;
      }
    } else if (pattern == 'Trigger-Detailed') {
      enteredCondtion = true;
      codeUnitDetails.codeUnitType = 'Trigger';
      codeUnitDetails.isTrigger = true;
      List<String> splitArr = line.split('\\|');
      String neededLine = splitArr[splitArr.size() - 1];
      String neededLine0 = splitArr[splitArr.size() - 2];
      codeUnitDetails.triggerId = splitArr[splitArr.size() - 3];
      List<String> splitArr0 = neededLine0.split('\\s');
      codeUnitDetails.triggerEvent = splitArr0[5];
      codeUnitDetails.triggerObject = splitArr0[2];
      List<String> splitArr1 = neededLine.split('\\/');
      if (splitArr1.size() == 3) {
        codeUnitDetails.executingNamespace = splitArr1[1];
        codeUnitDetails.codeUnitName = splitArr1[2];
      } else if (splitArr1.size() == 2) {
        codeUnitDetails.codeUnitName = splitArr1[1];
      }
    } else if (pattern == 'Trigger-Event') {
      enteredCondtion = true;
      codeUnitDetails.codeUnitType = 'Trigger';
      codeUnitDetails.isTrigger = true;
      List<String> splitArr = line.split('\\|');
      String neededLine0 = splitArr[splitArr.size() - 2];
      String neededLine = splitArr[splitArr.size() - 1];
      List<String> splitArr0 = neededLine0.split(';');
      codeUnitDetails.triggerEvent = splitArr0[0];
      codeUnitDetails.triggerId = splitArr0[2];
      codeUnitDetails.triggerObject = splitArr0[1];
      List<String> splitArr1 = neededLine.split('\\.');
      if (splitArr1.size() == 1) {
        codeUnitDetails.codeUnitName = splitArr1[0];
      } else if (splitArr1.size() == 2) {
        codeUnitDetails.executingNamespace = splitArr1[0];
        codeUnitDetails.codeUnitName = splitArr1[1];
      }
    }
    if (!enteredCondtion) {
      /**
       * No condition entered for codeunitProcessing
       */
    } else {
      if (!utilityVariables.codeUnitsStack.isEmpty()) {
        CodeUnitContainerSchema currentCodeUnit = (CodeUnitContainerSchema) utilityVariables.codeUnitsStack.peek();
        ExecutedLineAndSubUnitSchema elss = new ExecutedLineAndSubUnitSchema();
        elss.codeUnit = codeUnitDetails;
        currentCodeUnit.executedLinesAndSubUnits.add(elss);
        //push the codeunit to stack
        utilityVariables.codeUnitsStack.push(codeUnitDetails);
      } else {
        utilityVariables.codeUnitsStack.push(codeUnitDetails);
        //If codeUNits is null intitialize the codeUnit
        /*
        if (utilityVariables.result.codeUnits == null) {
          utilityVariables.result.codeUnits = new List<CodeUnitContainerSchema>();
        }
        utilityVariables.result.codeUnits.add(codeUnitDetails);
        */
        if (utilityVariables.result.codeUnits == null) {
          utilityVariables.result.codeUnits = new List<CodeUnitContainerSchema>();
        }
        utilityVariables.result.codeUnits.add(codeUnitDetails);
      }
    }
  }

  public static Boolean checkContStmtExec(String line) {
    if (line == null)
      return false;
    Pattern regex = Pattern.compile(
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(STATEMENT_EXECUTE\\|)\\[[0-9]+\\]'
    );
    Matcher mc = regex.matcher(line);
    if (mc.matches()) {
      return true;
    }
    return false;
  }
}
