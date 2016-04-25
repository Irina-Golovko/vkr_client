import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serializeIntoHash(hash, typeClass, snapshot, options) {
    return this._super(hash, typeClass, snapshot, options);
  }
});