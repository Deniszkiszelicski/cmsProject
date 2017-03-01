import { Meteor } from 'meteor/meteor';

Meteor.publish('playlists', function() {
  return Playlists.find({});
});
