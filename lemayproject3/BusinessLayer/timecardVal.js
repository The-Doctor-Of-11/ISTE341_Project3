const { time } = require('console');
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
    sTime.setMonth(start_time.substring(5, 7));
    sTime.setDate(start_time.substring(8, 10));
    sTime.setHours((start_time.substring(11, 13)) - 5);
    sTime.setMinutes(start_time.substring(14, 16));
    sTime.setSeconds(start_time.substring(17, 19));

    var eTime = new Date();
    eTime.setFullYear(end_time.substring(0, 4));
    eTime.setMonth(end_time.substring(5, 7));
    eTime.setDate(end_time.substring(8, 10));
    eTime.setHours((end_time.substring(11, 13)) - 5);
    eTime.setMinutes(end_time.substring(14, 16));
    eTime.setSeconds(end_time.substring(17, 19));
    
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
        console.log("Hour Compare");
        return false;
    }
    else if ((eTime.getHours() - sTime.getHours()) <= 1) {
        console.log("Hour 2");
        return false;
    }

    // StartTime and EndTime Must Be Weekdays
    else if (sTime.getUTCDay() == 0 || sTime.getUTCDay() == 6 || eTime.getUTCDay() == 0 || eTime.getUTCDay() == 6) {
        console.log("Weekend");
        return false;
    }

    // StartTime and EndTime Hours Must Be >8:00 and <18:00
    else if (sTime.getUTCHours() < 8 || sTime.getUTCHours() > 18 || eTime.getUTCHours() < 8 || eTime.getUTCHours() > 18) {
        console.log("Day Hours", sTime, eTime);
        return false;
    }

    // StartTime Must Not Be On Same Day as Any Other StartTime For That Employee
    oTimes.forEach(t => {
        var sDay = new Date(t.start_time);
        var cd = (sDay.getUTCDate() == sTime.getUTCDate());
        var cm = (sDay.getUTCMonth() == sTime.getUTCMonth());
        var cy = (sDay.getUTCFullYear() == sTime.getUTCFullYear());
        if (cd && cm && cy) {
            console.log("oTimes");
            return false;
        }
    });

    if (company.length < 1) {
        console.log("company");
        return false;
    }
    else if (chkID == null) {
        console.log("chkid");
        return false;
    }
    else if (sTime < prevMonday) {
        console.log("monday");
        return false;
    }
    else {
        return true;
    }
}

module.exports = {checkTimecardsGet, checkTimecardPost};