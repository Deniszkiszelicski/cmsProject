import { Template } from 'meteor/templating';
import './contentItem.html';

Meteor.subscribe('content');

Template.contentForm.events({
  'submit .content-form': function addContent(event) {
    event.preventDefault();
    Meteor.call('addContent', { name: $('#contentName').val(), type: $('#contentType').val() })
  },
});
