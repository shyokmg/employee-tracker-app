const Query = require('./query');

class UpdateQuery extends Query {
    async updateRoleOfEmployee(role_id, name) {
        const sql = `UPDATE employee SET role_id = ${role_id} WHERE CONCAT(first_name, ' ', last_name) = '${name}'`;
        try {
            await this.query(sql);
            console.log(`Updated ${name}'s Role`);

        } catch (err) {
            console.error('Error executing UPDATE query:', err);
            throw err;
        }
    }
}

module.exports = UpdateQuery;