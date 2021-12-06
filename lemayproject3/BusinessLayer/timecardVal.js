var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(cookieParser());
app.use(express.static('public'));
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");
var moment = require('moment'); // require
moment().format(); 

// GET TIMECARDS
function checkTimecardsGet(emp_id) {
    if (emp_id < 1) {
        return false;
    }
    else {
        return true;
    }
}

// GET TIMECARD
function checkTimecardGet(company, timecard_id) {
    if (timecard_id < 1) {
        return false;
    }
    else if (company.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

// NEW TIMECARD
function checkTimecardPost(company, emp_id, start_time, end_time) {
    var chkID = dl.getEmployee(emp_id);
    var sTime = moment(start_time);
    var eTime = moment(end_time);
    var oTimes = dl.getAllTimecard(emp_id);

    // StartTime Equal To Current or after previous Monday || FIX
    var thisMonday = moment().startOf('isoweek');

    // EndTime 1 Hour Greater and Same Day as StartTime
    if ((sTime.day() != eTime.day()) && (sTime.date() != eTime.date()) && (sTime.year() != eTime.year())) {
        return false;
    }
    else if ((eTime.hour() - sTime.hour()) <= 1) {
        return false;
    }

    // StartTime and EndTime Must Be Weekdays
    else if (sTime.day() == 0 || sTime.day() == 6 || eTime.day() == 0 || eTime.day() == 6) {
        return false;
    }

    // StartTime and EndTime Hours Must Be >8:00 and <18:00
    else if (sTime.hour() < 8 || sTime.hour() > 18 || eTime.hour() < 8 || eTime.hour() > 18) {
        return false;
    }

    // StartTime Must Not Be On Same Day as Any Other StartTime For That Employee
    if (oTimes != null){
        oTimes.forEach(t => {
            var sDay = moment(t.start_time);
            var cd = (sDay.day() == sTime.day());
            var cm = (sDay.month() == sTime.month());
            var cy = (sDay.year() == sTime.year());
            if (cd && cm && cy) {
                return false;
            }
        });
    }

    if (company.length < 1) {
        return false;
    }
    else if (chkID == null) {
        return false;
    }
    else if (sTime < thisMonday) {
        return false;
    }
    else {
        return true;
    }
}

// UPDATE TIMECARD
function checkTimecardPut(company, timecard_id, start_time, end_time, emp_id) {
    var chkID = dl.getEmployee(emp_id);
    var chkTM = dl.getTimecard(timecard_id)
    var sTime = moment(start_time);
    var eTime = moment(end_time);
    var oTimes = dl.getAllTimecard(emp_id);

    // StartTime Equal To Current or after previous Monday || FIX
    var thisMonday = moment().startOf('isoweek');

    // EndTime 1 Hour Greater and Same Day as StartTime
    if ((sTime.day() != eTime.day()) && (sTime.date() != eTime.date()) && (sTime.year() != eTime.year())) {
        console.log(sTime, eTime);
        console.log(sTime.day(), eTime.day(), sTime.date(), eTime.date(), sTime.year(), eTime.year());
        return false;
    }
    else if ((eTime.hour() - sTime.hour()) <= 1) {
        console.log("hours");
        return false;
    }
    else if (chkTM == null) {
        console.log("existing");
        return false;
    }

    // StartTime and EndTime Must Be Weekdays
    else if (sTime.day() == 0 || sTime.day() == 6 || eTime.day() == 0 || eTime.day() == 6) {
        console.log("weekday");
        return false;
    }

    // StartTime and EndTime Hours Must Be >8:00 and <18:00
    else if (sTime.hour() < 8 || sTime.hour() > 18 || eTime.hour() < 8 || eTime.hour() > 18) {
        console.log("between");
        return false;
    }

    // StartTime Must Not Be On Same Day as Any Other StartTime For That Employee
    if (oTimes != null){
        oTimes.forEach(t => {
            var sDay = moment(t.start_time);
            var cd = (sDay.day() == sTime.day());
            var cm = (sDay.month() == sTime.month());
            var cy = (sDay.year() == sTime.year());
            if (cd && cm && cy && t.timecard_id != timecard_id) {
                console.log("existing");
                return false;
            }
        });
    }

    if (company.length < 1) {
        console.log("company");

        return false;
    }
    else if (chkID == null) {
        console.log("id");

        return false;
    }
    else if (sTime < thisMonday) {
        console.log("monday");

        return false;
    }
    else {
        return true;
    }
}

// DELETE TIMECARD
function checkTimecardDelete(company, timecard_id) {
    if (timecard_id < 1) {
        return false;
    }
    else if (company.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = {checkTimecardsGet, checkTimecardGet, checkTimecardPost, checkTimecardPut, checkTimecardDelete};