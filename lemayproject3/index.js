var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { application } = require('express');
var router = express.Router();

var session = require('express-session');

var FileStore = require('session-file-store')(session);

var DataLayer = require("./companydata/index.js");
var dl = new DataLayer("ahl4753");

var useDomainForCookies = process.env.DOMAIN || false;
var host = process.env.HOST || 'localhost';

// Windows: set DEBUG=lemayproject2:* & npm start
// PowerShell: $env:DEBUG='lemayproject2:*'; npm start
// Unix: DEBUG=lemayproject2:* npm start

var companyRouter = require('./routes/company');

var departmentsRouter = require('./routes/departments');
var departmentRouter = require('./routes/department');

var employeesRouter = require('./routes/employees');
var employeeRouter = require('./routes/employee');

var timecardsRouter = require('./routes/timecards');
var timecardRouter = require('./routes/timecard');

var app = express();

app.set('host', host);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({

  // store: new FileStore(), //default is memory, file-store is better,  MongoDB or Redis are best

  secret: 'ssshhhh', //value is used for signing of the session id stored in cookie

  saveUninitialized: false, //won't force a new, unmodified session to be saved

  resave: false,

  cookie: { //defines the behavior of the session cookie

    path: "/",

    httpOnly: true,

    sameSite: true, //never send outside with CORS

    domain: useDomainForCookies ? host : undefined,

    secure: false, //would want true in production

    maxAge: 1800000 //30 minutes

  },

  name: "id" //obfuscate the underlying session mechanism

}));

app.use(router);

app.get('/', function initViewsCount(req, res, next){
  res.json({
    message: "Hello INDEX"
  });
  return next();
});

app.use('/company', companyRouter);

app.get('/departments', departmentsRouter);
app.get('/department', departmentRouter);
app.post('/department', departmentRouter);
app.put('/department', departmentRouter);
app.delete('/department', departmentRouter);

app.get('/employees', employeesRouter);
app.get('/employee', employeeRouter);
app.post('/employee', employeeRouter);
app.put('/employee', employeeRouter);
app.delete('/employee', employeeRouter);

app.get('/timecards', timecardsRouter);
app.get('/timecard', timecardRouter);
app.post('/timecard', timecardRouter);
app.put('/timecard', timecardRouter);
app.delete('/timecard', timecardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;

var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server running at http://%s:%s", host, port);
});