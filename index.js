/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-material-design-datepicker',
    included(app) {
     this._super.included(app);
   },
   contentFor: function(type) {
    if (type === 'head') {
      return '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">';
    }
  }
};
