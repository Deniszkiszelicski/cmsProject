import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './userReg.html';
import '../../components/logoutbutton';
import '../../../api/registerUser/methods';
import '../../../api/registerUser/registerUser';

Meteor.subscribe('userInformation');
Meteor.subscribe('players');

Template.registerUser2.helpers({
  playerInformation: () => {
    return Players.find().fetch();
  },
  rolesInformation: () =>{
    return Roles.find().fetch();
  }
});

Template.registerUser2.events({
  'submit .register': function (event) {

    event.preventDefault();



        var email = event.target.email.value;
        var password = event.target.password.value;
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;

    var user = { 'email':email,password:password,profile:{name:firstname+" "+lastname}};
    var assignedPlayers = [];

    $('.assignedPlayersList').children('.checked:checked').each(function(){
     assignedPlayers.push($(this).val());
   })


    Accounts.createUser(user);
    Meteor.call('createRoleData', { name: $('#firstname').val(),
    role: $('#accountRole:checked').val(), email: $('#email').val(), netName:$('#netName').val(),assignedPlayers: assignedPlayers });
    toastr.success("Data Saved", "Create User");




},
});
