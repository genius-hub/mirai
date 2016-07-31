var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/JobApp');

var express = require('express');
var restapi = express();

restapi.get('/avgVacanciesByIndustry', function(req, res){
    
    var getAvgVacancies = "SELECT year, averageVacancies FROM JobVacanciesByIndustry WHERE division = " + req.query["division"];
    db.all(getAvgVacancies,function(err,rows){
        if(err){
            res.json({"Message":"An error occurred while accessing JobVacanciesByIndustry"});
        }else{
            if(typeof rows !== undefined && rows.length > 0){
                var yearData = [];
                var vacancyData = [];
                var index = 0;
                var row;
                for(index in rows){
                    row = rows[index];
                    yearData.push(row.year);
                    vacancyData.push(row.averageVacancies);
                }

                res.json({"Years":yearData, "Average Vacancies": vacancyData});
            }else{
                res.json({"Message":"No data found for given Industry"});
            }
        }
    });
});

restapi.listen(3000);