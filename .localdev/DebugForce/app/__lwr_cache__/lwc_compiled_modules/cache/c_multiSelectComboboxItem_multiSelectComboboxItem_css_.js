function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ".list-box-option" + shadowSelector + " {font-size: inherit;}";
  /*LWC compiler v7.1.3*/
}
export default [stylesheet];