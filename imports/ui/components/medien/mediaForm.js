import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import './searchCategory';
import './mediaForm.html';


// Meteor.subscribe('medien');
Meteor.subscribe('files.images.all');
Meteor.subscribe('files.videos.all');

Template.mediaForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.uploadedFileId = new ReactiveVar();
  this.uploadedFileName = new ReactiveVar();
  this.uploadedFileType = new ReactiveVar();
});

Template.mediaForm.onRendered(function () {
  const fileId = this.data.fileId;
  if(!!fileId) {
    const type = this.data.type;
    let fileName;
    if (type.match(/image/)) {
      fileName = Images.findOne({ _id: fileId }).name;
    }
    if (type.match(/video/)) {
      fileName = Videos.findOne({ _id: fileId }).name;
    }
    Template.instance().uploadedFileName.set(fileName);
    Template.instance().uploadedFileId.set(fileId);
  }
});

Template.mediaForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  category: function () {
    const category = this.category;
    return category;
  },
  getCategories: function getCategories () {
    const categories = Medien.find({}, { fields: { category: 1 } }).fetch().map(function(it) { return it.category; });
    return _.uniq(categories);
  },
  uploadedFileName: function () {
    return Template.instance().uploadedFileName.get();
  }
});

Template.mediaForm.events({
  'click .mediaSave': function upsertMedia(event, templateInstance) {
    event.preventDefault();
    let fileId = templateInstance.uploadedFileId.get();
    const name = $('#nameOfMedia').val();
    Meteor.call('upsertMedia',
      { _id: this._id,
        name: name,
        category: $('#searchCategories').val(),
        type: templateInstance.uploadedFileType.get(),
        // createdAt: Date.now(),
        fileId: fileId });
    toastr["success"]("Media '" + name + "' has been saved.");
  },
  'change #fileInput': function (e, templateInstance) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const type = e.currentTarget.files[0].type;
      // var upload;
      let upload;
      if (type.match(/image/)) {
        upload = Images.insert({
          file: e.currentTarget.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);
        templateInstance.uploadedFileType.set("image");
      }
      if (type.match(/video/)) {
        upload = Videos.insert({
          file: e.currentTarget.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);
        templateInstance.uploadedFileType.set("video");
      }
      upload.on('start', function () {
        templateInstance.currentUpload.set(this);
      });
      upload.on('end', function (error, fileObj) {
        templateInstance.uploadedFileId.set(fileObj._id);
        templateInstance.currentUpload.set(false);
        templateInstance.uploadedFileName.set(fileObj.name);
      });
      upload.start();
    }
  },
});
