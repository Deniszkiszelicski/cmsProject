import { Meteor } from 'meteor/meteor';

Meteor.publish('adminDocumentation', function roles() {
  return AdminDocumentation.find(
    
  );
});
