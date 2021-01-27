/*jshint esversion:8*/
require('./db/connection');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { addNote, listNotes, removeNote, categoryList, removeCat } = require('../utils/notes');
const chalk = require('chalk');
const mongoose = require('mongoose');

const topLevelQuestion = [
    { type: "list", name: "options", message: "What would you like to do?", choices: ["add", "list", "remove", "exit"]}
];

const categoryQuestion = [
    { type: "input", name: "category", message: "Please input a current category or type a new category name you would like to create." }
];

const addQuestion = [{ type: "input", name: "add", message: "What note would you like to add?" }];

const removeQuestion = [{ type: "number", name: "remove", message: "What would you like to remove? Please type a number" }];

const removeCatQuestion = [{ type: "input", name: "catRemove", message: "Which category would you like to remove? Please enter category name" }];

const whichRemove = [{ type: "list", name: "which", message: "Would you like to remove a category or a note?", choices: ["category", "note"] }];

const main = () => {
    console.log(chalk.blue(figlet.textSync("Notes App", { font: "isometric3" })));
    app();
};

const app = async () => {
    const answers = await inquirer.prompt(topLevelQuestion);
    if (answers.options == "add") {
        const answer = await inquirer.prompt(addQuestion);
        await categoryList();
        const cat = await inquirer.prompt(categoryQuestion);
        addNote(answer.add, cat.category);
        console.log(chalk.green("adding a note..."));
        app();
    } else if (answers.options == "list") {
        await categoryList();
        const cat = await inquirer.prompt(categoryQuestion); 
        await listNotes(cat.category);
        app();
    } else if (answers.options == "remove") {
        const which = await inquirer.prompt(whichRemove);

        if (which.which == "category") {

            await categoryList();
            const category = await inquirer.prompt(removeCatQuestion);
            await removeCat(category.catRemove);

        } else if (which.which == "note") {
            await categoryList();
            const cat = await inquirer.prompt(categoryQuestion);
            listNotes(cat.category);
            const answer = await inquirer.prompt(removeQuestion);
            removeNote(answer.remove, cat.category);
            console.log(chalk.green("removing a note..."));

        }

        app();
    } else if (answers.options == "exit") {
        console.log(chalk.red("ok, bye for now"));
        mongoose.connection.close();
    }
};

main();