const { validateSession } = require("../service/session");

module.exports = (req, res, next) => {
  const sessionId = req.cookies.session_id; // Отримуємо ідентифікатор сесії з кукі
  if (!sessionId || !validateSession(sessionId)) {
    // Перевіряємо, чи існує кукі та чи дійсна сесія
    return res.redirect("/login");
  }
  next();
};
