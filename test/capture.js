
var wrap = require('wrap');

var log = function(category) {

  function before(msg, data) {
    if (log.record.name) {
      var event = {};
      event.msg = msg;
      event.data = data;
      event.lapse = formatDuration(new Date - log.start);
      log.events.push(event);
      log.end = new Date;
      log.duration = formatDuration(log.end - log.start);
      log.record.events.push(msg);
    }
  }
  var logger = wrap(function(msg) {
    console.log('msg: ' + msg);
  }, before);
  logger.capture = log.capture;
  logger.report = function(type) { return log.record };
  return logger;
}

log.record = {};

log.capture = function(name) {
  log.record = {
    name: name,
    start: new Date,
    end: null,
    duration: null,
    events: []
  };
}

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

function format(log, type) {
  var br = '\n';
  if (type === 'html') br = '<br />';
  var result = '';
  if (type === 'html') {
    result += '<b>' + log.category + '</b>';
  } else {
    result += log.category;
  }
  result += br;
  if (type === 'html') result += br;
  for (var i=0; i < log.events.length; i++) {
    result += (i+1) + '. ' + log.events[i].msg + ' [' + log.events[i].lapse + ']' + br;
    if (log.events[i].data !== undefined) {
      if (log.events[i].data instanceof Error) {
        result += '   ' + log.events[i].data + br;
      } else {
        result += '   ' + JSON.stringify(log.events[i].data) + br;
      }
    }
  }
  if (type === 'html') result += br;
  result += 'Took ' + log.duration
  return result;
}

var lo = log('meow');
lo('no capture');
lo.capture('a new report starts');
lo('meow pants');
console.log('report', lo.report());