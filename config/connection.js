const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    // Database name
    'employee_db',
    // User
    'root',
    // Password
    '',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;