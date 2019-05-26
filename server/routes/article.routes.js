const multipart = require("connect-multiparty");
const multipartWare = multipart();
const articlecontroller = require("../controllers/article.ctrl");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
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

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "redium",
  allowedFormats: ["jpg", "png"]
});

const parser = multer({ storage: storage });

module.exports = router => {
  /**
   * get all articles
   */
  router.route("/articles").get(articlecontroller.getAll);

  /**
   * add an article authenticated routes
   */
  router
    .route("/article")
    .post(parser.single("image"), checkJwt, articlecontroller.addArticle);

  /**
   * clap on an article authenticated routes
   */
  router.route("/article/clap").post(checkJwt, articlecontroller.clapArticle);

  /**
   * comment on an article  authenticated routes
   */
  router
    .route("/article/comment")
    .post(checkJwt, articlecontroller.commentArticle);

  /**
   * get a particlular article to view
   */
  router.route("/article/:id").get(articlecontroller.getArticle);
};
