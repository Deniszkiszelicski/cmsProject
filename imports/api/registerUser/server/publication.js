import { Meteor } from 'meteor/meteor';

Meteor.publish('registerUsers', function registerUsers() {
  return UserInformation.find(
  //   {
  //   userId: this.userId,
  // }, {
  //   fields: { name: 1, role: 1, email: 1 },
  // }
);
});
