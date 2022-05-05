import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import './CategoryForm.css'

function CategoryForm() {

    const { id } = useParams();
    const [name, setName] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("https://localhost:44303/api/Cateogry/" + id, {
            headers: new Headers({
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken
            })
        }).then(res => res.json()).then(res => {
            setName(res.name);
        });
    }, []);


    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleSave(event) {
        event.preventDefault();
        fetch("https://localhost:44303/api/Cateogry/", {
            method: id > 0 ? "PUT" : "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
                'Content-Type':'application/json'
            }),
            body: JSON.stringify({
                id: id,
                name: name
            })
        }).then(res => {
            history.replace("/Categories");
        });
    }

    return (
        <form className="form" onSubmit={handleSave}>
            <div className="form-row row">
                <div className="form-group col-md-6">
                    <label for="inputName">Name</label>
                    <input value={name} type="text" onChange={handleNameChange} className="form-control" name="inputName" placeholder="Name" />
                </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Save</button>
        </form >
    );
}

export default CategoryForm;