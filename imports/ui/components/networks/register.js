import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import '../../components/logoutbutton';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import './register.html';

Meteor.subscribe('networks');
var buffer;
var result;






Template.registerNetwork.events({
  'submit .register-form1': function (event) {

    event.preventDefault();

    var file = $('#logo').get(0).files[0];
    var sortiment=[];
    var region =[];

    Meteor.call('createNetwork', { netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment: sortiment, region: region,data: result });
    toastr.success("Data saved","New Network");
    Session.set("counter",1);
    Session.set("counter1",1);


},
'change #logo' : function(event,template){
    var file = event.target.files[0]; //assuming 1 file only
    if (!file) return;

    var reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = function e(event){
       result = reader.result;
       buffer = new Uint8Array(result);
      console.log(buffer);
    };


    reader.readAsDataURL(file); //read the file as arraybuffer

},

    });
