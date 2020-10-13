import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from '../../StateProvider';
import StarRateOutlinedIcon from '@material-ui/icons/StarRateOutlined';

function CheckoutProduct({ id, image, title, price, description, rating, hideButton }) {
    const [dispatch] = useStateValue();
    const removeFromCart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id,
        })
    }

    return (
        <div className="checkoutProduct-container">
            <img alt="product" src={image} className="checkoutProduct-image" />
            <div className="checkoutProduct-info">
                <p className="checkoutProduct-title">{title}</p>
                <p className="checkoutProduct-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <p className="checkoutProduct-rating">
                    {Array(rating).fill().map((_, i) => (
                        <StarRateOutlinedIcon style={{ color: '#FF9900' }} />
                    ))}
                </p>
                {!hideButton && (
                    <button onClick={removeFromCart}>Remove from Cart</button>

                )}

            </div>

        </div>

    );
}

export default CheckoutProduct