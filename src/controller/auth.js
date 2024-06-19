exports.getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Login",
  });
};
exports.postLogin = (req, res) => {
  res.redirect("/");
};
exports.getSignup = (req, res) => {
  res.render("signup", {
    pageTitle: "Register",
  });
};
exports.postSignup = (req, res) => {
  res.redirect("/");
};
