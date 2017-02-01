import { Meteor } from 'meteor/meteor';

Meteor.publish('players', function() {
  return Players.find({});
});
