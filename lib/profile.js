
var timestamps = {}; // tracks how long has lapsed between logs of same category

module.exports = function(category) {
  var curr = new Date;
  var ms = curr - (timestamps[category] || curr);
  timestamps[category] = curr;
  return ms;
}