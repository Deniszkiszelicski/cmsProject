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

var region = [];




Template.editNetworkItem.helpers({
  editNet: () => {
    return Networks.findOne({_id: Session.get("selectedNetwork")});
  },
});
Template.editNetworkItem.events({
  'click #editSubmit': function editItem(event) {
    event.preventDefault();
    var sortimentL = [];
    $('.sortimentList').children('#sortimentList').each(function(){
      sortimentL.push($(this).val());
      console.log("$(this).val() = ", $(this).val());
    });
    Meteor.call('editSelectedNetwork', {_id:Session.get("selectedNetwork"),netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment:sortimentL, region:region});
    toastr.success("Data saved","Edit Network");
    Session.set("sortiment",[]);
  },
  'click #deleteOneRegion': function deleteOneRegion(event){
    event.preventDefault();
    var region = this;
    var id = event.currentTarget.name;
    Meteor.call ('deleteOneRegion' ,id,region);
  },
  'click #addNewSortiment': function addOneSortiment(event){
    let sortiment = [];
    event.preventDefault();
    console.log("$('#sortimentList').val() = ", $('#sortimentList').val());

    $('.sortimentList').children('#sortimentList').each(function(){
      sortiment.push($(this).val());
      console.log("$(this).val() = ", $(this).val());
    });
    console.log("$('.sortimentList').length = ", $('.sortimentList').length);
    // const l = $('.sortimentList').children().length;
    // for (i = 0; i < l; i++) {
    //   text += "<li>" + fruits[i] + "</li>";
    // }
    console.log("sortiment after collecting values = ", sortiment);
    sortiment.push($('#oneSortiment').val());
    console.log("sortiment after adding oneSortiment = ", sortiment);
    Meteor.call('editSelectedNetwork', {_id:Session.get("selectedNetwork"),netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment:sortiment, region:region});
    toastr.success("Data saved","Edit Network");
    // Session.set("sortiment",[]);
  }
});
