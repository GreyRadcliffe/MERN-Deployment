import React, {useState, useEffect} from 'react';
import { Link } from '@reach/router';
import axios from 'axios';


export default () => {
    const [sortBy, setSortBy] = useState("Descending");
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then(res => setPets(res.data.sort((a, b) => (a.type > b.type) ? 1 : -1)))
            .catch(err => console.log("Error: ", err))
    }, [])
    const sortHandler = () => {
        if(sortBy === "Ascending"){
            setSortBy("Descending");
            setPets([...pets].sort((a, b) => (a.type > b.type) ? 1 : -1));
        } else{
            setSortBy("Ascending")
            setPets([...pets].sort((a, b) => (a.type < b.type) ? 1 : -1));
        }
    }

    return(
        <div>
            <h1>Pet Shelter</h1>
            <p>These pets are looking for a home!</p>
            <Link to="/pets/new">Add a pet to the shelter</Link>
            <p>Sort Pets: <button onClick={sortHandler}>{sortBy}</button></p>
            <table border="1px solid black" solid black>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            {pets.map((pet, i) => {
            return (
                <tr key={i}>
                    <td>{pet.name}</td>
                    <td>{pet.type}</td>
                    <td><Link to={`/pets/${pet._id}`} >Details</Link> <Link to={`/pets/${pet._id}/edit`}>Edit</Link></td>
                </tr>
            )})}
            </table>
        </div>
    )
}