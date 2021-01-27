/*jshint esversion:8*/
const fs = require('fs');
const { Category } = require('../src/models/Category');

const categoryList = async () => {
    console.log("Category List:");
    try {
        const allEntries = await Category.find({});
        const categories = [];
        allEntries.map((entry) => {
            if(!categories.includes(entry.category)) {
                categories.push(entry.category);
            }
        });
        categories.map((category, index) => {
            console.log(`${index + 1}. ${category}`);
        });
    } catch (error) {
        console.log(error);
    }
    // console.log("Category List:");
    // let files = fs.readdirSync('./json');
    // files.map((file, index) => {
    //     let listItem = file.slice(0, -5);
    //     console.log(`${index + 1}. ${listItem}`);
    // });
};

const loadNotes = (category) => {
    try {
        const dataBuffer = fs.readFileSync(`./json/${category}.json`);
        const notesJson = dataBuffer.toString();
        return JSON.parse(notesJson);
    } catch (error) {
        return [];
    }
};

const addNote = async (myNote, category) => {
    try {
        const note = new Category({category: category, note: myNote, completed: false});
        await note.save();
    } catch (error) {
        console.log(error);
    }
};

const saveNotes = (currentNotes, category) => {
    const notesJson = JSON.stringify(currentNotes);
    fs.writeFileSync(`./json/${category}.json`, notesJson);
};

const listNotes = async (category) => {
    try {
        const list = await Category.find({category});
        list.map((listItem, index) => {
            console.log(`${index + 1}. ${listItem.note}`);
        });
    } catch (error) {
        console.log(error);
    }

    // const currentNotes = loadNotes(category);
    // currentNotes.map((note, index) => {
    //     console.log(`${index + 1}. ${note.reminder}`);
    // });
};

const removeNote = (noteToDelete, category) => {
    const currentNotes = loadNotes(category);
    try {
        const removedItem = currentNotes.splice(noteToDelete - 1, 1);
        console.log(`Successfully removed ${removedItem[0].reminder}`);
    } catch (error) {
        console.log("No note found there");
    }

    saveNotes(currentNotes, category);
};

const removeCat = (category) => {
    try {
        fs.unlinkSync(`./json/${category}.json`);
        console.log(`${category} category successfully deleted`);
    } catch (error) {
        console.log("No category by that name, please input category name");
    }
};

module.exports = {
    addNote,
    listNotes,
    removeNote,
    categoryList,
    removeCat
};