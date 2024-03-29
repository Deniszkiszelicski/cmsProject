import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import './contentGroup.html';

Template.contentGroup.onCreated(function onCreated() {
  this.isEditMode = new ReactiveVar(false);
});

Template.contentGroup.helpers({
  mayEdit: function mayEdit() {
    return true; //TODO:
  },
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
  isBlocked: function isBlocked() {
    return this.blocked ? "yes" : "no";
  },
});

Template.contentGroup.events({
  'click #button-edit-contentGroup': function editContentGroup(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
    Session.set('selectedGrp', this._id);
  },
  'click #button-close-contentGroup-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(false);
  },
});
