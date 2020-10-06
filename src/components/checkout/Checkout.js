import React from 'react';
import './Checkout.css';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from './CheckoutProduct';

import SubTotal from './Subtotal';

function Checkout() {
    const [{ cart }, dispatch] = useStateValue();
    return (
        <div className="checkout-container">
            <div className="checkout-left">
                <img
                    className="checkout-ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />
                <div>
                    <h2 className="checkout-title">Your shopping cart</h2>
                    {cart.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            description={item.description}

                        />

                    ))}

                </div>
            </div>
            <div className="checkout-right">
                <SubTotal />
            </div>
        </div>

    );
}

export default Checkout