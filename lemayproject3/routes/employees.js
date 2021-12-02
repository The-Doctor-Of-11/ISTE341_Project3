var express = require('express');
var router = express.Router();

const cd = require('../companydata/lib/DataLayer');
const bl = require('../BusinessLayer/departmentVal.js');

/* GET employee */
router.get('/employees', function(req, res, next) {
    let empl = bl.checkEmployeesGet(req.body.company);
    var response;

    if (empl) {
        empl = cd.getAllEmployee(req.body.company);
        response = "[";

        empl.forEach(emp => {
            response += {
                empl_id: emp.empl_id,
                company: emp.company,
                empl_name: emp.empl_name,
                empl_no: emp.empl_no,
                location: emp.location
            } + ",";
        });

        response = response.substring(0, response.length - 1);

        response += "]";
    }
    else {
        response = {
            error: "No Employees Found"
        }
    }

    res.send(response);
});

module.exports = router;