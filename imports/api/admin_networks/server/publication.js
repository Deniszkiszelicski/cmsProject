import { Meteor } from 'meteor/meteor';



Meteor.publish('networks', function networks() {
  return Networks.find({});
});
