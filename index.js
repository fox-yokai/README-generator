const util = require("util");
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);


// prompt the user for title, description, table of contents, installation, usage, license, contributing, tests, questions
inquirer
    .prompt([
        {
        type: "input",
        message: "What is your GitHub username?",
        name: "username",
        // add validation here
    },
    {
        type: "input",
        message: "What is the title of your project?",
        name: "projectTitle",
        // should validate that its not null or uses spaces
    },
    {
        type: "input",
        message: "Enter a description",
        name: "description",
        // should validate that its not blank
    },
    {
        type: "confirm",
        message: "Do you wish to create a Table of Contents now?",
        name: "confirmToC",
    },
    {
        type: "confirm",
        message: "Do you wish to add installation instructions now?",
        name: "confirmInstall",
    },
    {
        type: "input",
        message: "What are the installation instructions?",
        name: "installation",
        when: function (answers) {
            return answers.confirmInstall === true;
        }
    },
    {
        type: "input",
        message: "Provide instructions and examples for use",
        name: "usage",
    },
    {
        type: "list",
        message: "Select license type",
        choices: ["none", "MIT", "GPLv2", "Apache"],
        name: "license",
    },
    {
        type: "input",
        message: "If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so.",
        name: "contributing",
    },
    {
        type: "input",
        message: "Provide any examples on how to run your application here",
        name: "tests",
    }
])
    .then(answers => {
    // take the input above and append to READNE.md file
    // append title to README.md

    // its late and I'm just trying to finish something to hand in at this point

        let title = answers.projectTitle;
        let description = answers.description;
        let install = answers.installation;
        let use = answers.usage;
        let lic = answers.license;
        let contrib = answers.contributing;
        let test = answers.tests;

        appendFileAsync("README.md",`# ${title}\n${description}\n## Installation\n${install}\n## Usage\n${use}\n## License\n${lic}\n## Contributing\n${contrib}\n## Tests\n${test}`);


    
    // use axios to contact the GitHub API
      // retrive the user's email and profile image
      let queryUrl = `https://api.github.com/users/${answers.username}`;

      axios
      .get(queryUrl)
      .then(function(res) {
          // need to add error handling for null values
        const gitEmail = res.data.email;
        const gitImg =  res.data.avatar_url;

        return appendFileAsync("README-test.md",`\n## Authors\n- ${answers.username} -_Initial work_- ${gitEmail} ![the author](${gitImg})`);
      })
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  })