public class ConstructorUtility {
  public static void processConstructorEntry(String line) {
    // System.debug('In Constructor Entry');
    MethodSchema methodUnit = new MethodSchema();
    List<String> splitArr = line.split('\\|');
    if (splitArr.size() == 6) {
      methodUnit.methodTitle = 'Constructor';
      methodUnit.classId = splitArr[3];
      methodUnit.methodName = splitArr[5];
      if (splitArr[4] != '<init>()') {
        string temp = splitArr[4];
        methodUnit.constrParams = temp.substringBetween('(', ')');
      }

      MethodUtility.addMethodToStack(methodUnit);
    }
  }

  public static void processConstructorExit() {
    MethodUtility.popMethodFromStack();
  }
}
