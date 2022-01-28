import React, { useState, useContext } from 'react';
import Modal from '../UI/Modal.js';
import CartItem from './CartItem.js';
import classes from './Cart.module.css';
import CartNotification from './CartNotification';
import CartContext from '../../store/cart-context';

const Cart = ({ onCloseCart }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationObject, setNotificationObject] = useState({});

    const cartCtx = useContext(CartContext);
    const cartItems = cartCtx.items;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (item) => {
        cartCtx.removeItem(item.id);
        setNotificationObject({...item, action: 'has been removed', number: 'One'})
        showNotificationHandler();
    };

    const cartItemDeleteHandler = (item) => {
        cartCtx.deleteItem(item.id);
        setNotificationObject({...item, action: 'have been deleted', number: 'All'})
        showNotificationHandler();
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
        setNotificationObject({...item, action: 'has been added', number: 'One'})
        showNotificationHandler();
    };

    const showNotificationHandler = () => {
        setShowNotification(true)
        setTimeout(() => {
            setShowNotification(false)
        }, 1200);
    }
    
    return (
        <Modal onCloseCart={onCloseCart}>
            <ul className={classes['cart-items']}>
                {cartItems.map((item) => (
                    <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item)} onDelete={cartItemDeleteHandler.bind(null, item)} onAdd={cartItemAddHandler.bind(null, item)} />
                ))}
            </ul>
            {!hasItems && <p>Your cart is empty</p>}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={onCloseCart} className={classes['button--alt']}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
            {showNotification && <CartNotification item={notificationObject} />}
        </Modal>
    )
}

export default Cart
