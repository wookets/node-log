
var winston = require('winston');
var wrap = require('wrap');

var config = {
  cli: true,
  transports: {
    console: {
      "colorize": true,
      "level": "silly"
    }
  }

};

var log = function(category) {
  config.transports.console.label = category;
  var cat = winston.loggers.get(category, config.transports);
  delete config.transports.console.label;
  if (config.transports.console) {
    cat.cli();
  }

  function before(msg, data) {
    if (!log.recording) return;
    var event = {};
    event.msg = msg;
    if (data != null) event.data = data;
    event.lapse = formatDuration(new Date - log.report.start);
    log.report.events.push(event);
    log.report.end = new Date;
    log.report.duration = formatDuration(log.report.end - log.report.start);
  }

  var logger = wrap(cat.info, before);
  logger.silly = wrap(cat.silly, before);
  logger.verbose = wrap(cat.verbose, before);
  logger.info = wrap(cat.info, before);
  logger.warn = wrap(cat.warn, before);
  logger.error = wrap(cat.error, before);
  logger.profile = cat.profile;
  logger.cat = cat;
  logger.capture = log.capture;
  logger.clear = log.clear;
  logger.report = function() { return log.report; };
  return logger;
}

log.report = {events: []};

log.capture = function(name) {
  log.report.name = name;
  log.report.start = new Date;
  log.recording = true;
}

log.clear = function() {
  log.report = {events: []};
  log.recording = false;
}

log.setup = function(config) {
  config = config;
}

module.exports = log;


// pass in duration in milliseconds and get back a human readible string
function formatDuration(duration) {
  if (duration < 1000) {
    duration += 'ms';
  } else if (duration > 1000) {
    duration /= 1000;
    duration += 's';
  }
  return duration;
}