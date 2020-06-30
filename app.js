const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config/config');
const app = express();

const userRoute = require('./app/routes/users')
const articleRoute = require('./app/routes/article')
const authRoute = require('./app/routes/auth')

const host = config.database.connection.host;
const port = config.database.connection.port;
const dbName = config.database.connection.database;
const client = config.database.client;
const database = `${client}://${host}:${port}/${dbName}`;
mongoose.connect(database, {useNewUrlParser: true} , (err) => {
    if (err) console.log(err);
})

app
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json());

app
  .use('/auth', authRoute)
  .use('/users', userRoute)
  .use('/article',articleRoute);

app.listen(config.api.port, () => {
  console.log('*** Server Started ***');
});