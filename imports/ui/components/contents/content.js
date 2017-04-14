import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import './content.html';

Template.content.onCreated(function onCreated() {
  // console.log("content.onCreated");
  this.isEditMode = new ReactiveVar(false);
});

Template.content.helpers({
  mayEdit: function mayEdit() {
    return true;
  },
  getColour: function getColour() {
    if (this) {
      return this.colour;
    }
  },
  disableButtonDelete: function disableButtonDelete() {
    if (!!this) {
      return this.disableButtonDelete;
    }
    return false;
  },
  disableButtonEdit: function disableButtonEdit() {
    if (!!this) {
      return this.disableButtonEdit;
    }
    return false;
  },
  enableButtonRemove: function enableButtonRemove() {
    if (!!this) {
      return this.enableButtonRemove;
    }
    return false;
  },
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
  isActive: function isActive() {
    let isEditMode = Template.instance().isEditMode.get();
    isEditMode = false;
    return isEditMode ? "warning" : "";
  },
  getType: function getContentType() {
    if (this.type) {
      if (this.type == "t") {
        return "template";
      } else {
        const media = Medien.findOne({ _id: this.mediaId });
        if (media) {
          return media.type;
        }
      }
    }
    return "N/A"
  },
  file: function () {
    // console.log("in file this = ", this);
    const media = Medien.findOne({ _id: this.mediaId });
    // console.log("in file media = ", media);
    let fileId = "";
    if(!!media){
      fileId = media.fileId;
    }
    return Images.findOne({ _id: fileId });
  },
});

Template.content.events({
  'click #button-edit-content': function editContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #button-close-content-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});
