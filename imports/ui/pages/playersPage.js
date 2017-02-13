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
});

Template.playersPage.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
});

Template.playersPage.events({
  'click .button-new': function createNewPlayer(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-content-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
