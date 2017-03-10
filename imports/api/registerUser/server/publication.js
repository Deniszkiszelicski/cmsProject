import { Meteor } from 'meteor/meteor';

Meteor.publish('userInformation', function registerUsers() {
  return UserInformation.find(
  //   {
  //   userId: this.userId,
  // }, {
  //   fields: { name: 1, role: 1, email: 1 },
  // }
);
});
Meteor.publish('users', function regUsers(skipCount){
  return Meteor.users.find({});
});
