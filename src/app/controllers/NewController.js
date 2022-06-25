class NewController {
  index(req, res) {
    res.render("news");
  }
  show(req, res) {
    res.send("DETAIL NEWS");
  }
}

module.exports = new NewController();
