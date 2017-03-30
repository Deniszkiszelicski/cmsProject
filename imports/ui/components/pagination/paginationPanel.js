import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './pageButton';
import './paginationPanel.html';

Template.paginationPanel.onCreated(function onCreated() {
  const options = Template.currentData().options;
  this.currentPage = new ReactiveVar(options.initialPage);
  this.currentRangeOfPages = new ReactiveVar(options.initialRangeOfPages);
  this.lastPageNumber = new ReactiveVar(options.lastPageNumber);
  this.textForButton = function textForButton(position, lastPageNumber, currentPage, currentRangeOfPages) {
    if (position == 1) {
      return 1;
    }
    if (position == 2) {
      const a = currentRangeOfPages[0] > 3;
      if (currentRangeOfPages[0] > 3) {
        return "...";
      } else {
        return 2;
      }
    }
    if (position == 3) {
      if (currentRangeOfPages[0] >= 4) {
        return currentRangeOfPages[0];
      } else {
        return 3;
      }
    }
    if (position == 4) {
      if (currentRangeOfPages[0] >= 3) {
        return currentRangeOfPages[1];
      }
      if (currentRangeOfPages[1] == 3) {
        return 4;
      }
      if (lastPageNumber - currentRangeOfPages[2] <= 2) {
        return 4;
      }
      return "...";
    }
    if (position == 5) {
      if (currentRangeOfPages[2] == lastPageNumber) {
        return currentRangeOfPages[2];
      }
      if (currentRangeOfPages[1] >= 4) {
        return currentRangeOfPages[2];
      }
      if (currentRangeOfPages[0] < 2 || lastPageNumber - currentRangeOfPages[2] <= 1 ) {
        return lastPageNumber;
      }
      if (lastPageNumber - currentRangeOfPages[2] == 2) {
        return lastPageNumber - 1;
      }
      return "...";
    }
    if (position == 6) {
      if (currentRangeOfPages[2] + 2 == lastPageNumber && currentRangeOfPages[2] <= 4) {
        return lastPageNumber;
      }
      if (currentRangeOfPages[2] + 2 == lastPageNumber && currentRangeOfPages[2] > 4) {
        return currentRangeOfPages[2] + 1;
      }
      if (lastPageNumber == currentRangeOfPages[2] + 1) {
        return lastPageNumber;
      } else {
        return "...";
      }
    }
    if (position == 7) {
      return lastPageNumber;
    }
    return "n";
  };
  this.isActive = function isActive(position, lastPageNumber, currentPage, currentRangeOfPages) {
    const currentPosition = currentRangeOfPages.indexOf(currentPage) + 1;
    if (position == 1 && currentPage == 1) {
      return "active";
    }
    if (position == 2 && currentPage == 2) {
      return "active";
    }
    if (position == 3 && (currentPage == 3 || (currentPage == currentRangeOfPages[0] && currentPage != 1))) {
      return "active";
    }
    if (position == 4 && ((4 <= currentRangeOfPages[1] && currentRangeOfPages[1] < lastPageNumber && currentPage != currentRangeOfPages[2]) || currentPage == 4)) {
      return "active";
    }
    if (position == 5 && currentRangeOfPages[2] == currentPage) {
      return "active";
    }
    if (position == 6 && currentRangeOfPages[2] == currentPage) {
      return "active";
    }
    return "";
  }
});

Template.paginationPanel.onRendered(function onRendered() {
  const options = Template.currentData().options;
});

