import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './list.html';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import '../../components/networks/editNetwork';

Meteor.subscribe('networks');

Template.networksList.onCreated(function onCreated() {
  this.isEdit = new ReactiveVar(false);
});

Template.networksList.helpers({
  networks: () => {
    return Networks.find().fetch();
  },
  isEdit: function isEdit() {
    return Template.instance().isEdit.get();
  },

});

Template.networksList.events({




  'click #deleteNlist': function deleteNetwork(event) {
    BootstrapModalPrompt.prompt({
    title: "Delete Network",
    content: "Are you sure? This can not be undone!"
}, function(result) {
  if (result) {
    event.preventDefault();
    Meteor.call('deleteNetwork', this._id);

    // User confirmed it, so go do something.
  }
  else {
    // User did not confirm, do nothing.
  }
});},


    'click #editNList':
      function editItem(event, templateInstance) {
        event.preventDefault();

        templateInstance.isEdit.set(true);
        
        Session.set('selectedNetwork', this._id);

    },
    'click #editSubmit': function closeEditForm(event, templateInstance){
      templateInstance.isEdit.set(false);
    }





});
