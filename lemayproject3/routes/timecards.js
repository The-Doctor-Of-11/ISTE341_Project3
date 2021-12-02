var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/departmentVal.js');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

/* GET department */
router.get('/timecards', function(req, res, next) {
    let timecd = bl.getAllTimecards(req.body.company);
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

    res.send(response);
});

module.exports = router;