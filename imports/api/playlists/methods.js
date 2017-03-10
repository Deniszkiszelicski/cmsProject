import { Meteor } from 'meteor/meteor';

Meteor.methods({
  //  TODO: Add check for fields
  upsertPlaylist: function (playlist) {
    if (!!playlist._id ) {
      Playlists.update({ _id: playlist._id },
        { $set: {
                          name: playlist.name,
                          contentGroupIds: playlist.contentGroupIds,
                        },
          });
    } else {
      Playlists.insert({
                          name: playlist.name,
                          contentGroupIds: playlist.contentGroupIds,
                        },
          );
    }
  },
  deletePlaylist: function(id) {
    Playlists.remove(id);
  },
});
