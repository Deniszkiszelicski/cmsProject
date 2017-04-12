import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import '../modals/deleteConfirmation';
import './content';
import '../pagination/paginationPanel';
import './contentsList.html';

Template.contentsList.onCreated(function () {
  this.currentPage = new ReactiveVar(this.data.options.initialPage);
  const showPerPage = this.data.options.initialShowPerPage;
  this.showPerPage = new ReactiveVar(showPerPage);
  this.lastPageNumber = new ReactiveVar(1);
  this.filterText = new ReactiveVar();
  this.contentToDelete = new ReactiveVar();
  const userId = Meteor.userId();
  const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
  const role = Roles.findOne({ _id: roleId });
  this.autorun(() => {
    const currentPage = this.currentPage.get();
    const showPerPage = this.showPerPage.get();
    const filterText = this.filterText.get();
    this.subscribe('medien');
    this.subscribe('contents', currentPage, showPerPage, filterText);
    this.subscribe('countContents', currentPage, showPerPage, filterText);
    const contentsCount = Counter.get("countContents");
    const lastPageNumber = Math.ceil(contentsCount / showPerPage);
    this.lastPageNumber.set(lastPageNumber > 0 ? lastPageNumber : 1);
  });
});

Template.contentsList.helpers({
  contentToDelete: function contentToDelete() {
    const content = Template.instance().contentToDelete.get();
    if (content) {
      return "Delete '" + content.name + "' content.";
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
  filteredContents: function filteredContents() {
    const userId = Meteor.userId();
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    const mayEdit = role.editContent;
    const mayDelete = role.deleteContent;
    let contentIds = [];
    const contentIdsWithColour = this.contents;
    let contentsWithOptions = [];
    if (contentIdsWithColour) {
      for (let i = 0; i < contentIdsWithColour.length; i++) {
        contentIds.push(contentIdsWithColour[i].id);
      }
      const contents = Contents.find({ _id: { "$in" : contentIds } }, {fields: {'colour': 0 }}).fetch();
      const l = contentIds.length;
      for (let i = 0; i < l; i++) {
        const currentContentId = contentIds[i];
        const ll = contents.length;
        for (j = 0; j < ll; j++) {
          let currentContentObj = Object.assign({}, contents[j]);
          if (currentContentObj._id == currentContentId) {
            const colour = contentIdsWithColour[i].colour;
            currentContentObj['colour'] = colour;
            contentsWithOptions.push(currentContentObj);
          }
        }
      }
    } else {
      let filterText = Template.instance().filterText.get();
      contentsWithOptions = Contents.find({name: { $regex: new RegExp(filterText), $options: 'i' }}).fetch();
    }
    const l = contentsWithOptions.length;
    if (l > 0) {
      for (i = 0; i < l; i++) {
        contentsWithOptions[i]["enableButtonDelete"] = mayDelete && this.options.enableButtonDelete;
        contentsWithOptions[i]["enableButtonEdit"] = mayEdit && this.options.enableButtonEdit;
      }
    }
    return contentsWithOptions;
  },
  enableButtonNewContent: function enableButtonNewContent() {
    const options = this.options;
    const userId = Meteor.userId();
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (options.enableButtonNewContent && role.createContent) {
      return true;
    }
    return false;
  },
});

Template.contentsList.events({
  'keyup #content-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  },
  'click #button-delete-confirmed': function deleteContent(event, templateInstance) {
    event.preventDefault();
    const content = templateInstance.contentToDelete.get();
    templateInstance.contentToDelete.set();
    Meteor.call('deleteContent', content._id);
    toastr["success"]("Content '" + content.name + "' has been deleted.");
  },
  'click .glyphicon-trash': function deleteContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.contentToDelete.set(this);
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
      const contentsCount = Counter.get("countContents");
      templateInstance.currentPage.set(1);
      templateInstance.lastPageNumber.set(Math.ceil(contentsCount / showPerPage));
    }
  },
});
