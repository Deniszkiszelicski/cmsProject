import { Template } from 'meteor/templating';
import './logoutbutton.html';

Template.logoutButton.events({
  'click #logout': function logmeout(event) {

    BootstrapModalPrompt.prompt({
    title: "Logout Confirmation",
    content: "Do you really want to logout?"
}, function(result) {
  if (result) {
    event.preventDefault();
    Meteor.logout();
  }
  else {
    // User did not confirm, do nothing.
  }
});


  },
});
