import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { searchForProduct } from '../../functions';
import { auth } from "../../firebase";

import SearchList from '../searchList/SearchList';
import Backdrop from '../backdrop/backdrop';
import SideBar from './SideBar';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import './Header.css';

function Header() {
	const [{ cart, user, products }] = useStateValue();
	const [search, setSearch] = useState('');
	const [isSearching, setSearching] = useState(false);
	const [isLoggedOut, setLoggedOut] = useState(false);
	const history = useHistory();


	const handleAuth = () => {
		if (user) {
			auth.signOut();
			setLoggedOut(true);
			history.push('/')
		}
	}

	const handleSearch = (event) => {
		setSearch(event.target.value);
		if (event.target.value.length !== 0) {
			setSearching(true)
		} else {
			setSearching(false)
			setSearch("");
		}
	}

	const backdropClickHandler = () => {
		setSearching(false)
		setSearch("");
	}

	let backdrop;
	if (isSearching) {
		backdrop = <Backdrop click={backdropClickHandler} />
	}

	return (
		<div className="header-main">
			<div className="header-container">
				<SideBar className={"my-menu"} pageWrapId={"page-wrap"} outerContainerId={"App"} user={user} handleAuth={handleAuth} />
				<div className="header-container-mobile">
					<Link to='/'>
						<img className="header-logo"
							alt="logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" />
					</Link>

					<Link to={!user ? './login' : './checkout'}>
						<div className="header-optionBasket-mobile">
							<ShoppingCartOutlinedIcon />
							<span className="header-optionLineTwo header-basketCount">{isLoggedOut ? 0 : cart?.length}</span>
						</div>
					</Link>
				</div>
				<div className="header-search" style={{ top: isSearching ? ' 200px' : '0px' }}>
					<div className="header-searchBar">
						<input className="header-searchInput" type="text" value={search} onChange={handleSearch} />
						<SearchIcon className="header-searchIcon" />
					</div>
					<div className="header-search-dropdown" style={{ maxHeight: isSearching ? ' 400px' : '0px' }}>
						{products && products?.filter(searchForProduct(search)).map((product) =>
							<SearchList key={product.id} searching={isSearching} backdropClickHandler={backdropClickHandler} title={product.title} id={product.id}
								image={product.image}
								price={product.price}
								rating={product.rating}
								description={product.description} />)}
					</div>
				</div>
				<div className="header-nav">
					<Link to={!user && '/login'}>
						<div onClick={handleAuth} className="header-option">
							<span className="header-optionLineOne"> Hello,  {!user ? 'Guest' : user.email}</span>
							<span className="header-optionLineTwo"> {user ? 'Sign Out' : 'Sign In'}</span>
						</div>
					</Link>

					<Link to="/orders">
						<div className="header-option">
							<span className="header-optionLineOne"> Returns</span>
							<span className="header-optionLineTwo"> & Orders</span>
						</div>
					</Link>
					<div className="header-option">
						<span className="header-optionLineOne"> Your</span>
						<span className="header-optionLineTwo"> Prime</span>
					</div>

					<Link to={!user ? './login' : './checkout'}>
						<div className="header-optionBasket">
							<ShoppingCartOutlinedIcon />
							<span className="header-optionLineTwo header-basketCount">{isLoggedOut ? 0 : cart?.length}</span>
						</div>
					</Link>
					{backdrop}
				</div>

			</div>
			<div className="header-bottom">
				<Link to={!user && '/login'}>
					<div className="header-bottom-left">
						<span>Hello, <strong>{!user ? 'Sign in to your account' : user.email}!</strong></span>
					</div>
				</Link>

				<div className="header-bottom-nav">
					<span> Holiday Deals </span>
					<span> Gift Cards </span>
					<span> Best Sellers </span>
					<span> Customer Service </span>
					<span> New Releases </span>
					<span> AmazonBasics </span>
					<span> Whole Foods </span>
					<span> Free Shipping </span>
				</div>

				<div className="header-bottom-right">
					<span>Shop today's epic deals now</span>
				</div>
			</div>
		</div>
	);
}

export default Header;
