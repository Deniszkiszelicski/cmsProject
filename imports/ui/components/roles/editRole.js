import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './editRole.html';
import '../../components/logoutbutton';
import '../../components/roles/roles';
import '../../components/roles/rolesList';

Meteor.subscribe('roles');

Template.roleEdit.helpers({
  editRole: () => {

    return Roles.findOne({_id: Session.get("selectedRole")});

  },



});
Template.roleEdit.events({
  'submit .editRole-form': function editItem(event) {

event.preventDefault();



    Meteor.call('editSelectedRole', {_id:Session.get("selectedRole"),roleName: $('#roleName').val(),
                                 networkId: Session.get("currentNetworkId"),
                                 createPlayer: $('#createPlayer').is(":checked"),
                                 editPlayer: $('#editPlayer').is(":checked"),
                                 deletePlayer: $('#deletePlayer').is(":checked"),
                                 createVideoImg: $('#createVideoImg').is(":checked"),
                                 editVideoImg: $('#editVideoImg').is(":checked"),
                                 deleteVideoImg: $('#deleteVideoImg').is(":checked"),
                                 createContent: $('#createContent').is(":checked"),
                                 editContent: $('#editContent').is(":checked"),
                                 deleteContent: $('#deleteContent').is(":checked"),
                                 createContentGrp: $('#createContentGrp').is(":checked"),
                                 editContentGrp: $('#editContentGrp').is(":checked"),
                                 deleteContentGrp: $('#deleteContentGrp').is(":checked"),
                                 createPlaylist: $('#createPlaylist').is(":checked"),
                                 editPlaylist: $('#editPlaylist').is(":checked"),
                                 deletePlaylist: $('#deletePlaylist').is(":checked"),
                                 adminMenu: $('#adminMenu').is(":checked"),
                                 netzMenu: $('#netzMenu').is(":checked"),
                                 userMenu: $('#userMenu').is(":checked"),
                                 roleMenu: $('#roleMenu').is(":checked"),
                                 contentMenu: $('#contentMenu').is(":checked"),
                                 statisticMenu: $('#statisticMenu').is(":checked"),
                                 homeEditMenu: $('#homeEditMenu').is(":checked"),
                                 seeMedia: $('#seeMedia').is(":checked"),
                                 seeContent: $('#seeContent').is(":checked"),
                                 seeContentGroup: $('#seeContentGroup').is(":checked")});
                                 toastr.success("Role saved","Edit Role");

}
});
