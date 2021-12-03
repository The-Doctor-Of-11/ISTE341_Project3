var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/employeeVal');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// GET EMPLOYEES | DONE, Fix Error Handling
router.get('/employee', function(req, res, next) {
    let empl = bl.checkEmployeeGet(req.query.company, req.query.empl_id);
    var response;
    
    if (empl) {
        empl = dl.getEmployee(req.query.empl_id);

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

// NEW EMPLOYEE | 
router.post('/employee', function(req, res, next) {

});

module.exports = router;