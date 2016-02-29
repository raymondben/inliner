module.exports = resolve;
var debug = require('debug')('inliner');

function resolve(inliner, todo, $) {
  debug('start %s iframes', todo.length);
  return todo.map(function iframes(iframe) {
    var url = $(iframe).attr('src');
    url = inliner.resolve(inliner.url, url);
    if (url.indexOf('http') === 0) {
	inliner.emit('progress', 'skipping external iframe src ' + url);
    } else {
	inliner.emit('progress', 'processing iframe src ' + url);
	debug("processing iframe src " + url);
	return inliner.get(url).then(function then(res) {
	    var ifr = res.body;
	    inliner.jobs.done.iframes();
	    ifr=ifr.toString("base64");
	    $(iframe).attr("src","data:text/html;base64," + ifr);
	});
    }
  });
}
