import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './player.html';

Template.player.onCreated(function onCreated() {
  this.isEditMode = new ReactiveVar(false);
});

Template.player.helpers({
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
  mayEdit: function mayEdit() {
    return true;
  },
});

Template.player.events({
  'click #button-edit-player': function editPlayer(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #button-close-player-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});
