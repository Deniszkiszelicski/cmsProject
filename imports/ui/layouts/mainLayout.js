import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import './partials/header';
import './partials/footer';
import '../components/logoutbutton';
import './mainLayout.html';

Template.App_body.events({
  'click .page-link': function reloadPage(event, templateInstance) {
    Session.set("isDefaultPageLayout", true);
  },
});
