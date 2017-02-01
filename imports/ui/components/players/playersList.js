import { Template } from 'meteor/templating';
import './playersList.html';
import './player';
import '../../../api/players/methods';
import '../../../api/players/collection';

Meteor.subscribe('content');

Template.playersList.helpers({
  players: () => {
    return Players.find().fetch();
  },
});
