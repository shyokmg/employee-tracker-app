const Query = require('./query');

class UpdateQuery extends Query {
    async updateRoleOfEmployee(data) {
        const sql = `UPDATE `;
        try {
            await this.query(sql, data);
            console.log(`Added ${data} to the database`);

        } catch (err) {
            console.error('Error executing INSERT query:', err);
            throw err;
        }
    }
}

module.exports = UpdateQuery;