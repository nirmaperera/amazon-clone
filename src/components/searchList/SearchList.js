import React from 'react';
import { Link } from 'react-router-dom';

import './SearchList.css';

function SearchList({ title, id, price, image, rating, description, searching, backdropClickHandler }) {
	return (
		<div className="searchList-container" style={{ backgroundColor: searching ? '#fff' : 'none' }}>
			{searching ?
				<ul className="searchList-dropdown">
					<Link onClick={backdropClickHandler} to={{
						pathname: '/product',
						state: {
							id: id,
							title: title,
							price: price,
							image: image,
							rating: rating,
							description: description,
							searching: false
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
