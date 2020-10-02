import React, { useEffect } from 'react';
import './App.css';

import { useStateValue } from './StateProvider';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Checkout from './components/checkout/Checkout';
import Payment from './components/payment/Payment';
import Orders from './components/orders/Orders';
import Login from './components/login/Login';
import SignUp from './components/SignUp/SignUp';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { auth } from "./firebase";
import Register from './components/SignUp/SignUp';

const promise = loadStripe(
  "pk_test_51HXTdHDFq5Jfszr5r2VjtOKLGtAFwqHo4PX7LRrP0NMqtTm4eZIhjozPFKRmhSnfPTej0MV8vCh8fKGfolHlTCmB004kzYSx5z"
);


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
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/orders">
          <Header />
          <Orders />
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
