import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  addContent: function (content) {
    check(content.name, String);
    check(content.type, String);
    Content.insert({ name: content.name, type: content.type });
    console.log('inserted into Content collection');
  },
  deleteContent: function(id) {
    console.log('deleting entry from Content' + id.toString());
    Content.remove(id);
  },
});
