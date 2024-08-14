public class utilityVariables {
  public static Map<String, Map<String, String>> eventMasterData = new Map<String, Map<String, String>>{
    'CODE_UNIT_STARTED' => new Map<String, String>{
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(\\[EXTERNAL\\])(0-9)]+(\\|apex:\\/\\/).+(\\/ACTION\\$).+' => 'Class',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(\\[EXTERNAL\\])(0-9)]+(\\|)[A-Za-z0-9]+(\\|).+(\\.).+(\\([A-Za-z]+\\))' => 'Class',
      '^[0-9:.]+\\s\\([0-9]+\\)\\|(CODE_UNIT_STARTED\\|)[(0-9)(\\[EXTERNAL\\])]+(\\|)[\\w.]+' => 'Class'
    }
  };
  public static Pattern standExpRegex = Pattern.compile(
    '^[0-9:.]*\\s\\([0-9]*\\)(\\|)[A-Z_]*.*'
  );
  public static Pattern execAnRegex = Pattern.compile(
    '^(Execute Anonymous:\\s)'
  );
}
