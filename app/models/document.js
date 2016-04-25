import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  link: DS.attr('string'),
  description: DS.attr('string'),
  text: DS.attr('string'),
  topic: DS.belongsTo('topic'),
  user: DS.belongsTo('user'),
  css: DS.attr(),
  css_format: Ember.computed('css', function() {
    if (this.get('css.css.url')) {
      let array = this.get('css.css.url').split('/');
      return array[array.length - 1];
    }
    return null;
  })
});