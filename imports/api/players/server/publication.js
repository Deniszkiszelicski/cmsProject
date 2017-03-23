import { Meteor } from 'meteor/meteor';
// import { Builder } from 'xmlbuilder';

Meteor.publish('players', function(playlistUserForm, currentPage, showPerPage, filterText) {
  if(currentPage && showPerPage) {
    const skip = (currentPage - 1) * showPerPage;
    if (filterText) {
      return Players.find({ playerId: { $regex: new RegExp(filterText), $options: 'i' } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
    } else {
      return Players.find({}, { sort: { name: 1 }, skip: skip, limit: showPerPage});
    }
  }
  if(playlistUserForm) {
    return Players.find({});
  }
});

let Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

function Entry() {
}
Entry.prototype.makeTag = function (tag, value){
  return "<" + tag + ">" + value + "</" + tag + ">\n";
}
Entry.prototype.addTag = function (tag, value){
  this[tag] = value;
}
Entry.prototype.addPeriodTags = function (startDate, finishDate, monday, tuesday,
                                          wednesday, thursday, friday, saturday,
                                          sunday, playTimeHoursStart, playTimeHoursFinish) {


  if (startDate) {
    let result = "\n  <start>";
    result += startDate;
    result += " 00:00:00</start>\n  <end>";
    result += finishDate;
    result += " 00:00:00</end>\n";
    this.period = result;
  }
  if (monday || tuesday || wednesday || thursday || friday || saturday || sunday) {
    let result2 = "\n  <startdate>";
    if (startDate) {
      result2 += startDate;
    }
    result2 += "</startdate>\n  <enddate>";
    if (finishDate) {
      result2 += finishDate;
    }
    result2 += "</enddate>\n  <monday>";
    if (monday) {
      result2 += (playTimeHoursStart + "-" + playTimeHoursFinish);
    }
    result2 += "</monday>\n  <tuesday>";
    if (tuesday) {
      result2 += (playTimeHoursStart + "-" + playTimeHoursFinish);
    }
    result2 += "</tuesday>\n  <wednesday>";
    if (wednesday) {
      result2 += (playTimeHoursStart + "-" + playTimeHoursFinish);
    }
    result2 += "</wednesday>\n  <thursday>";
    if (thursday) {
      result2 += (playTimeHoursStart + "-" + playTimeHoursFinish);
    }
    result2 += "</thursday>\n  <friday>";
    if (friday) {
      result2 += (playTimeHoursStart + "-" + playTimeHoursFinish);
    }
    result2 += "</friday>\n  <saturday>";
    if (saturday) {
      result2 += (playTimeHoursStart + "-" + playTimeHoursFinish);
    }
    result2 += "</saturday>\n  <sunday>";
    if (sunday) {
      result2 += (playTimeHoursStart + "-" + playTimeHoursFinish);
    }
    result2 += "</sunday>\n";
    this.period2 = result2;
  }
}
Entry.prototype.assembleEntry = function (){
  const tags = Object.keys(this).sort();
  let result = "<entry>\n";
  const l = tags.length;
  for (let i = 0; i < l; i++) {
    result += this.makeTag(tags[i], this[tags[i]]);
  }
  result += "</entry>\n\n"
  return result;
}

Api.addRoute('getPlaylistForPlayer', {authRequired: false}, {
    get: function () {
      const playerId = this.queryParams.id;
      if (playerId) {
        const player = Players.findOne({ playerId: playerId} );
        if (player) {
          let testEntry = new Entry();
          let responseXML = "";
          testEntry.addTag("playerName", player.name);
          testEntry.addTag("playerId", player.playerId);
          const playlistId = player.playlistId;
          if (playlistId) {
            const playlist = Playlists.findOne({ _id: playlistId });
            responseXML += "<" + '\\?xml version="1.0" encoding="utf-8" ?>\n'.slice(1, 41);
            responseXML += "<playlist>\n<scroller>\n<text><![CDATA[";
            responseXML += playlist.tickerText;
            responseXML += " ]]></text>\n<hidescroller>0</hidescroller>\n</scroller>\n";
            testEntry.addTag("playlistName", playlist.name);
            const contentGroupIds = playlist.contentGroupIds;
            const contentGroupIdsLength = contentGroupIds.length;
            if (contentGroupIdsLength > 0) {
              const contentGroupObjects = ContentGroups.find({ _id: { $in: contentGroupIds } }, { limit: contentGroupIdsLength }).fetch();
              for (let i = 0; i < contentGroupObjects.length; i++) {
                const contentIds = contentGroupObjects[i].contentIds;
                const contentIdsLength = contentIds.length;
                if (contentIdsLength > 0) {
                  for (let i = 0; i < contentIds.length; i++) {
                    const content = Contents.findOne({ _id: contentIds[i] });
                    if (content.type == "m") {
                      testEntry.addTag("contentName", content.name);
                      testEntry.addTag("hidescroller", content.mixInTicker ? 0 : 1);
                      testEntry.addTag("duration", content.duration);
                      testEntry.addTag("key", "");
                      testEntry.addTag("volume", "0");
                      const media = Medien.findOne({ _id: content.mediaId });
                      if (media) {
                        if (media.type == "image") {
                          testEntry.addTag("type", 1);
                        } else {
                          testEntry.addTag("type", 0);
                        }
                      }
                      testEntry.addPeriodTags(content.startDate, content.finishDate, content.monday,
                                              content.tuesday, content.wednesday, content.thursday, content.friday, content.saturday, content.sunday, content.playTimeHoursStart, content.playTimeHoursStart);
                      responseXML += testEntry.assembleEntry();
                    } else {
                      let text = content.template;
                      const DISTRICT = "@@district@@";
                      text = text.replace(DISTRICT, player.district);
                      responseXML += text;
                    }
                    testEntry = new Entry();
                  }
                }
              }
            }
          }
          responseXML += "</playlist>";
          this.response.write(responseXML);
        }
      }
      this.done();
    },
  });
