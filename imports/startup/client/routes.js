import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.triggers.enter([function(context, redirect) {
	if(!Meteor.userId()){
		FlowRouter.go('signIn');
	}
}]);

FlowRouter.route('/', {
	name: 'default',
	action() {
    FlowRouter.go('home');
	}
});

FlowRouter.route('/players', {
  name: 'playersPage',
  action() {
    BlazeLayout.render('App_body', { main: 'playersPage' });
  },
});

FlowRouter.route('/page3', {
  name: 'page3',
  action() {
    BlazeLayout.render('App_body', { main: 'page3' });
  },
});

FlowRouter.route('/page4', {
  name: 'page4',
  action() {
    BlazeLayout.render('App_body', { main: 'page4' });
  },
});

FlowRouter.route('/page5', {
  name: 'page5',
  action() {
    BlazeLayout.render('App_body', { main: 'register' });
  },
});
FlowRouter.route('/signIn', {
  name: 'signIn',
  action() {
    BlazeLayout.render('signInLayout2', { main: 'signInTemplate' });
  },
});

FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('App_body', { main: 'home' });
  },
});

Accounts.onLogout(function (){
  FlowRouter.go('signIn');
});
Accounts.onLogin(function (){
  FlowRouter.go('home');
});
Accounts.createUser(function(){
  FlowRouter.go('home');
})
