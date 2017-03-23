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
    let contentIdsWithColour = [];
    for (i = 0; i < includedCGs.length; i++) {
      const contentIds = includedCGs[i].contentIds;
      const colour = includedCGs[i].colour;
      for (j = 0; j < contentIds.length; j++) {
        const contentIdWithColour = { id: contentIds[j], colour: colour };
        contentIdsWithColour.push(contentIdWithColour);
      }
    }
    const options = { header: "Included contents", enableButtonDelete: false,
                      enableButtonEdit: false, enableButtonRemove: true,
                      enableButtonNewCG: false, enableFilter: false,
                      enableButtonCloseListOfContents: false };
    const includedContentsWithOptions = { contents: contentIdsWithColour, options: options};
    return includedContentsWithOptions;
  },
});

Template.playlistContentPart.events({

});
