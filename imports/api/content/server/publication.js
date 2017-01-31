import { Meteor } from 'meteor/meteor';

Meteor.publish('content', function() {
  return Content.find({});
});
