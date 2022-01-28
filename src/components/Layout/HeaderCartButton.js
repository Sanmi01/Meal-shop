import React, { useState, useContext, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

/*HeaderCartButton Component which makes use of a useState and useEffect Hook to trigger a button highlight and also useContext Hook 
to access data from the store 
*/


const HeaderCartButton = ({ onShowCart }) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    console.log(cartCtx)

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);


    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 350);

        return () => {
            clearTimeout(timer)
        }
    }, [items]);



    return (
        <button onClick={onShowCart} className={btnClasses}>
            <span classes={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton
