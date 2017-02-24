import { Template } from 'meteor/templating';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import { $ } from 'meteor/jquery';
import './contentGroupForm.html';

Template.contentGroupForm.onCreated(function () {
  this.isSelectContent = new ReactiveVar(false);
  let includedContentObjects = [];
  const includedContentIds = this.data.contentIds;
  if (!!includedContentIds) {
    const sizeOfIncContentIds = includedContentIds.length;
    if (sizeOfIncContentIds > 0) {
      for (i = 0; i < sizeOfIncContentIds; i++) {
        let tempContentId = includedContentIds[i];
        let tempContent = Contents.findOne({ _id: tempContentId });
        includedContentObjects.push(tempContent);
      }
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
  includedContentsGestures: {
      'tap .content-row': function (event, templateInstance){
        console.log("tap has worked!!!");
      },
      // 'panright .content-row': function (event, templateInstance){
      //   console.log("panright has worked!!!");
      //   console.log("event = ", event);
      //   $(event.target.parentElement).css({
      //     'transform': 'translate(' + event.deltaX + 'px,' + event.deltaY + 'px)'
      //   });
      // },
  },
  includedContents: function includedContents() {
    let includedContentsWithExtra = Template.instance().includedContents.get();
    if (!!includedContentsWithExtra) {
      const l = includedContentsWithExtra.length;
      if (l > 0) {
        for (i = 0; i < l; i++) {
          includedContentsWithExtra[i]["disableButtonDelete"] = true;
          includedContentsWithExtra[i]["disableButtonEdit"] = true;
          includedContentsWithExtra[i]["enableButtonRemove"] = true;
        }
      }
    }
    return includedContentsWithExtra;
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
  },
  'click #includedContents-table #button-remove-content': function removeContentFromCG(event, templateInstance){
    event.preventDefault();
    let contents = templateInstance.includedContents.get();
    const index = contents.indexOf(this);
    if (index > -1) {
      contents.splice(index, 1);
    }
    templateInstance.includedContents.set(contents);
  },

  // 'drag .content-row': function onDragStart(event, templateInstance) {
  //   // event.preventDefault();
  //   // event.dataTransfer.setData("myD", event.target.id);
  //   console.log("ondragstart triggered, event.target.id=", event);
  // },

});
