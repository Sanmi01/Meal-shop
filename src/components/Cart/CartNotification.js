import React from 'react';
import ModalBottom from '../UI/ModalBottom.js';

const CartNotification = ({item}) => {
    console.log(item)
    return (
        <ModalBottom>
            <p>{item.number} {item.name} {item.action}.</p>
        </ModalBottom>
    )
}

export default CartNotification
