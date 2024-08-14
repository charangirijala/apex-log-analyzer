public class apexLogTryController {
  //test controller to try and checkout the logic
  @AuraEnabled(cacheable=true)
  public static resultSchema saveFile(String base64Data) {
    String data = JSON.deserializeUntyped(base64Data).toString();
    resultSchema processedLogRes = new resultSchema();
    if (data.length() == 0) {
      System.debug('NO DATA FOUND FROM FILE::: ERROR');
      return null;
    }
    List<String> logRawData = data.split('\n');
    System.debug('NO OF LINES OF LOGS GENERATED: ' + logRawData.size());
    //call method processAllLines to run through all lines
    processAllLines(logRawData, processedLogRes);

    return processedLogRes;
  }
  //method containing for loop to process all the lines
  private static void processAllLines(
    List<String> logRawData,
    resultSchema processedLogRes
  ) {
    Integer nofLines = logRawData.size();
    for (Integer line = 0; line < nofLines; line++) {
      //process line one data and validation
      String currentLine = logRawData[line].replaceAll('&#124;', '|');
      System.debug('ANALYZING LINE NUMBER:> ' + line + ' >>> ' + currentLine);
      if (line == 0) {
        if (validateLineOneData(currentLine)) {
          processedLogRes.profilingInfo = processLineOneData(currentLine);
        } else {
          //send that there is no API and category info data to lwc
        }
      } else {
        levelOneCheck(currentLine);
      }
    }
  }

  //level1 pattern check to check if it is Execute anonymous or standard expression
  private static String levelOneCheck(String line) {
    Matcher execAnMatcher = utilityVariables.execAnRegex.matcher(line);
    Matcher standExpMatcher = utilityVariables.standExpRegex.matcher(line);

    if (execAnMatcher.find()) {
      //execute anonymous line found hence get the input lines
      System.debug('LEVEL ONE CHECK::::EXECUTE ANONYMOUS LINE ;;;');
    } else if (standExpMatcher.find()) {
      //standard Expression line found process it
      System.debug('LEVEL ONE CHECK::::STANDARD EXPRESSION LINE ;;;');
      //get the Event name of the line
      String event = line.split('\\|')[1];
      System.debug('EVENT FOUND IS:::' + event + ' ;;;');
      //run regex on the event to find all the master data
      //get all the regex according to the event type
      Map<String, String> allData = utilityVariables.eventMasterData.get(event);

      if (allData != null) {
        Set<String> allRegex = allData.keySet();
        for (String regex : allRegex) {
          Pattern compiledRegex = Pattern.compile(regex);
          if (compiledRegex.matcher(line).matches()) {
            System.debug(
              'PATTERN MATCHED::: EVENT:::' +
                event +
                ' ENTITY:::' +
                allData.get(regex)
            );
          }
        }
      }
    } else {
      //unidentified line that dosen't match any pattern
      System.debug('LEVEL ONE CHECK::::NO PATTERN MATCHED FOR THE LINE ;;;');
    }
    return 'LEVEL ONE PROCESS DONE';
  }
  //method to validate line one
  private static Boolean validateLineOneData(String line) {
    Pattern lineOneRegex = Pattern.compile(
      '[1-9].\\.[0-9]\\s(APEX_CODE),[A-Z]*;(APEX_PROFILING),[A-Z]*;(CALLOUT),[A-Z]*;(DB),[A-Z]*;(NBA),[A-Z]*;(SYSTEM),[A-Z]*;(VALIDATION),[A-Z]*;(VISUALFORCE),[A-Z]*;(WAVE),[A-Z]*;(WORKFLOW),[A-Z]*'
    );
    Matcher lineOneMatcher = lineOneRegex.matcher(line);
    if (lineOneMatcher.matches()) {
      System.debug('LINE ONE VALIDATED VIA REGEX::');
      return true;
    } else {
      System.debug('INVALID ENTRY FOR LINE ONE><');
    }

    return false;
  }

  //method to process all the data of line one
  private static Map<String, String> processLineOneData(String line) {
    String api;
    Map<String, String> categoryPairsMap = new Map<String, String>();
    categoryPairsMap.put('APEX_PROFILING', '');
    categoryPairsMap.put('APEX_CODE', '');
    categoryPairsMap.put('CALLOUT', '');
    categoryPairsMap.put('DB', '');
    categoryPairsMap.put('NBA', '');
    categoryPairsMap.put('SYSTEM', '');
    categoryPairsMap.put('VALIDATION', '');
    categoryPairsMap.put('VISUALFORCE', '');
    categoryPairsMap.put('WAVE', '');
    categoryPairsMap.put('WORKFLOW', '');

    List<String> splitForApi = line.split(' ');
    api = splitForApi[0];
    String restOfLine = splitForApi[1];

    List<String> categoryPairs = restOfLine.split(';');
    for (String pair : categoryPairs) {
      List<String> temp = pair.split(',');
      String category = temp[0];
      String value = temp[1];
      if (categoryPairsMap.containsKey(category)) {
        categoryPairsMap.put(category, value);
        System.debug('CATEGORY: ' + category + ' VALUE: ' + value);
      }
    }

    return categoryPairsMap;
  }
}
