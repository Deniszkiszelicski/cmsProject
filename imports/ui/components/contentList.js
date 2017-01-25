import { Template } from 'meteor/templating';
import './contentList.html';
import './contentItem';
import '../../api/content/methods';
import '../../api/content/collection';

Meteor.subscribe('content');

Template.contentList.helpers({
  contents: () => {
    console.log(Content.find({}).fetch());
    return Content.find().fetch();
  },
});
