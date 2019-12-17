var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const admin = require('firebase-admin');
const config = require('./config/config.json');
admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: "https://harleys-server.firebaseio.com"
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/order');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/order', orderRouter);

module.exports = app;
