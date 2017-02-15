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
    console.log("media = ", media);
    console.log("validate media = ", Medien.simpleSchema().namedContext().validate({name: media.name, type: media.type }, { modifier: false, keys: ['name'] }));
    // Medien.update({ _id: media._id },
    //   { name: media.name,
    //     category: media.category,
    //     type: media.type,
    //     createdAt: media.createdAt,
    //     fileId: media.fileId },
    //     { upsert: true, multi: false });
    if (!!media._id ) {
      Medien.update({ _id: media._id },
        { $set: {
          name: media.name,
          category: media.category,
          type: media.type,
          createdAt: media.createdAt,
          fileId: media.fileId
        }
        });
    } else {
      Medien.insert(
        { name: media.name,
          category: media.category,
          type: media.type,
          fileId: media.fileId },
          );
    }

  },
  deleteMedia: function(id) {
    Medien.remove(id);
  },
});
