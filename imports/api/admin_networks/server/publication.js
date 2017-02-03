import { Meteor } from 'meteor/meteor';



Meteor.publish('networks', function networks() {
  return Networks.find(
  //   {
  //   userId: this.userId,
  // }, {
  //   fields: { name: 1, role: 1, email: 1 },
  // }
);
});
