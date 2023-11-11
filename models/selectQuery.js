const Query = require('./query');
const Table = require('cli-table3');

class SelectQuery extends Query {

    async selectFromEmployee() {
        const sql = `SELECT e.id, e.first_name AS first_name, e.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT_WS(' ', COALESCE(m.first_name, 'null'), m.last_name) AS  manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id ORDER by e.id`;
        try {
            const [rows] = await this.query(sql);
            console.log(this.renderTable(rows));
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }

    async selectAllFromDepartment() {
        const sql = `SELECT * FROM department`;
        try {
            const [rows] = await this.query(sql);
            console.log(this.renderTable(rows));
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }

    async selectFromRole() {
        const sql = `SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id ORDER by role.id`;
        try {
            const [rows] = await this.query(sql);
            console.log(this.renderTable(rows));
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }


    renderTable(rows) {
        const table = new Table();
        const headers = Object.keys(rows[0]);
        table.push(headers);
        rows.forEach(row => {
            table.push(Object.values(row));
        });

        const renderTable = `\n${table.toString()}\n`

        return renderTable
    }
}

module.exports = SelectQuery;