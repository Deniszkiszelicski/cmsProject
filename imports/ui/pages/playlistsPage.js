import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/playlists/playlistForm';
import '../components/playlists/playlistsList';
import './playlistsPage.html';

Meteor.subscribe('playlists');

Template.playlistsPage.helpers({
  isCreateNew: function isCreateNew () {
    return true;
  },
});
