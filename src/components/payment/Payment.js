import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios';
import CurrencyFormat from "react-currency-format";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { useStateValue } from '../../StateProvider';
import { getCartTotal } from "../../Reducer";
import { db } from "../../firebase";
import CheckoutProduct from '../checkout/CheckoutProduct';
import LocationSearchInput from '../Address/LocationSearchInput';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import './Payment.css';

function Payment() {
	const [{ cart, user, address }, dispatch] = useStateValue();
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [succeeded, setSuceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [clientSecret, setClientSecret] = useState(true);
	const [expanded, setExpanded] = useState('panel1');
	const [_address, setAddress] = useState('');
	const history = useHistory();

	useEffect(() => {
		if (user?.uid) {
			handleGetUserAddress();
		}
		if (cart?.length === 0) {
			setDisabled(true)
		}

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

		//set user address in db
		handleSetUserAddress();
	}

	const handleChange = e => {
		if (cart?.length === 0) {
			setDisabled(true)
		}
		else {
			setDisabled(e.empty);
			console.log(e.empty);
		}
		setError(e.error ? e.error.message : "");
	}

	const handleExpand = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleGetUserAddress = () => {
		db.collection('users')
			.doc(user?.uid)
			.get()
			.then(snapshot => {
				if (snapshot.data() === undefined) {
					setAddress('');
				}
				else {
					const addressTemp = {
						address: snapshot.data().address,
					}
					setAddress(addressTemp);
				}
			})
	}

	const handleSetUserAddress = () => {
		db.collection('users')//nosql databases
			.doc(user?.uid)
			.set({ //add is for collection, to add to a document use set
				address: address
			})
	}

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
						<p>{user?.email}</p>
						{_address ? <p>{_address.address}</p> :
							<LocationSearchInput />}
						{address ? <p><strong>Delievery Address:</strong> {address}</p> : null}
					</div>
				</div>
				<div className="payment-section">
					<div className="payment-title">
						<h3>Review Items</h3>
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

					<Accordion className="payment-expand">
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Hint</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								<strong><u>For Testing Payments</u></strong>< br />
								<strong>Card #:</strong> 4242 4242 4242 4242 <br />
								<strong>CVC:</strong> any < br />
								<strong>Expiry: </strong> any future date
          				</Typography>
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		</div>
	);
}

export default Payment