Template.paginationPanel.helpers({
  showButton: function showButton(position) {
    const options = Template.currentData().options;
    const lastPageNumberNew = options.lastPageNumber;
    const lastPageNumberOld = Template.instance().lastPageNumber.get();
    if (lastPageNumberNew != lastPageNumberOld) {
      Template.instance().currentPage.set(1);
      Template.instance().currentRangeOfPages.set([1, 2, 3]);
    }
    Template.instance().lastPageNumber.set(lastPageNumberNew);
    const currentPage = Template.instance().currentPage.get();
    // const currentPage = options.initialPage;
    const rangeOfPages = Template.instance().currentRangeOfPages.get();
    if (position == 0 && lastPageNumberNew != 1 && currentPage != 1) {
      return true;
    }
    if (position == 8 && lastPageNumberNew != 1 && lastPageNumberNew != currentPage) {
      return true;
    }
    if (position == 1 && lastPageNumberNew != 1) {
      const textForButton = Template.instance().textForButton(1, lastPageNumberNew, currentPage, rangeOfPages);
      const isActive = Template.instance().isActive(1, lastPageNumberNew, currentPage, rangeOfPages);
      let isDisable = "";
      if (textForButton == "...") {
        isDisable = " link-disabled";
      }
      const options = { textForButton: textForButton,
                        isActive: isActive,
                        isDisable: isDisable };
      return { options: options };
    }
    if (position == 2 && 1 < lastPageNumberNew) {
      const textForButton = Template.instance().textForButton(2, lastPageNumberNew, currentPage, rangeOfPages);
      const isActive = Template.instance().isActive(2, lastPageNumberNew, currentPage, rangeOfPages);
      let isDisable = "";
      if (textForButton == "...") {
        isDisable = " link-disabled";
      }
      const options = { textForButton: textForButton,
                        isActive: isActive,
                        isDisable: isDisable };
      return { options: options };
    }
    if (position == 3 && 2 < lastPageNumberNew) {
      const textForButton = Template.instance().textForButton(3, lastPageNumberNew, currentPage, rangeOfPages);
      const isActive = Template.instance().isActive(3, lastPageNumberNew, currentPage, rangeOfPages);
      let isDisable = "";
      if (textForButton == "...") {
        isDisable = " link-disabled";
      }
      const options = { textForButton: textForButton,
                        isActive: isActive,
                        isDisable: isDisable };
      return { options: options };
    }
    if (position == 4 && 3 < lastPageNumberNew) {
      const textForButton = Template.instance().textForButton(4, lastPageNumberNew, currentPage, rangeOfPages);
      const isActive = Template.instance().isActive(4, lastPageNumberNew, currentPage, rangeOfPages);
      let isDisable = "";
      if (textForButton == "...") {
        isDisable = " link-disabled";
      }
      const options = { textForButton: textForButton,
                        isActive: isActive,
                        isDisable: isDisable };
      return { options: options };
    }
    if (position == 5 && 4 < lastPageNumberNew) {
      const textForButton = Template.instance().textForButton(5, lastPageNumberNew, currentPage, rangeOfPages);
      const isActive = Template.instance().isActive(5, lastPageNumberNew, currentPage, rangeOfPages);
      let isDisable = "";
      if (textForButton == "...") {
        isDisable = " link-disabled";
      }
      const options = { textForButton: textForButton,
                        isActive: isActive,
                        isDisable: isDisable };
      return { options: options };
    }
    if (position == 6 && lastPageNumberNew > 5 && (lastPageNumberNew - rangeOfPages[2] == 2 || 3 <= rangeOfPages[0] && !(rangeOfPages[2] == lastPageNumberNew))) {
      const textForButton = Template.instance().textForButton(6, lastPageNumberNew, currentPage, rangeOfPages);
      const isActive = Template.instance().isActive(6, lastPageNumberNew, currentPage, rangeOfPages);
      let isDisable = "";
      if (textForButton == "...") {
        isDisable = " link-disabled";
      }
      const options = { textForButton: textForButton,
                        isActive: isActive,
                        isDisable: isDisable };
      return { options: options };
    }
    if (position == 7 && (lastPageNumberNew > 6 && 2 <= rangeOfPages[0]) && lastPageNumberNew != rangeOfPages[2] + 1 && !(rangeOfPages[2] == lastPageNumberNew)) {
      const textForButton = Template.instance().textForButton(7, lastPageNumberNew, currentPage, rangeOfPages);
      const isActive = Template.instance().isActive(7, lastPageNumberNew, currentPage, rangeOfPages);
      let isDisable = "";
      if (textForButton == "...") {
        isDisable = " link-disabled";
      }
      const options = { textForButton: textForButton,
                        isActive: isActive,
                        isDisable: isDisable };
      return { options: options };
    }
    return false;
  },
});

Template.paginationPanel.events({
  'click .pagination .page-number': function goToPage(event, templateInstance) {
    const pageN = parseInt(event.currentTarget.dataset.page);
    const lastPageNumber = templateInstance.lastPageNumber.get();
    let newRangeOfPages = [];
    if (pageN == lastPageNumber) {
      newRangeOfPages = [lastPageNumber - 2, lastPageNumber - 1, lastPageNumber]
    }
    if (pageN == 1) {
      newRangeOfPages = [1, 2, 3];
    }
    if (1 < pageN && pageN < lastPageNumber) {
      newRangeOfPages = [pageN -1, pageN, pageN +1]
    }
    templateInstance.currentPage.set(pageN);
    templateInstance.currentRangeOfPages.set(newRangeOfPages);
  },
  'click .pagination .page-go-back': function goBack(event, templateInstance) {
    const currentPage = templateInstance.currentPage.get();
    const lastPageNumber = templateInstance.lastPageNumber.get();
    const oldRangeOfPages = templateInstance.currentRangeOfPages.get();
    const position = oldRangeOfPages.indexOf(currentPage);
    let newRangeOfPages = oldRangeOfPages;
    if (currentPage < 3 || (lastPageNumber == oldRangeOfPages[2] && currentPage != oldRangeOfPages[1])) {
      templateInstance.currentPage.set(currentPage - 1);
    } else {
      templateInstance.currentPage.set(currentPage - 1);
      newRangeOfPages.unshift(oldRangeOfPages[0] - 1);
      newRangeOfPages.pop();
    }
    templateInstance.currentRangeOfPages.set(newRangeOfPages);
  },
  'click .pagination .page-go-forward': function goForward(event, templateInstance) {
    const oldRangeOfPages = templateInstance.currentRangeOfPages.get();
    let currentPage = templateInstance.currentPage.get();
    const position = oldRangeOfPages.indexOf(currentPage);
    let newRangeOfPages = oldRangeOfPages;
    let lastPageNumber = templateInstance.lastPageNumber.get();
    if (currentPage < 2 || lastPageNumber == oldRangeOfPages[2]) {
      currentPage = currentPage + 1;
    } else {
      currentPage = currentPage + 1;
      newRangeOfPages.push(oldRangeOfPages[2] + 1);
      newRangeOfPages.shift();
    }
    templateInstance.currentRangeOfPages.set(newRangeOfPages);
    templateInstance.currentPage.set(currentPage);
  },
});
