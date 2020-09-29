import React, { useEffect } from 'react';
import './App.css';

import { useStateValue } from './StateProvider';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Checkout from './components/checkout/Checkout';
import Login from './components/login/Login';
import { auth } from "./firebase";


function App() {
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    //will only run once when the component loads...

    auth.onAuthStateChanged(authUser => {
      console.log('user is =>', authUser);
      if (authUser) {
        //user logged in/ user was logging in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
