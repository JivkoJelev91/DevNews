import React, { useState, useCallback } from 'react';
import classes from './Modal.module.css'

const Modal = ({ setOpenModal, children }) => {
    const [fadeOut, setFadeOut] = useState(false);

    const closeModal = useCallback(() => {
        setFadeOut(true);
        setTimeout(() => {
            setOpenModal(false)
        }, 350);
    }, [setOpenModal, setFadeOut]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
        }}>
            <div className={classes.backgroundModal} onClick={closeModal}></div>
            <div className={`${classes.modalWrapper} ${fadeOut ? classes.closeAnimation : classes.openAnimation}`}>
                {React.Children.map(children, child =>
                    child ? React.cloneElement(child, { closeModal: closeModal }) : child
                )}
            </div>
        </div>
    );
}

export default Modal;
