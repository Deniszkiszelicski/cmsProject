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
var Playervalue = [];

Template.editUser2.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('players', true);
  });
  this.counter = new ReactiveVar();
  this.filterText = new ReactiveVar();
});

Template.editUser2.helpers({
  filteredPlayers: () => {
    let filterText = Template.instance().filterText.get();
    return Players.find({ playerId: { $regex : new RegExp(filterText), $options:'i' }}).fetch();
  },
  user: () => {
    return Meteor.users.findOne({_id:Session.get('id')});
  },
  roleName: (id) =>{
    return Roles.findOne({_id:id}).roleName;

  },

  playerName: (id) =>{
    console.log(Players.findOne({_id:id}).name);
    return Players.findOne({_id:id}).name;
  },
  playerIds: (id) =>{
    return Players.findOne({_id:id}).playerId;
  },
  playerInformation: () => {
    return Players.find().fetch();
  },
  rolesInformation: () =>{
    return Roles.find().fetch();
  },
  onePlayer: () =>{
    return Template.instance().counter.get(Playervalue);
  },


});

Template.editUser2.events({
  'submit .edit': function editUser(event) {
    event.preventDefault();


    var email = event.target.email.value;
    var password = event.target.password.value;
    var firstname = event.target.firstname.value;
    var assignedPlayers = [];
    var role = $('#checked:checked').val();

    $('.assignedPlayersList').children('#playerList').each(function(){
     assignedPlayers.push($(this).val());
    });
    var user = { email:email, password:password, profile:
     { name:firstname,assignedPlayers:assignedPlayers,role:role}};

    console.log(user);

    Meteor.users.update({_id:Session.get('id')},{$set:(user)});
    toastr.success("Data Saved", "Edit User");
  },
  'click #deleteOnePlayer':function deleteOnePlayer(event){
    event.preventDefault()
    var player = String(this);
    var id = event.currentTarget.name;
    console.log(id,player, "calling");
    Meteor.users.update ({_id:id},{$pull:{'profile.assignedPlayers':player}});

  },
  'click #addPlayer': function (event, templateInstance){
  event.preventDefault();
  var onePlayer = $('#onePlayer').val();
 // assignedPlayers.push(Players.findOne({"playerId": onePlayer})._id);


 console.log(Players.findOne({"playerId": onePlayer}));
 Playervalue.push({playerId:(Players.findOne({"playerId": onePlayer}).playerId),id:(Players.findOne({"playerId": onePlayer})._id)});
 templateInstance.counter.set(Playervalue);
document.getElementById("onePlayer").value='';
},
'click #deleteOnePlayer1': function (event,templateInstance){
  event.preventDefault();
  var id = event.currentTarget.name;
  Playervalue.pop(id);
  templateInstance.counter.set(Playervalue);
},
'keyup #onePlayer': function filter(event, templateInstance){
  templateInstance.filterText.set(event.currentTarget.value);
},

});
