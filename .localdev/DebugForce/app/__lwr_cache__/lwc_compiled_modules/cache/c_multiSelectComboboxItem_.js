import { registerDecorators as _registerDecorators, LightningElement, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./multiSelectComboboxItem.html";
/**
 * Component that represents an item within the multi select combobox parent component.
 * @alias MultiSelectComboboxItem
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-multi-select-combobox-item key={item.key} item={item} onchange={handleChange}></c-multi-select-combobox-item>
 */
class MultiSelectComboboxItem extends LightningElement {
  constructor(...args) {
    super(...args);
    /**
     * Single selectable item received from the multi select combobox parent component.
     * @type {Object}
     */
    this.item = void 0;
  }
  get itemClass() {
    return `slds-listbox__item ${this.item.selected ? "slds-is-selected" : ""}`;
  }
  handleClick() {
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        item: this.item,
        selected: !this.item.selected
      }
    }));
  }
  /*LWC compiler v7.1.3*/
}
_registerDecorators(MultiSelectComboboxItem, {
  publicProps: {
    item: {
      config: 0
    }
  }
});
const __lwc_component_class_internal = _registerComponent(MultiSelectComboboxItem, {
  tmpl: _tmpl,
  sel: "c-multi-select-combobox-item",
  apiVersion: 62
});
export default __lwc_component_class_internal;