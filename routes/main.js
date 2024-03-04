const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.route("/dashboard").get(authMiddleware, dashboard); /* 1 */
router.route("/login").post(login);

module.exports = router;

/*********** COMMENTS **********

***1: the authMiddleware function is the authorization function which we wrote in ./middleware/auth which we can pass anywhere we need an authorization. as we are passing here to the dashboard(). make sure we pass it before the actual dashboard, that way it checks for authorization first and if there is, it goes to the dashboard().

*/
