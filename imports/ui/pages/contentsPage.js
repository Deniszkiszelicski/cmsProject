import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/contents/contentForm';
import '../components/contents/contentsList';
import './contentsPage.html';

Template.contentsPage.onCreated(function () {
  this.isCreateNew = new ReactiveVar(false);
  this.currentContent = new ReactiveVar();
});

Template.contentsPage.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
  getCurrentContent: function getContent() {
    return Template.instance().currentContent.get();
  },
});

Template.contentsPage.events({
  'click .button-new, click #button-edit-content': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.currentContent.set(this);
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-content-form, click #btn-save-content': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
