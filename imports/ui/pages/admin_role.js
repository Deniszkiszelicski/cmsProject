import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './admin_role.html';
import '../components/logoutbutton';
import '../../api/roles/methods';
import '../../api/roles/roles';

Meteor.subscribe('roles');

Template.admin_role.events({
  'submit .register-form': function (event) {

    event.preventDefault();
    BootstrapModalPrompt.prompt({
    title: "Roles Registration Confirmation",
    content: "Do you want to save changes?"
  }, function prompt(result) {
      if (result) {

    Meteor.call('createRole', { netName: $('#netName').val(), netId: $('#netId').val(),
    roleName: "admin", createdNet: $('#create_net').is(":checked"), createPlayer: $('#create_player').is(":checked"), editPlayer: $('#edit_player').is(":checked"), deletePlayer: $('#delete_player').is(":checked"),
    addVideoPic: $('#add_videoPic').is(":checked"), editVideoPic: $('#edit_videoPic').is(":checked"), deleteVideoPic: $('#delete_videoPic').is(":checked") });

    Meteor.call('createRole', { netName: $('#cmnetName').val(), netId: $('#cmnetId').val(),
    roleName: "contentManager", createdNet: $('#cmcreate_net').is(":checked"), createPlayer: $('#cmcreate_player').is(":checked"), editPlayer: $('#cmedit_player').is(":checked"), deletePlayer: $('#cmdelete_player').is(":checked"),
    addVideoPic: $('#cmadd_videoPic').is(":checked"), editVideoPic: $('#cmedit_videoPic').is(":checked"), deleteVideoPic: $('#cmdelete_videoPic').is(":checked") });

    Meteor.call('createRole', { netName: $('#scmnetName').val(), netId: $('#scmnetId').val(),
    roleName: "subContentManager", createdNet: $('#scmcreate_net').is(":checked"), createPlayer: $('#scmcreate_player').is(":checked"), editPlayer: $('#scmedit_player').is(":checked"), deletePlayer: $('#scmdelete_player').is(":checked"),
    addVideoPic: $('#scmadd_videoPic').is(":checked"), editVideoPic: $('#scmedit_videoPic').is(":checked"), deleteVideoPic: $('#scmdelete_videoPic').is(":checked") });

    Meteor.call('createRole', { netName: $('#netName').val(), netId: $('#netId').val(),
    roleName: "user", createdNet: $('#create_net').is(":checked"), createPlayer: $('#create_player').is(":checked"), editPlayer: $('#edit_player').is(":checked"), deletePlayer: $('#delete_player').is(":checked"),
    addVideoPic: $('#add_videoPic').is(":checked"), editVideoPic: $('#edit_videoPic').is(":checked"), deleteVideoPic: $('#delete_videoPic').is(":checked") });

    FlowRouter.go('/home');
  }
      else {
    // User did not confirm, do nothing.
  }

    });
  }

},

);
