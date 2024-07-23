import React, { useEffect } from 'react';
//import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ image, tags, onClose }) = {
    
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <img src={image} alt={tags} />
            </div>
        </div>
    );
};