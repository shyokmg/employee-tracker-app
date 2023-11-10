const inquirer = require('inquirer');

class CLI {

    async run() {
        let exit = false;
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
            } else {
                console.log(`Selected ${selectedOption}`);
            }
        }
    }
}

module.exports = CLI;