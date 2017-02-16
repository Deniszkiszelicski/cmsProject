import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import './searchCategory';
import './mediaForm.html';

Meteor.subscribe('medien');
Meteor.subscribe('files.images.all');

Template.mediaForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.uploadedFileId = new ReactiveVar();
  this.uploadedFileName = new ReactiveVar();
  // let uploadedFileName = "test2";
  // console.log("mediaForm onCreated this._id = ", this._id);
  // if(!!this._id) {
  //   uploadedFileName = "test1";
  // }
  // this.uploadedFileName = new ReactiveVar(uploadedFileName);
});

Template.mediaForm.onRendered(function () {
  const fileId = this.data.fileId;
  if(!!fileId) {
    const fileName = Images.findOne({ _id: fileId }).name;
    // const category = Images.findOne({ _id: fileId }).name;
    Template.instance().uploadedFileName.set(fileName);
    Template.instance().uploadedFileId.set(fileId);
  }
});

Template.mediaForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  // categories: function () {
  //   return ["Allergist", "Cardiologist", "Dentist", "Dermatologist"];
  // },
  category: function () {
    const category = this.category;
    console.log("this.category in form helper = ", this.category);
    return category;
  },
  uploadedFileName: function () {
    return Template.instance().uploadedFileName.get();
  }
});

Template.mediaForm.events({
  'click .button-save': function upsertMedia(event, templateInstance) {
    event.preventDefault();
    // let fileId = $('#searchCategories').val();
    console.log("fileId");
    let fileId = templateInstance.uploadedFileId.get();
    Meteor.call('upsertMedia',
      { _id: this._id,
        name: $('#nameOfMedia').val(),
        category: $('#searchCategories').val(),
        type: 'picture',
        createdAt: Date.now(),
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
        templateInstance.uploadedFileName.set(fileObj.name);
        // console.log("fileObj= ",fileObj._id);
      });
      upload.start();
    }
  }
});