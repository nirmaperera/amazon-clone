import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import './Header.css';
import { useStateValue } from '../../StateProvider';
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom';
import SearchList from '../searchList/SearchList';

function Header() {
    const [{ cart, user, products }] = useStateValue();
    const [search, setSearch] = useState('');
    const [isSearching, setSearching] = useState(false);

    const history = useHistory();

    const handleAuth = () => {
        if (user) {
            auth.signOut();
            history.push('/')
        }
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value.length !== 0) {
            setSearching(true)
        } else setSearching(false)
    }

    return (
        <div className="header-container">
            <Link to='/'>
                <img className="header-logo"
                    alt="logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
            </Link>
            <div className="header-search" style={{ top: isSearching ? ' 200px' : '0px' }}>
                <div className="header-searchBar">
                    <input className="header-searchInput" type="text" value={search} onChange={handleSearch} />
                    <SearchIcon className="header-searchIcon" />
                </div>
                <div className="header-search-dropdown" style={{ maxHeight: isSearching ? ' 400px' : '0px' }}>
                    {products && products?.filter(searchForProduct(search)).map((product) => <SearchList key={product.id} searching={isSearching} title={product.title} id={product.id}

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
                        <span className="header-optionLineTwo header-basketCount">{!user ? 0 : cart?.length}</span>
                    </div>
                </Link>


            </div>
        </div>
    );
}

const searchForProduct = function (search) {
    return function (x) {

        return x.title.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}


export default Header;