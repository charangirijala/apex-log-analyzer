public class UserInfoUtility {
  public static void processUserInfo(String line) {
    UserInfoUtility.analyzeLine(line);
  }

  /*
   * 1. Process line and extract email,GMToffset etc
   * 2. Then push it to the result object
   * Example line: 13:22:57.210 (210783264)|USER_INFO|[EXTERNAL]|005dM000006Cr1t|girijalac@cunning-unicorn-6rhts4.com|(GMT+05:30) India Standard Time (Asia/Kolkata)|GMT+05:30
   */
  private static void analyzeLine(String line) {
    List<String> lineData = line.split('\\|');
    //ideally the line must be split into 7 parts
    if (lineData.size() == 7) {
      UserInfoSchema uis = new UserInfoSchema();
      uis.GMTOffset = lineData[5];
      uis.userEmail = lineData[4];
      uis.userId = lineData[3];
      //Update the result
      utilityVariables.result.userInfo = uis;
    }
  }
}
