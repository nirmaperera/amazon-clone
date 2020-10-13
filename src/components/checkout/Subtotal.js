import React from 'react';
import './Subtotal.css'
import { useStateValue } from '../../StateProvider';
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "../../Reducer";
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const [{ cart, user }] = useStateValue();

    return (
        <div className="subtotal-container">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ( {cart?.length} items): <strong>
                                {value}
                            </strong>
                        </p>
                        <small className="subtotal-gift">
                            <input type="checkbox" /> This order contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={'$'}
            />

            <button disabled={!user ? true : false} onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;