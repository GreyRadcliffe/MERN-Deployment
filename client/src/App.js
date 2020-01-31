import React from 'react';
import './App.css';
import Index from './components/Index';
import ShowPets from './components/ShowPets';
import PetForm from './components/PetForm';
import ShowPet from './components/ShowPet';
import EditPet from './components/EditPet';


import { Router } from '@reach/router';

function App() {
  return (
    <>
      <Router>
        <Index path="/"/>
        <PetForm path="/pets/new"/>
        <ShowPets path="/pets"/>
        <ShowPet path="/pets/:_id" />
        <EditPet path="/pets/:_id/edit" />
      </Router>
    </>
  );
}

export default App;
