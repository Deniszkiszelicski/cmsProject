import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import './videoModal.html';

Template.videoModal.onRendered(function () {
});

Template.videoModal.helpers({
  videoPath: function getVideoPath(){
    const type = this.type;
    if (type == "video") {
      const video = Videos.findOne({ _id: this.fileId });
      if(video) {
        return video;
      }
    }
    return false;
  },
  imagePath: function getImagePath() {
    const type = this.type;
    if (type == "image") {
      const image = Images.findOne({ _id: this.fileId });
      if(image) {
        return image;
      }
    }
    return false;
  }
});
