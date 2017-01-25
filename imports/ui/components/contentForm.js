import { Template } from 'meteor/templating';
import './contentForm.html';
import '../../api/content/methods';
import '../../api/content/collection';

Template.contentForm.events({
  'submit .content-form': function addContent(event) {
    event.preventDefault();
    Meteor.call('addContent', { name: $('#contentName').val(), type: $('#contentType').val() });
    alert('you can add content here 2.');
  },
});
