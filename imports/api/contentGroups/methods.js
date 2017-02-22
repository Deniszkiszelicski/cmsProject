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
                        },
          });
    } else {
      ContentGroups.insert({
                          name: contentGroup.name,
                          duration: contentGroup.duration,
                          blocked: contentGroup.blocked,
                        },
          );
    }
  },
  deleteContentGroup: function(id) {
    ContentGroups.remove(id);
  },
});
