import { Template } from 'meteor/templating';
import { FilesCollection } from 'meteor/ostrio:files';
import { $ } from 'meteor/jquery';
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

// screenshot
Template.mediaUpload.events({
'change #fileInput' : function(event,template){

var canvas_elem = $( '<canvas class=snapshot_generator></canvas>' ).appendTo(document.body)[0];
var $video = $( '<video muted class=snapshot_generator></video>' ).appendTo(document.body);
var file = URL.createObjectURL(event.target.files[0]);
var step_2_events_fired = 0;
$video.one('loadedmetadata loadeddata suspend', function() {
  if (++step_2_events_fired == 3) {
    $video.one('seeked', function() {
      canvas_elem.height = this.videoHeight;
      canvas_elem.width = this.videoWidth;
      canvas_elem.getContext('2d').drawImage(this, 0, 0);
      var snapshot = canvas_elem.toDataURL();
      console.log(snapshot);



      // Delete the elements as they are no longer needed
      $video.remove();
      $(canvas_elem).remove();
    }).prop('currentTime',5);
  }

}).prop('src',file);
  console.log(file + "file");


},
});

// screenshot
