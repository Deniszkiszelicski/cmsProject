import { Template } from 'meteor/templating';
import moment from 'moment';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import './medienList.html';

Template.registerHelper("prettifyDate", function(date) {
  return moment(date).format('Do MMM YY, HH:mm');
});

Template.medienList.onCreated(function () {
  this.filterText = new ReactiveVar();
});

Meteor.subscribe('files.images.all');

Template.medienList.helpers({
  medien: () => {
    return Medien.find().fetch();
  },
  filteredMedien: () => {
    let filterText = Template.instance().filterText.get();
    return Medien.find({name: { $regex: new RegExp(filterText), $options: 'i' }}).fetch();
  },
});

Template.medienList.events({
  'keyup #media-filter-input': function (event, templateInstance) {
    // console.log("you typed in = ", event.currentTarget.value);
    templateInstance.filterText.set(event.currentTarget.value);
    // Session.set('selectedPostListId', postListId);
  }
});
