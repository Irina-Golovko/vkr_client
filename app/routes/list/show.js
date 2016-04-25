import Ember from 'ember';

export default Ember.Route.extend({
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