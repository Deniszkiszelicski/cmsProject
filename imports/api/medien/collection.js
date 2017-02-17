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

// Videos = new FilesCollection({
//   // storagePath: 'assets/app/uploads/Videos',
//   // downloadRoute: '/files/videos'
//   collectionName: 'Videos',
//   // chunkSize: 1024*2048,
//   // throttle: 1024*512,
//   // permissions: 0755,
//   allowClientCode: false,
//   // cacheControl: 'public, max-age=31536000',
//   onbeforeunloadMessage: function () {
//     return 'Upload is still in progress! Upload will be aborted if you leave this page!';
//   },
//   onBeforeUpload: function (file) {
//     if (file.size <= 104857600 && /mp4/i.test(file.ext)) {
//       return true;
//     } else {
//       return 'Please upload video, with size equal or less than 100MB';
//     }
//   },
//   onAfterUpload: function (fileRef) {
//     console.log("inserted id = ", fileRef._id);
//   },
//   // downloadCallback: function (fileObj) {
//   //   if (this.params.query.download == 'true') {
//   //     Videos.update(fileObj._id, {$inc: {'meta.downloads': 1}});
//   //   }
//   //   // Must return true to continue download
//   //   return true;
//   // },
//   // protected: function (fileObj) {
//   //   // Check if user is own this file
//   //   if (fileObj.meta.owner === this.userId) {
//   //     return true;
//   //   } else {
//   //     return false;
//   //   }
//   // }
// });


Videos = new FilesCollection({
  // debug: true,
  // throttle: false,
  // chunkSize: 1024*1024,
  storagePath: 'assets/app/uploads/videos',
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
  interceptDownload(http, fileRef, version) {
    if (useDropBox || useS3) {
      const path = (fileRef && fileRef.versions && fileRef.versions[version] && fileRef.versions[version].meta && fileRef.versions[version].meta.pipeFrom) ? fileRef.versions[version].meta.pipeFrom : void 0;
      if (path) {
        // If file is successfully moved to Storage
        // We will pipe request to Storage
        // So, original link will stay always secure

        // To force ?play and ?download parameters
        // and to keep original file name, content-type,
        // content-disposition and cache-control
        // we're using low-level .serve() method
        this.serve(http, fileRef, fileRef.versions[version], version, Request({
          url: path,
          headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent')
        }));
        return true;
      }
      // While file is not yet uploaded to Storage
      // We will serve file from FS
      return false;
    }
    return false;
  }
});
