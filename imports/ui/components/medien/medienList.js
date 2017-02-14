import { Template } from 'meteor/templating';
import './medienList.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Meteor.subscribe('files.images.all');

Template.medienList.helpers({
  medien: () => {
    return Medien.find().fetch();
  },
});
