const Query = require('./query');

class InsertQuery extends Query {
    async insertIntoDepartment(data) {
        const sql = `INSERT INTO department (name) VALUES (?)`
        try {
            await this.query(sql, data);
            console.log(`Added ${data} to the database`);

        } catch (err) {
            console.error('Error executing INSERT query:', err);
            throw err;
        }
    }

    async insertIntoRole(data) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        try {
            await this.query(sql, data);
            console.log(`Added ${data[0]} to the database`);

        } catch (err) {
            console.error('Error executing INSERT query:', err);
            throw err;
        }
    }

    async insertIntoEmployee(data) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        try {
            await this.query(sql, data);
            console.log(`Added ${data[0]} ${data[1]} to the database`);

        } catch (err) {
            console.error('Error executing INSERT query:', err);
            throw err;
        }
    }
}

module.exports = InsertQuery;