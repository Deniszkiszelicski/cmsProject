import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { quilljs } from 'meteor/themeteorites:quilljs';
import '../components/logoutbutton';
import '../../api/admin_networks/methods';
import '../../api/admin_networks/networks';
import './homeAdminPage.html';

var buffer;
var result;

Template.homeAdminPage.onRendered(function(){

  var fullEditor;
  fullEditor = new Quill('#full-editor', {
    modules: {
      // 'authorship': {
      //   authorId: 'test', //Meteor.user().profile.user_name,
      //   enabled: true
      // },
      'multi-cursor': true,
      'toolbar': {
        container: '#full-toolbar'
      },
      'link-tooltip': true
    },
    theme: 'snow'
  });
  return fullEditor;
});

Template.homeAdminPage.events({
  'click #homeSubmit': function homeSubmit(event) {
    event.preventDefault();



    Meteor.call('homeSubmitEdit',{_id:'zk2aHifEg9yWYH5zF',headline:$('#headline').val(),news:$('.authorship').html(),image:result});
    toastr.success("Data saved","Edit Home Page");

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
