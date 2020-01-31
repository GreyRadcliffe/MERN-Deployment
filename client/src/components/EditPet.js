import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router';

export default props => {
    const [name, setName] = useState("");
    const [type, setType] = useState(0);
    const [desc, setDesc] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [likes, setLikes] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${props._id}`)
            .then(res => {
                setName(res.data.name);
                setType(res.data.type);
                setDesc(res.data.desc);
                if (res.data.skills[0]){setSkill1(res.data.skills[0])};
                if (res.data.skills[1]){setSkill2(res.data.skills[1])};
                if (res.data.skills[2]){setSkill3(res.data.skills[2])};
                setLikes(res.data.likes);
            })
            .catch(err => console.log("Error: ", err))
    }, [props._id])

    const onSubmitHandler = e => {
        const skills = [skill1, skill2, skill3].filter(word => word.length > 0);
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pets/${props._id}/edit`, {
            name,
            type,
            desc,
            skills,
            likes
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
    console.log(name);
    return (
        <div>
            <h2>Pet Shelter</h2>
            <h3>Edit {name}'s information:</h3>
            <form onSubmit={onSubmitHandler}>
                <p><label>Name</label>   {errors.name ? errors.name.message: ""}</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
                <p><label>Type</label>   {errors.type ? errors.type.message: ""}</p>
                <input type="text" value={type} onChange={e => setType(e.target.value)}/>
                <p><label>Description</label></p>
                <input type="text" value={desc} onChange={e => setDesc(e.target.value)}/>
                
                <p>Skills (Optional)</p>
                
                <p><label>Skill #1</label></p>
                <input type="text" value={skill1} key="1" onChange={e => setSkill1(e.target.value)}/>
                <p><label>Skill #2</label></p>
                <input type="text" value={skill2} key="2" onChange={e => setSkill2(e.target.value)}/>
                <p><label>Skill #3</label></p>
                <input type="text" value={skill3} key="3" onChange={e => setSkill3(e.target.value)}/>
                
                <input type="submit" />
                <Link to="/pets">Cancel</Link>
            </form>
        </div>
    )
}
