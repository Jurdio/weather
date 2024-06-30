const crypto = require('crypto');
const {db} = require('../sequelize/models/index');



async function createSession(userId) {
    let uuid = crypto.randomUUID();
  const session = await db.Session.create({ crypto.randomUUID(),
    userId });
  return session;
}