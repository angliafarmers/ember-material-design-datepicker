import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  init() {
    let date = moment().add(1, 'days').toDate();
    this.set('selectedDate', date);
    this.set('selectedDateUtc', new Date(moment.utc().format()));
    this.set('selectedDate2', date);
    this.set('selectedDate3', null);

    this.set('selectedDate4', moment('06/06/2012', 'MM/DD/YYYY').toDate());
    this.set('minDate', moment('06/03/2012', 'MM/DD/YYYY').toDate());
    this.set('maxDate', moment('06/25/2012', 'MM/DD/YYYY').toDate());

    this.set('selectedDate5', date);

    return this._super(...arguments);
  }
});
