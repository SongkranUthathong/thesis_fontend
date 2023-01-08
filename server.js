// server.js
var express = require('express');
var os = require('os');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 8000;
var hostname = os.hostname();

app.listen(port, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });