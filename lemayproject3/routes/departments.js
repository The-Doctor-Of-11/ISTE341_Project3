var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/departmentVal.js');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

/* GET departments */
router.get('/departments', function(req, res, next) {
    let dept = bl.checkDepartmentsGet(req.query.company);
    console.log(req.query.company);
    if (dept) {

        dept = dl.getAllDepartment(req.query.company);
        
        var response;

        if (dept) {
            response = "[";

            dept.forEach(dpt => {
                response += {
                    dept_id: dpt.dept_id,
                    company: dpt.company,
                    dept_name: dpt.dept_name,
                    dept_no: dpt.dept_no,
                    location: dpt.location
                } + ",";
            });

            response = response.substring(0, response.length - 1);

            response += "]";
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