// nodeJS v16.13.2
var crypto = require("crypto"),
  randomUUID = crypto.randomUUID,
  fs = require("fs"),
  http = require("http"),
  hostname = "localhost",
  port = 3000,
  fileStore = [];

// connect to file store
fs.readFile("./store/index.txt", "utf8", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  fileStore = JSON.parse(data);
  console.log("data store loaded");
});

// routing
http
  .createServer(function (request, response) {
    var url = request.url;

    // trim leading slash
    if (url.length > 1 && url[url.length - 1] === "/") {
      url = url.slice(0, -1);
    }

    // serve static files
    if (url.includes("/public")) {
      console.log("serving", url);
      fs.readFile(__dirname + url, "utf8", function (err, data) {
        if (err) {
          console.error(err);
          response.end();
        }
        response.end(data);
      });
      // GET routes
    } else if (request.method === "GET" && url === "/") {
      console.log("GET", url);
      fs.readFile("index.html", "utf8", function (err, data) {
        if (err) {
          console.error(err);
          response.end(err);
        }
        response.end(data);
      });
    } else if (request.method === "GET" && url === "/api") {
      console.log("GET", url);
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/json");
      response.end(JSON.stringify(fileStore));
      // POST routes
    } else if (request.method === "POST" && url === "/api") {
      console.log("POST", url);
      response.statusCode = 201;
      let body = [];
      request
        .on("data", function (chunk) {
          body.push(chunk);
        })
        .on("end", function () {
          body = toJSON(Buffer.concat(body).toString());
          fileStore.push(body);
          response.end(JSON.stringify(body));
        });
      // 404 route
    } else {
      console.log("404 - NOT FOUND", url);
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(port, hostname, function () {
    console.log("server running on port", port);
  });

// helpers
function toJSON(data) {
  data = data.split("&");
  data = data.reduce(function (prev, curr) {
    var propKey = curr.split("=");
    prev[propKey[0]] = propKey[1];
    return prev;
  }, {});
  data.id = randomUUID();

  return data;
}