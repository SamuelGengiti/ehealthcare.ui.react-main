import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function ProductCard(props) {

    function handleAddToCartClick(){

    }

    const product = props.product;

    const header = (<img alt="Card" height="350px" src={product.imgSrc} />);
    const footer = (<Button label="Add to Cart" onClick={handleAddToCartClick} icon="pi pi-shopping-cart" className="p-button-raised p-button-warning"
        style={{ marginLeft: '.5em', align: 'center' }} >
    </Button>);
    return (
        <Card footer={footer} header={header} title={product.name} subTitle={product.category.name} style={{ width: "360px", color: "darkslateblue" }}
            styleClass="p-card-shadow">
            <h6 style={{ color: "black" }}>Price: {product.price}</h6>
            <p style={{ color: "darkgrey" }}>{product.detail}</p>
            <hr />
        </Card>
    )

}

export default ProductCard;