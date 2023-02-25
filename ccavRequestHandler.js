var ccav = require("./ccavutil.js");

exports.postReq = function (request, response) {
  var body = "",
    workingKey = "F93B0142C086CD04398C13D45CD5D76D", //Put in the 32-Bit key shared by CCAvenues.
    accessCode = "AVBE21KB97BJ46EBJB", //Put in the Access Code shared by CCAvenues.
    encRequest = "",
    formbody = "";
  var url = request.headers;
  console.log("🚀 ~ file: ccavRequestHandler.js:10 ~ url:", url);
  request.on("data", function (data) {
    body += data;
    encRequest = ccav.encrypt(body, workingKey);

    formbody =
      '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
      encRequest +
      '"><input type="hidden" name="access_code" id="access_code" value="' +
      accessCode +
      '"><script language="javascript">document.redirect.submit();</script></form>';
  });

  request.on("end", function () {
    response.writeHeader(200, { "Content-Type": "application/json" });
    response.write(encRequest);
    response.end();
  });
  return;
};
