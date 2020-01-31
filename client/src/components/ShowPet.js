import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import {navigate} from '@reach/router';

export default (props) => {
    const [pet, setPet] = useState({skills: []});
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props._id}`)
            .then(res => setPet(res.data))
            .catch(err => console.log("Error: ", err))
    }, [props._id])

    const adoptPet = (e) => {
        axios.delete(`http://localhost:8000/api/pets/${props._id}/delete`)
            .then(res => {console.log(res.data); return navigate("pets")})
            .catch(err => console.log({Message: "Error has occurred...", Error: err}))
    }

    const likePet = () => {
        const likes = pet.likes + 1;
        const name = pet.name, type = pet.type, desc = pet.desc, skills = pet.skills;
        axios.put(`http://localhost:8000/api/pets/${props._id}/edit`, {
            name,
            type,
            desc,
            skills,
            likes
        })
            .then(() => {setLiked(true)})
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Pet Shelter</h2>
            <h4>Information about {pet.name}</h4>
            <p>Pet Type: {pet.type}</p>
            <p>Description: {pet.description}</p>
            <p>Skills: </p>
            <ul>
                {pet.skills.map((skill, i) => {return (<li key={i}>{skill}</li>)})}
            </ul>
            <p>Likes: {liked ? pet.likes+1: pet.likes}</p>
            {liked === false ? <button onClick={likePet}>Like</button>: <span></span>}
            <Link to="/pets" onClick={adoptPet}>Adopt this pet</Link>
            <br></br>
            <Link to="/pets">Home</Link>
        </div>
    )
}