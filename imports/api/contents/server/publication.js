import { Meteor } from 'meteor/meteor';

Meteor.publish('contents', function() {
  return Contents.find({});
});

// Meteor.publish('files.images.all', function () {
Meteor.publish('contents', function () {
    return Contents.find();
  });
