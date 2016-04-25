import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  documents: DS.hasMany('document'),
  course: DS.belongsTo('course'),
  user: DS.belongsTo('user')
});