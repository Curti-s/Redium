const multipart = require("connect-multiparty");
const multipartWare = multipart();
const articlecontroller = require("../controllers/article.ctrl");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

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
   * add an article
   */
  router
    .route("/article")
    .post(parser.single("image"), articlecontroller.addArticle);

  /**
   * clap on an article
   */
  router.route("/article/clap").post(articlecontroller.clapArticle);

  /**
   * comment on an article
   */
  router.route("/article/comment").post(articlecontroller.commentArticle);

  /**
   * get a particlular article to view
   */
  router.route("/article/:id").get(articlecontroller.getArticle);
};
