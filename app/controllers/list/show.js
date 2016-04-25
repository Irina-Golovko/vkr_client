import Ember from 'ember';
import ENV from 'vkr/config/environment';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  listController: Ember.inject.controller('list'),
  downloadCallback(response) {
    let link = document.createElement("a");
    link.download = response.name;
    link.href = ENV.apiURL + '/' + response.link;
    link.click();
    Ember.$(".wrapper").addClass("hidden");
  },
  showCallback(response) {
    Ember.$(".wrapper").addClass("hidden");
    window.location = ENV.apiURL + '/' + response.link; 
  },
  actions: {
    requestFile(type,callback) {
      let token = this.get('applicationController.session.session.authenticated.token'),
          email = this.get('applicationController.currentUser.email'),
          _this = this;
      Ember.$.ajax({
        headers: {
          Authorization: 'Token ' + token + ', user_email=' + email                        
        },
        beforeSend() {
          Ember.$("#typeDownload").modal("hide");
          Ember.$(".wrapper").removeClass("hidden");
        },
        url: ENV.apiURL + "/documents/" + _this.get('model.id') + "/file-request",
        method: "POST",
        data: {
          type: type,
          id: _this.get('model.id'),
        },
        success: callback
      });
    },
    editTopic(topic) {
      topic = this.store.peekRecord('topic', topic.get('id'));
      topic.set("title", Ember.$("#editTopicTitle").val());
      topic.save().then( function() {
        Ember.$("#editTopicModal").modal('hide');
      });
    },
    editCourse(course) {
      course = this.store.peekRecord('course', course.get('id'));
      course.set("title", Ember.$("#editCourseTitle").val());
      course.save().then( function() {
        Ember.$("#editCourseModal").modal('hide');
      });
    },
    deleteTopic(topic) {
      let _this = this;
      topic = this.store.peekRecord('topic', topic.get('id'));
      topic.destroyRecord().then( function() {
        _this.get('listController').send('selectTopic', null);
        Ember.$("#editTopicModal").modal('hide');
        _this.transitionToRoute('list');
      });
    },
    deleteCourse(course) {
      let _this = this;
      course = this.store.peekRecord('course', course.get('id'));
      course.destroyRecord().then( function() {
        _this.get('listController').send('selectCourse', null);
        Ember.$("#editCourseModal").modal('hide');
        _this.transitionToRoute('list');
      });
    }
  }
});