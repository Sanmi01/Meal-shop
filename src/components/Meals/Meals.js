import React, { useContext} from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
import CartContext from '../../store/cart-context';

const Meals = () => {
    return (
        <>
            <MealsSummary />
            <AvailableMeals />
        </>
    )
}

export default Meals
