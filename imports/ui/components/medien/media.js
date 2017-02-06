import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './media.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Meteor.subscribe('medien');
Meteor.subscribe('files.images.all');

Template.media.helpers({
  imageFile: function () {
    const fileId = Medien.findOne({ _id: this._id }).fileId;
    console.log("fileId = ", fileId);
    console.log("this._id= ", this._id);
    return Images.findOne({ _id: fileId });
  },
  // videoFile: function () {
  //   return Videos.findOne();
  // }
});
