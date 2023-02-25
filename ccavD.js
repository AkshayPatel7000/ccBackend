var http = require("http"),
  fs = require("fs"),
  ccav = require("./ccavutil.js"),
  qs = require("querystring");

exports.postDyc = function (request, response) {
  var ccavEncResponse = "",
    workingKey = "F93B0142C086CD04398C13D45CD5D76D", //Put in the 32-Bit key shared by CCAvenues.
    ccavResponse = "",
    ccavPOST = "";
  try {
    request.on("data", function (data) {
      ccavEncResponse += data;
      ccavPOST = qs.parse(ccavEncResponse);
      var encryption = ccavPOST.encResp;
      // console.log("🚀 ~ file: ccavD.js:16 ~ encryption", encryption);
      ccavResponse = ccav.decrypt(encryption, workingKey);
      ccavResponse.replace(/=/gi, "</td><td>");
      console.log("🚀 ~ file: ccavD.js:19 ~ ccavResponse", ccavResponse);
    });

    request.on("end", function () {
      response.writeHeader(200, { "Content-Type": "text/html" });
      response.write(ccavResponse);
      response.end();
    });
  } catch (error) {
    console.log("🚀 ~ file: ccavD.js:24 ~ error", error);
  }
};
