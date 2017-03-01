import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import '../components/medien/videoModal';
import '../components/logoutbutton';
import '../components/medien/mediaForm';
import '../components/medien/medienList';
import '../components/medien/mediaUpload';
import '../components/medien/media';
import './medienPage.html';

Meteor.subscribe('files.images.all');

Template.medienPage.onCreated(function onCreated() {
  this.isCreateNew = new ReactiveVar(false);
  this.video = new ReactiveVar('x');
  Session.set("isDefaultPageLayout", true);
});

Template.medienPage.helpers({
  isCreateNew: function isCreateNew() {
    return !Session.get("isDefaultPageLayout") && Template.instance().isCreateNew.get();
  },
  getVideoId: function getVideoId() {
    return Template.instance().video.get();
  }
});

Template.medienPage.events({
  'click .button-new': function createNewMedia(event, templateInstance) {
    event.preventDefault();
    Session.set("isDefaultPageLayout", false);
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-media-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
  'click #button-play-media': function closeForm(event, templateInstance) {
    event.preventDefault();
    $('#media-video-modal').modal('show');
    console.log("from the medien page, this = ", this);
    templateInstance.video.set(this);
  },
});
