import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Roles = new Mongo.Collection('roles');
export default Roles;
// UserInformation.schema = new SimpleSchema({
//   name: { type: String },
//   accountRole: { type: String },
//   email: {type: String}
// });
// UserInformation.attachSchema(Playlists.schema);
