import { Meteor } from 'meteor/meteor';

Meteor.publish('contentGroups', function(currentPage, showPerPage, filterText) {
  const userId = this.userId;
  if (userId) {
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      const networkId = role.networkId;
      let roleIdsOfThisNetwork = Roles.find({ networkId: networkId }, { fields: { _id: 1 } }).fetch();
      roleIdsOfThisNetwork = _(roleIdsOfThisNetwork).pluck("_id");
      let userIdsOfThisNetwork = Meteor.users.find({ 'profile.role': { $in: roleIdsOfThisNetwork } }, { fields: { _id: 1 } }).fetch();
      userIdsOfThisNetwork = _(userIdsOfThisNetwork).pluck("_id");
      if (role.seeAllContentGroups) {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return ContentGroups.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return ContentGroups.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        } else {
          return ContentGroups.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }});
        }
      } else {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return ContentGroups.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { $or: [ { author: userId }, { allowedUsersIds: userId }, { visibleForAll: true } ] }, { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return ContentGroups.find( { $and: [ { $or: [ { author: userId }, { allowedUsersIds: userId }, { visibleForAll: true } ] }, { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage} );
          }
        } else {
          return ContentGroups.find( { $and: [ { $or: [ { author: userId }, { allowedUsersIds: userId }, { visibleForAll: true } ] }, { author: { $in: userIdsOfThisNetwork } } ] } );
        }
      }
    }
  }
});

Meteor.publish('countContentGroups', function(currentPage, showPerPage, filterText) {
  const userId = this.userId;
  let cursor;
  if (userId) {
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      const networkId = role.networkId;
      let roleIdsOfThisNetwork = Roles.find({ networkId: networkId }, { fields: { _id: 1 } }).fetch();
      roleIdsOfThisNetwork = _(roleIdsOfThisNetwork).pluck("_id");
      let userIdsOfThisNetwork = Meteor.users.find({ 'profile.role': { $in: roleIdsOfThisNetwork } }, { fields: { _id: 1 } }).fetch();
      userIdsOfThisNetwork = _(userIdsOfThisNetwork).pluck("_id");
      if (role.seeAllContentGroups) {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            cursor =  ContentGroups.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            cursor =  ContentGroups.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        } else {
          cursor =  ContentGroups.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }});
        }
      } else {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            cursor =  ContentGroups.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { $or: [ { author: userId }, { allowedUsersIds: userId }, { visibleForAll: true } ] }, { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            cursor =  ContentGroups.find( { $and: [ { $or: [ { author: userId }, { allowedUsersIds: userId }, { visibleForAll: true } ] }, { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage} );
          }
        } else {
          return ContentGroups.find( { $and: [ { $or: [ { author: userId }, { allowedUsersIds: userId }, { visibleForAll: true } ] }, { author: { $in: userIdsOfThisNetwork } } ] } );
        }
      }
    }
  }
  return new Counter('countContentGroups', cursor);
});
