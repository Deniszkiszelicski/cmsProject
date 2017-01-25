import { Template } from 'meteor/templating';
import './logoutbutton.html';

Template.logoutButton.events({
  'click button': function logmeout(event) {
    event.preventDefault();
    alert('you are now logged out');
  },
});
