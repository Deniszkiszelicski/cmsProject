import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import '../../../api/players/methods';
import '../../../api/players/collection';
import '../playlists/playlistContentPart';
import './playerForm.html';

Meteor.subscribe('players');

Template.playerForm.onCreated(function () {
  this.isShowCGs = new ReactiveVar(false);
  this.playlistId = new ReactiveVar(this.data.playlistId);
  const roleId = Meteor.user().profile.role;
  const networkId = Roles.findOne({ _id: roleId }).networkId;
  const network = Networks.findOne({ _id: networkId });
  const assortiment = network.sortiment;
  const regions = network.region;
  this.assortiment = new ReactiveVar(assortiment);
  this.regions = new ReactiveVar(regions);

  this.playerId = new ReactiveVar(this.data._id);
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

Template.playerForm.helpers({
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
  getDistricts: function getDistricts() {
    const districts = [ "Burgenland", "Kärnten", "Niederösterreich",
                        "Oberösterreich", "Salzburg", "Steiermark",
                        "Tirol", "Vorarlberg", "Wien"];
    return districts;
  },
  includedContents: function includedContents() {
    const includedCGs = Template.instance().includedCGs.get();
    let includedContentIds = [];
    for (i = 0; i < includedCGs.length; i++) {
      includedContentIds = includedContentIds.concat(includedCGs[i].contentIds);
    }
    let includedContentObjects;
    const options = { header: "Included contents", enableButtonDelete: false,
                      enableButtonEdit: false, enableButtonRemove: true,
                      enableButtonNewCG: false, enableFilter: false,
                      enableButtonRemove: true };
    const includedContentsWithOptions = { contents: includedContentIds, options: options};
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
  listOfAssortiment: function getArrayOfAssortimen() {
    const assortiment = Template.instance().assortiment.get();
    return assortiment;
  },
  getTypePresence: function getTypeValue() {
    const assortiment = Template.instance().data.assortiment;
    if (assortiment) {
      return assortiment.indexOf(this.valueOf()) > -1 ? "checked" : "";
    }
  },
  regions: function getArrayOfRegions(event) {
    const regions = Template.instance().regions.get();
    return regions;
  },
  getRegionPresence: function getRegionPresence() {
    const regions = Template.instance().data.regions;
    if (regions) {
      return regions.indexOf(this.valueOf()) > -1 ? "checked" : "";
    }
  },
  playlists: function playlists() {
    const playlistId = Template.instance().playlistId.get();
    return Playlists.find({ _id: {$ne : playlistId } }).fetch();
  },
  isPlaylistChosen: function isPlaylistChosen() {
    if (Template.instance().playlistId.get()) {
      return true;
    }
    return false;
  },
  isDistrictChosen: function isDistrictChosen() {
    if (this.district) {
      return true;
    }
    return false;
  },
  getPlaylist: function getPlaylist() {
    const playlistId = Template.instance().playlistId.get();
    if (playlistId) {
      return Playlists.findOne({ _id: playlistId });
    }
  },
});

Template.playerForm.events({
  'click .button-save': function upsertPlayer(event, templateInstance) {
    event.preventDefault();
    let assortiment = [];
    let regions = [];
    $('.player-assortiment').each(function(){
      if ($(this).is(':checked')) {
        assortiment.push($(this).val());
      }
    });
    $('.player-regions').each(function(){
      if ($(this).is(':checked')) {
        regions.push($(this).val());
      }
    });
    let contentGroups = templateInstance.includedCGs.get();
    const l = contentGroups.length;
    let contentGroupIds = [];
    if (l > 0) {
      for (i = 0; i < l; i++) {
        contentGroupIds.push(contentGroups[i]._id);
      }
    }
    const playlistId = $('#select-playlist').val();
    const name = $('#name').val();
    const playerId = $('#playerId').val();
    Meteor.call('upsertPlayer',
      { _id: this._id,
        name: name,
        playerId: playerId,
        location: $('#location').val(),
        address: $('#address').val(),
        postIndex: $('#postIndex').val(),
        townCity: $('#townCity').val(),
        district: $('#district').val(),
        // Play time hours begin
        mondayStart1: $('#mondayStart1').val(),
        mondayEnd1: $('#mondayEnd1').val(),
        mondayStart2: $('#mondayStart2').val(),
        mondayEnd2: $('#mondayEnd2').val(),
        tuesdayStart1: $('#tuesdayStart1').val(),
        tuesdayEnd1: $('#tuesdayEnd1').val(),
        tuesdayStart2: $('#tuesdayStart2').val(),
        tuesdayEnd2: $('#tuesdayEnd2').val(),
        wednesdayStart1: $('#wednesdayStart1').val(),
        wednesdayEnd1: $('#wednesdayEnd1').val(),
        wednesdayStart2: $('#wednesdayStart2').val(),
        wednesdayEnd2: $('#wednesdayEnd2').val(),
        thursdayStart1: $('#thursdayStart1').val(),
        thursdayEnd1: $('#thursdayEnd1').val(),
        thursdayStart2: $('#thursdayStart2').val(),
        thursdayEnd2: $('#thursdayEnd2').val(),
        fridayStart1: $('#fridayStart1').val(),
        fridayEnd1: $('#fridayEnd1').val(),
        fridayStart2: $('#fridayStart2').val(),
        fridayEnd2: $('#fridayEnd2').val(),
        saturdayStart1: $('#saturdayStart1').val(),
        saturdayEnd1: $('#saturdayEnd1').val(),
        saturdayStart2: $('#saturdayStart2').val(),
        saturdayEnd2: $('#saturdayEnd2').val(),
        sundayStart1: $('#sundayStart1').val(),
        sundayEnd1: $('#sundayEnd1').val(),
        sundayStart2: $('#sundayStart2').val(),
        sundayEnd2: $('#sundayEnd2').val(),
        assortiment: assortiment,
        regions: regions,
        contentGroupIds: contentGroupIds,
        playlistId: playlistId,
       });
    toastr["success"]("Player '" + name + "' (ID = " + playerId + ") has been saved.");
  },
  'click #btn-show-linkedContentGroups': function showLinkedCG(event, templateInstance) {
    event.preventDefault();
    templateInstance.isShowCGs.set(true);
  },
  'click .player-form #contentGroup-collection-fieldset .contentGroup-row': function markAsSelected(event, templateInstance){
    event.preventDefault();
    let includedCGs = templateInstance.includedCGs.get();
    includedCGs.push(this);
    templateInstance.includedCGs.set(includedCGs);
  },
  'click #button-remove-contentGroup': function removeCG(event, templateInstance) {
    event.preventDefault();
    let includedCGs = templateInstance.includedCGs.get();
    const index = includedCGs.indexOf(this);
    if (index > -1) {
      includedCGs.splice(index, 1);
    }
    templateInstance.includedCGs.set(includedCGs);
  },
  'click #button-close-contentGroup-collection': function closeMediaCollection(event, templateInstance) {
    event.preventDefault();
    templateInstance.isShowCGs.set(false);
  },
  'change #select-playlist': function updateSelectedPlaylist(event, templateInstance) {
    const playlistId = event.target.value;
    templateInstance.playlistId.set(playlistId);
  },
});
