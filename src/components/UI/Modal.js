import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

// Modal UI Component which makes use of a backdrop and an overlay to render a modal on the screen. ALso makes use of portals.

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

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal
