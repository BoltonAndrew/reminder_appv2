/*jshint esversion:8*/
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
};

const addNote = async (myNote, category) => {
    try {
        const note = new Category({category: category, note: myNote, completed: false});
        await note.save();
    } catch (error) {
        console.log(error);
    }
};

const listNotes = async (category) => {
    try {
        const list = await Category.find({category});
        list.map((listItem, index) => {
            console.log(`${index + 1}. ${listItem.note}`);
        });
    } catch (error) {
        console.log("Category not found");
    }


};

const removeNote = async (noteToDelete, category) => {
    try {
        const note = await Category.find({category});
        const noteObj = note[noteToDelete - 1];
        await Category.deleteOne(noteObj);
    } catch (error) {
        console.log("Incorrect note number");
    }
};

const removeCat = async (category) => {
    try {
        const categories = await Category.find({category});
        categories.map(async (category) => {
            await Category.deleteOne(category);
        });
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