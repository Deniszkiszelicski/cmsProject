import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import './media.html';

// Meteor.subscribe('medien');
Meteor.subscribe('files.images.all');

Template.media.onCreated(function onCreated() {
  this.isEditMode = new ReactiveVar(false);
});

Template.media.helpers({
  imageFile: function () {
    const media = Medien.findOne({ _id: this._id });
    if(!!media){
      fileId = media.fileId;
    }
    return Images.findOne({ _id: fileId });
  },
  mayEdit: function mayEdit() {
    return true;
  },
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
});

Template.media.events({
  'click #button-edit-media': function editMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #buttonCloseMediaForm, click .mediaSave': function closeForm(event, templateInstance) {
    event.preventDefault();
    // event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});
