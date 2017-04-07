import { Template } from 'meteor/templating';
import moment from 'moment';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import '../modals/deleteConfirmation';
import '../pagination/paginationPanel';
import './medienList.html';

Meteor.subscribe('files.images.all');

Template.registerHelper("prettifyDate", function(date) {
  return moment(date).format('Do MMM YY, HH:mm');
});

Template.medienList.onCreated(function () {
  this.currentPage = new ReactiveVar(1);
  this.showPerPage = new ReactiveVar(10);
  this.lastPageNumber = new ReactiveVar(1);
  this.filterText = new ReactiveVar();
  this.mediaToDelete = new ReactiveVar();
  const userId = Meteor.userId();
  const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
  const role = Roles.findOne({ _id: roleId });
  this.currentRole = new ReactiveVar(role);
  this.autorun(() => {
    const currentPage = this.currentPage.get();
    const showPerPage = this.showPerPage.get();
    const filterText = this.filterText.get();
    this.subscribe('medien', currentPage, showPerPage, filterText);
    this.subscribe('countMedien', currentPage, showPerPage, filterText);
    const medienCount = Counter.get("countMedien");
    const lastPageNumber = Math.ceil(medienCount / showPerPage);
    this.lastPageNumber.set(lastPageNumber > 0 ? lastPageNumber : 1);
  });
});

Template.medienList.helpers({
  medien: () => {
    return Medien.find().fetch();
  },
  filteredMedien: () => {
    const medienCurPage = Medien.find().fetch();
    const role = Template.instance().currentRole.get();
    const mayEdit = role.editVideoImg;
    const mayDelete = role.deleteVideoImg;
    const options = { enableButtonEditMedia: mayEdit,
                      enableButtonDeleteMedia: mayDelete };
    medienCurPage.forEach(function(element) {
      element["options"] = options;
    });
    return medienCurPage;
  },
  enableButtonNewMedia: function enableButtonNewMedia() {
    const role = Template.instance().currentRole.get();
    let mayCreate = false;
    if (role) {
      mayCreate = role.createVideoImg;
    }
    return this.options.enableButtonNewMedia && mayCreate;
  },
  mediaToDelete: function mediaToDelete() {
    const media = Template.instance().mediaToDelete.get();
    if (media) {
      return "Delete '" + media.name + "' media.";
    }
  },
  showPerPage: function showPerPage(position) {
    return Template.instance().showPerPage.get();
  },
  optionsForPagination: function getOptionsForPagination() {
    const initialPage = Template.instance().currentPage.get();
    const lastPageNumber = Template.instance().lastPageNumber.get();
    const options = { initialPage: initialPage,
                      lastPageNumber: lastPageNumber, };
    return { options: options };
  },
});

Template.medienList.events({
  'click #button-delete-confirmed': function deleteMedia(event, templateInstance) {
    event.preventDefault();
    const media = templateInstance.mediaToDelete.get();
    templateInstance.mediaToDelete.set();
    Meteor.call('deleteMedia', media._id);
    toastr["success"]("Media '" + media.name + "' has been deleted.");
  },
  'click .glyphicon-trash': function deleteMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.mediaToDelete.set(this);
  },
  'click .pagination .page-number': function goToPage(event, templateInstance) {
    const pageN = parseInt(event.currentTarget.dataset.page);
    templateInstance.currentPage.set(pageN);
  },
  'click .pagination .page-go-back': function goBack(event, templateInstance) {
    const currentPage = templateInstance.currentPage.get();
    templateInstance.currentPage.set(currentPage - 1);
  },
  'click .pagination .page-go-forward': function goForward(event, templateInstance) {
    const currentPage = templateInstance.currentPage.get();
    templateInstance.currentPage.set(currentPage + 1);
  },
  'keyup #records-per-page-input': function (event, templateInstance) {
    const showPerPage = parseInt(event.currentTarget.value);
    if (showPerPage > 0) {
      templateInstance.showPerPage.set(showPerPage);
      const medienCount = Counter.get("countMedien");
      templateInstance.currentPage.set(1);
      templateInstance.lastPageNumber.set(Math.ceil(medienCount / showPerPage));
    }
  },
  'keyup #media-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
    templateInstance.currentPage.set(1);
  }
});
