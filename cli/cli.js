const inquirer = require('inquirer');
const figlet = require('figlet');
const HandleQuery = require('../models/handleQuery.js');
const SelectQuery = require('../models/selectQuery.js');
const InsertQuery = require('../models/insertQuery.js');
const UpdateQuery = require('../models/updateQuery.js');

const handleQuery = new HandleQuery();
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

        const displayPrompt = async () => {

            let exit = false;
            const mainOptions = [{
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
                loop: false
            }];




            while (!exit) {
                const answers = await inquirer.prompt(mainOptions);
                const selectedOption = answers.options;


                switch (selectedOption) {
                    case 'View All Employees':
                        await selectQuery.selectFromEmployee();
                        break;
                    case 'Add Employee':
                        let listR = await selectQuery.selectTitleFromRole();
                        let listM = await selectQuery.selectManagerFromEmployee();
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

                        const employeeAns = await inquirer.prompt(employeeQ);
                        let roleID = await selectQuery.selectRoleIDFromRole(employeeAns.role);
                        let getManagerID = await selectQuery.selectRoleIDFromEmployee(employeeAns.manager);
                        let addEmployeeData = [employeeAns.first_name, employeeAns.last_name, roleID, getManagerID];
                        
                        await insertQuery.insertIntoEmployee(addEmployeeData);

                        break;
                    case 'Update Employee Role':
                        let listEmployee = await selectQuery.selectEmployeeFromEmployee();
                        let listTitle = await selectQuery.selectTitleFromRole();
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
                        const updateRoleAns = await inquirer.prompt(updateRoleQ);
                        await udpateQuery.updateRoleOfEmployee();
                        console.log(`Updated ${updateRoleAns.employee}'s Role`);
                        break;
                    case 'View All Roles':
                        await selectQuery.selectFromRole();
                        break;
                    case 'Add Role':
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
                        const roleAns = await inquirer.prompt(roleQ);
                        let getID = await selectQuery.selectIDFromDepartment(roleAns.department);
                        let data = [roleAns.title, roleAns.salary, getID];
                        await insertQuery.insertIntoRole(data);

                        break;
                    case 'View All Departments':
                        await selectQuery.selectAllFromDepartment();
                        break;
                    case 'Add Department':
                        const departmentQ = [{
                            type: 'input',
                            name: 'name',
                            message: 'What is the name of the department?'
                        }];
                        const addDepartment = await inquirer.prompt(departmentQ)
                        await insertQuery.insertIntoDepartment(addDepartment.name);

                        break;
                    case 'Quit':
                        exit = true;
                        process.exit();
                }
            }
        };

    }
}

module.exports = CLI;