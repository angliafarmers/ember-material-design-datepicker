import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  init() {
    let date = moment().add(1, 'days').toDate();
    this.set('startDate', date);
    return this._super(...arguments);
  }
});
