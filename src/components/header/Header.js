import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
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
                <div className="header-option">
                    <span className="header-optionLineOne"> Hello Guest</span>
                    <span className="header-optionLineTwo"> Sign In</span>
                </div>
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
                        <span className="header-optionLineTwo header-basketCount">0</span>
                    </div>
                </Link>


            </div>
        </div>
    );
}

export default Header;