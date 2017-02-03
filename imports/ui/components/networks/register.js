import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import '../../components/logoutbutton';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import './register.html';

Meteor.subscribe('networks');



Template.registerNetwork.events({
  'submit .register-form1': function (event) {

    event.preventDefault();
    BootstrapModalPrompt.prompt({
    title: "Network Registration Confirmation",
    content: "Do you want to save changes?"
  }, function prompt(result) {
      if (result) {

let testObj = { netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val() };
console.log(testObj);
console.log(event.currentTarget);


    Meteor.call('createNetwork', { netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val() });


  }
      else {
    // User did not confirm, do nothing.
  }

    });
  },

},






);
