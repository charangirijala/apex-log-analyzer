function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  var hostSelector = token ? ("[" + token + "-host]") : "";
  var suffixToken = token ? ("-" + token) : "";
  return ".multi-select-combobox__dropdown" + shadowSelector + " {max-height: 500px;overflow-y: auto;}" + ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "--dxp-s-form-element-text-font-size: 0.75rem;--dxp-s-button-font-size: 0.8125rem;--dxp-s-form-element-label-font-size: 0.75rem;}.multi-select-combobox__input" + shadowSelector + " {background-color: #ffffff;border-radius: 0.25rem;width: 100%;transition:\n border 0.1s linear,\n background-color 0.1s linear;display: inline-block;padding: 0 1rem 0 0.75rem;line-height: 1.875rem;min-height: calc(1.875rem + (var(--lwc-borderWidthThin, 1px) * 2));}.multi-select-combobox__input:disabled" + shadowSelector + " {background-color: #ecebea;border: var(--lwc-borderWidthThin, 1px) solid #c9c7c5;}.multi-select-combobox__icon" + shadowSelector + " {margin-right: -3px;}.multi-select-combobox__listbox" + shadowSelector + " {width: 100%;}";
  /*LWC compiler v7.1.3*/
}
export default [stylesheet];