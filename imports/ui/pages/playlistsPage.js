import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/playlists/playlistForm';
import '../components/playlists/playlistsList';
import './playlistsPage.html';

Meteor.subscribe('playlists');

Template.playlistsPage.onCreated(function () {
  this.isCreateNew = new ReactiveVar(false);
  this.currentPlaylist = new ReactiveVar();
});

Template.playlistsPage.helpers({
  isCreateNew: function isCreateNew () {
    return Template.instance().isCreateNew.get();
  },
  getCurrentPlaylist: function getCurrentPlaylist() {
    return Template.instance().currentPlaylist.get();
  },
});

Template.playlistsPage.events({
  'click .button-new, click #button-edit-playlist': function openPlaylistForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.currentPlaylist.set(this);
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-playlist-form, click #btn-save-playlist': function closePlaylistForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
