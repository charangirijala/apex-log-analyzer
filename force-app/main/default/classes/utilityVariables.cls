public class utilityVariables {
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
    }
  };
  public static Pattern standExpRegex = Pattern.compile(
    '^[0-9:.]*\\s\\([0-9]*\\)(\\|)[A-Z_]*.*'
  );
  public static Pattern execAnRegex = Pattern.compile(
    '^(Execute Anonymous:\\s)'
  );
  public static String EXECUTED_LINE_PATTERN = 'Executed Line - ';
  public static CodeUnitContainerSchema getCodeUnitDetails(
    String line,
    String pattern
  ) {
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
    if (!enteredCondtion)
      return null;
    return codeUnitDetails;
  }
}
