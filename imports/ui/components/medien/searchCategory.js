import { Template } from 'meteor/templating';
import './searchCategory.html';
import '../../../api/medien/methods';
import '../../../api/medien/collection';

Template.searchCategory.helpers({
  searchIndex: () => {
    const categoriesIndex = new Index({
      collection: Medien,
      fields: ['category'],
      engine: new MinimongoEngine(),
    });
    return categoriesIndex;
  },
  searchCategories: () => {
    Medien.find().category;
  },
	category: function () {
		let category = '';
		let media;
		if(this._id) {
			media = Medien.findOne({ _id: this._id });
		}
		if(!!media){
      return media.category;
    }
		return category;
	}
});

Template.searchCategory.rendered = function () {
  AutoCompletion.init("input#searchCategories");
}

Template.searchCategory.events({
  'keyup input#searchCategories': function () {
    AutoCompletion.autocomplete({
      element: 'input#searchCategories',       // DOM identifier for the element
      collection: Medien,              // MeteorJS collection object
      field: 'category',                    // Document field name to search for
      limit: 0,                         // Max number of elements to show
      sort: { categoryName: 1 }});              // Sort object to filter results with
      //filter: { 'gender': 'female' }}); // Additional filtering
  }
});
