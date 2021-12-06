var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(cookieParser());
app.use(express.static('public'));
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

// GET TIMECARDS
function checkTimecardsGet(emp_id) {
    if (emp_id < 1) {
        return false;
    }
    else {
        return true;
    }
}

// NEW TIMECARD
function checkTimecardPost(company, emp_id, start_time, end_time) {
    var chkID = dl.getEmployee(emp_id);

    var sTime = new Date();
    sTime.setFullYear(start_time.substring(0, 4));
    sTime.setMonth(start_time.substring(5, 7) - 1);
    sTime.setDate(start_time.substring(8, 10));
    sTime.setHours((start_time.substring(11, 13)));
    sTime.setMinutes(start_time.substring(14, 16));
    sTime.setSeconds(start_time.substring(17, 19));

    var eTime = new Date();
    eTime.setFullYear(end_time.substring(0, 4));
    eTime.setMonth(end_time.substring(5, 7) - 1);
    eTime.setDate(end_time.substring(8, 10));
    eTime.setHours((end_time.substring(11, 13)));
    eTime.setMinutes(end_time.substring(14, 16));
    eTime.setSeconds(end_time.substring(17, 19));

    var oTimes = dl.getAllTimecard(emp_id);
    // seems like oTimes is the error source, but cant figure out why. ask nate? also ask prof about what type of timecard / timestamp / date object that timecard add needs. Ask about why date object pushes time 5 hours ahead.

    // StartTime Equal To Current or after previous Monday
    var date = new Date();
    var day = date.getDay();
    var prevMonday = new Date();
    if(date.getDay() == 0){
        prevMonday.setDate(date.getDate() - 7);
    }
    else{
        prevMonday.setDate(date.getDate() - (day-1));
    }

    // EndTime 1 Hour Greater and Same Day as StartTime
    if ((sTime.getDate() != eTime.getDate()) && (sTime.getMonth() != eTime.getMonth()) && (sTime.getFullYear() != eTime.getFullYear())) {
        return false;
    }
    else if ((eTime.getHours() - sTime.getHours()) <= 1) {
        return false;
    }

    // StartTime and EndTime Must Be Weekdays
    else if (sTime.getDay() == 0 || sTime.getDay() == 6 || eTime.getDay() == 0 || eTime.getDay() == 6) {
        return false;
    }

    // StartTime and EndTime Hours Must Be >8:00 and <18:00
    else if (sTime.getHours() < 8 || sTime.getHours() > 18 || eTime.getHours() < 8 || eTime.getHours() > 18) {
        return false;
    }

    // StartTime Must Not Be On Same Day as Any Other StartTime For That Employee
    if (oTimes != null){
        oTimes.forEach(t => {
            var sDay = new Date(t.start_time);
            var cd = (sDay.getDate() == sTime.getDate());
            var cm = (sDay.getMonth() == sTime.getMonth());
            var cy = (sDay.getFullYear() == sTime.getFullYear());
            if (cd && cm && cy) {
                console.log("oTimes");
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
    else if (sTime < prevMonday) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = {checkTimecardsGet, checkTimecardPost};