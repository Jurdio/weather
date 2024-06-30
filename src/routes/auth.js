const express = require("express");
const db = require("../sequelize/models/index");
const { check, body } = require("express-validator");

const authController = require("../controller/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);
router.get("/sign-up", authController.getSignup);
router.post(
  "/sign-up",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return db.User.findOne({ where: { email: value } }).then((userDoc) => {
          if (userDoc) {
            throw new Error(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],

  authController.postSignup
);



router.post('/logout', authController.postLogout);

module.exports = router;
