import React from 'react';
import ModalBottom from '../UI/ModalBottom.js';

// CartNotification Component which is a modal that pops up whenever an item is added, removed or deleted from the cart

const CartNotification = ({item}) => {
    return (
        <ModalBottom>
            <p>{item.number} {item.name} {item.action}.</p>
        </ModalBottom>
    )
}

export default CartNotification
