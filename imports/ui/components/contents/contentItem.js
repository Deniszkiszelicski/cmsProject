import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './contentItem.html';


Template.contentItem.onCreated(function onCreated() {
  this.isEditMode = new ReactiveVar(false);
});

Template.contentItem.events({
  'click #button-delete-content': function deleteContent(event) {
    event.preventDefault();
    Meteor.call('deleteContent', this._id);
  },
  'click #button-edit-content': function editContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #button-close-content-form': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});

Template.contentItem.helpers({
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
});
