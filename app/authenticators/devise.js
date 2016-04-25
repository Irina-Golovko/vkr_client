import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';
import ENV from 'vkr/config/environment';

export default Devise.extend({
  store: Ember.inject.service(),
  serverTokenEndpoint: ENV.apiURL + '/sign-in',

  restore(data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(ident, password) {
    let _this = this,
        data = {
          user: {}
        };
    data['user']['email'] = ident;
    data['user']['password'] = password;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url:         _this.serverTokenEndpoint,
        type:        'POST',
        data:        data
      }).then(function (response) {
        let currentUser = {
          id: response.data.id.toString(),
          email: response.data.attributes.email,
          name: response.data.attributes.name,
          role: response.data.attributes.role
        };
        resolve({
          user: currentUser,
          token: response.data.attributes.authentication_token
        });
      }, function (xhr) {
        reject( xhr.error() );
      });
    });
  }
});
