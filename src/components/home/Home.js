import React, { useEffect, useState } from 'react';
import Product from '../product/Product';
import './Home.css';

import { db } from "../../firebase";
import { useStateValue } from '../../StateProvider';

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
                    console.log(product);
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
                <img
                    className="home-image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />
            </div>
            <div className="home-row">
                {products && products.slice(0, 4).map(item => (
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
                {products && products.slice(4, 6).map(item => (
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
                {products && products.slice(7, 8).map(item => (
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