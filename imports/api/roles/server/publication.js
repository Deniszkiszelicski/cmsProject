import { Meteor } from 'meteor/meteor';

Meteor.publish('roles', function roles() {
  return Roles.find(
  //   {
  //   userId: this.userId,
  // }, {
  //   fields: { name: 1, role: 1, email: 1 },
  // }
);
});
