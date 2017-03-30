// import Tabular from 'meteor/aldeed:tabular';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import '../../../api/players/methods';
import '../../../api/players/collection';
import '../modals/deleteConfirmation';
import './player';
import './playersList.html';

Meteor.subscribe('countPlayers');

Template.playersList.onCreated(function onCreated() {
  this.currentPage = new ReactiveVar(this.data.options.initialPage);
  const showPerPage = this.data.options.initialShowPerPage;
  this.showPerPage = new ReactiveVar(showPerPage);
  this.currentRangeOfPages = new ReactiveVar(this.data.options.initialRangeOfPages);
  this.filterText = new ReactiveVar();
  this.playersReceived = new ReactiveVar();
  this.playerToDelete = new ReactiveVar();
  this.autorun(() => {
    const currentPage = this.currentPage.get();
    const showPerPage = this.showPerPage.get();
    const filterText = this.filterText.get();
    if (currentPage && showPerPage) {
      this.subscribe('players', false, currentPage, showPerPage, filterText);
    }
  });
  const playersCount = Counter.get("countPlayers");
  console.log("showPerPageV = ", showPerPage);
  this.lastPageNumber = new ReactiveVar(Math.ceil(playersCount / showPerPage));
});

Template.playersList.onRendered(function OnRendered() {

});

