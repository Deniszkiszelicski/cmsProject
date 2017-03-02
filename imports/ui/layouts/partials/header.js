import '../../../ui/components/networks/networkSelection'
import './header.html';

Template.header.helpers({
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
