/*jshint esversion:8*/
const figlet = require('figlet');
const inquirer = require('inquirer');
const { addNote, listNotes, removeNote } = require('../utils/notes');
const chalk = require('chalk');

const topLevelQuestion = [
    { type: "list", name: "options", message: "What would you like to do?", choices: ["add", "list", "remove", "exit"]}
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
        addNote(answer.add);
        console.log(chalk.green("adding a note..."));
        app();
    } else if (answers.options == "list") {
        listNotes();
        app();
    } else if (answers.options == "remove") {
        listNotes();
        const answer = await inquirer.prompt(removeQuestion);
        removeNote(answer.remove);
        console.log(chalk.green("removing a note..."));
        app();
    } else if (answers.options == "exit") {
        console.log(chalk.red("ok, bye for now"));
    }
};

main();