var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/timecardVal');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// GET TIMECARD | 
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

// POST TIMECARD | 
router.post('/timecard', function(req, res, next) {
    var timecd = bl.checkTimecardPost(req.body.company, req.body.emp_id, req.body.start_time, req.body.end_time);
    var response;

    if (timecd) {
        var tcard = new dl.Timecard(req.body.start_time, req.body.end_time, req.body.emp_id);
        timecd = dl.insertTimecard(tcard);

        if (timecd == null) {
            response = {
                error: "Failed to Insert"
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