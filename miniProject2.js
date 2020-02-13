// const fs = require('fs');
// const axios = require('axios');
// const inquirer = require('inquirer');

// inquirer
//     .prompt({
//         message: 'Enter your Github username',
//         name: 'username'
//     })
//     .then(({username}) => {
//         const url = `https://api.github.com/users/${username}/repos?per_page=100`;

//         axios.get(url)
//             .then((res) => {
//                 const repoNames = res.data.map(repo => repo.name);

//                 fs.writeFile('my-repos.txt', repoNames, (err) => {
//                     if (err) {
//                         throw err;
//                     }

//                     console.log('Made a file');
//                 });
//             })
//     });






    const fs = require('fs');
    const axios = require('axios');
    const inquirer = require('inquirer');

    inquirer
    .prompt({
        type:'input',
        message: 'Enter your Github username',
        name: 'username'
    })
    .then(({username}) => {
        const url = `https://api.github.com/users/${username}/repos?per_page=100`;

        axios.get(url)
        .then((res) => {
                const repoNames = res.data.map(repo => repo.name);
            }).then (function(repoNames) {
const getHtml = generateHtml(repoNames);

    fs.writeFile ("miniProject2.html", getHtml, function(err){
        //null grabs everything - all the names - name, languages and contact
        // to define smth specific what to grab we can add '[name]' or '[languages]' to get specifically those objects
        // `\t` is for the space before 'name' in the resulting file; we can use numbers instead like 3 or 10 to define number of spaces to add 
        //`\t` stands for tabs actually
        if(err) {
            return console.log(err);
        }
        console.log("Success!")
    });
});

function generateHtml(repoNames) {
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <h1>Hi! My name is ${repoNames}</h1>
   
</body>
</html>
`
};