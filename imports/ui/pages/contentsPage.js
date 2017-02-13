import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/contents/contentForm';
import '../components/contents/contentsList';
import './contentsPage.html';

Template.contentsPage.onCreated(function () {
  this.isCreateNew = new ReactiveVar(false);
});

Template.contentsPage.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
});

Template.contentsPage.events({
  'click .button-new': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-content-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
