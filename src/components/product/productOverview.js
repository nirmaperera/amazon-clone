import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';

import { useStateValue } from '../../StateProvider';
import { calculateDate } from '../../functions';
import StarRateOutlinedIcon from '@material-ui/icons/StarRateOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

import './productOverview.css';
import './Product.css';

function ProductOverview(props) {
	const [{ }, dispatch] = useStateValue();
	// console.log('the cart', cart)

	const addToCart = () => {
		//dispatch item into data layer
		dispatch({
			type: 'ADD_TO_CART',
			item: {
				id: props.location.state.id,
				title: props.location.state.title,
				image: props.location.state.image,
				price: props.location.state.price,
				rating: props.location.state.rating,
				description: props.location.state.description
			},
		});
	}

	return (
		<div className="productOverview-container">
			<div>
				<img
					alt="ad"
					className="checkout-ad"
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
				/>
			</div>

			<div className="productOverview">
				<div className="productOverview-first">
					<img alt="product" src={props.location.state.image}></img>
				</div>
				<div className="productOverview-middle">
					<h2>{props.location.state.title}</h2>
					<div className="product-rating">
						{Array(props.location.state.rating).fill().map((_, i) => (
							<StarRateOutlinedIcon style={{ color: '#FF9900' }} />
						))}
						<p className="product-price">
							<small>$</small>
							<strong>{props.location.state.price}</strong>
						</p>
						<hr />
						<p className="productOverview-description">{props.location.state.description}</p>
					</div>
				</div>

				<div className="productOverview-last">
					<p><input type='radio'></input> <strong>One-time purchase: </strong> ${props.location.state.price}</p>
					<p><strong>FREE Shipping</strong> on your first order.</p>
					<p>Arrives: <strong>{moment(calculateDate(14)).format('MMMM Do YYYY')}</strong> </p>
					<p>Fastest delivery:  <strong>{moment(calculateDate(7)).format('MMMM Do YYYY')}</strong> </p>
					<h4 className="productOverview-last-stock">In Stock.</h4>
					<button onClick={addToCart}> <AddShoppingCartOutlinedIcon />Add to Cart</button>
				</div>
			</div>
		</div>
	)
}

export default withRouter(ProductOverview);
