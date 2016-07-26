import Ember from 'ember';
import layout from '../templates/components/md-datepicker';

export default Ember.Component.extend({
  layout,
  testComputed: Ember.computed('value', function() {
    if (this.get('value.length')) {
      return 'There is something in the box';
    }
    return 'There is nothing in the box';
  })
});
