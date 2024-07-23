import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image }) => {
    const { webformatURL, largeImageURL, tags } = image;
    const { showModal, toggle } = useToggle();
    
    useEffect(() => {
        const gallery = document.querySelector('.js-gallery');

        if (!gallery) {
            return;
        }

        if (showModal) {
            console.log('Modal is now shown.');
            gallery.style.pointerEvents = 'none';
        } else {
            console.log('Modal is now hidden.');
            gallery.style.pointerEvents = 'auto';
        }
    }, [showModal]);
    
    const useToggle = (initialState = false) => {
        const [showModal, setShowModal] = useState(initialState);
        const toggle = () => setShowModal(!showModal);

        return { showModal, toggle };
    };

    return (
        <li className={css.galleryItem} onClick={toggle}>
                <img src={webformatURL} alt={tags} />
                {showModal && (<Modal image={largeImageURL} tags={tags} onClose={toggle} />)}
            </li>
    );
};