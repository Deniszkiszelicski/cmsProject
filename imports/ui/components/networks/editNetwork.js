import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './editNetwork.html';
import '../../components/logoutbutton';
import '../../components/networks/register';
import '../../components/networks/list';

Meteor.subscribe('networks');

Template.editNetworkItem.helpers({
  editNet: () => {

    return Networks.findOne({_id: Session.get("selectedNetwork")});

  },



});
Template.editNetworkItem.events({
  'click #editSubmit': function editItem(event) {

event.preventDefault();

  var region = [];
   var sortiment = [];

   for (var i = 1; i <= Session.get("counter2"); i++) {
     sortiment.push($('#field' + i).val());
     console.log(sortiment);}

     for (var i = 1; i <= Session.get("counter3"); i++) {
       region.push($('#rfield' + i).val());
       console.log(region);
     };


    $('#sortimentList > #sortimentList1 > #sortimentList2').each(function(){

    sortiment.push($(this).val());

    })
     $('#regionList > #regionList1 > #regionList2').each(function(){

       region.push($(this).val());

    })






    Meteor.call('editSelectedNetwork', {_id:Session.get("selectedNetwork"),netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
   privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment:sortiment, region:region});
   toastr.success("Data saved","Edit Network");
   Session.set("counter2",1);
   Session.set("counter3",1);






  },
  'click #b3':function(){
    Session.set("counter2",Session.get("counter2")+ 1);

  },
  'click #rb3':function(){
    Session.set("counter3",Session.get("counter3")+1);
  }
})
