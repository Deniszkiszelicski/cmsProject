import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import '../../../ui/components/networks/networkSelection'
import '../../../api/roles/roles';
import './header.html';

Meteor.subscribe('networks');
Meteor.subscribe('roles');

Template.header.helpers({
  headerLogo: () => {
    return Networks.findOne({_id:Session.get("currentNetworkId")});
  },
  showNetworkSelection: function showNetworkSelection() {
    return true;
  },
  // TODO: for dev only, remove on production
  currentUser: function displayCurrentUser () {
    const user = Meteor.user();
    if (user) {
      return user.profile;
    }
  },
  curUserInfo: function curUserInfo (){
    const user = Meteor.user();
    if (user){
      return user.emails[0].address;
    }
  },
  currentRole: function displayCurrentRole () {
    const user = Meteor.user();
    if (user) {
      const role = Roles.findOne({ _id: user.profile.role });
      if (role) {
        return role.roleName;
      }
    }
  },
  currentNetwork: function displayCurrentRole () {
    const user = Meteor.user();
    if (user) {
      const role = Roles.findOne({ _id: user.profile.role });
      if (role) {
        const networkId = role.networkId;
        const network = Networks.findOne({ _id: networkId });
        if (network) {
          return network.netName;
        }
      }
    }
  },
});

Template.header.events({
  'click #logout': function logmeout(event) {

    BootstrapModalPrompt.prompt({
      title: "Logout Confirmation",
      content: "Do you really want to logout?"
    },
    function(result) {
      if (result) {
        event.preventDefault();
        Meteor.logout();
      } else {
    // User did not confirm, do nothing.
      }
    });
  },
});
