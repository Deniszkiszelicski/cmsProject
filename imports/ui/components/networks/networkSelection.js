import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Blaze } from 'meteor/blaze';
import './list.html';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import './networkSelection.html';

Meteor.subscribe('networks');

Blaze._allowJavascriptUrls();

Template.networkSelection.onCreated(function onCreated() {
  const currentNetworkId = Session.get("currentNetworkId");
  if (currentNetworkId) {
    const selectedNetwork = Networks.findOne({ _id: currentNetworkId });
    this.selectedNetwork = new ReactiveVar(selectedNetwork);
  } else {
    this.selectedNetwork = new ReactiveVar();
    Blaze._allowJavascriptUrls();
  }
});

Template.networkSelection.helpers({
  currentNetworkName: function currentNetworkName() {
    const selectedNetwork = Template.instance().selectedNetwork.get();
    return selectedNetwork ? selectedNetwork.netName + " - " + selectedNetwork.netId : "Networks";
  },
  allNetworks: function currentNetworkName() {
    return Networks.find().fetch();
  },
});

Template.networkSelection.events({
  'click .select-network-button': function selectNetwork(event, templateInstance) {
    templateInstance.selectedNetwork.set(this);
    Session.set("currentNetworkId", this._id);
  },
});
