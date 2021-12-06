var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/timecardVal.js');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// GET TIMECARDS | WORKING
router.get('/timecards', function(req, res, next) {
    var timecd = bl.checkTimecardsGet(req.query.emp_id);

    if (timecd) {
        timecd = dl.getAllTimecard(req.query.emp_id);
        var response;

        if (timecd == null) {
            response = {
                error: "No Timecards Found"
            }
        }
        else {
            response = timecd;
        }
    }
    else {
        response = {
            error: "Error in Timecard Input"
        }
    }

    res.send(response);
});

module.exports = router;