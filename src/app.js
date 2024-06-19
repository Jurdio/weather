const path = require('path');
const express = require('express');

const router = require('./routes/weather');
const authRouter = require('./routes/auth');

const { sequelize } = require('./sequelize/models/index');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname, 'public')));


app.use(authRouter);
app.use(router);

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(3000);