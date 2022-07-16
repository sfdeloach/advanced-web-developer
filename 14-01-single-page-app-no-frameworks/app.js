// nodeJS v16.13.2
var randomUUID = require('crypto').randomUUID,
  fs = require('fs'),
  http = require('http'),
  hostname = 'localhost',
  port = 3000,
  localStore = [],
  fileStore = './store/store.json';

// connect to file store
fs.readFile(fileStore, 'utf8', function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  localStore = JSON.parse(data);
  console.log('data store loaded');
});

// routing
http
  .createServer(function (request, response) {
    var url = request.url;

    // trim leading slash
    if (url.length > 1 && url[url.length - 1] === '/') {
      url = url.slice(0, -1);
    }

    // serve static files
    if (url.includes('/public')) {
      console.log('serving', url);
      fs.readFile(__dirname + url, 'utf8', function (err, data) {
        if (err) {
          console.error(err);
          response.end();
        }
        response.end(data);
      });
      // GET routes
    } else if (request.method === 'GET' && url === '/') {
      console.log('GET', url);
      fs.readFile('index.html', 'utf8', function (err, data) {
        if (err) {
          console.error(err);
          response.end(err);
        }
        response.end(data);
      });
    } else if (request.method === 'GET' && url === '/api') {
      console.log('GET', url);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/json');
      response.end(JSON.stringify(localStore));
      // POST routes
    } else if (request.method === 'POST' && url === '/api') {
      console.log('POST', url);
      response.statusCode = 201;

      let body = [];
      request
        .on('data', function (chunk) {
          body.push(chunk);
        })
        .on('end', function () {
          // add new assignment to store
          body = JSON.parse(Buffer.concat(body).toString());
          body.id = randomUUID();
          localStore.push(body);

          // save store to file
          fs.writeFile(fileStore, JSON.stringify(localStore), function (err) {
            if (err) {
              console.error(err);
            } else {
              response.end(JSON.stringify(body));
            }
          });
        });
      // DELETE routes
    } else if (request.method === 'DELETE' && url === '/api') {
      console.log('DELETE', url);
      response.statusCode = 202;

      let id = [];
      request
        .on('data', function (chunk) {
          id.push(chunk);
        })
        .on('end', function () {
          // use id to locate index to remove from store
          id = Buffer.concat(id).toString();
          var index = localStore
            .map(function (assignment) {
              return assignment.id;
            })
            .indexOf(id);
          localStore.splice(index, 1);

          // save store to file
          fs.writeFile(fileStore, JSON.stringify(localStore), function (err) {
            if (err) {
              console.error(err);
            } else {
              response.end(JSON.stringify({ removed: id }));
            }
          });
        });
      // 404 route
    } else {
      console.log('404 - NOT FOUND', url);
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(port, hostname, function () {
    console.log('server running on port', port);
  });
