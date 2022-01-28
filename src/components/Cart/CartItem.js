import React from "react";
import classes from "./CartItem.module.css";

// CartItem Component which is responsible for rendering the cart items and passing various functions to the elements 

const CartItem = ({name, price, amount, onRemove, onAdd, onDelete}) => {
  const pri = `$${price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{pri}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes["button-end"]}>
      <button onClick={onDelete}>X</button>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
      </div>
    </li>
  );
};

export default CartItem;
