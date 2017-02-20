import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './userList.html';
import '../../../api/registerUser/methods';
import '../../../api/registerUser/registerUser';
import '../../components/regUsers/editUser';

Meteor.subscribe('userInformation');

Template.usersList.onCreated(function onCreated() {
  this.isUserEdit = new ReactiveVar(false);
});

Template.usersList.helpers({
  userInformation: () => {
    return UserInformation.find().fetch();
  },
  isUserEdit: function isUserEdit() {
    return Template.instance().isUserEdit.get();
  },
});

Template.usersList.events({
  'click #deleteUser': function deleteUser(event){
    event.preventDefault();

    Meteor.call ('deleteUser',this._id);

  },
  'click #editUser': function editItem(event, templateInstance) {
    event.preventDefault();

    templateInstance.isUserEdit.set(true);

    Session.set('selectedUser', this._id);
  },
  'click #closeEditUser': function closeEditUser(event, templateInstance){
    templateInstance.isUserEdit.set(false);
  },
  
});
