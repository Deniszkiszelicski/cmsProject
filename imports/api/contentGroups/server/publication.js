import { Meteor } from 'meteor/meteor';

Meteor.publish('contentGroups', function() {
  return ContentGroups.find({});
});
