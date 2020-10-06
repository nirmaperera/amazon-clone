import React, { useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import { Link } from 'react-router-dom';

import './SearchList.css';

function SearchList({ title, id, price, image, rating, description, searching }) {
    //console.log(this.props, 'this props')
    const [{ cart, isSearching }, dispatch] = useStateValue();

    return (
        <div className="searchList-container" style={{ backgroundColor: searching ? '#fff' : 'none' }}>
            {searching ?
                <ul className="searchList-dropdown">
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
                    }}>
                        <li className="searchList-item">{title}</li>
                    </Link>
                </ul>
                : null}

        </div>
    );
}

export default SearchList;