import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './home.html';
import '../components/logoutbutton';


Template.home.onCreated(function () {
  this.subscribe('myPlaylists');
});

Template.home.events({
  'click #submitPlaylist': function submitPlaylist(event) {
    event.preventDefault();
    Meteor.call('createPlayList', { name: $('#playlistName').val(), fileURL: $('#playlistURL').val() });
  },
});
