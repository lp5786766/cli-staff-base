const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allEmployees = [];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your engineer's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your engineer's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your engineer's email?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your engineer's GitHub?",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your intern's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your intern's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your intern's email?",
  },
  {
    type: "input",
    name: "school",
    message: "What is your intern's school?",
  },
];

inquirer
  .prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is your manager's name?",
    },
    {
      type: "input",
      name: "managerId",
      message: "What is your manager's ID?",
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is your manager's email?",
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is your manager's Office Number?",
    },
  ])
  .then((answers) => {
    const manager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.managerOfficeNumber
    );
    allEmployees.push(manager);
    addEmployee();
    // function that prompts the user to add a new Employee:
    function addEmployee() {
      inquirer
        .prompt({
          type: "list",
          name: "addNewEmployee",
          message: "Which type of team member would you like to add?",
          choices: ["Intern", "Engineer", "Thank you, I'm done"],
        })
        .then((answers) => {
          if (answers.addNewEmployee === "Engineer") {
            inquirer.prompt(engineerQuestions).then((answers) => {
              const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
              );
              allEmployees.push(engineer);
              addEmployee();
            });
          } else if (answers.addNewEmployee === "Intern") {
            inquirer.prompt(internQuestions).then((answers) => {
              const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
              );
              allEmployees.push(intern);
              addEmployee();
            });
          } else {
            console.log("Thank you! Your team page has been created!");
            // render the array of all employees
            const data = render(allEmployees);
            // create a new html file with the provided data
            fs.writeFileSync(outputPath, data, "utf-8");
          }
        });
    }
  });