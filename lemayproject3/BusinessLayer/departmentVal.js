var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(cookieParser());
app.use(express.static('public'));

module.exports = function checkDepartmentsGet(company) {
    if (length(company) < 1) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = function checkDepartmentGet(company, dept_id) {
    if (length(company) < 1) {
        return false;
    }
    else if (dept_id < 1) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = function checkDepartmentPut(company, dept_id, dept_name, dept_no, location) {

}

module.exports = function checkDepartmentPost(company, dept_id, dept_name, dept_no, location) {

}