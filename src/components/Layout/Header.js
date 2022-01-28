import React, { useContext } from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

export const Header = ({ onShowCart }) => {

    return (
        <>
            <header className={classes.header}>
                <h1>Meals Shop</h1>
                <HeaderCartButton onShowCart={onShowCart}  />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of food"/>
            </div>
        </>
    )
}

export default Header
