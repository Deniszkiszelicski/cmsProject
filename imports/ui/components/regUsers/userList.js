
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './userList.html';
import '../../../api/registerUser/methods';
import '../../../api/registerUser/registerUser';
import '../../components/regUsers/editUser';

Meteor.subscribe('roles');
  Session.setDefault("skip",0);




Template.usersList.onCreated(function onCreated() {
  this.isUserEdit = new ReactiveVar(false);
  this.filterText = new ReactiveVar();
  this.usersPerPage = new ReactiveVar(2);
  this.autorun(() => {
  const usersPerPage1 = this.usersPerPage.get();
    Meteor.subscribe('users',Session.get("skip"));

  });

});

Template.usersList.helpers({
  filteredUsers: () => {
    let filterText = Template.instance().filterText.get();
    return Meteor.users.find({ "profile.name": { $regex : new RegExp(filterText), $options:'i' }}).fetch();
  },

  roleName: (id)=>{
    const role = Roles.findOne({_id:id});
    if (role) {
      return Roles.findOne({_id:id}).roleName;
    }
  },
  isUserEdit: function isUserEdit() {
    return Template.instance().isUserEdit.get();
  },

});

Template.usersList.events({
  'click #deleteUser': function deleteUser(event) {
    event.preventDefault();


    Meteor.users.remove({_id:Session.get("selectedUser") });
    toastr.success("Deleted", "User");

  },
  'click #editUser': function editItem(event, templateInstance) {
    event.preventDefault();

    templateInstance.isUserEdit.set(true);
    Session.set('id',this._id);

  },
  'click #closeEditUser': function closeEditUser(event, templateInstance) {
    templateInstance.isUserEdit.set(false);
  },
  'click #selectUserDel': function selectUserDel(event) {
    event.preventDefault();
    Session.set('selectedUser', this._id);
  },
  'submit .edit': function closeEditForm(event, templateInstance) {
    templateInstance.isUserEdit.set(false);
  },

  'keyup #users-filter-input': function filter(event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  },
  'click #nextPage': function nextPage(event,templateInstance){
    event.preventDefault();
    var no = Template.instance().usersPerPage.get()
    Session.set("skip",Session.get("skip") + 1);
    console.log(no);
  },
  'click #prevPage': function prevPage(event,templateInstance){
    event.preventDefault();
    let no = Template.instance().usersPerPage.get()
    if(Session.get('skip') >= 1){
      Session.set('skip',Session.get('skip') - 1);
      console.log(no);
    }
  },
  'keyup #userPerPage': function userPerPage(event, templateInstance){
    templateInstance.usersPerPage.set(event.currentTarget.value);
    let no = Template.instance().usersPerPage.get()

  },

});
