import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import '../../components/logoutbutton';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import './register.html';

Meteor.subscribe('networks');



Template.registerNetwork.events({
  'submit .register-form1': function (event) {

    event.preventDefault();


let testObj = { netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val() };
console.log(testObj);
console.log(event.currentTarget);


    Meteor.call('createNetwork', { netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val() });
    toastr.success("Data saved","New Network");

}

    });
