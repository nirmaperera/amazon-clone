import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import './Header.css';
import { useStateValue } from '../../StateProvider';
import { auth } from "../../firebase";

function Header() {
    const [{ cart, user }] = useStateValue();

    const handleAuth = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className="header-container">
            <Link to='/'>
                <img className="header-logo"
                    alt="logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
            </Link>
            <div className="header-search">
                <input className="header-searchInput" type="text" />
                <SearchIcon className="header-searchIcon" />
            </div>
            <div className="header-nav">
                <Link to={!user && '/login'}>
                    <div onClick={handleAuth} className="header-option">
                        <span className="header-optionLineOne"> Hello,  {user ? user?.email : 'Guest'}</span>
                        <span className="header-optionLineTwo"> {user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <div className="header-option">
                    <span className="header-optionLineOne"> Returns</span>
                    <span className="header-optionLineTwo"> & Orders</span>
                </div>
                <div className="header-option">
                    <span className="header-optionLineOne"> Your</span>
                    <span className="header-optionLineTwo"> Prime</span>
                </div>

                <Link to='/checkout'>
                    <div className="header-optionBasket">
                        <ShoppingCartOutlinedIcon />
                        <span className="header-optionLineTwo header-basketCount">{cart?.length}</span>
                    </div>
                </Link>


            </div>
        </div>
    );
}

export default Header;