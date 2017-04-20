import { Template } from 'meteor/templating';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import '../modals/deleteConfirmation';
import './contentGroup';
import '../pagination/paginationPanel';
import './contentGroupsList.html';

Template.contentGroupsList.onCreated(function () {
  this.currentPage = new ReactiveVar(this.data.options.initialPage);
  const showPerPage = this.data.options.initialShowPerPage;
  this.showPerPage = new ReactiveVar(showPerPage);
  this.lastPageNumber = new ReactiveVar(1);
  this.filterText = new ReactiveVar();
  this.contentGroupToDelete = new ReactiveVar();
  const userId = Meteor.userId();
  const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
  const role = Roles.findOne({ _id: roleId });
  this.role = new ReactiveVar(role);
  this.autorun(() => {
    const currentPage = this.currentPage.get();
    const showPerPage = this.showPerPage.get();
    const filterText = this.filterText.get();
    this.subscribe('medien');
    this.subscribe('contents');
    this.subscribe('contentGroups', currentPage, showPerPage, filterText);
    this.subscribe('countContentGroups', currentPage, showPerPage, filterText);
    const contentGroupsCount = Counter.get("countContentGroups");
    const lastPageNumber = Math.ceil(contentGroupsCount / showPerPage);
    this.lastPageNumber.set(lastPageNumber > 0 ? lastPageNumber : 1);
  });
});

Template.contentGroupsList.helpers({
  filteredContentGroups: function filteredContentGroups() {
    const options = Template.currentData();
    const contentGroups = this.contentGroups;
    let contentGroupsWithOptions;
    if (contentGroups) {
      contentGroupsWithOptions = contentGroups;
    } else {
      let filterText = Template.instance().filterText.get();
      contentGroupsWithOptions = ContentGroups.find({name: { $regex: new RegExp(filterText), $options: 'i' }}).fetch();
    }
    const role = Template.instance().role.get();
    const mayEdit = role.editContentGrp;
    const mayDelete = role.deleteContentGrp;
    const l = contentGroupsWithOptions.length;
    if (l > 0) {
      for (i = 0; i < l; i++) {
        contentGroupsWithOptions[i]["enableButtonDelete"] = mayDelete && this.options.enableButtonDelete;
        contentGroupsWithOptions[i]["enableButtonEdit"] = mayEdit && this.options.enableButtonEdit;
        contentGroupsWithOptions[i]["enableButtonRemove"] = this.options.enableButtonRemove;
      }
    }
    return contentGroupsWithOptions;
  },
  contentGroupToDelete: function contentGroupToDelete() {
    const contentGroup = Template.instance().contentGroupToDelete.get();
    if (contentGroup) {
      return "Delete '" + contentGroup.name + "' content-group.";
    }
  },
  showPerPage: function showPerPage() {
    return Template.instance().showPerPage.get();
  },
  optionsForPagination: function getOptionsForPagination() {
    const initialPage = Template.instance().currentPage.get();
    const lastPageNumber = Template.instance().lastPageNumber.get();
    const options = { initialPage: initialPage,
                      lastPageNumber: lastPageNumber, };
    return { options: options };
  },
  enableButtonNewCG: function enableButtonNewCG() {
    const role = Template.instance().role.get();
    const options = this.options;
    if (options.enableButtonNewCG && role.createContentGrp) {
      return true;
    }
    return false;
  },
});

Template.contentGroupsList.events({
  'keyup #contentGroup-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
    templateInstance.currentPage.set(1);
  },
  'click #button-delete-confirmed': function deleteContentGroup(event, templateInstance) {
    event.preventDefault();
    const contentGroup = templateInstance.contentGroupToDelete.get();
    templateInstance.contentGroupToDelete.set();
    Meteor.call('deleteContentGroup', contentGroup._id);
    toastr["success"]("Content-group '" + contentGroup.name + "' has been deleted.");
  },
  'click .glyphicon-trash': function deleteContentGroup(event, templateInstance) {
    event.preventDefault();
    templateInstance.contentGroupToDelete.set(this);
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
      const contentGroupsCount = Counter.get("countContentGroups");
      templateInstance.currentPage.set(1);
      templateInstance.lastPageNumber.set(Math.ceil(contentGroupsCount / showPerPage));
    }
  },
});
