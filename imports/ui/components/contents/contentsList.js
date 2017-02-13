import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import './contentsList.html';
// import './player';

Meteor.subscribe('content');

Template.contentsList.helpers({
  contents: () => {
    return Contents.find().fetch();
  },
});
