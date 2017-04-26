import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../components/contents/contentForm';
import '../components/contents/contentsList';
import './contentsPage.html';

Template.contentsPage.onCreated(function () {
  this.initialPage = new ReactiveVar(1);
  this.initialShowPerPage = new ReactiveVar(10);
  this.isCreateNew = new ReactiveVar(false);
  this.currentContent = new ReactiveVar();
  this.video = new ReactiveVar('x');
  Session.set("isDefaultPageLayout", true);
});

Template.contentsPage.helpers({
  isCreateNew: function isCreateNew() {
    return  !Session.get("isDefaultPageLayout") && Template.instance().isCreateNew.get();
  },
  getCurrentContent: function getContent() {
    return Template.instance().currentContent.get();
  },
  showPerPage: function showPerPage() {
    return Template.instance().showPerPage.get();
  },
  options: function getOptions() {
    const initialPage = Template.instance().initialPage.get();
    const initialShowPerPage = Template.instance().initialShowPerPage.get();
    const options = { header: "List of all contents", enableButtonDelete: true,
                      enableButtonEdit: true, enableButtonCloseListOfContents: false,
                      initialPage: initialPage, initialShowPerPage: initialShowPerPage,
                      enableButtonNewContent: Session.get("isDefaultPageLayout") || !Template.instance().isCreateNew.get(),
                      enableFilter: true, enableButtonAddToCG: true };
    const includedCGsWithOptions = { options: options };
    return includedCGsWithOptions;
  },
  getVideoId: function getVideoId() {
    return Template.instance().video.get();
  },
});

Template.contentsPage.events({
  'click #buttonNew, click #button-edit-content': function createNewContent(event, templateInstance) {
    event.preventDefault();
    this.video = new ReactiveVar('x');
    templateInstance.currentContent.set(this);
    Session.set("isDefaultPageLayout", false);
    templateInstance.isCreateNew.set(true);
  },
  'click #button-close-content-form, click #btn-save-content': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
  'click #button-play-content': function closeForm(event, templateInstance) {
    event.preventDefault();
    $('#media-video-modal').modal('show');
    const content = this;
    if (content.type == "m") {
      const media = Medien.findOne({ _id: content.mediaId });
      templateInstance.video.set(media);
    } else {
      templateInstance.video.set("x");
    }
    // templateInstance.video.set(this);
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
