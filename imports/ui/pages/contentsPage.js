import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/contents/contentForm';
import '../components/contents/contentsList';
import './contentsPage.html';

Template.contentsPage.onCreated(function () {
  this.isCreateNew = new ReactiveVar(false);
  this.currentContent = new ReactiveVar();
  Session.set("isDefaultPageLayout", true);
});

Template.contentsPage.helpers({
  isCreateNew: function isCreateNew() {
    return  !Session.get("isDefaultPageLayout") && Template.instance().isCreateNew.get();
  },
  getCurrentContent: function getContent() {
    return Template.instance().currentContent.get();
  },
  options: function getOptions() {
    const options = { header: "List of all contents", enableButtonDelete: true,
                      enableButtonEdit: true, enableButtonCloseListOfContents: false,
                      enableButtonNewContent: Session.get("isDefaultPageLayout") || !Template.instance().isCreateNew.get(),
                      enableFilter: true, enableButtonAddToCG: true };
    const includedCGsWithOptions = { options: options };
    return includedCGsWithOptions;
  },
});

Template.contentsPage.events({
  'click #buttonNew, click #button-edit-content': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.currentContent.set(this);
    Session.set("isDefaultPageLayout", false);
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-content-form, click #btn-save-content': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
