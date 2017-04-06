import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import '../components/logoutbutton';
import '../components/admin_docs/newDocForm';
import './admin_docs.html';

Meteor.subscribe('adminDocumentation');

Template.adminDocs.onCreated(function onCreated() {
  this.isCreateNew = new ReactiveVar(false);
});

Template.adminDocs.helpers({
  isCreateNew: function isCreateNew() {
    return Template.instance().isCreateNew.get();
  },
  documents: () => {
    return AdminDocumentation.find().fetch();
  },
  docInfo: () => {
    return AdminDocumentation.findOne({_id: Session.get("selectedDoc")});
  },
});
Template.adminDocs.events({
  'click #newDoc': function createNewContent(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(true);
  },
  'click #saveDoc': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
  'click #closeCreateDoc': function closeForm(event, templateInstance) {
    event.preventDefault();
    templateInstance.isCreateNew.set(false);
  },
  'click #selectDel': function selectDoc(event) {

    event.preventDefault();
    Session.set('selectedDoc', this._id);
  },
  'click #deleteDoc': function deleteDoc(event){
    event.preventDefault();
    Meteor.call('deleteDoc',{_id:Session.get("selectedDoc")});
  },
  'click #selectInfo': function showRoleInfo(event){
    event.preventDefault();
    Session.set('selectedDoc', this._id);
  },
  'click #editDoc': function editItem(event) {
      event.preventDefault();
      Session.set('selectedDoc', this._id);

  },
  'click #saveEditDoc': function saveEdit(event){
    event.preventDefault();
    Meteor.call('editDoc',{_id:Session.get("selectedDoc"),
                          docContent: $('#editDocContent').val(),
                          docName: $('#editDocName').val()});
    toastr.success("Document saved","Edit Document");

  }
});
