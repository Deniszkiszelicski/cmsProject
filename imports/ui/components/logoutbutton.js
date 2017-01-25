import { Template } from 'meteor/templating';
import './logoutbutton.html';

Template.logoutButton.events({
  'click #logout': function logmeout(event) {
    event.preventDefault();

    Meteor.logout();
  },
});
