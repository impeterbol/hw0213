const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const generateHTML = require('./generateHTML')

const questions = [

];

function writeToFile(fileName, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileName, data, err => {
            if (err) reject(err)
            resolve("Made a file")
        })
    })
}

async function initES6() {
    try {
        const { username, color } = await inquirer.prompt([
            {
                message: 'Enter your Github username',
                name: 'username'
            },
            {
                name: 'color',
                type: 'list',
                choices: ['green', 'blue', 'pink', 'red']
            }
        ])
        if (!username) {
            throw "No User!"
        }

        const github = await axios.get(`https://api.github.com/users/${username}`);
        const repos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repoNames = repos.data.map(repo => repo.name);

        // location: github.location
        // name: github.name
        // company: github.company
        console.log(github)
        const html = generateHTML({
            color,
            ...github.data
        })
        console.log(html)
        await writeToFile('./profile.html', html);


    } catch (error) {
        console.log(error)
    }
}

// function init() {
//     inquirer
//         .prompt({
//             message: 'Enter your Github username',
//             name: 'username'
//         })
//         .then(({ username }) => {
//             const url = `https://api.github.com/users/${username}/repos?per_page=100`;

//             axios.get(url)
//                 .then((res) => {
//                     const repoNames = res.data.map(repo => repo.name);

//                     writeToFile('./index-test.js', repoNames)
//                         .then(function (res) {
//                             console.log(res)
//                         })
//                         .catch(function (err) {
//                             console.log(err)
//                         })
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })
//         .catch(function (err) {
//             console.log(err)
//         });
// }

initES6();

