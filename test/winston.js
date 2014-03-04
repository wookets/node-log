
var winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {level: 'silly', colorize: true});
winston.cli();

//winston.loggers.add('category1', {
//  console: {
//    level: 'silly',
//    colorize: 'true',
//    label: 'category one',
//    timestamp: false
//  }
//});

winston.info('meow', {some: 'was', hat: 'help'})
winston.verbose('hmmmmmm', {nest: [{apnts: 'ants', jokes: {friends: ['fr']}}]})
winston.silly('hmmmmmm', {nest: [{apnts: 'ants', jokes: {friends: ['fr']}}]})

winston.error('hmmmmmm', {nest: [{apnts: 'ants', jokes: {friends: ['fr']}}]})

var category1 = winston.loggers.get('category1', {console: {colorize: true, label: 'cat1'}});
var category2 = winston.loggers.get('category2');

category1.info('logging from your IoC container-based logger');

category1.info('meta', {some: {some2: 'frost', met: {some: {some: {some: 'data'}}}}})

category1.profile('querying-data');

category1.profile('querying-data');

category2.info('wtf');

var log = function(category) {
  var cat = winston.loggers.get(category, {
    console: {
      colorize: true,
      label: category,
      level: 'silly'
    }
  });
  cat.cli();
  var logger = cat.info;
  logger.info = cat.info;
  logger.silly = cat.silly;
  //var util = require('util');
  //util.inherits(logger, cat);
  return logger;
}

var logx = log('cat1super nogn and stuff');

logx('msg', {data: 'pants'});
logx.silly('meow');
