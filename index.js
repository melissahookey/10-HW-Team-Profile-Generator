// packages
const fs = require("fs");
const inquirer = require("inquirer");
// classes

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

function init() {
    startHtml();
    addEmployee();
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter employee's name:"
        
    },
    {
        type: "list",
        name: "role",
        message: "Select employee's position:",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ],
    },
    {
        type: "input",
        name: "id",
        message: "Enter employee's id number:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter employee's email:",
    }])  
    .then(function({name, role, id, email}) {
        let extraInfo = "";
        if (role === "Manager") 
        {
            extraInfo = "office number";
        } else if (role === "Engineer")
        {
            extraInfo = "Github username";
        } else {
            extraInfo = "school name";
        }
        inquirer.prompt ([{
            name: extraInfo,
            message: `Enter employee's ${extraInfo}`
        },
        {
            type: "list",
            name: "moreEmployees",
            message: "Add more employee's?",
            choices: [
                "yes",
                "no"
            ]
        }])
        .then(function({extraInfo, moreEmployees}) {
            let newEmployee;
            if (role === "Manager") {
                newEmployee = new Manager(name. id, email, extraInfo);
            } else if (role === "Engineer") {
                newEmployee = new Engineer(name. id, email, extraInfo);
            } else (role === "Intern"); {
                newEmployee = new Intern(name. id, email, extraInfo);
            }
            employees.push(newEmployee);
            addHTML(newEmployee)
            .then (function() {
                if (newEmployee === "yes") {
                    addEmployee();
                } else {
                    finishHTML();
                }
            });
        });
    });
}    

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
        fs.writeFile("./result/team.html", html, function(err) {
            if (err) {
                console.log(err);
            }
    });
    console.log("start");
}


function addHTML(teammate) {
    return new Promise(function(resolve, reject) {
        const name = teammate.getName();
        const role = teammate.getRole();
        const id = teammate.getId();
        const email = teammate.getEmail();
        let data = "";
        if (role === "Manager") {
            const officePhone = teammate.getOfficeNumber ();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Engineer") {
            const gitHub = teammate.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const school = teammate.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        }
        console.log("adding employee");
        fs.appendFile("./result/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });   
}

function finishHTML() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./result/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}


init(); 