import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import '../../../api/admin_docs/methods';
import '../../../api/admin_docs/admin_docs';
import './newDocForm.html';

Meteor.subscribe('adminDocumentation');

Template.newDocForm.onCreated(function(){

});

Template.newDocForm.events({

  'click #saveDoc' : function(event){
    event.preventDefault();
    Meteor.call('createDocument',{
      docContent: $('#docText').val(),
      docName: $('#docName').val()
    });
    toastr.success("Document Saved","New Document");
  }

});
