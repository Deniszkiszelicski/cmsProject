import { Template } from 'meteor/templating';
import '../../../api/playlists/methods';
import '../../../api/playlists/collection';
import '../modals/deleteConfirmation';
import './playlist';
import './playlistsList.html';

Meteor.subscribe('playlists');

Template.playlistsList.onCreated(function () {
  this.filterText = new ReactiveVar();
  this.playlistToDelete = new ReactiveVar();
});

Template.playlistsList.helpers({
  filteredPlaylists: () => {
    let filterText = Template.instance().filterText.get();
    return Playlists.find({ name: { $regex: new RegExp(filterText), $options: 'i' } }).fetch();
  },
  playlistToDelete: function playlistToDelete() {
    const playlist = Template.instance().playlistToDelete.get();
    if (playlist) {
      return "Delete '" + playlist.name + "' playlist.";
    }
  },
});

Template.playlistsList.events({
  'keyup #playlist-filter-input': function setFilterText(event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  },
  'click #button-delete-confirmed': function deletePlaylist(event, templateInstance) {
    event.preventDefault();
    const playlist = templateInstance.playlistToDelete.get();
    templateInstance.playlistToDelete.set();
    Meteor.call('deletePlaylist', playlist._id);
    toastr["success"]("Playlist '" + playlist.name + "' has been deleted.");
  },
  'click .glyphicon-trash': function deletePlaylist(event, templateInstance) {
    event.preventDefault();
    templateInstance.playlistToDelete.set(this);
  },
});
