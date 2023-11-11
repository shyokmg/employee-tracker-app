const dbConfig = require('../config/connection.js');
const Table = require('cli-table3');

class HandleQuery {

    async selectQuery(sql) {
        const mysql = require('mysql2/promise');
        const db = await mysql.createConnection(dbConfig);
        try {
            const [rows] = await db.query(sql);
            this.printTable(rows);
            // db.end();

        } catch (err) {
            console.log(err);
        }
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
        console.log(`\n${table.toString()}\n `);
    }
}

module.exports = HandleQuery;


