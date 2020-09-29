import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('./')
            })
            .catch(error => alert(error.messsage));

    }
    const register = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //created user
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.messsage))
    }
    return (
        <div className="login-container">
            <Link to="/">
                <img
                    className="login-logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>
            <div className="login">
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type='submit' onClick={signIn} className="login-signIn">Sign In</button>
                    <p>
                        By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please
                        see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>

                    <button onClick={register} className="login-register"> Create your Amazon account</button>

                </form>
            </div>
        </div>
    );
}

export default Login