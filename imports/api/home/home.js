import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Playlists = new Mongo.Collection('playlists');
// Playlists.schema = new SimpleSchema({
//   name: { type: String },
//   fileURL: { type: String },
// });
//Playlists.attachSchema(Playlists.schema);
