import { Template } from 'meteor/templating';
import './contentItem.html';

Meteor.subscribe('content');

Template.contentItem.events({
  'click #button-delete-content': function deleteContent(event) {
    event.preventDefault();
    console.log('button delete was clicked');
    Meteor.call('deleteContent', this._id);
  },
});
