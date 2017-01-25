import { Meteor } from 'meteor/meteor';

Meteor.publish('myPlaylists', function myPlaylists() {
  return Playlists.find({
    userId: this.userId,
  }, {
    fields: { name: 1, fileURL: 1 },
  });
});
