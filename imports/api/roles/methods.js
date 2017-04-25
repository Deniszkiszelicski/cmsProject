import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  createRole: function(rolesObject){
    // check(userInformationObject.name, String);
    // check(userInformationObject.accountRole, String);
    // check(userInformationObject.email, String);
  //  Roles.insert({netName:rolesObject.netName,netId:rolesObject.netId, admin:rolesObject.admin});
   Roles.insert({roleName: rolesObject.roleName,
     networkId: rolesObject.networkId,
     createPlayer: rolesObject.createPlayer,
     editPlayer: rolesObject.editPlayer,
     deletePlayer: rolesObject.deletePlayer,
     createVideoImg: rolesObject.createVideoImg,
     editVideoImg: rolesObject.editVideoImg,
     deleteVideoImg: rolesObject.deleteVideoImg,
     createContent: rolesObject.createContent,
     editContent: rolesObject.editContent,
     deleteContent: rolesObject.deleteContent,
     createContentGrp: rolesObject.createContentGrp,
     //  grantContentGrpAccess: rolesObject.grantContentGrpAccess,
     editContentGrp: rolesObject.grantContentGrpAccess,
     deleteContentGrp: rolesObject.deleteContentGrp,
     createPlaylist: rolesObject.createPlaylist,
     editPlaylist: rolesObject.editPlaylist,
     deletePlaylist: rolesObject.deletePlaylist,
     adminMenu: rolesObject.adminMenu,
     netzMenu: rolesObject.netzMenu,
     userMenu: rolesObject.userMenu,
     roleMenu: rolesObject.roleMenu,
     contentMenu: rolesObject.contentMenu,
     statisticMenu: rolesObject.statisticMenu,
     homeEditMenu: rolesObject.homeEditMenu,
     seeMedia: rolesObject.seeMedia,
     seeContent: rolesObject.seeContent,
     seeAllContentGroups: rolesObject.seeAllContentGroups,
     seeAllPlayers: rolesObject.seeAllPlayers });
  },
  deleteRole: function(id) {
    Roles.remove(id);
    toastr.success("Deleted", "Role");
  },
  editSelectedRole: function(rolesObject){
  Roles.update({_id:rolesObject._id},{roleName: rolesObject.roleName,
    networkId: rolesObject.networkId,
    createPlayer: rolesObject.createPlayer,
    editPlayer: rolesObject.editPlayer,
    deletePlayer: rolesObject.deletePlayer,
    createVideoImg: rolesObject.createVideoImg,
    editVideoImg: rolesObject.editVideoImg,
    deleteVideoImg: rolesObject.deleteVideoImg,
    createContent: rolesObject.createContent,
    editContent: rolesObject.editContent,
    deleteContent: rolesObject.deleteContent,
    createContentGrp: rolesObject.createContentGrp,
    //  grantContentGrpAccess: rolesObject.grantContentGrpAccess,
    editContentGrp: rolesObject.grantContentGrpAccess,
    deleteContentGrp: rolesObject.deleteContentGrp,
    createPlaylist: rolesObject.createPlaylist,
    editPlaylist: rolesObject.editPlaylist,
    deletePlaylist: rolesObject.deletePlaylist,
    adminMenu: rolesObject.adminMenu,
    netzMenu: rolesObject.netzMenu,
    userMenu: rolesObject.userMenu,
    roleMenu: rolesObject.roleMenu,
    contentMenu: rolesObject.contentMenu,
    homeEditMenu: rolesObject.homeEditMenu,
    statisticMenu: rolesObject.statisticMenu,
    seeMedia: rolesObject.seeMedia,
    seeContent: rolesObject.seeContent,
    seeAllContentGroups: rolesObject.seeAllContentGroups,
    seeAllPlayers: rolesObject.seeAllPlayers,
    });
  },
});
