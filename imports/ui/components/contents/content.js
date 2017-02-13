import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import './content.html';

// Meteor.subscribe('contents');
// Meteor.subscribe('files.images.all');

Template.content.onCreated(function onCreated() {
  this.isEditMode = new ReactiveVar(false);
});

Template.content.helpers({
  mayEdit: function mayEdit() {
    return true;
  },
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
});

Template.content.events({
  'click #button-delete-content': function deleteContent(event) {
    event.preventDefault();
    Meteor.call('deleteContent', this._id);
  },
  'click #button-edit-content': function editContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #button-close-content-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});
