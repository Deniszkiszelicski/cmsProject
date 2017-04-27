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
var Playervalue = [];

Template.editUser2.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('players', true);
    Playervalue = [];
  });
  this.counter = new ReactiveVar();
  this.filterText = new ReactiveVar();
});

Template.editUser2.helpers({
  filteredPlayers: () => {
    const filterText = Template.instance().filterText.get();
    return Players.find({ playerId: { $regex: new RegExp(filterText), $options: 'i' } }).fetch();
  },
  user: () => {
    return Meteor.users.findOne({ _id: Session.get('id') });
  },
  roleName: (id) =>{
    return Roles.findOne({ _id: id }).roleName;
  },
  playerName: (id) =>{
    return Players.findOne({ _id: id }).name;
  },
  playerIds: (id) =>{
    const player = Players.findOne({ _id: id });
    if (player) {
      return player.playerId;
    }
  },
  playerInformation: () =>{
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
  'click #userEdit': function editUser(event) {
    event.preventDefault();
    var assignedPlayers = [];
    const email = $('#email').val();
    const password = $('#password').val();
    const firstname = $('#firstname').val();
    const role = $('#checked:checked').val();

    $('.assignedPlayersList').children('#playerList').each(function f() {
      assignedPlayers.push($(this).val());
    });
    const user = { email: email, password: password,
      profile: { name: firstname, assignedPlayers: assignedPlayers, role: role } };
    Meteor.users.update({ _id: Session.get('id') }, { $set: (user) });
    toastr.success("Data Saved", "Edit User");
  },
  'click #deleteOnePlayer': function deleteOnePlayer(event) {
    event.preventDefault()
    const player = String(this);
    const id = event.currentTarget.name;
    Meteor.users.update({ _id: id }, { $pull: { 'profile.assignedPlayers': player } });

  },
  'click #addPlayer': function f(event, templateInstance) {
    event.preventDefault();
    const onePlayer = $('#onePlayer').val();
    Playervalue.push({ playerId: (Players.findOne({ 'playerId': onePlayer }). playerId), id: (Players.findOne({ 'playerId': onePlayer })._id) });
    templateInstance.counter.set(Playervalue);
    document.getElementById('onePlayer').value = '';
  },
  'click #deleteOnePlayer1': function func(event, templateInstance){
    event.preventDefault();
    const id = event.currentTarget.name;
    Playervalue.pop(id);
    templateInstance.counter.set(Playervalue);
  },
  'keyup #onePlayer': function filter(event, templateInstance){
    templateInstance.filterText.set(event.currentTarget.value);
  },

});
