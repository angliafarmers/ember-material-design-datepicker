import Ember from 'ember';
import layout from '../templates/components/md-datepicker';

// TODO change to auto generated docs
// dateFormat
// selectedDate
// relaxValidation
// inputClass
// errorMessage

export default Ember.Component.extend({
  layout,
  classNames: ['md-datepicker-group'],
  init() {
    if (this.get('selectedDate')) {
      this.set('_dateText', moment(this.get('selectedDate')).format(this.get('format')));
    }
    else {
      this.set('_dateText', null);
    }

    return this._super(...arguments);
  },
  defaultErrorMessage: Ember.computed('format', function() {
    return 'Invalid date, required format is ' + this.get('format');
  }),
  format: Ember.computed('dateFormat', function() {
    let dateFormat = this.get('dateFormat');
    if (dateFormat) {
      return dateFormat;
    }

    return 'MM/DD/YYYY';
  }),
  isValidDate: Ember.computed('_dateText', function() {
    return moment(this.get('_dateText'), this.get('format'), this.get('useStrictMode')).isValid();
  }),
  isInvalidDate: Ember.computed.not('isValidDate'),
  mdClass: Ember.computed('inputClass', 'isValidDate', function() {
    let result = '';
    let inputClass = this.get('inputClass');
    if (inputClass) {
      result += inputClass;
    }

    if (this.get('isValidDate')) {
      return result;
    }
    return result === '' ? 'invalid' : result + ' ' + 'invalid';
  }),
  useStrictMode: Ember.computed('relaxValidation', function() {
    if (this.get('relaxValidation')) {
      return false;
    }

    return true;
  }),
  actions: {
    keyUp() {
      if (this.get('isValidDate')) {
        this.sendAction('dateChanged', moment(this.get('_dateText'), this.get('format')).toDate());
      }
      else {
        this.sendAction('dateChanged', null);
      }
    }
  }
});
