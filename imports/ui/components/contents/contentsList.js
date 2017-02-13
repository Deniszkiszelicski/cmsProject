import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import './contentsList.html';
import './content';

Meteor.subscribe('contents');

Template.contentsList.helpers({
  contents: () => {
    return Contents.find().fetch();
  },
});
