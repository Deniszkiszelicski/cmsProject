import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import '../components/logoutbutton';
import '../components/players/playerForm';
import '../components/players/playersList';
import './playersPage.html';

Template.playersPage.onCreated(function onCreated() {
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
});
