import { Meteor } from 'meteor/meteor';

Meteor.methods({
  //  TODO: Add check for fields
  upsertPlaylist: function (playlist) {
    if (!!playlist._id ) {
      Playlists.update({ _id: playlist._id },
        { $set: {
                          playerId: playlist.playerId,
                          contentGroupIds: playlist.contentGroupIds,
                        },
          });
    } else {
      Playlists.insert({
                          playerId: playlist.playerId,
                          contentGroupIds: playlist.contentGroupIds,
                        },
          );
    }
  },
  deletePlaylist: function(id) {
    Playlists.remove(id);
  },
});
