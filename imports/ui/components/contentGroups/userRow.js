import { Template } from 'meteor/templating';
import './userRow.html';

Template.userRow.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('roles');
  });
});

Template.userRow.helpers({
  getRoleName: function getRoleName (id) {
    const role = Roles.findOne({ _id: id });
    if (role) {
      return role.roleName;
    }
  }
});
