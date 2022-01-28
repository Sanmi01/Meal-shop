import React from 'react';
import ReactDOM from 'react-dom';
import classes from './ModalBottom.module.css';

// ModalBottom Component which renders a modal close to the bottom of a screen with the use of portals.

const Backdrop = ({ onCloseCart }) => {
    return <div onClick={onCloseCart} className={classes.backdrop}></div>
};

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>
};

const portalElement = document.getElementById('overlays');

const ModalBottom = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default ModalBottom
