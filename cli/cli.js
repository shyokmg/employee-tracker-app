const inquirer = require('inquirer');
const figlet = require('figlet');
const HandleQuery = require('../models/handleQuery.js');
const SelectQuery = require('../models/selectQuery.js')



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
            const mainOptions = [{
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
                loop: false
            }];

            const departmentQuestions = [{
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of the department?'
                }];

            const roleQuestions = [
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                // {
                //     type: 'list',
                //     name: 'name',
                //     message: 'Which department does the role belong to?',
                //     choices: departmentList,
                //     loop: false
                // }
        ]

            let exit = false;
            while (!exit) {
                const handleQuery = new HandleQuery();
                const selectQuery = new SelectQuery();
                const answers = await inquirer.prompt(mainOptions);
                const selectedOption = answers.options;


                switch (selectedOption) {
                    case 'View All Employees':
                        await selectQuery.selectFromEmployee();
                        break;
                    case 'Add Employee':
                        break;
                    case 'Update Employee Role':
                        break;
                    case 'View All Roles':
                        await selectQuery.selectFromRole();
                        break;
                    case 'Add Role':
                        const list = await handleQuery.viewTable();
                        const roleAns = await inquirer.prompt(roleQuestions);
                        break;
                    case 'View All Departments':
                        await selectQuery.selectAllFromDepartment();
                        break;
                    case 'Add Department':
                        const deptAns = await inquirer.prompt(departmentQuestions)
                        await handleQuery.insertQuery(deptAns.name);
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