import React from 'react';
import './order.css'

import CurrencyFormat from "react-currency-format";

import moment from 'moment';
import CheckoutProduct from '../checkout/CheckoutProduct';



function Order({ order }) {


    return (
        <div className="order-container">
            <h2>Order</h2>
            <p>Order Date: {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>

            <p className="order-id">
                <small><strong>{order.id}</strong></small>
            </p>
            <p>Delivery Date: <span>{moment.unix(order.data.created).add(7, 'd').format("MMMM Do YYYY")}</span></p>
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