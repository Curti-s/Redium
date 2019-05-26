const usercontroller = require("../controllers/user.ctrl");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://kirimi.auth0.com/.well-know/jwks.json`
  }),

  // validate the audience & the issuer
  audience: "bl7UPdeRY4PUGm2VtL4zfz0GOobGJjWC",
  issuer: `https://kirimi.auth0.com`,
  algorithms: ["RS256"]
});

module.exports = router => {
  // get all users
  router.route("/users").get(usercontroller.getUsers);
  // get a user
  router.route("/user/:id").get(usercontroller.getUser);
  // get user profile
  router.route("/user/profile/:id").get(usercontroller.getUserProfile);
  // add a user (authenticated routes)
  router.route("/user").post(checkJwt, usercontroller.addUser);
  // follow a user (authenticated routes)
  router.route("/user/follow").post(checkJwt, usercontroller.followUser);
};
