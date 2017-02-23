import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './editUser.html';
import '../../components/logoutbutton';
import '../../components/regUsers/userReg';
import '../../components/regUsers/userList';


Meteor.subscribe('userInformation');
Meteor.subscribe('users');


Template.editUser2.helpers({
  user: () => {
    return Meteor.users.findOne({_id:Session.get('id')});
  },
  rolesInformation: () =>{
    return Roles.find().fetch();
  },
  playerInformation: () => {
    return Players.find().fetch();
  },

});

Template.editUser2.events({
  'submit .edit': function editUser(event) {
    event.preventDefault();


    var email = event.target.email.value;
    var password = event.target.password.value;
    var firstname = event.target.firstname.value;
    var netName = event.target.netName.value;
    var assignedPlayers = [];
    var role = $('#accountRole:checked').val();

    $('.assignedPlayersList').children('.checked:checked').each(function(){
     assignedPlayers.push($(this).val());
    });
    var user = { email:email, password:password, profile:
     { name:firstname,netName:netName,assignedPlayers:assignedPlayers,role:role}};

    console.log(user);

    Meteor.users.update({_id:Session.get('id')},{$set:(user)});
    toastr.success("Data Saved", "Create User");
  },

});
