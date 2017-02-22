import { Template } from 'meteor/templating';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import { $ } from 'meteor/jquery';
import './contentGroupForm.html';

Template.contentGroupForm.onCreated(function () {
  this.isSelectContent = new ReactiveVar(false);
  let contents;
  if (!!this.data.mediaId) {
    // content = Medien.findOne({ _id: this.data.contentId });
  }
  this.contents = new ReactiveVar(contents);
});

Template.contentGroupForm.onRendered(function () {
});

Template.contentGroupForm.helpers({
  isBlocked: function isBlocked() {
    return this.blocked ? "checked" : "";
  },
  isSelectContent: function isSelectContent() {
    return Template.instance().isSelectContent.get();
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
  'click #btn-select-content': function selectContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectContent.set(true);
  },
  // 'click #btn-new-media': function createMedia(event, templateInstance) {
  //   event.preventDefault();
  //   templateInstance.isNewMedia.set(true);
  // },
  // 'click #button-close-media-form': function closeForm(event, templateInstance) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   templateInstance.isNewMedia.set(false);
  // },
  'click #button-close-content-collection': function closeMediaCollection(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectContent.set(false);
  },
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
