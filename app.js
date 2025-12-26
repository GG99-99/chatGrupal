const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const {dbOperator} = require(path.join(__dirname, 'operator', 'dbOperator.js'))

// importar io server
const { io } = require(path.join(__dirname, 'io','io.js'))

// router
let indexRouter = require(path.join(__dirname, 'routes', 'index.js'))

// declarar app
const app = express();


// settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


// definir router para rutas
app.use('/', indexRouter)

let port = 3000;
// server y listen de app
let server = app.listen(port, '0.0.0.0',() => {
    console.log(`Server escuchando en http://localhost:${port}`);
});
// io attach
io.attach(server)


app.set('port', port)