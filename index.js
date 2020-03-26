// The README will be populated with the following:

// At least one badge
// Project title
// Description
// Table of Contents
// Installation
// Usage
// License
// Contributing
// Tests
// Questions

// User GitHub profile picture
// User GitHub email

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
            // should validate here
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
            name: "confimToC",
        },
        {
            type: "input",
            message: "What are the installation instructions?",
            name: "installation",
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
      // use axios to contact the GitHub API
        // retrive the user's email and profile image
        const queryUrl = `https://api.github.com/users/${answers.username}`;

        axios
        .get(queryUrl)
        .then(function(res) {
            const gitImageUrl = res.data.avatar_url;
            const gitEmail = res.data.email;

    // take the input above and create a READNE.md file

    // dynamically create Table of Contents
    // append the data above to file
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });