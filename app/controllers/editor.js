import Ember from 'ember';
import ENV from 'vkr/config/environment';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  listController: Ember.inject.controller('list'),
  alertMessage: null,
  uploadedImageURL: null,
  actions: {
    imageUpload() {
      let token = this.get('applicationController.session.session.authenticated.token');
      let email = this.get('applicationController.currentUser.email');
      let _this = this;
      let formData = new FormData();
      formData.append('file', Ember.$('#imageUpload')[0].files[0]);
      formData.append('document', this.get('model.id'));
      Ember.$.ajax({
        headers: {
          Authorization: 'Token ' + token + ', user_email=' + email                        
        },
        url: ENV.apiURL + '/images',
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success(response) {
          _this.set('uploadedImageURL', "![](" + response.url + ")");
          Ember.$('#imageUpload').val("");
          Ember.$('#imageUploadModal').modal();
        }
      });
    },
    cssUpload() {
      let token = this.get('applicationController.session.session.authenticated.token');
      let email = this.get('applicationController.currentUser.email');
      let _this = this;
      let formData = new FormData();
      formData.append('css', Ember.$('#cssUpload')[0].files[0]);
      formData.append('document', this.get('model.id'));
      Ember.$.ajax({
        headers: {
          Authorization: 'Token ' + token + ', user_email=' + email                        
        },
        url: ENV.apiURL + '/documents/' + _this.get('model.id') + '/css',
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success() {
          Ember.$('#cssUpload').val("");
          _this.get('model').save();
          Ember.$("#uploadCssButton").fadeOut(250, function() {
            Ember.$(this).text('Прикреплено').fadeIn(250);
          });
          Ember.run.later((function() {
            Ember.$("#uploadCssButton").fadeOut(250, function() {
              Ember.$(this).text('Прикрепить css-файл').fadeIn(250);
            });
          }), 1000);
        }
      });
    },
    documentUpdate() {
      this.get('model').set('title', Ember.$('#documentName').val());
      this.get('model').set('description', Ember.$('#documentDesc').val());
      this.get('model').set('text', this.get('editor').getValue());
      this.get('model').save().then (function() {
        Ember.$("#saveDocButton").fadeOut(250, function() {
          Ember.$(this).text('Сохранено').fadeIn(250);
        });
        Ember.run.later((function() {
          Ember.$("#saveDocButton").fadeOut(250, function() {
            Ember.$(this).text('Сохранить документ').fadeIn(250);
          });
        }), 1000);
      });
    },
    copySuccess() {
      this.set('alertMessage', 'Ссылка скопирована');
      Ember.$('.alert').toggleClass('alert-success');
      Ember.$('.img-alert').animate({
        opacity: 1
      });
      Ember.run.later((function() {
        Ember.$('.img-alert').animate({
          opacity: 0
        }, function() {
          Ember.$('.alert').toggleClass('alert-success');
        });
      }), 1000);
    },
    docDestroy(document) {
      let _this = this;
      document.destroyRecord().then( function() {
        _this.get('listController').send('selectDocument', null);
        _this.transitionToRoute('list');
      });
    }
  }
});