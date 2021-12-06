var express = require('express');
var router = express.Router();

var DataLayer = require("../companydata/index.js");
var dl = new DataLayer("ahl4753");

module.exports = require('../companydata/lib/DataLayer');

// DELETE DEPARTMENT | TEST LAST
router.delete('/company', function(req, res, next) {
    var response;
    if ((req.query.company).length < 1) {
        response = {
            error: "Company Not Found"
        }
    }
    else {
        del = dl.deleteCompany(req.query.company);
        if (del > 0) {
            response = {
                success: "Company Successfully Deleted"
            }
        }
        else {
            response = {
                error: "Company Delete Failed or Company Does Not Exist"
            }
        }
        
    }
    res.send(response);
});

module.exports = router;