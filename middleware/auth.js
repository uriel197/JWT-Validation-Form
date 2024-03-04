const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided!");
  }

  const token = authHeader.split(" ")[1]; /* 1 */

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // { id: 4, username: 'mono', iat: 1709548226, exp: 1712140226 }
    const { id, username } = decoded;
    req.user = { id, username }; /* 2 */
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;

/************* COMMENTS *************

*** NOTE: this function is the authorization function which we can pass anywhere we need an authorization. as we are passing to the dashboard() inside routes/main.
 
*** 1: authHeader.split(' ')[0] would be "Bearer".

***2: we are passing this to the next() function which is the dashboard() in the controllers/main.

*/
