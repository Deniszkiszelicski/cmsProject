import { Meteor } from 'meteor/meteor';

Meteor.publish('medien', function(currentPage, showPerPage, filterText) {
  const userId = this.userId;
  if (userId) {
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      if (role.seeMedia) {
        const networkId = role.networkId;
        let roleIdsOfThisNetwork = Roles.find({ networkId: networkId }, { fields: { _id: 1 } }).fetch();
        roleIdsOfThisNetwork = _(roleIdsOfThisNetwork).pluck("_id");
        let userIdsOfThisNetwork = Meteor.users.find({ 'profile.role': { $in: roleIdsOfThisNetwork } }, { fields: { _id: 1 } }).fetch();
        userIdsOfThisNetwork = _(userIdsOfThisNetwork).pluck("_id");
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return Medien.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return Medien.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        } else {
          return Medien.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }});
        }
      } else {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return Medien.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: userId } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return Medien.find({ author: userId }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        } else {
          return Medien.find({ author: userId }, { sort: { name: 1 }});
        }
      }
    }
  }
});

Meteor.publish('countMedien', function(currentPage, showPerPage, filterText) {
  const userId = this.userId;
  let cursor;
  if (userId) {
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      if (role.seeMedia) {
        const networkId = role.networkId;
        let roleIdsOfThisNetwork = Roles.find({ networkId: networkId }, { fields: { _id: 1 } }).fetch();
        roleIdsOfThisNetwork = _(roleIdsOfThisNetwork).pluck("_id");
        let userIdsOfThisNetwork = Meteor.users.find({ 'profile.role': { $in: roleIdsOfThisNetwork } }, { fields: { _id: 1 } }).fetch();
        userIdsOfThisNetwork = _(userIdsOfThisNetwork).pluck("_id");
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            cursor = Medien.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: { $in: userIdsOfThisNetwork } } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            cursor = Medien.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        } else {
          cursor = Medien.find({ author: { $in: userIdsOfThisNetwork } }, { sort: { name: 1 }});
        }
      } else {
        if (currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            cursor = Medien.find({ $and: [ { name: { $regex: new RegExp(filterText), $options: 'i' } },
                                { author: userId } ] }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            cursor = Medien.find({ author: userId });
          }
        } else {
          cursor = Medien.find({ author: userId }, { sort: { name: 1 }});
        }
      }
    }
  }
  return new Counter('countMedien', cursor);
});

// Meteor.publish('files.images.all', function () {
Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});

Meteor.publish('files.videos.all', function() {
  return Videos.find().cursor;
});
