import { useState, useEffect } from "react"
import './ListProduct.css';
import { useHistory } from 'react-router-dom';

function ListProduct() {

    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("https://localhost:44303/api/Product").then(res => res.json()).then(res => {
            setProducts(res);
        });
    }, []);

    function handleAdd() {
        history.replace('/product/0');
    }

    function handleRowClick(event) {
        history.replace('/product/' + event.id);
    }

    return (
        <div className="list-product">

            <button type="submit" onClick={handleAdd} className="btn btn-primary">New</button>
            <br /><br />
            {
                products &&
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Category</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Details</th>
                            <th scope="col">Price</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product =>
                                <tr onClick={() => handleRowClick(product)}>
                                    <td scope="row">{product.id}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.name}</td>
                                    <td><img width="100px" height="100px" src={product.imgSrc}></img></td>
                                    <td>{product.detail}</td>
                                    <td>{product.price}</td>
                                    <td innerText={product.isActive ? 'Yes' : 'No'}></td>
                                </tr>
                            )
                        }


                    </tbody>
                </table >
            }
        </div >
    );
}

export default ListProduct;