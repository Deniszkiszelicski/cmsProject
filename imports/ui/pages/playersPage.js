import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import '../components/logoutbutton';
import '../components/players/playerForm';
import '../components/players/playersList';
import './playersPage.html';

Template.playersPage.onCreated(function onCreated() {
  this.initialPage = new ReactiveVar(1);
  this.initialRangeOfPages = new ReactiveVar([1, 2, 3, 4, 5]);

  this.isCreateNew = new ReactiveVar(false);
  this.currentPlayer = new ReactiveVar();
  Session.set("isDefaultPageLayout", true);
});

Template.playersPage.helpers({
  isCreateNew: function isCreateNew() {
    return !Session.get("isDefaultPageLayout") && Template.instance().isCreateNew.get();
  },
  getCurrentPlayer: function getPlayer() {
    return Template.instance().currentPlayer.get();
  },
  options: function getOptions() {
    const initialPage = Template.instance().initialPage.get();
    const initialRangeOfPages = Template.instance().initialRangeOfPages.get();
    const options = { header: "List of all players", initialPage: initialPage,
                      enableButtonNewPlayer: true, enableFilter: true,
                      initialRangeOfPages: initialRangeOfPages };
    const includedCGsWithOptions = { options: options};
    return includedCGsWithOptions;
  },
});

Template.playersPage.events({
  'click .button-new, click #button-edit-player': function createNewPlayer(event, templateInstance) {
    event.preventDefault();
    templateInstance.currentPlayer.set(this);
    Session.set("isDefaultPageLayout", false);
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-player-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
  'click .pagination .page-number': function goToPage(event, templateInstance) {
    const pageN = event.currentTarget.dataset.page;
    templateInstance.initialPage.set(parseInt(pageN));
  },
  'click .pagination .page-go-forward': function goForward(event, templateInstance) {
    const oldRangeOfPages = templateInstance.initialRangeOfPages.get();
    let initialPage = templateInstance.initialPage.get();
    const position = oldRangeOfPages.indexOf(initialPage);
    let newRangeOfPages = oldRangeOfPages;
    if (position < 4) {
      initialPage = initialPage + 1;
    }
    if (position == 4) {
      initialPage = initialPage + 1;
      newRangeOfPages.push(oldRangeOfPages[4] + 1);
      newRangeOfPages.shift();
    }
    templateInstance.initialRangeOfPages.set(newRangeOfPages);
    templateInstance.initialPage.set(initialPage);
  },
  'click .pagination .page-go-back': function goBack(event, templateInstance) {
    // const pageN = event.currentTarget.dataset.page;
    // templateInstance.initialPage.set(pageN);
    const initialPage = templateInstance.initialPage.get();
    if (initialPage == 1) {
      return 0;
    }
    const oldRangeOfPages = templateInstance.initialRangeOfPages.get();
    const position = oldRangeOfPages.indexOf(initialPage);
    let newRangeOfPages = oldRangeOfPages;
    if (position > 0) {
      templateInstance.initialPage.set(initialPage - 1);
    }
    if (position == 0) {
      templateInstance.initialPage.set(initialPage - 1);
      newRangeOfPages.unshift(oldRangeOfPages[0] - 1);
      newRangeOfPages.pop();
    }
    templateInstance.initialRangeOfPages.set(newRangeOfPages);
  },
});
