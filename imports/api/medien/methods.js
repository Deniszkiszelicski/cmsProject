import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  //  TODO: Add check for remaining fields
  upsertMedia: function (media) {
    // check(player.name, String);
    // check(player.playerId, String);
    // check(player.location, String);
    // check(player.address, String);
    // check(player.postIndex, String);
    // check(player.townCity, String);
    // check(player.district, String);
    // check(player.playTime, String);
    Medien.update({ _id: media._id },
      { name: media.name,
        fileId: media.fileId },
        { upsert: true, multi: false });
  },
  deleteMedia: function(id) {
    Medien.remove(id);
  },
});
