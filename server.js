//Define module dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const eTable = require('easy-table');
const dotenv = require('dotenv').config();
const chalk = require('chalk');

//Define console.log text styles
const welcomeStyle = chalk.bold.cyanBright;
const infoStyle = chalk.yellowBright;

//Define variables that need to be accessed outside of functions
let deptArray = [];
let deptObjArray = [];
let thisRoleID;
let roleObjArray = [];
let roleArray = [];
let employeeRoleID;
let employeeManagerID;
let employeeObjArray = [];
let employeeArray = [];
let employeeTargetID;

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
  console.log(welcomeStyle(' ------------------------------------------------------------','\n','We hope you were able to take care of everything you needed.','\n','2 cents before you go: “Strive not to be a success, but rather to be of value.” – Albert Einstein', '\n', '------------------------------------------------------------'));
  connection.end();
};

//-------------------------------------------------------------------------//
  /////////////////////////  SERVER   FUNCTIONS  /////////////////////////
//-------------------------------------------------------------------------//

//Helper functions to get shared information from other tables:
  //Grab all departments
  //Saves an array of complete dept objects, and an array of dept names
const allDepartments = () => {
  deptObjArray = [];
  deptArray = [];
  connection.query(
      "SELECT * from department", function(err, res){
        for(const department of res){
          deptObjArray.push(department);
          deptArray.push(department.name);
        }
        return(deptObjArray, deptArray);
      } 
  )};

  //Matches the department id to the role
const getDeptID = (answers) => {
  for(let item of deptObjArray){
    if(item.name == answers.roleDepartment){
      thisRoleID = item.id;
      return thisRoleID;
    }
  };
};
  //Grab all roles
  //Saves an array of complete role objects, and an array of role titles
const allRoles = () => {
  roleObjArray = [];
  roleArray = [];
  connection.query(
  "SELECT * from role", function(err, res){
    for(const role of res){
      roleObjArray.push(role);
      roleArray.push(role.title);
    }
    return(roleObjArray, roleArray);
  } 
)};

  //Grab all Employees
  //Saves an array of complete employee objects, and an array of employee names
const allEmployees = () => {
  employeeObjArray = [];
  employeeArray = [];
  connection.query(
    "SELECT * from employee", function(err, res){
      for(const employee of res){
        let thisName = employee.first_name + ' ' + employee.last_name;
        employeeObjArray.push(employee);
        employeeArray.push(thisName);
      }
      return(employeeObjArray, employeeArray);
    });
};

  //Matches the role id to the employee
const getRoleID = (answers) => {
  for(let item of roleObjArray){
    if(item.title == answers.employeeDepartment){
      employeeRoleID = item.id;
      return employeeRoleID;
    }
  };
};

  //Assigns a manager's employee id to an employee's manager_id
const getManagerID = (answers) => {
  for(let item of employeeObjArray){
    let thisName = item.first_name + ' ' + item.last_name;
    if(thisName == answers.employeeManager){
      employeeManagerID = item.id;
      return employeeManagerID;
    }
  };
};

// ++++ ADD FUNCTIONS ++++
//Add Department - verified
const addDepartment = () => {
    inquirer.prompt({
        name: 'newDepartment',
         type: 'input',
         message: 'What is the name of the department that you would like to add?'
    }).then((answers) => {
        connection.query("INSERT INTO department SET ?", {name: answers.newDepartment});
        console.log(infoStyle(`Success! Your new department has been added to the database`));
        runRequest();
    });
};
//Add Role - verified
const addRole = () => {
  try{
    allDepartments();
    inquirer.prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Please enter the new role title."
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Please enter the new role salary."
      },
      {
        name: "roleDepartment",
        type: "rawlist",
        message: "What department does the new role belong to?",
        choices: deptArray
      }
    ]).then(function(answers){
      getDeptID(answers);

      connection.query('INSERT INTO role SET ?', 
        {
          title: answers.roleTitle,
          salary: answers.roleSalary,
          department_id: thisRoleID
        });
        console.log(infoStyle(`Success! Your new role has been added to the database`));
        runRequest();
    });
    } catch(err) {
      if(err){
        throw err;
      }
    }; 
};
//Add Employee - verified
const addEmployee = () => {
  try{
    allEmployees();
    allRoles();
    inquirer.prompt([
      {
        name: "newFirstName",
        type: "input",
        message: "Please enter the new employee's first name."
      },
      {
        name: "newLastName",
        type: "input",
        message: "Please enter the new employee's last name."
      },
      {
        name: "employeeDepartment",
        type: "rawlist",
        message: "What is the new employee's role?",
        choices: roleArray
      },
      {
        name: "hasManager",
        type: "confirm",
        message: "Does the employee have a manager?"
      },
      {
        name: "employeeManager",
        type: "rawlist",
        message: "Please select the employee's manager from the list.",
        choices: employeeArray,
        when: function(answers){
          return answers.hasManager;
        }
      }])
      .then(function(answers){
        getRoleID(answers);

        if(answers.hasManager){
          getManagerID(answers);
        };

      connection.query('INSERT INTO employee SET ?', 
        {
          first_name: answers.newFirstName,
          last_name: answers.newLastName,
          role_id: employeeRoleID,
          manager_id: employeeManagerID
        });
        console.log(infoStyle(`Success! Your new employee has been added to the database`));
        runRequest();
    });
    } catch(err) {
      if(err){
        throw err;
      }
    }; 
};

// (*)-(*) VIEW FUNCTIONS (*)-(*)
  //View all departments - verified
const viewDepartments = async () => {
    connection.query(
      'SELECT * from department', function(err,res){
        
        let t = new eTable;
        
        res.forEach(function(item) {
          t.cell('ID', item.id);
          t.cell('Department Name', item.name);
          t.newRow();
        });
        
        console.log(t.toString());
        runRequest();
      });
};
  //View all roles - verified
const viewRoles = () => {
    connection.query(
      'SELECT * from role', function(err,res){
        
        let t = new eTable;
        
        res.forEach(function(role) {
          t.cell('ID', role.id);
          t.cell('Role Title', role.title);
          t.cell('Salary', role.salary);
          t.cell('Department ID', role.department_id);
          t.newRow();
        });
        
        console.log(t.toString());
        runRequest();
      });
  
};
  //View all employees - verified
const viewEmployees = () => {
    connection.query(
      'SELECT * from employee ', function(err,res){
        
        let t = new eTable;
        
        res.forEach(function(employee) {
          t.cell('ID', employee.id);
          t.cell('First Name', employee.first_name);
          t.cell('Last Name', employee.last_name);
          t.cell('Role ID', employee.role_id);
          t.cell('Manager ID', employee.manager_id);
          t.newRow();
        });
        
        console.log(t.toString());
        runRequest();
      });
  
};

// ^^^^ UPDATE FUNCTIONS ^^^^
const updateEmployeeRole = () => {
    
  };

const updateEmployeeManager = () => {

};

//-------------------------------------------------------------------------//
  /////////////////////////  INITIAL  FUNCTIONS  /////////////////////////
//-------------------------------------------------------------------------//

//After initial connection is made, console.log application info and summary
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
  };
  
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
        console.log(infoStyle(`OK. You would like to: ${answer.category}`, `\n`, `--------------------------------------------------------`));

        switch (answer.category) {
          case "View all Departments":
            viewDepartments();
            break;
    
          case "View all Roles":
            viewRoles();
            break;
    
          case "View all Employees":
            viewEmployees();
            break;

          case "I changed my mind. Go back to the start":
            runRequest();
            break;
          }
        });
  };
  
  function updateInfo() {
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
            allEmployees();
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