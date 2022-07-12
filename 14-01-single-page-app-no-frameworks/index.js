// nodeJS v16.13.2
var crypto = require('crypto'),
  randomUUID = crypto.randomUUID,
  fs = require('fs'),
  http = require('http'),
  database = [
    { name: 'Steven', hobbies: ['golf', 'fishing'], id: randomUUID() },
    { name: 'Stephanie', hobbies: ['tennis', 'hunting'], id: randomUUID() }
  ];

// routing

http
  .createServer(function (request, response) {
    var url = request.url;

    if (url.length > 1 && url[url.length - 1] === '/') {
      url = url.slice(0, -1);
    }

    if (request.method === 'GET' && url === '/') {
      fs.readFile('index.html', 'utf8', function (err, data) {
        if (err) {
          console.error(err);
          response.end(err);
        }
        response.end(data);
      });
    } else if (request.method === 'GET' && url === '/api') {
      response.end(JSON.stringify(database));
    } else if (request.method === 'POST' && url === '/api') {
      let body = [];
      request
        .on('data', function (chunk) {
          body.push(chunk);
        })
        .on('end', function () {
          body = toJSON(Buffer.concat(body).toString());
          database.push(body);
          response.end(JSON.stringify(body));
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(3000);

// helpers

function toJSON(data) {
  data = data.split('&');
  data = data.reduce(function (prev, curr) {
    var propKey = curr.split('=');
    prev[propKey[0]] = propKey[1];
    return prev;
  }, {});
  data.hobbies = [data.hobbies];
  data.id = randomUUID();

  return data;
}
