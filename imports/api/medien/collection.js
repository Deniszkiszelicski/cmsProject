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
  author: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
  fileId: {
    type: String,
  }
});

Medien.attachSchema(MedienSchema);
// fs = Npm.require('fs-extra');
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
    // console.log("inserted id = ", fileRef._id);
  },
  storagePath: function (fileObj) {
    const userId = fileObj.userId;
    const path = Meteor.settings.saveImagesPath;
    if (userId) {
      const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
      const role = Roles.findOne({ _id: roleId });
      if (role) {
        const networkId = role.networkId;
        const networkIdVisible = Networks.findOne({ _id: networkId }).netId;
        const fullPath = path + "/" + networkIdVisible.toString() + "/original";
        fs.ensureDirSync(fullPath);
        return fullPath;
      }
    }
    return path;
  },
});

Videos = new FilesCollection({
  // debug: true,
  // throttle: false,
  // chunkSize: 1024*1024,
  // storagePath: 'assets/app/uploads/videos',
  storagePath: function (fileObj) {
    const userId = fileObj.userId;
    const path = Meteor.settings.saveVideosPath;
    if (userId) {
      const roleId = Meteor.users.findOne({ _id: userId }).profile.role;
      const role = Roles.findOne({ _id: roleId });
      if (role) {
        const networkId = role.networkId;
        const networkIdVisible = Networks.findOne({ _id: networkId }).netId;
        const fullPath = path + "/" + networkIdVisible.toString() + "/original";
        fs.ensureDirSync(fullPath);
        return fullPath;
      }
    }
    return path;
  },
  // collectionName: 'uploadedFiles',
  collectionName: 'Videos',
  allowClientCode: true,
  protected(fileObj) {
    if (fileObj) {
      if (!(fileObj.meta && fileObj.meta.secured)) {
        return true;
      } else if ((fileObj.meta && fileObj.meta.secured === true) && this.userId === fileObj.userId) {
        return true;
      }
    }
    return false;
  },
  onBeforeRemove(cursor) {
    const res = cursor.map((file) => {
      if (file && file.userId && _.isString(file.userId)) {
        return file.userId === this.userId;
      }
      return false;
    });
    return !~res.indexOf(false);
  },
  onBeforeUpload() {
    if (this.file.size <= 1024 * 1024 * 128) {
      return true;
    }
    return "Max. file size is 128MB you've tried to upload " + (filesize(this.file.size));
  },
  downloadCallback(fileObj) {
    if (this.params && this.params.query && this.params.query.download === 'true') {
      Videos.collection.update(fileObj._id, {
        $inc: {
          'meta.downloads': 1
        }
      });
    }
    return true;
  },
});
