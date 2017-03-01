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
  filteredContentGroups: function filteredContentGroups() {
    const contentGroups = this.contentGroups;
    let contentGroupsWithOptions;
    if (!!contentGroups) {
      contentGroupsWithOptions = contentGroups;
    } else {
      let filterText = Template.instance().filterText.get();
      contentGroupsWithOptions = ContentGroups.find({name: { $regex: new RegExp(filterText), $options: 'i' }}).fetch();
    }
    // contentGroupsWithOptions = {  };
    const l = contentGroupsWithOptions.length;
    if (l > 0) {
      for (i = 0; i < l; i++) {
        contentGroupsWithOptions[i]["enableButtonDelete"] = this.options.enableButtonDelete;
        contentGroupsWithOptions[i]["enableButtonEdit"] = this.options.enableButtonEdit;
        contentGroupsWithOptions[i]["enableButtonRemove"] = this.options.enableButtonRemove;
      }
    }
    return contentGroupsWithOptions;
  },
});

Template.contentGroupsList.events({
  'keyup #contentGroup-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  }
});
