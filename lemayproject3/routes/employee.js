var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/employeeVal');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

// GET EMPLOYEE | DONE, TESTED
router.get('/employee', function(req, res, next) {
    let empl = bl.checkEmployeeGet(req.query.company, req.query.emp_id);
    var response;
    
    if (empl) {
        empl = dl.getEmployee(req.query.emp_id);

        if (empl == null) {
            response = {
                error: "Employee Not Found"
            }
        }
        else {
            response = empl;
        }
    }
    else {
        response = {
            error: "Error in Input"
        }
    }

    res.send(response);
});

// NEW EMPLOYEE | DONE, TESTED
router.post('/employee', function(req, res, next) {
    let empl = bl.checkEmployeePost(req.body.company, req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id);
    var response;
    if (empl) {
        var templ = new dl.Employee(req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id);
        empl = dl.insertEmployee(templ);

        if (empl == null) {
            response = {
                error: "Failed to Insert"
            }
        }
        else {
            response = empl;
        }
    }
    else {
        response = {
            error: "Error in Employee Input"
        }
    }

    res.send(response);
});

// UPDATE EMPLOYEE | DONE, TESTED
router.put('/employee', function(req, res, next){
    var emp = bl.checkEmployeePut(req.body.company, req.body.emp_id, req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id);
    var response;

    if (emp) {
        var tEmpl = new dl.Employee(req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id, req.body.mng_id, req.body.emp_id);
        emp = dl.updateEmployee(tEmpl);
        if (emp) {
            if (emp == null) {
                response = {
                    error: "Employee Failed to Update"
                }
            }
            else {
                response = emp;
            }
        }
        else {
            response = {
                error: "Employee Failed to Update"
            }
        }
    }
    else {
        response = {
            error: "Error in Employee Input"
        }
    }
    res.send(response);
});

// DELETE EMPLOYEE | DONE, TESTED
router.delete('/employee', function(req, res, next){
    var emp = bl.checkEmployeeDelete(req.query.company, req.query.emp_id);
    var response;

    if (emp) {
        emp = dl.deleteEmployee(req.query.emp_id);
        if (emp) {
            if (emp == null) {
                response = {
                    error: "Employee Failed to Delete"
                }
            }
            else {
                response = {
                    success: "Employee Deleted Successfully",
                    affectedRows: emp
                }
            }
        }
        else {
            response = {
                error: "Employee Failed to Delete"
            }
        }
    }
    else {
        response = {
            error: "Error in Employee Input"
        }
    }
    res.send(response);
});

module.exports = router;