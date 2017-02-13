import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import '../medien/mediaForm';
import { $ } from 'meteor/jquery';
import './contentForm.html';

Meteor.subscribe('contents');

Template.contentForm.onCreated(function () {
  this.isSelectMedia = new ReactiveVar(false);
  this.isNewMedia = new ReactiveVar(false);
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
  mediaCollection: function getMedien() {
    console.log(Images.find().fetch());
    return Images.find().fetch();
  },
  isSelectMedia: function isSelectMedia() {
    return Template.instance().isSelectMedia.get();
  },
  isNewMedia: function isSelectMedia() {
    return Template.instance().isNewMedia.get();
  },
});

Template.contentForm.events({
  'click #btn-save-content': function saveContentForm(event, templateInstance) {
    event.preventDefault();
    let assortiment = ['type 1', 'type 2'];
    let regions = ['region 1', 'region 2', 'region 5'];

    const content = { _id: this._id,
                      name: $('#nameOfContent').val(),
                      duration: $('#durationOfContent').val(),
                      mixInTicker: $('#mixInTicker').val(),
                      collectStatisticts: $('#collectStatisticts').val(),
                      visibleForAll: $('#visibleForAll').val(),
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
  'click #button-close-media-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isNewMedia.set(false);
  },
});
