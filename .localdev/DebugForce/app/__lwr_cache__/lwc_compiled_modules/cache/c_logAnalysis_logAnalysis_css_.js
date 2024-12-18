function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "--full-width: 100%;--zero-position: 0;}.fullheigth" + shadowSelector + " {height: 100%;}.oneCenterStage" + shadowSelector + " {left: var(--zero-position);top: var(--zero-position);width: var(--full-width);overflow: visible;background-color: transparent;}.centerRegion" + shadowSelector + " {overflow-y: auto;display: flex;flex-flow: row wrap;flex: 1 1 0%;height: 100%;}.leftRegion" + shadowSelector + " {display: flex;overflow-y: auto;height: 100%;width: 400px;}.slds-button:hover" + shadowSelector + " {color: #76716b;border-color: #76716b;}";
  /*LWC compiler v7.1.3*/
}
export default [stylesheet];