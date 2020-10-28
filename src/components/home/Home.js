import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../StateProvider';
import { db } from "../../firebase";
import Slides from './Slides';
import Slider from './Slider';

import Product from '../product/Product';

import './Home.css';
import slides from './Slides';

function Home() {
	const [products, setProducts] = useState([]);
	const [{ }, dispatch] = useStateValue();
	let productsTemp = [];
	useEffect(() => {
		db.collection("products")
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					const product = {
						id: doc.id,
						title: doc.data().title,
						price: doc.data().price,
						rating: doc.data().rating,
						image: doc.data().image,
						description: doc.data().description
					}
					productsTemp.push(product)
				})
				setProducts(productsTemp);
				dispatch({
					type: 'GET_PRODUCTS',
					products: productsTemp

				});
			})
	}, []);
	return (
		<div className="home-container">
			<div className="home">
				<Slider slides={Slides} />
			</div>
			<div className="home-row">
				{products && products.slice(0, 3).map(item => (
					<Product
						id={item.id}
						title={item.title}
						image={item.image}
						price={item.price}
						rating={item.rating}
						description={item.description}

					/>
				))}
			</div>
			<div className="home-row">
				{products && products.slice(3, 6).map(item => (
					<Product
						id={item.id}
						title={item.title}
						image={item.image}
						price={item.price}
						rating={item.rating}
						description={item.description}
					/>
				))}
			</div>
			<div className="home-row">
				{products && products.slice(7, 9).map(item => (
					<Product
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
	);
}

export default Home;
