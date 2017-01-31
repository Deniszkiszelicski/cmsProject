import { Template } from 'meteor/templating';
import './contentForm.html';
import '../../../api/content/methods';
import '../../../api/content/collection';

Meteor.subscribe('content');

Template.contentForm.events({
  'submit .content-form': function addContent(event, templateInstance) {
    event.preventDefault();
    Meteor.call('addContent',
      { _id: this._id,
        name: event.currentTarget.contentName.value,
        type: event.currentTarget.contentType.value,
        URL: event.currentTarget.contentURL.value,
        duration: event.currentTarget.contentDuration.value });
  },
});
