import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './page5.html';
import '../components/logoutbutton';
import '../../api/registerUser/methods';
import '../../api/registerUser/registerUser';

Meteor.subscribe('registerUsers');


Template.register.events({
  'submit .register-form': function createRoleData(event) {
    event.preventDefault();
    console.log('submiting before meteor call');
    Meteor.call('createRoleData', { name: $('#firstname').val(), role: $('#accountRole').val(), email: $('#email').val() });
    console.log('submiting after  meteor call');
  },
});




// Template.register.events({
//   'submit .register-form': function (event) {
//
//       event.preventDefault();
//
//
//         var email = event.target.email.value;
//         var password = event.target.password.value;
//         var firstname = event.target.firstname.value;
//         var lastname = event.target.lastname.value;
//
//       var user = {'email':email,password:password,profile:{name:firstname+" "+lastname}};
//
//
//
//         Accounts.createUser(user);
//   },}
// );
