import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './admin_role.html';
import '../components/logoutbutton';
import '../components/roles/roles';
import '../components/roles/rolesList';

Template.adminRoles.onCreated(function onCreated() {
  this.isCreateNew = new ReactiveVar(false);
});

Template.adminRoles.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
});

Template.adminRoles.events({
  'click #btnRole': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(true);
  },

  'submit .register-form': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
});
