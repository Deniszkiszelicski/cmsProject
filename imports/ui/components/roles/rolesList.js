import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './rolesList.html';
import '../../../api/roles/methods';
import '../../../api/roles/roles';

Meteor.subscribe('roles');

Template.rolesList.helpers({
  roles: () => {
    return Roles.find().fetch();
  },
});
