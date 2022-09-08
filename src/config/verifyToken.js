const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
module.exports = function verifyToken(req, res, next) {
  // Get auth header value
  let token = req.cookies.tokenUser;
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.sendStatus(403);
    }
    next();
  });
};
