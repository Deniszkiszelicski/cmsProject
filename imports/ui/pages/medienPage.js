import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './medienPage.html';
import '../components/logoutbutton';
import '../components/medien/mediaForm';
import '../components/medien/medienList';
import '../components/medien/mediaUpload';
import '../components/medien/media';

Meteor.subscribe('files.images.all');

Template.medienPage.onCreated(function onCreated() {
  this.isCreateNew = new ReactiveVar(false);
});

Template.medienPage.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
});

Template.medienPage.events({
  'click .button-new': function createNewMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-media-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
