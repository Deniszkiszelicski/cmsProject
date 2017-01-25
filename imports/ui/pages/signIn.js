import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './signIn.html';
import '../components/logoutbutton';





Template.signInTemplate.events({
    'submit': function logIn(event) {
        event.preventDefault();
        console.log("works");
         var email = event.target.email.value;
         var password = event.target.password.value;

         Meteor.loginWithPassword(email,password,function(err){
             if(!err) {
                Router.go('home');


            }
        });
     }
});
