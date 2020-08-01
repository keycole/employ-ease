//Define module dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const dotenv = require('dotenv').config();
const chalk = require('chalk');

//Define console.log text styles
const welcomeStyle = chalk.bold.cyanBright;
const infoStyle = chalk.yellowBright;

//Create connection
const connection = mysql.createConnection({
    host: 'localhost' || process.env.PORT,

    port: process.env.PORT,

    user: process.env.MYSQL_USER,

    password: process.env.PASSWORD,

    database: 'employee_DB'
});

//Function to quit out of the application when "Exit Application" is selected
const endApplication = () => {
  console.log(welcomeStyle('We hope you were able to take care of everything you needed.','\n','2 cents before you go: “Strive not to be a success, but rather to be of value.” – Albert Einstein'));
  connection.end();
};


//** ! SERVER FUNCTIONS ! **//
  const addDepartment = () => {
    console.log('The add department function has been entered.');
    inquirer.prompt({
        name: 'newDepartment',
         type: 'input',
         message: 'What is the name of the department that you would like to add?'
    }).then((answers) => {
        //Test 
        connection.query("INSERT INTO department SET ?", {name: answers.newDepartment});
        console.log(infoStyle(`Success! Your new department has been added to the database`));
        runRequest();
    });
};


//After connection is made, console.log application info and summary
//Start function containing inquirer prompts
connection.connect(function(err) {
    if (err) throw err;

    ///Welcome banner console.log
    console.log(welcomeStyle(
      '>>>  WELCOME TO EMPLOY-EASE  <<<'
    ));

    ///Info summary message console.log
    console.log(infoStyle(
    'We want to make management simpler and easier for you.','\n', 
    '- You can use this CLI to quickly add or view Departments, Roles, and Employees.','\n',
    '- You can also update Employee Roles.','\n',
    '--------------------------------------------------------------------------------'
    ));

    //Inquirer prompts function - start
    runRequest();
  });
  
  //Initial Inquirer Prompts: select add, view, update, or exit
  const runRequest = () => {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add information",
          "View information",
          "Update information",
          "Exit application"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add information":
          addInfo();
          break;
  
        case "View information":
          viewInfo();
          break;
  
        case "Update information":
          updateInfo();
          break;

        case "Exit application":
          endApplication();
          break;
        }
      });
  }
  
  function addInfo() {
      console.log(infoStyle('OK, you would like to add some new information.'));
      inquirer
      .prompt([
        {
          name: "category",
          type: "rawlist",
          message: "What information would you like to add?",
          choices: [
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "I changed my mind. Go back to the start"
            ]
        }
      ])
      .then(function(answer) {
        console.log(infoStyle(`OK. You would like to: ${answer.category}`));

        switch (answer.category) {
          case "Add a Department":
            addDepartment();
            break;
    
          case "Add a Role":
            addRole();
            break;
    
          case "Add an Employee":
            addEmployee();
            break;

          case "I changed my mind. Go back to the start":
            runRequest();
            break;
          }
          
        });
  };
  
  function viewInfo() {
      //console.log('View info was selected.');
      console.log(infoStyle('OK, you would like to view some information.'));
      inquirer
      .prompt([
        {
          name: "category",
          type: "rawlist",
          message: "What information would you like to view?",
          choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "I changed my mind. Go back to the start"
            ]
        }
      ])
      .then(function(answer) {
        console.log(infoStyle(`OK. You would like to: ${answer.category}`));

        switch (answer.category) {
          case "Add a Department":
            viewDepartments();
            break;
    
          case "Add a Role":
            viewRoles();
            break;
    
          case "Add an Employee":
            viewEmployees();
            break;

          case "I changed my mind. Go back to the start":
            runRequest();
            break;
          }
        });
  };
  
  function updateInfo() {
      console.log('Update info was selected.');

      console.log(infoStyle('OK, you would like to update some information.'));
      inquirer
      .prompt([
        {
          name: "category",
          type: "rawlist",
          message: "What information would you like to update?",
          choices: [
            "Update employee role",
            "Update employee manager",
            "I changed my mind. Go back to the start"
            ]
        }
      ])
      .then(function(answer) {
        console.log(infoStyle(`OK. You would like to: ${answer.category}`));

        switch (answer.category) {
          case "Update employee role":
            updateEmployeeRole();
            break;
    
          case "Update employee manager":
            updateEmployeeManager();
            break;
    
          case "I changed my mind. Go back to the start":
            runRequest();
            break;
          }
        });
  };