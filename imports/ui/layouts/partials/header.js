import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './header.html';

Meteor.subscribe('networks');

Template.header.helpers({
  headerLogo: () => {
    return Networks.findOne({_id:Session.get("currentNetworkId")});

  },


});
