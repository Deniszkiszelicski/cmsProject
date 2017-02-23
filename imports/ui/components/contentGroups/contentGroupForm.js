import { Template } from 'meteor/templating';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import { $ } from 'meteor/jquery';
import './contentGroupForm.html';

Template.contentGroupForm.onCreated(function () {
  this.isSelectContent = new ReactiveVar(false);
  let includedContentObjects = [];
  const includedContentIds = this.data.contentIds;
  const sizeOfIncContentIds = includedContentIds.length;
  if (sizeOfIncContentIds > 0) {
    for (i = 0; i < sizeOfIncContentIds; i++) {
      let tempContentId = includedContentIds[i];
      let tempContent = Contents.findOne({ _id: tempContentId });
      includedContentObjects.push(tempContent);
    }
  }
  this.includedContents = new ReactiveVar(includedContentObjects);
});

Template.contentGroupForm.onRendered(function () {
});

Template.contentGroupForm.helpers({
  isBlocked: function isBlocked() {
    return this.blocked ? "checked" : "";
  },
  isSelectContent: function isSelectContent() {
    return Template.instance().isSelectContent.get();
  },
  includedContents: function includedContents() {
    return Template.instance().includedContents.get();
  },
});

Template.contentGroupForm.events({
  'click #btn-save-contentGroup': function saveContentGroupForm(event, templateInstance) {
    event.preventDefault();
    let contents = templateInstance.includedContents.get();
    const l = contents.length;
    let contentIds = [];
    if (l > 0) {
      for (i = 0; i < l; i++) {
        contentIds.push(contents[i]._id);
      }
    }
    const contentGroup = { _id: this._id,
                      name: $('#nameOfContentGroup').val(),
                      duration: $('#durationOfContentGroup').val(),
                      blocked: $('#blocked').is(':checked'),
                      contentIds: contentIds,
                    };
    Meteor.call('upsertContentGroup', contentGroup);
  },
  'click #btn-select-content': function selectContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectContent.set(true);
  },
  'click #button-close-content-collection': function closeMediaCollection(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectContent.set(false);
  },
  'click .content-group-form #content-collection-fieldset .content-row': function markAsSelected(event, templateInstance){
    event.preventDefault();
    let contents = templateInstance.includedContents.get();
    contents.push(this);
    templateInstance.includedContents.set(contents);
    // templateInstance.media.set(this);
    // templateInstance.isSelectMedia.set(false);
  },
});
