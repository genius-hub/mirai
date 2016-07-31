var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/JobApp');

var express = require('express');
var restapi = express();

restapi.get('/employmentByIndustry', function(req, res){
    
    var getSa4 = "SELECT sa4Code FROM PostCodeSA4 WHERE postCode = " + req.query["postcode"];
    db.get(getSa4,function(err,row){

        if(err){
            res.json({"Message":"An error occurred while accessing PostCodeSA4"});
        }else{
            if(row !== undefined && req.query["division"] !== undefined){
                var getEmployment = "SELECT fullTime, partTime, male, female FROM EmploymentByIndustry WHERE regionCode = " + row.sa4Code + " AND industryDivision = " + req.query["division"];
                db.get(getEmployment,function(err,row){

                    if(err){
                        res.json({"Message":"An error occurred while accessing EmploymentByIndustry"})
                    }else{
                        if(row !== undefined){
                            res.json({"Employment Data": [{"Full Time": row.fullTime, "Part Time": row.partTime, "Male": row.male, "Female": row.female}]});
                        }else{
                            res.json({"Message":"No data found for given SA4 Area and Industry"});
                        }
                    }
                });
            }else if(req.query["division"] == undefined){
                var getEmployment = "SELECT fullTime, partTime, male, female FROM EmploymentByIndustry WHERE regionCode = " + row.sa4Code;
                db.all(getEmployment,function(err,rows){

                    if(err){
                        res.json({"Message":"An error occurred while accessing EmploymentByIndustry"})
                    }else{
                        if(typeof rows !== undefined && rows.length > 0){
                            var response = [];
                            var index = 0;
                            var row;
                            for(index in rows){
                                row = rows[index];
                                response.push({"Full Time": row.fullTime, "Part Time": row.partTime, "Male": row.male, "Female": row.female});
                            }
                            res.json({"Employment Data": response});
                        }else{
                            res.json({"Message":"No data found for given SA4 Area and Industry"});
                        }
                    }
                });
            }else{
                res.json({"Message":"Invalid Postcode"});
            }
        }
    });

});

restapi.listen(3000);