var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
app.use(cookieParser());
app.use(express.static('public'));
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

// GET DEPARTMENTS
function checkDepartmentsGet(company) {
    if (company.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

// GET DEPARTMENT
function checkDepartmentGet(company, dept_id) {
    if (company.length < 1) {
        return false;
    }
    else if (dept_id < 1) {
        return false;
    }
    else {
        return true;
    }
}

// NEW DEPARTMENT
function checkDepartmentPost(company, dept_name, dept_no, location) {
    var chkNo = dl.getDepartmentNo(company, dept_no);
    if (company.length < 1) {
        return false;
    }
    else if (dept_name.length < 1) {
        return false;
    }
    else if (dept_no < 1) {
        return false;
    }
    else if (chkNo) {
        return false;
    }
    else if (location.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

// UPDATE DEPARTMENT
function checkDepartmentPut(company, dept_id, dept_name, dept_no, location) {

    var chkNo = dl.getDepartmentNo(company, dept_no);
    var chkId = dl.getDepartment(company, dept_id);

    if (company.length < 1) {
        return false;
    }
    else if (dept_id < 1) {
        return false;
    }
    else if (chkNo != null) {
        return false;
    }
    else if (chkId.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

// DELETE DEPARTMENT
function checkDepartmentDelete(company, dept_id) {
    if (company.length < 1) {
        return false;
    }
    else if (dept_id < 1) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = {checkDepartmentGet, checkDepartmentsGet, checkDepartmentPut, checkDepartmentPost, checkDepartmentDelete};