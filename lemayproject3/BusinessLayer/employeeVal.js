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

function checkEmployeeGet(company, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id) {
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
    var chkNo = dl.getEmployeeNo(emp_no);
    var chkDpt = dl.getDepartment(company, dept_id);
    var chkMng = dl.getEmployee(mng_id);
    var chkEmp = dl.getAllEmployee(company);
    // HireDate before current date
    // HireDate on a Weekday
    // empID unique across all companies

    if (company.length < 1) {
        return false;
    }
    else if (emp_name.length < 1) {
        return false;
    }
    else if (emp_no.length < 1) {
        return false;
    }
    // else if (HireDate) {
    //     return false;
    // }
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

module.exports = {checkEmployeesGet, checkEmployeeGet, checkEmployeePost};