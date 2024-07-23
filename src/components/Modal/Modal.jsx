import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ image, tags, onClose }) = {
    const onCloseRef = useRef(onClose);
    
    useEffect(() => {
    onCloseRef.current = onClose;
    }, [onClose]);
    
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onCloseRef.current();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <img src={image} alt={tags} />
            </div>
        </div>
    );
};

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;