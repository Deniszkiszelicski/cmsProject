import { Mongo } from 'meteor/mongo';

Playlists = new Mongo.Collection('playlists');

PlaylistsSchema = new SimpleSchema({
  name: {
    type: String,
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

Playlists.attachSchema(PlaylistsSchema);
