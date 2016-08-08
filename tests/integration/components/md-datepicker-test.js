import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-datepicker', 'Integration | Component | md datepicker', {
  integration: true
});

test('displays selected date on init for basic date in default format', function(assert) {
  assert.expect(1);

  let expectedDate = '08/21/2000';
  this.set('selectedDate', moment(expectedDate, 'MM/DD/YYYY').toDate());
  this.render(hbs`{{md-datepicker selectedDate=selectedDate}}`);

  assert.equal(this.$('input').val(), expectedDate);
});

test('displays selected date on init for basic date in UK format', function(assert) {
  assert.expect(1);

  let expectedDate = '21/08/2000';
  let dateFormat = 'DD/MM/YYYY';
  this.set('selectedDate', moment(expectedDate, dateFormat).toDate());
  this.set('dateFormat', dateFormat);
  this.render(hbs`{{md-datepicker selectedDate=selectedDate dateFormat=dateFormat}}`);

  assert.equal(this.$('input').val(), expectedDate);
});

test('date changed returns null for bad year', function(assert) {
  assert.expect(4);

  this.render(hbs`{{md-datepicker dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('02/03/-1').keyup();
  this.$('input').val('02/03/12').keyup();
  this.$('input').val('02/03/a').keyup();
  this.$('input').val('02/03/012').keyup();
});

test('date changed returns null for bad month in default format', function(assert) {
  assert.expect(5);

  this.render(hbs`{{md-datepicker dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('-1/03/2012').keyup();
  this.$('input').val('13/03/2012').keyup();
  this.$('input').val('a/03/2012').keyup();
  this.$('input').val('0/03/2012').keyup();
  this.$('input').val('2/03/2012').keyup();
});

test('date changed returns null for bad month in UK format', function(assert) {
  assert.expect(5);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);
  this.render(hbs`{{md-datepicker dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('03/-1/2012').keyup();
  this.$('input').val('04/13/2012').keyup();
  this.$('input').val('06/a/2012').keyup();
  this.$('input').val('05/0/2012').keyup();
  this.$('input').val('02/2/2012').keyup();
});

test('date changed returns null for bad day in default format', function(assert) {
  assert.expect(5);

  this.render(hbs`{{md-datepicker dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('03/-1/2012').keyup();
  this.$('input').val('04/33/2012').keyup();
  this.$('input').val('06/a/2012').keyup();
  this.$('input').val('05/0/2012').keyup();
  this.$('input').val('02/2/2012').keyup();
});

test('date changed returns null for bad day in UK format', function(assert) {
  assert.expect(5);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);
  this.render(hbs`{{md-datepicker dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('-1/03/2012').keyup();
  this.$('input').val('33/03/2012').keyup();
  this.$('input').val('a/03/2012').keyup();
  this.$('input').val('0/03/2012').keyup();
  this.$('input').val('2/03/2012').keyup();
});

test('date changed returns expected date for valid date in default format', function(assert) {
  assert.expect(1);
  let expectedDate = '05/23/2012';

  this.render(hbs`{{md-datepicker dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => {
    assert.equal(moment(date).format('MM/DD/YYYY'), expectedDate)
  });

  this.$('input').val(expectedDate).keyup();
});

test('date changed returns expected date for valid date in UK format', function(assert) {
  assert.expect(1);
  let expectedDate = '23/05/2012';

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);
  this.render(hbs`{{md-datepicker dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(moment(date).format(dateFormat), expectedDate));

  this.$('input').val(expectedDate).keyup();
});
