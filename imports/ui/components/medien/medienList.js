import { Template } from 'meteor/templating';
import moment from 'moment';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import './medienList.html';

Template.registerHelper("prettifyDate", function(date) {
  return moment(date).format('MMM Do YY, HH:mm');
});

Meteor.subscribe('files.images.all');

Template.medienList.helpers({
  medien: () => {
    return Medien.find().fetch();
  },
});
