
var colors = require('colors');
var humanize = require('./humanize');
var pad = require('./pad');

var loggers = {};

module.exports = function(category, level, msg, meta, ms) {
  // if exception
  if (msg instanceof Error) {
    level = 'error';
    if (msg.fail) {
      level = 'warn';
    }
    msg = msg.stack || msg.message;
    msg = msg.replace(/\n/g, '\n         ');
  }

  // format category
  if (category.length > 8) {
    category = category.substring(0, 8);
  } else {
    category = pad(category, 8, ' ', 1);
  }

  // color category
  if (level === 'info') {
    category = category.blue;
  }
  else if (level === 'warn') {
    category = category.yellow;
  }
  else if (level === 'error') {
    category = category.red;
  }
  else if (level === 'verbose') {
    category = category.grey;
  }

  // add separation
  category += '  ';

  // color ms
  if (ms !== 0) {
    ms = humanize(ms).green;
    ms = '  ' + ms;
  } else {
    ms = '';
  }

  // drain to console
  console.log(category + msg + ms);
  if (meta) {
    console.log(pad('', 10), meta);
  }
}