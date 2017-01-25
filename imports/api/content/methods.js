import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  addContent: function (content) {
    check(content.name, String);
    check(content.type, String);
    Content.insert({ name: content.name, fileURL: content.type });
    console.log('inserted into Content collection');
  },
});
