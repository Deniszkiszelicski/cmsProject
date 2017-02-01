import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  //  TODO: Add check for remaining fields
  addPlayer: function (player) {
    check(player.name, String);
    check(player.playerId, String);
    check(player.location, String);
    check(player.address, String);
    check(player.postIndex, String);
    check(player.townCity, String);
    check(player.district, String);
    check(player.playTime, String);
    Players.update({ _id: player._id },
      { name: player.name,
        playerId: player.playerId,
        location: player.location,
        address: player.address,
        postIndex: player.postIndex,
        townCity: player.townCity,
        district: player.district,
        playTime: player.playTime },
        { upsert: true, multi: false });
  },
  deletePlayer: function(id) {
    Players.remove(id);
  },
});
