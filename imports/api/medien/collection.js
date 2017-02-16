import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Medien = new Mongo.Collection('medien');

MedienSchema = new SimpleSchema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
    allowedValues: ["image", "video"],
  },
  category: {
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
  fileId: {
    type: String,
  }
});

Medien.attachSchema(MedienSchema);

Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  },
  onAfterUpload: function (fileRef) {
    console.log("inserted id = ", fileRef._id);
  },
});
