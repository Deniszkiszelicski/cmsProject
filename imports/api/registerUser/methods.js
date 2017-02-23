
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';




Meteor.methods({
  // createRoleData: function(userInformationObject){
  //   // check(userInformationObject.name, String);
  //   // check(userInformationObject.accountRole, String);
  //   // check(userInformationObject.email, String);
  //   console.log('before inserting', userInformationObject);
  //  UserInformation.insert({name:userInformationObject.name,role:userInformationObject.role,email:userInformationObject.email,
  //    netName:userInformationObject.netName,lastName:userInformationObject.lastName,
  //    assignedPlayers:userInformationObject.assignedPlayers,userconId:userInformationObject.userconId});
  //
  // },
  deleteUser: function(id) {
    UserInformation.remove(id);

    toastr.success("Deleted", "User");
  },
  editRoleData: function(userInformationObject){
    console.log('before inserting', userInformationObject);
   UserInformation.update({_id:userInformationObject._id},{name:userInformationObject.name,role:userInformationObject.role,email:userInformationObject.email,
     netName:userInformationObject.netName,lastName:userInformationObject.lastName,
     assignedPlayers:userInformationObject.assignedPlayers});



  },
});
