const inquirer = require('inquirer');
const ViewQuery = require('./view.js');


class CLI {

    async run() {
        let exit = false;

        const viewQuery = new ViewQuery();

        while (!exit) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'options',
                    message: 'What would you like to do?',
                    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
                    loop: false
                },
            ]);
            
            const selectedOption = answers.options;
            if(selectedOption === 'Quit') {
                console.log('Exiting');
                exit = true;
                process.exit();
            } else if (selectedOption === 'View All Employees'){
                viewQuery.viewAllEmployees();
                // Do Select query for employees
            } else if (selectedOption === 'View All Roles'){
                viewQuery.viewAllRoles();
                // Do Select query for roles
            } else if (selectedOption === 'View All Departments'){
                viewQuery.viewAllDepartments();
                // Do Select query for departments
            } else if (selectedOption === 'Add Employee'){
                // Do insert query for employee
            } else if (selectedOption === 'Add Role'){
                // Do insert query for role
            } else if (selectedOption === 'Add Deparment'){
                // Do insert query for department
            } else if (selectedOption === 'Update Employee Role'){
                // Do update query for employee role
            }

            

        }
    }
}

module.exports = CLI;