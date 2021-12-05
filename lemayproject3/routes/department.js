var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/departmentVal');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// GET DEPARTMENT | DONE, TESTED
router.get('/department', function(req, res, next) {
    let dept = bl.checkDepartmentGet(req.query.company, req.query.dept_id);
    var response;

    if (dept) {
        dept = dl.getDepartment(req.query.company, req.query.dept_id);
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

// NEW DEPARTMENT | DONE, TESTED
router.post('/department', function(req, res, next) {
    let dept = bl.checkDepartmentPost(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location);
    var response;

    if (dept) {
        var tdept = new dl.Department(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location);
        dept = dl.insertDepartment(tdept);
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

// UPDATE DEPARTMENT | DONE, TESTED
router.put('/department', function(req, res, next) {
    var dept = bl.checkDepartmentPut(req.body.company, req.body.dept_id, req.body.dept_name, req.body.dept_no, req.body.location);
    var response;

    if (dept) {
        var tdept = new dl.Department(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location, req.body.dept_id);
        dept = dl.updateDepartment(tdept);
        if (dept) {
            if (dept == null) {
                response = {
                    error: "Department Failed to Update"
                }
            }
            else {
                response = {
                    company: dept.company,
                    dept_id: dept.dept_id,
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

// DELETE DEPARTMENT | DONE, TESTED
router.delete('/department', function(req, res, next) {
    var dept = bl.checkDepartmentDelete(req.query.company, req.query.dept_id);
    var response;

    if (dept) {
        dept = dl.deleteDepartment(req.query.company, req.query.dept_id);
        if (dept) {
            if (dept == null) {
                response = {
                    error: "Department Failed to Delete"
                }
            }
            else {
                response = {
                    success: "Department Deleted Successfully",
                    affectedRows: dept
                }
            }
        }
        else {
            response = {
                error: "Department Failed to Delete"
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