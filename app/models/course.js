import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  topics: DS.hasMany('topic'),
  user: DS.belongsTo('user')
});