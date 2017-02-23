import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Contents = new Mongo.Collection('contents');

ContentsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
    optional: true,
  },
  mixInTicker: {
    type: Boolean,
  },
  collectStatisticts: {
    type: Boolean,
  },
  visibleForAll: {
    type: Boolean,
  },
  category: {
    type: String,
    optional: true,
  },
  startDate: {
    type: String,
    optional: true,
  },
  finishDate: {
    type: String,
    optional: true,
  },
  monday: {
    type: Boolean,
  },
  tuesday: {
    type: Boolean,
  },
  wednesday: {
    type: Boolean,
  },
  thursday: {
    type: Boolean,
  },
  friday: {
    type: Boolean,
  },
  saturday: {
    type: Boolean,
  },
  sunday: {
    type: Boolean,
  },
  playTimeHoursStart: {
    type: String,
    optional: true,
  },
  playTimeHoursFinish: {
    type: String,
    optional: true,
  },
  deleteAfterFinish: {
    type: Boolean,
  },
  assortiment: {
    type: [String],
    optional: true,
  },
  regions: {
    type: [String],
    optional: true,
  },
  mediaId: {
    type: String,
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

Contents.attachSchema(ContentsSchema);
