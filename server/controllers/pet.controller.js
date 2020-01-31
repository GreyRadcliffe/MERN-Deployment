const { Pet } = require('../models/pet.model');

module.exports.index = (req, res) => {
    res.json({
        route: "/pets"
    })
}

module.exports.createPet = (req, res) => {
    const {name, type, desc, skills, likes = 0} = req.body;
    Pet.create({
        name,
        type,
        desc,
        skills,
        likes
    })
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

module.exports.getAllPets = (req, res) => {
    Pet.find() // FIND ALL PETS
        .then(allPets => res.json(allPets))
        .catch(err => res.json(err));
}

module.exports.getOnePet = (req, res) => {
    Pet.findOne({_id: req.params._id})
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

module.exports.deletePet = (req, res) => {
    Pet.deleteOne({_id: req.params._id})
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

module.exports.editPet = (req, res) => {
    const {name, type, desc, skills, likes} = req.body;
    Pet.findOneAndUpdate({_id: req.params._id}, {
        name,
        type,
        desc,
        skills,
        likes
    })
        .then(newPet => res.json(newPet))
        .catch(err => res.json(err))
}