// import Tabular from 'meteor/aldeed:tabular';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import '../../../api/players/methods';
import '../../../api/players/collection';
import '../modals/deleteConfirmation';
import './player';
import './playersList.html';

Template.playersList.onCreated(function onCreated() {
  this.currentPage = new ReactiveVar(this.data.options.initialPage);
  this.showPerPage = new ReactiveVar(this.data.options.initialShowPerPage);
  this.currentRangeOfPages = new ReactiveVar(this.data.options.initialRangeOfPages);
  this.filterText = new ReactiveVar();
  this.playerToDelete = new ReactiveVar();
  this.autorun(() => {
    const currentPage = this.currentPage.get();
    const showPerPage = this.showPerPage.get();
    const filterText = this.filterText.get();
    if (currentPage && showPerPage) {
      this.subscribe('players', false, currentPage, showPerPage, filterText);
    }
  });
});

Template.playersList.helpers({
  players: function players() {
    return Players.find().fetch();
  },
  showPerPage: function showPerPage(position) {
    return Template.instance().showPerPage.get();
  },
  getPageN: function getPageN(position) {
    const currentRangeOfPages = Template.instance().currentRangeOfPages.get();
    return currentRangeOfPages[position - 1];
  },
  isActive: function isActive(position) {
    const currentRangeOfPages = Template.instance().currentRangeOfPages.get();
    const currentPage = Template.instance().currentPage.get();
    const currentPosition = currentRangeOfPages.indexOf(currentPage) + 1;
    if (currentPosition == position) {
      return "active";
    }
    return "";
  },
  playerToDelete: function playerToDelete() {
    const playerVar = Template.instance().playerToDelete.get();
    if (playerVar) {
      const player = playerVar;
      return "Delete '" + player.name + "' (ID = " + player.playerId + ") player.";
    }
  },
});

Template.playersList.events({
  'click #button-delete-confirmed': function deletePlayer(event, templateInstance) {
    event.preventDefault();
    const player = templateInstance.playerToDelete.get();
    templateInstance.playerToDelete.set();
    Meteor.call('deletePlayer', player._id);
    toastr["success"]("'" + player.name + "' (ID = " + player.playerId + ") player has been deleted.");
  },
  'click .glyphicon-trash': function deletePlayer(event, templateInstance) {
    event.preventDefault();
    templateInstance.playerToDelete.set(this);
  },
  'click .pagination .page-number': function goToPage(event, templateInstance) {
    const pageN = event.currentTarget.dataset.page;
    templateInstance.currentPage.set(parseInt(pageN));
  },
  'click .pagination .page-go-back': function goBack(event, templateInstance) {
    const currentPage = templateInstance.currentPage.get();
    if (currentPage == 1) {
      return 0;
    }
    const oldRangeOfPages = templateInstance.currentRangeOfPages.get();
    const position = oldRangeOfPages.indexOf(currentPage);
    let newRangeOfPages = oldRangeOfPages;
    if (position > 0) {
      templateInstance.currentPage.set(currentPage - 1);
    }
    if (position == 0) {
      templateInstance.currentPage.set(currentPage - 1);
      newRangeOfPages.unshift(oldRangeOfPages[0] - 1);
      newRangeOfPages.pop();
    }
    templateInstance.currentRangeOfPages.set(newRangeOfPages);
  },
  'click .pagination .page-go-forward': function goForward(event, templateInstance) {
    const oldRangeOfPages = templateInstance.currentRangeOfPages.get();
    let currentPage = templateInstance.currentPage.get();
    const position = oldRangeOfPages.indexOf(currentPage);
    let newRangeOfPages = oldRangeOfPages;
    if (position < 4) {
      currentPage = currentPage + 1;
    }
    if (position == 4) {
      currentPage = currentPage + 1;
      newRangeOfPages.push(oldRangeOfPages[4] + 1);
      newRangeOfPages.shift();
    }
    templateInstance.currentRangeOfPages.set(newRangeOfPages);
    templateInstance.currentPage.set(currentPage);
  },
  'keyup #player-per-page-input': function (event, templateInstance) {
    const showPerPage = parseInt(event.currentTarget.value);
    if (showPerPage > 0) {
      templateInstance.showPerPage.set(showPerPage);

    }
  },
  'keyup #player-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  },
});
