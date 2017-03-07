import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import '../components/logoutbutton';
import '../../api/admin_networks/methods';
import '../../api/admin_networks/networks';
import './homeAdminPage.html';

Meteor.subscribe('networks');

Template.homeAdminPage.helpers({
  homePageData: () => {
    return Networks.findOne({_id:Session.get("currentNetworkId")});

  },


});


var buffer;
var result;


Template.homeAdminPage.events({

  'submit .submitEditHome': function homeSubmit(event) {
    event.preventDefault();



    Meteor.call('homeSubmitEdit',{_id:Session.get("currentNetworkId"),headline:$('#headline').val(),headline2:$('#headline2').val(),headline3:$('#headline3').val(),news:$('#ql-editor-2').val(),image:result,
    footer1:$('#footer1').val(),footer2:$('#footer2').val(),footer3:$('#footer3').val(),footer4:$('#footer4').val()});
    toastr.success("Data saved","Edit Home Page");
      FlowRouter.go('/');
  },
  'change #homeImage' : function(event,template){
      var file = event.target.files[0]; //assuming 1 file only
      if (!file) return;

      var reader = new FileReader(); //create a reader according to HTML5 File API

      reader.onload = function e(event){
         result = reader.result;
         buffer = new Uint8Array(result);


      };


      reader.readAsDataURL(file); //read the file as arraybuffer

  },

});
