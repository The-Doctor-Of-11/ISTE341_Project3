var express = require('express');
var router = express.Router();

var bl = require('../BusinessLayer/departmentVal');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

/* GET departments */
router.get('/departments', function(req, res, next) {
    let dept = bl.checkDepartmentsGet(req.query.company);
    if (dept) {

        dept = dl.getAllDepartment(req.query.company);
        
        var response;

        if (dept) {
            response = dept;
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

module.exports = router;