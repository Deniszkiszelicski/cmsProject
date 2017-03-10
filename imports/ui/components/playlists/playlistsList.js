import { Template } from 'meteor/templating';
import '../../../api/playlists/methods';
import '../../../api/playlists/collection';
import './playlistsList.html';
import './playlist';

Meteor.subscribe('playlists');

Template.playlistsList.onCreated(function () {
  this.filterText = new ReactiveVar();
});

Template.playlistsList.helpers({
  filteredPlaylists: () => {
    let filterText = Template.instance().filterText.get();
    return Playlists.find({ name: { $regex: new RegExp(filterText), $options: 'i' } }).fetch();
  },
});

Template.playlistsList.events({
  'keyup #playlist-filter-input': function setFilterText(event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  }
});
