import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import './contentsList.html';
import './content';

Meteor.subscribe('contents');

Template.contentsList.onCreated(function () {
  this.filterText = new ReactiveVar();
});

Template.contentsList.helpers({
  contents: () => {
    return Contents.find().fetch();
  },
  filteredContents: function filteredContents() {
    const contentIds = this.contents;
    let contentsWithOptions = [];
    if (!!contentIds) {
      const contents = Contents.find({ _id: { "$in" : contentIds } }).fetch();
      //place content objects according to received content ids
      const l = contentIds.length;
      for (i = 0; i < l; i++) {
        const currentContentId = contentIds[i];
        const ll = contents.length;
        for (j = 0; j < ll; j++) {
          if (contents[j]._id == currentContentId) {
            contentsWithOptions.push(contents[j]);
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
  }
});
