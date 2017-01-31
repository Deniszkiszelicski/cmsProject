import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './page5.html';
import '../components/logoutbutton';
import '../../api/registerUser/methods';
import '../../api/registerUser/registerUser';

Meteor.subscribe('registerUsers');



Template.register.events({
  'submit .register-form': function (event) {

    event.preventDefault();
    BootstrapModalPrompt.prompt({
    title: "Registration Confirmation",
    content: "Do you want to save changes?"
  }, function prompt(result) {
      if (result) {


        var email = event.target.email.value;
        var password = event.target.password.value;
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;

    var user = { 'email':email,password:password,profile:{name:firstname+" "+lastname}};


    Accounts.createUser(user);
    Meteor.call('createRoleData', { name: $('#firstname').val(), role: $('#accountRole:checked').val(), email: $('#email').val(), netName:$('#netName').val() });
    FlowRouter.go('/home');
  }
      else {
    // User did not confirm, do nothing.
  }
    });
  }
},

);
