import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  //  TODO: Add check for duration of videos
  addContent: function (content) {
    check(content.name, String);
    check(content.type, String);
    check(content.URL, String);
    // Content.insert({ name: content.name, type: content.type, URL: content.URL, duration: content.duration });
    // upsert
    Content.update({_id: content._id}, { name: content.name, type: content.type, URL: content.URL, duration: content.duration }, {false, true} );
    console.log('inserted into Content collection');
  },
  deleteContent: function(id) {
    console.log('deleting entry from Content' + id.toString());
    Content.remove(id);
  },
});
