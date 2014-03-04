
var winston = require('winston');

var config = require(__dirname + '/../../config.json');
if (!config) throw Error('You need a config.json file in the root of your project.');
if (!config.logger) throw Error('You need a logger property in config.json.');

module.exports = function(category) {
  var config = log.config;
  config.transports.console.label = category;
  var cat = winston.loggers.get(category, config.transports);
  if (config.transports.console) {
    cat.cli();
  }

  var logger = cat.info;
  logger.silly = cat.silly;
  logger.verbose = cat.verbose;
  logger.info = cat.info;
  logger.warn = cat.warn;
  logger.error = cat.error;
  logger.profile = cat.profile;
  logger.cat = cat;

  return logger;
}