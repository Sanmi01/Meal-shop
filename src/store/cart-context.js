import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    notification: false,
    addItem: (item) => {},
    removeItem: (id) => {},
    deleteItem: (id) => {},
})

export default CartContext;