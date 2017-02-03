import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './userList.html';
import '../../../api/registerUser/methods';
import '../../../api/registerUser/registerUser';

Meteor.subscribe('userInformation');

Template.usersList.helpers({
  userInformation: () => {
    return UserInformation.find().fetch();
  },
});
