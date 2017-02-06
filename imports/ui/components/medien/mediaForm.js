import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './mediaForm.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Meteor.subscribe('medien');
Meteor.subscribe('files.images.all');

Template.mediaForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.uploadedFileId = new ReactiveVar();
});

Template.mediaForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  categories: function () {
    return ["cigarettes", "dentist", "dermatologist", "Allergist", "Cardiologist"];
  }
});

Template.mediaForm.events({
  'click .button-save': function upsertMedia(event, templateInstance) {
    event.preventDefault();
    const fileId = templateInstance.uploadedFileId.get();
    Meteor.call('upsertMedia',
      { _id: this._id,
        name: $('#name').val(),
        fileId: fileId });
        // Play time hours end
  },
  'change #fileInput': function (e, templateInstance) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        templateInstance.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          // alert('Error during upload: ' + error);
        } else {
          // alert('File "' + fileObj.name + '" successfully uploaded');
        }
        templateInstance.currentUpload.set(false);
        templateInstance.uploadedFileId.set(fileObj._id);
        // console.log("fileObj= ",fileObj._id);
      });
      upload.start();
    }
  }
});
