import { Template } from 'meteor/templating';
import './media.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Meteor.subscribe('medien');
Meteor.subscribe('files.images.all');

Template.media.helpers({
  imageFile: function () {
    const media = Medien.findOne({ _id: this._id });
    if(!!media){
      fileId = media.fileId;
    }
    return Images.findOne({ _id: fileId });
  },
  // videoFile: function () {
  //   return Videos.findOne();
  // }
});
