var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/JobApp');

var express = require('express');
var restapi = express();

restapi.get('/helpDebts', function(req, res){

    var getSa4 = "SELECT sa4Code FROM PostCodeSA4 WHERE postCode = " + req.query["postcode"];
    db.get(getSa4,function(err,row){

        if(err){
            res.json({"Message":"An error occurred while accessing PostCodeSA4"});
        }else{
            if(row !== undefined){
                
                var getHelpDebts = "SELECT helpDebt FROM ATOIncomeHelpDebt WHERE sa4Code = " + row.sa4Code;
                db.all(getHelpDebts,function(err,rows){

                    if(err){
                        res.json({"Message":"An error occurred while accessing ATOIncomeHelpDebt"})
                    }else{
                        if(typeof rows !== undefined && rows.length > 0){
                            var debtPercentage;
                            var index;
                            var row;
                            var debts = 0;
                            var total = rows.length;
                            for(index in rows){
                                row = rows[index];
                                if(row.helpDebt > 0){
                                    debts++;
                                }
                            }
                            debtPercentage = debts/total;
                            res.json({"Result": debtPercentage});
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