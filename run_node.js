var express = require("express");
var cors = require("cors");
var app = express();
var http = require("http"),
  fs = require("fs"),
  ccav = require("./ccavutil.js"),
  qs = require("querystring"),
  ccavReqHandler = require("./ccavRequestHandler.js"),
  ccavResHandler = require("./ccavResponseHandler.js"),
  ccavD = require("./ccavD.js");

app.use(express.static("public"));
app.use(cors());
app.set("views", __dirname + "/public");
app.engine("html", require("ejs").renderFile);

app.get("/", function (req, res) {
  res.render("dataFrom.html");
});

app.post("/ccavRequestHandler", function (request, response) {
  ccavReqHandler.postReq(request, response);
});

app.post("/ccavResponseHandler", function (request, response) {
  ccavResHandler.postRes(request, response);
});

app.post("/decrypt", function (request, response) {
  ccavD.postDyc(request, response);
});
app.listen(3001);
