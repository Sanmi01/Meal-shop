import React, { useState, useEffect, useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};
/** 
* cartReducer function
* This function allows us to get data from the cartState, use the said data and change said data.
* @param {object} state - This is an object which contains has the cartState data
* @param {object} action - An action object is an object that describes how to update the state. Typically, the action object would have a property type — a string describing what kind of state update the reducer must do.
* @return {object} The object returned has the items and total amount
*/


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
            totalAmount: updatedTotalAmount
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
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
};



// This getCartItemsFromLocalStorage get the cart items data that has been set in the local storage of the web browser and if there's none, it returns an empty array.
const getCartItemsFromLocalStorage = () => {
    if(!(localStorage.getItem('cartItems'))) {
        localStorage.setItem('cartItems', JSON.stringify(defaultCartState))
    }
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
}

// This CartProvider Component contains a useReducer Hook which is used to access the cartState and change the data with the use of dispatch actions.
// The component also the cartContext object 

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



    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        deleteItem: deleteItemFromCartHandler
    }


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartState))
        console.log(cartState)
    }, [cartState]);

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
