import { Template } from 'meteor/templating';
import '../../../api/contents/methods';
import '../../../api/contents/collection';
import './contentForm.html';

Template.contentForm.helpers({
  isTab1Expanded: () => {
    return false;
  },
  isTab2Expanded: () => {
    return true;
  },
  isTab3Expanded: () => {
    return false;
  },
});
