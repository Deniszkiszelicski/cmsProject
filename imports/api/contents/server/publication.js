import { Meteor } from 'meteor/meteor';

Meteor.publish('contents', function (currentPage, showPerPage, filterText) {
  const userId = this.userId;
  if (userId) {
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      if (role.seeContent) {
        const networkId = role.networkId;
        let roleIdsOfThisNetwork = Roles.find({ networkId: networkId }, { fields: { _id: 1 } }).fetch();
        roleIdsOfThisNetwork = _(roleIdsOfThisNetwork).pluck("_id");
        let userIdsOfThisNetwork = Meteor.users.find({ 'profile.role': { $in: roleIdsOfThisNetwork } }, { fields: { _id: 1 } }).fetch();
        userIdsOfThisNetwork = _(userIdsOfThisNetwork).pluck("_id");
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return Contents.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return Contents.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        } else {
          return Contents.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }});
        }
      } else {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return Contents.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: userId } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return Contents.find({ author: userId });
          }
        } else {
          return Contents.find({ author: userId }, { sort: { name: 1 }});
        }
      }
    }
  }
});

Meteor.publish('countContents', function(currentPage, showPerPage, filterText) {
  const userId = this.userId;
  let cursor;
  if (userId) {
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      if (role.seeContent) {
        const networkId = role.networkId;
        let roleIdsOfThisNetwork = Roles.find({ networkId: networkId }, { fields: { _id: 1 } }).fetch();
        roleIdsOfThisNetwork = _(roleIdsOfThisNetwork).pluck("_id");
        let userIdsOfThisNetwork = Meteor.users.find({ 'profile.role': { $in: roleIdsOfThisNetwork } }, { fields: { _id: 1 } }).fetch();
        userIdsOfThisNetwork = _(userIdsOfThisNetwork).pluck("_id");

        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            cursor =  Contents.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            cursor =  Contents.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        } else {
          cursor =  Contents.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }});
        }
      } else {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            cursor =  Contents.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: userId } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            cursor =  Contents.find({ author: userId });
          }
        } else {
          cursor =  Contents.find({ author: userId }, { sort: { name: 1 }});
        }
      }
    }
  }
  return new Counter('countContents', cursor);
});
