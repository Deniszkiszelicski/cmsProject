import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';



Meteor.methods({
  createNetwork: function(networksObject){
    // check(userInformationObject.name, String);
    // check(userInformationObject.accountRole, String);
    // check(userInformationObject.email, String);

  //  Roles.insert({netName:rolesObject.netName,netId:rolesObject.netId, admin:rolesObject.admin});
   Networks.insert({ netName: networksObject.netName,
                      netId: networksObject.netId,
                      privatContent: networksObject.privatContent,
                      dmxLight: networksObject.dmxLight,
                      logUpdateTime: networksObject.logUpdateTime,
                      sortiment:networksObject.sortiment,
                    region:networksObject.region });
                      console.log(networksObject);

  },
  deleteNetwork: function(id) {
    Networks.remove(id);
    toastr.success("Deleted", "Network");
  },

  editSelectedNetwork: function(networksObject){
    Networks.update({_id:networksObject._id},{
                        netName:networksObject.netName,
                        netId: networksObject.netId,
                        privatContent: networksObject.privatContent,
                        dmxLight: networksObject.dmxLight,
                        logUpdateTime: networksObject.logUpdateTime,
                        sortiment:networksObject.sortiment,
                       region:networksObject.region

    });
  },
  deleteOneRegion: function(id,region){
Networks.update({_id:id},{$pull:{region:region}});


  },
  deleteOneSortiment: function(id,sortiment){
Networks.update({_id:id},{$pull:{sortiment:sortiment}});
 },

});
