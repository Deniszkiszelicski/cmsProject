import { Mongo } from 'meteor/mongo';

ContentGroups = new Mongo.Collection('contentGroups');

ContentGroupsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
    optional: true,
  },
  blocked: {
    type: Boolean,
  },
  contentIds: {
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
