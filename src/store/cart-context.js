import React from 'react';

//Context data used throughout the application, mainly for the cart functionality, this includes items, total Amount and three other functions

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    deleteItem: (id) => {},
})

export default CartContext;