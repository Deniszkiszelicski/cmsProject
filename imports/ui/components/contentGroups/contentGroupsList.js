import { Template } from 'meteor/templating';
import '../../../api/contentGroups/methods';
import '../../../api/contentGroups/collection';
import './contentGroup';
import './contentGroupsList.html';

Meteor.subscribe('contentGroups');

Template.contentGroupsList.onCreated(function () {
  this.filterText = new ReactiveVar();
});

Template.contentGroupsList.helpers({
  filteredContentGroups: () => {
    let filterText = Template.instance().filterText.get();
    return ContentGroups.find({name: { $regex: new RegExp(filterText), $options: 'i' }}).fetch();
  },
});

Template.contentGroupsList.events({
  'keyup #contentGroup-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  }
});
