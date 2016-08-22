import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  init() {
    let date = moment().add(1, 'days').toDate();
    this.set('selectedDate', date);
    this.set('selectedDate2', date);
    this.set('selectedDate3', null);
    return this._super(...arguments);
  }
});
