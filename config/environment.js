/*jshint node:true*/
'use strict';

module.exports = function(environment, appConfig) {
  let moment = appConfig.moment || {};

  return {
    moment: {
      includeLocales: moment.includeLocales || false
    }
  };
};
