import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import { $ } from 'meteor/jquery';
import './contentGroupForm.html';

Template.contentGroupForm.onCreated(function () {
  this.isSelectContent = new ReactiveVar(false);
  this.canvasContext = new ReactiveVar();
  this.showColourPicker = new ReactiveVar(false);
  this.colour = new ReactiveVar(this.data.colour);
  this.autorun(() => {
    this.subscribe('medien');
    this.subscribe('contents');
    // this.subscribe('contentGroups', currentPage, showPerPage, filterText);
    // this.subscribe('countContentGroups', currentPage, showPerPage, filterText);
  });

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
  let canvas = $('#canvas_picker')[0];
  let context = canvas.getContext('2d');
  let img = new Image();
  let contextVar = this.canvasContext;
  img.src = '/img/palette.jpg';
  $(img).load(function(){
    context.drawImage(img, 0, 0);
    contextVar.set(context);
  });
  $('#included-contents').sortable({
    cursor: "move",
    // start: function(event, ui) {
    //     // creates a temporary attribute on the element with the old index
    //     $(this).attr('data-previndex', ui.item.index());
    //     console.log("ui.item.index() = ", ui.item.index());
    // },
    // update: function (event, ui) {
    //   const newIndex = ui.item.index();
    //   const oldIndex = $(this).attr('data-previndex');
    //   $(this).removeAttr('data-previndex');
    //   console.log("newIndex = ", newIndex);
    //   console.log("oldIndex = ", oldIndex);
    //
    //   const el = ui.item.get(0);
    //   const before = ui.item.prev().get(0);
    //   const after = ui.item.next().get(0);
    //   const thisObj = Blaze.getData(el);
    //
    //   console.log("thisObj = ", thisObj);
    //   const parentObj = Template.instance();
    //   const cgObject = Blaze.getData(this);
    //   console.log("cgObject = ", cgObject);
    //   console.log("parentObj = ", parentObj);
    //   console.log("this", this);
    //   console.log("text = ", Blaze.TemplateInstance.data());
    //   console.log("el.height()", $(el).height());
    //   console.log("ui.item", ui.item);
    //   console.log("before", before);
    //   console.log("after", after);
    //   console.log("ui.position", ui.position);
    //   console.log("ui.originalPosition", ui.originalPosition);
    //   console.log("this", this);
    // }
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
  includedContents: function includedContents() {
    let includedContentsWithExtra = Template.instance().includedContents.get();
    if (includedContentsWithExtra) {
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
    templateInstance.isSelectContent.set(false);
    let contents = templateInstance.includedContents.get();
    let contentIds = [];
    $('#included-contents .content-row').each(function(){
      contentIds.push(Blaze.getData(this)._id);
    });
    const colour = templateInstance.colour.get();
    const name = $('#nameOfContentGroup').val();
    const contentGroup = { _id: this._id,
                      name: name,
                      duration: $('#durationOfContentGroup').val(),
                      blocked: $('#blocked').is(':checked'),
                      colour: colour,
                      contentIds: contentIds,
                    };
    Meteor.call('upsertContentGroup', contentGroup);
    toastr["success"]("Content-group '" + name + "' has been saved.");
  },
  'click #btn-select-content': function selectContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isSelectContent.set(true);
  },
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
});
