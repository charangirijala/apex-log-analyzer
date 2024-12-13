import { LightningElement, track, wire } from "lwc";
import { publish, MessageContext } from "lightning/messageService";
import STATE from "@salesforce/messageChannel/App_Service__c";

export default class AppNavigation extends LightningElement {
  activeApp = "Home";
  @wire(MessageContext)
  messageContext;
  classCombinationActive =
    "navItem slds-context-bar__item slds-shrink-none slds-is-active";
  classCombinationInactive = "navItem slds-context-bar__item slds-shrink-none";

  connectedCallback() {
    const payload = {
      activeApp: this.activeApp
    };
    publish(this.messageContext, STATE, payload);
  }
  @track navItems = [
    {
      label: "Home",
      classCombination:
        "navItem slds-context-bar__item slds-shrink-none slds-is-active"
    },
    {
      label: "Raw Log Viewer",
      classCombination: "navItem slds-context-bar__item slds-shrink-none"
    },
    {
      label: "Log Analysis",
      classCombination: "navItem slds-context-bar__item slds-shrink-none"
    },
    {
      label: "Detailed Log Viewer",
      classCombination: "navItem slds-context-bar__item slds-shrink-none"
    }
  ];

  handleNavigationItemClick(event) {
    event.preventDefault();
    // console.log(event.currentTarget.dataset.navitem);
    const selectedIdx = event.currentTarget.dataset.navitem;
    for (let i = 0; i < this.navItems.length; i++) {
      if (i === parseInt(selectedIdx, 10)) {
        const payload = {
          activeApp: this.navItems[i].label
        };
        publish(this.messageContext, STATE, payload);
        this.navItems[i].classCombination = this.classCombinationActive;
      } else {
        this.navItems[i].classCombination = this.classCombinationInactive;
      }
    }
    // console.log(JSON.stringify(this.navItems));
  }
}
