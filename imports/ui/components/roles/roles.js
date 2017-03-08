import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import './roles.html';
import '../../components/logoutbutton';
import '../../../api/roles/methods';
import '../../../api/roles/roles';

Meteor.subscribe('roles');

Template.adminRole.onCreated(function onCreate() {
  const networkId = Session.get("currentNetworkId");
  const currentNetwork = Networks.findOne({ _id: networkId });
  this.currentNetwork = new ReactiveVar(currentNetwork);
});

Template.adminRole.helpers({
  currentNetworkName: () => {
    return Template.instance().currentNetwork.get().netName;
  },
  currentNetworkId: () => {
    return Template.instance().currentNetwork.get().netId;
  },
});

Template.adminRole.events({
  'submit .register-form': function (event) {

    event.preventDefault();

    Meteor.call('createRole', { roleName: $('#roleName').val(),
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
                                 seeAllPlayers: $('#seeAllPlayers').is(":checked"),
                                 seeContentGroup: $('#seeContentGroup').is(":checked"),
    });
    toastr.success("Role saved","New Role");

  }

},

);
