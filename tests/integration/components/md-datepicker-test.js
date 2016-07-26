import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-datepicker', 'Integration | Component | md datepicker', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs`{{md-datepicker}}`);

  assert.equal(this.$().text().trim(), 'There is nothing in the box');

  this.$('input').val('hey').trigger('change');

  assert.equal(this.$().text().trim(), 'There is something in the box');
});
