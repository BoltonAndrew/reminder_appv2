/*jshint esversion:8*/
const fs = require('fs');
const chalk = require('chalk');

const loadNotes = (category) => {
    try {
        const dataBuffer = fs.readFileSync(`src/${category}.json`);
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
    fs.writeFileSync(`src/${category}.json`, notesJson);
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

module.exports = {
    addNote,
    listNotes,
    removeNote
};