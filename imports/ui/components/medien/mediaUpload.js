import { Template } from 'meteor/templating';
import { FilesCollection } from 'meteor/ostrio:files';
import { $ } from 'meteor/jquery';
import './mediaUpload.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Template.mediaUpload.events({
  // screenshot begin
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
          // Delete the elements as they are no longer needed
          $video.remove();
          $(canvas_elem).remove();
        }).prop('currentTime',5);
      }
    }).prop('src',file);
  },
});
// screenshot end
