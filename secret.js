const crypto = require("crypto");

const secret = "Kilyan Mbappe";
const secret2 = "Es una rata";

const hash = crypto.createHmac("sha256", secret).update(secret2).digest("hex");

const secretRefresh = "Arda Guler";
const secretRefresh2 = "Es GOD";

const hashRefresh = crypto
  .createHmac("sha256", secretRefresh)
  .update(secretRefresh2)
  .digest("hex");

// console.log(hash);
// console.log(hashRefresh);
