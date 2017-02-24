import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './userList.html';
import '../../../api/registerUser/methods';
import '../../../api/registerUser/registerUser';
import '../../components/regUsers/editUser';

Meteor.subscribe('users');
Meteor.subscribe('roles');

Template.usersList.onCreated(function onCreated() {
  this.isUserEdit = new ReactiveVar(false);
});

Template.usersList.helpers({
  users: () => {

    return Meteor.users.find().fetch();


  },
  roleName: (id)=>{
    return Roles.findOne({_id:id}).roleName;
  },


  isUserEdit: function isUserEdit() {
    return Template.instance().isUserEdit.get();
  },
});

Template.usersList.events({
  'click #deleteUser': function deleteUser(event){
    event.preventDefault();


    Meteor.users.remove({_id:this._id});


  },
  'click #editUser': function editItem(event, templateInstance) {
    event.preventDefault();

    templateInstance.isUserEdit.set(true);
    Session.set('id',this._id);

  },
  'click #closeEditUser': function closeEditUser(event, templateInstance){
    templateInstance.isUserEdit.set(false);
  },


});
