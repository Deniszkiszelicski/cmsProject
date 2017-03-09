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



    Meteor.call('homeSubmitEdit',{_id:Session.get("currentNetworkId"),headline:$('#headline').val(),headline2:$('#headline2').val(),
    headline3:$('#headline3').val(),headline4:$('#headline4').val(),headline5:$('#headline5').val(),headline6:$('#headline6').val(),
    headline7:$('#headline7').val(),headline8:$('#headline8').val(),headline9:$('#headline9').val(),headline10:$('#headline10').val(),
    news1active:$('#news1active').is(":checked"),news2active:$('#news2active').is(":checked"),news3active:$('#news3active').is(":checked"),
    news4active:$('#news4active').is(":checked"),news5active:$('#news5active').is(":checked"),news6active:$('#news6active').is(":checked"),
    news7active:$('#news7active').is(":checked"),news8active:$('#news8active').is(":checked"),news9active:$('#news9active').is(":checked"),
    news10active:$('#news10active').is(":checked"),news:$('#ql-editor-2').val(),news2:$('#ql-editor-3').val(),news3:$('#ql-editor-4').val(),
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

      Meteor.call('homeUpdateImage',{_id:Session.get("currentNetworkId"),image:result});

  },
  'click #uploadHomePic' : function uploadHomePic(event){
    event.preventDefault();
      Meteor.call('homeUpdateImage',{_id:Session.get("currentNetworkId"),image:result});
  },

});
