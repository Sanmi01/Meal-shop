import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../store/cart-context';

// MealItem Component which gets data from the store through the use of the useContext Hook and also makes use of a addToCartHandler function which is gotten from the store.
// The addToCartHandler function adds an item to the cart

const MealItem = ({id, name, description, price}) => {
    const cartCtx = useContext(CartContext)
    const pri = `$${price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id:id,
            name: name,
            amount: amount,
            price: price
        })
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{pri}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}

export default MealItem
