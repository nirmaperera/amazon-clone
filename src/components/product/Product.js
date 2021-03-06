import React from 'react';
import { Link } from 'react-router-dom';

import { useStateValue } from '../../StateProvider';
import StarRateOutlinedIcon from '@material-ui/icons/StarRateOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

import './Product.css';

function Product({ id, title, price, image, rating, description }) {
	//console.log(this.props, 'this props')
	const [{ }, dispatch] = useStateValue();
	// console.log('the cart', cart)
	const addToCart = () => {
		//dispatch item into data layer
		dispatch({
			type: 'ADD_TO_CART',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
				description: description
			},
		});
	}
	return (
		<div className="product-container">
			<div className="product-info">
				<p>
					<Link to={{
						pathname: '/product',
						state: {
							id: id,
							title: title,
							price: price,
							image: image,
							rating: rating,
							description: description,
						}
					}}>{title.substring(0, 100) + "..."}</Link>
				</p>

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
			<img alt="product" src={image}></img>
			<button onClick={addToCart}> <AddShoppingCartOutlinedIcon />Add to Cart</button>
		</div>
	);
}

export default Product;
