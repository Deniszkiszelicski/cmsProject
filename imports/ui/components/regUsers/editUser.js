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
  userInformation: () => {
    return UserInformation.findOne({_id: Session.get("selectedUser")});
  },
  rolesInformation: () =>{
    return Roles.find().fetch();
  },
  playerInformation: () => {
    return Players.find().fetch();
  },

});

Template.editUser2.events({
  'submit .editUser2': function editUser(event) {
    event.preventDefault();
  },

});
