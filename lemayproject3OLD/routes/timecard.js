var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(cookieParser());
app.use(express.static('public'));
const cd = require('../companydata/lib/DataLayer');
const bl = require('../BusinessLayer/timecardVal.js');

/* GET department */
app.get('/timecard', function(req, res, next) {
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