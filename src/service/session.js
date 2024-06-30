const crypto = require("crypto");
const db = require("../sequelize/models/index");

const ONE_HOUR = 60 * 60 * 1000;

async function createSession(userId) {
  let uuid = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + ONE_HOUR);

  const session = await db.Session.create({
    id: uuid,
    userId,
    expiresAt,
  });
  return session.id;
}
async function deleteSession(sessionId) {
  await db.Session.destroy({
    where: {
      id: sessionId,
    },
  });
}

async function validateSession(sessionId) {
  const session = await db.Session.findByPk(sessionId);
  if (!session) {
    return false;
  }
  if (session.expiresAt < new Date()) {
    await db.Session.destroy({ where: { id: sessionId } });
    return false;
  }
  return true;
}
const sessionFunctions = {
  createSession,
  deleteSession,
  validateSession,
};

module.exports = sessionFunctions;
