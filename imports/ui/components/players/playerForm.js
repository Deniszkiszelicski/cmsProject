import { Template } from 'meteor/templating';
import './playerForm.html';
import '../../../api/players/methods';
import '../../../api/players/collection';

Meteor.subscribe('players');

Template.playerForm.events({
  'submit .player-form': function addPlayer(event) {
    event.preventDefault();
    Meteor.call('addPlayer',
      { _id: this._id,
        name: event.currentTarget.name.value,
        playerId: event.currentTarget.playerId.value,
        location: event.currentTarget.location.value,
        address: event.currentTarget.address.value,
        postIndex: event.currentTarget.postIndex.value,
        townCity: event.currentTarget.townCity.value,
        district: event.currentTarget.district.value,
        playTime: event.currentTarget.playTime.value });
  },
});
