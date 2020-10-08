import React, { useState } from 'react';
import './SignUp.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { db } from "../../firebase";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('')
    const [zipcode, setZipCode] = useState('')
    const [address, setAddress] = useState('');

    const history = useHistory();

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // db.collection("users")
                //     .add({
                //         street: street,
                //         cityState: city + ' ' + state + ' ,' + zipcode,
                //         country: country
                //     })
                console.log(auth, 'AUTH');
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

                    {/* <div>
                        <h5>Home Address</h5>
                        <input type="text" value={street} onChange={e => setStreet(e.target.value)} placeholder="Street Address" required />
                        <div>
                            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" required />
                            <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="State" required />
                            <input type="number" value={zipcode} onChange={e => setZipCode(e.target.value)} placeholder="Zipcode" required />
                        </div>
                        <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" required />
                    </div> */}
                    <p>
                        By creating an account, you agree to Amazon ClONE's Conditions of Use and Privacy Notice.
                    </p>

                    <button onClick={register} className="signUp-btn"> Create your Amazon account</button>

                    <p>
                        Already have an account? <Link to="/login"> <strong>Sign-In</strong></Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp