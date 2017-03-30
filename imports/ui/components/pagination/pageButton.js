import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './pageButton.html';

Template.pageButton.onCreated(function onCreated() {
  this.currentPage = new ReactiveVar(this.data.options.initialPage);
  const playersCount = this.data.options.playersCount;
  const showPerPage = this.data.options.initialShowPerPage;
});

Template.pageButton.helpers({
});

Template.pageButton.events({
});
