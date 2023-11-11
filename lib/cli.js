const inquirer = require('inquirer');
const figlet = require('figlet');
const HandleQuery = require('./handleQuery.js');



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
                {
                    type: 'list',
                    name: 'name',
                    message: 'Which department does the role belong to?',
                    choices: departmentList,
                    loop: false
                }
        ]

            let exit = false;
            while (!exit) {
                const handleQuery = new HandleQuery();
                const answers = await inquirer.prompt(mainOptions);
                const selectedOption = answers.options;
                const sqlEmployee = `SELECT e.id, e.first_name AS first_name, e.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT_WS(' ', COALESCE(m.first_name, 'null'), m.last_name) AS  manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id ORDER by e.id`;
                const sqlRole = `SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id ORDER by role.id`;
                const sqlDepartment = `SELECT * FROM department ORDER by name`;

                switch (selectedOption) {
                    case 'View All Employees':
                        await handleQuery.viewTable(sqlEmployee);
                        break;
                    case 'Add Employee':
                        break;
                    case 'Update Employee Role':
                        break;
                    case 'View All Roles':
                        await handleQuery.viewTable(sqlRole);
                        break;
                    case 'Add Role':
                        await handleQuery.viewTable();
                        const roleAns = await inquirer.prompt(roleQuestions);
                        break;
                    case 'View All Departments':
                        await handleQuery.viewTable(sqlDepartment);
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