import React, { useState } from 'react';
import './SignUp.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();

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
                <h1>Create Account</h1>
                <form>
                    <h5>Your Name</h5>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />

                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <p>
                        By creating an account, you agree to Amazon ClONE's Conditions of Use and Privacy Notice.
                    </p>

                    <button onClick={register} className="signUp-btn"> Create your Amazon account</button>

                    <p>
                        Already have an account? <Link to="/login"> Sign-In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp