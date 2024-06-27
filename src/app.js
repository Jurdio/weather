const path = require('path');
const express = require('express');


const weatherRouter = require('./routes/weather');
const authRouter = require('./routes/auth');

const flash = require('connect-flash');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(authRouter);
app.use(weatherRouter);



sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(3000);