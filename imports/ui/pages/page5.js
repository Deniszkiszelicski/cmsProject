import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import './page5.html';
import '../components/logoutbutton';
import '../components/regUsers/userReg';
import '../components/regUsers/userList';



Meteor.subscribe('users');

Meteor.subscribe('registerUsers');


Template.userReg1.onCreated(function onCreated() {
  this.isCreateNew = new ReactiveVar(false);
});

Template.userReg1.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
});

Template.userReg1.events({
  'click #btn2': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(true);
  },

  'submit .register': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
  'click #closeUserCreate': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
  

});

Template.usersList.events({

})
