var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(cookieParser());
app.use(express.static('public'));

module.exports = function checkEmployeesGet(company) {
    if (length(company) < 1) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = function checkEmployeeGet(company, emp_id) {
    if (length(company) < 1) {
        return false;
    }
    else if (emp_id < 1) {
        return false;
    }
    else {
        return true;
    }
}