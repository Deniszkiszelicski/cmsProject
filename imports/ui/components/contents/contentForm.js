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
  getMonday: function getDayOfWeekValue() {
    return this.monday ? "checked" : "";
  },
  getTuesday: function getDayOfWeekValue() {
    return this.tuesday ? "checked" : "";
  },
  getWednesday: function getDayOfWeekValue() {
    return this.wednesday ? "checked" : "";
  },
  getThursday: function getDayOfWeekValue() {
    return this.thursday ? "checked" : "";
  },
  getFriday: function getDayOfWeekValue() {
    return this.friday ? "checked" : "";
  },
  getSaturday: function getDayOfWeekValue() {
    return this.saturday ? "checked" : "";
  },
  getSunday: function getDayOfWeekValue() {
    return this.sunday ? "checked" : "";
  },
  getDeleteAfterFinish: function getDeleteAfterFinish() {
    return this.deleteAfterFinish ? "checked" : "";
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
                      monday: $('#monday').is(':checked'),
                      tuesday: $('#tuesday').is(':checked'),
                      wednesday: $('#wednesday').is(':checked'),
                      thursday: $('#thursday').is(':checked'),
                      friday: $('#friday').is(':checked'),
                      saturday: $('#saturday').is(':checked'),
                      sunday: $('#sunday').is(':checked'),
                      playTimeHoursStart: $('#playTimeHoursStart').val(),
                      playTimeHoursFinish: $('#playTimeHoursFinish').val(),
                      deleteAfterFinish: $('#deleteAfterFinish').is(':checked'),
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
