import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel(transition){
    let controller = this.controllerFor('application');
    if (this.get('session.isAuthenticated')){
      controller.set('currentUser', this.get('session.session.authenticated.user'));      
    }
    this._super(transition);
  },
  sessionAuthenticated() {
    let controller = this.controllerFor('application');
    controller.set('currentUser', this.get('session.session.authenticated.user'));
    this.transitionTo('index');
  }
});
