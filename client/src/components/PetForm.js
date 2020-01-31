import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

export default props => {
    const [name, setName] = useState("");
    const [type, setType] = useState(0);
    const [desc, setDesc] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState({});

    const onSubmitHandler = e => {
        const skills = [skill1, skill2, skill3].filter(word => word.length > 0);
        e.preventDefault();
        console.log(name, type, desc, skills);
        axios.post('http://localhost:8000/api/pets/create', {
            name,
            type,
            desc,
            skills
        })
            .then(res => {
                if(res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate("/pets")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h2>Pet Shelter</h2>
            <h3>Add a pet to the shelter:</h3>
            <form onSubmit={onSubmitHandler}>
                <p><label>Name</label>   {errors.name ? errors.name.message: ""}</p>
                <input type="text" onChange={e => setName(e.target.value)}></input>
                <p><label>Type</label>   {errors.type ? errors.type.message: ""}</p>
                <input type="text" onChange={e => setType(e.target.value)}/>
                <p><label>Description</label></p>
                <input type="text" onChange={e => setDesc(e.target.value)}/>
                
                <p>Skills (Optional)</p>
                
                <p><label>Skill #1</label></p>
                <input type="text" key="1" onChange={e => setSkill1(e.target.value)}/>
                <p><label>Skill #2</label></p>
                <input type="text" key="2" onChange={e => setSkill2(e.target.value)}/>
                <p><label>Skill #3</label></p>
                <input type="text" key="3" onChange={e => setSkill3(e.target.value)}/>
                
                <input type="submit" />
            </form>
        </div>
    )
}