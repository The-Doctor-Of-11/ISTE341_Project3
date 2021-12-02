var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/departmentVal.js');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

/* GET department */
router.get('/department/:company/:dept_id', function(req, res, next) {
    let dept = bl.checkDepartmentGet(req.params.company);
    
    if (dept) {

        dept = dl.getDepartment(req.params.company, req.params.dept_id);

        var response;
        if (dept) {
            if (dept == null) {
                response = {
                    error: "Department Not Found"
                }
            }
            else {
                response = {
                    dept_id: dept.dept_id,
                    company: dept.company,
                    dept_name: dept.dept_name,
                    dept_no: dept.dept_no,
                    location: dept.location
                }
            }
        }
        else {
            response = {
                error: "No Departments Found"
            }
        }
    }
    else {
        response = {
            error: "Error in Department Input"
        }
    }
    res.send(response);
});

router.put('/department/:company/:dept_id/:dept_name/:dept_no/:location', function(req, res, next) {
    let dept = bl.checkDepartmentPut(req.params.company, req.params.dept_id, req.params.dept_name, req.params.dept_no, req.params.location);

    if (dept) {
        dept = dl.insertDepartment(req.params.company, req.params.dept_id, req.params.dept_name, req.params.dept_no, req.params.location);
        var response;
        if (dept) {
            if (dept == null) {
                response = {
                    error: "Department Failed to Insert"
                }
            }
            else {
                response = {
                    dept_id: dept.dept_id,
                    company: dept.company,
                    dept_name: dept.dept_name,
                    dept_no: dept.dept_no,
                    location: dept.location
                }
            }
        }
        else {
            response = {
                error: "Department Failed to Insert"
            }
        }
    }
    else {
        response = {
            error: "Error in Department Input"
        }
    }
    res.send(response);
});

router.post('/department/:company/:dept_id/:dept_name/:dept_no/:location', function(req, res, next) {
    let dept = bl.checkDepartmentPost(req.params.company, req.params.dept_id, req.params.dept_name, req.params.dept_no, req.params.location);

    if (dept) {
        dept = dl.updateDepartment(req.params.company, req.params.dept_id, req.params.dept_name, req.params.dept_no, req.params.location);
        var response;
        if (dept) {
            if (dept == null) {
                response = {
                    error: "Department Failed to Update"
                }
            }
            else {
                response = {
                    dept_id: dept.dept_id,
                    company: dept.company,
                    dept_name: dept.dept_name,
                    dept_no: dept.dept_no,
                    location: dept.location
                }
            }
        }
        else {
            response = {
                error: "Department Failed to Update"
            }
        }
    }
    else {
        response = {
            error: "Error in Department Input"
        }
    }
    res.send(response);
});

module.exports = router;