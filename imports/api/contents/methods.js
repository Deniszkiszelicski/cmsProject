import { Meteor } from 'meteor/meteor';

Meteor.methods({
  //  TODO: Add check for fields
  // upsertContent: function (content) {
  //   Contents.update({ _id: content._id },
  //     content,
  //       { upsert: true, multi: false });
  // },
  upsertContent: function (content) {
    if (!!content._id ) {
      let newValues = {
                        name: content.name,
                        duration: content.duration,
                        type: content.type,
                        mixInTicker: content.mixInTicker,
                        collectStatisticts: content.collectStatisticts,
                        visibleForAll: content.visibleForAll,
                        category: content.category,
                        startDate: content.startDate,
                        finishDate: content.finishDate,
                        monday: content.monday,
                        tuesday: content.tuesday,
                        wednesday: content.wednesday,
                        thursday: content.thursday,
                        friday: content.friday,
                        saturday: content.saturday,
                        sunday: content.sunday,
                        playTimeHoursStart: content.playTimeHoursStart,
                        playTimeHoursFinish: content.playTimeHoursFinish,
                        deleteAfterFinish: content.deleteAfterFinish,
                        assortiment: content.assortiment,
                        regions: content.regions,
                        mediaId: content.mediaId,
                        conjunction: content.conjunction,
                      };
      if (content.type == "m") {
        newValues['mediaId'] = content.mediaId;
      } else {
        newValues['template'] = content.template;
      }
      Contents.update({ _id: content._id },
        { $set: newValues });
    } else {
      let newValues = {
                          name: content.name,
                          duration: content.duration,
                          type: content.type,
                          mixInTicker: content.mixInTicker,
                          collectStatisticts: content.collectStatisticts,
                          visibleForAll: content.visibleForAll,
                          category: content.category,
                          startDate: content.startDate,
                          finishDate: content.finishDate,
                          monday: content.monday,
                          tuesday: content.tuesday,
                          wednesday: content.wednesday,
                          thursday: content.thursday,
                          friday: content.friday,
                          saturday: content.saturday,
                          sunday: content.sunday,
                          playTimeHoursStart: content.playTimeHoursStart,
                          playTimeHoursFinish: content.playTimeHoursFinish,
                          deleteAfterFinish: content.deleteAfterFinish,
                          assortiment: content.assortiment,
                          regions: content.regions,
                          conjunction: content.conjunction,
                        };
      if (content.type == "m") {
        newValues['mediaId'] = content.mediaId;
      } else {
        newValues['template'] = content.template;
      }
      Contents.insert( newValues );
    }
  },
  deleteContent: function(id) {
    Contents.remove(id);
  },
});
