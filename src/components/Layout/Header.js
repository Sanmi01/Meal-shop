import React from 'react';
import mealsImage from '../../assets/meals.jpg';

export const Header = () => {
    return (
        <>
            <header>
                <h1>ReactMeals</h1>
                <button>Cart</button>
            </header>
            <div>
                <img src={mealsImage} />
            </div>
        </>
    )
}
