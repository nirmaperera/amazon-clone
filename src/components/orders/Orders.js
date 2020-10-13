import React, { useState, useEffect } from 'react';
import './Orders.css'
import { useStateValue } from '../../StateProvider';
import { db } from '../../firebase';
import Order from './Order';
function Orders() {
    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (user) {
            db
                .collection("users")
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))

        } else {
            setOrders([])
        }
    }, [user])

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            <div className="orders-order">
                {orders.length > 0 ?
                    orders?.map(order => (
                        <Order order={order} />
                    )) : <h3>You have currently have no orders.</h3>}
            </div>


        </div>

    );
}

export default Orders;