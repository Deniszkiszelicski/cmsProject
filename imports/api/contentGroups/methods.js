import { Meteor } from 'meteor/meteor';

Meteor.methods({
  //  TODO: Add check for fields
  upsertContentGroup: function (contentGroup) {
    if (!!contentGroup._id ) {
      ContentGroups.update({ _id: contentGroup._id },
        { $set: {
                          name: contentGroup.name,
                          duration: contentGroup.duration,
                          blocked: contentGroup.blocked,
                          contentIds: contentGroup.contentIds,
                          colour: contentGroup.colour,
                        },
          });
    } else {
      ContentGroups.insert({
                          name: contentGroup.name,
                          duration: contentGroup.duration,
                          blocked: contentGroup.blocked,
                          contentIds: contentGroup.contentIds,
                          colour: contentGroup.colour,
                        },
          );
    }
  },
  deleteContentGroup: function(id) {
    ContentGroups.remove(id);
  },
  saveSort: function(contentGroupsObject){
    ContentGroups.update({_id:contentGroupsObject._id},{$set: { contentIds: contentGroupsObject.sorted}});
  },
});
