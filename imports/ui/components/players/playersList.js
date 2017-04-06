// import Tabular from 'meteor/aldeed:tabular';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import '../../../api/players/methods';
import '../../../api/players/collection';
import '../modals/deleteConfirmation';
import '../pagination/paginationPanel';
import './player';
import './playersList.html';

Template.playersList.onCreated(function onCreated() {
  this.currentPage = new ReactiveVar(this.data.options.initialPage);
  const showPerPage = this.data.options.initialShowPerPage;
  this.showPerPage = new ReactiveVar(showPerPage);
  this.filterText = new ReactiveVar();
  this.playerToDelete = new ReactiveVar();
  this.lastPageNumber = new ReactiveVar(1);
  this.autorun(() => {
    const currentPage = this.currentPage.get();
    const showPerPage = this.showPerPage.get();
    const filterText = this.filterText.get();
    if (currentPage && showPerPage) {
      this.subscribe('players', false, currentPage, showPerPage, filterText);
      this.subscribe('countPlayers', currentPage, showPerPage, filterText);
    }
    const playersCount = Counter.get("countPlayers");
    const lastPageNumber = Math.ceil(playersCount / showPerPage);
    this.lastPageNumber.set(lastPageNumber > 0 ? lastPageNumber : 1);
  });
});

Template.playersList.onRendered(function OnRendered() {
});

Template.playersList.helpers({
  players: function players() {
    const playersCurPage = Players.find().fetch();
    const userId = Meteor.userId();
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    const mayEdit = role.editPlayer;
    const mayDelete = role.deletePlayer;
    const options = { enableButtonEditPlayer: mayEdit,
                      enableButtonDeletePlayer: mayDelete};
    playersCurPage.forEach(function(element) {
      element["options"] = options;
    });
    return playersCurPage;
  },
  showPerPage: function showPerPage(position) {
    return Template.instance().showPerPage.get();
  },
  optionsForPagination: function getOptionsForPagination() {
    const initialPage = Template.instance().currentPage.get();
    const lastPageNumber = Template.instance().lastPageNumber.get();
    const options = { initialPage: initialPage,
                      lastPageNumber: lastPageNumber, };
    return { options: options };
  },
  playerToDelete: function playerToDelete() {
    const playerVar = Template.instance().playerToDelete.get();
    if (playerVar) {
      const player = playerVar;
      return "Delete '" + player.name + "' (ID = " + player.playerId + ") player.";
    }
  },
  enableButtonNewPlayer: function enableButtonNewPlayer() {
    const options = this.options;
    const userId = Meteor.userId();
    const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (options.enableButtonNewPlayer && role.createPlayer) {
      return true;
    }
    return false;
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
    const pageN = parseInt(event.currentTarget.dataset.page);
    templateInstance.currentPage.set(pageN);
  },
  'click .pagination .page-go-back': function goBack(event, templateInstance) {
    const currentPage = templateInstance.currentPage.get();
    templateInstance.currentPage.set(currentPage - 1);
  },
  'click .pagination .page-go-forward': function goForward(event, templateInstance) {
    const currentPage = templateInstance.currentPage.get();
    templateInstance.currentPage.set(currentPage + 1);
  },
  'keyup #player-per-page-input': function (event, templateInstance) {
    const showPerPage = parseInt(event.currentTarget.value);
    if (showPerPage > 0) {
      templateInstance.showPerPage.set(showPerPage);
      const playersCount = Counter.get("countPlayers");
      templateInstance.currentPage.set(1);
      templateInstance.lastPageNumber.set(Math.ceil(playersCount / showPerPage));
    }
  },
  'keyup #player-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
    templateInstance.currentPage.set(1);
  },
});
