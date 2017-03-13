import { Template } from 'meteor/templating';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import { $ } from 'meteor/jquery';
import './contentGroupForm.html';

Template.contentGroupForm.onCreated(function () {
  this.isSelectContent = new ReactiveVar(false);
  this.canvasContext = new ReactiveVar();
  this.showColourPicker = new ReactiveVar(false);
  this.colour = new ReactiveVar(this.data.colour);

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

// Template.contentGroupForm.rendered = function() {
//   $('.demo1').colorpicker();
// }

Template.contentGroupForm.onRendered(function () {
  let canvas = $('#canvas_picker')[0];
  let context = canvas.getContext('2d');
  let img = new Image();
  let contextVar = this.canvasContext;
  img.src = '/img/palette.jpg';
  $(img).load(function(){
    context.drawImage(img, 0, 0);
    contextVar.set(context);
  });
});

Template.contentGroupForm.helpers({
  isBlocked: function isBlocked() {
    return this.blocked ? "checked" : "";
  },
  getOptions: function getOptions() {
    return { options: { enableButtonAddToCG: false,
                        enableButtonCloseListOfContents: true,
                        enableButtonNewContent: false,
                        header: "List of all contents", } };
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
          if(includedContentsWithExtra[i]) {
            includedContentsWithExtra[i]["enableButtonDelete"] = false;
            includedContentsWithExtra[i]["enableButtonEdit"] = false;
            includedContentsWithExtra[i]["enableButtonRemove"] = true;
          }
        }
      }
    }
    return includedContentsWithExtra;
  },
  showColourPicker: function showColourPicker() {
    const show = Template.instance().showColourPicker.get();
    if(show) {
      return "visible";
    }
    return "hidden";
  },
  getColour: function getColour() {
    return Template.instance().colour.get();
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
    const colour = templateInstance.colour.get();
    const contentGroup = { _id: this._id,
                      name: $('#nameOfContentGroup').val(),
                      duration: $('#durationOfContentGroup').val(),
                      blocked: $('#blocked').is(':checked'),
                      colour: colour,
                      contentIds: contentIds,
                    };
    Meteor.call('upsertContentGroup', contentGroup);
  },
  'click #btn-select-content': function selectContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectContent.set(true);
  },
  // 'click #button-close-content-collection': function closeMediaCollection(event, templateInstance) {
  //   event.preventDefault();
  //   templateInstance.isSelectContent.set(false);
  // },
  'click #button-close-contentList': function closeContentCollection(event, templateInstance) {
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
  'click #canvas_picker': function updateColour(event, templateInstance){
    const x = event.offsetX;
    const y = event.offsetY;
    const context = templateInstance.canvasContext.get();
    const imgData = context.getImageData(x, y, 1, 1).data;
    const colourRBG = { r: imgData[0], g: imgData[1], b: imgData[2]};
    let toHex = function(number) {
      var hex = number.toString(16);
      while (hex.length < 2) {hex = "0" + hex; }
      return hex;
    };
    const colourHex = "#" + toHex(colourRBG.r) + toHex(colourRBG.g) + toHex(colourRBG.b);
    templateInstance.colour.set(colourHex);
    templateInstance.showColourPicker.set(false);
  },
  'click #colorpicker i': function updateColour(event, templateInstance){
    templateInstance.showColourPicker.set(true);
  },
  'keyup #colorpicker input': function (event, templateInstance) {
    templateInstance.colour.set(event.currentTarget.value);
  },
  // 'drag .content-row': function onDragStart(event, templateInstance) {
  //   // event.preventDefault();
  //   // event.dataTransfer.setData("myD", event.target.id);
  //   console.log("ondragstart triggered, event.target.id=", event);
  // },
});
