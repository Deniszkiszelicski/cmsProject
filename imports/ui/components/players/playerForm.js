import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './playerForm.html';
import '../../../api/players/methods';
import '../../../api/players/collection';

Meteor.subscribe('players');

Template.playerForm.events({
  'click .button-save': function upsertPlayer(event) {
    event.preventDefault();
    Meteor.call('upsertPlayer',
      { _id: this._id,
        name: $('#name').val(),
        playerId: $('#playerId').val(),
        location: $('#location').val(),
        address: $('#address').val(),
        postIndex: $('#postIndex').val(),
        townCity: $('#townCity').val(),
        district: $('#district').val(),
        // Play time hours begin
        mondayStart1: $('#mondayStart1').val(),
        mondayEnd1: $('#mondayEnd1').val(),
        mondayStart2: $('#mondayStart2').val(),
        mondayEnd2: $('#mondayEnd2').val(),
        tuesdayStart1: $('#tuesdayStart1').val(),
        tuesdayEnd1: $('#tuesdayEnd1').val(),
        tuesdayStart2: $('#tuesdayStart2').val(),
        tuesdayEnd2: $('#tuesdayEnd2').val(),
        wednesdayStart1: $('#wednesdayStart1').val(),
        wednesdayEnd1: $('#wednesdayEnd1').val(),
        wednesdayStart2: $('#wednesdayStart2').val(),
        wednesdayEnd2: $('#wednesdayEnd2').val(),
        thursdayStart1: $('#thursdayStart1').val(),
        thursdayEnd1: $('#thursdayEnd1').val(),
        thursdayStart2: $('#thursdayStart2').val(),
        thursdayEnd2: $('#thursdayEnd2').val(),
        fridayStart1: $('#fridayStart1').val(),
        fridayEnd1: $('#fridayEnd1').val(),
        fridayStart2: $('#fridayStart2').val(),
        fridayEnd2: $('#fridayEnd2').val(),
        saturdayStart1: $('#saturdayStart1').val(),
        saturdayEnd1: $('#saturdayEnd1').val(),
        saturdayStart2: $('#saturdayStart2').val(),
        saturdayEnd2: $('#saturdayEnd2').val(),
        sundayStart1: $('#sundayStart1').val(),
        sundayEnd1: $('#sundayEnd1').val(),
        sundayStart2: $('#sundayStart2').val(),
        sundayEnd2: $('#sundayEnd2').val() });
        // Play time hours end
  },
});
