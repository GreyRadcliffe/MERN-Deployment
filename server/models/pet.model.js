const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, "Length must be atleast 2 characters."],
        unique: true
    },
    type: {
        type: String,
        minlength: [2, "Length must be atleast 2 characters."],
    },
    desc: {
        type: String,
        required: false
    },
    skills: [{
        type: String,
        minlength: 1,
        required: false
    }],
    likes: {
        type: Number
    }
}, {timestamps: true});

module.exports.Pet = mongoose.model("Pet", PetSchema);