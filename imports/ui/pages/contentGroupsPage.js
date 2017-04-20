import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/contentGroups/contentGroupsList';
import '../components/contentGroups/contentGroupForm';
import './contentGroupsPage.html';


Template.contentGroupsPage.onCreated(function () {
  this.initialPage = new ReactiveVar(1);
  this.initialShowPerPage = new ReactiveVar(10);
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
    const initialPage = Template.instance().initialPage.get();
    const initialShowPerPage = Template.instance().initialShowPerPage.get();
    const options = { header: "List of all content-groups", enableButtonDelete: true,
                      initialPage: initialPage, initialShowPerPage: initialShowPerPage,
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
  'click .pagination .page-number': function goToPage(event, templateInstance) {
    const pageN = parseInt(event.currentTarget.dataset.page);
    templateInstance.initialPage.set(pageN);
  },
  'click .pagination .page-go-forward': function goForward(event, templateInstance) {
    templateInstance.initialPage.set(templateInstance.initialPage.get() + 1);
  },
  'click .pagination .page-go-back': function goBack(event, templateInstance) {
    templateInstance.initialPage.set(templateInstance.initialPage.get() - 1);
  },
  'keyup #records-per-page-input': function (event, templateInstance) {
    const initialShowPerPage = parseInt(event.currentTarget.value);
    if (initialShowPerPage > 0) {
      templateInstance.initialShowPerPage.set(initialShowPerPage);
      templateInstance.initialPage.set(1);
    }
  },
});
