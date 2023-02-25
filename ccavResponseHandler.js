var http = require("http"),
  fs = require("fs"),
  ccav = require("./ccavutil.js"),
  qs = require("querystring");

exports.postRes = function (request, response) {
  var ccavEncResponse = "",
    workingKey = "F93B0142C086CD04398C13D45CD5D76D", //Put in the 32-Bit key shared by CCAvenues.
    ccavResponse = "",
    ccavPOST = "",
    enc = "";

  request.on("data", function (data) {
    ccavEncResponse += data;
    ccavPOST = qs.parse(ccavEncResponse);
    var encryption = ccavPOST.encResp;
    ccavResponse = enc = ccav.decrypt(encryption, workingKey);
  });

  request.on("end", function () {
    var pData = "";
    pData = "<table border=1 cellspacing=2 cellpadding=2><tr><td>";
    pData = pData + ccavResponse.replace(/=/gi, "</td><td>");
    pData = pData.replace(/&/gi, "</td></tr><tr><td>");
    pData = pData + "</td></tr></table>";
    htmlcode =
      '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' +
      pData +
      "</center><br></body></html>";

    var final = ccavResponse.replace(/=/gi, ":");
    var nFinal = final.replace(/&/gi, ",");
    var data1 = ccav.getJsonData(nFinal);
    console.log(
      "🚀 ~ file: ccavResponseHandler.js:34 ~ data1:",
      data1.merchant_param2
    );
    if (data1.merchant_param2 === "localhost") {
      response
        .writeHead(301, {
          Location: `http://localhost:3000/orderSuccess/?${nFinal}`,
        })
        .end();
      response.end();
    } else {
      response
        .writeHead(301, {
          Location: `https://${data1.merchant_param}/orderSuccess/?${nFinal}`,
        })
        .end();
    }
  });
};
