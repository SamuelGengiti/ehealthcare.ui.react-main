
import { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';

function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("https://localhost:44303/api/Product").then(res => res.json()).then(res => {
            setProducts(res);
            for (let i = 0; i < res.length; i++) {
                const prod = res[i];
                if (!categories.map(c => c.id).includes(prod.categoryID)) {
                    categories.push(prod.category);
                }
            }
            setCategories(categories);
            setFilteredProducts(res);
        });
    }, []);

    function handleFilter(event) {
        const categoryID = event.target.value;
        if (Number(categoryID) > 0) {
            const result = products.filter(p => p.categoryID == categoryID);
            setFilteredProducts(result);
        } else {
            setFilteredProducts(products);
        }
    }

    return (
        <div className="row">
            <select onChange={handleFilter} name="inputState" className="form-control">
                <option>Filter</option>
                {
                    categories.map(cat =>
                        <option value={cat.id}>{cat.name}</option>
                    )
                }
            </select>
            {
                filteredProducts.length > 0 &&
                filteredProducts.map(product =>
                    <div className="col-md-4" style={{ padding: "2% 3%" }}>
                        <ProductCard product={product}></ProductCard>
                    </div>
                )
            }
        </div >
    );
}

export default Home;