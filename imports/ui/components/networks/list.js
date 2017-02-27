import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './list.html';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import '../../components/networks/editNetwork';

Meteor.subscribe('networks');

Template.networksList.onCreated(function onCreated() {
  this.isEdit = new ReactiveVar(false);
});

Template.networksList.helpers({
  networks: () => {
    return Networks.find().fetch();
  },
  isEdit: function isEdit() {
    return Template.instance().isEdit.get();
  },

});

Template.networksList.events({




  'click #deleteNlist': function deleteNetwork(event) {

    event.preventDefault();
    Meteor.call('deleteNetwork',{_id:Session.get('selectedNetwork')});


},


    'click #editNList':
      function editItem(event, templateInstance) {
        event.preventDefault();

        templateInstance.isEdit.set(true);

        Session.set('selectedNetwork', this._id);

    },
    'click #editSubmit': function closeEditForm(event, templateInstance){
      templateInstance.isEdit.set(false);
    },
    'click #closeEditList':function closeEditList(event,templateInstance){
      templateInstance.isEdit.set(false);
    },
    'click #selectDel': function selectNetToDelete(event){
      event.preventDefault();
      Session.set('selectedNetwork', this._id);
    }





});
