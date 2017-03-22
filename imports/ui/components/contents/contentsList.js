import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import './contentsList.html';
import './content';

Meteor.subscribe('contents');

Template.contentsList.onCreated(function () {
  this.filterText = new ReactiveVar();
  this.contentToDelete = new ReactiveVar();
});

Template.contentsList.helpers({
  contents: () => {
    return Contents.find().fetch();
  },
  contentToDelete: function contentToDelete() {
    const content = Template.instance().contentToDelete.get();
    if (content) {
      return "Delete '" + content.name + "' content.";
    }

  },
  filteredContents: function filteredContents() {
    let contentIds = [];
    const contentIdsWithColour = this.contents;
    let contentsWithOptions = [];
    if (contentIdsWithColour) {
      for (let i = 0; i < contentIdsWithColour.length; i++) {
        contentIds.push(contentIdsWithColour[i].id);
      }
      const contents = Contents.find({ _id: { "$in" : contentIds } }).fetch();
      const l = contentIds.length;
      for (i = 0; i < l; i++) {
        const currentContentId = contentIds[i];
        const ll = contents.length;
        for (j = 0; j < ll; j++) {
          let currentContentObj = contents[j];
          if (currentContentObj._id == currentContentId) {
            const colour = contentIdsWithColour[i].colour;
            currentContentObj["colour"] = colour;
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
        contentsWithOptions[i]["enableButtonDelete"] = this.options.enableButtonDelete;
        contentsWithOptions[i]["enableButtonEdit"] = this.options.enableButtonEdit;
      }
    }
    return contentsWithOptions;
  },
});

Template.contentsList.events({
  'keyup #content-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  },
  'click #button-delete-confired': function deleteContent(event, templateInstance) {
    event.preventDefault();
    const content = templateInstance.contentToDelete.get();
    templateInstance.contentToDelete.set();
    Meteor.call('deleteContent', content._id);
  },
  'click .glyphicon-trash': function deleteContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.contentToDelete.set(this);
  },
});
