import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './admin_networks.html';
import '../components/logoutbutton';
import '../components/networks/register';
import '../components/networks/list';
import '../components/networks/editNetwork';


Template.adminNetworks.onCreated(function onCreated() {
  this.isCreateNew = new ReactiveVar(false);
});

Template.adminNetworks.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
});

Template.adminNetworks.events({
  'click #btn': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(true);
  },

  'submit .register-form1': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
