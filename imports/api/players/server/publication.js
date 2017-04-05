import { Meteor } from 'meteor/meteor';
// import { Builder } from 'xmlbuilder';

Meteor.publish('players', function(playlistUserForm, currentPage, showPerPage, filterText) {
  if(playlistUserForm) {
    return Players.find({});
  }
  const userId = this.userId;
  if (userId) {
    const user = Meteor.users.findOne({ _id: userId });
    const roleId = user.profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      if (role.seeAllPlayers) {
        const networkId = role.networkId;
        if(currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return Players.find({ $and: [ { playerId: { $regex: new RegExp(filterText), $options: 'i' } },
                                          { networkId: networkId } ]  }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return Players.find({ networkId: networkId }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        }
      } else {
        const playerIds = user.profile.assignedPlayers;
        if(currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return Players.find({ $and: [ { playerId: { $regex: new RegExp(filterText), $options: 'i' } },
                                          { _id: { $in: playerIds } } ]  }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          } else {
            return Players.find({ _id: { $in: playerIds } }, { sort: { name: 1 }, skip: skip, limit: showPerPage});
          }
        }
      }
    }
  }
});

Meteor.publish('countPlayers', function(currentPage, showPerPage, filterText) {
  const userId = this.userId;
  if (userId) {
    const user = Meteor.users.findOne({ _id: userId });
    const roleId = user.profile.role;
    const role = Roles.findOne({ _id: roleId });
    if (role) {
      if (role.seeAllPlayers) {
        const networkId = role.networkId;
        if(currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return new Counter('countPlayers', Players.find({ $and: [ { playerId: { $regex: new RegExp(filterText), $options: 'i' } },
                                          { networkId: networkId } ]  }, { sort: { name: 1 }, skip: skip, limit: showPerPage}));
          } else {
            return new Counter('countPlayers', Players.find({ networkId: networkId }, { sort: { name: 1 }, skip: skip, limit: showPerPage}));
          }
        }
      } else {
        const playerIds = user.profile.assignedPlayers;
        if(currentPage && showPerPage) {
          const skip = (currentPage - 1) * showPerPage;
          if (filterText) {
            return new Counter('countPlayers', Players.find({ $and: [ { playerId: { $regex: new RegExp(filterText), $options: 'i' } },
                                          { _id: { $in: playerIds } } ]  }, { sort: { name: 1 }, skip: skip, limit: showPerPage}));
          } else {
            return new Counter('countPlayers', Players.find({ _id: { $in: playerIds } }, { sort: { name: 1 }, skip: skip, limit: showPerPage}));
          }
        }
      }
    }
  }
  // return new Counter('countPlayers', Players.find());
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
            responseXML += player.tickerText;
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

  Api.addRoute('getPlaytimesForPlayer', {authRequired: false}, {
      get: function () {
        const playerId = this.queryParams.id;
        if (playerId) {
          const player = Players.findOne({ playerId: playerId} );
          if (player) {
            let responseXML = "<" + '\\?xml version="1.0" encoding="utf-8" ?>\n'.slice(1, 41);
            responseXML += "<settings>";

            responseXML += "<playtimes>";
            responseXML += "<monday>";
            let mondayStart1 = player.mondayStart1;
            let mondayEnd1 = player.mondayEnd1;
            if (mondayStart1 && mondayEnd1) {
              responseXML += mondayStart1;
              responseXML += "-";
              responseXML += mondayEnd1;
            }
            let mondayStart2 = player.mondayStart2;
            let mondayEnd2 = player.mondayEnd2;
            if (mondayStart2 && mondayEnd2) {
              responseXML += ",";
              responseXML += mondayStart2;
              responseXML += "-";
              responseXML += mondayEnd2;
            }
            responseXML += "</monday>";

            responseXML += "<tuesday>";
            let tuesdayStart1 = player.tuesdayStart1;
            let tuesdayEnd1 = player.tuesdayEnd1;
            if (tuesdayStart1 && tuesdayEnd1) {
              responseXML += tuesdayStart1;
              responseXML += "-";
              responseXML += tuesdayEnd1;
            }
            let tuesdayStart2 = player.tuesdayStart2;
            let tuesdayEnd2 = player.tuesdayEnd2;
            if (tuesdayStart2 && tuesdayEnd2) {
              responseXML += ",";
              responseXML += tuesdayStart2;
              responseXML += "-";
              responseXML += tuesdayEnd2;
            }
            responseXML += "</tuesday>";

            responseXML += "<wednesday>";
            let wednesdayStart1 = player.wednesdayStart1;
            let wednesdayEnd1 = player.wednesdayEnd1;
            if (wednesdayStart1 && wednesdayEnd1) {
              responseXML += wednesdayStart1;
              responseXML += "-";
              responseXML += wednesdayEnd1;
            }
            let wednesdayStart2 = player.wednesdayStart2;
            let wednesdayEnd2 = player.wednesdayEnd2;
            if (wednesdayStart2 && wednesdayEnd2) {
              responseXML += ",";
              responseXML += wednesdayStart2;
              responseXML += "-";
              responseXML += wednesdayEnd2;
            }
            responseXML += "</wednesday>";

            responseXML += "<thursday>";
            let thursdayStart1 = player.thursdayStart1;
            let thursdayEnd1 = player.thursdayEnd1;
            if (thursdayStart1 && thursdayEnd1) {
              responseXML += thursdayStart1;
              responseXML += "-";
              responseXML += thursdayEnd1;
            }
            let thursdayStart2 = player.thursdayStart2;
            let thursdayEnd2 = player.thursdayEnd2;
            if (thursdayStart2 && thursdayEnd2) {
              responseXML += ",";
              responseXML += thursdayStart2;
              responseXML += "-";
              responseXML += thursdayEnd2;
            }
            responseXML += "</thursday>";

            responseXML += "<friday>";
            let fridayStart1 = player.fridayStart1;
            let fridayEnd1 = player.fridayEnd1;
            if (fridayStart1 && fridayEnd1) {
              responseXML += fridayStart1;
              responseXML += "-";
              responseXML += fridayEnd1;
            }
            let fridayStart2 = player.fridayStart2;
            let fridayEnd2 = player.fridayEnd2;
            if (fridayStart2 && fridayEnd2) {
              responseXML += ",";
              responseXML += fridayStart2;
              responseXML += "-";
              responseXML += fridayEnd2;
            }
            responseXML += "</friday>";

            responseXML += "<saturday>";
            let saturdayStart1 = player.saturdayStart1;
            let saturdayEnd1 = player.saturdayEnd1;
            if (saturdayStart1 && saturdayEnd1) {
              responseXML += saturdayStart1;
              responseXML += "-";
              responseXML += saturdayEnd1;
            }
            let saturdayStart2 = player.saturdayStart2;
            let saturdayEnd2 = player.saturdayEnd2;
            if (saturdayStart2 && saturdayEnd2) {
              responseXML += ",";
              responseXML += saturdayStart2;
              responseXML += "-";
              responseXML += saturdayEnd2;
            }
            responseXML += "</saturday>";

            responseXML += "<sunday>";
            let sundayStart1 = player.sundayStart1;
            let sundayEnd1 = player.sundayEnd1;
            if (sundayStart1 && sundayEnd1) {
              responseXML += sundayStart1;
              responseXML += "-";
              responseXML += sundayEnd1;
            }
            let sundayStart2 = player.sundayStart2;
            let sundayEnd2 = player.sundayEnd2;
            if (sundayStart2 && sundayEnd2) {
              responseXML += ",";
              responseXML += sundayStart2;
              responseXML += "-";
              responseXML += sundayEnd2;
            }
            responseXML += "</sunday>";
            responseXML += "</playtimes>";
            responseXML += "</settings>";
            this.response.write(responseXML);
          }
        }
        this.done();
      },
    });
