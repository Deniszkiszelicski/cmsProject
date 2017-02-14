import { Template } from 'meteor/templating';
import { FilesCollection } from 'meteor/ostrio:files';
import './mediaUpload.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

// Meteor.subscribe('medien');
// Meteor.subscribe('files.images.all');

// Template.mediaUpload.onCreated(function () {
//   this.currentUpload = new ReactiveVar(false);
//   this.uploadedFileId = new ReactiveVar();
// });
//
// Template.mediaUpload.helpers({
//   currentUpload: function () {
//     return Template.instance().currentUpload.get();
//   }
// });
//
// Template.mediaUpload.events({
//   'change #fileInput': function (e, templateInstance) {
//     if (e.currentTarget.files && e.currentTarget.files[0]) {
//       // We upload only one file, in case
//       // multiple files were selected
//       var upload = Images.insert({
//         file: e.currentTarget.files[0],
//         streams: 'dynamic',
//         chunkSize: 'dynamic'
//       }, false);
//
//       upload.on('start', function () {
//         templateInstance.currentUpload.set(this);
//       });
//
//       upload.on('end', function (error, fileObj) {
//         if (error) {
//           alert('Error during upload: ' + error);
//         } else {
//           alert('File "' + fileObj.name + '" successfully uploaded');
//         }
//         templateInstance.currentUpload.set(false);
//         templateInstance.uploadedFileId.set(fileObj._id);
//         console.log("fileObj= ",fileObj);
//       });
//
//       upload.start();
//
//     }
//   }
// });
