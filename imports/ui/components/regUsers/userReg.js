import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './userReg.html';
import '../../components/logoutbutton';
import '../../../api/registerUser/methods';
import '../../../api/registerUser/registerUser';

Meteor.subscribe('networks');

Template.registerUser2.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('players', true);
  });
});

Template.registerUser2.helpers({
  playerInformation: () => {
    return Players.find().fetch();
  },
  rolesInformation: () =>{
    return Roles.find().fetch();
  },
});

Template.registerUser2.events({
  'submit .register': function (event) {

    event.preventDefault();



        var email = event.target.email.value;
        var password = event.target.password.value;
        var firstname = event.target.firstname.value;
        var assignedPlayers = [];
        var role = $('.assignedRole').children('#checked:checked').val();


        $('.assignedPlayersList').children('.checked:checked').each(function(){
         assignedPlayers.push($(this).val());
       });
      var user = { email:email, password:password, profile:
         { name:firstname,assignedPlayers:assignedPlayers,role:role}};



Accounts.createUser(user);
toastr.success("Data Saved", "Create User");

},

});
