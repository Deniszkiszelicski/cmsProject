import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/contentGroups/contentGroupsList';
import '../components/contentGroups/contentGroupForm';
import './contentGroupsPage.html';

Template.contentGroupsPage.onCreated(function () {
  this.isCreateNew = new ReactiveVar(false);
  this.currentContentGroup = new ReactiveVar();
  Session.set("isDefaultPageLayout", true);
});

Template.contentGroupsPage.helpers({
  isCreateNew: function isCreateNew() {
    return !Session.get("isDefaultPageLayout") && Template.instance().isCreateNew.get();
  },
  getCurrentContentGroup: function getContentGroup() {
    return Template.instance().currentContentGroup.get();
  },
  options: function getOptions() {
    const options = { header: "List of all content-groups", enableButtonDelete: true,
                      enableButtonEdit: true, enableButtonRemove: false,
                      enableButtonNewCG: true, enableFilter: true,
                      enableButtonRemove: false };
    const includedCGsWithOptions = { options: options};
    return includedCGsWithOptions;
  },
});

Template.contentGroupsPage.events({
  'click #newCgBtn, click #button-edit-contentGroup': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.currentContentGroup.set(this);
    Session.set("isDefaultPageLayout", false);
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-contentGroup-form, click #btn-save-contentGroup': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
