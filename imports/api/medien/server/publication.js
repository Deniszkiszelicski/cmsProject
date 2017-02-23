import { Meteor } from 'meteor/meteor';

Meteor.publish('medien', function() {
  return Medien.find({});
});

// Meteor.publish('files.images.all', function () {
Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});

Meteor.publish('files.videos.all', function() {
  return Videos.find().cursor;
});
