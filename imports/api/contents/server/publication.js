import { Meteor } from 'meteor/meteor';

Meteor.publish('contents', function () {
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
        return Contents.find({ author: { $in: userIdsOfThisNetwork } });
      } else {
        return Contents.find({ author: userId });
      }
    }
  }
});
