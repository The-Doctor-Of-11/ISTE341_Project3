var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
app.use(cookieParser());
app.use(express.static('public'));
const cd = require('../companydata/lib/DataLayer');
const bl = require('../BusinessLayer/departmentVal.js');

/* GET departments */
app.get('/departments', function(req, res, next) {
    let dept = bl.checkDepartmentsGet(req.params.company);

    if (dept) {

        dept = cd.getAllDepartment(req.params.company);
        var response;

        if (dept) {
            response = "[";

            dept.forEach(dpt => {
                response += {
                    dept_id: dpt.dept_id,
                    company: dpt.company,
                    dept_name: dpt.dept_name,
                    dept_no: dpt.dept_no,
                    location: dpt.location
                } + ",";
            });

            response = response.substring(0, response.length - 1);

            response += "]";
        }
        else {
            response = {
                error: "No Departments Found"
            }
        }
    }
    else {
        response = {
            error: "Error in Department Input"
        }
    }
    res.send(response);
});