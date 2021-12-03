var express = require('express');
var router = express.Router();

const bl = require('../BusinessLayer/employeeVal');
var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// DONE, TESTED
router.get('/employees', function(req, res, next) {
    let empl = bl.checkEmployeesGet(req.query.company);
    var response;

    if (empl) {
        empl = dl.getAllEmployee(req.query.company);
        response = empl;
    }
    else {
        response = {
            error: "No Employees Found"
        }
    }

    res.send(response);
});

module.exports = router;