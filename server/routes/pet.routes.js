const PetController = require('../controllers/pet.controller');

module.exports = function(app){
    app.get('/api', PetController.index);
    app.post('/api/pets/create', PetController.createPet);
    app.get('/api/pets', PetController.getAllPets);
    app.get('/api/pets/:_id', PetController.getOnePet);
    app.delete('/api/pets/:_id/delete', PetController.deletePet);
    app.put('/api/pets/:_id/edit', PetController.editPet);
}