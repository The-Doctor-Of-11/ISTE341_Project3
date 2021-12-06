var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/timecardVal');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// GET TIMECARD | DONE, WORKING
router.get('/timecard', function(req, res, next) {
    let time = bl.checkTimecardGet(req.query.company, req.query.timecard_id);
    var response;

    if (time) {
        time = dl.getTimecard(req.query.timecard_id);

        if (time == null) {
            response = {
                error: "Timecard Not Found"
            }
        }
        else {
            response = time;
        }
    }
    else {
        response = {
            error: "Error in Timecard Input"
        }
    }

    res.send(response);
});

// NEW TIMECARD | DONE, WORKING
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

// UPDATE TIMECARD | DONE, WORKING
router.put('/timecard', function(req, res, next) {
    var timecd = bl.checkTimecardPut(req.body.company, req.body.timecard_id, req.body.start_time, req.body.end_time, req.body.emp_id);
    var response;

    if (timecd) {
        var tcard = new dl.Timecard(req.body.start_time, req.body.end_time, req.body.emp_id, req.body.timecard_id);
        timecd = dl.updateTimecard(tcard);

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

// DELETE TIMECARD | DONE, WORKING
router.delete('/timecard', function(req, res, next) {
    var timecd = bl.checkTimecardDelete(req.query.company, req.query.timecard_id);
    var response;

    if (timecd) {
        timecd = dl.deleteTimecard(req.query.timecard_id);
        if (timecd) {
            if (timecd == null) {
                response = {
                    error: "Timecard Failed to Delete"
                }
            }
            else {
                response = {
                    success: "Timecard Deleted Successfully",
                    affectedRows: timecd
                }
            }
        }
        else {
            response = {
                error: "Timecard Failed to Delete"
            }
        }
    }
    else {
        response = {
            error: "Timecard Failed to Delete"
        }
    }
    res.send(response);
});

module.exports = router;