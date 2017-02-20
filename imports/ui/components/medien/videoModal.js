import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import './videoModal.html';

Template.videoModal.onRendered(function () {
});

Template.videoModal.helpers({
  videoPath: function getVideoPath(){
    const video = Videos.findOne({ _id: this.fileId });
    if(!!video) {
      return video;
    } else {
      return false;
    }
  }
});
