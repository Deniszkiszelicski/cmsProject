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
    // Medien.update({ _id: media._id },
    //   { name: media.name,
    //     category: media.category,
    //     type: media.type,
    //     createdAt: media.createdAt,
    //     fileId: media.fileId },
    //     { upsert: true, multi: false });
    const userId = this.userId;
    if (userId) {
      const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
      const role = Roles.findOne({ _id: roleId });
      if (role) {
        if (role.createVideoImg && !media._id) {
          Medien.insert(
            { name: media.name,
              category: media.category,
              type: media.type,
              fileId: media.fileId },
              );
        }
        if (role.editVideoImg && media._id) {
          Medien.update({ _id: media._id },
            { $set: {
              name: media.name,
              category: media.category,
              type: media.type,
              fileId: media.fileId
                    }
            });
        }
      }
    }
  },
  deleteMedia: function(id) {
    const userId = this.userId;
    if (userId) {
      const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
      const role = Roles.findOne({ _id: roleId });
      if (role) {
        if (role.deleteVideoImg) {
          Medien.remove(id);
        }
      }
    }
  },
});
