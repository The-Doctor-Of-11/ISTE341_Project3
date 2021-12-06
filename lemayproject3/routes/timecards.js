var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/timecardVal.js');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// GET TIMECARDS | 
router.get('/timecards', function(req, res, next) {
    var timecd = bl.checkTimecardsGet(req.query.emp_id);

    if (timecd) {
        timecd = dl.getAllTimecard(req.query.company, req.query.emp_id);
        var response;

        if (timecd == null) {
            response = {
                error: "No Timecards Found"
            }
        }
        else {
            response = "[";

            timecd.forEach(tcd => {
                response += {
                    timecd_id: tcd.timecd_id,
                    company: tcd.company,
                    timecd_name: tcd.timecd_name,
                    timecd_no: tcd.timecd_no,
                    location: tcd.location
                } + ",";
            });

            response = response.substring(0, response.length - 1);

            response += "]";
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