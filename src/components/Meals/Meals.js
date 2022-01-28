import React from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

//Meals Component which is made of the MealsSummary and AvailableMeals Components

const Meals = () => {
    return (
        <>
            <MealsSummary />
            <AvailableMeals />
        </>
    )
}

export default Meals
