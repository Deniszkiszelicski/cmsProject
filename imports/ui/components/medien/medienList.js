import { Template } from 'meteor/templating';
import moment from 'moment';
import '../../../api/medien/methods';
import '../../../api/medien/collection';
import '../modals/deleteConfirmation';
import './medienList.html';

Template.registerHelper("prettifyDate", function(date) {
  return moment(date).format('Do MMM YY, HH:mm');
});

Template.medienList.onCreated(function () {
  this.filterText = new ReactiveVar();
  this.mediaToDelete = new ReactiveVar();
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
  mediaToDelete: function mediaToDelete() {
    const media = Template.instance().mediaToDelete.get();
    if (media) {
      return "Delete '" + media.name + "' media.";
    }
  },
});

Template.medienList.events({
  'click #button-delete-confirmed': function deleteMedia(event, templateInstance) {
    event.preventDefault();
    const media = templateInstance.mediaToDelete.get();
    templateInstance.mediaToDelete.set();
    Meteor.call('deleteMedia', media._id);
    toastr["success"]("Media '" + media.name + "' has been deleted.");
  },
  'click .glyphicon-trash': function deleteMedia(event, templateInstance) {
    event.preventDefault();
    templateInstance.mediaToDelete.set(this);
  },
  'keyup #media-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  }
});
