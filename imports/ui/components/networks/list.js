import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './list.html';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';

Meteor.subscribe('networks');

Template.networksList.helpers({
  networks: () => {
    return Networks.find().fetch();
  },
});
