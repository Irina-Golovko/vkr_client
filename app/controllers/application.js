import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    userCreate() {
      if (Ember.$('#newUserPassword').val().length < 6){
        Ember.$('.aller-messages').children().addClass('hidden');
        Ember.$('#lenghtWarning').removeClass('hidden');
        return;
      }
      if (Ember.$('#newUserPassword').val() !== Ember.$('#newUserPasswordRepeat').val()) {
        Ember.$('.alert-messages').children().addClass('hidden');
        Ember.$('#repeatWarning').removeClass('hidden');
        return;
      }
      let newUser = this.store.createRecord('user', {
        name: Ember.$('#newUserName').val(),
        email: Ember.$('#newUserEmail').val(),
        role: Ember.$('#newUserRole').val(),
        password: Ember.$('#newUserPassword').val(),
      });
      newUser.save().then(function () {
        Ember.$('#newUserName').val('');
        Ember.$('#newUserEmail').val('');
        Ember.$('#newUserRole').val('');
        Ember.$('#newUserPassword').val('');
        Ember.$('#addUserModal').modal('hide');
      });
    }
  }
});