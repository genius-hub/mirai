var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/JobApp');

var express = require('express');
var restapi = express();

restapi.get('/incomeByAgeATO', function(req, res){
    
    var getSa4 = "SELECT sa4Code FROM PostCodeSA4 WHERE postCode = " + req.query["postcode"];
    db.get(getSa4,function(err,row){

        if(err){
            res.json({"Message":"An error occurred while accessing PostCodeSA4"});
        }else{
            if(row !== undefined){
                var getAverageIncome = "SELECT totalIncome FROM ATOIncomeHelpDebt WHERE sa4Code = " + row.sa4Code +" AND minAge <= " + req.query["age"] + " AND maxAge >= " + req.query["age"];
                db.all(getAverageIncome,function(err,rows){

                    if(err){
                        res.json({"Message":"An error occurred while accessing ATOIncomeAverageIncome"})
                    }else{
                        if(typeof rows !== undefined && rows.length > 0){
                            var averageIncome;
                            var index;
                            var row;
                            var sumOfIncome = 0;
                            var numResidents = rows.length;
                            for(index in rows){
                                row = rows[index];
                                sumOfIncome += row.totalIncome;
                            }
                            averageIncome = sumOfIncome/numResidents;

                            res.json({"Result": averageIncome});
                        }else{
                            res.json({"Message":"No data found for given SA4 Area"});
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