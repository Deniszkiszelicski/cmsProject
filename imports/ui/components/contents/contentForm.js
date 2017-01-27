import { Template } from 'meteor/templating';
import './contentForm.html';
import '../../../api/content/methods';
import '../../../api/content/collection';

Meteor.subscribe('content');

Template.contentForm.events({
  'submit .content-form': function addContent(event) {
    event.preventDefault();
    console.log('adding new content');
    Meteor.call('addContent', { _id: this._id ,name: $('#contentName').val(), type: $('#contentType').val(), URL: $('#contentURL').val(), duration: $('#contentDuration').val() });
  },
});
