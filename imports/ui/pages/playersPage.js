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
  this.initialShowPerPage = new ReactiveVar(10);
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
    const initialShowPerPage = Template.instance().initialShowPerPage.get();
    const options = { header: "List of all players", initialPage: initialPage,
                      enableButtonNewPlayer: true, enableFilter: true,
                      initialShowPerPage: initialShowPerPage };
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
    const pageN = parseInt(event.currentTarget.dataset.page);
    templateInstance.initialPage.set(pageN);
  },
  'click .pagination .page-go-forward': function goForward(event, templateInstance) {
    templateInstance.initialPage.set(templateInstance.initialPage.get() + 1);
  },
  'click .pagination .page-go-back': function goBack(event, templateInstance) {
    templateInstance.initialPage.set(templateInstance.initialPage.get() - 1);
  },
  'keyup #records-per-page-input': function (event, templateInstance) {
    const initialShowPerPage = parseInt(event.currentTarget.value);
    if (initialShowPerPage > 0) {
      templateInstance.initialShowPerPage.set(initialShowPerPage);
      templateInstance.initialPage.set(1);
    }
  },
});
