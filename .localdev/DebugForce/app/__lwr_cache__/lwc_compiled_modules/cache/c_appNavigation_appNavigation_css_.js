function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ".nav-item" + shadowSelector + " {color: rgb(24, 24, 24);}a" + shadowSelector + " {text-decoration: none !important;}a:hover" + shadowSelector + " {text-decoration: none !important;}.slds-no-print" + shadowSelector + " {position: fixed;width: 100%;z-index: 1000;}";
  /*LWC compiler v7.1.3*/
}
export default [stylesheet];