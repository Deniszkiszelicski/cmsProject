import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

UserInformation = new Mongo.Collection('userInformation');

// UserInformation.schema = new SimpleSchema({
//   name: { type: String },
//   accountRole: { type: String },
//   email: {type: String}
// });
// UserInformation.attachSchema(Playlists.schema);
