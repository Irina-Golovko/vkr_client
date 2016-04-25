import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  ident: null,
  password: null,
  actions: {
    authenticateSession() {
      let ident = this.get('ident'),
          password = this.get('password');
      this.get('session').authenticate('authenticator:devise', ident, password);
    }
  }
});

