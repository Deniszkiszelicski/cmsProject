import { Template } from 'meteor/templating';
import '../../../api/playlists/methods';
import '../../../api/playlists/collection';
import './playlist.html';

Template.playlist.onCreated(function onCreated() {
});

Template.playlist.helpers({
  mayEdit: function mayEdit() {
    return true; //TODO:
  },
  playerName: function getPlayerName() {
    const player = Players.findOne({ playerId : this.playerId });
    if (!!player) {
      return player.name;
    } else {
      return "";
    }
  },
  contentGroupNames: function getContentGroupsNames() {
    let contentGroupNames = [];
    const contentGroupIds = this.contentGroupIds;
    const l = contentGroupIds.length;
    for (i = 0; i < l; i++) {
      contentGroupNames.push(ContentGroups.findOne({ _id: contentGroupIds[i] }).name);
    }
    return contentGroupNames;
  },
});

Template.playlist.events({
  'click #button-delete-playlist': function deleteContentGroup(event) {
    event.preventDefault();
    Meteor.call('deletePlaylist', this._id);
  },
});
