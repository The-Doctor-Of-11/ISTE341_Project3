var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/departmentVal.js');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

/* GET timecard */
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