import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './playerForm.html';
import '../../../api/players/methods';
import '../../../api/players/collection';

Meteor.subscribe('players');

Template.playerForm.events({
  'submit .player-form': function upsertPlayer(event) {
    event.preventDefault();
    console.log('monday form input', $('#tuesdayEnd2').val());
    Meteor.call('addPlayer',
      { _id: this._id,
        name: event.currentTarget.name.value,
        playerId: event.currentTarget.playerId.value,
        location: event.currentTarget.location.value,
        address: event.currentTarget.address.value,
        postIndex: event.currentTarget.postIndex.value,
        townCity: event.currentTarget.townCity.value,
        district: event.currentTarget.district.value,
        // Play time hours begin
        mondayStart1: event.currentTarget.mondayStart1.value,
        mondayEnd1: event.currentTarget.mondayEnd1.value,
        mondayStart2: event.currentTarget.mondayStart2.value,
        mondayEnd2: event.currentTarget.mondayEnd2.value,
        tuesdayStart1: event.currentTarget.tuesdayStart1.value,
        tuesdayEnd1: event.currentTarget.tuesdayEnd1.value,
        tuesdayStart2: event.currentTarget.tuesdayStart2.value,
        tuesdayEnd2: event.currentTarget.tuesdayEnd2.value,
        wednesdayStart1: event.currentTarget.wednesdayStart1.value,
        wednesdayEnd1: event.currentTarget.wednesdayEnd1.value,
        wednesdayStart2: event.currentTarget.wednesdayStart2.value,
        wednesdayEnd2: event.currentTarget.wednesdayEnd2.value,
        thursdayStart1: event.currentTarget.thursdayStart1.value,
        thursdayEnd1: event.currentTarget.thursdayEnd1.value,
        thursdayStart2: event.currentTarget.thursdayStart2.value,
        thursdayEnd2: event.currentTarget.thursdayEnd2.value,
        fridayStart1: event.currentTarget.fridayStart1.value,
        fridayEnd1: event.currentTarget.fridayEnd1.value,
        fridayStart2: event.currentTarget.fridayStart2.value,
        fridayEnd2: event.currentTarget.fridayEnd2.value,
        saturdayStart1: event.currentTarget.saturdayStart1.value,
        saturdayEnd1: event.currentTarget.saturdayEnd1.value,
        saturdayStart2: event.currentTarget.saturdayStart2.value,
        saturdayEnd2: event.currentTarget.saturdayEnd2.value,
        sundayStart1: event.currentTarget.sundayStart1.value,
        sundayEnd1: event.currentTarget.sundayEnd1.value,
        sundayStart2: event.currentTarget.sundayStart2.value,
        sundayEnd2: event.currentTarget.sundayEnd2.value });
        // Play time hours end
  },
});
