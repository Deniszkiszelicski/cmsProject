import { Meteor } from 'meteor/meteor';


Meteor.publish('users', function regUsers(usersPerPage, noOfUsersPerPage,filterText, showAll) {
  if (showAll) {
    return Meteor.users.find({});
  }
  if (usersPerPage && noOfUsersPerPage) {
    const nr = noOfUsersPerPage;
    const skip = usersPerPage;
    if (filterText) {
      return Meteor.users.find({ 'profile.name': { $regex: new RegExp(filterText), $options: 'i' } },{ skip: skip, limit: nr });
    } else {
      return Meteor.users.find({}, { skip: skip, limit: nr });
    }
  }
});
