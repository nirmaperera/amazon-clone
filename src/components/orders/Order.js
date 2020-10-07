import React, { useState } from 'react';
import './order.css'
import { useStateValue } from '../../StateProvider';
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "../../Reducer";
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';
import moment from 'moment';
import CheckoutProduct from '../checkout/CheckoutProduct';


function Order({ order }) {
    const [{ cart, user }, dispatch] = useStateValue();

    return (
        <div className="order-container">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order-id">
                <small><strong>{order.id}</strong></small>
            </p>
            {order.data.cart?.map(item => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order-total">Order Total: <strong>{value}</strong></h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    );
}

export default Order;