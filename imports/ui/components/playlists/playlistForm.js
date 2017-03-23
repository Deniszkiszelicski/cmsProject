import { Template } from 'meteor/templating';
import '../../../api/playlists/methods';
import '../../../api/playlists/collection';
import '../contentGroups/contentGroupsList';
import './playlistForm.html';

Meteor.subscribe('playlists');

Template.playlistForm.onCreated(function () {
  this.isShowCGs = new ReactiveVar(false);
  this.playerId = new ReactiveVar(this.data.playerId);
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
    const includedCGs = Template.instance().includedCGs.get();
    const options = { header: "Included content-groups", enableButtonDelete: false,
                      enableButtonEdit: false, enableButtonRemove: true,
                      enableButtonNewCG: false, enableFilter: false,
                      enableButtonRemove: true };
    const includedCGsWithOptions = { contentGroups: includedCGs, options: options};
    return includedCGsWithOptions;
  },
  includedContents: function includedContents() {
    const includedCGs = Template.instance().includedCGs.get();
    let contentIdsWithColour = [];
    for (i = 0; i < includedCGs.length; i++) {
      const contentIds = includedCGs[i].contentIds;
      const colour = includedCGs[i].colour;
      for (j = 0; j < contentIds.length; j++) {
        const contentIdWithColour = { id: contentIds[j], colour: colour };
        contentIdsWithColour.push(contentIdWithColour);
      }
    }
    const options = { header: "Included contents", enableButtonDelete: false,
                      enableButtonEdit: false, enableButtonRemove: true,
                      enableButtonNewCG: false, enableFilter: false,
                      enableButtonCloseListOfContents: false };
    const includedContentsWithOptions = { contents: contentIdsWithColour, options: options};
    return includedContentsWithOptions;
  },
  allContentGroups: function allContentGroups() {
    const options = { header: "List of all content-groups", enableButtonDelete: false,
                      enableButtonEdit: false, enableButtonRemove: false,
                      enableButtonNewCG: false, enableFilter: true,
                      enableButtonCloseListOfCG: true };
    const allCGsWithOptions = { options: options };
    return allCGsWithOptions;
  },
  playerName: () => {
    let playerId = Template.instance().playerId.get();
    let playerObject = Players.findOne({ playerId: playerId });
    if (!!playerObject) {
      return playerObject.name
    } else {
      return "";
    }
  },
});

Template.playlistForm.events({
  'click #btn-show-linkedContentGroups': function showLinkedCG(event, templateInstance) {
    event.preventDefault();
    templateInstance.isShowCGs.set(true);
  },
  'click #button-close-contentGroup-collection': function showLinkedCG(event, templateInstance) {
    event.preventDefault();
    templateInstance.isShowCGs.set(false);
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
    const name = $('#name').val();
    const playlist = { _id: this._id,
                      name: name,
                      tickerText: $('#tickerText').val(),
                      contentGroupIds: contentGroupIds,
                    };
    Meteor.call('upsertPlaylist', playlist);
    toastr["success"]("Playlist '" + name + "' has been saved.");
  },
  'keyup #playerId, mouseout #playerId': function storeSelectedPlayerId(event, templateInstance){
    event.preventDefault();
    templateInstance.playerId.set(event.currentTarget.value);
  },
  'click #button-remove-contentGroup': function removeCG(event, templateInstance) {
    event.preventDefault();
    let includedCGs = templateInstance.includedCGs.get();
    const index = includedCGs.indexOf(this);
    if (index > -1) {
      includedCGs.splice(index, 1);
    }
    templateInstance.includedCGs.set(includedCGs);
  }
});
