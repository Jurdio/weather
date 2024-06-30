require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../sequelize/models/index");
const { createSession, deleteSession } = require("../service/session");



exports.getLogin = (req, res) => {
  res.render("login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: null,
    oldInput: {
      email: "",
      password: "",
    },
  });
};
exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        console.log(`User not found for email: ${email}`);
        return res.status(422).render("login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Invalid email or password.",
          oldInput: {
            email: email,
            password: password,
          },
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            createSession(user.id) 
              .then((sessionId) => {
                res.cookie("session_id", sessionId, {
                  httpOnly: true,
                  secure: true,
                }); 
                res.redirect("/");
              })
              .catch((err) => {
                console.log("Error creating session:", err);
                res.status(500).send("Server error");
              });
          } else {
            console.log("Password does not match for user:", email);
            return res.status(422).render("login", {
              path: "/login",
              pageTitle: "Login",
              errorMessage: "Invalid email or password.",
              oldInput: {
                email: email,
                password: password,
              },
            });
          }
        })
        .catch((err) => {
          console.log("Error comparing password:", err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log("Error finding user:", err));
};
exports.getSignup = (req, res) => {
  res.render("signup", {
    pageTitle: "Signup",
    errorMessage: null,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};
exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      return db.User.create({
        email: email,
        password: hashedPassword,
      });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res) => {
  deleteSession(req.cookies['session_id'])
    .then(() => {
      res.clearCookie('session_id');
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error deleting session from database:", err);
      res.status(500).send("An error occurred.");
    });
};
