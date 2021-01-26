/*jshint esversion:8*/
const fs = require('fs');

const categoryList = () => {
    let files = fs.readdirSync('./json');
    files.map((file, index) => {
        let listItem = file.slice(0, -5);
        console.log(`${index + 1}. ${listItem}`);
    });
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

const addNote = (myNote, category) => {
    const currentNotes = loadNotes(category);
    currentNotes.push({reminder: myNote});
    saveNotes(currentNotes, category);
};

const saveNotes = (currentNotes, category) => {
    const notesJson = JSON.stringify(currentNotes);
    fs.writeFileSync(`./json/${category}.json`, notesJson);
};

const listNotes = (category) => {
    const currentNotes = loadNotes(category);
    currentNotes.map((note, index) => {
        console.log(`${index + 1}. ${note.reminder}`);
    });
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