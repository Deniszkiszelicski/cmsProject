import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './footer.html';


Meteor.subscribe('networks');

Template.footer.helpers({
  footerLogo: () => {
    return Networks.findOne({_id:Session.get("currentNetworkId")});

  },


});
