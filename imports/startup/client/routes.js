import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.triggers.enter([function(context, redirect) {
	if(!Meteor.userId()){
		FlowRouter.go('signIn');
	}
}]);

FlowRouter.route('/players', {
  name: 'playersPage',
  action() {
    BlazeLayout.render('App_body', { main: 'playersPage' });
  },
});

FlowRouter.route('/playlists', {
  name: 'playlistsPage',
  action() {
    BlazeLayout.render('App_body', { main: 'playlistsPage' });
  },
});

FlowRouter.route('/medien', {
  name: 'medienPage',
  action() {
    BlazeLayout.render('App_body', { main: 'medienPage' });
  },
});

FlowRouter.route('/contents', {
  name: 'contentsPage',
  action() {
    BlazeLayout.render('App_body', { main: 'contentsPage' });
  },
});
FlowRouter.route('/homeAdmin', {
  name: 'homeAdminPage',
  action() {
    BlazeLayout.render('App_body', { main: 'homeAdminPage' });
  },
});

FlowRouter.route('/content-groups', {
  name: 'contentGroupsPage',
  action() {
    BlazeLayout.render('App_body', { main: 'contentGroupsPage' });
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
    BlazeLayout.render('App_body', { main: 'userReg1' });
  },
});
FlowRouter.route('/signIn', {
  name: 'signIn',
  action() {
    BlazeLayout.render('signInLayout2', { main: 'signInTemplate' });
  },
});

FlowRouter.route('/admin_role', {
  name: 'admin_role',
  action() {
    BlazeLayout.render('App_body', { main: 'adminRoles' });
  },

});
FlowRouter.route('/admin_networks', {
  name: 'admin_networks',
  action() {
    BlazeLayout.render('App_body', { main: 'adminNetworks' });
  },

});

FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('homeLayout');
  },
});

FlowRouter.route('/', {
	name: 'default',
	action() {
    FlowRouter.go('home');
	}
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
