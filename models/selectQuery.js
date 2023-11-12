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

    async selectNameFromDepartment() {
        const sql = `SELECT name FROM department`;
        try {
            const [rows] = await this.query(sql);
            let list  = [];
            rows.forEach(row => {
                list.push(Object.values(row).toString());
            });
            // console.log(list);
            return list;
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }

    async selectTitleFromRole() {
        const sql = `SELECT title FROM role`;
        try {
            const [rows] = await this.query(sql);
            let list  = [];
            rows.forEach(row => {
                list.push(Object.values(row).toString());
            });
            // console.log(list);
            return list;
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }

    async selectManagerFromEmployee() {
        const sql = `SELECT CONCAT_WS(' ', first_name, last_name) AS  manager FROM employee WHERE manager_id IS NULL`;
        try {
            const [rows] = await this.query(sql);
            let list  = [];
            rows.forEach(row => {
                list.push(Object.values(row).toString());
            });
            // console.log(list);
            return list;
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }

    async selectEmployeeFromEmployee() {
        const sql = `SELECT CONCAT_WS(' ', first_name, last_name) AS  employee FROM employee`;
        try {
            const [rows] = await this.query(sql);
            let list  = [];
            rows.forEach(row => {
                list.push(Object.values(row).toString());
            });
            // console.log(list);
            return list;
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }


    

    async selectIDFromDepartment(name) {
        const sql = `SELECT id FROM department WHERE name = '${name}'`;
        try {
            const [rows] = await this.query(sql);
            let id;
            rows.forEach(row => {
                id = Object.values(row).toString();
            });
            return id;
            
        } catch (err) {
            console.log('Error executing SELECT query:', err);
            throw err;
        }
    }

    async selectRoleIDFromEmployee(name) {
        const sql = `SELECT role_id FROM employee WHERE CONCAT(first_name, ' ', last_name) = '${name}'`;
        try {
            const [rows] = await this.query(sql);
            let id;
            rows.forEach(row => {
                id = Object.values(row).toString();
            });
            return id;
            
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

    async selectRoleIDFromRole(title) {
        const sql = `SELECT id FROM role WHERE title = '${title}'`;
        try {
            const [rows] = await this.query(sql);
            let id;
            rows.forEach(row => {
                id = Object.values(row).toString();
            });
            return id;
            
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