const mysql = require('mysql2');
const dbConfig = require('../config/connection.js');
const Table = require('cli-table3');

class ViewQuery {
    constructor() {
        this.db = mysql.createConnection(dbConfig);
    }

    viewAllEmployees() {
        const sql = `SELECT e.id, e.first_name AS first_name, e.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT_WS(' ', COALESCE(m.first_name, 'null'), m.last_name) AS  manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id ORDER by e.id`;
        this.db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
            }
            // Print results into table
            this.printTable(results);
        })
    }

    viewAllRoles() {
        const sql = `SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id ORDER by role.id`;
        this.db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
            }
            // Print results into table
            this.printTable(results);
        })
    }

    viewAllDepartments() {
        const sql = `SELECT * FROM department ORDER by name`;
        this.db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
            }
            // Print results into table
            this.printTable(results);
        })
    }

    printTable(results) {
        // Create a table to format the query results
        const table = new Table();
        const headers = Object.keys(results[0]);
        table.push(headers);
        results.forEach(row => {
            table.push(Object.values(row));
        });

        // Print created table
        console.log(`\n${table.toString()}\n`);
    }
}

module.exports = ViewQuery;


