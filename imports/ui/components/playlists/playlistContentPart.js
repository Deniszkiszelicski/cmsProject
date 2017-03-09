import { Template } from 'meteor/templating';
import './playlistContentPart.html';

Meteor.subscribe('playlists');

Template.playlistContentPart.onCreated(function () {
  this.includedCGs = new ReactiveVar();
});

Template.playlistContentPart.helpers({
  includedContentGroups: function includedContentGroups() {
    const contentGroupIds = this.contentGroupIds;
    let includedCGs = [];
    if (contentGroupIds && contentGroupIds.length > 0) {
      contentGroupIds.forEach(function(id) {
        includedCGs.push(ContentGroups.findOne({ _id: id }));
      });
    }
    Template.instance().includedCGs.set(includedCGs);
    const options = { header: "Included content-groups", enableButtonDelete: false,
                      enableButtonEdit: false, enableButtonRemove: false,
                      enableButtonNewCG: false, enableFilter: false, };
    const includedCGsWithOptions = { contentGroups: includedCGs, options: options};
    return includedCGsWithOptions;
  },
  includedContents: function includedContents() {
    const includedCGs = Template.instance().includedCGs.get();
    let includedContentIds = [];
    for (i = 0; i < includedCGs.length; i++) {
      includedContentIds = includedContentIds.concat(includedCGs[i].contentIds);
    }
    let includedContentObjects;
    const options = { header: "Included contents", enableButtonDelete: false,
                      enableButtonEdit: false, enableButtonRemove: true,
                      enableButtonNewCG: false, enableFilter: false,
                      enableButtonCloseListOfContents: false };
    const includedContentsWithOptions = { contents: includedContentIds, options: options};
    return includedContentsWithOptions;
  },
});

Template.playlistContentPart.events({

});
