import { Meteor } from 'meteor/meteor';

Meteor.methods({
  //  TODO: Add check for fields
  upsertContent: function (content) {
    Contents.update({ _id: content._id },
      { content },
        { upsert: true, multi: false });
  },
  deleteContent: function(id) {
    Contents.remove(id);
  },
});
