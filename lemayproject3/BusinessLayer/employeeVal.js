var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(cookieParser());
app.use(express.static('public'));
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

function checkEmployeesGet(company) {
    if (company.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

function checkEmployeeGet(company, emp_id) {
    if (company.length < 1) {
        return false;
    }
    else if (emp_id < 1) {
        return false;
    }
    else {
        return true;
    }
}

function checkEmployeePost(company, empl_id, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id) {
    var chkNo = dl.getEmployeeNo();
}

module.exports = {checkEmployeesGet, checkEmployeeGet, checkEmployeePost};