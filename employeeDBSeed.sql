DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL ,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL ,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10),
    PRIMARY KEY (id)
);

-- Seed Departments
INSERT INTO `employee_DB`.`department` (`name`) VALUES ('Senior Management');
INSERT INTO `employee_DB`.`department` (`name`) VALUES ('Administration');
INSERT INTO `employee_DB`.`department` (`name`) VALUES ('Information Technology');
INSERT INTO `employee_DB`.`department` (`name`) VALUES ('Research');
INSERT INTO `employee_DB`.`department` (`name`) VALUES ('Marketing');
INSERT INTO `employee_DB`.`department` (`name`) VALUES ('Editorial');

-- Seed Roles
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('CEO', 100000.00, 1);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('CFO', 100000.00, 1);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('IT Manager', 70000.00, 3);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('IT Specialist', 50000.00, 3);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Research Director', 70000.00, 4);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Research Assistant', 45000.00, 4);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Marketing Director', 70000.00, 5);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Social Media Manager', 45000.00, 5);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Editorial Director', 70000.00, 6);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Copy Editor', 40000.00, 6);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Facilities Coordinator', 70000.00, 2);
INSERT INTO `employee_DB`.`role` (`title`, `salary`, `department_id`) VALUES ('Administrative Assistant', 40000.00, 2);

-- Seed Employees
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Lizette', 'Good', 1);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('Gaby', 'Good', 2);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Ruby', 'Good', 3, 1);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Brady', 'Good', 4, 3);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Marty', 'Good', 4, 3);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Pio', 'Grace', 5, 1);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Rosemary', 'Grace', 6, 6);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Angelina', 'Grace', 6, 6);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Lu-Ann', 'Mann', 7, 1);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Kaitlyn', 'Mann', 8, 9);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Christopher', 'Styles', 9, 1);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Gerard', 'Speedman', 10, 11);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Ambrose', 'Smart', 11, 1);
INSERT INTO `employee_DB`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Blair', 'Titan', 12, 13);