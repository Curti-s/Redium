const userRoutes = require("./user.routes");
const articleRoutes = require("./article.routes");

module.exports = router => {
  userRoutes(router);
  articleRoutes(router);
};
