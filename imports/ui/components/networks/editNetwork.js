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
    });
    var regionL = [];
    $('.regionList').children('#regionList').each(function(){
      regionL.push($(this).val());
    });
    Meteor.call('editSelectedNetwork', {_id:Session.get("selectedNetwork"),netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment:sortimentL, region:regionL});
    toastr.success("Data saved","Edit Network");
    Session.set("sortiment",[]);
  },


  'click #deleteOneRegion': function deleteOneRegion(event){
    event.preventDefault();
    var region = String(this);
    var id = event.currentTarget.name;
    console.log(id,region, "calling");
    Meteor.call ('deleteOneRegion' ,id,region);

  },
  'click #deleteOneSortiment': function deleteOneSortiment(event){
    event.preventDefault();
    var sortiment = String(this);
    var id = event.currentTarget.name;
    console.log(id,sortiment, "calling");
    Meteor.call ('deleteOneSortiment' ,id,sortiment);

  },


  'click #addNewSortiment': function addOneSortiment(event){
    let sortiment = [];
    let region = [];
    event.preventDefault();

    $('.sortimentList').children('#sortimentList').each(function(){
      sortiment.push($(this).val());
    });
    $('.regionList').children('#regionList').each(function(){
      region.push($(this).val());
    });
    sortiment.push($('#oneSortiment').val());
    Meteor.call('editSelectedNetwork', {_id:Session.get("selectedNetwork"),netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment:sortiment, region:region});
    toastr.success("Data saved","Edit Network");
    document.getElementById("oneSortiment").value='';
  },
  'click #addNewRegion': function addOneRegion(event){
    let sortiment = [];
    let region = [];
    event.preventDefault();

    $('.regionList').children('#regionList').each(function(){
      region.push($(this).val());
    });
    $('.sortimentList').children('#sortimentList').each(function(){
      sortiment.push($(this).val());
    });
    region.push($('#oneRegion').val());
    Meteor.call('editSelectedNetwork', {_id:Session.get("selectedNetwork"),netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment:sortiment, region:region});
    toastr.success("Data saved","Edit Network");
    document.getElementById("oneRegion").value='';


  },
});
