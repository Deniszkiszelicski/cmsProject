import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';



Meteor.methods({
  createNetwork: function(networksObject,buffer){
   Networks.insert({ netName: networksObject.netName,
                      netId: networksObject.netId,
                      privatContent: networksObject.privatContent,
                      dmxLight: networksObject.dmxLight,
                      logUpdateTime: networksObject.logUpdateTime,
                      sortiment:networksObject.sortiment,
                    region:networksObject.region,data:networksObject.data});
                      console.log(networksObject);

  },
  deleteNetwork: function(id) {
    Networks.remove(id);
    toastr.success("Deleted", "Network");
  },

  editSelectedNetwork: function(networksObject,buffer){
    Networks.update({_id:networksObject._id},{
                        netName:networksObject.netName,
                        netId: networksObject.netId,
                        privatContent: networksObject.privatContent,
                        dmxLight: networksObject.dmxLight,
                        logUpdateTime: networksObject.logUpdateTime,
                        sortiment:networksObject.sortiment,
                       region:networksObject.region,data:networksObject.data

    });
  },
  deleteOneRegion: function(id,region){
Networks.update({_id:id},{$pull:{region:region}});


  },
  deleteOneSortiment: function(id,sortiment){
Networks.update({_id:id},{$pull:{sortiment:sortiment}});
 },
 // 'saveFile': function(buffer){
 //         Networks.insert({data:buffer})
 //     }


});
