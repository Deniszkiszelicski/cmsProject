import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import '../../../ui/components/networks/networkSelection'
import './header.html';

Meteor.subscribe('networks');

Template.header.helpers({
  headerLogo: () => {
    return Networks.findOne({_id:Session.get("currentNetworkId")});
  },
  showNetworkSelection: function showNetworkSelection() {
    return true;
  },
  currentUser: function displayCurrentUser () {
    const user = Meteor.user();
    if (user) {
      return user.profile.name;
    }
  },
});
