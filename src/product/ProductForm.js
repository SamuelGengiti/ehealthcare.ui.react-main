import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom";
import './ProductForm.css'

function ProductForm() {

    const { id } = useParams();
    const [name, setName] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryID, setCategoryID] = useState([]);
    const [detail, setDetail] = useState([]);
    const [imgSrc, setImgSrc] = useState([]);
    const [isActive, setisActive] = useState([]);
    const [price, setPrice] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("https://localhost:44303/api/Product/" + id).then(res => res.json()).then(res => {
            setName(res.name);
            setCategoryID(res.categoryID);
            setDetail(res.detail);
            setImgSrc(res.imgSrc);
            setisActive(res.isActive);
            setPrice(res.price);
            setCategories(res.categories);
        });
    }, []);


    function handleNameChange(event) {
        setName(event.target.value)
    }
    function handleDetailChange(event) {
        setDetail(event.target.value)
    }

    function handleChange(event) {
        console.log(event.target.value);
        setCategoryID(event.target.value);
    }

    function handlePrice(event) {
        setPrice(event.target.value);
    }

    function handleSave(event) {
        event.preventDefault();
        fetch("https://localhost:44303/api/Product/", {
            method: id > 0 ? "PUT" : "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id: id,
                name: name,
                detail: detail,
                price: price,
                categoryID: categoryID,
                isActive: isActive,
                imgSrc: imgSrc
            })
        }).then(res => {
            history.replace("/Products");
        });
    }

    return (
        <div className="product-form">
            <form>
                <div className="form-group">
                    <label for="inputState">Categories</label>
                    <select onChange={handleChange} className="form-control">
                        {
                            categories.map(c =>
                                <option value={c.id} selected={c.id == categoryID}>{c.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-row row">
                    <div className="form-group col-md-6">
                        <label>Name</label>
                        <input onChange={handleNameChange} value={name} type="text" className="form-control" name="inputName" placeholder="Name" />
                    </div>
                </div>
                <div className="form-row row">
                    <div className="form-group col-md-12">
                        <label>Detail</label>
                        <textarea onChange={handleDetailChange} name="detail" value={detail} className="form-control"></textarea>
                    </div>
                </div>
                <div className="form-row row">
                    <div className="form-group col-md-6">
                        <label>Price</label>
                        <input onChange={handlePrice} value={price} type="number" className="form-control" name="inputPrice" placeholder="Price" />
                    </div>
                </div>
                <div className="form-group">
                    <label>ImageSrc</label>
                    <input onChange={(event) => { setImgSrc(event.target.value) }} value={imgSrc} type="text" className="form-control" name="imgSrc" placeholder="Image Source" />
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input onChange={(event) => { setisActive(event.target.value) }} value={isActive} className="form-check-input" type="checkbox" name="gridCheck" />
                        <label className="form-check-label">
                            Active
        </label>
                    </div>
                </div>
                <button type="submit" value={isActive} onClick={handleSave} className="btn btn-primary">Save</button>
            </form >
        </div >
    );
}

export default ProductForm;