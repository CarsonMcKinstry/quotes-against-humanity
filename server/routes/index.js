const cards = require("./cards");

module.exports = app => {
  app.get("/api/build", cards.getFullText);
  app.get("/api/white", cards.getWhiteCards);
  app.get("/api/black", cards.getBlackCard);
};
