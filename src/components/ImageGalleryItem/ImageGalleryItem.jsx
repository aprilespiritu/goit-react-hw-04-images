import { useState } from 'react';
import PropTypes from 'prop-types';
import SearchModal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    
    const handleModalOpen = () => {
        setSelectedImage(largeImageURL);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    return (
        <li className={css.galleryItem} onClick={handleModalOpen}>
            <img
                src={webformatURL}
                alt={tags}
            />
            <SearchModal
                image={selectedImage}
                modalOpen={selectedImage !== null}
                modalClose={handleModalClose}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
    }).isRequired,
};