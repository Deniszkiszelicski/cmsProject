import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { quilljs } from 'meteor/themeteorites:quilljs';

import './homeAdminPage.html';

Template.homeAdminPage.onRendered(function(){

  var fullEditor;
  fullEditor = new Quill('#full-editor', {
    modules: {
      // 'authorship': {
      //   authorId: 'test', //Meteor.user().profile.user_name,
      //   enabled: true
      // },
      'multi-cursor': true,
      'toolbar': {
        container: '#full-toolbar'
      },
      'link-tooltip': true
    },
    theme: 'snow'
  });
  return fullEditor;
});
