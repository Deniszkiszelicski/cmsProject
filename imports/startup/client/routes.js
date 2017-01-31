import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';








FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('App_body', { main: 'home' });
  },
});

FlowRouter.route('/page2', {
  name: 'page2',
  action() {
    BlazeLayout.render('App_body', { main: 'page2' });
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
FlowRouter.route('/', {
  name: 'signIn',
  action() {
    BlazeLayout.render('signInLayout2', { main: 'signInTemplate' });
  },
});
FlowRouter.route('/admin_role', {
  name: 'admin_role',
  action() {
    BlazeLayout.render('App_body', { main: 'admin_role' });
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
});
