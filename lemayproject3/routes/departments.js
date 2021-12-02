var express = require('express');
var router = express.Router();

const cd = require('../companydata/lib/DataLayer');
const bl = require('../BusinessLayer/departmentVal.js');

/* GET departments */
router.get('/departments/:company', function(req, res, next) {
    let dept = bl.checkDepartmentsGet(req.params.company);
console.log(req.params.company);
    if (dept) {

        dept = cd.getAllDepartment(req.params.company);
        
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