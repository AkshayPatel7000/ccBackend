var crypto = require("crypto");
exports.encrypt = function (plainText, workingKey) {
  try {
    var m = crypto.createHash("md5");
    m.update(workingKey);
    var key = Buffer.from(m.digest("binary").substring(0, 32), "binary");
    var iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
    var cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    var encoded = cipher.update(plainText, "utf8", "hex");
    encoded += cipher.final("hex");
    return encoded;
  } catch (error) {
    console.log("error", error);
  }
};

exports.getJsonData = function (query) {
  let arrayOfKeyValues = query.split(",");
  let modifiedArray = new Array();

  for (let i = 0; i < arrayOfKeyValues.length; i++) {
    let arrayValues = arrayOfKeyValues[i].split(":");
    let arrayString =
      '"' + arrayValues[0] + '"' + ":" + '"' + arrayValues[1] + '"';
    modifiedArray.push(arrayString);
  }
  let jsonDataString = "{" + modifiedArray.toString() + "}";
  let jsonData = JSON.parse(jsonDataString);

  return jsonData;
};

exports.decrypt = function (encText, workingKey) {
  var m = crypto.createHash("md5");
  m.update(workingKey);
  var key = Buffer.from(m.digest("binary").substring(0, 32), "binary");

  var iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
  var decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  var decoded = decipher.update(encText, "hex", "utf8");
  decoded += decipher.final("utf8");
  // console.log("🚀 ~ file: ccavutil.js:19 ~ decoded", decoded);

  return decoded;
};
