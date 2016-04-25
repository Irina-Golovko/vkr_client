import Ember from 'ember';
import ENV from 'vkr/config/environment';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  activeCourse: null,
  activeTopic: null,
  activeDocument: null,
  actions: {
    selectCourse(course) {
      this.set('activeCourse', course);
      Ember.$('#dropdownMenuCourses').children().removeClass('active');
      Ember.$('#dropdownMenuTopics').children().removeClass('active');
      Ember.$('#dropdownMenuDocuments').children().removeClass('active');
      if (course) {
        Ember.$('#courseLine-' + course.get('id')).addClass('active');      
      }
      this.set('activeTopic', null);
      this.set('activeDocument', null);
    },
    selectTopic(topic) {
      this.set('activeTopic', topic);
      Ember.$('#dropdownMenuTopics').children().removeClass('active');
      Ember.$('#dropdownMenuDocuments').children().removeClass('active');
      if (topic) {
        Ember.$('#topicLine-' + topic.get('id')).addClass('active');
      }
      this.set('activeDocument', null);
    },
    selectDocument(document) {
      this.set('activeDocument', document);
      Ember.$('#dropdownMenuDocuments').children().removeClass('active');
      if (document) {
        Ember.$('#documentLine-' + document.get('id')).addClass('active');
      }     
      this.transitionToRoute('list.show', document);
    },
    courseCreate() {
      let _this = this;
      let newCourse = this.store.createRecord('course', {
        title: Ember.$('#newCourseTitle').val()
      });
      newCourse.save().then(function (course) {
        Ember.$('#newCourseTitle').val('');
        _this.send('selectCourse', course);
        Ember.$('#addCourseModal').modal('hide');
      });
    },
    topicCreate() {
      let course = this.get('activeCourse'),
          _this = this;
      let newTopic = this.store.createRecord('topic', {
        title: Ember.$('#newTopicTitle').val(),
        course: course
      });
      newTopic.save().then(function (topic) {
        Ember.$('#newTopicTitle').val('');
        _this.send('selectTopic', topic);
        Ember.$('#addTopicModal').modal('hide');
      });
    },
    documentCreate() {
      let topic = this.get('activeTopic'),
          _this = this;
      let newDocument = this.store.createRecord('document', {
        title: Ember.$('#newDocumentTitle').val(),
        description: Ember.$('#newDocumentDesc').val(),
        topic: topic
      });
      newDocument.save().then(function (document) {
        let token = _this.get('applicationController.session.session.authenticated.token'),
            email = _this.get('applicationController.currentUser.email'),
            formData = new FormData();
        if (Ember.$('#newDocumentFile')[0].files[0]) {
          formData.append('file', Ember.$('#newDocumentFile')[0].files[0]);
        }
        formData.append('id', document.get('id'));
        formData.append('name', document.get('title'));
        Ember.$('#newDocumentTitle').val('');
        Ember.$('#newDocumentDesc').val('');
        Ember.$.ajax({
          headers: {
            Authorization: 'Token ' + token + ', user_email=' + email                        
          },
          url: ENV.apiURL + '/documents/' + document.get('id') + "/upload",
          method: 'POST',
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success(response) {
            document.set('text', response.data.attributes.text);
            _this.send('selectDocument', document);
            Ember.$('#addDocumentModal').modal('hide');
          }
        });
      });
    },
    chooseFile() {
      let formData = new FormData();
      formData.append('file', Ember.$('#newDocumentFile')[0].files[0]);
      Ember.$('#fileName').html(formData.get('file').name);
    }
  }
});