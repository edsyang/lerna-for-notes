const server = require('./server');
const { route } = require('./router');
const { start, upload, show } = require('./requestHandler');

const handle = {};

handle['/'] = start;
handle['/start'] = start;
handle['/upload'] = upload;
handle['/show'] = show;

server.start(8080, route, handle);