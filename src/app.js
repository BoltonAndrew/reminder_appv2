/*jshint esversion:8*/
const figlet = require('figlet');
const inquirer = require('inquirer');
const { addNote, listNotes, removeNote, categoryList } = require('../utils/notes');
const chalk = require('chalk');

const topLevelQuestion = [
    { type: "list", name: "options", message: "What would you like to do?", choices: ["add", "list", "remove", "exit"]}
];

const categoryQuestion = [
    { type: "input", name: "category", message: "Please input a current category or type a new category name you would like to create." }
];

const addQuestion = [{ type: "input", name: "add", message: "What would you like to add?" }];

const removeQuestion = [{ type: "number", name: "remove", message: "What would you like to remove? Please type a number" }];

const main = () => {
    console.log(chalk.blue(figlet.textSync("Notes App", { font: "isometric3" })));
    app();
};

const app = async () => {
    const answers = await inquirer.prompt(topLevelQuestion);
    if (answers.options == "add") {
        const answer = await inquirer.prompt(addQuestion);
        const cat = await inquirer.prompt(categoryQuestion);
        addNote(answer.add, cat.category);
        console.log(chalk.green("adding a note..."));
        app();
    } else if (answers.options == "list") {
        categoryList();
        const cat = await inquirer.prompt(categoryQuestion); 
        listNotes(cat.category);
        app();
    } else if (answers.options == "remove") {
        const cat = await inquirer.prompt(categoryQuestion);
        listNotes(cat.category);
        const answer = await inquirer.prompt(removeQuestion);
        removeNote(answer.remove, cat.category);
        console.log(chalk.green("removing a note..."));
        app();
    } else if (answers.options == "exit") {
        console.log(chalk.red("ok, bye for now"));
    }
};

main();