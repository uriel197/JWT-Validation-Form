const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {   /* note */
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

***Note: it makes a significant difference whether you include the space after "Bearer" or not in the startsWith method.

In your authenticationMiddleware function, the purpose of checking if the Authorization header starts with "Bearer " is to ensure that the header is properly formatted as a Bearer token. According to the standard format for Bearer tokens, there should be a space between "Bearer" and the actual token string.

Here's a detailed explanation:

With the space ("Bearer "):

if (!authHeader || !authHeader.startsWith("Bearer ")) {
This correctly checks if the Authorization header starts with "Bearer " (with a space), which is the correct format. For example, given the header:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
The check authHeader.startsWith("Bearer ") will return true, and your code will correctly proceed to extract the token.

Without the space ("Bearer"):

if (!authHeader || !authHeader.startsWith("Bearer")) {
This will check if the Authorization header starts with "Bearer" (without a space). While this might seem like it will work, it can lead to false positives. For example, given the header:

Authorization: BearerTokenExample
The check authHeader.startsWith("Bearer") will return true, even though the header is not in the correct format, which can cause issues when you try to split and extract the token.

*** NOTE: this function is the authorization function which we can pass anywhere we need an authorization. as we are passing to the dashboard() inside routes/main.
 
*** 1: authHeader.split(' ')[0] would be "Bearer".

***2: we are passing this to the next() function which is the dashboard() in the controllers/main.

*/
