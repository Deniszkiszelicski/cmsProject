import { Template } from 'meteor/templating';
import '../../../api/playlists/methods';
import '../../../api/playlists/collection';
import '../contentGroups/contentGroupsList';
import './playlistForm.html';

Meteor.subscribe('playlists');

Template.playlistForm.onCreated(function () {
  this.isShowCGs = new ReactiveVar(false);
  let includedCGObjects = [];
  const includedCGIds = this.data.contentGroupIds;
  if(!!includedCGIds) {
    const sizeOfIncCGIds = includedCGIds.length;
    if (sizeOfIncCGIds > 0) {
      for (i = 0; i < sizeOfIncCGIds; i++) {
        let tempCGId = includedCGIds[i];
        let tempCG = ContentGroups.findOne({ _id: tempCGId});
        includedCGObjects.push(tempCG);
      }
    }
  }
  this.includedCGs = new ReactiveVar(includedCGObjects);
});

Template.playlistForm.helpers({
  isShowCGs: () => {
    return Template.instance().isShowCGs.get();
  },
  includedContentGroups: function includedContentGroups() {
    let includedCGsWithExtra = Template.instance().includedCGs.get();
    if (!!includedCGsWithExtra) {
      const l = includedCGsWithExtra.length;
      if (l > 0) {
        for (i = 0; i < l; i++) {
          includedCGsWithExtra[i]["disableButtonDelete"] = true;
          includedCGsWithExtra[i]["disableButtonEdit"] = true;
          includedCGsWithExtra[i]["enableButtonRemove"] = true;
        }
      }
    }
    return includedCGsWithExtra;
  },
});

Template.playlistForm.events({
  'click #btn-show-linkedContentGroups': function showLinkedCG(event, templateInstance) {
    event.preventDefault();
    templateInstance.isShowCGs.set(true);
  },
  'click .playlist-form #contentGroup-collection-fieldset .contentGroup-row': function markAsSelected(event, templateInstance){
    event.preventDefault();
    let includedCGs = templateInstance.includedCGs.get();
    includedCGs.push(this);
    templateInstance.includedCGs.set(includedCGs);
  },
  'click #btn-save-playlist': function savePlaylist(event, templateInstance) {
    event.preventDefault();
    let contentGroups = templateInstance.includedCGs.get();
    const l = contentGroups.length;
    let contentGroupIds = [];
    if (l > 0) {
      for (i = 0; i < l; i++) {
        contentGroupIds.push(contentGroups[i]._id);
      }
    }
    const playlist = { _id: this._id,
                      playerId: $('#playerId').val(),
                      contentGroupIds: contentGroupIds,
                    };
    Meteor.call('upsertPlaylist', playlist);
  },
});
