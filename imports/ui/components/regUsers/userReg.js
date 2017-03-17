import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveVar } from 'meteor/reactive-var';
import './userReg.html';
import '../../components/logoutbutton';
import '../../../api/registerUser/methods';
import '../../../api/registerUser/registerUser';

Meteor.subscribe('networks');
Meteor.subscribe('players');


var Playervalue = [];


Template.registerUser2.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('players', true);

  });

  this.counter = new ReactiveVar();
  this.filterText = new ReactiveVar();
});

Template.registerUser2.helpers({
  filteredPlayers: () => {
    let filterText = Template.instance().filterText.get();
    return Players.find({ playerId: { $regex : new RegExp(filterText), $options:'i' }}).fetch();
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

Template.registerUser2.events({
  'submit .register': function (event) {

    event.preventDefault();


        var assignedPlayers = [];
        var email = event.target.email.value;
        var password = event.target.password.value;
        var firstname = event.target.firstname.value;

        var role = $('.assignedRole').children('#checked:checked').val();




        $('.assignedPlayersList').children('#playerList').each(function(){
         assignedPlayers.push($(this).val());
       });

      //   var onePlayer = $('#onePlayer').val();
      //  assignedPlayers.push(Players.findOne({"playerId": onePlayer})._id);




      var user = { email:email, password:password, profile:
         { name:firstname,assignedPlayers:assignedPlayers,role:role}};



Accounts.createUser(user);
toastr.success("Data Saved", "Create User");

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
'click #deleteOnePlayer': function (event,templateInstance){
  event.preventDefault();
  var id = event.currentTarget.name;
  Playervalue.pop(id);
  templateInstance.counter.set(Playervalue);
},
'keyup #onePlayer': function filter(event, templateInstance){
  templateInstance.filterText.set(event.currentTarget.value);
},
});
