import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './home.html';
import '../components/logoutbutton';

Meteor.subscribe('networks');

Template.home.helpers({
  homePageData: () => {
    return Networks.findOne({_id:Session.get("currentNetworkId")});

  },


});
