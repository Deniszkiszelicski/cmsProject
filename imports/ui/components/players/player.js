import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './player.html';

Template.player.onCreated(function onCreated() {
  this.isEditMode = new ReactiveVar(false);
});

Template.player.helpers({
  isEditMode: function isEditMode() {
    return Template.instance().isEditMode.get();
  },
  mayEdit: function mayEdit() {
    // const email = Meteor.user().emails[0].address;
    // const role = UserInformation.findOne({"email": email}, {"role": 1, '_id': 0}).role;
    // const editPermission = Roles.findOne({"roleName": role}, {"editPlayer": 1, '_id': 0}).editPlayer;
    // return editPermission;
    return true;
  },
});

Template.player.events({
  'click #button-delete-player': function deletePlayer(event) {
    event.preventDefault();
    Meteor.call('deletePlayer', this._id);
  },
  'click #button-edit-player': function editPlayer(event, templateInstance) {
    event.preventDefault();
    templateInstance.isEditMode.set(true);
  },
  'click #button-close-player-form, click .button-save': function closeForm(event, templateInstance) {
    event.preventDefault();
    event.stopPropagation();
    templateInstance.isEditMode.set(false);
  },
});
