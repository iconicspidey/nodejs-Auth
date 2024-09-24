const express = require("express");
const signIn = require("../controllers/loginRoute");
const signUp = require("../controllers/signUpRoute");
const getUser = require("../controllers/user");
const { remove, makeAdmin } = require("../auth/adminAuth");
const logout = require("../controllers/logout");
const router = express.Router();

router.route("/user").get(getUser);
router.route("/logout").get(logout);
router.route("/sign_up").post(signUp);
router.route("/sign_in").post(signIn);
router.route("/makeadmin/:id").patch(makeAdmin);
router.route("/:id").delete(remove);
module.exports = router;
//
