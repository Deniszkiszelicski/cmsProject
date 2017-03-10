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
                    news2: networksObject.news2,
                    news3: networksObject.news3,
                    footer1: networksObject.footer1,
                    headline: networksObject.headline,
                    headline2:networksObject.headline2,
                    headline3:networksObject.headline3,
                    headline4:networksObject.headline4,
                    headline5:networksObject.headline5,
                    headline6:networksObject.headline6,
                    headline7:networksObject.headline7,
                    headline8:networksObject.headline8,
                    headline9:networksObject.headline9,
                    headline10:networksObject.headline10,
                    news1active:networksObject.news1active,
                    news2active:networksObject.news2active,
                    news3active:networksObject.news3active,
                    news4active:networksObject.news4active,
                    news5active:networksObject.news5active,
                    news6active:networksObject.news6active,
                    news7active:networksObject.news7active,
                    news8active:networksObject.news8active,
                    news9active:networksObject.news9active,
                    news10active:networksObject.news10active,
                    homeImage: networksObject.image,
                  main1link:networksObject.main1link,
                  main2link:networksObject.main2link,
                  main3link:networksObject.main3link,
                });


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
      news2: networksObject.news2,
      news3: networksObject.news3,
      headline:networksObject.headline,
      headline2:networksObject.headline2,
      headline3:networksObject.headline3,
      headline4:networksObject.headline4,
      headline5:networksObject.headline5,
      headline6:networksObject.headline6,
      headline7:networksObject.headline7,
      headline8:networksObject.headline8,
      headline9:networksObject.headline9,
      headline10:networksObject.headline10,
      news1active:networksObject.news1active,
      news2active:networksObject.news2active,
      news3active:networksObject.news3active,
      news4active:networksObject.news4active,
      news5active:networksObject.news5active,
      news6active:networksObject.news6active,
      news7active:networksObject.news7active,
      news8active:networksObject.news8active,
      news9active:networksObject.news9active,
      news10active:networksObject.news10active,
      footer1:networksObject.footer1,
      main1link:networksObject.main1link,
      main2link:networksObject.main2link,
      main3link:networksObject.main3link,
    } });
  },
  homeUpdateImage: function(networksObject){
    Networks.update({_id:networksObject._id},{$set: {
      homeImage:networksObject.image
  }  });
},
  createLink1: function(networksObject){
    Networks.update({_id:networksObject._id},{$set: {
      main1link:networksObject.main1link

    }});
  },
  createLink2: function(networksObject){
    Networks.update({_id:networksObject._id},{$set: {
      main2link:networksObject.main2link

    }});
  },
  createLink3: function(networksObject){
    Networks.update({_id:networksObject._id},{$set: {
      main3link:networksObject.main3link

    }});
  },


});
