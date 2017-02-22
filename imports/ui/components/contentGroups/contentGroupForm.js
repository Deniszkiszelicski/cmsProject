import { Template } from 'meteor/templating';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import { $ } from 'meteor/jquery';
import './contentGroupForm.html';

Template.contentGroupForm.onCreated(function () {
  this.isSelectContent = new ReactiveVar(false);
  this.isNewMedia = new ReactiveVar(false);
  let media;
  if (!!this.data.mediaId) {
    media = Medien.findOne({ _id: this.data.mediaId });
  }
  this.media = new ReactiveVar(media);
});

Template.contentGroupForm.onRendered(function () {
});

Template.contentGroupForm.helpers({
  isBlocked: function isBlocked() {
    return this.blocked ? "checked" : "";
  },
});

Template.contentGroupForm.events({
  'click #btn-save-contentGroup': function saveContentGroupForm(event, templateInstance) {
    event.preventDefault();
    const contentGroup = { _id: this._id,
                      name: $('#nameOfContentGroup').val(),
                      duration: $('#durationOfContentGroup').val(),
                      blocked: $('#blocked').is(':checked'),
                    };
    console.log("saving CG contentGroup = ", contentGroup);
    Meteor.call('upsertContentGroup', contentGroup);
  },
  // 'click #btn-select-content': function selectContent(event, templateInstance) {
  //   event.preventDefault();
  //   templateInstance.isSelectContent.set(true);
  // },
  // 'click #btn-new-media': function createMedia(event, templateInstance) {
  //   event.preventDefault();
  //   templateInstance.isNewMedia.set(true);
  // },
  // 'click #button-close-media-form': function closeForm(event, templateInstance) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   templateInstance.isNewMedia.set(false);
  // },
  // 'click #button-close-media-collection': function closeMediaCollection(event, templateInstance) {
  //   event.preventDefault();
  //   templateInstance.isSelectMedia.set(false);
  // },
  // 'click .content-form .button-save': function saveNewMedia(event, templateInstance) {
  //   event.preventDefault();
  //   templateInstance.isNewMedia.set(false);
  //   const media = Medien.findOne({}, { sort: { 'createdAt': -1 } });
  //   templateInstance.media.set(media);
  // },
  // 'click .content-form .media-row': function markAsSelected(event, templateInstance){
  //   event.preventDefault();
  //   templateInstance.media.set(this);
  //   templateInstance.isSelectMedia.set(false);
  // },
});
