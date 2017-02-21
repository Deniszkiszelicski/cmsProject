import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import '../../components/logoutbutton';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import './register.html';

Meteor.subscribe('networks');
Session.setDefault("counter",1);
Session.setDefault("counter1",1);

var buffer;

Template.registerNetwork.events({
  'submit .register-form1': function (event) {

    event.preventDefault();




    var sortiment=[];

    // for (var i = 1; i <= Session.get("counter"); i++) {
    //   sortiment.push($('#field' + i).val());
    //   console.log(sortiment);}

    var region =[];

    // for (var i = 1; i <= Session.get("counter1"); i++) {
    //   region.push($('#rfield' + i).val());
    //   console.log(region);
    // };


    Meteor.call('createNetwork', { netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(), sortiment: sortiment, region: region ,data:buffer});
    toastr.success("Data saved","New Network");
    Session.set("counter",1);
    Session.set("counter1",1);


},
'click #b1':function(){
  Session.set("counter",Session.get("counter")+ 1);

},
'click #rb1':function(){
  Session.set("counter1",Session.get("counter1")+1);
},

'change #logo' : function(event,template){
    var file = event.target.files[0]; //assuming 1 file only
    if (!file) return;

    var reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = function e(event){
       buffer = new Uint8Array(reader.result);
      console.log(buffer);
    };


    reader.readAsArrayBuffer(file); //read the file as arraybuffer
}





    });
