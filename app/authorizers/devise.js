import Devise from 'ember-simple-auth/authorizers/devise';
import Ember from 'ember';

export default Devise.extend({
  session: Ember.inject.service(),
  authorize(payload, setHeader) {
    let token = payload.token,
        email = payload.user.email;

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      setHeader('Authorization', 'Token ' + token + ",  user_email=" + email);
    }
  }
});
