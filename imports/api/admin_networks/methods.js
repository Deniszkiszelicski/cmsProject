import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';



Meteor.methods({
  createNetwork: function(networksObject){
    // check(userInformationObject.name, String);
    // check(userInformationObject.accountRole, String);
    // check(userInformationObject.email, String);
console.log("usao u metodu");
  //  Roles.insert({netName:rolesObject.netName,netId:rolesObject.netId, admin:rolesObject.admin});
   Networks.insert({ netName: networksObject.netName,
                      netId: networksObject.netId,
                      privatContent: networksObject.privatContent,
                      dmxLight: networksObject.dmxLight,
                      logUpdateTime: networksObject.logUpdateTime });

    console.log(networksObject);
  },
});
