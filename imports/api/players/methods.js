import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  //  TODO: Add check for remaining fields
  upsertPlayer: function (player) {
    check(player.name, String);
    check(player.playerId, String);
    check(player.location, String);
    check(player.address, String);
    check(player.postIndex, String);
    check(player.townCity, String);
    check(player.district, String);
    check(player.playTime, String);
    console.log('before update');
    Players.update({ _id: player._id },
      { name: player.name,
        playerId: player.playerId,
        location: player.location,
        address: player.address,
        postIndex: player.postIndex,
        townCity: player.townCity,
        district: player.district,
        playTime: player.playTime,

        mondayStart1: player.mondayStart1,
        mondayEnd1: player.mondayEnd1,
        mondayStart2: player.mondayStart2,
        mondayEnd2: player.mondayEnd2,
        tuesdayStart1: player.tuesdayStart1,
        tuesdayEnd1: player.tuesdayEnd1,
        tuesdayStart2: player.tuesdayStart2,
        tuesdayEnd2: player.tuesdayEnd2,
        wednesdayStart1: player.wednesdayStart1,
        wednesdayEnd1: player.wednesdayEnd1,
        wednesdayStart2: player.wednesdayStart2,
        wednesdayEnd2: player.wednesdayEnd2,
        thursdayStart1: player.thursdayStart1,
        thursdayEnd1: player.thursdayEnd1,
        thursdayStart2: player.thursdayStart2,
        thursdayEnd2: player.thursdayEnd2,
        fridayStart1: player.fridayStart1,
        fridayEnd1: player.fridayEnd1,
        fridayStart2: player.fridayStart2,
        fridayEnd2: player.fridayEnd2,
        saturdayStart1: player.saturdayStart1,
        saturdayEnd1: player.saturdayEnd1,
        saturdayStart2: player.saturdayStart2,
        saturdayEnd2: player.saturdayEnd2,
        sundayStart1: player.sundayStart1,
        sundayEnd1: player.sundayEnd1,
        sundayStart2: player.sundayStart2,
        sundayEnd2: player.sundayEnd2 },
        { upsert: true, multi: false });
  },
  deletePlayer: function(id) {
    Players.remove(id);
  },
});
