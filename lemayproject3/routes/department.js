var express = require('express');
var router = express.Router();

const cd = require('../companydata/lib/DataLayer');
const bl = require('../BusinessLayer/departmentVal.js');

module.exports = require('../companydata/lib/DataLayer');

/* GET department */
router.get('/department/:company/:dept_id', function(req, res, next) {
    let dept = bl.checkDepartmentGet(req.params.company);
    
    if (dept) {

        dept = cd.getDepartment(req.params.company, req.params.dept_id);

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

module.exports = router;