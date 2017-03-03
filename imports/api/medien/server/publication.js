import { Meteor } from 'meteor/meteor';

Meteor.publish('medien', function() {
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
        return Medien.find({ author: { $in: userIdsOfThisNetwork } });
      } else {
        return Medien.find({ author: userId });
      }
    }
  }
});

// Meteor.publish('files.images.all', function () {
Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});

Meteor.publish('files.videos.all', function() {
  return Videos.find().cursor;
});
