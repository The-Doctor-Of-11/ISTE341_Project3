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

function checkEmployeePost(company, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id) {
    var chkNo = dl.getAllEmployee(company);
    var chkDpt = dl.getDepartment(company, dept_id);
    var chkMng = dl.getEmployee(mng_id);
    var chkEmp = dl.getAllEmployee(company);
    
    // HireDate before current date
    var hDate = new Date(hire_date);
    var date = new Date();
    var tDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    // HireDate on a Weekday
    var wDay = hDate.getUTCDay();

    if (company.length < 1) {
        return false;
    }
    else if (emp_name.length < 1) {
        return false;
    }
    else {
        chkNo.forEach(n => {
            if (n.emp_no == emp_no) {
                return false;
            }
        });
    }
    if (hDate > tDate) {
        return false;
    }
    else if (wDay == 0 || wDay == 6) {
        return false;
    }
    else if (job.length < 1) {
        return false;
    }
    else if (salary < 1) {
        return false;
    }
    else if (dept_id.length < 1) {
        return false;
    }
    else if (mng_id.length < 1) {
        return false;
    }
    else if (!chkNo) {
        return false;
    }
    else if (!chkDpt) {
        return false;
    }
    else if (!chkMng) {
        return false;
    }
    else if (!chkEmp) {
        return false;
    }
    else {
        return true;
    }
}

function checkEmployeePut(company, emp_id, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id) {
    var chkNo = dl.getAllEmployee(company);
    var chkDpt = dl.getDepartment(company, dept_id);
    var chkMng = dl.getEmployee(mng_id);
    var chkEmp = dl.getAllEmployee(company);
    var chkID = dl.getEmployee(emp_id);
    // HireDate before current date
    var hDate = new Date(hire_date);
    var date = new Date();
    var tDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    // HireDate on a Weekday
    var wDay = hDate.getUTCDay();

    if (company.length < 1) {
        return false;
    }
    else if (emp_name.length < 1) {
        return false;
    }
    else if (!chkID) {
        return false;
    }
    else {
        chkNo.forEach(n => {
            if (n.emp_no == emp_no) {
                return false;
            }
        });
    }
    if (hDate > tDate) {
        return false;
    }
    else if (wDay == 0 || wDay == 6) {
        return false;
    }
    else if (job.length < 1) {
        return false;
    }
    else if (salary < 1) {
        return false;
    }
    else if (dept_id.length < 1) {
        return false;
    }
    else if (mng_id.length < 1) {
        return false;
    }
    else if (!chkNo) {
        return false;
    }
    else if (!chkDpt) {
        return false;
    }
    else if (!chkMng) {
        return false;
    }
    else if (!chkEmp) {
        return false;
    }
    else {
        return true;
    }
}

function checkEmployeeDelete(emp_id) {
    if (emp_id < 1) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = {checkEmployeesGet, checkEmployeeGet, checkEmployeePost, checkEmployeePut, checkEmployeeDelete};