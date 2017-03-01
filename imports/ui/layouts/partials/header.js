import '../../../ui/components/networks/networkSelection'
import './header.html';

Template.header.helpers({
  showNetworkSelection: function showNetworkSelection() {
    return true;
  }
});
