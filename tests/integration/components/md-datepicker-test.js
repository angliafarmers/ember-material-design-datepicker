import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-datepicker', 'Integration | Component | md datepicker', {
  integration: true
});

test('renders a calendar for the month of the selected date', function(assert) {
  assert.expect(12);

  let startDate = '08/21/2000';
  this.set('selectedDate', moment(startDate, 'MM/DD/YYYY').toDate());
  this.render(hbs`{{md-datepicker selectedDate=selectedDate}}`);

  assert.equal(this.$('.datepicker-container').length, 1);
  assert.equal(this.$('.datepicker-head').length, 1);
  assert.equal(this.$('.datepicker-main').length, 1);
  assert.equal(this.$('.datepicker-head .head-year').text().trim(), '2000');
  assert.equal(this.$('.datepicker-head .head-day-month').text().trim(), 'Mon, Aug 21');
  assert.equal(this.$('.selected-month-year').text().trim(), 'August 2000');
  assert.equal(this.$('.month-toggle').length, 2);
  assert.equal(this.$('.day-header span').length, 7);

  // Check specifics for this given date
  assert.equal(this.$('.week').length, 5);
  assert.equal(this.$('.btn-date').length, 31);
  assert.equal(this.$('.week:eq(0) .blank-day').length, 1);
  assert.equal(this.$('.week:eq(4) .blank-day').length, 3);
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
  assert.expect(10);

  this.render(hbs`{{md-datepicker dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('03/-1/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is MM/DD/YYYY');
  this.$('input').val('04/33/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is MM/DD/YYYY');
  this.$('input').val('06/a/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is MM/DD/YYYY');
  this.$('input').val('05/0/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is MM/DD/YYYY');
  this.$('input').val('02/2/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is MM/DD/YYYY');
});

test('date changed returns null for bad day in UK format', function(assert) {
  assert.expect(10);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);
  this.render(hbs`{{md-datepicker dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('-1/03/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is ' + dateFormat);
  this.$('input').val('33/03/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is ' + dateFormat);
  this.$('input').val('a/03/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is ' + dateFormat);
  this.$('input').val('0/03/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is ' + dateFormat);
  this.$('input').val('2/03/2012').keyup();
  assert.equal(this.$('.datepicker-error').text().trim(), 'Invalid date, required format is ' + dateFormat);
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

test('when not required, a blank date does not display an error', function(assert) {
  assert.expect(2);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);
  this.render(hbs`{{md-datepicker dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('').keyup();
  assert.equal(this.$('.datepicker-error').length, 0);
});

test('when required, a blank date displays an error', function(assert) {
  assert.expect(3);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);
  this.render(hbs`{{md-datepicker dateFormat=dateFormat dateChanged="assertDateChanged" required=true}}`);

  this.on('assertDateChanged', date => assert.equal(date, null));

  this.$('input').val('').keyup();
  assert.equal(this.$('.datepicker-error').length, 1);
  assert.equal(this.$('.datepicker-error').text().trim(), 'Date is required');
});

test('clicking left hand month toggle changes displayed month to the previous month', function(assert) {
  assert.expect(2);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);

  let startDate = '23/05/2012';
  this.set('selectedDate', moment(startDate, dateFormat).toDate());

  this.render(hbs`{{md-datepicker selectedDate=selectedDate dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  // Starts as May
  assert.equal(this.$('.selected-month-year').text().trim(), 'May 2012');

  this.$('.month-toggle:eq(0)').trigger('click');

  assert.equal(this.$('.selected-month-year').text().trim(), 'April 2012');
});

test('clicking right hand month toggle changes displayed month to the next month', function(assert) {
  assert.expect(2);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);

  let startDate = '23/12/2012';
  this.set('selectedDate', moment(startDate, dateFormat).toDate());

  this.render(hbs`{{md-datepicker selectedDate=selectedDate dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  // Starts as Dec
  assert.equal(this.$('.selected-month-year').text().trim(), 'December 2012');

  this.$('.month-toggle:eq(1)').trigger('click');

  assert.equal(this.$('.selected-month-year').text().trim(), 'January 2013');
});

test('clicking date returns expected date', function(assert) {
  assert.expect(1);

  let dateFormat = 'DD/MM/YYYY';
  this.set('dateFormat', dateFormat);

  let startDate = '23/12/2012';
  this.set('selectedDate', moment(startDate, dateFormat).toDate());

  this.render(hbs`{{md-datepicker selectedDate=selectedDate dateFormat=dateFormat dateChanged="assertDateChanged"}}`);

  let expectedDate = '02/12/2012';
  this.on('assertDateChanged', date => assert.equal(moment(date).format(dateFormat), expectedDate));

  // 2nd of dec
  this.$('button.btn-date:eq(1)').trigger('click');
});
