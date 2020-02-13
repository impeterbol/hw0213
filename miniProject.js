const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
{
    type:'input',
    name:'name',
    message:'What is your name?'
},
{
    type:'input',
    name:'city',
    message:'Where are you from?'
},

{
    type:'input',
    name:'github',
    message:'What is your GitHub name?'
},

]).then (function(responses) {
const getHtml = generateHtml(responses);

    fs.writeFile ("miniProject.html", getHtml, function(err){
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

function generateHtml(responses) {
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <h1>Hi! My name is ${responses.name}</h1>
    <h2>I am from ${responses.city}</h2>
    <h3>My Github name is ${responses.github}</h3>
</body>
</html>
`
    
}