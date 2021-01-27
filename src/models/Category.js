/*jshint esversion:8*/
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category,
};