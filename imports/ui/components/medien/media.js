import { Template } from 'meteor/templating';
import './media.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Meteor.subscribe('medien');
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
    const email = Meteor.user().emails[0].address;
    const role = UserInformation.findOne({"email": email}, {"role": 1, '_id': 0}).role;
    const editPermission = Roles.findOne({"roleName": role}, {"editPlayer": 1, '_id': 0}).editPlayer;
    return editPermission;
  },
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
  // videoFile: function () {
  //   return Videos.findOne();
  // }
});

Template.media.events({
  'click #button-delete-media': function deleteMedia(event) {
    event.preventDefault();
    Meteor.call('deleteMedia', this._id);
  },
  'click #button-edit-media': function editMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #button-close-media-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});
