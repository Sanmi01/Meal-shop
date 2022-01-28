import React, { useState, useEffect, useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
    notification: false
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            notification: state.notification
        }
    }

    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            notification: state.notification
        }
    }

    if(action.type === 'DELETE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - (existingItem.price * existingItem.amount);
        const updatedCartItems = state.items.filter(item => item.id !== action.id);
        return {
            items: updatedCartItems,
            totalAmount: updatedTotalAmount,
            notification: state.notification
        }
    }

    if(action.type === 'NOTIFY') {
        return {
            items: state.items,
            totalAmount: state.totalAmount,
            notification: (!state.notification)
        }
    }
    return defaultCartState;
};

const getCartItemsFromLocalStorage = () => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState, getCartItemsFromLocalStorage)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item:item})
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id:id})
    };

    const deleteItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'DELETE', id:id})
    };

    const NotifyFromCartHandler = () => {
        dispatchCartAction({type: 'NOTIFY'})
    };


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        notification: cartState.notification,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        deleteItem: deleteItemFromCartHandler
    }


     useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartState))
    }, [cartState]);

    useEffect(() => {
        NotifyFromCartHandler()
    }, [cartState.totalAmount]);

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
