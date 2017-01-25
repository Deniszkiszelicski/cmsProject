import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
Meteor.methods({
  createPlayList: function (playlistObject) {
    check(playlistObject.name, String);
    check(playlistObject.fileURL, String);
  Playlists.insert({ name: playlistObject.name, fileURL: playlistObject.fileURL,});
    console.log("inserted into db");
  },
});
