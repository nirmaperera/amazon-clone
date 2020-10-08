import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from '../../StateProvider';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from '../checkout/CheckoutProduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "../../Reducer";
import axios from '../../axios';
import { db } from "../../firebase";
import { auth } from "../../firebase";

function Payment() {
    const [{ cart, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSuceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    const [address, setAddress] = useState('');
    const history = useHistory();

    useEffect(() => {

        //get the user home address
        // if (user?.uid) {
        //     //console.log(user?.uid, 'USER');
        //     handleUserAddress();
        // }

        //generate the stripe secret to charge the customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits(cents)
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [cart, user])
    console.log('the secret is ', clientSecret);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            db.collection('users')//nosql databases
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    cart: cart,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })
            setSuceeded(true);
            setError(null);
            setProcessing(false)
            dispatch({
                type: 'EMPTY_CART'
            })
            history.replace('./orders')
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    // const handleUserAddress = () => {
    //     auth.onAuthStateChanged(authUser => {
    //         if (authUser) {
    //             console.log(authUser.uid);
    //             // db.collection('users')
    //             //     .doc(authUser.uid)
    //             //     .get()
    //             //     .then(snapshot => {
    //             //         const address = {
    //             //             street: snapshot.data().street,
    //             //             cityState: snapshot.data().cityState,
    //             //             country: snapshot.data().country
    //             //         }
    //             //         console.log('address', address);
    //             //         setAddress(address);
    //             //     })
    //         }
    //     })
    // }
    return (
        <div className="payment-container">
            <div className="payment">
                <h1>Checkout
                    (<Link to='/checkout'>{cart?.length} items</Link>)
                </h1>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment-address">
                        {/* <p>{user?.email}</p>
                        <p> {address?.street}</p>
                        <p> {address?.cityState}</p>
                        <p> {address?.country}</p> */}

                        <p>{user?.email}</p>
                        <p> 23 React Lane</p>
                        <p> New York NY, 10021</p>
                        <p> USA</p>
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment-items">
                        {cart.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment-priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p> Processing </p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment