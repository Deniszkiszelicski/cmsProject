import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import '../../components/logoutbutton';
import '../../../api/admin_networks/methods';
import '../../../api/admin_networks/networks';
import './register.html';

Meteor.subscribe('networks');
var buffer;
var result;
var bufferH;
var resultH;






Template.registerNetwork.events({
  'submit .register-form1': function (event) {

    event.preventDefault();
    var footer1 = '';
    var footer2 = '';
    var footer3 = '';
    var footer4 = '';
    var news1active = true;
    var news2active = false;
    var news3active = false;
    var news4active = false;
    var news5active = false;
    var news6active = false;
    var news7active = false;
    var news8active = false;
    var news9active = false;
    var news10active = false;
    var headline = 'WELCOME TO IT-PARK';
    var headline2 = 'WELCOME TO IT-PARK';
    var headline3 = 'WELCOME TO IT-PARK';
    var headline4 = 'WELCOME TO IT-PARK';
    var headline5 = 'WELCOME TO IT-PARK';
    var headline6 = 'WELCOME TO IT-PARK';
    var headline7 = 'WELCOME TO IT-PARK';
    var headline8 = 'WELCOME TO IT-PARK';
    var headline9 = 'WELCOME TO IT-PARK';
    var headline10 = 'WELCOME TO IT-PARK';
    var news = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare magna neque, quis sodales ex luctus at. In feugiat finibus sem. Ut nisi est, cursus vitae risus non, sagittis auctor nisl. Aenean sit amet luctus ante. Phasellus pellentesque tempor libero nec rhoncus. Nam sed diam eget ante rhoncus volutpat vitae ac dui. Vestibulum massa velit, pretium pellentesque vestibulum et, pharetra at magna. Praesent sit amet arcu malesuada, malesuada dui et, fringilla neque. Integer sapien elit, gravida in malesuada consectetur, sagittis ac erat. Praesent vel vestibulum eros, ac interdum diam. Cras vitae massa neque. Duis dapibus auctor dui, eu pulvinar odio efficitur non. Sed quis nibh in risus gravida hendrerit.</p><p>In volutpat tristique rutrum. Vestibulum sollicitudin at nulla sit amet pulvinar. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam dictum at diam eu commodo. Mauris vehicula sapien lectus, ac molestie mauris commodo sit amet. Aliquam non est leo. Mauris sagittis sagittis urna, in lacinia lectus efficitur in. Proin sollicitudin mattis sodales. Cras et faucibus neque, non ornare metus. Vestibulum id semper est. Maecenas vestibulum varius sapien, id elementum tellus euismod at. Vestibulum auctor ante a efficitur sagittis. Proin tempus lacus risus, quis dapibus nunc eleifend sit amet.</p><p>Aliquam quis varius nisl. Praesent egestas magna efficitur enim posuere rutrum. Vivamus nulla velit, tempus id tempus nec, lacinia et leo. Nullam fringilla commodo facilisis. Maecenas mi eros, feugiat eget arcu sit amet, posuere efficitur ex. Nulla vel felis facilisis turpis porta euismod. Aenean vel enim nec nisl varius feugiat vitae nec urna. Duis feugiat molestie ex, non tincidunt tortor finibus in. Pellentesque quis ultricies augue. Nulla et lacus semper quam ornare cursus sit amet a sem. Vivamus semper lectus dui, faucibus dignissim enim feugiat vitae. Morbi fermentum odio neque, a molestie nunc volutpat ac. In ut aliquam est. Pellentesque est elit, pulvinar a magna sit amet, vestibulum fermentum neque. Aliquam vel lorem ut tortor tristique pretium eget vitae dolor.</p><p>Vestibulum dictum nec libero ut euismod. Fusce posuere sit amet libero vitae ornare. Curabitur posuere semper ipsum in efficitur. Etiam pellentesque felis sodales, blandit eros vel, dignissim turpis. Phasellus ullamcorper rhoncus enim, a consequat libero sagittis at. Mauris in pharetra elit. Suspendisse in urna dictum, tincidunt odio eget, vehicula turpis. Sed eget quam consequat, aliquam magna non, aliquam ipsum.</p>';
    var news2 = '';
    var news3 = '';
    var fileH = $('#homeImage').get(0).files[0];
    var file = $('#logo').get(0).files[0];
    var sortiment=[];
    var region =[];

    Meteor.call('createNetwork', { netName: $('#netNameNet').val(), netId: $('#netIdNet').val(),
    privatContent:$('#privatContent').is(":checked"),dmxLight:$('#dmxLight').is(":checked"),logUpdateTime:$('#logUpdateTime').val(),
     sortiment: sortiment, region: region,logo: result,image: resultH ,news: news,news2: news2,news3: news3, headline: headline,
     headline2: headline2, headline3: headline3,headline4: headline4,headline5: headline5,headline6: headline6,headline7: headline7,headline8: headline8,
      headline9: headline9,headline10: headline10,news1active: news1active,news2active: news2active,news3active: news3active,news4active: news4active,news5active: news5active,
      news6active: news6active,news7active: news7active,news8active: news8active,news9active: news9active,news10active: news10active,footer1:footer1});
    toastr.success("Data saved","New Network");
    Session.set("counter",1);
    Session.set("counter1",1);


},
'change #logo' : function(event,template){
    var file = event.target.files[0]; //assuming 1 file only
    if (!file) return;

    var reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = function e(event){
       result = reader.result;
       buffer = new Uint8Array(result);

    };


    reader.readAsDataURL(file); //read the file as arraybuffer

},
'change #homeImage' : function(event,template){
  var fileH = event.target.files[0]; //assuming 1 file only
  if (!fileH) return;

  var reader = new FileReader(); //create a reader according to HTML5 File API

  reader.onload = function e(event){
     resultH = reader.result;
     bufferH = new Uint8Array(resultH);

  };


  reader.readAsDataURL(fileH); //read the file as arraybuffer

},

    });
