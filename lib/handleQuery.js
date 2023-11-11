const dbConfig = require('../config/connection.js');
const Table = require('cli-table3');

class HandleQuery {

    async viewTable(sql) {
        const mysql = require('mysql2/promise');
        const db = await mysql.createConnection(dbConfig);
        try {
            const [rows] = await db.query(sql);

            // Create a table to format the query results
            const table = new Table();
            const headers = Object.keys(rows[0]);
            table.push(headers);
            rows.forEach(row => {
                table.push(Object.values(row));
            });

            // Print created table
            console.log(`\n${table.toString()}\n `);

        } catch (err) {
            console.log(err);
        }
    }

    async insertQuery(name) {
        const mysql = require('mysql2/promise');
        const db = await mysql.createConnection(dbConfig);
        const sql = `INSERT INTO department (name) VALUES (?)`
        try {
            await db.query(sql, name);
            console.log(`Added ${name} to the database`)

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = HandleQuery;


