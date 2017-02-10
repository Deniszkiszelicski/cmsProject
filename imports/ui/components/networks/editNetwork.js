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


    Meteor.call('editSelectedNetwork', {_id:Session.get("selectedNetwork"),netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
   privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val() });
   toastr.success("Data saved","Edit Network");





  },
})
