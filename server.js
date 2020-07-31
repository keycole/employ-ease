//Define dependencies
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
    host: "localhost" || process.env.PORT,

    port: process.env.PORT,

    user: process.env.MYSQL_USER,

    password: process.env.PASSWORD,

    //database = "employee_DB"
});

//After connection is made, console.log application into and summary
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
  
  function runRequest() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add information",
          "View information",
          "Update information"
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
            "Department information",
            "Role information",
            "Employee information"
            ]
        }
      ])
      .then(function(answer) {
        console.log(infoStyle(`OK. You would like to add: ${answer.category}`));

        switch (answer.category) {
          case "Department information":
            addDepartment();
            break;
    
          case "Role information":
            addRole();
            break;
    
          case "Employee information":
            addEmployee();
            break;
          }
        });
  };
  
  function viewInfo() {
      console.log('View info was selected.');
  };
  
  function updateInfo() {
      console.log('Update info was selected.');
  };

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});