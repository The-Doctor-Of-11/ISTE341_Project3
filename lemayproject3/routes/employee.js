var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/departmentVal.js');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

/* GET employee */
router.get('/employee', function(req, res, next) {
    let empl = bl.checkEmployeeGet(req.body.company, req.body.empl_id);
    var response;
    
    if (empl) {
        empl = cd.getEmployee(req.body.company, req.body.empl_id);
        if (empl == null) {
            response = {
                error: "Employee Not Found"
            }
        }
        else {
            response += {
                empl_id: empl.empl_id,
                company: empl.company,
                empl_name: empl.empl_name,
                empl_no: empl.empl_no,
                location: empl.location
            };
        }
    }
    else {
        response = {
            error: "Error in Input"
        }
    }

    res.send(response);
});

module.exports = router;