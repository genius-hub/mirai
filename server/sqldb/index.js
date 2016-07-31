/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.VacanciesByIndustry = db.sequelize.import('../api/vacanciesByIndustry/vacanciesByIndustry.model');
db.SinglesByAge = db.sequelize.import('../api/singlesByAge/singlesByAge.model');
db.HelpPerSa4 = db.sequelize.import('../api/helpPerSa4/helpPerSa4.model');
db.EmploymentByIndustry = db.sequelize.import('../api/employmentByIndustry/employmentByIndustry.model');
db.AverageIncomeByAge = db.sequelize.import('../api/averageIncomeByAge/averageIncomeByAge.model');
db.IncomeByAgeATO = db.sequelize.import('../api/incomeByAgeATO/incomeByAgeATO.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
