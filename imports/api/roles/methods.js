import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';




Meteor.methods({
  createRole: function(rolesObject){
    // check(userInformationObject.name, String);
    // check(userInformationObject.accountRole, String);
    // check(userInformationObject.email, String);
    console.log('befor inserting', rolesObject);
  //  Roles.insert({netName:rolesObject.netName,netId:rolesObject.netId, admin:rolesObject.admin});
   Roles.insert({netName: rolesObject.netName, netId: rolesObject.netId, roleName: rolesObject.roleName, createdNet: rolesObject.createdNet, createPlayer: rolesObject.createPlayer, editPlayer: rolesObject.editPlayer, deletePlayer: rolesObject.deletePlayer, addVideoPic: rolesObject.addVideoPic, editVideoPic: rolesObject.editVideoPic, deleteVideoPic: rolesObject.deleteVideoPic});
   
    console.log("ubaceno");
  },
});
