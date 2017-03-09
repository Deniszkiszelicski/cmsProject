import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './editUser.html';
import '../../components/logoutbutton';
import '../../components/regUsers/userReg';
import '../../components/regUsers/userList';


Meteor.subscribe('users');
Meteor.subscribe('roles');
// Meteor.subscribe('players', true);

Template.editUser2.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('players', true);
  });
});

Template.editUser2.helpers({
  user: () => {
    return Meteor.users.findOne({_id:Session.get('id')});
  },

  playerInformation: () => {
    return Players.find().fetch();
  },
  roleName: (id)=>{
    return Roles.findOne({_id:id}).roleName;

  },
  rolesInformation: () =>{
    return Roles.find().fetch();
  },
  playerName : (id) =>{
    return Players.findOne({_id:id}).name;


  },
  playerIds : (id) =>{
    return Players.findOne({_id:id}).playerId;
  }

});

Template.editUser2.events({
  'submit .edit': function editUser(event) {
    event.preventDefault();


    var email = event.target.email.value;
    var password = event.target.password.value;
    var firstname = event.target.firstname.value;
    var assignedPlayers = [];
    var role = $('#checked:checked').val();

    $('.assignedPlayersList').children('.checked:checked').each(function(){
     assignedPlayers.push($(this).val());
    });
    var user = { email:email, password:password, profile:
     { name:firstname,assignedPlayers:assignedPlayers,role:role}};

    console.log(user);

    Meteor.users.update({_id:Session.get('id')},{$set:(user)});
    toastr.success("Data Saved", "Edit User");
  },

});
