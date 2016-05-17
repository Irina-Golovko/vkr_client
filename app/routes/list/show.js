import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  afterModel() {
    let listController = this.controllerFor('list');
    let model = this.modelFor(this.routeName);
    listController.set('activeDocument', model);
    listController.set('activeTopic', model.get('topic'));
    listController.set('activeCourse', model.get('topic.course'));
  },
  serialize() {
    return {
      document_id: this.controllerFor('list').get('activeDocument.id')
    };
  },
});