import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './editNetwork.html';
import '../../components/logoutbutton';
import '../../components/networks/register';
import '../../components/networks/list';

Meteor.subscribe('networks');

Template.editNetworkItem.helpers({
  editNet: () => {
    console.log(Networks.findOne({_id: Session.get("selectedNetwork")}).netName);
    return Networks.findOne({_id: Session.get("selectedNetwork")});

  },



});
