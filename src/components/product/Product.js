import React from 'react';
import StarRateOutlinedIcon from '@material-ui/icons/StarRateOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

import './Product.css';

function Product({ id, title, price, image, rating }) {
    return (
        <div className="product-container">
            <div className="product-info">
                <p>{title}</p>
                <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product-rating">
                    {Array(rating).fill().map((_, i) => (
                        <StarRateOutlinedIcon style={{ color: '#FF9900' }} />
                    ))}

                </div>
            </div>
            <img src={image}></img>
            <button> < AddShoppingCartOutlinedIcon />Add to Cart</button>
        </div>
    );
}

export default Product;