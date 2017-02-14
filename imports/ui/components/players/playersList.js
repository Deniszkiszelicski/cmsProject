import { Template } from 'meteor/templating';
import './playersList.html';
import './player';
import '../../../api/players/methods';
import '../../../api/players/collection';

Meteor.subscribe('players');

Template.playersList.helpers({
  players: () => {
    return Players.find().fetch();
  },
});
