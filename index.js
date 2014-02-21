
var _ = require('lodash');
var config = require('./lib/config');
var log2console = require('./lib/log2console');
var log2loggly = require('./lib/log2loggly');
var profile = require('./lib/profile');

var loggers = {};

module.exports = function(category) {
  var catConfig = config.categories[category] || {};
  catConfig.level = catConfig.level || 'silly';
  catConfig.console = catConfig.console || catConfig.level;
  catConfig.loggly = catConfig.loggly || catConfig.level;
  config.categories[category] = catConfig;

  var logger = function(msg, meta) {log(category, 'info', msg, meta)};
  logger.verbose = function(msg, meta) {log(category, 'verbose', msg, meta)};
  logger.info = function(msg, meta) {log(category, 'info', msg, meta)};
  logger.warn = function(msg, meta) {log(category, 'warn', msg, meta)};
  logger.error = function(msg, meta) {log(category, 'error', msg, meta)};
  return logger;
}


function log(category, level, msg, meta) {
  // ignore (if enabled)
  var catConfig = config.categories[category];
  if (ignore(catConfig.level, level)) {
    return;
  }

  // profile
  if (config.profile) {
    var ms = profile(category);
  }

  // console
  if (config.console && !ignore(catConfig.console, level)) {
    log2console(category, level, msg, meta, ms);
  }

  // loggly (if enabled)
  if (config.loggly && !ignore(catConfig.loggly, level)) {
    log2loggly(category, level, msg, meta, ms);
  }
}

function ignore(level1, level2) {
  return convertLevel(level1) >= convertLevel(level2);
}

function convertLevel(level) {
  if (level === 'silly') return -Infinity;
  if (level === 'verbose') return 1000;
  if (level === 'info') return 2000;
  if (level === 'http') return 3000;
  if (level === 'warn') return 4000;
  if (level === 'error') return 5000;
  if (level === 'silent') return Infinity;
}
