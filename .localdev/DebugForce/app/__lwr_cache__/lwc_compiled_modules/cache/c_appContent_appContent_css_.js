function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "--brandBackgroundPrimary: rgb(238, 244, 255);--zIndexDefault: 1;--fullWidth: 100%;}.appContent" + shadowSelector + " {background-color: var(--brandBackgroundPrimary);z-index: var(--zIndexDefault);top: 40px;width: var(--fullWidth);}.oneCenterStage" + shadowSelector + " {overflow: visible;background-color: transparent;max-width: 100%;left: 0;right: 0px;}.slds-template_default.slds-brand-band" + shadowSelector + ":before {top: 0rem;}";
  /*LWC compiler v7.1.3*/
}
export default [stylesheet];