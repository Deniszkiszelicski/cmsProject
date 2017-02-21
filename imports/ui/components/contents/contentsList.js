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
  filteredContents: () => {
    let filterText = Template.instance().filterText.get();
    return Contents.find({name: { $regex: new RegExp(filterText), $options: 'i' }}).fetch();
  },
});

Template.contentsList.events({
  'keyup #content-filter-input': function (event, templateInstance) {
    // console.log("you typed in = ", event.currentTarget.value);
    templateInstance.filterText.set(event.currentTarget.value);
    // Session.set('selectedPostListId', postListId);
  }
});
