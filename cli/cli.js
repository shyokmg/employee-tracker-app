const inquirer = require('inquirer');
const figlet = require('figlet');

// Query Classes to handle SQL queries
const SelectQuery = require('../models/selectQuery.js');
const InsertQuery = require('../models/insertQuery.js');
const UpdateQuery = require('../models/updateQuery.js');

const selectQuery = new SelectQuery();
const insertQuery = new InsertQuery();
const udpateQuery = new UpdateQuery();

class CLI {
    async run() {
        // Print application title using figlet
        figlet(`Employee \n Manager`, (err, data) => {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
            console.log(data);
            displayPrompt();
        });

        // Method to return main option prompt after selecting an option
        const displayPrompt = async () => {

            // Set exit to false 
            let exit = false;

            const mainOptions = [{
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
                loop: false
            }];

            // Use while loop to return to main prompt
            while (!exit) {
                const answers = await inquirer.prompt(mainOptions);
                const selectedOption = answers.options;

                // Switch case to handle user's selected options
                switch (selectedOption) {

                    case 'View All Employees':
                        // Do select query to view all employees
                        await selectQuery.selectFromEmployee();
                        break;
                    case 'Add Employee':
                        // Initialize lists
                        let listR = await selectQuery.selectTitleFromRole();
                        let listM = await selectQuery.selectManagerFromEmployee();

                        // Questions for adding an employee
                        const employeeQ = [
                            {
                                type: 'input',
                                name: 'first_name',
                                message: `What is the employee's first name?`
                            },
                            {
                                type: 'input',
                                name: 'last_name',
                                message: `What is the employee's last name?`
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: `What is the employee's role?`,
                                choices: listR,
                                loop: false
                            },
                            {
                                type: 'list',
                                name: 'manager',
                                message: `Who is the employee's manager?`,
                                choices: listM,
                                loop: false
                            },
                        ];

                        // Prompt questions for adding employee
                        const employeeAns = await inquirer.prompt(employeeQ);
                        // Get the ids needed for insert query
                        let roleID = await selectQuery.selectRoleIDFromRole(employeeAns.role);
                        let getManagerID = await selectQuery.selectRoleIDFromEmployee(employeeAns.manager);
                        // Add all data into array
                        let addEmployeeData = [employeeAns.first_name, employeeAns.last_name, roleID, getManagerID];
                        // Insert data to insert query
                        await insertQuery.insertIntoEmployee(addEmployeeData);

                        break;

                    case 'Update Employee Role':
                        // Initialize lists
                        let listEmployee = await selectQuery.selectEmployeeFromEmployee();
                        let listTitle = await selectQuery.selectTitleFromRole();

                        // Update employee role questions
                        const updateRoleQ = [
                            {
                                type: 'list',
                                name: 'employee',
                                message: `Which employee's role do you want to update?`,
                                choices: listEmployee,
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Which role do you want to assign the select employee?',
                                choices: listTitle,
                                loop: false
                            },
                        ];
                        // prompt update employee role questions
                        const updateRoleAns = await inquirer.prompt(updateRoleQ);
                        // Get employee ID
                        let employeeRoleID = await selectQuery.selectRoleIDFromRole(updateRoleAns.role)
                        // Update role of employee
                        await udpateQuery.updateRoleOfEmployee(employeeRoleID, updateRoleAns.employee);
                        break;

                    case 'View All Roles':
                        // Select all roles
                        await selectQuery.selectFromRole();
                        break;
                    case 'Add Role':
                        // Initialize lists
                        let listRole = await selectQuery.selectNameFromDepartment();
                        const roleQ = [
                            {
                                type: 'input',
                                name: 'title',
                                message: 'What is the name of the role?'
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: 'What is the salary of the role?'
                            },
                            {
                                type: 'list',
                                name: 'department',
                                message: 'Which department does the role belong to?',
                                choices: listRole,
                                loop: false
                            },
                        ];
                        // Prompt add role questions
                        const roleAns = await inquirer.prompt(roleQ);
                        // Get id for deparment
                        let getID = await selectQuery.selectIDFromDepartment(roleAns.department);
                        let data = [roleAns.title, roleAns.salary, getID];
                        // Insert data
                        await insertQuery.insertIntoRole(data);

                        break;

                    case 'View All Departments':
                        // Select all departments
                        await selectQuery.selectAllFromDepartment();
                        break;

                    // Add new department
                    case 'Add Department':
                        const departmentQ = [{
                            type: 'input',
                            name: 'name',
                            message: 'What is the name of the department?'
                        }];
                        const addDepartment = await inquirer.prompt(departmentQ)
                        await insertQuery.insertIntoDepartment(addDepartment.name);

                        break;
                    // Case to exit main prompt
                    case 'Quit':
                        exit = true;
                        process.exit();
                }
            }
        };

    }
}

module.exports = CLI;