import { useState, useEffect } from "react"
import './ListCategory.css';
import { useHistory } from 'react-router-dom';

function ListCategory() {

    const history = useHistory();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44303/api/Cateogry", {
            headers: new Headers({
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken
            })
        }).then(res => res.json()).then(res => {
            setCategories(res);
        });
    }, []);

    function handleAdd() {
        history.replace('/category/0');
    }

    function handleRowClick(event) {
        history.replace('/category/' + event.id);
    }

    return (
        <div className="list-category">

            <button type="submit" onClick={handleAdd} className="btn btn-primary">New</button>
            <br /><br />
            {
                categories &&
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(category =>
                                <tr onClick={() => handleRowClick(category)}>
                                    <td scope="row">{category.id}</td>
                                    <td>{category.name}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table >
            }
        </div >
    );
}

export default ListCategory;