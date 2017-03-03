import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';



Meteor.methods({
  createNetwork: function(networksObject,buffer,bufferH){
   Networks.insert({ netName: networksObject.netName,
                      netId: networksObject.netId,
                      privatContent: networksObject.privatContent,
                      dmxLight: networksObject.dmxLight,
                      logUpdateTime: networksObject.logUpdateTime,
                      sortiment: networksObject.sortiment,
                    region: networksObject.region,
                    logo: networksObject.logo,
                    news: networksObject.news,
                    footer1: networksObject.footer1,
                    footer2: networksObject.footer2,
                    footer3: networksObject.footer3,
                    footer4: networksObject.footer4,
                    headline: networksObject.headline,
                    homeImage: networksObject.image});


  },
  deleteNetwork: function(id) {
    Networks.remove(id);
    toastr.success("Deleted", "Network");
  },

  editSelectedNetwork: function(networksObject,buffer){
    Networks.update({_id:networksObject._id},{$set:{
                        netName: networksObject.netName,
                        netId: networksObject.netId,
                        privatContent: networksObject.privatContent,
                        dmxLight: networksObject.dmxLight,
                        logUpdateTime: networksObject.logUpdateTime,
                        sortiment: networksObject.sortiment,
                       region: networksObject.region,
                       logo: networksObject.logo

    }});

  },
  editSortiment: function(networksObject){
    Networks.update({_id:networksObject._id},{$set: { sortiment: networksObject.sortiment, region: networksObject.region
    }});

  },
  editRegion: function(networksObject){
    Networks.update({_id:networksObject._id},{$set: { sortiment: networksObject.sortiment, region: networksObject.region
    }});

  },
  deleteOneRegion: function(id,region){
Networks.update({_id:id},{$pull:{region:region}});


  },
  deleteOneSortiment: function(id,sortiment){
Networks.update({_id:id},{$pull:{sortiment:sortiment}});
 },
  homeSubmitEdit: function(networksObject){
    Networks.update({_id:networksObject._id},{$set: {
      news:networksObject.news,
      headline:networksObject.headline,
      homeImage:networksObject.image,
      footer1:networksObject.footer1,
      footer2:networksObject.footer2,
      footer3:networksObject.footer3,
      footer4:networksObject.footer4,
    } });
  }


});
