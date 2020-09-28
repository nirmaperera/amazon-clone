import React from 'react';
import './Checkout.css';

function Checkout() {
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
                </div>
            </div>
            <div className="checkout-right">
                <h2>The subtotal</h2>


            </div>
        </div>

    );
}

export default Checkout