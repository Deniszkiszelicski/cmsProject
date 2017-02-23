import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import './rolesList.html';
import '../../../api/roles/methods';
import '../../../api/roles/roles';
import '../../components/roles/editRole';

Meteor.subscribe('roles');

Template.rolesList.onCreated(function onCreated() {
  this.isRoleEdit = new ReactiveVar(false);
});

Template.rolesList.helpers({
  roles: () => {
    return Roles.find().fetch();
  },
isRoleEdit: function isRoleEdit() {
  return Template.instance().isRoleEdit.get();
},
});

Template.rolesList.events({
'click #deleteRlist': function deleteNetwork(event) {

  event.preventDefault();
  Meteor.call('deleteRole', this._id);

},

'click #editRList':
  function editItem(event, templateInstance) {
    event.preventDefault();

    templateInstance.isRoleEdit.set(true);

  Session.set('selectedRole', this._id);

},
'submit .editRole-form': function closeEditForm(event, templateInstance){
  templateInstance.isRoleEdit.set(false);
},
'click #closeEditRole': function closeEditRole(event, templateInstance){
  templateInstance.isRoleEdit.set(false);
}

});
