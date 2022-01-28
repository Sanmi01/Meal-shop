import React from 'react';
import classes from './Card.module.css';

// Card UI component

const Card = (props) => {
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    )
}

export default Card
