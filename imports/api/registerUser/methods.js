
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';




Meteor.methods({
  createRoleData: function(userInformationObject){
    // check(userInformationObject.name, String);
    // check(userInformationObject.accountRole, String);
    // check(userInformationObject.email, String);
    console.log('befor inserting', userInformationObject);
   UserInformation.insert({name:userInformationObject.firstname,role:userInformationObject.accountRole,email:userInformationObject.email});
    console.log("ubaceno");
  },
});
