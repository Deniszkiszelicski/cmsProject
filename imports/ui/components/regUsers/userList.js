
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


Template.usersList.onCreated(function onCreated() {
  this.isUserEdit = new ReactiveVar(false);
  this.filterText = new ReactiveVar();
  this.usersPerPage = new ReactiveVar(1);
  this.noOfUsersPerPage = new ReactiveVar(5);
  this.autorun(() => {
    const usersPerPage = this.usersPerPage.get();
    const noOfUsersPerPage = this.noOfUsersPerPage.get();
    const filterText = this.filterText.get();
    this.subscribe('users', usersPerPage, noOfUsersPerPage, filterText);
  });
});

Template.usersList.helpers({
  filteredUsers: () => {
    return Meteor.users.find().fetch();
  },

  roleName: (id) =>{
    const role = Roles.findOne({ _id: id });
    if (role) {
      return Roles.findOne({ _id: id }).roleName;
    }
  },
  isUserEdit: function isUserEdit() {
    return Template.instance().isUserEdit.get();
  },

});

Template.usersList.events({
  'click #deleteUser': function deleteUser(event) {
    event.preventDefault();


    Meteor.users.remove({ _id: Session.get('selectedUser') });
    toastr.success('Deleted', 'User');
  },
  'click #editUser': function editItem(event, templateInstance) {
    event.preventDefault();

    templateInstance.isUserEdit.set(true);
    Session.set('id', this._id);
  },
  'click #closeEditUser': function closeEditUser(event, templateInstance) {
    templateInstance.isUserEdit.set(false);
  },
  'click #selectUserDel': function selectUserDel(event) {
    event.preventDefault();
    Session.set('selectedUser', this._id);
  },
  'click #userEdit': function closeEditForm(event, templateInstance) {
    templateInstance.isUserEdit.set(false);
  },

  'keyup #users-filter-input': function filter(event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  },
  'click #nextPage': function nextPage(event, templateInstance){
    event.preventDefault();
    const noOfUsersPerPage = Template.instance().noOfUsersPerPage.get();
    const no = Template.instance().usersPerPage.get();
    templateInstance.usersPerPage.set(no + noOfUsersPerPage);
  },
  'click #prevPage': function prevPage(event, templateInstance){
    event.preventDefault();
    const noOfUsersPerPage = Template.instance().noOfUsersPerPage.get();
    const no = Template.instance().usersPerPage.get();
    if (no > noOfUsersPerPage){
      templateInstance.usersPerPage.set(no - noOfUsersPerPage);
    }
  },
  'keyup #userPerPage': function userPerPage(event, templateInstance){
    const noOfUsersPerPage = parseInt(event.currentTarget.value);
    if (noOfUsersPerPage > 0) {
      templateInstance.noOfUsersPerPage.set(noOfUsersPerPage);
    }else{
      templateInstance.noOfUsersPerPage.set(5);
    }
    console.log(noOfUsersPerPage);

  },

});
