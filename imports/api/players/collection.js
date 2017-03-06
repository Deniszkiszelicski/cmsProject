import { Mongo } from 'meteor/mongo';

Players = new Mongo.Collection('players');

PlayersSchema = new SimpleSchema({
  name: {
    type: String,
  },
  playerId: {
    type: String,
  },
  location: {
    type: String,
    optional: true,
  },
  address: {
    type: String,
    optional: true,
  },
  postIndex: {
    type: String,
    optional: true,
  },
  townCity: {
    type: String,
    optional: true,
  },
  district: {
    type: String,
    optional: true,
  },
  mondayStart1: {
    type: String,
    optional: true,
  },
  mondayEnd1: {
    type: String,
    optional: true,
  },
  mondayStart2: {
    type: String,
    optional: true,
  },
  mondayEnd2: {
    type: String,
    optional: true,
  },
  tuesdayStart1: {
    type: String,
    optional: true,
  },
  tuesdayEnd1: {
    type: String,
    optional: true,
  },
  tuesdayStart2: {
    type: String,
    optional: true,
  },
  tuesdayEnd2: {
    type: String,
    optional: true,
  },
  wednesdayStart1: {
    type: String,
    optional: true,
  },
  wednesdayEnd1: {
    type: String,
    optional: true,
  },
  wednesdayStart2: {
    type: String,
    optional: true,
  },
  wednesdayEnd2: {
    type: String,
    optional: true,
  },
  thursdayStart1: {
    type: String,
    optional: true,
  },
  thursdayEnd1: {
    type: String,
    optional: true,
  },
  thursdayStart2: {
    type: String,
    optional: true,
  },
  thursdayEnd2: {
    type: String,
    optional: true,
  },
  fridayStart1: {
    type: String,
    optional: true,
  },
  fridayEnd1: {
    type: String,
    optional: true,
  },
  fridayStart2: {
    type: String,
    optional: true,
  },
  fridayEnd2: {
    type: String,
    optional: true,
  },
  saturdayStart1: {
    type: String,
    optional: true,
  },
  saturdayEnd1: {
    type: String,
    optional: true,
  },
  saturdayStart2: {
    type: String,
    optional: true,
  },
  saturdayEnd2: {
    type: String,
    optional: true,
  },
  sundayStart1: {
    type: String,
    optional: true,
  },
  sundayEnd1: {
    type: String,
    optional: true,
  },
  sundayStart2: {
    type: String,
    optional: true,
  },
  sundayEnd2: {
    type: String,
    optional: true,
  },
  assortiment: {
    type: [String],
    optional: true,
  },
  regions: {
    type: [String],
    optional: true,
  },
  contentGroupIds: {
    type: [String],
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  author: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
});

Players.attachSchema(PlayersSchema);
