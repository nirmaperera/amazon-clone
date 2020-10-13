import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('./')
            })
            .catch(error => setError(error.message));

    }
    return (
        <div className="login-container">
            <Link to="/">
                <img
                    alt="logo"
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

                    {error && <div className="auth-error">{error}</div>}
                    <p> By continuing, you agree to Amazon CLONE's Conditions of Use and Privacy Notice. </p>
                </form>

            </div>
            <div className="signUp-container">
                <div className="signUp-divider signUp-divider-break"><h5>New to Amazon?</h5></div>
                <button onClick={e => history.push('/signup')} className="login-register"> Create your Amazon account</button>
            </div>

        </div>
    );
}

export default Login