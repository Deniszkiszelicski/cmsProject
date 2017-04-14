import { Template } from 'meteor/templating';
import './searchCategory.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Template.searchCategory.onRendered(function onRendered(){

});

Template.searchCategory.helpers({
  // searchIndex: () => {
  //   const categoriesIndex = new Index({
  //     collection: Medien,
  //     fields: ['category'],
  //     engine: new MinimongoEngine(),
  //   });
  //   return categoriesIndex;
  // },
  searchCategories: () => {
    // const result =_.uniq(Medien.find().fetch().map(function(it) { return it.category; }), true);
    let result = Medien.find().fetch().map(function(it) { return it.category; });
    
    console.log("result = ", result);
    return result;
  },
});

Template.searchCategory.rendered = function () {
  AutoCompletion.init("input#searchCategories");
}

// Template.searchCategory.events({
//   'keyup input#searchCategories': function () {
//     AutoCompletion.autocomplete({
//       element: 'input#searchCategories',       // DOM identifier for the element
//       collection: Medien,              // MeteorJS collection object
//       field: 'category',                    // Document field name to search for
//       limit: 0,                         // Max number of elements to show
//       config: { distinctElements: true },
//       sort: { category: 1 }});              // Sort object to filter results with
//       //filter: { 'gender': 'female' }}); // Additional filtering
//
//   }
// });
