var ccav = require("./ccavutil.js");

exports.postReq = function (request, response) {
  const IS_PRODUCTION = process.env["IS_PRODUCTION"];
  const PROD_ACCESS_CODE = process.env["PROD_ACCESS_CODE"];
  const DEV_ACCESS_CODE = process.env["DEV_ACCESS_CODE"];
  const PROD_WORKING_KEY = process.env["PROD_WORKING_KEY"];
  const DEV_WORKING_KEY = process.env["DEV_WORKING_KEY"];
  var body = "",
    workingKey = IS_PRODUCTION === "true" ? PROD_WORKING_KEY : DEV_WORKING_KEY,
    accessCode = IS_PRODUCTION === "true" ? PROD_ACCESS_CODE : DEV_ACCESS_CODE, //Put in the Access Code shared by CCAvenues.
    encRequest = "",
    formbody = "";

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
