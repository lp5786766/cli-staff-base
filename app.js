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





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
  .then(answers => {
      console.log(answers);
      
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      allEmployees.push(manager);
      addEmployee();
    function addEmployee() {
        inquirer.prompt(
            {
                type: "list",
                name: "addNewEmployee",
                message: "Which type of team member would you like to add?",
                choices: ["Intern", "Engineer", "Thank you, I'm done"],
              },
        ).then(answers => {
            if (answers.addNewEmployee === "Engineer") {
                inquirer.prompt(engineerQuestions).then(answers => {
                    console.log(answers);
                    // const engineer = new Engineer(answers.)
                    addEmployee();
                });
            } else if (answers.addNewEmployee === "Intern") {
                inquirer.prompt(internQuestions).then(answers => {
                    console.log(answers);
                    // const engineer = new Engineer(answers.)
                    addEmployee();
                });
            } else {
                console.log("Thank you! Your team page has been created!");
            }
        });
    }
    


// add employee function:
//







      const data = render(allEmployees);
      fs.writeFileSync(outputPath, data, "utf-8");
    // inquirer.prompt;
  });


//
// - Intern
// - Engineer *****
// - I'm done.

// What is your engineer's name?
// What is your engineer's ID?
// What is your engineer's email
// What is your engineer's Github?

// Which type of team member would you like to add?
// - Intern
// - Engineer *****
// - I'm done.

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// role manager = {
//     name: "",
//     id: "",
//     email: "",
//     office number: "",
// }

// role engineer = {
//     name: "",
//     id: "",
//     email: "",
//     Github: "",
// }

// role intern = {
//     name: "",
//     id: "",
//     email: "",
//     school: "",
// }

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
