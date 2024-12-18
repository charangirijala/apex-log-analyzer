import { registerDecorators as _registerDecorators, LightningElement, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./multiSelectCombobox.html";
/**
 * Combobox with different configuration options that also supports multi select.
 * @alias MultiSelectCombobox
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-multi-select-combobox label="Products" name="products" options={options} ... required></c-multi-select-combobox>
 */
class MultiSelectCombobox extends LightningElement {
  constructor(...args) {
    super(...args);
    /**
     * If present, the combobox is disabled and users cannot interact with it.
     * @type {boolean}
     * @default false
     */
    this.disabled = false;
    /**
     * Text label for the combobox.
     * @type {string}
     * @default ''
     */
    this.label = "";
    /**
     * Specifies the name of the combobox.
     * @type {string}
     */
    this.name = void 0;
    /**
     * A list of options that are available for selection. Supported option attributes: label, value, selected.
     * @type {Array}
     * @example
     * options = [
     *   {
     *     label: 'Option 1',
     *     value: 'option1'
     *   },
     *   {
     *     label: 'Option 2',
     *     value: 'option2',
     *     selected: true
     *   },
     * ]
     */
    this.options = [];
    /**
     * Text that is displayed before an option is selected, to prompt the user to select an option.
     * @type {string}
     * @default 'Select an Option'
     */
    this.placeholder = "Select an Option";
    /**
     * If present, the combobox is read-only. A read-only combobox is also disabled.
     * @type {boolean}
     * @default false
     */
    this.readOnly = false;
    /**
     * If present, a value must be selected before a form can be submitted.
     * @type {boolean}
     * @default false
     */
    this.required = false;
    /**
     * If present, the combobox only allows the selection of a single value.
     * @type {boolean}
     * @default false
     */
    this.singleSelect = false;
    /**
     * If present, the combobox will show a pill container with the currently selected options.
     * @type {boolean}
     * @default false
     */
    this.showPills = false;
    this.currentOptions = [];
    this.selectedItems = [];
    this.selectedOptions = [];
    this.isInitialized = false;
    this.isLoaded = false;
    this.isVisible = false;
    this.isDisabled = false;
  }
  connectedCallback() {
    this.isDisabled = this.disabled || this.readOnly;
    this.hasPillsEnabled = this.showPills && !this.singleSelect;
    this.currentOptions = this.options;
  }
  renderedCallback() {
    if (!this.isInitialized) {
      this.template.querySelector(".multi-select-combobox__input").addEventListener("click", event => {
        this.handleClick(event.target);
        event.stopPropagation();
      });
      this.template.addEventListener("click", event => {
        event.stopPropagation();
      });
      document.addEventListener("click", () => {
        this.close();
      });
      this.isInitialized = true;
      this.setSelection();
    }
  }
  handleChange(event) {
    this.change(event);
  }
  handleRemove(event) {
    this.selectedOptions.splice(event.detail.index, 1);
    this.change(event);
  }
  handleClick() {
    // initialize picklist options on first click to make them editable
    if (this.isLoaded === false || this.currentOptions?.length !== this.options?.length) {
      this.currentOptions = JSON.parse(JSON.stringify(this.options));
      this.isLoaded = true;
    }
    if (this.template.querySelector(".slds-is-open")) {
      this.close();
    } else {
      this.template.querySelectorAll(".multi-select-combobox__dropdown").forEach(node => {
        node.classList.add("slds-is-open");
      });
    }
  }
  change(event) {
    // remove previous selection for single select picklist
    if (this.singleSelect) {
      this.currentOptions.forEach(item => item.selected = false);
    }

    // set selected items
    this.currentOptions.filter(item => item.value === event.detail.item.value).forEach(item => item.selected = event.detail.selected);
    this.setSelection();
    const selection = this.getSelectedItems();
    this.dispatchEvent(new CustomEvent("change", {
      detail: this.singleSelect ? selection[0] : selection
    }));

    // for single select picklist close dropdown after selection is made
    if (this.singleSelect) {
      this.close();
    }
  }
  close() {
    this.template.querySelectorAll(".multi-select-combobox__dropdown").forEach(node => {
      node.classList.remove("slds-is-open");
    });
    this.dispatchEvent(new CustomEvent("close", {
      detail: this.selectedOptions
    }));
    this.selectedOptions = [];
  }
  setSelection() {
    const selectedItems = this.getSelectedItems();
    let selection = "";
    if (selectedItems.length < 1) {
      selection = this.placeholder;
      this.selectedOptions = [];
    } else if (selectedItems.length > 1) {
      selection = `${selectedItems.length} Options Selected`;
      this.selectedOptions = this.getSelectedItems();
    } else {
      selection = selectedItems.map(selected => selected.label).join(", ");
      this.selectedOptions = this.getSelectedItems();
    }
    this.selectedItems = selection;
    this.isVisible = this.selectedOptions && this.selectedOptions.length > 0;
  }
  getSelectedItems() {
    return this.currentOptions.filter(item => item.selected);
  }
  /*LWC compiler v7.1.3*/
}
_registerDecorators(MultiSelectCombobox, {
  publicProps: {
    disabled: {
      config: 0
    },
    label: {
      config: 0
    },
    name: {
      config: 0
    },
    options: {
      config: 0
    },
    placeholder: {
      config: 0
    },
    readOnly: {
      config: 0
    },
    required: {
      config: 0
    },
    singleSelect: {
      config: 0
    },
    showPills: {
      config: 0
    }
  },
  track: {
    currentOptions: 1
  },
  fields: ["selectedItems", "selectedOptions", "isInitialized", "isLoaded", "isVisible", "isDisabled"]
});
const __lwc_component_class_internal = _registerComponent(MultiSelectCombobox, {
  tmpl: _tmpl,
  sel: "c-multi-select-combobox",
  apiVersion: 62
});
export default __lwc_component_class_internal;