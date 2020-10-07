import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { useStateValue } from '../../StateProvider';
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom';
import SearchList from '../searchList/SearchList';
import Backdrop from '../backdrop/backdrop';
import MenuIcon from '@material-ui/icons/Menu';
import { slide as Menu } from 'react-burger-menu';

function SideBar({ user, handleAuth }) {
    return (
        <Menu right>
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
        </Menu>
    )


}

export default SideBar;