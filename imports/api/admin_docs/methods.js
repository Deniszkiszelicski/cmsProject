import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  createDocument: function(adminDocumentationObject){
    AdminDocumentation.insert({
      docName: adminDocumentationObject.docName,
      docContent: adminDocumentationObject.docContent
    });
    console.log(adminDocumentationObject);
  },
  deleteDoc:function(id) {
    AdminDocumentation.remove(id);
    toastr.success("Deleted", "Role");
  },
});
