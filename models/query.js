const mysql = require('mysql2/promise');
const config = require('../config/connection.js');

// Main class to handle queries db connections
class Query {
    
    async query(sql, args) {
        const db = await mysql.createConnection(config);
        try {
            const rows = await db.query(sql, args);
            return rows;
        } catch (err) {
            throw err;
        }
     }

     async close() {
        return this.connection.close();
     }
}

module.exports = Query;