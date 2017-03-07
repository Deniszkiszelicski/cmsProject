import { Meteor } from 'meteor/meteor';

Meteor.publish('players', function(currentPage, showPerPage, filterText) {
  if(currentPage && showPerPage) {
    const skip = (currentPage - 1) * showPerPage;
    if (filterText) {
      return Players.find({ playerId: { $regex: new RegExp(filterText), $options: 'i' } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
    } else {
      return Players.find({}, { sort: { name: 1 }, skip: skip, limit: showPerPage});
    }
  }
});
