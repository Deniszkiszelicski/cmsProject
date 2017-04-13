import { Meteor } from 'meteor/meteor';

Meteor.methods({
  //  TODO: Add check for fields
  upsertContentGroup: function (contentGroup) {

    const userId = this.userId;
    if (userId) {
      const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
      const role = Roles.findOne({ _id: roleId });
      if (role) {
        if (role.createContentGrp && !contentGroup._id) {
          ContentGroups.insert({
                              name: contentGroup.name,
                              duration: contentGroup.duration,
                              blocked: contentGroup.blocked,
                              contentIds: contentGroup.contentIds,
                              colour: contentGroup.colour,
                            },
              );
        }
        if(role.editContentGrp && contentGroup._id) {
          ContentGroups.update({ _id: contentGroup._id },
            { $set: {
                              name: contentGroup.name,
                              duration: contentGroup.duration,
                              blocked: contentGroup.blocked,
                              contentIds: contentGroup.contentIds,
                              colour: contentGroup.colour,
                            },
              });
        }
      }
    }
  },
  deleteContentGroup: function(id) {
    const userId = this.userId;
    if (userId) {
      const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
      const role = Roles.findOne({ _id: roleId });
      if (role) {
        if (role.deleteContentGrp) {
          ContentGroups.remove(id);
        }
      }
    }
  },
  saveSort: function(contentGroupsObject){
    ContentGroups.update({_id:contentGroupsObject._id},{$set: { contentIds: contentGroupsObject.sorted}});
  },
});
