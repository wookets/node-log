
var humanize = require('./humanize');

var recording = {};

exports.start = function(name) {
  recording.name = name;
  recording.start = new Date;
  recording.events = [];
}

exports.log = function(category, level, msg, meta, ms) {
  var event = {};
  event.msg = msg;
  event.data = meta;
  event.lapse = humanize(new Date - recording.start);
  recording.events.push(event);
}

exports.end = function (format) {
  recording.end = new Date;
  recording.duration = humanize(recording.end - recording.start);
  if (format) {
    return formatReturn(recording, format);
  }
  return recording;
}


function formatReturn(log, type) {
  var br = '\n';
  if (type === 'html') br = '<br />';
  var result = '';
  if (type === 'html') {
    result += '<b>' + log.name + '</b>';
  } else {
    result += log.name;
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