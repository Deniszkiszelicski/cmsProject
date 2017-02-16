import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import '../medien/mediaForm';
import { $ } from 'meteor/jquery';
import './contentForm.html';

Meteor.subscribe('contents');
Meteor.subscribe('medien');

Template.contentForm.onCreated(function () {
  this.isSelectMedia = new ReactiveVar(false);
  this.isNewMedia = new ReactiveVar(false);
  let media;
  if (!!this.data.mediaId) {
    media = Medien.findOne({ _id: this.data.mediaId });
  }
  this.media = new ReactiveVar(media);
});

Template.contentForm.onRendered(function () {
});

Template.contentForm.helpers({
  listOfAssortiment: function getArrayOfAssortimen(event) {
    return ["Toothpastes", "Shower gels", "Pills", "Social"];
  },
  regions: function getArrayOfRegions(event) {
    return ["Burgerland", "Carinthia", "Lower Austria", "Upper Austria", "Salzburg", "Styria", "Tyrol", "Vienna", "Vorarlberg"];
  },
  // mediaCollection: function getMedien() {
  //   return Images.find().fetch();
  // },
  selectedMedia: function selectedMedia() {
    let mediaWithExtra = Template.instance().media.get();
    if (!!mediaWithExtra) {
      mediaWithExtra['disableControls'] = true;
    }
    return mediaWithExtra;
  },
  clearContext: function clearContext() {
    return {};
  },
  isSelectMedia: function isSelectMedia() {
    return Template.instance().isSelectMedia.get();
  },
  isNewMedia: function isSelectMedia() {
    return Template.instance().isNewMedia.get();
  },
  getMixInTicker: function getMixInTicker() {
    return this.mixInTicker ? "checked" : "";
  },
  getCollectStatisticts: function getCollectStatisticts() {
    return this.collectStatisticts ? "checked" : "";
  },
  getVisibleForAll: function getVisibleForAll() {
    return this.visibleForAll ? "checked" : "";
  },
});

Template.contentForm.events({
  'click #btn-save-content': function saveContentForm(event, templateInstance) {
    event.preventDefault();
    let assortiment = ['type 1', 'type 2'];
    let regions = ['region 1', 'region 2', 'region 5'];
    const mediaId = templateInstance.media.get()._id;

    const content = { _id: this._id,
                      name: $('#nameOfContent').val(),
                      duration: $('#durationOfContent').val(),
                      mixInTicker: $('#mixInTicker').is(':checked'),
                      collectStatisticts: $('#collectStatisticts').is(':checked'),
                      visibleForAll: $('#visibleForAll').is(':checked'),
                      category: $('#categoryOfContent').val(),
                      startDate: $('#start').val(),
                      finishDate: $('#finish').val(),
                      monday: $('#monday').val(),
                      tuesday: $('#tuesday').val(),
                      wednesday: $('#wednesday').val(),
                      thursday: $('#thursday').val(),
                      friday: $('#friday').val(),
                      saturday: $('#saturday').val(),
                      sunday: $('#sunday').val(),
                      playTimeHoursStart: $('#playTimeHoursStart').val(),
                      playTimeHoursFinish: $('#playTimeHoursFinish').val(),
                      deleteAfterFinish: $('#deleteAfterFinish').val(),
                      assortiment: assortiment,
                      regions: regions,
                      mediaId: mediaId,
                    };
    Meteor.call('upsertContent', content);
  },
  'click #btn-select-media': function selectMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectMedia.set(true);
  },
  'click #btn-new-media': function createMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.isNewMedia.set(true);
  },
  'click #button-close-media-form': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isNewMedia.set(false);
  },
  'click #button-close-media-collection': function closeMediaCollection(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectMedia.set(false);
  },
  'click .content-form .button-save': function saveNewMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.isNewMedia.set(false);
    const media = Medien.findOne({}, { sort: { 'createdAt': -1 } });
    templateInstance.media.set(media);
  },
  'click .content-form .media-row': function markAsSelected(event, templateInstance){
    event.preventDefault();
    templateInstance.media.set(this);
    templateInstance.isSelectMedia.set(false);
  },
});
