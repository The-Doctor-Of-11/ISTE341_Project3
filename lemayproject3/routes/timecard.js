var express = require('express');
var router = express.Router();

const cd = require('../companydata/lib/DataLayer');
const bl = require('../BusinessLayer/departmentVal.js');

/* GET department */
router.get('/timecard', function(req, res, next) {
    let timecd = bl.getTimecard(req.body.company, req.body.timecd_id);
    var response;

    if (timecd == null) {
        response = {
            error: "No Departments Found"
        }
    }
    else {
        response += {
            timecd_id: timecd.timecd_id,
            company: timecd.company,
            timecd_name: timecd.timecd_name,
            timecd_no: timecd.timecd_no,
            location: timecd.location
        };
    }

    res.send(response);
});

module.exports = router;