import React from 'react';
import Modal from '../UI/Modal.js';
import classes from './Cart.module.css';

const Cart = ({ onCloseCart }) => {
    const cartItems = [{id: 'c1', name: 'Sushi', amount: 2, price: 12.99}];
    return (
        <Modal onCloseCart={onCloseCart}>
            <ul className={classes['cart-items']}>
                {cartItems.map((item) => <li>{item.name}</li>)}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button onClick={onCloseCart} className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart
