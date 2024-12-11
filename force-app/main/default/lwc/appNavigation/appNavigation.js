import { LightningElement, track } from "lwc";

export default class AppNavigation extends LightningElement {
  activeApp = "Home";
  classCombinationActive =
    "navItem slds-context-bar__item slds-shrink-none slds-is-active";
  classCombinationInactive = "navItem slds-context-bar__item slds-shrink-none";
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
    console.log(event.currentTarget.dataset.navitem);
    const selectedIdx = event.currentTarget.dataset.navitem;
    for (let i = 0; i < this.navItems.length; i++) {
      if (i === parseInt(selectedIdx, 10)) {
        this.activeApp = this.navItems[i].label;
        this.navItems[i].classCombination = this.classCombinationActive;
      } else {
        this.navItems[i].classCombination = this.classCombinationInactive;
      }
    }
    console.log(JSON.stringify(this.navItems));
  }
}
