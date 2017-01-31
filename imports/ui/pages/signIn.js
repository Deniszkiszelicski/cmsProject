import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './signIn.html';
import '../components/logoutbutton';



Template.signInTemplate.events({
  submit: function logIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    Meteor.loginWithPassword(email,password,function(err){
      if(!err) {
        Router.go('/');
      }
    });
  },
});
