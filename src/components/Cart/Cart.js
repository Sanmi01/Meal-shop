import React, { useContext } from 'react';
import Modal from '../UI/Modal.js';
import CartItem from './CartItem.js';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = ({ onCloseCart }) => {
    const cartCtx = useContext(CartContext);
    const cartItems = cartCtx.items;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    };

    return (
        <Modal onCloseCart={onCloseCart}>
            <ul className={classes['cart-items']}>
                {cartItems.map((item) => (
                    <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
                ))}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={onCloseCart} className={classes['button--alt']}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
