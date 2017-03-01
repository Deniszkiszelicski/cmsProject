import { Template } from 'meteor/templating';
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
  // enableButtonEdit: function enableButtonEdit() {
  //   console.log("enableButtonEdit this = ", this);
  //   if (!!this) {
  //     return this.enableButtonEdit;
  //   }
  //   return false;
  // },
});

Template.contentGroup.events({
  'click #button-delete-contentGroup': function deleteContentGroup(event) {
    event.preventDefault();
    Meteor.call('deleteContentGroup', this._id);
  },
  'click #button-edit-contentGroup': function editContentGroup(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #button-close-contentGroup-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    // event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});