Template.playersList.helpers({
  players: function players() {
    const playersCurPage = Players.find().fetch();
    Template.instance().playersReceived.set(playersCurPage.length);
    const showPerPage = Template.instance().showPerPage.get();
    // const buttons = $('.pagination > li');
    // $.each(buttons, function( index, value ) {
    //   $(value).removeClass("link-disabled");
    // });
    // if (showPerPage > playersCurPage.length) {

    //   $.each(buttonsToDisable, function( index, value ) {
    //     $(value).addClass("link-disabled");
    //   });
    // }
    return playersCurPage;
  },
  showPerPage: function showPerPage(position) {
    return Template.instance().showPerPage.get();
  },
  showButton: function showButton(position) {
    const lastPageNumber = Template.instance().lastPageNumber.get();
    const currentPage = Template.instance().currentPage.get();
    const rangeOfPages = Template.instance().currentRangeOfPages.get();
    if (position == 0 && lastPageNumber != 1 && currentPage != 1) {
      return true;
    }
    if (position == 8 && lastPageNumber != 1 && lastPageNumber != currentPage) {
      return true;
    }
    if (position == 1 && lastPageNumber != 1) {
      return true;
    }
    if (position == 2 && 1 < lastPageNumber) {
      return true;
    }
    if (position == 3 && 2 < lastPageNumber) {
      return true;
    }
    if (position == 4 && 3 < lastPageNumber) {
      return true;
    }
    if (position == 5 && 4 < lastPageNumber) {
      return true;
    }
    if (position == 6 && lastPageNumber > 5 && (lastPageNumber - rangeOfPages[2] == 2 || 3 <= rangeOfPages[0] && !(rangeOfPages[2] == lastPageNumber))) {
      return true;
    }
    if (position == 7 && (lastPageNumber > 6 && 2 <= rangeOfPages[0]) && lastPageNumber != rangeOfPages[2] + 1 && !(rangeOfPages[2] == lastPageNumber)) {
      return true;
    }
    // console.log("currentPage = ", currentPage);
    return false;
  },
  textForButton: function showPerPage(position) {
    const lastPageNumber = Template.instance().lastPageNumber.get();
    const currentPage = Template.instance().currentPage.get();
    const currentRangeOfPages = Template.instance().currentRangeOfPages.get();
    if (position == 1) {
      return 1;
    }
    if (position == 2) {
      console.log("position = ", position);
      console.log("currentPage = ", currentPage);
      const a = currentRangeOfPages[0] > 3;
      if (currentRangeOfPages[0] > 3) {
        return "...";
      } else {
        return 2;
      }
    }
    if (position == 3) {
      console.log("position = ", position);
      console.log("currentPage = ", currentPage);

      // if (const position = oldRangeOfPages.indexOf(currentPage)) {
      if (currentRangeOfPages[0] >= 4) {
        return currentRangeOfPages[0];
      } else {
        return 3;
      }
    }
    if (position == 4) {
      if (currentRangeOfPages[0] >= 3) {
        return currentRangeOfPages[1];
      }
      if (currentRangeOfPages[1] == 3) {
        return 4;
      }
      if (lastPageNumber - currentRangeOfPages[2] <= 2) {
        return 4;
      }
      return "...";

    }
    if (position == 5) {
      if (currentRangeOfPages[2] == lastPageNumber) {
        return currentRangeOfPages[2];
      }
      if (currentRangeOfPages[1] >= 4) {
        return currentRangeOfPages[2];
      }
      if (currentRangeOfPages[0] < 2 || lastPageNumber - currentRangeOfPages[2] <= 1 ) {
        return lastPageNumber;
      }
      if (lastPageNumber - currentRangeOfPages[2] == 2) {
        return lastPageNumber - 1;
      }
      return "..."

    }
    if (position == 6) {
      if (currentRangeOfPages[2] + 2 == lastPageNumber && currentRangeOfPages[2] <= 4) {
        // return currentRangeOfPages[2] + 1;
        return lastPageNumber;
      }
      if (currentRangeOfPages[2] + 2 == lastPageNumber && currentRangeOfPages[2] > 4) {
        return currentRangeOfPages[2] + 1;
        // return lastPageNumber;
      }
      // console.log("for pos 6 lastPageNumber != rangeOfPages[2] + 1", lastPageNumber != currentRangeOfPages[2] + 1);
      if (lastPageNumber == currentRangeOfPages[2] + 1) {
        return lastPageNumber;
      } else {
        return "...";
      }
    }
    if (position == 7) {
      // console.log("************ lastPageNumber = ", lastPageNumber);
      return lastPageNumber;
    }
    return "n";
  },
  getPageN: function getPageN(position) {
    const currentRangeOfPages = Template.instance().currentRangeOfPages.get();
    const pageNumber = currentRangeOfPages[position - 1];
    return pageNumber;
  },
  isActive: function isActive(position) {
    const currentRangeOfPages = Template.instance().currentRangeOfPages.get();
    const currentPage = Template.instance().currentPage.get();
    const lastPageNumber = Template.instance().lastPageNumber.get();
    const currentPosition = currentRangeOfPages.indexOf(currentPage) + 1;
    // console.log("isActive ", position);
    console.log("isActive currentRangeOfPages", currentRangeOfPages);
    console.log("isActive currentPage", currentPage);
    // console.log("isActive currentPosition", currentPosition);
    if (position == 1 && currentPage == 1) {
      return "active";
    }
    if (position == 2 && currentPage == 2) {
      return "active";
    }
    if (position == 3 && (currentPage == 3 || (currentPage == currentRangeOfPages[0] && currentPage != 1))) {
      return "active";
    }
    if (position == 4 && (4 <= currentRangeOfPages[1] && currentRangeOfPages[1] < lastPageNumber && currentPage != currentRangeOfPages[2])) {
      return "active";
    }
    if (position == 5 && currentRangeOfPages[2] == currentPage) {
      return "active";
    }
    if (position == 6 && currentRangeOfPages[2] == currentPage) {
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
    // $('.pagination > li:nth-child(4) > a').attr('disabled', true);
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
    let lastPageNumber = templateInstance.lastPageNumber.get();
    if (currentPage < 2 || lastPageNumber == oldRangeOfPages[2]) {
      currentPage = currentPage + 1;
    } else {
      currentPage = currentPage + 1;
      newRangeOfPages.push(oldRangeOfPages[2] + 1);
      newRangeOfPages.shift();
    }
    templateInstance.currentRangeOfPages.set(newRangeOfPages);
    templateInstance.currentPage.set(currentPage);
    console.log("page-go-forward newRangeOfPages", newRangeOfPages);
    console.log("page-go-forward currentPage", currentPage);
  },
  'keyup #player-per-page-input': function (event, templateInstance) {
    const showPerPage = parseInt(event.currentTarget.value);
    if (showPerPage > 0) {
      templateInstance.showPerPage.set(showPerPage);
      const playersCount = Counter.get("countPlayers");
      templateInstance.lastPageNumber.set(Math.ceil(playersCount / showPerPage));
    }
  },
  'keyup #player-filter-input': function (event, templateInstance) {
    templateInstance.filterText.set(event.currentTarget.value);
  },
});
